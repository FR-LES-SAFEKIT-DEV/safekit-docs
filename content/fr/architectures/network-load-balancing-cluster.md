---
title: "SafeKit : Logiciel tout-en-un d’équilibrage de charge réseau et de haute disponibilité pour Windows ou Linux"
slug: "network-load-balancing-cluster"
canonical: "https://safekit.eviden.com/fr/architectures/network-load-balancing-cluster/"
description: "SafeKit : Logiciel tout-en-un d’équilibrage de charge réseau et de haute disponibilité pour Windows ou Linux"
category: "architectures"
lang: "fr"
topics: "Le cluster SafeKit Farm : NLB 100 % logiciel et basculement automatique pour Windows/Linux, Table des matières, Comment le logiciel SafeKit implémente-t-il simplement un cluster de répartition de charge réseau (NLB) pour Windows/Linux ?, Comment fonctionne le cluster SafeKit en mode farm avec Windows/Linux ?, Comparatif : Cluster SafeKit Farm pour Windows/Linux vs autres solutions de clustering NLB, Guide vidéo : Configurer un cluster SafeKit Farm NLB, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# SafeKit : Logiciel tout-en-un d’équilibrage de charge réseau et de haute disponibilité pour Windows ou Linux


<!-- BEGIN INSERT: insert-safekit-solution-farm-2-en lang="fr" display="content" querystring="app=Windows/Linux&amp;img=https://safekit.eviden.com/wp-content/uploads/2026/02/safekit-farm-windows-or-linux-app-1024.jpg&amp;guide=https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/" -->
 

## Le cluster SafeKit Farm : NLB 100 % logiciel et basculement automatique pour Windows/Linux

Un cluster SafeKit de type Farm pour Windows/Linux est une solution de répartition de charge réseau (NLB) logicielle, conçue pour les environnements d'applications évolutifs. Il intègre des fonctionnalités de **répartition de charge et de basculement directement sur les serveurs applicatifs** , éliminant ainsi le besoin de répartiteurs de charge matériels dédiés, de serveurs proxy ou de configurations multicast complexes.

### Quels sont les avantages d'un cluster SafeKit de type Farm pour Windows/Linux ?

  * **Logiciel tout-en-un :** Combine une IP virtuelle, la répartition de charge et le basculement/retour automatique dans un seul et même package logiciel.
  * **Aucun matériel spécifique :** Remplace les répartiteurs de charge matériels coûteux par une solution purement logicielle pour Windows ou Linux, gérable par des administrateurs système plutôt que par des ingénieurs réseau.
  * **Surveillance approfondie et autocorrection :** Utilise des « checkers » au niveau applicatif pour surveiller les processus spécifiques, détectant les plantages même si le serveur fonctionne toujours ; il déclenche ensuite un redémarrage automatique du service ou un basculement si nécessaire.
  * **Capacité hybride Farm & Mirror :** Permet, de manière unique, de combiner un cluster Farm (pour la répartition de charge des front-ends) avec un cluster Mirror (pour la réplication synchrone des données des back-ends).
  * **Haute disponibilité pour les éditeurs (OEM) :** Permet aux éditeurs de logiciels d'intégrer un clustering natif dans leurs applications, offrant ainsi un produit « prêt pour le cluster » et purement logiciel, sans infrastructure supplémentaire.


<img src="/safekit-docs/wp-content/uploads/2026/02/safekit-farm-windows-or-linux-app-1024.jpg" width="512" alt="Architecture de cluster SafeKit haute disponibilité pour Windows/Linux fournissant une IP virtuelle, un basculement automatique, un retour automatique et la répartition de charge réseau">

**Cluster SafeKit Farm NLB pour Windows/Linux**

