---
title: "使用 SafeKit 实现 Milestone XProtect 高可用性：安装用于故障转移的 milestone.safe 模块"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server/"
description: "部署 SafeKit 的 milestone.safe 模块，在 Windows 上为 Milestone XProtect 启用同步实时复制和自动故障转移。本指南介绍如何为关键应用设置一个无需共享存储的双节点 SANless 集群。"
category: "quick-install"
lang: "zh-hans"
topics: "Milestone XProtect 高可用性快速安装指南、SafeKit 高可用性限制、SafeKit / Milestone XProtect 解决方案概述、在 Windows 上安装 SafeKit / Milestone XProtect 解决方案 (milestone.safe)、SafeKit / Milestone XProtect 解决方案分步配置、SafeKit mirror 解决方案演示、🔍 SafeKit 高可用性导航中心"
---

# 使用 SafeKit 实现 Milestone XProtect 高可用性：安装用于故障转移的 milestone.safe 模块 {#milestone-xprotect-high-availability-with-safekit-install-the-milestonesafe-module-for-failover}


{{%  insert-safekit-mirror-guide-zh-hans app="Milestone XProtect" mod="milestone"  %}}


## SafeKit / Milestone XProtect 解决方案概述 {#overview-of-the-safekit--milestone-xprotect-solution}

解决方案介绍请见：**💡[最简单的 Milestone XProtect 高可用性：双节点同步复制与故障转移](</zh-hans/solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/>)**。

## 在 Windows 上安装 SafeKit / Milestone XProtect 解决方案 (milestone.safe) {#installation-of-the-safekit--milestone-xprotect-solution-on-windows-milestonesafe}

### 先决条件 {#prerequisites}

  * 需要在 2 个节点（虚拟机或物理服务器）上安装 Milestone XProtect Management 和 SQL。SQL Server 和 Event Server 可以位于外部，请参阅以下说明。


ℹ️ 注意：SQL Server 可以位于外部。在这种情况下，请在 milestone.safe 分步配置的第 4 步中执行以下操作：

  * 删除 SQL Data 和 Log 文件夹的复制，
  * 删除 sqlservr.exe 的进程检查器，
  * 从 SERVICES 宏中删除 MSSQLServer。


您可以使用 **💡[SafeKit 和 sqlserver.safe 模块](</solutions/sql-server-high-availability-synchronous-replication-failover/>)**实现外部 SQL Server 的冗余。

在这种情况下，请在两个 Management 节点上使用 sqlserver.safe 模块的虚拟 IP 地址配置 [Milestone Management 与 SQL 的连接](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>)（注册表项 HKEY_LOCAL_MACHINE > SOFTWARE > VideoOSServerConnectionString）。

ℹ️ 注意：Event Server 可以位于 Management Server 之外。

这种情况下有两个集群，分别安装 milestone.safe：一个用于 Management 集群，另一个用于 Event 集群。

对于 Management 集群，请在 milestone.safe 分步配置的第 4 步中：

  * 从 SERVICES 宏中删除 MilestoneEventServerService。


对于 Event 集群，请在 milestone.safe 分步配置的第 4 步中：

  * 从 SERVICES 宏中删除 MSSQLServer、Milestone XProtect Management Server 和 Milestone XProtect Log Server，
  * 删除 SQL Data 和 Log 文件夹的复制，
  * 删除 sqlservr.exe 的进程检查器，
  * 在分步配置过程中，使用 **Management 集群**的虚拟 IP 地址[注册](</wp-content/uploads/2022/07/milestone-management-server-register-2020.png>) Event Server（或从 Download Manager 安装 Event Server，并在安装过程中设置 **Management 集群**的虚拟 IP 地址），
  * 在 Milestone management client 中，在 [Registered Services](</wp-content/uploads/2022/07/milestone-url-vip.png>) 中将 Event Server 设置为 **Event 集群**的虚拟 IP 地址。


### ℹ️ Recorder 冗余 {#ℹ-recorder-redundancy}

  * 由于数据量较大，Recorder 复制不适用于 SafeKit。
  * 可以使用 Milestone 集成的解决方案（不进行实时复制的故障转移录制服务器）。
  * 两个 Recorder 也可以采用主动/主动配置运行，并分配摄像机，以便发生故障时不会丢失同一区域的所有摄像机。
  * 还可以通过 [Vega / RMF](<https://vega25.com/>) 解决方案将每个摄像机的流发送到两个 Recorder。


ℹ️ 如果要在 SafeKit 集群中将 Milestone 从版本 N 迁移到版本 N+1，请阅读本文：🛠️ [使用 SafeKit 迁移 Milestone Management](</quick-install/safekit-quick-installation-guide-milestone-migration/>)


{{%  insert-safekit-installation-package-windows-zh-hans app="Milestone XProtect and SQL" mod="milestone"  %}}

{{%  insert-safekit-82-installation-module-windows-zh-hans app="Milestone XProtect and SQL" mod="milestone"  %}}


## SafeKit / Milestone XProtect 解决方案分步配置 {#step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


{{%  insert-safekit-82-milestone-configuration-zh-hans app="Milestone XProtect and SQL" mod="milestone"  %}}


## SafeKit mirror 解决方案演示 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}
