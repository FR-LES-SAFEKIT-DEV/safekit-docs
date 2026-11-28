---
title: "兼具负载均衡与镜像的集群"
canonical: "https://safekit.eviden.com/zh-hans/architectures/clustering-software-load-balancing-mirroring/"
description: "组合 SafeKit farm 与 mirror 模块：负载均衡扩展前端，同步复制保护后端数据，适用于 Windows 和 Linux。"
category: "architectures"
lang: "zh-hans"
topics: "使用 SafeKit 集群软件，实现关键 Web 和数据库应用程序的高可用性和可扩展性"
hashpart: "high-availability-and-scalability-of-critical-web-and-database-applications-with-the-safekit-clustering-software"
translation: "translate_md 2026-11-21.2 | glossaire 2026-11-21.11 | Translation LLM | 54 expressions"
image: "/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png"
schemaType: "TechArticle"
---

# 兼具负载均衡与镜像的集群 {#cluster-with-load-balancing-and-mirroring}

## 使用 SafeKit 集群软件，实现关键 Web 和数据库应用程序的高可用性和可扩展性 {#high-availability-and-scalability-of-critical-web-and-database-applications-with-the-safekit-clustering-software}

### 负载均衡、镜像和故障转移 {#load-balancing-mirroring-and-failover}


![SafeKit 集群，支持负载均衡和镜像](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


### SafeKit 集群软件示例 {#example-with-the-safekit-clustering-software}

例如，使用 SafeKit 集群软件，您可以为 IIS 实现负载均衡，为 Microsoft SQL Server 实现镜像。

为此，请为 IIS 部署一个 <span class="notranslate farm-term" translate="no">farm</span> 模块，为 Microsoft SQL Server 部署一个 mirror 模块。每个模块都配置有自己的虚拟 IP 地址和自己的重启脚本。

这两个模块可以部署在由两台服务器组成的单个集群上，IIS 和 Microsoft SQL Server 都在该集群上运行。或者，这两个模块也可以部署在由不同服务器组成的两个独立集群上。

使用 SafeKit 集群软件，在相同服务器或不同服务器上部署的工作方式完全相同。

### 高可用性和可扩展性解决方案 {#high-availability-and-scalability-solution}

SafeKit 集群软件为关键的 Web 和数据库应用程序提供了一个简单的高可用性和可扩展性解决方案。

网络负载均衡、实时数据镜像和应用程序故障转移在单个产品中得到一致管理。

与硬件集群不同，SafeKit 集群软件不需要共享磁盘、复制的 SAN、硬件负载均衡器或企业版操作系统或数据库。


{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}