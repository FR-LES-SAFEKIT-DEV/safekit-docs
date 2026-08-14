---
title: "Combining SafeKit High Availability with Disaster Recovery Backups"
slug: "high-availability-disaster-recovery-hadr"
canonical: "https://safekit.eviden.com/best-practises/high-availability-disaster-recovery-hadr/"
description: "Combining SafeKit High Availability with Disaster Recovery Backups"
category: "best-practises"
lang: "en"
topics: "Synchronous SafeKit Replication for HA vs. Asynchronous Backup Replication for DR, Table of Contents, Synchronous HADR: Zero Data Loss over Fast Networks (LAN/VLAN), Asynchronous HADR: Disaster Recovery over Slow Networks (WAN), How to Combine HADR and Backup for Total System Resilience, Comparison of HADR Architectures: Fast vs. Slow Networks, Video Guide: How to Implement HADR with SafeKit, 🔍 SafeKit High Availability Navigation Hub"
---

# Combining SafeKit High Availability with Disaster Recovery Backups

## Synchronous SafeKit Replication for HA vs. Asynchronous Backup Replication for DR

SafeKit provides a flexible, software-based **High Availability and Disaster Recovery (HADR) architecture** that eliminates the need for expensive shared storage. By implementing **synchronous replication** across a stretched VLAN between Server 1 and Server 2, SafeKit ensures that your critical applications remain "live" and consistent between two redundant sites.

To address the constraints of lower-bandwidth WANs, SafeKit is designed to be paired with **backup and recovery solutions**. This allows organizations to maintain 24/7 uptime through automatic failover while securing historical data for offsite disaster recovery.

Consequently, the environment is protected against hardware or software failures via SafeKit, and secured against logical errors and cyber threats like ransomware through the backup solution.


<img src="/wp-content/uploads/2026/01/safekit-backup-3-nodes-5-1024.jpg" width="512" alt="A technical diagram showing why High Availability (SafeKit) and Backups are complementary: SafeKit handles hardware/software failover via synchronous replication, while asynchronous backup protects against ransomware and logical errors.">

**HA vs Backup: Combining SafeKit Synchronous Replication with Asynchronous DR**

