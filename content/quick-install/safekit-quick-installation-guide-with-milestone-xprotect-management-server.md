---
title: "Milestone XProtect High Availability with SafeKit: Install the milestone.safe Module for Failover"
slug: "safekit-quick-installation-guide-with-milestone-xprotect-management-server"
canonical: "https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server/"
description: "SafeKit Video: Application-Level Clustering (8:47) In this video, discover how SafeKit implements a mirror HA cluster without the complexity of a SAN. While this demonstration uses Microsoft SQL Server, the solution works identically for other databases and applications. Chapters 2 nodes with SQL Server (0:32) Configure the cluster and the mirror.safe module (3:58) Start and […]"
category: "quick-install"
lang: "en"
topics: "High Availability Quick Installation Guide for Milestone XProtect, SafeKit High Availability Limitations, Overview of the SafeKit / Milestone XProtect solution, Installation of the SafeKit / Milestone XProtect solution on Windows (milestone.safe), Step by step configuration of the SafeKit / Milestone XProtect solution, Demonstration of the SafeKit mirror solution, 🔍 SafeKit High Availability Navigation Hub"
---

# Milestone XProtect High Availability with SafeKit: Install the milestone.safe Module for Failover


<!-- BEGIN INSERT: insert-safekit-mirror-guide-en lang="en" display="content" querystring="app=Milestone XProtect&amp;mod=milestone" -->
 

## High Availability Quick Installation Guide for Milestone XProtect {#quick-guide}

This guide explains how to set up a **mirror cluster** for Milestone XProtect using SafeKit, ensuring automatic failover and synchronous replication without the need for shared storage. 

For help, you can use [SafeKit AI 🤖](</safekit-docs/resources/safekit-support/>).

### 1\. Overview

  * **Architecture:** Uses a two-node system (Primary/Secondary).
  * **Data Protection:** Implements real-time synchronous replication for **zero data loss** (RPO=0).


### 2\. Installation

  * **Software:** Install the SafeKit engine on both servers.
  * **Module:** Download the pre-configured `milestone.safe` application module.


### 3\. Configuration

  * **Web Console:** Configure the specific folders containing the Milestone XProtect files.
  * **Monitoring:** Start monitoring and protecting the Milestone XProtect application.



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
 


<!-- END INSERT: insert-safekit-mirror-guide-en lang="en" display="content" querystring="app=Milestone XProtect&amp;mod=milestone" -->
 

## Overview of the SafeKit / Milestone XProtect solution

The solution is described here: **[The Simplest Milestone XProtect High Availability: 2-Node Synchronous Replication& Failover](</safekit-docs/solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/>)**.

## Installation of the SafeKit / Milestone XProtect solution on Windows (milestone.safe)

### Prerequisites

  * You need Milestone XProtect Management and SQL installed on 2 nodes (virtual machines or physical servers). SQL Server and Event Srver can be external, see the notes below.


<div class="callout"><img src="/safekit-docs/wp-content/uploads/2022/07/note.png" alt="Note"><span>Note: SQL Server can be external. In this case, at step 4 during the step by step configuration of milestone.safe:</span></div>

  * remove the replication of SQL Data and Log folders,
  * remove the process checker on sqlservr.exe,
  * remove MSSQLServer from the macro SERVICES.


You can implement redundancy of the external SQL Server with [SafeKit and the sqlserver.safe module](</safekit-docs/solutions/sql-server-high-availability-synchronous-replication-failover/>).

