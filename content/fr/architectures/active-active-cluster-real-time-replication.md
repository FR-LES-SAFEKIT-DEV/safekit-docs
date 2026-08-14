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


<!-- BEGIN INSERT: insert-safekit-hub-fr lang="fr" display="content" -->
 

## 🔍 Hub de navigation SafeKit Haute Disponibilité {#hub}

**Explorez SafeKit : fonctionnalités, vidéos techniques, documentation et essai gratuit**

Type de ressource | Description | Lien direct  
---|---|---  
**Fonctionnalités clés** | Pourquoi choisir SafeKit pour une haute disponibilité simple et économique ? | [Voir pourquoi choisir SafeKit pour la Haute Disponibilité](</fr/#why-choose-safekit-for-ha> "Découvrez les fonctionnalités de SafeKit pour une haute disponibilité simple et économique")  
**Cas d'usage** | Découvrez comment SafeKit garantit la haute disponibilité des infrastructures critiques | [Voir tous les cas d'usage (Logiciels OEM, Serveurs Edge, SCADA, et plus)](</fr/#safekit-use-cases> "Découvrez les cas d'usage de SafeKit pour la haute disponibilité")  
**Modèle de déploiement** | HA SANless tout-en-un : Cluster logiciel sans partage (Shared-Nothing) | [Voir SafeKit HA SANless tout-en-un](</fr/#all-in-one-sanless-ha> "En savoir plus sur la haute disponibilité SANless tout-en-un avec cluster logiciel sans partage")  
**Stratégies HA** | SafeKit : Infrastructure (VM) vs Haute Disponibilité au niveau applicatif | [Voir SafeKit HA & Redondance : Niveau VM vs Niveau Applicatif](</fr/#safekit-ha-redundancy-choices> "Comparez la redondance au niveau VM avec les stratégies de haute disponibilité au niveau applicatif de SafeKit")  
**Spécifications techniques** | Limitations techniques pour le clustering SafeKit | [Voir les limitations de la Haute Disponibilité SafeKit](</fr/#safekit-ha-limitations> "Configuration requise et limitations techniques pour le clustering d'applications SafeKit")  
**Preuve de concept** | SafeKit : Démos de configuration HA et de basculement | [Voir les tutoriels de basculement SafeKit](</fr/#safekit-failover-tutorials> "Vidéos pas à pas sur la haute disponibilité SafeKit, de l'installation au basculement automatisé")  
**Architecture** | Fonctionnement du cluster miroir SafeKit (Réplication et basculement en temps réel) | [Voir Cluster miroir SafeKit : réplication et basculement en temps réel](</fr/#safekit-mirror-cluster> "Découvrez l'architecture technique et le mécanisme de basculement du cluster miroir SafeKit")  
**Architecture** | Fonctionnement du cluster de ferme SafeKit (Répartition de charge réseau et basculement) | [Voir Cluster de ferme SafeKit : répartition de charge et basculement](</fr/#safekit-farm-cluster> "Présentation technique de l'architecture du cluster de ferme SafeKit avec répartition de charge réseau")  
**Avantages concurrentiels** | Comparaison : SafeKit vs Clusters de Haute Disponibilité (HA) traditionnels | [Voir la comparaison SafeKit vs Clusters HA traditionnels](</fr/#safekit-ha-comparison> "Comparaison détaillée du logiciel SafeKit par rapport aux clusters HA matériels traditionnels")  
**Ressources techniques** | SafeKit Haute Disponibilité : Documentation, téléchargements et essai | [Voir l'essai gratuit SafeKit HA & la documentation technique](</fr/#safekit-ha-technical-resources> "Accédez à l'essai gratuit de SafeKit, à la documentation technique et aux livres blancs sur la haute disponibilité")  
**Solutions préconfigurées** | Bibliothèque de modules applicatifs SafeKit : solutions HA prêtes à l'emploi | [Voir les modules applicatifs de Haute Disponibilité SafeKit](</fr/#safekit-ha-application-modules> "Parcourez la bibliothèque de modules SafeKit préconfigurés pour le basculement automatique d'applications")  
  

<!-- END INSERT: insert-safekit-hub-fr lang="fr" display="content" -->
 


<!-- BEGIN INSERT: insert-safekit-4-buttons-fr lang="fr" display="content" -->
<div class="button-row">
  <a class="btn-action" href="https://safekit.eviden.com/fr/contact-us-for-safekit/">🧑 Nous contacter</a>
  <a class="btn-action" href="/fr/resources/safekit-free-trial/">🎁 Essai gratuit de SafeKit</a>
  <a class="btn-action" href="https://training.my.evidian.com/mod/page/view.php?id=712">🏅 Certification gratuite</a>
  <a class="btn-action" href="https://safekit.eviden.com/fr/get-a-quote-safekit/">💰 Prix licence perpétuelle</a>
</div>
<!-- END INSERT: insert-safekit-4-buttons-fr lang="fr" display="content" -->