---
title: "SAN vs. NAS Shared Storage for Failover Clustering: A Detailed Comparison"
canonical: "https://safekit.eviden.com/best-practises/san-vs-nas-shared-storage-for-a-failover-cluster/"
description: "Compare SAN and NAS shared storage for failover clusters. SafeKit does not need shared storage. It simplifies failover scripts and prevents data corruption. It requires no expensive hardware and no complex quorum disk."
category: "best-practises"
lang: "en"
topics: "SAN or NAS shared storage: which is simpler for a failover cluster?, 🔍 Explore SafeKit"
image: "/wp-content/uploads/2023/03/raw-disk-shared-storage.png"
---

# SAN vs. NAS Shared Storage for Failover Clustering: A Detailed Comparison {#san-vs-nas-shared-storage-for-failover-clustering-a-detailed-comparison}

## SAN or NAS shared storage: which is simpler for a failover cluster? {#what-is-the-simplest-solution-between-a-san-vs-a-nas-shared-storage-for-a-failover-cluster}

###  SAN shared storage or NAS iSCSI shared storage for a failover cluster {#san-shared-storage-or-nas-iscsi-shared-storage-for-a-failover-cluster}


![SAN shared storage or NAS iSCSI shared storage for a failover cluster](/wp-content/uploads/2023/03/raw-disk-shared-storage.png "w:200")


Several elements make this architecture complex to implement:

  * On failover, switching the shared storage requires low-level commands. These commands depend on the storage manufacturer.
  * A file system recovery procedure must run before the application restarts.
  * If the file systems on both nodes access the same raw disk at the same time, the whole file system is corrupted.
  * To avoid this double access, you must configure a quorum disk.


###  NAS SMB shared storage or NAS NFS shared storage for a failover cluster {#nas-smb-shared-storage-or-nas-nfs-shared-storage-for-a-failover-cluster}


![NAS SMB shared storage or NAS NFS shared storage for a failover cluster](/wp-content/uploads/2023/03/nas-shared-storage-1.png "w:200")


Several elements make this architecture simple to implement:

  * On failover, switching the shared storage only requires remounting the external file system.
  * No file system recovery procedure is required before the application restarts.
  * If both nodes access the same shared file system at the same time, the file system is not corrupted.
  * However, when nodes are isolated, the same application can still run on both nodes. This double execution can corrupt the application data in the shared storage.


###  Real-time replication and failover with Eviden SafeKit {#real-time-replication-and-failover-with-eviden-safekit}


![Real-time replication and failover with SafeKit](/wp-content/uploads/2023/03/no-shared-storage.png "w:200")


SafeKit does not have these issues. With SafeKit, replication and failover do not require shared storage.

However, if SafeKit must manage shared storage:

  * Use NAS SMB or NAS NFS shared storage.
  * Put the mount and umount commands for the external file system in the restart scripts.
  * Configure the SafeKit [split-brain checker](</best-practises/heartbeat-failover-quorum-windows-linux-cluster/>). It prevents a double execution of the same application on the shared storage when nodes are isolated.



{{%  insert-safekit-hub-en  %}}

{{%  insert-safekit-4-buttons-en  %}}