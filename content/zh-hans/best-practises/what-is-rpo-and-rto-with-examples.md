---
title: "什么是 RPO 和 RTO？定义、示例和 HA 策略"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/what-is-rpo-and-rto-with-examples/"
description: "通过清晰的示例了解 RPO（恢复点目标）和 RTO（恢复时间目标）的定义。了解 SafeKit 如何实现零数据丢失（RPO = 0）和快速故障转移，以确保 24/7 全天候业务连续性。"
category: "best-practises"
lang: "zh-hans"
topics: "快速总结：RPO 与 RTO、目录、如何计算高可用性和业务连续性解决方案的 RPO 和 RTO？、如何确定备份和灾难恢复解决方案的 RPO 和 RTO？、SafeKit mirror 集群如何实现零 RPO 和低 RTO？、对于带有负载均衡的 SafeKit farm 集群 RTO 基准是什么？、对比表：RTO 与 RPO、高可用性实践：零数据丢失和近乎零停机的实时演示、常见问题：优化业务连续性的 RPO 和 RTO、🔍 探索 SafeKit"
translation: "translate_md 2026-11-20.9 | glossaire 2026-11-20.24 | Translation LLM | 54 expressions"
image: "/wp-content/uploads/2026/08/rto-rpo-5-1024-en-2.jpg"
---

# 什么是 RPO 和 RTO？定义、示例和 HA 策略 {#what-are-rpo-and-rto-definitions-examples-and-ha-strategies}

## 快速总结：RPO 与 RTO {#article-summary}

  * **RPO（恢复点目标）：** 衡量**数据丢失情况**。它定义了必须恢复的文件的最大年龄，以便恢复操作。
  * **RTO（恢复时间目标）：** 衡量**停机时间**。它是业务流程必须恢复的时间长度。
  * **主要区别：** RPO 关注的是**存储和备份**。RTO 关乎**恢复和故障转移速度**。
  * **SafeKit：** 通过同步复制和自动故障转移，提供 **0 的 RPO**（无数据丢失）和**低的 RTO**（快速重启）。


![RPO（恢复点目标）和 RTO（恢复时间目标）的比较图表，说明 SafeKit 如何实现零数据丢失和快速应用程序重启。](/wp-content/uploads/2026/08/rto-rpo-5-1024-en-2.jpg "w:512")

**RPO 与 RTO：比较 SafeKit 中的数据丢失和恢复时间**

