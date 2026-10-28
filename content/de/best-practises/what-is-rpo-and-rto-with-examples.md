---
title: "Was sind RPO und RTO? Definitionen, Beispiele und HA-Strategien"
canonical: "https://safekit.eviden.com/de/best-practises/what-is-rpo-and-rto-with-examples/"
description: "Lernen Sie die Definitionen von RPO (Recovery Point Objective) und RTO (Recovery Time Objective) anhand anschaulicher Beispiele kennen. Entdecken Sie, wie SafeKit Datenverlustfreiheit (RPO=0) und schnelles Failover erreicht, um die Geschäftskontinuität rund um die Uhr zu gewährleisten."
category: "best-practises"
lang: "de"
topics: "Kurzfassung: RPO vs. RTO, Inhaltsverzeichnis, Wie berechne ich RPO und RTO für eine Hochverfügbarkeits- und Geschäftskontinuitätslösung?, Wie bestimme ich RPO und RTO für eine Backup- und Disaster-Recovery-Lösung?, Wie erreicht ein SafeKit Mirror -Cluster einen RPO von null und einen niedrigen RTO?, Was sind die RTO-Benchmarks für einen SafeKit `Farm` Cluster mit Load Balancing?, Vergleichstabellen: RTO vs. RPO, Hochverfügbarkeit in Aktion: Echtzeit-Demos von Null-RPO und nahezu Null-RTO, FAQ: Optimierung von RPO und RTO für Geschäftskontinuität, 🔍 SafeKit Hochverfügbarkeits-Navigationszentrale"
---

# Was sind RPO und RTO? Definitionen, Beispiele und HA-Strategien {#what-are-rpo-and-rto-definitions-examples-and-ha-strategies}

## Kurzzusammenfassung: RPO vs. RTO {#article-summary}

  * ** RPO (Recovery Point Objective): ** misst ** Datenverlust ** . Es definiert das maximale Alter von Dateien, die wiederhergestellt werden müssen, damit der Betrieb fortgesetzt werden kann.
  * ** RTO (Recovery Time Objective): ** misst die Ausfallzeit ** ** . Es handelt sich um die Zeitspanne, innerhalb derer ein Geschäftsprozess wiederhergestellt werden muss.
  * ** Der Hauptunterschied: ** RPO bezieht sich auf ** Speicherung/Backups ** , während es bei RTO um ** Wiederherstellungs-/Failover-Geschwindigkeit ** geht.
  * ** SafeKit Fähigkeit: ** Liefert ** 0 RPO ** (kein Datenverlust) und ** niedriges RTO ** (schneller Neustart) durch synchrone Replikation und automatisches Failover.


![ Ein Vergleichsdiagramm von RPO (Recovery Point Objective) und RTO (Recovery Time Objective), das veranschaulicht, wie SafeKit Datenverlustfreiheit und einen schnellen Anwendungsneustart erreicht. ](/wp-content/uploads/2026/08/rto-rpo-5-1024-en-2.jpg "w:512")

** RPO vs. RTO: Vergleich von Datenverlust und Wiederherstellungszeit in SafeKit **

