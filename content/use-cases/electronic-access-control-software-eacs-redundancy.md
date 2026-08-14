---
title: "High Availability and Redundancy for Electronic Access Control Software (EACS)"
slug: "electronic-access-control-software-eacs-redundancy"
canonical: "https://safekit.eviden.com/use-cases/electronic-access-control-software-eacs-redundancy/"
description: "High Availability and Redundancy for Electronic Access Control Software (EACS) Electronic access control systems consist of hardware devices that control entry into any private premises. Theft breaches and break-ins are common crimes in business environments. Electronic access control systems are widely used because of that. EACS software manages hardware devices, and it denies entry to […]"
category: "use-cases"
lang: "en"
topics: "What is an electronic access control system (EACS)?, Why an EACS software is critical?, Key players list in EACS, SafeKit brings two solutions for redundancy and high availability of a EACS software, SafeKit, a recognized solution on the security market, 🔍 SafeKit High Availability Navigation Hub"
---

# High Availability and Redundancy for Electronic Access Control Software (EACS)

##  What is an electronic access control system (EACS)? 

Electronic access control systems consist of hardware devices that control entry into any private premises.

Theft breaches and break-ins are common crimes in business environments. Electronic access control systems are widely used because of that.

##  Why an EACS software is critical? 

EACS software manages hardware devices, and it denies entry to unauthorized users or raises alarms on intrusion by thieves or criminals.

The safety of people is directly associated with the proper execution of the EACS software.

And that's why the system must always be available to security officers who must react immediately to the slightest incident.

##  Key players list in EACS 

The key players in EACS are:

  * dormakaba Holding (Switzerland)
  * ASSA ABLOY (Sweden)
  * Johnson Controls (Ireland)
  * Allegion plc (Ireland)
  * Honeywell International (US)
  * Identiv Inc. (US)


  * Nedap N.V. (Netherlands)
  * Suprema HQ (South Korea)
  * Thales Group (France)
  * Bosch Security Systems (Germany)
  * NEC Corporation (Japan)
  * IDEMIAs (France)
  * HID (US)
  * TIL Technologies (France)



<!-- BEGIN INSERT: insert-safekit-security-solutions-en lang="en" display="content" querystring="app=EACS" -->
 

## SafeKit brings two solutions for redundancy and high availability of a EACS software

### Redundancy and high availability at the application level

In this type of solution, only application data are replicated. And only the application is restared in case of failure.


<img src="/wp-content/uploads/2023/02/application-ha-4.png" width="168" alt="Redundancy at the application level for a EACS software">


This solution requires a technical understanding of the application. You need to define which services to restart, specify the application folders to replicate, and configure a virtual IP address for failover. But this solution is platform agnostic and works with applications inside physical machines, virtual machines, in the Cloud. Any hypervisor is supported (VMware, Hyper-V...).

### Examples

  * Video management: [Milestone (Management, SQL, Log, Event)/SafeKit](</solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/>)
  * Video management: [Genetec (SQL)/SafeKit](</solutions/genetec-sql-server-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/>)
  * Access control: [Nedap (AEOS, SQL)/SafeKit](</solutions/nedap-high-availability-synchronous-replication-failover/>)
  * New application (define services to restart, application folders to replicate, a virtual IP address for failover): [Windows](</solutions/windows-high-availability-software-synchronous-replication-failover/>), [Linux](</solutions/linux-high-availability-software-synchronous-replication-failover/>)


### Redundancy and high availability at the virtual machine level

In this type of solution, the EACS software is put inside a virtual machine. The full Virtual Machine (VM) is replicated and restarted (Application + OS).


<img src="/wp-content/uploads/2023/02/vm-ha-4.png" width="184" alt="Redundancy at the virtual machine level for a EACS software">


The advantage of this solution is that it does not require a technical understanding of the application; you only need to define the location of the VM files where the application is installed. This solution is generic for any EACS software. However, it works only with Windows/Hyper-V and Linux/KVM, but not with VMware. This is an active/active solution with several virtual machines replicated and restarted between two nodes.

### Examples

  * Building management: [Siemens Desigo CC/SafeKit](</solutions/siemens-desigo-cc-redundancy-high-availability-cluster-active-active/>)
  * Video management and access control: [Siemens Siveillance suite/SafeKit](</solutions/siemens-siveillance-redundancy-high-availability-cluster-active-active/>)
  * New application (define the location of the VM files folder where the application is installed): [Windows/Hyper-V](</solutions/hyper-v-replication-automatic-failover-load-balancing/>), [Linux/KVM](</solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)


More comparison between [VM HA vs Application HA](</best-practises/vm-ha-vs-application-ha/>)


<!-- END INSERT: insert-safekit-security-solutions-en lang="en" display="content" querystring="app=EACS" -->
 


<!-- BEGIN INSERT: insert-safekit-security-case-en lang="en" display="content" querystring="app=EACS" -->
 

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


<!-- END INSERT: insert-safekit-security-case-en lang="en" display="content" querystring="app=EACS" -->
 


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