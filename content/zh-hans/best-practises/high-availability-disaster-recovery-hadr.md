---
title: "将SafeKit高可用性与灾难恢复备份相结合"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/high-availability-disaster-recovery-hadr/"
description: "通过将SafeKit用于同步复制（RPO=0）并结合异步备份以实现异地灾难恢复，构建弹性高可用性/灾难恢复 (HA/DR) 策略。利用这种双层架构，确保Windows和Linux上的应用程序全天候正常运行，并保证数据完整性。"
category: "best-practises"
lang: "zh-hans"
topics: "同步SafeKit复制实现高可用性，异步备份复制实现灾难恢复，目录，同步高可用性灾难恢复：高速网络（LAN/VLAN）零数据丢失，异步高可用性灾难恢复：低速网络（WAN）灾难恢复，如何结合高可用性灾难恢复和备份以实现系统全面弹性，高可用性灾难恢复架构比较：高速网络与低速网络，视频指南：如何使用SafeKit实现高可用性灾难恢复，🔍 SafeKit高可用性导航中心"
---

# 将SafeKit高可用性与灾难恢复备份相结合 {#combining-safekit-high-availability-with-disaster-recovery-backups}

## 用于高可用性的同步复制SafeKit与用于灾难恢复的异步备份复制） {#synchronous-safekit-replication-for-ha-vs-asynchronous-backup-replication-for-dr}

SafeKit提供了一种灵活的、基于软件的**高可用性和灾难恢复 (HADR) 架构** ，无需昂贵的共享存储。通过在服务器 1 和服务器 2 之间跨扩展 VLAN 实施**同步复制** ， SafeKit可确保您的关键应用程序在两个冗余站点之间保持“在线”且一致。

为了应对低带宽广域网的限制， SafeKit旨在与**备份和恢复解决方案**配合使用。这使得企业能够通过自动故障转移保持 24/7 全天候正常运行，同时确保历史数据安全，以便进行异地灾难恢复。

因此，通过SafeKit ，环境可以免受硬件或软件故障的影响，并通过备份解决方案防止逻辑错误和勒索软件等网络威胁。


![技术图展示了高可用性 ( SafeKit ) 和备份如何互补： SafeKit通过同步复制处理硬件/软件故障转移，而异步备份则可抵御勒索软件和逻辑错误](/wp-content/uploads/2026/01/safekit-backup-3-nodes-5-1024.jpg "w:512")

**高可用性与备份：结合SafeKit同步复制和**异步灾难恢复

