---
title: "虚拟 IP 地址 (VIP) 在高可用性集群中如何工作？"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/how-a-virtual-ip-address-works/"
description: "了解 SafeKit 如何使用软件定义的虚拟 IP (VIP) 地址来确保 24/7 正常运行时间。了解通过免费 ARP 实现的自动故障转移，以及为什么它在 Windows 和 Linux 上的业务连续性方面优于 DNS 重定向。"
category: "best-practises"
lang: "zh-hans"
topics: "什么是高可用性集群中的虚拟 IP 地址？、SafeKit 中的虚拟 IP 实现、目录、虚拟 IP 地址 (VIP) 如何在同子网故障转移（镜像集群）中工作、虚拟 IP (VIP) 如何跨不同子网工作（镜像集群）、负载平衡虚拟 IP 如何在同子网场（场集群）中工作、负载平衡虚拟 IP 如何跨不同子网（场集群）工作、虚拟 IP与 DNS 重定向：为什么 DNS 故障转移经常失败、比较：虚拟 IP 实施、延迟和应用程序透明度、配置虚拟 IP 地址以实现网络负载平衡和高可用性、虚拟 IP (VIP) 的常见问题、🔍 SafeKit 高可用性导航中心"
---

# 虚拟 IP 地址 (VIP) 在高可用性集群中如何工作？ {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## 高可用性集群中的虚拟 IP 地址是什么？ {#virtual-ip-definition}

  * **定义：** A **虚拟 IP (VIP) 地址** 是一个浮动网络地址，用于 [高可用集群](</zh-hans/>) 以确保连续的应用程序访问。与标准 IP 不同，VIP 不绑定到特定的物理硬件接口，而是在集群节点之间切换，以为客户端维护单个持久入口点。
  * **无需硬件：** SafeKit 使用**免费 ARP (GARP)** 在软件级别管理 VIP，无需在同一子网环境中使用外部负载均衡器。
  * **应用程序透明度：** 通过绑定到本地 VIP，应用程序不会注意到故障转移事件，从而保留客户端源 IP 和现有安全配置。
  * **灾难恢复：** 使用**扩展 LAN** 允许跨远程数据中心使用相同的 VIP，与复杂的 DNS 重新路由和 TTL 缓存延迟相比，简化了站点到站点的故障转移。


## SafeKit中的虚拟IP实现 {#safekit-vip-implementation}

  * **镜像集群：** 具有仅在主服务器上活动的浮动IP，以促进实时复制和故障转移。
  * **场集群：** 通过同时维护所有节点上的 VIP 来实现网络负载平衡。


**主要优势：** 通过利用 **免费 ARP（地址解析协议）** 或 **MAC 地址接管**，VIP 允许无缝应用程序故障转移，无需手动客户端重新配置，从而确保 24/7 业务连续性。

  * **云和多子网：** 通过外部负载均衡器运行状况检查（AWS、Azure、GCP）进行管理，以跨不同子网重定向流量。


