---
title: "用于高可用性的字节级文件复制与块级磁盘复制"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/byte-level-file-replication-vs-block-level-disk-replication/"
description: "比较字节级文件复制和块级磁盘复制。SafeKit 只复制文件内修改过的数据，无需 SAN。确保零数据丢失（RPO 0），更快的恢复（RTO）以及在 Windows 和 Linux 上的简单配置。"
category: "best-practises"
lang: "zh-hans"
topics: "高可用性集群中的字节级文件复制与块级磁盘复制、字节级文件复制与块级磁盘复制的优缺点、🔍 探索 SafeKit"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-19.9 | Translation LLM | 54 expressions"
image: "/wp-content/uploads/2023/02/file-replication-vs-disk-replication.png"
schemaType: "TechArticle"
---

# 用于高可用性的字节级文件复制与块级磁盘复制 {#byte-level-file-replication-vs-block-level-disk-replication-for-ha}

## 高可用性集群中的字节级文件复制与块级磁盘复制 {#byte-level-file-replication-vs-block-level-disk-replication-in-a-high-availability-cluster}

### 概述 {#overview}

本文比较了高可用性集群中字节级文件复制和块级磁盘复制的优缺点。它考察了四个标准：复制数据的数量、对应用程序数据组织的影响、恢复时间和实施的简易性。


![字节级文件复制与块级磁盘复制](/wp-content/uploads/2023/02/file-replication-vs-disk-replication.png "w:200")


下表解释了 SafeKit 实现的字节级文件复制。SafeKit 是一款高可用性软件产品。

### 什么是字节级文件复制？ {#what-is-byte-level-file-replication}

通过字节级文件复制，仅复制文件内部的修改。[高可用性软件 SafeKit](</zh-hans/>)采用此技术。

为避免在发生故障时丢失任何数据，高可用性集群需要[同步复制](</zh-hans/best-practises/synchronous-replication-vs-asynchronous-replication/>)。异步复制适用于备份解决方案。

只有应用程序在其文件内修改的数据才会被复制。不会复制任何额外的数据。

这不会影响应用程序的数据组织。例如，即使应用程序数据位于系统磁盘上，字节级文件复制也能正常工作。

发生故障转移时，恢复时间 (RTO) 仅为在辅助服务器上重新启动应用程序所需的时间。应用程序使用复制的文件。

最后，该解决方案的配置非常简单。您只需配置要复制的目录路径。

### 什么是块级磁盘复制？ {#what-is-block-level-disk-replication}

通过块级磁盘复制，磁盘内的所有修改都会被复制。DRBD[开源软件](<https://linbit.com/drbd/>)就使用了这项技术。

复制的数据不仅限于应用程序修改的信息。还会复制额外的数据，例如管理磁盘的元数据。例如，空闲块列表和文件系统的内部信息。

这会对应用程序数据的组织产生强烈影响。所有数据都必须存储在复制磁盘上。这至少需要重新配置应用程序。如果某些要复制的数据位于系统磁盘上，则甚至不可能，因为每个服务器都必须保留其自己的系统磁盘。

故障转移后，必须恢复复制磁盘上的文件系统。此恢复过程会增加恢复时间 (RTO)。

最后，该解决方案不易配置。使用文件系统配置专用磁盘需要特定技能。将应用程序数据移动到复制磁盘也需要对应用程序有很好的了解。

## 字节级文件复制与块级磁盘复制的优缺点 {#pros-and-cons-of-byte-level-file-replication-vs-block-level-disk-replication}

标准 | **具有字节级文件复制功能的集群** | **具有块级磁盘复制功能的集群**  
---|---|---  
产品 |  • [SafeKit 适用于 Windows 和 Linux](/zh-hans/)  |  • 磁盘复制产品，例如[DRBD](https://linbit.com/drbd/)   
应用程序数据组织 |  • SafeKit 不会影响应用程序数据组织。<br> • [您只需定义要实时复制的目录](/zh-hans/architectures/file-replication-byte-level-with-failover-mirror-cluster/)。<br> • 即使是系统磁盘中的目录也可以复制。  |  • 对应用程序数据组织的影响。<br> • 该应用程序需要特殊配置，才能将其数据放在复制磁盘上。<br> • 系统磁盘上的数据无法复制。   
数据复制 |  • 同步字节级文件复制。<br> • 应用程序生成的文件修改操作将被复制。<br> • 元数据不会被复制。只有文件内部修改过的数据会被复制，而不是整个文件。<br> • [同步复制，避免故障时数据丢失](/zh-hans/best-practises/synchronous-replication-vs-asynchronous-replication/)。  |  • 复制磁盘上修改的所有数据都会被复制。<br> • 应用程序数据和元数据都会被复制。<br> • 例如，文件的上次访问时间会被复制。每次读取文件时，此时间都会更改。   
部署的复杂性 |  • 简单：在两台服务器上安装软件。  |  • 复杂：需要特定的 IT 技能来配置操作系统和复制磁盘。   
故障转移 |  • 只需在辅助服务器上重新启动应用程序。  |  • 文件系统重新挂载到复制磁盘上。<br> • 恢复过程会检查并修复文件系统。<br> • 然后，应用程序将重新启动。   
回切 |  • 自动回切。<br> • 无需停止主服务器上的应用程序，即可重新同步辅助服务器上的数据。<br> • 在数据重新同步之前，无法进行故障转移。  |  • 功能因产品而异。   
仲裁和脑裂 |  • 网络隔离（脑裂）后，应用程序在单个服务器上运行。<br> • 脑裂后数据保持一致。<br> • 无需第三台机器、仲裁磁盘或专用心跳线即可管理脑裂。<br> • [有关心跳、故障转移和仲裁的更多信息](/zh-hans/best-practises/heartbeat-failover-quorum-windows-linux-cluster/)  |  • 需要一个特殊的仲裁磁盘或第三个仲裁服务器来管理脑裂。   
适用于 |  • [希望为其应用程序添加简单高可用性选项的软件供应商](/zh-hans/use-cases/application-clustering-software/)  |  • 公司的 IT 团队中拥有集群专家。   
  

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}