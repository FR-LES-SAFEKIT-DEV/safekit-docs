---
title: "Edge High Availability Without a Data Center: SafeKit for OT and Distributed Sites"
canonical: "https://safekit.eviden.com/use-cases/edge-high-availability-without-a-data-center-safekit-for-ot-distributed-sites/"
description: "Edge computing sites have no data center, but they still need high availability. SafeKit turns two standard servers into a plug-and-play high availability cluster. It requires no SAN and no IT staff, and failover is automatic."
category: "use-cases"
lang: "en"
topics: "The high availability challenge at the edge, Why SafeKit is the natural fit for edge computing, Edge and distributed deployment suitability, Why edge OT environments are different, Ideal use cases at the edge, Edge vs. data center high availability: key differences, Supported operating systems and platforms, 🔍 Explore SafeKit"
---

# Edge High Availability Without a Data Center: SafeKit for OT and Distributed Sites {#edge-high-availability-without-a-data-center-safekit-for-ot--distributed-sites}

## The high availability challenge at the edge {#the-edge-ha-challenge}

Edge computing sites often have no data center and no high availability expertise. Yet business continuity is critical for them. A factory floor, an offshore oil platform, a hospital clinic, a retail store, or a 5G antenna site cannot afford downtime. But these sites cannot justify the cost and complexity of a traditional data center cluster.

Traditional high availability solutions, such as Microsoft Failover Cluster (WSFC), Pacemaker with Corosync, or VMware HA, were designed for data centers. They require shared storage (SAN or NAS), dedicated cluster hardware, permanent IT staff, and complex operating system expertise. None of these exist at the edge.

SafeKit was built for exactly this gap. It keeps edge applications running in factories, oil platforms, ships, building security, air traffic control, 5G networks, healthcare, retail, and more. It needs only two standard servers connected by a LAN.


![SafeKit for edge computing](/wp-content/uploads/2026/05/safekit-edge-512-512.jpg)


## Why SafeKit is the natural fit for edge computing {#what-makes-safekit-the-natural-fit-for-edge}

SafeKit turns two standard edge servers into a plug-and-play high availability cluster. The servers can be of any brand, physical or virtual. There is no shared storage, no SAN, and no special hardware. One lightweight software package delivers the following features:

  * **Real-time synchronous file replication.** Data is mirrored at byte level to the standby server at write time.
  * **Automatic failover.** If the primary server fails, the standby server takes over within seconds, without human intervention.
  * **Optional network load balancing.** In active-active deployments, both servers share the workload.
  * **Web console.** Management is browser-based and remotely accessible over HTTPS. It requires no on-site expertise.
  * **Silent, scriptable installation.** It is suitable for mass deployment across hundreds of distributed sites and for embedding in OEM products.


You do not need to buy a SAN. You do not need a Windows Server Datacenter license either. You do not need Linux cluster expertise or dedicated cluster hardware. The entire high availability stack is a single software package.

## Edge and distributed deployment suitability {#edge--distributed-deployment-suitability}

SafeKit is specifically designed for edge computing, branch offices, and distributed enterprises:

Edge computing requirement | SafeKit solution  
---|---  
No dedicated IT staff on site | Automatic failover with no manual intervention  
No SAN or NAS infrastructure | Architecture with local disks only and no SAN  
Remote management | Web console accessible over HTTPS from any browser  
Low hardware footprint | Two standard servers or VMs with no special hardware  
Works behind firewalls and NAT | Configurable ports and HTTPS-based console  
Multi-site disaster recovery | Real-time replication with the mirror module between two geographic sites over a stretched VLAN  
Isolated or offline networks | No internet dependency and fully self-contained  
OEM or embedded deployment | Silent and scriptable installation that software vendors can embed  
Hundreds of distributed clusters | Designed for distributed enterprises with many branch offices  
  
## Why edge OT environments are different {#why-edge-ot-environments-are-different}

Operational technology (OT) environments include SCADA, building management systems (BMS), physical security, and industrial control. Their requirements differ fundamentally from IT data centers:

  * **No IT staff on site.** A substation, a remote pump station, or a ship has no system administrator. High availability must be self-managing.
  * **Isolated or constrained networks.** Many OT sites have no internet access and limited WAN bandwidth. High availability software must work fully offline.
  * **24/7 uptime and zero tolerance for complexity.** Stopping a production line, losing video surveillance, or interrupting access control costs far more than the high availability software itself.
  * **Long equipment lifecycles.** OT servers may run for 10 to 15 years. The high availability solution must be stable and low-maintenance, and it must not require constant updates.
  * **Standard x86 hardware only.** A remote industrial site has no budget or justification for a SAN or dedicated cluster nodes.
  * **No tolerance for operating system complexity.** Traditional cluster software requires cluster expertise. OT operators do not have this expertise and should not need it.


The SafeKit model directly addresses every one of these constraints: no SAN, two servers, and automatic failover.

## Ideal use cases at the edge {#ideal-edge-use-cases}

SafeKit fits any site without a data center where high availability still matters:

Industry | Typical edge site | Critical application  
---|---|---  
Physical security and surveillance | Buildings, campuses, airports | VMS: Milestone, Genetec, Hanwha, Siemens Siveillance  
Building management (BMS) | Office buildings, hospitals, factories | Siemens Desigo CC, Bosch BIS/BVMS  
Electronic access control (EACS) | Secure facilities, campuses | Siemens SiPass, Nedap, Bosch AMS, Hirsch MicroSesame  
SCADA and industrial control | Factories, substations, water plants | Any SCADA, DCS, or HMI software on Windows or Linux  
Air traffic control (ATC) | Airports, control towers | Air traffic management and radar systems  
Operations control centers (OCC) | Metro, railway, transit hubs | Railway signaling and station management  
Maritime | Ships, naval vessels | Navigation, cargo, and onboard management systems  
Oil and gas | Offshore platforms, remote rigs | Process control and safety systems  
Telecommunications | 5G antenna sites, MEC nodes | Multi-access edge computing (MEC) servers  
Healthcare | Clinics, remote diagnostic centers | Medical imaging, patient data, remote diagnostics  
Retail | Stores, branches, warehouses | Point-of-sale and inventory management  
Military and defense | Forward operating bases, field units | Mission-critical command and communications systems  
  
## Edge vs. data center high availability: key differences {#edge-vs-data-center-ha-key-differences}

Criterion | Data center high availability (WSFC, Pacemaker, VMware HA) | SafeKit high availability at the edge  
---|---|---  
Storage | Requires shared storage (SAN or NAS) | SANless, with local disks only  
Hardware | Dedicated cluster nodes, host bus adapters (HBAs), and switches | Two standard x86 servers of any brand  
Operating system expertise | Windows Server Datacenter or Linux cluster skills | Standard Windows or Linux administration skills  
On-site staff | Required for setup and intervention | Not required, because failover is fully automatic  
Internet or cloud dependency | Often cloud-managed | Works on fully isolated networks  
Deployment scale | Single data center | Hundreds of distributed sites  
License cost | High (Datacenter OS and SAN licenses) | One affordable software license per cluster  
  
{{%  insert-supported-os-en  %}}

For full technical specifications, sizing constraints, and procurement criteria, read the 📘 [RFI and RFP technical reference](</resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/>).


{{%  insert-safekit-hub-en  %}}

{{%  insert-safekit-4-buttons-en  %}}