---
title: "无数据中心的边缘高可用"
canonical: "https://safekit.eviden.com/zh-hans/use-cases/edge-high-availability-without-a-data-center-safekit-for-ot-distributed-sites/"
description: "无需数据中心的边缘高可用性：SafeKit 将两台标准服务器变为即插即用集群，适用于 OT 和分布式站点，无需 SAN。"
category: "use-cases"
lang: "zh-hans"
topics: "边缘计算的高可用性挑战, 为什么 SafeKit 是边缘计算的天然之选, 边缘和分布式部署的适用性, 为什么边缘 OT 环境与众不同, 边缘计算的理想用例, 边缘计算与数据中心高可用性：主要区别, 支持的操作系统和平台"
hashpart: "the-edge-ha-challenge, what-makes-safekit-the-natural-fit-for-edge, edge--distributed-deployment-suitability, why-edge-ot-environments-are-different, ideal-edge-use-cases, edge-vs-data-center-ha-key-differences, supported-operating-systems-platforms"
translation: "translate_md 2026-11-17.1 | glossaire 2026-11-17.4 | Translation LLM | 50 expressions"
image: "/wp-content/uploads/2026/05/safekit-edge-512-512.jpg"
schemaType: "Article"
---

# 无数据中心的边缘高可用 {#edge-high-availability-without-a-data-center}

## 边缘计算的高可用性挑战 {#the-edge-ha-challenge}

边缘计算站点通常没有数据中心，也没有高可用性方面的专业知识。然而，业务连续性对它们至关重要。工厂车间、海上石油平台、医院诊所、零售店或 5G 天线站点都无法承受停机。但这些站点无法承受传统数据中心集群的成本和复杂性。

传统的高可用性解决方案，如 Microsoft 故障转移群集 (WSFC)、带 Corosync 的 Pacemaker 或 VMware HA，都是为数据中心设计的。它们需要共享存储（SAN 或 NAS）、专用群集硬件、永久性 IT 人员和复杂的操作系统专业知识。这些在边缘都不存在。

SafeKit 正是为弥补这一空白而生。它能让工厂、石油平台、船舶、楼宇安防、空中交通管制、5G 网络、医疗保健、零售等领域的边缘应用程序持续运行。它只需要两台通过 LAN 连接的标准服务器。


![用于边缘计算的 SafeKit](/wp-content/uploads/2026/05/safekit-edge-512-512.jpg)


## 为什么 SafeKit 是边缘计算的天然之选 {#what-makes-safekit-the-natural-fit-for-edge}

SafeKit 将两个标准边缘服务器变成即插即用的高可用性集群。服务器可以是任何品牌，物理或虚拟。没有共享存储，没有 SAN，也没有特殊硬件。一个轻量级软件包提供以下功能：

  * **实时同步文件复制**。数据在写入时以字节级别镜像到备用服务器。
  * **自动故障转移**。如果主服务器发生故障，备用服务器将在几秒钟内接管，无需人工干预。
  * **可选的网络负载均衡**。在主动-主动部署中，两台服务器共享工作负载。
  * **Web 控制台**。管理基于浏览器，可通过 HTTPS 进行远程访问。无需现场专业知识。
  * **静默、可脚本化安装**。适用于在数百个分布式站点上进行大规模部署，以及嵌入 OEM 产品中。


您无需购买 SAN，也无需购买 Windows Server Datacenter 许可证。您无需 Linux 集群专业知识或专用集群硬件。整个高可用性堆栈是一个单一的软件包。

## 边缘和分布式部署的适用性 {#edge--distributed-deployment-suitability}

SafeKit 专为边缘计算、分支机构和分布式企业而设计：

边缘计算要求 | SafeKit 解决方案  
---|---  
现场没有专门的 IT 人员 | 自动故障转移，无需人工干预  
无 SAN 或 NAS 基础设施 | 架构仅使用本地磁盘，不使用 SAN  
远程管理 | 可通过 HTTPS 从任何浏览器访问 Web 控制台  
硬件占用空间小 | 两台标准服务器或虚拟机，无需特殊硬件  
可在防火墙和 NAT 之后运行 | 可配置的端口和基于 HTTPS 的控制台  
多站点灾难恢复 | 通过扩展 VLAN 在两个地理站点之间使用 mirror 模块进行实时复制  
隔离网络或离线网络 | 无需依赖互联网，完全独立运行  
OEM 或嵌入式部署 | 静默且可编写脚本的安装，软件供应商可以嵌入  
数百个分布式集群 | 专为拥有众多分支机构的分布式企业而设计  
  
