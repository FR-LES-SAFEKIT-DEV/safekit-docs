---
title: "Comment fonctionne une adresse IP virtuelle dans un cluster à haute disponibilité ?"
canonical: "https://safekit.eviden.com/fr/best-practises/how-a-virtual-ip-address-works/"
description: "Comment SafeKit déplace une IP virtuelle lors d’un basculement : ARP gratuit dans le même sous-réseau, équilibreur de charge, CLI cloud ou BGP entre les sous-réseaux. Pourquoi une IP virtuelle locale est importante."
category: "best-practises"
lang: "fr"
topics: "Qu’est-ce qu’une adresse IP virtuelle dans un cluster haute disponibilité ?, Implémentation de l’IP virtuelle dans SafeKit, Comment une IP virtuelle fonctionne dans le même sous-réseau (cluster mirror), Comment une IP virtuelle fonctionne sur différents sous-réseaux avec un équilibreur de charge (cluster mirror), Comment une IP virtuelle fonctionne sur différents sous-réseaux avec les CLI des fournisseurs de cloud (cluster mirror), Comment une IP virtuelle fonctionne sur différents sous-réseaux avec BGP (cluster mirror), Comment la redirection DNS fonctionne sur différents sous-réseaux (cluster mirror), Comment l’équilibrage de charge d’IP virtuelle fonctionne dans un cluster farm sur le même sous-réseau, Comment une IP virtuelle à équilibrage de charge fonctionne sur différents sous-réseaux (cluster farm), Comparaison : implémentation de l’IP virtuelle, latence et transparence de l’application, Questions fréquemment posées sur l’IP virtuelle, 🔍 Explorer SafeKit"
translation: "translate_md 2026-11-05.5 | glossaire 2026-11-05.10 | Translation LLM | 12 expressions"
---

# Comment fonctionne une adresse IP virtuelle dans un cluster à haute disponibilité ? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## Qu’est-ce qu’une adresse IP virtuelle dans un cluster haute disponibilité ? {#virtual-ip-definition}

Une **adresse IP virtuelle** est l’adresse unique que les clients utilisent pour se connecter à une application dans un [cluster haute disponibilité](</fr/>). L’IP virtuelle n’est pas liée à un serveur. En cas de basculement, elle se déplace vers le serveur qui exécute l’application. Les clients n’ont pas besoin de modifier leur configuration.

**Principe clé de SafeKit :** l’IP virtuelle est **configurée localement sur le serveur** qui exécute l’application. L’application démarre sur l’IP virtuelle et reçoit l’IP client d’origine. C’est pourquoi de nombreuses applications fonctionnent correctement avec SafeKit sans aucune modification. SafeKit fournit deux types d’IP virtuelle :

  * **IP virtuelle principale/secondaire avec un cluster mirror :** l’IP virtuelle est active uniquement sur le serveur principal. En cas de basculement, elle se déplace vers le serveur secondaire.
  * **Équilibrage de charge réseau avec un cluster <span class="notranslate farm-term" translate="no">farm</span> :** l’IP virtuelle est active sur tous les serveurs en même temps. Le trafic est partagé entre eux.

## Implémentation de l’IP virtuelle dans SafeKit {#safekit-virtual-ip-implementation}

