---
title: "Apache Network Load Balancing & Failover: Install the SafeKit apache_farm.safe Module"
slug: "safekit-quick-installation-guide-with-network-load-balancing-and-failover"
canonical: "https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/"
description: "SafeKit Video: Network Load Balancing and Virtual IP Management (5:03) In this video, learn how to implement a virtual IP address to provide a single entry point for a 2-node cluster. SafeKit simplifies network load balancing by automatically managing the virtual IP, ensuring that client traffic is distributed across nodes and redirected instantly during a […]"
category: "quick-install"
lang: "en"
topics: "High Availability Quick Installation Guide for Apache, SafeKit High Availability Limitations, Overview of the SafeKit / Apache solution, Installation of the SafeKit / Apache solution on Windows and Linux (apache_farm.safe), Step by step configuration of the SafeKit / Apache solution, Demonstration of the SafeKit farm solution, 🔍 SafeKit High Availability Navigation Hub"
---

# Apache Network Load Balancing & Failover: Install the SafeKit apache_farm.safe Module


<!-- BEGIN INSERT: insert-safekit-farm-guide-en lang="en" display="content" querystring="app=Apache&amp;mod=apache_farm" -->
 

## High Availability Quick Installation Guide for Apache {#quick-guide}

This guide explains how to set up a **farm cluster** for Apache using SafeKit, ensuring network load balancing and automatic failover.

For help, you can use [SafeKit AI 🤖](</resources/safekit-support/>).

### 1\. Overview

  * **Architecture:** Implements a scalable, multi-node load-balanced farm with a virtual IP address.
  * **High Availability:** Features automatic health monitoring and seamless failover to **ensure service continuity**.


### 2\. Installation

  * **Software:** Install the SafeKit engine on all servers.
  * **Module:** Download the pre-configured `apache_farm.safe` application module.


### 3\. Configuration

  * **Web Console:** Configure the Apache farm cluster.
  * **Monitoring:** Start monitoring and protecting the Apache application.



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
 


<!-- END INSERT: insert-safekit-farm-guide-en lang="en" display="content" querystring="app=Apache&amp;mod=apache_farm" -->
 

## Overview of the SafeKit / Apache solution

The solution is described here: **[SafeKit: All-in-One Apache Load Balancing& High Availability Software](</solutions/apache-load-balancing-failover-2/>)**.

## Installation of the SafeKit / Apache solution on Windows and Linux (apache_farm.safe)

### Prerequisites

  * You need Apache installed on 2 nodes or more (virtual machines or physical servers).



<!-- BEGIN INSERT: insert-safekit-installation-package-windows-en lang="en" display="content" querystring="app=Apache&amp;mod=apache_farm&amp;farm" -->
 

### Package installation on Windows

  * Download and install the free version of SafeKit on 2 Windows nodes.   
Note: the free version includes all SafeKit features. At the end of the trial, you can activate permanent license keys without uninstalling the package. 
  * Upon completing the package installation, select **Set console credentials and firewall rules now** and configure a password for the **admin** user of the SafeKit console.   
