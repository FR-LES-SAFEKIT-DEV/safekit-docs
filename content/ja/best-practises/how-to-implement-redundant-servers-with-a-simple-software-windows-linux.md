---
title: "シンプルな HA ソフトウェアで冗長サーバーを実装する方法"
canonical: "https://safekit.eviden.com/ja/best-practises/how-to-implement-redundant-servers-with-a-simple-software-windows-linux/"
description: "シンプルなソフトウェアのみのアプローチで、冗長サーバーを実装する方法を学びましょう。SafeKit は、Windows および Linux 上でリアルタイムのデータレプリケーションと自動フェイルオーバーを提供します。共有ディスクや専門的な IT スキルは必要ありません。"
category: "best-practises"
lang: "ja"
topics: "リアルタイムレプリケーションとフェイルオーバーを用いたアクティブ/パッシブ冗長サーバーの実装方法、ネットワーク負荷分散とフェイルオーバーを用いたアクティブ/アクティブ冗長サーバーを実装する方法は？、🔍 SafeKit を探索する"
translation: "translate_md 2026-11-19.2 | glossaire 2026-11-19.30 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/02/safekit-prim-second-300.png"
schemaType: "TechArticle"
---

# シンプルな HA ソフトウェアで冗長サーバーを実装する方法 {#how-to-implement-redundant-servers-with-simple-ha-software}

## リアルタイムレプリケーションとフェイルオーバーを用いたアクティブ/パッシブ冗長サーバーの実装方法 {#how-to-implement-activepassive-redundant-servers-with-real-time-replication-and-failover}

### SafeKit mirror クラスター {#the-safekit-mirror-cluster}


![リアルタイムファイルレプリケーションとフェイルオーバー機能を備えた冗長サーバー](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


Mirror クラスターでは、SafeKit ソフトウェアは 2 台のサーバーにインストールされます。サーバーは物理または仮想です。オンプレミスまたはクラウドで、Windows または Linux を実行します。プライマリサーバーはアクティブサーバーです。重要なアプリケーションを実行します。セカンダリサーバーはパッシブな冗長サーバーです。アプリケーションがファイルに対して行ったすべての変更をリアルタイムで受信します。クライアントは[仮想 IP アドレス](</ja/best-practises/how-a-virtual-ip-address-works/#virtual-ip-same-subnet-failover>)に接続します。プライマリサーバーに障害が発生した場合、SafeKit はセカンダリサーバーで重要なアプリケーションを自動的に再起動します。このサーバーがプライマリになり、仮想 IP アドレスを引き継ぎます。障害が発生したサーバーが再起動すると、SafeKit はデータを自動的に再同期します。このサーバーはその後、セカンダリ状態のパッシブな冗長サーバーになります。

## ネットワーク負荷分散とフェイルオーバーを用いたアクティブ/アクティブ冗長サーバーを実装する方法は？ {#how-to-implement-activeactive-redundant-servers-with-network-load-balancing-and-failover}

### SafeKit <span class="notranslate farm-term" translate="no">farm</span> クラスター {#the-safekit-farm-cluster}


![ネットワーク負荷分散とフェイルオーバー機能を備えた冗長サーバー](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


<span class="notranslate farm-term" translate="no">Farm</span> クラスターでは、SafeKit ソフトウェアが複数の冗長サーバーにインストールされます。サーバーは、オンプレミスまたはクラウドで Windows または Linux を実行します。すべての冗長サーバーはアクティブです。これらは同じ重要なフロントエンドアプリケーションを実行します。クライアントは[仮想 IP アドレス](</ja/best-practises/how-a-virtual-ip-address-works/#vip-load-balancing-same-subnet>)に接続します。TCP セッションは、すべての冗長サーバー間でロードバランシングされます。1 つのサーバーに障害が発生した場合、SafeKit は残りのアクティブサーバー間で TCP セッションのロードバランシングを自動的に再構成します。障害が発生したサーバーが再起動すると、SafeKit はそれをアクティブな冗長サーバーとして自動的に再統合します。このサーバーは、新しい TCP セッションを受信するようになります。


{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}