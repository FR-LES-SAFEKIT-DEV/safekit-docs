---
title: "SafeKit のインストール：PostgreSQL の高可用性"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-postgresql/"
description: "手順ガイド：SafeKit の postgresql.safe モジュールを導入し、Windows または Linux 上の PostgreSQL のリアルタイムレプリケーションと自動フェイルオーバーを実現。"
category: "quick-install"
lang: "ja"
topics: "PostgreSQL の高可用性クイックインストールガイド, SafeKit High Availability の制限事項, SafeKit/PostgreSQL ソリューションの概要, Windows および Linux への SafeKit/PostgreSQL ソリューションのインストール (postgresql.safe), SafeKit/PostgreSQL ソリューションのステップバイステップ設定, SafeKit mirror ソリューションのデモンストレーション"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--postgresql-solution, installation-of-the-safekit--postgresql-solution-on-windows-and-linux-postgresqlsafe, step-by-step-configuration-of-the-safekit--postgresql-solution, demonstration-of-the-safekit-mirror-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# SafeKit のインストール：PostgreSQL の高可用性 {#install-safekit-for-postgresql-high-availability}


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