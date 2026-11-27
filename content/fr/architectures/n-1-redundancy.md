---
title: "Cluster de redondance N-1 : haute disponibilité pour de multiples applications avec un seul serveur de secours"
canonical: "https://safekit.eviden.com/fr/architectures/n-1-redundancy/"
description: "Redondance N-1 avec SafeKit : N applications sur N+1 serveurs partagent un seul serveur de secours, avec réplication en temps réel et basculement automatique, sans SAN."
category: "architectures"
lang: "fr"
topics: "Haute disponibilité avec réplication des données et basculement des applications de N serveurs vers 1"
translation: "translate_md 2026-11-22.1 | glossaire 2026-11-22.2 | Translation LLM | 59 expressions"
image: "/wp-content/uploads/2023/02/safekit-n-1-300-3.png"
schemaType: "TechArticle"
---

# Cluster de redondance N-1 : haute disponibilité pour de multiples applications avec un seul serveur de secours {#n-1-redundancy-clustering-high-availability-for-multiple-applications-with-one-backup}

## Haute disponibilité avec réplication des données et basculement des applications de N serveurs vers 1 {#high-availability-with-data-replication-and-application-failover-from-n-servers-to-1}

### Redondance N-1 {#n-1-redundancy}


![Cluster de redondance N-1 avec SafeKit](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


### Comment fonctionne la redondance N-1 ? {#how-the-n-1-redundancy-works}

SafeKit fournit un cluster de redondance N-1 simple : N applications s’exécutent sur N serveurs principaux, et un seul serveur de secours prend le relais en cas de défaillance. Dans un cluster de redondance N-1 SafeKit, chaque application fonctionne sur ses propres répertoires répliqués.

Contrairement à un [cluster actif-actif](</fr/architectures/active-active-cluster-real-time-replication/>), lorsqu’un serveur principal tombe en panne, le serveur de secours n’a pas à gérer une double charge de travail.

Cela suppose qu’un seul serveur principal tombe en panne à la fois dans le cluster de redondance N-1. La solution peut également gérer plusieurs pannes de serveur principal en même temps. Dans ce cas, le serveur de secours unique exécute la charge de travail combinée de tous les serveurs en panne.

### Comment mettre en œuvre la redondance N-1 ? {#how-to-implement-n-1-redundancy}

Pour configurer un cluster de redondance N-1 SafeKit, il suffit de déployer N modules mirror sur N+1 serveurs.

Remarques :

  * Toutes les applications (Appli1, Appli2, Appli3) doivent être installées sur le serveur de secours pour le basculement des applications.
  * Chaque module mirror possède sa propre adresse IP virtuelle, ses propres répertoires de fichiers répliqués et ses propres scripts de récupération.



{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}