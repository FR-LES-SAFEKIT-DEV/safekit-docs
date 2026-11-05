---
title: "测试 SafeKit mirror 集群的虚拟 IP 地址"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/test-primary-backup-vip-mirror/"
description: "测试 SafeKit mirror 集群中的虚拟 IP 可用性和故障转移，包括 GARP 重路由、ARP 检查和数据包捕获。"
category: "best-practises"
lang: "zh-hans"
topics: "关键原则、前提条件：虚拟 IP (VIP) 配置、测试 1 – 主服务器持有的虚拟 IP (VIP)、测试 2 – 手动故障转移（主服务器停止）、测试 3 – 使用 arp -a 检查 GARP 重路由、测试 4 – 使用 Wireshark (Windows) 或 tcpdump (Linux) 进行端到端检查、从哪些工作站进行测试、预期结果摘要、故障排除"
translation: "translate_md 2026-11-05.10 | glossaire 2026-11-05.14 | Translation LLM | 23 expressions"
---

# 测试网络中 SafeKit mirror 集群的虚拟 IP 地址 {#testing-the-virtual-ip-address-of-a-safekit-mirror-cluster-in-your-network}

本指南介绍如何检查 SafeKit mirror 集群（mirror 模块）的虚拟 IP 地址 (VIP) 是否在您的网络中正常工作：虚拟 IP (VIP) 由主服务器持有，并在故障转移后重新路由到新的主服务器。

## 1. 主要原则 {#1-key-principles}

**先决条件：** mirror 集群的两个节点必须位于同一层 2 IP 子网中：局域网或远程站点之间扩展的 VLAN。

- 虚拟 IP (VIP) 仅在**主服务器**上处于活动状态（PRIM 或 ALONE 状态）：当模块在节点上作为主服务器启动时，它被设置为该地址网络卡上的物理 IP 地址的别名（`where="one_side_alias"`配置）。
- 因此，主服务器的 MAC 地址是 ARP 表（路由器、网关、同一子网中的客户端）中与虚拟 IP (VIP) 关联的 MAC 地址。所有发往虚拟 IP (VIP) 的流量都会发送到主服务器。
- 在故障转移期间（主服务器停止或故障），虚拟 IP (VIP) 将从前主服务器中移除，并设置为新主服务器上的别名。然后，两种机制允许网络将虚拟 IP (VIP) 与新主服务器的 MAC 地址相关联：
  - 当虚拟 IP (VIP) 作为别名添加到网卡时，操作系统发送的网络消息；
  - 当在 `<vip>` 部分中配置了 `arpreroute="on"`属性时，SafeKit 发送的 **GARP**（免费 ARP）。

因此，您需要测试以下内容：

1. 虚拟 IP (VIP) 由主服务器持有，客户端可访问；
2. 当主服务器发生变化时，与虚拟 IP (VIP) 关联的 MAC 地址会重新路由到网络中的新主服务器（路由器、网关、虚拟化）。

## 2. 先决条件：虚拟 IP (VIP) 配置 {#2-prerequisite-virtual-ip-vip-configuration}

1. 在 mirror 模块的 `userconfig.xml` 中，在 `<vip>` 部分配置虚拟 IP (VIP)。arpreroute `arpreroute="on"`属性使新的主服务器在故障转移后发送 GARP：

   ```xml
   <vip>
     <interface_list>
       <interface arpreroute="on">
         <real_interface>
           <virtual_addr addr="<VIP>" where="one_side_alias"/>
         </real_interface>
       </interface>
     </interface_list>
   </vip>
   ```

2. 在两个节点上应用配置。
3. 启动模块：一个节点必须是 **PRIM（Ready）**，另一个节点必须是 **SECOND（Ready）**。

## 3. 测试 1 – 主服务器持有的虚拟 IP (VIP) {#3-test-1--virtual-ip-vip-held-by-the-primary-server}

**步骤**

1. 在主服务器上，运行 `ipconfig` (Windows) 或 `ip addr show` (Linux)。
   →**预期结果：** 虚拟 IP (VIP) 将作为别名显示在物理 IP 地址的网络适配器上。
2. 在辅助服务器上运行相同的命令。
   →**预期结果：** 虚拟 IP (VIP) 不会显示。
3. 从**集群外部的**客户端工作站，`ping` 物理 IP 地址和虚拟 IP (VIP)。
   →**预期结果：** 所有三个 `ping` 命令均有响应（除非它们被防火墙过滤）。
