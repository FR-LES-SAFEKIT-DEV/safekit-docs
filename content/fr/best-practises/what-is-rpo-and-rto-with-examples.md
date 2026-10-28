---
title: "Que sont les RPO et les RTO ? Définitions, exemples et stratégies HA"
canonical: "https://safekit.eviden.com/fr/best-practises/what-is-rpo-and-rto-with-examples/"
description: "Apprenez les définitions de RPO (Objectif de point de récupération) et de RTO (Objectif de temps de récupération) à l'aide d'exemples concrets. Découvrez comment SafeKit garantit l'absence de perte de données (RPO=0) et un basculement rapide pour assurer la continuité de votre activité 24h/24 et 7j/7."
category: "best-practises"
lang: "fr"
topics: "Résumé rapide : RPO vs RTO, Sommaire, Comment calculer le RPO et le RTO pour une solution de haute disponibilité et de continuité d'activité ?, Comment déterminer le RPO et le RTO pour une solution de sauvegarde et de reprise après sinistre ?, Comment un cluster SafeKit Mirror atteint-il un RPO nul et un RTO faible ?, Quels sont les benchmarks RTO pour un cluster SafeKit `Farm` avec équilibrage de charge ?, Tableaux comparatifs : RTO vs RPO, Haute disponibilité en action : Démonstrations en temps réel d'un RPO nul et d'un RTO quasi nul, FAQ : Optimisation du RPO et du RTO pour la continuité d'activité, 🔍 Centre de navigation Haute disponibilité SafeKit"
---

# Que sont les RPO et RTO ? Définitions, exemples et stratégies de haute disponibilité {#what-are-rpo-and-rto-definitions-examples-and-ha-strategies}

## Résumé rapide : RPO vs. RTO {#article-summary}

  * Objectif de point de récupération (RPO) ** : ** mesure la perte de données ** ** . Il définit l’âge maximal des fichiers qui doivent être récupérés pour que les opérations reprennent.
  * ** RTO (Objectif de temps de récupération) : ** mesure le temps d’indisponibilité ** ** . Il s’agit de la durée pendant laquelle un processus métier doit être rétabli.
  * ** La principale différence : ** RPO concerne ** le stockage/les sauvegardes ** , tandis que RTO concerne ** la vitesse de récupération/basculement ** .
  * Capacité ** SafeKit : ** offre ** 0 RPO ** (aucune perte de données) et ** faible RTO ** (redémarrage rapide) grâce à la réplication synchrone et au basculement automatique.


