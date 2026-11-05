---
title: "在 SafeKit farm 集群中测试负载均衡虚拟 IP 地址"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/test-load-balancing-vip-farm/"
description: "了解如何测试 SafeKit 在集群节点上的负载均衡，并验证虚拟 IP 故障转移、GARP 重路由和网络行为。"
category: "best-practises"
lang: "zh-hans"
topics: "关键原则，前提条件：SafeKit 马赛克，测试 1 – 连接的分配，测试 2 – 调度服务器的更改，测试 3 – 使用 arp -a 检查 GARP 重路由，测试 4 – 使用 Wireshark (Windows) 或 tcpdump (Linux) 进行端到端检查，从哪些工作站进行测试，预期结果摘要，故障排除，SafeKit farm 解决方案演示"
translation: "translate_md 2026-11-05.12 | glossaire 2026-11-05.15 | Translation LLM | 23 expressions"
---

# 在 SafeKit <span class="notranslate farm-term" translate="no">farm</span> 集群中测试负载均衡虚拟 IP 地址 {#testing-the-load-balancing-virtual-ip-address-in-a-safekit-farm-cluster}

本指南介绍如何检查 SafeKit <span class="notranslate farm-term" translate="no">Farm</span>（<span class="notranslate farm-term" translate="no">Farm</span> 模块，在虚拟 IP 地址上进行负载均衡）在您的网络中是否正常工作：连接在节点之间的分配，以及在调度节点停止时虚拟 IP (VIP) 的重新路由。

## 1. 主要原则 {#1-key-principles}

**先决条件：**<span class="notranslate farm-term" translate="no">Farm</span> 的所有节点必须位于同一层 2 IP 子网中：局域网或远程站点之间扩展的 VLAN。

- 虚拟 IP (VIP) 在 <span class="notranslate farm-term" translate="no">Farm</span> 的每个节点上本地配置：当 <span class="notranslate farm-term" translate="no">Farm</span> 在节点上启动时，它被设置为该地址网络卡上的物理 IP 地址的别名。
- 单个节点（**调度服务器**）接收虚拟 IP (VIP) 的网络流量（`vmac_directed` 配置，SafeKit 默认设置）：其 MAC 地址是 ARP 表中与虚拟 IP (VIP) 关联的 MAC 地址（路由器、网关、同一子网中的客户端）。
- 然后，此节点的内核过滤器通过将数据包的**目的 MAC 地址重写**为处理节点的 MAC 地址，将 TCP 连接分配到 <span class="notranslate farm-term" translate="no">Farm</span> 的各个节点（目的 IP 地址保持为虚拟 IP (VIP)）。响应直接从处理连接的节点发送到客户端。
- 过滤器执行的分配是**确定的**：处理节点根据配置的负载均衡规则，根据客户端的身份进行计算：
  - 基于**客户端 IP 地址**（`filter="on_addr"`）：给定客户端始终由同一节点提供服务，从而确保会话亲和性；
  - 在**客户端 TCP 端口**上（`filter="on_port"`）：来自同一客户端的每个 TCP 连接都可以由不同的节点提供服务。这是用于马赛克（第 2 节）的规则，因此它显示了来自单个工作站的所有节点。
- 如果调度服务器停止，另一个节点将接管此角色并发送 **GARP**（免费 ARP），以便网络将虚拟 IP (VIP) 与其自身的 MAC 地址相关联。

因此，您需要测试以下内容：

1. 连接正确地分布在所有节点上；
2. 当调度服务器发生变化时，网络（路由器、网关、虚拟化）会考虑 GARP。

## 2. 先决条件：SafeKit 马赛克 {#2-prerequisite-the-safekit-mosaic}

马赛克是 SafeKit 提供的测试页面。它会打开许多到虚拟 IP (VIP) 的 TCP 连接，并显示每个连接的响应节点名称。这可以一目了然地显示分布情况。

1. 在 <span class="notranslate farm-term" translate="no">Farm</span> 模块的 `userconfig.xml` 的 `<vip>` 部分中，在 SafeKit Web 服务器的端口上添加负载均衡规则。例如，SafeKit Web 服务器在端口 9010 上使用 HTTP：

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   如果 SafeKit Web 服务器和控制台已切换到 HTTPS，请将 9010 替换为 9453。

2. 将配置应用于所有节点。
3. 从 **<span class="notranslate farm-term" translate="no">Farm</span> 外部的**客户端工作站上的浏览器连接到：

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   然后输入 <span class="notranslate farm-term" translate="no">Farm</span>**模块名称**并运行测试。马赛克的每个单元格都显示响应 TCP 连接的节点名称，并且每个节点都关联一种颜色，以便清楚地显示由同一节点服务的马赛克块。

   在 HTTPS 中，使用 `https://<VIP>:9453/safekit/mosaic.html`，并在端口 9453 上设置负载均衡规则。

