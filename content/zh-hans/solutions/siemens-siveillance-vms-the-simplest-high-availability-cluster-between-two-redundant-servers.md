---
title: "Siemens Siveillance VMS 高可用性：使用 SafeKit 2 节点无共享集群"
canonical: "https://safekit.eviden.com/zh-hans/solutions/siemens-siveillance-vms-the-simplest-high-availability-cluster-between-two-redundant-servers/"
description: "使用 SafeKit 在应用层面为 Siemens Siveillance VMS 实现高可用性。我们的双节点无共享解决方案使用 SiveillanceVMS.safe 模块进行实时复制和自动故障转移，无需 SAN。通过简单的纯软件集群确保连续的视频管理。"
category: "solutions"
lang: "zh-hans"
topics: "SafeKit 快速安装指南，适用于 Siemens Siveillance VMS 和 SQL（SiveillanceVMS.safe mirror 模块）、SANless SafeKit mirror 集群如何与 Milestone XProtect 配合使用、目录、SafeKit 软件如何简单地实现无共享存储的 Milestone XProtect 高可用性集群？、SafeKit mirror 集群如何与 Milestone XProtect 配合使用？、SafeKit 高可用性限制、比较：适用于 Milestone XProtect 的 SafeKit 与其他集群解决方案、视频指南：配置 SafeKit HA mirror 集群、🔍 探索 SafeKit"
translation: "translate_md 2026-11-08.3 | glossaire 2026-11-08.11 | Translation LLM | 37 expressions"
---

# Siemens Siveillance VMS 高可用性：使用 SafeKit 2 节点无共享集群 {#siemens-siveillance-vms-high-availability-2-node-shared-nothing-cluster-with-safekit}

## SafeKit 快速安装指南，适用于 Siemens Siveillance VMS 和 SQL（SiveillanceVMS.safe mirror 模块） {#safekit-quick-installation-guide-with-siemens-siveillance-vms-and-sql-siveillancevmssafe-mirror-module}

**下载 SiveillanceVMS.safe 模块，然后转到 💡 [Milestone 安装，](</zh-hans/solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/>)在说明中将 milestone.safe 替换为 SiveillanceVMS.safe**。

<a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/SiveillanceVMS.safe" download="SiveillanceVMS.safe">Siemens Siveillance VMS 模块 ></a> 


{{%  insert-safekit-solution-mirror-2-zh-hans app="Milestone XProtect" guide="/zh-hans/quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server/" img="/wp-content/uploads/2026/02/safekit-milestone-xprotect-1024.jpg"  %}}

{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}