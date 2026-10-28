---
title: "Wie funktioniert eine virtuelle IP-Adresse (VIP) in einem Hochverfügbarkeitscluster?"
canonical: "https://safekit.eviden.com/de/best-practises/how-a-virtual-ip-address-works/"
description: "Erfahren Sie, wie SafeKit softwaredefinierte virtuelle IP-Adressen (VIP) nutzt, um eine unterbrechungsfreie Verfügbarkeit (24/7) zu gewährleisten. Lernen Sie das automatische Failover mittels Gratuitous ARP kennen und erfahren Sie, warum es die DNS-Umleitung für die Geschäftskontinuität auf Windows und Linux übertrifft."
category: "best-practises"
lang: "de"
topics: "Was ist eine virtuelle IP-Adresse in einem Hochverfügbarkeitscluster?, Implementierung virtueller IPs in SafeKit , Inhaltsverzeichnis, Funktionsweise einer virtuellen IP-Adresse (VIP) bei Failover im selben Subnetz (Cluster Mirror ), Funktionsweise einer virtuellen IP (VIP) über verschiedene Subnetze hinweg (Cluster Mirror ), Funktionsweise einer lastverteilten virtuellen IP im selben Subnetz `Farm` (Cluster `Farm` ), Funktionsweise einer lastverteilten virtuellen IP über verschiedene Subnetze hinweg (Cluster `Farm` ), Virtuelle IP vs. DNS-Umleitung: Warum DNS-Failover oft fehlschlägt, Vergleich: Implementierung virtueller IPs, Latenz und Anwendungstransparenz, Konfiguration einer virtuellen IP-Adresse für Netzwerklastverteilung und Hochverfügbarkeit, Häufig gestellte Fragen zu virtuellen IPs (VIPs), 🔍 Navigationszentrale für Hochverfügbarkeit SafeKit"
---

# Wie funktioniert eine virtuelle IP-Adresse (VIP) in einem Hochverfügbarkeitscluster? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## Was ist eine virtuelle IP-Adresse in einem Hochverfügbarkeitscluster? {#virtual-ip-definition}

  * Definition ** : Eine virtuelle IP-Adresse (VIP) ** ist eine dynamische Netzwerkadresse ** die in hochverfügbaren [ verwendet wird ** um einen kontinuierlichen Anwendungszugriff zu gewährleisten. Im Gegensatz zu Standard-IPs ist eine VIP nicht an eine bestimmte physische Hardware-Schnittstelle gebunden, sondern wechselt zwischen den Clusterknoten ](</>) um einen einzigen, permanenten Zugriffspunkt für Clients bereitzustellen.
  * ** Keine Hardware erforderlich: ** SafeKit verwaltet die VIP auf Softwareebene mittels ** Gratuitous ARP (GARP) ** , wodurch die Notwendigkeit externer Load Balancer in Umgebungen mit demselben Subnetz entfällt.
  * ** Anwendungstransparenz: ** Durch die Bindung an eine lokale VIP bleiben Anwendungen von Failover-Ereignissen unbeeindruckt, wodurch die Quell-IPs der Clients und bestehende Sicherheitskonfigurationen erhalten bleiben.
  * ** Disaster Recovery: ** Die Verwendung eines erweiterten LANs ** ermöglicht die Nutzung derselben VIP über entfernte Rechenzentren hinweg und vereinfacht so das Site-to-Site ** Failover im Vergleich zu komplexen DNS-Umleitungen und TTL-Caching-Verzögerungen.


## Virtuelle IP-Implementierung in SafeKit {#safekit-vip-implementation}

  * ** Mirror Cluster: ** Verfügt über eine Floating IP, die nur auf dem primären Server aktiv ist, um Echtzeitreplikation und Failover zu ermöglichen.
  * ** `Farm` Cluster: ** Ermöglicht den Netzwerk-Lastausgleich durch gleichzeitige Aufrechterhaltung der VIP auf allen Knoten.


** : Durch die Nutzung ** ** ARP (Address Resolution Protocol) oder MAC Address ** ermöglicht ** VIP ein nahtloses Anwendungs-Failover ohne manuelle Client-Neukonfiguration und gewährleistet ** die Geschäftskontinuität rund um die Uhr.

  * ** Cloud & Multi-Subnet: ** Verwaltet über externe Load Balancer-Integritätsprüfungen ( AWS , Azure , GCP ), um den Datenverkehr über verschiedene Subnetze umzuleiten.


