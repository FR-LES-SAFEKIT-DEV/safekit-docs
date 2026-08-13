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


<img src="/safekit-docs/wp-content/uploads/2023/02/remote-datacenters.png" width="300" alt="Logiciel simple de continuité d'activité et de reprise après sinistre avec SafeKit">

 

Il n'y a aucune différence de configuration lors du déploiement d'un cluster SafeKit dans la même salle informatique ou entre des salles informatiques distantes, à condition qu'un réseau LAN étendu ou un VLAN étiré soit disponible entre les sites distants.

### Comment mettre en œuvre une solution de haute disponibilité simple entre deux salles informatiques distantes ?

Les modules mirror et farm de SafeKit peuvent être déployés facilement sur des serveurs situés dans des salles informatiques distantes, sans configuration de cluster particulière. SafeKit combine ainsi continuité d'activité et reprise après sinistre au sein d'une architecture unique et simple. SafeKit gère également le [split brain](</safekit-docs/fr/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) en cas d'isolement réseau, sans nécessiter de troisième serveur ni de disque quorum spécifique.

### Continuité d'activité vs solutions de sauvegarde

La continuité d'activité et les solutions de sauvegarde répondent à des scénarios de défaillance différents et sont complémentaires plutôt qu'interchangeables. La continuité d'activité, assurée par le clustering haute disponibilité de SafeKit, maintient les applications en fonctionnement avec une interruption minimale en cas de défaillance d'un serveur ou d'une application, grâce à la réplication en temps réel et à la reprise automatique. Les solutions de sauvegarde protègent contre une perte plus large, telle qu'une attaque par ransomware ou une erreur opérateur, et reposent généralement sur des copies de données hors site pouvant être restaurées ultérieurement, avec des délais de reprise plus longs mais sans reprise automatique.

Pour en savoir plus : [Combiner la haute disponibilité SafeKit avec des sauvegardes de reprise après sinistre](</safekit-docs/fr/best-practises/high-availability-disaster-recovery-hadr/>).


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