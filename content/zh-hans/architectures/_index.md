---
title: "SafeKit架构"
canonical: "https://safekit.eviden.com/zh-hans/architectures/"
description: "使用SafeKit探索高可用性架构。了解Mirror 、 Farm和Farm + Mirror集群，实现无 SAN 应用故障转移和负载均衡。"
category: "architectures"
lang: "zh-hans"
topics: "SafeKit支持哪些不同的高可用性架构和软件集群？如何使用SafeKit构建高可用性集群？🔍 SafeKit高可用性导航中心"
---

# SafeKit架构 {#safekit-architectures}

## SafeKit和分别支持哪些不同的高可用性架构和不同的软件集群？ {#what-are-the-different-high-availability-architectures-and-the-different-software-clusters-with-safekit}

### Mirror集群 {#mirror-cluster}


![ SafeKit mirror集群](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


[更多信息](</zh-hans/architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### <span class="notranslate farm-term" translate="no">Farm</span>集群 {#farm-cluster}


![ SafeKit farm集群](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


[更多信息](</zh-hans/architectures/network-load-balancing-cluster/>)

### <span class="notranslate farm-term" translate="no">Farm</span> + mirror集群 {#farmmirror-cluster}


![ SafeKit farm + mirror集群](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


[更多信息](</zh-hans/architectures/clustering-software-load-balancing-mirroring/>)

### 活动/活动集群 {#activeactive-cluster}


![ SafeKit具有实时复制功能的双活集群](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


[更多信息](</zh-hans/architectures/active-active-cluster-real-time-replication/>)

### N-1 簇 {#n-1-cluster}


![ SafeKit N-1冗余集群](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


[更多信息](</zh-hans/architectures/n-1-redundancy/>)

## 如何使用SafeKit和构建高可用性集群？ {#how-to-build-high-availability-clusters-with-safekit}

### 使用高可用性模块 {#use-high-availability-modules}

高可用性模块是对SafeKit进行的应用定制。该模块分为两种类型： mirror模块具备实时数据复制和故障转移功能， <span class="notranslate farm-term" translate="no">farm</span>模块具备负载均衡和故障转移功能。

如果在 2 台服务器上部署mirror模块，则会创建一个mirror集群；如果在 N 台服务器上部署<span class="notranslate farm-term" translate="no">farm</span>模块，则会创建一个<span class="notranslate farm-term" translate="no">farm</span>集群。

多个应用程序模块可以部署在同一台服务器上。因此，可以实现如前所述的高级集群架构（ <span class="notranslate farm-term" translate="no">farm</span> + mirror ，主动/主动，N-1）。

### 什么是应用模块？ {#what-is-an-application-module}

实际上，应用程序模块是一个“.Safe”文件（zip 类型），其中包含：

1 - 配置文件userconfig.xml ，其中包含：

  * 服务器的名称或物理IP地址，
  * 集群名称或虚拟IP地址
  * 要实时复制的文件目录（适用于mirror模块），
  * 网络负载均衡准则（针对<span class="notranslate farm-term" translate="no">farm</span>模块）
  * 软件和硬件故障检测器的配置


2 - 启动和停止应用程序的脚本。

### 即插即用部署高可用性模块 {#plug-and-play-deployment-of-high-availability-modules}

应用程序模块配置完毕并与应用程序进行测试后，部署无需任何特定的IT技能：

  1. 在两台标准服务器（物理机或虚拟机）上安装应用程序，
  2. 在两台服务器上安装SafeKit软件
  3. 在两台服务器上安装应用程序模块。



{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}