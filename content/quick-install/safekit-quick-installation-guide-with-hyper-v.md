---
title: "Hyper-V High Availability with SafeKit: Install the hyperv.safe Module for Failover"
slug: "safekit-quick-installation-guide-with-hyper-v"
canonical: "https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-with-hyper-v/"
description: "SafeKit Video: Virtual Machine-Level Clustering with Hyper-V (5:15) In this video, discover how SafeKit implements high availability for Hyper-V without the complexity of a SAN. Learn to configure virtual machine replication across two nodes to ensure seamless failover for your critical virtualized workloads. Although this demonstration uses Hyper-V on Windows, the solution works identically with […]"
category: "quick-install"
lang: "en"
topics: "High Availability Quick Installation Guide for Hyper-V, SafeKit High Availability Limitations, Overview of the SafeKit / Hyper-V solution, Installation of the SafeKit / Hyper-V solution on Windows (hyperv.safe), Step by step configuration of the SafeKit / Hyper-V solution, Demonstration of the SafeKit / Hyper-V solution, 🔍 SafeKit High Availability Navigation Hub"
---

# Hyper-V High Availability with SafeKit: Install the hyperv.safe Module for Failover


<!-- BEGIN INSERT: insert-safekit-mirror-guide-en lang="en" display="content" querystring="app=Hyper-V&amp;mod=hyperv" -->
 

## High Availability Quick Installation Guide for Hyper-V {#quick-guide}

This guide explains how to set up a **mirror cluster** for Hyper-V using SafeKit, ensuring automatic failover and synchronous replication without the need for shared storage. 

For help, you can use [SafeKit AI 🤖](</resources/safekit-support/>).

### 1\. Overview

  * **Architecture:** Uses a two-node system (Primary/Secondary).
  * **Data Protection:** Implements real-time synchronous replication for **zero data loss** (RPO=0).


### 2\. Installation

  * **Software:** Install the SafeKit engine on both servers.
  * **Module:** Download the pre-configured `hyperv.safe` application module.


### 3\. Configuration

  * **Web Console:** Configure the specific folders containing the Hyper-V files.
  * **Monitoring:** Start monitoring and protecting the Hyper-V application.



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
 


<!-- END INSERT: insert-safekit-mirror-guide-en lang="en" display="content" querystring="app=Hyper-V&amp;mod=hyperv" -->
 

## Overview of the SafeKit / Hyper-V solution

The solution is described here: **[Simple Hyper-V High Availability Without Shared Storage (SAN)](</solutions/hyper-v-replication-automatic-failover-load-balancing/>)**

## Installation of the SafeKit / Hyper-V solution on Windows (hyperv.safe)

