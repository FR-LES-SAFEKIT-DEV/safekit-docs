---
title: "Testen der primären/Backup-virtuellen IP-Adresse in einem SafeKit-Mirror-Cluster"
canonical: "https://safekit.eviden.com/de/best-practises/test-primary-backup-vip-mirror/"
description: "Testen der VIP-Verfügbarkeit und des Failover in einem SafeKit-Mirror-Cluster, einschließlich GARP-Rerouting, ARP-Prüfungen und Paketmitschnitten."
category: "best-practises"
lang: "de"
topics: "Wichtige Prinzipien, Voraussetzung: VIP-Konfiguration, Test 1 – VIP wird vom primären Server gehalten, Test 2 – Manuelles Failover (Anhalten des primären Servers), Test 3 – Überprüfung des GARP-Reroutings mit arp -a, Test 4 – End-to-End-Test mit Wireshark (Windows) oder tcpdump (Linux), Von welchen Workstations getestet werden soll, Zusammenfassung der erwarteten Ergebnisse, Fehlerbehebung"
---

# Testen der primären/Backup-virtuellen IP-Adresse in einem SafeKit-Mirror-Cluster

Dieser Leitfaden beschreibt, wie Sie überprüfen können, ob die virtuelle IP-Adresse (VIP) eines SafeKit-Mirror-Clusters (Mirror-Modul) in Ihrem Netzwerk korrekt funktioniert: Die VIP wird vom primären Server gehalten und nach einem Failover an den neuen primären Server umgeleitet.

## 1. Grundprinzipien

**Voraussetzung:** Beide Knoten des Spiegelclusters müssen sich im selben Layer-2-IP-Subnetz befinden: einem LAN oder einem VLAN, das zwischen entfernten Standorten erweitert wird.

- Die VIP ist nur auf dem **primären Server** aktiv (PRIM- oder ALONE-Zustand): Sie wird als Alias der physischen IP-Adresse auf der Netzwerkkarte dieser Adresse festgelegt, wenn das Modul als primärer Server auf dem Knoten startet (Konfiguration `where="one_side_alias"` ).
- Die MAC-Adresse des primären Servers ist daher diejenige, die in den ARP-Tabellen (Router, Gateway, Clients im selben Subnetz) mit der VIP verknüpft ist. Der gesamte Datenverkehr zur VIP wird an den primären Server weitergeleitet.
- Bei einem Failover (Ausfall oder Stillstand des primären Servers) wird die VIP vom ehemaligen primären Server entfernt und als Alias auf dem neuen primären Server eingerichtet. Zwei Mechanismen ermöglichen es dem Netzwerk anschließend, die VIP mit der MAC-Adresse des neuen primären Servers zu verknüpfen:
  - die Netzwerkmeldungen, die vom Betriebssystem gesendet werden, wenn die VIP als Alias auf der Netzwerkkarte hinzugefügt wird;
  - die **GARPs** (gratuitous ARP), die von SafeKit gesendet werden, wenn das Attribut `arpreroute="on"` im Abschnitt `<vip>` konfiguriert ist.

Was Sie daher testen müssen:

1. dass der VIP-Account vom primären Server verwaltet wird und von den Clients aus erreichbar ist;
2. dass das Netzwerk (Router, Gateway, Virtualisierung) GARP berücksichtigt, wenn sich der primäre Server ändert.

## 2. Voraussetzung: VIP-Konfiguration

1. Konfigurieren Sie in der `userconfig.xml` des Spiegelmoduls die VIP im Abschnitt `<vip>` . Das Attribut `arpreroute="on"` bewirkt, dass der neue primäre Server nach einem Failover GARPs sendet.

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
   → **Erwartetes Ergebnis:** Die VIP erscheint als Alias auf der Netzwerkkarte der physischen IP-Adresse.
2. Führen Sie auf dem sekundären Server denselben Befehl aus.
   → **Erwartetes Ergebnis:** Der VIP erscheint nicht.
3. Von einer Client-Workstation **außerhalb des Clusters aus** können Sie sowohl die physischen IP-Adressen als auch die VIP `ping` .
   → **Erwartetes Ergebnis:** Alle drei `ping` Befehle antworten (sofern sie nicht von Firewalls gefiltert werden).
4. Überprüfen Sie den Zugriff über die VIP mit dem SafeKit-Mosaik: Stellen Sie von einem Browser auf der Client-Workstation eine Verbindung zu `http://<VIP>:9010/safekit/mosaic.html` her, geben Sie dann den **Namen des Spiegelmoduls** ein und führen Sie den Test aus.
   → **Erwartetes Ergebnis:** Alle Zellen des Mosaiks zeigen den Namen des **primären Servers** in einer einzigen Farbe an: Alle TCP-Verbindungen zur VIP werden vom primären Server bedient.

