---
title: "ファームとミラー向けのクラスタリングソフトウェア：高可用性と負荷分散"
canonical: "https://safekit.eviden.com/ja/architectures/clustering-software-load-balancing-mirroring/"
description: "高度なアーキテクチャをミックスして展開する SafeKit Farm そして Mirror モジュール。フロントエンドのスケーラビリティのためのネットワーク負荷分散と、バックエンドのデータ保護のためのリアルタイム同期レプリケーションを組み合わせます。シンプルなSANレスクラスタリングで Windows そして Linux 専門的なITスキルは不要です。無料トライアルをダウンロードしてください。"
category: "architectures"
lang: "ja"
topics: "SafeKitクラスタリングソフトウェア、🔍 SafeKit高可用性ナビゲーションハブによる、重要なWebアプリケーションおよびデータベースアプリケーションの高可用性と拡張性"
---

# ファームとミラー向けのクラスタリングソフトウェア：高可用性と負荷分散 {#clustering-software-for-farms-and-mirrors-high-availability--load-balancing}

## SafeKitクラスタリングソフトウェアによる、重要なWebアプリケーションおよびデータベースアプリケーションの高可用性と拡張性 {#high-availability-and-scalability-of-critical-web-and-database-applications-with-the-safekit-clustering-software}

### ロードバランシング、ミラーリング、フェイルオーバー {#load-balancing-mirroring-and-failover}


![ SafeKit負荷分散とミラーリングによるクラスタリング](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


### SafeKitクラスタリングソフトウェアを使用した例 {#example-with-the-safekit-clustering-software}

例えば、 SafeKitクラスタリングソフトウェアを使用すると、 IISロードバランシングとMicrosoftおよびSQL Serverミラーリングを実装できます。

そのためには、 <span class="notranslate farm-term" translate="no">farm</span> モジュール IIS そして mirror モジュール Microsoft SQLサーバー。各 <span class="notranslate farm-term" translate="no">farm</span> そして mirror このモジュールは、独自の仮想IPアドレスと独自の再起動スクリプトで構成されています。

両方 mirror そして <span class="notranslate farm-term" translate="no">farm</span> モジュールは、2台のサーバーからなる単一のクラスターにデプロイできます。 IIS そして Microsoft SQL Server これらの2台のサーバー上で実行されます。あるいは、2つのモジュールを異なるサーバーで構成される2つのクラスターにデプロイすることも可能です。

SafeKitクラスタリングソフトウェアでは、同一サーバー上での展開と異なるサーバー上での展開に違いはありません。

### 高可用性と拡張性ソリューション {#high-availability-and-scalability-solution}

SafeKitクラスタリングソフトウェアは、重要なWebアプリケーションおよびデータベースアプリケーション向けに、シンプルで高可用性と拡張性に優れたソリューションを提供します。

その結果、ネットワーク負荷分散、リアルタイムデータミラーリング、およびアプリケーションフェイルオーバーが、同一製品内で一貫して管理される。

SafeKitクラスタリングソフトウェアをハードウェアクラスタリングと比較すると、共有ディスク、レプリケートSAN、ロードバランサー、エンタープライズ版のOSやデータベースは必要ありません。


{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}