---
title: "SafeKit による MariaDB 高可用性：フェイルオーバーのための mysql.safe モジュールのインストール"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-mariadb/"
description: "SafeKit は用の mysql.safe モジュールをデプロイして、Windows および Linux 上の MariaDB の同期リアルタイムレプリケーションと自動フェイルオーバーを有効にします。このガイドでは、共有ストレージなしで重要なアプリケーション向けに 2 ノードの SANless クラスターをセットアップする手順を説明します。"
category: "quick-install"
lang: "ja"
topics: "MariaDB 高可用性クイックインストールガイド、SafeKit High Availability の制限事項、SafeKit/MariaDB ソリューションの概要、Windows および Linux への SafeKit/MariaDB ソリューションのインストール (mysql.safe)、SafeKit/MariaDB ソリューションのステップバイステップ設定、SafeKit mirror ソリューションのデモンストレーション、🔍 SafeKit を探索する"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# SafeKit による MariaDB 高可用性：フェイルオーバーのための mysql.safe モジュールのインストール {#mariadb-high-availability-with-safekit-install-the-mysqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="MariaDB" mod="mysql"  %}}
 

## SafeKit/MariaDB ソリューションの概要 {#overview-of-the-safekit--mariadb-solution}

解決策はこちらで説明されています：**💡 [最もシンプルな MariaDB 高可用性：2 ノード同期レプリケーションとフェイルオーバー](</ja/solutions/mariadb-simplest-high-availability-cluster-synchronous-replication-failover-redundant-servers/>)**。

## Windows および Linux への SafeKit/MariaDB ソリューションのインストール (mysql.safe) {#installation-of-the-safekit--mariadb-solution-on-windows-and-linux-mysqlsafe}

### 前提条件 {#prerequisites}

  * 2 台のノード（仮想マシンまたは物理サーバー）に MariaDB をインストールする必要があります。



{{%  insert-safekit-installation-package-windows-ja app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-windows-ja app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-installation-package-linux-ja app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-linux-ja app="MariaDB" mod="mysql"  %}}
 

## SafeKit/MariaDB ソリューションのステップバイステップ設定 {#step-by-step-configuration-of-the-safekit--mariadb-solution}


{{%  insert-safekit-82-configuration-ja app="MariaDB" mod="mysql"  %}}
 

## SafeKit mirror ソリューションのデモンストレーション {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}