---
title: "NGINX ネットワーク負荷分散とフェイルオーバー：SafeKit farm.safe モジュールのインストール"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-nginx-with-network-load-balancing-and-failover/"
description: "NGINX ネットワーク負荷分散と自動フェイルオーバーのために、Windows および Linux で farm.safe モジュールをデプロイする方法を学びます。このガイドでは、外部ハードウェアロードバランサーや複雑な設定を必要とせずに、仮想 IP を使用して Web サービスおよびアプリケーションの高可用性クラスターを構築する方法を説明します。"
category: "quick-install"
lang: "ja"
topics: "NGINX 高可用性クイックインストールガイド、SafeKit High Availability の制限事項、SafeKit/NGINX ソリューションの概要、Windows および Linux への SafeKit/NGINX ソリューションのインストール (farm.safe)、SafeKit/NGINX ソリューションのステップバイステップ設定、SafeKit farm ソリューションのデモンストレーション、🔍 SafeKit を探索する"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# NGINX ネットワーク負荷分散とフェイルオーバー：SafeKit farm.safe モジュールのインストール {#nginx-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-ja app="NGINX" mod="farm"  %}}
 

## SafeKit/NGINX ソリューションの概要 {#overview-of-the-safekit--nginx-solution}

ソリューションについては、こちらで説明しています。**💡 [SafeKit オールインワンの NGINX ロードバランシング＆高可用性ソフトウェア](</ja/solutions/nginx-the-simplest-load-balancing-cluster-with-failover/>)**。

## Windows および Linux への SafeKit/NGINX ソリューションのインストール (farm.safe) {#installation-of-the-safekit--nginx-solution-on-windows-and-linux-farmsafe}

### 前提条件 {#prerequisites}

  * 2 つ以上のノード（仮想マシンまたは物理サーバー）に NGINX インストールする必要があります。



{{%  insert-safekit-installation-package-windows-ja app="NGINX" mod="farm"  %}}

{{%  insert-safekit-installation-package-linux-ja app="NGINX" mod="farm"  %}}
 

注：設定する汎用 **farm.safe** モジュールは、パッケージ内に同梱されています。

## SafeKit/NGINX ソリューションのステップバイステップ設定 {#step-by-step-configuration-of-the-safekit--nginx-solution}


{{%  insert-safekit-82-farm-configuration-ja app="NGINX" mod="farm"  %}}
 

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> ソリューションのデモンストレーション {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}