---
title: "SafeKit RFIおよびRFP文書に関する技術リファレンス"
canonical: "https://safekit.eviden.com/ja/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "SafeKitに関する技術情報を入手して、情報提供依頼書（RFI）や提案依頼書（RFP）を作成しましょう。サポート対象システム、アーキテクチャ、復旧時間、セキュリティ、ライセンス、サポートについて学びましょう。"
category: "resources"
lang: "ja"
topics: "概要, 目次, 製品情報, サポートされているオペレーティングシステムとプラットフォーム, SafeKit 高可用性の制限事項, 事前設定済みのアプリケーションモジュール, アーキテクチャと展開, データ損失と復旧時間（RPOとRTO）, 遠隔地サイトと分散展開, 監視、管理、およびアラート, セキュリティとコンプライアンス, ライセンス, サポートとメンテナンス, 他のソリューションとの比較, 役立つリンク"
---

# SafeKit RFIおよびRFP文書に関する技術リファレンス {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## 概要 {#overview}

このページは、情報提供依頼書（RFI）または提案依頼書（RFP）を作成する際に役立ちます。SafeKit SafeKit高可用性ソフトウェアに関する一般的な技術的な質問への回答が掲載されています。この情報は、調達チームやソリューションアーキテクトが要件を明確にするのに役立ちます。

