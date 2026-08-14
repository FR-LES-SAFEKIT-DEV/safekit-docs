---
title: "Docker High Availability with SafeKit: Install the mirror.safe Module for Failover"
slug: "safekit-quick-installation-guide-with-docker"
canonical: "https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-with-docker/"
description: "SafeKit Video: Application-Level Clustering (8:47) In this video, discover how SafeKit implements a mirror HA cluster without the complexity of a SAN. While this demonstration uses Microsoft SQL Server, the solution works identically for other databases and applications. Chapters 2 nodes with SQL Server (0:32) Configure the cluster and the mirror.safe module (3:58) Start and […]"
category: "quick-install"
lang: "en"
topics: "High Availability Quick Installation Guide for Docker, SafeKit High Availability Limitations, Overview of the SafeKit / Docker solution, Installation of the SafeKit / Docker solution on Linux (mirror.safe), Step by step configuration of the SafeKit / Docker solution, Demonstration of the SafeKit mirror solution, 🔍 SafeKit High Availability Navigation Hub"
---

# Docker High Availability with SafeKit: Install the mirror.safe Module for Failover


{{%  insert-safekit-mirror-guide-en app="Docker" mod="mirror" %}}
 

## Overview of the SafeKit / Docker solution

The solution is described here: **[SafeKit: Docker High Availability& Real-Time Data Replication Software](</solutions/docker-container-high-availability-cluster-synchronous-replication-failover/>)  
**.

## Installation of the SafeKit / Docker solution on Linux (mirror.safe)

### Prerequisites

  * You need the Docker application that you want to restart in SafeKit installed on 2 nodes (virtual machines or physical servers).



{{%  insert-safekit-installation-package-linux-en mod="mirror" %}}
 

### Example 1 with a Docker compose application

With a Docker compose application, you have a **docker-compose.yml** file describing the application and all its containers.

  * First, on both servers, install the docker compose application without starting it: **docker-compose -f docker-compose.yml up --no-start**
  * On one server, for each volume in docker-compose.yml, run this command: **docker volume inspect volume_name**  
It will return the **host directories of the docker volumes** (these paths are not given in docker-compose.yml).  
You will get a list of paths as **/var/lib/docker/volumes/ <volume_name>/_data**
  * Go to the **step-by-step configuration** section and 
    * deploy the **mirror.safe** module
    * set a **virtual IP address** that will be switched in case of failure
    * set the list of **/var/lib/docker/volumes/ <volume_name>/_data** as **replicated directories**
    * put respectively in start_prim and stop_prim scripts: **/usr/local/bin/docker-compose -f docker-compose.yml --no-ansi start** and **/usr/local/bin/docker-compose -f docker-compose.yml --no-ansi stop**


### Example 2 with a Docker application starting a set of containers

We suppose here a Docker application **myappli** starting a set of containers.

  * First, on both servers, install **myappli** without starting it
  * On one server, list volumes used by myapply: **ls /var/lib/docker/volumes**  
Thus, you will get a list of paths as **/var/lib/docker/volumes/ <volume_name>/_data**
  * Go to the **step-by-step configuration** section and 
    * deploy the **mirror.safe** module
    * set a **virtual IP address** that will be switched in case of failure
    * set the list of **/var/lib/docker/volumes/ <volume_name>/_data** as **replicated directories**
    * put respectively in start_prim and stop_prim scripts: **/.../myappli start** and **/.../myappli stop**


### Example 3 with a simple Docker image

The configuration is presented on the example of the nginx Docker image (web server).

  * Docker volume creation  
On both servers, create a docker volume with the same name: **docker volume create replicated_vol**  
Get the directory path where the volume is stored on the host: **docker volume inspect replicated_vol**  
(for example : **/var/lib/docker/storage/replicated_vol/_data**)
  * Docker container creation  
On both servers, create a nginx docker container that bind to the previous volume: **docker container create --name mynginx -v replicated_vol:/usr/share/nginx/html -p 9011:80 nginx**  
Populate the volume with some index.html file: **docker cp index.html mynginx:/usr/share/nginx/html/index.html**
  * Go to the **step-by-step configuration** section and 
    * deploy the **mirror.safe** module
    * set a **virtual IP address** that will be switched in case of failure
    * set **/var/lib/docker/storage/replicated_vol/_data** as a replicated directory
    * put respectively in start_prim and stop_prim scripts: **docker start mynginx** and **docker stop mynginx**
    * after SafeKit configuration, test access to index.html with **http://vitual-ip:9011**


## Step by step configuration of the SafeKit / Docker solution


{{%  insert-safekit-82-configuration-en app="Docker" mod="mirror" %}}
 

## Demonstration of the SafeKit mirror solution


{{%  insert-safekit-mirror-video-en %}}
 


{{%  insert-safekit-hub-en %}}
 


{{%  insert-safekit-4-buttons-en %}}