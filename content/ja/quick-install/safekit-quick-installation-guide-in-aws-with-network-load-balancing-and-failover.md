---
title: "AWS ネットワーク負荷分散とフェイルオーバー：SafeKit farm.safe モジュールのインストール"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-in-aws-with-network-load-balancing-and-failover/"
description: "SafeKit のインテリジェントなアプリケーション監視で AWS ネットワーク負荷分散を強化します。farm.safe farm.safe は、AWS ロードバランサー専用のヘルスチェックを提供し、アプリケーションレベルでのシームレスな HA を可能にします。ミッションクリティカルなアプリケーションの自動セルフヒーリングとフェイルオーバーを実現します。"
category: "quick-install"
lang: "ja"
topics: "AWS 向け高可用性クイックインストールガイド、SafeKit High Availability の制限事項、SafeKit/AWS ソリューションの概要、Windows および Linux への SafeKit/AWS ソリューションのインストール (farm.safe)、SafeKit/AWS ソリューションのステップバイステップ設定、SafeKit farm ソリューションのデモンストレーション、🔍 SafeKit を探索する"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# AWS ネットワーク負荷分散とフェイルオーバー：SafeKit farm.safe モジュールのインストール {#aws-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-ja app="AWS" mod="farm"  %}}
 

## SafeKit/AWS ソリューションの概要 {#overview-of-the-safekit--aws-solution}

解決策はこちらで説明されています：**💡 [SafeKit : Amazon AWS ロードバランシングとアプリケーションの高可用性 <span class="notranslate farm-term" translate="no">farm</span> クラスター](</ja/solutions/aws-load-balancing-cluster-failover/>)**。

## Windows および Linux への SafeKit/AWS ソリューションのインストール (farm.safe) {#installation-of-the-safekit--aws-solution-on-windows-and-linux-farmsafe}

### Amazon AWS ロードバランサーの設定 {#configuration-of-the-amazon-aws-load-balancer}

ロードバランサーは、仮想 IP アドレスで設定する必要があります。  
また、ロードバランサーは、ノードに定期的にヘルスパケットを送信するように設定する必要があります。  
そのため、SafeKit ノード内で実行されるヘルスチェックを提供します

  * <span class="notranslate farm-term" translate="no">farm</span> モジュールの状態が UP（緑）の場合、OK を返します
  * その他のすべての状態では、NOT FOUND を返します


Amazon AWS ロードバランサーを次のように設定する必要があります

  * HTTP プロトコル
  * ポート 9010、SafeKit ウェブサーバーのポート
  * URL /var/modules/farm/ready.txt (<span class="notranslate farm-term" translate="no">farm</span> 後でデプロイするモジュール名です)


詳細については、[Amazon AWS ロードバランサーの構成を](<https://aws.amazon.com/elasticloadbalancing/>)参照してください。


⚠️ 以下のステップバイステップ設定のステップ 4 で、仮想 IP アドレスとロードバランシングルールを設定しないでください。仮想 IP アドレスとロードバランシングルールは、Amazon AWS ロードバランサーにすでに設定されています。ステップ 4 で仮想 IP とロードバランシングルールを設定するのは、オンプレミス設定の場合のみです。

### Amazon AWS ネットワークセキュリティの設定 {#configuration-of-the-amazon-aws-network-security}

ネットワークセキュリティは、以下のプロトコルとポートの通信を有効にするように設定する必要があります

  * UDP - 4800 (safeadmin サービス用、SafeKit ノード間)
  * UDP - 4803 (<span class="notranslate farm-term" translate="no">farm</span> モジュール内のハートビート用 (SafeKit ノード間))
  * TCP – 9010 は、ロードバランサーのヘルスチェック用、および http モードで実行されている SafeKit Web コンソール用です
  * TCP – 9001 を使用してコンソールの HTTPS モードを設定します
  * TCP – 9453 (https モードで実行されている SafeKit ウェブコンソール用)



{{%  insert-safekit-installation-package-windows-ja app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-ja app="" mod="mirror"  %}}
 

注：設定する汎用 **farm.safe** モジュールは、パッケージ内に同梱されています。

## SafeKit/AWS ソリューションのステップバイステップ設定 {#step-by-step-configuration-of-the-safekit--aws-solution}


{{%  insert-safekit-82-farm-configuration-ja app="" mod="farm"  %}}
 

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> ソリューションのデモンストレーション {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}