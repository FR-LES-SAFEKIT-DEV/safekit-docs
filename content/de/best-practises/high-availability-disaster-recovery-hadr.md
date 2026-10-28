---
title: "Kombination von SafeKit Hochverfügbarkeit mit Disaster-Recovery-Backups"
canonical: "https://safekit.eviden.com/de/best-practises/high-availability-disaster-recovery-hadr/"
description: "Entwickeln Sie eine robuste HA/DR-Strategie, indem Sie SafeKit für die synchrone Replikation (RPO=0) mit asynchroner Datensicherung für die externe Notfallwiederherstellung kombinieren. Gewährleisten Sie mit diesem zweischichtigen Ansatz die ständige Verfügbarkeit Ihrer Anwendungen und die Datenintegrität auf Windows und Linux ."
category: "best-practises"
lang: "de"
topics: "Synchrone SafeKit -Replikation für Hochverfügbarkeit vs. asynchrone Backup-Replikation für Disaster Recovery, Inhaltsverzeichnis, Synchrones HADR: Datenverlustfreier Betrieb in schnellen Netzwerken (LAN/VLAN), Asynchrones HADR: Disaster Recovery in langsamen Netzwerken (WAN), Kombination von HADR und Backup für maximale Systemausfallsicherheit, Vergleich von HADR-Architekturen: Schnelle vs. langsame Netzwerke, Videoanleitung: Implementierung von HADR mit SafeKit , 🔍 SafeKit Hochverfügbarkeits-Navigationszentrale"
---

# Kombination von SafeKit Hochverfügbarkeit mit Disaster-Recovery-Backups {#combining-safekit-high-availability-with-disaster-recovery-backups}

## Synchrone Replikation SafeKit für Hochverfügbarkeit vs. asynchrone Backup-Replikation für Disaster Recovery {#synchronous-safekit-replication-for-ha-vs-asynchronous-backup-replication-for-dr}

SafeKit bietet eine flexible, softwarebasierte **-Architektur (Hochverfügbarkeit und Disaster Recovery)** die teuren gemeinsam genutzten Speicher überflüssig macht. Durch die Implementierung **synchronen Replikation über ein gestrecktes VLAN zwischen Server 1 und Server 2 stellt** sicher SafeKit dass Ihre kritischen Anwendungen an zwei redundanten Standorten stets verfügbar und konsistent sind.

Um den Einschränkungen von WANs mit geringerer Bandbreite zu begegnen, ist SafeKit für die Kombination mit **Backup- und Wiederherstellungslösungen** konzipiert. Dies ermöglicht Unternehmen eine kontinuierliche Verfügbarkeit (24/7) durch automatisches Failover und sichert gleichzeitig historische Daten für die externe Notfallwiederherstellung.

Folglich ist die Umgebung durch SafeKit vor Hardware- oder Softwarefehlern geschützt und durch die Backup-Lösung vor logischen Fehlern und Cyberbedrohungen wie Ransomware gesichert.


![ Ein technisches Diagramm, das veranschaulicht, warum Hochverfügbarkeit ( SafeKit ) und Backups komplementär sind: SafeKit übernimmt Hardware-/Software-Failover mittels synchroner Replikation, während asynchrone Backups vor Ransomware und logischen Fehlern schützen. ](/wp-content/uploads/2026/01/safekit-backup-3-nodes-5-1024.jpg "w:512")

**HA vs Backup: Kombination von synchroner Replikation SafeKit mit asynchroner Notfallwiederherstellung**

