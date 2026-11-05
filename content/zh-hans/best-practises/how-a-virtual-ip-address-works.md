---
title: "虚拟 IP 地址在高可用性集群中是如何工作的？"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/how-a-virtual-ip-address-works/"
description: "SafeKit 如何在故障转移时移动虚拟 IP：同一子网中的免费 ARP、负载均衡器、云 CLI 或跨子网的 BGP。为什么本地虚拟 IP 很重要。"
category: "best-practises"
lang: "zh-hans"
topics: "高可用性集群中的虚拟 IP 地址是什么？, SafeKit 中的虚拟 IP 实现, 虚拟 IP 在同一子网中如何工作（mirror 集群）, 虚拟 IP 在不同子网中如何通过负载均衡器工作（mirror 集群）, 虚拟 IP 在不同子网中如何通过云提供商 CLI 工作（mirror 集群）, 虚拟 IP 在不同子网中如何通过 BGP 工作（mirror 集群）, DNS 重定向在不同子网中如何工作（mirror 集群）, 虚拟 IP 负载均衡在同一子网 farm 集群中如何工作, 负载均衡的虚拟 IP 在不同子网中如何工作（farm 集群）, 比较：虚拟 IP 实现、延迟和应用程序透明度, 关于虚拟 IP 的常见问题, 🔍 探索 SafeKit"
translation: "translate_md 2026-11-05.5 | glossaire 2026-11-05.10 | Translation LLM | 18 expressions"
---

# 虚拟 IP 地址在高可用性集群中是如何工作的？ {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## 高可用性集群中的虚拟 IP 地址是什么？ {#virtual-ip-definition}

**虚拟 IP 地址**是客户端用于连接[高可用性集群](</zh-hans/>)中应用程序的单个地址。虚拟 IP 不与某个服务器相关联。在故障转移时，它会移动到运行应用程序的服务器。客户端无需更改其配置。

**SafeKit 的关键原则：** 虚拟 IP 在运行应用程序的**服务器上本地配置**。应用程序在虚拟 IP 上启动，并接收原始客户端 IP。这就是为什么许多应用程序无需任何更改即可与 SafeKit 正确配合使用。SafeKit 提供两种类型的虚拟 IP：

  * **主/备虚拟 IP 与 mirror 集群：** 虚拟 IP 仅在主服务器上处于活动状态。故障转移时，它会移动到辅助服务器。
  * **网络负载均衡虚拟 IP 与 <span class="notranslate farm-term" translate="no">farm</span> 集群：** 虚拟 IP 同时在所有服务器上处于活动状态。流量在它们之间共享。

## SafeKit 中的虚拟 IP 实现 {#safekit-virtual-ip-implementation}

