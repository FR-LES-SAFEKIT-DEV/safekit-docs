---
title: "Kubernetes K3s High Availability: 2-Node Synchronous Replication & Failover"
slug: "kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers"
canonical: "https://safekit.eviden.com/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/"
description: "Kubernetes K3s High Availability: 2-Node Synchronous Replication & Failover"
category: "solutions"
lang: "en"
topics: "Simplifying K3s HA: Why Choose SafeKit Over MetalLB and Longhorn?, Table of Contents, How the SafeKit software simply implements a Kubernetes K3s high availability cluster?, How the SafeKit mirror cluster works with Kubernetes K3S?, SafeKit High Availability Limitations, Comparison: SafeKit vs. Standard K3s Stack (MetalLB & Longhorn), Video Guide: Configuring a SafeKit HA mirror cluster, 🔍 SafeKit High Availability Navigation Hub"
---

# Kubernetes K3s High Availability: 2-Node Synchronous Replication & Failover

## Simplifying K3s HA: Why Choose SafeKit Over MetalLB and Longhorn? {#safekit-k3s-ha-introduction}

While the standard open-source stack (MetalLB + Longhorn) for K3s is powerful for large data centers, it introduces excessive complexity for 2-node on-premises sites. **SafeKit** simplifies the K3s environment by replacing standalone networking and storage tools with a single, consolidated HA engine. 

### Why Use SafeKit for 2-Node K3s High Availability (HA)?

  * **True 2-Node High Availability:** SafeKit provides full redundancy with only **2 nodes** , eliminating the 3-node requirement for _etcd_ quorum.
  * **Zero Data Loss (RPO=0):** Replaces high-overhead block storage with **Synchronous Byte-level replication** for local SSD performance.
  * **Flexible File-Level Protection:** SafeKit performs host-based replication at the file level, which is completely transparent for the application. It protects not just databases, but all associated folders and data. You can replicate existing folders exactly where they are installed, even on the **system disk**.
  * **Integrated Virtual IP (VIP):** Natively manages the cluster IP at the kernel level, removing the need for separate **MetalLB** configurations.
  * **Automatic Failover & Failback:** Triggers an immediate transition to the secondary node upon failure; once the primary node is healthy, SafeKit executes **automatic data resynchronization** without manual intervention.
  * **Ultra-Low Overhead:** SafeKit operates without the heavy management overhead of storage pods (CSI/Longhorn) and networking pods (CNI/MetalLB) required by standard stacks, freeing up critical RAM and CPU for your applications.
  * **IT Generalist Friendly:** Replaces complex **infrastructure YAML** for networking and storage with a **simple web GUI** and automated deployment scripts, leaving you to focus only on your applications.


<img src="/wp-content/uploads/2026/02/safekit-mirror-k3s-1024.jpg" width="512" alt="SafeKit architecture diagram for 2-node K3s high availability featuring integrated Virtual IP, real-time replication, and automatic failover.">

 **Shared-nothing high availability (HA) for 2-node K3s clusters**  


