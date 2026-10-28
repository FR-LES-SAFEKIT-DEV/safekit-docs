---
title: "GCPとSafeKitによる高可用性：フェイルオーバーのためにmirror.safeモジュールをインストールしてください"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-in-gcp-with-real-time-replication-and-failover/"
description: "WindowsおよびGCPで同期リアルタイムレプリケーションと自動フェイルオーバーを有効にするには、 SafeKit用のmirror.safeモジュールをLinuxにデプロイします。このガイドでは、共有ストレージを使用しない重要なアプリケーション向けの 2 ノード共有なしクラスタの設定手順を説明します。"
category: "quick-install"
lang: "ja"
topics: "GCPの高可用性クイックインストールガイド、 SafeKitの高可用性制限、 SafeKit / GCP mirrorソリューションの概要、 SafeKitおよびLinux ( mirror.safe ) へのWindows / GCP mirrorソリューションのインストール、 SafeKit / GCP mirrorソリューションのステップバイステップ構成、 SafeKit mirrorソリューションのデモンストレーション、🔍 SafeKit高可用性ナビゲーションハブ"
---

# GCP高可用性とSafeKit : フェイルオーバーのためにmirror.safeモジュールをインストールしてください {#gcp-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="GCP" mod="mirror"  %}}
 

## SafeKit / GCP mirrorソリューションの概要 {#overview-of-the-safekit--gcp-mirror-solution}

ソリューションはここに記載されています: **💡 [ Google GCP高可用性: SafeKit同期レプリケーションとフェイルオーバー](</ja/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>)** 。

## SafeKit / GCP mirrorソリューションをWindowsおよびLinux ( mirror.safe )にインストールします。 {#installation-of-the-safekit--gcp-mirror-solution-on-windows-and-linux-mirrorsafe}

### Google GCPロードバランサーの設定 {#configuration-of-the-google-gcp-load-balancer}

仮想IPアドレスを実装する場合は、ロードバランサーを設定する必要があります。  
また、ロードバランサーは、ノードに対して定期的にヘルスチェックパケットを送信するように設定する必要があります。  
そのため、 SafeKitノード内部で実行されるヘルスチェックを提供し、

  * mirrorモジュールの状態がPRIM（緑色）またはALONE（緑色）の場合、OKを返します。
  * 他のすべての州では「見つかりません」と表示されます。


Google GCPロードバランサーを以下のように設定する必要があります。

  * HTTPプロトコル
  * ポート9010、 SafeKitウェブサーバーポート
  * URL /var/modules/mirror/ready.txt （ mirrorが後でデプロイするモジュール名である場合）


詳細については、Google GCPの構成を参照して[ ](<https://docs.cloud.google.com/load-balancing/docs/>) 


⚠️ 下記の手順4では、仮想IPアドレスを設定しないでください。仮想IPアドレスは、Google GCPロードバランサーに既に設定されています。手順4で仮想IPを設定するのは、オンプレミス環境での設定にのみ有効です。

### Googleネットワークセキュリティの設定GCP {#configuration-of-the-google-gcp-network-security}

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

## SafeKit / GCP mirrorソリューションの段階的な構成 {#step-by-step-configuration-of-the-safekit--gcp-mirror-solution}


{{%  insert-safekit-82-configuration-ja app="Windows" mod="mirror"  %}}
 

## SafeKit mirrorのソリューションのデモンストレーション {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}