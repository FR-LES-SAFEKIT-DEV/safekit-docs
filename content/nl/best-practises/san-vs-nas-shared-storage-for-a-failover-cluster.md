---
title: "SAN versus NAS gedeelde opslag voor failover-clustering: een gedetailleerde vergelijking"
canonical: "https://safekit.eviden.com/nl/best-practises/san-vs-nas-shared-storage-for-a-failover-cluster/"
description: "Vergelijk SAN- en NAS-gedeelde opslag voor failoverclusters. Ontdek waarom SafeKit een SAN-loze architectuur voorstelt die de afhankelijkheid van gedeelde opslag elimineert, failoverscripts vereenvoudigt en gegevenscorruptie voorkomt zonder dure hardware of complexe quorumschijven."
category: "best-practises"
lang: "nl"
topics: "Wat is de eenvoudigste oplossing voor een failovercluster: een SAN of een NAS met gedeelde opslag? 🔍 SafeKit High Availability Navigation Hub"
---

# SAN versus NAS gedeelde opslag voor failover-clustering: een gedetailleerde vergelijking {#san-vs-nas-shared-storage-for-failover-clustering-a-detailed-comparison}

## Wat is de eenvoudigste oplossing voor een failovercluster: een SAN of een NAS met gedeelde opslag? {#what-is-the-simplest-solution-between-a-san-vs-a-nas-shared-storage-for-a-failover-cluster}

###  SAN-gedeelde opslag of NAS iSCSI-gedeelde opslag voor een failovercluster {#san-shared-storage-or-nas-iscsi-shared-storage-for-a-failover-cluster}


![ SAN gedeelde opslag of NAS iSCSI gedeelde opslag voor een failover-cluster ](/wp-content/uploads/2023/03/raw-disk-shared-storage.png "w:200")


Er zijn verschillende elementen die de implementatie van deze architectuur complex maken:

  * Bij failover vereist het overschakelen naar de gedeelde opslag instructies op laag niveau die afhankelijk zijn van de fabrikant van de opslag.
  * Voordat de applicatie opnieuw wordt opgestart, moet de herstelprocedure van het bestandssysteem (FS) worden uitgevoerd.
  * Als beide bestandssystemen op beide knooppunten tegelijkertijd toegang hebben tot dezelfde onbewerkte schijf, raakt het volledige bestandssysteem beschadigd.
  * Om dubbele toegang te voorkomen, moet een quorumschijf geconfigureerd worden.


###  NAS SMB gedeelde opslag of NAS NFS gedeelde opslag voor een failover-cluster {#nas-smb-shared-storage-or-nas-nfs-shared-storage-for-a-failover-cluster}


![ NAS SMB gedeelde opslag of NAS NFS gedeelde opslag voor een failover-cluster ](/wp-content/uploads/2023/03/nas-shared-storage-1.png "w:200")


Er zijn verschillende elementen die de implementatie van deze architectuur vereenvoudigen: 
  * Bij failover betekent het overschakelen naar de gedeelde opslag alleen het opnieuw aankoppelen van het externe bestandssysteem.
  * Er hoeft geen herstelprocedure op het bestandssysteem te worden uitgevoerd voordat de applicatie opnieuw wordt gestart.
  * Als beide knooppunten tegelijkertijd toegang hebben tot hetzelfde gedeelde bestandssysteem, zal het volledige bestandssysteem niet beschadigd raken.
  * Er bestaat echter nog steeds de mogelijkheid dat een dubbele uitvoering van dezelfde applicatie de gegevens in de gedeelde opslag beschadigt wanneer de knooppunten geïsoleerd zijn.


###  Realtime replicatie en failover met Eviden SafeKit {#real-time-replication-and-failover-with-eviden-safekit}


![ Realtime replicatie en failover met SafeKit ](/wp-content/uploads/2023/03/no-shared-storage.png "w:200")


Bij SafeKit doen zich dergelijke problemen niet voor, omdat de replicatie- en failoveroplossing geen gedeelde opslag vereist.

Als SafeKit echter een gedeelde opslag moet beheren:

  * gebruik een NAS SMB-gedeelde opslag of een NAS NFS-gedeelde opslag.
  * Voeg in de herstartscripts het aan- en afkoppelen van het externe bestandssysteem toe.
  * Configureer de [ SafeKit split-brain checker ](</nl/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) om te voorkomen dat dezelfde applicatie die toegang heeft tot de gedeelde opslag, dubbel wordt uitgevoerd wanneer knooppunten geïsoleerd zijn.



{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}