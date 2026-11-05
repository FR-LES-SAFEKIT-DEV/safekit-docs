---
title: "Testen der virtuellen IP-Adresse eines SafeKit Mirror-Cluster"
canonical: "https://safekit.eviden.com/de/best-practises/test-primary-backup-vip-mirror/"
description: "Testen Sie die Verfügbarkeit und das Failover virtueller IPs in einem SafeKit Mirror-Cluster, einschließlich GARP Umrourting, ARP-Prüfungen und Paketmitschnitten."
category: "best-practises"
lang: "de"
topics: "Schlüsselprinzipien, Voraussetzung: Konfiguration der virtuellen IP (VIP), Test 1 – Virtuelle IP (VIP), die vom primären Server gehalten wird, Test 2 – Manueller Failover (Stopp des Primärservers), Test 3 – Überprüfung GARP Umleitung mit arp -a, Test 4 – End-to-End-Prüfung mit Wireshark (Windows) oder tcpdump (Linux), Von welchen Workstations aus getestet werden soll, Zusammenfassung der erwarteten Ergebnisse, Fehlerbehebung"
translation: "translate_md 2026-11-05.10 | glossaire 2026-11-05.14 | Translation LLM | 17 expressions"
---

# Testen der virtuellen IP-Adresse eines SafeKit Mirror-Cluster in Ihrem Netzwerk {#testing-the-virtual-ip-address-of-a-safekit-mirror-cluster-in-your-network}

Diese Anleitung beschreibt, wie Sie überprüfen, ob die virtuelle IP-Adresse (VIP) eines SafeKit Mirror-Cluster (mirror) in Ihrem Netzwerk korrekt funktioniert: Die virtuelle IP (VIP) wird vom primären Server gehalten und nach einem Failover auf den neuen primären Server umgeleitet.

## 1. Grundprinzipien {#1-key-principles}

**Voraussetzung:** Beide Knoten des Mirror-Cluster müssen sich im selben Layer-2-IP-Subnetz befinden: einem LAN oder einem VLAN, das zwischen entfernten Standorten erweitert wird.

- Die virtuelle IP (VIP) ist nur auf dem **primären Server** aktiv (Zustände PRIM oder ALONE): Sie wird als Alias der physischen IP-Adresse auf der Netzwerkkarte dieser Adresse festgelegt, wenn das Modul als primäres Modul auf dem Knoten startet (Konfiguration `where="one_side_alias"`).
- Die MAC-Adresse des primären Servers ist daher diejenige, die in den ARP-Tabellen (Router, Gateway, Clients im selben Subnetz) der virtuellen IP-Adresse (VIP) zugeordnet ist. Der gesamte Datenverkehr an die virtuelle IP-Adresse (VIP) wird an den primären Server gesendet.
- Während eines Failovers (Stopp oder Ausfall des Primärsystems) wird die virtuelle IP (VIP) vom ehemaligen Primärsystem entfernt und als Alias auf dem neuen Primärsystem festgelegt. Zwei Mechanismen ermöglichen es dem Netzwerk dann, die virtuelle IP (VIP) mit der MAC-Adresse des neuen Primärsystems zu verknüpfen:
  - die vom Betriebssystem gesendeten Netzwerknachrichten, wenn die virtuelle IP-Adresse (VIP) als Alias auf der Netzwerkkarte hinzugefügt wird;
  - die **GARPs** (Gratuitous ARP), die von SafeKit gesendet werden, wenn das Attribut `arpreroute="on"` im Abschnitt `<vip>` konfiguriert ist.

Was Sie daher testen müssen:

1. Die virtuelle IP-Adresse (VIP) wird vom primären Server gehalten und ist von den Clients aus erreichbar;
2. Die mit der virtuellen IP-Adresse (VIP) verknüpfte MAC-Adresse wird an den neuen Primärserver im Netzwerk (Router, Gateway, Virtualisierung) umgeleitet, wenn sich der Primärserver ändert.

## 2. Voraussetzung: Konfiguration der virtuellen IP (VIP) {#2-prerequisite-virtual-ip-vip-configuration}

