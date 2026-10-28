---
title: "Nedap高可用性（需配合SafeKit使用）：安装nedap.safe模块以实现故障转移"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-with-nedap/"
description: "为SafeKit部署nedap.safe模块，以启用Nedap在Windows上的同步实时复制和自动故障转移。本指南将引导您设置一个适用于关键应用程序且无需共享存储的双节点无 SAN 集群。"
category: "quick-install"
lang: "zh-hans"
topics: "Nedap 、 SafeKit高可用性快速安装指南； SafeKit / Nedap解决方案概述；在Windows ( nedap.safe ) 上安装SafeKit / Nedap解决方案； SafeKit / Nedap解决方案分步配置； SafeKit mirror解决方案演示；🔍 SafeKit高可用性导航中心"
---

# Nedap高可用性（与SafeKit配合使用）：安装nedap.safe模块以实现故障转移 {#nedap-high-availability-with-safekit-install-the-nedapsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-zh-hans app="Nedap" mod="nedap"  %}}
 

**📘 [ Nedap AOES 与SafeKit的配置（PDF） ](</wp-content/uploads/documents/NEDAP_AEOS_CLUSTER_SAFEKIT.pdf>)** ：所有详细信息均在此文档中。

## SafeKit / Nedap解决方案概述 {#overview-of-the-safekit--nedap-solution}

解决方案描述如下： **💡 [最简单的Nedap高可用性：2 节点同步复制和故障转移](</zh-hans/solutions/nedap-high-availability-synchronous-replication-failover/>)** 。

## 在Windows ( nedap.safe )上安装SafeKit / Nedap解决方案 {#installation-of-the-safekit--nedap-solution-on-windows-nedapsafe}

### 先决条件 {#prerequisites}

  * 您需要在 2 个节点（虚拟机或物理服务器）上安装Nedap AEOS 和 SQL。
  * 和 SQL Server 在与上述相同的节点上 Nedap AEOS，配置连接 Nedap 使用虚拟 IP 地址而不是服务器的物理 IP 地址将 AEOS 连接到 SQL。否则，故障转移将无法正常工作。 SQL Server 可以是外部的，请参见下面的注释。


ℹ️ 注意： SQL Server可以是外部地址。在这种情况下，在分步配置的第 4 步中：

  * 移除 SQL 数据和日志文件夹的复制功能
  * 移除sqlservr.exe上的进程检查器
  * 从 SERVICES 宏中移除 MSSQLServer。


您可以使用[ SafeKit和sqlserver.safe ](</zh-hans/solutions/sql-server-high-availability-synchronous-replication-failover/>)来实现外部SQL Server的冗余。在这种情况下，请将Nedap AEOS 与 SQL 的连接配置为使用sqlserver.safe模块的虚拟 IP 地址。


{{%  insert-safekit-installation-package-windows-zh-hans app="Nedap AEOS and SQL" mod="nedap"  %}}

{{%  insert-safekit-82-installation-module-windows-zh-hans app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## SafeKit / Nedap解决方案的逐步配置 {#step-by-step-configuration-of-the-safekit--nedap-solution}


{{%  insert-safekit-82-configuration-zh-hans app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## SafeKit mirror解决方案的演示 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}