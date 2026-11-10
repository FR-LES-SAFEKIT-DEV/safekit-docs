---
title: "无共享架构与共享磁盘架构：选择最佳高可用性集群"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/"
description: "比较无共享与共享磁盘架构的高可用性。了解 SafeKit 如何使用无共享方法来消除 SAN 成本、简化故障转移，并在没有复杂硬件限制的情况下提供同步复制。"
category: "best-practises"
lang: "zh-hans"
topics: "无共享架构与共享磁盘架构在高可用性集群、无共享架构与共享磁盘架构：优缺点、🔍 探索 SafeKit"
translation: "translate_md 2026-11-10.3 | glossaire 2026-11-10.4 | Translation LLM | 50 expressions"
---

# 无共享架构与共享磁盘架构：选择最佳高可用性集群 {#shared-nothing-vs-shared-disk-architecture-choosing-the-best-ha-cluster}

## 无共享架构与共享磁盘架构在高可用性集群中的比较 {#shared-nothing-architecture-vs-shared-disk-architecture-for-high-availability-clusters}

### 概述 {#overview}

本文探讨了无共享架构与共享磁盘架构在构建高可用性集群的优缺点。我们将从硬件限制、对应用程序数据组织的影响、恢复时间以及实施的简易性等方面进行分析。


![无共享架构与共享磁盘架构](/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png "w:200")


以下比较表详细解释了共享磁盘架构和 SafeKit 之间的区别，后者是一款实现无共享架构的软件集群产品。

### 什么是共享磁盘架构？ {#what-is-a-shared-disk-architecture}

共享磁盘架构（如[Microsoft 故障转移群集](<https://learn.microsoft.com/en-us/windows-server/failover-clustering/clustering-requirements>)）基于两台服务器共享一个磁盘，并在发生硬件或软件故障时自动进行应用程序故障转移。

此架构具有硬件限制：特定的外部共享存储、服务器内部要安装的特定卡以及服务器和共享存储之间的特定交换机。

共享磁盘架构对应用程序数据的组织有很大影响。所有应用程序数据必须本地化到共享磁盘中，以便在故障转移后重新启动。

此外，在故障转移时，必须在共享磁盘上执行文件系统恢复过程。这会增加恢复时间 (RTO)。

最后，该解决方案不易配置，因为配置特定硬件需要相关技能。此外，在共享磁盘中配置应用程序数据还需要应用程序技能。

### 什么是无共享架构？ {#what-is-a-shared-nothing-architecture-}

无共享架构（如[SafeKit](</zh-hans/>)）基于两台服务器，实时复制数据，并在硬件或软件出现故障时自动进行应用程序故障转移。

数据复制有两种类型：[字节级文件复制和块级磁盘复制](</zh-hans/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>)。我们在此处考虑字节级文件复制，因为它比块级磁盘复制具有许多优势。

无共享架构没有硬件限制：服务器可以是物理的或虚拟的，具有任何类型的磁盘组织。实时文件复制（[同步](</zh-hans/best-practises/synchronous-replication-vs-asynchronous-replication/>)以实现零数据丢失）通过服务器之间的标准网络进行。

此架构对应用程序数据组织没有影响。例如，如果应用程序的数据位于系统磁盘中，则实时文件复制功能可以正常工作。

发生故障转移时，恢复时间 (RTO) 将缩短为辅助服务器上复制文件的应用程序重启时间。

最后，该解决方案的配置非常简单，只需配置要复制的目录路径即可。

## 无共享架构与共享磁盘架构：优缺点 {#shared-nothing-architecture-vs-shared-disk-architecture-pros-and-cons}


{{%  insert-safekit-shared-nothing-vs-shared-disk-table-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}