![ Vergleichsdiagramm des Verhaltens virtueller IPs (VIPs) in Evidian SafeKit : Mirror Cluster mit einer Floating IP auf dem aktiven Knoten vs. Farm Cluster mit Netzwerklastausgleich über alle Knoten. ](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

Strategien zur Implementierung virtueller IP-Adressen für ** Cluster Mirror und `Farm` in SafeKit . **


{{%  insert-safekit-4-buttons-de  %}}
 

## Inhaltsverzeichnis {#table-of-contents}

  * [ Funktionsweise einer virtuellen IP-Adresse (VIP) bei einem Failover im selben Subnetz ( Mirror -Cluster) ](#virtual-ip-same-subnet-failover)
  * [ Funktionsweise einer virtuellen IP-Adresse (VIP) über verschiedene Subnetze hinweg ( Mirror Cluster) ](#virtual-ip-different-subnets-failover)
  * [ Funktionsweise einer lastverteilten virtuellen IP in einem Cluster desselben Subnetzes `Farm` ( `Farm` -Cluster) ](#vip-load-balancing-same-subnet)
  * [ Funktionsweise einer lastverteilten virtuellen IP-Adresse über verschiedene Subnetze hinweg ( `Farm` -Cluster) ](#vip-load-balancing-different-subnets)
  * Virtuelle IP- ](#virtual-ip-vs-dns-redirection-failover) vs. DNS-Umleitung: Warum DNS-Failover oft fehlschlägt [
  * [ Vergleich: Virtuelle IP-Implementierung, Latenz und Anwendungstransparenz ](#vip-vs-dns-comparison)
  * [ Konfigurieren einer virtuellen IP-Adresse für Netzwerklastausgleich und Hochverfügbarkeit ](#virtual-ip-configuration-load-balancing-ha)
  * [ Häufig gestellte Fragen zu virtuellen IPs (VIP) ](#virtual-ip-faq)
  * [ 🔍 SafeKit Hochverfügbarer Navigationshub ](#hub)


## Funktionsweise einer virtuellen IP-Adresse (VIP) bei einem Failover im selben Subnetz ( Mirror -Cluster) {#virtual-ip-same-subnet-failover}

### Automatisierte Ausfallsicherung und Netzwerkumleitung in einem lokalen Subnetz {#automated-failover--network-rerouting-in-a-local-subnet}

Für Organisationen, die eine nahtlose Geschäftskontinuität innerhalb einer lokalen Infrastruktur benötigen, bietet ** SafeKit Software-Defined High Availability for Local Network Clusters ** eine robuste, automatisierte Lösung für die Verwaltung virtueller IP-Adressen und das Echtzeit-Anwendungs-Failover. 

### Lokaler Mirror Cluster: Nahtloses 2-Knoten-Failover Windows oder Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![ SafeKit Virtueller IP-Failover-Mechanismus (VIP) zwischen zwei Servern im selben Subnetz ](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

 VIP SafeKit Aliasing und MAC ** Adresszuordnung in einem Standardcluster SafeKit in dem mirror beide Knoten im selben lokalen Subnetz befinden, wird Hochverfügbarkeit durch eine ** virtuelle IP-Adresse (VIP) erreicht. Im Gegensatz zu hardwarebasierten Lösungen SafeKit diese ** direkt im Netzwerk-Stack ** Betriebssystems. Die VIP dient als persistenter logischer Einstiegspunkt für Clients und basiert auf den eindeutigen physischen IP-Adressen von Server 1 und Server 2 mittels IP ** ** . 

#### Erweiterte IP-Aliasierung und Unterstützung mehrerer VIPs durch SafeKit {#safekits-advanced-ip-aliasing--multiple-vip-support}

Ein wesentlicher Vorteil der Lösung ** SafeKit ** ist ihre Flexibilität bei der Verwaltung von Netzwerkidentitäten. Die VIP ist eine dritte IP-Adresse, die zwischen den Knoten „fließt“. SafeKit kann insbesondere mehrere virtuelle IP-Adressen ** ** innerhalb eines einzelnen Clusters verwalten. Diese können derselben primären Ethernet-Karte zugewiesen oder auf verschiedene physische Karten verteilt werden, wodurch komplexe Konfigurationen möglich sind, bei denen verschiedene Dienste an spezifische virtuelle Identitäten gebunden sind. 

#### Der Ausfallmechanismus: Gratuitous ARP (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

SafeKit gewährleistet, dass bei einem Hardwareausfall kein manueller Eingriff erforderlich SafeKit ** ** -Fehler auf Server 1 erkennt, führt es eine zweistufige Wiederherstellung durch: 

  * ** Anwendungswiederherstellung: ** SafeKit startet die kritischen Anwendungsdienste auf Server 2 automatisch neu.
  * Netzwerk-Routing: ** ** sendet sofort eine Gratuitous-ARP-Nachricht (GARP) ** ** . Dadurch werden die ARP-Caches aller Netzwerk-Switches und verbundenen Clients aktualisiert und die VIP auf SafeKit MAC-Adresse (mac2) von Server 2 ( ** ) ** umgeleitet.


#### Remote-Rechenzentren & Erweiterte VLANs {#remote-data-centers--extended-vlans}

Der Same-Subnet-Algorithmus ** SafeKit wird zwar typischerweise für lokale Cluster verwendet, ist aber die bevorzugte Wahl für die Notfallwiederherstellung (DR) ** über entfernte Standorte, die über ein erweitertes LAN ** ** ein gestrecktes VLAN ** verbunden sind. Diese „gestreckte“ Architektur ermöglicht die Aufrechterhaltung eines einzigen Subnetzes über geografische Entfernungen hinweg, ** die Netzwerktopologie erheblich vereinfacht und der Overhead komplexer Routing-Protokolle vermieden wird. 

> ** ⚠️ Hinweis: ** Layer-2 ** ** Anwendungen. Im Gegensatz zum Layer-3-Rerouting mit einem Load Balancer vermeidet es ** Quell-/Ziel-IP-Übersetzung (SNAT/DNAT). ** Die Anwendung empfängt den Datenverkehr direkt mit der ursprünglichen Client-IP, und die virtuelle IP wird lokal konfiguriert. ** Viele Anwendungen bevorzugen es ** ** die virtuelle IP lokal zu sehen und die ursprüngliche Client-IP direkt zu empfangen. Ohne diese Transparenz funktionieren sie aufgrund komplexer Netzwerkübersetzungen möglicherweise nicht wie erwartet. **

## Wie eine virtuelle IP-Adresse (VIP) über verschiedene Subnetze hinweg funktioniert ( Mirror -Cluster) {#virtual-ip-different-subnets-failover}

### Cloudfähige Verkehrsorchestrierung über Load-Balancer-Integration {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

Durch die Nutzung externer Netzwerkinfrastruktur integriert sich ** SafeKit Software-Defined High Availability for Multi-AZ and Cloud Clusters ** nahtlos in einen ** Network Load Balancer ** um das Traffic-Failover über separate Subnetze und Verfügbarkeitszonen hinweg zu orchestrieren. 

### Subnetzübergreifende Mirror -Cluster: Windows & Linux Implementierung {#cross-subnet-mirror-clusters-windows--linux-implementation}


![ Diagramm eines virtuellen IP-Failovers mit einem Load Balancer über zwei verschiedene Subnetze ](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

 Multi-Subnet-Traffic-Routing über Load-Balancer-Integritätsprüfungen, wenn sich Clusterknoten in **verschiedene Subnetze** Ein standardmäßiges ARP-basiertes Failover ist nicht möglich. In diesem Szenario ist die **Virtuelle IP (VIP)** wird gehostet auf einem **Load Balancer (LB)** Anstelle der Ethernet-Karte des Servers fungiert der Load Balancer als Gateway und leitet den Datenverkehr basierend auf der Echtzeitverfügbarkeit an die physischen IP-Adressen der primären und sekundären Knoten weiter. 

#### Dynamisches Routing über SafeKit Integritätsprüfungen {#dynamic-routing-via-safekit-health-checks}

SafeKit steuert den Datenverkehr, indem es auf jedem Knoten eine dedizierte Health-Check-URL ** ** bereitstellt. Der Load Balancer fragt diese URLs ab, um den Clusterstatus zu ermitteln. 

  * Primärer Knoten (PRIM): ** ** Der Integritätscheck liefert `HTTP 200 OK` . Der Load Balancer leitet den gesamten Datenverkehr hierher.
  * ** Sekundärer Knoten (SECOND): ** Die Zustandsprüfung gibt `HTTP 404 NOT FOUND` zurück. Der Load Balancer sendet keinen Datenverkehr an diesen Knoten.

Während eines Failover-Ereignisses ** schaltet ** die Health-Check-Antworten sofort um SafeKit veranlasst den Load Balancer, den Client-Datenverkehr auf den neuen primären Server umzuleiten. 

> ** ⚠️ Hinweis: ** SafeKit stellt die Logik für die Zustandsprüfung bereit; der physische oder virtuelle Load Balancer muss von Ihrer Netzwerkinfrastruktur bereitgestellt werden.

#### Cloud-Integration: AWS , Azure , {#cloud-integration-aws-azure-and-gcp} und GCP

Dieses „Load Balancer + Health Check“-Modell ist der Industriestandard für ** Cloud High Availability ** . Es ist unerlässlich für die Implementierung SafeKit in Umgebungen wie: 

  * 💡 [ ** Amazon AWS ** ](</de/solutions/aws-high-availability-cluster-synchronous-replication-failover/>) ( AWS Network Load Balancer)
  * 💡 [ ** Microsoft Azure ** ](</de/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) ( Azure Load Balancer)
  * 💡 [ ** Google Cloud ( GCP ) ** ](</de/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>) (Google Cloud Load Balancing)


#### Netzwerküberlegungen: Load Balancer vs. erweitertes LAN {#network-considerations-load-balancer-vs-extended-lan}

Wenn kein Load Balancer gewünscht ist, wenden Sie sich an Ihr Netzwerkteam bezüglich der Implementierung eines erweiterten LANs (VLAN-Stretching) ** (VLAN-Stretching) ** zwischen Subnetzen. Dadurch können Sie zum einfacheren VIP-Modell „Gleiches Subnetz“ zurückkehren. 

> ** ⚠️ Hinweis: ** Wenn Sie einen Load Balancer verwenden, stellen Sie sicher, dass Ihre Anwendung mit der Quell-/Ziel-IP-Übersetzung (SNAT/DNAT) ** ** kompatibel ist. Mit einem Load Balancer kann die Anwendung die Identität des ursprünglichen Benutzers verlieren oder nicht starten, da sie die direkt auf ihrer Netzwerkschnittstelle konfigurierte virtuelle IP nicht mehr erkennt.

## Funktionsweise einer lastverteilten virtuellen IP in einem Cluster desselben Subnetzes `Farm` ( `Farm` -Cluster) {#vip-load-balancing-same-subnet}

### Skalierbare Leistung: Lastverteilung und Redundanz auf Kernel-Ebene {#scalable-performance-kernel-level-load-balancing--redundancy}

Für Umgebungen mit hohem Datenverkehr erklärt der Architekturleitfaden ** : Skalierbare Hochverfügbarkeit mit Multi-Node `Farm` Clustern ** wie SafeKit die Arbeitslasten auf mehrere aktive Server verteilt und gleichzeitig die vollständige Redundanz aufrechterhält. 

### `Farm` -Clusterarchitektur: Lastverteilung über die Knoten Windows oder Linux {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


![ Diagramm einer lastverteilten virtuellen IP (VIP) innerhalb eines Clusters im selben Subnetz farm ](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

 Verteilte Datenverkehrsverarbeitung mittels Kernelfilterung: In einem Load-Balancing-Cluster ** `farm` , ** ) wird eine virtuelle IP-Adresse (VIP) verwendet, um Client-Anfragen gleichzeitig auf mehrere Server zu verteilen. Dieses Beispiel umfasst zwei Knoten, die Architektur ist jedoch skalierbar und unterstützt größere Serverfarmen. In einer Konfiguration im selben Subnetz wird die VIP auf der Ethernet-Karte von ** auf jedem Server ** im Cluster per IP-Aliasing konfiguriert. 

#### Verkehrsverteilung: Der Kernel-Filter {#traffic-distribution-the-kernel-level-filter}

Im Gegensatz zu einem einfachen Failover-Cluster verwaltet ein `farm` Cluster den Datenverkehr über einen spezialisierten Kernel-Filter ** ** . Der Prozess funktioniert wie folgt: 

  * ** ARP-Mapping: ** In den ARP-Caches der Clients ist die VIP zunächst einer einzelnen Hardwareadresse zugeordnet (z. B. `mac1` von Server 1).
  * ** Paketaufteilung: ** Wenn Server 1 den Datenverkehr empfängt, analysiert der SafeKit Kernelfilter die Identität der eingehenden Pakete (basierend auf ** Client-IP ** oder ** TCP-Port ** ).
  * ** Lastverteilung: ** Der Filter bestimmt, welche Pakete lokal verarbeitet und welche zur Verarbeitung an andere Knoten (z. B. Server 2) weitergeleitet werden sollen, um eine ausgewogene Arbeitslast zu gewährleisten.


#### Failover und Umleitung mit Gratuitous ARP {#failover-and-rerouting-with-gratuitous-arp}

Fällt der primäre Knoten (Server 1) aus, gewährleistet der Cluster die Verfügbarkeit über Gratuitous ARP (GARP) ** ** . SafeKit sendet eine GARP-Nachricht, um die ARP-Caches der Clients mit `mac2` von Server 2 zu aktualisieren. Dadurch wird sichergestellt, dass Clients auch bei Ausfall des primären „Einstiegspunkts“ sofort zu den verbleibenden Knoten in farm umgeleitet werden. 

#### Bereitstellung an entfernten Standorten {#deployment-in-remote-sites}

Für Organisationen, die über mehrere entfernte Rechenzentren ** ** verteilt sind, bleibt dieser Lastausgleichsalgorithmus funktionsfähig, sofern die Standorte über ein erweitertes LAN ** oder VLAN ** verbunden sind. Dadurch entsteht eine virtuelle Umgebung im selben Subnetz, die die effizienteste Konfiguration für geografisch verteilte Cluster `farm` darstellt. 

## Wie eine lastverteilte virtuelle IP-Adresse über verschiedene Subnetze hinweg funktioniert ( `Farm` -Cluster) {#vip-load-balancing-different-subnets}

### Multi-Zone-Skalierung: Orchestrierung des Datenverkehrs über Cloud-Subnetze hinweg {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

Der Architekturleitfaden ** : Skalierung `Farm` -Clustern in Multi-Zone- und Cloud-Umgebungen. ** bietet die Blaupause für die Verteilung von Anwendungsworkloads über separate Verfügbarkeitszonen und Subnetze. 

### Subnetzübergreifende `Farm` -Cluster: Multi-Node Windows & Linux Skalierbarkeit {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


Diagramm eines lastverteilten Clusters ![ , der über zwei verschiedene Subnetze ( farm ) betrieben wird ](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

 Globale Verkehrsverteilung über externen Lastausgleich: Wenn `farm` -Knoten auf ** verschiedene Subnetze ** verteilt sind (üblich in Multi-AZ-Cloud-Bereitstellungen), wird die virtuelle IP-Adresse (VIP) ** ** von einem externen Load Balancer (LB) ** ** verwaltet. Der LB verwaltet die VIP und leitet eingehenden Datenverkehr an die physischen IP-Adressen der Server in ihren jeweiligen Subnetzen weiter. 

#### Intelligente Verkehrsrouting- und Lastverteilungsregeln {#intelligent-traffic-routing--load-balancing-rules}

Der Load Balancer verteilt Clientanfragen anhand zweier Hauptfaktoren: 

  * Verteilungsregeln für ** : Der Datenverkehr ** wird nach Sitzungsaffinität oder Lastverteilungsalgorithmen aufgeteilt (z. B. Analyse ** ** ** ** .
  * Verfügbarkeit des Knotens ** : Der Datenverkehr ** wird nur an fehlerfreie Knoten weitergeleitet, wie durch die Integritätsprüfung SafeKit ermittelt.


> ** ⚠️ Hinweis: ** SafeKit stellt die Logik für die Zustandsprüfung bereit; der physische oder virtuelle Load Balancer muss von Ihrer Netzwerkinfrastruktur bereitgestellt werden.

#### SafeKit Gesundheitsprüfungsmechanismus {#safekit-health-check-mechanism}

SafeKit stellt auf jedem Server in `farm` eine Echtzeit-Zustandsprüfungs-URL ** Health Check URL ** ) bereit, um dessen Betriebsstatus an den Load Balancer zu übermitteln: 

  * Knoten ** UP: ** . Die Zustandsprüfung liefert `HTTP 200 OK` . Der Load Balancer hat diesen Server in die aktive Rotation aufgenommen.
  * ** Knoten ausgefallen/Failover: ** Wenn ein Server oder eine Anwendung ausfällt, gibt SafeKit `HTTP 404 NOT FOUND` zurück (oder der Dienst ist nicht mehr erreichbar). Der Load Balancer stoppt sofort die Weiterleitung von Datenverkehr an den ausgefallenen Knoten.


#### Cloud-Bereitstellungsstandards: AWS , Azure und GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Diese Architektur bildet das grundlegende Modell für ** Cloud-Cluster `Farm` ** ) und stellt sicher, dass die verbleibenden Knoten die Last weiterhin bewältigen, falls ein gesamtes Subnetz oder eine Zone ausfällt. Dies wird nativ unterstützt von: 

  * 💡 [ ** Amazon AWS ** ](</de/solutions/aws-load-balancing-cluster-failover/>) ( AWS Network Load Balancer)
  * 💡 [ ** Microsoft Azure ** ](</de/solutions/azure-load-balancing-cluster-failover/>) ( Azure Load Balancer)
  * 💡 [ ** Google Cloud ( GCP ) ** ](</de/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing)


## Virtuelle IP vs. DNS-Umleitung: Warum DNS-Failover oft fehlschlägt {#virtual-ip-vs-dns-redirection-failover}

### Die DNS-Propagationsfalle: Warum VIPs die DNS-Umleitung übertreffen {#the-dns-propagation-trap-why-vips-outperform-dns-redirection}

Die Verwendung von DNS für Failover erzeugt in ** oft ein ** Sicherheitsgefühl. Obwohl die Änderung eines DNS-Eintrags, um auf einen Backup-Server zu verweisen, wie ein einfacher Wiederherstellungsweg erscheint, führt sie zu einer kritischen Variable: ** Latenz ** Da die DNS-basierte Umleitung auf einem unkontrollierten Ökosystem zwischengeschalteter rekursiver Resolver beruht, die die Änderung bestätigen und weitergeben müssen, ist sie grundlegend unvereinbar mit den Anforderungen an unterbrechungsfreie Verfügbarkeit moderner Unternehmensdienste. 

### Das technische Szenario: DNS-Auflösung und der „feststeckende“ Client {#the-technical-scenario-dns-resolution-and-the-stuck-client}

In einer Standardnetzwerkkonfiguration dient der virtuelle Name ** ** (der DNS-Name) als lesbarer Einstiegspunkt für Benutzer. Damit Daten jedoch über das Netzwerk übertragen werden können, muss dieser Name in eine spezifische physische IP-Adresse ** ** aufgelöst werden. 

![ Diagramm zur DNS-Namensauflösung zur physischen IP-Adresse 1 in einem Hochverfügbarkeitscluster ](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 DNS-Auflösung und „feststeckende“ Clients auf der physischen IP-Adresse 1 in einem Hochverfügbarkeitscluster

#### Aktueller Status: Auflösung der physischen IP-Adresse 1 {#current-state-resolution-to-physical-ip-1}

Zunächst fragen Client 1 ( ** ** und Client 2 ** ** den virtuellen Namen beim DNS-System ab. Das System liefert die physische IP-Adresse ** und die Adresse ** . Anschließend stellen die Clients eine direkte Netzwerkverbindung (Socket) zu dieser spezifischen Hardwareadresse her. 

#### Die Failover-Herausforderung: Umleitung auf die physische IP-Adresse 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

Wenn der Server unter der physischen IP-Adresse 1 ausfällt, aktualisiert ein Administrator den DNS-Eintrag, sodass er auf die physische IP-Adresse 2 ** ** verweist. Für eine erfolgreiche Umleitung der Clients muss eine exakte Abfolge von Schritten eingehalten werden: 

  * Die Gültigkeitsdauer (TTL) ** ** muss auf allen zwischengeschalteten ISP- und Unternehmensresolvern ablaufen.
  * Der lokale DNS-Cache auf Client 1 und Client 2 muss geleert werden.
  * Die Anwendung muss ihre bestehende Socket-Verbindung schließen und eine _neue_ DNS-Abfrage initiieren.

Wird einer dieser Schritte ausgelassen, bleiben Client 1 und Client 2 im Zustand ** "festgefahren" ** versuchen, mit der nicht mehr existierenden physischen IP-Adresse 1 zu kommunizieren, was trotz der Aktualisierung der DNS-Einträge zu einem Ausfall des Dienstes führt. 

### Die zwei „Black Boxes“ der DNS-Umleitung {#the-two-black-boxes-of-dns-redirection}

  * ** Rekursives Caching: ** Viele Internetdienstanbieter (ISPs) und Firmen-DNS-Resolver ignorieren niedrige TTL-Einstellungen, um den Datenverkehr zu reduzieren, und speichern die "alte" physische IP 1 oft minuten- oder sogar stundenlang über das angeforderte Ablaufdatum hinaus.
  * ** Anwendungspersistenz: ** Moderne Anwendungen (wie Java-basierte Microservices oder Webbrowser) führen oft nur einmal beim Start eine DNS-Abfrage durch. Selbst wenn der DNS-Eintrag auf die physische IP-Adresse 2 aktualisiert wird, verwendet die Anwendung weiterhin die im internen Speicher gespeicherte ursprüngliche IP-Adresse.


### Schlussfolgerung {#conclusion}

DNS-Umleitung ist für Hochverfügbarkeit keine zuverlässige Lösung. Für ein sofortiges Failover innerhalb einer lokalen oder regionalen Umgebung ist eine softwaredefinierte virtuelle IP-Adresse (VIP) ** ** die einzige Möglichkeit, eine unterbrechungsfreie Verfügbarkeit zu gewährleisten. 

## Vergleich: Virtuelle IP-Implementierung, Latenz und Anwendungstransparenz {#vip-vs-dns-comparison}

** Technischer Vergleich von Virtual-IP-Umleitungsmethoden (VIP) und DNS-Umleitung für Hochverfügbarkeit und Notfallwiederherstellung. **

Umgebung & Anwendungsfall | Hochverfügbarkeitstyp | Umleitungsmechanismus | Netzwerklatenz | Anwendungstransparenz & IP-Lokalität  
---|---|---|---|---  
Primär/Backup (Hochverfügbarkeit) | Mirror Cluster | Gratuitous ARP / MAC Takeover | Sehr niedrig: Zeit zum Erkennen und Senden von Broadcast-GARP | Volle Transparenz: Virtuelle IP ist lokal auf dem aktiven Knoten. Client-IP bleibt erhalten.  
Lastverteilung (Aktiv/Aktiv) | `Farm` Cluster | Netzwerkfilter auf Kernel-Ebene / GARP | Sehr niedrig: Zeit zum Erkennen und Rekonfigurieren von Netzwerkfiltern | Volle Transparenz: Virtuelle IP ist auf allen Knoten lokal. Client-IP bleibt erhalten.  
Gleiches Subnetz / Erweitertes LAN (VLAN-Stretching) | Disaster Recovery (Remote-Rechenzentren) | Standard-IP-Aliasing / GARP | Niedrig: Abhängig von der Round-Trip-Time (RTT) des gestreckten VLANs | Volle Transparenz: Die virtuelle IP ist lokal auf den Knoten. Die Client-IP bleibt erhalten.  
Unterschiedliche Subnetze | Disaster Recovery (Remote-Rechenzentren/Cloud) | Externer Load Balancer | Mittel: Höhere Failover-Latenz aufgrund der Integritätsprüfungsintervalle des Load Balancers | ⚠️ Teilweise Transparenz: Verwendet SNAT/DNAT. Die virtuelle IP ist ** NICHT ** lokal auf den Knoten. Die Client-IP wird ** NICHT ** beibehalten. Die Anwendung muss dies unterstützen.  
DNS-Umleitung: Keine VIP | Notfallwiederherstellung (Remote-Rechenzentren) | DNS-Eintragsaktualisierung (Name/physische IP) | Hoch/Unvorhersehbar: Abhängig von der DNS-Gültigkeitsdauer (TTL) und dem Client-DNS-Caching. | ⚠️ Unzuverlässig: Client muss DNS neu auflösen. Meistens verwenden Clients weiterhin die beim Start aufgelöste, veraltete IP-Adresse und werden nach einem Failover nicht umgeleitet.  
  
## Konfigurieren einer virtuellen IP-Adresse für Netzwerklastausgleich und Hochverfügbarkeit {#virtual-ip-configuration-load-balancing-ha}


{{%  insert-safekit-farm-video-de  %}}
 

## Häufig gestellte Fragen zur virtuellen IP-Adresse (VIP) {#virtual-ip-faq}

### Virtuelle IP (VIP) & Netzwerk {#virtual-ip-vip--networking}

Was ist eine virtuelle IP-Adresse (VIP) und wie unterscheidet sie sich von einer physischen IP-Adresse?

Während eine physische IP-Adresse ** ** an eine bestimmte Netzwerkschnittstelle gebunden ist, ist eine virtuelle IP-Adresse (VIP) vom Typ ** ( ** ) eine „schwebende“ Adresse, die unabhängig von der Hardware ist. In einem Cluster SafeKit fungiert die VIP als permanenter Einstiegspunkt; fällt der primäre Server aus, migriert die VIP automatisch zu einem fehlerfreien sekundären Knoten, wodurch eine Neukonfiguration der Clients sichergestellt wird.

Benötige ich einen Hardware-Loadbalancer, um eine virtuelle IP-Adresse zu verwenden?

Nein. Die Hochverfügbarkeitssoftware ** SafeKit ** verwaltet die virtuelle IP-Adresse auf Softwareebene. In Architekturen innerhalb desselben Subnetzes nutzt sie IP-Aliasing ** ** und ** ARP (GARP) ** zur Umleitung des Datenverkehrs. Dadurch entfallen die Kosten und die Komplexität externer Hardware-Loadbalancer oder dedizierter Proxy-Server.

Was ist Gratuitous ARP (GARP) und wozu wird es verwendet?

** Gratuitous ARP (GARP) ** ist ein Netzwerk-Broadcast, der die ARP-Tabellen von Netzwerk-Switches und Routern aktualisiert. Im Falle eines Failovers sendet der neue primäre Server ein GARP-Paket, um bekannt zu geben, dass die virtuelle IP-Adresse ** ** nun seiner MAC-Adresse zugeordnet ist. Dies erzwingt eine sofortige Umleitung des Datenverkehrs im Netzwerk.

Kann ich einen DNS-Namen mit einer virtuellen IP-Adresse verknüpfen?

** Ja. ** Sie können einen DNS-Namen mit einer virtuellen IP-Adresse (VIP) verknüpfen ** indem Sie einen Standard-A-Record erstellen. Der Hauptvorteil besteht darin ** dass die Umleitung auf VIP-Ebene (über ARP oder Netzwerkumleitung) und nicht auf DNS-Ebene ** . ** Dadurch wird die Anwendungstransparenz gewährleistet ** da Verzögerungen durch DNS-Propagation und TTL-Ablauf vermieden werden. **

### Cloud & Erweiterte Architekturen {#cloud--advanced-architectures}

Wie funktioniert eine virtuelle IP in der Cloud ( AWS , Azure , GCP )?

In Cloud-Umgebungen mit eingeschränkter Layer-2-Funktionalität (ARP) integriert sich SafeKit in Cloud Load Balancer ( ** ) oder Cloud Load Balancer ( ** ) ( AWS ELB, Azure LB oder Google GCLB). SafeKit stellt eine Health-Check-URL ** ** , die von der Plattform überwacht wird, um den Datenverkehr mithilfe von SNAT/DNAT an den aktiven Knoten weiterzuleiten.

Ist ein erweitertes LAN für die Notfallwiederherstellung besser geeignet als ein Load Balancer?

** Ja ** . Für entfernte Rechenzentren ist ein erweitertes LAN (Stretched VLAN) ** oft überlegen ** da es die Anwendungstransparenz ** über ** ** ** Anwendung und ihre Clients weiterhin mit derselben Identität, wodurch der Übergang zwischen Rechenzentren nahtlos erfolgt.

Welche Einschränkungen bestehen bei DNS-Rerouting im Vergleich zu virtuellen IP-Adressen?

Die DNS-Umleitung ** ** ist durch die Gültigkeitsdauer (TTL, ** , TTL (Time to Live, ** )) und clientseitiges Caching eingeschränkt, was die Wiederherstellung um Stunden verzögern kann. Ein wesentlicher Nachteil besteht darin, dass Clients ** , die ihren DNS-Namen nicht erneut auflösen, in der Situation verharren ** und versuchen, eine Verbindung zum ausgefallenen Server herzustellen. Im Gegensatz dazu bietet eine virtuelle IP ** ** ein sofortiges Layer-2-Failover, das den gesamten Datenverkehr umgehend umleitet und so die Konnektivität unabhängig vom Status des clientseitigen DNS-Caches gewährleistet.

### Transparenz & Sicherheit {#transparency--security}

Warum ist eine lokale virtuelle IP-Adresse für die Anwendungstransparenz wichtig?

Eine lokale virtuelle IP-Adresse (VIP) ** ** gewährleistet die Anwendungstransparenz ** ** , indem sie der Software die Bindung an eine persistente VIP ermöglicht. SafeKit übernimmt die Umleitung auf Kernel-Ebene ** ** , sodass die Anwendung im Gegensatz zu DNAT-Lösungen, bei denen sich die gebundene IP-Adresse ändert, keine Auswirkungen von Cluster-Failovern bemerkt.

Bleibt die ursprüngliche IP-Adresse des Clients bei der Verwendung einer virtuellen IP-Adresse erhalten?

Ja. SafeKit umgeht die Quell-Netzwerkadressübersetzung (SNAT). Da die virtuelle IP-Adresse (VIP) lokal auf dem aktiven Server liegt, empfängt die Anwendung die ursprüngliche Client-IP-Adresse ** ** , was für Sicherheitsüberprüfungen, Sitzungspersistenz und die Einhaltung gesetzlicher Vorschriften entscheidend ist.


{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}