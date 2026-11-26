---
title: "Shared Nothing vs. Shared Disk Architecture: Choosing the Best HA Cluster"
canonical: "https://safekit.eviden.com/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/"
description: "Shared-nothing vs shared-disk architecture for high availability: how SafeKit replicates data between servers to avoid SAN costs and simplify failover."
category: "best-practises"
lang: "en"
topics: "Shared nothing architecture vs shared disk architecture for high availability clusters, Shared Nothing Architecture vs Shared Disk Architecture: Pros and Cons, 🔍 Explore SafeKit"
image: "/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png"
schemaType: "TechArticle"
---

# Shared Nothing vs. Shared Disk Architecture: Choosing the Best HA Cluster {#shared-nothing-vs-shared-disk-architecture-choosing-the-best-ha-cluster}

## Shared nothing architecture vs shared disk architecture for high availability clusters {#shared-nothing-architecture-vs-shared-disk-architecture-for-high-availability-clusters}

### Overview {#overview}

This article compares two architectures for high availability clusters: the shared nothing architecture and the shared disk architecture. It explains their pros and cons. It covers hardware constraints, the impact on application data organization, recovery time and simplicity of implementation.


![Shared nothing architecture vs shared disk architecture](/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png "w:200")


The comparison tables below detail the differences between a shared disk architecture and SafeKit. This software clustering product implements a shared nothing architecture.

### What is a shared disk architecture? {#what-is-a-shared-disk-architecture}

A shared disk architecture is based on two servers that share a disk. In case of hardware or software failure, the application automatically restarts on the other server. Microsoft failover clustering is an example of a shared disk architecture. For details, see [Failover clustering hardware requirements](<https://learn.microsoft.com/en-us/windows-server/failover-clustering/clustering-requirements>).

This architecture has hardware constraints: specific external shared storage, specific cards inside the servers, and specific switches between the servers and the shared storage.

A shared disk architecture has a strong impact on the organization of application data. All application data must be located on the shared disk, so that the application can restart after a failover.

Moreover, on failover, a file system recovery procedure must run on the shared disk. This increases the recovery time objective (RTO).

Finally, the solution is not easy to configure. Hardware skills are required to configure the specific hardware. Application skills are also required to place application data on the shared disk.

### What is a shared nothing architecture ? {#what-is-a-shared-nothing-architecture-}

A shared nothing architecture is based on two servers that replicate data in real time. In case of hardware or software failure, the application automatically restarts on the other server. SafeKit is an example of a shared nothing architecture.

There are two types of data replication: byte-level file replication and block-level disk replication. For details, see [Byte-level file replication vs. block-level disk replication](</best-practises/byte-level-file-replication-vs-block-level-disk-replication/>). This article considers byte-level file replication, because it has many advantages over block-level disk replication.

The shared nothing architecture has no hardware constraints. The servers can be physical or virtual, with any type of disk organization. Real-time file replication runs over the standard network between the servers. [Synchronous replication](</best-practises/synchronous-replication-vs-asynchronous-replication/>) ensures zero data loss.

This architecture has no impact on application data organization. For instance, real-time file replication works even if the application data is on the system disk.

In the event of a failover, the recovery time objective (RTO) is reduced to the application restart time. The application restarts on the replicated files of the secondary server.

Finally, the solution is very simple to configure. You only configure the paths of the directories to replicate.

## Shared Nothing Architecture vs Shared Disk Architecture: Pros and Cons {#shared-nothing-architecture-vs-shared-disk-architecture-pros-and-cons}


{{%  insert-safekit-shared-nothing-vs-shared-disk-table-en  %}}

{{%  insert-safekit-hub-en  %}}

{{%  insert-safekit-4-buttons-en  %}}