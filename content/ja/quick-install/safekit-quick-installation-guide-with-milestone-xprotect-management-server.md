---
title: "SafeKit による Milestone XProtect の高可用性: フェイルオーバー用 milestone.safe モジュールのインストール"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server/"
description: "SafeKit の milestone.safe モジュールを展開して、Windows 上の Milestone XProtect の同期リアルタイムレプリケーションと自動フェイルオーバーを実現します。このガイドでは、共有ストレージを使わずに重要なアプリケーション向けの 2 ノード SANless クラスターを設定する方法を説明します。"
category: "quick-install"
lang: "ja"
topics: "Milestone XProtect 高可用性クイックインストールガイド、SafeKit 高可用性の制限事項、SafeKit / Milestone XProtect ソリューションの概要、Windows への SafeKit / Milestone XProtect ソリューションのインストール (milestone.safe)、SafeKit / Milestone XProtect ソリューションのステップごとの設定、SafeKit mirror ソリューションのデモ、🔍 SafeKit 高可用性ナビゲーションハブ"
---

# SafeKit による Milestone XProtect の高可用性: フェイルオーバー用 milestone.safe モジュールのインストール {#milestone-xprotect-high-availability-with-safekit-install-the-milestonesafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="Milestone XProtect" mod="milestone"  %}}


## SafeKit / Milestone XProtect ソリューションの概要 {#overview-of-the-safekit--milestone-xprotect-solution}

ソリューションの説明はこちらです: **💡[最もシンプルな Milestone XProtect 高可用性: 2 ノード同期レプリケーションとフェイルオーバー](</ja/solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/>)**。

## Windows への SafeKit / Milestone XProtect ソリューションのインストール (milestone.safe) {#installation-of-the-safekit--milestone-xprotect-solution-on-windows-milestonesafe}

### 前提条件 {#prerequisites}

  * 2 つのノード (仮想マシンまたは物理サーバー) に Milestone XProtect Management と SQL をインストールする必要があります。SQL Server と Event Server は外部に配置することもできます。以下の注記を参照してください。


ℹ️ 注: SQL Server は外部に配置できます。その場合、milestone.safe のステップごとの設定の手順 4 で次の操作を行います。

  * SQL Data フォルダーと Log フォルダーのレプリケーションを削除します。
  * sqlservr.exe のプロセスチェッカーを削除します。
  * SERVICES マクロから MSSQLServer を削除します。


外部 SQL Server の冗長化には、**💡[SafeKit と sqlserver.safe モジュール](</ja/solutions/sql-server-high-availability-synchronous-replication-failover/>)**を使用できます。

この場合、両方の Management ノードで、sqlserver.safe モジュールの仮想 IP アドレスを使用して [Milestone Management から SQL への接続](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>)を設定します (レジストリキー HKEY_LOCAL_MACHINE > SOFTWARE > VideoOSServerConnectionString)。

ℹ️ 注: Event Server は Management Server の外部に配置できます。

この場合、Management クラスター用と Event クラスター用に、milestone.safe をそれぞれインストールした 2 つのクラスターを構成します。

Management クラスターでは、milestone.safe のステップごとの設定の手順 4 で次の操作を行います。

  * SERVICES マクロから MilestoneEventServerService を削除します。


Event クラスターでは、milestone.safe のステップごとの設定の手順 4 で次の操作を行います。

  * SERVICES マクロから MSSQLServer、Milestone XProtect Management Server、Milestone XProtect Log Server を削除します。
  * SQL Data フォルダーと Log フォルダーのレプリケーションを削除します。
  * sqlservr.exe のプロセスチェッカーを削除します。
  * ステップごとの設定中に、**Management クラスター**の仮想 IP アドレスを使用して Event Server を[登録](</wp-content/uploads/2022/07/milestone-management-server-register-2020.png>)します (または Download Manager から Event Server をインストールし、インストール時に **Management クラスター**の仮想 IP アドレスを設定します)。
  * Milestone management client で、[Registered Services](</wp-content/uploads/2022/07/milestone-url-vip.png>) の Event Server に **Event クラスター**の仮想 IP アドレスを設定します。


### ℹ️ Recorder の冗長化 {#ℹ-recorder-redundancy}

  * データ量が多いため、Recorder のレプリケーションは SafeKit に適していません。
  * Milestone に統合されたソリューション (リアルタイムレプリケーションを行わないフェイルオーバー録画サーバー) を使用できます。
  * 2 台の Recorder をアクティブ/アクティブ構成で実行し、障害時に同じエリアのカメラがすべて失われないようにカメラを分散することもできます。
  * 各カメラのストリームを [Vega / RMF](<https://vega25.com/>) ソリューションで 2 台の Recorder に送信することもできます。


ℹ️ SafeKit クラスターで Milestone をバージョン N から N+1 に移行する場合は、この記事をお読みください: 🛠️ [SafeKit を使用した Milestone Management の移行](</ja/quick-install/safekit-quick-installation-guide-milestone-migration/>)


{{%  insert-safekit-installation-package-windows-ja app="Milestone XProtect and SQL" mod="milestone"  %}}

{{%  insert-safekit-82-installation-module-windows-ja app="Milestone XProtect and SQL" mod="milestone"  %}}


## SafeKit / Milestone XProtect ソリューションのステップごとの設定 {#step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


{{%  insert-safekit-82-milestone-configuration-ja app="Milestone XProtect and SQL" mod="milestone"  %}}


## SafeKit mirror ソリューションのデモ {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}
