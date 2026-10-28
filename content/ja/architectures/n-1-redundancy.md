---
title: "N-1冗長クラスタリング：1つのバックアップで複数のアプリケーションの高可用性を実現"
canonical: "https://safekit.eviden.com/ja/architectures/n-1-redundancy/"
description: "データセンターを最適化するには SafeKit N-1冗長性。Nをデプロイする mirror N+1サーバー上のモジュールにより、単一の共有バックアップで複数のアプリケーションの高可用性を実現します。SAN要件を排除し、リアルタイムレプリケーションによりハードウェアコストを削減します。 Windows そして Linux。 もっと詳しく知る。"
category: "architectures"
lang: "ja"
topics: "データレプリケーションとN台のサーバーから1台のサーバーへのアプリケーションフェイルオーバーによる高可用性、🔍 SafeKit高可用性ナビゲーションハブ"
---

# N-1冗長クラスタリング：1つのバックアップで複数のアプリケーションの高可用性を実現{#n-1-redundancy-clustering-high-availability-for-multiple-applications-with-one-backup}

## データレプリケーションとアプリケーションフェイルオーバーによる高可用性（N台のサーバーから1台のサーバーへ） {#high-availability-with-data-replication-and-application-failover-from-n-servers-to-1}

### N-1冗長性{#n-1-redundancy}


![ SafeKit N-1冗長クラスタ](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


### N-1冗長性{#how-the-n-1-redundancy-works}どのように機能するのか？

SafeKit N 台のサーバー上で N 個のアプリケーションが実行され、フェイルオーバー用のバックアップが 1 つあるシンプルな N-1 冗長クラスタを提供します。 SafeKit N-1冗長クラスタでは、各アプリケーションはそれぞれ独自の複製されたディレクトリ上で動作します。

[アクティブ/アクティブクラスタ](</ja/architectures/active-active-cluster-real-time-replication/>)とは異なり、プライマリサーバーの1台が故障した場合、バックアップサーバーは2倍のワークロードを処理する必要はありません。

これは、N-1冗長クラスタにおいて同時に発生する障害が1つだけであることを前提としています。このソリューションは、複数のプライマリサーバーの同時障害にも対応できますが、その場合、単一のバックアップサーバーが、障害が発生したすべてのサーバーの負荷をまとめて処理する必要があります。

### N-1冗長性を実装するにはどうすればよいでしょ{#how-to-implement-n-1-redundancy}か？

SafeKit N-1冗長クラスタは、N+1台のサーバーにN個のmirrorモジュールをデプロイするだけで簡単に構成できます。

ご了承ください：

  * アプリケーションのフェイルオーバーのために、すべてのアプリケーション（Appli1、Appli2、Appli3）を単一のバックアップにインストールする必要があります。
  * 各mirrorモジュールは、それぞれ独自の仮想IPアドレス、独自の複製ファイルディレクトリ、および独自の復旧スクリプトを持ちます。



{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}