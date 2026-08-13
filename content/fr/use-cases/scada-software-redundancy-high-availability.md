---
title: "Haute disponibilité et redondance pour les systèmes SCADA et les systèmes de contrôle industriel (ICS)"
slug: "scada-software-redundancy-high-availability"
canonical: "https://safekit.eviden.com/fr/use-cases/scada-software-redundancy-high-availability/"
description: "Haute disponibilité et redondance pour les systèmes SCADA et les systèmes de contrôle industriel (ICS) Les systèmes SCADA permettent aux organisations industrielles de contrôler les processus industriels, d'interagir directement avec des dispositifs tels que des capteurs, des vannes, des pompes, des moteurs, via un logiciel et une interface homme-machine. Si le logiciel SCADA est en […]"
category: "use-cases"
lang: "fr"
topics: "Qu'est-ce qu'un système SCADA?, Pourquoi un logiciel SCADA est critique ?, Liste des acteurs clés dans les logiciels SCADA, SafeKit apporte deux solutions pour la redondance et la haute disponibilité des logiciels SCADA, SafeKit, une solution reconnue sur le marché SCADA, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# Haute disponibilité et redondance pour les systèmes SCADA et les systèmes de contrôle industriel (ICS)

##  Qu'est-ce qu'un système SCADA? 

Les systèmes SCADA permettent aux organisations industrielles de contrôler les processus industriels, d'interagir directement avec des dispositifs tels que des capteurs, des vannes, des pompes, des moteurs, via un logiciel et une interface homme-machine.

##  Pourquoi un logiciel SCADA est critique ? 

Si le logiciel SCADA est en panne, la production s'arrête.

C'est pourquoi, le logiciel SCADA doit être toujours disponible pour les opérateurs qui doivent réagir immédiatement au moindre incident.

##  Liste des acteurs clés dans les logiciels SCADA 

Selon ce [rapport d'analyste](<https://www.linkedin.com/pulse/global-scada-market-size-reach-value-usd-/>), les acteurs clés des logiciels SCADA sont :

  * Siemens
  * ABB
  * Rockwell Automation
  * Senergy Intellution Pvt Ltd
  * Emerson
  * Omron Automation
  * Data Flow Systems, Inc.
  * Alstom


  * Schneider Electric
  * Wonderware
  * Mitsubishi Heavy Industries
  * Yokogawa Electric Corporation
  * Eaton
  * GE
  * Honeywell
  * Pilz
  * Survalent
  * Valmet GmbH
  * Hitachi



<!-- BEGIN INSERT: insert-safekit-scada-solutions-fr lang="fr" display="content" querystring="app=SCADA" -->
 

## SafeKit apporte deux solutions pour la redondance et la haute disponibilité des logiciels SCADA

### Redondance et haute disponibilité au niveau de l'application

Dans ce type de solution, seules les données applicatives sont répliquées. Et seule l'application est redémarrée en cas de panne.


<img src="/safekit-docs/wp-content/uploads/2023/02/application-ha-4.png" width="168" alt="Redondance au niveau applicatif pour un logiciel SCADA">


Avec cette solution, des scripts de reprise doivent être écrits pour redémarrer l'application. Cette solution est indépendante de la plate-forme et fonctionne avec des applications à l'intérieur de machines physiques, de machines virtuelles, dans le Cloud. Tout hyperviseur est supporté (VMware, Hyper-V...).

  * Solution pour une nouvelle application (scripts de reprise à écrire): [Windows](</safekit-docs/solutions/windows-high-availability-software-synchronous-replication-failover/>), [Linux](</safekit-docs/solutions/linux-high-availability-software-synchronous-replication-failover/>)


### Redondance et haute disponibilité au niveau machine virtuelle

Dans ce type de solution, le logiciel SCADA est placé dans une machine virtuelle. La machine virtuelle (VM) complète est répliquée et redémarrée (Application + OS).


<img src="/safekit-docs/wp-content/uploads/2023/02/vm-ha-4.png" width="186" alt="Redondance au niveau machine virtuelle pour un logiciel SCADA">


L'avantage de cette solution est qu'il n'y a pas de scripts de reprise à écrire par application. Cette solution est générique pour tous les logiciels SCADA. Elle fonctionne avec les hyperviseurs Windows/Hyper-V et Linux/KVM mais pas avec VMware. Il s'agit d'une solution active/active avec plusieurs machines virtuelles répliquées et redémarrées entre deux nœuds.

  * Solutions pour une nouvelle application (pas de script de reprise à écrire) : [Windows/Hyper-V](</safekit-docs/solutions/hyper-v-replication-automatic-failover-load-balancing/>), [Linux/KVM](</safekit-docs/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)



<!-- END INSERT: insert-safekit-scada-solutions-fr lang="fr" display="content" querystring="app=SCADA" -->
 


<!-- BEGIN INSERT: insert-safekit-scada-case-fr lang="fr" display="content" -->
 

## SafeKit, une solution reconnue sur le marché SCADA

###  Solution préférée par Siemens 


<img src="/safekit-docs/wp-content/uploads/2023/01/desigo-cc-1280-250-1.jpg" width="1000" alt="SafeKit avec le système Siemens Desigo CC SCADA">


SafeKit est disponible dans le [marketplace Siemens](<https://www.siemens.com/en-us/products/atos-safekit/>) avec ses logiciels SCADA : [Desigo CC](</safekit-docs/solutions/siemens-desigo-cc-redundancy-high-availability-cluster-active-active/>) (gestion technique du bâtiment), [SIMATIC WinCC](</safekit-docs/solutions/siemens-simatic-wincc-redundancy-high-availability-cluster-active-active/>), [SIMATIC PCS 7](</safekit-docs/solutions/siemens-simatic-pcs-7-redundancy-high-availability-cluster-active-active/>) et aussi avec la [suite Siveillance](</safekit-docs/solutions/siemens-siveillance-redundancy-high-availability-cluster-active-active/>) (vidéo et contrôle d'accès).

SafeKit est déployé par Siemens en Australie, en France, aux Pays-Bas, au Qatar, en Suisse, aux Émirats arabes unis, au Royaume-Uni et aux États-Unis.

###  SafeKit choisi par le groupe Alstef 


<img src="/safekit-docs/wp-content/uploads/2023/01/alstef-bagware-1280-250-1.jpg" width="1000" alt="SafeKit avec le système SCADA du groupe Alstef, BAGware">


Alstef Group, acteur clé des systèmes de tri des bagages, déploie SafeKit pour la redondance et la haute disponibilité de sa [suite logicielle SCADA, BAGware](<https://alstefgroup.com/baggage-handling/software/bagware/>).

SafeKit a été déployé par Alstef dans de nombreux aéroports avec BAGware.

###  Fives Syleps a choisi SafeKit 


<img src="/safekit-docs/wp-content/uploads/2023/01/fives-syleps-1280-250.jpg" width="1000" alt="SafeKit avec le système logistique automatisé de Fives Syleps">


Fives Syleps, acteur clé de la logistique automatisée, déploie SafeKit pour la redondance et la haute disponibilité de [sa suite logicielle](<https://www.syleps.com>).

SafeKit a été déployé par Fives Syleps dans de nombreuses usines.


<!-- END INSERT: insert-safekit-scada-case-fr lang="fr" display="content" -->
 


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