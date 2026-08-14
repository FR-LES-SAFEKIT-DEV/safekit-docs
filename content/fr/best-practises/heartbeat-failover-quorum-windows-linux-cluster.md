---
title: "Battement de cœur, basculement et quorum dans les clusters Windows et Linux"
slug: "heartbeat-failover-quorum-windows-linux-cluster"
canonical: "https://safekit.eviden.com/fr/best-practises/heartbeat-failover-quorum-windows-linux-cluster/"
description: "Battement de cœur, basculement et quorum dans les clusters Windows et Linux"
category: "best-practises"
lang: "fr"
topics: "Quels sont les différents scénarios en cas d'isolement réseau dans un cluster ?, Comment fonctionnent les heartbeats et le basculement dans un cluster Windows ou Linux ?, Problème de split brain et quorum lorsque les serveurs sont dans deux salles informatiques distantes, Quorum simple avec le split brain checker de SafeKit, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# Battement de cœur, basculement et quorum dans les clusters Windows et Linux


{{%  insert-safekit-network-isolation-fr %}}
 

## Comment fonctionnent les heartbeats et le basculement dans un cluster Windows ou Linux ?

### Qu'est-ce qu'un heartbeat ?

Le mécanisme de base pour synchroniser deux serveurs et détecter les pannes de serveur est le **heartbeat** , qui est un flux de données de surveillance sur un réseau partagé par une paire de serveurs.

Le logiciel SafeKit supporte autant de heartbeats qu'il y a de réseaux partagés par les deux serveurs.

Le mécanisme de heartbeat est utilisé pour implémenter des clusters Windows et Linux. Il est intégré au cluster miroir de SafeKit avec réplication de fichiers en temps réel et basculement.

### Heartbeats de SafeKit

En fonctionnement normal, les deux serveurs échangent leurs états (PRIM, SECOND, les états des ressources) via les canaux de heartbeat et synchronisent leurs procédures de démarrage et d'arrêt des applications.

En particulier, en cas de basculement programmé, le script d'arrêt qui stoppe l'application est d'abord exécuté sur le serveur primaire, avant d'exécuter le script de démarrage sur le serveur secondaire. Ainsi, les données répliquées sur le serveur secondaire sont dans un état sûr correspondant à un arrêt propre de l'application.

### Perte de tous les heartbeats

Lorsque tous les heartbeats sont perdus sur un serveur, ce serveur considère que l'autre serveur est en panne et passe à l'état ALONE.

Si c'est le serveur SECOND qui passe à l'état ALONE, alors il y a basculement de l'application avec redémarrage de l'application sur le serveur secondaire.

Bien que non obligatoire, il est préférable d'avoir deux canaux de heartbeat sur deux réseaux différents pour synchroniser les deux serveurs afin de séparer le cas de la panne réseau de celui de la panne serveur.

## Problème de split brain et quorum lorsque les serveurs sont dans deux salles informatiques distantes


<img src="/wp-content/uploads/2023/02/quorum-with-remote-sites.png" width="200" alt="Heartbeat, failover et quorum dans un cluster Windows ou Linux">


### Salles informatiques distantes

Un cluster de haute disponibilité sécurisant une application critique peut être mis en place avec deux serveurs dans deux salles informatiques géographiquement distantes.

Ainsi, la solution prend en charge le sinistre d'une salle complète.

### Split brain

En cas d'isolation réseau entre les deux salles informatiques, tous les heartbeats sont perdus et le problème du split brain se pose.

Les deux serveurs démarrent l'application critique.

### Complexité des solutions

Le plus souvent, pour résoudre le split brain, le quorum est implémenté avec un troisième serveur de quorum ou un disque de quorum spécial pour éviter les doubles maîtres.

Malheureusement, ces nouveaux dispositifs de quorum ajoutent des coûts et de la complexité à l'architecture de clustering globale.

## Quorum simple avec le split brain checker de SafeKit

### Split brain checker de SafeKit

Avec le logiciel de haute disponibilité SafeKit, le quorum au sein d'un cluster Windows ou Linux ne nécessite pas de troisième serveur de quorum ni de disque quorum. Un [split brain checker simple](</fr/resources/safekit-user-guide-82/#check_splitbrain>) est suffisant pour éviter la double exécution d'une application.

En cas de perte de tous les heartbeats entre les serveurs, le split brain checker sélectionne un seul serveur pour devenir le serveur primaire. L'autre serveur passe à l'état WAIT jusqu'à ce qu'il reçoive à nouveau les heartbeats. Il repasse alors en secondaire après avoir resynchronisé les données répliquées du serveur primaire.

### Comment fonctionne le split brain checker ?

L'élection du serveur primaire est basée sur le ping d'une adresse IP, appelée témoin. Le témoin est généralement un routeur toujours disponible. En cas d'isolation réseau, seul le serveur ayant accès au témoin sera primaire et passera ALONE, l'autre ira en WAIT.

Le témoin n'est pas testé en permanence mais seulement lorsque tous les heartbeats sont perdus. Si à ce moment-là, le témoin est en panne, le cluster passe à l'état WAIT-WAIT et un administrateur peut choisir de redémarrer l'un des serveurs en tant que serveur primaire via la console Web de SafeKit.

### Que se passe-t-il sans split brain checker ?

En cas d'isolation réseau, les deux serveurs passeront à l'état ALONE exécutant l'application critique. Les répertoires répliqués sont isolés et chaque application travaille sur ses propres données dans son propre répertoire.

A la reconnexion du réseau, SafeKit choisit par défaut le serveur qui était PRIM avant l'isolation comme nouveau primaire et force l'autre serveur en SECOND avec une resynchronisation de toutes ses données depuis le serveur PRIM.

Remarque : Windows peut détecter une adresse IP en double sur un serveur et supprimer l'adresse IP virtuelle sur ce serveur. SafeKit dispose d'un checker pour forcer un redémarrage dans ce cas.


{{%  insert-safekit-hub-fr %}}
 


{{%  insert-safekit-4-buttons-fr %}}