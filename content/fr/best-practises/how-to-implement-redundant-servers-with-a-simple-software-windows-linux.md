---
title: "Comment implémenter des serveurs redondants avec un logiciel de haute disponibilité simple"
canonical: "https://safekit.eviden.com/fr/best-practises/how-to-implement-redundant-servers-with-a-simple-software-windows-linux/"
description: "Découvrez comment implémenter des serveurs redondants grâce à une approche logicielle simple. SafeKit propose une architecture sans SAN pour Windows et Linux , assurant la réplication des données en temps réel et le basculement automatique sans disques partagés ni compétences informatiques spécialisées."
category: "best-practises"
lang: "fr"
topics: "Comment implémenter des serveurs redondants actifs/passifs avec réplication en temps réel et basculement ? Comment implémenter des serveurs redondants actifs/actifs avec équilibrage de charge réseau et basculement ? 🔍 SafeKit Centre de navigation haute disponibilité"
---

# Comment implémenter des serveurs redondants avec le logiciel HA simple {#how-to-implement-redundant-servers-with-simple-ha-software}

## Comment implémenter des serveurs redondants actifs/passifs avec réplication en temps réel et basculement ? {#how-to-implement-activepassive-redundant-servers-with-real-time-replication-and-failover}

### Le cluster SafeKit mirror {#the-safekit-mirror-cluster}


![ Serveurs redondants avec réplication de fichiers en temps réel et basculement ](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


Dans un cluster mirror , le logiciel SafeKit est installé sur deux serveurs physiques ou virtuels exécutant Windows ou Linux (sur site ou dans le cloud). Le serveur principal est le serveur actif et exécute une application critique. Le serveur secondaire est un serveur de secours passif qui reçoit en temps réel toutes les modifications apportées par l'application à ses fichiers. Les clients sont connectés à une adresse IP virtuelle [ ](</fr/best-practises/how-a-virtual-ip-address-works/#virtual-ip-same-subnet-failover>) . Si le serveur principal tombe en panne, SafeKit redémarre automatiquement l'application critique sur le serveur de secours passif, qui devient alors le serveur principal et inverse l'adresse IP virtuelle. Lorsque le serveur défaillant redémarre, il est automatiquement resynchronisé et redevient le serveur de secours passif fonctionnant comme serveur secondaire.

## Comment implémenter des serveurs redondants actifs/actifs avec répartition de charge réseau et basculement ? {#how-to-implement-activeactive-redundant-servers-with-network-load-balancing-and-failover}

### Le cluster SafeKit `farm` {#the-safekit-farm-cluster}


![ Serveurs redondants avec répartition de charge réseau et basculement ](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


Dans un cluster `farm` , le logiciel SafeKit est installé sur des serveurs redondants exécutant Windows ou Linux (sur site ou dans le cloud). Tous les serveurs redondants sont actifs et exécutent la même application frontale critique. Les clients se connectent à une adresse IP virtuelle [ ](</fr/best-practises/how-a-virtual-ip-address-works/#vip-load-balancing-same-subnet>) ). Les sessions TCP sont réparties entre tous les serveurs redondants. Si un serveur tombe en panne, SafeKit reconfigure automatiquement la répartition des sessions TCP entre les serveurs actifs restants. Lorsque le serveur défaillant redémarre, il est automatiquement réintégré comme serveur redondant actif et reçoit les nouvelles sessions TCP.


{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}