---
title: "SafeKit KVM 高可用：安装 kvm.safe 模块以实现故障转移"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-with-kvm/"
description: "了解如何使用 SafeKit 配置 kvm.safe 主动/主动 KVM 集群。通过双节点无共享架构实现虚拟机级高可用。在节点之间同步复制多个虚拟机，实现自动故障转移，无需承担 SAN 或共享存储的成本。"
category: "quick-install"
lang: "zh-hans"
topics: "KVM 高可用快速安装指南，SafeKit 高可用性限制，SafeKit / KVM 解决方案概述，在 Linux 上安装 SafeKit / KVM 解决方案 (kvm.safe)，逐步配置 SafeKit / KVM 解决方案，虚拟机级高可用解决方案演示，🔍 SafeKit 高可用导航中心"
---

# SafeKit 的 KVM 高可用：安装 kvm.safe 模块以实现故障转移 {#kvm-high-availability-with-safekit-install-the-kvmsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-zh-hans app="KVM" mod="kvm"  %}}
 

## SafeKit / KVM 解决方案概述 {#overview-of-the-safekit--kvm-solution}

解决方案详见：**💡[无需共享存储的简单 Linux KVM 高可用方案](</solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)**

## 在 Linux 上安装 SafeKit / KVM 解决方案 (kvm.safe) {#installation-of-the-safekit--kvm-solution-on-linux-kvmsafe}

### 先决条件 {#prerequisites}

  * 在 2 个 Linux 节点上安装 KVM。
  * 安装在一台或多台虚拟机内的关键应用程序。
  * 每台 KVM 主机最多支持 32 台虚拟机。
  * 总复制数据限制为几 TB — 除此之外，重新同步时间变得很重要。
  * 节点之间至少 1Gb/s 互连（建议使用 10Gb/s 以加快重新同步速度）。
  * IP 故障转移要求两个节点位于同一 LAN 或扩展 LAN (L2) 上；不支持路由的 L3 网络（使用 🛠️ [云负载均衡器](</resources/safekit-user-guide-82/#Cloud>) 时除外）。



{{%  insert-safekit-installation-package-linux-zh-hans app="KVM" mod="kvm"  %}}

{{%  insert-safekit-82-installation-module-linux-zh-hans app="KVM" mod="kvm"  %}}
 

## SafeKit / KVM 解决方案的分步配置 {#step-by-step-configuration-of-the-safekit--kvm-solution}


{{%  insert-safekit-82-kvm-configuration-zh-hans app="KVM" mod="kvm"  %}}
 

## 虚拟机级高可用解决方案演示 {#demonstration-of-a-vm-level-high-availability-solution}


{{%  insert-safekit-hyperv-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}