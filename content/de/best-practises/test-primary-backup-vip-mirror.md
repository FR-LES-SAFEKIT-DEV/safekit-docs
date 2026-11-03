---
title: "Testen der virtuellen IP -Adresse eines SafeKit mirror -Clusters"
canonical: "https://safekit.eviden.com/de/best-practises/test-primary-backup-vip-mirror/"
description: "Testen der Verfügbarkeit und des Failover virtueller IP in einem SafeKit mirror Cluster, einschließlich GARP Rerouting, ARP Prüfungen und Paketmitschnitten."
category: "best-practises"
lang: "de"
topics: "Wichtige Prinzipien, Voraussetzung: Konfiguration der virtuellen IP ( VIP ), Test 1 – Virtuelle IP ( VIP ) wird vom primären Server gehalten, Test 2 – Manuelles Failover (Abschaltung des primären Servers), Test 3 – Überprüfung GARP Reroutings mit arp -a, Test 4 – End-to-End-Test mit Wireshark ( Windows ) oder tcpdump ( Linux ), Welche Workstations sollen getestet werden?, Zusammenfassung der erwarteten Ergebnisse, Fehlerbehebung"
---

# Testen der virtuellen IP -Adresse eines SafeKit mirror Clusters in Ihrem Netzwerk

Dieser Leitfaden beschreibt, wie Sie überprüfen können, ob die virtuelle IP Adresse ( VIP ) eines SafeKit mirror Clusters ( mirror Modul) in Ihrem Netzwerk korrekt funktioniert: Die virtuelle IP ( VIP ) wird vom primären Server gehalten und nach einem Failover an den neuen primären Server umgeleitet.

## 1. Grundprinzipien

**Voraussetzung:** Beide Knoten des mirror müssen sich im selben Layer-2 IP Subnetz befinden: einem LAN oder einem VLAN das zwischen entfernten Standorten erweitert wird.

- Die virtuelle IP ( VIP ) ist nur auf dem **primären Server** aktiv (Zustände PRIM oder ALONE ): Sie wird als Alias der physischen IP Adresse auf der Netzwerkkarte dieser Adresse festgelegt, wenn das Modul als primärer Server auf dem Knoten startet (Konfiguration `where="one_side_alias"` ).
- Die MAC -Adresse des primären Servers ist daher diejenige, die in den ARP Tabellen (Router, Gateway, Clients im selben Subnetz) mit der virtuellen IP ( VIP ) verknüpft ist. Der gesamte Datenverkehr an die virtuelle IP ( VIP ) wird an den primären Server weitergeleitet.
- Bei einem Failover (Ausfall oder Stillstand des primären Servers) wird die virtuelle IP ( VIP ) vom ehemaligen primären Server entfernt und als Alias auf dem neuen primären Server eingerichtet. Zwei Mechanismen ermöglichen es dem Netzwerk anschließend, die virtuelle IP ( VIP ) mit der MAC Adresse des neuen primären Servers zu verknüpfen:
  - die Netzwerkmeldungen, die vom Betriebssystem gesendet werden, wenn die virtuelle IP ( VIP ) als Alias auf der Netzwerkkarte hinzugefügt wird;
  - die **GARPs** (gratuitous ARP ), die von SafeKit gesendet werden, wenn das Attribut `arpreroute="on"` im Abschnitt `<vip>` konfiguriert ist.

Was Sie daher testen müssen:

1. Die virtuelle IP ( VIP ) wird vom primären Server verwaltet und ist von den Clients aus erreichbar;
2. Die mit der virtuellen IP ( VIP ) verknüpfte MAC Adresse wird beim Wechsel des primären Servers im Netzwerk (Router, Gateway, Virtualisierung) auf den neuen primären Server umgeleitet.

## 2. Voraussetzung: Konfiguration einer virtuellen IP ( VIP ).

1. Konfigurieren Sie in der `userconfig.xml` des mirror die virtuelle IP ( VIP ) im Abschnitt `<vip>` . Das Attribut `arpreroute="on"` bewirkt, dass der neue primäre Server nach einem Failover GARPs sendet.

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
3. Starten Sie das Modul: Ein Knoten muss **PRIM ( Ready )** und der andere **SECOND ( Ready )** sein.

## 3. Test 1 – Virtuelle IP ( VIP ) des primären Servers

**Schritte**

1. Führen Sie auf dem primären Server `ipconfig` ( Windows ) bzw. `ip addr show` ( Linux ) aus.
   → **Erwartetes Ergebnis:** Die virtuelle IP ( VIP ) erscheint als Alias der physischen IP -Adresse auf der Netzwerkkarte.
2. Führen Sie auf dem sekundären Server denselben Befehl aus.
   → **Erwartetes Ergebnis:** Die virtuelle IP ( VIP ) wird nicht angezeigt.
3. Von einer Client-Workstation **außerhalb des Clusters** aus können Sie sowohl die physischen IP -Adressen als auch die virtuelle IP ( VIP ) `ping` .
   → **Erwartetes Ergebnis:** Alle drei `ping` Befehle antworten (sofern sie nicht von Firewalls gefiltert werden).
