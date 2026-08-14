---
title: "PostgreSQL High Availability with SafeKit: Install the postgresql.safe Module for Failover"
slug: "safekit-quick-installation-guide-with-postgresql"
canonical: "https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-with-postgresql/"
description: "SafeKit Video: Application-Level Clustering (8:47) In this video, discover how SafeKit implements a mirror HA cluster without the complexity of a SAN. While this demonstration uses Microsoft SQL Server, the solution works identically for other databases and applications. Chapters 2 nodes with SQL Server (0:32) Configure the cluster and the mirror.safe module (3:58) Start and […]"
category: "quick-install"
lang: "en"
topics: "High Availability Quick Installation Guide for PostgreSQL, SafeKit High Availability Limitations, Overview of the SafeKit / PostgreSQL solution, Installation of the SafeKit / PostgreSQL solution on Windows and Linux (postgresql.safe), Step by step configuration of the SafeKit / PostgreSQL solution, Demonstration of the SafeKit mirror solution, 🔍 SafeKit High Availability Navigation Hub"
---

# PostgreSQL High Availability with SafeKit: Install the postgresql.safe Module for Failover


<!-- BEGIN INSERT: insert-safekit-mirror-guide-en lang="en" display="content" querystring="app=PostgreSQL&amp;mod=postgresql.safe" -->
 

## High Availability Quick Installation Guide for PostgreSQL {#quick-guide}

This guide explains how to set up a **mirror cluster** for PostgreSQL using SafeKit, ensuring automatic failover and synchronous replication without the need for shared storage. 

For help, you can use [SafeKit AI 🤖](</resources/safekit-support/>).

### 1\. Overview

  * **Architecture:** Uses a two-node system (Primary/Secondary).
  * **Data Protection:** Implements real-time synchronous replication for **zero data loss** (RPO=0).


### 2\. Installation

  * **Software:** Install the SafeKit engine on both servers.
  * **Module:** Download the pre-configured `postgresql.safe.safe` application module.


### 3\. Configuration

  * **Web Console:** Configure the specific folders containing the PostgreSQL files.
  * **Monitoring:** Start monitoring and protecting the PostgreSQL application.



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
 


<!-- END INSERT: insert-safekit-mirror-guide-en lang="en" display="content" querystring="app=PostgreSQL&amp;mod=postgresql.safe" -->
 

## Overview of the SafeKit / PostgreSQL solution

The solution is described here: **[The Simplest PostgreSQL High Availability: 2-Node Synchronous Replication& Failover](</solutions/postgresql-high-availability-synchronous-replication-failover/>)**.

## Installation of the SafeKit / PostgreSQL solution on Windows and Linux (postgresql.safe)

### Prerequisites

  * You need PostgreSQL installed on 2 nodes (virtual machines or physical servers).



<!-- BEGIN INSERT: insert-safekit-installation-package-windows-en lang="en" display="content" querystring="app=PostgreSQL&amp;mod=postgresql" -->
 

### Package installation on Windows

  * Download and install the free version of SafeKit on 2 Windows nodes.   
Note: the free version includes all SafeKit features. At the end of the trial, you can activate permanent license keys without uninstalling the package. 
  * Upon completing the package installation, select **Set console credentials and firewall rules now** and configure a password for the **admin** user of the SafeKit console.   
