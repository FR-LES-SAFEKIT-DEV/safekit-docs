---
title: "高可用性クラスタリングにおける仮想IPアドレス（VIP）の仕組みとは？"
canonical: "https://safekit.eviden.com/ja/best-practises/how-a-virtual-ip-address-works/"
description: "SafeKitソフトウェア定義の仮想 IP (VIP) アドレスを使用して 24 時間 365 日の稼働時間をどのように確保しているかをご覧ください。Gratuitous ARP による自動フェイルオーバーについて、またWindowsおよびLinuxにおける業務継続性において、Gratuitous ARP が DNS リダイレクトよりも優れている理由について学びましょう。"
category: "best-practises"
lang: "ja"
topics: "高可用性クラスタにおける仮想IPアドレスとは？、 SafeKitにおける仮想IPの実装、目次、同一サブネットフェイルオーバーにおける仮想IPアドレス（VIP）の動作（ Mirrorクラスタ）、異なるサブネット間における仮想IP（VIP）の動作（ Mirrorクラスタ）、同一サブネット<span class="notranslate farm-term" translate="no">Farm</span>における負荷分散型仮想IPの動作（ <span class="notranslate farm-term" translate="no">Farm</span>クラスタ）、異なるサブネット間における負荷分散型仮想IPの動作（ <span class="notranslate farm-term" translate="no">Farm</span>クラスタ）、仮想IPとDNSリダイレクト：DNSフェイルオーバーが失敗する理由、比較：仮想IPの実装、レイテンシ、およびアプリケーションの透過性、ネットワーク負荷分散と高可用性のための仮想IPアドレスの構成、仮想IP（VIP）に関するよくある質問、🔍 SafeKit高可用性ナビゲーションハブ"
---

# 高可用性クラスタリングにおける仮想IPアドレス（VIP）の仕組みとは？ {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## 高可用性クラスタにおける仮想IPアドレスとは何ですか？ {#virtual-ip-definition}

  * **定義:**仮想 IP (VIP) アドレス**は、高可用性[**で使用されるフローティング ネットワーク アドレスで](</>)アプリケーションへの継続的なアクセスを保証します。標準 IP とは異なり、VIP は特定の物理ハードウェア インターフェイスにバインドされず、クラスタ ノード間を移動して、クライアントに対して単一の永続的なエントリ ポイントを維持します。
  * **ハードウェア不要：** SafeKit **Gratuitous ARP（GARP）**を使用してソフトウェアレベルでVIPを管理するため、同一サブネット環境では外部ロードバランサーは不要です。
  * **アプリケーションの透過性:**ローカル VIP にバインドすることで、アプリケーションはフェイルオーバー イベントを認識せず、クライアントの送信元 IP アドレスと既存のセキュリティ構成を維持します。
  * **ディザスターリカバリー:**拡張 LAN **を使用すると**リモートデータセンター間で同じ VIP を使用できるため、複雑な DNS 再ルーティングや TTL キャッシュの遅延と比較して、サイト間のフェイルオーバーが簡素化されます。


## SafeKitにおける仮想IPの実装 {#safekit-vip-implementation}

  * **Mirrorクラスター:** 、リアルタイムのレプリケーションとフェイルオーバーを容易にするために、プライマリ サーバーでのみアクティブなフローティング IP を備えています。
  * **<span class="notranslate farm-term" translate="no">Farm</span>クラスター:**すべてのノード間で VIP を同時に維持することにより、ネットワーク負荷分散を有効にします。


**主な利点：** VIPは、 **Gratuitous ARP（アドレス解決プロトコル）**または**MACアドレステイクオーバーを**利用することで、クライアントの手動再構成なしにシームレスなアプリケーションのフェイルオーバーを可能にし、24時間365日のビジネス継続性を保証します。

  * **クラウドおよびマルチサブネット:** 、外部ロードバランサーのヘルスチェック ( AWS 、 Azure 、 GCP ) を介して管理され、異なるサブネット間でトラフィックをリダイレクトします。


