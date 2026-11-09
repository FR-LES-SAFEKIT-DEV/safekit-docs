---
title: "使用 SafeKit 实现 KVM 高可用性：安装 kvm.safe 模块以实现故障转移"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-with-kvm/"
description: "了解如何为使用 SafeKit 的双活 KVM 集群配置 kvm.safe。通过 2 节点无共享架构在 VM 级别实现高可用性。在节点之间同步复制多个 VM 以实现自动故障转移，而无需 SAN 或共享存储的成本。"
category: "quick-install"
lang: "zh-hans"
topics: "KVM 高可用性快速安装指南、SafeKit 高可用性限制、SafeKit/KVM 解决方案概述、在 Linux 上安装 SafeKit/KVM 解决方案 (kvm.safe)、SafeKit/KVM 解决方案的分步配置、虚拟机级别高可用性解决方案演示、🔍 探索 SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# 使用 SafeKit 实现 KVM 高可用性：安装 kvm.safe 模块以实现故障转移 {#kvm-high-availability-with-safekit-install-the-kvmsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-zh-hans app="KVM" mod="kvm"  %}}
 

## SafeKit/KVM 解决方案概述 {#overview-of-the-safekit--kvm-solution}

解决方案在此处介绍：**💡 [无共享存储的简单 Linux KVM 高可用性](</zh-hans/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)**

## 在 Linux 上安装 SafeKit/KVM 解决方案 (kvm.safe) {#installation-of-the-safekit--kvm-solution-on-linux-kvmsafe}

### 先决条件 {#prerequisites}

  * KVM 安装在 2 个 Linux 节点上。
  * 安装在一个或多个虚拟机中的关键应用程序。
  * 每个 KVM 主机最多可运行 32 台虚拟机。
  * 复制数据的总量限制在几 TB 以内，超出此范围，重新同步所需的时间将变得非常长。
  * 节点之间的最小互连速度为 1Gb/s（建议使用 10Gb/s 以实现更快的重新同步）。
  * IP 故障转移要求两个节点位于同一 LAN 或扩展 LAN (L2) 上 — 不支持路由 L3 网络（🛠️ [云负载均衡器](</zh-hans/resources/safekit-user-guide-82/#Cloud>)除外）。



{{%  insert-safekit-installation-package-linux-zh-hans app="KVM" mod="kvm"  %}}

{{%  insert-safekit-82-installation-module-linux-zh-hans app="KVM" mod="kvm"  %}}
 

## SafeKit/KVM 解决方案的分步配置 {#step-by-step-configuration-of-the-safekit--kvm-solution}


{{%  insert-safekit-82-kvm-configuration-zh-hans app="KVM" mod="kvm"  %}}
 

## 虚拟机级别高可用性解决方案演示 {#demonstration-of-a-vm-level-high-availability-solution}


{{%  insert-safekit-hyperv-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}