## 目次 {#table-of-contents}

  1. [製品情報](#product-identity)
  2. [サポートされているオペレーティングシステムとプラットフォーム](#supported-operating-systems-platforms)
  3. [SafeKit 高可用性の制限事項](#safekit-ha-limitations)
  4. [事前設定済みのアプリケーションモジュール](#pre-built-application-modules)
  5. [アーキテクチャと展開](#architecture-deployment-model)
  6. [データ損失と復旧時間（RPOとRTO）](#rpo-rto-capabilities)
  7. [遠隔地サイトと分散展開](#edge-distributed-deployment-suitability)
  8. [監視、管理、およびアラート](#monitoring-management-alerting)
  9. [セキュリティとコンプライアンス](#security-compliance)
  10. [ライセンス](#licensing-model)
  11. [サポートとメンテナンス](#support-maintenance-slas)
  12. [他のソリューションとの比較](#comparison-vs-alternatives)
  13. [役立つリンク](#quick-reference-links)


## 製品情報 {#product-identity}

分野 | 答え  
---|---  
製品名 | SafeKit  
ベンダー | アトス・グループ傘下のエビデン。旧社名はエビディアン。  
ソフトウェア開発 | フランスで開発されました。
製品カテゴリ | アプリケーションクラスタリング、高可用性、および災害復旧のためのソフトウェア  
現在のバージョン | SafeKit 8.2  
Webサイト | [https://safekit.eviden.com/ja/](</ja/>)  
初回リリース | 2000年。20年以上にわたり生産現場で使用されている。  
  
## サポートされているオペレーティングシステムとプラットフォーム {#supported-operating-systems-platforms}

Windowsオペレーティングシステム | Linuxオペレーティングシステム | インフラストラクチャと仮想化 | クラウドプラットフォーム  
---|---|---|---  
• Windows Server 2025 (x86-64)<br> • Windows Server 2022 (x86-64)<br> • Windows Server 2019 (x86-64)<br> • Windows 11 Enterprise (x86-64)<br> • Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 10 (x86-64)<br> • Red Hat Enterprise Linux 10 (AArch64)<br> • Red Hat Enterprise Linux 9 (x86-64)<br> • Red Hat Enterprise Linux 9 (AArch64)<br> • Red Hat Enterprise Linux 8 (x86-64)<br> • Ubuntu 24.04 LTS (x86-64)  |  • あらゆるブランドのエッジサーバー<br>• VMware<br> • Microsoft Hyper-V [1]<br> • Linux KVM [1]<br> • 任意のハイパーバイザー<br>• Dockerコンテナ<br>・ポッドマンコンテナ  |  • Amazon Web Services (AWS) [2]<br> • Microsoft Azure [2]<br> • Google Cloud Platform (GCP) [2]<br> • 標準VMインスタンスを備えたあらゆるIaaSクラウド   
  
**[1]** SafeKit 、個々のアプリケーションまたは仮想マシン全体に対して高可用性を提供します。

**[2]**クラウドでは、クラウドロードバランサーに仮想IPアドレスを設定します。

{{%  insert-safekit-usage-ja  %}}

## 事前設定済みのアプリケーションモジュール {#pre-built-application-modules}

SafeKitは、すぐに使える`.safe`モジュールが含まれています。アプリケーションを保護する方法は2つあります。**アプリケーションの高可用性で**は、 mirrorモジュールまたは<span class="notranslate farm-term" translate="no">farm</span>モジュールを使用してアプリケーションを直接保護します。**仮想マシンの高可用性では**、 hyperv.safeモジュールまたはkvm.safeモジュールを使用して仮想マシン全体を保護します。

比較基準 | アプリケーションの高可用性 | 仮想マシンの高可用性  
---|---|---  
構成 | 再起動するアプリケーションサービスとレプリケートするフォルダーを把握しておく必要があります。また、フェイルオーバーに使用する仮想IPアドレスも設定する必要があります。 | 仮想マシンファイルの場所を指定するだけで済みます。仮想マシン内のアプリケーションの動作方法を知る必要はありません。この方法により、アプリケーションとオペレーティングシステムの両方が保護されます。  
推奨される使用方法 | 特定のハードウェアやハイパーバイザーに依存することなく、ソフトウェアソリューションに直接高可用性機能を追加します。 | 複数の仮想マシンにまたがる複数のアプリケーションを、単一の高可用性ポリシーで管理します。  
  
以下の表は、利用可能なすべての`.safe`モジュールの一覧です。

アプリケーションの高可用性 | 仮想マシンの高可用性  
---|---  
新しいWindowsアプリ — mirror.safe | Hyper-V VM — hyperv.safe (Windows)  
新しいLinuxアプリ — mirror.safe | KVM VM — kvm.safe (Linux)  
Windows ロードバランシング — farm.safe | Dockerコンテナ — mirror.safe (Linux)  
Linuxロードバランシング — farm.safe | Podmanコンテナ — mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | Kubernetes / K3s — k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows & Linux) | Bosch AMS — hyperv.safe (Windows)  
MySQL — mysql.safe (Windows & Linux) | Bosch BIS — hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows & Linux) | Bosch BVMS — hyperv.safe (Windows)  
Oracle — oracle.safe (WindowsおよびLinux) | Hanwha Vision — hyperv.safe (Windows)  
Firebird — firebird.safe (Windows & Linux) | Hanwha Wisenet — hyperv.safe (Windows)  
Apache — apache_farm.safe (Windows および Linux) | シーメンス監視スイート — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | Siemens Desigo CC — hyperv.safe (Windows)  
NGINX — farm.safe (Windows & Linux) | Siemens SiPass — hyperv.safe (Windows)  
Milestone XProtect — milestone.safe (Windows) | シーメンス SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
Genetec (SQL Server) — sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
Siemens Siveillance VMS — SiveillanceVMS.safe (Windows) |   
クラウド（AWS、Azure、GCP、汎用）— mirror.safe / farm.safe |   
  
## アーキテクチャと展開 {#architecture-deployment-model}

### 2つのクラスタモジュール： mirror.safeとfarm.safe {#two-cluster-modules}

モジュール | 仕組み | 代表的な用途  
---|---|---  
mirror.safe | 1台のサーバーが稼働中で、もう1台はスタンバイ状態です。ファイルはバイト単位で同期的に複製されます。フェイルオーバーは自動的に行われます。 | 一度に1台のサーバーでのみ実行されるデータベース、状態を保存するアプリケーション、およびサービス  
farm.safe | 複数のサーバーが同時に稼働しています。SafeKit SafeKitそれらのサーバー間でネットワークトラフィックを分散し、フェイルオーバーを自動的に処理します。 | Webサーバー、ステートレスマイクロサービス、APIゲートウェイ、および複数のサーバーで同時に実行されるサービス  
  
### クラスターインフラストラクチャ {#cluster-infrastructure-architecture}

要件 | SafeKit機能  
---|---  
共有ストレージが必要ですか？ | いいえ。SafeKit SafeKitローカルディスクを使用します。SANや共有ストレージは必要ありません。  
Active Directoryが必要ですか？ | いいえ。SafeKit SafeKit WindowsドメインやActive Directoryを必要としません。ワークグループにも対応しています。  
クラスターサイズ | 2ノード（ mirror ）または2ノード以上（ <span class="notranslate farm-term" translate="no">farm</span> ）  
仮想IPアドレス（VIP） | アプリケーションの高可用性を実現するため、仮想IPアドレスはGratuitous ARPによってアクティブノードに自動的に移動します。仮想マシンの高可用性を実現するため、仮想マシン内のIPアドレスへのトラフィックは自動的にリダイレクトされます。個別の仮想IPアドレスは必要ありません。ノードはLANまたはサイト間で拡張されたVLANを共有する必要があります。  
3つのノードを持つアーキテクチャ | SafeKit 、LANまたはサイト間を拡張したVLAN上で2ノードのmirrorクラスタを実行します。同期レプリケーションにより、データ損失ゼロ（RPO=0）と自動フェイルオーバーを実現します。別途提供されるバックアップ製品は、WAN経由でデータを非同期的に3番目のノードに複製します。このバックアップにより、過去の時点への復旧が可能になり、ランサムウェア攻撃からの保護も提供されます。  
高可用性の目的 | SafeKitデータを両方のノードに同期的に複製します。これにより、ハードウェアまたはソフトウェア障害発生後もデータ損失なく自動フェイルオーバーが可能になります。ただし、論理エラー、データ破損、および誤削除もスタンバイノードに即座にコピーされます。  
バックアップの目的 | バックアップを使用すると、以前の時点のデータを復元できます。SafeKit SafeKitは別のバックアップ製品が、非同期レプリケーションによってこの機能を提供します。バックアップは、ランサムウェアや人為的ミスからの復旧に役立ちます。ただし、この復旧は自動フェイルオーバーではありません。古いバックアップを復元すると、そのバックアップ以降に加えられた変更は失われます。  
同時に実行できるモジュールの最大数 | 2ノードクラスタでは、最大32個のモジュールを同時に管理できます。仮想マシンの保護のため、各モジュールは異なる仮想マシンを複製して再起動します。各モジュールはどちらのノードでもプライマリとして動作できるため、両方のサーバーでワークロードを共有できます。データの総量は、フェイルオーバー後またはノードの再起動後の再同期時間に影響します。  
各ノードに必要なソフトウェアは？ | はい。各ノードに軽量ソフトウェアがインストールされています。  
サポートされているアプリケーション | SafeKit 、あらゆるWindowsサービスまたはLinuxデーモンを保護できます。30種類以上のアプリケーションに対応した事前設定済みモジュールが用意されています。  
  
### 複製とデータ保護 {#replication-data-protection}

要件 | SafeKit機能  
---|---  
複製方法 | SafeKitファイルの変更をバイト単位で複製します。ディスクブロック単位の変更は複製しません。  
レプリケーションモード | 同期レプリケーション、データ損失ゼロ  
ネットワーク要件 | 同期レプリケーションの場合、ノード間の往復遅延は5ミリ秒未満にすることを推奨します。  
推奨データ量 | 再同期時間を管理可能な範囲に保つため、数テラバイト程度。  
推奨ファイル数 | ファイル数を100万未満に抑え、再同期時間を管理可能な範囲に抑える。  
1TBのデータを再同期するのにかかる時間 | 1Gb/sネットワークで約3時間、10Gb/sネットワークで約1時間  
選択的複製 | 複製するディレクトリとファイルを選択できます。  
転送中の暗号化 | レプリケーション通信はTLS/SSLで暗号化されます。  
  
## データ損失と復旧時間（RPOとRTO） {#rpo-rto-capabilities}

### 各クラスタータイプのRPOとRTO {#rto-rpo-cluster-type}

メトリック | Mirror ( mirror.safe ) | <span class="notranslate farm-term" translate="no">Farm</span> ( farm.safe )  
---|---|---  
RPO（リカバリーポイント目標） | データ損失ゼロ。書き込みは、両方のノードが承認した後にのみ確認されます。 | ステートレスサービスには適用されません。データは別のmirrorクラスタによって管理されます。  
RTO（復旧目標時間） | 約1分です。これには、 <span class="notranslate farm-term" translate="no">heartbeat</span>タイムアウト（デフォルトでは30秒）とアプリケーションの再起動にかかる時間が含まれます。 | 数秒後。トラフィックは残りのアクティブなノードに再分配されます。  
レプリケーションの種類 | 同期型、リアルタイム、バイトレベルのファイル複製 | 適用できない  
フェイルオーバートリガー | <span class="notranslate farm-term" translate="no">heartbeats</span>が停止した場合、プロセスがクラッシュした場合、またはチェッカーが障害を検出した場合に自動的に実行されます。 | <span class="notranslate farm-term" translate="no">heartbeats</span>が停止した場合、プロセスがクラッシュした場合、またはチェッカーが障害を検出した場合に自動的に実行されます。  
手動による介入が必要ですか？ | いいえ。フェイルオーバーとフェイルバックは自動的に行われます。 | いいえ。フェイルオーバーとフェイルバックは自動的に行われます。  
  
### mirrorクラスタで保護されているアプリケーションの復旧時間 {#rto-breakdown-mirror-application-level-ha}

故障の種類 | 回復時間の計算方法  
---|---  
ハードウェア障害 | <span class="notranslate farm-term" translate="no">Heartbeat</span>タイムアウト（デフォルトでは30秒）後、アプリケーションが再起動されます。  
ソフトウェアまたはプロセスのクラッシュ | アプリケーションを停止し、その後アプリケーションを再起動する時間  
オペレーティングシステムがクラッシュしました | <span class="notranslate farm-term" translate="no">Heartbeat</span>タイムアウトが発生しました。オペレーティングシステムは既にスタンバイサーバー上で稼働しているため、再起動する必要はありません。  
  
### mirrorクラスタで保護された仮想マシンの復旧時間 {#rto-breakdown-mirror-vm-level-ha}

故障の種類 | 回復時間の計算方法  
---|---  
いかなる失敗も | 障害を検出し、仮想マシンのオペレーティングシステムを再起動し、アプリケーションを再起動するまでに時間がかかります。通常、これには数分かかります。  
  
## 遠隔地サイトと分散展開 {#edge-distributed-deployment-suitability}

SafeKit 、遠隔地、支店、および複数の拠点を持つ組織向けに設計されています。

遠隔地での要件 | SafeKit機能  
---|---  
常駐のITスタッフはいません | フェイルオーバーは自動的に行われ、手動操作は不要です。  
SANまたはNASなし | SafeKitローカルディスクを使用するため、共有ストレージは必要ありません。  
リモート管理 | ウェブコンソールを通じてクラスターを管理します。  
限定的なハードウェア | 標準的なサーバーまたは仮想マシンが2台あれば十分です。特別なハードウェアは必要ありません。  
ファイアウォールとネットワークアドレス変換（NAT） | ポートは設定可能です。ウェブコンソールはHTTPSを使用します。  
サイト間災害復旧 | mirrorクラスタは、2つのサイト間に拡張されたVLANを介して接続できます。  
ソフトウェアパブリッシャーによる統合 | ソフトウェア開発会社は、 SafeKit自社製品に組み込むことができます。インストールはユーザーの操作なしで実行でき、スクリプトを使用して自動化することも可能です。  
多くの場所に数百のクラスターが存在する | SafeKit 、多数の支店を持つ組織向けに設計されています。  
  
以下のサイトは、データセンターを持たない場合でも、高い可用性を必要とします。

業界 | 典型的な場所 | 重要なアプリケーション  
---|---|---  
物理的なセキュリティと監視 | 建物、キャンパス、空港 | VMS — マイルストーン、ジェネテック、ハンファ、シーメンス・シベイランス  
ビル管理システム（BMS） | オフィスビル、病院、工場 | シーメンス デシゴ CC、ボッシュ BIS/BVMS  
電子アクセス制御（EACS） | 安全な施設、キャンパス | Siemens SiPass、Nedap、Bosch AMS  
SCADAおよび産業制御 | 工場、変電所、浄水場 | WindowsまたはLinux上で動作するSCADA、DCS、またはHMIソフトウェア  
航空交通管制（ATC） | 空港、管制塔 | 航空交通管制管理およびレーダーシステム  
運用管理センター（OCC） | 地下鉄、鉄道、交通拠点 | 鉄道信号と駅管理  
海事 | 船舶、軍艦 | 航行、貨物、および船上管理システム  
石油・ガス | 洋上プラットフォーム、遠隔掘削装置 | プロセス制御および安全システム  
電気通信 | 5Gアンテナサイト、MECノード | マルチアクセスエッジコンピューティング（MEC）サーバー  
健康管理 | 診療所、遠隔診断センター | 医用画像処理、患者データ、遠隔診断  
小売り | 店舗、支店、倉庫 | 販売時点情報管理（POS）と在庫管理  
防衛 | 前線作戦基地、野戦部隊 | 任務遂行に不可欠な指揮・通信システム  
  
## 監視、管理、およびアラート {#monitoring-management-alerting}

能力 | 詳細  
---|---  
ウェブコンソール | ウェブアプリケーションまたはプログレッシブウェブアプリ（PWA）を通じて、クラスタノードの設定、監視、管理を行います。  
モバイル通知 | モジュールの状態が変化した際に、ブラウザ通知を受け取ります。  
タイムライン | モジュールのステータス変更とイベントを時系列順に表示します。  
メール通知 | 内蔵のメールエージェントがアラートを送信します。  
コマンドラインインターフェース | コマンドラインインターフェースを使用してスクリプトを作成し、タスクを自動化します。  
ログ管理 | 各モジュールとスクリプトにはそれぞれ独自のログファイルがあります。モジュールの<span class="notranslate farm-term" translate="no">snapshots</span> 、サポートチームが問題を調査する際に役立ちます。  
監視ツールとの統合 | SafeKit 、主要なクラスタイベントをWindowsイベントログまたはLinux Syslogに記録します。監視ツールはこれらのイベントを収集し、標準ルールに基づいてアラートをトリガーできます。これは、Nagios、Zabbix、Splunk、およびSIEMツールと連携し、カスタム開発は不要です。  
  
## セキュリティとコンプライアンス {#security-compliance}

特徴 | 詳細  
---|---  
HTTPS | TLS証明書は、ウェブコンソールへのアクセスを保護します。  
ユーザー認証 | ローカルアカウント、LDAP、証明書（PKI）、およびOpenID Connect  
ユーザーロール | 管理、制御、監視のためのアクセス ポリシーを設定します。  
暗号化 | TCPトラフィックは、レプリケーション、Webコンソール、および分散コマンドにTLS/SSLを使用します。UDPトラフィックは、 <span class="notranslate farm-term" translate="no">heartbeats</span>と内部safeadminプロトコルにAES-128-CBC暗号化とSHA256を使用します。SafeKit SafeKit 、暗号化にOpenSSLライブラリを、WebサービスにApacheを使用します。  
ウイルス対策 | ドキュメントには、ウイルス対策スキャンから除外すべきパスが記載されています。  
主権 | SafeKit 、Atosグループ傘下のEviden社がフランスで開発しました。WindowsおよびLinuxアプリケーションを保護しながら、データとサーバーをお客様の施設内に保持します。この高可用性ソフトウェアは、米国のベンダーに依存していません。SafeKit SafeKit 、事業継続と災害復旧に関するNIS2の要件を満たすのに役立ちます。
  
## ライセンス {#licensing-model}

側面 | 詳細  
---|---  
ライセンスの種類 | 永久ライセンスは一度購入すれば、ホスト名に紐付けられます。  
ライセンス範囲 | サーバー（ノード）ごとに1ライセンス  
ライセンス認証 | ライセンスキーはインターネット接続なしでアクティベートできます。  
無料トライアル | 無料トライアルではすべての機能をご利用いただけます。  
1ヶ月間の無料ライセンス | 概念実証テストに利用可能です  
  
## サポートとメンテナンス {#support-maintenance-slas}

### 有効な保守契約に基づく標準サポートおよび保守 {#standard-support-maintenance-included-with-active-maintenance-contract}

サービス | 詳細  
---|---  
サポートポータルへのアクセス | このウェブポータルは、年間を通して24時間365日、最大4名の技術担当者が利用可能です。  
ライブサポート時間 | 月曜日から金曜日、午前9時から午後5時まで、欧州サポートセンターにて。  
インシデントの確認 | サポートセンターから4営業時間以内  
アップデートとアップグレード | すべてのサービスパック、アップデート、アップグレードは追加料金なしで含まれています。  
ライセンスキーの交換 | 有効なサポート契約がある場合、ホスト名の変更時にライセンスキーを再割り当てできます。ただし、同一プロジェクト内でのサーバーの交換に限ります。Evidenからの事前の書面による承認が必要です。  
知識ベースへのアクセス | ナレッジベースの記事、よくある質問、オンラインドキュメントへのフルアクセス  
緊急時の手順 | SafeKit 、 SafeKitの高可用性機能を使用せずにアプリケーションを起動または停止するためのラッパースクリプトを提供します。このスクリプトは、アプリケーションの起動スクリプトと停止スクリプトを呼び出します。また、必要に応じて仮想IPアドレスを追加または削除します。  
サポートポータル | <https://customercare.evidian.com>  
  
### サポート契約なしで利用できる無料リソース {#free-resources-no-contract-required}

リソース | 詳細  
---|---  
AIサポートアシスタント | safekit.eviden.comで[SafeKit AIチャットを](</ja/resources/safekit-support/#ai-support>)ご利用ください。   
オンライン研修と資格認定 | 合計約4時間の無料動画で、[自分のペースで学習できます](</ja/resources/safekit-on-line-training/>)。トレーニングを修了すると修了証が授与されます。  
文書 | ユーザーガイド、リリースノート、ナレッジベース、クイックインストールガイド[はこちら](</ja/resources/safekit-free-trial/>)  
  
## 他のソリューションとの比較 {#comparison-vs-alternatives}

基準 | SafeKit | Microsoft フェールオーバー クラスター (WSFC) | VMware HA | オープンソース[1]  
---|---|---|---|---  
共有ストレージ（SAN/vSAN）が必要 | いいえ | はい | はい | いいえ  
Windowsのサポート | はい | はい | はい | いいえ  
Linuxサポート | はい | いいえ | はい | はい  
遠隔地への展開 | 素晴らしい | 複雑な | 複雑な | 複雑な  
OEM | はい | いいえ | いいえ | いいえ  
料金 | ノードごとの永久ライセンス | Windows ServerとSAN | vSphere EnterpriseとSAN | 高度な統合サービス  
セットアップの複雑さ | 設定してすぐに使用できます | 高：Active Directory、SAN、およびwitness構成 | 高：vCenterと共有ストレージの構成 | 高：設定する複数の別々の製品  
管理 | ウェブコンソールを通じて管理される製品が1つあります。 | 高レベル：Active DirectoryおよびSANに関する専門知識 | 高：vCenterへの依存度 | 高：維持管理が必要な複数の別製品  
  
**[1]** Linuxでは、同じ機能セットを提供するために、Corosync、Pacemaker、DRBD、Keepalived、STONITH、HAProxyという6つの独立したオープンソースプロジェクトが必要です。SafeKit SafeKit 、WindowsとLinuxの両方でこれらの機能を1つの製品で提供します。

## 役立つリンク {#quick-reference-links}

リソース | URL  
---|---  
製品ホームページ | [https://safekit.eviden.com/ja/](</ja/>)  
技術概要（テキストと図を含むWord文書） | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
無料トライアル | [https://safekit.eviden.com/ja/resources/safekit-free-trial/](</ja/resources/safekit-free-trial/>)  
見積もりを取得する | [https://safekit.eviden.com/ja/safekit-pricing/](</ja/safekit-pricing/>)  
サポートポータル | <https://customercare.evidian.com>  
無料AIサポート | [https://safekit.eviden.com/ja/resources/safekit-support/](</ja/resources/safekit-support/>)  
無料のトレーニングと認定 | [https://safekit.eviden.com/ja/resources/safekit-on-line-training/](</ja/resources/safekit-on-line-training/>)  
お問い合わせ | [https://safekit.eviden.com/ja/contact-us-for-safekit/](</ja/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-ja  %}}
