---
title: "SafeKit による PostgreSQL 高可用性：フェイルオーバーのための postgresql.safe モジュールのインストール"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-postgresql/"
description: "SafeKit は用の postgresql.safe モジュールをデプロイして、Windows および Linux 上の PostgreSQL の同期リアルタイムレプリケーションと自動フェイルオーバーを有効にします。このガイドでは、共有ストレージなしで重要なアプリケーション向けに 2 ノードの SANless クラスターをセットアップする手順を説明します。"
category: "quick-install"
lang: "ja"
topics: "PostgreSQL 高可用性クイックインストールガイド、SafeKit High Availability の制限事項、SafeKit/PostgreSQL ソリューションの概要、Windows および Linux への SafeKit/PostgreSQL ソリューションのインストール (postgresql.safe)、SafeKit/PostgreSQL ソリューションのステップバイステップ設定、SafeKit mirror ソリューションのデモンストレーション、🔍 SafeKit を探索する"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# SafeKit による PostgreSQL 高可用性：フェイルオーバーのための postgresql.safe モジュールのインストール {#postgresql-high-availability-with-safekit-install-the-postgresqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="PostgreSQL" mod="postgresql.safe"  %}}
 

## SafeKit/PostgreSQL ソリューションの概要 {#overview-of-the-safekit--postgresql-solution}

解決策はこちらで説明されています：**💡 [最もシンプルな PostgreSQL 高可用性：2 ノード同期レプリケーションとフェイルオーバー](</ja/solutions/postgresql-high-availability-synchronous-replication-failover/>)**。

## Windows および Linux への SafeKit/PostgreSQL ソリューションのインストール (postgresql.safe) {#installation-of-the-safekit--postgresql-solution-on-windows-and-linux-postgresqlsafe}

### 前提条件 {#prerequisites}

  * 2 台のノード（仮想マシンまたは物理サーバー）に PostgreSQL インストールする必要があります。



{{%  insert-safekit-installation-package-windows-ja app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-windows-ja app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-installation-package-linux-ja app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-linux-ja app="PostgreSQL" mod="postgresql"  %}}
 

## SafeKit/PostgreSQL ソリューションのステップバイステップ設定 {#step-by-step-configuration-of-the-safekit--postgresql-solution}


{{%  insert-safekit-82-configuration-ja app="PostgreSQL" mod="postgresql"  %}}
 

## SafeKit mirror ソリューションのデモンストレーション {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}