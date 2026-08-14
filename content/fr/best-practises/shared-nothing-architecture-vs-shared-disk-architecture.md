---
title: "Architecture sans partage vs. architecture à disque partagé : choisir le meilleur cluster HA"
slug: "shared-nothing-architecture-vs-shared-disk-architecture"
canonical: "https://safekit.eviden.com/fr/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/"
description: "Architecture sans partage vs. architecture à disque partagé : choisir le meilleur cluster HA Architecture sans partage vs architecture avec disques partagés pour les clusters de haute disponibilité"
category: "best-practises"
lang: "fr"
topics: "Architecture sans partage vs architecture avec disques partagés pour les clusters de haute disponibilité, Architecture sans partage (shared nothing) vs architecture à disque partagé (shared disk) : avantages et inconvénients, Vidéo comparant un cluster avec disques partagés et un cluster sans partage avec 2 sites distants, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# Architecture sans partage vs. architecture à disque partagé : choisir le meilleur cluster HA

## Architecture sans partage vs architecture avec disques partagés pour les clusters de haute disponibilité

### Aperçu

Cet article étudie les avantages et les inconvénients de l'architecture sans partage par rapport à l'architecture avec disques partagés pour les clusters de haute disponibilité. On s'intéresse aux contraintes matérielles, à l'impact sur l'organisation des données applicatives, au temps de récupération, à la simplicité de mise en œuvre.


<img src="/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png" width="200" alt="Architecture sans partage par rapport à l'architecture avec disques partagés">


Les tableaux comparatifs suivants expliquent en détail la différence entre l'architecture avec disques partagés et SafeKit, un produit de clustering logiciel implémentant une architecture sans partage.

### Qu'est-ce qu'une architecture avec disques partagés ?

Une architecture avec disques partagés (comme avec le [failover cluster de Microsoft](<https://learn.microsoft.com/en-us/windows-server/failover-clustering/clustering-requirements>)) est basée sur 2 serveurs partageant un disque avec un basculement automatique des applications en cas de pannes matérielles ou logicielles.

Cette architecture a des contraintes matérielles : le stockage partagé externe spécifique, les cartes spécifiques à installer à l'intérieur des serveurs, et les commutateurs spécifiques entre les serveurs et le stockage partagé.

Une architecture avec disques partagés a un fort impact sur l'organisation des données applicatives. Toutes les données de l'application doivent être localisées sur le disque partagé pour une reprise après basculement.

De plus, en cas de basculement, la procédure de récupération du système de fichiers doit être exécutée sur le disque partagé. Ceci augmente le temps de récupération (RTO).

Enfin, la solution n'est pas facile à configurer car des compétences sont nécessaires pour configurer le matériel spécifique. Des compétences applicatives sont également requises pour configurer les données de l'application dans le disque partagé.

### Qu'est-ce qu'une architecture sans partage ?

Une architecture sans partage (comme avec [SafeKit](</fr/>)) est basée sur 2 serveurs répliquant les données en temps réel avec un basculement automatique des applications en cas de pannes matérielles ou logicielles.

Il existe deux types de réplication de données : [une réplication de fichiers au niveau octet vs une réplication de disque au niveau bloc](</fr/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>). Nous considérons ici la réplication de fichiers au niveau octet car elle présente de nombreux avantages par rapport à la réplication de disque au niveau bloc.

L'architecture sans partage n'a aucune contrainte matérielle : les serveurs peuvent être physiques ou virtuels avec n'importe quel type d'organisation disques. La réplication de fichiers en temps réel ([synchrone](</fr/best-practises/synchronous-replication-vs-asynchronous-replication/>) pour avoir 0 perte de données) est effectuée via le réseau standard entre les serveurs.

Cette architecture n'a pas d'impact sur l'organisation des données applicatives. Par exemple, si une application a ses données sur le disque système, la réplication de fichiers en temps réel fonctionne.

Le temps de récupération (RTO) en cas de basculement est réduit au temps de redémarrage de l'application sur les fichiers répliqués du serveur secondaire.

Enfin, la solution est très simple à configurer puisque seuls les chemins des répertoires à répliquer sont configurés.

## Architecture sans partage (shared nothing) vs architecture à disque partagé (shared disk) : avantages et inconvénients


{{%  insert-safekit-shared-nothing-vs-shared-disk-table-fr %}}
 

## Vidéo comparant un cluster avec disques partagés et un cluster sans partage avec 2 sites distants

### Contenu de la vidéo

Cette vidéo illustre d'abord le travail à effectuer avec une architecture à disques partagés lorsque les deux serveurs d'un cluster de haute disponibilité doivent être placés sur deux sites distants.

Ensuite, la vidéo montre le même cas d'utilisation avec l'architecture SafeKit sans partage.

### Vidéo SafeKit : Reprise après sinistre avec un cluster à disque partagé et un cluster shared nothing (2:25)


{{%  insert-safekit-hub-fr %}}
 


{{%  insert-safekit-4-buttons-fr %}}