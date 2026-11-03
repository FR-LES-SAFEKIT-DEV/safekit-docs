---
title: "Testen der virtuellen IP-Adresse für den Lastausgleich in einem SafeKit farm Cluster"
canonical: "https://safekit.eviden.com/de/best-practises/test-load-balancing-vip-farm/"
description: "Lerne, wie man testet SafeKit Lastverteilung über die Clusterknoten hinweg und Überprüfung von Failover der virtuellen IP-Adresse, GARP-Umleitung und Netzwerkverhalten."
category: "best-practises"
lang: "de"
topics: "Grundprinzipien, Voraussetzung: die SafeKit Mosaik, Test 1 – Verteilung der Verbindungen, Test 2 – Wechsel des Dispatching-Servers, Test 3 – Überprüfung des GARP-Reroutings mit arp -a, Test 4 – End-to-End-Prüfung mit Wireshark (Windows) oder tcpdump (LinuxWelche Workstations sollen getestet werden? Zusammenfassung der erwarteten Ergebnisse, Fehlerbehebung"
---

# Testen der virtuellen IP-Adresse für den Lastausgleich in einem SafeKit <span class="notranslate farm-term" translate="no">farm</span> Cluster

Diese Anleitung beschreibt, wie man überprüft, ob ein SafeKit <span class="notranslate farm-term" translate="no">Farm</span> (<span class="notranslate farm-term" translate="no">Farm</span> Das Modul (Lastverteilung über eine virtuelle IP-Adresse) funktioniert in Ihrem Netzwerk korrekt: Verteilung der Verbindungen auf die Knoten und Umleitung der virtuellen IP-Adresse (VIP), wenn der Dispatcher-Knoten stoppt.

## 1. Grundprinzipien

**Voraussetzung:** alle Knoten des <span class="notranslate farm-term" translate="no">Farm</span> muss sich im selben Layer-2-IP-Subnetz befinden: einem LAN oder einem VLAN, das zwischen entfernten Standorten erweitert wird.

- Die virtuelle IP-Adresse (VIP) wird lokal auf jedem Knoten konfiguriert. <span class="notranslate farm-term" translate="no">Farm</span>: Es wird als Alias der physischen IP-Adresse auf der Netzwerkkarte dieser Adresse festgelegt, wenn die <span class="notranslate farm-term" translate="no">Farm</span> wird auf dem Knoten gestartet.
- Ein einzelner Knoten, der **Dispatching-Server**, empfängt den Netzwerkverkehr für die virtuelle IP (VIP) (`vmac_directed` Konfiguration, die SafeKit Standardmäßig ist seine MAC-Adresse diejenige, die in den ARP-Tabellen (Router, Gateway, Clients im selben Subnetz) mit der virtuellen IP-Adresse (VIP) verknüpft ist.
- Der Kernelfilter dieses Knotens verteilt dann die TCP-Verbindungen auf die Knoten des <span class="notranslate farm-term" translate="no">Farm</span>, von **die Ziel-MAC-Adresse neu schreiben** Die Pakete werden an den verarbeitenden Knoten weitergeleitet (die Ziel-IP-Adresse bleibt die virtuelle IP-Adresse (VIP)). Antworten werden direkt vom Knoten, der die Verbindung verarbeitet, an den Client gesendet.
- Die vom Filter durchgeführte Verteilung ist **deterministisch**Der Verarbeitungsknoten wird anhand der Clientidentität gemäß der konfigurierten Lastverteilungsregel berechnet:
  - auf **Client-IP-Adresse** (`filter="on_addr"`): Ein bestimmter Client wird immer vom selben Knoten bedient, wodurch die Sitzungsaffinität sichergestellt wird;
  - auf **Client-TCP-Port** (`filter="on_port"`Jede TCP-Verbindung desselben Clients kann von einem anderen Knoten bedient werden. Diese Regel wird für das Mosaik (Abschnitt 2) verwendet, das daher alle Knoten einer einzelnen Workstation anzeigt.
- Wenn der Dispatching-Server ausfällt, übernimmt ein anderer Knoten diese Rolle und sendet Nachrichten. **GARPs** (Gratuitous ARP), damit das Netzwerk die virtuelle IP-Adresse (VIP) mit seiner eigenen MAC-Adresse verknüpft.

Was Sie daher testen müssen:

1. dass die Verbindungen korrekt auf alle Knoten verteilt sind;
2. dass das Netzwerk (Router, Gateway, Virtualisierung) GARP berücksichtigt, wenn sich der Dispatching-Server ändert.

## 2. Voraussetzung: die SafeKit Mosaik

Das Mosaik ist eine Testseite, die bereitgestellt wird von SafeKitEs öffnet zahlreiche TCP-Verbindungen zur virtuellen IP-Adresse (VIP) und zeigt für jede Verbindung den Namen des antwortenden Knotens an. Dadurch wird die Verteilung auf einen Blick sichtbar.

1. Im `userconfig.xml` der <span class="notranslate farm-term" translate="no">Farm</span> Modul, im `<vip>` Fügen Sie im entsprechenden Abschnitt die Lastverteilungsregel für den Port hinzu. SafeKit Webserver. Beispiel mit dem SafeKit Webserver im HTTP-Modus auf Port 9010:

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   Wenn die SafeKit Webserver und Konsole wurden auf HTTPS umgestellt, Port 9010 wird durch Port 9453 ersetzt.

2. Wenden Sie die Konfiguration auf allen Knoten an.
3. Von einem Browser auf einer Client-Workstation **außerhalb der <span class="notranslate farm-term" translate="no">Farm</span>**, verbinden mit:

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   dann geben Sie Folgendes ein <span class="notranslate farm-term" translate="no">Farm</span> **Modulname** und führen Sie den Test aus. Jede Zelle des Mosaiks zeigt den Namen des Knotens an, der auf die TCP-Verbindung geantwortet hat, und jedem Knoten ist eine Farbe zugeordnet, um die Blöcke des Mosaiks, die vom selben Knoten bedient werden, deutlich anzuzeigen.

   Bei HTTPS verwenden Sie `https://<VIP>:9453/safekit/mosaic.html`, mit der Lastverteilungsregel auf Port 9453.

Der Test wird im Detail beschrieben in der SafeKit 8.2 Benutzerhandbuch, Abschnitt 4.3.5 "[Testen des TCP-Lastausgleichs auf einer virtuellen IP-Adresse](https://safekit.eviden.com/resources/safekit-user-guide-82/#Mosaic)".

Sehen Sie sich das Mosaiktestvideo im " an[Demonstration der SafeKit <span class="notranslate farm-term" translate="no">farm</span> Lösung](/de/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/#demonstration-of-the-safekit-farm-solution)" Abschnitt.

## 3. Test 1 – Verteilung der Verbindungen

**Schritte**

1. Starten Sie die <span class="notranslate farm-term" translate="no">Farm</span> auf allen Knoten (UP-Status).
2. Öffnen Sie das Mosaik von einer Client-Workstation aus.

**Erwartetes Ergebnis:** Das Mosaik zeigt die Namen von **alle Knoten** der <span class="notranslate farm-term" translate="no">Farm</span>, wobei jeder Verarbeitungsknoten eine andere Farbe hat.

Dies beweist, dass der vorgelagerte Router oder das Gateway einen der Knoten über seine MAC-Adresse erreicht und dass dieser Knoten die Verbindungen korrekt verteilt.

## 4. Test 2 – Wechsel des Dispatching-Servers

Dieser Test überprüft, ob die <span class="notranslate farm-term" translate="no">Farm</span> Das System reagiert weiterhin, auch wenn der Dispatching-Server stoppt.

**Schritte**

1. Stoppen Sie die <span class="notranslate farm-term" translate="no">Farm</span>, d.h. alle Knoten in SafeKit.
2. Start **ein einzelner Knoten**Dieser Knoten wird zum Dispatching-Server.
   → **Erwartetes Ergebnis:** Das Mosaik zeigt nur diesen Knoten an.
3. Starten Sie die anderen Knoten.
   → **Erwartetes Ergebnis:** Das Mosaik zeigt alle Knoten an.
4. Stoppen Sie die **erster Knoten**, der als Dispatching-Server fungiert.
   → **Erwartetes Ergebnis:** Das Mosaik zeigt die verbleibenden Knoten an.

> **Einschränkung dieses Tests:** Ein korrektes Ergebnis in Schritt 4 beweist nicht, dass GARP funktioniert. Wenn die <span class="notranslate farm-term" translate="no">Farm</span> Das Modul wird auf den anderen Knoten gestartet (Schritt 3). Die virtuelle IP-Adresse wird auf diesen Knoten konfiguriert, wodurch Nachrichten im Netzwerk generiert werden, die die Zuordnung von virtueller IP-Adresse und MAC-Adresse möglicherweise bereits umleiten. Nur die Tests 3 und 4 prüfen GARP tatsächlich.

> Anhalten eines beliebigen anderen Knotens <span class="notranslate farm-term" translate="no">Farm</span> (Einer, der nicht der Dispatching-Server ist) testet lediglich die Rekonfiguration der Verteilung.

## 5. Test 3 – Überprüfung des GARP-Reroutings mit `arp -a`

Zusammen mit Test 4 überprüft dieser Test tatsächlich GARP: Sie notieren die MAC-Adresse des Dispatching-Servers, bevor Sie ihn stoppen, und überprüfen dann, ob die virtuelle IP (VIP)/MAC Die Beziehungen haben sich im Nachhinein verändert.

Dieser Test ist nur möglich, wenn sich die Client-Workstation, die das Mosaik anzeigt, im ... befindet. **gleiches IP-Subnetz** als die <span class="notranslate farm-term" translate="no">Farm</span>.

Wenn sich zwischen dem Client und dem <span class="notranslate farm-term" translate="no">Farm</span>Die ARP-Tabelle des Clients enthält nicht die virtuelle IP-Adresse (VIP), sondern die Adresse des Gateways, über das der Client erreichbar ist. <span class="notranslate farm-term" translate="no">Farm</span>Das Netzwerk von [Name des Unternehmens]. In diesem Fall sollten Sie die ARP-Tabelle des Routers oder Gateways mit dem Netzwerkteam überprüfen.

**Schritte**

1. Starten Sie die <span class="notranslate farm-term" translate="no">Farm</span> auf allen Knoten.
2. Führen Sie auf der Client-Workstation folgenden Befehl aus: `arp -a` Notieren Sie sich außerdem die MAC-Adresse, die der virtuellen IP-Adresse (VIP) zugeordnet ist. Sie identifiziert den Dispatcher-Server.
3. Stoppen Sie die <span class="notranslate farm-term" translate="no">Farm</span> Knoten, der diese MAC-Adresse hat.
4. Prüfen Sie, ob das Mosaik auch mit den verbleibenden Knoten noch funktioniert.
5. Laufen `arp -a` erneut die neue virtuelle IP-Adresse (VIP) lesen/MAC Zuordnung und Identifizierung des neuen Dispatching-Servers.

## 6. Test 4 – End-to-End-Prüfung mit Wireshark (Windows) oder tcpdump (Linux)

Sie können eine TCP-Verbindung zur virtuellen IP-Adresse (VIP) verfolgen, indem Sie Pakete auf dem Client und auf dem Server erfassen. <span class="notranslate farm-term" translate="no">Farm</span> Knoten: mit Wireshark eingeschaltet Windows Maschinen und mit tcpdump auf Linux Maschinen.

Du musst dir das ansehen **MAC-Header (Ethernet) der Pakete**, nicht nur die IP-Adressen: Der Kernelfilter des Dispatching-Servers verteilt die Verbindungen nach **die Ziel-MAC-Adresse neu schreiben** der Pakete an den Verarbeitungsknoten. Die Ziel-IP-Adresse bleibt entlang des gesamten Pfades die virtuelle IP-Adresse (VIP).

**Was Sie bei demselben SYN-Paket beachten sollten:**

| Schritt | Wo man erfassen kann | Beobachtete MAC-Adressen |
|---|---|---|
| 1. Der Client sendet an die virtuelle IP-Adresse (VIP). | Kunde | Client-MAC → MAC des **Dispatching-Server** |
| 2. Der sendende Server leitet die Verbindung weiter. | Dispatching-Server | Dispatching MAC → MAC des **Verarbeitungsknoten** |
| 3. Der Verarbeitungsknoten empfängt | Verarbeitungsknoten | Dispatching MAC → node MAC |
| 4. Der Knoten antwortet direkt dem Client. | Verarbeitungsknoten | Knoten-MAC → Client-MAC |
| 5. Der Kunde erhält die Antwort | Kunde | Knoten-MAC → Client-MAC |

> Wenn sich die Client-Workstation in einem anderen Subnetz befindet als das <span class="notranslate farm-term" translate="no">Farm</span>, die "Client-MAC"-Adresse, die auf dem <span class="notranslate farm-term" translate="no">Farm</span> nodes ist die MAC-Adresse des **Tor** (Router), der die beiden Subnetze verbindet, nicht das der Client-Workstation.

Wiederholen Sie die Erfassung nach dem Stoppen des Dispatching-Servers (Test 2, Schritt 4): Schritt 1 muss nun die MAC-Adresse des **neu** Dispatching-Server.

## 7. Von welchen Workstations soll getestet werden?

Das Verhalten hängt vom Netzwerkpfad zwischen Client und Netzwerk ab. <span class="notranslate farm-term" translate="no">Farm</span>Führen Sie die Tests 1 und 2 für jeden Clienttyp durch, der für Ihre Architektur relevant ist:

| Kundenstandort | Was der Test überprüft |
|---|---|
| Kunde im **gleiches Subnetz** als die <span class="notranslate farm-term" translate="no">Farm</span> | Aktualisierung der ARP-Tabellen der Clients durch GARP (Test 3 möglich) |
| Kunde in einem **anderes Subnetz** (Router, Gateway, Hypervisor, virtuelles Netzwerk) | GARP-Verarbeitung durch den Router oder das Gateway |
| Client-VM **auf einem Hypervisor, der auch einen hostet <span class="notranslate farm-term" translate="no">Farm</span> VM** | Verhalten des virtuellen Switches des Hypervisors, der auch internes Switching und Routing übernimmt. |

## 8. Zusammenfassung der erwarteten Ergebnisse

| Prüfen | Aktion | Erwartetes Ergebnis |
|---|---|---|
| 1 | Alle Knoten aktiv, Mosaik | Alle Knoten erscheinen |
| 2.2 | Ein einzelner Knoten wurde gestartet | Nur dieser Knoten erscheint |
| 2.3 | Alle Knoten gestartet | Alle Knoten erscheinen |
| 2.4 | Dispatching-Server gestoppt | Die restlichen Knoten erscheinen ohne dauerhafte Unterbrechung |
| 3 | `arp -a` vor und nach dem Stopp | Die der virtuellen IP-Adresse (VIP) zugeordnete MAC-Adresse ändert sich |
| 4 | Wireshark- oder tcpdump-Aufzeichnung vor und nach dem Stopp | Der Client sendet an die MAC-Adresse des neuen Dispatching-Servers. |

## 9. Fehlerbehebung

- **Das Mosaik reagiert nicht mehr, nachdem der sendende Server gestoppt hat:** GARP wird von keinem Gerät auf dem Pfad (Router, Gateway, virtueller Switch) berücksichtigt. Klären Sie die GARP-Verarbeitung mit Ihrem Netzwerkteam.
- **Periodisches Senden von GARP:** Die `arpreroute="on"` Attribut des `<vip>` Abschnitt (mit `arpinterval` Und `arpelapse`) sendet regelmäßig GARPs an die VIPs. Siehe Benutzerhandbuch, Abschnitt 13.6.4.[`<vip>` Syntax](https://safekit.eviden.com/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax)".
- **Diagnose der Auflösung von virtueller IP (VIP) ↔ MAC:** Siehe Benutzerhandbuch, Abschnitt 7.24.[Fehlerbehebung bei der Auflösung von virtuellen IP-Adressen (VIP) auf MAC-Adressen](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Issue_with_VIP)", und Abschnitt 7.15 "[<span class="notranslate farm-term" translate="no">Farm</span> Modul UP (Bereit), aber Problem der Lastverteilung in einem <span class="notranslate farm-term" translate="no">Farm</span>](<https://safekit.eviden.com/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>)".

## Demonstration der SafeKit <span class="notranslate farm-term" translate="no">farm</span> Lösung {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-de  %}}

Informationen zum Failover zwischen primärem und Backup-System mit einer virtuellen IP-Adresse finden Sie unter [Testen der virtuellen IP-Adresse eines SafeKit mirror Cluster](/de/best-practises/test-primary-backup-vip-mirror/).

{{%  insert-safekit-4-buttons-de  %}}
