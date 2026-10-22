---
title: "Datenreplikationstechniken für Hochverfügbarkeit: Ein umfassender Vergleich"
canonical: "https://safekit.eviden.com/de/best-practises/data-replication-techniques/"
description: "Vergleichen Sie Datenreplikation auf Datenbank-, Festplatten- und Dateiebene. Erfahren Sie, warum SafeKit eine SAN-lose Architektur für einfache synchrone Echtzeit-Replikation bietet, die Datenverlust verhindert und automatischen Failover unter Windows und Linux ermöglicht."
category: "best-practises"
lang: "de"
topics: "Datenreplikation auf Datenbank-, Festplatten- oder Dateiebene, Vergleichstabellen zu Datenreplikationstechniken, SafeKit-Navigationsübersicht zur Hochverfügbarkeit"
---

# Datenreplikationstechniken für Hochverfügbarkeit: Ein umfassender Vergleich {#data-replication-techniques-for-high-availability-a-complete-comparison}

## Datenreplikation auf Datenbank-, Festplatten- oder Dateiebene? {#data-replication-techniques-at-database-level-disk-level-or-file-level}

### Überblick {#overview}

Dieser Artikel vergleicht die Vor- und Nachteile der Datenreplikation auf Datenbank-, Festplatten- und Dateiebene für Hochverfügbarkeitscluster. Dabei betrachten wir Failover, Failback und die einfache Implementierung.

![Datenreplikationstechniken](/wp-content/uploads/2023/03/data-replication-techniques.png "w:128")

Die folgenden Vergleichstabellen erläutern die von SafeKit implementierten Datenreplikationstechniken. SafeKit ist eine Software für Hochverfügbarkeit.

### Wie funktioniert Datenreplikation auf Datenbankebene? {#what-is-the-data-replication-technique-at-database-level}

Das Datenbankmanagementsystem repliziert Protokolldateien zwischen zwei Servern, beispielsweise das [SQL-Server-Transaktionsprotokoll](<https://learn.microsoft.com/en-us/sql/relational-databases/logs/the-transaction-log-sql-server>).

Für automatischen Failover ist synchrone Replikation erforderlich. Andernfalls stehen die zuletzt bestätigten Transaktionen nach dem Failover auf dem sekundären Server nicht zur Verfügung.

Diese Technik repliziert eine Datenbank, aber nicht die übrigen Daten einer Anwendung. Für den Failover vieler Anwendungen müssen auch andere Daten, etwa Konfigurationsdateien, repliziert werden.

Stürzt ein Server ab und gehen Datenbankdateien verloren, erfolgt das Failback nicht automatisch. Ein erfahrener Datenbankadministrator muss die Datenbank auf dem ausgefallenen Server wiederherstellen.

### Wie funktioniert Datenreplikation auf Festplattenebene? {#what-is-the-data-replication-technique-at-disk-level}

Dabei werden Änderungen auf den Festplatten zwischen zwei Servern repliziert, beispielsweise mit [DRBD](<https://linbit.com/drbd/>).

Für automatischen Failover ist synchrone Replikation zwischen den Festplatten erforderlich, um Datenverlust zu vermeiden.

Diese Technik kann Datenbanken und andere Dateien replizieren, wirkt sich jedoch stark auf die Organisation der Anwendungsdaten aus: Alle Daten müssen auf der replizierten Festplatte liegen. Das ist möglicherweise nicht möglich, wenn zu replizierende Daten auf der Systemfestplatte gespeichert sind, da diese für jeden Server individuell bleiben muss.

Für die Konfiguration einer replizierten Festplatte mit Dateisystem und die Ablage der Anwendungsdaten darauf sind Fachkenntnisse erforderlich.

### Wie funktioniert Datenreplikation auf Dateiebene? {#what-is-the-data-replication-technique-at-file-level}

Dabei werden Dateiänderungen zwischen zwei Servern repliziert, beispielsweise mit [SafeKit](/de/).

Für automatischen Failover ist [synchrone Echtzeit-Replikation](/de/best-practises/synchronous-replication-vs-asynchronous-replication/) erforderlich, um Datenverlust zu vermeiden.

Diese Technik kann Datenbanken und andere Dateien replizieren, ohne die Organisation der Anwendungsdaten zu verändern. Liegen Anwendungsdaten beispielsweise auf der Systemfestplatte, funktioniert die Echtzeit-Dateireplikation trotzdem.

Die Konfiguration ist einfach: Es müssen nur die Pfade der zu replizierenden Verzeichnisse angegeben werden.

## Vergleichstabellen zu Datenreplikationstechniken {#comparative-tables-between-data-replication-techniques}

{{% insert-safekit-mirror-comparison-table-de %}}

{{% insert-safekit-hub-de %}}

{{% insert-safekit-4-buttons-de %}}