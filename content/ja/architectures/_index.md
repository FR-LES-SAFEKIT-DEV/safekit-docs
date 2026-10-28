---
title: "SafeKitアーキテクチャ"
canonical: "https://safekit.eviden.com/ja/architectures/"
description: "SafeKitを使用して高可用性アーキテクチャを探索しましょう。SAN レスのアプリケーションフェイルオーバーとロードバランシングを実現するMirror 、 Farm 、およびFarm + Mirrorクラスタについて学びましょう。"
category: "architectures"
lang: "ja"
topics: "SafeKitのさまざまな高可用性アーキテクチャとさまざまなソフトウェアクラスタとは何ですか?、 SafeKitで高可用性クラスタを構築する方法?、🔍 SafeKit高可用性ナビゲーションハブ"
---

# SafeKitアーキテクチャ{#safekit-architectures}

## SafeKitと{#what-are-the-different-high-availability-architectures-and-the-different-software-clusters-with-safekit}には、どのような異なる高可用性アーキテクチャと異なるソフトウェアクラスタがありますか？

### Mirrorクラスター{#mirror-cluster}


![ SafeKit mirror ](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


[詳細情報](</ja/architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### `Farm`クラスター{#farm-cluster}


![ SafeKit farm ](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


[詳細情報](</ja/architectures/network-load-balancing-cluster/>)

### `Farm` + mirrorクラスター{#farmmirror-cluster}


![ SafeKit 、 farm + mirrorクラスター](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


[詳細情報](</architectures/clustering-software-load-balancing-mirroring/>)

### アクティブ/アクティブ クラスター{#activeactive-cluster}


![ SafeKitリアルタイムレプリケーションを備えたアクティブアクティブクラスタ](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


[詳細情報](</architectures/active-active-cluster-real-time-replication/>)

### N-1 クラスター{#n-1-cluster}


![ SafeKit N-1冗長クラスタ](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


[詳細情報](</architectures/n-1-redundancy/>)

## SafeKitと{#how-to-build-high-availability-clusters-with-safekit}を使用して高可用性クラスタを構築する方法

### 高可用性モジュール{#use-high-availability-modules}を使用する

高可用性モジュールは、アプリケーション向けにSafeKitをカスタマイズしたものです。モジュールには2種類あり、リアルタイムデータレプリケーションとフェイルオーバー機能を備えたmirrorモジュールと、ロードバランシングとフェイルオーバー機能を備えた`farm`モジュールがあります。

mirrorモジュールを2台のサーバーにデプロイすると、 mirrorクラスターが作成され、 `farm`モジュールをN台のサーバーにデプロイすると、 `farm`クラスターが作成されます。

複数のアプリケーションモジュールを同じサーバー上にデプロイできます。そのため、前述のような高度なクラスタリングアーキテクチャ（ `farm` + mirror 、アクティブ/アクティブ、N-1）を実装できます。

### アプリケーションモジュールとは何ですか？ {#what-is-an-application-module}

実際には、アプリケーションモジュールは「.Safe」ファイル（zip形式）であり、以下の内容を含みます。

1 - 設定ファイルuserconfig.xmlの内容:

  * サーバーの名前または物理IPアドレス、
  * クラスターの名前または仮想IPアドレス、
  * リアルタイムで複製するファイルディレクトリ（ mirrorモジュール用）、
  * ネットワーク負荷分散基準（ `farm`モジュール用）
  * ソフトウェアおよびハードウェア障害検出器の構成


2 - アプリケーションを起動および停止するためのスクリプト。

### 高可用性モジュールのプラグアンドプレイ展開{#plug-and-play-deployment-of-high-availability-modules}

アプリケーションモジュールが構成され、アプリケーションとのテストが完了すれば、展開には特別なITスキルは必要ありません。

  1. アプリケーションを2台の標準サーバー（物理サーバーまたは仮想サーバー）にインストールします。
  2. 両方のサーバーにSafeKitソフトウェアをインストールします。
  3. 両方のサーバーにアプリケーションモジュールをインストールしてください。



{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}