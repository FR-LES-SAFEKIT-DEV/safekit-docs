---
title: "SQL Server Always On 的替代方案：适用于 Express 和 Standard 版本的 HA"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/alternative-always-on-sql-server-express-standard-editions/"
description: "正在寻找SQL Server Always On 的经济高效替代方案？ SafeKit提供了一种无 SAN 架构，可为SQL Server Express 和 Standard 版本带来高可用性。无需 SAN 或 Active Directory，即可享受同步复制、虚拟 IP 和自动故障转移功能。"
category: "best-practises"
lang: "zh-hans"
topics: "适用于 Express 和 Standard 版本的 Always On SQL Server替代方案； SafeKit mirror集群如何与Microsoft SQL Server协同工作？视频指南：为SQL Server配置SafeKit HA、 mirror集群；🔍 SafeKit高可用性导航中心"
---

# SQL Server Always On 的替代方案：适用于 Express 和 Standard 版本的 HA {#alternative-to-sql-server-always-on-ha-for-express-and-standard-editions}

## 适用于 Express 和标准版的 Always On SQL Server的替代方案 {#alternative-to-always-on-sql-server-for-express-and-standard-editions}

### Microsoft SQL Server的解决方案 {#the-solution-for-microsoft-sql-server}

SafeKit为Microsoft和SQL Server这两个冗余节点之间提供高可用性，实现数据的同步实时复制和自动故障转移。

该解决方案与Microsoft SQL Server版本无关，并且适用于快速版和标准版。

### 通用产品 {#a-generic-product}

SafeKit是一款通用产品。它不仅可以复制 SQL Server 数据和日志，还可以复制其他内容。如果您的应用程序基于SQL Server ，并且包含配置文件或其他文件的特定文件夹，您也可以使用相同的方法进行复制。此外，除了 SQL Server 服务之外，您还可以重启您自己的服务。

[ SafeKit安装指南，包含Microsoft SQL Server快速版和标准版、 ](</zh-hans/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/>)

### 没有Microsoft故障转移集群 {#without-microsoft-failover-cluster}

SafeKit无需Microsoft故障转移集群即可运行，与 Always On SQL Server类似。它是一款一体化解决方案，提供虚拟 IP 地址、文件夹同步实时复制、自动故障转移和故障恢复等功能…… SafeKit无需共享磁盘和企业版数据库。 

### 没有域控制器和活动目录 {#without-domain-controller-and-active-directory}

SafeKit无需像 Always On SQL Server那样配置域控制器和活动目录即可运行。这种易于部署、经济高效的解决方案不需要任何特定技能。

### 缺少 3 个节点即可达到法定人数 {#without-3-nodes-for-quorum}

与 Always On SQL Server不同， SafeKit无需 3 个节点即可达到仲裁。在网络隔离的情况下， SafeKit会通过向充当见证人的路由器发送 ping 请求来检测脑裂。此外，该产品还可以轻松配置多个心跳。

### 其他冗余和高可用性解决方案 {#other-redundancy-and-high-availability-solutions}

借助SafeKit ，您可以在Windows和Linux上实现任何文件夹和服务、数据库、完整的 Hyper-V 或 KVM 虚拟机、 Docker 、 Kubernetes和云应用程序的实时复制和故障转移。

### 完整的解决方案 {#a-complete-solution}

SafeKit解： 

  * 硬件故障（占问题的20%），包括整个机房的瘫痪， 
  * 软件故障（占问题的 40%），包括关键进程的重启， 
  * 由于其易用性和网络控制台，人为错误（占问题的 40%）也得以减少。



{{%  insert-safekit-mirror-zh-hans app="Microsoft SQL Server"  %}}
 

## 视频指南：配置 SafeKit 哈 mirror 集群 SQL Server {#videoguide-safekit-mirror-cluster}


{{%  insert-safekit-mirror-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}