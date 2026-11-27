---
title: "NGINX 网络负载均衡和故障转移：安装 SafeKit farm.safe 模块"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-with-nginx-with-network-load-balancing-and-failover/"
description: "分步指南：在 Windows 或 Linux 上安装 SafeKit farm.safe 模块，实现 NGINX 服务器的网络负载均衡和故障转移。"
category: "quick-install"
lang: "zh-hans"
topics: "SafeKit/NGINX 解决方案概述, 在 Windows 和 Linux 上安装 SafeKit/NGINX 解决方案 (farm.safe), SafeKit/NGINX 解决方案的分步配置, SafeKit farm 解决方案演示"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
image: "/wp-content/uploads/2024/03/15-monitoring-up-up.png"
schemaType: "TechArticle"
---

# NGINX 网络负载均衡和故障转移：安装 SafeKit farm.safe 模块 {#nginx-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-zh-hans app="NGINX" mod="farm"  %}}
 

## SafeKit/NGINX 解决方案概述 {#overview-of-the-safekit--nginx-solution}

解决方案在此处介绍：**💡 [SafeKit：一体化 NGINX 负载均衡和高可用性软件](</zh-hans/solutions/nginx-the-simplest-load-balancing-cluster-with-failover/>)**。

## 在 Windows 和 Linux 上安装 SafeKit/NGINX 解决方案 (farm.safe) {#installation-of-the-safekit--nginx-solution-on-windows-and-linux-farmsafe}

### 先决条件 {#prerequisites}

  * 您需要在 2 个或更多节点（虚拟机或物理服务器）上安装 NGINX。



{{%  insert-safekit-installation-package-windows-zh-hans app="NGINX" mod="farm"  %}}

{{%  insert-safekit-installation-package-linux-zh-hans app="NGINX" mod="farm"  %}}
 

注意：您将要配置的通用 **farm.safe** 模块包含在软件包中。

## SafeKit/NGINX 解决方案的分步配置 {#step-by-step-configuration-of-the-safekit--nginx-solution}


{{%  insert-safekit-82-farm-configuration-zh-hans app="NGINX" mod="farm"  %}}
 

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> 解决方案演示 {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}