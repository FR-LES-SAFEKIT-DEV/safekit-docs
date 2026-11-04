---
title: "Wie funktioniert eine virtuelle IP-Adresse in einem Hochverfügbarkeitscluster?"
canonical: "https://safekit.eviden.com/de/best-practises/how-a-virtual-ip-address-works/"
description: "Erfahren Sie, wie SafeKit eine virtuelle IP-Adresse bei einem Failover verschiebt: mit Gratuitous ARP, Load Balancern, Cloud-CLI oder BGP."
category: "best-practises"
lang: "de"
topics: "Was ist eine virtuelle IP-Adresse in einem Hochverfügbarkeitscluster?, Implementierung der virtuellen IP-Adresse in SafeKit, Funktionsweise einer virtuellen IP-Adresse im selben Subnetz (Mirror-Cluster), Funktionsweise einer virtuellen IP-Adresse in verschiedenen Subnetzen mit einem Load Balancer (Mirror-Cluster), Funktionsweise einer virtuellen IP-Adresse in verschiedenen Subnetzen mit Cloud-Provider-CLIs (Mirror-Cluster), Funktionsweise einer virtuellen IP-Adresse in verschiedenen Subnetzen mit BGP (Mirror-Cluster), Funktionsweise der DNS-Umleitung in verschiedenen Subnetzen (Mirror-Cluster), Funktionsweise des virtuellen IP-Load-Balancings in einem Farm-Cluster im selben Subnetz, Load-Balancing einer virtuellen IP-Adresse in verschiedenen Subnetzen (Farm-Cluster), Vergleich der Implementierung, Latenz und Anwendungstransparenz, Häufig gestellte Fragen zur virtuellen IP-Adresse, 🔍 SafeKit entdecken"
---

# Wie funktioniert eine virtuelle IP-Adresse in einem Hochverfügbarkeitscluster? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## Was ist eine virtuelle IP-Adresse in einem Hochverfügbarkeitscluster? {#virtual-ip-definition}

Eine **virtuelle IP-Adresse** ist die einzige Adresse, über die Clients eine Anwendung in einem [Hochverfügbarkeitscluster](</de/>) erreichen. Sie ist keinem bestimmten Server zugeordnet. Bei einem Failover wird sie auf den Server verschoben, auf dem die Anwendung läuft. Die Clients müssen ihre Konfiguration nicht ändern.

**Grundprinzip von SafeKit:** Die virtuelle IP-Adresse wird **lokal auf dem Server konfiguriert**, auf dem die Anwendung läuft. Die Anwendung wird unter dieser virtuellen IP-Adresse gestartet und empfängt die ursprüngliche Client-IP-Adresse. Deshalb funktionieren viele Anwendungen mit SafeKit ohne Änderungen. SafeKit unterstützt zwei Arten virtueller IP-Adressen:

  * **Primäre/sekundäre virtuelle IP-Adresse in einem Mirror-Cluster:** Die virtuelle IP-Adresse ist nur auf dem primären Server aktiv. Bei einem Failover wird sie auf den sekundären Server verschoben.
  * **Virtuelle IP-Adresse mit Network Load Balancing in einem <span class="notranslate farm-term" translate="no">farm</span>-Cluster:** Die virtuelle IP-Adresse ist gleichzeitig auf allen Servern aktiv. Der Datenverkehr wird auf sie verteilt.

## Implementierung der virtuellen IP-Adresse in SafeKit {#safekit-virtual-ip-implementation}

