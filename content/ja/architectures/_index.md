---
title: "SafeKit アーキテクチャ"
canonical: "https://safekit.eviden.com/ja/architectures/"
description: "SafeKit で高可用性アーキテクチャを探索しましょう。SAN レスアプリケーションのフェイルオーバーとロードバランシングのための Mirror、Farm、Farm + mirror クラスターについて学びましょう。"
category: "architectures"
lang: "ja"
topics: "SafeKit にはどのような高可用性アーキテクチャとソフトウェアクラスターがありますか？、SafeKit で高可用性クラスターを構築するには？、🔍 SafeKit 高可用性ナビゲーションハブ"
translation: "translate_md 2026-11-06.18 | glossaire 2026-11-06.13 | Translation LLM | 27 expressions"
---

# SafeKit アーキテクチャ {#safekit-architectures}

## SafeKit にはどのような高可用性アーキテクチャとソフトウェアクラスターがありますか？ {#what-are-the-different-high-availability-architectures-and-the-different-software-clusters-with-safekit}

### Mirror クラスター {#mirror-cluster}


![SafeKit mirror クラスター](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


[詳細情報](</ja/architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### <span class="notranslate farm-term" translate="no">Farm</span> クラスター {#farm-cluster}


![SafeKit farm クラスター](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


[詳細情報](</ja/architectures/network-load-balancing-cluster/>)

### <span class="notranslate farm-term" translate="no">Farm</span> ＋ mirror クラスター {#farmmirror-cluster}


![SafeKit farm + mirror クラスター](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


[詳細情報](</ja/architectures/clustering-software-load-balancing-mirroring/>)

### アクティブ/アクティブクラスター {#activeactive-cluster}


![リアルタイムレプリケーション対応の SafeKit アクティブ・アクティブクラスター](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


[詳細情報](</ja/architectures/active-active-cluster-real-time-replication/>)

### N-1 クラスター {#n-1-cluster}


![SafeKit N-1 冗長化クラスター](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


[詳細情報](</ja/architectures/n-1-redundancy/>)

## SafeKit で高可用性クラスターを構築する方法 {#how-to-build-high-availability-clusters-with-safekit}

### アプリケーションモジュールを使用する {#use-high-availability-modules}

アプリケーションモジュールは、アプリケーション向けの SafeKit のカスタマイズです。モジュールには、リアルタイムデータレプリケーションとフェイルオーバーを備えた mirror モジュールと、ロードバランシングとフェイルオーバーを備えた <span class="notranslate farm-term" translate="no">farm</span> モジュールの 2 種類があります。

mirror モジュールを 2 台のサーバーにデプロイすると、mirror クラスターが作成されます。<span class="notranslate farm-term" translate="no">farm</span> モジュールを N 台のサーバーにデプロイすると、<span class="notranslate farm-term" translate="no">farm</span> クラスターが作成されます。

複数のアプリケーションモジュールを同じサーバーにデプロイできます。したがって、以前に提示されたもの（<span class="notranslate farm-term" translate="no">farm</span> + mirror、アクティブ/アクティブ、N-1）のような高度なクラスタリングアーキテクチャを実装できます。

### アプリケーションモジュールとは何ですか？ {#what-is-an-application-module}

実際には、アプリケーションモジュールは、以下を含む「.Safe」ファイル（zip 形式）です

1 - 以下の内容を含む設定ファイル userconfig.xml :

  * クラスターの仮想 IP アドレス
  * リアルタイムで複製するファイルディレクトリ（mirror モジュール用）
  * ネットワーク負荷分散基準（<span class="notranslate farm-term" translate="no">farm</span> モジュール用）
  * ソフトウェアおよびハードウェア障害検出器の構成


2 - アプリケーションの起動と停止を行うスクリプト。

### アプリケーションモジュールのプラグアンドプレイ展開 {#plug-and-play-deployment-of-high-availability-modules}

アプリケーションモジュールをアプリケーションで設定してテストすれば、導入に特別な IT スキルは必要ありません

  1. アプリケーションを 2 台の標準サーバー（物理または仮想）にインストールします
  2. 両方のサーバーに SafeKit ソフトウェアをインストールします
  3. 両方のサーバーにアプリケーションモジュールをインストールします。



{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}