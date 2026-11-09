---
title: "Milestone XProtect High Availability with SafeKit：フェイルオーバー用の milestone.safe モジュールをインストールする"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server/"
description: "SafeKit は用の milestone.safe モジュールをデプロイして、Windows 上の Milestone XProtect の同期リアルタイムレプリケーションと自動フェイルオーバーを有効にします。このガイドでは、共有ストレージなしで重要なアプリケーション向けに 2 ノードの SANless クラスターをセットアップする手順を説明します。"
category: "quick-install"
lang: "ja"
topics: "Milestone XProtect 高可用性クイックインストールガイド、SafeKit High Availability の制限事項、SafeKit/Milestone XProtect ソリューションの概要、Windows への SafeKit/Milestone XProtect ソリューションのインストール (milestone.safe)、SafeKit/Milestone XProtect ソリューションのステップバイステップ設定、SafeKit mirror ソリューションのデモンストレーション、🔍 SafeKit を探索する"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# Milestone XProtect High Availability with SafeKit：フェイルオーバー用の milestone.safe モジュールをインストールする {#milestone-xprotect-high-availability-with-safekit-install-the-milestonesafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="Milestone XProtect" mod="milestone"  %}}
 

## SafeKit/Milestone XProtect ソリューションの概要 {#overview-of-the-safekit--milestone-xprotect-solution}

ソリューションについては、こちらで説明しています。**💡 [シンプルな Milestone XProtect 高可用性：2 ノード同期レプリケーションとフェイルオーバー](</ja/solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/>)**。

## Windows への SafeKit/Milestone XProtect ソリューションのインストール (milestone.safe) {#installation-of-the-safekit--milestone-xprotect-solution-on-windows-milestonesafe}

### 前提条件 {#prerequisites}

  * Milestone XProtect Management と SQL を 2 つのノード（仮想マシンまたは物理サーバー）にインストールする必要があります。SQL Server とイベントサーバーは外部に配置することも可能です。詳細は以下の注記を参照してください。


ℹ️ 注：SQL Server 外部に配置できます。この場合、milestone.safe のステップバイステップ構成のステップ 4 で：

  * SQL データとログフォルダーのレプリケーションを削除します
  * sqlservr.exe のプロセスチェッカーを削除します
  * マクロの SERVICES から MSSQLServer を削除します。


💡 [SafeKit と sqlserver.safe モジュール](</ja/solutions/sql-server-high-availability-synchronous-replication-failover/>)を使用すると、外部 SQL Server の冗長化を実装できます。

この場合、両方の管理ノードで、[Milestone Management と SQL の接続を、](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>) sqlserver.safe モジュールの仮想 IP アドレス（レジストリキー HKEY_LOCAL_MACHINE > SOFTWARE > VideoOSServerConnectionString）で構成します。

ℹ️ 注：イベントサーバーは、管理サーバーの外部に設置することも可能です。

この場合、2 つのクラスターに milestone.safe が 2 つインストールされています。1 つは管理クラスター用、もう 1 つはイベントクラスター用です。

管理クラスターの場合、milestone.safe のステップバイステップ構成のステップ 4 で:

  * MilestoneEventServerService を SERVICES マクロから削除します。


イベントクラスターの場合、milestone.safe のステップバイステップ構成のステップ 4 で:

  * SERVICES マクロから削除する：MSSQLServer、Milestone XProtect Management Server、Milestone XProtect Log Server
  * SQL データとログフォルダーのレプリケーションを削除します
  * sqlservr.exe のプロセスチェッカーを削除します
  * ステップバイステップの構成中に、イベントサーバーを**管理クラスター**の仮想 IP アドレスに[登録します](</wp-content/uploads/2022/07/milestone-management-server-register-2020.png>)（または、ダウンロードマネージャーからイベントサーバーをインストールし、インストール中に**管理クラスター**の仮想 IP アドレスを設定します）
  * Milestone 管理クライアントの[[登録済みサービス]](</wp-content/uploads/2022/07/milestone-url-vip.png>)で、イベントサーバーを**イベントクラスター**の仮想 IP アドレスに設定します。


### ℹ️ レコーダーの冗長性 {#ℹ-recorder-redundancy}

  * データ量のため、レコーダーのレプリケーションは SafeKit には適していません。
  * Milestone に統合されたソリューションは、(リアルタイムレプリケーションなしのフェイルオーバーレコーディングサーバーとして)使用できます。
  * 2 台のレコーダーをアクティブ/アクティブ構成で実行することもでき、カメラは、障害が発生した場合に同じエリアのすべてのカメラを失わないように分散されます。
  * 各カメラからの映像は[、Vega/RMF](<https://vega25.com/>)ソリューションを使用することで、2 台のレコーダーに送信することも可能です。


ℹ️ SafeKit クラスターで Milestone をバージョン N からバージョン N+1 に移行する場合は、こちらの記事をお読みください： 🛠️ [SafeKit を使用した Milestone 管理の移行](</ja/quick-install/safekit-quick-installation-guide-milestone-migration/>)


{{%  insert-safekit-installation-package-windows-ja app="Milestone XProtect and SQL" mod="milestone"  %}}

{{%  insert-safekit-82-installation-module-windows-ja app="Milestone XProtect and SQL" mod="milestone"  %}}
 

## SafeKit/Milestone XProtect ソリューションのステップバイステップ設定 {#step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


{{%  insert-safekit-82-milestone-configuration-ja app="Milestone XProtect and SQL" mod="milestone"  %}}
 

## SafeKit mirror ソリューションのデモンストレーション {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}