---
title: "Haute disponibilité et redondance pour les systèmes de gestion technique du bâtiment (GTB)"
slug: "building-management-system-software-bms-redundancy"
canonical: "https://safekit.eviden.com/fr/use-cases/building-management-system-software-bms-redundancy/"
description: "Haute disponibilité et redondance pour les systèmes de gestion technique du bâtiment (GTB) Un système de gestion des bâtiments (BMS - Building Management System) apporte le contrôle centralisé automatique du bâtiment: chauffage, ventilation, climatisation, électricité, éclairage... Un système de gestion des bâtiments augmente la sécurité des résidents du bâtiment, réduit la consommation d'énergie et réduit […]"
category: "use-cases"
lang: "fr"
topics: "Qu'est-ce qu'un système de gestion des bâtiments (BMS) ?, Pourquoi un logiciel BMS est critique ?, Liste des acteurs clés sur le marché BMS, SafeKit apporte deux solutions pour la redondance et la haute disponibilité des logiciels BMS, SafeKit, une solution reconnue sur le marché de la sécurité, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# Haute disponibilité et redondance pour les systèmes de gestion technique du bâtiment (GTB)

##  Qu'est-ce qu'un système de gestion des bâtiments (BMS) ? 

Un système de gestion des bâtiments (BMS - Building Management System) apporte le contrôle centralisé automatique du bâtiment: chauffage, ventilation, climatisation, électricité, éclairage...

Un système de gestion des bâtiments augmente la sécurité des résidents du bâtiment, réduit la consommation d'énergie et réduit les coûts d'exploitation et de maintenance.

##  Pourquoi un logiciel BMS est critique ? 

Le logiciel BMS contrôle le système d'incendie, les panneaux de distribution électrique, la consommation d'eau, les systèmes de climatisation, le contrôle de l'éclairage.

La sécurité des personnes dans le bâtiment est directement associée à la bonne exécution du logiciel BMS.

Et c'est pourquoi, le système doit être toujours disponible pour les exploitants d'immeubles qui doivent réagir immédiatement au moindre incident.

##  Liste des acteurs clés sur le marché BMS 

Les acteurs clés du BMS sont :

  * Honeywell International Inc. (US)
  * Johnson Controls (Ireland)
  * Schneider Electric (France)
  * Siemens (Germany)
  * United Technologies (US)
  * ABB (Sweden)
  * Azbil Corporation (Japan)
  * Delta Controls (India)
  * LARSEN & TOUBRO LIMITED (India)
  * Mitsubishi Electric Corporation (Japan)


  * Robert Bosch GmbH (Germany)
  * Singapore Technologies Engineering Ltd (Singapore)
  * DEXMA SENSORS, S.L. (Spain)
  * Eagle Technology (India)
  * Legrand (France)
  * Lutron Electronics Co., Inc. (US)
  * Technovator International Limited (Singapore)
  * Airedale Air Conditioning (UK)
  * BuildingIQ (US)
  * ACUITY BRANDS LIGHTING, INC. (US)
  * GridPoint (US)



<!-- BEGIN INSERT: insert-safekit-security-solutions-fr lang="fr" display="content" querystring="app=BMS" -->
 

## SafeKit apporte deux solutions pour la redondance et la haute disponibilité des logiciels BMS 

### Redondance et haute disponibilité au niveau de l'application

Dans ce type de solution, seules les données applicatives sont répliquées. Et seule l'application est redémarrée en cas de panne.


<img src="/safekit-docs/wp-content/uploads/2023/02/application-ha-4.png" width="168" alt="Redondance au niveau applicatif pour un logiciel BMS">


Cette solution nécessite une compréhension technique de l'application. Vous devez définir quels services redémarrer, spécifier les dossiers d'application à répliquer et configurer une adresse IP virtuelle pour le basculement. Mais cette solution est indépendante de la plate-forme et fonctionne avec des applications à l'intérieur de machines physiques, de machines virtuelles, dans le Cloud. Tout hyperviseur est supporté (VMware, Hyper-V...).