4. 通过虚拟 IP（VIP）使用 SafeKit 马赛克检查访问权限：从**外部**客户端的浏览器连接到 `http://<VIP>:9010/safekit/mosaic.html`（如果 SafeKit Web 服务器和控制台已切换到 HTTPS，则使用端口 9453），然后输入 mirror **模块名称**并运行测试。
   →**预期结果：** 马赛克的所有单元格都以单一颜色显示**主服务器**的名称：所有连接到虚拟 IP (VIP) 的 TCP 连接都由主服务器提供服务。

![使用马赛克测试 SafeKit mirror 的虚拟 IP 地址](/wp-content/uploads/2024/03/appli-20.png)

## 4. 测试 2 – 手动故障转移（停止主服务器） {#4-test-2--manual-failover-stop-of-the-primary}

此测试用于检查在主服务器上停止模块以触发故障转移期间，虚拟 IP (VIP) 是否跟随主服务器。

**步骤**

1. 从 SafeKit 控制台（或使用 `safekit stop -m <module>`从命令行）停止主节点（节点 1）上的模块。
   →**预期结果：** 节点 1 变为 STOP（NotReady），节点 2 变为 ALONE（Ready）。在新主节点的日志中，出现消息 `Virtual IP <VIP> set`。
2. 在新主网卡上，运行 `ipconfig` 或 `ip addr show`。
   →**预期结果：** 虚拟 IP (VIP) 现在作为别名显示在此节点上，而不再显示在以前的主节点上。
3. 从客户端工作站，重复三个 `ping` 命令，并在虚拟 IP (VIP) 上再次运行马赛克。
   →**预期结果：** 所有内容都响应，并且马赛克的所有单元格现在都以单一颜色显示**新主项**的名称。
4. 在节点 1 上重新启动模块：它将重新同步并转为 SECOND (Ready) 状态，而节点 2 将转为 PRIM (Ready) 状态。

## 5. 测试 3 – 使用 `arp -a` 检查 MAC 重定向 {#5-test-3--checking-mac-rerouting-with-arp--a}

在故障转移之前，记下与虚拟 IP (VIP) 关联的 MAC 地址，然后检查故障转移后该地址是否已更改。

只有当客户端工作站与集群位于**同一 IP 子网**时，才能进行此测试。

如果客户端和集群之间存在路由器，则客户端的 ARP 表不包含虚拟 IP (VIP)，而是包含用于访问集群网络的网关地址。在这种情况下，请与网络团队一起检查路由器或网关的 ARP 表。

**步骤**

1. 该模块在节点 1 上为 PRIM（Ready），在节点 2 上为 SECOND（Ready）。
2. 在客户端工作站上，`ping` 物理 IP 地址和虚拟 IP (VIP)，然后运行 `arp -a`。
   →**预期结果：** 虚拟 IP (VIP) 与**主 IP 地址的物理 MAC 地址**相关联。
3. 在主节点（节点 1）上 `stop` 模块。
4. 再次 `ping` 虚拟 IP (VIP)，然后再次运行 `arp -a`。
   →**预期结果：** 虚拟 IP (VIP) 现在与**新主机的物理 IP 地址关联相同的 MAC 地址**。

> 在读取 ARP 表之前再次 `ping` 虚拟 IP (VIP)：该条目可能被标记为过时，并且仅在 `ping` 之后才刷新。

主服务器停止前后预期的 ARP 表示例：

| 地址 | 停止前 MAC | 停止后的 MAC |
|---|---|---|
| 节点 1 的物理 IP | 节点 1 MAC | 节点 1 MAC |
| 节点 2 的物理 IP | 节点 2 MAC | 节点 2 MAC |
| 虚拟 IP（VIP） | **节点 1 MAC** | **节点 2 MAC** |

## 6. 测试 4 – 使用 Wireshark (Windows) 或 tcpdump (Linux) 进行端到端检查 {#6-test-4--end-to-end-check-with-wireshark-windows-or-tcpdump-linux}

您可以通过在客户端和两个节点上捕获数据包来跟踪到虚拟 IP (VIP) 的 TCP 连接：在 Windows 机器上使用 Wireshark，在 Linux 机器上使用 tcpdump。

