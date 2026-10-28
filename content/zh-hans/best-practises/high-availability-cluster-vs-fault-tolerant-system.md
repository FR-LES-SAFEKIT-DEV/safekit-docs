---
title: "高可用性集群与容错系统：选择合适的冗余策略"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/high-availability-cluster-vs-fault-tolerant-system/"
description: "比较高可用性集群与容错系统。了解SafeKit如何提出一种无需 SAN 的软件高可用性集群，该集群可同时抵御硬件和软件故障。通过省去专用容错硬件来降低成本，同时确保零数据丢失 (RPO 0)。"
category: "best-practises"
lang: "zh-hans"
topics: "高可用性和容错性有什么区别？高可用性和容错性的优缺点是什么？🔍 SafeKit高可用性导航中心"
---

# 高可用性集群与容错系统：选择合适的冗余策略 {#ha-cluster-vs-fault-tolerant-system-choosing-the-right-redundancy-strategy}

## 高可用性和容错性有什么区别 {#what-is-the-difference-between-high-availability-and-fault-tolerance}

### 概述 {#overview}

本文通过分析硬件限制、软件故障、恢复时间目标 (RTO)、恢复点目标 (RPO) 等因素，探讨了高可用性集群与容错系统的优缺点。

以下对比表详细解释了容错系统与软件高可用性集群SafeKit之间的区别。

### 什么是高可用性？ {#what-is-high-availability}

高可用性集群基于两台服务器，当硬件或软件发生故障时，关键应用程序会自动重启。集群分为两种类型：硬件集群和软件集群。

硬件集群基于共享磁盘，导致服务器之间以及服务器与共享磁盘阵列之间的连接存在依赖关系。

像SafeKit这样的软件集群基于实时数据复制，并且与硬件无关：它们可以部署在物理服务器、虚拟服务器或云端。

### 什么是？ {#what-is-fault-tolerance}

容错系统依靠专用硬件或专用虚拟机管理程序来检测硬件故障，并立即切换到冗余硬件组件，而无需重新启动应用程序。

容错系统只能处理硬件故障，而无法处理软件故障，而软件故障才是系统停机的最常见原因。

## 高可用性和容错性的优缺点 {#pros-and-cons-of-high-availability-and-fault-tolerance}

在保护关键应用程序免受故障**时，主要有两种方法**软件高可用性集群** **系统。每种方法在成本、灵活性、恢复时间和硬件要求方面各有优劣。了解这些差异有助于您根据自身需求选择合适的解决方案。

软件高可用性集群与容错系统**比较**

标准|软件高可用性集群|容错系统  
---|---|---  
产品| [ SafeKit和Windows Linux ](</>) |均为容错产品  
硬件/虚拟机管理程序|无专用服务器，无专用虚拟机管理程序。可与标准且免费的虚拟机管理程序Windows （Hyper-V）配合使用，该管理程序包含在Windows服务器和 PC 内核中。也可与标准且免费的虚拟机管理程序 KVM（基于内核的虚拟机）配合使用，该管理程序集成在主线内核Linux中。每个[服务器都可以作为另一个服务器的故障转移服务器，用于多个应用程序](</zh-hans/architectures/active-active-cluster-real-time-replication/>) |专用硬件或专用虚拟机管理程序。辅助服务器专用于执行同一应用程序，并在指令级别进行同步。  
软件故障 | 软件故障可通过在其他操作系统环境下重启来支持。 | 两台服务器在同一操作系统上同时出现软件异常。  
应用程序和操作系统顺利升级/修复 | 是的——可以逐台服务器地平滑升级/修复应用程序和操作系统。N 版本和 N+1 版本可以共存。 | 不——两台服务器上使用的应用程序和操作系统镜像相同。  
RTO/RPO | 恢复时间 SafeKit ([RTO](</zh-hans/best-practises/what-is-rpo-and-rto-with-examples/>)取决于检测和重启应用程序所需的时间（大约 1 分钟）。数据丢失情况取决于 SafeKit ([RPO](</zh-hans/best-practises/what-is-rpo-and-rto-with-examples/>)) 为零，因为复制是同步的。 | 容错系统的恢复时间 (RTO) 为零。应用程序在发生故障时不会重启，而是在备用服务器上继续运行。数据丢失率 (RPO) 也为零。  
灵活性|可在任何类型的服务器上运行，支持标准Windows和Linux操作系统； |则取决于具体硬件或特定虚拟机管理程序。  
适用于希望为其应用程序添加简单高可用性选项的软件编辑器| ](</zh-hans/use-cases/application-clustering-software/>) |于硬件故障是主要问题的环境[  
  
总而言之，采用** **软件高可用性SafeKit提供了一种经济高效、灵活的解决方案，该方案可在标准硬件上运行，支持滚动升级，停机时间接近于零（RTO 约为 1 分钟），且数据零丢失。容错系统提供即时故障转移（RTO = 0），但需要专用硬件，且缺乏独立软件更新的灵活性。


{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}