![使用马赛克测试 SafeKit <span class="notranslate farm-term" translate="no">farm</span> 虚拟 IP 地址](/wp-content/uploads/2024/03/appli-19.png)

请观看“ [SafeKit <span class="notranslate farm-term" translate="no">farm</span> 解决方案演示](/zh-hans/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/#demonstration-of-the-safekit-farm-solution)”部分中的马赛克测试视频。

## 3. 测试 1 – 连接分布 {#3-test-1--distribution-of-connections}

**步骤**

1. 在所有节点上启动 <span class="notranslate farm-term" translate="no">Farm</span>（UP 状态）。
2. 从客户端工作站打开马赛克。

**预期结果：** 马赛克显示 <span class="notranslate farm-term" translate="no">Farm</span> 中**所有节点**的名称，每个处理节点都使用不同的颜色。

这证明上游路由器或网关通过其 MAC 地址连接到其中一个节点，并且该节点正确地分配了连接。

## 4. 测试 2 – 更改调度服务器 {#4-test-2--change-of-dispatching-server}

此测试用于检查在调度服务器停止时，<span class="notranslate farm-term" translate="no">Farm</span> 是否仍能保持响应。

**步骤**

1. 停止 <span class="notranslate farm-term" translate="no">Farm</span>，即 SafeKit 中的所有节点。
2. 启动**单个节点**。此节点将成为调度服务器。
   → **预期结果：** 马赛克仅显示此节点。
3. 启动其他节点。
   → **预期结果：** 马赛克显示所有节点。
4. 停止**第一个节点**，即充当调度服务器的节点。
   → **预期结果：** 马赛克显示剩余节点。

> **此测试的局限性：** 步骤 4 中的正确结果并不证明 GARP 有效。当在其他节点上启动 <span class="notranslate farm-term" translate="no">Farm</span> 模块时（步骤 3），虚拟 IP 地址将配置在这些节点上，这会在网络上生成消息，这些消息可能会重新路由虚拟 IP 地址/MAC 地址关联。只有测试 3 和 4 真正测试了 GARP。

> 停止 <span class="notranslate farm-term" translate="no">Farm</span> 中的任何其他节点（非调度服务器）仅测试分发的重新配置。

## 5. 测试 3 – 使用 `arp -a` 检查 GARP 重路由 {#5-test-3--checking-garp-rerouting-with-arp--a}

此测试与测试 4 一起，真正检查了 GARP：在停止调度服务器之前，记下其 MAC 地址，然后检查虚拟 IP (VIP)/MAC 关联是否已更改。

只有当显示马赛克客户端工作站与 <span class="notranslate farm-term" translate="no">Farm</span> 位于**同一 IP 子网**中时，才能进行此测试。

如果客户端和 <span class="notranslate farm-term" translate="no">Farm</span> 之间存在路由器，则客户端的 ARP 表不包含虚拟 IP (VIP)，而是包含用于访问 <span class="notranslate farm-term" translate="no">Farm</span> 网络的网关地址。在这种情况下，请与网络团队一起检查路由器或网关的 ARP 表。

**步骤**

1. 在所有节点上启动 <span class="notranslate farm-term" translate="no">Farm</span>。
2. 在客户端工作站上，运行 `arp -a` 并记下与虚拟 IP (VIP) 关联的 MAC 地址。它用于识别调度服务器。
3. 停止具有此 MAC 地址的 <span class="notranslate farm-term" translate="no">Farm</span> 节点。
4. 检查马赛克是否仍与剩余节点一起工作。
5. 再次运行 `arp -a`，读取新的虚拟 IP (VIP)/MAC 关联，并识别新的调度服务器。

## 6. 测试 4 – 使用 Wireshark (Windows) 或 tcpdump (Linux) 进行端到端检查 {#6-test-4--end-to-end-check-with-wireshark-windows-or-tcpdump-linux}

您可以通过在客户端和 <span class="notranslate farm-term" translate="no">Farm</span> 节点上捕获数据包来跟踪到虚拟 IP (VIP) 的 TCP 连接：在 Windows 机器上使用 Wireshark，在 Linux 机器上使用 tcpdump。

您必须查看**数据包的 MAC（以太网）标头**，而不仅仅是 IP 地址：调度服务器的内核过滤器通过将数据包的**目标 MAC 地址重写为处理节点的 MAC 地址**来分配连接。目标 IP 地址在整个路径中保持为虚拟 IP (VIP)。

**对于同一个 SYN 数据包，您应该观察以下内容：**

| 步骤 | 在哪里捕获数据包 | 已观察到的 MAC 地址 |
|---|---|---|
| 1. 客户端发送到虚拟 IP (VIP) | 客户 | 客户端 MAC → **调度服务器**的 MAC |
| 2. 调度服务器转发连接 | 调度服务器 | 调度服务器 MAC → **处理节点** MAC |
| 3. 处理节点接收 | 处理节点 | 调度服务器 MAC → 节点 MAC |
| 4. 节点直接响应客户端。 | 处理节点 | 节点 MAC → 客户端 MAC |
| 5. 客户端收到响应。 | 客户 | 节点 MAC → 客户端 MAC |

> 如果客户端工作站与 <span class="notranslate farm-term" translate="no">Farm</span> 位于不同的子网中，则在 <span class="notranslate farm-term" translate="no">Farm</span> 节点上看到的“客户端 MAC”是连接这两个子网的**网关**（路由器）的 MAC 地址，而不是客户端工作站的 MAC 地址。

停止调度服务器后重复捕获（测试 2，步骤 4）：步骤 1 现在必须显示**新**调度服务器的 MAC 地址。

## 7. 从哪个工作站进行测试 {#7-which-workstations-to-test-from}

此行为取决于客户端和 <span class="notranslate farm-term" translate="no">Farm</span> 之间的网络路径。从与您的体系结构相关的每种客户端类型运行测试 1 和测试 2：

| 客户所在地 | 测试内容 |
|---|---|
| 客户端与 <span class="notranslate farm-term" translate="no">Farm</span> 位于**同一子网**中 | 通过 GARP 更新客户端的 ARP 表（可进行 3 次测试） |
| 客户端位于**不同的子网**（路由器、网关、虚拟机管理程序虚拟网络） | 由路由器或网关处理 GARP |
| 客户端虚拟机**位于也托管着 <span class="notranslate farm-term" translate="no">Farm</span> 虚拟机的虚拟机管理程序上** | 管理程序的虚拟交换机的行为，它还处理内部交换和路由。 |

## 8. 预期成果总结 {#8-summary-of-expected-results}

| 测试 | 操作 | 预期结果 |
|---|---|---|
| 1 | 所有节点 UP，马赛克 | 所有节点都显示出来 |
| 2.2 | 单个节点已启动 | 仅此节点可见 |
| 2.3 | 所有节点均已启动 | 所有节点都显示出来 |
| 2.4 | 调度服务器已停止 | 其余节点出现，没有持续中断。 |
| 3 | 停止前后的 `arp -a` | 与虚拟 IP (VIP) 关联的 MAC 地址会发生变化。 |
| 4 | 停止前后的 Wireshark 或 tcpdump 捕获 | 客户端将数据发送到新调度服务器的 MAC 地址。 |

## 9. 故障排除 {#9-troubleshooting}

- **负载均衡位图：** 有关测试和负载均衡位图的详细信息，请参阅 SafeKit 8.2 用户指南第 4.3.5 节“[在虚拟 IP 地址上测试 TCP 负载均衡](https://safekit.eviden.com/zh-hans/resources/safekit-user-guide-82/#Mosaic)”。
- **调度服务器停止后，马赛克不再响应：** 路径上的设备（路由器、网关、虚拟交换机）未考虑 GARP。请与您的网络团队一起检查 GARP 处理。
- **定期发送 GARP：**`<vip>` 部分的 `arpreroute="on"`属性（带 `arpinterval` 和 `arpelapse`）会定期在 VIP 上发送 GARP。请参阅《用户指南》第 13.6.4 节“ [`<vip>` 语法](https://safekit.eviden.com/zh-hans/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax)”。
- **诊断虚拟 IP (VIP) ↔ MAC 解析：** 请参阅用户指南第 7.24 节“[虚拟 IP (VIP) ↔ MAC 解析故障排除](https://safekit.eviden.com/zh-hans/resources/safekit-user-guide-82/#_Issue_with_VIP)”和第 7.15 节“ [<span class="notranslate farm-term" translate="no">Farm</span> 模块 UP（Ready）但 <span class="notranslate farm-term" translate="no">Farm</span> 中存在负载平衡问题](<https://safekit.eviden.com/zh-hans/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>)”。

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> 解决方案演示 {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-zh-hans  %}}

更多信息：
- [虚拟 IP 地址在高可用性集群中是如何工作的？](/zh-hans/best-practises/how-a-virtual-ip-address-works/)
- 有关使用虚拟 IP 地址进行主/备故障切换，请参阅[测试 SafeKit mirror 集群的虚拟 IP 地址](/zh-hans/best-practises/test-primary-backup-vip-mirror/)。

{{%  insert-safekit-4-buttons-zh-hans  %}}
