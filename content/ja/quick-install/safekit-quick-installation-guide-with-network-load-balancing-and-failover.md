---
title: "Apacheネットワークの負荷分散とフェイルオーバー：SafeKit apache_farm.safeモジュールをインストールします"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/"
description: "WindowsおよびLinux上でApacheネットワーク負荷分散と自動フェイルオーバーを実現するために、apache_farm.safeモジュールをデプロイする方法を学びましょう。このガイドでは、外部ハードウェア負荷分散装置や複雑な設定を必要とせずに、仮想IPを使用してWebサービスやアプリケーション向けの高可用性クラスタを構築する方法を説明します。"
category: "quick-install"
lang: "ja"
topics: "Apache向け高可用性クイックインストールガイド、SafeKit高可用性の制限事項、SafeKit/Apacheソリューションの概要、WindowsおよびLinuxへのSafeKit/Apacheソリューションのインストール（apache_farm.safe）、SafeKit/Apacheソリューションのステップバイステップ構成、SafeKit farm ソリューションのデモ、🔍 SafeKit高可用性ナビゲーションハブ"
---

# Apacheネットワーク負荷分散とフェイルオーバー：SafeKit apache_farm.safeモジュールをインストールします {#apache-network-load-balancing--failover-install-the-safekit-apache_farmsafe-module}


{{%  insert-safekit-farm-guide-ja app="Apache" mod="apache_farm"  %}}
 

## SafeKit / Apacheソリューションの概要 {#overview-of-the-safekit--apache-solution}

解決策はここに記載されています: **💡[SafeKit: オールインワン Apache ロードバランシングおよび高可用性ソフトウェア](</ja/solutions/apache-load-balancing-failover-2/>)**。

## WindowsおよびLinuxへのSafeKit / Apacheソリューションのインストール（apache_farm.safe） {#installation-of-the-safekit--apache-solution-on-windows-and-linux-apache_farmsafe}

### 前提条件 {#prerequisites}

  * Apacheは2つ以上のノード（仮想マシンまたは物理サーバー）にインストールする必要があります。



{{%  insert-safekit-installation-package-windows-ja app="Apache" mod="apache_farm"  %}}

{{%  insert-safekit-82-installation-module-windows-ja app="Apache" mod="apache_farm"  %}}

{{%  insert-safekit-installation-package-linux-ja app="Apache" mod="apache_farm"  %}}

{{%  insert-safekit-82-installation-module-linux-ja app="Apache" mod="apache_farm"  %}}
 

## SafeKit / Apacheソリューションの段階的な設定 {#step-by-step-configuration-of-the-safekit--apache-solution}


{{%  insert-safekit-82-farm-configuration-ja app="Apache" mod="apache_farm"  %}}
 

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> ソリューションのデモンストレーション {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ja  %}}

{{%  insert-safekit-hub-ja app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-ja  %}}