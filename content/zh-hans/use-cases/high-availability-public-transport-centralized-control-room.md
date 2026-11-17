---
title: "公共交通高可用性：集中控制室"
canonical: "https://safekit.eviden.com/zh-hans/use-cases/high-availability-public-transport-centralized-control-room/"
description: "SafeKit 可确保公共交通控制室的高可用性。RATP 为巴黎地铁 1 号线部署了 SafeKit。该线路是全自动无人驾驶线路。SafeKit 提供负载平衡、自动故障转移和实时数据复制。它不需要 SAN。同一软件可在 Windows 和 Linux 服务器上运行。"
category: "use-cases"
lang: "zh-hans"
topics: "公共交通控制室、为什么控制室至关重要？、SafeKit 为公共交通提供高可用性、RATP 的实际应用、🔍 探索 SafeKit"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-17.24 | Translation LLM | 51 expressions"
---

# 公共交通高可用性：集中控制室 {#high-availability-for-public-transport-centralized-control-room}

## 公共交通控制室 {#public-transport-control-rooms}

集中控制室是现代公共交通系统的神经中枢。控制室监控整个地铁线路，管理自动化运营，并确保乘客安全。对于地铁系统、自动化地铁线路和公交网络，控制室必须不间断地全天候运行。

巴黎交通管理局（RATP）负责管理巴黎地铁，每天运送超过 1000 万名乘客。巴黎地铁 1 号线是全自动无人驾驶线路，这使得控制室的作用更加关键。

## 为什么控制室至关重要？ {#why-is-a-centralized-control-room-critical}

地铁线路的运营商必须对最轻微的事件立即做出反应。IT 故障绝不能阻止运营商看到线路的活动。

控制室操作员的主要任务是：

  * 监控轨道上的列车运行情况
  * 处理视频摄像头自动检测到的事件
  * 管理通信系统和公共广播
  * 监督安全运营和乘客信息

控制室的系统故障会直接影响乘客安全和服务连续性。控制室中的所有关键应用程序都必须受到高可用性的保护。例如网关、数据库和 Web 前端。

## SafeKit 为公共交通提供高可用性 {#safekit-high-availability-for-public-transport}

RATP 在 1 号线自动化项目上面临着诸多限制：

  * 部署时间紧迫
  * 大多数应用程序最初并非为高可用性而设计
  * 需要为 Windows 和 Linux 服务器提供解决方案
  * 没有预算用于昂贵的硬件，例如 SAN 存储或网络负载均衡设备

选择 SafeKit 原因如下：

  * 这是一种纯软件解决方案，没有共享磁盘，也没有 SAN
  * 它在 Windows 和 Linux 上提供相同的集群解决方案
  * 它提供三个关键功能：负载平衡、自动故障转移和实时数据复制
  * 它易于在标准服务器上实施，易于管理，并且用途广泛

## RATP 的实际应用 {#real-world-implementation-at-ratp}

RATP 部署了两种类型的 SafeKit 集群：

  * **Farm 集群**：一个具有网络负载均衡和自动故障转移功能的双活集群
  * **Mirror 集群**：一种主动/被动集群，具有实时数据复制和自动故障转移功能

### 部署方法 {#deployment-approach}

首先，RATP 定义了功能需求。然后，为每个受保护的应用程序配置了 SafeKit。应用程序本身没有被修改。不需要对 SafeKit 进行物理更改。

SafeKit 应用集群具有：

  * 两台运行相同操作系统的服务器
  * 该应用程序安装在两台服务器上
  * SafeKit 已安装在两台服务器上
  * 一个或多个配置为高可用性和负载均衡的应用程序模块

多个应用程序模块可以在同一集群上并行运行。这优化了服务器资源的使用。RATP 在三个基础设施阶段验证了 SafeKit 模块：测试、预生产和生产。

### 日常运营 {#daily-operations}

IT 运维人员现在使用以下工具管理所有应用程序集群：

  * 在 Windows 和 Linux 上采用相同的解决方案，实现高可用性
  * 所有集群均使用同一管理控制台
  * 相同的配置和相同的命令
  * 统一监控，实现负载均衡、高可用性和数据复制

关键应用程序的备份服务器位于单独的机房中，并运行在独立的电源上。如果发生事故，巴黎地铁乘客的服务将继续，不会中断。

### 主要优势 {#key-benefits}

  * **成本降低**：无需昂贵的共享磁盘 SAN 基础设施，也无需网络负载均衡设备
  * **简化管理**：一个控制台即可管理 Windows 和 Linux 集群
  * **高可用性**：负载均衡、自动故障转移和实时数据复制
  * **对项目影响极小**：现有应用程序无需修改
  * **运营弹性**：自动恢复确保不间断的乘客服务

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}
