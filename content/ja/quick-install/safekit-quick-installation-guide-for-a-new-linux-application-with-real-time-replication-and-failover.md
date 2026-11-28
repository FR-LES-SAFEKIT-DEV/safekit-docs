---
title: "SafeKit のインストール：Linux の高可用性"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover/"
description: "手順ガイド：Linux に SafeKit の mirror.safe モジュールを導入し、2 台のサーバーでアプリケーションのリアルタイムレプリケーションと自動フェイルオーバーを実現。"
category: "quick-install"
lang: "ja"
topics: "Linux の高可用性クイックインストールガイド, SafeKit High Availability の制限事項, SafeKit/Linux ソリューションの概要, SafeKit/Linux ソリューションのインストール (mirror.safe), SafeKit/Linux ソリューションのステップバイステップ設定, SafeKit mirror ソリューションのデモンストレーション"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--linux-solution, installation-of-the-safekit--linux-solution-mirrorsafe, step-by-step-configuration-of-the-safekit--linux-solution, demonstration-of-the-safekit-mirror-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# SafeKit のインストール：Linux の高可用性 {#install-safekit-for-linux-high-availability}


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