### Exemples

  * Gestion vidéo : [Milestone (Management, SQL, Log, Event)/SafeKit](</safekit-docs/solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/>)
  * Gestion vidéo : [Genetec (SQL)/SafeKit](</safekit-docs/solutions/genetec-sql-server-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/>)
  * Contrôle d'accès : [Nedap (AEOS , SQL)/SafeKit](</safekit-docs/solutions/nedap-high-availability-synchronous-replication-failover/>)
  * Nouvelle application (définir les services à redémarrer, les dossiers d'application à répliquer, une adresse IP virtuelle pour le basculement) : [Windows](</safekit-docs/solutions/windows-high-availability-software-synchronous-replication-failover/>), [Linux](</safekit-docs/solutions/linux-high-availability-software-synchronous-replication-failover/>)


### Redondance et haute disponibilité au niveau machine virtuelle

Dans ce type de solution, le logiciel BMS est placé dans une machine virtuelle. La machine virtuelle (VM) complète est répliquée et redémarrée (Application + OS).


<img src="/safekit-docs/wp-content/uploads/2023/02/vm-ha-4.png" width="184" alt="Redondance au niveau machine virtuelle pour un logiciel BMS">


L'avantage de cette solution est qu'elle ne nécessite pas une compréhension technique de l'application; vous devez seulement définir l'emplacement des fichiers de la VM où l'application est installée. Cette solution est générique pour tous les logiciels BMS. Cependant, elle fonctionne avec les hyperviseurs Windows/Hyper-V et Linux/KVM mais pas avec VMware. Il s'agit d'une solution active/active avec plusieurs machines virtuelles répliquées et redémarrées entre deux nœuds.

### Exemples

  * Gestion des bâtiments : [Siemens Desigo CC/SafeKit](</safekit-docs/solutions/siemens-desigo-cc-redundancy-high-availability-cluster-active-active/>)
  * Gestion vidéo et contrôle d'accès : [Siemens Siveillance suite/SafeKit](</safekit-docs/solutions/siemens-siveillance-redundancy-high-availability-cluster-active-active/>)
  * Nouvelle application (définir l'emplacement du dossier des fichiers de la VM où l'application est installée) : [Windows/Hyper-V](</safekit-docs/solutions/hyper-v-replication-automatic-failover-load-balancing/>), [Linux/KVM](</safekit-docs/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)


Plus de [comparaison entre la HA au niveau des VMs et la HA au niveau application](</safekit-docs/fr/best-practises/vm-ha-vs-application-ha/>)


<!-- END INSERT: insert-safekit-security-solutions-fr lang="fr" display="content" querystring="app=BMS" -->
 


<!-- BEGIN INSERT: insert-safekit-security-case-fr lang="fr" display="content" -->
 

## SafeKit, une solution reconnue sur le marché de la sécurité

###  Milestone a choisi SafeKit 

SafeKit est déployé dans plus de 30 pays avec le logiciel de gestion vidéo de Milestone.

[SafeKit est validé par Milestone](<https://www.milestonesys.com/products/expand-your-solution/milestone-extensions/management-server-failover/>) pour la redondance et la haute disponibilité du serveur de management.

SafeKit est la meilleure solution car elle est purement logicielle, totalement indépendante du matériel.

###  Solution préférée par Siemens 

SafeKit est disponible dans le [marketplace Siemens](<https://www.siemens.com/en-us/products/atos-safekit/>) avec la [suite Siveillance](</safekit-docs/solutions/siemens-siveillance-redundancy-high-availability-cluster-active-active/>) (vidéo et contrôle d'accès) et avec ses logiciels SCADA : [Desigo CC](</safekit-docs/solutions/siemens-desigo-cc-redundancy-high-availability-cluster-active-active/>) (gestion technique du bâtiment), [SIMATIC WinCC](</safekit-docs/solutions/siemens-simatic-wincc-redundancy-high-availability-cluster-active-active/>), [SIMATIC PCS 7](</safekit-docs/solutions/siemens-simatic-pcs-7-redundancy-high-availability-cluster-active-active/>).

SafeKit est déployé par Siemens en Australie, en France, aux Pays-Bas, au Qatar, en Suisse, aux Émirats arabes unis, au Royaume-Uni et aux États-Unis.

###  SafeKit recommandé par Nedap 

Nedap, un acteur clé du contrôle d'accès physique, recommande SafeKit pour la redondance et la haute disponibilité de son application AEOS.

La [solution Nedap/SafeKit](</safekit-docs/solutions/nedap-high-availability-synchronous-replication-failover/>) est disponible avec un essai gratuit et un guide d'installation rapide.

###  TIL Technologies a choisi SafeKit 

SafeKit est déployé dans plus de 100 sites clients par TIL Technologies pour le contrôle d'accès et la gestion des bâtiments.

SafeKit est l'option de [haute disponibilité de MICROSESAME](<https://www.til-technologies.fr/fr_FR/produits/microsesame>).

###  Prix de l'innovation dans les logiciels de gestion vidéo 

Les lecteurs de Benchmark Magazine (spécialisé dans les systèmes de sécurité physique pour revendeurs & SI) ont voté pour [SafeKit comme une innovation dans les logiciels de gestion vidéo](<https://benchmarkmagazine.com/evidian-safekit-redundancy-and-high-availability/>).

Ce prix montre l'importance de la redondance dans les offres de sécurité.


<!-- END INSERT: insert-safekit-security-case-fr lang="fr" display="content" -->
 


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