您必须查看**数据包的 MAC（以太网）标头**：目标 IP 地址仍然是虚拟 IP (VIP)，而目标 MAC 地址显示哪个节点接收流量。

**您应该注意：**

| 何时 | 在哪里捕获数据包 | 已观察到的 MAC 地址 |
|---|---|---|
| 故障转移前 | 客户 | 客户端 MAC →**节点 1（主）** 的 MAC |
| 故障转移前 | 节点 1 | 发送到虚拟 IP (VIP) 的数据包已收到；节点 2 未收到任何数据包 |
| 故障转移期间 | 网络 | MAC 重新路由节点 2 发送的虚拟 IP (VIP) 消息：操作系统设置为别名时发送的消息，以及 SafeKit 发送的 GARP (`arpreroute="on"`) |
| 故障转移后 | 客户 | 客户端 MAC →**节点 2 的 MAC（新主节点）** |

> 如果客户端工作站与集群位于不同的子网中，则在节点上看到的“客户端 MAC”是连接这两个子网的**网关**（路由器）的 MAC 地址，而不是客户端工作站的 MAC 地址。

## 7. 从哪个工作站进行测试 {#7-which-workstations-to-test-from}

此行为取决于客户端和集群之间的网络路径。从与您的架构相关的每种客户端类型运行测试 1 和测试 2：

| 客户所在地 | 测试内容 |
|---|---|
| 客户端与集群位于**同一子网**中 | 更新客户端的 ARP 表（可进行 3 次测试） |
| 客户端位于**不同的子网**（路由器、网关、虚拟机管理程序虚拟网络） | 更新路由器或网关中的客户端 ARP 表。 |
| 客户端虚拟机**位于一个虚拟机管理程序上，该虚拟机管理程序还托管着 mirror 集群的一个虚拟机。** | 管理程序的虚拟交换机的行为，它还处理内部交换和路由。 |

## 8. 预期成果总结 {#8-summary-of-expected-results}

| 测试 | 操作 | 预期结果 |
|---|---|---|
| 1 | PRIM / SECOND，`ipconfig`，`ping` 和马赛克 | 虚拟 IP（VIP）仅作为主机的别名；3 个 `ping` 命令响应（除非被防火墙过滤）；马赛克仅显示主服务器 |
| 2 | 停止主电源 | 虚拟 IP (VIP) 作为新主机的别名；`Virtual IP <VIP> set` 消息；马赛克仅显示新主机 |
| 3 | 在主服务器停止前后使用 `arp -a` | 虚拟 IP (VIP) 从节点 1 的 MAC 地址移动到节点 2 的 MAC 地址 |
| 4 | 故障转移前后的 Wireshark 或 tcpdump 捕获 | 客户端将数据发送到新主机的 MAC 地址。 |

## 9. 故障排除 {#9-troubleshooting}

- **故障转移后，虚拟 IP (VIP) 不再响应：** 路径上的设备（路由器、网关、虚拟交换机）不考虑 MAC 重路由消息，该设备会继续将流量发送到前一个主机的 MAC 地址。请与您的网络团队一起检查 MAC 重路由消息的处理。
- **发送 GARP：**`<vip>` 部分的 `arpreroute="on"`属性（带 `arpinterval` 和 `arpelapse`）会在故障转移后定期在虚拟 IP (VIP) 上发送 GARP。请参阅《用户指南》第 13.6.4 节“ [`<vip>` 语法](https://safekit.eviden.com/zh-hans/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax)”。
- **诊断虚拟 IP (VIP) ↔ MAC 解析：** 请参阅用户指南第 7.24 节“[虚拟 IP (VIP) ↔ MAC 解析故障排除](https://safekit.eviden.com/zh-hans/resources/safekit-user-guide-82/#_Issue_with_VIP)”和第 7.16 节“[故障转移后虚拟 IP 的问题](https://safekit.eviden.com/zh-hans/resources/safekit-user-guide-82/#_Problem_with_the_1)”。

更多信息：
- [虚拟 IP 地址在高可用性集群中是如何工作的？](/zh-hans/best-practises/how-a-virtual-ip-address-works/)
- 有关使用虚拟 IP 地址进行负载平衡的信息，请参阅[在 SafeKit farm 集群中测试负载平衡虚拟 IP 地址](/zh-hans/best-practises/test-load-balancing-vip-farm/)。

{{%  insert-safekit-4-buttons-zh-hans  %}}
