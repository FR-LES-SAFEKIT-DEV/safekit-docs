---
title: "IIS ネットワーク負荷分散とフェイルオーバー：SafeKit iis_farm.safe モジュールのインストール"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-iis-with-network-load-balancing-and-failover/"
description: "手順ガイド：Windows に SafeKit の iis_farm.safe モジュールを導入し、仮想 IP で IIS Web サーバーのネットワーク負荷分散とフェイルオーバーを実現。"
category: "quick-install"
lang: "ja"
topics: "IIS 高可用性クイックインストールガイド、SafeKit High Availability の制限事項、SafeKit/IIS ソリューションの概要、Windows への SafeKit/IIS ソリューションのインストール (iis_farm.safe)、SafeKit/IIS ソリューションのステップバイステップ設定、SafeKit farm ソリューションのデモンストレーション、🔍 SafeKit を探索する"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
image: "/wp-content/uploads/2024/03/15-monitoring-up-up.png"
schemaType: "TechArticle"
---

# IIS ネットワーク負荷分散とフェイルオーバー：SafeKit iis_farm.safe モジュールのインストール {#iis-network-load-balancing--failover-install-the-safekit-iis_farmsafe-module}


{{%  insert-safekit-farm-guide-ja app="IIS" mod="iis_farm"  %}}
 

## SafeKit/IIS ソリューションの概要 {#overview-of-the-safekit--iis-solution}

ソリューションについては、こちらで説明しています。**💡 [SafeKit オールインワン IIS ロードバランシング＆高可用性ソフトウェア](</ja/solutions/iis-load-balancing-failover/>)**。

## Windows への SafeKit/IIS ソリューションのインストール (iis_farm.safe) {#installation-of-the-safekit--iis-solution-on-windows-iis_farmsafe}

### 前提条件 {#prerequisites}

  * 2 つ以上のノード（仮想マシンまたは物理サーバー）に IIS をインストールする必要があります。



{{%  insert-safekit-installation-package-windows-ja app="IIS" mod="iis_farm"  %}}

{{%  insert-safekit-82-installation-module-windows-ja app="IIS" mod="iis_farm"  %}}
 

## SafeKit/IIS ソリューションのステップバイステップ設定 {#step-by-step-configuration-of-the-safekit--iis-solution}


{{%  insert-safekit-82-farm-configuration-ja app="IIS" mod="iis_farm"  %}}
 

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> ソリューションのデモンストレーション {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ja  %}}

{{%  insert-safekit-hub-ja app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-ja  %}}