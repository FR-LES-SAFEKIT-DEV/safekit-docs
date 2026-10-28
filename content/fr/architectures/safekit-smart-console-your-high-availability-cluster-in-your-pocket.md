---
title: "Console intelligente SafeKit : Votre cluster haute disponibilité dans votre poche"
canonical: "https://safekit.eviden.com/fr/architectures/safekit-smart-console-your-high-availability-cluster-in-your-pocket/"
description: "Gérez facilement vos clusters SafeKit grâce à notre console intelligente. Profitez d'une configuration sans code, de la compatibilité avec les smartphones et de notifications PWA en temps réel. Éliminez les erreurs humaines et garantissez une haute disponibilité à portée de main. En savoir plus."
category: "architectures"
lang: "fr"
topics: "Console intelligente : Haute disponibilité intuitive, mobile et sans erreur, Sommaire, Comment un cluster SafeKit mirror fonctionne-t-il avec la console web ?, Comment un cluster SafeKit `farm` fonctionne-t-il avec la console web ?, Comment surveiller plusieurs modules et plusieurs clusters via la console web ?, Comment surveiller les alertes dans la console et gérer les notifications par e-mail ?, 🔍 Centre de navigation haute disponibilité SafeKit"
---

# Console intelligente SafeKit : Votre cluster haute disponibilité dans votre poche {#safekit-smart-console-your-high-availability-cluster-in-your-pocket}

## Console intelligente : Haute disponibilité intuitive, mobile et sans erreur {#smart-console-intuitive-mobile-and-error-free-high-availability}

Repensez la gestion de la haute disponibilité grâce à une solution conçue pour **la rapidité et la simplicité** . La console web SafeKit offre une **prise en main immédiate** , vous permettant de configurer et de contrôler votre infrastructure sans écrire **une seule ligne de code** .

Que vous soyez à votre bureau ou en déplacement, le tableau de bord compatible avec les smartphones vous offre un contrôle total du cluster. En simplifiant la gestion des modules mirror et `farm` , la console intelligente **élimine les erreurs humaines** et garantit un basculement transparent pour vos systèmes critiques.

