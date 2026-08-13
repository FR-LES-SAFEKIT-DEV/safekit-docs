---
title: "Amazon AWS High Availability: SafeKit Synchronous Replication & Failover"
slug: "aws-high-availability-cluster-synchronous-replication-failover"
canonical: "https://safekit.eviden.com/solutions/aws-high-availability-cluster-synchronous-replication-failover/"
description: "Amazon AWS High Availability: SafeKit Synchronous Replication & Failover"
category: "solutions"
lang: "en"
topics: "SafeKit Shared-Nothing HA in AWS: Eliminate Shared Disks with Zero Data Loss, Table of Contents, How the SafeKit software simply implements a shared-nothing AWS high availability cluster?, How the SafeKit mirror cluster works with AWS?, SafeKit High Availability Limitations, Comparison: SafeKit for AWS vs. Native Cloud HA/DR Solutions, Video Guide: Configuring a SafeKit HA mirror cluster, 🔍 SafeKit High Availability Navigation Hub"
---

# Amazon AWS High Availability: SafeKit Synchronous Replication & Failover


<!-- BEGIN INSERT: insert-safekit-solution-mirror-cloud-en lang="en" display="content" querystring="app=AWS&amp;img=https://safekit.eviden.com/wp-content/uploads/2026/02/safekit-aws-app-1024.jpg&amp;guide=https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-in-aws-mirror-safe-module-for-real-time-replication-and-failover/" -->
 

## SafeKit Shared-Nothing HA in AWS: Eliminate Shared Disks with Zero Data Loss {#cloud-ha-limitation}

While major **cloud providers** offer native redundancy, they often leave a significant gap between data replication and true high availability. Currently, cloud users must choose between two suboptimal paths: native **asynchronous replication** , which requires manual failover and risks data loss, or **cloud shared disk** , which lacks the automated failover mechanisms required for seamless business continuity.

### SafeKit: The Lightweight, All-in-One Alternative to Complex AWS Clusters {#safekit-cloud-mirror}

  * **All-in-One 2-Node AWS Cluster:** SafeKit is a complete solution providing **Native Multi-AZ (Availability Zone)** capability with virtual IP, automatic failover, automatic failback, and synchronous real-time file replication in a single, integrated software package.
  * **Zero Data Loss (RPO=0):** Unlike native cloud VM replication for DR (Disaster Recovery), SafeKit uses **synchronous, file-level replication** to ensure data integrity for transactional applications, guaranteeing no data loss during a failure.
  * **Shared-Nothing Architecture:** SafeKit eliminates the need for cloud shared disks and resolves their associated "disk-locking" issues. **It uses local disks for maximum speed and minimum cost**. While traditional clusters often hang waiting for the cloud provider to release a storage lock from a failed node, SafeKit uses independent, synchronized folders within the local disks of each node to ensure instantaneous failover.
  * **Zero Application Reconfiguration:** SafeKit performs transparent, file-level replication, allowing you to protect apps and data exactly where they are installed—including on the system disk—without the need to migrate data to dedicated cloud shared disks.
  * **Kubernetes Alternative:** SafeKit provides high availability for both legacy and containerized applications (not designed for Kubernetes) without the operational overhead and complexity of Kubernetes orchestration.
  * **Uniform Deployment (On-Prem or Cloud):** Aside from configuring the [Virtual IP within a Cloud Load Balancer](</safekit-docs/best-practises/how-a-virtual-ip-address-works/>), the SafeKit deployment process remains identical across on-premises and cloud environments.


By consolidating **High Availability** into a lightweight software layer, SafeKit delivers enterprise-grade redundancy and business continuity in the cloud at a fraction of the cost of traditional clustering suites.


<img src="/safekit-docs/wp-content/uploads/2026/02/safekit-aws-app-1024.jpg" width="512" alt="SafeKit High Availability AWS Cluster Architecture providing Virtual IP, Automatic Failover, Automatic Failback, and Synchronous Real-time File Replication">

**SafeKit HA Mirror Cluster for AWS**

