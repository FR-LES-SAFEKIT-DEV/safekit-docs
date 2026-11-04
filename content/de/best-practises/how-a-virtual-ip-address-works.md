---
title: "Wie funktioniert eine virtuelle IP-Adresse in einem Hochverfügbarkeitscluster?"
canonical: "https://safekit.eviden.com/de/best-practises/how-a-virtual-ip-address-works/"
description: "Wie SafeKit eine virtuelle IP-Adresse im Failover verschiebt: Gratuitous ARP im selben Subnetz, Load Balancer, Cloud-CLI oder BGP über Subnetze hinweg. Warum eine lokale virtuelle IP-Adresse wichtig ist."
category: "best-practises"
lang: "de"
topics: "Was ist eine virtuelle IP-Adresse in einem Hochverfügbarkeitscluster?, Implementierung virtueller IPs in SafeKit, Funktionsweise einer virtuellen IP-Adresse im selben Subnetz (mirror Cluster), Funktionsweise einer virtuellen IP-Adresse über verschiedene Subnetze mit einem Load Balancer (mirror Cluster), Funktionsweise einer virtuellen IP-Adresse über verschiedene Subnetze mit Cloud-Provider-CLIs (mirror Cluster), Funktionsweise einer virtuellen IP-Adresse über verschiedene Subnetze mit BGP (mirror Cluster), Funktionsweise der DNS-Umleitung über verschiedene Subnetze (mirror -Cluster), Funktionsweise des virtuellen IP-Load-Balancing in einem farm Cluster im selben Subnetz, Funktionsweise einer lastverteilten virtuellen IP-Adresse über verschiedene Subnetze (farm Cluster), Vergleich: Implementierung virtueller IPs, Latenz und Anwendungstransparenz, Häufig gestellte Fragen zu virtuellen IPs, 🔍 SafeKit entdecken"
---

# Wie funktioniert eine virtuelle IP-Adresse in einem Hochverfügbarkeitscluster? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## Was ist eine virtuelle IP-Adresse in einem Hochverfügbarkeitscluster? {#virtual-ip-definition}

Eine **virtuelle IP-Adresse** ist die einzige Adresse, die Clients verwenden, um sich in einem [Hochverfügbarkeitscluster](</de/>) mit einer Anwendung zu verbinden. Die virtuelle IP-Adresse ist nicht an einen bestimmten Server gebunden. Im Falle eines Failovers wird sie an den Server übertragen, auf dem die Anwendung ausgeführt wird. Clients müssen ihre Konfiguration nicht ändern.

**Das Grundprinzip von SafeKit:** Die virtuelle IP-Adresse wird **lokal auf dem Server konfiguriert,** auf dem die Anwendung ausgeführt wird. Die Anwendung startet mit der virtuellen IP-Adresse und empfängt die ursprüngliche Client-IP-Adresse. Daher funktionieren viele Anwendungen mit SafeKit ohne jegliche Änderungen einwandfrei. SafeKit bietet zwei Arten von virtuellen IP-Adressen:

  * **Primäre/Backup-virtuelle IP-Adresse mit mirror :** Die virtuelle IP-Adresse ist nur auf dem primären Server aktiv. Im Failover-Fall wird sie auf den Backup-Server verschoben.
  * **Netzwerklastausgleich mit virtueller IP-Adresse in einem <span class="notranslate farm-term" translate="no">farm</span> :** Die virtuelle IP-Adresse ist gleichzeitig auf allen Servern aktiv. Der Datenverkehr wird zwischen ihnen aufgeteilt.

## Virtuelle IP-Implementierung in SafeKit {#safekit-virtual-ip-implementation}