4. Überprüfen Sie den Zugriff über die virtuelle IP ( VIP ) mit dem SafeKit Mosaik: Stellen Sie von einem Browser auf dem **externen** Client eine Verbindung zu `http://<VIP>:9010/safekit/mosaic.html` her (oder verwenden Sie Port 9453, wenn der SafeKit Webserver und die Konsole auf HTTPS umgestellt wurden), geben Sie dann den **Namen des Spiegelmoduls** mirror und führen Sie den Test aus.
   → **Erwartetes Ergebnis:** Alle Zellen des Mosaiks zeigen den Namen des **primären Servers** in einer einzigen Farbe an: Alle TCP Verbindungen zur virtuellen IP ( VIP ) werden vom primären Server bedient.

![ Testen Sie die virtuelle IP -Adresse eines SafeKit mirror mit dem Mosaik ](/wp-content/uploads/2024/03/appli-20.png)

## 4. Test 2 – Manuelles Failover (Abschaltung des primären Systems)

Dieser Test prüft, ob die virtuelle IP ( VIP ) dem primären Server bei einem Failover folgt, der durch das Anhalten des Moduls auf dem primären Server ausgelöst wird.

**Schritte**

1. Stoppen Sie das Modul auf dem primären Knoten (Knoten 1) über die SafeKit Konsole (oder über die Befehlszeile mit `safekit stop -m <module>` ).
   → **Erwartetes Ergebnis:** Knoten 1 wechselt in den STOP ( NotReady ) und Knoten 2 in den ALONE ( Ready ). Im Protokoll des neuen primären Knotens erscheint die Meldung `Virtual IP <VIP> set` .
2. Führen Sie auf dem neuen primären Server `ipconfig` oder `ip addr show` aus.
   → **Erwartetes Ergebnis:** Die virtuelle IP ( VIP ) erscheint nun als Alias auf diesem Knoten und nicht mehr auf dem ehemaligen primären Knoten.
3. Wiederholen Sie von der Client-Workstation aus die drei `ping` -Befehle und führen Sie das Mosaik erneut auf der virtuellen IP ( VIP ) aus.
   → **Erwartetes Ergebnis:** Alles reagiert, und alle Zellen des Mosaiks zeigen nun den Namen der **neuen Primärfarbe** in einer einzigen Farbe an.
4. Starten Sie das Modul auf Knoten 1 neu: Es wird neu synchronisiert und geht in SECOND ( Ready ) über, während Knoten 2 in PRIM ( Ready ) übergeht.

## 5. Test 3 – Überprüfung MAC Reroutings mit `arp -a`

Sie notieren sich die MAC Adresse, die der virtuellen IP ( VIP ) vor dem Failover zugeordnet ist, und überprüfen anschließend, ob sie sich geändert hat.

Dieser Test ist nur möglich, wenn sich die Client-Workstation im **selben IP Subnetz** wie der Cluster befindet.

Befindet sich ein Router zwischen Client und Cluster, enthält die ARP Tabelle des Clients nicht die virtuelle IP ( VIP ), sondern die Adresse des Gateways, über das das Cluster-Netzwerk erreicht wird. In diesem Fall sollten Sie die ARP Tabelle des Routers oder Gateways mit dem Netzwerkteam überprüfen.

**Schritte**

1. Das Modul ist PRIM ( Ready ) auf Knoten 1 und SECOND ( Ready ) auf Knoten 2.
2. Auf der Client-Workstation `ping` sowohl die physischen IP -Adressen als auch die virtuelle IP ( VIP ) an und führen Sie dann `arp -a` aus.
   → **Erwartetes Ergebnis:** Die virtuelle IP ( VIP ) ist der **gleichen MAC Adresse zugeordnet wie die physische IP Adresse des primären Geräts** .
3. `stop` das Modul auf dem primären Knoten (Knoten 1).
4. `ping` die virtuelle IP ( VIP ) erneut an und führen Sie dann `arp -a` erneut aus.
   → **Erwartetes Ergebnis:** Die virtuelle IP ( VIP ) ist nun der **gleichen MAC -Adresse zugeordnet wie die physische IP -Adresse des neuen primären Netzwerks** .

> Bevor Sie die ARP Tabelle lesen, `ping` die virtuelle IP ( VIP ) erneut an: Der Eintrag könnte als veraltet markiert sein und erst nach einem `ping` aktualisiert werden.

Beispiel der erwarteten ARP Tabelle vor und nach dem Stoppen des primären Servers:

| Adresse | MAC vor dem Stopp | MAC nach dem Stopp |
|---|---|---|
| Physikalische IP von Knoten 1 | Knoten 1 MAC | Knoten 1 MAC |
| Physische IP von Knoten 2 | Knoten 2 MAC | Knoten 2 MAC |
| Virtuelle IP ( VIP ) | **Knoten 1 MAC** | **Knoten 2 MAC** |

## 6. Test 4 – End-to-End-Prüfung mit Wireshark ( Windows ) oder tcpdump ( Linux )

