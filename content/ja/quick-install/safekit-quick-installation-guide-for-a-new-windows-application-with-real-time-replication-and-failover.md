---
title: "SafeKit による Windows 高可用性：フェイルオーバー用の mirror.safe モジュールをインストールする"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/"
description: "SafeKit は用の mirror.safe モジュールをデプロイして、Windows で同期リアルタイムレプリケーションと自動フェイルオーバーを有効にします。このガイドでは、共有ストレージなしで、重要な Windows アプリケーション向けに 2 ノードの SANless クラスターをセットアップする手順を説明します。"
category: "quick-install"
lang: "ja"
topics: "Windows 向け高可用性クイックインストールガイド、SafeKit High Availability の制限事項、SafeKit/Windows ソリューションの概要、SafeKit/Windows ソリューションへのインストール (mirror.safe)、SafeKit/Windows ソリューションのステップバイステップ設定、SafeKit mirror ソリューションのデモンストレーション、🔍 SafeKit を探索する"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# SafeKit による Windows 高可用性：フェイルオーバー用の mirror.safe モジュールをインストールする {#windows-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="Windows" mod="mirror"  %}}
 

## SafeKit/Windows ソリューションの概要 {#overview-of-the-safekit--windows-solution}

解決策はこちらで説明されています。**💡 [シンプルな Windows 高可用性：2 ノード同期レプリケーションとフェイルオーバー](</ja/solutions/windows-high-availability-software-synchronous-replication-failover/>)**

## SafeKit/Windows ソリューションへのインストール (mirror.safe) {#installation-on-the-safekit--windows-solutions-mirrorsafe}

### 前提条件 {#prerequisites}

  * SafeKit で再起動したいアプリケーションを、2 つのノード（仮想マシンまたは物理サーバー）にインストールする必要があります。



{{%  insert-safekit-installation-package-windows-ja app="" mod="mirror"  %}}
 

注：設定する汎用 **mirror.safe** モジュールは、パッケージ内に同梱されています。

## SafeKit/Windows ソリューションのステップバイステップ設定 {#step-by-step-configuration-of-the-safekit--windows-solution}


{{%  insert-safekit-82-configuration-ja app="Windows" mod="mirror"  %}}
 

## SafeKit mirror ソリューションのデモンストレーション {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-ja  %}}