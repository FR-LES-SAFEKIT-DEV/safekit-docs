---
title: "使用 SafeKit 实现 Windows 高可用性：安装 mirror.safe 模块以实现故障转移"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/"
description: "部署 mirror.safe 模块以实现 SafeKit 同步实时复制和 Windows 上的自动故障转移。本指南将引导您为关键 Windows 应用程序设置一个无共享存储的 2 节点 SANless 集群。"
category: "quick-install"
lang: "zh-hans"
topics: "Windows 高可用性快速安装指南、SafeKit 高可用性限制、SafeKit/Windows 解决方案概述、在 SafeKit/Windows 解决方案上安装 (mirror.safe)、SafeKit/Windows 解决方案的分步配置、SafeKit mirror 解决方案演示、🔍 探索 SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# 使用 SafeKit 实现 Windows 高可用性：安装 mirror.safe 模块以实现故障转移 {#windows-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


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