## Table des matières {#table-of-contents}

  * [ Comment un cluster SafeKit mirror fonctionne-t-il avec la console web ? ](#safekit-mirror-cluster)
  * [ Comment un cluster SafeKit `farm` fonctionne-t-il avec la console web ? ](#safekit-farm-cluster)
  * [ Comment surveiller plusieurs modules et plusieurs clusters via la console web ? ](#multipe-modules-clusters)
  * [ Comment surveiller les alertes dans la console et gérer les notifications par e-mail ? ](#safekit-notifications-cluster)


## Comment un cluster SafeKit mirror fonctionne-t-il avec la console web ? {#safekit-mirror-cluster}

### Comment configurer un cluster SafeKit Mirror {#safekit-mirror-cluster-configure}


Console Web ![ SafeKit : Tableau de bord de configuration de haute disponibilité affichant les réseaux de pulsation, la configuration des adresses IP virtuelles et la réplication d'annuaire en temps réel pour un cluster mirror . ](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


La console web **SafeKit** offre une interface intuitive pour orchestrer la haute disponibilité de vos applications critiques. En quelques étapes seulement, vous pouvez configurer un cluster **SafeKit mirror** afin de garantir la continuité de votre activité.

  * **Basculement d'application (onglet Macros) :** Définissez les services d'application spécifiques à redémarrer automatiquement en cas de panne.
  * **Réseau(x) de pulsation :** Chemin(s) de communication dédié(s) utilisé(s) par les nœuds du cluster pour surveiller en permanence l'état et la disponibilité des uns et des autres et synchroniser les décisions de basculement.
  * **Gestion des adresses IP virtuelles :** Configurer l’adresse IP virtuelle (VIP) pour une reconnexion client transparente après un basculement.
  * **Réplication en temps réel :** Sélectionnez les répertoires critiques pour la réplication synchrone au niveau octet basée sur l’hôte.
  * Vérificateurs **:** Surveillent l’état de l’application et déclenchent une récupération automatique en cas de défaillance du processus.


Le cluster SafeKit inclut un vérificateur de split-brain dédié pour résoudre les problèmes d'isolation réseau sans nécessiter une troisième machine témoin ni un réseau de pulsation supplémentaire. Découvrez-en plus sur la pulsation, le basculement et le quorum dans un cluster [ ou ](</fr/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) .

### Comment surveiller un cluster SafeKit mirror ? {#safekit-mirror-cluster-monitoring}


Console Web ![ SafeKit : Surveillance en temps réel d'un cluster mirror à 2 nœuds affichant les états PRIM et SECOND avec réplication de données active. ](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


La **console de gestion SafeKit** offre une vue unifiée de votre infrastructure à haute disponibilité. Elle permet aux administrateurs de surveiller l' **état opérationnel** du cluster et de suivre la synchronisation des données en temps réel.

Pour un cluster mirror à 2 nœuds, la console affiche clairement les rôles de chaque serveur :

  * **PRIM (Primaire) :** Le nœud actif exécutant actuellement l’application et gérant l’adresse IP virtuelle. Il effectue les écritures sur le stockage local et la réplication en temps réel vers le nœud secondaire.
  * **SECOND (Secondaire) :** Le nœud de secours reçoit des mises à jour synchrones au niveau octet. Il est prêt à prendre le relais instantanément en cas de défaillance du nœud principal.
  * **SEUL État :** Vous alerte visuellement lorsque le cluster fonctionne sur un seul nœud (par exemple, pendant la maintenance ou après une panne), indiquant que la redondance est temporairement perdue.
  * **Progression de la resynchronisation :** Lorsqu’un nœud défaillant est récupéré, son état devient orange pendant la réintégration des données en arrière-plan, garantissant l’absence d’interruption de service pendant la phase de « retour à la normale ».


Au-delà des simples icônes d'état, l'interface offre **une orchestration de basculement en un clic** ( **menu `...`** ), vous permettant de réaffecter manuellement le rôle principal pour la maintenance planifiée tout en assurant une disponibilité continue pour l'activité de l'utilisateur.

## Comment un cluster SafeKit `farm` fonctionne-t-il avec la console web ? {#safekit-farm-cluster}

### Comment configurer un cluster SafeKit `farm` ? {#safekit-farm-cluster-configuration}


Console Web ![ SafeKit : Configuration du cluster Farm pour l’équilibrage de charge réseau et la gestion des adresses IP virtuelles. ](/wp-content/uploads/2026/01/safekit-farm-cluster-config.png "w:966")


Le cluster **SafeKit `farm`** est conçu pour une haute disponibilité et une grande évolutivité des services. Sa configuration vise à répartir simultanément le trafic entrant entre les deux nœuds.

  * **Services à charge équilibrée (onglet Macros) :** Définissez les services d’application spécifiques (par exemple, Apache, IIS , Nginx ) à maintenir actifs sur tous les nœuds.
  * Réseau(x) de battement de cœur **: Chemin(s) de communication** utilisé(s) pour détecter si un nœud a quitté le `farm` , déclenchant une redistribution immédiate de la charge.
  * **IP virtuelle ( `Farm` VIP) :** Contrairement à un cluster mirror , le VIP `Farm` est partagé entre les nœuds à l'aide d'un algorithme de filtrage du noyau pour distribuer le trafic réseau.
  * Règles d'équilibrage de charge **:** Définissez la politique de distribution du trafic en fonction de l'adresse IP ou du port source.
  * Vérificateurs **:** Surveille l’état de l’application et déclenche un redémarrage automatique en cas de défaillance du processus.


### Comment surveiller un cluster SafeKit `farm` ? {#safekit-farm-cluster-monitoring}


Console ![ SafeKit : Surveillance d'un cluster Farm à 2 nœuds, les deux nœuds étant opérationnels avec équilibrage de charge actif. ](/wp-content/uploads/2026/01/safekit-farm-cluster-monitor.png "w:473")


La surveillance d'un cluster `farm` offre une visibilité sur la nature **active-active** de l'infrastructure, où tous les nœuds contribuent aux performances de l'application (2 nœuds sont présentés dans cet exemple ; extensible à des nœuds supplémentaires) :

  * État UP de **(50 % sur 2 nœuds) :** Dans un `farm` sain, les deux nœuds sont dans l'état « UP » (50 %), ce qui signifie qu'ils reçoivent et traitent activement les requêtes des clients via l'adresse IP virtuelle partagée.
  * **Rééquilibrage automatique :** En cas de défaillance d'un nœud, la console affiche visuellement le nœud restant prenant en charge 100 % du trafic. Il n'y a pas de délai de basculement, car le nœud survivant est déjà actif (à l'exception d'un temps de détection de quelques secondes).
  * Insertion du nœud **:** Lorsqu'un nœud réparé est redémarré, il passe de l'état « ARRÊT » à l'état « EN MARCHE » et commence automatiquement à recevoir sa part de la charge sans intervention de l'administrateur.
  * **Aucune synchronisation de données :** Notez que dans un cluster `farm` , il n’y a pas d’état de resynchronisation « Orange », car les nœuds sont censés être sans état ou partager une base de données backend (qui peut être protégée séparément dans un cluster mirror ).


Au-delà des simples icônes d'état, l'interface offre une gestion des nœuds en un clic (menu **`...`** ), vous permettant d'arrêter ou de démarrer manuellement un nœud pour une maintenance planifiée tandis que l'adresse IP virtuelle partagée redistribue automatiquement le trafic sans interrompre l'activité de l'utilisateur.

## Comment surveiller plusieurs modules et plusieurs clusters via la console web ? {#multipe-modules-clusters}

### Visualisation multi-modules au sein d'un seul cluster {#safekit-multi-module}


Console Web ![ SafeKit : 4 modules Hyper-V déployés sur le même cluster à 2 nœuds. ](/wp-content/uploads/2026/05/safekit-hyperv-console-4.jpg "w:966")


Lors du déploiement **de plusieurs modules** sur un cluster à deux nœuds, la console Web SafeKit propose **des widgets de surveillance individuels** pour chaque module. Ceci est particulièrement utile pour les solutions **Hyper-V SafeKit** . 

Exemple **:** Dans la figure avec une configuration comportant 4 machines virtuelles protégées :

  * La console est connectée au nœud 1 qui sert de proxy pour communiquer avec le nœud 2.
  * La console affiche **4 widgets** (un pour chaque VM).
  * Chaque machine virtuelle s'exécute sur son nœud PRIM et est répliquée sur son nœud SECOND.
  * Les administrateurs peuvent voir en temps réel que VM1 et VM2 sont actives sur le nœud 1, tandis que VM2 et VM3 sont actives sur le nœud 2.
  * Les administrateurs peuvent facilement migrer une VM d'un nœud à l'autre en utilisant le menu **`...`** .


Cette visibilité granulaire garantit que même dans des environnements à haute densité, vous conservez un contrôle total et une connaissance immédiate de chaque charge de travail répliquée. 

### Visualisation multi-cluster {#safekit-multi-cluster}


Console Web ![ SafeKit : 4 clusters déployés sur 8 serveurs. ](/wp-content/uploads/2026/05/safekit-console-north-south-east-west-801.jpg "w:966")


Lors du déploiement **de plusieurs clusters** sur différents serveurs, vous pouvez soit utiliser plusieurs onglets de navigateur pour vous connecter à chaque cluster, soit utiliser l'application web progressive (PWA) de la console. L'utilisation d'une PWA permet de supprimer les menus de navigation du navigateur, libérant ainsi de l'espace à l'écran pour une meilleure organisation de la surveillance des clusters sur votre ordinateur. 

**Exemple :** La figure montre quatre consoles PWA surveillant quatre groupes de vidéosurveillance : un au nord, un au sud, un à l’ouest et un à l’est.

Remarque **:** Lorsque vous avez trop de clusters à afficher sur un seul bureau, SafeKit offre des notifications pour aider à détecter les erreurs sur de nombreux clusters. 

## Comment surveiller les alertes dans la console et gérer les notifications par e-mail ? {#safekit-notifications-cluster}

### Comment puis-je recevoir des alertes instantanées concernant les changements d'état des modules et les événements critiques ? {#how-can-i-receive-instant-alerts-for-module-state-changes-and-critical-events}

La console web SafeKit exploite les fonctionnalités natives du navigateur pour émettre **des notifications instantanées** à chaque modification de l'état d'un module. Ainsi, les événements critiques sont immédiatement portés à votre attention, même lorsque la console est ouverte dans un onglet en arrière-plan.

  * Sécurité **: Les notifications** nécessitent un accès via **HTTPS** ou localhost.
  * **Intégration PWA :** Installez la console en tant qu’application Web progressive (PWA) sur ordinateur ou mobile pour une expérience similaire à celle d’une application native.
  * **Alertes mobiles :** Sur mobile, les notifications sont disponibles exclusivement via la PWA, le protocole HTTPS étant obligatoire.


Ce mécanisme alerte immédiatement les utilisateurs en cas d'événements critiques, améliorant ainsi la connaissance rapide de l'état du cluster et réduisant les temps de réponse.

### Vidéo SafeKit : Console sur smartphone (0:54) {#demo-console}

&amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 

### Comment configurer des alertes e-mail automatisées dans SafeKit ? {#how-can-i-set-up-automated-email-alerts-in-safekit}

SafeKit enregistre automatiquement tous **les événements majeurs du cluster dans les journaux système** , permettant une intégration transparente avec n'importe quel outil de supervision du marché. De plus, il inclut un **agent de notification par e-mail** dédié, conçu pour surveiller ces journaux et transmettre les alertes critiques directement dans votre boîte de réception. Ainsi, les parties prenantes restent informées même lorsque la console web n'est pas activement surveillée. 

  * **Regroupement intelligent :** Pour réduire le bruit, l’agent regroupe les événements survenant dans un court laps de temps dans un seul e-mail récapitulatif.
  * **Couverture complète :** L’agent est installé sur tous les nœuds et doit être explicitement configuré avec les détails SMTP pour être activé.
  * **Destinataires personnalisables :** Alertes directes vers des équipes informatiques spécifiques ou des alias de gestion pour garantir une réponse rapide.


En combinant des alertes PWA en temps réel avec un regroupement intelligent des e-mails, SafeKit fournit une stratégie de notification multicouche pour les opérations critiques.

### Vidéo SafeKit : Notifications par e-mail en cas de basculement (1:04) {#demo-notifications}

&amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 


{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}