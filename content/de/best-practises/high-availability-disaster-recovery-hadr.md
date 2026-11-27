---
title: "Kombination von SafeKit-Hochverfügbarkeit mit Disaster-Recovery-Backups"
canonical: "https://safekit.eviden.com/de/best-practises/high-availability-disaster-recovery-hadr/"
description: "Kombinieren Sie SafeKit-Hochverfügbarkeit (synchrone Replikation, RPO 0) mit asynchronen Backups für externes Disaster Recovery unter Windows und Linux."
category: "best-practises"
lang: "de"
topics: "Synchrone SafeKit-Replikation für Hochverfügbarkeit (HA) vs. asynchrone Backup-Replikation für Notfallwiederherstellung (DR), Inhaltsverzeichnis, Synchrones HADR: Null Datenverlust über schnelle Netzwerke (LAN/VLAN), Asynchrones HADR: Disaster Recovery über langsame Netzwerke (WAN), HADR und Backup für vollständige Systemresilienz kombinieren, Vergleich von HADR-Architekturen: Schnelle vs. langsame Netzwerke, Videoanleitung: Implementierung von HADR mit SafeKit"
hashpart: "synchronous-safekit-replication-for-ha-vs-asynchronous-backup-replication-for-dr, table-of-contents, synchronous-hadr-fast-network, asynchronous-hadr-slow-network, hadr-resilience-strategy, hadr-architectures-comparison, videoguide-hadr-safekit"
translation: "translate_md 2026-11-19.2 | glossaire 2026-11-19.28 | Translation LLM | 54 expressions"
image: "/wp-content/uploads/2026/01/safekit-backup-3-nodes-5-1024.jpg"
schemaType: "TechArticle"
---

# Kombination von SafeKit-Hochverfügbarkeit mit Disaster-Recovery-Backups {#combining-safekit-high-availability-with-disaster-recovery-backups}

## Synchrone SafeKit-Replikation für Hochverfügbarkeit (HA) vs. asynchrone Backup-Replikation für Notfallwiederherstellung (DR) {#synchronous-safekit-replication-for-ha-vs-asynchronous-backup-replication-for-dr}

SafeKit bietet eine flexible, softwarebasierte **Architektur für Hochverfügbarkeit und Notfallwiederherstellung (HADR)**, die die Notwendigkeit eines teuren Shared Storage eliminiert. Durch die Implementierung **synchroner Replikation** über ein Stretched VLAN zwischen Server 1 und Server 2 stellt SafeKit sicher, dass Ihre kritischen Anwendungen zwischen zwei redundanten Standorten „live“ und konsistent bleiben.

Um die Einschränkungen von WANs mit geringerer Bandbreite zu beheben, ist SafeKit für die Kombination mit **Backup- und Wiederherstellungslösungen** konzipiert. Dies ermöglicht es Unternehmen, eine 24/7-Verfügbarkeit durch automatisches Failover aufrechtzuerhalten und gleichzeitig historische Daten für die externe Notfallwiederherstellung zu sichern.

Folglich wird die Umgebung durch SafeKit vor Hardware- oder Softwarefehlern geschützt und durch die Backup-Lösung vor logischen Fehlern und Cyber-Bedrohungen wie Ransomware gesichert.


![Ein technisches Diagramm, das zeigt, warum Hochverfügbarkeit (SafeKit) und Backups sich ergänzen: SafeKit übernimmt das Hardware-/Software-Failover über synchrone Replikation, während asynchrone Backups vor Ransomware und logischen Fehlern schützen.](/wp-content/uploads/2026/01/safekit-backup-3-nodes-5-1024.jpg "w:512")

**Hochverfügbarkeit mit SafeKit und Notfallwiederherstellung mit Backups**