![Evidian SafeKit 中虚拟 IP (VIP) 行为的比较图：镜像集群显示活动节点上的浮动 IP，农场集群显示所有节点之间的网络负载平衡。](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**SafeKit中Mirror和Farm集群的虚拟IP实施策略。**


{{%  insert-safekit-4-buttons-zh-hans  %}}
 

## 目录 {#table-of-contents}

  * [虚拟IP地址（VIP）如何在同子网故障转移（镜像集群）中工作](#virtual-ip-same-subnet-failover)
  * [虚拟IP（VIP）如何跨不同子网工作（镜像集群）](#virtual-ip-different-subnets-failover)
  * [负载平衡虚拟IP如何在同子网场（场集群）中工作](#vip-load-balancing-same-subnet)
  * [负载均衡虚拟IP如何跨不同子网工作（场集群）](#vip-load-balancing-different-subnets)
  * [虚拟 IP 与 DNS 重定向：为什么 DNS 故障转移经常失败](#virtual-ip-vs-dns-redirection-failover)
  * [比较：虚拟 IP 实施、延迟和应用程序透明度](#vip-vs-dns-comparison)
  * [配置虚拟IP地址以实现网络负载平衡和高可用性](#virtual-ip-configuration-load-balancing-ha)
  * [虚拟IP（VIP）常见问题](#virtual-ip-faq)
  * [🔍 SafeKit 高可用性导航中心](#hub)


## 虚拟 IP 地址 (VIP) 如何在同子网故障转移（镜像集群）中工作 {#virtual-ip-same-subnet-failover}

### 本地子网中的自动故障转移和网络重新路由 {#automated-failover--network-rerouting-in-a-local-subnet}

对于需要在本地基础设施内实现无缝业务连续性的组织来说，**SafeKit 本地网络集群软件定义的高可用性**提供了强大的自动化解决方案，用于管理虚拟 IP 地址和实时应用程序故障转移。 

### 本地镜像集群：无缝2节点Windows或Linux故障转移 {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![同一子网中两台服务器之间的 SafeKit 虚拟 IP (VIP) 故障转移机制](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

 SafeKit VIP 别名和 MAC 地址映射 在两个节点驻留在同一本地子网的标准 **SafeKit 镜像集群**中，通过**软件定义的虚拟 IP (VIP)** 实现高可用性。与基于硬件的解决方案不同，SafeKit 直接在操作系统网络堆栈中管理此 VIP。此 VIP 充当客户端的持久逻辑入口点，通过 **IP 别名** 位于服务器 1 和服务器 2 的唯一物理 IP 地址之上。 

#### SafeKit 的高级 IP 别名和多个 VIP 支持 {#safekits-advanced-ip-aliasing--multiple-vip-support}

**SafeKit 解决方案**的一个关键优势是其管理网络身份的灵活性。 VIP 是在节点之间“浮动”的第三个 IP 地址。值得注意的是，SafeKit 能够在单个集群内管理**多个虚拟 IP 地址**。这些可以分配给同一个主以太网卡或分布在不同的物理卡上，从而允许进行复杂的配置，其中不同的服务绑定到特定的虚拟身份。 

#### 故障转移机制：免费 ARP (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

SafeKit确保硬件故障期间零手动干预。正常操作下，VIP 映射到 **服务器 1 的 MAC 地址 (mac1)**。如果SafeKit检测到服务器1上出现心跳故障，则执行两步恢复： 

  * **应用程序恢复：** SafeKit 自动重新启动服务器 2 上的关键应用程序服务。
  * **网络重新路由：** SafeKit 立即广播**免费 ARP (GARP)** 消息。这会强制更新所有网络交换机和连接的客户端的 ARP 缓存，将 VIP 重新映射到 **服务器 2 的 MAC 地址 (mac2)**。


#### 远程数据中心和扩展 VLAN {#remote-data-centers--extended-vlans}

虽然通常用于本地集群，但**SafeKit 的同子网算法**是通过**扩展 LAN 或延伸 VLAN** 连接的远程站点进行**灾难恢复 (DR)** 的首选。这种“延伸”架构允许您跨地理距离维护单个子网，从而显着简化网络拓扑并避免复杂路由协议的开销。 

> **⚠️ 注意：** 通过免费 ARP 进行第 2 层重新路由是应用程序的**最透明的解决方案**。与使用负载均衡器进行第 3 层重新路由不同，它避免了**源/目标 IP 转换 (SNAT/DNAT)**。应用程序直接使用原始客户端 IP 接收流量，并且虚拟 IP 是在本地配置的。 **许多应用程序更喜欢**在本地查看虚拟 IP 并直接接收原始客户端 IP。如果没有这种透明度，由于复杂的网络转换，它们**可能无法按预期工作**。

## 虚拟 IP (VIP) 如何跨不同子网工作（镜像集群） {#virtual-ip-different-subnets-failover}

### 通过负载均衡器集成进行云就绪流量编排 {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

通过利用外部网络基础设施，**SafeKit 多可用区和云集群的软件定义高可用性**与**网络负载均衡器**无缝集成，以协调跨单独子网和可用区域的流量故障转移。 

### 跨子网镜像集群：Windows & Linux 实现 {#cross-subnet-mirror-clusters-windows--linux-implementation}


![使用负载均衡器跨两个不同子网进行虚拟 IP 故障转移的图表](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

 通过负载均衡器运行状况检查进行多子网流量路由当集群节点位于**不同的子网**时，无法实现标准的基于 ARP 的故障转移。在这种情况下，**虚拟 IP (VIP)** 托管在**负载均衡器 (LB)** 上，而不是服务器的以太网卡上。负载均衡器充当网关，根据实时可用性将流量引导至主节点和辅助节点的物理 IP 地址。 

#### 通过 SafeKit 健康检查进行动态路由 {#dynamic-routing-via-safekit-health-checks}

SafeKit 通过在每个节点上提供专用的 **健康检查 URL** 来管理流量转向。负载均衡器查询这些 URL 以确定集群状态： 

  * **主节点（PRIM）：** 健康检查返回`HTTP 200 OK`。负载均衡器将所有流量引导至此处。
  * **辅助节点（SECOND）：** 健康检查返回`HTTP 404 NOT FOUND`。负载均衡器不向该节点发送流量。

在 **故障转移事件** 期间，SafeKit 立即切换运行状况检查响应，触发负载均衡器将客户端流量重新路由到新的主服务器。 

> **⚠️注意：** SafeKit 提供健康检查逻辑；物理或虚拟负载均衡器必须由您的网络基础设施提供。

#### 云集成：AWS、Azure 和 GCP {#cloud-integration-aws-azure-and-gcp}

这种“负载均衡器+健康检查”模型是**云高可用性**的行业标准。对于在以下环境中实施 SafeKit 至关重要： 

  * 💡 [**亚马逊AWS**](</solutions/aws-high-availability-cluster-synchronous-replication-failover/>)（AWS网络负载均衡器）
  * 💡 [**Microsoft Azure**](</solutions/azure-high-availability-cluster-synchronous-replication-failover/>)（Azure 负载均衡器）
  * 💡 [**Google Cloud (GCP)**](</solutions/gcp-high-availability-cluster-synchronous-replication-failover/>)（Google Cloud 负载均衡）


#### 网络注意事项：负载均衡器与扩展 LAN {#network-considerations-load-balancer-vs-extended-lan}

如果不需要负载均衡器，请咨询您的网络团队，了解如何在子网之间实施 **扩展 LAN（VLAN 拉伸）**。这允许您恢复到更简单的“同一子网”VIP 模型。 

> **⚠️ 注意：** 选择负载均衡器时，请验证您的应用程序是否与 **源/目标 IP 转换 (SNAT/DNAT)** 兼容。使用负载均衡器，应用程序可能会丢失原始用户的身份或无法启动，因为它不再看到直接在其自己的网络接口上配置的虚拟 IP。

## 负载平衡虚拟 IP 如何在同一子网场（场集群）中工作 {#vip-load-balancing-same-subnet}

### 可扩展的性能：内核级负载平衡和冗余 {#scalable-performance-kernel-level-load-balancing--redundancy}

对于高流量环境，**架构指南：多节点集群的可扩展高可用性**解释了 SafeKit 如何在多个活动服务器之间分配工作负载，同时保持总体冗余。 

### 场集群架构：跨 Windows 或 Linux 节点的负载平衡 {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


![同一子网场集群内负载平衡虚拟 IP (VIP) 的图表](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

 通过内核过滤进行分布式流量处理 在**负载平衡场集群**中，虚拟 IP (VIP) 地址用于同时在多个服务器之间分发客户端请求。虽然此示例具有两个节点，但该架构可扩展以支持更大的服务器场。在同一子网配置中，通过 IP 别名在集群中**每台服务器**的以太网卡上配置 VIP。 

#### 流量分配：内核级过滤器 {#traffic-distribution-the-kernel-level-filter}

与简单的故障转移集群不同，场集群通过专门的**内核级过滤器**来管理流量。该过程的工作原理如下： 

  * **ARP 映射：** 在客户端的 ARP 缓存中，VIP 最初与单个硬件地址相关联（例如，服务器 1 的 `mac1`）。
  * **数据包分割：** 当服务器 1 接收流量时，SafeKit 内核过滤器分析传入数据包的身份（基于 **客户端 IP** 或 **TCP 端口**）。
  * **负载共享：** 过滤器确定哪些数据包应在本地处理，哪些数据包应重定向到其他节点（例如服务器 2）进行处理，以确保平衡的工作负载。


#### 使用免费 ARP 进行故障转移和重新路由 {#failover-and-rerouting-with-gratuitous-arp}

如果主节点（服务器 1）发生故障，集群将通过 **免费 ARP (GARP)** 维持可用性。 SafeKit 广播 GARP 消息，以使用服务器 2 的 `mac2` 更新客户端 ARP 缓存。这确保即使主“入口点”发生故障，客户端也会立即重新路由到场中的幸存节点。 

#### 远程站点部署 {#deployment-in-remote-sites}

对于跨**远程数据中心**运营的组织来说，只要站点通过**扩展 LAN 或 VLAN** 链接，此负载平衡算法仍然有效。这将创建一个虚拟的“同一子网”环境，这是地理分布式服务器场集群的最有效配置。 

## 负载平衡虚拟 IP 如何跨不同子网工作（场集群） {#vip-load-balancing-different-subnets}

### 多区域扩展：跨云子网协调流量 {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

**架构指南：在多区域和云环境中扩展服务器场集群** 提供了跨不同可用区域和子网分配应用程序工作负载的蓝图。 

### 跨子网农场集群：多节点 Windows 和 Linux 可扩展性 {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


![跨两个不同子网运行的负载平衡场集群图](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

 通过外部负载平衡进行全球流量分配 当场节点分布在**不同子网**时（在多可用区云部署中常见），**虚拟 IP (VIP)** 由外部**负载均衡器 (LB)** 进行管理。 LB 持有 VIP 并将传入流量引导至位于各自子网中的服务器的物理 IP 地址。 

#### 智能流量路由和负载均衡规则 {#intelligent-traffic-routing--load-balancing-rules}

负载均衡器根据两个主要因素分配客户端请求： 

  * **分配规则：** 根据会话关联或负载平衡算法分割流量（例如，分析 **客户端 IP 地址** 或 **客户端 TCP 端口**）。
  * **节点可用性：** 流量仅路由到由 SafeKit 健康检查确定的健康节点。


> **⚠️注意：** SafeKit 提供健康检查逻辑；物理或虚拟负载均衡器必须由您的网络基础设施提供。

#### SafeKit健康检查机制 {#safekit-health-check-mechanism}

SafeKit 在场中的每台服务器上提供实时**运行状况检查 URL**，以将其运行状态传达给负载均衡器： 

  * **节点UP：** 健康检查返回 `HTTP 200 OK`。负载均衡器将此服务器纳入活动轮换中。
  * **节点关闭/故障转移：** 如果服务器或应用程序发生故障，SafeKit 返回 `HTTP 404 NOT FOUND`（或者服务变得无法访问）。负载均衡器立即停止向故障节点发送流量。


#### 云部署标准：AWS、Azure 和 GCP {#cloud-deployment-standards-aws-azure-and-gcp}

此架构是 **Cloud Farm 集群** 的基础模型，可确保在整个子网或区域脱机时，其余节点继续处理负载。这是本机支持的： 

  * 💡 [**亚马逊AWS**](</solutions/aws-load-balancing-cluster-failover/>)（AWS网络负载均衡器）
  * 💡 [**Microsoft Azure**](</solutions/azure-load-balancing-cluster-failover/>)（Azure 负载均衡器）
  * 💡 [**Google Cloud (GCP)**](</solutions/gcp-load-balancing-cluster-failover/>)（Google Cloud 负载均衡）


## 虚拟 IP 与 DNS 重定向：为什么 DNS 故障转移经常失败 {#virtual-ip-vs-dns-redirection-failover}

### DNS 传播陷阱：为什么 VIP 的性能优于 DNS 重定向 {#the-dns-propagation-trap-why-vips-outperform-dns-redirection}

依赖 DNS 进行故障转移通常会在高可用性架构中产生**错误的安全感**。虽然修改 DNS 记录以指向备份服务器似乎是一个简单的恢复路径，但它引入了一个关键变量：**不可预测的延迟**。由于基于 DNS 的重定向依赖于不受控制的中间递归解析器生态系统来确认和传播更改，因此它从根本上不符合现代企业服务的“零停机”要求。 

### 技术场景：DNS 解析和“卡住”的客户端 {#the-technical-scenario-dns-resolution-and-the-stuck-client}

在标准网络设置中，**虚拟名称**（DNS 名称）充当用户可读的入口点。但是，为了使数据通过网络传输，该名称必须解析为特定的**物理 IP** 地址。 

![显示高可用性集群中物理 IP 1 的 DNS 名称解析的图表](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 高可用性集群中物理 IP 1 上的 DNS 解析和“卡住”客户端

#### 当前状态：解析为物理 IP 1 {#current-state-resolution-to-physical-ip-1}

最初，**客户端 1** 和 **客户端 2** 向 DNS 系统查询虚拟名称。系统返回**物理IP 1**。然后，客户端建立到该特定硬件地址的直接网络连接（套接字）。 

#### 故障转移挑战：重新路由到物理 IP 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

如果物理 IP 1 处的服务器出现故障，管理员将更新 DNS 记录以指向 **物理 IP 2**。要成功地重新路由客户端，必须出现“完美”的序列： 

  * 所有中间 ISP 和公司解析器上的 **生存时间 (TTL)** 必须过期。
  * 必须刷新客户端 1 和客户端 2 上的本地 DNS 缓存。
  * 应用程序必须关闭其现有套接字并启动 _新的_ DNS 查找。

如果遗漏其中任何步骤，**客户端 1 和客户端 2 将保持“卡住”状态**，尝试与失效的物理 IP 1 进行通信，从而导致服务停机，尽管 DNS 记录已更新。 

### DNS重定向的两个“黑匣子” {#the-two-black-boxes-of-dns-redirection}

  * **递归缓存：** 许多互联网服务提供商 (ISP) 和企业 DNS 解析器会忽略低 TTL 设置以减少流量，通常会在请求的过期时间后将“旧”物理 IP 1 缓存几分钟甚至几小时。
  * **应用程序持久性：** 现代应用程序（例如基于 Java 的微服务或 Web 浏览器）通常在启动时仅执行一次 DNS 查找。即使 DNS 记录更新为物理 IP 2，应用程序也会继续使用存储在其内部存储器中的初始 IP。


### 结论 {#conclusion}

DNS 重定向是高可用性解决方案的不一致解决方案。对于本地或区域环境中的即时故障转移，软件定义的**虚拟 IP (VIP)** 是确保零停机持久性的唯一方法。 

## 比较：虚拟 IP 实施、延迟和应用程序透明度 {#vip-vs-dns-comparison}

**虚拟 IP (VIP) 重定向方法与 DNS 重新路由以实现高可用性和灾难恢复的技术比较。**

环境和用例 |高可用型 |重定向机制 |网络延迟 |应用程序透明度和 IP 局部性  
---|---|---|---|---  
主/备（高可用性） |镜像集群 |无偿 ARP/MAC 接管 |非常低：检测和发送广播 GARP 的时间 |完全透明：虚拟IP位于活动节点本地。客户端 IP 被保留。  
负载均衡（主动/主动） |农场集群 |内核级网络过滤器/GARP |非常低：检测和重新配置网络过滤器的时间 |完全透明：虚拟IP在所有节点上都是本地的。客户端 IP 被保留。  
相同子网/扩展 LAN（VLAN 延伸） |灾难恢复（远程数据中心） |标准 IP 别名/GARP |低：取决于延长的 VLAN RTT（往返时间） |完全透明：虚拟IP位于节点本地。客户端 IP 被保留。  
不同的子网 |灾难恢复（远程数据中心/云） |外部负载均衡器 |中等：由于负载均衡器运行状况检查间隔，故障转移延迟较高 | ⚠️ 部分透明：使用 SNAT/DNAT。虚拟 IP **不是**节点上的本地 IP。 **不**保留客户端 IP。应用程序必须支持它。  
DNS 重新路由：无 VIP |灾难恢复（远程数据中心） | DNS记录更新（名称/物理IP） |高/不可预测：取决于 DNS TTL（生存时间）和客户端 DNS 缓存。 | ⚠️ 不可靠：客户端必须重新解析 DNS。大多数情况下，客户端会继续使用启动时解析的旧 IP，并且在故障转移后不会重新路由。  
  
## 配置虚拟 IP 地址以实现网络负载平衡和高可用性 {#virtual-ip-configuration-load-balancing-ha}


{{%  insert-safekit-farm-video-en  %}}
 

## 有关虚拟 IP (VIP) 的常见问题 {#virtual-ip-faq}

### 虚拟 IP (VIP) 和网络 {#virtual-ip-vip--networking}

什么是虚拟 IP (VIP)？它与物理 IP 有何不同？

虽然**物理 IP 地址**绑定到特定的网络接口，但**虚拟 IP (VIP)** 是独立于硬件的“浮动”地址。在SafeKit集群中，VIP充当持久入口点；如果主服务器发生故障，VIP 会自动迁移到健康的辅助节点，确保零客户端重新配置。

我是否需要硬件负载平衡器才能使用虚拟 IP？

否。 **SafeKit 高可用性软件** 在软件级别管理虚拟 IP。在同一子网架构中，它利用 **IP 别名** 和 **免费 ARP (GARP)** 来重定向流量。这消除了外部硬件负载平衡器或专用代理服务器的成本和复杂性。

什么是免费 ARP (GARP)？为什么使用它？

**免费 ARP (GARP)** 是一种网络广播，用于更新网络交换机和路由器的 ARP 表。在故障转移期间，新的主服务器会发送一个 GARP 数据包，以宣布 **虚拟 IP** 现在已映射到其 MAC 地址，从而强制立即在网络结构中重新路由流量。

我可以将 DNS 名称与虚拟 IP 关联吗？

**是的。** 您可以通过创建标准 A 记录将 DNS 名称与 VIP 关联起来。主要优点是重定向是在 **VIP 级别**（通过 ARP 或网络重定向）管理的，而 **不是在 DNS 级别**。这可以避免与 DNS 传播和 TTL 过期相关的延迟，从而确保**应用程序透明度**。

### 云和高级架构 {#cloud--advanced-architectures}

虚拟 IP 如何在云（AWS、Azure、GCP）中工作？

在第 2 层 (ARP) 受到限制的云环境中，SafeKit 与**云负载均衡器**（AWS ELB、Azure LB 或 Google GCLB）集成。 SafeKit 提供了平台监控的 **健康检查 URL**，以使用 SNAT/DNAT 将流量路由到主动节点。

扩展 LAN 是否比负载均衡器更适合灾难恢复？

**是的**。对于远程数据中心，**扩展 LAN（延伸 VLAN）** 通常更优越，因为它可以保持跨站点的**应用程序透明度**。通过保持**相同的虚拟IP**，应用程序及其客户端可以继续使用相同的身份进行通信，从而使数据中心之间的转换完全无缝。

DNS 重新路由与虚拟 IP 相比有哪些限制？

**DNS 重新路由** 受到 **TTL（生存时间）** 和客户端缓存的限制，这可能会延迟几个小时的恢复。一个主要缺点是**不重新解析其 DNS 名称的客户端在尝试连接到故障服务器时仍然卡住**。相比之下，**虚拟 IP** 提供即时第 2 层故障转移，可立即重新路由所有流量，从而确保连接，无论客户端 DNS 缓存状态如何。

### 透明度和安全性 {#transparency--security}

为什么本地虚拟 IP 对于应用程序透明度很重要？

本地**虚拟 IP (VIP)** 通过允许软件绑定到持久 VIP 来确保**应用程序透明度**。 SafeKit 在 **内核级别** 处理重定向，使应用程序不知道集群故障转移，这与绑定 IP 发生变化的 DNAT 解决方案不同。

使用虚拟 IP 是否会保留客户端的原始 IP 地址？

是的。 SafeKit 避免源网络地址转换 (SNAT)。由于 VIP 位于活动服务器本地，因此应用程序会收到 **原始客户端 IP** ，这对于安全审核、会话持久性和监管日志记录至关重要。


{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}