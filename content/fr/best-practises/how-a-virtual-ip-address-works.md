---
title: "Comment fonctionne une adresse IP virtuelle (VIP) dans un cluster à haute disponibilité ?"
canonical: "https://safekit.eviden.com/fr/best-practises/how-a-virtual-ip-address-works/"
description: "Découvrez comment SafeKit utilise des adresses IP virtuelles (VIP) logicielles pour garantir une disponibilité 24h/24 et 7j/7. Apprenez-en davantage sur le basculement automatique via ARP gratuit et découvrez pourquoi cette solution est plus performante que la redirection DNS pour assurer la continuité d'activité sur Windows et Linux ."
category: "best-practises"
lang: "fr"
topics: "Qu'est-ce qu'une adresse IP virtuelle dans un cluster haute disponibilité ? Implémentation d'une adresse IP virtuelle dans SafeKit , Sommaire, Fonctionnement d'une adresse IP virtuelle (VIP) lors d'un basculement au sein d'un même sous-réseau (cluster Mirror ), Fonctionnement d'une adresse IP virtuelle (VIP) entre différents sous-réseaux (cluster Mirror ), Fonctionnement d'une adresse IP virtuelle à charge équilibrée au sein d'un même sous-réseau Farm (cluster Farm ), Fonctionnement d'une adresse IP virtuelle à charge équilibrée entre différents sous-réseaux (cluster Farm ), IP virtuelle vs. redirection DNS : pourquoi le basculement DNS échoue souvent, Comparaison : implémentation d'une adresse IP virtuelle, latence et transparence des applications, Configuration d'une adresse IP virtuelle pour l'équilibrage de charge réseau et la haute disponibilité, Foire aux questions sur l'adresse IP virtuelle (VIP), 🔍 Centre de navigation haute disponibilité SafeKit"
---

# Comment fonctionne une adresse IP virtuelle (VIP) dans un cluster à haute disponibilité ? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## Qu'est-ce qu'une adresse IP virtuelle dans un cluster à haute disponibilité ? {#virtual-ip-definition}

  * **Définition :** Une **adresse IP virtuelle (VIP)** est une adresse réseau flottante utilisée dans les clusters à haute disponibilité [ ](</>) pour garantir un accès continu aux applications. Contrairement aux adresses IP standard, une VIP n’est pas liée à une interface matérielle physique spécifique, mais alterne entre les nœuds du cluster afin de maintenir un point d’entrée unique et persistant pour les clients.
  * **Aucun matériel requis :** SafeKit gère le VIP au niveau logiciel en utilisant **Gratuitous ARP (GARP)** , éliminant le besoin d'équilibreurs de charge externes dans les environnements de même sous-réseau.
  * **Transparence de l'application :** En se liant à une adresse IP virtuelle locale, les applications restent inconscientes des événements de basculement, préservant ainsi les adresses IP sources des clients et les configurations de sécurité existantes.
  * **Reprise après sinistre :** L’utilisation d’un **réseau local étendu** permet d’utiliser la même adresse IP virtuelle (VIP) dans plusieurs centres de données distants, simplifiant ainsi le basculement d’un site à l’autre par rapport aux réacheminements DNS complexes et aux délais de mise en cache TTL.


## Implémentation d'IP virtuelle dans SafeKit {#safekit-vip-implementation}

  * Clusters **Mirror :** dispose d’une adresse IP flottante active uniquement sur le serveur principal pour faciliter la réplication en temps réel et le basculement.
  * Clusters **<span class="notranslate farm-term" translate="no">Farm</span> :** Permet l’équilibrage de charge du réseau en maintenant le VIP sur tous les nœuds simultanément.


Avantage clé de **:** En utilisant **Gratuitous ARP (Address Resolution Protocol)** ou **MAC Address Takeover** , le VIP permet un basculement d'application transparent sans reconfiguration manuelle du client, garantissant une continuité d'activité 24h/24 et 7j/7.

  * **Cloud et multi-sous-réseau :** Géré via des contrôles d'intégrité d'équilibreur de charge externe ( AWS , Azure , GCP ) pour rediriger le trafic à travers différents sous-réseaux.


