---
title: "同步与异步复制：SafeKit 如何确保零数据丢失？"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/synchronous-replication-vs-asynchronous-replication/"
description: "比较同步复制与异步复制的业务连续性。了解 SafeKit 如何使用实时同步复制来保证 HA 集群中的零数据丢失 (RPO=0)，以及为什么异步更适合远距离灾难恢复。"
category: "best-practises"
lang: "zh-hans"
topics: "使用同步或异步复制进行应用程序故障转移时是否会丢失数据？、目录、异步复制如何工作？、同步复制如何工作？、半同步复制如何工作？、最终结论：选择正确的复制以实现高可用性、比较表：同步、异步与半同步、视频指南：配置同步实时复制和高可用性、常见问题解答：复制高可用性集群策略，🔍 SafeKit 高可用性导航中心"
---

# 同步与异步复制：SafeKit如何确保零数据丢失？ {#synchronous-vs-asynchronous-replication-how-safekit-ensures-zero-data-loss}

## 使用同步或异步复制进行应用程序故障转移时是否会丢失数据？ {#data-loss-risk-synchronous-vs-asynchronous-failover}

**同步复制与异步复制**之间存在显着差异。根据选择，您可能会在应用程序故障转移期间遇到数据丢失的情况。 

  * **同步复制**，由 [SafeKit 软件](</zh-hans/>) 实现，对于**高可用性 (HA)** 至关重要。它确保事务应用程序的故障转移不会丢失单个字节：主服务器磁盘上的所有已提交数据也存在于辅助服务器的磁盘上。
  * **异步复制**通常用于**备份和灾难恢复(DR)**。它存在这样的风险：如果发生故障，主服务器磁盘上已提交的数据可能会丢失，因为这些数据尚未复制到远程站点。
  * **半同步复制**是一种替代解决方案，其中提交的数据到达辅助服务器，但不一定写入其磁盘。


重要的是要了解这些解决方案是**互补的**。 SafeKit 的同步复制可以保护您的环境免受硬件或软件故障的影响，以维持 24/7 的正常运行时间，而备份解决方案可以保护您的历史数据免受逻辑错误和勒索软件等网络威胁的影响。

为了帮助您在选择最适合您需求的架构时做出正确的决定，我们在下面解释了技术机制以及对应用程序故障转移的影响。


![同步与异步复制的比较图显示故障转移期间的数据丢失风险](/wp-content/uploads/2026/01/synchronous-asynchronous-replication-3-1024.jpg "w:512")

**比较同步和异步复制对应用程序故障转移期间数据丢失的影响。**


{{%  insert-safekit-4-buttons-zh-hans  %}}
 

