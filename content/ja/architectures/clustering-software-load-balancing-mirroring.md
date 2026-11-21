---
title: "ロードバランシングとミラーリング機能を備えたクラスタリングソフトウェア：高可用性とスケーラビリティ"
canonical: "https://safekit.eviden.com/ja/architectures/clustering-software-load-balancing-mirroring/"
description: "SafeKit farm および mirror モジュールを組み合わせて、高度なアーキテクチャを構築します。ネットワーク負荷分散によってフロントエンドをスケーリングし、リアルタイムの同期レプリケーションによってバックエンドデータを保護します。Windows および Linux 向けのシンプルな SAN 不要のクラスタリング。特別な IT スキルは不要です。無料トライアルをダウンロード。"
category: "architectures"
lang: "ja"
topics: "SafeKit クラスタリングソフトウェアによる、重要な Web アプリケーションとデータベースアプリケーションの可用性とスケーラビリティの向上、🔍 SafeKit を探索する"
translation: "translate_md 2026-11-21.2 | glossaire 2026-11-21.11 | Translation LLM | 52 expressions"
---

# ロードバランシングとミラーリング機能を備えたクラスタリングソフトウェア：高可用性とスケーラビリティ {#clustering-software-for-farms-and-mirrors-high-availability--load-balancing}

## SafeKit クラスタリングソフトウェアによる、重要な Web アプリケーションとデータベースアプリケーションの可用性とスケーラビリティの向上 {#high-availability-and-scalability-of-critical-web-and-database-applications-with-the-safekit-clustering-software}

### ロードバランシング、ミラーリング、フェイルオーバー {#load-balancing-mirroring-and-failover}


![ロードバランシングとミラーリングによる SafeKit クラスタリング](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


### SafeKit クラスタリングソフトウェアの例 {#example-with-the-safekit-clustering-software}

例えば、SafeKit クラスタリングソフトウェアを使用すると、IIS のロードバランシングや Microsoft SQL Server のミラーリングを実装できます。

これを行うには、IIS 用の <span class="notranslate farm-term" translate="no">farm</span> モジュールと Microsoft SQL Server 用の mirror モジュールをデプロイします。各モジュールは、独自の仮想 IP アドレスと独自の再起動スクリプトで構成されます。

2 つのモジュールは、IIS と Microsoft SQL Server の両方が実行される 2 台のサーバーの単一クラスターにデプロイできます。あるいは、2 つのモジュールを異なるサーバーを持つ 2 つの別々のクラスターにデプロイすることもできます。

SafeKit クラスタリングソフトウェアでは、同じサーバーにデプロイする場合でも、異なるサーバーにデプロイする場合でも、まったく同じ方法で動作します。

### 高可用性とスケーラビリティのソリューション {#high-availability-and-scalability-solution}

SafeKit クラスタリングソフトウェアは、重要な Web アプリケーションやデータベースアプリケーションに、シンプルな高可用性とスケーラビリティソリューションを提供します。

ネットワーク負荷分散、リアルタイムデータミラーリング、アプリケーションフェイルオーバーは、単一の製品で一貫して管理されます。

ハードウェアクラスタリングとは異なり、SafeKit クラスタリングソフトウェアは、共有ディスク、レプリケートされた SAN、ハードウェアロードバランサー、またはオペレーティングシステムやデータベースのエンタープライズエディションを必要としません。


{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}