---
title: "Nedap High Availability with SafeKit: Install the nedap.safe Module for Failover"
slug: "safekit-quick-installation-guide-with-nedap"
canonical: "https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-with-nedap/"
description: "SafeKit Video: Application-Level Clustering (8:47) In this video, discover how SafeKit implements a mirror HA cluster without the complexity of a SAN. While this demonstration uses Microsoft SQL Server, the solution works identically for other databases and applications. Chapters 2 nodes with SQL Server (0:32) Configure the cluster and the mirror.safe module (3:58) Start and […]"
category: "quick-install"
lang: "en"
topics: "High Availability Quick Installation Guide for Nedap, SafeKit High Availability Limitations, Overview of the SafeKit / Nedap solution, Installation of the SafeKit / Nedap solution on Windows (nedap.safe), Step by step configuration of the SafeKit / Nedap solution, Demonstration of the SafeKit mirror solution, 🔍 SafeKit High Availability Navigation Hub"
---

# Nedap High Availability with SafeKit: Install the nedap.safe Module for Failover


{{%  insert-safekit-mirror-guide-en app="Nedap" mod="nedap" %}}
 

## Overview of the SafeKit / Nedap solution

The solution is described here: **[The Simplest Nedap High Availability: 2-Node Synchronous Replication& Failover](</solutions/nedap-high-availability-synchronous-replication-failover/>)**.

## Installation of the SafeKit / Nedap solution on Windows (nedap.safe)

**All details on the [configuration of Nedap AOES and SQL with SafeKit are in this document](</wp-content/uploads/documents/NEDAP_AEOS_CLUSTER_SAFEKIT.pdf>).**

### Prerequisites

  * You need Nedap AEOS and SQL installed on 2 nodes (virtual machines or physical servers).
  * With SQL Server on the same node as Nedap AEOS, configure the connection of Nedap AEOS to SQL with the virtual IP address and not with the physical IP address of the server. Else the failover will not work. SQL Server can be external, see the note below.


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>Note: SQL Server can be external. In this case, at step 4 during the step by step configuration:</span></div>

  * remove the replication of SQL Data and Log folders,
  * remove the process checker on sqlservr.exe,
  * remove MSSQLServer from the SERVICES macro.


You can implement redundancy of the external SQL Server with [SafeKit and the sqlserver.safe module](</solutions/sql-server-high-availability-synchronous-replication-failover/>). In this case, configure the connection of Nedap AEOS to SQL with the virtual IP address of the sqlserver.safe module.


{{%  insert-safekit-installation-package-windows-en app="Nedap AEOS and SQL" mod="nedap" %}}
 


{{%  insert-safekit-82-installation-module-windows-en app="Nedap AEOS and SQL" mod="nedap" %}}
 

## Step by step configuration of the SafeKit / Nedap solution


{{%  insert-safekit-82-configuration-en app="Nedap AEOS and SQL" mod="nedap" %}}
 

## Demonstration of the SafeKit mirror solution


{{%  insert-safekit-mirror-video-en %}}
 


{{%  insert-safekit-hub-en %}}
 


{{%  insert-safekit-4-buttons-en %}}