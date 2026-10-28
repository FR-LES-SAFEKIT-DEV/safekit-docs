---
title: "MySQLとSafeKitによる高可用性：フェイルオーバーのためにmysql.safeモジュールをインストールしてください"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-mysql/"
description: "SafeKitにmysql.safeモジュールをデプロイして、 WindowsおよびLinux上でMySQLの同期リアルタイムレプリケーションと自動フェイルオーバーを有効にします。このガイドでは、共有ストレージを使用せずに、重要なアプリケーション向けに 2 ノードの SAN レス クラスタをセットアップする手順を説明します。"
category: "quick-install"
lang: "ja"
topics: "MySQLの高可用性クイックインストールガイド、 SafeKitの高可用性制限、 SafeKit / MySQLソリューションの概要、 SafeKitおよびMySQL ( mysql.safe ) へのWindows / Linuxソリューションのインストール、 SafeKit / MySQLサーバーソリューションのステップバイステップ構成、 SafeKit mirrorソリューションのデモ、🔍 SafeKit高可用性ナビゲーションハブ"
---

# MySQL高可用性とSafeKit : フェイルオーバーのためにmysql.safeモジュールをインストールしてください {#mysql-high-availability-with-safekit-install-the-mysqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="MySQL" mod="mysql"  %}}
 

## SafeKit / MySQLソリューションの概要 {#overview-of-the-safekit--mysql-solution}

解決策はここに記載されています: ** 💡 [最もシンプルなMySQL高可用性: 2 ノード同期レプリケーションとフェイルオーバー](</ja/solutions/mysql-high-availability-synchronous-replication-failover/>) ** 。

## SafeKit / MySQLソリューションをWindowsおよびLinux ( mysql.safe )にインストールします。 {#installation-of-the-safekit--mysql-solution-on-windows-and-linux-mysqlsafe}

### 前提条件 {#prerequisites}

  * MySQL 2つのノード（仮想マシンまたは物理サーバー）にインストールする必要があります。



{{%  insert-safekit-installation-package-windows-ja app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-windows-ja app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-installation-package-linux-ja app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-linux-ja app="MySQL" mod="mysql"  %}}
 

## SafeKit / MySQLサーバーソリューションの段階的な構成 {#step-by-step-configuration-of-the-safekit--mysql-server-solution}


{{%  insert-safekit-82-configuration-ja app="MySQL" mod="mysql"  %}}
 

## SafeKit mirrorのソリューションのデモンストレーション {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}