---
title: "SafeKit のインストール：Linux の負荷分散"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-network-load-balancing-and-failover/"
description: "手順ガイド：Linux に SafeKit の farm.safe モジュールを導入し、仮想 IP でアプリケーションのネットワーク負荷分散とフェイルオーバーを実現。"
category: "quick-install"
lang: "ja"
topics: "Linux の高可用性クイックインストールガイド, SafeKit High Availability の制限事項, SafeKit/Linux ソリューションの概要, SafeKit/Linux ソリューション (farm.safe) のインストール, SafeKit/Linux ソリューションのステップバイステップ設定, SafeKit farm ソリューションのデモンストレーション"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--linux-solution, installation-of-the-safekit--linux-solution-farmsafe, step-by-step-configuration-of-the-safekit--linux-solution, demonstration-of-the-safekit-farm-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
image: "/wp-content/uploads/2024/03/15-monitoring-up-up.png"
schemaType: "TechArticle"
---

# SafeKit のインストール：Linux の負荷分散 {#install-safekit-for-linux-load-balancing}


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