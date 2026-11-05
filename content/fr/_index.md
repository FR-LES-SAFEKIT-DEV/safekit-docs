---
title: "SafeKit : Logiciel de haute disponibilité pour Windows et Linux, sans SAN"
canonical: "https://safekit.eviden.com/fr/"
description: "SafeKit est le logiciel de haute disponibilité sans SAN tout-en-un pour Windows et Linux. Obtenez une réplication synchrone en temps réel, un basculement automatique et un équilibrage de charge dans un seul ensemble simple et économique. Commencez votre essai gratuit de 30 jours."
category: "home"
lang: "fr"
topics: "Ce que fait SafeKit, choisissez votre niveau de protection, modules prêts à l’emploi pour vos applications, cas d’utilisation des clients, tarification simple et prévisible, connaissez les limites avant de commencer, vidéothèque SafeKit, 🔍 Centre de navigation haute disponibilité SafeKit"
translation: "translate_md 2026-11-05.8 | glossaire 2026-11-05.12 | Translation LLM | 15 expressions"
---

# SafeKit : Logiciel de haute disponibilité pour Windows et Linux, sans SAN {#safekit-high-availability-software-for-windows-and-linux-without-a-san}

SafeKit transforme deux serveurs standards en un cluster haute disponibilité sans SAN qui assure la continuité de vos applications. Il réplique vos données en temps réel, redémarre votre application sur le second serveur si le premier tombe en panne, et réintègre automatiquement le serveur défaillant une fois qu’il est réparé. Vous l’installez sur les serveurs que vous possédez déjà, sans stockage partagé ni expertise en matière de cluster.

La réplication est synchrone, donc aucune donnée n’est perdue en cas de défaillance d’un serveur, et votre application est de nouveau opérationnelle en une minute ou moins. Les licences sont perpétuelles et tarifées par serveur.

<a class="btn-download" href="/fr/resources/safekit-free-trial/">Commencez votre essai gratuit de 30 jours ›</a>


## Ce que fait SafeKit {#features}

SafeKit combine quatre fonctions dans un seul produit, géré à partir d’une seule console web ou d’une seule ligne de commande, sous Windows et Linux.

| Fonction | Comment ça marche |
|---|---|
| **Réplication en temps réel** | Chaque modification apportée à vos fichiers est copiée sur le deuxième serveur au fur et à mesure qu’elle est effectuée, de sorte qu’une défaillance n’entraîne pas de perte de données. |
| **Basculement automatique** | SafeKit détecte la panne, déplace l’adresse IP virtuelle et redémarre l’application sur l’autre serveur. |
| **Failback automatique** | Le serveur réparé se resynchronise en arrière-plan pendant que l’application continue de fonctionner. |
| **Répartition de charge** | L’équilibrage de charge du réseau s’exécute à l’intérieur des serveurs, sans équilibreur de charge ou proxy externe. |

![Console web SafeKit surveillant un cluster mirror à 2 nœuds pour Windows et Linux, avec les serveurs PRIM et SECOND et la réplication active des données](/wp-content/uploads/2026/05/mirror-monitoring-prim-second.png)

Vous n’avez pas besoin d’un SAN, d’un disque de quorum, d’Active Directory ou d’éditions Entreprise de votre système d’exploitation ou de votre base de données.

<a class="btn-download" href="/fr/architectures/">Explorer les architectures de cluster ›</a>


## Choisissez votre niveau de protection {#protection-levels}

**HA applicative** (`mirror.safe`, `farm.safe` et les modules d’application) réplique uniquement vos données d’application et redémarre l’application sur le deuxième serveur. Elle nécessite que vous sachiez quels services redémarrer, quels dossiers répliquer en temps réel et quelle adresse IP virtuelle utiliser pour le basculement. Elle fonctionne sur des serveurs physiques, dans des machines virtuelles sur tous les hyperviseurs, y compris VMware, Hyper-V et KVM, et dans le cloud, et elle offre la récupération la plus rapide.

