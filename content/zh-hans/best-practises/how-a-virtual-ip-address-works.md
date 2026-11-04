---
title: "高可用集群中的虚拟 IP 地址如何工作？"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/how-a-virtual-ip-address-works/"
description: "了解 SafeKit 如何在故障转移时通过 GARP、负载均衡器、云 CLI 或 BGP 移动虚拟 IP。"
category: "best-practises"
lang: "zh-hans"
topics: "什么是高可用集群中的虚拟 IP 地址？, SafeKit 中虚拟 IP 地址的实现, 虚拟 IP 地址在同一子网中的工作方式（Mirror 集群）, 使用负载均衡器在不同子网间使用虚拟 IP 地址（Mirror 集群）, 使用云服务商 CLI 在不同子网间使用虚拟 IP 地址（Mirror 集群）, 使用 BGP 在不同子网间使用虚拟 IP 地址（Mirror 集群）, 不同子网间的 DNS 重定向（Mirror 集群）, Farm 集群在同一子网中的虚拟 IP 负载均衡, 不同子网间的虚拟 IP 负载均衡（Farm 集群）, 实现方式、延迟和应用透明度比较, 虚拟 IP 常见问题, 🔍 探索 SafeKit"
---

# 高可用集群中的虚拟 IP 地址如何工作？ {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## 什么是高可用集群中的虚拟 IP 地址？ {#virtual-ip-definition}

**虚拟 IP 地址**是客户端连接[高可用集群](</zh-hans/>)中应用程序时使用的唯一地址。它不固定到某一台服务器。发生故障转移时，它会移动到运行应用程序的服务器。客户端无需更改配置。

**SafeKit 的核心原则：**虚拟 IP 地址**在运行应用程序的服务器上本地配置**。应用程序使用该地址启动，并接收客户端的原始 IP 地址。因此，许多应用程序无需修改即可与 SafeKit 正常配合。SafeKit 支持两种虚拟 IP 地址：

  * **Mirror 集群中的主/备虚拟 IP 地址：**虚拟 IP 地址仅在主服务器上处于活动状态。发生故障转移时，它会移动到备用服务器。
  * **<span class="notranslate farm-term" translate="no">farm</span> 集群中的网络负载均衡虚拟 IP 地址：**虚拟 IP 地址同时在所有服务器上处于活动状态，流量在服务器之间分配。

## SafeKit 中虚拟 IP 地址的实现 {#safekit-virtual-ip-implementation}

