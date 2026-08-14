---
title: "Comment implémenter des serveurs redondants avec un logiciel de haute disponibilité simple"
slug: "how-to-implement-redundant-servers-with-a-simple-software-windows-linux"
canonical: "https://safekit.eviden.com/fr/best-practises/how-to-implement-redundant-servers-with-a-simple-software-windows-linux/"
description: "Comment implémenter des serveurs redondants avec un logiciel de haute disponibilité simple Comment mettre en œuvre des serveurs redondants actif/passif avec réplication en temps réel et basculement sur panne ? Le cluster miroir de SafeKit Dans un cluster miroir, le logiciel SafeKit est installé sur deux serveurs physiques ou virtuels exécutant Windows ou Linux (sur […]"
category: "best-practises"
lang: "fr"
topics: "Comment mettre en œuvre des serveurs redondants actif/passif avec réplication en temps réel et basculement sur panne ?, Comment mettre en œuvre des serveurs redondants actif/actif avec équilibrage de la charge réseau et basculement sur panne ?, 🔍 Hub de navigation SafeKit Haute Disponibilité"
---

# Comment implémenter des serveurs redondants avec un logiciel de haute disponibilité simple

## Comment mettre en œuvre des serveurs redondants actif/passif avec réplication en temps réel et basculement sur panne ?

### Le cluster miroir de SafeKit


<img src="/wp-content/uploads/2023/02/safekit-prim-second-300.png" width="300" alt="Serveurs redondants avec réplication de fichiers temps réel et basculement sur panne">


Dans un cluster miroir, le logiciel SafeKit est installé sur deux serveurs physiques ou virtuels exécutant Windows ou Linux (sur site ou dans le Cloud). Le serveur primaire est le serveur actif et exécute une application critique. Le serveur secondaire est un serveur redondant passif et reçoit en temps réel toutes les modifications apportées par l'application à l'intérieur de ses fichiers. Les clients sont connectés à une [ adresse IP virtuelle](</fr/best-practises/how-a-virtual-ip-address-works/#virtual-ip-same-subnet-failover>). Si le serveur actif est en panne, SafeKit redémarre automatiquement l'application critique sur le serveur redondant passif qui devient primaire et commute l'adresse IP virtuelle. Lorsque le serveur défaillant est redémarré, il est automatiquement resynchronisé et devient le serveur redondant passif fonctionnant comme secondaire.

## Comment mettre en œuvre des serveurs redondants actif/actif avec équilibrage de la charge réseau et basculement sur panne ?

### Le cluster ferme de SafeKit


<img src="/wp-content/uploads/2023/02/safekit-up-up-up-300.png" width="300" alt="Serveurs redondants avec équilibrage de charge réseau et basculement sur panne">


Dans un cluster de serveurs en ferme, le logiciel SafeKit est installé sur des serveurs redondants sous Windows ou Linux (sur site ou dans le Cloud). Tous les serveurs sont actifs et exécutent une même application frontale critique. Les clients sont connectés à une [adresse IP virtuelle](</fr/best-practises/how-a-virtual-ip-address-works/#vip-load-balancing-same-subnet>). Les sessions TCP sont partagées entre tous les serveurs redondants. Si un serveur est en panne, SafeKit reconfigure automatiquement l'équilibrage de charge des sessions TCP entre les serveurs actifs restants. Lorsque le serveur défaillant est redémarré, il est automatiquement réintégré en tant que serveur redondant actif et reçoit de nouvelles sessions TCP.


{{%  insert-safekit-hub-fr %}}
 


{{%  insert-safekit-4-buttons-fr %}}