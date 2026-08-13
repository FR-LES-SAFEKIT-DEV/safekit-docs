---
title: "Architecture sans partage vs. architecture à disque partagé : choisir le meilleur cluster HA"
slug: "shared-nothing-architecture-vs-shared-disk-architecture"
canonical: "https://safekit.eviden.com/fr/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/"
description: "Architecture sans partage vs. architecture à disque partagé : choisir le meilleur cluster HA Architecture sans partage vs architecture avec disques partagés pour les clusters de haute disponibilité"
category: "best-practises"
lang: "fr"
topics: "Architecture sans partage vs architecture avec disques partagés pour les clusters de haute disponibilité, Architecture sans partage (shared nothing) vs architecture à disque partagé (shared disk) : avantages et inconvénients, Vidéo comparant un cluster avec disques partagés et un cluster sans partage avec 2 sites distants, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# Architecture sans partage vs. architecture à disque partagé : choisir le meilleur cluster HA

## Architecture sans partage vs architecture avec disques partagés pour les clusters de haute disponibilité

### Aperçu

Cet article étudie les avantages et les inconvénients de l'architecture sans partage par rapport à l'architecture avec disques partagés pour les clusters de haute disponibilité. On s'intéresse aux contraintes matérielles, à l'impact sur l'organisation des données applicatives, au temps de récupération, à la simplicité de mise en œuvre.


<img src="/safekit-docs/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png" width="200" alt="Architecture sans partage par rapport à l'architecture avec disques partagés">


Les tableaux comparatifs suivants expliquent en détail la différence entre l'architecture avec disques partagés et SafeKit, un produit de clustering logiciel implémentant une architecture sans partage.

### Qu'est-ce qu'une architecture avec disques partagés ?

