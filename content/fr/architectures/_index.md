---
title: "Architectures à haute disponibilité : mise en miroir, ferme de serveurs et clustering logiciel avancé"
slug: "architectures"
canonical: "https://safekit.eviden.com/fr/architectures/"
description: "Architectures à haute disponibilité : mise en miroir, ferme de serveurs et clustering logiciel avancé Quelles sont les différentes architectures de haute disponibilité et les différents clusters logiciels avec SafeKit ?"
category: "architectures"
lang: "fr"
topics: "Quelles sont les différentes architectures de haute disponibilité et les différents clusters logiciels avec SafeKit ?, Comment créer des clusters de haute disponibilité avec SafeKit ?, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# Architectures à haute disponibilité : mise en miroir, ferme de serveurs et clustering logiciel avancé

## Quelles sont les différentes architectures de haute disponibilité et les différents clusters logiciels avec SafeKit ?

### Cluster miroir


<img src="/safekit-docs/wp-content/uploads/2023/02/safekit-prim-second-300.png" width="300" alt="SafeKit mirror cluster">


[Plus d'informations](</safekit-docs/fr/architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### Cluster ferme


<img src="/safekit-docs/wp-content/uploads/2023/02/safekit-up-up-up-300.png" width="300" alt="SafeKit farm cluster">


[Plus d'informations](</safekit-docs/fr/architectures/network-load-balancing-cluster/>)

### Cluster ferme + miroir


<img src="/safekit-docs/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png" width="300" alt="SafeKit farm + mirror cluster">


[Plus d'informations](</safekit-docs/fr/architectures/clustering-software-load-balancing-mirroring/>)

### Cluster actif/actif


<img src="/safekit-docs/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png" width="300" alt="SafeKit active active cluster with real-time replication">


[Plus d'informations](</safekit-docs/fr/architectures/active-active-cluster-real-time-replication/>)

### Cluster N-1


<img src="/safekit-docs/wp-content/uploads/2023/02/safekit-n-1-300-3.png" width="300" alt="SafeKit N-1 redundancy cluster">


[Plus d'informations](</safekit-docs/fr/architectures/n-1-redundancy/>)

## Comment créer des clusters de haute disponibilité avec SafeKit ?

### Utiliser des modules de haute disponibilité

Un module de haute disponibilité est une personnalisation de SafeKit pour une application. Il existe deux types de modules : le module miroir avec réplication de données en temps réel et basculement et le module ferme avec équilibrage de charge et basculement.

Si vous déployez un module miroir sur 2 serveurs, alors vous créez un cluster miroir et si vous déployez un module ferme sur N serveurs, alors vous créez un cluster ferme.

Plusieurs modules applicatifs peuvent être déployés sur les mêmes serveurs. Ainsi, des architectures de clustering avancées peuvent être implémentées comme celles présentées précédemment (ferme+miroir, actif/actif, N-1).

### Qu'est-ce qu'un module ?

En pratique, un module applicatif est un fichier « .Safe » (type zip) comprenant :

1 - le fichier de configuration userconfig.xml qui contient :

  * les noms ou adresses IP physiques des serveurs,
  * le nom ou l'adresse IP virtuelle du cluster,
  * les répertoires de fichiers à répliquer en temps réel (pour un module miroir),
  * les critères d'équilibrage de charge réseau (pour un module ferme),
  * la configuration des détecteurs de pannes logicielles et matérielles


2 - les scripts pour démarrer et arrêter l'application.

### Déploiement plug and play de modules de haute disponibilité

Une fois qu'un module applicatif est configuré et testé avec une application, le déploiement ne nécessite aucune compétence informatique spécifique :

  1. installer l'application sur 2 serveurs standards (physiques ou virtuels),
  2. installer le logiciel SafeKit sur les deux serveurs,
  3. installer le module applicatif sur les deux serveurs.



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