<a class="btn-quick-install" href="/safekit-docs/quick-install/safekit-quick-installation-guide-in-aws-mirror-safe-module-for-real-time-replication-and-failover/">⚡ Quick mirror cluster installation guide for AWS ></a>
## Table of Contents {#toc}

  * [How the SafeKit software simply implements a shared-nothing AWS high availability cluster?](<#safekit-mirror-ha-cluster>)
  * [How the SafeKit mirror cluster works with AWS?](<#safekit-mirror-cluster>)
  * [SafeKit High Availability Limitations](<#safekit-ha-limitations>)
  * [Comparison: SafeKit for AWS vs. Native Cloud HA/DR Solutions](<#safekit-mirror-ha-comparison>)
  * [Video Guide: Configuring a SafeKit Mirror HA cluster](<#videoguide-safekit-mirror-cluster>)
  * [🔍 SafeKit High Availability Navigation Hub](<#hub>)


## How the SafeKit software simply implements a shared-nothing AWS high availability cluster? {#safekit-mirror-ha-cluster}

### What is the SafeKit Mirror HA solution for AWS?

SafeKit brings high availability to AWS between two virtual machines in two Availability Zones (AZ).

This article explains how to implement quickly a AWS cluster without cloud shared disks and without specific skills.

The principle of the solution is to define the folders where the AWS application data resides, its services, a virtual IP, and checkers.

SafeKit then implements **real-time replication** and **automatic failover** to ensure continuous service availability.

### Why choose a unified All-in-One HA solution over fragmented tools?

Unlike "bolt-on" solutions that combine separate products for replication and clustering, **SafeKit** integrates **Virtual IP, Automatic Failover, Automatic Failback and Synchronous Real-time File Replication** into a single engine.

This eliminates the "house of cards" risk where updates break fragile links between disparate tools, provides a single point of accountability for the entire HA stack, and reduces human error by providing a single interface for **AWS application HA**.

### How does SafeKit handle Uniform Deployment and the Cloud Virtual IP?

SafeKit is a cloud-agnostic solution, meaning the deployment process and architecture stay the same across on-premises servers and all major cloud providers. The only architectural difference lies in how the **[Virtual IP](</safekit-docs/best-practises/how-a-virtual-ip-address-works/>)** is presented to the network:

  * **On-Premises:** SafeKit manages the VIP directly by sending **GARP (Gratuitous ARP)** packets to local switches, moving the IP between nodes instantly.
  * **In the Cloud:** Since Cloud networks do not support GARP, the Virtual IP is hosted by a **Cloud Load Balancer**.**SafeKit provides the health probe** to determine which node is the primary one. This allows the Load Balancer to detect the active node in real-time and route traffic to it automatically, ensuring seamless failover across Availability Zones.


### What are the distinctive advantages of SafeKit for AWS high availability compared to competitors?

SafeKit differentiates itself from traditional AWS clusters through its **shared-nothing architecture** and simplified deployment. While most enterprise solutions require complex management of cloud shared disks, SafeKit provides:

  * **Synchronous Replication with Zero Data Loss:** SafeKit implements 100% synchronous replication, ensuring total data integrity for transactional applications. In the event of a failure, there is **zero data loss (RPO=0)**. Furthermore, SafeKit is capable of replicating not only the AWS application databases but **any other data folders** (logs, configuration files, etc.), ensuring the entire environment is mirrored.
  * **Simplified 2-Node Clustering:** Unlike standard clusters that often require a "witness" (a 3rd node, disk, file share) to maintain a quorum, SafeKit delivers full high availability with just two redundant servers, reducing infrastructure costs and complexity.  
[Learn more about our heartbeat and quorum mechanism](</safekit-docs/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>).
  * **Unified Management:** Administrators can manage AWS application failover, data replication, and monitoring through a single SafeKit console. This makes high availability accessible to teams without specialized "cluster admin" expertise.
  * **Custom Checkers:** SafeKit goes beyond basic service monitoring; it **offers checkers** to monitor the health of the AWS application process. The system is highly extensible, allowing for the addition of custom checkers tailored to your environment.


### How does SafeKit reduce the TCO (Total Cost of Ownership) for AWS compared to standard clustering?

Unlike traditional high-availability solutions, SafeKit is designed to operate with the **absolute minimum infrastructure overhead** , without compromising reliability. Key savings compared to traditional failover cluster include:

  * **Zero Cloud Shared Disk Costs:** SafeKit uses a shared-nothing architecture that works with local disks.
  * **No Enterprise Edition Required:** While native database replication mechanim may require expensive Enterprise licensing, SafeKit **does not need the Enterprise edition**. It works seamlessly with standard edition and even the **free edition** , providing high-end availability at a fraction of the cost.
  * **True 2-Node Efficiency:** Unlike standard clusters that often require a "witness" (a 3rd node, disk, or file share) to maintain a quorum, SafeKit delivers full high availability with just **two redundant servers**.
  * **No Forced Subscriptions:** SafeKit offers a **perpetual license**. You own your software, avoiding the "subscription trap" and unpredictable annual price hikes common with modern cloud-only or subscription-based models.
  * **Low Operational Expense (OPEX):** As a plug-and-play solution, it requires no specialized training or expensive external consultancy for maintenance, unlike complex open-source clustering tools.
  * **CPU-Independent Pricing:** Licensing is independent of the number of CPUs or cores. With just two licenses for two nodes, you can protect your AWS application against failures.


### Is it possible to set up a AWS mirror cluster without clustering skills?

Yes. This article explains how to [**quickly implement a AWS mirror cluster**](</safekit-docs/quick-install/safekit-quick-installation-guide-in-aws-mirror-safe-module-for-real-time-replication-and-failover/>) without the need for complex HA clustering skills. By using SafeKit’s **automated failover scripts** to handle the replication and restart of your **AWS application** , you get a robust redundancy solution that is significantly simpler to deploy and maintain than traditional clustering solutions.

### Beyond AWS, which applications and environments can SafeKit protect?

SafeKit is a versatile high-availability solution **for both Windows and Linux** that extends far beyond AWS mirror cluster. It enables **synchronous real-time replication** and automatic failover for a wide range of critical workloads, including:

  * **Virtual & Physical Environments:** Complete Hyper-V or KVM virtual machines.
  * **Container Orchestration:** Docker, Podman, and K3s (Kubernetes) environments.
  * **Data & Services:** Individual file directories, services, and various databases.
  * **Cloud Infrastructure:** High availability for Cloud applications.


SafeKit also provides **Farm Clusters** with native **Network Load Balancing and Failover** for stateless applications like **Web Servers**.

[Explore the full list of supported HA solutions here.](</safekit-docs/solutions/>)


<!-- BEGIN INSERT: insert-safekit-mirror-en lang="en" display="content" -->
 

## How the SafeKit mirror cluster works with AWS? {#safekit-mirror-cluster}

### Step 1. Real-time replication {#step1}

Server 1 (PRIM) runs the AWS application. Clients are connected to a [virtual IP address](</safekit-docs/best-practises/how-a-virtual-ip-address-works/>). SafeKit replicates in real time modifications made inside files through the network.


<img src="/safekit-docs/wp-content/uploads/2023/02/safekit-prim-second-300.png" width="300" alt="File replication at byte level in a mirror AWS cluster">


The replication is [synchronous](</safekit-docs/best-practises/synchronous-replication-vs-asynchronous-replication/>) with no data loss on failure contrary to asynchronous replication.

You just have to configure the names of directories to replicate in SafeKit. There are no pre-requisites on disk organization. Directories may be located in the system disk.

### Step 2. Automatic failover {#step2}

When Server 1 fails, Server 2 takes over. SafeKit switches the virtual IP address and restarts the AWS application automatically on Server 2.

The application finds the files replicated by SafeKit uptodate on Server 2. The application continues to run on Server 2 by locally modifying its files that are no longer replicated to Server 1.


<img src="/safekit-docs/wp-content/uploads/2023/02/safekit-stop-alone-300.png" width="300" alt="Failover of AWS in a mirror cluster">


The failover time is equal to the fault-detection time (30 seconds by default) plus the application start-up time.

### Step 3. Automatic failback {#step3}

Failback involves restarting Server 1 after fixing the problem that caused it to fail.

SafeKit automatically resynchronizes the files, updating only the files modified on Server 2 while Server 1 was halted.


<img src="/safekit-docs/wp-content/uploads/2023/02/safekit-resynchro-alone-300.png" width="300" alt="Failback in a mirror AWS cluster">


Failback takes place without disturbing the AWS application, which can continue running on Server 2.

### Step 4. Back to normal

After reintegration, the files are once again in mirror mode, as in step 1. The system is back in high-availability mode, with the AWS application running on Server 2 and SafeKit replicating file updates to Server 1.


<img src="/safekit-docs/wp-content/uploads/2023/02/safekit-second-prim-300.png" width="300" alt="Return to normal operation in a mirror AWS cluster">


If the administrator wishes the application to run on Server 1, this can be done manually through the web console at an appropriate time, or automatically through configuration.

### How to configure a SafeKit Mirror Cluster for AWS? {#safekit-mirror-cluster-configure}


<img src="/safekit-docs/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png" width="763" alt="SafeKit Web Console: High Availability configuration dashboard for AWS showing heartbeat networks, virtual IP setup, and real-time directory replication for a mirror cluster.">


The **SafeKit web console** provides an intuitive interface to orchestrate high availability for your critical applications. In just a few steps, you can configure a **SafeKit mirror cluster** to ensure business continuity:

  * **Application Failover (Macros Tab):** Define the specific application services to be automatically restarted in the event of a failure.
  * **Heartbeat network(s):** Dedicated communication path(s) used by cluster nodes to continuously monitor each other's health and availability and synchronize failover decisions.
  * **Virtual IP Management:** Set up the Virtual IP (VIP) for transparent client reconnection after a failover.
  * **Real-Time Replication:** Select the critical directories for host-based, synchronous byte-level replication.
  * **Checkers:** Monitor the application's health and trigger automatic recovery if a process failure is detected.


The SafeKit cluster includes a dedicated split-brain checker to resolve network isolation issues without the need for a third witness machine or an additional heartbeat network. Learn more about [heartbeat, failover and quorum in a cluster](</safekit-docs/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>).

### How to monitor a SafeKit mirror cluster for AWS? {#safekit-mirror-cluster-monitoring}


<img src="/safekit-docs/wp-content/uploads/2026/05/mirror-monitoring-prim-second.png" width="604" alt="SafeKit Web Console: Real-time monitoring of a 2-node mirror cluster for AWS showing PRIM and SECOND states with active data replication.">


The **SafeKit management console** offers a unified view of your high availability infrastructure. It allows administrators to monitor the **operational state** of the cluster and track data synchronization in real-time.

For a 2-node mirror cluster, the console clearly displays the roles of each server:

  * **PRIM (Primary):** The active node currently running the application and managing the Virtual IP. It performs writes to the local storage and real-time replication to the secondary node.
  * **SECOND (Secondary):** The standby node receiving synchronous byte-level updates. It is ready to take over instantly if the Primary fails.
  * **ALONE State:** Visually alerts you when the cluster is running on a single node (e.g., during maintenance or after a failure), indicating that redundancy is temporarily lost.
  * **Resynchronization Progress:** When a failed node recovers, its status turns orange during background data reintegration, ensuring no downtime during the "return to normal" phase.


Beyond simple status icons, the interface provides **one-click failover orchestration** , allowing you to manually reassign the primary role for planned maintenance while ensuring continuous availability for user activity.


<!-- END INSERT: insert-safekit-mirror-en lang="en" display="content" -->
 


<!-- BEGIN INSERT: insert-safekit-usage-en lang="en" display="content" -->
 

## SafeKit High Availability Limitations {#safekit-ha-limitations}

### Why a replication of a few Tera-bytes?

Resynchronization time after a failure ([step 3](</safekit-docs/architectures/file-replication-byte-level-with-failover-mirror-cluster/#safekit-mirror-cluster>))

  * 1 Gb/s network ≈ 3 Hours for 1 Tera-bytes.
  * 10 Gb/s network ≈ 1 Hour for 1 Tera-bytes or less depending on disk write performances.


#### Alternative

  * For a large volume of data, use [external shared storage](</safekit-docs/best-practises/san-vs-nas-shared-storage-for-a-failover-cluster/>).
  * More expensive, more complex.


### Why a replication < 1,000,000 files?

  * Resynchronization time performance after a failure ([step 3](</safekit-docs/architectures/file-replication-byte-level-with-failover-mirror-cluster/#safekit-mirror-cluster>)).
  * Time to check each file between both nodes.


#### Alternative

  * Put the many files to replicate in a virtual hard disk / virtual machine.
  * Only the files representing the virtual hard disk / virtual machine will be replicated and resynchronized in this case.


### Why a failover ≤ 32 replicated VMs?

  * Each VM runs in an independent mirror module.
  * Maximum of 32 mirror modules running on the same cluster.


#### Alternative

  * Use an external shared storage and another VM clustering solution.
  * More expensive, more complex.


### Why a LAN/VLAN network between remote sites?

  * Automatic failover of the [virtual IP address](</safekit-docs/best-practises/how-a-virtual-ip-address-works/>) with 2 nodes in the same subnet.
  * Good bandwidth for resynchronization ([step 3](</safekit-docs/architectures/file-replication-byte-level-with-failover-mirror-cluster/#safekit-mirror-cluster>)) and good latency for [synchronous replication](</safekit-docs/best-practises/synchronous-replication-vs-asynchronous-replication/>) (typically a round-trip of less than 2ms).


#### Alternative

  * Use a [load balancer for the virtual IP address](</safekit-docs/best-practises/how-a-virtual-ip-address-works/>) if the 2 nodes are in 2 subnets (supported by SafeKit, especially in the cloud).
  * Use backup solutions with asynchronous replication for high latency network.



<!-- END INSERT: insert-safekit-usage-en lang="en" display="content" -->
 

## Comparison: SafeKit for AWS vs. Native Cloud HA/DR Solutions {#safekit-mirror-ha-comparison}

Feature | SafeKit for AWS | Native Cloud Shared Disk | Native Cloud VM Replication for DR (Disaster Recovery)  
---|---|---|---  
Architecture | Shared-Nothing: Uses local disks for maximum speed and minimum cost. | Shared Storage: Dependent on cloud-managed disks. | Block-Level: Replicates entire VM disks to a passive region.  
Data Integrity (RPO) | Zero (RPO=0): Synchronous file-level replication. | Zero: Synchronous writing to a shared disk. | Non-Zero: Asynchronous replication resulting in data lag.  
Failover/Failback Logic | Fully Automatic: Integrated monitoring and restart. | Requires a third-party failover tool supporting cloud shared disks. | Manual: Requires activation of a disaster recovery plan.  
Application Setup | Zero Reconfiguration: Protects applications where they are currently installed. | Reconfiguration: Application data must be migrated to a specific shared disk. | None: Captures the entire OS and application as-is.  
Replication Scope | Complete: Application data folders (DB + Config + Logs). | Partial: Only data stored on the shared volume. | Total: Replicates the entire virtual machine.  
VM Localization | Native Multi-AZ: Synchronous replication across Availability Zones within a region. | Provider Dependent: Requires shared storage replicated across Availability Zones. | Regional: Primarily designed for replication between distant geographical regions.  
Deployment Time | Low: < 30 Minutes (On-prem or Cloud). | High: Days or weeks for cluster configuration. | Medium: Requires setting up DR vaults and policies.  
  
### Is High Availability a substitute for Native Cloud VM Replication for DR (Disaster Recovery)? {#ha-vs-backup-ransomware}

**No** , High Availability and backups are complementary, not interchangeable. While **SafeKit** ensures **business continuity** by keeping applications running during a hardware crash, it does not guard against logical errors, accidental deletions, or ransomware attacks. For example, because real-time replication mirrors every change instantly, a ransomware attack on the primary node will be immediately duplicated on the secondary node. To recover from such cyber threats or accidental deletions, you need a dedicated **backup solution** with a robust retention policy. This allows you to "rewind" your environment to a healthy state from before the corruption occurred.

### Conclusion

By adopting a **shared-nothing architecture** , SafeKit eliminates the complexity and cost of cloud-managed shared disks. Unlike traditional clustering, it provides an **infrastructure-independent** solution that requires no application reconfiguration or data migration. With native **Multi-AZ** support and a deployment time of under 30 minutes, SafeKit ensures your AWS environment remains resilient with **zero data loss (RPO=0)** and fully automated recovery.

## Video Guide: Configuring a SafeKit HA mirror cluster {#videoguide-safekit-mirror-cluster}

### SafeKit Video: Application-Level Clustering (8:47) {#demo-mirror-ha-cluster}

In this video, discover how SafeKit implements a **mirror HA cluster** without the complexity of a cloud shared disks clustering. While this demonstration uses Microsoft SQL Server, the solution works identically for other databases and applications.Note the the virtual IP is configured in this video for an on-premise solution and not for a Cloud Load Balancer with SafeKit health probes. 

### Video Highlights

  1. [2 nodes with SQL Server](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. [Configure the cluster and the mirror.safe module](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. [Start and test SQL replication, migration, failover on crash](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)


&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 


<!-- END INSERT: insert-safekit-solution-mirror-cloud-en lang="en" display="content" querystring="app=AWS&amp;img=https://safekit.eviden.com/wp-content/uploads/2026/02/safekit-aws-app-1024.jpg&amp;guide=https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-in-aws-mirror-safe-module-for-real-time-replication-and-failover/" -->
 


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