Une architecture avec disques partagés (comme avec le [failover cluster de Microsoft](<https://learn.microsoft.com/en-us/windows-server/failover-clustering/clustering-requirements>)) est basée sur 2 serveurs partageant un disque avec un basculement automatique des applications en cas de pannes matérielles ou logicielles.

Cette architecture a des contraintes matérielles : le stockage partagé externe spécifique, les cartes spécifiques à installer à l'intérieur des serveurs, et les commutateurs spécifiques entre les serveurs et le stockage partagé.

Une architecture avec disques partagés a un fort impact sur l'organisation des données applicatives. Toutes les données de l'application doivent être localisées sur le disque partagé pour une reprise après basculement.

De plus, en cas de basculement, la procédure de récupération du système de fichiers doit être exécutée sur le disque partagé. Ceci augmente le temps de récupération (RTO).

Enfin, la solution n'est pas facile à configurer car des compétences sont nécessaires pour configurer le matériel spécifique. Des compétences applicatives sont également requises pour configurer les données de l'application dans le disque partagé.

### Qu'est-ce qu'une architecture sans partage ?

Une architecture sans partage (comme avec [SafeKit](</safekit-docs/fr/>)) est basée sur 2 serveurs répliquant les données en temps réel avec un basculement automatique des applications en cas de pannes matérielles ou logicielles.

Il existe deux types de réplication de données : [une réplication de fichiers au niveau octet vs une réplication de disque au niveau bloc](</safekit-docs/fr/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>). Nous considérons ici la réplication de fichiers au niveau octet car elle présente de nombreux avantages par rapport à la réplication de disque au niveau bloc.

L'architecture sans partage n'a aucune contrainte matérielle : les serveurs peuvent être physiques ou virtuels avec n'importe quel type d'organisation disques. La réplication de fichiers en temps réel ([synchrone](</safekit-docs/fr/best-practises/synchronous-replication-vs-asynchronous-replication/>) pour avoir 0 perte de données) est effectuée via le réseau standard entre les serveurs.

Cette architecture n'a pas d'impact sur l'organisation des données applicatives. Par exemple, si une application a ses données sur le disque système, la réplication de fichiers en temps réel fonctionne.

Le temps de récupération (RTO) en cas de basculement est réduit au temps de redémarrage de l'application sur les fichiers répliqués du serveur secondaire.

Enfin, la solution est très simple à configurer puisque seuls les chemins des répertoires à répliquer sont configurés.

## Architecture sans partage (shared nothing) vs architecture à disque partagé (shared disk) : avantages et inconvénients


<!-- BEGIN INSERT: insert-safekit-shared-nothing-vs-shared-disk-table-en lang="fr" display="content" -->
 

Le choix de la bonne architecture de haute disponibilité est essentiel pour trouver le bon équilibre entre coût, complexité et fiabilité. Les deux approches principales — **sans partage (shared nothing)** et **disque partagé (shared disk)** — diffèrent fondamentalement dans leur gestion de la redondance des données et du basculement. Une architecture sans partage comme SafeKit réplique les données entre des serveurs indépendants disposant chacun de leur propre stockage local, tandis qu'une architecture à disque partagé repose sur une baie de stockage centralisée (SAN) accessible par plusieurs serveurs. Le tableau suivant compare ces deux approches selon des critères clés.

Critère | Architecture sans partage (shared nothing) | Architecture à disque partagé (shared disk)  
---|---|---  
**Produit** | [SafeKit sur Windows et Linux](</safekit-docs/fr/>) | Outil de clustering pour disque partagé  
**Matériel supplémentaire** | Non — utilise les disques internes des serveurs | Oui — coût supplémentaire avec une baie de disques partagée (SAN)  
**Organisation des données applicatives** | Aucun impact sur l'organisation des données applicatives. [Il suffit de définir les répertoires à répliquer en temps réel](</safekit-docs/fr/architectures/file-replication-byte-level-with-failover-mirror-cluster/>). Même les répertoires du disque système peuvent être répliqués. | Nécessite une configuration spéciale de l'application pour placer ses données sur un disque partagé. Les données du disque système ne peuvent pas être récupérées.  
**Complexité de déploiement** | Non — installer un logiciel sur 2 serveurs | Oui — nécessite des compétences IT spécifiques pour configurer l'OS et le disque partagé  
**Basculement (failover)** | Il suffit de redémarrer l'application sur le second serveur. | Basculer le disque partagé. Remonter le système de fichiers. Exécuter la procédure de récupération du système de fichiers. Puis redémarrer l'application.  
**Reprise après sinistre** | Il suffit de placer les 2 serveurs dans 2 sites distants connectés par un LAN étendu. | Coût supplémentaire avec une seconde baie de disques. Compétences IT spécifiques pour configurer la réplication entre baies via un SAN.  
**Quorum et split brain** | L'application s'exécute sur un seul serveur après un isolement réseau (split brain). La cohérence des données est garantie. Pas besoin d'une troisième machine, d'un disque quorum ou d'une ligne heartbeat dédiée. [En savoir plus sur le heartbeat, le basculement et le quorum](</safekit-docs/fr/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) | Nécessite un disque quorum spécial ou un troisième serveur quorum pour éviter la corruption des données en cas de split brain.  
**Idéal pour** | [Les éditeurs de logiciels souhaitant ajouter une option simple de haute disponibilité à leur application](</safekit-docs/fr/use-cases/application-clustering-software/>) | Les entreprises disposant de compétences IT en clustering et gérant de grandes bases de données  
  
**En résumé** , l'architecture sans partage, telle qu'implémentée par SafeKit, l'emporte en termes de **simplicité** , de **coût** et de **rapidité de déploiement**. Elle ne nécessite aucun matériel supplémentaire, aucune compétence IT spécialisée et aucune modification de l'organisation des données applicatives. Le basculement est direct, la reprise après sinistre est intégrée et le split brain est géré sans infrastructure additionnelle.

L'architecture à disque partagé reste pertinente pour les grandes entreprises disposant d'une infrastructure SAN existante et d'équipes IT dédiées gérant de très grandes bases de données. Cependant, pour la plupart des besoins de haute disponibilité applicative — en particulier pour les éditeurs de logiciels, les environnements OT/edge et les sites distribués — l'architecture sans partage avec SafeKit est le choix le plus simple et le plus rentable.


<!-- END INSERT: insert-safekit-shared-nothing-vs-shared-disk-table-en lang="fr" display="content" -->
 

## Vidéo comparant un cluster avec disques partagés et un cluster sans partage avec 2 sites distants

### Contenu de la vidéo

Cette vidéo illustre d'abord le travail à effectuer avec une architecture à disques partagés lorsque les deux serveurs d'un cluster de haute disponibilité doivent être placés sur deux sites distants.

Ensuite, la vidéo montre le même cas d'utilisation avec l'architecture SafeKit sans partage.

### Vidéo SafeKit : Reprise après sinistre avec un cluster à disque partagé et un cluster shared nothing (2:25)


<!-- BEGIN INSERT: insert-safekit-hub-fr lang="fr" display="content" -->
 

## 🔍 Hub de navigation SafeKit Haute Disponibilité {#hub}

**Explorez SafeKit : fonctionnalités, vidéos techniques, documentation et essai gratuit**

Type de ressource | Description | Lien direct  
---|---|---  
**Fonctionnalités clés** | Pourquoi choisir SafeKit pour une haute disponibilité simple et économique ? | [Voir pourquoi choisir SafeKit pour la Haute Disponibilité](</safekit-docs/fr/#why-choose-safekit-for-ha> "Découvrez les fonctionnalités de SafeKit pour une haute disponibilité simple et économique")  
**Cas d'usage** | Découvrez comment SafeKit garantit la haute disponibilité des infrastructures critiques | [Voir tous les cas d'usage (Logiciels OEM, Serveurs Edge, SCADA, et plus)](</safekit-docs/fr/#safekit-use-cases> "Découvrez les cas d'usage de SafeKit pour la haute disponibilité")  
**Modèle de déploiement** | HA SANless tout-en-un : Cluster logiciel sans partage (Shared-Nothing) | [Voir SafeKit HA SANless tout-en-un](</safekit-docs/fr/#all-in-one-sanless-ha> "En savoir plus sur la haute disponibilité SANless tout-en-un avec cluster logiciel sans partage")  
**Stratégies HA** | SafeKit : Infrastructure (VM) vs Haute Disponibilité au niveau applicatif | [Voir SafeKit HA & Redondance : Niveau VM vs Niveau Applicatif](</safekit-docs/fr/#safekit-ha-redundancy-choices> "Comparez la redondance au niveau VM avec les stratégies de haute disponibilité au niveau applicatif de SafeKit")  
**Spécifications techniques** | Limitations techniques pour le clustering SafeKit | [Voir les limitations de la Haute Disponibilité SafeKit](</safekit-docs/fr/#safekit-ha-limitations> "Configuration requise et limitations techniques pour le clustering d'applications SafeKit")  
**Preuve de concept** | SafeKit : Démos de configuration HA et de basculement | [Voir les tutoriels de basculement SafeKit](</safekit-docs/fr/#safekit-failover-tutorials> "Vidéos pas à pas sur la haute disponibilité SafeKit, de l'installation au basculement automatisé")  
**Architecture** | Fonctionnement du cluster miroir SafeKit (Réplication et basculement en temps réel) | [Voir Cluster miroir SafeKit : réplication et basculement en temps réel](</safekit-docs/fr/#safekit-mirror-cluster> "Découvrez l'architecture technique et le mécanisme de basculement du cluster miroir SafeKit")  
**Architecture** | Fonctionnement du cluster de ferme SafeKit (Répartition de charge réseau et basculement) | [Voir Cluster de ferme SafeKit : répartition de charge et basculement](</safekit-docs/fr/#safekit-farm-cluster> "Présentation technique de l'architecture du cluster de ferme SafeKit avec répartition de charge réseau")  
**Avantages concurrentiels** | Comparaison : SafeKit vs Clusters de Haute Disponibilité (HA) traditionnels | [Voir la comparaison SafeKit vs Clusters HA traditionnels](</safekit-docs/fr/#safekit-ha-comparison> "Comparaison détaillée du logiciel SafeKit par rapport aux clusters HA matériels traditionnels")  
**Ressources techniques** | SafeKit Haute Disponibilité : Documentation, téléchargements et essai | [Voir l'essai gratuit SafeKit HA & la documentation technique](</safekit-docs/fr/#safekit-ha-technical-resources> "Accédez à l'essai gratuit de SafeKit, à la documentation technique et aux livres blancs sur la haute disponibilité")  
**Solutions préconfigurées** | Bibliothèque de modules applicatifs SafeKit : solutions HA prêtes à l'emploi | [Voir les modules applicatifs de Haute Disponibilité SafeKit](</safekit-docs/fr/#safekit-ha-application-modules> "Parcourez la bibliothèque de modules SafeKit préconfigurés pour le basculement automatique d'applications")  
  

<!-- END INSERT: insert-safekit-hub-fr lang="fr" display="content" -->
 


<!-- BEGIN INSERT: insert-safekit-4-buttons-fr lang="fr" display="content" -->
<div class="button-row">
  <a class="btn-action" href="https://safekit.eviden.com/fr/contact-us-for-safekit/">🧑 Nous contacter</a>
  <a class="btn-action" href="/safekit-docs/fr/resources/safekit-free-trial/">🎁 Essai gratuit de SafeKit</a>
  <a class="btn-action" href="https://training.my.evidian.com/mod/page/view.php?id=712">🏅 Certification gratuite</a>
  <a class="btn-action" href="https://safekit.eviden.com/fr/get-a-quote-safekit/">💰 Prix licence perpétuelle</a>
</div>
<!-- END INSERT: insert-safekit-4-buttons-fr lang="fr" display="content" -->