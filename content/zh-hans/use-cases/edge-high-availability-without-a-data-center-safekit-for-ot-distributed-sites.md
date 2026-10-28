---
title: "无需数据中心的边缘高可用性：适用于 OT 和分布式站点的SafeKit"
canonical: "https://safekit.eviden.com/zh-hans/use-cases/edge-high-availability-without-a-data-center-safekit-for-ot-distributed-sites/"
description: "边缘站点没有数据中心，但仍然需要高可用性。 SafeKit 将 2 台标准服务器变成即插即用的 HA 集群：无需 SAN，无需 IT 人员，自动故障转移。"
category: "use-cases"
lang: "zh-hans"
topics: "边缘高可用性挑战， SafeKit为何是边缘的理想之选，边缘与分布式部署的适用性，边缘 OT 环境的独特之处，理想的边缘用例，边缘与数据中心高可用性：主要区别，技术最低要求，🔍 SafeKit高可用性导航中心"
---

# 无需数据中心的边缘高可用性：适用于 OT 和分布式站点的SafeKit {#edge-high-availability-without-a-data-center-safekit-for-ot--distributed-sites}

## Edge HA挑战赛 {#the-edge-ha-challenge}

边缘站点通常没有数据中心，也没有高可用性方面的专业知识——然而，业务连续性至关重要。工厂车间、海上石油平台、医院诊所、零售商店或 5G 天线站点都无法承受停机，但又无法承担传统数据中心高可用性集群的成本和复杂性。

传统的HA解决方案—— Microsoft故障转移集群（WSFC）、Pacemaker/Corosync和VMware HA——是为数据中心设计的：它们假定存在共享存储（SAN/NAS）、专用集群硬件、常驻IT人员以及复杂的操作系统级专业知识。而这些条件在边缘环境中并不存在。

SafeKit正是为弥补这一空白而打造的。它只需两台标准服务器和一个局域网，即可让工厂、石油平台、船舶、楼宇安防、空中交通管制、5G 网络、医疗保健、零售等众多领域的边缘应用持续运行。


![ SafeKit适用于 Edge ](/wp-content/uploads/2026/05/safekit-edge-512-512.jpg)


## 是什么让SafeKit与 Edge完美契合？ {#what-makes-safekit-the-natural-fit-for-edge}

SafeKit可将两台标准边缘服务器（任何品牌，物理或虚拟）转换为即插即用的高可用性集群——无需共享存储、无需 SAN、无需特殊硬件。一套轻量级软件即可实现：

  * **实时同步文件复制** — 数据在写入时以字节级镜像到备用服务器
  * **自动故障转移** — 如果主服务器发生故障，备用服务器将在几秒钟内自动接管，无需人工干预。
  * **可选网络负载均衡** — 用于双活部署，其中两台服务器共享工作负载
  * **Web 控制台** — 基于浏览器的管理，可通过 HTTPS 远程访问，无需现场专业知识
  * **静默、可脚本化安装** — 适用于 OEM 嵌入式安装和跨数百个分布式站点的大规模部署


无需采购SAN，无需Windows服务器数据中心许可证，无需Linux集群操作系统专业知识，也无需专用集群硬件。整个高可用性堆栈就是一个单独的软件包。

## 边缘和分布式部署适用性 {#edge--distributed-deployment-suitability}

SafeKit专为边缘计算、分支机构和分布式企业场景而设计：

边缘需求| SafeKit答案  
---|---  
现场无需专职 IT 人员|自动故障转移，无需人工干预  
无 SAN/NAS 基础架构|无 SAN 架构，仅本地磁盘  
远程管理| Web 控制台可通过 HTTPS 从任何浏览器访问  
低硬件占用空间| 2 台标准服务器或虚拟机，无需特殊硬件  
|在防火墙/NAT 后运行，端口可配置，基于 HTTPS 的控制台  
通过跨扩展VLAN在两个地理位置之间进行多站点灾难恢复，站点| Mirror 。  
物理隔离/离线网络|无需互联网依赖；完全独立  
OEM/嵌入式部署|静默安装，可编写脚本，可由软件发行商嵌入  
数百个分布式集群|专为管理众多分支机构的分布式企业而设计  
  
## 为什么边缘 OT 环境有所不同 {#why-edge-ot-environments-are-different}

