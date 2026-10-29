---
title: "高可用性架构和软件集群最佳实践"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/high-availability-architectures-and-best-practices/"
description: "探索高可用性 (HA) 架构和应用集群最佳实践。了解SafeKit软件如何实现无需共享磁盘的mirror和farm集群，从而为关键应用提供零数据丢失和自动故障转移。"
category: "best-practises"
lang: "zh-hans"
topics: "什么是高可用性架构和最佳实践？高可用性架构和最佳实践对比表，🔍 SafeKit高可用性导航中心"
---

# 高可用性架构和软件集群最佳实践 {#high-availability-architectures--software-clustering-best-practices}

## 什么是高可用性架构和最佳实践 {#what-are-the-high-availability-architectures-and-the-best-practices}

### 概述 {#overview}

本文探讨了不同的高可用性架构，并分析了每种架构的优缺点，提出了最佳实践。


![高可用性架构和最佳实践](/wp-content/uploads/2023/03/high-availability-architectures-and-best-practices.png "w:400")


以下对比表详细解释了SafeKit高可用性架构及其最佳实践（ SafeKit是一款软件高可用性产品）。

### 什么是高可用性架构？ {#what-are-the-high-availability-architectures}

[高可用性](<https://www.techtarget.com/it-infrastructure/definition/What-is-high-availability-HA-Definition-and-guide>)架构有两种类型：一种用于后端应用程序（如数据库），另一种用于前端应用程序（如 Web 服务）。

后端高可用性架构基于 2 台服务器共享或复制数据，并在硬件或软件发生故障时自动进行应用程序故障转移。

前端高可用性架构基于<span class="notranslate farm-term" translate="no">farm</span>组服务器（2 台或更多）。负载均衡由硬件或软件实现，并将 TCP 会话分配到farm组中可用的服务器上。

此外，您必须在应用层高可用性和虚拟机层高可用性之间做出选择。

### 最佳实践是什么？ {#what-are-the-best-practices}

本文通过比较以下几点，探讨了高可用性架构的最佳实践：

  * [软件集群与硬件集群](</zh-hans/best-practises/clustering-software-vs-hardware-clustering/>) ，
  * [无共享架构与共享磁盘架构](</zh-hans/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/>) ，
  * [应用程序与虚拟机高可用性](</zh-hans/best-practises/vm-ha-vs-application-ha/>) ，
  * [高可用性与容错性](</zh-hans/best-practises/high-availability-cluster-vs-fault-tolerant-system/>) ，
  * [同步复制与异步复制](</zh-hans/best-practises/synchronous-replication-vs-asynchronous-replication/>) ，
  * [文件与磁盘复制](</zh-hans/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>) ，
  * [数据复制技术](</zh-hans/best-practises/data-replication-techniques/>) ，
  * [ RPO 和 RTO 示例](</zh-hans/best-practises/what-is-rpo-and-rto-with-examples/>) ，
  * [分裂脑和法定人数](</zh-hans/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) ，
  * [虚拟 IP 地址](</zh-hans/best-practises/how-a-virtual-ip-address-works/>) 。


## 高可用性架构和最佳实践对比表 {#comparative-tables-on-high-availability-architectures-and-best-practices}


{{%  insert-safekit-software-vs-hardware-table-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}