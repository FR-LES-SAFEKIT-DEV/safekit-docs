---
title: "Nedap 高可用性与 SafeKit：安装 nedap.safe 模块以实现故障转移"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-with-nedap/"
description: "部署 nedap.safe 模块以实现 SafeKit，从而在 Windows 上实现 Nedap 的同步实时复制和自动故障转移。本指南将引导您为没有共享存储的临界应用程序设置 2 节点 SANless 集群。"
category: "quick-install"
lang: "zh-hans"
topics: "Nedap 高可用性快速安装指南、SafeKit 高可用性限制、SafeKit/Nedap 解决方案概述、在 Windows 上安装 SafeKit/Nedap 解决方案 (nedap.safe)、SafeKit/Nedap 解决方案的分步配置、SafeKit mirror 解决方案演示、🔍 探索 SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# Nedap 高可用性与 SafeKit：安装 nedap.safe 模块以实现故障转移 {#nedap-high-availability-with-safekit-install-the-nedapsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-zh-hans app="Nedap" mod="nedap"  %}}
 

**📘 [Nedap AOES 与 SafeKit 的配置 (PDF)](</wp-content/uploads/documents/NEDAP_AEOS_CLUSTER_SAFEKIT.pdf>)**：所有详细信息均包含在此文档中。

## SafeKit/Nedap 解决方案概述 {#overview-of-the-safekit--nedap-solution}

解决方案在此处描述：**💡 [最简单的 Nedap 高可用性：2 节点同步复制和故障转移](</zh-hans/solutions/nedap-high-availability-synchronous-replication-failover/>)**。

## 在 Windows 上安装 SafeKit/Nedap 解决方案 (nedap.safe) {#installation-of-the-safekit--nedap-solution-on-windows-nedapsafe}

### 先决条件 {#prerequisites}

  * 您需要在 2 个节点（虚拟机或物理服务器）上安装 Nedap AEOS 和 SQL。
  * 如果 SQL Server 与 Nedap AEOS 位于同一节点上，请使用虚拟 IP 地址（而不是服务器的物理 IP 地址）配置 Nedap AEOS 与 SQL 的连接。否则，故障转移将不起作用。SQL Server 可以是外部的，请参阅下面的注释。


ℹ️ 注意：SQL Server 可以是外部的。在这种情况下，在分步配置的第 4 步：

  * 删除 SQL 数据和日志文件夹的复制
  * 移除 sqlservr.exe 上的进程检查器，
  * 从 SERVICES 宏中删除 MSSQLServer。


您可以使用 💡 [SafeKit 和 sqlserver.safe 模块](</zh-hans/solutions/sql-server-high-availability-synchronous-replication-failover/>)来实现外部 SQL Server 的冗余。在这种情况下，请使用 sqlserver.safe 模块的虚拟 IP 地址配置 Nedap AEOS 与 SQL 的连接。


{{%  insert-safekit-installation-package-windows-zh-hans app="Nedap AEOS and SQL" mod="nedap"  %}}

{{%  insert-safekit-82-installation-module-windows-zh-hans app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## SafeKit/Nedap 解决方案的分步配置 {#step-by-step-configuration-of-the-safekit--nedap-solution}


{{%  insert-safekit-82-configuration-zh-hans app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## SafeKit mirror 解决方案演示 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}