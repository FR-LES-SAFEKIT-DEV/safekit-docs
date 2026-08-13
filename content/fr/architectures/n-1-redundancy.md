---
title: "Clustering à redondance N-1 : Haute disponibilité pour plusieurs applications avec une seule sauvegarde"
slug: "n-1-redundancy"
canonical: "https://safekit.eviden.com/fr/architectures/n-1-redundancy/"
description: "Clustering à redondance N-1 : Haute disponibilité pour plusieurs applications avec une seule sauvegarde Cluster N-1 avec réplication de données et basculement applicatif entre N serveurs actifs et 1 serveur de secours"
category: "architectures"
lang: "fr"
topics: "Cluster N-1 avec réplication de données et basculement applicatif entre N serveurs actifs et 1 serveur de secours, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# Clustering à redondance N-1 : Haute disponibilité pour plusieurs applications avec une seule sauvegarde

## Cluster N-1 avec réplication de données et basculement applicatif entre N serveurs actifs et 1 serveur de secours

### Redondance N-1


<img src="/safekit-docs/wp-content/uploads/2023/02/safekit-n-1-300-3.png" width="300" alt="Cluster SafeKit avec redondance N-1">


### Comment fonctionne la redondance N-1 ?

SafeKit fournit un cluster en redondance N-1 simple avec N applications exécutées sur N serveurs et avec un seul serveur de secours pour le basculement. Dans un cluster SafeKit en redondance N-1, chaque application fonctionne sur ses propres répertoires répliqués.

En cas de panne d'un serveur principal contrairement à un [cluster actif actif](</safekit-docs/fr/architectures/active-active-cluster-real-time-replication/>), le serveur de secours n'a pas à gérer une double charge de travail.

Cela suppose qu'il n'y ait qu'une seule panne à la fois dans le cluster en redondance N-1. La solution peut prendre en charge plusieurs pannes de serveurs principaux en même temps, mais dans ce cas, le serveur de secours unique devra gérer la charge de travail combinée de tous les serveurs défaillants.

### Comment mettre en place la redondance N-1 ?

Le cluster SafeKit en redondance N-1 se configure simplement en déployant N modules miroirs sur N+1 serveurs.

Notez que :

  * toutes les applications (Appli1, Appli2, Appli3) doivent être installées sur le serveur de secours unique pour le basculement des applications,
  * chaque module miroir aura sa propre adresse IP virtuelle, ses propres répertoires de fichiers répliqués et ses propres scripts de reprise.



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