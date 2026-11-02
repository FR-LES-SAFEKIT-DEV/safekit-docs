---
title: "测试 SafeKit 镜像集群的虚拟 IP 地址"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/test-primary-backup-vip-mirror/"
description: "在 SafeKit 镜像集群中测试虚拟 IP 可用性和故障转移，包括 GARP 重定向、ARP 检查和数据包捕获。"
category: "best-practises"
lang: "zh-hans"
topics: "关键原则，前提条件：虚拟 IP (VIP) 配置，测试 1 – 主服务器持有的虚拟 IP (VIP)，测试 2 – 手动故障转移（停止主服务器），测试 3 – 使用 arp -a 检查 GARP 重路由，测试 4 – 使用 Wireshark (Windows) 或 tcpdump (Linux) 进行端到端检查，测试工作站，预期结果总结，故障排除"
---

# 测试网络中 SafeKit 镜像集群的虚拟 IP 地址

本指南介绍如何检查 SafeKit 镜像集群（镜像模块）的虚拟 IP 地址 (VIP) 在您的网络中是否正常工作：虚拟 IP (VIP) 由主服务器持有，并在故障转移后重新路由到新的主服务器。

## 1. 关键原则

**前提条件：**镜像集群的两个节点必须位于同一第 2 层 IP 子网中：局域网，或在远程站点之间扩展的 VLAN。

- 虚拟 IP (VIP) 仅在**主服务器**(PRIM 或 ALONE 状态) 上处于活动状态：当模块在节点上作为主节点启动时，它会被设置为物理 IP 地址的别名，位于该地址的网卡上（ `where="one_side_alias"`配置）。
- 因此，主服务器的 MAC 地址就是 ARP 表中与虚拟 IP (VIP) 关联的地址（路由器、网关、同一子网中的客户端）。所有发往该虚拟 IP (VIP) 的流量都会被转发到主服务器。
- 在故障转移（主节点停止运行或发生故障）期间，虚拟 IP 地址 (VIP) 会从原主节点移除，并设置为新主节点的别名。然后，网络通过两种机制将虚拟 IP 地址 (VIP) 与新主节点的 MAC 地址关联起来：
  - 当虚拟 IP 地址 (VIP) 作为别名添加到网卡上时，操作系统发送的网络消息；
  - 当在`<vip>`部分配置`arpreroute="on"`属性时，SafeKit 会发送**GARP** （免费 ARP）。

因此，你需要测试以下内容：

1. 虚拟 IP 地址（VIP）由主服务器持有，客户端可以访问该地址；
2. 当主服务器发生变更时，与虚拟 IP (VIP) 关联的 MAC 地址将被重新路由到网络中的新主服务器（路由器、网关、虚拟化）。

## 2. 前提条件：虚拟 IP (VIP) 配置

1. 在镜像模块的`userconfig.xml`文件中，于`<vip>`部分配置虚拟 IP (VIP)。arpreroute `arpreroute="on"`属性使新的主服务器在故障转移后发送 GARP 请求：

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

2. 在两个节点上应用此配置。
3. 启动模块：一个节点必须处于**PRIM（就绪）**状态，另一个节点必须处于**SECOND（就绪）状态**。

## 3. 测试 1 – 主服务器持有的虚拟 IP (VIP)

**步骤**

1. 在主服务器上，运行`ipconfig` （Windows）或`ip addr show` （Linux）。
   →**预期结果：**虚拟 IP (VIP) 在网卡上显示为物理 IP 地址的别名。
2. 在备用服务器上运行相同的命令。
   →**预期结果：**虚拟 IP（VIP）不显示。
3. 从**集群外部的**客户端工作站， `ping`物理 IP 地址和虚拟 IP (VIP)。
   →**预期结果：**所有三个`ping`命令都会响应（除非它们被防火墙过滤）。
4. 使用 SafeKit mosaic 通过虚拟 IP (VIP) 检查访问权限：从**外部**客户端上的浏览器连接到`http://<VIP>:9010/safekit/mosaic.html` ，然后输入镜像**模块名称**并运行测试。
   →**预期结果：**马赛克的所有单元格都以单一颜色显示**主服务器**的名称：所有到虚拟 IP (VIP) 的 TCP 连接都由主服务器提供服务。

## 4. 测试 2 – 手动故障转移（停止主设备）

该测试检查虚拟 IP (VIP) 在故障转移期间是否跟随主服务器，故障转移是由停止主服务器上的模块触发的。

**步骤**

1. 从 SafeKit 控制台（或从命令行使用`safekit stop -m <module>` ）停止主节点（节点 1）上的模块。
   →**预期结果：**节点 1 进入 STOP（未就绪）状态，节点 2 进入 ALONE（就绪）状态。新主节点的日志中会出现`Virtual IP <VIP> set`消息。
2. 在新主节点上，运行`ipconfig`或`ip addr show` 。
   →**预期结果：**虚拟 IP (VIP) 现在显示为该节点上的别名，而不再显示为以前的主 IP。
3. 从客户端工作站，重复执行三个`ping`命令，并在虚拟 IP (VIP) 上再次运行 mosaic 命令。
   →**预期结果：**一切正常，马赛克的所有单元格现在都以单一颜色显示**新原色**的名称。
4. 重新启动节点 1 上的模块：它重新同步并进入 SECOND（就绪）状态，而节点 2 进入 PRIM（就绪）状态。

## 5. 测试 3 – 使用`arp -a`检查 MAC 地址重路由

在故障转移之前，记下与虚拟 IP (VIP) 关联的 MAC 地址，然后检查故障转移后它是否发生了变化。

只有当客户端工作站与集群位于**同一 IP 子网**时，才能进行此测试。

