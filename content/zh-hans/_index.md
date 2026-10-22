---
title: "SafeKit：适用于 Windows 和 Linux 的无 SAN 高可用性软件"
canonical: "https://safekit.eviden.com/zh-hans/"
description: "SafeKit 是适用于 Windows 和 Linux 的一体化无 SAN 高可用性软件。通过一个简单、经济的方案实现实时同步复制、自动故障切换和负载均衡。立即开始 30 天免费试用。"
category: "home"
lang: "zh-hans"
topics: "SafeKit 的功能、选择保护级别、适用于应用程序的即用模块、客户应用案例、简单透明的价格、开始前了解限制、🔍 SafeKit 高可用导航中心"
---

# SafeKit：适用于 Windows 和 Linux 的无 SAN 高可用性软件 {#safekit-high-availability-software-for-windows-and-linux-without-a-san}

SafeKit 将两台标准服务器组成无 SAN 高可用集群，保障应用程序持续运行。它实时复制数据；第一台服务器发生故障时，在第二台服务器上重新启动应用程序；故障服务器修复后再自动将其重新加入集群。您可以直接安装在现有服务器上，无需共享存储或集群专业知识。

复制采用同步方式，因此服务器故障时不会丢失数据，应用程序通常在一分钟内或更短时间恢复。许可证为永久许可，按服务器计价。

<a class="btn-download" href="/zh-hans/resources/safekit-free-trial/">开始 30 天免费试用 ›</a>

## SafeKit 的功能 {#features}

SafeKit 将四项功能整合到一个产品中，可在 Windows 和 Linux 上通过 Web 控制台或命令行进行管理。

| 功能 | 工作方式 |
|---|---|
| **实时复制** | 文件的每次更改都会立即复制到第二台服务器，避免故障时丢失数据。 |
| **自动故障切换** | SafeKit 检测故障、迁移虚拟 IP 地址，并在另一台服务器上重新启动应用程序。 |
| **自动故障恢复** | 修复后的服务器在后台重新同步，同时应用程序继续运行。 |
| **负载均衡** | 网络负载均衡直接运行在服务器上，无需外部负载均衡器或代理。 |

![SafeKit Web 控制台监控 Windows 和 Linux 双节点镜像集群，显示 PRIM 和 SECOND 服务器及活动数据复制](/wp-content/uploads/2026/05/mirror-monitoring-prim-second.png)

您无需 SAN、仲裁磁盘、Active Directory，也无需操作系统或数据库的企业版。

<a class="btn-download" href="/zh-hans/architectures/">查看集群架构 ›</a>

## 选择保护级别 {#protection-levels}

**应用程序高可用性**（`mirror.safe`、`farm.safe` 及应用模块）仅复制应用程序数据，并在第二台服务器上重新启动应用程序。您需要了解要重启哪些服务、实时复制哪些文件夹，以及故障切换哪个虚拟 IP 地址。它适用于物理服务器、所有虚拟化平台（包括 VMware、Hyper-V 和 KVM）上的虚拟机以及云环境，并提供最快的恢复速度。

**虚拟机高可用性**（`hyperv.safe`、`kvm.safe`）复制并切换整个虚拟机，因此无需了解应用程序的工作方式。适用于多个应用程序分布在多台虚拟机上的环境。

<a class="btn-download" href="/zh-hans/best-practises/vm-ha-vs-application-ha/">比较应用程序高可用性与虚拟机高可用性 ›</a>

## 适用于应用程序的即用模块 {#modules}

预配置模块免费并包含在产品中。每个模块都定义了特定应用程序需要重启的服务和需要复制的文件夹。

- **数据库：** SQL Server、PostgreSQL、Oracle、MySQL、MariaDB、Firebird
- **Web：** Apache、IIS、NGINX
- **虚拟机和容器：** Hyper-V、KVM、Docker、Podman、Kubernetes (k3s)
- **云：** AWS、Azure、GCP 等
- **物理安全和工业：** Milestone XProtect、Genetec、Nedap、Bosch、Hanwha、Siemens

<a class="btn-download" href="/zh-hans/solutions/">浏览全部解决方案和模块 ›</a>

## 客户应用案例 {#use-cases}

- **视频管理 (VMS)：** 服务器故障时仍可使用实时视频和录像。适用于 Milestone、Genetec 和 Hanwha。
- **门禁控制 (EACS)：** 始终保持凭据和警报可用。适用于 Hirsch Microsesame、Nedap AEOS 和 Siemens SiPass。
- **SCADA 和工业：** 保障生产线控制，例如 Probat 咖啡烘焙机和 ALSTEF 行李分拣系统。
- **楼宇管理 (BMS)：** 保障 HVAC、安全和能源系统持续运行。适用于 Siemens Desigo CC 和 Bosch BIS。
- **空中交通管制 (ATC)：** 确保管制员连接到关键的机场场面应用，例如 ADB SafeGate。
- **地铁运营控制中心 (OCC)：** 保障巴黎自动化无人驾驶地铁线路的监控。
- **边缘站点：** 在没有数据中心的地点用两台标准服务器构建高可用集群。
- **软件供应商 (OEM)：** 以纯软件选项的形式为产品目录增加高可用性。

<a class="btn-download" href="/zh-hans/use-cases/">查看全部应用案例 ›</a>

## 简单透明的价格 {#pricing}

SafeKit 使用永久许可证，无强制订阅。价格仅取决于服务器数量，与 CPU 核心数或插槽数无关，所有应用模块均免费。它还适用于 Windows、Linux 和数据库的标准版，无需购买企业版。

<a class="btn-download" href="/zh-hans/safekit-pricing/">申请报价 ›</a>

## 开始前了解限制 {#limits}

SafeKit 以简洁为设计目标，并非适用于所有场景。它适合复制数 TB 数据、少于 1,000,000 个文件、VM HA 最多 32 台虚拟机，以及位于同一 LAN 或 VLAN 且延迟较低（通常往返低于 5 毫秒）的两个节点。

对于更大的数据量，共享存储或其他方案可能更合适。

<a class="btn-download" href="/zh-hans/product/#safekit-ha-limitations">查看完整限制列表 ›</a>

{{%  insert-safekit-hub-zh-hans  %}}
