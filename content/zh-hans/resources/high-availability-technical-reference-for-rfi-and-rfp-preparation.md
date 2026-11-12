---
title: "SafeKit 技术参考：RFI 和 RFP 文件"
canonical: "https://safekit.eviden.com/zh-hans/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "查找有关 SafeKit 技术信息，以准备信息请求 (RFI) 和建议请求 (RFP)。了解支持的系统、架构、恢复时间、安全性、许可和支持。"
category: "resources"
lang: "zh-hans"
topics: "概述、目录、产品信息、支持的操作系统和平台、SafeKit 高可用性限制、预配置的应用程序模块、架构与部署、数据丢失和恢复时间（RPO 和 RTO）、远程站点和分布式部署、监控和警报、安全与合规、许可、支持与维护、与其他解决方案的比较、实用链接"
translation: "translate_md 2026-11-11.5 | glossaire 2026-11-11.10 | Translation LLM | 50 expressions"
---

# SafeKit 技术参考，适用于 RFI 和 RFP 文件 {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## 概述 {#overview}

使用此页面准备信息请求 (RFI) 或提案请求 (RFP)。它回答了有关 SafeKit 高可用性软件的常见技术问题。这些信息有助于采购团队和解决方案架构师定义其要求。

## 目录 {#table-of-contents}

  1. [产品信息](#product-identity)
  2. [支持的操作系统和平台](#supported-operating-systems-platforms)
  3. [SafeKit 高可用性限制](#safekit-ha-limitations)
  4. [预配置的应用程序模块](#pre-built-application-modules)
  5. [架构与部署](#architecture-deployment-model)
  6. [数据丢失和恢复时间（RPO 和 RTO）](#rpo-rto-capabilities)
  7. [远程站点和分布式部署](#edge-distributed-deployment-suitability)
  8. [监控和警报](#monitoring-management-alerting)
  9. [安全与合规](#security-compliance)
  10. [许可](#licensing-model)
  11. [支持与维护](#support-maintenance-slas)
  12. [与其他解决方案的比较](#comparison-vs-alternatives)
  13. [实用链接](#quick-reference-links)


## 产品信息 {#product-identity}

主题 | 详情  
---|---  
产品名称 | SafeKit  
供应商 | Eviden，Atos 集团旗下公司。前身为 Evidian。  
开发国家/地区 | 法国  
产品类别 | 用于应用程序集群、高可用性和灾难恢复的软件  
当前版本 | SafeKit 8.2  
网站 | [https://safekit.eviden.com](/zh-hans/)  
首次发布 | 2000 年。已用于生产 20 多年。  
  
{{%  insert-supported-os-zh-hans  %}}

{{%  insert-safekit-usage-zh-hans  %}}

## 预配置的应用程序模块 {#pre-built-application-modules}

SafeKit 包含即用型 `.safe` 模块。保护应用程序有两种方式。**应用程序高可用性**通过 mirror 或 <span class="notranslate farm-term" translate="no">farm</span> 模块直接保护应用程序。**虚拟机高可用性**通过 hyperv.safe 或 kvm.safe 模块保护整个虚拟机。

比较标准 | 应用高可用性 | 虚拟机高可用性  
---|---|---  
配置 | 您必须知道要重新启动哪些应用程序服务以及要复制哪些文件夹。您还必须配置用于故障转移的虚拟 IP 地址。 | 您只需要指定虚拟机文件的位置。您无需了解虚拟机内的应用程序如何工作。这种方法可以同时保护应用程序和操作系统。  
推荐用途 | 将高可用性直接添加到软件解决方案中，而无需依赖特定的硬件或特定的虚拟机管理程序。 | 使用一个高可用性策略管理多个虚拟机上的多个应用程序。  
  
下表列出了所有可用的 `.safe` 模块：

应用高可用性 | 虚拟机高可用性  
---|---  
全新 Windows 应用 — mirror.safe | Hyper-V 虚拟机 — hyperv.safe (Windows)  
新的 Linux 应用 — mirror.safe | KVM 虚拟机 — kvm.safe (Linux)  
Windows 负载均衡 — farm.safe | Docker 容器 — mirror.safe (Linux)  
Linux 负载均衡 — farm.safe | Podman 容器 — mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | K3s Kubernetes — k3s.safe (Linux)  
PostgreSQL — postgresql.safe（Windows 和 Linux） | Bosch AMS — hyperv.safe (Windows)  
MySQL — mysql.safe（Windows 和 Linux） | Bosch BIS — hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows 和 Linux) | Bosch BVMS — hyperv.safe (Windows)  
Oracle — oracle.safe (Windows 和 Linux) | Hanwha Vision — hyperv.safe (Windows)  
Firebird — firebird.safe (Windows 和 Linux) | Hanwha Wisenet — hyperv.safe (Windows)  
Apache — apache_farm.safe (Windows 和 Linux) | Siemens Siveillance 套件 — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | Siemens Desigo CC — hyperv.safe (Windows)  
NGINX — farm.safe（Windows 和 Linux） | Siemens SiPass — hyperv.safe (Windows)  
Milestone XProtect — milestone.safe (Windows) | Siemens SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
Genetec (SQL Server) — sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
Siemens Siveillance VMS — SiveillanceVMS.safe (Windows) |   
云（AWS、Azure、GCP、通用）— mirror.safe/farm.safe |   
  
## 架构与部署 {#architecture-deployment-model}

### 两个集群模块：mirror.safe 和 farm.safe {#two-cluster-modules}

模块 | 工作原理 | 典型应用  
---|---|---  
mirror.safe | 一台服务器处于活动状态，另一台处于待机状态。文件以字节级别同步复制。故障转移是自动的。 | 数据库、存储状态的应用程序以及一次只能在一台服务器上运行的服务  
farm.safe | 多个服务器同时运行。SafeKit 在它们之间网络流量并自动处理故障转移。 | Web 服务器、无状态微服务、API 网关以及同时在多个服务器上运行的服务  
  
### 集群基础设施 {#cluster-infrastructure-architecture}

要求 | SafeKit 功能  
---|---  
需要共享存储吗？ | 不需要 SafeKit 使用本地磁盘，不需要 SAN 或共享存储。  
需要 Active Directory 吗？ | 不需要 SafeKit 不要求 Windows 域或 Active Directory。它也支持工作组。  
集群中的节点数 | 2 个节点（mirror）或 2 个以上节点（<span class="notranslate farm-term" translate="no">farm</span>）  
虚拟 IP 地址（VIP） | 对于应用程序高可用性，虚拟 IP 地址通过免费 ARP 自动移动到活动节点。对于虚拟机高可用性，流向虚拟机内部 IP 地址的流量会自动重定向。不需要单独的虚拟 IP 地址。节点必须共享 LAN 或在站点之间扩展的 VLAN。  
三节点架构 | SafeKit 在 LAN 或跨站点扩展的虚拟局域网（VLAN）上运行双节点 mirror 集群。它提供零数据丢失（RPO = 0）的同步复制和自动故障转移。单独的备份产品通过广域网（WAN）将数据异步复制到第三个节点。此备份允许恢复到更早的时间点，并提供针对勒索软件的保护。  
高可用性的目的 | SafeKit 将数据同步复制到两个节点。这样，在硬件或软件出现故障后，可以自动进行故障转移，而不会丢失数据。但是，逻辑错误、数据损坏和意外删除也会立即复制到备用节点。  
备份的目的 | 备份允许您从较早的时间点恢复数据。一个单独的备份产品（而不是 SafeKit）通过异步复制提供此保护。备份有助于从勒索软件和人为错误中恢复。此恢复不是自动故障转移。恢复较旧的备份会丢失该备份之后所做的更改。  
同时运行的最大模块数 | 双节点集群可以同时管理多达 32 个模块。对于虚拟机保护，每个模块都会复制并重新启动不同的虚拟机。每个模块都可以在任一节点上作为主模块，因此两台服务器可以分担工作负载。数据总量会影响故障转移或节点重新启动后的重新同步时间。  
每个节点都安装了软件吗？ | 是的。每个节点上都安装了一个轻量级软件。  
支持的应用程序 | SafeKit 可以保护任何 Windows 服务或 Linux 守护进程。预配置模块适用于 30 多种应用程序。  
  
### 复制和数据保护 {#replication-data-protection}

要求 | SafeKit 功能  
---|---  
复制方法 | SafeKit 以字节级别复制文件更改，而不复制磁盘块。  
复制模式 | 同步复制，零数据丢失  
网络要求 | 建议节点之间的往返延迟低于 5 毫秒，以实现同步复制。  
推荐数据量 | 几 TB，以使重新同步时间保持在可控范围内  
建议的文件数量 | 文件数量少于 1,000,000 个，以使重新同步时间保持在可控范围内  
1 TB 的重新同步时间 | 在 1 Gb/s 网络上大约需要 3 小时，在 10 Gb/s 网络上大约需要 1 小时  
选择性复制 | 您可以选择要复制的目录和文件。  
传输过程中的加密 | 复制流量使用 TLS/SSL 进行加密。  
  
## 数据丢失和恢复时间（RPO 和 RTO） {#rpo-rto-capabilities}

### 每种集群类型的 RPO 和 RTO {#rto-rpo-cluster-type}

公制 | Mirror (mirror.safe) | <span class="notranslate farm-term" translate="no">Farm</span> (farm.safe)  
---|---|---  
恢复点目标 (RPO) | 零数据丢失。只有在两个节点都写入数据后，写入操作才算完成。 | 不适用于无状态服务。数据由单独的 mirror 集群管理。  
RTO（恢复时间目标） | 大约一分钟。这包括<span class="notranslate farm-term" translate="no">心跳</span>超时（默认为 30 秒）和重新启动应用程序的时间。 | 几秒钟后，流量将重新分配给其余的活动节点。  
复制类型 | 同步、实时、字节级文件复制 | 不适用  
故障转移触发器 | 当<span class="notranslate farm-term" translate="no">心跳</span>消息停止、进程崩溃或检查器检测到故障时，故障转移会自动启动 | 当<span class="notranslate farm-term" translate="no">心跳</span>消息停止、进程崩溃或检查器检测到故障时，故障转移会自动启动  
需要手动干预吗？ | 否。故障转移和故障恢复是自动的。 | 否。故障转移和故障恢复是自动的。  
  
### 由 mirror 集群保护的应用程序的恢复时间 {#rto-breakdown-mirror-application-level-ha}

故障类型 | 恢复时间的计算方法  
---|---  
硬件故障 | <span class="notranslate farm-term" translate="no">心跳</span>超时（默认为 30 秒），然后应用程序重新启动  
软件或进程崩溃 | 停止应用程序的时间，然后重新启动应用程序  
操作系统崩溃 | <span class="notranslate farm-term" translate="no">心跳</span>超时，然后应用程序重新启动。备用服务器无需重新启动，因为其操作系统已在运行。  
  
### 受 mirror 集群保护的虚拟机的恢复时间 {#rto-breakdown-mirror-vm-level-ha}

故障类型 | 恢复时间的计算方法  
---|---  
所有故障类型 | 检测故障、重新启动虚拟机操作系统并重新启动应用程序所需的时间。这通常需要几分钟。  
  
## 远程站点和分布式部署 {#edge-distributed-deployment-suitability}

SafeKit 专为远程站点、分支机构和拥有多个分支机构的组织而设计。

远程站点的要求 | SafeKit 功能  
---|---  
现场没有专门的 IT 人员 | 故障转移是自动的，无需手动操作。  
无共享存储（SAN 或 NAS） | 仅需要本地磁盘，不需要共享存储。  
远程管理 | 通过 Web 控制台管理集群。  
硬件有限 | 两台标准服务器或虚拟机就足够了。不需要特殊的硬件。  
防火墙和网络地址转换 (NAT) | 可以配置端口。Web 控制台使用 HTTPS。  
站点间灾难恢复 | 一个 mirror 集群可以通过在两个站点之间扩展的 VLAN 进行连接。  
软件发布商集成 | 软件发行商可以将 SafeKit 整合到他们的产品中。安装过程无需用户交互，并且可以通过脚本实现自动化。  
SafeKit 集群已在众多站点上部署了数百个 | SafeKit 专为拥有众多分支机构的组织而设计。  
  
即使没有数据中心，以下站点也需要高可用性：

行业 | 典型站点 | 关键应用  
---|---|---  
物理安全与监控 | 建筑、校园、机场 | 视频管理系统 — Milestone、Genetec、Hanwha、Siemens Siveillance  
楼宇管理系统 (BMS) | 办公楼、医院、工厂 | Siemens Desigo CC、Bosch BIS/BVMS  
电子门禁系统 (EACS) | 安全设施、校园 | Siemens SiPass、Nedap、Bosch AMS  
SCADA 和工业控制 | 工厂、变电站、水厂 | 任何在 Windows 或 Linux 上运行的 SCADA、DCS 或 HMI 软件  
空中交通管制 (ATC) | 机场、控制塔 | 空中交通管制管理和雷达系统  
运营控制中心 (OCC) | 地铁、铁路、交通枢纽 | 铁路信号与车站管理  
海事 | 船只、海军舰艇 | 导航、货物和船上管理系统  
石油和天然气 | 海上平台、远程钻井平台 | 过程控制和安全系统  
电信 | 5G 天线站点、MEC 节点 | 多接入边缘计算 (MEC) 服务器  
医疗保健 | 诊所、远程诊断中心 | 医学影像、患者数据、远程诊断  
零售 | 门店、分店、仓库 | 销售点和库存管理  
防御 | 前沿作战基地、野战部队 | 任务关键型指挥和通信系统  
  
## 监控和警报 {#monitoring-management-alerting}

特色 | 详情  
---|---  
Web 控制台 | 通过 Web 应用程序或渐进式 Web 应用程序 (PWA) 配置、监控和管理集群节点。  
移动通知 | 当模块状态发生变化时，接收浏览器通知。  
时间轴 | 按时间顺序查看模块状态更改和事件。  
电子邮件通知 | 内置的电子邮件代理会发送提醒。  
命令行界面 | 使用命令行界面编写脚本和自动执行任务。  
日志管理 | 每个模块和脚本都有自己的日志文件。支持团队使用模块 <span class="notranslate farm-term" translate="no">snapshots</span> 来调查问题。  
与监控工具集成 | SafeKit 将主要集群事件记录在 Windows 事件日志或 Linux Syslog 中。监控工具可以收集这些事件，并使用标准规则触发警报。这适用于 Nagios、Zabbix、Splunk 和 SIEM 工具，无需自定义开发。  
  
## 安全与合规 {#security-compliance}

特色 | 详情  
---|---  
HTTPS | Web 控制台使用带有 TLS 证书的 HTTPS。  
用户身份验证 | 本地帐户、LDAP、证书 (PKI) 和 OpenID Connect  
用户角色 | 配置用于管理、控制和监控的访问策略。  
加密 | TCP 流量使用 TLS/SSL 进行复制、Web 控制台和分布式命令。UDP 流量使用 AES-128-CBC 加密和 SHA256 进行<span class="notranslate farm-term" translate="no">心跳</span>消息和内部 safeadmin 协议。OpenSSL 库提供加密。Web 服务在 Apache 上运行。  
杀毒软件 | 文档列出了要从防病毒扫描中排除的路径。  
主权 | SafeKit 由 Atos 集团旗下的 Eviden 在法国开发。它可保护 Windows 和 Linux 应用程序 NIS2 SafeKit 对业务连续性和灾难恢复的要求。
  
## 许可 {#licensing-model}

主题 | 详情  
---|---  
许可证类型 | 永久许可证只需购买一次，并与主机名绑定。  
许可范围 | 每台服务器（节点）一张许可证  
许可证激活 | 无需联网即可激活许可证密钥。  
免费试用 | 免费试用版包含所有功能。  
免费获得一个月的使用许可 | 可用于测试概念验证  
  
## 支持与维护 {#support-maintenance-slas}

### 在有效维护合同期内，提供标准支持和维护 {#standard-support-maintenance-included-with-active-maintenance-contract}

服务 | 详情  
---|---  
支持门户访问 | 该网络门户全年无休，每天 24 小时开放，最多可供四位指定的技术联系人使用。  
在线支持时间 | 周一至周五，09:00 至 17:00，地点：欧洲支持中心  
事件确认 | 在四个工作小时内。工作时间是指支持中心的实时支持时间。  
更新和升级 | 所有服务包、更新和升级均已包含在内，无需额外付费。  
更换许可证密钥 | 在有效的支持合同期内，当主机名更改时，许可证密钥可以重新分配。传输仅限于在同一项目中更换服务器。需要事先获得 Eviden 的书面批准。  
知识库访问 | 完全访问知识库文章、常见问题解答和在线文档  
紧急程序 | SafeKit 提供了一个包装器脚本，用于在不使用 SafeKit 高可用性功能的情况下启动或停止应用程序。此脚本调用应用程序的启动和停止脚本。它还会在需要时添加或删除虚拟 IP 地址。  
支持门户 | <https://customercare.evidian.com>  
  
### 无支持合同的免费资源 {#free-resources-no-contract-required}

免费资源 | 详情  
---|---  
AI 助理支持 | 请在 safekit.eviden.com 上使用[SafeKit AI 聊天](</zh-hans/resources/safekit-support/#ai-support>)。   
在线培训和认证 | 通过总时长约 4 小时的免费视频[，按照自己的节奏学习](/zh-hans/resources/safekit-on-line-training/)。完成培训后，您将获得证书。  
文档 | 用户指南、发行说明、知识库和快速安装指南[请见此处](/zh-hans/resources/safekit-free-trial/)  
  
## 与其他解决方案的比较 {#comparison-vs-alternatives}

标准 | SafeKit | Microsoft 故障转移群集 (WSFC) | VMware HA | 开源[1]  
---|---|---|---|---  
需要共享存储（SAN/vSAN） | 否 | 是的 | 是的 | 否  
Windows 支持 | 是的 | 是的 | 是的 | 否  
Linux 支持 | 是的 | 否 | 是的 | 是的  
在远程站点部署 | 太棒了 | 复杂 | 复杂 | 复杂  
OEM | 是的 | 否 | 否 | 否  
费用 | 每个节点永久许可证 | Windows Server 和 SAN | vSphere Enterprise 和 SAN | 高级集成服务  
设置复杂性 | 低：安装和配置一个产品 | 高：活动目录、SAN 和见证配置 | 高：vCenter 和共享存储配置 | 高：需要配置多个独立产品  
管理 | 通过 Web 控制台管理的一款产品 | 高：需要 Active Directory 和 SAN 专业知识 | 高：取决于 vCenter | 高：需要维护多个独立产品  
  
**[1]** 在 Linux 上，需要六个独立的开源项目才能提供相同的功能集：Corosync、Pacemaker、DRBD、Keepalived、STONITH HAProxy。SafeKit 在一个产品中为 Windows 和 Linux 提供这些功能。

## 实用链接 {#quick-reference-links}

链接 | 网址  
---|---  
产品主页 | [https://safekit.eviden.com](/zh-hans/)  
技术概述（包含文本和图表的 Word 文档） | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
免费试用 | [https://safekit.eviden.com/resources/safekit-free-trial/](</zh-hans/resources/safekit-free-trial/>)  
获取报价 | [https://safekit.eviden.com/safekit-pricing/](</zh-hans/safekit-pricing/>)  
支持门户 | <https://customercare.evidian.com>  
免费人工智能支持 | [https://safekit.eviden.com/resources/safekit-support/](</zh-hans/resources/safekit-support/>)  
免费培训和认证 | [https://safekit.eviden.com/resources/safekit-on-line-training/](</zh-hans/resources/safekit-on-line-training/>)  
联系我们 | [https://safekit.eviden.com/contact-us-for-safekit/](</zh-hans/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-zh-hans  %}}