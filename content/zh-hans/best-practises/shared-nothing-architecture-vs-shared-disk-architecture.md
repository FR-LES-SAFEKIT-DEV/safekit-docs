---
title: "无共享架构与共享磁盘架构：选择最佳高可用性集群"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/"
description: "比较无共享架构和共享磁盘架构在实现高可用性方面的差异。了解SafeKit如何利用无共享架构消除 SAN 成本、简化故障转移，并在没有复杂硬件限制的情况下提供同步复制。"
category: "best-practises"
lang: "zh-hans"
topics: "高可用性集群中的无共享架构与共享磁盘架构对比，无共享架构与共享磁盘架构：优缺点，🔍 SafeKit高可用性导航中心"
---

# 无共享架构与共享磁盘架构：选择最佳高可用性集群{#shared-nothing-vs-shared-disk-architecture-choosing-the-best-ha-cluster}

## 共享无架构与共享磁盘架构在高可用性集群中的{#shared-nothing-architecture-vs-shared-disk-architecture-for-high-availability-clusters}

### 概述{#overview}

本文探讨了高可用性集群中无共享架构与共享磁盘架构的优缺点。我们将分析硬件限制、对应用程序数据组织的影响、恢复时间以及实现的简易性。


![无共享架构与共享磁盘架构](/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png "w:200")


以下对比表详细解释了共享磁盘架构与SafeKit （一种实现无共享架构的软件集群产品）之间的区别。

### 什么是{#what-is-a-shared-disk-architecture}磁盘架构？

共享磁盘架构（如[ Microsoft故障转移集群](<https://learn.microsoft.com/en-us/windows-server/failover-clustering/clustering-requirements>) ）基于 2 台服务器共享一个磁盘，在硬件或软件发生故障时自动进行应用程序故障转移。

该架构存在硬件限制：特定的外部共享存储、服务器内部要安装的特定卡，以及服务器和共享存储之间的特定交换机。

共享磁盘架构对应用程序数据的组织方式有着显著的影响。所有应用程序数据都必须存储在共享磁盘上，以便在故障转移后重启。

此外，发生故障转移时，必须在共享磁盘上执行文件系统恢复过程。这会增加恢复时间（RTO）。

最后，该解决方案配置起来并不容易，因为配置特定硬件需要一定的技能。此外，配置共享磁盘中的应用程序数据也需要一定的应用技能。

### 什么是{#what-is-a-shared-nothing-architecture-}共享架构？

共享无架构（如[ SafeKit ](</>) ）基于 2 台服务器实时复制数据，并在硬件或软件发生故障时自动进行应用程序故障转移。

数据复制有两种类型： [级文件复制和块级磁盘复制。这里我们主要讨论字节级文件复制](</zh-hans/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>)因为它相比块级磁盘复制有很多优势。

无共享架构没有硬件限制：服务器可以是物理服务器或虚拟机，磁盘组织方式不限。实时文件复制（ [同步](</zh-hans/best-practises/synchronous-replication-vs-asynchronous-replication/>) ，实现零数据丢失）通过服务器间的标准网络进行。

这种架构不会影响应用程序的数据组织方式。例如，如果应用程序的数据位于系统磁盘上，实时文件复制功能仍然可以正常工作。

发生故障转移时，恢复时间 (RTO) 缩短至辅助服务器上复制文件的应用程序重启时间。

最后，该解决方案配置起来非常简单，只需配置要复制的目录路径即可。

## 共享无架构 vs 共享磁盘架构：优缺点分析{#shared-nothing-architecture-vs-shared-disk-architecture-pros-and-cons}


{{%  insert-safekit-shared-nothing-vs-shared-disk-table-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}