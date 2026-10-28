---
title: "SafeKit : Podman高可用性和实时数据复制软件"
canonical: "https://safekit.eviden.com/zh-hans/solutions/podman-the-simplest-high-availability-cluster-between-two-redundant-servers/"
description: "SafeKit提供强大的Podman高可用性解决方案，并集成同步数据复制功能。可在标准Linux服务器上部署有状态容器集群，实现自动故障转移和零数据丢失。无需 SAN 或共享存储。几分钟即可完成部署。"
category: "solutions"
lang: "zh-hans"
topics: "无 SAN 集群SafeKit Mirror如何与Podman协同工作？目录； SafeKit软件如何简单实现Podman高可用性集群？ SafeKit和mirror集群如何与Podman协同工作？ SafeKit高可用性限制；比较：无 SAN 集群SafeKit与传统高可用性Podman ；比较： SafeKit与开源高可用性Linux （Pacemaker/Corosync/DRBD）； Podman高可用性总结；🔍 SafeKit高可用性导航中心"
---

# SafeKit : Podman高可用性和实时数据复制软件{#safekit-podman-high-availability--real-time-data-replication-software}

## 无 SAN 的SafeKit Mirror集群如何与Podman {#how-the-sanless-safekit-mirror-cluster-works-with-podman}协同工作

SafeKit 提供轻便的， **“恰到好处”的HA解决方案** 专为那些发现 **Kubernetes** 对于本地化或边缘计算容器工作负载而言，资源消耗过大、过于复杂或设计过度。**SafeKit** 提供精简的一体化双节点 **用于高可用性集群 Podman** 在 Linux它为复杂的“自己动手”（DIY）提供了一种无缝、一体化的替代方案。 Linux HA堆栈——消除了手动配置的技术负担 **Corosync** 对于节点成员资格， **起搏器** 用于资源编排，以及 **DRBD** 用于块级复制。通过利用实时同步复制和 **自动切换虚拟IP地址** , SafeKit 打造一个强大的 **无 SAN 集群** 这样就无需昂贵的共享存储。这种架构可确保客户端透明重连、快速自动故障转移以及…… **零数据丢失保证（RPO=0）** 适用于容器化应用程序。

  * ✅ ** Kubernetes替代方案： **为容器提供高可用性，而无需 K8s 网络（入口/负载均衡器）和编排的开销。
  * ✅ **简化架构： **用单个软件包取代 Corosync/Pacemaker/DRBD 堆栈。
  * ✅ **无需共享存储： **无 SAN 架构，使用本地磁盘和字节级复制。
  * ✅ **自动虚拟 IP (VIP) 故障转移： **确保在切换期间透明地重新连接客户端。
  * ✅ **同步数据复制： **保证节点间零数据丢失 (RPO=0)。
  * ✅ **自动故障转移和故障恢复： **在冗余节点上快速重启应用程序，无需手动脚本。


![ SafeKit高可用性集群架构，为Podman提供虚拟 IP、自动故障转移、自动故障恢复和实时复制功能](/wp-content/uploads/2026/02/safekit-podman-5-1024.jpg "w:512")

**一个高可用性 (HA) 解决方案，适用于Podman容器，采用SafeKit的无 SAN 架构**

