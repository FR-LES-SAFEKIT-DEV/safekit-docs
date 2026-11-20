---
title: "Was sind RPO und RTO? Definitionen, Beispiele und HA-Strategien"
canonical: "https://safekit.eviden.com/de/best-practises/what-is-rpo-and-rto-with-examples/"
description: "Lernen Sie die Definitionen von RPO (Recovery Point Objective) und RTO (Recovery Time Objective) mit klaren Beispielen kennen. Entdecken Sie, wie SafeKit einen Datenverlust von null (RPO = 0) und ein schnelles Failover erreicht, um die Geschäftskontinuität rund um die Uhr zu gewährleisten."
category: "best-practises"
lang: "de"
topics: "Kurzübersicht: RPO vs. RTO, Inhaltsverzeichnis, Wie berechne ich RPO und RTO für eine Hochverfügbarkeits- und Business-Continuity-Lösung?, Wie bestimme ich RPO und RTO für eine Backup- und Disaster-Recovery-Lösung?, Wie erreicht ein SafeKit-Mirror-Cluster RPO von null und einen niedrigen RTO?, Was sind die RTO-Benchmarks für einen SafeKit-Farm-Cluster mit Lastausgleich?, Vergleichstabellen: RTO vs. RPO, Hochverfügbarkeit in Aktion: Echtzeit-Demos für null Datenverlust und nahezu null Ausfallzeiten, FAQ: Optimierung von RPO und RTO für die Geschäftskontinuität, 🔍 SafeKit entdecken"
translation: "translate_md 2026-11-20.9 | glossaire 2026-11-20.24 | Translation LLM | 54 expressions"
---

# Was sind RPO und RTO? Definitionen, Beispiele und HA-Strategien {#what-are-rpo-and-rto-definitions-examples-and-ha-strategies}

## Kurzübersicht: RPO vs. RTO {#article-summary}

  * **RPO (Recovery Point Objective):** Misst **den Datenverlust**. Es definiert das maximale Alter von Dateien, die wiederhergestellt werden müssen, damit der Betrieb wieder aufgenommen werden kann.
  * **RTO (Recovery Time Objective):** Misst **die Ausfallzeit**. Es ist die Zeitspanne, innerhalb derer ein Geschäftsprozess wiederhergestellt werden muss.
  * **Der Hauptunterschied:** Beim RPO geht es um **Speicherung und Backups**. Beim RTO geht es um **die Wiederherstellungs- und Failover-Geschwindigkeit**.
  * **SafeKit:** Bietet ein **RPO von 0** (kein Datenverlust) und ein **niedriges RTO** (schneller Neustart) durch synchrone Replikation und automatisches Failover.


![Eine Vergleichstabelle von RPO (Recovery Point Objective) und RTO (Recovery Time Objective), die veranschaulicht, wie SafeKit Datenverlustfreiheit und einen schnellen Anwendungsneustart erreicht.](/wp-content/uploads/2026/08/rto-rpo-5-1024-en-2.jpg "w:512")

**RPO vs. RTO: Vergleich von Datenverlust und Wiederherstellungszeit in SafeKit**

