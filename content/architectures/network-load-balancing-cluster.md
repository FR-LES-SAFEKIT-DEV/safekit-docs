---
title: "SafeKit: All-in-One Windows or Linux Network Load Balancing & High Availability Software"
slug: "network-load-balancing-cluster"
canonical: "https://safekit.eviden.com/architectures/network-load-balancing-cluster/"
description: "SafeKit: All-in-One Windows or Linux Network Load Balancing & High Availability Software"
category: "architectures"
lang: "en"
topics: "The SafeKit Farm Cluster: Software-Only NLB and Automatic Failover for Windows/Linux, Table of Contents, How the SafeKit software simply implements a Windows/Linux Network Load Balancing (NLB) cluster?, How the SafeKit cluster in farm mode works with Windows/Linux?, Comparison: SafeKit Farm Cluster for Windows/Linux vs. Other NLB Clustering Solutions, Video Guide: Configuring a SafeKit Farm NLB Cluster, 🔍 SafeKit High Availability Navigation Hub"
---

# SafeKit: All-in-One Windows or Linux Network Load Balancing & High Availability Software


<!-- BEGIN INSERT: insert-safekit-solution-farm-2-en lang="en" display="content" querystring="app=Windows/Linux&amp;img=https://safekit.eviden.com/wp-content/uploads/2026/02/safekit-farm-windows-or-linux-app-1024.jpg&amp;guide=https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/" -->
 

## The SafeKit Farm Cluster: Software-Only NLB and Automatic Failover for Windows/Linux

A SafeKit Farm Cluster for Windows/Linux is a software-defined Network Load Balancing (NLB) solution designed for scalable application environments. It provides integrated **load balancing and failover directly on application servers** , eliminating the need for dedicated hardware load balancers, proxy servers, or complex multicast configurations.

### What are the advantages of a SafeKit Farm Cluster for Windows/Linux?

  * **All-in-One Software:** Combines Virtual IP, load balancing, and automatic failover/failback in a single software package.
  * **No Special Hardware:** Replaces expensive hardware load balancers with a pure software solution for Windows or Linux, manageable by sysadmins rather than network engineers.
  * **Deep Monitoring & Self-Healing:** Uses application-level "checkers" to monitor specific application processes, detecting crashes even if the server is still running; it then triggers an automatic service restart or a failover if necessary.
  * **Hybrid Farm & Mirror Capability:** Uniquely allows mixing a Farm cluster (for load balancing of front-ends) with a Mirror cluster (for synchronous data replication of back-ends).
  * **OEM High Availability:** Enables software vendors to embed native clustering into their applications, providing a "cluster-ready" and software-only product without extra infrastructure.


<img src="/safekit-docs/wp-content/uploads/2026/02/safekit-farm-windows-or-linux-app-1024.jpg" width="512" alt="SafeKit High Availability Windows/Linux Cluster Architecture providing Virtual IP, Automatic Failover, Automatic Failback, and Network Load Balancing">

**SafeKit Farm NLB Cluster for Windows/Linux**

