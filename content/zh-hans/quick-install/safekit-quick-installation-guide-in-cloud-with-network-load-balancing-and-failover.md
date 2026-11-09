---
title: "云网络负载均衡和故障转移：安装 SafeKit farm.safe 模块"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-in-cloud-with-network-load-balancing-and-failover/"
description: "使用 SafeKit 的智能应用程序监控功能增强云网络负载均衡。farm.safe farm.safe 为云负载均衡器提供专用健康检查，从而在应用程序级别实现无缝高可用性。为关键任务应用程序实现自动自我修复和故障转移。"
category: "quick-install"
lang: "zh-hans"
topics: "云端高可用性快速安装指南、SafeKit 高可用性限制、SafeKit /Cloud 解决方案概述、在 Windows 和 Linux 上安装 SafeKit / Cloud 解决方案 (farm.safe)、SafeKit /Cloud 解决方案的分步配置、SafeKit farm 解决方案演示、🔍 探索 SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# 云网络负载均衡和故障转移：安装 SafeKit farm.safe 模块 {#cloud-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-zh-hans app="Cloud" mod="farm"  %}}
 

## SafeKit /Cloud 解决方案概述 {#overview-of-the-safekit--cloud-solution}

解决方案在此处介绍：**💡 [SafeKit：云负载均衡和应用高可用性 <span class="notranslate farm-term" translate="no">farm</span> 集群](</zh-hans/solutions/cloud-load-balancing-cluster-failover/>)**。

## 在 Windows 和 Linux 上安装 SafeKit / Cloud 解决方案 (farm.safe) {#installation-of-the-safekit--cloud-solution-on-windows-and-linux-farmsafe}

### 云负载均衡器的配置 {#configuration-of-the-cloud-load-balancer}

必须为负载均衡器配置虚拟 IP 地址。  
并且必须将负载均衡器配置为定期向节点发送运行状况数据包。  
为此，SafeKit 提供了一个在节点内部运行的健康检查，

  * 当 <span class="notranslate farm-term" translate="no">farm</span> 模块状态为 UP（绿色）时，返回 OK
  * 在所有其他状态下返回 NOT FOUND


您必须使用以下配置来配置云负载均衡器：

  * HTTP 协议
  * 端口 9010，SafeKit Web 服务器端口
  * URL /var/modules/farm/ready.txt（如果 <span class="notranslate farm-term" translate="no">farm</span> 是您稍后将部署的模块名称）


⚠️ 请勿在下面的分步配置的第 4 步中配置虚拟 IP 地址和负载均衡规则。虚拟 IP 地址和负载均衡规则已在云负载均衡器中设置。仅在本地配置时，才需要在第 4 步中设置虚拟 IP 和负载均衡规则。

### 云网络安全配置 {#configuration-of-the-cloud-network-security}

必须将网络安全配置为启用以下协议和端口的通信：

  * UDP - 4800 用于 safeadmin 服务（SafeKit 节点之间）
  * UDP - 4803 用于 <span class="notranslate farm-term" translate="no">farm</span> 模块内部的心跳（SafeKit 节点之间）
  * TCP – 9010 用于负载均衡器健康检查和以 http 模式运行的 SafeKit Web 控制台
  * TCP – 9001 用于为控制台配置 https 模式
  * TCP – 9453，用于在 https 模式下运行的 SafeKit Web 控制台



{{%  insert-safekit-installation-package-windows-zh-hans app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-zh-hans app="" mod="mirror"  %}}
 

注意：您将要配置的通用 **farm.safe** 模块包含在软件包中。

## SafeKit /Cloud 解决方案的分步配置 {#step-by-step-configuration-of-the-safekit--cloud-solution}


{{%  insert-safekit-82-farm-configuration-zh-hans app="" mod="farm"  %}}
 

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> 解决方案演示 {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}