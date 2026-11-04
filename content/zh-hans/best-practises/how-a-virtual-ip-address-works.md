---
title: "虚拟 IP 地址在高可用性集群中是如何工作的？"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/how-a-virtual-ip-address-works/"
description: "SafeKit 如何在故障转移时迁移虚拟 IP：通过同一子网内的免费 ARP、负载均衡器、云 CLI 或跨子网的 BGP。为什么本地虚拟 IP 很重要。"
category: "best-practises"
lang: "zh-hans"
topics: "高可用性集群中的虚拟 IP 地址是什么？SafeKit 中的虚拟 IP 实现，虚拟 IP 地址在同一子网（mirror 集群）中的工作原理，虚拟 IP 如何在不同子网中使用负载均衡器（mirror 集群）工作，虚拟 IP 如何在不同子网中使用云提供商 CLI（mirror 集群）工作，虚拟 IP 如何在不同子网中使用 BGP（mirror 集群）工作，DNS 重定向如何在不同子网中工作（mirror 集群），虚拟 IP 负载均衡在同一 farm 集群中如何工作，负载均衡的虚拟 IP 如何在不同子网中工作（farm 集群），比较：虚拟 IP 实现、延迟和应用程序透明性，虚拟 IP 常见问题解答，🔍 探索 SafeKit"
---

# 虚拟 IP 地址在高可用性集群中是如何工作的？ {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## 高可用性集群中的虚拟 IP 地址是什么？ {#virtual-ip-definition}

**虚拟 IP 地址**是客户端用于连接到[高可用性集群](</zh-hans/>)中应用程序的唯一地址。虚拟 IP 地址不绑定到任何特定服务器。发生故障转移时，它会切换到运行该应用程序的服务器。客户端无需更改其配置。

**SafeKit 的核心原理是：** 虚拟 IP 在运行应用程序的**服务器上本地配置**。应用程序在虚拟 IP 上启动，并接收原始客户端 IP。这就是为什么许多应用程序无需任何更改即可在 SafeKit 上正常工作的原因。SafeKit 提供两种类型的虚拟 IP：

  * **主/备虚拟 IP mirror 集群：** 虚拟 IP 仅在主服务器上处于活动状态。发生故障转移时，它将迁移到备用服务器。
  * **利用集群 <span class="notranslate farm-term" translate="no">farm</span> 虚拟 IP 进行网络负载均衡：** 虚拟 IP 同时在所有服务器上处于活动状态，流量在服务器之间共享。

## SafeKit 中的虚拟 IP 实现 {#safekit-virtual-ip-implementation}

