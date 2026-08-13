---
title: "Combinaison de la haute disponibilité SafeKit et des sauvegardes de reprise après sinistre"
slug: "high-availability-disaster-recovery-hadr"
canonical: "https://safekit.eviden.com/fr/best-practises/high-availability-disaster-recovery-hadr/"
description: "Combinaison de la haute disponibilité SafeKit et des sauvegardes de reprise après sinistre"
category: "best-practises"
lang: "fr"
topics: "Réplication synchrone SafeKit pour la haute disponibilité vs. réplication asynchrone de sauvegarde pour la reprise après sinistre, Table des matières, HADR Synchrone : Zéro perte de données sur réseaux rapides (LAN/VLAN), HADR Asynchrone : Reprise d'activité sur réseaux lents (WAN), Comment combiner HADR et sauvegarde pour une résilience totale du système, Comparatif des architectures HADR : Réseaux rapides vs Réseaux lents, Guide Vidéo : Comment implémenter le HADR avec SafeKit, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# Combinaison de la haute disponibilité SafeKit et des sauvegardes de reprise après sinistre

## Réplication synchrone SafeKit pour la haute disponibilité vs. réplication asynchrone de sauvegarde pour la reprise après sinistre

SafeKit offre une **architecture de Haute Disponibilité et de Reprise après Sinistre (HADR)** logicielle et flexible qui élimine le besoin de stockage partagé coûteux. En implémentant une **réplication synchrone** via un VLAN étendu entre le Serveur 1 et le Serveur 2, SafeKit garantit que vos applications critiques restent « en vie » et cohérentes entre deux sites redondants.

Pour répondre aux contraintes des réseaux WAN à faible bande passante, SafeKit est conçu pour être couplé à des **solutions de sauvegarde et de restauration**. Cela permet aux organisations de maintenir une disponibilité 24h/24 et 7j/7 grâce au basculement automatique, tout en sécurisant les données historiques pour une reprise après sinistre hors site.

Par conséquent, l'environnement est protégé contre les défaillances matérielles ou logicielles via SafeKit, et sécurisé contre les erreurs logiques et les cybermenaces telles que les ransomwares grâce à la solution de sauvegarde.


<img src="/safekit-docs/wp-content/uploads/2026/01/safekit-backup-3-nodes-5-1024.jpg" width="512" alt="Un schéma technique montrant pourquoi la haute disponibilité (SafeKit) et les sauvegardes sont complémentaires : SafeKit gère le basculement matériel/logiciel via la réplication synchrone, tandis que la sauvegarde asynchrone protège contre les ransomwares et les erreurs logiques.">


