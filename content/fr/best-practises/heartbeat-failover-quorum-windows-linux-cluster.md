---
title: "Heartbeat, basculement et quorum dans les clusters Windows et Linux"
canonical: "https://safekit.eviden.com/fr/best-practises/heartbeat-failover-quorum-windows-linux-cluster/"
description: "Heartbeat, basculement et quorum dans les clusters Windows et Linux, et comment SafeKit évite le split brain sans disque de quorum ni troisième serveur."
category: "best-practises"
lang: "fr"
topics: "Comment fonctionnent les heartbeats et le basculement dans un cluster Windows ou Linux ?, Split brain et quorum avec des serveurs dans deux salles informatiques distantes, Quorum de cluster simple avec le checker split-brain SafeKit"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-19.19 | Translation LLM | 59 expressions"
image: "/wp-content/uploads/2023/02/quorum-with-remote-sites.png"
schemaType: "TechArticle"
---

# Heartbeat, basculement et quorum dans les clusters Windows et Linux {#heartbeat-failover-and-quorum-in-windows-and-linux-clusters}


{{%  insert-safekit-network-isolation-fr  %}}
 

## Comment fonctionnent les heartbeats et le basculement dans un cluster Windows ou Linux ? {#how-heartbeats-and-failover-work-in-a-windows-or-linux-cluster}

### Qu’est-ce qu’un heartbeat ? {#what-is-a-heartbeat}

Le mécanisme de base pour synchroniser deux serveurs et détecter les pannes de serveur est le **heartbeat**. Il s’agit d’un flux de données de surveillance sur un réseau partagé par les deux serveurs.

Le logiciel SafeKit prend en charge plusieurs heartbeats. Chaque réseau partagé par les deux serveurs peut transporter un heartbeat.

Le mécanisme heartbeat est utilisé pour implémenter des clusters Windows et Linux. Il est intégré dans le cluster mirror SafeKit avec réplication de fichiers en temps réel et basculement.

### Les heartbeats SafeKit {#safekit-heartbeats}

En fonctionnement normal, les deux serveurs échangent leurs états par le biais des canaux heartbeat. Ces états sont PRIM, SECOND et les états des ressources. Ils synchronisent également les procédures de démarrage et d’arrêt de l’application.

Par exemple, lors d’un basculement planifié, le script d’arrêt de l’application est d’abord exécuté sur le serveur principal. Ensuite, le script de démarrage est exécuté sur le serveur secondaire. Ainsi, les données répliquées sur le serveur secondaire sont dans un état sûr. Cet état correspond à un arrêt propre de l’application.

### Que se passe-t-il lorsque tous les heartbeats sont perdus ? {#loss-of-all-heartbeats}

Lorsqu’un serveur perd tous les heartbeats, il considère que l’autre serveur est en panne. Il passe alors à l’état ALONE.

Si le serveur dans l’état SECOND passe à l’état ALONE, l’application est redémarrée sur ce serveur. Il s’agit d’un basculement d’application.

Deux canaux heartbeat sur deux réseaux différents sont recommandés, mais pas obligatoires. Avec deux réseaux, une défaillance du réseau n’est pas confondue avec une défaillance du serveur.

## Split brain et quorum avec des serveurs dans deux salles informatiques distantes {#split-brain-problem-and-quorum-when-servers-are-in-two-remote-computer-rooms}


![Heartbeat, basculement et quorum dans un cluster Windows ou Linux](/wp-content/uploads/2023/02/quorum-with-remote-sites.png "w:200")


### Deux salles informatiques distantes {#remote-computer-rooms}

Avec deux serveurs dans deux salles informatiques distantes, un cluster de haute disponibilité peut protéger une application critique.

Ainsi, l’application reste disponible même si une catastrophe détruit une salle informatique entière.

### Split brain {#split-brain}

Si le réseau entre les deux salles informatiques est isolé, tous les heartbeats sont perdus. C’est le problème du split brain : les deux serveurs démarrent l’application critique.

### Complexité des solutions habituelles {#complexity-of-solutions}

Le plus souvent, un quorum est utilisé pour résoudre le problème du split brain. Le quorum utilise un troisième serveur de quorum ou un disque de quorum spécial. Il évite d’avoir deux serveurs principaux en même temps.

Malheureusement, ces dispositifs de quorum ajoutent des coûts et de la complexité à l’architecture de clustering.

## Quorum de cluster simple avec le checker split-brain SafeKit {#simple-cluster-quorum-with-the-safekit-split-brain-checker}

### Checker split-brain SafeKit {#safekit-split-brain-checker}

Avec le logiciel de haute disponibilité SafeKit, le quorum d’un cluster Windows ou Linux ne nécessite aucun serveur de quorum tiers ni aucun disque de quorum. Un simple 🛠️ [checker split-brain](</fr/resources/safekit-user-guide-82/#check_splitbrain>) suffit à éviter d’exécuter l’application sur les deux serveurs.

Lorsque tous les heartbeats entre les serveurs sont perdus, le checker split-brain sélectionne un seul serveur pour devenir le serveur principal. L’autre serveur passe à l’état WAIT. Il attend jusqu’à ce qu’il reçoive à nouveau les heartbeats de l’autre serveur. Ensuite, il synchronise les données répliquées à partir du serveur principal et revient à l’état secondaire.

### Comment fonctionne le checker split-brain ? {#how-the-split-brain-checker-works}

Le serveur principal est élu par un ping à une adresse IP, appelée témoin. Le témoin est généralement un routeur qui est toujours disponible. En cas d’isolement du réseau, seul le serveur qui peut atteindre le témoin devient principal dans l’état ALONE. L’autre serveur passe à l’état WAIT.

Le témoin n’est pas testé en permanence. Il n’est testé que lorsque tous les heartbeats sont perdus. Si le témoin est en panne à ce moment-là, le cluster passe à l’état WAIT-WAIT. Un administrateur peut alors redémarrer l’un des serveurs en tant que primaire avec la console web SafeKit.

### Que se passe-t-il sans checker split-brain ? {#what-happens-without-a-split-brain-checker}

En cas d’isolement du réseau, les deux serveurs passent à l’état ALONE et exécutent l’application critique. Les répertoires répliqués sont isolés. Chaque application fonctionne sur ses propres données dans son propre répertoire.

Lorsque le réseau est reconnecté, SafeKit choisit par défaut le serveur qui était PRIM avant l’isolement comme nouveau serveur principal. L’autre serveur est forcé à l’état SECOND. Toutes ses données sont resynchronisées à partir du serveur PRIM.

Remarque : sous Windows, un serveur peut détecter une adresse IP en double et supprimer son adresse IP virtuelle. Dans ce cas, un vérificateur SafeKit force un redémarrage.


{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}
