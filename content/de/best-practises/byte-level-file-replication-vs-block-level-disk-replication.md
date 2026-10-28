---
title: "Bytebasierte Dateireplikation vs. blockbasierte Festplattenreplikation für Hochverfügbarkeit"
canonical: "https://safekit.eviden.com/de/best-practises/byte-level-file-replication-vs-block-level-disk-replication/"
description: "Vergleichen Sie die Replikation von Dateien auf Byte-Ebene mit der Replikation von Festplatten auf Block-Ebene. Erfahren Sie, warum SafeKit eine SAN-lose Architektur vorschlägt, die nur geänderte Daten innerhalb von Dateien repliziert und so Datenverlustfreiheit (RPO 0), schnellere Wiederherstellung (RTO) und einfache Konfiguration auf Windows und Linux gewährleistet."
category: "best-practises"
lang: "de"
topics: "Bytebasierte Dateireplikation vs. blockbasierte Festplattenreplikation in einem Hochverfügbarkeitscluster, Vor- und Nachteile der bytebasierten Dateireplikation im Vergleich zur blockbasierten Festplattenreplikation, 🔍 SafeKit Hochverfügbarkeits-Navigationszentrale"
---

# Bytebasierte Dateireplikation vs. blockbasierte Festplattenreplikation für HA {#byte-level-file-replication-vs-block-level-disk-replication-for-ha}

## Bytebasierte Dateireplikation vs. blockbasierte Festplattenreplikation in einem Hochverfügbarkeitscluster {#byte-level-file-replication-vs-block-level-disk-replication-in-a-high-availability-cluster}

### Übersicht {#overview}

Dieser Artikel untersucht die Vor- und Nachteile der Byte-Level-Dateireplikation im Vergleich zur Block-Level-Festplattenreplikation in einem Hochverfügbarkeitscluster. Wir betrachten das Volumen der replizierten Daten, die Auswirkungen auf die Datenorganisation der Anwendungen, die Wiederherstellungszeit und die Implementierungseinfachheit.


![ Byte-basierte Dateireplikation vs. Block-basierte Festplattenreplikation ](/wp-content/uploads/2023/02/file-replication-vs-disk-replication.png "w:200")


Die folgenden Vergleichstabellen erläutern detailliert die Byte-Level-Dateireplikation, die von SafeKit , einem hochverfügbaren Softwareprodukt, implementiert wird.

### Was ist Byte-Level-Dateireplikation? {#what-is-byte-level-file-replication}

Bei der Replikation auf Byte-Ebene (wie bei [ SafeKit ](</>) ) werden nur die Änderungen innerhalb der Dateien repliziert. 

Die synchrone Replikation [ ](</de/best-practises/synchronous-replication-vs-asynchronous-replication/>) ist in einem Hochverfügbarkeitscluster erforderlich, um im Fehlerfall keinen Datenverlust zu gewährleisten. Die asynchrone Replikation dient der Datensicherung.

Das Volumen der replizierten Daten beschränkt sich auf die von Anwendungen innerhalb ihrer Dateien geänderten Informationen. Es werden keine zusätzlichen Daten repliziert.

Die Datenorganisation einer Anwendung wird nicht beeinträchtigt. Befinden sich die Daten einer Anwendung beispielsweise auf der Systemfestplatte, funktioniert die Dateireplikation auf Byte-Ebene.

Die Wiederherstellungszeit (RTO) im Falle eines Failovers reduziert sich auf die Neustartzeit der Anwendung auf den replizierten Dateien des sekundären Servers.

Schließlich ist die Lösung sehr einfach zu konfigurieren, da nur die Pfade der zu replizierenden Verzeichnisse konfiguriert werden müssen.

### Was ist blockbasierte Festplattenreplikation? {#what-is-block-level-disk-replication}

