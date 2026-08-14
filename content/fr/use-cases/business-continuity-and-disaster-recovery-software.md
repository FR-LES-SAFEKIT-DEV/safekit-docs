---
title: "Logiciel de continuité d'activité et de reprise après sinistre pour clusters à 2 nœuds avec SafeKit"
slug: "business-continuity-and-disaster-recovery-software"
canonical: "https://safekit.eviden.com/fr/use-cases/business-continuity-and-disaster-recovery-software/"
description: "Logiciel de continuité d'activité et de reprise après sinistre pour clusters à 2 nœuds avec SafeKit Comment mettre en place à la fois un PCA (Plan de Continuité d'Activité) et un PRA (Plan de Reprise d'Activité) ?"
category: "use-cases"
lang: "fr"
topics: "Comment mettre en place à la fois un PCA (Plan de Continuité d'Activité) et un PRA (Plan de Reprise d'Activité) ?, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# Logiciel de continuité d'activité et de reprise après sinistre pour clusters à 2 nœuds avec SafeKit

## Comment mettre en place à la fois un PCA (Plan de Continuité d'Activité) et un PRA (Plan de Reprise d'Activité) ?

### Raisons de choisir le logiciel SafeKit pour un PCA et un PRA


<img src="/wp-content/uploads/2023/02/remote-datacenters.png" width="300" alt="Logiciel simple de continuité d'activité et de reprise après sinistre avec SafeKit">

 

Il n'y a aucune différence de configuration lors du déploiement d'un cluster SafeKit dans la même salle informatique ou entre des salles informatiques distantes, à condition qu'un réseau LAN étendu ou un VLAN étiré soit disponible entre les sites distants.

### Comment mettre en œuvre une solution de haute disponibilité simple entre deux salles informatiques distantes ?

Les modules mirror et farm de SafeKit peuvent être déployés facilement sur des serveurs situés dans des salles informatiques distantes, sans configuration de cluster particulière. SafeKit combine ainsi continuité d'activité et reprise après sinistre au sein d'une architecture unique et simple. SafeKit gère également le [split brain](</fr/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) en cas d'isolement réseau, sans nécessiter de troisième serveur ni de disque quorum spécifique.

### Continuité d'activité vs solutions de sauvegarde

La continuité d'activité et les solutions de sauvegarde répondent à des scénarios de défaillance différents et sont complémentaires plutôt qu'interchangeables. La continuité d'activité, assurée par le clustering haute disponibilité de SafeKit, maintient les applications en fonctionnement avec une interruption minimale en cas de défaillance d'un serveur ou d'une application, grâce à la réplication en temps réel et à la reprise automatique. Les solutions de sauvegarde protègent contre une perte plus large, telle qu'une attaque par ransomware ou une erreur opérateur, et reposent généralement sur des copies de données hors site pouvant être restaurées ultérieurement, avec des délais de reprise plus longs mais sans reprise automatique.

Pour en savoir plus : [Combiner la haute disponibilité SafeKit avec des sauvegardes de reprise après sinistre](</fr/best-practises/high-availability-disaster-recovery-hadr/>).


{{%  insert-safekit-hub-fr %}}
 


{{%  insert-safekit-4-buttons-fr %}}