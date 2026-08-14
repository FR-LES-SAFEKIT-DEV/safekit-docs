---
title: "Podman High Availability with SafeKit: Install the mirror.safe Module for Failover"
slug: "safekit-quick-installation-guide-with-podman"
canonical: "https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-with-podman/"
description: "SafeKit Video: Application-Level Clustering (8:47) In this video, discover how SafeKit implements a mirror HA cluster without the complexity of a SAN. While this demonstration uses Microsoft SQL Server, the solution works identically for other databases and applications. Chapters 2 nodes with SQL Server (0:32) Configure the cluster and the mirror.safe module (3:58) Start and […]"
category: "quick-install"
lang: "en"
topics: "High Availability Quick Installation Guide for Podman, SafeKit High Availability Limitations, Overview of the SafeKit / Podman solution, Installation of the SafeKit / Podman solution on Linux (mirror.safe), Step by step configuration of the SafeKit / Podman solution, Demonstration of the SafeKit mirror solution, 🔍 SafeKit High Availability Navigation Hub"
---

# Podman High Availability with SafeKit: Install the mirror.safe Module for Failover


{{%  insert-safekit-mirror-guide-en app="Podman" mod="mirror" %}}
 

## Overview of the SafeKit / Podman solution

The solution is described here: **[SafeKit: Podman High Availability& Real-Time Data Replication Software](</solutions/podman-the-simplest-high-availability-cluster-between-two-redundant-servers/>)**.

## Installation of the SafeKit / Podman solution on Linux (mirror.safe)

### Prerequisites

  * You need the Podman application that you want to restart in SafeKit installed on 2 nodes (virtual machines or physical servers).



{{%  insert-safekit-installation-package-linux-en mod="mirror" %}}
 

### Example with a simple container image

In this example, we will show how SafeKit could manage a nginx (web server) container, ie : replication of a directory accessed in the container and restart of the container on another node in case of failure.

#### Prerequisites

  * Create a replicated directory **on both nodes**  
Create a directory **/replicated_dir_path** that will be replicated by SafeKit and that will contain html pages served by nginx
  * Populate this directory with an initial html file **on both nodes**
        
        cp index.html /replicated_dir_path

  * Create a container **on both nodes**  
Create a nginx container on both nodes that bind the **/replicated_dir_path** directory to **/usr/share/nginx/html** : 
        
        podman container create --name mynginx -v /replicated_dir_path:/usr/share/nginx/html -p 9011:80 nginx


#### SafeKit configuration

  * Go to the **step-by-step configuration** section
  * Create and configure a **mirror.safe** module
  * Set a **virtual IP address** that will be switched in case of failure
  * Set **/replicated_dir_path** as a replicated directory
  * Put respectively in start_prim and stop_prim scripts: **podman start mynginx** and **podman stop mynginx**  
Note: You may have to use "podman start --security-opt label=disable mynginx" with SE Linux.
  * Deploy and start the SafeKit mirror module


#### Tests

  * Test access to nginx at **http://vitual-ip:9011/index.html**
  * Test replication:  
On the node in SafeKit PRIM state, add some other html files to the replicated directory: 
        
        cp page.html /replicated_dir_path

  * Stop the mirror module on the node in SafeKit PRIM state
  * Test that container has been restarted on the secondary node
  * Test access to **http://vitual-ip:9011/index.html** and to **http://vitual-ip:9011/page.html**


## Step by step configuration of the SafeKit / Podman solution


{{%  insert-safekit-82-configuration-en app="Podman" mod="mirror" %}}
 

## Demonstration of the SafeKit mirror solution


{{%  insert-safekit-mirror-video-en %}}
 


{{%  insert-safekit-hub-en %}}
 


{{%  insert-safekit-4-buttons-en %}}