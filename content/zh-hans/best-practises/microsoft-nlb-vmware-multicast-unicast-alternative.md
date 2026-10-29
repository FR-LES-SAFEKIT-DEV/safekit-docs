---
title: "Microsoft NLB VMware替代方案：解决组播和单播问题"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/microsoft-nlb-vmware-multicast-unicast-alternative/"
description: "在 VMware 中为Microsoft NLB 多播或单播功能而苦恼？ SafeKit提供了一种无需 SAN 的farm集群作为简单替代方案。无需静态 ARP 条目、MAC 地址欺骗或特殊网络配置，即可在Windows和Linux上实现自动负载均衡和故障转移。"
category: "best-practises"
lang: "zh-hans"
topics: "Microsoft NLB 多播模式， Microsoft NLB 单播模式， SafeKit的替代方案， SafeKit集群在<span class="notranslate farm-term" translate="no">farm</span>模式下如何与Windows协同工作？🔍 SafeKit高可用性导航中心"
---

# Microsoft NLB VMware替代方案：多播和单播问题已解决 {#microsoft-nlb-vmware-alternative-multicast-and-unicast-issues-solved}

## Microsoft NLB 多播模式 {#microsoft-nlb-multicast-mode}

如 VMware 知识库中关于网络负载均衡 (NLB) 多播模式配置的文档（ [ ](<https://knowledge.broadcom.com/external/article?articleNumber=414968>)所述，您需要在交换机或路由器上为连接到集群的每个端口手动配置静态 ARP 解析。在未知的网络环境中部署 NLB 多播模式Microsoft可能是一项复杂而艰巨的任务。

## Microsoft NLB 单播模式 {#microsoft-nlb-unicast-mode}

使用Microsoft NLB 单播模式时，必须配置 ESXi/ESX 主机，使其在任何虚拟机启动时都不发送 RARP 数据包。这就是为什么[ Microsoft NLB 在 VMware ](<https://knowledge.broadcom.com/external/article/344421/microsoft-nlb-not-working-properly-in-un.html>)的单播模式下无法正常工作的原因。

## 替代方案为SafeKit {#alternative-with-safekit}

[ SafeKit ](</zh-hans/best-practises/how-a-virtual-ip-address-works/>)虚拟 IP 地址配置无需任何特殊网络配置，网络负载均衡可在任何环境下运行。当需要在未知的基础架构（例如未知交换机或路由器、物理服务器或虚拟服务器）中部署该解决方案时，这是一个重要的特性。


{{%  insert-safekit-farm-zh-hans app="Windows"  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}