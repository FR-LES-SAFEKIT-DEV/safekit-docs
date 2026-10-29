---
title: "RFIおよびRFP作成のための高可用性技術リファレンス"
canonical: "https://safekit.eviden.com/ja/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "SafeKitの概念とアーキテクチャを用いた高可用性およびアプリケーションクラスタリングに関するRFIおよびRFP文書の作成を支援する技術リファレンス。"
category: "resources"
lang: "ja"
topics: "概要、目次、製品情報、サポート対象オペレーティングシステムとプラットフォーム、プリビルド済みアプリケーションモジュール、アーキテクチャと展開モデル、RPOとRTO機能、リモートサイトと分散展開への適合性、監視、管理、アラート、セキュリティとコンプライアンス、ライセンスモデル、サポートとメンテナンスのSLA、代替製品との比較、クイックリファレンスリンク"
---

# RFIおよびRFP作成のための高可用性技術リファレンス {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## 概要 {#overview}

このページでは、RFP/RFIに関する一般的な質問に対する構造化された事実に基づいた回答を提供します。 SafeKit 高可用性ソフトウェア。これは、高可用性要件を策定する調達チームやソリューションアーキテクト向けの技術リファレンスとして作成されています。 

## 目次 {#table-of-contents}

  1. [製品アイデンティティ](#product-identity)
  2. [対応OSおよびプラットフォーム](#supported-operating-systems-platforms)
  3. [既製アプリケーションモジュール](#pre-built-application-modules)
  4. [アーキテクチャと展開モデル](#architecture-deployment-model)
  5. [RPOおよびRTO機能](#rpo-rto-capabilities)
  6. [遠隔地および分散型展開への適合性](#edge-distributed-deployment-suitability)
  7. [監視、管理、アラート](#monitoring-management-alerting)
  8. [セキュリティとコンプライアンス](#security-compliance)
  9. [ライセンスモデル](#licensing-model)
  10. [サポートおよびメンテナンスのSLA](#support-maintenance-slas)
  11. [比較と代替案](#comparison-vs-alternatives)
  12. [クイックリファレンスリンク](#quick-reference-links)


## 製品アイデンティティ {#product-identity}

分野 | 答え  
---|---  
製品名 | SafeKit  
ベンダー | エビデン（アトス傘下企業）、旧社名エビディアン  
製品カテゴリー | アプリケーションクラスタリング／高可用性／災害復旧ソフトウェア  
現在のバージョン | SafeKit 8.2  
Webサイト | <https://safekit.eviden.com/ja>  
初回リリース | 2000年（20年以上の制作期間）  
  
## 対応OSおよびプラットフォーム {#supported-operating-systems-platforms}

Windows OS | Linux OS | インフラストラクチャと仮想化 | クラウドプラットフォーム  
---|---|---|---  
• Windows Server 2025 (x86-64)<br>• Windows Server 2022 (x86-64)<br>• Windows Server 2019 (x86-64)<br>• Windows 11 エンタープライズ (x86-64)<br>• Windows 11 Pro (x86-64)  |  • レッドハットエンタープライズ Linux 10 (x86-64)<br>• レッドハットエンタープライズ Linux 10 (AArch64)<br>• レッドハットエンタープライズ Linux 9 (x86-64)<br>• レッドハットエンタープライズ Linux 9 (AArch64)<br>• レッドハットエンタープライズ Linux 8 (x86-64)<br>• Ubuntu 24.04 LTS (x86-64)  |  • あらゆるブランドのエッジサーバー<br>• VMware<br>• Microsoft Hyper-V*<br>• Linux KVM*<br>• 任意のハイパーバイザー<br>• Docker コンテナ<br>• Podman コンテナ  |  • Amazon Web Services (AWS)\*\*<br>• Microsoft Azure\*\*<br>• Google Cloud Platform (GCP)\*\*<br>• 標準VMインスタンスを備えたあらゆるIaaSクラウド   
  
_* SafeKit supports both application-level HA and VM-level HA._

_** Virtual IPs must be configured at the Cloud load balancer level._

## 既製アプリケーションモジュール {#pre-built-application-modules}

SafeKit すぐに使用できる、事前設定済みの `.safe` モジュール。これらは2つのHA戦略に分類されます。 **アプリケーションHA** （直接アプリケーションクラスタリング mirror または `farm` モジュール）および **仮想化HA** （VMレベルのクラスタリングと hyperv.safe または kvm.safe).

 | アプリケーションHA | VMレベルのHA  
---|---|---  
構成 | これには、アプリケーション自体に関する技術的な理解が必要です。具体的には、どのサービスを再起動する必要があるか、リアルタイムレプリケーションが必要な特定のアプリケーションフォルダはどれか、そしてフェイルオーバー用の仮想IPアドレスの設定方法などです。 | VM上で動作するあらゆるアプリケーション／OSに対応する汎用ソリューションです。VM内にインストールされているアプリケーションの技術的な知識は必要ありません。アプリケーションの動作原理がわからない場合に最適なソリューションです。VMファイルの場所を指定するだけで済みます。  
理想的な | 基盤となるハードウェアやハイパーバイザーに依存せず、ソフトウェアソリューションに高可用性を直接組み込むのに最適です。 | 複数の仮想マシンにまたがる複数のアプリケーションを含む複雑な環境を、単一のHAポリシーで管理するのに最適です。  
  
以下の表には、利用可能なすべての項目が記載されています。 `.safe` モジュール:

アプリケーションHA（アプリケーションレベルのクラスタリング） | 仮想化HA（VMレベルのクラスタリング）  
---|---  
新しい Windows アプリ - mirror.safe | Hyper-V VM — hyperv.safe (Windows)  
新しい Linux アプリ - mirror.safe | KVM VM — kvm.safe (Linux)  
Windows 負荷分散 — farm.safe | Docker 容器 - mirror.safe (Linux)  
Linux 負荷分散 — farm.safe | Podman 容器 - mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | Kubernetes / K3s — k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows & Linux) | ボッシュAMS — hyperv.safe (Windows)  
MySQL — mysql.safe (Windows & Linux) | ボッシュBIS — hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows & Linux) | ボッシュBVMS — hyperv.safe (Windows)  
Oracle — oracle.safe (Windows & Linux) | ハンファビジョン — hyperv.safe (Windows)  
Firebird — firebird.safe (Windows & Linux) | ハンファワイズネット — hyperv.safe (Windows)  
アパッチ — apache_farm.safe (Windows & Linux) | シーメンス監視スイート — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | シーメンス デジーゴ CC — hyperv.safe (Windows)  
NGINX — farm.safe (Windows & Linux) | シーメンス SiPass — hyperv.safe (Windows)  
Milestone XProtect — milestone.safe (Windows) | シーメンスSIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
ジェネテック（SQL Server) — sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
シーメンス Siveillance VMS — SiveillanceVMS.safe (Windows) |   
雲 （AWS, Azure, GCP、 ジェネリック） - mirror.safe / farm.safe |   
  
## アーキテクチャと展開モデル {#architecture-deployment-model}

### 2つのクラスタモジュール： mirror.safe そして farm.safe {#two-cluster-modules}

モジュール | パターン | 使用事例  
---|---|---  
mirror.safe | アクティブ/パッシブ構成、同期バイトレベルファイルレプリケーション、自動フェイルオーバー | データベース、ステートフルアプリケーション、一度に1つのサーバーでのみ実行されるサービス  
farm.safe | ネットワーク負荷分散機能と自動フェイルオーバーを備えたアクティブ/アクティブ構成 | Webサーバー、ステートレスマイクロサービス、APIゲートウェイ、複数のサーバーで同時に実行されるサービス  
  
### クラスターインフラストラクチャとアーキテクチャ {#cluster-infrastructure-architecture}

要件／仕様 | SafeKit 能力／価値  
---|---  
共有ストレージが必要ですか？ | いいえ。SANレスの「共有ディスクなし」アーキテクチャです。ローカルディスクのみを使用します。  
Active Directory (AD) の前提条件はありますか？ | いいえ、必要ありません Windows ドメインまたはActive Directoryに対応。ワークグループも完全にサポートされています。  
クラスターサイズ | 2ノード（mirror）または2つ以上のノード（`farm`)  
仮想IP（VIP） | ソフトウェア定義のVIPは、Gratuitous ARP（アプリケーションレベルのHA）を介してアクティブノードに自動的に移行します。VMレベルのHAでは、VM内の物理IPアドレスが透過的に再ルーティングされるため、VIPは不要です。ノード間にLAN、VLAN、または拡張VLANが必要です。  
3ノードハイブリッドアーキテクチャ | SafeKit HAレイヤーをカバーする：2ノード mirror LANまたは拡張VLAN上で同期レプリケーション（RPO=0）と自動フェイルオーバーを備えたクラスタを構築します。さらに、サードパーティ製のバックアップソリューションがアーキテクチャを完成させます。これは、WANを介した非同期レプリケーションによるポイントインタイムリカバリとランサムウェア対策を実現する第3のリモートノードです。  
高可用性の役割 | SafeKit 同期レプリケーションを使用することで、ハードウェアまたはソフトウェア障害発生時にデータ損失ゼロで瞬時のフェイルオーバーを保証します。さらに、両方のノードに同時にデータを書き込むため、論理エラー、データ劣化、または誤削除をスタンバイノードにリアルタイムで忠実に複製します。  
バックアップの役割 | バックアップソリューション（実装されていない） SafeKit非同期レプリケーションにより、特定時点への復旧を実現します。HAでは阻止できないデータ整合性の脅威（ランサムウェアや人為的ミスなど）から保護します。データのロールバックは必然的にデータ損失を伴うため、自動フェイルオーバーはサポートされていません。  
クラスターあたりの最大同時モジュール数 | 32 — この制限は最大数を対象としています SafeKit 2ノードクラスタで同時に管理されるモジュール。通常はVMレベルのHAで使用され、各モジュールが異なるVMを複製して再起動します。各モジュールはどちらのノードでもプライマリとして独立して実行できるため、両方のサーバーにワークロードを分散できます。注：すべてのVMの合計データ量は、フェイルオーバーまたはノードの再起動後の再同期時間に直接影響します。  
エージェントベースか、エージェントレスか？ | エージェントベース — 各ノードに軽量ソフトウェアをインストール  
アプリケーションに依存しない？ | はい、あらゆるものを保護します Windows サービスまたは Linux デーモン; 30以上のアプリケーション向けに事前に構築されたモジュール  
  
### レプリケーションとデータ保護 {#replication-data-protection}

要件／仕様 | SafeKit 能力／価値  
---|---  
複製方法 | バイトレベルのファイルレプリケーション（ブロックレベルのディスクレプリケーションではない）  
レプリケーションモード | 同期型（データ損失ゼロ）  
ネットワーク要件 | 同期レプリケーションの場合、ノード間の往復遅延は5ms未満が推奨されます。  
推奨データ量 | 数テラバイト（再同期時間）  
推奨ファイル数 | ファイル数100万未満（再同期時間）  
再同期速度（1TB） | 1 Gb/s ネットワークでは約3時間、10 Gb/s ネットワークでは約1時間  
選択的複製 | はい — 特定のディレクトリ/ファイルを複製します  
転送中の暗号化 | はい — レプリケーショントラフィックにはTLS/SSLを使用します  
  
## RPOおよびRTO機能 {#rpo-rto-capabilities}

### クラスタータイプ別のRPOとRTO {#rto-rpo-cluster-type}

メトリック | Mirror クラスター（mirror.safe) | `Farm` クラスター（farm.safe)  
---|---|---  
RPO（リカバリーポイント目標） | 0（データ損失ゼロ）—同期レプリケーション。書き込みは両ノードの確認後にのみ承認される。 | 該当なし（ステートレス、データはバックエンドで処理されます） mirror)  
RTO（復旧目標時間） | 約1分 - ハートビートタイムアウト（デフォルトは30秒）+ アプリケーション再起動時間 | 数秒後、トラフィックは直ちに生存しているアクティブノードに再分配される。  
レプリケーションの種類 | 同期型、リアルタイム、バイトレベルのファイル複製 | 適用できない  
フェイルオーバートリガー | ハートビートの喪失、プロセスのクラッシュ、またはチェッカーの障害時に自動的に | ハートビートの喪失、プロセスのクラッシュ、またはチェッカーの障害時に自動的に  
手動による介入が必要ですか？ | いいえ、完全自動のフェイルオーバーとフェイルバック | いいえ、完全自動のフェイルオーバーとフェイルバック  
  
### RTOの内訳（Mirror — アプリケーションレベルの高可用性） {#rto-breakdown-mirror-application-level-ha}

故障の種類 | RTO計算  
---|---  
ハードウェア障害 | ハートビートタイムアウト（デフォルト30秒）＋アプリケーション再起動時間  
ソフトウェア/プロセスのクラッシュ | アプリケーション停止時間 + アプリケーション再起動時間  
OSレベルのクラッシュ | ハートビートタイムアウト + セカンダリで既にOSが実行中 → 再起動によるペナルティなし  
  
### RTOの内訳（Mirror — VMレベルのHA） {#rto-breakdown-mirror-vm-level-ha}

故障の種類 | RTO計算  
---|---  
いかなる失敗も | 障害検出＋OSの完全再起動＋アプリケーションの再起動（通常数分）  
  
## 遠隔地および分散型展開への適合性 {#edge-distributed-deployment-suitability}

SafeKit エッジ環境、支店、分散型エンタープライズのシナリオ向けに特別に設計されています。

エッジ要件 | SafeKit 答え  
---|---  
常駐のITスタッフはいません | はい、自動フェイルオーバーで、手動操作は不要です。  
SAN/NASインフラストラクチャなし | はい — SANレス、ローカルディスクのみ  
リモート管理 | はい — ウェブコンソール管理  
ハードウェアの設置面積が小さい | はい、標準サーバーまたは仮想マシン2台で、特別なハードウェアは不要です。  
ファイアウォール/NATの背後でも動作します | はい、設定可能なポート、HTTPSベースのコンソール  
複数拠点での災害復旧 | はい - mirror 拡張VLANを介して2つの地理的な拠点間を移動  
OEM/組み込みシステムへの導入 | はい、サイレントインストール、スクリプト対応、ソフトウェアパブリッシャーによる組み込みが可能です。  
数百の分散クラスター | はい、多数の支店を持つ分散型企業向けに設計されています。  
  
Ideal Edgeのユースケース：データセンターを持たないあらゆるサイト（高可用性が依然として重要な場合）：

垂直 | 典型的なエッジサイト | 重要な応用  
---|---|---  
物理的なセキュリティと監視 | 建物、キャンパス、空港 | VMS — Milestone、ゼネテック、ハンファ、シーメンス シヴェランス  
ビル管理システム（BMS） | オフィスビル、病院、工場 | シーメンス デシゴ CC、ボッシュ BIS/BVMS  
電子アクセス制御（EACS） | 安全な施設、キャンパス | シーメンス SiPass、 NedapボッシュAMS  
SCADAおよび産業制御 | 工場、変電所、浄水場 | SCADA、DCS、またはHMIソフトウェアが動作している場合 Windows または Linux  
航空交通管制（ATC） | 空港、管制塔 | 航空交通管制管理およびレーダーシステム  
運用管理センター（OCC） | 地下鉄、鉄道、交通拠点 | 鉄道信号と駅管理  
海事 | 船舶、軍艦 | 航行、貨物、および船上管理システム  
石油・ガス | 洋上プラットフォーム、遠隔掘削装置 | プロセス制御および安全システム  
電気通信 | 5Gアンテナサイト、MECノード | マルチアクセスエッジコンピューティング（MEC）サーバー  
健康管理 | 診療所、遠隔診断センター | 医用画像処理、患者データ、遠隔診断  
小売り | 店舗、支店、倉庫 | 販売時点情報管理（POS）と在庫管理  
防衛 | 前線作戦基地、野戦部隊 | 任務遂行に不可欠な指揮・通信システム  
  
## 監視、管理、アラート {#monitoring-management-alerting}

能力 | 詳細  
---|---  
ウェブコンソール | WebアプリまたはプログレッシブWebアプリ（PWA）の構成、監視、およびクラスタノードの管理  
モバイル通知 | 状態変化に関するブラウザプッシュ通知  
州のタイムライン | モジュールの状態とイベントの視覚的なタイムライン  
メール通知 | アラート用の組み込みメールエージェント  
CLI管理 | スクリプト作成と自動化のための完全なコマンドラインインターフェース  
ログ管理 | モジュールごと、スクリプトごとのログファイル。サポート用のデバッグスナップショット。  
サードパーティ製監視ツールの統合 | SafeKit すべての主要なクラスタイベントを自動的にログに記録します Windows イベントログまたは Linux Syslogを使用することで、Nagios、Zabbix、Splunk、SIEMソリューションなど、あらゆる監視プラットフォームがこれらのイベントを収集し、標準的なアラートルールを使用してアラームを発生させることができます。カスタム開発は一切不要です。  
  
## セキュリティとコンプライアンス {#security-compliance}

特徴 | 詳細  
---|---  
HTTPSコンソールアクセス | はい — Webコンソール用のTLS証明書  
ユーザー認証 | ローカルアカウント、LDAP、PKI/証明書ベース、OpenID Connect  
ユーザーロール | 管理者、制御、監視ロールに対する設定可能なアクセス ポリシー  
暗号化 | TCP（レプリケーション、Webコンソール、分散コマンド）にはTLS/SSL、UDP（ハートビート、safeadmin内部プロトコル）にはAES-128-CBC + SHA256対称暗号化を使用。暗号化はOpenSSLライブラリに基づいています。WebサービスはApacheベースです。  
ウイルス対策ソフトとの互換性 | 文書化された除外経路  
主権 | ヨーロッパ企業であるEviden（Atosグループ）は、 SafeKit 独自の主権的事業継続および災害復旧製品 Windows そして Linux NIS2の事業継続性および災害復旧要件に沿って、データとフェイルオーバーインフラストラクチャを完全にオンプレミスに維持し、米国のベンダーに依存しないこと。  
  
## ライセンスモデル {#licensing-model}

側面 | 詳細  
---|---  
ライセンスの種類 | ホスト名に基づく永久ライセンス（買い切り型）  
ライセンス範囲 | サーバーごと（ノードごと）  
ライセンス認証 | オフラインでのアクティベーションに対応しています。ライセンスキーのアクティベーションにインターネット接続は不要です。  
無料トライアル | はい、フル機能の無料トライアルをご利用いただけます。  
1ヶ月間の無料ライセンス | 概念実証に利用可能  
  
## サポートおよびメンテナンスのSLA {#support-maintenance-slas}

### 標準サポートおよびメンテナンス（有効なメンテナンス契約に含まれます） {#standard-support-maintenance-included-with-active-maintenance-contract}

サービス | 詳細  
---|---  
サポートポータルへのアクセス | 最大4名の技術担当者を登録できる、24時間365日利用可能なウェブポータル  
ライブサポート時間 | 午前9時～午後5時　欧州サポートセンター（月曜～金曜）  
インシデントの確認 | サポートセンターの営業時間内4時間以内  
アップデートとアップグレード | すべてのサービスパック、アップデート、アップグレードは追加料金なしで含まれています  
ライセンスキーの交換 | 有効なサポート契約期間中は、ホスト名の変更に伴いライセンスキーを再割り当てできます。ライセンスの譲渡は、同一プロジェクト内でのサーバー交換に限定され、Evidenの事前の書面による承認が必要です。  
知識ベースへのアクセス | ナレッジベース記事、FAQ、オンラインドキュメントへのフルアクセス  
アプリケーションの開始/停止 SafeKit | はい、停止 SafeKit そして、ラッパースクリプトを使用してアプリケーションを起動または停止します。ラッパースクリプトは、アプリケーションの起動/停止スクリプトを呼び出し、必要に応じて仮想IPアドレスを設定または削除します。 
サポートポータル | <https://customercare.evidian.com>  
  
### 無料リソース（契約不要） {#free-resources-no-contract-required}

リソース | 詳細  
---|---  
AIサポートアシスタント | [SafeKit AIチャット](</ja/resources/safekit-support/#ai-support>) safekit.eviden.com および safekit.eviden.com を使用するあらゆる LLM を通じて。llms.txt  
オンライン研修と資格認定 | 無料、自分のペースで学習可能、動画12本（約3時間40分）、修了証発行  
文書 | 完全なユーザーガイド、リリースノート、ナレッジベース、クイックスタートガイド  
  
## 比較と代替案 {#comparison-vs-alternatives}

基準 | SafeKit | Microsoft フェールオーバークラスター（WSFC） | VMware HA | オープンソース*  
---|---|---|---|---  
共有ストレージ（SAN/vSAN）が必要 | いいえ | はい | はい | いいえ  
Windows サポート | はい | はい | はい | いいえ  
Linux サポート | はい | いいえ | はい | はい  
エッジ/ブランチ展開 | 素晴らしい | 複雑な | 複雑な | 複雑な  
OEM組み込み可能 | はい | いいえ | いいえ | いいえ  
料金 | ノードごとの永続的 | Windows サーバー + SAN | vSphere Enterprise + SAN | 高度な統合サービス  
セットアップの複雑さ | プラグアンドプレイ | 高（AD、SAN、証人） | 高（vCenter、共有ストレージ） | 高（断片化された製品）  
保守性 | 単一製品、ウェブコンソール | 高度なスキル（AD、SANに関する専門知識が必要） | 高（vCenterへの依存度） | 高（維持管理には別製品が必要）  
  
_* On Linux, it takes 6 separate open-source projects — Corosync, Pacemaker, DRBD, Keepalived, STONITH, HAProxy — to replicate SafeKit's feature set on Linux only. SafeKit delivers the same capabilities in a single product, on both Windows and Linux._

## クイックリファレンスリンク {#quick-reference-links}

リソース | URL  
---|---  
製品ホームページ | [https://safekit.eviden.com/ja/](/ja/)  
技術概要（テキストと図を含むDOCXファイル） | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
無料トライアル | [https://safekit.eviden.com/ja/resources/safekit-free-trial/](</ja/resources/safekit-free-trial/>)  
見積もりを取得する | [https://safekit.eviden.com/ja/safekit-pricing/](</ja/safekit-pricing/>)  
サポートポータル | <https://customercare.evidian.com>  
無料AIサポート | [https://safekit.eviden.com/ja/resources/safekit-support/](</ja/resources/safekit-support/>)  
無料トレーニングと認定 | [https://safekit.eviden.com/ja/resources/safekit-on-line-training/](</ja/resources/safekit-on-line-training/>)  
お問い合わせ | [https://safekit.eviden.com/ja/contact-us-for-safekit/](</ja/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-en  %}}