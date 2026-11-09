---
title: "SafeKit による Firebird 高可用性：フェイルオーバー用の firebird.safe モジュールをインストールする"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-firebird/"
description: "SafeKit は用の firebird.safe モジュールをデプロイして、Windows および Linux 上の Firebird の同期リアルタイムレプリケーションと自動フェイルオーバーを有効にします。このガイドでは、共有ストレージなしで重要なアプリケーション向けに 2 ノードの SAN レスクラスターをセットアップする手順を説明します。"
category: "quick-install"
lang: "ja"
topics: "Firebird 高可用性クイックインストールガイド、SafeKit High Availability の制限事項、SafeKit/Firebird ソリューションの概要、Windows および Linux への SafeKit/Firebird ソリューションのインストール (firebird.safe)、SafeKit/Firebird ソリューションのステップバイステップ設定、SafeKit mirror ソリューションのデモンストレーション、🔍 SafeKit を探索する"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# SafeKit による Firebird 高可用性：フェイルオーバー用の firebird.safe モジュールをインストールする {#firebird-high-availability-with-safekit-install-the-firebirdsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="Firebird" mod="firebird"  %}}
 

## SafeKit/Firebird ソリューションの概要 {#overview-of-the-safekit--firebird-solution}

解決策はこちらで説明されています。**💡 [Firebird 最もシンプルな高可用性：2 ノード同期レプリケーションとフェイルオーバー](</ja/solutions/firebird-high-availability-synchronous-replication-failover/>)**。

## Windows および Linux への SafeKit/Firebird ソリューションのインストール (firebird.safe) {#installation-of-the-safekit--firebird-solution-on-windows-and-linux-firebirdsafe}

### 前提条件 {#prerequisites}

  * Firebird 2 つのノード（仮想マシンまたは物理サーバー）にインストールする必要があります。



{{%  insert-safekit-installation-package-windows-ja app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-82-installation-module-windows-ja app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-installation-package-linux-ja app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-82-installation-module-linux-ja app="Firebird" mod="firebird"  %}}
 

## SafeKit/Firebird ソリューションのステップバイステップ設定 {#step-by-step-configuration-of-the-safekit--firebird-solution}


{{%  insert-safekit-82-configuration-ja app="Firebird" mod="firebird"  %}}
 

## SafeKit mirror ソリューションのデモンストレーション {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}