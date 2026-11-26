---
title: "具有实时复制和相互故障转移功能的双活集群软件"
canonical: "https://safekit.eviden.com/zh-hans/architectures/active-active-cluster-real-time-replication/"
description: "使用 SafeKit 双活集群最大限度地利用资源。使用实时同步复制和多个 mirror 模块在两台服务器之间部署相互故障转移。确保 Windows 和 Linux 零数据丢失 (RPO = 0) 和自动恢复，无需 SAN。下载免费试用版。"
category: "architectures"
lang: "zh-hans"
topics: "具有实时复制功能的双活集群如何工作？、🔍 探索 SafeKit"
translation: "translate_md 2026-11-21.1 | glossaire 2026-11-21.9 | Translation LLM | 54 expressions"
image: "/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png"
schemaType: "TechArticle"
---

# 具有实时复制和相互故障转移功能的双活集群软件 {#active-active-clustering-software-with-real-time-replication--mutual-failover}

## 具有实时复制功能的双活集群如何工作？ {#how-the-active-active-cluster-with-real-time-replication-works}

### 具有实时复制功能的双活集群 {#active--active-cluster-with-real-time-replication}

两台服务器运行应用程序并相互备份。这称为相互故障转移：每台服务器都是另一台服务器的备份。每个应用程序都使用自己的复制文件目录。


![SafeKit 双活集群，支持实时复制](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


如果一个双活集群中的一台服务器发生故障，所有应用程序都将在剩余的服务器上运行。当发生故障的服务器重新启动时，每个应用程序将返回其默认的主服务器。

### 它是如何运作的？ {#how-it-works}

要使用 SafeKit 配置双活集群，只需部署两个具有实时复制功能的 mirror 模块。每个 mirror 模块都有自己的配置：虚拟 IP 地址、实时复制目录和重启脚本。

备注：

  * 为了实现应用程序故障转移，必须在每台服务器上安装这两个应用程序（Appli1 和 Appli2）。
  * 此架构不限于两个应用程序。您可以在同样的两台服务器上部署多达 25 个应用程序模块。
  * 每个 mirror 模块都有自己的虚拟 IP 地址、自己的复制文件目录和自己的恢复脚本。


### 双活集群示例 {#example-of-an-active-active-cluster}

💡 [Hyper-V](</zh-hans/solutions/hyper-v-replication-automatic-failover-load-balancing/>)或 💡 [KVM](</zh-hans/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)解决方案是双活集群的一个示例。此解决方案提供虚拟机的复制、自动故障转移和负载均衡。在此集群中，N 个 mirror 模块在两个物理服务器之间复制 N 个虚拟机。

在此配置中，每个 mirror 模块都会复制一台完整的虚拟机，并在发生故障时重新启动它。

这种类型的模块不需要虚拟 IP 地址。当虚拟机在另一台服务器上重新启动时，其自身的 IP 地址会自动随之移动。

在此架构中，关键应用程序安装在虚拟机中。


{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}