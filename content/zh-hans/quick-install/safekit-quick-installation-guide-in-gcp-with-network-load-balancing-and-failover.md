---
title: "GCP网络负载均衡和故障转移：安装SafeKit farm.safe模块"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-in-gcp-with-network-load-balancing-and-failover/"
description: "提高 GCP 网络负载均衡 SafeKit的智能应用监控。 farm.safe 该模块提供专门的健康检查功能 GCP 负载均衡器，可在应用层实现无缝高可用性。为关键任务型应用实现自动自愈和故障转移。"
category: "quick-install"
lang: "zh-hans"
topics: "GCP 、 SafeKit高可用性快速安装指南； SafeKit / GCP高可用性限制； SafeKit / GCP解决方案概述；在Windows和Linux ( farm.safe ) 上安装SafeKit / GCP解决方案的逐步配置； SafeKit和farm解决方案演示；🔍 SafeKit高可用性导航中心"
---

# GCP网络负载均衡和故障转移：安装SafeKit farm.safe模块模块 {#gcp-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-zh-hans app="GCP" mod="farm"  %}}
 

## SafeKit / GCP解决方案概述 {#overview-of-the-safekit--gcp-solution}

解决方案描述如下： **💡 [ SafeKit : Google GCP负载均衡和应用程序高可用性<span class="notranslate farm-term" translate="no">Farm</span>集群](</zh-hans/solutions/gcp-load-balancing-cluster-failover/>)** 。

## 在Windows和Linux ( farm.safe )上安装SafeKit / GCP解决方案 {#installation-of-the-safekit--gcp-solution-on-windows-and-linux-farmsafe}

### Google GCP负载均衡器的配置 {#configuration-of-the-google-gcp-load-balancer}

负载均衡器必须配置虚拟 IP 地址。  
负载均衡器必须配置为定期向节点发送健康数据包。  
为此， SafeKit提供了一个在节点内部运行的健康检查，该检查

  * 当<span class="notranslate farm-term" translate="no">farm</span>模块状态为 UP（绿色）时，返回 OK
  * 在其他所有州均未找到返回结果


您必须使用以下命令配置 Google GCP负载均衡器：

  * HTTP 协议
  * 端口 9010，即SafeKit Web 服务器端口
  * URL /var/modules/farm/ready.txt （如果<span class="notranslate farm-term" translate="no">farm</span>是您稍后要部署的模块名称）


有关更多信息，请参阅[ Google GCP负载均衡器](<https://docs.cloud.google.com/load-balancing/docs/>)的配置。


⚠️ 请勿在以下步骤配置的第 4 步配置虚拟 IP 地址和负载均衡规则。Google GCP负载均衡器中已设置了虚拟 IP 地址和负载均衡规则。在第 4 步设置虚拟 IP 地址和负载均衡规则仅适用于本地部署配置。

### Google GCP网络安全的配置 {#configuration-of-the-google-gcp-network-security}

必须配置网络安全，以启用以下协议和端口的通信：

  * safeadmin 服务使用 UDP 端口 4800（在SafeKit节点之间）。
  * <span class="notranslate farm-term" translate="no">farm</span>模块内部（ SafeKit节点之间）的心跳信号使用 UDP 4803 端口。
  * TCP – 9010 用于负载均衡器健康检查以及以 http 模式运行的SafeKit Web 控制台。
  * TCP 端口 9001 用于配置控制台的 HTTPS 模式。
  * TCP – 9453 用于以 https 模式运行的SafeKit Web 控制台



{{%  insert-safekit-installation-package-windows-zh-hans app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-zh-hans app="" mod="mirror"  %}}
 

注意：您将要配置的通用**farm.safe**模块包含在软件包中。

## SafeKit / GCP解决方案的逐步配置 {#step-by-step-configuration-of-the-safekit--gcp-solution}


{{%  insert-safekit-82-farm-configuration-zh-hans app="" mod="farm"  %}}
 

## SafeKit <span class="notranslate farm-term" translate="no">farm</span>解决方案的演示 {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}