## 4. Test 2 – Manuelles Failover (Abschaltung des primären Systems)

Dieser Test prüft, ob die VIP dem primären Server bei einem Failover folgt, der durch das Anhalten des Moduls auf dem primären Server ausgelöst wird.

**Schritte**

1. Stoppen Sie das Modul auf dem primären Knoten (Knoten 1) über die SafeKit-Konsole (oder über die Befehlszeile mit `safekit stop -m <module>` ).
   → **Erwartetes Ergebnis:** Knoten 1 wechselt in den Zustand STOP (Nicht bereit) und Knoten 2 in den Zustand ALONE (Bereit). Im Protokoll des neuen primären Knotens erscheint die Meldung `Virtual IP <VIP> set` .
2. Führen Sie auf dem neuen primären Server `ipconfig` oder `ip addr show` aus.
   → **Erwartetes Ergebnis:** Der VIP erscheint nun als Alias auf diesem Knoten und nicht mehr auf dem ehemaligen primären Knoten.
3. Wiederholen Sie von der Client-Workstation aus die drei `ping` -Befehle und führen Sie das Mosaik erneut auf dem VIP aus.
   → **Erwartetes Ergebnis:** Alles reagiert, und alle Zellen des Mosaiks zeigen nun den Namen der **neuen Primärfarbe** in einer einzigen Farbe an.
4. Starten Sie das Modul auf Knoten 1 neu: Es wird neu synchronisiert und wechselt in den Zustand SECOND (Bereit), während Knoten 2 in den Zustand PRIM (Bereit) wechselt.

**Einschränkung dieses Tests:** Ein korrektes Ergebnis in Schritt 3 beweist nicht, dass die von SafeKit gesendeten GARPs funktionieren. Wenn die VIP als Alias auf dem neuen primären Server eingerichtet wird, sendet das Betriebssystem selbst Nachrichten im Netzwerk, die die Zuordnung von virtueller IP-Adresse und MAC-Adresse möglicherweise bereits umleiten. Nur die Tests 3 und 4 überprüfen diese Umleitung.

## 5. Test 3 – Überprüfung des GARP-Reroutings mit `arp -a`

Sie notieren die MAC-Adresse, die vor dem Failover mit dem VIP verknüpft ist, und überprüfen anschließend, ob sie sich geändert hat.

Dieser Test ist nur möglich, wenn sich die Client-Workstation im **selben IP-Subnetz** wie der Cluster befindet.

Befindet sich ein Router zwischen Client und Cluster, enthält die ARP-Tabelle des Clients nicht die VIP, sondern die Adresse des Gateways, über das das Cluster-Netzwerk erreicht wird. In diesem Fall muss GARP in der ARP-Tabelle des Routers bzw. Gateways mit dem Netzwerkteam überprüft werden.

**Schritte**

1. Das Modul ist auf Knoten 1 PRIM (Bereit) und auf Knoten 2 SECOND (Bereit).
2. Auf der Client-Workstation `ping` sowohl die physischen IP-Adressen als auch die VIP an und führen Sie dann `arp -a` aus.
   → **Erwartetes Ergebnis:** Der VIP ist mit **derselben MAC-Adresse wie die physische IP-Adresse des primären Servers** verknüpft.
3. `stop` das Modul auf dem primären Knoten (Knoten 1).
4. `ping` den VIP erneut an und führe dann `arp -a` erneut aus.
   → **Erwartetes Ergebnis:** Der VIP ist nun mit **derselben MAC-Adresse wie die physische IP-Adresse des neuen primären Clients** verknüpft.

> `ping` die VIP erneut an, bevor Sie die ARP-Tabelle lesen: Der Eintrag könnte als veraltet markiert sein und erst nach einem `ping` aktualisiert werden.

Beispiel der erwarteten ARP-Tabelle vor und nach dem Stoppen des primären Servers:

| Adresse | MAC-Adresse vor dem Stopp | MAC-Adresse nach dem Stopp |
|---|---|---|
| Physikalische IP-Adresse von Knoten 1 | MAC-Adresse von Knoten 1 | MAC-Adresse von Knoten 1 |
| Physikalische IP-Adresse von Knoten 2 | MAC-Adresse von Knoten 2 | MAC-Adresse von Knoten 2 |
| VIP | **Knoten 1 MAC** | **Knoten 2 MAC** |

## 6. Test 4 – End-to-End-Prüfung mit Wireshark (Windows) oder tcpdump (Linux)

