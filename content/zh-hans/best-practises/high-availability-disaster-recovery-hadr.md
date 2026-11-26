---
title: "将 SafeKit 高可用性与灾难恢复备份相结合"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/high-availability-disaster-recovery-hadr/"
description: "通过将 SafeKit 同步复制（RPO = 0）与异地灾难恢复的异步备份相结合，构建弹性 HA/DR 策略。这种双层方法可确保 Windows 和 Linux 上的应用程序 24/7 全天候正常运行和数据完整性。"
category: "best-practises"
lang: "zh-hans"
topics: "用于高可用性的同步 SafeKit 复制与用于灾难恢复的异步备份复制、目录、同步 HADR：通过高速网络（LAN /虚拟局域网）实现零数据丢失、异步 HADR：通过慢速网络（广域网）进行灾难恢复、如何结合 HADR 和备份实现全面的系统弹性、HADR 架构比较：快速网络与慢速网络、视频指南：如何使用 SafeKit 实现 HADR、🔍 探索 SafeKit"
translation: "translate_md 2026-11-19.2 | glossaire 2026-11-19.28 | Translation LLM | 54 expressions"
image: "/wp-content/uploads/2026/01/safekit-backup-3-nodes-5-1024.jpg"
schemaType: "TechArticle"
---

# 将 SafeKit 高可用性与灾难恢复备份相结合 {#combining-safekit-high-availability-with-disaster-recovery-backups}

## 用于高可用性的同步 SafeKit 复制与用于灾难恢复的异步备份复制 {#synchronous-safekit-replication-for-ha-vs-asynchronous-backup-replication-for-dr}

SafeKit 提供灵活的、基于软件的**高可用性和灾难恢复 (HADR)架构**，无需昂贵的共享存储。**通过在服务器 1 和服务器 2 之间的扩展 VLAN 上实现同步复制**，SafeKit 确保您的关键应用程序在两个冗余站点之间保持“实时”和一致。

为解决低带宽广域网的限制，SafeKit 的设计旨在与**备份和恢复解决方案**配合使用。这使组织能够通过自动故障转移来保持 24/7 全天候正常运行，同时保护历史数据以进行异地灾难恢复。

因此，通过 SafeKit，环境可以免受硬件或软件故障的影响，并通过备份解决方案，可以防止逻辑错误和勒索软件等网络威胁。


![技术图表显示了高可用性（SafeKit）和备份为何相辅相成：SafeKit 通过同步复制处理硬件/软件故障转移，而异步备份则可防止勒索软件和逻辑错误。](/wp-content/uploads/2026/01/safekit-backup-3-nodes-5-1024.jpg "w:512")

**使用 SafeKit 实现高可用性，通过备份实现灾难恢复**

