---
title: "フェイルオーバークラスタリングにおけるSANとNASの共有ストレージ：詳細な比較"
canonical: "https://safekit.eviden.com/ja/best-practises/san-vs-nas-shared-storage-for-a-failover-cluster/"
description: "フェイルオーバークラスタにおけるSANとNASの共有ストレージを比較します。その理由をご覧ください。 SafeKit 本稿では、共有ストレージへの依存を排除し、フェイルオーバースクリプトを簡素化し、高価なハードウェアや複雑なクォーラムディスクを使用せずにデータ破損を防ぐSANレスアーキテクチャを提案する。"
category: "best-practises"
lang: "ja"
topics: "フェイルオーバークラスタの場合、SANとNASの共有ストレージのどちらが最もシンプルなソリューションですか？、🔍 SafeKit高可用性ナビゲーションハブ"
---

# フェイルオーバークラスタリングにおけるSANとNASの共有ストレージ：詳細な比較{#san-vs-nas-shared-storage-for-failover-clustering-a-detailed-comparison}

## フェイルオーバークラスタ{#what-is-the-simplest-solution-between-a-san-vs-a-nas-shared-storage-for-a-failover-cluster} 、SANとNASの共有ストレージのどちらが最もシンプルな解決策でしょうか？

###  フェールオーバークラスタ用のSAN共有ストレージまたはNAS iSCSI共有ストレージ{#san-shared-storage-or-nas-iscsi-shared-storage-for-a-failover-cluster}


![フェールオーバークラスタ用のSAN共有ストレージまたはNAS iSCSI共有ストレージ](/wp-content/uploads/2023/03/raw-disk-shared-storage.png "w:200")


このアーキテクチャの実装を複雑にする要素はいくつかあります。

  * フェイルオーバー時に共有ストレージを切り替えるには、ストレージメーカーに依存する低レベルの命令が必要です。
  * アプリケーションを再起動する前に、ファイルシステム（FS）の復旧手順を完了する必要があります。
  * 両方のノード上の両方のファイルシステムが同時に同じ生ディスクにアクセスすると、ファイルシステム全体が破損します。
  * 二重アクセスを回避するためには、クォーラムディスクを設定する必要があります。


###  フェイルオーバークラスタ用のNAS SMB共有ストレージまたはNAS NFS共有ストレージ{#nas-smb-shared-storage-or-nas-nfs-shared-storage-for-a-failover-cluster}


![フェイルオーバークラスタ用のNAS SMB共有ストレージまたはNAS NFS共有ストレージ](/wp-content/uploads/2023/03/nas-shared-storage-1.png "w:200")


このアーキテクチャの実装を容易にする要素はいくつかあります。 
  * フェイルオーバー時に共有ストレージを切り替えるということは、外部ファイルシステムを再マウントするだけです。
  * アプリケーションを再起動する前に、ファイルシステムの復旧手順を実行する必要はありません。
  * 両方のノードが同時に同じ共有ファイルシステムにアクセスしても、ファイルシステム全体が破損することはありません。
  * しかし、ノードが分離されている場合、同じアプリケーションが二重に実行され、共有ストレージ内のデータが破損する可能性は依然として存在する。


###  Eviden SafeKit {#real-time-replication-and-failover-with-eviden-safekit}によるリアルタイムのレプリケーションとフェイルオーバー


![ ](/wp-content/uploads/2023/03/no-shared-storage.png "w:200") SafeKit使用したリアルタイムレプリケーションとフェイルオーバー


SafeKitにはそのような問題はありません。なぜなら、そのレプリケーションおよびフェイルオーバーソリューションは共有ストレージを必要としないからです。

ただし、 SafeKit共有ストレージを管理する必要がある場合：

  * NAS SMB共有ストレージまたはNAS NFS共有ストレージを使用する、
  * 再起動スクリプトに外部ファイルシステムのマウント/アンマウントを記述する。
  * ノードが分離されている場合に、共有ストレージにアクセスする同じアプリケーションが二重に実行されることを回避するため、 [ SafeKit ](</ja/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>)のスプリットブレインチェッカーを設定します。



{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}