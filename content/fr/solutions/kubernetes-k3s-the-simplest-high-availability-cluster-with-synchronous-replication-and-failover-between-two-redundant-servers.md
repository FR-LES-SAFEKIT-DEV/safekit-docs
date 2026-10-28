---
title: "Kubernetes K3s Haute disponibilité : Réplication synchrone à 2 nœuds et basculement"
canonical: "https://safekit.eviden.com/fr/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/"
description: "Bénéficiez d'une haute disponibilité K3s sur 2 nœuds sans stockage externe ni quorum etcd. Découvrez comment SafeKit assure une réplication sans perte de données et un basculement automatique."
category: "solutions"
lang: "fr"
topics: "Simplification de la haute disponibilité K3s : Pourquoi choisir SafeKit plutôt que MetalLB et Longhorn ? Sommaire, Comment le logiciel SafeKit implémente-t-il simplement un cluster haute disponibilité K3s Kubernetes ?, Comment le cluster SafeKit mirror fonctionne-t-il avec Kubernetes K3S ?, Limitations de la haute disponibilité SafeKit , Comparaison : SafeKit vs. Pile K3s standard (MetalLB et Longhorn), Tutoriel vidéo : Configuration d’un cluster haute disponibilité SafeKit mirror , 🔍 Centre de navigation haute disponibilité SafeKit"
---

# Kubernetes K3s Haute disponibilité : Réplication synchrone à 2 nœuds et basculement {#kubernetes-k3s-high-availability-2-node-synchronous-replication--failover}

## Simplification des HA K3 : Pourquoi choisir SafeKit plutôt que MetalLB et Longhorn ? {#safekit-k3s-ha-introduction}

Bien que la pile open source standard (MetalLB + Longhorn) pour K3s soit performante pour les grands datacenters, elle introduit une complexité excessive pour les sites sur site à deux nœuds. ** SafeKit ** simplifie l'environnement K3s en remplaçant les outils de réseau et de stockage autonomes par un moteur HA unique et consolidé. 

### Pourquoi utiliser SafeKit pour une haute disponibilité (HA) K3s à 2 nœuds ? {#why-use-safekit-for-2-node-k3s-high-availability-ha}

  * ** Haute disponibilité réelle à 2 nœuds : ** SafeKit offre une redondance complète avec seulement ** 2 nœuds ** , éliminant l'exigence de 3 nœuds pour le quorum _etcd_.
  * ** Zéro perte de données (RPO=0) : ** remplace le stockage par blocs à surcharge élevée par ** Réplication synchrone au niveau octet ** pour des performances SSD locales.
  * ** Protection flexible au niveau fichier : ** SafeKit effectue une réplication basée sur l'hôte au niveau fichier, totalement transparente pour l'application. Elle protège non seulement les bases de données, mais aussi tous les dossiers et données associés. Vous pouvez répliquer les dossiers existants exactement à leur emplacement d'installation, même sur le disque système ** ** .
  * ** IP virtuelle intégrée (VIP) : ** Gère nativement l’adresse IP du cluster au niveau du noyau, supprimant ainsi le besoin de configurations distinctes ** MetalLB ** .
  * ** Basculement et retour automatiques : ** déclenche une transition immédiate vers le nœud secondaire en cas de panne ; une fois que le nœud principal est sain, SafeKit exécute ** resynchronisation automatique des données ** sans intervention manuelle.
  * ** Surcharge ultra-faible : ** SafeKit fonctionne sans la lourde surcharge de gestion des pods de stockage (CSI/Longhorn) et des pods de réseau (CNI/MetalLB) requise par les piles standard, libérant ainsi de la RAM et du CPU essentiels pour vos applications.
  * ** Convivial pour ** généralistes informatiques : ** remplace ** ** ** scripts de déploiement automatisés, vous permettant de vous concentrer uniquement sur vos applications.


