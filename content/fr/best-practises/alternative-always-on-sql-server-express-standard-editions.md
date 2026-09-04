---
title: "Alternative à SQL Server Always On : haute disponibilité pour les éditions Express et Standard - SafeKit HA"
canonical: "https://safekit.eviden.com/fr/best-practises/alternative-always-on-sql-server-express-standard-editions/"
description: "Vous recherchez une alternative économique à SQL Server Always On ? SafeKit propose une architecture sans SAN qui assure une haute disponibilité pour les éditions SQL Server Express et Standard. Bénéficiez de la réplication synchrone, d’une adresse IP virtuelle et d’un basculement automatique sans SAN ni Active Directory."
category: "best-practises"
lang: "fr"
topics: "Alternative à Always On SQL Server avec les éditions express et standard, Comment fonctionne le cluster miroir SafeKit avec Microsoft SQL Server ?, Guide vidéo : Configuration d'un cluster HA miroir SafeKit pour SQL Server, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# Alternative à SQL Server Always On : haute disponibilité pour les éditions Express et Standard

## Alternative à Always On SQL Server avec les éditions express et standard

### La solution pour Microsoft SQL Server

SafeKit apporte la haute disponibilité à Microsoft SQL Server entre deux nœuds redondants avec une réplication synchrone en temps réel des données et un basculement automatique.

La solution est indépendante de l'édition Microsoft SQL Server et fonctionne avec les éditions express et standard.

### Un produit générique

SafeKit est un produit générique. Vous pouvez répliquer plus que les données et les journaux du serveur SQL. Si votre application est basée sur SQL Server avec des dossiers spécifiques contenant votre configuration ou d'autres fichiers, vous pouvez les répliquer de la même manière. Et vous pouvez redémarrer vos propres services en plus des services du serveur SQL.

