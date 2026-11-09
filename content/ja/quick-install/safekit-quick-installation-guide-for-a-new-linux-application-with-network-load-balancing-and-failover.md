---
title: "Linux ネットワーク負荷分散とフェイルオーバー：SafeKit farm.safe モジュールのインストール"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-network-load-balancing-and-failover/"
description: "Linux ネットワーク負荷分散と自動フェイルオーバーのために farm.safe モジュールをデプロイする方法を学びます。このガイドでは、外部ハードウェアロードバランサーや複雑な設定を必要とせずに、仮想 IP を使用して Web サービスおよびアプリケーションの高可用性クラスターを構築する方法を説明します。"
category: "quick-install"
lang: "ja"
topics: "Linux 向け高可用性クイックインストールガイド、SafeKit High Availability の制限事項、SafeKit/Linux ソリューションの概要、SafeKit/Linux ソリューション (farm.safe) のインストール、SafeKit/Linux ソリューションのステップバイステップ設定、SafeKit farm ソリューションのデモンストレーション、🔍 SafeKit を探索する"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# Linux ネットワーク負荷分散とフェイルオーバー：SafeKit farm.safe モジュールのインストール {#linux-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-ja app="Linux" mod="farm"  %}}
 

## SafeKit/Linux ソリューションの概要 {#overview-of-the-safekit--linux-solution}

ソリューションについては、こちらで説明しています。**💡 [SafeKit オールインワンの Linux ロードバランシング＆高可用性ソフトウェア](</ja/solutions/linux-load-balancing-failover/>)**。

## SafeKit/Linux ソリューション (farm.safe) のインストール {#installation-of-the-safekit--linux-solution-farmsafe}

### 前提条件 {#prerequisites}

  * <span class="notranslate farm-term" translate="no">farm</span> に配置するアプリケーションを、2 つ以上のノード（仮想マシンまたは物理サーバー）にインストールする必要があります。



{{%  insert-safekit-installation-package-linux-ja app="" mod="farm"  %}}
 

注：設定する汎用 **farm.safe** モジュールは、パッケージ内に同梱されています。

## SafeKit/Linux ソリューションのステップバイステップ設定 {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-farm-configuration-ja app="Linux" mod="farm"  %}}
 

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> ソリューションのデモンストレーション {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ja  %}}

{{%  insert-safekit-hub-ja app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-ja  %}}