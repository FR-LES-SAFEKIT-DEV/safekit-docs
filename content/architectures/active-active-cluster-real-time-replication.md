---
title: "Active-Active Clustering Software with Real-Time Replication & Mutual Failover"
slug: "active-active-cluster-real-time-replication"
canonical: "https://safekit.eviden.com/architectures/active-active-cluster-real-time-replication/"
description: "Active-Active Clustering Software with Real-Time Replication & Mutual Failover How the active active cluster with real-time replication works?"
category: "architectures"
lang: "en"
topics: "How the active active cluster with real-time replication works?, 🔍 SafeKit High Availability Navigation Hub"
---

# Active-Active Clustering Software with Real-Time Replication & Mutual Failover

## How the active active cluster with real-time replication works?

### Active- active cluster with real-time replication

Applications are running on two servers in mutual failover. Each server is backup of the other server. And each application works on its own replicated file directories.


<img src="/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png" width="300" alt="SafeKit active active cluster with real-time replication">


If one server fails in an active active cluster, all applications will be active on the same server. After restart of the failed server, applications will return to run on their default primary server.

### How it works?

The SafeKit active active cluster is simply configured by deploying two mirror modules with real-time replication. Each mirror module contains its own configuration of virtual IP address, real-time replicated directories and restart scripts.

Note that:

  * the 2 applications Appli1 and Appli2 must be installed on each server for application failover,
  * this architecture is not reduced to 2 applications: N application modules can be deployed on 2 servers with a maximum of 25 modules,
  * each mirror module will have its own virtual IP address, its own replicated file directories and its own recovery scripts.


### Example of an active active cluster

The [Hyper-V](</solutions/hyper-v-replication-automatic-failover-load-balancing/>) or [KVM](</solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>) solution with replication, automatic failover and load balancing of VMs is an example of an active-active cluster with N mirror modules replicating N virtual machines between two physical servers.

In this configuration, a mirror module replicates a full virtual machine and restarts the virtual machine in case of failure. 

There is no virtual IP address in such a module because restarting a VM on a server makes automatically the failover of the VM physical IP address. 

And a critical application is installed inside a VM in this architecture.


{{%  insert-safekit-hub-en %}}
 


{{%  insert-safekit-4-buttons-en %}}