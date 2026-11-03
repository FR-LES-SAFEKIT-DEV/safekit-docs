---
title: "Testen der Lastverteilungs- IP -Adresse in einem SafeKit farm"
canonical: "https://safekit.eviden.com/de/best-practises/test-load-balancing-vip-farm/"
description: "Erfahren Sie, wie Sie SafeKit Lastausgleich über Clusterknoten hinweg testen und das virtuelle IP Failover, GARP Rerouting und das Netzwerkverhalten überprüfen können."
category: "best-practises"
lang: "de"
topics: "Grundprinzipien, Voraussetzung: SafeKit Mosaik, Test 1 – Verteilung der Verbindungen, Test 2 – Wechsel des Dispatching-Servers, Test 3 – Überprüfung GARP Reroutings mit arp -a, Test 4 – End-to-End-Test mit Wireshark ( Windows ) oder tcpdump ( Linux ), Welche Workstations sollen getestet werden?, Zusammenfassung der erwarteten Ergebnisse, Fehlerbehebung"
---

# Testen der Lastverteilungs- IP -Adresse in einem SafeKit <span class="notranslate farm-term" translate="no">farm</span>

Dieser Leitfaden beschreibt, wie Sie überprüfen können, ob eine SafeKit <span class="notranslate farm-term" translate="no">Farm</span> ( <span class="notranslate farm-term" translate="no">Farm</span> Modul, Lastverteilung über eine virtuelle IP Adresse) in Ihrem Netzwerk korrekt funktioniert: Verteilung der Verbindungen auf die Knoten und Umleitung der virtuellen IP ( VIP ), wenn der Dispatcher-Knoten stoppt.

## 1. Grundprinzipien

**Voraussetzung:** Alle Knoten der <span class="notranslate farm-term" translate="no">Farm</span> müssen sich im selben Layer-2 IP Subnetz befinden: einem LAN oder einem VLAN , das sich über entfernte Standorte erstreckt.

- Die virtuelle IP ( VIP ) wird lokal auf jedem Knoten der <span class="notranslate farm-term" translate="no">Farm</span> konfiguriert: Sie wird als Alias der physischen IP Adresse auf der Netzwerkkarte dieser Adresse festgelegt, wenn die <span class="notranslate farm-term" translate="no">Farm</span> auf dem Knoten gestartet wird.
- Ein einzelner Knoten, der **Dispatching-Server** , empfängt den Netzwerkverkehr für die virtuelle IP ( VIP ) ( `vmac_directed` Konfiguration, SafeKit Standard): Seine MAC -Adresse ist diejenige, die in den ARP Tabellen (Router, Gateway, Clients im selben Subnetz) mit der virtuellen IP ( VIP ) verknüpft ist.
- Der Kernelfilter dieses Knotens verteilt die TCP Verbindungen auf die Knoten der <span class="notranslate farm-term" translate="no">Farm</span> , indem **er die Ziel MAC -Adresse der Pakete in die des verarbeitenden Knotens ändert** (die Ziel IP -Adresse bleibt die virtuelle IP ( VIP )). Antworten werden direkt vom Knoten, der die Verbindung verarbeitet, an den Client gesendet.
- Die vom Filter durchgeführte Verteilung ist **deterministisch** : Der Verarbeitungsknoten wird anhand der Clientidentität gemäß der konfigurierten Lastverteilungsregel berechnet:
  - auf der **Client IP -Adresse** ( `filter="on_addr"` ): Ein bestimmter Client wird immer vom selben Knoten bedient, was die Sitzungsaffinität gewährleistet;
  - Am **Client TCP Port** ( `filter="on_port"` ): Jede TCP Verbindung desselben Clients kann von einem anderen Knoten bedient werden. Diese Regel wird für das Mosaik (Abschnitt 2) verwendet, das daher alle Knoten einer einzelnen Workstation anzeigt.
- Wenn der Dispatching-Server ausfällt, übernimmt ein anderer Knoten diese Rolle und sendet **GARPs** (gratuitous ARP ), damit das Netzwerk die virtuelle IP ( VIP ) mit seiner eigenen MAC Adresse verknüpft.

Was Sie daher testen müssen:

