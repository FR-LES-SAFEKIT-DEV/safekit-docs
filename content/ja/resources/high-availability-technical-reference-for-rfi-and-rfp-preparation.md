---
title: "RFI および RFP 文書向け SafeKit テクニカルリファレンス"
canonical: "https://safekit.eviden.com/ja/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "SafeKit に関する技術情報を検索し、情報提供依頼書（RFI）や提案依頼書（RFP）の準備にお役立てください。サポート対象システム、アーキテクチャ、復旧時間、セキュリティ、ライセンス、サポートについてご紹介します。"
category: "resources"
lang: "ja"
topics: "概要、目次、製品情報、サポートされているオペレーティングシステムとプラットフォーム、SafeKit High Availability の制限事項、事前設定済みのアプリケーションモジュール、アーキテクチャとデプロイメント、データ損失と復旧時間（RPO と RTO）、リモートサイトと分散配置、監視とアラート、セキュリティとコンプライアンス、ライセンス、サポートとメンテナンス、他のソリューションとの比較、便利なリンク"
translation: "translate_md 2026-11-11.5 | glossaire 2026-11-11.10 | Translation LLM | 49 expressions"
---

# RFI および RFP 文書の SafeKit 技術リファレンス {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## 概要 {#overview}

このページでは、情報提供依頼書（RFI）または提案依頼書（RFP）を作成する際に役立つ、SafeKit 高可用性ソフトウェアに関するよくある技術的な質問への回答を掲載しています。この情報は、調達チームやソリューションアーキテクトが要件を定義するのに役立ちます。

