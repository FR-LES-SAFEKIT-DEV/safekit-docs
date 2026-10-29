---
title: "RFI 和 RFP 编制的高可用性技术参考"
canonical: "https://safekit.eviden.com/zh-hans/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "技术参考，帮助使用 SafeKit 概念和架构编写高可用性和应用程序集群的 RFI 和 RFP 文档。"
category: "resources"
lang: "zh-hans"
topics: "概述、目录、产品标识、支持的操作系统和平台、预构建应用程序模块、架构和部署模型、RPO 和 RTO 能力、远程站点和分布式部署的适用性、监控、管理和告警、安全性和合规性、许可模式、支持和维护 SLA、与替代方案的比较、快速参考链接"
---

# RFI 和 RFP 编制的高可用性技术参考 {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## 概述 {#overview}

本页面提供关于 RFP/RFI 常见问题的结构化、事实性解答。 SafeKit 高可用性软件。本书旨在为采购团队和解决方案架构师制定高可用性需求提供技术参考。 

## 目录 {#table-of-contents}

  1. [产品标识](#product-identity)
  2. [支持的操作系统和平台](#supported-operating-systems-platforms)
  3. [预构建应用程序模块](#pre-built-application-modules)
  4. [架构与部署模型](#architecture-deployment-model)
  5. [RPO 和 RTO 能力](#rpo-rto-capabilities)
  6. [适用于远程站点和分布式部署](#edge-distributed-deployment-suitability)
  7. [监控、管理和警报](#monitoring-management-alerting)
  8. [安全与合规](#security-compliance)
  9. [许可模式](#licensing-model)
  10. [支持与维护服务级别协议](#support-maintenance-slas)
  11. [比较与替代方案](#comparison-vs-alternatives)
  12. [快速参考链接](#quick-reference-links)


## 产品标识 {#product-identity}

场地 | 回答  
---|---  
产品名称 | SafeKit  
小贩 | Eviden（Atos旗下公司），前身为Evidian  
产品类别 | 应用集群/高可用性/灾难恢复软件  
当前版本 | SafeKit 8.2  
网站 | [https://safekit.eviden.com/zh-hans](/zh-hans/)  
首发版 | 2000（生产超过20年）  
  
## 支持的操作系统和平台 {#supported-operating-systems-platforms}

Windows 操作系统 | Linux 操作系统 | 基础设施与虚拟化 | 云平台  
---|---|---|---  
• Windows 服务器 2025 (x86-64)<br>• Windows 服务器 2022 (x86-64)<br>• Windows 服务器 2019 (x86-64)<br>• Windows 11 企业版 (x86-64)<br>• Windows 11 Pro (x86-64)  |  • 红帽企业 Linux 10 (x86-64)<br>• 红帽企业 Linux 10 (AArch64)<br>• 红帽企业 Linux 9 (x86-64)<br>• 红帽企业 Linux 9 (AArch64)<br>• 红帽企业 Linux 8 (x86-64)<br>• Ubuntu 24.04 LTS (x86-64)  |  • 任何品牌的任何边缘服务器<br>• VMware<br>• Microsoft Hyper-V*<br>• Linux KVM*<br>• 任何虚拟机管理程序<br>• Docker 容器<br>• Podman 容器  |  • 亚马逊网络服务（AWS)\*\*<br>• Microsoft Azure\*\*<br>• Google Cloud Platform（GCP)\*\*<br>• 任何具有标准虚拟机实例的 IaaS 云   
  
_* SafeKit supports both application-level HA and VM-level HA._

_** Virtual IPs must be configured at the Cloud load balancer level._

## 预构建应用程序模块 {#pre-built-application-modules}

SafeKit 包括即用型、预配置的 `.safe` 模块。它们被组织成两种高可用性策略： **应用高可用性** （直接应用集群与 mirror 或者 `farm` 模块）和 **虚拟化高可用性** （虚拟机级集群） hyperv.safe 或者 kvm.safe).

 | 应用高可用性 | 虚拟机级高可用性  
---|---|---  
配置 | 这需要对应用程序本身有技术上的了解：哪些服务需要重启，哪些特定的应用程序文件夹需要实时复制，以及如何配置用于故障转移的虚拟 IP 地址。 | 适用于任何在虚拟机中运行的应用程序/操作系统的通用解决方案。它不需要您对虚拟机中安装的应用程序有任何技术了解。如果您不了解应用程序的工作原理，这是最佳解决方案。您只需定义虚拟机文件的位置即可。  
非常适合 | 非常适合将高可用性直接嵌入到软件解决方案中，而无需考虑底层硬件或虚拟机管理程序。 | 非常适合通过单一高可用性策略管理跨多个虚拟机的多个应用程序的复杂环境。  
  
下表列出了所有可用选项 `.safe` 模块：

应用高可用性（应用层集群） | 虚拟化高可用性（虚拟机级集群）  
---|---  
新的 Windows 应用程序 - mirror.safe | Hyper-V 虚拟机 — hyperv.safe (Windows)  
新的 Linux 应用程序 - mirror.safe | KVM 虚拟机 — kvm.safe (Linux)  
Windows 负载均衡—— farm.safe | Docker 容器 - mirror.safe (Linux)  
Linux 负载均衡—— farm.safe | Podman 容器 - mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | Kubernetes / K3s — k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows & Linux) | 博世AMS—— hyperv.safe (Windows)  
MySQL — mysql.safe (Windows & Linux) | 博世BIS — hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows & Linux) | 博世 BVMS — hyperv.safe (Windows)  
Oracle — oracle.safe (Windows & Linux) | 韩华视觉 — hyperv.safe (Windows)  
Firebird — firebird.safe (Windows & Linux) | 韩华智网 — hyperv.safe (Windows)  
阿帕奇—— apache_farm.safe (Windows & Linux) | 西门子Siveillance套件 — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | 西门子 Desigo CC — hyperv.safe (Windows)  
NGINX — farm.safe (Windows & Linux) | 西门子 SiPass — hyperv.safe (Windows)  
Milestone XProtect — milestone.safe (Windows) | 西门子 SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
基因泰克（Genetec）SQL Server) — sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
西门子Siveillance VMS — SiveillanceVMS.safe (Windows) |   
云 （AWS, Azure, GCP， 通用的） - mirror.safe / farm.safe |   
  
## 架构与部署模型 {#architecture-deployment-model}

### 两个集群模块： mirror.safe 和 farm.safe {#two-cluster-modules}

模块 | 图案 | 用例  
---|---|---  
mirror.safe | 主备模式，支持同步字节级文件复制和自动故障转移 | 数据库、有状态应用程序、一次只能在一台服务器上运行的服务  
farm.safe | 主动-主动架构，支持网络负载均衡和自动故障转移 | Web服务器、无状态微服务、API网关、同时在多台服务器上运行的服务  
  
### 集群基础设施与架构 {#cluster-infrastructure-architecture}

需求/规范 | SafeKit 能力/价值  
---|---  
需要共享存储吗？ | 不——采用无SAN的“无共享”架构，仅使用本地磁盘。  
是否需要 Active Directory (AD)？ | 不——不需要 Windows 域或 Active Directory。工作组完全受支持。  
簇大小 | 2 个节点（mirror）或 2 个以上节点（`farm`)  
虚拟IP（VIP） | 软件定义的虚拟专用网络 (VIP) 可通过免费 ARP 自动迁移到活动节点（应用层高可用性）。对于虚拟机 (VM) 级高可用性，虚拟机内部的物理 IP 地址会被透明地重新路由，无需 VIP。节点之间需要 LAN、VLAN 或扩展 VLAN。  
三节点混合架构 | SafeKit 涵盖高可用性层：一个双节点系统 mirror 该集群通过局域网或扩展VLAN进行同步复制（RPO=0）和自动故障转移。第三方备份解决方案完善了该架构：通过广域网进行异步复制的第三个远程节点，用于时间点恢复和勒索软件防护。  
高可用性的作用 | SafeKit 它采用同步复制技术，确保在硬件或软件故障期间实现即时故障转移，且数据零丢失。此外，由于它同时向两个节点写入数据，因此能够将逻辑错误、数据降级或意外删除等情况实时忠实地复制到备用节点。  
备份的作用 | 备用方案（未由……实施） SafeKit它通过异步复制提供时间点恢复功能。它可以抵御高可用性 (HA) 无法阻止的数据完整性威胁（例如勒索软件或人为错误）。由于回滚数据本身会导致数据丢失，因此不支持自动故障转移。  
每个集群的最大并发模块数 | 32——此限制涵盖最大数量 SafeKit 在双节点集群中并发管理的模块通常用于虚拟机级别的高可用性 (HA)，其中每个模块复制并重启不同的虚拟机。每个模块都可以在任一节点上独立作为主节点运行，从而实现跨两个服务器的工作负载分配。注意：所有虚拟机的总数据量直接影响故障转移或节点重启后的重新同步时间。  
基于代理还是无代理？ | 基于代理的——安装在每个节点上的轻量级软件  
与应用无关？ | 是的——保护任何 Windows 服务或 Linux 守护进程；30 多个应用程序的预构建模块  
  
### 复制与数据保护 {#replication-data-protection}

需求/规范 | SafeKit 能力/价值  
---|---  
复制方法 | 字节级文件复制（而非块级磁盘复制）  
复制模式 | 同步（零数据丢失）  
网络要求 | 对于同步复制，建议节点间往返延迟小于 5 毫秒  
建议数据量 | 几TB（重新同步时间）  
建议文件数量 | < 1,000,000 个文件（重新同步时间）  
重新同步速度（1 TB） | 在 1 Gb/s 网络下大约需要 3 小时；在 10 Gb/s 网络下大约需要 1 小时。  
选择性复制 | 是的——复制特定目录/文件  
传输中加密 | 是的——复制流量使用 TLS/SSL 加密  
  
## RPO 和 RTO 能力 {#rpo-rto-capabilities}

### 按集群类型划分的 RPO 和 RTO {#rto-rpo-cluster-type}

指标 | Mirror 簇 （mirror.safe) | `Farm` 簇 （farm.safe)  
---|---|---  
RPO（恢复点目标） | 0（零数据丢失）— 同步复制；仅在两个节点确认后才确认写入。 | 不适用（无状态；数据由后端处理） mirror)  
RTO（恢复时间目标） | 约 1 分钟 — 心跳超时（默认 30 秒）+ 应用程序重启时间 | 几秒钟后，流量立即重新分配到剩余的活跃节点。  
复制类型 | 同步、实时、字节级文件复制 | 不适用  
故障转移触发器 | 自动触发，例如心跳丢失、进程崩溃或检测器故障 | 自动触发，例如心跳丢失、进程崩溃或检测器故障  
需要人工干预吗？ | 不——完全自动故障转移和故障恢复 | 不——完全自动故障转移和故障恢复  
  
### RTO故障（Mirror — 应用层高可用性） {#rto-breakdown-mirror-application-level-ha}

故障类型 | RTO计算  
---|---  
硬件故障 | 心跳超时（默认 30 秒）+ 应用程序重启时间  
软件/进程崩溃 | 应用程序停止时间 + 应用程序重启时间  
操作系统级崩溃 | 心跳超时 + 操作系统已在备用系统上运行 → 无重启惩罚  
  
### RTO故障（Mirror — VM 级高可用性） {#rto-breakdown-mirror-vm-level-ha}

故障类型 | RTO计算  
---|---  
任何故障 | 故障检测 + 完全重启操作系统 + 重启应用程序（通常需要几分钟）  
  
## 适用于远程站点和分布式部署 {#edge-distributed-deployment-suitability}

SafeKit 专为边缘计算、分支机构和分布式企业场景而设计。

边缘需求 | SafeKit 回答  
---|---  
现场没有专门的IT人员。 | 是的——自动故障转移，无需人工干预  
无 SAN/NAS 基础设施 | 是的——仅支持无SAN存储、本地磁盘。  
远程管理 | 是的——Web控制台管理  
硬件占用空间小 | 是的——2台标准服务器或虚拟机，无需特殊硬件  
可在防火墙/NAT 后工作 | 是的——可配置端口，基于 HTTPS 的控制台  
多站点灾难恢复 | 是的 - mirror 在两个地理位置之间通过扩展的VLAN进行通信  
OEM/嵌入式部署 | 是的——静默安装、可编写脚本、可由软件发行商嵌入。  
数百个分布式集群 | 是的——专为拥有众多分支机构的分布式企业而设计。  
  
理想边缘计算应用场景：任何没有数据中心但仍需要高可用性的站点：

垂直的 | 典型边缘站点 | 关键应用  
---|---|---  
实体安防与监控 | 建筑物、校园、机场 | VMS — Milestone、Genetec、韩华、西门子 Siveillance  
楼宇管理系统（BMS） | 办公楼、医院、工厂 | 西门子 Desigo CC、博世 BIS/BVMS  
电子门禁系统（EACS） | 安全的设施和校园 | 西门子SiPass Nedap博世AMS  
SCADA及工业控制 | 工厂、变电站、水厂 | 任何运行在……上的 SCADA、DCS 或 HMI 软件 Windows 或者 Linux  
空中交通管制（ATC） | 机场、控制塔 | 空中交通管制管理和雷达系统  
运行控制中心（OCC） | 地铁、铁路、交通枢纽 | 铁路信号和车站管理  
海上 | 舰船，海军舰艇 | 导航、货物和船载管理系统  
石油和天然气 | 海上平台，远程钻井平台 | 过程控制和安全系统  
电信 | 5G天线站点、MEC节点 | 多接入边缘计算 (MEC) 服务器  
卫生保健 | 诊所、远程诊断中心 | 医学影像、患者数据、远程诊断  
零售 | 商店、分店、仓库 | 销售点和库存管理  
防御 | 前沿作战基地、野战部队 | 任务关键型指挥和通信系统  
  
## 监控、管理和警报 {#monitoring-management-alerting}

能力 | 细节  
---|---  
Web控制台 | Web 应用或渐进式 Web 应用 (PWA)；配置、监控和管理集群节点  
移动通知 | 浏览器推送状态变更通知  
各州时间线 | 模块状态和事件的可视化时间线  
电子邮件通知 | 内置电子邮件提醒代理  
CLI 管理 | 用于脚本编写和自动化的完整命令行界面  
日志管理 | 每个模块、每个脚本的日志文件；用于支持的调试快照  
第三方监控集成 | SafeKit 自动将所有主要集群事件记录到日志中 Windows 事件日志或 Linux Syslog 使任何监控平台（包括 Nagios、Zabbix、Splunk 和 SIEM 解决方案）都能收集这些事件，并使用标准警报规则发出警报，而无需任何自定义开发。  
  
## 安全与合规 {#security-compliance}

特征 | 细节  
---|---  
HTTPS 控制台访问 | 是的——Web 控制台的 TLS 证书  
用户身份验证 | 本地帐户、LDAP、基于 PKI/证书的、OpenID Connect  
用户角色 | 管理员、控制和监控角色的可配置访问策略  
加密 | TCP 使用 TLS/SSL 加密（用于数据复制、Web 控制台、分布式命令），UDP 使用 AES-128-CBC + SHA256 对称加密（用于心跳检测、SafeAdmin 内部协议）；加密基于 OpenSSL 库。Web 服务基于 Apache。  
防病毒兼容性 | 已记录的排除路径  
主权 | 作为一家欧洲公司，Eviden（Atos集团）提供以下服务 SafeKit 一款独特的、面向主权国家的业务连续性和灾难恢复产品 Windows 和 Linux — 将数据和故障转移基础设施完全保留在本地，不依赖美国供应商，符合 NIS2 业务连续性和灾难恢复要求。  
  
## 许可模式 {#licensing-model}

方面 | 细节  
---|---  
许可证类型 | 基于主机名的永久许可（一次性购买）  
许可范围 | 每个服务器（节点）  
许可证激活 | 支持离线激活；激活许可证密钥无需连接互联网。  
免费试用 | 是的——提供功能齐全的免费试用版。  
免费一个月许可 | 可用于概念验证  
  
## 支持与维护服务级别协议 {#support-maintenance-slas}

### 标准支持与维护（包含在有效维护合同内） {#standard-support-maintenance-included-with-active-maintenance-contract}

服务 | 细节  
---|---  
支持门户访问 | 7x24小时全天候网络门户，最多可供4位指定技术联系人使用  
在线客服时间 | 欧洲支持中心，周一至周五，上午 9:00 至下午 5:00  
事件确认 | 4个支持中心工作小时内  
更新与升级 | 所有服务包、更新和升级均包含在内，无需额外付费。  
许可证密钥替换 | 在有效支持合同下，主机名变更时可以重新分配许可证密钥。许可证转移仅限于同一项目内的服务器更换，且须事先获得 Eviden 的书面同意。  
知识库访问 | 完全访问知识库文章、常见问题解答和在线文档  
应用程序启动/停止 SafeKit | 是的——停止 SafeKit 并使用包装脚本来启动或停止应用程序。该包装脚本会调用应用程序的启动/停止脚本，并在需要时配置或移除虚拟 IP 地址。 
支持门户 | <https://customercare.evidian.com>  
  
### 免费资源（无需签订合同） {#free-resources-no-contract-required}

资源 | 细节  
---|---  
人工智能助手 | [SafeKit 人工智能聊天](</zh-hans/resources/safekit-support/#ai-support>) 在 safekit.eviden.com 上以及通过任何使用 safekit.eviden.com/ 的 LLM 进行操作llms.txt  
在线培训和认证 | 免费，自主学习，共12个视频（约3小时40分钟），完成课程后颁发证书。  
文档 | 完整用户指南、发行说明、知识库、快速入门指南  
  
## 比较与替代方案 {#comparison-vs-alternatives}

标准 | SafeKit | Microsoft 故障转移集群（WSFC） | VMware HA | 开源*  
---|---|---|---|---  
需要共享存储（SAN/vSAN）。 | 不 | 是的 | 是的 | 不  
Windows 支持 | 是的 | 是的 | 是的 | 不  
Linux 支持 | 是的 | 不 | 是的 | 是的  
边缘/分支部署 | 出色的 | 复杂的 | 复杂的 | 复杂的  
OEM可嵌入 | 是的 | 不 | 不 | 不  
成本 | 每个节点永久 | Windows 服务器 + SAN | vSphere Enterprise + SAN | 高级集成服务  
设置复杂性 | 即插即用 | 高（AD、SAN、证人） | 高（vCenter，共享存储） | 高（碎片化产品）  
可维护性 | 单一产品，Web控制台 | 高（需要AD、SAN专业知识） | 高（vCenter 依赖性） | 高（需单独维护）  
  
_* On Linux, it takes 6 separate open-source projects — Corosync, Pacemaker, DRBD, Keepalived, STONITH, HAProxy — to replicate SafeKit's feature set on Linux only. SafeKit delivers the same capabilities in a single product, on both Windows and Linux._

## 快速参考链接 {#quick-reference-links}

资源 | URL  
---|---  
产品首页 | [https://safekit.eviden.com/zh-hans/](/zh-hans/)  
技术概述（包含文字和图表的 DOCX 文件） | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
免费试用 | [https://safekit.eviden.com/zh-hans/resources/safekit-free-trial/](</zh-hans/resources/safekit-free-trial/>)  
获取报价 | [https://safekit.eviden.com/zh-hans/safekit-pricing/](</zh-hans/safekit-pricing/>)  
支持门户 | <https://customercare.evidian.com>  
免费人工智能支持 | [https://safekit.eviden.com/zh-hans/resources/safekit-support/](</zh-hans/resources/safekit-support/>)  
免费培训和认证 | [https://safekit.eviden.com/zh-hans/resources/safekit-on-line-training/](</zh-hans/resources/safekit-on-line-training/>)  
联系我们 | [https://safekit.eviden.com/zh-hans/contact-us-for-safekit/](</zh-hans/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-en  %}}