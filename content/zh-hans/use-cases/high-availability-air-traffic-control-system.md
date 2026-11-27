---
title: "空中交通管制系统的高可用性"
canonical: "https://safekit.eviden.com/zh-hans/use-cases/high-availability-air-traffic-control-system/"
description: "空中交通管制高可用性：ADB SafeGate 在全球机场使用 SafeKit，在 Windows 上实现实时复制和自动故障转移。"
category: "use-cases"
lang: "zh-hans"
topics: "空中交通管制系统, 为什么空中交通管制至关重要？, SafeKit 如何保护空中交通管制, ADB SafeGate 的实际应用"
hashpart: "air-traffic-control-systems, why-is-air-traffic-control-critical, safekit-high-availability-for-atc, real-world-implementation-at-adb-safegate"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-17.22 | Translation LLM | 51 expressions"
image: "/wp-content/uploads/2026/05/safekit-atc-512-512.jpg"
schemaType: "Article"
schemaMentions: ["ADB SafeGate"]
---

# 空中交通管制系统的高可用性 {#high-availability-for-air-traffic-control-systems}

## 空中交通管制系统 {#air-traffic-control-systems}

空中交通管制员的工作是人们所能想象的最复杂、压力最大的工作之一。如今，空域繁忙，空中交通繁忙。指挥飞机时出现的一个错误都可能造成灾难性的后果。现代空中交通管制系统依赖于复杂的软件应用程序。这些应用程序可帮助管制员做出关键决策。

ADB SafeGate 是全球领先的机场解决方案提供商，包括空中交通管制塔软件。其解决方案已为 175 多个国家/地区的 3,000 多个机场提供服务。这些解决方案可管理关键的机场运营数据，包括：

  * 航班时刻表和空中交通流量信息
  * 气象数据
  * 机场照明和控制状态
  * 停机坪和停靠作业

## 为什么空中交通管制至关重要？ {#why-is-air-traffic-control-critical}

空中交通管制是最关键的活动之一。在关键时刻，任何系统故障都可能危及管制员的决策和乘客的安全。管制员必须对支持他们的系统充满信心。

然而，如果服务器、操作系统或软件在关键时刻出现故障，那么最好的应用程序也毫无用处。ADB SafeGate 认识到需要确保其关键环境的可用性。它决定研究如何保证其应用程序的 24/7 全天候正常运行。

**挑战**：为空中交通管制员提供一套全天候可用的综合应用程序。这是空中交通管制的强制性要求。

## SafeKit 如何保护空中交通管制 {#safekit-high-availability-for-atc}

ADB SafeGate 选择 Eviden 的软件高可用性解决方案 SafeKit，因为它具有以下优势：

  * **全天候可用**：关键应用程序始终可用
  * **冗余应用服务器**：服务器可以放置在不同的机房中，以防灾
  * **标准服务器**：无共享磁盘，无复杂的 SAN 基础架构
  * **实时文件复制**：无数据丢失 (RPO = 0)
  * **自动恢复**：故障后无需手动操作

因此，使用 ADB SafeGate 软件的空中交通管制员可以完全专注于他们复杂的任务。他们可以确信支持他们的系统是可靠且始终可用的。

## ADB SafeGate 的实际应用 {#real-world-implementation-at-adb-safegate}

### 部署方法 {#deployment-approach}

在机场，ADB SafeGate 将其应用程序和 SafeKit 安装在两台标准 Windows 服务器上。这些服务器没有共享磁盘。这些应用程序受益于实时文件复制和故障后的自动恢复。

### 实际操作 {#how-it-works-in-practice}

**第一阶段：正常运行**

该应用程序仅在服务器 1 上运行，位于 SafeKit mirror 模块内。客户端通过主/备虚拟 IP 地址自动连接到服务器 1。只有应用程序修改的文件才会被复制。它们通过网络实时发送到服务器 2。这最大限度地减少了网络流量。

服务器组织没有先决条件。文件可以位于服务器 1 中的 RAID5 磁盘上，也可以位于服务器 2 中的简单磁盘上。

写入会同步复制到两个服务器。因此，在发生故障时不会丢失数据。事务性应用程序提交的数据会自动在辅助服务器上可用。PostgreSQL 就是一个例子。异步复制无法提供此保证。

**第二阶段：故障时切换**

如果服务器 1 发生故障，SafeKit 会自动切换到服务器 2。故障转移时间等于故障检测时间加上应用程序重启时间。默认检测超时时间为 30 秒。与磁盘复制解决方案不同，没有文件系统恢复延迟。

**阶段 3：故障后的重新同步**

当服务器 1 重新启动时，mirror 模块会自动重新同步文件。

只有在服务器 1 停机期间在服务器 2 上修改的文件才会被重新同步。在重新同步期间，应用程序会继续在服务器 2 上运行。重新同步后，系统将再次具有高可用性和受到保护。

管理员可能希望应用程序优先在服务器 1 上运行。在这种情况下，可以单击一下手动触发故障恢复到服务器 1。也可以自动触发。

### 机场的主要优势 {#key-benefits-for-airports}

  * **无需特殊硬件**：标准 Windows 服务器即可满足需求
  * **无共享存储**：无需昂贵的 SAN 基础设施，也无需处理共享磁盘的复杂性
  * **抗灾能力**：服务器可以放置在具有独立电源的独立机房中
  * **零数据丢失**：同步复制确保所有已提交事务的 RPO = 0
  * **自动恢复**：故障后无需手动操作
  * **减轻压力**：空中交通管制员可以信任支持他们做出关键决策的系统
  * **全球可靠性**：已成功部署在多个国家和各大洲的机场

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}
