---
title: "Comment fonctionne une adresse IP virtuelle dans un cluster à haute disponibilité ?"
canonical: "https://safekit.eviden.com/fr/best-practises/how-a-virtual-ip-address-works/"
description: "Comment SafeKit déplace une adresse IP virtuelle en cas de basculement : requête ARP gratuite au sein du même sous-réseau, équilibreur de charge, interface de ligne de commande cloud ou BGP entre sous-réseaux. Pourquoi une adresse IP virtuelle locale est-elle importante ?"
category: "best-practises"
lang: "fr"
topics: "Qu’est-ce qu’une adresse IP virtuelle dans un cluster haute disponibilité ? Implémentation des adresses IP virtuelles dans SafeKit. Fonctionnement d’une adresse IP virtuelle au sein d’un même sous-réseau (cluster mirror). Fonctionnement d’une adresse IP virtuelle entre différents sous-réseaux avec un équilibreur de charge (cluster mirror). Fonctionnement d’une adresse IP virtuelle entre différents sous-réseaux avec les interfaces de ligne de commande du fournisseur cloud (cluster mirror). Fonctionnement d’une adresse IP virtuelle entre différents sous-réseaux avec BGP (cluster mirror). Fonctionnement de la redirection DNS entre différents sous-réseaux (cluster mirror). Fonctionnement de l’équilibrage de charge des adresses IP virtuelles dans un cluster farm sur un même sous-réseau. Fonctionnement d’une adresse IP virtuelle équilibrée entre différents sous-réseaux (cluster farm). Comparaison : implémentation des adresses IP virtuelles, latence et transparence des applications. Foire aux questions sur les adresses IP virtuelles. 🔍 Découvrez SafeKit"
---

# Comment fonctionne une adresse IP virtuelle dans un cluster à haute disponibilité ? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## Qu’est-ce qu’une adresse IP virtuelle dans un cluster à haute disponibilité ? {#virtual-ip-definition}

Une **adresse IP virtuelle** est l’adresse unique utilisée par les clients pour se connecter à une application au sein d’un [cluster à haute disponibilité](</fr/>). Cette adresse IP virtuelle n’est pas liée à un serveur spécifique. En cas de basculement, elle est automatiquement attribuée au serveur exécutant l’application. Les clients n’ont aucune modification de leur configuration.

**Principe fondamental de SafeKit :** l’adresse IP virtuelle est **configurée localement sur le serveur** exécutant l’application. L’application démarre sur cette adresse IP virtuelle et reçoit l’adresse IP du client d’origine. C’est pourquoi de nombreuses applications fonctionnent correctement avec SafeKit sans aucune modification. SafeKit propose deux types d’adresses IP virtuelles :

  * **Adresse IP virtuelle principale/de secours avec un cluster mirror :** l’adresse IP virtuelle est active uniquement sur le serveur principal. En cas de basculement, elle est transférée vers le serveur de secours.
  * **Équilibrage de charge réseau avec une adresse IP virtuelle au sein d’un cluster <span class="notranslate farm-term" translate="no">farm</span> :** l’adresse IP virtuelle est active simultanément sur tous les serveurs. Le trafic est ainsi réparti entre eux.

## Implémentation d’une adresse IP virtuelle dans SafeKit {#safekit-virtual-ip-implementation}

