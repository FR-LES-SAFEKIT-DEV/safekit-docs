---
title: "Windows和Linux集群中的心跳、故障转移和仲裁"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/heartbeat-failover-quorum-windows-linux-cluster/"
description: "了解集群中的心跳、故障转移和仲裁机制的工作原理。 SafeKit 提出了一种无SAN架构，无需第三台仲裁服务器或专用仲裁磁盘。实现高可用性。 Windows 和 Linux 使用简单的裂脑检测器。"
category: "best-practises"
lang: "zh-hans"
topics: "集群中网络隔离的不同场景有哪些？ Windows或Linux集群中的心跳和故障转移机制如何运作？当服务器位于两个远程机房时，如何解决脑裂问题并实现仲裁？使用SafeKit脑裂检测器实现简单集群仲裁？🔍 SafeKit高可用性导航中心"
---

# Windows和Linux集群中的心跳、故障转移和仲裁{#heartbeat-failover-and-quorum-in-windows-and-linux-clusters}


{{%  insert-safekit-network-isolation-zh-hans  %}}
 

## Windows或Linux集群中的心跳机制和故障转移机制是如何工作的？ {#how-heartbeats-and-failover-work-in-a-windows-or-linux-cluster}

### 什么是心跳？ {#what-is-a-heartbeat}

同步两台服务器和检测服务器故障的基本机制是**心跳** ，它是监控一对服务器共享网络上的数据流。

SafeKit软件支持与两台服务器共享的网络数量一样多的心跳信号。 

心跳机制用于实现Windows和Linux集群。它与SafeKit mirror集群集成，并支持实时文件复制和故障转移。

### SafeKit心跳{#safekit-heartbeats}

在正常运行中，两台服务器通过心跳通道交换其状态（PRIM、SECOND、资源状态），并同步其应用程序的启动和停止过程。

具体来说，在计划故障转移的情况下，停止应用程序的脚本会先在主服务器上执行，然后再在备用服务器上执行启动脚本。因此，备用服务器上的复制数据处于安全状态，相当于应用程序已安全停止。

### 心跳完全消失{#loss-of-all-heartbeats}

当一台服务器上的所有心跳信号丢失时，该服务器会认为另一台服务器已宕机，并转入 ALONE 状态。

如果进入“单机”状态的是第二台服务器，那么应用程序将发生故障转移，并在辅助服务器上重新启动应用程序。

虽然并非强制性的，但为了将网络故障情况与服务器故障情况分开，最好在两个不同的网络上设置两个心跳通道来同步两个服务器。

## 服务器位于两个远程机房时，会出现脑裂问题和法定人数限制{#split-brain-problem-and-quorum-when-servers-are-in-two-remote-computer-rooms}


![心跳、故障转移和仲裁在Windows或Linux集群中](/wp-content/uploads/2023/02/quorum-with-remote-sites.png "w:200")


### 远程计算机房{#remote-computer-rooms}

一个用于保护关键应用程序的高可用性集群可以由位于两个地理位置相距较远的机房中的两台服务器来实现。

因此，该解决方案支持了房间爆满的灾难。

### 裂脑{#split-brain}

如果两个计算机房之间网络隔离，所有心跳信号都会丢失，从而导致脑裂问题。

两台服务器都启动了关键应用程序。

### 解决方案的复杂度{#complexity-of-solutions}

为了解决脑裂问题，通常使用第三个仲裁服务器或专用仲裁磁盘来实现仲裁，以避免出现双主服务器。 

不幸的是，这些新的仲裁设备增加了整体集群架构的成本和复杂性。

## 使用SafeKit裂脑检测器{#simple-cluster-quorum-with-the-safekit-split-brain-checker}的简单集群法定人数

### SafeKit裂脑检测器{#safekit-split-brain-checker}

借助SafeKit高可用性软件， Windows或Linux集群内的仲裁无需第三台仲裁服务器，也无需仲裁磁盘。一个简单的脑裂检测](</resources/safekit-user-guide-82/#check_splitbrain>) [避免应用程序的重复执行。

当服务器间所有心跳信号丢失时，脑裂检测器会选择一台服务器作为主服务器。另一台服务器进入等待状态，直到再次收到主服务器的心跳信号。之后，在从主服务器同步复制数据后，它将重新成为辅助服务器。

### 裂脑棋盘是如何工作的？ {#how-the-split-brain-checker-works}

主服务器选举基于对一个称为见证地址的IP地址的ping测试。见证地址通常是一台始终可用的路由器。如果发生网络隔离，只有能够访问见证地址的服务器才能成为主服务器，其他服务器将进入等待状态。

见证服务器不会持续接受测试，只有在所有心跳信号丢失时才会进行测试。如果此时见证服务器宕机，集群将进入等待-等待状态，管理员可以通过SafeKit Web 控制台选择重启其中一台服务器作为主服务器。

### 如果没有裂脑棋子会发生什么？ {#what-happens-without-a-split-brain-checker}

如果发生网络隔离，两台服务器都将进入独立运行状态，各自运行关键应用程序。复制的目录相互隔离，每个应用程序都在各自的目录中处理自身的数据。

当网络重新连接时， SafeKit默认选择隔离前为 PRIM 的服务器作为新的主服务器，并强制另一个服务器作为 SECOND，同时将其所有数据从 PRIM 重新同步。

笔记： Windows 能够检测到一台服务器上的重复 IP 地址，并删除该服务器上的虚拟 IP 地址。 SafeKit 它有一个检查器，在这种情况下会强制重启。


{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}