## Inhaltsverzeichnis {#table-of-contents}

  * [Wie berechne ich RPO und RTO für eine Hochverfügbarkeits- und Business-Continuity-Lösung?](#calculate-rpo-rto-high-availability)
  * [Wie bestimme ich RPO und RTO für eine Backup- und Disaster-Recovery-Lösung?](#calculate-rpo-rto-backup-solution)
  * [Wie erreicht ein SafeKit-Mirror-Cluster RPO von null und einen niedrigen RTO?](#rpo-rto-safekit-mirror-cluster)
  * [Was sind die RTO-Benchmarks für einen SafeKit-<span class="notranslate farm-term" translate="no">Farm</span>-Cluster mit Lastausgleich?](#rpo-rto-safekit-farm-cluster)
  * [Vergleichstabellen: RTO vs. RPO](#rpo-vs-rto-comparison)
  * [Hochverfügbarkeit in Aktion: Echtzeit-Demos für null Datenverlust und nahezu null Ausfallzeiten](#safekit-rpo-rto-video-demos)
  * [FAQ: Optimierung von RPO und RTO für die Geschäftskontinuität](#faq-rpo-rto)
  * [SafeKit-Hochverfügbarkeits-Navigations-Hub](#hub)



{{%  insert-safekit-4-buttons-de  %}}
 

## Wie berechne ich RPO und RTO für eine Hochverfügbarkeits- und Business-Continuity-Lösung? {#calculate-rpo-rto-high-availability}

### Was ist Hochverfügbarkeit? {#what-is-high-availability}

**Hochverfügbarkeit (HA)** ist eine technische Architektur, die sicherstellt, dass ein System für einen bestimmten Prozentsatz der Zeit (z. B. 99,99 %) betriebsbereit und zugänglich bleibt.


![Logo der Hochverfügbarkeitssoftware SafeKit das synchrone Replikation und Failover darstellt](/wp-content/uploads/2026/01/safekit-icon-512x512-1.png "w:128")


Um die in einem **Geschäftskontinuitätsplan** definierten RPO- und RTO-Ziele zu erreichen, wird Hochverfügbarkeit typischerweise durch zwei primäre Architekturen implementiert:

  * **Shared-Disk-System über ein SAN:** Ein traditioneller Cluster, bei dem 2 Knoten mit einem zentralen Storage Area Network (SAN) verbunden sind. Wenn ein Knoten ausfällt, übernimmt der andere den Zugriff auf die gemeinsam genutzten Daten.
  * **Synchrone Replikation ohne Shared Storage:** Eine moderne Shared-Nothing-Architektur, implementiert von SafeKit. Daten werden in Echtzeit zwischen den lokalen Festplatten von 2 unabhängigen Knoten repliziert. Es wird kein SAN benötigt.


### Was ist der RPO einer Hochverfügbarkeitslösung? {#what-is-rpo-high-availability}

**RPO (Recovery Point Objective)** definiert das maximal tolerierbare Datenverlustvolumen, gemessen in Zeit. Für eine echte **Hochverfügbarkeitslösung** ist das Ziel RPO **null**.

Bei der Implementierung eines Hochverfügbarkeitsclusters mit automatischem Failover stellt ein **RPO von null** sicher, dass die Anwendung ohne Datenverlust neu gestartet wird.

  * **Shared-Disk-System über ein SAN:** Da beide Knoten auf **exakt dieselben physischen Datenblöcke** zugreifen, gibt es kein „Delta“ oder keine Verzögerung zwischen den Knoten, was eine vollständige Datenkonsistenz während eines Failovers gewährleistet.
  * **Softwarebasierte synchrone Replikation:** Jeder „Schreibvorgang“ wird in Echtzeit über das Netzwerk gespiegelt. Die Anwendung erhält erst dann eine **Schreibbestätigung**, wenn die Daten sicher auf beiden Knoten gespeichert sind. Dieser synchrone „Doppelschreibvorgang“ garantiert **null Datenverlust**, selbst wenn der primäre Server ausfällt.


### Was ist die RTO einer Hochverfügbarkeitslösung? {#what-is-rto-high-availability}

**RTO (Recovery Time Objective)** stellt die maximal tolerierbare Dauer der Ausfallzeit nach einer Dienstunterbrechung dar. Im Kontext der **Hochverfügbarkeit** sollte der RTO minimal sein, um einen kontinuierlichen Zugriff auf kritische Anwendungen zu gewährleisten.

Um eine niedrige RTO zu erreichen, nutzt eine Hochverfügbarkeitslösung **ein automatisches Failover**, um Hardware- oder Softwarefehler zu erkennen und die Anwendung sofort neu zu starten. In einem typischen Hochverfügbarkeitscluster **beträgt die RTO etwa eine Minute**, berechnet als:

  * **Fehlererkennungszeit:** Das Intervall, das das System benötigt, um einen Verlust des Node- oder Anwendungs-Heartbeat zu erkennen.
  * **Automatische Neustartzeit:** Die Zeit, die für die Initialisierung der Anwendungsdienste auf dem überlebenden Knoten erforderlich ist.


## Wie bestimme ich RPO und RTO für eine Backup- und Disaster-Recovery-Lösung? {#calculate-rpo-rto-backup-solution}

### Was ist eine Backup-Lösung? {#what-is-backup}

Eine **Backup-Lösung** ist eine Datenschutzstrategie, die darauf ausgelegt ist, periodische Kopien von Daten auf einem sekundären Speichergerät oder in der Cloud zu erstellen. Im Gegensatz zur Hochverfügbarkeit konzentriert sich das Backup auf **die langfristige Datenspeicherung** und die Wiederherstellung nach Datenbeschädigung oder standortweiten Katastrophen.


![Symbol für eine Backup-Lösung, das eine Backup-Architektur für die langfristige Datenspeicherung darstellt](/wp-content/uploads/2026/01/backup-icon.png "w:128")


Um die in einem **Notfallwiederherstellungsplan** definierten RPO- und RTO-Ziele zu erreichen, wird die Datensicherung typischerweise durch zwei primäre Methoden implementiert:

  * **Geplante Snapshots:** Ein Prozess, bei dem Zeitpunktkopien von Daten in festen Intervallen (z. B. täglich) erstellt werden. Dies definiert den **RPO**, da alle Daten, die zwischen dem letzten Snapshot und dem Ausfall geändert wurden, verloren gehen.
  * **Offsite- oder Cloud-Wiederherstellung:** Eine Architektur, bei der Daten an einem separaten physischen Standort gespeichert werden. Dies gewährleistet zwar das Überleben der Daten, führt jedoch zu einer **höheren RTO**, da die Daten übertragen und wiederhergestellt werden müssen, bevor die Anwendung neu gestartet werden kann.


### Was ist der RPO einer Backup-Lösung? {#what-is-rpo-backup}

**RPO (Recovery Point Objective)** definiert im Kontext eines Backups das Alter der Dateien, die aus dem Speicher wiederhergestellt werden müssen, damit der normale Betrieb wieder aufgenommen werden kann. Im Gegensatz zur Hochverfügbarkeit beinhaltet eine **Backup-Lösung** in der Regel ein RPO ungleich Null, das die Zeit darstellt, die seit dem erfolgreichen Abschluss des letzten Backups vergangen ist. 

Die Höhe des Datenverlusts in einer Backup-Strategie wird durch die **Backup-Frequenz** bestimmt. Je nach Architektur kann dieser RPO von Minuten bis zu 24 Stunden reichen: 

  * **Inkrementelle Snapshots:** Eine Methode, bei der nur geänderte Datenblöcke in festgelegten Intervallen gespeichert werden. Wenn alle 4 Stunden ein Backup erstellt wird, **beträgt das maximale RPO 4 Stunden**, was bedeutet, dass alle Daten, die zwischen dem letzten Snapshot und dem Systemabsturz erstellt wurden, dauerhaft verloren gehen. 
  * **Tägliche vollständige Backups:** Ein traditioneller Ansatz, bei dem einmal täglich (normalerweise über Nacht) eine vollständige Kopie der Daten erstellt wird. Dies führt zu einem **24-Stunden-RPO**, was für nicht kritische Daten akzeptabel sein kann, aber für Transaktionsdatenbanken oft nicht ausreichend ist. 


### Was ist die RTO einer Backup-Lösung? {#what-is-rto-backup}

**RTO (Recovery Time Objective)** in einer Backup-Strategie ist die Zeitdauer, die benötigt wird, um Daten von einem Backup-Medium wiederherzustellen und die Anwendung in einen betriebsbereiten Zustand zurückzuversetzen. Im Gegensatz zur Hochverfügbarkeit ist das **RTO für Backups** deutlich länger, da es manuelle oder geskriptete Wiederherstellungsprozesse beinhaltet. 

Bei einer Backup-Lösung kann der RTO je nach Datenmenge und Wiederherstellungsarchitektur von **mehreren Stunden bis zu mehreren Tagen** reichen. Die gesamte Ausfallzeit berechnet sich wie folgt: 

  * **Datenübertragungszeit:** Die Zeit, die erforderlich ist, um Daten vom Backup-Speicher (lokale Festplatten, Bänder oder Cloud) zurück auf den Produktionsserver zu übertragen. 
  * **Systemrekonfigurationszeit:** Das Intervall, das erforderlich ist, um die Daten in die Anwendung zu übertragen, Indizes neu zu erstellen und die Datenintegrität zu überprüfen, bevor sich Benutzer wieder anmelden können. 


## Wie erreicht ein SafeKit-Mirror-Cluster RPO von null und einen niedrigen RTO? {#rpo-rto-safekit-mirror-cluster}

### Was ist der SafeKit-Mirror-Cluster? {#what-is-safekit-mirror-cluster}

Der **SafeKit-Mirror-Cluster** ist eine softwarebasierte Hochverfügbarkeitslösung, die eine Shared-Nothing-Architektur implementiert. Im Gegensatz zu herkömmlichen Clustern, die ein teures SAN erfordern, nutzt SafeKit die lokalen Ressourcen von zwei Standardservern, um eine hochgradig ausfallsichere Umgebung zu schaffen.


![SafeKit-Mirror-Cluster-Architektur, die die Echtzeit-Dateireplikation auf Byte-Ebene zwischen primären und sekundären Knoten zeigt](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


Um maximale Betriebszeit und Datenschutz innerhalb Ihres **Geschäftskontinuitätsplans** zu gewährleisten, arbeitet der SafeKit-Mirror-Cluster über zwei integrierte Mechanismen:

  * **Synchrone Echtzeitreplikation:** SafeKit spiegelt Daten über das Netzwerk zwischen den lokalen Festplatten der primären und sekundären Knoten. Dies stellt sicher, dass der RPO null ist, da jedes Byte der Daten auf beiden Servern gesichert wird, bevor eine Transaktion abgeschlossen wird.
  * **Automatisches IP- und Anwendungs-Failover:** Wenn der primäre Knoten ausfällt, erkennt SafeKit automatisch den Heartbeat-Verlust und stellt die Anwendung und ihre virtuelle IP-Adresse auf dem sekundären Knoten wieder her. Dies führt zu einem RTO von etwa einer Minute und gewährleistet eine nahtlose Servicekontinuität.


### Was ist der RPO eines SafeKit-Mirror-Clusters? {#rpo-safekit-example}

Der **RPO eines SafeKit-Mirror-Clusters ist null**, da die Datenreplikation zwischen den Knoten [synchron und in Echtzeit](</de/best-practises/synchronous-replication-vs-asynchronous-replication/> "Synchrone vs. asynchrone Replikation") erfolgt.

Diese Garantie für keinen Datenverlust wird durch einen **Schreibbestätigungsprozess** erreicht: Ein Schreibvorgang auf die Festplatte wird der Anwendung erst bestätigt, wenn er erfolgreich auf die lokalen Festplatten des primären und des sekundären Knotens geschrieben wurde.

Im Gegensatz dazu ist bei **der asynchronen Replikation** der RPO größer als null. Da eine Verzögerung zwischen dem primären Schreibvorgang und dem sekundären Update besteht, führt ein Fehler zu Datenverlust während des Failovers auf den sekundären Server. Für geschäftskritische **Geschäftskontinuität** ist die synchrone Replikation die einzige Möglichkeit, um sicherzustellen, dass die Anwendung mit 100 % Datenintegrität neu gestartet wird.

### Was ist die RTO eines SafeKit-Mirror-Clusters? {#what-is-rto-safekit}

In einer Standardkonfiguration **beträgt die RTO eines SafeKit-Mirror-Clusters etwa eine Minute**. SafeKit bietet die Flexibilität, Hochverfügbarkeit entweder auf **Anwendungsebene** oder auf **VM-Ebene** zu implementieren. Jede Option hat einen anderen Einfluss auf die Wiederherstellungszeit: 

  * **Hochverfügbarkeit auf Anwendungsebene:** Dies ist der von SafeKit verwendete optimierte Ansatz. Die Software überwacht bestimmte Anwendungsdienste. 
    * **Hardwarefehler:** RTO = *Heartbeat-Timeout* (Standard 30 s) + *Anwendungsneustartzeit*.
    * **Softwarefehler:** RTO = *Anwendungsstoppzeit* + *Anwendungsneustartzeit*.
    * **Hauptvorteil:** Da das Betriebssystem bereits auf dem sekundären Knoten läuft, gibt es keine OS-Boot-Verzögerung, was zu einer schnellstmöglichen Wiederherstellung für **die Geschäftskontinuität** führt.
  * **HA auf VM-Ebene:** In diesem Szenario schützt SafeKit die gesamte virtuelle Maschine. 
    * **Fehlerwiederherstellung:** RTO = *Fehlererkennung* + *Neustartzeit des Betriebssystems* + *Neustartzeit der Anwendung*.
    * **Technischer Kompromiss:** Der RTO ist naturgemäß länger (mehrere Minuten), da der sekundäre Knoten einen vollständigen Kaltstart des Betriebssystems durchführen muss, bevor die Anwendung überhaupt mit der Initialisierung beginnen kann.


Durch die Nutzung von **Hochverfügbarkeit auf Anwendungsebene** eliminiert SafeKit die bei der Standardvirtualisierung unvermeidliche "Neustart-Strafe" und stellt sicher, dass Ihr **Geschäftskontinuitätsplan** die geringstmögliche Ausfallzeit erreicht. 

## Was sind die RTO-Benchmarks für einen SafeKit-<span class="notranslate farm-term" translate="no">Farm</span>-Cluster mit Lastausgleich? {#rpo-rto-safekit-farm-cluster}

### Was ist der SafeKit-<span class="notranslate farm-term" translate="no">Farm</span>-Cluster? {#what-is-safekit-farm-cluster}

Der **SafeKit-<span class="notranslate farm-term" translate="no">Farm</span>-Cluster** ist eine softwarebasierte Hochverfügbarkeitslösung für zustandslose Anwendungen (wie Webserver), die sowohl **Skalierbarkeit** als auch **Redundanz** erfordern. Im Gegensatz zu einem Mirror-Cluster, der sich auf die Datenreplikation konzentriert, verteilt ein <span class="notranslate farm-term" translate="no">Farm</span>-Cluster den eingehenden Datenverkehr auf mehrere aktive Knoten.


![SafeKit-Farm-Cluster-Architektur, die Netzwerk-Lastausgleich und Failover für zustandslose Anwendungen demonstriert](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


Um **die Geschäftskontinuität** in Umgebungen mit hohem Datenverkehr aufrechtzuerhalten, arbeitet der SafeKit-<span class="notranslate farm-term" translate="no">Farm</span>-Cluster über zwei Kernmechanismen:

  * **Netzwerklastenausgleich:** SafeKit verwendet eine virtuelle IP-Adresse, um eingehenden Netzwerkverkehr auf eine <span class="notranslate farm-term" translate="no">farm</span> von mehreren aktiven Servern zu verteilen. Dies stellt sicher, dass kein einzelner Server überlastet wird und die Leistung der Anwendung maximiert wird.
  * **Automatische Fehlererkennung und Neukonfiguration:** Wenn ein Knoten in der <span class="notranslate farm-term" translate="no">farm</span> ausfällt, erkennt SafeKit den Fehler über Heartbeats und verteilt den Datenverkehr sofort auf die verbleibenden funktionierenden Knoten. Dies ermöglicht eine nahezu Null-RTO für den gesamten Dienst, da andere Knoten bereits aktiv und bereit sind, die Last zu übernehmen.


### Was ist der RPO eines SafeKit-<span class="notranslate farm-term" translate="no">Farm</span>-Clusters? {#what-is-rpo-safekit-farm}

Das **RPO (Recovery Point Objective)** für einen **SafeKit-<span class="notranslate farm-term" translate="no">Farm</span>-Cluster** wird im Allgemeinen als **nicht anwendbar (N/A)** betrachtet. Dies liegt daran, dass ein <span class="notranslate farm-term" translate="no">Farm</span>-Cluster speziell für **zustandslose Anwendungen** entwickelt wurde, bei denen Daten nicht lokal auf den Knoten gespeichert werden. 

Da sich ein <span class="notranslate farm-term" translate="no">Farm</span>-Cluster auf **den Netzwerklastenausgleich** und nicht auf die Datensynchronisierung konzentriert, gibt es keine Datenreplikation zwischen den Knoten innerhalb des Clusters selbst. In einem typischen **Geschäftskontinuitätsplan**, der eine <span class="notranslate farm-term" translate="no">farm</span>-Architektur beinhaltet: 

  * **Zustandslose Vorgänge:** Alle Knoten in der <span class="notranslate farm-term" translate="no">farm</span> sind identisch und enthalten keine persistenten Daten. Daher gibt es bei einem Knotenausfall keinen „Datenverlust“, der gemessen werden kann. 
  * **Externer Datenspeicher:** Wenn die Anwendung eine Datenpersistenz erfordert, wird diese in der Regel von einem separaten **SafeKit-Mirror-Cluster** im Backend verwaltet. Die RPO ist dann null. 


### Was ist die RTO eines SafeKit-<span class="notranslate farm-term" translate="no">Farm</span>-Clusters? {#rto-example-safekit-farm-cluster}

In einer <span class="notranslate farm-term" translate="no">farm</span>-Architektur **wird die RTO auf nur wenige Sekunden reduziert**, da alle Knoten typischerweise gleichzeitig aktiv sind. Die Wiederherstellungszeit wird durch die Geschwindigkeit bestimmt, mit der der Cluster seine Datenverkehrsverteilung neu konfiguriert:

  * **Hardwarefehler:** Der RTO entspricht dem *Fehlererkennungs-Timeout* über die Überwachungskanäle (Standard sind einige Sekunden). Sobald der Heartbeat-Verlust erkannt wird, werden die **virtuellen IP-Lastausgleichsfilter** automatisch neu konfiguriert, um den Datenverkehr auf die verbleibenden funktionierenden Knoten umzuleiten.
  * **Softwarefehler oder geplanter Neustart:** Die RTO wird als die *Anwendungsstoppzeit* plus die *Anwendungsneustartzeit* auf diesem bestimmten Knoten berechnet, während die anderen Knoten in der <span class="notranslate farm-term" translate="no">farm</span> weiterhin den gesamten eingehenden Datenverkehr verarbeiten.


Dieser "Active-Active"-Mechanismus stellt sicher, dass für zustandslose Dienste die Auswirkungen auf die **Geschäftskontinuität** für den Endbenutzer nahezu nicht wahrnehmbar sind, da der Dienst nicht auf einem neuen Standby-Knoten initialisiert werden muss.

## Vergleichstabellen: RTO vs. RPO {#rpo-vs-rto-comparison}

**Semantische Definition: RTO vs. RPO**

Indikator | Akronym | Definition | Schwerpunktbereich  
---|---|---|---  
Wiederherstellungszeitvorgabe | RTO | Die angestrebte Zeitdauer für die Wiederherstellung eines Geschäftsprozesses nach einem Ausfall. | Verfügbarkeit / Ausfallzeit  
Wiederherstellungspunktziel | RPO | Das Höchstalter von Dateien, die aus der Sicherung wiederhergestellt werden müssen, damit der Betrieb wieder aufgenommen werden kann. | Datenverlust / Datenintegrität  
  
**Hochverfügbarkeit (HA) vs. Standard-Backup**

Funktion | Backup-Lösungen | Hochverfügbarkeit (SafeKit)  
---|---|---  
Automatisierung der Wiederherstellung | Manuelle Intervention | Automatischer Failover  
Ziel-RTO | Stunden bis Tage | Sekunden bis ~1 Minute  
Ziel-RPO | > 0 (Letzter Sicherungspunkt) | 0 (Synchrone Replikation)  
  
**RTO- und RPO-Benchmarks für SafeKit-Cluster**

Architektur | Anwendungsfall | RTO (Verfügbarkeit) | RPO (Datenverlust)  
---|---|---|---  
Mirror-Cluster | Echtzeit-Replikation | ~1 Min. (Heartbeat + Neustart) | 0 (Kein Datenverlust)  
<span class="notranslate farm-term" translate="no">Farm</span>-Cluster | Netzwerklastenausgleich | Ein paar Sekunden | N/A (zustandslos)  
  
## Hochverfügbarkeit in Aktion: Echtzeit-Demos für null Datenverlust und nahezu null Ausfallzeiten {#safekit-rpo-rto-video-demos}

### Video: Erreichen eines RPO von Null und eines niedrigen RTO in einem SafeKit-Mirror-Cluster (8:47) {#demo-mirror-cluster-rpo-rto}

Sehen Sie, wie SafeKit einen kritischen Fehler behandelt. Dieses Video zeigt **die synchrone Replikation**, die sicherstellt, dass keine Daten in einer SQL-Datenbank verloren gehen (RPO 0), und den **automatischen Neustart** von Diensten auf dem sekundären Knoten (niedriger RTO).


#### Kapitel {#chapters}

  1. 🎬 [2 Knoten mit SQL Server](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. 🎬 [Konfigurieren Sie den Cluster und das Modul mirror.safe](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. 🎬 [SQL-Replikation, -Migration und Failover bei Absturz starten und testen](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)

[Kostenlose Testversion hier](</de/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/>)

### Video: Erreichen eines RTO nahe null in einem SafeKit-<span class="notranslate farm-term" translate="no">Farm</span>-Cluster (5:03) {#demo-farm-cluster-rpo-rto}

Sehen Sie, wie SafeKit eine <span class="notranslate farm-term" translate="no">farm</span> mit Apache verwaltet, um sowohl Leistungsskalierung als auch sofortiges Failover zu ermöglichen.

#### Kapitel {#chapters-1}

  1. 🎬 [2 Knoten mit Apache](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=0s>) (0:13)
  2. 🎬 [Konfigurieren Sie den Cluster und das Modul farm.safe](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=13s>) (2:20)
  3. 🎬 [Netzwerk-Lastausgleich und Failover bei Absturz starten und testen](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=153s>) (2:30)

[Kostenlose Testversion hier](</de/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/>)

## FAQ: Optimierung von RPO und RTO für die Geschäftskontinuität {#faq-rpo-rto}

### Können RPO und RTO null sein? {#can-rpo-rto-be-zero}

**Ja.** Ein **RPO von null** bedeutet keinen Datenverlust, was durch synchrone Datenspiegelung möglich ist. Eine **nahezu null betragende RTO** wird durch automatisierte Failover-Software wie SafeKit erreicht, die Fehler erkennt und Anwendungen innerhalb von Sekunden oder Minuten auf einem sekundären Knoten neu startet.

### Was ist wichtiger: RPO oder RTO? {#importance-rpo-vs-rto}

Keines von beiden ist von Natur aus wichtiger; sie erfüllen unterschiedliche Rollen. **RPO (Recovery Point Objective)** konzentriert sich auf Datenverlust – wie viele Daten Sie sich leisten können zu verlieren. **RTO (Recovery Time Objective)** konzentriert sich auf Ausfallzeiten – wie schnell Sie wieder online sein müssen. Für geschäftskritische Anwendungen müssen beide minimiert werden.

### Wie unterscheiden sich RPO und RTO bei HA auf Anwendungsebene und VM-Ebene mit SafeKit? {#safekit-application-vs-vm-level}

Beide gewährleisten einen **RPO von 0** durch synchrone Replikation, unterscheiden sich jedoch in der Wiederherstellungszeit:

  * **Anwendungsebene:** Schnellere RTO (ca. 1 Min.), da nur Anwendungsdienste auf einem bereits laufenden Betriebssystem neu gestartet werden. Außerdem werden spezifische Software-/Prozessabstürze erkannt.
  * **VM-Ebene:** Höherer RTO, da die gesamte virtuelle Maschine auf dem sekundären Host neu gestartet werden muss. Obwohl anwendungsunabhängig, fehlt es an einer granularen Überwachung der Anwendungsprozesse selbst.


### Was ist der Unterschied zwischen HA- und Backup-Lösungen in Bezug auf RTO? {#ha-vs-backup-rto}

Hochverfügbarkeit (HA) bietet in der Regel eine viel niedrigere RTO (Sekunden bis Minuten), da sie lokale Ausfälle automatisch behandelt. Disaster Recovery (DR) mit Backup-Lösungen hat in der Regel eine höhere RTO (Stunden bis Tage), da es darum geht, Daten und Dienste an einem geografisch entfernten Standort nach einer großen Katastrophe wiederherzustellen.

### Wie erreiche ich die besten RPO und RTO zwischen externen Standorten? {#rpo-rto-between-remote-sites}

Um einen **RPO von null** und **einen RTO nahe null** über Remote-Standorte hinweg zu erreichen, ist eine Kombination aus **synchroner Replikation** und einem **Extended LAN (Stretched VLAN)** erforderlich:

  * **Erweitertes LAN/Stretched VLAN:** Durch die Erweiterung desselben Subnetzes (Layer 2) über zwei Rechenzentren hinweg können Sie eine Anwendung von Standort A nach Standort B verschieben, ohne ihre IP-Adresse zu ändern, wodurch komplexe DNS-Updates vermieden werden.
  * **Die SafeKit-Lösung:** SafeKit nutzt dies, indem es eine **softwaredefinierte virtuelle IP (VIP)** bereitstellt, die zwischen den Standorten wechselt. Es leitet den Datenverkehr sofort an den sekundären Standort um, indem es Gratuitous ARP (GARP) verwendet.


Dies ermöglicht einen **RPO = 0** (Echtzeit-Spiegelung) und einen **minimalen RTO** (Failover in ca. 1 Minute) ohne menschliches Eingreifen.

### Warum ist die Kombination von Hochverfügbarkeit und Backup für die Optimierung von RPO und RTO unerlässlich? {#combining-ha-and-backup-for-rpo-rto}

Die Kombination von Hochverfügbarkeit (HA) mit einer Backup-Lösung ist der einzige Weg, um eine Wiederherstellungsstrategie zu erreichen, die das Beste aus beiden Welten bietet. Obwohl sie oft zusammen diskutiert werden, lösen sie unterschiedliche Teile der RPO/RTO-Gleichung:

  * **Hochverfügbarkeit (über SafeKit):** Bietet eine nahezu Null-RTO und eine Null-RPO bei Hardware- oder Softwarefehlern. Durch die Verwendung der synchronen Echtzeitreplikation ist der sekundäre Server immer auf dem neuesten Stand. Wenn der primäre Server ausfällt, wird der Dienst auf dem sekundären Server sofort ohne Datenverlust neu gestartet.
  * **Backup-Lösungen:** Backups schützen vor Problemen mit der Datenintegrität (z. B. Ransomware oder versehentliches Löschen). Da HA Änderungen sofort repliziert, repliziert es einen Virus oder einen gelöschten Datenbankeintrag „getreu“ auf den Standby-Server. Ein Backup ermöglicht es Ihnen, „in der Zeit zurückzugehen“ zu einem Zeitpunkt, bevor die Beschädigung aufgetreten ist.
  * **Der hybride Ansatz:** Für maximale Ausfallsicherheit verwenden Unternehmen eine **hybride 3-Knoten-Architektur**. Diese umfasst einen lokalen 2-Knoten-Cluster mit synchroner Replikation für sofortige Hochverfügbarkeit und eine dritte Remote-Kopie (asynchron) für die Notfallwiederherstellung. Diese mehrschichtige Verteidigung stellt sicher, dass Sie über eine „Live“-Kopie für die sofortige Wiederherstellung und eine „historische“ Kopie für die Datensicherheit verfügen.



{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}