1. dass die Verbindungen korrekt auf alle Knoten verteilt sind;
2. dass das Netzwerk (Router, Gateway, Virtualisierung) GARP berücksichtigt, wenn sich der Dispatching-Server ändert.

## 2. Voraussetzung: das SafeKit Mosaik

Das Mosaik ist eine Testseite von SafeKit . Sie öffnet zahlreiche TCP Verbindungen zur virtuellen IP ( VIP ) und zeigt für jede Verbindung den Namen des antwortenden Knotens an. So lässt sich die Verteilung auf einen Blick darstellen.

1. Fügen Sie in der `userconfig.xml` des <span class="notranslate farm-term" translate="no">Farm</span> Moduls im Abschnitt `<vip>` die Load-Balancing-Regel für den Port des SafeKit -Webservers hinzu. Beispiel mit dem SafeKit -Webserver über HTTP auf Port 9010:

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   Wenn der SafeKit Webserver und die Konsole auf HTTPS umgestellt wurden, ersetzen Sie 9010 durch 9453.

2. Wenden Sie die Konfiguration auf allen Knoten an.
3. Stellen Sie von einem Browser auf einer Client-Workstation **außerhalb der <span class="notranslate farm-term" translate="no">Farm</span>** eine Verbindung her zu:

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   Geben Sie anschließend den **Namen des Farmmoduls** <span class="notranslate farm-term" translate="no">Farm</span> und führen Sie den Test aus. Jede Zelle des Mosaiks zeigt den Namen des Knotens an, der auf die TCP Verbindung geantwortet hat. Jedem Knoten ist eine Farbe zugeordnet, um die vom selben Knoten bedienten Blöcke des Mosaiks deutlich zu kennzeichnen.

   Verwenden Sie bei HTTPS `https://<VIP>:9453/safekit/mosaic.html` mit der Load-Balancing-Regel auf Port 9453.

Sehen Sie sich das Mosaik-Testvideo im Abschnitt "[Demonstration der SafeKit <span class="notranslate farm-term" translate="no">farm</span> ](/de/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/#demonstration-of-the-safekit-farm-solution) " an.

## 3. Test 1 – Verteilung der Verbindungen

**Schritte**

1. Die <span class="notranslate farm-term" translate="no">Farm</span> wird auf allen Knoten gestartet (Status: UP ).
2. Öffnen Sie das Mosaik von einer Client-Workstation aus.

**Erwartetes Ergebnis:** Das Mosaik zeigt die Namen **aller Knoten** der <span class="notranslate farm-term" translate="no">Farm</span> an, wobei jeder Verarbeitungsknoten eine andere Farbe hat.

Dies beweist, dass der vorgelagerte Router oder das Gateway einen der Knoten über seine MAC -Adresse erreicht und dass dieser Knoten die Verbindungen korrekt verteilt.

## 4. Test 2 – Wechsel des Dispatching-Servers

Dieser Test überprüft, ob die <span class="notranslate farm-term" translate="no">Farm</span> weiterhin reagiert, wenn der Dispatching-Server stoppt.

**Schritte**

1. Stoppt die <span class="notranslate farm-term" translate="no">Farm</span> , d.h. alle Knoten in SafeKit .
2. Starten Sie **einen einzelnen Knoten** . Dieser Knoten wird zum Dispatching-Server.
   → **Erwartetes Ergebnis:** Das Mosaik zeigt nur diesen Knoten an.
3. Starten Sie die anderen Knoten.
   → **Erwartetes Ergebnis:** Das Mosaik zeigt alle Knoten an.
4. Stoppen Sie den **ersten Knoten** , der als Dispatching-Server fungiert.
   → **Erwartetes Ergebnis:** Das Mosaik zeigt die verbleibenden Knoten an.

> **Einschränkung dieses Tests:** Ein korrektes Ergebnis in Schritt 4 beweist nicht, dass GARP funktioniert. Beim Start des <span class="notranslate farm-term" translate="no">Farm</span> Moduls auf den anderen Knoten (Schritt 3) wird die virtuelle IP Adresse auf diesen Knoten konfiguriert. Dies erzeugt Nachrichten im Netzwerk, die die Zuordnung von virtueller IP Adresse und MAC -Adresse möglicherweise bereits umleiten. Nur die Tests 3 und 4 prüfen GARP tatsächlich.

