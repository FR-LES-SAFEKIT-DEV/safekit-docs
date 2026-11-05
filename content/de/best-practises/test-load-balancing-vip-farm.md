---
title: "Testen der virtuellen IP-Adresse für das Lastausgleichsverfahren in einem SafeKit Farm-Cluster"
canonical: "https://safekit.eviden.com/de/best-practises/test-load-balancing-vip-farm/"
description: "Erfahren Sie, wie Sie das SafeKit-Lastausgleichsverfahren über Clusterknoten hinweg testen und das Failover virtueller IPs, GARP Umlenkung und das Netzwerkverhalten überprüfen."
category: "best-practises"
lang: "de"
topics: "Schlüsselprinzipien, Voraussetzung: das SafeKit-Mosaik, Test 1 – Verteilung der Verbindungen, Test 2 – Änderung des Dispatching-Servers, Test 3 – Überprüfung GARP Umleitung mit arp -a, Test 4 – End-to-End-Überprüfung mit Wireshark (Windows) oder tcpdump (Linux), Von welchen Workstations aus getestet werden soll, Zusammenfassung der erwarteten Ergebnisse, Fehlerbehebung, Demonstration der SafeKit farm -Lösung"
translation: "translate_md 2026-11-05.12 | glossaire 2026-11-05.15 | Translation LLM | 17 expressions"
---

# Testen der virtuellen IP-Adresse für das Lastausgleichsverfahren in einem SafeKit <span class="notranslate farm-term" translate="no">Farm</span>-Cluster {#testing-the-load-balancing-virtual-ip-address-in-a-safekit-farm-cluster}

Diese Anleitung beschreibt, wie Sie überprüfen, ob eine SafeKit <span class="notranslate farm-term" translate="no">Farm</span> (<span class="notranslate farm-term" translate="no">Farm</span> Modul, Lastausgleich auf einer virtuellen IP-Adresse) in Ihrem Netzwerk korrekt funktioniert: Verteilung der Verbindungen über die Knoten und Umleitung der virtuellen IP (VIP), wenn der Dispatching-Knoten stoppt.

## 1. Grundprinzipien {#1-key-principles}

**Voraussetzung:** Alle Knoten der <span class="notranslate farm-term" translate="no">Farm</span> müssen sich im selben Layer-2-IP-Subnetz befinden: einem LAN oder einem VLAN, das zwischen entfernten Standorten erweitert wird.

- Die virtuelle IP (VIP) wird lokal auf jedem Knoten der <span class="notranslate farm-term" translate="no">Farm</span> konfiguriert: Sie wird als Alias der physischen IP-Adresse auf der Netzwerkkarte dieser Adresse festgelegt, wenn die <span class="notranslate farm-term" translate="no">Farm</span> auf dem Knoten gestartet wird.
- Ein einzelner Knoten, der **Dispatching-Server**, empfängt den Netzwerkverkehr für die virtuelle IP (VIP) (`vmac_directed` Konfiguration, der SafeKit-Standard): Seine MAC-Adresse ist diejenige, die der virtuellen IP (VIP) in den ARP-Tabellen (Router, Gateway, Clients im selben Subnetz) zugeordnet ist.
- Der Kernel-Filter dieses Knotens verteilt dann die TCP-Verbindungen auf die Knoten der <span class="notranslate farm-term" translate="no">Farm</span>, indem **er die MAC-Adresse des Zielpakets in die des Verarbeitungsknotens umschreibt** (die IP-Adresse des Ziels bleibt die virtuelle IP (VIP)). Antworten werden direkt vom Knoten, der die Verbindung verarbeitet, an den Client gesendet.
- Die vom Filter durchgeführte Verteilung ist **deterministisch**: Der Verarbeitungsknoten wird aus der Identität des Clients gemäß der konfigurierten Lastausgleichsregel berechnet:
  - auf der **Client-IP-Adresse** (`filter="on_addr"`): Ein bestimmter Client wird immer vom selben Knoten bedient, was die Sitzungsaffinität sicherstellt;
  - am **Client-TCP-Port** (`filter="on_port"`): Jede TCP-Verbindung vom selben Client kann von einem anderen Knoten bedient werden. Dies ist die Regel, die für Mosaik (Abschnitt 2) verwendet wird, die daher alle Knoten von einer einzigen Workstation anzeigt.
- Wenn der Dispatching-Server stoppt, übernimmt ein anderer Knoten diese Rolle und sendet **GARPs** (Gratuitous ARP), sodass das Netzwerk die virtuelle IP (VIP) mit seiner eigenen MAC-Adresse verbindet.

