---
title: "SafeKit による Nedap 高可用性：フェイルオーバー用に nedap.safe モジュールをインストールする"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-nedap/"
description: "SafeKit は用の nedap.safe モジュールをデプロイして、Windows 上の Nedap の同期リアルタイムレプリケーションと自動フェイルオーバーを有効にします。このガイドでは、共有ストレージなしで重要なアプリケーション向けに 2 ノードの SANless クラスターをセットアップする手順を説明します。"
category: "quick-install"
lang: "ja"
topics: "Nedap 高可用性クイックインストールガイド、SafeKit High Availability の制限事項、SafeKit/Nedap ソリューションの概要、Windows への SafeKit/Nedap ソリューションのインストール (nedap.safe)、SafeKit/Nedap ソリューションのステップバイステップ設定、SafeKit mirror ソリューションのデモンストレーション、🔍 SafeKit を探索する"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# SafeKit による Nedap 高可用性：フェイルオーバー用に nedap.safe モジュールをインストールする {#nedap-high-availability-with-safekit-install-the-nedapsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="Nedap" mod="nedap"  %}}
 

**📘 [Nedap AOES と SafeKit の構成（PDF）](</wp-content/uploads/documents/NEDAP_AEOS_CLUSTER_SAFEKIT.pdf>)**：すべての詳細は本書に記載されています。

## SafeKit/Nedap ソリューションの概要 {#overview-of-the-safekit--nedap-solution}

解決策はこちらで説明されています。**💡 [Nedap 最もシンプルな高可用性：2 ノード同期レプリケーションとフェイルオーバー](</ja/solutions/nedap-high-availability-synchronous-replication-failover/>)**。

## Windows への SafeKit/Nedap ソリューションのインストール (nedap.safe) {#installation-of-the-safekit--nedap-solution-on-windows-nedapsafe}

### 前提条件 {#prerequisites}

  * Nedap AEOS と SQL を 2 つのノード（仮想マシンまたは物理サーバー）にインストールする必要があります。
  * Nedap AEOS と同じノードで SQL Server を使用する場合は、サーバーの物理 IP アドレスではなく、仮想 IP アドレスを使用して Nedap AEOS を SQL に接続するように設定してください。そうしないと、フェイルオーバーが機能しません。SQL Server 外部に配置することもできます。以下の注記を参照してください。


ℹ️ 注：SQL Server 外部に配置することも可能です。その場合、ステップバイステップ構成のステップ 4 で、

  * SQL データとログフォルダーのレプリケーションを削除します
  * sqlservr.exe のプロセスチェッカーを削除します
  * SERVICES マクロから MSSQLServer を削除します。


💡 [SafeKit と sqlserver.safe モジュール](</ja/solutions/sql-server-high-availability-synchronous-replication-failover/>)を使用すると、外部 SQL Server の冗長化を実装できます。この場合、sqlserver.safe モジュールの仮想 IP アドレスを使用して、Nedap AEOS と SQL の接続を構成します。


{{%  insert-safekit-installation-package-windows-ja app="Nedap AEOS and SQL" mod="nedap"  %}}

{{%  insert-safekit-82-installation-module-windows-ja app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## SafeKit/Nedap ソリューションのステップバイステップ設定 {#step-by-step-configuration-of-the-safekit--nedap-solution}


{{%  insert-safekit-82-configuration-ja app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## SafeKit mirror ソリューションのデモンストレーション {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}