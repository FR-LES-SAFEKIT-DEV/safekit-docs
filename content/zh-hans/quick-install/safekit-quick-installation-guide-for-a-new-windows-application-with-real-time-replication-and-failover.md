---
title: "安装 SafeKit：Windows 高可用（mirror.safe）"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/"
description: "分步指南：在 Windows 上安装 SafeKit mirror.safe 模块，在两台服务器上为您的应用实现实时复制和自动故障转移。"
category: "quick-install"
lang: "zh-hans"
topics: "Windows 高可用性快速安装指南, SafeKit 高可用性限制, SafeKit/Windows 解决方案概述, 在 SafeKit/Windows 解决方案上安装 (mirror.safe), SafeKit/Windows 解决方案的分步配置, SafeKit mirror 解决方案演示"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--windows-solution, installation-on-the-safekit--windows-solutions-mirrorsafe, step-by-step-configuration-of-the-safekit--windows-solution, demonstration-of-the-safekit-mirror-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# 安装 SafeKit：Windows 高可用（mirror.safe） {#install-safekit-for-windows-high-availability-mirrorsafe}


{{%  insert-safekit-mirror-guide-zh-hans app="Windows" mod="mirror"  %}}
 

## SafeKit/Windows 解决方案概述 {#overview-of-the-safekit--windows-solution}

解决方案在此处介绍：**💡 [最简单的 Windows 高可用性：2 节点同步复制和故障转移](</zh-hans/solutions/windows-high-availability-software-synchronous-replication-failover/>)**

## 在 SafeKit/Windows 解决方案上安装 (mirror.safe) {#installation-on-the-safekit--windows-solutions-mirrorsafe}

### 先决条件 {#prerequisites}

  * 您需要将想要在 SafeKit 中重新启动的应用程序安装在 2 个节点（虚拟机或物理服务器）上。



{{%  insert-safekit-installation-package-windows-zh-hans app="" mod="mirror"  %}}
 

注意：您将要配置的通用 **mirror.safe** 模块包含在软件包中。

## SafeKit/Windows 解决方案的分步配置 {#step-by-step-configuration-of-the-safekit--windows-solution}


{{%  insert-safekit-82-configuration-zh-hans app="Windows" mod="mirror"  %}}
 

## SafeKit mirror 解决方案演示 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}