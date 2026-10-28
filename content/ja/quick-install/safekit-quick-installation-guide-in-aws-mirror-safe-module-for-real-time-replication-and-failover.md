---
title: "AWSとSafeKitによる高可用性：フェイルオーバーのためにmirror.safeモジュールをインストールしてください"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-in-aws-mirror-safe-module-for-real-time-replication-and-failover/"
description: "WindowsおよびAWSで同期リアルタイムレプリケーションと自動フェイルオーバーを有効にするには、 SafeKit用のmirror.safeモジュールをLinuxにデプロイします。このガイドでは、共有ストレージを使用しない重要なアプリケーション向けの 2 ノード共有なしクラスタの設定手順を説明します。"
category: "quick-install"
lang: "ja"
topics: "AWSの高可用性クイックインストールガイド、 SafeKitの高可用性制限、 SafeKit / AWS mirrorソリューションの概要、 SafeKitおよびLinux ( mirror.safe ) へのWindows / AWS mirrorソリューションのインストール、 SafeKit / AWS mirrorソリューションのステップバイステップ構成、 SafeKit mirrorソリューションのデモンストレーション、🔍 SafeKit高可用性ナビゲーションハブ"
---

# AWS高可用性とSafeKit : フェイルオーバーのためにmirror.safeモジュールをインストールしてください {#aws-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="AWS" mod="mirror"  %}}
 

## SafeKit / AWS mirrorソリューションの概要 {#overview-of-the-safekit--aws-mirror-solution}

ソリューションはここに記載されています: ** 💡 [ Amazon AWS高可用性: SafeKit同期レプリケーションとフェイルオーバー](</ja/solutions/aws-high-availability-cluster-synchronous-replication-failover/>) ** 。

## SafeKit / AWS mirrorソリューションをWindowsおよびLinux ( mirror.safe )にインストールします。 {#installation-of-the-safekit--aws-mirror-solution-on-windows-and-linux-mirrorsafe}

### Amazon AWSロードバランサーの設定 {#configuration-of-the-amazon-aws-load-balancer}

仮想IPアドレスを使用する場合は、ロードバランサーを設定する必要があります。  
また、ロードバランサーは、ノードに対して定期的にヘルスチェックパケットを送信するように設定する必要があります。  
そのため、 SafeKitノード内部で実行されるヘルスチェックを提供し、

  * mirrorモジュールの状態がPRIM（緑色）またはALONE（緑色）の場合、OKを返します。
  * 他のすべての州では「見つかりません」と表示されます。


Amazon AWSロードバランサーを以下のように設定する必要があります。

  * HTTPプロトコル
  * ポート9010、 SafeKitウェブサーバーポート
  * URL /var/modules/mirror/ready.txt （ mirrorが後でデプロイするモジュール名である場合）


詳細については、Amazon AWSの設定を参照[てください](<https://aws.amazon.com/elasticloadbalancing/>)


⚠️ 下記の手順設定のステップ4では、仮想IPアドレスを設定しないでください。仮想IPアドレスは、Amazon AWSロードバランサーに既に設定されています。ステップ4で仮想IPアドレスを設定するのは、オンプレミス環境での設定にのみ有効です。

### Amazon AWSネットワークセキュリティの設定 {#configuration-of-the-amazon-aws-network-security}

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

## SafeKit / AWS mirrorソリューションの段階的な構成 {#step-by-step-configuration-of-the-safekit--aws-mirror-solution}


{{%  insert-safekit-82-configuration-ja app="Windows" mod="mirror"  %}}
 

## SafeKit mirrorのソリューションのデモンストレーション {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}