本文将介绍 SafeKit 在每种网络架构中移动虚拟 IP 的方式：

  * **同一子网或扩展 VLAN（[mirror](#virtual-ip-same-subnet-failover)和[<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-same-subnet)集群）：** SafeKit 在服务器上配置虚拟 IP 并发送**免费 ARP (GARP)**。无需外部硬件。这是最透明的解决方案（一切都由 SafeKit 产品实现）。
  * **具有负载均衡器的不同子网（[mirror](#virtual-ip-different-subnets-failover)和[<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-different-subnets)集群）：** 负载均衡器使用 SafeKit **健康检查**将流量发送到正确的服务器（负载均衡器由集成商配置）。
  * **[使用云提供商 CLI 的不同子网](#virtual-ip-cloud-cli-failover)（mirror 集群）：** SafeKit `start_prim` 脚本调用云 CLI 来移动虚拟 IP（由集成商编写的脚本）。
  * **[具有 BGP 的不同子网](#virtual-ip-bgp-failover)（mirror 集群）：** 主服务器将虚拟 IP 通告给路由器（由集成商编写的脚本）。
  * **[具有 DNS 重定向的不同子网](#virtual-ip-vs-dns-redirection-failover)（mirror 集群）：** SafeKit `start_prim` 脚本将虚拟名称的 DNS 记录更改为新主服务器的物理 IP（由集成商编写的脚本）。没有单个虚拟 IP，并且此方法对于所有客户端都不可靠。

本文还包括：

  * [比较：虚拟 IP 的实现、延迟和应用程序透明度](#virtual-ip-methods-comparison)
  * [虚拟 IP 常见问题](#virtual-ip-faq)
  * [🔍 探索 SafeKit](#hub)

![Eviden SafeKit 中虚拟 IP 行为的比较图：mirror 集群显示活动节点上的浮动 IP，而 farm 集群显示所有节点上的网络负载均衡。](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**在 SafeKit 中为 mirror 和 <span class="notranslate farm-term" translate="no">farm</span> 集群实现虚拟 IP。**

## 虚拟 IP 在同一子网中如何工作（mirror 集群） {#virtual-ip-same-subnet-failover}

- [在 SafeKit mirror 集群中测试主/备虚拟 IP](/zh-hans/best-practises/test-primary-backup-vip-mirror/)

### 本地子网中的自动故障转移和网络重新路由 {#automated-failover--network-rerouting-in-a-local-subnet}

在本地网络中，**SafeKit** 会自动管理虚拟 IP 和应用程序故障转移。

### 本地 mirror 集群：Windows 或 Linux 上的 2 节点故障转移 {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![SafeKit 在同一子网的两台服务器之间实现虚拟 IP 故障转移机制](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

在 **SafeKit mirror 集群**中，两个节点位于同一子网中。高可用性使用**虚拟 IP。SafeKit** 在操作系统的网络堆栈中管理虚拟 IP。无需特殊的硬件。虚拟 IP 通过 **IP 别名**添加到服务器 1 和服务器 2 的物理 IP 地址中。客户端始终连接到虚拟 IP。

#### SafeKit 中的 IP 别名和多个虚拟 IP {#safekits-advanced-ip-aliasing--multiple-virtual-ip-support}

虚拟 IP 是在节点之间移动的第三个 IP 地址。SafeKit 可以在一个集群中管理**多个虚拟 IP**。您可以将它们放在同一网卡或不同的网卡上。这样，每个服务都可以使用自己的虚拟 IP。

#### 故障转移机制：免费 ARP (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

故障转移不需要任何手动操作。在正常操作中，虚拟 IP 链接到**服务器 1 的 MAC 地址 (mac1)**。如果服务器 1 发生故障，SafeKit 会执行以下三项操作：

  * **虚拟 IP 别名：** SafeKit 将虚拟 IP 配置为新主服务器 Server 2 的网卡上的别名。然后，操作系统会在网络上发送消息以宣告虚拟 IP。
  * **GARP：** SafeKit 还发送**免费 ARP (GARP)** 消息。网络交换机和客户端会更新其 ARP 缓存。虚拟 IP 现在链接到**服务器 2 的 MAC 地址 (mac2)**。
  * **应用程序恢复：** SafeKit 会在服务器 2 上重新启动应用程序服务。


#### 远程数据中心和扩展 VLAN {#remote-data-centers--extended-vlans}

**上述同一子网解决方案**也适用于远程站点之间的**灾难恢复**。当站点通过**扩展 VLAN**（扩展局域网）连接时，这通常是最佳选择。两个站点都在一个子网中。网络更简单，您不需要复杂的路由协议。

> **⚠️ 注意：** 使用免费 ARP 在第 2 层重新路由是应用程序**最透明的解决方案**。应用程序接收原始客户端 IP，虚拟 IP 在本地配置。许多应用程序**需要本地虚拟 IP**。如果没有它，这些应用程序**可能无法正常工作**。在此同一子网设置中，SafeKit 实现了整个机制，因此无需特殊的集成工作。

## 虚拟 IP 如何通过负载均衡器（mirror 集群）在不同子网之间工作 {#virtual-ip-different-subnets-failover}

### 带 SafeKit 健康检查的负载均衡器 {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![使用负载均衡器跨两个不同子网进行虚拟 IP 故障转移的示意图](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

当节点位于**不同的子网**中时，免费 ARP 无法移动虚拟 IP。在这种情况下，虚拟 IP 位于**负载均衡器**上。负载均衡器将流量发送到主服务器。

SafeKit 在每个节点上提供一个**健康检查URL**：

  * **主节点 (PRIM)：** 返回 `HTTP 200 OK`。负载均衡器将流量发送到此节点。
  * **备节点 (SECOND)：** 返回 `HTTP 404 NOT FOUND`。负载均衡器不会向此节点发送流量。

在故障转移时，SafeKit 会更改响应，负载均衡器会将流量发送到新的主服务器。这是[**AWS**](</zh-hans/solutions/aws-high-availability-cluster-synchronous-replication-failover/>)、[**Azure**](</zh-hans/solutions/azure-high-availability-cluster-synchronous-replication-failover/>)和[**Google Cloud**](</zh-hans/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>)上**可用区**之间的标准解决方案。

> **⚠️ 注意：** SafeKit 提供健康检查。您的网络或云提供商提供负载均衡器。

### 问题：负载均衡器拥有虚拟 IP。 {#the-load-balancer-pitfall-virtual-ip-on-the-frontend-nat-to-the-physical-ip}

仅使用负载均衡器时，客户端连接到虚拟 IP。负载均衡器将虚拟 IP（NAT）转换为主服务器的**物理 IP**。客户端使用虚拟 IP，但服务器使用其物理 IP。服务器看不到虚拟 IP。

### 将虚拟 IP 配置保留在主服务器的本地。 {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

某些应用程序使用虚拟 IP 作为其服务器地址。只有**在主服务器上本地配置**虚拟 IP 时，它们才能正常工作。然后：

  * 服务可以在虚拟 IP 上启动；
  * 服务器可以使用虚拟 IP 访问其自身的服务；
  * 身份验证与虚拟 IP 配合使用。

**最佳实践：** 使用将虚拟 IP 作为目标地址的负载均衡器模式（例如，Floating IP 或 Direct Server Return）。然后在主服务器上本地配置虚拟 IP。该方法取决于虚拟 IP 的子网：

  * **虚拟 IP 与服务器的物理 IP 地址位于同一子网中：** 在 SafeKit 模块中保留 `<vip>` 部分。SafeKit 会自动将虚拟 IP 配置为物理 IP 地址网卡上的别名。
  * **虚拟 IP 位于不同的子网中：** 请勿在 SafeKit 中配置 `<vip>`。使用 `start_prim` 脚本在应用程序启动前，在专用接口（如回环）上配置虚拟 IP。使用 `stop_prim` 脚本在应用程序停止后删除虚拟 IP。集成商编写这些命令。SafeKit 产品不提供这些命令。


## 虚拟 IP 如何通过云提供商 CLI 在不同子网之间工作（mirror 集群） {#virtual-ip-cloud-cli-failover}

### 为什么免费 ARP 在云端不起作用 {#why-gratuitous-arp-does-not-work-in-public-clouds}

云网络（AWS、Azure、Google Cloud）**会忽略免费 ARP**。它们仅将流量发送到云平台中分配的 IP 地址。SafeKit 在主服务器上配置虚拟 IP，但云网络不会将虚拟 IP 流量发送到此服务器。

### 使用云 CLI 移动虚拟 IP {#moving-the-virtual-ip-through-the-cloud-api-in-safekit-failover-scripts}

如果没有负载均衡器，云提供商 CLI 可以集成到 SafeKit **`start_prim` 脚本**中，以便在应用程序启动之前更新云网络配置。CLI 可以将虚拟 IP 分配给成为主节点的节点，或更新云路由以将虚拟 IP 流量引导至该节点。

**虚拟 IP 保持在主服务器上的本地**。**没有 NAT**，原始客户端 IP 不会改变。

### 集成商责任 {#integrator-responsibility}

**集成商**必须将云 CLI 命令添加到 `start_prim` 脚本中。这些命令**不是由 SafeKit 产品提供的**。它们取决于云提供商、网络设计和客户的安全规则。

### 约束条件 {#constraints-of-the-cli-approach}

  * 云 CLI 必须安装在两个节点上。每个节点都需要一个具有网络权限的云身份。
  * 脚本必须管理错误和重试。
  * 故障转移可能比使用负载均衡器时慢。

## BGP 如何在不同子网之间实现虚拟 IP（mirror 集群） {#virtual-ip-bgp-failover}

### 使用 BGP 进行虚拟 IP 重路由 {#layer-3-virtual-ip-rerouting-with-bgp-route-advertisement}

使用 BGP（边界网关协议）时，虚拟 IP 通常在应用程序启动之前由 `start_prim` 脚本配置在主服务器的环回接口上。主服务器将虚拟 IP 作为 /32 路由通告给路由器。

在故障转移时，旧主服务器上的 `stop_prim` 脚本会停止应用程序，从回环接口中删除虚拟 IP，并从路由器中撤回 /32 路由。如果旧主服务器崩溃，`stop_prim` 不会运行，但路由器会丢失 BGP 会话并自动删除路由。

### 优势与先决条件 {#benefits-and-prerequisites}

  * **虚拟 IP 保持本地，没有 NAT，客户端 IP 不会改变。**
  * 它可以在子网和站点之间工作。您不需要扩展 VLAN。
  * 您需要 BGP 路由器，并获得网络团队的帮助。在云中，您需要云提供商提供的路由服务器服务。

> **⚠️ 注意：** BGP 集成使用 SafeKit 脚本和您的路由基础设施。**集成商**必须在 `start_prim` 和 `stop_prim` 脚本中编写命令。这些脚本**不是由 SafeKit 产品提供的**。在生产之前，请与您的网络团队一起验证解决方案。

## DNS 重定向如何在不同子网（mirror 集群）之间工作 {#virtual-ip-vs-dns-redirection-failover}

### 使用 `start_prim` 脚本进行 DNS 重路由 {#dns-rerouting-with-the-start-prim-script}

使用 DNS 重定向时，**没有单个虚拟 IP**。客户端连接到**虚拟名称**（DNS 名称）。在故障转移时，新主服务器上的 `start_prim` 脚本启动应用程序，然后将虚拟名称的 DNS 记录更改为新主服务器的**物理 IP**。

`stop_prim` 脚本无需执行任何操作。如果旧主服务器崩溃，新主服务器将覆盖 DNS 记录。

### 示例：DNS 解析和保留旧 IP 的客户端 {#the-technical-scenario-dns-resolution-and-the-stuck-client}

![显示高可用性集群中 DNS 名称解析到物理 IP 1 的图表](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 DNS 解析：客户端仍连接到高可用性集群中的物理 IP 1

#### 故障转移前：名称指向物理 IP 1 {#current-state-resolution-to-physical-ip-1}

**客户端 1** 和**客户端 2** 向 DNS 系统请求虚拟名称的 IP 地址。DNS 系统返回**物理 IP 1。** 然后，客户端打开与该地址的网络连接。

#### 故障转移后：名称指向物理 IP 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

服务器 1 出现故障。服务器 2 上的 `start_prim` 脚本将 DNS 记录更改为**物理 IP 2。** 仅当所有这些条件都为真时，客户端才会连接到物理 IP 2：

  * 客户端和 DNS 记录之间的所有 DNS 服务器上的 **TTL（生存时间）** 都已过期。
  * 客户端 1 和客户端 2 的本地 DNS 缓存为空。
  * 应用程序关闭其连接并执行*新的*DNS 查询。

如果其中一个条件为假，**客户端 1 和客户端 2** 将继续使用物理 IP 1。即使 DNS 记录正确，服务也会中断。

### 限制和先决条件 {#the-two-black-boxes-of-dns-redirection}

  * **DNS 缓存：** 许多互联网服务提供商和公司 DNS 服务器会忽略短 TTL 值。它们可以保留旧的物理 IP 1 数分钟或数小时。
  * **应用程序行为：** 许多应用程序（例如 Java 服务或 Web 浏览器）仅在启动时执行一次 DNS 查询。它们会一直使用第一个 IP 地址。
  * **每次故障转移时，IP 地址都会更改：** 应用程序没有保持不变的本地虚拟 IP。注册自己 IP 地址的应用程序可能无法正常工作。
  * **先决条件：** DNS 记录上的 TTL 时间较短（例如，30 到 60 秒），以及从两台服务器更新 DNS 区域的权限。

> **⚠️ 注意：** **集成商**必须在 `start_prim` 脚本中编写 DNS 更新命令。这些命令**不是由 SafeKit 产品提供的**。它们取决于 DNS 服务器（Windows DNS、BIND 或云 DNS）。

### 结论 {#conclusion}

DNS 重定向不是一个可靠的高可用性解决方案。仅当所有客户端在重新连接时执行新的 DNS 查询时，才使用它。对于即时和透明的故障转移，请使用**虚拟 IP**：使用扩展 VLAN、负载均衡器、云提供商 CLI 或 BGP。

## 同一子网中的虚拟 IP 负载均衡器如何在 <span class="notranslate farm-term" translate="no">farm</span> 集群中工作 {#virtual-ip-load-balancing-same-subnet}

- [在 SafeKit farm 集群中测试负载均衡虚拟 IP](/zh-hans/best-practises/test-load-balancing-vip-farm/)

### 内核级负载均衡和冗余 {#scalable-performance-kernel-level-load-balancing--redundancy}

当流量很大时，SafeKit 可以在多个活动服务器之间分担工作。如果一台服务器出现故障，其他服务器将继续工作。

### <span class="notranslate farm-term" translate="no">Farm</span> 集群架构：在 Windows 或 Linux 节点之间进行负载均衡 {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


![同一子网内负载均衡虚拟 IP 的示意图](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

在**负载均衡 <span class="notranslate farm-term" translate="no">farm</span> 集群**中，客户端连接到虚拟 IP，请求同时在多个服务器之间共享。此示例显示了两个节点。您可以向集群添加更多节点。在同一子网中，虚拟 IP 在集群中**每个服务器**的网络卡上配置为 IP 别名。

#### 流量共享：内核过滤器 {#traffic-distribution-the-kernel-level-filter}

在 <span class="notranslate farm-term" translate="no">farm</span> 集群中，**内核中的 SafeKit 过滤器**会共享流量。其工作原理如下：

  * **ARP 映射：** 在客户端的 ARP 缓存中，虚拟 IP 链接到一个 MAC 地址（例如，服务器 1 的 `mac1`）。
  * **数据包分析：** 服务器 1 接收数据包。SafeKit 内核过滤器读取每个数据包的**客户端 IP** 或 **TCP 端口**。
  * **负载共享：** 过滤器决定服务器 1 处理哪些数据包，以及哪些数据包发送到其他节点（例如，服务器 2）。要将数据包发送到另一个节点，过滤器会使用该节点的 MAC **地址重写数据包的目的 MAC** 地址。目标 IP 地址保持为虚拟 IP。工作在服务器之间共享。


#### 使用免费 ARP 进行故障转移和重新路由 {#failover-and-rerouting-with-gratuitous-arp}

如果服务器 1 出现故障，SafeKit 会发送一个**免费 ARP (GARP)** 消息。客户端使用服务器 2 的 `mac2` 更新其 ARP 缓存。然后，客户端会立即发送到 farm 的其他节点。

#### 远程站点部署 {#deployment-in-remote-sites}

如果站点通过**扩展 VLAN** 连接，则此负载平衡解决方案也适用于**远程数据中心**。所有站点都位于同一子网中。这是在多个站点上进行 <span class="notranslate farm-term" translate="no">farm</span> 集群的最有效配置。

{{%  insert-safekit-farm-video-zh-hans  %}}

## 负载均衡虚拟 IP 如何在不同子网（<span class="notranslate farm-term" translate="no">farm</span> 集群）之间工作 {#virtual-ip-load-balancing-different-subnets}

### 跨云子网的流量 {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

一个 <span class="notranslate farm-term" translate="no">farm</span> 集群可以在多个可用区和子网之间共享应用程序工作。

### 跨子网 <span class="notranslate farm-term" translate="no">farm</span> 集群：多个 Windows 或 Linux 节点 {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


![跨两个不同子网运行的负载均衡 farm 集群的示意图](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

当 <span class="notranslate farm-term" translate="no">farm</span> 节点位于**不同的子网**中（例如，位于多个云可用区中）时，**虚拟 IP** 位于外部**负载均衡器**上。负载均衡器将流量发送到每个子网中服务器的物理 IP 地址。

#### 流量路由和负载均衡规则 {#intelligent-traffic-routing--load-balancing-rules}

负载均衡器根据两个标准共享客户端请求：

  * **负载均衡规则：** 例如，**客户端 IP 地址**或**客户端 TCP 端口**。
  * **节点可用性：** 负载均衡器仅将流量发送到健康的节点，具体取决于 SafeKit健康检查。


> **⚠️ 注意：** SafeKit 提供健康检查。您的网络或云提供商提供负载均衡器。

#### SafeKit健康检查 {#safekit-health-check-mechanism}

SafeKit 在 <span class="notranslate farm-term" translate="no">farm</span> 的每台服务器上提供一个**健康检查URL**。负载均衡器读取该 URL 以了解每台服务器的状态：

  * **节点正常：** 健康检查返回 `HTTP 200 OK`。负载均衡器将流量发送到此服务器。
  * **节点 DOWN：** 如果服务器或应用程序出现故障，SafeKit 将返回 `HTTP 404 NOT FOUND`（或服务器不响应）。负载均衡器会立即停止向该节点发送流量。


#### 云部署：AWS、Azure 和 GCP {#cloud-deployment-standards-aws-azure-and-gcp}

这是**云中 <span class="notranslate farm-term" translate="no">farm</span> 集群**的标准架构。如果子网或区域停止，其他节点将继续处理流量。它支持[**Amazon AWS**](</zh-hans/solutions/aws-load-balancing-cluster-failover/>)（AWS Network Load Balancer）、[**Microsoft Azure**](</zh-hans/solutions/azure-load-balancing-cluster-failover/>)（Azure Load Balancer）和[**Google Cloud（GCP）**](</zh-hans/solutions/gcp-load-balancing-cluster-failover/>)（Google Cloud Load Balancing）。


## 比较：虚拟 IP 的实现、延迟和应用程序透明度 {#virtual-ip-methods-comparison}

**比较虚拟 IP 重定向方法和 DNS 重定向方法在实现高可用性和灾难恢复方面的优缺点。**

环境和用例 | 高可用性类型 | 重定向方法 | 实施者 | 网络延迟 | 应用程序透明度和本地 IP  
---|---|---|---|---|---  
主/备（高可用性） | Mirror 集群 | 免费 ARP（MAC 地址接管） | ✅ SafeKit 产品 | 非常低：检测故障并发送 GARP 时间 | 完全透明：虚拟 IP 位于活动节点上。客户端 IP 不会改变。  
负载均衡（双活） | <span class="notranslate farm-term" translate="no">Farm</span> 集群 | 内核网络过滤器/GARP | ✅ SafeKit 产品 | 非常低：检测故障和更换网络过滤器所需的时间 | 完全透明：虚拟 IP 在所有节点上都是本地的。客户端 IP 不会改变。  
同一子网/扩展 VLAN | 灾难恢复（远程数据中心） | IP 别名/GARP | ✅ SafeKit 产品（扩展 VLAN 由网络团队提供） | 低：取决于扩展 VLAN 的往返时间 (RTT) | 完全透明：虚拟 IP 位于节点本地。客户端 IP 不会改变。  
不同的子网：仅限负载均衡器 | 灾难恢复（远程数据中心/云） | 外部负载均衡器 | 🛠️集成商：负载均衡器配置（SafeKit 提供健康检查） | 时间：取决于负载均衡器的健康检查间隔。 | ⚠️ 如果使用 SNAT/DNAT，则部分透明。虚拟 IP **不在**节点上本地。客户端 IP 可能**不会**保留。应用程序必须支持此功能。  
不同子网：负载均衡器 + 本地 SafeKit 虚拟 IP | 灾难恢复（远程数据中心/云） | 具有 Floating IP / Direct Server Return 外部负载均衡器 | 🛠️集成商：负载均衡器配置（SafeKit 提供健康检查） | 时间：取决于负载均衡器的健康检查间隔。 | 良好的透明性：虚拟 IP 位于主节点上，是目标地址。
不同的子网：云 CLI | 灾难恢复（云） | 云 API：私有 IP 或云路由将移动到新的主节点。 | 🛠️集成商：`start_prim` 脚本中的云 CLI 命令 | 中等到高：取决于云 API 的响应时间 | 完全透明：虚拟 IP 位于主节点上。客户端 IP 不变。
不同的子网：BGP | 灾难恢复（远程数据中心/云） | 通过 BGP 公告 /32 路由 | 🛠️集成商：`start_prim` 和 `stop_prim` 脚本中的 BGP 命令 | 低到中等：取决于 BGP 收敛时间 | 完全透明：虚拟 IP 位于主节点上。客户端 IP 不变。需要 BGP 路由器。  
DNS 重定向：无虚拟 IP | 灾难恢复（远程数据中心） | DNS 记录更改（名称/物理 IP） | 🛠️集成商：`start_prim` 脚本中的 DNS 更新命令 | 高且不可预测：取决于 DNS TTL（生存时间）和客户端 DNS 缓存 | ⚠️ 不可靠：客户端必须执行新的 DNS 查询。通常，客户端会保留启动时收到的旧 IP，并且在故障转移后不会重新路由。  
  
## 虚拟 IP 常见问题 {#virtual-ip-faq}

### 虚拟 IP 和网络 {#virtual-ip--networking}

什么是虚拟 IP？它与物理 IP 有何不同？

**物理 IP 地址**与网卡相关联。**虚拟 IP** 不与硬件相关联。在 SafeKit 集群中，客户端始终使用虚拟 IP。如果主服务器发生故障，虚拟 IP 会自动移动到健康的节点。您无需更改客户端配置。

使用虚拟 IP 是否需要硬件负载均衡器？

不需要。**SafeKit** 使用软件管理虚拟 IP。在同一子网中，它使用 **IP 别名**和**免费 ARP (GARP)** 来重定向流量。您不需要外部负载均衡器或代理服务器。

什么是免费 ARP (GARP)？它有什么用？

**免费 ARP (GARP)** 是一种发送给所有设备的网络消息。它会更新交换机和路由器的 ARP 表。在故障转移时，新的主服务器会发送 GARP 消息。该消息表示**虚拟 IP** 现在已链接到新主服务器的 MAC 地址。然后流量会立即重新路由。

我可以将 DNS 名称与虚拟 IP 关联吗？

**是的。** 为虚拟 IP 创建一个标准的 A 记录。重定向是在**虚拟 IP 级别**（使用 ARP 或网络重定向）完成的，**而不是在 DNS 级别**。您不会遇到 DNS 延迟或 TTL 问题，并且故障转移**对应用程序保持透明**。

### 云和高级架构 {#cloud--advanced-architectures}

虚拟 IP 在云中（AWS、Azure、GCP）是如何工作的？

在云中，第 2 层 GARP 消息不可用于重新路由虚拟 IP。SafeKit 可与**云负载均衡器**（AWS 弹性负载均衡、Azure Load Balancer 或 Google Cloud Load Balancing）配合使用。SafeKit 提供一个**健康检查URL**。负载均衡器读取该 URL 并将流量发送到活动节点。

对于灾难恢复，扩展 VLAN 比负载均衡器更好吗？

**是的**。在远程数据中心之间，**扩展 VLAN** 通常更好，因为故障转移**对应用程序保持透明**。**虚拟 IP 不会改变**，因此在数据中心之间发生故障转移后，应用程序及其客户端将继续使用相同的地址。

与虚拟 IP 相比，DNS 重定向的限制是什么？

**DNS 重定向**取决于 **TTL（生存时间）** 和客户端 DNS 缓存。恢复可能需要数小时。此外，**未执行新的 DNS 查询的客户端**将继续使用失败的服务器。**虚拟 IP** 会立即通过第 2 层的 GARP 消息进行重路由。客户端 DNS 缓存没有影响。

### 透明度和安全性 {#transparency--security}

为什么本地虚拟 IP 对应用程序透明度很重要？

使用本地**虚拟 IP** 时，应用程序使用不变的地址。SafeKit 在**内核**中进行重定向。应用程序看不到故障转移。使用 DNAT 时，应用程序使用的地址会发生变化。

虚拟 IP 会保留原始客户端 IP 地址吗？

是的。SafeKit 不使用源 NAT (SNAT)。虚拟 IP 位于活动服务器上，因此应用程序会收到**原始客户端 IP**。这对于安全审计、会话持久性和监管日志非常重要。


{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}
