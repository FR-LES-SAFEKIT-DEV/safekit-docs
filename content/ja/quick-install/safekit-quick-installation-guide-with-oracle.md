---
title: "SafeKit による Oracle 高可用性：フェイルオーバー用の oracle.safe モジュールをインストールする"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-oracle/"
description: "手順ガイド：SafeKit の oracle.safe モジュールを導入し、Windows または Linux 上の Oracle のリアルタイムレプリケーションと自動フェイルオーバーを実現。"
category: "quick-install"
lang: "ja"
topics: "SafeKit/Oracle ソリューションの概要, Windows および Linux への SafeKit/Oracle ソリューションのインストール (oracle.safe), SafeKit/Oracle ソリューションのステップバイステップ設定, SafeKit mirror ソリューションのデモンストレーション"
hashpart: "overview-of-the-safekit--oracle-solution, installation-of-the-safekit--oracle-solution-on-windows-and-linux-oraclesafe, step-by-step-configuration-of-the-safekit--oracle-solution, demonstration-of-the-safekit-mirror-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# SafeKit による Oracle 高可用性：フェイルオーバー用の oracle.safe モジュールをインストールする {#oracle-high-availability-with-safekit-install-the-oraclesafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="Oracle" mod="oracle"  %}}
 

## SafeKit/Oracle ソリューションの概要 {#overview-of-the-safekit--oracle-solution}

解決策はこちらで説明されています：**💡 [最もシンプルな Oracle 高可用性：2 ノード同期レプリケーションとフェイルオーバー](</ja/solutions/oracle-high-availability-synchronous-replication-failover/>)**。

## Windows および Linux への SafeKit/Oracle ソリューションのインストール (oracle.safe) {#installation-of-the-safekit--oracle-solution-on-windows-and-linux-oraclesafe}

### 前提条件 {#prerequisites}

  * 2 つのノード（仮想マシンまたは物理サーバー）に Oracle をインストールする必要があります。



{{%  insert-safekit-installation-package-windows-ja app="Oracle" mod="oracle"  %}}

{{%  insert-safekit-82-installation-module-windows-ja app="Oracle" mod="oracle"  %}}

{{%  insert-safekit-installation-package-linux-ja app="Oracle" mod="oracle"  %}}

{{%  insert-safekit-82-installation-module-linux-ja app="Oracle" mod="oracle"  %}}
 

## SafeKit/Oracle ソリューションのステップバイステップ設定 {#step-by-step-configuration-of-the-safekit--oracle-solution}


{{%  insert-safekit-82-configuration-ja app="Oracle" mod="oracle"  %}}
 

## SafeKit mirror ソリューションのデモンストレーション {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}