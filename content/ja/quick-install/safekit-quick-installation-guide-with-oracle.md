---
title: "SafeKit による Oracle 高可用性：フェイルオーバー用の oracle.safe モジュールをインストールする"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-oracle/"
description: "SafeKit は用の oracle.safe モジュールをデプロイして、Windows および Linux 上の Oracle の同期リアルタイムレプリケーションと自動フェイルオーバーを有効にします。このガイドでは、共有ストレージなしでクリティカルアプリケーション用の 2 ノード SANless クラスターをセットアップする手順を説明します。"
category: "quick-install"
lang: "ja"
topics: "Oracle 高可用性クイックインストールガイド、SafeKit High Availability の制限事項、SafeKit/Oracle ソリューションの概要、Windows および Linux への SafeKit/Oracle ソリューションのインストール (oracle.safe)、SafeKit/Oracle ソリューションのステップバイステップ設定、SafeKit mirror ソリューションのデモンストレーション、🔍 SafeKit を探索する"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# SafeKit による Oracle 高可用性：フェイルオーバー用の oracle.safe モジュールをインストールする {#oracle-high-availability-with-safekit-install-the-oraclesafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="Oracle" mod="oracle"  %}}
 

## SafeKit/Oracle ソリューションの概要 {#overview-of-the-safekit--oracle-solution}

解決策はこちらで説明されています：**💡 [最もシンプルな Oracle 高可用性：2 ノード同期レプリケーションとフェイルオーバー](</ja/solutions/oracle-high-availability-synchronous-replication-failover/>)**。

## Windows および Linux への SafeKit/Oracle ソリューションのインストール (oracle.safe) {#installation-of-the-safekit--oracle-solution-on-windows-and-linux-oraclesafe}

### 前提条件 {#prerequisites}

  * 2 つのノード（仮想マシンまたは物理サーバー）に Oracle をインストールする必要があります。



{{%  insert-safekit-installation-package-windows-ja app="Oracle" mod="oracle"  %}}

{{%  insert-safekit-82-installation-module-windows-ja app="Oracle" mod="oracle"  %}}

{{%  insert-safekit-installation-package-linux-ja app="Oracle" mod="oracle"  %}}

{{%  insert-safekit-82-installation-module-linux-ja app="Oracle" mod="oracle"  %}}
 

## SafeKit/Oracle ソリューションのステップバイステップ設定 {#step-by-step-configuration-of-the-safekit--oracle-solution}


{{%  insert-safekit-82-configuration-ja app="Oracle" mod="oracle"  %}}
 

## SafeKit mirror ソリューションのデモンストレーション {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}