---
title: "Testen der virtuellen IP-Adresse eines SafeKit-Mirror-Clusters"
canonical: "https://safekit.eviden.com/de/best-practises/test-primary-backup-vip-mirror/"
description: "Testen der Verfügbarkeit und des Failover virtueller IP-Adressen in einem SafeKit-Mirror-Cluster, einschließlich GARP-Rerouting, ARP-Prüfungen und Paketmitschnitten."
category: "best-practises"
lang: "de"
topics: "Wichtige Prinzipien, Voraussetzung: VIP-Konfiguration, Test 1 – VIP wird vom primären Server gehalten, Test 2 – Manuelles Failover (Anhalten des primären Servers), Test 3 – Überprüfung des GARP-Reroutings mit arp -a, Test 4 – End-to-End-Test mit Wireshark (Windows) oder tcpdump (Linux), Von welchen Workstations getestet werden soll, Zusammenfassung der erwarteten Ergebnisse, Fehlerbehebung"
---

# Testen der virtuellen IP-Adresse eines SafeKit-Mirror-Clusters in Ihrem Netzwerk

Dieser Leitfaden beschreibt, wie Sie überprüfen können, ob die virtuelle IP-Adresse (VIP) eines SafeKit-Mirror-Clusters (Mirror-Modul) in Ihrem Netzwerk korrekt funktioniert: Die VIP wird vom primären Server gehalten und nach einem Failover an den neuen primären Server umgeleitet.

## 1. Grundprinzipien

**Voraussetzung:** Beide Knoten des Spiegelclusters müssen sich im selben Layer-2-IP-Subnetz befinden: einem LAN oder einem VLAN, das zwischen entfernten Standorten erweitert wird.

- VIP ist nur auf dem **primären Server** aktiv (PRIM- oder ALONE-Zustand): Es wird als Alias der physischen IP-Adresse auf der Netzwerkkarte dieser Adresse festgelegt, wenn das Modul als primärer Server auf dem Knoten startet (Konfiguration `where="one_side_alias"` ).
- Die MAC-Adresse des primären Servers ist daher diejenige, die in den ARP-Tabellen (Router, Gateway, Clients im selben Subnetz) mit der VIP verknüpft ist. Der gesamte Datenverkehr zur VIP wird an den primären Server weitergeleitet.
- Bei einem Failover (Ausfall oder Stillstand des primären Servers) wird die VIP vom ehemaligen primären Server entfernt und als Alias auf dem neuen primären Server eingerichtet. Zwei Mechanismen ermöglichen es dem Netzwerk anschließend, die VIP der MAC-Adresse des neuen primären Servers zuzuordnen:
  - die Netzwerkmeldungen, die vom Betriebssystem gesendet werden, wenn VIP als Alias auf der Netzwerkkarte hinzugefügt wird;
  - die **GARPs** (gratuitous ARP), die von SafeKit gesendet werden, wenn das Attribut `arpreroute="on"` im Abschnitt `<vip>` konfiguriert ist.

Was Sie daher testen müssen:

1. Dieser VIP-Server wird vom primären Server verwaltet und ist von den Clients aus erreichbar;
2. dass die mit der VIP verknüpfte MAC-Adresse an den neuen primären Server im Netzwerk (Router, Gateway, Virtualisierung) umgeleitet wird, wenn sich der primäre Server ändert.

## 2. Voraussetzung: VIP-Konfiguration

1. Konfigurieren Sie VIP in der `userconfig.xml` des Spiegelmoduls im Abschnitt `<vip>` . Das Attribut `arpreroute="on"` bewirkt, dass der neue primäre Server nach einem Failover GARPs sendet.

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
3. Starten Sie das Modul: Ein Knoten muss **PRIM (Bereit)** und der andere **SECOND (Bereit)** sein.

## 3. Test 1 – VIP wird vom primären Server gehalten

**Schritte**

1. Führen Sie auf dem primären Server `ipconfig` (Windows) bzw. `ip addr show` (Linux) aus.
   → **Erwartetes Ergebnis:** VIP erscheint als Alias auf der Netzwerkkarte der physischen IP-Adresse.
2. Führen Sie auf dem sekundären Server denselben Befehl aus.
   → **Erwartetes Ergebnis:** VIP wird nicht angezeigt.
3. Von einer Client-Workstation **außerhalb des Clusters aus** können Sie sowohl die physischen IP-Adressen als auch die VIP `ping` .
   → **Erwartetes Ergebnis:** Alle drei `ping` Befehle antworten (sofern sie nicht von Firewalls gefiltert werden).
