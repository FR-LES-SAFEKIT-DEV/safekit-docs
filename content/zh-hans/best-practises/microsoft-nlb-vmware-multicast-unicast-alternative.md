---
title: "Microsoft NLB VMware 替代方案：解决组播和单播问题"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/microsoft-nlb-vmware-multicast-unicast-alternative/"
description: "在 VMware 中使用 Microsoft NLB 组播或单播时遇到问题？SafeKit 提供了一个简单的替代方案：一个在 Windows 和 Linux 上具有自动负载均衡和故障转移的 farm 集群。它不需要静态 ARP 条目、MAC 欺骗和专门的网络配置。"
category: "best-practises"
lang: "zh-hans"
topics: "Microsoft NLB 组播模式、Microsoft NLB 单播模式、SafeKit 替代方案、SafeKit 集群在 farm 模式下如何与 Windows 配合使用？、🔍 探索 SafeKit"
translation: "translate_md 2026-11-20.2 | glossaire 2026-11-20.5 | Translation LLM | 54 expressions"
image: "/wp-content/uploads/2026/01/safekit-farm-cluster-config.png"
schemaType: "TechArticle"
---

# Microsoft NLB VMware 替代方案：解决组播和单播问题 {#microsoft-nlb-vmware-alternative-multicast-and-unicast-issues-solved}

## Microsoft NLB 组播模式 {#microsoft-nlb-multicast-mode}

在组播模式下，您必须在交换机或路由器上手动配置静态 ARP 解析。对于连接到集群的每个端口，都需要这样做。有关详细信息，请参阅 VMware 知识库文章[网络负载均衡(NLB) 组播模式配置](<https://knowledge.broadcom.com/external/article?articleNumber=414968>)。在未知网络环境中，以组播模式部署 Microsoft NLB 可能会很复杂且要求很高。

## Microsoft NLB 单播模式 {#microsoft-nlb-unicast-mode}

在单播模式下，您必须配置 ESXi/ESX 主机，使其在其中一台虚拟机启动时不会发送 RARP 数据包。否则，Microsoft NLB 将无法与 VMware 正常配合使用。有关详细信息，请参阅 VMware 知识库文章[Microsoft NLB 在单播模式下无法正常工作](<https://knowledge.broadcom.com/external/article/344421/microsoft-nlb-not-working-properly-in-un.html>)。

## SafeKit 替代方案 {#alternative-with-safekit}

SafeKit 使用[虚拟 IP 地址](</zh-hans/best-practises/how-a-virtual-ip-address-works/>)，无需特殊的网络配置。其网络负载均衡可在任何环境中运行。当您在未知的基础设施中部署解决方案时，这一点很重要：未知交换机或路由器、物理服务器或虚拟服务器。


{{%  insert-safekit-farm-zh-hans app="Windows"  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}