---
title: "リアルタイムレプリケーションによるアクティブ/アクティブクラスター"
canonical: "https://safekit.eviden.com/ja/architectures/active-active-cluster-real-time-replication/"
description: "アクティブ/アクティブ SafeKit クラスター：複数の mirror モジュールと同期レプリケーションで 2 台が相互にバックアップ。Windows と Linux 対応。"
category: "architectures"
lang: "ja"
topics: "リアルタイムレプリケーションを伴うアクティブ/アクティブクラスターはどのように機能しますか？"
hashpart: "how-the-active-active-cluster-with-real-time-replication-works"
translation: "translate_md 2026-11-21.1 | glossaire 2026-11-21.9 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png"
schemaType: "TechArticle"
---

# リアルタイムレプリケーションによるアクティブ/アクティブクラスター {#active-active-cluster-with-real-time-replication}

## リアルタイムレプリケーションを伴うアクティブ/アクティブクラスターはどのように機能しますか？ {#how-the-active-active-cluster-with-real-time-replication-works}

### リアルタイムレプリケーションによるアクティブ/アクティブクラスター {#active--active-cluster-with-real-time-replication}

2 台のサーバーがアプリケーションを実行し、互いにバックアップします。これは相互フェイルオーバーと呼ばれ、各サーバーがもう一方のサーバーのバックアップとなります。各アプリケーションは、独自の複製ファイルディレクトリを使用します。


![リアルタイムレプリケーション対応の SafeKit アクティブ/アクティブクラスター](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


アクティブ/アクティブクラスターで 1 台のサーバーに障害が発生した場合、すべてのアプリケーションは残りのサーバーで実行されます。障害が発生したサーバーが再起動すると、各アプリケーションはデフォルトのプライマリサーバーに戻ります。

### 仕組みは？ {#how-it-works}

SafeKit でアクティブ/アクティブクラスターを構成するには、リアルタイムレプリケーションで 2 つの mirror モジュールをデプロイするだけです。各 mirror モジュールには、仮想 IP アドレス、リアルタイムでレプリケートされるディレクトリ、および再起動スクリプトなど、独自の構成があります。

備考：

  * アプリケーションのフェイルオーバーのためには、両方のアプリケーション (Appli1 と Appli2) を各サーバーにインストールする必要があります。
  * このアーキテクチャは 2 つのアプリケーションに限定されません。同じ 2 台のサーバーに最大 25 個のアプリケーションモジュールをデプロイできます。
  * 各 mirror モジュールは、独自の仮想 IP アドレス、独自のレプリケートされたファイルディレクトリ、および独自のリカバリスクリプトを備えています。


### アクティブ/アクティブクラスターの例 {#example-of-an-active-active-cluster}

💡 [Hyper-V](</ja/solutions/hyper-v-replication-automatic-failover-load-balancing/>)または 💡 [KVM](</ja/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)ソリューションは、アクティブ/アクティブクラスターの例です。このソリューションは、仮想マシンのレプリケーション、自動フェイルオーバー、および負荷分散を提供します。このクラスターでは、N 個の mirror モジュールが 2 つの物理サーバー間で N 個の仮想マシンをレプリケートします。

この構成では、各 mirror モジュールが完全な仮想マシンを複製し、障害が発生した場合はそれを再起動します。

このタイプのモジュールには、仮想 IP アドレスは必要ありません。仮想マシンが別のサーバーで再起動すると、その IP アドレスは自動的に移動します。

このアーキテクチャでは、重要なアプリケーションは仮想マシン内にインストールされます。


{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}