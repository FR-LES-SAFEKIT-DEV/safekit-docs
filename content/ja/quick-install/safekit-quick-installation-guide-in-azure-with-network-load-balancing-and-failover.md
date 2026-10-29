---
title: "Azureネットワーク負荷分散とフェイルオーバー：SafeKit farm.safeモジュールのインストール"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-in-azure-with-network-load-balancing-and-failover/"
description: "SafeKitのインテリジェントなアプリケーション監視によりAzureネットワーク負荷分散を強化します。farm.safeモジュールはAzureロードバランサー専用のヘルスチェックを提供し、重要なアプリケーションに対するアプリケーションレベルの高可用性、自動修復、フェイルオーバーを実現します。"
category: "quick-install"
lang: "ja"
topics: "Azure高可用性クイックインストールガイド、SafeKit高可用性の制限事項、SafeKit / Azureソリューションの概要、WindowsおよびLinuxへのSafeKit / Azureソリューションのインストール（farm.safe）、SafeKit / Azureソリューションの段階的な設定、SafeKit <span class="notranslate farm-term" translate="no">farm</span>ソリューションのデモ、🔍 SafeKit高可用性ナビゲーションハブ"
---

# Azureネットワーク負荷分散とフェイルオーバー：SafeKit farm.safeモジュールのインストール {#azure-network-load-balancing--failover-install-the-safekit-farmsafe-module}

{{%  insert-safekit-farm-guide-ja app="Azure" mod="farm"  %}}

## SafeKit / Azureソリューションの概要 {#overview-of-the-safekit--azure-solution}

ソリューションの説明はこちらです: **💡[SafeKit：Microsoft Azure負荷分散と<span class="notranslate farm-term" translate="no">Farm</span>クラスターによるアプリケーション高可用性](</ja/solutions/azure-load-balancing-cluster-failover/>)**。

## WindowsおよびLinuxへのSafeKit / Azureソリューションのインストール（farm.safe） {#installation-of-the-safekit--azure-solution-on-windows-and-linux-farmsafe}

### Microsoft Azureロードバランサーの構成 {#configuration-of-the-microsoft-azure-load-balancer}

ロードバランサーには仮想IPアドレスを設定する必要があります。
また、ロードバランサーがノードにヘルスチェックパケットを定期的に送信するよう構成してください。
SafeKitは、ノード内で実行されるヘルスチェックを提供しており、次のように動作します。

  * <span class="notranslate farm-term" translate="no">farm</span>モジュールの状態がUP（緑）の場合はOKを返す
  * それ以外のすべての状態ではNOT FOUNDを返す

Microsoft Azureロードバランサーを次のように構成します。

  * HTTPプロトコル
  * ポート9010（SafeKit Webサーバーのポート）
  * URL /var/modules/farm/ready.txt（後でデプロイするモジュール名が<span class="notranslate farm-term" translate="no">farm</span>の場合）

詳細については、[Microsoft Azureロードバランサーの構成](<https://learn.microsoft.com/en-us/azure/load-balancer/>)を参照してください。

⚠️ 以下の段階的な構成の手順4では、仮想IPアドレスと負荷分散規則を構成しないでください。仮想IPアドレスと負荷分散規則はMicrosoft Azureロードバランサーにすでに設定されています。手順4で設定するのはオンプレミス構成の場合のみです。

### Microsoft Azureネットワークセキュリティの構成 {#configuration-of-the-microsoft-azure-network-security}

次のプロトコルとポートで通信できるように、ネットワークセキュリティを構成する必要があります。

  * UDP - 4800：safeadminサービス用（SafeKitノード間）
  * UDP - 4803：<span class="notranslate farm-term" translate="no">farm</span>モジュール内のハートビート用（SafeKitノード間）
  * TCP – 9010：ロードバランサーのヘルスチェックおよびhttpモードで実行するSafeKit Webコンソール用
  * TCP – 9001：コンソールのhttpsモードを構成するため
  * TCP – 9453：httpsモードで実行するSafeKit Webコンソール用

{{%  insert-safekit-installation-package-windows-ja app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-ja app="" mod="mirror"  %}}

注：構成する汎用 **farm.safe** モジュールはパッケージに含まれています。

## SafeKit / Azureソリューションの段階的な設定 {#step-by-step-configuration-of-the-safekit--azure-solution}

{{%  insert-safekit-82-farm-configuration-ja app="" mod="farm"  %}}

## SafeKit <span class="notranslate farm-term" translate="no">farm</span>ソリューションのデモ {#demonstration-of-the-safekit-farm-solution}

{{%  insert-safekit-farm-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}
