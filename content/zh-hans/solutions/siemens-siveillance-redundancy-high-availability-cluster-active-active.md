---
title: "Siemens Siveillance Suite 的高可用性和冗余：主动-主动无共享存储集群"
canonical: "https://safekit.eviden.com/zh-hans/solutions/siemens-siveillance-redundancy-high-availability-cluster-active-active/"
description: "Siemens Siveillance 套件高可用性：SafeKit 在两台活动服务器间复制 Hyper-V 虚拟机并自动故障转移。"
category: "solutions"
lang: "zh-hans"
topics: "SafeKit（适用于 Siemens Siveillance）：2 节点无共享存储 Hyper-V 集群, 目录, SafeKit 软件如何简单地在没有 SAN 共享存储的情况下实现 Siemens Siveillance高可用性集群？, SafeKit Siemens Siveillance 集群如何工作？, SafeKit 高可用性限制, 比较：适用于 Siemens Siveillance 的 SafeKit 与原生 Hyper-V 群集, 视频指南：为 Siemens Siveillance 配置 SafeKit HA 集群, SafeKit，安全市场公认的解决方案"
hashpart: "safekit-hyperv-tco, toc, safekit-hyperv-ha-cluster, safekit-hyperv-ha-how-it-works, safekit-ha-limitations, safekit-hyperv-ha-comparison, videoguide-safekit-hyperv-cluster, safekit-a-recognized-solution-on-the-security-market"
translation: "translate_md 2026-11-08.3 | glossaire 2026-11-08.11 | Translation LLM | 37 expressions"
image: "/wp-content/uploads/2026/01/safekit-vm-repli-720-720.jpg"
schemaType: "TechArticle"
schemaApplications: ["Siemens Siveillance"]
---

# Siemens Siveillance Suite 的高可用性和冗余：主动-主动无共享存储集群 {#high-availability-and-redundancy-for-siemens-siveillance-suite-active-active-sanless-clustering}


{{%  insert-safekit-hyperv-solution-mirror-zh-hans app="Siemens Siveillance"  %}}
 

### 备注 {#notes}

  * 对于 Siveillance VMS 和录像服务器，请使用集成的故障转移机制，而不是 SafeKit。录像机可以在两个物理服务器上的主机级别执行，也可以在两个物理服务器上的 2 个虚拟机中执行（不通过 SafeKit 复制）。
  * **💡 [Siemens Siveillance VMS](</zh-hans/solutions/siemens-siveillance-vms-the-simplest-high-availability-cluster-between-two-redundant-servers/>)** 在应用层还有另一种解决方案，可以在任何基础设施（物理服务器、任何虚拟机管理程序，包括 **VMware** 等）中运行。



{{%  insert-safekit-siemens-license-zh-hans app="Siemens Desigo CC"  %}}

{{%  insert-safekit-security-case-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}