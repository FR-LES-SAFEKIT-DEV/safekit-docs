---
title: "测试SafeKit mirror集群的虚拟IP地址"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/test-primary-backup-vip-mirror/"
description: "在SafeKit mirror集群中测试虚拟IP可用性和故障转移，包括GARP重定向、 ARP检查和数据包捕获。"
category: "best-practises"
lang: "zh-hans"
topics: "关键原则，前提条件：虚拟IP (VIP) 配置，测试 1 – 主服务器持有的虚拟IP (VIP)，测试 2 – 手动故障转移（停止主服务器），测试 3 – 使用 arp -a 检查GARP重路由，测试 4 – 使用Wireshark （ Windows ）或tcpdump （ Linux ）进行端到端检查，测试工作站，预期结果总结，故障排除"
---

# 测试网络中SafeKit mirror集群的虚拟IP地址

本指南介绍如何检查SafeKit mirror集群（ mirror模块）的虚拟IP地址 (VIP) 在您的网络中是否正常工作：虚拟IP (VIP) 由主服务器持有，并在故障转移后重新路由到新的主服务器。

## 1. 关键原则

**前提条件：** mirror集群的两个节点必须位于同一第 2 层IP子网中： LAN ，或在远程站点之间扩展的VLAN 。

- 虚拟IP (VIP) 仅在**主服务器**(PRIM或ALONE状态) 上处于活动状态：当模块在节点上作为主节点启动时，它会被设置为该地址的网卡上物理IP地址的别名（ `where="one_side_alias"`配置）。
- 因此，主服务器的MAC地址就是ARP表中与虚拟IP (VIP) 关联的地址（路由器、网关、同一子网中的客户端）。所有发往该虚拟IP (VIP) 的流量都会被转发到主服务器。
- 在故障转移（主节点停止运行或发生故障）期间，虚拟IP (VIP) 会从原主节点移除，并设置为新主节点的别名。然后，网络通过两种机制将虚拟IP (VIP) 与新主节点的MAC地址关联起来：
  - 当虚拟IP (VIP) 作为别名添加到网卡上时，操作系统发送的网络消息；
  - 当在`<vip>`部分配置`arpreroute="on"`属性时， SafeKit会发送**GARPs** （免费ARP ）。

因此，你需要测试以下内容：

1. 虚拟IP （ VIP ）由主服务器持有，客户端可以访问它；
2. 当主服务器发生变更时，与虚拟IP (VIP) 关联的MAC地址将被重新路由到网络中的新主服务器（路由器、网关、虚拟化）。

## 2. 前提条件：虚拟IP (VIP) 配置

1. 在mirror模块的`userconfig.xml`文件中，于`<vip>`部分配置虚拟IP (VIP)。arpreroute `arpreroute="on"`属性使新的主服务器在故障转移后发送GARPs ：

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
3. 启动模块：一个节点必须是**PRIM （ Ready ）** ，另一个节点必须是**SECOND （ Ready ）** 。

## 3. 测试 1 – 主服务器持有的虚拟IP (VIP)

**步骤**

1. 在主服务器上，运行`ipconfig` （ Windows ）或`ip addr show` （ Linux ）。
   →<strong>预期结果：</strong>虚拟IP (VIP) 在网卡上显示为物理IP地址的别名。
2. 在备用服务器上运行相同的命令。
   →<strong>预期结果：</strong>虚拟IP （ VIP ）不显示。
3. 从<strong>集群外部的</strong>客户端工作站， `ping`物理IP地址和虚拟IP (VIP)。
   →<strong>预期结果：</strong>所有三个`ping`命令都会响应（除非它们被防火墙过滤）。
4. 使用SafeKit mosaic 通过虚拟IP (VIP) 检查访问权限：从<strong>外部</strong>客户端的浏览器连接到`http://<VIP>:9010/safekit/mosaic.html` （如果SafeKit Web 服务器和控制台已切换到 HTTPS，则使用端口 9453），然后输入mirror<strong>模块名称</strong>并运行测试。
   →<strong>预期结果：</strong>马赛克的所有单元格都以单一颜色显示<strong>主服务器</strong>的名称：所有到虚拟IP (VIP) 的TCP连接都由主服务器提供服务。

![使用马赛克测试SafeKit mirror的虚拟IP地址](/wp-content/uploads/2024/03/appli-20.png)

## 4. 测试 2 – 手动故障转移（停止主设备）

该测试检查虚拟IP (VIP) 在故障转移期间是否跟随主服务器，故障转移是由停止主服务器上的模块触发的。

**步骤**

1. 从SafeKit控制台（或从命令行使用`safekit stop -m <module>` ）停止主节点（节点 1）上的模块。
   →<strong>预期结果：</strong>节点 1 进入STOP （ NotReady ）状态，节点 2 进入ALONE （ Ready ）状态。在新主节点的日志中，出现`Virtual IP <VIP> set`消息。
2. 在新主节点上，运行`ipconfig`或`ip addr show` 。
   →<strong>预期结果：</strong>虚拟IP (VIP) 现在显示为该节点上的别名，而不再显示为以前的主 IP。
3. 从客户端工作站，重复执行三个`ping`命令，并在虚拟IP (VIP) 上再次运行 mosaic。
   →<strong>预期结果：</strong>一切正常，马赛克的所有单元格现在都以单一颜色显示<strong>新原色</strong>的名称。
4. 重新启动节点 1 上的模块：它重新同步并进入SECOND （ Ready ）状态，而节点 2 进入PRIM （ Ready ）状态。

## 5. 测试 3 – 使用`arp -a`检查MAC地址重路由

在故障转移之前，记下与虚拟IP (VIP) 关联的MAC地址，然后检查故障转移后它是否发生了变化。

只有当客户端工作站与集群位于<strong>同一IP子网</strong>时，才能进行此测试。

