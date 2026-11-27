---
title: "Windows ネットワーク負荷分散とフェイルオーバー：SafeKit farm.safe モジュールのインストール"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/"
description: "手順ガイド：Windows に SafeKit の farm.safe モジュールを導入し、仮想 IP でアプリケーションのネットワーク負荷分散とフェイルオーバーを実現。"
category: "quick-install"
lang: "ja"
topics: "Windows の高可用性クイックインストールガイド, SafeKit High Availability の制限事項, SafeKit/Windows ソリューションの概要, SafeKit/Windows ソリューション (farm.safe) のインストール, SafeKit/Windows ソリューションのステップバイステップ設定, SafeKit farm ソリューションのデモンストレーション"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--windows-solution, installation-of-the-safekit--windows-solution-farmsafe, step-by-step-configuration-of-the-safekit--windows-solution, demonstration-of-the-safekit-farm-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
image: "/wp-content/uploads/2024/03/15-monitoring-up-up.png"
schemaType: "TechArticle"
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