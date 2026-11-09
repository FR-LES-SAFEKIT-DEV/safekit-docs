---
title: "Windows ネットワーク負荷分散とフェイルオーバー：SafeKit farm.safe モジュールのインストール"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/"
description: "Windows ネットワーク負荷分散と自動フェイルオーバーのために farm.safe モジュールをデプロイする方法を学びます。このガイドでは、外部ハードウェアロードバランサーや複雑な設定を必要とせずに、仮想 IP を使用して Web サービスおよびアプリケーションの高可用性クラスターを構築する方法を示します。"
category: "quick-install"
lang: "ja"
topics: "Windows 向け高可用性クイックインストールガイド、SafeKit High Availability の制限事項、SafeKit/Windows ソリューションの概要、SafeKit/Windows ソリューション (farm.safe) のインストール、SafeKit/Windows ソリューションのステップバイステップ設定、SafeKit farm ソリューションのデモンストレーション、🔍 SafeKit を探索する"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# Windows ネットワーク負荷分散とフェイルオーバー：SafeKit farm.safe モジュールのインストール {#windows-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-ja app="Windows" mod="farm"  %}}
 

## SafeKit/Windows ソリューションの概要 {#overview-of-the-safekit--windows-solution}

ソリューションについては、こちらで説明しています。**💡 [SafeKit オールインワンの Windows ロードバランシング＆高可用性ソフトウェア](</ja/solutions/windows-load-balancing-failover/>)**。

## SafeKit/Windows ソリューション (farm.safe) のインストール {#installation-of-the-safekit--windows-solution-farmsafe}

### 前提条件 {#prerequisites}

  * <span class="notranslate farm-term" translate="no">farm</span> に配置するアプリケーションを、2 つ以上のノード（仮想マシンまたは物理サーバー）にインストールする必要があります。



{{%  insert-safekit-installation-package-windows-ja app="" mod="farm"  %}}
 

注：設定する汎用 **farm.safe** モジュールは、パッケージ内に同梱されています。

## SafeKit/Windows ソリューションのステップバイステップ設定 {#step-by-step-configuration-of-the-safekit--windows-solution}


{{%  insert-safekit-82-farm-configuration-ja app="Windows" mod="farm"  %}}
 

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> ソリューションのデモンストレーション {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}