### Prerequisites

  * Hyper-V role installed on 2 Windows nodes (embedded for free in all Windows versions including Windows for PC).
  * Critical applications installed inside one or more virtual machines.
  * Maximum 32 virtual machines per Hyper-V host.
  * Total replicated data limited to a few terabytes — beyond this, resynchronization time becomes significant.
  * Minimum 1Gb/s interconnect between nodes (10Gb/s recommended for faster resynchronization).
  * IP failover requires both nodes on the same LAN or extended LAN (L2) — routed L3 networks not supported (except with [cloud load balancers](</resources/safekit-user-guide-82/#Cloud>)).



<!-- BEGIN INSERT: insert-safekit-siemens-license-en lang="en" display="content" -->
 

### About products under Siemens LMS licensing

  * To avoid the broken Siemens license on failover, the dongle containing the Siemens key can be put in a USB over IP device (like DIGI AnywhereUSB).
  * The dongle can also be put in an external PC with the [LMS license server](<https://sid.siemens.com/r/A6V10426066/16779394955__2.6_en-US_16791369099>) on the PC.
  * In recent versions of the Siemens licensing system, the license key can be put in the Trusted Platform Module of the VM.



<!-- END INSERT: insert-safekit-siemens-license-en lang="en" display="content" -->
 


<!-- BEGIN INSERT: insert-safekit-installation-package-windows-en lang="en" display="content" querystring="app=Hyper-V&amp;mod=hyperv" -->
 

### Package installation on Windows

  * Download and install the free version of SafeKit on 2 Windows nodes.   
Note: the free version includes all SafeKit features. At the end of the trial, you can activate permanent license keys without uninstalling the package. 
  * Upon completing the package installation, select **Set console credentials and firewall rules now** and configure a password for the **admin** user of the SafeKit console.   
**Set the same password on all nodes.**
  * Exclude from antivirus scans **C:/safekit/** (the default installation directory) and **all replicated folders** that you are going to define.   
Antiviruses may face detection challenges with SafeKit due to its close integration with the OS, virtual IP mechanisms, real-time replication and restart of critical services. 


[ Download SafeKit (Windows) > ](</resources/safekit-free-trial/>)


<!-- END INSERT: insert-safekit-installation-package-windows-en lang="en" display="content" querystring="app=Hyper-V&amp;mod=hyperv" -->
 


<!-- BEGIN INSERT: insert-safekit-82-installation-module-windows-en lang="en" display="content" querystring="app=Hyper-V&amp;mod=hyperv" -->
 

### Module installation on Windows

  * Download the hyperv.safe module. The module is free. It contains the files userconfig.xml and the restart scripts.
  * Put **hyperv.safe** under **C:/safekit/Application_Modules/generic**.


<a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv.safe" download="hyperv.safe">⬇️ Download hyperv.safe (Windows) ></a> 


<!-- END INSERT: insert-safekit-82-installation-module-windows-en lang="en" display="content" querystring="app=Hyper-V&amp;mod=hyperv" -->
 

## Step by step configuration of the SafeKit / Hyper-V solution


<!-- BEGIN INSERT: insert-safekit-82-hyper-v-configuration-en lang="en" display="content" querystring="app=Hyper-V&amp;mod=hyperv" -->
 


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>Read carefully these items before starting: </span></div>

  * The Hyper-V configuration is presented with a virtual machine named `VM1`. Read carefully "1. Prerequisites" for the **organization of VM1 files** , otherwise recovery on the secondary node may fail with inconsistent data.
  * You will have to repeat this configuration for all VMs that you want to replicate and to restart.
  * The file system where the VM files replicated by SafeKit are stored must be NTFS; **ReFS is not supported**.
  * SafeKit supports replication of **Hyper-V production checkpoints but not standard checkpoints**. Do not use standard checkpoints, otherwise recovery on the secondary node may fail with inconsistent data.


### 1\. Prerequisites {#prerequisite}

For SafeKit replication, all VM1 virtual machine files (configuration file, virtual hard disk, etc.) must be stored in the same folder, even though this is not the default behavior of Hyper‑V (e.g., D:/Repli-Hyper-V/VM1, where VM1 is the name of the virtual machine).

If all the files of VM1 are not in the same folder, use Hyper-V manager:

  * Export VM1 in a folder, for example in D:/Repli-Hyper-V
  * This export will create a folder D:/Repli-Hyper-V/VM1 containing all VM1 files
  * Remove VM1 from the inventory of Hyper-V manager
  * Import VM1, previously exported, into Hyper-V manager


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>Take a snapshot or your VM before starting the procedure.</span></div>


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>VM1 must only be created on a single node. The only thing to create on the other node is the VM1 directory (D:/Repli-Hyper-V/VM1).</span></div>


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>Make sure the virtual switch name(s) referenced by the virtual machine exist on both Hyper-V servers and corresponds to the same physical network.</span></div>


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>Hyper‑V module (hyperv.safe) failover may fail if VM migration prerequisites are not met. To detect compatibility issues between Hyper‑V nodes (hardware, network, configuration), see <a href="https://github.com/FR-LES-SAFEKIT-DEV/safekit-packages/releases/download/v8.2/SafeKit_8.2_Knowledge_Base.pdf">KB SK-0088 in this document</a>.</span></div>

### 2\. Launch the SafeKit console

  * Launch the web console in a browser on one cluster node by connecting to `http://localhost:9010`.
  * Enter `admin` as user name and the password defined during installation.


You can also run the console in a browser on a workstation external to the cluster.


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>The configuration of SafeKit is done on both nodes from a single browser.</span></div>


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>To secure the web console, see <a href="/resources/safekit-user-guide-82/#https">11. Securing the SafeKit web service</a> in the User's Guide.</span></div>


<img src="/wp-content/uploads/2024/03/01-login-large.png" alt="Start the SafeKit web console to configure the Hyper-V cluster">


### 3\. Configure node addresses

  * Enter the node IP addresses, press the `Tab key` to check connectivity and fill node names. If either node1 or node2 has a red color, check connectivity of the browser to both nodes and check firewall on both nodes for [troubleshooting](</resources/safekit-user-guide-82/#Troubleshooting>).
  * Then, click on `Save and apply` to save the configuration.
  * Check the `Success` ✅ message on both nodes.
  * If the configuration `Failure` ❌ occurs on one node, open the ▼ accordion for that node and review the messages. Note that you can use the SafeKit AI 🤖 for assistance.


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>If you want, you can add a new `LAN and nodes` ( first ➕) to create a second heartbeat and a dedicated replication network.</span></div>


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>If you click on `Advanced configuration`, the `cluster.xml` file is displayed. This file is automatically populated by the console and deployed on the nodes.</span></div>


<img src="/wp-content/uploads/2024/03/02-cluster-edit.png" alt="Enter the nodes of the Hyper-V cluster">


### 4\. Select a module

  * In `New module`, click on the `hyperv.safe` module.


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>In the blue banner at the top, 🛜 `node1` represents the console connection node. This node relays requests to `node2` when required.</span></div>


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>The console looks for `xxx.safe` in the `Application_Modules/generic/` directory on the connection node (`node1`) if you placed a module there during installation.</span></div>


<img src="/wp-content/uploads/2024/03/04-module-new.png" alt="Choose the module for Hyper-V">


### 5\. Configure the module

  * Choose an `Automatic` start of the module at boot without delay.
  * Normally, you have a single `Heartbeat` network on which the replication is made. But, you can define a private network if necessary (by adding a LAN at step 3).
  * Put in `VM_PATH`, the root path of the replicated directory (D:/Repli-Hyper-V).
  * Enter in `VM_NAME`, the name of the virtual machine (VM1).


We assume that all VM1 files are in D:/Repli-Hyper-V/VM1 (see [prerequisites](<#prerequisite>)). This directory will be replicated in real-time by SafeKit. Do not perform partial replication, as failover will not work.

The `NORMAL_STOP` and `FORCE_STOP` values can be "`stop`", "`save`" or "`off`":

  * "`stop`" shutdowns the VM when the module is stopped.
  * "`save`" saves the current state of the VM (suspend) when the module is stopped.
  * "`off`" turns off the VM (power off) when the module is stopped.


"`stop`" is recommended because it causes the shutdown then the reboot of the VM when the module is stopped and restarted. Thus, if the application inside the VM fails, it is restarted.

This will be the case, for example, when switching between primary and secondary roles.


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>You do not need to configure a virtual IP address. VM1 will be rebooted on the secondary Hyper-V with its physical IP address, and this IP address will be rerouted.</span></div>


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>When you apply the SafeKit configuration, the `Automatic Start Action` of the virtual machine is set to `Nothing` in Hyper-V. This ensures that the VM does not start automatically when the Hyper‑V host starts, but is instead started only when the module itself is started.</span></div>


<img src="/wp-content/uploads/2024/03/19-module-hyperv-edit-config-1.png" alt="Enter the Hyper-V parameters">


### 6\. Custom checker to detect VM malfunction {#vm-checker}

The custom checker sends heartbeat messages from the host to the VM at regular intervals. It is then the job of the Hyper-V Heartbeat Service installed in the VM to send a response to each of these heartbeat messages.

If the Hyper-V Heartbeat Service does not respond to the message (VM locked up, crashed or ceased to function), then the custom checker executes an action to restart the VM on the same Hyper-V node or on the other.

  * Click on `Checkers / Custom` (see image).
  * Just set a name of your choice in `Resource name` (example VM1). `Resource name` identifies the virtual machine with a resource name in SafeKit: `custom.VM1`.
  * With `restart` in `Action`, the VM is restarted on the same Hyper-V node. After 3 unsuccessful restarts in 24 hours, the SafeKit hyperv module stops on the primary node and there is a failover of the VM on the secondary node.
  * If you set `stopstart` in `Action`, there is a direct failover on the other Hyper-V node as soon as the VM does not respond to heartbeats.


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>For maintenance, if you want to stop the virtual machine, the custom checker will restart it automatically. To avoid that, you can temporarly <a href="/wp-content/uploads/2024/04/safekit-disable-checkers.png">suspend the checker 🖼️</a>. Or you can remove it by deleting the configuration line in the console.</span></div>

It’s the same when you want to restore a checkpoint. Hyper-V will stop the VM to perform the operation, and the VM checker may react negatively by automatically restarting the VM. To avoid this, [suspend the checker 🖼️](</wp-content/uploads/2024/04/safekit-disable-checkers.png>) before proceeding with the operation.


<img src="/wp-content/uploads/2024/04/safekit-custom-checker-hyperv.png" alt="Enter the Hyper-V custom checker parameters">


### 7\. Edit scripts (optional)

  * Do not edit scripts.


### 8\. Communication encryption (optional)

  * Keep encryption of communication between nodes.


<img src="/wp-content/uploads/2024/03/07-module-encryption.png" alt="Communication encryption of the Hyper-V module">


### 9\. Save and apply

  * `Save and apply` the configuration and scripts on both nodes.


<img src="/wp-content/uploads/2024/03/08-module-save.png" alt="Save and apply the Hyper-V module configuration">


### 10\. Verify successful configuration

  * Check the `Success` ✅ message on both nodes and click on `Monitor modules`.
  * If the configuration `Failure` ❌ occurs on one node, open the ▼ accordion for that node and review the messages. Note that you can use the SafeKit AI 🤖 for assistance.


<img src="/wp-content/uploads/2024/03/09-module-save-check.png" alt="Check the Hyper-V module configuration success">


### 11\. Start the node with up-to-date data

  * If node 1 has the up-to-date replicated directory for `VM1/`, select it and ⋯ `Force start` ▶ `As primary`.


When node 2 will be started, all data will be copied from node 1 to node 2.


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If you make the wrong choice, you run the risk of synchronizing outdated data on both nodes.</span></div>


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>It is also assumed that `VM1` is stopped on node 1 so that SafeKit installs the replication mechanisms and then starts `VM1` in the `start_prim` script.</span></div>


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>Use `Start` for subsequent starts: SafeKit retains the most up-to-date server. Starting `As primary` is a special start-up the first time or during exceptional operations.</span></div>


<img src="/wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png" alt="Start as primary the Hyper-V node with the up-to-date data">


### 12\. Wait for the transition to ALONE (green)

  * Node 1 should reach the ALONE (green) state, which means that the `start_prim` script has been executed on node 1.


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If ALONE (green) is not reached or if VM1 is not started, analyze why with the <a href="/wp-content/uploads/2024/03/24-module-log-script.png">module log 🖼️</a> of node 1.</span></div>

  * Click the 🔍 **log** icon of `node1` to open the module log and look for error messages such as a checker detecting an error and stopping the module.
  * Click on `start_prim` in the log: output messages of the script are displayed on the right and errors can be detected such as VM1 incorrectly started.
  * Use the SafeKit AI 🤖 for assistance with log messages.


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If the cluster is in `WAIT (red) not uptodate, STOP (red) not uptodate` state, stop the WAIT node and <a href="/wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png">force its start as primary 🖼️</a>.</span></div>


<img src="/wp-content/uploads/2024/03/12-monitoring-alone-stop.png" alt="The first Hyper-V node starts as primary and becomes ALONE">


### 13\. Start node 2

  * ⋯ `Start` node 2 with its contextual menu.
  * Wait for the SECOND (green) state.


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>Node 2 stays in the SECOND (orange) state while resynchronizing the replicated directories (copy from node 1 to node 2).</span></div>

This may take a while depending on the size of files to resynchronize in replicated directories and the network bandwidth.

To see the progress of the copy, see the [module log 🖼️](</wp-content/uploads/2024/03/27-module-log-reintegration.png>) and the [replication resources 🖼️](</wp-content/uploads/2024/03/26-replication-resources-reintegration.png>) of node 2. Use the SafeKit AI 🤖 for assistance with log messages.


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>When using Hyper-V differencing disks, only the differencing disk needs resynchronization after the initial sync, saving time for large virtual hard disks.</span></div>


<img src="/wp-content/uploads/2024/03/13-monitoring-alone-stop-start.png" alt="Start the Hyper-V node 2">


### 14\. Verify that the cluster is operational

  * Check that the cluster is green/green with `VM1` running on the PRIM node and not running on the SECOND node.


Only changes inside files are replicated in real time in this state.


<img src="/wp-content/uploads/2024/03/14-monitoring-prim-second.png" alt="The Hyper-V node 2 is SECOND (green)">


### 15\. Testing

  * Stop the PRIM node by scrolling down its contextual menu and clicking `Stop`.
  * Verify that there is a failover on the SECOND node which should become ALONE (green).
  * Check with Hyper-V manager that `VM1` is running on node 2.


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If ALONE (green) is not reached on node2 or if VM1 is not started, analyze why with the <a href="/wp-content/uploads/2024/03/38-module-log-script-second.png">module log 🖼️</a> of node 2.</span></div>

  * Click the 🔍 **log** icon of `node2` to open the module log and look for error messages such as a checker detecting an error and stopping the module.
  * Click on `start_prim` in the log: output messages of the script are displayed on the right and errors can be detected such as VM1 incorrectly started.
  * Use the SafeKit AI 🤖 for assistance with log messages.


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>As the `start_prim` script imports the virtual machine on node 2, the failover can fail because of <a href="https://github.com/FR-LES-SAFEKIT-DEV/safekit-packages/releases/download/v8.2/SafeKit_8.2_Knowledge_Base.pdf">Hyper-V settings (see KB SK-0088 in this document)</a>.</span></div>


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>If everything is okay, initiate a start on node1, which will resynchronize the replicated directories from node2.</span></div>

If things go wrong, stop node2 and [force the start as primary 🖼️](</wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png>) of node1, which will restart with its locally healthy data at the time of the stop.


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>Note that you have a 🕒 **<a href="/wp-content/uploads/2026/05/safekit-console-timeline.png">timeline 🖼️</a>** that can be helpful to understand what happens in the cluster.</span></div>


<img src="/wp-content/uploads/2024/03/16-monitoring-prim-second-stop.png" alt="Stop the Hyper-V module on the PRIM server">


### 16\. If necessary, configure a splitbrain checker

  * See [What are the different scenarios in case of network isolation in a cluster?](</best-practises/power-outage-and-network-isolation-in-a-cluster/>) to know if you need to configure a splitbrain checker.
  * Go to the module configuration and click on `Checkers / Splitbrain` (see image) to edit the splitbrain parameters.
  * `Save and apply` the new configuration to redeploy it on both nodes (module must be stopped on both nodes to save and apply).


**Parameters** :

  * `Resource name` identifies the witness with a resource name: `splitbrain.witness`. You can change this value to identify the witness.
  * `Witness address` is the argument for a ping when a node goes from PRIM to ALONE or from SECOND to ALONE. Change this value with the IP of the witness (a robust element, typically a router).
  * Note: you can set several IPs separated by white spaces. Pay attention that the IP addresses must be accessible from one node but not from the other in the event of network isolation.


<img src="/wp-content/uploads/2024/04/safekit-split-brain-checker.png" alt="Enter the Hyper-V splitbrain parameters">


### 17\. Automatic restart if a critical service fails inside the VM

If you want an automatic restart or failover when a critical service inside the VM fails, you can configure the Recovery properties of the service (see image).

First you must configure the [VM custom checker](<#vm-checker>) previously described.

And then in Microsoft Service Manager inside the VM, select your critical service and in the recovery property of the service, you just have to configure shutdown of the VM when the critical service fails.

For that, in the Recovery options of your critical service, choose "**Run a Program** " on failures and in Run program options, set"**C:/Windows/System32/shutdown.exe** " and in "Command line parameters", set **/s /c "service fails"**.

Of course, you can implement more subtle recovery with your own scripts. But just be aware that shutting down the VM will enable the custom checker in the host. The custom checker will detect that the Hyper-V heartbeat is no more responding and will restart the VM on the same Hyper-V server or will make a failover on the other Hyper-V server (depending on its configuration).

To test the feature, use Task Manager and kill the process (End task) associated to the critical service. A clean stop of the service through Service Manager or the "net stop" command does not trigger the recovery action inside Windows Service Manager.


<img src="/wp-content/uploads/2023/11/hyperv-critical-service.png" alt="Hyper-V VM critical services failover of Hyper-V module">


### 18\. Support

  * For getting support, take 2 SafeKit `Snapshots` (2 .zip files), one for each node.


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span><a href="/resources/safekit-support/">More information on the support here</a>.</span></div>


<img src="/wp-content/uploads/2024/03/30-snapshots-mirror.png" alt="Take the Hyper-V snaphots for support">



<!-- END INSERT: insert-safekit-82-hyper-v-configuration-en lang="en" display="content" querystring="app=Hyper-V&amp;mod=hyperv" -->
 

## Demonstration of the SafeKit / Hyper-V solution


<!-- BEGIN INSERT: insert-safekit-hyperv-video-en lang="en" display="content" -->
 

### SafeKit Video: Virtual Machine-Level Clustering with Hyper-V (5:15) {#demo-hyperv}

In this video, discover how SafeKit implements **high availability for Hyper-V** without the complexity of a SAN. Learn to configure **virtual machine replication** across two nodes to ensure seamless failover for your critical virtualized workloads. Although this demonstration uses Hyper-V on Windows, the solution works identically with KVM on Linux.

### Chapters

  1. [Architecture overview: 2 Hyper-V nodes and 2 virtual machines](<https://www.youtube.com/watch?v=H18s_-_CpmU&t=0s>) (0:49)
  2. [Configuring the cluster and the hyperv.safe modules](<https://www.youtube.com/watch?v=H18s_-_CpmU&t=49s>) (1:59)
  3. [Live testing: VM replication, migration, and automatic failover on crash](<https://www.youtube.com/watch?v=H18s_-_CpmU&t=168s>) (2:26)


### Step-by-Step Implementation

  * [Read the guide to set up a mirrored Hyper-V cluster on Windows.](</quick-install/safekit-quick-installation-guide-with-hyper-v/>)
  * [Read the guide to set up a mirrored KVM cluster on Linux.](</quick-install/safekit-quick-installation-guide-with-kvm/>)


&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 


<!-- END INSERT: insert-safekit-hyperv-video-en lang="en" display="content" -->
 


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