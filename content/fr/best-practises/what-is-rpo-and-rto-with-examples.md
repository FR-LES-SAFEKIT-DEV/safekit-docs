---
title: "Que sont les RPO et les RTO ? Définitions, exemples et stratégies HA"
slug: "what-is-rpo-and-rto-with-examples"
canonical: "https://safekit.eviden.com/fr/best-practises/what-is-rpo-and-rto-with-examples/"
description: "Que sont les RPO et les RTO ? Définitions, exemples et stratégies HA"
category: "best-practises"
lang: "fr"
topics: "Résumé : RPO vs RTO, Table des matières, Comment calculer le RPO et le RTO pour une solution de Haute Disponibilité et de Continuité d'Activité ?, Comment déterminer le RPO et le RTO pour une solution de Sauvegarde et de Plan de Reprise d'Activité ?, Comment un Cluster Miroir SafeKit atteint-il un RPO zéro et un RTO faible ?, Quels sont les indicateurs RTO pour un Cluster Ferme SafeKit avec équilibrage de charge ?, Tableaux comparatifs : RTO vs RPO, La haute disponibilité en action : démonstrations en temps réel du RPO zéro et du RTO quasi nul, FAQ : Optimiser le RPO et le RTO pour la Continuité d'Activité, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# Que sont les RPO et les RTO ? Définitions, exemples et stratégies HA

## Résumé : RPO vs RTO {#article-summary}

  * **RPO (Recovery Point Objective) :** Mesure la **perte de données**. Il définit l'ancienneté maximale des fichiers qui doivent être récupérés pour reprendre les opérations.
  * **RTO (Recovery Time Objective) :** Mesure le **temps d'arrêt** (downtime). C'est la durée pendant laquelle un processus métier doit être rétabli.
  * **La différence clé :** Le RPO concerne le **stockage et les sauvegardes** , tandis que le RTO concerne la **vitesse de reprise et du basculement**.
  * **Capacité de SafeKit :** Offre un **RPO de 0** (aucune perte de données) et un **RTO faible** (redémarrage rapide) grâce à la réplication synchrone et au basculement automatique.


<img src="/wp-content/uploads/2026/08/rto-rpo-5-1024-fr-2.jpg" width="512" alt="Un graphique comparatif du RPO (perte de données maximale admissible) et du RTO (durée maximale d'indisponibilité), illustrant comment SafeKit garantit une perte de données nulle et un redémarrage rapide des applications.">


