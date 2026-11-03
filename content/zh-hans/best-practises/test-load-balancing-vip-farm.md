---
title: "在 SafeKit Farm 集群中测试负载均衡虚拟 IP 地址"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/test-load-balancing-vip-farm/"
description: "学习如何测试集群节点间的负载均衡，并验证虚拟 IP 故障转移、GARP 重路由和网络行为。"
category: "best-practises"
lang: "zh-hans"
topics: "关键原则、前提条件：SafeKit 马赛克、测试 1 – 连接分布、测试 2 – 调度服务器变更、测试 3 – 使用 arp -a 检查 GARP 重路由、测试 4 – 使用 Wireshark (Windows) 或 tcpdump (Linux) 进行端到端检查、测试工作站、预期结果总结、故障排除"
---

# 在集群中测试负载均衡虚拟 IP 地址

本指南描述了如何检查 SafeKit <span class="notranslate farm-term" translate="no">Farm</span> (<span class="notranslate farm-term" translate="no">Farm</span> 模块，在虚拟 IP 地址上进行负载均衡) 在您的网络中是否正常工作：在节点之间分配连接，以及在调度节点停止时重新路由虚拟 IP (VIP)。

1. 关键原则

**前提条件：**所有节点<span class="notranslate farm-term" translate="no">Farm</span>必须位于同一第2层IP子网中：LAN，或在远程站点之间扩展的VLAN。

- 虚拟 IP (VIP) 在 <span class="notranslate farm-term" translate="no">Farm</span> 的每个节点上本地配置：当 <span class="notranslate farm-term" translate="no">Farm</span> 在节点上启动时，它被设置为该地址的网卡上物理 IP 地址的别名。
- 单个节点，即调度服务器，接收虚拟 IP (VIP) 的网络流量（配置为 2，默认为 3）：其 MAC 地址是 ARP 表中与虚拟 IP (VIP) 关联的地址（路由器、网关、同一子网中的客户端）。
该节点的内核过滤器随后将 TCP 连接分配到节点 <span class="notranslate farm-term" translate="no">Farm</span> 上的各个节点，方法是将数据包的目标 MAC 地址 ** 重写为处理节点的目标 MAC 地址 **（目标 IP 地址保持为虚拟 IP (VIP)）。响应直接从处理连接的节点发送到客户端。
- 过滤器执行的分布是 **确定性**：处理节点根据配置的负载均衡规则，从客户端的身份计算得出：
  - 在客户端 IP 地址 1 (2): 给定的客户端始终由同一节点提供服务，从而确保会话亲和性；
  - 在客户端 TCP 端口 1 (2) 上：来自同一客户端的每个 TCP 连接都可以由不同的节点提供服务。这是马赛克图（第 2 节）中使用的规则，因此马赛克图显示了来自单个工作站的所有节点。
- 如果调度服务器停止运行，另一个节点将接管此角色并发送 **GARP**（免费 ARP），以便网络将虚拟 IP (VIP) 与其自身的 MAC 地址关联起来。

因此，你需要测试以下内容：

1. 连接在所有节点上正确分布；
2. 当调度服务器发生变化时，网络（路由器、网关、虚拟化）会考虑 GARP。

## 2. 先决条件：SafeKit 马赛克

该马赛克页面是由 SafeKit 提供的测试页面。它会打开多个到虚拟 IP (VIP) 的 TCP 连接，并显示每个连接对应的响应节点的名称。这样可以一目了然地显示网络分布情况。

1. 在模块的 `userconfig.xml` 部分，于 `<vip>` 节中，为 SafeKit Web 服务器的端口添加负载均衡规则。例如，使用 HTTP 协议、端口 9010 的 SafeKit Web 服务器：

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   如果 SafeKit web 服务器和控制台已切换到 HTTPS，请将 9010 替换为 9453。

2. 在所有节点上应用配置。
3. 从位于 <span class="notranslate farm-term" translate="no">Farm</span>** 之外的客户端工作站 ** 上的浏览器连接到：

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   然后输入模块名称 <span class="notranslate farm-term" translate="no">Farm</span> **并运行测试。马赛克的每个单元格都显示响应 TCP 连接的节点的名称，并且每个节点都关联一种颜色，以便清晰地显示由同一节点服务的马赛克块。

   在 HTTPS 中，使用 `https://<VIP>:9453/safekit/mosaic.html`，并在端口 9453 上启用负载均衡规则。