![ Diagramme comparatif du comportement des adresses IP virtuelles (VIP) dans Evidian. SafeKit : Mirror Clusters présentant une adresse IP flottante sur le nœud actif vs. Farm Clusters présentant une répartition de charge réseau sur tous les nœuds. ](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

Stratégies d'implémentation d'adresses IP virtuelles **pour les clusters Mirror et <span class="notranslate farm-term" translate="no">Farm</span> dans SafeKit** .


{{%  insert-safekit-4-buttons-fr  %}}
 

## Table des matières {#table-of-contents}

  * [ Fonctionnement d'une adresse IP virtuelle (VIP) lors d'un basculement sur le même sous-réseau (cluster Mirror ) ](#virtual-ip-same-subnet-failover)
  * [ Fonctionnement d'une adresse IP virtuelle (VIP) sur différents sous-réseaux (Cluster Mirror ) ](#virtual-ip-different-subnets-failover)
  * [ Fonctionnement d'une adresse IP virtuelle à charge équilibrée dans un même sous-réseau <span class="notranslate farm-term" translate="no">Farm</span> (Cluster <span class="notranslate farm-term" translate="no">Farm</span> ) ](#vip-load-balancing-same-subnet)
  * [ Fonctionnement d'une adresse IP virtuelle à charge équilibrée sur différents sous-réseaux (cluster <span class="notranslate farm-term" translate="no">Farm</span> ) ](#vip-load-balancing-different-subnets)
  * [ Adresse IP virtuelle vs. redirection DNS : pourquoi le basculement DNS échoue souvent ? ](#virtual-ip-vs-dns-redirection-failover)
  * Comparaison [ : Implémentation IP virtuelle, latence et transparence des applications ](#vip-vs-dns-comparison)
  * [ Configuration d'une adresse IP virtuelle pour l'équilibrage de charge réseau et la haute disponibilité ](#virtual-ip-configuration-load-balancing-ha)
  * Foire aux questions sur les adresses IP virtuelles (VIP) [ ](#virtual-ip-faq)
  * [ 🔍 SafeKit Hub de navigation haute disponibilité ](#hub)


## Fonctionnement d'une adresse IP virtuelle (VIP) lors d'un basculement sur le même sous-réseau (cluster Mirror ) {#virtual-ip-same-subnet-failover}

### Basculement automatique et réacheminement réseau dans un sous-réseau local {#automated-failover--network-rerouting-in-a-local-subnet}

Pour les organisations exigeant une continuité d'activité sans faille au sein d'une infrastructure locale, la haute disponibilité logicielle **SafeKit** pour les clusters de réseaux locaux offre une solution robuste et automatisée pour la gestion des adresses IP virtuelles et le basculement d'applications en temps réel. 

### Cluster local Mirror : Basculement transparent à 2 nœuds Windows ou Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


Mécanisme de basculement d'adresse IP virtuelle (VIP) ![ SafeKit entre deux serveurs du même sous-réseau ](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

 Dans un cluster standard où SafeKit deux nœuds résident dans le **sous SafeKit réseau local, mirror haute disponibilité est assurée par une adresse IP virtuelle (** ) **. Contrairement aux solutions matérielles, cette** est gérée directement au SafeKit de la pile réseau du système d'exploitation. Elle sert de point d'entrée logique persistant pour les clients, superposée aux adresses IP physiques uniques des serveurs 1 et 2 via **aliasage** adresses IP. 

#### SafeKit : Aliasage IP avancé et prise en charge de plusieurs VIP {#safekits-advanced-ip-aliasing--multiple-vip-support}

L'un des principaux avantages de la **solution SafeKit** réside dans sa flexibilité de gestion des identités réseau. L'adresse IP virtuelle (VIP) est une troisième adresse IP « flottante » qui circule entre les nœuds. La solution SafeKit est notamment capable de gérer **plusieurs adresses IP virtuelles** au sein d'un même cluster. Celles-ci peuvent être attribuées à la même carte Ethernet principale ou réparties sur différentes cartes physiques, permettant ainsi des configurations complexes où différents services sont associés à des identités virtuelles spécifiques. 

#### Mécanisme de basculement : ARP gratuit (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

SafeKit garantit l'absence d'intervention manuelle en cas de panne matérielle. En fonctionnement normal, l'adresse IP **VIP) est associée à l'adresse MAC (mac1) du serveur 1** ). Si SafeKit détecte une interruption de service sur le serveur 1, il exécute une procédure de récupération en deux étapes : 

  * Récupération d'application **:** SafeKit redémarre automatiquement les services d'application critiques sur le serveur 2.
  * **Réacheminement réseau :** SafeKit diffuse instantanément un message **Gratuitous ARP (GARP)** . Ceci force la mise à jour des caches ARP de tous les commutateurs réseau et clients connectés, en réattribuant l'adresse IP **(VIP) à l'adresse MAC (mac2) du serveur 2 (** ).


#### Centres de données distants et VLAN étendus {#remote-data-centers--extended-vlans}

Bien que généralement utilisé pour les clusters locaux, **l'algorithme SafeKit , qui utilise un même sous-réseau,** est privilégié pour **la reprise après sinistre (PRA)** sur des sites distants connectés via un **réseau local étendu (LAN) ou un VLAN étendu** . Cette architecture étendue permet de maintenir un seul sous-réseau malgré les distances géographiques, simplifiant considérablement la topologie du réseau et évitant la surcharge liée aux protocoles de routage complexes. 

**⚠️ Remarque :** Le reroutage de couche 2 via ARP gratuit est la **solution la plus transparente** pour les applications. Contrairement au reroutage de couche 3 avec un équilibreur de charge, il évite **la traduction d’adresses IP source/destination (SNAT/DNAT)** . L’application reçoit le trafic directement avec l’adresse IP du client d’origine, et l’adresse IP virtuelle est configurée localement. **De nombreuses applications préfèrent** voir l’adresse IP virtuelle localement et recevoir directement l’adresse IP du client d’origine. Sans cette transparence, elles **pourraient ne pas fonctionner comme prévu** en raison de la complexité des traductions réseau.

## Fonctionnement d'une adresse IP virtuelle (VIP) sur différents sous-réseaux (cluster Mirror ) {#virtual-ip-different-subnets-failover}

### Orchestration du trafic prête pour le cloud via l'intégration d'un équilibreur de charge {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

En tirant parti de l'infrastructure réseau externe, **la haute disponibilité définie par logiciel SafeKit pour les clusters multi-AZ et cloud** s'intègre de manière transparente avec un **équilibreur de charge réseau** pour orchestrer le basculement du trafic sur des sous-réseaux et des zones de disponibilité distincts. 

### Clusters Mirror inter-sous-réseaux : Implémentation Windows et Linux {#cross-subnet-mirror-clusters-windows--linux-implementation}


![ Schéma d'un basculement d'adresse IP virtuelle utilisant un équilibreur de charge sur deux sous-réseaux différents ](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

 Routage du trafic multi-sous-réseaux via des contrôles d'intégrité de l'équilibreur de charge : lorsque les nœuds d'un cluster résident dans **des sous-réseaux différents** , le basculement standard basé sur ARP est impossible. Dans ce cas, l' **adresse IP virtuelle (VIP)** est hébergée sur un **équilibreur de charge (LB)** plutôt que sur la carte Ethernet du serveur. L'équilibreur de charge fait office de passerelle, dirigeant le trafic vers les adresses IP physiques des nœuds principal et secondaire en fonction de leur disponibilité en temps réel. 

#### Routage dynamique via les contrôles d'intégrité SafeKit {#dynamic-routing-via-safekit-health-checks}

SafeKit gère le routage du trafic en fournissant une **URL de vérification d'état** dédiée sur chaque nœud. L'équilibreur de charge interroge ces URL pour déterminer l'état du cluster : 

  * Nœud principal **(PRIM) :** . Le contrôle d'intégrité renvoie `HTTP 200 OK` . L'équilibreur de charge dirige tout le trafic vers ce nœud.
  * Nœud secondaire **(SECOND) :** . Le contrôle d'intégrité renvoie `HTTP 404 NOT FOUND` . L'équilibreur de charge n'envoie aucun trafic à ce nœud.

Lors d'un **basculement** , SafeKit inverse instantanément les réponses de contrôle d'intégrité, ce qui déclenche le rééquilibrage de charge pour rediriger le trafic client vers le nouveau serveur principal. 

> **⚠️ Remarque :** SafeKit fournit la logique de contrôle d’intégrité ; l’équilibreur de charge physique ou virtuel doit être fourni par votre infrastructure réseau.

#### Intégration au cloud : AWS , Azure , et GCP {#cloud-integration-aws-azure-and-gcp}

Ce modèle « Équilibreur de charge + Contrôle d'intégrité » est la norme du secteur pour **la haute disponibilité du cloud** . Il est essentiel pour la mise en œuvre SafeKit dans des environnements tels que : 

  * 💡 [ **Amazon AWS** ](</fr/solutions/aws-high-availability-cluster-synchronous-replication-failover/>) ( AWS Équilibreur de charge réseau)
  * 💡 [ **Microsoft Azure** ](</fr/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) ( Azure Équilibreur de charge)
  * 💡 [ **Google Cloud ( GCP )** ](</fr/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>) (Équilibrage de charge Google Cloud)


#### Considérations relatives au réseau : équilibreur de charge vs. réseau local étendu {#network-considerations-load-balancer-vs-extended-lan}

Si l'utilisation d'un équilibreur de charge n'est pas souhaitée, consultez votre équipe réseau concernant la mise en place d'un **réseau local étendu (extension de VLAN)** entre les sous-réseaux. Cela vous permettra de revenir au modèle VIP plus simple « même sous-réseau ». 

**⚠️ Remarque :** Si vous optez pour un équilibreur de charge, assurez-vous que votre application est compatible avec **la traduction d'adresses IP source/destination (SNAT/DNAT)** . Avec un équilibreur de charge, l'application risque de perdre l'identité de l'utilisateur d'origine ou de ne pas démarrer, car elle ne détecte plus l'adresse IP virtuelle configurée directement sur son interface réseau.

## Fonctionnement d'une adresse IP virtuelle à charge équilibrée dans un cluster <span class="notranslate farm-term" translate="no">Farm</span> ( <span class="notranslate farm-term" translate="no">Farm</span> ) sur le même sous-réseau {#vip-load-balancing-same-subnet}

### Performances évolutives : équilibrage de charge et redondance au niveau du noyau {#scalable-performance-kernel-level-load-balancing--redundancy}

Pour les environnements à trafic élevé, le guide d'architecture **: Haute disponibilité évolutive avec des clusters <span class="notranslate farm-term" translate="no">Farm</span> multi-nœuds** explique comment SafeKit répartit les charges de travail sur plusieurs serveurs actifs tout en maintenant une redondance totale. 

### Architecture du cluster <span class="notranslate farm-term" translate="no">Farm</span> : répartition de charge entre les nœuds Windows ou Linux {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


Diagramme ![ d'une adresse IP virtuelle (VIP) à charge équilibrée au sein d'un cluster farm ](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256") appartenant au même sous-réseau.

 Traitement distribué du trafic via filtrage noyau. Dans un **cluster <span class="notranslate farm-term" translate="no">farm</span> à répartition de charge** , une adresse IP virtuelle (VIP) est utilisée pour répartir simultanément les requêtes client sur plusieurs serveurs. Bien que cet exemple comporte deux nœuds, l'architecture est évolutive et peut prendre en charge des fermes de serveurs plus importantes. Dans une configuration au sein d'un même sous-réseau, la VIP est configurée sur la carte Ethernet de **chaque serveur** du cluster via un alias d'adresse IP. 

#### Distribution du trafic : Filtre au niveau du noyau {#traffic-distribution-the-kernel-level-filter}

Contrairement à un cluster de basculement simple, un cluster <span class="notranslate farm-term" translate="no">farm</span> gère le trafic via un filtre spécialisé **au niveau du noyau** . Le processus fonctionne comme suit : 

  * Mappage ARP **:** Dans les caches ARP des clients, le VIP est initialement associé à une seule adresse matérielle (par exemple, `mac1` du serveur 1).
  * **Division des paquets :** lorsque le serveur 1 reçoit le trafic, le filtre noyau SafeKit analyse l'identité des paquets entrants (en fonction de **l'adresse IP du client** ou **du port TCP** ).
  * **Partage de charge :** Le filtre détermine quels paquets doivent être traités localement et lesquels doivent être redirigés vers d’autres nœuds (par exemple, le serveur 2) pour traitement, assurant ainsi une charge de travail équilibrée.


#### Basculement et réacheminement avec ARP gratuit {#failover-and-rerouting-with-gratuitous-arp}

En cas de défaillance du nœud principal (Serveur 1), le cluster maintient sa disponibilité grâce à **Gratuitous ARP (GARP)** . SafeKit diffuse un message GARP pour mettre à jour les caches ARP des clients auprès de `mac2` du Serveur 2. Ainsi, même en cas de défaillance du point d'entrée principal, les clients sont immédiatement redirigés vers les nœuds restants farm . 

#### Déploiement sur des sites distants {#deployment-in-remote-sites}

Pour les organisations exploitant **des centres de données distants** , cet algorithme d'équilibrage de charge reste fonctionnel à condition que les sites soient reliés par un **réseau local étendu (LAN) ou un réseau local virtuel (VLAN)** . Ceci crée un environnement virtuel de « même sous-réseau », qui constitue la configuration la plus efficace pour les clusters <span class="notranslate farm-term" translate="no">farm</span> géographiquement distribués. 

## Fonctionnement d'une adresse IP virtuelle à charge équilibrée sur différents sous-réseaux (cluster <span class="notranslate farm-term" translate="no">Farm</span> ) {#vip-load-balancing-different-subnets}

### Mise à l'échelle multizone : orchestration du trafic sur les sous-réseaux cloud {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

Guide d'architecture **: Mise à l'échelle des clusters <span class="notranslate farm-term" translate="no">Farm</span> dans des environnements multizones et cloud.** fournit le plan directeur pour la distribution des charges de travail d'application sur des zones de disponibilité et des sous-réseaux distincts. 

### Clusters <span class="notranslate farm-term" translate="no">Farm</span> inter-sous-réseaux : Évolutivité multi-nœuds Windows et Linux {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


Diagramme ![ d'un cluster farm à charge équilibrée fonctionnant sur deux sous-réseaux différents ](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

 Distribution du trafic global via un équilibreur de charge externe : lorsque les nœuds <span class="notranslate farm-term" translate="no">farm</span> sont répartis sur **différents sous-réseaux** (cas fréquent dans les déploiements cloud multi-AZ), l’ **adresse IP virtuelle (VIP)** est gérée par un **équilibreur de charge externe (LB)** . Ce dernier héberge la VIP et dirige le trafic entrant vers les adresses IP physiques des serveurs situés dans leurs sous-réseaux respectifs. 

#### Règles intelligentes de routage du trafic et d'équilibrage de charge {#intelligent-traffic-routing--load-balancing-rules}

L'équilibreur de charge répartit les requêtes des clients en fonction de deux facteurs principaux : 

  * **Règles de distribution :** le trafic est réparti selon l’affinité de session ou des algorithmes d’équilibrage de charge (par exemple, en analysant **l’adresse IP du client** ou **le port TCP du client** ).
  * Disponibilité du nœud **: Le trafic** est uniquement acheminé vers les nœuds sains, comme déterminé par le contrôle d’intégrité SafeKit .


> **⚠️ Remarque :** SafeKit fournit la logique de contrôle d’intégrité ; l’équilibreur de charge physique ou virtuel doit être fourni par votre infrastructure réseau.

#### Mécanisme de contrôle de santé SafeKit {#safekit-health-check-mechanism}

SafeKit fournit une URL de vérification d'état **en temps réel** sur chaque serveur du <span class="notranslate farm-term" translate="no">farm</span> pour communiquer son état opérationnel à l'équilibreur de charge : 

  * **Nœud actif :** Le contrôle d'intégrité renvoie `HTTP 200 OK` . L'équilibreur de charge inclut ce serveur dans la rotation active.
  * **Nœud hors service/Basculement :** En cas de défaillance d'un serveur ou d'une application, SafeKit renvoie `HTTP 404 NOT FOUND` (ou le service devient inaccessible). L'équilibreur de charge cesse immédiatement d'envoyer du trafic vers le nœud défaillant.


#### Normes de déploiement cloud : AWS , Azure , GCP et {#cloud-deployment-standards-aws-azure-and-gcp}

Cette architecture constitue le modèle de base des clusters **Cloud <span class="notranslate farm-term" translate="no">Farm</span>** , garantissant que si un sous-réseau ou une zone entière est hors service, les nœuds restants continuent de gérer la charge. Elle est prise en charge nativement par : 

  * 💡 [ **Amazon AWS** ](</fr/solutions/aws-load-balancing-cluster-failover/>) ( AWS Équilibreur de charge réseau)
  * 💡 [ **Microsoft Azure** ](</fr/solutions/azure-load-balancing-cluster-failover/>) ( Azure Équilibreur de charge)
  * 💡 [ **Google Cloud ( GCP )** ](</fr/solutions/gcp-load-balancing-cluster-failover/>) (Équilibrage de charge Google Cloud)


## Adresse IP virtuelle vs. redirection DNS : pourquoi le basculement DNS échoue souvent ? {#virtual-ip-vs-dns-redirection-failover}

### Le piège de la propagation DNS : pourquoi les VIP sont plus performants que la redirection DNS {#the-dns-propagation-trap-why-vips-outperform-dns-redirection}

S'appuyer sur le DNS pour la reprise après incident crée souvent un **sentiment de sécurité dans les architectures à haute disponibilité** Bien que la modification d'un enregistrement DNS pour pointer vers un serveur de secours semble être une solution de récupération simple, elle introduit une variable critique : **latence** . Étant donné que la redirection basée sur le DNS repose sur un écosystème incontrôlé de résolveurs récursifs intermédiaires pour prendre en compte et propager la modification, elle est fondamentalement incompatible avec les exigences de « disponibilité totale » des services d'entreprise modernes. 

### Scénario technique : Résolution DNS et client « bloqué » {#the-technical-scenario-dns-resolution-and-the-stuck-client}

Dans une configuration réseau standard, un **nom virtuel** (le nom DNS) sert de point d'entrée lisible par l'utilisateur. Cependant, pour que les données puissent circuler sur le réseau, ce nom doit être résolu en une adresse **IP physique** spécifique. 

Diagramme ![ illustrant la résolution de noms DNS vers l'adresse IP physique 1 dans un cluster à haute disponibilité ](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 Résolution DNS et clients « bloqués » sur l'adresse IP physique 1 dans un cluster à haute disponibilité

#### État actuel : Résolution vers l’adresse IP physique 1 {#current-state-resolution-to-physical-ip-1}

Initialement, les clients **Client 1,** et **(Client 2,** interrogent le système DNS pour obtenir le nom virtuel. Le système renvoie l'adresse IP physique **(IP physique 1,** ). Les clients établissent ensuite une connexion réseau directe (socket) à cette adresse matérielle spécifique. 

#### Le défi du basculement : redirection vers l’adresse IP physique 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

Si le serveur à l'adresse IP physique 1 tombe en panne, un administrateur met à jour l'enregistrement DNS pour pointer vers **adresse IP physique 2 :** ). Pour que le redirection des clients réussisse, une séquence précise doit se produire : 

  * La **durée de vie (TTL)** doit expirer sur tous les résolveurs intermédiaires FAI et d'entreprise.
  * Le cache DNS local des clients 1 et 2 doit être vidé.
  * L'application doit fermer sa connexion existante et initier une nouvelle requête DNS.

Si l'une de ces étapes est manquée, les clients **1 et 2 resteront « bloqués »** en essayant de communiquer avec l'adresse IP physique 1 inactive, ce qui entraînera une interruption de service malgré la mise à jour des enregistrements DNS. 

### Les deux « boîtes noires » de la redirection DNS {#the-two-black-boxes-of-dns-redirection}

  * **Mise en cache récursive :** De nombreux fournisseurs d’accès Internet (FAI) et résolveurs DNS d’entreprise ignorent les paramètres TTL faibles pour réduire le trafic, mettant souvent en cache l’« ancienne » adresse IP physique 1 pendant des minutes, voire des heures, au-delà de l’expiration demandée.
  * Persistance des applications **: Les applications modernes (telles que les microservices Java ou les navigateurs web) n’effectuent généralement une requête DNS qu’une seule fois** au démarrage. Même si l’enregistrement DNS est mis à jour vers l’adresse IP physique 2, l’application continue d’utiliser l’adresse IP initiale stockée dans sa mémoire interne.


### Conclusion {#conclusion}

La redirection DNS est une solution incohérente pour une haute disponibilité. Pour un basculement instantané au sein d'un environnement local ou régional, seule une **adresse IP virtuelle (VIP)** définie par logiciel garantit une continuité de service sans interruption. 

## Comparaison : Implémentation d’adresses IP virtuelles, latence et transparence des applications {#vip-vs-dns-comparison}

**Comparaison technique des méthodes de redirection d'adresse IP virtuelle (VIP) et du reroutage DNS pour la haute disponibilité et la reprise après sinistre.**

Environnement et cas d'utilisation : | Type de haute disponibilité ; | Mécanisme de redirection ; | Latence réseau ; | Transparence des applications et localité IP  
---|---|---|---|---  
Primaire/Secours (Haute disponibilité) | Mirror Cluster | Prise de contrôle ARP/MAC gratuite | Très faible : Temps de détection et d’envoi de la diffusion GARP | Transparence totale : L’adresse IP virtuelle est locale sur le nœud actif. L’adresse IP du client est préservée.  
Équilibrage de charge (actif/actif) | <span class="notranslate farm-term" translate="no">Farm</span> Cluster | Filtre réseau au niveau du noyau / GARP | Très faible : Temps de détection et de reconfiguration des filtres réseau | Transparence totale : L’adresse IP virtuelle est locale sur tous les nœuds. L’adresse IP du client est préservée.  
Même sous-réseau / LAN étendu (extension de VLAN) | Reprise après sinistre (centres de données distants) | Aliasage IP standard / GARP | Faible : Dépend du VLAN étendu RTT (temps d'aller-retour) | Transparence totale : L'adresse IP virtuelle est locale sur les nœuds. L'adresse IP du client est préservée.  
Sous-réseaux différents | Reprise après sinistre (centres de données distants / Cloud) | Équilibreur de charge externe | Modéré : Latence de basculement plus élevée en raison des intervalles de vérification de l'état de l'équilibreur de charge | ⚠️ Transparence partielle : Utilise SNAT/DNAT. L'adresse IP virtuelle est **et non** locale sur les nœuds. L'adresse IP du client est **et non** préservée. L'application doit la prendre en charge.  
Réacheminement DNS : Pas de VIP | Reprise après sinistre (centres de données distants) | Mise à jour de l’enregistrement DNS (nom/adresse IP physique) | Élevé/Imprévisible : Dépend du TTL (Time To Live) du DNS et de la mise en cache DNS du client. | ⚠️ Non fiable : Le client doit résoudre à nouveau le DNS. Le plus souvent, les clients continuent d’utiliser l’adresse IP obsolète résolue au démarrage et ne sont pas réacheminés après un basculement.  
  
## Configuration d'une adresse IP virtuelle pour l'équilibrage de charge réseau et la haute disponibilité {#virtual-ip-configuration-load-balancing-ha}


{{%  insert-safekit-farm-video-fr  %}}
 

## Foire aux questions sur les adresses IP virtuelles (VIP) {#virtual-ip-faq}

### Adresse IP virtuelle (VIP) et réseau {#virtual-ip-vip--networking}

Qu’est-ce qu’une adresse IP virtuelle (VIP) et en quoi diffère-t-elle d’une adresse IP physique ?

Alors qu'une **adresse IP physique** est liée à une interface réseau spécifique, une **adresse IP virtuelle (VIP)** est une adresse « flottante », indépendante du matériel. Dans un cluster SafeKit , la VIP sert de point d'entrée persistant ; en cas de défaillance du serveur principal, la VIP migre automatiquement vers un nœud secondaire opérationnel, garantissant ainsi l'absence de reconfiguration côté client.

Ai-je besoin d'un équilibreur de charge matériel pour utiliser une adresse IP virtuelle ?

**Le logiciel de haute disponibilité n° SafeKit** gère l'adresse IP virtuelle au niveau logiciel. Dans les architectures à sous-réseau identique, il utilise **l'aliasage d'adresses IP** et **le protocole GARP (Gratuitous ARP)** pour rediriger le trafic. Ceci permet de s'affranchir des coûts et de la complexité liés aux équilibreurs de charge matériels externes ou aux serveurs proxy dédiés.

Qu’est-ce que l’ARP gratuite (GARP) et pourquoi est-elle utilisée ?

**GARP (Gratuitous ARP)** est une diffusion réseau qui met à jour les tables ARP des commutateurs et routeurs réseau. Lors d'un basculement, le nouveau serveur principal envoie un paquet GARP pour annoncer que l' **adresse IP virtuelle** est désormais associée à son adresse MAC, ce qui provoque un réacheminement immédiat du trafic sur le réseau.

Puis-je associer un nom DNS à une adresse IP virtuelle ?

**Oui.** Vous pouvez associer un nom DNS à une adresse IP virtuelle (VIP) en créant un enregistrement A standard. L'avantage principal est que la redirection est gérée au **niveau de la VIP** (via ARP ou redirection réseau) et **non au niveau DNS** . Cela garantit **la transparence des applications** en évitant les délais liés à la propagation DNS et à l'expiration du TTL.

### Architectures cloud et avancées {#cloud--advanced-architectures}

Comment fonctionne une adresse IP virtuelle dans le cloud ( AWS , Azure , GCP ) ?

Dans les environnements cloud où **couche 2 (ARP) est restreinte, SafeKit s'intègre aux équilibreurs de charge cloud** ( AWS , LB ou Google GCLB). Azure fournit une URL **vérification d'état SafeKit que la plateforme** afin d'acheminer le trafic vers le nœud actif via SNAT/DNAT.

Un réseau local étendu (LAN) est-il préférable à un équilibreur de charge pour la reprise après sinistre ?

**Oui** . Pour les centres de données distants, un **réseau local étendu (VLAN étendu)** est souvent préférable car il garantit **la transparence des applications** entre les sites. En conservant la **même adresse IP virtuelle** , l'application et ses clients continuent de communiquer avec la même identité, ce qui rend la transition entre les centres de données totalement transparente.

Quelles sont les limites du reroutage DNS par rapport à l'adresse IP virtuelle ?

**Le réacheminement DNS** est limité par **la durée de vie (TTL)** et la mise en cache côté client, ce qui peut retarder la récupération pendant des heures. Un inconvénient majeur est que **les clients qui ne résolvent pas leur nom DNS restent bloqués** en tentant de se connecter au serveur défaillant. À l'inverse, une **adresse IP virtuelle** assure un basculement instantané de couche 2 en réacheminant tout le trafic immédiatement, garantissant ainsi la connectivité quel que soit l'état du cache DNS côté client.

### Transparence et sécurité {#transparency--security}

Pourquoi une adresse IP virtuelle locale est-elle importante pour la transparence des applications ?

Une **adresse IP virtuelle (VIP)** locale garantit **la transparence des applications** en permettant au logiciel de se lier à une VIP persistante. SafeKit gère la redirection au **niveau du noyau** , empêchant ainsi l'application de subir les basculements de cluster, contrairement aux solutions DNAT où l'adresse IP liée change.

L'utilisation d'une adresse IP virtuelle permet-elle de préserver l'adresse IP d'origine du client ?

Oui. SafeKit évite la traduction d'adresse réseau source (SNAT). Comme l'adresse IP virtuelle (VIP) est locale au serveur actif, l'application reçoit l' **adresse IP du client d'origine** , ce qui est essentiel pour l'audit de sécurité, la persistance de session et la journalisation réglementaire.


{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}