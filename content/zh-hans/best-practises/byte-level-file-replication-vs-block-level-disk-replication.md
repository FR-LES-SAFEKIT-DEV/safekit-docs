---
title: "字节级文件复制与块级磁盘复制在高可用性方面的比较"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/byte-level-file-replication-vs-block-level-disk-replication/"
description: "比较字节级文件复制与块级磁盘复制。了解SafeKit如何提出一种无 SAN 架构，该架构仅复制文件中已修改的数据，从而确保零数据丢失 (RPO 0)、更快的恢复速度 (RTO) 以及在Windows和Linux上的简单配置。"
category: "best-practises"
lang: "zh-hans"
topics: "高可用性集群中字节级文件复制与块级磁盘复制的比较，字节级文件复制与块级磁盘复制的优缺点，🔍 SafeKit高可用性导航中心"
---

# 字节级文件复制与块级磁盘复制在高可用性方面的比较{#byte-level-file-replication-vs-block-level-disk-replication-for-ha}

## 高可用性集群中字节级文件复制与块级磁盘复制的比较{#byte-level-file-replication-vs-block-level-disk-replication-in-a-high-availability-cluster}

### 概述{#overview}

本文探讨了高可用性集群中字节级文件复制与块级磁盘复制的优缺点。我们将考察复制数据量、对应用程序数据组织的影响、恢复时间以及实现的简易性。


![字节级文件复制与块级磁盘复制](/wp-content/uploads/2023/02/file-replication-vs-disk-replication.png "w:200")


以下对比表详细解释了高可用性软件产品SafeKit实现的字节级文件复制。

### 什么是字节级文件复制？ {#what-is-byte-level-file-replication}

字节级文件复制（例如[ SafeKit ](</>) ）意味着只有文件内部的修改才会被复制。 

在可用性高的集群中，为了在发生故障时实现零数据丢失，需要使用同步复制[ ](</zh-hans/best-practises/synchronous-replication-vs-asynchronous-replication/>) 。异步复制则用于备份解决方案。

复制的数据量减少到仅包含应用程序在其文件中修改的信息。不会复制任何额外数据。

对应用程序的数据组织方式没有影响。例如，如果应用程序的数据位于系统磁盘上，则字节级文件复制仍然有效。

发生故障转移时，恢复时间 (RTO) 缩短至辅助服务器上复制文件的应用程序重启时间。

最后，该解决方案配置起来非常简单，只需配置要复制的目录路径即可。

### 什么是块级磁盘复制？ {#what-is-block-level-disk-replication}

块级磁盘复制（如[ DRBD ](<https://linbit.com/drbd/>) ）意味着仅复制磁盘内部的修改。

复制的数据量并不仅限于应用程序修改过的信息。额外的数据也会被复制，例如用于管理磁盘的元数据（空闲块列表、文件系统内部信息）。

这会对应用程序数据的组织方式产生重大影响。所有数据都必须位于复制磁盘上。至少，这需要重新配置应用程序。或者，如果某些要复制的数据位于系统磁盘上，则无法进行复制，因为该磁盘必须对每个服务器保持特定。

故障转移后，复制磁盘上的文件系统恢复过程会导致恢复时间 (RTO) 增加。

最后，该解决方案配置起来并不容易，因为需要一定的技能才能在专用磁盘上配置文件系统。此外，还需要一定的应用技能才能在复制磁盘上配置应用程序数据。

## 字节级文件复制与块级磁盘复制的优缺点{#pros-and-cons-of-byte-level-file-replication-vs-block-level-disk-replication}

标准| **字节级文件复制集群** | **块级磁盘复制集群**  
---|---|---  
产品| • [ SafeKit位于Windows和Linux ](/) |上 • 磁盘复制产品为[ DRBD ](https://linbit.com/drbd/)   
应用程序数据组织 |  • 对应用程序数据组织没有影响 SafeKit.<br>• [只需定义要实时复制的目录即可](/zh-hans/architectures/file-replication-byte-level-with-failover-mirror-cluster/).<br>• 甚至系统磁盘内的目录也可以被复制。  |  • 对应用程序数据组织的影响。<br>• 对应用程序进行特殊配置，使其数据放置在复制磁盘中。<br>• 系统磁盘中的数据无法复制。   
数据复制 |  • 同步字节级文件复制。<br>• 复制应用程序活动生成的文件修改操作。<br>• 不复制元数据。仅复制文件中修改过的数据，而不是整个文件（字节级文件复制）。<br>• [同步复制以避免故障时数据丢失](/zh-hans/best-practises/synchronous-replication-vs-asynchronous-replication/).  |  • 将复制磁盘内所有已修改的数据进行复制。<br>• 应用程序数据和元数据都会被复制。<br>• 例如，文件的最后访问时间会被复制（每次读取文件时都会修改最后访问时间）。   
部署复杂性| • 否 - 只需在 2 台服务器上安装软件| • 是 - 需要特定的 IT 技能来配置操作系统和复制磁盘   
故障转移 |  • 只需在第二个服务器上重启应用程序即可。  |  • 将文件系统重新挂载到复制磁盘上。<br>• 对文件系统执行恢复程序。<br>然后重新启动应用程序。   
故障恢复 |  • 自动故障恢复。<br>• 在不停止主服务器上的应用程序的情况下，在辅助服务器上重新同步数据。<br>• 数据未重新同步时，应用程序无法进行故障转移。  |  • 并非所有产品的功能都处于同一水平。   
法定人数和裂脑 |  • 网络隔离（脑裂）后，应用程序在单个服务器上执行。<br>• 脑裂后数据的连贯性。<br>• 无需第三台机器、法定人数盘或特殊的心跳线即可实现脑裂。<br>• [有关心跳、故障转移和仲裁的更多信息](/best-practises/heartbeat-failover-quorum-windows-linux-cluster/)  |  • 需要特殊的仲裁磁盘或第三个仲裁服务器来管理脑裂。   
适用于| • [想要为其应用程序添加简单高可用性选项的软件编辑器](/zh-hans/use-cases/application-clustering-software/) | • 具有集群 IT 技能的企业。   
  

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}