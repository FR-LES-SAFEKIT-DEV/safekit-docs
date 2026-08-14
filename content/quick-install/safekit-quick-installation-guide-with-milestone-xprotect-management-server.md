---
title: "Milestone XProtect High Availability with SafeKit: Install the milestone.safe Module for Failover"
slug: "safekit-quick-installation-guide-with-milestone-xprotect-management-server"
canonical: "https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server/"
description: "SafeKit Video: Application-Level Clustering (8:47) In this video, discover how SafeKit implements a mirror HA cluster without the complexity of a SAN. While this demonstration uses Microsoft SQL Server, the solution works identically for other databases and applications. Chapters 2 nodes with SQL Server (0:32) Configure the cluster and the mirror.safe module (3:58) Start and […]"
category: "quick-install"
lang: "en"
topics: "High Availability Quick Installation Guide for Milestone XProtect, SafeKit High Availability Limitations, Overview of the SafeKit / Milestone XProtect solution, Installation of the SafeKit / Milestone XProtect solution on Windows (milestone.safe), Step by step configuration of the SafeKit / Milestone XProtect solution, Demonstration of the SafeKit mirror solution, 🔍 SafeKit High Availability Navigation Hub"
---

# Milestone XProtect High Availability with SafeKit: Install the milestone.safe Module for Failover


{{%  insert-safekit-mirror-guide-en app="Milestone XProtect" mod="milestone" %}}
 

## Overview of the SafeKit / Milestone XProtect solution

The solution is described here: **[The Simplest Milestone XProtect High Availability: 2-Node Synchronous Replication& Failover](</solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/>)**.

## Installation of the SafeKit / Milestone XProtect solution on Windows (milestone.safe)

### Prerequisites

  * You need Milestone XProtect Management and SQL installed on 2 nodes (virtual machines or physical servers). SQL Server and Event Srver can be external, see the notes below.


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>Note: SQL Server can be external. In this case, at step 4 during the step by step configuration of milestone.safe:</span></div>

  * remove the replication of SQL Data and Log folders,
  * remove the process checker on sqlservr.exe,
  * remove MSSQLServer from the macro SERVICES.


You can implement redundancy of the external SQL Server with [SafeKit and the sqlserver.safe module](</solutions/sql-server-high-availability-synchronous-replication-failover/>).

In this case on both management nodes, configure the [connection of Milestone Management to SQL](<https://doc.milestonesys.com/en-US/bundle/doc1040_2026r1/page/content/standard_features/sf_mc/sf_maintenance/mc_managingthesqlserver.htm>) with the virtual IP address of the sqlserver.safe module (registry key HKEY_LOCAL_MACHINESOFTWAREVideoOSServerConnectionString).


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>Note: The Event server can be external to the Management server.</span></div>

In this case, you have 2 clusters with 2 installations of milestone.safe: one for the Management cluster, the other one for the Event cluster.

For the Management cluster, at step 4 during the step by step configuration of milestone.safe:

  * remove MilestoneEventServerService from the SERVICES macro.


And for the Event cluster, at step 4 during the step by step configuration of milestone.safe:

  * remove from the SERVICES macro: MSSQLServer, Milestone XProtect Management Server, Milestone XProtect Log Server,
  * remove the replication of SQL Data and Log folders,
  * remove the process checker on sqlservr.exe,
  * during the step-by-step configuration, [register](</wp-content/uploads/2022/07/milestone-management-server-register-2020.png>) the Event server with the virtual IP address of the **Management cluster** (or install the Event server from the Download Manager and set the virtual IP address of the **Management cluster** during the installation),
  * in the Milestone management client, set the Event Server with the virtual IP address of the **Event cluster** in the [Registered Services](</wp-content/uploads/2022/07/milestone-url-vip.png>).


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>### Recorder redundancy</span></div>

  * Replication of recorders is not suitable for SafeKit due to the volume of data.
  * The solution integrated into Milestone can be used (failover recording server without real-time replication).
  * Two recorders can also run in an active/active configuration and the cameras are distributed so as not to lose all the cameras in the same area in the event of a failure.
  * The stream from each camera can also be sent to two recorders with the [Vega / RMF](<https://vega25.com/>) solution.


<div class="callout"><img src="/wp-content/uploads/2022/07/note.png" alt="Note"><span>In case of migration of Milestone from version N to version N+1 in a SafeKit cluster, read this article: <a href="/quick-install/safekit-quick-installation-guide-milestone-migration/">Milestone Management Migration with SafeKit</a></span></div>


{{%  insert-safekit-installation-package-windows-en app="Milestone XProtect and SQL" mod="milestone" %}}
 


{{%  insert-safekit-82-installation-module-windows-en app="Milestone XProtect and SQL" mod="milestone" %}}
 

## Step by step configuration of the SafeKit / Milestone XProtect solution


{{%  insert-safekit-82-milestone-configuration-en app="Milestone XProtect and SQL" mod="milestone" %}}
 

## Demonstration of the SafeKit mirror solution


{{%  insert-safekit-mirror-video-en %}}
 


{{%  insert-safekit-hub-en %}}
 


{{%  insert-safekit-4-buttons-en %}}