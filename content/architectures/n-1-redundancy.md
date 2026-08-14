---
title: "N-1 Redundancy Clustering: High Availability for Multiple Applications with One Backup"
slug: "n-1-redundancy"
canonical: "https://safekit.eviden.com/architectures/n-1-redundancy/"
description: "N-1 Redundancy Clustering: High Availability for Multiple Applications with One Backup High availability with data replication and application failover from N servers to 1"
category: "architectures"
lang: "en"
topics: "High availability with data replication and application failover from N servers to 1, 🔍 SafeKit High Availability Navigation Hub"
---

# N-1 Redundancy Clustering: High Availability for Multiple Applications with One Backup

## High availability with data replication and application failover from N servers to 1

### N-1 redundancy


<img src="/wp-content/uploads/2023/02/safekit-n-1-300-3.png" width="300" alt="SafeKit N-1 redundancy cluster">


### How the N-1 redundancy works?

SafeKit provides a simple N-1 redundancy cluster with N applications running on N servers and with a single backup for failover. In a SafeKit N-1 redundancy cluster, each application works on its own replicated directories.

In case of failure of one primary server unlike the [active-active cluster](</architectures/active-active-cluster-real-time-replication/>), the backup server doesn't have to handle a double workload.

This assumes there is only one failure at a time in the N-1 redundancy cluster. The solution can support multiple primary servers failures at the same time, but in this case the single backup server will have to handle the combined workload of all the failed servers.

### How to implement N-1 redundancy?

The SafeKit N-1 redundancy cluster is simply configured by deploying N mirror modules on N+1 servers.

Note that:

  * all applications (Appli1, Appli2, Appli3) must be installed on the single backup for application failover,
  * each mirror module will have its own virtual IP address, its own replicated file directories and its own recovery scripts.



{{%  insert-safekit-hub-en %}}
 


{{%  insert-safekit-4-buttons-en %}}