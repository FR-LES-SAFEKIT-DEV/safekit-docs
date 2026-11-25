---
title: "高可用性数据复制技术：完整比较"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/data-replication-techniques/"
description: "比较数据库、磁盘和文件级别的数据复制技术。SafeKit 提供简单、实时的同步复制，无需共享存储。它确保零数据丢失，并在 Windows 和 Linux 上实现自动故障转移。"
category: "best-practises"
lang: "zh-hans"
topics: "数据库层面的数据复制技术、磁盘级别还是文件级别？、数据复制技术对比表、🔍 探索 SafeKit"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-19.15 | Translation LLM | 54 expressions"
image: "/wp-content/uploads/2023/03/data-replication-techniques.png"
---

# 高可用性数据复制技术：完整比较 {#data-replication-techniques-for-high-availability-a-complete-comparison}

## 数据库级、磁盘级还是文件级的数据复制技术？ {#data-replication-techniques-at-database-level-disk-level-or-file-level}

### 概述 {#overview}

本文比较了高可用性集群中数据库级、磁盘级和文件级数据复制技术的优缺点。它着眼于三个标准：故障转移、回切和实施的简易性。


![数据复制技术](/wp-content/uploads/2023/03/data-replication-techniques.png "w:128")


下表详细解释了高可用性软件产品 SafeKit 所采用的数据复制技术。

### 什么是数据库层面的数据复制技术？ {#what-is-the-data-replication-technique-at-database-level}

数据库管理系统在两台服务器之间复制其日志文件。[SQL Server 事务日志](<https://learn.microsoft.com/en-us/sql/relational-databases/logs/the-transaction-log-sql-server>)就是一个示例。

自动故障转移需要同步复制。否则，故障转移后，辅助服务器上最后一次提交的事务数据将丢失。

此技术可复制数据库，但不能复制应用程序的其他数据。但是，许多应用程序的故障转移还需要复制其他数据，例如配置文件。

当服务器崩溃并丢失一些数据库文件时，回切不是自动的。熟练的 DBA 必须在故障服务器上恢复数据库。

### 什么是磁盘级数据复制技术？ {#what-is-the-data-replication-technique-at-disk-level}

磁盘内部的修改会在两台服务器之间进行复制。[DRBD 开源软件](<https://linbit.com/drbd/>)就是一个例子。

为避免自动故障转移时发生任何数据丢失，磁盘之间的复制必须是同步的。

此技术可以复制数据库以及其他文件。但它对应用程序数据的组织有很大影响。所有数据都必须存储在复制的磁盘上。如果某些要复制的数据位于系统磁盘上，则这可能是不可能的，因为每个服务器都必须保留其自己的系统磁盘。

配置带有文件系统的复制磁盘需要特定的技能。将应用程序数据移动到复制磁盘也需要技能。

### 什么是文件级数据复制技术？ {#what-is-the-data-replication-technique-at-file-level}

文件内部的修改会在两台服务器之间进行复制。[SafeKit 高可用性软件](</zh-hans/>)就是一个例子。

为避免自动故障转移时发生任何数据丢失，需要进行[实时同步复制](</zh-hans/best-practises/synchronous-replication-vs-asynchronous-replication/>)。

此技术可以复制数据库以及其他文件。它不会影响应用程序的数据组织。例如，即使应用程序数据位于系统磁盘上，实时文件复制也能正常工作。

该解决方案的配置非常简单。您只需配置要复制的目录路径。

## 数据复制技术对比表 {#comparative-tables-between-data-replication-techniques}


{{%  insert-safekit-mirror-comparison-table-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}