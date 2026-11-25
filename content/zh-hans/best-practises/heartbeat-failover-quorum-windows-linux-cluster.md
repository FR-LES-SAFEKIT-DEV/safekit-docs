---
title: "Windows 和 Linux 集群中的心跳、故障转移和仲裁"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/heartbeat-failover-quorum-windows-linux-cluster/"
description: "了解心跳、故障转移和仲裁在集群中的工作原理。使用 SafeKit，无需第三个仲裁服务器，也无需特殊的仲裁磁盘。一个简单的脑裂检测器就足够了。SafeKit 在 Windows 和 Linux 上提供高可用性。"
category: "best-practises"
lang: "zh-hans"
topics: "集群中网络隔离的不同场景有哪些？、在 Windows 或 Linux 集群中，心跳和故障转移是如何工作的？、脑裂和仲裁，服务器位于两个远程机房、使用 SafeKit 脑裂检测器实现简单的集群仲裁、🔍 探索 SafeKit"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-19.19 | Translation LLM | 54 expressions"
image: "/wp-content/uploads/2023/02/quorum-with-remote-sites.png"
---

# Windows 和 Linux 集群中的心跳、故障转移和仲裁 {#heartbeat-failover-and-quorum-in-windows-and-linux-clusters}


{{%  insert-safekit-network-isolation-zh-hans  %}}
 

## 在 Windows 或 Linux 集群中，心跳和故障转移是如何工作的？ {#how-heartbeats-and-failover-work-in-a-windows-or-linux-cluster}

### 什么是心跳？ {#what-is-a-heartbeat}

同步两台服务器并检测服务器故障的基本机制是**心跳**。它是两台服务器共享的网络上的监控数据流。

SafeKit 软件支持多个心跳。两台服务器共享的每个网络都可以承载一个心跳。

心跳机制用于实现 Windows 和 Linux 集群。它集成在 SafeKit mirror 集群中，并具有实时文件复制和故障转移功能。

### SafeKit 心跳 {#safekit-heartbeats}

在正常运行中，两台服务器通过心跳通道交换它们的状态。这些状态是 PRIM、SECOND 和资源状态。它们还同步应用程序的启动和停止过程。

例如，在计划的故障转移期间，应用程序的停止脚本首先在主服务器上执行。然后，启动脚本在辅助服务器上执行。因此，辅助服务器上的复制数据处于安全状态。此状态对应于应用程序的干净停止。

### 当所有心跳都消失时会发生什么？ {#loss-of-all-heartbeats}

当一个服务器失去所有心跳时，它会认为另一个服务器已关闭。然后它会进入 ALONE 状态。

如果处于 SECOND 状态的服务器转为 ALONE 状态，则应用程序将在此服务器上重新启动。这就是应用程序故障转移。

建议在两个不同的网络上设置两个心跳通道，但这不是强制性的。使用两个网络，网络故障不会与服务器故障混淆。

## 脑裂和仲裁，服务器位于两个远程机房 {#split-brain-problem-and-quorum-when-servers-are-in-two-remote-computer-rooms}


![Windows 或 Linux 集群中的心跳、故障转移和仲裁](/wp-content/uploads/2023/02/quorum-with-remote-sites.png "w:200")


### 两个远程机房 {#remote-computer-rooms}

通过在两个远程计算机机房中部署两台服务器，高可用性集群可以保护关键应用程序。

因此，即使灾难摧毁了整个机房，应用程序仍然可用。

### 脑裂 {#split-brain}

如果两个机房之间的网络隔离，所有心跳都会丢失。这就是脑裂问题：两个服务器都启动关键应用程序。

### 常规解决方案的复杂性 {#complexity-of-solutions}

通常，仲裁用于解决脑裂问题。仲裁使用第三个仲裁服务器或专用仲裁磁盘。它避免了同时出现两个主服务器的情况。

不幸的是，这些仲裁设备增加了集群架构的成本和复杂性。

## 使用 SafeKit 脑裂检测器实现简单的集群仲裁 {#simple-cluster-quorum-with-the-safekit-split-brain-checker}

### SafeKit 脑裂检测器 {#safekit-split-brain-checker}

使用 SafeKit 高可用性软件，Windows 或 Linux 集群的仲裁不需要第三个仲裁服务器，也不需要仲裁磁盘。一个简单的 🛠️ [脑裂检测器](</zh-hans/resources/safekit-user-guide-82/#check_splitbrain>)就足以避免在两个服务器上运行应用程序。

当服务器之间的所有心跳都丢失时，脑裂检测器仅选择一台服务器成为主服务器。另一台服务器进入 WAIT 状态。它等待直到再次收到另一台服务器的心跳。然后，它从主服务器同步复制的数据并返回到辅助状态。

### 脑裂检测器工作原理是什么？ {#how-the-split-brain-checker-works}

主服务器通过 ping 一个 IP 地址（称为见证）来选举。见证通常是始终可用的路由器。在网络隔离的情况下，只有能够到达见证的服务器才能在 ALONE 状态下成为主服务器。另一个服务器进入 WAIT 状态。

见证者不会永久测试。只有在所有心跳都丢失时才会进行测试。如果见证者在此期间关闭，集群将进入 WAIT-WAIT 状态。然后，管理员可以使用 SafeKit Web 控制台将其中一台服务器重新启动为主服务器。

### 如果没有脑裂检测器会发生什么？ {#what-happens-without-a-split-brain-checker}

在网络隔离的情况下，两台服务器都进入 ALONE 状态并运行关键应用程序。复制的目录被隔离。每个应用程序都在其自己的目录中处理自己的数据。

当网络重新连接时，SafeKit 默认选择隔离前作为 PRIM 的服务器作为新的主服务器。另一个服务器将被强制置于 SECOND 状态。其所有数据都将从 PRIM 服务器重新同步。

注意：在 Windows 上，服务器可以检测到重复的 IP 地址并删除其虚拟 IP 地址。在这种情况下，SafeKit 检查器会强制重新启动。


{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}
