---
title: "N-1 冗長クラスター：単一のバックアップサーバーで複数のアプリケーションに高可用性を提供"
canonical: "https://safekit.eviden.com/ja/architectures/n-1-redundancy/"
description: "SafeKit の N-1 冗長化：N+1 台のサーバー上の N 個のアプリケーションが 1 台のバックアップサーバーを共有。リアルタイムレプリケーションと自動フェイルオーバー、SAN 不要。"
category: "architectures"
lang: "ja"
topics: "N 台のサーバーから 1 台へのデータレプリケーションとアプリケーションフェイルオーバーによる高可用性、🔍 SafeKit を探索する"
translation: "translate_md 2026-11-22.1 | glossaire 2026-11-22.2 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/02/safekit-n-1-300-3.png"
schemaType: "TechArticle"
---

# N-1 冗長クラスター：単一のバックアップサーバーで複数のアプリケーションに高可用性を提供 {#n-1-redundancy-clustering-high-availability-for-multiple-applications-with-one-backup}

## N 台のサーバーから 1 台へのデータレプリケーションとアプリケーションフェイルオーバーによる高可用性 {#high-availability-with-data-replication-and-application-failover-from-n-servers-to-1}

### N-1 冗長化 {#n-1-redundancy}


![SafeKit による N-1 冗長化クラスター](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


### N-1 冗長化の仕組みとは？ {#how-the-n-1-redundancy-works}

SafeKit は、シンプルな N-1 冗長クラスターを提供します。N 個のアプリケーションが N 個のプライマリサーバーで実行され、障害発生時には単一のバックアップサーバーが引き継ぎます。SafeKit N-1 冗長クラスターでは、各アプリケーションはそれぞれ複製されたディレクトリ上で動作します。

[アクティブ/アクティブクラスター](</ja/architectures/active-active-cluster-real-time-replication/>)とは異なり、プライマリサーバーの 1 つに障害が発生した場合でも、バックアップサーバーが 2 倍のワークロードを処理する必要はありません。

これは、N-1 冗長クラスターで一度に 1 つのプライマリサーバーのみが障害を起こすことを前提としています。このソリューションは、複数のプライマリサーバーの障害を同時に処理することもできます。この場合、単一のバックアップサーバーが、障害を起こしたすべてのサーバーの結合されたワークロードを実行します。

### N-1 冗長化の導入方法 {#how-to-implement-n-1-redundancy}

SafeKit N-1 冗長クラスターを構成するには、N+1 台のサーバーに N 個の mirror モジュールをデプロイするだけです。

備考：

  * アプリケーションのフェイルオーバーのため、すべてのアプリケーション (Appli1、Appli2、Appli3) をバックアップサーバーにインストールする必要があります。
  * 各 mirror モジュールは、独自の仮想 IP アドレス、独自のレプリケートされたファイルディレクトリ、および独自のリカバリスクリプトを備えています。



{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}