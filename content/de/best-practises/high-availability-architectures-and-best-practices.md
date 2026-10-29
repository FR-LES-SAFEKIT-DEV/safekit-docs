---
title: "Hochverfügbarkeitsarchitekturen und Best Practices für Software-Clustering"
canonical: "https://safekit.eviden.com/de/best-practises/high-availability-architectures-and-best-practices/"
description: "Entdecken Sie Hochverfügbarkeitsarchitekturen (HA) und Best Practices für Anwendungsclustering. Erfahren Sie, wie SafeKit -Software mirror und farm -Cluster ohne gemeinsam genutzte Festplatten implementiert und so Datenverlustfreiheit und automatisches Failover für kritische Anwendungen gewährleistet."
category: "best-practises"
lang: "de"
topics: "Welche Architekturen für Hochverfügbarkeit gibt es und welche Best Practices gelten? Vergleichstabellen zu Architekturen für Hochverfügbarkeit und Best Practices, 🔍 SafeKit Navigationszentrale für Hochverfügbarkeit"
---

# Hochverfügbarkeitsarchitekturen und Best Practices für Software-Clustering {#high-availability-architectures--software-clustering-best-practices}

## Welche Architekturen für Hochverfügbarkeit gibt es und welche Best Practices werden angewendet? {#what-are-the-high-availability-architectures-and-the-best-practices}

### Übersicht {#overview}

Dieser Artikel untersucht die verschiedenen Hochverfügbarkeitsarchitekturen und die besten Vorgehensweisen, indem er die Vor- und Nachteile jeder Architektur aufzeigt.


![ Hochverfügbarkeitsarchitekturen und Best Practices ](/wp-content/uploads/2023/03/high-availability-architectures-and-best-practices.png "w:400")


Die folgenden Vergleichstabellen erläutern detailliert die Hochverfügbarkeitsarchitektur SafeKit und ihre Best Practices ( SafeKit ist ein Software-Hochverfügbarkeitsprodukt).

### Welche Architekturen gibt es für hohe Verfügbarkeit? {#what-are-the-high-availability-architectures}

Es gibt zwei Arten von [ ](<https://www.techtarget.com/it-infrastructure/definition/What-is-high-availability-HA-Definition-and-guide>) : solche für Backend-Anwendungen wie Datenbanken und solche für Frontend-Anwendungen wie Webdienste.

Hochverfügbarkeitsarchitekturen für das Backend basieren auf zwei Servern, die Daten gemeinsam nutzen oder replizieren, wobei im Falle von Hardware- oder Softwarefehlern ein automatisches Anwendungs-Failover erfolgt.

Hochverfügbarkeitsarchitekturen für das Frontend basieren auf einer Serveranzahl von <span class="notranslate farm-term" translate="no">farm</span> (mindestens zwei Server). Der Lastausgleich erfolgt hardware- oder softwareseitig und verteilt die TCP-Sitzungen auf die verfügbaren Server in farm .

Darüber hinaus müssen Sie sich zwischen Hochverfügbarkeit auf Anwendungsebene oder auf Ebene der virtuellen Maschine entscheiden.

### Was sind die besten Vorgehensweisen? {#what-are-the-best-practices}

Dieser Artikel untersucht die Best Practices für Hochverfügbarkeitsarchitekturen durch einen Vergleich:

  * [ Software- vs. Hardware-Clustering ](</de/best-practises/clustering-software-vs-hardware-clustering/>) ,
  * [ Shared-Nothing-Architektur vs. Shared-Disk-Architektur ](</de/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/>) ,
  * [ -Anwendung vs. Hochverfügbarkeit der virtuellen Maschine ](</de/best-practises/vm-ha-vs-application-ha/>) ,
  * [ Hochverfügbarkeit vs. Fehlertoleranz ](</de/best-practises/high-availability-cluster-vs-fault-tolerant-system/>) ,
  * [ synchrone vs. asynchrone Replikation ](</de/best-practises/synchronous-replication-vs-asynchronous-replication/>) ,
  * [ Datei vs. Festplattenreplikation ](</de/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>) ,
  * [ Datenreplikationstechniken ](</de/best-practises/data-replication-techniques/>) ,
  * [ RPO und RTO mit Beispielen ](</de/best-practises/what-is-rpo-and-rto-with-examples/>) ,
  * [ split brain ans quorum ](</de/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) ,
  * [ virtuelle IP-Adressen ](</de/best-practises/how-a-virtual-ip-address-works/>) .


## Vergleichstabellen zu Hochverfügbarkeitsarchitekturen und Best Practices {#comparative-tables-on-high-availability-architectures-and-best-practices}


{{%  insert-safekit-software-vs-hardware-table-de  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}