---
title: "Comment fonctionne une adresse IP virtuelle dans un cluster haute disponibilité ?"
canonical: "https://safekit.eviden.com/fr/best-practises/how-a-virtual-ip-address-works/"
description: "Découvrez comment SafeKit déplace une adresse IP virtuelle lors d'un basculement : ARP gratuit dans le même sous-réseau, répartiteur de charge, CLI cloud ou BGP entre sous-réseaux. Comprenez l'intérêt d'une VIP locale."
category: "best-practises"
lang: "fr"
topics: "Qu'est-ce qu'une adresse IP virtuelle dans un cluster haute disponibilité ?, Implémentation de l'adresse IP virtuelle dans SafeKit, Fonctionnement d'une adresse IP virtuelle dans le même sous-réseau (cluster Mirror), Fonctionnement d'une adresse IP virtuelle entre différents sous-réseaux avec un répartiteur de charge (cluster Mirror), Fonctionnement d'une adresse IP virtuelle entre différents sous-réseaux avec les CLI des fournisseurs cloud (cluster Mirror), Fonctionnement d'une adresse IP virtuelle entre différents sous-réseaux avec BGP (cluster Mirror), Fonctionnement de la redirection DNS entre différents sous-réseaux (cluster Mirror), Fonctionnement d'une adresse IP virtuelle avec équilibrage de charge dans une Farm sur le même sous-réseau (cluster Farm), Fonctionnement d'une adresse IP virtuelle avec équilibrage de charge entre différents sous-réseaux (cluster Farm), Comparaison de l'implémentation, de la latence et de la transparence applicative, Foire aux questions sur l'adresse IP virtuelle, 🔍 Explorer SafeKit"
---

# Comment fonctionne une adresse IP virtuelle dans un cluster haute disponibilité ? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## Qu'est-ce qu'une adresse IP virtuelle dans un cluster haute disponibilité ? {#virtual-ip-definition}

Une **adresse IP virtuelle** est l'adresse unique utilisée par les clients pour se connecter à une application dans un [cluster haute disponibilité](</fr/>). Elle n'est liée à aucun serveur en particulier. Lors d'un basculement, elle passe au serveur qui exécute l'application. Les clients n'ont pas besoin de modifier leur configuration.

**Principe clé de SafeKit :** l'adresse IP virtuelle est **configurée localement sur le serveur** qui exécute l'application. Celle-ci démarre sur cette adresse et reçoit l'adresse IP d'origine du client. C'est pourquoi de nombreuses applications fonctionnent avec SafeKit sans modification. SafeKit propose deux types d'adresses IP virtuelles :

  * **Adresse IP virtuelle primaire/secours dans un cluster Mirror :** elle est active uniquement sur le serveur principal. Lors d'un basculement, elle passe au serveur de secours.
  * **Adresse IP virtuelle avec équilibrage de charge réseau dans un cluster <span class="notranslate farm-term" translate="no">Farm</span> :** elle est active simultanément sur tous les serveurs, qui se partagent le trafic.

## Implémentation de l'adresse IP virtuelle dans SafeKit {#safekit-virtual-ip-implementation}

