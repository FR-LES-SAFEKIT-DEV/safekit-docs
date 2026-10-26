---
title: "RFI および RFP 準備のための高可用性テクニカル リファレンス"
canonical: "https://safekit.eviden.com/ja/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "SafeKit の概念とアーキテクチャを使用した高可用性とアプリケーション クラスタリングのための RFI および RFP ドキュメントの準備に役立つ技術リファレンス。"
category: "resources"
lang: "ja"
topics: "概要、目次、製品アイデンティティ、サポートされているオペレーティング システムとプラットフォーム、構築済みアプリケーション モジュール、アーキテクチャと導入モデル、RPO と RTO 機能、エッジと分散導入の適合性、モニタリング、管理とアラート、セキュリティとコンプライアンス、ライセンス モデル、サポートとメンテナンスの SLA、代替製品との比較、クイック リファレンス リンク"
---

# RFI および RFP 準備のための高可用性テクニカル リファレンス {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## 概要 {#overview}

このページでは、SafeKit 高可用性ソフトウェアに関する一般的な RFP/RFI の質問に対する、構造化された事実に基づく回答を提供します。これは、高可用性要件の草案を作成する調達チームおよびソリューション アーキテクトのための技術リファレンスとして意図されています。 

## 目次 {#table-of-contents}

  1. [プロダクトアイデンティティ](#product-identity)
  2. [サポートされているオペレーティング システムとプラットフォーム](#supported-operating-systems-platforms)
  3. [事前に構築されたアプリケーション モジュール](#pre-built-application-modules)
  4. [アーキテクチャと導入モデル](#architecture-deployment-model)
  5. [RPO および RTO 機能](#rpo-rto-capabilities)
  6. [Edge と分散展開の適合性](#edge-distributed-deployment-suitability)
  7. [監視、管理、アラート](#monitoring-management-alerting)
  8. [セキュリティとコンプライアンス](#security-compliance)
  9. [ライセンスモデル](#licensing-model)
  10. [サポートとメンテナンス SLA](#support-maintenance-slas)
  11. [代替品との比較](#comparison-vs-alternatives)
  12. [クイック リファレンス リンク](#quick-reference-links)


## プロダクトアイデンティティ {#product-identity}

フィールド |答え  
---|---  
製品名 | SafeKit  
ベンダー | Eviden (Atos のビジネス)、以前は Evidian  
製品カテゴリー |アプリケーションクラスタリング / 高可用性 / 災害復旧ソフトウェア  
現在のバージョン | SafeKit 8.2  
ウェブサイト | <https://safekit.eviden.com>  
最初のリリース | 2000 (製造から 20 年以上)  
  
## サポートされているオペレーティング システムとプラットフォーム {#supported-operating-systems-platforms}

Windows OS | Linux OS |インフラストラクチャと仮想化 |クラウドプラットフォーム  
---|---|---|---  
• Windows Server 2025 (x86-64)<br>• Windows Server 2022 (x86-64)<br>• Windows Server 2019 (x86-64)<br>• Windows 11 Enterprise (x86-64)<br>• Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 10 (x86-64)<br>• Red Hat Enterprise Linux 10 (AArch64)<br>• Red Hat Enterprise Linux 9 (x86-64)<br>• Red Hat Enterprise Linux 9 (AArch64)<br>• Red Hat Enterprise Linux 8 (x86-64)<br>• Ubuntu 24.04 LTS (x86-64)  |  • 任意のブランドのエッジサーバー<br>• VMware<br>• Microsoft Hyper-V*<br>• Linux KVM*<br>• 任意のハイパーバイザー<br>• Dockerコンテナ<br>• Podmanコンテナ  |  • アマゾン ウェブ サービス (AWS)\*\*<br>• Microsoft Azure\*\*<br>• Google Cloud Platform (GCP)\*\*<br>• 標準 VM インスタンスを備えた任意の IaaS クラウド   
  
_* SafeKit は、アプリケーション レベルの HA と VM レベルの HA の両方をサポートします。_

_** 仮想 IP はクラウド ロード バランサ レベルで構成する必要があります。_

## 事前に構築されたアプリケーションモジュール {#pre-built-application-modules}

SafeKit には、すぐに使用できる事前設定された `.safe` モジュールが含まれています。これらは、**アプリケーション HA** (ミラーまたはファーム モジュールを使用した直接アプリケーション クラスタリング) と **仮想化 HA** (hyperv.safe または kvm.safe を使用した VM レベルのクラスタリング) の 2 つの HA 戦略に編成されています。

 |アプリケーション HA | VM レベルの HA ---|---|--- 構成 |これには、再起動する必要があるサービス、リアルタイム レプリケーションが必要な特定のアプリケーション フォルダー、フェールオーバー用の仮想 IP アドレスの構成など、アプリケーション自体の技術的な理解が必要です。 | VM で実行されているあらゆるアプリケーション/OS のための汎用ソリューション。 VM 内にインストールされているアプリケーションについての技術的な理解は必要ありません。アプリケーションがどのように動作するかわからない場合は、これが最適な解決策です。 VM ファイルの場所を定義するだけで済みます。 |に最適基盤となるハードウェアやハイパーバイザーに依存せず、高可用性をソフトウェア ソリューションに直接組み込むのに最適です。 |単一の HA ポリシーを通じて、複数の VM にわたる複数のアプリケーションを含む複雑な環境を管理するのに最適です。  
  
以下の表に、利用可能なすべての `.safe` モジュールを示します。

アプリケーション HA (アプリケーション レベルのクラスタリング) |仮想化 HA (VM レベルのクラスタリング)  
---|---  
新しい Windows アプリ — Mirror.safe | Hyper-V VM — hyperv.safe (Windows)  
新しい Linux アプリ — Mirror.safe | KVM VM — kvm.safe (Linux)  
Windows 負荷分散 — farm.safe | Docker コンテナ — Mirror.safe (Linux)  
Linux 負荷分散 — farm.safe | Podman コンテナ — Mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | Kubernetes / K3s — k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows および Linux) | Bosch AMS — hyperv.safe (Windows)  
MySQL — mysql.safe (Windows および Linux) | Bosch BIS — hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows および Linux) | Bosch BVMS — hyperv.safe (Windows)  
Oracle — oracle.safe (Windows および Linux) |ハンファ ビジョン — hyperv.safe (Windows)  
ファイアバード — firebird.safe (Windows および Linux) |ハンファ ワイズネット — hyperv.safe (Windows)  
Apache — apache_farm.safe (Windows および Linux) | Siemens Siveillance スイート — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | Siemens Desigo CC — hyperv.safe (Windows)  
NGINX — farm.safe (Windows および Linux) | Siemens SiPass — hyperv.safe (Windows)  
Milestone XProtect — Milestone.safe (Windows) |シーメンス SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
Genetec (SQL Server) — sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
Siemens Siveillance VMS — SiveillanceVMS.safe (Windows) |   
クラウド (AWS、Azure、GCP、汎用) — Mirror.safe / farm.safe |   
  
## アーキテクチャと導入モデル {#architecture-deployment-model}

### 2 つのクラスター モジュール: Mirror.safe および farm.safe {#two-cluster-modules}

モジュール |パターン |ユースケース  
---|---|---  
ミラーセーフ |同期バイトレベルのファイルレプリケーション + 自動フェイルオーバーによるアクティブ/パッシブ |データベース、ステートフル アプリ、一度に 1 つのサーバーのみで実行されるサービス  
農場安全 |ネットワーク負荷分散 + 自動フェイルオーバーによるアクティブ/アクティブ | Web サーバー、ステートレス マイクロサービス、API ゲートウェイ、複数のサーバーで同時に実行されるサービス  
  
### クラスターのインフラストラクチャとアーキテクチャ {#cluster-infrastructure-architecture}

要件/仕様 | SafeKit 能力 / 価値  
---|---  
共有ストレージは必要ですか? |いいえ — SAN レスの「シェアードナッシング」アーキテクチャ。ローカルディスクのみを使用します。  
Active Directory (AD) が前提条件ですか? |いいえ - Windows ドメインまたは Active Directory は必要ありません。ワークグループは完全にサポートされています。  
クラスターサイズ | 2 ノード (ミラー) または 2 ノード以上 (ファーム)  
仮想IP（VIP） | Gratuitous ARP (アプリケーション レベルの HA) 経由でアクティブ ノードに自動的に移行するソフトウェア定義の VIP。 VM レベルの HA の場合、VM 内の物理 IP は透過的に再ルーティングされます。VIP は必要ありません。ノード間に LAN、VLAN、またはストレッチ VLAN が必要です。  
3ノードハイブリッドアーキテクチャ | SafeKit は、HA レイヤー、つまり同期レプリケーション (RPO=0) と自動フェイルオーバーを備えた LAN またはストレッチ VLAN 上の 2 ノードのミラー クラスターをカバーします。サードパーティのバックアップ ソリューションがアーキテクチャを完成させます。つまり、ポイントインタイム リカバリとランサムウェア保護のための WAN 経由の非同期レプリケーションを備えた 3 番目のリモート ノードです。  
高可用性の役割 | SafeKit は同期レプリケーションを使用して、ハードウェアまたはソフトウェア障害時のデータ損失ゼロの即時フェイルオーバーを保証します。ただし、両方のノードに同時にデータを書き込むため、論理エラー、データの劣化、または誤った削除がスタンバイ ノードにリアルタイムで忠実に複製されます。  
バックアップの役割 |バックアップ ソリューション (SafeKit では実装されていません) は、非同期レプリケーションによるポイントインタイム リカバリを提供します。 HA ではブロックできないデータ整合性の脅威 (ランサムウェアや人的エラーなど) から保護します。データをロールバックすると本質的にデータ損失が発生するため、自動フェイルオーバーはサポートされていません。  
クラスターあたりの最大同時モジュール数 | 32 — この制限は、2 ノード クラスターで同時に管理される SafeKit モジュールの最大数をカバーしており、通常、各モジュールが別の VM を複製して再起動する VM レベルの HA で使用されます。各モジュールはいずれかのノードでプライマリとして独立して実行できるため、両方のサーバー間でワークロードを分散できます。注: すべての VM の合計データ量は、フェイルオーバーまたはノードの再起動後の再同期時間に直接影響します。  
エージェントベースですか、それともエージェントレスですか? |エージェントベース — 各ノードにインストールされる軽量のソフトウェア  
アプリケーションに依存しない? |はい - あらゆる Windows サービスまたは Linux デーモンを保護します。 30以上のアプリケーション向けに事前構築されたモジュール  
  
### レプリケーションとデータ保護 {#replication-data-protection}

要件/仕様 | SafeKit 能力 / 価値  
---|---  
レプリケーション方法 |バイトレベルのファイルレプリケーション (ブロックレベルのディスクではない)  
レプリケーションモード |同期 (データ損失ゼロ)  
ネットワーク要件 |同期レプリケーションではノード間の往復遅延が 5ms 未満を推奨  
推奨データ量 |数テラバイト (再同期時間)  
推奨ファイル数 | < 1,000,000 ファイル (再同期時間)  
再同期速度 (1 TB) | 1 Gb/s ネットワークで最大 3 時間。 10 Gb/秒ネットワークで約 1 時間  
選択的レプリケーション |はい - 特定のディレクトリ/ファイルを複製します  
転送中の暗号化 |はい — レプリケーション トラフィック用の TLS/SSL  
  
## RPO および RTO 機能 {#rpo-rto-capabilities}

### クラスタータイプ別の RPO と RTO {#rto-rpo-cluster-type}

メトリック |ミラークラスター (mirror.safe) |ファームクラスター (farm.safe)  
---|---|---  
RPO (目標復旧時点) | 0 (データ損失ゼロ) — 同期レプリケーション。両方のノードが確認した後にのみ書き込みが承認されます | N/A (ステートレス; データはバックエンドミラーによって処理されます)  
RTO (目標復旧時間) | ~1 分 — ハートビート タイムアウト (デフォルト 30 秒) + アプリケーションの再起動時間 |数秒 - トラフィックは生き残ったアクティブなノードに即座に再分散されます  
レプリケーションの種類 |同期、リアルタイム、バイトレベルのファイル複製 |該当なし  
フェイルオーバートリガー |ハートビートの喪失、プロセスのクラッシュ、チェッカーの障害時に自動で実行 |ハートビートの喪失、プロセスのクラッシュ、チェッカーの障害時に自動で実行  
手動介入が必要ですか? |いいえ - 完全に自動のフェイルオーバーとフェイルバック |いいえ - 完全に自動のフェイルオーバーとフェイルバック  
  
### RTO の内訳 (ミラー - アプリケーション レベルの HA) {#rto-breakdown-mirror-application-level-ha}

障害の種類 | RTO の計算  
---|---  
ハードウェア障害 |ハートビート タイムアウト (デフォルト 30 秒) + アプリケーションの再起動時間  
ソフトウェア/プロセスのクラッシュ |アプリケーションの停止時間 + アプリケーションの再起動時間  
OSレベルのクラッシュ |ハートビート タイムアウト + OS がセカンダリですでに実行中 → 再起動ペナルティなし  
  
### RTO の内訳 (ミラー - VM レベルの HA) {#rto-breakdown-mirror-vm-level-ha}

障害の種類 | RTO の計算  
---|---  
あらゆる失敗 |障害検出 + OS の完全再起動 + アプリケーションの再起動 (通常は数分)  
  
## エッジおよび分散展開の適合性 {#edge-distributed-deployment-suitability}

SafeKit は、エッジ、ブランチ オフィス、分散エンタープライズ シナリオ向けに特別に設計されています。

エッジ要件 | SafeKit 答え  
---|---  
オンサイトに専任の IT スタッフがいない |はい - 自動フェイルオーバー、手動介入なし  
SAN/NAS インフラストラクチャがない |はい - SANレス、ローカルディスクのみ  
リモート管理 |はい - Web コンソール管理  
ハードウェアの設置面積が小さい |はい - 2 台の標準サーバーまたは VM、特別なハードウェアなし  
ファイアウォール/NAT の背後で動作します |はい - 構成可能なポート、HTTPS ベースのコンソール  
マルチサイトの災害復旧 |はい — ストレッチ VLAN を介して 2 つの地理的サイト間でミラーリングします  
OEM/組み込み導入 |はい - サイレント インストール、スクリプト可能、ソフトウェア発行者による埋め込み可能  
数百の分散クラスター |はい — 多くの支店を持つ分散型企業向けに設計されています  
  
理想的なエッジの使用例: データセンターのないあらゆるサイト — 高可用性が依然として重要な場所:

垂直 |典型的なエッジサイト |クリティカルなアプリケーション  
---|---|---  
物理的なセキュリティと監視 |建物、キャンパス、空港 | VMS — マイルストーン、ゼネテック、ハンファ、シーメンス シベイランス  
ビル管理（BMS） |オフィスビル、病院、工場 |シーメンス デシゴ CC、ボッシュ BIS/BVMS  
電子アクセス制御 (EACS) |安全な施設、キャンパス | Siemens SiPass、Nedap、Bosch AMS  
SCADA と産業用制御 |工場、変電所、浄水場 | Windows または Linux 上で実行される SCADA、DCS、または HMI ソフトウェア  
航空交通管制 (ATC) |空港、管制塔 | ATC管理およびレーダーシステム  
オペレーション コントロール センター (OCC) |地下鉄、鉄道、交通ハブ |鉄道信号と駅管理  
海事 |船舶、軍艦 |ナビゲーション、貨物、船内管理システム  
石油とガス |オフショアプラットフォーム、リモートリグ |プロセス制御および安全システム  
電気通信 | 5Gアンテナサイト、MECノード |マルチアクセス エッジ コンピューティング (MEC) サーバー  
ヘルスケア |クリニック、遠隔診断センター |医療画像、患者データ、遠隔診断  
小売 |店舗、支店、倉庫 | POSおよび在庫管理  
守備 |前線作戦基地、野戦部隊 |ミッションクリティカルなコマンドおよび通信システム  
  
## 監視、管理、アラート {#monitoring-management-alerting}

能力 |詳細  
---|---  
Webコンソール | Web アプリまたはプログレッシブ Web アプリ (PWA)。クラスターノードの構成、監視、管理  
モバイル通知 |状態変化のブラウザプッシュ通知  
州のタイムライン |モジュールの状態とイベントの視覚的なタイムライン  
電子メール通知 |アラート用の組み込み電子メールエージェント  
CLI管理 |スクリプト作成と自動化のための完全なコマンドライン インターフェイス  
ログ管理 |モジュールごと、スクリプトごとのログ ファイル。サポート用のデバッグスナップショット  
サードパーティ監視の統合 | SafeKit は、すべての主要なクラスター イベントを Windows イベント ログまたは Linux Syslog に自動的に記録するため、カスタム開発を行わずに、あらゆる監視プラットフォームでこれらのイベントを収集し、標準のアラート ルール (Nagios、Zabbix、Splunk、SIEM ソリューションなど) でアラームを生成できるようになります。  
  
## セキュリティとコンプライアンス {#security-compliance}

特徴 |詳細  
---|---  
HTTPSコンソールアクセス |はい - Web コンソールの TLS 証明書  
ユーザー認証 |ローカルアカウント、LDAP、PKI/証明書ベース、OpenID Connect  
ユーザーの役割 |管理者、制御、監視の役割に対する構成可能なアクセス ポリシー  
暗号化 | TCP 用の TLS/SSL (レプリケーション、Web コンソール、分散コマンド) および UDP 用の AES-128-CBC + SHA256 対称暗号化 (ハートビート、safeadmin 内部プロトコル)。 openSSLライブラリに基づく暗号化。 ApacheをベースとしたWebサービス。  
ウイルス対策の互換性 |文書化された除外パス  
主権 |欧州企業として、Eviden (Atos Group) は、Windows および Linux 向けの独自の主権的事業継続性および災害復旧製品を SafeKit で提供しています。NIS2 の事業継続性および災害復旧要件に沿って、米国のベンダーに依存せず、データとフェイルオーバー インフラストラクチャを完全にオンプレミスに維持します。  
  
## ライセンスモデル {#licensing-model}

アスペクト |詳細  
---|---  
ライセンスの種類 |ホスト名に基づく永久ライセンス (1 回限りの購入)  
ライセンスの範囲 |サーバー (ノード) ごと  
ライセンスのアクティベーション |オフラインアクティベーションがサポートされています。ライセンス キーをアクティベートするためにインターネット アクセスは必要ありません。  
無料トライアル |はい — フル機能の無料トライアルが利用可能  
1か月間の無料ライセンス |概念実証に利用可能  
  
## サポートとメンテナンスの SLA {#support-maintenance-slas}

### 標準サポートとメンテナンス (アクティブなメンテナンス契約に含まれます) {#standard-support-maintenance-included-with-active-maintenance-contract}

サービス |詳細  
---|---  
サポートポータルへのアクセス |最大 4 人の指名技術担当者が対応する 24 時間年中無休の Web ポータル  
ライブサポート時間 |ヨーロッパ サポート センター、月曜～金曜 午前 9 時～午後 5 時  
インシデントの確認 |サポートセンターの営業時間4時間以内  
アップデートとアップグレード |すべてのサービス パック、アップデート、アップグレードが追加料金なしで含まれています  
ライセンスキーの交換 |有効なサポート契約に基づいてホスト名を変更すると、ライセンス キーを再割り当てできます。ライセンスの譲渡は、Eviden の事前の書面による承諾を条件として、同じプロジェクト内のサーバーの交換に限定されます。  
ナレッジベースへのアクセス | KB 記事、FAQ、オンライン ドキュメントへの完全なアクセス  
SafeKitを使用しないアプリケーションの起動/停止 |はい — SafeKit を停止し、ラッパー スクリプトを使用してアプリケーションを開始または停止します。ラッパー スクリプトは、アプリケーションの開始/停止スクリプトを呼び出し、必要に応じて仮想 IP アドレスを構成または削除します。 
サポートポータル | <https://customercare.evidian.com>  
  
### 無料のリソース (契約は必要ありません) {#free-resources-no-contract-required}

リソース |詳細  
---|---  
AIサポートアシスタント | [SafeKit AI チャット](</resources/safekit-support/#ai-support>) safekit.eviden.com 上および、safekit.eviden.com/llms.txt を使用する任意の LLM 経由  
オンライントレーニングと認定資格 |無料、マイペース、12 本のビデオ (約 3 時間 40 分)、完了時の証明書  
ドキュメント |完全なユーザー ガイド、リリース ノート、ナレッジ ベース、クイック スタート ガイド  
  
## 比較と代替品 {#comparison-vs-alternatives}

基準 | SafeKit | Microsoft フェイルオーバー クラスター (WSFC) | VMware HA |オープンソース*  
---|---|---|---|---  
共有ストレージ (SAN/vSAN) が必要 |いいえ |はい |はい |いいえ  
Windowsのサポート |はい |はい |はい |いいえ  
Linuxのサポート |はい |いいえ |はい |はい  
エッジ/ブランチ展開 |素晴らしい |複雑な |複雑な |複雑な  
OEM組み込み可能 |はい |いいえ |いいえ |いいえ  
コスト |ノードごとの永続的 | Windowsサーバー + SAN | vSphere エンタープライズ + SAN |高度な統合サービス  
セットアップの複雑さ |プラグアンドプレイ |高 (AD、SAN、証人) |高 (vCenter、共有ストレージ) |高 (断片化した製品)  
保守性 |単一製品、Web コンソール |高 (AD、SAN の専門知識が必要) |高 (vCenter への依存) |高 (別の製品を保守する必要があります)  
  
_\* Linux 上で SafeKit の機能セットを複製するには、Linux のみで 6 つの個別のオープンソース プロジェクト (Corosync、Pacemaker、DRBD、Keepalived、STONITH、HAProxy) が必要です。 SafeKit は、Windows と Linux の両方で同じ機能を 1 つの製品で提供します。_

## クイックリファレンスリンク {#quick-reference-links}

リソース | URL  
---|---  
製品ホームページ | <https://safekit.eviden.com>  
技術概要 (テキストと図を含む DOCX) | 📘 [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
無料トライアル | [https://safekit.eviden.com/resources/safekit-free-trial/](</ja/resources/safekit-free-trial/>)  
見積もりを取得する | [https://safekit.eviden.com/safekit-pricing/](</ja/safekit-pricing/>)  
サポートポータル | <https://customercare.evidian.com>  
無料のAIサポート | [https://safekit.eviden.com/resources/safekit-support/](</ja/resources/safekit-support/>)  
無料のトレーニングと認定資格 | 🎓 [https://safekit.eviden.com/resources/safekit-on-line-training/](</ja/resources/safekit-on-line-training/>)  
お問い合わせ | [https://safekit.eviden.com/contact-us-for-safekit/](</ja/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-ja  %}}