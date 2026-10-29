---
title: "Kubernetes K3s Hochverfügbarkeit: Synchrone 2-Knoten-Replikation & Failover"
canonical: "https://safekit.eviden.com/de/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/"
description: "Erreichen Sie hohe K3s-Verfügbarkeit auf zwei Knoten ohne externen Speicher oder etcd-Quorum. Erfahren Sie, wie SafeKit verlustfreie Replikation und automatisches Failover ermöglicht."
category: "solutions"
lang: "de"
topics: "Vereinfachte K3s-Hochverfügbarkeit: Warum SafeKit statt MetalLB und Longhorn?, Inhaltsverzeichnis, Wie implementiert die SafeKit -Software einen hochverfügbaren Kubernetes -K3s-Cluster?, Wie funktioniert der SafeKit mirror -Cluster mit Kubernetes K3S?, Einschränkungen der Hochverfügbarkeit SafeKit , Vergleich: SafeKit vs. Standard-K3s-Stack (MetalLB & Longhorn), Videoanleitung: Konfiguration eines SafeKit mirror Hochverfügbarkeitsclusters, 🔍 SafeKit Hochverfügbarkeits-Navigationszentrale"
---

# Kubernetes K3s Hochverfügbarkeit: Synchrone 2-Knoten-Replikation & Failover {#kubernetes-k3s-high-availability-2-node-synchronous-replication--failover}

## Vereinfachung der K3s HA: Warum SafeKit gegenüber MetalLB und Longhorn wählen? {#safekit-k3s-ha-introduction}

Der standardmäßige Open-Source-Stack (MetalLB + Longhorn) für K3s ist zwar leistungsstark für große Rechenzentren, führt aber zu übermäßiger Komplexität bei On-Premise-Standorten mit zwei Knoten. **SafeKit** vereinfacht die K3s-Umgebung, indem es eigenständige Netzwerk- und Speichertools durch eine einzige, konsolidierte HA-Engine ersetzt. 

### Warum sollte man SafeKit für 2-Knoten-K3s-Hochverfügbarkeit (HA) verwenden? {#why-use-safekit-for-2-node-k3s-high-availability-ha}

  * **Echte 2-Knoten-Hochverfügbarkeit:** SafeKit bietet volle Redundanz mit nur **2 Knoten** , wodurch die 3-Knoten-Anforderung für das _etcd_-Quorum entfällt.
  * **Null Datenverlust (RPO=0):** Ersetzt Block-Speicher mit hohem Overhead durch **Synchrone Byte-Replikation** für lokale SSD-Leistung.
  * **Flexibler Dateischutz:** SafeKit führt eine hostbasierte Replikation auf Dateiebene durch, die für die Anwendung vollständig transparent ist. Es schützt nicht nur Datenbanken, sondern alle zugehörigen Ordner und Daten. Sie können vorhandene Ordner genau dort replizieren, wo sie installiert sind, sogar auf der **Systemfestplatte** .
  * **Integrierte virtuelle IP (VIP):** Verwaltet die Cluster-IP nativ auf Kernel-Ebene, wodurch die Notwendigkeit separater **MetalLB** Konfigurationen entfällt.
  * **Automatisches Failover und Failback:** Löst bei einem Ausfall einen sofortigen Übergang zum sekundären Knoten aus; sobald der primäre Knoten wieder betriebsbereit ist, führt SafeKit ohne manuelles Eingreifen **eine automatische Datenresynchronisierung** durch.
  * **Ultra-Low Overhead:** SafeKit arbeitet ohne den hohen Verwaltungsaufwand von Storage-Pods (CSI/Longhorn) und Networking-Pods (CNI/MetalLB), der bei Standard-Stacks erforderlich ist, und gibt so wichtigen RAM und CPU für Ihre Anwendungen frei.
  * **IT Generalist Friendly:** Ersetzt komplexe **Infrastruktur-YAML** für Netzwerk und Speicher durch eine **einfache Web-GUI** und automatisierte Bereitstellungsskripte, sodass Sie sich nur auf Ihre Anwendungen konzentrieren können.


Architekturdiagramm ![ SafeKit für hochverfügbares 2-Knoten-K3s mit integrierter virtueller IP, Echtzeitreplikation und automatischem Failover. ](/wp-content/uploads/2026/02/safekit-mirror-k3s-1024.jpg "w:512")

 **Shared-Nothing-Hochverfügbarkeit (HA) für 2-Knoten-K3s-Cluster**  


