---
title: "具备实时复制和相互故障转移功能的双活集群软件"
canonical: "https://safekit.eviden.com/zh-hans/architectures/active-active-cluster-real-time-replication/"
description: "利用SafeKit主动-主动集群最大程度地利用资源。通过实时同步复制和多个mirror模块，在两台服务器之间部署相互故障转移。无需 SAN，即可确保Windows和Linux实现零数据丢失 (RPO=0) 和自动恢复。下载免费试用版。"
category: "architectures"
lang: "zh-hans"
topics: "实时复制的活/活集群如何工作？🔍 SafeKit高可用性导航中心"
---

# 具备实时复制和相互故障转移功能的双活集群软件 {#active-active-clustering-software-with-real-time-replication--mutual-failover}

## 实时复制的活/活集群是如何工作的？ {#how-the-active-active-cluster-with-real-time-replication-works}

### 具有实时复制功能的双活集群 {#active--active-cluster-with-real-time-replication}

应用程序运行在两台服务器上，并相互进行故障转移。每台服务器都是另一台服务器的备份。每个应用程序都使用各自独立的复制文件目录。


![ SafeKit具有实时复制功能的双活集群](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


在主动-主动集群中，如果一台服务器发生故障，所有应用程序都将在该服务器上运行。故障服务器重启后，应用程序将恢复在其默认主服务器上运行。

### 它是如何运作的？ {#how-it-works}

SafeKit主动-主动集群的配置非常简单，只需部署两个支持实时复制的mirror模块即可。每个mirror模块都包含其自身的虚拟 IP 地址配置、实时复制目录和重启脚本。

注意：

  * 为了实现应用程序故障转移，必须在每台服务器上安装 Appli1 和 Appli2 这两个应用程序。
  * 这种架构并非仅限于 2 个应用程序：N 个应用程序模块可以部署在 2 台服务器上，最多可部署 25 个模块。
  * 每个mirror模块都将拥有自己的虚拟 IP 地址、自己的复制文件目录和自己的恢复脚本。


### 活跃活跃集群的示例 {#example-of-an-active-active-cluster}

💡 [ Hyper-V ](</zh-hans/solutions/hyper-v-replication-automatic-failover-load-balancing/>)或 💡 [ KVM ](</zh-hans/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)解决方案具有复制、自动故障转移和虚拟机负载均衡功能，是一个具有 N 个mirror模块的主动-主动集群的示例，该集群在两个物理服务器之间复制 N 个虚拟机。

在此配置中， mirror模块会复制完整的虚拟机，并在发生故障时重新启动虚拟机。 

该模块中没有虚拟 IP 地址，因为在服务器上重启虚拟机会自动进行虚拟机物理 IP 地址的故障转移。 

在这种架构中，一个关键应用程序安装在虚拟机内部。


{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}