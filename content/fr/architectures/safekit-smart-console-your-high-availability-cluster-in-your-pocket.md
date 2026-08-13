---
title: "SafeKit Smart Console : votre cluster de haute disponibilité à portée de main"
slug: "safekit-smart-console-your-high-availability-cluster-in-your-pocket"
canonical: "https://safekit.eviden.com/fr/architectures/safekit-smart-console-your-high-availability-cluster-in-your-pocket/"
description: "SafeKit Smart Console : votre cluster de haute disponibilité à portée de main Smart Console : une haute disponibilité intuitive, mobile et sans erreur Redéfinissez la gestion de la haute disponibilité avec une solution conçue pour la rapidité et la simplicité. La console web SafeKit se distingue par une prise en main immédiate, vous permettant […]"
category: "architectures"
lang: "fr"
topics: "Smart Console : une haute disponibilité intuitive, mobile et sans erreur, Sommaire, Comment fonctionne un cluster miroir SafeKit avec la console web ?, Comment fonctionne un cluster ferme SafeKit avec la console web ?, Comment superviser plusieurs modules et plusieurs clusters via la console web ?, Comment surveiller les alertes dans la console et gérer les notifications par e-mail ?, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# SafeKit Smart Console : votre cluster de haute disponibilité à portée de main

## Smart Console : une haute disponibilité intuitive, mobile et sans erreur

Redéfinissez la gestion de la haute disponibilité avec une solution conçue pour la **rapidité et la simplicité**. La console web SafeKit se distingue par une **prise en main immédiate** , vous permettant de configurer et de piloter votre infrastructure **sans écrire une ligne de code**.

Que vous soyez à votre bureau ou en déplacement, le tableau de bord compatible smartphone vous donne un contrôle total du cluster du bout des doigts. En simplifiant la gestion des modules miroir et ferme, la console **élimine les erreurs humaines** et garantit un basculement fluide pour vos systèmes les plus critiques.  


