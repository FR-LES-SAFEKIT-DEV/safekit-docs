---
title: "Microsoft SQL Server SafeKitによる高可用性：フェイルオーバーのためにsqlserver.safeモジュールをインストールしてください"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/"
description: "SafeKitにsqlserver.safeモジュールをデプロイして、 SQL Server Microsoft同期リアルタイムレプリケーションと自動フェイルオーバーを有効にします。このガイドでは、共有ストレージを使用しない重要なアプリケーション向けの 2 ノード SAN レス クラスタのセットアップ手順を説明します。"
category: "quick-install"
lang: "ja"
topics: "Microsoft 、 SQL Server 、 SafeKitの高可用性クイックインストールガイド、高可用性の制限事項、 SafeKit / Microsoft SQL Serverソリューションの概要、 Windows ( sqlserver.safe ) へのSafeKit / Microsoft 、 SQL Serverソリューションのインストール、 SafeKit / Microsoft 、 SQL Serverソリューションのステップバイステップ構成、 SafeKit mirrorソリューションのデモ、🔍 SafeKit高可用性ナビゲーションハブ"
---

# Microsoft SQL Server SafeKitによる高可用性：フェイルオーバーのためにsqlserver.safeモジュールをインストールしてください {#microsoft-sql-server-high-availability-with-safekit-install-the-sqlserversafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## SafeKit / Microsoft SQL Serverソリューションの概要 {#overview-of-the-safekit--microsoft-sql-server-solution}

ソリューションの詳細な概要については、 ** 💡 [最もシンプルなMicrosoft SQL Server高可用性: 2 ノード同期レプリケーションとフェイルオーバー](</solutions/sql-server-high-availability-synchronous-replication-failover/>) **を参照してください。

## SafeKit / Microsoft SQL ServerソリューションをWindows ( sqlserver.safe )にインストールします。 {#installation-of-the-safekit--microsoft-sql-server-solution-on-windows-sqlserversafe}

### 前提条件 {#prerequisites}

  * Microsoft SQL Server 2つのノード（仮想マシンまたは物理サーバー）にインストールする必要があります。
  * SafeKit 、SQL Expressを含むすべてのバージョンのSQLに対応しています。


  * [ SQLシステムデータベース](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) （master.mdfやmastlog.ldfなど）は、両方のノードで同じディレクトリに配置する必要があります。ディレクトリは、ステップバイステップ構成のステップ4で複製されるように構成されます。
  * 読み取り専用のSQLリソースデータベース[ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>)バイナリ内に存在し、フェイルオーバーに必要となるため、SQLは両ノードのファイルシステム上の同じ場所にインストールする必要があります。このデータベースは複製する必要はありません。
  * SQLユーザーデータベース（.mdfおよび.ldf）は、両ノードで同じディレクトリに配置する必要があります。ディレクトリは、ステップバイステップ構成のステップ4でレプリケートされるように構成されます。



{{%  insert-safekit-installation-package-windows-ja app="Microsoft SQL Server" mod="sqlserver"  %}}

{{%  insert-safekit-82-installation-module-windows-ja app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## SafeKit / Microsoft SQL Serverソリューションの段階的な構成 {#step-by-step-configuration-of-the-safekit--microsoft-sql-server-solution}


{{%  insert-safekit-82-configuration-ja app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## SafeKit mirrorのソリューションのデモンストレーション {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}