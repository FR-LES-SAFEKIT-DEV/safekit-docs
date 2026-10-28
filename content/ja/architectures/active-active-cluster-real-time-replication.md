---
title: "リアルタイムレプリケーションと相互フェイルオーバーを備えたアクティブ/アクティブクラスタリングソフトウェア"
canonical: "https://safekit.eviden.com/ja/architectures/active-active-cluster-real-time-replication/"
description: "SafeKitアクティブ/アクティブクラスタリングでリソース利用率を最大化します。リアルタイム同期レプリケーションと複数のmirrorモジュールを使用して、2台のサーバー間で相互フェイルオーバーを展開します。SANを使用せずに、 WindowsおよびLinuxのデータ損失ゼロ（RPO=0）と自動復旧を実現します。無料トライアルをダウンロードしてください。"
category: "architectures"
lang: "ja"
topics: "リアルタイムレプリケーションを備えたアクティブ/アクティブクラスタの仕組みは？、🔍 SafeKit高可用性ナビゲーションハブ"
---

# リアルタイムレプリケーションと相互フェイルオーバーを備えたアクティブ/アクティブクラスタリングソフトウェア{#active-active-clustering-software-with-real-time-replication--mutual-failover}

## リアルタイムレプリケーションを備えたアクティブ/アクティブクラスタはどのように動作するのですか？ {#how-the-active-active-cluster-with-real-time-replication-works}

### リアルタイムレプリケーションを備えたアクティブ/アクティブクラスタ{#active--active-cluster-with-real-time-replication}

アプリケーションは、相互フェイルオーバー構成の2台のサーバー上で稼働しています。各サーバーは、もう一方のサーバーのバックアップとして機能します。また、各アプリケーションは、それぞれ複製されたファイルディレクトリ上で動作します。


![ SafeKitリアルタイムレプリケーションを備えたアクティブアクティブクラスタ](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


アクティブ/アクティブクラスタにおいて、いずれかのサーバーに障害が発生した場合、すべてのアプリケーションは同じサーバー上で動作し続けます。障害が発生したサーバーが再起動されると、アプリケーションはデフォルトのプライマリサーバー上で動作を再開します。

### 仕組みは？ {#how-it-works}

SafeKitアクティブアクティブクラスタは、リアルタイムレプリケーション機能を備えた2つのmirrorモジュールをデプロイするだけで簡単に構成できます。各mirrorモジュールには、仮想IPアドレス、リアルタイムレプリケーションされたディレクトリ、および再起動スクリプトの独自の構成が含まれています。

ご了承ください：

  * アプリケーションのフェイルオーバーのために、各サーバーに 2 つのアプリケーション Appli1 と Appli2 をインストールする必要があります。
  * このアーキテクチャは 2 つのアプリケーションに限定されません。N 個のアプリケーション モジュールを最大 25 個のモジュールで 2 つのサーバーにデプロイできます。
  * 各mirrorモジュールは、それぞれ独自の仮想IPアドレス、独自の複製ファイルディレクトリ、および独自の復旧スクリプトを持ちます。


### アクティブなクラスターの例{#example-of-an-active-active-cluster}

💡 [ Hyper-V ](</ja/solutions/hyper-v-replication-automatic-failover-load-balancing/>)または 💡 [ KVM ](</ja/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)ソリューションは、仮想マシンのレプリケーション、自動フェイルオーバー、ロードバランシングを備えており、2 台の物理サーバー間で N 台の仮想マシンを複製する N mirrorモジュールを備えたアクティブ/アクティブ クラスターの一例です。

この構成では、 mirrorモジュールが仮想マシン全体を複製し、障害発生時には仮想マシンを再起動します。 

このようなモジュールには仮想IPアドレスは存在しません。なぜなら、サーバー上でVMを再起動すると、VMの物理IPアドレスが自動的にフェイルオーバーされるからです。 

そして、このアーキテクチャでは、重要なアプリケーションが仮想マシン内にインストールされています。


{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}