**HA de VM** (`hyperv.safe`, `kvm.safe`) réplique et bascule l’ensemble de la machine virtuelle, vous n’avez donc pas besoin de savoir comment l’application fonctionne. Il convient aux environnements avec plusieurs applications réparties sur plusieurs machines virtuelles.

<a class="btn-download" href="/fr/best-practises/vm-ha-vs-application-ha/">Comparer HA applicative et HA de VM ›</a>


## Modules prêts à l’emploi pour vos applications {#modules}

Les modules préconfigurés sont gratuits et inclus avec le produit. Chacun d’entre eux définit les services à redémarrer et les dossiers à répliquer pour une application donnée.

- **Bases de données :** SQL Server, PostgreSQL, Oracle, MySQL, MariaDB, Firebird
- **Web :** Apache, IIS, NGINX
- **Machines virtuelles et conteneurs :** Hyper-V, KVM, Docker, Podman, Kubernetes (k3s)
- **Cloud :** AWS, Azure, GCP et autres clouds
- **Sécurité physique et industrie :** Milestone XProtect, Genetec, Nedap, Bosch, Hanwha, Siemens

<a class="btn-download" href="/fr/solutions/">Parcourir toutes les solutions et tous les modules ›</a>


## Cas d’utilisation des clients {#use-cases}

- **Gestion vidéo (VMS) :** permet de conserver les vidéos en direct et enregistrées en cas de panne de serveur. Utilisé avec Milestone, Genetec et Hanwha.
- **Contrôle d’accès (EACS) :** maintient les informations d’identification et les alarmes disponibles à tout moment. Utilisé avec Hirsch Microsesame, Nedap AEOS et Siemens SiPass.
- **SCADA et industrie :** permet aux opérateurs de garder le contrôle des lignes de production, par exemple les torréfacteurs de café Probat et les trieuses de bagages ALSTEF.
- **Gestion technique du bâtiment (GTB) :** assure le bon fonctionnement des systèmes CVC, de sécurité et d’énergie. Utilisé avec Siemens Desigo CC et Bosch BIS.
- **Contrôle du trafic aérien (ATC) :** permet aux contrôleurs de rester connectés aux applications critiques côté piste, par exemple avec ADB SafeGate.
- **Centre de contrôle des opérations du métro (OCC) :** assure la supervision des lignes de métro parisiennes automatisées et sans conducteur.
- **Sites Edge :** transforme deux serveurs standard en un cluster HA en l’absence de centre de données.
- **Éditeurs de logiciels (OEM) :** ajoutez une haute disponibilité à votre catalogue en tant qu’option logicielle uniquement.

<a class="btn-download" href="/fr/use-cases/">Explorer tous les cas d’utilisation ›</a>


## Tarification simple et prévisible {#pricing}

SafeKit est vendu avec une licence perpétuelle, il n’y a donc pas d’abonnement obligatoire. Le prix dépend uniquement du nombre de serveurs, et non des cœurs ou des sockets de processeur, et tous les modules d’application sont gratuits. Il fonctionne également avec les éditions standard de Windows, Linux et vos bases de données, vous n’avez donc pas à payer pour les éditions Entreprise.

<a class="btn-download" href="/fr/safekit-pricing/">Demander un devis ›</a>


## Connaissez les limites avant de commencer {#limits}

SafeKit est conçu pour la simplicité, pas pour tous les cas. Il convient bien à quelques téraoctets de données répliquées, moins de 1 000 000 de fichiers, jusqu’à 32 machines virtuelles lors de l’utilisation HA de VM, et deux nœuds sur le même réseau local ou VLAN avec une faible latence (généralement moins de 5 ms aller-retour).

Pour des volumes plus importants, le stockage partagé ou une autre approche est un meilleur choix.

<a class="btn-download" href="/fr/product/#safekit-ha-limitations">Voir la liste complète des limitations ›</a>


{{%  insert-safekit-videos-table-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}
