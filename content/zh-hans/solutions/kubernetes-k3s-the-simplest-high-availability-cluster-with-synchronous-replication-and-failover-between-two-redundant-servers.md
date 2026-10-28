---
title: "Kubernetes K3s 高可用性：双节点同步复制和故障转移"
canonical: "https://safekit.eviden.com/zh-hans/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/"
description: "无需外部存储或 etcd 仲裁，即可在 2 个节点上实现 K3s 高可用性。了解SafeKit如何提供零数据丢失复制和自动故障转移。"
category: "solutions"
lang: "zh-hans"
topics: "简化 K3s 高可用性：为何选择SafeKit而非 MetalLB 和 Longhorn？，目录， SafeKit软件如何简化实现Kubernetes K3s 高可用性集群？， SafeKit mirror集群如何与Kubernetes K3S 协同工作？， SafeKit高可用性限制，对比： SafeKit与标准 K3s 堆栈（MetalLB 和 Longhorn），视频指南：配置SafeKit和mirror高可用性集群，🔍 SafeKit高可用性导航中心"
---

# Kubernetes K3s 高可用性：2 节点同步复制和故障转移 {#kubernetes-k3s-high-availability-2-node-synchronous-replication--failover}

## 简化 K3s HA：为什么选择SafeKit而不是 MetalLB 和 Longhorn？ {#safekit-k3s-ha-introduction}

虽然 K3s 的标准开源堆栈（MetalLB + Longhorn）对于大型数据中心来说功能强大，但对于 2 节点本地站点来说却引入了过多的复杂性。 **SafeKit** 通过用单一的、整合的 HA 引擎取代独立的网络和存储工具，简化了 K3s 环境。 

### 为什么选择SafeKit来实现双节点 K3s 高可用性 (HA)？ {#why-use-safekit-for-2-node-k3s-high-availability-ha}

  * **真正的 2 节点高可用性：** SafeKit仅使用**2 个节点**即可提供完全冗余，从而消除了 _etcd_ 仲裁的 3 节点要求。
  * **零数据丢失 (RPO=0)：**用**同步字节级复制替换高开销块存储，**实现本地 SSD 性能。
  * **灵活的文件级保护：** SafeKit执行基于主机的文件级复制，这对应用程序完全透明。它不仅保护数据库，还保护所有关联的文件夹和数据。您可以将现有文件夹精确复制到它们安装的位置，甚至包括**系统磁盘** 。
  * **集成虚拟 IP (VIP)：**在内核级别原生管理集群 IP，无需单独的**MetalLB**配置。
  * **自动故障转移和故障恢复：**在发生故障时触发立即过渡到辅助节点；一旦主节点恢复正常， SafeKit将执行**自动数据重新同步**无需人工干预。
  * **超低开销：** SafeKit无需标准堆栈所需的存储 pod（CSI/Longhorn）和网络 pod（CNI/MetalLB）的大量管理开销即可运行，从而为您的应用程序释放关键的 RAM 和 CPU。
  * **IT 通用友好型：**用**的 Web GUI**和自动化部署脚本替换复杂的**网络和存储基础架构 YAML** ，让您只专注于您的应用程序。


![ SafeKit架构图，展示了具有集成虚拟 IP、实时复制和自动故障转移功能的双节点 K3s 高可用性架构](/wp-content/uploads/2026/02/safekit-mirror-k3s-1024.jpg "w:512")

 **面向双节点 K3s 集群的无共享高可用性 (HA)**  


