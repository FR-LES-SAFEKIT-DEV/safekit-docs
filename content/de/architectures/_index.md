---
title: "SafeKit-Architekturen"
canonical: "https://safekit.eviden.com/de/architectures/"
description: "Entdecken Sie Hochverfügbarkeitsarchitekturen mit SafeKit. Erfahren Sie mehr über Mirror-, Farm- und Farm+Mirror-Cluster für SAN-loses Application-Failover und Lastverteilung."
category: "architectures"
lang: "de"
topics: "Welche Hochverfügbarkeitsarchitekturen und Software-Cluster gibt es mit SafeKit?, Wie erstellt man Hochverfügbarkeitscluster mit SafeKit?, 🔍 SafeKit-Navigationshub für Hochverfügbarkeit"
---

# SafeKit-Architekturen {#safekit-architectures}

## Welche Hochverfügbarkeitsarchitekturen und Software-Cluster gibt es mit SafeKit? {#what-are-the-different-high-availability-architectures-and-the-different-software-clusters-with-safekit}

### Mirror-Cluster {#mirror-cluster}


![SafeKit Mirror-Cluster](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


[Weitere Informationen](</architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### Farm-Cluster {#farm-cluster}


![SafeKit Farm-Cluster](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


[Weitere Informationen](</architectures/network-load-balancing-cluster/>)

### Farm+Mirror-Cluster {#farmmirror-cluster}


![SafeKit Farm+Mirror-Cluster](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


[Weitere Informationen](</architectures/clustering-software-load-balancing-mirroring/>)

### Active/Active-Cluster {#activeactive-cluster}


![SafeKit Active/Active-Cluster mit Echtzeitreplikation](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


[Weitere Informationen](</architectures/active-active-cluster-real-time-replication/>)

### N-1-Cluster {#n-1-cluster}


![SafeKit N-1-Redundanzcluster](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


[Weitere Informationen](</architectures/n-1-redundancy/>)

## Wie erstellt man Hochverfügbarkeitscluster mit SafeKit? {#how-to-build-high-availability-clusters-with-safekit}

### Hochverfügbarkeitsmodule verwenden {#use-high-availability-modules}

Ein Hochverfügbarkeitsmodul ist eine Anpassung von SafeKit für eine Anwendung. Es gibt zwei Modultypen: das Mirror-Modul mit Echtzeitdatenreplikation und Failover sowie das Farm-Modul mit Lastverteilung und Failover.

Wenn Sie ein Mirror-Modul auf zwei Servern einsetzen, erstellen Sie einen Mirror-Cluster. Wenn Sie ein Farm-Modul auf N Servern einsetzen, erstellen Sie einen Farm-Cluster.

Mehrere Anwendungsmodule können auf denselben Servern eingesetzt werden. So lassen sich fortgeschrittene Clusterarchitekturen wie die oben vorgestellten (Farm+Mirror, Active/Active, N-1) umsetzen.

### Was ist ein Anwendungsmodul? {#what-is-an-application-module}

Ein Anwendungsmodul ist praktisch eine „.Safe“-Datei (ZIP-Format) mit:

1 – der Konfigurationsdatei userconfig.xml mit:

  * Servernamen oder physischen IP-Adressen,
  * Clustername oder virtueller IP-Adresse,
  * Dateiverzeichnissen für die Echtzeitreplikation (bei einem Mirror-Modul),
  * Kriterien für die Netzwerk-Lastverteilung (bei einem Farm-Modul),
  * Konfiguration der Erkennung von Software- und Hardwareausfällen


2 – den Skripten zum Starten und Beenden der Anwendung.

### Plug-and-Play-Bereitstellung von Hochverfügbarkeitsmodulen {#plug-and-play-deployment-of-high-availability-modules}

Sobald ein Anwendungsmodul konfiguriert und mit einer Anwendung getestet wurde, ist für die Bereitstellung kein spezielles IT-Fachwissen erforderlich:

  1. Installieren Sie die Anwendung auf zwei Standardservern (physisch oder virtuell).
  2. Installieren Sie die SafeKit-Software auf beiden Servern.
  3. Installieren Sie das Anwendungsmodul auf beiden Servern.



{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}