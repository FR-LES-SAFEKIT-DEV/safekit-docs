---
title: "适用于双节点集群的业务连续性和灾难恢复软件，版本号为SafeKit"
canonical: "https://safekit.eviden.com/zh-hans/use-cases/business-continuity-and-disaster-recovery-software/"
description: "SafeKit 是一款业务连续性和灾难恢复软件，可在两个远程机房之间实现简单的高可用性解决方案。实现全天候 24/7 正常运行时间。 SafeKit最易于使用的业务连续性和灾难恢复软件。借助双节点同步复制、自动故障转移和负载均衡，无需昂贵的 SAN 和复杂的 IT 技能。 Windows 和 Linux在任何云环境或本地环境中，关键应用程序均可实现零数据丢失（RPO=0）。"
category: "use-cases"
lang: "zh-hans"
topics: "业务连续性和灾难恢复软件，🔍 SafeKit高可用性导航中心"
---

# 适用于双节点集群的业务连续性和灾难恢复软件，支持SafeKit和 {#business-continuity-and-disaster-recovery-software-for-2-node-clusters-with-safekit}

## 业务连续性和灾难恢复软件 {#business-continuity-and-disaster-recovery-software}

### 选择SafeKit软件进行业务连续性和灾难恢复的理由 {#reasons-to-choose-the-safekit-software-for-business-continuity-and-disaster-recovery}


![简易业务连续性和灾难恢复软件，包含SafeKit ](/wp-content/uploads/2023/02/remote-datacenters.png "w:300")


在同一机房或跨远程机房部署SafeKit集群时，只要远程站点之间有扩展 LAN 或扩展 VLAN，配置就没有区别。

### 在两个远程机房之间实现简单的高可用性解决方案？ {#how-to-implement-a-simple-high-availability-solution-between-two-remote-computer-rooms}

SafeKit mirror和`farm`模块可以轻松部署在位于远程机房的服务器上，无需任何特殊的集群配置。这意味着SafeKit将业务连续性和灾难恢复功能集成在一个简单易用的架构中。此外， SafeKit还能在网络隔离的情况下管理[ ](</zh-hans/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>)的脑裂问题，而无需第三台服务器或专用仲裁磁盘。

### 业务连续性与备份解决方案 {#business-continuity-vs-backup-solutions}

业务连续性和备份解决方案针对不同的故障场景，两者是互补的，而非可以互换的。业务连续性由……提供 SafeKit高可用性集群通过实时复制和自动故障转移，在服务器或应用程序发生故障时，最大限度地减少应用程序中断，确保其持续运行。备份解决方案则侧重于防范更广泛的损失，例如勒索软件攻击或操作员失误，通常依赖于异地数据副本，这些副本可以在事后进行恢复，但恢复时间较长，且不具备自动故障转移功能。

了解更多信息，请参阅[将SafeKit高可用性与灾难恢复备份](</zh-hans/best-practises/high-availability-disaster-recovery-hadr/>)相结合。


{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}