如果客户端和集群之间存在路由器，则客户端的 ARP 表中不包含虚拟 IP (VIP)，而是包含用于连接到集群网络的网关地址。在这种情况下，请与网络团队一起检查路由器或网关的 ARP 表。

**步骤**

1. 该模块在节点 1 上处于 PRIM（就绪）状态，在节点 2 上处于 SECOND（就绪）状态。
2. 在客户端工作站上， `ping`物理 IP 地址和虚拟 IP (VIP)，然后运行`arp -a` 。
   →**预期结果：**虚拟 IP (VIP) 与**主 IP 的物理 IP 地址关联的 MAC 地址相同**。
3. `stop`主节点（节点 1）上的模块。
4. 再次`ping`虚拟 IP (VIP)，然后再次运行`arp -a` 。
   →**预期结果：**虚拟 IP (VIP) 现在与**新主 IP 的物理 IP 地址关联相同的 MAC 地址**。

在读取 ARP 表之前，再次`ping`虚拟 IP (VIP)：该条目可能被标记为过期，只有在`ping`之后才会刷新。

主服务器停止前后预期 ARP 表的示例：

|地址|停止前的 MAC 地址|停止后的 MAC 地址|
|---|---|---|
节点 1 的物理 IP 地址|节点 1 | MAC 地址|节点 1 的 MAC 地址|
节点 2 的物理 IP 地址|节点 2 | MAC 地址|节点 2 的 MAC 地址|
|虚拟IP地址（VIP） |**节点1 MAC地址**|**节点2 MAC地址**|

## 6. 测试 4 – 使用 Wireshark（Windows）或 tcpdump（Linux）进行端到端检查

您可以通过在客户端和两个节点上捕获数据包来跟踪与虚拟 IP (VIP) 的 TCP 连接：在 Windows 机器上使用 Wireshark，在 Linux 机器上使用 tcpdump。

您必须查看**数据包的 MAC（以太网）头部**：目标 IP 地址仍然是虚拟 IP（VIP），而目标 MAC 地址则显示哪个节点接收流量。

**你应该注意以下几点：**

|何时|何地捕获|观察到的 MAC 地址|
|---|---|---|
|故障转移前|客户端|客户端 MAC 地址 →**节点 1（主节点）**的 MAC 地址|
|故障转移前|节点 1 |已收到发往虚拟 IP (VIP) 的数据包；节点 2 未收到任何数据包|
|在故障转移期间|网络|节点 2 为虚拟 IP (VIP) 发送的 MAC 重路由消息：操作系统在将其设置为别名时发送的消息，以及 SafeKit 发送的 GARP ( `arpreroute="on"` ) |
|故障转移后|客户端|客户端 MAC 地址 →**节点 2（新主节点）**的 MAC 地址|

如果客户端工作站与集群位于不同的子网中，则节点上看到的“客户端 MAC”是连接这两个子网的**网关**（路由器）的 MAC 地址，而不是客户端工作站的 MAC 地址。

## 7. 从哪些工作站进行测试

该行为取决于客户端和集群之间的网络路径。请针对与您的架构相关的每种客户端类型运行测试 1 和 2：

|客户位置|测试内容|
|---|---|
|客户端与集群位于**同一子网**|更新客户端的 ARP 表（测试 3 可行） |
|客户端位于**不同的子网**（路由器、网关、虚拟机管理程序虚拟网络） |更新路由器或网关中客户端的 ARP 表|
|客户端虚拟机**位于虚拟机管理程序上，该虚拟机管理程序还托管镜像集群中的一个虚拟机**|虚拟机管理程序的虚拟交换机的行为，该虚拟交换机还处理内部交换和路由|

## 8. 预期结果总结

|测试|操作|预期结果|
|---|---|---|
| 1 |主/备， `ipconfig` ， `ping`和 mosaic |仅在主节点上将虚拟 IP (VIP) 用作别名；3 个`ping`命令均有响应（除非被防火墙过滤）；mosaic 仅显示主节点|
| 2 |停止主设备|将虚拟 IP (VIP) 作为新主设备的别名； `Virtual IP <VIP> set`消息；马赛克仅显示新主设备|
| 3 |主节点停止前后的`arp -a` |虚拟 IP (VIP) 从节点 1 的 MAC 地址迁移到节点 2 的 MAC 地址|
| 4 |故障转移前后使用 Wireshark 或 tcpdump 进行抓包|客户端向新主节点的 MAC 地址发送数据包|

## 9. 故障排除

- **故障切换后，虚拟 IP (VIP) 不再响应：**路径上的某个设备（路由器、网关、虚拟交换机）未处理 MAC 地址重路由消息，仍然将流量发送到原主 IP 的 MAC 地址。请与您的网络团队检查 MAC 地址重路由消息的处理情况。
- **发送 GARP：**故障转移后， `<vip>`部分的`arpreroute="on"`属性（带有`arpinterval`和`arpelapse` ）会定期在虚拟 IP (VIP) 上发送 GARP。请参阅用户指南第 13.6.4 节“ [`<vip>`语法](https://safekit.eviden.com/zh-hans/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax)”。
- **诊断虚拟 IP (VIP) ↔ MAC 解析：**请参阅用户指南第 7.24 节“[虚拟 IP (VIP) ↔ MAC 解析故障排除](https://safekit.eviden.com/zh-hans/resources/safekit-user-guide-82/#_Issue_with_VIP)”和第 7.16 节“[故障转移后虚拟 IP 出现问题](https://safekit.eviden.com/zh-hans/resources/safekit-user-guide-82/#_Problem_with_the_1)”。

有关使用虚拟 IP 地址进行负载均衡的信息，请参阅[在 SafeKit Farm 集群中测试负载均衡虚拟 IP 地址](test-load-balancing-vip-farm/)。
{{% insert-safekit-4-buttons-zh-hans %}}
