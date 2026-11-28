---
title: "SafeKit Smart Console : gérez votre cluster depuis un mobile"
canonical: "https://safekit.eviden.com/fr/architectures/safekit-smart-console-your-high-availability-cluster-in-your-pocket/"
description: "SafeKit Smart Console : configurez et supervisez vos clusters de haute disponibilité depuis un navigateur ou un smartphone, sans code et avec des notifications en temps réel."
category: "architectures"
lang: "fr"
topics: "Smart Console : haute disponibilité intuitive et sans erreur sur ordinateur et mobile, Table des matières, Comment un cluster mirror SafeKit fonctionne-t-il avec la console web ?, Comment fonctionne un cluster farm SafeKit avec la console web ?, Comment surveiller plusieurs modules et plusieurs clusters via la console web ?, Comment surveiller les alertes dans la console et gérer les notifications par e-mail ?"
hashpart: "smart-console-intuitive-mobile-and-error-free-high-availability, table-of-contents, safekit-mirror-cluster, safekit-farm-cluster, multipe-modules-clusters, safekit-notifications-cluster"
translation: "translate_md 2026-11-22.1 | glossaire 2026-11-22.7 | Translation LLM | 59 expressions"
image: "/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png"
schemaType: "TechArticle"
---

# SafeKit Smart Console : gérez votre cluster depuis un mobile {#safekit-smart-console-manage-your-cluster-from-your-phone}

## Smart Console : haute disponibilité intuitive et sans erreur sur ordinateur et mobile {#smart-console-intuitive-mobile-and-error-free-high-availability}

Redéfinissez la façon dont vous gérez la haute disponibilité avec une solution conçue pour **la rapidité et la simplicité**. La console Web SafeKit offre une expérience **sans courbe d’apprentissage**, vous permettant de configurer et de contrôler votre infrastructure **sans écrire de code**.

Que vous soyez à votre bureau ou en déplacement, le tableau de bord compatible avec les smartphones met le contrôle total du cluster à portée de main. En rationalisant la gestion des modules mirror et <span class="notranslate farm-term" translate="no">farm</span>, la Smart Console **élimine les erreurs humaines** et assure un processus de basculement transparent pour vos systèmes les plus vitaux.

