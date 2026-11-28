---
title: "クラスターのハートビート、フェイルオーバー、クォーラム"
canonical: "https://safekit.eviden.com/ja/best-practises/heartbeat-failover-quorum-windows-linux-cluster/"
description: "Windows と Linux クラスターのハートビート、フェイルオーバー、クォーラム。SafeKit はクォーラムディスクや第 3 サーバーなしでスプリットブレインを回避。"
category: "best-practises"
lang: "ja"
topics: "クラスターでネットワークが分離された場合、どのようなシナリオが考えられますか？, Windows または Linux クラスターにおけるハートビートとフェイルオーバーの仕組みを教えてください。, 2 つのリモートコンピュータールームにあるサーバーによるスプリットブレインとクォーラム, SafeKit スプリットブレインチェッカーによるシンプルなクラスタークォーラム"
hashpart: "isolation, how-heartbeats-and-failover-work-in-a-windows-or-linux-cluster, split-brain-problem-and-quorum-when-servers-are-in-two-remote-computer-rooms, simple-cluster-quorum-with-the-safekit-split-brain-checker"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-19.19 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/02/quorum-with-remote-sites.png"
schemaType: "TechArticle"
---

# クラスターのハートビート、フェイルオーバー、クォーラム {#heartbeat-failover-and-quorum-in-a-cluster}


{{%  insert-safekit-network-isolation-ja  %}}
 

## Windows または Linux クラスターにおけるハートビートとフェイルオーバーの仕組みを教えてください。 {#how-heartbeats-and-failover-work-in-a-windows-or-linux-cluster}

### ハートビートとは何ですか？ {#what-is-a-heartbeat}

2 つのサーバーを同期させ、サーバーの障害を検出するための基本的なメカニズムは**ハートビート**です。これは、2 つのサーバーで共有されるネットワーク上の監視データフローです。

SafeKit ソフトウェアは、複数のハートビートをサポートします。2 台のサーバーで共有される各ネットワークは、1 つのハートビートを送信できます。

ハートビートメカニズムは、Windows および Linux クラスターを実装するために使用されます。これは、リアルタイムのファイルレプリケーションとフェイルオーバーを備えた SafeKit mirror クラスターに統合されています。

### SafeKit ハートビート {#safekit-heartbeats}

通常動作では、2 つのサーバーはハートビートチャネルを介して状態を交換します。これらの状態は、PRIM、SECOND、およびリソースの状態です。また、アプリケーションの開始と停止の手順も同期します。

例えば、スケジュールされたフェイルオーバー中に、アプリケーションの停止スクリプトがプライマリサーバーで最初に実行されます。次に、開始スクリプトがセカンダリサーバーで実行されます。したがって、セカンダリサーバー上のレプリケートされたデータは安全な状態になります。この状態は、アプリケーションのクリーンな停止に対応します。

### すべてのハートビートが失われたらどうなるのでしょうか？ {#loss-of-all-heartbeats}

サーバーがすべてのハートビートを失うと、もう一方のサーバーがダウンしたと見なします。その後、ALONE 状態になります。

SECOND 状態にあるサーバーが ALONE 状態になると、このサーバー上でアプリケーションが再起動されます。これがアプリケーションのフェイルオーバーです。

2 つの異なるネットワーク上の 2 つのハートビートチャネルが推奨されますが、必須ではありません。2 つのネットワークを使用すると、ネットワーク障害とサーバー障害を混同することはありません。

## 2 つのリモートコンピュータールームにあるサーバーによるスプリットブレインとクォーラム {#split-brain-problem-and-quorum-when-servers-are-in-two-remote-computer-rooms}


![Windows または Linux クラスターにおけるハートビート、フェイルオーバー、およびクォーラム](/wp-content/uploads/2023/02/quorum-with-remote-sites.png "w:200")


### 2 つの遠隔コンピュータ室 {#remote-computer-rooms}

2 つの離れたコンピュータールームに 2 台のサーバーを設置することで、高可用性クラスターは重要なアプリケーションを保護できます。

したがって、災害によってコンピュータールーム全体が破壊された場合でも、アプリケーションは引き続き利用可能です。

### スプリットブレイン {#split-brain}

2 つのコンピュータールーム間のネットワークが孤立すると、すべてのハートビートが失われます。これがスプリットブレイン問題です。両方のサーバーがクリティカルアプリケーションを開始します。

### 通常のソリューションの複雑さ {#complexity-of-solutions}

多くの場合、クォーラムはスプリットブレインの問題を解決するために使用されます。クォーラムは、3 番目のクォーラムサーバーまたは特別なクォーラムディスクを使用します。これにより、2 つのプライマリサーバーが同時に存在することが回避されます。

残念ながら、これらのクォーラムデバイスは、クラスタリングアーキテクチャにコストと複雑さを追加します。

## SafeKit スプリットブレインチェッカーによるシンプルなクラスタークォーラム {#simple-cluster-quorum-with-the-safekit-split-brain-checker}

### SafeKit スプリットブレインチェッカー {#safekit-split-brain-checker}

SafeKit 高可用性ソフトウェアを使用すると、Windows または Linux クラスターのクォーラムに、第 3 のクォーラムサーバーやクォーラムディスクは不要です。シンプルな 🛠️ [スプリットブレインチェッカー](</ja/resources/safekit-user-guide-82/#check_splitbrain>)両方のサーバーでアプリケーションが実行されるのを防ぐのに十分です。

サーバー間のハートビートがすべて失われると、スプリットブレインチェッカーは 1 つのサーバーのみをプライマリとして選択します。もう一方のサーバーは WAIT 状態になります。もう一方のサーバーのハートビートを再度受信するまで待機します。その後、プライマリサーバーからレプリケートされたデータを同期し、セカンダリ状態に戻ります。

### スプリットブレインチェッカーはどのように機能しますか？ {#how-the-split-brain-checker-works}

プライマリサーバは、ウィットネスと呼ばれる IP アドレスへの ping によって選出されます。ウィットネスは通常、常に利用可能なルータです。ネットワークが孤立した場合、ウィットネスに到達できるサーバのみが ALONE 状態でプライマリになります。他のサーバは WAIT 状態になります。

ウィットネスは永続的にテストされません。すべてのハートビートが失われた場合にのみテストされます。その時点でウィットネスがダウンしている場合、クラスターは WAIT-WAIT 状態になります。その後、管理者は SafeKit Web コンソールを使用して、サーバーの 1 つをプライマリとして再起動できます。

### スプリットブレインチェッカーがないとどうなるのでしょうか？ {#what-happens-without-a-split-brain-checker}

ネットワークが分離されると、両方のサーバーが ALONE 状態になり、クリティカルアプリケーションを実行します。レプリケートされたディレクトリは分離されます。各アプリケーションは、独自のディレクトリ内の独自のデータで動作します。

ネットワークが再接続されると、SafeKit はデフォルトで、アイソレーション前の PRIM サーバーを新しいプライマリとして選択します。もう一方のサーバーは強制的に SECOND 状態になります。そのすべてのデータは PRIM サーバーから再同期されます。

注：Windows では、サーバーは重複する IP アドレスを検出し、仮想 IP アドレスを削除できます。その場合、SafeKit はチェッカーは強制的に再起動します。


{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}
