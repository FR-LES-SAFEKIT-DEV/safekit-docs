---
title: "SafeKit による Microsoft SQL Server 高可用性：フェイルオーバー用の sqlserver.safe モジュールのインストール"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/"
description: "SafeKit は用の sqlserver.safe モジュールをデプロイして、Microsoft SQL Server の同期リアルタイムレプリケーションと自動フェイルオーバーを有効にします。このガイドでは、共有ストレージなしで、ミッションクリティカルなアプリケーション向けの 2 ノード SANless クラスターをセットアップする手順を説明します。"
category: "quick-install"
lang: "ja"
topics: "Microsoft SQL Server 高可用性クイックインストールガイド、SafeKit High Availability の制限事項、SafeKit/Microsoft SQL Server ソリューションの概要、Windows への SafeKit/Microsoft SQL Server ソリューションのインストール (sqlserver.safe)、SafeKit/Microsoft SQL Server ソリューションのステップバイステップ設定、SafeKit mirror ソリューションのデモンストレーション、🔍 SafeKit を探索する"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# SafeKit による Microsoft SQL Server 高可用性：フェイルオーバー用の sqlserver.safe モジュールのインストール {#microsoft-sql-server-high-availability-with-safekit-install-the-sqlserversafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## SafeKit/Microsoft SQL Server ソリューションの概要 {#overview-of-the-safekit--microsoft-sql-server-solution}

ソリューションの詳細については、**💡 [「Microsoft SQL Server 高可用性を実現する最も簡単な方法：2 ノード同期レプリケーションとフェイルオーバー」](</ja/solutions/sql-server-high-availability-synchronous-replication-failover/>)** を参照してください。

## Windows への SafeKit/Microsoft SQL Server ソリューションのインストール (sqlserver.safe) {#installation-of-the-safekit--microsoft-sql-server-solution-on-windows-sqlserversafe}

### 前提条件 {#prerequisites}

  * Microsoft SQL Server 2 つのノード（仮想マシンまたは物理サーバー）にインストールする必要があります。
  * SafeKit は、SQL Express を含むすべてのバージョンの SQL で動作します。


  * [SQL システムデータベース](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>)（master.mdf や mastlog.ldf など）は、両方のノードで同じディレクトリに配置する必要があります。これらのディレクトリは、ステップバイステップ構成のステップ 4 でレプリケートされるように構成されます。
  * 読み取り専用の[SQL リソースデータベースは](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>)バイナリにあり、フェイルオーバーに必要であるため、SQL は両方のノードのファイルシステムの同じ場所にインストールする必要があります。このデータベースを複製する必要はありません。
  * SQL ユーザーデータベース（.mdf および .ldf）は、両方のノードで同じディレクトリに配置する必要があります。これらのディレクトリは、ステップバイステップ構成のステップ 4 でレプリケートされるように構成されます。



{{%  insert-safekit-installation-package-windows-ja app="Microsoft SQL Server" mod="sqlserver"  %}}

{{%  insert-safekit-82-installation-module-windows-ja app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## SafeKit/Microsoft SQL Server ソリューションのステップバイステップ設定 {#step-by-step-configuration-of-the-safekit--microsoft-sql-server-solution}


{{%  insert-safekit-82-configuration-ja app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## SafeKit mirror ソリューションのデモンストレーション {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}