---
title: "SafeKit：Podman 高可用性和实时数据复制软件"
canonical: "https://safekit.eviden.com/zh-hans/solutions/podman-the-simplest-high-availability-cluster-between-two-redundant-servers/"
description: "SafeKit 提供了一个强大的 Podman 高可用性解决方案，并集成了同步数据复制。在标准 Linux 服务器上实现有状态容器集群，具有自动故障转移和零数据丢失功能。无需 SAN 或共享存储。几分钟即可部署。"
category: "solutions"
lang: "zh-hans"
topics: "SANless SafeKit mirror 集群如何与 Podman 配合使用、目录、SafeKit 软件如何简单地实现 Podman 高可用性集群？、SafeKit mirror 集群如何与 Podman 配合使用？、SafeKit 高可用性限制、比较：SafeKit SANless 集群与传统 Podman HA、比较：SafeKit 与开源 Linux HA（Pacemaker/Corosync/DRBD）、Podman 高可用性概述、🔍 探索 SafeKit"
translation: "translate_md 2026-11-08.3 | glossaire 2026-11-08.6 | Translation LLM | 36 expressions"
---

# SafeKit：Podman 高可用性和实时数据复制软件 {#safekit-podman-high-availability--real-time-data-replication-software}

## SANless SafeKit mirror 集群如何与 Podman 配合使用 {#how-the-sanless-safekit-mirror-cluster-works-with-podman}

SafeKit 提供了一种轻量级、**恰到好处的高可用性解决方案**，专为那些认为 **Kubernetes** 对于本地化或边缘计算容器工作 **SafeKit** 而言资源消耗过大、过于复杂或过度设计而设计的组织量身定制。**为 Linux 上的 Podman 提供了一个简化的、一体化的双节点高可用性集群**。它作为复杂“自己动手”（DIY） Linux 高可用性堆栈的无缝集成替代方案，消除了手动配置 **Corosync** 进行节点成员管理、**Pacemaker** 进行资源编排以及 **DRBD** 进行块级复制的技术负担。**通过利用实时同步复制和自动切换的虚拟 IP 地址**，SafeKit 创建了一个强大的**无共享存储集群**，从而消除了对昂贵共享存储的需求。**这种架构确保了透明的客户端重新连接、快速的自动故障转移以及容器化应用程序的零数据丢失保证（RPO =0）**。

  * ✅**Kubernetes 替代方案：** 为容器提供高可用性，而无需承担 K8s 网络（入口/负载均衡器）和编排的开销。
  * ✅**架构简化：** 用单个软件包取代 Corosync/Pacemaker/DRBD 堆栈。
  * ✅**无需共享存储：** SANless 架构使用本地磁盘和字节级复制。
  * ✅**自动虚拟 IP (VIP) 故障转移：** 确保在切换期间客户端能够透明地重新连接。
  * ✅**同步数据复制：** 保证节点之间零数据丢失（RPO = 0）。
  * ✅**自动故障转移和故障恢复：** 在冗余节点上快速重启应用程序，无需手动脚本。


![SafeKit Podman 高可用性集群架构，提供虚拟 IP、自动故障转移、自动回切和实时复制](/wp-content/uploads/2026/02/safekit-podman-5-1024.jpg "w:512")

**使用 SafeKit 的 SANless 架构为 Podman 容器提供高可用性 (HA) 解决方案**。

