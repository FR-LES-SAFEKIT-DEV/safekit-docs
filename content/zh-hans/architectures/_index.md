---
title: "SafeKit 架构"
canonical: "https://safekit.eviden.com/zh-hans/architectures/"
description: "探索 SafeKit 高可用架构，了解 Mirror、Farm 和 Farm+Mirror 集群如何实现无 SAN 的应用故障切换与负载均衡。"
category: "architectures"
lang: "zh-hans"
topics: "SafeKit 提供哪些高可用架构和软件集群？、如何使用 SafeKit 构建高可用集群？、🔍 SafeKit 高可用导航中心"
---

# SafeKit 架构 {#safekit-architectures}

## SafeKit 提供哪些高可用架构和软件集群？ {#what-are-the-different-high-availability-architectures-and-the-different-software-clusters-with-safekit}

### Mirror 镜像集群 {#mirror-cluster}


![SafeKit Mirror 镜像集群](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


[了解更多](</architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### Farm 集群 {#farm-cluster}


![SafeKit Farm 集群](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


[了解更多](</architectures/network-load-balancing-cluster/>)

### Farm+Mirror 集群 {#farmmirror-cluster}


![SafeKit Farm+Mirror 集群](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


[了解更多](</architectures/clustering-software-load-balancing-mirroring/>)

### Active/active 集群 {#activeactive-cluster}


![支持实时复制的 SafeKit active/active 集群](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


[了解更多](</architectures/active-active-cluster-real-time-replication/>)

### N-1 集群 {#n-1-cluster}


![SafeKit N-1 冗余集群](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


[了解更多](</architectures/n-1-redundancy/>)

## 如何使用 SafeKit 构建高可用集群？ {#how-to-build-high-availability-clusters-with-safekit}

### 使用高可用模块 {#use-high-availability-modules}

高可用模块是针对应用程序定制的 SafeKit 配置。模块分为两种：支持实时数据复制和故障切换的 Mirror 模块，以及支持负载均衡和故障切换的 Farm 模块。

在两台服务器上部署 Mirror 模块即可创建 Mirror 集群；在 N 台服务器上部署 Farm 模块即可创建 Farm 集群。

同一组服务器上可以部署多个应用模块，因此可以实现前面介绍的 Farm+Mirror、active/active 和 N-1 等高级集群架构。

### 什么是应用模块？ {#what-is-an-application-module}

应用模块通常是一个“.Safe”文件（zip 格式），其中包含：

1 - 配置文件 userconfig.xml，其中包括：

  * 服务器名称或物理 IP 地址，
  * 集群名称或虚拟 IP 地址，
  * 需要实时复制的文件目录（适用于 Mirror 模块），
  * 网络负载均衡条件（适用于 Farm 模块），
  * 软件和硬件故障检测器的配置


2 - 用于启动和停止应用程序的脚本。

### 高可用模块的即插即用部署 {#plug-and-play-deployment-of-high-availability-modules}

应用模块配置完成并通过应用程序测试后，部署无需专门的 IT 技能：

  1. 在两台标准服务器（物理或虚拟）上安装应用程序，
  2. 在两台服务器上安装 SafeKit 软件，
  3. 在两台服务器上安装应用模块。



{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}