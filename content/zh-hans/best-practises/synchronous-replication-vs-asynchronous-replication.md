---
title: "同步复制与异步复制：SafeKit 如何确保零数据丢失？"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/synchronous-replication-vs-asynchronous-replication/"
description: "比较同步复制和异步复制在业务连续性方面的区别。SafeKit 使用实时同步复制，以保证高可用性集群中的零数据丢失（RPO = 0）。异步复制更适合远距离灾难恢复。"
category: "best-practises"
lang: "zh-hans"
topics: "在同步或异步复制的情况下，应用程序故障转移时会丢失数据吗？、目录、异步复制的工作原理是什么？、同步复制的工作原理是什么？、半同步复制的工作原理是什么？、最终结论：为高可用性选择合适的复制方案、比较表：同步、异步和半同步、视频指南：配置同步实时复制和高可用性、常见问题：高可用性集群中的复制策略、🔍 探索 SafeKit"
translation: "translate_md 2026-11-20.8 | glossaire 2026-11-20.17 | Translation LLM | 54 expressions"
image: "/wp-content/uploads/2026/01/synchronous-asynchronous-replication-3-1024.jpg"
---

# 同步复制与异步复制：SafeKit 如何确保零数据丢失？ {#synchronous-vs-asynchronous-replication-how-safekit-ensures-zero-data-loss}

## 在同步或异步复制的情况下，应用程序故障转移时会丢失数据吗？ {#data-loss-risk-synchronous-vs-asynchronous-failover}

**同步复制和异步复制**之间存在显著差异。根据选择的不同，您可能会在应用程序故障转移期间遇到数据丢失的情况。 

  * SafeKit 实现的**同步复制**对于**高可用性 (HA)** 至关重要。它确保事务性应用程序在故障转移时不会丢失任何一个字节：主服务器磁盘上的所有已提交数据也存在于辅助服务器磁盘上。
  * **异步复制**通常用于**备份和灾难恢复 (DR)**。使用异步复制时，如果发生故障，主服务器磁盘上已提交的数据可能会丢失。这些数据尚未复制到远程站点。
  * **半同步复制**是一种替代解决方案，其中已提交的数据会到达辅助服务器，但不必写入其磁盘。


重要的是要明白，这些解决方案是**互补**的。SafeKit 的同步复制功能可保护您的环境免受硬件或软件故障的影响，并保持 24/7 全天候正常运行。备份解决方案可保护您的历史数据免受逻辑错误和勒索软件等网络威胁。

为了帮助您选择最适合您需求的架构，本文将解释技术机制及其对应用程序故障转移的影响。


![同步与异步复制的比较图，显示故障转移期间的数据丢失风险](/wp-content/uploads/2026/01/synchronous-asynchronous-replication-3-1024.jpg "w:512")

**比较同步和异步复制对应用程序故障转移期间数据丢失的影响**。


{{%  insert-safekit-4-buttons-zh-hans  %}}
 

