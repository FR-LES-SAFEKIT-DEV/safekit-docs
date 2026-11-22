---
title: "SafeKit Smart Console：您的高可用性集群，尽在掌握"
canonical: "https://safekit.eviden.com/zh-hans/architectures/safekit-smart-console-your-high-availability-cluster-in-your-pocket/"
description: "使用我们的 Smart Console 轻松管理 SafeKit 集群。享受零代码配置、智能手机兼容性和实时 PWA 通知。消除人为错误，确保高可用性触手可及。了解更多。"
category: "architectures"
lang: "zh-hans"
topics: "Smart Console：在台式机和移动设备上实现直观且无差错的高可用性、目录、SafeKit mirror 集群如何与 Web 控制台配合使用？、SafeKit farm 集群如何与 Web 控制台配合使用？、如何通过 Web 控制台监控多个模块和多个集群？、如何在控制台中监控警报并管理电子邮件通知？、🔍 探索 SafeKit"
translation: "translate_md 2026-11-22.1 | glossaire 2026-11-22.7 | Translation LLM | 54 expressions"
---

# SafeKit Smart Console：您的高可用性集群，尽在掌握 {#safekit-smart-console-your-high-availability-cluster-in-your-pocket}

## Smart Console：在台式机和移动设备上实现直观且无差错的高可用性 {#smart-console-intuitive-mobile-and-error-free-high-availability}

使用专为**速度和简易性**而构建的解决方案，重新定义您管理高可用性的方式。SafeKit Web 控制台提供**零学习曲线**体验，让您**无需编写任何代码**即可配置和控制您的基础设施。

无论您是在办公桌前还是在移动中，兼容智能手机的仪表板都能让您轻松掌控整个集群。通过简化 mirror 和 <span class="notranslate farm-term" translate="no">farm</span> 模块的管理，Smart Console **消除了人为错误**，并确保为您的最重要系统提供无缝的故障转移过程。

