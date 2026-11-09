---
title: "SafeKit による AWS 高可用性：フェイルオーバー用の mirror.safe モジュールをインストールする"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-in-aws-mirror-safe-module-for-real-time-replication-and-failover/"
description: "AWS で SafeKit 用の mirror.safe モジュールをデプロイして、Windows および Linux で同期リアルタイムレプリケーションと自動フェイルオーバーを有効にします。このガイドでは、共有ストレージなしで、ミッションクリティカルなアプリケーション向けの 2 ノードシェアードナッシングクラスターをセットアップする手順を説明します。"
category: "quick-install"
lang: "ja"
topics: "AWS 向け高可用性クイックインストールガイド、SafeKit High Availability の制限事項、SafeKit/AWS mirror ソリューションの概要、Windows および Linux への SafeKit/AWS mirror ソリューションのインストール (mirror.safe)、SafeKit/AWS mirror ソリューションのステップバイステップ設定、SafeKit mirror ソリューションのデモンストレーション、🔍 SafeKit を探索する"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# SafeKit による AWS 高可用性：フェイルオーバー用の mirror.safe モジュールをインストールする {#aws-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="AWS" mod="mirror"  %}}
 

## SafeKit/AWS mirror ソリューションの概要 {#overview-of-the-safekit--aws-mirror-solution}

解決策はこちらで説明されています：**💡 [Amazon AWS 高可用性：SafeKit 同期レプリケーションとフェイルオーバー](</ja/solutions/aws-high-availability-cluster-synchronous-replication-failover/>)**。

## Windows および Linux への SafeKit/AWS mirror ソリューションのインストール (mirror.safe) {#installation-of-the-safekit--aws-mirror-solution-on-windows-and-linux-mirrorsafe}

### Amazon AWS ロードバランサーの設定 {#configuration-of-the-amazon-aws-load-balancer}

仮想 IP アドレスを使用する場合は、ロードバランサーを設定する必要があります。  
また、ロードバランサーは、ノードに定期的にヘルスパケットを送信するように設定する必要があります。  
そのため、SafeKit ノード内で実行されるヘルスチェックを提供します

  * mirror モジュールの状態が PRIM（緑）または ALONE（緑）の場合、OK を返します
  * その他のすべての状態では、NOT FOUND を返します


Amazon AWS ロードバランサーを次のように設定する必要があります

  * HTTP プロトコル
  * ポート 9010、SafeKit ウェブサーバーのポート
  * URL /var/modules/mirror/ready.txt (mirror は、後でデプロイするモジュール名です)


詳細については、[Amazon AWS ロードバランサーの構成を](<https://aws.amazon.com/elasticloadbalancing/>)参照してください。


⚠️ 以下のステップバイステップ設定のステップ 4 で仮想 IP アドレスを設定しないでください。仮想 IP アドレスは Amazon AWS ロードバランサーにすでに設定されています。ステップ 4 で仮想 IP を設定するのは、オンプレミス設定の場合のみです。

### Amazon AWS ネットワークセキュリティの設定 {#configuration-of-the-amazon-aws-network-security}

ネットワークセキュリティは、以下のプロトコルとポートの通信を有効にするように設定する必要があります

  * UDP - 4800 (safeadmin サービス用、SafeKit ノード間)
  * UDP - 8888 (モジュールハートビート用、SafeKit ノード間)
  * TCP – 5600 (モジュールのリアルタイムファイルレプリケーション用 (SafeKit ノード間))
  * TCP – 9010 は、ロードバランサーのヘルスチェック用、および http モードで実行されている SafeKit Web コンソール用です
  * TCP – 9001 を使用してコンソールの HTTPS モードを設定します
  * TCP – 9453 (https モードで実行されている SafeKit ウェブコンソール用)



{{%  insert-safekit-installation-package-windows-ja app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-ja app="" mod="mirror"  %}}
 

注：設定する汎用 **mirror.safe** モジュールは、パッケージ内に同梱されています。

## SafeKit/AWS mirror ソリューションのステップバイステップ設定 {#step-by-step-configuration-of-the-safekit--aws-mirror-solution}


{{%  insert-safekit-82-configuration-ja app="Windows" mod="mirror"  %}}
 

## SafeKit mirror ソリューションのデモンストレーション {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}