---
title: "SafeKit-architecturen"
canonical: "https://safekit.eviden.com/nl/architectures/"
description: "Ontdek de architecturen voor hoge beschikbaarheid met SafeKit. Lees meer over Mirror-, Farm- en Farm+Mirror-clusters voor SAN-loze applicatiefailover en load balancing."
category: "architectures"
lang: "nl"
topics: "Welke architecturen voor hoge beschikbaarheid en softwareclusters zijn er met SafeKit?, Hoe bouwt u clusters met hoge beschikbaarheid met SafeKit?, 🔍 SafeKit-navigatiehub voor hoge beschikbaarheid"
---

# SafeKit-architecturen

## Welke architecturen voor hoge beschikbaarheid en softwareclusters zijn er met SafeKit?

### Mirror-cluster


![SafeKit Mirror-cluster](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


[Meer informatie](</architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### Farm-cluster


![SafeKit Farm-cluster](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


[Meer informatie](</architectures/network-load-balancing-cluster/>)

### Farm+Mirror-cluster


![SafeKit Farm+Mirror-cluster](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


[Meer informatie](</architectures/clustering-software-load-balancing-mirroring/>)

### Active/active-cluster


![SafeKit active/active-cluster met realtime replicatie](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


[Meer informatie](</architectures/active-active-cluster-real-time-replication/>)

### N-1-cluster


![SafeKit N-1-redundantiecluster](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


[Meer informatie](</architectures/n-1-redundancy/>)

## Hoe bouwt u clusters met hoge beschikbaarheid met SafeKit?

### Modules voor hoge beschikbaarheid gebruiken

Een module voor hoge beschikbaarheid is een aanpassing van SafeKit voor een applicatie. Er zijn twee typen modules: de Mirror-module met realtime gegevensreplicatie en failover, en de Farm-module met load balancing en failover.

Door een Mirror-module op twee servers te implementeren, maakt u een Mirror-cluster. Met een Farm-module op N servers maakt u een Farm-cluster.

Er kunnen meerdere applicatiemodules op dezelfde servers worden geïmplementeerd. Zo kunnen geavanceerde clusterarchitecturen worden gebouwd, zoals de eerder genoemde varianten (Farm+Mirror, active/active, N-1).

### Wat is een applicatiemodule?

In de praktijk is een applicatiemodule een “.Safe”-bestand (zip-formaat) met:

1 - het configuratiebestand userconfig.xml met:

  * servernamen of fysieke IP-adressen,
  * de clusternaam of het virtuele IP-adres,
  * bestandsmappen die realtime moeten worden gerepliceerd (voor een Mirror-module),
  * criteria voor netwerk-load balancing (voor een Farm-module),
  * configuratie van software- en hardwarestoringsdetectoren


2 - scripts om de applicatie te starten en te stoppen.

### Plug-and-play-implementatie van modules voor hoge beschikbaarheid

Zodra een applicatiemodule is geconfigureerd en met een applicatie is getest, vereist de implementatie geen specifieke IT-kennis:

  1. installeer de applicatie op twee standaardservers (fysiek of virtueel),
  2. installeer de SafeKit-software op beide servers,
  3. installeer de applicatiemodule op beide servers.



{{%  insert-safekit-hub-nl  %}}
 

{{%  insert-safekit-4-buttons-nl  %}}