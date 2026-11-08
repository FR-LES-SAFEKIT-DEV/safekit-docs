---
title: "Kubernetes K3s 高可用性：2 ノード同期レプリケーションとフェイルオーバー"
canonical: "https://safekit.eviden.com/ja/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/"
description: "外部ストレージや etcd クォーラムなしで、2 ノードで K3s の高可用性を実現します。SafeKit どのようにデータ損失ゼロのレプリケーションと自動フェイルオーバーを提供するのかをご覧ください。"
category: "solutions"
lang: "ja"
topics: "K3s HA の簡素化：MetalLB や Longhorn ではなく SafeKit を選ぶ理由とは？、目次、SafeKit ソフトウェアは、Kubernetes K3s 高可用性クラスターどのように簡単に実装しますか？、SafeKit mirror クラスター Kubernetes K3S とどのように連携しますか？、SafeKit High Availability の制限事項、比較：SafeKit と標準的な K3s スタック（MetalLB と Longhorn）、ビデオガイド：SafeKit HA mirror クラスターの構成、🔍 SafeKit を探索する"
translation: "translate_md 2026-11-08.3 | glossaire 2026-11-08.8 | Translation LLM | 36 expressions"
---

# Kubernetes K3s 高可用性：2 ノード同期レプリケーションとフェイルオーバー {#kubernetes-k3s-high-availability-2-node-synchronous-replication--failover}

## K3s HA の簡素化：MetalLB や Longhorn ではなく SafeKit を選ぶ理由とは？ {#safekit-k3s-ha-introduction}

K3s の標準的なオープンソーススタック（MetalLB + Longhorn）は大規模データセンターでは強力ですが、2 ノードのオンプレミスサイトには過剰な複雑さをもたらします。**SafeKit** は、スタンドアロンのネットワーキングおよびストレージツールを単一の統合 HA エンジンに置き換えることで、K3s 環境を簡素化します。 

### 2 ノードの K3s 高可用性（HA）に SafeKit を使用する理由とは？ {#why-use-safekit-for-2-node-k3s-high-availability-ha}

  * **真の 2 ノード高可用性：** SafeKit、わずか **2 ノード**で完全な冗長性を提供し、 *etcd の*クォーラムに必要な 3 ノードの要件を排除します。
  * **ゼロデータロス（RPO = 0）：** オーバーヘッドの大きいブロックストレージを、**ローカル SSD のパフォーマンスを実現する同期バイトレベルレプリケーション**に置き換えます。
  * **柔軟なファイルレベルの保護：** SafeKit、アプリケーションに対して完全に透過的なホストベースのファイルレベルレプリケーションを実行します。データベースだけでなく、関連するすべてのフォルダとデータも保護します。既存のフォルダは、**システムディスク**上であっても、インストールされている場所に正確にレプリケートできます。
  * **統合仮想 IP（VIP）：** カーネルレベルでクラスター IP をネイティブに管理し、**MetalLB の**個別の設定が不要になります。
  * **自動フェイルオーバーとフェイルバック：** 障害発生時にセカンダリノードに即座に切り替えます。**プライマリノードが正常になると、SafeKit 手動介入なしに自動データ再同期を**実行します。
  * **超低オーバーヘッド：** SafeKit、標準的なスタックで必要とされるストレージポッド（CSI/Longhorn）やネットワーキングポッド（CNI/MetalLB）といった重い管理オーバーヘッドなしで動作するため、アプリケーションにとって重要な RAM と CPU を解放します。
  * **IT ジェネラリストに優しい：** ネットワークとストレージの複雑な**インフラストラクチャの YAML を**、**シンプルな Web GUI** と自動化されたデプロイスクリプトに置き換えることで、アプリケーションにのみ集中できます。


![統合仮想 IP、リアルタイムレプリケーション、自動フェイルオーバーを特徴とする、2 ノード K3s 高可用性向け SafeKit アーキテクチャ図。](/wp-content/uploads/2026/02/safekit-mirror-k3s-1024.jpg "w:512")

 **2 ノードの K3s クラスター向け共有なし高可用性（HA）**  


