---
title: "Que sont RPO et RTO ? Définitions, exemples et stratégies de haute disponibilité"
canonical: "https://safekit.eviden.com/fr/best-practises/what-is-rpo-and-rto-with-examples/"
description: "Apprenez les définitions de RPO (Recovery Point Objective) et RTO (Recovery Time Objective) avec des exemples clairs. Découvrez comment SafeKit permet d’atteindre une perte de données nulle (RPO = 0) et un basculement rapide pour assurer la continuité d’activité 24h/24 et 7j/7."
category: "best-practises"
lang: "fr"
topics: "Résumé rapide : RPO vs RTO, Table des matières, Comment calculer le RPO et le RTO pour une solution de haute disponibilité et de continuité d’activité ?, Comment déterminer le RPO et le RTO pour une solution de sauvegarde et de reprise après sinistre ?, Comment un cluster mirror SafeKit permet-il d’atteindre un RPO nul et un RTO faible ?, Quels sont les indicateurs RTO pour un cluster farm SafeKit avec répartition de charge ?, Tableaux comparatifs : RTO et RPO, Haute disponibilité en action : démonstrations en temps réel de la perte de données nulle et des temps d’arrêt quasi nuls, FAQ : Optimiser le RPO et le RTO pour la continuité d’activité, 🔍 Explorez SafeKit"
translation: "translate_md 2026-11-20.9 | glossaire 2026-11-20.24 | Translation LLM | 59 expressions"
---

# Que sont RPO et RTO ? Définitions, exemples et stratégies de haute disponibilité {#what-are-rpo-and-rto-definitions-examples-and-ha-strategies}

## Résumé rapide : RPO vs RTO {#article-summary}

  * **RPO (Recovery Point Objective) :** mesure **la perte de données**. Il définit l’âge maximal des fichiers qui doivent être récupérés pour que les opérations puissent reprendre.
  * **RTO (Recovery Time Objective) :** Mesure **le temps d’arrêt**. Il s’agit de la durée pendant laquelle un processus métier doit être restauré.
  * **La principale différence :** RPO concerne **le stockage et les sauvegardes**. RTO concerne **la récupération et la vitesse de basculement**.
  * **SafeKit :** Fournit un **RPO de 0** (aucune perte de données) et un **RTO faible** (redémarrage rapide) grâce à la réplication synchrone et au basculement automatique.


![Un tableau comparatif des RPO (Recovery Point Objective) et RTO (Recovery Time Objective), illustrant comment SafeKit permet d’atteindre une perte de données nulle et un redémarrage rapide des applications.](/wp-content/uploads/2026/08/rto-rpo-5-1024-en-2.jpg "w:512")

**RPO vs RTO : comparaison de la perte de données et du temps de récupération dans SafeKit**

