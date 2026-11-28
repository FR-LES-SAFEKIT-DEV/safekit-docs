---
title: "Haute disponibilité et reprise après sinistre avec SafeKit"
canonical: "https://safekit.eviden.com/fr/best-practises/high-availability-disaster-recovery-hadr/"
description: "Combinez la haute disponibilité SafeKit (réplication synchrone, RPO 0) et des sauvegardes asynchrones pour une reprise après sinistre hors site sous Windows et Linux."
category: "best-practises"
lang: "fr"
topics: "Réplication synchrone SafeKit pour la haute disponibilité (HA) vs. réplication de sauvegarde asynchrone pour la reprise après sinistre (DR), Table des matières, HADR synchrone : aucune perte de données sur les réseaux rapides (LAN/VLAN), HADR asynchrone : reprise après sinistre sur des réseaux lents (WAN), Comment combiner HADR et la sauvegarde pour une résilience système totale, Comparaison des architectures HADR : réseaux rapides et lents, Guide vidéo : Comment mettre en œuvre HADR avec SafeKit"
hashpart: "synchronous-safekit-replication-for-ha-vs-asynchronous-backup-replication-for-dr, table-of-contents, synchronous-hadr-fast-network, asynchronous-hadr-slow-network, hadr-resilience-strategy, hadr-architectures-comparison, videoguide-hadr-safekit"
translation: "translate_md 2026-11-19.2 | glossaire 2026-11-19.28 | Translation LLM | 59 expressions"
image: "/wp-content/uploads/2026/01/safekit-backup-3-nodes-5-1024.jpg"
schemaType: "TechArticle"
---

# Haute disponibilité et reprise après sinistre avec SafeKit {#high-availability-and-disaster-recovery-with-safekit}

## Réplication synchrone SafeKit pour la haute disponibilité (HA) vs. réplication de sauvegarde asynchrone pour la reprise après sinistre (DR) {#synchronous-safekit-replication-for-ha-vs-asynchronous-backup-replication-for-dr}

SafeKit fournit une **architecture de haute disponibilité et de reprise après sinistre (HADR)** flexible et basée sur un logiciel qui élimine le besoin d’un stockage partagé coûteux. En mettant en œuvre **la réplication synchrone** sur un VLAN étendu entre le serveur 1 et le serveur 2, SafeKit garantit que vos applications critiques restent « actives » et cohérentes entre deux sites redondants.

Pour répondre aux contraintes des WAN à faible bande passante, SafeKit est conçu pour être associé à **des solutions de sauvegarde et de restauration**. Cela permet aux organisations de maintenir une disponibilité 24h/24 et 7j/7 grâce au basculement automatique tout en sécurisant les données historiques pour la reprise après sinistre hors site.

Par conséquent, l’environnement est protégé contre les pannes matérielles ou logicielles via SafeKit, et sécurisé contre les erreurs logiques et les cybermenaces telles que les rançongiciels grâce à la solution de sauvegarde.


![Un schéma technique montrant pourquoi la haute disponibilité (SafeKit) et les sauvegardes sont complémentaires : SafeKit gère le basculement matériel/logiciel via la réplication synchrone, tandis que la sauvegarde asynchrone protège contre les rançongiciels et les erreurs logiques.](/wp-content/uploads/2026/01/safekit-backup-3-nodes-5-1024.jpg "w:512")

**Haute disponibilité avec SafeKit et reprise après sinistre avec des sauvegardes**

