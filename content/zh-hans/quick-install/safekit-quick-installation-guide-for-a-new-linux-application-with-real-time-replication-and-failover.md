---
title: "使用 SafeKit 实现 Linux 高可用性：安装用于故障切换的 mirror.safe 模块"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover/"
description: "部署 SafeKit 的 mirror.safe 模块，以在 Linux 上实现同步实时复制和自动故障切换。本指南将引导您为关键 Linux 应用程序设置无需共享存储的 2 节点 SANless 集群。"
category: "quick-install"
lang: "zh-hans"
topics: "Linux 高可用性快速安装指南, SafeKit 高可用性限制, SafeKit / Linux 解决方案概述, SafeKit / Linux 解决方案的安装 (mirror.safe), SafeKit / Linux 解决方案的分步配置, SafeKit mirror 解决方案演示, 🔍 SafeKit 高可用性导航中心"
---

# 使用 SafeKit 实现 Linux 高可用性：安装用于故障切换的 mirror.safe 模块 {#linux-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-zh-hans app="Linux" mod="mirror"  %}}
 

## SafeKit / Linux 解决方案概述 {#overview-of-the-safekit--linux-solution}

解决方案的说明见此处：**💡[最简单的 Linux 高可用性：2 节点同步复制与故障切换](</zh-hans/solutions/linux-high-availability-software-synchronous-replication-failover/>)**。

## SafeKit / Linux 解决方案的安装 (mirror.safe) {#installation-of-the-safekit--linux-solution-mirrorsafe}

### 先决条件 {#prerequisites}

  * 您需要在 2 个节点（虚拟机或物理服务器）上安装要在 SafeKit 中重启的应用程序。



{{%  insert-safekit-installation-package-linux-zh-hans app="" mod="mirror"  %}}
 

注意：您将要配置的通用 **mirror.safe** 模块已包含在安装包中。

## SafeKit / Linux 解决方案的分步配置 {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-configuration-zh-hans app="Linux" mod="mirror"  %}}
 

## SafeKit mirror 解决方案演示 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}
