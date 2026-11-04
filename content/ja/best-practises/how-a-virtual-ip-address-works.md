---
title: "高可用性クラスターで仮想IPアドレスはどのように機能するか"
canonical: "https://safekit.eviden.com/ja/best-practises/how-a-virtual-ip-address-works/"
description: "SafeKitがフェイルオーバー時にGARP、ロードバランサー、クラウドCLI、BGPを使って仮想IPを移動する仕組みを説明します。"
category: "best-practises"
lang: "ja"
topics: "高可用性クラスターの仮想IPアドレスとは, SafeKitでの仮想IPアドレスの実装, 同一サブネットでの仮想IPアドレスの動作（Mirrorクラスター）, ロードバランサーを使用して異なるサブネット間で仮想IPアドレスを使用する方法（Mirrorクラスター）, クラウドプロバイダーのCLIを使用して異なるサブネット間で仮想IPアドレスを使用する方法（Mirrorクラスター）, BGPを使用して異なるサブネット間で仮想IPアドレスを使用する方法（Mirrorクラスター）, 異なるサブネット間でのDNSリダイレクトの仕組み（Mirrorクラスター）, 同一サブネットのFarmクラスターにおける仮想IPロードバランシング, 異なるサブネット間の仮想IPロードバランシング（Farmクラスター）, 実装、レイテンシー、アプリケーション透過性の比較, 仮想IPに関するよくある質問, 🔍 SafeKitを確認"
---

# 高可用性クラスターで仮想IPアドレスはどのように機能するか {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## 高可用性クラスターの仮想IPアドレスとは {#virtual-ip-definition}

**仮想IPアドレス**は、[高可用性クラスター](</ja/>)内のアプリケーションにクライアントが接続するための唯一のアドレスです。特定のサーバーには紐づいていません。フェイルオーバー時に、アプリケーションを実行するサーバーへ移動します。クライアント側の設定変更は不要です。

**SafeKitの基本原則:** 仮想IPアドレスは、アプリケーションを実行するサーバー上に**ローカルに設定**されます。アプリケーションはこのアドレスで起動し、クライアントの元のIPアドレスを受け取ります。そのため、多くのアプリケーションは変更なしでSafeKit上で正常に動作します。SafeKitは次の2種類の仮想IPアドレスを提供します。

  * **Mirrorクラスターのプライマリ／セカンダリ仮想IP:** 仮想IPアドレスはプライマリサーバーでのみ有効です。フェイルオーバー時にセカンダリサーバーへ移動します。
  * **<span class="notranslate farm-term" translate="no">farm</span>クラスターのネットワーク負荷分散仮想IP:** 仮想IPアドレスはすべてのサーバーで同時に有効になり、トラフィックが各サーバーに分散されます。

## SafeKitでの仮想IPアドレスの実装 {#safekit-virtual-ip-implementation}

