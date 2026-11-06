---
title: "SafeKit 架构"
canonical: "https://safekit.eviden.com/zh-hans/architectures/"
description: "使用 SafeKit 探索高可用性架构。了解 Mirror、Farm 和 Farm + mirror 集群，以实现无 SAN 应用故障转移和负载平衡。"
category: "architectures"
lang: "zh-hans"
topics: "SafeKit 有哪些不同的高可用性架构和不同的软件集群？如何使用 SafeKit 构建高可用性集群？🔍 SafeKit 高可用性导航中心"
translation: "translate_md 2026-11-06.18 | glossaire 2026-11-06.13 | Translation LLM | 27 expressions"
---

# SafeKit 架构 {#safekit-architectures}

## SafeKit 有哪些不同的高可用性架构和软件集群？ {#what-are-the-different-high-availability-architectures-and-the-different-software-clusters-with-safekit}

### Mirror 集群 {#mirror-cluster}


![SafeKit mirror 集群](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


[更多信息](</zh-hans/architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### <span class="notranslate farm-term" translate="no">Farm</span> 集群 {#farm-cluster}


![SafeKit farm 集群](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


[更多信息](</zh-hans/architectures/network-load-balancing-cluster/>)

### <span class="notranslate farm-term" translate="no">Farm</span> + mirror 集群 {#farmmirror-cluster}


![SafeKit farm + mirror 集群](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


[更多信息](</zh-hans/architectures/clustering-software-load-balancing-mirroring/>)

### 双活集群 {#activeactive-cluster}


![SafeKit 主动-主动集群，支持实时复制](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


[更多信息](</zh-hans/architectures/active-active-cluster-real-time-replication/>)

### N-1 集群 {#n-1-cluster}


![SafeKit N-1 冗余集群](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


[更多信息](</zh-hans/architectures/n-1-redundancy/>)

## 如何使用 SafeKit 构建高可用性集群？ {#how-to-build-high-availability-clusters-with-safekit}

### 使用高可用性模块 {#use-high-availability-modules}

高可用性模块是 SafeKit 针对应用程序的定制。模块有两种类型：具有实时数据复制和故障转移的 mirror 模块，以及具有负载平衡和故障转移的 <span class="notranslate farm-term" translate="no">farm</span> 模块。

如果您在 2 台服务器上部署 mirror 模块，则会创建一个 mirror 集群；如果您在 N 台服务器上部署 <span class="notranslate farm-term" translate="no">farm</span> 模块，则会创建一个 <span class="notranslate farm-term" translate="no">farm</span> 集群。

多个应用程序模块可以部署在同一台服务器上。因此，可以实现高级集群架构，如前面介绍的那些（<span class="notranslate farm-term" translate="no">farm</span> + mirror，双活，N-1）。

### 什么是应用程序模块？ {#what-is-an-application-module}

在实践中，应用程序模块是一个“.Safe”文件（zip 类型），其中包含：

1 - 配置文件 userconfig.xml，其中包含：

  * 服务器的名称或物理 IP 地址，
  * 集群的名称或虚拟 IP 地址，
  * 要实时复制的文件目录（用于 mirror 模块），
  * 网络负载均衡标准（针对 <span class="notranslate farm-term" translate="no">farm</span> 模块）
  * 软件和硬件故障检测器的配置


2 - 启动和停止应用程序的脚本。

### 高可用性模块的即插即用式部署 {#plug-and-play-deployment-of-high-availability-modules}

应用程序模块配置并经过应用程序测试后，部署无需任何特定的 IT 技能：

  1. 在两台标准服务器（物理或虚拟）上安装应用程序，
  2. 在两台服务器上安装 SafeKit 软件，
  3. 在两台服务器上安装应用程序模块。



{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}