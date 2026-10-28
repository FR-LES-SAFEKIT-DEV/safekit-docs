---
title: "シンプルなHAソフトウェアで冗長サーバーを実装する方法"
canonical: "https://safekit.eviden.com/ja/best-practises/how-to-implement-redundant-servers-with-a-simple-software-windows-linux/"
description: "ソフトウェアのみのシンプルなアプローチで冗長サーバーを実装する方法を学びましょう。 SafeKit SANレスアーキテクチャを提案する Windows そして Linux共有ディスクや専門的なITスキルを必要とせずに、リアルタイムのデータレプリケーションと自動フェイルオーバーを実現します。"
category: "best-practises"
lang: "ja"
topics: "リアルタイムレプリケーションとフェイルオーバーを備えたアクティブ/パッシブ冗長サーバーの実装方法、ネットワーク負荷分散とフェイルオーバーを備えたアクティブ/アクティブ冗長サーバーの実装方法、🔍 SafeKit高可用性ナビゲーションハブ"
---

# シンプルなHAソフトウェアで冗長サーバーを実装する方法 {#how-to-implement-redundant-servers-with-simple-ha-software}

## リアルタイムレプリケーションとフェイルオーバーを備えたアクティブパッシブ冗長サーバーを実装する方法は？ {#how-to-implement-activepassive-redundant-servers-with-real-time-replication-and-failover}

### SafeKit mirrorクラスター {#the-safekit-mirror-cluster}


![リアルタイムファイルレプリケーションとフェイルオーバーを備えた冗長サーバー](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


mirrorクラスタでは、 SafeKitソフトウェアが、 WindowsまたはLinuxを実行している 2 台の物理サーバーまたは仮想サーバー (オンプレミスまたはクラウド) にインストールされます。プライマリサーバーはアクティブサーバーであり、重要なアプリケーションを実行します。セカンダリサーバーはパッシブ冗長サーバーであり、アプリケーションがファイル内で行ったすべての変更をリアルタイムで受信します。クライアントは[仮想 IP アドレス](</ja/best-practises/how-a-virtual-ip-address-works/#virtual-ip-same-subnet-failover>)に接続します。プライマリサーバーがダウンした場合、 SafeKitパッシブ冗長サーバー上の重要なアプリケーションを自動的に再起動し、そのサーバーがプライマリサーバーとなり、仮想 IP アドレスが切り替わります。障害が発生したサーバーが再起動されると、自動的に再同期され、セカンダリとして実行されるパッシブ冗長サーバーになります。

## ネットワーク負荷分散とフェイルオーバーを備えたアクティブ/アクティブ冗長サーバーを実装するにはどうすればよいです？ {#how-to-implement-activeactive-redundant-servers-with-network-load-balancing-and-failover}

### SafeKit `farm`クラスター {#the-safekit-farm-cluster}


![ネットワーク負荷分散とフェイルオーバーを備えた冗長サーバー](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


`farm`クラスタでは、 SafeKitソフトウェアが、 WindowsまたはLinuxを実行している冗長サーバー (オンプレミスまたはクラウド) にインストールされます。すべての冗長サーバーはアクティブで、同じ重要なフロントエンドアプリケーションを実行します。クライアントは、 [の仮想 IP アドレス](</ja/best-practises/how-a-virtual-ip-address-works/#vip-load-balancing-same-subnet>)に接続されます。TCP セッションは、すべての冗長サーバー間で負荷分散されます。いずれかのサーバーがダウンした場合、 SafeKit 、残りのアクティブなサーバー間で TCP セッションの負荷分散を自動的に再構成します。障害が発生したサーバーが再起動されると、自動的にアクティブな冗長サーバーとして再統合され、新しい TCP セッションを受信します。


{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}