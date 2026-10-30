---
title: "SafeKit : logiciel de haute disponibilité pour Windows et Linux, sans SAN"
canonical: "https://safekit.eviden.com/fr/"
description: "SafeKit est le logiciel de haute disponibilité SANless tout-en-un pour Windows et Linux. Profitez de la réplication synchrone en temps réel, du basculement automatique et de la répartition de charge dans une solution simple et économique. Commencez votre essai gratuit de 30 jours."
category: "home"
lang: "fr"
topics: "Fonctionnement de SafeKit, Choisir votre niveau de protection, Modules prêts à l'emploi pour vos applications, Cas d’usage clients, Tarifs simples et prévisibles, Connaître les limites avant de commencer, Bibliothèque de vidéos SafeKit, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# SafeKit : logiciel de haute disponibilité pour Windows et Linux, sans SAN {#safekit-high-availability-software-for-windows-and-linux-without-a-san}

SafeKit transforme deux serveurs standards en cluster de haute disponibilité sans SAN qui assure la continuité de vos applications. Il réplique les données en temps réel, redémarre votre application sur le second serveur si le premier tombe en panne et réintègre automatiquement le serveur réparé. Installez-le sur vos serveurs existants, sans stockage partagé ni expertise du clustering.

La réplication est synchrone : aucune donnée n'est perdue en cas de panne et votre application redémarre en une minute environ, voire moins. Les licences sont perpétuelles et facturées par serveur.

<a class="btn-download" href="/fr/resources/safekit-free-trial/">Démarrer l'essai gratuit de 30 jours ›</a>


## Fonctionnement de SafeKit {#features}

SafeKit réunit quatre fonctions dans un seul produit, géré depuis une console web ou une ligne de commande, sous Windows et Linux.

| Fonction | Fonctionnement |
|---|---|
| **Réplication en temps réel** | Chaque modification de vos fichiers est copiée sur le second serveur au moment où elle se produit, pour éviter toute perte de données en cas de panne. |
| **Basculement automatique** | SafeKit détecte la panne, déplace l'adresse IP virtuelle et redémarre l'application sur l'autre serveur. |
| **Retour automatique** | Le serveur réparé se resynchronise en arrière-plan pendant que l'application continue de fonctionner. |
| **Répartition de charge** | L'équilibrage de charge réseau fonctionne directement sur les serveurs, sans répartiteur de charge ni proxy externe. |

![Console web SafeKit surveillant un cluster miroir à deux nœuds sous Windows et Linux, avec les serveurs PRIM et SECOND et la réplication active des données](/wp-content/uploads/2026/05/mirror-monitoring-prim-second.png)

Vous n'avez besoin ni de SAN, ni de disque de quorum, ni d'Active Directory, ni d'éditions Enterprise de votre système d'exploitation ou de votre base de données.

<a class="btn-download" href="/fr/architectures/">Découvrir les architectures de cluster ›</a>


## Choisir votre niveau de protection {#protection-levels}

La **HA applicative** (`mirror.safe`, `farm.safe` et les modules applicatifs) réplique uniquement les données de l'application et redémarre celle-ci sur le second serveur. Vous devez savoir quels services redémarrer, quels dossiers répliquer en temps réel et quelle adresse IP virtuelle basculer. Cette solution fonctionne sur des serveurs physiques, dans des machines virtuelles sur tous les hyperviseurs, notamment VMware, Hyper-V et KVM, ainsi que dans le cloud; elle offre le rétablissement le plus rapide.

La **HA de VM** (`hyperv.safe`, `kvm.safe`) réplique et bascule la machine virtuelle entière, sans qu'il soit nécessaire de connaître le fonctionnement de l'application. Elle convient aux environnements comprenant plusieurs applications réparties sur plusieurs VM.

<a class="btn-download" href="/fr/best-practises/vm-ha-vs-application-ha/">Comparer la HA applicative et la HA de VM ›</a>


## Modules prêts à l'emploi pour vos applications {#modules}

Les modules préconfigurés sont gratuits et inclus avec le produit. Chacun définit les services à redémarrer et les dossiers à répliquer pour une application donnée.

- **Bases de données :** SQL Server, PostgreSQL, Oracle, MySQL, MariaDB, Firebird
- **Web :** Apache, IIS, NGINX
- **VM et conteneurs :** Hyper-V, KVM, Docker, Podman, Kubernetes (k3s)
- **Cloud :** AWS, Azure, GCP et autres clouds
- **Sécurité physique et industrie :** Milestone XProtect, Genetec, Nedap, Bosch, Hanwha, Siemens

<a class="btn-download" href="/fr/solutions/">Parcourir toutes les solutions et tous les modules ›</a>


## Cas d’usage clients {#use-cases}

- **Gestion vidéo (VMS) :** maintient l'accès à la vidéo en direct et enregistrée en cas de panne d'un serveur. Compatible avec Milestone, Genetec et Hanwha.
- **Contrôle d'accès (EACS) :** garantit la disponibilité permanente des identifiants et des alarmes. Utilisé avec Hirsch Microsesame, Nedap AEOS et Siemens SiPass.
- **SCADA et industrie :** permet aux opérateurs de contrôler les lignes de production, par exemple chez les torréfacteurs Probat et les systèmes de tri des bagages ALSTEF.
- **Gestion technique des bâtiments (BMS) :** maintient en fonctionnement les systèmes CVC, de sécurité et d'énergie. Utilisé avec Siemens Desigo CC et Bosch BIS.
- **Contrôle du trafic aérien (ATC) :** maintient la connexion des contrôleurs aux applications critiques côté piste, par exemple avec ADB SafeGate.
- **Centre de contrôle du métro (OCC) :** maintient la supervision des lignes de métro automatisées et sans conducteur, comme celles de Paris.
- **Sites Edge :** transforme deux serveurs standards en cluster HA, même en l'absence de centre de données.
- **Éditeurs de logiciels (OEM) :** ajoute une option logicielle de haute disponibilité à leur catalogue.

<a class="btn-download" href="/fr/use-cases/">Découvrir tous les cas d’usage ›</a>


## Tarifs simples et prévisibles {#pricing}

SafeKit est vendu avec une licence perpétuelle, sans abonnement obligatoire. Le prix dépend uniquement du nombre de serveurs, et non des cœurs ou sockets CPU; tous les modules applicatifs sont gratuits. SafeKit fonctionne également avec les éditions standard de Windows, Linux et des bases de données, sans imposer d'éditions Enterprise.

<a class="btn-download" href="/fr/safekit-pricing/">Demander un devis ›</a>


## Connaître les limites avant de commencer {#limits}

SafeKit privilégie la simplicité et ne convient pas à tous les cas. Il est adapté à quelques téraoctets de données répliquées, à moins de 1 000 000 de fichiers, à 32 VM maximum en HA de VM et à deux nœuds sur le même LAN ou VLAN avec une faible latence (généralement moins de 5 ms aller-retour).

Pour des volumes plus importants, un stockage partagé ou une autre approche sera préférable.

<a class="btn-download" href="/fr/product/#safekit-ha-limitations">Voir la liste complète des limites ›</a>


{{%  insert-safekit-videos-table-fr  %}}

{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}
