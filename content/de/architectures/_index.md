---
title: "SafeKit -Architekturen"
canonical: "https://safekit.eviden.com/de/architectures/"
description: "Erkunden Sie Hochverfügbarkeitsarchitekturen mit SafeKit . Erfahren Sie mehr über Mirror , Farm und Farm + Mirror -Cluster für SAN-loses Anwendungs-Failover und Lastausgleich."
category: "architectures"
lang: "de"
topics: "Welche verschiedenen Hochverfügbarkeitsarchitekturen und Softwarecluster gibt es mit SafeKit ? Wie erstellt man Hochverfügbarkeitscluster mit SafeKit ? 🔍 SafeKit Hochverfügbarkeits-Navigationszentrale"
---

# SafeKit Architekturen {#safekit-architectures}

## Welche verschiedenen Hochverfügbarkeitsarchitekturen und Softwarecluster gibt es mit SafeKit ? {#what-are-the-different-high-availability-architectures-and-the-different-software-clusters-with-safekit}

### Mirror Cluster {#mirror-cluster}


![ ](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300") SafeKit Cluster mirror


[ Weitere Informationen ](</de/architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### `Farm` Cluster {#farm-cluster}


![ ](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300") SafeKit Cluster farm


[ Weitere Informationen ](</de/architectures/network-load-balancing-cluster/>)

### `Farm` + mirror Cluster {#farmmirror-cluster}


![ farm SafeKit + mirror Cluster ](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


[ Weitere Informationen ](</architectures/clustering-software-load-balancing-mirroring/>)

### Aktiv/Aktiv-Cluster {#activeactive-cluster}


![ SafeKit aktiver aktiver Cluster mit Echtzeitreplikation ](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


[ Weitere Informationen ](</architectures/active-active-cluster-real-time-replication/>)

### N-1 Cluster {#n-1-cluster}


![ SafeKit N-1 Redundanzcluster ](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


[ Weitere Informationen ](</architectures/n-1-redundancy/>)

## Wie baut man Hochverfügbarkeitscluster mit SafeKit ? {#how-to-build-high-availability-clusters-with-safekit}

### Verwenden Sie die hochverfügbaren Module {#use-high-availability-modules}

Ein Hochverfügbarkeitsmodul ist eine anwendungsspezifische Anpassung von SafeKit . Es gibt zwei Modultypen: das Modul mirror mit Echtzeit-Datenreplikation und Failover sowie das Modul `farm` mit Lastausgleich und Failover.

Wenn Sie ein mirror -Modul auf 2 Servern bereitstellen, erstellen Sie einen mirror Cluster, und wenn Sie ein `farm` Modul auf N Servern bereitstellen, erstellen Sie einen `farm` Cluster.

Mehrere Anwendungsmodule können auf denselben Servern bereitgestellt werden. Dadurch lassen sich fortgeschrittene Clusterarchitekturen wie die zuvor vorgestellten implementieren ( `farm` + mirror , aktiv/aktiv, N-1).

### Was ist ein Anwendungsmodul? {#what-is-an-application-module}

In der Praxis ist ein Anwendungsmodul eine „.Safe“-Datei (ZIP-Datei) mit folgendem Inhalt:

1 - die Konfigurationsdatei userconfig.xml die Folgendes enthält:

  * Namen oder physische IP-Adressen der Server,
  * Name oder virtuelle IP-Adresse des Clusters,
  * Dateiverzeichnisse, die in Echtzeit repliziert werden sollen (für ein mirror -Modul),
  * Kriterien für den Netzwerklastausgleich (für ein `farm` -Modul),
  * Konfiguration von Software- und Hardware-Fehlerdetektoren


2 - die Skripte zum Starten und Stoppen der Anwendung.

### Plug-and-Play-Bereitstellung von Hochverfügbarkeitsmodulen {#plug-and-play-deployment-of-high-availability-modules}

Sobald ein Anwendungsmodul konfiguriert und mit einer Anwendung getestet wurde, sind für die Bereitstellung keine besonderen IT-Kenntnisse mehr erforderlich:

  1. Installation der Anwendung auf 2 Standardservern (physisch oder virtuell).
  2. Installieren Sie die Software SafeKit auf beiden Servern.
  3. Installieren Sie das Anwendungsmodul auf beiden Servern.



{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}