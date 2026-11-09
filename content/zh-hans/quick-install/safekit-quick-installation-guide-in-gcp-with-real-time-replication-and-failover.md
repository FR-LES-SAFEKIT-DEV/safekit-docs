---
title: "使用 SafeKit 实现 GCP 高可用性：安装 mirror.safe 模块以实现故障转移"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-in-gcp-with-real-time-replication-and-failover/"
description: "在 GCP 中部署 SafeKit 的 mirror.safe 模块，以在 Windows 和 Linux 上实现同步实时复制和自动故障转移。本指南将引导您为关键应用程序设置一个无共享存储的 2 节点集群。"
category: "quick-install"
lang: "zh-hans"
topics: "GCP 高可用性快速安装指南、SafeKit 高可用性限制、SafeKit/GCP mirror 解决方案概述、在 Windows 和 Linux 上安装 SafeKit/GCP mirror 解决方案 (mirror.safe)、SafeKit/GCP mirror 解决方案的分步配置、SafeKit mirror 解决方案演示、🔍 探索 SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# 使用 SafeKit 实现 GCP 高可用性：安装 mirror.safe 模块以实现故障转移 {#gcp-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-zh-hans app="GCP" mod="mirror"  %}}
 

## SafeKit/GCP mirror 解决方案概述 {#overview-of-the-safekit--gcp-mirror-solution}

解决方案在此处介绍：**💡 [Google GCP 高可用性：SafeKit 同步复制和故障转移](</zh-hans/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>)**。

## 在 Windows 和 Linux 上安装 SafeKit/GCP mirror 解决方案 (mirror.safe) {#installation-of-the-safekit--gcp-mirror-solution-on-windows-and-linux-mirrorsafe}

### Google GCP 负载均衡器的配置 {#configuration-of-the-google-gcp-load-balancer}

如果您想实现虚拟 IP 地址，则必须配置负载均衡器。  
并且必须将负载均衡器配置为定期向节点发送运行状况数据包。  
为此，SafeKit 提供了一个在节点内部运行的健康检查，

  * 当 mirror 模块状态为 PRIM（绿色）或 ALONE（绿色）时，返回 OK
  * 在所有其他状态下返回 NOT FOUND


您必须使用以下配置来配置 Google GCP 负载均衡器：

  * HTTP 协议
  * 端口 9010，SafeKit Web 服务器端口
  * URL /var/modules/mirror/ready.txt（如果 mirror 是您稍后要部署的模块名称）


如需了解更多信息，请参阅[Google GCP 负载均衡器的配置](<https://docs.cloud.google.com/load-balancing/docs/>)。 


⚠️ 请勿在下面的分步配置中的步骤 4 中配置虚拟 IP 地址。虚拟 IP 地址已在 Google GCP 负载均衡器中设置。仅在本地配置中，步骤 4 中的虚拟 IP 设置才有用。

### Google GCP 网络安全配置 {#configuration-of-the-google-gcp-network-security}

必须将网络安全配置为启用以下协议和端口的通信：

  * UDP - 4800 用于 safeadmin 服务（SafeKit 节点之间）
  * UDP - 8888，用于模块心跳（SafeKit 节点之间）
  * TCP – 5600 用于模块实时文件复制（SafeKit 节点之间）
  * TCP – 9010 用于负载均衡器健康检查和以 http 模式运行的 SafeKit Web 控制台
  * TCP – 9001 用于为控制台配置 https 模式
  * TCP – 9453，用于在 https 模式下运行的 SafeKit Web 控制台



{{%  insert-safekit-installation-package-windows-zh-hans app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-zh-hans app="" mod="mirror"  %}}
 

注意：您将要配置的通用 **mirror.safe** 模块包含在软件包中。

## SafeKit/GCP mirror 解决方案的分步配置 {#step-by-step-configuration-of-the-safekit--gcp-mirror-solution}


{{%  insert-safekit-82-configuration-zh-hans app="Windows" mod="mirror"  %}}
 

## SafeKit mirror 解决方案演示 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}