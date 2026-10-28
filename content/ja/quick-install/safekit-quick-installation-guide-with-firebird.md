---
title: "FirebirdとSafeKitによる高可用性：フェイルオーバーのためにfirebird.safeモジュールをインストールしてください"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-firebird/"
description: "SafeKitにfirebird.safeモジュールをデプロイして、 WindowsおよびLinux上でFirebirdの同期リアルタイムレプリケーションと自動フェイルオーバーを有効にします。このガイドでは、共有ストレージを使用せずに、重要なアプリケーション向けに 2 ノードの SAN レス クラスタをセットアップする手順を説明します。"
category: "quick-install"
lang: "ja"
topics: "Firebirdの高可用性クイックインストールガイド、 SafeKitの高可用性制限、 SafeKit / Firebirdソリューションの概要、 SafeKitおよびFirebird ( firebird.safe ) へのWindows / Linuxソリューションのインストール、 SafeKit / Firebirdソリューションのステップバイステップ構成、 SafeKit mirrorソリューションのデモ、🔍 SafeKit高可用性ナビゲーションハブ"
---

# Firebird高可用性とSafeKit : フェイルオーバーのためにfirebird.safeモジュールをインストールしてください{#firebird-high-availability-with-safekit-install-the-firebirdsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="Firebird" mod="firebird"  %}}
 

## SafeKit / Firebirdソリューションの概要{#overview-of-the-safekit--firebird-solution}

解決策はここに記載されています: ** 💡 [最もシンプルなFirebird高可用性: 2 ノード同期レプリケーションとフェイルオーバー](</solutions/firebird-high-availability-synchronous-replication-failover/>) ** 。

## SafeKit / FirebirdソリューションをWindowsおよびLinux ( firebird.safe ) {#installation-of-the-safekit--firebird-solution-on-windows-and-linux-firebirdsafe}にインストールします。

### 前提条件{#prerequisites}

  * Firebird 2つのノード（仮想マシンまたは物理サーバー）にインストールする必要があります。



{{%  insert-safekit-installation-package-windows-ja app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-82-installation-module-windows-ja app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-installation-package-linux-ja app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-82-installation-module-linux-ja app="Firebird" mod="firebird"  %}}
 

## SafeKit / Firebirdソリューション{#step-by-step-configuration-of-the-safekit--firebird-solution}の段階的な構成


{{%  insert-safekit-82-configuration-ja app="Firebird" mod="firebird"  %}}
 

## SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}のソリューションのデモンストレーション


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}