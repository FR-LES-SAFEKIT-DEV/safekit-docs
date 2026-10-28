---
title: "AWS高可用性（需配合SafeKit使用）：安装mirror.safe模块以实现故障转移"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-in-aws-mirror-safe-module-for-real-time-replication-and-failover/"
description: "在AWS中为SafeKit部署mirror.safe模块，以在Windows和Linux上启用同步实时复制和自动故障转移。本指南将引导您设置一个适用于关键应用程序且无需共享存储的双节点无共享集群。"
category: "quick-install"
lang: "zh-hans"
topics: "AWS 、 SafeKit高可用性快速安装指南； SafeKit / AWS mirror解决方案概述；在Windows和Linux ( mirror.safe ) 上安装SafeKit / AWS 、 mirror解决方案； SafeKit / AWS mirror解决方案分步配置； SafeKit mirror解决方案演示；🔍 SafeKit高可用性导航中心"
---

# AWS高可用性（与SafeKit配合使用）：安装mirror.safe模块以实现故障转移 {#aws-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-zh-hans app="AWS" mod="mirror"  %}}
 

## SafeKit / AWS mirror解决方案概述 {#overview-of-the-safekit--aws-mirror-solution}

解决方案描述如下： **💡 [ Amazon AWS高可用性： SafeKit同步复制和故障转移](</zh-hans/solutions/aws-high-availability-cluster-synchronous-replication-failover/>)** 。

## 在Windows和Linux ( mirror.safe )上安装SafeKit / AWS mirror解决方案 {#installation-of-the-safekit--aws-mirror-solution-on-windows-and-linux-mirrorsafe}

### Amazon AWS负载均衡器的配置 {#configuration-of-the-amazon-aws-load-balancer}

如果想要使用虚拟IP地址，则必须配置负载均衡器。  
负载均衡器必须配置为定期向节点发送健康数据包。  
为此， SafeKit提供了一个在节点内部运行的健康检查，该检查

  * 当mirror模块状态为 PRIM（绿色）或 ALONE（绿色）时，返回 OK。
  * 在其他所有州均未找到返回结果


您必须使用以下命令配置 Amazon AWS负载均衡器：

  * HTTP 协议
  * 端口 9010，即SafeKit Web 服务器端口
  * URL /var/modules/mirror/ready.txt （如果mirror是您稍后要部署的模块名称）


有关更多信息，请参阅[ Amazon AWS负载均衡器](<https://aws.amazon.com/elasticloadbalancing/>)的配置。


⚠️ 请勿在以下步骤配置的第 4 步配置虚拟 IP 地址。Amazon AWS负载均衡器中已设置了虚拟 IP 地址。在第 4 步设置虚拟 IP 地址仅适用于本地部署配置。

### Amazon AWS网络安全的配置 {#configuration-of-the-amazon-aws-network-security}

必须配置网络安全，以启用以下协议和端口的通信：

  * safeadmin 服务使用 UDP 端口 4800（在SafeKit节点之间）。
  * UDP - 8888 用于模块心跳（在SafeKit节点之间）
  * TCP – 5600 用于模块实时文件复制（在SafeKit节点之间）
  * TCP – 9010 用于负载均衡器健康检查以及以 http 模式运行的SafeKit Web 控制台。
  * TCP 端口 9001 用于配置控制台的 HTTPS 模式。
  * TCP – 9453 用于以 https 模式运行的SafeKit Web 控制台



{{%  insert-safekit-installation-package-windows-zh-hans app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-zh-hans app="" mod="mirror"  %}}
 

注意：您将要配置的通用**mirror.safe**模块包含在软件包中。

## SafeKit / AWS mirror解决方案的逐步配置 {#step-by-step-configuration-of-the-safekit--aws-mirror-solution}


{{%  insert-safekit-82-configuration-zh-hans app="Windows" mod="mirror"  %}}
 

## SafeKit mirror解决方案的演示 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}