Cet article explique comment SafeKit déplace l'adresse IP virtuelle selon les différentes architectures réseau :

  * **Même sous-réseau ou LAN étendu ([Mirror](#virtual-ip-same-subnet-failover) et [<span class="notranslate farm-term" translate="no">Farm</span>](#virtual-ip-load-balancing-same-subnet)) :** SafeKit configure l'adresse IP virtuelle sur le serveur et envoie un **ARP gratuit (GARP)**. Aucun matériel externe n'est nécessaire. C'est la solution la plus transparente : tout est mis en œuvre par le produit SafeKit.
  * **Sous-réseaux différents avec un répartiteur de charge ([Mirror](#virtual-ip-different-subnets-failover) et [<span class="notranslate farm-term" translate="no">Farm</span>](#virtual-ip-load-balancing-different-subnets)) :** le répartiteur utilise le **contrôle d'état** SafeKit pour envoyer le trafic au bon serveur (le répartiteur est configuré par l'intégrateur).
  * **[Sous-réseaux différents avec les CLI des fournisseurs cloud](#virtual-ip-cloud-cli-failover) (cluster Mirror) :** le script SafeKit `start_prim` appelle la CLI cloud pour déplacer l'adresse IP virtuelle (script écrit par l'intégrateur).
  * **[Sous-réseaux différents avec BGP](#virtual-ip-bgp-failover) (cluster Mirror) :** le serveur principal annonce l'adresse IP virtuelle aux routeurs (script écrit par l'intégrateur).
  * **[Sous-réseaux différents avec redirection DNS](#virtual-ip-vs-dns-redirection-failover) (cluster Mirror) :** le script SafeKit `start_prim` modifie l'enregistrement DNS du nom virtuel pour qu'il pointe vers l'adresse IP physique du nouveau serveur principal (script écrit par l'intégrateur). Il n'y a pas d'adresse IP virtuelle unique et cette méthode n'est pas fiable pour tous les clients.

Dans cet article :

  * [Comparaison de l'implémentation, de la latence et de la transparence applicative](#virtual-ip-methods-comparison)
  * [Foire aux questions sur l'adresse IP virtuelle](#virtual-ip-faq)
  * [🔍 Explorer SafeKit](#hub)

![Schéma comparant le comportement des adresses IP virtuelles dans Evidian SafeKit : une IP flottante sur le nœud actif dans les clusters Mirror et l'équilibrage de charge réseau sur tous les nœuds dans les clusters Farm.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Implémentation de l'adresse IP virtuelle dans les clusters Mirror et <span class="notranslate farm-term" translate="no">Farm</span> SafeKit.**

{{%  insert-safekit-4-buttons-fr  %}}

## Fonctionnement d'une adresse IP virtuelle dans le même sous-réseau (cluster Mirror) {#virtual-ip-same-subnet-failover}

- [Tester l'adresse IP virtuelle primaire/secours dans un cluster Mirror SafeKit](/fr/best-practises/test-primary-backup-vip-mirror/)

### Basculement automatique et reroutage réseau dans un sous-réseau local {#automated-failover--network-rerouting-in-a-local-subnet}

Sur un réseau local, **SafeKit** gère automatiquement l'adresse IP virtuelle et le basculement de l'application.

### Cluster Mirror local : basculement à deux nœuds sous Windows ou Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}

![Mécanisme de basculement de l'adresse IP virtuelle SafeKit entre deux serveurs dans le même sous-réseau](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

Dans un **cluster Mirror SafeKit**, les deux nœuds se trouvent dans le même sous-réseau. La haute disponibilité repose sur une **adresse IP virtuelle**. SafeKit gère cette adresse dans la pile réseau du système d'exploitation, sans matériel spécial. Elle est ajoutée aux adresses IP physiques des serveurs 1 et 2 au moyen de l'**aliasage IP**. Les clients se connectent toujours à l'adresse IP virtuelle.

#### Aliasage IP et gestion de plusieurs adresses IP virtuelles dans SafeKit {#safekits-advanced-ip-aliasing--multiple-virtual-ip-support}

L'adresse IP virtuelle est une troisième adresse IP qui passe d'un nœud à l'autre. SafeKit peut gérer **plusieurs adresses IP virtuelles** dans un même cluster. Elles peuvent être configurées sur la même carte réseau ou sur des cartes différentes, afin que chaque service dispose de sa propre adresse.

#### Mécanisme de basculement : ARP gratuit (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

Le basculement ne nécessite aucune intervention manuelle. En fonctionnement normal, l'adresse IP virtuelle est associée à l'**adresse MAC du serveur 1 (mac1)**. Si le serveur 1 tombe en panne, SafeKit effectue trois opérations :

  * **Aliasage de l'adresse IP virtuelle :** SafeKit configure cette adresse comme alias sur la carte réseau du serveur 2, qui devient le nouveau serveur principal. Le système d'exploitation envoie alors des messages sur le réseau pour annoncer l'adresse IP virtuelle.
  * **GARP :** SafeKit envoie également des messages **ARP gratuits (GARP)**. Les commutateurs réseau et les clients mettent à jour leur cache ARP. L'adresse IP virtuelle est alors associée à l'**adresse MAC du serveur 2 (mac2)**.
  * **Récupération de l'application :** SafeKit redémarre les services de l'application sur le serveur 2.

#### Centres de données distants et VLAN étendus {#remote-data-centers--extended-vlans}

La **solution dans le même sous-réseau décrite ci-dessus** fonctionne également pour la **reprise après sinistre (DR)** entre des sites distants. C'est souvent le meilleur choix lorsque les sites sont reliés par un **LAN étendu ou un VLAN étendu**. Les deux sites se trouvent alors dans un seul sous-réseau, ce qui simplifie le réseau et évite les protocoles de routage complexes.

> **⚠️ Remarque :** le reroutage de couche 2 par ARP gratuit est la solution la plus transparente pour les applications. L'application reçoit l'adresse IP d'origine du client et l'adresse IP virtuelle est configurée localement. **De nombreuses applications ont besoin** d'une adresse IP virtuelle locale. Sans elle, elles **peuvent ne pas fonctionner correctement**. Dans cette configuration de même sous-réseau, SafeKit met en œuvre tout le mécanisme : aucune intégration spéciale n'est nécessaire.

## Fonctionnement d'une adresse IP virtuelle entre différents sous-réseaux avec un répartiteur de charge (cluster Mirror) {#virtual-ip-different-subnets-failover}

### Répartiteur de charge avec contrôles d'état SafeKit {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![Schéma d'un basculement d'adresse IP virtuelle avec un répartiteur de charge entre deux sous-réseaux différents](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

Lorsque les nœuds se trouvent dans **des sous-réseaux différents**, l'ARP gratuit ne peut pas déplacer l'adresse IP virtuelle. Celle-ci se trouve alors sur un **répartiteur de charge**, qui envoie le trafic au serveur principal.

SafeKit fournit une **URL de contrôle d'état** sur chaque nœud :

  * **Principal (PRIM) :** renvoie `HTTP 200 OK`. Le répartiteur envoie le trafic à ce nœud.
  * **Secondaire (SECOND) :** renvoie `HTTP 404 NOT FOUND`. Le répartiteur n'envoie pas de trafic à ce nœud.

Lors d'un basculement, SafeKit modifie les réponses et le répartiteur envoie le trafic au nouveau serveur principal. C'est la solution standard entre **zones de disponibilité** sur [**AWS**](</fr/solutions/aws-high-availability-cluster-synchronous-replication-failover/>), [**Azure**](</fr/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) et [**Google Cloud**](</fr/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>).

> **⚠️ Remarque :** SafeKit fournit le contrôle d'état. Le répartiteur de charge est fourni par votre réseau ou votre fournisseur cloud.

### Problème : le répartiteur de charge possède l'adresse IP virtuelle {#the-load-balancer-pitfall-virtual-ip-on-the-frontend-nat-to-the-physical-ip}

Avec un répartiteur de charge seul, les clients se connectent à l'adresse IP virtuelle. Le répartiteur la traduit (NAT) en **adresse IP physique** du serveur principal. Le client utilise l'adresse virtuelle, mais le serveur utilise son adresse physique : il ne voit pas l'adresse IP virtuelle.

### Conserver l'adresse IP virtuelle configurée localement sur le serveur principal {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

Certaines applications utilisent l'adresse IP virtuelle comme adresse de leur serveur. Elles ne fonctionnent correctement que si cette adresse est également **configurée localement sur le serveur principal**. Dans ce cas :

  * les services peuvent démarrer sur l'adresse IP virtuelle ;
  * le serveur peut accéder à ses propres services avec cette adresse ;
  * l'authentification fonctionne avec cette adresse.

**Bonne pratique :** utilisez un mode de répartiteur de charge qui conserve l'adresse IP virtuelle comme adresse de destination (par exemple, Floating IP ou Direct Server Return). Configurez ensuite l'adresse IP virtuelle localement sur le serveur principal. La méthode dépend du sous-réseau de cette adresse :

  * **L'adresse IP virtuelle se trouve dans le même sous-réseau que les adresses IP physiques des serveurs :** conservez la section `<vip>` dans le module SafeKit. SafeKit configure automatiquement l'adresse IP virtuelle comme alias sur la carte réseau associée à l'adresse IP physique.
  * **L'adresse IP virtuelle se trouve dans un sous-réseau différent :** ne configurez pas `<vip>` dans SafeKit. Utilisez le script `start_prim` pour configurer l'adresse IP virtuelle sur une interface dédiée, telle que loopback, avant le démarrage de l'application. Utilisez `stop_prim` pour la supprimer après l'arrêt de l'application. L'intégrateur écrit ces commandes, qui ne sont pas fournies par le produit SafeKit.

## Fonctionnement d'une adresse IP virtuelle entre différents sous-réseaux avec les CLI des fournisseurs cloud (cluster Mirror) {#virtual-ip-cloud-cli-failover}

### Pourquoi l'ARP gratuit ne fonctionne pas dans le cloud {#why-gratuitous-arp-does-not-work-in-public-clouds}

Les réseaux cloud (AWS, Azure et Google Cloud) **ignorent l'ARP gratuit**. Ils acheminent le trafic uniquement vers les adresses IP attribuées sur la plateforme cloud. SafeKit configure l'adresse IP virtuelle sur le serveur principal, mais le réseau cloud ne dirige pas le trafic vers ce serveur.

### Déplacer l'adresse IP virtuelle avec la CLI cloud {#moving-the-virtual-ip-through-the-cloud-api-in-safekit-failover-scripts}

Sans répartiteur de charge, la CLI du fournisseur cloud peut être intégrée au script SafeKit **`start_prim`** pour mettre à jour la configuration réseau du cloud avant le démarrage de l'application. Elle peut attribuer l'adresse IP virtuelle au nœud qui devient principal ou modifier la route cloud pour diriger le trafic de cette adresse vers ce nœud.

L'**adresse IP virtuelle reste locale** sur le serveur principal. Il n'y a **pas de NAT** et l'adresse IP d'origine du client ne change pas.

### Responsabilité de l'intégrateur {#integrator-responsibility}

L'**intégrateur** doit ajouter les commandes de la CLI cloud au script `start_prim`. Ces commandes **ne sont pas fournies par le produit SafeKit**. Elles dépendent du fournisseur cloud, de la conception du réseau et des règles de sécurité du client.

### Contraintes {#constraints-of-the-cli-approach}

  * La CLI cloud doit être installée sur les deux nœuds. Chaque nœud doit disposer d'une identité cloud ayant les droits réseau nécessaires.
  * Le script doit gérer les erreurs et les nouvelles tentatives.
  * Le basculement est probablement plus lent qu'avec un répartiteur de charge.

## Fonctionnement d'une adresse IP virtuelle entre différents sous-réseaux avec BGP (cluster Mirror) {#virtual-ip-bgp-failover}

### Reroutage de l'adresse IP virtuelle avec BGP {#layer-3-virtual-ip-rerouting-with-bgp-route-advertisement}

Avec **BGP (Border Gateway Protocol)**, l'adresse IP virtuelle est généralement configurée sur une interface loopback du serveur principal par le script `start_prim`, avant le démarrage de l'application. Le serveur principal annonce ensuite l'adresse IP virtuelle aux routeurs sous la forme d'une route /32.

Lors d'un basculement, le script `stop_prim` de l'ancien serveur principal arrête l'application, retire l'adresse IP virtuelle de l'interface loopback et retire la route /32 des routeurs. Si l'ancien serveur principal tombe en panne, `stop_prim` ne s'exécute pas, mais les routeurs perdent la session BGP et suppriment automatiquement la route.

### Avantages et prérequis {#benefits-and-prerequisites}

  * **L'adresse IP virtuelle reste locale, il n'y a pas de NAT et l'adresse IP du client ne change pas.**
  * La solution fonctionne entre sous-réseaux et sites, sans VLAN étendu.
  * Elle nécessite des routeurs BGP et l'aide de votre équipe réseau. Dans le cloud, un service de serveur de routes du fournisseur cloud est nécessaire.

> **⚠️ Remarque :** l'intégration BGP utilise les scripts SafeKit et votre infrastructure de routage. L'**intégrateur** doit écrire les commandes dans les scripts `start_prim` et `stop_prim`. Ces scripts **ne sont pas fournis par le produit SafeKit**. Validez la solution avec votre équipe réseau avant sa mise en production.

## Fonctionnement de la redirection DNS entre différents sous-réseaux (cluster Mirror) {#virtual-ip-vs-dns-redirection-failover}

### Mise à jour DNS avec le script `start_prim` {#dns-rerouting-with-the-start-prim-script}

Avec la redirection DNS, il n'existe **pas d'adresse IP virtuelle unique**. Les clients se connectent à un **nom virtuel** (le nom DNS). Lors d'un basculement, le script `start_prim` du nouveau serveur principal démarre l'application, puis modifie l'enregistrement DNS du nom virtuel pour qu'il pointe vers l'**adresse IP physique** du nouveau serveur principal.

Le script `stop_prim` n'a rien à faire. Si l'ancien serveur principal tombe en panne, le nouveau serveur principal remplace l'enregistrement DNS.

### Exemple : résolution DNS et clients bloqués {#the-technical-scenario-dns-resolution-and-the-stuck-client}

![Schéma montrant la résolution d'un nom DNS vers l'adresse IP physique 1 dans un cluster haute disponibilité](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

Résolution DNS : des clients restent bloqués sur l'adresse IP physique 1 dans un cluster haute disponibilité.

#### Avant le basculement : le nom pointe vers l'adresse IP physique 1 {#current-state-resolution-to-physical-ip-1}

Le **client 1** et le **client 2** demandent au système DNS l'adresse IP du nom virtuel. Le système renvoie l'**adresse IP physique 1**. Les clients ouvrent ensuite une connexion réseau vers cette adresse.

#### Après le basculement : le nom pointe vers l'adresse IP physique 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

Le serveur 1 tombe en panne. Le script `start_prim` du serveur 2 modifie l'enregistrement DNS pour qu'il pointe vers l'**adresse IP physique 2**. Les clients ne pourront s'y connecter que si toutes les conditions suivantes sont réunies :

  * le **TTL (Time to Live)** a expiré sur tous les serveurs DNS entre le client et l'enregistrement ;
  * le cache DNS local des clients 1 et 2 est vide ;
  * l'application ferme sa connexion et effectue une **nouvelle** résolution DNS.

Si une seule de ces conditions n'est pas remplie, les **clients 1 et 2 restent bloqués** sur l'adresse IP physique 1. Le service reste indisponible même si l'enregistrement DNS est correct.

### Limites et prérequis {#the-two-black-boxes-of-dns-redirection}

  * **Cache DNS :** de nombreux fournisseurs d'accès à Internet et serveurs DNS d'entreprise ignorent les TTL courts. Ils peuvent conserver l'ancienne adresse IP physique pendant plusieurs minutes ou plusieurs heures.
  * **Comportement des applications :** de nombreuses applications, par exemple des services Java ou des navigateurs Web, ne résolvent le nom DNS qu'une seule fois au démarrage. Elles continuent d'utiliser la première adresse IP.
  * **L'adresse IP change à chaque basculement :** l'application ne dispose pas d'une adresse IP virtuelle locale et persistante. Les applications qui enregistrent leur propre adresse IP peuvent ne pas fonctionner.
  * **Prérequis :** un TTL court sur l'enregistrement DNS (par exemple, 30 à 60 secondes) et le droit de modifier la zone DNS depuis les deux serveurs.

> **⚠️ Remarque :** l'**intégrateur** doit écrire les commandes de mise à jour DNS dans le script `start_prim`. Elles **ne sont pas fournies par le produit SafeKit** et dépendent du serveur DNS (Windows DNS, BIND ou DNS cloud).

### Conclusion {#conclusion}

La redirection DNS n'est pas une solution fiable de haute disponibilité. Utilisez-la uniquement si tous les clients effectuent une nouvelle résolution DNS à la reconnexion. Pour un basculement immédiat et transparent, utilisez une **adresse IP virtuelle** : via un LAN étendu, un répartiteur de charge, les CLI d'un fournisseur cloud ou BGP.

## Fonctionnement d'une adresse IP virtuelle à charge équilibrée dans une Farm sur le même sous-réseau (cluster Farm) {#virtual-ip-load-balancing-same-subnet}

- [Tester l'adresse IP virtuelle avec équilibrage de charge dans un cluster Farm SafeKit](/fr/best-practises/test-load-balancing-vip-farm/)

### Performances évolutives : équilibrage de charge dans le noyau et redondance {#scalable-performance-kernel-level-load-balancing--redundancy}

Lorsque le trafic est important, SafeKit peut répartir la charge entre plusieurs serveurs actifs. Si l'un d'eux tombe en panne, les autres continuent de fonctionner.

### Architecture du cluster Farm : équilibrage de charge entre des nœuds Windows ou Linux {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}

![Schéma d'une adresse IP virtuelle avec équilibrage de charge dans un cluster Farm sur le même sous-réseau](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

Dans un **cluster Farm avec équilibrage de charge**, les clients se connectent à une adresse IP virtuelle et leurs requêtes sont réparties simultanément entre plusieurs serveurs. Cet exemple comporte deux nœuds, mais il est possible d'en ajouter. Dans le même sous-réseau, l'adresse IP virtuelle est configurée par aliasage IP sur la carte réseau de **chaque serveur** du cluster.

#### Répartition du trafic : filtre du noyau {#traffic-distribution-the-kernel-level-filter}

Dans un cluster <span class="notranslate farm-term" translate="no">Farm</span>, un **filtre dans le noyau** SafeKit répartit le trafic :

  * **Correspondance ARP :** dans le cache ARP des clients, l'adresse IP virtuelle est associée à une adresse MAC (par exemple, `mac1`, celle du serveur 1).
  * **Analyse des paquets :** le serveur 1 reçoit les paquets. Le filtre du noyau SafeKit examine l'**adresse IP du client** ou le **port TCP** de chaque paquet.
  * **Répartition de la charge :** le filtre décide quels paquets le serveur 1 traite et lesquels sont envoyés aux autres nœuds, par exemple au serveur 2. Pour envoyer un paquet à un autre nœud, il remplace son **adresse MAC de destination** par celle de ce nœud. L'adresse IP de destination reste l'adresse IP virtuelle. Le travail est ainsi réparti entre les serveurs.

#### Basculement et reroutage par ARP gratuit {#failover-and-rerouting-with-gratuitous-arp}

Si le serveur 1 tombe en panne, SafeKit envoie un message **ARP gratuit (GARP)**. Les clients mettent à jour leur cache ARP avec `mac2`, l'adresse MAC du serveur 2, puis le trafic est immédiatement dirigé vers les autres nœuds Farm.

#### Déploiement sur des sites distants {#deployment-in-remote-sites}

Cette solution d'équilibrage de charge fonctionne également entre des **centres de données distants**, s'ils sont reliés par un **LAN étendu ou un VLAN étendu**. Tous les sites se trouvent alors dans le même sous-réseau. C'est la configuration la plus efficace pour les clusters Farm répartis sur plusieurs sites.

{{%  insert-safekit-farm-video-fr  %}}

## Fonctionnement d'une adresse IP virtuelle à charge équilibrée entre différents sous-réseaux (cluster Farm) {#virtual-ip-load-balancing-different-subnets}

### Mise à l'échelle multizone : trafic entre sous-réseaux cloud {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

Un cluster <span class="notranslate farm-term" translate="no">Farm</span> peut répartir la charge de l'application entre plusieurs zones de disponibilité et sous-réseaux.

### Clusters Farm entre sous-réseaux : plusieurs nœuds Windows ou Linux {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}

![Schéma d'un cluster Farm avec équilibrage de charge fonctionnant sur deux sous-réseaux différents](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

Lorsque les nœuds Farm se trouvent dans **des sous-réseaux différents**, par exemple dans plusieurs zones de disponibilité cloud, l'adresse IP virtuelle se trouve sur un **répartiteur de charge externe**. Celui-ci envoie le trafic aux adresses IP physiques des serveurs dans chaque sous-réseau.

#### Règles de routage du trafic et d'équilibrage de charge {#intelligent-traffic-routing--load-balancing-rules}

Le répartiteur de charge distribue les requêtes des clients selon deux critères :

  * **Règles d'équilibrage de charge :** par exemple, l'adresse IP du client ou son port TCP.
  * **Disponibilité des nœuds :** le répartiteur envoie le trafic uniquement aux nœuds sains, selon le contrôle d'état SafeKit.

> **⚠️ Remarque :** SafeKit fournit le contrôle d'état. Le répartiteur de charge est fourni par votre réseau ou votre fournisseur cloud.

#### Contrôle d'état SafeKit {#safekit-health-check-mechanism}

SafeKit fournit une **URL de contrôle d'état** sur chaque serveur Farm. Le répartiteur de charge l'utilise pour connaître l'état de chaque serveur :

  * **Nœud disponible :** le contrôle d'état renvoie `HTTP 200 OK`. Le répartiteur envoie le trafic à ce serveur.
  * **Nœud indisponible :** si un serveur ou une application tombe en panne, SafeKit renvoie `HTTP 404 NOT FOUND` (ou le serveur ne répond pas). Le répartiteur cesse immédiatement d'envoyer du trafic à ce nœud.

#### Déploiement cloud : AWS, Azure et GCP {#cloud-deployment-standards-aws-azure-and-gcp}

C'est l'architecture standard des clusters **Farm dans le cloud**. Si un sous-réseau ou une zone devient indisponible, les autres nœuds continuent de traiter le trafic. Elle est prise en charge par [**Amazon AWS**](</fr/solutions/aws-load-balancing-cluster-failover/>) (AWS Network Load Balancer), [**Microsoft Azure**](</fr/solutions/azure-load-balancing-cluster-failover/>) (Azure Load Balancer) et [**Google Cloud (GCP)**](</fr/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing).

## Comparaison : implémentation de l'adresse IP virtuelle, latence et transparence applicative {#virtual-ip-methods-comparison}

**Comparaison des méthodes de reroutage par adresse IP virtuelle et par DNS pour la haute disponibilité et la reprise après sinistre.**

Environnement et cas d'utilisation | Type de haute disponibilité | Méthode de reroutage | Mis en œuvre par | Latence réseau | Transparence applicative et adresse IP locale  
---|---|---|---|---|---  
Principal/secours (haute disponibilité) | Cluster Mirror | ARP gratuit / reprise de l'adresse MAC | ✅ Produit SafeKit | Très faible : délai de détection de la panne et d'envoi du GARP | Transparence totale : l'adresse IP virtuelle est locale sur le nœud actif. L'adresse IP du client ne change pas.  
Équilibrage de charge (actif/actif) | Cluster <span class="notranslate farm-term" translate="no">Farm</span> | Filtre réseau du noyau / GARP | ✅ Produit SafeKit | Très faible : délai de détection et de modification des filtres réseau | Transparence totale : l'adresse IP virtuelle est locale sur tous les nœuds. L'adresse IP du client ne change pas.  
Même sous-réseau / LAN étendu (VLAN étendu) | Reprise après sinistre (centres de données distants) | Aliasage IP / GARP | ✅ Produit SafeKit (le VLAN étendu est fourni par l'équipe réseau) | Faible : dépend du temps aller-retour (RTT) du VLAN étendu | Transparence totale : l'adresse IP virtuelle est locale sur les nœuds. L'adresse IP du client ne change pas.  
Sous-réseaux différents : répartiteur de charge seul | Reprise après sinistre (centres de données distants / cloud) | Répartiteur de charge externe | 🛠️ Intégrateur : configuration du répartiteur (SafeKit fournit le contrôle d'état) | Moyenne : dépend de l'intervalle de contrôle d'état du répartiteur | ⚠️ Transparence partielle : SNAT/DNAT est utilisé. L'adresse IP virtuelle n'est **PAS** locale sur les nœuds et l'adresse IP du client peut ne **PAS** être conservée. L'application doit le prendre en charge.  
Sous-réseaux différents : répartiteur + adresse IP virtuelle locale SafeKit | Reprise après sinistre (centres de données distants / cloud) | Répartiteur externe avec Floating IP / Direct Server Return | 🛠️ Intégrateur : configuration du répartiteur (SafeKit fournit le contrôle d'état) | Moyenne : dépend de l'intervalle de contrôle d'état du répartiteur | Bonne transparence : l'adresse IP virtuelle est locale sur le nœud principal et sert d'adresse de destination. L'adresse IP du client ne change pas. À tester avec l'application.  
Sous-réseaux différents : CLI cloud | Reprise après sinistre (cloud) | API cloud : l'adresse IP privée ou une route cloud est déplacée vers le nouveau serveur principal | 🛠️ Intégrateur : commandes CLI cloud dans `start_prim` | Moyenne à élevée : dépend du temps de réponse de l'API cloud | Transparence totale : l'adresse IP virtuelle est locale sur le nœud principal. L'adresse IP du client ne change pas. Configuration non validée.  
Sous-réseaux différents : BGP | Reprise après sinistre (centres de données distants / cloud) | Route /32 annoncée par BGP | 🛠️ Intégrateur : commandes BGP dans `start_prim` et `stop_prim` | Faible à moyenne : dépend du temps de convergence BGP | Transparence totale : l'adresse IP virtuelle est locale sur le nœud principal. L'adresse IP du client ne change pas. Routeurs BGP requis.  
Redirection DNS : sans adresse IP virtuelle | Reprise après sinistre (centres de données distants) | Modification de l'enregistrement DNS (nom / adresse IP physique) | 🛠️ Intégrateur : commandes DNS dans `start_prim` | Élevée et imprévisible : dépend du TTL DNS et du cache DNS des clients | ⚠️ Non fiable : le client doit effectuer une nouvelle résolution DNS. Souvent, les clients conservent l'ancienne adresse IP reçue au démarrage et ne sont pas reroutés après le basculement.  

## Foire aux questions sur l'adresse IP virtuelle {#virtual-ip-faq}

### Adresse IP virtuelle et réseau {#virtual-ip--networking}

Qu'est-ce qu'une adresse IP virtuelle et en quoi diffère-t-elle d'une adresse IP physique ?

Une **adresse IP physique** est associée à une carte réseau. Une **adresse IP virtuelle** n'est pas liée au matériel. Dans un cluster SafeKit, les clients utilisent toujours l'adresse IP virtuelle. Si le serveur principal tombe en panne, celle-ci passe automatiquement à un nœud disponible. Les clients n'ont pas besoin de modifier leur configuration.

Ai-je besoin d'un répartiteur de charge matériel pour utiliser une adresse IP virtuelle ?

Non. **SafeKit** gère l'adresse IP virtuelle par logiciel. Dans le même sous-réseau, il utilise l'**aliasage IP** et l'**ARP gratuit (GARP)** pour rerouter le trafic. Aucun répartiteur de charge externe ni serveur proxy n'est nécessaire.

Qu'est-ce que l'ARP gratuit (GARP) et pourquoi est-il utilisé ?

L'**ARP gratuit (GARP)** est un message réseau envoyé aux appareils. Il met à jour les tables ARP des commutateurs et des routeurs. Lors d'un basculement, le nouveau serveur principal envoie un message GARP pour annoncer que l'**adresse IP virtuelle** est désormais associée à son adresse MAC. Le trafic est alors rerouté.

Puis-je associer un nom DNS à une adresse IP virtuelle ?

**Oui.** Créez un enregistrement A standard pour l'adresse IP virtuelle. Le reroutage est effectué au **niveau de l'adresse IP virtuelle** (par ARP ou par reroutage réseau), et **non au niveau DNS**. Les délais liés au DNS et au TTL n'affectent pas le basculement, qui reste transparent pour l'application.

### Cloud et architectures avancées {#cloud--advanced-architectures}

Comment fonctionne une adresse IP virtuelle dans le cloud (AWS, Azure, GCP) ?

Dans le cloud, les possibilités d'ARP de couche 2 sont limitées. SafeKit fonctionne avec les **répartiteurs de charge cloud** (AWS ELB, Azure Load Balancer ou Google GCLB). SafeKit fournit une **URL de contrôle d'état**. Le répartiteur la consulte et envoie le trafic au nœud actif avec SNAT/DNAT.

Un LAN étendu est-il préférable à un répartiteur de charge pour la reprise après sinistre ?

**Oui.** Entre des centres de données distants, un **LAN étendu (VLAN étendu)** est souvent préférable, car le basculement reste **transparent pour l'application**. L'**adresse IP virtuelle ne change pas** : l'application et ses clients continuent d'utiliser la même adresse après le basculement entre les centres de données.

Quelles sont les limites de la redirection DNS par rapport à une adresse IP virtuelle ?

La **redirection DNS** dépend du **TTL (Time to Live)** et du cache DNS des clients; le rétablissement peut prendre plusieurs heures. De plus, les **clients qui n'effectuent pas de nouvelle résolution DNS restent bloqués** sur le serveur en panne. Une **adresse IP virtuelle** reroute le trafic de couche 2 immédiatement, sans dépendre du cache DNS client.

### Transparence et sécurité {#transparency--security}

Pourquoi une adresse IP virtuelle locale est-elle importante pour la transparence des applications ?

Avec une **adresse IP virtuelle locale**, l'application utilise une adresse qui ne change pas. SafeKit effectue le reroutage dans le **noyau** : l'application ne voit pas le basculement. Avec DNAT, l'adresse utilisée par l'application change.

Une adresse IP virtuelle conserve-t-elle l'adresse IP d'origine du client ?

Oui. SafeKit n'utilise pas de traduction d'adresse source (SNAT). Comme l'adresse IP virtuelle est locale sur le serveur actif, l'application reçoit l'**adresse IP d'origine du client**.

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}
