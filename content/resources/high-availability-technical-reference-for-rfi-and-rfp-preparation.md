---
title: "SafeKit Technical Reference for RFI and RFP Documents"
canonical: "https://safekit.eviden.com/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Find technical information about SafeKit to prepare requests for information (RFI) and requests for proposals (RFP). Learn about supported systems, architectures, recovery times, security, licensing, and support."
category: "resources"
lang: "en"
topics: "Overview, Table of contents, Product information, Supported operating systems and platforms, SafeKit High Availability Limitations, Preconfigured application modules, Architecture and deployment, Data loss and recovery times (RPO and RTO), Remote sites and distributed deployments, Monitoring and alerts, Security and compliance, Licensing, Support and maintenance, Comparison with other solutions, Useful links"
---

# SafeKit technical reference for RFI and RFP documents {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Overview {#overview}

Use this page to prepare a request for information (RFI) or a request for proposals (RFP). It answers common technical questions about SafeKit high availability software. The information helps procurement teams and solution architects define their requirements.

## Table of contents {#table-of-contents}

  1. [Product information](#product-identity)
  2. [Supported operating systems and platforms](#supported-operating-systems-platforms)
  3. [SafeKit High Availability Limitations](#safekit-ha-limitations)
  4. [Preconfigured application modules](#pre-built-application-modules)
  5. [Architecture and deployment](#architecture-deployment-model)
  6. [Data loss and recovery times (RPO and RTO)](#rpo-rto-capabilities)
  7. [Remote sites and distributed deployments](#edge-distributed-deployment-suitability)
  8. [Monitoring and alerts](#monitoring-management-alerting)
  9. [Security and compliance](#security-compliance)
  10. [Licensing](#licensing-model)
  11. [Support and maintenance](#support-maintenance-slas)
  12. [Comparison with other solutions](#comparison-vs-alternatives)
  13. [Useful links](#quick-reference-links)


## Product information {#product-identity}

Topic | Details  
---|---  
Product name | SafeKit  
Vendor | Eviden, part of the Atos Group. Formerly Evidian.  
Country of development | France  
Product category | Software for application clustering, high availability, and disaster recovery  
Current version | SafeKit 8.2  
Website | [https://safekit.eviden.com](/)  
First release | 2000. Used in production for more than 20 years.  
  
{{%  insert-supported-os-en  %}}

{{%  insert-safekit-usage-en  %}}

## Preconfigured application modules {#pre-built-application-modules}

SafeKit includes ready-to-use `.safe` modules. There are two ways to protect applications. **Application high availability** protects an application directly with a mirror or <span class="notranslate farm-term" translate="no">farm</span> module. **Virtual machine high availability** protects the entire virtual machine with a hyperv.safe or kvm.safe module.

Comparison criterion | Application high availability | Virtual machine high availability  
---|---|---  
Configuration | You must know which application services to restart and which folders to replicate. You must also configure the virtual IP address used for failover. | You only need to specify the location of the virtual machine files. You do not need to know how the applications inside the virtual machine work. This approach protects the applications and operating system together.  
Recommended use | Add high availability directly to a software solution, without depending on specific hardware or a specific hypervisor. | Manage several applications across multiple virtual machines with one high availability policy.  
  
The table below lists all available `.safe` modules:

Application high availability | Virtual machine high availability  
---|---  
New Windows app — mirror.safe | Hyper-V VM — hyperv.safe (Windows)  
New Linux app — mirror.safe | KVM VM — kvm.safe (Linux)  
Windows load balancing — farm.safe | Docker container — mirror.safe (Linux)  
Linux load balancing — farm.safe | Podman container — mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | K3s Kubernetes — k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows & Linux) | Bosch AMS — hyperv.safe (Windows)  
MySQL — mysql.safe (Windows & Linux) | Bosch BIS — hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows & Linux) | Bosch BVMS — hyperv.safe (Windows)  
Oracle — oracle.safe (Windows & Linux) | Hanwha Vision — hyperv.safe (Windows)  
Firebird — firebird.safe (Windows & Linux) | Hanwha Wisenet — hyperv.safe (Windows)  
Apache — apache_farm.safe (Windows & Linux) | Siemens Siveillance suite — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | Siemens Desigo CC — hyperv.safe (Windows)  
NGINX — farm.safe (Windows & Linux) | Siemens SiPass — hyperv.safe (Windows)  
Milestone XProtect — milestone.safe (Windows) | Siemens SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
Genetec (SQL Server) — sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
Siemens Siveillance VMS — SiveillanceVMS.safe (Windows) |   
Cloud (AWS, Azure, GCP, generic) — mirror.safe / farm.safe |   
  
## Architecture and deployment {#architecture-deployment-model}

### Two cluster modules: mirror.safe and farm.safe {#two-cluster-modules}

Module | Operating principle | Typical applications  
---|---|---  
mirror.safe | One server is active and the other is on standby. Files are replicated synchronously at byte level. Failover is automatic. | Databases, applications that store state, and services that run on only one server at a time  
farm.safe | Several servers are active at the same time. SafeKit distributes network traffic between them and handles failover automatically. | Web servers, stateless microservices, API gateways, and services that run on several servers at a time  
  
### Cluster infrastructure {#cluster-infrastructure-architecture}

Requirement | SafeKit capabilities  
---|---  
Shared storage required? | No. SafeKit uses local disks. It does not need a SAN or shared storage.  
Active Directory required? | No. SafeKit does not require a Windows domain or Active Directory. It also supports workgroups.  
Number of nodes in a cluster | 2 nodes (mirror) or 2+ nodes (<span class="notranslate farm-term" translate="no">farm</span>)  
Virtual IP address (VIP) | For application high availability, the virtual IP address moves automatically to the active node through Gratuitous ARP. For virtual machine high availability, traffic to the IP address inside the virtual machine is redirected automatically. No separate virtual IP address is needed. The nodes must share a LAN or a VLAN extended between sites.  
Architecture with three nodes | SafeKit runs a two-node mirror cluster on a LAN or a VLAN extended between sites. It provides synchronous replication with zero data loss (RPO=0) and automatic failover. A separate backup product replicates data asynchronously to a third node over a WAN. This backup allows recovery to an earlier point in time and provides protection against ransomware.  
Purpose of high availability | SafeKit replicates data synchronously to both nodes. This allows automatic failover without data loss after a hardware or software failure. However, logical errors, data corruption, and accidental deletions are also copied immediately to the standby node.  
Purpose of backups | Backups let you restore data from an earlier point in time. A separate backup product, not SafeKit, provides this protection through asynchronous replication. Backups help recover from ransomware and human error. This recovery is not automatic failover. Restoring an older backup loses changes made after that backup.  
Maximum modules running at the same time | A two-node cluster can manage up to 32 modules at the same time. For virtual machine protection, each module replicates and restarts a different virtual machine. Each module can be primary on either node, so both servers can share the workload. The total volume of data affects resynchronization time after failover or a node restart.  
Is software installed on each node? | Yes. A lightweight software is installed on each node.  
Supported applications | SafeKit can protect any Windows service or Linux daemon. Preconfigured modules are available for more than 30 applications.  
  
### Replication and data protection {#replication-data-protection}

Requirement | SafeKit capabilities  
---|---  
Replication method | SafeKit replicates file changes at byte level. It does not replicate disk blocks.  
Replication mode | Synchronous replication, with zero data loss  
Network requirement | A round-trip latency below 5 ms between nodes is recommended for synchronous replication.  
Recommended data volume | A few terabytes, to keep resynchronization time manageable  
Recommended file count | Fewer than 1,000,000 files, to keep resynchronization time manageable  
Resynchronization time for 1 TB | About 3 hours over a 1 Gb/s network or 1 hour over a 10 Gb/s network  
Selective replication | You can choose which directories and files to replicate.  
Encryption during transfer | Replication traffic is encrypted with TLS/SSL.  
  
## Data loss and recovery times (RPO and RTO) {#rpo-rto-capabilities}

### RPO and RTO for each cluster type {#rto-rpo-cluster-type}

Metric | Mirror (mirror.safe) | <span class="notranslate farm-term" translate="no">Farm</span> (farm.safe)  
---|---|---  
RPO (recovery point objective) | Zero data loss. A write operation is complete only when both nodes have written the data. | Not applicable to stateless services. The data is managed by a separate mirror cluster.  
RTO (recovery time objective) | About one minute. This includes the <span class="notranslate farm-term" translate="no">heartbeat</span> timeout (30 seconds by default) and the time to restart the application. | A few seconds. Traffic is redistributed to the remaining active nodes.  
Replication type | Synchronous, real-time, byte-level file replication | Not applicable  
Failover trigger | Failover starts automatically when <span class="notranslate farm-term" translate="no">heartbeat</span> messages stop, when a process crashes, or when a checker detects a failure | Failover starts automatically when <span class="notranslate farm-term" translate="no">heartbeat</span> messages stop, when a process crashes, or when a checker detects a failure  
Manual intervention required? | No. Failover and failback are automatic. | No. Failover and failback are automatic.  
  
### Recovery time for applications protected by a mirror cluster {#rto-breakdown-mirror-application-level-ha}

Failure type | How recovery time is calculated  
---|---  
Hardware failure | <span class="notranslate farm-term" translate="no">Heartbeat</span> timeout (30 seconds by default), followed by application restart  
Software or process crash | The time to stop the application, followed by application restart  
Operating system crash | The <span class="notranslate farm-term" translate="no">heartbeat</span> timeout, followed by application restart. The standby server does not need to reboot because its operating system is already running.  
  
### Recovery time for virtual machines protected by a mirror cluster {#rto-breakdown-mirror-vm-level-ha}

Failure type | How recovery time is calculated  
---|---  
All failure types | Time to detect the failure, reboot the virtual machine operating system, and restart the application. This usually takes several minutes.  
  
## Remote sites and distributed deployments {#edge-distributed-deployment-suitability}

SafeKit is designed for remote sites, branch offices, and organizations with many locations.

Requirement at a remote site | SafeKit capabilities  
---|---  
No dedicated IT staff on site | Failover is automatic and requires no manual action.  
No shared storage (SAN or NAS) | Only local disks are needed. Shared storage is not required.  
Remote management | Manage the cluster through a web console.  
Limited hardware | Two standard servers or virtual machines are enough. No special hardware is required.  
Firewalls and network address translation (NAT) | Ports can be configured. The web console uses HTTPS.  
Disaster recovery between sites | A mirror cluster can connect two sites through a VLAN extended between them.  
Integration by software publishers | Software publishers can include SafeKit in their products. Installation can run without user interaction and can be automated with scripts.  
Hundreds of SafeKit clusters across many sites | SafeKit is designed for organizations with many branches.  
  
The following sites need high availability even when they do not have a data center:

Industry | Typical site | Critical applications  
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
  
## Monitoring and alerts {#monitoring-management-alerting}

Feature | Details  
---|---  
Web console | Configure, monitor, and manage cluster nodes through a web application or a Progressive Web App (PWA).  
Mobile notifications | Receive browser notifications when a module changes state.  
Timeline | View module status changes and events in chronological order.  
Email notifications | A built-in email agent sends alerts.  
Command-line interface | Use the command-line interface to write scripts and automate tasks.  
Log management | Each module and script has its own log files. The support team uses module <span class="notranslate farm-term" translate="no">snapshots</span> to investigate problems.  
Integration with monitoring tools | SafeKit records major cluster events in the Windows Event Log or Linux Syslog. Monitoring tools can collect these events and trigger alerts with standard rules. This works with Nagios, Zabbix, Splunk, and SIEM tools without custom development.  
  
## Security and compliance {#security-compliance}

Feature | Details  
---|---  
HTTPS | The web console uses HTTPS with TLS certificates.  
User authentication | Local accounts, LDAP, certificates (PKI), and OpenID Connect  
User roles | Configure access policies for administration, control, and monitoring.  
Encryption | TCP traffic uses TLS/SSL for replication, the web console, and distributed commands. UDP traffic uses AES-128-CBC encryption with SHA256 for <span class="notranslate farm-term" translate="no">heartbeat</span> messages and for the internal safeadmin protocol. The OpenSSL library provides encryption. The web service runs on Apache.  
Antivirus | The documentation lists the paths to exclude from antivirus scans.  
Sovereignty | SafeKit is developed in France by Eviden, part of the Atos Group. It protects Windows and Linux applications while keeping your data and servers on your premises. SafeKit can help meet the requirements of the European NIS2 Directive for business continuity and disaster recovery.
  
## Licensing {#licensing-model}

Topic | Details  
---|---  
License type | A perpetual license is purchased once and is tied to a hostname.  
License scope | One license per server (node)  
License activation | License keys can be activated without internet access.  
Free trial | A free trial includes all features.  
Free one-month license | Available to test a proof of concept  
  
## Support and maintenance {#support-maintenance-slas}

### Standard support and maintenance with an active maintenance contract {#standard-support-maintenance-included-with-active-maintenance-contract}

Service | Details  
---|---  
Support portal access | The web portal is available at all times, every day of the year, for up to four named technical contacts.  
Live support hours | Monday to Friday, from 09:00 to 17:00, at the European Support Centre  
Incident acknowledgement | Within four working hours. Working hours are the live support hours of the Support Centre.  
Updates and upgrades | All service packs, updates, and upgrades are included at no extra charge.  
License key replacement | With an active support contract, a license key can be reassigned when a hostname changes. Transfer is limited to replacing a server within the same project. Prior written approval from Eviden is required.  
Knowledge base access | Full access to knowledge base articles, frequently asked questions, and online documentation  
Emergency procedure | SafeKit provides a wrapper script to start or stop an application without using SafeKit's high availability features. This script calls the application start and stop scripts. It also adds or removes the virtual IP address when needed.  
Support portal | <https://customercare.evidian.com>  
  
### Free resources without a support contract {#free-resources-no-contract-required}

Free resource | Details  
---|---  
AI assistant for support | Use [SafeKit AI chat](</resources/safekit-support/#ai-support>) on safekit.eviden.com.   
Online training and certification | [Learn at your own pace](/resources/safekit-on-line-training/) with free videos lasting about 4 hours in total. Receive a certificate when you complete the training.  
Documentation | User guide, release notes, knowledge base, and quick installation guides [here](/resources/safekit-free-trial/)  
  
## Comparison with other solutions {#comparison-vs-alternatives}

Criterion | SafeKit | Microsoft Failover Cluster (WSFC) | VMware HA | Open Source [1]  
---|---|---|---|---  
Shared storage (SAN/vSAN) required | No | Yes | Yes | No  
Windows support | Yes | Yes | Yes | No  
Linux support | Yes | No | Yes | Yes  
Deployment at remote sites | Excellent | Complex | Complex | Complex  
OEM | Yes | No | No | No  
Cost | Perpetual license per node | Windows Server and SAN | vSphere Enterprise and SAN | Advanced integration services  
Setup complexity | Low: one product to install and configure | High: Active Directory, SAN, and witness configuration | High: vCenter and shared storage configuration | High: several separate products to configure  
Administration | One product managed through a web console | High: requires Active Directory and SAN expertise | High: depends on vCenter | High: several separate products to maintain  
  
**[1]** On Linux, six separate open-source projects are needed to provide the same set of features: Corosync, Pacemaker, DRBD, Keepalived, STONITH, and HAProxy. SafeKit provides these features in one product for both Windows and Linux.

## Useful links {#quick-reference-links}

Link | URL  
---|---  
Product home page | [https://safekit.eviden.com](/)  
Technical overview (Word document with text and diagrams) | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
Free trial | [https://safekit.eviden.com/resources/safekit-free-trial/](</resources/safekit-free-trial/>)  
Get a quote | [https://safekit.eviden.com/safekit-pricing/](</safekit-pricing/>)  
Support portal | <https://customercare.evidian.com>  
Free AI support | [https://safekit.eviden.com/resources/safekit-support/](</resources/safekit-support/>)  
Free training and certification | [https://safekit.eviden.com/resources/safekit-on-line-training/](</resources/safekit-on-line-training/>)  
Contact us | [https://safekit.eviden.com/contact-us-for-safekit/](</contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-en  %}}