In this case on both management nodes, configure the [connection of Milestone Management to SQL](<https://doc.milestonesys.com/en-US/bundle/doc1040_2026r1/page/content/standard_features/sf_mc/sf_maintenance/mc_managingthesqlserver.htm>) with the virtual IP address of the sqlserver.safe module (registry key HKEY_LOCAL_MACHINESOFTWAREVideoOSServerConnectionString).


<div class="callout"><img src="/safekit-docs/wp-content/uploads/2022/07/note.png" alt="Note"><span>Note: The Event server can be external to the Management server.</span></div>

In this case, you have 2 clusters with 2 installations of milestone.safe: one for the Management cluster, the other one for the Event cluster.

For the Management cluster, at step 4 during the step by step configuration of milestone.safe:

  * remove MilestoneEventServerService from the SERVICES macro.


And for the Event cluster, at step 4 during the step by step configuration of milestone.safe:

  * remove from the SERVICES macro: MSSQLServer, Milestone XProtect Management Server, Milestone XProtect Log Server,
  * remove the replication of SQL Data and Log folders,
  * remove the process checker on sqlservr.exe,
  * during the step-by-step configuration, [register](</safekit-docs/wp-content/uploads/2022/07/milestone-management-server-register-2020.png>) the Event server with the virtual IP address of the **Management cluster** (or install the Event server from the Download Manager and set the virtual IP address of the **Management cluster** during the installation),
  * in the Milestone management client, set the Event Server with the virtual IP address of the **Event cluster** in the [Registered Services](</safekit-docs/wp-content/uploads/2022/07/milestone-url-vip.png>).


<div class="callout"><img src="/safekit-docs/wp-content/uploads/2022/07/note.png" alt="Note"><span>### Recorder redundancy</span></div>

  * Replication of recorders is not suitable for SafeKit due to the volume of data.
  * The solution integrated into Milestone can be used (failover recording server without real-time replication).
  * Two recorders can also run in an active/active configuration and the cameras are distributed so as not to lose all the cameras in the same area in the event of a failure.
  * The stream from each camera can also be sent to two recorders with the [Vega / RMF](<https://vega25.com/>) solution.


<div class="callout"><img src="/safekit-docs/wp-content/uploads/2022/07/note.png" alt="Note"><span>In case of migration of Milestone from version N to version N+1 in a SafeKit cluster, read this article: <a href="/safekit-docs/quick-install/safekit-quick-installation-guide-milestone-migration/">Milestone Management Migration with SafeKit</a></span></div>


<!-- BEGIN INSERT: insert-safekit-installation-package-windows-en lang="en" display="content" querystring="app=Milestone XProtect and SQL&amp;mod=milestone" -->
 

### Package installation on Windows

  * Download and install the free version of SafeKit on 2 Windows nodes.   
Note: the free version includes all SafeKit features. At the end of the trial, you can activate permanent license keys without uninstalling the package. 
  * Upon completing the package installation, select **Set console credentials and firewall rules now** and configure a password for the **admin** user of the SafeKit console.   
**Set the same password on all nodes.**
  * Exclude from antivirus scans **C:/safekit/** (the default installation directory) and **all replicated folders** that you are going to define.   
Antiviruses may face detection challenges with SafeKit due to its close integration with the OS, virtual IP mechanisms, real-time replication and restart of critical services. 


[ Download SafeKit (Windows) > ](</safekit-docs/resources/safekit-free-trial/>)


<!-- END INSERT: insert-safekit-installation-package-windows-en lang="en" display="content" querystring="app=Milestone XProtect and SQL&amp;mod=milestone" -->
 


<!-- BEGIN INSERT: insert-safekit-82-installation-module-windows-en lang="en" display="content" querystring="app=Milestone XProtect and SQL&amp;mod=milestone" -->
 

### Module installation on Windows

  * Download the milestone.safe module. The module is free. It contains the files userconfig.xml and the restart scripts.
  * Put **milestone.safe** under **C:/safekit/Application_Modules/generic**.


<a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_windows/milestone.safe" download="milestone.safe">⬇️ Download milestone.safe (Windows) ></a> 


<!-- END INSERT: insert-safekit-82-installation-module-windows-en lang="en" display="content" querystring="app=Milestone XProtect and SQL&amp;mod=milestone" -->
 

## Step by step configuration of the SafeKit / Milestone XProtect solution


<!-- BEGIN INSERT: insert-safekit-82-milestone-configuration-en lang="en" display="content" querystring="app=Milestone XProtect and SQL&amp;mod=milestone" -->
 

### Prerequisites

  * Milestone XProtect and SQL application installed on 2 nodes.
  * Total replicated data limited to a few terabytes — beyond this, resynchronization time becomes significant.
  * Minimum 1Gb/s interconnect between nodes (10Gb/s recommended for faster resynchronization).
  * IP failover requires both nodes on the same LAN or extended LAN (L2) — routed L3 networks not supported.


<div class="callout callout-warning"><img src="/safekit-docs/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>This configuration requires **at least Milestone XProtect 2023 R3**. For previous versions, please <a href="/safekit-docs/quick-install/safekit-quick-installation-guide-old-milestone-configuration/">see this article</a>.</span></div>

### 1\. Launch the SafeKit console

  * Launch the web console in a browser on one cluster node by connecting to `http://localhost:9010`.
  * Enter `admin` as user name and the password defined during installation.


You can also run the console in a browser on a workstation external to the cluster.


<div class="callout callout-warning"><img src="/safekit-docs/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>The configuration of SafeKit is done on both nodes from a single browser.</span></div>


<div class="callout"><img src="/safekit-docs/wp-content/uploads/2022/07/note.png" alt="Note"><span>To secure the web console, see <a href="/safekit-docs/resources/safekit-user-guide-82/#https">11. Securing the SafeKit web service</a> in the User's Guide.</span></div>


<img src="/safekit-docs/wp-content/uploads/2024/03/01-login-large.png" alt="Start the SafeKit web console to configure the Milestone XProtect and SQL cluster">


### 2\. Configure node addresses

  * Enter the node IP addresses, press the `Tab key` to check connectivity and fill node names. If either node1 or node2 has a red color, check connectivity of the browser to both nodes and check firewall on both nodes for [troubleshooting](</safekit-docs/resources/safekit-user-guide-82/#Troubleshooting>).
  * Then, click on `Save and apply` to save the configuration.
  * Check the `Success` ✅ message on both nodes.
  * If the configuration `Failure` ❌ occurs on one node, open the ▼ accordion for that node and review the messages. Note that you can use the SafeKit AI 🤖 for assistance.


<div class="callout"><img src="/safekit-docs/wp-content/uploads/2022/07/note.png" alt="Note"><span>If you want, you can add a new `LAN and nodes` ( first ➕) to create a second heartbeat and a dedicated replication network.</span></div>


<div class="callout"><img src="/safekit-docs/wp-content/uploads/2022/07/note.png" alt="Note"><span>If you click on `Advanced configuration`, the `cluster.xml` file is displayed. This file is automatically populated by the console and deployed on the nodes.</span></div>


<img src="/safekit-docs/wp-content/uploads/2024/03/02-cluster-edit.png" alt="Enter the nodes of the Milestone XProtect and SQL cluster">


### 3\. Select a module

  * In `New module`, click on the `milestone.safe` module.


<div class="callout"><img src="/safekit-docs/wp-content/uploads/2022/07/note.png" alt="Note"><span>In the blue banner at the top, 🛜 `node1` represents the console connection node. This node relays requests to `node2` when required.</span></div>


<div class="callout"><img src="/safekit-docs/wp-content/uploads/2022/07/note.png" alt="Note"><span>The console looks for `xxx.safe` in the `Application_Modules/generic/` directory on the connection node (`node1`) if you placed a module there during installation.</span></div>


<img src="/safekit-docs/wp-content/uploads/2024/03/04-module-new.png" alt="Choose the module for Milestone XProtect and SQL">


### 4\. Configure the module

  * In `Module startup at boot`, choose an automatic start of the module at boot without delay.
  * In `Macros` / `SERVICES`, enter the service names of your application, in the startup order, separated by commas. See this screenshot for a visual example of [Milestone XProtect services 🖼️](</safekit-docs/wp-content/uploads/2025/05/milestone-services.png>).
  * In `Heartbeat networks`, you should have a single heartbeat network on which the replication is made. If you have added a private LAN at step 2, then you can configure two heartbeats with the replication flow on the private LAN.
  * In `Virtual IP addresses`, enter a virtual IP address. A virtual IP address is a standard IP address in the same IP network (same subnet) as the IP addresses of both nodes.  
Application clients must be configured with the virtual IP address (or the DNS name associated with the virtual IP address).  
The virtual IP address is automatically switched in the event of a failure.
  * In `Replicated directories`, set the paths of directories to replicate. Check that they exist on both nodes and contain the application data.  
Data and log replication are essential for a database.  
You can create additional replicated directories as required.  
See this screenshot for a visual example of [Milestone XProtect SQL replication 🖼️](</safekit-docs/wp-content/uploads/2025/05/milestone-replication.png>).
  * In `Checkers`, you will be able to configure checkers if needed, such as process monitoring, custom checkers, TCP, ping, or split-brain checkers.  
For example, if a process name is displayed in `Monitored processes/services`, it will be monitored with a restart action in case of failure. Configuring a wrong process name will cause the module to stop right after its start.


<div class="callout callout-warning"><img src="/safekit-docs/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If SQL is on the management server:</span></div>

  * The [SQL system databases](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (like master.mdf and mastlog.ldf) must be located in the same directories on both nodes. The directories must be configured as replicated.
  * SQL must be also installed at the same location in the file system on both nodes because the read-only [SQL resource database](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) is located in the binary and is required for the failover. This database does not need to be replicated.
  * The SQL Milestone databases (.mdf and .ldf) must be located in the same directories on both nodes. The directories must be configured as replicated. Milestone databases are as follows according this [article](<https://doc.milestonesys.com/en-US/bundle/doc1040_2026r1/page/content/standard_features/sf_mc/sf_maintenance/mc_managingthesqlserver.htm>).


<div class="callout"><img src="/safekit-docs/wp-content/uploads/2022/07/note.png" alt="Note"><span>If you click on `Advanced configuration`, the `userconfig.xml` file is displayed. This file is automatically populated by the console and deployed on the nodes with the restart scripts.</span></div>


<div class="callout"><img src="/safekit-docs/wp-content/uploads/2022/07/note.png" alt="Note"><span>When you apply the SafeKit configuration, the `startup type` of services is automatically set to `Manual` in Windows Services. This ensures that the services do not start automatically when the system boots, but are instead started only when the module itself is started.</span></div>


<img src="/safekit-docs/wp-content/uploads/2025/05/05-module-mirror-edit-config-3.png" alt="Enter the Milestone XProtect and SQL module settings">


### 5\. Edit scripts (optional)

  * This step is optional and can be skipped in most cases, as the restart scripts are already pre-configured to restart services defined in the previous step.
  * So, click directly on `Next step`.
  * `start_prim.ps1` starts all services in the order specified in the `SERVICES` list, and starts the `IIS application pools` used by Milestone. `stop_prim.ps1` stops all services in the reverse order.
  * Additionally, `start_prim.ps1` checks the startup of each service and stops the module if any service fails to start correctly.


<img src="/safekit-docs/wp-content/uploads/2025/05/28-module-sqlserver-edit-script-3.png" alt="Enter the Milestone XProtect and SQL module settings">


### 6\. Communication encryption (optional)

  * Keep encryption of communication between nodes.


<img src="/safekit-docs/wp-content/uploads/2025/05/07-module-encryption-1.png" alt="Communication encryption of the Milestone XProtect and SQL module">


### 7\. Save and apply

  * `Save and apply` the configuration and scripts on both nodes.


<img src="/safekit-docs/wp-content/uploads/2025/05/08-module-save-1.png" alt="Save and apply the Milestone XProtect and SQL module configuration">


### 8\. Verify successful configuration

  * Check the `Success` ✅ message on both nodes and click on `Monitor modules`.
  * If the configuration `Failure` ❌ occurs on one node, open the ▼ accordion for that node and review the messages. Note that you can use the SafeKit AI 🤖 for assistance.


<img src="/safekit-docs/wp-content/uploads/2025/05/09-module-save-check-1.png" alt="Check the Milestone XProtect and SQL module configuration success">


### 9\. Start the node with up-to-date data

  * If node 1 has the up-to-date replicated directories, select it and ⋯ `Force start` ▶ `As primary`.


When node 2 will be started, all data will be copied from node 1 to node 2.


<div class="callout callout-warning"><img src="/safekit-docs/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If you make the wrong choice, you run the risk of synchronizing outdated data on both nodes.</span></div>


<div class="callout callout-warning"><img src="/safekit-docs/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>It is also assumed that the Milestone XProtect and SQL application is stopped on node 1 so that SafeKit installs the replication mechanisms and then starts the application in the `start_prim` script.</span></div>


<div class="callout callout-warning"><img src="/safekit-docs/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>Use `Start` for subsequent starts: SafeKit retains the most up-to-date server. Starting `As primary` is a special start-up the first time or during exceptional operations.</span></div>


<img src="/safekit-docs/wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png" alt="Start as primary the Milestone XProtect and SQL node with the up-to-date data">


### 10\. Wait for the transition to ALONE (green)

  * Node 1 should reach the ALONE (green) state, which means that the virtual IP is set and that the `start_prim` script has been executed on node 1.


<div class="callout callout-warning"><img src="/safekit-docs/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If ALONE (green) is not reached or if the application is not started, analyze why with the <a href="/safekit-docs/wp-content/uploads/2024/03/24-module-log-script.png">module log 🖼️</a> of node 1.</span></div>

  * Click the 🔍 **log** icon of `node1` to open the module log and look for error messages such as a checker detecting an error and stopping the module.
  * Click on `start_prim` in the log: output messages of the script are displayed on the right and errors can be detected such as a service incorrectly started.
  * Use the SafeKit AI 🤖 for assistance with log messages.


<div class="callout callout-warning"><img src="/safekit-docs/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If the cluster is in `WAIT (red) not uptodate, STOP (red) not uptodate` state, stop the WAIT node and <a href="/safekit-docs/wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png">force its start as primary 🖼️</a>.</span></div>


<img src="/safekit-docs/wp-content/uploads/2024/03/12-monitoring-alone-stop.png" alt="The first Milestone XProtect and SQL node starts as primary and becomes ALONE">


### 11\. In the desktop of node 1, stop, then register on the vitual IP address, apply the Milestone KB and restart the Milestone Management Server

Execute the following bullets on node 1 according the menu in the image:

  * Use the **ALONE** menu of the SafeKit console to disable **Checkers** and **Process/Service Monitoring** to prevent false detections when stopping the Management Server Service ([suspend the checker 🖼️](</safekit-docs/wp-content/uploads/2024/04/safekit-disable-checkers.png>)).
  * Right-click on the **Milestone Management Server** icon in the taskbar.
  * **Stop Management Server Service**
  * Then choose **Server Configurator...** and register the virtual IP address.
  * **Edit the ServerConfig.xml** on node1.Go to "C:/ProgramData/Milestone/XProtect Management Server" and backup the original ServerConfig.xml file. Open the ServerConfig.xml with any text editor (with Administrator rights) and: 
    * `<Failover>...<VirtualAddress>XXX.XXX.XXX.XXX</VirtualAddress>...</Failover>`: replace the `XXX.XXX.XXX.XXX` with the actual virtual IP address.
    * Change `<ClusterMember>false</ClusterMember>` to `true`
    * Set `<ClusterLocalWebserverUri>http://NODE1_FQDN:9010</ClusterLocalWebserverUri>` (or NODE1 hostname if workgroup).
For more information, see this **[Milestone KB](<https://milestonesys.my.site.com/developer/s/article/Management-Client-and-Smart-Client-are-not-functioning-properly-after-node-switch-in-a-clustered-Management-Server-setup>)**.
  * **Start Management Server Service**
  * Use the **ALONE** menu of the SafeKit console to enable **Checkers** and **Process/Service Monitoring** ([enable the checker 🖼️](</safekit-docs/wp-content/uploads/2024/04/safekit-disable-checkers.png>)).


<div class="callout"><img src="/safekit-docs/wp-content/uploads/2022/07/note.png" alt="Note"><span>This procedure registers the node 1 management server in the SQL database (running on node 1) through a connection to the virtual address.</span></div>


<img src="/safekit-docs/wp-content/uploads/2022/07/milestone-management-server-register-2020.png" alt="Register the management server in Milestone 2020+">


### 12\. In the desktop of node 2, register the management server on the vitual IP address

  * Choose **Server Configurator** in the taskbar of node 2 and register it on the virtual IP address (see image).
  * Then **Stop Management Server Service**.
  * **Edit the ServerConfig.xml** on node2. Go to "C:/ProgramData/Milestone/XProtect Management Server" and backup the original ServerConfig.xml file. Open the ServerConfig.xml with any text editor (with Administrator rights) and: 
    * `<Failover>...<VirtualAddress>XXX.XXX.XXX.XXX</VirtualAddress>...</Failover>`: replace the `XXX.XXX.XXX.XXX` with the actual virtual IP address.
    * Change `<ClusterMember>false</ClusterMember>` to `true`
    * Set `<ClusterLocalWebserverUri>http://NODE2_FQDN:9010</ClusterLocalWebserverUri>` (or NODE2 hostname if workgroup).
For more information, see this **[Milestone KB](<https://milestonesys.my.site.com/developer/s/article/Management-Client-and-Smart-Client-are-not-functioning-properly-after-node-switch-in-a-clustered-Management-Server-setup>)**.


<div class="callout callout-warning"><img src="/safekit-docs/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>The account of the user executing the registration on node 2 must have the administrator role in Milestone on node 1.</span></div>

If it is the local administrator on node 2 who makes the registration, the built-in Windows group `BUILTIN/Administrators` must have been set in Management Client / Security / Roles at [Step 13](<#role>). Else the registration will not work.


<div class="callout"><img src="/safekit-docs/wp-content/uploads/2022/07/note.png" alt="Note"><span>This procedure registers the node 2 management server in the SQL database (running on node 1) through a connection to the virtual address.</span></div>


<img src="/safekit-docs/wp-content/uploads/2022/07/milestone-management-server-register-2020.png" alt="Register the management server with Milestone 2020+">


### 13\. Solve Windows authentication issue on failover {#role}

When you start the Milestone XProtect Management Client, you have to authenticate using one of the following methods. Depending on your choice, specific steps are required to ensure the login works after a SafeKit failover. Reference: [View Login Screenshot 🖼️](</safekit-docs/wp-content/uploads/2022/07/milestone-management-server-connect.png>).

#### Windows authentication with Active Directory (AD)

**Configuration:** No special configuration is required.

If Milestone "Windows authentication" is configured with an Active Directory, the user and password information is retrieved from the external AD. After a failover, the secondary node connects to the same AD, so authentication works automatically.

#### Windows authentication in Workgroup

**Configuration:** You must add the **BUILTIN/Administrators** group in "Security / Roles".

**Warning:** In a Workgroup, local users have different Security Identifiers (SIDs) on each node, even if the names are identical. Only the BUILTIN/Administrators group has the same SID on both nodes.

  * By adding this group, you can authenticate on the secondary node with any local administrator account after a failover.
  * Without this, local Windows authentication will fail on the secondary node because the SIDs will not match.


#### Basic authentication with SQL database

**Configuration:** Create a user with "Basic authentication" (e.g., "Admin").

For "Basic authentication", the user credentials are stored directly in the SQL database. Because SafeKit replicates the SQL database to the secondary node in real-time, these users are always available immediately after a failover.


<img src="/safekit-docs/wp-content/uploads/2022/07/milestone-management-server-roles.png" alt="Set roles in the Milestone Management Client">


### 14\. Start node 2

  * ⋯ `Start` node 2 with its contextual menu.
  * Wait for the SECOND (green) state.


<div class="callout"><img src="/safekit-docs/wp-content/uploads/2022/07/note.png" alt="Note"><span>Node 2 stays in the SECOND (orange) state while resynchronizing the replicated directories (copy from node 1 to node 2).</span></div>

This may take a while depending on the size of files to resynchronize in replicated directories and the network bandwidth.

To see the progress of the copy, see the [module log 🖼️](</safekit-docs/wp-content/uploads/2024/03/27-module-log-reintegration.png>) and the [replication resources 🖼️](</safekit-docs/wp-content/uploads/2024/03/26-replication-resources-reintegration.png>) of node 2. Use the SafeKit AI 🤖 for assistance with log messages.


<img src="/safekit-docs/wp-content/uploads/2024/03/13-monitoring-alone-stop-start.png" alt="Start the Milestone XProtect and SQL node 2">


### 15\. Verify that the cluster is operational

  * Check that the cluster is green/green with Milestone XProtect and SQL services running on the PRIM node and not running on the SECOND node.
  * Only changes inside files are replicated in real time in this state.


<img src="/safekit-docs/wp-content/uploads/2022/07/warning-small.png" alt="Warning">


  * Register the **recording servers** with the virtual IP address.
  * Connect the **Milestone Management Client** and the **Milestone Smart Client** on the virtual IP address.


Components that are clients of Milestone XProtect and SQL services must be configured with the virtual IP address. The configuration can be done with a DNS name (if a DNS name has been created and associated with the virtual IP address).


<img src="/safekit-docs/wp-content/uploads/2024/03/14-monitoring-prim-second.png" alt="The Milestone XProtect and SQL node 2 is SECOND (green)">


### 16\. Testing

  * Stop the PRIM node by scrolling down its contextual menu and clicking `Stop`.
  * Verify that there is a failover on the SECOND node which should become ALONE (green).
  * And with Microsoft Management Console (MMC) on Windows or with command lines on Linux, check the failover of Milestone XProtect and SQL services (stopped on node 1 in the `stop_prim` script and started on node 2 in the `start_prim` script).


<div class="callout callout-warning"><img src="/safekit-docs/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If ALONE (green) is not reached on node2 or if the application is not started, analyze why with the <a href="/safekit-docs/wp-content/uploads/2024/03/38-module-log-script-second.png">module log 🖼️</a> of node 2.</span></div>

  * Click the 🔍 **log** icon of `node2` to open the module log and look for error messages such as a checker detecting an error and stopping the module.
  * Click on `start_prim` in the log: output messages of the script are displayed on the right and errors can be detected such as a service incorrectly started.
  * Use the SafeKit AI 🤖 for assistance with log messages.


<div class="callout callout-warning"><img src="/safekit-docs/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If everything is okay, initiate a start on node1, which will resynchronize the replicated directories from node2.</span></div>

If things go wrong, stop node2 and [force the start as primary 🖼️](</safekit-docs/wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png>) of node1, which will restart with its locally healthy data at the time of the stop.


<div class="callout"><img src="/safekit-docs/wp-content/uploads/2022/07/note.png" alt="Note"><span>Note that you have a 🕒 **<a href="/safekit-docs/wp-content/uploads/2026/05/safekit-console-timeline.png">timeline 🖼️</a>** that can be helpful to understand what happens in the cluster.</span></div>


<div class="callout"><img src="/safekit-docs/wp-content/uploads/2022/07/note.png" alt="Note"><span>Find more details, along with videos, in the <a href="/safekit-docs/resources/safekit-on-line-training/">SafeKit Online Training</a>.</span></div>


<img src="/safekit-docs/wp-content/uploads/2024/03/16-monitoring-prim-second-stop.png" alt="Stop the Milestone XProtect and SQL module on the PRIM server">


### 17\. Support

  * For getting support, take 2 SafeKit `Snapshots` (2 .zip files), one for each node.


<div class="callout"><img src="/safekit-docs/wp-content/uploads/2022/07/note.png" alt="Note"><span><a href="/safekit-docs/resources/safekit-support/">More information on the support here</a>.</span></div>


<img src="/safekit-docs/wp-content/uploads/2024/03/30-snapshots-mirror.png" alt="Take the Milestone XProtect and SQL snaphots for support">



<!-- END INSERT: insert-safekit-82-milestone-configuration-en lang="en" display="content" querystring="app=Milestone XProtect and SQL&amp;mod=milestone" -->
 

## Demonstration of the SafeKit mirror solution


<!-- BEGIN INSERT: insert-safekit-mirror-video-en lang="en" display="content" -->
 

### SafeKit Video: Application-Level Clustering (8:47) {#demo-mirror-ha-cluster}

In this video, discover how SafeKit implements a **mirror HA cluster** without the complexity of a SAN. While this demonstration uses Microsoft SQL Server, the solution works identically for other databases and applications. 

### Chapters

  1. [2 nodes with SQL Server](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. [Configure the cluster and the mirror.safe module](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. [Start and test SQL replication, migration, failover on crash](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)


### Step-by-Step Implementation

  * [Read the guide on setting up a mirrored cluster on Windows](</safekit-docs/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/>)
  * [Read the guide on setting up a mirrored cluster on Linux](</safekit-docs/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover/>)


&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 


<!-- END INSERT: insert-safekit-mirror-video-en lang="en" display="content" -->
 


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