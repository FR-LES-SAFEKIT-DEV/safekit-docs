---
title: "SafeKit：SAN不要のWindows/Linux向け高可用性ソフトウェア"
canonical: "https://safekit.eviden.com/ja/"
description: "SafeKitは、WindowsとLinux向けのオールインワンSANレス高可用性ソフトウェアです。リアルタイム同期レプリケーション、自動フェイルオーバー、負荷分散をシンプルで費用対効果の高いパッケージで提供します。30日間の無料トライアルをお試しください。"
category: "home"
lang: "ja"
topics: "SafeKitの機能、保護レベルの選択、アプリケーション向けのすぐに使えるモジュール、導入事例、シンプルで分かりやすい価格、導入前に確認する制限事項、🔍 SafeKit高可用性ナビゲーションハブ"
---

# SafeKit：SAN不要のWindows/Linux向け高可用性ソフトウェア

SafeKitは2台の標準サーバーをSAN不要の高可用性クラスターに変え、アプリケーションの稼働を維持します。データをリアルタイムで複製し、1台目に障害が発生すると2台目でアプリケーションを再起動し、修復後のサーバーも自動的にクラスターへ復帰させます。共有ストレージやクラスターの専門知識がなくても、既存のサーバーにインストールできます。

レプリケーションは同期方式のため、サーバー障害時にもデータは失われず、アプリケーションは約1分以内に復旧します。ライセンスは永続ライセンスで、サーバー単位の価格です。

<a class="btn-download" href="/ja/resources/safekit-free-trial/">30日間の無料トライアルを開始 ›</a>

## SafeKitの機能 {#features}

SafeKitは4つの機能を1つの製品に統合し、WindowsとLinuxでWebコンソールまたはコマンドラインから管理できます。

| 機能 | 仕組み |
|---|---|
| **リアルタイムレプリケーション** | ファイルの変更を発生と同時に2台目のサーバーへコピーし、障害時のデータ損失を防ぎます。 |
| **自動フェイルオーバー** | SafeKitが障害を検知し、仮想IPアドレスを移動して、もう一方のサーバーでアプリケーションを再起動します。 |
| **自動フェイルバック** | 修復されたサーバーは、アプリケーションの稼働を維持したままバックグラウンドで再同期します。 |
| **負荷分散** | ネットワーク負荷分散はサーバー内で動作し、外部のロードバランサーやプロキシは不要です。 |

![WindowsとLinuxの2ノードMirrorクラスターを監視するSafeKit Webコンソール。PRIMとSECONDの各サーバーとデータレプリケーションの状態を表示](/wp-content/uploads/2026/05/mirror-monitoring-prim-second.png)

SAN、クォーラムディスク、Active Directory、OSやデータベースのEnterpriseエディションは必要ありません。

<a class="btn-download" href="/ja/architectures/">クラスターアーキテクチャを見る ›</a>

## 保護レベルを選択 {#protection-levels}

**アプリケーションHA**（`mirror.safe`、`farm.safe`、各アプリケーションモジュール）は、アプリケーションのデータだけを複製し、2台目のサーバーでアプリケーションを再起動します。再起動するサービス、リアルタイムで複製するフォルダー、切り替える仮想IPアドレスを把握しておく必要があります。物理サーバー、VMware・Hyper-V・KVMを含むあらゆるハイパーバイザー上の仮想マシン、クラウドで利用でき、最速の復旧を実現します。

**VM HA**（`hyperv.safe`、`kvm.safe`）は仮想マシン全体を複製してフェイルオーバーするため、アプリケーションの仕組みを把握する必要はありません。複数のVMに複数のアプリケーションが分散する環境に適しています。

<a class="btn-download" href="/ja/best-practises/vm-ha-vs-application-ha/">アプリケーションHAとVM HAを比較 ›</a>

## すぐに使えるアプリケーションモジュール {#modules}

事前設定済みモジュールは無料で、製品に含まれています。各モジュールは、対象アプリケーションの再起動対象サービスと複製対象フォルダーを定義します。

- **データベース：** SQL Server、PostgreSQL、Oracle、MySQL、MariaDB、Firebird
- **Web：** Apache、IIS、NGINX
- **VMとコンテナ：** Hyper-V、KVM、Docker、Podman、Kubernetes (k3s)
- **クラウド：** AWS、Azure、GCPなど
- **物理セキュリティと産業：** Milestone XProtect、Genetec、Nedap、Bosch、Hanwha、Siemens

<a class="btn-download" href="/ja/solutions/">すべてのソリューションとモジュールを見る ›</a>

## お客様のユースケース {#use-cases}

- **映像管理（VMS）：** サーバー障害時もライブ映像と録画映像を利用できます。Milestone、Genetec、Hanwhaで利用されています。
- **アクセス制御（EACS）：** 認証情報とアラームを常時利用可能にします。Hirsch Microsesame、Nedap AEOS、Siemens SiPassで利用されています。
- **SCADAと産業：** Probatのコーヒー焙煎機やALSTEFの手荷物仕分けシステムなど、生産ラインの制御を維持します。
- **ビル管理（BMS）：** 空調、セキュリティ、エネルギーシステムの稼働を維持します。Siemens Desigo CC、Bosch BISで利用されています。
- **航空交通管制（ATC）：** ADB SafeGateなどの滑走路側の重要アプリケーションへの接続を維持します。
- **地下鉄運行管理（OCC）：** パリの無人自動運転地下鉄路線の監視を維持します。
- **エッジ拠点：** データセンターがない場所でも、2台の標準サーバーでHAクラスターを構成します。
- **ソフトウェアベンダー（OEM）：** ソフトウェアのみのオプションとして高可用性を製品に追加できます。

<a class="btn-download" href="/ja/use-cases/">すべてのユースケースを見る ›</a>

## シンプルで分かりやすい価格 {#pricing}

SafeKitは永続ライセンスで販売され、必須のサブスクリプションはありません。価格はCPUコア数やソケット数ではなくサーバー台数だけで決まり、アプリケーションモジュールはすべて無料です。Windows、Linux、データベースの標準エディションで動作するため、Enterpriseエディションの費用もかかりません。

<a class="btn-download" href="/ja/safekit-pricing/">見積もりを依頼 ›</a>

## 導入前に制限事項を確認 {#limits}

SafeKitはシンプルさを重視しており、すべてのケースに適するわけではありません。複製データは数TBまで、ファイル数は1,000,000未満、VM HAでは最大32台のVM、同じLANまたはVLAN上の2ノードで低遅延（通常、往復5 ms未満）の環境に適しています。

大容量の場合は、共有ストレージや別の方式が適しています。

<a class="btn-download" href="/ja/product/#safekit-ha-limitations">制限事項の一覧を見る ›</a>

{{%  insert-safekit-hub-ja  %}}
