---
title: "SafeKit quick installation guide in Azure (mirror.safe module for real-time replication and failover)"
slug: "safekit-quick-installation-guide-in-azure-with-real-time-replication-and-failover"
canonical: "https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-in-azure-with-real-time-replication-and-failover/"
description: "SafeKit Video: Application-Level Clustering (8:47) In this video, discover how SafeKit implements a mirror HA cluster without the complexity of a SAN. While this demonstration uses Microsoft SQL Server, the solution works identically for other databases and applications. Chapters 2 nodes with SQL Server (0:32) Configure the cluster and the mirror.safe module (3:58) Start and […]"
category: "quick-install"
lang: "en"
topics: "High Availability Quick Installation Guide for Azure, SafeKit High Availability Limitations, Overview of the SafeKit / Azure mirror solution, Installation of the SafeKit / Azure mirror solution on Windows and Linux (mirror.safe), Step by step configuration of the SafeKit / Azure mirror solution, Demonstration of the SafeKit mirror solution, 🔍 SafeKit High Availability Navigation Hub"
---

# Azure High Availability with SafeKit: Install the mirror.safe Module for Failover


{{%  insert-safekit-mirror-guide-en app="Azure" mod="mirror" %}}
 

## Overview of the SafeKit / Azure mirror solution

The solution is described here: **[Microsoft Azure High Availability: SafeKit Synchronous Replication& Failover](</solutions/azure-high-availability-cluster-synchronous-replication-failover/>)**.

## Installation of the SafeKit / Azure mirror solution on Windows and Linux (mirror.safe)

### Configuration of the Microsoft Azure load balancer

The load balancer must be configured if you want to implement a virtual IP address.  
And the load balancer must be configured to periodically send health packets to nodes.  
For that, SafeKit provides a health check which runs inside the nodes and which

  * returns OK when the mirror module state is PRIM (green) or ALONE (green)
  * returns NOT FOUND in all other states


You must configure the Microsoft Azure load balancer with:

  * HTTP protocol
  * port 9010, the SafeKit web server port
  * URL /var/modules/mirror/ready.txt (if mirror is the module name that you will deploy later)


For more information, see [the configuration of the Microsoft Azure load balancer](<https://learn.microsoft.com/en-us/azure/load-balancer/>). 


<div class="callout callout-warning"><img src="/wp-content/uploads/2022/07/warning-small.png" alt="Warning"><span>Do not configure a virtual IP address at step 4 in the step by step configuration below. The virtual IP address is already set in the Microsoft Azure load balancer. Setting a virtual IP at step 4 is useful for on-premise configuration only.</span></div>

### Configuration of the Microsoft Azure network security

The network security must be configured to enable communications for the following protocols and ports:

  * UDP - 4800 for the safeadmin service (between SafeKit nodes)
  * UDP - 8888 for the module heartbeat (between SafeKit nodes)
  * TCP – 5600 for the module real time file replication (between SafeKit nodes)
  * TCP – 9010 for the load-balancer health check and for the SafeKit web console running in the http mode
  * TCP – 9001 to configure the https mode for the console
  * TCP – 9453 for the SafeKit web console running in https mode



{{%  insert-safekit-installation-package-windows-en mod="mirror" %}}
 


{{%  insert-safekit-installation-package-linux-en mod="mirror" %}}
 

Note: the generic **mirror.safe** module that you are going to configure is delivered inside the package.

## Step by step configuration of the SafeKit / Azure mirror solution


{{%  insert-safekit-82-configuration-en app="Windows" mod="mirror" %}}
 

## Demonstration of the SafeKit mirror solution


{{%  insert-safekit-mirror-video-en %}}
 


{{%  insert-safekit-hub-en %}}
 


{{%  insert-safekit-4-buttons-en %}}