---
title: "高可用性クラスターにおいて、仮想 IP アドレスはどのように機能しますか？"
canonical: "https://safekit.eviden.com/ja/best-practises/how-a-virtual-ip-address-works/"
description: "SafeKit がフェイルオーバー時に仮想 IP を移動する方法：同じサブネット内の Gratuitous ARP、ロードバランサー、クラウド CLI、またはサブネットを跨いでの BGP。ローカル仮想 IP が重要である理由。"
category: "best-practises"
lang: "ja"
topics: "高可用性クラスターにおける仮想 IP アドレスとは？、SafeKit における仮想 IP の実装、同一サブネット内での仮想 IP の動作（mirror クラスター）、ロードバランサーを用いた異なるサブネット間での仮想 IP の動作（mirror クラスター）、クラウドプロバイダー CLI を用いた異なるサブネット間での仮想 IP の動作（mirror クラスター）、BGP を用いた異なるサブネット間での仮想 IP の動作（mirror クラスター）、異なるサブネット間での DNS リダイレクトの動作（mirror クラスター）、同一サブネット上の farm クラスターにおける仮想 IP ロードバランシングの動作、異なるサブネット間でのロードバランシングされた仮想 IP の動作（farm クラスター）、比較：仮想 IP の実装、レイテンシー、およびアプリケーションの透過性、仮想 IP に関するよくある質問、🔍 SafeKit を探索する"
translation: "translate_md 2026-11-05.13 | glossaire 2026-11-05.17 | Translation LLM | 23 expressions"
---

# 高可用性クラスターにおいて、仮想 IP アドレスはどのように機能しますか？ {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## 高可用性クラスターにおける仮想 IP アドレスとは何ですか？ {#virtual-ip-definition}

**仮想 IP アドレス**は、クライアントが[高可用性クラスター](</ja/>)内のアプリケーションに接続するために使用する単一のアドレスです。仮想 IP は 1 つのサーバーにリンクされていません。フェイルオーバー時には、アプリケーションを実行しているサーバーに移動します。クライアントは構成を変更する必要はありません。

**SafeKit の主要な原則：** 仮想 IP は、アプリケーションを実行する**サーバーにローカルに設定されます**。アプリケーションは仮想 IP で起動し、元のクライアント IP を受信します。これが、多くのアプリケーションが変更なしで SafeKit で正しく動作する理由です。SafeKit は 2 種類の仮想 IP を提供します。

  * **プライマリ/セカンダリ仮想 IP と mirror クラスター：** 仮想 IP はプライマリサーバでのみアクティブです。フェイルオーバー時にセカンダリサーバに移動します。
  * **<span class="notranslate farm-term" translate="no">Farm</span> クラスターを使用したネットワーク負荷分散仮想 IP：** 仮想 IP はすべてのサーバーで同時にアクティブになります。トラフィックはそれらの間で共有されます。

## SafeKit における仮想 IP の実装 {#safekit-virtual-ip-implementation}

