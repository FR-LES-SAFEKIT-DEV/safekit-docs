---
title: "高可用性クラスタリングにおいて、仮想 IP アドレスはどのように機能するのでしょうか？"
canonical: "https://safekit.eviden.com/ja/best-practises/how-a-virtual-ip-address-works/"
description: "SafeKit がフェイルオーバー時に仮想 IP アドレスを移動する方法：同一サブネット内での Gratuitous ARP、ロードバランサー、クラウド CLI、またはサブネットをまたぐ BGP。ローカル仮想 IP アドレスが重要な理由。"
category: "best-practises"
lang: "ja"
topics: "高可用性クラスタにおける仮想 IP アドレスとは？、SafeKit における仮想 IP の実装、同一サブネット内での仮想 IP アドレスの動作（mirror クラスタ）、ロードバランサーを使用した異なるサブネット間での仮想 IP の動作（mirror クラスタ）、クラウドプロバイダ CLI を使用した異なるサブネット間での仮想 IP の動作（mirror クラスタ）、BGP を使用した異なるサブネット間での仮想 IP の動作（mirror クラスタ）、異なるサブネット間での DNS リダイレクトの動作（mirror クラスタ）、同一サブネット上の farm クラスタにおける仮想 IP ロードバランシングの動作、異なるサブネット間でのロードバランスされた仮想 IP の動作（farm クラスタ）、比較：仮想 IP の実装、レイテンシ、およびアプリケーションの透過性、仮想 IP に関するよくある質問、🔍 SafeKit を探索する"
---

# 高可用性クラスタリングにおいて、仮想 IP アドレスはどのように機能するのでしょうか？ {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## 高可用性クラスタにおける仮想 IP アドレスとは何ですか？ {#virtual-ip-definition}

**仮想 IP アドレス**とは、[高可用性クラスタ](</ja/>)内のアプリケーションにクライアントが接続するために使用する単一のアドレスです。仮想 IP アドレスは特定のサーバーに紐づけられていません。フェイルオーバーが発生すると、アプリケーションを実行しているサーバーに自動的に移行します。クライアントは設定を変更する必要はありません。

**SafeKit の重要な原則は、** 仮想 IP がアプリケーションを実行する**サーバー上でローカルに設定される**ことです。アプリケーションは仮想 IP 上で起動し、元のクライアント IP を受け取ります。そのため、多くのアプリケーションは SafeKit で変更を加えることなく正しく動作します。SafeKit は 2 種類の仮想 IP を提供します。

  * **mirror クラスタ構成のプライマリ/バックアップ仮想 IP：** 仮想 IP はプライマリサーバーでのみ有効です。フェイルオーバー時には、バックアップサーバーに移行します。
  * **<span class="notranslate farm-term" translate="no">farm</span> クラスタを使用した仮想 IP によるネットワーク負荷分散：** 仮想 IP はすべてのサーバーで同時にアクティブになり、トラフィックはサーバー間で共有されます。

## SafeKit における仮想 IP の実装 {#safekit-virtual-ip-implementation}

