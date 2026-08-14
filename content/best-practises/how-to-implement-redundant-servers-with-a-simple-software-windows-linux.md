---
title: "How to Implement Redundant Servers with Simple HA Software"
slug: "how-to-implement-redundant-servers-with-a-simple-software-windows-linux"
canonical: "https://safekit.eviden.com/best-practises/how-to-implement-redundant-servers-with-a-simple-software-windows-linux/"
description: "How to Implement Redundant Servers with Simple HA Software How to implement active/passive redundant servers with real-time replication and failover? The SafeKit mirror cluster In a mirror cluster, the SafeKit software is installed on two physical or virtual servers running Windows or Linux (on premise or in the Cloud). The primary server is the active […]"
category: "best-practises"
lang: "en"
topics: "How to implement active/passive redundant servers with real-time replication and failover?, How to implement active/active redundant servers with network load balancing and failover?, 🔍 SafeKit High Availability Navigation Hub"
---

# How to Implement Redundant Servers with Simple HA Software

## How to implement active/passive redundant servers with real-time replication and failover?

### The SafeKit mirror cluster


<img src="/wp-content/uploads/2023/02/safekit-prim-second-300.png" width="300" alt="Redundant servers with real-time file replication and failover">


In a mirror cluster, the SafeKit software is installed on two physical or virtual servers running Windows or Linux (on premise or in the Cloud). The primary server is the active server and runs a critical application. The secondary is a passive redundant server receiving in real-time all modifications made by the application inside its files. Clients are connected to a [virtual IP address](</best-practises/how-a-virtual-ip-address-works/#virtual-ip-same-subnet-failover>). If the primary server is down, SafeKit restarts automatically the critical application on the passive redundant server which becomes primary and switches the virtual IP address. When the failed server is restarted, it is automatically resynchronized and becomes the passive redundant server running as secondary.

## How to implement active/active redundant servers with network load balancing and failover?

### The SafeKit farm cluster


<img src="/wp-content/uploads/2023/02/safekit-up-up-up-300.png" width="300" alt="Redundant servers with network load balancing and failover">


In a farm cluster, the SafeKit software is installed on redundant servers running Windows or Linux (on premise or in the Cloud). All redundant servers are active and run a same critical front-end application. Clients are connected to a [virtual IP address](</best-practises/how-a-virtual-ip-address-works/#vip-load-balancing-same-subnet>). TCP sessions are load balanced between all redundant servers . If one server is down, SafeKit automatically reconfigures load balancing of TCP sessions between the remaining active servers. When the failed server is restarted, it is automatically reintegrated as an active redundant server and receives new TCP sessions.


{{%  insert-safekit-hub-en %}}
 


{{%  insert-safekit-4-buttons-en %}}