1. Konfigurieren Sie in der `userconfig.xml` des mirror die virtuelle IP (VIP) im Abschnitt `<vip>`. Das Attribut `arpreroute="on"` bewirkt, dass der neue Primärserver nach einem Failover GARPs sendet:

   ```xml
   <vip>
     <interface_list>
       <interface arpreroute="on">
         <real_interface>
           <virtual_addr addr="<VIP>" where="one_side_alias"/>
         </real_interface>
       </interface>
     </interface_list>
   </vip>
   ```

2. Wenden Sie die Konfiguration auf beiden Knoten an.
3. Starten Sie das Modul: Ein Knoten muss **PRIM (Ready)** und der andere **SECOND (Ready)** sein.

## 3. Test 1 – Virtuelle IP-Adresse (VIP), die vom primären Server gehalten wird {#3-test-1--virtual-ip-vip-held-by-the-primary-server}

**Schritte**

1. Führen Sie auf dem primären Server `ipconfig` (Windows) oder `ip addr show` (Linux) aus.
   → **Erwartetes Ergebnis:** Die virtuelle IP-Adresse (VIP) wird als Alias auf der Netzwerkkarte der physischen IP-Adresse angezeigt.
2. Führen Sie auf dem sekundären Server denselben Befehl aus.
   → **Erwartetes Ergebnis:** Die virtuelle IP-Adresse (VIP) wird nicht angezeigt.
3. `ping` von einem Client-Arbeitsplatz **außerhalb des Clusters** sowohl die physischen IP-Adressen als auch die virtuelle IP-Adresse (VIP) an.
   → **Erwartetes Ergebnis:** Alle drei `ping` Befehle antworten (sofern sie nicht von Firewalls gefiltert werden).
4. Überprüfen Sie den Zugriff über die virtuelle IP (VIP) mit SafeKit-Mosaik: Verbinden Sie sich von einem Browser auf dem **externen** Client mit `http://<VIP>:9010/safekit/mosaic.html` (oder verwenden Sie Port 9453, wenn der SafeKit-Webserver und die Konsole auf HTTPS umgestellt wurden), geben Sie dann den **Namen des Spiegelmoduls** mirror und führen Sie den Test aus.
   → **Erwartetes Ergebnis:** Alle Zellen des Mosaik Displays zeigen den Namen des **primären Servers** in einer einzigen Farbe an: Alle TCP-Verbindungen zur virtuellen IP (VIP) werden vom primären Server bedient.

![Testen Sie die virtuelle IP-Adresse eines SafeKit mirror mit dem Mosaik](/wp-content/uploads/2024/03/appli-20.png)

## 4. Test 2 – Manuelle Fehlerübernahme (Stoppen des Primärsystems) {#4-test-2--manual-failover-stop-of-the-primary}

Dieser Test prüft, ob die virtuelle IP-Adresse (VIP) dem primären Server bei einem Failover folgt, das durch das Stoppen des Moduls auf dem primären Server ausgelöst wird.

**Schritte**

1. Stoppen Sie das Modul auf dem primären Knoten (Knoten 1) über die SafeKit-Konsole (oder über die Befehlszeile mit `safekit stop -m <module>`).
   → **Erwartetes Ergebnis:** Knoten 1 wechselt in den STOP (NotReady) und Knoten 2 wechselt in ALONE (Ready). Im Protokoll des neuen Primärknotens erscheint die Meldung `Virtual IP <VIP> set`.
2. Führen Sie auf der neuen primären Schnittstelle `ipconfig` oder `ip addr show` aus.
   → **Erwartetes Ergebnis:** Die virtuelle IP (VIP) wird nun als Alias auf diesem Knoten und nicht mehr auf dem ehemaligen primären Knoten angezeigt.
3. Wiederholen Sie von der Client-Workstation aus die drei `ping`-Befehle und führen Sie Mosaik erneut auf der virtuellen IP-Adresse (VIP) aus.
   → **Erwartetes Ergebnis:** Alles reagiert, und alle Zellen des Mosaik zeigen nun den Namen des **neuen Primärfarbtons** in einer einzigen Farbe an.
4. Starten Sie das Modul auf Knoten 1 neu: Es wird erneut synchronisiert und wechselt in den SECOND (Ready), während Knoten 2 in den PRIM (Ready) wechselt.

## 5. Test 3 – Überprüfung der MAC-Umleitung mit `arp -a` {#5-test-3--checking-mac-rerouting-with-arp--a}

