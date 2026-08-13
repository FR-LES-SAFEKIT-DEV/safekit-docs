---
title: "High Availability and Redundancy for SCADA and Industrial Control Systems (ICS)"
slug: "scada-software-redundancy-high-availability"
canonical: "https://safekit.eviden.com/use-cases/scada-software-redundancy-high-availability/"
description: "High Availability and Redundancy for SCADA and Industrial Control Systems (ICS) SCADA systems make it possible to control industrial processes, to interact directly with devices such as sensors, valves, pumps, motors, through human-machine interface software. If the SCADA software is down, the production stops. That’s why, the SCADA software must be always available for operators […]"
category: "use-cases"
lang: "en"
topics: "What is a SCADA system?, Why a SCADA software is critical?, Key players list in SCADA software, SafeKit brings two solutions for redundancy and high availability of a SCADA software, SafeKit, a recognized solution on the SCADA market, 🔍 SafeKit High Availability Navigation Hub"
---

# High Availability and Redundancy for SCADA and Industrial Control Systems (ICS)

##  What is a SCADA system? 

SCADA systems make it possible to control industrial processes, to interact directly with devices such as sensors, valves, pumps, motors, through human-machine interface software.

##  Why a SCADA software is critical? 

If the SCADA software is down, the production stops.

That’s why, the SCADA software must be always available for operators who must react immediately to the slightest incident.

##  Key players list in SCADA software 

According this [analyst report](<https://www.linkedin.com/pulse/global-scada-market-size-reach-value-usd-/>), the key players in SCADA software are:

  * Siemens
  * ABB
  * Rockwell Automation
  * Senergy Intellution Pvt Ltd
  * Emerson
  * Omron Automation
  * Data Flow Systems, Inc.
  * Alstom


  * Schneider Electric
  * Wonderware
  * Mitsubishi Heavy Industries
  * Yokogawa Electric Corporation
  * Eaton
  * GE
  * Honeywell
  * Pilz
  * Survalent
  * Valmet GmbH
  * Hitachi



<!-- BEGIN INSERT: insert-safekit-scada-solutions-en lang="en" display="content" querystring="app=SCADA" -->
 

## SafeKit brings two solutions for redundancy and high availability of a SCADA software

### Redundancy and high availability at the application level

In this type of solution, only application data are replicated. And only the application is restared in case of failure.


<img src="/safekit-docs/wp-content/uploads/2023/02/application-ha-4.png" width="168" alt="Redundancy at the application level for a SCADA  software">


With this solution, restart scripts must be written to restart the application. This solution is platform agnostic and works with applications inside physical machines, virtual machines, in the Cloud. Any hypervisor is supported (VMware, Hyper-V...).

  * Solution for a new application (restart scripts to write): [Windows](</safekit-docs/solutions/windows-high-availability-software-synchronous-replication-failover/>), [Linux](</safekit-docs/solutions/linux-high-availability-software-synchronous-replication-failover/>)


### Redundancy and high availability at the virtual machine level

In this type of solution, the SCADA software is put inside a virtual machine. The full Virtual Machine (VM) is replicated and restarted (Application + OS).


<img src="/safekit-docs/wp-content/uploads/2023/02/vm-ha-4.png" width="186" alt="Redundancy at the virtual machine level for a SCADA software">


The advantage of this solution is that there is no restart scripts to write per application. This solution is generic for any SCADA software. It works with Windows/Hyper-V and Linux/KVM but not with VMware. This is an active/active solution with several virtual machines replicated and restarted between two nodes.

  * Solution for a new application (no restart script to write): [Windows/Hyper-V](</safekit-docs/solutions/hyper-v-replication-automatic-failover-load-balancing/>), [Linux/KVM](</safekit-docs/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)



<!-- END INSERT: insert-safekit-scada-solutions-en lang="en" display="content" querystring="app=SCADA" -->
 


<!-- BEGIN INSERT: insert-safekit-scada-case-en lang="en" display="content" -->
 

## SafeKit, a recognized solution on the SCADA market

###  Solution preferred by Siemens 


<img src="/safekit-docs/wp-content/uploads/2023/01/desigo-cc-1280-250-1.jpg" width="1000" alt="SafeKit with the Siemens Desigo CC SCADA system">


SafeKit is available in the [Siemens marketplace](<https://www.siemens.com/en-us/products/atos-safekit/>) with its SCADA sofware: [Desigo CC](</safekit-docs/solutions/siemens-desigo-cc-redundancy-high-availability-cluster-active-active/>) (building management), [SIMATIC WinCC](</safekit-docs/solutions/siemens-simatic-wincc-redundancy-high-availability-cluster-active-active/>), [SIMATIC PCS 7](</safekit-docs/solutions/siemens-simatic-pcs-7-redundancy-high-availability-cluster-active-active/>) and also with the [Siveillance suite](</safekit-docs/solutions/siemens-siveillance-redundancy-high-availability-cluster-active-active/>) (video and access control).

SafeKit is deployed by Siemens in Australia, France, the Netherlands, Qatar, Switzerland, the UAE, the UK, the US.

###  SafeKit chosen by Alstef Group 


<img src="/safekit-docs/wp-content/uploads/2023/01/alstef-bagware-1280-250-1.jpg" width="1000" alt="SafeKit with the Alstef Group SCADA system, BAGware">


Alstef Group, a key player in baggage handling systems, deploys SafeKit for redundancy and high availability of its [SCADA software suite, BAGware](<https://alstefgroup.com/baggage-handling/software/bagware/>).

SafeKit has been deployed by Alstef Group in many airports with BAGware.

###  Fives Syleps has chosen SafeKit 


<img src="/safekit-docs/wp-content/uploads/2023/01/fives-syleps-1280-250.jpg" width="1000" alt="SafeKit with the Fives Syleps automated logistics system">


Fives Syleps, a key player in automated logistics, deploys SafeKit for redundancy and high availability of [its software suite](<https://www.syleps.com/en/>).

SafeKit has been deployed by Fives Syleps in many factories.


<!-- END INSERT: insert-safekit-scada-case-en lang="en" display="content" -->
 


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