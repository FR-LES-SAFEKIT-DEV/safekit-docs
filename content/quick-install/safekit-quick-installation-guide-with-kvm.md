---
title: "KVM High Availability with SafeKit: Install the kvm.safe Module for Failover"
slug: "safekit-quick-installation-guide-with-kvm"
canonical: "https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-with-kvm/"
description: "SafeKit Video: Virtual Machine-Level Clustering with Hyper-V (5:15) In this video, discover how SafeKit implements high availability for Hyper-V without the complexity of a SAN. Learn to configure virtual machine replication across two nodes to ensure seamless failover for your critical virtualized workloads. Although this demonstration uses Hyper-V on Windows, the solution works identically with […]"
category: "quick-install"
lang: "en"
topics: "High Availability Quick Installation Guide for KVM, SafeKit High Availability Limitations, Overview of the SafeKit / KVM solution, Installation of the SafeKit / KVM solution on Linux (kvm.safe), Step by step configuration of the SafeKit / KVM solution, Demonstration of a VM-level high availability solution, 🔍 SafeKit High Availability Navigation Hub"
---

# KVM High Availability with SafeKit: Install the kvm.safe Module for Failover


<!-- BEGIN INSERT: insert-safekit-mirror-guide-en lang="en" display="content" querystring="app=KVM&amp;mod=kvm" -->
 

## High Availability Quick Installation Guide for KVM {#quick-guide}

This guide explains how to set up a **mirror cluster** for KVM using SafeKit, ensuring automatic failover and synchronous replication without the need for shared storage. 

For help, you can use [SafeKit AI 🤖](</safekit-docs/resources/safekit-support/>).

### 1\. Overview

  * **Architecture:** Uses a two-node system (Primary/Secondary).
  * **Data Protection:** Implements real-time synchronous replication for **zero data loss** (RPO=0).


### 2\. Installation

  * **Software:** Install the SafeKit engine on both servers.
  * **Module:** Download the pre-configured `kvm.safe` application module.


### 3\. Configuration

  * **Web Console:** Configure the specific folders containing the KVM files.
  * **Monitoring:** Start monitoring and protecting the KVM application.



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
 


<!-- END INSERT: insert-safekit-mirror-guide-en lang="en" display="content" querystring="app=KVM&amp;mod=kvm" -->
 

## Overview of the SafeKit / KVM solution

The solution is described here: **[Simple Linux KVM High Availability without Shared Storage](</safekit-docs/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)**

## Installation of the SafeKit / KVM solution on Linux (kvm.safe)

