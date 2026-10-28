---
title: "SafeKit による Linux の高可用性: フェイルオーバー用 mirror.safe モジュールのインストール"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover/"
description: "SafeKit の mirror.safe モジュールを導入して、Linux で同期リアルタイムレプリケーションと自動フェイルオーバーを実現します。このガイドでは、共有ストレージを使わずに、重要な Linux アプリケーション向けの 2 ノード SANless クラスターを構築する手順を説明します。"
category: "quick-install"
lang: "ja"
topics: "Linux 向け高可用性クイックインストールガイド, SafeKit 高可用性の制限事項, SafeKit / Linux ソリューションの概要, SafeKit / Linux ソリューションのインストール (mirror.safe), SafeKit / Linux ソリューションのステップバイステップ設定, SafeKit mirror ソリューションのデモ, 🔍 SafeKit 高可用性ナビゲーションハブ"
---

# SafeKit による Linux の高可用性: フェイルオーバー用 mirror.safe モジュールのインストール {#linux-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="Linux" mod="mirror"  %}}
 

## SafeKit / Linux ソリューションの概要 {#overview-of-the-safekit--linux-solution}

ソリューションの説明はこちらです: **💡[最もシンプルな Linux 高可用性: 2 ノード同期レプリケーションとフェイルオーバー](</ja/solutions/linux-high-availability-software-synchronous-replication-failover/>)**。

## SafeKit / Linux ソリューションのインストール (mirror.safe) {#installation-of-the-safekit--linux-solution-mirrorsafe}

### 前提条件 {#prerequisites}

  * SafeKit で再起動させたいアプリケーションを、2 ノード（仮想マシンまたは物理サーバー）にインストールしておく必要があります。



{{%  insert-safekit-installation-package-linux-ja app="" mod="mirror"  %}}
 

注: 設定する汎用の **mirror.safe** モジュールは、パッケージに含まれています。
注：設定する汎用モジュール**mirror.safe**は、パッケージ内に同梱されています。
## SafeKit / Linux ソリューションのステップバイステップ設定 {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-configuration-ja app="Linux" mod="mirror"  %}}
 

## SafeKit mirror ソリューションのデモ {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-ja  %}}
