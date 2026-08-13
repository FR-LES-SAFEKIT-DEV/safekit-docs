---
title: "Simple Linux KVM High Availability without Shared Storage"
slug: "linux-kvm-high-availability-replication-automatic-failover-load-balancing"
canonical: "https://safekit.eviden.com/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/"
description: "Simple Linux KVM High Availability without Shared Storage"
category: "solutions"
lang: "en"
topics: "SafeKit for KVM: 2-Node SANless KVM Cluster, Table of Contents, How the SafeKit software simply implements a KVM high availability cluster without shared storage on a SAN?, How the SafeKit KVM cluster works?, SafeKit High Availability Limitations, Comparison: SafeKit for KVM vs. Traditional Clustering, Video Guide: Configuring a SafeKit HA cluster for KVM, 🔍 SafeKit High Availability Navigation Hub"
---

# Simple Linux KVM High Availability without Shared Storage


<!-- BEGIN INSERT: insert-safekit-kvm-solution-mirror-en lang="en" display="content" querystring="app=KVM" -->
 

## SafeKit for KVM: 2-Node SANless KVM Cluster {#safekit-kvm-tco}

**SafeKit for KVM** delivers seamless **High Availability** while significantly reducing TCO (Total Cost of Ownership). By eliminating the hardware and operational overhead of traditional clustering, SafeKit offers a lean, 2-node HA alternative to complex virtualization stacks.

  * **Zero SAN Investment for HA:** Achieve full redundancy using shared-nothing architecture. It works with standard local disks, removing the need for expensive SAN hardware, fiber channel switches, and specialized storage maintenance usually required for High Availability.
  * **Hardware-Agnostic Redundancy:** Avoid vendor lock-in. Build your High Availability cluster using any server brand or internal storage type, extending the lifecycle of existing hardware and lowering replacement costs.
  * **Simplified HA Operations:** No specialized "clustering expert" is required to maintain uptime. SafeKit’s plug-and-play modules and unified web console reduce the man-hours needed for HA deployment and daily monitoring.
  * **Cost-Predictable Licensing:** Unlike subscription-heavy models, SafeKit provides High Availability via a one-time perpetual license. This ensures predictable budgeting and eliminates the risk of annual price hikes for critical infrastructure.
  * **True 2-Node HA Efficiency:** Most High Availability solutions require a third "witness" node to prevent split-brain. SafeKit delivers a robust 2-node cluster, saving 33% on hardware, power, and rack space from day one.


By consolidating **High Availability** into a lightweight software layer, SafeKit delivers enterprise-grade redundancy and business continuity at a fraction of the cost of traditional virtualization suites.


<img src="/safekit-docs/wp-content/uploads/2026/01/safekit-vm-repli-720-720.jpg" width="512" alt="SafeKit High Availability KVM Cluster Architecture">

**SafeKit HA Cluster for KVM**

