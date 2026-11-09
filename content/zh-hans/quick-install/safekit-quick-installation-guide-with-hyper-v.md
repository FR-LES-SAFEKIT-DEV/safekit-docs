---
title: "使用 SafeKit 实现 Hyper-V 高可用性：安装 hyperv.safe 模块以实现故障转移"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-with-hyper-v/"
description: "了解如何为使用 SafeKit 的双活 Hyper-V 集群配置 hyperv.safe。通过 2 节点无共享架构在虚拟机级别实现高可用性。在节点之间同步复制多个虚拟机以实现自动故障转移，而无需 SAN 或共享存储的成本。"
category: "quick-install"
lang: "zh-hans"
topics: "Hyper-V 高可用性快速安装指南、SafeKit 高可用性限制、SafeKit/Hyper-V 解决方案概述、在 Windows 上安装 SafeKit/Hyper-V 解决方案 (hyperv.safe)、SafeKit/Hyper-V 解决方案的分步配置、SafeKit/Hyper-V 解决方案演示、🔍 探索 SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# 使用 SafeKit 实现 Hyper-V 高可用性：安装 hyperv.safe 模块以实现故障转移 {#hyper-v-high-availability-with-safekit-install-the-hypervsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-zh-hans app="Hyper-V" mod="hyperv"  %}}
 

## SafeKit/Hyper-V 解决方案概述 {#overview-of-the-safekit--hyper-v-solution}

解决方案在此处介绍：**💡 [无共享存储 (SAN) 的简单 Hyper-V 高可用性](</zh-hans/solutions/hyper-v-replication-automatic-failover-load-balancing/>)**

## 在 Windows 上安装 SafeKit/Hyper-V 解决方案 (hyperv.safe) {#installation-of-the-safekit--hyper-v-solution-on-windows-hypervsafe}

### 先决条件 {#prerequisites}

  * Hyper-V 角色安装在 2 个 Windows 节点上（免费嵌入所有 Windows 版本中，包括 Windows PC 版）。
  * 安装在一个或多个虚拟机中的关键应用程序。
  * 每个 Hyper-V 主机最多可运行 32 台虚拟机。
  * 复制数据的总量限制在几 TB 以内，超出此范围，重新同步所需的时间将变得非常长。
  * 节点之间的最小互连速度为 1Gb/s（建议使用 10Gb/s 以实现更快的重新同步）。
  * IP 故障转移要求两个节点位于同一 LAN 或扩展 LAN (L2) 上 — 不支持路由 L3 网络（🛠️ [云负载均衡器](</zh-hans/resources/safekit-user-guide-82/#Cloud>)除外）。



{{%  insert-safekit-siemens-license-zh-hans  %}}

{{%  insert-safekit-installation-package-windows-zh-hans app="Hyper-V" mod="hyperv"  %}}

{{%  insert-safekit-82-installation-module-windows-zh-hans app="Hyper-V" mod="hyperv"  %}}
 

## SafeKit/Hyper-V 解决方案的分步配置 {#step-by-step-configuration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-82-hyper-v-configuration-zh-hans app="Hyper-V" mod="hyperv"  %}}
 

## SafeKit/Hyper-V 解决方案演示 {#demonstration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-hyperv-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}