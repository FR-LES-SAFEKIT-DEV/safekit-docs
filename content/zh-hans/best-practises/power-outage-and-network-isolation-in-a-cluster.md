---
title: "集群中的断电与网络隔离"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/power-outage-and-network-isolation-in-a-cluster/"
description: "高可用性集群如何应对断电和网络隔离：SafeKit 脑裂检测器和自动重新同步保护您的数据。"
category: "best-practises"
lang: "zh-hans"
topics: "集群中网络隔离的不同场景有哪些？, 集群断电时有哪些不同的情况？"
hashpart: "isolation, what-are-the-different-scenarios-in-case-of-power-outage-in-a-cluster"
translation: "translate_md 2026-11-20.2 | glossaire 2026-11-20.6 | Translation LLM | 54 expressions"
image: "/wp-content/uploads/2023/02/quorum-with-remote-sites.png"
schemaType: "TechArticle"
---

# 集群中的断电与网络隔离 {#power-outages-and-network-isolation-in-a-cluster}


{{%  insert-safekit-network-isolation-zh-hans  %}}
 

## 集群断电时有哪些不同的情况？ {#what-are-the-different-scenarios-in-case-of-power-outage-in-a-cluster}

在以下场景中，节点 1 最初是主节点。节点 2 最初是辅助节点。

### 主节点断电 {#primary-node-power-outage}

如果仅主节点断电：

  * SafeKit 会自动故障转移到辅助节点。节点 2 变为 ALONE 并重新启动应用程序。
  * 当节点 1 重启时，它会重新同步复制的数据。然后它成为 SECOND。
  * 如有需要，管理员可以交换主角色和次角色。


### 辅助节点断电 {#secondary-node-power-outage}

当停电仅导致辅助节点停止运行时：

  * 未发生故障转移。节点 1 变为 ALONE。应用程序继续在节点 1 上运行。
  * 当节点 2 重启时，它会重新同步复制的数据。然后它成为 SECOND。


### 两个节点都断电 - 情况 1 {#general-power-outage---case-1}

当停电导致两个节点都停止运行时，默认行为如下：

  * 两个节点都进入 STOP 状态。
  * 当节点 1 重启时，它不会进入 ALONE 状态。它不会重新启动应用程序。它无法知道其数据是否是最新的。因此，它会进入 WAIT 状态并等待另一个节点重启。
  * 当节点 2 重启时，两个节点都将返回到它们之前的状态：PRIM 和 SECOND。


### 两个节点都断电 - 情况 2 {#general-power-outage---case-2}

当停电导致两个节点都停止运行时，带 `syncdelta` 参数的行为如下：

  * 在此示例中，配置中的 `syncdelta` 设置为 10 分钟。即使节点的数据落后于上次同步最多 10 分钟，它也可以启动。
  * 如果节点 1 在断电后 10 分钟内重新启动，它将进入 ALONE 状态。它会重新启动应用程序。
  * 当节点 2 重启时，它会重新同步复制的数据。然后它成为 SECOND。
  * 注意：如果节点 2 先重启，它将变为 ALONE。节点 1 启动后将变为 SECOND。



{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}