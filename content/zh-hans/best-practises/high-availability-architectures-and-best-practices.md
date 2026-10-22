---
title: "高可用性架构与软件集群最佳实践"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/high-availability-architectures-and-best-practices/"
description: "了解应用集群的高可用性（HA）架构与最佳实践。SafeKit 无需共享磁盘即可实现 Mirror 和 Farm 集群，避免数据丢失，并为关键应用提供自动故障转移。"
category: "best-practises"
lang: "zh-hans"
topics: "有哪些高可用性架构和最佳实践, 高可用性架构与最佳实践对比表, SafeKit 高可用导航中心"
---

# 高可用性架构与软件集群最佳实践 {#high-availability-architectures--software-clustering-best-practices}

## 有哪些高可用性架构和最佳实践？ {#what-are-the-high-availability-architectures-and-the-best-practices}

### 概述 {#overview}

本文介绍不同的高可用性架构与最佳实践，并比较各类架构的优缺点。

![高可用性架构与最佳实践](/wp-content/uploads/2023/03/high-availability-architectures-and-best-practices.png "w:400")

以下对比表详细说明 SafeKit 高可用性软件的架构和最佳实践。

### 高可用性架构有哪些类型？ {#what-are-the-high-availability-architectures}

[高可用性架构](<https://www.techtarget.com/it-infrastructure/definition/What-is-high-availability-HA-Definition-and-guide>)分为两类：用于数据库等后端应用的架构，以及用于 Web 服务等前端应用的架构。

后端架构基于两台共享或复制数据的服务器，在硬件或软件故障时自动进行应用故障转移。

前端架构基于由两台或更多服务器组成的 Farm。硬件或软件负载均衡会将 TCP 会话分配给可用服务器。

此外，还需要选择在应用程序级别还是虚拟机级别实现高可用性。

### 有哪些最佳实践？ {#what-are-the-best-practices}

本文通过比较以下方面，探讨高可用性架构的最佳实践：

  * [软件集群与硬件集群](</zh-hans/best-practises/clustering-software-vs-hardware-clustering/>),
  * [无共享架构与共享磁盘架构](</zh-hans/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/>),
  * [应用级与虚拟机级高可用性](</zh-hans/best-practises/vm-ha-vs-application-ha/>),
  * [高可用性与容错](</zh-hans/best-practises/high-availability-cluster-vs-fault-tolerant-system/>),
  * [同步复制与异步复制](</zh-hans/best-practises/synchronous-replication-vs-asynchronous-replication/>),
  * [文件复制与磁盘复制](</zh-hans/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>),
  * [数据复制技术](</zh-hans/best-practises/data-replication-techniques/>),
  * [RPO 和 RTO 示例](</zh-hans/best-practises/what-is-rpo-and-rto-with-examples/>),
  * [脑裂与仲裁](</zh-hans/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>),
  * [虚拟 IP 地址](</zh-hans/best-practises/how-a-virtual-ip-address-works/>).

## 高可用性架构与最佳实践对比表 {#comparative-tables-on-high-availability-architectures-and-best-practices}

{{% insert-safekit-software-vs-hardware-table-zh-hans %}}

{{% insert-safekit-hub-zh-hans %}}

{{% insert-safekit-4-buttons-zh-hans %}}