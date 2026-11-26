---
title: "Logiciel de clustering avec équilibrage de charge et mise en miroir : haute disponibilité et évolutivité"
canonical: "https://safekit.eviden.com/fr/architectures/clustering-software-load-balancing-mirroring/"
description: "Combinez modules farm et mirror SafeKit : l’équilibrage de charge fait évoluer le front-end, la réplication synchrone protège les données du back-end, sous Windows et Linux."
category: "architectures"
lang: "fr"
topics: "Haute disponibilité et évolutivité des applications web et de bases de données critiques avec le logiciel de clustering SafeKit, 🔍 Explorez SafeKit"
translation: "translate_md 2026-11-21.2 | glossaire 2026-11-21.11 | Translation LLM | 59 expressions"
image: "/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png"
schemaType: "TechArticle"
---

# Logiciel de clustering avec équilibrage de charge et mise en miroir : haute disponibilité et évolutivité {#clustering-software-for-farms-and-mirrors-high-availability--load-balancing}

## Haute disponibilité et évolutivité des applications web et de bases de données critiques avec le logiciel de clustering SafeKit {#high-availability-and-scalability-of-critical-web-and-database-applications-with-the-safekit-clustering-software}

### Répartition de charge, mise en miroir et basculement {#load-balancing-mirroring-and-failover}


![Clustering SafeKit avec répartition de charge et mise en miroir](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


### Exemple avec le logiciel de clustering SafeKit {#example-with-the-safekit-clustering-software}

Par exemple, avec le logiciel de clustering SafeKit, vous pouvez mettre en œuvre l’équilibrage de charge pour IIS et la mise en miroir pour Microsoft SQL Server.

Pour ce faire, déployez un module <span class="notranslate farm-term" translate="no">farm</span> pour IIS et un module mirror pour Microsoft SQL Server. Chaque module est configuré avec sa propre adresse IP virtuelle et ses propres scripts de redémarrage.

Les deux modules peuvent être déployés sur un seul cluster de deux serveurs, sur lequel IIS et Microsoft SQL Server s’exécutent tous deux. Les deux modules peuvent également être déployés sur deux clusters distincts avec des serveurs différents.

Avec le logiciel de clustering SafeKit, le déploiement sur les mêmes serveurs ou sur des serveurs différents fonctionne exactement de la même manière.

### Solution de haute disponibilité et d’évolutivité {#high-availability-and-scalability-solution}

Le logiciel de clustering SafeKit offre une solution simple de haute disponibilité et d’évolutivité pour les applications web et de bases de données critiques.

L’équilibrage de la charge du réseau, la mise en miroir des données en temps réel et le basculement des applications sont gérés de manière cohérente dans un seul produit.

Contrairement au clustering matériel, le logiciel de clustering SafeKit ne nécessite pas de disques partagés, de SAN répliqués, d’équilibreurs de charge matériels ou d’éditions Entreprise de systèmes d’exploitation ou de bases de données.


{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}