<a class="btn-quick-install" href="/ja/quick-install/safekit-quick-installation-guide-with-kubernetes/">⚡ Kubernetes HA クラスターのクイックインストールガイド ></a>
## 目次 {#toc}

  * [SafeKit ソフトウェアは、Kubernetes K3s 高可用性クラスターどのように簡単に実装しますか？](#safekit-mirror-k3s-cluster)
  * [SafeKit mirror クラスター Kubernetes K3S とどのように連携しますか？](#safekit-mirror-cluster)
  * [SafeKit High Availability の制限事項](#safekit-ha-limitations)
  * [比較：SafeKit と標準的な K3s スタック（MetalLB と Longhorn）](#safekit-k3s-ha-comparison)
  * [ビデオガイド：SafeKit mirror HA クラスターの構成](#videoguide-safekit-mirror-cluster)
  * [🔍 SafeKit を探索する](#hub)


## SafeKit ソフトウェアは、Kubernetes K3s 高可用性クラスターどのように簡単に実装しますか？ {#safekit-mirror-k3s-cluster}

### 2 ノードの Kubernetes K3s クラスターで高可用性を実装するにはどうすればよいですか？ {#how-do-i-implement-high-availability-for-a-2-node-kubernetes-k3s-cluster}

**SafeKit k3s.safe mirror モジュール**を使用すると、2 ノードの Kubernetes K3s クラスターで高可用性（HA）を実装できます。このソリューションにより、外部 NFS ストレージ、専用の外部構成データベース、または専門的な Kubernetes 専門知識を必要とせずに、冗長環境をデプロイできます。

### エッジコンピューティングや IoT コンピューティングに K3s を使用する理由とは？ {#why-use-k3s-for-edge-and-iot-computing}

[K3s は](<https://k3s.io/>)、リソースが制約された環境向けに設計された軽量で認定済みのディストリビューションであるため、**IoT およびエッジコンピューティング**に最適な Kubernetes エンジンです。標準の Kubernetes の運用オーバーヘッドを簡素化しながら、完全な互換性を維持します。

### k3s.safe mirror モジュールの主な機能は何ですか？ {#what-are-the-key-features-of-the-k3ssafe-mirror-module}

k3s.safe モジュールは、以下を実装することで、K3s 向けの包括的な HA スタックを提供します

  * **デュアルアクティブノード：** 2 つのアクティブな K3s マスター/エージェントを同時に実行してポッドをホストします。
  * **データベースレプリケーション：** ノード間の MariaDB 構成データベースのリアルタイムレプリケーション。
  * **永続ストレージ：** 統合 NFS クライアントのダイナミックプロビジョナー（nfs-client）による永続ボリュームのレプリケーション。
  * **ネットワークの継続性：** シームレスなクライアントアクセスを実現する仮想 IP アドレスが含まれます。
  * **自動リカバリ：** 自動フェイルオーバーとフェイルバックを完全にサポートします。


### K3s 以外に、SafeKit どのようなアプリケーションや環境を保護できますか？ {#beyond-k3s-which-applications-and-environments-can-safekit-protect}

SafeKit は、**Windows と Linux 両方に対応**した汎用性の高い高可用性ソリューションであり、K3s mirror クラスターはるかに超える機能を提供します。**以下を含む、幅広い重要なワークロードに対して、同期リアルタイムレプリケーション**と自動フェイルオーバーを可能にします

  * **仮想環境と物理環境：** 完全な Hyper-V または KVM 仮想マシン。
  * **コンテナオーケストレーション：** Docker、Podman 環境。
  * **データとサービス：** 個別のファイルディレクトリ、サービス、および各種データベース。
  * **クラウドインフラストラクチャ：** クラウドアプリケーションの可用性を高めます。


SafeKit は、**Web サーバー**のようなステートレスアプリケーション向けに、ネイティブ**ネットワーク負荷分散とフェイル** **<span class="notranslate farm-term" translate="no">farm</span> クラスター**も提供します。

💡 [サポートされている HA ソリューションの全リストはこちらでご確認ください。](</ja/solutions/>)

### SafeKit どのように K3s の高可用性を実現するのか？ {#safekit-k3s-architecture-table}

**SafeKit を使用した 2 ノード K3s クラスターのアーキテクチャと冗長性ロジック**

2 ノード K3s クラスター | SafeKit PRIM (プライマリノード) | SafeKit SECOND ノード  
---|---|---  
ワークロード実行 | K3s のマスターおよびエージェントサービスはアクティブで、クラスターのオーケストレーションを管理し、ポッドを実行しています。 | K3s のマスターおよびエージェントサービスはアクティブな状態を維持し、並列処理と高可用性を提供します。  
NFS ストレージと PV |  • 仮想 IP および NFS ポートをホスト <br> • アクティブにエクスポートされている NFS 共有を管理します <br> • K3s 永続ボリューム（PV）を保存します  | 同期ミラーリング：SafeKit すべての永続ボリュームをリアルタイムで複製し、データ損失ゼロを保証します。  
構成データベース |  • 仮想 IP と MariaDB ポートをホスト <br> • アクティブな K3s 構成データベースを管理します  | データベースレプリケーション：MariaDB データベースは同期的にミラーリングされ、フェイルオーバー時のクラスター状態が保持されます。  
  
**自動フェイルオーバーメカニズム：** プライマリノードに障害が発生した場合、SafeKit 仮想 IP とストレージサービスをセカンダリノードに自動的に移行し、K3s クラスターのサービスを中断なく継続します。

## SafeKit mirror クラスター Kubernetes K3S とどのように連携しますか？ {#safekit-mirror-cluster}

### ステップ 1：mirror クラスターでのバイトレベルのファイルレプリケーション {#step-1-byte-level-file-replication-in-a-mirror-cluster}

このステージでは、**サーバー 1 (PRIM)** と**サーバー 2 (SECOND)** の間の高可用性アーキテクチャを説明します。両方のサーバーは[アーキテクチャテーブル](#safekit-k3s-architecture-table)で定義されているように、K3s マスターおよびエージェントコンポーネントを実行します。


![Kubernetes K3s mirror クラスターにおけるバイトレベルでのファイルレプリケーション](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


現在、**仮想 IP（VIP）**、**NFS 永続ストレージ**、および **MariaDB**、サーバー 1（PRIM）でのみアクティブです。両ノードの K3s マスターコンポーネントは、仮想 IP と MariaDB ポートを介してクラスター状態にアクセスすることで、互いに同期します。SafeKit MariaDB と NFS の永続ファイルの[同期レプリケーション](</ja/best-practises/synchronous-replication-vs-asynchronous-replication/>)を実装し、**障害発生時にデータ損失ゼロ（RPO = 0）** を保証します。

K3s マスターは、K3s エージェントと直接通信することで、ワークロードを両方のノード（またはそれ以上）に分散します。外部クライアントは  
PRIM ノード上の[クラスターの仮想 IP アドレス](</ja/best-practises/how-a-virtual-ip-address-works/>)。標準的な Kubernetes メカニズムを使用して、K3s マスターはノード全体に分散されたポッドにトラフィックを中継します。同様に、ポッドは仮想 IP と NFS ポートを介して PRIM サーバー上の**永続ボリューム（PV）** にアクセスします。

### ステップ 2：自動フェイルオーバーとサービス継続性 {#step-2-automatic-failover-and-service-continuity}

**サーバー 1（PRIM）** に障害が発生した場合、**サーバー 2（SECOND）が**自動的にクラスターの運用を引き継ぎ、継続性を確保します。


![Kubernetes K3S mirror クラスターでのフェイルオーバー](/wp-content/uploads/2023/02/safekit-stop-alone-300.png "w:300")


SafeKit 障害を検出し、クラスターの**仮想 IP アドレスを**直ちにサーバー 2 に移行します。**その後、ローカルの MariaDB** と **NFS サービスを**アクティブ状態に昇格させます。ステップ 1 で実行された同期レプリケーションにより、すべての MariaDB データベースと NFS 永続ボリューム（PV）ファイルはサーバー 2 で既に最新の状態になっているため、データ損失はゼロに抑えられます。

クラスターの状態が保持された状態で、サーバー 2 の **K3s マスターは**実行を継続します。サーバー 1 のエージェントの損失を検出し、影響を受けるポッドを自動的に残りのアクティブな K3s エージェントに再スケジュールします。合計フェイルオーバー時間（RTO）は、障害検出間隔（デフォルト：30 秒）と、セカンダリノードで K3s コンポーネントを初期化するために必要な時間の合計です。

サーバー 1 がオフラインの間も、MariaDB と NFS サービスはサーバー 2 で引き続き稼働し、変更はローカルにのみ書き込まれます。  


### ステップ 3：フェイルバックと自動再統合 {#step-3-failback-and-automatic-reintegration}

**フェイルバックは**は、最初の問題が解決された後にサーバー 1 が再起動されると発生します。SafeKit MariaDB と NFS ファイルを自動的に再同期し、ダウンタイム中にサーバー 2 で変更されたデータのみを更新します。この再統合プロセスは**非破壊的**であり、K3s のマスターおよびエージェントコンポーネントは中断することなくサーバー 2 で実行され続けます。 


![K3s mirror クラスターにおける自動再同期とフェイルバック](/wp-content/uploads/2023/02/safekit-resynchro-alone-300.png "w:300")

 

SafeKit は、サーバーの停止方法に基づいて復旧時間を最適化します 

  * **クリーンシャットダウン：** SafeKit サーバー 1 で意図的に停止された場合、ファイル内の特定の変更されたゾーンのみが**変更追跡ビットマップ**を使用して再同期されます。これにより、超高速な再統合が保証されます。 
  * **システムクラッシュ（例：停電）：** サーバー 1 がクリーンシャットダウンされなかった場合、安全のため変更ビットマップはバイパスされます。**代わりに SafeKit、最後に確立された同期ポイントよりも新しい変更タイムスタンプを持つすべてのファイルを再同期し、完全なデータ整合性**を保証します。 


### ステップ 4：高可用性と負荷分散を復元する {#step-4-restoring-high-availability-and-load-distribution}

再統合後、クラスターは**完全な mirror モード**に戻り、ステップ 1 で説明した状態をミラーリングします。**MariaDB** は再び高可用性状態になります。**と NFS サービスは**サーバー 2 でアクティブなままで、SafeKit すべてのファイル更新をサーバー 1 にリアルタイムでレプリケートします。 


![Kubernetes K3s mirror クラスターを通常運用に戻す](/wp-content/uploads/2023/02/safekit-second-prim-300.png "w:300")

 

**K3s マスター**と **K3s エージェントは**、サーバー 1 で自動的に再起動されます。Kubernetes スケジューラ、サーバー 1 を正常なノードとして認識し、ポッドの再スケジュールを開始して、両方のサーバーにワークロードを分散できるようになります。 

管理者が MariaDB および NFS サービスをサーバー 1 で実行することを希望する場合（元の PRIM ロールを復元する場合）、Web コンソールから都合の良い時間に手動で**切り替え**を行うか、構成設定を通じて自動化することができます。 

### SafeKit mirror クラスターを構成する方法 {#safekit-mirror-cluster-configure}


![SafeKit Web Console: ハートビートネットワーク、仮想 IP 設定、mirror クラスターのリアルタイムディレクトリレプリケーションを表示する高可用性構成ダッシュボード。](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


**SafeKit ウェブコンソールは**は、重要なアプリケーションの可用性を高めるための直感的なインターフェースを提供します。**数ステップで SafeKit mirror クラスター**を設定し、事業継続性を確保できます

  * **アプリケーションフェイルオーバー（マクロタブ）：** 障害発生時に自動的に再起動する特定のアプリケーションサービスを定義します。
  * **ハートビートネットワーク：** クラスターノードが互いの正常性と可用性を継続的に監視し、フェイルオーバーの決定を同期するために使用する専用の通信パス。
  * **仮想 IP 管理：** フェイルオーバー後にクライアントが透過的に再接続できるように、仮想 IP（VIP）を設定します。
  * **リアルタイムレプリケーション：** ホストベースの同期バイトレベルレプリケーションの対象となる重要なディレクトリを選択します。
  * **チェッカー：** アプリケーションの正常性を監視し、プロセスの障害が検出された場合は自動復旧をトリガーします。


SafeKit クラスターには、専用のスプリットブレインチェッカーが搭載されており、サードパーティのウィットネスマシンや追加のハートビートネットワークを必要とせずに、ネットワーク分離の問題を解決します。[クラスターにおけるハートビート、フェイルオーバー、クォーラム](</ja/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>)の詳細については、こちらをご覧ください。

### SafeKit mirror クラスターを監視するには？ {#safekit-mirror-cluster-monitoring}


![SafeKit Web Console: 2 ノード mirror クラスターのリアルタイム監視。PRIM および SECOND 状態とアクティブデータレプリケーションが表示されます。](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


**SafeKit 管理コンソールは**は、高可用性インフラストラクチャの統合ビューを提供します。**これにより、管理者はクラスターの動作状態**を監視し、データ同期をリアルタイムで追跡できます。

2 ノード mirror クラスターの場合、コンソールには各サーバーの役割が明確に表示されます

  * **PRIM (プライマリ):** アプリケーションを実行し、仮想 IP を管理しているアクティブなノード。ローカルストレージへの書き込みと、セカンダリノードへのリアルタイムレプリケーションを実行します。
  * **SECOND：** 同期バイトレベルの更新を受信するスタンバイノード。プライマリに障害が発生した場合、即座に引き継ぐ準備ができています。
  * **ALONE 状態：** クラスターが単一ノードで実行されている場合（メンテナンス中や障害発生後など）、冗長性が一時的に失われていることを視覚的に警告します。
  * **再同期の進捗状況：** 障害が発生したノードが復旧すると、バックグラウンドでのデータ再統合中にそのステータスがオレンジ色に変わり、「通常状態に戻る」フェーズ中にダウンタイムが発生しないようにします。


シンプルなステータスアイコンに加え、このインターフェースは**ワンクリックのフェイルオーバーオーケストレーション**を提供し、計画メンテナンス中にプライマリの役割を手動で再割り当てしながら、ユーザーアクティビティの継続的な可用性を確保します。


{{%  insert-safekit-usage-ja  %}}
 

## 比較：SafeKit と標準的な K3s スタック（MetalLB と Longhorn） {#safekit-k3s-ha-comparison}

**比較：SafeKit vs. 標準的なオープンソース（MetalLB + Longhorn）**

能力 | SafeKit (K3s.safe) | MetalLB + Longhorn (標準的な K8s)  
---|---|---  
アーキテクチャ | オールインワン：ネットワーク、レプリケーション、フェイルオーバーを 1 つのパッケージに統合。 | DIY (Do It Yourself) スタック：複数の独立したパッケージが必要 (CNI、CSI、ロードバランサー)。  
ハードウェア効率 | ピュア 2 ノード HA：3 番目の「ウィットネス」またはアービターノードなしで完全な冗長性を実現。 | 最小 3 ノード：Etcd のクォーラムとストレージの安全性を確保するため、通常は奇数個のノードが必要です。  
ネットワーキング（VIP） | ネイティブ：OS レベルで管理される仮想 IP。K3s からは透過的に扱われます。 | 複雑：各ノードで CPU/RAM を消費する専用のスピーカーポッドを使用した L2 または BGP 構成で MetalLB をインストールする必要があります。  
ストレージ要件 | バイトレベル同期：既存のディレクトリのリアルタイムファイルレプリケーション。標準システムディスクで動作し、CPU/ネットワークのオーバーヘッドを最小限に抑えたバイトレベルのファイルレプリケーションを実現します。 | ブロックレベル：専用ストレージポッドを使用する分散ブロックストレージ（Longhorn）。リソース消費量が高い。  
フェイルオーバーインテリジェンス | 独立した安定性：SafeKit コンテナランタイムの外側で動作します。OS とハードウェアを直接監視し、Kubernetes コントロールプレーンまたはコンテナエンジンがハングした場合でもフェイルオーバーを保証します。 | 循環依存：フェイルオーバーロジックは、保護対象のポッド*内で*ホストされます。ホスト OS または K3s エンジンがハングすると、管理ポッド (MetalLB/Longhorn) もフリーズし、多くの場合、「ロック」を解除するために手動によるトリアージが必要になります  
管理 | 簡素化：単一のウェブコンソールで管理可能。Kubernetes 専門知識は不要です。 | 専門知識：YAML、Helm、K8s の内部コントローラーに関する深い知識が必要。  
  
**要約すると**は、標準的な DIY スタック（MetalLB + Longhorn）は Kubernetes の専門家にとってはモジュール性を提供しますが、ストレージとネットワーキングツールが、それらが管理するように設計されているのと同じノード障害に対して脆弱になるという**循環依存関係**を生み出します。**SafeKit** は、独立したインフラストラクチャレイヤーとして動作することでこのループを断ち切ります。エンジンやホスト OS がハングした場合でも動作し続ける、より堅牢でハードウェアに依存しない 2 ノード HA ソリューションを提供します。これにより、従来の分散ブロックストレージやネットワーキングオーバーレイで必要とされる、重い Kubernetes オーバーヘッド、必須の 3 ノードクォーラム、または設定の複雑さなしに、自動リカバリとデータ整合性が保証されます。

## ビデオガイド：SafeKit HA mirror クラスターの構成 {#videoguide-safekit-mirror-cluster}

### SafeKit ビデオ：アプリケーションレベルのクラスタリング (8:47) {#demo-mirror-ha-cluster}

このビデオでは、Microsoft SQL Server における SafeKit の高可用性について説明していますが、このソリューションが K3s 環境をどのように保護するかについても優れた概要を示しています。SafeKit は、他のデータベースやビジネスクリティカルなアプリケーションでも同様に機能します。

### 動画ハイライト {#video-highlights}

  1. 🎬 [SQL Server を使用する 2 つのノード](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. 🎬 [クラスターと mirror.safe モジュールを構成する](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. 🎬 [SQL レプリケーション、移行、クラッシュ時のフェイルオーバーを開始してテストする](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)


&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 


{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}