---
title: 使用 SafeKit 实现 Hyper-V 高可用性：安装 hyperv.safe 模块进行故障转移
canonical: https://safekit.eviden.com/zh-hans/zh-hans/quick-install/safekit-quick-installation-guide-with-hyper-v/
description: 了解如何使用 SafeKit 为主动/主动 Hyper-V 集群配置 hyperv.safe。通过 2
  节点无共享架构实现虚拟机级别的高可用性。跨节点同步复制多个虚拟机以实现自动故障转移，无需 SAN 或共享存储成本。
category: quick-install
lang: zh-hans
topics: Hyper-V 高可用性快速安装指南、SafeKit 高可用性限制、SafeKit / Hyper-V 解决方案概述、在 Windows 上安装
  SafeKit / Hyper-V 解决方案 (hyperv.safe)、SafeKit / Hyper-V 解决方案的逐步配置、SafeKit /
  Hyper-V 解决方案演示、🔍 SafeKit 高可用性导航中心
---

# Hyper-V 高可用性与 SafeKit：安装 hyperv.safe 模块以进行故障转移 {#hyper-v-high-availability-with-safekit-install-the-hypervsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-zh-hans app="Hyper-V" mod="hyperv"  %}}
 

## SafeKit / Hyper-V 解决方案概述 {#overview-of-the-safekit--hyper-v-solution}

解决方案描述如下：**💡[简单Hyper-V高可用性，无需共享存储（SAN）](</zh-hans/solutions/hyper-v-replication-automatic-failover-load-balancing/>)**

## 安装 SafeKit / Hyper-V 解决方案 Windows （超级安全） {#installation-of-the-safekit--hyper-v-solution-on-windows-hypervsafe}

### 先决条件 {#prerequisites}

  * Hyper-V 角色安装在 2 个 Windows 节点上（免费嵌入到所有 Windows 版本中，包括用于 PC 的 Windows）。
  * 安装在一台或多台虚拟机内的关键应用程序。
  * 每个 Hyper-V 主机最多 32 个虚拟机。
  * 总复制数据限制为几 TB — 除此之外，重新同步时间变得很重要。
  * 节点之间至少 1Gb/s 互连（建议使用 10Gb/s 以加快重新同步速度）。
  * IP 故障转移需要同一 LAN 或扩展 LAN (L2) 上的两个节点 — 不支持路由 L3 网络（🛠️ [云负载均衡器](</resources/safekit-user-guide-82/#Cloud>) 除外）。



{{%  insert-safekit-siemens-license-zh-hans  %}}

{{%  insert-safekit-installation-package-windows-zh-hans app="Hyper-V" mod="hyperv"  %}}

{{%  insert-safekit-82-installation-module-windows-zh-hans app="Hyper-V" mod="hyperv"  %}}
 

## SafeKit / Hyper-V 解决方案的逐步配置 {#step-by-step-configuration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-82-hyper-v-configuration-zh-hans app="Hyper-V" mod="hyperv"  %}}
 

## SafeKit / Hyper-V 解决方案演示 {#demonstration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-hyperv-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}