---
title: "MariaDBとSafeKitによる高可用性：フェイルオーバーのためにmysql.safeモジュールをインストールしてください"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-mariadb/"
description: "SafeKitにmysql.safeモジュールをデプロイして、 WindowsおよびLinux上でMariaDBの同期リアルタイムレプリケーションと自動フェイルオーバーを有効にします。このガイドでは、共有ストレージを使用せずに、重要なアプリケーション向けに 2 ノードの SAN レス クラスタをセットアップする手順を説明します。"
category: "quick-install"
lang: "ja"
topics: "MariaDBの高可用性クイックインストールガイド、 SafeKitの高可用性制限、 SafeKit / MariaDBソリューションの概要、 SafeKitおよびMariaDB ( mysql.safe ) へのWindows / Linuxソリューションのインストール、 SafeKit / MariaDBソリューションのステップバイステップ構成、 SafeKit mirrorソリューションのデモ、🔍 SafeKit高可用性ナビゲーションハブ"
---

# MariaDB高可用性とSafeKit : フェイルオーバーのためにmysql.safeモジュールをインストールしてください {#mariadb-high-availability-with-safekit-install-the-mysqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="MariaDB" mod="mysql"  %}}
 

## SafeKit / MariaDBソリューションの概要 {#overview-of-the-safekit--mariadb-solution}

解決策はここに記載されています: ** 💡 [最もシンプルなMariaDB高可用性: 2 ノード同期レプリケーションとフェイルオーバー](</solutions/mariadb-simplest-high-availability-cluster-synchronous-replication-failover-redundant-servers/>) ** 。

## SafeKit / MariaDBソリューションをWindowsおよびLinux ( mysql.safe )にインストールします。 {#installation-of-the-safekit--mariadb-solution-on-windows-and-linux-mysqlsafe}

### 前提条件 {#prerequisites}

  * MariaDB 2つのノード（仮想マシンまたは物理サーバー）にインストールする必要があります。



{{%  insert-safekit-installation-package-windows-ja app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-windows-ja app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-installation-package-linux-ja app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-linux-ja app="MariaDB" mod="mysql"  %}}
 

## SafeKit / MariaDBソリューションの段階的な構成 {#step-by-step-configuration-of-the-safekit--mariadb-solution}


{{%  insert-safekit-82-configuration-ja app="MariaDB" mod="mysql"  %}}
 

## SafeKit mirrorのソリューションのデモンストレーション {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}