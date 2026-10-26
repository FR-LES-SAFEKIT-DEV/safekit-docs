---
title: "SafeKit を使用した Hyper-V 高可用性: フェールオーバー用の hyperv.safe モジュールをインストールする"
canonical: https://safekit.eviden.com/ja/ja/quick-install/safekit-quick-installation-guide-with-hyper-v/
description: SafeKit を使用したアクティブ/アクティブ Hyper-V クラスターの hyperv.safe の構成について説明します。 2
  ノードのシェアードナッシング アーキテクチャにより、VM レベルで高可用性を実現します。 SAN
  や共有ストレージのコストをかけずに、自動フェイルオーバーのために複数の VM をノード間で同期的にレプリケートします。
category: quick-install
lang: ja
topics: Hyper-V の高可用性クイック インストール ガイド、SafeKit 高可用性の制限、SafeKit / Hyper-V
  ソリューションの概要、Windows への SafeKit / Hyper-V ソリューションのインストール (hyperv.safe)、SafeKit /
  Hyper-V ソリューションのステップバイステップの構成、SafeKit / Hyper-V ソリューションのデモ、🔍 SafeKit High
  Availability Navigation Hub
---

# Hyper-V SafeKit による高可用性: フェイルオーバー用の hyperv.safe モジュールのインストール {#hyper-v-high-availability-with-safekit-install-the-hypervsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="Hyper-V" mod="hyperv"  %}}
 

## SafeKit / Hyper-V ソリューションの概要 {#overview-of-the-safekit--hyper-v-solution}

解決策はここで説明されています。 **💡[シンプル Hyper-V 共有ストレージ (SAN) を使用しない高可用性](</ja/solutions/hyper-v-replication-automatic-failover-load-balancing/>)**

## のインストール SafeKit / Hyper-V 解決策 Windows (hyperv.safe) {#installation-of-the-safekit--hyper-v-solution-on-windows-hypervsafe}

### 前提条件 {#prerequisites}

  * Hyper-V 2 にインストールされた役割 Windows ノード (すべてに無料で埋め込まれています) Windows を含むバージョン Windows PC用）。
  * 1 つ以上の仮想マシン内にインストールされた重要なアプリケーション。
  * Hyper-V ホストあたり最大 32 の仮想マシン。
  * 複製されるデータの合計は数テラバイトに制限されており、これを超えると再同期にかかる時間が大幅に長くなります。
  * ノード間の相互接続は最低 1Gb/秒 (再同期を高速化するには 10Gb/秒を推奨)。
  * IP フェイルオーバーには、同じ LAN または拡張 LAN (L2) 上の両方のノードが必要です。ルーティングされた L3 ネットワークはサポートされていません (🛠️ [クラウド ロード バランサー ](</resources/safekit-user-guide-82/#Cloud>)] を除く)。



{{%  insert-safekit-siemens-license-ja  %}}

{{%  insert-safekit-installation-package-windows-ja app="Hyper-V" mod="hyperv"  %}}

{{%  insert-safekit-82-installation-module-windows-ja app="Hyper-V" mod="hyperv"  %}}
 

## SafeKit / Hyper-V ソリューションの段階的な構成 {#step-by-step-configuration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-82-hyper-v-configuration-ja app="Hyper-V" mod="hyperv"  %}}
 

## SafeKit / Hyper-V ソリューションのデモンストレーション {#demonstration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-hyperv-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}