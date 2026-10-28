---
title: "IISネットワーク負荷分散およびフェイルオーバー: SafeKit iis_farm.safeモジュールをインストールします"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-iis-with-network-load-balancing-and-failover/"
description: "IISネットワーク負荷分散と自動フェイルオーバーを実現するために、 Windowsにiis_farm.safeモジュールをデプロイする方法を学びましょう。このガイドでは、外部ハードウェア負荷分散装置や複雑な設定を必要とせずに、仮想IPを使用してWebサービスやアプリケーション向けの高可用性クラスタを構築する方法を説明します。"
category: "quick-install"
lang: "ja"
topics: "IISの高可用性クイックインストールガイド、 SafeKitの高可用性制限、 SafeKit / IISソリューションの概要、 Windows ( iis_farm.safe ) へのSafeKit / IISソリューションのインストール、 SafeKit / IISソリューションのステップバイステップ構成、 SafeKit `farm`ソリューションのデモ、🔍 SafeKit高可用性ナビゲーションハブ"
---

# IISネットワーク負荷分散とフェイルオーバー: SafeKit iis_farm.safeモジュールをインストールします {#iis-network-load-balancing--failover-install-the-safekit-iis_farmsafe-module}


{{%  insert-safekit-farm-guide-ja app="IIS" mod="iis_farm"  %}}
 

## SafeKit / IISソリューションの概要 {#overview-of-the-safekit--iis-solution}

ソリューションはここに記載されています: ** 💡 [ SafeKit : オールインワンIISロードバランシングおよび高可用性ソフトウェア](</ja/solutions/iis-load-balancing-failover/>) ** 。

## SafeKit / IISソリューションをWindows ( iis_farm.safe )にインストールします。 {#installation-of-the-safekit--iis-solution-on-windows-iis_farmsafe}

### 前提条件 {#prerequisites}

  * IISは、2つ以上のノード（仮想マシンまたは物理サーバー）にインストールされている必要があります。



{{%  insert-safekit-installation-package-windows-ja app="IIS" mod="iis_farm"  %}}

{{%  insert-safekit-82-installation-module-windows-ja app="IIS" mod="iis_farm"  %}}
 

## SafeKit / IISソリューションの段階的な構成 {#step-by-step-configuration-of-the-safekit--iis-solution}


{{%  insert-safekit-82-farm-configuration-ja app="IIS" mod="iis_farm"  %}}
 

## SafeKit `farm`のソリューションのデモンストレーション {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ja  %}}

{{%  insert-safekit-hub-ja app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-ja  %}}