**Set the same password on all nodes.**
  * Exclude from antivirus scans **C:/safekit/** (the default installation directory) and **all replicated folders** that you are going to define.   
Antiviruses may face detection challenges with SafeKit due to its close integration with the OS, virtual IP mechanisms, real-time replication and restart of critical services. 


[ Download SafeKit (Windows) > ](</resources/safekit-free-trial/>)


<!-- END INSERT: insert-safekit-installation-package-windows-en lang="en" display="content" querystring="app=Apache&amp;mod=apache_farm&amp;farm" -->
 


<!-- BEGIN INSERT: insert-safekit-82-installation-module-windows-en lang="en" display="content" querystring="app=Apache&amp;mod=apache_farm&amp;farm" -->
 

### Module installation on Windows

  * Download the apache_farm.safe module. The module is free. It contains the files userconfig.xml and the restart scripts.
  * Put **apache_farm.safe** under **C:/safekit/Application_Modules/generic**.


<a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/apache_farm.safe" download="apache_farm.safe">⬇️ Download apache_farm.safe (Windows) ></a> 


<!-- END INSERT: insert-safekit-82-installation-module-windows-en lang="en" display="content" querystring="app=Apache&amp;mod=apache_farm&amp;farm" -->
 


<!-- BEGIN INSERT: insert-safekit-installation-package-linux-en lang="en" display="content" querystring="app=Apache&amp;mod=apache_farm&amp;farm" -->
 

### Package installation on Linux

  * Install the free version of SafeKit on 2 Linux nodes. Note: the free trial includes all SafeKit features. At the end of the trial, you can activate permanent license keys without uninstalling the package.
  * After the download of safekit_xx.bin package, execute it to extract the rpm and the safekitinstall script and then execute the **safekitinstall** script
  * Answer **yes** to firewall automatic configuration
  * Set the password for the web console and the default user **admin**. **Set the same password on all nodes.**


[ Download SafeKit (Linux) > ](</resources/safekit-free-trial/>)


<!-- END INSERT: insert-safekit-installation-package-linux-en lang="en" display="content" querystring="app=Apache&amp;mod=apache_farm&amp;farm" -->
 


<!-- BEGIN INSERT: insert-safekit-82-installation-module-linux-en lang="en" display="content" querystring="app=Apache&amp;mod=apache_farm&amp;farm" -->
 

### Module installation on Linux

  * Download the apache_farm.safe module.   
The module is free. It contains the files userconfig.xml and the restart scripts. 
  * Put **apache_farm.safe** under **/opt/safekit/Application_Modules/generic/**.


<a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/apache_farm.safe" download="apache_farm.safe">⬇️ Download apache_farm.safe (Linux) ></a> 


<!-- END INSERT: insert-safekit-82-installation-module-linux-en lang="en" display="content" querystring="app=Apache&amp;mod=apache_farm&amp;farm" -->
 

## Step by step configuration of the SafeKit / Apache solution


<!-- BEGIN INSERT: insert-safekit-82-farm-configuration-en lang="en" display="content" querystring="app=Apache&amp;mod=apache_farm" -->
 

### Prerequisites

  * Apache application installed on 2 nodes (or more).
  * Virtual IP load balancing requires nodes on the same LAN or extended LAN (L2) — routed L3 networks not supported (except with [cloud load balancers](</resources/safekit-user-guide-82/#Cloud>)).


### 1\. Launch the SafeKit console

  * Launch the web console in a browser on one cluster node by connecting to `http://localhost:9010`.
  * Enter `admin` as user name and the password defined during installation.


You can also run the console in a browser on a workstation external to the cluster.


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>The configuration of SafeKit is done on both nodes from a single browser.</span></div>


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>To secure the web console, see <a href="/resources/safekit-user-guide-82/#https">11. Securing the SafeKit web service</a> in the User's Guide.</span></div>


<img src="/wp-content/uploads/2024/03/01-login-large.png" alt="Start the SafeKit web console to configure the Apache cluster">


### 2\. Configure node addresses

  * Enter the node IP addresses, press the `Tab key` to check connectivity and fill node names. If either node1 or node2 has a red color, check connectivity of the browser to both nodes and check firewall on both nodes for [troubleshooting](</resources/safekit-user-guide-82/#Troubleshooting>).
  * Then, click on `Save and apply` to save the configuration.
  * Check the `Success` ✅ message on both nodes.
  * If the configuration `Failure` ❌ occurs on one node, open the ▼ accordion for that node and review the messages. Note that you can use the SafeKit AI 🤖 for assistance.


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>If you want, you can add a new `LAN and nodes` ( first ➕) to create a second heartbeat and a dedicated replication network.</span></div>


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>If you click on `Advanced configuration`, the `cluster.xml` file is displayed. This file is automatically populated by the console and deployed on the nodes.</span></div>


<img src="/wp-content/uploads/2024/03/02-cluster-edit.png" alt="Enter the nodes of the Apache cluster">


### 3\. Select a module

  * In `New module`, click on the `apache_farm.safe` module.


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>In the blue banner at the top, 🛜 `node1` represents the console connection node. This node relays requests to `node2` when required.</span></div>


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>The console looks for `xxx.safe` in the `Application_Modules/generic/` directory on the connection node (`node1`) if you placed a module there during installation.</span></div>


<img src="/wp-content/uploads/2024/03/04-module-new.png" alt="Choose the module for Apache">


### 4\. Configure the module

  * In `Module startup at boot`, choose an automatic start of the module at boot without delay.
  * In `Macros` / `SERVICES`, enter the service names of your application, in the startup order, separated by commas.
  * In `Heartbeat networks`, you should have a single heartbeat network except if you have added a LAN at step 2.
  * In `Virtual IP addresses`, enter a virtual IP address. A virtual IP address is a standard IP address in the same IP network (same subnet) as the IP addresses of both nodes.  
Application clients must be configured with the virtual IP address (or the DNS name associated with the virtual IP address).
  * In `Load balancing rules`, set the service port to load balance (ex.: TCP 9010 in the example).
  * In `Load balancing rules`, set the load balancing rule, `Source address` or `Source port`: 
    * with the source IP address of the client, the same client will be connected to the same node in the farm on multiple TCP sessions and retrieve its context on the node.
    * with the source TCP port of the client, the same client will be connected to different nodes in the farm on multiple TCP sessions (without retrieving a context).
  * In `Checkers`, you will be able to configure checkers if needed, such as process monitoring, custom checkers, TCP, ping, or split-brain checkers.  
For example, if a process name is displayed in `Monitored processes/services`, it will be monitored with a restart action in case of failure. Configuring a wrong process name will cause the module to stop right after its start.


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>If you click on `Advanced configuration`, the `userconfig.xml` file is displayed. This file is automatically populated by the console and deployed on the nodes with the restart scripts.</span></div>


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>In a cloud deployment, you do not need to configure a virtual IP address and load balancing rules in SafeKit. The virtual IP and load balancing rules are managed at the <a href="/resources/safekit-user-guide-82/#Cloud">cloud load balancer level</a>.</span></div>


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>When you apply the SafeKit configuration, the `startup type` of services is automatically set to `Manual` in Windows services. This ensures that services do not start automatically when the system boots, but are instead started only when the module itself is started (the same applies on Linux).</span></div>


<img src="/wp-content/uploads/2025/05/36-module-farm-config-edit-1.jpg" alt="Enter the Apache farm module settings">


### 5\. Edit scripts (optional)

  * This step is optional and can be skipped in most cases, as the restart scripts are already pre-configured to restart services defined in the previous step.
  * So, click directly on `Next step`.
  * `start_both.ps1` starts all services in the order specified in the `SERVICES` list, while `stop_both.ps1` stops all services in the reverse order.
  * Additionally, `start_both.ps1` checks the startup of each service and stops the module if any service fails to start correctly.


<img src="/wp-content/uploads/2025/05/35-module-iis-edit-script-1.png" alt="Enter the Apache module settings">


### 6\. Communication encryption (optional)

  * Keep encryption of communication between nodes.


<img src="/wp-content/uploads/2025/05/07-module-encryption-1.png" alt="Communication encryption of the Apache module">


### 7\. Save and apply

  * `Save and apply` the configuration and scripts on both nodes.


<img src="/wp-content/uploads/2025/05/08-module-save-1.png" alt="Save and apply the Apache module configuration">


### 8\. Verify successful configuration

  * Check the `Success` ✅ message on both nodes and click on `Monitor modules`.
  * If the configuration `Failure` ❌ occurs on one node, open the ▼ accordion for that node and review the messages. Note that you can use the SafeKit AI 🤖 for assistance.


<img src="/wp-content/uploads/2025/05/09-module-save-check-1.png" alt="Check the Apache module configuration success">


### 9\. Start the farm cluster on node 1 and node 2

  * ⋯ `Start` the farm cluster as shown in the image.


<img src="/wp-content/uploads/2024/03/11-monitoring-farm-stop-stop-start.png" alt="Start the Apache cluster on both nodes">


### 10\. Wait for the transition to UP (green) / UP (green)

Node 1 and node 2 should reach the UP (green) state, which means that the `start_both` script has been executed on node 1 and node 2.


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If UP (green) is not reached or if the application is not started, analyze why with the <a href="/wp-content/uploads/2024/03/37-module-log-farm-script.png">module log 🖼️</a> of node 1 or node 2.</span></div>

  * Click the 🔍 **log** icon of `node1` or `node2` to open the module log and look for error messages such as a checker detecting an error and stopping the module.
  * Click on `start_both` in the log: output messages of the script are displayed on the right and errors can be detected such as a service incorrectly started.
  * Use the SafeKit AI 🤖 for assistance with log messages.


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>Note that you have a 🕒 **<a href="/wp-content/uploads/2026/05/safekit-console-timeline.png">timeline 🖼️</a>** that can be helpful to understand what happens in the cluster.</span></div>


<img src="/wp-content/uploads/2024/03/15-monitoring-up-up.png" alt="The Apache cluster is started">


### 11\. Testing

SafeKit brings a built-in test in the product:

  *     * Configure a rule for TCP port 9010 with a load balancing on source TCP port.
    * Connect an external workstation outside the farm nodes.
    * Start a browser on http://virtual-ip:9010/safekit/mosaic.html.


You should see a mosaic of colors depending on nodes answering to HTTP requests.

  * Stop one UP (green) node by scrolling down its contextual menu and clicking Stop.
  * Check that there is no more TCP connections on the stopped node and on the virtual IP address.


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>Find more details, along with videos, in the <a href="/resources/safekit-on-line-training/">SafeKit Online Training</a>.</span></div>


<img src="/wp-content/uploads/2024/03/appli-19.png" alt="Test the virtual IP address of Apache with the mosaic">


### 12\. Support

  * For getting support, take 2 SafeKit `Snapshots` (2 .zip files), one for each node.


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span><a href="/resources/safekit-support/">More information on the support here</a>.</span></div>


<img src="/wp-content/uploads/2024/03/32-snapshots-farm.png" alt="Take the Apache snaphots for support">



<!-- END INSERT: insert-safekit-82-farm-configuration-en lang="en" display="content" querystring="app=Apache&amp;mod=apache_farm" -->
 

## Demonstration of the SafeKit farm solution


<!-- BEGIN INSERT: insert-safekit-farm-video-en lang="en" display="content" -->
 

### SafeKit Video: Network Load Balancing and Virtual IP Management (5:03) {#demo-farm}

In this video, learn how to implement a **virtual IP address** to provide a single entry point for a 2-node cluster. SafeKit simplifies **network load balancing** by automatically managing the virtual IP, ensuring that client traffic is distributed across nodes and redirected instantly during a failover. Although this demonstration uses Apache on Windows, the solution works identically with other applications.

### Chapters

  1. [Architecture: Preparing 2 nodes for a shared Virtual IP](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=0s>) (0:13)
  2. [Configuration: Setting up the farm.safe module and Virtual IP address](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=13s>) (2:20)
  3. [Validation: Failover testing and Virtual IP redirection on server crash](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=153s>) (2:30)


### Step-by-Step Implementation

  * [Read the guide on setting up a farm cluster on Windows](</quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/>)
  * [Read the guide on setting up a farm cluster on Linux](</quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-network-load-balancing-and-failover/>)


&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 


<!-- END INSERT: insert-safekit-farm-video-en lang="en" display="content" -->
 


<!-- BEGIN INSERT: insert-safekit-hub-en lang="en" display="content" querystring="app=Microsoft SQL Server mirror" -->
 

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
  

<!-- END INSERT: insert-safekit-hub-en lang="en" display="content" querystring="app=Microsoft SQL Server mirror" -->
 


<!-- BEGIN INSERT: insert-safekit-4-buttons-en lang="en" display="content" -->
<div class="button-row">
  <a class="btn-action" href="https://safekit.eviden.com/contact-us-for-safekit/">🧑 Contact us</a>
  <a class="btn-action" href="/resources/safekit-free-trial/">🎁 SafeKit free trial</a>
  <a class="btn-action" href="https://training.my.evidian.com/mod/page/view.php?id=712">🏅 Free certification</a>
  <a class="btn-action" href="https://safekit.eviden.com/get-a-quote-safekit/">💰 Perpetual license cost</a>
</div>
<!-- END INSERT: insert-safekit-4-buttons-en lang="en" display="content" -->