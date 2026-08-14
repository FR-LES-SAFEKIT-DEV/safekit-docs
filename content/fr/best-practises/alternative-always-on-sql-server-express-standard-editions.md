---
title: "Alternative à SQL Server Always On : haute disponibilité pour les éditions Express et Standard"
slug: "alternative-always-on-sql-server-express-standard-editions"
canonical: "https://safekit.eviden.com/fr/best-practises/alternative-always-on-sql-server-express-standard-editions/"
description: "Alternative à SQL Server Always On : haute disponibilité pour les éditions Express et Standard Alternative à Always On SQL Server avec les éditions express et standard"
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



{{%  insert-safekit-mirror-fr app="Microsoft SQL Server" %}}
 

## Guide vidéo : Configuration d'un cluster HA miroir SafeKit pour SQL Server {#videoguide-safekit-mirror-cluster}


{{%  insert-safekit-mirror-video-fr %}}
 


{{%  insert-safekit-hub-fr %}}
 


{{%  insert-safekit-4-buttons-fr %}}