## 目录 {#table-of-contents}

  * [同步或异步复制应用程序故障转移时是否丢失数据？](#data-loss-risk-synchronous-vs-asynchronous-failover)
  * [异步复制如何工作？](#how-asynchronous-replication-works)
  * [同步复制如何工作？](#how-synchronous-replication-works)
  * [半同步复制如何工作？](#how-semi-synchronous-replication-works)
  * [最终结论：选择正确的复制以获得高可用性](#best-practices-synchronous-vs-asynchronous-replication)
  * [比较表：同步、异步、半同步](#comparison-synchronous-asynchronous-replication)
  * [视频指南：配置同步实时复制和高可用性](#videoguide-synchronous-real-time-replication-ha)
  * [FAQ：高可用性集群中的复制策略](#faq-replication-high-availability)
  * [SafeKit 高可用性导航中心](#hub)


## 异步复制如何工作？ {#how-asynchronous-replication-works}

在**异步复制**中，主服务器立即确认写入操作，并稍后在**计划的批次**中延迟更新副本。这种解耦克服了**长距离复制**的延迟问题，使其成为跨远程站点**备份和灾难恢复**的首选策略。

然而，这种效率带来了**一致性**的挑战，其中辅助服务器可能保存过时的信息。由于辅助更新发生在主写入完成之后，因此主服务器的任何故障都将导致**正在进行的数据**丢失。

## 同步复制如何工作？ {#how-synchronous-replication-works}

SafeKit实现的**同步复制**，当应用程序或主服务器上的文件系统缓存执行磁盘I/O操作时，系统通过双重确认过程来保证数据的一致性。

SafeKit 等待来自本地磁盘和辅助服务器的 **I/O 确认**，然后将最终确认发送回应用程序或文件系统缓存。这种同步机制对于**事务性应用程序的故障转移**至关重要，确保事务在被视为提交之前在两个节点上都得到充分保护。

## 半同步复制如何工作？ {#how-semi-synchronous-replication-works}

**半同步复制** 作为数据完整性的混合方法。与同步复制一样，SafeKit 在确认对应用程序或文件系统缓存的 I/O 操作之前，会等待主服务器和辅助服务器的确认。

关键区别在于**辅助服务器的响应时间**。在半同步情况下，辅助服务器在**收到内存中的数据**后立即向主服务器发送确认，然后将其提交到磁盘。相反，**同步复制**要求辅助服务器在发送确认之前将 I/O 写入物理磁盘。

## 最终结论：选择正确的复制以获得高可用性 {#best-practices-synchronous-vs-asynchronous-replication}

**同步与异步复制**之间的选择是绝对数据完整性和网络性能之间的权衡。对于关键任务基础设施，此决定直接决定您的**恢复点目标 (RPO)**。

**总结：**

  * **异步复制** ：黄金标准 **备份** 但不是为了 **高可用性**。虽然它支持长距离连接，但存在数据丢失的固有风险 **因为Secondary节点的数据滞后于Primary节点的数据。**
  * **同步复制：** 黄金标准 **高可用性** 但不是为了 **备份**。它确保辅助节点文件是主节点的实时克隆，保证 **零数据丢失故障转移**. 
  * **半同步复制：**为**高可用性**提供高性能中间基础。通过在磁盘写入之前在内存级别确认数据，与异步方法相比，它可以最大限度地减少延迟，同时保持卓越的数据保护。 


**⭐ SafeKit 建议：** 对于关键应用程序，始终优先考虑**同步或半同步复制**，以保证业务连续性、最大化性能并消除与不一致故障转移相关的风险。

## 比较表：同步、异步、半同步 {#comparison-synchronous-asynchronous-replication}

特点 |同步 |半同步 |异步  
---|---|---|---  
RPO（潜在数据丢失） |零 |零 |非零（数据丢失：取决于上次异步复制）  
远程 I/O 确认 |远程磁盘写入后 |远程RAM写入后 |不等待确认  
性能影响 |需要低延迟网络 - 取决于往返时间（通常 RTT<5ms） |需要低延迟网络 - 取决于往返时间（通常 RTT<5ms） |支持低延迟网络  
距离限制 |本地/延伸 VLAN |本地/延伸 VLAN |广域网 (WAN)  
最适合 |高可用性（自动故障转移） |高可用性（自动故障转移） |备份解决方案（手动故障转移）  
  
## 视频指南：配置同步实时复制和高可用性 {#videoguide-synchronous-real-time-replication-ha}


{{%  insert-safekit-mirror-video-zh-hans  %}}
 

## 常见问题解答：高可用性集群中的复制策略 {#faq-replication-high-availability}

### 复制技术与机制 {#replication-technology--mechanics}

#### SafeKit 每次修改时都会通过网络发送完整文件吗？ {#safekit-byte-level-replication-vs-full-file-transfer}

**不。** SafeKit 利用**字节级复制**。它拦截文件内的特定 I/O 修改并仅复制更改的字节，从而最大限度地减少网络流量。

#### 每次应用程序写入其文件时都会触发复制吗？ {#safekit-synchronous-replication-timing}

**不会。** 仅当应用程序请求对本地磁盘进行 **I/O 提交**时，才会发生复制。 SafeKit 确保辅助服务器在完成写入之前确认该数据。

#### 同步复制会减慢我的应用程序的速度吗？ {#synchronous-replication-performance-impact}

延迟与 **网络往返时间 (RTT)** 相关。在 LAN 上，影响可以忽略不计（类似于 NAS/SAN 存储）。在高延迟 WAN 上，通常首选异步模式以避免性能瓶颈，并且需要备份解决方案（不是 SafeKit）。

* * *

### 部署策略：HA 与备份 {#deployment-strategy-ha-vs-backup}

#### 什么时候必须选择同步复制还是异步复制？ {#choosing-sync-vs-async}

选择**同步**以获得高可用性（自动故障转移、零数据丢失）。选择**异步**进行备份/灾难恢复，因为距离会妨碍实时同步，并且不需要自动故障转移。

#### SafeKit是否支持异步复制？ {#safekit-support-asynchronous}

**不。** SafeKit 是一种高可用性解决方案，需要零数据丢失以实现**自动故障转移**。对于纯粹的异步需求，请寻找备份解决方案。

#### 高可用性是否消除了对备份解决方案的需求？ {#high-availability-vs-backup}

**不，高可用性并不能消除对全面备份解决方案的需求。**

虽然 [SafeKit](</zh-hans/>) 等实时复制解决方案可提供持续的业务连续性，但它们的用途与备份不同。实时复制旨在防止硬件故障和服务器停机，但它无法防范网络威胁，例如同时加密两个节点的勒索软件。只有具有保留策略的备份解决方案才能解决此问题。

#### 如何结合同步和异步复制？ {#combining-synchronous-asynchronous-replication}

您可以使用 **3 节点混合架构**：具有用于 HA 的同步复制的 2 节点本地集群，以及通过具有用于灾难恢复的异步复制的备份解决方案的第三个远程副本。

**更多信息请参见：** [SafeKit 高可用性和灾难恢复 (HADR)](</zh-hans/best-practises/high-availability-disaster-recovery-hadr/>)


{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}