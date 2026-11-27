---
title: "使用 SafeKit 实现 Microsoft SQL Server 高可用性：安装 sqlserver.safe 模块以实现故障转移"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/"
description: "分步指南：安装 SafeKit sqlserver.safe 模块，在两台服务器上实现 Microsoft SQL Server 的实时复制和自动故障转移。"
category: "quick-install"
lang: "zh-hans"
topics: "SafeKit/Microsoft SQL Server 解决方案概述, 在 Windows 上安装 SafeKit/Microsoft SQL Server 解决方案 (sqlserver.safe), SafeKit/Microsoft SQL Server 解决方案的分步配置, SafeKit mirror 解决方案演示"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# 使用 SafeKit 实现 Microsoft SQL Server 高可用性：安装 sqlserver.safe 模块以实现故障转移 {#microsoft-sql-server-high-availability-with-safekit-install-the-sqlserversafe-module-for-failover}


{{%  insert-safekit-mirror-guide-zh-hans app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## SafeKit/Microsoft SQL Server 解决方案概述 {#overview-of-the-safekit--microsoft-sql-server-solution}

有关解决方案的详细概述，请参阅 **💡 [最简单的 Microsoft SQL Server 高可用性：2 节点同步复制和故障转移](</zh-hans/solutions/sql-server-high-availability-synchronous-replication-failover/>)**。

## 在 Windows 上安装 SafeKit/Microsoft SQL Server 解决方案 (sqlserver.safe) {#installation-of-the-safekit--microsoft-sql-server-solution-on-windows-sqlserversafe}

### 先决条件 {#prerequisites}

  * 您需要在 2 个节点（虚拟机或物理服务器）上安装 Microsoft SQL Server。
  * SafeKit 可与所有版本的 SQL 配合使用，包括 SQL Express。


  * [SQL 系统数据库](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>)（如 master.mdf 和 mastlog.ldf）必须位于两个节点上的同一目录中。这些目录将在分步配置的第 4 步中配置为复制。
  * SQL 也必须安装在两个节点的文件系统的同一位置，因为只读[SQL 资源数据库](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>)位于二进制文件中，并且是故障转移所必需的。此数据库不需要复制。
  * SQL 用户数据库（.mdf 和 .ldf）必须位于两个节点上的同一目录中。这些目录将在分步配置的步骤 4 中配置为复制。



{{%  insert-safekit-installation-package-windows-zh-hans app="Microsoft SQL Server" mod="sqlserver"  %}}

{{%  insert-safekit-82-installation-module-windows-zh-hans app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## SafeKit/Microsoft SQL Server 解决方案的分步配置 {#step-by-step-configuration-of-the-safekit--microsoft-sql-server-solution}


{{%  insert-safekit-82-configuration-zh-hans app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## SafeKit mirror 解决方案演示 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}