Bei der Blockebenen-Festplattenreplikation (wie bei [ DRBD ](<https://linbit.com/drbd/>) ) werden nur Änderungen innerhalb einer Festplatte repliziert.

Das Volumen der replizierten Daten beschränkt sich nicht auf die von Anwendungen geänderten Informationen. Es werden auch zusätzliche Daten repliziert, wie beispielsweise Metadaten zur Festplattenverwaltung (Liste freier Blöcke, interne Dateisysteminformationen).

Die Organisation der Anwendungsdaten wird dadurch erheblich beeinträchtigt. Alle Daten müssen auf der replizierten Festplatte lokalisiert werden. Dies erfordert zumindest eine Neukonfiguration der Anwendung. Andernfalls ist dies unmöglich, wenn sich einige der zu replizierenden Daten auf der Systemfestplatte befinden, da diese für jeden Server spezifisch bleiben muss.

Die Wiederherstellungszeit (RTO) verlängert sich mit dem Dateisystem-Wiederherstellungsverfahren auf der replizierten Festplatte nach einem Failover.

Schließlich ist die Lösung nicht einfach zu konfigurieren, da Fachkenntnisse erforderlich sind, um eine spezielle Festplatte mit einem Dateisystem einzurichten. Zusätzlich sind Anwendungskenntnisse notwendig, um die Anwendungsdaten auf der replizierten Festplatte zu konfigurieren.

## Vor- und Nachteile der Byte-Level-Dateireplikation im Vergleich zur Block-Level-Festplattenreplikation {#pros-and-cons-of-byte-level-file-replication-vs-block-level-disk-replication}

Kriterien | **Cluster mit Byte-Level-Dateireplikation** | **Cluster mit Block-Level-Festplattenreplikation**  
---|---|---  
Produkt | • [ SafeKit auf Windows und Linux ](/) | • Festplattenreplikationsprodukte als [ DRBD ](https://linbit.com/drbd/)   
Organisation der Anwendungsdaten |  • 0 Auswirkungen auf die Anwendungsdatenorganisation mit SafeKit.<br>• [Definieren Sie einfach die Verzeichnisse, die in Echtzeit repliziert werden sollen.](/de/architectures/file-replication-byte-level-with-failover-mirror-cluster/).<br>• Sogar Verzeichnisse innerhalb der Systemfestplatte können repliziert werden.  |  • Auswirkungen auf die Organisation der Anwendungsdaten.<br>• Spezielle Konfiguration der Anwendung, um ihre Daten auf einer replizierten Festplatte zu speichern.<br>• Die Daten auf der Systemfestplatte können nicht repliziert werden.   
Datenreplikation | • Synchrone Dateireplikation auf Byte-Ebene. <br> • Repliziert Dateiänderungen, die durch Anwendungsaktivitäten generiert werden. <br> • Es werden keine Metadaten repliziert. Nur die in Dateien geänderten Daten werden repliziert, nicht die gesamten Dateien (Dateireplikation auf Byte-Ebene). <br> • [ Synchrone Replikation, um Datenverlust im Fehlerfall zu vermeiden. ](/de/best-practises/synchronous-replication-vs-asynchronous-replication/) | • Repliziert alle Daten, die auf einem replizierten Datenträger geändert wurden. <br> • Anwendungsdaten und Metadaten werden repliziert. <br> • Beispielsweise wird die letzte Zugriffszeit einer Datei repliziert (die letzte Zugriffszeit wird bei jedem Lesen der Datei geändert).   
Komplexität der Bereitstellung | • Nein – Installation einer Software auf 2 Servern | • Ja – spezifische IT-Kenntnisse zur Konfiguration des Betriebssystems und der replizierten Festplatte erforderlich   
Failover | • Starten Sie die Anwendung auf dem zweiten Server neu. | • Mounten Sie das Dateisystem auf der replizierten Festplatte neu. <br> • Führen Sie die Wiederherstellungsprozedur für das Dateisystem durch. <br> • Starten Sie anschließend die Anwendung neu.   
Failback | • Automatisches Failback. <br> • Resynchronisierung der Daten auf dem sekundären Server, ohne die Anwendung auf dem primären Server zu stoppen. <br> • Kein Anwendungs-Failover, solange die Daten nicht resynchronisiert werden. | • Nicht alle Produkte bieten den gleichen Funktionsumfang.   
Quorum und Split Brain | • Anwendung wird nach einer Netzwerkisolation (Split Brain) auf einem einzelnen Server ausgeführt. <br> • Datenkonsistenz nach einem Split Brain. <br> • Kein dritter Rechner, keine Quorum-Disk oder spezielle Heartbeat-Leitung für Split Brain erforderlich. <br> • [ Weitere Informationen zu Heartbeat, Failover und Quorum ](/de/best-practises/heartbeat-failover-quorum-windows-linux-cluster/) | • Erfordert eine spezielle Quorum-Disk oder einen dritten Quorum-Server zur Verwaltung von Split Brain.   
Geeignet für | • [ Software-Editoren, die ihrer Anwendung eine einfache Hochverfügbarkeitsoption hinzufügen möchten ](/de/use-cases/application-clustering-software/) | • Unternehmen mit IT-Kenntnissen im Bereich Clustering.   
  

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}