---
Titel: „Testen der virtuellen IP-Adresse für den Lastausgleich in einem SafeKit farm Cluster“
kanonisch: "https://safekit.eviden.com/de/best-practises/test-load-balancing-vip-farm/"
Beschreibung: „Lernen Sie, wie Sie den Lastausgleich von SafeKit über Clusterknoten hinweg testen und das virtuelle IP-Failover, das GARP-Rerouting und das Netzwerkverhalten überprüfen.“
Kategorie: "Best Practices"
lang: "de"
Themen: „Grundprinzipien, Voraussetzung: das SafeKit Mosaik, Test 1 – Verteilung der Verbindungen, Test 2 – Wechsel des Dispatching-Servers, Test 3 – Überprüfung des GARP-Reroutings mit arp -a, Test 4 – End-to-End-Prüfung mit Wireshark (Windows) oder tcpdump (Linux), Von welchen Workstations aus getestet werden soll, Zusammenfassung der erwarteten Ergebnisse, Fehlerbehebung“
---

# Testen der Lastverteilung der virtuellen IP-Adresse in einem SafeKit <span class="notranslate farm-term" translate="no">farm</span> Cluster

Dieser Leitfaden beschreibt, wie Sie überprüfen können, ob ein SafeKit <span class="notranslate farm-term" translate="no">Farm</span> (<span class="notranslate farm-term" translate="no">Farm</span> Modul, Lastverteilung auf einer virtuellen IP-Adresse) in Ihrem Netzwerk korrekt funktioniert: Verteilung der Verbindungen auf die Knoten und Umleitung der virtuellen IP (VIP), wenn der Dispatcher-Knoten stoppt.

## 1. Grundprinzipien

**Voraussetzung:** Alle Knoten des <span class="notranslate farm-term" translate="no">Farm</span> müssen sich im selben Layer-2-IP-Subnetz befinden: einem LAN oder einem VLAN, das zwischen entfernten Standorten erweitert wird.

- Die virtuelle IP (VIP) wird lokal auf jedem Knoten des Systems konfiguriert: Sie wird als Alias der physischen IP-Adresse auf der Netzwerkkarte dieser Adresse festgelegt, wenn das System auf dem Knoten gestartet wird.
- Ein einzelner Knoten, der **Dispatching-Server**, empfängt den Netzwerkverkehr für die virtuelle IP (VIP) (`vmac_directed` Konfiguration, SafeKit Standard): Seine MAC-Adresse ist diejenige, die der virtuellen IP (VIP) in den ARP-Tabellen zugeordnet ist (Router, Gateway, Clients im selben Subnetz).
Der Kernelfilter dieses Knotens verteilt die TCP-Verbindungen auf die Knoten 012, indem er die Ziel-MAC-Adresse der Pakete in die des verarbeitenden Knotens ändert (die Ziel-IP-Adresse bleibt die virtuelle IP-Adresse (VIP)). Antworten werden direkt vom Knoten, der die Verbindung verarbeitet, an den Client gesendet.
- Die vom Filter durchgeführte Verteilung ist **deterministisch**: Der Verarbeitungsknoten wird anhand der Clientidentität gemäß der konfigurierten Lastverteilungsregel berechnet:
  - auf der Client-IP-Adresse **1 (`filter="on_addr"`): Ein bestimmter Client wird immer vom selben Knoten bedient, was die Sitzungsaffinität gewährleistet;
  - Am TCP-Port 1 des Clients (0) (2): Jede TCP-Verbindung desselben Clients kann von einem anderen Knoten bedient werden. Diese Regel wird für das Mosaik (Abschnitt 2) verwendet, das daher alle Knoten einer einzelnen Workstation anzeigt.
- Wenn der Dispatching-Server ausfällt, übernimmt ein anderer Knoten diese Rolle und sendet **GARPs** (gratuitous ARP), damit das Netzwerk die virtuelle IP (VIP) mit seiner eigenen MAC-Adresse verknüpft.

Was Sie daher testen müssen:

