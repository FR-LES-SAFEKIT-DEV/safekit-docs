---
title: "Datenreplikationstechniken für Hochverfügbarkeit: Ein vollständiger Vergleich"
canonical: "https://safekit.eviden.com/de/best-practises/data-replication-techniques/"
description: "Datenreplikationstechniken auf Datenbank-, Festplatten- und Dateiebene im Vergleich, und wie SafeKit synchrone Replikation und Failover ohne gemeinsamen Speicher bietet."
category: "best-practises"
lang: "de"
topics: "Datenreplikationstechniken auf Datenbankebene, Festplattenebene oder Dateiebene?, Vergleichstabellen zwischen Datenreplikationstechniken"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-19.15 | Translation LLM | 54 expressions"
image: "/wp-content/uploads/2023/03/data-replication-techniques.png"
schemaType: "TechArticle"
---

# Datenreplikationstechniken für Hochverfügbarkeit: Ein vollständiger Vergleich {#data-replication-techniques-for-high-availability-a-complete-comparison}

## Datenreplikationstechniken auf Datenbankebene, Festplattenebene oder Dateiebene? {#data-replication-techniques-at-database-level-disk-level-or-file-level}

### Übersicht {#overview}

Dieser Artikel vergleicht die Vor- und Nachteile von Datenreplikationstechniken auf Datenbank-, Festplatten- und Dateiebene in Hochverfügbarkeitsclustern. Dabei werden drei Kriterien betrachtet: Failover, Failback und Einfachheit der Implementierung.


![Datenreplikationstechniken](/wp-content/uploads/2023/03/data-replication-techniques.png "w:128")


Die folgenden Vergleichstabellen erläutern detailliert die von SafeKit, einem Softwareprodukt für Hochverfügbarkeit, implementierten Datenreplikationstechniken.

### Was ist die Datenreplikationstechnik auf Datenbankebene? {#what-is-the-data-replication-technique-at-database-level}

Das Datenbankmanagementsystem repliziert seine Protokolldateien zwischen zwei Servern. Ein Beispiel hierfür ist das [SQL Server Transaktionsprotokoll](<https://learn.microsoft.com/en-us/sql/relational-databases/logs/the-transaction-log-sql-server>).

Ein automatisches Failover erfordert eine synchrone Replikation. Andernfalls gehen die Daten der zuletzt bestätigten Transaktionen auf dem sekundären Server nach einem Failover verloren.

Diese Technik repliziert eine Datenbank, aber nicht die anderen Daten einer Anwendung. Das Failover vieler Anwendungen erfordert jedoch auch die Replikation anderer Daten, wie z. B. Konfigurationsdateien.

Wenn ein Server abstürzt und einige Datenbankdateien verliert, ist das Failback nicht automatisch. Ein erfahrener DBA muss die Datenbank auf dem ausgefallenen Server wiederherstellen.

### Was ist die Datenreplikationstechnik auf Festplattenebene? {#what-is-the-data-replication-technique-at-disk-level}

Die Änderungen innerhalb einer Festplatte werden zwischen zwei Servern repliziert. Ein Beispiel hierfür ist die [Open-Source-Software DRBD](<https://linbit.com/drbd/>).

Um Datenverluste bei einem automatischen Failover zu vermeiden, muss die Replikation zwischen den Datenträgern synchron erfolgen.

Diese Technik kann Datenbanken sowie andere Dateien replizieren. Sie hat jedoch einen starken Einfluss auf die Organisation von Anwendungsdaten. Alle Daten müssen auf der replizierten Festplatte gespeichert werden. Dies kann unmöglich sein, wenn sich einige zu replizierende Daten auf der Systemfestplatte befinden, da jeder Server seine eigene Systemfestplatte behalten muss.

Für die Konfiguration eines replizierten Datenträgers mit einem Dateisystem sind spezielle Kenntnisse erforderlich. Kenntnisse sind auch erforderlich, um die Anwendungsdaten auf den replizierten Datenträger zu verschieben.

### Was ist die Datenreplikationstechnik auf Dateiebene? {#what-is-the-data-replication-technique-at-file-level}

Die Änderungen in den Dateien werden zwischen zwei Servern repliziert. Ein Beispiel hierfür ist die [Hochverfügbarkeitssoftware SafeKit](</de/>).

Um Datenverluste bei automatischem Failover zu vermeiden, ist [eine synchrone Echtzeitreplikation](</de/best-practises/synchronous-replication-vs-asynchronous-replication/>) erforderlich.

Diese Technik kann Datenbanken sowie andere Dateien replizieren. Sie hat keine Auswirkungen auf die Datenorganisation einer Anwendung. Beispielsweise funktioniert die Echtzeit-Dateireplikation auch dann, wenn sich die Anwendungsdaten auf der Systemfestplatte befinden.

Die Lösung ist sehr einfach zu konfigurieren. Sie müssen lediglich die Pfade der zu replizierenden Verzeichnisse konfigurieren.

## Vergleichstabellen zwischen Datenreplikationstechniken {#comparative-tables-between-data-replication-techniques}


{{%  insert-safekit-mirror-comparison-table-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}