![ Tableau comparatif des objectifs de point de récupération (RPO) et de temps de récupération (RTO), illustrant comment SafeKit garantit l'absence de perte de données et un redémarrage rapide des applications. ](/wp-content/uploads/2026/08/rto-rpo-5-1024-en-2.jpg "w:512")

** RPO vs. RTO : Comparaison des pertes de données et des temps de récupération dans SafeKit **

## Table des matières {#table-of-contents}

  * [ Comment calculer le RPO et le RTO pour une solution de haute disponibilité et de continuité d'activité ? ](#calculate-rpo-rto-high-availability)
  * [ Comment déterminer le RPO et le RTO pour une solution de sauvegarde et de reprise après sinistre ? ](#calculate-rpo-rto-backup-solution)
  * Comment un cluster [ SafeKit Mirror atteint-il un RPO nul et un RTO faible ? ](#rpo-rto-safekit-mirror-cluster)
  * [ Quels sont les benchmarks RTO pour un cluster SafeKit `Farm` avec équilibrage de charge ? ](#rpo-rto-safekit-farm-cluster)
  * Tableaux comparatifs [ : RTO vs RPO ](#rpo-vs-rto-comparison)
  * [ Haute disponibilité en action : démonstrations en temps réel de RPO zéro et de RTO quasi nul ](#safekit-rpo-rto-video-demos)
  * Foire aux questions sur les RPO et RTO [ ](#faq-rpo-rto)
  * [ SafeKit Hub de navigation haute disponibilité ](#hub)



{{%  insert-safekit-4-buttons-fr  %}}
 

## Comment calculer le RPO et le RTO pour une solution de haute disponibilité et de continuité d'activité ? {#calculate-rpo-rto-high-availability}

### Qu'est-ce que la haute disponibilité ? {#what-is-high-availability}

** Haute Disponibilité (HA) ** est une architecture technique conçue pour garantir qu'un système reste opérationnel et accessible pendant un pourcentage de temps spécifié (par exemple, 99,99 %).


![ SafeKit Logo logiciel haute disponibilité représentant le clustering sans SAN et la réplication synchrone ](/wp-content/uploads/2026/01/safekit-icon-512x512-1.png "w:128")


Pour atteindre les objectifs RPO et RTO définis dans un plan de continuité d'activité ** ** , la haute disponibilité est généralement mise en œuvre à travers deux architectures principales :

  * ** Système de disque partagé sur SAN : ** Cluster traditionnel où 2 nœuds sont connectés à un réseau de stockage (SAN) central. Si un nœud tombe en panne, l'autre prend le relais pour accéder aux données partagées.
  * ** Réplication synchrone sans SAN : ** Une architecture moderne « sans partage » — mise en œuvre par le logiciel [ SafeKit ](</> "SafeKit High Availability Software") — où les données sont répliquées en temps réel entre les disques locaux de 2 nœuds indépendants, en éliminant le besoin d’un SAN.


### Quel est le RPO d'une solution de haute disponibilité ? {#what-is-rpo-high-availability}

L'objectif de point de récupération (RPO) ** ** définit le volume maximal tolérable de perte de données, mesuré en temps. Pour une véritable solution de haute disponibilité ** ** , le RPO cible est ** zéro ** .

Lors de la mise en œuvre d'un cluster à haute disponibilité avec basculement automatique, un RPO zéro ** ** garantit que l'application redémarre sans perte de données.

  * Système de disque partagé ** sur un SAN : ** Étant donné que les deux nœuds accèdent aux mêmes blocs de données physiques ** ** , il n’y a pas de « delta » ou de décalage entre les nœuds, ce qui garantit une cohérence totale des données lors d’un basculement.
  * ** Réplication synchrone logicielle : ** Une approche sans SAN où chaque opération d'écriture est répliquée en temps réel sur le réseau. L'application ne reçoit un accusé de réception d'écriture ** ** qu'une fois les données stockées en toute sécurité sur les deux nœuds. Ce processus synchrone de « double écriture » garantit ** l'absence de perte de données ** même en cas de défaillance du serveur principal.


### Quel est le RTO d'une solution de haute disponibilité ? {#what-is-rto-high-availability}

L'objectif de temps de récupération (RTO) ** ** représente la durée maximale tolérable d'indisponibilité après une interruption de service. Dans le contexte de la haute disponibilité ** ** , le RTO doit être minimal afin de garantir un accès continu aux applications critiques.

Pour atteindre un RTO faible, une solution de haute disponibilité utilise le basculement automatique ** ** afin de détecter les pannes matérielles ou logicielles et de redémarrer immédiatement l'application. Dans un cluster de haute disponibilité typique, le RTO ** est d'environ une minute ** , calculé comme suit :

  * ** Temps de détection des pannes : ** Intervalle requis pour que le système identifie une perte de signal de présence d’un nœud ou d’une application.
  * ** Délai de redémarrage automatique : ** Temps nécessaire à l’initialisation des services d’application sur le nœud survivant.


## Comment déterminer les objectifs de point de récupération (RPO) et de temps de récupération (RTO) pour une solution de sauvegarde et de reprise après sinistre ? {#calculate-rpo-rto-backup-solution}

### Qu'est-ce qu'une solution de sauvegarde ? {#what-is-backup}

Une solution de sauvegarde ** ** est une stratégie de protection des données conçue pour créer des copies périodiques des données sur un périphérique de stockage secondaire ou dans le cloud. Contrairement à la haute disponibilité, la sauvegarde se concentre sur la conservation à long terme des données ** et leur récupération en cas de corruption ou de sinistre affectant l'ensemble du site ( ** ).


![ Icône de solution de sauvegarde représentant une architecture de sauvegarde pour la conservation des données à long terme ](/wp-content/uploads/2026/01/backup-icon.png "w:128")


Pour respecter les objectifs RPO et RTO définis dans un plan de reprise après sinistre ** ** , la sauvegarde est généralement mise en œuvre selon deux méthodes principales :

  * ** Instantanés planifiés : ** Processus consistant à prendre des copies de données à un instant précis à intervalles fixes (par exemple, quotidiennement). Ceci définit le RPO ** ** , car toute donnée modifiée entre le dernier instantané et la panne est perdue.
  * ** Reprise hors site ou dans le cloud : ** Architecture où les données sont stockées dans un emplacement physique distinct. Bien que cela garantisse la conservation des données, cela entraîne un RTO plus élevé ** ** car les données doivent être transférées et restaurées avant que l'application puisse redémarrer.


### Quel est le RPO d'une solution de sauvegarde ? {#what-is-rpo-backup}

L'objectif de point de récupération (RPO) ** ** dans le contexte d'une sauvegarde, définit l'âge des fichiers qui doivent être restaurés pour que les opérations normales reprennent. Contrairement à la haute disponibilité, une solution de sauvegarde ** ** implique généralement un RPO non nul, représentant le temps écoulé depuis la dernière sauvegarde réussie. 

La quantité de données perdues dans une stratégie de sauvegarde est déterminée par la fréquence de sauvegarde ** ** . Selon l'architecture, cet objectif de point de récupération (RPO) peut varier de quelques minutes à 24 heures. 

  * ** Instantanés incrémentiels : ** Méthode dans laquelle seuls les blocs de données modifiés sont enregistrés à intervalles réguliers. Si une sauvegarde est effectuée toutes les 4 heures, le RPO maximal est de 4 heures ; ** ** signifie que toutes les données créées entre le dernier instantané et la panne système sont définitivement perdues. 
  * ** Sauvegardes complètes quotidiennes : ** Approche traditionnelle consistant à effectuer une copie complète des données une fois par jour (généralement pendant la nuit). Ceci entraîne un RPO de 24 heures ** ** , ce qui peut convenir aux données non critiques, mais est souvent insuffisant pour les bases de données transactionnelles. 


### Quel est le RTO d'une solution de sauvegarde ? {#what-is-rto-backup}

L'objectif de temps de récupération (RTO) ** (RTO ** d'une stratégie de sauvegarde correspond à la durée nécessaire pour restaurer les données à partir d'un support de sauvegarde et remettre l'application en état de fonctionnement. Contrairement à la haute disponibilité, le RTO ** des sauvegardes ** est nettement plus long car il implique des processus de restauration manuels ou automatisés. 

Pour une solution de sauvegarde, le RTO (délai de ** peut varier de plusieurs heures à ** jours, selon le volume de données et l'architecture de récupération. La durée totale d'indisponibilité est calculée comme suit : 

  * ** Temps de transfert des données : ** Le temps nécessaire pour déplacer les données du stockage de sauvegarde (disques locaux, bandes ou cloud) vers le serveur de production. 
  * ** Temps de reconfiguration du système : ** Intervalle nécessaire pour importer les données dans l’application, reconstruire les index et vérifier l’intégrité des données avant que les utilisateurs puissent se reconnecter. 


## Comment un cluster SafeKit Mirror atteint-il un RPO nul et un RTO faible ? {#rpo-rto-safekit-mirror-cluster}

### Qu'est-ce que le cluster SafeKit Mirror ? {#what-is-safekit-mirror-cluster}

Le cluster ** SafeKit Mirror ** est une solution de haute disponibilité logicielle qui met en œuvre une architecture « sans partage ». Contrairement aux clusters traditionnels qui nécessitent un SAN coûteux, SafeKit utilise les ressources locales de deux serveurs standard pour créer un environnement hautement résilient.


![ SafeKit Mirror Architecture de cluster illustrant la réplication de fichiers en temps réel au niveau octet entre les nœuds primaire et secondaire ](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


Pour garantir une disponibilité maximale et une protection des données dans le cadre de votre plan de continuité d'activité ** ** , le cluster SafeKit mirror fonctionne grâce à deux mécanismes intégrés :

  * ** Réplication synchrone en temps réel : ** SafeKit répliquent les données sur le réseau entre les disques locaux des nœuds primaire et secondaire. Ceci garantit un RPO nul, car chaque octet de données est sécurisé sur les deux serveurs avant la finalisation d'une transaction.
  * ** Basculement automatique d'adresse IP et d'application : ** En cas de défaillance du nœud principal, SafeKit détecte automatiquement la perte de signal et rétablit l'application et son adresse IP virtuelle sur le nœud secondaire. Ceci permet un RTO d'environ une minute, garantissant une continuité de service sans interruption.


### Quel est le RPO d'un cluster SafeKit Mirror ? {#rpo-safekit-example}

Le RPO ** d'un cluster SafeKit mirror est nul ** car la réplication des données entre les nœuds est [ synchrone et en temps réel ](</fr/best-practises/synchronous-replication-vs-asynchronous-replication/> "Synchronous vs Asynchronous Replication") .

Cette garantie zéro perte de données est obtenue grâce à un processus d'accusé de réception d'écriture ** ** : une écriture sur disque n'est confirmée à l'application qu'une fois qu'elle a été écrite avec succès sur les disques locaux des nœuds principal et secondaire.

En revanche, avec la réplication asynchrone ** ** ), l'objectif de point de récupération (RPO) est supérieur à zéro. En raison du délai entre l'écriture principale et la mise à jour secondaire, une panne entraînera une perte de données lors du basculement vers le serveur secondaire. Pour les applications critiques ** continuité d'activité ** , la réplication synchrone est le seul moyen de garantir un redémarrage de l'application avec une intégrité des données à 100 %.

### Quel est le RTO d'un cluster SafeKit Mirror ? {#what-is-rto-safekit}

Dans une configuration standard, le RTO (temps de récupération mirror ** SafeKit environ une minute. ** offre la flexibilité de mettre en œuvre une haute disponibilité au niveau de l'application SafeKit ** ou au niveau de la machine virtuelle ** ** , chaque niveau ayant un impact différent ** le temps de récupération. 

  * ** Haute disponibilité au niveau de l'application : ** Il s'agit de l'approche optimisée SafeKit dans laquelle le logiciel surveille des services d'application spécifiques. 
    * Défaillance matérielle ** : ** RTO = _délai d’attente du signal de présence_ (par défaut 30 s) + _temps de redémarrage de l’application_.
    * Défaillance logicielle ** : ** RTO = _temps d'arrêt de l'application_ + _temps de redémarrage de l'application_.
    * Avantage clé de ** : ** Étant donné que le système d’exploitation est déjà en cours d’exécution sur le nœud secondaire, il n’y a pas de délai de démarrage du système d’exploitation, ce qui permet une récupération aussi rapide que possible pour ** Continuité des activités ** .
  * ** HA au niveau de la VM : ** Dans ce scénario, SafeKit protège l’ensemble de l’environnement de la machine virtuelle. 
    * Récupération en cas d'échec ** : RTO ** = _détection de panne_ + Temps de redémarrage du système d'exploitation ** ** + _temps de redémarrage de l'application_.
    * ** Compromis technique : ** Le RTO est naturellement plus long (plusieurs minutes) car le nœud secondaire doit effectuer un démarrage à froid complet du système d’exploitation avant même que l’application puisse commencer à s’initialiser.


En utilisant la haute disponibilité au niveau de l'application ** ** , SafeKit élimine la « pénalité de redémarrage » inhérente à la virtualisation standard, garantissant que votre plan de continuité d'activité ** ** atteint le temps d'arrêt le plus faible possible. 

## Quels sont les seuils de temps de récupération (RTO) pour un cluster SafeKit `Farm` avec équilibrage de charge ? {#rpo-rto-safekit-farm-cluster}

### Qu'est-ce que le cluster SafeKit `Farm` ? {#what-is-safekit-farm-cluster}

Le cluster ** SafeKit `Farm` ** est une solution logicielle de haute disponibilité conçue pour les applications sans état (comme les serveurs web) nécessitant à la fois une évolutivité ** ** et une redondance ** ** . Contrairement à un cluster mirror qui se concentre sur la réplication des données, un cluster `farm` répartit le trafic entrant sur plusieurs nœuds actifs.


![ SafeKit Farm Architecture de cluster illustrant l'équilibrage de charge réseau et le basculement pour les applications sans état ](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


Pour maintenir la continuité des activités ** ** dans les environnements à fort trafic, le cluster SafeKit `farm` fonctionne grâce à deux mécanismes principaux :

  * Équilibrage de charge réseau : ** ** SafeKit utilise une adresse IP virtuelle pour répartir le trafic réseau entrant sur un ensemble `farm` serveurs actifs. Ceci garantit qu'aucun serveur n'est surchargé et optimise les performances de l'application.
  * ** Détection et reconfiguration automatiques des pannes : ** En cas de défaillance d'un nœud du réseau `farm` , SafeKit détecte la panne grâce à des pulsations et redistribue immédiatement son trafic entre les nœuds opérationnels restants. Ceci garantit un RTO quasi nul pour l'ensemble du service, car les autres nœuds sont déjà actifs et prêts à prendre le relais.


### Quel est le RPO d'un cluster SafeKit `Farm` ? {#what-is-rpo-safekit-farm}

L'objectif de point de récupération (RPO) ** ** pour un cluster ** SafeKit `Farm` ** est généralement considéré comme ** Non applicable (N/A) ** . En effet, un cluster `farm` est spécifiquement conçu pour les applications sans état ** ** où les données ne sont pas stockées localement sur les nœuds. 

Étant donné qu'un cluster `farm` se concentre sur l'équilibrage de charge réseau ** ** plutôt que sur la synchronisation des données, il n'y a pas de réplication des données entre les nœuds au sein du cluster. Dans un plan de continuité d'activité ** ** typique impliquant une architecture `farm` : 

  * Opérations sans état ** : ** Tous les nœuds du `farm` sont identiques et ne contiennent pas de données persistantes ; par conséquent, il n’y a pas de « perte de données » à mesurer lors d’une panne de nœud. 
  * ** Stockage de données externe : ** Si l’application nécessite la persistance des données, celle-ci est généralement gérée par un backend séparé ** SafeKit Mirror Cluster ** où le RPO serait alors nul. 


### Quel est le RTO d'un cluster SafeKit `Farm` ? {#rto-example-safekit-farm-cluster}

Dans une architecture `farm` , le RTO ** est réduit à quelques secondes ** car tous les nœuds sont généralement actifs simultanément. Le temps de récupération est déterminé par la vitesse à laquelle le cluster reconfigure sa distribution de trafic.

  * Défaillance matérielle ** : ** Le RTO correspond au délai d'expiration de la détection de panne sur l'ensemble des canaux de surveillance (quelques secondes par défaut). Dès la détection d'une perte de signal, les filtres d'équilibrage de charge IP virtuels ** ** sont automatiquement reconfigurés pour rediriger le trafic vers les nœuds fonctionnels restants.
  * ** Défaillance logicielle ou redémarrage planifié : ** Le RTO est calculé comme la _temps d'arrêt de l'application_ plus le _temps de redémarrage de l'application_ sur ce nœud spécifique, pendant lequel les autres nœuds de `farm` continuent de gérer tout le trafic entrant.


Ce mécanisme « actif-actif » garantit que pour les services sans état, l'impact de la continuité des activités ** ** est presque imperceptible pour l'utilisateur final, car il n'est pas nécessaire d'initialiser le service sur un nouveau nœud de secours.

## Tableaux comparatifs : RTO vs RPO {#rpo-vs-rto-comparison}

Définition sémantique ** : RTO vs. RPO **

Métrique | Acronyme | Définition | Domaine d'intervention  
---|---|---|---  
Objectif de temps de récupération (RTO | RTO | : durée cible pour la restauration d'un processus métier après une panne. Disponibilité / Temps d'arrêt |  
Objectif de point de récupération (RPO) | RPO | âge maximal des fichiers à récupérer à partir de la sauvegarde pour que les opérations reprennent. | perte/intégrité des données.  
  
** Haute disponibilité (HA) vs. Sauvegarde standard **

Fonctionnalité | Solutions de sauvegarde | Haute disponibilité ( SafeKit )  
---|---|---  
Automatisation de la récupération | Intervention manuelle | Basculement automatique  
RTO cible | Heures à jours | Secondes à ~1 minute  
Objectif de point de restauration cible | > 0 (Dernier point de sauvegarde) | 0 (Réplication synchrone)  
  
Benchmarks RTO et RPO ** pour les clusters SafeKit **

Architecture | Cas d'utilisation | RTO (Disponibilité) | RPO (Perte de données)  
---|---|---|---  
Mirror Cluster | Réplication en temps réel | ~1 min (Battement de cœur + Redémarrage) | 0 (Aucune perte de données)  
`Farm` Cluster | Équilibrage de charge réseau | Quelques secondes | N/A (Sans état)  
  
## Haute disponibilité en action : démonstrations en temps réel de RPO zéro et de RTO quasi nul {#safekit-rpo-rto-video-demos}

### Vidéo : Obtention d’un RPO nul et d’un RTO faible dans un cluster SafeKit Mirror (8:47) {#demo-mirror-cluster-rpo-rto}

Découvrez comment SafeKit gère une panne critique. Cette vidéo illustre la réplication synchrone ** ** garantissant l'absence de perte de données (RPO 0) dans une base de données SQL et le redémarrage automatique ** ** des services sur le nœud secondaire (RTO faible).


#### Chapitres {#chapters}

  1. 🎬 [ 2 nœuds avec SQL Server ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. 🎬 [ Configurer le cluster et le module mirror.safe ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. 🎬 [ Démarrage et test de la réplication SQL, de la migration et du basculement en cas de panne ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)

Essai gratuit ici : [ ](</fr/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/>)

### Vidéo : Obtention d’un RTO quasi nul dans un cluster SafeKit `Farm` (5:03) {#demo-farm-cluster-rpo-rto}

Découvrez comment SafeKit gère un serveur web Apache `farm` pour assurer à la fois une mise à l'échelle des performances et un basculement instantané.

#### Chapitres {#chapters-1}

  1. 🎬 [ 2 nœuds avec Apache ](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=0s>) (0:13)
  2. 🎬 [ Configurer le cluster et le module farm.safe ](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=13s>) (2:20)
  3. 🎬 [ Démarrage et test de l'équilibrage de charge réseau, basculement en cas de panne ](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=153s>) (2:30)

Essai gratuit ici : [ ](</fr/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/>)

## FAQ : Optimisation du RPO et du RTO pour la continuité des activités {#faq-rpo-rto}

### RPO et RTO peuvent-ils être nuls ? {#can-rpo-rto-be-zero}

** Oui. ** Un RPO nul ** ** l'absence de perte de données, ce qui est possible grâce à la mise en miroir synchrone des données. Un RTO quasi nul ** ** obtenu grâce à un logiciel de basculement automatique comme SafeKit , qui détecte les pannes et redémarre les applications sur un nœud secondaire en quelques secondes ou minutes.

### Lequel est le plus important : RPO ou RTO ? {#importance-rpo-vs-rto}

Aucun n'est intrinsèquement plus important ; ils ont des rôles différents. ** RPO (Objectif de point de récupération) ** se concentrent sur la perte de données : la quantité de données que vous pouvez vous permettre de perdre. ** RTO (Objectif de temps de récupération) ** se concentrent sur le temps d'indisponibilité : le délai de remise en ligne impératif. Pour les applications critiques, les deux doivent être minimisés.

### Quelle est la différence entre les RPO et RTO de SafeKit au niveau de l'application et au niveau de la VM ? {#safekit-application-vs-vm-level}

Bien que les deux garantissent un RPO ** de 0 ** via la réplication synchrone, ils diffèrent en termes de temps de récupération :

  * ** Niveau application : ** RTO plus rapide (environ 1 min) car seuls les services applicatifs redémarrent sur un système d’exploitation déjà en cours d’exécution. Détecte également les plantages logiciels/processus spécifiques.
  * ** Niveau de machine virtuelle : ** Délai de redémarrage plus long, car la machine virtuelle entière doit redémarrer sur l’hôte secondaire. Bien qu’indépendant de l’application, ce mode ne permet pas une surveillance granulaire des processus applicatifs eux-mêmes.


### Quelle est la différence entre les solutions de haute disponibilité et les solutions de sauvegarde en termes de RTO ? {#ha-vs-backup-rto}

La haute disponibilité (HA) offre généralement un RTO beaucoup plus court (de quelques secondes à quelques minutes) car elle gère automatiquement les pannes locales. La reprise après sinistre avec solutions de sauvegarde (DR) présente généralement un RTO plus long (de plusieurs heures à plusieurs jours) car elle implique la restauration des données et des services sur un site géographiquement distant après une catastrophe majeure.

### Comment optimiser les RPO et RTO entre sites distants ? {#rpo-rto-between-remote-sites}

L'obtention d'un RPO nul ** ** et d'un RTO quasi nul ** ** sur des sites distants nécessite une combinaison de réplication synchrone ** ** et d'un LAN étendu (VLAN étiré) ** ** :

  * ** LAN étendu / VLAN étiré : ** En étendant le même sous-réseau (couche 2) sur deux centres de données, vous pouvez déplacer une application du site A au site B sans modifier son adresse IP, évitant ainsi des mises à jour DNS complexes.
  * La solution ** SafeKit ** ) exploite cette fonctionnalité en fournissant une adresse IP virtuelle (VIP) logicielle SafeKit ** ** ) qui bascule entre les sites. Elle redirige instantanément le trafic vers le site secondaire grâce au protocole GARP (Gratuitous ARP).


Cela permet d'obtenir un ** RPO = 0 ** (mise en miroir en temps réel) et un ** RTO minimal ** (basculement en environ 1 minute) sans intervention humaine.

### Pourquoi est-il essentiel de combiner haute disponibilité et sauvegarde pour optimiser le RPO et le RTO ? {#combining-ha-and-backup-for-rpo-rto}

L'association de la haute disponibilité (HA) et d'une solution de sauvegarde est la seule façon d'obtenir une stratégie de reprise optimale. Bien qu'elles soient souvent abordées conjointement, elles répondent à différentes problématiques liées aux objectifs de point de récupération (RPO) et de temps de récupération (RTO).

  * ** Haute disponibilité (via SafeKit ) : ** optimise le RTO et le RPO pour un minimum quasi nul en cas de panne matérielle ou logicielle. Grâce à la réplication synchrone en temps réel, le serveur secondaire est toujours à jour. En cas de défaillance du serveur principal, le service redémarre immédiatement sur le serveur secondaire sans perte de données.
  * ** Solutions de sauvegarde : ** Protection contre les problèmes d'intégrité des données (comme les ransomwares ou les suppressions accidentelles). Grâce à la réplication instantanée des modifications, la haute disponibilité (HA) réplique fidèlement un virus ou un enregistrement de base de données supprimé sur le serveur de secours. Une sauvegarde vous permet de revenir à un état antérieur à la corruption.
  * ** Approche hybride : ** Pour une résilience maximale, les organisations utilisent une architecture hybride à 3 nœuds ** ** . Celle-ci comprend un cluster local à 2 nœuds avec réplication synchrone pour une haute disponibilité immédiate, et une troisième copie distante (asynchrone) pour la reprise après sinistre. Cette défense multicouche garantit la présence d'une copie active pour une restauration instantanée et d'une copie historique pour la sécurité des données.



{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}