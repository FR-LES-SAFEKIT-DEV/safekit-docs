---
title: "Wie funktioniert eine virtuelle IP-Adresse (VIP) beim Hochverfügbarkeits-Clustering?"
canonical: "https://safekit.eviden.com/de/best-practises/how-a-virtual-ip-address-works/"
description: "Entdecken Sie, wie SafeKit softwaredefinierte virtuelle IP-Adressen (VIP) verwendet, um eine Verfügbarkeit rund um die Uhr sicherzustellen. Erfahren Sie mehr über automatisiertes Failover über Gratuitous ARP und warum es die DNS-Umleitung für die Geschäftskontinuität unter Windows und Linux übertrifft."
category: "best-practises"
lang: "de"
topics: "Was ist eine virtuelle IP-Adresse in einem Hochverfügbarkeitscluster?, Virtuelle IP-Implementierung in SafeKit, Inhaltsverzeichnis, Wie eine virtuelle IP-Adresse (VIP) in einem Failover im gleichen Subnetz funktioniert (Spiegelcluster), Wie eine virtuelle IP (VIP) in verschiedenen Subnetzen funktioniert (Spiegelcluster), Wie eine virtuelle IP mit Lastausgleich in einer Farm mit demselben Subnetz funktioniert (Farmcluster), Wie eine virtuelle IP mit Lastausgleich in verschiedenen Subnetzen funktioniert (Farmcluster), Virtuelle IP vs. DNS-Umleitung: Warum DNS-Failover oft fehlschlägt, Vergleich: Implementierung virtueller IP, Latenz und Anwendungstransparenz, Konfigurieren einer virtuellen IP-Adresse für Netzwerklastenausgleich und hohe Verfügbarkeit, häufig gestellte Fragen zu virtueller IP (VIP), 🔍 SafeKit High Availability Navigation Hub"
---

# Wie funktioniert eine virtuelle IP-Adresse (VIP) beim Hochverfügbarkeits-Clustering? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## Was ist eine virtuelle IP-Adresse in einem Hochverfügbarkeitscluster? {#virtual-ip-definition}

  * **Definition:** Eine **virtuelle IP-Adresse (VIP)** ist eine bewegliche Netzwerkadresse, die beim [Hochverfügbarkeits-Clustering](</de/>) den kontinuierlichen Zugriff auf Anwendungen sicherstellt. Im Gegensatz zu einer gewöhnlichen IP-Adresse ist sie nicht an eine bestimmte physische Netzwerkschnittstelle gebunden. Stattdessen wechselt sie zwischen den Clusterknoten und bietet Clients einen einzigen, dauerhaften Zugangspunkt.
  * **Keine Hardware erforderlich:** SafeKit verwaltet das VIP auf Softwareebene mithilfe von **Gratuitous ARP (GARP)**, wodurch die Notwendigkeit externer Load Balancer in Umgebungen mit demselben Subnetz entfällt.
  * **Anwendungstransparenz:** Durch die Bindung an eine lokale VIP bemerken Anwendungen keine Failover-Ereignisse, wodurch Client-Quell-IPs und vorhandene Sicherheitskonfigurationen erhalten bleiben.
  * **Notfallwiederherstellung:** Die Verwendung eines **erweiterten LAN** ermöglicht die Verwendung derselben VIP in entfernten Rechenzentren und vereinfacht so das Site-to-Site-Failover im Vergleich zu komplexen DNS-Umleitungen und TTL-Caching-Verzögerungen.


## Virtuelle IP-Implementierung in SafeKit {#safekit-vip-implementation}

  * **Spiegelcluster:** Verfügt über eine Floating-IP, die nur auf dem Primärserver aktiv ist, um Echtzeitreplikation und Failover zu ermöglichen.
  * **Farmcluster:** Ermöglicht den Netzwerklastausgleich durch gleichzeitige Aufrechterhaltung des VIP auf allen Knoten.


**Hauptvorteil:** Durch die Verwendung von **Gratuitous ARP (Address Resolution Protocol)** oder **MAC Address Takeover** ermöglicht der VIP einen nahtlosen Anwendungs-Failover ohne manuelle Neukonfiguration des Clients und gewährleistet so die Geschäftskontinuität rund um die Uhr.

  * **Cloud und Multi-Subnetz:** Wird über externe Load-Balancer-Zustandsprüfungen (AWS, Azure, GCP) verwaltet, um den Datenverkehr über verschiedene Subnetze umzuleiten.


