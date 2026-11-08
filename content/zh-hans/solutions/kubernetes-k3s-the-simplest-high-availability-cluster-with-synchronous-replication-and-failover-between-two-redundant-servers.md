---
title: "Kubernetes K3s 高可用性：2 节点同步复制和故障转移"
canonical: "https://safekit.eviden.com/zh-hans/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/"
description: "在两个节点上实现 K3s 高可用性，无需外部存储或 etcd 仲裁。了解 SafeKit 如何提供零数据丢失复制和自动故障转移。"
category: "solutions"
lang: "zh-hans"
topics: "简化 K3s 高可用性：为什么选择 SafeKit 而不是 MetalLB 和 Longhorn？、目录、SafeKit 软件如何简单地实现 Kubernetes K3s 高可用性集群？、SafeKit mirror 集群如何与 Kubernetes K3S 配合使用？、SafeKit 高可用性限制、比较：SafeKit 与标准 K3s 堆栈（MetalLB 和 Longhorn）、视频指南：配置 SafeKit HA mirror 集群、🔍 探索 SafeKit"
translation: "translate_md 2026-11-08.3 | glossaire 2026-11-08.8 | Translation LLM | 36 expressions"
---

# Kubernetes K3s 高可用性：2 节点同步复制和故障转移 {#kubernetes-k3s-high-availability-2-node-synchronous-replication--failover}

## 简化 K3s 高可用性：为什么选择 SafeKit 而不是 MetalLB 和 Longhorn？ {#safekit-k3s-ha-introduction}

虽然 K3s 的标准开源堆栈（MetalLB + Longhorn）对于大型数据中心而言功能强大，**SafeKit** 对于双节点本地站点而言，它引入了过多的复杂性。通过用单个综合 HA 引擎替换独立网络和存储工具来简化 K3s 环境。 

### 为什么使用 SafeKit 来实现 2 节点 K3s 的高可用性 (HA)？ {#why-use-safekit-for-2-node-k3s-high-availability-ha}

  * **真正的双节点高可用性：** SafeKit 仅需**两个节点**即可提供完全冗余，从而消除了*etcd*仲裁所需的三节点要求。
  * **零数据丢失 (RPO = 0)：** 使用**同步字节级复制**取代高开销的块存储，以实现本地 SSD 性能。
  * **灵活的文件级保护：** SafeKit 在文件级别执行基于主机的复制，对应用程序完全透明。它不仅保护数据库，还保护所有相关文件夹和数据。您可以将现有文件夹精确地复制到其安装位置，**甚至在系统磁盘**上。
  * **集成虚拟 IP (VIP)：** 在内核级别原生管理集群 IP，无需单独配置 **MetalLB**。
  * **自动故障转移和故障恢复：** 在发生故障时立即触发向辅助节点的转换；一旦主节点恢复正常，SafeKit 将在无需人工干预的情况下执行**自动数据重新同步**。
  * **超低开销：** SafeKit 运行无需标准堆栈所需的存储 Pod（CSI/Longhorn）和网络 Pod（CNI/MetalLB）的繁重管理开销，从而为您的应用程序释放关键的 RAM 和 CPU。
  * **对 IT 通才友好：** 用**简单的 Web GUI** 和自动化部署脚本取代了用于网络和存储的复杂**基础设施 YAML**，让您只需专注于应用程序。


![SafeKit 架构图，用于展示双节点 K3s 高可用性，其特点是集成了虚拟 IP、实时复制和自动故障转移。](/wp-content/uploads/2026/02/safekit-mirror-k3s-1024.jpg "w:512")

 **适用于双节点 K3s 集群的无共享高可用性 (HA)**  