## 目录 {#table-of-contents}

  * [在同步或异步复制的情况下，应用程序故障转移时会丢失数据吗？](#data-loss-risk-synchronous-vs-asynchronous-failover)
  * [异步复制的工作原理是什么？](#how-asynchronous-replication-works)
  * [同步复制的工作原理是什么？](#how-synchronous-replication-works)
  * [半同步复制的工作原理是什么？](#how-semi-synchronous-replication-works)
  * [最终结论：为高可用性选择合适的复制方案](#best-practices-synchronous-vs-asynchronous-replication)
  * [比较表：同步、异步和半同步](#comparison-synchronous-asynchronous-replication)
  * [视频指南：配置同步实时复制和高可用性](#videoguide-synchronous-real-time-replication-ha)
  * [常见问题：高可用性集群中的复制策略](#faq-replication-high-availability)
  * [SafeKit 高可用性导航中心](#hub)


## 异步复制的工作原理是什么？ {#how-asynchronous-replication-works}

在**异步复制**中，主服务器会立即确认写入操作，稍后在**计划批次**中延迟更新副本。这种解耦克服了**长距离复制**的延迟问题，使其成为跨远程站点**备份和灾难恢复**的首选策略。

然而，这种效率带来了**一致性方面**的挑战，即辅助服务器可能持有过时的信息。由于辅助更新发生在主写入最终确定之后，因此主服务器的任何故障都将导致**正在传输的数据**丢失。

## 同步复制的工作原理是什么？ {#how-synchronous-replication-works}

通过 SafeKit 实现的**同步复制**，当应用程序或文件系统缓存对主服务器执行磁盘 I/O 操作时，系统通过双重确认过程确保数据一致性。

SafeKit 在将最终确认发送回应用程序或文件系统缓存之前，会等待本地磁盘和辅助服务器的 **I/O 确认**。这种同步机制对于**事务应用程序的故障转移**至关重要，可确保事务在提交之前在两个节点上都得到充分保护。

## 半同步复制的工作原理是什么？ {#how-semi-synchronous-replication-works}

**半同步复制**是一种混合数据完整性方法。与同步复制一样，SafeKit 在向应用程序或文件系统缓存确认 I/O 操作之前，会等待主服务器和辅助服务器的确认。

关键区别在于**辅助服务器的响应时间**。在半同步情况下，辅助服务器**在内存中收到数据**后立即向主服务器发送确认，然后将其提交到磁盘。相比之下，**同步复制**要求辅助服务器在发送确认之前将 I/O 写入物理磁盘。

## 最终结论：为高可用性选择合适的复制方案 {#best-practices-synchronous-vs-asynchronous-replication}

**同步复制和异步复制**之间的选择是在绝对数据完整性和网络性能之间进行权衡。对于关键任务基础设施，此决定直接决定了您的**恢复点目标 (RPO)**。

**总结：**

  * **异步复制：** **备份**的黄金标准，但不是**高可用性**的标准。它支持长距离连接。但是，由于辅助节点数据滞后于主节点数据，因此存在固有的数据丢失风险。
  * **同步复制：** **高可用性**的黄金标准，但并非**备份**。它确保辅助节点文件是主节点的实时克隆，保证**零数据丢失的故障转移**。 
  * **半同步复制：** 为**高可用性**提供高性能的中间地带。通过在磁盘写入之前在内存级别确认数据，它在最小化延迟的同时，与异步方法相比，保持了卓越的数据保护。 


**⭐ SafeKit 建议：** 对于关键应用，始终优先考虑**同步或半同步复制**，以保证业务连续性、最大化性能并消除与不一致故障转移相关的风险。

## 比较表：同步、异步和半同步 {#comparison-synchronous-asynchronous-replication}

功能 | 同步 | 半同步 | 异步  
---|---|---|---  
RPO（潜在数据丢失） | 零 | 零 | 非零（数据丢失：取决于上次异步复制）  
远程 I/O 确认 | 远程磁盘写入后 | 远程 RAM 写入后 | 不等待确认  
性能影响 | 需要低延迟网络 - 取决于往返时间（通常 RTT<5 毫秒） | 需要低延迟网络 - 取决于往返时间（通常 RTT<5 毫秒） | 支持高延迟网络  
距离限制 | 本地/扩展 VLAN | 本地/扩展 VLAN | 广域网 (WAN)  
最适合 | 高可用性（自动故障转移） | 高可用性（自动故障转移） | 备份解决方案（手动故障转移）  
  
## 视频指南：配置同步实时复制和高可用性 {#videoguide-synchronous-real-time-replication-ha}


{{%  insert-safekit-mirror-video-zh-hans  %}}
 

## 常见问题：高可用性集群中的复制策略 {#faq-replication-high-availability}

### 复制技术与机制 {#replication-technology--mechanics}

#### SafeKit 每次修改文件时都会通过网络发送完整文件吗？ {#safekit-byte-level-replication-vs-full-file-transfer}

**不**。SafeKit 采用**字节级复制**。它会拦截文件内部的特定 I/O 修改，并且只复制已更改的字节，从而最大程度地减少网络流量。

#### 每次应用程序写入文件时，都会触发复制吗？ {#safekit-synchronous-replication-timing}

**不**。仅当应用程序请求**将 I/O 提交**到本地磁盘时，才会发生复制。SafeKit 确保在完成写入之前，辅助服务器已确认这些数据。

#### 同步复制会降低我的应用程序速度吗？ {#synchronous-replication-performance-impact}

延迟与**网络往返时间 (RTT)** 相关。在 LAN 中，影响可以忽略不计（类似于 NAS/SAN 存储）。在高延迟广域网上，通常首选异步模式以避免性能瓶颈，并且需要备份解决方案（非 SafeKit）。

* * *

### 部署策略：高可用性与备份 {#deployment-strategy-ha-vs-backup}

#### 我必须何时选择同步复制与异步复制？ {#choosing-sync-vs-async}

选择**同步**以实现高可用性（自动故障转移，零数据丢失）。选择**异步**以进行备份/灾难恢复，其中距离会阻止实时同步，并且不需要自动故障转移。

#### SafeKit 是否支持异步复制？ {#safekit-support-asynchronous}

**不**。SafeKit 是一种高可用性解决方案，可在**自动故障转移**期间实现零数据丢失。如果只需要纯异步功能，请寻找备份解决方案。

#### 高可用性是否消除了对备份解决方案的需求？ {#high-availability-vs-backup}

**不，高可用性并不能取代全面的备份解决方案**。

SafeKit 等实时复制解决方案可确保业务连续性。但是，它们的作用与备份不同。实时复制旨在防止硬件故障和服务器停机，但它无法防止勒索软件同时加密两个节点等网络威胁。只有具有保留策略的备份解决方案才能解决此问题。

#### 如何结合使用同步复制和异步复制？ {#combining-synchronous-asynchronous-replication}

您可以使用 **3 节点混合架构**：一个具有同步复制的 2 节点本地集群用于高可用性，以及通过具有异步复制的备份解决方案进行灾难恢复的第三个远程副本。

**如需了解更多信息，请参阅：**[SafeKit 高可用性和灾难恢复 (HADR)](</zh-hans/best-practises/high-availability-disaster-recovery-hadr/>)


{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}