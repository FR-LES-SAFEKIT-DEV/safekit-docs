---
title: "如何使用简易高可用性软件实现冗余服务器"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/how-to-implement-redundant-servers-with-a-simple-software-windows-linux/"
description: "学习如何使用简单的纯软件方法实现冗余服务器。 SafeKit 提出了一种无SAN架构 Windows 和 Linux无需共享磁盘或专业 IT 技能，即可实现实时数据复制和自动故障转移。"
category: "best-practises"
lang: "zh-hans"
topics: "如何实现具有实时复制和故障转移的主备冗余服务器？如何实现具有网络负载均衡和故障转移的主备冗余服务器？🔍 SafeKit高可用性导航中心"
---

# 如何使用简易高可用性软件实现冗余服务器 {#how-to-implement-redundant-servers-with-simple-ha-software}

## 如何实现具有实时复制和故障转移功能的主备冗余服务器？ {#how-to-implement-activepassive-redundant-servers-with-real-time-replication-and-failover}

### SafeKit mirror集群 {#the-safekit-mirror-cluster}


![冗余服务器，具备实时文件复制和故障转移功能](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


在mirror集群中， SafeKit软件安装在两台运行Windows或Linux的物理或虚拟服务器上（本地或云端）。主服务器是活动服务器，运行关键应用程序。备用服务器是被动冗余服务器，实时接收应用程序对其文件所做的所有修改。客户端连接到虚拟 IP 地址为[服务器。如果主服务器宕机， ](</zh-hans/best-practises/how-a-virtual-ip-address-works/#virtual-ip-same-subnet-failover>) SafeKit自动重启备用冗余服务器上的关键应用程序，此时备用服务器将成为主服务器，并切换虚拟 IP 地址。故障服务器重启后，会自动重新同步，并成为作为备用服务器运行的被动冗余服务器。

## 如何实现具有网络负载均衡和故障转移的双活冗余服务器？ {#how-to-implement-activeactive-redundant-servers-with-network-load-balancing-and-failover}

### SafeKit `farm`集群 {#the-safekit-farm-cluster}


![冗余服务器，具备网络负载均衡和故障转移功能](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


在`farm`集群中， SafeKit软件安装在运行Windows或Linux （本地或云端）的冗余服务器上。所有冗余服务器均处于活动状态，并运行相同的关键前端应用程序。客户端连接到虚拟 IP 地址[ ](</zh-hans/best-practises/how-a-virtual-ip-address-works/#vip-load-balancing-same-subnet>)会话在所有冗余服务器之间进行负载均衡。如果一台服务器发生故障， SafeKit会自动重新配置剩余活动服务器之间的 TCP 会话负载均衡。故障服务器重启后，会自动重新集成为活动冗余服务器并接收新的 TCP 会话。


{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}