---
title: "Microsoft SQL Server High Availability with SafeKit: Install the sqlserver.safe Module for Failover"
slug: "safekit-quick-installation-guide-with-microsoft-sql-server"
canonical: "https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/"
description: "SafeKit Video: Application-Level Clustering (8:47) In this video, discover how SafeKit implements a mirror HA cluster without the complexity of a SAN. While this demonstration uses Microsoft SQL Server, the solution works identically for other databases and applications. Chapters 2 nodes with SQL Server (0:32) Configure the cluster and the mirror.safe module (3:58) Start and […]"
category: "quick-install"
lang: "en"
topics: "High Availability Quick Installation Guide for Microsoft SQL Server, SafeKit High Availability Limitations, Overview of the SafeKit / Microsoft SQL Server solution, Installation of the SafeKit / Microsoft SQL Server solution on Windows (sqlserver.safe), Step by step configuration of the SafeKit / Microsoft SQL Server solution, Demonstration of the SafeKit mirror solution, 🔍 SafeKit High Availability Navigation Hub"
---

# Microsoft SQL Server High Availability with SafeKit: Install the sqlserver.safe Module for Failover


{{%  insert-safekit-mirror-guide-en app="Microsoft SQL Server" mod="sqlserver" %}}
 

## Overview of the SafeKit / Microsoft SQL Server solution

For a detailed overview of the solution, see **[The Simplest Microsoft SQL Server High Availability: 2-Node Synchronous Replication& Failover](</solutions/sql-server-high-availability-synchronous-replication-failover/>)**.

## Installation of the SafeKit / Microsoft SQL Server solution on Windows (sqlserver.safe)

### Prerequisites

  * You need Microsoft SQL Server installed on 2 nodes (virtual machines or physical servers).
  * SafeKit works with all versions of SQL including SQL Express.


  * The [SQL system databases](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (like master.mdf and mastlog.ldf) must be located in the same directories on both nodes. The directories will be configured as replicated at step 4 in the step by step configuration.
  * SQL must be also installed at the same location in the file system on both nodes because the read-only [SQL resource database](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) is located in the binary and is required for the failover. This database does not need to be replicated.
  * The SQL user databases (.mdf and .ldf) must be located in the same directories on both nodes. The directories will be configured as replicated at step 4 in the step by step configuration.



{{%  insert-safekit-installation-package-windows-en app="Microsoft SQL Server" mod="sqlserver" %}}
 


{{%  insert-safekit-82-installation-module-windows-en app="Microsoft SQL Server" mod="sqlserver" %}}
 

## Step by step configuration of the SafeKit / Microsoft SQL Server solution


{{%  insert-safekit-82-configuration-en app="Microsoft SQL Server" mod="sqlserver" %}}
 

## Demonstration of the SafeKit mirror solution


{{%  insert-safekit-mirror-video-en %}}
 


{{%  insert-safekit-hub-en %}}
 


{{%  insert-safekit-4-buttons-en %}}