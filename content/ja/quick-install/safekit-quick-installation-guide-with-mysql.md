---
title: "SafeKit による MySQL 高可用性：フェイルオーバーのための mysql.safe モジュールのインストール"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-mysql/"
description: "SafeKit は用の mysql.safe モジュールをデプロイして、Windows および Linux 上の MySQL の同期リアルタイムレプリケーションと自動フェイルオーバーを有効にします。このガイドでは、共有ストレージなしで重要なアプリケーション向けに 2 ノードの SANless クラスターをセットアップする手順を説明します。"
category: "quick-install"
lang: "ja"
topics: "MySQL 高可用性クイックインストールガイド、SafeKit High Availability の制限事項、SafeKit/MySQL ソリューションの概要、Windows および Linux への SafeKit/MySQL ソリューションのインストール (mysql.safe)、SafeKit/MySQL Server ソリューションのステップバイステップ設定、SafeKit mirror ソリューションのデモンストレーション、🔍 SafeKit を探索する"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# SafeKit による MySQL 高可用性：フェイルオーバーのための mysql.safe モジュールのインストール {#mysql-high-availability-with-safekit-install-the-mysqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="MySQL" mod="mysql"  %}}
 

## SafeKit/MySQL ソリューションの概要 {#overview-of-the-safekit--mysql-solution}

解決策はこちらで説明されています：**💡 [最もシンプルな MySQL 高可用性：2 ノード同期レプリケーションとフェイルオーバー](</ja/solutions/mysql-high-availability-synchronous-replication-failover/>)**。

## Windows および Linux への SafeKit/MySQL ソリューションのインストール (mysql.safe) {#installation-of-the-safekit--mysql-solution-on-windows-and-linux-mysqlsafe}

### 前提条件 {#prerequisites}

  * 2 つのノード（仮想マシンまたは物理サーバー）に MySQL をインストールする必要があります。



{{%  insert-safekit-installation-package-windows-ja app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-windows-ja app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-installation-package-linux-ja app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-linux-ja app="MySQL" mod="mysql"  %}}
 

## SafeKit/MySQL Server ソリューションのステップバイステップ設定 {#step-by-step-configuration-of-the-safekit--mysql-server-solution}


{{%  insert-safekit-82-configuration-ja app="MySQL" mod="mysql"  %}}
 

## SafeKit mirror ソリューションのデモンストレーション {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}