<a class="btn-quick-install" href="/quick-install/safekit-quick-installation-guide-with-kubernetes/">⚡ Quick Kubernetes HA cluster installation guide ></a>
## Table of Contents {#toc}

  * [How the SafeKit software simply implements a Kubernetes K3s high availability cluster?](<#safekit-mirror-k3s-cluster>)
  * [How the SafeKit mirror cluster works with Kubernetes K3S?](<#safekit-mirror-cluster>)
  * [SafeKit High Availability Limitations](<#safekit-ha-limitations>)
  * [Comparison: SafeKit vs. Standard K3s Stack (MetalLB & Longhorn)](<#safekit-k3s-ha-comparison>)
  * [Video Guide: Configuring a SafeKit Mirror HA cluster](<#videoguide-safekit-mirror-cluster>)
  * [🔍 SafeKit High Availability Navigation Hub](<#hub>)


## How the SafeKit software simply implements a Kubernetes K3s high availability cluster? {#safekit-mirror-k3s-cluster}

### How do I implement high availability for a 2-node Kubernetes K3s cluster?

You can implement high availability (HA) for a 2-node Kubernetes K3s cluster using the **SafeKit k3s.safe mirror module**. This solution allows you to deploy a redundant environment without the need for external NFS storage, a dedicated external configuration database, or specialized Kubernetes expertise.

### Why use K3s for Edge and IoT computing?

[K3s](<https://k3s.io/>) is the preferred Kubernetes engine for **IoT and Edge computing** because it is a lightweight, certified distribution designed for resource-constrained environments. It simplifies the operational overhead of standard Kubernetes while maintaining full compatibility.

### What are the key features of the k3s.safe mirror module?

The k3s.safe module provides a comprehensive HA stack for K3s by implementing:

  * **Dual Active Nodes:** Runs 2 active K3s masters/agents simultaneously to host pods.
  * **Database Replication:** Real-time replication of the MariaDB configuration database between nodes.
  * **Persistent Storage:** Replication of persistent volumes via an integrated NFS client dynamic provisioner (nfs-client).
  * **Network Continuity:** Includes a Virtual IP address for seamless client access.
  * **Automated Recovery:** Full support for automatic failover and failback.


### Beyond K3s, which applications and environments can SafeKit protect?

SafeKit is a versatile high-availability solution **for both Windows and Linux** that extends far beyond K3s mirror cluster. It enables **synchronous real-time replication** and automatic failover for a wide range of critical workloads, including:

  * **Virtual & Physical Environments:** Complete Hyper-V or KVM virtual machines.
  * **Container Orchestration:** Docker, Podman environments.
  * **Data & Services:** Individual file directories, services, and various databases.
  * **Cloud Infrastructure:** High availability for Cloud applications.


SafeKit also provides **Farm Clusters** with native **Network Load Balancing and Failover** for stateless applications like **Web Servers**.

[Explore the full list of supported HA solutions here.](</solutions/>)

### How SafeKit Achieves K3s High Availability? {#safekit-k3s-architecture-table}

**Architecture and Redundancy Logic for a 2-Node K3s Cluster using SafeKit**

2-Node K3s Cluster | SafeKit PRIM (Primary Node) | SafeKit SECOND (Secondary Node)  
---|---|---  
Workload Execution | K3s master and agent services are active, managing cluster orchestration and running pods. | K3s master and agent services remain active, providing parallel processing and high availability.  
NFS Storage & PVs |  • Hosts Virtual IP and NFS Port<br>• Manages active exported NFS shares<br>• Stores K3s Persistent Volumes (PVs)  | **Synchronous Mirroring:** SafeKit replicates all persistent volumes in real-time to ensure zero data loss.  
Configuration Database |  • Hosts Virtual IP and MariaDB Port<br>• Manages active K3s configuration database  | **Database Replication:** The MariaDB database is mirrored synchronously, preserving cluster state for failover.  
  
**Automatic Failover Mechanism:** In the event of a Primary node failure, SafeKit automatically migrates the Virtual IPs and storage services to the Secondary node, ensuring uninterrupted service for the K3s cluster.

## How the SafeKit mirror cluster works with Kubernetes K3S? {#safekit-mirror-cluster}

### Step 1: Byte-Level File Replication in a Mirror Cluster

This stage illustrates the high-availability architecture between **Server 1 (PRIM)** and **Server 2 (SECOND)**. Both servers run K3s master and agent components as defined in the [architecture table](<#safekit-k3s-architecture-table>).


<img src="/wp-content/uploads/2023/02/safekit-prim-second-300.png" width="300" alt="File replication at byte level in a Kubernetes K3s mirror cluster">


Currently, the **Virtual IP (VIP)** , **NFS persistent storage** , and **MariaDB** are active on Server 1 (PRIM) only. The K3s master components on both nodes synchronize with each other by accessing the cluster state via the Virtual IP and the MariaDB port. SafeKit implements [synchronous replication](</best-practises/synchronous-replication-vs-asynchronous-replication/>) of MariaDB and persistent NFS files, ensuring **zero data loss (RPO = 0)** in the event of a failure.

The K3s masters distribute the workload across both nodes (or more) by communicating directly with the K3s agents. External clients connect to the  
[cluster's Virtual IP address](</best-practises/how-a-virtual-ip-address-works/>) on the PRIM node. Using standard Kubernetes mechanisms, the K3s master relays traffic to pods distributed across the nodes. Similarly, pods access their **persistent volumes (PVs)** on the PRIM server via the Virtual IP and NFS port.

### Step 2: Automatic Failover and Service Continuity

When **Server 1 (PRIM)** fails, **Server 2 (SECOND)** automatically takes over the cluster operations to ensure continuity.


<img src="/wp-content/uploads/2023/02/safekit-stop-alone-300.png" width="300" alt="Failover in a Kubernetes K3S mirror cluster">


SafeKit detects the failure and immediately migrates the cluster's **Virtual IP address** to Server 2. It then promotes the local **MariaDB** and **NFS services** to an active state. Because of the synchronous replication performed in Step 1, all MariaDB databases and NFS Persistent Volume (PV) files are already up-to-date on Server 2, ensuring zero data loss.

With the cluster state preserved, the **K3s Master** on Server 2 continues execution. It detects the loss of the Server 1 agent and automatically reschedules the affected pods onto the remaining active K3s agents. The total failover time (RTO) is the sum of the fault-detection interval (default: 30 seconds) and the time required for K3s components to initialize on the secondary node.

While Server 1 is offline, MariaDB and NFS services continue to run on Server 2, writing changes only locally.  


### Step 3: Failback and Automatic Reintegration

**Failback** occurs when Server 1 is restarted after the initial issue has been resolved. SafeKit automatically resynchronizes the MariaDB and NFS files, updating only the data modified on Server 2 during the downtime. This reintegration process is **non-disruptive** ; K3s master and agent components continue to run on Server 2 without interruption. 


<img src="/wp-content/uploads/2023/02/safekit-resynchro-alone-300.png" width="300" alt="Automatic resynchronization and failback in a K3s mirror cluster">

 

SafeKit optimizes recovery time based on how the server was stopped: 

  * **Clean Shutdown:** If SafeKit was stopped intentionally on Server 1, only the specific modified zones within the files are resynchronized using **modification tracking bitmaps**. This ensures an ultra-fast reintegration. 
  * **System Crash (e.g., Power Failure):** If Server 1 suffered an unclean shutdown, the modification bitmaps are bypassed for safety. SafeKit instead resynchronizes all files with a modification timestamp more recent than the last established synchronization point, ensuring **total data integrity**. 


### Step 4: Restoring High Availability and Load Distribution

Following reintegration, the cluster returns to **full mirror mode** , mirroring the state described in Step 1. The system is once again in a highly available state: **MariaDB** and **NFS services** remain active on Server 2, while SafeKit performs real-time replication of all file updates back to Server 1. 


<img src="/wp-content/uploads/2023/02/safekit-second-prim-300.png" width="300" alt="Return to normal operation in a Kubernetes K3s mirror cluster">

 

The **K3s Master** and **K3s Agent** are automatically restarted on Server 1. The Kubernetes scheduler now recognizes Server 1 as a healthy node and can begin rescheduling pods to distribute the workload across both servers. 

If the administrator prefers the MariaDB and NFS services to run on Server 1 (restoring the original PRIM role), a **switchover** can be triggered manually via the web console at a convenient time or automated through the configuration settings. 

### How to configure a SafeKit Mirror Cluster? {#safekit-mirror-cluster-configure}


<img src="/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png" width="763" alt="SafeKit Web Console: High Availability configuration dashboard showing heartbeat networks, virtual IP setup, and real-time directory replication for a mirror cluster.">


The **SafeKit web console** provides an intuitive interface to orchestrate high availability for your critical applications. In just a few steps, you can configure a **SafeKit mirror cluster** to ensure business continuity:

  * **Application Failover (Macros Tab):** Define the specific application services to be automatically restarted in the event of a failure.
  * **Heartbeat network(s):** Dedicated communication path(s) used by cluster nodes to continuously monitor each other's health and availability and synchronize failover decisions.
  * **Virtual IP Management:** Set up the Virtual IP (VIP) for transparent client reconnection after a failover.
  * **Real-Time Replication:** Select the critical directories for host-based, synchronous byte-level replication.
  * **Checkers:** Monitor the application's health and trigger automatic recovery if a process failure is detected.


The SafeKit cluster includes a dedicated split-brain checker to resolve network isolation issues without the need for a third witness machine or an additional heartbeat network. Learn more about [heartbeat, failover and quorum in a cluster](</best-practises/heartbeat-failover-quorum-windows-linux-cluster/>).

### How to monitor a SafeKit mirror cluster? {#safekit-mirror-cluster-monitoring}


<img src="/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png" width="478" alt="SafeKit Web Console: Real-time monitoring of a 2-node mirror cluster showing PRIM and SECOND states with active data replication.">


The **SafeKit management console** offers a unified view of your high availability infrastructure. It allows administrators to monitor the **operational state** of the cluster and track data synchronization in real-time.

For a 2-node mirror cluster, the console clearly displays the roles of each server:

  * **PRIM (Primary):** The active node currently running the application and managing the Virtual IP. It performs writes to the local storage and real-time replication to the secondary node.
  * **SECOND (Secondary):** The standby node receiving synchronous byte-level updates. It is ready to take over instantly if the Primary fails.
  * **ALONE State:** Visually alerts you when the cluster is running on a single node (e.g., during maintenance or after a failure), indicating that redundancy is temporarily lost.
  * **Resynchronization Progress:** When a failed node recovers, its status turns orange during background data reintegration, ensuring no downtime during the "return to normal" phase.


Beyond simple status icons, the interface provides **one-click failover orchestration** , allowing you to manually reassign the primary role for planned maintenance while ensuring continuous availability for user activity.


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
 

## Comparison: SafeKit vs. Standard K3s Stack (MetalLB & Longhorn) {#safekit-k3s-ha-comparison}

**Comparison: SafeKit vs. Standard Open-Source (MetalLB + Longhorn)**

Capability | SafeKit (K3s.safe) | MetalLB + Longhorn (Standard K8s)  
---|---|---  
Architecture | **All-in-One:** Integrated networking, replication, and failover in a single package. | **DIY (Do It Yourself) Stack:** Multiple independent packages required (CNI, CSI, LoadBalancer).  
Hardware Efficiency | **Pure 2-Node HA:** Full redundancy without a 3rd "witness" or arbiter node. | **3-Node Minimum:** Typically requires odd numbers for Etcd quorum and storage safety.  
Networking (VIP) | **Native:** Virtual IP managed at the OS level; transparent to K3s. | **Complex:** Requires MetalLB installation with L2 or BGP configuration using dedicated speaker pods which consume CPU/RAM on each node.  
Storage Requirements | **Byte-Level Synchronous:** Real-time file replication of existing directories; works on standard system disks; byte-level file replication with minimal CPU/Network overhead. | **Block-Level:** Distributed block storage (Longhorn) using dedicated storage pods; higher resource consumption.  
Failover Intelligence | **Independent Stability:** SafeKit operates outside the container runtime. It monitors the OS and hardware directly, ensuring failover even if the Kubernetes control plane or container engine hangs. | **Circular Dependency:** Failover logic is hosted _inside_ the pods it is meant to protect. If the host OS or K3s engine hangs, the management pods (MetalLB/Longhorn) also freeze, often requiring manual triage to break the "lock."  
Administration | **Simplified:** Manageable via a single web console; no Kubernetes expert required. | **Specialized:** Requires deep knowledge of YAML, Helm, and K8s internal controllers.  
  
**In summary** , while a standard DIY stack (MetalLB + Longhorn) offers modularity for Kubernetes experts, it creates a **circular dependency** where the storage and networking tools are vulnerable to the same node failures they are designed to manage. **SafeKit** breaks this loop by operating as an independent infrastructure layer; it provides a more robust, hardware-agnostic 2-node HA solution that remains operational even if the Kubernetes engine or host OS hangs. This ensures automated recovery and data integrity without the heavy resource overhead, mandatory three-node quorum, or configuration complexity required by traditional distributed block storage and networking overlays.

## Video Guide: Configuring a SafeKit HA mirror cluster {#videoguide-safekit-mirror-cluster}

### SafeKit Video: Application-Level Clustering (8:47) {#demo-mirror-ha-cluster}

While this video demonstrates SafeKit's high availability for Microsoft SQL Server, it provides an excellent overview of how the solution secures K3s environments. SafeKit functions identically for any other database or business-critical application.

### Video Highlights

  1. [2 nodes with SQL Server](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. [Configure the cluster and the mirror.safe module](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. [Start and test SQL replication, migration, failover on crash](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)


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