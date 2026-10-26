---
title: "使用 SafeKit 实现 PostgreSQL 高可用性：安装 postgresql.safe 模块以进行故障转移"
canonical: "https://safekit.eviden.com/zh-hans/quick-install/safekit-quick-installation-guide-with-postgresql/"
description: "为 SafeKit 部署 postgresql.safe 模块，以在 Windows 和 Linux 上启用 PostgreSQL 的同步实时复制和自动故障转移。本指南将引导您在没有共享存储的情况下为关键应用程序设置 2 节点 SANless 集群。"
category: "quick-install"
lang: "zh-hans"
topics: "PostgreSQL 高可用快速安装指南、SafeKit 高可用限制、SafeKit / PostgreSQL 解决方案概述、在 Windows 和 Linux 上安装 SafeKit / PostgreSQL 解决方案 (postgresql.safe)、SafeKit / PostgreSQL 解决方案的逐步配置、SafeKit 镜像解决方案演示、🔍 SafeKit 高可用导航中心"
---

# SafeKit 的 PostgreSQL 高可用性：安装 postgresql.safe 模块以进行故障转移 {#postgresql-high-availability-with-safekit-install-the-postgresqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-zh-hans app="PostgreSQL" mod="postgresql.safe"  %}}
 

## SafeKit / PostgreSQL 解决方案概述 {#overview-of-the-safekit--postgresql-solution}

解决方案描述如下：**💡[最简单的 PostgreSQL 高可用性：2 节点同步复制和故障转移](</zh-hans/solutions/postgresql-high-availability-synchronous-replication-failover/>)**。

## 在 Windows 和 Linux 上安装 SafeKit / PostgreSQL 解决方案 (postgresql.safe) {#installation-of-the-safekit--postgresql-solution-on-windows-and-linux-postgresqlsafe}

### 先决条件 {#prerequisites}

  * 您需要在 2 个节点（虚拟机或物理服务器）上安装 PostgreSQL。



{{%  insert-safekit-installation-package-windows-zh-hans app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-windows-zh-hans app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-installation-package-linux-zh-hans app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-linux-zh-hans app="PostgreSQL" mod="postgresql"  %}}
 

## SafeKit / PostgreSQL解决方案的逐步配置 {#step-by-step-configuration-of-the-safekit--postgresql-solution}


{{%  insert-safekit-82-configuration-zh-hans app="PostgreSQL" mod="postgresql"  %}}
 

## SafeKit镜像解决方案演示 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-zh-hans  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}