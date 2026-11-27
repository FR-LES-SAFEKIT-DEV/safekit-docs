---
title: "SAN versus NAS-gedeelde opslag voor failoverclustering: een gedetailleerde vergelijking"
canonical: "https://safekit.eviden.com/nl/best-practises/san-vs-nas-shared-storage-for-a-failover-cluster/"
description: "SAN vs. NAS als gedeelde opslag voor failoverclusters: beperkingen, kosten en risico's, en waarom replicatie met SafeKit gedeelde opslag overbodig maakt."
category: "best-practises"
lang: "nl"
topics: "SAN- of NAS-gedeelde opslag: wat is eenvoudiger voor een failovercluster?"
hashpart: "what-is-the-simplest-solution-between-a-san-vs-a-nas-shared-storage-for-a-failover-cluster"
translation: "translate_md 2026-11-20.3 | glossaire 2026-11-20.10 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/03/raw-disk-shared-storage.png"
schemaType: "TechArticle"
---

# SAN versus NAS-gedeelde opslag voor failoverclustering: een gedetailleerde vergelijking {#san-vs-nas-shared-storage-for-failover-clustering-a-detailed-comparison}

## SAN- of NAS-gedeelde opslag: wat is eenvoudiger voor een failovercluster? {#what-is-the-simplest-solution-between-a-san-vs-a-nas-shared-storage-for-a-failover-cluster}

###  SAN gedeelde opslag of NAS iSCSI-gedeelde opslag voor een failovercluster {#san-shared-storage-or-nas-iscsi-shared-storage-for-a-failover-cluster}


![SAN gedeelde opslag of NAS iSCSI-gedeelde opslag voor een failovercluster](/wp-content/uploads/2023/03/raw-disk-shared-storage.png "w:200")


Verschillende elementen maken deze architectuur complex om te implementeren:

  * Bij een failover vereist het overschakelen van de gedeelde opslag commando's op laag niveau. Deze commando's zijn afhankelijk van de opslagfabrikant.
  * Voordat de toepassing opnieuw wordt gestart, moet een procedure voor het herstellen van het bestandssysteem worden uitgevoerd.
  * Als de bestandssystemen op beide nodes tegelijkertijd toegang hebben tot dezelfde ruwe schijf, raakt het hele bestandssysteem beschadigd.
  * Om deze dubbele toegang te voorkomen, moet u een quorumschijf configureren.


###  Gedeelde NAS SMB-opslag of gedeelde NAS NFS-opslag voor een failovercluster {#nas-smb-shared-storage-or-nas-nfs-shared-storage-for-a-failover-cluster}


![Gedeelde NAS SMB-opslag of gedeelde NAS NFS-opslag voor een failovercluster](/wp-content/uploads/2023/03/nas-shared-storage-1.png "w:200")


Verschillende elementen maken deze architectuur eenvoudig te implementeren:

  * Bij een failover hoeft bij het wisselen van de gedeelde opslag alleen het externe bestandssysteem opnieuw te worden aangekoppeld.
  * Er is geen procedure voor het herstellen van het bestandssysteem vereist voordat de toepassing opnieuw wordt gestart.
  * Als beide nodes tegelijkertijd toegang hebben tot hetzelfde gedeelde bestandssysteem, raakt het bestandssysteem niet beschadigd.
  * Wanneer nodes echter geïsoleerd zijn, kan dezelfde toepassing nog steeds op beide nodes worden uitgevoerd. Deze dubbele uitvoering kan de toepassingsgegevens in de gedeelde opslag beschadigen.


###  Realtime replicatie en failover met Eviden SafeKit {#real-time-replication-and-failover-with-eviden-safekit}


![Realtime replicatie en failover met SafeKit](/wp-content/uploads/2023/03/no-shared-storage.png "w:200")


SafeKit heeft deze problemen niet. Met SafeKit is gedeelde opslag voor replicatie en failover niet vereist.

Als SafeKit echter gedeelde opslag moet beheren:

  * Gebruik gedeelde NAS SMB- of NAS NFS-opslag.
  * Plaats de mount- en umount-opdrachten voor het externe bestandssysteem in de herstartscripts.
  * Configureer de SafeKit [split-brain-checker](</nl/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>). Deze voorkomt een dubbele uitvoering van dezelfde applicatie op de gedeelde opslag wanneer nodes geïsoleerd zijn.



{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}