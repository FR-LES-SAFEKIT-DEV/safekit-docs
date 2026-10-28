---
title: "Microsoft SQL Server高可用性（需配合SafeKit使用）：安装sqlserver.safe模块以实现故障转移"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/"
description: "为SafeKit部署sqlserver.safe模块，以启用Microsoft SQL Server的同步实时复制和自动故障转移。本指南将引导您设置一个适用于关键应用程序且无需共享存储的双节点无 SAN 集群。"
category: "quick-install"
lang: "zh-hans"
topics: "Microsoft 、 SQL Server 、 SafeKit高可用性快速安装指南；高可用性限制； SafeKit / Microsoft SQL Server解决方案概述；在Windows ( sqlserver.safe ) 上安装SafeKit / Microsoft SQL Server解决方案； SafeKit / Microsoft SQL Server解决方案分步配置； SafeKit mirror解决方案演示；🔍 SafeKit高可用性导航中心"
---

# Microsoft SQL Server高可用性，配合SafeKit ：安装sqlserver.safe模块以实现故障转移{#microsoft-sql-server-high-availability-with-safekit-install-the-sqlserversafe-module-for-failover}


{{%  insert-safekit-mirror-guide-zh-hans app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## SafeKit / Microsoft SQL Server解决方案概述{#overview-of-the-safekit--microsoft-sql-server-solution}

有关解决方案的详细概述，请参阅** 💡 [最简单的Microsoft SQL Server高可用性：2 节点同步复制和故障转移](</solutions/sql-server-high-availability-synchronous-replication-failover/>) ** 。

## 在Windows ( sqlserver.safe ) {#installation-of-the-safekit--microsoft-sql-server-solution-on-windows-sqlserversafe}上安装SafeKit / Microsoft SQL Server解决方案

### 先决条件{#prerequisites}

  * 您需要在 2 个节点（虚拟机或物理服务器）上安装Microsoft SQL Server 。
  * SafeKit可与所有版本的 SQL 兼容，包括 SQL Express。


  * [ SQL 系统数据库](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) （例如 master.mdf 和 mastlog.ldf）必须位于两个节点上的相同目录中。这些目录将在分步配置的步骤 4 中配置为复制。
  * SQL 必须安装在两个节点文件系统中的相同位置](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) [二进制文件中，并且是故障转移所必需的。此数据库无需复制。
  * SQL 用户数据库（.mdf 和 .ldf 文件）必须位于两个节点上的相同目录中。这些目录将在分步配置的第 4 步中配置为复制。



{{%  insert-safekit-installation-package-windows-zh-hans app="Microsoft SQL Server" mod="sqlserver"  %}}

{{%  insert-safekit-82-installation-module-windows-zh-hans app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## SafeKit / Microsoft SQL Server解决方案{#step-by-step-configuration-of-the-safekit--microsoft-sql-server-solution}的逐步配置


{{%  insert-safekit-82-configuration-zh-hans app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}解决方案的演示


{{%  insert-safekit-mirror-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}