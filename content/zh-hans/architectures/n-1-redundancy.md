---
title: "N-1 冗余集群：使用单个备份服务器为多个应用程序提供高可用性"
canonical: "https://safekit.eviden.com/zh-hans/architectures/n-1-redundancy/"
description: "SafeKit 的 N-1 冗余：N+1 台服务器上的 N 个应用共享一台备用服务器，实时复制并自动故障转移，无需 SAN。"
category: "architectures"
lang: "zh-hans"
topics: "通过数据复制和应用程序故障转移，实现从 N 台服务器到 1 台服务器的高可用性"
translation: "translate_md 2026-11-22.1 | glossaire 2026-11-22.2 | Translation LLM | 54 expressions"
image: "/wp-content/uploads/2023/02/safekit-n-1-300-3.png"
schemaType: "TechArticle"
---

# N-1 冗余集群：使用单个备份服务器为多个应用程序提供高可用性 {#n-1-redundancy-clustering-high-availability-for-multiple-applications-with-one-backup}

## 通过数据复制和应用程序故障转移，实现从 N 台服务器到 1 台服务器的高可用性 {#high-availability-with-data-replication-and-application-failover-from-n-servers-to-1}

### N-1 冗余 {#n-1-redundancy}


![使用 SafeKit 的 N-1 冗余集群](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


### N-1 冗余是如何工作的？ {#how-the-n-1-redundancy-works}

SafeKit 提供了一个简单的 N-1 冗余集群：N 个应用程序运行在 N 个主服务器上，并在发生故障时由单个备份服务器接管。在 SafeKit N-1 冗余集群中，每个应用程序都在其自己的复制目录上运行。

与[双活集群](</zh-hans/architectures/active-active-cluster-real-time-replication/>)不同，当一台主服务器发生故障时，备份服务器不必处理双倍的工作负载。

这假设在 N-1 冗余集群中，一次只有一个主服务器发生故障。该解决方案还可以同时处理多个主服务器故障。在这种情况下，单个备份服务器运行所有故障服务器的组合工作负载。

### 如何实现 N-1 冗余？ {#how-to-implement-n-1-redundancy}

要配置 SafeKit N-1 冗余集群，只需在 N+1 台服务器上部署 N 个 mirror 模块。

备注：

  * 所有应用程序（Appli1、Appli2、Appli3）都必须安装在备份服务器上，以便进行应用程序故障转移。
  * 每个 mirror 模块都有自己的虚拟 IP 地址、自己的复制文件目录和自己的恢复脚本。



{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}