この記事では、ネットワーク構成ごとにSafeKitが仮想IPアドレスを移動する方法を説明します。

  * **同一サブネットまたは拡張LAN（[Mirror](#virtual-ip-same-subnet-failover)クラスターと[<span class="notranslate farm-term" translate="no">Farm</span>](#virtual-ip-load-balancing-same-subnet)クラスター）：** SafeKitはサーバーに仮想IPアドレスを設定し、**Gratuitous ARP（GARP）**を送信します。外部ハードウェアは不要です。SafeKitがすべての処理を実装するため、最も透過性の高い方法です。
  * **ロードバランサーを使用する異なるサブネット（[Mirror](#virtual-ip-different-subnets-failover)クラスターと[<span class="notranslate farm-term" translate="no">Farm</span>](#virtual-ip-load-balancing-different-subnets)クラスター）：** ロードバランサーはSafeKitの**ヘルスチェック**を使用して、適切なサーバーへトラフィックを送ります。ロードバランサーはインテグレーターが設定します。
  * **[クラウドプロバイダーのCLIを使用する異なるサブネット](#virtual-ip-cloud-cli-failover)（Mirrorクラスター）：** SafeKitの`start_prim`スクリプトがクラウドCLIを呼び出して仮想IPを移動します。スクリプトはインテグレーターが作成します。
  * **[BGPを使用する異なるサブネット](#virtual-ip-bgp-failover)（Mirrorクラスター）：** プライマリサーバーが仮想IPをルーターにアナウンスします。スクリプトはインテグレーターが作成します。
  * **[DNSリダイレクトを使用する異なるサブネット](#virtual-ip-vs-dns-redirection-failover)（Mirrorクラスター）：** SafeKitの`start_prim`スクリプトが仮想名のDNSレコードを変更し、新しいプライマリサーバーの**物理IPアドレス**を指定します。スクリプトはインテグレーターが作成します。単一の仮想IPはなく、この方法はすべてのクライアントに対して信頼できるとは限りません。

この記事の内容:

  * [実装、レイテンシー、アプリケーション透過性の比較](#virtual-ip-methods-comparison)
  * [仮想IPに関するよくある質問](#virtual-ip-faq)
  * [🔍 SafeKitを確認](#hub)

![Evidian SafeKitにおける仮想IPの動作比較。Mirrorクラスターではアクティブノード上のフローティングIP、Farmクラスターでは全ノードでのネットワーク負荷分散を示しています。](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**SafeKitのMirrorクラスターと<span class="notranslate farm-term" translate="no">Farm</span>クラスターにおける仮想IPアドレスの実装。**

## 同一サブネットでの仮想IPアドレスの動作（Mirrorクラスター） {#virtual-ip-same-subnet-failover}

- [SafeKit Mirrorクラスターのプライマリ／セカンダリ仮想IPアドレスをテスト](/ja/best-practises/test-primary-backup-vip-mirror/)

### ローカルサブネットでの自動フェイルオーバーとネットワーク再ルーティング {#automated-failover--network-rerouting-in-a-local-subnet}

ローカルネットワークでは、**SafeKit**が仮想IPアドレスとアプリケーションのフェイルオーバーを自動的に管理します。

### ローカルMirrorクラスター: WindowsまたはLinux上の2ノードフェイルオーバー {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}

![同一サブネット内の2台のサーバー間でSafeKitの仮想IPがフェイルオーバーする仕組み](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

**SafeKit Mirrorクラスター**では、2つのノードが同一サブネットに配置されます。高可用性は**仮想IPアドレス**を使用します。SafeKitはオペレーティングシステムのネットワークスタック内で仮想IPを管理するため、特別なハードウェアは必要ありません。仮想IPアドレスは**IPエイリアス**によってサーバー1とサーバー2の物理IPアドレスに追加されます。クライアントは常に仮想IPアドレスに接続します。

#### SafeKitのIPエイリアスと複数仮想IP（VIP）対応 {#safekits-advanced-ip-aliasing--multiple-virtual-ip-support}

仮想IPアドレスは、ノード間を移動する3つ目のIPアドレスです。SafeKitは1つのクラスターで**複数の仮想IPアドレス**を管理できます。同じネットワークカードまたは異なるネットワークカードに設定できるため、各サービスに独自の仮想IPを割り当てられます。

#### フェイルオーバーの仕組み: Gratuitous ARP（GARP） {#the-failover-mechanism-gratuitous-arp-garp}

フェイルオーバーに手動操作は必要ありません。通常運用時、仮想IPアドレスは**サーバー1のMACアドレス（mac1）**に紐づいています。サーバー1が故障すると、SafeKitは次の3つの処理を行います。

  * **仮想IPのエイリアス設定:** SafeKitは、新しいプライマリとなるサーバー2のネットワークカードに仮想IPをエイリアスとして設定します。その後、OSがネットワークにメッセージを送信し、仮想IPを通知します。
  * **GARP:** SafeKitは**Gratuitous ARP（GARP）**メッセージも送信します。ネットワークスイッチとクライアントはARPキャッシュを更新します。仮想IPアドレスは**サーバー2のMACアドレス（mac2）**に紐づきます。
  * **アプリケーションの復旧:** SafeKitはサーバー2上でアプリケーションサービスを再起動します。

#### リモートデータセンターと拡張VLAN {#remote-data-centers--extended-vlans}

上記の**同一サブネットのソリューション**は、リモートサイト間の**災害復旧（DR）**にも適しています。サイト間が**拡張LANまたは拡張VLAN**で接続されている場合は、最適な選択肢となることがよくあります。両サイトが1つのサブネットに属するため、ネットワークが簡素化され、複雑なルーティングプロトコルが不要になります。

> **⚠️ 注意:** Gratuitous ARPによるレイヤー2の再ルーティングは、アプリケーションにとって**最も透過性の高い方法**です。アプリケーションはクライアントの元のIPアドレスを受け取り、仮想IPアドレスはローカルに設定されます。**多くのアプリケーションは**ローカル仮想IPを必要とします。ローカル仮想IPがないと、**正常に動作しない場合があります**。同一サブネット構成ではSafeKitがすべての処理を実装するため、特別な統合は不要です。

## ロードバランサーを使用して異なるサブネット間で仮想IPアドレスを使用する方法（Mirrorクラスター） {#virtual-ip-different-subnets-failover}

### SafeKitヘルスチェックを使用するロードバランサー {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![異なる2つのサブネット間でロードバランサーを使用して仮想IPをフェイルオーバーする図](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

ノードが**異なるサブネット**にある場合、Gratuitous ARPでは仮想IPを移動できません。この場合、仮想IPアドレスは**ロードバランサー**上にあり、プライマリサーバーへトラフィックを送ります。

SafeKitは各ノードに**ヘルスチェックURL**を提供します。

  * **プライマリ（PRIM）:** `HTTP 200 OK`を返します。ロードバランサーはこのノードにトラフィックを送ります。
  * **セカンダリ（SECOND）:** `HTTP 404 NOT FOUND`を返します。ロードバランサーはこのノードにトラフィックを送りません。

フェイルオーバー時にSafeKitが応答を変更し、ロードバランサーは新しいプライマリへトラフィックを送ります。これは[**AWS**](</ja/solutions/aws-high-availability-cluster-synchronous-replication-failover/>)、[**Azure**](</ja/solutions/azure-high-availability-cluster-synchronous-replication-failover/>)、[**Google Cloud**](</ja/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>)の**アベイラビリティゾーン**間で標準的な方法です。

> **⚠️ 注意:** SafeKitはヘルスチェックを提供します。ロードバランサーはネットワークまたはクラウドプロバイダーが提供します。

### 問題: ロードバランサーが仮想IPを所有する {#the-load-balancer-pitfall-virtual-ip-on-the-frontend-nat-to-the-physical-ip}

ロードバランサーのみを使用する場合、クライアントは仮想IPに接続します。ロードバランサーはNATを使って仮想IPをプライマリサーバーの**物理IPアドレス**に変換します。クライアントは仮想IPを使用しますが、サーバーは物理IPを使用するため、サーバーは仮想IPを認識しません。

### プライマリサーバー上で仮想IPをローカルに設定する {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

仮想IPをサーバーアドレスとして使用するアプリケーションがあります。これらのアプリケーションが正常に動作するには、仮想IPを**プライマリサーバー上にもローカルに設定**する必要があります。設定すると:

  * サービスを仮想IPアドレスで起動できる
  * サーバーが仮想IPを使って自身のサービスにアクセスできる
  * 仮想IPを使った認証が機能する

**推奨事項:** Floating IPやDirect Server Returnなど、仮想IPを宛先アドレスとして保持するロードバランサーモードを使用します。その後、仮想IPをプライマリサーバー上にローカル設定します。設定方法は仮想IPが属するサブネットによって異なります。

  * **仮想IPがサーバーの物理IPと同じサブネットにある場合:** SafeKitモジュールの`<vip>`セクションを維持します。SafeKitは物理IPアドレスに関連付けられたネットワークカード上に、仮想IPをエイリアスとして自動設定します。
  * **仮想IPが異なるサブネットにある場合:** SafeKitで`<vip>`を設定しないでください。`start_prim`スクリプトを使用して、アプリケーションの起動前にloopbackなどの専用インターフェースへ仮想IPを設定します。アプリケーション停止後に`stop_prim`で削除します。これらのコマンドはインテグレーターが作成するもので、SafeKit製品には含まれません。

## クラウドプロバイダーのCLIを使用して異なるサブネット間で仮想IPアドレスを使用する方法（Mirrorクラスター） {#virtual-ip-cloud-cli-failover}

### クラウドでGratuitous ARPが機能しない理由 {#why-gratuitous-arp-does-not-work-in-public-clouds}

クラウドネットワーク（AWS、Azure、Google Cloud）は**Gratuitous ARPを無視**します。クラウドプラットフォームに割り当てられたIPアドレスに対してのみトラフィックを送信します。SafeKitはプライマリサーバーに仮想IPを設定しますが、クラウドネットワークは仮想IPのトラフィックをそのサーバーに送りません。

### クラウドCLIで仮想IPを移動する {#moving-the-virtual-ip-through-the-cloud-api-in-safekit-failover-scripts}

ロードバランサーがない場合、クラウドプロバイダーのCLIをSafeKitの**`start_prim`スクリプト**に組み込み、アプリケーション起動前にクラウドネットワーク設定を更新できます。CLIで仮想IPをプライマリになるノードに割り当てるか、クラウドルートを更新してそのノードへトラフィックを転送できます。

**仮想IPはプライマリサーバー上にローカルに保持**されます。**NATは使用せず**、クライアントの元のIPアドレスも変わりません。

### インテグレーターの責任 {#integrator-responsibility}

**インテグレーター**はクラウドCLIコマンドを`start_prim`スクリプトに追加する必要があります。これらのコマンドは**SafeKit製品には含まれません**。クラウドプロバイダー、ネットワーク設計、お客様のセキュリティルールによって異なります。

### 制約事項 {#constraints-of-the-cli-approach}

  * クラウドCLIを両方のノードにインストールする必要があります。各ノードには必要なネットワーク権限を持つクラウドIDが必要です。
  * スクリプトでエラーと再試行を処理する必要があります。
  * ロードバランサーを使用する場合よりフェイルオーバーが遅くなる可能性があります。

## BGPを使用して異なるサブネット間で仮想IPアドレスを使用する方法（Mirrorクラスター） {#virtual-ip-bgp-failover}

### BGPによる仮想IPの再ルーティング {#layer-3-virtual-ip-rerouting-with-bgp-route-advertisement}

**BGP（Border Gateway Protocol）**では、通常、アプリケーションの起動前に`start_prim`スクリプトがプライマリサーバーのloopbackインターフェースに仮想IPを設定します。プライマリサーバーはその後、VIPを/32ルートとしてルーターにアナウンスします。

フェイルオーバー時、旧プライマリサーバー上の`stop_prim`スクリプトがアプリケーションを停止し、loopbackインターフェースからVIPを削除して、ルーターから/32ルートを取り下げます。旧プライマリサーバーがクラッシュした場合、`stop_prim`は実行されませんが、ルーターはBGPセッションを失い、ルートを自動的に削除します。

### メリットと前提条件 {#benefits-and-prerequisites}

  * **仮想IPはローカルに保持され、NATは使用せず、クライアントIPも変わりません。**
  * サブネットやサイトをまたいで動作し、拡張VLANは不要です。
  * BGPルーターとネットワークチームの協力が必要です。クラウドではプロバイダーのルートサーバーサービスが必要です。

> **⚠️ 注意:** BGP統合ではSafeKitスクリプトとルーティングインフラストラクチャを使用します。**インテグレーター**は`start_prim`および`stop_prim`スクリプトにコマンドを記述する必要があります。これらのスクリプトは**SafeKit製品には含まれません**。本番環境に導入する前にネットワークチームと検証してください。

## DNSリダイレクトを使用して異なるサブネット間で仮想IPアドレスを使用する方法（Mirrorクラスター） {#virtual-ip-vs-dns-redirection-failover}

### `start_prim`スクリプトによるDNSリダイレクト {#dns-rerouting-with-the-start-prim-script}

DNSリダイレクトでは、**単一の仮想IPアドレスはありません**。クライアントは**仮想名**（DNS名）に接続します。フェイルオーバー時、新しいプライマリサーバー上の`start_prim`スクリプトがアプリケーションを起動し、仮想名のDNSレコードを新しいプライマリサーバーの**物理IPアドレス**に変更します。

`stop_prim`スクリプトで実行する処理はありません。旧プライマリサーバーがクラッシュした場合、新しいプライマリサーバーがDNSレコードを上書きします。

### 例: DNS解決と接続できないクライアント {#the-technical-scenario-dns-resolution-and-the-stuck-client}

![高可用性クラスターでDNS名が物理IPアドレス1に解決される様子](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

DNS解決: 高可用性クラスターでクライアントが物理IPアドレス1に接続したままになる状態。

#### フェイルオーバー前: 名前は物理IPアドレス1を指す {#current-state-resolution-to-physical-ip-1}

**クライアント1**と**クライアント2**はDNSシステムに仮想名のIPアドレスを問い合わせます。DNSシステムは**物理IPアドレス1**を返します。クライアントはこのアドレスへのネットワーク接続を開きます。

#### フェイルオーバー後: 名前は物理IPアドレス2を指す {#the-failover-challenge-rerouting-to-physical-ip-2}

サーバー1が故障します。サーバー2の`start_prim`スクリプトがDNSレコードを**物理IPアドレス2**に変更します。クライアントがこのアドレスに接続できるのは、次のすべての条件を満たした場合だけです。

  * クライアントとDNSレコードの間にあるすべてのDNSサーバーで**TTL（Time to Live）**が期限切れになっている。
  * クライアント1とクライアント2のローカルDNSキャッシュが空になっている。
  * アプリケーションが接続を閉じて、**新たに**DNSを検索する。

1つでも条件を満たさないと、**クライアント1とクライアント2は物理IPアドレス1に接続したまま**になります。DNSレコードが正しくてもサービスを利用できません。

### 制限事項と前提条件 {#the-two-black-boxes-of-dns-redirection}

  * **DNSキャッシュ:** 多くのインターネットサービスプロバイダーや企業のDNSサーバーは短いTTLを無視し、古い物理IPアドレス1を数分から数時間保持する場合があります。
  * **アプリケーションの動作:** JavaサービスやWebブラウザーなど、多くのアプリケーションは起動時に一度だけDNSを検索し、その後も最初のIPアドレスを使い続けます。
  * **フェイルオーバーごとにIPアドレスが変わる:** アプリケーションはローカルの固定仮想IPを持ちません。アプリケーション自身のIPアドレスを登録する場合、正常に動作しないことがあります。
  * **前提条件:** DNSレコードのTTLが短いこと（例: 30～60秒）、および両方のサーバーからDNSゾーンを更新できる権限があること。

> **⚠️ 注意:** **インテグレーター**はDNS更新コマンドを`start_prim`スクリプトに記述する必要があります。これらのコマンドは**SafeKit製品には含まれず**、DNSサーバー（Windows DNS、BIND、クラウドDNS）によって異なります。

### まとめ {#conclusion}

DNSリダイレクトは信頼できる高可用性ソリューションではありません。再接続時にすべてのクライアントがDNSを再検索する場合に限り使用してください。即時かつ透過的なフェイルオーバーには、拡張LAN、ロードバランサー、クラウドプロバイダーのCLI、またはBGPを使用した**仮想IPアドレス**を利用してください。

## 同一サブネットのFarmクラスターにおける仮想IPの負荷分散 {#virtual-ip-load-balancing-same-subnet}

- [SafeKit Farmクラスターの負荷分散仮想IPをテスト](/ja/best-practises/test-load-balancing-vip-farm/)

### カーネル内の負荷分散と冗長性 {#scalable-performance-kernel-level-load-balancing--redundancy}

トラフィックが多い場合、SafeKitは複数のアクティブサーバーに処理を分散できます。1台のサーバーが故障しても、他のサーバーは動作を続けます。

### Farmクラスターの構成: WindowsまたはLinuxノード間の負荷分散 {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}

![同一サブネット内で負荷分散を行う仮想IPの図](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

**負荷分散を行うFarmクラスター**では、クライアントが仮想IPに接続し、リクエストが複数のサーバーに同時に分散されます。この例では2つのノードを示していますが、クラスターにサーバーを追加できます。同一サブネットでは、クラスター内の**すべてのサーバー**のネットワークカードにIPエイリアスを設定して仮想IPを構成します。

#### トラフィック分散: カーネルフィルター {#traffic-distribution-the-kernel-level-filter}

<span class="notranslate farm-term" translate="no">Farm</span>クラスターでは、SafeKitの**カーネル内フィルター**がトラフィックを分散します。処理の流れは次のとおりです。

  * **ARPマッピング:** クライアントのARPキャッシュでは、仮想IPが1つのMACアドレス（例: サーバー1の`mac1`）に紐づいています。
  * **パケット分析:** サーバー1がパケットを受信します。SafeKitのカーネルフィルターは、各パケットの**クライアントIP**または**TCPポート**を読み取ります。
  * **負荷分散:** フィルターはサーバー1が処理するパケットと、サーバー2など他のノードへ送るパケットを決定します。他のノードへ送る場合、パケットの**宛先MACアドレス**をそのノードのMACアドレスに書き換えます。宛先IPアドレスは仮想IPのままです。これによりサーバー間で処理を分散します。

#### Gratuitous ARPによるフェイルオーバーと再ルーティング {#failover-and-rerouting-with-gratuitous-arp}

サーバー1が故障すると、SafeKitは**Gratuitous ARP（GARP）**メッセージを送信します。クライアントはサーバー2のMACアドレスである`mac2`を使ってARPキャッシュを更新します。その後、トラフィックは直ちに他のFarmノードへ送られます。

#### リモートサイトへの展開 {#deployment-in-remote-sites}

この負荷分散ソリューションは、**拡張LANまたはVLAN**で接続された**リモートデータセンター**間でも機能します。すべてのサイトが同一サブネットに属するため、複数サイトにまたがる<span class="notranslate farm-term" translate="no">Farm</span>クラスターに最も効率的な構成です。

{{%  insert-safekit-farm-video-ja  %}}

## 異なるサブネット間の仮想IP負荷分散（Farmクラスター） {#virtual-ip-load-balancing-different-subnets}

### クラウドサブネット間のトラフィック {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

<span class="notranslate farm-term" translate="no">Farm</span>クラスターは複数のアベイラビリティゾーンとサブネットにアプリケーション負荷を分散できます。

### サブネット間のFarmクラスター: 複数のWindowsまたはLinuxノード {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}

![2つの異なるサブネットにまたがるFarmクラスターの負荷分散図](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

<span class="notranslate farm-term" translate="no">Farm</span>ノードが**異なるサブネット**（例: 複数のクラウドアベイラビリティゾーン）にある場合、**仮想IP**は外部の**ロードバランサー（LB）**上にあります。ロードバランサーは各サブネットにあるサーバーの物理IPアドレスへトラフィックを送ります。

#### トラフィックルーティングと負荷分散のルール {#intelligent-traffic-routing--load-balancing-rules}

ロードバランサーは次の2つの基準でクライアントリクエストを分散します。

  * **負荷分散ルール:** **クライアントIPアドレス**や**クライアントTCPポート**など。
  * **ノードの可用性:** SafeKitのヘルスチェックに基づき、正常なノードにのみトラフィックを送信します。

> **⚠️ 注意:** SafeKitはヘルスチェックを提供します。ロードバランサーはネットワークまたはクラウドプロバイダーが提供します。

#### SafeKitヘルスチェック {#safekit-health-check-mechanism}

SafeKitは各<span class="notranslate farm-term" translate="no">Farm</span>サーバーに**ヘルスチェックURL**を提供します。ロードバランサーはURLを確認し、各サーバーの状態を判定します。

  * **ノードUP:** ヘルスチェックは`HTTP 200 OK`を返します。ロードバランサーはこのサーバーにトラフィックを送信します。
  * **ノードDOWN:** サーバーまたはアプリケーションが故障すると、SafeKitは`HTTP 404 NOT FOUND`を返すか、サーバーが応答しません。ロードバランサーはこのノードへのトラフィック送信を直ちに停止します。

#### クラウド展開: AWS、Azure、GCP {#cloud-deployment-standards-aws-azure-and-gcp}

これは**クラウド上の<span class="notranslate farm-term" translate="no">Farm</span>クラスター**の標準的な構成です。サブネットまたはゾーンが停止しても、他のノードはトラフィック処理を続けます。[**Amazon AWS**](</ja/solutions/aws-load-balancing-cluster-failover/>)（AWS Network Load Balancer）、[**Microsoft Azure**](</ja/solutions/azure-load-balancing-cluster-failover/>)（Azure Load Balancer）、[**Google Cloud (GCP)**](</ja/solutions/gcp-load-balancing-cluster-failover/>)（Google Cloud Load Balancing）でサポートされています。

## 仮想IPの実装、レイテンシー、アプリケーション透過性の比較 {#virtual-ip-methods-comparison}

**高可用性と災害復旧における仮想IPおよびDNSのリダイレクト方法の比較。**

環境とユースケース | 高可用性の種類 | リダイレクト方法 | 実装者 | ネットワークレイテンシー | アプリケーション透過性とローカルIP  
---|---|---|---|---|---  
プライマリ／セカンダリ（高可用性） | Mirrorクラスター | Gratuitous ARP / MAC引き継ぎ | ✅ SafeKit製品 | 非常に低い: 障害検出とGARP送信にかかる時間 | 完全な透過性: 仮想IPはアクティブノード上にローカル設定されます。クライアントIPは変わりません。  
負荷分散（アクティブ／アクティブ） | <span class="notranslate farm-term" translate="no">Farm</span>クラスター | カーネルネットワークフィルター / GARP | ✅ SafeKit製品 | 非常に低い: 障害検出とネットワークフィルター変更にかかる時間 | 完全な透過性: 仮想IPはすべてのノード上にローカル設定されます。クライアントIPは変わりません。  
同一サブネット／拡張LAN（拡張VLAN） | 災害復旧（リモートデータセンター） | IPエイリアス / GARP | ✅ SafeKit製品（拡張VLANはネットワークチームが提供） | 低い: 拡張VLANの往復時間（RTT）による | 完全な透過性: 仮想IPは各ノード上にローカル設定されます。クライアントIPは変わりません。  
異なるサブネット: ロードバランサーのみ | 災害復旧（リモートデータセンター／クラウド） | 外部ロードバランサー | 🛠️ インテグレーター: ロードバランサー設定（SafeKitはヘルスチェックを提供） | 中程度: ロードバランサーのヘルスチェック間隔による | ⚠️ SNAT/DNATを使用する場合、透過性は部分的です。仮想IPはノード上にローカル設定され**ません**。クライアントIPが保持され**ない**場合があります。アプリケーション側で対応が必要です。  
異なるサブネット: ロードバランサー + SafeKitローカル仮想IP | 災害復旧（リモートデータセンター／クラウド） | Floating IP / Direct Server Return対応の外部ロードバランサー | 🛠️ インテグレーター: ロードバランサー設定（SafeKitはヘルスチェックを提供） | 中程度: ロードバランサーのヘルスチェック間隔による | 高い透過性: 仮想IPはプライマリノード上にローカル設定され、宛先アドレスとして使用されます。  
異なるサブネット: クラウドCLI | 災害復旧（クラウド） | クラウドAPI: プライベートIPまたはクラウドルートを新しいプライマリへ移動 | 🛠️ インテグレーター: `start_prim`スクリプト内のクラウドCLIコマンド | 中～高: クラウドAPIの応答時間による | 完全な透過性: 仮想IPはプライマリノード上にローカル設定されます。クライアントIPは変わりません。  
異なるサブネット: BGP | 災害復旧（リモートデータセンター／クラウド） | BGPでアナウンスする/32ルート | 🛠️ インテグレーター: `start_prim`と`stop_prim`スクリプト内のBGPコマンド | 低～中: BGP収束時間による | 完全な透過性: 仮想IPはプライマリノード上にローカル設定されます。クライアントIPは変わりません。BGPルーターが必要です。  
DNSリダイレクト: 仮想IPなし | 災害復旧（リモートデータセンター） | DNSレコードの変更（名前／物理IP） | 🛠️ インテグレーター: `start_prim`スクリプト内のDNS更新コマンド | 高く予測困難: DNS TTLとクライアントDNSキャッシュによる | ⚠️ 信頼性がありません: クライアントがDNSを再検索する必要があります。多くの場合、クライアントは起動時に取得した古いIPを使い続け、フェイルオーバー後も切り替わりません。  

## 仮想IPに関するよくある質問 {#virtual-ip-faq}

### 仮想IPとネットワーク {#virtual-ip--networking}

仮想IPアドレスとは何ですか。物理IPアドレスとどう違いますか。

**物理IPアドレス**はネットワークカードに紐づいています。**仮想IPアドレス**はハードウェアに紐づいていません。SafeKitクラスターではクライアントは常に仮想IPを使用します。プライマリサーバーが故障すると、仮想IPは正常なノードへ自動的に移動します。クライアント設定の変更は不要です。

仮想IPを使うためにハードウェアロードバランサーは必要ですか。

いいえ。**SafeKit**はソフトウェアで仮想IPを管理します。同一サブネットでは**IPエイリアス**と**Gratuitous ARP（GARP）**を使ってトラフィックをリダイレクトします。外部ロードバランサーやプロキシサーバーは不要です。

Gratuitous ARP（GARP）とは何ですか。なぜ使用するのですか。

**Gratuitous ARP（GARP）**はすべてのデバイスに送信するネットワークメッセージです。スイッチやルーターのARPテーブルを更新します。フェイルオーバー時、新しいプライマリサーバーがGARPメッセージを送り、**仮想IP**が新しいプライマリのMACアドレスに紐づいたことを通知します。トラフィックは直ちに再ルーティングされます。

仮想IPにDNS名を関連付けることはできますか。

**はい。** 仮想IPに標準のAレコードを作成します。リダイレクトは**仮想IPレベル**（ARPまたはネットワークリダイレクト）で行われ、**DNSレベルでは行われません**。DNS遅延やTTLの問題はなく、フェイルオーバーは**アプリケーションに対して透過的**です。

### クラウドと高度なアーキテクチャ {#cloud--advanced-architectures}

クラウド（AWS、Azure、GCP）で仮想IPはどのように機能しますか。

クラウドでは、レイヤー2のGARPメッセージを使って仮想IPを再ルーティングできません。SafeKitは**クラウドロードバランサー**（AWS ELB、Azure LB、Google GCLB）と連携します。SafeKitは**ヘルスチェックURL**を提供し、ロードバランサーはURLを確認してアクティブノードへトラフィックを送ります。

災害復旧ではロードバランサーより拡張LANの方が適していますか。

**はい。** リモートデータセンター間では、フェイルオーバーが**アプリケーションに対して透過的**なため、**拡張LAN（拡張VLAN）**が適していることがよくあります。**仮想IPは変わらない**ため、データセンター間のフェイルオーバー後もアプリケーションとクライアントは同じアドレスを使用できます。

仮想IPと比べてDNSリダイレクトにはどのような制限がありますか。

**DNSリダイレクト**は**TTL（Time to Live）**とクライアントDNSキャッシュに依存します。復旧に数時間かかることがあります。また、DNSを再検索しない**クライアントは故障したサーバーに接続したまま**になります。**仮想IP**はレイヤー2のGARPメッセージで直ちに再ルーティングされるため、クライアントDNSキャッシュの影響を受けません。

### 透過性とセキュリティ {#transparency--security}

ローカル仮想IPがアプリケーション透過性に重要なのはなぜですか。

ローカルな**仮想IP**を使用すると、アプリケーションは変わらないアドレスを使用します。SafeKitは**カーネル**でリダイレクトするため、アプリケーションはフェイルオーバーを認識しません。DNATではアプリケーションが使用するアドレスが変わります。

仮想IPはクライアントの元のIPアドレスを維持しますか。

はい。SafeKitは送信元NAT（SNAT）を使用しません。仮想IPはアクティブサーバー上にローカル設定されているため、アプリケーションは**クライアントの元のIPアドレス**を受け取ります。これはセキュリティ監査、セッション維持、規制ログに重要です。

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}