本文介绍 SafeKit 如何在不同网络架构中移动虚拟 IP 地址：

  * **同一子网或扩展 LAN（[Mirror](#virtual-ip-same-subnet-failover) 和 [<span class="notranslate farm-term" translate="no">Farm</span>](#virtual-ip-load-balancing-same-subnet) 集群）：**SafeKit 在服务器上配置虚拟 IP 地址并发送**免费 ARP（GARP）**。无需外部硬件。这是最透明的方案，因为整个机制由 SafeKit 实现。
  * **不同子网并使用负载均衡器（[Mirror](#virtual-ip-different-subnets-failover) 和 [<span class="notranslate farm-term" translate="no">Farm</span>](#virtual-ip-load-balancing-different-subnets) 集群）：**负载均衡器使用 SafeKit 的**运行状况检查**将流量发送到正确的服务器。负载均衡器由集成商配置。
  * **[不同子网并使用云服务商 CLI](#virtual-ip-cloud-cli-failover)（Mirror 集群）：**SafeKit 的 `start_prim` 脚本调用云 CLI 来移动虚拟 IP 地址。脚本由集成商编写。
  * **[不同子网并使用 BGP](#virtual-ip-bgp-failover)（Mirror 集群）：**主服务器向路由器通告虚拟 IP 地址。脚本由集成商编写。
  * **[不同子网并使用 DNS 重定向](#virtual-ip-vs-dns-redirection-failover)（Mirror 集群）：**SafeKit 的 `start_prim` 脚本更改虚拟名称的 DNS 记录，使其指向新主服务器的**物理 IP 地址**。脚本由集成商编写。此方法没有唯一的虚拟 IP 地址，也不适用于所有客户端。

本文内容：

  * [实现方式、延迟和应用透明度比较](#virtual-ip-methods-comparison)
  * [虚拟 IP 常见问题](#virtual-ip-faq)
  * [🔍 探索 SafeKit](#hub)

![Evidian SafeKit 中虚拟 IP 行为的比较：Mirror 集群在活动节点上使用浮动 IP，Farm 集群在所有节点上进行网络负载均衡。](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**SafeKit 中 Mirror 和 <span class="notranslate farm-term" translate="no">Farm</span> 集群的虚拟 IP 地址实现。**

## 虚拟 IP 地址在同一子网中的工作方式（Mirror 集群） {#virtual-ip-same-subnet-failover}

- [测试 SafeKit Mirror 集群中的主/备虚拟 IP 地址](/zh-hans/best-practises/test-primary-backup-vip-mirror/)

### 本地子网中的自动故障转移和网络重路由 {#automated-failover--network-rerouting-in-a-local-subnet}

在本地网络中，**SafeKit** 会自动管理虚拟 IP 地址和应用程序故障转移。

### 本地 Mirror 集群：Windows 或 Linux 上的双节点故障转移 {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}

![SafeKit 在同一子网中的两台服务器之间转移虚拟 IP 的机制](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

在 **SafeKit Mirror 集群**中，两个节点位于同一子网。高可用性通过**虚拟 IP 地址**实现。SafeKit 在操作系统网络堆栈中管理该地址，无需专用硬件。虚拟 IP 地址通过**IP 别名**添加到服务器 1 和服务器 2 的物理 IP 地址中。客户端始终连接到虚拟 IP 地址。

#### SafeKit 中的 IP 别名和多个虚拟 IP（VIP）支持 {#safekits-advanced-ip-aliasing--multiple-virtual-ip-support}

虚拟 IP 地址是一个在节点间移动的第三个 IP 地址。SafeKit 可以在一个集群中管理**多个虚拟 IP 地址**。它们可以配置在同一网卡或不同网卡上，使每项服务都能使用自己的虚拟 IP 地址。

#### 故障转移机制：免费 ARP（GARP） {#the-failover-mechanism-gratuitous-arp-garp}

故障转移无需人工操作。正常运行时，虚拟 IP 地址与**服务器 1 的 MAC 地址（mac1）**关联。如果服务器 1 故障，SafeKit 会执行三项操作：

  * **虚拟 IP 别名配置：**SafeKit 将虚拟 IP 地址配置为服务器 2（新的主服务器）网卡上的别名。随后，操作系统向网络发送消息，通告虚拟 IP 地址。
  * **GARP：**SafeKit 还会发送**免费 ARP（GARP）消息**。网络交换机和客户端更新其 ARP 缓存。此时，虚拟 IP 地址与**服务器 2 的 MAC 地址（mac2）**关联。
  * **应用程序恢复：**SafeKit 在服务器 2 上重新启动应用程序服务。

#### 远程数据中心和扩展 VLAN {#remote-data-centers--extended-vlans}

上述**同一子网方案**也适用于远程站点之间的**灾难恢复（DR）**。如果站点通过**扩展 LAN 或扩展 VLAN**连接，这通常是最佳选择。两个站点因此位于同一子网，从而简化网络并避免复杂的路由协议。

> **⚠️ 注意：**使用免费 ARP 进行二层重路由是对应用程序**最透明的方案**。应用程序接收客户端原始 IP 地址，虚拟 IP 地址在本地配置。**许多应用程序需要**本地虚拟 IP 地址；没有它，应用程序**可能无法正常工作**。在同一子网配置中，SafeKit 实现整个机制，无需特殊集成。

## 使用负载均衡器在不同子网间使用虚拟 IP 地址（Mirror 集群） {#virtual-ip-different-subnets-failover}

### 使用 SafeKit 运行状况检查的负载均衡器 {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![使用负载均衡器在两个不同子网之间进行虚拟 IP 故障转移的示意图](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

当节点位于**不同子网**时，免费 ARP 无法移动虚拟 IP 地址。此时，虚拟 IP 地址位于**负载均衡器**上，由负载均衡器将流量发送到主服务器。

SafeKit 在每个节点上提供**运行状况检查 URL**：

  * **主节点（PRIM）：**返回 `HTTP 200 OK`。负载均衡器将流量发送到此节点。
  * **备用节点（SECOND）：**返回 `HTTP 404 NOT FOUND`。负载均衡器不会向此节点发送流量。

发生故障转移时，SafeKit 会更改响应，负载均衡器随后将流量发送到新的主服务器。这是 [**AWS**](</zh-hans/solutions/aws-high-availability-cluster-synchronous-replication-failover/>)、[**Azure**](</zh-hans/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) 和 [**Google Cloud**](</zh-hans/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>) **可用区**之间的标准方案。

> **⚠️ 注意：**SafeKit 提供运行状况检查。负载均衡器由您的网络或云服务商提供。

### 问题：负载均衡器拥有虚拟 IP 地址 {#the-load-balancer-pitfall-virtual-ip-on-the-frontend-nat-to-the-physical-ip}

仅使用负载均衡器时，客户端连接到虚拟 IP 地址。负载均衡器通过 NAT 将虚拟 IP 转换为主服务器的**物理 IP 地址**。客户端使用虚拟地址，但服务器使用物理地址，因此服务器看不到虚拟 IP 地址。

### 在主服务器上本地配置虚拟 IP 地址 {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

有些应用程序将虚拟 IP 地址用作服务器地址。只有将该地址也**配置在主服务器本地**时，它们才能正常工作。这样：

  * 服务可以通过虚拟 IP 地址启动；
  * 服务器可以通过该地址访问自身服务；
  * 使用该地址的身份验证可以正常工作。

**建议做法：**使用能够保留虚拟 IP 作为目标地址的负载均衡模式，例如 Floating IP 或 Direct Server Return。然后在主服务器本地配置虚拟 IP 地址。具体方法取决于虚拟 IP 所属的子网：

  * **虚拟 IP 位于与服务器物理 IP 地址相同的子网：**在 SafeKit 模块中保留 `<vip>` 部分。SafeKit 会自动在与物理 IP 地址关联的网卡上将虚拟 IP 配置为别名。
  * **虚拟 IP 位于不同子网：**不要在 SafeKit 中配置 `<vip>`。使用 `start_prim` 脚本在应用程序启动前将虚拟 IP 配置到专用接口（例如 loopback）。应用程序停止后，使用 `stop_prim` 删除该地址。这些命令由集成商编写，不属于 SafeKit 产品。

## 使用云服务商 CLI 在不同子网间使用虚拟 IP 地址（Mirror 集群） {#virtual-ip-cloud-cli-failover}

### 云环境中免费 ARP 无法工作的原因 {#why-gratuitous-arp-does-not-work-in-public-clouds}

云网络（AWS、Azure、Google Cloud）会**忽略免费 ARP**。它们只向分配给云平台的 IP 地址发送流量。SafeKit 在主服务器上配置虚拟 IP 地址，但云网络不会将该地址的流量发送到这台服务器。

### 使用云 CLI 移动虚拟 IP 地址 {#moving-the-virtual-ip-through-the-cloud-api-in-safekit-failover-scripts}

没有负载均衡器时，可以将云服务商 CLI 集成到 SafeKit 的 **`start_prim` 脚本**中，在应用程序启动前更新云网络配置。CLI 可以将虚拟 IP 分配给即将成为主节点的节点，也可以更新云路由，将该地址的流量导向该节点。

**虚拟 IP 地址保留在主服务器本地。**不使用 **NAT**，客户端原始 IP 地址也不会改变。

### 集成商的责任 {#integrator-responsibility}

**集成商**必须将云 CLI 命令添加到 `start_prim` 脚本中。这些命令**不由 SafeKit 产品提供**，并取决于云服务商、网络设计和客户的安全规则。

### 限制 {#constraints-of-the-cli-approach}

  * 两个节点都必须安装云 CLI。每个节点都需要具有必要网络权限的云身份。
  * 脚本必须处理错误和重试。
  * 与使用负载均衡器相比，故障转移可能较慢。

## 使用 BGP 在不同子网间使用虚拟 IP 地址（Mirror 集群） {#virtual-ip-bgp-failover}

### 使用 BGP 重路由虚拟 IP 地址 {#layer-3-virtual-ip-rerouting-with-bgp-route-advertisement}

使用 **BGP（边界网关协议）**时，`start_prim` 脚本通常会在应用程序启动前，将虚拟 IP 配置到主服务器的 loopback 接口上。随后，主服务器将 VIP 作为 /32 路由通告给路由器。

发生故障转移时，旧主服务器上的 `stop_prim` 脚本会停止应用程序，从 loopback 接口删除 VIP，并从路由器撤销 /32 路由。如果旧主服务器崩溃，`stop_prim` 不会运行，但路由器会因 BGP 会话丢失而自动删除路由。

### 优势和前提条件 {#benefits-and-prerequisites}

  * **虚拟 IP 地址保留在本地，不使用 NAT，客户端 IP 地址也不会改变。**
  * 该方案可跨子网和站点工作，无需扩展 VLAN。
  * 需要 BGP 路由器和网络团队的协助。在云中，需要云服务商提供路由服务器服务。

> **⚠️ 注意：**BGP 集成使用 SafeKit 脚本和您的路由基础设施。**集成商**必须在 `start_prim` 和 `stop_prim` 脚本中编写命令。这些脚本**不由 SafeKit 产品提供**。投入生产前，请与网络团队验证该方案。

## 使用 DNS 重定向在不同子网间使用虚拟 IP 地址（Mirror 集群） {#virtual-ip-vs-dns-redirection-failover}

### 使用 `start_prim` 脚本进行 DNS 重定向 {#dns-rerouting-with-the-start-prim-script}

DNS 重定向**没有唯一的虚拟 IP 地址**。客户端连接到一个**虚拟名称**（DNS 名称）。发生故障转移时，新主服务器上的 `start_prim` 脚本启动应用程序，然后更改虚拟名称的 DNS 记录，使其指向新主服务器的**物理 IP 地址**。

`stop_prim` 脚本无需执行任何操作。如果旧主服务器崩溃，新主服务器会覆盖 DNS 记录。

### 示例：DNS 解析与客户端受阻 {#the-technical-scenario-dns-resolution-and-the-stuck-client}

![高可用集群中 DNS 名称解析到物理 IP 地址 1 的示意图](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

DNS 解析：高可用集群中的客户端停留在物理 IP 地址 1 上。

#### 故障转移前：名称指向物理 IP 地址 1 {#current-state-resolution-to-physical-ip-1}

**客户端 1** 和 **客户端 2** 向 DNS 系统查询虚拟名称的 IP 地址。DNS 系统返回**物理 IP 地址 1**。随后，客户端与该地址建立网络连接。

#### 故障转移后：名称指向物理 IP 地址 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

服务器 1 发生故障。服务器 2 上的 `start_prim` 脚本将 DNS 记录更改为**物理 IP 地址 2**。只有满足以下所有条件，客户端才能连接到该地址：

  * 客户端与 DNS 记录之间的所有 DNS 服务器上的 **TTL（Time to Live）**均已过期；
  * 客户端 1 和客户端 2 的本地 DNS 缓存为空；
  * 应用程序关闭连接并执行一次**新的** DNS 查询。

只要有一个条件不满足，**客户端 1 和客户端 2 就会停留在物理 IP 地址 1 上**。即使 DNS 记录正确，服务仍不可用。

### 限制和前提条件 {#the-two-black-boxes-of-dns-redirection}

  * **DNS 缓存：**许多互联网服务提供商和企业 DNS 服务器会忽略较短的 TTL，可能将旧物理 IP 地址 1 保留数分钟甚至数小时。
  * **应用程序行为：**许多应用程序（例如 Java 服务或 Web 浏览器）只在启动时查询一次 DNS，之后继续使用首次获取的 IP 地址。
  * **每次故障转移时 IP 地址都会变化：**应用程序没有本地且固定的虚拟 IP 地址。注册自身 IP 地址的应用程序可能无法工作。
  * **前提条件：**DNS 记录具有较短的 TTL（例如 30 到 60 秒），并且两个服务器都有权限更新 DNS 区域。

> **⚠️ 注意：** **集成商**必须在 `start_prim` 脚本中编写 DNS 更新命令。这些命令**不由 SafeKit 产品提供**，具体取决于 DNS 服务器（Windows DNS、BIND 或云 DNS）。

### 结论 {#conclusion}

DNS 重定向不是可靠的高可用解决方案。只有当所有客户端重新连接时都会执行新的 DNS 查询，才使用此方法。若要实现即时且透明的故障转移，请使用**虚拟 IP 地址**：通过扩展 LAN、负载均衡器、云服务商 CLI 或 BGP 实现。

## Farm 集群在同一子网中的虚拟 IP 负载均衡 {#virtual-ip-load-balancing-same-subnet}

- [测试 SafeKit Farm 集群中的负载均衡虚拟 IP 地址](/zh-hans/best-practises/test-load-balancing-vip-farm/)

### 内核中的负载均衡与冗余 {#scalable-performance-kernel-level-load-balancing--redundancy}

流量较大时，SafeKit 可以将工作分配给多个活动服务器。一台服务器发生故障时，其他服务器会继续工作。

### Farm 集群架构：Windows 或 Linux 节点间的负载均衡 {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}

![同一子网中虚拟 IP 负载均衡的示意图](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

在**负载均衡 Farm 集群**中，客户端连接到虚拟 IP，请求同时分发到多台服务器。此示例展示两个节点，也可以向集群添加更多节点。在同一子网中，通过在集群**每台服务器**的网卡上配置 IP 别名来设置虚拟 IP 地址。

#### 流量分发：内核过滤器 {#traffic-distribution-the-kernel-level-filter}

在 <span class="notranslate farm-term" translate="no">Farm</span> 集群中，SafeKit 的**内核过滤器**负责分发流量，具体过程如下：

  * **ARP 映射：**在客户端的 ARP 缓存中，虚拟 IP 地址关联到一个 MAC 地址，例如服务器 1 的 `mac1`。
  * **数据包分析：**服务器 1 接收数据包。SafeKit 内核过滤器读取每个数据包的**客户端 IP 地址**或**TCP 端口**。
  * **负载分配：**过滤器决定哪些数据包由服务器 1 处理，哪些发送到其他节点（例如服务器 2）。将数据包发送到其他节点时，过滤器会把数据包的**目标 MAC 地址**替换为该节点的 MAC 地址。目标 IP 地址仍然是虚拟 IP 地址。这样，工作负载就在各服务器间分配。

#### 使用免费 ARP 进行故障转移和重路由 {#failover-and-rerouting-with-gratuitous-arp}

服务器 1 发生故障时，SafeKit 会发送一条**免费 ARP（GARP）消息**。客户端使用服务器 2 的 MAC 地址 `mac2` 更新 ARP 缓存。随后，流量会立即发送到其他 Farm 节点。

#### 在远程站点部署 {#deployment-in-remote-sites}

如果站点通过**扩展 LAN 或 VLAN**连接，此负载均衡方案也适用于**远程数据中心**之间。所有站点随后位于同一子网。这是跨多个站点部署 <span class="notranslate farm-term" translate="no">Farm</span> 集群的最高效配置。

{{%  insert-safekit-farm-video-zh-hans  %}}

## 不同子网间的虚拟 IP 负载均衡（Farm 集群） {#virtual-ip-load-balancing-different-subnets}

### 云子网间的流量 {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

<span class="notranslate farm-term" translate="no">Farm</span> 集群可以在多个可用区和子网之间分配应用程序负载。

### 跨子网 Farm 集群：多台 Windows 或 Linux 节点 {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}

![跨两个不同子网运行的 Farm 负载均衡集群示意图](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

当 <span class="notranslate farm-term" translate="no">Farm</span> 节点位于**不同子网**（例如多个云可用区）时，**虚拟 IP 地址**位于外部**负载均衡器（LB）**上。负载均衡器将流量发送到各子网中服务器的物理 IP 地址。

#### 流量路由和负载均衡规则 {#intelligent-traffic-routing--load-balancing-rules}

负载均衡器根据两个条件分发客户端请求：

  * **负载均衡规则：**例如**客户端 IP 地址**或**客户端 TCP 端口**。
  * **节点可用性：**负载均衡器根据 SafeKit 健康检查，仅向健康节点发送流量。

> **⚠️ 注意：**SafeKit 提供健康检查。负载均衡器由您的网络或云服务商提供。

#### SafeKit 健康检查 {#safekit-health-check-mechanism}

SafeKit 在每台 <span class="notranslate farm-term" translate="no">Farm</span> 服务器上提供**健康检查 URL**。负载均衡器会读取该 URL，以了解每台服务器的状态：

  * **节点 UP：**健康检查返回 `HTTP 200 OK`。负载均衡器向该服务器发送流量。
  * **节点 DOWN：**服务器或应用程序发生故障时，SafeKit 返回 `HTTP 404 NOT FOUND`（或服务器无响应）。负载均衡器会立即停止向该节点发送流量。

#### 云部署：AWS、Azure 和 GCP {#cloud-deployment-standards-aws-azure-and-gcp}

这是**云上 Farm 集群**的标准架构。如果子网或可用区不可用，其他节点会继续处理流量。该方案适用于 [**Amazon AWS**](</zh-hans/solutions/aws-load-balancing-cluster-failover/>)（AWS Network Load Balancer）、[**Microsoft Azure**](</zh-hans/solutions/azure-load-balancing-cluster-failover/>)（Azure Load Balancer）和 [**Google Cloud (GCP)**](</zh-hans/solutions/gcp-load-balancing-cluster-failover/>)（Google Cloud Load Balancing）。

## 虚拟 IP 实现、延迟和应用程序透明度比较 {#virtual-ip-methods-comparison}

**高可用性和灾难恢复中虚拟 IP 与 DNS 重定向方法的比较。**

环境和使用场景 | 高可用性类型 | 重定向方法 | 实施方 | 网络延迟 | 应用程序透明度和本地 IP  
---|---|---|---|---|---  
主/备（高可用性） | Mirror 集群 | 免费 ARP / MAC 接管 | ✅ SafeKit 产品 | 很低：检测故障并发送 GARP 所需的时间 | 完全透明：虚拟 IP 在活动节点上本地配置。客户端 IP 不变。  
负载均衡（主动/主动） | <span class="notranslate farm-term" translate="no">Farm</span> 集群 | 内核网络过滤器 / GARP | ✅ SafeKit 产品 | 很低：检测故障并更改网络过滤器所需的时间 | 完全透明：虚拟 IP 在所有节点上本地配置。客户端 IP 不变。  
同一子网 / 扩展 LAN（扩展 VLAN） | 灾难恢复（远程数据中心） | IP 别名 / GARP | ✅ SafeKit 产品（扩展 VLAN 由网络团队提供） | 低：取决于扩展 VLAN 的往返时间（RTT） | 完全透明：虚拟 IP 在各节点上本地配置。客户端 IP 不变。  
不同子网：仅使用负载均衡器 | 灾难恢复（远程数据中心 / 云） | 外部负载均衡器 | 🛠️ 集成商：负载均衡器配置（SafeKit 提供健康检查） | 中等：取决于负载均衡器的健康检查间隔 | ⚠️ 使用 SNAT/DNAT 时，透明度是部分的。虚拟 IP **不在**节点上本地配置。客户端 IP 可能**无法**保留。应用程序必须支持这种情况。  
不同子网：负载均衡器 + SafeKit 本地虚拟 IP | 灾难恢复（远程数据中心 / 云） | 带 Floating IP / Direct Server Return 的外部负载均衡器 | 🛠️ 集成商：负载均衡器配置（SafeKit 提供健康检查） | 中等：取决于负载均衡器的健康检查间隔 | 透明度良好：虚拟 IP 在主节点上本地配置，并作为目标地址使用。  
不同子网：云 CLI | 灾难恢复（云） | 云 API：将私有 IP 或云路由移动到新的主服务器 | 🛠️ 集成商：`start_prim` 脚本中的云 CLI 命令 | 中到高：取决于云 API 的响应时间 | 完全透明：虚拟 IP 在主节点上本地配置。客户端 IP 不变。  
不同子网：BGP | 灾难恢复（远程数据中心 / 云） | 通过 BGP 通告 /32 路由 | 🛠️ 集成商：`start_prim` 和 `stop_prim` 脚本中的 BGP 命令 | 低到中：取决于 BGP 收敛时间 | 完全透明：虚拟 IP 在主节点上本地配置。客户端 IP 不变。需要 BGP 路由器。  
DNS 重定向：没有虚拟 IP | 灾难恢复（远程数据中心） | 更改 DNS 记录（名称 / 物理 IP） | 🛠️ 集成商：`start_prim` 脚本中的 DNS 更新命令 | 高且不可预测：取决于 DNS TTL 和客户端 DNS 缓存 | ⚠️ 不可靠：客户端必须重新查询 DNS。客户端通常会继续使用启动时获取的旧 IP，故障转移后无法切换到新服务器。  

## 虚拟 IP 常见问题 {#virtual-ip-faq}

### 虚拟 IP 和网络 {#virtual-ip--networking}

什么是虚拟 IP 地址？它与物理 IP 地址有什么区别？

**物理 IP 地址**关联到一张网卡。**虚拟 IP 地址**不与硬件绑定。在 SafeKit 集群中，客户端始终使用虚拟 IP。主服务器发生故障时，虚拟 IP 会自动移动到健康节点。无需更改客户端配置。

使用虚拟 IP 是否需要硬件负载均衡器？

不需要。**SafeKit**通过软件管理虚拟 IP。在同一子网中，它使用**IP 别名**和**免费 ARP（GARP）**重定向流量。无需外部负载均衡器或代理服务器。

什么是免费 ARP（GARP）？为什么要使用它？

**免费 ARP（GARP）**是一种发送给所有设备的网络消息，用于更新交换机和路由器的 ARP 表。故障转移时，新的主服务器发送 GARP 消息，通知网络**虚拟 IP**现在关联到新主服务器的 MAC 地址。随后流量会立即重路由。

可以将 DNS 名称关联到虚拟 IP 吗？

**可以。**为虚拟 IP 创建标准 A 记录。重定向发生在**虚拟 IP 层面**（通过 ARP 或网络重定向），**而非 DNS 层面**。不会遇到 DNS 延迟或 TTL 问题，故障转移对应用程序仍然**透明**。

### 云和高级架构 {#cloud--advanced-architectures}

虚拟 IP 在云环境（AWS、Azure、GCP）中如何工作？

在云环境中，无法使用二层 GARP 消息重路由虚拟 IP。SafeKit 可与**云负载均衡器**（AWS ELB、Azure LB 或 Google GCLB）配合使用。SafeKit 提供**健康检查 URL**，负载均衡器查询该 URL 并将流量发送到活动节点。

对于灾难恢复，扩展 LAN 是否比负载均衡器更好？

**是。**在远程数据中心之间，**扩展 LAN（扩展 VLAN）**通常更好，因为故障转移对应用程序保持**透明**。**虚拟 IP 不会改变**，因此数据中心之间发生故障转移后，应用程序和客户端仍使用同一地址。

与虚拟 IP 相比，DNS 重定向有哪些限制？

**DNS 重定向**依赖**TTL（Time to Live）**和客户端 DNS 缓存，恢复可能需要数小时。此外，**不重新查询 DNS 的客户端会继续连接到故障服务器**。**虚拟 IP**通过二层 GARP 消息立即重路由，不受客户端 DNS 缓存影响。

### 透明性和安全 {#transparency--security}

本地虚拟 IP 为什么对应用程序透明性很重要？

使用本地**虚拟 IP**时，应用程序使用的地址不会改变。SafeKit 在**内核**中执行重定向，因此应用程序不会察觉故障转移。使用 DNAT 时，应用程序使用的地址会发生变化。

虚拟 IP 会保留客户端的原始 IP 地址吗？

会。SafeKit 不使用源 NAT（SNAT）。由于虚拟 IP 在活动服务器上本地配置，应用程序会收到**客户端的原始 IP 地址**。这对安全审计、会话持久性和法规日志很重要。

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}
