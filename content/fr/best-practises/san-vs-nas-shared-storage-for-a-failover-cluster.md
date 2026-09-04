---
title: "Comparaison détaillée du stockage partagé SAN et NAS pour le clustering HA - SafeKit HA"
canonical: "https://safekit.eviden.com/fr/best-practises/san-vs-nas-shared-storage-for-a-failover-cluster/"
description: "Comparez le stockage partagé SAN et NAS pour les clusters HA. Découvrez pourquoi SafeKit propose une architecture sans SAN qui élimine les dépendances au stockage partagé, simplifie les scripts de basculement et empêche la corruption des données sans matériel coûteux ni disques de quorum complexes."
category: "best-practises"
lang: "fr"
topics: "Quelle est la solution la plus simple entre un stockage partagé SAN ou NAS pour un cluster de haute disponibilité ?, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# Comparaison détaillée du stockage partagé SAN et NAS pour le clustering HA

## Quelle est la solution la plus simple entre un stockage partagé SAN ou NAS pour un cluster de haute disponibilité ?

###  Stockage partagé SAN ou stockage partagé NAS iSCSI pour un cluster de haute disponibilité 


![Stockage partagé SAN ou stockage partagé NAS iSCSI pour un cluster de haute disponibilité](/wp-content/uploads/2023/03/raw-disk-shared-storage.png "w:200")


Plusieurs éléments rendent cette architecture complexe à mettre en œuvre :

  * en cas de basculement, la commutation du stockage partagé nécessite des instructions de bas niveau qui dépendent du fabricant du stockage,
  * la procédure de récupération du système de fichiers (FS) doit être passée avant de redémarrer l'application,
  * si les deux systèmes de fichiers sur les deux nœuds accèdent au même disque en même temps, le système de fichiers complet sera corrompu,
  * pour éviter un double accès, un disque de quorum doit être configuré.


###  Stockage partagé NAS SMB ou NAS NFS pour cluster de haute disponibilité 


![Stockage partagé NAS SMB ou NAS NFS pour cluster de haute disponibilité](/wp-content/uploads/2023/03/nas-shared-storage-1.png "w:200")


Plusieurs éléments rendent cette architecture simple à mettre en œuvre : 
  * en cas de basculement, le basculement du stockage partagé consiste uniquement au remontage du système de fichiers externe,
  * aucune procédure de récupération sur le système de fichiers ne doit être passée avant de redémarrer l'application,
  * si les deux nœuds accèdent au même système de fichiers partagé en même temps, le système de fichiers complet ne sera pas corrompu,
  * cependant, il existe toujours la possibilité qu'une double exécution de la même application corrompent ses données dans le stockage partagé lorsque les nœuds sont isolés.


###  Réplication en temps réel et basculement avec Eviden SafeKit 


![Réplication en temps réel et basculement avec SafeKit](/wp-content/uploads/2023/03/no-shared-storage.png "w:200")


Il n'y a pas de tels problèmes avec SafeKit car sa solution de réplication et de basculement ne nécessite pas de stockage partagé.

Cependant, si SafeKit doit gérer un stockage partagé :

  * utiliser un stockage partagé NAS SMB ou un stockage partagé NAS NFS,
  * mettre dans les scripts de redémarrage le montage/démontage du système de fichiers externe,
  * configurer le [split brain checker de SafeKit](</fr/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) pour éviter une double exécution de la même application accédant au stockage partagé lorsque les nœuds sont isolés.



{{%  insert-safekit-hub-fr  %}}
 


{{%  insert-safekit-4-buttons-fr  %}}