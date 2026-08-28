---
title: "SAN vs. NAS Shared Storage for Failover Clustering: A Detailed Comparison - SafeKit HA"
canonical: "https://safekit.eviden.com/best-practises/san-vs-nas-shared-storage-for-a-failover-cluster/"
description: "Compare SAN vs. NAS shared storage for failover clusters. Learn why SafeKit proposes a SANless architecture that eliminates shared storage dependencies, simplifies failover scripts, and prevents data corruption without expensive hardware or complex quorum disks."
category: "best-practises"
lang: "en"
topics: "What is the simplest solution between a SAN vs a NAS shared storage for a failover cluster?, 🔍 SafeKit High Availability Navigation Hub"
---

# SAN vs. NAS Shared Storage for Failover Clustering: A Detailed Comparison

## What is the simplest solution between a SAN vs a NAS shared storage for a failover cluster?

###  SAN shared storage or NAS iSCSI shared storage for a failover cluster 


![SAN shared storage or NAS iSCSI shared storage for a failover cluster](/wp-content/uploads/2023/03/raw-disk-shared-storage.png "w:200")


There are several elements that make this architecture complex to implement:

  * on failover, switching the shared storage requires low level instructions which are storage manufacturer dependent,
  * recovery procedure on the file system (FS) must be passed before restarting the application,
  * if both file systems on both nodes access the same raw disk at the same time, the full file system will be corrupted,
  * to avoid a double access, a quorum disk must be configured.


###  NAS SMB shared storage or NAS NFS shared storage for a failover cluster 


![NAS SMB shared storage or NAS NFS shared storage for a failover cluster](/wp-content/uploads/2023/03/nas-shared-storage-1.png "w:200")


There are several elements that make this architecture simple to implement: 
  * on failover, switching the shared storage means only remounting the external file system,
  * no recovery procedure on the file system must be passed before restarting the application,
  * if both nodes access the same shared file system at the same time, the full file system will be not be corrupted,
  * however, there is still the possibility of a double execution of the same application corrupting its data in the shared storage when nodes are isolated.


###  Real-time replication and failover with Eviden SafeKit 


![Real-time replication and failover with SafeKit](/wp-content/uploads/2023/03/no-shared-storage.png "w:200")


There are no such issues with SafeKit because its replication and failover solution does not require a shared storage.

However, if SafeKit must manage a shared storage:

  * use a NAS SMB shared storage or a NAS NFS shared storage,
  * put in the restart scripts the mount/umount of the external file system,
  * configure the [SafeKit split brain checker](</best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) to avoid a double execution of the same application accessing the shared storage when nodes are isolated.



{{%  insert-safekit-hub-en %}}
 


{{%  insert-safekit-4-buttons-en %}}