---
title: "AWSネットワーク負荷分散およびフェイルオーバー: SafeKit farm.safeモジュールをインストールします"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-in-aws-with-network-load-balancing-and-failover/"
description: "強化する AWS ネットワーク負荷分散 SafeKitのインテリジェントなアプリケーション監視。 farm.safe モジュールは、専用の健康チェックを提供します。 AWS ロードバランサーにより、アプリケーションレベルでシームレスな高可用性を実現します。ミッションクリティカルなアプリケーションに対して、自動的な自己修復とフェイルオーバー機能を提供します。"
category: "quick-install"
lang: "ja"
topics: "AWSの高可用性クイックインストールガイド、 SafeKitの高可用性制限、 SafeKit / AWSソリューションの概要、 SafeKitおよびAWS ( farm.safe ) へのWindows / Linuxソリューションのインストール、 SafeKit / AWSソリューションのステップバイステップ構成、 SafeKit farmソリューションのデモ、🔍 SafeKit高可用性ナビゲーションハブ"
---

# AWSネットワーク負荷分散とフェイルオーバー: SafeKit farm.safeモジュールをインストールします {#aws-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-ja app="AWS" mod="farm"  %}}
 

## SafeKit / AWSソリューションの概要 {#overview-of-the-safekit--aws-solution}

ソリューションはここに記載されています: **💡 [ SafeKit : Amazon AWSロードバランシングとアプリケーションの高可用性<span class="notranslate farm-term" translate="no">Farm</span>クラスター](</ja/solutions/aws-load-balancing-cluster-failover/>)** 。

## SafeKit / AWSソリューションをWindowsおよびLinux ( farm.safe )にインストールします。 {#installation-of-the-safekit--aws-solution-on-windows-and-linux-farmsafe}

### Amazon AWSロードバランサーの設定 {#configuration-of-the-amazon-aws-load-balancer}

ロードバランサーには仮想IPアドレスを設定する必要があります。  
また、ロードバランサーは、ノードに対して定期的にヘルスチェックパケットを送信するように設定する必要があります。  
そのため、 SafeKitノード内部で実行されるヘルスチェックを提供し、

  * <span class="notranslate farm-term" translate="no">farm</span>モジュールの状態がUP（緑色）の場合、OKを返します。
  * 他のすべての州では「見つかりません」と表示されます。


Amazon AWSロードバランサーを以下のように設定する必要があります。

  * HTTPプロトコル
  * ポート9010、 SafeKitウェブサーバーポート
  * URL /var/modules/farm/ready.txt （ <span class="notranslate farm-term" translate="no">farm</span>が後でデプロイするモジュール名である場合）


詳細については、Amazon AWSの設定を参照[てください](<https://aws.amazon.com/elasticloadbalancing/>)


⚠️ 下記の手順設定のステップ4では、仮想IPアドレスとロードバランシングルールを設定しないでください。仮想IPアドレスとロードバランシングルールは、Amazon AWSロードバランサーに既に設定されています。ステップ4で仮想IPアドレスとロードバランシングルールを設定するのは、オンプレミス環境での設定にのみ有効です。

### Amazon AWSネットワークセキュリティの設定 {#configuration-of-the-amazon-aws-network-security}

ネットワークセキュリティは、以下のプロトコルとポートでの通信を有効にするように構成する必要があります。

  * UDP - safeadminサービス用ポート4800（ SafeKitノード間）
  * UDP - <span class="notranslate farm-term" translate="no">farm</span>モジュール内部（ SafeKitノード間）のハートビート用ポート番号4803
  * TCP – ロードバランサーのヘルスチェックと、HTTPモードで動作するSafeKit Webコンソール用に9010番ポートを使用します。
  * TCP – 9001 コンソールの HTTPS モードを設定する
  * TCP – HTTPSモードで動作するSafeKitウェブコンソール用の9453番ポート



{{%  insert-safekit-installation-package-windows-ja app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-ja app="" mod="mirror"  %}}
 

注：設定する汎用モジュール**farm.safe**は、パッケージ内に同梱されています。

## SafeKit / AWSソリューションの段階的な構成 {#step-by-step-configuration-of-the-safekit--aws-solution}


{{%  insert-safekit-82-farm-configuration-ja app="" mod="farm"  %}}
 

## SafeKit <span class="notranslate farm-term" translate="no">farm</span>のソリューションのデモンストレーション {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}