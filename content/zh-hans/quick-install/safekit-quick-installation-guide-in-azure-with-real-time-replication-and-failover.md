---
title: "Azure 高可用性：使用 SafeKit 实现实时复制和故障转移"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-in-azure-with-real-time-replication-and-failover/"
description: "在 Azure 中部署 SafeKit mirror.safe 模块，以便在 Windows 和 Linux 上实现同步实时复制和自动故障转移。本指南介绍如何为关键应用程序配置一个无共享存储的双节点集群。"
category: "quick-install"
lang: "zh-hans"
topics: "Azure 高可用性快速安装指南，SafeKit 高可用性限制，SafeKit / Azure mirror 解决方案概述，在 Windows 和 Linux 上安装 SafeKit / Azure mirror 解决方案 (mirror.safe)，SafeKit / Azure mirror 解决方案分步配置，SafeKit mirror 解决方案演示，🔍 SafeKit 高可用性导航中心"
---

# 使用 SafeKit 实现 Azure 高可用性：安装用于故障转移的 mirror.safe 模块 {#azure-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}

{{%  insert-safekit-mirror-guide-zh-hans app="Azure" mod="mirror"  %}}

## SafeKit / Azure mirror 解决方案概述 {#overview-of-the-safekit--azure-mirror-solution}

解决方案介绍请见：**💡[Microsoft Azure 高可用性：使用 SafeKit 实现同步复制和故障转移](</zh-hans/solutions/azure-high-availability-cluster-synchronous-replication-failover/>)**。

## 在 Windows 和 Linux 上安装 SafeKit / Azure mirror 解决方案 (mirror.safe) {#installation-of-the-safekit--azure-mirror-solution-on-windows-and-linux-mirrorsafe}

### 配置 Microsoft Azure 负载均衡器 {#configuration-of-the-microsoft-azure-load-balancer}

如果要实现虚拟 IP 地址，则必须配置负载均衡器。
还必须将负载均衡器配置为定期向节点发送运行状况检查数据包。
为此，SafeKit 提供了在节点内部运行的运行状况检查，它会：

  * 当 mirror 模块状态为 PRIM（绿色）或 ALONE（绿色）时返回 OK
  * 在所有其他状态下返回 NOT FOUND

请按以下参数配置 Microsoft Azure 负载均衡器：

  * HTTP 协议
  * 端口 9010，即 SafeKit Web 服务器端口
  * URL /var/modules/mirror/ready.txt（如果稍后部署的模块名称为 mirror）

有关详细信息，请参阅[配置 Microsoft Azure 负载均衡器](<https://learn.microsoft.com/en-us/azure/load-balancer/>)。

⚠️ 请勿在下面的分步配置第 4 步中配置虚拟 IP 地址。虚拟 IP 地址已在 Microsoft Azure 负载均衡器中设置。在第 4 步设置虚拟 IP 仅适用于本地配置。

### 配置 Microsoft Azure 网络安全 {#configuration-of-the-microsoft-azure-network-security}

必须配置网络安全，以允许通过以下协议和端口进行通信：

  * UDP - 4800：用于 safeadmin 服务（SafeKit 节点之间）
  * UDP - 8888：用于模块心跳（SafeKit 节点之间）
  * TCP – 5600：用于模块实时文件复制（SafeKit 节点之间）
  * TCP – 9010：用于负载均衡器运行状况检查，以及以 http 模式运行的 SafeKit Web 控制台
  * TCP – 9001：用于配置控制台的 https 模式
  * TCP – 9453：用于以 https 模式运行的 SafeKit Web 控制台

{{%  insert-safekit-installation-package-windows-zh-hans app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-zh-hans app="" mod="mirror"  %}}

注意：要配置的通用 **mirror.safe** 模块包含在软件包中。

## SafeKit / Azure mirror 解决方案分步配置 {#step-by-step-configuration-of-the-safekit--azure-mirror-solution}

{{%  insert-safekit-82-configuration-zh-hans app="Windows" mod="mirror"  %}}

## SafeKit mirror 解决方案演示 {#demonstration-of-the-safekit-mirror-solution}

{{%  insert-safekit-mirror-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}