Dieser Artikel erklärt, wie SafeKit die virtuelle IP-Adresse in den verschiedenen Netzwerkarchitekturen verschiebt:

  * **Im selben Subnetz oder erweiterten LAN ([mirror](#virtual-ip-same-subnet-failover) und [<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-same-subnet) Cluster):** SafeKit konfiguriert die virtuelle IP-Adresse auf dem Server und sendet eine **Gratuitous-ARP-Anfrage (GARP)**. Es ist keine externe Hardware erforderlich. Dies ist die transparenteste Lösung (alles wird vom SafeKit-Produkt implementiert).
  * **Verschiedene Subnetze mit einem Load Balancer ([mirror](#virtual-ip-different-subnets-failover) und [<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-different-subnets) Cluster):** Der Load Balancer verwendet den SafeKit **-Health-Check**, um den Datenverkehr an den richtigen Server zu senden (der Load Balancer wird vom Integrator konfiguriert).
  * **[Unterschiedliche Subnetze mit Cloud-Provider-CLIs](#virtual-ip-cloud-cli-failover) (mirror Cluster):** Das SafeKit-Skript `start_prim` ruft die Cloud-CLI auf, um die virtuelle IP zu verschieben (Skript vom Integrator geschrieben).
  * **[Unterschiedliche Subnetze mit BGP](#virtual-ip-bgp-failover) (mirror Cluster):** Der primäre Server kündigt die virtuelle IP-Adresse an die Router an (Skript vom Integrator geschrieben).
  * **[Unterschiedliche Subnetze mit DNS-Umleitung](#virtual-ip-vs-dns-redirection-failover) (mirror):** Das SafeKit-Skript `start_prim` ändert den DNS-Eintrag des virtuellen Namens in die physische IP-Adresse des neuen primären Servers (Skript vom Integrator). Es gibt keine einheitliche virtuelle IP-Adresse, und diese Methode ist nicht für alle Clients zuverlässig.

Ebenfalls in diesem Artikel:

  * [Vergleich: Implementierung virtueller IP, Latenz und Anwendungstransparenz](#virtual-ip-methods-comparison)
  * [Häufig gestellte Fragen zu virtuellen IPs](#virtual-ip-faq)
  * [🔍 SafeKit entdecken](#hub)

![Vergleichsdiagramm des Verhaltens virtueller IP-Adressen in Eviden SafeKit: Mirror mit einer floating IP auf dem aktiven Knoten im Vergleich zu farm mit Netzwerklastausgleich über alle Knoten.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Virtuelle IP-Implementierung für mirror und <span class="notranslate farm-term" translate="no">farm</span> in SafeKit.**

## Wie eine virtuelle IP-Adresse im selben Subnetz (mirror Cluster) funktioniert {#virtual-ip-same-subnet-failover}

- [Testen der primären/Backup-virtuellen IP-Adresse in einem SafeKit mirror -Cluster](/de/best-practises/test-primary-backup-vip-mirror/)

### Automatisches Failover und Netzwerk-Rerouting in einem lokalen Subnetz {#automated-failover--network-rerouting-in-a-local-subnet}

In einem lokalen Netzwerk verwaltet **SafeKit** die virtuelle IP-Adresse und das Anwendungs-Failover automatisch.

### Lokaler mirror : 2-Knoten-Failover unter Windows oder Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![SafeKit-Failovermechanismus für virtuelle IPs zwischen zwei Servern im selben Subnetz](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

In einem **SafeKit mirror -Cluster** befinden sich die beiden Knoten im selben Subnetz. Hochverfügbarkeit wird durch eine **virtuelle IP-Adresse** gewährleistet. SafeKit verwaltet die virtuelle IP-Adresse im Netzwerk-Stack des Betriebssystems. Es ist keine spezielle Hardware erforderlich. Die virtuelle IP-Adresse wird den physischen IP-Adressen von Server 1 und Server 2 per **IP-Aliasing** hinzugefügt. Clients verbinden sich immer mit der virtuellen IP-Adresse.

#### IP-Aliasing und mehrere virtuelle IPs (VIPs) in SafeKit {#safekits-advanced-ip-aliasing--multiple-virtual-ip-support}

Die virtuelle IP-Adresse ist eine dritte IP-Adresse, die zwischen den Knoten wechselt. SafeKit kann **mehrere virtuelle IP-Adressen** in einem Cluster verwalten. Diese können auf derselben oder auf verschiedenen Netzwerkkarten platziert werden. Dadurch kann jeder Dienst seine eigene virtuelle IP-Adresse verwenden.

#### Der Ausfallmechanismus: Gratuitous ARP (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

Für das Failover ist kein manuelles Eingreifen erforderlich. Im Normalbetrieb ist die virtuelle IP-Adresse mit der **MAC-Adresse von Server 1 (mac1)** verknüpft. Fällt Server 1 aus, führt SafeKit drei Aktionen aus:

  * **Virtuelle IP-Aliasierung:** SafeKit konfiguriert die virtuelle IP-Adresse als Alias auf der Netzwerkkarte von Server 2, dem neuen primären Server. Anschließend sendet das Betriebssystem Nachrichten im Netzwerk, um die virtuelle IP-Adresse bekannt zu geben.
  * **GARP:** SafeKit sendet außerdem **Gratuitous-ARP-Nachrichten (GARP)**. Netzwerk-Switches und Clients aktualisieren ihren ARP-Cache. Die virtuelle IP-Adresse ist nun mit der **MAC-Adresse von Server 2 (mac2)** verknüpft.
  * **Anwendungswiederherstellung:** SafeKit startet die Anwendungsdienste auf Server 2 neu.


#### Remote Rechenzentren und erweiterte VLANs {#remote-data-centers--extended-vlans}

Die **oben beschriebene Lösung mit demselben Subnetz** eignet sich auch für **die Notfallwiederherstellung (Disaster Recovery, DR)** zwischen entfernten Standorten und ist oft die beste Wahl, wenn die Standorte über ein **erweitertes LAN oder ein gestrecktes VLAN** verbunden sind. Beide Standorte befinden sich im selben Subnetz. Das Netzwerk ist einfacher, und komplexe Routing-Protokolle sind nicht erforderlich.

> **⚠️ Hinweis:** Layer-2-Routing mit Gratuitous ARP ist die **transparenteste Lösung** für Anwendungen. Die Anwendung erhält die ursprüngliche Client-IP-Adresse, und die virtuelle IP-Adresse wird lokal konfiguriert. **Viele Anwendungen benötigen** eine lokale virtuelle IP-Adresse. Ohne diese **funktionieren sie möglicherweise nicht korrekt**. In dieser Konfiguration im selben Subnetz implementiert SafeKit den gesamten Mechanismus, sodass keine spezielle Integration erforderlich ist.

## Wie eine virtuelle IP-Adresse über verschiedene Subnetze hinweg mit einem Load Balancer (mirror Cluster) funktioniert {#virtual-ip-different-subnets-failover}

### Load Balancer mit SafeKit-Integritätsprüfungen {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![Diagramm eines virtuellen IP-Failovers mittels Load Balancer über zwei verschiedene Subnetze](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

Befinden sich die Knoten in **unterschiedlichen Subnetzen**, kann Gratuitous ARP die virtuelle IP-Adresse nicht verschieben. In diesem Fall befindet sich die virtuelle IP-Adresse auf einem **Load Balancer**. Der Load Balancer leitet den Datenverkehr an den primären Server weiter.

SafeKit stellt auf jedem Knoten eine **URL zur Zustandsprüfung** bereit:

  * **Primär (PRIM):** Gibt `HTTP 200 OK`. zurück. Der Load Balancer leitet den Datenverkehr an diesen Knoten weiter.
  * **Sekundär (SECOND):** Gibt `HTTP 404 NOT FOUND`. zurück. Der Load Balancer sendet keinen Datenverkehr an diesen Knoten.

Im Failover-Fall ändert SafeKit die Antworten, und der Load Balancer leitet den Datenverkehr an den neuen primären Server weiter. Dies ist die Standardlösung zwischen **Verfügbarkeitszonen** in [**AWS**](</de/solutions/aws-high-availability-cluster-synchronous-replication-failover/>), [**Azure**](</de/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) und [**Google Cloud**](</de/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>).

> **⚠️ Hinweis:** SafeKit führt die Systemprüfung durch. Der Load Balancer wird von Ihrem Netzwerk oder Ihrem Cloud-Anbieter bereitgestellt.

### Das Problem: Der Load Balancer besitzt die virtuelle IP-Adresse. {#the-load-balancer-pitfall-virtual-ip-on-the-frontend-nat-to-the-physical-ip}

Bei Verwendung eines Load Balancers verbinden sich Clients mit der virtuellen IP-Adresse. Der Load Balancer übersetzt die virtuelle IP-Adresse (NAT) in die **physische IP-Adresse** des primären Servers. Der Client nutzt die virtuelle IP-Adresse, der Server jedoch seine physische. Der Server sieht die virtuelle IP-Adresse nicht.

### Die virtuelle IP-Adresse sollte lokal auf dem primären Server konfiguriert bleiben. {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

Manche Anwendungen nutzen die virtuelle IP-Adresse als Serveradresse. Sie funktionieren nur dann korrekt, wenn die virtuelle IP-Adresse auch **lokal auf dem primären Server konfiguriert** ist. Dann gilt:

  * Die Dienste können über die virtuelle IP-Adresse gestartet werden;
  * Der Server kann seine eigenen Dienste über die virtuelle IP-Adresse erreichen;
  * Die Authentifizierung funktioniert mit der virtuellen IP-Adresse.

**Bewährte Vorgehensweise:** Verwenden Sie einen Load-Balancer-Modus, der die virtuelle IP-Adresse als Zieladresse beibehält (z. B. Floating IP oder Direct Server Return). Konfigurieren Sie anschließend die virtuelle IP-Adresse lokal auf dem primären Server. Die Methode hängt vom Subnetz der virtuellen IP-Adresse ab.

  * **Die virtuelle IP-Adresse befindet sich im selben Subnetz wie die physischen IP-Adressen der Server:** Behalten Sie den Abschnitt `<vip>` im SafeKit-Modul bei. SafeKit konfiguriert die virtuelle IP-Adresse automatisch als Alias der physischen IP-Adresse auf der Netzwerkkarte.
  * **Die virtuelle IP-Adresse befindet sich in einem anderen Subnetz:** Konfigurieren Sie `<vip>` nicht in SafeKit. Verwenden Sie das Skript `start_prim`, um die virtuelle IP-Adresse vor dem Anwendungsstart auf einer dedizierten Schnittstelle, z. B. Loopback, zu konfigurieren. Verwenden Sie das Skript `stop_prim`, um die virtuelle IP-Adresse nach dem Beenden der Anwendung zu entfernen. Diese Befehle werden vom Integrator erstellt und sind nicht Bestandteil von SafeKit.


## Wie eine virtuelle IP-Adresse über verschiedene Subnetze hinweg mit Cloud-Anbieter-CLIs funktioniert (mirror Cluster). {#virtual-ip-cloud-cli-failover}

### Warum Gratuitous ARP in der Cloud nicht funktioniert {#why-gratuitous-arp-does-not-work-in-public-clouds}

Cloud-Netzwerke (AWS, Azure, Google Cloud) **ignorieren Gratuitous ARP**. Sie leiten Datenverkehr ausschließlich an IP-Adressen weiter, die in der Cloud-Plattform zugewiesen sind. SafeKit konfiguriert die virtuelle IP-Adresse auf dem primären Server, das Cloud-Netzwerk leitet den Datenverkehr der virtuellen IP-Adresse jedoch nicht an diesen Server weiter.

### Verschieben der virtuellen IP-Adresse mit der Cloud-CLI {#moving-the-virtual-ip-through-the-cloud-api-in-safekit-failover-scripts}

Ohne Load Balancer kann die CLI des Cloud-Anbieters in das SafeKit **-Skript `start_prim`** integriert werden, um die Cloud-Netzwerkkonfiguration vor dem Anwendungsstart zu aktualisieren. Die CLI kann dem primären Knoten eine virtuelle IP-Adresse zuweisen oder die Cloud-Route so anpassen, dass der virtuelle IP-Datenverkehr an diesen Knoten geleitet wird.

Die **virtuelle IP-Adresse bleibt lokal** auf dem primären Server. Es findet **kein NAT** statt, und die ursprüngliche Client-IP-Adresse ändert sich nicht.

### Integratorverantwortung {#integrator-responsibility}

Der **Integrator** muss die Cloud-CLI-Befehle zum Skript `start_prim` hinzufügen. Diese Befehle werden **nicht vom SafeKit-Produkt bereitgestellt**. Sie hängen vom Cloud-Anbieter, dem Netzwerkdesign und den Sicherheitsrichtlinien des Kunden ab.

### Einschränkungen {#constraints-of-the-cli-approach}

  * Die Cloud-CLI muss auf beiden Knoten installiert sein. Jeder Knoten benötigt eine Cloud-Identität mit Netzwerkrechten.
  * Das Skript muss Fehler und Wiederholungsversuche behandeln.
  * Ein Failover ist wahrscheinlich langsamer als mit einem Load Balancer.

## Wie eine virtuelle IP-Adresse über verschiedene Subnetze hinweg mit BGP funktioniert (mirror -Cluster). {#virtual-ip-bgp-failover}

### Virtuelles IP-Rerouting mit BGP {#layer-3-virtual-ip-rerouting-with-bgp-route-advertisement}

Bei BGP (Border Gateway Protocol) wird die virtuelle IP-Adresse (VIP) typischerweise vor dem Start der Anwendung über das Skript `start_prim` auf einer Loopback-Schnittstelle des primären Servers konfiguriert. Der primäre Server kündigt die VIP den Routern als /32-Route an.

Im Fehlerfall stoppt das Skript `stop_prim` auf dem alten primären Server die Anwendung, entfernt die VIP von der Loopback-Schnittstelle und entzieht den Routern die /32-Route. Stürzt der alte primäre Server ab, wird `stop_prim` nicht ausgeführt, die Router verlieren jedoch die BGP-Sitzung und entfernen die Route automatisch.

### Vorteile und Voraussetzungen {#benefits-and-prerequisites}

  * **Die virtuelle IP-Adresse bleibt lokal, es findet kein NAT statt und die Client-IP-Adresse ändert sich nicht.**
  * Es funktioniert über Subnetze und Standorte hinweg. Sie benötigen kein erweitertes VLAN.
  * Sie benötigen BGP-Router und Unterstützung von Ihrem Netzwerkteam. In der Cloud benötigen Sie einen Route-Server-Dienst Ihres Cloud-Anbieters.

> **⚠️ Hinweis:** Die BGP-Integration verwendet SafeKit-Skripte und Ihre Routing-Infrastruktur. Der **Integrator** muss die Befehle in den Skripten `start_prim` und `stop_prim` schreiben. Diese Skripte sind **nicht im SafeKit-Produkt enthalten**. Validieren Sie die Lösung vor der Produktivsetzung mit Ihrem Netzwerkteam.

## Wie die DNS-Umleitung über verschiedene Subnetze hinweg funktioniert (mirror Cluster) {#virtual-ip-vs-dns-redirection-failover}

### DNS-Umleitung mit dem `start_prim`. Skript {#dns-rerouting-with-the-start-prim-script}

Bei DNS-Umleitung gibt es **keine einzelne virtuelle IP-Adresse**. Clients verbinden sich mit einem **virtuellen Namen** (dem DNS-Namen). Im Fehlerfall startet das Skript `start_prim` auf dem neuen primären Server die Anwendung und ändert anschließend den DNS-Eintrag des virtuellen Namens in die **physische IP-Adresse** des neuen primären Servers.

Das Skript `stop_prim` hat keine Funktion. Wenn der alte primäre Server ausfällt, überschreibt der neue primäre Server den DNS-Eintrag.

### Beispiel: DNS-Auflösung und blockierte Clients {#the-technical-scenario-dns-resolution-and-the-stuck-client}

![Diagramm zur Darstellung der DNS-Namensauflösung zur physischen IP-Adresse 1 in einem Hochverfügbarkeitscluster](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 DNS-Auflösung und Clients, die auf der physischen IP-Adresse 1 in einem Hochverfügbarkeitscluster blockiert sind

#### Vor dem Failover: Der Name verweist auf die physische IP-Adresse 1. {#current-state-resolution-to-physical-ip-1}

**Client 1** und **Client 2** fragen das DNS-System nach der IP-Adresse des virtuellen Namens. Das DNS-System gibt die **physische IP-Adresse 1** zurück. Die Clients stellen daraufhin eine Netzwerkverbindung zu dieser Adresse her.

#### Nach dem Failover: Der Name verweist auf die physische IP-Adresse 2. {#the-failover-challenge-rerouting-to-physical-ip-2}

Server 1 fällt aus. Das Skript `start_prim` auf Server 2 ändert den DNS-Eintrag auf die **physische IP-Adresse 2.** Die Clients verbinden sich nur dann mit der physischen IP-Adresse 2, wenn alle folgenden Bedingungen erfüllt sind:

  * Die **Gültigkeitsdauer (TTL – Time to Live)** ist auf allen DNS-Servern zwischen dem Client und dem DNS-Eintrag abgelaufen.
  * Der lokale DNS-Cache von Client 1 und Client 2 ist leer.
  * Die Anwendung schließt die Verbindung und führt eine *neue* DNS-Abfrage durch.

Wenn eine der Bedingungen nicht erfüllt ist, **bleiben Client 1 und Client 2 auf der physischen IP-Adresse 1 blockiert**. Der Dienst ist ausgefallen, selbst wenn der DNS-Eintrag korrekt ist.

### Grenzen und Voraussetzungen {#the-two-black-boxes-of-dns-redirection}

  * **DNS-Cache:** Viele Internetdienstanbieter und Firmen-DNS-Server ignorieren kurze TTL-Werte. Sie behalten die alte physische IP-Adresse 1 für Minuten oder Stunden bei.
  * **Anwendungsverhalten:** Viele Anwendungen (z. B. Java-Dienste oder Webbrowser) führen nur einmal beim Start eine DNS-Abfrage durch. Sie verwenden anschließend die erste IP-Adresse.
  * **Die IP-Adresse ändert sich bei jedem Failover:** Die Anwendung verfügt nicht über eine lokale virtuelle IP-Adresse, die konstant bleibt. Anwendungen, die ihre eigene IP-Adresse registrieren, funktionieren möglicherweise nicht.
  * **Voraussetzungen:** eine kurze TTL des DNS-Eintrags (z. B. 30 bis 60 Sekunden) und die Berechtigung, die DNS-Zone von beiden Servern aus zu aktualisieren.

> **⚠️ Hinweis:** Der **Integrator** muss die DNS-Aktualisierungsbefehle im Skript `start_prim` schreiben. Diese Befehle werden **vom SafeKit-Produkt nicht bereitgestellt**. Sie hängen vom verwendeten DNS-Server ab (Windows DNS, BIND oder Cloud-DNS).

### Abschluss {#conclusion}

DNS-Umleitung ist keine zuverlässige Hochverfügbarkeitslösung. Verwenden Sie sie nur, wenn alle Clients nach der Wiederverbindung eine neue DNS-Abfrage durchführen. Für ein sofortiges und transparentes Failover nutzen Sie eine **virtuelle IP-Adresse** : in einem erweiterten LAN, mit einem Load Balancer, über die CLI Ihres Cloud-Anbieters oder mit BGP.

## Wie der virtuelle IP-Lastausgleich in einem <span class="notranslate farm-term" translate="no">farm</span> im selben Subnetz funktioniert {#virtual-ip-load-balancing-same-subnet}

- [Testen der Lastverteilungs-IP-Adresse in einem SafeKit- farm](/de/best-practises/test-load-balancing-vip-farm/)

### Lastverteilung im Kernel mit Redundanz {#scalable-performance-kernel-level-load-balancing--redundancy}

Bei hohem Datenverkehr kann SafeKit die Last auf mehrere aktive Server verteilen. Fällt ein Server aus, arbeiten die anderen Server weiter.

### <span class="notranslate farm-term" translate="no">Farm</span> Cluster-Architektur: Lastverteilung zwischen Windows- oder Linux-Knoten {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


![Diagramm einer lastverteilten virtuellen IP-Adresse innerhalb desselben Subnetzes](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

In einem **Load-Balancing <span class="notranslate farm-term" translate="no">farm</span> Cluster** verbinden sich Clients mit einer virtuellen IP-Adresse, und die Anfragen werden gleichzeitig auf mehrere Server verteilt. Dieses Beispiel zeigt zwei Knoten. Sie können dem Cluster weitere Knoten hinzufügen. Im selben Subnetz ist die virtuelle IP-Adresse mit IP-Aliasing auf der Netzwerkkarte **jedes Servers** im Cluster konfiguriert.

#### Verkehrsverteilung: der Kernelfilter {#traffic-distribution-the-kernel-level-filter}

In einem <span class="notranslate farm-term" translate="no">farm</span> Cluster verteilt ein SafeKit- **Filter im Kernel** den Datenverkehr. Das funktioniert folgendermaßen:

  * **ARP-Mapping:** Im ARP-Cache der Clients ist die virtuelle IP-Adresse mit einer MAC-Adresse verknüpft (z. B. `mac1` von Server 1).
  * **Paketanalyse:** Server 1 empfängt die Pakete. Der SafeKit-Kernelfilter liest die **Client-IP-Adresse** oder den **TCP-Port** jedes Pakets aus.
  * **Lastverteilung:** Der Filter entscheidet, welche Pakete von Server 1 verarbeitet und welche an die anderen Knoten (z. B. Server 2) weitergeleitet werden. Um ein Paket an einen anderen Knoten zu senden, überschreibt der Filter die **Ziel-MAC-Adresse** des Pakets mit der MAC-Adresse dieses Knotens. Die Ziel-IP-Adresse bleibt die virtuelle IP-Adresse. Die Arbeit wird zwischen den Servern aufgeteilt.


#### Failover und Umleitung mit Gratuitous ARP {#failover-and-rerouting-with-gratuitous-arp}

Fällt Server 1 aus, sendet SafeKit eine **Gratuitous-ARP-Anfrage (GARP)**. Die Clients aktualisieren ihren ARP-Cache mit `mac2` von Server 2. Anschließend werden die Clients umgehend an die anderen Knoten des farm weitergeleitet.

#### Einsatz an entfernten Standorten {#deployment-in-remote-sites}

Diese Load-Balancing-Lösung funktioniert auch zwischen **entfernten Rechenzentren**, sofern die Standorte über ein **erweitertes LAN oder VLAN** verbunden sind. Alle Standorte befinden sich dann im selben Subnetz. Dies ist die effizienteste Konfiguration für <span class="notranslate farm-term" translate="no">farm</span> Cluster an mehreren Standorten.

{{%  insert-safekit-farm-video-de  %}}

## Wie eine lastverteilte virtuelle IP-Adresse über verschiedene Subnetze (<span class="notranslate farm-term" translate="no">farm</span>) hinweg funktioniert {#virtual-ip-load-balancing-different-subnets}

### Datenverkehr zwischen Cloud-Subnetzen {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

Ein <span class="notranslate farm-term" translate="no">farm</span> kann die Anwendungsarbeit auf mehrere Verfügbarkeitszonen und Subnetze verteilen.

### Subnetzübergreifende <span class="notranslate farm-term" translate="no">farm</span> : mehrere Windows- oder Linux-Knoten {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


![Diagramm eines lastverteilten farm, der über zwei verschiedene Subnetze betrieben wird](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

Befinden sich die <span class="notranslate farm-term" translate="no">farm</span> in **unterschiedlichen Subnetzen** (z. B. in verschiedenen Cloud-Verfügbarkeitszonen), wird die **virtuelle IP-Adresse** über einen externen **Load Balancer (LB)** verwaltet. Der Load Balancer leitet den Datenverkehr an die physischen IP-Adressen der Server in den jeweiligen Subnetzen weiter.

#### Regeln für Verkehrsführung und Lastverteilung {#intelligent-traffic-routing--load-balancing-rules}

Der Load Balancer verteilt die Clientanfragen anhand zweier Kriterien:

  * **Lastverteilungsregeln:** zum Beispiel die **Client-IP-Adresse** oder der **Client-TCP-Port**.
  * **Knotenverfügbarkeit:** Der Load Balancer leitet den Datenverkehr nur an die Knoten weiter, die laut SafeKit-Integritätsprüfung fehlerfrei sind.


> **⚠️ Hinweis:** SafeKit führt die Systemprüfung durch. Der Load Balancer wird von Ihrem Netzwerk oder Ihrem Cloud-Anbieter bereitgestellt.

#### SafeKit-Gesundheitscheck {#safekit-health-check-mechanism}

SafeKit stellt auf jedem Server der <span class="notranslate farm-term" translate="no">farm</span> eine **URL für die Zustandsprüfung** bereit. Der Load Balancer liest diese URL, um den Status jedes Servers zu ermitteln.

  * **Knoten aktiv:** Der Integritätscheck liefert `HTTP 200 OK`.. Der Load Balancer leitet den Datenverkehr an diesen Server weiter.
  * **Knoten ausgefallen:** Wenn ein Server oder eine Anwendung ausfällt, gibt SafeKit `HTTP 404 NOT FOUND`) zurück (oder der Server antwortet nicht). Der Load Balancer stoppt daraufhin sofort die Weiterleitung von Datenverkehr an diesen Knoten.


#### Cloud-Bereitstellung: AWS, Azure und GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Dies ist die Standardarchitektur für **<span class="notranslate farm-term" translate="no">farm</span> in der Cloud**. Wenn ein Subnetz oder eine Zone ausfällt, verarbeiten die anderen Knoten den Datenverkehr weiterhin. Sie wird von [**Amazon AWS**](</de/solutions/aws-load-balancing-cluster-failover/>) (AWS Network Load Balancer), [**Microsoft Azure**](</de/solutions/azure-load-balancing-cluster-failover/>) (Azure Load Balancer) und [**Google Cloud (GCP)**](</de/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing) unterstützt.


## Vergleich: Implementierung virtueller IP, Latenz und Anwendungstransparenz {#virtual-ip-methods-comparison}

**Vergleich von virtuellen IP-Umleitungsmethoden und DNS-Umleitung für Hochverfügbarkeit und Notfallwiederherstellung.**

Umgebung und Anwendungsfall | Hochverfügbarkeitstyp | Umleitungsmethode | Umgesetzt von | Netzwerklatenz | Anwendungstransparenz und lokales IP  
---|---|---|---|---|---  
Primär/Backup (hohe Verfügbarkeit) | Mirror | Unnötige ARP-/MAC-Übernahme | ✅ SafeKit-Produkt | Sehr gering: Zeit, um den Fehler zu erkennen und GARP zu senden | Volle Transparenz: Die virtuelle IP-Adresse ist lokal auf dem aktiven Knoten. Die Client-IP-Adresse ändert sich nicht.  
Lastverteilung (aktiv/aktiv) | <span class="notranslate farm-term" translate="no">Farm</span> Cluster | Kernel-Netzwerkfilter / GARP | ✅ SafeKit-Produkt | Sehr gering: Zeit, um den Fehler zu erkennen und die Netzwerkfilter zu ändern | Volle Transparenz: Die virtuelle IP-Adresse ist auf allen Knoten lokal. Die Client-IP-Adresse ändert sich nicht.  
Gleiches Subnetz / erweitertes LAN (gestrecktes VLAN) | Notfallwiederherstellung (ferne Rechenzentren) | IP-Aliasing / GARP | ✅ SafeKit-Produkt (das gestreckte VLAN wird vom Netzwerkteam bereitgestellt) | Niedrig: hängt von der Round-Trip-Time (RTT) des gestreckten VLANs ab. | Volle Transparenz: Die virtuelle IP-Adresse ist lokal auf den Knoten. Die Client-IP-Adresse ändert sich nicht.  
Unterschiedliche Subnetze: Nur Load Balancer | Notfallwiederherstellung (ferne Rechenzentren / Cloud) | Externer Lastverteiler | 🛠️ Integrator: Load-Balancer-Konfiguration (SafeKit führt die Zustandsprüfung durch) | Mittel: hängt vom Integritätsprüfungsintervall des Load Balancers ab. | ⚠️ Bei Verwendung von SNAT/DNAT ist nur teilweise Transparenz gegeben. Die virtuelle IP-Adresse ist **nicht** lokal auf den Knoten. Die Client-IP-Adresse wird möglicherweise **nicht** beibehalten. Die Anwendung muss dies unterstützen.  
Unterschiedliche Subnetze: Load Balancer + lokale virtuelle SafeKit-IP | Notfallwiederherstellung (ferne Rechenzentren / Cloud) | Externer Load Balancer mit Floating IP / Direct Server Return | 🛠️ Integrator: Load-Balancer-Konfiguration (SafeKit führt die Zustandsprüfung durch) | Mittel: hängt vom Integritätsprüfungsintervall des Load Balancers ab. | Gute Transparenz: Die virtuelle IP-Adresse ist lokal auf dem primären Knoten und ist die Zieladresse.
Unterschiedliche Subnetze: Cloud-CLI | Notfallwiederherstellung (Cloud) | Cloud-API: Die private IP-Adresse oder eine Cloud-Route wird auf die neue primäre IP-Adresse verschoben. | 🛠️ Integrator: Cloud-CLI-Befehle im `start_prim` -Skript | Mittel bis hoch: abhängig von der Antwortzeit der Cloud-API | Volle Transparenz: Die virtuelle IP-Adresse ist lokal auf dem primären Knoten. Die Client-IP-Adresse ändert sich nicht.
Unterschiedliche Subnetze: BGP | Notfallwiederherstellung (Remote-Rechenzentren / Cloud) | /32-Route mit BGP angekündigt | 🛠️ Integrator: BGP-Befehle in den Skripten `start_prim` und `stop_prim` | Niedrig bis mittel: abhängig von der BGP-Konvergenzzeit | Volle Transparenz: Die virtuelle IP-Adresse ist lokal auf dem primären Knoten. Die Client-IP-Adresse ändert sich nicht. BGP-Router erforderlich.  
DNS-Umleitung: Keine virtuelle IP-Adresse | Notfallwiederherstellung (ferne Rechenzentren) | DNS-Eintragsänderung (Name / physische IP) | 🛠️ Integrator: DNS-Aktualisierungsbefehle im `start_prim` -Skript | Hoch und nicht vorhersehbar: abhängig von der DNS-TTL (Time To Live) und dem DNS-Cache des Clients. | ⚠️ Nicht zuverlässig: Der Client muss eine neue DNS-Abfrage durchführen. Häufig behalten Clients die alte IP-Adresse, die sie beim Start erhalten haben, und werden nach einem Failover nicht umgeleitet.  
  
## Häufig gestellte Fragen zu virtuellen IPs {#virtual-ip-faq}

### Virtuelle IP und Netzwerke {#virtual-ip--networking}

Was ist eine virtuelle IP-Adresse und wie unterscheidet sie sich von einer physischen IP-Adresse?

Eine **physische IP-Adresse** ist an eine Netzwerkkarte gebunden. Eine **virtuelle IP-Adresse** ist nicht an Hardware gebunden. In einem SafeKit-Cluster verwenden Clients immer die virtuelle IP-Adresse. Fällt der primäre Server aus, wird die virtuelle IP-Adresse automatisch einem funktionierenden Knoten zugewiesen. Sie müssen die Clientkonfiguration nicht ändern.

Benötige ich einen Hardware-Loadbalancer, um eine virtuelle IP-Adresse zu verwenden?

Nein. **SafeKit** verwaltet die virtuelle IP-Adresse softwareseitig. Innerhalb desselben Subnetzes nutzt es **IP-Aliasing** und **Gratuitous ARP (GARP),** um den Datenverkehr umzuleiten. Sie benötigen keinen externen Load Balancer oder Proxy-Server.

Was ist Gratuitous ARP (GARP) und wozu wird es verwendet?

**Gratuitous ARP (GARP)** ist eine Netzwerknachricht, die an alle Geräte gesendet wird. Sie aktualisiert die ARP-Tabellen von Switches und Routern. Im Falle eines Failovers sendet der neue primäre Server eine GARP-Nachricht. Diese Nachricht teilt mit, dass die **virtuelle IP-Adresse** nun mit der MAC-Adresse des neuen primären Servers verknüpft ist. Der Datenverkehr wird daraufhin umgehend umgeleitet.

Kann ich einen DNS-Namen mit einer virtuellen IP-Adresse verknüpfen?

**Ja.** Erstellen Sie einen Standard-A-Record für die virtuelle IP-Adresse. Die Umleitung erfolgt auf **Ebene der virtuellen IP-Adresse** (per ARP oder Netzwerkumleitung), **nicht auf DNS-Ebene**. Dadurch entstehen keine DNS-Verzögerungen oder TTL-Probleme, und der Failover bleibt **für die Anwendung transparent**.

### Cloud- und fortschrittliche Architekturen {#cloud--advanced-architectures}

Wie funktioniert eine virtuelle IP-Adresse in der Cloud (AWS, Azure, GCP)?

In der Cloud stehen Layer-2-GARP-Nachrichten für die Umleitung einer virtuellen IP-Adresse nicht zur Verfügung. SafeKit ist mit **Cloud-Load-Balancern** (AWS ELB, Azure LB oder Google GCLB) kompatibel. SafeKit stellt eine **URL für die Zustandsprüfung** bereit. Der Load-Balancer liest diese URL und leitet den Datenverkehr an den aktiven Knoten weiter.

Ist ein erweitertes LAN für die Notfallwiederherstellung besser geeignet als ein Load Balancer?

**Ja**. Zwischen entfernten Rechenzentren ist ein **erweitertes LAN (Stretched VLAN)** oft besser, da der Failover **für die Anwendung transparent** bleibt. Die **virtuelle IP-Adresse ändert sich nicht**, sodass die Anwendung und ihre Clients nach einem Failover zwischen den Rechenzentren weiterhin dieselbe Adresse verwenden.

Welche Grenzen hat die DNS-Umleitung im Vergleich zu einer virtuellen IP-Adresse?

**Die DNS-Umleitung** hängt von der **Gültigkeitsdauer (TTL)** und dem DNS-Cache des Clients ab. Die Wiederherstellung kann Stunden dauern. **Clients, die keine neue DNS-Abfrage durchführen, bleiben auf dem ausgefallenen Server blockiert**. Eine **virtuelle IP-Adresse** wird sofort per GARP-Nachricht auf Layer 2 umgeleitet. Der DNS-Cache des Clients hat dabei keine Auswirkung.

### Transparenz und Sicherheit {#transparency--security}

Warum ist eine lokale virtuelle IP-Adresse für die Anwendungstransparenz wichtig?

Bei einer lokalen **virtuellen IP-Adresse** verwendet die Anwendung eine unveränderliche Adresse. SafeKit übernimmt die Umleitung im **Kernel**. Die Anwendung bemerkt den Failover nicht. Bei DNAT hingegen ändert sich die von der Anwendung verwendete Adresse.

Behält eine virtuelle IP-Adresse die ursprüngliche Client-IP-Adresse bei?

Ja. SafeKit verwendet kein Source-NAT (SNAT). Die virtuelle IP-Adresse befindet sich lokal auf dem aktiven Server, sodass die Anwendung die **ursprüngliche Client-IP-Adresse** erhält. Dies ist wichtig für Sicherheitsaudits, Sitzungspersistenz und behördliche Protokollierung.


{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}