Cet article explique comment SafeKit déplace l’adresse IP virtuelle dans chaque architecture réseau :

  * **Même sous-réseau ou VLAN étendu (clusters [mirror](#virtual-ip-same-subnet-failover) et [<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-same-subnet)) :** SafeKit configure l’IP virtuelle sur le serveur et envoie un **ARP gratuit (GARP)**. Aucun matériel externe n’est nécessaire. C’est la solution la plus transparente (tout est mis en œuvre par le produit SafeKit).
  * **Différents sous-réseaux avec un équilibreur de charge (clusters [mirror](#virtual-ip-different-subnets-failover) et [<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-different-subnets)) :** l’équilibreur de charge utilise le **contrôle d’intégrité** SafeKit pour envoyer le trafic au bon serveur (l’équilibreur de charge est configuré par l’intégrateur).
  * **[Différents sous-réseaux avec les CLI du fournisseur de cloud](#virtual-ip-cloud-cli-failover) (cluster mirror) :** le script `start_prim` de SafeKit appelle la CLI du cloud pour déplacer l’IP virtuelle (script écrit par l’intégrateur).
  * **[Différents sous-réseaux avec BGP](#virtual-ip-bgp-failover) (cluster mirror) :** le serveur principal annonce l’IP virtuelle aux routeurs (script écrit par l’intégrateur).
  * **[Différents sous-réseaux avec redirection DNS](#virtual-ip-vs-dns-redirection-failover) (cluster mirror) :** le script `start_prim` de SafeKit modifie l’enregistrement DNS du nom virtuel vers l’adresse IP physique du nouveau serveur principal (script écrit par l’intégrateur). Il n’y a pas d’adresse IP virtuelle unique, et cette méthode n’est pas fiable pour tous les clients.

Dans cet article également :

  * [Comparaison : mise en œuvre de l’IP virtuelle, latence et transparence de l’application](#virtual-ip-methods-comparison)
  * [Foire aux questions sur l’IP virtuelle](#virtual-ip-faq)
  * [🔍 Explorez SafeKit](#hub)

![Diagramme de comparaison du comportement de l’IP virtuelle dans Eviden SafeKit : clusters mirror affichant une IP flottante sur le nœud actif par rapport à clusters farm affichant l’équilibrage de la charge réseau sur tous les nœuds.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Implémentation d’une IP virtuelle pour clusters mirror et <span class="notranslate farm-term" translate="no">farm</span> dans SafeKit.**

## Fonctionnement d’une adresse IP virtuelle dans le même sous-réseau (cluster mirror) {#virtual-ip-same-subnet-failover}

- [Test de l’adresse IP virtuelle principale/secondaire dans un cluster mirror SafeKit](/fr/best-practises/test-primary-backup-vip-mirror/)

### Basculement automatique et réacheminement du réseau dans un sous-réseau local {#automated-failover--network-rerouting-in-a-local-subnet}

Sur un réseau local, **SafeKit** gère automatiquement l’IP virtuelle et le basculement de l’application.

### Cluster mirror local : basculement sur 2 nœuds sous Windows ou Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![Mécanisme de basculement d’IP virtuelle SafeKit entre deux serveurs du même sous-réseau](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

Dans un **cluster mirror SafeKit**, les deux nœuds se trouvent dans le même sous-réseau. La haute disponibilité utilise une **adresse IP virtuelle**. SafeKit gère l’adresse IP virtuelle dans la pile réseau du système d’exploitation. Aucun matériel spécial n’est requis. L’adresse IP virtuelle est ajoutée aux adresses IP physiques du serveur 1 et du serveur 2 avec **un alias IP**. Les clients se connectent toujours à l’adresse IP virtuelle.

#### Alias IP et adresses IP virtuelles multiples dans SafeKit {#safekits-advanced-ip-aliasing--multiple-virtual-ip-support}

L’IP virtuelle est une troisième adresse IP qui se déplace entre les nœuds. SafeKit peut gérer **plusieurs IP virtuelles** dans un même cluster. Vous pouvez les mettre sur la même carte réseau ou sur des cartes réseau différentes. De cette façon, chaque service peut utiliser sa propre IP virtuelle.

#### Le mécanisme de basculement : ARP gratuit (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

Le basculement ne nécessite aucune action manuelle. En fonctionnement normal, l’IP virtuelle est liée à l’**adresse MAC du serveur 1 (mac1)**. Si le serveur 1 tombe en panne, SafeKit effectue trois actions :

  * **Alias d’IP virtuelle :** SafeKit configure l’IP virtuelle comme un alias sur la carte réseau du serveur 2, le nouveau serveur principal. Le système d’exploitation envoie ensuite des messages sur le réseau pour annoncer l’IP virtuelle.
  * **GARP :** SafeKit envoie également des messages **ARP gratuits (GARP)**. Les commutateurs réseau et les clients mettent à jour leur cache ARP. L’IP virtuelle est maintenant liée à l’**adresse MAC du serveur 2 (mac2)**.
  * **Récupération de l’application :** SafeKit redémarre les services de l’application sur le serveur 2.


#### Centres de données distants et VLAN étendus {#remote-data-centers--extended-vlans}

La **solution de sous-réseau unique décrite ci-dessus** fonctionne également pour **la reprise après sinistre** entre des sites distants. C’est souvent le meilleur choix lorsque les sites sont connectés par un **VLAN étendu** (LAN étendu). Les deux sites se trouvent dans un seul sous-réseau. Le réseau est plus simple et vous n’avez pas besoin de protocoles de routage complexes.

> **⚠️ Remarque :** Le réacheminement au niveau 2 avec ARP gratuit est la **solution la plus transparente** pour les applications. L’application reçoit l’adresse IP client d’origine et l’IP virtuelle est configurée localement. De nombreuses applications **ont besoin d’une IP virtuelle locale**. Sans cela, ces applications **peuvent ne pas fonctionner correctement**. Dans cette configuration de même sous-réseau, SafeKit implémente l’ensemble du mécanisme, de sorte qu’aucun travail d’intégration spécial n’est requis.

## Fonctionnement d’une adresse IP virtuelle sur différents sous-réseaux avec un équilibreur de charge (cluster mirror) {#virtual-ip-different-subnets-failover}

### Équilibreur de charge avec contrôles d’intégrité SafeKit {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![Schéma d’un basculement d’adresse IP virtuelle à l’aide d’un équilibreur de charge sur deux sous-réseaux différents.](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

Lorsque les nœuds se trouvent dans **des sous-réseaux différents**, l’ARP gratuit ne peut pas déplacer l’IP virtuelle. Dans ce cas, l’IP virtuelle se trouve sur un **équilibreur de charge**. L’équilibreur de charge envoie le trafic au serveur principal.

SafeKit fournit une **URL de vérification de l’état de santé** sur chaque nœud :

  * **Principal (PRIM) :** renvoie `HTTP 200 OK`. L’équilibreur de charge envoie le trafic à ce nœud.
  * **Secondaire (SECOND) :** renvoie `HTTP 404 NOT FOUND`. L’équilibreur de charge n’envoie aucun trafic à ce nœud.

En cas de basculement, SafeKit modifie les réponses et l’équilibreur de charge envoie le trafic vers le nouveau serveur principal. Il s’agit de la solution standard entre **les zones de disponibilité** sur [**AWS**](</fr/solutions/aws-high-availability-cluster-synchronous-replication-failover/>), [**Azure**](</fr/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) et [**Google Cloud**](</fr/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>).

> **⚠️ Remarque :** SafeKit fournit la vérification de l’état de santé. Votre réseau ou votre fournisseur de cloud fournit l’équilibreur de charge.

### Le problème : l’équilibreur de charge possède l’adresse IP virtuelle. {#the-load-balancer-pitfall-virtual-ip-on-the-frontend-nat-to-the-physical-ip}

Avec un équilibreur de charge uniquement, les clients se connectent à l’IP virtuelle. L’équilibreur de charge traduit l’IP virtuelle (NAT) en **IP physique** du serveur principal. Le client utilise l’IP virtuelle, mais le serveur utilise son IP physique. Le serveur ne voit pas l’IP virtuelle.

### Conservez l’adresse IP virtuelle configurée localement sur le serveur principal. {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

Certaines applications utilisent l’adresse IP virtuelle comme adresse de serveur. Elles ne fonctionnent correctement que si l’adresse IP virtuelle est également **configurée localement sur le serveur principal**. Dans ce cas :

  * les services peuvent démarrer sur l’adresse IP virtuelle;
  * le serveur peut atteindre ses propres services avec l’adresse IP virtuelle;
  * L’authentification fonctionne avec l’adresse IP virtuelle.

**Bonne pratique :** utilisez un mode d’équilibrage de charge qui conserve l’adresse IP virtuelle comme adresse de destination (par exemple, Floating IP ou Direct Server Return). Ensuite, configurez l’adresse IP virtuelle localement sur le serveur principal. La méthode dépend du sous-réseau de l’adresse IP virtuelle :

  * **L’IP virtuelle se trouve dans le même sous-réseau que les adresses IP physiques des serveurs :** conservez la section `<vip>` dans le module SafeKit. SafeKit configure automatiquement l’IP virtuelle comme un alias sur la carte réseau de l’adresse IP physique.
  * **L’IP virtuelle se trouve dans un sous-réseau différent :** ne configurez pas `<vip>` dans SafeKit. Utilisez le script `start_prim` pour configurer l’IP virtuelle sur une interface dédiée, telle que loopback, avant le démarrage de l’application. Utilisez le script `stop_prim` pour supprimer l’IP virtuelle après l’arrêt de l’application. L’intégrateur écrit ces commandes. Elles ne sont pas fournies par le produit SafeKit.


## Fonctionnement d’une adresse IP virtuelle sur différents sous-réseaux avec les interfaces de ligne de commande des fournisseurs de services cloud (cluster mirror) {#virtual-ip-cloud-cli-failover}

### Pourquoi l’ARP gratuit ne fonctionne pas dans le cloud {#why-gratuitous-arp-does-not-work-in-public-clouds}

Les réseaux cloud (AWS, Azure, Google Cloud) **ignorent les requêtes ARP gratuites**. Ils envoient le trafic uniquement aux adresses IP qui sont attribuées dans la plateforme cloud. SafeKit configure l’IP virtuelle sur le serveur principal, mais le réseau cloud n’envoie pas le trafic IP virtuel à ce serveur.

### Déplacement de l’IP virtuelle avec l’interface de ligne de commande du cloud {#moving-the-virtual-ip-through-the-cloud-api-in-safekit-failover-scripts}

Sans équilibreur de charge, l’interface en ligne de commande du fournisseur de cloud peut être intégrée au **script `start_prim`** de SafeKit pour mettre à jour la configuration du réseau cloud avant le démarrage de l’application. L’interface en ligne de commande peut attribuer l’adresse IP virtuelle au nœud qui devient primaire ou mettre à jour le route cloud pour diriger le trafic de l’adresse IP virtuelle vers ce nœud.

L’**adresse IP virtuelle reste locale** sur le serveur principal. Il n’y a **pas de NAT** et l’adresse IP d’origine du client ne change pas.

### Responsabilité de l’intégrateur {#integrator-responsibility}

L’**intégrateur** doit ajouter les commandes CLI du cloud au script `start_prim`. Ces commandes ne sont **pas fournies par le produit SafeKit**. Elles dépendent du fournisseur de cloud, de la conception du réseau et des règles de sécurité du client.

### Contraintes {#constraints-of-the-cli-approach}

  * L’interface de ligne de commande (CLI) du cloud doit être installée sur les deux nœuds. Chaque nœud a besoin d’une identité cloud avec des droits réseau.
  * Le script doit gérer les erreurs et les nouvelles tentatives.
  * Le basculement est probablement plus lent qu’avec un équilibreur de charge.

## Fonctionnement d’une adresse IP virtuelle sur différents sous-réseaux avec BGP (cluster mirror) {#virtual-ip-bgp-failover}

### Reroutage d’IP virtuelle avec BGP {#layer-3-virtual-ip-rerouting-with-bgp-route-advertisement}

Avec BGP (Border Gateway Protocol), l’IP virtuelle est généralement configurée sur une interface de bouclage du serveur principal par le script `start_prim` avant le démarrage de l’application. Le serveur principal annonce l’IP virtuelle aux routeurs sous la forme d’une route /32.

En cas de basculement, le script `stop_prim` sur l’ancien serveur principal arrête l’application, supprime l’IP virtuelle de l’interface de bouclage et retire la route /32 des routeurs. Si l’ancien serveur principal plante, `stop_prim` ne s’exécute pas, mais les routeurs perdent la session BGP et suppriment la route automatiquement.

### Avantages et conditions préalables {#benefits-and-prerequisites}

  * **L’adresse IP virtuelle reste locale, il n’y a pas de NAT et l’adresse IP du client ne change pas.**
  * Cela fonctionne entre les sous-réseaux et les sites. Vous n’avez pas besoin d’un VLAN étendu.
  * Vous avez besoin de routeurs BGP et de l’aide de votre équipe réseau. Dans le cloud, vous avez besoin d’un service de serveur de routage du fournisseur de cloud.

> **⚠️ Remarque :** L’intégration BGP utilise les scripts start_prim et stop_prim de SafeKit et votre infrastructure de routage. L’**intégrateur** doit écrire les commandes dans les scripts `start_prim` et `stop_prim`. Ces scripts ne sont **pas fournis par le produit SafeKit**. Validez la solution avec votre équipe réseau avant la mise en production.

## Fonctionnement de la redirection DNS entre différents sous-réseaux (cluster mirror) {#virtual-ip-vs-dns-redirection-failover}

### Reroutage DNS avec le script `start_prim` {#dns-rerouting-with-the-start-prim-script}

Avec la redirection DNS, il n’y a **pas d’adresse IP virtuelle unique**. Les clients se connectent à un **nom virtuel** (le nom DNS). En cas de basculement, le script `start_prim` sur le nouveau serveur principal démarre l’application, puis modifie l’enregistrement DNS du nom virtuel en l’**adresse IP physique** du nouveau serveur principal.

Le script `stop_prim` n’a rien à faire. Si l’ancien serveur principal plante, le nouveau serveur principal écrase l’enregistrement DNS.

### Exemple : Résolution DNS et clients qui conservent l’ancienne adresse IP {#the-technical-scenario-dns-resolution-and-the-stuck-client}

![Schéma illustrant la résolution de nom DNS vers l’adresse IP physique 1 dans un cluster à haute disponibilité.](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 Résolution DNS : les clients sont toujours connectés à l’IP physique 1 dans un cluster à haute disponibilité.

#### Avant le basculement : le nom pointe vers l’adresse IP physique 1 {#current-state-resolution-to-physical-ip-1}

**Le client 1** et **le client 2** demandent au système DNS l’adresse IP du nom virtuel. Le système DNS renvoie **l’adresse IP physique 1.** Les clients ouvrent ensuite une connexion réseau à cette adresse.

#### Après le basculement : le nom pointe vers l’IP physique 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

Le serveur 1 tombe en panne. Le script `start_prim` sur le serveur 2 modifie l’enregistrement DNS en **adresse IP physique 2.** Les clients se connectent à l’adresse IP physique 2 uniquement si toutes ces conditions sont vraies :

  * La **durée de vie (TTL)** a expiré sur tous les serveurs DNS entre le client et l’enregistrement DNS.
  * Le cache DNS local du client 1 et du client 2 est vide.
  * L’application ferme sa connexion et effectue une *nouvelle* recherche DNS.

Si une condition est fausse, **le client 1 et le client 2** continuent d’utiliser l’IP physique 1. Le service est en panne, même si l’enregistrement DNS est correct.

### Limites et conditions préalables {#the-two-black-boxes-of-dns-redirection}

  * **Cache DNS :** de nombreux fournisseurs de services Internet et serveurs DNS d’entreprise ignorent les valeurs TTL courtes. Ils peuvent conserver l’ancienne adresse IP physique 1 pendant des minutes ou des heures.
  * **Comportement de l’application :** de nombreuses applications (par exemple, les services Java ou les navigateurs Web) effectuent une recherche DNS une seule fois, au démarrage. Elles continuent à utiliser la première adresse IP.
  * **L’adresse IP change à chaque basculement :** l’application n’a pas d’adresse IP virtuelle locale qui reste la même. Les applications qui enregistrent leur propre adresse IP peuvent ne pas fonctionner.
  * **Prérequis :** un TTL court sur l’enregistrement DNS (par exemple, 30 à 60 secondes) et les droits de mise à jour de la zone DNS à partir des deux serveurs.

> **⚠️ Remarque :** L’**intégrateur** doit écrire les commandes de mise à jour DNS dans le script `start_prim`. Ces commandes ne sont **pas fournies par le produit SafeKit**. Elles dépendent du serveur DNS (Windows DNS, BIND ou DNS cloud).

### Conclusion {#conclusion}

La redirection DNS n’est pas une solution de haute disponibilité fiable. Utilisez-la uniquement si tous les clients effectuent une nouvelle recherche DNS lorsqu’ils se reconnectent. Pour un basculement immédiat et transparent, utilisez une **adresse IP virtuelle** : avec un VLAN étendu, avec un équilibreur de charge, avec des CLI de fournisseur de cloud ou avec BGP.

## Fonctionnement de l’équilibrage de charge IP virtuelle dans un cluster <span class="notranslate farm-term" translate="no">farm</span> sur le même sous-réseau {#virtual-ip-load-balancing-same-subnet}

- [Test de l’adresse IP virtuelle d’équilibrage de charge dans un cluster farm SafeKit](/fr/best-practises/test-load-balancing-vip-farm/)

### Équilibrage de charge et redondance au niveau du noyau {#scalable-performance-kernel-level-load-balancing--redundancy}

Lorsqu’il y a beaucoup de trafic, SafeKit peut répartir le travail entre plusieurs serveurs actifs. Si un serveur tombe en panne, les autres serveurs continuent à fonctionner.

### Architecture de cluster <span class="notranslate farm-term" translate="no">farm</span> : répartition de la charge entre les nœuds Windows ou Linux {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


![Schéma d’une adresse IP virtuelle à répartition de charge au sein du même sous-réseau](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

Dans un **cluster <span class="notranslate farm-term" translate="no">farm</span> d’équilibrage de charge**, les clients se connectent à une adresse IP virtuelle et les requêtes sont partagées entre plusieurs serveurs en même temps. Cet exemple montre deux nœuds. Vous pouvez ajouter d’autres nœuds au cluster. Dans le même sous-réseau, l’adresse IP virtuelle est configurée avec un alias IP sur la carte réseau de **chaque serveur** du cluster.

#### Partage du trafic : le filtre du noyau {#traffic-distribution-the-kernel-level-filter}

Dans un cluster <span class="notranslate farm-term" translate="no">farm</span>, un **filtre SafeKit dans le noyau** partage le trafic. Cela fonctionne comme suit :

  * **Mappage ARP :** Dans le cache ARP des clients, l’IP virtuelle est liée à une adresse MAC (par exemple, `mac1` du serveur 1).
  * **Analyse des paquets :** Le serveur 1 reçoit les paquets. Le filtre du noyau SafeKit lit l’**adresse IP du client** ou le **port TCP** de chaque paquet.
  * **Répartition de la charge :** Le filtre décide quels paquets le serveur 1 traite et quels paquets sont envoyés aux autres nœuds (par exemple, le serveur 2). Pour envoyer un paquet à un autre nœud, le filtre réécrit l’**adresse MAC de destination** du paquet avec l’adresse MAC de ce nœud. L’adresse IP de destination reste l’adresse IP virtuelle. Le travail est partagé entre les serveurs.


#### Basculement et réacheminement avec ARP gratuit {#failover-and-rerouting-with-gratuitous-arp}

Si le serveur 1 tombe en panne, SafeKit envoie un message **ARP gratuit (GARP)**. Les clients mettent à jour leur cache ARP avec `mac2` du serveur 2. Les clients sont alors immédiatement redirigés vers les autres nœuds de la farm.

#### Déploiement sur des sites distants {#deployment-in-remote-sites}

Cette solution d’équilibrage de charge fonctionne également entre **des centres de données distants**, si les sites sont connectés par un **VLAN étendu**. Tous les sites sont alors dans le même sous-réseau. C’est la configuration la plus efficace pour clusters <span class="notranslate farm-term" translate="no">farm</span> sur plusieurs sites.

{{%  insert-safekit-farm-video-fr  %}}

## Fonctionnement d’une adresse IP virtuelle à répartition de charge sur différents sous-réseaux (cluster <span class="notranslate farm-term" translate="no">farm</span>) {#virtual-ip-load-balancing-different-subnets}

### Trafic entre les sous-réseaux du cloud {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

Un cluster <span class="notranslate farm-term" translate="no">farm</span> peut répartir le travail d’application entre plusieurs zones de disponibilité et sous-réseaux.

### Clusters <span class="notranslate farm-term" translate="no">farm</span> inter-sous-réseaux : plusieurs nœuds Windows ou Linux {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


![Schéma d’un cluster farm à répartition de charge fonctionnant sur deux sous-réseaux différents.](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

Lorsque les nœuds <span class="notranslate farm-term" translate="no">farm</span> se trouvent dans **des sous-réseaux différents** (par exemple, dans plusieurs zones de disponibilité du cloud), l’**IP virtuelle** se trouve sur un **équilibreur de charge** externe. L’équilibreur de charge envoie le trafic aux adresses IP physiques des serveurs de chaque sous-réseau.

#### Règles de routage du trafic et d’équilibrage de charge {#intelligent-traffic-routing--load-balancing-rules}

L’équilibreur de charge partage les requêtes des clients selon deux critères :

  * **Règles d’équilibrage de charge :** par exemple, l’**adresse IP du client** ou le **port TCP du client**.
  * **Disponibilité des nœuds :** l’équilibreur de charge n’envoie le trafic qu’aux nœuds sains, en fonction du contrôle d’intégrité de SafeKit.


> **⚠️ Remarque :** SafeKit fournit la vérification de l’état de santé. Votre réseau ou votre fournisseur de cloud fournit l’équilibreur de charge.

#### Contrôle d’intégrité de SafeKit {#safekit-health-check-mechanism}

SafeKit fournit une **URL de vérification de l’état** sur chaque serveur de la <span class="notranslate farm-term" translate="no">farm</span>. L’équilibreur de charge la lit pour connaître l’état de chaque serveur :

  * **Nœud actif :** la vérification de l’état renvoie `HTTP 200 OK`. L’équilibreur de charge envoie du trafic à ce serveur.
  * **Nœud HORS SERVICE :** si un serveur ou une application tombe en panne, SafeKit renvoie `HTTP 404 NOT FOUND` (ou le serveur ne répond pas). L’équilibreur de charge cesse immédiatement d’envoyer du trafic vers ce nœud.


#### Déploiement dans le cloud : AWS, Azure et GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Il s’agit de l’architecture standard pour **clusters <span class="notranslate farm-term" translate="no">farm</span> dans le cloud**. Si un sous-réseau ou une zone s’arrête, les autres nœuds continuent à traiter le trafic. Elle est prise en charge sur [**Amazon AWS**](</fr/solutions/aws-load-balancing-cluster-failover/>) (AWS Network Load Balancer), [**Microsoft Azure**](</fr/solutions/azure-load-balancing-cluster-failover/>) (Azure Load Balancer) et [**Google Cloud (GCP)**](</fr/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing).


## Comparaison : mise en œuvre de l’IP virtuelle, latence et transparence de l’application {#virtual-ip-methods-comparison}

**Comparaison des méthodes de redirection d’IP virtuelle et de redirection DNS pour la haute disponibilité et la reprise après sinistre.**

Environnement et cas d’utilisation | Type de haute disponibilité | Méthode de redirection | Mis en œuvre par | Latence du réseau | Transparence de l’application et adresse IP locale  
---|---|---|---|---|---  
Principal/secondaire (haute disponibilité) | Cluster mirror | ARP gratuit (prise de contrôle de l’adresse MAC) | ✅ Produit SafeKit | Très faible : temps de détection de la défaillance et d’envoi du GARP | Transparence totale : l’adresse IP virtuelle est locale sur le nœud actif. L’adresse IP du client ne change pas.  
Répartition de charge (actif/actif) | Cluster <span class="notranslate farm-term" translate="no">farm</span> | Filtre réseau du noyau / GARP | ✅ Produit SafeKit | Très faible : temps de détection de la défaillance et de changement des filtres réseau. | Transparence totale : l’adresse IP virtuelle est locale sur tous les nœuds. L’adresse IP du client ne change pas.  
Même sous-réseau / VLAN étendu | Reprise d’activité après sinistre (centres de données distants) | Alias d’adresse IP / GARP | ✅ Produit SafeKit (le VLAN étendu est fourni par l’équipe réseau) | Faible : dépend du temps d’aller-retour (RTT) du VLAN étendu | Transparence totale : l’adresse IP virtuelle est locale sur les nœuds. L’adresse IP du client ne change pas.  
Sous-réseaux différents : équilibreur de charge uniquement | Reprise d’activité après sinistre (centres de données distants / cloud) | Équilibreur de charge externe | 🛠️ Intégrateur : configuration de l’équilibreur de charge (SafeKit assure la vérification de l’état de santé) | Moyen : dépend de l’intervalle de vérification de l’état de l’équilibreur de charge. | ⚠️ Transparence partielle si SNAT/DNAT est utilisé. L’IP virtuelle **n’est PAS** locale sur les nœuds. L’IP du client peut **NE PAS** être conservée. L’application doit prendre en charge cette fonctionnalité.  
Sous-réseaux différents : équilibreur de charge + IP virtuelle SafeKit locale | Reprise d’activité après sinistre (centres de données distants / cloud) | Équilibreur de charge externe avec Floating IP / Direct Server Return | 🛠️ Intégrateur : configuration de l’équilibreur de charge (SafeKit assure la vérification de l’état de santé) | Moyen : dépend de l’intervalle de vérification de l’état de l’équilibreur de charge. | Bonne transparence : l’IP virtuelle est locale sur le nœud principal et constitue l’adresse de destination.
Sous-réseaux différents : CLI cloud | Reprise d’activité après sinistre (cloud) | API Cloud : l’adresse IP privée ou une route cloud est déplacée vers le nouveau nœud principal. | 🛠️ Intégrateur : commandes CLI cloud dans le script `start_prim` | Moyen à élevé : dépend du temps de réponse de l’API cloud. | Transparence totale : l’adresse IP virtuelle est locale sur le nœud principal. L’adresse IP du client ne change pas.
Sous-réseaux différents : BGP | Reprise d’activité après sinistre (centres de données distants / cloud) | Route /32 annoncée avec BGP | 🛠️ Intégrateur : commandes BGP dans les scripts `start_prim` et `stop_prim` | Faible à moyen : dépend du temps de convergence BGP. | Transparence totale : l’adresse IP virtuelle est locale sur le nœud principal. L’adresse IP du client ne change pas. Nécessite des routeurs BGP.  
Redirection DNS : pas d’IP virtuelle | Reprise d’activité après sinistre (centres de données distants) | Modification d’un enregistrement DNS (nom/adresse IP physique) | 🛠️ Intégrateur : commandes de mise à jour DNS dans le script `start_prim` | Élevé et imprévisible : dépend du TTL (Time To Live) du DNS et du cache DNS du client. | ⚠️ Non fiable : le client doit effectuer une nouvelle recherche DNS. Souvent, les clients conservent l’ancienne adresse IP qu’ils ont reçue au démarrage et ne sont pas redirigés après le basculement.  
  
## Foire aux questions sur l’IP virtuelle {#virtual-ip-faq}

### IP virtuelle et mise en réseau {#virtual-ip--networking}

Qu’est-ce qu’une adresse IP virtuelle et en quoi diffère-t-elle d’une adresse IP physique ?

Une **adresse IP physique** est liée à une carte réseau. Une **adresse IP virtuelle** n’est pas liée au matériel. Dans un cluster SafeKit, les clients utilisent toujours l’adresse IP virtuelle. Si le serveur principal tombe en panne, l’adresse IP virtuelle se déplace automatiquement vers un nœud sain. Vous n’avez pas besoin de modifier la configuration du client.

Ai-je besoin d’un équilibreur de charge matériel pour utiliser une adresse IP virtuelle ?

Non. **SafeKit** gère l’IP virtuelle avec un logiciel. Dans le même sous-réseau, il utilise **l’alias IP** et **l’ARP gratuit (GARP)** pour rediriger le trafic. Vous n’avez pas besoin d’un équilibreur de charge externe ou d’un serveur proxy.

Qu’est-ce que le protocole ARP gratuit (GARP) et pourquoi est-il utilisé ?

**L’ARP gratuit (GARP)** est un message réseau envoyé à tous les périphériques. Il met à jour les tables ARP des commutateurs et des routeurs. En cas de basculement, le nouveau serveur principal envoie un message GARP. Le message indique que l’**adresse IP virtuelle** est maintenant liée à l’adresse MAC du nouveau serveur principal. Le trafic est alors immédiatement redirigé.

Puis-je associer un nom DNS à une adresse IP virtuelle ?

**Oui.** Créez un enregistrement A standard pour l’IP virtuelle. La redirection se fait au **niveau de l’IP virtuelle** (avec ARP ou redirection réseau), **et non au niveau du DNS**. Vous n’avez pas de retards DNS ni de problèmes de TTL, et le basculement reste **transparent pour l’application**.

### Cloud et architectures avancées {#cloud--advanced-architectures}

Comment fonctionne une adresse IP virtuelle dans le cloud (AWS, Azure, GCP) ?

Dans le cloud, les messages GARP de couche 2 ne sont pas disponibles pour le réacheminement d’une adresse IP virtuelle. SafeKit fonctionne avec **les équilibreurs de charge cloud** (AWS Elastic Load Balancing, Azure Load Balancer ou Google Cloud Load Balancing). SafeKit fournit une **URL de vérification de l’état de santé**. L’équilibreur de charge la lit et envoie le trafic au nœud actif.

Un VLAN étendu est-il préférable à un équilibreur de charge pour la reprise après sinistre ?

**Oui**. Entre les centres de données distants, un **VLAN étendu** est souvent meilleur, car le basculement reste **transparent pour l’application**. L’**adresse IP virtuelle ne change pas**, de sorte que l’application et ses clients continuent d’utiliser la même adresse après un basculement entre les centres de données.

Quelles sont les limites de la redirection DNS par rapport à une adresse IP virtuelle ?

**La redirection DNS** dépend du **TTL (Time to Live)** et du cache DNS du client. La récupération peut prendre des heures. De plus, **les clients qui n’effectuent pas une nouvelle recherche DNS** continuent à utiliser le serveur défaillant. Une **adresse IP virtuelle** est redirigée immédiatement avec des messages GARP au niveau de la couche 2. Le cache DNS du client n’a aucun effet.

### Transparence et sécurité {#transparency--security}

Pourquoi une adresse IP virtuelle locale est-elle importante pour la transparence des applications ?

Avec une **IP virtuelle** locale, l’application utilise une adresse qui ne change pas. SafeKit effectue la redirection dans le **noyau**. L’application ne voit pas le basculement. Avec DNAT, l’adresse utilisée par l’application change.

Une adresse IP virtuelle conserve-t-elle l’adresse IP d’origine du client ?

Oui. SafeKit n’utilise pas le NAT source (SNAT). L’IP virtuelle est locale sur le serveur actif, de sorte que l’application reçoit l’**IP d’origine du client**. Ceci est important pour les audits de sécurité, la persistance de session et les journaux réglementaires.


{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}
