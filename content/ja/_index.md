---
title: "SafeKit: SAN 不要の Windows および Linux 向け高可用性ソフトウェア"
canonical: "https://safekit.eviden.com/ja/"
description: "SafeKit は、Windows および Linux 向けのオールインワン SAN レス HA ソフトウェアです。リアルタイムの同期レプリケーション、自動フェイルオーバー、ロードバランシングを、シンプルで費用対効果の高い 1 つのパッケージで実現します。30 日間の無料トライアルを開始してください。"
category: "home"
lang: "ja"
topics: "SafeKit の機能、保護レベルの選択、アプリケーション向けの既製モジュール、顧客のユースケース、シンプルで予測可能な価格設定、開始前に制限事項を把握、SafeKit ビデオライブラリ、🔍 SafeKit 高可用性ナビゲーションハブ"
translation: "translate_md 2026-11-05.8 | glossaire 2026-11-05.12 | Translation LLM | 21 expressions"
---

# SafeKit: SAN 不要の Windows および Linux 向け高可用性ソフトウェア {#safekit-high-availability-software-for-windows-and-linux-without-a-san}

SafeKit は、2 台の標準サーバーを SAN レスの HA クラスターに変え、アプリケーションを継続的に稼働させます。データをリアルタイムで複製し、1 台目のサーバーに障害が発生した場合は 2 台目のサーバーでアプリケーションを再起動し、障害が発生したサーバーが修復されると自動的に再統合します。共有ストレージやクラスターに関する専門知識は不要で、既存のサーバーにインストールできます。

レプリケーションは同期式であるため、サーバーに障害が発生してもデータが失われることはなく、アプリケーションは約 1 分以内に復旧します。ライセンスは永久的で、サーバーごとに価格が設定されています。

<a class="btn-download" href="/ja/resources/safekit-free-trial/">30 日間の無料トライアルを開始 ›</a>


## SafeKit の機能 {#features}

SafeKit は、Windows と Linux 上で、単一の Web コンソールまたは単一のコマンドラインから管理できる 4 つの機能を 1 つの製品に統合しています。

| 機能 | 仕組み |
|---|---|
| **リアルタイムレプリケーション** | ファイルに加えられた変更はすべて、その都度 2 台目のサーバーにコピーされるため、障害が発生してもデータが失われることはありません。 |
| **自動フェイルオーバー** | SafeKit は障害を検出し、仮想 IP アドレスを移動させ、もう一方のサーバーでアプリケーションを再起動します。 |
| **自動フェイルバック** | 修復されたサーバーは、アプリケーションが実行され続けている間にバックグラウンドで再同期します。 |
| **負荷分散** | ネットワーク負荷分散は、外部のロードバランサーやプロキシを使用せずに、サーバー内で実行されます。 |

![Windows および Linux 用の 2 ノード mirror クラスターを監視する SafeKit ウェブコンソール。PRIM PRIM と SECOND サーバー、およびアクティブなデータレプリケーションを備えています。](/wp-content/uploads/2026/05/mirror-monitoring-prim-second.png)

SAN、クォーラムディスク、Active Directory、またはオペレーティングシステムやデータベースのエンタープライズエディションは必要ありません。

<a class="btn-download" href="/ja/architectures/">クラスターアーキテクチャを探索する ›</a>


## 保護レベルを選択してください {#protection-levels}

**アプリケーション HA**（`mirror.safe`、`farm.safe`、およびアプリケーションモジュール）は、アプリケーションデータを複製し、2 番目のサーバーでアプリケーションを再起動するだけです。どのサービスを再起動するか、どのフォルダをリアルタイムで複製するか、どの仮想 IP アドレスにフェイルオーバーするかを把握する必要があります。物理サーバー、VMware、Hyper-V、KVM を含むすべてのハイパーバイザー上の仮想マシン、およびクラウドで動作し、最速のリカバリを提供します。

**VM HA**(`hyperv.safe`、`kvm.safe`) は、仮想マシン全体を複製してフェイルオーバーするため、アプリケーションの動作を把握する必要はありません。複数の VM にまたがる複数のアプリケーションがある環境に適しています。

<a class="btn-download" href="/ja/best-practises/vm-ha-vs-application-ha/">アプリケーション HA と VM HA の比較 ›</a>


## アプリケーション用既製モジュール {#modules}

事前設定されたモジュールは無料で、製品に含まれています。各モジュールは、特定のアプリケーションに対して、どのサービスを再起動し、どのフォルダを複製するかを定義します。

- **データベース:** SQL Server、PostgreSQL、Oracle、MySQL、MariaDB、Firebird
- **Web:** Apache、IIS、NGINX
- **VM とコンテナ：** Hyper-V、KVM、Docker、Podman、Kubernetes (k3s)
- **クラウド：** AWS、Azure、GCP、その他
- **物理的セキュリティおよび業界：** Milestone XProtect、Genetec、Nedap、Bosch、Hanwha、Siemens

<a class="btn-download" href="/ja/solutions/">すべてのソリューションとモジュールを閲覧 ›</a>


## 顧客のユースケース {#use-cases}

- **ビデオ管理システム（VMS）：** サーバー障害時にもライブ映像と録画映像を利用可能に保ちます。Milestone、Genetec、Hanwha と併用します。
- **アクセス制御（EACS）：** 認証情報とアラームを常に利用可能に保ちます。Hirsch Microsesame、Nedap AEOS、Siemens SiPass で使用されます。
- **SCADA と産業：** Probat 社のコーヒー焙煎機や ALSTEF 社の手荷物仕分け機など、生産ラインのオペレーターによる制御を可能にします。
- **ビル管理システム（BMS）：** HVAC、安全、エネルギーシステムを稼働させます。Siemens Desigo CC および Bosch BIS で使用されます。
- **航空交通管制（ATC）：** 管制官を、ADB SafeGate などの重要なエアサイドアプリケーションに接続します。
- **メトロ運行管理センター（OCC）：** 自動運転のパリ地下鉄路線の監視を可能にする。
- **エッジサイト：** データセンターがない環境で、2 台の標準サーバーを HA クラスターに変換します。
- **ソフトウェア発行元（OEM）：** ソフトウェアのみのオプションとして、カタログに高可用性を追加します。

<a class="btn-download" href="/ja/use-cases/">すべてのユースケースを見る ›</a>


## シンプルで分かりやすい料金体系 {#pricing}

SafeKit は永久ライセンスで販売されているため、必須のサブスクリプションはありません。価格はサーバーの数にのみ依存し、CPU コア数やソケット数には依存しません。また、すべてのアプリケーションモジュールは無料で、Windows、Linux、およびお使いのデータベースの標準エディションで動作するため、エンタープライズエディションの費用を支払う必要はありません。

<a class="btn-download" href="/ja/safekit-pricing/">見積もりを依頼する ›</a>


## 始める前に限界を知っておこう {#limits}

SafeKit は、あらゆるケースに対応するためではなく、シンプルさを追求して構築されています。数テラバイトまでのレプリケートデータ、100 万件未満のファイル、VM HA を使用する場合の最大 32 台の VM、および低遅延（通常は往復 5 ミリ秒未満）の同一 LAN または VLAN 上の 2 ノードに適しています。

より大容量の場合は、共有ストレージまたは別の方法がより良い選択肢となります。

<a class="btn-download" href="/ja/product/#safekit-ha-limitations">制限事項の全リストを見る ›</a>


{{%  insert-safekit-videos-table-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}