## 目录 {#table-of-contents}

  * [同步 HADR：通过高速网络（LAN /虚拟局域网）实现零数据丢失](#synchronous-hadr-fast-network)
  * [异步 HADR：通过慢速网络（广域网）进行灾难恢复](#asynchronous-hadr-slow-network)
  * [如何结合 HADR 和备份实现全面的系统弹性](#hadr-resilience-strategy)
  * [HADR 架构比较：快速网络与慢速网络](#hadr-architectures-comparison)
  * [视频指南：如何使用 SafeKit 实现 HADR](#videoguide-hadr-safekit)
  * [🔍 探索 SafeKit](#hub)



{{%  insert-safekit-4-buttons-zh-hans  %}}
 

## 同步 HADR：通过高速网络（LAN /虚拟局域网）实现零数据丢失 {#synchronous-hadr-fast-network}

### 如何在高速网络上实现 HADR？ {#hadr-fast-network-architecture}


![不使用共享磁盘的 HADR（高可用性和灾难恢复）架构](/wp-content/uploads/2023/02/remote-datacenters.png "w:256")


要在高速网络上实施 HADR，请在远程站点上部署两个节点，以同时提供高可用性和灾难恢复。这种设置可确保即使整个站点发生故障，您的应用程序仍保持可用，而无需共享存储基础设施的复杂性。

### 为什么针对高速网络使用无共享存储的 HADR 解决方案？ {#sanless-hadr-solution}

像 SafeKit 这样的无 SAN 解决方案至关重要，因为它可以在两个节点之间同步实时复制数据，而无需共享磁盘。由于同步复制可确保零数据丢失（RPO = 0），因此如果发生硬件或软件故障，该软件可以立即触发自动应用程序故障转移。

### 同步 HADR 的网络要求是什么？ {#extended-lan-vlan-requirements}

同步 HADR 需要扩展的 LAN 或扩展 VLAN，原因有三：

  * **虚拟 IP 故障转移：** 需要单个子网。[虚拟 IP 地址](</zh-hans/best-practises/how-a-virtual-ip-address-works/>)可以在节点之间自动移动。
  * **低延迟：** 无数据丢失的[同步复制](</zh-hans/best-practises/synchronous-replication-vs-asynchronous-replication/>)通常需要网络往返时间小于 5 毫秒。
  * **高带宽：** 需要 1 Gb/s 或更高的连接速度，以确保在回切期间快速重新同步数据。


## 异步 HADR：通过慢速网络（广域网）进行灾难恢复 {#asynchronous-hadr-slow-network}

### 如何在慢速网络上实施 HADR？ {#hadr-slow-network-architecture}


![HADR 架构将高可用性与灾难恢复分离](/wp-content/uploads/2023/03/hadr-slow-network-1.png "w:256")


要在慢速网络（广域网）上实施 HADR，架构通常将**高可用性**与**灾难恢复**分开。在这种情况下，两个节点部署在主站点以实现本地冗余，而单独的备份或异步复制策略用于保护远程站点的数据。

### 对于低带宽连接，最佳 HADR 解决方案是什么？ {#sanless-ha-with-remote-dr}

最佳解决方案是在主站点部署 **SafeKit**，利用同步实时复制和自动故障转移实现本地高可用性。对于灾难恢复站点，数据通过异步复制或通过慢速网络进行计划备份来保护，确保本地正常运行时间不受广域网延迟的限制。要实现此架构，**需要一个专用的备份解决方案**（SafeKit 以外）来管理远程站点的数据传输和恢复。 

### 故障转移如何与远程灾难恢复站点配合使用？ {#dr-site-failover-process}

由于慢速网络上的异步复制涉及潜在的数据丢失（RPO > 0），因此故障转移到灾难恢复站点通常是手动操作，并由管理员管理：

  * **数据恢复：** 将备份恢复到灾难恢复站点上的辅助服务器。现代解决方案可快速恢复虚拟机 (VM)，以减少恢复时间。**Veeam 就是一个例子**。
  * **DNS 重定向：** 流量在 DNS 级别重定向到 DR 站点。恢复时间取决于 DNS 缓存超时 (TTL)，并且某些客户端应用程序可能需要重新启动才能获取新的 IP 地址。
  * **手动决策：** 管理员必须在授权切换到辅助数据中心之前，验证远程站点的数据完整性。


## 如何结合 HADR 和备份实现全面的系统弹性 {#hadr-resilience-strategy}

### 高可用性和数据备份的比较 {#ha-vs-backup-comparison}


![SafeKit 高可用性软件徽标](/wp-content/uploads/2026/04/safekit-icon-512x512-1.png "w:64")

 

![数据备份策略图标](/wp-content/uploads/2026/01/backup-icon.png "w:64")


虽然**高可用性（HA）** 和**备份解决方案**对于数据保护都至关重要，但它们针对的风险不同。**由 SafeKit 驱动的高可用性**提供“实时”故障转移机制，以在服务器中断或硬件故障期间保持应用程序的可访问性。**相反，备份解决方案**充当“历史”存档。虽然高可用性通过实时复制数据来确保 99.99% 的系统可用性，但备份侧重于数据完整性，提供必要的恢复点以从逻辑错误、意外删除或勒索软件攻击中恢复。

### 高可用性可以替代备份策略吗？ {#ha-vs-backup-ransomware}

不，高可用性和备份是互补的，而不是可互换的。虽然 **SafeKit** 通过在硬件崩溃期间保持应用程序运行来确保**业务连续性**，但它不能防止逻辑错误、意外删除或勒索软件攻击。例如，由于实时复制会立即镜像每个更改，因此对主节点的勒索软件攻击将立即复制到辅助节点。要从此类网络威胁或意外删除中恢复，**您需要一个具有强大保留策略的专用备份解决方案**。这使您可以将环境“倒回”到损坏发生之前的健康状态。

### 优化 RTO 和 RPO：HA 与备份之间的协同作用 {#ha-backup-rpo-rto}

要构建真正有弹性的基础设施，您必须将高可用性和备份整合到统一的策略中。这两种技术解决了恢复时间目标 (RTO) 和恢复点目标 (RPO) 的不同维度。有关更多详细信息，请参阅[带有示例的 RTO 和 RPO](</zh-hans/best-practises/what-is-rpo-and-rto-with-examples/>)。

  * **高可用性（通过 SafeKit）：** 其目标是**即时恢复**。SafeKit 维护着您环境的实时同步副本。其 RTO 接近于零。其 RPO 为零。如果服务器发生故障，应用程序会立即在辅助节点上恢复，确保在转换过程中没有服务中断或数据丢失。
  * **备份解决方案：** 其目标是**数据弹性**。高可用性（HA）使服务保持“实时”，而备份则创建“不可变”的历史记录。当实时数据本身受到损害时，备份是您的安全网。它允许您从特定时间点恢复数据库的干净版本，即在病毒或意外删除发生之前。


## HADR 架构比较：快速网络与慢速网络 {#hadr-architectures-comparison}

标准 | 快速网络（LAN /虚拟局域网） | 网络（广域网）速度慢  
---|---|---  
主要范围 | 本地冗余和高可用性 | 站点到站点灾难恢复  
用例 | 同一数据中心或园区 | 远程数据中心或云区域  
复制类型 | 同步（实时） | 异步/备份  
RPO（数据丢失） | 零 (RPO = 0) | 潜在数据丢失 (RPO > 0)  
故障转移流程 | 自动 | 手动（Admin 决定）  
交通改道 | 虚拟 IP 地址（VIP） | DNS 级别（取决于 TTL）  
延迟要求 | 低（通常 < 5 毫秒） | 支持高延迟  
主要恢复目标 | 即时业务连续性 | 数据安全与保留  
  
## 视频指南：如何使用 SafeKit 实现 HADR {#videoguide-hadr-safekit}

###  如何使用 SafeKit 实现 HADR：同步复制和故障转移 {#how-to-implement-hadr-with-safekit-synchronous-replication--failover}

了解如何使用 SafeKit 将**高可用性 (HA)** 和**灾难恢复 (DR)** 结合到单个 HADR 策略中。本视频指南探讨了实现 100% 应用程序正常运行时间所需的架构，而无需共享磁盘。

### 视频亮点 {#video-highlights}

  1. 🎬 [SafeKit HADR over 扩展 VLAN 简介](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=0s>) (1:06)
  2. 🎬 [同步镜像和双重确认的工作原理](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=65s>) (1:41)
  3. 🎬 [故障转移机制：免费 ARP (GARP) 和虚拟 IP](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=166s>) (2:10)
  4. 🎬 [为慢速广域网设计：高可用性与备份策略](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=296s>) (2:45)


### SafeKit 视频：如何使用 SafeKit 实现高可用性和灾难恢复 (HADR) (7:40) {#safekit-video-how-to-implement-high-availability-and-disaster-recovery-hadr-with-safekit-740}



{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}