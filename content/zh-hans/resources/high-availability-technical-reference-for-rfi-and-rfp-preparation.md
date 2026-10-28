---
title: "RFI 和 RFP 编制的高可用性技术参考"
canonical: "https://safekit.eviden.com/zh-hans/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "使用SafeKit概念和架构，为高可用性和应用程序集群准备 RFI 和 RFP 文档提供技术参考。"
category: "resources"
lang: "zh-hans"
topics: "概述、目录、产品标识、支持的操作系统和平台、预构建应用程序模块、架构和部署模型、RPO 和 RTO 能力、边缘和分布式部署适用性、监控、管理和告警、安全与合规性、许可模式、支持和维护 SLA、与替代方案的比较、快速参考链接"
---

# RFI 和 RFP 编制的高可用性技术参考{#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## 概述{#overview}

本页面针对SafeKit高可用性软件，提供结构化、客观的常见问题解答，旨在为采购团队和解决方案架构师在制定高可用性需求时提供技术参考。 

## 目录{#table-of-contents}

  1. [产品标识](#product-identity)
  2. 支持的操作系统和平台[ ](#supported-operating-systems-platforms)
  3. [预构建应用程序模块](#pre-built-application-modules)
  4. [架构与部署模型](#architecture-deployment-model)
  5. [ RPO 和 RTO 能力](#rpo-rto-capabilities)
  6. [边缘和分布式部署适用性](#edge-distributed-deployment-suitability)
  7. [监控、管理和警报](#monitoring-management-alerting)
  8. [安全与合规](#security-compliance)
  9. [许可模式](#licensing-model)
  10. [支持与维护服务级别协议](#support-maintenance-slas)
  11. [与替代方案](#comparison-vs-alternatives)的比较
  12. [快速参考链接](#quick-reference-links)


## 产品标识{#product-identity}

字段|答案  
---|---  
产品名称| SafeKit  
供应商| Eviden（Atos 旗下公司），前身为 Evidian  
产品类别|应用集群/高可用性/灾难恢复软件  
当前版本| SafeKit 8.2  
网站| <https://safekit.eviden.com>  
首发版本| 2000（生产超过 20 年）  
  
## 支持的操作系统和平台{#supported-operating-systems-platforms}

Windows操作系统| Linux操作系统|基础设施与虚拟化|云平台  
---|---|---|---  
• Windows Server 2025 (x86-64) <br> • Windows Server 2022 (x86-64) <br> • Windows Server 2019 (x86-64) <br> • Windows 11 Enterprise (x86-64) <br> • Windows 11 Pro (x86-64) | • Red Hat Enterprise Linux 10 (x86-64) <br> • Red Hat Enterprise Linux 10 (AArch64) <br> • Red Hat Enterprise Linux 9 (x86-64) <br> • Red Hat Enterprise Linux 9 (AArch64) <br> • Red Hat Enterprise Linux 8 (x86-64) <br> • Ubuntu 24.04 LTS (x86-64) | • 任何品牌的边缘服务器<br> • VMware <br> • Microsoft Hyper-V * <br> • Linux KVM * <br> • 任何虚拟机管理程序<br> • Docker容器<br> • Podman容器| • Amazon Web Services ( AWS )\ * \ * <br> • Microsoft Azure \ * \ * <br> • Google Cloud Platform ( GCP )\ * \ * <br> • 任何提供标准虚拟机实例的 IaaS 云平台   
  
_ * SafeKit同时支持应用层高可用性和虚拟机层高可用性。_

_ **虚拟 IP 地址必须在云负载均衡器级别进行配置。_

## 预构建应用程序模块{#pre-built-application-modules}

SafeKit包含即用型、预配置的`.safe`模块。它们分为两种高可用性策略： **应用高可用性** （使用mirror或`farm`模块进行直接应用集群）和**虚拟化高可用性** （使用hyperv.safe或kvm.safe进行虚拟机级集群）。

 |应用级高可用性|虚拟机级高可用性  
---|---|---  
配置 | 这需要对应用程序本身有技术上的了解：哪些服务需要重启，哪些特定的应用程序文件夹需要实时复制，以及如何配置用于故障转移的虚拟 IP 地址。 | 适用于任何在虚拟机中运行的应用程序/操作系统的通用解决方案。它不需要您对虚拟机中安装的应用程序有任何技术了解。如果您不了解应用程序的工作原理，这是最佳解决方案。您只需定义虚拟机文件的位置即可。  
非常适合 | 非常适合将高可用性直接嵌入到软件解决方案中，而无需考虑底层硬件或虚拟机管理程序。 | 非常适合通过单一高可用性策略管理跨多个虚拟机的多个应用程序的复杂环境。  
  
下表列出了所有可用的`.safe`模块：

应用高可用性（应用层集群） |虚拟化高可用性（虚拟机层集群）  
---|---  
新Windows应用 — mirror.safe | Hyper-V 虚拟机 — hyperv.safe ( Windows )  
新应用Linux — mirror.safe | KVM 虚拟机 — kvm.safe ( Linux )  
Windows负载均衡 — farm.safe | Docker容器 — mirror.safe ( Linux )  
Linux负载均衡 — farm.safe | Podman容器 — mirror.safe ( Linux )  
Microsoft SQL Server — sqlserver.safe ( Windows ) | Kubernetes / K3s — k3s.safe ( Linux )  
PostgreSQL — postgresql.safe ( Windows & Linux ) |博世 AMS — hyperv.safe ( Windows )  
MySQL — mysql.safe ( Windows和Linux ) |博世 BIS — hyperv.safe ( Windows )  
MariaDB — mysql.safe ( Windows和Linux ) |博世 BVMS — hyperv.safe ( Windows )  
Oracle — oracle.safe ( Windows和Linux ) |韩华 Vision — hyperv.safe ( Windows )  
Firebird — firebird.safe ( Windows & Linux ) |韩华威信网 — hyperv.safe ( Windows )  
Apache — apache_farm.safe ( Windows & Linux ) | Siemens Siveillance 套件 — hyperv.safe ( Windows )  
IIS — iis_farm.safe ( Windows ) | Siemens Desigo CC — hyperv.safe ( Windows )  
NGINX — farm.safe ( Windows & Linux ) | Siemens SiPass — hyperv.safe ( Windows )  
Milestone XProtect — milestone.safe ( Windows ) |西门子 SIPORT — hyperv.safe ( Windows )  
Nedap AEOS — nedap.safe ( Windows ) | SIMATIC PCS 7 — hyperv.safe ( Windows )  
Genetec ( SQL Server ) — sqlserver.safe ( Windows ) | SIMATIC WinCC — hyperv.safe ( Windows )  
西门子 Siveillance VMS — SiveillanceVMS.safe ( Windows ) |   
云（ AWS 、 Azure 、 GCP 、通用）— mirror.safe / farm.safe |   
  
## 架构与部署模型{#architecture-deployment-model}

### 两个集群模块： mirror.safe和farm.safe {#two-cluster-modules}

模块|模式|用例  
---|---|---  
mirror.safe |主备模式，支持同步字节级文件复制和自动故障转移|数据库、有状态应用程序、服务，每次只能在一台服务器上运行  
farm.safe |具有网络负载均衡和自动故障转移的双活架构| Web 服务器、无状态微服务、API 网关、同时在多台服务器上运行的服务  
  
### 集群基础设施与架构{#cluster-infrastructure-architecture}

需求/规格| SafeKit能力/价值  
---|---  
需要共享存储吗？ |不需要——采用无SAN的“无共享”架构，仅使用本地磁盘。  
是否需要 Active Directory (AD)？ | — 不需要Windows或 Active Directory。工作组完全受支持。  
集群大小| 2 个节点 ( mirror ) 或 2 个以上节点 ( `farm` )  
虚拟 IP (VIP) |是一个软件定义的 VIP，可通过免费 ARP 自动迁移到活动节点（应用层高可用性）。对于虚拟机级高可用性，虚拟机内部的物理 IP 地址会被透明地重新路由，无需 VIP。节点之间需要 LAN、VLAN 或扩展 VLAN。  
三节点混合架构| SafeKit涵盖了高可用性层：一个由两个节点组成的mirror集群，通过局域网或扩展 VLAN 连接，支持同步复制 (RPO=0) 和自动故障转移。第三方备份解决方案完善了该架构：第三个远程节点通过广域网进行异步复制，实现时间点恢复和勒索软件防护。  
高可用性| SafeKit利用同步复制来保证在硬件或软件故障期间实现即时故障转移，且数据零丢失。此外，由于它同时向两个节点写入数据，因此能够将逻辑错误、数据降级或意外删除等情况实时忠实地复制到备用节点。  
备份方案|的作用：备份方案（ SafeKit未实现）通过异步复制提供时间点恢复。它可以抵御高可用性 (HA) 无法阻止的数据完整性威胁（例如勒索软件或人为错误）。由于回滚数据本身会导致数据丢失，因此不支持自动故障转移。  
每个集群最多可同时运行 32 个|模块——此限制涵盖在双节点集群中同时管理的SafeKit模块的最大数量，通常用于虚拟机级别的高可用性 (HA)，其中每个模块复制并重启不同的虚拟机。每个模块都可以在任一节点上独立作为主模块运行，从而实现跨两个服务器的工作负载分配。注意：所有虚拟机的总数据量直接影响故障转移或节点重启后的重新同步时间。  
基于代理还是无代理？ |基于代理——在每个节点上安装轻量级软件  
与应用程序无关？ |是 — 可保护任何Windows服务或Linux守护进程；预构建模块支持 30 多个应用程序  
  
### 复制与数据保护{#replication-data-protection}

需求/规格| SafeKit能力/价值  
---|---  
复制方法|字节级文件复制（非块级磁盘复制）  
复制模式|同步（零数据丢失）  
网络要求|节点间往返延迟建议小于 5 毫秒（同步复制）  
建议数据量|几TB（重新同步时间）  
建议文件数| < 1,000,000 个文件（重新同步时间）  
重新同步速度（1 TB）： | 1 Gb/s 网络下约需 3 小时；10 Gb/s 网络下约需 1 小时  
选择性复制|是 — 复制特定目录/文件  
传输中加密|是 — 用于复制流量的 TLS/SSL  
  
## RPO 和 RTO 能力{#rpo-rto-capabilities}

### 按集群类型{#rto-rpo-cluster-type}的 RPO 和 RTO

指标| Mirror集群 ( mirror.safe ) | `Farm`集群 ( farm.safe )  
---|---|---  
RPO（恢复点目标） | 0（零数据丢失）— 同步复制；仅在两个节点确认后才确认写入| N/A（无状态；数据由后端处理） mirror  
恢复时间目标 (RTO) | ~1 分钟 — 心跳超时（默认 30 秒）+ 应用程序重启时间|几秒 — 流量立即重新分配到幸存的活动节点  
复制类型|同步、实时、字节级文件复制|不适用  
故障转移触发器|心跳丢失、进程崩溃或检查器故障时自动触发； |心跳丢失、进程崩溃或检查器故障时自动触发。  
需要人工干预？ |否 — 全自动故障转移和故障恢复|否 — 全自动故障转移和故障恢复  
  
### RTO 故障分析（ Mirror — 应用层高可用性） {#rto-breakdown-mirror-application-level-ha}

故障类型| RTO 计算  
---|---  
硬件故障|心跳超时（默认 30 秒）+ 应用程序重启时间  
软件/进程崩溃|应用程序停止时间 + 应用程序重启时间  
操作系统级崩溃|心跳超时 + 操作系统已在备用系统上运行 → 无重启惩罚  
  
### RTO 分解（ Mirror — 虚拟机级高可用性） {#rto-breakdown-mirror-vm-level-ha}

故障类型| RTO 计算  
---|---  
任何故障|故障检测 + 完全操作系统重启 + 应用程序重启（通常需要几分钟）  
  
## 边缘和分布式部署适用性{#edge-distributed-deployment-suitability}

SafeKit专为边缘、分支机构和分布式企业场景而设计。

边缘需求| SafeKit答案  
---|---  
现场无专职 IT 人员|是 — 自动故障转移，无需人工干预  
无 SAN/NAS 基础架构|是 — 无 SAN，仅本地磁盘  
远程管理|是 — Web 控制台管理  
低硬件占用|是 — 2 台标准服务器或虚拟机，无需特殊硬件  
可在防火墙/NAT 后运行|是 — 可配置端口，基于 HTTPS 的控制台  
多站点灾难恢复|是 — mirror位于两个地理位置之间，通过扩展的 VLAN 进行。  
OEM/嵌入式部署|是 — 静默安装、可编写脚本、可由软件发行商嵌入  
数百个分布式集群|是的——专为拥有众多分支机构的分布式企业而设计  
  
理想边缘计算应用场景：任何没有数据中心但仍需要高可用性的站点：

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
  
## 监控、管理和警报{#monitoring-management-alerting}

功能|详情  
---|---  
Web 控制台| Web 应用程序或渐进式 Web 应用程序 (PWA)；配置、监控和管理集群节点  
移动通知|浏览器推送状态变更通知  
状态时间线|模块状态和事件的可视化时间线  
电子邮件通知|内置电子邮件提醒代理  
CLI 管理|用于脚本编写和自动化的完整命令行界面  
日志管理|每个模块、每个脚本的日志文件；用于支持的调试快照  
第三方监控集成| SafeKit会自动将所有主要集群事件记录到Windows事件日志或Linux系统日志中，使任何监控平台（包括 Nagios、Zabbix、Splunk 和 SIEM 解决方案）都能收集这些事件并使用标准警报规则发出警报，而无需任何自定义开发。  
  
## 安全与合规{#security-compliance}

功能|详情  
---|---  
HTTPS 控制台访问|是 — Web 控制台的 TLS 证书  
用户身份验证|本地帐户、LDAP、基于 PKI/证书、OpenID Connect  
用户角色|管理员、控制和监控角色的可配置访问策略  
TCP 使用 TLS/SSL | （用于复制、Web 控制台、分布式命令），UDP 使用 AES-128-CBC + SHA256 对称加密（用于心跳、safeadmin 内部协议）；加密基于 openSSL 库。Web 服务基于 Apache。  
防病毒兼容性|已记录的排除路径  
作为一家欧洲公司，Eviden（Atos 集团）提供| ， SafeKit是一款独特的自主业务连续性和灾难恢复产品，适用于Windows和Linux将数据和故障转移基础设施完全保留在本地，无需依赖美国供应商，符合 NIS2 业务连续性和灾难恢复要求。  
  
## 许可模式{#licensing-model}

方面|详情  
---|---  
许可证类型|永久许可证（一次性购买），基于主机名  
许可证范围|每个服务器（节点）  
许可证激活|支持离线激活；激活许可证密钥无需互联网连接。  
免费试用|是 — 提供功能齐全的免费试用版  
免费一个月许可证|可用于概念验证  
  
## 支持与维护服务级别协议{#support-maintenance-slas}

### 标准支持与维护（包含在有效维护合同内） {#standard-support-maintenance-included-with-active-maintenance-contract}

服务|详情  
---|---  
支持门户网站|提供 24/7/365 全天候网络门户访问，最多可供 4 位指定技术联系人使用。  
在线客服时间： |上午 9:00 至 下午 5:00 欧洲支持中心，周一至周五  
事件确认|将在 4 个支持中心工作小时内完成  
更新和升级|所有服务包、更新和升级均包含在内，无需额外付费  
许可证密钥更换|在有效支持合同下，主机名变更时可以重新分配许可证密钥。许可证转移仅限于同一项目内的服务器更换，且须事先获得 Eviden 的书面同意。  
知识库访问权限|完全访问知识库文章、常见问题解答和在线文档  
应用程序启动/停止（不使用SafeKit |是 — 停止SafeKit ，并使用包装脚本来启动或停止应用程序。该包装脚本会调用应用程序的启动/停止脚本，并根据需要配置或移除虚拟 IP 地址。 
支持门户| <https://customercare.evidian.com>  
  
### 免费资源（无需合同） {#free-resources-no-contract-required}

资源|详情  
---|---  
AI 支持助手| [ SafeKit AI 聊天](</zh-hans/resources/safekit-support/#ai-support>)在 safekit.eviden.com 上使用，也可通过任何使用 safekit.eviden.com/ llms.txt的 LLM 使用。  
在线培训及认证|免费，自主学习，共 12 个视频（约 3 小时 40 分钟），完成课程后颁发证书  
文档|完整用户指南、发行说明、知识库、快速入门指南  
  
## 与替代方案{#comparison-vs-alternatives}的比较

标准| SafeKit | Microsoft故障转移集群 (WSFC) | VMware HA |开源*  
---|---|---|---|---  
共享存储（SAN/vSAN）需求|否| |是|否  
Windows支持|是|是|是|否  
Linux支持|是|否|是|是  
边缘/分支部署|优秀|复杂|复杂|复杂  
OEM 嵌入式| | | |否  
成本|永久按节点| Windows服务器 + SAN | vSphere 企业版 + SAN |高级集成服务  
设置复杂度|即插即用|高（AD、SAN、见证） |高（vCenter、共享存储） |高（碎片化产品）  
可维护性|单一产品，Web 控制台|高（需要 AD、SAN 专业知识） |高（依赖 vCenter） |高（需要维护多个独立产品）  
  
在*上，需要 6 个独立的开源项目——Corosync、Pacemaker、DRBD、Keepalived、STONITH 和 HAProxy——才能在Linux上复制SafeKit的功能集。而SafeKit Linux一个产品中实现了相同的功能，同时适用于Windows和Linux 。

## 快速参考链接{#quick-reference-links}

资源| URL  
---|---  
产品首页| <https://safekit.eviden.com>  
技术概述（包含文本和图表的 DOCX 文件） | 📘 [ https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx]( </wp-content/uploads/documents/safekit-technical-overview-en.docx> )  
免费试用| [ https://safekit.eviden.com/zh-hans/resources/safekit-free-trial/]( </zh-hans/resources/safekit-free-trial/> )  
获取报价| [ https://safekit.eviden.com/safekit-pricing/]( </safekit-pricing/> )  
支持门户| <https://customercare.evidian.com>  
免费AI支持| [ https://safekit.eviden.com/zh-hans/resources/safekit-support/]( </zh-hans/resources/safekit-support/> )  
免费培训和认证| 🎓 [ https://safekit.eviden.com/zh-hans/resources/safekit-on-line-training/]( </zh-hans/resources/safekit-on-line-training/> )  
联系我们| </contact-us-for-safekit/> [ https://safekit.eviden.com/contact-us-for-safekit/](  
  

{{%  insert-safekit-4-buttons-zh-hans  %}}