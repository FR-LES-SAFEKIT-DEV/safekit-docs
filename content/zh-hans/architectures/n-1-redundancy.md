---
title: "N-1冗余集群：使用一个备份实现多个应用程序的高可用性"
canonical: "https://safekit.eviden.com/zh-hans/architectures/n-1-redundancy/"
description: "利用SafeKit N-1 冗余优化您的数据中心。在 N+1 台服务器上部署 N 个mirror模块，即可通过单个共享备份为多个应用程序提供高可用性。借助Windows和Linux的实时复制功能，无需 SAN 即可降低硬件成本。了解更多信息。"
category: "architectures"
lang: "zh-hans"
topics: "通过数据复制和应用程序故障转移，实现从 N 台服务器到 1 台服务器的高可用性，🔍 SafeKit高可用性导航中心"
---

# N-1冗余集群：使用一个备份实现多个应用程序的高可用性{#n-1-redundancy-clustering-high-availability-for-multiple-applications-with-one-backup}

## 通过数据复制和应用程序故障转移，实现从 N 台服务器到 1 台服务器的高可用性{#high-availability-with-data-replication-and-application-failover-from-n-servers-to-1}

### N-1 冗余{#n-1-redundancy}


![ SafeKit N-1冗余集群](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


### N-1冗余是如何工作的？ {#how-the-n-1-redundancy-works}

SafeKit提供了一个简单的 N-1 冗余集群，其中 N 个应用程序运行在 N 台服务器上，并使用单个备份进行故障转移。在SafeKit N-1 冗余集群中，每个应用程序在其自身的复制目录中运行。

与[主动-主动集群](</zh-hans/architectures/active-active-cluster-real-time-replication/>)不同，如果一个主服务器发生故障，备份服务器不必处理双倍的工作负载。

这假设N-1冗余集群中一次只发生一个故障。该方案可以支持多个主服务器同时发生故障，但这种情况下，单个备份服务器必须处理所有故障服务器的总工作负载。

### 如何实现 N-1 冗余？ {#how-to-implement-n-1-redundancy}

SafeKit N-1 冗余集群的配置非常简单，只需在 N+1 台服务器上部署 N 个mirror模块即可。

注意：

  * 为了实现应用程序故障转移，所有应用程序（Appli1、Appli2、Appli3）都必须安装在同一个备份上。
  * 每个mirror模块都将拥有自己的虚拟 IP 地址、自己的复制文件目录和自己的恢复脚本。



{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}