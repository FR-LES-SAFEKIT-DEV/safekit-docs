---
title: "SafeKit による PostgreSQL の高可用性: フェイルオーバー用に postgresql.safe モジュールをインストールする"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-postgresql/"
description: "SafeKit の postgresql.safe モジュールをデプロイして、Windows および Linux 上で PostgreSQL の同期リアルタイム レプリケーションと自動フェイルオーバーを有効にします。このガイドでは、共有ストレージを使用せずに重要なアプリケーション用に 2 ノード SANless クラスターをセットアップする手順を説明します。"
category: "quick-install"
lang: "ja"
topics: "PostgreSQL の高可用性クイック インストール ガイド、SafeKit 高可用性の制限、SafeKit / PostgreSQL ソリューションの概要、Windows および Linux への SafeKit / PostgreSQL ソリューションのインストール (postgresql.safe)、SafeKit / PostgreSQL ソリューションの段階的な構成、SafeKit ミラー ソリューションのデモンストレーション、🔍 SafeKit High Availability Navigation Hub"
---

# SafeKit による PostgreSQL 高可用性: フェイルオーバー用に postgresql.safe モジュールをインストールする {#postgresql-high-availability-with-safekit-install-the-postgresqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="PostgreSQL" mod="postgresql.safe"  %}}
 

## SafeKit / PostgreSQL ソリューションの概要 {#overview-of-the-safekit--postgresql-solution}

解決策については、**💡[最も単純な PostgreSQL の高可用性: 2 ノードの同期レプリケーションとフェイルオーバー](</ja/solutions/postgresql-high-availability-synchronous-replication-failover/>)** で説明されています。

## Windows および Linux への SafeKit / PostgreSQL ソリューションのインストール (postgresql.safe) {#installation-of-the-safekit--postgresql-solution-on-windows-and-linux-postgresqlsafe}

### 前提条件 {#prerequisites}

  * PostgreSQL は 2 つのノード (仮想マシンまたは物理サーバー) にインストールする必要があります。



{{%  insert-safekit-installation-package-windows-ja app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-windows-ja app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-installation-package-linux-ja app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-linux-ja app="PostgreSQL" mod="postgresql"  %}}
 

## SafeKit / PostgreSQL ソリューションの段階的な構成 {#step-by-step-configuration-of-the-safekit--postgresql-solution}


{{%  insert-safekit-82-configuration-ja app="PostgreSQL" mod="postgresql"  %}}
 

## SafeKit ミラー ソリューションのデモンストレーション {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}