1. dass die Verbindungen korrekt auf alle Knoten verteilt sind;
2. dass das Netzwerk (Router, Gateway, Virtualisierung) GARP berücksichtigt, wenn sich der Dispatching-Server ändert.

## 2. Voraussetzung: das SafeKit Mosaik

Das Mosaik ist eine Testseite von SafeKit. Sie öffnet zahlreiche TCP-Verbindungen zur virtuellen IP-Adresse (VIP) und zeigt für jede Verbindung den Namen des antwortenden Knotens an. Dadurch wird die Verteilung auf einen Blick sichtbar.

1. Fügen Sie im Modul 123 im Abschnitt 4 die Load-Balancing-Regel für den Port des Webservers 5 hinzu. Beispiel mit dem Webserver 6 über HTTP auf Port 9010:

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   Wenn der SafeKit Webserver und die Konsole auf HTTPS umgestellt wurden, ersetzen Sie 9010 durch 9453.

2. Wenden Sie die Konfiguration auf allen Knoten an.
3. Stellen Sie von einem Browser auf einer Client-Workstation **außerhalb des <span class="notranslate farm-term" translate="no">Farm</span>** eine Verbindung zu folgendem her:

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   Geben Sie anschließend den Modulnamen <span class="notranslate farm-term" translate="no">Farm</span> ** ein und führen Sie den Test aus. Jede Zelle des Mosaiks zeigt den Namen des Knotens an, der auf die TCP-Verbindung geantwortet hat. Jedem Knoten ist eine Farbe zugeordnet, um die vom selben Knoten bedienten Mosaikblöcke deutlich zu kennzeichnen.

   Bei HTTPS verwenden Sie `https://<VIP>:9453/safekit/mosaic.html`, wobei die Load-Balancing-Regel auf Port 9453 angewendet wird.

Der Test wird im Detail im Benutzerhandbuch SafeKit 8.2, Abschnitt 4.3.5 "[Testen des TCP-Lastausgleichs auf einer virtuellen IP-Adresse](https://safekit.eviden.com/resources/safekit-user-guide-82/#Mosaic)" beschrieben.

## 3. Test 1 – Verteilung der Verbindungen

0 Schritte 1

1. Starten Sie <span class="notranslate farm-term" translate="no">Farm</span> auf allen Knoten (UP-Zustand).
2. Öffnen Sie das Mosaik von einer Client-Workstation aus.

**Erwartetes Ergebnis:** Das Mosaik zeigt die Namen **aller Knoten** der <span class="notranslate farm-term" translate="no">Farm</span> an, wobei für jeden Verarbeitungsknoten eine andere Farbe verwendet wird.

Dies beweist, dass der vorgelagerte Router oder das Gateway einen der Knoten über seine MAC-Adresse erreicht und dass dieser Knoten die Verbindungen korrekt verteilt.

## 4. Test 2 – Wechsel des Dispatching-Servers

Dieser Test überprüft, ob <span class="notranslate farm-term" translate="no">Farm</span> weiterhin reagiert, wenn der Dispatching-Server stoppt.

0 Schritte 1

1. Stoppe die <span class="notranslate farm-term" translate="no">Farm</span>, d.h. alle Knoten in SafeKit.
2. Starten Sie einen einzelnen Knoten. Dieser Knoten wird zum Dispatching-Server.
   → **Erwartetes Ergebnis:** Das Mosaik zeigt nur diesen Knoten an.
3. Starten Sie die anderen Knoten.
   → **Erwartetes Ergebnis:** Das Mosaik zeigt alle Knoten an.
4. Stoppen Sie den ersten Knoten (0), der als Dispatching-Server fungiert.
   → **Erwartetes Ergebnis:** Das Mosaik zeigt die verbleibenden Knoten an.

Einschränkung dieses Tests: Ein korrektes Ergebnis in Schritt 4 beweist nicht, dass GARP funktioniert. Wenn das Modul auf den anderen Knoten gestartet wird (Schritt 3), wird die virtuelle IP-Adresse auf diesen Knoten konfiguriert. Dies erzeugt Nachrichten im Netzwerk, die die Zuordnung von virtueller IP-Adresse und MAC-Adresse möglicherweise bereits umleiten. Nur die Tests 3 und 4 prüfen GARP tatsächlich.

