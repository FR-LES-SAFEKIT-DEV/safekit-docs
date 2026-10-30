---
title: "SafeKit RFI 和 RFP 文件技术参考"
canonical: "https://safekit.eviden.com/zh-hans/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "查找有关SafeKit技术信息，以便准备信息征询书 (RFI) 和提案征询书 (RFP)。了解其支持的系统、架构、恢复时间、安全性、许可和支持情况。"
category: "resources"
lang: "zh-hans"
topics: "概述, 目录, 产品信息, 支持的操作系统和平台, SafeKit 高可用性限制, 预配置应用程序模块, 架构和部署, 数据丢失和恢复时间（RPO 和 RTO）, 远程站点和分布式部署, 监控、管理和警报, 安全与合规, 许可, 支持和维护, 与其他解决方案的比较, 实用链接"
---

# SafeKit技术参考资料（RFI 和 RFP 文件） {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## 概述 {#overview}

您可以使用此页面准备信息征询书 (RFI) 或提案征询书 (RFP)。它解答了有关SafeKit高可用性软件的常见技术问题。这些信息有助于采购团队和解决方案架构师定义他们的需求。

## 目录 {#table-of-contents}

  1. [产品信息](#product-identity)
  2. [支持的操作系统和平台](#supported-operating-systems-platforms)
  3. [SafeKit 高可用性限制](#safekit-ha-limitations)
  4. [预配置应用程序模块](#pre-built-application-modules)
  5. [架构和部署](#architecture-deployment-model)
  6. [数据丢失和恢复时间（RPO 和 RTO）](#rpo-rto-capabilities)
  7. [远程站点和分布式部署](#edge-distributed-deployment-suitability)
  8. [监控、管理和警报](#monitoring-management-alerting)
  9. [安全与合规](#security-compliance)
  10. [许可](#licensing-model)
  11. [支持和维护](#support-maintenance-slas)
  12. [与其他解决方案的比较](#comparison-vs-alternatives)
  13. [实用链接](#quick-reference-links)


## 产品信息 {#product-identity}

场地 | 回答  
---|---  
产品名称 | SafeKit  
小贩 | Eviden，隶属于Atos集团。前身为Evidian。  
软件开发 | 由法国开发。
产品类别 | 用于应用程序集群、高可用性和灾难恢复的软件  
当前版本 | SafeKit 8.2  
网站 | [https://safekit.eviden.com/zh-hans/](</zh-hans/>)  
首发版 | 2000年。已在生产中使用超过20年。  
  
## 支持的操作系统和平台 {#supported-operating-systems-platforms}

Windows操作系统 | Linux操作系统 | 基础设施和虚拟化 | 云平台  
---|---|---|---  
• Windows Server 2025 (x86-64)<br> • Windows Server 2022 (x86-64)<br> • Windows Server 2019 (x86-64)<br> • Windows 11 企业版 (x86-64)<br> • Windows 11 专业版 (x86-64)  |  • 红帽企业版 Linux 10 (x86-64)<br> • 红帽企业 Linux 10 (AArch64)<br> • 红帽企业 Linux 9 (x86-64)<br> • 红帽企业 Linux 9 (AArch64)<br> • 红帽企业 Linux 8 (x86-64)<br> • Ubuntu 24.04 LTS (x86-64)  |  • 任何品牌的任何边缘服务器<br>• VMware<br> • Microsoft Hyper-V [1]<br> • Linux KVM [1]<br> • 任何虚拟机管理程序<br>• Docker容器<br>• Podman 容器  |  • 亚马逊网络服务 (AWS) [2]<br> • Microsoft Azure [2]<br> • Google Cloud Platform (GCP) [2]<br> • 任何具有标准虚拟机实例的 IaaS 云   
  
**[1]** SafeKit为单个应用程序或整个虚拟机提供高可用性。

**[2]**在云端，在云负载均衡器上配置虚拟 IP 地址。

{{%  insert-safekit-usage-zh-hans  %}}

## 预配置应用程序模块 {#pre-built-application-modules}

SafeKit包含即用型`.safe`模块。有两种方式可以保护应用程序。**应用程序高可用性**使用mirror或<span class="notranslate farm-term" translate="no">farm</span>模块直接保护应用程序。**虚拟机高可用性**使用hyperv.safe或kvm.safe模块保护整个虚拟机。

比较标准 | 应用高可用性 | 虚拟机高可用性  
---|---|---  
配置 | 您必须知道要重启哪些应用程序服务以及要复制哪些文件夹。您还必须配置用于故障转移的虚拟 IP 地址。 | 您只需指定虚拟机文件的位置即可，无需了解虚拟机内部应用程序的运行机制。这种方法可以同时保护应用程序和操作系统。  
推荐用途 | 直接为软件解决方案添加高可用性，而无需依赖特定的硬件或特定的虚拟机管理程序。 | 使用一个高可用性策略管理跨多个虚拟机的多个应用程序。  
  
下表列出了所有可用的`.safe`模块：

应用高可用性 | 虚拟机高可用性  
---|---  
全新 Windows 应用 — mirror.safe | Hyper-V 虚拟机 — hyperv.safe （Windows）  
新的 Linux 应用mirror.safe | KVM 虚拟机 — kvm.safe （Linux）  
Windows 负载均衡 — farm.safe | Docker 容器 — mirror.safe （Linux）  
Linux 负载均衡 — farm.safe | Podman 容器 — mirror.safe （Linux）  
Microsoft SQL Server — sqlserver.safe （Windows） | Kubernetes / K3s — k3s.safe (Linux)  
PostgreSQL — postgresql.safe （Windows 和 Linux） | 博世 AMS — hyperv.safe （Windows）  
MySQL — mysql.safe （Windows 和 Linux） | 博世 BIS — hyperv.safe (Windows)  
MariaDB — mysql.safe （Windows 和 Linux） | 博世 BVMS — hyperv.safe （Windows）  
Oracle — oracle.safe （Windows 和 Linux） | Hanwha Vision — hyperv.safe （Windows）  
Firebird — firebird.safe （Windows 和 Linux） | Hanwha Wisenet — hyperv.safe （Windows）  
Apache — apache_farm.safe （Windows 和 Linux） | 西门子 Siveillance 套件 — hyperv.safe （Windows）  
IIS — iis_farm.safe （Windows） | Siemens Desigo CC — hyperv.safe （Windows）  
NGINX — farm.safe （Windows 和 Linux） | Siemens SiPass — hyperv.safe （Windows）  
Milestone XProtect — milestone.safe （Windows） | 西门子 SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe （Windows）  
Genetec（SQL Server）— sqlserver.safe （Windows） | SIMATIC WinCC — hyperv.safe （Windows）  
Siemens Siveillance VMS — SiveillanceVMS.safe （Windows） |   
云平台（AWS、Azure、GCP、通用平台）—— mirror.safe / farm.safe |   
  
## 架构和部署 {#architecture-deployment-model}

### 两个集群模块： mirror.safe和farm.safe {#two-cluster-modules}

模块 | 工作原理 | 典型应用  
---|---|---  
mirror.safe | 一台服务器处于活动状态，另一台处于备用状态。文件以字节为单位同步复制。故障转移是自动的。 | 数据库、存储状态的应用程序以及每次只能在一台服务器上运行的服务  
farm.safe | 多台服务器同时运行。SafeKit SafeKit在这些服务器之间分配网络流量并自动处理故障转移。 | Web 服务器、无状态微服务、API 网关以及同时在多台服务器上运行的服务  
  
### 集群基础设施 {#cluster-infrastructure-architecture}

要求 | SafeKit功能  
---|---  
需要共享存储吗？ | 不， SafeKit使用本地磁盘，不需要 SAN 或共享存储。  
需要 Active Directory 吗？ | 不， SafeKit不需要 Windows 域或 Active Directory，它也支持工作组。  
簇大小 | 2 个节点（ mirror ）或 2 个以上节点（ <span class="notranslate farm-term" translate="no">farm</span> ）  
虚拟IP地址（VIP） | 为了实现应用的高可用性，虚拟 IP 地址会通过免费 ARP 自动切换到活动节点。为了实现虚拟机的高可用性，发往虚拟机内部 IP 地址的流量会被自动重定向，无需单独的虚拟 IP 地址。节点必须共享一个跨站点扩展的 LAN 或 VLAN。  
具有三个节点的架构 | SafeKit在局域网 (LAN) 或跨站点扩展的虚拟局域网 (VLAN) 上运行双节点mirror集群。它提供零数据丢失 (RPO=0) 的同步复制和自动故障转移。一个独立的备份产品通过广域网 (WAN) 将数据异步复制到第三个节点。此备份允许将数据恢复到之前的时间点，并提供针对勒索软件的保护。  
高可用性的目的 | SafeKit会将数据同步复制到两个节点。这样，在硬件或软件故障后，即可实现自动故障转移，且不会丢失数据。但是，逻辑错误、数据损坏和意外删除也会立即复制到备用节点。  
备份的目的 | 备份功能允许您从较早的时间点恢复数据。此功能由独立的备份产品（而非SafeKit ）通过异步复制提供。备份有助于从勒索软件攻击和人为错误中恢复数据。此恢复并非自动故障转移。恢复较早的备份会丢失该备份之后所做的更改。  
同时运行的最大模块数 | 双节点集群最多可同时管理 32 个模块。为了保护虚拟机，每个模块都会复制并重启不同的虚拟机。每个模块都可以在任一节点上担任主模块，因此两台服务器可以分担工作负载。数据总量会影响故障转移或节点重启后的重新同步时间。  
每个节点需要安装哪些软件？ | 是的。每个节点上都安装了一个轻量级软件。  
支持的应用程序 | SafeKit可以保护任何 Windows 服务或 Linux 守护进程。预配置模块适用于 30 多种应用程序。  
  
### 复制和数据保护 {#replication-data-protection}

要求 | SafeKit功能  
---|---  
复制方法 | SafeKit以字节为单位复制文件更改，而不是复制磁盘块。  
复制模式 | 同步复制，零数据丢失  
网络要求 | 对于同步复制，建议节点间的往返延迟低于 5 毫秒。  
建议数据量 | 几TB的数据，以保证重新同步时间可控。  
建议文件数量 | 文件数量少于 100 万个，以控制重新同步时间。  
需要重新同步 1TB 数据 | 在 1 Gb/s 网络上大约需要 3 小时，在 10 Gb/s 网络上大约需要 1 小时。  
选择性复制 | 您可以选择要复制的目录和文件。  
传输过程中的加密 | 复制流量使用 TLS/SSL 加密。  
  
## 数据丢失和恢复时间（RPO 和 RTO） {#rpo-rto-capabilities}

### 每种集群类型的 RPO 和 RTO {#rto-rpo-cluster-type}

指标 | Mirror （ mirror.safe ） | <span class="notranslate farm-term" translate="no">Farm</span> （ farm.safe ）  
---|---|---  
RPO（恢复点目标） | 零数据丢失。写入操作只有在两个节点都确认后才算完成。 | 不适用于无状态服务。数据由单独的mirror集群管理。  
RTO（恢复时间目标） | 大约一分钟。这包括<span class="notranslate farm-term" translate="no">heartbeat</span>超时时间（默认为 30 秒）和应用程序重启时间。 | 几秒钟后，流量将被重新分配到其余的活动节点。  
复制类型 | 同步、实时、字节级文件复制 | 不适用  
故障转移触发器 | 当<span class="notranslate farm-term" translate="no">heartbeats</span>停止、进程崩溃或检查器检测到故障时，会自动执行此操作。 | 当<span class="notranslate farm-term" translate="no">heartbeats</span>停止、进程崩溃或检查器检测到故障时，会自动执行此操作。  
需要人工干预吗？ | 不，故障转移和故障恢复都是自动的。 | 不，故障转移和故障恢复都是自动的。  
  
### 受mirror集群保护的应用程序的恢复时间 {#rto-breakdown-mirror-application-level-ha}

故障类型 | 恢复时间的计算方法  
---|---  
硬件故障 | <span class="notranslate farm-term" translate="no">Heartbeat</span>超时（默认 30 秒），随后应用程序重启  
软件或进程崩溃 | 停止应用程序的时间，然后重新启动应用程序。  
操作系统崩溃 | <span class="notranslate farm-term" translate="no">Heartbeat</span>超时。备用服务器上的操作系统已在运行，因此无需重启。  
  
### 受mirror集群保护的虚拟机的恢复时间 {#rto-breakdown-mirror-vm-level-ha}

故障类型 | 恢复时间的计算方法  
---|---  
任何故障 | 需要检测故障，重启虚拟机操作系统，然后重新启动应用程序。这通常需要几分钟时间。  
  
## 远程站点和分布式部署 {#edge-distributed-deployment-suitability}

SafeKit专为远程站点、分支机构和拥有众多地点的组织而设计。

远程站点的要求 | SafeKit功能  
---|---  
现场没有专门的IT人员。 | 故障转移是自动的，无需人工操作。  
没有SAN或NAS。 | SafeKit使用本地磁盘，不需要共享存储。  
远程管理 | 通过 Web 控制台管理集群。  
硬件有限 | 两台标准服务器或虚拟机就足够了，无需特殊硬件。  
防火墙和网络地址转换 (NAT) | 端口可以配置。Web 控制台使用 HTTPS。  
站点间的灾难恢复 | mirror集群可以通过连接两个站点的 VLAN 来连接这两个站点。  
软件发行商的整合 | 软件发行商可以将SafeKit集成到他们的产品中。安装过程无需用户交互，并且可以通过脚本实现自动化。  
多个站点上的数百个集群 | SafeKit是为拥有众多分支机构的组织设计的。  
  
即使没有数据中心，以下网站也需要高可用性：

行业 | 典型站点 | 关键应用  
---|---|---  
实体安防与监控 | 建筑物、校园、机场 | VMS——Milestone、Genetec、韩华、西门子Siveillance  
楼宇管理系统（BMS） | 办公楼、医院、工厂 | 西门子 Desigo CC、博世 BIS/BVMS  
电子门禁系统（EACS） | 安全的设施和校园 | 西门子 SiPass、Nedap、博世 AMS  
SCADA及工业控制 | 工厂、变电站、水厂 | 任何运行在 Windows 或 Linux 上的 SCADA、DCS 或 HMI 软件  
空中交通管制（ATC） | 机场、控制塔 | 空中交通管制管理和雷达系统  
运行控制中心（OCC） | 地铁、铁路、交通枢纽 | 铁路信号和车站管理  
海上 | 舰船，海军舰艇 | 导航、货物和船载管理系统  
石油和天然气 | 海上平台，远程钻井平台 | 过程控制和安全系统  
电信 | 5G天线站点，MEC节点 | 多接入边缘计算 (MEC) 服务器  
卫生保健 | 诊所、远程诊断中心 | 医学影像、患者数据、远程诊断  
零售 | 商店、分店、仓库 | 销售点和库存管理  
防御 | 前沿作战基地、野战部队 | 任务关键型指挥和通信系统  
  
## 监控、管理和警报 {#monitoring-management-alerting}

能力 | 细节  
---|---  
Web控制台 | 通过 Web 应用程序或渐进式 Web 应用程序 (PWA) 配置、监控和管理集群节点。  
移动通知 | 当模块状态发生变化时，接收浏览器通知。  
时间线 | 按时间顺序查看模块状态变更和事件。  
电子邮件通知 | 内置的电子邮件代理会发送警报。  
命令行界面 | 使用命令行界面编写脚本并实现任务自动化。  
日志管理 | 每个模块和脚本都有自己的日志文件。模块<span class="notranslate farm-term" translate="no">snapshots</span>有助于支持团队调查问题。  
与监控工具集成 | SafeKit会将集群中的主要事件记录到 Windows 事件日志或 Linux 系统日志中。监控工具可以收集这些事件，并根据标准规则触发警报。它无需自定义开发即可与 Nagios、Zabbix、Splunk 和 SIEM 工具配合使用。  
  
## 安全与合规 {#security-compliance}

特征 | 细节  
---|---  
HTTPS | TLS证书保护对Web控制台的访问。  
用户身份验证 | 本地帐户、LDAP、证书（PKI）和 OpenID Connect  
用户角色 | 配置管理、控制和监控的访问策略。  
加密 | TCP 流量使用 TLS/SSL 进行数据复制、Web 控制台和分布式命令通信。UDP 流量使用 AES-128-CBC 加密，并使用 SHA256 进行<span class="notranslate farm-term" translate="no">heartbeats</span>和内部 safeadmin 协议通信。SafeKit 使用SafeKit库进行加密，并使用 Apache 提供 Web 服务。  
杀毒软件 | 文档列出了要从杀毒软件扫描中排除的路径。  
主权 | SafeKit由 Atos 集团旗下的 Eviden SafeKit在法国开发。它可在保护 Windows 和 Linux 应用程序的同时，确保您的数据和服务器保留在您自己的本地环境中。SafeKit 有助于满足欧盟 NIS2 指令关于业务连续性和灾难恢复的要求。
  
## 许可 {#licensing-model}

方面 | 细节  
---|---  
许可证类型 | 永久许可证只需购买一次，并与主机名绑定。  
许可范围 | 每个服务器（节点）一个许可证  
许可证激活 | 无需联网即可激活许可证密钥。  
免费试用 | 免费试用版包含所有功能。  
免费一个月许可 | 可用于概念验证测试  
  
## 支持和维护 {#support-maintenance-slas}

### 包含有效维护合同的标准支持和维护服务 {#standard-support-maintenance-included-with-active-maintenance-contract}

服务 | 细节  
---|---  
支持门户访问 | 该网络门户全年无休，每天24小时开放，最多可供四位指定的技术联系人使用。  
在线客服时间 | 周一至周五，上午 9:00 至下午 5:00，欧洲支持中心  
事件确认 | 支持中心将在四个工作小时内回复。  
更新和升级 | 所有服务包、更新和升级均包含在内，无需额外付费。  
许可证密钥替换 | 在有效支持合同的约束下，主机名变更时可以重新分配许可证密钥。转移仅限于在同一项目内替换服务器。需事先获得 Eviden 的书面批准。  
知识库访问 | 可全面访问知识库文章、常见问题解答和在线文档  
紧急程序 | SafeKit提供了一个包装脚本，用于在不使用SafeKit高可用性功能的情况下启动或停止应用程序。该脚本会调用应用程序的启动和停止脚本，并在需要时添加或删除虚拟 IP 地址。  
支持门户 | <https://customercare.evidian.com>  
  
### 免费资源，无需支持合同 {#free-resources-no-contract-required}

资源 | 细节  
---|---  
人工智能助手 | 请访问 safekit.eviden.com 使用[SafeKit AI 聊天功能](</zh-hans/resources/safekit-support/#ai-support>)。   
在线培训和认证 | [您可以按照自己的节奏学习，](</zh-hans/resources/safekit-on-line-training/>)观看总时长约4小时的免费视频。完成培训后，您将获得证书。  
文档 | 用户指南、发行说明、知识库和快速安装指南[请点击此处。](</zh-hans/resources/safekit-free-trial/>)  
  
## 与其他解决方案的比较 {#comparison-vs-alternatives}

标准 | SafeKit | Microsoft故障转移群集（WSFC） | VMware HA | 开源[1]  
---|---|---|---|---  
需要共享存储（SAN/vSAN）。 | 不 | 是的 | 是的 | 不  
Windows 支持 | 是的 | 是的 | 是的 | 不  
Linux 支持 | 是的 | 不 | 是的 | 是的  
远程站点部署 | 出色的 | 复杂的 | 复杂的 | 复杂的  
原厂设备制造商 | 是的 | 不 | 不 | 不  
成本 | 每个节点的永久许可证 | Windows Server 和 SAN | vSphere Enterprise 和 SAN | 高级集成服务  
设置复杂性 | 准备配置和使用 | 高优先级：Active Directory、SAN 和见证配置 | 高：vCenter 和共享存储配置 | 高：需要配置多个独立产品  
行政 | 一款通过 Web 控制台管理的产品 | 高：具备 Active Directory 和 SAN 专业知识 | 高：对 vCenter 的依赖性 | 高：需要维护的几个独立产品  
  
**[1]**在 Linux 系统上，需要六个独立的开源项目才能提供相同的功能集：Corosync、Pacemaker、DRBD、Keepalived、STONITH 和 HAProxy。SafeKit 将这些功能集成到一个产品中SafeKit同时支持 Windows 和 Linux 系统。

## 实用链接 {#quick-reference-links}

资源 | URL  
---|---  
产品首页 | [https://safekit.eviden.com/zh-hans/](</zh-hans/>)  
技术概述（包含文字和图表的 Word 文档） | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
免费试用 | [https://safekit.eviden.com/zh-hans/resources/safekit-free-trial/](</zh-hans/resources/safekit-free-trial/>)  
获取报价 | [https://safekit.eviden.com/zh-hans/safekit-pricing/](</zh-hans/safekit-pricing/>)  
支持门户 | <https://customercare.evidian.com>  
免费人工智能支持 | [https://safekit.eviden.com/zh-hans/resources/safekit-support/](</zh-hans/resources/safekit-support/>)  
免费培训和认证 | [https://safekit.eviden.com/zh-hans/resources/safekit-on-line-training/](</zh-hans/resources/safekit-on-line-training/>)  
联系我们 | [https://safekit.eviden.com/zh-hans/contact-us-for-safekit/](</zh-hans/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-zh-hans  %}}