**Set the same password on all nodes.**
  * Exclude from antivirus scans **C:/safekit/** (the default installation directory) and **all replicated folders** that you are going to define.   
Antiviruses may face detection challenges with SafeKit due to its close integration with the OS, virtual IP mechanisms, real-time replication and restart of critical services. 


[ Download SafeKit (Windows) > ](</resources/safekit-free-trial/>)


<!-- END INSERT: insert-safekit-installation-package-windows-en lang="en" display="content" querystring="app=PostgreSQL&amp;mod=postgresql" -->
 


<!-- BEGIN INSERT: insert-safekit-82-installation-module-windows-en lang="en" display="content" querystring="app=PostgreSQL&amp;mod=postgresql" -->
 

### Module installation on Windows

  * Download the postgresql.safe module. The module is free. It contains the files userconfig.xml and the restart scripts.
  * Put **postgresql.safe** under **C:/safekit/Application_Modules/generic**.


<a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/postgresql.safe" download="postgresql.safe">⬇️ Download postgresql.safe (Windows) ></a> 


<!-- END INSERT: insert-safekit-82-installation-module-windows-en lang="en" display="content" querystring="app=PostgreSQL&amp;mod=postgresql" -->
 


<!-- BEGIN INSERT: insert-safekit-installation-package-linux-en lang="en" display="content" querystring="app=PostgreSQL&amp;mod=postgresql" -->
 

### Package installation on Linux

  * Install the free version of SafeKit on 2 Linux nodes. Note: the free trial includes all SafeKit features. At the end of the trial, you can activate permanent license keys without uninstalling the package.
  * After the download of safekit_xx.bin package, execute it to extract the rpm and the safekitinstall script and then execute the **safekitinstall** script
  * Answer **yes** to firewall automatic configuration
  * Set the password for the web console and the default user **admin**. **Set the same password on all nodes.**


[ Download SafeKit (Linux) > ](</resources/safekit-free-trial/>)


<!-- END INSERT: insert-safekit-installation-package-linux-en lang="en" display="content" querystring="app=PostgreSQL&amp;mod=postgresql" -->
 


<!-- BEGIN INSERT: insert-safekit-82-installation-module-linux-en lang="en" display="content" querystring="app=PostgreSQL&amp;mod=postgresql" -->
 

### Module installation on Linux

  * Download the postgresql.safe module.   
The module is free. It contains the files userconfig.xml and the restart scripts. 
  * Put **postgresql.safe** under **/opt/safekit/Application_Modules/generic/**.


<a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/postgresql.safe" download="postgresql.safe">⬇️ Download postgresql.safe (Linux) ></a> 


<!-- END INSERT: insert-safekit-82-installation-module-linux-en lang="en" display="content" querystring="app=PostgreSQL&amp;mod=postgresql" -->
 

## Step by step configuration of the SafeKit / PostgreSQL solution


<!-- BEGIN INSERT: insert-safekit-82-configuration-en lang="en" display="content" querystring="app=PostgreSQL&amp;mod=postgresql" -->
 

### Prerequisites

  * PostgreSQL application installed on 2 nodes.
  * Total replicated data limited to a few terabytes — beyond this, resynchronization time becomes significant.
  * Minimum 1Gb/s interconnect between nodes (10Gb/s recommended for faster resynchronization).
  * IP failover requires both nodes on the same LAN or extended LAN (L2) — routed L3 networks not supported (except with [cloud load balancers](</resources/safekit-user-guide-82/#Cloud>)).


### 1\. Launch the SafeKit console

  * Launch the web console in a browser on one cluster node by connecting to `http://localhost:9010`.
  * Enter `admin` as user name and the password defined during installation.


You can also run the console in a browser on a workstation external to the cluster.


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>The configuration of SafeKit is done on both nodes from a single browser.</span></div>


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>To secure the web console, see <a href="/resources/safekit-user-guide-82/#https">11. Securing the SafeKit web service</a> in the User's Guide.</span></div>


<img src="/wp-content/uploads/2024/03/01-login-large.png" alt="Start the SafeKit web console to configure the PostgreSQL cluster">


### 2\. Configure node addresses

  * Enter the node IP addresses, press the `Tab key` to check connectivity and fill node names. If either node1 or node2 has a red color, check connectivity of the browser to both nodes and check firewall on both nodes for [troubleshooting](</resources/safekit-user-guide-82/#Troubleshooting>).
  * Then, click on `Save and apply` to save the configuration.
  * Check the `Success` ✅ message on both nodes.
  * If the configuration `Failure` ❌ occurs on one node, open the ▼ accordion for that node and review the messages. Note that you can use the SafeKit AI 🤖 for assistance.


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>If you want, you can add a new `LAN and nodes` ( first ➕) to create a second heartbeat and a dedicated replication network.</span></div>


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>If you click on `Advanced configuration`, the `cluster.xml` file is displayed. This file is automatically populated by the console and deployed on the nodes.</span></div>


<img src="/wp-content/uploads/2024/03/02-cluster-edit.png" alt="Enter the nodes of the PostgreSQL cluster">


### 3\. Select a module

  * In `New module`, click on the `postgresql.safe` module.


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>In the blue banner at the top, 🛜 `node1` represents the console connection node. This node relays requests to `node2` when required.</span></div>


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>The console looks for `xxx.safe` in the `Application_Modules/generic/` directory on the connection node (`node1`) if you placed a module there during installation.</span></div>


<img src="/wp-content/uploads/2024/03/04-module-new.png" alt="Choose the module for PostgreSQL">


### 4\. Configure the module

  * In `Module startup at boot`, choose an automatic start of the module at boot without delay.
  * In `Macros` / `SERVICES`, enter the service names of your application, in the startup order, separated by commas. See this screenshot for a visual example of [Milestone XProtect services 🖼️](</wp-content/uploads/2025/05/milestone-services.png>).
  * In `Heartbeat networks`, you should have a single heartbeat network on which the replication is made. If you have added a private LAN at step 2, then you can configure two heartbeats with the replication flow on the private LAN.
  * In `Virtual IP addresses`, enter a virtual IP address. A virtual IP address is a standard IP address in the same IP network (same subnet) as the IP addresses of both nodes.  
Application clients must be configured with the virtual IP address (or the DNS name associated with the virtual IP address).  
The virtual IP address is automatically switched in the event of a failure.
  * In `Replicated directories`, set the paths of directories to replicate. Check that they exist on both nodes and contain the application data.  
Data and log replication are essential for a database.  
You can create additional replicated directories as required.  
See this screenshot for a visual example of [Milestone XProtect SQL replication 🖼️](</wp-content/uploads/2025/05/milestone-replication.png>).
  * In `Checkers`, you will be able to configure checkers if needed, such as process monitoring, custom checkers, TCP, ping, or split-brain checkers.  
For example, if a process name is displayed in `Monitored processes/services`, it will be monitored with a restart action in case of failure. Configuring a wrong process name will cause the module to stop right after its start.


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>If you click on `Advanced configuration`, the `userconfig.xml` file is displayed. This file is automatically populated by the console and deployed on the nodes with the restart scripts.</span></div>


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>In a cloud deployment, you do not need to configure a virtual IP address in SafeKit. The virtual IP is managed at the <a href="/resources/safekit-user-guide-82/#Cloud">cloud load balancer level</a>.</span></div>


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>When you apply the SafeKit configuration, the `startup type` of services is automatically set to `Manual` in Windows services. This ensures that services do not start automatically when the system boots, but are instead started only when the module itself is started (the same applies on Linux).</span></div>


<img src="/wp-content/uploads/2025/05/05-module-mirror-edit-config-3.png" alt="Enter the PostgreSQL module settings">


### 5\. Edit scripts (optional)

  * This step is optional and can be skipped in most cases, as the restart scripts are already pre-configured to restart services defined in the previous step.
  * So, click directly on `Next step`.
  * `start_prim.ps1` starts all services in the order specified in the `SERVICES` list, while `stop_prim.ps1` stops all services in the reverse order.
  * Additionally, `start_prim.ps1` checks the startup of each service and stops the module if any service fails to start correctly.


<img src="/wp-content/uploads/2025/05/28-module-sqlserver-edit-script-3.png" alt="Enter the PostgreSQL module settings">


### 6\. Communication encryption (optional)

  * Keep encryption of communication between nodes.


<img src="/wp-content/uploads/2025/05/07-module-encryption-1.png" alt="Communication encryption of the PostgreSQL module">


### 7\. Save and apply

  * `Save and apply` the configuration and scripts on both nodes.


<img src="/wp-content/uploads/2025/05/08-module-save-1.png" alt="Save and apply the PostgreSQL module configuration">


### 8\. Verify successful configuration

  * Check the `Success` ✅ message on both nodes and click on `Monitor modules`.
  * If the configuration `Failure` ❌ occurs on one node, open the ▼ accordion for that node and review the messages. Note that you can use the SafeKit AI 🤖 for assistance.


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>On Linux, you may get an error at this step if the replicated directories are mount points. <a href="https://github.com/FR-LES-SAFEKIT-DEV/safekit-packages/releases/download/v8.2/SafeKit_8.2_Knowledge_Base.pdf">See SK-0030 to solve the problem</a>.</span></div>


<img src="/wp-content/uploads/2025/05/09-module-save-check-1.png" alt="Check the PostgreSQL module configuration success">


### 9\. Start the node with up-to-date data

  * If node 1 has the up-to-date replicated directories, select it and ⋯ `Force start` ▶ `As primary`.


When node 2 will be started, all data will be copied from node 1 to node 2.


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If you make the wrong choice, you run the risk of synchronizing outdated data on both nodes.</span></div>


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>It is also assumed that the PostgreSQL application is stopped on node 1 so that SafeKit installs the replication mechanisms and then starts the application in the `start_prim` script.</span></div>


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>Use `Start` for subsequent starts: SafeKit retains the most up-to-date server. Starting `As primary` is a special start-up the first time or during exceptional operations.</span></div>


<img src="/wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png" alt="Start as primary the PostgreSQL node with the up-to-date data">


### 10\. Wait for the transition to ALONE (green)

  * Node 1 should reach the ALONE (green) state, which means that the virtual IP is set and that the `start_prim` script has been executed on node 1.


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If ALONE (green) is not reached or if the application is not started, analyze why with the <a href="/wp-content/uploads/2024/03/24-module-log-script.png">module log 🖼️</a> of node 1.</span></div>

  * Click the 🔍 **log** icon of `node1` to open the module log and look for error messages such as a checker detecting an error and stopping the module.
  * Click on `start_prim` in the log: output messages of the script are displayed on the right and errors can be detected such as a service incorrectly started.
  * Use the SafeKit AI 🤖 for assistance with log messages.


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If the cluster is in `WAIT (red) not uptodate, STOP (red) not uptodate` state, stop the WAIT node and <a href="/wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png">force its start as primary 🖼️</a>.</span></div>


<img src="/wp-content/uploads/2024/03/12-monitoring-alone-stop.png" alt="The first PostgreSQL node starts as primary and becomes ALONE">


### 11\. Start node 2

  * ⋯ `Start` node 2 with its contextual menu.
  * Wait for the SECOND (green) state.


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>Node 2 stays in the SECOND (orange) state while resynchronizing the replicated directories (copy from node 1 to node 2).</span></div>

This may take a while depending on the size of files to resynchronize in replicated directories and the network bandwidth.

To see the progress of the copy, see the [module log 🖼️](</wp-content/uploads/2024/03/27-module-log-reintegration.png>) and the [replication resources 🖼️](</wp-content/uploads/2024/03/26-replication-resources-reintegration.png>) of node 2. Use the SafeKit AI 🤖 for assistance with log messages.


<img src="/wp-content/uploads/2024/03/13-monitoring-alone-stop-start.png" alt="Start the PostgreSQL node 2">


### 12\. Verify that the cluster is operational

  * Check that the cluster is green/green with PostgreSQL services running on the PRIM node and not running on the SECOND node.


Only changes inside files are replicated in real time in this state.


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>Components that are clients of PostgreSQL services must be configured with the virtual IP address. The configuration can be done with a DNS name (if a DNS name has been created and associated with the virtual IP address).</span></div>


<img src="/wp-content/uploads/2024/03/14-monitoring-prim-second.png" alt="The PostgreSQL node 2 is SECOND (green)">


### 13\. Testing

  * Stop the PRIM node by scrolling down its contextual menu and clicking `Stop`.
  * Verify that there is a failover on the SECOND node which should become ALONE (green).
  * And with Microsoft Management Console (MMC) on Windows or with command lines on Linux, check the failover of PostgreSQL services (stopped on node 1 in the `stop_prim` script and started on node 2 in the `start_prim` script).


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If ALONE (green) is not reached on node2 or if the application is not started, analyze why with the <a href="/wp-content/uploads/2024/03/38-module-log-script-second.png">module log 🖼️</a> of node 2.</span></div>

  * Click the 🔍 **log** icon of `node2` to open the module log and look for error messages such as a checker detecting an error and stopping the module.
  * Click on `start_prim` in the log: output messages of the script are displayed on the right and errors can be detected such as a service incorrectly started.
  * Use the SafeKit AI 🤖 for assistance with log messages.


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If everything is okay, initiate a start on node1, which will resynchronize the replicated directories from node2.</span></div>

If things go wrong, stop node2 and [force the start as primary 🖼️](</wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png>) of node1, which will restart with its locally healthy data at the time of the stop.


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>Find more details, along with videos, in the <a href="/resources/safekit-on-line-training/">SafeKit Online Training</a>.</span></div>


<img src="/wp-content/uploads/2024/03/16-monitoring-prim-second-stop.png" alt="Stop the PostgreSQL module on the PRIM server">


### 14\. Support

  * For getting support, take 2 SafeKit `Snapshots` (2 .zip files), one for each node.


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span><a href="/resources/safekit-support/">More information on the support here</a>.</span></div>


<img src="/wp-content/uploads/2024/03/30-snapshots-mirror.png" alt="Take the PostgreSQL snaphots for support">



<!-- END INSERT: insert-safekit-82-configuration-en lang="en" display="content" querystring="app=PostgreSQL&amp;mod=postgresql" -->
 

## Demonstration of the SafeKit mirror solution


<!-- BEGIN INSERT: insert-safekit-mirror-video-en lang="en" display="content" -->
 

### SafeKit Video: Application-Level Clustering (8:47) {#demo-mirror-ha-cluster}

In this video, discover how SafeKit implements a **mirror HA cluster** without the complexity of a SAN. While this demonstration uses Microsoft SQL Server, the solution works identically for other databases and applications. 

### Chapters

  1. [2 nodes with SQL Server](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. [Configure the cluster and the mirror.safe module](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. [Start and test SQL replication, migration, failover on crash](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)


### Step-by-Step Implementation

  * [Read the guide on setting up a mirrored cluster on Windows](</quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/>)
  * [Read the guide on setting up a mirrored cluster on Linux](</quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover/>)


&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 


<!-- END INSERT: insert-safekit-mirror-video-en lang="en" display="content" -->
 


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