4. Überprüfen Sie den Zugriff über VIP mit dem SafeKit-Mosaik: Stellen Sie von einem Browser auf dem **externen** Client eine Verbindung zu `http://<VIP>:9010/safekit/mosaic.html` her, geben Sie dann den **Namen des Spiegelmoduls** ein und führen Sie den Test aus.
   → **Erwartetes Ergebnis:** Alle Zellen des Mosaiks zeigen den Namen des **primären Servers** in einer einzigen Farbe an: Alle TCP-Verbindungen zu VIP werden vom primären Server bedient.

## 4. Test 2 – Manuelles Failover (Abschaltung des primären Systems)

Dieser Test prüft, ob VIP dem primären Server bei einem Failover folgt, der durch das Anhalten des Moduls auf dem primären Server ausgelöst wird.

**Schritte**

1. Stoppen Sie das Modul auf dem primären Knoten (Knoten 1) über die SafeKit-Konsole (oder über die Befehlszeile mit `safekit stop -m <module>` ).
   → **Erwartetes Ergebnis:** Knoten 1 wechselt in den Zustand STOP (Nicht bereit) und Knoten 2 in den Zustand ALONE (Bereit). Im Protokoll des neuen primären Knotens erscheint die Meldung `Virtual IP <VIP> set` .
2. Führen Sie auf dem neuen primären Server `ipconfig` oder `ip addr show` aus.
   → **Erwartetes Ergebnis:** VIP erscheint nun als Alias auf diesem Knoten und nicht mehr auf dem ehemaligen primären Knoten.
3. Wiederholen Sie von der Client-Workstation aus die drei `ping` -Befehle und führen Sie das Mosaik erneut auf der VIP aus.
   → **Erwartetes Ergebnis:** Alles reagiert, und alle Zellen des Mosaiks zeigen nun den Namen der **neuen Primärfarbe** in einer einzigen Farbe an.
4. Starten Sie das Modul auf Knoten 1 neu: Es wird neu synchronisiert und wechselt in den Zustand SECOND (Bereit), während Knoten 2 in den Zustand PRIM (Bereit) wechselt.

## 5. Test 3 – Überprüfung des MAC-Reroutings mit `arp -a`

Sie notieren die MAC-Adresse, die dem VIP vor dem Failover zugeordnet ist, und überprüfen anschließend, ob sie sich geändert hat.

Dieser Test ist nur möglich, wenn sich die Client-Workstation im **selben IP-Subnetz** wie der Cluster befindet.

Befindet sich ein Router zwischen Client und Cluster, enthält die ARP-Tabelle des Clients nicht die VIP, sondern die Adresse des Gateways, über das das Cluster-Netzwerk erreicht wird. In diesem Fall muss die MAC-Umleitung in der ARP-Tabelle des Routers bzw. Gateways in Zusammenarbeit mit dem Netzwerkteam überprüft werden.

**Schritte**

1. Das Modul ist auf Knoten 1 PRIM (Bereit) und auf Knoten 2 SECOND (Bereit).
2. Auf der Client-Workstation `ping` sowohl die physische IP-Adresse als auch die VIP an und führen Sie dann `arp -a` aus.
   → **Erwartetes Ergebnis:** Der VIP ist mit **derselben MAC-Adresse wie die physische IP-Adresse des primären Knotens** verknüpft.
3. `stop` das Modul auf dem primären Knoten (Knoten 1).
4. `ping` VIP erneut an und führe dann `arp -a` erneut aus.
   → **Erwartetes Ergebnis:** Die VIP ist nun der **gleichen MAC-Adresse zugeordnet wie die physische IP-Adresse des neuen primären Knotens** .

> `ping` VIP erneut an, bevor Sie die ARP-Tabelle lesen: Der Eintrag könnte als veraltet markiert sein und erst nach einem `ping` aktualisiert werden.

Beispiel der erwarteten ARP-Tabelle vor und nach dem Stoppen des primären Servers:

| Adresse | MAC-Adresse vor dem Stopp | MAC-Adresse nach dem Stopp |
|---|---|---|
| Physikalische IP-Adresse von Knoten 1 | MAC-Adresse von Knoten 1 | MAC-Adresse von Knoten 1 |
| Physikalische IP-Adresse von Knoten 2 | MAC-Adresse von Knoten 2 | MAC-Adresse von Knoten 2 |
| VIP | **Knoten 1 MAC** | **Knoten 2 MAC** |

## 6. Test 4 – End-to-End-Prüfung mit Wireshark (Windows) oder tcpdump (Linux)

