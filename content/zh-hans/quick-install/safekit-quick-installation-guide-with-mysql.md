---
title: "安装 SafeKit：MySQL 高可用"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-with-mysql/"
description: "分步指南：安装 SafeKit mysql.safe 模块，在 Windows 或 Linux 上实现 MySQL 的实时复制和自动故障转移。"
category: "quick-install"
lang: "zh-hans"
topics: "MySQL 高可用性快速安装指南, SafeKit 高可用性限制, SafeKit/MySQL 解决方案概述, 在 Windows 和 Linux 上安装 SafeKit/MySQL 解决方案 (mysql.safe), SafeKit/MySQL 服务器解决方案的分步配置, SafeKit mirror 解决方案演示"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--mysql-solution, installation-of-the-safekit--mysql-solution-on-windows-and-linux-mysqlsafe, step-by-step-configuration-of-the-safekit--mysql-server-solution, demonstration-of-the-safekit-mirror-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# 安装 SafeKit：MySQL 高可用 {#install-safekit-for-mysql-high-availability}


{{%  insert-safekit-mirror-guide-zh-hans app="MySQL" mod="mysql"  %}}
 

## SafeKit/MySQL 解决方案概述 {#overview-of-the-safekit--mysql-solution}

解决方案在此处介绍：**💡 [最简单的 MySQL 高可用性：2 节点同步复制和故障转移](</zh-hans/solutions/mysql-high-availability-synchronous-replication-failover/>)**。

## 在 Windows 和 Linux 上安装 SafeKit/MySQL 解决方案 (mysql.safe) {#installation-of-the-safekit--mysql-solution-on-windows-and-linux-mysqlsafe}

### 先决条件 {#prerequisites}

  * 您需要在 2 个节点（虚拟机或物理服务器）上安装 MySQL。



{{%  insert-safekit-installation-package-windows-zh-hans app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-windows-zh-hans app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-installation-package-linux-zh-hans app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-linux-zh-hans app="MySQL" mod="mysql"  %}}
 

## SafeKit/MySQL 服务器解决方案的分步配置 {#step-by-step-configuration-of-the-safekit--mysql-server-solution}


{{%  insert-safekit-82-configuration-zh-hans app="MySQL" mod="mysql"  %}}
 

## SafeKit mirror 解决方案演示 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}