## Inhaltsverzeichnis {#table-of-contents}

  * [Synchrones HADR: Null Datenverlust über schnelle Netzwerke (LAN/VLAN)](#synchronous-hadr-fast-network)
  * [Asynchrones HADR: Disaster Recovery über langsame Netzwerke (WAN)](#asynchronous-hadr-slow-network)
  * [HADR und Backup für vollständige Systemresilienz kombinieren](#hadr-resilience-strategy)
  * [Vergleich von HADR-Architekturen: Schnelle vs. langsame Netzwerke](#hadr-architectures-comparison)
  * [Videoanleitung: Implementierung von HADR mit SafeKit](#videoguide-hadr-safekit)
  * [🔍 SafeKit entdecken](#hub)



{{%  insert-safekit-4-buttons-de  %}}
 

## Synchrones HADR: Null Datenverlust über schnelle Netzwerke (LAN/VLAN) {#synchronous-hadr-fast-network}

### Wie implementiert man HADR über ein schnelles Netzwerk? {#hadr-fast-network-architecture}


![Architektur, die Hochverfügbarkeit und Disaster Recovery (HADR) ohne gemeinsam genutzte Datenträger kombiniert](/wp-content/uploads/2023/02/remote-datacenters.png "w:256")


Um HADR über ein schnelles Netzwerk zu implementieren, stellen Sie zwei Knoten an entfernten Standorten bereit, um gleichzeitig Hochverfügbarkeit und Disaster Recovery zu gewährleisten. Diese Konfiguration stellt sicher, dass Ihre Anwendung auch dann verfügbar bleibt, wenn ein ganzer Standort ausfällt, ohne die Komplexität einer gemeinsam genutzten Speicherinfrastruktur.

### Warum eine SANless-HADR-Lösung für schnelle Netzwerke verwenden? {#sanless-hadr-solution}

Eine SANless-Lösung wie SafeKit ist unerlässlich, da sie Daten synchron und in Echtzeit zwischen zwei Knoten ohne gemeinsam genutzte Festplatten repliziert. Da die synchrone Replikation einen Datenverlust von null (RPO = 0) gewährleistet, kann die Software bei einem Hardware- oder Softwarefehler sofort ein automatisches Anwendungs-Failover auslösen.

### Welche Netzwerkanforderungen gelten für synchrone HADR? {#extended-lan-vlan-requirements}

Synchrones HADR erfordert aus drei entscheidenden Gründen ein erweitertes LAN oder ein Stretched VLAN:

  * **Virtuelles IP-Failover:** Es wird ein einzelnes Subnetz benötigt. Die [virtuelle IP-Adresse](</de/best-practises/how-a-virtual-ip-address-works/>) kann dann automatisch zwischen den Knoten wechseln.
  * **Geringe Latenz:** [Die synchrone Replikation](</de/best-practises/synchronous-replication-vs-asynchronous-replication/>) ohne Datenverlust erfordert in der Regel eine Netzwerk-Round-Trip-Zeit von weniger als 5 ms.
  * **Hohe Bandbreite:** Für eine schnelle Datensynchronisierung während eines Failback ist eine Verbindung von 1 Gbit/s oder mehr erforderlich.


## Asynchrones HADR: Disaster Recovery über langsame Netzwerke (WAN) {#asynchronous-hadr-slow-network}

### Wie implementiert man HADR über ein langsames Netzwerk? {#hadr-slow-network-architecture}


![HADR-Architektur, die Hochverfügbarkeit von Disaster Recovery trennt](/wp-content/uploads/2023/03/hadr-slow-network-1.png "w:256")


Um HADR über ein langsames Netzwerk (WAN) zu implementieren, trennt die Architektur typischerweise **Hochverfügbarkeit** von **Disaster Recovery**. In diesem Szenario werden zwei Knoten am primären Standort für lokale Redundanz bereitgestellt, während eine separate Sicherungs- oder asynchrone Replikationsstrategie verwendet wird, um Daten an einem entfernten Standort zu schützen.

### Was ist die beste HADR-Lösung für Verbindungen mit geringer Bandbreite? {#sanless-ha-with-remote-dr}

Die optimale Lösung besteht darin, **SafeKit** am primären Standort für lokale Hochverfügbarkeit mittels synchroner Echtzeitreplikation und automatischem Failover einzusetzen. Für den Disaster-Recovery-Standort werden die Daten über asynchrone Replikation oder geplante Backups über das langsame Netzwerk geschützt, wodurch sichergestellt wird, dass die lokale Betriebszeit aufrechterhalten wird, ohne durch die WAN-Latenz zum Engpass zu werden. Um diese Architektur zu erreichen, ist eine dedizierte **Backup-Lösung** (außer SafeKit) erforderlich, um die Datenübertragung und -wiederherstellung am Remote-Standort zu verwalten. 

### Wie funktioniert das Failover mit einem externen Disaster-Recovery-Standort? {#dr-site-failover-process}

Da die asynchrone Replikation über ein langsames Netzwerk einen potenziellen Datenverlust (RPO > 0) beinhaltet, ist der Failover-Prozess zu einem Disaster-Recovery-Standort in der Regel manuell und wird von einem Administrator verwaltet:

  * **Datenwiederherstellung:** Backups werden auf sekundären Servern am DR-Standort wiederhergestellt. Moderne Lösungen stellen virtuelle Maschinen (VMs) schnell wieder her, um die Wiederherstellungszeit zu verkürzen. Ein Beispiel hierfür ist **Veeam**.
  * **DNS-Umleitung:** Der Datenverkehr wird auf DNS-Ebene an die DR-Site umgeleitet. Die Wiederherstellungszeit hängt von den DNS-Cache-Timeouts (TTL) ab, und einige Clientanwendungen müssen möglicherweise neu gestartet werden, um die neue IP-Adresse zu übernehmen.
  * **Manuelle Entscheidung:** Ein Administrator muss die Datenintegrität am Remote-Standort überprüfen, bevor er die Umschaltung auf das sekundäre Rechenzentrum autorisiert.


## HADR und Backup für vollständige Systemresilienz kombinieren {#hadr-resilience-strategy}

### Vergleich von Hochverfügbarkeit und Datensicherung {#ha-vs-backup-comparison}


![Logo der Hochverfügbarkeitssoftware SafeKit](/wp-content/uploads/2026/04/safekit-icon-512x512-1.png "w:64")

 

![Symbol für die Datensicherungsstrategie](/wp-content/uploads/2026/01/backup-icon.png "w:64")


Obwohl beide für den Datenschutz entscheidend sind, zielen **Hochverfügbarkeits- (HA)** und **Backup-Lösungen** auf unterschiedliche Risiken ab. **Hochverfügbarkeit**, unterstützt durch SafeKit, bietet einen „Live“-Failover-Mechanismus, um Anwendungen bei Serverausfällen oder Hardwarefehlern zugänglich zu halten. Im Gegensatz dazu fungiert eine **Backup-Lösung** als „historisches“ Archiv. Während HA eine Systemverfügbarkeit von 99,99 % durch die Replikation von Daten in Echtzeit gewährleistet, konzentriert sich das Backup auf die Datenintegrität und bietet die notwendigen Wiederherstellungspunkte, um sich von logischen Fehlern, versehentlichen Löschungen oder Ransomware-Angriffen zu erholen.

### Ist Hochverfügbarkeit ein Ersatz für eine Backup-Strategie? {#ha-vs-backup-ransomware}

Nein, Hochverfügbarkeit und Backups sind komplementär, nicht austauschbar. Während **SafeKit** **die Geschäftskontinuität** gewährleistet, indem es Anwendungen bei einem Hardwareabsturz weiterlaufen lässt, schützt es nicht vor logischen Fehlern, versehentlichen Löschungen oder Ransomware-Angriffen. Da die Echtzeitreplikation beispielsweise jede Änderung sofort spiegelt, wird ein Ransomware-Angriff auf den primären Knoten sofort auf den sekundären Knoten dupliziert. Um sich von solchen Cyberbedrohungen oder versehentlichen Löschungen zu erholen, benötigen Sie eine dedizierte **Backup-Lösung** mit einer robusten Aufbewahrungsrichtlinie. Dies ermöglicht es Ihnen, Ihre Umgebung auf einen fehlerfreien Zustand von vor der Beschädigung „zurückzuspulen“.

### RTO und RPO Optimierung: Die Synergie zwischen Hochverfügbarkeit und Backup {#ha-backup-rpo-rto}

Um eine wirklich ausfallsichere Infrastruktur aufzubauen, müssen Sie sowohl Hochverfügbarkeit als auch Backup in eine einheitliche Strategie integrieren. Diese beiden Technologien befassen sich mit verschiedenen Dimensionen des Wiederherstellungszeitpunkts (RTO) und des Wiederherstellungspunkts (RPO). Weitere Informationen finden Sie unter [RTO und RPO mit Beispielen](</de/best-practises/what-is-rpo-and-rto-with-examples/>).

  * **Hochverfügbarkeit (über SafeKit):** Das Ziel ist **die sofortige Wiederherstellung**. SafeKit verwaltet eine Live-Synchronkopie Ihrer Umgebung. Die RTO liegt nahe bei Null. Die RPO ist Null. Wenn ein Server ausfällt, wird die Anwendung sofort auf dem sekundären Knoten fortgesetzt, wodurch sichergestellt wird, dass es während des Übergangs zu keiner Dienstunterbrechung oder Datenverlust kommt.
  * **Backup-Lösungen:** Ihr Ziel ist **die Datenresilienz**. Während HA den Dienst „am Laufen“ hält, erstellt ein Backup eine „unveränderliche“ Historie. Ein Backup ist Ihr Sicherheitsnetz, wenn die Live-Daten selbst kompromittiert werden. Es ermöglicht Ihnen, eine saubere Version Ihrer Datenbank von einem bestimmten Zeitpunkt wiederherzustellen, bevor ein Virus oder eine versehentliche Löschung aufgetreten ist.


## Vergleich von HADR-Architekturen: Schnelle vs. langsame Netzwerke {#hadr-architectures-comparison}

Kriterien | Schnelles Netzwerk (LAN/VLAN) | Langsames Netzwerk (WAN)  
---|---|---  
Primärer Geltungsbereich | Lokale Redundanz und Hochverfügbarkeit | Standortübergreifende Notfallwiederherstellung  
Anwendungsfall | Dasselbe Rechenzentrum oder derselbe Campus | Remote-Rechenzentren oder Cloud-Regionen  
Replikationstyp | Synchron (Echtzeit) | Asynchron / Backup  
RPO (Datenverlust) | Null (RPO = 0) | Potenzieller Datenverlust (RPO > 0)  
Failover-Prozess | Automatisch | Manuell (Entscheidung Admin)  
Verkehrsumleitung | Virtuelle IP-Adresse (VIP) | DNS-Ebene (TTL-abhängig)  
Latenzanforderung | Niedrig (typischerweise < 5 ms) | Unterstützt hohe Latenz  
Primäres Wiederherstellungsziel | Sofortige Geschäftskontinuität | Datensicherheit und -aufbewahrung  
  
## Videoanleitung: Implementierung von HADR mit SafeKit {#videoguide-hadr-safekit}

###  HADR mit SafeKit implementieren: synchrone Replikation und Failover {#how-to-implement-hadr-with-safekit-synchronous-replication--failover}

Erfahren Sie, wie Sie **Hochverfügbarkeit (HA)** und **Notfallwiederherstellung (DR)** mit SafeKit zu einer einzigen HADR-Strategie kombinieren können. Diese Videoanleitung erläutert die Architektur, die für eine 100%ige Anwendungsbetriebszeit ohne die Notwendigkeit von gemeinsam genutzten Datenträgern erforderlich ist.

### Video-Highlights {#video-highlights}

  1. 🎬 [Einführung in SafeKit HADR über Stretched VLANs](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=0s>) (1:06)
  2. 🎬 [So funktionieren synchrone Spiegelung und doppelte Bestätigung](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=65s>) (1:41)
  3. 🎬 [Failover-Mechanik: Gratuitous ARP (GARP) & virtuelle IP](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=166s>) (2:10)
  4. 🎬 [Design für langsame WANs: HA- vs. Backup-Strategien](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=296s>) (2:45)


### SafeKit-Video: So implementieren Sie Hochverfügbarkeit und Notfallwiederherstellung (HADR) mit SafeKit (7:40) {#safekit-video-how-to-implement-high-availability-and-disaster-recovery-hadr-with-safekit-740}



{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}