该测试在《0 8.2 用户指南》第 4.3.5 节“1. 在虚拟 IP 地址上测试 TCP 负载均衡 2”中有详细描述。

## 3. 测试 1 – 连接分布

**步骤**

1. 在所有节点上启动 <span class="notranslate farm-term" translate="no">Farm</span>（UP 状态）。
2. 从客户端工作站打开马赛克。

**预期结果：**马赛克显示**所有节点**的<span class="notranslate farm-term" translate="no">Farm</span>的名称，每个处理节点使用不同的颜色。

这证明上游路由器或网关通过其 MAC 地址到达其中一个节点，并且该节点正确地分配了连接。

## 4. 测试 2 – 调度服务器变更

该测试检查当调度服务器停止时，<span class="notranslate farm-term" translate="no">Farm</span> 是否继续响应。

**步骤**

1. 停止 <span class="notranslate farm-term" translate="no">Farm</span>，即 SafeKit 中的所有节点。
2. 启动单个节点 1。该节点成为调度服务器。
   → **预期结果:**马赛克仅显示此节点。
3. 启动其他节点。
   → **预期结果:**马赛克显示所有节点。
4. 停止第一个节点（即作为调度服务器的节点）。
   → **预期结果:**马赛克显示剩余节点。

> **此测试的局限性：**步骤 4 的结果正确并不能证明 GARP 工作正常。当在其他节点上启动 <span class="notranslate farm-term" translate="no">Farm</span> 模块（步骤 3）时，这些节点上会配置虚拟 IP 地址，这会在网络上生成消息，这些消息可能已经重定向了虚拟 IP 地址/MAC 地址关联。只有测试 3 和 4 才能真正测试 GARP。

> 停止 <span class="notranslate farm-term" translate="no">Farm</span> 的任何其他节点（不是调度服务器的节点）只会测试分发的重新配置。

## 5. 测试 3 – 使用 `arp -a` 检查 GARP 重路由

结合测试 4，此测试可以真正检查 GARP：在停止调度服务器之前记下其 MAC 地址，然后检查虚拟 IP (VIP)/MAC 关联是否已更改。

只有当显示马赛克的客户端工作站与 2、3、4 位于同一 IP 子网时，才能进行此测试。

如果客户端与网络 <span class="notranslate farm-term" translate="no">Farm</span> 之间存在路由器，则客户端的 ARP 表中不包含虚拟 IP (VIP)，而是包含用于访问网络 <span class="notranslate farm-term" translate="no">Farm</span> 的网关地址。在这种情况下，请与网络团队一起检查路由器或网关的 ARP 表。

**步骤**

1. 在所有节点上启动 <span class="notranslate farm-term" translate="no">Farm</span>。
2. 在客户端工作站上，运行 `arp -a` 并记下与虚拟 IP (VIP) 关联的 MAC 地址。它用于识别调度服务器。
3. 停止具有此 MAC 地址的 <span class="notranslate farm-term" translate="no">Farm</span> 节点。
4. 检查剩余节点是否仍然能正常显示马赛克图案。
5. 再次运行 `arp -a` 以读取新的虚拟 IP (VIP)/MAC 关联并识别新的调度服务器。

## 6. 测试 4 – 使用 Wireshark (Windows) 或 tcpdump (Linux) 进行端到端检查

您可以通过在客户端和 <span class="notranslate farm-term" translate="no">Farm</span> 节点上捕获数据包来跟踪与虚拟 IP (VIP) 的 TCP 连接：在 Windows 机器上使用 Wireshark，在 Linux 机器上使用 tcpdump。

您必须查看数据包的 MAC（以太网）头部，而不仅仅是 IP 地址：调度服务器的内核过滤器通过将数据包的目标 MAC 地址重写为处理节点的目标 MAC 地址来分配连接。目标 IP 地址在整个路径上保持不变，即为虚拟 IP 地址 (VIP)。

对于同一个 SYN 数据包，您应该观察以下内容：