## Inhaltsverzeichnis {#table-of-contents}

  * [ Wie berechne ich RPO und RTO für eine Hochverfügbarkeits- und Geschäftskontinuitätslösung? ](#calculate-rpo-rto-high-availability)
  * [ Wie bestimme ich RPO und RTO für eine Backup- und Disaster-Recovery-Lösung? ](#calculate-rpo-rto-backup-solution)
  * Wie erreicht ein [ SafeKit Mirror Cluster einen RPO von Null und einen niedrigen RTO? ](#rpo-rto-safekit-mirror-cluster)
  * [ Was sind die RTO-Benchmarks für einen SafeKit `Farm` Cluster mit Lastausgleich? ](#rpo-rto-safekit-farm-cluster)
  * [ Vergleichstabellen: RTO vs. RPO ](#rpo-vs-rto-comparison)
  * [ Hochverfügbarkeit in Aktion: Echtzeit-Demos von Zero RPO und Near-Zero RTO ](#safekit-rpo-rto-video-demos)
  * [ Häufig gestellte Fragen zu RPO und RTO ](#faq-rpo-rto)
  * [ SafeKit Hochverfügbarer Navigationshub ](#hub)



{{%  insert-safekit-4-buttons-de  %}}
 

## Wie berechne ich RPO und RTO für eine Hochverfügbarkeits- und Geschäftskontinuitätslösung? {#calculate-rpo-rto-high-availability}

### Was ist Hochverfügbarkeit? {#what-is-high-availability}

** Hochverfügbarkeit (HA) ** ist eine technische Architektur, die entwickelt wurde, um sicherzustellen, dass ein System für einen bestimmten Prozentsatz der Zeit (z. B. 99,99 %) betriebsbereit und zugänglich bleibt.


![ SafeKit Logo für Hochverfügbarkeitssoftware, das SAN-loses Clustering und synchrone Replikation repräsentiert ](/wp-content/uploads/2026/01/safekit-icon-512x512-1.png "w:128")


Um die im Business Continuity Plan ** definierten RPO- und RTO ** Ziele zu erreichen, wird Hochverfügbarkeit typischerweise durch zwei primäre Architekturen implementiert:

  * ** Gemeinsam genutztes Festplattensystem über ein SAN: ** Ein herkömmlicher Cluster, bei dem zwei Knoten mit einem zentralen Storage Area Network (SAN) verbunden sind. Fällt ein Knoten aus, übernimmt der andere den Zugriff auf die gemeinsam genutzten Daten.
  * ** SANlose synchrone Replikation: ** Eine moderne "Shared-Nothing"-Architektur – implementiert durch die Software [ SafeKit ](</> "SafeKit High Availability Software") – bei der Daten in Echtzeit zwischen lokalen Festplatten von 2 unabhängigen Knoten repliziert werden, wodurch die Notwendigkeit eines SAN entfällt.


### Was ist der RPO einer Hochverfügbarkeitslösung? {#what-is-rpo-high-availability}

Der RPO (Recovery Point Objective) ** ** definiert das maximal tolerierbare Datenverlustvolumen, gemessen in Zeit. Für eine echte Hochverfügbarkeitslösung ** ** beträgt der Ziel-RPO ** null ** .

Bei der Implementierung eines Hochverfügbarkeitsclusters mit automatischem Failover stellt ein ** Zero RPO ** sicher, dass die Anwendung ohne Datenverlust neu gestartet wird.

  * ** Gemeinsam genutztes Festplattensystem über ein SAN: ** Da beide Knoten auf die ** exakt gleichen physischen Datenblöcke ** zugreifen, gibt es kein "Delta" oder keine Verzögerung zwischen den Knoten, wodurch die vollständige Datenkonsistenz während eines Failovers gewährleistet wird.
  * Softwarebasierte ** Replikation: Ein SAN- ** Ansatz, bei dem jeder Schreibvorgang in Echtzeit im Netzwerk gespiegelt wird. Die Anwendung erhält erst dann eine ** ** die Daten sicher auf beiden Knoten gespeichert sind. Dieser synchrone ** garantiert null Datenverlust ** selbst wenn der primäre Server ausfällt.


### Was ist die RTO einer Hochverfügbarkeitslösung? {#what-is-rto-high-availability}

** RTO (Recovery Time Objective) ** stellt die maximal tolerierbare Ausfallzeit nach einer Dienstunterbrechung dar. Im Kontext der Hochverfügbarkeit ** ** sollte der RTO minimal sein, um den kontinuierlichen Zugriff auf kritische Anwendungen zu gewährleisten.

Um eine niedrige RTO (Recovery Time Out) zu erreichen, nutzt eine Hochverfügbarkeitslösung das automatische Failover ** ** um Hardware- oder Softwarefehler zu erkennen und die Anwendung sofort neu zu starten. In einem typischen Hochverfügbarkeitscluster beträgt die RTO ** ungefähr eine Minute ** und wird wie folgt berechnet:

  * ** Fehlererkennungszeit: ** Das Intervall, das das System benötigt, um einen Knoten- oder Anwendungs-Heartbeat-Verlust zu erkennen.
  * Automatische Neustartzeit: ** Die Zeit ** die benötigt wird, damit die Anwendungsdienste auf dem verbleibenden Knoten initialisiert werden.


## Wie bestimme ich RPO und RTO für eine Backup- und Disaster-Recovery-Lösung? {#calculate-rpo-rto-backup-solution}

### Was ist eine Backup-Lösung? {#what-is-backup}

Eine Backup-Lösung ** ** ist eine Datensicherungsstrategie, die regelmäßige Datenkopien auf einem sekundären Speichermedium oder in der Cloud erstellt. Im Gegensatz zu Hochverfügbarkeit konzentriert sich die Datensicherung auf die langfristige Datenaufbewahrung ** ** und die Wiederherstellung nach Datenbeschädigung oder Systemausfällen.


![ Symbol für eine Backup-Lösung, die eine Backup-Architektur für die langfristige Datenaufbewahrung darstellt. ](/wp-content/uploads/2026/01/backup-icon.png "w:128")


Um die im Notfallwiederherstellungsplan ** definierten RPO- und RTO ** Ziele zu erreichen, wird die Datensicherung typischerweise mit zwei primären Methoden durchgeführt:

  * ** Geplante Snapshots: ** Ein Prozess, bei dem zu einem festgelegten Zeitpunkt (z. B. täglich) Datenkopien erstellt werden. Dies definiert den RPO ** ** , da alle Daten, die zwischen dem letzten Snapshot und dem Ausfall geändert wurden, verloren gehen.
  * ** oder Cloud-Wiederherstellung: Eine Architektur ** bei der Daten an einem separaten physischen Ort gespeichert werden. Dies gewährleistet zwar den Erhalt der Daten, führt aber zu einem höheren ** ** da die Daten vor dem Neustart der Anwendung übertragen und wiederhergestellt werden müssen.


### Was ist der RPO einer Backup-Lösung? {#what-is-rpo-backup}

** RPO (Recovery Point Objective) ** definiert im Backup-Kontext das Alter der Dateien, die für die Wiederaufnahme des normalen Betriebs aus dem Speicher wiederhergestellt werden müssen. Im Gegensatz zu Hochverfügbarkeitslösungen beinhaltet eine ** ** -Backup-Lösung üblicherweise einen von Null verschiedenen RPO-Wert, der die seit dem letzten erfolgreichen Backup verstrichene Zeit angibt. 

Das Ausmaß des Datenverlusts bei einer Backup-Strategie wird durch die Backup-Frequenz ** ** bestimmt. Je nach Architektur kann dieser RPO-Wert zwischen Minuten und 24 Stunden liegen: 

  * ** Inkrementelle Snapshots: ** Bei dieser Methode werden nur geänderte Datenblöcke in festgelegten Intervallen gespeichert. Wird alle 4 Stunden eine Sicherung erstellt, beträgt das maximale RPO 4 Stunden ** ** bedeutet, dass alle Daten, die zwischen dem letzten Snapshot und dem Systemabsturz erstellt wurden, unwiderruflich verloren gehen. 
  * Tägliche vollständige Datensicherungen: ** Ein traditioneller Ansatz ** bei dem einmal täglich (üblicherweise über Nacht) eine vollständige Kopie der Daten erstellt wird. Dies führt zu einem 24-Stunden-RPO ** ** , was für nicht kritische Daten akzeptabel sein kann, aber für Transaktionsdatenbanken oft nicht ausreicht. 


### Was ist die RTO einer Backup-Lösung? {#what-is-rto-backup}

** RTO (Recovery Time Objective) ** in einer Backup-Strategie ist die Zeitspanne, die benötigt wird, um Daten von einem Backup-Medium wiederherzustellen und die Anwendung in einen betriebsbereiten Zustand zu versetzen. Im Gegensatz zur Hochverfügbarkeit ist das RTO ** für Backup ** deutlich länger, da es manuelle oder skriptbasierte Wiederherstellungsprozesse beinhaltet. 

Bei einer Backup-Lösung kann das ** (Recovery Time ** ) je nach Datenvolumen und Wiederherstellungsarchitektur zwischen mehreren Stunden und Tagen variieren. Die gesamte Ausfallzeit berechnet sich wie folgt: 

  * ** Datenübertragungszeit: ** Die Zeit, die benötigt wird, um Daten vom Backup-Speicher (lokale Festplatten, Bänder oder Cloud) zurück auf den Produktionsserver zu übertragen. 
  * ** Systemneukonfigurationszeit: ** Das Intervall, das benötigt wird, um die Daten in die Anwendung zu laden, Indizes neu zu erstellen und die Datenintegrität zu überprüfen, bevor sich Benutzer wieder anmelden können. 


## Wie erreicht ein SafeKit Mirror Cluster einen RPO von null und einen niedrigen RTO? {#rpo-rto-safekit-mirror-cluster}

### Was ist der Cluster SafeKit Mirror ? {#what-is-safekit-mirror-cluster}

Der Cluster ** SafeKit Mirror ** ist eine softwarebasierte Hochverfügbarkeitslösung, die eine „Shared-Nothing“-Architektur implementiert. Im Gegensatz zu herkömmlichen Clustern, die ein teures SAN benötigen, nutzt SafeKit die lokalen Ressourcen zweier Standardserver, um eine hochverfügbare Umgebung zu schaffen.


![ SafeKit Mirror Clusterarchitektur mit Echtzeit-Byte-Level-Dateireplikation zwischen primären und sekundären Knoten ](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


Um maximale Verfügbarkeit und Datensicherheit innerhalb Ihres ** Business Continuity Plan ** zu gewährleisten, arbeitet der SafeKit mirror Cluster mit zwei integrierten Mechanismen:

  * ** Echtzeit-Synchronreplikation: ** SafeKit spiegeln Daten im Netzwerk zwischen den lokalen Festplatten des primären und sekundären Knotens. Dadurch wird sichergestellt, dass der RPO (Recovery Point Objective) null beträgt, da jedes Byte an Daten auf beiden Servern gesichert wird, bevor eine Transaktion abgeschlossen wird.
  * Automatisches IP- und Anwendungs-Failover: ** Fällt der primäre Knoten aus, erkennt ** automatisch den Verlust des Heartbeats und stellt die Anwendung sowie ihre virtuelle IP-Adresse auf dem sekundären Knoten wieder her. Dies führt zu einer Wiederherstellungszeit (RTO SafeKit von ca. einer Minute und gewährleistet so eine unterbrechungsfreie Servicekontinuität.


### Was ist der RPO eines SafeKit Mirror Clusters? {#rpo-safekit-example}

Der ** eines SafeKit ist null mirror weil die Datenreplikation zwischen den Knoten [ und in ](</de/best-practises/synchronous-replication-vs-asynchronous-replication/> "Synchronous vs Asynchronous Replication") ** .

Diese Garantie für null Datenverlust wird durch einen ** -Schreibbestätigungsprozess ** erreicht: Ein Festplattenschreibvorgang wird der Anwendung erst dann bestätigt, wenn er erfolgreich auf die lokalen Festplatten sowohl des primären als auch des sekundären Knotens geschrieben wurde.

Im Gegensatz dazu ist bei asynchroner Replikation ( ** , ** ) der RPO größer als null. Da zwischen dem primären Schreibvorgang und der sekundären Aktualisierung eine Verzögerung besteht, führt ein Fehler beim Failover auf den sekundären Server zu Datenverlust. Für geschäftskritische Anwendungen ** Business Continuity, ** ) ist die synchrone Replikation die einzige Möglichkeit, einen Neustart der Anwendung mit vollständiger Datenintegrität zu gewährleisten.

### Was ist die RTO eines SafeKit Mirror Clusters? {#what-is-rto-safekit}

In einer Standardkonfiguration beträgt das RTO eines ** SafeKit mirror Clusters etwa eine Minute. ** bietet die Flexibilität, Hochverfügbarkeit entweder auf Anwendungsebene ** ** auf VM-Ebene ** ** implementieren, SafeKit sich die Wiederherstellungszeit jeweils unterschiedlich auswirkt. 

  * ** Anwendungsebene HA: ** Dies ist der optimierte SafeKit Ansatz, bei dem die Software bestimmte Anwendungsdienste überwacht. 
    * ** Hardwarefehler: ** RTO = _Heartbeat-Timeout_ (Standard 30s) + _Anwendungsneustartzeit_.
    * ** Softwarefehler: ** RTO = _Anwendungsstoppzeit_ \+ _Anwendungsneustartzeit_.
    * ** : Da das Betriebssystem bereits auf dem sekundären Knoten läuft, gibt es keine Verzögerung beim Start des Betriebssystems, ** zu einer schnellstmöglichen Wiederherstellung für die ** führt **
  * ** VM-Level HA: ** In diesem Szenario schützt SafeKit die gesamte Virtual Machine-Umgebung. 
    * ** Fehlerbehebung: ** RTO = _Fehlererkennung_ \+ ** OS-Neustartzeit ** \+ _Anwendungsneustartzeit_.
    * Technischer Kompromiss: ** Die RTO ist naturgemäß länger (mehrere Minuten), da der sekundäre Knoten einen vollständigen Kaltstart des Betriebssystems durchführen muss ** bevor die Anwendung überhaupt initialisiert werden kann.


Durch die Nutzung der anwendungsweiten Hochverfügbarkeit ** ** eliminiert SafeKit die bei der Standardvirtualisierung übliche "Neustartstrafe" und gewährleistet so, dass Ihr ** Business Continuity Plan ** die geringstmögliche Ausfallzeit erreicht. 

## Welche RTO-Benchmarks gelten für einen SafeKit `Farm` Cluster mit Lastausgleich? {#rpo-rto-safekit-farm-cluster}

### Was ist der Cluster SafeKit `Farm` ? {#what-is-safekit-farm-cluster}

Der Cluster ** SafeKit `Farm` ** ist eine softwarebasierte Hochverfügbarkeitslösung für zustandslose Anwendungen (wie Webserver), die sowohl Skalierbarkeit ** ** als auch Redundanz mirror ** ** `farm` . Im Gegensatz zu einem Cluster, der sich auf Datenreplikation konzentriert, verteilt ein Cluster den eingehenden Datenverkehr auf mehrere aktive Knoten.


![ SafeKit Farm Clusterarchitektur zur Demonstration von Netzwerklastausgleich und Failover für zustandslose Anwendungen ](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


Um die Geschäftskontinuität ** ** in Umgebungen mit hohem Datenverkehr aufrechtzuerhalten, arbeitet der Cluster SafeKit `farm` mit zwei Kernmechanismen:

  * Netzwerklastverteilung: ** ** SafeKit nutzen eine virtuelle IP-Adresse `farm` um den eingehenden Netzwerkverkehr auf mehrere aktive Server zu verteilen. Dadurch wird sichergestellt, dass kein einzelner Server überlastet wird und die Anwendungsleistung maximiert wird.
  * Automatische Fehlererkennung und Rekonfiguration ** : Fällt ein Knoten in ** aus, erkennt SafeKit den Ausfall mittels Heartbeats und verteilt den Datenverkehr umgehend auf die verbleibenden `farm` fehlerfreien Knoten. Dadurch wird eine nahezu vollständige Wiederherstellungszeit (RTO) des gesamten Dienstes erreicht, da andere Knoten bereits aktiv sind und die Last übernehmen können.


### Was ist der RPO eines SafeKit `Farm` Clusters? {#what-is-rpo-safekit-farm}

Der RPO (Recovery Point Objective) ** ** für einen ** SafeKit `Farm` Cluster ** wird im Allgemeinen als ** Nicht anwendbar (N/A) ** betrachtet. Dies liegt daran, dass ein `farm` Cluster speziell für zustandslose ** Anwendungen ** konzipiert ist, bei denen Daten nicht lokal auf den Knoten gespeichert werden. 

Da ein `farm` Cluster den Fokus auf den Netzwerklastausgleich ** ** und nicht auf die Datensynchronisation legt, findet keine Datenreplikation zwischen den Knoten innerhalb des Clusters statt. In einem typischen Geschäftskontinuitätsplan ** ** einer `farm` -Architektur: 

  * Zustandslose Operationen ** : ** Alle Knoten in `farm` sind identisch und speichern keine persistenten Daten; daher gibt es bei einem Knotenausfall keinen "Datenverlust", der gemessen werden könnte. 
  * ** Externer Datenspeicher: ** Wenn die Anwendung Datenpersistenz erfordert, wird diese in der Regel von einem separaten Backend-Cluster ** SafeKit Mirror ** verwaltet, wo der RPO dann null wäre. 


### Was ist die RTO eines SafeKit `Farm` Clusters? {#rto-example-safekit-farm-cluster}

In einer `farm` -Architektur wird das ** RTO auf nur wenige Sekunden ** reduziert, da typischerweise alle Knoten gleichzeitig aktiv sind. Die Wiederherstellungszeit wird durch die Geschwindigkeit bestimmt, mit der der Cluster seine Verkehrsverteilung neu konfiguriert.

  * Hardwarefehler ** : ** Die RTO entspricht dem _Timeout für die Fehlererkennung_ über alle Überwachungskanäle (Standardwert: einige Sekunden). Sobald ein Heartbeat-Verlust erkannt wird, werden die virtuellen IP-Lastverteilungsfilter ** ** automatisch neu konfiguriert, um den Datenverkehr an die verbleibenden fehlerfreien Knoten umzuleiten.
  * ** Softwareausfall oder geplanter Neustart: ** Die RTO wird als die _Anwendungsstoppzeit_ plus die _Anwendungsneustartzeit_ auf diesem spezifischen Knoten berechnet, währenddessen die anderen Knoten in `farm` weiterhin den gesamten eingehenden Datenverkehr verarbeiten.


Dieser „Aktiv-Aktiv“-Mechanismus stellt sicher, dass bei ** Diensten die Auswirkungen der ** für den Endbenutzer nahezu unmerklich sind, da der Dienst nicht auf einem neuen Standby-Knoten initialisiert werden muss.

## Vergleichstabellen: RTO vs. RPO {#rpo-vs-rto-comparison}

** Semantische Definition: RTO vs. RPO **

Metrik | Akronym | Definition | Fokusbereich  
---|---|---|---  
Wiederherstellungszeitziel (RTO) | RTO | Die Zieldauer für die Wiederherstellung eines Geschäftsprozesses nach einem Ausfall. | Verfügbarkeit / Ausfallzeit  
Wiederherstellungspunktziel | RPO | Maximales Alter der Dateien, die aus der Sicherung wiederhergestellt werden müssen, damit der Betrieb fortgesetzt werden kann. | Datenverlust / Datenintegrität  
  
** Hochverfügbarkeit (HA) vs. Standard-Backup **

Feature | Backup Solutions | High Availability ( SafeKit )  
---|---|---  
Wiederherstellungsautomatisierung | Manuelle Intervention | Automatisches Failover  
Ziel-RTO | Stunden bis Tage | Sekunden bis ca. 1 Minute  
Ziel-RPO | > 0 (Letzter Sicherungspunkt) | 0 (Synchrone Replikation)  
  
** RTO- und RPO-Benchmarks für SafeKit -Cluster **

Architektur | Anwendungsfall | RTO (Verfügbarkeit) | RPO (Datenverlust)  
---|---|---|---  
Mirror Cluster | Echtzeitreplikation | ~1 min (Heartbeat + Neustart) | 0 (Kein Datenverlust)  
`Farm` Cluster | Netzwerklastausgleich | Einige Sekunden | Nicht verfügbar (Zustandslos)  
  
## Hochverfügbarkeit in der Praxis: Echtzeit-Demos von Zero RPO und Near-Zero RTO {#safekit-rpo-rto-video-demos}

### Video: Erreichen von Zero RPO und Low RTO in einem SafeKit Mirror Cluster (8:47) {#demo-mirror-cluster-rpo-rto}

Sehen Sie, wie SafeKit einen kritischen Fehler behebt. Dieses Video demonstriert die synchrone Replikation ** ** die sicherstellt, dass in einer SQL-Datenbank keine Daten verloren gehen (RPO 0), sowie den automatischen Neustart ** ** der Dienste auf dem sekundären Knoten (niedriges RTO).


#### Kapitel {#chapters}

  1. 🎬 [ 2 Knoten mit SQL Server ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. 🎬 [ Cluster und Modul mirror.safe konfigurieren ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. 🎬 [ Starten und Testen der SQL-Replikation, Migration und des Failovers bei einem Absturz ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)

[ Kostenlose Testversion hier ](</de/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/>)

### Video: Erreichen von nahezu Null RTO in einem SafeKit `Farm` Cluster (5:03) {#demo-farm-cluster-rpo-rto}

Sehen Sie, wie SafeKit einen Apache-Webserver `farm` verwaltet, um sowohl Leistungsskalierung als auch sofortiges Failover zu ermöglichen.

#### Kapitel {#chapters-1}

  1. 🎬 [ 2 Knoten mit Apache ](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=0s>) (0:13)
  2. 🎬 [ Cluster und Modul farm.safe konfigurieren ](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=13s>) (2:20)
  3. 🎬 [ Start und Test des Netzwerk-Lastausgleichs, Failover bei Absturz ](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=153s>) (2:30)

[ Kostenlose Testversion hier ](</de/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/>)

## FAQ: Optimierung von RPO und RTO für Geschäftskontinuität {#faq-rpo-rto}

### Können RPO und RTO Null sein? {#can-rpo-rto-be-zero}

** Ja. ** Ein RPO von null ** bedeutet keinen Datenverlust, was durch synchrone Datenspiegelung möglich ist. Ein RTO von nahezu null ** ** wird durch automatisierte Failover-Software wie SafeKit erreicht, die Fehler erkennt und Anwendungen innerhalb ** Sekunden oder Minuten auf einem sekundären Knoten neu startet.

### Was ist wichtiger: RPO oder RTO? {#importance-rpo-vs-rto}

Keines der beiden ist per se wichtiger; sie erfüllen unterschiedliche Funktionen. ** RPO (Recovery Point Objective) ** konzentrieren sich auf den Datenverlust – wie viele Daten Sie maximal verlieren dürfen. ** RTO (Recovery Time Objective) ** konzentrieren sich auf die Ausfallzeit – wie schnell Sie wieder online sein müssen. Für unternehmenskritische Anwendungen müssen beide Werte minimiert werden.

### Worin besteht der Unterschied zwischen RPO und RTO zwischen SafeKit auf Anwendungsebene und {#safekit-application-vs-vm-level} ?

Beide gewährleisten zwar durch synchrone Replikation einen RPO-Wert von 0 ** = 0 ** , unterscheiden sich aber in der Wiederherstellungszeit:

  * ** Anwendungsebene: ** Schnellere RTO (ca. 1 Minute), da nur Anwendungsdienste auf einem bereits laufenden Betriebssystem neu gestartet werden. Es erkennt außerdem spezifische Software-/Prozessabstürze.
  * ** VM-Ebene: ** Höhere RTO, da die gesamte virtuelle Maschine auf dem sekundären Host neu gestartet werden muss. Obwohl anwendungsunabhängig, fehlt eine detaillierte Überwachung der Anwendungsprozesse selbst.


### Worin besteht der Unterschied zwischen HA- und Backup-Lösungen hinsichtlich RTO? {#ha-vs-backup-rto}

Hochverfügbarkeit (HA) bietet typischerweise eine deutlich niedrigere Wiederherstellungszeit (Sekunden bis Minuten), da lokale Ausfälle automatisch behoben werden. Disaster Recovery mit Backup-Lösungen (DR) weist hingegen üblicherweise eine höhere Wiederherstellungszeit (Stunden bis Tage) auf, da Daten und Dienste nach einer größeren Katastrophe an einem geografisch entfernten Standort wiederhergestellt werden müssen.

### Wie erreiche ich optimale RPO- und RTO-Werte zwischen Remote-Standorten? {#rpo-rto-between-remote-sites}

Um ein ** Zero RPO ** und ** Near-Zero RTO ** über entfernte Standorte hinweg zu erreichen, ist eine Kombination aus ** synchroner Replikation ** und einem ** Extended LAN (Stretched VLAN) ** erforderlich.

  * ** Erweitertes LAN / Gestrecktes VLAN: ** Durch die Ausdehnung desselben Subnetzes (Layer 2) über zwei Rechenzentren können Sie eine Anwendung von Standort A nach Standort B verschieben, ohne ihre IP-Adresse zu ändern, wodurch komplexe DNS-Aktualisierungen vermieden werden.
  * Die ** SafeKit Lösung: ** SafeKit nutzt dies durch die Bereitstellung einer softwaredefinierten virtuellen IP-Adresse (VIP) ** ** , die zwischen Standorten wechselt. Sie leitet den Datenverkehr mithilfe von Gratuitous ARP (GARP) sofort an den sekundären Standort um.


Dies ermöglicht eine Echtzeit-Spiegelung ( ** RPO = 0 ** ) und eine minimale Ausfallzeit ( ** RTO ** ) ohne menschliches Eingreifen.

### Warum ist die Kombination von Hochverfügbarkeit und Datensicherung für die Optimierung von RPO und RTO unerlässlich? {#combining-ha-and-backup-for-rpo-rto}

Die Kombination von Hochverfügbarkeit (HA) mit einer Backup-Lösung ist der einzige Weg, eine optimale Wiederherstellungsstrategie zu erreichen. Obwohl sie oft gemeinsam diskutiert werden, lösen sie unterschiedliche Aspekte der RPO/RTO-Gleichung:

  * ** Hochverfügbarkeit (über SafeKit ): ** optimiert für nahezu null RTO und null RPO bei Hardware- oder Softwarefehlern. Durch die synchrone Echtzeitreplikation ist der sekundäre Server stets auf dem neuesten Stand. Fällt der primäre Server aus, wird der Dienst auf dem sekundären Server ohne Datenverlust sofort neu gestartet.
  * ** Backup-Lösungen: ** schützt vor Datenintegritätsproblemen (wie Ransomware oder versehentlichem Löschen). Da HA Änderungen sofort repliziert, werden Viren oder gelöschte Datenbankeinträge originalgetreu auf den Standby-Server übertragen. Mit einem Backup können Sie zu einem Zeitpunkt vor dem Auftreten des Datenverlusts zurückkehren.
  * ** Der Hybridansatz: ** Für maximale Ausfallsicherheit nutzen Unternehmen eine 3-Knoten ** ** Diese umfasst einen lokalen 2-Knoten-Cluster mit synchroner Replikation für sofortige Hochverfügbarkeit und eine dritte, asynchrone Remote-Kopie für die Notfallwiederherstellung. Diese mehrschichtige Verteidigung gewährleistet, dass Sie über eine „Live“-Kopie für die sofortige Wiederherstellung und eine „historische“ Kopie für die Datensicherheit verfügen.



{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}