## Table des matières {#table-of-contents}

  * [Comment calculer le RPO et le RTO pour une solution de haute disponibilité et de continuité d’activité ?](#calculate-rpo-rto-high-availability)
  * [Comment déterminer le RPO et le RTO pour une solution de sauvegarde et de reprise après sinistre ?](#calculate-rpo-rto-backup-solution)
  * [Comment un cluster mirror SafeKit permet-il d’atteindre un RPO nul et un RTO faible ?](#rpo-rto-safekit-mirror-cluster)
  * [Quels sont les indicateurs RTO pour un cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit avec répartition de charge ?](#rpo-rto-safekit-farm-cluster)
  * [Tableaux comparatifs : RTO et RPO](#rpo-vs-rto-comparison)
  * [Haute disponibilité en action : démonstrations en temps réel de la perte de données nulle et des temps d’arrêt quasi nuls](#safekit-rpo-rto-video-demos)
  * [FAQ : Optimiser le RPO et le RTO pour la continuité d’activité](#faq-rpo-rto)
  * [Centre de navigation haute disponibilité SafeKit](#hub)



{{%  insert-safekit-4-buttons-fr  %}}
 

## Comment calculer le RPO et le RTO pour une solution de haute disponibilité et de continuité d’activité ? {#calculate-rpo-rto-high-availability}

### Qu’est-ce que la haute disponibilité ? {#what-is-high-availability}

**La haute disponibilité (HA)** est une architecture technique conçue pour garantir qu’un système reste opérationnel et accessible pendant un pourcentage de temps spécifié (par exemple, 99,99 %).


![Logo du logiciel de haute disponibilité SafeKit représentant la réplication synchrone et le basculement](/wp-content/uploads/2026/01/safekit-icon-512x512-1.png "w:128")


Pour atteindre les objectifs RPO et RTO définis dans un **plan de continuité d’activité**, la haute disponibilité est généralement mise en œuvre via deux architectures principales :

  * **Système de disque partagé sur un SAN :** un cluster traditionnel où 2 nœuds sont connectés à un réseau de stockage central (SAN). Si un nœud tombe en panne, l’autre prend le relais de l’accès aux données partagées.
  * **Réplication synchrone sans stockage partagé :** une architecture moderne sans partage, mise en œuvre par SafeKit. Les données sont répliquées en temps réel entre les disques locaux de 2 nœuds indépendants. Aucun SAN n’est nécessaire.


### Quel est le RPO d’une solution de haute disponibilité ? {#what-is-rpo-high-availability}

**L’objectif de point de reprise (RPO)** définit le volume maximal tolérable de perte de données mesuré en temps. Pour une véritable **solution de haute disponibilité**, le RPO cible est de **zéro**.

Lors de la mise en œuvre d’un cluster de haute disponibilité avec basculement automatique, un **RPO nul** garantit que l’application redémarre sans perte de données.

  * **Système de disque partagé sur un SAN :** Étant donné que les deux nœuds accèdent aux **mêmes blocs de données physiques**, il n’y a pas de « delta » ou de décalage entre les nœuds, ce qui garantit une cohérence totale des données lors d’un basculement.
  * **Réplication synchrone basée sur un logiciel :** chaque opération d’écriture est mise en miroir en temps réel sur le réseau. L’application ne reçoit une **confirmation d’écriture** qu’une fois que les données sont stockées en toute sécurité sur les deux nœuds. Ce processus synchrone de « double écriture » garantit **l’absence de perte de données**, même en cas de défaillance du serveur principal.


### Quel est le RTO d’une solution de haute disponibilité ? {#what-is-rto-high-availability}

**L’objectif de temps de reprise (RTO)** représente la durée maximale tolérable d’indisponibilité après une interruption de service. Dans le contexte de **la haute disponibilité**, le RTO doit être minimal pour assurer un accès continu aux applications critiques.

Pour obtenir un RTO faible, une solution de haute disponibilité utilise **un basculement automatique** pour détecter les pannes matérielles ou logicielles et redémarrer l’application immédiatement. Dans un cluster de haute disponibilité typique, le **RTO est d’environ une minute**, calculé comme suit :

  * **Temps de détection des pannes :** Intervalle requis pour que le système identifie une perte du heartbeat d’un nœud ou d’une application.
  * **Temps de redémarrage automatique :** temps nécessaire à l’initialisation des services d’application sur le nœud survivant.


## Comment déterminer le RPO et le RTO pour une solution de sauvegarde et de reprise après sinistre ? {#calculate-rpo-rto-backup-solution}

### Qu’est-ce qu’une solution de sauvegarde ? {#what-is-backup}

Une **solution de sauvegarde** est une stratégie de protection des données conçue pour créer des copies périodiques de données sur un périphérique de stockage secondaire ou dans le cloud. Contrairement à la haute disponibilité, la sauvegarde se concentre sur **la conservation des données à long terme** et la récupération en cas de corruption des données ou de sinistres à l’échelle du site.


![Icône de solution de sauvegarde représentant une architecture de sauvegarde pour la conservation des données à long terme](/wp-content/uploads/2026/01/backup-icon.png "w:128")


Pour atteindre les objectifs RPO et RTO définis dans un **plan de reprise après sinistre**, la sauvegarde est généralement mise en œuvre selon deux méthodes principales :

  * **Instantanés planifiés :** processus dans lequel des copies de données à un moment précis sont prises à intervalles fixes (par exemple, quotidiennement). Cela définit le **RPO**, car toutes les données modifiées entre le dernier instantané et la défaillance sont perdues.
  * **Récupération hors site ou dans le cloud :** une architecture dans laquelle les données sont stockées dans un emplacement physique distinct. Bien que cela garantisse la survie des données, cela entraîne un **RTO plus élevé**, car les données doivent être transférées et restaurées avant que l’application ne puisse redémarrer.


### Qu’est-ce que le RPO d’une solution de sauvegarde ? {#what-is-rpo-backup}

**L’objectif de point de reprise (RPO)** dans un contexte de sauvegarde définit l’âge des fichiers qui doivent être récupérés à partir du stockage pour que les opérations normales reprennent. Contrairement à la haute disponibilité, une **solution de sauvegarde** implique généralement un RPO non nul, représentant le temps écoulé depuis la dernière sauvegarde réussie. 

La quantité de perte de données dans une stratégie de sauvegarde est déterminée par la **fréquence de sauvegarde**. Selon l’architecture, ce RPO peut aller de quelques minutes à 24 heures : 

  * **Instantanés incrémentiels :** méthode dans laquelle seuls les blocs de données modifiés sont enregistrés à intervalles définis. Si une sauvegarde est effectuée toutes les 4 heures, le **RPO maximal est de 4 heures**, ce qui signifie que toutes les données créées entre le dernier instantané et la panne du système sont définitivement perdues. 
  * **Sauvegardes complètes quotidiennes :** une approche traditionnelle où une copie complète des données est effectuée une fois par jour (généralement pendant la nuit). Cela se traduit par un **RPO de 24 heures**, ce qui peut être acceptable pour des données non critiques, mais est souvent insuffisant pour les bases de données transactionnelles. 


### Quel est le RTO d’une solution de sauvegarde ? {#what-is-rto-backup}

**L’objectif de temps de récupération (RTO)** dans une stratégie de sauvegarde est la durée nécessaire pour restaurer les données à partir d’un support de sauvegarde et remettre l’application en état de fonctionnement. Contrairement à la haute disponibilité, le **RTO pour la sauvegarde** est beaucoup plus long, car il implique des processus de restauration manuels ou scriptés. 

Pour une solution de sauvegarde, le RTO peut aller de **plusieurs heures à plusieurs jours**, en fonction du volume de données et de l’architecture de récupération. Le temps d’arrêt total est calculé comme suit : 

  * **Temps de transfert des données :** Le temps nécessaire pour déplacer les données du stockage de sauvegarde (disques locaux, bandes ou cloud) vers le serveur de production. 
  * **Temps de reconfiguration du système :** L’intervalle nécessaire pour extraire les données dans l’application, reconstruire les index et vérifier l’intégrité des données avant que les utilisateurs puissent se reconnecter. 


## Comment un cluster mirror SafeKit permet-il d’atteindre un RPO nul et un RTO faible ? {#rpo-rto-safekit-mirror-cluster}

### Qu’est-ce que le cluster mirror SafeKit ? {#what-is-safekit-mirror-cluster}

Le **cluster mirror SafeKit** est une solution de haute disponibilité basée sur un logiciel qui met en œuvre une architecture sans partage. Contrairement aux clusters traditionnels qui nécessitent un SAN coûteux, SafeKit utilise les ressources locales de deux serveurs standard pour créer un environnement hautement résilient.


![Architecture de cluster mirror SafeKit montrant la réplication de fichiers en temps réel au niveau de l’octet entre les nœuds primaire et secondaire](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


Pour garantir un temps de disponibilité maximal et la protection des données dans le cadre de votre **plan de continuité d’activité**, le cluster mirror SafeKit fonctionne grâce à deux mécanismes intégrés :

  * **Réplication synchrone en temps réel :** SafeKit met en miroir les données sur le réseau entre les disques locaux des nœuds principal et secondaire. Cela garantit que le RPO est nul, car chaque octet de données est sécurisé sur les deux serveurs avant qu’une transaction ne soit finalisée.
  * **Basculement automatique de l’IP et de l’application :** Si le nœud principal tombe en panne, SafeKit détecte automatiquement la perte du heartbeat et rétablit l’application et son adresse IP virtuelle sur le nœud secondaire. Cela se traduit par un RTO d’environ une minute, assurant une continuité de service sans interruption.


### Quel est le RPO d’un cluster mirror SafeKit ? {#rpo-safekit-example}

Le **RPO d’un cluster mirror SafeKit est nul**, car la réplication des données entre les nœuds est [synchrone et en temps réel](</fr/best-practises/synchronous-replication-vs-asynchronous-replication/> "Réplication synchrone ou asynchrone").

Cette garantie de perte de données nulle est obtenue grâce à un processus **d’accusé de réception d’écriture** : une écriture sur le disque n’est confirmée à l’application qu’une fois qu’elle a été écrite avec succès sur les disques locaux des nœuds principal et secondaire.

En revanche, avec **la réplication asynchrone**, le RPO est supérieur à zéro. Comme il existe un délai entre l’écriture primaire et la mise à jour secondaire, une défaillance entraînera une perte de données lors du basculement vers le serveur secondaire. Pour la **continuité d’activité** critiques, la réplication synchrone est le seul moyen de garantir que l’application redémarre avec une intégrité des données à 100 %.

### Quel est le RTO d’un cluster mirror SafeKit ? {#what-is-rto-safekit}

Dans une configuration standard, le **RTO d’un cluster mirror SafeKit est d’environ une minute**. SafeKit offre la flexibilité de mettre en œuvre une haute disponibilité au **niveau de l’application** ou au **niveau de la machine virtuelle**. Chaque option a un impact différent sur le temps de récupération : 

  * **Haute disponibilité au niveau de l’application :** Il s’agit de l’approche optimisée utilisée par SafeKit. Le logiciel surveille des services d’application spécifiques. 
    * **Défaillance matérielle :** RTO = *délai d’expiration du heartbeat* (30 s par défaut) + *temps de redémarrage de l’application*.
    * **Défaillance logicielle :** RTO = *temps d’arrêt de l’application* + *temps de redémarrage de l’application*.
    * **Avantage principal :** Étant donné que le système d’exploitation est déjà en cours d’exécution sur le nœud secondaire, il n’y a pas de délai de démarrage du système d’exploitation, ce qui permet une récupération la plus rapide possible pour **la continuité d’activité**.
  * **Haute disponibilité au niveau de la machine virtuelle :** dans ce scénario, SafeKit protège l’intégralité de la machine virtuelle. 
    * **Récupération après panne :** RTO = temps *de détection de la panne* + *temps de redémarrage du système d’exploitation* + *temps de redémarrage de l’application*.
    * **Compromis technique :** Le RTO est naturellement plus long (plusieurs minutes) car le nœud secondaire doit effectuer un démarrage à froid complet du système d’exploitation avant que l’application ne puisse commencer à s’initialiser.


En utilisant **la haute disponibilité au niveau des applications**, SafeKit élimine la « pénalité de redémarrage » inhérente à la virtualisation standard, garantissant que votre **plan de continuité d’activité** atteigne le temps d’arrêt le plus bas possible. 

## Quels sont les indicateurs RTO pour un cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit avec répartition de charge ? {#rpo-rto-safekit-farm-cluster}

### Qu’est-ce que le cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit ? {#what-is-safekit-farm-cluster}

Le **cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit** est une solution de haute disponibilité logicielle conçue pour les applications sans état (comme les serveurs Web) qui nécessitent à la fois **une évolutivité** et **une redondance**. Contrairement à un cluster mirror qui se concentre sur la réplication des données, un cluster <span class="notranslate farm-term" translate="no">farm</span> distribue le trafic entrant sur plusieurs nœuds actifs.


![Architecture de cluster farm SafeKit démontrant l’équilibrage de charge réseau et le basculement pour les applications sans état](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


Pour assurer **la continuité d’activité** dans les environnements à fort trafic, le cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit fonctionne grâce à deux mécanismes principaux :

  * **Équilibrage de charge réseau :** SafeKit utilise une adresse IP virtuelle pour distribuer le trafic réseau entrant sur une <span class="notranslate farm-term" translate="no">farm</span> de plusieurs serveurs actifs. Cela garantit qu’aucun serveur n’est surchargé et maximise les performances de l’application.
  * **Détection et reconfiguration automatiques des pannes :** Si un nœud de la <span class="notranslate farm-term" translate="no">farm</span> tombe en panne, SafeKit détecte la panne via les heartbeats et redistribue immédiatement son trafic entre les nœuds sains restants. Cela permet d’obtenir un RTO quasi nul pour le service global, car les autres nœuds sont déjà actifs et prêts à absorber la charge.


### Quel est le RPO d’un cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit ? {#what-is-rpo-safekit-farm}

L’**objectif de point de reprise (RPO)** pour un **cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit** est généralement considéré comme **non applicable (N/A)**. En effet, un cluster <span class="notranslate farm-term" translate="no">farm</span> est spécialement conçu pour **les applications sans état** où les données ne sont pas stockées localement sur les nœuds. 

Puisqu’un cluster <span class="notranslate farm-term" translate="no">farm</span> se concentre sur **l’équilibrage de la charge du réseau** plutôt que sur la synchronisation des données, il n’y a pas de réplication de données entre les nœuds au sein du groupe lui-même. Dans un **plan de continuité d’activité** typique impliquant une architecture <span class="notranslate farm-term" translate="no">farm</span> : 

  * **Opérations sans état :** Tous les nœuds de la <span class="notranslate farm-term" translate="no">farm</span> sont identiques et ne contiennent pas de données persistantes. Par conséquent, il n’y a pas de « perte de données » à mesurer lors d’une défaillance d’un nœud. 
  * **Stockage de données externe :** Si l’application nécessite une persistance des données, celle-ci est généralement gérée par un **cluster mirror SafeKit** distinct en back-end. Le RPO est alors nul. 


### Quel est le RTO d’un cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit ? {#rto-example-safekit-farm-cluster}

Dans une architecture <span class="notranslate farm-term" translate="no">farm</span>, le **RTO est réduit à quelques secondes**, car tous les nœuds sont généralement actifs simultanément. Le temps de récupération est déterminé par la vitesse à laquelle le cluster reconfigure sa distribution du trafic :

  * **Défaillance matérielle :** Le RTO est égal au *délai d’expiration de la détection de défaillance* sur les canaux de surveillance (la valeur par défaut est de quelques secondes). Une fois la perte du heartbeat détectée, les **filtres d’équilibrage de charge IP virtuels** sont automatiquement reconfigurés pour rediriger le trafic vers les nœuds sains restants.
  * **Panne logicielle ou redémarrage planifié :** Le RTO est calculé comme le *temps d’arrêt de l’application* plus le *temps de redémarrage de l’application* sur ce nœud spécifique, pendant lequel les autres nœuds de la <span class="notranslate farm-term" translate="no">farm</span> continuent à gérer tout le trafic entrant.


Ce mécanisme « actif-actif » garantit que, pour les services sans état, l’impact sur **la continuité d’activité** est presque imperceptible pour l’utilisateur final, car il n’est pas nécessaire d’initialiser le service sur un nouveau nœud de secours.

## Tableaux comparatifs : RTO et RPO {#rpo-vs-rto-comparison}

**Définition sémantique : RTO et RPO**

Indicateur | Acronyme | Définition | Domaine d’intervention  
---|---|---|---  
Objectif de temps de récupération | RTO | La durée cible pour restaurer un processus métier après une défaillance. | Disponibilité / Temps d’arrêt  
Objectif de point de reprise | RPO | Âge maximal des fichiers qui doivent être récupérés à partir de la sauvegarde pour que les opérations reprennent. | Perte/intégrité des données  
  
**Haute disponibilité (HA) ou sauvegarde standard**

Fonctionnalité | Solutions de sauvegarde | Haute disponibilité (SafeKit)  
---|---|---  
Automatisation de la récupération | Intervention manuelle | Basculement automatique  
RTO cible | De quelques heures à quelques jours | Quelques secondes à environ 1 minute  
RPO cible | > 0 (Dernier point de sauvegarde) | 0 (Réplication synchrone)  
  
**Valeurs de référence RTO et RPO pour les clusters SafeKit**

Architecture | Cas d’utilisation | RTO (Disponibilité) | RPO (perte de données)  
---|---|---|---  
Cluster mirror | Réplication en temps réel | ~1 min (heartbeat + redémarrage) | 0 (aucune perte de données)  
Cluster <span class="notranslate farm-term" translate="no">farm</span> | Équilibrage de charge réseau | Quelques secondes | N/A (sans état)  
  
## Haute disponibilité en action : démonstrations en temps réel de la perte de données nulle et des temps d’arrêt quasi nuls {#safekit-rpo-rto-video-demos}

### Vidéo : Atteindre un RPO nul et un RTO faible dans un cluster mirror SafeKit (8:47) {#demo-mirror-cluster-rpo-rto}

Découvrez comment SafeKit gère une défaillance critique. Cette vidéo montre **la réplication synchrone** garantissant qu’aucune donnée n’est perdue (RPO 0) dans une base de données SQL et le **redémarrage automatique** des services sur le nœud secondaire (RTO faible).


#### Chapitres {#chapters}

  1. 🎬 [2 nœuds avec SQL Server](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. 🎬 [Configurer le cluster et le module mirror.safe](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. 🎬 [Démarrer et tester la réplication, la migration et le basculement SQL en cas de panne](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)

[Essai gratuit ici](</fr/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/>)

### Vidéo : Atteindre un RTO proche de zéro dans un cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit (5:03) {#demo-farm-cluster-rpo-rto}

Découvrez comment SafeKit gère une <span class="notranslate farm-term" translate="no">farm</span> web fonctionnant Apache pour assurer à la fois la mise à l’échelle des performances et le basculement instantané en cas de panne.

#### Chapitres {#chapters-1}

  1. 🎬 [2 nœuds avec Apache](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=0s>) (0:13)
  2. 🎬 [Configurer le cluster et le module farm.safe](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=13s>) (2:20)
  3. 🎬 [Démarrer et tester l’équilibrage de charge réseau, le basculement en cas de panne](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=153s>) (2:30)

[Essai gratuit ici](</fr/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/>)

## FAQ : Optimiser le RPO et le RTO pour la continuité d’activité {#faq-rpo-rto}

### RPO et RTO peuvent-ils être nuls ? {#can-rpo-rto-be-zero}

**Oui.** Atteindre un **RPO de zéro** signifie aucune perte de données, ce qui est possible grâce à la mise en miroir synchrone des données. Un **RTO proche de zéro** est obtenu grâce à un logiciel de basculement automatique comme SafeKit, qui détecte les pannes et redémarre les applications sur un nœud secondaire en quelques secondes ou minutes.

### Qu’est-ce qui est le plus important : RPO ou RTO ? {#importance-rpo-vs-rto}

Ni l’un ni l’autre n’est intrinsèquement plus important ; ils remplissent des rôles différents. **L’objectif de point de reprise (RPO)** se concentre sur la perte de données, c’est-à-dire la quantité de données que vous pouvez vous permettre de perdre. **L’objectif de temps de reprise (RTO)** se concentre sur les temps d’arrêt, c’est-à-dire la rapidité avec laquelle vous devez être de nouveau en ligne. Pour les applications critiques, les deux doivent être minimisés.

### En quoi RPO et RTO diffèrent-ils entre la haute disponibilité au niveau de l’application et la haute disponibilité au niveau de la machine virtuelle avec SafeKit ? {#safekit-application-vs-vm-level}

Bien que les deux garantissent un **RPO de 0** via la réplication synchrone, ils diffèrent en termes de temps de récupération :

  * **Niveau de l’application :** RTO plus rapide (environ 1 min) car seuls les services d’application redémarrent sur un système d’exploitation déjà en cours d’exécution. Il détecte également les pannes de logiciels/processus spécifiques.
  * **Niveau VM :** RTO plus élevé, car la machine virtuelle entière doit redémarrer sur l’hôte secondaire. Bien qu’indépendant de l’application, il manque de surveillance granulaire des processus de l’application eux-mêmes.


### Quelle est la différence entre les solutions de haute disponibilité et les solutions de sauvegarde en termes de RTO ? {#ha-vs-backup-rto}

La haute disponibilité (HA) offre généralement un RTO beaucoup plus faible (de quelques secondes à quelques minutes) car elle gère automatiquement les pannes locales. La reprise après sinistre (DR) avec des solutions de sauvegarde a généralement un RTO plus élevé (de quelques heures à quelques jours) car elle implique la récupération des données et des services sur un site géographiquement distant après une catastrophe majeure.

### Comment obtenir les meilleurs RPO et RTO entre des sites distants ? {#rpo-rto-between-remote-sites}

Pour atteindre un **RPO nul** et un **RTO quasi nul** sur des sites distants, il faut une combinaison de **réplication synchrone** et d’un **LAN étendu (VLAN étendu)** :

  * **LAN étendu / VLAN étendu :** en étendant le même sous-réseau (couche 2) sur deux centres de données, vous pouvez déplacer une application du site A au site B sans changer son adresse IP, évitant ainsi des mises à jour DNS complexes.
  * **La solution SafeKit :** SafeKit tire parti de cela en fournissant une **adresse IP virtuelle (VIP) définie par logiciel** qui flotte entre les sites. Elle redirige instantanément le trafic vers le site secondaire à l’aide d’ARP gratuit (GARP).


Cela permet d’obtenir un **RPO = 0** (réplication en temps réel) et un **RTO minimal** (basculement en environ 1 minute) sans intervention humaine.

### Pourquoi la combinaison de la haute disponibilité et de la sauvegarde est-elle essentielle pour optimiser le RPO et le RTO ? {#combining-ha-and-backup-for-rpo-rto}

La combinaison de la haute disponibilité (HA) et d’une solution de sauvegarde est le seul moyen de parvenir à une stratégie de reprise qui offre le meilleur des deux mondes. Bien qu’elles soient souvent abordées ensemble, elles résolvent différentes parties de l’équation RPO/RTO :

  * **Haute disponibilité (via SafeKit) :** offre un RTO quasi nul et un RPO nul en cas de défaillance matérielle ou logicielle. Grâce à la réplication synchrone en temps réel, le serveur secondaire est toujours à jour. Si le serveur principal tombe en panne, le service redémarre immédiatement sur le serveur secondaire sans aucune perte de données.
  * **Solutions de sauvegarde :** Les sauvegardes protègent contre les problèmes d’intégrité des données (comme les rançongiciels ou la suppression accidentelle). Comme la haute disponibilité réplique les modifications instantanément, elle répliquera « fidèlement » un virus ou un enregistrement de base de données supprimé sur le serveur de secours. Une sauvegarde vous permet de « remonter dans le temps » jusqu’à un point antérieur à la corruption.
  * **L’approche hybride :** Pour une résilience maximale, les organisations utilisent une **architecture hybride à 3 nœuds**. Cela inclut un cluster local à 2 nœuds avec réplication synchrone pour une haute disponibilité immédiate, et une troisième copie distante (asynchrone) pour la reprise après sinistre. Cette défense en couches garantit que vous disposez d’une copie « active » pour une récupération instantanée et d’une copie « historique » pour la sécurité des données.



{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}