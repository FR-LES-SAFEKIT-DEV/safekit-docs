---
title: "虚拟IP地址（VIP）在高可用性集群中的工作原理是什么？"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/how-a-virtual-ip-address-works/"
description: "了解SafeKit如何使用软件定义的虚拟 IP (VIP) 地址来确保 24/7 全天候正常运行。了解通过免费 ARP 实现的自动故障转移，以及为什么它在Windows和Linux上比 DNS 重定向更能保证业务连续性。"
category: "best-practises"
lang: "zh-hans"
topics: "什么是高可用性集群中的虚拟 IP 地址？ SafeKit中的虚拟 IP 实现，目录，虚拟 IP 地址 (VIP) 如何在同子网故障转移中工作（ Mirror集群），虚拟 IP 地址 (VIP) 如何在不同子网中工作（ Mirror集群），负载均衡虚拟 IP 如何在同子网`Farm`中工作（ `Farm`集群），负载均衡虚拟 IP 如何在不同子网中工作（ `Farm`集群），虚拟 IP 与 DNS 重定向：为什么 DNS 故障转移经常失败，比较：虚拟 IP 实现、延迟和应用程序透明性，配置虚拟 IP 地址以实现网络负载均衡和高可用性，关于虚拟 IP (VIP) 的常见问题，🔍 SafeKit高可用性导航中心"
---

