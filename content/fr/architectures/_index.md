---
title: "Architectures à haute disponibilité : mise en miroir, ferme de serveurs et clustering logiciel avancé"
slug: "architectures"
canonical: "https://safekit.eviden.com/fr/architectures/"
description: "Architectures à haute disponibilité : mise en miroir, ferme de serveurs et clustering logiciel avancé Quelles sont les différentes architectures de haute disponibilité et les différents clusters logiciels avec SafeKit ?"
category: "architectures"
lang: "fr"
topics: "Quelles sont les différentes architectures de haute disponibilité et les différents clusters logiciels avec SafeKit ?, Comment créer des clusters de haute disponibilité avec SafeKit ?, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# Architectures à haute disponibilité : mise en miroir, ferme de serveurs et clustering logiciel avancé

## Quelles sont les différentes architectures de haute disponibilité et les différents clusters logiciels avec SafeKit ?

### Cluster miroir


<img src="/wp-content/uploads/2023/02/safekit-prim-second-300.png" width="300" alt="SafeKit mirror cluster">


[Plus d'informations](</fr/architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### Cluster ferme


<img src="/wp-content/uploads/2023/02/safekit-up-up-up-300.png" width="300" alt="SafeKit farm cluster">


[Plus d'informations](</fr/architectures/network-load-balancing-cluster/>)

### Cluster ferme + miroir


<img src="/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png" width="300" alt="SafeKit farm + mirror cluster">


[Plus d'informations](</fr/architectures/clustering-software-load-balancing-mirroring/>)

### Cluster actif/actif


<img src="/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png" width="300" alt="SafeKit active active cluster with real-time replication">


[Plus d'informations](</fr/architectures/active-active-cluster-real-time-replication/>)

### Cluster N-1


<img src="/wp-content/uploads/2023/02/safekit-n-1-300-3.png" width="300" alt="SafeKit N-1 redundancy cluster">


[Plus d'informations](</fr/architectures/n-1-redundancy/>)

## Comment créer des clusters de haute disponibilité avec SafeKit ?

### Utiliser des modules de haute disponibilité

Un module de haute disponibilité est une personnalisation de SafeKit pour une application. Il existe deux types de modules : le module miroir avec réplication de données en temps réel et basculement et le module ferme avec équilibrage de charge et basculement.

Si vous déployez un module miroir sur 2 serveurs, alors vous créez un cluster miroir et si vous déployez un module ferme sur N serveurs, alors vous créez un cluster ferme.

Plusieurs modules applicatifs peuvent être déployés sur les mêmes serveurs. Ainsi, des architectures de clustering avancées peuvent être implémentées comme celles présentées précédemment (ferme+miroir, actif/actif, N-1).

### Qu'est-ce qu'un module ?

En pratique, un module applicatif est un fichier « .Safe » (type zip) comprenant :

1 - le fichier de configuration userconfig.xml qui contient :

  * les noms ou adresses IP physiques des serveurs,
  * le nom ou l'adresse IP virtuelle du cluster,
  * les répertoires de fichiers à répliquer en temps réel (pour un module miroir),
  * les critères d'équilibrage de charge réseau (pour un module ferme),
  * la configuration des détecteurs de pannes logicielles et matérielles


2 - les scripts pour démarrer et arrêter l'application.

### Déploiement plug and play de modules de haute disponibilité

Une fois qu'un module applicatif est configuré et testé avec une application, le déploiement ne nécessite aucune compétence informatique spécifique :

  1. installer l'application sur 2 serveurs standards (physiques ou virtuels),
  2. installer le logiciel SafeKit sur les deux serveurs,
  3. installer le module applicatif sur les deux serveurs.



{{%  insert-safekit-hub-fr %}}
 


{{%  insert-safekit-4-buttons-fr %}}