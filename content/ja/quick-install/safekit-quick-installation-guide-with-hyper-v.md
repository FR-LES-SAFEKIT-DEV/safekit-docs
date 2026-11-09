---
title: "SafeKit による Hyper-V 高可用性：フェイルオーバー用の hyperv.safe モジュールをインストールする"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-hyper-v/"
description: "SafeKit を使用したアクティブ/アクティブ Hyper-V クラスターの hyperv.safe の構成について説明します。2 ノードのシェアードナッシングアーキテクチャで、VM レベルでの高可用性を実現します。や共有ストレージのコストなしに、自動フェイルオーバーのために複数の VM をノード間 SAN 同期的にレプリケートします。"
category: "quick-install"
lang: "ja"
topics: "Hyper-V 高可用性クイックインストールガイド、SafeKit High Availability の制限事項、SafeKit/Hyper-V ソリューションの概要、Windows への SafeKit/Hyper-V ソリューションのインストール (hyperv.safe)、SafeKit/Hyper-V ソリューションのステップバイステップ設定、SafeKit/Hyper-V ソリューションのデモンストレーション、🔍 SafeKit を探索する"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# SafeKit による Hyper-V 高可用性：フェイルオーバー用の hyperv.safe モジュールをインストールする {#hyper-v-high-availability-with-safekit-install-the-hypervsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="Hyper-V" mod="hyperv"  %}}
 

## SafeKit/Hyper-V ソリューションの概要 {#overview-of-the-safekit--hyper-v-solution}

解決策はこちらで説明されています：**💡 [共有ストレージ (SAN) なしで Hyper-V 高可用性を実現する簡単な方法](</ja/solutions/hyper-v-replication-automatic-failover-load-balancing/>)**

## Windows への SafeKit/Hyper-V ソリューションのインストール (hyperv.safe) {#installation-of-the-safekit--hyper-v-solution-on-windows-hypervsafe}

### 前提条件 {#prerequisites}

  * Hyper-V 役割は、2 つの Windows ノードにインストールされています（PC 用 Windows を含むすべての Windows バージョンに無料で組み込まれています）。
  * 1 つ以上の仮想マシンにインストールされた重要なアプリケーション。
  * Hyper-V ホストあたり最大 32 台の仮想マシン。
  * レプリケートされるデータの総量は数テラバイトに制限されます。これを超えると、再同期に要する時間が長くなります。
  * ノード間の相互接続は最低 1Gb/s（より高速な再同期のためには 10Gb/s を推奨）。
  * IP フェイルオーバーには、同じ LAN または拡張 LAN（L2）上の両方のノードが必要です。ルーティングされた L3 ネットワークはサポートされていません（🛠️ [クラウドロードバランサー](</ja/resources/safekit-user-guide-82/#Cloud>)を除く）。



{{%  insert-safekit-siemens-license-ja  %}}

{{%  insert-safekit-installation-package-windows-ja app="Hyper-V" mod="hyperv"  %}}

{{%  insert-safekit-82-installation-module-windows-ja app="Hyper-V" mod="hyperv"  %}}
 

## SafeKit/Hyper-V ソリューションのステップバイステップ設定 {#step-by-step-configuration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-82-hyper-v-configuration-ja app="Hyper-V" mod="hyperv"  %}}
 

## SafeKit/Hyper-V ソリューションのデモンストレーション {#demonstration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-hyperv-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}