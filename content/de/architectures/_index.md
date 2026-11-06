---
title: "SafeKit-Architekturen"
canonical: "https://safekit.eviden.com/de/architectures/"
description: "Entdecken Sie Hochverfügbarkeitsarchitekturen mit SafeKit. Erfahren Sie mehr über Mirror, Farm und Farm + Mirror-Cluster für SANless-Anwendungsfailover und Lastausgleich."
category: "architectures"
lang: "de"
topics: "Welche verschiedenen Hochverfügbarkeitsarchitekturen und Softwarecluster gibt es mit SafeKit?, Wie baut man Hochverfügbarkeitscluster mit SafeKit?, 🔍 SafeKit Hochverfügbarkeits-Navigations-Hub"
translation: "translate_md 2026-11-06.18 | glossaire 2026-11-06.13 | Translation LLM | 22 expressions"
---

# SafeKit-Architekturen {#safekit-architectures}

## Welche verschiedenen Hochverfügbarkeitsarchitekturen und Softwarecluster gibt es mit SafeKit? {#what-are-the-different-high-availability-architectures-and-the-different-software-clusters-with-safekit}

### Mirror-Cluster {#mirror-cluster}


![SafeKit Mirror-Cluster](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


[Mehr Informationen](</de/architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### <span class="notranslate farm-term" translate="no">Farm</span>-Cluster {#farm-cluster}


![SafeKit- Farm-Cluster](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


[Mehr Informationen](</de/architectures/network-load-balancing-cluster/>)

### <span class="notranslate farm-term" translate="no">Farm</span> + Mirror-Cluster {#farmmirror-cluster}


![SafeKit farm + Mirror-Cluster](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


[Mehr Informationen](</de/architectures/clustering-software-load-balancing-mirroring/>)

### Aktiv/aktiv-Cluster {#activeactive-cluster}


![SafeKit Aktiv-Aktiv-Cluster mit Echtzeit-Replikation](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


[Mehr Informationen](</de/architectures/active-active-cluster-real-time-replication/>)

### N-1-Cluster {#n-1-cluster}


![SafeKit N-1 Redundanzcluster](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


[Mehr Informationen](</de/architectures/n-1-redundancy/>)

## Wie baut man Hochverfügbarkeitscluster mit SafeKit? {#how-to-build-high-availability-clusters-with-safekit}

### Anwendungsmodule verwenden {#use-high-availability-modules}

Ein Anwendungsmodul ist eine Anpassung von SafeKit für eine Anwendung. Es gibt zwei Arten von Modulen: das mirror-Modul mit Echtzeit-Datenreplikation und Failover und das <span class="notranslate farm-term" translate="no">farm</span>-Modul mit Lastausgleich und Failover.

Wenn Sie ein mirror-Modul auf 2 Servern bereitstellen, erstellen Sie einen Mirror-Cluster, und wenn Sie ein <span class="notranslate farm-term" translate="no">farm</span>-Modul auf N Servern bereitstellen, erstellen Sie einen <span class="notranslate farm-term" translate="no">Farm</span>-Cluster.

Mehrere Anwendungsmodule können auf denselben Servern bereitgestellt werden. So können erweiterte Cluster-Architekturen implementiert werden, wie die zuvor vorgestellten (<span class="notranslate farm-term" translate="no">farm</span> + mirror, Active/Active, N-1).

### Was ist ein Anwendungsmodul? {#what-is-an-application-module}

In der Praxis ist ein Anwendungsmodul eine „.Safe“-Datei (Zip-Typ), die Folgendes enthält:

1 – die Konfigurationsdatei userconfig.xml, die Folgendes enthält:

  * virtuelle IP-Adresse des Clusters,
  * Dateiverzeichnisse, die in Echtzeit repliziert werden sollen (für ein mirror-Modul),
  * Kriterien für den Netzwerklastenausgleich (für ein <span class="notranslate farm-term" translate="no">farm</span>-Modul)
  * Konfiguration von Software- und Hardwarefehlerdetektoren


2 – die Skripte zum Starten und Stoppen der Anwendung.

### Plug-and-Play-Bereitstellung von Anwendungsmodulen {#plug-and-play-deployment-of-high-availability-modules}

Sobald ein Anwendungsmodul konfiguriert und mit einer Anwendung getestet wurde, erfordert die Bereitstellung keine speziellen IT-Kenntnisse:

  1. Installieren Sie die Anwendung auf 2 Standardservern (physisch oder virtuell)
  2. Installieren Sie die SafeKit-Software auf beiden Servern
  3. Installieren Sie das Anwendungsmodul auf beiden Servern.



{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}