---
title: "IIS 网络负载均衡和故障转移：安装 SafeKit iis_farm.safe 模块"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-with-iis-with-network-load-balancing-and-failover/"
description: "了解如何在 Windows 上部署 iis_farm.safe 模块，以实现 IIS 网络负载均衡和自动故障转移。本指南将向您展示如何使用虚拟 IP 为 Web 服务和应用程序构建高可用性集群，而无需外部硬件负载均衡器或复杂的配置。"
category: "quick-install"
lang: "zh-hans"
topics: "IIS 高可用性快速安装指南、SafeKit 高可用性限制、SafeKit/IIS 解决方案概述、在 Windows 上安装 SafeKit/IIS 解决方案 (iis_farm.safe)、SafeKit/IIS 解决方案的分步配置、SafeKit farm 解决方案演示、🔍 探索 SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# IIS 网络负载均衡和故障转移：安装 SafeKit iis_farm.safe 模块 {#iis-network-load-balancing--failover-install-the-safekit-iis_farmsafe-module}


{{%  insert-safekit-farm-guide-zh-hans app="IIS" mod="iis_farm"  %}}
 

## SafeKit/IIS 解决方案概述 {#overview-of-the-safekit--iis-solution}

解决方案在此处介绍：**💡 [SafeKit：一体化 IIS 负载均衡和高可用性软件](</zh-hans/solutions/iis-load-balancing-failover/>)**。

## 在 Windows 上安装 SafeKit/IIS 解决方案 (iis_farm.safe) {#installation-of-the-safekit--iis-solution-on-windows-iis_farmsafe}

### 先决条件 {#prerequisites}

  * 您需要在 2 个或更多节点（虚拟机或物理服务器）上安装 IIS。



{{%  insert-safekit-installation-package-windows-zh-hans app="IIS" mod="iis_farm"  %}}

{{%  insert-safekit-82-installation-module-windows-zh-hans app="IIS" mod="iis_farm"  %}}
 

## SafeKit/IIS 解决方案的分步配置 {#step-by-step-configuration-of-the-safekit--iis-solution}


{{%  insert-safekit-82-farm-configuration-zh-hans app="IIS" mod="iis_farm"  %}}
 

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> 解决方案演示 {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}