步骤 1 捕获位置 2 观察到的 MAC 地址 3
|---|---|---|
1. 客户端向虚拟 IP (VIP) 发送 1. 客户端 2. 客户端 MAC → 3. 调度服务器的 MAC 4. 5.
| 2. 调度服务器转发连接 | 调度服务器 | 调度 MAC → ** 处理节点的 MAC ** |
| 3. 处理节点接收 | 处理节点 | 调度 MAC → 节点 MAC |
| 4. 节点直接响应客户端 | 处理节点 | 节点 MAC → 客户端 MAC |
| 5. 客户端收到响应 | 客户端 | 节点 MAC → 客户端 MAC |

> 如果客户端工作站与 <span class="notranslate farm-term" translate="no">Farm</span> 位于不同的子网中，则在 <span class="notranslate farm-term" translate="no">Farm</span> 节点上看到的“客户端 MAC”是连接这两个子网的 **gateway**（路由器）的 MAC 地址，而不是客户端工作站的 MAC 地址。

停止调度服务器后重复捕获（测试 2，步骤 4）：步骤 1 现在必须显示 **new** 调度服务器的 MAC 地址。

7. 从哪些工作站进行测试

该行为取决于客户端与 <span class="notranslate farm-term" translate="no">Farm</span> 之间的网络路径。请针对与您的架构相关的每种客户端类型运行测试 1 和 2：

0 客户端位置 1 测试检查内容 2
|---|---|
| 客户端位于 **同一子网 ** 与 <span class="notranslate farm-term" translate="no">Farm</span> | 通过 GARP 更新客户端的 ARP 表（测试 3 可行） |
0 客户端位于不同的子网中（路由器、网关、虚拟机管理程序虚拟网络） 2 路由器或网关的 GARP 处理 3 路由器或网关的 GARP 处理 4
0 客户端虚拟机 1 在虚拟机管理程序上，该虚拟机管理程序还托管 2 虚拟机 3 虚拟机 4 虚拟机 5 虚拟机 6 虚拟机管理程序的虚拟交换机的行为，该虚拟交换机还处理内部交换和路由 7

8. 预期结果总结

| 测试 | 操作 | 预期结果 |
|---|---|---|
| 1 | 所有节点向上，马赛克 | 所有节点出现 |
| 2.2 | 单个节点启动 | 仅显示此节点 |
0 2.3 1 所有节点已启动 2 所有节点已出现 3
0 2.4 1 调度服务器已停止 2 其余节点出现，无持续中断 3
| 3 | `arp -a` 停止前后 | 与虚拟 IP (VIP) 关联的 MAC 地址发生变化 |
0 4 1 停止前后使用 Wireshark 或 tcpdump 捕获数据包 2 客户端向新调度服务器的 MAC 地址发送数据包 3

9. 故障排除

- **调度服务器停止后，马赛克不再响应：**路径上的设备（路由器、网关、虚拟交换机）未考虑 GARP。请与您的网络团队检查 GARP 处理情况。
- **定期发送 GARP：** `<vip>` 部分的 `arpreroute="on"` 属性（与 `arpinterval` 和 `arpelapse` 一起）定期在 VIP 上发送 GARP。请参阅用户指南第 13.6.4 节“[`<vip>` 语法](https://safekit.eviden.com/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax)”。
- **诊断虚拟 IP (VIP) ↔ MAC 地址解析：**请参阅用户指南第 7.24 节“[虚拟 IP (VIP) ↔ MAC 地址解析故障排除](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Issue_with_VIP)”，以及第 7.15 节“[<span class="notranslate farm-term" translate="no">Farm</span>模块已启动（就绪），但存在负载均衡问题<span class="notranslate farm-term" translate="no">Farm</span>](<https://safekit.eviden.com/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>)”。

## 演示 SafeKit <span class="notranslate farm-term" translate="no">farm</span> 解决方案 {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-zh-hans  %}}

对于具有虚拟 IP 地址的主/备故障转移，请参阅 [测试 SafeKit mirror 集群的虚拟 IP 地址](/best-practises/test-primary-backup-vip-mirror/)。

{{%  insert-safekit-4-buttons-zh-hans  %}}
