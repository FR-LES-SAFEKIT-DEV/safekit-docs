---
title: "Siemens Desigo CC High Availability: SANless 2-Node Redundancy"
slug: "siemens-desigo-cc-redundancy-high-availability-cluster-active-active"
canonical: "https://safekit.eviden.com/solutions/siemens-desigo-cc-redundancy-high-availability-cluster-active-active/"
description: "Siemens Desigo CC High Availability: SANless 2-Node Redundancy"
category: "solutions"
lang: "en"
topics: "SafeKit for Siemens Desigo CC: 2-Node SANless Hyper-V Cluster, Table of Contents, How the SafeKit software simply implements a Siemens Desigo CC high availability cluster without shared storage on a SAN?, How the SafeKit Siemens Desigo CC cluster works?, SafeKit High Availability Limitations, Comparison: SafeKit for Siemens Desigo CC vs. Native Hyper-V Clustering, Video Guide: Configuring a SafeKit HA cluster for Siemens Desigo CC, SafeKit, a recognized solution on the security market, 🔍 SafeKit High Availability Navigation Hub"
---

# Siemens Desigo CC High Availability: SANless 2-Node Redundancy


<!-- BEGIN INSERT: insert-safekit-hyperv-solution-mirror-en lang="en" display="content" querystring="app=Siemens Desigo CC" -->
 

## SafeKit for Siemens Desigo CC: 2-Node SANless Hyper-V Cluster {#safekit-hyperv-tco}

**SafeKit for Siemens Desigo CC** delivers seamless **High Availability** while significantly reducing TCO (Total Cost of Ownership). By eliminating the hardware and operational overhead of traditional clustering, SafeKit offers a lean, 2-node HA alternative to complex virtualization stacks.

  * **Zero SAN Investment for HA:** Achieve full redundancy using shared-nothing architecture. It works with standard local disks, removing the need for expensive SAN hardware, fiber channel switches, and specialized storage maintenance usually required for High Availability.
  * **Hardware-Agnostic Redundancy:** Avoid vendor lock-in. Build your High Availability cluster using any server brand or internal storage type, extending the lifecycle of existing hardware and lowering replacement costs.
  * **Simplified HA Operations:** No specialized "clustering expert" is required to maintain uptime. SafeKit’s plug-and-play modules and unified web console reduce the man-hours needed for HA deployment and daily monitoring.
  * **Cost-Predictable Licensing:** Unlike subscription-heavy models, SafeKit provides High Availability via a one-time perpetual license. This ensures predictable budgeting and eliminates the risk of annual price hikes for critical infrastructure.
  * **True 2-Node HA Efficiency:** Most High Availability solutions require a third "witness" node to prevent split-brain. SafeKit delivers a robust 2-node cluster, saving 33% on hardware, power, and rack space from day one.


By consolidating **High Availability** into a lightweight software layer, SafeKit delivers enterprise-grade redundancy and business continuity at a fraction of the cost of traditional virtualization suites.


<img src="/wp-content/uploads/2026/01/safekit-vm-repli-720-720.jpg" width="512" alt="SafeKit High Availability Siemens Desigo CC Cluster Architecture">

**SafeKit HA Cluster for Siemens Desigo CC**