## Table of Contents

  * [Synchronous HADR: Zero Data Loss over Fast Networks (LAN/VLAN)](<#synchronous-hadr-fast-network>)
  * [Asynchronous HADR: Disaster Recovery over Slow Networks (WAN)](<#asynchronous-hadr-slow-network>)
  * [How to Combine HADR and Backup for Total System Resilience](<#hadr-resilience-strategy>)
  * [Comparison of HADR Architectures: Fast vs. Slow Networks](<#hadr-architectures-comparison>)
  * [Video Guide: How to Implement HADR with SafeKit](<#videoguide-hadr-safekit>)
  * [🔍 SafeKit High Availability Navigation Hub](<#hub>)



<!-- BEGIN INSERT: insert-safekit-4-buttons-en lang="en" display="content" -->
<div class="button-row">
  <a class="btn-action" href="https://safekit.eviden.com/contact-us-for-safekit/">🧑 Contact us</a>
  <a class="btn-action" href="/resources/safekit-free-trial/">🎁 SafeKit free trial</a>
  <a class="btn-action" href="https://training.my.evidian.com/mod/page/view.php?id=712">🏅 Free certification</a>
  <a class="btn-action" href="https://safekit.eviden.com/get-a-quote-safekit/">💰 Perpetual license cost</a>
</div>
<!-- END INSERT: insert-safekit-4-buttons-en lang="en" display="content" -->
 

## Synchronous HADR: Zero Data Loss over Fast Networks (LAN/VLAN) {#synchronous-hadr-fast-network}

### How to implement HADR over a fast network? {#hadr-fast-network-architecture}


<img src="/wp-content/uploads/2023/02/remote-datacenters.png" width="256" alt="Architecture combining High Availability and Disaster Recovery (HADR) without shared disks">


To implement HADR over a fast network, deploy two nodes across remote sites to provide High Availability and Disaster Recovery simultaneously. This setup ensures that your application remains available even if an entire site fails, without the complexity of a shared storage infrastructure.

### Why use a SANless HADR solution for fast networks? {#sanless-hadr-solution}

A SANless solution like SafeKit is essential because it replicates data synchronously and in real-time between two nodes without shared disks. Because synchronous replication ensures zero data loss (RPO=0), the software can trigger an automatic application failover instantly if a hardware or software failure occurs.

### What are the network requirements for Synchronous HADR? {#extended-lan-vlan-requirements}

Synchronous HADR requires an extended LAN or a stretched VLAN for three critical reasons:

  * **Virtual IP Failover:** A single subnet is required to automatically failover the [virtual IP address](</best-practises/how-a-virtual-ip-address-works/>) between nodes.
  * **Low Latency:** [Synchronous replication](</best-practises/synchronous-replication-vs-asynchronous-replication/>) with no data loss typically requires a network round-trip time of less than 2ms.
  * **High Bandwidth:** A connection of 1 Gb/s or more is required to ensure rapid data resynchronization during a failback.


## Asynchronous HADR: Disaster Recovery over Slow Networks (WAN) {#asynchronous-hadr-slow-network}

### How to implement HADR over a slow network? {#hadr-slow-network-architecture}


<img src="/wp-content/uploads/2023/03/hadr-slow-network-1.png" width="256" alt="HADR architecture separating High Availability from Disaster Recovery">


To implement HADR over a slow network (WAN), the architecture typically separates **High Availability** from **Disaster Recovery**. In this scenario, two nodes are deployed at the primary site for local redundancy, while a separate backup or asynchronous replication strategy is used to protect data at a distant remote site.

### What is the best HADR solution for low-bandwidth connections? {#sanless-ha-with-remote-dr}

The optimal solution involves deploying **SafeKit** at the primary site for local High Availability using synchronous real-time replication and automatic failover. For the disaster recovery site, data is protected via asynchronous replication or scheduled backups through the slow network, ensuring that local uptime is maintained without being bottlenecked by WAN latency. To achieve this architecture, a dedicated **backup solution** (other than SafeKit) is required to manage the data transfer and restoration at the remote site. 

### How does failover work with a remote Disaster Recovery site? {#dr-site-failover-process}

Because asynchronous replication over a slow network involves potential data loss (RPO > 0), the failover process to a disaster recovery site is typically manual and managed by an administrator:

  * **Data Restoration:** Backups are restored onto secondary servers at the DR site. Modern solutions like **Veeam** are often used to restore virtual machines (VMs) quickly to reduce recovery time.
  * **DNS Rerouting:** Traffic is redirected to the DR site at the DNS level. The recovery time depends on DNS cache timeouts (TTL), and some client applications may require a restart to pick up the new IP address.
  * **Manual Decision:** An administrator must verify data integrity at the remote site before authorizing the switch to the secondary data center.


## How to Combine HADR and Backup for Total System Resilience {#hadr-resilience-strategy}

### Comparing High Availability and Data Backup {#ha-vs-backup-comparison}


<img src="/wp-content/uploads/2026/04/safekit-icon-512x512-1.png" width="64" alt="SafeKit high availability software logo">

 

<img src="/wp-content/uploads/2026/01/backup-icon.png" width="64" alt="Data Backup strategy icon">


Although both are critical for data protection, **High Availability (HA)** and **Backup Solutions** target different risks. **High Availability** , powered by SafeKit, provides a "live" failover mechanism to keep applications accessible during server outages or hardware failures. Conversely, a **Backup Solution** acts as a "historical" archive. While HA ensures 99.99% system availability by replicating data in real-time, backup focuses on data integrity, providing the necessary restoration points to recover from logical errors, accidental deletions, or ransomware attacks.

### Is High Availability a substitute for a Backup strategy? {#ha-vs-backup-ransomware}

No, High Availability and backups are complementary, not interchangeable. While **SafeKit** ensures **business continuity** by keeping applications running during a hardware crash, it does not guard against logical errors, accidental deletions, or ransomware attacks. For example, because real-time replication mirrors every change instantly, a ransomware attack on the primary node will be immediately duplicated on the secondary node. To recover from such cyber threats or accidental deletions, you need a dedicated **backup solution** with a robust retention policy. This allows you to "rewind" your environment to a healthy state from before the corruption occurred.

### Optimizing RTO and RPO: The Synergy Between HA and Backup {#ha-backup-rpo-rto}

To build a truly resilient infrastructure, you must integrate both High Availability and backup into a unified strategy. These two technologies address different dimensions of the [RTO (Recovery Time Objective) and RPO (Recovery Point Objective) equation](</best-practises/what-is-rpo-and-rto-with-examples/>): 

  * **High Availability (via SafeKit):** Targets **Instant Recovery**. By maintaining a live, synchronous mirror of your environment, SafeKit achieves near-zero RTO and zero RPO. If a server fails, the application resumes on the secondary node immediately, ensuring no service interruption or data loss during the transition.
  * **Backup Solutions:** Target **Data Resilience**. While HA keeps the service "live," backup creates an "immutable" history. It is your fallback for when the live data itself is compromised, allowing you to restore a clean version of your database from a specific point in time before a virus or accidental deletion occurred.


## Comparison of HADR Architectures: Fast vs. Slow Networks {#hadr-architectures-comparison}

Criteria | Fast Network (LAN/VLAN) | Slow Network (WAN)  
---|---|---  
**Primary Scope** | Local Redundancy & High Availability | Site-to-Site Disaster Recovery  
**Use Case** | Same Data Center or Campus | Remote Data Centers or Cloud Regions  
**Replication Type** | Synchronous (Real-time) | Asynchronous / Backup  
**RPO (Data Loss)** | Zero (RPO = 0) | Potential data loss (RPO > 0)  
**Failover Process** | Automatic | Manual (Admin decision)  
**Traffic Rerouting** | Virtual IP Address (VIP) | DNS Level (TTL dependent)  
**Latency Requirement** | Low (typically < 2ms) | Supports high latency  
**Primary Recovery Goal** | Immediate Business Continuity | Data Safety & Retention  
  
## Video Guide: How to Implement HADR with SafeKit {#videoguide-hadr-safekit}

###  How to Implement HADR with SafeKit: Synchronous Replication & Failover 

Learn how to combine **High Availability (HA)** and **Disaster Recovery (DR)** into a single HADR strategy using SafeKit. This video guide explores the architecture required for 100% application uptime without the need for shared disks.

### Video Highlights

  1. [Introduction to SafeKit HADR over Stretched VLANs](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=0s>) (1:06)
  2. [How Synchronous Mirroring & Double-Acknowledgment Works (1:41)](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=65s>)
  3. [Failover Mechanics: Gratuitous ARP (GARP) & Virtual IP](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=166s>) (2:10)
  4. [Designing for Slow WAN: HA vs. Backup Strategies](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=296s>) (2:45)


### SafeKit Video: How to implement High Availability and Disaster Recovery (HADR) with SafeKit (7:40)

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 


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