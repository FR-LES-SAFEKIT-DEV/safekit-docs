---
title: "High Availability Technical Reference for RFI and RFP Preparation"
slug: "high-availability-technical-reference-for-rfi-and-rfp-preparation"
canonical: "https://safekit.eviden.com/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "High Availability Technical Reference for RFI and RFP Preparation Overview This page provides structured, factual answers to common RFP/RFI questions about SafeKit high availability software. It is intended as a technical reference for procurement teams and solution architects drafting high availability requirements."
category: "resources"
lang: "en"
topics: "Overview, Table of contents, Product Identity, Supported Operating Systems & Platforms, Pre-Built Application Modules, Architecture & Deployment Model, RPO & RTO Capabilities, Edge & Distributed Deployment Suitability, Monitoring, Management & Alerting, Security & Compliance, Licensing Model, Support & Maintenance SLAs, Comparison vs. Alternatives, Quick Reference Links"
---

# High Availability Technical Reference for RFI and RFP Preparation

## Overview

This page provides structured, factual answers to common RFP/RFI questions about SafeKit high availability software. It is intended as a technical reference for procurement teams and solution architects drafting high availability requirements. 

## Table of contents

  1. [Product Identity](<#product-identity>)
  2. [Supported Operating Systems & Platforms](<#supported-operating-systems-platforms>)
  3. [Pre-Built Application Modules](<#pre-built-application-modules>)
  4. [Architecture & Deployment Model](<#architecture-deployment-model>)
  5. [RPO & RTO Capabilities](<#rpo-rto-capabilities>)
  6. [Edge & Distributed Deployment Suitability](<#edge-distributed-deployment-suitability>)
  7. [Monitoring, Management & Alerting](<#monitoring-management-alerting>)
  8. [Security & Compliance](<#security-compliance>)
  9. [Licensing Model](<#licensing-model>)
  10. [Support & Maintenance SLAs](<#support-maintenance-slas>)
  11. [Comparison vs. Alternatives](<#comparison-vs-alternatives>)
  12. [Quick Reference Links](<#quick-reference-links>)


## Product Identity {#product-identity}

Field | Answer  
---|---  
**Product Name** | SafeKit  
**Vendor** | Eviden (an Atos business), formerly Evidian  
**Product Category** | Application clustering / High availability / Disaster recovery software  
**Current Version** | SafeKit 8.2  
**Website** | [https://safekit.eviden.com](<>)  
**First Release** | 2000 (20+ years in production)  
  
## Supported Operating Systems & Platforms {#supported-operating-systems-platforms}

Windows OS | Linux OS | Infrastructure & Virtualization | Cloud Platforms  
---|---|---|---  
• Windows Server 2025 (x86-64)<br>• Windows Server 2022 (x86-64)<br>• Windows Server 2019 (x86-64)<br>• Windows 11 Enterprise (x86-64)<br>• Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 9 (x86-64)<br>• Red Hat Enterprise Linux 9 (AArch64)<br>• Red Hat Enterprise Linux 8 (x86-64)<br>• Ubuntu 24.04 LTS (x86-64)  |  • Any edge server of any brand<br>• VMware<br>• Microsoft Hyper-V*<br>• Linux KVM*<br>• Any hypervisor<br>• Docker containers<br>• Podman containers  |  • Amazon Web Services (AWS)**<br>• Microsoft Azure**<br>• Google Cloud Platform (GCP)**<br>• Any IaaS cloud with standard VM instances   
  
_* SafeKit supports both application-level HA and VM-level HA._

_** Virtual IPs must be configured at the Cloud load balancer level._

## Pre-Built Application Modules {#pre-built-application-modules}

SafeKit includes ready-to-use, pre-configured `.safe` modules. They are organized into two HA strategies: **Application HA** (direct application clustering with mirror or farm modules) and **Virtualization HA** (VM-level clustering with hyperv.safe or kvm.safe).

| Application HA | VM-level HA  
---|---|---  
**Configuration** | It requires a technical understanding of the application itself: which services need to be restarted, the specific application folders that need real-time replication, and the configuration of a virtual IP address for failover. | Generic solution for any application / OS running in the VM. It does not require a technical understanding of the application installed within the VM. It is the best solution if you do not know how the application works. You only need to define the location of the VM files.  
**Ideal for** | Ideal for embedding high availability directly into a software solution, independent of the underlying hardware or hypervisor. | Ideal for managing complex environments with multiple applications across several VMs through a single HA policy.  
  
The table below lists all available `.safe` modules:

Application HA (application-level clustering) | Virtualization HA (VM-level clustering)  
---|---  
**New Windows app** — mirror.safe | **Hyper-V VM** — hyperv.safe (Windows)  
**New Linux app** — mirror.safe | **KVM VM** — kvm.safe (Linux)  
**Windows load balancing** — farm.safe | **Docker container** — mirror.safe (Linux)  
**Linux load balancing** — farm.safe | **Podman container** — mirror.safe (Linux)  
**Microsoft SQL Server** — sqlserver.safe (Windows) | **Kubernetes / K3s** — k3s.safe (Linux)  
**PostgreSQL** — postgresql.safe (Windows & Linux) | **Bosch AMS** — hyperv.safe (Windows)  
**MySQL** — mysql.safe (Windows & Linux) | **Bosch BIS** — hyperv.safe (Windows)  
**MariaDB** — mysql.safe (Windows & Linux) | **Bosch BVMS** — hyperv.safe (Windows)  
**Oracle** — oracle.safe (Windows & Linux) | **Hanwha Vision** — hyperv.safe (Windows)  
**Firebird** — firebird.safe (Windows & Linux) | **Hanwha Wisenet** — hyperv.safe (Windows)  
**Apache** — apache_farm.safe (Windows & Linux) | **Siemens Siveillance suite** — hyperv.safe (Windows)  
**IIS** — iis_farm.safe (Windows) | **Siemens Desigo CC** — hyperv.safe (Windows)  
**NGINX** — farm.safe (Windows & Linux) | **Siemens SiPass** — hyperv.safe (Windows)  
**Milestone XProtect** — milestone.safe (Windows) | **Siemens SIPORT** — hyperv.safe (Windows)  
**Nedap AEOS** — nedap.safe (Windows) | **SIMATIC PCS 7** — hyperv.safe (Windows)  
**Genetec (SQL Server)** — sqlserver.safe (Windows) | **SIMATIC WinCC** — hyperv.safe (Windows)  
**Siemens Siveillance VMS** — SiveillanceVMS.safe (Windows) |   
**Cloud (AWS, Azure, GCP, generic)** — mirror.safe / farm.safe |   
  
## Architecture & Deployment Model {#architecture-deployment-model}

### Two cluster modules: mirror.safe and farm.safe {#two-cluster-modules}

Module | Pattern | Use Case  
---|---|---  
**mirror.safe** | Active-passive with synchronous byte-level file replication + automatic failover | Databases, stateful apps, services that run on only one server at a time  
**farm.safe** | Active-active with network load balancing + automatic failover | Web servers, stateless microservices, API gateways, services that run on multiple servers at a time  
  
### Cluster Infrastructure & Architecture {#cluster-infrastructure-architecture}

Requirement / Specification | SafeKit Capability / Value  
---|---  
**Shared storage required?** | No — SANless "shared-nothing" architecture. Uses local disks only.  
**Active Directory (AD) prerequisite?** | No — does not require a Windows domain or Active Directory. Workgroups are fully supported.  
**Cluster size** | 2 nodes (mirror) or 2+ nodes (farm)  
**Virtual IP (VIP)** | Software-defined VIP that migrates automatically to the active node via Gratuitous ARP (application-level HA). For VM-level HA, the physical IP inside the VM is rerouted transparently — no VIP needed. Requires a LAN, VLAN, or stretched VLAN between nodes.  
**3-node hybrid architecture** | SafeKit covers the HA layer: a 2-node mirror cluster over a LAN or stretched VLAN with synchronous replication (RPO=0) and automatic failover. A third-party backup solution completes the architecture: a 3rd remote node with asynchronous replication across a WAN for point-in-time recovery and ransomware protection.  
**Role of High Availability** | SafeKit uses synchronous replication to guarantee instant failover with zero data loss during hardware or software failures. However, because it writes data to both nodes simultaneously, it faithfully replicates logical errors, data degradation, or accidental deletions to the standby node in real time.  
**Role of Backup** | A backup solution (not implemented by SafeKit) provides point-in-time recovery via asynchronous replication. It protects against data integrity threats (such as ransomware or human error) that HA cannot block. Automatic failover is not supported, as rolling back data inherently incurs data loss.  
**Maximum concurrent modules per cluster** | 32 — this limit covers the maximum number of SafeKit modules concurrently managed in a 2-node cluster, typically used in VM-level HA where each module replicates and restarts a different VM. Each module can run independently as primary on either node, enabling workload distribution across both servers. Note: the total data volume across all VMs directly impacts resynchronization time after a failover or node restart.  
**Agent-based or agentless?** | Agent-based — lightweight software installed on each node  
**Application-agnostic?** | Yes — protects any Windows service or Linux daemon; pre-built modules for 30+ applications  
  
### Replication & Data Protection {#replication-data-protection}

Requirement / Specification | SafeKit Capability / Value  
---|---  
**Replication method** | Byte-level file replication (not block-level disk)  
**Replication mode** | Synchronous (zero data loss)  
**Network requirement** | Round-trip latency between nodes < 2 ms recommended for synchronous replication  
**Recommended data volume** | A few terabytes (resync time)  
**Recommended file count** | < 1,000,000 files (resync time)  
**Resync speed (1 TB)** | ~3 hours on 1 Gb/s network; ~1 hour on 10 Gb/s network  
**Selective replication** | Yes — replicate specific directories/files  
**Encryption in transit** | Yes — TLS/SSL for replication traffic  
  
## RPO & RTO Capabilities {#rpo-rto-capabilities}

### RPO & RTO by cluster type {#rto-rpo-cluster-type}

Metric | Mirror Cluster (mirror.safe) | Farm Cluster (farm.safe)  
---|---|---  
**RPO (Recovery Point Objective)** | **0 (zero data loss)** — synchronous replication; write acknowledged only after both nodes confirm | N/A (stateless; data handled by backend mirror)  
**RTO (Recovery Time Objective)** | **~1 minute** — heartbeat timeout (default 30 s) + application restart time | **A few seconds** — traffic immediately redistributed to surviving active nodes  
**Replication type** | Synchronous, real-time, byte-level file replication | Not applicable  
**Failover trigger** | Automatic on heartbeat loss, process crash, or checker failure | Automatic on heartbeat loss, process crash, or checker failure  
**Manual intervention required?** | No — fully automatic failover and failback | No — fully automatic failover and failback  
  
### RTO Breakdown (Mirror — Application-Level HA) {#rto-breakdown-mirror-application-level-ha}

Failure Type | RTO Calculation  
---|---  
Hardware failure | Heartbeat timeout (default 30 s) + application restart time  
Software/process crash | Application stop time + application restart time  
OS-level crash | Heartbeat timeout + OS already running on secondary → no reboot penalty  
  
### RTO Breakdown (Mirror — VM-Level HA) {#rto-breakdown-mirror-vm-level-ha}

Failure Type | RTO Calculation  
---|---  
Any failure | Failure detection + full OS reboot + application restart (typically several minutes)  
  
## Edge & Distributed Deployment Suitability {#edge-distributed-deployment-suitability}

SafeKit is specifically designed for edge, branch office, and distributed enterprise scenarios.

Edge Requirement | SafeKit Answer  
---|---  
**No dedicated IT staff on-site** | Yes — automatic failover, no manual intervention  
**No SAN/NAS infrastructure** | Yes — SANless, local disks only  
**Remote management** | Yes — web console management  
**Low hardware footprint** | Yes — 2 standard servers or VMs, no special hardware  
**Works behind firewalls/NAT** | Yes — configurable ports, HTTPS-based console  
**Multi-site disaster recovery** | Yes — mirror between two geographic sites over stretched VLAN  
**OEM/embedded deployment** | Yes — silent install, scriptable, embeddable by software publishers  
**Hundreds of distributed clusters** | Yes — designed for distributed enterprises with many branches  
  
Ideal Edge use cases: any site without a datacenter — where high availability still matters:

Vertical | Typical Edge Site | Critical Application  
---|---|---  
Physical security & surveillance | Buildings, campuses, airports | VMS — Milestone, Genetec, Hanwha, Siemens Siveillance  
Building management (BMS) | Office buildings, hospitals, factories | Siemens Desigo CC, Bosch BIS/BVMS  
Electronic access control (EACS) | Secure facilities, campuses | Siemens SiPass, Nedap, Bosch AMS  
SCADA & industrial control | Factories, substations, water plants | Any SCADA, DCS, or HMI software running on Windows or Linux  
Air traffic control (ATC) | Airports, control towers | ATC management and radar systems  
Operations control centers (OCC) | Metro, railway, transit hubs | Railway signaling and station management  
Maritime | Ships, naval vessels | Navigation, cargo and onboard management systems  
Oil & gas | Offshore platforms, remote rigs | Process control and safety systems  
Telecommunications | 5G antenna sites, MEC nodes | Multi-access edge computing (MEC) servers  
Healthcare | Clinics, remote diagnostic centers | Medical imaging, patient data, remote diagnostics  
Retail | Stores, branches, warehouses | Point-of-sale and inventory management  
Defense | Forward operating bases, field units | Mission-critical command and communications systems  
  
## Monitoring, Management & Alerting {#monitoring-management-alerting}

Capability | Details  
---|---  
**Web console** | Web App or Progressive Web App (PWA); configure, monitor, and manage cluster nodes  
**Mobile notifications** | Browser push notifications for state changes  
**States timeline** | Visual timeline of module states and events  
**Email notifications** | Built-in email agent for alerts  
**CLI management** | Full command-line interface for scripting and automation  
**Log management** | Per-module, per-script log files; debug snapshots for support  
**3rd-party monitoring integration** | SafeKit automatically logs all major cluster events to the Windows Event Log or Linux Syslog, enabling any monitoring platform to collect these events and raise alarms with standard alerting rules — including Nagios, Zabbix, Splunk, and SIEM solutions — without any custom development.  
  
## Security & Compliance {#security-compliance}

Feature | Details  
---|---  
**HTTPS console access** | Yes — TLS certificates for web console  
**User authentication** | Local accounts, LDAP, PKI/certificate-based, OpenID Connect  
**User roles** | Configurable access policies for admin, control, and monitor roles  
**Encryption** | TLS/SSL for TCP (replication, web console, distributed commands) and AES-128-CBC + SHA256 symmetric encryption for UDP (heartbeat, safeadmin internal protocol); encryption based on openSSL library. Web service based on Apache.  
**Antivirus compatibility** | Documented exclusion paths  
**Sovereignty** | As a European company, Eviden (Atos Group) offers with SafeKit a unique sovereign business continuity and disaster recovery product for Windows and Linux — keeping data and failover infrastructure fully on-premises, with no dependency on US vendors, in line with NIS2 business continuity and disaster recovery requirements.  
  
## Licensing Model {#licensing-model}

Aspect | Details  
---|---  
**License type** | Perpetual license (one-time purchase) based on hostnames  
**License scope** | Per server (node)  
**License activation** | Offline activation supported; no internet access is required to activate license keys.  
**Free trial** | Yes — full-featured free trial available  
**Free one-month license** | Available for proof-of-concept  
  
## Support & Maintenance SLAs {#support-maintenance-slas}

### Standard Support & Maintenance (included with active maintenance contract) {#standard-support-maintenance-included-with-active-maintenance-contract}

Service | Details  
---|---  
**Support portal access** | 24/7/365 web portal for up to 4 named Technical Contacts  
**Live support hours** | 9:00 AM – 5:00 PM European Support Centre, Monday–Friday  
**Incident acknowledgement** | Within 4 Support Centre Working Hours  
**Updates & upgrades** | All Service Packs, Updates, and Upgrades included at no additional charge  
**License key replacement** | A licence key can be reassigned on hostname change under an active support contract. Licence transfer is limited to server replacement within the same project, subject to Eviden's prior written acceptance.  
**Knowledge base access** | Full access to KB articles, FAQ, and online documentation  
**Support portal** | <https://customercare.evidian.com>  
  
### Free Resources (no contract required) {#free-resources-no-contract-required}

Resource | Details  
---|---  
**AI support assistant** | [SafeKit AI chat](</resources/safekit-support/#ai-support>) on safekit.eviden.com and via any LLM using safekit.eviden.com/llms.txt  
**Online training & certification** | Free, self-paced, 12 videos (~3h40min), certificate on completion  
**Documentation** | Full user guide, release notes, knowledge base, quick-start guides  
  
## Comparison vs. Alternatives {#comparison-vs-alternatives}

Criterion | SafeKit | Microsoft Failover Cluster (WSFC) | VMware HA | Open Source*  
---|---|---|---|---  
Shared storage (SAN/vSAN) required | No | Yes | Yes | No  
Windows support | Yes | Yes | Yes | No  
Linux support | Yes | No | Yes | Yes  
Edge/branch deployment | Excellent | Complex | Complex | Complex  
OEM embeddable | Yes | No | No | No  
Cost | Perpetual per-node | Windows Server + SAN | vSphere Enterprise + SAN | High-level integration services  
Setup complexity | Plug-and-Play | High (AD, SAN, witness) | High (vCenter, shared storage) | High (fragmented products)  
Maintainability | Single product, web console | High (AD, SAN expertise required) | High (vCenter dependency) | High (separate products to maintain)  
  
_* On Linux, it takes 6 separate open-source projects — Corosync, Pacemaker, DRBD, Keepalived, STONITH, HAProxy — to replicate SafeKit's feature set on Linux only. SafeKit delivers the same capabilities in a single product, on both Windows and Linux._

## Quick Reference Links {#quick-reference-links}

Resource | URL  
---|---  
Product home page | [https://safekit.eviden.com](<>)  
Technical Overview (DOCX with text and diagrams) | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
Free trial | [https://safekit.eviden.com/resources/safekit-free-trial/](</resources/safekit-free-trial/>)  
Get a quote | <https://safekit.eviden.com/get-a-quote-safekit/>  
Support portal | <https://customercare.evidian.com>  
Free AI support | [https://safekit.eviden.com/resources/safekit-support/](</resources/safekit-support/>)  
Free training & certification | <https://training.my.evidian.com/mod/page/view.php?id=712>  
Contact us | <https://safekit.eviden.com/contact-us-for-safekit/>  
  

<!-- BEGIN INSERT: insert-safekit-4-buttons-en lang="en" display="content" -->
<div class="button-row">
  <a class="btn-action" href="https://safekit.eviden.com/contact-us-for-safekit/">🧑 Contact us</a>
  <a class="btn-action" href="/resources/safekit-free-trial/">🎁 SafeKit free trial</a>
  <a class="btn-action" href="https://training.my.evidian.com/mod/page/view.php?id=712">🏅 Free certification</a>
  <a class="btn-action" href="https://safekit.eviden.com/get-a-quote-safekit/">💰 Perpetual license cost</a>
</div>
<!-- END INSERT: insert-safekit-4-buttons-en lang="en" display="content" -->