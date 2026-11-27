---
title: "Architecture sans partage vs architecture à disque partagé : choisir le meilleur cluster HA"
canonical: "https://safekit.eviden.com/fr/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/"
description: "Architecture sans partage vs à disque partagé pour la haute disponibilité : SafeKit réplique les données entre serveurs pour éviter les coûts SAN et simplifier le basculement."
category: "best-practises"
lang: "fr"
topics: "Architecture sans partage ou architecture à disque partagé pour clusters de haute disponibilité, Architecture sans partage ou architecture à disque partagé : avantages et inconvénients"
hashpart: "shared-nothing-architecture-vs-shared-disk-architecture-for-high-availability-clusters, shared-nothing-architecture-vs-shared-disk-architecture-pros-and-cons"
translation: "translate_md 2026-11-20.7 | glossaire 2026-11-20.14 | Translation LLM | 59 expressions"
image: "/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png"
schemaType: "TechArticle"
---

# Architecture sans partage vs architecture à disque partagé : choisir le meilleur cluster HA {#shared-nothing-vs-shared-disk-architecture-choosing-the-best-ha-cluster}

## Architecture sans partage ou architecture à disque partagé pour clusters de haute disponibilité {#shared-nothing-architecture-vs-shared-disk-architecture-for-high-availability-clusters}

### Aperçu {#overview}

Cet article compare deux architectures pour clusters de haute disponibilité : l’architecture sans partage et l’architecture à disque partagé. Il explique leurs avantages et leurs inconvénients. Il aborde les contraintes matérielles, l’impact sur l’organisation des données de l’application, le temps de récupération et la simplicité de mise en œuvre.


![architecture sans partage vs architecture à disque partagé](/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png "w:200")


Les tableaux de comparaison ci-dessous détaillent les différences entre une architecture à disque partagé et SafeKit. Ce produit de clustering logiciel implémente une architecture sans partage.

### Qu’est-ce qu’une architecture à disque partagé ? {#what-is-a-shared-disk-architecture}

Une architecture à disque partagé est basée sur deux serveurs qui partagent un disque. En cas de défaillance matérielle ou logicielle, l’application redémarre automatiquement sur l’autre serveur. Le clustering de basculement Microsoft est un exemple d’architecture à disque partagé. Pour plus d’informations, consultez [la section Configuration matérielle requise pour le clustering de basculement](<https://learn.microsoft.com/en-us/windows-server/failover-clustering/clustering-requirements>).

Cette architecture présente des contraintes matérielles : un stockage partagé externe spécifique, des cartes spécifiques à l’intérieur des serveurs et des commutateurs spécifiques entre les serveurs et le stockage partagé.

Une architecture à disque partagé a un impact important sur l’organisation des données d’application. Toutes les données d’application doivent être situées sur le disque partagé, de sorte que l’application puisse redémarrer après un basculement.

De plus, en cas de basculement, une procédure de récupération du système de fichiers doit s’exécuter sur le disque partagé. Cela augmente l’objectif de temps de récupération (RTO).

Enfin, la solution n’est pas facile à configurer. Des compétences en matériel sont nécessaires pour configurer le matériel spécifique. Des compétences en application sont également nécessaires pour placer les données d’application sur le disque partagé.

### Qu’est-ce qu’une architecture sans partage ? {#what-is-a-shared-nothing-architecture-}

Une architecture sans partage est basée sur deux serveurs qui répliquent les données en temps réel. En cas de défaillance matérielle ou logicielle, l’application redémarre automatiquement sur l’autre serveur. SafeKit est un exemple d’architecture sans partage.

Il existe deux types de réplication de données : la réplication de fichiers au niveau de l’octet et la réplication de disques au niveau du bloc. Pour plus de détails, consultez [la section Réplication de fichiers au niveau de l’octet ou réplication de disques au niveau du bloc](</fr/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>). Cet article traite de la réplication de fichiers au niveau de l’octet, car elle présente de nombreux avantages par rapport à la réplication de disques au niveau du bloc.

L’architecture sans partage n’a pas de contraintes matérielles. Les serveurs peuvent être physiques ou virtuels, avec tout type d’organisation de disque. La réplication de fichiers en temps réel s’exécute sur le réseau standard entre les serveurs. [La réplication synchrone](</fr/best-practises/synchronous-replication-vs-asynchronous-replication/>) garantit l’absence de perte de données.

Cette architecture n’a aucun impact sur l’organisation des données de l’application. Par exemple, la réplication de fichiers en temps réel fonctionne même si les données de l’application se trouvent sur le disque système.

En cas de basculement, l’objectif de temps de reprise (RTO) est réduit au temps de redémarrage de l’application. L’application redémarre sur les fichiers répliqués du serveur secondaire.

Enfin, la solution est très simple à configurer. Il suffit de configurer les chemins des répertoires à répliquer.

## Architecture sans partage ou architecture à disque partagé : avantages et inconvénients {#shared-nothing-architecture-vs-shared-disk-architecture-pros-and-cons}


{{%  insert-safekit-shared-nothing-vs-shared-disk-table-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}