<a class="btn-quick-install" href="/zh-hans/quick-install/safekit-quick-installation-guide-with-kubernetes/"> ⚡ Kubernetes高可用性集群快速安装指南 > </a>
## 目录 {#toc}

  * [软件如何简单实现Kubernetes K3s 高可用性集群](#safekit-mirror-k3s-cluster) SafeKit
  * [集群如何与SafeKit mirror集群以及Kubernetes K3S 协同工作？ ](#safekit-mirror-cluster)
  * [ SafeKit高可用性限制](#safekit-ha-limitations)
  * [对比： SafeKit与标准 K3s 套装（MetalLB 和 Longhorn） ](#safekit-k3s-ha-comparison)
  * [视频指南：配置SafeKit Mirror ](#videoguide-safekit-mirror-cluster)高可用性集群
  * [ 🔍 SafeKit高可用性导航中心](#hub)


## SafeKit软件如何简单地实现Kubernetes K3s 高可用性集群？ {#safekit-mirror-k3s-cluster}

### 如何为包含两个节点的 K3s 集群Kubernetes实现高可用性？ {#how-do-i-implement-high-availability-for-a-2-node-kubernetes-k3s-cluster}

您可以使用**SafeKit k3s.safe mirror module**为 2 节点Kubernetes K3s 集群实现高可用性 (HA)。此解决方案允许您部署冗余环境，而无需外部 NFS 存储、专用外部配置数据库或专业的Kubernetes知识。

### 为什么使用 K3s 进行边缘计算和物计算？ {#why-use-k3s-for-edge-and-iot-computing}

[ K3s ](<https://k3s.io/>)是Kubernetes首选引擎，适用于**物联网和边缘计算**因为它是一个轻量级的认证发行版，专为资源受限环境而设计。它在保持完全兼容性的同时，简化了标准Kubernetes的运维开销。

### k3s.safe mirror的主要特性是什么？ {#what-are-the-key-features-of-the-k3ssafe-mirror-module}

k3s.safe模块通过实现以下功能，为 K3s 提供了一个全面的高可用性 (HA) 协议栈：

  * **双活动节点：**同时运行 2 个活动的 K3s 主节点/代理节点来托管 pod。
  * **数据库复制：**节点间实时复制MariaDB配置数据库。
  * **持久存储：**通过集成的 NFS 客户端动态配置程序 (nfs-client) 复制持久卷。
  * **网络连续性：**包含一个虚拟 IP 地址，可实现无缝客户端访问。
  * **自动恢复：**完全支持自动故障转移和故障恢复。


### 除了 K3s 之外， SafeKit还能保护哪些应用程序和环境？ {#beyond-k3s-which-applications-and-environments-can-safekit-protect}

SafeKit是一个功能全面的高可用性解决方案，适用于**Windows 、 Linux和**其功能远超 K3s mirror集群。它支持**同步实时复制**和自动故障转移，适用于各种关键工作负载，包括：

  * **虚拟和物理环境：**完整的 Hyper-V 或 KVM 虚拟机。
  * **容器编排：** Docker 、 Podman环境。
  * **数据和服务：**单个文件目录、服务和各种数据库。
  * **云基础设施：**云应用程序的高可用性。


SafeKit还为**`Farm`集群**提供原生**网络负载均衡和故障转移**用于无状态应用程序，例如**Web 服务器** 。

💡 [点击此处查看所有受支持的HA解决方案](</zh-hans/solutions/>)

### SafeKit如何实现 K3s 高可用性？ {#safekit-k3s-architecture-table}

使用SafeKit **的 2 节点 K3s 集群的**架构和冗余逻辑

2 节点 K3s 集群| SafeKit PRIM（主节点） | SafeKit SECOND（辅助节点）  
---|---|---  
工作负载执行 | K3s 主服务和代理服务处于活动状态，管理集群编排并运行 pod。 | K3s 主服务和代理服务保持运行，提供并行处理和高可用性。  
NFS 存储和 PV | • 托管虚拟 IP 和 NFS 端口<br> • 管理活动导出的 NFS 共享<br> • 存储 K3s 持久卷 (PV) |同步镜像： SafeKit实时复制所有持久卷，以确保零数据丢失。  
配置数据库| • 托管虚拟 IP 和MariaDB端口<br> • 管理活动的 K3s 配置数据库|数据库复制： MariaDB数据库同步镜像，以在故障转移时保留集群状态。  
  
**自动故障转移机制：**当主节点发生故障时， SafeKit会自动将虚拟 IP 和存储服务迁移到辅助节点，从而确保 K3s 集群不间断服务。

## SafeKit mirror集群如何与Kubernetes K3S 协同工作？ {#safekit-mirror-cluster}

### 步骤 1： Mirror集群中的字节级文件复制 {#step-1-byte-level-file-replication-in-a-mirror-cluster}

此阶段展示了**服务器 1（主服务器）**和**服务器 2（辅助服务器）**之间的高可用性架构。两台服务器均运行 K3s 主组件和代理组件，如[架构表](#safekit-k3s-architecture-table)中所定义。


![文件在Kubernetes K3s mirror集群](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")中进行字节级文件复制


目前，虚拟 IP (VIP) **、NFS 持久存储** 、NFS 持久存储**、NFS 持久存储**以及虚拟 IP、NFS 持久存储**[持久存储MariaDB和 NFS 持久存储**仅在服务器 1 (PRIM) 上处于活动状态。两个节点上的 K3s 主组件通过虚拟 IP 和 NFS **存储MariaDB端口访问集群状态，从而实现数据同步。NFS 持久MariaDB SafeKit实现了 NFS 持久** ](</zh-hans/best-practises/synchronous-replication-vs-asynchronous-replication/>)同步复制，确保在发生故障时实现零数据丢失 (RPO = 0)。

K3s 主节点通过与 K3s 代理直接通信，将工作负载分配到两个（或多个）节点上。外部客户端连接到这些节点。  
[集群的虚拟 IP 地址为](</zh-hans/best-practises/how-a-virtual-ip-address-works/>)位于 PRIM 节点上。K3s 主节点使用标准的Kubernetes机制将流量转发到分布在各个节点上的 Pod。同样，Pod 通过虚拟 IP 和 NFS 端口访问其位于 PRIM 服务器上的持久卷 (PV) **** 。

### 步骤 2：自动故障转移和服务连续性 {#step-2-automatic-failover-and-service-continuity}

当**服务器 1（主服务器）**发生故障时， **服务器 2（辅助服务器）**会自动接管集群操作，以确保连续性。


![在Kubernetes K3S mirror集群中的故障转移](/wp-content/uploads/2023/02/safekit-stop-alone-300.png "w:300")


SafeKit检测到故障后，立即将集群的虚拟 IP 地址**（即**迁移到服务器 2。然后，它将本地的 NFS 服务**MariaDB**和**（即** ）提升为活动状态。由于在步骤 1 中执行了同步复制，服务器 2 上的所有MariaDB和 NFS 持久卷 (PV) 文件均已是最新状态，从而确保零数据丢失。

在集群状态保持不变的情况下，服务器 2 上的 K3s Master ****继续执行。它检测到服务器 1 代理的故障，并自动将受影响的 Pod 重新调度到剩余的活动 K3s 代理上。总故障转移时间 (RTO) 是故障检测间隔（默认值：30 秒）加上 K3s 组件在备用节点上初始化所需时间的总和。

当服务器 1 离线时， MariaDB和 NFS 服务继续在服务器 2 上运行，仅将更改写入本地。  


### 步骤 3：故障恢复和自动重新集成 {#step-3-failback-and-automatic-reintegration}

当初始问题解决后服务器 1 重启时，会发生故障****故障恢复SafeKit会自动重新同步MariaDB和 NFS 文件，仅更新服务器 2 在停机期间修改的数据。此重新集成过程**不会中断** ；K3s 主节点和代理组件在服务器 2 上继续运行，不会中断。 


![ K3s 集群中的自动重新同步和故障恢复mirror ](/wp-content/uploads/2023/02/safekit-resynchro-alone-300.png "w:300")

 

SafeKit根据服务器停止的方式优化恢复时间： 

  * **干净关机：**如果服务器 1 上的SafeKit被有意停止，则仅使用**修改跟踪位图**重新同步文件中的特定修改区域。这可确保超快速的重新集成。 
  * **系统崩溃（例如，断电）：**如果服务器 1 发生非正常关机，为了安全起见，修改位图将被绕过SafeKit改为重新同步所有修改时间戳比上次建立的同步点**的文件，以确保**数据的完全完整性。 


### 步骤 4：恢复高可用性和负载均衡 {#step-4-restoring-high-availability-and-load-distribution}

重新集成后，集群恢复到**完全模式mirror** ，与步骤 1 中描述的状态相同。系统再次处于高可用状态： **MariaDB**和**NFS 服务**在服务器 2 上保持活动状态，而SafeKit将所有文件更新实时复制到服务器 1。 


![恢复正常运行Kubernetes K3s mirror集群](/wp-content/uploads/2023/02/safekit-second-prim-300.png "w:300")

 

这 **K3s 主控** 和 **K3s代理** 服务器 1 上的进程会自动重启。 Kubernetes 调度器现在识别出服务器 1 为健康节点，可以开始重新调度 pod，将工作负载分配到两台服务器上。 

如果管理员希望MariaDB和 NFS 服务在服务器 1 上运行（恢复原始 PRIM 角色），则可以在方便的时候通过 Web 控制台手动触发****切换，或者通过配置设置自动触发。 

### 如何配置SafeKit Mirror集群？ {#safekit-mirror-cluster-configure}


![ SafeKit Web 控制台：高可用性配置仪表板，显示mirror集群的心跳网络、虚拟 IP 设置和实时目录复制](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


**SafeKit Web 控制台**提供了一个直观的界面，用于协调关键应用程序的高可用性。只需几个步骤，即可配置**SafeKit mirror集群**以确保业务连续性：

  * **应用程序故障转移（宏选项卡）：**定义发生故障时要自动重新启动的特定应用程序服务。
  * **心跳网络：**集群节点使用的专用通信路径，用于持续监控彼此的健康状况和可用性，并同步故障转移决策。
  * **虚拟 IP 管理：**设置虚拟 IP (VIP)，以便在故障转移后透明地重新连接客户端。
  * **实时复制：**选择用于基于主机的同步字节级复制的关键目录。
  * **检查器：**监控应用程序的运行状况，并在检测到进程故障时触发自动恢复。


SafeKit集群包含一个专用的脑裂检测器，无需第三台见证机或额外的心跳网络即可解决网络隔离问题。了解更多关于[集群的心跳、故障转移和仲裁机制，请参阅](</zh-hans/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>)集群。

### 如何监控SafeKit mirror集群？ {#safekit-mirror-cluster-monitoring}


![ SafeKit Web 控制台：实时监控双节点mirror集群，显示 PRIM 和 SECOND 状态以及活动数据复制情况](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


**SafeKit管理控制台**提供高可用性基础架构的统一视图。它允许管理员监控集群的**运行状态**并实时跟踪数据同步。

对于一个包含 2 个节点的mirror集群，控制台会清晰地显示每个服务器的角色：

  * **PRIM（主节点）：**当前运行应用程序并管理虚拟 IP 的活动节点。它执行对本地存储的写入操作，并将数据实时复制到辅助节点。
  * **备用节点（Secondary）：**接收同步字节级更新的备用节点。如果主节点发生故障，它随时可以接管。
  * **单独运行状态：**当集群在单个节点上运行时（例如，在维护期间或故障后），会发出视觉警报，表明冗余暂时丢失。
  * **重新同步进度：**当故障节点恢复时，其状态会在后台数据重新集成期间变为橙色，从而确保在“恢复正常”阶段不会出现停机时间。


除了简单的状态图标外，该界面还提供一键**转移编排** ，允许您手动重新分配计划维护的主要角色，同时确保用户活动的持续可用性。


{{%  insert-safekit-usage-zh-hans  %}}
 

## 对比： SafeKit与标准 K3s 套件（MetalLB 和 Longhorn） {#safekit-k3s-ha-comparison}

**对比： SafeKit与标准开源版本（MetalLB + Longhorn）**

功能| SafeKit ( K3s.safe ) | MetalLB + Longhorn (标准 K8s)  
---|---|---  
建筑学 | 一体化：将网络、复制和故障转移集成在一个软件包中。 | DIY（自己动手）堆栈：需要多个独立的软件包（CNI、CSI、负载均衡器）。  
硬件效率 | 纯 2 节点 HA：完全冗余，无需第三个“见证”或仲裁节点。 | 3 节点最小要求：通常需要奇数个节点才能满足 Etcd 法定人数和存储安全要求。  
网络（VIP） | 原生：在操作系统级别管理的虚拟 IP；对 K3s 透明。 | 复杂：需要安装 MetalLB，并使用 L2 或 BGP 配置，使用专用的 Speaker pod，每个节点都会消耗 CPU/RAM。  
存储要求 | 字节级同步：实时复制现有目录的文件；可在标准系统磁盘上运行；以最小的 CPU/网络开销进行字节级文件复制。 | 块级：分布式块存储（Longhorn），使用专用存储 pod；资源消耗较高。  
故障转移智能 | 独立稳定性： SafeKit 它独立于容器运行时运行。它直接监控操作系统和硬件，确保即使在发生故障时也能进行故障转移。 Kubernetes 控制平面或集装箱发动机悬挂。 | 循环依赖：故障转移逻辑托管在它所要保护的 Pod 内部。如果宿主机操作系统或 K3s 引擎挂起，管理 Pod（MetalLB/Longhorn）也会冻结，通常需要手动排查问题才能解除“锁定”。  
|管理：可通过单个 Web 控制台进行管理；无需专家Kubernetes知识。专业版| ：需要深入了解 YAML、Helm 和 Kubernetes 内部控制器。  
  
****虽然标准的 DIY 协议栈（MetalLB + Longhorn）为Kubernetes提供了模块化特性，但它却造成了循环依赖**导致存储和网络工具容易受到它们原本旨在管理的节点故障的影响。为了打破这种循环** **方案以独立基础设施层的形式运行；它提供了一个更稳健、与硬件无关的双节点高可用性解决方案，即使引擎或Kubernetes操作系统挂起**也能保持运行。这确保了自动恢复和数据完整性SafeKit而无需传统分布式块存储和网络叠加层所需的大量资源开销、强制性的三节点仲裁或复杂的配置。

## 视频指南：配置SafeKit HA mirror集群 {#videoguide-safekit-mirror-cluster}

### SafeKit视频：应用层集群（8:47） {#demo-mirror-ha-cluster}

这段视频演示了 SafeKit的高可用性 Microsoft SQL Server它对解决方案如何保护 K3s 环境进行了很好的概述。 SafeKit 对于任何其他数据库或业务关键型应用程序，其功能完全相同。

### 视频集锦 {#video-highlights}

  1. 🎬 [ 2 个节点，包含SQL Server和](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. 🎬 [配置集群和mirror.safe模块](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. 🎬 [启动并测试 SQL 复制、迁移和崩溃时故障转移](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)


<br /> 


{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}