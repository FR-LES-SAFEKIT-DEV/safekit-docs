---
title: "SafeKitによるクラウド高可用性：フェイルオーバーのためにmirror.safeモジュールをインストールしてください"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-in-cloud-with-real-time-replication-and-failover/"
description: "SafeKit用のmirror.safeモジュールをクラウドにデプロイして、 WindowsおよびLinuxで同期リアルタイムレプリケーションと自動フェイルオーバーを有効にします。このガイドでは、共有ストレージを使用しない重要なアプリケーション向けに、2 ノードの共有なしクラスタをセットアップする手順を説明します。"
category: "quick-install"
lang: "ja"
topics: "クラウド向け高可用性クイックインストールガイド、 SafeKit高可用性の制限事項、 SafeKit / クラウドmirrorソリューションの概要、 SafeKitおよびLinux ( mirror.safe ) へのWindows / クラウドmirrorソリューションのインストール、 SafeKit / クラウドmirrorソリューションのステップバイステップ構成、 SafeKit mirrorソリューションのデモ、🔍 SafeKit高可用性ナビゲーションハブ"
---

# SafeKitを使用したクラウド高可用性:フェイルオーバー用にmirror.safeモジュールをインストールしてください {#cloud-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="Cloud" mod="mirror"  %}}
 

## SafeKit / クラウドmirrorソリューションの概要 {#overview-of-the-safekit--cloud-mirror-solution}

ソリューションはここに記載されています: ** 💡 [クラウド非依存の高可用性: SafeKit同期レプリケーションとフェイルオーバー](</solutions/cloud-high-availability-cluster-synchronous-replication-failover/>) ** 。

## SafeKit / Cloud mirrorソリューションをWindowsおよびLinux ( mirror.safe )にインストールします。 {#installation-of-the-safekit--cloud-mirror-solution-on-windows-and-linux-mirrorsafe}

### クラウドロードバランサーの設定 {#configuration-of-the-cloud-load-balancer}

仮想IPアドレスを実装する場合は、ロードバランサーを設定する必要があります。  
また、ロードバランサーは、ノードに対して定期的にヘルスチェックパケットを送信するように設定する必要があります。  
そのため、 SafeKitノード内部で実行されるヘルスチェックを提供し、

  * mirrorモジュールの状態がPRIM（緑色）またはALONE（緑色）の場合、OKを返します。
  * 他のすべての州では「見つかりません」と表示されます。


クラウドロードバランサーは以下のように設定する必要があります。

  * HTTPプロトコル
  * ポート9010、 SafeKitウェブサーバーポート
  * URL /var/modules/mirror/ready.txt （ mirrorが後でデプロイするモジュール名である場合）


⚠️ 下記の手順設定のステップ4では、仮想IPアドレスを設定しないでください。仮想IPアドレスは既にクラウドロードバランサーに設定されています。ステップ4で仮想IPを設定するのは、オンプレミス環境での設定にのみ有効です。

### クラウドネットワークセキュリティの設定 {#configuration-of-the-cloud-network-security}

ネットワークセキュリティは、以下のプロトコルとポートでの通信を有効にするように構成する必要があります。

  * UDP - safeadminサービス用ポート4800（ SafeKitノード間）
  * UDP - モジュールハートビート用ポート8888（ SafeKitノード間）
  * TCP – モジュールのリアルタイムファイルレプリケーション用ポート5600（ SafeKitノード間）
  * TCP – ロードバランサーのヘルスチェックと、HTTPモードで動作するSafeKit Webコンソール用に9010番ポートを使用します。
  * TCP – 9001 コンソールの HTTPS モードを設定する
  * TCP – HTTPSモードで動作するSafeKitウェブコンソール用の9453番ポート



{{%  insert-safekit-installation-package-windows-ja app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-ja app="" mod="mirror"  %}}
 

注：設定する汎用モジュール**mirror.safe**は、パッケージ内に同梱されています。

## SafeKit / Cloud mirrorソリューションの段階的な構成 {#step-by-step-configuration-of-the-safekit--cloud-mirror-solution}


{{%  insert-safekit-82-configuration-ja app="Windows" mod="mirror"  %}}
 

## SafeKit mirrorのソリューションのデモンストレーション {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}