## 目录 {#table-of-contents}

  * [SafeKit mirror 集群如何与 Web 控制台配合使用？](#safekit-mirror-cluster)
  * [SafeKit <span class="notranslate farm-term" translate="no">farm</span> 集群如何与 Web 控制台配合使用？](#safekit-farm-cluster)
  * [如何通过 Web 控制台监控多个模块和多个集群？](#multipe-modules-clusters)
  * [如何在控制台中监控警报并管理电子邮件通知？](#safekit-notifications-cluster)


## SafeKit mirror 集群如何与 Web 控制台配合使用？ {#safekit-mirror-cluster}

### 如何配置 SafeKit mirror 集群？ {#safekit-mirror-cluster-configure}


![SafeKit Web 控制台：高可用性配置仪表板，显示心跳网络、虚拟 IP 设置以及 mirror 集群的实时目录复制。](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


**SafeKit Web 控制台**提供了一个直观的界面，用于为您的关键应用程序编排高可用性。只需几个步骤，您就可以配置 **SafeKit mirror 集群**以确保业务连续性：

  * **应用程序故障转移（宏选项卡）：** 定义在发生故障时要自动重新启动的特定应用程序服务。
  * **心跳网络：** 集群节点用于持续监控彼此的运行状况和可用性以及同步故障转移决策的专用通信路径。
  * **虚拟 IP 管理：** 设置虚拟 IP (VIP)，以便在故障转移后实现透明的客户端重新连接。
  * **实时复制：** 选择用于基于主机、同步字节级复制的关键目录。
  * **检查器：** 监控应用程序的运行状况，并在检测到进程故障时触发自动恢复。


SafeKit 集群包含一个专用的脑裂检测器用于解决网络隔离问题，而无需第三个见证机或额外的网络心跳。了解更多关于[集群中的心跳、故障转移和仲裁的信息](</zh-hans/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>)。

### 如何监控 SafeKit mirror 集群？ {#safekit-mirror-cluster-monitoring}


![SafeKit Web 控制台：实时监控一个显示 PRIM 和 SECOND 状态以及主动数据复制的 2 节点 mirror 集群。](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


**SafeKit 管理控制台**提供高可用性基础设施的统一视图。它允许管理员监控集群的**运行状态**并实时跟踪数据同步。

对于一个 2 节点 mirror 集群，控制台会清晰地显示每个服务器的角色：

  * **PRIM（主）：** 当前运行应用程序并管理虚拟 IP 的活动节点。它将写入本地存储，并实时复制到辅助节点。
  * **SECOND（辅助）：** 接收同步字节级更新的备用节点。如果主节点发生故障，它已准备好立即接管。
  * **ALONE 状态：** 当集群在单个节点上运行时（例如，在维护期间或发生故障后），会向您发出视觉警报，表明冗余暂时丢失。
  * **重新同步进度：** 当故障节点恢复时，其状态在后台数据重新集成期间变为橙色，确保在“恢复正常”阶段没有停机时间。


除了简单的状态图标，该界面还通过 **`...` 菜单**提供**一键式故障转移编排**，允许您在计划维护期间手动重新分配主角色，同时确保用户活动的持续可用性。

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> 集群如何与 Web 控制台配合使用？ {#safekit-farm-cluster}

### 如何配置 SafeKit <span class="notranslate farm-term" translate="no">farm</span> 集群？ {#safekit-farm-cluster-configuration}


![SafeKit Web Console：用于网络负载均衡和虚拟 IP 管理的 farm 集群配置。](/wp-content/uploads/2026/01/safekit-farm-cluster-config.png "w:966")


**SafeKit <span class="notranslate farm-term" translate="no">farm</span> 集群**旨在实现服务的高可用性和可扩展性。其配置侧重于同时在两个节点上分配传入流量：

  * **负载均衡服务（宏选项卡）：** 定义要在所有节点上保持激活的特定应用程序服务（例如，Apache、IIS、Nginx）。
  * **心跳网络：** 用于检测节点是否已离开 <span class="notranslate farm-term" translate="no">farm</span> 通信路径，从而触发负载的即时重新分配。
  * **虚拟 IP（<span class="notranslate farm-term" translate="no">farm</span> VIP）：** 与 mirror 集群不同，<span class="notranslate farm-term" translate="no">farm</span> 集群的虚拟 IP 地址在所有节点之间共享，内核过滤算法会分配网络流量。
  * **负载均衡规则：** 根据源 IP 地址或端口定义流量分配策略。
  * **检查器：** 监控应用程序的运行状况，并在检测到进程故障时触发自动重启。


### 如何监控 SafeKit <span class="notranslate farm-term" translate="no">farm</span> 集群？ {#safekit-farm-cluster-monitoring}


![SafeKit 控制台：监控一个双节点 farm 集群显示两个节点均处于 UP 状态，并处于主动负载均衡模式。](/wp-content/uploads/2026/01/safekit-farm-cluster-monitor.png "w:473")


监控 <span class="notranslate farm-term" translate="no">farm</span> 集群可让您了解基础架构的**主动-主动**性质，其中所有节点都有助于提高应用程序的性能（此示例中显示 2 个节点；可扩展到其他节点）：

  * **UP 状态（2 个节点均为 50%）：** 在健康的 <span class="notranslate farm-term" translate="no">farm</span> 中，两个节点都处于“ UP ”（50%）状态，这意味着它们都通过共享虚拟 IP 积极接收和处理客户端请求。
  * **自动重新平衡：** 如果一个节点发生故障，控制台会直观地显示剩余节点承担 100% 的流量。没有“故障转移”延迟，因为幸存的节点已经处于活动状态（除了几秒钟的检测时间）。
  * **节点插入：** 修复后的节点重新启动时，会从“ STOP ”状态转变为“ UP ”状态，并自动开始接收其负载份额，无需管理员干预。
  * **无数据同步：** 请注意，在 <span class="notranslate farm-term" translate="no">farm</span> 集群中，没有橙色重新同步状态，因为节点预计是无状态或共享后端数据库（可以在 mirror 集群中单独保护）。


除了简单的状态图标，界面还通过 **`...` 菜单**提供一键式节点管理，允许您在计划维护期间手动停止或启动节点，而共享虚拟 IP 会自动重新分配流量，而不会中断用户活动。

## 如何通过 Web 控制台监控多个模块和多个集群？ {#multipe-modules-clusters}

### 单个集群内的多模块可视化 {#safekit-multi-module}


![SafeKit Web 控制台：在同一个双节点集群上部署了 4 个 Hyper-V 模块。](/wp-content/uploads/2026/05/safekit-hyperv-console-4.jpg "w:966")


在单个 2 节点集群上部署**多个模块**时，SafeKit Web 控制台为每个模块提供**单独的监控小部件**。这对于 **SafeKit Hyper-V** 解决方案尤其有价值。 

**示例：** 在具有 4 个受保护虚拟机的设置图中：

  * 控制台连接到 node1，作为代理与 node2 进行通信。
  * 控制台显示 **4 个小组件**（每个虚拟机一个）。
  * 每个虚拟机都在其 PRIM 节点上运行，并复制到其 SECOND 节点。
  * 管理员可以实时查看哪些虚拟机在每个节点上处于活动状态：node1 上的 VM1 和 VM2，node2 上的 VM3 和 VM4。
  * 管理员可以使用 **`...` 菜单**轻松地将虚拟机从一个节点迁移到另一个节点。


这种细致的可见性确保即使在高度密集的环境中，您也能完全控制并即时了解每个复制的工作负载。 

### 多集群可视化 {#safekit-multi-cluster}


![SafeKit Web 控制台：在 8 台服务器上部署了 4 个集群。](/wp-content/uploads/2026/05/safekit-console-north-south-east-west-801.jpg "w:966")


在多个服务器上部署**多个集群**时，您可以使用多个浏览器标签页连接到每个集群，也可以利用控制台的 PWA（渐进式 Web 应用）功能。使用 PWA，您可以移除浏览器的导航菜单，从而节省屏幕空间，更好地在桌面上组织集群监控。 

**示例：** 该图显示了四个 PWA 控制台，用于监控位于北部、南部、西部和东部的四个视频监控集群。

**注意：** 当您有太多集群无法在单个桌面上显示时，SafeKit 会提供通知，以帮助检测众多集群中的错误。 

## 如何在控制台中监控警报并管理电子邮件通知？ {#safekit-notifications-cluster}

### 如何接收模块状态变更和关键事件的即时警报？ {#how-can-i-receive-instant-alerts-for-module-state-changes-and-critical-events}

SafeKit Web 控制台利用原生浏览器功能，在模块状态发生变化时**立即发出通知**。这确保了关键事件会立即引起您的注意，即使控制台位于后台选项卡中。

  * **安全性：** 通知需要通过 **HTTPS** 或 localhost 访问。
  * **PWA 集成：** 将控制台作为渐进式 Web 应用 (PWA) 安装到桌面或移动设备上，以获得类似原生应用的体验。
  * **移动端提醒：** 在移动端，通知仅通过 PWA 提供，并且强制使用 HTTPS。


此机制可立即向用户发出关键事件警报，从而提高对集群状态的即时感知并缩短响应时间。

### SafeKit 视频：智能手机上的控制台 (0:54) {#demo-console}


### 如何在 SafeKit 中设置自动电子邮件警报？ {#how-can-i-set-up-automated-email-alerts-in-safekit}

SafeKit 自动将所有**主要集群事件记录到系统日志中**，从而实现与市场上任何监控工具的无缝集成。此外，它还包括一个专用的**电子邮件通知代理**，用于监控这些日志并将关键警报直接发送到您的收件箱。这确保了即使在未主动监控 Web 控制台的情况下，利益相关者也能随时了解情况。 

  * **智能分组：** 为了减少噪音，代理会将短时间内发生的事件分组到一封摘要电子邮件中。
  * **完全覆盖：** 代理安装在所有节点上，必须明确配置 SMTP 详细信息才能启用。
  * **可自定义的收件人：** 将警报直接发送给特定的 IT 团队或管理别名，以确保及时响应。


SafeKit 将实时 PWA 警报与智能电子邮件分组相结合，为关键任务操作提供多层通知策略。

### SafeKit 视频：故障转移时的电子邮件通知 (1:04) {#demo-notifications}



{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}