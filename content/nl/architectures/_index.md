---
title: "SafeKit-architecturen"
canonical: "https://safekit.eviden.com/nl/architectures/"
description: "Ontdek architecturen met hoge beschikbaarheid met SafeKit. Leer meer over Mirror, Farm en Farm + mirror-clusters voor SANless-applicatieoverdracht en taakverdeling."
category: "architectures"
lang: "nl"
topics: "Wat zijn de verschillende high-availability-architecturen en de verschillende softwareclusters met SafeKit?, Hoe bouw je high-availability-clusters met SafeKit?, 🔍 Ontdek SafeKit"
translation: "translate_md 2026-11-06.18 | glossaire 2026-11-06.13 | Translation LLM | 21 expressions"
---

# SafeKit-architecturen {#safekit-architectures}

## Wat zijn de verschillende high-availability-architecturen en de verschillende softwareclusters met SafeKit? {#what-are-the-different-high-availability-architectures-and-the-different-software-clusters-with-safekit}

### Mirror-cluster {#mirror-cluster}


![SafeKit mirror-cluster](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


[Meer informatie](</nl/architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### <span class="notranslate farm-term" translate="no">Farm</span>-cluster {#farm-cluster}


![SafeKit farm-cluster](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


[Meer informatie](</nl/architectures/network-load-balancing-cluster/>)

### <span class="notranslate farm-term" translate="no">Farm</span> + mirror-cluster {#farmmirror-cluster}


![SafeKit farm + mirror-cluster](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


[Meer informatie](</nl/architectures/clustering-software-load-balancing-mirroring/>)

### Actief/actief-cluster {#activeactive-cluster}


![SafeKit actief-actiefcluster met realtime replicatie](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


[Meer informatie](</nl/architectures/active-active-cluster-real-time-replication/>)

### N-1-cluster {#n-1-cluster}


![SafeKit N-1 redundantiecluster](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


[Meer informatie](</nl/architectures/n-1-redundancy/>)

## Hoe bouw je clusters met hoge beschikbaarheid met SafeKit? {#how-to-build-high-availability-clusters-with-safekit}

### Toepassingsmodules gebruiken {#use-high-availability-modules}

Een applicatiemodule is een aanpassing van SafeKit voor een applicatie. Er zijn twee soorten modules: de mirror-module met realtime gegevensreplicatie en failover en de <span class="notranslate farm-term" translate="no">farm</span>-module met load balancing en failover.

Als u een mirror-module op 2 servers implementeert, maakt u een mirror-cluster en als u een <span class="notranslate farm-term" translate="no">farm</span>-module op N servers implementeert, maakt u een <span class="notranslate farm-term" translate="no">farm</span>-cluster.

Verschillende applicatiemodules kunnen op dezelfde servers worden geïmplementeerd. Zo kunnen geavanceerde clusterarchitecturen worden geïmplementeerd, zoals de eerder gepresenteerde (<span class="notranslate farm-term" translate="no">farm</span> + mirror, actief/actief, N-1).

### Wat is een applicatiemodule? {#what-is-an-application-module}

In de praktijk is een applicatiemodule een ".Safe"-bestand (zip-type) dat het volgende bevat:

1 - het configuratiebestand userconfig.xml, dat het volgende bevat:

  * het virtuele IP-adres van het cluster,
  * bestandsmappen die in realtime moeten worden gerepliceerd (voor een mirror-module),
  * criteria voor netwerkbelastingsverdeling (voor een <span class="notranslate farm-term" translate="no">farm</span>-module),
  * configuratie van software- en hardwarefoutdetectoren


2 - de scripts om de toepassing te starten en te stoppen.

### Plug-and-play-implementatie van applicatiemodules {#plug-and-play-deployment-of-high-availability-modules}

Zodra een applicatiemodule is geconfigureerd en getest met een applicatie, zijn er voor de implementatie geen specifieke IT-vaardigheden vereist:

  1. installeer de applicatie op 2 standaardservers (fysiek of virtueel),
  2. installeer de SafeKit-software op beide servers,
  3. Installeer de applicatiemodule op beide servers.



{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}