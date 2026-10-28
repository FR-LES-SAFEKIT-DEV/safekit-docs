---
title: "OracleとSafeKitによる高可用性：フェイルオーバーのためにoracle.safeモジュールをインストールしてください"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-oracle/"
description: "SafeKitにoracle.safeモジュールをデプロイして、 WindowsおよびLinux上でOracleの同期リアルタイムレプリケーションと自動フェイルオーバーを有効にします。このガイドでは、共有ストレージを使用せずに、重要なアプリケーション向けに 2 ノードの SAN レス クラスタをセットアップする手順を説明します。"
category: "quick-install"
lang: "ja"
topics: "Oracleの高可用性クイックインストールガイド、 SafeKitの高可用性制限、 SafeKit / Oracleソリューションの概要、 SafeKitおよびOracle ( oracle.safe ) へのWindows / Linuxソリューションのインストール、 SafeKit / Oracleソリューションのステップバイステップ構成、 SafeKit mirrorソリューションのデモ、🔍 SafeKit高可用性ナビゲーションハブ"
---

# Oracle高可用性とSafeKit : フェイルオーバーのためにoracle.safeモジュールをインストールしてください{#oracle-high-availability-with-safekit-install-the-oraclesafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="Oracle" mod="oracle"  %}}
 

## SafeKit / Oracleソリューションの概要{#overview-of-the-safekit--oracle-solution}

解決策はここに記載されています: ** 💡 [最もシンプルなOracle高可用性: 2 ノード同期レプリケーションとフェイルオーバー](</solutions/oracle-high-availability-synchronous-replication-failover/>) ** 。

## SafeKit / OracleソリューションをWindowsおよびLinux ( oracle.safe ) {#installation-of-the-safekit--oracle-solution-on-windows-and-linux-oraclesafe}にインストールします。

### 前提条件{#prerequisites}

  * Oracle 2つのノード（仮想マシンまたは物理サーバー）にインストールする必要があります。



{{%  insert-safekit-installation-package-windows-ja app="Oracle" mod="oracle"  %}}

{{%  insert-safekit-82-installation-module-windows-ja app="Oracle" mod="oracle"  %}}

{{%  insert-safekit-installation-package-linux-ja app="Oracle" mod="oracle"  %}}

{{%  insert-safekit-82-installation-module-linux-ja app="Oracle" mod="oracle"  %}}
 

## SafeKit / Oracleソリューション{#step-by-step-configuration-of-the-safekit--oracle-solution}の段階的な構成


{{%  insert-safekit-82-configuration-ja app="Oracle" mod="oracle"  %}}
 

## SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}のソリューションのデモンストレーション


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}