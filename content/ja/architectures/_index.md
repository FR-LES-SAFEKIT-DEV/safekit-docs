---
title: "SafeKitのアーキテクチャ"
canonical: "https://safekit.eviden.com/ja/architectures/"
description: "SafeKitの高可用性アーキテクチャをご紹介します。SAN不要のアプリケーションフェイルオーバーと負荷分散を実現するMirror、Farm、Farm+Mirrorクラスターについて説明します。"
category: "architectures"
lang: "ja"
topics: "SafeKitの高可用性アーキテクチャとソフトウェアクラスターにはどのような種類がありますか？、SafeKitで高可用性クラスターを構築する方法、🔍 SafeKit高可用性ナビゲーションハブ"
---

# SafeKitのアーキテクチャ

## SafeKitの高可用性アーキテクチャとソフトウェアクラスターにはどのような種類がありますか？

### Mirrorクラスター


![SafeKit Mirrorクラスター](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


[詳細](</architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### Farmクラスター


![SafeKit Farmクラスター](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


[詳細](</architectures/network-load-balancing-cluster/>)

### Farm+Mirrorクラスター


![SafeKit Farm+Mirrorクラスター](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


[詳細](</architectures/clustering-software-load-balancing-mirroring/>)

### アクティブ/アクティブクラスター


![リアルタイムレプリケーションを行うSafeKitアクティブ/アクティブクラスター](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


[詳細](</architectures/active-active-cluster-real-time-replication/>)

### N-1クラスター


![SafeKit N-1冗長クラスター](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


[詳細](</architectures/n-1-redundancy/>)

## SafeKitで高可用性クラスターを構築する方法

### 高可用性モジュールを使用する

高可用性モジュールは、アプリケーションに合わせてSafeKitをカスタマイズしたものです。モジュールには2種類あります。リアルタイムデータレプリケーションとフェイルオーバーを行うMirrorモジュールと、負荷分散とフェイルオーバーを行うFarmモジュールです。

2台のサーバーにMirrorモジュールを導入するとMirrorクラスターが作成され、N台のサーバーにFarmモジュールを導入するとFarmクラスターが作成されます。

同じサーバーに複数のアプリケーションモジュールを導入できます。そのため、前述のFarm+Mirror、アクティブ/アクティブ、N-1のような高度なクラスターアーキテクチャを構築できます。

### アプリケーションモジュールとは？

アプリケーションモジュールは、通常、次の内容を含む「.Safe」ファイル（zip形式）です。

1 - 次の情報を含む設定ファイル userconfig.xml：

  * サーバー名または物理IPアドレス
  * クラスター名または仮想IPアドレス
  * リアルタイムで複製するファイルディレクトリ（Mirrorモジュールの場合）
  * ネットワーク負荷分散の条件（Farmモジュールの場合）
  * ソフトウェアおよびハードウェア障害検出の設定


2 - アプリケーションを起動および停止するスクリプト。

### 高可用性モジュールのプラグアンドプレイ導入

アプリケーションモジュールを設定し、アプリケーションでテストすれば、導入に特別なITスキルは必要ありません。

  1. 標準的な2台のサーバー（物理または仮想）にアプリケーションをインストールします。
  2. 両方のサーバーにSafeKitソフトウェアをインストールします。
  3. 両方のサーバーにアプリケーションモジュールをインストールします。



{{%  insert-safekit-hub-ja  %}}
 

{{%  insert-safekit-4-buttons-ja  %}}