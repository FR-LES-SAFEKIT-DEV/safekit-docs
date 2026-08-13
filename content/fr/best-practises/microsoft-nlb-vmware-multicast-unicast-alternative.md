---
title: "Alternative à Microsoft NLB pour VMware : problèmes de multidiffusion et d’unicast résolus"
slug: "microsoft-nlb-vmware-multicast-unicast-alternative"
canonical: "https://safekit.eviden.com/fr/best-practises/microsoft-nlb-vmware-multicast-unicast-alternative/"
description: "Alternative à Microsoft NLB pour VMware : problèmes de multidiffusion et d’unicast résolus Mode multicast de Microsoft NLB Comme expliqué dans la base de connaissances de VMware pour la configuration du mode multicast de Microsoft NLB, vous devez positionner manuellement la résolution ARP statique des switchs ou des routeurs réseaux pour chaque port connecté au cluster. […]"
category: "best-practises"
lang: "fr"
topics: "Mode multicast de Microsoft NLB, Mode unicast de Microsoft NLB, Alternative avec SafeKit, Comment fonctionne le cluster SafeKit en mode farm avec Windows ?, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# Alternative à Microsoft NLB pour VMware : problèmes de multidiffusion et d’unicast résolus

## Mode multicast de Microsoft NLB

Comme expliqué dans la base de connaissances de [VMware pour la configuration du mode multicast de Microsoft NLB](<https://knowledge.broadcom.com/external/article?articleNumber=414968>), vous devez positionner manuellement la résolution ARP statique des switchs ou des routeurs réseaux pour chaque port connecté au cluster. Le déploiement du mode multicast de Microsoft NLB dans un environnement réseau inconnu peut s'avérer une tâche complexe et ardue.

## Mode unicast de Microsoft NLB

Avec le mode unicast de Microsoft NLB, vous devez configurer l'hôte ESXi / ESX pour qu'il n'envoie pas de paquets RARP lorsque l'une de ses machines virtuelles est mise sous tension. C'est pourquoi [VMware recommande de ne pas utiliser le mode unicast de Microsoft NLB](<https://knowledge.broadcom.com/external/article/344421/microsoft-nlb-not-working-properly-in-un.html>).

## Alternative avec SafeKit

La configuration de l'[adresse IP virtuelle de SafeKit](</safekit-docs/fr/best-practises/how-a-virtual-ip-address-works/>) ne nécessite aucune configuration réseau particulière et l'équilibrage de charge réseau peut s'exécuter dans n'importe quel environnement. Une fonctionnalité importante lorsque la solution doit être déployée dans une infrastructure inconnue : switchs ou routeurs inconnus, serveurs physiques ou serveurs virtuels.


<!-- BEGIN INSERT: insert-safekit-farm-fr lang="fr" display="content" querystring="app=Windows" -->
 

## Comment fonctionne le cluster SafeKit en mode farm avec Windows ? {#safekit-farm-cluster}

### Adresse IP virtuelle dans un cluster en mode farm {#virtual-ip-address-farm}


<img src="/safekit-docs/wp-content/uploads/2023/02/safekit-up-up-up-300.png" width="300" alt="Comment le cluster SafeKit en mode farm implémente la répartition de charge réseau et le basculement de Windows">


Sur la figure précédente, l'application Windows s'exécute sur les 3 serveurs (3 est un exemple, cela peut être 2 ou plus). Les utilisateurs sont connectés à une adresse IP virtuelle.

L'[adresse IP virtuelle](</safekit-docs/best-practises/how-a-virtual-ip-address-works/>) est configurée localement sur chaque serveur du cluster en mode farm.  
Le trafic entrant vers l'adresse IP virtuelle est reçu par tous les serveurs et réparti entre eux par un filtre réseau situé dans le noyau (kernel) de chaque serveur.

SafeKit détecte les pannes matérielles et logicielles, reconfigure les filtres réseau en cas de défaillance, et propose des scripts de vérification (checkers) et de reprise applicative configurables.

### Répartition de charge dans un filtre réseau {#network-load-balancing}

L'algorithme de répartition de charge réseau au sein du filtre réseau est basé sur l'identité des paquets clients (adresse IP du client, port TCP du client). En fonction de l'identité du paquet client entrant, un seul filtre dans un serveur accepte le paquet ; les autres filtres des autres serveurs le rejettent.

Une fois qu'un paquet est accepté par le filtre d'un serveur, seuls le processeur (CPU) et la mémoire de ce serveur sont utilisés par l'application Windows qui répond à la demande du client. Les messages de sortie sont envoyés directement depuis le serveur d'application vers le client.

Si un serveur tombe en panne, le protocole de battement de cœur (heartbeat) de la ferme reconfigure les filtres du cluster de répartition de charge réseau afin de rééquilibrer le trafic sur les serveurs disponibles restants.

### Applications avec ou sans état (Stateful ou Stateless) {#stateful-stateless}

Avec une application Windows avec état (stateful), il y a une affinité de session. Un même client doit être connecté au même serveur sur plusieurs sessions TCP afin de récupérer son contexte sur ce serveur. Dans ce cas, la règle de répartition de charge SafeKit est configurée sur l'adresse IP du client. Ainsi, un même client est toujours connecté au même serveur sur ses différentes sessions TCP. Les différents clients sont quant à eux répartis sur les différents serveurs de la ferme (farm).

Avec une application Windows sans état (stateless), il n'y a pas d'affinité de session. Un même client peut être connecté à différents serveurs de la ferme sur plusieurs sessions TCP. Aucun contexte n'est stocké localement sur un serveur d'une session à l'autre. Dans ce cas, la règle de répartition de charge SafeKit est configurée sur l'identifiant de la session TCP du client. Cette configuration est la plus optimale pour répartir les sessions entre les serveurs, mais elle nécessite un service TCP sans affinité de session.

### Comment configurer un cluster SafeKit en mode farm pour Windows ? {#safekit-farm-cluster-configuration}


<img src="/safekit-docs/wp-content/uploads/2026/01/safekit-farm-cluster-config.png" width="966" alt="Console Web SafeKit : Configuration du cluster en mode farm pour la répartition de charge réseau et la gestion de l'IP virtuelle de Windows.">


Le **cluster SafeKit en mode farm** est conçu pour la haute disponibilité et la scalabilité des services. La configuration se concentre sur la répartition du trafic entrant simultanément sur les deux nœuds :

  * **Services avec répartition de charge (onglet Macros) :** Définissez les services applicatifs spécifiques (par exemple, Apache, IIS, Nginx) devant rester actifs sur tous les nœuds.
  * **Réseau(x) de Heartbeat (battement de cœur) :** Chemin(s) de communication utilisé(s) pour détecter si un nœud a quitté la ferme, déclenchant ainsi une redistribution immédiate de la charge.
  * **IP virtuelle (Farm VIP) :** Contrairement à un cluster miroir, la VIP Farm est partagée entre les nœuds à l'aide d'un algorithme de filtrage du noyau (kernel) pour répartir le trafic réseau.
  * **Règles de répartition de charge :** Définissez la politique de distribution du trafic en fonction de l'adresse IP source ou du port.
  * **Checkers (vérificateurs) :** Surveillent l'état de santé de l'application et déclenchent un redémarrage automatique si une défaillance de processus est détectée.


### Comment superviser un cluster SafeKit en mode farm pour Windows ? {#safekit-farm-cluster-monitoring}


<img src="/safekit-docs/wp-content/uploads/2026/01/safekit-farm-cluster-monitor.png" width="473" alt="Console SafeKit : Supervision d'un cluster en mode farm à 2 nœuds montrant les deux nœuds de Windows à l'état UP avec répartition de charge active.">


La supervision d'un cluster en mode farm offre une visibilité sur la nature **Actif-Actif** de l'infrastructure, où tous les nœuds contribuent aux performances de l'application (l'exemple ici présente 2 nœuds) :

  * **État UP (50 % sur 2 nœuds) :** Dans une ferme saine, les deux nœuds sont à l'état « UP » (50 %), ce qui signifie qu'ils reçoivent et traitent activement les requêtes des clients via l'IP virtuelle partagée.
  * **Rééquilibrage automatique :** Si un nœud tombe en panne, la console affiche visuellement le nœud restant prenant 100 % du trafic. Il n'y a pas de délai de basculement (failover), car le nœud survivant est déjà actif (hormis un temps de détection de quelques secondes).
  * **Insertion de nœud :** Lorsqu'un nœud réparé est redémarré, il passe de l'état « STOP » à l'état « UP » et commence automatiquement à recevoir sa part de la charge, sans intervention de l'administrateur.
  * **Pas de synchronisation de données :** Notez que dans un cluster en mode farm, il n'y a pas d'état de resynchronisation « Orange », car les nœuds sont censés être sans état ou partager une base de données interne (qui peut être protégée séparément dans un cluster miroir).


Au-delà des simples icônes d'état, l'interface permet une gestion des nœuds en un clic, vous offrant la possibilité d'arrêter ou de démarrer manuellement un nœud pour une maintenance planifiée tandis que l'IP virtuelle partagée redistribue automatiquement le trafic sans interrompre l'activité des utilisateurs.


<!-- END INSERT: insert-safekit-farm-fr lang="fr" display="content" querystring="app=Windows" -->
 


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