---
title: "Comment implémenter des serveurs redondants avec un logiciel de haute disponibilité simple"
slug: "how-to-implement-redundant-servers-with-a-simple-software-windows-linux"
canonical: "https://safekit.eviden.com/fr/best-practises/how-to-implement-redundant-servers-with-a-simple-software-windows-linux/"
description: "Comment implémenter des serveurs redondants avec un logiciel de haute disponibilité simple Comment mettre en œuvre des serveurs redondants actif/passif avec réplication en temps réel et basculement sur panne ? Le cluster miroir de SafeKit Dans un cluster miroir, le logiciel SafeKit est installé sur deux serveurs physiques ou virtuels exécutant Windows ou Linux (sur […]"
category: "best-practises"
lang: "fr"
topics: "Comment mettre en œuvre des serveurs redondants actif/passif avec réplication en temps réel et basculement sur panne ?, Comment mettre en œuvre des serveurs redondants actif/actif avec équilibrage de la charge réseau et basculement sur panne ?, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# Comment implémenter des serveurs redondants avec un logiciel de haute disponibilité simple

## Comment mettre en œuvre des serveurs redondants actif/passif avec réplication en temps réel et basculement sur panne ?

### Le cluster miroir de SafeKit


<img src="/safekit-docs/wp-content/uploads/2023/02/safekit-prim-second-300.png" width="300" alt="Serveurs redondants avec réplication de fichiers temps réel et basculement sur panne">


Dans un cluster miroir, le logiciel SafeKit est installé sur deux serveurs physiques ou virtuels exécutant Windows ou Linux (sur site ou dans le Cloud). Le serveur primaire est le serveur actif et exécute une application critique. Le serveur secondaire est un serveur redondant passif et reçoit en temps réel toutes les modifications apportées par l'application à l'intérieur de ses fichiers. Les clients sont connectés à une [ adresse IP virtuelle](</safekit-docs/fr/best-practises/how-a-virtual-ip-address-works/#virtual-ip-same-subnet-failover>). Si le serveur actif est en panne, SafeKit redémarre automatiquement l'application critique sur le serveur redondant passif qui devient primaire et commute l'adresse IP virtuelle. Lorsque le serveur défaillant est redémarré, il est automatiquement resynchronisé et devient le serveur redondant passif fonctionnant comme secondaire.

## Comment mettre en œuvre des serveurs redondants actif/actif avec équilibrage de la charge réseau et basculement sur panne ?

### Le cluster ferme de SafeKit


<img src="/safekit-docs/wp-content/uploads/2023/02/safekit-up-up-up-300.png" width="300" alt="Serveurs redondants avec équilibrage de charge réseau et basculement sur panne">


Dans un cluster de serveurs en ferme, le logiciel SafeKit est installé sur des serveurs redondants sous Windows ou Linux (sur site ou dans le Cloud). Tous les serveurs sont actifs et exécutent une même application frontale critique. Les clients sont connectés à une [adresse IP virtuelle](</safekit-docs/fr/best-practises/how-a-virtual-ip-address-works/#vip-load-balancing-same-subnet>). Les sessions TCP sont partagées entre tous les serveurs redondants. Si un serveur est en panne, SafeKit reconfigure automatiquement l'équilibrage de charge des sessions TCP entre les serveurs actifs restants. Lorsque le serveur défaillant est redémarré, il est automatiquement réintégré en tant que serveur redondant actif et reçoit de nouvelles sessions TCP.


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