> Das Anhalten eines beliebigen anderen Knotens der <span class="notranslate farm-term" translate="no">Farm</span> (eines, der nicht der Dispatcher-Server ist) testet lediglich die Rekonfiguration der Verteilung.

## 5. Test 3 – Überprüfung GARP -Reroutings mit `arp -a`

Zusammen mit Test 4 überprüft dieser Test tatsächlich GARP : Man notiert die MAC -Adresse des sendenden Servers, bevor man ihn stoppt, und überprüft anschließend, ob sich die Zuordnung von virtueller IP ( VIP ) und MAC geändert hat.

Dieser Test ist nur möglich, wenn sich die Client-Workstation, die das Mosaik anzeigt, im **selben IP Subnetz** wie die <span class="notranslate farm-term" translate="no">Farm</span> befindet.

Befindet sich ein Router zwischen dem Client und der <span class="notranslate farm-term" translate="no">Farm</span> , enthält die ARP Tabelle des Clients nicht die virtuelle IP ( VIP ), sondern die Adresse des Gateways, über das das Netzwerk der <span class="notranslate farm-term" translate="no">Farm</span> erreicht wird. In diesem Fall überprüfen Sie bitte die ARP Tabelle des Routers oder Gateways mit dem Netzwerkteam.

**Schritte**

1. Starte die <span class="notranslate farm-term" translate="no">Farm</span> auf allen Knoten.
2. Führen Sie auf der Client-Workstation `arp -a` aus und notieren Sie sich die MAC -Adresse, die der virtuellen IP ( VIP ) zugeordnet ist. Diese identifiziert den Dispatcher-Server.
3. Stoppen Sie den <span class="notranslate farm-term" translate="no">Farm</span> Knoten, der diese MAC Adresse hat.
4. Prüfen Sie, ob das Mosaik auch mit den verbleibenden Knoten noch funktioniert.
5. Führen Sie `arp -a` erneut aus, um die neue Zuordnung von virtueller IP ( VIP ) und MAC Adresse zu lesen und den neuen Dispatching-Server zu identifizieren.

## 6. Test 4 – End-to-End-Prüfung mit Wireshark ( Windows ) oder tcpdump ( Linux )

Sie können eine TCP -Verbindung zur virtuellen IP ( VIP ) verfolgen, indem Sie Pakete auf dem Client und auf den <span class="notranslate farm-term" translate="no">Farm</span> -Knoten erfassen: mit Wireshark auf Windows -Rechnern und mit tcpdump auf Linux -Rechnern.

Sie müssen die **MAC Header (Ethernet-Header) der Pakete** betrachten, nicht nur die IP -Adressen: Der Kernelfilter des Dispatching-Servers verteilt die Verbindungen, indem **er die Ziel MAC Adresse der Pakete in die des verarbeitenden Knotens umschreibt** . Die Ziel IP -Adresse bleibt entlang des gesamten Pfades die virtuelle IP ( VIP ).

**Was Sie bei demselben SYN Paket beachten sollten:**

| Schritt | Erfassungsort | Beobachtete MAC Adressen |
|---|---|---|
| 1. Der Client sendet an die virtuelle IP ( VIP ) | Client | Client- MAC → MAC des **sendenden Servers** |
| 2. Der Dispatching-Server leitet die Verbindung weiter | Dispatching-Server | Dispatching MAC → MAC des **Verarbeitungsknotens** |
| 3. Der Verarbeitungsknoten empfängt | Verarbeitungsknoten | Dispatching MAC → Knoten MAC |
| 4. Der Knoten antwortet direkt dem Client | Verarbeitungsknoten | Knoten- MAC → Client MAC |
| 5. Der Client empfängt die Antwort | Client | Knoten- MAC → Client MAC |

> Befindet sich die Client-Workstation in einem anderen Subnetz als die <span class="notranslate farm-term" translate="no">Farm</span> , so ist die auf den <span class="notranslate farm-term" translate="no">Farm</span> -Knoten angezeigte "Client- MAC " die MAC Adresse des **Gateways** (Routers), das die beiden Subnetze verbindet, und nicht die der Client-Workstation.