## Sommaire

  * [Comment fonctionne un cluster miroir SafeKit avec la console web ?](<#safekit-mirror-cluster>)
  * [Comment fonctionne un cluster ferme SafeKit avec la console web ?](<#safekit-farm-cluster>)
  * [Comment superviser plusieurs modules et plusieurs clusters via la console web ?](<#multipe-modules-clusters>)
  * [Comment surveiller les alertes dans la console et gérer les notifications par e-mail ?](<#safekit-notifications-cluster>)


## Comment fonctionne un cluster miroir SafeKit avec la console web ? {#safekit-mirror-cluster}

### Comment configurer un cluster miroir SafeKit ? {#safekit-mirror-cluster-configure}


<img src="/safekit-docs/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png" width="763" alt="Console web SafeKit : tableau de bord de configuration de la haute disponibilité affichant les réseaux de heartbeat, la configuration d’IP virtuelle et la réplication de répertoires en temps réel pour un cluster miroir.">


La **console web SafeKit** fournit une interface intuitive pour orchestrer la haute disponibilité de vos applications critiques. En quelques étapes seulement, vous pouvez configurer un **cluster miroir SafeKit** afin d’assurer la continuité de service :

  * **Basculement applicatif (onglet Macros) :** définissez les services applicatifs à redémarrer automatiquement en cas de défaillance.
  * **Réseau(x) de heartbeat :** chemins de communication dédiés utilisés par les nœuds du cluster pour surveiller en continu leur état de santé et synchroniser les décisions de basculement.
  * **Gestion des IP virtuelles :** configurez l’IP virtuelle (VIP) pour permettre une reconnexion transparente des clients après un basculement.
  * **Réplication en temps réel :** sélectionnez les répertoires critiques à répliquer de manière synchrone, au niveau octet.
  * **Checkers :** surveillent l’état de santé de l’application et déclenchent une reprise automatique en cas de détection d’un processus défaillant.


Le cluster SafeKit intègre un checker dédié de _split-brain_ permettant de résoudre les situations d’isolement réseau sans recourir à une machine témoin tierce ni à un réseau de heartbeat supplémentaire. Pour en savoir plus, consultez [ heartbeat, basculement et quorum dans un cluster](</safekit-docs/fr/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>).

### Comment superviser un cluster miroir SafeKit ? {#safekit-mirror-cluster-monitoring}


<img src="/safekit-docs/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png" width="478" alt="Console web SafeKit : supervision en temps réel d’un cluster miroir à 2 nœuds affichant les états PRIM et SECOND avec réplication active des données.">

 

La **console d’administration SafeKit** offre une vue unifiée de votre infrastructure de haute disponibilité. Elle permet aux administrateurs de surveiller l’**état opérationnel** du cluster et de suivre la synchronisation des données en temps réel.

Pour un cluster miroir à deux nœuds, la console affiche clairement le rôle de chaque serveur :

  * **PRIM (Primaire) :** le nœud actif qui exécute l’application et gère l’IP virtuelle. Il écrit sur le stockage local et réplique les données en temps réel vers le nœud secondaire.
  * **SECOND (Secondaire) :** le nœud en attente qui reçoit les mises à jour synchrones au niveau octet. Il est prêt à prendre instantanément le relais en cas de défaillance du primaire.
  * **État ALONE :** alerte visuelle indiquant que le cluster fonctionne sur un seul nœud (par exemple lors d’une maintenance ou après un incident), signalant une perte temporaire de redondance.
  * **Progression de la resynchronisation :** lorsqu’un nœud redémarre après une panne, son état passe en orange durant la réintégration des données en arrière-plan, sans interruption de service lors du retour à la normale.


Au-delà des simples indicateurs d’état, l’interface propose une **orchestration du basculement en un clic** (**menu`...`**), permettant de réassigner manuellement le rôle primaire lors d’opérations planifiées, tout en garantissant une disponibilité continue pour les utilisateurs.  


## Comment fonctionne un cluster ferme SafeKit avec la console web ? {#safekit-farm-cluster}

### Comment configurer un cluster ferme SafeKit ? {#safekit-farm-cluster-configuration}


<img src="/safekit-docs/wp-content/uploads/2026/01/safekit-farm-cluster-config.png" width="966" alt="Console web SafeKit : configuration d’un cluster ferme pour l’équilibrage de charge réseau et la gestion des IP virtuelles.">

 

Le **cluster ferme SafeKit** est conçu pour assurer la haute disponibilité et la montée en charge des services. La configuration vise à répartir le trafic entrant simultanément sur l’ensemble des nœuds :

  * **Services équilibrés en charge (onglet Macros) :** définissez les services applicatifs (par exemple Apache, IIS, Nginx) devant rester actifs sur tous les nœuds.
  * **Réseau(x) de heartbeat :** chemins de communication utilisés pour détecter la sortie d’un nœud de la ferme et déclencher une redistribution immédiate de la charge.
  * **IP virtuelle (VIP de ferme) :** contrairement à un cluster miroir, la VIP de la ferme est partagée entre les nœuds à l’aide d’un algorithme de filtrage au niveau du noyau afin de répartir le trafic réseau.
  * **Règles d’équilibrage de charge :** définissez la politique de répartition du trafic en fonction de l’adresse IP source ou du port source.
  * **Checkers :** surveillent l’état de santé des applications et déclenchent un redémarrage automatique en cas de détection d’une défaillance de processus.


### Comment superviser un cluster ferme SafeKit ? {#safekit-farm-cluster-monitoring}


<img src="/safekit-docs/wp-content/uploads/2026/01/safekit-farm-cluster-monitor.png" width="473" alt="Console SafeKit : supervision d’un cluster ferme à 2 nœuds affichant les deux nœuds à l’état UP avec équilibrage de charge actif.">

 

La supervision d’un cluster ferme offre une visibilité directe sur la nature **Active-Active** de l’infrastructure, dans laquelle tous les nœuds contribuent aux performances de l’application (deux nœuds dans cet exemple; extensible à d'autres nœuds) :

  * **État UP (50 % sur 2 nœuds) :** dans une ferme saine, les deux nœuds sont à l’état « UP » (50 %), ce qui signifie qu’ils reçoivent et traitent activement les requêtes clients via l’IP virtuelle partagée.
  * **Rééquilibrage automatique :** en cas de défaillance d’un nœud, la console affiche visuellement que le nœud restant prend 100 % du trafic. Il n’y a pas de délai de « basculement », puisque le nœud survivant est déjà actif (hormis un temps de détection de quelques secondes).
  * **Réintégration d’un nœud :** lorsqu’un nœud réparé redémarre, il passe de l’état « STOP » à « UP » et recommence automatiquement à recevoir sa part de charge, sans intervention de l’administrateur.
  * **Aucune synchronisation de données :** dans un cluster ferme, il n’existe pas d’état de resynchronisation « orange », car les nœuds sont conçus pour être sans état (_stateless_) ou pour s’appuyer sur une base de données partagée, laquelle peut être protégée séparément par un cluster miroir.


Au-delà des simples icônes d’état, l’interface propose une gestion des nœuds en un clic (**menu`...`**), permettant d’arrêter ou de démarrer manuellement un nœud pour une maintenance planifiée, tandis que l’IP virtuelle partagée redistribue automatiquement le trafic sans interruption pour les utilisateurs.  


## Comment superviser plusieurs modules et plusieurs clusters via la console web ? {#multipe-modules-clusters}

### Visualisation multi‑modules au sein d’un même cluster {#safekit-multi-module}


<img src="/safekit-docs/wp-content/uploads/2026/05/safekit-hyperv-console-4.jpg" width="966" alt="Console web SafeKit : 4 modules Hyper‑V déployés sur un même cluster à 2 nœuds.">

 

Lors du déploiement de **plusieurs modules** sur un même cluster à deux nœuds, la console web SafeKit fournit des **widgets de supervision individuels** pour chaque module. Cette approche est particulièrement adaptée aux solutions **SafeKit Hyper‑V**. 

**Exemple :** dans la configuration illustrée avec 4 machines virtuelles protégées :

  * La console est connectée au nœud 1, qui agit comme proxy pour communiquer avec le nœud 2.
  * La console affiche **4 widgets** (un par machine virtuelle).
  * Chaque machine virtuelle s’exécute sur son nœud PRIM et est répliquée vers son nœud SECOND.
  * Les administrateurs voient en temps réel que les VM1 et VM2 sont actives sur le nœud 1, tandis que les VM3 et VM4 sont actives sur le nœud 2.
  * Les administrateurs peuvent facilement migrer une machine virtuelle d’un nœud à l’autre via le **menu`…`**.


Cette visibilité fine garantit que, même dans des environnements à forte densité, vous conservez un contrôle total et une connaissance immédiate de chaque charge de travail répliquée.  


### Visualisation multi‑clusters {#safekit-multi-cluster}


<img src="/safekit-docs/wp-content/uploads/2026/05/safekit-console-north-south-east-west-801.jpg" width="966" alt="Console web SafeKit : 4 clusters déployés sur 8 serveurs.">

 

Lors du déploiement de **plusieurs clusters** sur différents serveurs, vous pouvez soit utiliser plusieurs onglets de navigateur pour vous connecter à chaque cluster, soit exploiter la fonctionnalité PWA (Progressive Web App) de la console. En utilisant la PWA, vous supprimez les menus de navigation du navigateur, ce qui libère de l’espace à l’écran pour organiser plus efficacement la supervision des clusters sur votre bureau. 

**Exemple :** l’illustration montre quatre consoles PWA supervisant quatre clusters de vidéosurveillance : un au nord, un au sud, un à l’ouest et un à l’est.

**Remarque :** lorsque le nombre de clusters à afficher devient trop important pour un seul écran, SafeKit propose des notifications afin de faciliter la détection d’erreurs à travers un grand nombre de clusters.  


## Comment surveiller les alertes dans la console et gérer les notifications par e-mail ? {#safekit-notifications-cluster}

### Comment recevoir des alertes instantanées lors des changements d’état des modules et des événements critiques ?

La console web SafeKit s’appuie sur les fonctionnalités natives du navigateur pour émettre des **notifications instantanées** à chaque changement d’état d’un module. Les événements critiques sont ainsi immédiatement portés à votre attention, même lorsque la console est ouverte dans un onglet en arrière‑plan.

  * **Sécurité :** les notifications nécessitent un accès via **HTTPS** ou localhost.
  * **Intégration PWA :** installez la console sous forme d’application web progressive (PWA) sur poste de travail ou mobile pour une expérience proche d’une application native.
  * **Alertes mobiles :** sur mobile, les notifications sont disponibles uniquement via la PWA, avec l’utilisation obligatoire de HTTPS.


Ce mécanisme alerte immédiatement les utilisateurs lors d’événements critiques, améliorant la réactivité face à l’état du cluster et réduisant les temps de réponse.  


###  [ Vidéo SafeKit : la console sur smartphone (0:54) ](<https://www.youtube.com/watch?v=W_qaeZmEozA>) {#demo-console}

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 

### Comment configurer des alertes e‑mail automatiques dans SafeKit ?

SafeKit consigne automatiquement tous les **événements majeurs du cluster dans les journaux système** , ce qui permet une intégration transparente avec tout outil de supervision du marché. En complément, SafeKit inclut un **agent de notification par e‑mail** dédié, chargé de surveiller ces journaux et d’envoyer les alertes critiques directement dans votre boîte de réception. Les parties prenantes restent ainsi informées, même lorsque la console web n’est pas consultée en continu.

  * **Regroupement intelligent :** afin de réduire le volume d’e‑mails, l’agent regroupe les événements survenant dans un court intervalle en un seul message de synthèse.
  * **Couverture complète :** l’agent est installé sur tous les nœuds et doit être explicitement configuré avec les paramètres SMTP pour être activé.
  * **Destinataires personnalisables :** dirigez les alertes vers des équipes IT spécifiques ou des listes de diffusion managériales afin de garantir une prise en charge rapide.


En combinant les alertes temps réel via la PWA avec un regroupement intelligent des notifications par e‑mail, SafeKit propose une stratégie de notification multi‑niveaux parfaitement adaptée aux opérations critiques.  


###  [ Vidéo SafeKit : notifications e‑mail lors d’un basculement (1:04) ](<https://www.youtube.com/watch?v=arSUU45_AJs>) {#demo-notifications}

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