Was Sie daher testen müssen:

1. dass die Verbindungen korrekt auf alle Knoten verteilt sind;
2. dass das Netzwerk (Router, Gateway, Virtualisierung) den GARP berücksichtigt, wenn der Dispatching-Server wechselt.

## 2. Voraussetzung: das SafeKit-Mosaik {#2-prerequisite-the-safekit-mosaic}

Das Mosaik ist eine Testseite, die von SafeKit bereitgestellt wird. Es öffnet viele TCP-Verbindungen zur virtuellen IP (VIP) und zeigt für jede einzelne den Namen des Knotens an, der geantwortet hat. Dies zeigt die Verteilung auf einen Blick.

1. Fügen Sie in der `userconfig.xml` des <span class="notranslate farm-term" translate="no">Farm</span> Moduls im Abschnitt `<vip>` die Lastausgleichsregel für den Port des SafeKit-Webservers hinzu. Beispiel mit dem SafeKit-Webserver in HTTP auf Port 9010:

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   Wenn der SafeKit-Webserver und die Konsole auf HTTPS umgestellt wurden, ersetzen Sie 9010 durch 9453.

2. Wenden Sie die Konfiguration auf alle Knoten an.
3. Verbinden Sie sich von einem Browser auf einer Client-Workstation **außerhalb der <span class="notranslate farm-term" translate="no">Farm</span>** mit:

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   Geben Sie dann den Namen des <span class="notranslate farm-term" translate="no">Farm</span> **-Moduls** ein und führen Sie den Test aus. Jede Zelle des Mosaik zeigt den Namen des Knotens an, der auf die TCP-Verbindung reagiert hat, und jedem Knoten ist eine Farbe zugeordnet, um die Blöcke des Mosaik die vom selben Knoten bereitgestellt werden, deutlich anzuzeigen.

   Verwenden Sie bei HTTPS `https://<VIP>:9453/safekit/mosaic.html` mit der Lastausgleichsregel auf Port 9453.

![Testen Sie die virtuelle IP-Adresse einer SafeKit <span class="notranslate farm-term" translate="no">farm</span> mit dem Mosaik](/wp-content/uploads/2024/03/appli-19.png)