## 目次 {#table-of-contents}

  1. [製品情報](#product-identity)
  2. [サポートされているオペレーティングシステムとプラットフォーム](#supported-operating-systems-platforms)
  3. [SafeKit High Availability の制限事項](#safekit-ha-limitations)
  4. [事前設定済みのアプリケーションモジュール](#pre-built-application-modules)
  5. [アーキテクチャとデプロイメント](#architecture-deployment-model)
  6. [データ損失と復旧時間（RPO と RTO）](#rpo-rto-capabilities)
  7. [リモートサイトと分散配置](#edge-distributed-deployment-suitability)
  8. [監視とアラート](#monitoring-management-alerting)
  9. [セキュリティとコンプライアンス](#security-compliance)
  10. [ライセンス](#licensing-model)
  11. [サポートとメンテナンス](#support-maintenance-slas)
  12. [他のソリューションとの比較](#comparison-vs-alternatives)
  13. [便利なリンク](#quick-reference-links)


## 製品情報 {#product-identity}

トピック | 詳細  
---|---  
製品名 | SafeKit  
ベンダー | Eviden Atos グループの一員です。旧社名は Evidian。  
開発国 | フランス  
製品カテゴリ | アプリケーションクラスタリング、高可用性、およびディザスタリカバリ用ソフトウェア  
現在のバージョン | SafeKit 8.2  
ウェブサイト | [https://safekit.eviden.com](/ja/)  
初回リリース | 2000 年。20 年以上にわたり本番環境で使用されています。  
  
## サポートされているオペレーティングシステムとプラットフォーム {#supported-operating-systems-platforms}

Windows オペレーティングシステム | Linux オペレーティングシステム | インフラストラクチャと仮想化 | クラウドプラットフォーム  
---|---|---|---  
• Windows Server 2025 (x86-64) <br> • Windows Server 2022 (x86-64) <br> • Windows Server 2019 (x86-64) <br> • Windows 11 Enterprise (x86-64) <br> • Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 10 (x86-64) <br> • Red Hat Enterprise Linux 10 (AArch64) <br> • Red Hat Enterprise Linux 9 (x86-64) <br> • Red Hat Enterprise Linux 9 (AArch64) <br> • Red Hat Enterprise Linux 8 (x86-64) <br> • Ubuntu 24.04 LTS (x86-64)  |  • 任意のブランドのエッジサーバー <br> • VMware <br> • Microsoft Hyper-V [1] <br> • Linux KVM [1] <br> • 任意のハイパーバイザー <br> • Docker コンテナ <br> • Podman コンテナ  |  • Amazon Web Services (AWS) [2] <br> • Microsoft Azure [2] <br> • Google Cloud Platform (GCP) [2] <br> • 標準的な VM インスタンスを備えた IaaS クラウド   
  
**[1]** SafeKit、個々のアプリケーションまたは仮想マシン全体に高可用性を提供します。

**[2]** クラウドでは、クラウドロードバランサーに仮想 IP アドレスを構成します。

{{%  insert-safekit-usage-ja  %}}

## 事前設定済みのアプリケーションモジュール {#pre-built-application-modules}

SafeKit は、すぐに使用できる `.safe` モジュールが含まれています。アプリケーションを保護する方法は 2 つあります。**アプリケーションの高可用性は**、mirror または <span class="notranslate farm-term" translate="no">farm</span> モジュールでアプリケーションを直接保護します。**仮想マシンの高可用性は**、hyperv.safe または kvm.safe モジュールで仮想マシン全体を保護します。

比較基準 | アプリケーションの高可用性 | 仮想マシンの高可用性  
---|---|---  
設定 | 再起動するアプリケーションサービスとレプリケートするフォルダを把握しておく必要があります。また、フェイルオーバーに使用する仮想 IP アドレスも設定する必要があります。 | 仮想マシンのファイルの場所を指定するだけで済みます。仮想マシン内のアプリケーションがどのように動作するかを知る必要はありません。このアプローチにより、アプリケーションとオペレーティングシステムをまとめて保護します。  
推奨される使用方法 | 特定のハードウェアやハイパーバイザーに依存することなく、ソフトウェアソリューションに直接高可用性を追加します。 | 1 つの高可用性ポリシーで、複数の仮想マシンにまたがる複数のアプリケーションを管理します。  
  
以下の表に、利用可能なすべての `.safe` モジュールをリストします：

アプリケーションの高可用性 | 仮想マシンの高可用性  
---|---  
新しい Windows アプリ — mirror.safe | Hyper-V VM — hyperv.safe (Windows)  
新しい Linux アプリ — mirror.safe | KVM VM — kvm.safe (Linux)  
Windows 負荷分散 — farm.safe | Docker コンテナ — mirror.safe (Linux)  
Linux ロードバランシング — farm.safe | Podman コンテナ — mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | K3s Kubernetes — k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows & Linux) | Bosch AMS — hyperv.safe (Windows)  
MySQL — mysql.safe (Windows & Linux) | Bosch BIS — hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows & Linux) | Bosch BVMS — hyperv.safe (Windows)  
Oracle — oracle.safe (Windows & Linux) | Hanwha Vision — hyperv.safe (Windows)  
Firebird — firebird.safe (Windows & Linux) | Hanwha Wisenet — hyperv.safe (Windows)  
Apache — apache_farm.safe (Windows & Linux) | Siemens Siveillance suite — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | Siemens Desigo CC — hyperv.safe (Windows)  
NGINX — farm.safe (Windows & Linux) | Siemens SiPass — hyperv.safe (Windows)  
Milestone XProtect — milestone.safe (Windows) | Siemens SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
Genetec (SQL Server) — sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
Siemens Siveillance VMS — SiveillanceVMS.safe (Windows) |   
クラウド (AWS、Azure、GCP、汎用) — mirror.safe/farm.safe |   
  
## アーキテクチャとデプロイメント {#architecture-deployment-model}

### 2 つのクラスターモジュール：mirror.safe と farm.safe {#two-cluster-modules}

モジュール | 動作原理 | 代表的な用途  
---|---|---  
mirror.safe | 1 台のサーバーがアクティブで、もう 1 台がスタンバイ状態です。ファイルはバイトレベルで同期的にレプリケートされます。フェイルオーバーは自動です。 | データベース、状態を保存するアプリケーション、および一度に 1 台のサーバーでのみ実行されるサービス  
farm.safe | 複数のサーバーが同時に稼働します。SafeKit はそれらのサーバー間でネットワークトラフィックを分散し、フェイルオーバーを自動的に処理します。 | Web サーバー、ステートレスマイクロサービス、API ゲートウェイ、および一度に複数のサーバーで実行されるサービス  
  
### クラスターインフラストラクチャ {#cluster-infrastructure-architecture}

要件 | SafeKit は機能  
---|---  
共有ストレージが必要ですか？ | いいえ。SafeKit はローカルディスクを使用します。や共有ストレージ SAN 必要ありません。  
Active Directory は必要ですか？ | いいえ。SafeKit Windows ドメインや Active Directory を必要としません。ワークグループもサポートしています。  
クラスター内のノード数 | 2 ノード（mirror）または 2 ノード以上（<span class="notranslate farm-term" translate="no">farm</span>）  
仮想 IP アドレス（VIP） | アプリケーションの高可用性のために、仮想 IP アドレスは Gratuitous ARP を介して自動的にアクティブノードに移動します。仮想マシンの高可用性のために、仮想マシン内の IP アドレスへのトラフィックは自動的にリダイレクトされます。個別の仮想 IP アドレスは必要ありません。ノードは、サイト間で拡張された LAN または VLAN を共有する必要があります。  
3 ノードのアーキテクチャ | SafeKit は、LAN またはサイト間で拡張された VLAN 上で 2 ノードの mirror クラスターを実行します。ゼロデータ損失（RPO = 0）の同期レプリケーションと自動フェイルオーバーを提供します。別のバックアップ製品は、WAN 経由で 3 番目のノードにデータを非同期的にレプリケートします。このバックアップにより、以前の時点へのリカバリが可能になり、ランサムウェアに対する保護が提供されます。  
高可用性の目的 | SafeKit は、両方のノードにデータを同期的に複製します。これにより、ハードウェアまたはソフトウェアの障害発生後も、データ損失なしに自動フェイルオーバーが可能です。ただし、論理エラー、データ破損、および偶発的な削除もスタンバイノードに即座にコピーされます。  
バックアップの目的 | バックアップを使用すると、以前の時点のデータを復元できます。SafeKit はなく、別のバックアップ製品が非同期レプリケーションによってこの保護を提供します。バックアップは、ランサムウェアや人的ミスからの復旧に役立ちます。この復旧は自動フェイルオーバーではありません。古いバックアップを復元すると、そのバックアップ後に加えられた変更は失われます。  
同時に実行できるモジュールの最大数 | 2 ノードクラスターは、最大 32 個のモジュールを同時に管理できます。仮想マシンの保護では、各モジュールが異なる仮想マシンを複製して再起動します。各モジュールはどちらのノードでもプライマリになることができるため、両方のサーバーでワークロードを共有できます。データの総量は、フェイルオーバーまたはノードの再起動後の再同期時間に影響します。  
各ノードにソフトウェアはインストールされていますか？ | はい。各ノードに軽量ソフトウェアがインストールされています。  
サポートされているアプリケーション | SafeKit は、あらゆる Windows サービスや Linux デーモンを保護できます。30 種類以上のアプリケーションに対応した事前設定済みモジュールをご利用いただけます。  
  
### レプリケーションとデータ保護 {#replication-data-protection}

要件 | SafeKit は機能  
---|---  
レプリケーション方式 | SafeKit は、バイトレベルでファイルの変更をレプリケートします。ディスクブロックはレプリケートしません。  
レプリケーションモード | ゼロデータロスでの同期レプリケーション  
ネットワーク要件 | 同期レプリケーションでは、ノード間の往復レイテンシが 5 ミリ秒未満であることが推奨されます。  
推奨データ量 | 再同期時間を管理しやすいように、数テラバイト程度  
推奨ファイル数 | 再同期時間を管理しやすいように、ファイル数は 1,000,000 個未満にしてください  
1TB の再同期時間 | 1 Gb/s のネットワークで約 3 時間、10 Gb/s のネットワークで約 1 時間  
選択的レプリケーション | レプリケートするディレクトリとファイルを指定できます。  
転送中の暗号化 | レプリケーショントラフィックは TLS/SSL で暗号化されます。  
  
## データ損失と復旧時間（RPO と RTO） {#rpo-rto-capabilities}

### 各クラスタータイプの RPO と RTO {#rto-rpo-cluster-type}

メートル法 | Mirror (mirror.safe) | <span class="notranslate farm-term" translate="no">Farm</span> (farm.safe)  
---|---|---  
RPO（リカバリポイント目標） | データ損失ゼロ。書き込み操作は、両方のノードがデータを書き込んだ場合にのみ完了します。 | ステートレスサービスには適用されません。データは別の mirror クラスターによって管理されます。  
RTO（目標復旧時間） | 約 1 分です。これには<span class="notranslate farm-term" translate="no">ハートビート</span>タイムアウト（デフォルトで 30 秒）と、アプリケーションの再起動にかかる時間が含まれます。 | 数秒で、トラフィックは残りのアクティブなノードに再分散されます。  
レプリケーションの種類 | 同期型リアルタイムバイトレベルファイルレプリケーション | 該当なし  
フェイルオーバートリガー | フェイルオーバーは、<span class="notranslate farm-term" translate="no">ハートビート</span>メッセージが停止した場合、プロセスがクラッシュした場合、またはチェッカーが障害を検出した場合に自動的に開始されます | フェイルオーバーは、<span class="notranslate farm-term" translate="no">ハートビート</span>メッセージが停止した場合、プロセスがクラッシュした場合、またはチェッカーが障害を検出した場合に自動的に開始されます  
手動での介入が必要ですか？ | いいえ。フェイルオーバーとフェイルバックは自動です。 | いいえ。フェイルオーバーとフェイルバックは自動です。  
  
### Mirror クラスターで保護されたアプリケーションのリカバリー時間 {#rto-breakdown-mirror-application-level-ha}

障害の種類 | 回復時間の計算方法  
---|---  
ハードウェアの故障 | <span class="notranslate farm-term" translate="no">ハートビート</span>タイムアウト (デフォルトは 30 秒) の後、アプリケーションが再起動されます  
ソフトウェアまたはプロセスのクラッシュ | アプリケーションを停止してから再起動するまでの時間  
オペレーティングシステムのクラッシュ | <span class="notranslate farm-term" translate="no">ハートビート</span>タイムアウト後、アプリケーションが再起動されます。スタンバイサーバーは、オペレーティングシステムがすでに実行されているため、再起動する必要はありません。  
  
### Mirror クラスターで保護された仮想マシンのリカバリ時間 {#rto-breakdown-mirror-vm-level-ha}

障害の種類 | 回復時間の計算方法  
---|---  
すべての障害タイプ | 障害を検出し、仮想マシンのオペレーティングシステムを再起動し、アプリケーションを再起動します。通常、これには数分かかります。  
  
## リモートサイトと分散配置 {#edge-distributed-deployment-suitability}

SafeKit はリモートサイト、支店、および多数の拠点を持つ組織向けに設計されています。

リモートサイトでの要件 | SafeKit は機能  
---|---  
専任の IT スタッフは常駐していません | フェイルオーバーは自動で行われ、手動での操作は必要ありません。  
共有ストレージ（SAN または NAS）なし | ローカルディスクのみで十分です。共有ストレージは必要ありません。  
リモート管理 | Web コンソールからクラスターを管理します。  
ハードウェアの制限 | 標準的なサーバーまたは仮想マシンが 2 台あれば十分です。特別なハードウェアは必要ありません。  
ファイアウォールとネットワークアドレス変換（NAT） | ポートは設定可能です。ウェブコンソールは HTTPS を使用します。  
サイト間のディザスタリカバリ | Mirror クラスター 2 つのサイト間を VLAN で拡張して接続できます。  
ソフトウェアパブリッシャーによる統合 | ソフトウェア発行元は、SafeKit 製品に組み込むことができます。インストールはユーザーの操作なしで実行でき、スクリプトで自動化することも可能です。  
多数のサイトにわたる数百の SafeKit クラスター | SafeKit は、多くの支店を持つ組織向けに設計されています。  
  
以下のサイトは、データセンターがなくても高可用性が必要です：

業界 | 典型的なサイト | 重要なアプリケーション  
---|---|---  
物理的セキュリティと監視 | ビル、キャンパス、空港 | VMS — Milestone、Genetec、Hanwha、Siemens Siveillance  
ビル管理システム（BMS） | オフィスビル、病院、工場 | Siemens Desigo CC、Bosch BIS/BVMS  
電子アクセス制御（EACS） | 施設、キャンパスのセキュリティ | Siemens SiPass、Nedap、Bosch AMS  
SCADA および産業用制御 | 工場、変電所、浄水場 | Windows または Linux 上で動作する SCADA、DCS、または HMI ソフトウェア  
航空管制（ATC） | 空港、管制塔 | 航空交通管制の管理およびレーダーシステム  
オペレーションコントロールセンター（OCC） | 地下鉄、鉄道、交通ハブ | 鉄道信号および駅管理  
海事 | 船舶、軍艦 | 航法、貨物、船上管理システム  
石油・ガス | オフショアプラットフォーム、遠隔リグ | プロセス制御および安全システム  
電気通信 | 5G アンテナサイト、MEC ノード | マルチアクセスエッジコンピューティング（MEC）サーバー  
医療 | 診療所、遠隔診断センター | 医用画像、患者データ、遠隔診断  
小売 | 店舗、支店、倉庫 | POS および在庫管理  
防衛 | 前方作戦基地、野戦部隊 | ミッションクリティカルなコマンド・通信システム  
  
## 監視とアラート {#monitoring-management-alerting}

機能 | 詳細  
---|---  
ウェブコンソール | ウェブアプリケーションまたはプログレッシブウェブアプリ（PWA）を介して、クラスターノードを構成、監視、管理します。  
モバイル通知 | モジュールの状態が変更されたときにブラウザの通知を受け取ります。  
タイムライン | モジュールのステータス変更とイベントを時系列で表示します。  
メール通知 | 内蔵のメールエージェントがアラートを送信します。  
コマンドラインインターフェース | コマンドラインインターフェースを使用して、スクリプトを作成し、タスクを自動化します。  
ログ管理 | 各モジュールとスクリプトには、それぞれ独自のログファイルがあります。サポートチームは、モジュールの <span class="notranslate farm-term" translate="no">snapshots</span> を使用して問題を調査します。  
監視ツールとの連携 | SafeKit は、主要なクラスターイベントを Windows イベントログまたは Linux Syslog に記録します。監視ツールはこれらのイベントを収集し、標準ルールでアラートをトリガーできます。これは、カスタム開発なしで Nagios、Zabbix、Splunk、および SIEM ツールで機能します。  
  
## セキュリティとコンプライアンス {#security-compliance}

機能 | 詳細  
---|---  
HTTPS | ウェブコンソールは、TLS 証明書を使用した HTTPS を使用します。  
ユーザー認証 | ローカルアカウント、LDAP、証明書（PKI）、OpenID Connect  
ユーザーロール | 管理、制御、監視のためのアクセスポリシーを構成します。  
暗号化 | TCP トラフィックは、レプリケーション、Web コンソール、および分散コマンドに TLS/SSL を使用します。UDP トラフィックは<span class="notranslate farm-term" translate="no">ハートビート</span>メッセージと内部 safeadmin プロトコルに SHA256 を使用した AES-128-CBC 暗号化を使用します。OpenSSL ライブラリが暗号化を提供します。Web サービスは Apache 上で実行されます。  
ウイルス対策 | このドキュメントには、ウイルス対策スキャンから除外するパスが記載されています。  
主権 | SafeKit は、Atos グループの一員である Eviden によってフランスで開発されています。お客様のデータとサーバーをオンプレミスに維持しながら、Windows および Linux アプリケーションを保護します。SafeKit は、事業継続と災害復旧に関する欧州 NIS2 指令の要件を満たすのに役立ちます。
  
## ライセンス {#licensing-model}

トピック | 詳細  
---|---  
ライセンスの種類 | 永久ライセンスは一度購入すると、ホスト名に紐付けられます。  
ライセンスの範囲 | サーバー（ノード）ごとに 1 ライセンス  
ライセンスの有効化 | ライセンスキーはインターネットに接続しなくても有効化できます。  
無料トライアル | 無料トライアルにはすべての機能が含まれています。  
1 ヶ月間の無料ライセンス | 概念実証のテストが可能  
  
## サポートとメンテナンス {#support-maintenance-slas}

### 有効なメンテナンス契約に基づく標準サポートおよびメンテナンス {#standard-support-maintenance-included-with-active-maintenance-contract}

サービス | 詳細  
---|---  
サポートポータルへのアクセス | ウェブポータルは、最大 4 名の技術担当者様が、年中無休でご利用いただけます。  
ライブサポートの受付時間 | 月曜日から金曜日、09:00 から 17:00 まで、欧州サポートセンターにて  
インシデントの承認 | 4 営業時間以内。営業時間とは、サポートセンターのライブサポート時間のことです。  
更新とアップグレード | すべてのサービスパック、アップデート、アップグレードは追加料金なしで含まれています。  
ライセンスキーの交換 | 有効なサポート契約がある場合、ホスト名が変更された際にライセンスキーを再割り当てできます。譲渡は、同じプロジェクト内のサーバーを置き換える場合に限定されます。からの Eviden による事前の承認が必要です。  
ナレッジベースへのアクセス | ナレッジベースの記事、よくある質問、オンラインドキュメントへのフルアクセス  
緊急時対応手順 | SafeKit は、SafeKit の高可用性機能を使用せずにアプリケーションを起動または停止するためのラッパースクリプトを提供します。このスクリプトは、アプリケーションの起動および停止スクリプトを呼び出します。また、必要に応じて仮想 IP アドレスを追加または削除します。  
サポートポータル | <https://customercare.evidian.com>  
  
### サポート契約なしで利用できる無料リソース {#free-resources-no-contract-required}

無料リソース | 詳細  
---|---  
サポート用 AI アシスタント | [SafeKit AI チャットは](</ja/resources/safekit-support/#ai-support>)safekit.eviden.com でご利用ください。   
オンライン研修と認定 | 合計約 4 時間の無料動画で、[ご自身のペースで学習できます](/ja/resources/safekit-on-line-training/)。トレーニングを修了すると、修了証が発行されます。  
ドキュメント | ユーザーガイド、リリースノート、ナレッジベース、クイックインストールガイド[はこちら](/ja/resources/safekit-free-trial/)  
  
## 他のソリューションとの比較 {#comparison-vs-alternatives}

基準 | SafeKit | Microsoft フェールオーバークラスター（WSFC） | VMware HA | オープンソース [1]  
---|---|---|---|---  
共有ストレージ（SAN/vSAN）が必要です | いいえ | はい | はい | いいえ  
Windows サポート | はい | はい | はい | いいえ  
Linux サポート | はい | いいえ | はい | はい  
リモートサイトへの展開 | 素晴らしい | 複雑 | 複雑 | 複雑  
OEM | はい | いいえ | いいえ | いいえ  
費用 | ノードごとの永久ライセンス | Windows Server と SAN | vSphere Enterprise と SAN | 高度な統合サービス  
セットアップの複雑さ | 低：インストールおよび設定する製品は 1 つ | 高：Active Directory、SAN、およびウィットネスの構成 | 高：vCenter および共有ストレージの構成 | 高：設定する製品が複数ある  
管理 | ウェブコンソールで管理される 1 つの製品 | 高：Active Directory と SAN に関する専門知識が必要 | 高：vCenter に依存します | 高：維持管理すべき個別の製品が複数ある  
  
**[1]** Linux では、同じ機能セットを提供するために、Corosync、Pacemaker、DRBD、Keepalived、STONITH、HAProxy の 6 つの個別のオープンソースプロジェクトが必要です。SafeKit は、Windows と Linux 両方でこれらの機能を 1 つの製品で提供します。

## 便利なリンク {#quick-reference-links}

リンク | URL  
---|---  
製品ホームページ | [https://safekit.eviden.com](/ja/)  
技術概要（テキストと図表を含む Word 文書） | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
無料トライアル | [https://safekit.eviden.com/resources/safekit-free-trial/](</ja/resources/safekit-free-trial/>)  
お見積もり | [https://safekit.eviden.com/safekit-pricing/](</ja/safekit-pricing/>)  
サポートポータル | <https://customercare.evidian.com>  
無料の AI サポート | [https://safekit.eviden.com/resources/safekit-support/](</ja/resources/safekit-support/>)  
無料のトレーニングと認定 | [https://safekit.eviden.com/resources/safekit-on-line-training/](</ja/resources/safekit-on-line-training/>)  
お問い合わせ | [https://safekit.eviden.com/contact-us-for-safekit/](</ja/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-ja  %}}