---
title: "高可用性集群中断电和网络隔离的处理"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/power-outage-and-network-isolation-in-a-cluster/"
description: "了解如何在高可用性集群中管理网络隔离和断电。 SafeKit 提出了一种无 SAN 架构，集成了脑裂检测器和自动重新同步功能，以确保数据完整性和 24/7 全天候正常运行，而无需共享磁盘。"
category: "best-practises"
lang: "zh-hans"
topics: "集群中发生网络隔离时有哪些不同的场景？集群中发生断电时有哪些不同的场景？🔍 SafeKit高可用性导航中心"
---

# HA集群中断电和网络隔离的处理 {#handling-power-outages-and-network-isolation-in-a-ha-cluster}


{{%  insert-safekit-network-isolation-zh-hans  %}}
 

## 集群断电时有哪些不同的场景？ {#what-are-the-different-scenarios-in-case-of-power-outage-in-a-cluster}

### 主节点断电 {#primary-node-power-outage}

当断电仅导致主节点停止运行时：

  * 备用节点会自动进行故障转移，此时备用节点将变为单独运行状态并重启应用程序。
  * 当节点 1 重启后，在复制数据重新同步后，它将变为 SEDOND。
  * 如有需要，管理员可以互换主管理员和副管理员的角色。


### 辅助节点断电 {#secondary-node-power-outage}

当断电时，只有备用节点停止运行：

  * 没有故障转移，主节点变为孤立节点，应用程序继续在节点 1 上执行。
  * 当节点 2 重启后，在复制数据重新同步后，它将变为 SEDOND。


### 全面停电 - 案例 1 {#general-power-outage---case-1}

当断电导致两个节点都停止工作时，默认行为是：

  * 两个节点都进入停止状态。
  * 当节点 1 重启时，它不会进入 ALONE 状态，也不会重启应用程序，因为它不知道自己是否拥有最新数据。因此，它会进入 WAIT 状态，等待其他节点重启。
  * 当节点 2 重启时，两个节点都会恢复到之前的 PRIM/SECOND 状态。


### 全面停电 - 案例 2 {#general-power-outage---case-2}

当断电导致两个节点都停止运行时，syncdelta 的行为如下：

  * 例如，配置中将 syncdelta 设置为 10 分钟，这意味着即使节点的数据比上次同步落后 10 分钟，也会接受该节点的启动。
  * 当节点 1 重启时，它会进入 ALONE 状态并重启应用程序，前提是重启在断电后 10 分钟内完成。
  * 当节点 2 重启后，在复制数据重新同步后，它将变为 SECOND。
  * 注意：如果节点 2 首先重启，则节点 2 将变为 ALONE，节点 1 将在启动时变为 SECOND。



{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}