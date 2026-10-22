---
title: "高可用性のためのデータレプリケーション技術：徹底比較"
canonical: "https://safekit.eviden.com/ja/best-practises/data-replication-techniques/"
description: "データベース、ディスク、ファイルレベルのデータレプリケーション技術を比較します。SafeKit が SAN を必要としないシンプルな同期リアルタイムレプリケーションを提供し、データ損失を防いで Windows と Linux で自動フェイルオーバーを実現する理由を解説します。"
category: "best-practises"
lang: "ja"
topics: "データベース、ディスク、ファイルレベルのデータレプリケーション技術, データレプリケーション技術の比較表, SafeKit 高可用性ナビゲーションハブ"
---

# 高可用性のためのデータレプリケーション技術：徹底比較 {#data-replication-techniques-for-high-availability-a-complete-comparison}

## データベース、ディスク、ファイルレベルのデータレプリケーション技術 {#data-replication-techniques-at-database-level-disk-level-or-file-level}

### 概要 {#overview}

この記事では、高可用性クラスター向けに、データベース、ディスク、ファイルレベルのデータレプリケーション技術の長所と短所を比較します。フェイルオーバー、フェイルバック、導入の容易さを取り上げます。

![データレプリケーション技術](/wp-content/uploads/2023/03/data-replication-techniques.png "w:128")

以下の比較表では、高可用性ソフトウェア SafeKit が実装するデータレプリケーション技術を詳しく説明します。

### データベースレベルのデータレプリケーションとは？ {#what-is-the-data-replication-technique-at-database-level}

データベース管理システムが、[SQL Server のトランザクションログ](<https://learn.microsoft.com/en-us/sql/relational-databases/logs/the-transaction-log-sql-server>)などのログファイルを2台のサーバー間で複製する方式です。

自動フェイルオーバーには同期レプリケーションが必須です。そうでない場合、最後に確定したトランザクションをフェイルオーバー後にセカンダリサーバーで復元できません。

この方式ではデータベースは複製されますが、アプリケーションの他のデータは複製されません。多くのアプリケーションでフェイルオーバーを行うには、構成ファイルなどの追加データも複製する必要があります。

サーバーがクラッシュしてデータベースファイルを失った場合、フェイルバックは自動ではありません。熟練した DBA が故障したサーバー上でデータベースを復元する必要があります。

### ディスクレベルのデータレプリケーションとは？ {#what-is-the-data-replication-technique-at-disk-level}

[DRBD](<https://linbit.com/drbd/>) のように、2台のサーバー間でディスク内の変更を複製する方式です。

データ損失のない自動フェイルオーバーには、ディスク間の同期レプリケーションが必要です。

この方式ではデータベースだけでなく他のファイルも複製できますが、アプリケーションデータの構成に大きな影響があります。すべてのデータを複製対象のディスクに配置する必要があります。複製するデータの一部がシステムディスクにある場合、そのディスクはサーバーごとに固有でなければならないため、実現できないことがあります。

ファイルシステムを含む複製ディスクの構成や、そこへのアプリケーションデータの配置には専門知識が必要です。

### ファイルレベルのデータレプリケーションとは？ {#what-is-the-data-replication-technique-at-file-level}

[SafeKit](/ja/) のように、2台のサーバー間でファイル内の変更を複製する方式です。

データ損失のない自動フェイルオーバーには、[同期リアルタイムレプリケーション](/ja/best-practises/synchronous-replication-vs-asynchronous-replication/)が必要です。

この方式では、アプリケーションのデータ構成を変更せずにデータベースや他のファイルを複製できます。たとえば、アプリケーションのデータがシステムディスクにある場合でも、リアルタイムのファイルレプリケーションが機能します。

複製するディレクトリのパスを指定するだけなので、設定は非常に簡単です。

## データレプリケーション技術の比較表 {#comparative-tables-between-data-replication-techniques}

{{% insert-safekit-mirror-comparison-table-ja %}}

{{% insert-safekit-hub-ja %}}

{{% insert-safekit-4-buttons-ja %}}