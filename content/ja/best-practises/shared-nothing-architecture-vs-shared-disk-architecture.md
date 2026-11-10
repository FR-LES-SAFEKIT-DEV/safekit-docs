---
title: "シェアードナッシングアーキテクチャと共有ディスクアーキテクチャ：最適な HA クラスターの選択"
canonical: "https://safekit.eviden.com/ja/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/"
description: "高可用性のためのシェアードナッシングと共有ディスクアーキテクチャを比較します。SafeKit がシェアードナッシングアプローチを使用して、SAN コストを排除し、フェイルオーバーを簡素化し、複雑なハードウェアの制約なしに同期レプリケーションを提供する方法をご覧ください。"
category: "best-practises"
lang: "ja"
topics: "高可用性クラスターにおけるシェアードナッシングアーキテクチャと共有ディスクアーキテクチャ、シェアードナッシングアーキテクチャと共有ディスクアーキテクチャ：長所と短所、🔍 SafeKit を探索する"
translation: "translate_md 2026-11-10.3 | glossaire 2026-11-10.5 | Translation LLM | 49 expressions"
---

# シェアードナッシングアーキテクチャと共有ディスクアーキテクチャ：最適な HA クラスターの選択 {#shared-nothing-vs-shared-disk-architecture-choosing-the-best-ha-cluster}

## 高可用性クラスターにおけるシェアードナッシングアーキテクチャと共有ディスクアーキテクチャ {#shared-nothing-architecture-vs-shared-disk-architecture-for-high-availability-clusters}

### 概要 {#overview}

この記事では高可用性クラスターにおけるシェアードナッシングアーキテクチャと共有ディスクアーキテクチャの長所と短所を比較検討します。ハードウェアの制約、アプリケーションデータの構成への影響、復旧時間、実装の簡素さについて考察します。


![シェアードナッシングアーキテクチャ vs 共有ディスクアーキテクチャ](/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png "w:200")


以下の比較表では共有ディスクアーキテクチャと、シェアードナッシングアーキテクチャを実装したソフトウェアクラスタリング製品である SafeKit との違いについて詳しく説明します。

### 共有ディスクアーキテクチャは何ですか？ {#what-is-a-shared-disk-architecture}

共有ディスクアーキテクチャ（[Microsoft フェールオーバークラスター](<https://learn.microsoft.com/en-us/windows-server/failover-clustering/clustering-requirements>)など）は、ハードウェアまたはソフトウェアの障害が発生した場合に、自動アプリケーションフェールオーバーでディスクを共有する 2 台のサーバーに基づいています。

このアーキテクチャは、ハードウェア上の制約があります。具体的には、特定の外部共有ストレージ、サーバーにインストールする特定のカード、およびサーバーと共有ストレージ間の特定のスイッチです。

共有ディスクアーキテクチャはアプリケーションデータの構成に大きな影響を与えます。フェイルオーバー後の再起動のため、すべてのアプリケーションデータは共有ディスクにローカライズする必要があります。

さらに、フェイルオーバー時には、共有ディスク上でファイルシステム復旧手順を実行する必要があります。これにより、復旧時間（RTO）が増加します。

最後に、特定のハードウェアを設定するにはスキルが必要なため、ソリューションの設定は容易ではありません。さらに、共有ディスク内のアプリケーションデータを設定するには、アプリケーションスキルが必要です。

### シェアードナッシングアーキテクチャとは何ですか？ {#what-is-a-shared-nothing-architecture-}

シェアードナッシングアーキテクチャ（[SafeKit](</ja/>)など）は、2 台のサーバーがリアルタイムでデータを複製し、ハードウェアまたはソフトウェアの障害が発生した場合にアプリケーションのフェイルオーバーを自動的に行うことを基本としています。

データレプリケーションには、[バイトレベルのファイルレプリケーションとブロックレベルのディスクレプリケーション](</ja/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>)の 2 種類があります。ここでは、ブロックレベルのディスクレプリケーションよりも多くの利点があるため、バイトレベルのファイルレプリケーションについて説明します。

シェアードナッシングアーキテクチャにはハードウェアの制約がありません。サーバーは物理的または仮想的で、あらゆる種類のディスク構成が可能です。リアルタイムのファイルレプリケーション（データ損失ゼロのための[同期](</ja/best-practises/synchronous-replication-vs-asynchronous-replication/>)）は、サーバー間の標準ネットワークを介して行われます。

このアーキテクチャはアプリケーションデータの構成に影響を与えません。たとえば、アプリケーションのデータがシステムディスクにある場合、リアルタイムのファイルレプリケーションは機能します。

フェイルオーバー時のリカバリ時間 (RTO) は、セカンダリサーバーの複製ファイルに対するアプリケーションの再起動時間に短縮されます。

最後に、レプリケートするディレクトリのパスのみを設定するため、ソリューションの構成は非常に簡単です。

## シェアードナッシングアーキテクチャと共有ディスクアーキテクチャ：長所と短所 {#shared-nothing-architecture-vs-shared-disk-architecture-pros-and-cons}


{{%  insert-safekit-shared-nothing-vs-shared-disk-table-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}