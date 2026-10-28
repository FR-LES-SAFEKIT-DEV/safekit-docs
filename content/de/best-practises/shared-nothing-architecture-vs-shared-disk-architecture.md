---
title: "Shared Nothing vs. Shared Disk Architecture: Auswahl des besten HA-Clusters"
canonical: "https://safekit.eviden.com/de/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/"
description: "Vergleichen Sie Shared-Nothing- und Shared-Disk-Architekturen für Hochverfügbarkeit. Erfahren Sie, wie SafeKit mit einem Shared-Nothing-Ansatz SAN-Kosten eliminiert, Failover vereinfacht und synchrone Replikation ohne komplexe Hardwarebeschränkungen ermöglicht."
category: "best-practises"
lang: "de"
topics: "Shared-Nothing-Architektur vs. Shared-Disk-Architektur für Hochverfügbarkeitscluster, Shared-Nothing-Architektur vs. Shared-Disk-Architektur: Vor- und Nachteile, 🔍 SafeKit Hochverfügbarkeits-Navigationshub"
---

# Shared Nothing vs. Shared Disk Architecture: Auswahl des besten HA-Clusters {#shared-nothing-vs-shared-disk-architecture-choosing-the-best-ha-cluster}

## Shared-Nothing-Architektur vs. Shared-Disk-Architektur für Hochverfügbarkeitscluster {#shared-nothing-architecture-vs-shared-disk-architecture-for-high-availability-clusters}

### Übersicht {#overview}

Dieser Artikel untersucht die Vor- und Nachteile von Shared-Nothing-Architekturen im Vergleich zu Shared-Disk-Architekturen für Hochverfügbarkeitscluster. Wir betrachten Hardwarebeschränkungen, Auswirkungen auf die Anwendungsdatenorganisation, Wiederherstellungszeiten und die Einfachheit der Implementierung.


![ Shared-Nothing-Architektur vs. Shared-Disk-Architektur ](/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png "w:200")


Die folgenden Vergleichstabellen erläutern detailliert den Unterschied zwischen einer Architektur mit gemeinsam genutzten Datenträgern und SafeKit , einem Software-Clustering-Produkt, das eine Architektur mit gemeinsam genutzten Datenträgern implementiert.

### Was ist eine gemeinsam genutzte Festplattenarchitektur? {#what-is-a-shared-disk-architecture}

Eine gemeinsam genutzte Festplattenarchitektur (wie beim Failovercluster [ Microsoft ](<https://learn.microsoft.com/en-us/windows-server/failover-clustering/clustering-requirements>) ) basiert darauf, dass sich 2 Server eine Festplatte teilen, wobei im Falle von Hardware- oder Softwarefehlern ein automatisches Anwendungs-Failover erfolgt.

Diese Architektur unterliegt Hardwarebeschränkungen: dem spezifischen externen gemeinsam genutzten Speicher, den spezifischen Karten, die in den Servern installiert werden müssen, und den spezifischen Switches zwischen den Servern und dem gemeinsam genutzten Speicher.

Eine gemeinsam genutzte Festplattenarchitektur hat einen starken Einfluss auf die Organisation der Anwendungsdaten. Alle Anwendungsdaten müssen nach einem Failover auf der gemeinsam genutzten Festplatte gespeichert sein, um einen Neustart zu ermöglichen.

Darüber hinaus muss im Falle eines Failovers die Dateisystemwiederherstellung auf der gemeinsam genutzten Festplatte ausgeführt werden. Dies verlängert die Wiederherstellungszeit (RTO).

Schließlich ist die Lösung nicht einfach zu konfigurieren, da Fachkenntnisse für die Einrichtung der spezifischen Hardware erforderlich sind. Zusätzlich werden Anwendungskenntnisse benötigt, um die Anwendungsdaten auf dem gemeinsam genutzten Datenträger zu konfigurieren.

### Was ist eine Shared-Nothing-Architektur? {#what-is-a-shared-nothing-architecture-}

Eine Shared-Nothing-Architektur (wie bei [ SafeKit ](</>) ) basiert auf 2 Servern, die Daten in Echtzeit replizieren, mit einem automatischen Anwendungs-Failover im Falle von Hardware- oder Softwarefehlern.

Es gibt zwei Arten der Datenreplikation: Byte-basierte Dateireplikation [ und Block-basierte Festplattenreplikation ](</de/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>) . Wir betrachten hier die Byte-basierte Dateireplikation, da sie gegenüber der Block-basierten Festplattenreplikation viele Vorteile bietet.

Die Shared-Nothing-Architektur kennt keine Hardwarebeschränkungen: Die Server können physisch oder virtuell sein und beliebige Festplattenstrukturen aufweisen. Die Echtzeit-Dateireplikation (synchron [ ](</de/best-practises/synchronous-replication-vs-asynchronous-replication/>) Datenverlust zu vermeiden) erfolgt über das Standardnetzwerk zwischen den Servern.

Diese Architektur hat keinen Einfluss auf die Datenorganisation der Anwendung. Befinden sich die Daten einer Anwendung beispielsweise auf der Systemfestplatte, funktioniert die Echtzeit-Dateireplikation.

Die Wiederherstellungszeit (RTO) im Falle eines Failovers reduziert sich auf die Neustartzeit der Anwendung auf den replizierten Dateien des sekundären Servers.

Schließlich ist die Lösung sehr einfach zu konfigurieren, da nur die Pfade der zu replizierenden Verzeichnisse konfiguriert werden müssen.

## Shared-Nothing-Architektur vs. Shared-Disk-Architektur: Vor- und Nachteile {#shared-nothing-architecture-vs-shared-disk-architecture-pros-and-cons}


{{%  insert-safekit-shared-nothing-vs-shared-disk-table-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}