この記事では、SafeKit が各ネットワークアーキテクチャで仮想 IP をどのように移動させるかを説明します。

  * **同じサブネットまたはストレッチ VLAN（[mirror](#virtual-ip-same-subnet-failover)および[<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-same-subnet)クラスター）：** SafeKit はサーバー上で仮想 IP を構成し、**Gratuitous ARP（GARP）** を送信します。外部ハードウェアは必要ありません。これは最も透過的なソリューションです（すべてが SafeKit 製品によって実装されます）。
  * **ロードバランサー（[mirror](#virtual-ip-different-subnets-failover)および[<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-different-subnets)クラスター）を使用する異なるサブネット：** ロードバランサーは SafeKit の**ヘルスチェック**を使用して、適切なサーバーにトラフィックを送信します（ロードバランサーはインテグレーターによって構成されます）。
  * **[クラウドプロバイダーの CLI](#virtual-ip-cloud-cli-failover)（mirror クラスター）を使用する異なるサブネット：** SafeKit の `start_prim` スクリプトは、クラウド CLI を呼び出して仮想 IP を移動します（インテグレーターが記述したスクリプト）。
  * **[BGP を使用する異なるサブネット](#virtual-ip-bgp-failover)（mirror クラスター）：** プライマリサーバーが仮想 IP をルーターにアドバタイズします（インテグレーターが作成したスクリプト）。
  * **[DNS リダイレクト](#virtual-ip-vs-dns-redirection-failover)（mirror クラスター）を使用する異なるサブネット：** SafeKit の `start_prim` スクリプトは、仮想名の DNS レコードを新しいプライマリサーバーの物理 IP に変更します（インテグレーターが作成したスクリプト）。単一の仮想 IP はなく、この方法はすべてのクライアントに対して信頼できるわけではありません。

この記事の他の項目：

  * [比較：仮想 IP の実装、レイテンシ、およびアプリケーションの透過性](#virtual-ip-methods-comparison)
  * [仮想 IP に関するよくある質問](#virtual-ip-faq)
  * [🔍 SafeKit を探索する](#hub)

![Eviden SafeKit における仮想 IP の動作比較図：アクティブノードにフローティング IP を表示する mirror クラスターと、すべてのノードにネットワークロードバランシングを表示する farm クラスター。](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**SafeKit における mirror クラスターと <span class="notranslate farm-term" translate="no">farm</span> クラスターの仮想 IP 実装。**

## 同一サブネット内で仮想 IP が動作する仕組み（mirror クラスター） {#virtual-ip-same-subnet-failover}

- [SafeKit mirror クラスターでプライマリ/セカンダリ仮想 IP をテストする](/ja/best-practises/test-primary-backup-vip-mirror/)

### ローカルサブネットでの自動フェイルオーバーとネットワークの再ルーティング {#automated-failover--network-rerouting-in-a-local-subnet}

ローカルネットワークでは、**SafeKit が**仮想 IP とアプリケーションのフェイルオーバーを自動的に管理します。

### ローカル mirror クラスター：Windows または Linux 上での 2 ノードフェイルオーバー {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![同一サブネット内の 2 台のサーバー間における SafeKit 仮想 IP フェイルオーバーメカニズム](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

**SafeKit mirror クラスター**では、2 つのノードは同じサブネットにあります **。高可用性には 仮想 IP** を使用します **。SafeKit は、オペレーティングシステムのネットワークスタックで仮想 IP を管理します。特別なハードウェアは必要ありません。仮想 IP は、 IP エイリアシング**を使用してサーバー 1 とサーバー 2 の物理 IP アドレスに追加されます。クライアントは常に仮想 IP に接続します。

#### SafeKit における IP エイリアスと複数の仮想 IP {#safekits-advanced-ip-aliasing--multiple-virtual-ip-support}

仮想 IP は、ノード間を移動する 3 番目の IP アドレスです。SafeKit は、1 つのクラスターで**複数の仮想 IP を**管理できます。これらを同じネットワークカードまたは異なるネットワークカードに配置できます。このようにして、各サービスは独自の仮想 IP を使用できます。

#### フェイルオーバーメカニズム：Gratuitous ARP（GARP） {#the-failover-mechanism-gratuitous-arp-garp}

フェイルオーバーには、手動操作は必要ありません。通常動作では、仮想 IP は**サーバ 1 の MAC アドレス（mac1）** にリンクされています。サーバ 1 に障害が発生した場合、SafeKit は次の 3 つの処理を実行します。

  * **仮想 IP エイリアシング：** SafeKit は、新しいプライマリサーバーであるサーバー 2 のネットワークカードに仮想 IP をエイリアスとして設定します。その後、オペレーティングシステムはネットワークにメッセージを送信して仮想 IP を通知します。
  * **GARP：** SafeKit は、**Gratuitous ARP（GARP）** メッセージも送信します **。ネットワークスイッチとクライアントは、ARP キャッシュを更新します。仮想 IP は、 サーバー 2 の MAC アドレス（mac2）** にリンクされます。
  * **アプリケーションのリカバリ：** SafeKit がサーバー 2 上でアプリケーションサービスを再起動します。


#### リモートデータセンターとストレッチ VLAN {#remote-data-centers--extended-vlans}

**上記で説明した同じサブネットのソリューションは**、リモートサイト間の**ディザスタリカバリ**にも有効です **。サイトが ストレッチ VLAN**（拡張 LAN）で接続されている場合、多くの場合、これが最適な選択肢となります。両方のサイトが 1 つのサブネットに属します。ネットワークはよりシンプルになり、複雑なルーティングプロトコルは必要ありません。

> **⚠️ 注：** Gratuitous ARP を使用したレイヤー 2 でのルーティング変更は、アプリケーションにとって**最も透過的なソリューション**です **。アプリケーションは元のクライアント IP を受信し、仮想 IP はローカルに設定されます。多くのアプリケーションは ローカル仮想 IP を必要とします**。それがなければ、これらのアプリケーションは**正しく動作しない可能性があります**。この同一サブネット設定では、SafeKit がメカニズム全体を実装するため、特別な統合作業は必要ありません。

## ロードバランサー（mirror クラスター）を使用した仮想 IP の異なるサブネット間での動作方法 {#virtual-ip-different-subnets-failover}

### SafeKit ヘルスチェック機能付きロードバランサー {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![2 つの異なるサブネットにまたがるロードバランサーを使用した仮想 IP フェイルオーバーの図](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

ノードが**異なるサブネット**にある場合、Gratuitous ARP 仮想 IP を移動できません **。この場合、仮想 IP は ロードバランサー**上にあります。ロードバランサーはトラフィックをプライマリサーバーに送信します。

SafeKit は各ノードに**ヘルスチェック URL** を提供します。

  * **プライマリ (PRIM) :**`HTTP 200 OK` を返します。ロードバランサーはこのノードにトラフィックを送信します。
  * **セカンダリ (SECOND) :**`HTTP 404 NOT FOUND` を返します。ロードバランサーはこのノードにトラフィックを送信しません。

フェイルオーバー時に、SafeKit は応答を変更し、ロードバランサーはトラフィックを新しいプライマリサーバーに送信します。これは、[**AWS**](</ja/solutions/aws-high-availability-cluster-synchronous-replication-failover/>)、[**Azure**](</ja/solutions/azure-high-availability-cluster-synchronous-replication-failover/>)、[**Google Cloud**](</ja/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>)の**アベイラビリティゾーン**間の標準的なソリューションです。

> **⚠️ 注：** ヘルスチェックは SafeKit が提供します。ロードバランサーは、お客様のネットワークまたはクラウドプロバイダーが提供します。

### 問題点：ロードバランサーが仮想 IP を所有している {#the-load-balancer-pitfall-virtual-ip-on-the-frontend-nat-to-the-physical-ip}

ロードバランサーのみの場合、クライアントは仮想 IP に接続します。ロードバランサーは、仮想 IP（NAT）をプライマリサーバーの**物理 IP** に変換します。クライアントは仮想 IP を使用しますが、サーバーは物理 IP を使用します。サーバーは仮想 IP を認識しません。

### 仮想 IP はプライマリサーバーにローカルで設定したままにしてください。 {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

一部のアプリケーションでは、仮想 IP をサーバーアドレスとして使用します。これらのアプリケーションは、仮想 IP が**プライマリサーバーにもローカルに設定されている**場合にのみ正しく動作します。その場合：

  * サービスは仮想 IP で開始できます。
  * サーバーは仮想 IP で自身のサービスにアクセスできます。
  * 認証は仮想 IP で機能します。

 SafeKit を使用すると、プライマリサーバー上で仮想 IP をローカルに設定できます。方法は仮想 IP のサブネットによって異なります。

  * **仮想 IP は、サーバーの物理 IP アドレスと同じサブネットにあります。**`<vip>` セクションを SafeKit モジュールに維持してください。SafeKit は、仮想 IP を物理 IP アドレスのネットワークカード上のエイリアスとして自動的に設定します。
  * **仮想 IP が異なるサブネットにある場合：**`<vip>` セクションを SafeKit モジュールに特定の構成で保持します。以下の例は、Azure でのこの構成を示しています。
  * **別のサブネットのオプション：**`start_prim` スクリプトを使用して、アプリケーションの起動前に、loopback インターフェースなどの専用インターフェースに仮想 IP を設定します。stop_prim スクリプト `stop_prim` 使用して、アプリケーションの停止後に仮想 IP を削除します。これらのコマンドはインテグレーターが記述します。SafeKit 製品では提供されません。

**注:** 一部のロードバランサーは、仮想 IP を宛先アドレスとして保持できます (例: Floating IP または Direct Server Return)。

### 例：ローカル仮想 IP アドレスを持つ Azure ロードバランサー（Milestone XProtect） {#azure-load-balancer-local-virtual-ip-example}

このアーキテクチャは、SafeKit `videoos` モジュールとともに、**Milestone XProtect 管理サーバー**向けに Azure 上で本番環境で使用されています。2 つのノードは 2 つの可用性ゾーンに配置されています。仮想 IP は、ロードバランサーのフロントエンド IP です。このフロントエンド IP は専用のサブネットにあります。

**Azure 側**（インフラストラクチャチームが設定）：

  1. 専用サブネット内にフロントエンド IP を持つ**レイヤー 4 ロード バランサー**を作成します。
  2. 2 つの SafeKit ノードをロードバランサーの**バックエンドプール**に追加します。
  3. モジュールの SafeKit ヘルスチェック URL に**ヘルスプローブを**追加します。パスは`/var/modules/videoos/ready.txt`、ポートは `9010`（HTTP）または `9453`（有効な証明書付き HTTPS）です。別のモジュールの場合は、`videoos` モジュール名に置き換えます。
  4. クライアントが仮想 IP で使用するすべてのポート（Milestone 管理サービスのポート、および必要に応じて他のサービスのポート）に**ロードバランシングルール**を追加します。

**SafeKit 側：** モジュールの `userconfig.xml` ファイル（`videoos/conf/userconfig.xml`）で、標準の `<vip>` セクションをこのセクションに置き換えます。

```xml
<vip>
  <interface_list>
    <interface check="on" arpreroute="on" name="VM_INTERFACE_NAME">
      <real_interface>
        <virtual_addr addr="LB_FRONTEND_IP" netmask="LB_FRONTEND_NETMASK" where="one_side_alias" />
      </real_interface>
    </interface>
  </interface_list>
</vip>
```

`VM_INTERFACE_NAME` VM のネットワークインターフェース名に、`LB_FRONTEND_IP` ロードバランサーのフロントエンド IP に、`LB_FRONTEND_NETMASK` フロントエンドサブネットのネットマスクに置き換えます。ネットワークインターフェースは、両方のノードで同じ名前である必要があります。詳細については、ユーザーガイドのセクション 13.6.4「[`<vip>` 構文](https://safekit.eviden.com/ja/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax)」を参照してください。

**アプリケーション側では、** すべての Milestone サービスがサーバーのプライベート IP アドレスではなく、仮想 IP アドレスを使用するように設定します。

> **⚠️ 注意:** VM のサブネットと**重複しない**フロントエンドサブネットを使用してください。たとえば、`10.0.1.0/24` の VM と `10.0.2.0/24` のロードバランサーフロントエンド IP などです。SafeKit は、ネットマスクとともにフロントエンド IP を VM のネットワークインターフェイスに追加します。2 つのサブネットが重複する場合、このエイリアスによって VM のルーティングが変更され、VM のネットワークトラフィックが失敗する可能性があります。


## クラウドプロバイダーの CLI で仮想 IP を異なるサブネット間で機能させる方法（mirror クラスター） {#virtual-ip-cloud-cli-failover}

### クラウドで Gratuitous ARP 機能しない理由 {#why-gratuitous-arp-does-not-work-in-public-clouds}

クラウドネットワーク（AWS、Azure、Google Cloud）は、**Gratuitous ARP 無視します**。トラフィックは、クラウドプラットフォームに割り当てられた IP アドレスにのみ送信されます。SafeKit はプライマリサーバーに仮想 IP を設定しますが、クラウドネットワークはこのサーバーに仮想 IP トラフィックを送信しません。

### Cloud CLI を使用して仮想 IP を移動する {#moving-the-virtual-ip-through-the-cloud-api-in-safekit-failover-scripts}

ロードバランサーがない場合、クラウドプロバイダーの CLI を SafeKit の **`start_prim` スクリプト**に統合して、アプリケーションの起動前にクラウドネットワーク構成を更新できます。CLI は、プライマリになるノードに仮想 IP を割り当てたり、仮想 IP トラフィックをそのノードに誘導するようにクラウドルートを更新したりできます。

**仮想 IP はプライマリサーバー上にローカルに維持されます**。NAT **は行われず**、元のクライアント IP は変更されません。

### 制約 {#constraints-of-the-cli-approach}

  * クラウド CLI は両方のノードにインストールする必要があります。各ノードには、ネットワーク権限を持つクラウド ID が必要です。
  * スクリプトはエラーと再試行を管理する必要があります。
  * フェイルオーバーは、ロードバランサーとヘルスプローブを使用する場合より**もはるかに遅くなります**。これは、各フェイルオーバーがクラウド API の応答を待機するためです。

> **⚠️ 注意:** **インテグレーター**、cloud CLI コマンドを `start_prim` スクリプトに追加する必要があります **。これらのコマンドは SafeKit 製品によって提供されるものではありません**。これらは、クラウドプロバイダー、ネットワーク設計、およびお客様のセキュリティルールによって異なります。本番環境に移行する前に、ネットワークチームとソリューションを検証してください。

## BGP（mirror クラスター）で仮想 IP が異なるサブネット間でどのように機能するか {#virtual-ip-bgp-failover}

### BGP による仮想 IP の再ルーティング {#layer-3-virtual-ip-rerouting-with-bgp-route-advertisement}

BGP（Border Gateway Protocol）を使用する場合、仮想 IP は通常、アプリケーションの起動前に `start_prim` スクリプトによってプライマリサーバーの loopback インターフェイスに設定されます。プライマリサーバーは、/32 ルートとして仮想 IP をルーターにアドバタイズします。

フェイルオーバー時に、古いプライマリサーバ上の `stop_prim` スクリプトがアプリケーションを停止し、loopback インターフェースから仮想 IP を削除し、ルータから /32 ルートを撤回します。古いプライマリサーバがクラッシュした場合、`stop_prim` 実行されませんが、ルータは BGP セッションを失い、ルートを自動的に削除します。

### メリットと前提条件 {#benefits-and-prerequisites}

  * **仮想 IP はローカルに留まり、NAT は行われず、クライアント IP は変更されません。**
  * サブネットやサイトをまたいで機能します。ストレッチ VLAN 必要ありません。
  * BGP ルーターとネットワークチームのサポートが必要です。クラウドでは、クラウドプロバイダーのルートサーバーサービスが必要です。

> **⚠️ 注意：** BGP 統合では、SafeKit スクリプトとルーティングインフラストラクチャを使用します **。 インテグレーター**、`start_prim` および `stop_prim` スクリプトにコマンドを記述する必要があります **。これらのスクリプトは SafeKit 製品では提供されません**。本番環境に導入する前に、ネットワークチームとソリューションを検証してください。

## 異なるサブネット間での DNS リダイレクトの仕組み（mirror クラスター） {#virtual-ip-vs-dns-redirection-failover}

### `start_prim` スクリプトを使用した DNS の再ルーティング {#dns-rerouting-with-the-start-prim-script}

DNS リダイレクトでは、**単一の仮想 IP はありません**。クライアントは**仮想名**（DNS 名）に接続します **。フェイルオーバー時に、新しいプライマリサーバー上の `start_prim` スクリプトがアプリケーションを起動し、仮想名の DNS レコードを新しいプライマリサーバーの 物理 IP** に変更します。

`stop_prim` スクリプトは何もする必要はありません。古いプライマリサーバーがクラッシュした場合、新しいプライマリサーバーが DNS レコードを上書きします。

### 例：DNS 名前解決と古い IP を保持するクライアント {#the-technical-scenario-dns-resolution-and-the-stuck-client}

![高可用性クラスターにおける DNS 名解決から物理 IP1 への図](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 DNS 名前解決：クライアントは引き続き高可用性クラスター内の物理 IP1 に接続されています

#### フェイルオーバー前：名前は物理 IP 1 を指します {#current-state-resolution-to-physical-ip-1}

**クライアント 1** と**クライアント 2 は**、DNS システムに仮想名の IP アドレスを要求します **。DNS システムは 物理 IP1** を返します。その後、クライアントはこのアドレスへのネットワーク接続を開きます。

#### フェイルオーバー後：名前は物理 IP2 を指します {#the-failover-challenge-rerouting-to-physical-ip-2}

サーバー 1 が障害を起こします。サーバー 2 の `start_prim` スクリプトは、DNS レコードを**物理 IP2** に変更します。クライアントは、次のすべての条件が真である場合にのみ、物理 IP2 に接続します。

  * クライアントと DNS レコードの間にあるすべての DNS サーバーで、**TTL（Time to Live）** が期限切れになります。
  * クライアント 1 とクライアント 2 のローカル DNS キャッシュは空です。
  * アプリケーションは接続を閉じ、*新しい*DNS 検索を実行します。

いずれかの条件が偽の場合、**クライアント 1 とクライアント 2 は**物理 IP1 を使い続けます。DNS レコードが正しくても、サービスはダウンします。

### 制限事項と前提条件 {#the-two-black-boxes-of-dns-redirection}

  * **DNS キャッシュ：** 多くのインターネットサービスプロバイダーや企業の DNS サーバーは、短い TTL 値を無視します。古い物理 IP 1 を数分または数時間保持することがあります。
  * **アプリケーションの動作：** 多くのアプリケーション（Java サービスやウェブブラウザなど）は、起動時に DNS ルックアップを 1 回だけ行います。そして、最初の IP アドレスを使い続けます。
  * **フェイルオーバーのたびに IP アドレスが変更されます。** アプリケーションには、同じままであるローカル仮想 IP がありません。独自の IP アドレスを登録するアプリケーションは動作しない可能性があります。
  * **前提条件:** DNS レコードの TTL が短いこと (30～60 秒など)、および両方のサーバーから DNS ゾーンを更新する権限があること。

> **⚠️ 注：** **インテグレーター**、`start_prim` スクリプトに DNS 更新コマンドを記述する必要があります **。これらのコマンドは SafeKit 製品によって提供されるものではありません**。DNS サーバー（Windows DNS、BIND、またはクラウド DNS）に依存します。

### 結論 {#conclusion}

DNS リダイレクトは、信頼性の高い高可用性ソリューションではありません。すべてのクライアントが再接続時に新しい DNS ルックアップを行う場合にのみ使用してください。即時かつ透過的なフェイルオーバーには、**仮想 IP**、ストレッチ VLAN、ロードバランサー、クラウドプロバイダーの CLI、または BGP を使用してください。

## 同じサブネット上の <span class="notranslate farm-term" translate="no">farm</span> クラスターで仮想 IP ロードバランシングがどのように機能するか {#virtual-ip-load-balancing-same-subnet}

- [SafeKit farm クラスターにおけるロードバランシング仮想 IP のテスト](/ja/best-practises/test-load-balancing-vip-farm/)

### カーネルレベルの負荷分散と冗長性 {#scalable-performance-kernel-level-load-balancing--redundancy}

トラフィックが多い場合、SafeKit は複数のアクティブサーバー間で作業を共有できます。1 つのサーバーに障害が発生しても、他のサーバーは動作を続けます。

### <span class="notranslate farm-term" translate="no">Farm</span> クラスターアーキテクチャ：Windows または Linux ノード間の負荷分散 {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


![同一サブネット内のロードバランシングされた仮想 IP の図](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

**ロードバランシング <span class="notranslate farm-term" translate="no">farm</span> クラスター**では、クライアントは仮想 IP に接続し、リクエストは同時に複数のサーバー間で共有されます **。この例では 2 つのノードを示しています。クラスターにノードを追加することもできます。同じサブネット内で、仮想 IP はクラスター内の すべてのサーバー**のネットワークカードで IP エイリアシングを使用して設定されます。

#### トラフィック共有：カーネルフィルター {#traffic-distribution-the-kernel-level-filter}

<span class="notranslate farm-term" translate="no">Farm</span> クラスターでは、**カーネル内の SafeKit フィルターが**トラフィックを共有します。動作は以下のとおりです。

  * **ARP マッピング：** クライアントの ARP キャッシュでは、仮想 IP は 1 つの MAC アドレス（例えば、サーバー 1 の `mac1`）にリンクされます。
  * **パケット解析：** サーバー 1 がパケットを受信します **。SafeKit カーネルフィルターは、各パケットの クライアント IP** または **TCP ポート**を読み取ります。
  * **負荷分散：** フィルタは、どのパケットをサーバー 1 が処理し、どのパケットを他のノード（例：サーバー 2）に送信するかを決定します **。パケットを別のノードに送信するために、フィルタはパケットの 宛先 MAC アドレスを**このノードの MAC アドレスに書き換えます。宛先 IP アドレスは仮想 IP のままです。作業はサーバー間で共有されます。


#### Gratuitous ARP を使用したフェイルオーバーとルーティングの再設定 {#failover-and-rerouting-with-gratuitous-arp}

サーバー 1 に障害が発生した場合、SafeKit は **Gratuitous ARP（GARP）** メッセージを送信します。クライアントは、サーバー 2 の `mac2` で ARP キャッシュを更新します。その後、クライアントはすぐに farm の他のノードに送信されます。

#### リモートサイトへの導入 {#deployment-in-remote-sites}

このロードバランシングソリューションは、サイトが**ストレッチ VLAN** で接続されている場合、**リモートデータセンター**間でも機能します。その場合、すべてのサイトは同じサブネットに属します。これは、複数のサイトにまたがる <span class="notranslate farm-term" translate="no">farm</span> クラスターにとって最も効率的な構成です。

{{%  insert-safekit-farm-video-ja  %}}

## ロードバランシングされた仮想 IP が異なるサブネット（<span class="notranslate farm-term" translate="no">farm</span> クラスター）間でどのように機能するか {#virtual-ip-load-balancing-different-subnets}

### クラウドサブネット間のトラフィック {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

<span class="notranslate farm-term" translate="no">Farm</span> クラスター、複数のアベイラビリティーゾーンとサブネット間でアプリケーションの作業を共有できます。

### クロスサブネット <span class="notranslate farm-term" translate="no">farm</span> クラスター：複数の Windows または Linux ノード {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


![2 つの異なるサブネットにまたがって動作する、負荷分散された farm クラスターの図](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

<span class="notranslate farm-term" translate="no">farm</span> ノードが**異なるサブネット**（たとえば、複数のクラウド可用性ゾーン）にある場合、**仮想 IP** は外部**ロードバランサー**上にあります。ロードバランサーは、トラフィックを各サブネット内のサーバーの物理 IP アドレスに送信します。

#### トラフィックルーティングと負荷分散のルール {#intelligent-traffic-routing--load-balancing-rules}

ロードバランサーは、2 つの基準でクライアントのリクエストを共有します。

  * **ロードバランシングルール：** **クライアントの IP アドレス**や**クライアントの TCP ポートなど**。
  * **ノードの可用性：** ロードバランサーは、SafeKit のヘルスチェックに基づいて、正常なノードにのみトラフィックを送信します。


> **⚠️ 注：** ヘルスチェックは SafeKit が提供します。ロードバランサーは、お客様のネットワークまたはクラウドプロバイダーが提供します。

#### SafeKit のヘルスチェック {#safekit-health-check-mechanism}

SafeKit は、<span class="notranslate farm-term" translate="no">farm</span> の各サーバーに**ヘルスチェック URL を**提供します。ロードバランサーはこれを読み取り、各サーバーのステータスを把握します。

  * **ノードが UP :** ヘルスチェックが `HTTP 200 OK` を返します。ロードバランサーはこのサーバーにトラフィックを送信します。
  * **ノード DOWN：** サーバーまたはアプリケーションに障害が発生した場合、SafeKit は `HTTP 404 NOT FOUND` を返します（またはサーバーが応答しません）。ロードバランサーは、このノードへのトラフィックの送信を直ちに停止します。


#### クラウド展開：AWS、Azure、GCP {#cloud-deployment-standards-aws-azure-and-gcp}

これは、**クラウド内の <span class="notranslate farm-term" translate="no">farm</span> クラスター**の標準アーキテクチャです **。サブネットまたはゾーンが停止しても、他のノードはトラフィックの処理を継続します。Amazon [AWS**](</ja/solutions/aws-load-balancing-cluster-failover/>)（AWS Network Load Balancer）、[**Microsoft Azure**](</ja/solutions/azure-load-balancing-cluster-failover/>)（Azure Load Balancer）、[**Google Cloud（GCP）**](</ja/solutions/gcp-load-balancing-cluster-failover/>)（Google Cloud Load Balancing）でサポートされています。


## 比較：仮想 IP の実装、レイテンシ、およびアプリケーションの透過性 {#virtual-ip-methods-comparison}

**高可用性とディザスタリカバリのための仮想 IP リダイレクション方式と DNS リダイレクション方式の比較。**

環境とユースケース | 高可用性タイプ | リダイレクト方式 | 実施者 | ネットワークの遅延 | アプリケーションの透過性とローカル IP  
---|---|---|---|---|---  
プライマリ/セカンダリ（高可用性） | Mirror クラスター | Gratuitous ARP (MAC アドレスの引き継ぎ) | ✅ SafeKit 製品 | 非常に低い：障害を検出し、GARP を送信するまでの時間 | 完全な透過性: 仮想 IP はアクティブノード上のローカル IP です。クライアント IP は変更されません。  
ロードバランシング（アクティブ/アクティブ） | <span class="notranslate farm-term" translate="no">Farm</span> クラスター | カーネルネットワークフィルター / GARP | ✅ SafeKit 製品 | 非常に低い：障害を検出し、ネットワークフィルターを変更するまでの時間 | 完全な透過性：仮想 IP はすべてのノードでローカルです。クライアント IP は変更されません。  
同一サブネット / ストレッチ VLAN | 災害復旧（リモートデータセンター） | IP エイリアシング / GARP | ✅ SafeKit 製品（ストレッチ VLAN はネットワークチームが提供） | 低： ストレッチ VLAN のラウンドトリップタイム（RTT）に依存します。 | 完全な透過性：仮想 IP はノード上でローカルに動作します。クライアント IP は変更されません。  
異なるサブネット: ロードバランサーのみ | 災害復旧（リモートデータセンター／クラウド） | 外部ロードバランサー | 🛠️ インテグレーター：ロードバランサーの設定（ヘルスチェックは SafeKit が提供） | 中: ロードバランサーのヘルスチェック間隔によって異なります。 | ⚠️ SNAT/DNAT を使用する場合、部分的な透過性しかありません。仮想 IP はノード上でローカル**ではありません**。クライアント IP は保持さ**れない**場合があります。アプリケーションはこれをサポートする必要があります。  
異なるサブネット：ロードバランサー + ローカルの SafeKit 仮想 IP | 災害復旧（リモートデータセンター／クラウド） | Floating IP / Direct Server Return、またはローカルの SafeKit エイリアスとしてのフロントエンド IP を備えた外部ロードバランサー | 🛠️ インテグレーター：ロードバランサーの設定（ヘルスチェックは SafeKit が提供） | 中: ロードバランサーのヘルスチェック間隔によって異なります。 | 優れた透過性：仮想 IP はプライマリノード上のローカル IP であり、宛先アドレスです。
異なるサブネット：クラウド CLI | 災害復旧（クラウド） | Cloud API: プライベート IP またはクラウドルートが新しいプライマリノードに移動します。 | 🛠️ インテグレーター : `start_prim` スクリプト内のクラウド CLI コマンド | 中～高：クラウド API の応答時間によって異なります。 | 完全な透過性: 仮想 IP はプライマリノード上でローカルに動作します。クライアント IP は変更されません。
異なるサブネット：BGP | 災害復旧（リモートデータセンター／クラウド） | BGP で/32 ルートをアドバタイズ | 🛠️ インテグレーター : `start_prim` および `stop_prim` スクリプト内の BGP コマンド | 低～中：BGP のコンバージェンス時間による | 完全な透過性：仮想 IP はプライマリノード上にローカルに存在します。クライアント IP は変更されません。BGP ルーターが必要です。  
DNS リダイレクト：仮想 IP なし | 災害復旧（リモートデータセンター） | DNS レコードの変更（名前/物理 IP） | 🛠️ インテグレーター : `start_prim` スクリプト内の DNS 更新コマンド | 高い、かつ予測不可能：DNS の TTL（有効期間）とクライアントの DNS キャッシュに依存する | ⚠️ 信頼性なし: クライアントは新しい DNS ルックアップを実行する必要があります。多くの場合、クライアントは起動時に受信した古い IP を保持し、フェイルオーバー後にリダイレクトされません。  
  
## 仮想 IP に関するよくある質問 {#virtual-ip-faq}

### 仮想 IP とネットワーク {#virtual-ip--networking}

仮想 IP とは何ですか？また、物理 IP とどう違うのですか？

**物理 IP アドレス**は 1 つのネットワークカードにリンクされています **。 仮想 IP** はハードウェアにリンクされていません。SafeKit クラスターでは、クライアントは常に仮想 IP を使用します。プライマリサーバーに障害が発生した場合、仮想 IP は自動的に正常なノードに移動します。クライアントの構成を変更する必要はありません。

仮想 IP を使用するには、ハードウェアロードバランサーが必要ですか？

いいえ。SafeKit **は**ソフトウェアで仮想 IP を管理します **。同じサブネット内で、 IP エイリアシング**と **Gratuitous ARP（GARP）** を使用してトラフィックをリダイレクトします。外部ロードバランサーやプロキシサーバーは必要ありません。

Gratuitous ARP（GARP）とは何か、またその使用目的は何か？

**Gratuitous ARP (GARP)** は、すべてのデバイスに送信されるネットワークメッセージです **。スイッチとルーターの ARP テーブルを更新します。フェイルオーバー時に、新しいプライマリサーバーが GARP メッセージを送信します。このメッセージは、 仮想 IP が**新しいプライマリサーバーの MAC アドレスにリンクされていることを示します。その後、トラフィックはすぐに再ルーティングされます。

仮想 IP に DNS 名を関連付けることはできますか？

**はい。** 仮想 IP に標準の A レコードを作成します **。リダイレクトは DNS レベルではなく**、**仮想 IP レベル**（ARP またはネットワークリダイレクトを使用）で行われます **。DNS の遅延や TTL の問題はなく、フェイルオーバーは アプリケーションにとって透過的**です。

### クラウドと高度なアーキテクチャ {#cloud--advanced-architectures}

クラウド（AWS、Azure、GCP）における仮想 IP の仕組みは？

クラウドでは、レイヤー 2 の GARP メッセージは仮想 IP の再ルーティングには使用できません。SafeKit は、**クラウドロードバランサー**（AWS Elastic Load Balancing、Azure Load Balancer、Google Cloud Load Balancing）と連携します **。SafeKit は ヘルスチェック URL** を提供します。ロードバランサーはこれを読み取り、トラフィックをアクティブノードに送信します。

ディザスタリカバリには、ストレッチ VLAN とロードバランサーのどちらが良いですか？

**はい**。リモートデータセンター間では、フェイルオーバーが**アプリケーションにとって透過的で**あるため、**ストレッチ VLAN** 方が適していることがよくあります **。 仮想 IP は変更されない**ため、データセンター間のフェイルオーバー後もアプリケーションとそのクライアントは同じアドレスを使い続けます。

仮想 IP と比較した場合、DNS リダイレクトの限界は何ですか？

**DNS リダイレクトは、** **TTL（Time to Live）** とクライアントの DNS キャッシュに依存します **。復旧には数時間かかる場合があります。また、 新しい DNS 検索を行わないクライアントは**、引き続き障害が発生したサーバーを使用します **。 仮想 IP** は、レイヤー 2 の GARP メッセージで即座に再ルーティングされます。クライアントの DNS キャッシュは影響を受けません。

### 透過性と安全性 {#transparency--security}

アプリケーションの透過性にとって、ローカル仮想 IP が重要である理由は何ですか？

ローカル**仮想 IP** を使用すると、アプリケーションは変更されないアドレスを使用します **。SafeKit は カーネル**内でリダイレクトを実行します。アプリケーションはフェイルオーバーを認識しません。DNAT を使用すると、アプリケーションが使用するアドレスが変更されます。

仮想 IP は元のクライアント IP アドレスを保持しますか？

はい。SafeKit はソース NAT（SNAT）を使用しません。仮想 IP はアクティブサーバー上のローカル IP であるため、アプリケーションは**元のクライアント IP** を受信します。これは、セキュリティ監査、セッションの永続性、および規制ログにとって重要です。


{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}
