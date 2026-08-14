---
title: "Shared Nothing vs. Shared Disk Architecture: Choosing the Best HA Cluster"
slug: "shared-nothing-architecture-vs-shared-disk-architecture"
canonical: "https://safekit.eviden.com/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/"
description: "Shared Nothing vs. Shared Disk Architecture: Choosing the Best HA Cluster Shared nothing architecture vs shared disk architecture for high availability clusters"
category: "best-practises"
lang: "en"
topics: "Shared nothing architecture vs shared disk architecture for high availability clusters, Shared Nothing Architecture vs Shared Disk Architecture: Pros and Cons, Video comparing a shared disk architecture and a shared nothing architecture when considering disaster recovery, 🔍 SafeKit High Availability Navigation Hub"
---

# Shared Nothing vs. Shared Disk Architecture: Choosing the Best HA Cluster

## Shared nothing architecture vs shared disk architecture for high availability clusters

### Overview

This article explores the pros and cons of shared nothing architecture vs shared disk architecture for high availability clusters. We are looking at hardware constraints, impact on application data organization, recovery time, simplicity of implementation.


<img src="/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png" width="200" alt="Shared nothing architecture vs shared disk architecture">


The following comparative tables explain in detail the difference between shared disk architecture and SafeKit, a software clustering product implementing a shared nothing architecture.

### What is a shared disk architecture?

A shared disk architecture (like with [Microsoft failover cluster](<https://learn.microsoft.com/en-us/windows-server/failover-clustering/clustering-requirements>)) is based on 2 servers sharing a disk with an automatic application failover in case of hardware of software failures.

This architecture has hardware constraints: the specific external shared storage, the specific cards to install inside the servers, and the specific switches between the servers and the shared storage.

A shared disk architecture has a strong impact on the organization of application data. All application data must be localized in the shared disk for a restart after a failover.

Moreover, on failover, the file system recovery procedure must be executed on the shared disk. This increases the recovery time (RTO).

Finally, the solution is not easy to configure because skills are required to configure the specific hardware. Additionally, application skills are required to configure application data in the shared disk.

### What is a shared nothing architecture ?

A shared nothing architecture (like with [SafeKit](</>)) is based on 2 servers replicating data in real-time with an automatic application failover in case of hardware of software failures.

There are two types of data replication: [byte level file replication vs block level disk replication](</best-practises/byte-level-file-replication-vs-block-level-disk-replication/>). We consider here byte level file replication because it has many advantages against block level disk replication.

The shared nothing architecture has no hardware constraints: the servers can be physical or virtual with any type of disk organization. Real-time file replication ([synchronous](</best-practises/synchronous-replication-vs-asynchronous-replication/>) for having 0 data loss) is made through the standard network between servers.

This architecture has no impact on application data organization. For instance, if an application has its data in the system disk, real-time file replication is working.

Recovery time (RTO) in the event of a failover is reduced to the application restart time on the secondary server's replicated files.

Finally, the solution is very simple to configure as only the paths of directories to replicate are configured.

## Shared Nothing Architecture vs Shared Disk Architecture: Pros and Cons


{{%  insert-safekit-shared-nothing-vs-shared-disk-table-en %}}
 

## Video comparing a shared disk architecture and a shared nothing architecture when considering disaster recovery

### Video content

This video first illustrates the work to be done with a shared disk architecture when the two servers of a high availability cluster must be placed on two remote sites.

Next, the video demonstrates the same use case with the SafeKt shared nothing architecture.

### SafeKit Video: Disaster recovery with a shared disk and a shared nothing cluster (2:25)


{{%  insert-safekit-hub-en %}}
 


{{%  insert-safekit-4-buttons-en %}}