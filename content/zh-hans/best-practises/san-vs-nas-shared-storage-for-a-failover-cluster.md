---
title: "故障转移集群：SAN 与 NAS 对比"
canonical: "https://safekit.eviden.com/zh-hans/best-practises/san-vs-nas-shared-storage-for-a-failover-cluster/"
description: "故障转移集群的 SAN 与 NAS 共享存储对比：局限、成本和风险，以及为何 SafeKit 复制无需共享存储。"
category: "best-practises"
lang: "zh-hans"
topics: "SAN 或 NAS 共享存储：哪种更适合故障转移集群？"
hashpart: "what-is-the-simplest-solution-between-a-san-vs-a-nas-shared-storage-for-a-failover-cluster"
translation: "translate_md 2026-11-20.3 | glossaire 2026-11-20.10 | Translation LLM | 54 expressions"
image: "/wp-content/uploads/2023/03/raw-disk-shared-storage.png"
schemaType: "TechArticle"
---

# 故障转移集群：SAN 与 NAS 对比 {#san-vs-nas-for-a-failover-cluster}

## SAN 或 NAS 共享存储：哪种更适合故障转移集群？ {#what-is-the-simplest-solution-between-a-san-vs-a-nas-shared-storage-for-a-failover-cluster}

###  用于故障转移集群的 SAN 共享存储或 NAS iSCSI 共享存储 {#san-shared-storage-or-nas-iscsi-shared-storage-for-a-failover-cluster}


![用于故障转移集群的 SAN 共享存储或 NAS iSCSI 共享存储](/wp-content/uploads/2023/03/raw-disk-shared-storage.png "w:200")


有几个因素使得该架构难以实施：

  * 在故障转移时，切换共享存储需要低级命令。这些命令取决于存储制造商。
  * 在应用程序重新启动之前，必须运行文件系统恢复过程。
  * 如果两个节点上的文件系统同时访问同一块原始磁盘，则整个文件系统都会损坏。
  * 为避免这种双重访问，您必须配置一个仲裁磁盘。


###  用于故障转移集群的 NAS SMB 共享存储或 NAS NFS 共享存储 {#nas-smb-shared-storage-or-nas-nfs-shared-storage-for-a-failover-cluster}


![用于故障转移集群的 NAS SMB 共享存储或 NAS NFS 共享存储](/wp-content/uploads/2023/03/nas-shared-storage-1.png "w:200")


以下几个要素使该架构易于实施：

  * 在故障转移时，切换共享存储只需要重新挂载外部文件系统。
  * 应用程序重启前无需执行任何文件系统恢复程序。
  * 如果两个节点同时访问同一个共享文件系统，文件系统不会损坏。
  * 但是，当节点被隔离时，相同的应用程序仍然可以在两个节点上运行。这种双重执行可能会损坏共享存储中的应用程序数据。


###  使用 Eviden SafeKit 进行实时复制和故障转移 {#real-time-replication-and-failover-with-eviden-safekit}


![使用 SafeKit 进行实时复制和故障转移](/wp-content/uploads/2023/03/no-shared-storage.png "w:200")


SafeKit 没有这些问题。使用 SafeKit，复制和故障转移不需要共享存储。

但是，如果 SafeKit 必须管理共享存储：

  * 使用 NAS SMB 或 NAS NFS 共享存储。
  * 将外部文件系统的挂载和卸载命令放入重启脚本中。
  * 配置 [SafeKit 脑裂检测器](</zh-hans/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>)。当节点隔离时，它可防止在共享存储上双重执行同一应用程序。



{{%  insert-safekit-hub-zh-hans  %}}

{{%  insert-safekit-4-buttons-zh-hans  %}}