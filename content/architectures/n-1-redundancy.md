---
title: "N-1 Redundancy Cluster: High Availability for Multiple Applications with a Single Backup Server"
canonical: "https://safekit.eviden.com/architectures/n-1-redundancy/"
description: "Optimize your data center with SafeKit N-1 redundancy. Deploy N mirror modules on N+1 servers to provide high availability for multiple applications with a single shared backup server. Eliminate SAN requirements and reduce hardware costs with real-time replication for Windows and Linux. Learn more."
category: "architectures"
lang: "en"
topics: "High availability with data replication and application failover from N servers to 1, 🔍 Explore SafeKit"
image: "/wp-content/uploads/2023/02/safekit-n-1-300-3.png"
---

# N-1 Redundancy Cluster: High Availability for Multiple Applications with a Single Backup Server {#n-1-redundancy-clustering-high-availability-for-multiple-applications-with-one-backup}

## High availability with data replication and application failover from N servers to 1 {#high-availability-with-data-replication-and-application-failover-from-n-servers-to-1}

### N-1 redundancy {#n-1-redundancy}


![N-1 redundancy cluster with SafeKit](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


### How Does N-1 Redundancy Work? {#how-the-n-1-redundancy-works}

SafeKit provides a simple N-1 redundancy cluster: N applications run on N primary servers, and a single backup server takes over in case of failure. In a SafeKit N-1 redundancy cluster, each application works on its own replicated directories.

Unlike in an [active-active cluster](</architectures/active-active-cluster-real-time-replication/>), when one primary server fails, the backup server does not have to handle a double workload.

This assumes that only one primary server fails at a time in the N-1 redundancy cluster. The solution can also handle several primary server failures at the same time. In this case, the single backup server runs the combined workload of all the failed servers.

### How to Implement N-1 Redundancy? {#how-to-implement-n-1-redundancy}

To configure a SafeKit N-1 redundancy cluster, simply deploy N mirror modules on N+1 servers.

Notes:

  * All applications (Appli1, Appli2, Appli3) must be installed on the backup server for application failover.
  * Each mirror module has its own virtual IP address, its own replicated file directories and its own recovery scripts.



{{%  insert-safekit-hub-en  %}}

{{%  insert-safekit-4-buttons-en  %}}