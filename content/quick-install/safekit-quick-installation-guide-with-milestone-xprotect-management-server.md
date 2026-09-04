---
title: "Milestone XProtect High Availability with SafeKit: Install the milestone.safe Module for Failover - SafeKit HA"
canonical: "https://safekit.eviden.com/quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server/"
description: "Deploy the milestone.safe module for SafeKit to enable synchronous real-time replication and automatic failover of Milestone XProtect on Windows. This guide walks you through setting up a 2-node SANless cluster for critical applications without shared storage."
category: "quick-install"
lang: "en"
topics: "High Availability Quick Installation Guide for Milestone XProtect, SafeKit High Availability Limitations, Overview of the SafeKit / Milestone XProtect solution, Installation of the SafeKit / Milestone XProtect solution on Windows (milestone.safe), Step by step configuration of the SafeKit / Milestone XProtect solution, Demonstration of the SafeKit mirror solution, 🔍 SafeKit High Availability Navigation Hub"
---

# Milestone XProtect High Availability with SafeKit: Install the milestone.safe Module for Failover


{{%  insert-safekit-mirror-guide-en app="Milestone XProtect" mod="milestone"  %}}
 

## Overview of the SafeKit / Milestone XProtect solution

The solution is described here: **💡[The Simplest Milestone XProtect High Availability: 2-Node Synchronous Replication & Failover](</solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/>)**.

## Installation of the SafeKit / Milestone XProtect solution on Windows (milestone.safe)

### Prerequisites

  * You need Milestone XProtect Management and SQL installed on 2 nodes (virtual machines or physical servers). SQL Server and Event Srver can be external, see the notes below.


ℹ️ Note: SQL Server can be external. In this case, at step 4 during the step by step configuration of milestone.safe:

  * remove the replication of SQL Data and Log folders,
  * remove the process checker on sqlservr.exe,
  * remove MSSQLServer from the macro SERVICES.


You can implement redundancy of the external SQL Server with 💡 [SafeKit and the sqlserver.safe module](</solutions/sql-server-high-availability-synchronous-replication-failover/>).

In this case on both management nodes, configure the [connection of Milestone Management to SQL](<https://doc.milestonesys.com/en-US/bundle/doc1040_2026r1/page/content/standard_features/sf_mc/sf_maintenance/mc_managingthesqlserver.htm>) with the virtual IP address of the sqlserver.safe module (registry key HKEY_LOCAL_MACHINESOFTWAREVideoOSServerConnectionString).

ℹ️ Note: The Event server can be external to the Management server.

In this case, you have 2 clusters with 2 installations of milestone.safe: one for the Management cluster, the other one for the Event cluster.

For the Management cluster, at step 4 during the step by step configuration of milestone.safe:

  * remove MilestoneEventServerService from the SERVICES macro.


And for the Event cluster, at step 4 during the step by step configuration of milestone.safe:

  * remove from the SERVICES macro: MSSQLServer, Milestone XProtect Management Server, Milestone XProtect Log Server,
  * remove the replication of SQL Data and Log folders,
  * remove the process checker on sqlservr.exe,
  * during the step-by-step configuration, [register](</wp-content/uploads/2022/07/milestone-management-server-register-2020.png>) the Event server with the virtual IP address of the **Management cluster** (or install the Event server from the Download Manager and set the virtual IP address of the **Management cluster** during the installation),
  * in the Milestone management client, set the Event Server with the virtual IP address of the **Event cluster** in the [Registered Services](</wp-content/uploads/2022/07/milestone-url-vip.png>).


### ℹ️ Recorder redundancy

  * Replication of recorders is not suitable for SafeKit due to the volume of data.
  * The solution integrated into Milestone can be used (failover recording server without real-time replication).
  * Two recorders can also run in an active/active configuration and the cameras are distributed so as not to lose all the cameras in the same area in the event of a failure.
  * The stream from each camera can also be sent to two recorders with the [Vega / RMF](<https://vega25.com/>) solution.


ℹ️ In case of migration of Milestone from version N to version N+1 in a SafeKit cluster, read this article: 🛠️ [Milestone Management Migration with SafeKit](</quick-install/safekit-quick-installation-guide-milestone-migration/>)


{{%  insert-safekit-installation-package-windows-en app="Milestone XProtect and SQL" mod="milestone"  %}}
 


{{%  insert-safekit-82-installation-module-windows-en app="Milestone XProtect and SQL" mod="milestone"  %}}
 

## Step by step configuration of the SafeKit / Milestone XProtect solution


{{%  insert-safekit-82-milestone-configuration-en app="Milestone XProtect and SQL" mod="milestone"  %}}
 

## Demonstration of the SafeKit mirror solution


{{%  insert-safekit-mirror-video-en  %}}
 


{{%  insert-safekit-hub-en  %}}
 


{{%  insert-safekit-4-buttons-en  %}}