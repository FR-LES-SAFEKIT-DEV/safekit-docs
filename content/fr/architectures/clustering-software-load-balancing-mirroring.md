---
title: "Logiciel de clustering pour fermes et miroirs : haute disponibilité et équilibrage de charge"
slug: "clustering-software-load-balancing-mirroring"
canonical: "https://safekit.eviden.com/fr/architectures/clustering-software-load-balancing-mirroring/"
description: "Logiciel de clustering pour fermes et miroirs : haute disponibilité et équilibrage de charge Haute disponibilité et scalabilité des applications web et bases de données critiques avec le logiciel de clustering SafeKit"
category: "architectures"
lang: "fr"
topics: "Haute disponibilité et scalabilité des applications web et bases de données critiques avec le logiciel de clustering SafeKit, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# Logiciel de clustering pour fermes et miroirs : haute disponibilité et équilibrage de charge

## Haute disponibilité et scalabilité des applications web et bases de données critiques avec le logiciel de clustering SafeKit

### Load balancing, mirroring et basculement sur panne


<img src="/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png" width="300" alt="Logiciel de clustering avec load balancing et mirroring">


### Exemple avec le logiciel de clustering SafeKit

Par exemple, avec le logiciel de clustering SafeKit, vous pouvez implémenter le load balancing IIS et le mirroring de Microsoft SQL Server.

Pour cela, vous devez déployer un module ferme pour IIS et un module miroir pour Microsoft SQL Server. Chaque module ferme et miroir est configuré avec sa propre adresse IP virtuelle et ses propres scripts de redémarrage.

Les modules miroir et ferme peuvent être déployés sur un seul cluster de deux serveurs. IIS et Microsoft SQL Server fonctionneront sur ces deux serveurs. Ou, les deux modules peuvent être déployés sur deux clusters avec des serveurs différents.

Avec le logiciel de clustering SafeKit, il n'y a aucune différence entre un déploiement sur les mêmes serveurs ou sur des serveurs différents.

### Solution de haute disponibilité et de scalabilité

Le logiciel de clustering SafeKit fournit une solution simple de haute disponibilité et de scalabilité pour les applications Web et les bases de données critiques.

Ainsi, le load balancing réseau, le mirroring des données en temps réel et le basculement des applications sont gérés de manière cohérente dans un même produit.

Lorsque vous comparez le logiciel de clustering SafeKit avec le clustering matériel, vous n'avez pas besoin de disque partagé, de SAN répliqué, de load balancers, d'éditions entreprise du système d'exploitation ou des base de données.


{{%  insert-safekit-hub-fr %}}
 


{{%  insert-safekit-4-buttons-fr %}}