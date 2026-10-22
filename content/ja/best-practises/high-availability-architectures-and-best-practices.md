---
title: "高可用性アーキテクチャとソフトウェアクラスタリングのベストプラクティス"
canonical: "https://safekit.eviden.com/ja/best-practises/high-availability-architectures-and-best-practices/"
description: "アプリケーションクラスタリングにおける高可用性（HA）アーキテクチャとベストプラクティスを紹介します。SafeKit は共有ディスクなしで Mirror／Farm クラスターを実装し、データ損失を防ぎ、重要なアプリケーションの自動フェイルオーバーを実現します。"
category: "best-practises"
lang: "ja"
topics: "高可用性アーキテクチャとベストプラクティスとは, 高可用性アーキテクチャとベストプラクティスの比較表, SafeKit 高可用性ナビゲーションハブ"
---

# 高可用性アーキテクチャとソフトウェアクラスタリングのベストプラクティス {#high-availability-architectures--software-clustering-best-practices}

## 高可用性アーキテクチャとベストプラクティスとは？ {#what-are-the-high-availability-architectures-and-the-best-practices}

### 概要 {#overview}

この記事では、さまざまな高可用性アーキテクチャとベストプラクティスを取り上げ、それぞれの長所と短所を比較します。

![高可用性アーキテクチャとベストプラクティス](/wp-content/uploads/2023/03/high-availability-architectures-and-best-practices.png "w:400")

以下の比較表では、高可用性ソフトウェア SafeKit のアーキテクチャとベストプラクティスを詳しく説明します。

### 高可用性アーキテクチャにはどのような種類がありますか？ {#what-are-the-high-availability-architectures}

[高可用性アーキテクチャ](<https://www.techtarget.com/it-infrastructure/definition/What-is-high-availability-HA-Definition-and-guide>)には、データベースなどのバックエンドアプリケーション向けと、Web サービスなどのフロントエンドアプリケーション向けの2種類があります。

バックエンド向けアーキテクチャでは、2台のサーバーがデータを共有または複製し、ハードウェアまたはソフトウェアの障害時にアプリケーションを自動フェイルオーバーします。

フロントエンド向けアーキテクチャでは、2台以上のサーバーでファームを構成します。ハードウェアまたはソフトウェアによる負荷分散で、TCP セッションを利用可能なサーバーに振り分けます。

また、アプリケーションレベルと仮想マシンレベルのどちらで高可用性を実現するかを選択します。

### ベストプラクティスには何がありますか？ {#what-are-the-best-practices}

この記事では、高可用性アーキテクチャのベストプラクティスを次の項目で比較します。

  * [ソフトウェアクラスタリングとハードウェアクラスタリング](</ja/best-practises/clustering-software-vs-hardware-clustering/>),
  * [shared-nothing と shared-disk アーキテクチャ](</ja/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/>),
  * [アプリケーション HA と VM HA](</ja/best-practises/vm-ha-vs-application-ha/>),
  * [高可用性とフォールトトレランス](</ja/best-practises/high-availability-cluster-vs-fault-tolerant-system/>),
  * [同期レプリケーションと非同期レプリケーション](</ja/best-practises/synchronous-replication-vs-asynchronous-replication/>),
  * [ファイルレプリケーションとディスクレプリケーション](</ja/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>),
  * [データレプリケーション技術](</ja/best-practises/data-replication-techniques/>),
  * [RPO と RTO の例](</ja/best-practises/what-is-rpo-and-rto-with-examples/>),
  * [スプリットブレインとクォーラム](</ja/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>),
  * [仮想 IP アドレス](</ja/best-practises/how-a-virtual-ip-address-works/>).

## 高可用性アーキテクチャとベストプラクティスの比較表 {#comparative-tables-on-high-availability-architectures-and-best-practices}

{{% insert-safekit-software-vs-hardware-table-ja %}}

{{% insert-safekit-hub-ja %}}

{{% insert-safekit-4-buttons-ja %}}