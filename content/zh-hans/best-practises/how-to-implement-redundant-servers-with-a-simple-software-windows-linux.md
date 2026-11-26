---
title: "如何使用简单的 HA 软件实现冗余服务器"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/how-to-implement-redundant-servers-with-a-simple-software-windows-linux/"
description: "了解如何通过简单的纯软件方法实现冗余服务器。SafeKit 在 Windows 和 Linux 上提供实时数据复制和自动故障转移。它不需要共享磁盘，也不需要专业的 IT 技能。"
category: "best-practises"
lang: "zh-hans"
topics: "如何通过实时复制和故障转移实现主动/被动冗余服务器？、如何使用网络负载均衡和故障转移来实现双活冗余服务器？、🔍 探索 SafeKit"
translation: "translate_md 2026-11-19.2 | glossaire 2026-11-19.30 | Translation LLM | 54 expressions"
image: "/wp-content/uploads/2023/02/safekit-prim-second-300.png"
schemaType: "TechArticle"
---

# 如何使用简单的 HA 软件实现冗余服务器 {#how-to-implement-redundant-servers-with-simple-ha-software}

## 如何通过实时复制和故障转移实现主动/被动冗余服务器？ {#how-to-implement-activepassive-redundant-servers-with-real-time-replication-and-failover}

### SafeKit mirror 集群 {#the-safekit-mirror-cluster}


![具有实时文件复制和故障转移功能的冗余服务器](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


在 mirror 集群中，SafeKit 软件安装在两台服务器上。服务器可以是物理服务器或虚拟服务器。它们运行 Windows 或 Linux，可以在本地或云端。主服务器是活动服务器，运行关键应用程序。辅助服务器是被动冗余服务器，实时接收应用程序对其文件所做的所有更改。客户端连接到[虚拟 IP 地址](</zh-hans/best-practises/how-a-virtual-ip-address-works/#virtual-ip-same-subnet-failover>)。如果主服务器发生故障，SafeKit 会自动在辅助服务器上重新启动关键应用程序。该服务器成为主服务器并接管虚拟 IP 地址。当发生故障的服务器重新启动时，SafeKit 会自动重新同步其数据。然后，该服务器成为辅助状态下的被动冗余服务器。

## 如何使用网络负载均衡和故障转移来实现双活冗余服务器？ {#how-to-implement-activeactive-redundant-servers-with-network-load-balancing-and-failover}

### SafeKit <span class="notranslate farm-term" translate="no">farm</span> 集群 {#the-safekit-farm-cluster}


![具有网络负载均衡和故障转移功能的冗余服务器](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


在 <span class="notranslate farm-term" translate="no">farm</span> 集群中，SafeKit 软件安装在多个冗余服务器上。这些服务器运行 Windows 或 Linux，无论是在本地还是在云端。所有冗余服务器都处于活动状态，运行相同的关键前端应用程序。客户端连接到[虚拟 IP 地址](</zh-hans/best-practises/how-a-virtual-ip-address-works/#vip-load-balancing-same-subnet>)。TCP 会话在所有冗余服务器之间进行负载均衡。如果一台服务器发生故障，SafeKit 会自动重新配置剩余活动服务器之间的 TCP 会话负载均衡。当发生故障的服务器重新启动时，SafeKit 自动将其重新整合为活动冗余服务器。然后，该服务器将接收新的 TCP 会话。


{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}