<a class="btn-quick-install" href="/safekit-docs/quick-install/safekit-quick-installation-guide-with-kvm/">⚡ Quick KVM HA cluster installation guide ></a>
## Table of Contents {#toc}

  * [How the SafeKit software simply implements a KVM high availability cluster without shared storage on a SAN?](<#safekit-kvm-ha-cluster>)
  * [How the SafeKit KVM cluster works?](<#safekit-kvm-ha-how-it-works>)
  * [SafeKit High Availability Limitations](<#safekit-ha-limitations>)
  * [Comparison: SafeKit for KVM vs. Traditional Clustering](<#safekit-kvm-ha-comparison>)
  * [SafeKit video guide for KVM](<#videoguide-safekit-kvm-cluster>)
  * [🔍 SafeKit High Availability Navigation Hub](<#hub>)


## How the SafeKit software simply implements a KVM high availability cluster without shared storage on a SAN? {#safekit-kvm-ha-cluster}

### What is the SafeKit HA solution for KVM?

SafeKit brings high availability to KVM between two servers of any brand.

This article explains how to implement quickly a KVM cluster without shared storage on a SAN and without specific skills.

The principle of the solution is to put the critical application in a virtual machine under KVM. SafeKit implements **real-time replication and automatic failover of the virtual machine**.

Note that KVM is the free hypervisor included in all Linux versions.

### How can I run multiple applications in a high-availability KVM cluster without a SAN?

Several applications can be put in **several virtual machines replicated and restarted by SafeKit**. You have the possibility to migrate each virtual machine between both servers with the SafeKit console and thus balance the load in an **active-active cluster**.

### Should I choose high availability at the application level or the virtual machine (VM) level?

With SafeKit, you have the flexibility to choose the redundancy model that fits your needs.

**VM-level redundancy** (for KVM or Hyper-V) is the simplest to implement as it replicates the entire virtual machine, requiring no knowledge of the internal application.

Alternatively, **application-level redundancy** is more granular; it only replicates specific data folders and restarts the application services rather than the entire OS.

While VM-level HA is easier to set up, application-level HA is hypervisor-agnostic and can run across physical, virtual, or cloud environments.

### What are the distinctive advantages of SafeKit for KVM high availability compared to competitors?

SafeKit differentiates itself from traditional KVM clustering solutions through its **shared-nothing architecture** and simplified management. While most competitors require complex distributed file systems (like Ceph) or a central SAN to manage VM failover, SafeKit provides:

  * **Integrated Real-Time Replication:** Data synchronization is built directly into the solution, ensuring that KVM virtual machines are mirrored synchronously without the overhead of managing a separate storage layer.
  * **Simplified 2-Node Clustering:** Unlike enterprise stacks that recommend a 3-node "witness" quorum, SafeKit delivers full high availability with just two redundant servers. [Learn more about our heartbeat and quorum mechanism](</safekit-docs/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>).
  * **Unified Management:** Administrators can manage VM failover, replication, and load balancing through a single SafeKit console , making it accessible to teams without specialized clustering expertise.
  * **Custom Checkers:** SafeKit goes beyond hardware monitoring; it utilizes **custom checkers** to detect if a VM has crashed, automatically triggering a local restart or a failover to the redundant node. The system is also highly extensible, allowing for the easy integration of new, user-defined custom checkers tailored to your specific environment.


### How does SafeKit reduce the TCO (Total Cost of Ownership) compared to VMware-type solutions?

Unlike most high-availability solutions on the market, SafeKit is designed to operate with the **absolute minimum hardware overhead** , without compromising security or reliability. Key savings compared to VMware or complex open-source alternatives include:

  * **True 2-Node Efficiency:** While most enterprise stacks or open-source solutions require a 3-node "witness" quorum to prevent split-brain, SafeKit delivers full high availability with just **two redundant servers**.
  * **Zero Storage Costs:** SafeKit uses a shared-nothing architecture that works with local disks, removing the need for expensive SAN or vSAN hardware and specialized storage networking.
  * **No Forced Subscriptions:** Unlike modern subscription-only models, SafeKit offers a **perpetual license**. You own your software, avoiding the "subscription trap" and unpredictable annual price hikes.
  * **Low Operational Expense (OPEX):** As a plug-and-play solution, it requires no specialized training or expensive external consultancy for maintenance, unlike complex open-source clustering tools.
  * **CPU-Independent Pricing:** Licensing is independent of the number of CPUs or cores. With just two licenses for two nodes, you can protect multiple KVM virtual machines.


### Is it possible to set up a KVM cluster without SAN or complex clustering skills?

Yes. This article explains how to [**quickly implement a KVM cluster**](</safekit-docs/quick-install/safekit-quick-installation-guide-with-kvm/>) without the need for specialized SAN management or complex HA clustering skills. By using SafeKit’s **automated failover scripts** to handle the replication and restart of **KVM** virtual machines, you get a robust redundancy solution that is significantly simpler to deploy and maintain than traditional enterprise virtualization stacks.

### Beyond KVM, which applications and environments can SafeKit protect?

SafeKit is a versatile high-availability solution that extends far beyond standard virtual machine failover. It enables **synchronous real-time replication** and automatic failover for a wide range of critical workloads, including:

  * **Virtual & Physical Environments:** Complete Hyper-V or KVM virtual machines.
  * **Container Orchestration:** Docker, Podman, and K3s (Kubernetes) environments.
  * **Data & Services:** Individual file directories, services, and various databases.
  * **Cloud Infrastructure:** High availability for Cloud applications.


SafeKit also provides **Farm Clusters** with native **Network Load Balancing and Failover** for stateless applications like **Web Servers**.

[Explore the full list of supported HA solutions here.](</safekit-docs/solutions/>)

## How the SafeKit KVM cluster works? {#safekit-kvm-ha-how-it-works}

The following steps are described for one KVM virtual machine inside one mirror module. Each replicated virtual machine runs in an independent mirror module (with a maximum of 32 virtual machines) with a primary server that can be either the KVM server 1 or the KVM server 2.

### 1\. How does real-time replication work for KVM?

Server 1 (PRIM) runs the KVM VM (virtual machine). SafeKit replicates in real time the VM files (virtual hard disk, VM configuration). Only changes made in the files are replicated across the network.


<img src="/safekit-docs/wp-content/uploads/2023/02/safekit-prim-second-300.png" width="300" alt="File replication at byte level in a mirror KVM cluster">


The replication is [synchronous](</safekit-docs/best-practises/synchronous-replication-vs-asynchronous-replication/>) with no data loss on failure contrary to asynchronous replication.

You just have to configure the VM directory name in SafeKit. There are no pre-requisites on disk organization. The directory may be located in the system disk.

### 2\. What happens during an automatic KVM failover?

When Server 1 fails, Server 2 takes over. SafeKit restarts the KVM VM on Server 2. KVM finds the files replicated by SafeKit uptodate on Server 2.  
The VM continues to run on Server 2 by locally modifying its files that are no longer replicated to Server 1.


<img src="/safekit-docs/wp-content/uploads/2023/02/safekit-stop-alone-300.png" width="300" alt="Failover of KVM in a mirror cluster">


The failover time is equal to the fault-detection time (set to 30 seconds by default) plus the VM reboot time.

### 3\. How is data synchronized after a KVM failure?

Failback involves restarting Server 1 after fixing the problem that caused it to fail. SafeKit automatically resynchronizes the VM files.


<img src="/safekit-docs/wp-content/uploads/2023/02/safekit-resynchro-alone-300.png" width="300" alt="Failback in a mirror KVM cluster">


Failback takes place without disturbing the KVM VM, which can continue running on Server 2.

### 4\. How is normal KVM operation restored?

After reintegration, the VM files are once again in mirror mode, as in step 1. The system is back in high-availability mode, with the KVM VM running on Server 2 and SafeKit replicating file updates to Server 1.


<img src="/safekit-docs/wp-content/uploads/2023/02/safekit-second-prim-300.png" width="300" alt="Return to normal operation in a mirror KVM cluster">


If the administrator wishes the VM to run on Server 1, this can be done manually through the web console at an appropriate time, or automatically through configuration.

### How to configure a SafeKit KVM Cluster? {#safekit-mirror-cluster-configure}


<img src="/safekit-docs/wp-content/uploads/2024/03/21-module-kvm-edit-config-1.png" width="694" alt="SafeKit Web Console: 2-node KVM cluster dashboard for VM replication and automatic failover.">


The **SafeKit web console** provides an intuitive interface to configure high availability of your critical applications. In just a few steps, you can configure a **SafeKit KVM cluster** to ensure business continuity:

  * Put in `VM_PATH`, the root path of the replicated directory (/var/lib/libvirt/images) where the KVM VM files reside.
  * Enter in `VM_NAME`, the name of the KVM virtual machine (VM1).


The SafeKit cluster includes a dedicated [split-brain checker to resolve network isolation issues](</safekit-docs/best-practises/heartbeat-failover-quorum-windows-linux-cluster/> "Technical details on heartbeat and split-brain prevention") without the need for a third witness machine or an additional heartbeat network.

### How to monitor a SafeKit KVM cluster? {#safekit-mirror-cluster-monitoring}


<img src="/safekit-docs/wp-content/uploads/2024/03/14-monitoring-prim-second.png" width="604" alt="SafeKit Web Console: Real-time monitoring of a 2-node mirror KVM cluster showing PRIM and SECOND states with active data replication.">


The **SafeKit management console** offers a unified view of your high availability infrastructure. It allows administrators to monitor the **operational state** of the cluster and track data synchronization in real-time.

For a 2-node KVM cluster, the console clearly displays the roles of each server:

  * **PRIM (Primary):** The active node currently running the application and managing the Virtual IP. It performs writes to the local storage and real-time replication to the secondary node.
  * **SECOND (Secondary):** The standby node receiving synchronous byte-level updates. It is ready to take over instantly if the Primary fails.
  * **ALONE State:** Visually alerts you when the cluster is running on a single node (e.g., during maintenance or after a failure), indicating that redundancy is temporarily lost.
  * **Resynchronization Progress:** When a failed node recovers, its status turns orange during background data reintegration, ensuring no downtime during the "return to normal" phase.


Beyond simple status icons, the interface provides **one-click failover orchestration** , allowing you to manually reassign the primary role for planned maintenance while ensuring continuous availability for user activity.

Note that if you deploy several VMs for replication and failover, you will have multiple PRIM/SECOND widgets. This allows independent failover for each VM and the ability to distribute the load across servers.


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
 

## Comparison: SafeKit for KVM vs. Traditional Clustering {#safekit-kvm-ha-comparison}

Feature | SafeKit for KVM | Enterprise (e.g., VMware) | Standard Open-Source KVM  
---|---|---|---  
Architecture | SANless (Shared-Nothing) | Shared Storage (SAN/vSAN) | Complex (Ceph/DRBD)  
High Availability | 2-Node Synchronous Mirror | 3-Node Minimum (vSAN Witness) | Manual or 3-Node Quorum  
Replication | File Byte-level | Disk Block-level (vSAN) | Varies (File/Block)  
Failover Logic | Fully Automatic | Automatic (vSphere HA) | Complex Scripts  
TCO (Cost) | **Low (Perpetual License)** | High (Annual Subscriptions) | High OPEX (Maintenance)  
Expertise Needed | Standard IT Generalist | Specialized Certification | Expert Linux Engineer  
Deployment Time | < 30 Minutes | Hours to Days | Days of Config  
  
**In summary** , SafeKit for KVM provides the simplest path to **High Availability** by removing the need for a SAN and a third "witness" node, drastically lowering the **Total Cost of Ownership (TCO)** compared to enterprise or manual open-source solutions.

## Video Guide: Configuring a SafeKit HA cluster for KVM {#videoguide-safekit-kvm-cluster}

Configuring high availability for KVM is very similar to the Hyper-V setup. By watching this video on Hyper-V, you will get a clear idea of how to configure **KVM** with SafeKit's shared-nothing architecture.

### SafeKit Video: Virtual Machine-Level Clustering with Hyper-V (5:15) {#demo-hyperv}

In this video, discover how SafeKit implements **high availability for Hyper-V** without the complexity of a SAN. Learn to configure **virtual machine replication** across two nodes to ensure seamless failover for your critical virtualized workloads.

### Video Highlights

  1. [Architecture overview: 2 Hyper-V nodes and 2 virtual machines](<https://www.youtube.com/watch?v=H18s_-_CpmU&t=0s>) (0:49)
  2. [Configuring the cluster and the hyperv.safe modules](<https://www.youtube.com/watch?v=H18s_-_CpmU&t=49s>) (1:59)
  3. [Live testing: VM replication, migration, and automatic failover on crash](<https://www.youtube.com/watch?v=H18s_-_CpmU&t=168s>) (2:26)


### Step-by-Step Implementation:

  * [Start your free trial and follow the Hyper-V quick installation guide](</safekit-docs/quick-install/safekit-quick-installation-guide-with-hyper-v/>)


&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 


<!-- END INSERT: insert-safekit-kvm-solution-mirror-en lang="en" display="content" querystring="app=KVM" -->
 


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