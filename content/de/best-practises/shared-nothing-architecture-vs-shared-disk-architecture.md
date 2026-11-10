---
title: "Shared-Nothing- vs. Shared-Disk-Architektur: Auswahl des besten HA-Clusters"
canonical: "https://safekit.eviden.com/de/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/"
description: "Vergleichen Sie Shared-Nothing mit Shared-Disk-Architekturen für Hochverfügbarkeit. Erfahren Sie, wie SafeKit einen Shared-Nothing-Ansatz verwendet, um SAN-Kosten zu eliminieren, Failover zu vereinfachen und synchrone Replikation ohne komplexe Hardwarebeschränkungen bereitzustellen."
category: "best-practises"
lang: "de"
topics: "Shared-Nothing-Architektur vs. Shared-Disk-Architektur für Hochverfügbarkeitscluster, Shared-Nothing-Architektur vs. Shared-Disk-Architektur: Vor- und Nachteile, 🔍 SafeKit entdecken"
translation: "translate_md 2026-11-10.3 | glossaire 2026-11-10.4 | Translation LLM | 47 expressions"
---

# Shared-Nothing- vs. Shared-Disk-Architektur: Auswahl des besten HA-Clusters {#shared-nothing-vs-shared-disk-architecture-choosing-the-best-ha-cluster}

## Shared-Nothing-Architektur vs. Shared-Disk-Architektur für Hochverfügbarkeitscluster {#shared-nothing-architecture-vs-shared-disk-architecture-for-high-availability-clusters}

### Übersicht {#overview}

Dieser Artikel untersucht die Vor- und Nachteile der Shared-Nothing-Architektur im Vergleich zur Shared-Disk-Architektur für Hochverfügbarkeitscluster. Dabei werden Hardwarebeschränkungen, Auswirkungen auf die Organisation von Anwendungsdaten, Wiederherstellungszeit und die Einfachheit der Implementierung betrachtet.


![Shared-Nothing-Architektur vs. Shared-Disk-Architektur](/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png "w:200")


Die folgenden Vergleichstabellen erläutern detailliert den Unterschied zwischen Shared-Disk-Architektur und SafeKit, einem Software-Clustering-Produkt, das eine Shared-Nothing-Architektur implementiert.

### Was ist eine Shared-Disk-Architektur? {#what-is-a-shared-disk-architecture}

Eine Shared-Disk-Architektur (wie bei [Microsoft Failover-Cluster](<https://learn.microsoft.com/en-us/windows-server/failover-clustering/clustering-requirements>)) basiert auf zwei Servern, die sich eine Festplatte teilen, mit einem automatischen Anwendungsfailover im Falle von Hardware- oder Softwarefehlern.

Diese Architektur hat Hardware-Einschränkungen: den spezifischen externen Shared Storage, die spezifischen Karten, die in den Servern installiert werden müssen, und die spezifischen Switches zwischen den Servern und dem Shared Storage.

Eine Shared-Disk-Architektur hat einen starken Einfluss auf die Organisation von Anwendungsdaten. Alle Anwendungsdaten müssen für einen Neustart nach einem Failover auf der gemeinsam genutzten Festplatte lokalisiert werden.

Darüber hinaus muss bei einem Failover der Wiederherstellungsvorgang des Dateisystems auf der gemeinsam genutzten Festplatte ausgeführt werden. Dies erhöht die Wiederherstellungszeit (RTO).

Schließlich ist die Lösung nicht einfach zu konfigurieren, da für die Konfiguration der spezifischen Hardware Kenntnisse erforderlich sind. Darüber hinaus sind Anwendungskenntnisse erforderlich, um Anwendungsdaten auf der gemeinsam genutzten Festplatte zu konfigurieren.

### Was ist eine Shared-Nothing-Architektur? {#what-is-a-shared-nothing-architecture-}

Eine Shared-Nothing-Architektur (wie bei [SafeKit](</de/>)) basiert auf zwei Servern, die Daten in Echtzeit replizieren, mit einem automatischen Anwendungs-Failover im Falle von Hardware- oder Softwarefehlern.

Es gibt zwei Arten der Datenreplikation: [Dateireplikation auf Byte-Ebene und Festplattenreplikation auf Blockebene](</de/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>). Wir betrachten hier die Dateireplikation auf Byte-Ebene, da sie viele Vorteile gegenüber der Festplattenreplikation auf Blockebene hat.

Die Shared-Nothing-Architektur hat keine Hardware-Einschränkungen: Die Server können physisch oder virtuell sein und jede Art von Festplattenorganisation aufweisen. Die Echtzeit-Dateireplikation ([synchron](</de/best-practises/synchronous-replication-vs-asynchronous-replication/>) für null Datenverlust) erfolgt über das Standardnetzwerk zwischen den Servern.

Diese Architektur hat keine Auswirkungen auf die Organisation von Anwendungsdaten. Wenn eine Anwendung beispielsweise ihre Daten auf der Systemfestplatte hat, funktioniert die Echtzeit-Dateireplikation.

Die Wiederherstellungszeit (RTO) im Falle eines Failovers wird auf die Neustartzeit der Anwendung auf den replizierten Dateien des sekundären Servers reduziert.

Schließlich ist die Lösung sehr einfach zu konfigurieren, da nur die Pfade der zu replizierenden Verzeichnisse konfiguriert werden.

## Shared-Nothing-Architektur vs. Shared-Disk-Architektur: Vor- und Nachteile {#shared-nothing-architecture-vs-shared-disk-architecture-pros-and-cons}


{{%  insert-safekit-shared-nothing-vs-shared-disk-table-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}