---
title: "NGINXネットワーク負荷分散とフェイルオーバー： SafeKit farm.safeモジュールをインストールします"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-nginx-with-network-load-balancing-and-failover/"
description: "NGINXネットワーク負荷分散と自動フェイルオーバーのために、 WindowsとLinuxにfarm.safeモジュールをデプロイする方法を学びましょう。このガイドでは、外部ハードウェア負荷分散装置や複雑な設定を必要とせずに、仮想IPを使用してWebサービスやアプリケーション向けの高可用性クラスタを構築する方法を説明します。"
category: "quick-install"
lang: "ja"
topics: "NGINX の高可用性クイックインストールガイド、 SafeKit高可用性の制限事項、 SafeKit / NGINX ソリューションの概要、 SafeKitおよびLinux ( farm.safe ) へのWindows / NGINX ソリューションのインストール、 SafeKit / NGINX ソリューションのステップバイステップ構成、 SafeKit `farm`ソリューションのデモ、🔍 SafeKit高可用性ナビゲーションハブ"
---

# NGINXネットワーク負荷分散とフェイルオーバー： SafeKit farm.safe {#nginx-network-load-balancing--failover-install-the-safekit-farmsafe-module}モジュールをインストールします


{{%  insert-safekit-farm-guide-ja app="NGINX" mod="farm"  %}}
 

## SafeKit / NGINX ソリューションの概要{#overview-of-the-safekit--nginx-solution}

ソリューションはここに記載されています: ** 💡 [ SafeKit : オールインワン NGINX ロードバランシングおよび高可用性ソフトウェア](</solutions/nginx-the-simplest-load-balancing-cluster-with-failover/>) ** 。

## SafeKit / NGINX ソリューションをWindowsおよびLinux ( farm.safe ) {#installation-of-the-safekit--nginx-solution-on-windows-and-linux-farmsafe}にインストールします。

### 前提条件{#prerequisites}

  * NGINXは2つ以上のノード（仮想マシンまたは物理サーバー）にインストールする必要があります。



{{%  insert-safekit-installation-package-windows-ja app="NGINX" mod="farm"  %}}

{{%  insert-safekit-installation-package-linux-ja app="NGINX" mod="farm"  %}}
 

注：設定する汎用モジュール**farm.safe**は、パッケージ内に同梱されています。

## SafeKit / NGINX ソリューション{#step-by-step-configuration-of-the-safekit--nginx-solution}の段階的な設定


{{%  insert-safekit-82-farm-configuration-ja app="NGINX" mod="farm"  %}}
 

## SafeKit `farm` {#demonstration-of-the-safekit-farm-solution}のソリューションのデモンストレーション


{{%  insert-safekit-farm-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}