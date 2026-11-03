---
title: "Comment fonctionne une adresse IP virtuelle (VIP) dans un cluster à haute disponibilité ?"
canonical: "https://safekit.eviden.com/fr/best-practises/how-a-virtual-ip-address-works/"
description: "Découvrez comment SafeKit déplace une adresse IP virtuelle (VIP) lors d'un basculement : ARP gratuit dans le même sous-réseau, ou répartiteur de charge, CLI cloud ou BGP entre sous-réseaux. Pourquoi une VIP locale est importante."
category: "best-practises"
lang: "fr"
topics: "Qu'est-ce qu'une adresse IP virtuelle dans un cluster haute disponibilité ?, Implémentation d'une adresse IP virtuelle dans SafeKit, Sommaire, Fonctionnement d'une adresse IP virtuelle (VIP) lors d'un basculement au sein d'un même sous-réseau (cluster Mirror), Fonctionnement d'une adresse IP virtuelle (VIP) entre différents sous-réseaux avec un répartiteur de charge (cluster Mirror), Fonctionnement d'une adresse IP virtuelle (VIP) entre différents sous-réseaux avec les CLI d'un fournisseur cloud (cluster Mirror), Fonctionnement d'une adresse IP virtuelle (VIP) entre différents sous-réseaux avec BGP (cluster Mirror), Fonctionnement d'une adresse IP virtuelle avec équilibrage de charge dans une Farm sur un même sous-réseau (cluster Farm), Fonctionnement d'une adresse IP virtuelle avec équilibrage de charge entre différents sous-réseaux (cluster Farm), Adresse IP virtuelle vs redirection DNS : pourquoi le basculement DNS échoue souvent, Comparaison de l'implémentation, de la latence et de la transparence applicative des adresses IP virtuelles, Configuration d'une adresse IP virtuelle pour l'équilibrage de charge réseau et la haute disponibilité, Foire aux questions sur l'adresse IP virtuelle (VIP), 🔍 Centre de navigation SafeKit sur la haute disponibilité"
---

# Comment fonctionne une adresse IP virtuelle (VIP) dans un cluster à haute disponibilité ? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## Qu'est-ce qu'une adresse IP virtuelle dans un cluster à haute disponibilité ? {#virtual-ip-definition}

Une **adresse IP virtuelle (VIP)** est l'adresse unique utilisée par les clients pour se connecter à une application dans un [cluster haute disponibilité](</fr/>). La VIP n'est liée à aucun serveur en particulier. Lors d'un basculement, elle passe au serveur qui exécute l'application. Les clients n'ont pas besoin de modifier leur configuration.

**Principe clé de SafeKit :** la VIP est **configurée localement sur le serveur** qui exécute l'application. Celle-ci démarre sur la VIP et reçoit l'adresse IP d'origine du client. C'est pourquoi de nombreuses applications fonctionnent avec SafeKit sans modification.

## Implémentation d'IP virtuelle dans SafeKit {#safekit-vip-implementation}

