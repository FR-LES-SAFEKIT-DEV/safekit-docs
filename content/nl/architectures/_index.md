---
title: "SafeKit -architecturen"
canonical: "https://safekit.eviden.com/nl/architectures/"
description: "Ontdek architecturen met hoge beschikbaarheid met SafeKit . Leer meer over Mirror , Farm en Farm + Mirror -clusters voor SAN-loze applicatiefailover en load balancing."
category: "architectures"
lang: "nl"
topics: "Wat zijn de verschillende architecturen voor hoge beschikbaarheid en de verschillende softwareclusters met SafeKit ? Hoe bouw je clusters voor hoge beschikbaarheid met SafeKit ? 🔍 SafeKit Navigatiehub voor hoge beschikbaarheid"
---

# SafeKit -architecturen {#safekit-architectures}

## Wat zijn de verschillende architecturen voor hoge beschikbaarheid en de verschillende softwareclusters met SafeKit ? {#what-are-the-different-high-availability-architectures-and-the-different-software-clusters-with-safekit}

### Mirror cluster {#mirror-cluster}


![ SafeKit mirror cluster ](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


[ Meer informatie ](</nl/architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### `Farm` cluster {#farm-cluster}


![ SafeKit farm cluster ](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


[ Meer informatie ](</nl/architectures/network-load-balancing-cluster/>)

### `Farm` + mirror cluster {#farmmirror-cluster}


![ farm SafeKit + mirror cluster ](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


[ Meer informatie ](</nl/architectures/clustering-software-load-balancing-mirroring/>)

### Actief/actief cluster {#activeactive-cluster}


![ SafeKit actief actief cluster met realtime replicatie ](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


[ Meer informatie ](</nl/architectures/active-active-cluster-real-time-replication/>)

### N-1 cluster {#n-1-cluster}


![ SafeKit N-1 redundantiecluster ](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


[ Meer informatie ](</nl/architectures/n-1-redundancy/>)

## Hoe bouw je clusters met hoge beschikbaarheid met SafeKit ? {#how-to-build-high-availability-clusters-with-safekit}

### Gebruik modules met hoge beschikbaarheid {#use-high-availability-modules}

Een module voor hoge beschikbaarheid is een aanpassing van SafeKit voor een specifieke toepassing. Er zijn twee typen modules: de mirror -module met realtime datareplicatie en failover, en de `farm` -module met load balancing en failover.

Als u een mirror -module op 2 servers implementeert, creëert u een mirror cluster, en als u een `farm` module op N servers implementeert, creëert u een `farm` cluster.

Meerdere applicatiemodules kunnen op dezelfde servers worden geïmplementeerd. Hierdoor kunnen geavanceerde clusteringarchitecturen worden gerealiseerd, zoals de eerder gepresenteerde ( `farm` + mirror , actief/actief, N-1).

### Wat is een applicatiemodule? {#what-is-an-application-module}

In de praktijk is een applicatiemodule een ".Safe"-bestand (zip-bestand) dat het volgende bevat:

1 - het configuratiebestand userconfig.xml dat het volgende bevat:

  * namen of fysieke IP-adressen van de servers,
  * naam of virtueel IP-adres van het cluster,
  * bestandsmappen die in realtime moeten worden gerepliceerd (voor een mirror -module),
  * criteria voor netwerkbelastingverdeling (voor een `farm` -module),
  * configuratie van software- en hardwarefoutdetectoren


2 - de scripts om de applicatie te starten en te stoppen.

### Plug-and-play implementatie van modules met hoge beschikbaarheid {#plug-and-play-deployment-of-high-availability-modules}

Zodra een applicatiemodule is geconfigureerd en getest met een applicatie, zijn er geen specifieke IT-vaardigheden nodig voor de implementatie:

  1. Installeer de applicatie op 2 standaardservers (fysiek of virtueel).
  2. Installeer de SafeKit -software op beide servers.
  3. Installeer de applicatiemodule op beide servers.



{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}