<a class="btn-quick-install" href="/zh-hans/quick-install/safekit-quick-installation-guide-with-kubernetes/">⚡ Kubernetes 高可用集群快速安装指南 ></a>
## 目录 {#toc}

  * [SafeKit 软件如何简单地实现 Kubernetes K3s 高可用性集群？](#safekit-mirror-k3s-cluster)
  * [SafeKit mirror 集群如何与 Kubernetes K3S 配合使用？](#safekit-mirror-cluster)
  * [SafeKit 高可用性限制](#safekit-ha-limitations)
  * [比较：SafeKit 与标准 K3s 堆栈（MetalLB 和 Longhorn）](#safekit-k3s-ha-comparison)
  * [视频指南：配置 SafeKit mirror HA 集群](#videoguide-safekit-mirror-cluster)
  * [🔍 探索 SafeKit](#hub)


## SafeKit 软件如何简单地实现 Kubernetes K3s 高可用性集群？ {#safekit-mirror-k3s-cluster}

### 如何为双节点 Kubernetes K3s 集群实现高可用性？ {#how-do-i-implement-high-availability-for-a-2-node-kubernetes-k3s-cluster}

您可以使用 **SafeKit k3s.safe mirror 模块**为双节点 Kubernetes K3s 集群实现高可用性 (HA)。此解决方案允许您部署冗余环境，而无需外部 NFS 存储、专用外部配置数据库或专业的 Kubernetes 专业知识。

### 为什么在边缘和物联网计算中使用 K3s？ {#why-use-k3s-for-edge-and-iot-computing}

[K3s](<https://k3s.io/>)是**物联网和边缘计算**的首选 Kubernetes 引擎，因为它是一种轻量级、经过认证的发行版，专为资源受限的环境而设计。它在保持完全兼容性的同时，简化了标准 Kubernetes 的运营开销。

### k3s.safe mirror 模块的主要功能有哪些？ {#what-are-the-key-features-of-the-k3ssafe-mirror-module}

k3s.safe 模块通过实现以下功能，为 K3s 提供了一个全面的高可用性堆栈：

  * **双主动节点：** 同时运行 2 个主动 K3s 主节点/代理，以托管 Pod。
  * **数据库复制：** 在节点之间实时复制 MariaDB 配置数据库。
  * **持久存储：** 通过集成的 NFS 客户端动态配置器 (nfs-client) 复制持久卷。
  * **网络连续性：** 包括虚拟 IP 地址，以便客户端无缝访问。
  * **自动化恢复：** 完全支持自动故障转移和故障恢复。


### 除了 K3s，SafeKit 还能保护哪些应用程序和环境？ {#beyond-k3s-which-applications-and-environments-can-safekit-protect}

SafeKit 是一款**适用于 Windows 和 Linux** 多功能高可用性解决方案，其功能远超 K3s mirror 集群。**它支持对各种关键工作负载进行同步实时复制**和自动故障转移，包括：

  * **虚拟和物理环境：** 完整的 Hyper-V 或 KVM 虚拟机。
  * **容器编排：** Docker、Podman 环境。
  * **数据与服务：** 单个文件目录、服务和各种数据库。
  * **云基础设施：** 为云应用程序提供高可用性。


SafeKit 还为 **<span class="notranslate farm-term" translate="no">farm</span> 集群**提供原生**网络负载均衡和故障转移**，以支持 **Web 服务器**等无状态应用程序。

💡 [在此处查看支持的 HA 解决方案的完整列表。](</zh-hans/solutions/>)

### SafeKit 如何实现 K3s 的高可用性？ {#safekit-k3s-architecture-table}

**使用 SafeKit 2 节点 K3s 集群的架构和冗余逻辑**

2 节点 K3s 集群 | SafeKit PRIM（主节点） | SafeKit SECOND（辅助节点）  
---|---|---  
工作负载执行 | K3s 主节点和代理服务处于活动状态，负责管理集群编排和运行 Pod。 | K3s 的主节点和代理服务保持活跃，提供并行处理和高可用性。  
NFS 存储和 PV |  • 主机虚拟 IP 和 NFS 端口 <br> • 管理主动导出的 NFS 共享 <br> • 存储 K3s 持久卷 (PV)  | 同步镜像：SafeKit 实时复制所有持久性卷，确保零数据丢失。  
配置数据库 |  • 主机虚拟 IP 和 MariaDB 端口 <br> • 管理活动的 K3s 配置数据库  | 数据库复制：MariaDB 数据库同步镜像，保留集群状态以进行故障转移。  
  
**自动故障转移机制：** 如果主节点发生故障，SafeKit 自动将虚拟 IP 和存储服务迁移到辅助节点，确保 K3s 集群的服务不中断。

## SafeKit mirror 集群如何与 Kubernetes K3S 配合使用？ {#safekit-mirror-cluster}

### 步骤 1：在 mirror 集群中进行字节级文件复制 {#step-1-byte-level-file-replication-in-a-mirror-cluster}

此阶段说明了**服务器 1 (PRIM)** 和**服务器 2 (SECOND)** 之间的可用性架构。两台服务器都运行 K3s master 和 agent 组件，如[架构表](#safekit-k3s-architecture-table)中定义。


![在 Kubernetes K3s mirror 集群中进行字节级文件复制](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


目前，**虚拟 IP (VIP)**、**NFS 持久存储**和 **MariaDB** 仅在服务器 1 (PRIM) 上处于活动状态。两个节点上的 K3s 主组件通过虚拟 IP 和 MariaDB 端口访问集群状态，从而相互同步。SafeKit 了 MariaDB 和持久 NFS 文件的[同步复制](</zh-hans/best-practises/synchronous-replication-vs-asynchronous-replication/>)，**确保在发生故障时实现零数据丢失 (RPO = 0)**。

K3s master 通过直接与 K3s agent 通信，将工作负载分配到两个（或更多）节点。外部客户端连接到  
[集群](</zh-hans/best-practises/how-a-virtual-ip-address-works/>)在 PRIM 节点上的虚拟 IP 地址。使用标准 Kubernetes 机制，K3s 主节点将流量中继到分布在各个节点上的 Pod。同样，Pod 通过虚拟 IP 和 NFS 端口访问 PRIM 服务器上的**持久卷 (PV)**。

### 步骤 2：自动故障转移和业务连续性 {#step-2-automatic-failover-and-service-continuity}

当**服务器 1（PRIM）** 发生故障时，**服务器 2（SECOND）** 会自动接管集群操作，以确保连续性。


![Kubernetes K3S mirror 集群中的故障转移](/wp-content/uploads/2023/02/safekit-stop-alone-300.png "w:300")


SafeKit 检测到故障后，会立即将集群的**虚拟 IP 地址**迁移到服务器 2。**然后，它将本地 MariaDB** 和 **NFS 服务**提升为活动状态。由于在步骤 1 中执行了同步复制，所有 MariaDB 数据库和 NFS 持久卷 (PV) 文件在服务器 2 上都已更新，从而确保零数据丢失。

集群状态保留后，服务器 2 上的 **K3s Master** 继续执行。它检测到服务器 1 代理丢失，并自动将受影响的 Pod 重新调度到剩余的活动 K3s 代理上。总故障转移时间 (RTO) 是故障检测间隔（默认：30 秒）与 K3s 组件在辅助节点上初始化所需时间之和。

在服务器 1 离线期间，MariaDB 和 NFS 服务继续在服务器 2 上运行，仅在本地写入更改。  


### 步骤 3：故障恢复和自动重新集成 {#step-3-failback-and-automatic-reintegration}

当初始问题解决后重新启动服务器 1 时，会发生**故障恢复**。SafeKit 自动重新同步 MariaDB 和 NFS 文件，仅更新停机期间在服务器 2 上修改的数据。**此重新集成过程是非中断性的**；K3s 主服务器和代理组件将继续在服务器 2 上运行，不会中断。 


![K3s mirror 集群中的自动重新同步和故障恢复](/wp-content/uploads/2023/02/safekit-resynchro-alone-300.png "w:300")

 

SafeKit 会根据服务器的停止方式优化恢复时间： 

  * **干净关闭：** 如果在服务器 1 上有意停止 SafeKit，则仅使用**修改跟踪位图**对文件内特定修改的区域进行重新同步。这确保了超快速的重新集成。 
  * **系统崩溃（例如，电源故障）：** 如果服务器 1 发生非正常关机，则出于安全考虑，修改位图将被绕过 SafeKit 将重新同步所有修改时间戳晚于上次建立的同步点的时间戳的文件，从而确保**数据完整性**。 


### 步骤 4：恢复高可用性和负载分配 {#step-4-restoring-high-availability-and-load-distribution}

重新集成后，集群将返回**完全 mirror 模式**，镜像步骤 1 中描述的状态。**系统再次处于高可用状态： MariaDB** 和 **NFS 服务**在服务器 2 上保持活动状态，而 SafeKit 对所有文件更新执行实时复制，并将其返回到服务器 1。 


![恢复 Kubernetes K3s mirror 集群的正常运行](/wp-content/uploads/2023/02/safekit-second-prim-300.png "w:300")

 

**K3s Master** 和 **K3s Agent** 会在服务器 1 上自动重启。Kubernetes 调度程序现在将服务器 1 识别为健康节点，并可以开始重新调度 Pod 以便在两个服务器之间分配工作负载。 

如果管理员希望 MariaDB 和 NFS 服务在服务器 1 上运行（恢复原始 PRIM 角色），则可以在方便的时候通过 Web 控制台手动触发**切换，也可以通过配置设置自动进行切换**。 

### 如何配置 SafeKit mirror 集群？ {#safekit-mirror-cluster-configure}


![SafeKit Web 控制台：高可用性配置仪表板，显示心跳网络、虚拟 IP 设置以及 mirror 集群的实时目录复制。](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


**SafeKit Web 控制台**提供了一个直观的界面，用于为您的关键应用程序编排高可用性。**只需几个步骤，您就可以配置 SafeKit mirror 集群**以确保业务连续性：

  * **应用程序故障转移（宏选项卡）：** 定义在发生故障时要自动重新启动的特定应用程序服务。
  * **心跳网络：** 集群节点用于持续监控彼此的运行状况和可用性以及同步故障转移决策的专用通信路径。
  * **虚拟 IP 管理：** 设置虚拟 IP (VIP)，以便在故障转移后实现透明的客户端重新连接。
  * **实时复制：** 选择用于基于主机、同步字节级复制的关键目录。
  * **检查器：** 监控应用程序的运行状况，并在检测到进程故障时触发自动恢复。


SafeKit 集群包含一个专用的裂脑检查器，用于解决网络隔离问题，而无需第三个见证机或额外的保活网络。了解[有关集群中的保活、故障转移和仲裁的](</zh-hans/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>)更多信息。

### 如何监控 SafeKit mirror 集群？ {#safekit-mirror-cluster-monitoring}


![SafeKit Web 控制台：实时监控一个显示 PRIM 和 SECOND 状态以及主动数据复制的 2 节点 mirror 集群。](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


**SafeKit 管理控制台**提供高可用性基础设施的统一视图。**它允许管理员监控集群的运行状态**并实时跟踪数据同步。

对于一个 2 节点 mirror 集群，控制台会清晰地显示每个服务器的角色：

  * **PRIM（主）：** 当前运行应用程序并管理虚拟 IP 的活动节点。它将写入本地存储，并实时复制到辅助节点。
  * **SECOND（辅助）：** 接收同步字节级更新的备用节点。如果主节点发生故障，它已准备好立即接管。
  * **ALONE 状态：** 当集群在单个节点上运行时（例如，在维护期间或发生故障后），会向您发出视觉警报，表明冗余暂时丢失。
  * **重新同步进度：** 当故障节点恢复时，其状态在后台数据重新集成期间变为橙色，确保在“恢复正常”阶段没有停机时间。


除了简单的状态图标，该界面还提供**一键式故障转移编排**，允许您在计划维护期间手动重新分配主角色，同时确保用户活动的持续可用性。


{{%  insert-safekit-usage-zh-hans  %}}
 

## 比较：SafeKit 与标准 K3s 堆栈（MetalLB 和 Longhorn） {#safekit-k3s-ha-comparison}

**比较：SafeKit 与标准开源方案 (MetalLB + Longhorn)**

能力 | SafeKit (K3s.safe) | MetalLB + Longhorn（标准 K8s）  
---|---|---  
架构 | 一体化：将网络连接、数据复制和故障转移功能集成于一个软件包中。 | DIY（自己动手）堆栈：需要多个独立软件包（CNI、CSI、LoadBalancer）。  
硬件效率 | 纯双节点高可用性：完全冗余，无需第三个“见证”或仲裁节点。 | 最少 3 个节点：通常需要奇数个节点才能实现 Etcd 仲裁和存储安全。  
人脉拓展（VIP） | 原生：在操作系统层面管理的虚拟 IP；对 K3s 透明。 | 复杂：需要安装 MetalLB，并使用专用的 speaker pod 进行 L2 或 BGP 配置，这些 pod 会消耗每个节点上的 CPU/RAM。  
存储要求 | 字节级同步：现有目录的实时文件复制；可在标准系统磁盘上运行；字节级文件复制，CPU/网络开销极小。 | 块级：使用专用存储 Pod 的分布式块存储 (Longhorn)；资源消耗较高。  
故障转移智能 | 独立稳定性：SafeKit 在容器运行时外部运行。它直接监控操作系统和硬件，即使 Kubernetes 控制平面或容器引擎挂起，也能确保故障转移。 | 循环依赖：故障转移逻辑托管*在*它旨在保护的 Pod 中。如果主机操作系统或 K3s 引擎挂起，管理 Pod（MetalLB/Longhorn）也会冻结，通常需要手动分类来打破“锁定”  
管理 | 简化：可通过单个 Web 控制台进行管理；无需 Kubernetes 专家。 | 专业技能：需要深入了解 YAML、Helm 和 K8s 内部控制器。  
  
**总而言之**，虽然标准的 DIY 堆栈（MetalLB + Longhorn）为 Kubernetes 专家提供了模块化，但它创建了一个**循环依赖**，其中存储和网络工具容易受到它们旨在管理的相同节点故障的影响。**SafeKit** 通过作为独立的底层架构运行来打破这个循环；提供了一个更强大、与硬件无关的双节点高可用性解决方案，即使 Kubernetes 引擎或主机操作系统挂起，它也能保持运行。这确保了自动恢复和数据完整性，而无需传统分布式块存储和网络覆盖所需的繁重资源开销、强制性三节点仲裁或配置复杂性。

## 视频指南：配置 SafeKit HA mirror 集群 {#videoguide-safekit-mirror-cluster}

### SafeKit 视频：应用级集群 (8:47) {#demo-mirror-ha-cluster}

虽然此视频演示了 SafeKit 对 Microsoft SQL Server 的高可用性，但它很好地概述了该解决方案如何保护 K3s 环境。SafeKit 对任何其他数据库或业务关键型应用程序的功能相同。

### 视频亮点 {#video-highlights}

  1. 🎬 [两个带有 SQL Server 节点](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. 🎬 [配置集群和 mirror.safe 模块](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. 🎬 [启动和测试 SQL 复制、迁移、崩溃时故障转移](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)


&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 


{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}