Notieren Sie die MAC-Adresse, die der virtuellen IP-Adresse (VIP) zugeordnet ist, vor dem Failover und prüfen Sie anschließend, ob sie sich geändert hat.

Dieser Test ist nur möglich, wenn sich die Client-Workstation im **selben IP-Subnetz** wie der Cluster befindet.

Wenn sich ein Router zwischen dem Client und dem Cluster befindet, enthält die ARP-Tabelle des Clients nicht die virtuelle IP (VIP), sondern die Adresse des Gateways, das zum Erreichen des Cluster-Netzwerks verwendet wird. In diesem Fall überprüfen Sie die ARP-Tabelle des Routers oder Gateways mit dem Netzwerkteam.

**Schritte**

1. Das Modul ist PRIM (Ready) auf Knoten 1 und SECOND (Ready) auf Knoten 2.
2. `ping` auf der Client-Workstation sowohl die physischen IP-Adressen als auch die virtuelle IP-Adresse (VIP) an und führen Sie dann `arp -a` aus.
   → **Erwartetes Ergebnis:** Die virtuelle IP-Adresse (VIP) ist mit **derselben MAC-Adresse wie die physische IP-Adresse des primären Geräts** verknüpft.
3. `stop` das Modul auf dem primären Knoten (Knoten 1).
4. `ping` die virtuelle IP-Adresse (VIP) erneut an und führen Sie dann erneut `arp -a` aus.
   → **Erwartetes Ergebnis:** Die virtuelle IP-Adresse (VIP) ist jetzt mit **derselben MAC-Adresse wie die physische IP-Adresse des neuen Primärsystems** verknüpft.

> `ping` die virtuelle IP-Adresse (VIP) erneut an, bevor Sie die ARP-Tabelle lesen: Der Eintrag kann als veraltet markiert sein und wird erst nach einem `ping` aktualisiert.

Beispiel der erwarteten ARP-Tabelle vor und nach dem Stoppen des Primärsystems:

| Adresse | MAC vor dem Stopp | MAC nach dem Stopp |
|---|---|---|
| Physische IP von Knoten 1 | MAC-Adresse von Knoten 1 | MAC-Adresse von Knoten 1 |
| Physische IP von Knoten 2 | MAC-Adresse von Knoten 2 | MAC-Adresse von Knoten 2 |
| Virtuelle IP (VIP) | **MAC-Adresse von Knoten 1** | **MAC-Adresse von Knoten 2** |

## 6. Test 4 – End-to-End-Prüfung mit Wireshark (Windows) oder tcpdump (Linux) {#6-test-4--end-to-end-check-with-wireshark-windows-or-tcpdump-linux}

Sie können eine TCP-Verbindung zur virtuellen IP (VIP) verfolgen, indem Sie Pakete auf dem Client und auf beiden Knoten erfassen: mit Wireshark auf Windows-Rechnern und mit tcpdump auf Linux-Rechnern.

Sie müssen die **MAC-Header (Ethernet) der Pakete** betrachten: Die Ziel-IP-Adresse bleibt die virtuelle IP (VIP), und es ist die Ziel-MAC-Adresse, die anzeigt, welcher Knoten den Datenverkehr empfängt.

**Was Sie beachten sollten:**

| Wann | Wo Pakete erfasst werden sollen | Beobachtete MAC-Adressen |
|---|---|---|
| Vor dem Failover | Kunde | Client-MAC → MAC von **Knoten 1 (primär)** |
| Vor dem Failover | Knoten 1 | Pakete an die virtuelle IP-Adresse (VIP) werden empfangen; Knoten 2 empfängt nichts. |
| Während des Failovers | Netzwerk | MAC-Umleitung von Nachrichten, die von Knoten 2 für die virtuelle IP (VIP) gesendet werden: Nachrichten, die vom Betriebssystem gesendet werden, wenn es als Alias festgelegt ist, und GARPs, die von SafeKit gesendet werden (`arpreroute="on"`) |
| Nach dem Failover | Kunde | Client-MAC → MAC von **Knoten 2 (neuer Primärknoten)** |

