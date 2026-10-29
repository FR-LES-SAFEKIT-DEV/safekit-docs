---
title: "GCPネットワーク負荷分散およびフェイルオーバー: SafeKit farm.safeモジュールをインストールします"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-in-gcp-with-network-load-balancing-and-failover/"
description: "強化する GCP ネットワーク負荷分散 SafeKitのインテリジェントなアプリケーション監視。 farm.safe モジュールは、専用の健康チェックを提供します。 GCP ロードバランサーにより、アプリケーションレベルでシームレスな高可用性を実現します。ミッションクリティカルなアプリケーションに対して、自動的な自己修復とフェイルオーバー機能を提供します。"
category: "quick-install"
lang: "ja"
topics: "GCPの高可用性クイックインストールガイド、 SafeKitの高可用性制限、 SafeKit / GCPソリューションの概要、 SafeKitおよびGCP ( farm.safe ) へのWindows / Linuxソリューションのインストール、 SafeKit / GCPソリューションのステップバイステップ構成、 SafeKit <span class="notranslate farm-term" translate="no">farm</span>ソリューションのデモ、🔍 SafeKit高可用性ナビゲーションハブ"
---

# GCPネットワーク負荷分散とフェイルオーバー: SafeKit farm.safeモジュールをインストールします {#gcp-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-ja app="GCP" mod="farm"  %}}
 

## SafeKit / GCPソリューションの概要 {#overview-of-the-safekit--gcp-solution}

ソリューションはここに記載されています: **💡 [ SafeKit : Google GCPロードバランシングとアプリケーションの高可用性<span class="notranslate farm-term" translate="no">Farm</span>クラスター](</ja/solutions/gcp-load-balancing-cluster-failover/>)** 。

## SafeKit / GCPソリューションをWindowsおよびLinux ( farm.safe )にインストールします。 {#installation-of-the-safekit--gcp-solution-on-windows-and-linux-farmsafe}

### Google GCPロードバランサーの設定 {#configuration-of-the-google-gcp-load-balancer}

ロードバランサーには仮想IPアドレスを設定する必要があります。  
また、ロードバランサーは、ノードに対して定期的にヘルスチェックパケットを送信するように設定する必要があります。  
そのため、 SafeKitノード内部で実行されるヘルスチェックを提供し、

  * <span class="notranslate farm-term" translate="no">farm</span>モジュールの状態がUP（緑色）の場合、OKを返します。
  * 他のすべての州では「見つかりません」と表示されます。


Google GCPロードバランサーを以下のように設定する必要があります。

  * HTTPプロトコル
  * ポート9010、 SafeKitウェブサーバーポート
  * URL /var/modules/farm/ready.txt （ <span class="notranslate farm-term" translate="no">farm</span>が後でデプロイするモジュール名である場合）


詳細については、Google GCPの構成を参照して[ ](<https://docs.cloud.google.com/load-balancing/docs/>)


⚠️ 下記の手順設定のステップ4では、仮想IPアドレスとロードバランシングルールを設定しないでください。仮想IPアドレスとロードバランシングルールは、Google GCPロードバランサーに既に設定されています。ステップ4で仮想IPアドレスとロードバランシングルールを設定するのは、オンプレミス環境での設定にのみ有効です。

### Googleネットワークセキュリティの設定GCP {#configuration-of-the-google-gcp-network-security}

ネットワークセキュリティは、以下のプロトコルとポートでの通信を有効にするように構成する必要があります。

  * UDP - safeadminサービス用ポート4800（ SafeKitノード間）
  * UDP - <span class="notranslate farm-term" translate="no">farm</span>モジュール内部（ SafeKitノード間）のハートビート用ポート番号：4803
  * TCP – ロードバランサーのヘルスチェックと、HTTPモードで動作するSafeKit Webコンソール用に9010番ポートを使用します。
  * TCP – 9001 コンソールの HTTPS モードを設定する
  * TCP – HTTPSモードで動作するSafeKitウェブコンソール用の9453番ポート



{{%  insert-safekit-installation-package-windows-ja app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-ja app="" mod="mirror"  %}}
 

注：設定する汎用モジュール**farm.safe**は、パッケージ内に同梱されています。

## SafeKit / GCPソリューションの段階的な構成 {#step-by-step-configuration-of-the-safekit--gcp-solution}


{{%  insert-safekit-82-farm-configuration-ja app="" mod="farm"  %}}
 

## SafeKit <span class="notranslate farm-term" translate="no">farm</span>のソリューションのデモンストレーション {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}