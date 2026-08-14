---
title: "Clustering à redondance N-1 : Haute disponibilité pour plusieurs applications avec une seule sauvegarde"
slug: "n-1-redundancy"
canonical: "https://safekit.eviden.com/fr/architectures/n-1-redundancy/"
description: "Clustering à redondance N-1 : Haute disponibilité pour plusieurs applications avec une seule sauvegarde Cluster N-1 avec réplication de données et basculement applicatif entre N serveurs actifs et 1 serveur de secours"
category: "architectures"
lang: "fr"
topics: "Cluster N-1 avec réplication de données et basculement applicatif entre N serveurs actifs et 1 serveur de secours, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# Clustering à redondance N-1 : Haute disponibilité pour plusieurs applications avec une seule sauvegarde

## Cluster N-1 avec réplication de données et basculement applicatif entre N serveurs actifs et 1 serveur de secours

### Redondance N-1


<img src="/wp-content/uploads/2023/02/safekit-n-1-300-3.png" width="300" alt="Cluster SafeKit avec redondance N-1">


### Comment fonctionne la redondance N-1 ?

SafeKit fournit un cluster en redondance N-1 simple avec N applications exécutées sur N serveurs et avec un seul serveur de secours pour le basculement. Dans un cluster SafeKit en redondance N-1, chaque application fonctionne sur ses propres répertoires répliqués.

En cas de panne d'un serveur principal contrairement à un [cluster actif actif](</fr/architectures/active-active-cluster-real-time-replication/>), le serveur de secours n'a pas à gérer une double charge de travail.

Cela suppose qu'il n'y ait qu'une seule panne à la fois dans le cluster en redondance N-1. La solution peut prendre en charge plusieurs pannes de serveurs principaux en même temps, mais dans ce cas, le serveur de secours unique devra gérer la charge de travail combinée de tous les serveurs défaillants.

### Comment mettre en place la redondance N-1 ?

Le cluster SafeKit en redondance N-1 se configure simplement en déployant N modules miroirs sur N+1 serveurs.

Notez que :

  * toutes les applications (Appli1, Appli2, Appli3) doivent être installées sur le serveur de secours unique pour le basculement des applications,
  * chaque module miroir aura sa propre adresse IP virtuelle, ses propres répertoires de fichiers répliqués et ses propres scripts de reprise.



{{%  insert-safekit-hub-fr %}}
 


{{%  insert-safekit-4-buttons-fr %}}