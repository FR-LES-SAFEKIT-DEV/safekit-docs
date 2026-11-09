---
title: "Milestone XProtect 高可用性与 SafeKit：安装 milestone.safe 模块以实现故障转移"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server/"
description: "部署 milestone.safe 模块以实现 SafeKit，从而实现 Windows 上 Milestone XProtect 的同步实时复制和自动故障转移。本指南将引导您为没有共享存储的关键应用程序设置一个 2 节点 SANless 集群。"
category: "quick-install"
lang: "zh-hans"
topics: "Milestone XProtect 高可用性快速安装指南、SafeKit 高可用性限制、SafeKit/Milestone XProtect 解决方案概述、在 Windows 上安装 SafeKit/Milestone XProtect 解决方案 (milestone.safe)、SafeKit/Milestone XProtect 解决方案的分步配置、SafeKit mirror 解决方案演示、🔍 探索 SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# Milestone XProtect 高可用性与 SafeKit：安装 milestone.safe 模块以实现故障转移 {#milestone-xprotect-high-availability-with-safekit-install-the-milestonesafe-module-for-failover}


{{%  insert-safekit-mirror-guide-zh-hans app="Milestone XProtect" mod="milestone"  %}}
 

## SafeKit/Milestone XProtect 解决方案概述 {#overview-of-the-safekit--milestone-xprotect-solution}

解决方案在此处介绍：**💡 [最简单的 Milestone XProtect 高可用性：双节点同步复制和故障转移](</zh-hans/solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/>)**。

## 在 Windows 上安装 SafeKit/Milestone XProtect 解决方案 (milestone.safe) {#installation-of-the-safekit--milestone-xprotect-solution-on-windows-milestonesafe}

### 先决条件 {#prerequisites}

  * 您需要在 2 个节点（虚拟机或物理服务器）上安装 Milestone XProtect Management 和 SQL。SQL Server 和事件服务器可以是外部的，请参阅下面的注释。


ℹ️ 注意：SQL Server 可以是外部的。在这种情况下，在 milestone.safe 的分步配置期间的步骤 4：

  * 删除 SQL 数据和日志文件夹的复制
  * 移除 sqlservr.exe 上的进程检查器，
  * 从宏 SERVICES 中删除 MSSQLServer。


您可以使用 💡 [SafeKit 和 sqlserver.safe 模块](</zh-hans/solutions/sql-server-high-availability-synchronous-replication-failover/>)来实现外部 SQL Server 的冗余。

在这种情况下，在两个管理节点上，将[Milestone Management 与 SQL 的连接](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>)配置为 sqlserver.safe 模块的虚拟 IP 地址（注册表项 HKEY_LOCAL_MACHINE > SOFTWARE > VideoOSServerConnectionString）。

ℹ️ 注意：事件服务器可以位于管理服务器外部。

在这种情况下，您有两个集群，每个集群都安装了 milestone.safe：一个用于管理集群，另一个用于事件集群。

对于管理集群，在 milestone.safe 的分步配置过程中，第 4 步：

  * 从 SERVICES 宏中移除 MilestoneEventServerService。


对于“事件”集群，在 milestone.safe 的分步配置过程中，执行步骤 4：

  * 从 SERVICES 宏中删除：MSSQLServer、Milestone XProtect Management Server、Milestone XProtect Log Server
  * 删除 SQL 数据和日志文件夹的复制
  * 移除 sqlservr.exe 上的进程检查器，
  * 在逐步配置过程中，使用**管理集群**的虚拟 IP 地址[注册](</wp-content/uploads/2022/07/milestone-management-server-register-2020.png>)事件服务器（或从下载管理器安装事件服务器，并在安装过程中设置**管理集群**的虚拟 IP 地址），
  * 在 Milestone 管理客户端中，将[“已注册服务”](</wp-content/uploads/2022/07/milestone-url-vip.png>)中的事件服务器设置为**事件集群**的虚拟 IP 地址。


### ℹ️ 录音机冗余 {#ℹ-recorder-redundancy}

  * 由于数据量大，记录器的复制不适用于 SafeKit。
  * 集成到 Milestone 中的解决方案可用于（故障转移录像服务器，无实时复制）。
  * 两台录像机也可以在双活配置下运行，摄像机分布在不同区域，这样即使发生故障，也不会丢失同一区域的所有摄像机。
  * 通过[Vega/RMF](<https://vega25.com/>)解决方案，每台摄像机的视频流也可以发送到两台录像机。


ℹ️ 如果在 SafeKit 集群中将 Milestone 从版本 N 迁移到版本 N+1，请阅读本文： 🛠️ [使用 SafeKit 进行 Milestone 管理迁移](</zh-hans/quick-install/safekit-quick-installation-guide-milestone-migration/>)


{{%  insert-safekit-installation-package-windows-zh-hans app="Milestone XProtect and SQL" mod="milestone"  %}}

{{%  insert-safekit-82-installation-module-windows-zh-hans app="Milestone XProtect and SQL" mod="milestone"  %}}
 

## SafeKit/Milestone XProtect 解决方案的分步配置 {#step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


{{%  insert-safekit-82-milestone-configuration-zh-hans app="Milestone XProtect and SQL" mod="milestone"  %}}
 

## SafeKit mirror 解决方案演示 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}