> Wenn sich die Client-Workstation in einem anderen Subnetz als der Cluster befindet, ist die auf den Knoten angezeigte „Client-MAC“ die MAC-Adresse des **Gateways** (Routers), das die beiden Subnetze verbindet, und nicht die der Client-Workstation.

## 7. Von welchen Arbeitsplätzen aus testen? {#7-which-workstations-to-test-from}

Das Verhalten hängt vom Netzwerkpfad zwischen dem Client und dem Cluster ab. Führen Sie die Tests 1 und 2 von jedem für Ihre Architektur relevanten Client-Typ aus:

| Standort des Kunden | Was der Test prüft |
|---|---|
| Client im **selben Subnetz** wie der Cluster | Aktualisierung der ARP-Tabellen der Clients (Test 3 möglich) |
| Client in einem **anderen Subnetz** (Router, Gateway, virtuelles Netzwerk des Hypervisors) | Aktualisierung der ARP-Tabellen der Clients im Router oder Gateway |
| Client-VM **auf einem Hypervisor, der auch eine VM des Mirror-Cluster hostet** | Verhalten des virtuellen Switches des Hypervisors, der auch das interne Switching und Routing übernimmt |

## 8. Zusammenfassung der erwarteten Ergebnisse {#8-summary-of-expected-results}

| Test | Aktion | Erwartetes Ergebnis |
|---|---|---|
| 1 | PRIM / SECOND, `ipconfig`, `ping` und Mosaik | Virtuelle IP (VIP) als Alias nur auf dem primären System; die 3 `ping`-Befehle antworten (sofern nicht durch Firewalls gefiltert); Mosaik zeigt nur das primäre System an |
| 2 | Stopp des Primärkreislaufs | Virtuelle IP (VIP) als Alias auf dem neuen primären Gerät; Meldung `Virtual IP <VIP> set` ; das Mosaik zeigt nur das neue primäre Gerät an |
| 3 | `arp -a` vor und nach dem Stoppen des Primärsystems | Die virtuelle IP-Adresse (VIP) wechselt von der MAC-Adresse von Knoten 1 zu der von Knoten 2. |
| 4 | Wireshark- oder tcpdump-Mitschnitt vor und nach dem Failover | Der Client sendet an die MAC-Adresse des neuen Primärsystems. |

## 9. Fehlerbehebung {#9-troubleshooting}

- **Die virtuelle IP (VIP) reagiert nach dem Failover nicht mehr:** MAC-Umleitungsnachrichten werden von einem Gerät auf dem Pfad (Router, Gateway, virtueller Switch) nicht berücksichtigt, das weiterhin Datenverkehr an die MAC-Adresse des ehemaligen Primärsystems sendet. Überprüfen Sie die Behandlung von MAC-Umleitungsnachrichten mit Ihrem Netzwerkteam.
- **Senden von GARPs:** Das Attribut `arpreroute="on"` des Abschnitts `<vip>` (mit `arpinterval` und `arpelapse`) sendet nach dem Failover regelmäßig GARPs an die virtuelle IP (VIP). Siehe Benutzerhandbuch, Abschnitt 13.6.4 „ [`<vip>`-Syntax](https://safekit.eviden.com/de/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) “.
- **Diagnose der Auflösung von virtuellen IP-Adressen (VIP) ↔ MAC-Adressen:** Siehe Benutzerhandbuch, Abschnitt 7.24 „ [Fehlerbehebung bei der Auflösung von virtuellen IP-Adressen (VIP) ↔ MAC-Adressen](https://safekit.eviden.com/de/resources/safekit-user-guide-82/#_Issue_with_VIP) “ und Abschnitt 7.16 „ [Problem mit der virtuellen IP-Adresse nach Failover](https://safekit.eviden.com/de/resources/safekit-user-guide-82/#_Problem_with_the_1) “.

Für weitere Informationen:
- [Wie funktioniert eine virtuelle IP-Adresse in einem Hochverfügbarkeits-Cluster?](/de/best-practises/how-a-virtual-ip-address-works/)
- Informationen zum Lastenausgleich mit einer virtuellen IP-Adresse finden Sie [unter Testen der virtuellen IP-Adresse für den Lastenausgleich in einem SafeKit Farm-Cluster](/de/best-practises/test-load-balancing-vip-farm/).

{{%  insert-safekit-4-buttons-de  %}}