## Table des matières

  * [Comment calculer le RPO et le RTO pour une solution de Haute Disponibilité et Continuité d'Activité ?](<#calculate-rpo-rto-high-availability>)
  * [Comment déterminer le RPO et le RTO pour une solution de Sauvegarde et de Plan de Reprise d'Activité ?](<#calculate-rpo-rto-backup-solution>)
  * [Comment un Cluster Miroir SafeKit atteint-il un RPO zéro et un RTO faible ?](<#rpo-rto-safekit-mirror-cluster>)
  * [Quels sont les indicateurs RTO pour un Cluster Ferme SafeKit avec équilibrage de charge ?](<#rpo-rto-safekit-farm-cluster>)
  * [Tableaux comparatifs : RTO vs RPO](<#rpo-vs-rto-comparison>)
  * [La Haute Disponibilité en action : démos en temps réel du RPO zéro et du RTO minimal](<#safekit-rpo-rto-video-demos>)
  * [Questions fréquemment posées sur le RPO et le RTO](<#faq-rpo-rto>)
  * [Centre de navigation Haute Disponibilité SafeKit](<#hub>)



{{%  insert-safekit-4-buttons-fr %}}
 

## Comment calculer le RPO et le RTO pour une solution de Haute Disponibilité et de Continuité d'Activité ? {#calculate-rpo-rto-high-availability}

### Qu'est-ce que la Haute Disponibilité ? {#what-is-high-availability}

La **Haute Disponibilité (HA)** est une architecture technique conçue pour garantir qu'un système reste opérationnel et accessible pendant un pourcentage de temps spécifié (par exemple, 99,99 %).


<img src="/wp-content/uploads/2026/01/safekit-icon-512x512-1.png" width="128" alt="Logo du logiciel de haute disponibilité SafeKit représentant le clustering sans SAN et la réplication synchrone">


Pour atteindre les objectifs RPO et RTO définis dans un **Plan de Continuité d'Activité (PCA)** , la haute disponibilité est généralement mise en œuvre via deux architectures principales :

  * **Système à disques partagés via un SAN :** Un cluster traditionnel où 2 nœuds sont connectés à un réseau de stockage centralisé (SAN). Si un nœud tombe en panne, le second prend le relais pour accéder aux données partagées.
  * **Réplication synchrone sans SAN (SANless) :** Une architecture moderne de type "shared-nothing" — mise en œuvre par le [logiciel SafeKit](</> "Logiciel de Haute Disponibilité SafeKit") — où les données sont répliquées en temps réel entre les disques locaux de 2 nœuds indépendants, éliminant ainsi le besoin d'un SAN.


### Quel est le RPO d'une solution de Haute Disponibilité ? {#what-is-rpo-high-availability}

Le **RPO (Recovery Point Objective)** définit le volume maximal de perte de données tolérable mesuré en temps. Pour une véritable **solution de haute disponibilité** , l'objectif de RPO est **zéro**.

Lors de la mise en œuvre d'un cluster de haute disponibilité avec basculement automatique, un **RPO zéro** garantit que l'application redémarre sans aucune perte de données.

  * **Système à disques partagés via un SAN :** Étant donné que les deux nœuds accèdent aux **mêmes blocs physiques de données** , il n'y a pas de décalage (lag) entre les nœuds, ce qui assure une cohérence totale des données lors d'un basculement.
  * **Réplication synchrone logicielle :** Une approche sans SAN (SANless) où chaque opération d'écriture est répliquée en temps réel sur le réseau. L'application ne reçoit un **acquittement d'écriture** que lorsque la donnée est sécurisée sur les deux nœuds. Ce processus de "double écriture" synchrone garantit **zéro perte de données** , même en cas de panne du serveur primaire.


### Quel est le RTO d'une solution de Haute Disponibilité ? {#what-is-rto-high-availability}

Le **RTO (Recovery Time Objective)** représente la durée maximale tolérable d'indisponibilité après une interruption de service. Dans le contexte de la **haute disponibilité** , le RTO doit être minimal pour garantir un accès continu aux applications critiques.

Pour atteindre un RTO faible, une solution de haute disponibilité utilise le **basculement automatique (failover)** pour détecter les pannes matérielles ou logicielles et redémarrer l'application immédiatement. Dans un cluster de haute disponibilité classique, le **RTO est d'environ une minute** , calculé comme suit :

  * **Temps de détection de la panne :** L'intervalle nécessaire au système pour identifier la perte du signal de vie (heart-beat) d'un nœud ou d'une application.
  * **Temps de redémarrage automatique :** Le temps nécessaire pour que les services applicatifs s'initialisent sur le nœud survivant.


## Comment déterminer le RPO et le RTO pour une solution de Sauvegarde et de Plan de Reprise d'Activité ? {#calculate-rpo-rto-backup-solution}

### Qu'est-ce qu'une solution de sauvegarde ? {#what-is-backup}

Une **solution de sauvegarde** est une stratégie de protection des données conçue pour créer des copies périodiques des données sur un dispositif de stockage secondaire ou dans le cloud. Contrairement à la Haute Disponibilité, la sauvegarde se concentre sur la **rétention de données à long terme** et la récupération après une corruption de données ou un sinistre majeur à l'échelle d'un site.


<img src="/wp-content/uploads/2026/01/backup-icon.png" width="128" alt="Icône de solution de sauvegarde représentant une architecture de stockage pour la rétention à long terme">


Pour répondre aux objectifs RPO et RTO définis dans un **Plan de Reprise d'Activité (PRA)** , la sauvegarde est généralement mise en œuvre via deux méthodes principales :

  * **Snapshots programmés (Instantanés) :** Un processus où des copies de données à un instant T sont effectuées à intervalles fixes (ex: quotidiennement). Cela définit le **RPO** , car toute donnée modifiée entre le dernier snapshot et la panne est perdue.
  * **Récupération hors site ou Cloud :** Une architecture où les données sont stockées dans un emplacement physique distinct. Bien que cela garantisse la survie des données, cela entraîne un **RTO plus élevé** car les données doivent être transférées et restaurées avant que l'application ne puisse redémarrer.


### Quel est le RPO d'une solution de sauvegarde ? {#what-is-rpo-backup}

Le **RPO (Recovery Point Objective)** dans un contexte de sauvegarde définit l'ancienneté des fichiers qui doivent être récupérés depuis le stockage pour que les opérations normales reprennent. Contrairement à la haute disponibilité, une **solution de sauvegarde** implique généralement un RPO non nul, représentant le temps écoulé depuis la dernière sauvegarde réussie.

Le volume de perte de données dans une stratégie de sauvegarde est déterminé par la **fréquence des sauvegardes**. Selon l'architecture, ce RPO peut varier de quelques minutes à 24 heures :

  * **Snapshots incrémentaux :** Une méthode où seuls les blocs de données modifiés sont enregistrés à intervalles définis. Si une sauvegarde est effectuée toutes les 4 heures, le **RPO maximum est de 4 heures** , ce qui signifie que toute donnée créée entre le dernier snapshot et le crash du système est définitivement perdue.
  * **Sauvegardes complètes quotidiennes :** Une approche traditionnelle où une copie complète des données est réalisée une fois par jour (généralement la nuit). Cela entraîne un **RPO de 24 heures** , ce qui peut être acceptable pour des données non critiques mais est souvent insuffisant pour des bases de données transactionnelles.


### Quel est le RTO d'une solution de sauvegarde ? {#what-is-rto-backup}

Le **RTO (Recovery Time Objective)** dans une stratégie de sauvegarde est la durée nécessaire pour restaurer les données depuis un support de sauvegarde et remettre l'application en état de fonctionnement. Contrairement à la haute disponibilité, le **RTO pour la sauvegarde** est nettement plus long car il implique des processus de restauration manuels ou scriptés.

Pour une solution de sauvegarde, le **RTO peut varier de plusieurs heures à plusieurs jours** , selon le volume de données et l'architecture de récupération. Le temps d'arrêt total est calculé comme suit :

  * **Temps de transfert des données :** Le temps nécessaire pour déplacer les données du stockage de sauvegarde (disques locaux, bandes ou cloud) vers le serveur de production.
  * **Temps de reconfiguration du système :** L'intervalle nécessaire pour intégrer les données dans l'application, reconstruire les index et vérifier l'intégrité des données avant que les utilisateurs ne puissent se reconnecter.


## Comment un Cluster Miroir SafeKit atteint-il un RPO zéro et un RTO faible ? {#rpo-rto-safekit-mirror-cluster}

### Qu'est-ce que le Cluster Miroir SafeKit ? {#what-is-safekit-mirror-cluster}

Le **Cluster Miroir SafeKit** est une solution de haute disponibilité logicielle qui met en œuvre une architecture de type « shared-nothing » (sans partage de ressources). Contrairement aux clusters traditionnels qui nécessitent un SAN coûteux, SafeKit utilise les ressources locales de deux serveurs standards pour créer un environnement hautement résilient.


<img src="/wp-content/uploads/2023/02/safekit-prim-second-300.png" width="300" alt="Architecture SafeKit Mirror Cluster montrant la réplication de fichiers au niveau octet en temps réel entre nœuds primaire et secondaire">


Pour garantir une disponibilité maximale et la protection des données au sein de votre **Plan de Continuité d'Activité (PCA)** , le cluster miroir SafeKit fonctionne via deux mécanismes intégrés :

  * **Réplication synchrone en temps réel :** SafeKit réplique les données sur le réseau entre les disques locaux des nœuds primaire et secondaire. Cela garantit un RPO de zéro, car chaque octet de donnée est sécurisé sur les deux serveurs avant qu'une transaction ne soit finalisée.
  * **Basculement automatique de l'IP et de l'application :** Si le nœud primaire tombe en panne, SafeKit détecte automatiquement la perte du signal de vie (heartbeat) et bascule l'application ainsi que son adresse IP virtuelle sur le nœud secondaire. Cela se traduit par un RTO d'environ une minute, offrant une continuité de service transparente.


### Quel est le RPO d'un Cluster Miroir SafeKit ? {#rpo-safekit-example}

Le **RPO d'un cluster miroir SafeKit est de zéro** car la réplication des données entre les nœuds est [synchrone et en temps réel](</best-practises/synchronous-replication-vs-asynchronous-replication/> "Réplication synchrone vs asynchrone").

Cette garantie de zéro perte de données est obtenue grâce à un processus d'**acquittement d'écriture** : une écriture sur disque n'est confirmée à l'application qu'une fois qu'elle a été effectuée avec succès sur les disques locaux des nœuds primaire et secondaire.

En revanche, avec une **réplication asynchrone** , le RPO est supérieur à zéro. Comme il existe un délai entre l'écriture primaire et la mise à jour secondaire, une panne entraînera une perte de données lors du basculement vers le serveur secondaire. Pour une **Continuité d'Activité** critique, la réplication synchrone est le seul moyen de garantir que l'application redémarre avec une intégrité des données de 100 %.

### Quel est le RTO d'un Cluster Miroir SafeKit ? {#what-is-rto-safekit}

Dans une configuration standard, le **RTO d'un cluster miroir SafeKit est d'environ une minute**. SafeKit offre la flexibilité de mettre en œuvre la haute disponibilité soit au **niveau applicatif** , soit au **niveau VM** , chacun impactant le temps de reprise différemment :

  * **HA au niveau applicatif :** C'est l'approche optimisée de SafeKit où le logiciel surveille des services applicatifs spécifiques. 
    * **Panne matérielle :** RTO = _timeout du heartbeat_ (30s par défaut) + _temps de redémarrage de l'application_.
    * **Panne logicielle :** RTO = _temps d'arrêt de l'application_ \+ _temps de redémarrage de l'application_.
    * **Avantage clé :** Comme le système d'exploitation est déjà en cours d'exécution sur le nœud secondaire, il n'y a pas de délai de boot de l'OS, ce qui permet la reprise la plus rapide pour la **Continuité d'Activité**.
  * **HA au niveau VM :** Dans ce scénario, SafeKit protège l'ensemble de l'environnement de la machine virtuelle. 
    * **Reprise sur panne :** RTO = _détection de la panne_ \+ **temps de reboot de l'OS** \+ _temps de redémarrage de l'application_.
    * **Compromis technique :** Le RTO est naturellement plus long (plusieurs minutes) car le nœud secondaire doit effectuer un démarrage à froid complet du système d'exploitation avant même que l'application puisse commencer à s'initialiser.


En utilisant la **haute disponibilité au niveau applicatif** , SafeKit élimine la « pénalité de redémarrage » inhérente à la virtualisation standard, garantissant que votre **Plan de Continuité d'Activité (PCA)** atteigne le temps d'indisponibilité le plus bas possible.

## Quels sont les indicateurs RTO pour un Cluster Ferme SafeKit avec équilibrage de charge ? {#rpo-rto-safekit-farm-cluster}

### Qu'est-ce que le Cluster Ferme SafeKit ? {#what-is-safekit-farm-cluster}

Le **Cluster Ferme SafeKit** est une solution de haute disponibilité logicielle conçue pour les applications sans état (comme les serveurs web) qui nécessitent à la fois **scalabilité** et **redondance**. Contrairement à un cluster miroir qui se concentre sur la réplication de données, un cluster ferme distribue le trafic entrant sur plusieurs nœuds actifs.


<img src="/wp-content/uploads/2023/02/safekit-up-up-up-300.png" width="300" alt="Architecture SafeKit Farm Cluster démontrant l'équilibrage de charge réseau et le basculement pour les applications sans état">


Pour maintenir la **Continuité d'Activité** dans des environnements à fort trafic, le cluster ferme SafeKit fonctionne via deux mécanismes clés :

  * **Équilibrage de charge réseau (Load Balancing) :** SafeKit utilise une adresse IP virtuelle pour répartir le trafic réseau entrant sur une « ferme » de plusieurs serveurs actifs. Cela garantit qu'aucun serveur n'est saturé et maximise les performances de l'application.
  * **Détection automatique de pannes et reconfiguration :** Si un nœud de la ferme tombe en panne, SafeKit détecte la défaillance via des signaux de vie (heartbeats) et redistribue immédiatement son trafic entre les nœuds sains restants. Cela offre un RTO quasi nul pour le service global, car les autres nœuds sont déjà actifs et prêts à absorber la charge.


### Quel est le RPO d'un Cluster Ferme SafeKit ? {#what-is-rpo-safekit-farm}

Le **RPO (Recovery Point Objective)** pour un **Cluster Ferme SafeKit** est généralement considéré comme **Non Applicable (N/A)**. En effet, un cluster ferme est spécifiquement conçu pour des **applications sans état (stateless)** où les données ne sont pas stockées localement sur les nœuds.

Étant donné qu'un cluster ferme se concentre sur l'**équilibrage de charge réseau** plutôt que sur la synchronisation des données, il n'y a pas de réplication de données entre les nœuds au sein du cluster lui-même. Dans un **Plan de Continuité d'Activité (PCA)** typique impliquant une architecture en ferme :

  * **Opérations sans état :** Tous les nœuds de la ferme sont identiques et ne détiennent pas de données persistantes ; par conséquent, il n'y a pas de « perte de données » à mesurer lors de la panne d'un nœud.
  * **Stockage de données externe :** Si l'application nécessite une persistance des données, celle-ci est généralement gérée par un **Cluster Miroir SafeKit** distinct en arrière-plan (backend), où le RPO serait alors de zéro.


### Quel est le RTO d'un Cluster Ferme SafeKit ? {#rto-example-safekit-farm-cluster}

Dans une architecture en ferme (farm), le **RTO est réduit à seulement quelques secondes** car tous les nœuds sont généralement actifs simultanément. Le temps de reprise est déterminé par la vitesse à laquelle le cluster reconfigure sa distribution de trafic :

  * **Panne matérielle :** Le RTO est égal au _timeout de détection de panne_ via les canaux de surveillance (quelques secondes par défaut). Une fois la perte du heartbeat détectée, les **filtres d'équilibrage de charge de l'IP virtuelle** sont automatiquement reconfigurés pour rediriger le trafic vers les nœuds sains restants.
  * **Panne logicielle ou redémarrage planifié :** Le RTO est calculé comme la somme du _temps d'arrêt de l'application_ et du _temps de redémarrage de l'application_ sur ce nœud spécifique, période pendant laquelle les autres nœuds de la ferme continuent de gérer l'intégralité du trafic entrant.


Ce mécanisme « Actif-Actif » garantit que pour les services sans état, l'impact sur la **Continuité d'Activité** est presque imperceptible pour l'utilisateur final, car il n'est pas nécessaire d'initialiser le service sur un nouveau nœud en attente (standby).

## Tableaux comparatifs : RTO vs RPO {#rpo-vs-rto-comparison}

**Définition sémantique : RTO vs RPO**

Indicateur | Acronyme | Définition | Domaine d'application  
---|---|---|---  
**Recovery Time Objective** | RTO | La durée cible nécessaire pour rétablir un processus métier après une panne. | Disponibilité / Temps d'arrêt  
**Recovery Point Objective** | RPO | L'ancienneté maximale des fichiers qui doivent être récupérés pour reprendre les opérations. | Perte de données / Intégrité  
  
**Haute Disponibilité (HA) vs Sauvegarde Standard**

Caractéristique | Solutions de Sauvegarde | Haute Disponibilité (SafeKit)  
---|---|---  
**Automatisation de la reprise** | Intervention manuelle | Basculement automatique  
**RTO Cible** | Plusieurs heures à quelques jours | Secondes à ~1 minute  
**RPO Cible** | > 0 (Point de dernière sauvegarde) | 0 (Réplication synchrone)  
  
**Indicateurs RTO et RPO pour les Clusters SafeKit**

Architecture | Cas d'utilisation | RTO (Disponibilité) | RPO (Perte de données)  
---|---|---|---  
**Cluster Miroir** | Réplication en temps réel | ~1 min (Heartbeat + Redémarrage) | 0 (Zéro perte de données)  
**Cluster Ferme** | Équilibrage de charge réseau | Quelques secondes | N/A (Sans état / Stateless)  
  
## La haute disponibilité en action : démonstrations en temps réel du RPO zéro et du RTO quasi nul {#safekit-rpo-rto-video-demos}

### Vidéo : Atteindre un RPO zéro et un RTO faible avec un Cluster Miroir SafeKit (8:47) {#demo-mirror-cluster-rpo-rto}

Découvrez comment SafeKit gère une panne critique. Cette vidéo démontre la **réplication synchrone** garantissant l'absence de perte de données (RPO 0) dans une base de données SQL et le **redémarrage automatique** des services sur le nœud secondaire (RTO faible).

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 

#### Chapitres

  1. [Configuration à 2 nœuds avec SQL Server](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. [Configurer le cluster et le module mirror.safe](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. [Démarrage et test de la réplication SQL, migration et failover sur crash](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)

[Essai gratuit ici](</quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/>)

### Vidéo : Atteindre un RTO quasi nul avec un Cluster Ferme SafeKit (5:03) {#demo-farm-cluster-rpo-rto}

Découvrez comment SafeKit gère une ferme web Apache pour offrir à la fois une montée en charge des performances et un basculement instantané.

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 

#### Chapitres

  1. [Configuration à 2 nœuds avec Apache](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=0s>) (0:13)
  2. [Configurer le cluster et le module farm.safe](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=13s>) (2:20)
  3. [Démarrage et test de l'équilibrage de charge réseau, failover sur crash](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=153s>) (2:30)

[Essai gratuit ici](</quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/>)

## FAQ : Optimiser le RPO et le RTO pour la Continuité d'Activité {#faq-rpo-rto}

### Comprendre les objectifs RPO & RTO

Le RPO et le RTO peuvent-ils être égaux à zéro ?

**Oui.** Atteindre un **RPO zéro** signifie aucune perte de données, ce qui est possible grâce au mirroring (miroir) synchrone des données. Un **RTO quasi nul** est atteint grâce à un logiciel de basculement automatisé comme SafeKit, qui détecte les pannes et redémarre les applications sur un nœud secondaire en quelques secondes ou minutes.

Lequel est le plus important : le RPO ou le RTO ?

L'un n'est pas intrinsèquement plus important que l'autre ; ils jouent des rôles différents. Le **RPO (Recovery Point Objective)** se concentre sur la perte de données — quelle quantité de données pouvez-vous vous permettre de perdre. Le **RTO (Recovery Time Objective)** se concentre sur le temps d'arrêt — à quelle vitesse devez-vous être de nouveau en ligne. Pour les applications critiques, les deux doivent être minimisés.

* * *

### Performances de reprise & Architectures

Quelle est la différence de RPO et RTO entre SafeKit au niveau applicatif et au niveau VM ?

Bien que les deux garantissent un **RPO de 0** via la réplication synchrone, ils diffèrent par le temps de reprise :

  * **Niveau applicatif :** RTO plus rapide (environ 1 min) car seuls les services applicatifs redémarrent sur un OS déjà opérationnel. Cela permet aussi de détecter les plantages spécifiques de logiciels ou de processus.
  * **Niveau VM :** RTO plus élevé car l'intégralité de la machine virtuelle doit redémarrer sur l'hôte secondaire. Bien qu'indépendante de l'application, cette méthode manque de finesse dans la surveillance des processus applicatifs.


Quelle est la différence entre la HA et les solutions de sauvegarde en termes de RTO ?

La Haute Disponibilité (HA) offre généralement un RTO beaucoup plus bas (quelques secondes à minutes) car elle gère automatiquement les pannes locales. La reprise après sinistre avec des solutions de sauvegarde (DR/PRA) a généralement un RTO plus élevé (quelques heures à plusieurs jours) car elle implique la restauration des données et des services sur un site géographiquement distant après une catastrophe majeure.

Comment obtenir le meilleur RPO et RTO entre des sites distants ?

Obtenir un **RPO zéro** et un **RTO quasi nul** entre des sites distants nécessite la combinaison d'une **réplication synchrone** et d'un **LAN étendu (VLAN étiré)** :

  * **LAN étendu / Stretched VLAN :** En étirant le même sous-réseau (Couche 2) sur deux centres de données, vous pouvez déplacer une application du Site A vers le Site B sans changer son adresse IP, évitant ainsi des mises à jour DNS complexes.
  * **La solution SafeKit :** SafeKit exploite cela en fournissant une **IP virtuelle (VIP) logicielle** qui bascule entre les sites. Elle redirige instantanément le trafic vers le site secondaire via le protocole Gratuitous ARP (GARP).


Cela permet d'obtenir un **RPO = 0** (miroir en temps réel) et un **RTO minimal** (basculement en environ 1 minute) sans intervention humaine.

Pourquoi la combinaison de la Haute Disponibilité et de la Sauvegarde est-elle essentielle pour optimiser le RPO et le RTO ?

Combiner la Haute Disponibilité (HA) avec une solution de sauvegarde est le seul moyen d'obtenir une stratégie de reprise complète. Bien qu'elles soient souvent évoquées ensemble, elles résolvent des aspects différents de l'équation RPO/RTO :

  * **Haute Disponibilité (via SafeKit) :** Optimise le RTO (quasi nul) et le RPO (zéro) lors de pannes matérielles ou logicielles. Grâce à la réplication synchrone en temps réel, le serveur secondaire est toujours à jour. Si le primaire échoue, le service redémarre immédiatement sur le secondaire sans perte de données.
  * **Solutions de sauvegarde :** Protègent contre les problèmes d'intégrité des données (comme les ransomwares ou les suppressions accidentelles). Comme la HA réplique les modifications instantanément, elle répliquera « fidèlement » un virus ou une suppression de base de données sur le serveur passif. Une sauvegarde permet de « remonter le temps » avant la corruption.


**L'approche hybride :**

Pour une résilience maximale, les entreprises utilisent une **architecture hybride à 3 nœuds**. Cela inclut un cluster local de 2 nœuds avec réplication synchrone pour la HA immédiate, et une troisième copie distante (asynchrone) pour la reprise après sinistre (PRA). Cette défense en couches garantit une copie « active » pour une reprise instantanée et une copie « historique » pour la sécurité des données.


{{%  insert-safekit-hub-fr %}}
 


{{%  insert-safekit-4-buttons-fr %}}