<a class="btn-quick-install" href="/zh-hans/quick-install/safekit-quick-installation-guide-with-podman/"> ⚡ Podman > </a>的快速 HA 安装指南
## 目录{#table-of-contents}

  * [软件如何简单地实现Podman高可用性集群](#how-safekit-implements-podman-ha) SafeKit
  * [集群如何与SafeKit mirror集群以及Podman集群协同工作？ ](#safekit-mirror-cluster)
  * [ SafeKit高可用性限制](#safekit-ha-limitations)
  * [对比： SafeKit无 SAN 集群 vs. 传统集群Podman高可用性集群](#safekit-podman-comparison)
  * [对比： SafeKit与开源Linux HA（起搏器/Corosync/DRBD） ](#safekit-vs-linux-ha-stack)
  * [ Podman高可用性概要](#podman-ha-summary-quick-installation-guide)
  * [ 🔍 SafeKit高可用性导航中心](#hub)


## SafeKit软件如何简单地实现Podman高可用性集群？ {#how-safekit-implements-podman-ha}

### 如何在两台服务器上实现Podman和{#how-can-i-achieve-high-availability-for-podman-on-two-servers}的高可用性？

** SafeKit **为两台冗余服务器之间的** Podman **提供高可用性解决方案，无需共享磁盘。该系统通过配置**对与Podman持久数据关联的目录进行实时复制**来实现。一旦发生故障， SafeKit将管理自动故障转移，并在几秒钟内将容器重启到备用节点上。

### Podman容器{#how-does-automatic-network-failover-work-for-podman-containers}容器的自动网络故障转移是如何工作的？

SafeKit实现了**自动切换的虚拟 IP (VIP) 地址** 。此 VIP 作为客户端应用程序的单一入口点。如果主服务器发生故障， SafeKit会使用**免费 ARP 将虚拟 IP 切换到冗余服务器。这确保客户端能够透明地重新连接到**应用程序重启后Podman同一 IP 地址。

### 什么是Podman的“无 SAN”集群？ {#what-is-a-sanless-cluster-for-podman}

一个无需昂贵存储区域网络 (SAN) 或网络附加存储 (NAS) 的** SAN **架构Podman可实现高可用性。 **架构使用基于主机的**复制技术SafeKit在两台服务器的本地磁盘之间mirror数据。 **消除了共享存储的单点故障风险，并确保**点目标 (RPO) 为零， **意味着在**转移期间不会发生数据丢失。

### 是否有可能在不具备Kubernetes技能的情况下搭建Podman集群？ {#is-it-possible-to-set-up-a-podman-cluster-without-kubernetes-skills}

是的。本文[介绍如何在无需专业集群技能或复杂编排Kubernetes SafeKit下](</zh-hans/quick-install/safekit-quick-installation-guide-with-podman/>)快速部署Podman 。通过使用**重启脚本来处理Podman程序的启动和** ，您可以获得一个强大的冗余解决方案，其部署和维护都比 Kubernetes 简单得多。

### SafeKit复制与Podman {#how-does-safekit-replication-differ-from-block-level-solutions-like-drbd-for-podman}块级解决方案（例如 DRBD）有何不同？

与大多数使用块级复制（例如 DRBD）的** SAN 解决方案不同， ** ** SafeKit执行基于主机**文件级复制。这种方法对应用程序完全透明**因为它不需要将数据迁移到新创建的特定“复制磁盘”卷。相反，您只需配置SafeKit以复制现有的应用程序文件夹——即使是位于Podman系统磁盘**上**文件夹。这样**您就可以在应用程序已安装的位置实现高可用性，而无需进行复杂的Podman重新配置或更改应用程序。

### SafeKit能否为Podman及之后的应用提供高可用性？ {#can-safekit-provide-high-availability-for-applications-beyond-podman}

是的。 **SafeKit** 是一款功能高度通用、高可用性的软件，与两者兼容 **Windows 和 Linux**。 超过 Podman, SafeKit 可用于实现 **实时复制和自动故障转移** 适用于任何文件目录、服务或数据库。它支持多种技术，包括 **Hyper-V 和 KVM 虚拟机** , **Docker** , **K3s** 以及各种 **云应用**这使得 SafeKit 一种通用的集群解决方案，无需专用硬件即可保护各种 IT 环境中的关键工作负载。


{{%  insert-safekit-mirror-zh-hans app="Podman"  %}}

{{%  insert-safekit-usage-zh-hans  %}}
 

## 对比： SafeKit无 SAN 集群 vs. 传统Podman高可用性集群{#safekit-podman-comparison}

特性|传统 HA（K8s / 共享存储） | SafeKit （无 SAN Mirror ）  
---|---|---  
存储架构|需要昂贵的** SAN 或 NAS； ** （共享磁盘）； |无共享架构：仅使用本地磁盘。  
复制类型|通常为块级复制（配置复杂） |字节级文件复制（透明）  
数据一致性|取决于外部存储可靠性|同步复制 (RPO = 0)  
网络配置|复杂（负载均衡器、入口等） |自动虚拟 IP (VIP) 故障转移  
技能要求|专家级（ Kubernetes /聚类专家） |简单级：无需专业技能  
故障恢复流程|手动或复杂重新同步|自动重新同步已修改的数据  
  
## 对比： SafeKit与开源Linux HA（起搏器/Corosync/DRBD） {#safekit-vs-linux-ha-stack}

功能| Linux HA 堆栈（Pacemaker + Corosync + DRBD） | SafeKit （无 SAN Mirror ）  
---|---|---  
建筑学 | 模块化：需要管理 3 个以上不同的工具和内核模块。 | 一体化：用于复制和故障转移的单一集成软件。  
复制级别 | 块级（DRBD）：复制整个分区/磁盘卷。 | 字节级（SafeKit）：仅复制特定文件中的已修改数据。  
配置难度|复杂：需要具备命令行界面 (CLI) 专业知识，才能手动设置排序约束（虚拟 IP、挂载点）、应用程序恢复脚本和仲裁/隔离规则。配置难度|简单：直观的 Web 控制台和即用型应用程序模块。  
隔离（STONITH） |为防止数据损坏而必需：STONITH（Shoot The Other Node In The Head， [ |额外硬件的智能脑裂修复](</best-practises/heartbeat-failover-quorum-windows-linux-cluster/>)  
故障恢复过程 | 手动/技术：重新同步过程中存在数据发散或“脑裂”的风险。 | 自动且透明：后台重新同步，并具有安全故障恢复功能。  
维护 | 需要高度专业技能才能更新/排除各个组件的故障。 | 普通系统管理员可通过网页控制面板轻松维护。  
  
## Podman高可用性概要{#podman-ha-summary-quick-installation-guide}

**SafeKit** 提供了一种简单的 **用于 2 节点高可用性集群 Podman** 提供轻便 **Kubernetes 选择** 针对关键任务型工作负载。通过替换复杂的 **Corosync、Pacemaker 和 DRBD** 堆， SafeKit 无需昂贵的 **SAN/NAS** 共享存储。

通过实时同步** ** **虚拟 IP (VIP) **转移，确保**数据丢失 (RPO=0) 和透明的应用恢复。对于需要强大、 ** SAN 的高可用性SafeKit **和管理开销**的组织而言，它是理想的解决方案。


{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}