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


<!-- BEGIN INSERT: insert-safekit-network-isolation-fr lang="fr" display="content" -->
 

## Quels sont les différents scénarios en cas d'isolement réseau dans un cluster ? {#isolation}

### Un seul réseau

Lorsqu'il y a un isolement réseau, le comportement par défaut est :

  * comme les heartbeats sont perdus pour chaque nœud, chaque nœud passe en ALONE et exécute l'application avec son adresse IP virtuelle (double exécution de l'application modifiant ses données locales),
  * lorsque l'isolement est réparé, un nœud ALONE est obligé de s'arrêter et de resynchroniser ses données depuis l'autre nœud,
  * à la fin, le cluster est PRIM-SECOND (ou SECOND-PRIM selon la détection d'adresse IP virtuelle en double faite par Windows).


### Deux réseaux avec un réseau de réplication dédié

Lorsqu'il y a un isolement réseau, le comportement avec un réseau de réplication dédié est :

  * un réseau de réplication dédié est implémenté sur un réseau privé,
  * les heartbeats sur le réseau de production sont perdus (réseau isolé),
  * les heartbeats sur le réseau de réplication fonctionnent (réseau non isolé),
  * le cluster reste à l'état PRIM/SECOND.


### Un seul réseau et un checker split-brain

Lorsqu'il y a un isolement du réseau, le comportement avec un split-brain checker est :

  * un split-brain checker a été configuré avec l'adresse IP d'un témoin (typiquement un routeur),
  * le split-brain agit lorsqu'un serveur passe de PRIM à ALONE ou de SECOND à ALONE,
  * en cas d'isolement du réseau, avant de passer en ALONE, les deux nœuds testent l'adresse IP,
  * le nœud qui peut accéder à l'adresse IP passe à ALONE, l'autre passe à WAIT,
  * lorsque l'isolement est réparé, le nœud WAIT resynchronise ses données et devient SECOND.


Remarque : Si le témoin est en panne ou déconnecté, les deux nœuds passent à WAIT et l'application n'est plus en cours d'exécution. C'est pourquoi vous devez choisir un témoin robuste comme un routeur.


<!-- END INSERT: insert-safekit-network-isolation-fr lang="fr" display="content" -->
 

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


<img src="/safekit-docs/wp-content/uploads/2023/02/quorum-with-remote-sites.png" width="200" alt="Heartbeat, failover et quorum dans un cluster Windows ou Linux">


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

Avec le logiciel de haute disponibilité SafeKit, le quorum au sein d'un cluster Windows ou Linux ne nécessite pas de troisième serveur de quorum ni de disque quorum. Un [split brain checker simple](</safekit-docs/fr/resources/safekit-user-guide-82/#check_splitbrain>) est suffisant pour éviter la double exécution d'une application.

En cas de perte de tous les heartbeats entre les serveurs, le split brain checker sélectionne un seul serveur pour devenir le serveur primaire. L'autre serveur passe à l'état WAIT jusqu'à ce qu'il reçoive à nouveau les heartbeats. Il repasse alors en secondaire après avoir resynchronisé les données répliquées du serveur primaire.

### Comment fonctionne le split brain checker ?

L'élection du serveur primaire est basée sur le ping d'une adresse IP, appelée témoin. Le témoin est généralement un routeur toujours disponible. En cas d'isolation réseau, seul le serveur ayant accès au témoin sera primaire et passera ALONE, l'autre ira en WAIT.

Le témoin n'est pas testé en permanence mais seulement lorsque tous les heartbeats sont perdus. Si à ce moment-là, le témoin est en panne, le cluster passe à l'état WAIT-WAIT et un administrateur peut choisir de redémarrer l'un des serveurs en tant que serveur primaire via la console Web de SafeKit.

### Que se passe-t-il sans split brain checker ?

En cas d'isolation réseau, les deux serveurs passeront à l'état ALONE exécutant l'application critique. Les répertoires répliqués sont isolés et chaque application travaille sur ses propres données dans son propre répertoire.

A la reconnexion du réseau, SafeKit choisit par défaut le serveur qui était PRIM avant l'isolation comme nouveau primaire et force l'autre serveur en SECOND avec une resynchronisation de toutes ses données depuis le serveur PRIM.

Remarque : Windows peut détecter une adresse IP en double sur un serveur et supprimer l'adresse IP virtuelle sur ce serveur. SafeKit dispose d'un checker pour forcer un redémarrage dans ce cas.


<!-- BEGIN INSERT: insert-safekit-hub-fr lang="fr" display="content" -->
 

## 🔍 Hub de navigation SafeKit Haute Disponibilité {#hub}

**Explorez SafeKit : fonctionnalités, vidéos techniques, documentation et essai gratuit**

Type de ressource | Description | Lien direct  
---|---|---  
**Fonctionnalités clés** | Pourquoi choisir SafeKit pour une haute disponibilité simple et économique ? | [Voir pourquoi choisir SafeKit pour la Haute Disponibilité](</safekit-docs/fr/#why-choose-safekit-for-ha> "Découvrez les fonctionnalités de SafeKit pour une haute disponibilité simple et économique")  
**Cas d'usage** | Découvrez comment SafeKit garantit la haute disponibilité des infrastructures critiques | [Voir tous les cas d'usage (Logiciels OEM, Serveurs Edge, SCADA, et plus)](</safekit-docs/fr/#safekit-use-cases> "Découvrez les cas d'usage de SafeKit pour la haute disponibilité")  
**Modèle de déploiement** | HA SANless tout-en-un : Cluster logiciel sans partage (Shared-Nothing) | [Voir SafeKit HA SANless tout-en-un](</safekit-docs/fr/#all-in-one-sanless-ha> "En savoir plus sur la haute disponibilité SANless tout-en-un avec cluster logiciel sans partage")  
**Stratégies HA** | SafeKit : Infrastructure (VM) vs Haute Disponibilité au niveau applicatif | [Voir SafeKit HA & Redondance : Niveau VM vs Niveau Applicatif](</safekit-docs/fr/#safekit-ha-redundancy-choices> "Comparez la redondance au niveau VM avec les stratégies de haute disponibilité au niveau applicatif de SafeKit")  
**Spécifications techniques** | Limitations techniques pour le clustering SafeKit | [Voir les limitations de la Haute Disponibilité SafeKit](</safekit-docs/fr/#safekit-ha-limitations> "Configuration requise et limitations techniques pour le clustering d'applications SafeKit")  
**Preuve de concept** | SafeKit : Démos de configuration HA et de basculement | [Voir les tutoriels de basculement SafeKit](</safekit-docs/fr/#safekit-failover-tutorials> "Vidéos pas à pas sur la haute disponibilité SafeKit, de l'installation au basculement automatisé")  
**Architecture** | Fonctionnement du cluster miroir SafeKit (Réplication et basculement en temps réel) | [Voir Cluster miroir SafeKit : réplication et basculement en temps réel](</safekit-docs/fr/#safekit-mirror-cluster> "Découvrez l'architecture technique et le mécanisme de basculement du cluster miroir SafeKit")  
**Architecture** | Fonctionnement du cluster de ferme SafeKit (Répartition de charge réseau et basculement) | [Voir Cluster de ferme SafeKit : répartition de charge et basculement](</safekit-docs/fr/#safekit-farm-cluster> "Présentation technique de l'architecture du cluster de ferme SafeKit avec répartition de charge réseau")  
**Avantages concurrentiels** | Comparaison : SafeKit vs Clusters de Haute Disponibilité (HA) traditionnels | [Voir la comparaison SafeKit vs Clusters HA traditionnels](</safekit-docs/fr/#safekit-ha-comparison> "Comparaison détaillée du logiciel SafeKit par rapport aux clusters HA matériels traditionnels")  
**Ressources techniques** | SafeKit Haute Disponibilité : Documentation, téléchargements et essai | [Voir l'essai gratuit SafeKit HA & la documentation technique](</safekit-docs/fr/#safekit-ha-technical-resources> "Accédez à l'essai gratuit de SafeKit, à la documentation technique et aux livres blancs sur la haute disponibilité")  
**Solutions préconfigurées** | Bibliothèque de modules applicatifs SafeKit : solutions HA prêtes à l'emploi | [Voir les modules applicatifs de Haute Disponibilité SafeKit](</safekit-docs/fr/#safekit-ha-application-modules> "Parcourez la bibliothèque de modules SafeKit préconfigurés pour le basculement automatique d'applications")  
  

<!-- END INSERT: insert-safekit-hub-fr lang="fr" display="content" -->
 


<!-- BEGIN INSERT: insert-safekit-4-buttons-fr lang="fr" display="content" -->
<div class="button-row">
  <a class="btn-action" href="https://safekit.eviden.com/fr/contact-us-for-safekit/">🧑 Nous contacter</a>
  <a class="btn-action" href="/safekit-docs/fr/resources/safekit-free-trial/">🎁 Essai gratuit de SafeKit</a>
  <a class="btn-action" href="https://training.my.evidian.com/mod/page/view.php?id=712">🏅 Certification gratuite</a>
  <a class="btn-action" href="https://safekit.eviden.com/fr/get-a-quote-safekit/">💰 Prix licence perpétuelle</a>
</div>
<!-- END INSERT: insert-safekit-4-buttons-fr lang="fr" display="content" -->