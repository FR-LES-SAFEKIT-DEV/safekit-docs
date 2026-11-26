---
title: "适用于 SafeKit 双节点集群的业务连续性和灾难恢复软件"
canonical: "https://safekit.eviden.com/zh-hans/use-cases/business-continuity-and-disaster-recovery-software/"
description: "使用 SafeKit 实现业务连续性和灾难恢复：跨两个机房的双节点集群，同步复制和自动故障转移。"
category: "use-cases"
lang: "zh-hans"
topics: "业务连续性和灾难恢复软件、🔍 探索 SafeKit"
translation: "translate_md 2026-11-16.4 | glossaire 2026-11-16.12 | Translation LLM | 50 expressions"
image: "/wp-content/uploads/2023/02/remote-datacenters.png"
schemaType: "Article"
---

# 适用于 SafeKit 双节点集群的业务连续性和灾难恢复软件 {#business-continuity-and-disaster-recovery-software-for-2-node-clusters-with-safekit}

## 业务连续性和灾难恢复软件 {#business-continuity-and-disaster-recovery-software}

### 选择 SafeKit 软件实现业务连续性和灾难恢复的理由 {#reasons-to-choose-the-safekit-software-for-business-continuity-and-disaster-recovery}


![使用 SafeKit 简单的业务连续性和灾难恢复软件](/wp-content/uploads/2023/02/remote-datacenters.png "w:300")


无论您是在一个服务器机房还是在两个远程服务器机房中部署 SafeKit 集群，配置都是相同的。唯一的要求是远程站点之间有一个扩展的 LAN 或扩展 VLAN。

### 如何在两个远程机房之间实现简单的容错高可用方案？ {#how-to-implement-a-simple-high-availability-solution-between-two-remote-computer-rooms}

使用 SafeKit，您可以轻松地将 mirror 模块和 <span class="notranslate farm-term" translate="no">farm</span> 模块部署到远程机房的服务器上。无需特殊的集群配置。因此，SafeKit 将业务连续性和灾难恢复结合在一个简单的架构中。SafeKit 还可以处理网络隔离，而无需第三台服务器或特殊的仲裁磁盘。阅读更多关于[裂脑管理](</zh-hans/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>)的信息。

### 业务连续性与备份解决方案 {#business-continuity-vs-backup-solutions}

业务连续性和备份解决方案可应对不同的故障场景。它们是互补的，而不是可互换的。SafeKit 高可用性集群提供业务连续性。由于实时复制和自动故障转移，它可在服务器或应用程序发生故障时以最小中断保持应用程序运行。备份解决方案可防止更广泛的损失，例如勒索软件攻击或操作员错误。它们通常依赖于您之后恢复的异地数据副本。恢复需要更长的时间，并且没有自动故障转移。

阅读更多关于[将 SafeKit 高可用性与灾难恢复备份相结合](</zh-hans/best-practises/high-availability-disaster-recovery-hadr/>)的信息。


{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}