---
title: "Logiciel de clustering actif-actif avec réplication en temps réel et basculement mutuel"
slug: "active-active-cluster-real-time-replication"
canonical: "https://safekit.eviden.com/fr/architectures/active-active-cluster-real-time-replication/"
description: "Logiciel de clustering actif-actif avec réplication en temps réel et basculement mutuel Comment fonctionne le cluster actif actif avec réplication en temps réel ?"
category: "architectures"
lang: "fr"
topics: "Comment fonctionne le cluster actif actif avec réplication en temps réel ?, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# Logiciel de clustering actif-actif avec réplication en temps réel et basculement mutuel

## Comment fonctionne le cluster actif actif avec réplication en temps réel ?

### Cluster actif-actif avec réplication en temps réel

Les applications s'exécutent sur deux serveurs en basculement mutuel. Chaque serveur est le backup de l'autre serveur. Et chaque application fonctionne sur ses propres répertoires de fichiers répliqués.


<img src="/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png" width="300" alt="Cluster actif actif SafeKit avec réplication en temps réel">


Si un serveur tombe en panne dans un cluster actif actif, toutes les applications seront actives sur le même serveur. Après le redémarrage du serveur défaillant, les applications recommenceront à s'exécuter sur leur serveur principal par défaut.

### Comment ça marche ?

Le cluster actif actif de SafeKit est simplement configuré en déployant deux modules miroirs avec réplication en temps réel. Chaque module miroir contient sa propre configuration d'adresse IP virtuelle, de répertoires répliqués en temps réel et de scripts de redémarrage.

Noter que:

  * les 2 applications Appli1 et Appli2 doivent être installées sur chaque serveur pour le basculement applicatif,
  * cette architecture n'est pas réduite à 2 applications : N modules applicatifs peuvent être déployés sur 2 serveurs avec un maximum de 25 modules,
  * chaque module miroir aura sa propre adresse IP virtuelle, ses propres répertoires de fichiers répliqués et ses propres scripts de reprise.


### Exemple de cluster actif actif

Les solutions [Hyper-V](</solutions/hyper-v-replication-automatic-failover-load-balancing/>) ou [KVM](</solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>) avec réplication, basculement automatique et équilibrage de charge des VMs est un exemple de cluster actif-actif avec N modules miroirs répliquant N machines virtuelles entre deux serveurs physiques.

Dans cette configuration, un module miroir réplique une machine virtuelle complète et redémarre la machine virtuelle en cas de panne.

Il n'y a pas d'adresse IP virtuelle dans un tel module car le redémarrage d'une VM sur un serveur provoque automatiquement le basculement de l'adresse IP physique de la VM. 

Et une application critique est installée à l'intérieur d'une VM dans cette architecture.


{{%  insert-safekit-hub-fr %}}
 


{{%  insert-safekit-4-buttons-fr %}}