本文解释了 SafeKit 如何在各种网络架构中迁移虚拟 IP 地址：

  * **在同一子网或扩展局域网（[mirror](#virtual-ip-same-subnet-failover)和[<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-same-subnet)）中：** SafeKit 会在服务器上配置虚拟 IP 地址并发送**免费 ARP（GARP）** 请求。无需任何外部硬件。这是最透明的解决方案（所有操作均由 SafeKit 产品实现）。
  * **具有负载均衡器的不同子网（[mirror](#virtual-ip-different-subnets-failover)和[<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-different-subnets)）：** 负载均衡器使用 SafeKit **健康检查**将流量发送到正确的服务器（负载均衡器由集成商配置）。
  * **[使用云提供商 CLI 的不同子网](#virtual-ip-cloud-cli-failover)（mirror 集群）：** SafeKit `start_prim` 脚本调用云 CLI 来移动虚拟 IP（由集成商编写的脚本）。
  * **[使用 BGP 的不同子网](#virtual-ip-bgp-failover)（mirror 集群）：** 主服务器向路由器通告虚拟 IP（由集成商编写的脚本）。
  * **[使用 DNS 重定向的不同子网](#virtual-ip-vs-dns-redirection-failover)（mirror 集群）：** SafeKit 的 `start_prim` 脚本会将虚拟名称的 DNS 记录更改为新主服务器的物理 IP 地址（该脚本由集成商编写）。由于不存在单一的虚拟 IP 地址，因此这种方法并非对所有客户端都可靠。

本文还包含以下内容：

  * [比较：虚拟 IP 实现、延迟和应用透明度](#virtual-ip-methods-comparison)
  * [关于虚拟 IP 的常见问题](#virtual-ip-faq)
  * [🔍 探索 SafeKit](#hub)

![Eviden SafeKit 中虚拟 IP 行为的比较图： Mirror 集群在活动节点上显示 floating IP 而 farm 集群则显示跨所有节点的网络负载均衡。](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**SafeKit 中 mirror 和 <span class="notranslate farm-term" translate="no">farm</span> 集群的虚拟 IP 实现。**

## 同一子网内虚拟 IP 地址的工作原理（mirror 集群） {#virtual-ip-same-subnet-failover}

- [测试 SafeKit mirror 集群中的主/备份虚拟 IP 地址](/zh-hans/best-practises/test-primary-backup-vip-mirror/)

### 本地子网中的自动故障转移和网络重新路由 {#automated-failover--network-rerouting-in-a-local-subnet}

在本地网络中，**SafeKit** 会自动管理虚拟 IP 地址和应用程序故障转移。

### 本地 mirror 集群：Windows 或 Linux 上的双节点故障转移 {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![SafeKit 虚拟 IP 故障转移机制，用于同一子网内两台服务器之间的故障转移。](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

在 **SafeKit mirror 集群**中，两个节点位于同一子网。高可用性使用**虚拟 IP** 地址。SafeKit 在操作系统的网络堆栈中管理虚拟 IP 地址。无需特殊硬件。虚拟 IP 地址通过 **IP 别名**添加到服务器 1 和服务器 2 的物理 IP 地址中。客户端始终连接到虚拟 IP 地址。

#### SafeKit 中的 IP 别名和多个虚拟 IP (VIP) {#safekits-advanced-ip-aliasing--multiple-virtual-ip-support}

虚拟 IP 是第三个 IP 地址，可以在节点之间移动。SafeKit 可以在一个集群中管理**多个虚拟 IP 地址**。您可以将它们配置在同一张网卡上，也可以配置在不同的网卡上。这样，每个服务都可以使用自己的虚拟 IP 地址。

#### 故障转移机制：无偿 ARP（GARP） {#the-failover-mechanism-gratuitous-arp-garp}

故障转移无需任何手动操作。正常运行时，虚拟 IP 地址与**服务器 1 的 MAC 地址 (mac1)** 关联。如果服务器 1 发生故障，SafeKit 将执行以下三项操作：

  * **虚拟 IP 别名：** SafeKit 将虚拟 IP 配置为服务器 2（新的主服务器）网卡上的别名。然后，操作系统会在网络上发送消息来通告该虚拟 IP。
  * **GARP：** SafeKit 还会发送**免费 ARP (GARP)** 消息。网络交换机和客户端会更新其 ARP 缓存。虚拟 IP 现在与**服务器 2 的 MAC 地址 (mac2)** 关联。
  * **应用程序恢复：** SafeKit 重启服务器 2 上的应用程序服务。


#### 远程数据中心和扩展 VLAN {#remote-data-centers--extended-vlans}

**上述同子网解决方案**也适用于远程站点之间的**灾难恢复 (DR)**，并且当站点通过**扩展局域网 (LAN) 或延伸 VLAN** 连接时，通常是最佳选择。两个站点位于同一子网中。网络更简单，无需复杂的路由协议。

> **⚠️ 注意：** 使用免费 ARP 进行二层路由重路由是应用**最透明的解决方案**。应用会收到原始客户端 IP 地址，虚拟 IP 地址在本地配置。**许多应用需要**本地虚拟 IP 地址，否则**可能无法正常工作**。在这种同子网配置下，SafeKit 实现了整个机制，因此无需任何特殊的集成工作。

## 虚拟 IP 如何通过负载均衡器（mirror 集群）在不同子网中工作 {#virtual-ip-different-subnets-failover}

### 带有 SafeKit 健康检查的负载均衡器 {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![使用负载均衡器在两个不同子网之间实现虚拟 IP 故障转移的示意图](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

当节点位于**不同的子网**时，免费 ARP 无法转移虚拟 IP 地址。在这种情况下，虚拟 IP 地址位于**负载均衡器**上。负载均衡器会将流量发送到主服务器。

SafeKit 为每个节点提供一个**健康检查 URL**：

  * **主节点（PRIM）：** 返回 `HTTP 200 OK`。。负载均衡器将流量发送到此节点。
  * **辅助节点（SECOND）：** 返回 `HTTP 404 NOT FOUND`。。负载均衡器不会向此节点发送任何流量。

故障转移时，SafeKit 会更改响应，负载均衡器会将流量发送到新的主服务器。这是[**AWS**](</zh-hans/solutions/aws-high-availability-cluster-synchronous-replication-failover/>)、 [**Azure**](</zh-hans/solutions/azure-high-availability-cluster-synchronous-replication-failover/>)和[**Google Cloud**](</zh-hans/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>)**可用区**之间的标准解决方案。

> **⚠️ 注意：** SafeKit 提供健康检查。您的网络或云服务提供商提供负载均衡器。

### 问题在于：负载均衡器拥有虚拟 IP 地址。 {#the-load-balancer-pitfall-virtual-ip-on-the-frontend-nat-to-the-physical-ip}

仅使用负载均衡器时，客户端连接到虚拟 IP 地址。负载均衡器会将虚拟 IP 地址（NAT）转换为主服务器的**物理 IP 地址**。客户端使用虚拟 IP 地址，但服务器使用其物理 IP 地址。服务器无法看到虚拟 IP 地址。

### 保持虚拟 IP 地址在主服务器上本地配置 {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

某些应用程序使用虚拟 IP 地址作为其服务器地址。只有当虚拟 IP 地址**也在主服务器本地配置**时，它们才能正常工作。然后：

  * 服务可以在虚拟 IP 地址上启动；
  * 服务器可以通过虚拟 IP 地址访问自身的服务；
  * 身份验证通过虚拟 IP 实现。

**最佳实践：** 使用负载均衡模式，将虚拟 IP 地址保留为目标地址（例如， Floating IP 或 Direct Server Return）。然后在主服务器上本地配置虚拟 IP 地址。具体方法取决于虚拟 IP 地址所在的子网：

  * **虚拟 IP 地址与服务器的物理 IP 地址位于同一子网：** 请保留 SafeKit 模块中的 `<vip>` 部分。SafeKit 会自动将虚拟 IP 地址配置为物理 IP 地址在网卡上的别名。
  * **虚拟 IP 地址位于不同的子网中：** 请勿在 SafeKit 中配置 `<vip>`。在应用程序启动之前，请使用 `start_prim` 脚本在专用接口（例如环回接口）上配置虚拟 IP 地址。在应用程序停止后，请使用 `stop_prim` 脚本移除虚拟 IP 地址。这些命令由集成商编写，并非 SafeKit 产品提供。


## 虚拟 IP 如何与云提供商 CLI 在不同子网中协同工作（mirror 集群） {#virtual-ip-cloud-cli-failover}

### 为什么免费 ARP 在云端不起作用 {#why-gratuitous-arp-does-not-work-in-public-clouds}

云网络（AWS、Azure、Google Cloud）**会忽略免费 ARP 协议**。它们只会将流量发送到云平台分配的 IP 地址。SafeKit 会在主服务器上配置虚拟 IP，但云网络不会将虚拟 IP 流量发送到该服务器。

### 使用云 CLI 迁移虚拟 IP {#moving-the-virtual-ip-through-the-cloud-api-in-safekit-failover-scripts}

如果没有负载均衡器，可以将云提供商的 CLI 集成到 SafeKit 的 **`start_prim` 脚本**中，以便在应用程序启动前更新云网络配置。CLI 可以将虚拟 IP 分配给即将成为主节点的节点，或者更新云路由，将虚拟 IP 流量定向到该节点。

**虚拟 IP 地址保留在主服务器本地**。**没有使用 NAT**，原始客户端 IP 地址也不会改变。

### 整合者责任 {#integrator-responsibility}

**集成商**必须将云端 CLI 命令添加到 `start_prim` 脚本中。这些命令**并非 SafeKit 产品自带**，而是取决于云服务提供商、网络设计以及客户的安全规则。

### 约束条件 {#constraints-of-the-cli-approach}

  * 两个节点上都必须安装云端命令行界面 (CLI)。每个节点都需要具有网络权限的云端身份。
  * 脚本必须能够处理错误和重试。
  * 故障转移的速度可能比使用负载均衡器慢。

## 虚拟 IP 如何通过 BGP（mirror 集群）在不同子网间工作 {#virtual-ip-bgp-failover}

### 使用 BGP 进行虚拟 IP 重定向 {#layer-3-virtual-ip-rerouting-with-bgp-route-advertisement}

使用边界网关协议 (BGP) 时，虚拟 IP 地址通常在应用程序启动之前，由 `start_prim` 脚本在主服务器的环回接口上配置。主服务器会将虚拟 IP 地址作为 /32 路由通告给路由器。

故障切换时，原主服务器上的 `stop_prim` 脚本会停止应用程序，从环回接口移除虚拟 IP 地址 (VIP)，并从路由器中撤回 /32 路由。如果原主服务器崩溃， `stop_prim` 不会运行，但路由器会断开 BGP 会话并自动移除该路由。

### 优势和先决条件 {#benefits-and-prerequisites}

  * **虚拟 IP 地址保持在本地，没有 NAT，客户端 IP 地址也不会改变。**
  * 它可跨子网和站点工作，无需使用扩展 VLAN。
  * 您需要 BGP 路由器以及网络团队的帮助。在云端，您需要云服务提供商提供的路由服务器服务。

> **⚠️ 注意：** BGP 集成使用 SafeKit 脚本和您的路由基础设施。**集成人员**必须在 `start_prim` 和 `stop_prim` 脚本中编写命令。这些脚本**并非由 SafeKit 产品提供**。请在生产环境部署前与您的网络团队验证该解决方案。

## DNS 重定向如何在不同子网间工作（mirror 集群） {#virtual-ip-vs-dns-redirection-failover}

### 使用 `start_prim` 脚本进行 DNS 重定向 {#dns-rerouting-with-the-start-prim-script}

使用 DNS 重定向时，**不存在单一的虚拟 IP 地址**。客户端连接到**虚拟名称**（即 DNS 名称）。发生故障转移时，新主服务器上的 `start_prim` 脚本会启动应用程序，然后将虚拟名称的 DNS 记录更改为新主服务器的**物理 IP 地址**。

`stop_prim` 脚本不起作用。如果旧的主服务器崩溃，新的主服务器会覆盖 DNS 记录。

### 示例：DNS 解析和被阻止的客户端 {#the-technical-scenario-dns-resolution-and-the-stuck-client}

![图示高可用性集群中 DNS 名称解析到物理 IP 地址 1 的过程](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 高可用性集群中物理 IP 1 上的 DNS 解析和客户端被阻止

#### 故障转移前：名称指向物理 IP 地址 1 {#current-state-resolution-to-physical-ip-1}

**客户端 1** 和**客户端 2** 向 DNS 系统查询虚拟名称的 IP 地址。DNS 系统返回**物理 IP 地址 1。** 然后，客户端与该地址建立网络连接。

#### 故障转移后：名称指向物理 IP 地址 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

服务器 1 发生故障。服务器 2 上的 `start_prim` 脚本将 DNS 记录更改为**物理 IP 地址 2。** 客户端只有在满足以下所有条件时才会连接到物理 IP 地址 2：

  * 客户端与 DNS 记录之间所有 DNS 服务器上的 **TTL（生存时间）** 均已过期。
  * 客户端 1 和客户端 2 的本地 DNS 缓存为空。
  * 应用程序关闭连接并*重新*进行 DNS 查询。

如果其中一个条件不成立，**客户端 1 和客户端 2 将继续被物理 IP 地址 1 阻止**。即使 DNS 记录正确，服务也会中断。

### 限制和前提条件 {#the-two-black-boxes-of-dns-redirection}

  * **DNS 缓存：** 许多互联网服务提供商和公司 DNS 服务器会忽略较短的 TTL 值。它们可能会将旧的物理 IP 地址保留几分钟甚至几小时。
  * **应用程序行为：** 许多应用程序（例如 Java 服务或 Web 浏览器）仅在启动时执行一次 DNS 查询。它们会一直使用第一个 IP 地址。
  * **每次故障转移时，IP 地址都会发生变化：** 应用程序没有保持不变的本地虚拟 IP 地址。注册了自身 IP 地址的应用程序可能无法正常工作。
  * **前提条件：** DNS 记录的 TTL 值较短（例如 30 到 60 秒），并且两个服务器都有权更新 DNS 区域。

> **⚠️ 注意：** **集成商**必须在 `start_prim` 脚本中编写 DNS 更新命令。这些命令**并非由 SafeKit 产品提供**，而是取决于 DNS 服务器（Windows DNS、BIND 或云 DNS）。

### 结论 {#conclusion}

DNS 重定向并非可靠的高可用性解决方案。仅当所有客户端在重新连接时都进行新的 DNS 查询时才应使用。要实现即时透明的故障转移，请使用**虚拟 IP**：在扩展局域网中，通过负载均衡器、云提供商的 CLI 或 BGP 协议。

## 同一子网上的 <span class="notranslate farm-term" translate="no">farm</span> 集群中虚拟 IP 负载均衡的工作原理 {#virtual-ip-load-balancing-same-subnet}

- [在 SafeKit farm 中测试负载均衡虚拟 IP 地址](/zh-hans/best-practises/test-load-balancing-vip-farm/)

### 内核负载均衡，具有冗余性 {#scalable-performance-kernel-level-load-balancing--redundancy}

当流量高峰期，SafeKit 可以将工作负载分配给多个运行中的服务器。即使一个服务器发生故障，其他服务器也能继续工作。

### <span class="notranslate farm-term" translate="no">Farm</span> 集群架构：在 Windows 或 Linux 节点之间进行负载均衡 {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


![同一子网内负载均衡虚拟 IP 的示意图](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

在**负载均衡 <span class="notranslate farm-term" translate="no">farm</span>** 中，客户端连接到虚拟 IP 地址，请求同时在多个服务器之间共享。本示例展示了两个节点。您可以向集群添加更多节点。在同一子网内，集群中**每台服务器**的网卡都配置了 IP 别名，用于指定虚拟 IP 地址。

#### 流量共享：内核过滤器 {#traffic-distribution-the-kernel-level-filter}

在 <span class="notranslate farm-term" translate="no">farm</span> 集群中，**内核中的 SafeKit 过滤器**会共享流量。其工作原理如下：

  * **ARP 映射：** 在客户端的 ARP 缓存中，虚拟 IP 与一个 MAC 地址关联（例如，服务器 1 的 `mac1`）。
  * **数据包分析：** 服务器 1 接收数据包。SafeKit 内核过滤器读取每个数据包的**客户端 IP 地址**或 **TCP 端口**。
  * **负载均衡：** 过滤器决定哪些数据包由服务器 1 处理，哪些数据包发送到其他节点（例如服务器 2）。要将数据包发送到另一个节点，过滤器会将数据包的**目标 MAC 地址**替换为目标节点的 MAC 地址。目标 IP 地址保持不变，仍为虚拟 IP 地址。服务器之间共享工作负载。


#### 利用免费 ARP 进行故障转移和重新路由 {#failover-and-rerouting-with-gratuitous-arp}

如果服务器 1 发生故障，SafeKit 会发送一条**免费 ARP (GARP)** 消息。客户端会使用服务器 2 的 `mac2` 更新其 ARP 缓存。然后，客户端会立即被重定向到 farm 中的其他节点。

#### 远程站点部署 {#deployment-in-remote-sites}

如果**远程数据中心**之间通过**扩展的局域网 (LAN) 或虚拟局域网 (VLAN)** 连接，则此负载均衡方案也适用于远程数据中心。此时，所有站点都位于同一子网中。对于跨多个站点的 <span class="notranslate farm-term" translate="no">farm</span> 而言，这是最有效的配置。

{{%  insert-safekit-farm-video-zh-hans  %}}

## 负载均衡虚拟 IP 如何在不同子网（<span class="notranslate farm-term" translate="no">farm</span> 集群）中工作 {#virtual-ip-load-balancing-different-subnets}

### 跨云子网的流量 {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

<span class="notranslate farm-term" translate="no">farm</span> 集群可以在多个可用区和子网之间共享应用程序工作。

### 跨子网 <span class="notranslate farm-term" translate="no">farm</span> 集群：多个 Windows 或 Linux 节点 {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


![跨两个不同子网运行的负载均衡 farm 集群示意图](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

当 <span class="notranslate farm-term" translate="no">farm</span> 节点位于**不同的子网**中（例如，位于多个云可用区）时，**虚拟 IP 地址**位于外部**负载均衡器 (LB)** 上。负载均衡器将流量发送到每个子网中服务器的物理 IP 地址。

#### 流量路由和负载均衡规则 {#intelligent-traffic-routing--load-balancing-rules}

负载均衡器根据以下两个标准分配客户端请求：

  * **负载均衡规则：** 例如，**客户端 IP 地址**或**客户端 TCP 端口**。
  * **节点可用性：** 负载均衡器仅根据 SafeKit 健康检查结果，将流量发送到健康的节点。


> **⚠️ 注意：** SafeKit 提供健康检查。您的网络或云服务提供商提供负载均衡器。

#### SafeKit 健康检查 {#safekit-health-check-mechanism}

SafeKit 为服务器 <span class="notranslate farm-term" translate="no">farm</span> 中的每台服务器提供一个**健康检查 URL**。负载均衡器会读取该 URL 以了解每台服务器的状态：

  * **节点已启动：** 健康检查返回 `HTTP 200 OK`。。负载均衡器将流量发送到此服务器。
  * **节点宕机：** 如果服务器或应用程序发生故障，SafeKit 将返回 `HTTP 404 NOT FOUND` （或服务器无响应）。负载均衡器将立即停止向该节点发送流量。


#### 云部署：AWS、Azure 和 GCP {#cloud-deployment-standards-aws-azure-and-gcp}

这是**云端 <span class="notranslate farm-term" translate="no">farm</span> 集群**的标准架构。如果某个子网或区域停止运行，其他节点仍会继续处理流量。该架构在[**亚马逊 AWS**](</zh-hans/solutions/aws-load-balancing-cluster-failover/>) （AWS Network Load Balancer）、[**微软 Azure**](</zh-hans/solutions/azure-load-balancing-cluster-failover/>) （Azure Load Balancer）和[**谷歌云平台 (GCP)**](</zh-hans/solutions/gcp-load-balancing-cluster-failover/>) （Google Cloud Load Balancing）上均受支持。


## 比较：虚拟 IP 实现、延迟和应用透明度 {#virtual-ip-methods-comparison}

**比较虚拟 IP 重定向方法和 DNS 重定向方法在高可用性和灾难恢复中的应用。**

环境和用例 | 高可用性类型 | 重定向方法 | 由……实施 | 网络延迟 | 应用程序透明度和本地 IP  
---|---|---|---|---|---  
主备（高可用性） | Mirror 集群 | 无偿 ARP/MAC 接管 | ✅ SafeKit 产品 | 极短：检测到故障并发送 GARP 所需的时间。 | 完全透明：虚拟 IP 地址位于活动节点本地。客户端 IP 地址不会改变。  
负载均衡（主/主） | <span class="notranslate farm-term" translate="no">Farm</span> 集群 | 内核网络过滤器/GARP | ✅ SafeKit 产品 | 极短：检测到故障并更换网络过滤器所需的时间。 | 完全透明：虚拟 IP 在所有节点上都是本地的。客户端 IP 不会改变。  
同一子网/扩展局域网（延伸 VLAN） | 灾难恢复（远程数据中心） | IP 别名/GARP | ✅ SafeKit 产品（扩展 VLAN 由网络团队提供） | 低：取决于扩展 VLAN 的往返时间 (RTT)。 | 完全透明：虚拟 IP 地址位于节点本地。客户端 IP 地址不会改变。  
不同的子网：仅负载均衡器 | 灾难恢复（远程数据中心/云） | 外部负载均衡器 | 🛠️ 集成商：负载均衡器配置（SafeKit 提供健康检查） | 中等：取决于负载均衡器的健康检查间隔 | ⚠️ 如果使用 SNAT/DNAT，则存在部分透明性。虚拟 IP 地址**并非**节点本地 IP 地址。客户端 IP 地址可能**无法**保留。应用程序必须支持此功能。  
不同的子网：负载均衡器 + 本地 SafeKit 虚拟 IP | 灾难恢复（远程数据中心/云） | 带 Floating IP 外部负载均衡器/ Direct Server Return | 🛠️ 集成商：负载均衡器配置（SafeKit 提供健康检查） | 中等：取决于负载均衡器的健康检查间隔 | 良好的透明度：虚拟 IP 地址位于主节点本地，并且是目标地址。
不同子网：云 CLI | 灾难恢复（云） | 云 API：私有 IP 或云路由迁移到新的主 IP 地址 | 🛠️ 集成器： `start_prim` 脚本中的云 CLI 命令 | 中等到高：取决于云 API 的响应时间 | 完全透明：虚拟 IP 地址位于主节点本地。客户端 IP 地址不会改变。
不同的子网：BGP | 灾难恢复（远程数据中心/云） | /32 路由通过 BGP 通告 | 🛠️ 集成器： `start_prim` 和 `stop_prim` 脚本中的 BGP 命令 | 低到中等：取决于 BGP 收敛时间 | 完全透明：虚拟 IP 地址位于主节点本地。客户端 IP 地址不会改变。需要 BGP 路由器。  
DNS 重定向：无虚拟 IP | 灾难恢复（远程数据中心） | DNS 记录更改（名称/物理 IP） | 🛠️ 集成器： `start_prim` 脚本中的 DNS 更新命令 | 高且不可预测：取决于 DNS 生存时间 (TTL) 和客户端 DNS 缓存 | ⚠️ 不可靠：客户端必须重新进行 DNS 查询。通常情况下，客户端会保留启动时获得的旧 IP 地址，并且在故障转移后不会重新路由。  
  
## 关于虚拟 IP 的常见问题 {#virtual-ip-faq}

### 虚拟 IP 和网络 {#virtual-ip--networking}

什么是虚拟 IP 地址？它与物理 IP 地址有何不同？

**物理 IP 地址**与单个网卡绑定。**虚拟 IP** 地址不与硬件绑定。在 SafeKit 集群中，客户端始终使用虚拟 IP 地址。如果主服务器发生故障，虚拟 IP 地址会自动切换到运行正常的节点。您无需更改客户端配置。

使用虚拟 IP 需要硬件负载均衡器吗？

不。**SafeKit** 通过软件管理虚拟 IP。在同一子网内，它使用 **IP 别名**和**免费 ARP (GARP)** 来重定向流量。您无需外部负载均衡器或代理服务器。

什么是无偿 ARP（GARP）？它为何被使用？

**免费 ARP（GARP）** 是一种发送到所有设备的网络消息。它会更新交换机和路由器的 ARP 表。发生故障切换时，新的主服务器会发送一条 GARP 消息。该消息表明**虚拟 IP 地址**现在已与新主服务器的 MAC 地址关联。随后，流量会立即重新路由。

我可以将 DNS 名称与虚拟 IP 关联起来吗？

**是的。** 为虚拟 IP 创建一条标准 A 记录。重定向是在**虚拟 IP 层**（通过 ARP 或网络重定向）完成的，**而不是在 DNS 层**。这样就不会出现 DNS 延迟或 TTL 问题，而且故障转移**对应用程序来说是透明的**。

### 云和高级架构 {#cloud--advanced-architectures}

虚拟 IP 在云端（AWS、Azure、GCP）中是如何工作的？

在云端，二层 GARP 消息无法用于重新路由虚拟 IP。SafeKit 可与**云负载均衡器**（AWS ELB、Azure LB 或 Google GCLB）配合使用。SafeKit 提供一个**健康检查 URL**。负载均衡器读取该 URL 并将流量发送到活动节点。

对于灾难恢复而言，扩展局域网是否比负载均衡器更好？

**是的**。在远程数据中心之间，**扩展局域网（扩展 VLAN）** 通常更佳，因为故障切换**对应用程序来说是透明的**。**虚拟 IP 地址不会改变**，因此在数据中心之间发生故障切换后，应用程序及其客户端将继续使用相同的地址。

与虚拟 IP 相比，DNS 重定向有哪些局限性？

**DNS 重定向**取决于 **TTL（生存时间）** 和客户端 DNS 缓存。恢复可能需要数小时。此外，**未进行新的 DNS 查询的客户端将一直被阻塞**在故障服务器上。**虚拟 IP 地址**会立即通过二层 GARP 消息进行重新路由。客户端 DNS 缓存不起作用。

### 透明度和安全性 {#transparency--security}

为什么本地虚拟 IP 对应用程序透明性很重要？

使用本地**虚拟 IP** 时，应用程序使用的地址不会改变。SafeKit 在**内核**中执行重定向。应用程序不会感知到故障转移。而使用 DNAT 时，应用程序使用的地址会发生变化。

虚拟 IP 地址是否会保留原客户端 IP 地址？

是的。SafeKit 不使用源地址转换 (SNAT)。虚拟 IP 地址位于活动服务器的本地，因此应用程序会收到**原始客户端 IP 地址**。这对于安全审计、会话持久性和监管日志至关重要。


{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}
