---
title: "Data Replication Techniques for High Availability: A Complete Comparison"
canonical: "https://safekit.eviden.com/best-practises/data-replication-techniques/"
description: "Compare data replication techniques at the database, disk and file level. The SafeKit software provides simple, real-time synchronous replication without shared storage. It ensures zero data loss and automatic failover on Windows and Linux."
category: "best-practises"
lang: "en"
topics: "Data replication techniques at database level, disk level or file level?, Comparative tables between data replication techniques, 🔍 Explore SafeKit"
image: "/wp-content/uploads/2023/03/data-replication-techniques.png"
schemaType: "TechArticle"
---

# Data Replication Techniques for High Availability: A Complete Comparison {#data-replication-techniques-for-high-availability-a-complete-comparison}

## Data replication techniques at database level, disk level or file level? {#data-replication-techniques-at-database-level-disk-level-or-file-level}

### Overview {#overview}

This article compares the pros and cons of data replication techniques at database level, disk level and file level in high availability clusters. It looks at three criteria: failover, failback and simplicity of implementation.


![Data replication techniques](/wp-content/uploads/2023/03/data-replication-techniques.png "w:128")


The comparison tables below explain in detail the data replication techniques implemented by SafeKit, a high availability software product.

### What is the data replication technique at database level? {#what-is-the-data-replication-technique-at-database-level}

The database management system replicates its log files between two servers. An example is the [SQL Server transaction log](<https://learn.microsoft.com/en-us/sql/relational-databases/logs/the-transaction-log-sql-server>).

Automatic failover requires synchronous replication. Otherwise, the data of the last committed transactions is lost on the secondary server after a failover.

This technique replicates a database, but not the other data of an application. However, the failover of many applications also requires other data to be replicated, such as configuration files.

When a server crashes and loses some database files, the failback is not automatic. A skilled DBA must restore the database on the failed server.

### What is the data replication technique at disk level? {#what-is-the-data-replication-technique-at-disk-level}

The modifications inside a disk are replicated between two servers. An example is the [DRBD open source software](<https://linbit.com/drbd/>).

To avoid any data loss on automatic failover, the replication between the disks must be synchronous.

This technique can replicate databases as well as other files. But it has a strong impact on the organization of application data. All data must be stored on the replicated disk. This may be impossible if some data to replicate is on the system disk, because each server must keep its own system disk.

Specific skills are required to configure a replicated disk with a file system. Skills are also required to move the application data to the replicated disk.

### What is the data replication technique at file level? {#what-is-the-data-replication-technique-at-file-level}

The modifications inside files are replicated between two servers. An example is the [SafeKit high availability software](</>).

To avoid any data loss on automatic failover, [real-time synchronous replication](</best-practises/synchronous-replication-vs-asynchronous-replication/>) is required.

This technique can replicate databases as well as other files. It has no impact on the data organization of an application. For example, real-time file replication works even if the application data is on the system disk.

The solution is very simple to configure. You only configure the paths of the directories to replicate.

## Comparative tables between data replication techniques {#comparative-tables-between-data-replication-techniques}


{{%  insert-safekit-mirror-comparison-table-en  %}}

{{%  insert-safekit-hub-en  %}}

{{%  insert-safekit-4-buttons-en  %}}