この記事では、SafeKit が各ネットワークアーキテクチャにおいて仮想 IP アドレスをどのように移動するかを説明します。

  * **同一サブネットまたは拡張 LAN（[mirror](#virtual-ip-same-subnet-failover)および[<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-same-subnet)クラスタ）：** SafeKit はサーバー上で仮想 IP アドレスを設定し、**GARP（Gratuitous ARP）** を送信します。外部ハードウェアは不要です。これは最も透過的なソリューションです（すべて SafeKit 製品によって実装されます）。
  * **ロードバランサーを備えた異なるサブネット（[mirror](#virtual-ip-different-subnets-failover)および[<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-different-subnets)クラスタ）：** ロードバランサーは SafeKit **ヘルスチェック**を使用してトラフィックを適切なサーバーに送信します（ロードバランサーはインテグレーターによって構成されます）。
  * **[クラウドプロバイダーの CLI を持つ異なるサブネット](#virtual-ip-cloud-cli-failover)（mirror クラスタ）：** SafeKit の `start_prim` スクリプトは、クラウド CLI を呼び出して仮想 IP を移動します（インテグレーターが作成したスクリプト）。
  * **[BGP を使用した異なるサブネット](#virtual-ip-bgp-failover)（mirror クラスタ）：** プライマリサーバーがルーターに仮想 IP を通知します（インテグレーターが作成したスクリプト）。
  * **[DNS リダイレクトを使用した異なるサブネット](#virtual-ip-vs-dns-redirection-failover)（mirror クラスタ）：** SafeKit の `start_prim` スクリプトは、仮想名の DNS レコードを新しいプライマリサーバーの物理 IP アドレスに変更します（このスクリプトはインテグレーターによって作成されます）。単一の仮想 IP アドレスは存在せず、この方法はすべてのクライアントに対して信頼できるとは限りません。

この記事には以下の内容も含まれています。

  * [比較：仮想 IP の実装、レイテンシ、およびアプリケーションの透過性](#virtual-ip-methods-comparison)
  * [仮想 IP に関するよくある質問](#virtual-ip-faq)
  * [🔍 SafeKit を探索する](#hub)

![Eviden SafeKit における仮想 IP の動作の比較図：アクティブノードに floating IP を表示する Mirror クラスタと、すべてのノード間でネットワーク負荷分散を表示する farm クラスタ。](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**SafeKit における mirror および <span class="notranslate farm-term" translate="no">farm</span> クラスタ向けの仮想 IP 実装。**

## 同一サブネット内（mirror クラスタ）における仮想 IP アドレスの仕組み {#virtual-ip-same-subnet-failover}

- [SafeKit mirror クラスタにおけるプライマリ/バックアップ仮想 IP アドレスのテスト](/ja/best-practises/test-primary-backup-vip-mirror/)

### ローカルサブネットにおける自動フェイルオーバーとネットワーク再ルーティング {#automated-failover--network-rerouting-in-a-local-subnet}

ローカルネットワークでは、**SafeKit が**仮想 IP アドレスとアプリケーションのフェイルオーバーを自動的に管理します。

### ローカル mirror クラスタ：Windows または Linux 上での 2 ノードフェイルオーバー {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![同一サブネット内の 2 台のサーバー間における SafeKit 仮想 IP フェイルオーバーメカニズム](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

**SafeKit mirror クラスタ**では、2 つのノードは同じサブネットに属します。高可用性は**仮想 IP アドレス**を使用して実現されます。SafeKit はオペレーティングシステムのネットワークスタック内で仮想 IP アドレスを管理します。特別なハードウェアは必要ありません。仮想 IP アドレスは、**IP エイリアシング**によってサーバー 1 とサーバー 2 の物理 IP アドレスに追加されます。クライアントは常に仮想 IP アドレスに接続します。

#### SafeKit における IP エイリアシングと複数の仮想 IP（VIP） {#safekits-advanced-ip-aliasing--multiple-virtual-ip-support}

仮想 IP アドレスは、ノード間を移動する 3 つ目の IP アドレスです。SafeKit は、1 つのクラスタ内で**複数の仮想 IP アドレスを**管理できます。仮想 IP アドレスは、同じネットワークカード上に配置することも、異なるネットワークカード上に配置することも可能です。このようにして、各サービスが独自の仮想 IP アドレスを使用できます。

#### フェイルオーバーメカニズム：Gratuitous ARP（GARP） {#the-failover-mechanism-gratuitous-arp-garp}

フェイルオーバーには手動操作は一切不要です。通常動作時、仮想 IP アドレスは**サーバー 1 の MAC アドレス（mac1）** にリンクされます。サーバー 1 に障害が発生した場合、SafeKit は次の 3 つの処理を実行します。

  * **仮想 IP エイリアシング：** SafeKit は、新しいプライマリサーバーであるサーバー 2 のネットワークカード上に、仮想 IP をエイリアスとして設定します。その後、オペレーティングシステムはネットワーク上でメッセージを送信し、仮想 IP を通知します。
  * **GARP:** SafeKit は、**Gratuitous ARP (GARP)** メッセージも送信します。ネットワークスイッチとクライアントは、ARP キャッシュを更新します。仮想 IP は、**サーバー 2 (mac2) の MAC アドレス**にリンクされます。
  * **アプリケーションの復旧：** SafeKit はサーバー 2 上でアプリケーションサービスを再起動します。


#### リモートデータセンターと拡張 VLAN {#remote-data-centers--extended-vlans}

**上記で説明した同一サブネットソリューションは**、リモートサイト間の**災害復旧（DR）** にも有効であり、サイトが**拡張 LAN または拡張 VLAN** で接続されている場合には最適な選択肢となることが多い。両サイトが同じサブネットに属しているため、ネットワーク構成が簡素化され、複雑なルーティングプロトコルも不要となる。

> **⚠️ 注意：** レイヤ 2 での Gratuitous ARP によるルーティング変更は、アプリケーションにとって**最も透過的なソリューション**です。アプリケーションは元のクライアント IP アドレスを受け取り、仮想 IP アドレスはローカルで設定されます。**多くのアプリケーションはローカル仮想 IP アドレスを必要とします**。これがないと、これらのアプリケーションは**正しく動作しない可能性があります**。この同一サブネット構成では、SafeKit がメカニズム全体を実装するため、特別な統合作業は不要です。

## ロードバランサー（mirror クラスタ）を使用した場合、仮想 IP アドレスが異なるサブネット間でどのように機能するか {#virtual-ip-different-subnets-failover}

### SafeKit ヘルスチェック機能を備えたロードバランサー {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![2 つの異なるサブネット間でロードバランサーを使用した仮想 IP フェイルオーバーの図](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

ノードが**異なるサブネット**にある場合、Gratuitous ARP では仮想 IP アドレスを移動できません。この場合、仮想 IP アドレスは**ロードバランサー**上にあります。ロードバランサーはトラフィックをプライマリサーバーに送信します。

SafeKit は各ノードに**ヘルスチェック用 URL** を提供します。

  * **プライマリ（PRIM）：**`HTTP 200 OK`。を返します。ロードバランサーはこのノードにトラフィックを送信します。
  * **セカンダリ（SECOND）：**`HTTP 404 NOT FOUND`。を返します。ロードバランサーはこのノードにトラフィックを送信しません。

フェイルオーバーが発生すると、SafeKit は応答を変更し、ロードバランサーはトラフィックを新しいプライマリサーバーに送信します。これは、 [**AWS**](</ja/solutions/aws-high-availability-cluster-synchronous-replication-failover/>)、 [**Azure**](</ja/solutions/azure-high-availability-cluster-synchronous-replication-failover/>)、 [**Google Cloud**](</ja/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>)の**アベイラビリティゾーン**間の標準的なソリューションです。

> **⚠️ 注意：** SafeKit はヘルスチェックを提供します。ロードバランサーは、お客様のネットワークまたはクラウドプロバイダーが提供します。

### 問題点：ロードバランサーが仮想 IP を所有している {#the-load-balancer-pitfall-virtual-ip-on-the-frontend-nat-to-the-physical-ip}

ロードバランサーのみの場合、クライアントは仮想 IP アドレスに接続します。ロードバランサーは仮想 IP アドレスを（NAT によって）プライマリサーバーの**物理 IP アドレス**に変換します。クライアントは仮想 IP アドレスを使用しますが、サーバーは自身の物理 IP アドレスを使用します。サーバーは仮想 IP アドレスを認識しません。

### 仮想 IP アドレスはプライマリサーバー上でローカルに構成したままにしてください。 {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

一部のアプリケーションは、仮想 IP をサーバーアドレスとして使用します。これらのアプリケーションは、**プライマリサーバー上で仮想 IP がローカルに設定されて**いる場合にのみ正しく動作します。その場合：

  * サービスは仮想 IP 上で起動できます。
  * サーバーは仮想 IP アドレスを使用して自身のサービスにアクセスできます。
  * 認証は仮想 IP アドレスで機能します。

**ベストプラクティス：** 仮想 IP を宛先アドレスとして保持するロードバランサーモード（Floating IP や Direct Server Return など）を使用します。次に、プライマリサーバー上で仮想 IP をローカルで構成します。この方法は、仮想 IP のサブネットによって異なります。

  * **仮想 IP アドレスは、サーバーの物理 IP アドレスと同じサブネットに属します。SafeKit** モジュールの `<vip>` セクションはそのままにしておいてください。SafeKit は、仮想 IP アドレスを物理 IP アドレスのネットワークカード上のエイリアスとして自動的に設定します。
  * **仮想 IP アドレスは別のサブネットにあります。SafeKit** で `<vip>` を設定しないでください。アプリケーションの起動前に、 `start_prim` スクリプトを使用して、ループバックなどの専用インターフェースに仮想 IP アドレスを設定してください。アプリケーションの停止後に、 `stop_prim` スクリプトを使用して仮想 IP アドレスを削除してください。これらのコマンドはインテグレーターが作成するものであり、SafeKit 製品には含まれていません。


## クラウドプロバイダーの CLI（mirror クラスタ）を使用して、異なるサブネット間で仮想 IP がどのように機能するか {#virtual-ip-cloud-cli-failover}

### クラウド環境で Gratuitous ARP が機能しない理由 {#why-gratuitous-arp-does-not-work-in-public-clouds}

クラウドネットワーク（AWS、Azure、Google Cloud）は、**Gratuitous ARP を無視します**。クラウドネットワークは、クラウドプラットフォームで割り当てられた IP アドレスにのみトラフィックを送信します。SafeKit はプライマリサーバーに仮想 IP を設定しますが、クラウドネットワークはこのサーバーに仮想 IP トラフィックを送信しません。

### クラウド CLI を使用して仮想 IP を移動する {#moving-the-virtual-ip-through-the-cloud-api-in-safekit-failover-scripts}

ロードバランサーがない場合、クラウドプロバイダーの CLI を SafeKit の **`start_prim` スクリプト**に統合することで、アプリケーション起動前にクラウドネットワーク構成を更新できます。CLI は、プライマリノードとなるノードに仮想 IP アドレスを割り当てたり、クラウドルートを更新して仮想 IP トラフィックをそのノードにルーティングしたりできます。

**仮想 IP アドレスはプライマリサーバー上でローカルに保持されます**。NAT **は行われず**、元のクライアント IP アドレスも変更されません。

### インテグレーターの責任 {#integrator-responsibility}

**インテグレーターは**、 `start_prim` スクリプトにクラウド CLI コマンドを追加する必要があります。これらのコマンドは **SafeKit 製品には含まれていません**。クラウドプロバイダー、ネットワーク設計、および顧客のセキュリティルールによって異なります。

### 制約 {#constraints-of-the-cli-approach}

  * クラウド CLI は両方のノードにインストールする必要があります。各ノードには、ネットワーク権限を持つクラウド ID が必要です。
  * スクリプトはエラー処理と再試行処理を行う必要があります。
  * フェイルオーバーは、ロードバランサーを使用した場合よりもおそらく遅いでしょう。

## BGP（mirror クラスタ）を使用して異なるサブネット間で仮想 IP がどのように機能するか {#virtual-ip-bgp-failover}

### BGP による仮想 IP ルーティング {#layer-3-virtual-ip-rerouting-with-bgp-route-advertisement}

BGP（Border Gateway Protocol）では、仮想 IP アドレスは通常、アプリケーションの起動前に `start_prim` スクリプトによってプライマリサーバーのループバックインターフェースに設定されます。プライマリサーバーは、その仮想 IP アドレスを/32 ルートとしてルーターに通知します。

フェイルオーバーが発生すると、古いプライマリサーバー上の `stop_prim` スクリプトがアプリケーションを停止し、ループバックインターフェイスから VIP を削除し、ルーターから /32 ルートを削除します。古いプライマリサーバーがクラッシュした場合、 `stop_prim` 実行されませんが、ルーターは BGP セッションを失い、ルートを自動的に削除します。

### メリットと前提条件 {#benefits-and-prerequisites}

  * **仮想 IP アドレスはローカルのままであり、NAT は行われず、クライアント IP アドレスも変更されません。**
  * サブネットやサイトをまたいで動作します。拡張 VLAN は必要ありません。
  * BGP ルーターとネットワークチームのサポートが必要です。クラウド環境では、クラウドプロバイダーのルートサーバーサービスが必要です。

> **⚠️ 注意：** BGP 統合には SafeKit スクリプトとお客様のルーティングインフラストラクチャが必要です。**統合担当者は**`start_prim` および `stop_prim` スクリプトにコマンドを記述する必要があります。これらのスクリプトは **SafeKit 製品には含まれていません**。本番運用前にネットワークチームとソリューションの妥当性を検証してください。

## 異なるサブネット間（mirror クラスタ）での DNS リダイレクトの仕組み {#virtual-ip-vs-dns-redirection-failover}

### `start_prim` スクリプトを使用した DNS リルーティング {#dns-rerouting-with-the-start-prim-script}

DNS リダイレクトを使用する場合、**単一の仮想 IP アドレスは存在しません**。クライアントは**仮想名**（DNS 名）に接続します。フェイルオーバー時には、新しいプライマリサーバー上の `start_prim` スクリプトがアプリケーションを起動し、仮想名の DNS レコードを新しいプライマリサーバーの**物理 IP アドレス**に変更します。

`stop_prim` スクリプトは何もする必要はありません。古いプライマリサーバーがクラッシュした場合、新しいプライマリサーバーが DNS レコードを上書きします。

### 例：DNS 解決とブロックされたクライアント {#the-technical-scenario-dns-resolution-and-the-stuck-client}

![高可用性クラスタにおける物理 IP 1 への DNS 名前解決を示す図](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 高可用性クラスタで物理 IP 1 上の DNS 解決とクライアントのブロックが発生する

#### フェイルオーバー前：名前は物理 IP 1 を指しています {#current-state-resolution-to-physical-ip-1}

**クライアント 1** と**クライアント 2 は**、DNS システムに仮想名の IP アドレスを問い合わせます。DNS システムは**物理 IP アドレス 1** を返します。その後、クライアントはこのアドレスへのネットワーク接続を開きます。

#### フェイルオーバー後：名前は物理 IP 2 を指す {#the-failover-challenge-rerouting-to-physical-ip-2}

サーバー 1 が故障します。サーバー 2 上の `start_prim` スクリプトは、DNS レコードを**物理 IP アドレス 2** に変更します。クライアントは、以下のすべての条件が満たされた場合にのみ、物理 IP アドレス 2 に接続します。

  * クライアントと DNS レコード間のすべての DNS サーバーにおいて、**TTL（有効期限）** が期限切れとなりました。
  * クライアント 1 とクライアント 2 のローカル DNS キャッシュは空です。
  * アプリケーションは接続を閉じ、*新しい*DNS ルックアップを実行します。

いずれかの条件が満たされない場合、**クライアント 1 とクライアント 2 は物理 IP アドレス 1 上でブロックされたままになります。DNS** レコードが正しくても、サービスは停止状態となります。

### 制限事項と前提条件 {#the-two-black-boxes-of-dns-redirection}

  * **DNS キャッシュ：** 多くのインターネットサービスプロバイダや企業の DNS サーバーは、短い TTL 値を無視します。そのため、古い物理 IP アドレスを数分から数時間保持してしまうことがあります。
  * **アプリケーションの動作：** 多くのアプリケーション（例えば、Java サービスや Web ブラウザ）は、起動時に一度だけ DNS ルックアップを実行します。そして、最初に取得した IP アドレスを使い続けます。
  * **フェイルオーバーのたびに IP アドレスが変更されます。** アプリケーションには、固定のローカル仮想 IP アドレスがありません。独自の IP アドレスを登録するアプリケーションは、正常に動作しない可能性があります。
  * **前提条件：** DNS レコードの TTL（有効期限）を短く設定すること（例えば、30～60 秒）、および両方のサーバーから DNS ゾーンを更新する権限があること。

> **⚠️ 注意：** **インテグレーターは**、 `start_prim` スクリプトに DNS 更新コマンドを記述する必要があります。これらのコマンドは **SafeKit 製品には含まれていません**。DNS サーバー（Windows DNS、BIND、またはクラウド DNS）に依存します。

### 結論 {#conclusion}

DNS リダイレクトは、信頼性の高い高可用性ソリューションではありません。再接続時にすべてのクライアントが新しい DNS ルックアップを実行する場合にのみ使用してください。即時かつ透過的なフェイルオーバーを実現するには、**仮想 IP** アドレスを使用してください。拡張 LAN、ロードバランサー、クラウドプロバイダーの CLI、または BGP を使用できます。

## 同一サブネット上の <span class="notranslate farm-term" translate="no">farm</span> クラスタにおける仮想 IP ロードバランシングの仕組み {#virtual-ip-load-balancing-same-subnet}

- [SafeKit farm クラスタにおけるロードバランシング仮想 IP アドレスのテスト](/ja/best-practises/test-load-balancing-vip-farm/)

### カーネルにおける冗長性を備えた負荷分散 {#scalable-performance-kernel-level-load-balancing--redundancy}

トラフィックが多い場合、SafeKit は複数の稼働中のサーバー間で処理を分散させることができます。いずれかのサーバーが故障しても、他のサーバーが処理を継続します。

### <span class="notranslate farm-term" translate="no">Farm</span> クラスタアーキテクチャ：Windows ノードと Linux ノード間の負荷分散 {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


![同一サブネット内の負荷分散型仮想 IP の図](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

**ロードバランシング <span class="notranslate farm-term" translate="no">farm</span> クラスタ**では、クライアントは仮想 IP に接続し、リクエストは複数のサーバー間で同時に共有されます。この例では 2 つのノードを示していますが、クラスタにノードを追加することも可能です。同じサブネット内では、クラスタ内の**すべてのサーバー**のネットワークカードに IP エイリアシングが設定され、仮想 IP が構成されます。

#### トラフィック共有：カーネルフィルタ {#traffic-distribution-the-kernel-level-filter}

<span class="notranslate farm-term" translate="no">farm</span> クラスタでは、**カーネル内の SafeKit フィルタが**トラフィックを共有します。その仕組みは次のとおりです。

  * **ARP マッピング：** クライアントの ARP キャッシュでは、仮想 IP が 1 つの MAC アドレス（例えば、サーバー 1 の `mac1`）にリンクされます。
  * **パケット解析：** サーバー 1 はパケットを受信します。SafeKit カーネルフィルタは、各パケットの**クライアント IP** アドレスまたは **TCP ポート**を読み取ります。
  * **負荷分散：** フィルタは、サーバー 1 が処理するパケットと、他のノード（例えばサーバー 2）に送信するパケットを決定します。パケットを別のノードに送信する場合、フィルタはパケットの**宛先 MAC アドレスを**そのノードの MAC アドレスに書き換えます。宛先 IP アドレスは仮想 IP アドレスのままです。処理はサーバー間で分散されます。


#### 無償 ARP によるフェイルオーバーと再ルーティング {#failover-and-rerouting-with-gratuitous-arp}

サーバー 1 に障害が発生した場合、SafeKit は **GARP（Gratuitous ARP）** メッセージを送信します。クライアントはサーバー 2 の `mac2` を使用して ARP キャッシュを更新します。その後、クライアントは farm 内の他のノードに即座に接続されます。

#### 遠隔地への展開 {#deployment-in-remote-sites}

この負荷分散ソリューションは、**拡張 LAN または VLAN** で接続された**リモートデータセンター**間でも機能します。この場合、すべてのサイトは同じサブネットに属します。これは、複数のサイトにまたがる <span class="notranslate farm-term" translate="no">farm</span> クラスタにとって最も効率的な構成です。

{{%  insert-safekit-farm-video-ja  %}}

## 異なるサブネット（<span class="notranslate farm-term" translate="no">farm</span> クラスタ）間で負荷分散された仮想 IP がどのように機能するか {#virtual-ip-load-balancing-different-subnets}

### クラウドサブネット間のトラフィック {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

<span class="notranslate farm-term" translate="no">farm</span> クラスタは、複数の可用性ゾーンとサブネット間でアプリケーションの処理を分散させることができます。

### クロスサブネット <span class="notranslate farm-term" translate="no">farm</span> クラスタ：複数の Windows または Linux ノード {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


![2 つの異なるサブネットにまたがって動作する負荷分散型 farm クラスタの図](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

<span class="notranslate farm-term" translate="no">farm</span> ノードが**異なるサブネット**（例えば、複数のクラウド可用性ゾーン）にある場合、**仮想 IP** は外部**ロードバランサー（LB）** 上に配置されます。ロードバランサーは、各サブネット内のサーバーの物理 IP アドレスにトラフィックを送信します。

#### トラフィックルーティングと負荷分散ルール {#intelligent-traffic-routing--load-balancing-rules}

ロードバランサーは、以下の 2 つの基準に基づいてクライアントからのリクエストを共有します。

  * **負荷分散ルール:** 例えば、**クライアントの IP アドレス**や**クライアントの TCP ポートなど**。
  * **ノードの可用性：** ロードバランサーは、SafeKit のヘルスチェックに基づいて、正常なノードにのみトラフィックを送信します。


> **⚠️ 注意：** SafeKit はヘルスチェックを提供します。ロードバランサーは、お客様のネットワークまたはクラウドプロバイダーが提供します。

#### SafeKit のヘルスチェック {#safekit-health-check-mechanism}

SafeKit は、 <span class="notranslate farm-term" translate="no">farm</span> 内のすべてのサーバーに**ヘルスチェック用の URL** を提供します。ロードバランサーはこの URL を読み取り、各サーバーの状態を把握します。

  * **ノード稼働中：** ヘルスチェックで `HTTP 200 OK`。が返されました。ロードバランサーはこのサーバーにトラフィックを送信します。
  * **ノードダウン：** サーバーまたはアプリケーションに障害が発生した場合、SafeKit は `HTTP 404 NOT FOUND` を返します（またはサーバーが応答しません）。ロードバランサーは直ちにこのノードへのトラフィック送信を停止します。


#### クラウド導入：AWS、Azure、GCP {#cloud-deployment-standards-aws-azure-and-gcp}

これは**クラウドにおける <span class="notranslate farm-term" translate="no">farm</span> クラスター**の標準アーキテクチャです。サブネットまたはゾーンが停止しても、他のノードがトラフィックの処理を継続します。Amazon [**AWS**](</ja/solutions/aws-load-balancing-cluster-failover/>) （AWS Network Load Balancer）、 [**Microsoft Azure**](</ja/solutions/azure-load-balancing-cluster-failover/>) （Azure Load Balancer）、および[**Google Cloud（GCP）**](</ja/solutions/gcp-load-balancing-cluster-failover/>) （Google Cloud Load Balancing）でサポートされています。


## 比較：仮想 IP の実装、レイテンシ、およびアプリケーションの透過性 {#virtual-ip-methods-comparison}

**高可用性と災害復旧のための仮想 IP リダイレクト方式と DNS リダイレクト方式の比較。**

環境とユースケース | 高可用性タイプ | リダイレクト方法 | 実装者 | ネットワーク遅延 | アプリケーションの透明性とローカル IP  
---|---|---|---|---|---  
プライマリ／バックアップ（高可用性） | Mirror クラスター | 不必要な ARP/MAC 乗っ取り | ✅ SafeKit 製品 | 非常に低い: 障害を検出して GARP を送信するまでの時間 | 完全な透明性：仮想 IP アドレスはアクティブノード上のローカル IP アドレスです。クライアント IP アドレスは変更されません。  
負荷分散（アクティブ/アクティブ） | <span class="notranslate farm-term" translate="no">Farm</span> 群 | カーネルネットワークフィルタ / GARP | ✅ SafeKit 製品 | 非常に低い：障害を検出してネットワークフィルタを変更するまでの時間 | 完全な透明性：仮想 IP アドレスはすべてのノードでローカルです。クライアント IP アドレスは変更されません。  
同一サブネット／拡張 LAN（ストレッチ VLAN） | 災害復旧（遠隔データセンター） | IP エイリアシング/GARP | ✅ SafeKit 製品（拡張 VLAN はネットワークチームによって提供されます） | 低: 拡張 VLAN の往復時間(RTT)に依存します | 完全な透明性：仮想 IP アドレスはノード上でローカルです。クライアント IP アドレスは変更されません。  
異なるサブネット：ロードバランサーのみ | 災害復旧（リモートデータセンター／クラウド） | 外部ロードバランサー | 🛠️インテグレーター：ロードバランサーの設定（SafeKit がヘルスチェックを提供します） | 中程度：ロードバランサーのヘルスチェック間隔によって異なります | ⚠️ SNAT/DNAT を使用する場合、透過性は部分的にしか確保されません。仮想 IP アドレスはノード上でローカル**ではありません**。クライアント IP アドレスが保持され**ない**場合があります。アプリケーションはこの機能をサポートする必要があります。  
異なるサブネット：ロードバランサー + ローカル SafeKit 仮想 IP | 災害復旧（リモートデータセンター／クラウド） | Floating IP / Direct Server Return を備えた外部ロードバランサー | 🛠️インテグレーター：ロードバランサーの設定（SafeKit がヘルスチェックを提供します） | 中程度：ロードバランサーのヘルスチェック間隔によって異なります | 優れた透明性：仮想 IP はプライマリノード上のローカル IP であり、宛先アドレスです。
異なるサブネット: クラウド CLI | 災害復旧（クラウド） | クラウド API：プライベート IP またはクラウドルートが新しいプライマリに移動します | 🛠️ インテグレーター: `start_prim` スクリプト内のクラウド CLI コマンド | 中～高：クラウド API の応答時間による | 完全な透明性：仮想 IP アドレスはプライマリノード上でローカルに設定されます。クライアント IP アドレスは変更されません。
異なるサブネット: BGP | 災害復旧（リモートデータセンター／クラウド） | /32 ルートが BGP でアナウンスされました | 🛠️ インテグレーター: `start_prim` および `stop_prim` スクリプト内の BGP コマンド | 低～中程度：BGP 収束時間による | 完全な透明性：仮想 IP アドレスはプライマリノード上でローカルに設定されます。クライアント IP アドレスは変更されません。BGP ルーターが必要です。  
DNS リダイレクト：仮想 IP なし | 災害復旧（遠隔データセンター） | DNS レコードの変更（名前／物理 IP アドレス） | 🛠️ インテグレーター: `start_prim` スクリプト内の DNS 更新コマンド | 高い値で予測不可能：DNS TTL（Time To Live）とクライアントの DNS キャッシュに依存します | ⚠️ 信頼性が低い：クライアントは新しい DNS ルックアップを実行する必要があります。多くの場合、クライアントは起動時に取得した古い IP アドレスを保持し、フェイルオーバー後も再ルーティングされません。  
  
## 仮想 IP に関するよくある質問 {#virtual-ip-faq}

### 仮想 IP とネットワーク {#virtual-ip--networking}

仮想 IP とは何ですか？また、物理 IP とはどのように異なりますか？

**物理 IP アドレス**は 1 枚のネットワークカードに紐づけられます。**仮想 IP アドレス**はハードウェアに紐づけられません。SafeKit クラスタでは、クライアントは常に仮想 IP アドレスを使用します。プライマリサーバーに障害が発生した場合、仮想 IP アドレスは自動的に正常なノードに移動します。クライアントの設定を変更する必要はありません。

仮想 IP を使用するには、ハードウェアロードバランサーが必要ですか？

いいえ。SafeKit **は**ソフトウェアで仮想 IP を管理します。同じサブネット内では、**IP エイリアシング**と **GARP（Gratuitous ARP）** を使用してトラフィックをリダイレクトします。外部のロードバランサーやプロキシサーバーは必要ありません。

無償 ARP（GARP）とは何ですか？また、なぜ使用されるのですか？

**Gratuitous ARP（GARP）** は、すべてのデバイスに送信されるネットワークメッセージです。スイッチやルーターの ARP テーブルを更新します。フェイルオーバーが発生すると、新しいプライマリサーバーが GARP メッセージを送信します。このメッセージは、**仮想 IP** アドレスが新しいプライマリサーバーの MAC アドレスにリンクされたことを示します。その後、トラフィックは直ちに再ルーティングされます。

仮想 IP アドレスに DNS 名を関連付けることはできますか？

**はい。** 仮想 IP アドレスに対して標準の A レコードを作成してください。リダイレクトは **DNS レベルではなく**、**仮想 IP レベル**（ARP またはネットワークリダイレクトを使用）で行われます。DNS の遅延や TTL の問題は発生せず、フェイルオーバーは**アプリケーションにとって透過的**です。

### クラウドと高度なアーキテクチャ {#cloud--advanced-architectures}

クラウド（AWS、Azure、GCP）における仮想 IP アドレスの仕組みは？

クラウド環境では、レイヤー 2 の GARP メッセージを使用して仮想 IP アドレスをルーティングすることはできません。SafeKit は**クラウドロードバランサー**（AWS ELB、Azure LB、Google GCLB など）と連携して動作します。SafeKit は**ヘルスチェック用の URL** を提供し、ロードバランサーはこの URL を読み取ってトラフィックをアクティブなノードに送信します。

災害復旧において、拡張 LAN はロードバランサーよりも優れているのでしょうか？

**はい**。遠隔地のデータセンター間では、**拡張 LAN（ストレッチ VLAN）** の方が多くの場合優れています。なぜなら、フェイル**オーバーがアプリケーションにとって透過的に**行われるからです。**仮想 IP アドレスは変更されない**ため、データセンター間のフェイルオーバー後も、アプリケーションとそのクライアントは同じアドレスを使い続けることができます。

仮想 IP アドレスと比較した場合、DNS リダイレクトにはどのような限界がありますか？

**DNS リダイレクトは** **TTL（Time to Live）** とクライアント DNS キャッシュに依存します。復旧には数時間かかる場合があります。また、**新しい DNS ルックアップを行わないクライアントは、障害が発生したサーバーでブロックされたままになります**。**仮想 IP** は、レイヤー 2 で GARP メッセージを使用して即座に再ルーティングされます。クライアント DNS キャッシュは影響しません。

### 透明性とセキュリティ {#transparency--security}

アプリケーションの透過性にとって、ローカル仮想 IP が重要なのはなぜですか？

ローカル**仮想 IP** を使用する場合、アプリケーションは変更されないアドレスを使用します。SafeKit が**カーネル**内でリダイレクトを実行します。アプリケーションはフェイルオーバーを認識しません。DNAT を使用する場合、アプリケーションが使用するアドレスは変更されます。

仮想 IP アドレスは、元のクライアント IP アドレスを保持しますか？

はい。SafeKit はソース NAT（SNAT）を使用しません。仮想 IP アドレスはアクティブサーバー上のローカル IP アドレスであるため、アプリケーションは**元のクライアント IP** アドレスを受信します。これは、セキュリティ監査、セッションの永続性、および規制ログにとって重要です。


{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}