<a class="btn-quick-install" href="/zh-hans/quick-install/safekit-quick-installation-guide-with-podman/">⚡ Podman HA 快速安装指南 ></a>
## 目录 {#table-of-contents}

  * [SafeKit 软件如何简单地实现 Podman 高可用性集群？](#how-safekit-implements-podman-ha)
  * [SafeKit mirror 集群如何与 Podman 配合使用？](#safekit-mirror-cluster)
  * [SafeKit 高可用性限制](#safekit-ha-limitations)
  * [比较：SafeKit SANless 集群与传统 Podman HA](#safekit-podman-comparison)
  * [比较：SafeKit 与开源 Linux HA（Pacemaker/Corosync/DRBD）](#safekit-vs-linux-ha-stack)
  * [Podman 高可用性概述](#podman-ha-summary-quick-installation-guide)
  * [🔍 探索 SafeKit](#hub)


## SafeKit 软件如何简单地实现 Podman 高可用性集群？ {#how-safekit-implements-podman-ha}

### 如何在两台服务器上实现 Podman 的高可用性？ {#how-can-i-achieve-high-availability-for-podman-on-two-servers}

**SafeKit** 为两台冗余服务器之间的 **Podman** 提供高可用性解决方案，而无需共享磁盘。**该系统通过配置与 Podman 永久数据相关联的目录的实时复制**来工作。如果发生故障，SafeKit 会管理自动故障转移，并在几秒钟内将您的容器重新启动到辅助节点上。

### Podman 容器的自动网络故障转移是如何工作的？ {#how-does-automatic-network-failover-work-for-podman-containers}

SafeKit 实现了一个**自动切换的虚拟 IP (VIP) 地址**。此 VIP 可作为客户端应用程序的单个入口点。如果主服务器发生故障，SafeKit 会使用**免费 ARP** 将虚拟 IP 移动到冗余服务器。这确保客户端透明地重新连接到已重新启动 Podman 应用程序的同一 IP 地址。

### Podman 的“无 SAN”集群是什么？ {#what-is-a-sanless-cluster-for-podman}

Podman 的**无 SAN 集群**是一种架构，可在无需昂贵的存储区域网络 (SAN) 或网络附加存储 (NAS)**SafeKit** 情况下提供高可用性。**使用基于主机的同步复制**在两台服务器的本地磁盘之间 mirror 数据。**这消除了共享存储作为单点故障，并确保恢复点目标 (RPO) 为零**，这意味着在故障转移期间不会发生数据丢失。

### 是否可以在没有 Kubernetes 技能的情况下设置 Podman 集群？ {#is-it-possible-to-set-up-a-podman-cluster-without-kubernetes-skills}

是的。本文介绍了如何在没有专门集群技能或复杂 Kubernetes 编排的情况下[快速实施 Podman 集群](</zh-hans/quick-install/safekit-quick-installation-guide-with-podman/>)。通过使用 SafeKit 的**自动重启脚本**来处理 Podman 应用程序的启动和停止，您可以获得一个强大的冗余解决方案，其部署和维护比 K8s 简单得多。

### SafeKit 复制与 DRBD 等 Podman 块级解决方案有何不同？ {#how-does-safekit-replication-differ-from-block-level-solutions-like-drbd-for-podman}

与大多数使用**块级复制**（如 DRBD）的无共享存储解决方案不同，**SafeKit** **在文件级别执行基于主机的复制**。这种方法对于 Podman 应用程序是完全透明的，因为它不需要您将数据迁移到特定的、新创建的“复制磁盘”卷。**相反，您只需配置 SafeKit 来复制现有的应用程序文件夹——即使是系统磁盘**上的文件夹。这允许您在 Podman 已经安装的位置为其实现高可用性，而无需复杂的磁盘重新配置或应用程序更改。

### 除了 Podman SafeKit 还能为其他应用程序提供高可用性吗？ {#can-safekit-provide-high-availability-for-applications-beyond-podman}

是的。**SafeKit** 是一款高度通用、兼容 **Windows 和 Linux** 高可用性软件。**除了 Podman，SafeKit 还可以用于为任何文件目录、服务或数据库实现实时复制和自动故障转移**它支持多种技术，包括 **Hyper-V 和 KVM 虚拟机**、**Docker**、**K3s** 以及各种**云应用程序**。这使得 SafeKit 成为一种通用的集群解决方案，可在各种 IT 环境中保护关键工作负载，而无需专用硬件。


{{%  insert-safekit-mirror-zh-hans app="Podman"  %}}

{{%  insert-safekit-usage-zh-hans  %}}
 

## 比较：SafeKit SANless 集群与传统 Podman HA {#safekit-podman-comparison}

特色 | 传统 HA（K8s/共享存储） | SafeKit（无共享 Mirror）  
---|---|---  
存储架构 | 需要昂贵的 **SAN 或 NAS**（共享磁盘） | 无共享：仅使用本地磁盘  
复制类型 | 通常为块级（配置复杂） | 字节级文件复制（透明）  
数据一致性 | 取决于外部存储的可靠性 | 同步复制 (RPO = 0)  
网络设置 | 复杂（负载均衡器、入口等） | 自动虚拟 IP (VIP) 故障转移  
技能要求 | 专家（Kubernetes /集群专家） | 简单：无需专业技能  
故障恢复流程 | 手动或复杂地重新同步 | 自动重新同步修改后的数据  
  
## 比较：SafeKit 与开源 Linux HA（Pacemaker/Corosync/DRBD） {#safekit-vs-linux-ha-stack}

特色 | Linux HA 堆栈（Pacemaker + Corosync + DRBD） | SafeKit（无共享 Mirror）  
---|---|---  
架构 | 模块化：需要管理 3 种或更多种不同的工具和内核模块。 | 一体化：用于复制和故障转移的单一集成软件。  
复制级别 | 块级 (DRBD)：复制整个分区/磁盘卷。 | 字节级（SafeKit）：仅复制特定文件内已修改的数据。  
配置简便 | 复杂：需要 CLI（命令行界面）专业知识来手动编程排序约束（虚拟 IP、挂载）、应用程序恢复脚本和仲裁/隔离规则。 | 简单：直观的 Web 控制台和即用型应用程序模块。  
隔离（STONITH） | 防止损坏的强制措施：STONITH（Shoot The Other Node In The Head）需要专门的硬件（IPMI/iDRAC）来切断电源或重启故障服务器。 | 基于软件：[智能分割脑解决方案，无需额外硬件。](</zh-hans/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>)  
故障恢复流程 | 手动/技术：重新同步期间数据发散或“脑裂”的风险。 | 自动且透明：后台重新同步，并具备安全故障恢复功能。  
维护 | 更新/排除单个组件故障需要高超的专业技能。 | 普通系统管理员可通过网络仪表板轻松维护。  
  
## Podman 高可用性概述 {#podman-ha-summary-quick-installation-guide}

**SafeKit** **为 Podman 提供了一个简单的双节点高可用集群**，为关键任务工作负载提供了一个轻量级的 **Kubernetes 替代方案**。通过替换复杂的 **Corosync、Pacemaker 和 DRBD** 堆栈，SafeKit 无需昂贵的 **SAN/NAS** 共享存储。

通过**实时同步复制**和**自动虚拟 IP (VIP) 故障转移**，SafeKit 可确保**零数据丢失 (RPO = 0)** 和透明的应用程序恢复。**对于需要强大、无 SAN 的高可用性**，且配置和管理开销极小的组织而言，它是理想的解决方案。


{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}