Wiederholen Sie die Aufzeichnung nach dem Stoppen des Dispatching-Servers (Test 2, Schritt 4): Schritt 1 muss nun die MAC Adresse des **neuen** Dispatching-Servers anzeigen.

## 7. Von welchen Workstations soll getestet werden?

Das Verhalten hängt vom Netzwerkpfad zwischen Client und <span class="notranslate farm-term" translate="no">Farm</span> ab. Führen Sie die Tests 1 und 2 von jedem für Ihre Architektur relevanten Clienttyp aus:

| Standort des Kunden | Was der Test prüft |
|---|---|
| Client im **selben Subnetz** wie die <span class="notranslate farm-term" translate="no">Farm</span> | Aktualisierung der ARP Tabellen der Clients durch GARP (Test 3 möglich) |
| Client in einem **anderen Subnetz** (Router, Gateway, virtuelles Hypervisor-Netzwerk) | GARP -Verarbeitung durch den Router oder das Gateway |
| Client-VM **auf einem Hypervisor, der auch eine <span class="notranslate farm-term" translate="no">Farm</span> VM hostet** | Verhalten des virtuellen Switches des Hypervisors, der auch internes Switching und Routing übernimmt |

## 8. Zusammenfassung der erwarteten Ergebnisse

| Test | Aktion | Erwartetes Ergebnis |
|---|---|---|
| 1 | Alle Knoten UP , Mosaik | Alle Knoten werden angezeigt |
| 2.2 | Ein einzelner Knoten wurde gestartet | Nur dieser Knoten wird angezeigt |
| 2.3 | Alle Knoten gestartet | Alle Knoten werden angezeigt |
| 2.4 | Dispatching-Server gestoppt | Die verbleibenden Knoten erscheinen ohne dauerhafte Unterbrechung |
| 3 | `arp -a` vor und nach dem Stopp | Die mit der virtuellen IP ( VIP ) verknüpfte MAC -Adresse ändert sich |
| 4 | Wireshark oder tcpdump -Aufzeichnung vor und nach dem Stopp | Der Client sendet an die MAC Adresse des neuen Dispatching-Servers |

## 9. Fehlerbehebung

- **Load-Balancing-Bitmaps:** Einzelheiten zum Test und den Load-Balancing-Bitmaps finden Sie im SafeKit 8.2 Benutzerhandbuch, Abschnitt 4.3.5 "[Test TCP load balancing on a virtual IP address ](https://safekit.eviden.com/resources/safekit-user-guide-82/#Mosaic) ".
- **Das Mosaik reagiert nicht mehr, nachdem der Dispatcher-Server gestoppt hat:** GARP wird von einem Gerät auf dem Pfad (Router, Gateway, virtueller Switch) nicht berücksichtigt. Klären Sie GARP -Verarbeitung mit Ihrem Netzwerkteam.
- **Periodisches Senden von GARP :** Das Attribut `arpreroute="on"` des Abschnitts `<vip>` (mit `arpinterval` und `arpelapse` ) sendet regelmäßig GARPs an die VIPs. Siehe Benutzerhandbuch, Abschnitt 13.6.4 „[ `<vip>` Syntax ](https://safekit.eviden.com/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) “.
- **Diagnose der Auflösung von virtueller IP ( VIP ) zu MAC :** siehe Benutzerhandbuch, Abschnitt 7.24 „[Fehlerbehebung bei der Auflösung von virtueller IP ( VIP ) zu MAC ](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Issue_with_VIP) “ und Abschnitt 7.15 „[ <span class="notranslate farm-term" translate="no">Farm</span> UP , aber Problem mit dem Lastausgleich in einer <span class="notranslate farm-term" translate="no">Farm</span> ](<https://safekit.eviden.com/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>) “.

## Demonstration der SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-de  %}}

Informationen zum Failover zwischen primärem und Backup-System mit einer virtuellen IP Adresse finden Sie unter [Testen der virtuellen IP -Adresse eines SafeKit -Mirror-Clusters ](/de/best-practises/test-primary-backup-vip-mirror/) .

{{%  insert-safekit-4-buttons-de  %}}