![Vergleichsdiagramm des Verhaltens virtueller IP (VIP) in Evidian SafeKit: Spiegelcluster mit einer Floating-IP auf dem aktiven Knoten im Vergleich zu Farmclustern mit Netzwerklastausgleich über alle Knoten.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Virtuelle IP-Implementierungsstrategien für Mirror- und Farm-Cluster in SafeKit.**


{{%  insert-safekit-4-buttons-de  %}}
 

## Inhaltsverzeichnis {#table-of-contents}

  * [Wie eine virtuelle IP-Adresse (VIP) in einem Failover im selben Subnetz (Spiegelcluster) funktioniert](#virtual-ip-same-subnet-failover)
  * [Wie eine virtuelle IP (VIP) über verschiedene Subnetze hinweg funktioniert (Spiegelcluster)](#virtual-ip-different-subnets-failover)
  * [So funktioniert eine virtuelle IP mit Lastenausgleich in einer Farm mit demselben Subnetz (Farmcluster)](#vip-load-balancing-same-subnet)
  * [Wie eine virtuelle IP mit Lastenausgleich über verschiedene Subnetze hinweg funktioniert (Farmcluster)](#vip-load-balancing-different-subnets)
  * [Virtuelle IP vs. DNS-Umleitung: Warum DNS-Failover oft fehlschlägt](#virtual-ip-vs-dns-redirection-failover)
  * [Vergleich: Virtuelle IP-Implementierung, Latenz und Anwendungstransparenz](#vip-vs-dns-comparison)
  * [Konfigurieren einer virtuellen IP-Adresse für Netzwerklastenausgleich und hohe Verfügbarkeit](#virtual-ip-configuration-load-balancing-ha)
  * [Häufig gestellte Fragen zu Virtual IP (VIP)](#virtual-ip-faq)
  * [🔍 SafeKit Hochverfügbarkeits-Navigations-Hub](#hub)


## So funktioniert eine virtuelle IP-Adresse (VIP) in einem Failover im selben Subnetz (Spiegelcluster) {#virtual-ip-same-subnet-failover}

### Automatisiertes Failover und Netzwerkumleitung in einem lokalen Subnetz {#automated-failover--network-rerouting-in-a-local-subnet}

Für Unternehmen, die eine nahtlose Geschäftskontinuität innerhalb einer lokalen Infrastruktur benötigen, bietet **SafeKit Software-Defined High Availability for Local Network Clusters** eine robuste, automatisierte Lösung für die Verwaltung virtueller IP-Adressen und Anwendungs-Failover in Echtzeit. 

### Lokaler Spiegelcluster: Nahtloser 2-Knoten-Windows- oder Linux-Failover {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![SafeKit Virtual IP (VIP)-Failover-Mechanismus zwischen zwei Servern im selben Subnetz](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

 SafeKit VIP-Aliasing und MAC-Adresszuordnung In einem standardmäßigen **SafeKit-Spiegelcluster**, in dem sich beide Knoten im selben lokalen Subnetz befinden, wird hohe Verfügbarkeit durch eine **softwaredefinierte virtuelle IP (VIP)** erreicht. Im Gegensatz zu hardwarebasierten Lösungen verwaltet SafeKit diese VIP direkt im Netzwerk-Stack des Betriebssystems. Dieser VIP fungiert als dauerhafter logischer Einstiegspunkt für Clients, der über **IP-Aliasing** über den eindeutigen physischen IP-Adressen von Server 1 und Server 2 liegt. 

#### Erweitertes IP-Aliasing und mehrere VIP-Unterstützung von SafeKit {#safekits-advanced-ip-aliasing--multiple-vip-support}

Ein wesentlicher Vorteil der **SafeKit-Lösung** ist ihre Flexibilität bei der Verwaltung von Netzwerkidentitäten. Die VIP ist eine dritte IP-Adresse, die zwischen den Knoten „schwebt“. Insbesondere ist SafeKit in der Lage, **mehrere virtuelle IP-Adressen** innerhalb eines einzigen Clusters zu verwalten. Diese können derselben primären Ethernet-Karte zugewiesen oder auf verschiedene physische Karten verteilt werden, was komplexe Konfigurationen ermöglicht, bei denen verschiedene Dienste an bestimmte virtuelle Identitäten gebunden sind. 

#### Der Failover-Mechanismus: Gratuitous ARP (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

SafeKit stellt sicher, dass bei einem Hardwareausfall kein manueller Eingriff erforderlich ist. Im Normalbetrieb wird die VIP der **MAC-Adresse von Server 1 (mac1)** zugeordnet. Wenn SafeKit einen Heartbeat-Fehler auf Server 1 erkennt, führt es eine zweistufige Wiederherstellung durch: 

  * **Anwendungswiederherstellung:** SafeKit startet die kritischen Anwendungsdienste auf Server 2 automatisch neu.
  * **Netzwerkumleitung:** SafeKit sendet sofort eine **Gratuitous ARP (GARP)**-Nachricht. Dadurch werden die ARP-Caches aller Netzwerk-Switches und verbundenen Clients zwangsweise aktualisiert und der VIP der **MAC-Adresse von Server 2 (mac2)** neu zugeordnet.


#### Remote-Rechenzentren und erweiterte VLANs {#remote-data-centers--extended-vlans}

Obwohl er typischerweise für lokale Cluster verwendet wird, ist der Same-Subnet-Algorithmus von **SafeKit** die bevorzugte Wahl für **Disaster Recovery (DR)** an Remote-Standorten, die über ein **erweitertes LAN oder Stretched VLAN** verbunden sind. Diese „gestreckte“ Architektur ermöglicht Ihnen die Verwaltung eines einzelnen Subnetzes über geografische Entfernungen hinweg, was Ihre Netzwerktopologie erheblich vereinfacht und den Overhead komplexer Routing-Protokolle vermeidet. 

> **⚠️ Hinweis:** Layer-2-Umleitung über Gratuitous ARP ist das **transparenteste Lösung** für Bewerbungen. Im Gegensatz zur Layer-3-Umleitung mit einem Load Balancer wird dies vermieden **Quell-/Ziel-IP-Übersetzung (SNAT/DNAT)**. Die Anwendung empfängt Datenverkehr direkt mit der ursprünglichen Client-IP und die virtuelle IP wird lokal konfiguriert. **Viele Anwendungen bevorzugen** Sehen Sie sich die virtuelle IP lokal an und empfangen Sie die ursprüngliche Client-IP direkt. Ohne diese Transparenz würden sie **funktioniert möglicherweise nicht wie erwartet** aufgrund komplexer Netzwerkübersetzungen.

## Wie eine virtuelle IP (VIP) über verschiedene Subnetze hinweg funktioniert (Spiegelcluster) {#virtual-ip-different-subnets-failover}

### Cloud-fähige Verkehrsorchestrierung über Load Balancer-Integration {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

Durch die Nutzung der externen Netzwerkinfrastruktur lässt sich **SafeKit Software-Defined High Availability for Multi-AZ and Cloud Clusters** nahtlos in einen **Network Load Balancer** integrieren, um den Datenverkehr-Failover über separate Subnetze und Verfügbarkeitszonen hinweg zu orchestrieren. 

### Subnetzübergreifende Spiegelcluster: Windows- und Linux-Implementierung {#cross-subnet-mirror-clusters-windows--linux-implementation}


![Diagramm eines virtuellen IP-Failovers mit einem Load Balancer über zwei verschiedene Subnetze](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

 Multi-Subnetz-Datenverkehrsrouting über Load Balancer-Zustandsprüfungen Wenn sich Clusterknoten in **verschiedenen Subnetzen** befinden, ist ein standardmäßiges ARP-basiertes Failover nicht möglich. In diesem Szenario wird die **Virtual IP (VIP)** auf einem **Load Balancer (LB)** gehostet und nicht auf der Ethernet-Karte des Servers. Der Load Balancer fungiert als Gateway und leitet den Datenverkehr basierend auf der Echtzeitverfügbarkeit an die physischen IP-Adressen der primären und sekundären Knoten weiter. 

#### Dynamisches Routing über SafeKit Health Checks {#dynamic-routing-via-safekit-health-checks}

SafeKit verwaltet die Verkehrssteuerung, indem es auf jedem Knoten eine dedizierte **Health Check-URL** bereitstellt. Der Load Balancer fragt diese URLs ab, um den Clusterstatus zu ermitteln: 

  * **Primärer Knoten (PRIM):** Die Gesundheitsprüfung gibt `HTTP 200 OK` zurück. Der Load Balancer leitet den gesamten Verkehr hierher.
  * **Sekundärer Knoten (SECOND):** Die Gesundheitsprüfung gibt `HTTP 404 NOT FOUND` zurück. Der Load Balancer sendet keinen Datenverkehr an diesen Knoten.

Während eines **Failover-Ereignisses** schaltet SafeKit die Antworten der Integritätsprüfung sofort um und veranlasst so den Load Balancer, den Client-Datenverkehr an den neuen Primärserver umzuleiten. 

> **⚠️ Hinweis:** SafeKit stellt die Integritätsprüfungslogik bereit; Der physische oder virtuelle Load Balancer muss von Ihrer Netzwerkinfrastruktur bereitgestellt werden.

#### Cloud-Integration: AWS, Azure und GCP {#cloud-integration-aws-azure-and-gcp}

Dieses „Load Balancer + Health Check“-Modell ist der Industriestandard für **Cloud High Availability**. Es ist wichtig für die Implementierung von SafeKit in Umgebungen wie: 

  * 💡 [**Amazon AWS**](</solutions/aws-high-availability-cluster-synchronous-replication-failover/>) (AWS Network Load Balancer)
  * 💡 [**Microsoft Azure**](</solutions/azure-high-availability-cluster-synchronous-replication-failover/>) (Azure Load Balancer)
  * 💡 [**Google Cloud (GCP)**](</solutions/gcp-high-availability-cluster-synchronous-replication-failover/>) (Google Cloud Load Balancing)


#### Überlegungen zum Netzwerk: Load Balancer vs. Extended LAN {#network-considerations-load-balancer-vs-extended-lan}

Wenn ein Load Balancer nicht gewünscht ist, wenden Sie sich an Ihr Netzwerkteam bezüglich der Implementierung eines **Extended LAN (VLAN-Stretching)** zwischen Subnetzen. Dadurch können Sie zum einfacheren VIP-Modell „Same Subnet“ zurückkehren. 

> **⚠️ Hinweis:** Wenn Sie sich für einen Load Balancer entscheiden, stellen Sie sicher, dass Ihre Anwendung mit **Source/Destination IP Translation (SNAT/DNAT)** kompatibel ist. Bei einem Load Balancer verliert die Anwendung möglicherweise den Überblick über die Identität des ursprünglichen Benutzers oder kann nicht gestartet werden, da sie die direkt auf ihrer eigenen Netzwerkschnittstelle konfigurierte virtuelle IP nicht mehr sieht.

## So funktioniert eine virtuelle IP mit Lastenausgleich in einer Farm mit demselben Subnetz (Farmcluster) {#vip-load-balancing-same-subnet}

### Skalierbare Leistung: Lastausgleich und Redundanz auf Kernel-Ebene {#scalable-performance-kernel-level-load-balancing--redundancy}

Für Umgebungen mit hohem Datenverkehr wird im **Architecture Guide: Scalable High Availability with Multi-Node Farm Clusters** erklärt, wie SafeKit Arbeitslasten auf mehrere aktive Server verteilt und gleichzeitig die vollständige Redundanz aufrechterhält. 

### Farm-Cluster-Architektur: Lastverteilung über Windows- oder Linux-Knoten hinweg {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


![Diagramm einer virtuellen IP (VIP) mit Lastausgleich innerhalb eines Farmclusters im gleichen Subnetz](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

 Verteilte Datenverkehrsverarbeitung über Kernel-Filterung In einem **Lastausgleichs-Farmcluster** wird eine virtuelle IP-Adresse (VIP) verwendet, um Client-Anfragen gleichzeitig auf mehrere Server zu verteilen. Während dieses Beispiel zwei Knoten umfasst, lässt sich die Architektur skalieren, um größere Serverfarmen zu unterstützen. In einer Konfiguration mit demselben Subnetz wird der VIP über IP-Aliasing auf der Ethernet-Karte **jedes Servers** im Cluster konfiguriert. 

#### Verkehrsverteilung: Der Kernel-Level-Filter {#traffic-distribution-the-kernel-level-filter}

Im Gegensatz zu einem einfachen Failover-Cluster verwaltet ein Farm-Cluster den Datenverkehr über einen speziellen **Filter auf Kernel-Ebene**. Der Prozess funktioniert wie folgt: 

  * **ARP-Zuordnung:** In den ARP-Caches der Clients ist der VIP zunächst einer einzelnen Hardwareadresse zugeordnet (z. B. `mac1` von Server 1).
  * **Paketaufteilung:** Wenn Server 1 den Datenverkehr empfängt, analysiert der SafeKit-Kernelfilter die Identität der eingehenden Pakete (basierend auf **Client-IP** oder **TCP-Port**).
  * **Lastverteilung:** Der Filter bestimmt, welche Pakete lokal verarbeitet und welche zur Verarbeitung an andere Knoten (z. B. Server 2) umgeleitet werden sollen, um eine ausgewogene Arbeitslast sicherzustellen.


#### Failover und Umleitung mit Gratuitous ARP {#failover-and-rerouting-with-gratuitous-arp}

Wenn der Primärknoten (Server 1) ausfällt, behält der Cluster die Verfügbarkeit über **Gratuitous ARP (GARP)** bei. SafeKit sendet eine GARP-Nachricht, um die Client-ARP-Caches mit `mac2` von Server 2 zu aktualisieren. Dadurch wird sichergestellt, dass Clients auch bei einem Ausfall des primären „Einstiegspunkts“ sofort zu den verbleibenden Knoten in der Farm umgeleitet werden. 

#### Bereitstellung an entfernten Standorten {#deployment-in-remote-sites}

Für Organisationen, die über **entfernte Rechenzentren** operieren, bleibt dieser Lastausgleichsalgorithmus funktionsfähig, sofern die Standorte über ein **erweitertes LAN oder VLAN** verbunden sind. Dadurch wird eine virtuelle Umgebung mit demselben Subnetz erstellt, was die effizienteste Konfiguration für geografisch verteilte Farmcluster darstellt. 

## Wie eine virtuelle IP mit Lastenausgleich über verschiedene Subnetze hinweg funktioniert (Farmcluster) {#vip-load-balancing-different-subnets}

### Multizonen-Skalierung: Orchestrierung des Datenverkehrs über Cloud-Subnetze hinweg {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

Der **Architecture Guide: Scaling Farm Clusters in Multi-Zone and Cloud Environments** bietet die Blaupause für die Verteilung von Anwendungs-Workloads über separate Verfügbarkeitszonen und Subnetze. 

### Subnetzübergreifende Farmcluster: Windows- und Linux-Skalierbarkeit mit mehreren Knoten {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


![Diagramm eines Farmclusters mit Lastenausgleich, der in zwei verschiedenen Subnetzen betrieben wird](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

 Globale Datenverkehrsverteilung über externen Lastausgleich Wenn Farmknoten über **verschiedene Subnetze** verteilt sind (üblich bei Multi-AZ-Cloud-Bereitstellungen), wird die **Virtuelle IP (VIP)** von einem externen **Load Balancer (LB)** verwaltet. Der LB hält den VIP und leitet eingehenden Datenverkehr an die physischen IP-Adressen der Server in ihren jeweiligen Subnetzen weiter. 

#### Intelligente Verkehrsrouting- und Lastverteilungsregeln {#intelligent-traffic-routing--load-balancing-rules}

Der Load Balancer verteilt Clientanfragen basierend auf zwei Hauptfaktoren: 

  * **Verteilungsregeln:** Der Datenverkehr wird nach Sitzungsaffinität oder Lastausgleichsalgorithmen aufgeteilt (z. B. Analyse der **Client-IP-Adresse** oder des **Client-TCP-Ports**).
  * **Knotenverfügbarkeit:** Datenverkehr wird nur an fehlerfreie Knoten weitergeleitet, wie durch die SafeKit-Gesundheitsprüfung ermittelt.


> **⚠️ Hinweis:** SafeKit stellt die Integritätsprüfungslogik bereit; Der physische oder virtuelle Load Balancer muss von Ihrer Netzwerkinfrastruktur bereitgestellt werden.

#### SafeKit Health Check-Mechanismus {#safekit-health-check-mechanism}

SafeKit stellt auf jedem Server in der Farm eine **Health Check-URL** in Echtzeit bereit, um dem Load Balancer seinen Betriebsstatus mitzuteilen: 

  * **Knoten UP:** Die Gesundheitsprüfung gibt `HTTP 200 OK` zurück. Der Load Balancer bezieht diesen Server in die aktive Rotation ein.
  * **Knoten AUSFALL/Failover:** Wenn ein Server oder eine Anwendung ausfällt, gibt SafeKit `HTTP 404 NOT FOUND` zurück (oder der Dienst wird nicht mehr erreichbar). Der Load Balancer stoppt sofort das Senden von Datenverkehr an den ausgefallenen Knoten.


#### Cloud-Bereitstellungsstandards: AWS, Azure und GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Diese Architektur ist das grundlegende Modell für **Cloud Farm-Cluster** und stellt sicher, dass die verbleibenden Knoten weiterhin die Last bewältigen, wenn ein ganzes Subnetz oder eine ganze Zone offline geht. Dies wird nativ unterstützt von: 

  * 💡 [**Amazon AWS**](</solutions/aws-load-balancing-cluster-failover/>) (AWS Network Load Balancer)
  * 💡 [**Microsoft Azure**](</solutions/azure-load-balancing-cluster-failover/>) (Azure Load Balancer)
  * 💡 [**Google Cloud (GCP)**](</solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing)


## Virtuelle IP vs. DNS-Umleitung: Warum DNS-Failover oft fehlschlägt {#virtual-ip-vs-dns-redirection-failover}

### Die DNS-Verbreitungsfalle: Warum VIPs die DNS-Umleitung übertreffen {#the-dns-propagation-trap-why-vips-outperform-dns-redirection}

Wenn man sich beim Failover auf DNS verlässt, entsteht in Hochverfügbarkeitsarchitekturen oft ein **falsches Sicherheitsgefühl**. Während die Änderung eines DNS-Eintrags so, dass er auf einen Backup-Server verweist, wie ein unkomplizierter Wiederherstellungspfad erscheint, bringt sie eine kritische Variable mit sich: **unvorhersehbare Latenz**. Da die DNS-basierte Umleitung auf ein unkontrolliertes Ökosystem zwischengeschalteter rekursiver Resolver angewiesen ist, um die Änderung zu bestätigen und zu verbreiten, ist sie grundsätzlich nicht mit den „Null-Ausfallzeit“-Anforderungen moderner Unternehmensdienste vereinbar. 

### Das technische Szenario: DNS-Auflösung und der „steckengebliebene“ Client {#the-technical-scenario-dns-resolution-and-the-stuck-client}

In einem Standard-Netzwerk-Setup fungiert ein **virtueller Name** (der DNS-Name) als für Menschen lesbarer Einstiegspunkt für Benutzer. Damit Daten jedoch über das Netzwerk übertragen werden können, muss dieser Name in eine bestimmte **physische IP**-Adresse aufgelöst werden. 

![Diagramm, das die DNS-Namensauflösung zur physischen IP 1 in einem Hochverfügbarkeitscluster zeigt](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 DNS-Auflösung und „steckengebliebene“ Clients auf physischer IP 1 in einem Hochverfügbarkeitscluster

#### Aktueller Status: Auflösung zu physischer IP 1 {#current-state-resolution-to-physical-ip-1}

Zunächst fragen **Client 1** und **Client 2** das DNS-System nach dem virtuellen Namen ab. Das System gibt **Physische IP 1** zurück. Die Clients stellen dann eine direkte Netzwerkverbindung (Socket) zu dieser spezifischen Hardwareadresse her. 

#### Die Failover-Herausforderung: Umleitung auf physische IP 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

Wenn der Server an der physischen IP 1 ausfällt, aktualisiert ein Administrator den DNS-Eintrag so, dass er auf **Physische IP 2** verweist. Um die Clients erfolgreich umzuleiten, muss eine „perfekte“ Reihenfolge eintreten: 

  * Die **Time to Live (TTL)** muss auf allen zwischengeschalteten ISPs und Unternehmensresolvern ablaufen.
  * Der lokale DNS-Cache auf Client 1 und Client 2 muss geleert werden.
  * Die Anwendung muss ihren vorhandenen Socket schließen und eine _neue_ DNS-Suche starten.

Wenn einer dieser Schritte versäumt wird, bleiben **Client 1 und Client 2 „stecken“** und versuchen, mit der toten physischen IP 1 zu kommunizieren, was trotz der Aktualisierung der DNS-Einträge zu Dienstausfallzeiten führt. 

### Die zwei „Black Boxes“ der DNS-Umleitung {#the-two-black-boxes-of-dns-redirection}

  * **Rekursives Caching:** Viele Internetdienstanbieter (ISPs) und DNS-Resolver von Unternehmen ignorieren niedrige TTL-Einstellungen, um den Datenverkehr zu reduzieren, und speichern die „alte“ physische IP 1 oft für Minuten oder sogar Stunden über den angeforderten Ablauf hinaus im Cache.
  * **Anwendungspersistenz:** Moderne Anwendungen (z. B. Java-basierte Microservices oder Webbrowser) führen beim Start oft nur einmal eine DNS-Suche durch. Auch wenn der DNS-Eintrag auf die physische IP 2 aktualisiert wird, verwendet die Anwendung weiterhin die ursprünglich in ihrem internen Speicher gespeicherte IP.


### Fazit {#conclusion}

Die DNS-Umleitung ist eine inkonsistente Lösung für eine Hochverfügbarkeitslösung. Für ein sofortiges Failover innerhalb einer lokalen oder regionalen Umgebung ist eine softwaredefinierte **Virtuelle IP (VIP)** die einzige Möglichkeit, eine garantierte Persistenz ohne Ausfallzeiten sicherzustellen. 

## Vergleich: Virtuelle IP-Implementierung, Latenz und Anwendungstransparenz {#vip-vs-dns-comparison}

**Technischer Vergleich von Virtual IP (VIP)-Umleitungsmethoden mit DNS-Umleitung für Hochverfügbarkeit und Notfallwiederherstellung.**

Umgebung und Anwendungsfall | Hochverfügbarkeitstyp | Umleitungsmechanismus | Netzwerklatenz | Anwendungstransparenz und IP-Lokalität  
---|---|---|---|---  
Primär/Backup (Hochverfügbarkeit) | Spiegelcluster | Unentgeltliche ARP/MAC-Übernahme | Sehr niedrig: Zeit zum Erkennen und Senden von Broadcast-GARP | Volle Transparenz: Virtuelle IP ist lokal auf dem aktiven Knoten. Die Client-IP bleibt erhalten.  
Lastausgleich (Aktiv/Aktiv) | Farm-Cluster | Netzwerkfilter auf Kernel-Ebene / GARP | Sehr gering: Zeit zum Erkennen und Neukonfigurieren von Netzwerkfiltern | Volle Transparenz: Virtuelle IP ist auf allen Knoten lokal. Die Client-IP bleibt erhalten.  
Gleiches Subnetz / erweitertes LAN (VLAN-Stretching) | Disaster Recovery (Remote-Rechenzentren) | Standard-IP-Aliasing / GARP | Niedrig: Hängt von der gestreckten VLAN-RTT (Round Trip Time) ab. | Volle Transparenz: Virtuelle IP ist lokal auf den Knoten. Die Client-IP bleibt erhalten.  
Verschiedene Subnetze | Disaster Recovery (Remote-Rechenzentren / Cloud) | Externer Load Balancer | Moderat: Höhere Failover-Latenz aufgrund der Load Balancer-Integritätsprüfungsintervalle | ⚠️ Teiltransparenz: Verwendet SNAT/DNAT. Virtuelle IP ist auf den Knoten **NICHT** lokal. Die Client-IP bleibt **NICHT** erhalten. Die Anwendung muss dies unterstützen.  
DNS-Umleitung: Kein VIP | Disaster Recovery (Remote-Rechenzentren) | DNS-Eintragsaktualisierung (Name / physische IP) | Hoch/Unvorhersehbar: Abhängig von DNS TTL (Time To Live) und Client-DNS-Caching. | ⚠️ Unzuverlässig: Der Client muss DNS neu auflösen. In den meisten Fällen verwenden Clients weiterhin die veraltete IP, die beim Start aufgelöst wurde, und werden nach einem Failover nicht umgeleitet.  
  
## Konfigurieren einer virtuellen IP-Adresse für Netzwerklastenausgleich und hohe Verfügbarkeit {#virtual-ip-configuration-load-balancing-ha}


{{%  insert-safekit-farm-video-de  %}}
 

## Häufig gestellte Fragen zu Virtual IP (VIP) {#virtual-ip-faq}

### Virtuelle IP (VIP) und Netzwerk {#virtual-ip-vip--networking}

Was ist eine virtuelle IP (VIP) und wie unterscheidet sie sich von einer physischen IP?

Während eine **physische IP-Adresse** an eine bestimmte Netzwerkschnittstelle gebunden ist, ist eine **Virtuelle IP (VIP)** eine „schwebende“ Adresse unabhängig von der Hardware. In einem SafeKit-Cluster fungiert der VIP als dauerhafter Einstiegspunkt; Wenn der primäre Server ausfällt, migriert der VIP automatisch auf einen fehlerfreien sekundären Knoten, sodass keine Neukonfiguration des Clients erforderlich ist.

Benötige ich einen Hardware-Load-Balancer, um eine virtuelle IP zu verwenden?

Nein. **SafeKit Hochverfügbarkeitssoftware** verwaltet die virtuelle IP auf Softwareebene. In Architekturen mit demselben Subnetz nutzt es **IP-Aliasing** und **Gratuitous ARP (GARP)**, um den Datenverkehr umzuleiten. Dadurch entfallen die Kosten und die Komplexität externer Hardware-Load-Balancer oder dedizierter Proxyserver.

Was ist Gratuitous ARP (GARP) und warum wird es verwendet?

**Gratuitous ARP (GARP)** ist ein Netzwerk-Broadcast, der die ARP-Tabellen von Netzwerk-Switches und Routern aktualisiert. Während eines Failovers sendet der neue Primärserver ein GARP-Paket, um bekannt zu geben, dass die **virtuelle IP** nun seiner MAC-Adresse zugeordnet ist, wodurch eine sofortige Umleitung des Datenverkehrs über die Netzwerkstruktur erzwungen wird.

Kann ich einen DNS-Namen mit einer virtuellen IP verknüpfen?

**Ja.** Sie können einem VIP einen DNS-Namen zuordnen, indem Sie einen Standard-A-Eintrag erstellen. Der Hauptvorteil besteht darin, dass die Umleitung auf **VIP-Ebene** (über ARP oder Netzwerkumleitung) und **nicht auf DNS-Ebene** verwaltet wird. Dadurch wird **Anwendungstransparenz** gewährleistet, indem Verzögerungen im Zusammenhang mit der DNS-Weitergabe und dem TTL-Ablauf vermieden werden.

### Cloud- und erweiterte Architekturen {#cloud--advanced-architectures}

Wie funktioniert eine virtuelle IP in der Cloud (AWS, Azure, GCP)?

In Cloud-Umgebungen, in denen Layer 2 (ARP) eingeschränkt ist, lässt sich SafeKit in **Cloud Load Balancer** (AWS ELB, Azure LB oder Google GCLB) integrieren. SafeKit stellt eine **Health Check-URL** bereit, die die Plattform überwacht, um den Datenverkehr mithilfe von SNAT/DNAT an den aktiven Knoten weiterzuleiten.

Ist ein erweitertes LAN besser als ein Load Balancer für die Notfallwiederherstellung?

**Ja**. Für entfernte Rechenzentren ist ein **Erweitertes LAN (Stretched VLAN)** oft besser, da es die **Anwendungstransparenz** über alle Standorte hinweg aufrechterhält. Durch die Beibehaltung **der gleichen virtuellen IP** kommunizieren die Anwendung und ihre Clients weiterhin über dieselbe Identität, wodurch der Übergang zwischen Rechenzentren völlig nahtlos erfolgt.

Welche Einschränkungen gibt es bei der DNS-Umleitung im Vergleich zu virtueller IP?

**DNS-Umleitung** wird durch **TTL (Time to Live)** und clientseitiges Caching begrenzt, was die Wiederherstellung um Stunden verzögern kann. Ein großer Nachteil besteht darin, dass **Clients, die ihren DNS-Namen nicht erneut auflösen, beim Versuch, eine Verbindung zum ausgefallenen Server herzustellen, stecken bleiben**. Im Gegensatz dazu bietet eine **virtuelle IP** ein sofortiges Layer-2-Failover, das den gesamten Datenverkehr sofort umleitet und so die Konnektivität unabhängig vom clientseitigen DNS-Cache-Status gewährleistet.

### Transparenz und Sicherheit {#transparency--security}

Warum ist eine lokale virtuelle IP für die Anwendungstransparenz wichtig?

Eine lokale **Virtuelle IP (VIP)** gewährleistet **Anwendungstransparenz**, indem sie der Software ermöglicht, sich an eine dauerhafte VIP zu binden. SafeKit übernimmt die Umleitung auf **Kernel-Ebene**, sodass die Anwendung im Gegensatz zu DNAT-Lösungen, bei denen sich die gebundene IP ändert, nichts von Cluster-Failovers weiß.

Behält die Verwendung einer virtuellen IP die ursprüngliche IP-Adresse des Clients bei?

Ja. SafeKit vermeidet Source Network Address Translation (SNAT). Da sich die VIP lokal auf dem aktiven Server befindet, erhält die Anwendung die **ursprüngliche Client-IP**, die für Sicherheitsüberwachung, Sitzungspersistenz und behördliche Protokollierung von entscheidender Bedeutung ist.


{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}