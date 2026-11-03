---
title: "测试负载均衡虚拟 IP 地址 SafeKit farm 簇"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/test-load-balancing-vip-farm/"
description: "学习如何测试 SafeKit 跨集群节点进行负载均衡，并验证虚拟 IP 故障转移、GARP 重路由和网络行为。"
category: "最佳实践"
lang: "zh-hans"
topics: "关键原则，前提条件： SafeKit 马赛克，测试 1 – 连接分布，测试 2 – 调度服务器变更，测试 3 – 使用 arp -a 检查 GARP 重路由，测试 4 – 使用 Wireshark 进行端到端检查 (Windows）或 tcpdump（Linux）、要测试的工作站、预期结果概述、故障排除"
---

# 测试负载均衡虚拟 IP 地址 SafeKit <span class="notranslate farm-term" translate="no">farm</span> 簇

本指南介绍了如何检查…… SafeKit <span class="notranslate farm-term" translate="no">Farm</span> (<span class="notranslate farm-term" translate="no">Farm</span> 模块（在虚拟 IP 地址上进行负载均衡）在您的网络中正常工作：在节点之间分配连接，并在调度节点停止时重新路由虚拟 IP (VIP)。

## 1. 关键原则

**先决条件：** 所有节点 <span class="notranslate farm-term" translate="no">Farm</span> 必须位于同一第 2 层 IP 子网中：局域网，或远程站点之间扩展的 VLAN。

- 虚拟IP（VIP）在每个节点上进行本地配置。 <span class="notranslate farm-term" translate="no">Farm</span>：当……时，它会被设置为物理 IP 地址的别名，位于该地址的网卡上。 <span class="notranslate farm-term" translate="no">Farm</span> 已在节点上启动。
- 单个节点， **调度服务器**接收虚拟 IP (VIP) 的网络流量`vmac_directed` 配置， SafeKit 默认值）：其 MAC 地址是与 ARP 表中的虚拟 IP (VIP) 关联的地址（路由器、网关、同一子网中的客户端）。
- 该节点的内核过滤器随后将 TCP 连接分配到各个节点上。 <span class="notranslate farm-term" translate="no">Farm</span>， 经过 **重写目标 MAC 地址** 数据包被转发到处理节点（目标 IP 地址仍然是虚拟 IP 地址 (VIP)）。响应直接从处理连接的节点发送到客户端。
- 滤波器执行的分布是 **确定性**处理节点是根据客户端的身份，按照配置的负载均衡规则计算出来的：
  - 在 **客户端 IP 地址** (`filter="on_addr"`）：对于给定的客户端，始终由同一个节点提供服务，从而保证会话亲和性；
  - 在 **客户端 TCP 端口** (`filter="on_port"`）：来自同一客户端的每个 TCP 连接都可以由不同的节点提供服务。这是马赛克图（第 2 节）所使用的规则，因此马赛克图显示了来自单个工作站的所有节点。
- 如果调度服务器停止运行，另一个节点将接管此角色并发送数据。 **GARPs** （免费 ARP）使网络将虚拟 IP（VIP）与其自身的 MAC 地址关联起来。

因此，你需要测试以下内容：

1. 连接已正确分布到所有节点；
2. 网络（路由器、网关、虚拟化）在调度服务器发生变化时会考虑 GARP。

## 2. 先决条件： SafeKit 马赛克

该马赛克页面是由以下机构提供的测试页面： SafeKit它会打开多个到虚拟IP（VIP）的TCP连接，并显示每个连接对应的响应节点的名称。这样就能一目了然地了解网络分布情况。

1. 在 `userconfig.xml` 的 <span class="notranslate farm-term" translate="no">Farm</span> 模块中 `<vip>` 在该部分，为端口添加负载均衡规则 SafeKit 网络服务器示例 SafeKit 在 9010 端口上运行的 HTTP Web 服务器：

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   如果 SafeKit web 服务器和控制台已切换到 HTTPS，请将 9010 替换为 9453。

2. 在所有节点上应用此配置。
3. 从客户端工作站上的浏览器 **在外面 <span class="notranslate farm-term" translate="no">Farm</span>**连接到：

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   然后进入 <span class="notranslate farm-term" translate="no">Farm</span> **模块名称** 并运行测试。马赛克的每个单元格都显示响应 TCP 连接的节点的名称，并且每个节点都关联一种颜色，以便清晰地显示由同一节点服务的马赛克块。

   在 HTTPS 中，使用 `https://<VIP>:9453/safekit/mosaic.html`，在端口 9453 上启用负载均衡规则。

该测试的详细描述见下文。 SafeKit 8.2 用户指南，第 4.3.5 节“[在虚拟 IP 地址上测试 TCP 负载均衡](https://safekit.eviden.com/resources/safekit-user-guide-82/#Mosaic)".

## 3. 测试 1 – 连接分布

**步骤**

1. 开始 <span class="notranslate farm-term" translate="no">Farm</span> 所有节点均处于 UP 状态。
2. 从客户端工作站打开马赛克。

**预期结果：** 马赛克图案上展示了以下名字： **所有节点** 的 <span class="notranslate farm-term" translate="no">Farm</span>每个处理节点使用不同的颜色。

这证明上游路由器或网关通过其 MAC 地址到达其中一个节点，并且该节点正确地分配了连接。

## 4. 测试 2 – 调度服务器变更

该测试检查…… <span class="notranslate farm-term" translate="no">Farm</span> 即使调度服务器停止运行，仍然持续响应。

**步骤**

1. 停止 <span class="notranslate farm-term" translate="no">Farm</span>即所有节点 SafeKit.
2. 开始 **单个节点**该节点成为调度服务器。
   → **预期结果：** 马赛克图中仅显示此节点。
3. 启动其他节点。
   → **预期结果：** 马赛克图像显示了所有节点。
4. 停止 **第一个节点**充当调度服务器的那个。
   → **预期结果：** 马赛克图显示了剩余的节点。

> **此测试的局限性：** 步骤 4 的正确结果并不能证明 GARP 有效。当 <span class="notranslate farm-term" translate="no">Farm</span> 模块在其他节点上启动（步骤 3），并在这些节点上配置虚拟 IP 地址，这会在网络上生成消息，这些消息可能已经重新路由了虚拟 IP 地址/MAC 地址关联。只有测试 3 和 4 真正测试了 GARP。

> 停止任何其他节点 <span class="notranslate farm-term" translate="no">Farm</span> （非调度服务器）仅测试分发的重新配置。

## 5. 测试 3 – 使用 GARP 重路由进行检查 `arp -a`

结合测试 4，此测试可以真正检查 GARP：在停止调度服务器之前，记下其 MAC 地址，然后检查虚拟 IP (VIP) 是否正确。/MAC 此后协会的组织结构发生了变化。

只有当显示马赛克的客户端工作站处于以下状态时，才能进行此测试： **同一IP子网** 作为 <span class="notranslate farm-term" translate="no">Farm</span>.

如果客户端和路由器之间存在路由器， <span class="notranslate farm-term" translate="no">Farm</span>客户端的ARP表中不包含虚拟IP（VIP），而是包含用于到达该IP地址的网关地址。 <span class="notranslate farm-term" translate="no">Farm</span>是网络问题。在这种情况下，请与网络团队一起检查路由器或网关的ARP表。

**步骤**

1. 开始 <span class="notranslate farm-term" translate="no">Farm</span> 在所有节点上。
2. 在客户端工作站上，运行 `arp -a` 并记下与虚拟IP（VIP）关联的MAC地址。它用于识别调度服务器。
3. 停止 <span class="notranslate farm-term" translate="no">Farm</span> 具有此 MAC 地址的节点。
4. 检查剩余节点是否仍然能正常构成马赛克图案。
5. 跑步 `arp -a` 再次读取新的虚拟IP（VIP）/MAC 关联并识别新的调度服务器。

## 6. 测试 4 – 使用 Wireshark 进行端到端检查 (Windows）或 tcpdump（Linux)

您可以通过在客户端和主机上捕获数据包来跟踪与虚拟 IP (VIP) 的 TCP 连接。 <span class="notranslate farm-term" translate="no">Farm</span> 节点：使用 Wireshark 开启 Windows 机器，并启用 tcpdump Linux 机器。

你必须看看 **数据包的 MAC（以太网）头部**不仅仅是 IP 地址：调度服务器的内核过滤器通过以下方式分发连接 **重写目标 MAC 地址** 数据包的路由路径与处理节点的路由路径一致。目标 IP 地址在整个路径中始终保持为虚拟 IP 地址 (VIP)。

**对于同一个 SYN 数据包，您应该观察以下几点：**

| 步 | 在哪里拍摄 | 观察到的 MAC 地址 |
|---|---|---|
| 1. 客户端向虚拟IP（VIP）发送消息 | 客户 | 客户端 MAC 地址 → MAC 地址 **调度服务器** |
| 2. 调度服务器转发连接 | 调度服务器 | 调度 MAC → MAC **处理节点** |
| 3. 处理节点接收 | 处理节点 | 调度 MAC → 节点 MAC |
| 4. 节点直接响应客户端 | 处理节点 | 节点 MAC → 客户端 MAC |
| 5. 客户收到回复 | 客户 | 节点 MAC → 客户端 MAC |

> 如果客户端工作站与主机位于不同的子网中 <span class="notranslate farm-term" translate="no">Farm</span>在“客户端 MAC 地址”上看到的 <span class="notranslate farm-term" translate="no">Farm</span> 节点是 MAC 地址 **网关** （路由器）连接两个子网，而不是客户端工作站的子网。

停止调度服务器后重复捕获（测试 2，步骤 4）：步骤 1 现在必须显示 MAC 地址 **新的** 调度服务器。

## 7. 要从哪些工作站进行测试

该行为取决于客户端和网络之间的路径。 <span class="notranslate farm-term" translate="no">Farm</span>针对与您的架构相关的每种客户端类型，运行测试 1 和 2：

| 客户地点 | 测试内容 |
|---|---|
| 客户 **同一子网** 作为 <span class="notranslate farm-term" translate="no">Farm</span> | 通过 GARP 更新客户端的 ARP 表（测试 3 可行） |
| 客户 **不同的子网** （路由器、网关、虚拟机管理程序虚拟网络） | 路由器或网关的 GARP 处理 |
| 客户端虚拟机 **在也托管着一个虚拟机管理程序的虚拟机管理程序上 <span class="notranslate farm-term" translate="no">Farm</span> 虚拟机** | 虚拟机管理程序虚拟交换机的行为，该交换机还负责处理内部交换和路由。 |

## 8. 预期结果概述

| 测试 | 行动 | 预期结果 |
|---|---|---|
| 1 | 所有节点向上，马赛克 | 所有节点都出现 |
| 2.2 | 单个节点启动 | 仅显示此节点 |
| 2.3 | 所有节点已启动 | 所有节点都出现 |
| 2.4 | 调度服务器已停止 | 其余节点出现，没有持续中断。 |
| 3 | `arp -a` 停车前后 | 与虚拟IP（VIP）关联的MAC地址发生变化 |
| 4 | 停止前后使用 Wireshark 或 tcpdump 捕获数据包 | 客户端向新调度服务器的 MAC 地址发送消息 |

## 9. 故障排除

- **服务器停止运行后，马赛克渲染器不再响应：** 路径上的设备（路由器、网关、虚拟交换机）未考虑 GARP。请与您的网络团队确认 GARP 处理情况。
- **定期发送 GARP：** 这 `arpreroute="on"` 属性 `<vip>` 部分（与 `arpinterval` 和 `arpelapse`）定期向 VIP 发送 GARP 消息。请参阅用户指南第 13.6.4 节。[`<vip>` 句法](https://safekit.eviden.com/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax)".
- **诊断虚拟IP（VIP）↔ MAC地址解析：** 请参阅用户指南第 7.24 节。[虚拟 IP (VIP) ↔ MAC 地址解析故障排除](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Issue_with_VIP)以及第 7.15 节[<span class="notranslate farm-term" translate="no">Farm</span> 模块已就绪（UP），但存在负载均衡问题 <span class="notranslate farm-term" translate="no">Farm</span>](<https://safekit.eviden.com/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>)".

## 演示 SafeKit <span class="notranslate farm-term" translate="no">farm</span> 解决方案 {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-en  %}}

对于使用虚拟 IP 地址的主/备故障转移，请参阅 [测试虚拟 IP 地址 SafeKit mirror 簇](/best-practises/test-primary-backup-vip-mirror/).

{{%  insert-safekit-4-buttons-en  %}}
