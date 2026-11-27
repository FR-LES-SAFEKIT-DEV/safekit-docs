---
title: "SafeKit：适用于 Windows 和 Linux 的高可用性软件，无需 SAN"
canonical: "https://safekit.eviden.com/zh-hans/"
description: "SafeKit 是适用于 Windows 和 Linux 的高可用性软件：在两台标准服务器上实现同步复制、自动故障转移和负载均衡，无需 SAN。"
category: "home"
lang: "zh-hans"
topics: "SafeKit 功能, 选择您的保护级别, 适用于您应用程序的现成模块, 客户用例, 简单且可预测的定价, 需要考虑的局限性"
translation: "translate_md 2026-11-25.1 | glossary 2026-11-25.2 | Translation LLM | 54 expressions"
image: "/wp-content/uploads/2026/04/safekit-icon-512x512-1.png"
---

# SafeKit：适用于 Windows 和 Linux 的高可用性软件，无需 SAN {#safekit-high-availability-software-for-windows-and-linux-without-a-san}

SafeKit 将两台标准服务器变成一个无共享存储的高可用性集群，使您的应用程序保持运行。它实时复制您的数据，如果第一台服务器出现故障，则在第二台服务器上重新启动您的应用程序，并在修复后自动重新集成故障服务器。您可以在已有的服务器上安装它，无需共享存储，也无需集群专业知识。

复制是同步的，因此服务器出现故障时不会丢失数据，您的应用程序会在大约一分钟或更短的时间内恢复。许可证是永久性的，按服务器定价。

<a class="btn-download" href="/zh-hans/resources/safekit-free-trial/">开始您的 30 天免费试用 ›</a>


## SafeKit 功能 {#features}

SafeKit 将四种功能整合到单一产品中，可在 Windows 和 Linux 上通过一个 Web 控制台或一个命令行进行管理。

| 功能 | 工作原理 |
|---|---|
| **实时复制** | 对文件所做的每一项更改都会在发生时复制到第二台服务器，因此即使发生故障也不会丢失数据。 |
| **自动故障转移** | SafeKit 检测到故障后，会移动虚拟 IP 地址并在另一台服务器上重新启动应用程序。 |
| **自动回切** | 修复后的服务器会在后台重新同步，同时应用程序会继续运行。 |
| **负载均衡** | 网络负载均衡在服务器内部运行，无需外部负载均衡器或代理。 |

![SafeKit Web 控制台监控适用于 Windows 和 Linux 的双节点 mirror 集群，包括 PRIM 和 SECOND 服务器以及主动数据复制](/wp-content/uploads/2026/05/mirror-monitoring-prim-second.png)

您不需要 SAN、仲裁磁盘、Active Directory，也不需要企业版操作系统或数据库。

<a class="btn-download" href="/zh-hans/architectures/">探索集群架构 ›</a>


## 选择您的保护级别 {#protection-levels}

**应用级 HA**（`mirror.safe`、`farm.safe` 和应用程序模块）仅复制您的应用程序数据，并在第二台服务器上重新启动应用程序。它要求您知道要重新启动哪些服务、要实时复制哪些文件夹以及要故障转移哪个虚拟 IP 地址。它适用于物理服务器、所有虚拟机管理程序（包括 VMware、Hyper-V 和 KVM）上的虚拟机以及云，并且可以提供最快的恢复速度。

**虚拟机级 HA**(`hyperv.safe`, `kvm.safe`) 会复制和故障转移整个虚拟机，因此您无需了解应用程序的工作原理。这种方法适用于在多个虚拟机上运行多个应用程序的环境。

<a class="btn-download" href="/zh-hans/best-practises/vm-ha-vs-application-ha/">比较应用级 HA 和虚拟机级 HA ›</a>


## 适用于您应用程序的现成模块 {#modules}

预配置模块是免费的，并随产品一起提供。每个模块都定义了针对给定应用程序要重新启动哪些服务以及要复制哪些文件夹。

- **数据库：** SQL Server、PostgreSQL、Oracle、MySQL、MariaDB、Firebird
- **Web：** Apache、IIS、NGINX
- **虚拟机和容器：** Hyper-V、KVM、Docker、Podman、Kubernetes (k3s)
- **云：** AWS、Azure、GCP 和其他云
- **物理安全和行业：** Milestone XProtect、Genetec、Nedap、Bosch、Hanwha、Siemens

<a class="btn-download" href="/zh-hans/solutions/">浏览所有解决方案和模块 ›</a>


## 客户用例 {#use-cases}

- **视频管理系统（VMS）：** 在服务器故障期间保持实时和录制视频可用。与 Milestone、Genetec 和 Hanwha 配合使用。
- **访问控制（EACS）：** 始终提供凭证和警报。与 Hirsch Microsesame、Nedap AEOS 和 Siemens SiPass 配合使用。
- **SCADA 和工业：** 让操作员能够控制生产线，例如 Probat 咖啡烘焙机和 ALSTEF 行李分拣机。
- **楼宇管理系统（BMS）：** 保持暖通空调、安全和能源系统运行。与 Siemens Desigo CC 和 Bosch BIS 配合使用。
- **空中交通管制（ATC）：** 让管制员能够连接到关键的空侧应用程序，例如 ADB SafeGate。
- **地铁运营控制中心（OCC）：** 为巴黎地铁的自动化无人驾驶线路提供监督。
- **边缘站点：** 将两台标准服务器变成一个高可用性集群，而无需数据中心。
- **软件供应商（OEM）：** 允许您将高可用性作为纯软件选项添加到您的目录中。

<a class="btn-download" href="/zh-hans/use-cases/">探索所有用例 ›</a>


## 简单且可预测的定价 {#pricing}

SafeKit 以永久许可证的形式出售，因此没有强制订阅。价格仅取决于服务器数量，而不取决于 CPU 内核或插槽，所有应用程序模块均免费。它还适用于 Windows、Linux 的标准版本和您的数据库，因此您无需为企业版付费。

<a class="btn-download" href="/zh-hans/safekit-pricing/">索取报价 ›</a>


## 需要考虑的局限性 {#limits}

SafeKit 设计宗旨是简单易用，而非适用于所有情况。它非常适合复制数据量高达数 TB、文件数量少于 1,000,000 个、使用虚拟机级 HA 时虚拟机数量最多 32 个，以及在同一 LAN 或 VLAN 中具有低延迟（通常往返时间低于 5 毫秒）的两个节点。

对于更大的容量，共享存储或其他方法是更好的选择。

<a class="btn-download" href="/zh-hans/product/#safekit-ha-limitations">查看完整的限制列表 ›</a>


{{%  insert-safekit-videos-table-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}
