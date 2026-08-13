---
title: "Shared Nothing vs. Shared Disk Architecture: Choosing the Best HA Cluster"
slug: "shared-nothing-architecture-vs-shared-disk-architecture"
canonical: "https://safekit.eviden.com/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/"
description: "Shared Nothing vs. Shared Disk Architecture: Choosing the Best HA Cluster Shared nothing architecture vs shared disk architecture for high availability clusters"
category: "best-practises"
lang: "en"
topics: "Shared nothing architecture vs shared disk architecture for high availability clusters, Shared Nothing Architecture vs Shared Disk Architecture: Pros and Cons, Video comparing a shared disk architecture and a shared nothing architecture when considering disaster recovery, 🔍 SafeKit High Availability Navigation Hub"
---

# Shared Nothing vs. Shared Disk Architecture: Choosing the Best HA Cluster

## Shared nothing architecture vs shared disk architecture for high availability clusters

### Overview

This article explores the pros and cons of shared nothing architecture vs shared disk architecture for high availability clusters. We are looking at hardware constraints, impact on application data organization, recovery time, simplicity of implementation.


<img src="/safekit-docs/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png" width="200" alt="Shared nothing architecture vs shared disk architecture">


The following comparative tables explain in detail the difference between shared disk architecture and SafeKit, a software clustering product implementing a shared nothing architecture.

### What is a shared disk architecture?

A shared disk architecture (like with [Microsoft failover cluster](<https://learn.microsoft.com/en-us/windows-server/failover-clustering/clustering-requirements>)) is based on 2 servers sharing a disk with an automatic application failover in case of hardware of software failures.

This architecture has hardware constraints: the specific external shared storage, the specific cards to install inside the servers, and the specific switches between the servers and the shared storage.

A shared disk architecture has a strong impact on the organization of application data. All application data must be localized in the shared disk for a restart after a failover.

Moreover, on failover, the file system recovery procedure must be executed on the shared disk. This increases the recovery time (RTO).

Finally, the solution is not easy to configure because skills are required to configure the specific hardware. Additionally, application skills are required to configure application data in the shared disk.

### What is a shared nothing architecture ?

A shared nothing architecture (like with [SafeKit](</safekit-docs/>)) is based on 2 servers replicating data in real-time with an automatic application failover in case of hardware of software failures.

There are two types of data replication: [byte level file replication vs block level disk replication](</safekit-docs/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>). We consider here byte level file replication because it has many advantages against block level disk replication.

The shared nothing architecture has no hardware constraints: the servers can be physical or virtual with any type of disk organization. Real-time file replication ([synchronous](</safekit-docs/best-practises/synchronous-replication-vs-asynchronous-replication/>) for having 0 data loss) is made through the standard network between servers.

This architecture has no impact on application data organization. For instance, if an application has its data in the system disk, real-time file replication is working.

Recovery time (RTO) in the event of a failover is reduced to the application restart time on the secondary server's replicated files.

Finally, the solution is very simple to configure as only the paths of directories to replicate are configured.

## Shared Nothing Architecture vs Shared Disk Architecture: Pros and Cons


<!-- BEGIN INSERT: insert-safekit-shared-nothing-vs-shared-disk-table-en lang="en" display="content" -->
 

Choosing the right high availability architecture is critical for balancing cost, complexity, and reliability. The two main approaches — **shared nothing** and **shared disk** — differ fundamentally in how they handle data redundancy and failover. A shared nothing architecture like SafeKit replicates data between independent servers with their own local storage, while a shared disk architecture relies on a centralized storage bay (SAN) accessed by multiple servers. The following table compares these two approaches across key criteria.

Criteria | Shared Nothing Architecture | Shared Disk Architecture  
---|---|---  
**Product** | [SafeKit on Windows and Linux](</safekit-docs/>) | Clustering toolkit for shared disk  
**Extra hardware** | No — uses internal disks of servers | Yes — extra cost with a shared bay of disks (SAN)  
**Application data organization** | Zero impact on application data organization. [Just define directories to replicate in real-time](</safekit-docs/architectures/file-replication-byte-level-with-failover-mirror-cluster/>). Even directories inside the system disk can be replicated. | Requires special configuration of the application to put its data on a shared disk. Data on the system disk cannot be recovered.  
**Complexity of deployment** | No — install a software on 2 servers | Yes — requires specific IT skills to configure OS and shared disk  
**Failover** | Just restart the application on the second server. | Switch the shared disk. Remount the file system. Run the recovery procedure on the file system. Then restart the application.  
**Disaster recovery** | Just place the 2 servers in 2 remote sites connected by an extended LAN. | Extra cost with a second bay of disks. Requires specific IT skills to configure mirroring of bays across a SAN.  
**Quorum and split brain** | Application runs on a single server after network isolation (split brain). Data coherency is guaranteed. No need for a third machine, quorum disk, or special heartbeat line. [More on heartbeat, failover and quorum](</safekit-docs/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) | Requires a special quorum disk or a third quorum server to avoid data corruption on split brain.  
**Best suited for** | [Software editors wanting to add a simple HA option to their application](</safekit-docs/use-cases/application-clustering-software/>) | Enterprises with IT skills in clustering and large database applications  
  
**In summary** , the shared nothing architecture, as implemented by SafeKit, wins on **simplicity** , **cost** , and **deployment speed**. It requires no extra hardware, no specialized IT skills, and no changes to the application's data organization. Failover is straightforward, disaster recovery is built-in, and split brain is handled without additional infrastructure.

The shared disk architecture remains relevant for large enterprises with existing SAN infrastructure and dedicated IT teams managing very large databases. However, for most application high availability needs — especially for software editors, OT/edge environments, and distributed sites — shared nothing with SafeKit is the simpler, more cost-effective choice.


<!-- END INSERT: insert-safekit-shared-nothing-vs-shared-disk-table-en lang="en" display="content" -->
 

## Video comparing a shared disk architecture and a shared nothing architecture when considering disaster recovery

### Video content

This video first illustrates the work to be done with a shared disk architecture when the two servers of a high availability cluster must be placed on two remote sites.

Next, the video demonstrates the same use case with the SafeKt shared nothing architecture.

### SafeKit Video: Disaster recovery with a shared disk and a shared nothing cluster (2:25)


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