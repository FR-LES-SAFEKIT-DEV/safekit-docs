---
title: "Azureの高可用性：SafeKitによるリアルタイムレプリケーションとフェイルオーバー"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-in-azure-with-real-time-replication-and-failover/"
description: "SafeKitのmirror.safeモジュールをAzureに展開し、WindowsおよびLinuxで同期リアルタイムレプリケーションと自動フェイルオーバーを実現します。このガイドでは、重要なアプリケーション向けに共有ストレージを使用しない2ノードクラスターを設定する方法を説明します。"
category: "quick-install"
lang: "ja"
topics: "Azure高可用性クイックインストールガイド、SafeKit高可用性の制限事項、SafeKit / Azure mirrorソリューションの概要、WindowsおよびLinuxへのSafeKit / Azure mirrorソリューションのインストール（mirror.safe）、SafeKit / Azure mirrorソリューションの段階的な設定、SafeKit mirrorソリューションのデモ、🔍 SafeKit高可用性ナビゲーションハブ"
---

# SafeKitによるAzure高可用性：フェイルオーバー用mirror.safeモジュールのインストール {#azure-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}

{{%  insert-safekit-mirror-guide-ja app="Azure" mod="mirror"  %}}

## SafeKit / Azure mirrorソリューションの概要 {#overview-of-the-safekit--azure-mirror-solution}

ソリューションの説明はこちらです: **💡[Microsoft Azureの高可用性：SafeKitによる同期レプリケーションとフェイルオーバー](</ja/solutions/azure-high-availability-cluster-synchronous-replication-failover/>)**。

## WindowsおよびLinuxへのSafeKit / Azure mirrorソリューションのインストール（mirror.safe） {#installation-of-the-safekit--azure-mirror-solution-on-windows-and-linux-mirrorsafe}

### Microsoft Azureロードバランサーの構成 {#configuration-of-the-microsoft-azure-load-balancer}

仮想IPアドレスを実装する場合は、ロードバランサーを構成する必要があります。
また、ロードバランサーがノードにヘルスチェックパケットを定期的に送信するよう構成してください。
SafeKitは、ノード内で実行されるヘルスチェックを提供しており、次のように動作します。

  * mirrorモジュールの状態がPRIM（緑）またはALONE（緑）の場合はOKを返す
  * それ以外のすべての状態ではNOT FOUNDを返す

Microsoft Azureロードバランサーを次のように構成します。

  * HTTPプロトコル
  * ポート9010（SafeKit Webサーバーのポート）
  * URL /var/modules/mirror/ready.txt（後でデプロイするモジュール名がmirrorの場合）

詳細については、[Microsoft Azureロードバランサーの構成](<https://learn.microsoft.com/en-us/azure/load-balancer/>)を参照してください。

⚠️ 以下の段階的な構成の手順4では、仮想IPアドレスを構成しないでください。仮想IPアドレスはMicrosoft Azureロードバランサーにすでに設定されています。手順4で仮想IPを設定するのはオンプレミス構成の場合のみです。

### Microsoft Azureネットワークセキュリティの構成 {#configuration-of-the-microsoft-azure-network-security}

次のプロトコルとポートで通信できるように、ネットワークセキュリティを構成する必要があります。

  * UDP - 4800：safeadminサービス用（SafeKitノード間）
  * UDP - 8888：モジュールのハートビート用（SafeKitノード間）
  * TCP – 5600：モジュールのリアルタイムファイルレプリケーション用（SafeKitノード間）
  * TCP – 9010：ロードバランサーのヘルスチェックおよびhttpモードで実行するSafeKit Webコンソール用
  * TCP – 9001：コンソールのhttpsモードを構成するため
  * TCP – 9453：httpsモードで実行するSafeKit Webコンソール用

{{%  insert-safekit-installation-package-windows-ja app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-ja app="" mod="mirror"  %}}

注：構成する汎用 **mirror.safe** モジュールはパッケージに含まれています。

## SafeKit / Azure mirrorソリューションの段階的な設定 {#step-by-step-configuration-of-the-safekit--azure-mirror-solution}

{{%  insert-safekit-82-configuration-ja app="Windows" mod="mirror"  %}}

## SafeKit mirrorソリューションのデモ {#demonstration-of-the-safekit-mirror-solution}

{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}
