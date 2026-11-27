---
title: "Active-Active Clustering Software with Real-Time Replication & Mutual Failover"
canonical: "https://safekit.eviden.com/architectures/active-active-cluster-real-time-replication/"
description: "Active-active SafeKit cluster: two servers back each other up with several mirror modules, synchronous replication and mutual failover on Windows and Linux."
category: "architectures"
lang: "en"
topics: "How Does an Active-Active Cluster with Real-Time Replication Work?"
hashpart: "how-the-active-active-cluster-with-real-time-replication-works"
image: "/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png"
schemaType: "TechArticle"
---

# Active-Active Clustering Software with Real-Time Replication & Mutual Failover {#active-active-clustering-software-with-real-time-replication--mutual-failover}

## How Does an Active-Active Cluster with Real-Time Replication Work? {#how-the-active-active-cluster-with-real-time-replication-works}

### Active-Active Cluster with Real-Time Replication {#active--active-cluster-with-real-time-replication}

Two servers run applications and back each other up. This is called mutual failover: each server is the backup of the other server. Each application uses its own replicated file directories.


![SafeKit active active cluster with real-time replication](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


If one server fails in an active-active cluster, all applications run on the remaining server. When the failed server restarts, each application returns to its default primary server.

### How Does It Work? {#how-it-works}

To configure an active-active cluster with SafeKit, you simply deploy two mirror modules with real-time replication. Each mirror module has its own configuration: a virtual IP address, real-time replicated directories, and restart scripts.

Notes:

  * Both applications (Appli1 and Appli2) must be installed on each server for application failover.
  * This architecture is not limited to two applications. You can deploy up to 25 application modules on the same two servers.
  * Each mirror module has its own virtual IP address, its own replicated file directories, and its own recovery scripts.


### Example of an Active-Active Cluster {#example-of-an-active-active-cluster}

The 💡 [Hyper-V](</solutions/hyper-v-replication-automatic-failover-load-balancing/>) or 💡 [KVM](</solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>) solution is an example of an active-active cluster. This solution provides replication, automatic failover, and load balancing of virtual machines. In this cluster, N mirror modules replicate N virtual machines between two physical servers.

In this configuration, each mirror module replicates a full virtual machine and restarts it if a failure occurs.

This type of module does not need a virtual IP address. When the virtual machine restarts on the other server, its own IP address moves with it automatically.

In this architecture, the critical application is installed inside a virtual machine.


{{%  insert-safekit-hub-en  %}}

{{%  insert-safekit-4-buttons-en  %}}