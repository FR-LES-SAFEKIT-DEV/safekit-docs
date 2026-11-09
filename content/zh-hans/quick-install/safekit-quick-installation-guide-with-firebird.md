---
title: "使用 SafeKit 实现 Firebird 高可用性：安装 firebird.safe 模块以实现故障转移"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-with-firebird/"
description: "部署 firebird.safe 模块以启用 SafeKit，从而在 Windows 和 Linux 上实现 Firebird 的同步实时复制和自动故障转移。本指南将引导您为没有共享存储的关键应用程序设置一个 2 节点 SANless 集群。"
category: "quick-install"
lang: "zh-hans"
topics: "Firebird 高可用性快速安装指南、SafeKit 高可用性限制、SafeKit/Firebird 解决方案概述、在 Windows 和 Linux 上安装 SafeKit/Firebird 解决方案 (firebird.safe)、SafeKit/Firebird 解决方案的分步配置、SafeKit mirror 解决方案演示、🔍 探索 SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# 使用 SafeKit 实现 Firebird 高可用性：安装 firebird.safe 模块以实现故障转移 {#firebird-high-availability-with-safekit-install-the-firebirdsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-zh-hans app="Firebird" mod="firebird"  %}}
 

## SafeKit/Firebird 解决方案概述 {#overview-of-the-safekit--firebird-solution}

解决方案在此处介绍：**💡 [最简单的 Firebird 高可用性：双节点同步复制和故障转移](</zh-hans/solutions/firebird-high-availability-synchronous-replication-failover/>)**。

## 在 Windows 和 Linux 上安装 SafeKit/Firebird 解决方案 (firebird.safe) {#installation-of-the-safekit--firebird-solution-on-windows-and-linux-firebirdsafe}

### 先决条件 {#prerequisites}

  * 您需要在 2 个节点（虚拟机或物理服务器）上安装 Firebird。



{{%  insert-safekit-installation-package-windows-zh-hans app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-82-installation-module-windows-zh-hans app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-installation-package-linux-zh-hans app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-82-installation-module-linux-zh-hans app="Firebird" mod="firebird"  %}}
 

## SafeKit/Firebird 解决方案的分步配置 {#step-by-step-configuration-of-the-safekit--firebird-solution}


{{%  insert-safekit-82-configuration-zh-hans app="Firebird" mod="firebird"  %}}
 

## SafeKit mirror 解决方案演示 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}