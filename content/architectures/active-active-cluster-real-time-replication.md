---
title: "Active-Active Clustering Software with Real-Time Replication & Mutual Failover"
slug: "active-active-cluster-real-time-replication"
canonical: "https://safekit.eviden.com/architectures/active-active-cluster-real-time-replication/"
description: "Active-Active Clustering Software with Real-Time Replication & Mutual Failover How the active active cluster with real-time replication works?"
category: "architectures"
lang: "en"
topics: "How the active active cluster with real-time replication works?, 🔍 SafeKit High Availability Navigation Hub"
---

# Active-Active Clustering Software with Real-Time Replication & Mutual Failover

## How the active active cluster with real-time replication works?

### Active- active cluster with real-time replication

Applications are running on two servers in mutual failover. Each server is backup of the other server. And each application works on its own replicated file directories.


<img src="/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png" width="300" alt="SafeKit active active cluster with real-time replication">


If one server fails in an active active cluster, all applications will be active on the same server. After restart of the failed server, applications will return to run on their default primary server.

### How it works?

The SafeKit active active cluster is simply configured by deploying two mirror modules with real-time replication. Each mirror module contains its own configuration of virtual IP address, real-time replicated directories and restart scripts.

Note that:

  * the 2 applications Appli1 and Appli2 must be installed on each server for application failover,
  * this architecture is not reduced to 2 applications: N application modules can be deployed on 2 servers with a maximum of 25 modules,
  * each mirror module will have its own virtual IP address, its own replicated file directories and its own recovery scripts.


### Example of an active active cluster

The [Hyper-V](</solutions/hyper-v-replication-automatic-failover-load-balancing/>) or [KVM](</solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>) solution with replication, automatic failover and load balancing of VMs is an example of an active-active cluster with N mirror modules replicating N virtual machines between two physical servers.

In this configuration, a mirror module replicates a full virtual machine and restarts the virtual machine in case of failure. 

There is no virtual IP address in such a module because restarting a VM on a server makes automatically the failover of the VM physical IP address. 

And a critical application is installed inside a VM in this architecture.


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