## 为什么边缘 OT 环境与众不同 {#why-edge-ot-environments-are-different}

运营技术 (OT) 环境包括 SCADA、楼宇管理系统 (BMS)、物理安全和工业控制。它们的要求与 IT 数据中心的要求存在根本性差异：

  * **现场没有 IT 人员**。变电站、远程泵站或船舶没有系统管理员。高可用性必须是自我管理的。
  * **孤立或受限的网络**。许多 OT 站点没有互联网接入，广域网带宽也有限。高可用性软件必须完全离线运行。
  * **全天候运行，零容忍复杂性**。停止生产线、丢失视频监控或中断访问控制的成本远高于高可用性软件本身。
  * **设备生命周期长**。OT 服务器的运行时间可能长达 10 到 15 年。高可用性解决方案必须稳定且维护成本低，并且不需要持续更新。
  * **仅限标准 x86 硬件**。远程工业现场没有预算或理由来设置 SAN 或专用集群节点。
  * **对操作系统复杂性零容忍**。传统的集群软件需要集群专业知识。OT 运营商不具备这种专业知识，也不应该需要这种专业知识。


SafeKit 模型直接解决了所有这些限制：无需 SAN，两台服务器，以及自动故障转移。

## 边缘计算的理想用例 {#ideal-edge-use-cases}

SafeKit 适用于任何没有数据中心但仍需高可用性的站点：

行业 | 典型的边缘站点 | 关键应用  
---|---|---  
物理安全与监控 | 建筑、校园、机场 | 视频管理系统：Milestone、Genetec、Hanwha、Siemens Siveillance  
楼宇管理系统 (BMS) | 办公楼、医院、工厂 | Siemens Desigo CC、Bosch BIS/BVMS  
电子门禁系统 (EACS) | 安全设施、校园 | Siemens SiPass、Nedap、Bosch AMS、Hirsch MicroSesame  
SCADA 和工业控制 | 工厂、变电站、水厂 | 任何运行于 Windows 或 Linux 上的 SCADA、DCS 或 HMI 软件  
空中交通管制 (ATC) | 机场、控制塔 | 空中交通管理和雷达系统  
运营控制中心 (OCC) | 地铁、铁路、交通枢纽 | 铁路信号与车站管理  
海事 | 船只、海军舰艇 | 导航、货运和船上管理系统  
石油和天然气 | 海上平台、远程钻井平台 | 过程控制和安全系统  
电信 | 5G 天线站点、MEC 节点 | 多接入边缘计算 (MEC) 服务器  
医疗保健 | 诊所、远程诊断中心 | 医学影像、患者数据、远程诊断  
零售 | 门店、分店、仓库 | 销售点和库存管理  
军事与国防 | 前沿作战基地、野战部队 | 任务关键型指挥和通信系统  
  
## 边缘计算与数据中心高可用性：主要区别 {#edge-vs-data-center-ha-key-differences}

标准 | 数据中心高可用性（WSFC、Pacemaker、VMware HA） | SafeKit 边缘计算的高可用性  
---|---|---  
存储 | 需要共享存储（SAN 或 NAS） | 无共享存储，仅使用本地磁盘  
硬件 | 专用集群节点、主机总线适配器 (HBA) 和交换机 | 任意品牌的两个标准 x86 服务器  
操作系统专业知识 | Windows Server Datacenter 或 Linux 集群技能 | 标准 Windows 或 Linux 管理技能  
现场工作人员 | 设置和干预所需 | 无需执行此操作，因为故障转移是全自动的  
对互联网或云的依赖 | 通常由云端管理 | 可在完全隔离的网络上运行  
部署规模 | 单个数据中心 | 数百个分布式站点  
许可证费用 | 高（数据中心操作系统和 SAN 许可证） | 每个集群一个经济实惠的软件许可证  
  
{{%  insert-supported-os-zh-hans  %}}

如需了解完整的技术规格、尺寸限制和采购标准，请阅读 📘 [RFI 和 RFP 技术参考](</zh-hans/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/>)。


{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}