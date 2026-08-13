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


<img src="/safekit-docs/wp-content/uploads/2023/02/safekit-prim-second-300.png" width="300" alt="Redundant servers with real-time file replication and failover">


In a mirror cluster, the SafeKit software is installed on two physical or virtual servers running Windows or Linux (on premise or in the Cloud). The primary server is the active server and runs a critical application. The secondary is a passive redundant server receiving in real-time all modifications made by the application inside its files. Clients are connected to a [virtual IP address](</safekit-docs/best-practises/how-a-virtual-ip-address-works/#virtual-ip-same-subnet-failover>). If the primary server is down, SafeKit restarts automatically the critical application on the passive redundant server which becomes primary and switches the virtual IP address. When the failed server is restarted, it is automatically resynchronized and becomes the passive redundant server running as secondary.

## How to implement active/active redundant servers with network load balancing and failover?

### The SafeKit farm cluster


<img src="/safekit-docs/wp-content/uploads/2023/02/safekit-up-up-up-300.png" width="300" alt="Redundant servers with network load balancing and failover">


In a farm cluster, the SafeKit software is installed on redundant servers running Windows or Linux (on premise or in the Cloud). All redundant servers are active and run a same critical front-end application. Clients are connected to a [virtual IP address](</safekit-docs/best-practises/how-a-virtual-ip-address-works/#vip-load-balancing-same-subnet>). TCP sessions are load balanced between all redundant servers . If one server is down, SafeKit automatically reconfigures load balancing of TCP sessions between the remaining active servers. When the failed server is restarted, it is automatically reintegrated as an active redundant server and receives new TCP sessions.


<!-- BEGIN INSERT: insert-safekit-hub-en lang="en" display="content" -->
 

## 🔍 SafeKit High Availability Navigation Hub {#hub}

**Explore SafeKit: Features, technical videos, documentation, and free trial**

Resource Type | Description | Direct Link  
---|---|---  
**Key Features** | Why Choose SafeKit for Simple and Cost-Effective High Availability? | [See Why Choose SafeKit for High Availability](</safekit-docs/#why-choose-safekit-for-ha> "Discover SafeKit features for simple and cost-effective high availability")  
**Use Cases** | Explore How SafeKit Ensures the High Availability of Critical Infrastructure | [See All Use Cases (OEM Software, Edge Servers, SCADA, and more)](</safekit-docs/#safekit-use-cases> "Explore SafeKit high availability use cases")  
**Deployment Model** | All-in-One SANless HA: Shared-Nothing Software Clustering | [See SafeKit All-in-One SANless HA](</safekit-docs/#all-in-one-sanless-ha> "Learn about all-in-one SANless high availability with shared-nothing software clustering")  
**HA Strategies** | SafeKit: Infrastructure (VM) vs. Application-Level High Availability | [See SafeKit HA & Redundancy: VM vs. Application Level](</safekit-docs/#safekit-ha-redundancy-choices> "Compare VM-level redundancy with SafeKit application-level high availability strategies")  
**Technical Specifications** | Technical Limitations for SafeKit Clustering | [See SafeKit High Availability Limitations](</safekit-docs/#safekit-ha-limitations> "Technical requirements and limitations for SafeKit application clustering")  
**Proof of Concept** | SafeKit: High Availability Configuration & Failover Demos | [See SafeKit Failover Tutorials](</safekit-docs/#safekit-failover-tutorials> "Step-by-step videos on SafeKit high availability, from installation to automated failover")  
**Architecture** | How the SafeKit Mirror Cluster works (Real-Time Replication & Failover) | [See SafeKit Mirror Cluster: Real-Time Replication & Failover](</safekit-docs/#safekit-mirror-cluster> "See technical architecture and failover mechanism of SafeKit Mirror Cluster")  
**Architecture** | How the SafeKit Farm Cluster works (Network Load Balancing & Failover) | [See SafeKit Farm Cluster: Network Load Balancing & Failover](</safekit-docs/#safekit-farm-cluster> "Technical overview of SafeKit Farm Cluster architecture with network load balancing")  
**Competitive Advantages** | Comparison: SafeKit vs. Traditional High Availability (HA) Clusters | [See SafeKit vs. Traditional HA Cluster Comparison](</safekit-docs/#safekit-ha-comparison> "Detailed comparison of SafeKit software vs traditional hardware-based HA clusters")  
**Technical Resources** | SafeKit High Availability: Documentation, Downloads & Trial | [See SafeKit HA Free Trial & Technical Documentation](</safekit-docs/#safekit-ha-technical-resources> "Access SafeKit free trial, technical documentation, and high availability white papers")  
**Pre-configured Solutions** | SafeKit Application Module Library: Ready-to-Use HA Solutions | [See SafeKit High Availability Application Modules](</safekit-docs/#safekit-ha-application-modules> "Browse the library of pre-configured SafeKit modules for automated application failover")  
  

<!-- END INSERT: insert-safekit-hub-en lang="en" display="content" -->
 


<!-- BEGIN INSERT: insert-safekit-4-buttons-en lang="en" display="content" -->
<div class="button-row">
  <a class="btn-action" href="https://safekit.eviden.com/contact-us-for-safekit/">🧑 Contact us</a>
  <a class="btn-action" href="/safekit-docs/resources/safekit-free-trial/">🎁 SafeKit free trial</a>
  <a class="btn-action" href="https://training.my.evidian.com/mod/page/view.php?id=712">🏅 Free certification</a>
  <a class="btn-action" href="https://safekit.eviden.com/get-a-quote-safekit/">💰 Perpetual license cost</a>
</div>
<!-- END INSERT: insert-safekit-4-buttons-en lang="en" display="content" -->