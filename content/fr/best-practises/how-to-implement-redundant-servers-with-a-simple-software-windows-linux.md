---
title: "Comment mettre en œuvre des serveurs redondants avec un logiciel HA simple"
canonical: "https://safekit.eviden.com/fr/best-practises/how-to-implement-redundant-servers-with-a-simple-software-windows-linux/"
description: "Serveurs redondants par le seul logiciel : SafeKit assure réplication en temps réel et basculement automatique sous Windows et Linux, sans disque partagé."
category: "best-practises"
lang: "fr"
topics: "Comment mettre en œuvre des serveurs redondants actifs/passifs avec réplication en temps réel et basculement ?, Comment mettre en œuvre des serveurs redondants actifs/actifs avec équilibrage de charge réseau et basculement ?, 🔍 Explorez SafeKit"
translation: "translate_md 2026-11-19.2 | glossaire 2026-11-19.30 | Translation LLM | 59 expressions"
image: "/wp-content/uploads/2023/02/safekit-prim-second-300.png"
schemaType: "TechArticle"
---

# Comment mettre en œuvre des serveurs redondants avec un logiciel HA simple {#how-to-implement-redundant-servers-with-simple-ha-software}

## Comment mettre en œuvre des serveurs redondants actifs/passifs avec réplication en temps réel et basculement ? {#how-to-implement-activepassive-redundant-servers-with-real-time-replication-and-failover}

### Le cluster mirror SafeKit {#the-safekit-mirror-cluster}


![Serveurs redondants avec réplication de fichiers en temps réel et basculement](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


Dans un cluster mirror, le logiciel SafeKit est installé sur deux serveurs. Les serveurs sont physiques ou virtuels. Ils fonctionnent sous Windows ou Linux, sur site ou dans le cloud. Le serveur principal est le serveur actif. Il exécute l’application critique. Le serveur secondaire est un serveur redondant passif. Il reçoit en temps réel toutes les modifications apportées par l’application dans ses fichiers. Les clients se connectent à une [adresse IP virtuelle](</fr/best-practises/how-a-virtual-ip-address-works/#virtual-ip-same-subnet-failover>). Si le serveur principal tombe en panne, SafeKit redémarre automatiquement l’application critique sur le serveur secondaire. Ce serveur devient principal et prend en charge l’adresse IP virtuelle. Lorsque le serveur en panne redémarre, SafeKit resynchronise automatiquement ses données. Ce serveur devient alors le serveur redondant passif, en état secondaire.

## Comment mettre en œuvre des serveurs redondants actifs/actifs avec équilibrage de charge réseau et basculement ? {#how-to-implement-activeactive-redundant-servers-with-network-load-balancing-and-failover}

### Le cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#the-safekit-farm-cluster}


![Serveurs redondants avec équilibrage de charge réseau et basculement](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


Dans un cluster <span class="notranslate farm-term" translate="no">farm</span>, le logiciel SafeKit est installé sur plusieurs serveurs redondants. Les serveurs exécutent Windows ou Linux, sur site ou dans le cloud. Tous les serveurs redondants sont actifs. Ils exécutent la même application frontale critique. Les clients se connectent à une [adresse IP virtuelle](</fr/best-practises/how-a-virtual-ip-address-works/#vip-load-balancing-same-subnet>). Les sessions TCP sont réparties entre tous les serveurs redondants. Si un serveur tombe en panne, SafeKit reconfigure automatiquement la répartition de la charge des sessions TCP entre les serveurs actifs restants. Lorsque le serveur défaillant redémarre, SafeKit le réintègre automatiquement en tant que serveur redondant actif. Ce serveur reçoit alors de nouvelles sessions TCP.


{{%  insert-safekit-hub-fr  %}}

{{%  insert-safekit-4-buttons-fr  %}}