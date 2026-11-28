---
title: "SAN ou NAS pour un cluster de basculement"
canonical: "https://safekit.eviden.com/fr/best-practises/san-vs-nas-shared-storage-for-a-failover-cluster/"
description: "Stockage partagé SAN vs NAS pour les clusters de basculement : limites, coûts et risques, et pourquoi la réplication SafeKit supprime le besoin de stockage partagé."
category: "best-practises"
lang: "fr"
topics: "Stockage partagé SAN ou NAS : lequel est le plus simple pour un cluster de basculement ?"
hashpart: "what-is-the-simplest-solution-between-a-san-vs-a-nas-shared-storage-for-a-failover-cluster"
translation: "translate_md 2026-11-20.3 | glossaire 2026-11-20.10 | Translation LLM | 59 expressions"
image: "/wp-content/uploads/2023/03/raw-disk-shared-storage.png"
schemaType: "TechArticle"
---

# SAN ou NAS pour un cluster de basculement {#san-vs-nas-for-a-failover-cluster}

## Stockage partagé SAN ou NAS : lequel est le plus simple pour un cluster de basculement ? {#what-is-the-simplest-solution-between-a-san-vs-a-nas-shared-storage-for-a-failover-cluster}

###  Stockage partagé SAN ou stockage partagé NAS iSCSI pour un cluster de basculement {#san-shared-storage-or-nas-iscsi-shared-storage-for-a-failover-cluster}


![Stockage partagé SAN ou stockage partagé NAS iSCSI pour un cluster de basculement](/wp-content/uploads/2023/03/raw-disk-shared-storage.png "w:200")


Plusieurs éléments rendent cette architecture complexe à mettre en œuvre :

  * En cas de basculement, le changement de stockage partagé nécessite des commandes de bas niveau. Ces commandes dépendent du fabricant du stockage.
  * Une procédure de récupération du système de fichiers doit être exécutée avant le redémarrage de l’application.
  * Si les systèmes de fichiers des deux nœuds accèdent au même disque brut en même temps, l’ensemble du système de fichiers est corrompu.
  * Pour éviter ce double accès, vous devez configurer un disque de quorum.


###  Stockage partagé SMB NAS ou stockage partagé NFS NAS pour un cluster de basculement {#nas-smb-shared-storage-or-nas-nfs-shared-storage-for-a-failover-cluster}


![Stockage partagé SMB NAS ou stockage partagé NFS NAS pour un cluster de basculement](/wp-content/uploads/2023/03/nas-shared-storage-1.png "w:200")


Plusieurs éléments rendent cette architecture simple à mettre en œuvre :

  * En cas de basculement, le changement de stockage partagé ne nécessite que le remontage du système de fichiers externe.
  * Aucune procédure de récupération du système de fichiers n’est requise avant le redémarrage de l’application.
  * Si les deux nœuds accèdent simultanément au même système de fichiers partagé, le système de fichiers n’est pas corrompu.
  * Cependant, lorsque les nœuds sont isolés, la même application peut toujours s’exécuter sur les deux nœuds. Cette double exécution peut corrompre les données de l’application dans le stockage partagé.


###  Réplication et basculement en temps réel avec Eviden SafeKit {#real-time-replication-and-failover-with-eviden-safekit}


![Réplication et basculement en temps réel avec SafeKit](/wp-content/uploads/2023/03/no-shared-storage.png "w:200")


SafeKit ne présente pas ces problèmes. Avec SafeKit, la réplication et le basculement ne nécessitent pas de stockage partagé.

Toutefois, si SafeKit doit gérer le stockage partagé :

  * Utilisez le stockage partagé NAS SMB ou NAS NFS.
  * Placez les commandes de montage et de démontage du système de fichiers externe dans les scripts de redémarrage.
  * Configurez le [checker split-brain](</fr/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) SafeKit. Il empêche une double exécution de la même application sur le stockage partagé lorsque les nœuds sont isolés.



{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}