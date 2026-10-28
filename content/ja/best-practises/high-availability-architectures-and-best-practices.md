---
title: "高可用性アーキテクチャとソフトウェアクラスタリングのベストプラクティス"
canonical: "https://safekit.eviden.com/ja/best-practises/high-availability-architectures-and-best-practices/"
description: "アプリケーションクラスタリングの高可用性（HA）アーキテクチャとベストプラクティスについて学びましょう。 SafeKit ソフトウェア実装 mirror そして farm 共有ディスクを使用しないクラスターにより、データ損失ゼロと重要なアプリケーション向けの自動フェイルオーバーを実現します。"
category: "best-practises"
lang: "ja"
topics: "高可用性アーキテクチャとそのベストプラクティスとは？、高可用性アーキテクチャとベストプラクティスの比較表、🔍 SafeKit高可用性ナビゲーションハブ"
---

# 高可用性アーキテクチャとソフトウェアクラスタリングのベストプラクティス {#high-availability-architectures--software-clustering-best-practices}

## 高可用性アーキテクチャとそのベストプラクティスは何ですか？ {#what-are-the-high-availability-architectures-and-the-best-practices}

### 概要 {#overview}

この記事では、さまざまな高可用性アーキテクチャとそのベストプラクティスについて、それぞれのアーキテクチャの長所と短所を挙げながら解説します。


![高可用性アーキテクチャとベストプラクティス](/wp-content/uploads/2023/03/high-availability-architectures-and-best-practices.png "w:400")


以下の比較表では、 SafeKit高可用性アーキテクチャとそのベストプラクティスについて詳しく説明しています（ SafeKitはソフトウェアの高可用性製品です）。

### 高可用性アーキテクチャは何ですか？ {#what-are-the-high-availability-architectures}

高可用性](<https://www.techtarget.com/it-infrastructure/definition/What-is-high-availability-HA-Definition-and-guide>) [は、データベースなどのバックエンドアプリケーション向けのものと、Webサービスなどのフロントエンドアプリケーション向けのものの2種類があります。

バックエンドの高可用性アーキテクチャは、2台のサーバーがデータを共有または複製し、ハードウェアまたはソフトウェアの障害が発生した場合にアプリケーションが自動的にフェイルオーバーする仕組みに基づいています。

フロントエンドの高可用性アーキテクチャは、 `farm`台のサーバー (2 台以上のサーバー) をベースとしています。負荷分散はハードウェアまたはソフトウェアによって行われ、TCP セッションをfarm内の利用可能なサーバーに分散します。

さらに、アプリケーションレベルでの高可用性と仮想マシンレベルでの高可用性のどちらかを選択する必要があります。

### プラクティスは何ですか？ {#what-are-the-best-practices}

この記事では、高可用性アーキテクチャにおけるベストプラクティスを、以下の点を比較することで探究します。

  * [ソフトウェア対ハードウェアクラスタリング](</ja/best-practises/clustering-software-vs-hardware-clustering/>) 、
  * [共有なし vs 共有ディスクアーキテクチャ](</ja/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/>) 、
  * [アプリケーションと仮想マシンの高可用性](</ja/best-practises/vm-ha-vs-application-ha/>) 、
  * [高可用性 vs フォールトトレランス](</ja/best-practises/high-availability-cluster-vs-fault-tolerant-system/>) 、
  * [同期レプリケーションと非同期レプリケーション](</ja/best-practises/synchronous-replication-vs-asynchronous-replication/>) 、
  * [ファイル対ディスク複製](</ja/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>) 、
  * [データ複製技術](</ja/best-practises/data-replication-techniques/>) 、
  * [ RPOとRTOの例](</ja/best-practises/what-is-rpo-and-rto-with-examples/>) 、
  * [スプリットブレインとクォーラム](</ja/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) 、
  * [仮想 IP アドレスは](</ja/best-practises/how-a-virtual-ip-address-works/>) 。


## 高可用性アーキテクチャとベストプラクティスに関する比較表 {#comparative-tables-on-high-availability-architectures-and-best-practices}


{{%  insert-safekit-software-vs-hardware-table-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}