Cet article explique comment SafeKit déplace l’adresse IP virtuelle dans chaque architecture réseau :

  * **Sur le même sous-réseau ou en réseau local étendu (clusters [mirror](#virtual-ip-same-subnet-failover) et [<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-same-subnet)),** SafeKit configure l’adresse IP virtuelle sur le serveur et envoie une **requête ARP gratuite (GARP)**. Aucun matériel externe n’est requis. Il s’agit de la solution la plus transparente (tout est géré par SafeKit).
  * **Différents sous-réseaux avec un équilibreur de charge (clusters [mirror](#virtual-ip-different-subnets-failover) et [<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-different-subnets)) :** l’équilibreur de charge utilise le **contrôle d’intégrité** SafeKit pour envoyer le trafic vers le serveur approprié (l’équilibreur de charge est configuré par l’intégrateur).
  * **[Différents sous-réseaux avec des CLI de fournisseur de cloud](#virtual-ip-cloud-cli-failover) (cluster mirror) :** le script SafeKit `start_prim` appelle la CLI du cloud pour déplacer l’adresse IP virtuelle (script écrit par l’intégrateur).
  * **[Différents sous-réseaux avec BGP](#virtual-ip-bgp-failover) (cluster mirror) :** le serveur principal annonce l’adresse IP virtuelle aux routeurs (script écrit par l’intégrateur).
  * **[Différents sous-réseaux avec redirection DNS](#virtual-ip-vs-dns-redirection-failover) (cluster mirror) :** le script SafeKit `start_prim` modifie l’enregistrement DNS du nom virtuel pour pointer vers l’adresse IP physique du nouveau serveur principal (script écrit par l’intégrateur). Il n’existe pas d’adresse IP virtuelle unique, et cette méthode n’est pas fiable pour tous les clients.

Également dans cet article :

  * [Comparaison : implémentation d’adresses IP virtuelles, latence et transparence des applications](#virtual-ip-methods-comparison)
  * [Questions fréquentes sur l’adresse IP virtuelle](#virtual-ip-faq)
  * [🔍 Découvrez SafeKit](#hub)

![Diagramme comparatif du comportement des adresses IP virtuelles dans Eviden SafeKit : clusters Mirror affichant une floating IP sur le nœud actif par rapport aux clusters farm affichant un équilibrage de charge réseau sur tous les nœuds.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Mise en œuvre d’adresses IP virtuelles pour les clusters mirror et les <span class="notranslate farm-term" translate="no">farm</span> dans SafeKit.**

## Comment fonctionne une adresse IP virtuelle dans le même sous-réseau (cluster mirror) {#virtual-ip-same-subnet-failover}

- [Test de l’adresse IP virtuelle principale/de secours dans un cluster mirror SafeKit](/fr/best-practises/test-primary-backup-vip-mirror/)

### Basculement automatique et réacheminement du réseau dans un sous-réseau local {#automated-failover--network-rerouting-in-a-local-subnet}

Sur un réseau local, **SafeKit** gère automatiquement l’adresse IP virtuelle et le basculement de l’application.

### Cluster mirror local : basculement à 2 nœuds sous Windows ou Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![mécanisme de basculement d’adresse IP virtuelle SafeKit entre deux serveurs du même sous-réseau](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

Dans un **cluster mirror SafeKit**, les deux nœuds appartiennent au même sous-réseau. La haute disponibilité repose sur une **adresse IP virtuelle**. SafeKit gère cette adresse IP virtuelle au niveau de la pile réseau du système d’exploitation. Aucun matériel spécifique n’est requis. L’adresse IP virtuelle est ajoutée aux adresses IP physiques des serveurs 1 et 2 par **aliasage**. Les clients se connectent systématiquement à l’adresse IP virtuelle.

#### Alias IP et adresses IP virtuelles multiples (VIP) dans SafeKit {#safekits-advanced-ip-aliasing--multiple-virtual-ip-support}

L’adresse IP virtuelle est une troisième adresse IP qui circule entre les nœuds. SafeKit peut gérer **plusieurs adresses IP virtuelles** au sein d’un même cluster. Elles peuvent être attribuées à la même carte réseau ou à des cartes réseau différentes. Ainsi, chaque service dispose de sa propre adresse IP virtuelle.

#### Le mécanisme de basculement : ARP gratuit (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

Le basculement ne nécessite aucune intervention manuelle. En fonctionnement normal, l’adresse IP virtuelle est associée à l’**adresse MAC du serveur 1 (mac1)**. En cas de défaillance du serveur 1, SafeKit effectue trois actions :

  * **Création d’alias d’adresse IP virtuelle :** SafeKit configure l’adresse IP virtuelle comme un alias sur la carte réseau du serveur 2, le nouveau serveur principal. Le système d’exploitation envoie ensuite des messages sur le réseau pour annoncer l’adresse IP virtuelle.
  * **GARP :** SafeKit envoie également des messages **ARP gratuits (GARP)**. Les commutateurs réseau et les clients mettent à jour leur cache ARP. L’adresse IP virtuelle est désormais associée à l’**adresse MAC du serveur 2 (mac2)**.
  * **Récupération de l’application :** SafeKit redémarre les services de l’application sur le serveur 2.


#### Centres de données distants et VLAN étendus {#remote-data-centers--extended-vlans}

La **solution de même sous-réseau décrite ci-dessus** convient également à **la reprise après sinistre (PRA)** entre sites distants et constitue souvent le meilleur choix lorsque les sites sont connectés par un **réseau local étendu ou un VLAN étendu**. Les deux sites se trouvent dans un seul sous-réseau. Le réseau est plus simple et aucun protocole de routage complexe n’est requis.

> **⚠️ Remarque :** Le réacheminement de couche 2 avec ARP gratuit est la **solution la plus transparente** pour les applications. L’application reçoit l’adresse IP client d’origine et l’adresse IP virtuelle est configurée localement. **De nombreuses applications nécessitent** une adresse IP virtuelle locale. Sans elle, elles **risquent de ne pas fonctionner correctement**. Dans cette configuration au sein du même sous-réseau, SafeKit prend en charge l’intégralité du mécanisme ; aucune intégration spécifique n’est donc requise.

## Comment fonctionne une adresse IP virtuelle sur différents sous-réseaux avec un équilibreur de charge (cluster mirror) {#virtual-ip-different-subnets-failover}

### Équilibreur de charge avec contrôles d’intégrité SafeKit {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![Schéma d’un basculement d’adresse IP virtuelle utilisant un équilibreur de charge sur deux sous-réseaux différents](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

Lorsque les nœuds se trouvent dans **des sous-réseaux différents**, l’ARP gratuit ne peut pas déplacer l’adresse IP virtuelle. Dans ce cas, l’adresse IP virtuelle se trouve sur un **équilibreur de charge**. L’équilibreur de charge répartit le trafic vers le serveur principal.

SafeKit fournit une **URL de vérification de l’état de santé** sur chaque nœud :

  * **Nœud principal (PRIM) :** renvoie `HTTP 200 OK`.. L’équilibreur de charge achemine le trafic vers ce nœud.
  * **Secondaire (SECOND) :** renvoie une erreur `HTTP 404 NOT FOUND`.. L’équilibreur de charge n’envoie aucun trafic à ce nœud.

En cas de basculement, SafeKit modifie les réponses et l’équilibreur de charge redirige le trafic vers le nouveau serveur principal. Il s’agit de la solution standard entre **les zones de disponibilité** sur [**AWS**](</fr/solutions/aws-high-availability-cluster-synchronous-replication-failover/>), [**Azure**](</fr/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) et [**Google Cloud**](</fr/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>).

> **⚠️ Remarque :** SafeKit assure le contrôle d’intégrité. Votre réseau ou votre fournisseur de cloud fournit l’équilibreur de charge.

### Le problème : l’équilibreur de charge est propriétaire de l’adresse IP virtuelle. {#the-load-balancer-pitfall-virtual-ip-on-the-frontend-nat-to-the-physical-ip}

Avec un équilibreur de charge uniquement, les clients se connectent à l’adresse IP virtuelle. L’équilibreur de charge traduit cette adresse IP virtuelle (NAT) en l’**adresse IP physique** du serveur principal. Le client utilise l’adresse IP virtuelle, mais le serveur utilise son adresse IP physique. Le serveur ne voit pas l’adresse IP virtuelle.

### Conservez l’adresse IP virtuelle configurée localement sur le serveur principal. {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

Certaines applications utilisent l’adresse IP virtuelle comme adresse de serveur. Elles ne fonctionnent correctement que si l’adresse IP virtuelle est également **configurée localement sur le serveur principal**. Ensuite :

  * les services peuvent démarrer sur l’adresse IP virtuelle ;
  * le serveur peut accéder à ses propres services grâce à l’adresse IP virtuelle ;
  * L’authentification fonctionne avec l’adresse IP virtuelle.

**Bonne pratique :** utilisez un mode d’équilibrage de charge qui conserve l’adresse IP virtuelle comme adresse de destination (par exemple, Floating IP ou Direct Server Return). Configurez ensuite l’adresse IP virtuelle localement sur le serveur principal. La méthode dépend du sous-réseau de l’adresse IP virtuelle.

  * **L’adresse IP virtuelle se trouve dans le même sous-réseau que les adresses IP physiques des serveurs :** conservez la section `<vip>` dans le module SafeKit. SafeKit configure automatiquement l’adresse IP virtuelle comme un alias sur la carte réseau de l’adresse IP physique.
  * **L’adresse IP virtuelle se trouve sur un sous-réseau différent :** ne configurez pas `<vip>` dans SafeKit. Utilisez le script `start_prim` pour configurer l’adresse IP virtuelle sur une interface dédiée, telle que l’interface de bouclage, avant le démarrage de l’application. Utilisez le script `stop_prim` pour supprimer l’adresse IP virtuelle après l’arrêt de l’application. Ces commandes sont générées par l’intégrateur et ne sont pas fournies par SafeKit.


## Comment fonctionne une adresse IP virtuelle sur différents sous-réseaux avec les interfaces de ligne de commande du fournisseur de cloud (cluster mirror) {#virtual-ip-cloud-cli-failover}

### Pourquoi l’ARP gratuit ne fonctionne pas dans le cloud {#why-gratuitous-arp-does-not-work-in-public-clouds}

Les réseaux cloud (AWS, Azure, Google Cloud) **ignorent les requêtes ARP gratuites**. Ils acheminent le trafic uniquement vers les adresses IP attribuées par la plateforme cloud. SafeKit configure l’adresse IP virtuelle sur le serveur principal, mais le réseau cloud n’envoie pas le trafic de cette adresse IP virtuelle vers ce serveur.

### Déplacer l’adresse IP virtuelle avec l’interface de ligne de commande du cloud {#moving-the-virtual-ip-through-the-cloud-api-in-safekit-failover-scripts}

En l’absence d’un équilibreur de charge, l’interface de ligne de commande (CLI) du fournisseur de cloud peut être intégrée au **script `start_prim`** de SafeKit afin de mettre à jour la configuration réseau du cloud avant le démarrage de l’application. La CLI peut attribuer l’adresse IP virtuelle au nœud qui deviendra principal ou modifier la route cloud pour diriger le trafic IP virtuel vers ce nœud.

L’**adresse IP virtuelle reste locale** au serveur principal. Il n’y a **pas de NAT** et l’adresse IP d’origine du client reste inchangée.

### Responsabilité de l’intégrateur {#integrator-responsibility}

L’**intégrateur** doit ajouter les commandes CLI du cloud au script `start_prim`. Ces commandes ne sont **pas fournies par le produit SafeKit**. Elles dépendent du fournisseur de cloud, de l’architecture réseau et des règles de sécurité du client.

### Contraintes {#constraints-of-the-cli-approach}

  * L’interface de ligne de commande cloud doit être installée sur les deux nœuds. Chaque nœud nécessite une identité cloud disposant de droits réseau.
  * Le script doit gérer les erreurs et les nouvelles tentatives.
  * Le basculement est probablement plus lent qu’avec un équilibreur de charge.

## Comment fonctionne une adresse IP virtuelle sur différents sous-réseaux avec BGP (cluster mirror) {#virtual-ip-bgp-failover}

### Réacheminement d’IP virtuelle avec BGP {#layer-3-virtual-ip-rerouting-with-bgp-route-advertisement}

Avec le protocole BGP (Border Gateway Protocol), l’adresse IP virtuelle est généralement configurée sur une interface de bouclage du serveur principal par le script `start_prim` avant le démarrage de l’application. Le serveur principal annonce ensuite l’adresse IP virtuelle aux routeurs sous forme de route /32.

En cas de basculement, le script `stop_prim` sur l’ancien serveur principal arrête l’application, supprime l’adresse IP virtuelle de l’interface de bouclage et retire la route /32 des routeurs. Si l’ancien serveur principal tombe en panne, `stop_prim` ne s’exécute pas, mais les routeurs perdent la session BGP et suppriment automatiquement la route.

### Avantages et conditions préalables {#benefits-and-prerequisites}

  * **L’adresse IP virtuelle reste locale, il n’y a pas de NAT et l’adresse IP du client ne change pas.**
  * Il fonctionne sur plusieurs sous-réseaux et sites. Vous n’avez pas besoin d’un VLAN étendu.
  * Vous aurez besoin de routeurs BGP et de l’aide de votre équipe réseau. Dans le cloud, vous aurez besoin d’un service de serveur de routage fourni par votre fournisseur de services cloud.

> **⚠️ Remarque :** L’intégration BGP utilise les scripts SafeKit et votre infrastructure de routage. L’**intégrateur** doit rédiger les commandes dans les scripts `start_prim` et `stop_prim`. Ces scripts ne sont **pas fournis par SafeKit**. Validez la solution avec votre équipe réseau avant la mise en production.

## Comment fonctionne la redirection DNS entre différents sous-réseaux (cluster mirror) {#virtual-ip-vs-dns-redirection-failover}

### Réacheminement DNS avec le script `start_prim` {#dns-rerouting-with-the-start-prim-script}

Avec la redirection DNS, il n’y a **pas d’adresse IP virtuelle unique**. Les clients se connectent à un **nom virtuel** (le nom DNS). En cas de basculement, le script `start_prim` sur le nouveau serveur principal lance l’application, puis modifie l’enregistrement DNS du nom virtuel pour pointer vers l’**adresse IP physique** du nouveau serveur principal.

Le script `stop_prim` est inutile. Si l’ancien serveur principal tombe en panne, le nouveau serveur principal écrase l’enregistrement DNS.

### Exemple : résolution DNS et clients bloqués {#the-technical-scenario-dns-resolution-and-the-stuck-client}

![Diagramme illustrant la résolution de noms DNS vers l’adresse IP physique 1 dans un cluster à haute disponibilité](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 Résolution DNS et clients bloqués sur l’adresse IP physique 1 dans un cluster à haute disponibilité

#### Avant le basculement : le nom pointe vers l’adresse IP physique 1 {#current-state-resolution-to-physical-ip-1}

**Les clients 1** et **2** interrogent le système DNS pour obtenir l’adresse IP du nom virtuel. Le système DNS renvoie **l’adresse IP physique 1.** Les clients établissent ensuite une connexion réseau avec cette adresse.

#### Après le basculement : le nom pointe vers l’adresse IP physique 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

Le serveur 1 tombe en panne. Le script `start_prim` sur le serveur 2 modifie l’enregistrement DNS pour pointer vers **l’adresse IP physique 2.** Les clients se connectent à l’adresse IP physique 2 uniquement si toutes les conditions suivantes sont remplies :

  * La **durée de vie (TTL)** a expiré sur tous les serveurs DNS entre le client et l’enregistrement DNS.
  * Le cache DNS local des clients 1 et 2 est vide.
  * L’application ferme sa connexion et effectue une *nouvelle* recherche DNS.

Si l’une des conditions est fausse, **les clients 1 et 2 restent bloqués** sur l’adresse IP physique 1. Le service est hors service, même si l’enregistrement DNS est correct.

### Limites et conditions préalables {#the-two-black-boxes-of-dns-redirection}

  * **Cache DNS :** De nombreux fournisseurs d’accès Internet et serveurs DNS d’entreprise ignorent les valeurs TTL courtes. Ils peuvent conserver l’ancienne adresse IP physique (1) pendant des minutes, voire des heures.
  * **Comportement des applications :** De nombreuses applications (par exemple, les services Java ou les navigateurs Web) n’effectuent une requête DNS qu’une seule fois, au démarrage. Elles conservent ensuite la première adresse IP utilisée.
  * **L’adresse IP change à chaque basculement :** l’application ne dispose pas d’une adresse IP virtuelle locale qui reste la même. Les applications qui enregistrent leur propre adresse IP risquent de ne pas fonctionner.
  * **Prérequis :** une durée de vie (TTL) courte pour l’enregistrement DNS (par exemple, de 30 à 60 secondes) et les droits de mise à jour de la zone DNS depuis les deux serveurs.

> **⚠️ Remarque :** L’**intégrateur** doit saisir les commandes de mise à jour DNS dans le script `start_prim`. Ces commandes ne sont **pas fournies par SafeKit** et dépendent du serveur DNS (DNS Windows, BIND ou DNS cloud).

### Conclusion {#conclusion}

La redirection DNS n’est pas une solution de haute disponibilité fiable. Utilisez-la uniquement si tous les clients effectuent une nouvelle requête DNS lors de leur reconnexion. Pour un basculement immédiat et transparent, utilisez une **adresse IP virtuelle** : sur un réseau local étendu, avec un équilibreur de charge, via l’interface de ligne de commande de votre fournisseur cloud ou avec BGP.

## Comment fonctionne l’équilibrage de charge IP virtuel dans un cluster <span class="notranslate farm-term" translate="no">farm</span> sur le même sous-réseau {#virtual-ip-load-balancing-same-subnet}

- [Test de l’adresse IP virtuelle d’équilibrage de charge dans un cluster farm SafeKit](/fr/best-practises/test-load-balancing-vip-farm/)

### Équilibrage de charge au niveau du noyau, avec redondance {#scalable-performance-kernel-level-load-balancing--redundancy}

En cas de forte affluence, SafeKit répartit la charge de travail entre plusieurs serveurs actifs. Si l’un d’eux tombe en panne, les autres prennent le relais.

### Architecture de cluster <span class="notranslate farm-term" translate="no">Farm</span> : répartition de charge entre nœuds Windows ou Linux {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


![Schéma d’une adresse IP virtuelle à charge équilibrée au sein du même sous-réseau](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

Dans un **cluster <span class="notranslate farm-term" translate="no">farm</span> à répartition de charge**, les clients se connectent à une adresse IP virtuelle et les requêtes sont réparties simultanément entre plusieurs serveurs. Cet exemple illustre deux nœuds. Vous pouvez ajouter d’autres nœuds au cluster. Sur le même sous-réseau, l’adresse IP virtuelle est configurée avec un alias IP sur la carte réseau de **chaque serveur** du cluster.

#### Partage du trafic : le filtre du noyau {#traffic-distribution-the-kernel-level-filter}

Dans un cluster <span class="notranslate farm-term" translate="no">farm</span>, un **filtre SafeKit intégré au noyau** répartit le trafic. Son fonctionnement est le suivant :

  * **Mappage ARP :** Dans le cache ARP des clients, l’adresse IP virtuelle est liée à une adresse MAC (par exemple, `mac1` du serveur 1).
  * **Analyse des paquets :** le serveur 1 reçoit les paquets. Le filtre noyau SafeKit lit l’**adresse IP du client** ou le **port TCP** de chaque paquet.
  * **Répartition de la charge :** le filtre détermine quels paquets sont traités par le serveur 1 et lesquels sont envoyés aux autres nœuds (par exemple, le serveur 2). Pour envoyer un paquet à un autre nœud, le filtre remplace l’**adresse MAC de destination** par celle du nœud destinataire. L’adresse IP de destination reste l’adresse IP virtuelle. La charge de travail est ainsi répartie entre les serveurs.


#### Basculement et réacheminement avec ARP gratuit {#failover-and-rerouting-with-gratuitous-arp}

En cas de défaillance du serveur 1, SafeKit envoie une requête **ARP gratuite (GARP)**. Les clients mettent à jour leur cache ARP avec `mac2` du serveur 2. Ils sont ensuite immédiatement redirigés vers les autres nœuds de la farm.

#### Déploiement sur des sites distants {#deployment-in-remote-sites}

Cette solution d’équilibrage de charge fonctionne également entre **centres de données distants**, si les sites sont connectés par un **réseau local étendu (LAN) ou un réseau local à large bande (VLAN)**. Tous les sites se trouvent alors dans le même sous-réseau. Il s’agit de la configuration la plus efficace pour les clusters <span class="notranslate farm-term" translate="no">farm</span> sur plusieurs sites.

{{%  insert-safekit-farm-video-fr  %}}

## Comment fonctionne une adresse IP virtuelle à charge équilibrée sur différents sous-réseaux (cluster <span class="notranslate farm-term" translate="no">farm</span>) {#virtual-ip-load-balancing-different-subnets}

### Trafic à travers les sous-réseaux cloud {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

Un cluster <span class="notranslate farm-term" translate="no">farm</span> peut répartir le travail d’une application entre plusieurs zones de disponibilité et sous-réseaux.

### Clusters <span class="notranslate farm-term" translate="no">farm</span> inter-sous-réseaux : plusieurs nœuds Windows ou Linux {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


![Schéma d’un cluster farm à charge équilibrée fonctionnant sur deux sous-réseaux différents](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

Lorsque les nœuds <span class="notranslate farm-term" translate="no">farm</span> se trouvent dans **différents sous-réseaux** (par exemple, dans plusieurs zones de disponibilité cloud), l’**adresse IP virtuelle** est placée sur un **équilibreur de charge** externe. Ce dernier répartit le trafic vers les adresses IP physiques des serveurs de chaque sous-réseau.

#### règles de routage du trafic et d’équilibrage de charge {#intelligent-traffic-routing--load-balancing-rules}

L’équilibreur de charge répartit les requêtes client selon deux critères :

  * **Règles d’équilibrage de charge :** par exemple, l’**adresse IP du client** ou le **port TCP du client**.
  * **Disponibilité des nœuds :** l’équilibreur de charge envoie le trafic uniquement aux nœuds sains, selon le contrôle d’intégrité de SafeKit.


> **⚠️ Remarque :** SafeKit assure le contrôle d’intégrité. Votre réseau ou votre fournisseur de cloud fournit l’équilibreur de charge.

#### Contrôle de santé SafeKit {#safekit-health-check-mechanism}

SafeKit fournit une **URL de vérification d’état** sur chaque serveur de la <span class="notranslate farm-term" translate="no">farm</span>. L’équilibreur de charge la consulte pour connaître l’état de chaque serveur.

  * **Nœud opérationnel :** le contrôle d’intégrité renvoie `HTTP 200 OK`.. L’équilibreur de charge achemine le trafic vers ce serveur.
  * **Nœud hors service :** en cas de défaillance d’un serveur ou d’une application, SafeKit renvoie `HTTP 404 NOT FOUND` (ou le serveur ne répond pas). L’équilibreur de charge cesse immédiatement d’envoyer du trafic à ce nœud.


#### Déploiement dans le cloud : AWS, Azure et GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Il s’agit de l’architecture standard pour **les clusters <span class="notranslate farm-term" translate="no">farm</span> dans le cloud**. Si un sous-réseau ou une zone est hors service, les autres nœuds continuent de traiter le trafic. Cette architecture est prise en charge par [**Amazon AWS**](</fr/solutions/aws-load-balancing-cluster-failover/>) (AWS Network Load Balancer), [**Microsoft Azure**](</fr/solutions/azure-load-balancing-cluster-failover/>) (Azure Load Balancer) et [**Google Cloud (GCP)**](</fr/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing).


## Comparaison : implémentation d’adresses IP virtuelles, latence et transparence des applications {#virtual-ip-methods-comparison}

**Comparaison des méthodes de redirection d’adresse IP virtuelle et de la redirection DNS pour la haute disponibilité et la reprise après sinistre.**

Environnement et cas d’utilisation | Type de haute disponibilité | Méthode de redirection | Mis en œuvre par | latence du réseau | Transparence des applications et IP locale  
---|---|---|---|---|---  
Principal/de secours (haute disponibilité) | Groupe Mirror | Prise de contrôle gratuite d’ARP/MAC | ✅ Produit SafeKit | Très faible : temps de détection de la panne et d’envoi du GARP | Entièrement transparente : l’adresse IP virtuelle est locale au nœud actif. L’adresse IP du client reste inchangée.  
Équilibrage de charge (actif/actif) | groupement <span class="notranslate farm-term" translate="no">Farm</span> | Filtre réseau du noyau / GARP | ✅ Produit SafeKit | Très faible : temps nécessaire pour détecter la panne et changer les filtres réseau | Transparence totale : l’adresse IP virtuelle est locale sur tous les nœuds. L’adresse IP du client reste inchangée.  
Même sous-réseau / LAN étendu (VLAN étendu) | Reprise après sinistre (centres de données distants) | Aliasage IP / GARP | ✅ Produit SafeKit (le VLAN étendu est fourni par l’équipe réseau) | Faible : dépend du temps d’aller-retour (RTT) du VLAN étendu | Transparence totale : l’adresse IP virtuelle est locale aux nœuds. L’adresse IP du client reste inchangée.  
Sous-réseaux différents : équilibreur de charge uniquement | Reprise après sinistre (centres de données distants / cloud) | équilibreur de charge externe | 🛠️ Intégrateur : configuration de l’équilibreur de charge (SafeKit assure le contrôle d’intégrité) | Niveau de difficulté moyen : dépend de l’intervalle de vérification de l’état de l’équilibreur de charge. | ⚠️ Transparence partielle en cas d’utilisation de SNAT/DNAT. L’adresse IP virtuelle **n’est pas** locale sur les nœuds. L’adresse IP du client peut **ne pas** être conservée. L’application doit prendre en charge cette fonctionnalité.  
Différents sous-réseaux : équilibreur de charge + adresse IP virtuelle locale SafeKit | Reprise après sinistre (centres de données distants / cloud) | Équilibreur de charge externe avec Floating IP / Direct Server Return | 🛠️ Intégrateur : configuration de l’équilibreur de charge (SafeKit assure le contrôle d’intégrité) | Niveau de difficulté moyen : dépend de l’intervalle de vérification de l’état de l’équilibreur de charge. | Bonne transparence : l’adresse IP virtuelle est locale au nœud principal et correspond à l’adresse de destination.
Différents sous-réseaux : interface de ligne de commande du cloud | Reprise après sinistre (cloud) | API Cloud : l’adresse IP privée ou une route cloud est déplacée vers le nouveau serveur principal. | 🛠️ Intégrateur : commandes CLI cloud dans le script `start_prim` | Moyen à élevé : dépend du temps de réponse de l’API cloud | Entièrement transparente : l’adresse IP virtuelle est locale au nœud principal. L’adresse IP du client reste inchangée.
Différents sous-réseaux : BGP | Reprise après sinistre (centres de données distants / cloud) | Route /32 annoncée avec BGP | 🛠️ Intégrateur : Commandes BGP dans les scripts `start_prim` et `stop_prim` | Faible à moyen : dépend du temps de convergence BGP | Transparence totale : l’adresse IP virtuelle est locale au nœud principal. L’adresse IP du client reste inchangée. Nécessite des routeurs BGP.  
Redirection DNS : aucune adresse IP virtuelle | Reprise après sinistre (centres de données distants) | Modification de l’enregistrement DNS (nom / adresse IP physique) | 🛠️ Intégrateur : Commandes de mise à jour DNS dans le script `start_prim` | Élevée et imprévisible : dépend de la durée de vie (TTL) du DNS et du cache DNS du client | ⚠️ Non fiable : le client doit effectuer une nouvelle requête DNS. Souvent, les clients conservent l’ancienne adresse IP reçue au démarrage et ne sont pas redirigés après un basculement.  
  
## Questions fréquentes sur l’adresse IP virtuelle {#virtual-ip-faq}

### IP virtuelle et réseau {#virtual-ip--networking}

Qu’est-ce qu’une adresse IP virtuelle et en quoi diffère-t-elle d’une adresse IP physique ?

Une **adresse IP physique** est associée à une carte réseau. Une **adresse IP virtuelle** n’est pas liée à un matériel. Dans un cluster SafeKit, les clients utilisent toujours l’adresse IP virtuelle. En cas de défaillance du serveur principal, l’adresse IP virtuelle bascule automatiquement vers un nœud fonctionnel. Aucune modification de la configuration client n’est nécessaire.

Ai-je besoin d’un équilibreur de charge matériel pour utiliser une adresse IP virtuelle ?

Non. **SafeKit** gère l’adresse IP virtuelle par logiciel. Au sein du même sous-réseau, il utilise **l’aliasage d’adresses IP** et **le protocole GARP (Gratuit ARP)** pour rediriger le trafic. Aucun répartiteur de charge externe ni serveur proxy n’est nécessaire.

Qu’est-ce que l’ARP gratuite (GARP) et pourquoi est-elle utilisée ?

**GARP (Gratuitous ARP)** est un message réseau envoyé à tous les périphériques. Il met à jour les tables ARP des commutateurs et routeurs. Lors d’un basculement, le nouveau serveur principal envoie un message GARP indiquant que l’**adresse IP virtuelle** est désormais associée à l’adresse MAC du nouveau serveur principal. Le trafic est alors immédiatement redirigé.

Puis-je associer un nom DNS à une adresse IP virtuelle ?

**Oui.** Créez un enregistrement A standard pour l’adresse IP virtuelle. La redirection s’effectue au **niveau de l’adresse IP virtuelle** (via ARP ou redirection réseau), **et non au niveau DNS**. Vous n’aurez donc aucun problème de latence DNS ni de TTL, et le basculement restera **transparent pour l’application**.

### Architectures cloud et avancées {#cloud--advanced-architectures}

Comment fonctionne une adresse IP virtuelle dans le cloud (AWS, Azure, GCP) ?

Dans le cloud, les messages GARP de couche 2 ne sont pas disponibles pour le réacheminement d’une adresse IP virtuelle. SafeKit est compatible avec **les équilibreurs de charge cloud** (AWS ELB, Azure LB ou Google GCLB). SafeKit fournit une **URL de vérification d’état**. L’équilibreur de charge la lit et achemine le trafic vers le nœud actif.

Un réseau local étendu est-il préférable à un équilibreur de charge pour la reprise après sinistre ?

**Oui**. Entre centres de données distants, un **réseau local étendu (VLAN étendu)** est souvent préférable car le basculement reste **transparent pour l’application**. L’**adresse IP virtuelle ne change pas** ; l’application et ses clients continuent donc d’utiliser la même adresse après un basculement entre centres de données.

Quelles sont les limites de la redirection DNS par rapport à une adresse IP virtuelle ?

**La redirection DNS** dépend de la **durée de vie (TTL)** et du cache DNS du client. La récupération peut prendre plusieurs heures. De plus, **les clients qui n’effectuent pas une nouvelle requête DNS restent bloqués** sur le serveur défaillant. Une **adresse IP virtuelle** est immédiatement redirigée via des messages GARP de couche 2. Le cache DNS du client est sans effet.

### Transparence et sécurité {#transparency--security}

Pourquoi une adresse IP virtuelle locale est-elle importante pour la transparence des applications ?

Avec une **adresse IP virtuelle** locale, l’application utilise une adresse fixe. SafeKit gère la redirection au niveau du **noyau**. L’application ne détecte pas le basculement. Avec DNAT, l’adresse utilisée par l’application change.

Une adresse IP virtuelle conserve-t-elle l’adresse IP d’origine du client ?

Oui. SafeKit n’utilise pas de NAT source (SNAT). L’adresse IP virtuelle est locale au serveur actif ; l’application reçoit donc l’**adresse IP du client d’origine**. Ceci est important pour les audits de sécurité, la persistance des sessions et les journaux de conformité réglementaire.


{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}
