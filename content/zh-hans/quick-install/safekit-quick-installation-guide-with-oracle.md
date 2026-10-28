---
title: "Oracle高可用性（需配合SafeKit使用）：安装oracle.safe模块以实现故障转移"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-with-oracle/"
description: "为SafeKit部署oracle.safe模块，以在Windows和Linux上实现Oracle的同步实时复制和自动故障转移。本指南将引导您设置一个适用于关键应用程序且无需共享存储的双节点无 SAN 集群。"
category: "quick-install"
lang: "zh-hans"
topics: "Oracle 、 SafeKit高可用性快速安装指南； SafeKit / Oracle高可用性限制； SafeKit / Oracle解决方案概述；在Windows和Linux ( oracle.safe ) 上安装SafeKit / Oracle解决方案的逐步配置； SafeKit和mirror解决方案演示；🔍 SafeKit高可用性导航中心"
---

# Oracle高可用性（与SafeKit配合使用）：安装oracle.safe模块以实现故障转移 {#oracle-high-availability-with-safekit-install-the-oraclesafe-module-for-failover}


{{%  insert-safekit-mirror-guide-zh-hans app="Oracle" mod="oracle"  %}}
 

## SafeKit / Oracle解决方案概述 {#overview-of-the-safekit--oracle-solution}

解决方案描述如下： **💡 [最简单的Oracle高可用性：2 节点同步复制和故障转移](</zh-hans/solutions/oracle-high-availability-synchronous-replication-failover/>)** 。

## 在Windows和Linux ( oracle.safe )上安装SafeKit / Oracle解决方案 {#installation-of-the-safekit--oracle-solution-on-windows-and-linux-oraclesafe}

### 先决条件 {#prerequisites}

  * 您需要在 2 个节点（虚拟机或物理服务器）上安装Oracle 。



{{%  insert-safekit-installation-package-windows-zh-hans app="Oracle" mod="oracle"  %}}

{{%  insert-safekit-82-installation-module-windows-zh-hans app="Oracle" mod="oracle"  %}}

{{%  insert-safekit-installation-package-linux-zh-hans app="Oracle" mod="oracle"  %}}

{{%  insert-safekit-82-installation-module-linux-zh-hans app="Oracle" mod="oracle"  %}}
 

## SafeKit / Oracle解决方案的逐步配置 {#step-by-step-configuration-of-the-safekit--oracle-solution}


{{%  insert-safekit-82-configuration-zh-hans app="Oracle" mod="oracle"  %}}
 

## SafeKit mirror解决方案的演示 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}