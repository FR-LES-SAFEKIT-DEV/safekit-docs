---
title: "Firebird高可用性（需配合SafeKit使用）：安装firebird.safe模块以实现故障转移"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-with-firebird/"
description: "为SafeKit部署firebird.safe模块，以在Windows和Linux上实现Firebird的同步实时复制和自动故障转移。本指南将引导您设置一个适用于关键应用程序且无需共享存储的双节点无 SAN 集群。"
category: "quick-install"
lang: "zh-hans"
topics: "Firebird 、 SafeKit高可用性快速安装指南； SafeKit / Firebird高可用性限制； SafeKit / Firebird解决方案概述；在Windows和Linux ( firebird.safe ) 上安装SafeKit / Firebird解决方案的逐步配置； SafeKit和mirror解决方案演示；🔍 SafeKit高可用性导航中心"
---

# Firebird高可用性（与SafeKit配合使用）：安装firebird.safe模块以实现故障转移{#firebird-high-availability-with-safekit-install-the-firebirdsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-zh-hans app="Firebird" mod="firebird"  %}}
 

## SafeKit / Firebird解决方案概述{#overview-of-the-safekit--firebird-solution}

解决方案描述如下： ** 💡 [最简单的Firebird高可用性：2 节点同步复制和故障转移](</solutions/firebird-high-availability-synchronous-replication-failover/>) ** 。

## 在Windows和Linux ( firebird.safe ) {#installation-of-the-safekit--firebird-solution-on-windows-and-linux-firebirdsafe}上安装SafeKit / Firebird解决方案

### 先决条件{#prerequisites}

  * 您需要在 2 个节点（虚拟机或物理服务器）上安装Firebird 。



{{%  insert-safekit-installation-package-windows-zh-hans app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-82-installation-module-windows-zh-hans app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-installation-package-linux-zh-hans app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-82-installation-module-linux-zh-hans app="Firebird" mod="firebird"  %}}
 

## SafeKit / Firebird解决方案{#step-by-step-configuration-of-the-safekit--firebird-solution}的逐步配置


{{%  insert-safekit-82-configuration-zh-hans app="Firebird" mod="firebird"  %}}
 

## SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}解决方案的演示


{{%  insert-safekit-mirror-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}