> Das Anhalten eines anderen Knotens der <span class="notranslate farm-term" translate="no">Farm</span> (eines, der nicht der Dispatcher-Server ist) testet lediglich die Rekonfiguration der Verteilung.

## 5. Test 3 – Überprüfung des GARP-Reroutings mit `arp -a`

Zusammen mit Test 4 überprüft dieser Test tatsächlich GARP: Man notiert die MAC-Adresse des Dispatching-Servers, bevor man ihn stoppt, und überprüft dann, ob sich die Zuordnung der virtuellen IP (VIP)/MAC danach geändert hat.

Dieser Test ist nur möglich, wenn sich die Client-Workstation, die das Mosaik anzeigt, im selben IP-Subnetz befindet wie die Client-Workstation.

Befindet sich ein Router zwischen dem Client und dem Netzwerk <span class="notranslate farm-term" translate="no">Farm</span>, enthält die ARP-Tabelle des Clients nicht die virtuelle IP-Adresse (VIP), sondern die Adresse des Gateways, über das das Netzwerk <span class="notranslate farm-term" translate="no">Farm</span> erreicht wurde. Überprüfen Sie in diesem Fall die ARP-Tabelle des Routers oder Gateways mit dem Netzwerkteam.

0 Schritte 1

1. Beginnen Sie mit <span class="notranslate farm-term" translate="no">Farm</span> auf allen Knoten.
2. Führen Sie auf der Client-Workstation `arp -a` aus und notieren Sie sich die MAC-Adresse, die der virtuellen IP-Adresse (VIP) zugeordnet ist. Diese identifiziert den Dispatcher-Server.
3. Stoppen Sie den Knoten <span class="notranslate farm-term" translate="no">Farm</span>, der diese MAC-Adresse hat.
4. Überprüfen Sie, ob das Mosaik auch mit den verbleibenden Knoten noch funktioniert.
5. Führen Sie `arp -a` erneut aus, um die neue Zuordnung der virtuellen IP-Adresse (VIP)/MAC zu lesen und den neuen Dispatching-Server zu identifizieren.

## 6. Test 4 – End-to-End-Prüfung mit Wireshark (Windows) oder tcpdump (Linux)

Sie können eine TCP-Verbindung zur virtuellen IP (VIP) verfolgen, indem Sie Pakete auf dem Client und auf den Knoten <span class="notranslate farm-term" translate="no">Farm</span> erfassen: mit Wireshark auf Windows Rechnern und mit tcpdump auf Linux Rechnern.

Sie müssen die MAC-Header (Ethernet) der Pakete betrachten, nicht nur die IP-Adressen: Der Kernelfilter des Dispatching-Servers verteilt die Verbindungen, indem er die Ziel-MAC-Adresse der Pakete in die des Verarbeitungsknotens ändert. Die Ziel-IP-Adresse bleibt entlang des gesamten Pfades die virtuelle IP-Adresse (VIP).

**Was Sie für dasselbe SYN-Paket beobachten sollten:**

| Schritt | Wo soll erfasst werden? | Beobachtete MAC-Adressen |
|---|---|---|
1. Der Client sendet an die virtuelle IP (VIP) 1 Client 2 Client-MAC → MAC des 3 Dispatching-Servers 4 5
| 2. Der Dispatching-Server leitet die Verbindung | Dispatching-Server | Dispatching-MAC → MAC des **Verarbeitungsknotens ** | weiter
| 3. Der Verarbeitungsknoten empfängt | Verarbeitungsknoten | Dispatching MAC → Knoten MAC |
| 4. Der Knoten antwortet direkt dem Client | Verarbeitungsknoten | Knoten-MAC → Client-MAC |
| 5. Der Client empfängt die Antwort | Client | Knoten-MAC → Client-MAC |