# 虚拟 IP 地址 (VIP) 在高可用性集群中如何工作？ {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## 高可用性集群中的虚拟 IP 地址是什么？ {#virtual-ip-definition}

  * **定义：**是一个虚拟 IP (VIP) 地址****一个浮动网络地址，用于高可用性集群[ ](</>)以确保应用程序的持续访问。与标准 IP 地址不同，VIP 不绑定到特定的物理硬件接口，而是在集群节点之间切换，从而为客户端维护一个单一且持久的入口点。
  * **无需硬件：** SafeKit使用免费 ARP (GARP ****软件级别管理 VIP，从而无需在同一子网环境中使用外部负载均衡器。
  * **应用程序透明性：**通过绑定到本地 VIP，应用程序不会感知故障转移事件，从而保留客户端源 IP 和现有安全配置。
  * **灾难恢复：**使用**扩展 LAN**允许在远程数据中心之间使用相同的 VIP，与复杂的 DNS 重新路由和 TTL 缓存延迟相比，简化了站点到站点的故障转移。


## SafeKit中的虚拟 IP 实现 {#safekit-vip-implementation}

  * **Mirror集群：**具有仅在主服务器上活动的浮动 IP，以方便实时复制和故障转移。
  * **`Farm`集群：**通过同时在所有节点上维护 VIP 来实现网络负载均衡。


**主要优势：**通过利用**免费 ARP（地址解析协议）**或**MAC 地址接管** ，VIP 可以实现无缝应用程序故障转移，而无需手动重新配置客户端，从而确保 24/7 全天候业务连续性。

  * **云和多子网：**通过外部负载均衡器健康检查（ AWS 、 Azure 、 GCP ）进行管理，以在不同的子网之间重定向流量。


![是 Evidian 中虚拟 IP (VIP) 行为的对比图： SafeKit Mirror集群分别展示了活动节点上的浮动 IP 和Farm集群在所有节点上进行网络负载均衡的情况](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**** `Farm`中Mirror集群SafeKit虚拟 IP 实现策略


{{%  insert-safekit-4-buttons-zh-hans  %}}
 

## 目录 {#table-of-contents}

  * [同子网故障转移中虚拟 IP 地址 (VIP) 的工作原理 ( Mirror集群) ](#virtual-ip-same-subnet-failover)
  * [虚拟 IP (VIP) 如何跨不同子网工作（ Mirror集群） ](#virtual-ip-different-subnets-failover)
  * [同子网中负载均衡虚拟 IP 的工作原理`Farm` （ `Farm`集群） ](#vip-load-balancing-same-subnet)
  * [负载均衡虚拟 IP 如何跨不同子网工作（ `Farm`集群） ](#vip-load-balancing-different-subnets)
  * [ IP 与 DNS 重定向：为什么 DNS 故障转移经常失败](#virtual-ip-vs-dns-redirection-failover)
  * [对比：虚拟 IP 实现、延迟和应用透明性](#vip-vs-dns-comparison)
  * [配置虚拟 IP 地址以实现网络负载均衡和高可用性](#virtual-ip-configuration-load-balancing-ha)
  * [虚拟IP (VIP) 常见问题解答](#virtual-ip-faq)
  * [ 🔍 SafeKit高可用性导航中心](#hub)


## 虚拟 IP 地址 (VIP) 在同一子网故障转移中的工作原理 ( Mirror集群) {#virtual-ip-same-subnet-failover}

### 本地子网中的自动故障转移和网络重路由 {#automated-failover--network-rerouting-in-a-local-subnet}

对于需要在本地基础架构内实现无缝业务连续性的组织而言， **SafeKit本地网络集群软件定义高可用性**提供了一个强大的自动化解决方案，用于管理虚拟 IP 地址和实时应用程序故障转移。 

### 本地Mirror集群：无缝 2 节点Windows或Linux故障转移 {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![ SafeKit同一子网内两台服务器之间的虚拟 IP (VIP) 故障转移机制](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

 在标准的SafeKit **SafeKit集群中mirror如果两个节点位于同一本地子网内，则可通过**软件定义的虚拟 IP (VIP) **实现高** 。与基于硬件的解决方案不同， SafeKit直接在操作系统网络堆栈中管理此 VIP。此 VIP 作为客户端的持久逻辑入口点，通过**IP 别名**构建在服务器 1 和服务器 2 的唯一物理 IP 地址之上。 

#### SafeKit的高级 IP 别名和多 VIP 支持 {#safekits-advanced-ip-aliasing--multiple-vip-support}

**SafeKit**解决方案的关键优势在于其网络身份管理的灵活性。虚拟 IP 地址 (VIP **是第三个 IP 地址，可在节点之间“浮动”。值得注意的是， SafeKit能够在单个集群内管理多个虚拟 IP 地址。这些**地址可以分配给同一主以太网卡，也可以分布在不同的物理卡上，从而实现将不同服务绑定到特定虚拟身份的复杂配置。 

#### 故障转移机制：无偿ARP（GARP） {#the-failover-mechanism-gratuitous-arp-garp}

SafeKit确保硬件故障期间无需人工干预。正常运行时，VIP 映射到**服务器 1 的 MAC 地址 (mac1)** 。如果SafeKit检测到服务器 1 的心跳失败，它将执行两步恢复： 

  * **应用程序恢复：** SafeKit自动重启服务器 2 上的关键应用程序服务。
  * **网络重路由：** SafeKit立即广播**免费 ARP (GARP)**消息。这将强制更新所有网络交换机和连接客户端的 ARP 缓存，将 VIP 重新映射到**服务器 2 的 MAC 地址 (mac2)** 。


#### 远程数据中心和扩展VLAN {#remote-data-centers--extended-vlans}

**SafeKit的同子网算法**通常用于本地集群，但对于通过**扩展 LAN 或**扩展 VLAN 连接的远程站点， **灾难恢复 (DR)**是首选方案。这种“扩展”架构允许您跨越地理距离维护单个子网，从而显著简化网络拓扑并避免复杂路由协议带来的开销。 

> **⚠️ 注意：** 通过免费ARP进行二层重定向是 **最透明的解决方案** 对于应用程序而言，它与使用负载均衡器的三层路由不同，它避免了…… **源/目标 IP 转换 (SNAT/DNAT)**该应用程序直接使用原始客户端 IP 接收流量，虚拟 IP 在本地配置。 **许多应用程序更倾向于** 他们可以本地查看虚拟 IP 地址，并直接接收原始客户端 IP 地址。如果没有这种透明度，他们就无法做到这一点。 **可能无法按预期工作** 由于复杂的网络翻译。

## 虚拟 IP (VIP) 如何跨不同子网工作 ( Mirror集群) {#virtual-ip-different-subnets-failover}

### 通过负载均衡器集成实现云就绪流量编排 {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

通过利用外部网络基础设施， **SafeKit软件定义高可用性（适用于多可用区和云集群）**与**网络负载均衡器**无缝集成，以协调跨不同子网和可用区的流量故障转移。 

### 跨子网Mirror集群： Windows和Linux实现 {#cross-subnet-mirror-clusters-windows--linux-implementation}


![跨两个不同子网使用负载均衡器的虚拟 IP 故障转移示意图](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

 当集群节点位于不同的子网（例如****时，基于 ARP 的标准故障转移机制无法实现。在这种情况下，虚拟 IP 地址（VIP） ****在负载均衡器（LB） **上**而不是服务器的以太网卡上。负载均衡器充当网关，根据实时可用性将流量定向到主节点和备用节点的物理 IP 地址。 

#### 通过SafeKit健康检查进行动态路由 {#dynamic-routing-via-safekit-health-checks}

SafeKit通过在每个节点上提供专用的**健康检查 URL**来管理流量控制。负载均衡器查询这些 URL 以确定集群状态： 

  * 主节点 (PRIM)： ****健康检查返回`HTTP 200 OK` 。负载均衡器将所有流量导向此处。
  * **辅助节点（SECOND）：**健康检查返回`HTTP 404 NOT FOUND` 。负载均衡器不向此节点发送任何流量。

在**故障转移事件**期间， SafeKit会立即切换健康检查响应，触发负载均衡器将客户端流量重新路由到新的主服务器。 

> **⚠️ 注意：** SafeKit提供健康检查逻辑；物理或虚拟负载均衡器必须由您的网络基础设施提供。

#### 云集成： AWS 、 Azure 、 GCP和 {#cloud-integration-aws-azure-and-gcp}

这种“负载均衡+健康检查”模型是云高可用性****的行业标准。它对于在以下环境中实施SafeKit至关重要： 

  * 💡 [ **Amazon AWS** ](</zh-hans/solutions/aws-high-availability-cluster-synchronous-replication-failover/>) ( AWS网络负载均衡器)
  * 💡 [ **Microsoft Azure** ](</zh-hans/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) Azure负载均衡器)
  * 💡 [ **Google Cloud ( GCP )** ](</zh-hans/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>) (Google Cloud 负载均衡)


#### 网络考量：负载均衡器与扩展局域网 {#network-considerations-load-balancer-vs-extended-lan}

如果不需要负载均衡器，请咨询您的网络团队，了解如何在子网之间实施**扩展 LAN（VLAN 扩展）** 。这样您就可以恢复到更简单的“同子网”VIP 模型。 

> **⚠️ 注意：**选择负载均衡器时，请确认您的应用程序与**源/目标 IP 转换 (SNAT/DNAT)**兼容。使用负载均衡器后，应用程序可能会丢失原始用户的身份信息，或者由于无法识别直接在其网络接口上配置的虚拟 IP 地址而无法启动。

## 负载均衡虚拟 IP 在同一子网中的工作原理`Farm` （ `Farm`集群） {#vip-load-balancing-same-subnet}

### 可扩展性能：内核级负载均衡与冗余 {#scalable-performance-kernel-level-load-balancing--redundancy}

对于高流量环境，《 **架构指南：使用多节点`Farm`集群实现可扩展的高可用性SafeKit**在保持完全冗余的同时，将工作负载分配到多个活动服务器上。 

### `Farm`集群架构：跨Windows或Linux节点进行负载均衡 {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


![同子网集群farm内负载均衡虚拟 IP (VIP) ](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

 在负载均衡集群**中，通过内核过滤实现分布式流量处理。该集群`farm`**组成。其中，虚拟 IP (VIP) 地址用于将客户端请求同时分发到多个服务器上。虽然此示例仅包含两个节点，但该架构可扩展以支持更大的服务器集群。在同子网配置中，通过 IP 别名**在集群中每台服务器**的以太网卡上配置 VIP。 

#### 流量分配：内核级过滤器 {#traffic-distribution-the-kernel-level-filter}

与简单的故障转移集群不同， `farm`集群通过专门的内核级过滤器****来管理流量。其工作原理如下： 

  * **ARP 映射：**在客户端的 ARP 缓存中，VIP 最初与单个硬件地址关联（例如，服务器 1 的`mac1` ）。
  * **数据包拆分：**当服务器 1 收到流量时， SafeKit内核过滤器分析传入数据包的身份（基于**客户端 IP**或**TCP 端口** ）。
  * **负载共享：**该过滤器确定哪些数据包应在本地处理，哪些数据包应重定向到其他节点（例如，服务器 2）进行处理，从而确保负载均衡。


#### 使用免费 ARP 进行故障转移和重新路由 {#failover-and-rerouting-with-gratuitous-arp}

如果主节点（服务器 1）发生故障，集群仍可通过以下方式保持可用性： **免费ARP（GARP）**. SafeKit 广播 GARP 消息以更新客户端 ARP 缓存 `mac2` 服务器 2。这确保即使主“入口点”发生故障，客户端也会立即被重新路由到服务器 2 中幸存的节点。 farm. 

#### 远程站点部署 {#deployment-in-remote-sites}

对于跨**个远程数据中心**运行的组织，只要这些站点通过**扩展 LAN 或** VLAN 连接，此负载均衡算法仍然有效。这将创建一个虚拟的“同子网”环境，这是地理位置分散的`farm`集群最有效的配置。 

## 负载均衡虚拟 IP 如何跨不同子网工作（ `Farm`集群） {#vip-load-balancing-different-subnets}

### 多区域扩展：跨云子网协调流量 {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

**架构指南：在多区域和云环境中扩展`Farm`集群**提供了将应用程序工作负载分布到不同可用区和子网的蓝图。 

### 跨子网`Farm`集群：多节点Windows和Linux可扩展性 {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


![跨两个不同子网](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")运行的负载均衡集群farm示意图

 通过外部负载均衡进行全局流量分配。当`farm`个节点分布在**个不同的子网**中时（这在多可用区云部署中很常见），虚拟 IP (VIP) ****由外部负载均衡**(LB)**管理。该负载均衡器持有虚拟 IP，并将传入流量定向到位于各自子网中的服务器的物理 IP 地址。 

#### 智能流量路由和负载均衡规则 {#intelligent-traffic-routing--load-balancing-rules}

负载均衡器主要根据以下两个因素分配客户端请求： 

  * **分发规则：**流量根据会话亲和性或负载均衡算法进行拆分（例如，分析**客户端 IP 地址**或**客户端 TCP 端口** ）。
  * **节点可用性：**流量仅路由到由SafeKit健康检查确定的健康节点。


> **⚠️ 注意：** SafeKit提供健康检查逻辑；物理或虚拟负载均衡器必须由您的网络基础设施提供。

#### SafeKit健康检查机制 {#safekit-health-check-mechanism}

SafeKit在`farm`中的每台服务器上提供实时**健康检查 URL** ，以便将其运行状态传达给负载均衡器： 

  * **节点已启动：**健康检查返回`HTTP 200 OK` 。负载均衡器已将此服务器加入活动轮换。
  * **节点宕机/故障转移：**如果服务器或应用程序发生故障， SafeKit将返回`HTTP 404 NOT FOUND` （或服务变得无法访问）。负载均衡器立即停止向故障节点发送流量。


#### 云部署标准： AWS 、 Azure 、 GCP和 {#cloud-deployment-standards-aws-azure-and-gcp}

此架构是**云、 `Farm`集群和**集群的基础模型，确保即使整个子网或区域离线，剩余节点也能继续处理负载。此功能由以下组件原生支持： 

  * 💡 [ **Amazon AWS** ](</zh-hans/solutions/aws-load-balancing-cluster-failover/>) ( AWS网络负载均衡器)
  * 💡 [ **Microsoft Azure** ](</zh-hans/solutions/azure-load-balancing-cluster-failover/>) Azure负载均衡器)
  * 💡 [ **Google Cloud ( GCP )** ](</zh-hans/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud 负载均衡)


## 虚拟 IP 与 DNS 重定向：为什么 DNS 故障转移经常失败 {#virtual-ip-vs-dns-redirection-failover}

### DNS传播陷阱：为什么VIP比DNS重定向表现更佳 {#the-dns-propagation-trap-why-vips-outperform-dns-redirection}

在高可用性架构中**依赖 DNS 进行故障转移往往会造成一种**的安全感。虽然修改 DNS 记录指向备份服务器看似是一条简单的恢复路径，但它引入了一个关键变量： **预测的延迟。由于基于**的重定向依赖于一个不受控制的中间递归解析器生态系统来识别和传播更改，因此它从根本上来说与现代企业服务的“零停机时间”要求不符。 

### 技术场景：DNS 解析和“卡住”的客户端 {#the-technical-scenario-dns-resolution-and-the-stuck-client}

在标准网络配置中，虚拟名称**** （DNS 名称）作为用户可读的入口点。但是，数据要在网络中传输，必须将该名称解析为特定的物理 IP 地址**** 。 

![图显示了高可用性集群](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")中 DNS 名称解析到物理 IP 1 的情况

 高可用性集群中物理 IP 1 上的 DNS 解析和“卡住”的客户端

#### 当前状态：解析到物理 IP 地址 1 {#current-state-resolution-to-physical-ip-1}

最初，客户端 1 **、客户端 2**和客户端 2 **** DNS 系统查询虚拟名称。系统返回物理 IP 地址 1 **** 。然后，客户端与该特定硬件地址建立直接网络连接（套接字）。 

#### 故障转移挑战：重新路由到物理 IP 地址 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

如果物理 IP 地址为 1 的服务器发生故障，管理员需要更新 DNS 记录，使其指向物理 IP 地址为 2 的**** 。为了成功重定向客户端，必须满足以下“完美”的条件： 

  * **生存时间 (TTL)**必须在所有中间 ISP 和企业解析器上过期。
  * 客户端 1 和客户端 2 上的本地 DNS 缓存必须被清除。
  * 应用程序必须关闭其现有套接字并启动新的 DNS 查询。

如果漏掉任何步骤， **客户端 1 和客户端 2 将“卡住”**尝试与失效的物理 IP 1 通信，即使 DNS 记录已更新，也会导致服务中断。 

### DNS重定向的两个“黑匣子” {#the-two-black-boxes-of-dns-redirection}

  * **递归缓存：**许多互联网服务提供商 (ISP) 和企业 DNS 解析器会忽略较低的 TTL 设置以减少流量，通常会将“旧的”物理 IP 1 缓存数分钟甚至数小时，超过请求的过期时间。
  * **应用持久性：**现代应用程序（例如基于 Java 的微服务或 Web 浏览器）通常只在启动时执行一次 DNS 查询。即使 DNS 记录更新为物理 IP 地址 2，应用程序仍会继续使用存储在其内部存储器中的初始 IP 地址。


### 结论 {#conclusion}

DNS重定向并非高可用性解决方案的理想选择。对于本地或区域环境中的即时故障转移，软件定义的虚拟IP（VIP ****确保零停机时间持久性的唯一途径。 

## 比较：虚拟 IP 实现、延迟和应用透明性 {#vip-vs-dns-comparison}

**虚拟IP（VIP）重定向方法与DNS重定向在高可用性和灾难恢复方面的技术比较**

环境与用例|高可用性类型|重定向机制|网络延迟|应用透明性和 IP 本地性  
---|---|---|---|---  
主备（高可用性） | Mirror集群|免费 ARP / MAC 地址接管|极低：检测和发送广播 GARP 的时间|完全透明：虚拟 IP 地址位于活动节点本地。客户端 IP 地址保持不变。  
负载均衡（主动/主动） | `Farm`集群|内核级网络过滤器/GARP |极低：检测和重新配置网络过滤器所需时间|完全透明：虚拟 IP 在所有节点上均为本地 IP。客户端 IP 保持不变。  
同子网/扩展局域网（VLAN 扩展） |灾难恢复（远程数据中心） |标准 IP 别名/GARP |低：取决于扩展 VLAN 的往返时间 (RTT) |完全透明：虚拟 IP 地址位于节点本地。客户端 IP 地址保持不变。  
不同子网|灾难恢复（远程数据中心/云） |外部负载均衡器|中等：由于负载均衡器健康检查间隔，故障转移延迟较高| ⚠️ 部分透明：使用 SNAT/DNAT。虚拟 IP 为**，而非** （节点本地）。客户端 IP 为**，而非** （保留）。应用程序必须支持此功能。  
DNS 重定向：无 VIP |灾难恢复（远程数据中心） | DNS 记录更新（名称/物理 IP） |高/不可预测：取决于 DNS TTL（生存时间）和客户端 DNS 缓存。 | ⚠️ 不可靠：客户端必须重新解析 DNS。大多数情况下，客户端会继续使用启动时解析的过时 IP，并且在故障转移后不会被重定向。  
  
## 配置虚拟 IP 地址以实现网络负载均衡和高可用性 {#virtual-ip-configuration-load-balancing-ha}


{{%  insert-safekit-farm-video-zh-hans  %}}
 

## 关于虚拟IP（VIP）常见问题解答 {#virtual-ip-faq}

### 虚拟IP（VIP）和网络 {#virtual-ip-vip--networking}

什么是虚拟IP（VIP）？它与物理IP有何不同？

物理 IP 地址**绑定到特定的网络接口，而虚拟 IP 地址 (VIP** **则是一个独立于硬件的“浮动”地址。在** SafeKit中，VIP 充当持久入口点；如果主服务器发生故障，VIP 会自动迁移到健康的备用节点，从而确保客户端零重配置。

使用虚拟IP需要硬件负载均衡器吗？

编号为**SafeKit高可用性软件**在软件层面管理虚拟 IP。在同子网架构中，它利用**IP 别名**和**免费 ARP (GARP)**来重定向流量。这省去了外部硬件负载均衡器或专用代理服务器的成本和复杂性。

什么是无偿ARP（GARP）？它为何被使用？

**免费 ARP (GARP)**是一种网络广播，用于更新网络交换机和路由器的 ARP 表。在故障切换期间，新的主服务器会发送一个 GARP 数据包，宣布虚拟 IP 地址****已映射到其 MAC 地址，从而强制网络流量立即重新路由。

我可以将DNS名称与虚拟IP关联起来吗？

**的。您可以通过创建标准 A 记录** DNS 名称与 VIP 关联起来。主要优势在于**是在 VIP 层（通过 ARP 或网络** ）而非 DNS 层进行管理的。 **确保**应用程序的透明性****了与 DNS 传播和 TTL 过期相关的延迟。

### 云与高级架构 {#cloud--advanced-architectures}

虚拟 IP 在云端如何工作（ AWS 、 Azure 、 GCP ）？

在受限的云环境中，第 2 层（ARP）通信 SafeKit 与……集成 **云负载均衡器** (AWS ELB， Azure LB，或 Google GCLB）。 SafeKit 提供 **健康检查网址** 该平台监控流量，并使用 SNAT/DNAT 将流量路由到活动节点。

对于灾难恢复而言，扩展局域网比负载均衡器更好吗？

**是的** 。对于远程数据中心， **扩展 LAN（扩展 VLAN）**通常更优，因为它能够跨站点保持**应用透明性** 。通过保持**相同的虚拟 IP** ，应用程序及其客户端可以继续使用相同的身份进行通信，从而实现数据中心之间的无缝切换。

DNS 重定向与虚拟 IP 相比有哪些局限性？

DNS 重定向**于** （生存时间）和客户端缓存，这可能导致恢复延迟数小时。一个主要缺点**，无法重新解析其 DNS 名称的客户**会一直尝试连接到故障服务器。 **，** IP **即时的二层**转移，可立即重定向所有流量，确保无论客户端 DNS 缓存状态如何，都能保持连接。

### 透明度和安全性 {#transparency--security}

为什么本地虚拟IP对应用程序透明性很重要？

本地虚拟 IP (VIP) **通过允许软件绑定到持久性 VIP**确保应用程序的透明性**在**级别处理SafeKit ，使应用程序无需感知集群故障**，**与绑定 IP 会发生变化的 DNAT 解决方案不同。

使用虚拟 IP 是否会保留客户端的原始 IP 地址？

是的SafeKit避免了源网络地址转换 (SNAT)。由于 VIP 地址位于活动服务器本地，应用程序会收到原始客户端 IP 地址**** ，这对于安全审计、会话持久性和监管日志记录至关重要。


{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}