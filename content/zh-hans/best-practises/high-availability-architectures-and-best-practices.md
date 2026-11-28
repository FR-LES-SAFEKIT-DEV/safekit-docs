---
title: "高可用架构与最佳实践"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/high-availability-architectures-and-best-practices/"
description: "应用集群的高可用性架构与最佳实践：mirror 和 farm 集群、复制与故障转移，附 SafeKit 示例。"
category: "best-practises"
lang: "zh-hans"
topics: "什么是高可用性架构和最佳实践？, 高可用性架构和最佳实践的比较表"
hashpart: "what-are-the-high-availability-architectures-and-the-best-practices, comparative-tables-on-high-availability-architectures-and-best-practices"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-19.23 | Translation LLM | 54 expressions"
image: "/wp-content/uploads/2023/03/high-availability-architectures-and-best-practices.png"
schemaType: "TechArticle"
---

# 高可用架构与最佳实践 {#high-availability-architectures-and-best-practices}

## 什么是高可用性架构和最佳实践？ {#what-are-the-high-availability-architectures-and-the-best-practices}

### 概述 {#overview}

本文探讨了不同的高可用性架构，并通过列出每种架构的优缺点来介绍最佳实践。


![高可用性架构和最佳实践](/wp-content/uploads/2023/03/high-availability-architectures-and-best-practices.png "w:400")


以下比较表详细解释了高可用性软件 SafeKit 的架构和最佳实践。

### 什么是高可用性架构？ {#what-are-the-high-availability-architectures}

[高可用性](<https://www.techtarget.com/it-infrastructure/definition/What-is-high-availability-HA-Definition-and-guide>)架构有两种类型：一种用于后端应用程序（如数据库），另一种用于前端应用程序（如 Web 服务）。

后端的高可用性架构基于两台服务器。服务器共享或复制数据。如果发生硬件或软件故障，自动故障转移会在另一台服务器上重新启动应用程序。

前端的高可用性架构基于服务器 <span class="notranslate farm-term" translate="no">farm</span>（2 台或更多服务器）。负载均衡由硬件或软件完成，并将 TCP 会话分配到 farm 中的可用服务器。

此外，您必须在应用程序级别或虚拟机级别之间选择高可用性。

### 最佳实践是什么？ {#what-are-the-best-practices}

本文通过比较以下内容，探讨了高可用性架构的最佳实践：

  * [软件集群与硬件集群](</zh-hans/best-practises/clustering-software-vs-hardware-clustering/>)
  * [无共享架构与共享磁盘架构](</zh-hans/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/>)
  * [应用级与虚拟机级高可用性](</zh-hans/best-practises/vm-ha-vs-application-ha/>)
  * [高可用性与容错性](</zh-hans/best-practises/high-availability-cluster-vs-fault-tolerant-system/>)
  * [同步复制与异步复制](</zh-hans/best-practises/synchronous-replication-vs-asynchronous-replication/>)
  * [文件与磁盘复制](</zh-hans/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>)
  * [数据复制技术](</zh-hans/best-practises/data-replication-techniques/>)
  * [RPO 和 RTO 示例](</zh-hans/best-practises/what-is-rpo-and-rto-with-examples/>)
  * [脑裂和仲裁](</zh-hans/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>)
  * [虚拟 IP 地址](</zh-hans/best-practises/how-a-virtual-ip-address-works/>)


## 高可用性架构和最佳实践的比较表 {#comparative-tables-on-high-availability-architectures-and-best-practices}


{{%  insert-safekit-software-vs-hardware-table-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}