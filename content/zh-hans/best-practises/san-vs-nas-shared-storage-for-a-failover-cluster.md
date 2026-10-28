---
title: "SAN 与 NAS 共享存储故障转移集群对比分析"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/san-vs-nas-shared-storage-for-a-failover-cluster/"
description: "比较 SAN 和 NAS 共享存储，以构建故障转移集群。了解SafeKit如何提出一种无 SAN 架构，该架构无需昂贵的硬件或复杂的仲裁磁盘，即可消除对共享存储的依赖，简化故障转移脚本，并防止数据损坏。"
category: "best-practises"
lang: "zh-hans"
topics: "对于故障转移集群，SAN 和 NAS 共享存储哪个方案最简单？🔍 SafeKit高可用性导航中心"
---

# SAN 与 NAS 共享存储故障转移集群对比：详细比较{#san-vs-nas-shared-storage-for-failover-clustering-a-detailed-comparison}

## 对于故障转移集群，SAN 和 NAS 共享存储哪个方案最简单？ {#what-is-the-simplest-solution-between-a-san-vs-a-nas-shared-storage-for-a-failover-cluster}

###  用于故障转移集群{#san-shared-storage-or-nas-iscsi-shared-storage-for-a-failover-cluster}的 SAN 共享存储或 NAS iSCSI 共享存储


![ SAN 共享存储或 NAS iSCSI 共享存储，用于故障转移集群](/wp-content/uploads/2023/03/raw-disk-shared-storage.png "w:200")


该架构的实现之所以复杂，有几个原因：

  * 故障转移时，切换共享存储需要底层指令，而这些指令取决于存储设备制造商。
  * 在重新启动应用程序之前，必须先完成文件系统 (FS) 的恢复过程。
  * 如果两个节点上的两个文件系统同时访问同一个原始磁盘，则整个文件系统将被损坏。
  * 为避免重复访问，必须配置仲裁磁盘。


###  用于故障转移集群{#nas-smb-shared-storage-or-nas-nfs-shared-storage-for-a-failover-cluster}的 NAS SMB 共享存储或 NAS NFS 共享存储


![ NAS SMB 共享存储或 NAS NFS 共享存储，用于故障转移集群](/wp-content/uploads/2023/03/nas-shared-storage-1.png "w:200")


该架构易于实现的原因有以下几点： 
  * 故障转移时，切换共享存储仅意味着重新挂载外部文件系统。
  * 在重新启动应用程序之前，无需对文件系统执行任何恢复程序。
  * 如果两个节点同时访问同一个共享文件系统，整个文件系统不会被损坏。
  * 然而，当节点隔离时，仍然存在同一个应用程序重复执行两次，从而损坏共享存储中的数据的可能性。


###  使用 Eviden SafeKit {#real-time-replication-and-failover-with-eviden-safekit}进行实时复制和故障转移


![实时复制和故障转移，配合SafeKit ](/wp-content/uploads/2023/03/no-shared-storage.png "w:200")


SafeKit不存在此类问题，因为它的复制和故障转移解决方案不需要共享存储。

但是，如果SafeKit必须管理共享存储：

  * 使用 NAS SMB 共享存储或 NAS NFS 共享存储，
  * 在重启脚本中加入外部文件系统的挂载/卸载指令。
  * 配置[ SafeKit脑裂检测器](</zh-hans/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>)以避免在节点隔离时同一应用程序访问共享存储的两次执行。



{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}