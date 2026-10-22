---
title: "Hochverfügbarkeitsarchitekturen und Best Practices für Software-Cluster"
canonical: "https://safekit.eviden.com/de/best-practises/high-availability-architectures-and-best-practices/"
description: "Entdecken Sie Hochverfügbarkeitsarchitekturen (HA) und Best Practices für Anwendungscluster. Erfahren Sie, wie SafeKit Mirror- und Farm-Cluster ohne gemeinsam genutzte Datenträger implementiert und so Datenverlust verhindert und automatischer Failover für kritische Anwendungen ermöglicht wird."
category: "best-practises"
lang: "de"
topics: "Welche Hochverfügbarkeitsarchitekturen und Best Practices gibt es?, Vergleichstabellen zu Hochverfügbarkeitsarchitekturen und Best Practices, SafeKit-Navigationsübersicht zur Hochverfügbarkeit"
---

# Hochverfügbarkeitsarchitekturen und Best Practices für Software-Cluster {#high-availability-architectures--software-clustering-best-practices}

## Welche Hochverfügbarkeitsarchitekturen und Best Practices gibt es? {#what-are-the-high-availability-architectures-and-the-best-practices}

### Überblick {#overview}

Dieser Artikel stellt verschiedene Hochverfügbarkeitsarchitekturen und Best Practices vor und vergleicht ihre jeweiligen Vor- und Nachteile.

![Hochverfügbarkeitsarchitekturen und Best Practices](/wp-content/uploads/2023/03/high-availability-architectures-and-best-practices.png "w:400")

Die folgenden Vergleichstabellen erläutern die SafeKit-Hochverfügbarkeitsarchitektur und ihre Best Practices. SafeKit ist eine Software für Hochverfügbarkeit.

### Welche Hochverfügbarkeitsarchitekturen gibt es? {#what-are-the-high-availability-architectures}

Es gibt zwei Arten von [Hochverfügbarkeitsarchitekturen](<https://www.techtarget.com/it-infrastructure/definition/What-is-high-availability-HA-Definition-and-guide>): für Backend-Anwendungen wie Datenbanken und für Frontend-Anwendungen wie Webdienste.

Backend-Architekturen basieren auf zwei Servern, die Daten gemeinsam nutzen oder replizieren und bei Hardware- oder Softwarefehlern automatisch einen Anwendungs-Failover ausführen.

Frontend-Architekturen basieren auf einer Serverfarm mit mindestens zwei Servern. Hardware- oder Software-Load-Balancing verteilt TCP-Sitzungen auf die verfügbaren Server.

Außerdem muss zwischen Hochverfügbarkeit auf Anwendungs- und auf virtueller Maschinenebene gewählt werden.

### Welche Best Practices gibt es? {#what-are-the-best-practices}

Dieser Artikel vergleicht Best Practices für Hochverfügbarkeitsarchitekturen in folgenden Bereichen:

  * [Software- und Hardware-Clustering](</de/best-practises/clustering-software-vs-hardware-clustering/>),
  * [Shared-Nothing- und Shared-Disk-Architektur](</de/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/>),
  * [Hochverfügbarkeit auf Anwendungs- und VM-Ebene](</de/best-practises/vm-ha-vs-application-ha/>),
  * [Hochverfügbarkeit und Fehlertoleranz](</de/best-practises/high-availability-cluster-vs-fault-tolerant-system/>),
  * [synchrone und asynchrone Replikation](</de/best-practises/synchronous-replication-vs-asynchronous-replication/>),
  * [Datei- und Festplattenreplikation](</de/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>),
  * [Datenreplikationstechniken](</de/best-practises/data-replication-techniques/>),
  * [RPO und RTO anhand von Beispielen](</de/best-practises/what-is-rpo-and-rto-with-examples/>),
  * [Split-Brain und Quorum](</de/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>),
  * [virtuelle IP-Adressen](</de/best-practises/how-a-virtual-ip-address-works/>).

## Vergleichstabellen zu Hochverfügbarkeitsarchitekturen und Best Practices {#comparative-tables-on-high-availability-architectures-and-best-practices}

{{% insert-safekit-software-vs-hardware-table-de %}}

{{% insert-safekit-hub-de %}}

{{% insert-safekit-4-buttons-de %}}