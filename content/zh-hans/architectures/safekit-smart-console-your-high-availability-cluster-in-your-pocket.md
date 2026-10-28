---
title: "SafeKit智能控制台：您的高可用性集群尽在掌握"
canonical: "https://safekit.eviden.com/zh-hans/architectures/safekit-smart-console-your-high-availability-cluster-in-your-pocket/"
description: "使用我们的智能控制台轻松管理SafeKit集群。享受零代码配置、智能手机兼容性和实时 PWA 通知。消除人为错误，确保高可用性，一切尽在掌握。了解更多。"
category: "architectures"
lang: "zh-hans"
topics: "智能控制台：直观、移动化、无故障的高可用性，目录， SafeKit mirror集群如何与 Web 控制台协同工作？， SafeKit `farm`集群如何与 Web 控制台协同工作？，如何通过 Web 控制台监控多个模块和多个集群？，如何在控制台中监控告警并管理电子邮件通知？，🔍 SafeKit高可用性导航中心"
---

# SafeKit智能控制台：您的高可用性集群尽在掌握{#safekit-smart-console-your-high-availability-cluster-in-your-pocket}

## 智能控制台：直观、移动化、无故障的高可用性{#smart-console-intuitive-mobile-and-error-free-high-availability}

重新定义您管理高可用性的方式**采用专**速度和简易性**打造的解决方案。Web SafeKit提供零学习** ** ，让您无需编写**代码即可配置和控制您的基础架构。

无论您身处办公桌前还是外出途中，这款兼容智能手机的控制面板都能让您轻松掌控整个** 。智能控制台通过简化mirror和`farm`模块的管理，消除了人为错误**并确保关键系统实现无缝故障转移。