<a class="btn-quick-install" href="/safekit-docs/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/">⚡ Guide d'installation rapide d'un cluster Farm pour Windows/Linux ></a>
## Table des matières {#toc}

  * [Comment le logiciel SafeKit implémente-t-il simplement un cluster de répartition de charge réseau (NLB) pour Windows/Linux ?](<#safekit-farm-ha-cluster>)
  * [Comment fonctionne le cluster SafeKit de type Farm avec Windows/Linux ?](<#safekit-farm-cluster>)
  * [Comparatif : Cluster SafeKit Farm pour Windows/Linux vs autres solutions de clustering NLB](<#safekit-farm-ha-comparison>)
  * [Guide vidéo : Configurer un cluster SafeKit Farm NLB](<#videoguide-safekit-farm-cluster>)
  * [🔍 Hub de navigation de la haute disponibilité SafeKit](<#hub>)


## Comment le logiciel SafeKit implémente-t-il simplement un cluster de répartition de charge réseau (NLB) pour Windows/Linux ? {#safekit-farm-ha-cluster}

### Qu'est-ce que la solution SafeKit Farm NLB pour Windows/Linux ?

SafeKit fournit une répartition de charge réseau et une haute disponibilité pour Windows/Linux sur deux serveurs ou plus.

Cet article explique comment implémenter rapidement un cluster Windows/Linux sans répartiteurs de charge matériels ni compétences réseau spécialisées.

La solution fonctionne en définissant une IP virtuelle avec des règles de répartition de charge, les noms des services Windows/Linux et des contrôleurs de santé (health checkers).

SafeKit active ensuite la **répartition de charge réseau** et le **basculement automatique** pour garantir l'évolutivité et la disponibilité continue du service.

### Comment SafeKit simplifie-t-il la répartition de charge par rapport aux solutions matérielles ?

SafeKit simplifie la gestion en remplaçant le matériel NLB traditionnel de type « intermédiaire » par une **solution purement logicielle**.

Au lieu de nécessiter un équipement physique dédié, SafeKit s'exécute directement sur des serveurs applicatifs standards **Windows ou Linux**.

Les éditeurs de logiciels peuvent proposer une **haute disponibilité pour les éditeurs (OEM)** en intégrant **SafeKit** directement dans leur pile applicative. Ce partenariat permet aux éditeurs de fournir une solution autonome, **« prête pour le cluster » et purement logicielle** , qui inclut des fonctionnalités natives de répartition de charge et de basculement.

### Quels sont les avantages de la répartition de charge logicielle de SafeKit pour Windows/Linux ?

SafeKit remplace le matériel coûteux par une approche logicielle rationalisée qui offre :

  * **Hautes performances :** Gère le trafic et l'IP virtuelle (VIP) au niveau du noyau du système d'exploitation, garantissant une vitesse optimale sans équipement réseau supplémentaire.
  * **Simplicité opérationnelle :** Permet aux administrateurs système de gérer les clusters via une interface unifiée sans avoir besoin de certifications réseau spécialisées.
  * **TCO réduit :** Diminue le CAPEX et les coûts de maintenance en éliminant le besoin de répartiteurs de charge matériels dédiés.


### En quoi la surveillance applicative de SafeKit diffère-t-elle des contrôles de santé NLB standards ?

Contrairement aux matériels NLB standards qui s'appuient sur de simples **pings** et des vérifications de ports, SafeKit intègre des **contrôleurs (checkers) au niveau applicatif**. Alors qu'un répartiteur traditionnel se contente de confirmer si un serveur est « vivant », SafeKit surveille l'état de santé réel des processus spécifiques de Windows/Linux.

Cette surveillance approfondie permet au système de détecter les états « zombies » (où le serveur est opérationnel mais le logiciel a planté), déclenchant ainsi des **redémarrages automatiques de services** ou une redirection du trafic que les solutions NLB standards ne peuvent pas effectuer.

### Est-il possible de configurer un cluster Farm pour Windows/Linux sans compétences en clustering ?

Oui. Cet article explique comment [**implémenter rapidement un cluster Farm pour Windows/Linux**](</safekit-docs/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/>) sans avoir besoin de compétences réseau spécialisées et complexes. En utilisant l'**IP virtuelle** de SafeKit pour gérer la répartition de charge réseau de **Windows/Linux** , vous obtenez une solution évolutive et robuste, nettement plus simple à déployer et à maintenir que les solutions NLB traditionnelles.

### Au-delà de Windows/Linux, quelles applications et quels environnements SafeKit peut-il protéger ?

SafeKit est une solution de haute disponibilité polyvalente, **à la fois pour Windows et Linux**. Elle permet de mettre en place des clusters Mirror avec **réplication synchrone en temps réel** et basculement automatique pour un large éventail de charges de travail critiques, notamment :

  * **Environnements virtuels et physiques :** Des machines virtuelles Hyper-V ou KVM complètes.
  * **Orchestration de conteneurs :** Des environnements Docker, Podman et K3s (Kubernetes).
  * **Données et services :** Des répertoires de fichiers individuels, des services et diverses bases de données.
  * **Infrastructure Cloud :** La haute disponibilité pour les applications Cloud.


[Explorez la liste complète des solutions de haute disponibilité supportées ici.](</safekit-docs/solutions/>)


<!-- BEGIN INSERT: insert-safekit-farm-en lang="fr" display="content" -->
 

## Comment fonctionne le cluster SafeKit en mode farm avec Windows/Linux ? {#safekit-farm-cluster}

### Adresse IP virtuelle dans un cluster en mode farm {#virtual-ip-address-farm}


<img src="/safekit-docs/wp-content/uploads/2023/02/safekit-up-up-up-300.png" width="300" alt="Comment le cluster SafeKit en mode farm implémente la répartition de charge réseau et le basculement de Windows/Linux">


Sur la figure précédente, l'application Windows/Linux s'exécute sur les 3 serveurs (3 est un exemple, cela peut être 2 ou plus). Les utilisateurs sont connectés à une adresse IP virtuelle.

L'[adresse IP virtuelle](</safekit-docs/best-practises/how-a-virtual-ip-address-works/>) est configurée localement sur chaque serveur du cluster en mode farm.  
Le trafic entrant vers l'adresse IP virtuelle est reçu par tous les serveurs et réparti entre eux par un filtre réseau situé dans le noyau (kernel) de chaque serveur.

SafeKit détecte les pannes matérielles et logicielles, reconfigure les filtres réseau en cas de défaillance, et propose des scripts de vérification (checkers) et de reprise applicative configurables.

### Répartition de charge dans un filtre réseau {#network-load-balancing}

L'algorithme de répartition de charge réseau au sein du filtre réseau est basé sur l'identité des paquets clients (adresse IP du client, port TCP du client). En fonction de l'identité du paquet client entrant, un seul filtre dans un serveur accepte le paquet ; les autres filtres des autres serveurs le rejettent.

Une fois qu'un paquet est accepté par le filtre d'un serveur, seuls le processeur (CPU) et la mémoire de ce serveur sont utilisés par l'application Windows/Linux qui répond à la demande du client. Les messages de sortie sont envoyés directement depuis le serveur d'application vers le client.

Si un serveur tombe en panne, le protocole de battement de cœur (heartbeat) de la ferme reconfigure les filtres du cluster de répartition de charge réseau afin de rééquilibrer le trafic sur les serveurs disponibles restants.

### Applications avec ou sans état (Stateful ou Stateless) {#stateful-stateless}

Avec une application Windows/Linux avec état (stateful), il y a une affinité de session. Un même client doit être connecté au même serveur sur plusieurs sessions TCP afin de récupérer son contexte sur ce serveur. Dans ce cas, la règle de répartition de charge SafeKit est configurée sur l'adresse IP du client. Ainsi, un même client est toujours connecté au même serveur sur ses différentes sessions TCP. Les différents clients sont quant à eux répartis sur les différents serveurs de la ferme (farm).

Avec une application Windows/Linux sans état (stateless), il n'y a pas d'affinité de session. Un même client peut être connecté à différents serveurs de la ferme sur plusieurs sessions TCP. Aucun contexte n'est stocké localement sur un serveur d'une session à l'autre. Dans ce cas, la règle de répartition de charge SafeKit est configurée sur l'identifiant de la session TCP du client. Cette configuration est la plus optimale pour répartir les sessions entre les serveurs, mais elle nécessite un service TCP sans affinité de session.

### Comment configurer un cluster SafeKit en mode farm pour Windows/Linux ? {#safekit-farm-cluster-configuration}


<img src="/safekit-docs/wp-content/uploads/2026/01/safekit-farm-cluster-config.png" width="966" alt="Console Web SafeKit : Configuration du cluster en mode farm pour la répartition de charge réseau et la gestion de l'IP virtuelle de Windows/Linux.">


Le **cluster SafeKit en mode farm** est conçu pour la haute disponibilité et la scalabilité des services. La configuration se concentre sur la répartition du trafic entrant simultanément sur les deux nœuds :

  * **Services avec répartition de charge (onglet Macros) :** Définissez les services applicatifs spécifiques (par exemple, Apache, IIS, Nginx) devant rester actifs sur tous les nœuds.
  * **Réseau(x) de Heartbeat (battement de cœur) :** Chemin(s) de communication utilisé(s) pour détecter si un nœud a quitté la ferme, déclenchant ainsi une redistribution immédiate de la charge.
  * **IP virtuelle (Farm VIP) :** Contrairement à un cluster miroir, la VIP Farm est partagée entre les nœuds à l'aide d'un algorithme de filtrage du noyau (kernel) pour répartir le trafic réseau.
  * **Règles de répartition de charge :** Définissez la politique de distribution du trafic en fonction de l'adresse IP source ou du port.
  * **Checkers (vérificateurs) :** Surveillent l'état de santé de l'application et déclenchent un redémarrage automatique si une défaillance de processus est détectée.


### Comment superviser un cluster SafeKit en mode farm pour Windows/Linux ? {#safekit-farm-cluster-monitoring}


<img src="/safekit-docs/wp-content/uploads/2026/01/safekit-farm-cluster-monitor.png" width="473" alt="Console SafeKit : Supervision d'un cluster en mode farm à 2 nœuds montrant les deux nœuds de Windows/Linux à l'état UP avec répartition de charge active.">


La supervision d'un cluster en mode farm offre une visibilité sur la nature **Actif-Actif** de l'infrastructure, où tous les nœuds contribuent aux performances de l'application (l'exemple ici présente 2 nœuds) :

  * **État UP (50 % sur 2 nœuds) :** Dans une ferme saine, les deux nœuds sont à l'état « UP » (50 %), ce qui signifie qu'ils reçoivent et traitent activement les requêtes des clients via l'IP virtuelle partagée.
  * **Rééquilibrage automatique :** Si un nœud tombe en panne, la console affiche visuellement le nœud restant prenant 100 % du trafic. Il n'y a pas de délai de basculement (failover), car le nœud survivant est déjà actif (hormis un temps de détection de quelques secondes).
  * **Insertion de nœud :** Lorsqu'un nœud réparé est redémarré, il passe de l'état « STOP » à l'état « UP » et commence automatiquement à recevoir sa part de la charge, sans intervention de l'administrateur.
  * **Pas de synchronisation de données :** Notez que dans un cluster en mode farm, il n'y a pas d'état de resynchronisation « Orange », car les nœuds sont censés être sans état ou partager une base de données interne (qui peut être protégée séparément dans un cluster miroir).


Au-delà des simples icônes d'état, l'interface permet une gestion des nœuds en un clic, vous offrant la possibilité d'arrêter ou de démarrer manuellement un nœud pour une maintenance planifiée tandis que l'IP virtuelle partagée redistribue automatiquement le trafic sans interrompre l'activité des utilisateurs.


<!-- END INSERT: insert-safekit-farm-en lang="fr" display="content" -->
 

## Comparatif : Cluster SafeKit Farm pour Windows/Linux vs autres solutions de clustering NLB {#safekit-farm-ha-comparison}

Fonctionnalité | Cluster SafeKit Farm (Logiciel) | Répartiteurs de charge matériels  
---|---|---  
Architecture | **Logiciel au niveau du noyau :** Intégration native dans le système d'exploitation Windows/Linux. | **Matériel propriétaire :** Équipements physiques (appliances) dédiés.  
Gestion | **Administrateurs système :** Géré via une console web simple ; aucun diplôme en réseau n'est requis. | **Ingénieurs réseau :** Nécessite des compétences spécialisées et des certifications CLI.  
Surveillance de l'état (Health) | **Contrôleurs applicatifs (Checkers) :** Surveillance approfondie de processus spécifiques (Apache, Nginx, etc.). | **Ping réseau :** Vérification de base pour voir si le serveur ou le port est accessible.  
Autocorrection (Self-Healing) | **Intelligence de redémarrage intégrée :** Redémarre automatiquement les services défaillants au niveau local. | **Basculement passif :** Arrête simplement d'envoyer du trafic vers le nœud défaillant.  
Infrastructure | **Agnostique :** Fonctionne sur des instances physiques, virtuelles (VMware, Hyper-V) ou Cloud. | **Rigide :** Nécessite un câblage physique spécifique et de l'espace en baie réseau.  
Coût (TCO) | **Faible CAPEX/OPEX :** Utilise les ressources des serveurs existants ; aucune maintenance matérielle coûteuse. | **Investissement élevé :** Coûts initiaux importants plus frais récurrents de licence et d'énergie.  
  
### Conclusion : Une approche plus intelligente de la répartition de charge réseau et de la haute disponibilité

Le **cluster SafeKit Farm** représente une évolution stratégique, passant d'un réseau traditionnel lourd en matériel à un modèle moderne de **haute disponibilité logicielle (software-defined)**. En intégrant la répartition de charge et l'intelligence d'autocorrection directement dans les serveurs applicatifs, SafeKit élimine le coût et la complexité des équipements matériels intermédiaires externes.

## Guide vidéo : Configurer un cluster SafeKit Farm NLB {#videoguide-safekit-farm-cluster}

### Vidéo SafeKit : Répartition de charge réseau et gestion de l'IP virtuelle (5:03) {#demo-farm}

Dans cette vidéo, découvrez comment implémenter une **adresse IP virtuelle** pour fournir un point d'entrée unique à un cluster de 2 nœuds. SafeKit simplifie la **répartition de charge réseau** en gérant automatiquement l'IP virtuelle, garantissant ainsi que le trafic client est réparti sur les nœuds et redirigé instantanément lors d'un basculement.

### Points clés de la vidéo

  1. [Architecture : Préparation de 2 nœuds pour une IP virtuelle partagée](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=0s>) (0:13)
  2. [Configuration : Mise en place du module farm.safe et de l'adresse IP virtuelle](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=13s>) (2:20)
  3. [Validation : Test de basculement et redirection de l'IP virtuelle lors du plantage d'un serveur](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=153s>) (2:30)


&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 


<!-- END INSERT: insert-safekit-solution-farm-2-en lang="fr" display="content" querystring="app=Windows/Linux&amp;img=https://safekit.eviden.com/wp-content/uploads/2026/02/safekit-farm-windows-or-linux-app-1024.jpg&amp;guide=https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/" -->
 


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