[Guide d'installation de SafeKit avec Microsoft SQL Server et les éditions express et standard](</quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/>)

### Sans Microsoft failover cluster

SafeKit fonctionne sans Microsoft failover cluster comme avec Always On SQL Server. Il s'agit d'une offre tout-en-un qui apporte adresse IP virtuelle, réplication synchrone en temps réel des dossiers, basculement et retour après panne automatiques, et plus encore... SafeKit élimine le besoin de disques partagés et des éditions entreprise des base de données.

### Sans contrôleur de domaine, ni Active Directory

SafeKit fonctionne sans configurer un contrôleur de domaine ni un annuaire AD comme avec Always On SQL Server. Cette solution facile à déployer et économique ne nécessite aucune compétence particulière.

### Sans 3 nœuds pour le quorum

SafeKit fonctionne sans avoir besoin de 3 nœuds pour le quorum comme avec Always On SQL Server. En cas d'isolation réseau, SafeKit met en place un split brain checker avec un ping vers un routeur jouant le rôle de témoin. De plus, plusieurs heartbeats peuvent être facilement configurés dans le produit.

### Autres solutions de redondance et de haute disponibilité

Avec SafeKit, vous pouvez implémenter sur Windows et Linux, la réplication et le basculement en temps réel de n'importe quels dossiers ou services, bases de donnée, machines virtuelles Hyper-V ou KVM complètes, applications Docker, Kubernetes, Cloud.

### Une solution complète

SafeKit résout : 

  * les pannes matérielles (20 % des problèmes), y compris la panne complète d'une salle informatique, 
  * les pannes logicielles (40 % des problèmes), y compris le redémarrage de processus critiques, 
  * et les erreurs humaines (40 % des problèmes) grâce à sa simplicité d'utilisation et sa console Web.



{{%  insert-safekit-mirror-fr app="Microsoft SQL Server"  %}}
 

## Guide vidéo : Configuration d'un cluster HA miroir SafeKit pour SQL Server {#videoguide-safekit-mirror-cluster}


<!-- BEGIN INSERT: insert-safekit-mirror-video-en lang="fr" display="content" -->
 

### Vidéo SafeKit : Clustering au niveau applicatif (8:47) {#demo-mirror-ha-cluster}

Dans cette vidéo, découvrez comment SafeKit implémente un **cluster HA miroir** sans la complexité d'un SAN. Bien que cette démonstration utilise Microsoft SQL Server, la solution fonctionne de manière identique pour d'autres bases de données et applications. 

### Chapitres

  1. 🎬 [2 nœuds avec SQL Server](<https://youtu.be/mGwEguDnnH0?t=0s>) (0:32)
  2. 🎬 [Configurer le cluster et le module mirror.safe](<https://youtu.be/mGwEguDnnH0?t=32s>) (3:58)
  3. 🎬 [Démarrer et tester la réplication SQL, la migration, le basculement sur panne](<https://youtu.be/mGwEguDnnH0?t=270s>) (4:17)


### Mise en œuvre étape par étape

  * 🛠️ [Lire le guide de configuration d'un cluster miroir sur Windows](</quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/>)
  * 🛠️ [Lire le guide de configuration d'un cluster miroir sur Linux](</quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover/>)


&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 


<!-- END INSERT: insert-safekit-mirror-video-en lang="fr" display="content" -->
 


<!-- BEGIN INSERT: insert-safekit-hub-fr lang="fr" display="content" -->
 

## 🔍 Hub de navigation SafeKit Haute Disponibilité {#hub}

**Explorez SafeKit : fonctionnalités, vidéos techniques, documentation et essai gratuit**

Type de ressource | Description | Lien direct  
---|---|---  
Fonctionnalités clés | Pourquoi choisir SafeKit pour une haute disponibilité simple et économique ? | [Voir pourquoi choisir SafeKit pour la Haute Disponibilité](</fr/#why-choose-safekit-for-ha> "Découvrez les fonctionnalités de SafeKit pour une haute disponibilité simple et économique")  
Cas d'usage | Découvrez comment SafeKit garantit la haute disponibilité des infrastructures critiques | [Voir tous les cas d'usage (Logiciels OEM, Serveurs Edge, SCADA, et plus)](</fr/#safekit-use-cases> "Découvrez les cas d'usage de SafeKit pour la haute disponibilité")  
Modèle de déploiement | HA SANless tout-en-un : Cluster logiciel sans partage (Shared-Nothing) | [Voir SafeKit HA SANless tout-en-un](</fr/#all-in-one-sanless-ha> "En savoir plus sur la haute disponibilité SANless tout-en-un avec cluster logiciel sans partage")  
Stratégies HA | SafeKit : Infrastructure (VM) vs Haute Disponibilité au niveau applicatif | [Voir SafeKit HA & Redondance : Niveau VM vs Niveau Applicatif](</fr/#safekit-ha-redundancy-choices> "Comparez la redondance au niveau VM avec les stratégies de haute disponibilité au niveau applicatif de SafeKit")  
Spécifications techniques | Limitations techniques pour le clustering SafeKit | [Voir les limitations de la Haute Disponibilité SafeKit](</fr/#safekit-ha-limitations> "Configuration requise et limitations techniques pour le clustering d'applications SafeKit")  
Preuve de concept | SafeKit : Démos de configuration HA et de basculement | [Voir les tutoriels de basculement SafeKit](</fr/#safekit-failover-tutorials> "Vidéos pas à pas sur la haute disponibilité SafeKit, de l'installation au basculement automatisé")  
Architecture | Fonctionnement du cluster miroir SafeKit (Réplication et basculement en temps réel) | [Voir Cluster miroir SafeKit : réplication et basculement en temps réel](</fr/#safekit-mirror-cluster> "Découvrez l'architecture technique et le mécanisme de basculement du cluster miroir SafeKit")  
Architecture | Fonctionnement du cluster de ferme SafeKit (Répartition de charge réseau et basculement) | [Voir Cluster de ferme SafeKit : répartition de charge et basculement](</fr/#safekit-farm-cluster> "Présentation technique de l'architecture du cluster de ferme SafeKit avec répartition de charge réseau")  
Avantages concurrentiels | Comparaison : SafeKit vs Clusters de Haute Disponibilité (HA) traditionnels | [Voir la comparaison SafeKit vs Clusters HA traditionnels](</fr/#safekit-ha-comparison> "Comparaison détaillée du logiciel SafeKit par rapport aux clusters HA matériels traditionnels")  
Ressources techniques | SafeKit Haute Disponibilité : Documentation, téléchargements et essai | [Voir l'essai gratuit SafeKit HA & la documentation technique](</fr/#safekit-ha-technical-resources> "Accédez à l'essai gratuit de SafeKit, à la documentation technique et aux livres blancs sur la haute disponibilité")  
Solutions préconfigurées | Bibliothèque de modules applicatifs SafeKit : solutions HA prêtes à l'emploi | [Voir les modules applicatifs de Haute Disponibilité SafeKit](</fr/#safekit-ha-application-modules> "Parcourez la bibliothèque de modules SafeKit préconfigurés pour le basculement automatique d'applications")  
  

<!-- END INSERT: insert-safekit-hub-fr lang="fr" display="content" -->
 


<!-- BEGIN INSERT: insert-safekit-4-buttons-fr lang="fr" display="content" -->
<div class="button-row">
  <a class="btn-action" href="https://safekit.eviden.com/fr/contact-us-for-safekit/">🧑 Nous contacter</a>
  <a class="btn-action" href="/fr/resources/safekit-free-trial/">🎁 Essai gratuit de SafeKit</a>
  <a class="btn-action" href="https://training.my.evidian.com/mod/page/view.php?id=712">🏅 Certification gratuite</a>
  <a class="btn-action" href="https://safekit.eviden.com/fr/get-a-quote-safekit/">💰 Prix licence perpétuelle</a>
</div>
<!-- END INSERT: insert-safekit-4-buttons-fr lang="fr" display="content" -->