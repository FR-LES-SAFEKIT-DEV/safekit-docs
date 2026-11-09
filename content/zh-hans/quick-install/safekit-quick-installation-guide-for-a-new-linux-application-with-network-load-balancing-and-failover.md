---
title: "Linux 网络负载均衡和故障转移：安装 SafeKit farm.safe 模块"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-network-load-balancing-and-failover/"
description: "了解如何部署 farm.safe 模块，以实现 Linux 网络负载均衡和自动故障转移。本指南将向您展示如何使用虚拟 IP 为 Web 服务和应用程序构建高可用性集群，而无需外部硬件负载均衡器或复杂的配置。"
category: "quick-install"
lang: "zh-hans"
topics: "Linux 高可用性快速安装指南、SafeKit 高可用性限制、SafeKit/Linux 解决方案概述、安装 SafeKit/Linux 解决方案 (farm.safe)、SafeKit/Linux 解决方案的分步配置、SafeKit farm 解决方案演示、🔍 探索 SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# Linux 网络负载均衡和故障转移：安装 SafeKit farm.safe 模块 {#linux-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-zh-hans app="Linux" mod="farm"  %}}
 

## SafeKit/Linux 解决方案概述 {#overview-of-the-safekit--linux-solution}

解决方案在此处介绍：**💡 [SafeKit：一体化 Linux 负载均衡和高可用性软件](</zh-hans/solutions/linux-load-balancing-failover/>)**。

## 安装 SafeKit/Linux 解决方案 (farm.safe) {#installation-of-the-safekit--linux-solution-farmsafe}

### 先决条件 {#prerequisites}

  * 您需要将要部署到 <span class="notranslate farm-term" translate="no">farm</span> 中的应用程序安装在 2 个或更多节点（虚拟机或物理服务器）上。



{{%  insert-safekit-installation-package-linux-zh-hans app="" mod="farm"  %}}
 

注意：您将要配置的通用 **farm.safe** 模块包含在软件包中。

## SafeKit/Linux 解决方案的分步配置 {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-farm-configuration-zh-hans app="Linux" mod="farm"  %}}
 

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> 解决方案演示 {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}