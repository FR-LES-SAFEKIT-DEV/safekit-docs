---
title: "SafeKit による KVM 高可用性：フェイルオーバー用の kvm.safe モジュールをインストールする"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-kvm/"
description: "SafeKit を使用したアクティブ/アクティブ KVM クラスター向けに kvm.safe を設定する方法について説明します。2 ノードのシェアードナッシングアーキテクチャで、VM レベルでの高可用性を実現します。や共有ストレージのコストをかけずに、複数の VM をノード間で同期レプリケートし SAN 自動フェイルオーバーを実現します。"
category: "quick-install"
lang: "ja"
topics: "KVM 向け高可用性クイックインストールガイド、SafeKit High Availability の制限事項、SafeKit/KVM ソリューションの概要、Linux への SafeKit/KVM ソリューションのインストール (kvm.safe)、SafeKit/KVM ソリューションのステップバイステップ設定、VM レベルの高可用性ソリューションのデモンストレーション、🔍 SafeKit を探索する"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# SafeKit による KVM 高可用性：フェイルオーバー用の kvm.safe モジュールをインストールする {#kvm-high-availability-with-safekit-install-the-kvmsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="KVM" mod="kvm"  %}}
 

## SafeKit/KVM ソリューションの概要 {#overview-of-the-safekit--kvm-solution}

解決策はこちらで説明されています：**💡 [共有ストレージなしで実現するシンプルな Linux KVM 高可用性](</ja/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)**

## Linux への SafeKit/KVM ソリューションのインストール (kvm.safe) {#installation-of-the-safekit--kvm-solution-on-linux-kvmsafe}

### 前提条件 {#prerequisites}

  * 2 台の Linux ノードに KVM をインストールしました。
  * 1 つ以上の仮想マシンにインストールされた重要なアプリケーション。
  * KVM ホストあたり最大 32 台の仮想マシン。
  * レプリケートされるデータの総量は数テラバイトに制限されます。これを超えると、再同期に要する時間が長くなります。
  * ノード間の相互接続は最低 1Gb/s（より高速な再同期のためには 10Gb/s を推奨）。
  * IP フェイルオーバーには、同じ LAN または拡張 LAN（L2）上の両方のノードが必要です。ルーティングされた L3 ネットワークはサポートされていません（🛠️ [クラウドロードバランサー](</ja/resources/safekit-user-guide-82/#Cloud>)を除く）。



{{%  insert-safekit-installation-package-linux-ja app="KVM" mod="kvm"  %}}

{{%  insert-safekit-82-installation-module-linux-ja app="KVM" mod="kvm"  %}}
 

## SafeKit/KVM ソリューションのステップバイステップ設定 {#step-by-step-configuration-of-the-safekit--kvm-solution}


{{%  insert-safekit-82-kvm-configuration-ja app="KVM" mod="kvm"  %}}
 

## VM レベルの高可用性ソリューションのデモンストレーション {#demonstration-of-a-vm-level-high-availability-solution}


{{%  insert-safekit-hyperv-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}