Sie können eine TCP-Verbindung zu VIP verfolgen, indem Sie Pakete auf dem Client und auf beiden Knoten erfassen: mit Wireshark auf Windows-Rechnern und mit tcpdump auf Linux-Rechnern.

Sie müssen sich die **MAC-Header (Ethernet) der Pakete** ansehen: Die Ziel-IP-Adresse bleibt VIP, und die Ziel-MAC-Adresse zeigt an, welcher Knoten den Datenverkehr empfängt.

**Was Sie beachten sollten:**

| Wann | Wo erfassen | Beobachtete MAC-Adressen |
|---|---|---|
| Vor dem Failover | Client | Client-MAC → MAC von **Knoten 1 (primär)** |
| Vor dem Failover | Knoten 1 | Pakete an VIP werden empfangen; Knoten 2 empfängt nichts |
| Während des Failovers | Netzwerk | MAC-Umleitungsnachrichten, die von Knoten 2 für VIP gesendet werden: Nachrichten, die vom Betriebssystem gesendet werden, wenn VIP als Alias festgelegt ist, und GARPs, die von SafeKit ( `arpreroute="on"` ) gesendet werden |
| Nach dem Failover | Client | Client-MAC → MAC von **Knoten 2 (neuer primärer Knoten)** |

Befindet sich die Client-Workstation in einem anderen Subnetz als der Cluster, so ist die auf den Knoten angezeigte "Client-MAC" die MAC-Adresse des **Gateways** (Routers), das die beiden Subnetze verbindet, und nicht die der Client-Workstation.

## 7. Von welchen Workstations soll getestet werden?

Das Verhalten hängt vom Netzwerkpfad zwischen Client und Cluster ab. Führen Sie die Tests 1 und 2 von jedem für Ihre Architektur relevanten Clienttyp aus:

| Standort des Kunden | Was der Test prüft |
|---|---|
| Client im **selben Subnetz** wie der Cluster | Aktualisierung der ARP-Tabellen der Clients (Test 3 möglich) |
| Client in einem **anderen Subnetz** (Router, Gateway, virtuelles Hypervisor-Netzwerk) | Aktualisierung der ARP-Tabellen der Clients im Router oder Gateway |
| Client-VM **auf einem Hypervisor, der auch eine VM des Spiegelclusters hostet** | Verhalten des virtuellen Switches des Hypervisors, der auch internes Switching und Routing übernimmt |

## 8. Zusammenfassung der erwarteten Ergebnisse

| Test | Aktion | Erwartetes Ergebnis |
|---|---|---|
| 1 | PRIM / SECOND, `ipconfig` , `ping` und mosaic | VIP als Alias nur auf dem primären Server; die 3 `ping` -Befehle antworten (sofern nicht durch Firewalls gefiltert); das mosaic zeigt nur den primären Server an |
| 2 | Stopp des primären Servers | VIP als Alias auf dem neuen primären Server; Nachricht `Virtual IP <VIP> set` ; das Mosaik zeigt nur den neuen primären Server an |
| 3 | `arp -a` vor und nach dem Stoppen des primären Knotens | VIP wechselt von der MAC-Adresse von Knoten 1 zu der von Knoten 2 |
| 4 | Wireshark- oder tcpdump-Aufzeichnung vor und nach dem Failover | Der Client sendet an die MAC-Adresse des neuen primären Clients |

## 9. Fehlerbehebung

- **Der VIP reagiert nach dem Failover nicht mehr:** MAC-Umleitungsnachrichten werden von einem Gerät auf dem Pfad (Router, Gateway, virtueller Switch) nicht berücksichtigt, das weiterhin Datenverkehr an die MAC-Adresse des ehemaligen primären VIPs sendet. Klären Sie die Verarbeitung von MAC-Umleitungsnachrichten mit Ihrem Netzwerkteam.
- **GARP-Senden:** Das Attribut `arpreroute="on"` des Abschnitts `<vip>` (mit `arpinterval` und `arpelapse` ) sendet nach dem Failover regelmäßig GARPs an VIP. Siehe Benutzerhandbuch, Abschnitt 13.6.4 „ [`<vip>` -Syntax](https://safekit.eviden.com/de/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) “.
- **Diagnose der VIP ↔ MAC-Auflösung:** siehe Benutzerhandbuch, Abschnitt 7.24 „ [Fehlerbehebung bei der VIP ↔ MAC-Auflösung](https://safekit.eviden.com/de/resources/safekit-user-guide-82/#_Issue_with_VIP) “ und Abschnitt 7.16 „ [Problem mit der virtuellen IP nach dem Failover](https://safekit.eviden.com/de/resources/safekit-user-guide-82/#_Problem_with_the_1) “.
