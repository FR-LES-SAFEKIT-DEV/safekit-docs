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



<!-- BEGIN INSERT: insert-safekit-hub-en lang="en" display="content" -->
 

## 🔍 SafeKit High Availability Navigation Hub {#hub}

**Explore SafeKit: Features, technical videos, documentation, and free trial**

Resource Type | Description | Direct Link  
---|---|---  
**Key Features** | Why Choose SafeKit for Simple and Cost-Effective High Availability? | [See Why Choose SafeKit for High Availability](</#why-choose-safekit-for-ha> "Discover SafeKit features for simple and cost-effective high availability")  
**Use Cases** | Explore How SafeKit Ensures the High Availability of Critical Infrastructure | [See All Use Cases (OEM Software, Edge Servers, SCADA, and more)](</#safekit-use-cases> "Explore SafeKit high availability use cases")  
**Deployment Model** | All-in-One SANless HA: Shared-Nothing Software Clustering | [See SafeKit All-in-One SANless HA](</#all-in-one-sanless-ha> "Learn about all-in-one SANless high availability with shared-nothing software clustering")  
**HA Strategies** | SafeKit: Infrastructure (VM) vs. Application-Level High Availability | [See SafeKit HA & Redundancy: VM vs. Application Level](</#safekit-ha-redundancy-choices> "Compare VM-level redundancy with SafeKit application-level high availability strategies")  
**Technical Specifications** | Technical Limitations for SafeKit Clustering | [See SafeKit High Availability Limitations](</#safekit-ha-limitations> "Technical requirements and limitations for SafeKit application clustering")  
**Proof of Concept** | SafeKit: High Availability Configuration & Failover Demos | [See SafeKit Failover Tutorials](</#safekit-failover-tutorials> "Step-by-step videos on SafeKit high availability, from installation to automated failover")  
**Architecture** | How the SafeKit Mirror Cluster works (Real-Time Replication & Failover) | [See SafeKit Mirror Cluster: Real-Time Replication & Failover](</#safekit-mirror-cluster> "See technical architecture and failover mechanism of SafeKit Mirror Cluster")  
**Architecture** | How the SafeKit Farm Cluster works (Network Load Balancing & Failover) | [See SafeKit Farm Cluster: Network Load Balancing & Failover](</#safekit-farm-cluster> "Technical overview of SafeKit Farm Cluster architecture with network load balancing")  
**Competitive Advantages** | Comparison: SafeKit vs. Traditional High Availability (HA) Clusters | [See SafeKit vs. Traditional HA Cluster Comparison](</#safekit-ha-comparison> "Detailed comparison of SafeKit software vs traditional hardware-based HA clusters")  
**Technical Resources** | SafeKit High Availability: Documentation, Downloads & Trial | [See SafeKit HA Free Trial & Technical Documentation](</#safekit-ha-technical-resources> "Access SafeKit free trial, technical documentation, and high availability white papers")  
**Pre-configured Solutions** | SafeKit Application Module Library: Ready-to-Use HA Solutions | [See SafeKit High Availability Application Modules](</#safekit-ha-application-modules> "Browse the library of pre-configured SafeKit modules for automated application failover")  
  

<!-- END INSERT: insert-safekit-hub-en lang="en" display="content" -->
 


<!-- BEGIN INSERT: insert-safekit-4-buttons-en lang="en" display="content" -->
<div class="button-row">
  <a class="btn-action" href="https://safekit.eviden.com/contact-us-for-safekit/">🧑 Contact us</a>
  <a class="btn-action" href="/resources/safekit-free-trial/">🎁 SafeKit free trial</a>
  <a class="btn-action" href="https://training.my.evidian.com/mod/page/view.php?id=712">🏅 Free certification</a>
  <a class="btn-action" href="https://safekit.eviden.com/get-a-quote-safekit/">💰 Perpetual license cost</a>
</div>
<!-- END INSERT: insert-safekit-4-buttons-en lang="en" display="content" -->