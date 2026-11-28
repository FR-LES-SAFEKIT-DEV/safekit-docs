---
title: "SafeKit のインストール：Azure の高可用性（mirror.safe）"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-in-azure-with-real-time-replication-and-failover/"
description: "手順ガイド：Azure に SafeKit の mirror.safe モジュールを導入し、Windows または Linux VM 2 台間でリアルタイムレプリケーションとフェイルオーバーを実現。"
category: "quick-install"
lang: "ja"
topics: "Azure の高可用性クイックインストールガイド, SafeKit High Availability の制限事項, SafeKit/Azure mirror ソリューションの概要, Windows および Linux への SafeKit/Azure mirror ソリューションのインストール (mirror.safe), SafeKit/Azure mirror ソリューションのステップバイステップ設定, SafeKit mirror ソリューションのデモンストレーション"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--azure-mirror-solution, installation-of-the-safekit--azure-mirror-solution-on-windows-and-linux-mirrorsafe, step-by-step-configuration-of-the-safekit--azure-mirror-solution, demonstration-of-the-safekit-mirror-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# SafeKit のインストール：Azure の高可用性（mirror.safe） {#install-safekit-for-azure-high-availability-mirrorsafe}


{{%  insert-safekit-mirror-guide-ja app="Azure" mod="mirror"  %}}
 

## SafeKit/Azure mirror ソリューションの概要 {#overview-of-the-safekit--azure-mirror-solution}

解決策については、こちらで説明しています。**💡 [Microsoft Azure 可用性：SafeKit 同期レプリケーションとフェイルオーバー](</ja/solutions/azure-high-availability-cluster-synchronous-replication-failover/>)**。

## Windows および Linux への SafeKit/Azure mirror ソリューションのインストール (mirror.safe) {#installation-of-the-safekit--azure-mirror-solution-on-windows-and-linux-mirrorsafe}

### Microsoft Azure ロードバランサーの構成 {#configuration-of-the-microsoft-azure-load-balancer}

仮想 IP アドレスを実装する場合は、ロードバランサーを設定する必要があります。  
また、ロードバランサーは、ノードに定期的にヘルスパケットを送信するように設定する必要があります。  
そのため、SafeKit ノード内で実行されるヘルスチェックを提供します

  * mirror モジュールの状態が PRIM（緑）または ALONE（緑）の場合、OK を返します
  * その他のすべての状態では、NOT FOUND を返します


Microsoft Azure ロードバランサーを次のように構成する必要があります

  * HTTP プロトコル
  * ポート 9010、SafeKit ウェブサーバーのポート
  * URL /var/modules/mirror/ready.txt (mirror は、後でデプロイするモジュール名です)


詳細については、[「Microsoft Azure ロードバランサーの構成」を](<https://learn.microsoft.com/en-us/azure/load-balancer/>)参照してください。 


⚠️ 以下のステップバイステップ構成のステップ 4 で仮想 IP アドレスを設定しないでください。仮想 IP アドレスは Microsoft Azure ロードバランサーに既に設定されています。ステップ 4 で仮想 IP を設定するのは、オンプレミス構成の場合のみです。

### Microsoft Azure ネットワークセキュリティの構成 {#configuration-of-the-microsoft-azure-network-security}

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

## SafeKit/Azure mirror ソリューションのステップバイステップ設定 {#step-by-step-configuration-of-the-safekit--azure-mirror-solution}


{{%  insert-safekit-82-configuration-ja app="Windows" mod="mirror"  %}}
 

## SafeKit mirror ソリューションのデモンストレーション {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}