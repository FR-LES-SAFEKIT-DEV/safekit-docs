---
title: "NedapとSafeKitによる高可用性：フェイルオーバーのためにnedap.safeモジュールをインストールしてください"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-nedap/"
description: "SafeKitにnedap.safeモジュールをデプロイして、 Windowsの同期リアルタイムレプリケーションとNedapへの自動フェイルオーバーを有効にします。このガイドでは、共有ストレージを使用しない重要なアプリケーション向けに、2 ノードの SAN レス クラスタをセットアップする手順を説明します。"
category: "quick-install"
lang: "ja"
topics: "Nedapの高可用性クイックインストールガイド、 SafeKitの高可用性制限、 SafeKit / Nedapソリューションの概要、 Windows ( nedap.safe ) へのSafeKit / Nedapソリューションのインストール、 SafeKit / Nedapソリューションのステップバイステップ構成、 SafeKit mirrorソリューションのデモ、🔍 SafeKit高可用性ナビゲーションハブ"
---

# Nedap高可用性とSafeKit : フェイルオーバーのためにnedap.safeモジュールをインストールしてください{#nedap-high-availability-with-safekit-install-the-nedapsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="Nedap" mod="nedap"  %}}
 

** 📘 [ Nedap AOES とSafeKit (PDF) ](</wp-content/uploads/documents/NEDAP_AEOS_CLUSTER_SAFEKIT.pdf>) **の構成: すべての詳細はこのドキュメントに記載されています。

## SafeKit / Nedapソリューションの概要{#overview-of-the-safekit--nedap-solution}

解決策はここに記載されています: ** 💡 [最もシンプルなNedap高可用性: 2 ノード同期レプリケーションとフェイルオーバー](</solutions/nedap-high-availability-synchronous-replication-failover/>) ** 。

## SafeKit / NedapソリューションをWindows ( nedap.safe ) {#installation-of-the-safekit--nedap-solution-on-windows-nedapsafe}にインストールします。

### 前提条件{#prerequisites}

  * 2つのノード（仮想マシンまたは物理サーバー）に、 Nedap AEOSとSQLがインストールされている必要があります。
  * と SQL Server 同じノードで Nedap AEOS、接続を構成する Nedap AEOSからSQLへの接続には、サーバーの物理IPアドレスではなく、仮想IPアドレスを使用してください。そうしないと、フェイルオーバーが機能しません。 SQL Server 外部の場合もあります。下記の注記を参照してください。


ℹ️ 注: SQL Server外部の場合があります。この場合、ステップバイステップの設定手順のステップ 4 で次の操作を行います。

  * SQLデータおよびログフォルダのレプリケーションを削除します。
  * sqlservr.exeのプロセスチェッカーを削除します。
  * SERVICESマクロからMSSQLServerを削除します。


外部モジュールSQL Serverの冗長性は、💡 [ SafeKitおよびsqlserver.safeモジュール](</solutions/sql-server-high-availability-synchronous-replication-failover/>)を使用して実装できます。この場合、 Nedap AEOS と SQL の接続を、 sqlserver.safeモジュールの仮想 IP アドレスで構成してください。


{{%  insert-safekit-installation-package-windows-ja app="Nedap AEOS and SQL" mod="nedap"  %}}

{{%  insert-safekit-82-installation-module-windows-ja app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## SafeKit / Nedapソリューション{#step-by-step-configuration-of-the-safekit--nedap-solution}の段階的な構成


{{%  insert-safekit-82-configuration-ja app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}のソリューションのデモンストレーション


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}