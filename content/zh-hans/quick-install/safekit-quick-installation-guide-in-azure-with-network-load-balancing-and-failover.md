---
title: "Azure 网络负载均衡和故障转移：安装 SafeKit farm.safe 模块"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-in-azure-with-network-load-balancing-and-failover/"
description: "通过 SafeKit 的智能应用程序监控增强 Azure 网络负载均衡。farm.safe 模块为 Azure 负载均衡器提供专用运行状况检查，可为关键应用程序实现应用程序级高可用性、自动自愈和故障转移。"
category: "quick-install"
lang: "zh-hans"
topics: "Azure 高可用性快速安装指南，SafeKit 高可用性限制，SafeKit / Azure 解决方案概述，在 Windows 和 Linux 上安装 SafeKit / Azure 解决方案 (farm.safe)，SafeKit / Azure 解决方案分步配置，SafeKit farm 解决方案演示，🔍 SafeKit 高可用性导航中心"
---

# Azure 网络负载均衡和故障转移：安装 SafeKit farm.safe 模块 {#azure-network-load-balancing--failover-install-the-safekit-farmsafe-module}

{{%  insert-safekit-farm-guide-zh-hans app="Azure" mod="farm"  %}}

## SafeKit / Azure 解决方案概述 {#overview-of-the-safekit--azure-solution}

解决方案介绍请见：**💡[SafeKit：Microsoft Azure 负载均衡和 `Farm` 集群应用程序高可用性](</zh-hans/solutions/azure-load-balancing-cluster-failover/>)**。

## 在 Windows 和 Linux 上安装 SafeKit / Azure 解决方案 (farm.safe) {#installation-of-the-safekit--azure-solution-on-windows-and-linux-farmsafe}

### 配置 Microsoft Azure 负载均衡器 {#configuration-of-the-microsoft-azure-load-balancer}

必须使用虚拟 IP 地址配置负载均衡器。
还必须将负载均衡器配置为定期向节点发送运行状况检查数据包。
为此，SafeKit 提供了在节点内部运行的运行状况检查，它会：

  * 当 `farm` 模块状态为 UP（绿色）时返回 OK
  * 在所有其他状态下返回 NOT FOUND

请按以下参数配置 Microsoft Azure 负载均衡器：

  * HTTP 协议
  * 端口 9010，即 SafeKit Web 服务器端口
  * URL /var/modules/farm/ready.txt（如果稍后部署的模块名称为 `farm`）

有关详细信息，请参阅[配置 Microsoft Azure 负载均衡器](<https://learn.microsoft.com/en-us/azure/load-balancer/>)。

⚠️ 请勿在下面的分步配置第 4 步中配置虚拟 IP 地址和负载均衡规则。虚拟 IP 地址和负载均衡规则已在 Microsoft Azure 负载均衡器中设置。在第 4 步设置这些项目仅适用于本地配置。

### 配置 Microsoft Azure 网络安全 {#configuration-of-the-microsoft-azure-network-security}

必须配置网络安全，以允许通过以下协议和端口进行通信：

  * UDP - 4800：用于 safeadmin 服务（SafeKit 节点之间）
  * UDP - 4803：用于 `farm` 模块内的心跳（SafeKit 节点之间）
  * TCP – 9010：用于负载均衡器运行状况检查，以及以 http 模式运行的 SafeKit Web 控制台
  * TCP – 9001：用于配置控制台的 https 模式
  * TCP – 9453：用于以 https 模式运行的 SafeKit Web 控制台

{{%  insert-safekit-installation-package-windows-zh-hans app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-zh-hans app="" mod="mirror"  %}}

注意：要配置的通用 **farm.safe** 模块包含在软件包中。

## SafeKit / Azure 解决方案分步配置 {#step-by-step-configuration-of-the-safekit--azure-solution}

{{%  insert-safekit-82-farm-configuration-zh-hans app="" mod="farm"  %}}

## SafeKit `farm` 解决方案演示 {#demonstration-of-the-safekit-farm-solution}

{{%  insert-safekit-farm-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}
