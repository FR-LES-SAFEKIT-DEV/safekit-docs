---
title: "SafeKit による Linux 高可用性：フェイルオーバーのための mirror.safe モジュールのインストール"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover/"
description: "SafeKit は用の mirror.safe モジュールをデプロイして、Linux 上で同期リアルタイムレプリケーションと自動フェイルオーバーを有効にします。このガイドでは、共有ストレージなしで、重要な Linux アプリケーション向けに 2 ノードの SANless クラスターをセットアップする手順を説明します。"
category: "quick-install"
lang: "ja"
topics: "Linux 向け高可用性クイックインストールガイド、SafeKit High Availability の制限事項、SafeKit/Linux ソリューションの概要、SafeKit/Linux ソリューションのインストール (mirror.safe)、SafeKit/Linux ソリューションのステップバイステップ設定、SafeKit mirror ソリューションのデモンストレーション、🔍 SafeKit を探索する"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# SafeKit による Linux 高可用性：フェイルオーバーのための mirror.safe モジュールのインストール {#linux-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="Linux" mod="mirror"  %}}
 

## SafeKit/Linux ソリューションの概要 {#overview-of-the-safekit--linux-solution}

解決策はこちらで説明されています：** 💡 [最もシンプルな Linux 高可用性：2 ノード同期レプリケーションとフェイルオーバー](</ja/solutions/linux-high-availability-software-synchronous-replication-failover/>)。  
**

## SafeKit/Linux ソリューションのインストール (mirror.safe) {#installation-of-the-safekit--linux-solution-mirrorsafe}

### 前提条件 {#prerequisites}

  * SafeKit で再起動したいアプリケーションを、2 つのノード（仮想マシンまたは物理サーバー）にインストールする必要があります。



{{%  insert-safekit-installation-package-linux-ja app="" mod="mirror"  %}}
 

注：設定する汎用 **mirror.safe** モジュールは、パッケージ内に同梱されています。

## SafeKit/Linux ソリューションのステップバイステップ設定 {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-configuration-ja app="Linux" mod="mirror"  %}}
 

## SafeKit mirror ソリューションのデモンストレーション {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-ja  %}}