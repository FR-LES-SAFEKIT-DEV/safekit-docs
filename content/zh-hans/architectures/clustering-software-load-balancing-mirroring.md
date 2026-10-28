---
title: "面向农场和镜像的集群软件：高可用性和负载均衡"
canonical: "https://safekit.eviden.com/zh-hans/architectures/clustering-software-load-balancing-mirroring/"
description: "通过混合使用SafeKit Farm和Mirror模块，部署高级架构。结合网络负载均衡实现前端可扩展性，以及实时同步复制实现后端数据保护。无需专业 IT 技能，即可轻松构建适用于Windows和Linux的无 SAN 集群。立即下载免费试用版。"
category: "architectures"
lang: "zh-hans"
topics: "借助SafeKit集群软件，实现关键 Web 和数据库应用程序的高可用性和可扩展性，🔍 SafeKit高可用性导航中心"
---

# 面向农场和镜像的集群软件：高可用性和负载均衡{#clustering-software-for-farms-and-mirrors-high-availability--load-balancing}

## 借助SafeKit集群软件{#high-availability-and-scalability-of-critical-web-and-database-applications-with-the-safekit-clustering-software} ，实现关键 Web 和数据库应用程序的高可用性和可扩展性。

### 负载均衡、镜像和故障转移{#load-balancing-mirroring-and-failover}


![ SafeKit集群，具备负载均衡和镜像功能](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


### 以SafeKit聚类软件{#example-with-the-safekit-clustering-software}为例

例如，使用SafeKit集群软件，您可以实现IIS负载均衡和Microsoft SQL Server镜像。

为此，您需要为IIS SQL 服务器部署`farm`模块，为Microsoft SQL 服务器部署mirror模块。每个`farm`和mirror模块都配置有自己的虚拟 IP 地址和重启脚本。

两个都 mirror 和 `farm` 模块可以部署在由两台服务器组成的单个集群上。 IIS 和 Microsoft SQL Server 将在这两台服务器上运行。或者，这两个模块可以部署在两个不同的集群上，每个集群使用不同的服务器。

使用SafeKit集群软件，部署在同一台服务器上还是部署在不同服务器上没有任何区别。

### 高可用性和可扩展性解决方案{#high-availability-and-scalability-solution}

SafeKit集群软件为关键的 Web 和数据库应用程序提供了一种简单、高可用性和可扩展性的解决方案。

因此，网络负载均衡、实时数据镜像和应用程序故障转移在同一产品中得到统一管理。

将SafeKit集群软件与硬件集群进行比较时，您不需要共享磁盘、复制 SAN、负载均衡器、企业版操作系统或数据库。


{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}