## 目录 {#table-of-contents}

  * [同步高可用性灾难恢复：高速网络（LAN/VLAN）零数据丢失](#synchronous-hadr-fast-network)
  * [异步高可用性灾难恢复：慢速网络（广域网）上的灾难恢复](#asynchronous-hadr-slow-network)
  * [如何将高可用性灾难恢复 (HADR) 与备份相结合以实现系统全面恢复](#hadr-resilience-strategy)
  * HADR架构比较：快速网络与](#hadr-architectures-comparison)网络[
  * [视频指南：如何使用SafeKit和](#videoguide-hadr-safekit)实施 HADR
  * [ 🔍 SafeKit高可用性导航中心](#hub)



{{%  insert-safekit-4-buttons-zh-hans  %}}
 

## 同步高可用性灾难恢复：高速网络（局域网/虚拟局域网）零数据丢失 {#synchronous-hadr-fast-network}

### 如何在高速网络上实现高可用性灾难救援 (HADR)？ {#hadr-fast-network-architecture}


![架构结合了高可用性和灾难恢复 (HADR)，无需共享磁盘](/wp-content/uploads/2023/02/remote-datacenters.png "w:256")


要在高速网络上实现高可用性和灾难恢复 (HADR)，可在远程站点部署两个节点，以同时提供高可用性和灾难恢复能力。这种设置可确保即使整个站点发生故障，您的应用程序仍能保持可用，而无需复杂的共享存储基础架构。

### 为什么高速网络需要使用SAN的HADR解决方案？ {#sanless-hadr-solution}

SafeKit这样的无 SAN 解决方案至关重要，因为它无需共享磁盘即可在两个节点之间同步实时复制数据。由于同步复制可确保零数据丢失 (RPO=0)，因此一旦发生硬件或软件故障，该软件可以立即触发应用程序自动故障转移。

### 同步高可用性灾难救援（HADR）的网络要求是什么？ {#extended-lan-vlan-requirements}

同步高可用性灾难恢复 (HADR) 需要扩展的局域网 (LAN) 或扩展的虚拟局域网 (VLAN)，原因有三：

  * **虚拟 IP 故障转移：**需要一个子网才能在节点之间自动故障转移[虚拟 IP 地址](</zh-hans/best-practises/how-a-virtual-ip-address-works/>) 。
  * **低延迟：** [同步复制](</zh-hans/best-practises/synchronous-replication-vs-asynchronous-replication/>)无数据丢失通常需要小于 5ms 的网络往返时间。
  * **高带宽：**需要 1 Gb/s 或更高的连接速度才能确保在故障恢复期间快速数据重新同步。


## 异步高可用性灾难恢复：基于慢速网络（广域网）的灾难恢复 {#asynchronous-hadr-slow-network}

### 如何在低速网络上实现高可用性灾难救援 (HADR)？ {#hadr-slow-network-architecture}


![ HADR架构将高可用性与灾难恢复分离](/wp-content/uploads/2023/03/hadr-slow-network-1.png "w:256")


为了在低速网络（广域网）上实现高可用性和**灾难恢复**(HADR)，架构通常会将**高可用性**与灾难恢复分离。在这种情况下，会在主站点部署两个节点以实现本地冗余，同时使用单独的备份或异步复制策略来保护远程站点的数据。

### 低带宽连接的最佳高可用性灾难恢复 (HADR) 解决方案是什么？ {#sanless-ha-with-remote-dr}

最佳解决方案是在主站点部署**SafeKit**以实现本地高可用性，并采用同步实时复制和自动故障转移。对于灾难恢复站点，数据通过异步复制或经由低速网络进行的计划备份进行保护，从而确保本地正常运行时间不受广域网延迟的限制。为了实现此架构，需要一个专用的**备份解决方案** （而非SafeKit ）来管理远程站点的数据传输和恢复。 

### 灾难恢复站点如何实现故障转移？ {#dr-site-failover-process}

由于通过慢速网络进行异步复制存在数据丢失的风险（RPO > 0），因此故障转移到灾难恢复站点的过程通常是手动的，并且由管理员管理：

  * **数据恢复：**备份数据会恢复到灾难恢复站点的辅助服务器上。通常会使用**Veeam**等现代解决方案来快速恢复虚拟机 (VM)，从而缩短恢复时间。
  * **DNS 重定向：**流量在 DNS 层被重定向到灾备站点。恢复时间取决于 DNS 缓存超时 (TTL)，某些客户端应用程序可能需要重启才能获取新的 IP 地址。
  * **手动决策：**管理员必须先验证远程站点的数据完整性，然后才能授权切换到辅助数据中心。


## 如何将高可用性灾难恢复 (HADR) 与备份相结合以实现系统全面恢复能力 {#hadr-resilience-strategy}

### 高可用性与数据备份的比较 {#ha-vs-backup-comparison}


![ SafeKit高可用性软件徽标](/wp-content/uploads/2026/04/safekit-icon-512x512-1.png "w:64")

 

![数据备份策略图标](/wp-content/uploads/2026/01/backup-icon.png "w:64")


虽然**高可用性 (HA)**和**备份解决方案**对数据保护都至关重要，但它们针对的风险不同。**高可用性**解决方案（由SafeKit提供支持）提供了一种“实时”故障转移机制，可在服务器中断或硬件故障期间保持应用程序的可访问性。相反，**备份解决方案**则充当“历史”存档。HA 通过实时复制数据来确保 99.99% 的系统可用性，而备份则侧重于数据完整性，提供必要的还原点，以便从逻辑错误、意外删除或勒索软件攻击中恢复。

### 高可用性可以替代备份策略吗？ {#ha-vs-backup-ransomware}

不，高可用性和备份是互补的，不能互换。虽然**SafeKit**通过在硬件崩溃期间保持应用程序运行来确保**业务连续性**，但它无法防范逻辑错误、意外删除或勒索软件攻击。例如，由于实时复制会立即镜像所有更改，因此主节点上的勒索软件攻击会立即复制到辅助节点。要从此类网络威胁或意外删除中恢复，您需要一个具有强大保留策略的专用**备份解决方案**。这使您能够将环境“回滚”到损坏发生之前的健康状态。

### 优化 RTO 和 RPO：高可用性与备份之间的协同作用 {#ha-backup-rpo-rto}

要构建真正具有弹性的基础架构，必须将高可用性和备份集成到统一的策略中。这两种技术分别针对恢复时间目标 ( [ ) 和恢复点目标 (RPO) ](</zh-hans/best-practises/what-is-rpo-and-rto-with-examples/>)不同维度： 

  * **高可用性（通过SafeKit ）：**目标**即时恢复** 。通过维护一个实时同步的mirror环境， SafeKit可实现接近零的恢复时间目标 (RTO) 和零恢复点目标 (RPO)。如果服务器发生故障，应用程序会立即在备用节点上恢复运行，确保在切换过程中不会出现服务中断或数据丢失。
  * **备份解决方案：**目标、 **数据恢复、** 。高可用性 (HA) 可确保服务“持续运行”，而备份则创建“不可更改”的历史记录。当实时数据本身遭到破坏时，备份可作为备用方案，使您能够从病毒感染或意外删除发生之前的特定时间点恢复数据库的干净版本。


## HADR架构比较：快速网络与慢速网络 {#hadr-architectures-comparison}

标准|快速网络（LAN/VLAN） |慢速网络（WAN）  
---|---|---  
主要范围|本地冗余和高可用性|站点到站点灾难恢复  
使用案例|同一数据中心或园区|远程数据中心或云区域  
复制类型|同步（实时） |异步/备份  
RPO（数据丢失） |零 (RPO = 0) |潜在数据丢失 (RPO > 0)  
故障转移流程|自动|手动（管理员决定）  
流量重定向|虚拟 IP 地址 (VIP) | DNS 级别（TTL 相关）  
延迟要求|低（通常 < 5ms） |支持高延迟  
主要恢复目标|立即保障业务连续性|数据安全与保留  
  
## 视频指南：如何使用SafeKit实现 HADR {#videoguide-hadr-safekit}

###  如何使用SafeKit实现 HADR：同步复制和故障转移 {#how-to-implement-hadr-with-safekit-synchronous-replication--failover}

学习如何组合 **高可用性（HA）** 和 **灾难恢复 (DR)** 将HADR策略整合为单一策略 SafeKit本视频指南探讨了在无需共享磁盘的情况下实现 100% 应用程序正常运行时间所需的架构。

### 视频集锦 {#video-highlights}

  1. 🎬 [扩展 VLAN 上的 HADR 简介SafeKit ](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=0s>) (1:06)
  2. 🎬 [同步镜像和双重确认的工作原理 (1:41) ](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=65s>)
  3. 🎬 [故障转移机制：免费 ARP (GARP) 和虚拟 IP ](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=166s>) (2:10)
  4. 🎬 [慢速广域网设计：高可用性与备份策略](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=296s>) (2:45)


### SafeKit视频：如何使用SafeKit实现高可用性和灾难恢复 (HADR) (7:40) {#safekit-video-how-to-implement-high-availability-and-disaster-recovery-hadr-with-safekit-740}

<br /> 


{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}