Sie können eine TCP-Verbindung zum VIP verfolgen, indem Sie Pakete auf dem Client und auf beiden Knoten erfassen: mit Wireshark auf Windows-Rechnern und mit tcpdump auf Linux-Rechnern.

Sie müssen sich die **MAC-Header (Ethernet-Header) der Pakete** ansehen: Die Ziel-IP-Adresse bleibt die VIP, und die Ziel-MAC-Adresse zeigt an, welcher Knoten den Datenverkehr empfängt.

**Was Sie beachten sollten:**

| Wann | Wo erfassen | Beobachtete MAC-Adressen |
|---|---|---|
| Vor dem Failover | Client | Client-MAC → MAC von **Knoten 1 (primär)** |
| Vor dem Failover | Knoten 1 | Pakete an die VIP werden empfangen; Knoten 2 empfängt nichts |
| Während des Failovers | Netzwerk | GARP-Sendung von Knoten 2 für die VIP |
| Nach dem Failover | Client | Client-MAC → MAC von **Knoten 2 (neuer primärer Knoten)** |

Befindet sich die Client-Workstation in einem anderen Subnetz als der Cluster, wird auf den Knoten die MAC-Adresse des **Gateways** (Routers) angezeigt, das die beiden Subnetze verbindet, nicht die der Client-Workstation. Ebenso werden auf der Client-Workstation Pakete an die virtuelle IP-Adresse (VIP) an die MAC-Adresse ihres eigenen Gateways gesendet.

## 7. Von welchen Workstations soll getestet werden?

Das Verhalten hängt vom Netzwerkpfad zwischen Client und Cluster ab. Führen Sie die Tests 1 und 2 von jedem für Ihre Architektur relevanten Clienttyp aus:

| Standort des Kunden | Was der Test prüft |
|---|---|
| Client im **selben Subnetz** wie der Cluster | Aktualisierung der ARP-Tabellen der Clients durch GARP (Test 3 möglich) |
| Client in einem **anderen Subnetz** (Router, Gateway, virtuelles Hypervisor-Netzwerk) | GARP-Verarbeitung durch den Router oder das Gateway |
| Client-VM **auf einem Hypervisor, der auch eine Cluster-VM hostet** | Verhalten des virtuellen Switches des Hypervisors, der auch internes Switching und Routing übernimmt |

## 8. Zusammenfassung der erwarteten Ergebnisse

| Test | Aktion | Erwartetes Ergebnis |
|---|---|---|
| 1 | PRIM / SECOND, `ipconfig` , `ping` und mosaic | VIP als Alias nur auf dem primären Server; die 3 `ping` -Befehle antworten (sofern nicht durch Firewalls gefiltert); das mosaic zeigt nur den primären Server an |
| 2 | Stopp des primären Servers | VIP als Alias auf dem neuen primären Server; Nachricht `Virtual IP <VIP> set` ; das Mosaik zeigt nur den neuen primären Server an |
| 3 | `arp -a` vor und nach dem Stoppen des primären Knotens | Die VIP wechselt von der MAC-Adresse von Knoten 1 zu der von Knoten 2 |
| 4 | Wireshark- oder tcpdump-Aufzeichnung vor und nach dem Failover | Der Client sendet an die MAC-Adresse des neuen primären Clients |

## 9. Fehlerbehebung

- **Der VIP antwortet nach dem Failover nicht mehr:** GARP wird von einem Gerät auf dem Pfad (Router, Gateway, virtueller Switch) nicht berücksichtigt, das weiterhin Datenverkehr an die MAC-Adresse des ehemaligen primären Hosts sendet. Klären Sie die GARP-Verarbeitung mit Ihrem Netzwerkteam.
- **GARP-Senden:** Das Attribut `arpreroute="on"` des Abschnitts `<vip>` (mit `arpinterval` und `arpelapse` ) sendet nach dem Failover regelmäßig GARPs an die VIP. Siehe Benutzerhandbuch, Abschnitt 13.6.4 „ [`<vip>` -Syntax](https://safekit.eviden.com/de/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) “.
- **Diagnose der VIP ↔ MAC-Auflösung:** siehe Benutzerhandbuch, Abschnitt 7.24 „ [Fehlerbehebung bei der VIP ↔ MAC-Auflösung](https://safekit.eviden.com/de/resources/safekit-user-guide-82/#_Issue_with_VIP) “ und Abschnitt 7.16 „ [Problem mit der virtuellen IP nach dem Failover](https://safekit.eviden.com/de/resources/safekit-user-guide-82/#_Problem_with_the_1) “.
