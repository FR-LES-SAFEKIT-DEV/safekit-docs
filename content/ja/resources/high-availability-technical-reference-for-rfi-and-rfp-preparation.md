---
title: "RFIおよびRFP作成のための高可用性技術リファレンス"
canonical: "https://safekit.eviden.com/ja/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "SafeKit概念とアーキテクチャを使用して、高可用性とアプリケーションクラスタリングに関するRFIおよびRFP文書を作成するのに役立つ技術リファレンス。"
category: "resources"
lang: "ja"
topics: "概要、目次、製品情報、サポート対象オペレーティングシステムとプラットフォーム、プリビルド済みアプリケーションモジュール、アーキテクチャと展開モデル、RPOとRTOの機能、エッジおよび分散展開への適合性、監視、管理、アラート、セキュリティとコンプライアンス、ライセンスモデル、サポートとメンテナンスのSLA、代替製品との比較、クイックリファレンスリンク"
---

# RFIおよびRFP準備のための高可用性技術リファレンス{#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## 概要{#overview}

このページでは、 SafeKit高可用性ソフトウェアに関するRFP/RFIでよくある質問に対し、体系的かつ事実に基づいた回答を提供します。調達チームやソリューションアーキテクトが高可用性要件を作成する際の技術参考資料として活用してください。 