## Inhaltsverzeichnis {#table-of-contents}

  * [ Synchrones HADR: Null Datenverlust in schnellen Netzwerken (LAN/VLAN) ](#synchronous-hadr-fast-network)
  * [ Asynchrones HADR: Notfallwiederherstellung über langsame Netzwerke (WAN) ](#asynchronous-hadr-slow-network)
  * [ Wie man HADR und Backup für vollständige Systemausfallsicherheit kombiniert ](#hadr-resilience-strategy)
  * [ Vergleich von HADR-Architekturen: Schnelle vs. langsame Netzwerke ](#hadr-architectures-comparison)
  * [ Videoanleitung: Implementierung von HADR mit SafeKit ](#videoguide-hadr-safekit)
  * [ 🔍 SafeKit Hochverfügbarer Navigationshub ](#hub)



{{%  insert-safekit-4-buttons-de  %}}
 

## Synchrones HADR: Null Datenverlust in schnellen Netzwerken (LAN/VLAN) {#synchronous-hadr-fast-network}

### Wie lässt sich HADR über ein schnelles Netzwerk implementieren? {#hadr-fast-network-architecture}


![ -Architektur, die Hochverfügbarkeit und Notfallwiederherstellung (HADR) ohne gemeinsam genutzte Festplatten kombiniert ](/wp-content/uploads/2023/02/remote-datacenters.png "w:256")


Um HADR über ein schnelles Netzwerk zu implementieren, werden zwei Knoten an entfernten Standorten eingesetzt, um gleichzeitig Hochverfügbarkeit und Disaster Recovery zu gewährleisten. Diese Konfiguration stellt sicher, dass Ihre Anwendung auch bei Ausfall eines gesamten Standorts verfügbar bleibt, ohne die Komplexität einer gemeinsam genutzten Speicherinfrastruktur.

### Warum eine SAN-lose HADR-Lösung für schnelle Netzwerke verwenden? {#sanless-hadr-solution}

Eine SAN-lose Lösung wie SafeKit ist unerlässlich, da sie Daten synchron und in Echtzeit zwischen zwei Knoten ohne gemeinsam genutzte Festplatten repliziert. Da die synchrone Replikation Datenverlustfreiheit (RPO=0) gewährleistet, kann die Software bei einem Hardware- oder Softwarefehler sofort ein automatisches Anwendungs-Failover auslösen.

### Welche Netzwerkanforderungen gelten für synchrones HADR? {#extended-lan-vlan-requirements}

Synchrones HADR erfordert aus drei entscheidenden Gründen ein erweitertes LAN oder ein gestrecktes VLAN:

  * **Virtuelles IP-Failover:** Für das automatische Failover der virtuellen IP-Adresse [ ](</de/best-practises/how-a-virtual-ip-address-works/>) zwischen den Knoten ist ein einzelnes Subnetz erforderlich.
  * **Niedrige Latenz:** [ Synchrone Replikation ](</de/best-practises/synchronous-replication-vs-asynchronous-replication/>) ohne Datenverlust erfordert typischerweise eine Netzwerk-Roundtrip-Zeit von weniger als 5 ms.
  * **Hohe Bandbreite:** Um eine schnelle Datenresynchronisierung während eines Failbacks zu gewährleisten, ist eine Verbindung mit 1 Gbit/s oder mehr erforderlich.


## Asynchrones HADR: Notfallwiederherstellung über langsame Netzwerke (WAN) {#asynchronous-hadr-slow-network}

### Wie lässt sich HADR über ein langsames Netzwerk implementieren? {#hadr-slow-network-architecture}


![ HADR-Architektur trennt Hochverfügbarkeit von Notfallwiederherstellung ](/wp-content/uploads/2023/03/hadr-slow-network-1.png "w:256")


Um HADR über ein langsames Netzwerk (WAN) zu implementieren, trennt die Architektur typischerweise **Hochverfügbarkeit** von **Notfallwiederherstellung** . In diesem Szenario werden zwei Knoten am primären Standort für lokale Redundanz bereitgestellt, während eine separate Backup- oder asynchrone Replikationsstrategie zum Schutz der Daten an einem entfernten Remote-Standort verwendet wird.

### Welche HADR-Lösung eignet sich am besten für Verbindungen mit geringer Bandbreite? {#sanless-ha-with-remote-dr}

Die optimale Lösung besteht darin, **SafeKit** am primären Standort für lokale Hochverfügbarkeit mittels synchroner Echtzeitreplikation und automatischem Failover einzusetzen. Am Disaster-Recovery-Standort werden die Daten durch asynchrone Replikation oder geplante Backups über das langsame Netzwerk geschützt, um die lokale Verfügbarkeit ohne Engpässe durch WAN-Latenz zu gewährleisten. Um diese Architektur zu realisieren, ist eine dedizierte Backup-Lösung **(außer SafeKit ) erforderlich** die den Datentransfer und die Wiederherstellung am Remote-Standort verwaltet. 

### Wie funktioniert Failover mit einem entfernten Disaster-Recovery-Standort? {#dr-site-failover-process}

Da die asynchrone Replikation über ein langsames Netzwerk potenziell zu Datenverlusten führt (RPO > 0), erfolgt das Failover auf einen Disaster-Recovery-Standort in der Regel manuell und wird von einem Administrator verwaltet:

  * **Datenwiederherstellung:** Backups werden auf sekundären Servern am DR-Standort wiederhergestellt. Moderne Lösungen wie **Veeam** werden häufig eingesetzt, um virtuelle Maschinen (VMs) schnell wiederherzustellen und so die Wiederherstellungszeit zu verkürzen.
  * DNS-Umleitung **: Der Datenverkehr** wird auf DNS-Ebene zum DR-Standort umgeleitet. Die Wiederherstellungszeit hängt von den DNS-Cache-Timeouts (TTL) ab, und einige Clientanwendungen müssen möglicherweise neu gestartet werden, um die neue IP-Adresse zu beziehen.
  * **Manuelle Entscheidung:** Ein Administrator muss die Datenintegrität am Remote-Standort überprüfen, bevor er den Wechsel zum sekundären Rechenzentrum autorisiert.


## Wie man HADR und Backup für vollständige Systemausfallsicherheit kombiniert {#hadr-resilience-strategy}

### Vergleich von Hochverfügbarkeit und Datensicherung {#ha-vs-backup-comparison}


![ SafeKit Logo für hochverfügbare Software ](/wp-content/uploads/2026/04/safekit-icon-512x512-1.png "w:64")

 

![ Symbol für Datensicherungsstrategie ](/wp-content/uploads/2026/01/backup-icon.png "w:64")


Obwohl beide für den Datenschutz unerlässlich sind, zielen **High Availability (HA)** und **Backup Solutions** auf unterschiedliche Risiken ab. Die Hochverfügbarkeitslösung **High Availability** , unterstützt durch SafeKit , bietet einen Live-Failover-Mechanismus, um die Verfügbarkeit von Anwendungen bei Serverausfällen oder Hardwaredefekten zu gewährleisten. Die Backup-Lösung **Backup Solution** hingegen dient als historisches Archiv. Während HA durch die Echtzeit-Replikation von Daten eine Systemverfügbarkeit von 99,99 % sicherstellt, konzentriert sich Backup auf die Datenintegrität und bietet die notwendigen Wiederherstellungspunkte, um logische Fehler, versehentliches Löschen oder Ransomware-Angriffe zu beheben.

### Ist Hochverfügbarkeit ein Ersatz für eine Backup-Strategie? {#ha-vs-backup-ransomware}

Nein, Hochverfügbarkeit und Backups ergänzen sich, sind aber nicht austauschbar. **SafeKit** gewährleistet zwar **die Geschäftskontinuität** , indem es Anwendungen bei einem Hardwareausfall am Laufen hält, schützt aber nicht vor logischen Fehlern, versehentlichem Löschen oder Ransomware-Angriffen. Da die Echtzeitreplikation beispielsweise jede Änderung sofort spiegelt, wird ein Ransomware-Angriff auf den primären Knoten umgehend auf den sekundären Knoten übertragen. Um sich von solchen Cyberbedrohungen oder versehentlichem Löschen zu erholen, benötigen Sie eine dedizierte **Backup-Lösung** mit einer robusten Aufbewahrungsrichtlinie. Diese ermöglicht es Ihnen, Ihre Umgebung auf einen fehlerfreien Zustand vor dem Schadensereignis zurückzusetzen.

### Optimierung von RTO und RPO: Die Synergie zwischen HA und Backup {#ha-backup-rpo-rto}

Um eine wirklich ausfallsichere Infrastruktur aufzubauen, müssen Sie Hochverfügbarkeit und Datensicherung in eine einheitliche Strategie integrieren. Diese beiden Technologien adressieren unterschiedliche Dimensionen der Gleichung [ RTO (Recovery Time Objective) und RPO (Recovery Point Objective) ](</de/best-practises/what-is-rpo-and-rto-with-examples/>) : 

  * **Hochverfügbarkeit (über SafeKit ):** Ziele **Sofortige Wiederherstellung** . Durch die Aufrechterhaltung einer Live-Synchronisierung Ihrer Umgebung mirror ) erreicht SafeKit nahezu null RTO und null RPO. Fällt ein Server aus, wird die Anwendung sofort auf dem sekundären Knoten fortgesetzt, wodurch Serviceunterbrechungen und Datenverluste während des Übergangs vermieden werden.
  * **Backup-Lösungen:** Ziel **Datensicherheit** . Während HA den Dienst aktiv hält, erstellt das Backup eine unveränderliche Historie. Es dient als Ausweichlösung, falls die Live-Daten selbst beschädigt werden. So können Sie eine saubere Version Ihrer Datenbank von einem bestimmten Zeitpunkt vor einem Virusbefall oder versehentlichem Löschen wiederherstellen.


## Vergleich von HADR-Architekturen: Schnelle vs. langsame Netzwerke {#hadr-architectures-comparison}

Kriterien | Schnelles Netzwerk (LAN/VLAN) | Langsames Netzwerk (WAN)  
---|---|---  
Primärer Anwendungsbereich | Lokale Redundanz und Hochverfügbarkeit | Standortübergreifende Notfallwiederherstellung  
Anwendungsfall | Gleiches Rechenzentrum oder Campus | Remote-Rechenzentren oder Cloud-Regionen  
Replikationstyp | Synchron (Echtzeit) | Asynchron / Backup  
RPO (Datenverlust) | Null (RPO = 0) | Potenzieller Datenverlust (RPO > 0)  
Failover-Prozess | Automatisch | Manuell (Administrative Entscheidung)  
Datenverkehrsumleitung | Virtuelle IP-Adresse (VIP) | DNS-Ebene (TTL-abhängig)  
Latenzanforderung | Niedrig (typischerweise < 5 ms) | Unterstützt hohe Latenz  
Primäres Wiederherstellungsziel | Sofortige Geschäftskontinuität | Datensicherheit und -aufbewahrung  
  
## Videoanleitung: Implementierung von HADR mit SafeKit {#videoguide-hadr-safekit}

###  Implementierung von HADR mit SafeKit : Synchrone Replikation & Failover {#how-to-implement-hadr-with-safekit-synchronous-replication--failover}

Erfahren Sie, wie Sie **Hochverfügbarkeit (HA)** und **Disaster Recovery (DR)** mit SafeKit in einer einzigen HADR-Strategie kombinieren. Diese Videoanleitung erläutert die Architektur, die für eine 100%ige Anwendungsverfügbarkeit ohne gemeinsam genutzte Festplatten erforderlich ist.

### Video-Highlights {#video-highlights}

  1. 🎬 [ Einführung in SafeKit HADR über Stretched VLANs ](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=0s>) (1:06)
  2. 🎬 [ Wie synchrones Spiegeln und doppelte Bestätigung funktionieren (1:41) ](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=65s>)
  3. 🎬 [ Failover-Mechanismen: Gratuitous ARP (GARP) & Virtuelle IP ](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=166s>) (2:10)
  4. 🎬 [ Design für langsame WANs: HA- vs. Backup-Strategien ](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=296s>) (2:45)


### SafeKit Video: Implementierung von Hochverfügbarkeit und Notfallwiederherstellung (HADR) mit SafeKit (7:40) {#safekit-video-how-to-implement-high-availability-and-disaster-recovery-hadr-with-safekit-740}

<br /> 


{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}