## 目录{#table-of-contents}

  * [集群如何与 Web 控制台配合使用](#safekit-mirror-cluster) SafeKit mirror
  * [集群如何与 Web 控制台配合使用](#safekit-farm-cluster) SafeKit `farm`
  * ](#multipe-modules-clusters)通过 Web 控制台监控多个模块和多个集群[
  * [如何在控制台中监控警报并管理电子邮件通知？ ](#safekit-notifications-cluster)


## SafeKit mirror集群如何与 Web 控制台配合使用？ {#safekit-mirror-cluster}

### 如何配置SafeKit Mirror {#safekit-mirror-cluster-configure}集群？


![ SafeKit Web 控制台：高可用性配置仪表板，显示mirror集群的心跳网络、虚拟 IP 设置和实时目录复制](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


** SafeKit Web 控制台**提供了一个直观的界面，用于协调关键应用程序的高可用性。只需几个步骤，即可配置** SafeKit mirror集群**以确保业务连续性：

  * **应用程序故障转移（宏选项卡）： **定义发生故障时要自动重新启动的特定应用程序服务。
  * **心跳网络： **集群节点使用的专用通信路径，用于持续监控彼此的健康状况和可用性，并同步故障转移决策。
  * **虚拟 IP 管理： **设置虚拟 IP (VIP)，以便在故障转移后透明地重新连接客户端。
  * **实时复制： **选择用于基于主机的同步字节级复制的关键目录。
  * **检查器： **监控应用程序的运行状况，并在检测到进程故障时触发自动恢复。


SafeKit集群包含一个专用的脑裂检测器，无需第三台见证机或额外的心跳网络即可解决网络隔离问题。了解更多关于[集群的心跳、故障转移和仲裁机制，请参阅](</best-practises/heartbeat-failover-quorum-windows-linux-cluster/>)集群。

### 如何监控SafeKit mirror {#safekit-mirror-cluster-monitoring}集群？


![ SafeKit Web 控制台：实时监控双节点mirror集群，显示 PRIM 和 SECOND 状态以及活动数据复制情况](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


** SafeKit管理控制台**提供高可用性基础架构的统一视图。它允许管理员监控集群的**运行状态**并实时跟踪数据同步。

对于一个包含 2 个节点的mirror集群，控制台会清晰地显示每个服务器的角色：

  * ** PRIM（主节点）： **当前运行应用程序并管理虚拟 IP 的活动节点。它执行对本地存储的写入操作，并将数据实时复制到辅助节点。
  * **备用节点（Secondary）： **接收同步字节级更新的备用节点。如果主节点发生故障，它随时可以接管。
  * **单独运行状态： **当集群在单个节点上运行时（例如，在维护期间或故障后），会发出视觉警报，表明冗余暂时丢失。
  * **重新同步进度： **当故障节点恢复时，其状态会在后台数据重新集成期间变为橙色，从而确保在“恢复正常”阶段不会出现停机时间。


除了简单的状态图标外，该界面还提供**一键故障转移编排** （ ** `...`菜单** ），允许您手动重新分配计划维护的主要角色，同时确保用户活动的持续可用性。

## SafeKit `farm`集群如何与 Web 控制台配合使用？ {#safekit-farm-cluster}

### 如何配置SafeKit `farm` {#safekit-farm-cluster-configuration}集群？


![SafeKit Web 控制台： Farm 用于网络负载均衡和虚拟IP管理的集群配置。](/wp-content/uploads/2026/01/safekit-farm-cluster-config.png "w:966")


** SafeKit `farm` **集群旨在实现服务的高可用性和可扩展性。该配置侧重于将传入流量同时分配到两个节点上：

  * **负载均衡服务（宏选项卡）： **定义要在所有节点上保持活动的特定应用程序服务（例如，Apache、 IIS 、 Nginx ）。
  * **心跳网络： **通信路径用于检测节点是否已离开`farm` ，从而触发负载的立即重新分配。
  * **虚拟 IP（ `Farm` VIP）： **与mirror集群不同， `Farm` VIP 是在节点之间共享的，使用内核过滤算法来分配网络流量。
  * **负载均衡规则： **根据源 IP 地址或端口定义流量分配策略。
  * **检查器： **监控应用程序的运行状况，如果检测到进程故障，则触发自动重启。


### 如何监控SafeKit `farm` {#safekit-farm-cluster-monitoring}集群？


![SafeKit 控制台：监控一个双节点服务器 Farm 集群显示两个节点均处于运行状态，并启用了负载均衡。](/wp-content/uploads/2026/01/safekit-farm-cluster-monitor.png "w:473")


监控`farm`集群可以了解**主动-主动**基础架构的特性，其中所有节点都对应用程序的性能做出贡献（本例中显示 2 个节点；可扩展到更多节点）：

  * **运行状态（2 个节点 50%）： **在健康的`farm`中，两个节点都处于“运行”（50%）状态，这意味着它们都在通过共享的虚拟 IP 积极接收和处理客户端请求。
  * **自动重新平衡： **如果一个节点发生故障，控制台会直观地显示剩余节点将承担 100% 的流量。由于幸存节点已经处于活动状态（除了几秒钟的检测时间），因此不存在“故障转移”延迟。
  * **节点插入： **当修复后的节点重新启动时，它会从“STOP”状态过渡到“UP”状态，并自动开始接收其应承担的负载，而无需管理员干预。
  * **无数据同步： **请注意，在`farm`集群中，没有“橙色”重新同步状态，因为节点应该是无状态的，或者共享后端数据库（这可以在mirror集群中单独保护）。


除了简单的状态图标外，该界面还提供一键节点管理（ ** `...`菜单** ），允许您手动停止或启动节点以进行计划维护，同时共享的虚拟 IP 会自动重新分配流量，而不会中断用户活动。

## 如何通过 Web 控制台监控多个模块和多个集群？ {#multipe-modules-clusters}

### 单个集群内的多模块可视化{#safekit-multi-module}


![SafeKit Web 控制台：在同一个 2 节点集群上部署了 4 个 Hyper-V 模块。](/wp-content/uploads/2026/05/safekit-hyperv-console-4.jpg "w:966")


当在单个双节点SafeKit上**多个**时，Web SafeKit会为每个模块提供独立的监控** ** 。这对于** -V **方案尤其有用。 

**示例： **在包含 4 个受保护虚拟机的设置图中：

  * 控制台连接到节点 1，节点 1 作为代理与节点 2 通信。
  * 控制台显示** 4 个小部件** （每个虚拟机一个）。
  * 每个虚拟机在其主节点上运行，并复制到其第二个节点。
  * 管理员可以实时看到 VM1 和 VM2 在节点 1 上处于活动状态，而 VM2 和 VM3 在节点 2 上处于活动状态。
  * 管理员可以使用** `...`菜单**轻松地将虚拟机从一个节点迁移到另一个节点。


这种精细的可视性确保即使在高密度环境中，您也能对每个复制的工作负载保持完全的控制和即时的了解。 

### 多聚类可视化{#safekit-multi-cluster}


![ SafeKit Web 控制台：4 个集群部署在 8 台服务器上](/wp-content/uploads/2026/05/safekit-console-north-south-east-west-801.jpg "w:966")


在多台服务器上部署多个集群** **时，您可以使用多个浏览器标签页连接到每个集群，也可以使用控制台的 PWA（渐进式 Web 应用）功能。使用 PWA 可以移除浏览器的导航菜单，从而节省屏幕空间，以便更好地在桌面上组织集群监控。 

**示例： **该图显示了四个 PWA 控制台监控四个视频监控集群：一个位于北部，一个位于南部，一个位于西部，一个位于东部。

**注意： **当集群数量过多，无法在单个桌面上显示时， SafeKit会提供通知，以帮助检测多个集群中的错误。 

## 如何在控制台中监控警报并管理电子邮件通知？ {#safekit-notifications-cluster}

### 如何才能即时接收模块状态变更和关键事件的警报？ {#how-can-i-receive-instant-alerts-for-module-state-changes-and-critical-events}

SafeKit Web 控制台利用浏览器原生功能，在模块状态发生变化时立即发出**通知** 。即使控制台处于后台标签页中，也能确保您立即注意到关键事件。

  * **安全： **通知需要通过** HTTPS **或 localhost 访问。
  * ** PWA 集成： **将控制台作为渐进式 Web 应用 (PWA) 安装到桌面或移动设备上，以获得类似原生应用的体验。
  * **移动警报： **在移动设备上，通知仅可通过 PWA 提供，并且必须使用 HTTPS。


该机制可立即向用户发出关键事件警报，增强用户对集群状态的及时了解，并缩短响应时间。

### SafeKit视频：智能手机上的游戏机 (0:54) {#demo-console}

<br /> 

### 如何在SafeKit {#how-can-i-set-up-automated-email-alerts-in-safekit}中设置自动电子邮件提醒？

SafeKit会自动将所有**重大集群事件记录到系统日志**中，从而实现与市面上任何监控工具的无缝集成。此外，它还包含一个专用的**电子邮件通知代理** ，用于监控这些日志并将关键警报直接发送到您的收件箱。这确保即使在未主动监控 Web 控制台的情况下，相关人员也能及时了解最新情况。 

  * **智能分组： **为了减少噪音，代理会将短时间内发生的事件分组到一封摘要电子邮件中。
  * **全面覆盖： **代理已安装在所有节点上，必须显式配置 SMTP 详细信息才能启用。
  * **可自定义收件人： **直接向特定 IT 团队或管理别名发出警报，以确保及时响应。


SafeKit通过将实时 PWA 警报与智能电子邮件分组相结合，为关键任务操作提供多层次的通知策略。

### SafeKit视频：故障转移时的电子邮件通知 (1:04) {#demo-notifications}

<br /> 


{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}