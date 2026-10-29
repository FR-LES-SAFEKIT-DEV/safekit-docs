---
title: "Linux のネットワークロードバランシングとフェイルオーバー: SafeKit farm.safe モジュールのインストール"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-network-load-balancing-and-failover/"
description: "Linux のネットワークロードバランシングと自動フェイルオーバーのために farm.safe モジュールを導入する方法を説明します。このガイドでは、外部のハードウェアロードバランサーや複雑な設定なしで、仮想 IP を使って Web サービスやアプリケーション向けの高可用性クラスターを構築する方法を紹介します。"
category: "quick-install"
lang: "ja"
topics: "Linux 向け高可用性クイックインストールガイド, SafeKit 高可用性の制限事項, SafeKit / Linux ソリューションの概要, SafeKit / Linux ソリューションのインストール (farm.safe), SafeKit / Linux ソリューションのステップバイステップ設定, SafeKit farm ソリューションのデモ, 🔍 SafeKit 高可用性ナビゲーションハブ"
---

# Linux のネットワークロードバランシングとフェイルオーバー: SafeKit farm.safe モジュールのインストール {#linux-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-ja app="Linux" mod="farm"  %}}
 

## SafeKit / Linux ソリューションの概要 {#overview-of-the-safekit--linux-solution}

ソリューションの説明はこちらです: **💡[SafeKit: オールインワンの Linux ロードバランシング & 高可用性ソフトウェア](</ja/solutions/linux-load-balancing-failover/>)**。

## SafeKit / Linux ソリューションのインストール (farm.safe) {#installation-of-the-safekit--linux-solution-farmsafe}

### 前提条件 {#prerequisites}

  * <span class="notranslate farm-term" translate="no">farm</span> に配置するアプリケーションを、2 ノード以上（仮想マシンまたは物理サーバー）にインストールしておく必要があります。



{{%  insert-safekit-installation-package-linux-ja app="" mod="farm"  %}}
 

注: 設定する汎用の **farm.safe** モジュールは、パッケージに含まれています。

## SafeKit / Linux ソリューションのステップバイステップ設定 {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-farm-configuration-ja app="Linux" mod="farm"  %}}
 

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> ソリューションのデモ {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ja  %}}

{{%  insert-safekit-hub-ja app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-ja  %}}
