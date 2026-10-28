---
title: "Logiciel de clustering pour fermes et serveurs miroirs : haute disponibilité et équilibrage de charge"
canonical: "https://safekit.eviden.com/fr/architectures/clustering-software-load-balancing-mirroring/"
description: "Déployez des architectures avancées en combinant les modules SafeKit Farm et Mirror . Optimisez la charge réseau pour une évolutivité optimale du front-end grâce à la réplication synchrone en temps réel qui protège vos données back-end. Créez facilement des clusters sans SAN pour Windows et Linux , sans compétences informatiques particulières. Téléchargez votre version d'essai gratuite."
category: "architectures"
lang: "fr"
topics: "Haute disponibilité et évolutivité des applications web et de bases de données critiques grâce au logiciel de clustering SafeKit , 🔍 SafeKit High Availability Navigation Hub"
---

# Logiciel de clustering pour fermes et serveurs miroirs : Haute disponibilité et équilibrage de charge {#clustering-software-for-farms-and-mirrors-high-availability--load-balancing}

## Haute disponibilité et évolutivité des applications web et de bases de données critiques grâce au logiciel de clustering SafeKit {#high-availability-and-scalability-of-critical-web-and-database-applications-with-the-safekit-clustering-software}

### Équilibrage de charge, mise en miroir et basculement {#load-balancing-mirroring-and-failover}


![ SafeKit Clustering avec répartition de charge et mise en miroir ](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


### Exemple avec le logiciel de clustering SafeKit {#example-with-the-safekit-clustering-software}

Par exemple, avec le logiciel de clustering SafeKit , vous pouvez implémenter l'équilibrage de charge IIS et la mise en miroir Microsoft SQL Server .

Pour cela, vous devez déployer un module `farm` pour le serveur SQL IIS et un module mirror pour le serveur SQL Microsoft . Chaque module `farm` et mirror est configuré avec sa propre adresse IP virtuelle et ses propres scripts de redémarrage.

Les modules mirror et `farm` peuvent être déployés sur un même cluster de deux serveurs. Les modules IIS , Microsoft et SQL Server s'exécuteront alors sur ces deux serveurs. Il est également possible de déployer les deux modules sur deux clusters distincts, chacun composé de serveurs différents.

Avec le logiciel de clustering SafeKit , il n'y a aucune différence entre un déploiement sur les mêmes serveurs ou sur des serveurs différents.

### Solution de haute disponibilité et d'évolutivité {#high-availability-and-scalability-solution}

Le logiciel de clustering SafeKit offre une solution simple de haute disponibilité et d'évolutivité pour les applications Web et de bases de données critiques.

Par conséquent, l'équilibrage de charge du réseau, la mise en miroir des données en temps réel et le basculement des applications sont gérés de manière cohérente dans un seul et même produit.

En comparant le logiciel de clustering SafeKit avec le clustering matériel, vous n'avez pas besoin de disque partagé, de SAN répliqué, d'équilibreurs de charge, d'éditions Enterprise de système d'exploitation ou de base de données.


{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}