Befindet sich die Client-Workstation in einem anderen Subnetz als <span class="notranslate farm-term" translate="no">Farm</span>, so ist die auf den Knoten <span class="notranslate farm-term" translate="no">Farm</span> angezeigte "Client-MAC" die MAC-Adresse des Gateways **Gateways ** (Routers), das die beiden Subnetze verbindet, und nicht die der Client-Workstation.

Wiederholen Sie die Aufzeichnung nach dem Stoppen des Dispatching-Servers (Test 2, Schritt 4): Schritt 1 muss nun die MAC-Adresse des **new** Dispatching-Servers anzeigen.

## 7. Von welchen Workstations soll getestet werden?

Das Verhalten hängt vom Netzwerkpfad zwischen dem Client und dem <span class="notranslate farm-term" translate="no">Farm</span> ab. Führen Sie die Tests 1 und 2 von jedem für Ihre Architektur relevanten Clienttyp aus:

| Standort des Kunden | Was der Test prüft |
|---|---|
| Client im **gleichen Subnetz** wie der <span class="notranslate farm-term" translate="no">Farm</span> | Aktualisierung der ARP-Tabellen der Clients durch GARP (Test 3 möglich) |
| Client in einem **anderen Subnetz** (Router, Gateway, virtuelles Hypervisor-Netzwerk) | GARP-Verarbeitung durch den Router oder das Gateway |
| Client-VM **auf einem Hypervisor, der auch eine <span class="notranslate farm-term" translate="no">Farm</span> VM ** | Verhalten des virtuellen Switches des Hypervisors, der auch internes Switching und Routing übernimmt |

## 8. Zusammenfassung der erwarteten Ergebnisse

0 Test 1 Aktion 2 Erwartetes Ergebnis 3
|---|---|---|
0 1 1 Alle Knoten UP, Mosaik 2 Alle Knoten erscheinen 3
0 2.2 1 Ein einzelner Knoten wurde gestartet 2 Nur dieser Knoten erscheint 3
0 2.3 1 Alle Knoten gestartet 2 Alle Knoten erscheinen 3
| 2.4 | Dispatching-Server gestoppt | Die verbleibenden Knoten erscheinen ohne dauerhafte Unterbrechung |
| 3 | `arp -a` vor und nach dem Stopp | Die mit der virtuellen IP (VIP) verknüpfte MAC-Adresse ändert sich |
| 4 | Wireshark- oder tcpdump-Aufzeichnung vor und nach dem Stopp | Der Client sendet an die MAC-Adresse des neuen Dispatching-Servers |

## 9. Fehlerbehebung

- 0: Das Mosaik reagiert nicht mehr, nachdem der Dispatching-Server gestoppt hat: 1: GARP wird von einem Gerät auf dem Pfad (Router, Gateway, virtueller Switch) nicht berücksichtigt. Bitte wenden Sie sich an Ihr Netzwerkteam, um die GARP-Verarbeitung zu klären.
- **Periodisches Senden von GARP:** Das `arpreroute="on"` Attribut des `<vip>` Abschnitts (mit `arpinterval` und `arpelapse`) sendet regelmäßig GARPs an die VIPs. Siehe Benutzerhandbuch, Abschnitt 13.6.4 „[`<vip>` Syntax](https://safekit.eviden.com/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax)“.
- **Diagnose der Auflösung von virtueller IP (VIP) zu MAC:** siehe Benutzerhandbuch, Abschnitt 7.24 "[Fehlerbehebung bei der Auflösung von virtueller IP (VIP) zu MAC](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Issue_with_VIP)", und Abschnitt 7.15 "[<span class="notranslate farm-term" translate="no">Farm</span> Modul UP (Bereit), aber Problem mit dem Lastausgleich in einem <span class="notranslate farm-term" translate="no">Farm</span>](<https://safekit.eviden.com/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>)".

## Demonstration der Lösung SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-de  %}}

Für ein Failover zwischen primärem und Backup-Server mit einer virtuellen IP-Adresse siehe [Testen der virtuellen IP-Adresse eines SafeKit mirror Clusters](/best-practises/test-primary-backup-vip-mirror/).

{{%  insert-safekit-4-buttons-de  %}}
