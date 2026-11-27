---
title: "フェイルオーバークラスタリングにおける SAN と NAS 共有ストレージの詳細な比較"
canonical: "https://safekit.eviden.com/ja/best-practises/san-vs-nas-shared-storage-for-a-failover-cluster/"
description: "フェイルオーバークラスター向け SAN と NAS 共有ストレージの比較：制約、コスト、リスクと、SafeKit のレプリケーションで共有ストレージが不要になる理由。"
category: "best-practises"
lang: "ja"
topics: "SAN と NAS の共有ストレージ：フェイルオーバークラスターにはどちらがシンプルですか？"
hashpart: "what-is-the-simplest-solution-between-a-san-vs-a-nas-shared-storage-for-a-failover-cluster"
translation: "translate_md 2026-11-20.3 | glossaire 2026-11-20.10 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/03/raw-disk-shared-storage.png"
schemaType: "TechArticle"
---

# フェイルオーバークラスタリングにおける SAN と NAS 共有ストレージの詳細な比較 {#san-vs-nas-shared-storage-for-failover-clustering-a-detailed-comparison}

## SAN と NAS の共有ストレージ：フェイルオーバークラスターにはどちらがシンプルですか？ {#what-is-the-simplest-solution-between-a-san-vs-a-nas-shared-storage-for-a-failover-cluster}

###  フェイルオーバークラスター用の SAN 共有ストレージまたは NAS iSCSI 共有ストレージ {#san-shared-storage-or-nas-iscsi-shared-storage-for-a-failover-cluster}


![フェイルオーバークラスター用の SAN 共有ストレージまたは NAS iSCSI 共有ストレージ](/wp-content/uploads/2023/03/raw-disk-shared-storage.png "w:200")


このアーキテクチャを実装する上で、いくつかの要素が複雑さを増しています：

  * フェイルオーバー時に共有ストレージを切り替えるには、低レベルのコマンドが必要です。これらのコマンドは、ストレージの製造元によって異なります。
  * アプリケーションを再起動する前に、ファイルシステムの復元手順を実行する必要があります。
  * 両方のノードのファイルシステムが同時に同じ生のディスクにアクセスすると、ファイルシステム全体が破損します。
  * この二重アクセスを回避するには、クォーラムディスクを設定する必要があります。


###  フェイルオーバークラスター用の NAS SMB 共有ストレージまたは NAS NFS 共有ストレージ {#nas-smb-shared-storage-or-nas-nfs-shared-storage-for-a-failover-cluster}


![フェイルオーバークラスター用の NAS SMB 共有ストレージまたは NAS NFS 共有ストレージ](/wp-content/uploads/2023/03/nas-shared-storage-1.png "w:200")


このアーキテクチャを実装しやすくする要素はいくつかあります：

  * フェイルオーバー時には、共有ストレージを切り替えるために外部ファイルシステムを再マウントするだけで済みます。
  * アプリケーションを再起動する前に、ファイルシステムの復旧手順は必要ありません。
  * 両方のノードが同時に同じ共有ファイルシステムにアクセスしても、ファイルシステムが破損することはありません。
  * ただし、ノードがアイソレーションされている場合でも、同じアプリケーションを両方のノードで実行できます。この二重実行によって、共有ストレージ内のアプリケーションデータが破損する可能性があります。


###  Eviden SafeKit によるリアルタイムレプリケーションとフェイルオーバー {#real-time-replication-and-failover-with-eviden-safekit}


![SafeKit によるリアルタイムレプリケーションとフェイルオーバー](/wp-content/uploads/2023/03/no-shared-storage.png "w:200")


SafeKit にはこのような問題はありません。SafeKit では、レプリケーションとフェイルオーバーに共有ストレージは必要ありません。

ただし、SafeKit が共有ストレージを管理する必要がある場合は、

  * NAS SMB または NAS NFS 共有ストレージを使用します。
  * 外部ファイルシステムの mount コマンドと umount コマンドを再起動スクリプトに記述してください。
  * [SafeKit スプリットブレインチェッカー](</ja/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>)を設定します。ノードが分離されている場合、共有ストレージ上で同じアプリケーションが二重に実行されるのを防ぎます。



{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}