## Table des matières {#table-of-contents}

  * [HADR synchrone : aucune perte de données sur les réseaux rapides (LAN/VLAN)](#synchronous-hadr-fast-network)
  * [HADR asynchrone : reprise après sinistre sur des réseaux lents (WAN)](#asynchronous-hadr-slow-network)
  * [Comment combiner HADR et la sauvegarde pour une résilience système totale](#hadr-resilience-strategy)
  * [Comparaison des architectures HADR : réseaux rapides et lents](#hadr-architectures-comparison)
  * [Guide vidéo : Comment mettre en œuvre HADR avec SafeKit](#videoguide-hadr-safekit)
  * [🔍 Explorez SafeKit](#hub)



{{%  insert-safekit-4-buttons-fr  %}}
 

## HADR synchrone : aucune perte de données sur les réseaux rapides (LAN/VLAN) {#synchronous-hadr-fast-network}

### Comment mettre en œuvre HADR sur un réseau rapide ? {#hadr-fast-network-architecture}


![Architecture combinant la haute disponibilité et la reprise après sinistre (HADR) sans disques partagés](/wp-content/uploads/2023/02/remote-datacenters.png "w:256")


Pour mettre en œuvre HADR sur un réseau rapide, déployez deux nœuds sur des sites distants pour fournir simultanément une haute disponibilité et une reprise après sinistre. Cette configuration garantit que votre application reste disponible même si un site entier tombe en panne, sans la complexité d’une infrastructure de stockage partagée.

### Pourquoi utiliser une solution HADR sans SAN pour les réseaux rapides ? {#sanless-hadr-solution}

Une solution sans SAN comme SafeKit est essentielle, car elle réplique les données de manière synchrone et en temps réel entre deux nœuds sans disques partagés. Étant donné que la réplication synchrone garantit une perte de données nulle (RPO = 0), le logiciel peut déclencher instantanément un basculement automatique de l’application en cas de défaillance matérielle ou logicielle.

### Quelles sont les exigences réseau pour l'architecture HADR synchrone ? {#extended-lan-vlan-requirements}

L'architecture HADR synchrone nécessite un LAN étendu ou un VLAN étendu pour trois raisons essentielles :

  * **Basculement d’adresse IP virtuelle :** Un seul sous-réseau est requis. L’[adresse IP virtuelle](</fr/best-practises/how-a-virtual-ip-address-works/>) peut ensuite se déplacer automatiquement entre les nœuds.
  * **Faible latence :** [La réplication synchrone](</fr/best-practises/synchronous-replication-vs-asynchronous-replication/>) sans perte de données nécessite généralement un temps d’aller-retour du réseau inférieur à 5 ms.
  * **Bande passante élevée :** Une connexion de 1 Gb/s ou plus est requise pour assurer une resynchronisation rapide des données lors d’un failback.


## HADR asynchrone : reprise après sinistre sur des réseaux lents (WAN) {#asynchronous-hadr-slow-network}

### Comment mettre en œuvre HADR sur un réseau lent ? {#hadr-slow-network-architecture}


![Architecture HADR séparant la haute disponibilité de la reprise après sinistre](/wp-content/uploads/2023/03/hadr-slow-network-1.png "w:256")


Pour mettre en œuvre HADR sur un réseau lent (WAN), l’architecture sépare généralement **la haute disponibilité** de **la reprise après sinistre**. Dans ce scénario, deux nœuds sont déployés sur le site principal pour la redondance locale, tandis qu’une stratégie de sauvegarde ou de réplication asynchrone distincte est utilisée pour protéger les données sur un site distant.

### Quelle est la meilleure solution HADR pour les connexions à faible bande passante ? {#sanless-ha-with-remote-dr}

La solution optimale consiste à déployer **SafeKit** sur le site principal pour une haute disponibilité locale à l’aide de la réplication synchrone en temps réel et du basculement automatique. Pour le site de reprise après sinistre, les données sont protégées par réplication asynchrone ou par des sauvegardes planifiées via le réseau lent, garantissant que la disponibilité locale est maintenue sans être limitée par la latence du WAN. Pour réaliser cette architecture, une **solution de sauvegarde** dédiée (autre que SafeKit) est nécessaire pour gérer le transfert et la restauration des données sur le site distant. 

### Comment fonctionne le basculement avec un site de reprise d’activité après sinistre distant ? {#dr-site-failover-process}

Étant donné que la réplication asynchrone sur un réseau lent implique une perte de données potentielle (RPO > 0), le processus de basculement vers un site de reprise après sinistre est généralement manuel et géré par un administrateur :

  * **Restauration des données :** les sauvegardes sont restaurées sur des serveurs secondaires sur le site de reprise d’activité après sinistre. Les solutions modernes restaurent rapidement les machines virtuelles (VM) pour réduire le temps de récupération. **Veeam** en est un exemple.
  * **Redirection DNS :** Le trafic est redirigé vers le site de reprise après sinistre au niveau du DNS. Le temps de récupération dépend des délais d’expiration du cache DNS (TTL), et certaines applications clientes peuvent nécessiter un redémarrage pour prendre en compte la nouvelle adresse IP.
  * **Décision manuelle :** un administrateur doit vérifier l’intégrité des données sur le site distant avant d’autoriser le basculement vers le centre de données secondaire.


## Comment combiner HADR et la sauvegarde pour une résilience système totale {#hadr-resilience-strategy}

### Comparaison de la haute disponibilité et de la sauvegarde des données {#ha-vs-backup-comparison}


![Logo du logiciel de haute disponibilité SafeKit](/wp-content/uploads/2026/04/safekit-icon-512x512-1.png "w:64")

 

![Icône de la stratégie de sauvegarde des données](/wp-content/uploads/2026/01/backup-icon.png "w:64")


Bien que les deux soient essentiels pour la protection des données, **la haute disponibilité (HA)** et **les solutions de sauvegarde** ciblent des risques différents. **La haute disponibilité**, optimisée par SafeKit, fournit un mécanisme de basculement « en direct » pour maintenir les applications accessibles pendant les pannes de serveur ou les défaillances matérielles. À l’inverse, une **solution de sauvegarde** agit comme une archive « historique ». Alors que la haute disponibilité assure une disponibilité du système de 99,99 % en répliquant les données en temps réel, la sauvegarde se concentre sur l’intégrité des données, fournissant les points de restauration nécessaires pour récupérer après des erreurs logiques, des suppressions accidentelles ou des attaques de rançongiciels.

### La haute disponibilité peut-elle remplacer une stratégie de sauvegarde ? {#ha-vs-backup-ransomware}

Non, la haute disponibilité et les sauvegardes sont complémentaires, pas interchangeables. Alors que **SafeKit** assure **la continuité d’activité** en maintenant les applications en fonctionnement en cas de panne matérielle, il ne protège pas contre les erreurs logiques, les suppressions accidentelles ou les attaques de rançongiciels. Par exemple, comme la réplication en temps réel reflète chaque modification instantanément, une attaque de rançongiciel sur le nœud principal sera immédiatement dupliquée sur le nœud secondaire. Pour récupérer de telles cybermenaces ou suppressions accidentelles, vous avez besoin d’une **solution de sauvegarde** dédiée avec une politique de rétention robuste. Cela vous permet de « rembobiner » votre environnement à un état sain antérieur à la corruption.

### Optimisation RTO et RPO : la synergie entre la haute disponibilité et la sauvegarde {#ha-backup-rpo-rto}

Pour construire une infrastructure véritablement résiliente, vous devez intégrer la haute disponibilité et la sauvegarde dans une stratégie unifiée. Ces deux technologies abordent différentes dimensions de l’objectif de temps de récupération (RTO) et de l’objectif de point de récupération (RPO). Pour plus de détails, consultez [RTO et RPO avec des exemples](</fr/best-practises/what-is-rpo-and-rto-with-examples/>).

  * **Haute disponibilité (via SafeKit) :** Son objectif est **la récupération instantanée**. SafeKit maintient une copie synchrone et active de votre environnement. Son RTO est proche de zéro. Son RPO est de zéro. En cas de défaillance d’un serveur, l’application reprend immédiatement sur le nœud secondaire, garantissant l’absence d’interruption de service ou de perte de données pendant la transition.
  * **Solutions de sauvegarde :** leur objectif est **la résilience des données**. Alors que la haute disponibilité maintient le service « en ligne », la sauvegarde crée un historique « immuable ». La sauvegarde est votre filet de sécurité lorsque les données en direct sont elles-mêmes compromises. Elle vous permet de restaurer une version propre de votre base de données à partir d’un moment précis, avant qu’un virus ou une suppression accidentelle ne se produise.


## Comparaison des architectures HADR : réseaux rapides et lents {#hadr-architectures-comparison}

Critères | Réseau rapide (LAN/VLAN) | Réseau lent (WAN)  
---|---|---  
Portée principale | Redondance locale et haute disponibilité | Reprise d’activité après sinistre intersites  
Cas d’utilisation | Même centre de données ou campus | Centres de données distants ou régions cloud  
Type de réplication | Synchrone (en temps réel) | Asynchrone / Sauvegarde  
RPO (perte de données) | Zéro (RPO = 0) | Perte de données potentielle (RPO > 0)  
Processus de basculement | Automatique | Manuel (décision Admin)  
Détournement du trafic | Adresse IP virtuelle (VIP) | Niveau DNS (en fonction de la durée de vie en cache)  
Exigence de latence | Faible (généralement < 5 ms) | Prend en charge une latence élevée  
Objectif de récupération primaire | Continuité d’activité immédiate | Sécurité et conservation des données  
  
## Guide vidéo : Comment mettre en œuvre HADR avec SafeKit {#videoguide-hadr-safekit}

###  Comment implémenter HADR avec SafeKit : réplication synchrone et basculement {#how-to-implement-hadr-with-safekit-synchronous-replication--failover}

Découvrez comment combiner **la haute disponibilité (HA)** et **la reprise après sinistre (DR)** en une seule stratégie HADR à l’aide de SafeKit. Ce guide vidéo explore l’architecture requise pour une disponibilité applicative de 100 % sans avoir besoin de disques partagés.

### Moments forts de la vidéo {#video-highlights}

  1. 🎬 [Introduction à SafeKit HADR sur VLAN étendus](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=0s>) (1:06)
  2. 🎬 [Fonctionnement de la mise en miroir synchrone et de la double confirmation](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=65s>) (1:41)
  3. 🎬 [Mécanismes de basculement : ARP gratuit (GARP) et IP virtuelle](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=166s>) (2:10)
  4. 🎬 [Conception pour les WAN lents : HA ou stratégies de sauvegarde](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=296s>) (2:45)


### Vidéo SafeKit : Comment mettre en œuvre la haute disponibilité et la reprise après sinistre (HADR) avec SafeKit (7:40) {#safekit-video-how-to-implement-high-availability-and-disaster-recovery-hadr-with-safekit-740}



{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}