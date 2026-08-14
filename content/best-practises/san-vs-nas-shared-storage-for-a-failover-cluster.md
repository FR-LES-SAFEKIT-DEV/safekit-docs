---
title: "SAN vs. NAS Shared Storage for Failover Clustering: A Detailed Comparison"
slug: "san-vs-nas-shared-storage-for-a-failover-cluster"
canonical: "https://safekit.eviden.com/best-practises/san-vs-nas-shared-storage-for-a-failover-cluster/"
description: "SAN vs. NAS Shared Storage for Failover Clustering: A Detailed Comparison What is the simplest solution between a SAN vs a NAS shared storage for a failover cluster?"
category: "best-practises"
lang: "en"
topics: "What is the simplest solution between a SAN vs a NAS shared storage for a failover cluster?, 🔍 SafeKit High Availability Navigation Hub"
---

# SAN vs. NAS Shared Storage for Failover Clustering: A Detailed Comparison

## What is the simplest solution between a SAN vs a NAS shared storage for a failover cluster?

###  SAN shared storage or NAS iSCSI shared storage for a failover cluster 


<img src="/wp-content/uploads/2023/03/raw-disk-shared-storage.png" width="200" alt="SAN shared storage or NAS iSCSI shared storage for a failover cluster">


There are several elements that make this architecture complex to implement:

  * on failover, switching the shared storage requires low level instructions which are storage manufacturer dependent,
  * recovery procedure on the file system (FS) must be passed before restarting the application,
  * if both file systems on both nodes access the same raw disk at the same time, the full file system will be corrupted,
  * to avoid a double access, a quorum disk must be configured.


###  NAS SMB shared storage or NAS NFS shared storage for a failover cluster 


<img src="/wp-content/uploads/2023/03/nas-shared-storage-1.png" width="200" alt="NAS SMB shared storage or NAS NFS shared storage for a failover cluster">


There are several elements that make this architecture simple to implement: 
  * on failover, switching the shared storage means only remounting the external file system,
  * no recovery procedure on the file system must be passed before restarting the application,
  * if both nodes access the same shared file system at the same time, the full file system will be not be corrupted,
  * however, there is still the possibility of a double execution of the same application corrupting its data in the shared storage when nodes are isolated.


###  Real-time replication and failover with Eviden SafeKit 


<img src="/wp-content/uploads/2023/03/no-shared-storage.png" width="200" alt="Real-time replication and failover with SafeKit">


There are no such issues with SafeKit because its replication and failover solution does not require a shared storage.

However, if SafeKit must manage a shared storage:

  * use a NAS SMB shared storage or a NAS NFS shared storage,
  * put in the restart scripts the mount/umount of the external file system,
  * configure the [SafeKit split brain checker](</best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) to avoid a double execution of the same application accessing the shared storage when nodes are isolated.



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