## 目录 {#table-of-contents}

  * [如何计算高可用性和业务连续性解决方案的 RPO 和 RTO？](#calculate-rpo-rto-high-availability)
  * [如何确定备份和灾难恢复解决方案的 RPO 和 RTO？](#calculate-rpo-rto-backup-solution)
  * [SafeKit mirror 集群如何实现零 RPO 和低 RTO？](#rpo-rto-safekit-mirror-cluster)
  * [对于带有负载均衡的 SafeKit <span class="notranslate farm-term" translate="no">farm</span> 集群 RTO 基准是什么？](#rpo-rto-safekit-farm-cluster)
  * [对比表：RTO 与 RPO](#rpo-vs-rto-comparison)
  * [高可用性实践：零数据丢失和近乎零停机的实时演示](#safekit-rpo-rto-video-demos)
  * [常见问题：优化业务连续性的 RPO 和 RTO](#faq-rpo-rto)
  * [SafeKit 高可用性导航中心](#hub)



{{%  insert-safekit-4-buttons-zh-hans  %}}
 

## 如何计算高可用性和业务连续性解决方案的 RPO 和 RTO？ {#calculate-rpo-rto-high-availability}

### 什么是高可用性？ {#what-is-high-availability}

**高可用性 (HA)** 是一种技术架构，旨在确保系统在指定的时间百分比（例如 99.99%）内保持运行和可访问。


![SafeKit 高可用性软件徽标，代表同步复制和故障转移](/wp-content/uploads/2026/01/safekit-icon-512x512-1.png "w:128")


为实现**业务连续性计划**中定义的 RPO 和 RTO 目标，高可用性通常通过两种主要架构来实现：

  * **通过 SAN 共享磁盘系统：** 传统集群，其中 2 个节点连接到中央存储区域网络 (SAN)。如果一个节点发生故障，另一个节点将接管对共享数据的访问。
  * **无共享存储的同步复制：** 一种由 SafeKit 实现的现代无共享架构。数据在两个独立节点的本地磁盘之间实时复制。无需 SAN。


### 高可用性解决方案的 RPO 是什么？ {#what-is-rpo-high-availability}

**RPO（恢复点目标）** 定义了以时间为单位测量的最大可容忍数据丢失量。对于真正的**高可用性解决方案**，目标 RPO **为零**。

在实施具有自动故障转移功能的高可用性集群时，**零 RPO** 可确保应用程序在重启时不会丢失数据。

  * **通过 SAN 共享磁盘系统：** 由于两个节点访问**完全相同的物理数据块**，因此节点之间没有“增量”或延迟，从而确保在故障转移期间实现完全的数据一致性。
  * **基于软件的同步复制：** 每次“写入”操作都会通过网络实时镜像。只有当数据安全地存储在两个节点上时，应用程序才会收到**写入确认**。这种同步的“双写入”过程可确保即使主服务器发生故障，也**不会丢失任何数据**。


### 高可用性解决方案的 RTO 是什么？ {#what-is-rto-high-availability}

**RTO（恢复时间目标）** 表示服务中断后可容忍的最大停机时间。在**高可用性**环境中，RTO 应尽可能短，以确保关键应用程序的持续访问。

为了实现较低的 RTO，高可用性解决方案利用**自动故障转移**来检测硬件或软件故障并立即重新启动应用程序。在典型的高可用性集群中，**RTO 大约为一分钟**，计算方法如下：

  * **故障检测时间：** 系统识别节点或应用程序心跳丢失所需的时间间隔。
  * **自动重启时间：** 应用程序服务在幸存节点上初始化的所需时间。


## 如何确定备份和灾难恢复解决方案的 RPO 和 RTO？ {#calculate-rpo-rto-backup-solution}

### 什么是备份解决方案？ {#what-is-backup}

**备份解决方案**是一种数据保护策略，旨在将数据的周期性副本创建到辅助存储设备或云端。与高可用性不同，备份侧重于**长期数据保留**以及从数据损坏或站点范围的灾难中恢复。


![备份解决方案图标，代表用于长期数据保留的备份架构](/wp-content/uploads/2026/01/backup-icon.png "w:128")


为满足**灾难恢复计划**中定义的 RPO 和 RTO 目标，备份通常通过两种主要方法实现：

  * **计划快照：** 以固定间隔（例如，每天）获取数据的时间点副本的过程。这定义了 **RPO**，因为上次快照和故障之间修改的任何数据都会丢失。
  * **异地或云恢复：** 一种架构，其中数据存储在单独的物理位置。虽然这可以确保数据存活，但会导致 **RTO 较高**，因为必须在应用程序重新启动之前传输和恢复数据。


### 备份解决方案的 RPO 是什么？ {#what-is-rpo-backup}

在备份环境中，**RPO（恢复点目标）** 定义了必须从存储中恢复的文件的年龄，以便恢复正常操作。与高可用性不同，**备份解决方案**通常涉及非零 RPO，表示自上次成功完成备份以来经过的时间。 

备份策略中的数据丢失量取决于**备份频率**。根据架构不同，此 RPO 范围可以从几分钟到 24 小时： 

  * **增量快照：** 一种方法，仅在设定的时间间隔内保存更改的数据块。如果每 4 小时进行一次备份，**则最大 RPO 为 4 小时**，这意味着在上次快照和系统崩溃之间创建的任何数据都将永久丢失。 
  * **每日完整备份：** 一种传统方法，每天（通常在夜间）对数据进行一次完整复制。这会产生 **24 小时的 RPO**，对于非关键数据来说可能可以接受，但对于事务数据库来说通常是不够的。 


### 备份解决方案的 RTO 是什么？ {#what-is-rto-backup}

备份策略中的**恢复时间目标 (RTO)** 是指从备份介质恢复数据并将应用程序恢复到运行状态所需的时间。与高可用性不同，**备份的 RTO** 要长得多，因为它涉及手动或脚本化的恢复过程。 

对于备份解决方案，RTO 范围可以从**几小时到几天**不等，具体取决于数据量和恢复架构。总停机时间计算如下： 

  * **数据传输时间：** 将数据从备份存储（本地磁盘、磁带或云）移回生产服务器所需的时间。 
  * **系统重新配置时间：** 将数据提取到应用程序、重建索引以及验证数据完整性所需的时间，之后用户才能重新登录。 


## SafeKit mirror 集群如何实现零 RPO 和低 RTO？ {#rpo-rto-safekit-mirror-cluster}

### 什么是 SafeKit mirror 集群？ {#what-is-safekit-mirror-cluster}

**SafeKit mirror 集群**是一种基于软件的高可用性解决方案，它实现了无共享架构。与需要昂贵 SAN 的传统集群不同，SafeKit 使用两台标准服务器的本地资源来创建高度弹性的环境。


![SafeKit mirror 集群架构显示主节点和辅助节点之间实时字节级文件复制](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


为确保您的**业务连续性计划**中的正常运行时间和数据保护达到最大值，SafeKit mirror 集群通过两种集成机制运行：

  * **实时同步复制：** SafeKit 在主节点和辅助节点的本地磁盘之间通过网络镜像数据。这确保了 RPO 为零，因为在事务完成之前，每个字节的数据都已在两个服务器上得到保护。
  * **自动 IP 和应用程序故障转移：** 如果主节点发生故障，SafeKit 会自动检测到心跳丢失，并在辅助节点上重新建立应用程序及其虚拟 IP 地址。这使得 RTO 大约为一分钟，从而提供无缝的服务连续性。


### SafeKit mirror 集群的 RPO 是多少？ {#rpo-safekit-example}

**SafeKit mirror 集群的 RPO 为零**，因为节点之间的数据复制是[同步和实时的](</zh-hans/best-practises/synchronous-replication-vs-asynchronous-replication/> "同步复制与异步复制")。

这种零数据丢失的保证是通过**写入确认**过程实现的：只有当写入成功写入主节点和辅助节点的本地磁盘后，才会向应用程序确认写入磁盘。

相比之下，**异步复制**的 RPO 大于零。由于主写入和辅助更新之间存在延迟，故障将导致在故障转移到辅助服务器期间丢失数据。对于关键**业务连续性**，同步复制是确保应用程序以 100% 数据完整性重新启动的唯一方法。

### SafeKit mirror 集群的 RTO 是多少？ {#what-is-rto-safekit}

在标准配置中，**SafeKit mirror 集群的 RTO 大约是一分钟** SafeKit 提供了在**应用程序级别**或 **VM 级别**实现高可用性的灵活性。每个选项对恢复时间都有不同的影响： 

  * **应用级高可用性：** 这是 SafeKit 使用的优化方法。该软件会监控特定的应用程序服务。 
    * **硬件故障：** RTO =*心跳超时*（默认为 30 秒）+*应用程序重启时间*。
    * **软件故障：** RTO =*应用程序停止时间*+*应用程序重启时间*。
    * **主要优势：** 由于操作系统已在辅助节点上运行，因此没有操作系统启动延迟，从而为**业务连续性**带来最快的恢复速度。
  * **VM 级 HA：** 在此场景中，SafeKit 保护整个虚拟机。 
    * **故障恢复：** RTO =*故障检测*+*操作系统重启时间*+*应用程序重启时间*。
    * **技术权衡：** RTO 自然会更长（几分钟），因为辅助节点必须在应用程序开始初始化之前对操作系统执行完整的冷启动。


通过利用**应用级高可用性**，SafeKit 消除了标准虚拟化固有的“重启惩罚”，确保您的**业务连续性计划**实现尽可能低的停机时间。 

## 对于带有负载均衡的 SafeKit <span class="notranslate farm-term" translate="no">farm</span> 集群 RTO 基准是什么？ {#rpo-rto-safekit-farm-cluster}

### 什么是 SafeKit <span class="notranslate farm-term" translate="no">farm</span> 集群？ {#what-is-safekit-farm-cluster}

**SafeKit <span class="notranslate farm-term" translate="no">farm</span> 集群**是一种基于软件的高可用性解决方案，专为需要**可扩展性**和**冗余**的无状态应用程序（如 Web 服务器）而设计。与专注于数据复制的 mirror 集群不同，<span class="notranslate farm-term" translate="no">farm</span> 集群将传入流量分配到多个活动节点。


![SafeKit farm 集群架构演示无状态应用程序的网络负载均衡和故障转移](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


为了在高流量环境下保持**业务连续性**，SafeKit <span class="notranslate farm-term" translate="no">farm</span> 集群通过两种核心机制运行：

  * **网络负载均衡：** SafeKit 使用虚拟 IP 地址将传入的网络流量分配到多个活动服务器组成的 <span class="notranslate farm-term" translate="no">farm</span> 中。这确保了没有单个服务器被压垮，并最大限度地提高了应用程序的性能。
  * **自动故障检测和重新配置：** 如果 <span class="notranslate farm-term" translate="no">farm</span> 中的一个节点发生故障，SafeKit 会通过心跳检测到故障，并立即将其流量重新分配给其余健康的节点。这为整体服务提供了接近零的 RTO，因为其他节点已经处于活动状态并准备好吸收负载。


### SafeKit <span class="notranslate farm-term" translate="no">farm</span> 集群的 RPO 是多少？ {#what-is-rpo-safekit-farm}

**SafeKit <span class="notranslate farm-term" translate="no">farm</span> 集群**的**恢复点目标 (RPO)** 通常被认为**不适用 (N/A)**。这是因为 <span class="notranslate farm-term" translate="no">farm</span> 集群是专门为**无状态应用程序**设计的，这些应用程序的数据不存储在节点上。 

由于 <span class="notranslate farm-term" translate="no">farm</span> 集群侧重于**网络负载均衡**而非数据同步，因此集群内的节点之间没有数据复制。在涉及 <span class="notranslate farm-term" translate="no">farm</span> 架构的典型**业务连续性计划**中： 

  * **无状态操作：**<span class="notranslate farm-term" translate="no">farm</span> 中的所有节点都是相同的，并且不保存持久性数据；因此，在节点故障期间，没有“数据丢失”可供衡量。 
  * **外部数据存储：** 如果应用程序需要数据持久性，通常由后端单独的 **SafeKit mirror 集群**处理。此时，RPO 为零。 


### SafeKit <span class="notranslate farm-term" translate="no">farm</span> 集群的 RTO 是多少？ {#rto-example-safekit-farm-cluster}

在 <span class="notranslate farm-term" translate="no">farm</span> 架构中，由于所有节点通常同时处于活动状态，因此 **RTO 缩短到仅几秒钟**。恢复时间取决于集群重新配置其流量分配的速度：

  * **硬件故障：** RTO 等于跨监控通道的*故障检测超时*（默认为几秒钟）。一旦检测到心跳丢失，**虚拟 IP 负载平衡过滤器**将自动重新配置，将流量重定向到剩余的健康节点。
  * **软件故障或计划重启：** RTO 计算方法是*应用程序停止时间*加上该特定节点上的*应用程序重启时间*，在此期间，<span class="notranslate farm-term" translate="no">farm</span> 中的其他节点将继续处理所有传入流量。


这种“主动-主动”机制确保对于无状态服务，**业务连续性**对最终用户的影响几乎无法察觉，因为无需在新的备用节点上初始化服务。

## 对比表：RTO 与 RPO {#rpo-vs-rto-comparison}

**语义定义：RTO 与 RPO**

指标 | 首字母缩略词 | 定义 | 重点领域  
---|---|---|---  
恢复时间目标 | RTO | 业务流程在发生故障后恢复的预期时间。 | 可用性/停机时间  
恢复点目标 | RPO | 恢复操作所需的、必须从备份中恢复的文件的最大年龄。 | 数据丢失/完整性  
  
**高可用性 (HA) 与标准备份**

功能 | 备份解决方案 | 高可用性 (SafeKit)  
---|---|---  
恢复自动化 | 手动干预 | 自动故障转移  
目标 RTO | 小时到天 | 几秒钟到大约 1 分钟  
目标 RPO | > 0（上次备份点） | 0（同步复制）  
  
**SafeKit 集群的 RTO 和 RPO 基准**

架构 | 用例 | RTO（可用性） | RPO（数据丢失）  
---|---|---|---  
Mirror 集群 | 实时复制 | 约 1 分钟（心跳+重启） | 0（无数据丢失）  
<span class="notranslate farm-term" translate="no">Farm</span> 集群 | 网络负载均衡 | 几秒钟 | 无状态  
  
## 高可用性实践：零数据丢失和近乎零停机的实时演示 {#safekit-rpo-rto-video-demos}

### 视频：在 SafeKit mirror 集群中实现零 RPO 和低 RTO (8:47) {#demo-mirror-cluster-rpo-rto}

了解 SafeKit 如何处理严重故障。此视频演示了**同步复制**，确保 SQL 数据库中没有数据丢失（RPO 0），以及辅助节点上服务的**自动重启**（低 RTO）。


#### 章节 {#chapters}

  1. 🎬 [2 个带有 SQL Server 节点](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. 🎬 [配置集群和 mirror.safe 模块](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. 🎬 [启动和测试 SQL 复制、迁移、崩溃时故障转移](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)

[在此免费试用](</zh-hans/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/>)

### 视频：在 SafeKit <span class="notranslate farm-term" translate="no">farm</span> 集群中实现近乎零的 RTO (5:03) {#demo-farm-cluster-rpo-rto}

观看 SafeKit 如何管理运行 Apache 的 Web <span class="notranslate farm-term" translate="no">farm</span>，以提供性能扩展和即时故障转移。

#### 章节 {#chapters-1}

  1. 🎬 [2 个节点与 Apache](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=0s>) (0:13)
  2. 🎬 [配置集群和 farm.safe 模块](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=13s>) (2:20)
  3. 🎬 [启动并测试网络负载均衡，崩溃时故障转移](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=153s>) (2:30)

[在此免费试用](</zh-hans/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/>)

## 常见问题：优化业务连续性的 RPO 和 RTO {#faq-rpo-rto}

### RPO 和 RTO 可以为零吗？ {#can-rpo-rto-be-zero}

**是的**。实现**零 RPO** 意味着没有数据丢失，这可以通过同步数据镜像来实现。通过 SafeKit 等自动化故障转移软件可以实现**近乎零的 RTO**，该软件可在几秒或几分钟内检测到故障并在辅助节点上重新启动应用程序。

### RPO 和 RTO 哪个更重要？ {#importance-rpo-vs-rto}

两者没有哪个更重要，它们扮演着不同的角色。**RPO（恢复点目标）** 侧重于数据丢失——您可以承受的数据丢失量。**恢复时间目标 (RTO)** 关注停机时间，即您必须多快恢复在线。对于任务关键型应用，两者都必须最小化。

### 使用 SafeKit 时，应用级高可用性和虚拟机级高可用性在 RPO 和 RTO 方面有何不同？ {#safekit-application-vs-vm-level}

虽然两者都通过同步复制确保 **RPO 为 0**，但它们的恢复时间不同：

  * **应用程序级别：** 更快的 RTO（约 1 分钟），因为只需在已运行的操作系统上重新启动应用程序服务。它还可以检测到特定的软件/进程崩溃。
  * **VM 级别：** RTO 较高，因为整个虚拟机必须在辅助主机上重新启动。虽然与应用程序无关，但它缺乏对应用程序进程本身的精细监控。


### 就 RTO 而言，高可用性（HA）和备份解决方案之间有什么区别？ {#ha-vs-backup-rto}

高可用性 (HA) 通常提供更低的 RTO（几秒到几分钟），因为它会自动处理本地故障。使用备份解决方案的灾难恢复 (DR) 通常具有更高的 RTO（几小时到几天），因为它涉及在重大灾难后恢复地理位置遥远的数据和服务的站点。

### 如何在远程站点之间实现最佳 RPO 和 RTO？ {#rpo-rto-between-remote-sites}

要在远程站点实现**零 RPO** 和**近零 RTO**，需要**同步复制**和**扩展 LAN（扩展 VLAN）** 的组合：

  * **扩展 LAN/扩展 VLAN：** 通过将同一子网（第 2 层）扩展到两个数据中心，您可以将应用程序从站点 A 移动到站点 B，而无需更改其 IP 地址，从而避免复杂的 DNS 更新。
  * **SafeKit 解决方案：** SafeKit 通过提供在站点之间浮动**的软件定义虚拟 IP (VIP)** 来利用这一点。它使用免费 ARP (GARP) 将流量即时重定向到辅助站点。


这可实现 **RPO = 0**（实时镜像）和**最小 RTO**（在大约 1 分钟内故障转移），无需人工干预。

### 为什么将高可用性和备份结合起来对于优化 RPO 和 RTO 至关重要？ {#combining-ha-and-backup-for-rpo-rto}

将高可用性 (HA) 与备份解决方案相结合是实现兼顾两者的恢复策略的唯一方法。虽然它们经常一起讨论，但它们解决了 RPO/RTO 等式中的不同部分：

  * **高可用性（通过 SafeKit）：** 在硬件或软件故障期间，实现近乎零的 RTO 和零 RPO。通过使用实时同步复制，辅助服务器始终保持最新状态。如果主服务器发生故障，服务将立即在辅助服务器上重新启动，且不会丢失数据。
  * **备份解决方案：** 备份可防止数据完整性问题（如勒索软件或意外删除）。由于 HA 会即时复制更改，因此它会“忠实地”将病毒或已删除的数据库记录复制到备用服务器。备份允许您“回到”损坏发生之前的时间点。
  * **混合方法：** 为了实现最大的弹性，组织使用 **3 节点混合架构**。这包括一个具有同步复制的 2 节点本地集群，用于即时高可用性，以及用于灾难恢复的第三个远程副本（异步）。这种分层防御可确保您拥有一个用于即时恢复的“实时”副本和一个用于数据安全的“历史”副本。



{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}