## Table des matières

  * [HADR Synchrone : Zéro perte de données sur réseaux rapides (LAN/VLAN)](<#synchronous-hadr-fast-network>)
  * [HADR Asynchrone : Reprise d'activité sur réseaux lents (WAN)](<#asynchronous-hadr-slow-network>)
  * [Comment combiner HADR et sauvegarde pour une résilience totale](<#hadr-resilience-strategy>)
  * [Comparatif des architectures HADR : réseaux rapides vs lents](<#hadr-architectures-comparison>)
  * [Guide Vidéo : Comment implémenter le HADR avec SafeKit](<#videoguide-hadr-safekit>)
  * [🔍 Hub de navigation Haute Disponibilité SafeKit](<#hub>)



<!-- BEGIN INSERT: insert-safekit-4-buttons-en lang="fr" display="content" -->
<div class="button-row">
  <a class="btn-action" href="https://safekit.eviden.com/fr/contact-us-for-safekit/">🧑 Nous contacter</a>
  <a class="btn-action" href="/safekit-docs/fr/resources/safekit-free-trial/">🎁 Essai gratuit de SafeKit</a>
  <a class="btn-action" href="https://training.my.evidian.com/mod/page/view.php?id=712">🏅 Certification gratuite</a>
  <a class="btn-action" href="https://safekit.eviden.com/fr/get-a-quote-safekit/">💰 Prix licence perpétuelle</a>
</div>
<!-- END INSERT: insert-safekit-4-buttons-en lang="fr" display="content" -->
 

## HADR Synchrone : Zéro perte de données sur réseaux rapides (LAN/VLAN) {#synchronous-hadr-fast-network}

### Comment implémenter le HADR sur un réseau rapide ? {#hadr-fast-network-architecture}


<img src="/safekit-docs/wp-content/uploads/2023/02/remote-datacenters.png" width="256" alt="Architecture combinant la Haute Disponibilité et la Reprise d'Activité (HADR) sans disques partagés">


Pour implémenter le HADR sur un réseau rapide, déployez deux nœuds sur des sites distants afin d'assurer simultanément la Haute Disponibilité et la Reprise d'Activité. Cette configuration garantit que votre application reste disponible même en cas de défaillance complète d'un site, sans la complexité d'une infrastructure de stockage partagée.

### Pourquoi utiliser une solution HADR SANless pour les réseaux rapides ? {#sanless-hadr-solution}

Une solution SANless telle que SafeKit est essentielle car elle réplique les données de manière synchrone et en temps réel entre deux nœuds, sans disques partagés. Comme la réplication synchrone garantit une perte de données nulle (RPO=0), le logiciel peut déclencher un basculement automatique de l'application instantanément en cas de défaillance matérielle ou logicielle.

### Quels sont les prérequis réseau pour le HADR synchrone ? {#extended-lan-vlan-requirements}

Le HADR synchrone nécessite un LAN étendu ou un VLAN étendu (stretched VLAN) pour trois raisons critiques :

  * **Basculement de l'IP virtuelle :** Un sous-réseau unique est nécessaire pour basculer automatiquement l'[adresse IP virtuelle](</safekit-docs/fr/best-practises/how-a-virtual-ip-address-works/>) entre les nœuds.
  * **Faible latence :** La [réplication synchrone](</safekit-docs/fr/best-practises/synchronous-replication-vs-asynchronous-replication/>) sans perte de données nécessite généralement un temps d'aller-retour réseau (RTT) inférieur à 2 ms.
  * **Bande passante élevée :** Une connexion de 1 Gb/s ou plus est requise pour garantir une resynchronisation rapide des données lors d'un retour après défaillance (failback).


## HADR Asynchrone : Reprise d'activité sur réseaux lents (WAN) {#asynchronous-hadr-slow-network}

### Comment implémenter le HADR sur un réseau lent ? {#hadr-slow-network-architecture}


<img src="/safekit-docs/wp-content/uploads/2023/03/hadr-slow-network-1.png" width="256" alt="Architecture HADR séparant la Haute Disponibilité de la Reprise d'Activité">


Pour implémenter le HADR sur un réseau lent (WAN), l'architecture sépare généralement la **Haute Disponibilité** de la **Reprise d'Activité**. Dans ce scénario, deux nœuds sont déployés sur le site primaire pour la redondance locale, tandis qu'une stratégie distincte de sauvegarde ou de réplication asynchrone est utilisée pour protéger les données sur un site distant géographiquement éloigné.

### Quelle est la meilleure solution HADR pour les connexions à faible bande passante ? {#sanless-ha-with-remote-dr}

La solution optimale consiste à déployer **SafeKit** sur le site primaire pour la Haute Disponibilité locale, en utilisant la réplication synchrone en temps réel et le basculement automatique. Pour le site de reprise d'activité, les données sont protégées via une réplication asynchrone ou des sauvegardes programmées à travers le réseau lent, garantissant que la disponibilité locale n'est pas freinée par la latence du WAN. Pour réaliser cette architecture, une **solution de sauvegarde** dédiée (autre que SafeKit) est nécessaire pour gérer le transfert des données et la restauration sur le site distant. 

### Comment fonctionne le basculement vers un site distant de Reprise d'Activité ? {#dr-site-failover-process}

Comme la réplication asynchrone sur un réseau lent implique une perte de données potentielle (RPO > 0), le processus de basculement vers un site de reprise d'activité (DR) est généralement manuel et piloté par un administrateur :

  * **Restauration des données :** Les sauvegardes sont restaurées sur les serveurs secondaires du site de DR. Des solutions modernes comme **Veeam** sont souvent utilisées pour restaurer rapidement les machines virtuelles (VM) afin de réduire le temps de reprise.
  * **Routage DNS :** Le trafic est redirigé vers le site de DR au niveau du DNS. Le temps de rétablissement dépend des délais d'expiration du cache DNS (TTL), et certaines applications clientes peuvent nécessiter un redémarrage pour prendre en compte la nouvelle adresse IP.
  * **Décision manuelle :** Un administrateur doit vérifier l'intégrité des données sur le site distant avant d'autoriser le basculement vers le centre de données secondaire.


## Comment combiner HADR et sauvegarde pour une résilience totale du système {#hadr-resilience-strategy}

### Comparatif entre Haute Disponibilité et Sauvegarde de données {#ha-vs-backup-comparison}


<img src="/safekit-docs/wp-content/uploads/2026/04/safekit-icon-512x512-1.png" width="64" alt="Logo du logiciel de haute disponibilité SafeKit">

 

<img src="/safekit-docs/wp-content/uploads/2026/01/backup-icon.png" width="64" alt="Icône de stratégie de sauvegarde de données">


Bien que les deux soient critiques pour la protection des données, la **Haute Disponibilité (HA)** et les **solutions de sauvegarde** ciblent des risques différents. La **Haute Disponibilité** , propulsée par SafeKit, fournit un mécanisme de basculement « en direct » pour maintenir l'accès aux applications lors de pannes de serveurs ou de défaillances matérielles. À l'inverse, une **solution de sauvegarde** agit comme une archive « historique ». Tandis que la HA garantit une disponibilité système de 99,99 % en répliquant les données en temps réel, la sauvegarde se concentre sur l'intégrité des données, offrant les points de restauration nécessaires pour se remettre d'erreurs logiques, de suppressions accidentelles ou d'attaques par ransomware.

### La Haute Disponibilité peut-elle remplacer une stratégie de sauvegarde ? {#ha-vs-backup-ransomware}

Non, la Haute Disponibilité et les sauvegardes sont complémentaires et non interchangeables. Bien que **SafeKit** assure la **continuité d'activité** en maintenant les applications opérationnelles lors d'une panne matérielle, il ne protège pas contre les erreurs logiques, les suppressions accidentelles ou les attaques par ransomware. Par exemple, comme la réplication en temps réel répercute instantanément chaque modification, une attaque par ransomware sur le nœud primaire sera immédiatement dupliquée sur le nœud secondaire. Pour se remettre de telles cybermenaces ou de suppressions accidentelles, vous avez besoin d'une **solution de sauvegarde** dédiée avec une politique de rétention robuste. Cela vous permet de « rembobiner » votre environnement vers un état sain, antérieur à la corruption.

### Optimiser le RTO et le RPO : La synergie entre HA et sauvegarde {#ha-backup-rpo-rto}

Pour bâtir une infrastructure véritablement résiliente, vous devez intégrer la Haute Disponibilité et la sauvegarde dans une stratégie unifiée. Ces deux technologies répondent à différentes dimensions de l'[équation du RTO (Recovery Time Objective) et du RPO (Recovery Point Objective)](</safekit-docs/fr/best-practises/what-is-rpo-and-rto-with-examples/>) : 

  * **Haute Disponibilité (via SafeKit) :** Vise une **récupération instantanée**. En maintenant un miroir synchrone et en direct de votre environnement, SafeKit atteint un RTO proche de zéro et un RPO nul. Si un serveur tombe en panne, l'application redémarre immédiatement sur le nœud secondaire, garantissant l'absence d'interruption de service ou de perte de données durant la transition.
  * **Solutions de sauvegarde :** Visent la **résilience des données**. Tandis que la HA maintient le service opérationnel (« live »), la sauvegarde crée un historique « immuable ». C'est votre dernier recours lorsque les données actives elles-mêmes sont compromises, vous permettant de restaurer une version saine de votre base de données à partir d'un point précis dans le temps, avant l'apparition d'un virus ou d'une suppression accidentelle.


## Comparatif des architectures HADR : Réseaux rapides vs Réseaux lents {#hadr-architectures-comparison}

Critères | Réseau rapide (LAN/VLAN) | Réseau lent (WAN)  
---|---|---  
**Objectif principal** | Redondance locale & Haute Disponibilité | Reprise d'activité inter-sites (DR)  
**Cas d'usage** | Même Data Center ou mode Campus | Data Centers distants ou régions Cloud  
**Type de réplication** | Synchrone (Temps réel) | Asynchrone / Sauvegarde  
**RPO (Perte de données)** | Nul (RPO = 0) | Perte de données potentielle (RPO > 0)  
**Processus de basculement** | Automatique | Manuel (Décision de l'administrateur)  
**Routage du trafic** | Adresse IP Virtuelle (VIP) | Niveau DNS (dépend du TTL)  
**Contrainte de latence** | Faible (généralement < 2ms) | Supporte une latence élevée  
**But de récupération** | Continuité d'activité immédiate | Sécurité & Rétention des données  
  
## Guide Vidéo : Comment implémenter le HADR avec SafeKit {#videoguide-hadr-safekit}

###  Comment implémenter le HADR avec SafeKit : Réplication synchrone et basculement 

Découvrez comment combiner la **Haute Disponibilité (HA)** et la **Reprise d'Activité (DR)** au sein d'une stratégie HADR unique avec SafeKit. Ce guide vidéo détaille l'architecture nécessaire pour garantir une disponibilité applicative de 100 % sans recourir à des disques partagés.

### Points clés de la vidéo

  1. [Présentation de l'architecture : HADR SafeKit sur VLAN étendu](<https://www.youtube.com/watch?v=3zwEWDCiojQ&t=0s>) (0:56)
  2. [Comprendre le mirroring synchrone et le double acquittement](<https://www.youtube.com/watch?v=3zwEWDCiojQ&t=56s>) (1:26)
  3. [Mécanismes de basculement : Gratuitous ARP (GARP) et IP virtuelle](<https://www.youtube.com/watch?v=3zwEWDCiojQ&t=142s>) (1:53)
  4. [Conception pour WAN lent : Stratégies HA vs Sauvegarde](<https://www.youtube.com/watch?v=3zwEWDCiojQ&t=255s>) (2:27)


### Vidéo SafeKit : Comment mettre en œuvre la haute disponibilité et la reprise après sinistre (HADR) avec SafeKit (7:40)

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 


<!-- BEGIN INSERT: insert-safekit-hub-en lang="fr" display="content" -->
 

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
  

<!-- END INSERT: insert-safekit-hub-en lang="fr" display="content" -->
 


<!-- BEGIN INSERT: insert-safekit-4-buttons-en lang="fr" display="content" -->
<div class="button-row">
  <a class="btn-action" href="https://safekit.eviden.com/fr/contact-us-for-safekit/">🧑 Nous contacter</a>
  <a class="btn-action" href="/safekit-docs/fr/resources/safekit-free-trial/">🎁 Essai gratuit de SafeKit</a>
  <a class="btn-action" href="https://training.my.evidian.com/mod/page/view.php?id=712">🏅 Certification gratuite</a>
  <a class="btn-action" href="https://safekit.eviden.com/fr/get-a-quote-safekit/">💰 Prix licence perpétuelle</a>
</div>
<!-- END INSERT: insert-safekit-4-buttons-en lang="fr" display="content" -->