Schéma d'architecture ![ SafeKit pour une architecture K3s à haute disponibilité à 2 nœuds avec IP virtuelle intégrée, réplication en temps réel et basculement automatique. ](/wp-content/uploads/2026/02/safekit-mirror-k3s-1024.jpg "w:512")

 ** Haute disponibilité (HA) sans partage pour les clusters K3s à 2 nœuds **  


<a class="btn-quick-install" href="/fr/quick-install/safekit-quick-installation-guide-with-kubernetes/"> ⚡ Guide d'installation rapide du cluster HA Kubernetes > </a>
## Table des matières {#toc}

  * [ Comment le logiciel SafeKit implémente-t-il simplement un cluster haute disponibilité K3s Kubernetes ? ](#safekit-mirror-k3s-cluster)
  * [ Comment le groupe de touches SafeKit mirror fonctionne-t-il avec le K3S Kubernetes ? ](#safekit-mirror-cluster)
  * Limitations de haute disponibilité [ SafeKit ](#safekit-ha-limitations)
  * Comparaison [ : SafeKit vs. Stack K3 standard (MetalLB et Longhorn) ](#safekit-k3s-ha-comparison)
  * Guide vidéo [ : Configuration d'un cluster HA SafeKit Mirror ](#videoguide-safekit-mirror-cluster)
  * [ 🔍 SafeKit Hub de navigation haute disponibilité ](#hub)


## Comment le logiciel SafeKit implémente-t-il simplement un cluster haute disponibilité K3s Kubernetes ? {#safekit-mirror-k3s-cluster}

### Comment implémenter une haute disponibilité pour un cluster K3s à 2 nœuds Kubernetes? {#how-do-i-implement-high-availability-for-a-2-node-kubernetes-k3s-cluster}

Vous pouvez implémenter une haute disponibilité (HA) pour un cluster K3s Kubernetes à 2 nœuds à l'aide de **SafeKit k3s.safe mirror module** . Cette solution vous permet de déployer un environnement redondant sans avoir besoin de stockage NFS externe, d'une base de données de configuration externe dédiée ni d'expertise spécialisée Kubernetes .

### Pourquoi utiliser K3s pour l'informatique de périphérie et l'IoT ? {#why-use-k3s-for-edge-and-iot-computing}

[ K3s ](<https://k3s.io/>) est le moteur Kubernetes privilégié pour ** IoT et Edge computing ** car il s'agit d'une distribution légère et certifiée, conçue pour les environnements aux ressources limitées. Elle simplifie la charge opérationnelle du moteur Kubernetes standard tout en conservant une compatibilité totale.

### Quelles sont les principales caractéristiques des modules k3s.safe mirror? {#what-are-the-key-features-of-the-k3ssafe-mirror-module}

Le module k3s.safe fournit une pile HA complète pour K3s en implémentant :

  * ** Nœuds actifs doubles : ** Exécute simultanément 2 maîtres/agents K3s actifs pour héberger des pods.
  * Réplication de la base de données ** : Réplication en temps réel de la base de données de configuration ** entre MariaDB nœuds.
  * ** Stockage persistant : ** Réplication des volumes persistants via un provisionneur dynamique client NFS intégré (nfs-client).
  * Continuité du réseau ** : ** inclut une adresse IP virtuelle pour un accès client transparent.
  * ** Récupération automatisée : ** Prise en charge complète du basculement et du retour automatiques.


### Outre K3s, quelles applications et quels environnements SafeKit peut-il protéger ? {#beyond-k3s-which-applications-and-environments-can-safekit-protect}

SafeKit est une solution de haute disponibilité polyvalente ** compatible avec Windows et Linux ** , et qui étend considérablement ses fonctionnalités au-delà du cluster K3s mirror . Elle permet la réplication synchrone en temps réel ** ** et le basculement automatique pour une large gamme de charges de travail critiques, notamment :

  * Environnements virtuels et physiques ** : Machines virtuelles Hyper-V ou KVM complètes ** .
  * Orchestration de conteneurs ** : environnements ** , Docker Podman .
  * ** Données et services : ** Répertoires de fichiers individuels, services et diverses bases de données.
  * Infrastructure cloud ** : Haute disponibilité pour les applications cloud ** .


SafeKit fournit également ** `Farm` Clusters ** avec ** Network Load Balancer et Failover natifs ** pour les applications sans état comme ** Serveurs Web ** .

💡 [ Découvrez la liste complète des solutions HA prises en charge ici. ](</fr/solutions/>)

### Comment SafeKit atteint-il la haute disponibilité K3s ? {#safekit-k3s-architecture-table}

Architecture et logique de redondance ** pour un cluster K3s à 2 nœuds utilisant SafeKit **

Cluster K3s à 2 nœuds | SafeKit PRIM (Nœud principal) | SafeKit SECOND (Nœud secondaire)  
---|---|---  
Exécution de la charge de travail : | les services maître et agent K3s sont actifs, gérant l’orchestration du cluster et exécutant les pods. | les services maître et agent K3s restent actifs, assurant le traitement parallèle et la haute disponibilité.  
Stockage NFS et PV | • Héberge une adresse IP virtuelle et un port NFS <br> • Gère les partages NFS exportés actifs <br> • Stocke les volumes persistants (PV) K3s | Mise en miroir synchrone : SafeKit réplique tous les volumes persistants en temps réel pour garantir zéro perte de données.  
Base de données de configuration | • Hôte l'adresse IP virtuelle et le port MariaDB <br> • Gère la base de données de configuration K3s active | Réplication de la base de données : La base de données MariaDB est mise en miroir de manière synchrone, préservant l'état du cluster pour le basculement.  
  
Mécanisme de basculement automatique ** : ** En cas de défaillance du nœud principal, SafeKit migre automatiquement les adresses IP virtuelles et les services de stockage vers le nœud secondaire, assurant ainsi un service ininterrompu pour le cluster K3s.

## Comment le groupe de puces SafeKit mirror fonctionne-t-il avec le K3S Kubernetes ? {#safekit-mirror-cluster}

### Étape 1 : Réplication de fichiers au niveau octet dans un cluster Mirror {#step-1-byte-level-file-replication-in-a-mirror-cluster}

Cette étape illustre l'architecture à haute disponibilité entre le serveur 1 (PRIM ** ** le serveur 2 (SECOND ** ** Les deux serveurs exécutent les composants maître et agent K3s tels que définis dans le tableau d'architecture [ ](#safekit-k3s-architecture-table) .


Réplication de fichiers ![ au niveau octet dans un cluster Kubernetes K3s mirror ](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


Actuellement, l'adresse IP virtuelle (VIP) ** , ** stockage persistant NFS ** , le stockage persistant NFS ** , le stockage persistant NFS ** et les composants maîtres K3s MariaDB [ et ** sont actifs uniquement sur le serveur 1 (PRIM). Les composants maîtres K3s des deux nœuds se synchronisent en accédant à l'état du cluster via l'adresse IP virtuelle et le port MariaDB . SafeKit implémente la réplication synchrone ](</fr/best-practises/synchronous-replication-vs-asynchronous-replication/>) et MariaDB des fichiers NFS persistants ** , garantissant ainsi l'absence de perte de données (RPO = 0 ** en cas de panne.

Les nœuds maîtres K3s répartissent la charge de travail entre les deux nœuds (ou plus) en communiquant directement avec les agents K3s. Les clients externes se connectent au  
L'adresse IP virtuelle du cluster [ ](</fr/best-practises/how-a-virtual-ip-address-works/>) sur le nœud PRIM. À l'aide des mécanismes standard Kubernetes , le maître K3s relaie le trafic vers les pods répartis sur les nœuds. De même, les pods accèdent à leurs volumes persistants (PV) ** ** sur le serveur PRIM via l'adresse IP virtuelle et le port NFS.

### Étape 2 : Basculement automatique et continuité de service {#step-2-automatic-failover-and-service-continuity}

Lorsque le serveur ** 1 (PRIM) ** tombe en panne, le serveur ** 2 (SECOND) ** prend automatiquement le relais des opérations du cluster pour assurer la continuité.


Basculement ![ dans un cluster K3S Kubernetes mirror ](/wp-content/uploads/2023/02/safekit-stop-alone-300.png "w:300")


SafeKit détecte la panne et migre immédiatement l'adresse IP virtuelle ** du cluster ** vers le serveur 2. Il active ensuite les services NFS locaux ** MariaDB ** et ** ** . Grâce à la réplication synchrone effectuée à l'étape 1, toutes les bases de données MariaDB et les fichiers de volume persistant (PV) NFS sont déjà à jour sur le serveur 2, garantissant ainsi l'absence de perte de données.

L'état du cluster étant préservé, le maître K3s ** ** sur le serveur 2 poursuit son exécution. Il détecte la perte de l'agent du serveur 1 et reprogramme automatiquement les pods concernés sur les agents K3s actifs restants. Le temps total de basculement (RTO) correspond à la somme de l'intervalle de détection de panne (par défaut : 30 secondes) et du temps nécessaire à l'initialisation des composants K3s sur le nœud secondaire.

Pendant que le serveur 1 est hors ligne, les services MariaDB et NFS continuent de fonctionner sur le serveur 2, en écrivant les modifications uniquement localement.  


### Étape 3 : Retour à la normale et réintégration automatique {#step-3-failback-and-automatic-reintegration}

Le basculement ** ** se produit lorsque ** serveur 1 est redémarré après la résolution du problème initial. SafeKit resynchronise automatiquement les fichiers MariaDB et NFS, en mettant à jour uniquement les données modifiées sur le serveur 2 pendant l'indisponibilité. Ce processus de réintégration est ** non perturbateur ; les composants maître et agent de K3s continuent de fonctionner sur le serveur 2 sans interruption. 


![ Resynchronisation automatique et restauration en cas de panne dans un cluster K3s mirror ](/wp-content/uploads/2023/02/safekit-resynchro-alone-300.png "w:300")

 

SafeKit optimise le temps de récupération en fonction de la manière dont le serveur a été arrêté : 

  * Arrêt propre ** : ** Si SafeKit a été arrêté intentionnellement sur le serveur 1, seules les zones modifiées spécifiques dans les fichiers sont resynchronisées à l'aide des bitmaps de suivi des modifications ** ** . Ceci garantit une réintégration ultra-rapide. 
  * ** Plantage système (ex. : coupure de courant) : ** Si le serveur 1 a subi un arrêt brutal, les bitmaps de modification sont ignorés par mesure de sécurité. SafeKit resynchronise alors tous les fichiers dont l’horodatage de modification est plus récent que le dernier point de synchronisation établi, garantissant ainsi ** l’intégrité totale des données ** . 


### Étape 4 : Rétablissement de la haute disponibilité et de la répartition de charge {#step-4-restoring-high-availability-and-load-distribution}

Après la réintégration, le cluster revient au mode ** complet mirror ** , reflétant l'état décrit à l'étape 1. Le système est à nouveau dans un état de haute disponibilité : les services NFS ** MariaDB ** et ** ** restent actifs sur le serveur 2, tandis que SafeKit effectue une réplication en temps réel de toutes les mises à jour de fichiers vers le serveur 1. 


![ Retour au fonctionnement normal dans un groupe Kubernetes K3s mirror ](/wp-content/uploads/2023/02/safekit-second-prim-300.png "w:300")

 

Le maître K3s ** , ** agent K3s ** et l'agent K3s ** sont automatiquement redémarrés sur le serveur 1. Le planificateur Kubernetes reconnaît désormais le serveur 1 comme un nœud sain et peut commencer à reprogrammer les pods pour répartir la charge de travail sur les deux serveurs. 

Si l'administrateur préfère que les services MariaDB et NFS s'exécutent sur le serveur 1 (restaurant le rôle PRIM d'origine), un basculement ** ** peut être déclenché manuellement via la console Web à un moment opportun ou automatisé via les paramètres de configuration. 

### Comment configurer un cluster SafeKit Mirror {#safekit-mirror-cluster-configure}


Console Web ![ SafeKit : Tableau de bord de configuration de haute disponibilité affichant les réseaux de pulsation, la configuration des adresses IP virtuelles et la réplication d'annuaire en temps réel pour un cluster mirror . ](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


La console web ** SafeKit ** offre une interface intuitive pour orchestrer la haute disponibilité de vos applications critiques. En quelques étapes seulement, vous pouvez configurer un cluster ** SafeKit mirror ** afin de garantir la continuité de votre activité.

  * ** Basculement d'application (onglet Macros) : ** Définissez les services d'application spécifiques à redémarrer automatiquement en cas de panne.
  * ** Réseau(x) de pulsation : ** Chemin(s) de communication dédié(s) utilisé(s) par les nœuds du cluster pour surveiller en permanence l'état et la disponibilité des uns et des autres et synchroniser les décisions de basculement.
  * ** Gestion des adresses IP virtuelles : ** Configurer l’adresse IP virtuelle (VIP) pour une reconnexion client transparente après un basculement.
  * ** Réplication en temps réel : ** Sélectionnez les répertoires critiques pour la réplication synchrone au niveau octet basée sur l’hôte.
  * Vérificateurs ** : ** Surveillent l’état de l’application et déclenchent une récupération automatique en cas de défaillance du processus.


Le cluster SafeKit inclut un vérificateur de split-brain dédié pour résoudre les problèmes d'isolation réseau sans nécessiter une troisième machine témoin ni un réseau de pulsation supplémentaire. Découvrez-en plus sur la pulsation, le basculement et le quorum dans un cluster [ ou ](</fr/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) .

### Comment surveiller un cluster SafeKit mirror ? {#safekit-mirror-cluster-monitoring}


Console Web ![ SafeKit : Surveillance en temps réel d'un cluster mirror à 2 nœuds affichant les états PRIM et SECOND avec réplication de données active. ](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


La console de gestion ** SafeKit ** offre une vue unifiée de votre infrastructure à haute disponibilité. Elle permet aux administrateurs de surveiller l'état opérationnel ** ** du cluster et de suivre la synchronisation des données en temps réel.

Pour un cluster mirror à 2 nœuds, la console affiche clairement les rôles de chaque serveur :

  * ** PRIM (Primaire) : ** Le nœud actif exécutant actuellement l’application et gérant l’adresse IP virtuelle. Il effectue les écritures sur le stockage local et la réplication en temps réel vers le nœud secondaire.
  * ** SECOND (Secondaire) : ** Le nœud de secours reçoit des mises à jour synchrones au niveau octet. Il est prêt à prendre le relais instantanément en cas de défaillance du nœud principal.
  * ** SEUL État : ** Vous alerte visuellement lorsque le cluster fonctionne sur un seul nœud (par exemple, pendant la maintenance ou après une panne), indiquant que la redondance est temporairement perdue.
  * ** Progression de la resynchronisation : ** Lorsqu’un nœud défaillant est récupéré, son état devient orange pendant la réintégration des données en arrière-plan, garantissant l’absence d’interruption de service pendant la phase de « retour à la normale ».


Au-delà des simples icônes d'état, l'interface fournit une orchestration de basculement en un clic ** ** , vous permettant de réaffecter manuellement le rôle principal pour la maintenance planifiée tout en assurant une disponibilité continue pour l'activité de l'utilisateur.


{{%  insert-safekit-usage-fr  %}}
 

## Comparaison : SafeKit vs. Stack K3s standard (MetalLB et Longhorn) {#safekit-k3s-ha-comparison}

**Comparaison: SafeKit vs. Logiciel libre standard (MetalLB + Longhorn)**

Capacité | SafeKit ( K3s.safe ) | MetalLB + Longhorn (Standard K8s)  
---|---|---  
Architecture | Tout-en-un : Réseau, réplication et basculement intégrés dans un seul package. | Pile DIY (à faire soi-même) : Plusieurs packages indépendants sont requis (CNI, CSI, LoadBalancer).  
Efficacité matérielle | Haute disponibilité pure à 2 nœuds : redondance complète sans nœud « témoin » ou arbitre. | Minimum de 3 nœuds : nécessite généralement un nombre impair de nœuds pour le quorum Etcd et la sécurité du stockage.  
Réseau (VIP) | Natif : IP virtuelle gérée au niveau du système d’exploitation ; transparente pour K3s. | Complexe : Nécessite l’installation de MetalLB avec une configuration L2 ou BGP utilisant des modules haut-parleurs dédiés qui consomment du CPU/RAM sur chaque nœud.  
Configuration requise pour le stockage : | Synchrone au niveau octet : Réplication de fichiers en temps réel des répertoires existants ; fonctionne sur les disques système standard ; réplication de fichiers au niveau octet avec une charge CPU/réseau minimale. | Stockage par blocs : Stockage par blocs distribué (Longhorn) utilisant des modules de stockage dédiés ; consommation de ressources plus élevée.  
Intelligence de basculement | Stabilité indépendante : SafeKit fonctionne en dehors de l’environnement d’exécution des conteneurs. Il surveille directement le système d’exploitation et le matériel, garantissant le basculement même si le plan de contrôle ou le moteur de conteneurs Kubernetes se bloque. Dépendance circulaire | : La logique de basculement est hébergée _à l’intérieur_ des pods qu’elle est censée protéger. Si le système d’exploitation hôte ou le moteur K3s se bloque, les pods de gestion (MetalLB/Longhorn) se bloquent également, ce qui nécessite souvent une intervention manuelle pour débloquer la situation.  
Administration simplifiée | : Gestion via une console web unique ; aucune expertise Kubernetes requise. Administration spécialisée | : Nécessite une connaissance approfondie de YAML, Helm et des contrôleurs internes de Kubernetes.  
  
En résumé, ** ** pile DIY standard SafeKit MetalLB + Longhorn) offre une modularité aux Kubernetes , elle crée une dépendance ** où les outils de stockage et de réseau sont ** aux mêmes pannes de nœuds qu'ils sont censés gérer. Cette solution rompt ce cercle ** en fonctionnant comme une couche d'infrastructure indépendante ; elle fournit une solution HA à deux nœuds plus robuste et indépendante du matériel ** qui reste opérationnelle même si le moteur ou le système d'exploitation Kubernetes se bloque. Cela garantit une récupération automatique et l'intégrité des données sans la surcharge de ressources importante, le quorum obligatoire de trois nœuds ni la complexité de configuration requis par les superpositions traditionnelles de stockage par blocs distribué et de réseau.

## Guide vidéo : Configuration d’un cluster HA SafeKit mirror {#videoguide-safekit-mirror-cluster}

### Vidéo SafeKit : Clustering au niveau applicatif (8:47) {#demo-mirror-ha-cluster}

Cette vidéo, bien qu'illustrant la haute disponibilité de SafeKit pour Microsoft SQL Server , offre un excellent aperçu de la manière dont la solution sécurise les environnements K3s. SafeKit fonctionne de manière identique pour toute autre base de données ou application critique.

### Vidéos marquantes {#video-highlights}

  1. 🎬 [ 2 nœuds avec SQL Server ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. 🎬 [ Configurer le cluster et le module mirror.safe ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. 🎬 [ Démarrage et test de la réplication SQL, de la migration et du basculement en cas de panne ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)


&amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 


{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}