Dieser Artikel erklärt, wie SafeKit die virtuelle IP-Adresse je nach Netzwerkarchitektur verschiebt:

  * **Dasselbe Subnetz oder erweitertes LAN ([Mirror](#virtual-ip-same-subnet-failover) und [<span class="notranslate farm-term" translate="no">Farm</span>](#virtual-ip-load-balancing-same-subnet)):** SafeKit konfiguriert die virtuelle IP-Adresse auf dem Server und sendet ein **Gratuitous ARP (GARP)**. Externe Hardware ist nicht erforderlich. Dies ist die transparenteste Lösung, da SafeKit den gesamten Mechanismus implementiert.
  * **Verschiedene Subnetze mit einem Load Balancer ([Mirror](#virtual-ip-different-subnets-failover) und [<span class="notranslate farm-term" translate="no">Farm</span>](#virtual-ip-load-balancing-different-subnets)):** Der Load Balancer verwendet die **SafeKit-Integritätsprüfung**, um den Datenverkehr an den richtigen Server zu senden. Der Integrator konfiguriert den Load Balancer.
  * **[Verschiedene Subnetze mit Cloud-Provider-CLIs](#virtual-ip-cloud-cli-failover) (Mirror-Cluster):** Das SafeKit-Skript `start_prim` ruft die Cloud-CLI auf, um die virtuelle IP-Adresse zu verschieben. Das Skript wird vom Integrator erstellt.
  * **[Verschiedene Subnetze mit BGP](#virtual-ip-bgp-failover) (Mirror-Cluster):** Der primäre Server kündigt die virtuelle IP-Adresse bei den Routern an. Das Skript wird vom Integrator erstellt.
  * **[Verschiedene Subnetze mit DNS-Umleitung](#virtual-ip-vs-dns-redirection-failover) (Mirror-Cluster):** Das SafeKit-Skript `start_prim` ändert den DNS-Eintrag des virtuellen Namens und trägt die physische IP-Adresse des neuen primären Servers ein. Das Skript wird vom Integrator erstellt. Es gibt keine einzelne virtuelle IP-Adresse; diese Methode ist nicht für alle Clients zuverlässig.

In diesem Artikel:

  * [Vergleich der Implementierung, Latenz und Anwendungstransparenz](#virtual-ip-methods-comparison)
  * [Häufig gestellte Fragen zur virtuellen IP-Adresse](#virtual-ip-faq)
  * [🔍 SafeKit entdecken](#hub)

![Vergleich der virtuellen IP-Adressen in Evidian SafeKit: Mirror-Cluster mit einer übernehmbaren IP-Adresse auf dem aktiven Knoten und Farm-Cluster mit Network Load Balancing auf allen Knoten.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Implementierung virtueller IP-Adressen in Mirror- und <span class="notranslate farm-term" translate="no">Farm</span>-Clustern mit SafeKit.**

## Funktionsweise einer virtuellen IP-Adresse im selben Subnetz (Mirror-Cluster) {#virtual-ip-same-subnet-failover}

- [Virtuelle primäre/sekundäre IP-Adresse in einem SafeKit-Mirror-Cluster testen](/de/best-practises/test-primary-backup-vip-mirror/)

### Automatisches Failover und Netzwerkumleitung in einem lokalen Subnetz {#automated-failover--network-rerouting-in-a-local-subnet}

In einem lokalen Netzwerk verwaltet **SafeKit** die virtuelle IP-Adresse und das Anwendungs-Failover automatisch.

### Lokaler Mirror-Cluster: Failover mit zwei Knoten unter Windows oder Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}

![SafeKit-Failover einer virtuellen IP-Adresse zwischen zwei Servern im selben Subnetz](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

In einem **SafeKit-Mirror-Cluster** befinden sich die beiden Knoten im selben Subnetz. Die Hochverfügbarkeit basiert auf einer **virtuellen IP-Adresse**. SafeKit verwaltet diese Adresse im Netzwerk-Stack des Betriebssystems. Spezielle Hardware ist nicht erforderlich. Die virtuelle IP-Adresse wird mithilfe von **IP-Aliasing** zu den physischen IP-Adressen von Server 1 und Server 2 hinzugefügt. Clients verbinden sich immer mit der virtuellen IP-Adresse.

#### IP-Aliasing und mehrere virtuelle IP-Adressen (VIPs) in SafeKit {#safekits-advanced-ip-aliasing--multiple-virtual-ip-support}

Die virtuelle IP-Adresse ist eine dritte IP-Adresse, die zwischen den Knoten verschoben wird. SafeKit kann **mehrere virtuelle IP-Adressen** in einem Cluster verwalten. Sie können auf derselben oder auf verschiedenen Netzwerkkarten eingerichtet werden. So kann jeder Dienst eine eigene virtuelle IP-Adresse verwenden.

#### Failover-Mechanismus: Gratuitous ARP (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

Für ein Failover ist kein manueller Eingriff erforderlich. Im Normalbetrieb ist die virtuelle IP-Adresse mit der **MAC-Adresse von Server 1 (mac1)** verknüpft. Wenn Server 1 ausfällt, führt SafeKit drei Schritte aus:

  * **Aliasing der virtuellen IP-Adresse:** SafeKit richtet die virtuelle IP-Adresse als Alias auf der Netzwerkkarte von Server 2 ein, dem neuen primären Server. Das Betriebssystem sendet anschließend Nachrichten im Netzwerk, um die virtuelle IP-Adresse bekannt zu machen.
  * **GARP:** SafeKit sendet außerdem **Gratuitous-ARP-(GARP-)Nachrichten**. Netzwerk-Switches und Clients aktualisieren ihren ARP-Cache. Die virtuelle IP-Adresse ist nun mit der **MAC-Adresse von Server 2 (mac2)** verknüpft.
  * **Wiederherstellung der Anwendung:** SafeKit startet die Anwendungsdienste auf Server 2 neu.

#### Entfernte Rechenzentren und erweiterte VLANs {#remote-data-centers--extended-vlans}

Die oben beschriebene **Lösung im selben Subnetz** eignet sich auch für die **Notfallwiederherstellung (Disaster Recovery, DR)** zwischen entfernten Standorten. Sie ist oft die beste Wahl, wenn die Standorte über ein **erweitertes LAN oder ein gestrecktes VLAN** verbunden sind. Beide Standorte befinden sich dann in einem Subnetz. Das vereinfacht das Netzwerk und macht komplexe Routingprotokolle überflüssig.

> **⚠️ Hinweis:** Die Umleitung auf Layer 2 mit Gratuitous ARP ist für Anwendungen die **transparenteste Lösung**. Die Anwendung empfängt die ursprüngliche Client-IP-Adresse, und die virtuelle IP-Adresse ist lokal konfiguriert. **Viele Anwendungen benötigen** eine lokale virtuelle IP-Adresse. Ohne sie **funktionieren diese Anwendungen möglicherweise nicht korrekt**. In dieser Konfiguration im selben Subnetz implementiert SafeKit den gesamten Mechanismus; eine spezielle Integration ist nicht erforderlich.

## Funktionsweise einer virtuellen IP-Adresse in verschiedenen Subnetzen mit einem Load Balancer (Mirror-Cluster) {#virtual-ip-different-subnets-failover}

### Load Balancer mit SafeKit-Integritätsprüfungen {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![Diagramm eines Failovers einer virtuellen IP-Adresse mit einem Load Balancer zwischen zwei verschiedenen Subnetzen](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

Befinden sich die Knoten in **verschiedenen Subnetzen**, kann Gratuitous ARP die virtuelle IP-Adresse nicht verschieben. In diesem Fall liegt die virtuelle IP-Adresse auf einem **Load Balancer**, der den Datenverkehr an den primären Server sendet.

SafeKit stellt auf jedem Knoten eine **URL für die Integritätsprüfung** bereit:

  * **Primär (PRIM):** Gibt `HTTP 200 OK` zurück. Der Load Balancer sendet Datenverkehr an diesen Knoten.
  * **Sekundär (SECOND):** Gibt `HTTP 404 NOT FOUND` zurück. Der Load Balancer sendet keinen Datenverkehr an diesen Knoten.

Bei einem Failover ändert SafeKit die Antworten. Der Load Balancer sendet den Datenverkehr dann an den neuen primären Server. Dies ist die Standardlösung zwischen **Verfügbarkeitszonen** auf [**AWS**](</de/solutions/aws-high-availability-cluster-synchronous-replication-failover/>), [**Azure**](</de/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) und [**Google Cloud**](</de/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>).

> **⚠️ Hinweis:** SafeKit stellt die Integritätsprüfung bereit. Der Load Balancer wird von Ihrem Netzwerk oder Cloud-Provider bereitgestellt.

### Problem: Der Load Balancer besitzt die virtuelle IP-Adresse {#the-load-balancer-pitfall-virtual-ip-on-the-frontend-nat-to-the-physical-ip}

Wenn nur ein Load Balancer verwendet wird, verbinden sich Clients mit der virtuellen IP-Adresse. Der Load Balancer übersetzt sie per NAT in die **physische IP-Adresse** des primären Servers. Der Client verwendet die virtuelle IP-Adresse, der Server jedoch seine physische IP-Adresse. Der Server sieht die virtuelle IP-Adresse nicht.

### Die virtuelle IP-Adresse lokal auf dem primären Server konfigurieren {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

Einige Anwendungen verwenden die virtuelle IP-Adresse als Serveradresse. Sie funktionieren nur dann korrekt, wenn diese Adresse auch **lokal auf dem primären Server konfiguriert** ist. Dann gilt:

  * Die Dienste können unter der virtuellen IP-Adresse gestartet werden.
  * Der Server kann seine eigenen Dienste über diese Adresse erreichen.
  * Die Authentifizierung funktioniert mit dieser Adresse.

**Empfehlung:** Verwenden Sie einen Load-Balancer-Modus, bei dem die virtuelle IP-Adresse als Zieladresse erhalten bleibt, zum Beispiel Floating IP oder Direct Server Return. Konfigurieren Sie anschließend die virtuelle IP-Adresse lokal auf dem primären Server. Die Methode hängt davon ab, in welchem Subnetz sich die virtuelle IP-Adresse befindet:

  * **Die virtuelle IP-Adresse befindet sich im selben Subnetz wie die physischen IP-Adressen der Server:** Behalten Sie den Abschnitt `<vip>` im SafeKit-Modul bei. SafeKit konfiguriert die virtuelle IP-Adresse automatisch als Alias auf der Netzwerkkarte der physischen IP-Adresse.
  * **Die virtuelle IP-Adresse befindet sich in einem anderen Subnetz:** Konfigurieren Sie `<vip>` nicht in SafeKit. Verwenden Sie das Skript `start_prim`, um die virtuelle IP-Adresse vor dem Start der Anwendung auf einer dedizierten Schnittstelle, zum Beispiel Loopback, einzurichten. Verwenden Sie `stop_prim`, um sie nach dem Beenden der Anwendung zu entfernen. Der Integrator erstellt diese Befehle; sie sind nicht Bestandteil des SafeKit-Produkts.

## Funktionsweise einer virtuellen IP-Adresse in verschiedenen Subnetzen mit Cloud-Provider-CLIs (Mirror-Cluster) {#virtual-ip-cloud-cli-failover}

### Warum Gratuitous ARP in der Cloud nicht funktioniert {#why-gratuitous-arp-does-not-work-in-public-clouds}

Cloud-Netzwerke (AWS, Azure und Google Cloud) **ignorieren Gratuitous ARP**. Sie leiten Datenverkehr nur an IP-Adressen weiter, die der Cloud-Plattform zugewiesen sind. SafeKit konfiguriert die virtuelle IP-Adresse auf dem primären Server, aber das Cloud-Netzwerk leitet den Datenverkehr für diese Adresse nicht an diesen Server weiter.

### Die virtuelle IP-Adresse mit der Cloud-CLI verschieben {#moving-the-virtual-ip-through-the-cloud-api-in-safekit-failover-scripts}

Ohne Load Balancer kann die CLI des Cloud-Providers in das SafeKit-Skript **`start_prim`** integriert werden. Sie aktualisiert die Cloud-Netzwerkkonfiguration, bevor die Anwendung gestartet wird. Die CLI kann die virtuelle IP-Adresse dem Knoten zuweisen, der primär wird, oder die Cloud-Route so ändern, dass der Datenverkehr für diese Adresse an diesen Knoten geleitet wird.

Die **virtuelle IP-Adresse bleibt lokal** auf dem primären Server. Es gibt **kein NAT**, und die ursprüngliche Client-IP-Adresse bleibt unverändert.

### Verantwortung des Integrators {#integrator-responsibility}

Der **Integrator** muss die Befehle der Cloud-CLI zum Skript `start_prim` hinzufügen. Diese Befehle werden **nicht vom SafeKit-Produkt bereitgestellt**. Sie hängen vom Cloud-Provider, dem Netzwerkdesign und den Sicherheitsregeln des Kunden ab.

### Einschränkungen {#constraints-of-the-cli-approach}

  * Die Cloud-CLI muss auf beiden Knoten installiert sein. Jeder Knoten benötigt eine Cloud-Identität mit den erforderlichen Netzwerkberechtigungen.
  * Das Skript muss Fehler und Wiederholungsversuche behandeln.
  * Das Failover ist wahrscheinlich langsamer als mit einem Load Balancer.

## Funktionsweise einer virtuellen IP-Adresse in verschiedenen Subnetzen mit BGP (Mirror-Cluster) {#virtual-ip-bgp-failover}

### Umleitung der virtuellen IP-Adresse mit BGP {#layer-3-virtual-ip-rerouting-with-bgp-route-advertisement}

Bei **BGP (Border Gateway Protocol)** wird die virtuelle IP-Adresse üblicherweise vor dem Start der Anwendung durch das Skript `start_prim` auf einer Loopback-Schnittstelle des primären Servers konfiguriert. Der primäre Server kündigt die VIP den Routern anschließend als /32-Route an.

Bei einem Failover stoppt das Skript `stop_prim` auf dem bisherigen primären Server die Anwendung, entfernt die VIP von der Loopback-Schnittstelle und zieht die /32-Route bei den Routern zurück. Fällt der bisherige primäre Server aus, wird `stop_prim` nicht ausgeführt. Die Router verlieren jedoch die BGP-Sitzung und entfernen die Route automatisch.

### Vorteile und Voraussetzungen {#benefits-and-prerequisites}

  * **Die virtuelle IP-Adresse bleibt lokal. Es gibt kein NAT, und die Client-IP-Adresse ändert sich nicht.**
  * Die Lösung funktioniert über Subnetze und Standorte hinweg. Ein gestrecktes VLAN ist nicht erforderlich.
  * Sie benötigen BGP-Router und Unterstützung durch Ihr Netzwerkteam. In der Cloud ist ein Route-Server-Dienst des Cloud-Providers erforderlich.

> **⚠️ Hinweis:** Die BGP-Integration verwendet SafeKit-Skripte und Ihre Routing-Infrastruktur. Der **Integrator** muss die Befehle in den Skripten `start_prim` und `stop_prim` erstellen. Diese Skripte werden **nicht vom SafeKit-Produkt bereitgestellt**. Stimmen Sie die Lösung vor der Inbetriebnahme mit Ihrem Netzwerkteam ab.

## Funktionsweise der DNS-Umleitung in verschiedenen Subnetzen (Mirror-Cluster) {#virtual-ip-vs-dns-redirection-failover}

### DNS-Umleitung mit dem Skript `start_prim` {#dns-rerouting-with-the-start-prim-script}

Bei einer DNS-Umleitung gibt es **keine einzelne virtuelle IP-Adresse**. Clients verbinden sich mit einem **virtuellen Namen**, also dem DNS-Namen. Bei einem Failover startet das Skript `start_prim` auf dem neuen primären Server die Anwendung und ändert anschließend den DNS-Eintrag des virtuellen Namens auf die **physische IP-Adresse** des neuen primären Servers.

Das Skript `stop_prim` muss nichts ausführen. Fällt der bisherige primäre Server aus, überschreibt der neue primäre Server den DNS-Eintrag.

### Beispiel: DNS-Auflösung und blockierte Clients {#the-technical-scenario-dns-resolution-and-the-stuck-client}

![Diagramm: Ein DNS-Name wird in einem Hochverfügbarkeitscluster in die physische IP-Adresse 1 aufgelöst](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

DNS-Auflösung: Clients bleiben in einem Hochverfügbarkeitscluster auf der physischen IP-Adresse 1 hängen.

#### Vor dem Failover: Der Name verweist auf die physische IP-Adresse 1 {#current-state-resolution-to-physical-ip-1}

**Client 1** und **Client 2** fragen beim DNS-System die IP-Adresse des virtuellen Namens ab. Das DNS-System gibt **die physische IP-Adresse 1** zurück. Anschließend öffnen die Clients eine Netzwerkverbindung zu dieser Adresse.

#### Nach dem Failover: Der Name verweist auf die physische IP-Adresse 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

Server 1 fällt aus. Das Skript `start_prim` auf Server 2 ändert den DNS-Eintrag auf **die physische IP-Adresse 2**. Die Clients können sich nur dann mit dieser Adresse verbinden, wenn alle folgenden Bedingungen erfüllt sind:

  * Die **TTL (Time to Live)** ist auf allen DNS-Servern zwischen dem Client und dem DNS-Eintrag abgelaufen.
  * Der lokale DNS-Cache von Client 1 und Client 2 ist leer.
  * Die Anwendung beendet ihre Verbindung und führt eine **neue** DNS-Abfrage aus.

Ist auch nur eine Bedingung nicht erfüllt, bleiben **Client 1 und Client 2 auf der physischen IP-Adresse 1 hängen**. Der Dienst ist nicht verfügbar, obwohl der DNS-Eintrag korrekt ist.

### Grenzen und Voraussetzungen {#the-two-black-boxes-of-dns-redirection}

  * **DNS-Cache:** Viele Internetanbieter und Unternehmens-DNS-Server ignorieren kurze TTL-Werte. Sie können die alte physische IP-Adresse 1 minuten- oder stundenlang speichern.
  * **Verhalten der Anwendung:** Viele Anwendungen, zum Beispiel Java-Dienste oder Webbrowser, fragen den DNS-Namen nur einmal beim Start ab. Danach verwenden sie weiterhin die zuerst erhaltene IP-Adresse.
  * **Die IP-Adresse ändert sich bei jedem Failover:** Die Anwendung hat keine lokale, dauerhaft gleichbleibende virtuelle IP-Adresse. Anwendungen, die ihre eigene IP-Adresse registrieren, funktionieren möglicherweise nicht.
  * **Voraussetzungen:** Eine kurze TTL für den DNS-Eintrag, zum Beispiel 30 bis 60 Sekunden, und die Berechtigung, die DNS-Zone von beiden Servern aus zu ändern.

> **⚠️ Hinweis:** Der **Integrator** muss die DNS-Aktualisierungsbefehle in das Skript `start_prim` einfügen. Diese Befehle werden **nicht vom SafeKit-Produkt bereitgestellt** und hängen vom DNS-Server ab (Windows DNS, BIND oder Cloud-DNS).

### Fazit {#conclusion}

DNS-Umleitung ist keine zuverlässige Hochverfügbarkeitslösung. Verwenden Sie sie nur, wenn alle Clients bei einer erneuten Verbindung eine neue DNS-Abfrage ausführen. Für ein sofortiges und transparentes Failover verwenden Sie eine **virtuelle IP-Adresse**: über ein erweitertes LAN, mit einem Load Balancer, mit Cloud-Provider-CLIs oder mit BGP.

## Funktionsweise des Load Balancings einer virtuellen IP-Adresse im selben Subnetz (Farm-Cluster) {#virtual-ip-load-balancing-same-subnet}

- [Load Balancing mit einer virtuellen IP-Adresse in einem SafeKit-Farm-Cluster testen](/de/best-practises/test-load-balancing-vip-farm/)

### Load Balancing im Kernel mit Redundanz {#scalable-performance-kernel-level-load-balancing--redundancy}

Bei hohem Datenverkehr kann SafeKit die Last auf mehrere aktive Server verteilen. Fällt ein Server aus, arbeiten die übrigen Server weiter.

### Farm-Cluster-Architektur: Load Balancing zwischen Windows- oder Linux-Knoten {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}

![Diagramm einer virtuellen IP-Adresse mit Load Balancing im selben Subnetz](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

In einem **Farm-Cluster mit Load Balancing** verbinden sich Clients mit einer virtuellen IP-Adresse. Die Anfragen werden gleichzeitig auf mehrere Server verteilt. Dieses Beispiel zeigt zwei Knoten. Sie können weitere Knoten zum Cluster hinzufügen. Im selben Subnetz wird die virtuelle IP-Adresse durch IP-Aliasing auf der Netzwerkkarte **jedes Servers** im Cluster konfiguriert.

#### Datenverkehrsverteilung: der Kernel-Filter {#traffic-distribution-the-kernel-level-filter}

In einem <span class="notranslate farm-term" translate="no">Farm</span>-Cluster verteilt ein SafeKit-**Kernel-Filter** den Datenverkehr. Der Ablauf:

  * **ARP-Zuordnung:** Im ARP-Cache der Clients ist die virtuelle IP-Adresse einer MAC-Adresse zugeordnet, zum Beispiel `mac1` von Server 1.
  * **Paketprüfung:** Server 1 empfängt die Pakete. Der SafeKit-Kernel-Filter liest die **Client-IP-Adresse** oder den **TCP-Port** jedes Pakets.
  * **Lastverteilung:** Der Filter entscheidet, welche Pakete Server 1 verarbeitet und welche an andere Knoten, zum Beispiel Server 2, weitergeleitet werden. Für die Weiterleitung an einen anderen Knoten ersetzt der Filter die **Ziel-MAC-Adresse** des Pakets durch die MAC-Adresse dieses Knotens. Die Ziel-IP-Adresse bleibt die virtuelle IP-Adresse. So wird die Arbeit auf die Server verteilt.

#### Failover und Umleitung mit Gratuitous ARP {#failover-and-rerouting-with-gratuitous-arp}

Fällt Server 1 aus, sendet SafeKit eine **Gratuitous-ARP-(GARP-)Nachricht**. Die Clients aktualisieren ihren ARP-Cache mit `mac2`, der MAC-Adresse von Server 2. Anschließend wird der Datenverkehr sofort an die übrigen Farm-Knoten geleitet.

#### Einsatz an entfernten Standorten {#deployment-in-remote-sites}

Diese Load-Balancing-Lösung funktioniert auch zwischen **entfernten Rechenzentren**, wenn die Standorte über ein **erweitertes LAN oder VLAN** verbunden sind. Alle Standorte befinden sich dann im selben Subnetz. Dies ist die effizienteste Konfiguration für <span class="notranslate farm-term" translate="no">Farm</span>-Cluster an mehreren Standorten.

{{%  insert-safekit-farm-video-de  %}}

## Load Balancing einer virtuellen IP-Adresse über verschiedene Subnetze (Farm-Cluster) {#virtual-ip-load-balancing-different-subnets}

### Datenverkehr über Cloud-Subnetze {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

Ein <span class="notranslate farm-term" translate="no">Farm</span>-Cluster kann die Anwendungslast auf mehrere Verfügbarkeitszonen und Subnetze verteilen.

### Farm-Cluster über Subnetze hinweg: mehrere Windows- oder Linux-Knoten {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}

![Diagramm eines Farm-Clusters mit Load Balancing über zwei verschiedene Subnetze](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

Befinden sich die <span class="notranslate farm-term" translate="no">Farm</span>-Knoten in **verschiedenen Subnetzen**, zum Beispiel in mehreren Cloud-Verfügbarkeitszonen, liegt die **virtuelle IP-Adresse** auf einem externen **Load Balancer (LB)**. Dieser leitet den Datenverkehr an die physischen IP-Adressen der Server in den jeweiligen Subnetzen weiter.

#### Regeln für Routing und Load Balancing {#intelligent-traffic-routing--load-balancing-rules}

Der Load Balancer verteilt die Client-Anfragen anhand von zwei Kriterien:

  * **Load-Balancing-Regeln:** zum Beispiel die **Client-IP-Adresse** oder der **TCP-Port des Clients**.
  * **Verfügbarkeit der Knoten:** Der Load Balancer sendet den Datenverkehr nur an verfügbare Knoten, die laut SafeKit-Integritätsprüfung fehlerfrei sind.

> **⚠️ Hinweis:** SafeKit stellt die Integritätsprüfung bereit. Der Load Balancer wird von Ihrem Netzwerk oder Cloud-Provider bereitgestellt.

#### SafeKit-Integritätsprüfung {#safekit-health-check-mechanism}

SafeKit stellt auf jedem Server der <span class="notranslate farm-term" translate="no">Farm</span> eine **URL für die Integritätsprüfung** bereit. Der Load Balancer fragt sie ab, um den Status jedes Servers zu ermitteln:

  * **Knoten verfügbar (UP):** Die Integritätsprüfung gibt `HTTP 200 OK` zurück. Der Load Balancer sendet Datenverkehr an diesen Server.
  * **Knoten nicht verfügbar (DOWN):** Fällt ein Server oder eine Anwendung aus, gibt SafeKit `HTTP 404 NOT FOUND` zurück oder der Server antwortet nicht. Der Load Balancer sendet dann sofort keinen Datenverkehr mehr an diesen Knoten.

#### Cloud-Bereitstellung: AWS, Azure und GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Dies ist die Standardarchitektur für **<span class="notranslate farm-term" translate="no">Farm</span>-Cluster in der Cloud**. Wird ein Subnetz oder eine Zone nicht verfügbar, verarbeiten die übrigen Knoten den Datenverkehr weiter. Die Lösung wird von [**Amazon AWS**](</de/solutions/aws-load-balancing-cluster-failover/>) (AWS Network Load Balancer), [**Microsoft Azure**](</de/solutions/azure-load-balancing-cluster-failover/>) (Azure Load Balancer) und [**Google Cloud (GCP)**](</de/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing) unterstützt.

## Vergleich: Implementierung der virtuellen IP-Adresse, Latenz und Anwendungstransparenz {#virtual-ip-methods-comparison}

**Vergleich der Umleitungsmethoden für virtuelle IP-Adressen und DNS bei Hochverfügbarkeit und Notfallwiederherstellung.**

Umgebung und Anwendungsfall | Hochverfügbarkeitstyp | Umleitungsmethode | Implementiert durch | Netzwerklatenz | Anwendungstransparenz und lokale IP-Adresse  
---|---|---|---|---|---  
Primär/sekundär (Hochverfügbarkeit) | Mirror-Cluster | Gratuitous ARP / Übernahme der MAC-Adresse | ✅ SafeKit-Produkt | Sehr niedrig: Zeit für die Fehlererkennung und das Senden des GARP | Vollständige Transparenz: Die virtuelle IP-Adresse ist lokal auf dem aktiven Knoten. Die Client-IP-Adresse ändert sich nicht.  
Load Balancing (aktiv/aktiv) | <span class="notranslate farm-term" translate="no">Farm</span>-Cluster | Kernel-Netzwerkfilter / GARP | ✅ SafeKit-Produkt | Sehr niedrig: Zeit für die Fehlererkennung und die Änderung der Netzwerkfilter | Vollständige Transparenz: Die virtuelle IP-Adresse ist auf allen Knoten lokal. Die Client-IP-Adresse ändert sich nicht.  
Dasselbe Subnetz / erweitertes LAN (gestrecktes VLAN) | Notfallwiederherstellung (entfernte Rechenzentren) | IP-Aliasing / GARP | ✅ SafeKit-Produkt (das gestreckte VLAN wird vom Netzwerkteam bereitgestellt) | Niedrig: abhängig von der Round-Trip-Zeit (RTT) des gestreckten VLANs | Vollständige Transparenz: Die virtuelle IP-Adresse ist lokal auf den Knoten. Die Client-IP-Adresse ändert sich nicht.  
Verschiedene Subnetze: nur Load Balancer | Notfallwiederherstellung (entfernte Rechenzentren / Cloud) | Externer Load Balancer | 🛠️ Integrator: Konfiguration des Load Balancers (SafeKit stellt die Integritätsprüfung bereit) | Mittel: abhängig vom Intervall der Integritätsprüfung des Load Balancers | ⚠️ Teilweise Transparenz, wenn SNAT/DNAT verwendet wird. Die virtuelle IP-Adresse ist **NICHT** lokal auf den Knoten. Die Client-IP-Adresse bleibt möglicherweise **NICHT** erhalten. Die Anwendung muss dies unterstützen.  
Verschiedene Subnetze: Load Balancer + lokale SafeKit-VIP | Notfallwiederherstellung (entfernte Rechenzentren / Cloud) | Externer Load Balancer mit Floating IP / Direct Server Return | 🛠️ Integrator: Konfiguration des Load Balancers (SafeKit stellt die Integritätsprüfung bereit) | Mittel: abhängig vom Intervall der Integritätsprüfung des Load Balancers | Gute Transparenz: Die virtuelle IP-Adresse ist lokal auf dem primären Knoten und dient als Zieladresse.  
Verschiedene Subnetze: Cloud-CLI | Notfallwiederherstellung (Cloud) | Cloud-API: Die private IP-Adresse oder eine Cloud-Route wird auf den neuen primären Server verschoben | 🛠️ Integrator: Cloud-CLI-Befehle im Skript `start_prim` | Mittel bis hoch: abhängig von der Antwortzeit der Cloud-API | Vollständige Transparenz: Die virtuelle IP-Adresse ist lokal auf dem primären Knoten. Die Client-IP-Adresse ändert sich nicht.  
Verschiedene Subnetze: BGP | Notfallwiederherstellung (entfernte Rechenzentren / Cloud) | Mit BGP angekündigte /32-Route | 🛠️ Integrator: BGP-Befehle in den Skripten `start_prim` und `stop_prim` | Niedrig bis mittel: abhängig von der BGP-Konvergenzzeit | Vollständige Transparenz: Die virtuelle IP-Adresse ist lokal auf dem primären Knoten. Die Client-IP-Adresse ändert sich nicht. BGP-Router erforderlich.  
DNS-Umleitung: keine virtuelle IP-Adresse | Notfallwiederherstellung (entfernte Rechenzentren) | Änderung des DNS-Eintrags (Name / physische IP-Adresse) | 🛠️ Integrator: DNS-Aktualisierungsbefehle im Skript `start_prim` | Hoch und nicht vorhersehbar: abhängig von DNS-TTL (Time to Live) und DNS-Cache der Clients | ⚠️ Unzuverlässig: Der Client muss eine neue DNS-Abfrage ausführen. Häufig verwenden Clients weiterhin die beim Start erhaltene alte IP-Adresse und werden nach dem Failover nicht umgeleitet.  

## Häufig gestellte Fragen zur virtuellen IP-Adresse {#virtual-ip-faq}

### Virtuelle IP-Adresse und Netzwerk {#virtual-ip--networking}

Was ist eine virtuelle IP-Adresse, und worin unterscheidet sie sich von einer physischen IP-Adresse?

Eine **physische IP-Adresse** ist einer Netzwerkkarte zugeordnet. Eine **virtuelle IP-Adresse** ist nicht an Hardware gebunden. In einem SafeKit-Cluster verwenden Clients immer die virtuelle IP-Adresse. Fällt der primäre Server aus, wird sie automatisch auf einen verfügbaren Knoten verschoben. Die Client-Konfiguration muss nicht geändert werden.

Benötige ich einen Hardware-Load-Balancer, um eine virtuelle IP-Adresse zu verwenden?

Nein. **SafeKit** verwaltet die virtuelle IP-Adresse per Software. Im selben Subnetz verwendet es **IP-Aliasing** und **Gratuitous ARP (GARP)**, um den Datenverkehr umzuleiten. Ein externer Load Balancer oder Proxyserver ist nicht erforderlich.

Was ist Gratuitous ARP (GARP), und warum wird es verwendet?

**Gratuitous ARP (GARP)** ist eine Netzwerknachricht, die an alle Geräte gesendet wird. Sie aktualisiert die ARP-Tabellen von Switches und Routern. Bei einem Failover sendet der neue primäre Server eine GARP-Nachricht. Sie teilt mit, dass die **virtuelle IP-Adresse** jetzt der MAC-Adresse des neuen primären Servers zugeordnet ist. Der Datenverkehr wird dann sofort umgeleitet.

Kann ich einer virtuellen IP-Adresse einen DNS-Namen zuordnen?

**Ja.** Erstellen Sie einen regulären A-Eintrag für die virtuelle IP-Adresse. Die Umleitung erfolgt auf der **Ebene der virtuellen IP-Adresse** (mit ARP oder Netzwerkumleitung), **nicht auf DNS-Ebene**. DNS-Verzögerungen oder TTL-Probleme treten nicht auf, und das Failover bleibt für die Anwendung **transparent**.

### Cloud und fortgeschrittene Architekturen {#cloud--advanced-architectures}

Wie funktioniert eine virtuelle IP-Adresse in der Cloud (AWS, Azure, GCP)?

In der Cloud können Layer-2-GARP-Nachrichten nicht zum Umleiten einer virtuellen IP-Adresse verwendet werden. SafeKit funktioniert mit **Cloud-Load-Balancern** (AWS ELB, Azure LB oder Google GCLB). SafeKit stellt eine **URL für die Integritätsprüfung** bereit. Der Load Balancer fragt sie ab und sendet den Datenverkehr an den aktiven Knoten.

Ist ein erweitertes LAN für die Notfallwiederherstellung besser als ein Load Balancer?

**Ja.** Zwischen entfernten Rechenzentren ist ein **erweitertes LAN (gestrecktes VLAN)** oft besser, weil das Failover für die Anwendung **transparent** bleibt. Die **virtuelle IP-Adresse ändert sich nicht**. Anwendung und Clients verwenden nach einem Failover zwischen den Rechenzentren weiterhin dieselbe Adresse.

Welche Grenzen hat die DNS-Umleitung im Vergleich zu einer virtuellen IP-Adresse?

Die **DNS-Umleitung** hängt von der **TTL (Time to Live)** und vom DNS-Cache der Clients ab. Die Wiederherstellung kann Stunden dauern. Außerdem bleiben **Clients, die keine neue DNS-Abfrage ausführen, auf dem ausgefallenen Server hängen**. Eine **virtuelle IP-Adresse** wird auf Layer 2 sofort mithilfe von GARP-Nachrichten umgeleitet. Der DNS-Cache der Clients hat keinen Einfluss.

### Transparenz und Sicherheit {#transparency--security}

Warum ist eine lokale virtuelle IP-Adresse wichtig für die Anwendungstransparenz?

Mit einer lokalen **virtuellen IP-Adresse** verwendet die Anwendung eine gleichbleibende Adresse. SafeKit führt die Umleitung im **Kernel** aus. Die Anwendung bemerkt das Failover nicht. Bei DNAT ändert sich die von der Anwendung verwendete Adresse.

Bleibt die ursprüngliche IP-Adresse des Clients bei einer virtuellen IP-Adresse erhalten?

Ja. SafeKit verwendet kein Source NAT (SNAT). Da die virtuelle IP-Adresse lokal auf dem aktiven Server eingerichtet ist, empfängt die Anwendung die **ursprüngliche Client-IP-Adresse**. Das ist wichtig für Sicherheitsprüfungen, Sitzungspersistenz und gesetzlich vorgeschriebene Protokolle.

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}
