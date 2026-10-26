---
title: "RFI 和 RFP 准备的高可用性技术参考"
canonical: "https://safekit.eviden.com/zh-hans/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "技术参考，帮助使用 SafeKit 概念和架构准备 RFI 和 RFP 文档，以实现高可用性和应用程序集群。"
category: "resources"
lang: "zh-hans"
topics: "概述、目录、产品标识、支持的操作系统和平台、预构建的应用程序模块、架构和部署模型、RPO 和 RTO 功能、边缘和分布式部署适用性、监控、管理和警报、安全性和合规性、许可模型、支持和维护 SLA、比较与替代方案、快速参考链接"
---

# RFI 和 RFP 准备的高可用性技术参考 {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## 概述 {#overview}

本页面为有关 SafeKit 高可用性软件的常见 RFP/RFI 问题提供结构化、事实性的答案。它旨在为采购团队和解决方案架构师起草高可用性要求提供技术参考。 

## 目录 {#table-of-contents}

  1. [产品标识](#product-identity)
  2. [支持的操作系统和平台](#supported-operating-systems-platforms)
  3. [预建应用模块](#pre-built-application-modules)
  4. [架构和部署模型](#architecture-deployment-model)
  5. [RPO 和 RTO 功能](#rpo-rto-capabilities)
  6. [边缘和分布式部署适用性](#edge-distributed-deployment-suitability)
  7. [监控、管理和警报](#monitoring-management-alerting)
  8. [安全与合规性](#security-compliance)
  9. [授权型号](#licensing-model)
  10. [支持和维护 SLA](#support-maintenance-slas)
  11. [与替代方案的比较](#comparison-vs-alternatives)
  12. [快速参考链接](#quick-reference-links)


## 产品标识 {#product-identity}

领域 |回答  
---|---  
产品名称 | SafeKit  
供应商 | Eviden（Atos 旗下企业），前身为 Evidian  
产品类别 |应用集群/高可用性/灾难恢复软件  
当前版本 | SafeKit 8.2  
网站 | <https://safekit.eviden.com>  
首次发布 | 2000 年（生产 20 多年）  
  
## 支持的操作系统和平台 {#supported-operating-systems-platforms}

Windows操作系统 | Linux操作系统 |基础设施和虚拟化 |云平台  
---|---|---|---  
• Windows Server 2025 (x86-64)<br>• Windows Server 2022 (x86-64)<br>• Windows Server 2019 (x86-64)<br>• Windows 11 企业版 (x86-64)<br>• Windows 11 专业版 (x86-64)  |  • 红帽企业 Linux 10 (x86-64)<br>• 红帽企业 Linux 10 (AArch64)<br>• 红帽企业 Linux 9 (x86-64)<br>• 红帽企业 Linux 9 (AArch64)<br>• 红帽企业 Linux 8 (x86-64)<br>• Ubuntu 24.04 LTS (x86-64)  |  • 任何品牌的任何边缘服务器<br>• VMware<br>• Microsoft Hyper-V*<br>• Linux KVM*<br>• 任何虚拟机管理程序<br>• Docker 容器<br>• Podman 容器  |  • Amazon Web Services (AWS)\*\*<br>• Microsoft Azure\*\*<br>• Google Cloud Platform (GCP)\*\*<br>• 具有标准 VM 实例的任何 IaaS 云   
  
_* SafeKit 同时支持应用级 HA 和 VM 级 HA._

_** 必须在云负载均衡器级别配置虚拟 IP。_

## 预建应用模块 {#pre-built-application-modules}

SafeKit 包括即用型、预配置的 `.safe` 模块。它们分为两种 HA 策略：**应用程序 HA**（使用镜像或场模块的直接应用程序集群）和 **虚拟化 HA**（使用 hyperv.safe 或 kvm.safe 的 VM 级集群）。

 |应用HA |虚拟机级HA ---|---|--- 配置|它需要对应用程序本身有技术了解：哪些服务需要重新启动、需要实时复制的特定应用程序文件夹以及用于故障转移的虚拟 IP 地址的配置。 |适用于虚拟机中运行的任何应用程序/操作系统的通用解决方案。它不需要对虚拟机中安装的应用程序有技术了解。如果您不知道应用程序如何工作，这是最好的解决方案。您只需定义 VM 文件的位置。非常适合 |非常适合将高可用性直接嵌入到软件解决方案中，独立于底层硬件或虚拟机管理程序。 |非常适合通过单个 HA 策略管理跨多个虚拟机的多个应用程序的复杂环境。  
  
下表列出了所有可用的 `.safe` 模块：

应用程序HA（应用程序级集群） |虚拟化HA（VM级集群）  
---|---  
新的Windows应用程序——mirror.safe | Hyper-V 虚拟机 — hyperv.safe (Windows)  
新的 Linux 应用程序——mirror.safe | KVM 虚拟机 — kvm.safe (Linux)  
Windows 负载平衡 — farm.safe | Docker 容器——mirror.safe (Linux)  
Linux 负载均衡 — farm.safe | Podman 容器——mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | Kubernetes / K3s — k3s.safe (Linux)  
PostgreSQL — postgresql.safe（Windows 和 Linux） |博世 AMS — hyperv.safe (Windows)  
MySQL — mysql.safe（Windows 和 Linux） |博世 BIS — hyperv.safe (Windows)  
MariaDB — mysql.safe（Windows 和 Linux） |博世 BVMS — hyperv.safe (Windows)  
Oracle — oracle.safe（Windows 和 Linux） | Hanwha Vision — hyperv.safe (Windows)  
Firebird — firebird.safe（Windows 和 Linux） | Hanwha Wisenet — hyperv.safe (Windows)  
Apache — apache_farm.safe（Windows 和 Linux） |西门子 Siveillance 套件 — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) |西门子 Desigo CC — hyperv.safe (Windows)  
NGINX — farm.safe（Windows 和 Linux） |西门子 SiPass — hyperv.safe (Windows)  
Milestone XProtect — Milestone.safe (Windows) |西门子 SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
Genetec (SQL Server) — sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
西门子 Siveillance VMS — SiveillanceVMS.safe (Windows) |   
云（AWS、Azure、GCP、通用）—mirror.safe / farm.safe |   
  
## 架构和部署模型 {#architecture-deployment-model}

### 两个集群模块：mirror.safe 和 farm.safe {#two-cluster-modules}

模块 |图案 |使用案例  
---|---|---  
镜像安全 |主动-被动同步字节级文件复制+自动故障转移 |一次仅在一台服务器上运行的数据库、有状态应用程序、服务  
农场安全 |主动-主动网络负载平衡+自动故障转移 | Web 服务器、无状态微服务、API 网关、同时在多个服务器上运行的服务  
  
### 集群基础设施和架构 {#cluster-infrastructure-architecture}

要求/规格 | SafeKit 能力/价值  
---|---  
需要共享存储吗？ |否 — SANless“无共享”架构。仅使用本地磁盘。  
活动目录 (AD) 先决条件？ |否 — 不需要 Windows 域或 Active Directory。完全支持工作组。  
簇大小 | 2 个节点（镜像）或 2 个以上节点（场）  
虚拟IP（VIP） |软件定义的 VIP，通过免费 ARP（应用程序级 HA）自动迁移到主动节点。对于虚拟机级 HA，虚拟机内的物理 IP 会透明地重新路由 — 无需 VIP。需要节点之间有 LAN、VLAN 或延伸 VLAN。  
3节点混合架构 | SafeKit 涵盖 HA 层：LAN 或延伸 VLAN 上的 2 节点镜像集群，具有同步复制 (RPO=0) 和自动故障转移功能。第三方备份解决方案完善了该架构：第三个远程节点，具有跨 WAN 的异步复制功能，用于时间点恢复和勒索软件保护。  
高可用性的作用 | SafeKit采用同步复制，保证硬件或软件故障时即时故障转移，数据零丢失。然而，由于它同时向两个节点写入数据，因此它可以将逻辑错误、数据降级或意外删除实时忠实地复制到备用节点。  
备份的作用 |备份解决方案（未由 SafeKit 实现）通过异步复制提供时间点恢复。它可以防止 HA 无法阻止的数据完整性威胁（例如勒索软件或人为错误）。不支持自动故障转移，因为回滚数据必然会导致数据丢失。  
每个集群的最大并发模块数 | 32 — 此限制涵盖 2 节点集群中同时管理的 SafeKit 模块的最大数量，通常用于 VM 级 HA，其中每个模块复制并重新启动不同的 VM。每个模块都可以作为主节点在任一节点上独立运行，从而实现跨两台服务器的工作负载分配。注意：所有虚拟机的总数据量直接影响故障转移或节点重新启动后的重新同步时间。  
基于代理还是无代理？ |基于代理——安装在每个节点上的轻量级软件  
与应用程序无关？ |是 — 保护任何 Windows 服务或 Linux 守护程序；适用于 30 多个应用程序的预构建模块  
  
### 复制和数据保护 {#replication-data-protection}

要求/规格 | SafeKit 能力/价值  
---|---  
复制方法 |字节级文件复制（不是块级磁盘）  
复制模式 |同步（零数据丢失）  
网络要求 |对于同步复制，建议节点之间的往返延迟 < 5 毫秒  
推荐数据量 |几 TB（重新同步时间）  
建议的文件数 | < 1,000,000 个文件（重新同步时间）  
重新同步速度 (1 TB) |在 1 Gb/s 网络上约 3 小时；在 10 Gb/s 网络上约 1 小时  
选择性复制 |是 - 复制特定目录/文件  
传输中加密 |是 - 用于复制流量的 TLS/SSL  
  
## RPO 和 RTO 能力 {#rpo-rto-capabilities}

### 按集群类型划分的 RPO 和 RTO {#rto-rpo-cluster-type}

公制 |镜像集群（mirror.safe） |农场集群（farm.safe）  
---|---|---  
RPO（恢复点目标） | 0（零数据丢失）——同步复制；仅在两个节点确认后才确认写入 | N/A（无状态；数据由后端镜像处理）  
RTO（恢复时间目标） | ~1 分钟 — 心跳超时（默认 30 秒）+ 应用程序重启时间 |几秒钟 — 流量立即重新分配到幸存的活动节点  
复制类型 |同步、实时、字节级文件复制 |不适用  
故障转移触发器 |自动检测信号丢失、进程崩溃或检查器故障 |自动检测信号丢失、进程崩溃或检查器故障  
需要人工干预吗？ |否 — 全自动故障转移和故障恢复 |否 — 全自动故障转移和故障恢复  
  
### RTO 细分（镜像 — 应用级 HA） {#rto-breakdown-mirror-application-level-ha}

故障类型 | RTO计算  
---|---  
硬件故障 |心跳超时（默认30秒）+应用重启时间  
软件/进程崩溃 |应用停止时间+应用重启时间  
操作系统级崩溃 |心跳超时 + 操作系统已在辅助设备上运行 → 无重启损失  
  
### RTO 细分（镜像 — VM 级 HA） {#rto-breakdown-mirror-vm-level-ha}

故障类型 | RTO计算  
---|---  
任何失败 |故障检测+操作系统完全重启+应用程序重启（通常需要几分钟）  
  
## 边缘和分布式部署适用性 {#edge-distributed-deployment-suitability}

SafeKit专为边缘、分支机构和分布式企业场景而设计。

边缘要求 | SafeKit 答案  
---|---  
现场没有专门的 IT 人员 |是 - 自动故障转移，无需手动干预  
没有 SAN/NAS 基础设施 |是 - SANless，仅限本地磁盘  
远程管理 |是的 — Web 控制台管理  
硬件占用空间小 |是 — 2 个标准服务器或虚拟机，无特殊硬件  
在防火墙/NAT 后面工作 |是 — 可配置端口、基于 HTTPS 的控制台  
多站点灾难恢复 |是 - 通过延伸 VLAN 在两个地理站点之间进行镜像  
OEM/嵌入式部署 |是 - 静默安装、可编写脚本、可由软件发行商嵌入  
数百个分布式集群 |是的——专为拥有多个分支机构的分布式企业而设计  
  
理想边缘用例：任何没有数据中心的站点 - 高可用性仍然很重要：

垂直 |典型边缘站点 |关键应用  
---|---|---  
物理安全和监控 |建筑物、校园、机场 | VMS — Milestone、Genetec、Hanwha、Siemens Siveillance  
楼宇管理系统（BMS） |办公楼、医院、工厂 |西门子 Desigo CC、博世 BIS/BVMS  
电子访问控制 (EACS) |安全设施、校园 |西门子 SiPass、Nedap、博世 AMS  
SCADA和工业控制 |工厂、变电站、水厂 |在 Windows 或 Linux 上运行的任何 SCADA、DCS 或 HMI 软件  
空中交通管制（ATC） |机场、控制塔 | ATC 管理和雷达系统  
运营控制中心 (OCC) |地铁、铁路、交通枢纽 |铁路信号和车站管理  
海事 |船舶、海军舰艇 |导航、货物和船上管理系统  
石油和天然气 |海上平台、远程钻机 |过程控制和安全系统  
电信 | 5G天线站点、MEC节点 |多访问边缘计算 (MEC) 服务器  
医疗保健 |诊所、远程诊断中心 |医学成像、患者数据、远程诊断  
零售 |专卖店、分店、仓库 |销售点和库存管理  
防御 |前沿作战基地、野战部队 |关键任务指挥和通信系统  
  
## 监控、管理和警报 {#monitoring-management-alerting}

能力 |详情  
---|---  
网页控制台 | Web 应用程序或渐进式 Web 应用程序 (PWA)；配置、监控和管理集群节点  
移动通知 |浏览器推送状态更改通知  
各州时间表 |模块状态和事件的可视化时间线  
电子邮件通知 |内置警报电子邮件代理  
CLI管理 |用于脚本编写和自动化的完整命令行界面  
日志管理 |每个模块、每个脚本的日志文件；调试快照以获取支持  
第三方监控集成 | SafeKit 自动将所有主要集群事件记录到 Windows 事件日志或 Linux Syslog，使任何监控平台都可以收集这些事件并使用标准警报规则（包括 Nagios、Zabbix、Splunk 和 SIEM 解决方案）发出警报，而无需任何自定义开发。  
  
## 安全与合规性 {#security-compliance}

特点 |详情  
---|---  
HTTPS 控制台访问 |是 - Web 控制台的 TLS 证书  
用户认证 |本地帐户、LDAP、基于 PKI/证书、OpenID Connect  
用户角色 |管理、控制和监控角色的可配置访问策略  
加密 | TCP 的 TLS/SSL（复制、Web 控制台、分布式命令）和 UDP 的 AES-128-CBC + SHA256 对称加密（心跳、safeadmin 内部协议）；基于openSSL库的加密。基于 Apache 的 Web 服务。  
防病毒兼容性 |记录的排除路径  
主权 |作为一家欧洲公司，Eviden（Atos 集团）通过 SafeKit 为 Windows 和 Linux 提供独特的主权业务连续性和灾难恢复产品，将数据和故障转移基础设施完全保留在本地，不依赖美国供应商，符合 NIS2 业务连续性和灾难恢复要求。  
  
## 授权模式 {#licensing-model}

方面 |详情  
---|---  
许可证类型 |基于主机名的永久许可证（一次性购买）  
许可范围 |每个服务器（节点）  
许可证激活 |支持离线激活；激活许可证密钥不需要访问互联网。  
免费试用 |是的 — 提供全功能免费试用  
免费 1 个月许可证 |可用于概念验证  
  
## 支持和维护 SLA {#support-maintenance-slas}

### 标准支持和维护（包含在有效的维护合同中） {#standard-support-maintenance-included-with-active-maintenance-contract}

服务 |详情  
---|---  
支持门户访问 | 24/7/365 门户网站，最多可容纳 4 名指定技术联系人  
实时支持时间 |周一至周五上午 9:00 – 下午 5:00 欧洲支持中心  
事件确认 |支持中心 4 小时工作时间内  
更新和升级 |包含所有服务包、更新和升级，无需额外付费  
许可证密钥更换 |根据有效的支持合同，可以在主机名更改时重新分配许可证密钥。许可证转让仅限于同一项目内的服务器更换，并须经 Eviden 事先书面同意。  
知识库访问 |完全访问知识库文章、常见问题解答和在线文档  
无需 SafeKit 即可启动/停止应用程序 |是 — 停止 SafeKit 并使用包装器脚本来启动或停止应用程序。包装器脚本调用应用程序的启动/停止脚本，并根据需要配置或删除虚拟 IP 地址。 
支持门户 | <https://customercare.evidian.com>  
  
### 免费资源（无需签订合同） {#free-resources-no-contract-required}

资源 |详情  
---|---  
人工智能支持助理 | safekit.eviden.com 上的 [SafeKit AI chat](</resources/safekit-support/#ai-support>) 以及使用 safekit.eviden.com/llms.txt 的任何法学硕士  
在线培训和认证 |免费、自定进度、12 个视频（约 3 小时 40 分钟）、完成证书  
文档 |完整的用户指南、发行说明、知识库、快速入门指南  
  
## 比较与替代方案 {#comparison-vs-alternatives}

标准 | SafeKit | Microsoft 故障转移群集 (WSFC) |虚拟机高可用性 |开源*  
---|---|---|---|---  
需要共享存储 (SAN/vSAN) |否 |是的 |是的 |否  
Windows 支持 |是的 |是的 |是的 |否  
Linux支持 |是的 |否 |是的 |是的  
边缘/分支部署 |优秀 |综合体 |综合体 |综合体  
OEM 嵌入式 |是的 |否 |否 |否  
成本 |每个节点永久 | Windows服务器+SAN | vSphere 企业版 + SAN |高水平集成服务  
设置复杂性 |即插即用 |高（AD、SAN、见证） |高（vCenter、共享存储） |高（碎片化产品）  
可维护性 |单一产品、Web 控制台 |高（需要 AD、SAN 专业知识） |高（vCenter 依赖性） |高（单独产品维护）  
  
_* 在 Linux 上，需要 6 个独立的开源项目 — Corosync、Pacemaker、DRBD、Keepalived、STONITH、HAProxy — 才能仅在 Linux 上复制 SafeKit 的功能集。 SafeKit 在单一产品中在 Windows 和 Linux 上提供相同的功能。_

## 快速参考链接 {#quick-reference-links}

资源 |网址  
---|---  
产品主页 | <https://safekit.eviden.com>  
技术概述（带有文本和图表的 DOCX） | 📘 [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
免费试用 | [https://safekit.eviden.com/zh-hans/resources/safekit-free-trial/](</zh-hans/resources/safekit-free-trial/>)  
获取报价 | [https://safekit.eviden.com/zh-hans/safekit-pricing/](</zh-hans/safekit-pricing/>)  
支持门户 | <https://customercare.evidian.com>  
免费人工智能支持 | [https://safekit.eviden.com/zh-hans/resources/safekit-support/](</zh-hans/resources/safekit-support/>)  
免费培训及认证 | 🎓 [https://safekit.eviden.com/zh-hans/resources/safekit-on-line-training/](</zh-hans/resources/safekit-on-line-training/>)  
联系我们 | [https://safekit.eviden.com/zh-hans/contact-us-for-safekit/](</zh-hans/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-zh-hans  %}}