Sie können eine TCP -Verbindung zur virtuellen IP ( VIP ) verfolgen, indem Sie Pakete auf dem Client und auf beiden Knoten erfassen: mit Wireshark auf Windows -Rechnern und mit tcpdump auf Linux -Rechnern.

Sie müssen sich die **MAC Header (Ethernet-Header) der Pakete** ansehen: Die Ziel- IP -Adresse bleibt die virtuelle IP ( VIP ), und es ist die Ziel MAC -Adresse, die angibt, welcher Knoten den Datenverkehr empfängt.

**Was Sie beachten sollten:**

| Wann | Wo man erfassen kann | Beobachtete MAC Adressen |
|---|---|---|
| Vor dem Failover | Kunde | Client- MAC → MAC von **Knoten 1 (primär)** |
| Vor dem Failover | Knoten 1 | Pakete an die virtuelle IP ( VIP ) werden empfangen; Knoten 2 empfängt nichts. |
| Während des Ausfalls | Netzwerk | MAC Umleitungsnachrichten, die von Knoten 2 für die virtuelle IP ( VIP ) gesendet werden: Nachrichten, die vom Betriebssystem gesendet werden, wenn sie als Alias festgelegt ist, und GARPs die von SafeKit ( `arpreroute="on"` ) gesendet werden |
| Nach dem Failover | Kunde | Client MAC → MAC von **Knoten 2 (neuer primärer Knoten)** |

> Befindet sich die Client-Workstation in einem anderen Subnetz als der Cluster, so ist die auf den Knoten angezeigte "Client- MAC " die MAC Adresse des **Gateways** (Routers), das die beiden Subnetze verbindet, und nicht die der Client-Workstation.

## 7. Von welchen Workstations soll getestet werden?

Das Verhalten hängt vom Netzwerkpfad zwischen Client und Cluster ab. Führen Sie die Tests 1 und 2 von jedem für Ihre Architektur relevanten Clienttyp aus:

| Kundenstandort | Was der Test überprüft |
|---|---|
| Client im **selben Subnetz** wie der Cluster | Aktualisierung der ARP Tabellen der Clients (Test 3 möglich) |
| Client in einem **anderen Subnetz** (Router, Gateway, virtuelles Hypervisor-Netzwerk) | Aktualisierung der ARP Tabellen der Clients im Router oder Gateway |
| Client-VM **auf einem Hypervisor, der auch eine VM des mirror hostet** | Verhalten des virtuellen Switches des Hypervisors, der auch internes Switching und Routing übernimmt. |

## 8. Zusammenfassung der erwarteten Ergebnisse

| Prüfen | Aktion | Erwartetes Ergebnis |
|---|---|---|
| 1 | PRIM / SECOND , `ipconfig` , `ping` und mosaic | Virtuelle IP ( VIP ) als Alias nur auf dem primären Server; die drei `ping` -Befehle antworten (sofern nicht durch Firewalls gefiltert); das Mosaik zeigt nur den primären Server an |
| 2 | Stopp des primären | Virtuelle IP ( VIP ) als Alias auf der neuen primären IP; Nachricht `Virtual IP <VIP> set` ; das Mosaik zeigt nur die neue primäre IP an |
| 3 | `arp -a` vor und nach dem Stoppen des primären Algorithmus | Die virtuelle IP ( VIP ) wird von der MAC Adresse von Knoten 1 zu der von Knoten 2 verschoben. |
| 4 | Wireshark oder tcpdump Aufzeichnung vor und nach dem Failover | Der Client sendet an die MAC Adresse des neuen primären |

## 9. Fehlerbehebung

- **Die virtuelle IP ( VIP ) reagiert nach dem Failover nicht mehr:** MAC Umleitungsnachrichten werden von einem Gerät auf dem Pfad (Router, Gateway, virtueller Switch) nicht berücksichtigt, das weiterhin Datenverkehr an die MAC Adresse der ehemaligen primären IP-Adresse sendet. Klären Sie die Verarbeitung von MAC Umleitungsnachrichten mit Ihrem Netzwerkteam.
- **GARPs Senden:** Das Attribut `arpreroute="on"` des Abschnitts `<vip>` (mit `arpinterval` und `arpelapse` ) sendet nach dem Failover regelmäßig GARPs an die virtuelle IP ( VIP ). Siehe Benutzerhandbuch, Abschnitt 13.6.4 „ [ `<vip>` -Syntax ](https://safekit.eviden.com/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) “.
- **Diagnose der Auflösung von virtueller IP ( VIP ) zu MAC :** siehe Benutzerhandbuch, Abschnitt 7.24 „ [ Fehlerbehebung bei der Auflösung von virtueller IP ( VIP ) zu MAC -Adresse ](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Issue_with_VIP) “ und Abschnitt 7.16 „ [ Problem mit der virtuellen IP nach dem Failover ](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Problem_with_the_1) “.

Informationen zum Load Balancing mit einer virtuellen IP Adresse finden Sie unter [ Testen der virtuellen IP -Adresse für Load Balancing in einem SafeKit Farm Cluster ](/de/best-practises/test-load-balancing-vip-farm/) .

{{%  insert-safekit-4-buttons-de  %}}
