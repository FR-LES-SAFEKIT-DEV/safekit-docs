---
title: "Shared-Nothing- vs. Shared-Disk-Architektur: Auswahl des besten HA-Clusters"
canonical: "https://safekit.eviden.com/de/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/"
description: "Shared-Nothing- vs. Shared-Disk-Architektur für Hochverfügbarkeit: Wie SafeKit Daten zwischen Servern repliziert, um SAN-Kosten zu vermeiden und Failover zu vereinfachen."
category: "best-practises"
lang: "de"
topics: "Shared-Nothing-Architektur vs. Shared-Disk-Architektur für Hochverfügbarkeitscluster, Shared-Nothing-Architektur vs. Shared-Disk-Architektur: Vor- und Nachteile, 🔍 SafeKit entdecken"
translation: "translate_md 2026-11-20.7 | glossaire 2026-11-20.14 | Translation LLM | 54 expressions"
image: "/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png"
schemaType: "TechArticle"
---

# Shared-Nothing- vs. Shared-Disk-Architektur: Auswahl des besten HA-Clusters {#shared-nothing-vs-shared-disk-architecture-choosing-the-best-ha-cluster}

## Shared-Nothing-Architektur vs. Shared-Disk-Architektur für Hochverfügbarkeitscluster {#shared-nothing-architecture-vs-shared-disk-architecture-for-high-availability-clusters}

### Übersicht {#overview}

Dieser Artikel vergleicht zwei Architekturen für Hochverfügbarkeitscluster: die Shared-Nothing-Architektur und die Shared-Disk-Architektur. Er erläutert deren Vor- und Nachteile. Er behandelt Hardwarebeschränkungen, die Auswirkungen auf die Organisation von Anwendungsdaten, die Wiederherstellungszeit und die Einfachheit der Implementierung.


![Shared-Nothing-Architektur vs. Shared-Disk-Architektur](/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png "w:200")


Die folgenden Vergleichstabellen zeigen die Unterschiede zwischen einer Shared-Disk-Architektur und SafeKit. Dieses Software-Clustering-Produkt implementiert eine Shared-Nothing-Architektur.

### Was ist eine Shared-Disk-Architektur? {#what-is-a-shared-disk-architecture}

Eine Shared-Disk-Architektur basiert auf zwei Servern, die sich eine Festplatte teilen. Im Falle eines Hardware- oder Softwarefehlers wird die Anwendung automatisch auf dem anderen Server neu gestartet. Microsoft Failover Clustering ist ein Beispiel für eine Shared-Disk-Architektur. Weitere Informationen finden Sie unter [Hardwareanforderungen für Failoverclustering](<https://learn.microsoft.com/en-us/windows-server/failover-clustering/clustering-requirements>).

Diese Architektur hat Hardware-Einschränkungen: spezifische externe gemeinsam genutzte Speicher, spezifische Karten in den Servern und spezifische Switches zwischen den Servern und dem gemeinsam genutzten Speicher.

Eine Shared-Disk-Architektur hat einen starken Einfluss auf die Organisation von Anwendungsdaten. Alle Anwendungsdaten müssen sich auf der gemeinsam genutzten Festplatte befinden, damit die Anwendung nach einem Failover neu gestartet werden kann.

Darüber hinaus muss bei einem Failover ein Dateisystemwiederherstellungsvorgang auf der gemeinsam genutzten Festplatte ausgeführt werden. Dies erhöht das Wiederherstellungszeitziel (RTO).

Schließlich ist die Lösung nicht einfach zu konfigurieren. Für die Konfiguration der spezifischen Hardware sind Hardwarekenntnisse erforderlich. Anwendungskenntnisse sind ebenfalls erforderlich, um Anwendungsdaten auf der gemeinsam genutzten Festplatte abzulegen.

### Was ist eine Shared-Nothing-Architektur? {#what-is-a-shared-nothing-architecture-}

Eine Shared-Nothing-Architektur basiert auf zwei Servern, die Daten in Echtzeit replizieren. Im Falle eines Hardware- oder Softwarefehlers startet die Anwendung automatisch auf dem anderen Server neu. SafeKit ist ein Beispiel für eine Shared-Nothing-Architektur.

Es gibt zwei Arten der Datenreplikation: Dateireplikation auf Byte-Ebene und Festplattenreplikation auf Blockebene. Weitere Informationen finden Sie unter [Dateireplikation auf Byte-Ebene vs. Festplattenreplikation auf Blockebene](</de/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>). Dieser Artikel befasst sich mit der Dateireplikation auf Byte-Ebene, da sie viele Vorteile gegenüber der Festplattenreplikation auf Blockebene hat.

Die Shared-Nothing-Architektur hat keine Hardware-Einschränkungen. Die Server können physisch oder virtuell sein, mit jeder Art von Festplattenorganisation. Die Echtzeit-Dateireplikation läuft über das Standardnetzwerk zwischen den Servern. [Die synchrone Replikation](</de/best-practises/synchronous-replication-vs-asynchronous-replication/>) gewährleistet keinen Datenverlust.

Diese Architektur hat keine Auswirkungen auf die Organisation von Anwendungsdaten. Beispielsweise funktioniert die Echtzeit-Dateireplikation auch dann, wenn sich die Anwendungsdaten auf der Systemfestplatte befinden.

Im Falle eines Failovers wird das Wiederherstellungszeit-Ziel (RTO) auf die Anwendungsneustartzeit reduziert. Die Anwendung wird auf den replizierten Dateien des sekundären Servers neu gestartet.

Schließlich ist die Lösung sehr einfach zu konfigurieren. Sie müssen lediglich die Pfade der zu replizierenden Verzeichnisse konfigurieren.

## Shared-Nothing-Architektur vs. Shared-Disk-Architektur: Vor- und Nachteile {#shared-nothing-architecture-vs-shared-disk-architecture-pros-and-cons}


{{%  insert-safekit-shared-nothing-vs-shared-disk-table-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}