Cet article explique comment SafeKit déplace la VIP selon l'architecture réseau :

  * **Même sous-réseau ou LAN étendu (clusters Mirror et <span class="notranslate farm-term" translate="no">Farm</span>) :** SafeKit configure la VIP sur le serveur et envoie un **ARP gratuit (GARP)**. Aucun matériel externe n'est nécessaire. C'est la solution la plus transparente.
  * **Sous-réseaux différents avec un répartiteur de charge :** celui-ci utilise le **contrôle d'état** SafeKit pour envoyer le trafic au bon serveur. Conservez également la VIP configurée localement sur le serveur principal.
  * **Sous-réseaux différents avec les CLI des fournisseurs cloud :** le script SafeKit `start_prim` appelle la CLI cloud pour déplacer la VIP (script écrit par l'intégrateur).
  * **Sous-réseaux différents avec BGP :** le serveur principal annonce la VIP aux routeurs (script écrit par l'intégrateur).

L'article explique également pourquoi la **redirection DNS** n'est pas une alternative fiable à une VIP.

![Schéma comparant le comportement de l'adresse IP virtuelle (VIP) dans SafeKit : une IP flottante sur le nœud actif dans les clusters Mirror et la répartition du trafic sur tous les nœuds dans les clusters Farm.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Implémentation d'une adresse IP virtuelle dans les clusters Mirror et <span class="notranslate farm-term" translate="no">Farm</span> SafeKit.**


{{%  insert-safekit-4-buttons-fr  %}}
 

## Table des matières {#table-of-contents}

  * [Fonctionnement d'une adresse IP virtuelle (VIP) lors d'un basculement dans le même sous-réseau (cluster Mirror)](#virtual-ip-same-subnet-failover)
  * [Fonctionnement d'une adresse IP virtuelle (VIP) entre différents sous-réseaux avec un répartiteur de charge (cluster Mirror)](#virtual-ip-different-subnets-failover)
  * [Fonctionnement d'une adresse IP virtuelle (VIP) entre différents sous-réseaux avec les CLI des fournisseurs cloud (cluster Mirror)](#virtual-ip-cloud-cli-failover)
  * [Fonctionnement d'une adresse IP virtuelle (VIP) entre différents sous-réseaux avec BGP (cluster Mirror)](#virtual-ip-bgp-failover)
  * [Fonctionnement d'une adresse IP virtuelle à charge équilibrée dans une Farm sur le même sous-réseau (cluster Farm)](#vip-load-balancing-same-subnet)
  * [Fonctionnement d'une adresse IP virtuelle à charge équilibrée entre différents sous-réseaux (cluster Farm)](#vip-load-balancing-different-subnets)
  * [Adresse IP virtuelle vs redirection DNS : pourquoi le basculement DNS échoue souvent](#virtual-ip-vs-dns-redirection-failover)
  * [Comparaison de l'implémentation, de la latence et de la transparence applicative](#vip-vs-dns-comparison)
  * [Configuration d'une adresse IP virtuelle pour l'équilibrage de charge réseau et la haute disponibilité](#virtual-ip-configuration-load-balancing-ha)
  * [Foire aux questions sur l'adresse IP virtuelle (VIP)](#virtual-ip-faq)
  * [🔍 Centre de navigation SafeKit sur la haute disponibilité](#hub)


## Fonctionnement d'une adresse IP virtuelle (VIP) lors d'un basculement dans le même sous-réseau (cluster Mirror) {#virtual-ip-same-subnet-failover}

- [Test de l'adresse IP virtuelle principale/de secours dans un cluster miroir SafeKit](/fr/best-practises/test-primary-backup-vip-mirror/)

### Basculement automatique et reroutage réseau dans un sous-réseau local {#automated-failover--network-rerouting-in-a-local-subnet}

Sur un réseau local, **SafeKit pour les clusters de réseau local** gère automatiquement l'adresse IP virtuelle et le basculement de l'application.

### Cluster Mirror local : basculement à deux nœuds sous Windows ou Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}

![Mécanisme de basculement de l'adresse IP virtuelle (VIP) SafeKit entre deux serveurs dans le même sous-réseau](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

Dans un **cluster Mirror SafeKit**, les deux nœuds se trouvent dans le même sous-réseau. La haute disponibilité repose sur une **adresse IP virtuelle (VIP)**. SafeKit gère la VIP dans la pile réseau du système d'exploitation, sans matériel spécial. La VIP est ajoutée aux adresses IP physiques des serveurs 1 et 2 au moyen de l'**aliasage IP**. Les clients se connectent toujours à la VIP.

#### Aliasage IP et gestion de plusieurs VIP dans SafeKit {#safekits-advanced-ip-aliasing--multiple-vip-support}

La VIP est une troisième adresse IP qui passe d'un nœud à l'autre. SafeKit peut gérer **plusieurs adresses IP virtuelles** dans un même cluster. Elles peuvent être configurées sur la même carte réseau ou sur des cartes différentes, afin que chaque service dispose de sa propre VIP.

#### Mécanisme de basculement : ARP gratuit (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

Le basculement ne nécessite aucune intervention manuelle. En fonctionnement normal, la VIP est associée à l'**adresse MAC du serveur 1 (mac1)**. Si le serveur 1 tombe en panne, SafeKit effectue trois opérations :

  * **Récupération de l'application :** SafeKit redémarre les services de l'application sur le serveur 2.
  * **Aliasage de la VIP :** SafeKit configure la VIP comme alias sur la carte réseau du serveur 2, qui devient le nouveau serveur principal. Le système d'exploitation envoie alors des messages sur le réseau pour annoncer la VIP.
  * **GARP :** SafeKit envoie également un message **ARP gratuit (GARP)**. Les commutateurs réseau et les clients mettent à jour leur cache ARP. La VIP est alors associée à l'**adresse MAC du serveur 2 (mac2)**.

#### Centres de données distants et VLAN étendus {#remote-data-centers--extended-vlans}

La **solution dans le même sous-réseau** convient également à la **reprise après sinistre (DR)** entre des sites distants, à condition qu'ils soient reliés par un **LAN étendu ou un VLAN étendu**. Les deux sites restent dans un seul sous-réseau, ce qui simplifie le réseau et évite les protocoles de routage complexes.

> **⚠️ Remarque :** le reroutage de couche 2 par ARP gratuit est la solution la plus transparente pour les applications. Un répartiteur de charge reroute le trafic en couche 3 et traduit les adresses IP (**SNAT/DNAT**), contrairement à l'ARP gratuit. L'application reçoit l'adresse IP d'origine du client et la VIP est configurée localement. **De nombreuses applications ont besoin** de ces deux éléments pour fonctionner correctement.

## Fonctionnement d'une adresse IP virtuelle (VIP) entre différents sous-réseaux avec un répartiteur de charge (cluster Mirror) {#virtual-ip-different-subnets-failover}

### Répartiteur de charge avec contrôles d'état SafeKit {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![Schéma d'un basculement d'adresse IP virtuelle avec un répartiteur de charge entre deux sous-réseaux](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

Lorsque les nœuds se trouvent dans **des sous-réseaux différents**, l'ARP gratuit ne peut pas déplacer la VIP. Dans ce cas, la VIP se trouve sur un **répartiteur de charge**, qui envoie le trafic au serveur principal.

SafeKit fournit une **URL de contrôle d'état** sur chaque nœud :

  * **Principal (PRIM) :** renvoie `HTTP 200 OK`. Le répartiteur de charge envoie le trafic à ce nœud.
  * **Secondaire (SECOND) :** renvoie `HTTP 404 NOT FOUND`. Le répartiteur de charge n'envoie pas de trafic à ce nœud.

Lors d'un basculement, SafeKit modifie les réponses et le répartiteur de charge envoie le trafic au nouveau serveur principal. C'est la solution standard sur [**AWS**](</fr/solutions/aws-high-availability-cluster-synchronous-replication-failover/>), [**Azure**](</fr/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) et [**Google Cloud**](</fr/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>).

> **⚠️ Remarque :** SafeKit fournit le contrôle d'état. Le répartiteur de charge est fourni par votre réseau ou votre fournisseur cloud.

### Problème : le répartiteur de charge possède la VIP {#the-load-balancer-pitfall-vip-on-the-frontend-nat-to-the-physical-ip}

Avec un répartiteur de charge seul, les clients se connectent à la VIP. Le répartiteur traduit la VIP (NAT) en **adresse IP physique** du serveur principal. Le client utilise la VIP, mais le serveur utilise son adresse physique et ne voit pas la VIP.

### Conserver la VIP configurée localement sur le serveur principal {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

Des applications telles que **Milestone XProtect** ou **Nedap AEOS** utilisent la VIP comme adresse de serveur. Elles ne fonctionnent correctement que si la VIP est également **configurée localement sur le serveur principal**. Ainsi :

  * les services peuvent démarrer sur la VIP ;
  * le serveur peut accéder à ses propres services avec la VIP ;
  * l'authentification fonctionne avec la VIP.

**Bonne pratique :** conservez la section `<vip>` dans le module SafeKit, même avec un répartiteur de charge. Utilisez un mode qui conserve la VIP comme adresse de destination, par exemple Floating IP ou Direct Server Return.

### Alternatives à un répartiteur de charge {#network-considerations-load-balancer-vs-extended-lan}

  * Un **LAN étendu (VLAN étendu)** entre les sous-réseaux permet d'utiliser la solution plus simple dans le même sous-réseau.
  * [Les CLI des fournisseurs cloud dans les scripts de basculement](#virtual-ip-cloud-cli-failover).
  * [L'annonce de routes BGP](#virtual-ip-bgp-failover).

## Fonctionnement d'une adresse IP virtuelle (VIP) entre différents sous-réseaux avec les CLI des fournisseurs cloud (cluster Mirror) {#virtual-ip-cloud-cli-failover}

### Pourquoi l'ARP gratuit ne fonctionne pas dans le cloud {#why-gratuitous-arp-does-not-work-in-public-clouds}

Les réseaux cloud (AWS, Azure, Google Cloud) **ignorent l'ARP gratuit**. Ils acheminent le trafic uniquement vers les adresses IP attribuées sur la plateforme cloud. SafeKit configure la VIP sur le serveur principal, mais le réseau cloud ne dirige pas le trafic de la VIP vers ce serveur.

### Déplacer la VIP avec la CLI cloud {#moving-the-vip-through-the-cloud-api-in-safekit-failover-scripts}

Sans répartiteur de charge, le script SafeKit **`start_prim`** peut utiliser la CLI du fournisseur cloud pour déplacer la VIP vers le nouveau serveur principal. Le script peut attribuer l'adresse IP privée au nouveau serveur principal ou modifier une route cloud vers la VIP.

La **VIP reste locale** sur le serveur principal. Il n'y a **pas de NAT** et l'adresse IP d'origine du client ne change pas.

### Responsabilité de l'intégrateur {#integrator-responsibility}

L'**intégrateur** doit ajouter les commandes de la CLI cloud au script `start_prim`. Ces commandes **ne sont pas fournies par le produit SafeKit**. Elles dépendent du fournisseur cloud, de la conception du réseau et des règles de sécurité du client.

### Contraintes {#constraints-of-the-cli-approach}

  * La CLI cloud doit être installée sur les deux nœuds. Chaque nœud doit disposer d'une identité cloud ayant les droits réseau nécessaires.
  * Le script doit gérer les erreurs et les nouvelles tentatives.
  * Le basculement est probablement plus lent qu'avec un répartiteur de charge.
  * **Cette configuration n'est pas validée.** Testez-la avant toute utilisation en production.

## Fonctionnement d'une adresse IP virtuelle (VIP) entre différents sous-réseaux avec BGP (cluster Mirror) {#virtual-ip-bgp-failover}

### Reroutage de la VIP avec BGP {#layer-3-vip-rerouting-with-bgp-route-advertisement}

Avec **BGP (Border Gateway Protocol)**, la VIP est configurée localement sur le serveur principal, qui **l'annonce aux routeurs** sous la forme d'une route /32.

  * **Fonctionnement normal :** seul le serveur principal annonce la VIP.
  * **Basculement :** le script `start_prim` démarre l'annonce sur le nouveau serveur principal. Le script `stop_prim` l'arrête sur l'ancien. Si le serveur principal tombe en panne, sa route est supprimée automatiquement.

### Avantages et prérequis {#benefits-and-prerequisites}

  * **La VIP reste locale, il n'y a pas de NAT et l'adresse IP du client ne change pas.** Des applications comme Milestone XProtect ou Nedap AEOS fonctionnent comme dans un cluster sur un même sous-réseau.
  * Cette solution fonctionne entre différents sous-réseaux et sites, sans VLAN étendu.
  * Elle nécessite des routeurs BGP et l'aide de votre équipe réseau. Dans le cloud, un service de routeur de transit du fournisseur cloud est nécessaire.

> **⚠️ Remarque :** l'intégration BGP s'appuie sur les scripts SafeKit et votre infrastructure de routage. L'**intégrateur** doit écrire les commandes BGP qui annoncent et retirent la route dans les scripts `start_prim` et `stop_prim`. Ces scripts **ne sont pas fournis par le produit SafeKit**. Validez la solution avec votre équipe réseau avant sa mise en production.

### Comparaison des méthodes entre sous-réseaux {#comparison-cross-subnet-vip-methods}

| Méthode | VIP locale sur le serveur principal | NAT | Prérequis principal |
|---|---|---|---|
| **Répartiteur de charge seul** | Non | Oui | Répartiteur de charge |
| **Répartiteur de charge + VIP SafeKit** | Oui | Non (Floating IP / DSR) | Répartiteur de charge |
| **CLI cloud** | Oui | Non | CLI cloud et autorisations |
| **BGP** | Oui | Non | Routeurs BGP |
| **LAN étendu + GARP** | Oui | Non | VLAN étendu |

## Fonctionnement d'une adresse IP virtuelle à charge équilibrée dans une Farm sur le même sous-réseau (cluster Farm) {#vip-load-balancing-same-subnet}

- [Tester l'adresse IP virtuelle avec équilibrage de charge dans un cluster Farm SafeKit](/fr/best-practises/test-load-balancing-vip-farm/)

### Performances évolutives : équilibrage de charge dans le noyau et redondance {#scalable-performance-kernel-level-load-balancing--redundancy}

Lorsque le trafic est important, SafeKit peut répartir la charge entre plusieurs serveurs actifs. Si l'un d'eux tombe en panne, les autres continuent de fonctionner.

### Architecture du cluster Farm : équilibrage de charge entre des nœuds Windows ou Linux {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}

![Schéma d'une adresse IP virtuelle (VIP) avec équilibrage de charge dans un cluster Farm sur le même sous-réseau](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

Dans un **cluster Farm avec équilibrage de charge**, les clients se connectent à une adresse IP virtuelle (VIP) et leurs requêtes sont réparties simultanément entre plusieurs serveurs. Cet exemple comporte deux nœuds, mais il est possible d'en ajouter. Dans le même sous-réseau, la VIP est configurée par aliasage IP sur la carte réseau de **chaque serveur** du cluster.

#### Répartition du trafic : filtre du noyau {#traffic-distribution-the-kernel-level-filter}

Dans un cluster <span class="notranslate farm-term" translate="no">Farm</span>, un **filtre dans le noyau** SafeKit répartit le trafic :

  * **Correspondance ARP :** dans le cache ARP des clients, la VIP est associée à une adresse MAC (par exemple, `mac1`, celle du serveur 1).
  * **Analyse des paquets :** le serveur 1 reçoit les paquets. Le filtre du noyau SafeKit examine l'**adresse IP du client** ou le **port TCP** de chaque paquet.
  * **Répartition de la charge :** le filtre décide quels paquets le serveur 1 traite et lesquels sont envoyés aux autres nœuds, par exemple au serveur 2.

#### Basculement et reroutage par ARP gratuit {#failover-and-rerouting-with-gratuitous-arp}

Si le serveur 1 tombe en panne, SafeKit envoie un message **ARP gratuit (GARP)**. Les clients mettent à jour leur cache ARP avec `mac2`, l'adresse MAC du serveur 2, puis le trafic est dirigé vers les autres nœuds Farm.

#### Déploiement sur des sites distants {#deployment-in-remote-sites}

Cette solution d'équilibrage de charge fonctionne également entre des **centres de données distants**, s'ils sont reliés par un **LAN étendu ou un VLAN étendu**. Les sites se trouvent alors dans le même sous-réseau, configuration efficace pour les clusters Farm répartis sur plusieurs sites.

## Fonctionnement d'une adresse IP virtuelle à charge équilibrée entre différents sous-réseaux (cluster Farm) {#vip-load-balancing-different-subnets}

### Mise à l'échelle multizone : trafic entre sous-réseaux cloud {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

Un cluster <span class="notranslate farm-term" translate="no">Farm</span> peut répartir la charge de l'application entre plusieurs zones de disponibilité et sous-réseaux.

### Clusters Farm entre sous-réseaux : plusieurs nœuds Windows ou Linux {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}

![Schéma d'un cluster Farm avec équilibrage de charge fonctionnant sur deux sous-réseaux différents](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

Lorsque les nœuds Farm se trouvent dans **des sous-réseaux différents**, par exemple dans plusieurs zones de disponibilité cloud, la **VIP** se trouve sur un **répartiteur de charge externe**. Celui-ci envoie le trafic aux adresses IP physiques des serveurs dans chaque sous-réseau.

#### Règles de routage du trafic et d'équilibrage de charge {#intelligent-traffic-routing--load-balancing-rules}

Le répartiteur de charge distribue les requêtes des clients selon deux critères :

  * **Règles d'équilibrage de charge :** par exemple, l'adresse IP du client ou son port TCP.
  * **Disponibilité des nœuds :** le répartiteur de charge envoie le trafic uniquement aux nœuds sains, selon le contrôle d'état SafeKit.

> **⚠️ Remarque :** SafeKit fournit le contrôle d'état. Le répartiteur de charge est fourni par votre réseau ou votre fournisseur cloud.

#### Contrôle d'état SafeKit {#safekit-health-check-mechanism}

SafeKit fournit une **URL de contrôle d'état** sur chaque serveur Farm. Le répartiteur de charge l'utilise pour connaître l'état de chaque serveur :

  * **Nœud disponible :** le contrôle d'état renvoie `HTTP 200 OK`. Le répartiteur de charge envoie le trafic à ce serveur.
  * **Nœud indisponible :** en cas de panne du serveur ou de l'application, SafeKit renvoie `HTTP 404 NOT FOUND` (ou le serveur ne répond pas). Le répartiteur de charge cesse alors d'envoyer du trafic à ce nœud.

#### Déploiement cloud : AWS, Azure et GCP {#cloud-deployment-standards-aws-azure-and-gcp}

C'est l'architecture standard des clusters **Farm dans le cloud**. Si un sous-réseau ou une zone devient indisponible, les autres nœuds continuent de traiter le trafic. Elle est prise en charge par :

  * 💡 [**Amazon AWS**](</fr/solutions/aws-load-balancing-cluster-failover/>) (AWS Network Load Balancer)
  * 💡 [**Microsoft Azure**](</fr/solutions/azure-load-balancing-cluster-failover/>) (Azure Load Balancer)
  * 💡 [**Google Cloud (GCP)**](</fr/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing)


## Adresse IP virtuelle vs redirection DNS : pourquoi le basculement DNS échoue souvent {#virtual-ip-vs-dns-redirection-failover}

### Le problème du délai DNS : pourquoi une VIP est préférable à une redirection DNS {#the-dns-propagation-trap-why-vips-outperform-dns-redirection}

Le basculement par DNS peut sembler fiable, mais il ne l'est pas. On modifie un enregistrement DNS pour qu'il pointe vers un serveur de secours, sans pouvoir contrôler **quand** les clients voient cette modification. Celle-ci passe par de nombreux serveurs DNS que l'on ne maîtrise pas. La redirection DNS ne peut donc pas garantir l'absence d'interruption.

### Exemple : résolution DNS et clients bloqués {#the-technical-scenario-dns-resolution-and-the-stuck-client}

Les utilisateurs se connectent à un **nom virtuel** (le nom DNS). Le système DNS traduit ce nom en une **adresse IP physique**.

![Schéma montrant la résolution d'un nom DNS vers l'adresse IP physique 1 dans un cluster haute disponibilité](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

Résolution DNS : des clients restent bloqués sur l'adresse IP physique 1 dans un cluster haute disponibilité.

#### Avant le basculement : le nom pointe vers l'adresse IP physique 1 {#current-state-resolution-to-physical-ip-1}

Le **client 1** et le **client 2** demandent au système DNS l'adresse IP du nom virtuel. Le système renvoie l'**adresse IP physique 1**. Les clients ouvrent ensuite une connexion réseau (socket) vers cette adresse.

#### Après le basculement : le nom doit pointer vers l'adresse IP physique 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

Si le serveur associé à l'adresse IP physique 1 tombe en panne, un administrateur modifie l'enregistrement DNS pour pointer vers l'**adresse IP physique 2**. Les clients ne pourront s'y connecter que si toutes les conditions suivantes sont réunies :

  * le **TTL (Time to Live)** a expiré sur tous les serveurs DNS intermédiaires entre le client et l'enregistrement ;
  * le cache DNS local des clients 1 et 2 est vide ;
  * l'application ferme sa connexion et effectue une **nouvelle** résolution DNS.

Si une seule de ces conditions n'est pas remplie, les clients restent bloqués sur l'adresse IP physique 1, qui ne fonctionne plus. Le service reste indisponible même si l'enregistrement DNS est correct.

### Deux problèmes de la redirection DNS que vous ne maîtrisez pas {#the-two-black-boxes-of-dns-redirection}

  * **Cache DNS :** de nombreux fournisseurs d'accès à Internet et serveurs DNS d'entreprise ignorent les TTL courts. Ils peuvent conserver l'ancienne adresse IP pendant plusieurs minutes ou plusieurs heures.
  * **Comportement des applications :** de nombreuses applications, par exemple des services Java ou des navigateurs Web, ne résolvent le nom DNS qu'une seule fois au démarrage. Elles continuent d'utiliser la première adresse IP même après la modification de l'enregistrement DNS.

### Conclusion {#conclusion}

La redirection DNS n'est pas une solution fiable de haute disponibilité. Pour un basculement immédiat sur un réseau local ou régional, utilisez une **adresse IP virtuelle (VIP)**.

## Comparaison : implémentation d'une adresse IP virtuelle, latence et transparence applicative {#vip-vs-dns-comparison}

**Comparaison des méthodes de reroutage par adresse IP virtuelle (VIP) et par DNS pour la haute disponibilité et la reprise après sinistre.**

Environnement et cas d'utilisation | Type de haute disponibilité | Méthode de reroutage | Latence réseau | Transparence applicative et adresse IP locale  
---|---|---|---|---  
Principal/secours (haute disponibilité) | Cluster Mirror | ARP gratuit / reprise de l'adresse MAC | Très faible : temps de détection de la panne et d'envoi du GARP | Transparence totale : la VIP est locale sur le nœud actif. L'adresse IP du client ne change pas.  
Équilibrage de charge (actif/actif) | Cluster <span class="notranslate farm-term" translate="no">Farm</span> | Filtre réseau du noyau / GARP | Très faible : temps de détection et de modification des filtres réseau | Transparence totale : la VIP est locale sur tous les nœuds. L'adresse IP du client ne change pas.  
Même sous-réseau / LAN étendu (VLAN étendu) | Reprise après sinistre (centres de données distants) | Aliasage IP / GARP | Faible : dépend du temps aller-retour (RTT) du VLAN étendu | Transparence totale : la VIP est locale sur les nœuds. L'adresse IP du client ne change pas.  
Sous-réseaux différents : répartiteur de charge seul | Reprise après sinistre (centres de données distants / cloud) | Répartiteur de charge externe | Moyenne : dépend de l'intervalle de contrôle d'état du répartiteur | ⚠️ Transparence partielle : SNAT/DNAT est utilisé. La VIP n'est **PAS** locale sur les nœuds et l'adresse IP du client peut ne **PAS** être conservée. L'application doit le prendre en charge.  
Sous-réseaux différents : répartiteur de charge + VIP SafeKit locale | Reprise après sinistre (centres de données distants / cloud) | Répartiteur de charge externe avec Floating IP / Direct Server Return | Moyenne : dépend de l'intervalle de contrôle d'état du répartiteur | Bonne transparence : la VIP est locale sur le nœud principal et sert d'adresse de destination. L'adresse IP du client ne change pas. À tester avec l'application.  
Sous-réseaux différents : CLI cloud | Reprise après sinistre (cloud) | Commandes CLI cloud dans le script `start_prim` (écrit par l'intégrateur) | Moyenne à élevée : dépend du temps de réponse de l'API cloud | Transparence totale : la VIP est locale sur le nœud principal. L'adresse IP du client ne change pas. Configuration non validée.  
Sous-réseaux différents : BGP | Reprise après sinistre (centres de données distants / cloud) | Route /32 annoncée par BGP (scripts écrits par l'intégrateur) | Faible à moyenne : dépend du temps de convergence BGP | Transparence totale : la VIP est locale sur le nœud principal. L'adresse IP du client ne change pas. Nécessite des routeurs BGP.  
Redirection DNS : sans VIP | Reprise après sinistre (centres de données distants) | Modification de l'enregistrement DNS (nom / adresse IP physique) | Élevée et imprévisible : dépend du TTL DNS et du cache DNS client | ⚠️ Non fiable : le client doit effectuer une nouvelle résolution DNS. Souvent, les clients conservent l'ancienne adresse IP reçue au démarrage et ne sont pas reroutés après le basculement.  
  
## Configuration d'une adresse IP virtuelle pour l'équilibrage de charge réseau et la haute disponibilité {#virtual-ip-configuration-load-balancing-ha}


{{%  insert-safekit-farm-video-fr  %}}
 

## Foire aux questions sur l'adresse IP virtuelle (VIP) {#virtual-ip-faq}

### Adresse IP virtuelle (VIP) et réseau {#virtual-ip-vip--networking}

Qu'est-ce qu'une adresse IP virtuelle (VIP) et en quoi diffère-t-elle d'une adresse IP physique ?

Une **adresse IP physique** est associée à une carte réseau. Une **adresse IP virtuelle (VIP)** n'est pas liée au matériel. Dans un cluster SafeKit, les clients utilisent toujours la VIP. Si le serveur principal tombe en panne, la VIP passe automatiquement à un nœud disponible. Les clients n'ont pas besoin de modifier leur configuration.

Ai-je besoin d'un répartiteur de charge matériel pour utiliser une adresse IP virtuelle ?

Non. **SafeKit** gère la VIP par logiciel. Dans le même sous-réseau, il utilise l'**aliasage IP** et l'**ARP gratuit (GARP)** pour rerouter le trafic. Aucun répartiteur de charge externe ni serveur proxy n'est nécessaire.

Qu'est-ce que l'ARP gratuit (GARP) et pourquoi est-il utilisé ?

L'**ARP gratuit (GARP)** est un message réseau envoyé aux appareils. Il met à jour les tables ARP des commutateurs et des routeurs. Lors d'un basculement, le nouveau serveur principal envoie un message GARP pour annoncer que la **VIP** est désormais associée à son adresse MAC. Le trafic est alors rerouté.

Puis-je associer un nom DNS à une adresse IP virtuelle ?

**Oui.** Créez un enregistrement A standard pour la VIP. Le reroutage est effectué au **niveau de la VIP** (par ARP ou par reroutage réseau), et **non au niveau DNS**. Les délais liés au DNS et au TTL n'affectent pas le basculement, qui reste transparent pour l'application.

### Cloud et architectures avancées {#cloud--advanced-architectures}

Comment fonctionne une adresse IP virtuelle dans le cloud (AWS, Azure, GCP) ?

Dans le cloud, les possibilités d'ARP de couche 2 sont limitées. SafeKit fonctionne avec les **répartiteurs de charge cloud** (AWS ELB, Azure Load Balancer ou Google GCLB). SafeKit fournit une **URL de contrôle d'état** que le répartiteur consulte pour envoyer le trafic au nœud actif, avec SNAT/DNAT.

Un LAN étendu est-il préférable à un répartiteur de charge pour la reprise après sinistre ?

**Oui.** Entre des centres de données distants, un **LAN étendu (VLAN étendu)** est souvent préférable, car le basculement reste **transparent pour l'application**. L'**adresse IP virtuelle ne change pas** : l'application et ses clients continuent d'utiliser la même adresse après le basculement entre les centres de données.

Quelles sont les limites de la redirection DNS par rapport à une adresse IP virtuelle ?

La **redirection DNS** dépend du **TTL (Time to Live)** et du cache DNS des clients, et le rétablissement peut prendre plusieurs heures. De plus, les **clients qui n'effectuent pas de nouvelle résolution DNS restent bloqués** sur le serveur en panne. Une **VIP** reroute le trafic au niveau 2 sans dépendre du cache DNS du client.

### Transparence et sécurité {#transparency--security}

Pourquoi une adresse IP virtuelle locale est-elle importante pour la transparence applicative ?

Avec une **adresse IP virtuelle (VIP)** locale, l'application utilise une adresse qui ne change pas. SafeKit effectue le reroutage dans le **noyau** : l'application ne voit pas le basculement. Avec DNAT, l'adresse utilisée par l'application change.

Une adresse IP virtuelle conserve-t-elle l'adresse IP d'origine du client ?

Oui. SafeKit n'utilise pas de traduction d'adresse source (SNAT). Comme la VIP est locale sur le serveur actif, l'application reçoit l'**adresse IP d'origine du client**.


{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}