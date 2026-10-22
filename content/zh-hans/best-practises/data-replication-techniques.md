---
title: "高可用性数据复制技术：全面比较"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/data-replication-techniques/"
description: "比较数据库、磁盘和文件级数据复制技术。了解 SafeKit 为何采用无 SAN 架构实现简单的实时同步复制，从而避免数据丢失，并在 Windows 和 Linux 上实现自动故障转移。"
category: "best-practises"
lang: "zh-hans"
topics: "数据库、磁盘或文件级数据复制技术, 数据复制技术对比表, SafeKit 高可用导航中心"
---

# 高可用性数据复制技术：全面比较 {#data-replication-techniques-for-high-availability-a-complete-comparison}

## 数据库、磁盘或文件级数据复制技术？ {#data-replication-techniques-at-database-level-disk-level-or-file-level}

### 概述 {#overview}

本文介绍高可用集群中数据库、磁盘和文件级数据复制技术的优缺点，并讨论故障转移、故障恢复和实施的简易程度。

![数据复制技术](/wp-content/uploads/2023/03/data-replication-techniques.png "w:128")

以下对比表详细说明高可用软件 SafeKit 实现的数据复制技术。

### 什么是数据库级数据复制？ {#what-is-the-data-replication-technique-at-database-level}

数据库管理系统会在两台服务器之间复制日志文件，例如 [SQL Server 事务日志](<https://learn.microsoft.com/en-us/sql/relational-databases/logs/the-transaction-log-sql-server>)。

要实现自动故障转移，必须使用同步复制；否则，最近已确认的事务在故障转移后无法在辅助服务器上恢复。

这种技术复制数据库，但不复制应用程序的其他数据。许多应用程序的故障转移还需要复制配置文件等其他数据。

如果服务器崩溃并丢失部分数据库文件，故障恢复不会自动完成。需要由有经验的 DBA 在故障服务器上还原数据库。

### 什么是磁盘级数据复制？ {#what-is-the-data-replication-technique-at-disk-level}

它会在两台服务器之间复制磁盘内的更改，例如 [DRBD](<https://linbit.com/drbd/>)。

要实现零数据丢失的自动故障转移，磁盘之间必须进行同步复制。

这种技术可以复制数据库和其他文件，但会显著影响应用数据的组织方式：所有数据都必须位于复制磁盘上。如果待复制数据位于系统磁盘，这可能无法实现，因为每台服务器的系统磁盘必须保持独立。

配置带文件系统的复制磁盘以及将应用数据放置在该磁盘上，需要专业技能。

### 什么是文件级数据复制？ {#what-is-the-data-replication-technique-at-file-level}

它会在两台服务器之间复制文件内的更改，例如 [SafeKit](/zh-hans/)。

要实现零数据丢失的自动故障转移，需要[实时同步复制](/zh-hans/best-practises/synchronous-replication-vs-asynchronous-replication/)。

这种技术可以复制数据库和其他文件，而无需改变应用数据的组织方式。例如，即使应用数据位于系统磁盘，实时文件复制也能正常工作。

配置非常简单，只需指定要复制的目录路径即可。

## 数据复制技术对比表 {#comparative-tables-between-data-replication-techniques}

{{% insert-safekit-mirror-comparison-table-zh-hans %}}

{{% insert-safekit-hub-zh-hans %}}

{{% insert-safekit-4-buttons-zh-hans %}}