---
title: "无共享架构与共享磁盘架构：选择最佳高可用性集群"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/"
description: "比较无共享与共享磁盘架构在实现高可用性方面的区别。SafeKit 采用无共享方法。它消除了 SAN 成本并简化了故障转移。它提供同步复制，且没有复杂的硬件限制。"
category: "best-practises"
lang: "zh-hans"
topics: "无共享架构与共享磁盘架构在高可用性集群、无共享架构与共享磁盘架构：优缺点、🔍 探索 SafeKit"
translation: "translate_md 2026-11-20.7 | glossaire 2026-11-20.14 | Translation LLM | 54 expressions"
image: "/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png"
---

# 无共享架构与共享磁盘架构：选择最佳高可用性集群 {#shared-nothing-vs-shared-disk-architecture-choosing-the-best-ha-cluster}

## 无共享架构与共享磁盘架构在高可用性集群中的比较 {#shared-nothing-architecture-vs-shared-disk-architecture-for-high-availability-clusters}

### 概述 {#overview}

本文比较了两种高可用性集群架构：无共享架构和共享磁盘架构。它解释了它们的优缺点。它涵盖了硬件限制、对应用程序数据组织的影响、恢复时间和实施的简易性。


![无共享架构与共享磁盘架构](/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png "w:200")


下表详细介绍了共享磁盘架构和 SafeKit 之间的区别。该软件集群产品实现了无共享架构。

### 什么是共享磁盘架构？ {#what-is-a-shared-disk-architecture}

共享磁盘架构基于两台共享磁盘的服务器。如果发生硬件或软件故障，应用程序会在另一台服务器上自动重启。Microsoft 故障转移集群是共享磁盘架构的一个示例。有关详细信息，请参阅[故障转移集群硬件要求](<https://learn.microsoft.com/en-us/windows-server/failover-clustering/clustering-requirements>)。

此架构具有硬件限制：服务器内部有特定的外部共享存储、特定的卡，以及服务器和共享存储之间的特定交换机。

共享磁盘架构对应用程序数据的组织有很大影响。所有应用程序数据都必须位于共享磁盘上，以便在故障转移后重新启动应用程序。

此外，在故障转移时，必须在共享磁盘上运行文件系统恢复过程。这会增加恢复时间目标 (RTO)。

最后，该解决方案不易配置。配置特定硬件需要硬件技能。将应用程序数据放置在共享磁盘上还需要应用程序技能。

### 什么是无共享架构？ {#what-is-a-shared-nothing-architecture-}

无共享架构基于两台服务器，这两台服务器实时复制数据。如果发生硬件或软件故障，应用程序会在另一台服务器上自动重启。SafeKit 是无共享架构的一个例子。

数据复制有两种类型：字节级文件复制和块级磁盘复制。有关详细信息，请参阅[字节级文件复制与块级磁盘复制](</zh-hans/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>)。本文将重点介绍字节级文件复制，因为它比块级磁盘复制具有许多优势。

无共享架构没有硬件限制。服务器可以是物理的或虚拟的，具有任何类型的磁盘组织。实时文件复制在服务器之间的标准网络上运行。[同步复制](</zh-hans/best-practises/synchronous-replication-vs-asynchronous-replication/>)可确保零数据丢失。

此架构对应用程序数据组织没有影响。例如，即使应用程序数据位于系统磁盘上，实时文件复制也能正常工作。

发生故障转移时，恢复时间目标 (RTO) 将缩短至应用程序重启时间。应用程序将在辅助服务器的复制文件上重启。

最后，该解决方案的配置非常简单。您只需配置要复制的目录路径。

## 无共享架构与共享磁盘架构：优缺点 {#shared-nothing-architecture-vs-shared-disk-architecture-pros-and-cons}


{{%  insert-safekit-shared-nothing-vs-shared-disk-table-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}