<a class="btn-quick-install" href="/quick-install/safekit-quick-installation-guide-with-hyper-v/">⚡ Quick Hyper-V HA cluster installation guide ></a>
## Table of Contents {#toc}

  * [How the SafeKit software simply implements a Siemens Desigo CC high availability cluster without shared storage on a SAN?](<#safekit-hyperv-ha-cluster>)
  * [How the SafeKit Siemens Desigo CC cluster works?](<#safekit-hyperv-ha-how-it-works>)
  * [SafeKit High Availability Limitations](<#safekit-ha-limitations>)
  * [Comparison: SafeKit for Siemens Desigo CC vs. Native Hyper-V Clustering](<#safekit-hyperv-ha-comparison>)
  * [SafeKit video guide for Siemens Desigo CC](<#videoguide-safekit-hyperv-cluster>)
  * [🔍 SafeKit High Availability Navigation Hub](<#hub>)


## How the SafeKit software simply implements a Siemens Desigo CC high availability cluster without shared storage on a SAN? {#safekit-hyperv-ha-cluster}

### What is the SafeKit HA solution for Siemens Desigo CC?

SafeKit brings high availability to Siemens Desigo CC between two servers of any brand.

This article explains how to implement quickly a Siemens Desigo CC cluster without shared storage on a SAN and without specific skills.

The principle of the solution is to put the critical application in a virtual machine under Hyper-V. SafeKit implements **real-time replication and automatic failover of the virtual machine**.

Note that Hyper-V is the free hypervisor included in all Windows versions (even Windows for PC).

### How can I run multiple applications in a high-availability Siemens Desigo CC cluster without a SAN?

Several applications can be put in **several virtual machines replicated and restarted by SafeKit**. You have the possibility to migrate each virtual machine between both servers with the SafeKit console and thus balance the load in an **active-active cluster**.

### Should I choose high availability at the application level or the virtual machine (VM) level?

With SafeKit, you have the flexibility to choose the redundancy model that fits your needs.

**VM-level redundancy** (for Hyper-V or KVM) is the simplest to implement as it replicates the entire virtual machine, requiring no knowledge of the internal application.

Alternatively, **application-level redundancy** is more granular; it only replicates specific data folders and restarts the application services rather than the entire OS.

While VM-level HA is easier to set up, application-level HA is hypervisor-agnostic and can run across physical, virtual, or cloud environments.

### What are the distinctive advantages of SafeKit for Hyper-V high availability compared to competitors?

SafeKit differentiates itself from traditional Hyper-V clustering solutions through its **shared-nothing architecture** and simplified management. While most competitors require a central SAN or vSAN to manage VM failover, SafeKit provides:

  * **Integrated Real-Time Replication:** Data synchronization is built directly into the solution, ensuring that Siemens Desigo CC virtual machines are mirrored synchronously without the overhead of managing a separate storage layer.
  * **Simplified 2-Node Clustering:** Unlike enterprise stacks that recommend a 3-node "witness" quorum, SafeKit delivers full high availability with just two redundant servers. [Learn more about our heartbeat and quorum mechanism](</best-practises/heartbeat-failover-quorum-windows-linux-cluster/>).
  * **Unified Management:** Administrators can manage VM failover, replication, and load balancing through a single SafeKit console , making it accessible to teams without specialized clustering expertise.
  * **Custom Checkers:** SafeKit goes beyond hardware monitoring; it utilizes **custom checkers** to detect if a VM has crashed, automatically triggering a local restart or a failover to the redundant node. The system is also highly extensible, allowing for the easy integration of new, user-defined custom checkers tailored to your specific environment.


### How does SafeKit reduce the TCO (Total Cost of Ownership) compared to VMware-type solutions?

Unlike most high-availability solutions on the market, SafeKit is designed to operate with the **absolute minimum hardware overhead** , without compromising security or reliability. Key savings compared to VMware or complex open-source alternatives include:

  * **True 2-Node Efficiency:** While most enterprise stacks or open-source solutions require a 3-node "witness" quorum to prevent split-brain, SafeKit delivers full high availability with just **two redundant servers**.
  * **Zero Storage Costs:** SafeKit uses a shared-nothing architecture that works with local disks, removing the need for expensive SAN or vSAN hardware and specialized storage networking.
  * **No Forced Subscriptions:** Unlike modern subscription-only models, SafeKit offers a **perpetual license**. You own your software, avoiding the "subscription trap" and unpredictable annual price hikes.
  * **Low Operational Expense (OPEX):** As a plug-and-play solution, it requires no specialized training or expensive external consultancy for maintenance, unlike complex open-source clustering tools.
  * **CPU-Independent Pricing:** Licensing is independent of the number of CPUs or cores. With just two licenses for two nodes, you can protect multiple Hyper-V virtual machines.


### Is it possible to set up a Siemens Desigo CC cluster without SAN or complex clustering skills?

Yes. This article explains how to [**quickly implement a Hyper-V cluster**](</quick-install/safekit-quick-installation-guide-with-hyper-v/>) without the need for specialized SAN management or complex HA clustering skills. By using SafeKit’s **automated failover scripts** to handle the replication and restart of **Siemens Desigo CC** virtual machines, you get a robust redundancy solution that is significantly simpler to deploy and maintain than traditional enterprise virtualization stacks.

### Beyond Siemens Desigo CC, which applications and environments can SafeKit protect?

SafeKit is a versatile high-availability solution that extends far beyond standard virtual machine failover. It enables **synchronous real-time replication** and automatic failover for a wide range of critical workloads, including:

  * **Virtual & Physical Environments:** Complete Hyper-V or KVM virtual machines.
  * **Container Orchestration:** Docker, Podman, and K3s (Kubernetes) environments.
  * **Data & Services:** Individual file directories, services, and various databases.
  * **Cloud Infrastructure:** High availability for Cloud applications.


SafeKit also provides **Farm Clusters** with native **Network Load Balancing and Failover** for stateless applications like **Web Servers**.

[Explore the full list of supported HA solutions here.](</solutions/>)

## How the SafeKit Siemens Desigo CC cluster works? {#safekit-hyperv-ha-how-it-works}

The following steps are described for one Siemens Desigo CC virtual machine inside one mirror module. Each replicated virtual machine runs in an independent mirror module (with a maximum of 32 virtual machines) with a primary server that can be either the Hyper-V server 1 or the Hyper-V server 2.

### 1\. How does real-time replication work for Siemens Desigo CC?

Server 1 (PRIM) runs the Siemens Desigo CC VM (virtual machine). SafeKit replicates in real time the VM files (virtual hard disk, VM configuration). Only changes made in the files are replicated across the network.


<img src="/wp-content/uploads/2023/02/safekit-prim-second-300.png" width="300" alt="File replication at byte level in a mirror Siemens Desigo CC cluster">


The replication is [synchronous](</best-practises/synchronous-replication-vs-asynchronous-replication/>) with no data loss on failure contrary to asynchronous replication.

You just have to configure the VM directory name in SafeKit. There are no pre-requisites on disk organization. The directory may be located in the system disk.

### 2\. What happens during an automatic Siemens Desigo CC failover?

When Server 1 fails, Server 2 takes over. SafeKit restarts the Siemens Desigo CC VM on Server 2. Hyper-V finds the files replicated by SafeKit uptodate on Server 2.  
The VM continues to run on Server 2 by locally modifying its files that are no longer replicated to Server 1.


<img src="/wp-content/uploads/2023/02/safekit-stop-alone-300.png" width="300" alt="Failover of Siemens Desigo CC in a mirror cluster">


The failover time is equal to the fault-detection time (set to 30 seconds by default) plus the VM reboot time.

### 3\. How is data synchronized after a Siemens Desigo CC failure?

Failback involves restarting Server 1 after fixing the problem that caused it to fail. SafeKit automatically resynchronizes the VM files.


<img src="/wp-content/uploads/2023/02/safekit-resynchro-alone-300.png" width="300" alt="Failback in a mirror Siemens Desigo CC cluster">


Failback takes place without disturbing the Siemens Desigo CC VM, which can continue running on Server 2.

### 4\. How is normal Siemens Desigo CC operation restored?

After reintegration, the VM files are once again in mirror mode, as in step 1. The system is back in high-availability mode, with the Siemens Desigo CC VM running on Server 2 and SafeKit replicating file updates to Server 1.


<img src="/wp-content/uploads/2023/02/safekit-second-prim-300.png" width="300" alt="Return to normal operation in a mirror Siemens Desigo CC cluster">


If the administrator wishes the VM to run on Server 1, this can be done manually through the web console at an appropriate time, or automatically through configuration.

### How to configure a SafeKit Siemens Desigo CC Cluster? {#safekit-mirror-cluster-configure}


<img src="/wp-content/uploads/2024/03/19-module-hyperv-edit-config-1.png" width="694" alt="SafeKit Web Console: 2-node Siemens Desigo CC cluster dashboard for VM replication and automatic failover.">


The **SafeKit web console** provides an intuitive interface to configure high availability of your critical applications. In just a few steps, you can configure a **SafeKit Siemens Desigo CC cluster** to ensure business continuity:

  * Put in `VM_PATH`, the root path of the replicated directory (D:/Repli-Hyper-V) where the Siemens Desigo CC VM files reside.
  * Enter in `VM_NAME`, the name of the Siemens Desigo CC virtual machine (VM1).


The SafeKit cluster includes a dedicated [split-brain checker to resolve network isolation issues](</best-practises/heartbeat-failover-quorum-windows-linux-cluster/> "Technical details on heartbeat and split-brain prevention") without the need for a third witness machine or an additional heartbeat network.

### How to monitor a SafeKit Siemens Desigo CC cluster? {#safekit-mirror-cluster-monitoring}


<img src="/wp-content/uploads/2024/03/14-monitoring-prim-second.png" width="604" alt="SafeKit Web Console: Real-time monitoring of a 2-node mirror Siemens Desigo CC cluster showing PRIM and SECOND states with active data replication.">


The **SafeKit management console** offers a unified view of your high availability infrastructure. It allows administrators to monitor the **operational state** of the cluster and track data synchronization in real-time.

For a 2-node Siemens Desigo CC cluster, the console clearly displays the roles of each server:

  * **PRIM (Primary):** The active node currently running the application and managing the Virtual IP. It performs writes to the local storage and real-time replication to the secondary node.
  * **SECOND (Secondary):** The standby node receiving synchronous byte-level updates. It is ready to take over instantly if the Primary fails.
  * **ALONE State:** Visually alerts you when the cluster is running on a single node (e.g., during maintenance or after a failure), indicating that redundancy is temporarily lost.
  * **Resynchronization Progress:** When a failed node recovers, its status turns orange during background data reintegration, ensuring no downtime during the "return to normal" phase.


Beyond simple status icons, the interface provides **one-click failover orchestration** , allowing you to manually reassign the primary role for planned maintenance while ensuring continuous availability for user activity.

Note that if you deploy several VMs for replication and failover, you will have multiple PRIM/SECOND widgets. This allows independent failover for each VM and the ability to distribute the load across servers.


<!-- BEGIN INSERT: insert-safekit-usage-en lang="en" display="content" -->
 

## SafeKit High Availability Limitations {#safekit-ha-limitations}

### Why a replication of a few Tera-bytes?

Resynchronization time after a failure ([step 3](</architectures/file-replication-byte-level-with-failover-mirror-cluster/#safekit-mirror-cluster>))

  * 1 Gb/s network ≈ 3 Hours for 1 Tera-bytes.
  * 10 Gb/s network ≈ 1 Hour for 1 Tera-bytes or less depending on disk write performances.


#### Alternative

  * For a large volume of data, use [external shared storage](</best-practises/san-vs-nas-shared-storage-for-a-failover-cluster/>).
  * More expensive, more complex.


### Why a replication < 1,000,000 files?

  * Resynchronization time performance after a failure ([step 3](</architectures/file-replication-byte-level-with-failover-mirror-cluster/#safekit-mirror-cluster>)).
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

  * Automatic failover of the [virtual IP address](</best-practises/how-a-virtual-ip-address-works/>) with 2 nodes in the same subnet.
  * Good bandwidth for resynchronization ([step 3](</architectures/file-replication-byte-level-with-failover-mirror-cluster/#safekit-mirror-cluster>)) and good latency for [synchronous replication](</best-practises/synchronous-replication-vs-asynchronous-replication/>) (typically a round-trip of less than 2ms).


#### Alternative

  * Use a [load balancer for the virtual IP address](</best-practises/how-a-virtual-ip-address-works/>) if the 2 nodes are in 2 subnets (supported by SafeKit, especially in the cloud).
  * Use backup solutions with asynchronous replication for high latency network.



<!-- END INSERT: insert-safekit-usage-en lang="en" display="content" -->
 

## Comparison: SafeKit for Siemens Desigo CC vs. Native Hyper-V Clustering {#safekit-hyperv-ha-comparison}

Feature | SafeKit for Siemens Desigo CC | MS Failover Clustering | Hyper-V Replica  
---|---|---|---  
Architecture | **SANless (Shared-Nothing)** | Shared Storage (SAN/S2D) | Shared-Nothing  
Failover Logic | **Fully Automatic** | Fully Automatic | Manual Intervention (not a HA solution)  
Replication Type | Synchronous (Zero RPO) | Synchronous (via SAN) | Asynchronous (Data Loss)  
Quorum Requirement | **None (Built-in Checker)** | 3rd Node / Cloud Witness | None  
AD Dependency | Independent | **Required (Active Directory)** | Independent  
Deployment Complexity | Low (< 30 Minutes) | High (AD, Storage, Quorum) | Medium  
  
**In summary** , by eliminating the need for a SAN and simplifying the setup—removing dependencies like **Active Directory** and specialized **Quorum** configurations—SafeKit provides a lean, hardware-agnostic alternative. This results in a significantly lower TCO while ensuring that your Siemens Desigo CC environment remains resilient with zero data loss and automated recovery.

## Video Guide: Configuring a SafeKit HA cluster for Siemens Desigo CC {#videoguide-safekit-hyperv-cluster}


<!-- BEGIN INSERT: insert-safekit-hyperv-video-en lang="en" display="content" -->
 

### SafeKit Video: Virtual Machine-Level Clustering with Hyper-V (5:15) {#demo-hyperv}

In this video, discover how SafeKit implements **high availability for Hyper-V** without the complexity of a SAN. Learn to configure **virtual machine replication** across two nodes to ensure seamless failover for your critical virtualized workloads. Although this demonstration uses Hyper-V on Windows, the solution works identically with KVM on Linux.

### Chapters

  1. [Architecture overview: 2 Hyper-V nodes and 2 virtual machines](<https://www.youtube.com/watch?v=H18s_-_CpmU&t=0s>) (0:49)
  2. [Configuring the cluster and the hyperv.safe modules](<https://www.youtube.com/watch?v=H18s_-_CpmU&t=49s>) (1:59)
  3. [Live testing: VM replication, migration, and automatic failover on crash](<https://www.youtube.com/watch?v=H18s_-_CpmU&t=168s>) (2:26)


### Step-by-Step Implementation

  * [Read the guide to set up a mirrored Hyper-V cluster on Windows.](</quick-install/safekit-quick-installation-guide-with-hyper-v/>)
  * [Read the guide to set up a mirrored KVM cluster on Linux.](</quick-install/safekit-quick-installation-guide-with-kvm/>)


&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 


<!-- END INSERT: insert-safekit-hyperv-video-en lang="en" display="content" -->
 


<!-- END INSERT: insert-safekit-hyperv-solution-mirror-en lang="en" display="content" querystring="app=Siemens Desigo CC" -->
 


<!-- BEGIN INSERT: insert-safekit-security-case-en lang="en" display="content" -->
 

## SafeKit, a recognized solution on the security market

###  Milestone has chosen SafeKit 

SafeKit is deployed in 30+ countries with the video management software of Milestone.

[SafeKit is validated by Milestone](<https://www.milestonesys.com/products/expand-your-solution/milestone-extensions/management-server-failover/>) for redundancy and high availability of the management server.

SafeKit is the best solution because it is purely software, completely hardware-agnostic.

###  Solution preferred by Siemens 

SafeKit is available in the [Siemens marketplace](<https://www.siemens.com/en-us/products/atos-safekit/>) with its [Siveillance suite](</solutions/siemens-siveillance-redundancy-high-availability-cluster-active-active/>) (video and access control) and with its SCADA software: [Desigo CC](</solutions/siemens-desigo-cc-redundancy-high-availability-cluster-active-active/>) (building management), [SIMATIC WinCC](</solutions/siemens-simatic-wincc-redundancy-high-availability-cluster-active-active/>), [SIMATIC PCS 7](</solutions/siemens-simatic-pcs-7-redundancy-high-availability-cluster-active-active/>).

SafeKit is deployed by Siemens in Australia, France, the Netherlands, Qatar, Switzerland, the UAE, the UK, the US.

###  SafeKit recommended by Nedap 

Nedap, a key player in physical access control, recommends SafeKit for redundancy and high availability of its AEOS application.

The [Nedap/SafeKit solution](</solutions/nedap-high-availability-synchronous-replication-failover/>) is available with a free trial and a quick installation guide.

###  TIL Technologies has chosen SafeKit 

SafeKit is deployed in 100+ customer sites by TIL Technologies for access control and building management.

SafeKit is the [high availability option of MICROSESAME](<https://www.til-technologies.fr/en_GB/products/microsesame>).

###  Innovation award in Video Management Software 

Readers of Benchmark Magazine (specialized in physical security systems for resellers & SI) have voted for [SafeKit as an innovation in Video Management Software](<https://benchmarkmagazine.com/evidian-safekit-redundancy-and-high-availability/>).

This award shows the importance of redundancy in security offerings.


<!-- END INSERT: insert-safekit-security-case-en lang="en" display="content" -->
 


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