![ Evidianにおける仮想IP（VIP）動作の比較図SafeKit : MirrorアクティブノードにフローティングIPを表示するクラスタと、 Farm全ノード間でネットワーク負荷分散を表示するクラスタ。 ](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

SafeKit内のMirrorおよび<span class="notranslate farm-term" translate="no">Farm</span>クラスタに対する**仮想 IP 実装戦略**


{{%  insert-safekit-4-buttons-ja  %}}
 

## 目次 {#table-of-contents}

  * [同一サブネットフェイルオーバー（ Mirrorクラスタ）における仮想IPアドレス（VIP）の仕組み](#virtual-ip-same-subnet-failover)
  * [仮想IP (VIP) が異なるサブネット間でどのように機能するか ( Mirrorクラスタ) ](#virtual-ip-different-subnets-failover)
  * [同一サブネット内の負荷分散型仮想IPの動作原理<span class="notranslate farm-term" translate="no">Farm</span> ( <span class="notranslate farm-term" translate="no">Farm</span>クラスタ) ](#vip-load-balancing-same-subnet)
  * [異なるサブネット間でのロードバランスされた仮想IPの動作方法（ <span class="notranslate farm-term" translate="no">Farm</span>クラスタ） ](#vip-load-balancing-different-subnets)
  * [仮想IPとDNSリダイレクト：DNSフェイルオーバーが失敗する理由](#virtual-ip-vs-dns-redirection-failover)
  * [比較: 仮想IPの実装、レイテンシ、およびアプリケーションの透過性](#vip-vs-dns-comparison)
  * [ネットワーク負荷分散と高可用性のための仮想IPアドレスの設定](#virtual-ip-configuration-load-balancing-ha)
  * [仮想IP（VIP）に関するよくある質問](#virtual-ip-faq)
  * [ 🔍 SafeKit高可用性ナビゲーションハブ](#hub)


## 同一サブネットフェイルオーバーにおける仮想IPアドレス（VIP）の仕組み（ Mirrorクラスタ） {#virtual-ip-same-subnet-failover}

### ローカルサブネットにおける自動フェイルオーバーとネットワーク再ルーティング {#automated-failover--network-rerouting-in-a-local-subnet}

ローカルインフラストラクチャ内でシームレスなビジネス継続性を必要とする組織向けに、 **SafeKitローカルネットワーククラスタ向けソフトウェア定義型高可用性、** 、仮想IPアドレスの管理とリアルタイムのアプリケーションフェイルオーバーのための堅牢で自動化されたソリューションを提供します。 

### ローカルMirrorクラスター: シームレスな 2 ノードWindowsまたはLinuxフェイルオーバー {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![ SafeKit同一サブネット内の2台のサーバー間の仮想IP（VIP）フェイルオーバーメカニズム](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

 SafeKit VIP エイリアシングと MAC アドレス マッピング 標準的な**SafeKit mirrorクラスタ**では、両方のノードが同じローカル サブネットに存在するため、高可用性は**ソフトウェア定義の仮想 IP (VIP)**によって実現されます。ハードウェア ベースのソリューションとは異なり、 SafeKitこの VIP は OS ネットワーク スタック内で直接管理されます。この VIP は、クライアントの永続的な論理エントリ ポイントとして機能し、 **IP エイリアシング**を介してサーバー 1 とサーバー 2 の固有の物理 IP アドレスの上にレイヤー化されます。 

#### SafeKitの高度な IP エイリアシングと複数の VIP のサポート {#safekits-advanced-ip-aliasing--multiple-vip-support}

**SafeKitソリューション**の重要な利点は、ネットワークIDの管理における柔軟性です。VIPは、ノード間を「移動する」3番目のIPアドレスです。特に、 SafeKit 、単一のクラスタ内で**複数の仮想IPアドレスを**管理できます。これらは、同じプライマリイーサネットカードに割り当てることも、異なる物理カードに分散させることも可能で、異なるサービスを特定の仮想IDに紐付ける複雑な構成にも対応できます。 

#### フェイルオーバーメカニズム：Gratuitous ARP (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

SafeKit ハードウェア障害発生時に手動介入が一切ないことを保証します。通常動作時、VIPは以下のようにマッピングされます。 **サーバー1のMACアドレス（mac1）**。 もし SafeKit サーバー1でハートビート障害を検出すると、2段階の復旧手順を実行します。 

  * **アプリケーション復旧:** SafeKitは、サーバー 2 上の重要なアプリケーション サービスを自動的に再起動します。
  * **ネットワーク再ルーティング:** SafeKitは、 **Gratuitous ARP (GARP)**メッセージを即座にブロードキャストします。これにより、すべてのネットワークスイッチと接続されているクライアントの ARP キャッシュが強制的に更新され、VIP が**サーバー 2 の MAC アドレス (mac2)**に再マッピングされます。


#### リモートデータセンターと拡張VLAN {#remote-data-centers--extended-vlans}

**SafeKitの同一サブネットアルゴリズムは**、通常はローカルクラスタで使用されますが、**拡張LANまたはストレッチVLAN**を介して接続されたリモートサイト全体での**災害復旧（DR）**には最適な選択肢です。この「ストレッチ」アーキテクチャにより、地理的な距離を超えて単一のサブネットを維持できるため、ネットワークトポロジが大幅に簡素化され、複雑なルーティングプロトコルのオーバーヘッドを回避できます。 

> **⚠️ 注意:** Gratuitous ARP によるレイヤ 2 ルーティングは、 **最も透明性の高いソリューション** アプリケーション向け。ロードバランサーを使用したレイヤー 3 ルーティングとは異なり、 **送信元/宛先 IP 変換 (SNAT/DNAT)**アプリケーションは元のクライアントIPアドレスで直接トラフィックを受信し、仮想IPアドレスはローカルで設定されます。 **多くのアプリケーションは** ローカルで仮想 IP を確認し、元のクライアント IP を直接受信します。この透明性がなければ、 **期待どおりに動作しない可能性があります** 複雑なネットワーク翻訳のため。

## 仮想IP（VIP）が異なるサブネット間でどのように機能するか（ Mirrorクラスタ） {#virtual-ip-different-subnets-failover}

### ロードバランサー統合によるクラウド対応トラフィックオーケストレーション {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

外部ネットワークインフラストラクチャを活用することで、マルチAZおよびクラウドクラスタ向けのソフトウェア定義型高可用性**SafeKitは、ネットワークロードバランサー** **とシームレスに統合され**別々のサブネットと可用性ゾーン間でトラフィックのフェイルオーバーをオーケストレーションします。 

### クロスサブネットMirrorクラスタ: WindowsおよびLinuxの実装 {#cross-subnet-mirror-clusters-windows--linux-implementation}


![ 2つの異なるサブネット間でロードバランサーを使用した仮想IPフェイルオーバーの図](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

 ロードバランサーのヘルスチェックによるマルチサブネットトラフィックルーティング クラスタノード**異なる**に存在する場合、標準のARPベースのフェイルオーバーは不可能です。このシナリオでは、 **IP (VIP) はサーバーのイーサネットカードではなく** **(LB) 上でホストされます。ロードバランサー**ゲートウェイとして機能し、リアルタイムの可用性に基づいてプライマリノードとセカンダリノードの物理IPアドレスにトラフィックをルーティングします。 

#### SafeKitヘルスチェックによる動的ルーティング {#dynamic-routing-via-safekit-health-checks}

SafeKit 、各ノードに専用の**ヘルスチェックURLを**提供することでトラフィックのルーティングを管理します。ロードバランサーはこれらのURLに問い合わせてクラスタの状態を判断します。 

  * **プライマリノード (PRIM):**ヘルスチェックの結果、 `HTTP 200 OK`が返されました。ロードバランサーはすべてのトラフィックをここにルーティングします。
  * **セカンダリノード（セカンド）：**ヘルスチェックの結果、 `HTTP 404 NOT FOUND`が返されました。ロードバランサーはこのノードにトラフィックを送信しません。

**フェイルオーバーイベント**が発生すると、 SafeKitヘルスチェック応答を即座に切り替え、ロードバランサーがクライアントトラフィックを新しいプライマリサーバーに再ルーティングするようにトリガーします。 

> **⚠️ 注:** SafeKitはヘルスチェックロジックを提供します。物理または仮想ロードバランサーは、ネットワークインフラストラクチャによって提供される必要があります。

#### クラウド統合: AWS 、 Azure 、 GCP 、 {#cloud-integration-aws-azure-and-gcp}

この「ロードバランサー＋ヘルスチェック」モデルは、 **クラウド高可用性**の業界標準です。これは、次のような環境でSafeKit実装するために不可欠です。 

  * 💡 [ **Amazon AWS** ](</ja/solutions/aws-high-availability-cluster-synchronous-replication-failover/>) ( AWSネットワークロードバランサー)
  * 💡 [ **Microsoft Azure** ](</ja/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) ( Azureロードバランサー )
  * 💡 [ **Google Cloud ( GCP )** ](</ja/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>) (Google Cloud Load Balancing)


#### ネットワークに関する考慮事項：ロードバランサーと拡張LANの {#network-considerations-load-balancer-vs-extended-lan}

ロードバランサーが不要な場合は、サブネット間で**LAN（VLAN** ）を実装することについてネットワークチームにご相談ください。これにより、よりシンプルな「同一サブネット」VIPモデルに戻すことができます。 

> **⚠️ 注意:**ロードバランサーを選択する場合は、アプリケーションが**ソース/宛先 IP 変換 (SNAT/DNAT)**と互換性があることを確認してください。ロードバランサーを使用すると、アプリケーションは元のユーザーの ID を追跡できなくなったり、自身のネットワーク インターフェイスに直接構成された仮想 IP を認識できなくなったために起動に失敗したりする可能性があります。

## 同一サブネット<span class="notranslate farm-term" translate="no">Farm</span> （ <span class="notranslate farm-term" translate="no">Farm</span>クラスタ）におけるロードバランスされた仮想IPの動作 {#vip-load-balancing-same-subnet}

### スケーラブルなパフォーマンス：カーネルレベルの負荷分散と冗長性 {#scalable-performance-kernel-level-load-balancing--redundancy}

トラフィック量の多い環境向けには、 **アーキテクチャガイド：マルチノード<span class="notranslate farm-term" translate="no">Farm</span>クラスタによるスケーラブルな高可用性**で、 SafeKit完全な冗長性を維持しながら、ワークロードを複数のアクティブサーバーに分散する方法を説明しています。 

### <span class="notranslate farm-term" translate="no">Farm</span>クラスタアーキテクチャ: WindowsまたはLinuxノード間での負荷分散 {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


![同一サブネット内の負荷分散型仮想IP（VIP）クラスタの図farm ](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

 カーネルフィルタリングによる分散トラフィック処理 負荷**クラスタでは、 <span class="notranslate farm-term" translate="no">farm</span> IP（VIP）アドレス**使用して、クライアント要求を複数のサーバーに同時に分散します。この例では2つのノードを使用していますが、このアーキテクチャはより大規模なサーバーファームをサポートするように拡張できます。同一サブネット構成では、IPエイリアシングを使用して**クラスタ内のすべてのサーバーの**カードにVIPが構成されます。 

#### トラフィック分散：カーネルレベルフィルタ {#traffic-distribution-the-kernel-level-filter}

単純なフェイルオーバークラスタとは異なり、 <span class="notranslate farm-term" translate="no">farm</span>クラスタは、特殊な**カーネルレベルフィルタ**を介してトラフィックを管理します。そのプロセスは次のとおりです。 

  * **ARP マッピング:**クライアントの ARP キャッシュでは、VIP は最初に単一のハードウェア アドレス (サーバー 1 の`mac1`など) に関連付けられます。
  * **パケット分割:**サーバー 1 がトラフィックを受信すると、 SafeKitカーネルフィルタは、受信パケットの識別情報 ( **クライアント IP**または**TCP ポート**に基づく) を分析します。
  * **負荷分散:**フィルタは、どのパケットをローカルで処理し、どのパケットを他のノード (サーバー 2 など) にリダイレクトして処理するかを決定し、ワークロードのバランスを確保します。


#### 無償ARPによるフェイルオーバーと再ルーティング {#failover-and-rerouting-with-gratuitous-arp}

プライマリノード（サーバー1）が故障した場合、クラスターは可用性を維持します。 **無償ARP（GARP）**. SafeKit クライアントのARPキャッシュを更新するためにGARPメッセージをブロードキャストします。 `mac2` サーバー 2 の。これにより、プライマリ「エントリ ポイント」が失敗した場合でも、クライアントはすぐにサーバー 2 の残りのノードに再ルーティングされます。 farm. 

#### 遠隔地への展開 {#deployment-in-remote-sites}

**リモートデータセンター**にまたがって運用している組織の場合、サイトが**拡張 LAN または VLAN**を介してリンクされていれば、この負荷分散アルゴリズムは引き続き機能します。これにより、仮想的な「同一サブネット」環境が作成され、地理的に分散した<span class="notranslate farm-term" translate="no">farm</span>クラスターにとって最も効率的な構成となります。 

## 異なるサブネット間でロードバランスされた仮想IPがどのように機能するか（ <span class="notranslate farm-term" translate="no">Farm</span>クラスタ） {#vip-load-balancing-different-subnets}

### マルチゾーンスケーリング：クラウドサブネット間でのトラフィックのオーケストレーション {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

**アーキテクチャガイド：マルチゾーンおよびクラウド環境における<span class="notranslate farm-term" translate="no">Farm</span>クラスタのスケーリング**アプリケーションワークロードを個別の可用性ゾーンとサブネットに分散するための設計図を提供します。 

### クロスサブネット<span class="notranslate farm-term" translate="no">Farm</span>クラスタ: マルチノードWindowsおよびLinuxスケーラビリティ {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


![ 2つの異なるサブネットにまたがって動作する負荷分散型クラスタの図farm ](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

 外部ロードバランシングによるグローバルなトラフィック分散<span class="notranslate farm-term" translate="no">farm</span>ノードが**異なるサブネット**に分散されている場合 (マルチ AZ クラウド展開で一般的)、 **仮想 IP (VIP)**は外部の**ロードバランサー (LB)**によって管理されます。LB は VIP を保持し、受信トラフィックをそれぞれのサブネットにあるサーバーの物理 IP アドレスに転送します。 

#### インテリジェントなトラフィックルーティングと負荷分散ルール {#intelligent-traffic-routing--load-balancing-rules}

ロードバランサーは、主に次の2つの要素に基づいてクライアントからのリクエストを分散します。 

  * **分散ルール:**トラフィックは、セッションアフィニティまたはロードバランシングアルゴリズム (例: **クライアント IP アドレス**または**クライアント TCP ポート**の分析) に従って分割されます。
  * **ノードの可用性:**トラフィックは、 SafeKitヘルスチェックによって正常と判断されたノードにのみルーティングされます。


> **⚠️ 注:** SafeKitはヘルスチェックロジックを提供します。物理または仮想ロードバランサーは、ネットワークインフラストラクチャによって提供される必要があります。

#### SafeKitヘルスチェックメカニズム {#safekit-health-check-mechanism}

SafeKit 、 <span class="notranslate farm-term" translate="no">farm</span>内のすべてのサーバーにリアルタイムの**ヘルスチェック URL**を提供し、その運用状況をロードバランサーに伝達します。 

  * **ノードが稼働中:**ヘルスチェックの結果、 `HTTP 200 OK`が返されました。ロードバランサーはこのサーバーをアクティブローテーションに含めています。
  * **ノードダウン/フェイルオーバー:**サーバーまたはアプリケーションに障害が発生した場合、 SafeKit `HTTP 404 NOT FOUND`を返します (またはサービスにアクセスできなくなります)。ロードバランサーは、障害が発生したノードへのトラフィックの送信を直ちに停止します。


#### クラウド導入標準: AWS 、 Azure 、 GCP 、 {#cloud-deployment-standards-aws-azure-and-gcp}

このアーキテクチャは、 **クラウド<span class="notranslate farm-term" translate="no">Farm</span>クラスタ**の基盤モデルであり、サブネットまたはゾーン全体がオフラインになった場合でも、残りのノードが負荷の処理を継続することを保証します。これは、以下のサービスでネイティブにサポートされています。 

  * 💡 [ **Amazon AWS** ](</ja/solutions/aws-load-balancing-cluster-failover/>) ( AWSネットワークロードバランサー)
  * 💡 [ **Microsoft Azure** ](</ja/solutions/azure-load-balancing-cluster-failover/>) ( Azureロードバランサー )
  * 💡 [ **Google Cloud ( GCP )** ](</ja/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing)


## 仮想IPとDNSリダイレクト：DNSフェイルオーバーが失敗する理由 {#virtual-ip-vs-dns-redirection-failover}

### DNS伝播の落とし穴：VIPがDNSリダイレクトよりも優れている理由 {#the-dns-propagation-trap-why-vips-outperform-dns-redirection}

高可用性アーキテクチャにおいて、フェイルオーバーにDNSを利用することは、しばしば**誤った安心感**を生み出します。DNSレコードを変更してバックアップサーバーを指すようにすることは、一見簡単な復旧方法のように思えますが、**予測不可能な遅延**という重大な問題を引き起こします。DNSベースのリダイレクトは、変更を認識して伝播するために、制御不能な中間リゾルバのエコシステムに依存するため、現代のエンタープライズサービスにおける「ダウンタイムゼロ」の要件とは根本的に相容れません。 

### 技術的なシナリオ：DNS解決と「停止」したクライアント {#the-technical-scenario-dns-resolution-and-the-stuck-client}

標準的なネットワーク構成では、仮想名**（DNS名）** **ユーザーにとって人間が読みやすいエントリポイントとして機能します。しかし、データがネットワークを介して送信されるためには、その名前が特定の物理IPアドレス**に解決される必要があります。 

![高可用性クラスタにおける物理IP 1へのDNS名前解決を示す図](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 高可用性クラスタにおける物理IP 1上のDNS解決と「スタック」したクライアント

#### 現在の状態: 物理IP 1への解決 {#current-state-resolution-to-physical-ip-1}

まず、 **クライアント 1**と**クライアント 2**は、DNS システムに仮想名を問い合わせます。システムは**物理 IP 1**を返します。その後、クライアントはその特定のハードウェア アドレスへの直接ネットワーク接続 (ソケット) を確立します。 

#### フェイルオーバーの課題：物理IP 2への再ルーティング {#the-failover-challenge-rerouting-to-physical-ip-2}

物理IPアドレス1のサーバーが故障した場合、管理者はDNSレコードを更新して**物理IPアドレス2**を指すようにします。クライアントのルーティングを正常に行うには、以下の「完璧な」手順が必要です。 

  * **の有効期限 (TTL)** 、すべての中間 ISP および企業リゾルバで期限切れになる必要があります。
  * クライアント1とクライアント2の両方のローカルDNSキャッシュをクリアする必要があります。
  * アプリケーションは既存のソケットを閉じ、新しいDNSルックアップを開始する必要があります。

これらの手順のいずれかが省略されると、 **クライアント 1 とクライアント 2 は、**無効な物理 IP 1 との通信を試み続ける「スタック」状態になり、DNS レコードが更新されてもサービスが停止します。 

### DNSリダイレクトの2つの「ブラックボックス」 {#the-two-black-boxes-of-dns-redirection}

  * **再帰的キャッシング:**多くのインターネット サービス プロバイダ (ISP) および企業の DNS リゾルバは、トラフィックを削減するために低い TTL 設定を無視し、要求された有効期限を超えて「古い」物理 IP 1 を数分または数時間キャッシュすることがよくあります。
  * **アプリケーションの永続性:**最新のアプリケーション (Java ベースのマイクロサービスや Web ブラウザなど) は、起動時に DNS ルックアップを一度だけ実行することがよくあります。DNS レコードが物理 IP 2 に更新された場合でも、アプリケーションは内部メモリに保存されている初期 IP を引き続き使用します。


### 結論 {#conclusion}

DNSリダイレクトは、高可用性ソリューションとしては一貫性に欠ける解決策です。ローカル環境またはリージョン環境内で瞬時にフェイルオーバーを実現するには、ソフトウェア定義の**IP（VIP）を使用することが、ダウン**ゼロの永続性を保証する唯一の方法です。 

## 比較：仮想IPの実装、レイテンシ、およびアプリケーションの透過性 {#vip-vs-dns-comparison}

**高可用性および災害復旧のための仮想IP（VIP）リダイレクト方式とDNSリルーティング方式の技術比較**

環境とユースケース|高可用性タイプ|リダイレクトメカニズム|ネットワーク遅延|アプリケーションの透過性とIPローカリティ  
---|---|---|---|---  
プライマリ/バックアップ (高可用性) | Mirrorクラスタ| Gratuitous ARP / MAC テイクオーバー|非常に低い: ブロードキャスト GARP を検出して送信する時間|完全な透過性: 仮想 IP はアクティブ ノードにローカルです。クライアント IP は保持されます。  
ロードバランシング (アクティブ/アクティブ) | <span class="notranslate farm-term" translate="no">Farm</span>クラスタ|カーネルレベルのネットワークフィルタ / GARP |非常に低い: ネットワークフィルタを検出して再構成するのに時間がかかります|完全な透過性: 仮想 IP はすべてのノードでローカルです。クライアント IP は保持されます。  
同一サブネット / 拡張 LAN (VLAN ストレッチ) |ディザスター リカバリ (リモート データ センター) |標準 IP エイリアシング / GARP |低: ストレッチ VLAN に依存します RTT (ラウンド トリップ タイム) |完全な透過性: 仮想 IP はノード上でローカルです。クライアント IP は保持されます。  
異なるサブネット|ディザスターリカバリー (リモートデータセンター / クラウド) |外部ロードバランサー|中程度: ロードバランサーのヘルスチェック間隔により、フェイルオーバーのレイテンシが高くなります| ⚠️ 部分的な透過性: SNAT/DNAT を使用します。仮想 IP は**ノード上でローカルではありません**クライアント IP は**保持されません**アプリケーションがこれをサポートする必要があります。  
DNS 再ルーティング: VIP なし|ディザスターリカバリー (リモートデータセンター) | DNS レコード更新 (名前 / 物理 IP) |高/予測不能: DNS TTL (Time To Live) とクライアント DNS キャッシュに依存します。 | ⚠️ 信頼性が低い: クライアントは DNS を再解決する必要があります。ほとんどの場合、クライアントは起動時に解決された古い IP を引き続き使用し、フェイルオーバー後に再ルーティングされません。  
  
## ネットワーク負荷分散と高可用性のための仮想IPアドレスの設定 {#virtual-ip-configuration-load-balancing-ha}


{{%  insert-safekit-farm-video-ja  %}}
 

## 仮想IP（VIP）に関するよくある質問 {#virtual-ip-faq}

### 仮想IP（VIP）とネットワーク {#virtual-ip-vip--networking}

仮想IP（VIP）とは何ですか？また、物理IPとはどのように異なりますか？

物理IPアドレス****特定のネットワークインターフェースにバインドされますが、仮想IP（VIP） ****ハードウェアに依存しない「フローティング」アドレスです。 SafeKitでは、VIPは永続的なエントリポイントとして機能します。プライマリサーバーに障害が発生した場合、VIPは自動的に正常なセカンダリノードに移行するため、クライアントの再設定は不要です。

仮想IPを使用するには、ハードウェアロードバランサーが必要ですか？

いいえ**SafeKit高可用性ソフトウェア**は、ソフトウェアレベルで仮想 IP を管理します。同一サブネットアーキテクチャでは、 **IP エイリアシング**と**Gratuitous ARP (GARP)**を利用してトラフィックをリダイレクトします。これにより、外部ハードウェアロードバランサーや専用プロキシサーバーのコストと複雑さが解消されます。

Gratuitous ARP（GARP）とは何ですか？また、なぜ使用されるのですか？

**Gratuitous ARP (GARP)**は、ネットワークスイッチとルーターの ARP テーブルを更新するネットワークブロードキャストです。フェイルオーバー中、新しいプライマリサーバーは GARP パケットを送信して、 **仮想 IP**がその MAC アドレスにマッピングされたことを通知し、ネットワークファブリック全体でトラフィックの再ルーティングを即座に実行します。

仮想IPアドレスにDNS名を関連付けることはできますか？

**はい。**標準の A レコードを作成することで、DNS 名を VIP に関連付けることができます。主な利点は、リダイレクトが**VIP レベル** (ARP またはネットワークリダイレクト経由) で管理され、 **DNS レベルでは管理されないことです。**これにより、DNS 伝播や TTL の期限切れに伴う遅延を回避することで、 **アプリケーションの透過性が確保されます。**

### クラウドと高度なアーキテクチャ {#cloud--advanced-architectures}

クラウドにおける仮想IP（ AWS 、 Azure 、 GCP ）はどのように機能しますか？

レイヤー2（ARP）が制限されているクラウド環境では、 SafeKit 統合する **クラウドロードバランサー** (AWS ELB、 Azure LB、またはGoogle GCLB）。 SafeKit 提供する **健康チェックURL** プラットフォームが監視し、SNAT/DNATを使用してトラフィックをアクティブノードにルーティングします。

災害復旧において、拡張LANはロードバランサーよりも優れているのでしょうか？

**はい**遠隔データセンターの場合、 **拡張LAN（拡張VLAN）** 維持するため、多くの場合優れている。 **アプリケーションの透明性** サイト間で。 **同じ仮想IPアドレス** これにより、アプリケーションとそのクライアントは同じIDを使用して通信を継続するため、データセンター間の移行は完全にシームレスになります。

DNSルーティングと仮想IPアドレスの制限事項は何ですか？

**DNSのリルーティング**は**TTL（Time to Live）**とクライアント側のキャッシュによって制限されるため、復旧に数時間かかる場合があります。大きな欠点は、 **DNS名を再解決できないクライアントが、障害が発生したサーバーへの接続を試み続ける**ことです。これに対し、**仮想IP**は瞬時にレイヤー2フェイルオーバーを提供し、すべてのトラフィックを即座にリルーティングするため、クライアント側のDNSキャッシュの状態に関係なく接続が確保されます。

### 透明性とセキュリティ {#transparency--security}

アプリケーションの透過性にとって、ローカル仮想IPアドレスが重要なのはなぜですか？

ローカル**IP (VIP)** SafeKit **が永続的な VIP にバインドできるようにすることで、アプリケーションの透過性**確保します。カーネル レベルでリダイレクトを処理するため、バインドさ**た IP が変わる DNAT ソリューションとは異なり、アプリケーションはクラスタのフェイルオーバーを認識できませ** 。

仮想IPアドレスを使用すると、クライアントの元のIPアドレスは維持されますか？

はい。 SafeKit ソースネットワークアドレス変換（SNAT）を回避します。VIPはアクティブサーバーにローカルであるため、アプリケーションは **元のクライアントIP** これは、セキュリティ監査、セッションの永続性、および規制ログ記録にとって非常に重要です。


{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}