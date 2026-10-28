---
title: "SafeKitを使用したKVM高可用性：フェイルオーバー用のkvm.safeモジュールをインストールします"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-kvm/"
description: "SafeKitを使用したアクティブ/アクティブKVMクラスタ用のkvm.safeの構成について説明します。2ノードの共有なしアーキテクチャにより、VMレベルで高可用性を実現します。SANや共有ストレージのコストをかけずに、複数のVMをノード間で同期レプリケートして、自動フェイルオーバーを実現します。"
category: "quick-install"
lang: "ja"
topics: "KVMの高可用性クイックインストールガイド、SafeKit高可用性制限、SafeKit/KVMソリューションの概要、LinuxへのSafeKit/KVMソリューションのインストール（ kvm.safe ）、SafeKit/KVMソリューションの段階的な構成、VMレベルの高可用性ソリューションのデモンストレーション、🔍SafeKit高可用性ナビゲーションハブ"
---

# SafeKit による KVM 高可用性：フェイルオーバー用 kvm.safe モジュールをインストール {#kvm-high-availability-with-safekit-install-the-kvmsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="KVM" mod="kvm"  %}}
 

## SafeKit / KVM ソリューションの概要 {#overview-of-the-safekit--kvm-solution}

解決策の詳細はこちら：**💡[共有ストレージを使用しないシンプルなLinux KVM高可用性](</ja/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)**

## Linux 上に SafeKit / KVM ソリューションをインストール (kvm.safe) {#installation-of-the-safekit--kvm-solution-on-linux-kvmsafe}

### 前提条件 {#prerequisites}

  * KVM が 2 台の Linux ノードにインストールされています。
  * 1 つ以上の仮想マシン内にインストールされた重要なアプリケーション。
  * KVM ホストあたり最大 32 台の仮想マシンをサポートします。
  * 複製されるデータの合計は数テラバイトに制限されており、これを超えると再同期にかかる時間が大幅に長くなります。
  * ノード間の相互接続は最低 1Gb/秒 (再同期を高速化するには 10Gb/秒を推奨)。
  * IP フェイルオーバーには、両方のノードが同じ LAN または拡張 LAN (L2) 上にある必要があります。ルーティングされた L3 ネットワークはサポートされません（🛠️ [クラウドロードバランサー](</ja/resources/safekit-user-guide-82/#Cloud>)を使用する場合を除く）。



{{%  insert-safekit-installation-package-linux-ja app="KVM" mod="kvm"  %}}

{{%  insert-safekit-82-installation-module-linux-ja app="KVM" mod="kvm"  %}}
 

## のステップバイステップ構成SafeKit/KVMソリューション {#step-by-step-configuration-of-the-safekit--kvm-solution}


{{%  insert-safekit-82-kvm-configuration-ja app="KVM" mod="kvm"  %}}
 

## VMレベルの高可用性ソリューションのデモンストレーション {#demonstration-of-a-vm-level-high-availability-solution}


{{%  insert-safekit-hyperv-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}