## 目次{#table-of-contents}

  1. [製品識別番号](#product-identity)
  2. [対応オペレーティングシステムおよびプラットフォーム](#supported-operating-systems-platforms)
  3. [プリビルド済みアプリケーションモジュール](#pre-built-application-modules)
  4. [アーキテクチャおよび展開モデル](#architecture-deployment-model)
  5. [ RPOおよびRTO機能](#rpo-rto-capabilities)
  6. [エッジおよび分散展開の適合性](#edge-distributed-deployment-suitability)
  7. [監視、管理、アラート](#monitoring-management-alerting)
  8. [セキュリティとコンプライアンス](#security-compliance)
  9. [ライセンスモデル](#licensing-model)
  10. [サポートおよびメンテナンス SLA ](#support-maintenance-slas)
  11. [比較 vs. 代替案](#comparison-vs-alternatives)
  12. [クイックリファレンスリンク](#quick-reference-links)


## 製品識別番号{#product-identity}

フィールド|回答  
---|---  
製品名| SafeKit  
ベンダー| Eviden（Atos傘下企業）、旧社名 Evidian  
製品カテゴリ|アプリケーションクラスタリング／高可用性／災害復旧ソフトウェア  
現在のバージョン| SafeKit 8.2  
ウェブサイト| <https://safekit.eviden.com>  
初版リリース| 2000 (20年以上の生産実績)  
  
## サポートされているオペレーティングシステムとプラットフォーム{#supported-operating-systems-platforms}

Windows OS | Linux OS |インフラストラクチャと仮想化|クラウドプラットフォーム  
---|---|---|---  
• Windows Server 2025 (x86-64) <br> • Windows Server 2022 (x86-64) <br> • Windows Server 2019 (x86-64) <br> • Windows 11 Enterprise (x86-64) <br> • Windows 11 Pro (x86-64) | • Red Hat Enterprise Linux 10 (x86-64) <br> • Red Hat Enterprise Linux 10 (AArch64) <br> • Red Hat Enterprise Linux 9 (x86-64) <br> • Red Hat Enterprise Linux 9 (AArch64) <br> • Red Hat Enterprise Linux 8 (x86-64) <br> • Ubuntu 24.04 LTS (x86-64) | • あらゆるブランドのエッジサーバー<br> • VMware <br> • Microsoft Hyper-V * <br> • Linux KVM * <br> • あらゆるハイパーバイザー<br> • Dockerコンテナ<br> • Podmanコンテナ| • Amazon Web Services ( AWS )\ * \ * <br> • Microsoft Azure \ * \ * <br> • Google Cloud Platform ( GCP )\ * \ * <br> • 標準 VM インスタンスを備えた任意の IaaS クラウド   
  
_ * SafeKit 、アプリケーションレベルの HA と VM レベルの HA の両方をサポートします。_

_ **仮想 IP アドレスは、クラウド ロード バランサー レベルで設定する必要があります。_

## プリビルド済みアプリケーションモジュール{#pre-built-application-modules}

SafeKitは、すぐに使用できる事前構成済みの`.safe`モジュールが含まれています。これらは、2つのHA戦略に分類されます**アプリケーションHA ** （ mirrorまたは`farm`モジュールを使用した直接アプリケーションクラスタリング）と、 **仮想化HA ** （ hyperv.safeまたはkvm.safeを使用したVMレベルのクラスタリング）です。

 |アプリケーションHA | VMレベルHA  
---|---|---  
構成|アプリケーション自体の技術的な理解が必要です。どのサービスを再起動する必要があるか、リアルタイムでレプリケーションが必要な特定のアプリケーションフォルダ、フェイルオーバー用の仮想 IP アドレスの構成などです。 | VM で実行されている任意のアプリケーション / OS 用の汎用ソリューションです。VM 内にインストールされているアプリケーションの技術的な理解は必要ありません。アプリケーションの動作方法がわからない場合に最適なソリューションです。VM ファイルの場所を定義するだけで済みます。  
理想的な | 基盤となるハードウェアやハイパーバイザーに依存せず、ソフトウェアソリューションに高可用性を直接組み込むのに最適です。 | 複数の仮想マシンにまたがる複数のアプリケーションを含む複雑な環境を、単一のHAポリシーで管理するのに最適です。  
  
以下の表は、利用可能なすべての`.safe`モジュールの一覧です。

アプリケーションHA（アプリケーションレベルのクラスタリング） |仮想化HA（VMレベルのクラスタリング）  
---|---  
新しいWindowsアプリ — mirror.safe | Hyper-V VM — hyperv.safe ( Windows )  
新しいLinuxアプリ — mirror.safe | KVM VM — kvm.safe ( Linux )  
Windowsロードバランシング — farm.safe | Dockerコンテナ — mirror.safe ( Linux )  
Linuxロードバランシング — farm.safe | Podmanコンテナ — mirror.safe ( Linux )  
Microsoft SQL Server — sqlserver.safe ( Windows ) | Kubernetes / K3s — k3s.safe ( Linux )  
PostgreSQL — postgresql.safe ( WindowsおよびLinux ) | Bosch AMS — hyperv.safe ( Windows )  
MySQL — mysql.safe ( Windows & Linux ) |ボッシュ BIS — hyperv.safe ( Windows )  
MariaDB — mysql.safe ( Windows & Linux ) |ボッシュ BVMS — hyperv.safe ( Windows )  
Oracle — oracle.safe ( Windows & Linux ) |ハンファビジョン — hyperv.safe ( Windows )  
Firebird — firebird.safe ( Windows & Linux ) | Hanwha Wisenet — hyperv.safe ( Windows )  
Apache — apache_farm.safe ( WindowsおよびLinux ) | Siemens Siveillance スイート — hyperv.safe ( Windows )  
IIS — iis_farm.safe ( Windows ) | Siemens Desigo CC — hyperv.safe ( Windows )  
NGINX — farm.safe ( WindowsおよびLinux ) | Siemens SiPass — hyperv.safe ( Windows )  
Milestone XProtect — milestone.safe ( Windows ) |シーメンス SIPORT — hyperv.safe ( Windows )  
Nedap AEOS — nedap.safe ( Windows ) | SIMATIC PCS 7 — hyperv.safe ( Windows )  
ジェネテック ( SQL Server ) — sqlserver.safe ( Windows ) | SIMATIC WinCC — hyperv.safe ( Windows )  
シーメンス Siveillance VMS — SiveillanceVMS.safe ( Windows ) |   
クラウド（ AWS 、 Azure 、 GCP 、汎用）— mirror.safe / farm.safe |   
  
## アーキテクチャと展開モデル{#architecture-deployment-model}

### 2つのクラスタモジュール： mirror.safeとfarm.safe {#two-cluster-modules}

モジュール|パターン|ユースケース  
---|---|---  
mirror.safe |アクティブ/パッシブ構成、同期バイトレベルファイルレプリケーション+自動フェイルオーバー|データベース、ステートフルアプリケーション、一度に1台のサーバーでのみ実行されるサービス  
farm.safe |ネットワーク負荷分散と自動フェイルオーバーを備えたアクティブ/アクティブ構成| Webサーバー、ステートレスマイクロサービス、APIゲートウェイ、複数のサーバーで同時に実行されるサービス  
  
### クラスターインフラストラクチャとアーキテクチャ{#cluster-infrastructure-architecture}

要件／仕様| SafeKit機能／価値  
---|---  
共有ストレージが必要ですか？ |いいえ — SANレスの「共有なし」アーキテクチャ。ローカルディスクのみを使用します。  
Active Directory (AD) の前提条件はありますか？ | — Windowsや Active Directory は必要ありません。ワークグループは完全にサポートされています。  
クラスタサイズ| 2ノード ( mirror ) または 2ノード以上 ( `farm` )  
仮想IP（VIP） | 、Gratuitous ARP（アプリケーションレベルのHA）を介してアクティブノードに自動的に移行するソフトウェア定義のVIPです。VMレベルのHAでは、VM内の物理IPが透過的に再ルーティングされるため、VIPは不要です。ノード間にLAN、VLAN、または拡張VLANが必要です。  
3ノードハイブリッドアーキテクチャ| SafeKitはHAレイヤーをカバーします。これは、同期レプリケーション（RPO=0）と自動フェイルオーバーを備えた、LANまたは拡張VLAN上の2ノードmirrorクラスタです。サードパーティ製のバックアップソリューションがアーキテクチャを完成させます。これは、ポイントインタイムリカバリとランサムウェア対策のために、WANを介した非同期レプリケーションを備えた3番目のリモートノードです。  
高可用性の役割： | SafeKit同期レプリケーションを使用して、ハードウェアまたはソフトウェア障害発生時にデータ損失ゼロで瞬時のフェイルオーバーを保証します。さらに、両方のノードに同時にデータを書き込むため、論理エラー、データ劣化、または誤削除をスタンバイノードにリアルタイムで忠実にレプリケートします。  
バックアップの役割|バックアップソリューション（ SafeKitでは実装されていません）は、非同期レプリケーションによる特定時点への復旧を提供します。HA ではブロックできないデータ整合性の脅威（ランサムウェアや人為的ミスなど）からデータを保護します。データのロールバックは必然的にデータ損失を伴うため、自動フェイルオーバーはサポートされていません。  
クラスタあたりの同時実行モジュールの最大数| 32 — この制限は、2 ノード クラスタで同時に管理できるモジュールの最大数SafeKitを対象としており、通常は、各モジュールが異なる VM を複製して再起動する VM レベルの HA で使用されます。各モジュールは、どちらのノードでもプライマリとして独立して実行できるため、両方のサーバーにワークロードを分散できます。注: すべての VM の合計データ量は、フェイルオーバーまたはノードの再起動後の再同期時間に直接影響します。  
エージェントベースかエージェントレスか？ |エージェントベース — 各ノードに軽量ソフトウェアをインストール  
アプリケーションに依存しない？ |はい — あらゆるWindowsサービスまたはLinuxデーモンを保護します。30 種類以上のアプリケーション向けに事前構築済みのモジュールが用意されています。  
  
### レプリケーションとデータ保護{#replication-data-protection}

要件／仕様| SafeKit機能／価値  
---|---  
レプリケーション方式|バイトレベルファイルレプリケーション（ブロックレベルディスクではない）  
レプリケーションモード： |　同期（データ損失ゼロ）  
ネットワーク要件|同期レプリケーションの場合、ノード間の往復遅延は5ms未満を推奨します  
推奨データ容量|数テラバイト（再同期時間）  
推奨ファイル数： |ファイル未満（再同期時間）  
再同期速度（1 TB）： |　1 Gb/s ネットワークで約3時間、10 Gb/s ネットワークで約1時間  
選択的レプリケーション|はい — 特定のディレクトリ/ファイルをレプリケートします  
転送中の暗号化|はい — レプリケーション トラフィックに TLS/SSL を使用  
  
## RPOおよびRTO機能{#rpo-rto-capabilities}

### クラスタータイプ別RPOおよびRTO {#rto-rpo-cluster-type}

メトリック| Mirrorクラスター ( mirror.safe ) | `Farm`クラスター ( farm.safe )  
---|---|---  
RPO (リカバリポイント目標) | 0 (データ損失ゼロ) — 同期レプリケーション。書き込みは両方のノードが確認した後にのみ承認されます| N/A (ステートレス。データはバックエンドによって処理されますmirror )  
RTO（リカバリ時間目標） |約1分 — ハートビートタイムアウト（デフォルト30秒）＋アプリケーション再起動時間|数秒 — トラフィックは直ちに稼働中のアクティブノードに再分配されます  
レプリケーションタイプ|同期、リアルタイム、バイトレベルファイルレプリケーション|該当なし  
フェイルオーバー トリガー|ハートビートの喪失、プロセスのクラッシュ、またはチェッカーの障害時に自動的に実行されます|ハートビートの喪失、プロセスのクラッシュ、またはチェッカーの障害時に自動的に実行されます  
手動介入が必要ですか? |いいえ — 完全自動フェイルオーバーとフェイルバック|いいえ — 完全自動フェイルオーバーとフェイルバック  
  
### RTO内訳（ Mirror — アプリケーションレベルのHA） {#rto-breakdown-mirror-application-level-ha}

障害タイプ| RTO 計算  
---|---  
ハードウェア障害|ハートビートタイムアウト（デフォルト30秒）+アプリケーション再起動時間  
ソフトウェア/プロセスクラッシュ|アプリケーション停止時間 + アプリケーション再起動時間  
OSレベルのクラッシュ|ハートビートタイムアウト + セカンダリで既にOSが実行中 → 再起動によるペナルティなし  
  
### RTO内訳（ Mirror — VMレベルHA） {#rto-breakdown-mirror-vm-level-ha}

障害タイプ| RTO 計算  
---|---  
あらゆる障害|障害検出 + OS の完全再起動 + アプリケーションの再起動 (通常数分)  
  
## エッジおよび分散型展開の適合性{#edge-distributed-deployment-suitability}

SafeKitは、エッジ、ブランチオフィス、および分散型エンタープライズのシナリオ向けに特別に設計されています。

エッジ要件| SafeKit回答  
---|---  
常駐のITスタッフはいません|はい、自動フェイルオーバーで、手動による介入は不要です。  
SAN/NASインフラストラクチャなし|はい — SANレス、ローカルディスクのみ  
リモート管理|はい — Webコンソール管理  
ハードウェアのフットプリントが低い|はい — 標準サーバーまたはVM 2台、特別なハードウェアは不要  
ファイアウォール/NATの背後でも動作します|はい — 設定可能なポート、HTTPSベースのコンソール  
マルチサイト災害復旧|はい — 2 つの地理的なサイト間での拡張 VLAN を介したmirror  
OEM/組み込み展開|はい — サイレントインストール、スクリプト対応、ソフトウェアパブリッシャーによる組み込み対応  
数百の分散クラスター|はい — 多くの支店を持つ分散型企業向けに設計されています  
  
Ideal Edgeのユースケース：データセンターを持たないあらゆるサイト（高可用性が依然として重要な場合）：

垂直型|標準エッジサイト|重要アプリケーション  
---|---|---  
物理セキュリティと監視|建物、キャンパス、空港| VMS — Milestone 、Genetec、Hanwha、Siemens Siveillance  
ビル管理システム（BMS） |オフィスビル、病院、工場| Siemens Desigo CC、Bosch BIS/BVMS  
電子アクセス制御（EACS） |セキュア施設、キャンパス| Siemens SiPass、 Nedap 、Bosch AMS  
SCADAおよび産業制御|工場、変電所、浄水場| WindowsまたはLinux上で動作するあらゆるSCADA、DCS、またはHMIソフトウェア  
航空交通管制（ATC） |空港、管制塔| ATC管理およびレーダーシステム  
運行管理センター（OCC） |地下鉄、鉄道、交通ハブ|鉄道信号および駅管理  
海事|船舶、海軍艦艇|航行、貨物および船上管理システム  
石油・ガス|洋上プラットフォーム、遠隔掘削装置|プロセス制御および安全システム  
電気通信| 5Gアンテナサイト、MECノード|マルチアクセスエッジコンピューティング（MEC）サーバー  
医療|クリニック、遠隔診断センター|医用画像処理、患者データ、遠隔診断  
小売業|店舗、支店、倉庫|販売時点情報管理および在庫管理  
防衛|前線作戦基地、野戦部隊|任務遂行に不可欠な指揮通信システム  
  
## 監視、管理、アラート{#monitoring-management-alerting}

機能|詳細  
---|---  
Webコンソール| WebアプリまたはプログレッシブWebアプリ（PWA）；クラスタノードの設定、監視、および管理  
モバイル通知|状態変化に関するブラウザプッシュ通知  
状態タイムライン|モジュールの状態とイベントの視覚的なタイムライン  
メール通知|アラート用の組み込みメールエージェント  
CLI管理|スクリプト作成と自動化のための完全なコマンドラインインターフェース  
ログ管理|モジュールごと、スクリプトごとのログファイル。サポート用のデバッグスナップショット。  
サードパーティ監視統合| SafeKit 、すべての主要なクラスタイベントをWindowsイベントログまたはLinux Syslog に自動的に記録し、カスタム開発なしで、Nagios、Zabbix、Splunk、SIEM ソリューションなどの監視プラットフォームがこれらのイベントを収集し、標準のアラートルールを使用してアラームを発生させることを可能にします。  
  
## セキュリティとコンプライアンス{#security-compliance}

機能|詳細  
---|---  
HTTPSコンソールアクセス|はい — Webコンソール用のTLS証明書  
ユーザー認証|ローカルアカウント、LDAP、PKI/証明書ベース、OpenID Connect  
ユーザーロール|管理者、制御、監視ロールに対する設定可能なアクセス ポリシー  
TCP（レプリケーション、Webコンソール、分散コマンド）にはTLS/SSL | UDP（ハートビート、safeadmin内部プロトコル）にはAES-128-CBC + SHA256対称暗号化を使用。暗号化はOpenSSLライブラリに基づいています。WebサービスはApacheベースです。  
ウイルス対策ソフトとの互換性|文書化された除外パス  
主権|欧州企業である Eviden (Atos Group) は、 SafeKitにより、 WindowsおよびLinux向けの独自の主権型事業継続および災害復旧製品を提供します。これにより、NIS2 事業継続および災害復旧要件に準拠し、米国ベンダーへの依存をなくし、データとフェイルオーバーインフラストラクチャを完全にオンプレミスに維持します。  
  
## ライセンスモデル{#licensing-model}

アスペクト|の詳細  
---|---  
ライセンスの種類： |　ホスト名に基づく永久ライセンス（一括購入）  
ライセンス範囲|サーバー（ノード）ごと  
ライセンス認証|オフライン認証に対応しています。ライセンスキーの認証にインターネット接続は不要です。  
無料トライアル|はい — フル機能の無料トライアルが利用可能です  
概念実証用に1ヶ月間の無料ライセンス|利用可能です  
  
## サポートおよびメンテナンスSLA {#support-maintenance-slas}

### 標準サポートおよびメンテナンス（有効なメンテナンス契約に含まれます） {#standard-support-maintenance-included-with-active-maintenance-contract}

サービス|詳細  
---|---  
サポートポータルアクセス|最大4名の技術担当者が24時間365日利用可能なWebポータル  
ライブサポート受付時間：午前9時～午後5時|ヨーロッパサポートセンター、月曜日～金曜日）  
インシデント確認|サポートセンターの営業時間内4時間以内  
アップデートとアップグレード|すべてのサービスパック、アップデート、アップグレードが追加料金なしで含まれています  
ライセンスキーの交換|有効なサポート契約に基づき、ホスト名の変更時にライセンスキーを再割り当てできます。ライセンスの譲渡は、同一プロジェクト内でのサーバー交換に限定され、Evidenの事前の書面による承認が必要です。  
ナレッジベースへのアクセス|ナレッジベース記事、FAQ、オンラインドキュメントへのフルアクセス  
アプリケーションの開始/停止 SafeKit | はい、停止 SafeKit そして、ラッパースクリプトを使用してアプリケーションを起動または停止します。ラッパースクリプトは、アプリケーションの起動/停止スクリプトを呼び出し、必要に応じて仮想IPアドレスを設定または削除します。 
サポートポータル| <https://customercare.evidian.com>  
  
### 無料リソース（契約不要） {#free-resources-no-contract-required}

リソース|詳細  
---|---  
AIサポートアシスタント | [SafeKit AIチャット](</ja/resources/safekit-support/#ai-support>) safekit.eviden.com および safekit.eviden.com を使用するあらゆる LLM を通じて。llms.txt  
オンライン研修＆認定|無料、自分のペースで学習可能、動画12本（約3時間40分）、修了証発行  
ドキュメント|完全なユーザーガイド、リリースノート、ナレッジベース、クイックスタートガイド  
  
## 比較 vs. 代替案{#comparison-vs-alternatives}

基準| SafeKit | Microsoftフェイルオーバー クラスタ (WSFC) | VMware HA |オープンソース*  
---|---|---|---|---  
共有ストレージ（SAN/vSAN）が必要|いいえ|はい|はい|いいえ  
Windows サポート | はい | はい | はい | いいえ  
Linux サポート | はい | いいえ | はい | はい  
エッジ/ブランチ展開|優秀|複雑|複雑|複雑  
OEM 組み込み可能|はい|いいえ|いいえ|いいえ  
コスト|ノードごとの永続ライセンス| Windowsサーバー + SAN | vSphere Enterprise + SAN |高レベル統合サービス  
セットアップの複雑さ|プラグアンドプレイ|高 (AD、SAN、witness) |高 (vCenter、共有ストレージ) |高 (断片化された製品)  
保守性|単一製品、Webコンソール|高（AD、SANの専門知識が必要） |高（vCenterへの依存） |高（保守が必要な製品が複数）  
  
_* の上 Linux再現するには、Corosync、Pacemaker、DRBD、Keepalived、STONITH、HAProxy の 6 つの独立したオープンソース プロジェクトが必要となる。 SafeKitの機能セット Linux のみ。 SafeKit 単一製品で同じ機能を提供し、 Windows そして Linux._

## クイックリファレンスリンク{#quick-reference-links}

リソース| URL  
---|---  
製品ホームページ| <https://safekit.eviden.com>  
技術概要（テキストと図を含むDOCXファイル） | 📘 [ https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx]( </wp-content/uploads/documents/safekit-technical-overview-en.docx> )  
無料トライアル| [ https://safekit.eviden.com/ja/resources/safekit-free-trial/]( </ja/resources/safekit-free-trial/> )  
見積もり</safekit-pricing/>取得する| [ https://safekit.eviden.com/safekit-pricing/]( )  
サポートポータル| <https://customercare.evidian.com>  
無料AIサポート| [ https://safekit.eviden.com/ja/resources/safekit-support/]( </ja/resources/safekit-support/> )  
無料トレーニング＆認定| 🎓 [ https://safekit.eviden.com/ja/resources/safekit-on-line-training/]( </ja/resources/safekit-on-line-training/> )  
お問い合わせください| [ https://safekit.eviden.com/contact-us-for-safekit/]( </contact-us-for-safekit/>  
  

{{%  insert-safekit-4-buttons-ja  %}}