### Prerequisites

  * KVM installed on 2 Linux nodes.
  * Critical applications installed inside one or more virtual machines.
  * Maximum 32 virtual machines per KVM host.
  * Total replicated data limited to a few terabytes — beyond this, resynchronization time becomes significant.
  * Minimum 1Gb/s interconnect between nodes (10Gb/s recommended for faster resynchronization).
  * IP failover requires both nodes on the same LAN or extended LAN (L2) — routed L3 networks not supported (except with [cloud load balancers](</safekit-docs/resources/safekit-user-guide-82/#Cloud>)).



<!-- BEGIN INSERT: insert-safekit-installation-package-linux-en lang="en" display="content" querystring="app=KVM&amp;mod=kvm" -->
 

### Package installation on Linux

  * Install the free version of SafeKit on 2 Linux nodes. Note: the free trial includes all SafeKit features. At the end of the trial, you can activate permanent license keys without uninstalling the package.
  * After the download of safekit_xx.bin package, execute it to extract the rpm and the safekitinstall script and then execute the **safekitinstall** script
  * Answer **yes** to firewall automatic configuration
  * Set the password for the web console and the default user **admin**. **Set the same password on all nodes.**


[ Download SafeKit (Linux) > ](</safekit-docs/resources/safekit-free-trial/>)


<!-- END INSERT: insert-safekit-installation-package-linux-en lang="en" display="content" querystring="app=KVM&amp;mod=kvm" -->
 


<!-- BEGIN INSERT: insert-safekit-82-installation-module-linux-en lang="en" display="content" querystring="app=KVM&amp;mod=kvm" -->
 

### Module installation on Linux

  * Download the kvm.safe module.   
The module is free. It contains the files userconfig.xml and the restart scripts. 
  * Put **kvm.safe** under **/opt/safekit/Application_Modules/generic/**.


<a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_linux/kvm.safe" download="kvm.safe">⬇️ Download kvm.safe (Linux) ></a> 


<!-- END INSERT: insert-safekit-82-installation-module-linux-en lang="en" display="content" querystring="app=KVM&amp;mod=kvm" -->
 

## Step by step configuration of the SafeKit / KVM solution


<!-- BEGIN INSERT: insert-safekit-82-kvm-configuration-en lang="en" display="content" querystring="app=KVM&amp;mod=kvm" -->
 


<div class="callout callout-warning"><img src="/safekit-docs/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>The KVM configuration is presented with a virtual machine named `VM1` and containing the application to restart in case of failure.</span></div>

You will have to repeat this configuration for all VMs that you want to replicate and to restart.

### 1\. Prerequisites {#prerequisite}

The VM1 virtual machine image is in the file `/var/lib/libvirt/images/vm1.qcow2`. Before configuring SafeKit, you must perform the following configuration to place the virtual machine in a vm1-specific directory that will be replicated by SafeKit.

On node 1:

  * Stop vm1: 
        
        virsh shutdown vm1

  * Create a `vm1/` directory: 
        
        mkdir -p /var/lib/libvirt/images/vm1/

  * Copy the vm1 image to the new location: 
        
        cp -a /var/lib/libvirt/images/vm1.qcow2 /var/lib/libvirt/images/vm1/

The original vm1 image can be deleted as soon as tests with the new location are successfull.
  * Edit the vm1 configuration file: 
        
        EDITOR=vi virsh edit vm1

And change the line: 
        
        <source file='/var/lib/libvirt/images/vm1.qcow2'>

  
by : 
        
        <source file='/var/lib/libvirt/images/vm1/vm1.qcow2'>

  * Set the [cache option to 'none'](</safekit-docs/wp-content/uploads/2022/07/kvm-2.png>) in the same file, for data integrity in case of crash: 
        
        <disk type='file' device='disk'> <driver name='qemu' type=’qcow2’ **cache='none'** />

  * Close the vm1 configuration file
  * Disable [vm1 automatic start](</safekit-docs/wp-content/uploads/2022/07/kvm-3.png>): 
        
        virsh autostart vm1 --disable

  * Create a `vm1.xml` configuration file for vm1: 
        
        virsh dumpxml vm1 > vm1.xml


On node 2:

  * Copy the `vm1.xml` configuration file from node 1. Note: whenever vm1 configuration is changed on node 1, you must reapply the new configuration on node 2.
  * Create vm1 but do not start it: 
        
        virsh define vm1.xml

  * Disable vm1 automatic start: 
        
        virsh autostart vm1 --disable

  * Create the directory for the image location: 
        
        mkdir -p /var/lib/libvirt/images/vm1/


### 2\. Launch the SafeKit console

  * Launch the web console in a browser on one cluster node by connecting to `http://localhost:9010`.
  * Enter `admin` as user name and the password defined during installation.


You can also run the console in a browser on a workstation external to the cluster.


<div class="callout callout-warning"><img src="/safekit-docs/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>The configuration of SafeKit is done on both nodes from a single browser.</span></div>


<div class="callout"><img src="/safekit-docs/wp-content/uploads/2022/07/note.png" alt="Note"><span>To secure the web console, see <a href="/safekit-docs/resources/safekit-user-guide-82/#https">11. Securing the SafeKit web service</a> in the User's Guide.</span></div>


<img src="/safekit-docs/wp-content/uploads/2024/03/01-login-large.png" alt="Start the SafeKit web console to configure the KVM cluster">


### 3\. Configure node addresses

  * Enter the node IP addresses, press the `Tab key` to check connectivity and fill node names. If either node1 or node2 has a red color, check connectivity of the browser to both nodes and check firewall on both nodes for [troubleshooting](</safekit-docs/resources/safekit-user-guide-82/#Troubleshooting>).
  * Then, click on `Save and apply` to save the configuration.
  * Check the `Success` ✅ message on both nodes.
  * If the configuration `Failure` ❌ occurs on one node, open the ▼ accordion for that node and review the messages. Note that you can use the SafeKit AI 🤖 for assistance.


<div class="callout"><img src="/safekit-docs/wp-content/uploads/2022/07/note.png" alt="Note"><span>If you want, you can add a new `LAN and nodes` ( first ➕) to create a second heartbeat and a dedicated replication network.</span></div>


<div class="callout"><img src="/safekit-docs/wp-content/uploads/2022/07/note.png" alt="Note"><span>If you click on `Advanced configuration`, the `cluster.xml` file is displayed. This file is automatically populated by the console and deployed on the nodes.</span></div>


<img src="/safekit-docs/wp-content/uploads/2024/03/02-cluster-edit.png" alt="Enter the nodes of the KVM cluster">


### 4\. Select a module

  * In `New module`, click on the `kvm.safe` module.


<div class="callout"><img src="/safekit-docs/wp-content/uploads/2022/07/note.png" alt="Note"><span>In the blue banner at the top, 🛜 `node1` represents the console connection node. This node relays requests to `node2` when required.</span></div>


<div class="callout"><img src="/safekit-docs/wp-content/uploads/2022/07/note.png" alt="Note"><span>The console looks for `xxx.safe` in the `Application_Modules/generic/` directory on the connection node (`node1`) if you placed a module there during installation.</span></div>


<img src="/safekit-docs/wp-content/uploads/2024/03/04-module-new.png" alt="Choose the module for KVM">


### 5\. Configure the module

  * Choose an `Automatic` start of the module at boot without delay.
  * Normally, you have a single `Heartbeat` network on which the replication is made. But, you can define a private network if necessary (by adding a LAN at step 3).
  * Put in `VM_PATH`, the root path of the replicated directory (`/var/lib/libvirt/images`).
  * Enter in `VM_NAME`, the name of the virtual machine (`vm1`).


We assume that the VM1 files are in `/var/lib/libvirt/image/vm1/` (see [prerequisites](<#prerequisite>)). This directory will be replicated in real-time by SafeKit.


<div class="callout"><img src="/safekit-docs/wp-content/uploads/2022/07/note.png" alt="Note"><span>You do not need to configure a virtual IP address. VM1 will be rebooted on the secondary KVM with its physical IP address, and this IP address will be rerouted.</span></div>


<img src="/safekit-docs/wp-content/uploads/2024/03/21-module-kvm-edit-config-1.png" alt="Enter the KVM parameters">


### 6\. Custom checker to detect VM malfunction

The custom checker checks if the VM is running (with the 'virsh domstate' command). If the VM is not running, the custom checker automatically restarts the VM on the same KVM node or on the other.

  * Click on `Checkers / Custom` (see image).
  * `Resource name` identifies the virtual machine with a resource name in SafeKit: `custom.VM_NAME_check`.
  * With `restart` in `Action`, the VM is restarted on the same KVM node. After 3 unsuccessful restarts in 24 hours, the SafeKit kvm module stops on the primary node and there is a failover of the VM on the secondary node.
  * If you set `stopstart` in `Action`, there is a direct failover on the other KVM node as soon as the VM is not running.


<div class="callout"><img src="/safekit-docs/wp-content/uploads/2022/07/note.png" alt="Note"><span>For maintenance, if you want to stop the virtual machine, the custom checker will restart it automatically. To avoid that, you can temporarly <a href="/safekit-docs/wp-content/uploads/2024/04/safekit-disable-checkers.png">suspend the checker 🖼️</a>. Or you can remove it by deleting the configuration line in the console.</span></div>


<img src="/safekit-docs/wp-content/uploads/2024/12/custom-kvm-checker-2.png" alt="Enter the KVM custom checker parameters">


### 7\. Edit scripts (optional)

  * Do not edit scripts.


### 8\. Communication encryption (optional)

  * Keep encryption of communication between nodes.


<img src="/safekit-docs/wp-content/uploads/2024/03/07-module-encryption.png" alt="Communication encryption of the KVM module">


### 9\. Save and apply

  * `Save and apply` the configuration and scripts on both nodes.


<img src="/safekit-docs/wp-content/uploads/2024/03/08-module-save.png" alt="Save and apply the KVM module configuration">


### 10\. Verify successful configuration

  * Check the `Success` ✅ message on both nodes and click on `Monitor modules`.
  * If the configuration `Failure` ❌ occurs on one node, open the ▼ accordion for that node and review the messages. Note that you can use the SafeKit AI 🤖 for assistance.


<img src="/safekit-docs/wp-content/uploads/2024/03/09-module-save-check.png" alt="Check the KVM module configuration success">


### 11\. Start the node with up-to-date data

  * If node 1 has the up-to-date replicated directory for `vm1/`, select it and ⋯ `Force start` ▶ `As primary`.


When node 2 will be started, all data will be copied from node 1 to node 2.


<div class="callout callout-warning"><img src="/safekit-docs/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If you make the wrong choice, you run the risk of synchronizing outdated data on both nodes.</span></div>


<div class="callout callout-warning"><img src="/safekit-docs/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>It is also assumed that `VM1` is stopped on node 1 so that SafeKit installs the replication mechanisms and then starts `VM1` in the `start_prim` script.</span></div>


<div class="callout callout-warning"><img src="/safekit-docs/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>Use `Start` for subsequent starts: SafeKit retains the most up-to-date server. Starting `As primary` is a special start-up the first time or during exceptional operations.</span></div>


<img src="/safekit-docs/wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png" alt="Start as primary the KVM node with the up-to-date data">


### 12\. Wait for the transition to ALONE (green)

  * Node 1 should reach the ALONE (green) state, which means that the `start_prim` script has been executed on node 1.


<div class="callout callout-warning"><img src="/safekit-docs/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If ALONE (green) is not reached or if VM1 is not started, analyze why with the <a href="/safekit-docs/wp-content/uploads/2024/03/24-module-log-script.png">module log 🖼️</a> of node 1.</span></div>

  * Click the 🔍 **log** icon of `node1` to open the module log and look for error messages such as a checker detecting an error and stopping the module.
  * Click on `start_prim` in the log: output messages of the script are displayed on the right and errors can be detected such as VM1 incorrectly started.
  * Use the SafeKit AI 🤖 for assistance with log messages.


<div class="callout callout-warning"><img src="/safekit-docs/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If the cluster is in `WAIT (red) not uptodate, STOP (red) not uptodate` state, stop the WAIT node and <a href="/safekit-docs/wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png">force its start as primary 🖼️</a>.</span></div>


<img src="/safekit-docs/wp-content/uploads/2024/03/12-monitoring-alone-stop.png" alt="The first KVM node starts as primary and becomes ALONE">


### 13\. Start node 2

  * ⋯ `Start` node 2 with its contextual menu.
  * Wait for the SECOND (green) state.


<div class="callout"><img src="/safekit-docs/wp-content/uploads/2022/07/note.png" alt="Note"><span>Node 2 stays in the SECOND (orange) state while resynchronizing the replicated directories (copy from node 1 to node 2).</span></div>

This may take a while depending on the size of files to resynchronize in replicated directories and the network bandwidth.

To see the progress of the copy, see the [module log 🖼️](</safekit-docs/wp-content/uploads/2024/03/27-module-log-reintegration.png>) and the [replication resources 🖼️](</safekit-docs/wp-content/uploads/2024/03/26-replication-resources-reintegration.png>) of node 2. Use the SafeKit AI 🤖 for assistance with log messages.


<img src="/safekit-docs/wp-content/uploads/2024/03/13-monitoring-alone-stop-start.png" alt="Start the KVM node 2">


### 14\. Verify that the cluster is operational

  * Check that the cluster is green/green with `VM1` running on the PRIM node and not running on the SECOND node.


Only changes inside files are replicated in real time in this state.


<img src="/safekit-docs/wp-content/uploads/2024/03/14-monitoring-prim-second.png" alt="The KVM node 2 is SECOND (green)">


### 15\. Testing

  * Stop the PRIM node by scrolling down its contextual menu and clicking `Stop`.
  * Verify that there is a failover on the SECOND node which should become ALONE (green).
  * Check with KVM tools that `VM1` is running on node 2.


<div class="callout callout-warning"><img src="/safekit-docs/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If ALONE (green) is not reached on node2 or if VM1 is not started, analyze why with the <a href="/safekit-docs/wp-content/uploads/2024/03/38-module-log-script-second.png">module log 🖼️</a> of node 2.</span></div>

  * Click the 🔍 **log** icon of `node2` to open the module log and look for error messages such as a checker detecting an error and stopping the module.
  * Click on `start_prim` in the log: output messages of the script are displayed on the right and errors can be detected such as VM1 incorrectly started.
  * Use the SafeKit AI 🤖 for assistance with log messages.


<div class="callout callout-warning"><img src="/safekit-docs/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If everything is okay, initiate a start on node1, which will resynchronize the replicated directories from node2.</span></div>

If things go wrong, stop node2 and [force the start as primary 🖼️](</safekit-docs/wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png>) of node1, which will restart with its locally healthy data at the time of the stop.


<div class="callout"><img src="/safekit-docs/wp-content/uploads/2022/07/note.png" alt="Note"><span>Note that you have a 🕒 **<a href="/safekit-docs/wp-content/uploads/2026/05/safekit-console-timeline.png">timeline 🖼️</a>** that can be helpful to understand what happens in the cluster.</span></div>


<img src="/safekit-docs/wp-content/uploads/2024/03/16-monitoring-prim-second-stop.png" alt="Stop the KVM module on the PRIM server">


### 16\. If necessary, configure a splitbrain checker

  * See [What are the different scenarios in case of network isolation in a cluster?](</safekit-docs/best-practises/power-outage-and-network-isolation-in-a-cluster/>) to know if you need to configure a splitbrain checker.
  * Go to the module configuration and click on `Checkers / Splitbrain` (see image) to edit the splitbrain parameters.
  * `Save and apply` the new configuration to redeploy it on both nodes (module must be stopped on both nodes to save and apply).


**Parameters** :

  * `Resource name` identifies the witness with a resource name: `splitbrain.witness`. You can change this value to identify the witness.
  * `Witness address` is the argument for a ping when a node goes from PRIM to ALONE or from SECOND to ALONE. Change this value with the IP of the witness (a robust element, typically a router).
  * Note: you can set several IPs separated by white spaces. Pay attention that the IP addresses must be accessible from one node but not from the other in the event of network isolation.


<img src="/safekit-docs/wp-content/uploads/2024/04/safekit-split-brain-checker.png" alt="Enter the KVM splitbrain parameters">


### 17\. Replicating snapshots

The directory that contains the snapshot xml files is:
    
    
    /var/lib/libvirt/qemu/snapshot/%VM_NAME%

where `VM_NAME` is the name of the virtual machine (vm1).

Note: If no snapshot has been created, create one to generate the directory (else the SafeKit configuration will fail).

To replicate it:

  * In the module configuration, click on `Advanced Configuration` (see image) to edit `userconfig.xml`.
  * Insert the lines below into the `<rfs>` section of userconfig.xml: 
        
        <replicated dir="/var/lib/libvirt/qemu/snapshot/%VM_NAME%" mode="read_only"> </replicated>

  * `Save and apply` the new configuration to redeploy the modified userconfig.xml file on both nodes (module must be stopped on both nodes to save and apply).
  * Create snapshots on the PRIM node either through virt-manager or a command line: 
        
        virsh snapshot-create-as vm1 snapshot-name

Note: when creating a snapshot with a command line, you have to refresh the snapshot view into virt-manager.


Snapshots created on the PRIM node are operationnal on node 2 after failover, but not listed on node 2.

  * For importing a snapshot on node 2, you have to run the command: 
        
        virsh snapshot-create --redefine vm1 /var/lib/libvirt/qemu/snapshot/vm1/snapshot-name

  * The command line for listing all snapshots of vm1 is: 
        
        virsh snapshot-list vm1


<img src="/safekit-docs/wp-content/uploads/2024/03/21-module-kvm-edit-config-1.png" alt="Enter the KVM parameters">


### 18\. Support

  * For getting support, take 2 SafeKit `Snapshots` (2 .zip files), one for each node.


<div class="callout"><img src="/safekit-docs/wp-content/uploads/2022/07/note.png" alt="Note"><span><a href="/safekit-docs/resources/safekit-support/">More information on the support here</a>.</span></div>


<img src="/safekit-docs/wp-content/uploads/2024/03/30-snapshots-mirror.png" alt="Take the KVM snaphots for support">



<!-- END INSERT: insert-safekit-82-kvm-configuration-en lang="en" display="content" querystring="app=KVM&amp;mod=kvm" -->
 

## Demonstration of a VM-level high availability solution


<!-- BEGIN INSERT: insert-safekit-hyperv-video-en lang="en" display="content" -->
 

### SafeKit Video: Virtual Machine-Level Clustering with Hyper-V (5:15) {#demo-hyperv}

In this video, discover how SafeKit implements **high availability for Hyper-V** without the complexity of a SAN. Learn to configure **virtual machine replication** across two nodes to ensure seamless failover for your critical virtualized workloads. Although this demonstration uses Hyper-V on Windows, the solution works identically with KVM on Linux.

### Chapters

  1. [Architecture overview: 2 Hyper-V nodes and 2 virtual machines](<https://www.youtube.com/watch?v=H18s_-_CpmU&t=0s>) (0:49)
  2. [Configuring the cluster and the hyperv.safe modules](<https://www.youtube.com/watch?v=H18s_-_CpmU&t=49s>) (1:59)
  3. [Live testing: VM replication, migration, and automatic failover on crash](<https://www.youtube.com/watch?v=H18s_-_CpmU&t=168s>) (2:26)


### Step-by-Step Implementation

  * [Read the guide to set up a mirrored Hyper-V cluster on Windows.](</safekit-docs/quick-install/safekit-quick-installation-guide-with-hyper-v/>)
  * [Read the guide to set up a mirrored KVM cluster on Linux.](</safekit-docs/quick-install/safekit-quick-installation-guide-with-kvm/>)


&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 


<!-- END INSERT: insert-safekit-hyperv-video-en lang="en" display="content" -->
 


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