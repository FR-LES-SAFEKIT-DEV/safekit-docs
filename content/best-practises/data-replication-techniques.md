---
title: "Data Replication Techniques for High Availability: A Complete Comparison"
slug: "data-replication-techniques"
canonical: "https://safekit.eviden.com/best-practises/data-replication-techniques/"
description: "Data Replication Techniques for High Availability: A Complete Comparison Data replication techniques at database level, disk level or file level?"
category: "best-practises"
lang: "en"
topics: "Data replication techniques at database level, disk level or file level?, Comparative tables between data replication techniques, 🔍 SafeKit High Availability Navigation Hub"
---

# Data Replication Techniques for High Availability: A Complete Comparison

## Data replication techniques at database level, disk level or file level?

### Overview

This article explores the pros and cons of data replication techniques at database level, disk level and file level for high availability clusters. We are looking at failover, failback, simplicity of implementation.


<img src="/wp-content/uploads/2023/03/data-replication-techniques.png" width="128" alt="Data replication techniques">


The following comparative tables explain in detail the data replication techniques implemented by SafeKit, a high availability software product.

### What is the data replication technique at database level?

It is the replication of log files between two servers made by the database management system (like the [SQL Server log](<https://learn.microsoft.com/en-us/sql/relational-databases/logs/the-transaction-log-sql-server>)).

For an automatic failover, it is mandatory to have synchronous replication otherwise the data of the last validated transactions will not be recovered on the secondary server after a failover.

This data replication technique replicates a database but not the other data of an application. Failover of many applications also requires the replication of other data such as configuration files.

When a server crashes and loses some database files, failback is not automatic. A skilled DBA must restore the database on the failed server.

### What is the data replication technique at disk level?

It is the replication of modifications inside disks between two servers (like [DRBD](<https://linbit.com/drbd/>)).

For an automatic failover, synchronous replication between the disks is mandatory for having 0 data loss.

This data replication technique can replicate databases as well as other files. But, there is a strong impact on the organization of application data. All data must be localized in the relicated disk. This may be impossible if some data to replicate are in the system disk, because this disk must remain specific to each server.

Skills are required to configure a replicated disk with a file system and to configure application data in the replicated disk.

### What is the data replication technique at file level?

It is the replication of modifications inside files between two servers (like [SafeKit](</>)).

For an automatic failover, [real-time synchronous replication](</best-practises/synchronous-replication-vs-asynchronous-replication/>) is required for having 0 data loss.

This data replication technique can replicate databases as well as other files. There is no impact on data organization for an application. For instance, if an application has its data in the system disk, real-time file replication is working.

The solution is very simple to configure as only the paths of directories to replicate are configured.

## Comparative tables between data replication techniques


{{%  insert-safekit-mirror-comparison-table-en %}}
 


{{%  insert-safekit-hub-en %}}
 


{{%  insert-safekit-4-buttons-en %}}