如果客户端和集群之间存在路由器，则客户端的ARP表中不包含虚拟IP (VIP)，而是包含用于连接到集群网络的网关地址。在这种情况下，请与网络团队一起检查路由器或网关的ARP表。

**步骤**

1. 该模块在节点 1 上处于PRIM （ Ready ）状态，在节点 2 上处于SECOND （ Ready ）状态。
2. 在客户端工作站上， `ping`物理IP地址和虚拟IP (VIP)，然后运行`arp -a` 。
   →<strong>预期结果：</strong>虚拟IP (VIP) 与**主 IP 的物理IP地址关联的MAC地址相同**。
3. `stop`主节点（节点 1）上的模块。
4. 再次`ping`虚拟IP (VIP)，然后再次运行`arp -a` 。
   →<strong>预期结果：</strong>虚拟IP (VIP) 现在与**新主 IP 的物理IP地址关联相同的MAC地址**。

> 在读取ARP表之前，再次`ping`虚拟IP (VIP)：该条目可能被标记为过期，只有在`ping`之后才会刷新。

主服务器停止前后预期ARP表的示例：

| 地址 | MAC停止前 | 停止后的MAC |
|---|---|---|
| 节点 1 的物理IP | 节点 1 MAC | 节点 1 MAC |
| 节点 2 的物理IP地址 | 节点 2 MAC | 节点 2 MAC |
| 虚拟IP （ VIP ） | **节点 1 MAC** | **节点 2 MAC** |

## 6. 测试 4 – 使用Wireshark （ Windows ）或tcpdump （ Linux ）进行端到端检查

您可以通过在客户端和两个节点上捕获数据包来跟踪与虚拟IP (VIP) 的TCP连接：在Windows机器上使用Wireshark ，在Linux机器上使用tcpdump 。

您必须查看**数据包的MAC （以太网）头部**：目标IP地址仍然是虚拟IP （ VIP ），而目标MAC地址则显示哪个节点接收流量。

**你应该注意以下几点：**

| 什么时候 | 在哪里捕获数据包 | 观察到的MAC地址 |
|---|---|---|
| 故障转移之前 | 客户 | 客户端MAC →<strong>节点 1（主节点）</strong>的MAC |
| 故障转移之前 | 节点 1 | 已收到发往虚拟IP地址（ VIP ）的数据包；节点2未收到任何数据包。 |
| 故障转移期间 | 网络 | 节点 2 为虚拟IP (VIP) 发送的MAC重路由消息：当虚拟 IP 被设置为别名时操作系统发送的消息，以及SafeKit发送的GARPs (`arpreroute="on"`) |
| 故障转移后 | 客户 | 客户端MAC →<strong>节点 2（新主节点）</strong>的MAC |

> 如果客户端工作站与集群位于不同的子网中，则节点上看到的“客户端MAC ”是连接这两个子网的**网关**（路由器）的MAC地址，而不是客户端工作站的 MAC 地址。

## 7. 从哪些工作站进行测试

该行为取决于客户端和集群之间的网络路径。请针对与您的架构相关的每种客户端类型运行测试 1 和 2：

| 客户地点 | 测试内容 |
|---|---|
| 客户端与集群位于**同一子网** | 更新客户端的ARP表（测试3可行） |
| 客户端位于**不同的子网**（路由器、网关、虚拟机管理程序虚拟网络）中 | 更新路由器或网关中客户端的ARP表 |
| 客户端虚拟机运行**在虚拟机管理程序上，该虚拟机管理程序还托管着mirror集群中的一个虚拟机。** | 虚拟机管理程序虚拟交换机的行为，该交换机还负责处理内部交换和路由。 |

## 8. 预期结果总结

| 测试 | 行动 | 预期结果 |
|---|---|---|
| 1 | PRIM / SECOND 、 `ipconfig` 、 `ping`和 mosaic 命令 | 虚拟IP (VIP) 仅在主节点上用作别名；3 个`ping`命令均有响应（除非被防火墙过滤）；马赛克仅显示主节点 |
| 2 | 停止主 | 将虚拟IP (VIP) 作为新主 IP 的别名； `Virtual IP <VIP> set`消息；马赛克仅显示新主 IP |
| 3 | 主进程停止前后的`arp -a` | 虚拟IP （ VIP ）从节点1的MAC地址转移到节点2的MAC地址。 |
| 4 | 故障切换前后Wireshark或tcpdump进行捕获 | 客户端向新主设备的MAC地址发送消息 |

## 9. 故障排除

- <strong>故障切换后，虚拟IP （ VIP ）不再响应：</strong>路径上的某个设备（路由器、网关、虚拟交换机）未考虑MAC地址重路由消息，仍然将流量发送到原主IP的MAC地址。请与您的网络团队检查MAC地址重路由消息的处理情况。
- <strong>发送GARPs ：</strong>故障转移后， `<vip>`部分的`arpreroute="on"`属性（带有`arpinterval`和`arpelapse` ）会定期在虚拟IP (VIP) 上发送GARPs 。请参阅用户指南第 13.6.4 节“ [ `<vip>`语法](https://safekit.eviden.com/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) ”。
- <strong>诊断虚拟IP (VIP) ↔ MAC解析：</strong>请参阅用户指南第 7.24 节“ [虚拟IP (VIP) ↔ MAC解析故障排除](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Issue_with_VIP) ”，以及第 7.16 节“ [故障转移后虚拟IP问题](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Problem_with_the_1) ”。

有关使用虚拟IP地址进行负载均衡，请参阅[在SafeKit Farm集群中测试负载均衡虚拟IP地址](/zh-hans/best-practises/test-load-balancing-vip-farm/) 。

{{%  insert-safekit-4-buttons-zh-hans  %}}