## Table des matières {#table-of-contents}

  * [Comment un cluster mirror SafeKit fonctionne-t-il avec la console web ?](#safekit-mirror-cluster)
  * [Comment fonctionne un cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit avec la console web ?](#safekit-farm-cluster)
  * [Comment surveiller plusieurs modules et plusieurs clusters via la console web ?](#multipe-modules-clusters)
  * [Comment surveiller les alertes dans la console et gérer les notifications par e-mail ?](#safekit-notifications-cluster)


## Comment un cluster mirror SafeKit fonctionne-t-il avec la console web ? {#safekit-mirror-cluster}

### Comment configurer un cluster mirror SafeKit ? {#safekit-mirror-cluster-configure}


![Console Web SafeKit : tableau de bord de configuration de la haute disponibilité affichant les réseaux heartbeat, la configuration de l’IP virtuelle et la réplication du répertoire en temps réel pour un cluster mirror.](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


La **console Web SafeKit** fournit une interface intuitive pour orchestrer la haute disponibilité de vos applications critiques. En quelques étapes seulement, vous pouvez configurer un **cluster mirror SafeKit** pour assurer la continuité d’activité :

  * **Basculement d’application (onglet Macros) :** Définissez les services d’application spécifiques à redémarrer automatiquement en cas de défaillance.
  * **Réseau(x) heartbeat :** Chemin(s) de communication dédié(s) utilisé(s) par les nœuds du cluster pour surveiller en permanence l’état de santé et la disponibilité de chacun et pour synchroniser les décisions de basculement.
  * **Gestion de l’adresse IP virtuelle :** configurez l’adresse IP virtuelle (VIP) pour une reconnexion transparente du client après un basculement.
  * **Réplication en temps réel :** sélectionnez les répertoires critiques pour la réplication synchrone au niveau de l’octet, basée sur l’hôte.
  * **Checkers :** Surveillez l’état de l’application et déclenchez une récupération automatique si une défaillance de processus est détectée.


Le cluster SafeKit inclut un checker split-brain dédié pour résoudre les problèmes d’isolement réseau sans avoir besoin d’une troisième machine témoin ou d’un réseau heartbeat supplémentaire. En savoir plus sur [heartbeat, basculement et quorum dans un cluster](</fr/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>).

### Comment surveiller un cluster mirror SafeKit ? {#safekit-mirror-cluster-monitoring}


![Console Web SafeKit : surveillance en temps réel d’un cluster mirror 2 nœuds affichant les états PRIM et SECOND avec réplication active des données.](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


La **console de gestion SafeKit** offre une vue unifiée de votre infrastructure de haute disponibilité. Elle permet aux administrateurs de surveiller l’**état opérationnel** du cluster et de suivre la synchronisation des données en temps réel.

Pour un cluster mirror à 2 nœuds, la console affiche clairement les rôles de chaque serveur :

  * **PRIM (primaire) :** le nœud actif exécutant actuellement l’application et gérant l’adresse IP virtuelle. Il effectue des écritures sur le stockage local et une réplication en temps réel vers le nœud secondaire.
  * **SECOND (Secondaire) :** Le nœud de secours reçoit des mises à jour synchrones au niveau de l’octet. Il est prêt à prendre le relais instantanément en cas de défaillance du nœud principal.
  * **État ALONE :** vous avertit visuellement lorsque le cluster s’exécute sur un seul nœud (par exemple, pendant la maintenance ou après une panne), indiquant que la redondance est temporairement perdue.
  * **Progression de la resynchronisation :** lorsqu’un nœud défaillant se rétablit, son statut devient orange pendant la réintégration des données en arrière-plan, garantissant l’absence d’interruption pendant la phase de « retour à la normale ».


Au-delà des simples icônes d’état, l’interface fournit **une orchestration de basculement en un clic** via le **menu `...`**, vous permettant de réaffecter manuellement le rôle principal pour la maintenance planifiée tout en assurant la disponibilité continue de l’activité utilisateur.

## Comment fonctionne un cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit avec la console web ? {#safekit-farm-cluster}

### Comment configurer un cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit ? {#safekit-farm-cluster-configuration}


![Console Web SafeKit : configuration cluster farm pour l’équilibrage de charge réseau et la gestion des adresses IP virtuelles.](/wp-content/uploads/2026/01/safekit-farm-cluster-config.png "w:966")


Le **cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit** est conçu pour une haute disponibilité et une grande évolutivité des services. La configuration est axée sur la distribution du trafic entrant sur les deux nœuds simultanément :

  * **Services à charge équilibrée (onglet Macros) :** Définissez les services d’application spécifiques (par exemple, Apache, IIS, Nginx) à maintenir actifs sur tous les nœuds.
  * **Réseau(x) heartbeat :** Chemin(s) de communication utilisé(s) pour détecter si un nœud a quitté la <span class="notranslate farm-term" translate="no">farm</span>, déclenchant une redistribution immédiate de la charge.
  * **IP virtuelle (VIP <span class="notranslate farm-term" translate="no">farm</span>) :** Contrairement à un cluster mirror, l’adresse IP virtuelle d’un cluster <span class="notranslate farm-term" translate="no">farm</span> est partagée entre tous les nœuds, et un algorithme de filtrage du noyau distribue le trafic réseau.
  * **Règles d’équilibrage de charge :** Définissez la politique de distribution du trafic en fonction de l’adresse IP source ou du port.
  * **Checkers :** Surveillez l’état de l’application et déclenchez un redémarrage automatique si une défaillance de processus est détectée.


### Comment surveiller un cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit ? {#safekit-farm-cluster-monitoring}


![Console SafeKit : Surveillance d’un cluster farm à 2 nœuds montrant les deux nœuds à l’état UP avec un équilibrage de charge actif.](/wp-content/uploads/2026/01/safekit-farm-cluster-monitor.png "w:473")


La surveillance d’un cluster <span class="notranslate farm-term" translate="no">farm</span> fournit une visibilité sur la nature **active-active** de l’infrastructure, où tous les nœuds contribuent aux performances de l’application (2 nœuds dans cet exemple ; évolutif vers des nœuds supplémentaires) :

  * **État UP (50 % sur 2 nœuds) :** Dans une <span class="notranslate farm-term" translate="no">farm</span> saine, les deux nœuds sont à l’état « UP » (50 %), ce qui signifie qu’ils reçoivent et traitent activement les requêtes des clients via l’adresse IP virtuelle partagée.
  * **Rééquilibrage automatique :** si un nœud tombe en panne, la console affiche visuellement le nœud restant qui prend 100 % du trafic. Il n’y a pas de délai de « basculement », car le nœud survivant est déjà actif (à l’exception d’un temps de détection de quelques secondes).
  * **Insertion de nœud :** lorsqu’un nœud réparé est redémarré, il passe de l’état « STOP » à « UP » et commence automatiquement à recevoir sa partie de la charge sans intervention de l’administrateur.
  * **Aucune synchronisation des données :** Notez que dans un cluster <span class="notranslate farm-term" translate="no">farm</span>, il n’y a pas d’état de resynchronisation orange, car les nœuds sont censés être sans état ou partager une base de données dorsale (qui peut être protégée séparément dans un cluster mirror).


Au-delà des simples icônes d’état, l’interface fournit une gestion des nœuds en un clic via le **menu `...`**, vous permettant d’arrêter ou de démarrer manuellement un nœud pour une maintenance planifiée tandis que l’IP virtuelle partagée redistribue automatiquement le trafic sans interrompre l’activité de l’utilisateur.

## Comment surveiller plusieurs modules et plusieurs clusters via la console web ? {#multipe-modules-clusters}

### Visualisation multi-module au sein d’un même cluster {#safekit-multi-module}


![Console Web SafeKit : 4 modules Hyper-V déployés sur le même cluster à 2 nœuds.](/wp-content/uploads/2026/05/safekit-hyperv-console-4.jpg "w:966")


Lors du déploiement de **plusieurs modules** sur un seul cluster à 2 nœuds, la console Web SafeKit fournit **des widgets de surveillance individuels** pour chaque module. Ceci est particulièrement utile pour les solutions **SafeKit Hyper-V**. 

**Exemple :** Dans la figure avec une configuration à 4 machines virtuelles protégées :

  * La console est connectée au node1, qui agit comme un proxy pour communiquer avec node2.
  * La console affiche **4 widgets** (un pour chaque machine virtuelle).
  * Chaque machine virtuelle s’exécute sur son nœud PRIM et est répliquée sur son nœud SECOND.
  * Les administrateurs peuvent voir en temps réel quelles machines virtuelles sont actives sur chaque nœud : VM1 et VM2 sur node1, VM3 et VM4 sur node2.
  * Les administrateurs peuvent facilement migrer une machine virtuelle d’un nœud à l’autre à l’aide du **menu `...`**.


Cette visibilité granulaire vous assure de conserver un contrôle total et une connaissance immédiate de chaque charge de travail répliquée, même dans les environnements à haute densité. 

### Visualisation multi-cluster {#safekit-multi-cluster}


![Console Web SafeKit : 4 clusters déployés sur 8 serveurs.](/wp-content/uploads/2026/05/safekit-console-north-south-east-west-801.jpg "w:966")


Lorsque vous déployez **plusieurs clusters** sur plusieurs serveurs, vous pouvez soit utiliser plusieurs onglets de navigateur pour vous connecter à chaque cluster, soit utiliser la fonctionnalité PWA (Progressive Web App) de la console. En utilisant la PWA, vous supprimez les menus de navigation du navigateur, ce qui permet de gagner de l’espace à l’écran pour mieux organiser la surveillance des clusters sur votre bureau. 

**Exemple :** La figure montre quatre consoles PWA qui surveillent quatre clusters de vidéosurveillance situés au nord, au sud, à l’ouest et à l’est.

**Remarque :** Lorsque vous avez trop de clusters à afficher sur un seul ordinateur de bureau, SafeKit propose des notifications pour vous aider à détecter les erreurs sur de nombreux clusters. 

## Comment surveiller les alertes dans la console et gérer les notifications par e-mail ? {#safekit-notifications-cluster}

### Comment puis-je recevoir des alertes instantanées pour les changements d’état des modules et les événements critiques ? {#how-can-i-receive-instant-alerts-for-module-state-changes-and-critical-events}

La console Web SafeKit exploite les capacités natives du navigateur pour émettre **des notifications instantanées** chaque fois qu’un changement d’état d’un module se produit. Cela garantit que les événements critiques sont portés à votre attention immédiatement, même lorsque la console est dans un onglet d’arrière-plan.

  * **Sécurité :** les notifications nécessitent un accès via **HTTPS** ou localhost.
  * **Intégration PWA :** Installez la console en tant qu’application web progressive (PWA) sur ordinateur ou mobile pour une expérience similaire à celle d’une application native.
  * **Alertes mobiles :** Sur mobile, les notifications sont disponibles exclusivement via la PWA, HTTPS étant obligatoire.


Ce mécanisme alerte immédiatement les utilisateurs en cas d’événements critiques, ce qui améliore la connaissance rapide de l’état du cluster et réduit les temps de réponse.

### Vidéo SafeKit : Console sur smartphone (0:54) {#demo-console}


### Comment configurer des alertes e-mail automatiques dans SafeKit ? {#how-can-i-set-up-automated-email-alerts-in-safekit}

SafeKit enregistre automatiquement tous **les événements majeurs du cluster dans les journaux système**, permettant une intégration transparente avec n’importe quel outil de surveillance sur le marché. De plus, il comprend un **agent de notification par e-mail** dédié, conçu pour surveiller ces journaux et envoyer des alertes critiques directement dans votre boîte de réception. Cela garantit que les parties prenantes restent informées même lorsque la console web n’est pas activement surveillée. 

  * **Regroupement intelligent :** Pour réduire le bruit, l’agent regroupe les événements survenant dans un court laps de temps en un seul e-mail récapitulatif.
  * **Couverture complète :** L’agent est installé sur tous les nœuds et doit être explicitement configuré avec les détails SMTP pour être activé.
  * **Destinataires personnalisables :** Adressez les alertes directement à des équipes informatiques spécifiques ou à des alias de gestion pour garantir une réponse rapide.


En combinant les alertes PWA en temps réel avec un regroupement intelligent des e-mails, SafeKit offre une stratégie de notification à plusieurs niveaux pour les opérations critiques.

### Vidéo SafeKit : Notifications par e-mail en cas de basculement (1:04) {#demo-notifications}



{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}