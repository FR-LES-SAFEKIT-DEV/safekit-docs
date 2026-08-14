---
title: "High Availability Architectures: Mirror, Farm, and Advanced Software Clustering"
slug: "architectures"
canonical: "https://safekit.eviden.com/architectures/"
description: "High Availability Architectures: Mirror, Farm, and Advanced Software Clustering What are the different high availability architectures and the different software clusters with SafeKit?"
category: "architectures"
lang: "en"
topics: "What are the different high availability architectures and the different software clusters with SafeKit?, How to build high availability clusters with SafeKit?, 🔍 SafeKit High Availability Navigation Hub"
---

# High Availability Architectures: Mirror, Farm, and Advanced Software Clustering

## What are the different high availability architectures and the different software clusters with SafeKit?

### Mirror cluster


<img src="/wp-content/uploads/2023/02/safekit-prim-second-300.png" width="300" alt="SafeKit mirror cluster">


[More information](</architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### Farm cluster


<img src="/wp-content/uploads/2023/02/safekit-up-up-up-300.png" width="300" alt="SafeKit farm cluster">


[More information](</architectures/network-load-balancing-cluster/>)

### Farm+mirror cluster


<img src="/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png" width="300" alt="SafeKit farm + mirror cluster">


[More information](</architectures/clustering-software-load-balancing-mirroring/>)

### Active/active cluster


<img src="/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png" width="300" alt="SafeKit active active cluster with real-time replication">


[More information](</architectures/active-active-cluster-real-time-replication/>)

### N-1 cluster


<img src="/wp-content/uploads/2023/02/safekit-n-1-300-3.png" width="300" alt="SafeKit N-1 redundancy cluster">


[More information](</architectures/n-1-redundancy/>)

## How to build high availability clusters with SafeKit?

### Use high availability modules

A high availability module is a customization of SafeKit for an application. There are two types of modules: the mirror module with real-time data replication and failover and the farm module with load balancing and failover.

If you deploy a mirror module on 2 servers, then you create a mirror cluster and if you deploy a farm module on N servers, then you create a farm cluster.

Several application modules can be deployed on the same servers. Thus, advanced clustering architectures can be implemented like those presented previously (farm+mirror, active/active, N-1).

### What is an application module?

In practice, an application module is a “.Safe” file (zip type) including:

1 - the configuration file userconfig.xml which contains:

  * names or physical IP addresses of the servers,
  * name or virtual IP address of the cluster,
  * file directories to replicate in real time (for a mirror module),
  * network load balancing criteria (for a farm module),
  * configuration of software and hardware failures detectors


2 - the scripts to start and stop the application.

### Plug and play deployment of high availability modules

Once an application module is configured and tested with an application, deployment requires no specific IT skills:

  1. install application on 2 standard servers (physical or virtual),
  2. install the SafeKit software on both servers,
  3. install the application module on both servers.



{{%  insert-safekit-hub-en %}}
 


{{%  insert-safekit-4-buttons-en %}}