---
title: "How to Implement Redundant Servers with Simple HA Software"
canonical: "https://safekit.eviden.com/best-practises/how-to-implement-redundant-servers-with-a-simple-software-windows-linux/"
description: "How to implement redundant servers with software only: SafeKit provides real-time replication and automatic failover on Windows and Linux, with no shared disk."
category: "best-practises"
lang: "en"
topics: "How to implement active/passive redundant servers with real-time replication and failover?, How to implement active/active redundant servers with network load balancing and failover?, 🔍 Explore SafeKit"
image: "/wp-content/uploads/2023/02/safekit-prim-second-300.png"
schemaType: "TechArticle"
---

# How to Implement Redundant Servers with Simple HA Software {#how-to-implement-redundant-servers-with-simple-ha-software}

## How to implement active/passive redundant servers with real-time replication and failover? {#how-to-implement-activepassive-redundant-servers-with-real-time-replication-and-failover}

### The SafeKit mirror cluster {#the-safekit-mirror-cluster}


![Redundant servers with real-time file replication and failover](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


In a mirror cluster, the SafeKit software is installed on two servers. The servers are physical or virtual. They run Windows or Linux, on premises or in the cloud. The primary server is the active server. It runs the critical application. The secondary server is a passive redundant server. It receives in real time all the changes made by the application in its files. Clients connect to a [virtual IP address](</best-practises/how-a-virtual-ip-address-works/#virtual-ip-same-subnet-failover>). If the primary server fails, SafeKit automatically restarts the critical application on the secondary server. This server becomes primary and takes over the virtual IP address. When the failed server restarts, SafeKit automatically resynchronizes its data. This server then becomes the passive redundant server, in the secondary state.

## How to implement active/active redundant servers with network load balancing and failover? {#how-to-implement-activeactive-redundant-servers-with-network-load-balancing-and-failover}

### The SafeKit <span class="notranslate farm-term" translate="no">farm</span> cluster {#the-safekit-farm-cluster}


![Redundant servers with network load balancing and failover](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


In a <span class="notranslate farm-term" translate="no">farm</span> cluster, the SafeKit software is installed on several redundant servers. The servers run Windows or Linux, on premises or in the cloud. All redundant servers are active. They run the same critical front-end application. Clients connect to a [virtual IP address](</best-practises/how-a-virtual-ip-address-works/#vip-load-balancing-same-subnet>). TCP sessions are load balanced between all redundant servers. If one server fails, SafeKit automatically reconfigures the load balancing of TCP sessions between the remaining active servers. When the failed server restarts, SafeKit automatically reintegrates it as an active redundant server. This server then receives new TCP sessions.


{{%  insert-safekit-hub-en  %}}

{{%  insert-safekit-4-buttons-en  %}}