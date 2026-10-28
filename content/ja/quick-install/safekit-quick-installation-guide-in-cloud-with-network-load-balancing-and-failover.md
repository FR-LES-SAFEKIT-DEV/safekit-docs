---
title: "クラウドネットワークの負荷分散とフェイルオーバー： SafeKit farm.safeモジュールをインストールします"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-in-cloud-with-network-load-balancing-and-failover/"
description: "クラウドネットワークの負荷分散を強化する SafeKitのインテリジェントなアプリケーション監視。 farm.safe このモジュールは、クラウドロードバランサー専用のヘルスチェック機能を提供し、アプリケーションレベルでのシームレスな高可用性を実現します。ミッションクリティカルなアプリケーションの自動的な自己修復とフェイルオーバーを可能にします。"
category: "quick-install"
lang: "ja"
topics: "クラウド向け高可用性クイックインストールガイド、 SafeKit高可用性の制限事項、 SafeKit / クラウドソリューションの概要、 SafeKitおよびLinux ( farm.safe ) へのWindows / クラウドソリューションのインストール、 SafeKit / クラウドソリューションのステップバイステップ構成、 SafeKit `farm`ソリューションのデモ、🔍 SafeKit高可用性ナビゲーションハブ"
---

# クラウドネットワークの負荷分散とフェイルオーバー: SafeKit farm.safeモジュールをインストールします {#cloud-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-ja app="Cloud" mod="farm"  %}}
 

## SafeKitの概要 / クラウドソリューション {#overview-of-the-safekit--cloud-solution}

ソリューションはここに記載されています: ** 💡 [ SafeKit : クラウド負荷分散とアプリケーションの高可用性`Farm`クラスター](</ja/solutions/cloud-load-balancing-cluster-failover/>) ** 。

## SafeKit / クラウド ソリューションをWindowsおよびLinux ( farm.safe )にインストールします。 {#installation-of-the-safekit--cloud-solution-on-windows-and-linux-farmsafe}

### クラウドロードバランサーの設定 {#configuration-of-the-cloud-load-balancer}

ロードバランサーには仮想IPアドレスを設定する必要があります。  
また、ロードバランサーは、ノードに対して定期的にヘルスチェックパケットを送信するように設定する必要があります。  
そのため、 SafeKitノード内部で実行されるヘルスチェックを提供し、

  * `farm`モジュールの状態がUP（緑色）の場合、OKを返します。
  * 他のすべての州では「見つかりません」と表示されます。


クラウドロードバランサーは以下のように設定する必要があります。

  * HTTPプロトコル
  * ポート9010、 SafeKitウェブサーバーポート
  * URL /var/modules/farm/ready.txt （ `farm`が後でデプロイするモジュール名である場合）


⚠️ 下記の手順設定のステップ4では、仮想IPアドレスとロードバランシングルールを設定しないでください。仮想IPアドレスとロードバランシングルールは、クラウドロードバランサーに既に設定されています。ステップ4で仮想IPアドレスとロードバランシングルールを設定するのは、オンプレミス構成の場合のみ有効です。

### クラウドネットワークセキュリティの設定 {#configuration-of-the-cloud-network-security}

ネットワークセキュリティは、以下のプロトコルとポートでの通信を有効にするように構成する必要があります。

  * UDP - safeadminサービス用ポート4800（ SafeKitノード間）
  * UDP - `farm`モジュール内部（ SafeKitノード間）のハートビート用ポート番号：4803
  * TCP – ロードバランサーのヘルスチェックと、HTTPモードで動作するSafeKit Webコンソール用に9010番ポートを使用します。
  * TCP – 9001 コンソールの HTTPS モードを設定する
  * TCP – HTTPSモードで動作するSafeKitウェブコンソール用の9453番ポート



{{%  insert-safekit-installation-package-windows-ja app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-ja app="" mod="mirror"  %}}
 

注：設定する汎用モジュール**farm.safe**は、パッケージ内に同梱されています。

## SafeKit / クラウドソリューションの段階的な設定 {#step-by-step-configuration-of-the-safekit--cloud-solution}


{{%  insert-safekit-82-farm-configuration-ja app="" mod="farm"  %}}
 

## SafeKit `farm`のソリューションのデモンストレーション {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}