运营技术 (OT) 环境——例如 SCADA、BMS、物理安全、工业控制——其要求与 IT 数据中心有着根本的不同：

  * **现场没有IT人员。** 变电站、远程泵站或船舶没有系统管理员。高可用性必须能够自我管理。
  * **气隙网络或受限网络。** 许多运营技术（OT）站点没有互联网接入，广域网带宽也有限。高可用性（HA）软件必须完全离线运行。
  * **全天候24小时正常运行，对复杂性零容忍。** 停止生产线、失去视频监控或中断门禁控制所造成的损失远远超过 HA 软件本身的成本。
  * **设备使用寿命长。** OT服务器的使用寿命可能长达10-15年。高可用性解决方案必须稳定、维护成本低，且无需频繁更新。
  * **仅限标准x86硬件。** 远程工业站点没有部署 SAN 或专用集群节点的预算或理由。
  * **无法容忍操作系统级别的复杂性。** Pacemaker、Corosync 或 WSFC 需要 OT 操作员根本不具备也不应该具备的集群专业知识。


SafeKit的无 SAN、双服务器、自动故障转移模型直接解决了所有这些限制。

## 理想边缘用例 {#ideal-edge-use-cases}

任何没有数据中心的站点——但高可用性仍然至关重要：

垂直|典型边缘站点|关键应用  
---|---|---  
实体安防与监控|建筑物、园区、机场|视频管理系统 — Milestone ，Genetec、韩华、西门子 Siveillance  
楼宇管理系统 (BMS) |办公楼、医院、工厂|西门子 Desigo CC、博世 BIS/BVMS  
电子门禁系统 (EACS) |安全设施、园区|西门子 SiPass、 Nedap 、博世 AMS  
SCADA 和工业控制|工厂、变电站、水厂|任何运行在Windows或Linux上的 SCADA、DCS 或 HMI 软件  
空中交通管制 (ATC) |机场、控制塔| ATC 管理和雷达系统  
运营控制中心 (OCC) |地铁、铁路、交通枢纽|铁路信号和车站管理  
海事| 、海军舰艇、 | 、货物和船上管理系统  
石油天然气|海上平台、远程钻井平台|过程控制和安全系统  
电信| 5G 天线站点，MEC 节点|多接入边缘计算 (MEC) 服务器  
医疗保健|诊所、远程诊断中心|医学影像、患者数据、远程诊断  
零售|门店、分店、仓库|销售点和库存管理  
国防部|前沿作战基地、野战部队|关键任务指挥和通信系统  
  
## 边缘高可用性与数据中心高可用性：主要区别 {#edge-vs-data-center-ha-key-differences}

标准|数据中心高可用性（WSFC、Pacemaker、VMware 高可用性） | SafeKit边缘高可用性  
---|---|---  
存储|需要 SAN/NAS 共享存储|无 SAN — 仅限本地磁盘  
硬件|专用集群节点、HBA、交换机|任意两台标准 x86 服务器  
操作系统专业知识| Windows数据中心或Linux集群） 操作系统技能|标准） Windows / Linux管理技能  
现场工作人员|需要进行设置和干预|不需要 — 全自动  
互联网/云依赖性|通常由云管理|完全物理隔离  
部署规模： |单个数据中心； |数百个分布式站点  
许可费用|高（数据中心操作系统、SAN 许可） |每个集群一个经济实惠的软件许可  
典型 RTO | 1–5 分钟|小于 1 分钟（可配置）  
  
## 技术最低要求 {#technical-minimum-requirements}

  * **服务器：** 2 台标准 x86 服务器或虚拟机（任何硬件品牌，物理或虚拟）或 ARM（仅限Linux ）
  * **操作系统：** Windows服务器 2019 / 2022 / 2025， Windows 11，RHEL 8/9，Ubuntu 24.04
  * **网络：** 1 Gbps LAN 用于复制；建议使用专用心跳网络
  * **存储：**仅限本地磁盘——不使用 SAN、NAS 或任何类型的共享存储
  * **无需特殊操作系统版本；** — Windows服务器标准版即可满足需求；无需数据中心许可证


有关完整的技术规格、尺寸限制和采购标准，请参阅 📘 [ RFP/RFI 技术参考](</zh-hans/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/>) 。


{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}