<a class="btn-quick-install" href="/de/quick-install/safekit-quick-installation-guide-with-kubernetes/"> ⚡ Kurzanleitung zur Installation Kubernetes HA-Clusters > </a>
## Inhaltsverzeichnis {#toc}

  * Wie implementiert die Software [ auf einfache Weise einen hochverfügbaren K3s Kubernetes SafeKit ](#safekit-mirror-k3s-cluster)
  * Wie funktioniert der Cluster SafeKit mirror mit Kubernetes K3S ](#safekit-mirror-cluster) [
  * [ SafeKit Einschränkungen der Hochverfügbarkeit ](#safekit-ha-limitations)
  * [ -Vergleich: SafeKit vs. Standard K3s Stack (MetalLB & Longhorn) ](#safekit-k3s-ha-comparison)
  * [ Videoanleitung: Konfigurieren eines SafeKit Mirror HA-Clusters ](#videoguide-safekit-mirror-cluster)
  * [ 🔍 SafeKit Hochverfügbarer Navigationshub ](#hub)


## Wie implementiert die Software SafeKit auf einfache Weise einen hochverfügbaren K3s-Cluster Kubernetes ? {#safekit-mirror-k3s-cluster}

### Wie implementiere ich Hochverfügbarkeit für einen 2-Knoten-K3s-Cluster Kubernetes )? {#how-do-i-implement-high-availability-for-a-2-node-kubernetes-k3s-cluster}

Sie können Hochverfügbarkeit (HA) für einen 2-Knoten-K3s-Cluster vom Typ Kubernetes mithilfe von **SafeKit k3s.safe mirror module** implementieren. Diese Lösung ermöglicht die Bereitstellung einer redundanten Umgebung ohne externen NFS-Speicher, eine dedizierte externe Konfigurationsdatenbank oder spezielle Kubernetes Kenntnisse.

### Warum K3s für Edge- und IoT-Computing nutzen? {#why-use-k3s-for-edge-and-iot-computing}

[ K3s ](<https://k3s.io/>) ist die bevorzugte Kubernetes -Engine für **IoT und Edge Computing** da es sich um eine schlanke, zertifizierte Distribution handelt, die speziell für ressourcenbeschränkte Umgebungen entwickelt wurde. Sie vereinfacht den Betriebsaufwand von Standard- Kubernetes und gewährleistet gleichzeitig volle Kompatibilität.

### Was sind die wichtigsten Merkmale des Moduls k3s.safe mirror ? {#what-are-the-key-features-of-the-k3ssafe-mirror-module}

Das Modul k3s.safe bietet einen umfassenden HA-Stack für K3s durch die Implementierung von:

  * **Dual Active Nodes:** Läuft 2 aktive K3s-Master/Agenten gleichzeitig zum Hosten von Pods.
  * **Datenbankreplikation:** Echtzeitreplikation der MariaDB Konfigurationsdatenbank zwischen Knoten.
  * **Persistenter Speicher:** Replikation persistenter Volumes über einen integrierten NFS-Client Dynamic Provisioner (nfs-client).
  * **Netzwerkkontinuität:** Enthält eine virtuelle IP-Adresse für nahtlosen Clientzugriff.
  * **Automatisierte Wiederherstellung:** Volle Unterstützung für automatisches Failover und Failback.


### Welche Anwendungen und Umgebungen kann SafeKit neben K3s schützen? {#beyond-k3s-which-applications-and-environments-can-safekit-protect}

SafeKit ist eine vielseitige Hochverfügbarkeitslösung **für Windows und Linux** , die weit über den K3s-Cluster mirror hinausgeht. Sie ermöglicht **synchrone Echtzeitreplikation** und automatisches Failover für eine Vielzahl kritischer Workloads, darunter:

  * **Virtuelle und physische Umgebungen:** Vollständige Hyper-V- oder KVM-VM-Maschinen.
  * **Container-Orchestrierung:** Docker , Podman Umgebungen.
  * **Daten & Dienste:** Einzelne Dateiverzeichnisse, Dienste und verschiedene Datenbanken.
  * **Cloud-Infrastruktur:** Hohe Verfügbarkeit für Cloud-Anwendungen.


SafeKit bietet außerdem **<span class="notranslate farm-term" translate="no">Farm</span> Cluster** mit nativem **Netzwerk-Lastausgleich und Failover** für zustandslose Anwendungen wie **Webserver** .

💡 [ Die vollständige Liste der unterstützten HA-Lösungen finden Sie hier. ](</de/solutions/>)

### Wie erreicht SafeKit die K3s-Hochverfügbarkeit? {#safekit-k3s-architecture-table}

Architektur und Redundanzlogik **für einen 2-Knoten-K3s-Cluster mit SafeKit**

2-Knoten-K3s-Cluster | SafeKit PRIM (Primärer Knoten) | SafeKit SECOND (Sekundärer Knoten)  
---|---|---  
Die Workload-Ausführung erfolgt | Die K3s-Master- und Agentendienste sind aktiv und verwalten die Cluster-Orchestrierung sowie die Ausführung von Pods. Die K3s-Master- und Agentendienste | bleiben ebenfalls aktiv und gewährleisten parallele Verarbeitung und Hochverfügbarkeit.  
NFS-Speicher & PVs | • Hosts Virtual IP und NFS-Port <br> • Verwaltet aktive exportierte NFS-Freigaben <br> • Speichert K3s Persistent Volumes (PVs) | Synchrone Spiegelung: SafeKit repliziert alle persistenten Volumes in Echtzeit, um Datenverlust zu vermeiden.  
Konfigurationsdatenbank | • Hosts Virtual IP und MariaDB Port <br> • Verwaltet die aktive K3s-Konfigurationsdatenbank | Datenbankreplikation: Die Datenbank MariaDB wird synchron gespiegelt, um den Clusterstatus für ein Failover zu erhalten.  
  
Automatischer Failover-Mechanismus **:** Im Falle eines Ausfalls des primären Knotens migriert SafeKit automatisch die virtuellen IPs und Speicherdienste auf den sekundären Knoten und gewährleistet so einen unterbrechungsfreien Betrieb des K3s-Clusters.

## Wie funktioniert der Cluster SafeKit mirror mit Kubernetes K3S? {#safekit-mirror-cluster}

### Schritt 1: Byte-basierte Dateireplikation in einem Mirror Cluster {#step-1-byte-level-file-replication-in-a-mirror-cluster}

Diese Phase veranschaulicht die Hochverfügbarkeitsarchitektur zwischen **Server 1 (PRIM)** und **Server 2 (SECOND)** . Auf beiden Servern laufen die K3s-Master- und Agentenkomponenten, wie in der Architekturtabelle [ ](#safekit-k3s-architecture-table) definiert.


![ Dateireplikation auf Byte-Ebene in einem Kubernetes K3s mirror Cluster ](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


Aktuell sind die virtuelle IP (VIP) **,** persistente NFS-Speicher **, die persistenten NFS-Speicher** , **MariaDB und** nur auf Server 1 (PRIM) aktiv. Die K3s-Masterkomponenten beider Knoten synchronisieren sich, indem sie über die virtuelle IP und **Port MariaDB auf den Clusterstatus zugreifen. SafeKit implementiert ](</de/best-practises/synchronous-replication-vs-asynchronous-replication/>) [ MariaDB und persistenten NFS-Dateien und gewährleistet** im Fehlerfall einen Datenverlust von null (RPO = 0).

Die K3s-Master verteilen die Arbeitslast auf zwei (oder mehr) Knoten, indem sie direkt mit den K3s-Agenten kommunizieren. Externe Clients verbinden sich mit dem  
Der Cluster [ verfügt über **virtuelle IP-Adresse ](</de/best-practises/how-a-virtual-ip-address-works/>) auf dem PRIM-Knoten. Der K3s-Master leitet den Datenverkehr mithilfe der Standardmechanismen Kubernetes an die auf die Knoten verteilten Pods weiter. Ebenso greifen die Pods über die virtuelle IP-Adresse und den NFS-Port auf ihre persistenten Volumes (PVs)** auf dem PRIM-Server zu.

### Schritt 2: Automatisches Failover und Servicekontinuität {#step-2-automatic-failover-and-service-continuity}

Wenn Server 1 (PRIM) **ausfällt, übernimmt Server 2 (SECOND)** automatisch den Clusterbetrieb **um** Kontinuität zu gewährleisten.


![ Failover in einem Kubernetes K3S mirror Cluster ](/wp-content/uploads/2023/02/safekit-stop-alone-300.png "w:300")


SafeKit erkennt den Fehler und migriert sofort den Cluster. **Virtuelle IP-Adresse** zu Server 2. Anschließend wird der lokale Server hochgestuft. **MariaDB** Und **NFS-Dienste** in einen aktiven Zustand versetzt. Aufgrund der in Schritt 1 durchgeführten synchronen Replikation werden alle MariaDB Die Datenbanken und NFS Persistent Volume (PV)-Dateien sind auf Server 2 bereits auf dem neuesten Stand, sodass kein Datenverlust auftritt.

Da der Clusterstatus erhalten bleibt, wird der K3s-Master **auf Server 2** ) weiter ausgeführt. Er erkennt den Ausfall des Agenten auf Server 1 und plant die betroffenen Pods automatisch auf den verbleibenden aktiven K3s-Agenten neu ein. Die gesamte Ausfallzeit (RTO) entspricht der Summe aus dem Fehlererkennungsintervall (Standard: 30 Sekunden) und der Zeit, die die K3s-Komponenten zur Initialisierung auf dem sekundären Knoten benötigen.

Während Server 1 offline ist, laufen die Dienste MariaDB und NFS weiterhin auf Server 2 und schreiben Änderungen nur lokal.  


### Schritt 3: Failback und automatische Reintegration {#step-3-failback-and-automatic-reintegration}

**Ein Failback** tritt ein, wenn Server 1 nach Behebung des ursprünglichen Problems neu gestartet wird. SafeKit synchronisiert automatisch die Dateien MariaDB und NFS und aktualisiert dabei nur die Daten, die während der Ausfallzeit auf Server 2 geändert wurden. Dieser Reintegrationsprozess ist **unterbrechungsfrei** ; die Master- und Agentenkomponenten von K3s laufen auf Server 2 ohne Unterbrechung weiter. 


Automatische Resynchronisierung und Failback in einem K3s-Cluster ( ![ mirror ](/wp-content/uploads/2023/02/safekit-resynchro-alone-300.png "w:300")

 

SafeKit optimiert die Wiederherstellungszeit basierend auf der Art und Weise, wie der Server gestoppt wurde: 

  * **Sauberes Herunterfahren:** Wurde SafeKit auf Server 1 absichtlich beendet, werden nur die spezifischen geänderten Bereiche innerhalb der Dateien mithilfe von **Änderungsnachverfolgungs-Bitmaps** resynchronisiert. Dies gewährleistet eine extrem schnelle Reintegration. 
  * **Systemabsturz (z. B. Stromausfall):** Bei einem nicht ordnungsgemäßen Herunterfahren von Server 1 werden die Änderungsbitmaps aus Sicherheitsgründen umgangen. SafeKit synchronisiert stattdessen alle Dateien mit einem Änderungszeitstempel, der nach dem letzten festgelegten Synchronisierungspunkt liegt, und gewährleistet so **die vollständige Datenintegrität** . 


### Schritt 4: Wiederherstellung der Hochverfügbarkeit und Lastverteilung {#step-4-restoring-high-availability-and-load-distribution}

Nach der Reintegration kehrt der Cluster in den **vollständigen mirror -Modus** zurück und spiegelt damit den in Schritt 1 beschriebenen Zustand wider. Das System befindet sich wieder in einem hochverfügbaren Zustand: Die Dienste **MariaDB** und **NFS** bleiben auf Server 2 aktiv, während SafeKit die Echtzeitreplikation aller Dateiaktualisierungen zurück zu Server 1 durchführt. 


![ Rückkehr zum Normalbetrieb in einem Kubernetes K3s mirror Cluster ](/wp-content/uploads/2023/02/safekit-second-prim-300.png "w:300")

 

Der K3s-Master **der K3s** Agent **und der K3s-Agent** werden auf Server 1 automatisch neu gestartet. Der Scheduler Kubernetes erkennt Server 1 nun als fehlerfreien Knoten und kann mit der Neuplanung der Pods beginnen, um die Arbeitslast auf beide Server zu verteilen. 

Wenn der Administrator es vorzieht, dass die Dienste MariaDB und NFS auf Server 1 ausgeführt werden (wodurch die ursprüngliche PRIM-Rolle wiederhergestellt wird), kann ein **-Switchover** manuell über die Webkonsole zu einem geeigneten Zeitpunkt ausgelöst oder über die Konfigurationseinstellungen automatisiert werden. 

### Wie konfiguriert man einen SafeKit Mirror Cluster? {#safekit-mirror-cluster-configure}


![ SafeKit Webkonsole: Dashboard für die Konfiguration von Hochverfügbarkeit mit Anzeige von Heartbeat-Netzwerken, virtueller IP-Einrichtung und Echtzeit-Verzeichnisreplikation für einen mirror -Cluster. ](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


Die Webkonsole **SafeKit** bietet eine intuitive Benutzeroberfläche zur Orchestrierung von Hochverfügbarkeit für Ihre kritischen Anwendungen. In nur wenigen Schritten können Sie einen Cluster **SafeKit mirror** konfigurieren, um die Geschäftskontinuität sicherzustellen.

  * **Anwendungsausfall (Registerkarte „Makros“):** Definieren Sie die spezifischen Anwendungsdienste, die im Fehlerfall automatisch neu gestartet werden sollen.
  * **Heartbeat-Netzwerk(e):** Dedizierte Kommunikationspfade, die von den Clusterknoten verwendet werden, um den Zustand und die Verfügbarkeit der anderen Knoten kontinuierlich zu überwachen und Failover-Entscheidungen zu synchronisieren.
  * **Verwaltung virtueller IP-Adressen:** Virtuelle IP-Adresse (VIP) für die transparente Wiederverbindung von Clients nach einem Failover einrichten.
  * **Echtzeitreplikation:** Wählen Sie die kritischen Verzeichnisse für die hostbasierte, synchrone Replikation auf Byte-Ebene aus.
  * **-Prüfer:** Überwachen den Zustand der Anwendung und lösen eine automatische Wiederherstellung aus, wenn ein Prozessfehler erkannt wird.


Der Cluster SafeKit verfügt über einen dedizierten Split-Brain-Checker ](</de/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) [

### Wie überwacht man einen SafeKit mirror Cluster? {#safekit-mirror-cluster-monitoring}


![ SafeKit Webkonsole: Echtzeitüberwachung eines 2-Knoten-Clusters mirror mit Anzeige der Zustände PRIM und SECOND bei aktiver Datenreplikation. ](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


Die **Managementkonsole SafeKit** bietet eine einheitliche Ansicht Ihrer Hochverfügbarkeitsinfrastruktur. Administratoren können damit den **Betriebszustand** des Clusters überwachen und die Datensynchronisierung in Echtzeit verfolgen.

Bei einem 2-Knoten-Cluster vom Typ mirror werden die Rollen der einzelnen Server in der Konsole übersichtlich angezeigt:

  * **PRIM (Primär):** Der aktive Knoten, auf dem die Anwendung aktuell ausgeführt wird und der die virtuelle IP-Adresse verwaltet. Er führt Schreibvorgänge im lokalen Speicher und Echtzeitreplikation auf den sekundären Knoten durch.
  * **SECOND (Sekundär):** Der Standby-Knoten empfängt synchrone Byte-Updates. Er ist bereit, im Falle eines Ausfalls des Primärknotens sofort die Funktion zu übernehmen.
  * **ALONE Status:** Zeigt visuell an, wenn der Cluster auf einem einzelnen Knoten läuft (z. B. während Wartungsarbeiten oder nach einem Ausfall), was darauf hinweist, dass die Redundanz vorübergehend verloren geht.
  * **Resynchronisierungsfortschritt:** Wenn ein ausgefallener Knoten wiederhergestellt ist, ändert sich sein Status während der Datenreintegration im Hintergrund in Orange, um sicherzustellen, dass es während der Phase "Rückkehr zum Normalzustand" zu keinen Ausfallzeiten kommt.


Über einfache Statussymbole hinaus bietet die Benutzeroberfläche **eine One-Click-Failover-Orchestrierung** , mit der Sie die primäre Rolle für geplante Wartungsarbeiten manuell neu zuweisen und gleichzeitig die kontinuierliche Verfügbarkeit für Benutzeraktivitäten gewährleisten können.


{{%  insert-safekit-usage-de  %}}
 

## Vergleich: SafeKit vs. Standard K3s Stack (MetalLB & Longhorn) {#safekit-k3s-ha-comparison}

**-Vergleich: SafeKit vs. Standard Open-Source (MetalLB + Longhorn)**

Fähigkeit | SafeKit K3s.safe ) | MetalLB + Longhorn (Standard K8s)  
---|---|---  
Architektur | All-in-One: Integriertes Netzwerk, Replikation und Failover in einem einzigen Paket. | DIY (Do It Yourself) Stack: Mehrere unabhängige Pakete erforderlich (CNI, CSI, LoadBalancer).  
Hardware-Effizienz | Reine 2-Knoten-HA: Vollständige Redundanz ohne dritten „Zeugen“- oder Arbiter-Knoten. | 3-Knoten-Minimum: Benötigt typischerweise ungerade Zahlen für das Etcd-Quorum und die Speichersicherheit.  
Netzwerk (VIP) | Native: Virtuelle IP-Adresse wird auf Betriebssystemebene verwaltet; transparent für K3s. | Complex: Erfordert die Installation von MetalLB mit L2- oder BGP-Konfiguration unter Verwendung dedizierter Speaker-Pods, die CPU/RAM auf jedem Knoten beanspruchen.  
Speicheranforderungen | Byte-Ebene Synchron: Echtzeit-Dateireplikation vorhandener Verzeichnisse; funktioniert auf Standard-Systemfestplatten; Byte-Ebene-Dateireplikation mit minimalem CPU-/Netzwerk-Overhead. | Block-Ebene: Verteilter Blockspeicher (Longhorn) mit dedizierten Speichermodulen; höherer Ressourcenverbrauch.  
Failover-Intelligenz | Unabhängige Stabilität: SafeKit arbeitet außerhalb der Container-Laufzeitumgebung. Es überwacht Betriebssystem und Hardware direkt und gewährleistet so ein Failover, selbst wenn die Steuerungsebene Kubernetes oder die Container-Engine ausfällt. | Zirkuläre Abhängigkeit: Die Failover-Logik ist _innerhalb_ der Pods implementiert, die sie schützen soll. Wenn das Host-Betriebssystem oder die K3s-Engine ausfällt, frieren auch die Management-Pods (MetalLB/Longhorn) ein, was häufig eine manuelle Fehlerbehebung erfordert, um die Blockade zu lösen.  
Administration | (Vereinfacht): Verwaltung über eine zentrale Webkonsole; kein Kubernetes -Experte erforderlich. | (Spezialisiert): Erfordert fundierte Kenntnisse in YAML, Helm und den internen Kubernetes-Controllern.  
  
**Zusammenfassend lässt sich sagen** , dass ein standardmäßiger DIY-Stack (MetalLB + Longhorn) zwar Modularität für Kubernetes -Experten bietet, aber eine **zirkuläre Abhängigkeit** erzeugt. Dadurch sind die Speicher- und Netzwerktools anfällig für dieselben Knotenausfälle, die sie eigentlich beheben sollen. **SafeKit** durchbricht diesen Kreislauf, indem es als unabhängige Infrastrukturschicht fungiert. Es bietet eine robustere, hardwareunabhängige 2-Knoten-HA-Lösung, die auch dann funktionsfähig bleibt, wenn die Kubernetes -Engine oder das Host-Betriebssystem ausfällt. Dies gewährleistet die automatische Wiederherstellung und Datenintegrität ohne den hohen Ressourcenaufwand, das obligatorische Drei-Knoten-Quorum oder die Konfigurationskomplexität herkömmlicher verteilter Block-Speicher- und Netzwerk-Overlays.

## Videoanleitung: Konfigurieren eines SafeKit HA mirror Clusters {#videoguide-safekit-mirror-cluster}

### SafeKit Video: Clustering auf Anwendungsebene (8:47) {#demo-mirror-ha-cluster}

Dieses Video demonstriert die Hochverfügbarkeit von SafeKit für Microsoft SQL Server und bietet gleichzeitig einen hervorragenden Überblick darüber, wie die Lösung K3s-Umgebungen sichert. SafeKit funktioniert identisch für jede andere Datenbank oder geschäftskritische Anwendung.

### Video-Highlights {#video-highlights}

  1. 🎬 [ 2 Knoten mit SQL Server ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. 🎬 [ Cluster und Modul mirror.safe konfigurieren ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. 🎬 [ Starten und Testen der SQL-Replikation, Migration und des Failovers bei einem Absturz ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)


<br /> 


{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}