Sehen Sie sich das Mosaik -Testvideo im Abschnitt „ [Demonstration der SafeKit <span class="notranslate farm-term" translate="no">farm</span> Lösung](/de/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/#demonstration-of-the-safekit-farm-solution) “ an.

## 3. Test 1 – Verteilung der Verbindungen {#3-test-1--distribution-of-connections}

**Schritte**

1. Starten Sie die <span class="notranslate farm-term" translate="no">Farm</span> auf allen Knoten (Zustand UP).
2. Öffnen Sie Mosaik von einem Client-Arbeitsplatz aus.

**Erwartetes Ergebnis:** Das Mosaik zeigt die Namen **aller Knoten** der <span class="notranslate farm-term" translate="no">Farm</span> an, wobei jeder Verarbeitungsknoten eine andere Farbe hat.

Dies beweist, dass der vorgelagerte Router oder das Gateway einen der Knoten über dessen MAC-Adresse erreicht und dass dieser Knoten die Verbindungen korrekt verteilt.

## 4. Test 2 – Wechsel des Dispatching-Servers {#4-test-2--change-of-dispatching-server}

Dieser Test prüft, ob die <span class="notranslate farm-term" translate="no">Farm</span> weiterhin reagiert, wenn der Dispatching-Server stoppt.

**Schritte**

1. Stoppen Sie die <span class="notranslate farm-term" translate="no">Farm</span>, d. h. alle Knoten in SafeKit.
2. Starten Sie **einen einzelnen Knoten**. Dieser Knoten wird zum Dispatching-Server.
   → **Erwartetes Ergebnis:** Das Mosaik zeigt nur diesen Knoten an.
3. Starten Sie die anderen Knoten.
   → **Erwartetes Ergebnis:** Das Mosaik zeigt alle Knoten an.
4. Stoppen Sie den **ersten Knoten**, der als Dispatching-Server fungiert.
   → **Erwartetes Ergebnis:** Das Mosaik zeigt die verbleibenden Knoten an.

> **Einschränkung dieses Tests:** Ein korrektes Ergebnis in Schritt 4 beweist nicht, dass GARP funktioniert. Wenn das <span class="notranslate farm-term" translate="no">Farm</span> Modul auf den anderen Knoten gestartet wird (Schritt 3), wird die virtuelle IP-Adresse auf diesen Knoten konfiguriert, was Nachrichten im Netzwerk erzeugt, die die Zuordnung von virtueller IP-Adresse/MAC-Adresse möglicherweise bereits umleiten. Nur die Tests 3 und 4 testen GARP wirklich.

> Das Anhalten eines anderen Knotens der <span class="notranslate farm-term" translate="no">Farm</span> (einer, der nicht der Dispatching-Server ist) testet nur die Neukonfiguration der Verteilung.

## 5. Test 3 – Überprüfung GARP -Umleitung mit `arp -a` {#5-test-3--checking-garp-rerouting-with-arp--a}

Zusammen mit Test 4 prüft dieser Test wirklich GARP: Sie notieren die MAC-Adresse des Dispatching-Servers, bevor Sie ihn stoppen, und prüfen dann, ob sich die Zuordnung von virtueller IP (VIP)/MAC danach geändert hat.

Dieser Test ist nur möglich, wenn sich die Client-Workstation, auf der Mosaik angezeigt wird, im **selben IP-Subnetz** wie die <span class="notranslate farm-term" translate="no">Farm</span> befindet.

Wenn sich ein Router zwischen dem Client und der <span class="notranslate farm-term" translate="no">Farm</span> befindet, enthält die ARP-Tabelle des Clients nicht die virtuelle IP (VIP), sondern die Adresse des Gateways, das zum Erreichen des Netzwerks der <span class="notranslate farm-term" translate="no">Farm</span> verwendet wird. In diesem Fall überprüfen Sie die ARP-Tabelle des Routers oder Gateways mit dem Netzwerkteam.

**Schritte**

1. Starten Sie die <span class="notranslate farm-term" translate="no">Farm</span> auf allen Knoten.
2. Führen Sie auf der Client-Workstation `arp -a` aus und notieren Sie die MAC-Adresse, die der virtuellen IP-Adresse (VIP) zugeordnet ist. Sie identifiziert den Dispatching-Server.
3. Stoppen Sie den <span class="notranslate farm-term" translate="no">Farm</span> Knoten mit dieser MAC-Adresse.
4. Überprüfen Sie, ob das Mosaik mit den verbleibenden Knoten noch funktioniert.
5. Führen Sie `arp -a` erneut aus, um die neue Zuordnung von virtueller IP (VIP) und MAC-Adresse zu lesen und den neuen Dispatching-Server zu identifizieren.

## 6. Test 4 – End-to-End-Prüfung mit Wireshark (Windows) oder tcpdump (Linux) {#6-test-4--end-to-end-check-with-wireshark-windows-or-tcpdump-linux}

Sie können eine TCP-Verbindung zur virtuellen IP (VIP) verfolgen, indem Sie Pakete auf dem Client und auf den <span class="notranslate farm-term" translate="no">Farm</span> -Knoten erfassen: mit Wireshark auf Windows-Rechnern und mit tcpdump auf Linux-Rechnern.

Sie müssen die **MAC-Header (Ethernet) der Pakete** betrachten, nicht nur die IP-Adressen: Der Kernel-Filter des Dispatching-Servers verteilt die Verbindungen, indem **er die MAC-Adresse des Zielknotens der Pakete in die des Verarbeitungsknotens umschreibt**. Die IP-Adresse des Ziels bleibt die virtuelle IP (VIP) entlang des gesamten Pfades.

**Was Sie für dasselbe SYN-Paket beachten sollten:**

| Schritt | Wo Pakete erfasst werden sollen | Beobachtete MAC-Adressen |
|---|---|---|
| 1. Der Client sendet an die virtuelle IP-Adresse (VIP). | Kunde | Client-MAC → MAC des **Dispatching-Servers** |
| 2. Der Dispatching-Server leitet die Verbindung weiter. | Dispatching-Server | Dispatching-Server MAC → MAC des **Verarbeitungsknotens** |
| 3. Der Verarbeitungsknoten empfängt | Verarbeitungsknoten | Dispatching-Server-MAC → Knoten-MAC |
| 4. Der Knoten antwortet direkt an den Client. | Verarbeitungsknoten | Knoten-MAC → Client-MAC |
| 5. Der Client erhält die Antwort. | Kunde | Knoten-MAC → Client-MAC |

> Wenn sich die Client-Workstation in einem anderen Subnetz als die <span class="notranslate farm-term" translate="no">Farm</span> befindet, ist die auf den <span class="notranslate farm-term" translate="no">Farm</span> -Knoten angezeigte „Client-MAC“ die MAC-Adresse des **Gateways** (Routers), das die beiden Subnetze verbindet, und nicht die der Client-Workstation.

Wiederholen Sie die Erfassung, nachdem Sie den Dispatching-Server gestoppt haben (Test 2, Schritt 4): Schritt 1 muss nun die MAC-Adresse des **neuen** Dispatching-Servers anzeigen.

## 7. Von welchen Arbeitsplätzen aus testen? {#7-which-workstations-to-test-from}

Das Verhalten hängt vom Netzwerkpfad zwischen dem Client und der <span class="notranslate farm-term" translate="no">Farm</span> ab. Führen Sie die Tests 1 und 2 von jedem Client-Typ aus, der für Ihre Architektur relevant ist:

| Standort des Kunden | Was der Test prüft |
|---|---|
| Client im **selben Subnetz** wie die <span class="notranslate farm-term" translate="no">Farm</span> | Aktualisierung der ARP-Tabellen der Clients durch GARP (Test 3 möglich) |
| Client in einem **anderen Subnetz** (Router, Gateway, virtuelles Netzwerk des Hypervisors) | GARP -Verarbeitung durch den Router oder das Gateway |
| Client-VM **auf einem Hypervisor, der auch eine <span class="notranslate farm-term" translate="no">Farm</span> VM hostet** | Verhalten des virtuellen Switches des Hypervisors, der auch das interne Switching und Routing übernimmt |

## 8. Zusammenfassung der erwarteten Ergebnisse {#8-summary-of-expected-results}

| Test | Aktion | Erwartetes Ergebnis |
|---|---|---|
| 1 | Alle Knoten UP, Mosaik | Alle Knoten werden angezeigt. |
| 2.2 | Ein einzelner Knoten wurde gestartet. | Nur dieser Knoten wird angezeigt. |
| 2.3 | Alle Knoten gestartet | Alle Knoten werden angezeigt. |
| 2.4 | Dispatching-Server gestoppt | Die restlichen Knoten erscheinen ohne bleibende Unterbrechung. |
| 3 | `arp -a` vor und nach dem Stopp | Die der virtuellen IP-Adresse (VIP) zugeordnete MAC-Adresse ändert sich. |
| 4 | Wireshark- oder tcpdump-Mitschnitt vor und nach dem Stopp | Der Client sendet an die MAC-Adresse des neuen Dispatching-Servers. |

## 9. Fehlerbehebung {#9-troubleshooting}

- **Load-Balancing-Bitmaps:** Einzelheiten zum Test und zu den Load-Balancing-Bitmaps finden Sie im SafeKit 8.2 Benutzerhandbuch, Abschnitt 4.3.5 " [Testen des TCP-Load-Balancings auf einer virtuellen IP-Adresse](https://safekit.eviden.com/de/resources/safekit-user-guide-82/#Mosaic) ".
- **Das Mosaik reagiert nicht mehr, nachdem der Dispatching-Server gestoppt wurde:** GARP wird von einem Gerät auf dem Pfad (Router, Gateway, virtueller Switch) nicht berücksichtigt. Überprüfen Sie GARP -Verarbeitung mit Ihrem Netzwerkteam.
- **Regelmäßiges Senden von GARP:** Das Attribut `arpreroute="on"` des `<vip>`-Abschnitts (mit `arpinterval` und `arpelapse`) sendet regelmäßig GARPs an die VIPs. Siehe Benutzerhandbuch, Abschnitt 13.6.4 „ [`<vip>`-Syntax](https://safekit.eviden.com/de/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) “.
- **Diagnose der virtuellen IP (VIP) ↔ MAC-Auflösung:** Siehe Benutzerhandbuch, Abschnitt 7.24 „ [Fehlerbehebung bei der virtuellen IP (VIP) ↔ MAC-Auflösung](https://safekit.eviden.com/de/resources/safekit-user-guide-82/#_Issue_with_VIP) “ und Abschnitt 7.15 „ [<span class="notranslate farm-term" translate="no">Farm</span> -Modul UP (Ready), aber Problem der Lastverteilung in einer <span class="notranslate farm-term" translate="no">Farm</span>](<https://safekit.eviden.com/de/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>) “.

## Demonstration der SafeKit <span class="notranslate farm-term" translate="no">farm</span> Lösung {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-de  %}}

Für weitere Informationen:
- [Wie funktioniert eine virtuelle IP-Adresse in einem Hochverfügbarkeits-Cluster?](/de/best-practises/how-a-virtual-ip-address-works/)
- Informationen zum primären/Backup-Failover mit einer virtuellen IP-Adresse finden Sie [unter Testen der virtuellen IP-Adresse eines SafeKit Mirror-Cluster](/de/best-practises/test-primary-backup-vip-mirror/).

{{%  insert-safekit-4-buttons-de  %}}