<a class="btn-quick-install" href="/safekit-docs/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/">⚡ Quick farm cluster installation guide for Windows/Linux ></a>
## Table of Contents {#toc}

  * [How the SafeKit software simply implements a Windows/Linux Network Load Balancing (NLB) cluster?](<#safekit-farm-ha-cluster>)
  * [How the SafeKit farm cluster works with Windows/Linux?](<#safekit-farm-cluster>)
  * [Comparison: SafeKit Farm Cluster for Windows/Linux vs. Other NLB Clustering Solutions](<#safekit-farm-ha-comparison>)
  * [Video Guide: Configuring a SafeKit Farm NLB Cluster](<#videoguide-safekit-farm-cluster>)
  * [🔍 SafeKit High Availability Navigation Hub](<#hub>)


## How the SafeKit software simply implements a Windows/Linux Network Load Balancing (NLB) cluster? {#safekit-farm-ha-cluster}

### What is the SafeKit Farm NLB solution for Windows/Linux?

SafeKit provides network load balancing and high availability to Windows/Linux across two or more servers.

This article explains how to quickly implement a Windows/Linux cluster without hardware load balancers or specialized networking skills.

The solution works by defining a virtual IP with load balancing rules, the Windows/Linux service names, and health checkers.

SafeKit then enables **network load balancing** and **automatic failover** to ensure scalability and continuous service availability.

### How does SafeKit simplify load balancing compared to hardware solutions?

SafeKit simplifies management by replacing traditional "middleman" NLB hardware with a **pure software solution**.

Instead of requiring a dedicated physical appliance, SafeKit runs directly on standard **Windows or Linux** application servers.

Software vendors can provide **OEM High Availability** by integrating **SafeKit** directly into their application stack. This partnership allows vendors to deliver a self-contained, **"cluster-ready" and software-only solution** that includes native load balancing and failover capabilities.

### What are the benefits of SafeKit’s software-based load balancing for Windows/Linux?

SafeKit replaces expensive hardware with a streamlined software approach that offers:

  * **High Performance:** Manages traffic and Virtual IP (VIP) at the OS kernel level, ensuring speed without extra network gear.
  * **Operational Simplicity:** Allows sysadmins to manage clusters via a unified interface without needing specialized networking certifications.
  * **Lower TCO:** Reduces CAPEX and maintenance costs by eliminating the need for dedicated hardware load balancers.


### How does SafeKit application monitoring differ from standard NLB health checks?

Unlike standard NLB hardware that rely on simple **pings** and port checks, SafeKit features **integrated application-level checkers**. While a traditional balancer only confirms if a server is "alive," SafeKit monitors the actual health of specific Windows/Linux processes.

This deep monitoring allows the system to detect "zombie" states—where the server is up but the software has crashed—triggering **automatic service restarts** or traffic redirection that standard NLB solutions cannot perform.

### Is it possible to set up a Windows/Linux farm cluster without clustering skills?

Yes. This article explains how to [**quickly implement a Windows/Linux farm cluster**](</safekit-docs/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/>) without the need for specialized and complex networking skills. By using SafeKit’s **virtual IP** to handle the network load balancing of **Windows/Linux** , you get a robust scalable solution that is significantly simpler to deploy and maintain than traditional NLB solutions.

### Beyond Windows/Linux, which applications and environments can SafeKit protect?

SafeKit is a versatile high-availability solution **for both Windows and Linux**. It enables mirror clusters with **synchronous real-time replication** and automatic failover for a wide range of critical workloads, including:

  * **Virtual & Physical Environments:** Complete Hyper-V or KVM virtual machines.
  * **Container Orchestration:** Docker, Podman, and K3s (Kubernetes) environments.
  * **Data & Services:** Individual file directories, services, and various databases.
  * **Cloud Infrastructure:** High availability for Cloud applications.


[Explore the full list of supported HA solutions here.](</safekit-docs/solutions/>)


<!-- BEGIN INSERT: insert-safekit-farm-en lang="en" display="content" -->
 

## How the SafeKit cluster in farm mode works with Windows/Linux? {#safekit-farm-cluster}

### Virtual IP address in a farm-mode cluster {#virtual-ip-address-farm}


<img src="/safekit-docs/wp-content/uploads/2023/02/safekit-up-up-up-300.png" width="300" alt="How the SafeKit cluster in farm mode implements Windows/Linux network load balancing and failover">


On the previous figure, the Windows/Linux application is running on the 3 servers (3 is an example, it can be 2 or more). Users are connected to a virtual IP address.

The [virtual IP address](</safekit-docs/best-practises/how-a-virtual-ip-address-works/>) is configured locally on each server in the farm-mode cluster.  
The input traffic to the virtual IP address is received by all the servers and split among them by a network filter inside each server's kernel.

SafeKit detects hardware and software failures, reconfigures network filters in the event of a failure, and offers configurable application checkers and recovery scripts.

### Load balancing in a network filter {#network-load-balancing}

The network load balancing algorithm inside the network filter is based on the identity of the client packets (client IP address, client TCP port). Depending on the identity of the client packet input, only one filter in a server accepts the packet; the other filters in other servers reject it.

Once a packet is accepted by the filter on a server, only the CPU and memory of this server are used by the Windows/Linux application that responds to the request of the client. The output messages are sent directly from the application server to the client.

If a server fails, the farm heartbeat protocol reconfigures the filters in the network load balancing cluster to re-balance the traffic on the remaining available servers.

### Stateful or stateless applications {#stateful-stateless}

With a stateful Windows/Linux application, there is session affinity. The same client must be connected to the same server on multiple TCP sessions to retrieve its context on the server. In this case, the SafeKit load balancing rule is configured on the client IP address. Thus, the same client is always connected to the same server on multiple TCP sessions. And different clients are distributed across different servers in the farm.

With a stateless Windows/Linux application, there is no session affinity. The same client can be connected to different servers in the farm on multiple TCP sessions. There is no context stored locally on a server from one session to another. In this case, the SafeKit load balancing rule is configured on the TCP client session identity. This configuration is the one which is the best for distributing sessions between servers, but it requires a TCP service without session affinity.

### How to configure a SafeKit cluster in farm mode for Windows/Linux? {#safekit-farm-cluster-configuration}


<img src="/safekit-docs/wp-content/uploads/2026/01/safekit-farm-cluster-config.png" width="966" alt="SafeKit Web Console: Farm-mode cluster configuration for Windows/Linux network load balancing and virtual IP management.">


The **SafeKit cluster in farm mode** is designed for high availability and scalability of services. The configuration focuses on distributing incoming traffic across both nodes simultaneously:

  * **Load Balanced Services (Macros tab):** Define the specific application services (e.g., Apache, IIS, Nginx) to be kept active on all nodes.
  * **Heartbeat network(s):** Communication path(s) used to detect if a node has left the farm, triggering an immediate redistribution of the load.
  * **Virtual IP (Farm VIP):** Unlike a mirror cluster, the Farm VIP is shared between nodes using kernel filtering algorithm to distribute network traffic.
  * **Load Balancing Rules:** Define the traffic distribution policy based on the source IP address or port.
  * **Checkers:** Monitor the application's health and trigger automatic restart if a process failure is detected.


### How to monitor a SafeKit cluster in farm mode for Windows/Linux? {#safekit-farm-cluster-monitoring}


<img src="/safekit-docs/wp-content/uploads/2026/01/safekit-farm-cluster-monitor.png" width="473" alt="SafeKit Console: Monitoring a 2-node farm-mode cluster showing both Windows/Linux nodes in UP state with active load balancing.">


Monitoring a cluster in farm mode provides visibility into the **Active-Active** nature of the infrastructure, where all nodes contribute to the application's performance (showing 2 nodes in this example):

  * **UP State (50% on 2 nodes):** In a healthy farm, both nodes are in the "UP" (50%) state, meaning they are both actively receiving and processing client requests via the shared Virtual IP.
  * **Automatic Re-balancing:** If one node fails, the console visually shows the remaining node taking 100% of the traffic. There is no "failover" delay, as the surviving node is already active (aside from a detection time of a few seconds).
  * **Node Insertion:** When a repaired node is restarted, it transitions from "STOP" to "UP" and automatically starts receiving its portion of the load without administrator intervention.
  * **No Data Sync:** Note that in a farm-mode cluster, there is no "Orange" resynchronization state, as nodes are expected to be stateless or share a backend database (which can be protected separately in a mirror cluster).


Beyond simple status icons, the interface provides one-click node management, allowing you to manually stop or start a node for planned maintenance while the shared Virtual IP automatically redistributes traffic without interrupting user activity.


<!-- END INSERT: insert-safekit-farm-en lang="en" display="content" -->
 

## Comparison: SafeKit Farm Cluster for Windows/Linux vs. Other NLB Clustering Solutions {#safekit-farm-ha-comparison}

Feature | SafeKit Farm Cluster (Software) | Hardware Load Balancers  
---|---|---  
Architecture | **Kernel-Level Software:** Native integration into Windows/Linux OS. | **Proprietary Hardware:** Dedicated physical appliances.  
Management | **System Admins:** Managed via a simple web console; no networking degree required. | **Network Engineers:** Requires specialized skills and CLI certifications.  
Health Monitoring | **Application Checkers:** Deep monitoring of specific processes (Apache, Nginx, etc.). | **Network Ping:** Basic check to see if the server or port is reachable.  
Self-Healing | **Built-in Restart Intelligence:** Automatically reboots failed services locally. | **Passive Failover:** Simply stops sending traffic to the failed node.  
Infrastructure | **Agnostic:** Works on physical, virtual (VMware, Hyper-V), or Cloud instances. | **Rigid:** Requires specific physical cabling and network rack space.  
Cost (TCO) | **Low CAPEX/OPEX:** Uses existing server resources; no expensive hardware maintenance. | **High Investment:** High upfront costs plus recurring licensing and power expenses.  
  
**In summary** , the **SafeKit Farm Cluster** represents a strategic evolution from traditional, hardware-heavy networking to a modern, **software-defined high availability** model. By integrating load balancing and self-healing intelligence directly into the application servers, SafeKit eliminates the cost and complexity of external "middleman" hardware.

## Video Guide: Configuring a SafeKit Farm NLB Cluster {#videoguide-safekit-farm-cluster}


<!-- BEGIN INSERT: insert-safekit-farm-video-en lang="en" display="content" -->
 

### SafeKit Video: Network Load Balancing and Virtual IP Management (5:03) {#demo-farm}

In this video, learn how to implement a **virtual IP address** to provide a single entry point for a 2-node cluster. SafeKit simplifies **network load balancing** by automatically managing the virtual IP, ensuring that client traffic is distributed across nodes and redirected instantly during a failover. Although this demonstration uses Apache on Windows, the solution works identically with other applications.

### Chapters

  1. [Architecture: Preparing 2 nodes for a shared Virtual IP](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=0s>) (0:13)
  2. [Configuration: Setting up the farm.safe module and Virtual IP address](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=13s>) (2:20)
  3. [Validation: Failover testing and Virtual IP redirection on server crash](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=153s>) (2:30)


### Step-by-Step Implementation

  * [Read the guide on setting up a farm cluster on Windows](</safekit-docs/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/>)
  * [Read the guide on setting up a farm cluster on Linux](</safekit-docs/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-network-load-balancing-and-failover/>)


&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 


<!-- END INSERT: insert-safekit-farm-video-en lang="en" display="content" -->
 


<!-- END INSERT: insert-safekit-solution-farm-2-en lang="en" display="content" querystring="app=Windows/Linux&amp;img=https://safekit.eviden.com/wp-content/uploads/2026/02/safekit-farm-windows-or-linux-app-1024.jpg&amp;guide=https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/" -->
 


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