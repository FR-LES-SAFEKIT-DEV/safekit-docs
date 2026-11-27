---
title: "Apache ネットワーク負荷分散とフェイルオーバー：SafeKit apachefarm.safe モジュールのインストール"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/"
description: "手順ガイド：Windows または Linux に SafeKit の apache_farm.safe モジュールを導入し、Apache サーバーの負荷分散とフェイルオーバーを実現。"
category: "quick-install"
lang: "ja"
topics: "Apache の高可用性クイックインストールガイド, SafeKit High Availability の制限事項, SafeKit/Apache ソリューションの概要, Windows および Linux への SafeKit/Apache ソリューションのインストール (apachefarm.safe), SafeKit/Apache ソリューションのステップバイステップ設定, SafeKit farm ソリューションのデモンストレーション"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--apache-solution, installation-of-the-safekit--apache-solution-on-windows-and-linux-apache_farmsafe, step-by-step-configuration-of-the-safekit--apache-solution, demonstration-of-the-safekit-farm-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
image: "/wp-content/uploads/2024/03/15-monitoring-up-up.png"
schemaType: "TechArticle"
---

# Apache ネットワーク負荷分散とフェイルオーバー：SafeKit apache_farm.safe モジュールのインストール {#apache-network-load-balancing--failover-install-the-safekit-apache_farmsafe-module}


{{%  insert-safekit-farm-guide-ja app="Apache" mod="apache_farm"  %}}
 

## SafeKit/Apache ソリューションの概要 {#overview-of-the-safekit--apache-solution}

ソリューションについては、こちらで説明しています。**💡 [SafeKit オールインワンの Apache ロードバランシング＆高可用性ソフトウェア](</ja/solutions/apache-load-balancing-failover-2/>)**。

## Windows および Linux への SafeKit/Apache ソリューションのインストール (apache_farm.safe) {#installation-of-the-safekit--apache-solution-on-windows-and-linux-apache_farmsafe}

### 前提条件 {#prerequisites}

  * 2 つ以上のノード（仮想マシンまたは物理サーバー）に Apache をインストールする必要があります。



{{%  insert-safekit-installation-package-windows-ja app="Apache" mod="apache_farm"  %}}

{{%  insert-safekit-82-installation-module-windows-ja app="Apache" mod="apache_farm"  %}}

{{%  insert-safekit-installation-package-linux-ja app="Apache" mod="apache_farm"  %}}

{{%  insert-safekit-82-installation-module-linux-ja app="Apache" mod="apache_farm"  %}}
 

## SafeKit/Apache ソリューションのステップバイステップ設定 {#step-by-step-configuration-of-the-safekit--apache-solution}


{{%  insert-safekit-82-farm-configuration-ja app="Apache" mod="apache_farm"  %}}
 

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> ソリューションのデモンストレーション {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ja  %}}

{{%  insert-safekit-hub-ja app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-ja  %}}