---
title: "Kubernetes K3s 高可用性: 2ノード同期レプリケーションとフェイルオーバー"
canonical: "https://safekit.eviden.com/ja/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/"
description: "外部ストレージやetcdクォーラムなしで、2ノードでK3sの高可用性を実現する方法を学びましょう。 SafeKit データ損失ゼロのレプリケーションと自動フェイルオーバーを提供します。"
category: "solutions"
lang: "ja"
topics: "K3s HA の簡素化: MetalLB と Longhorn ではなくSafeKit選択する理由、目次、 SafeKitソフトウェアがKubernetes K3s 高可用性クラスタをどのように簡単に実装するか、 SafeKit mirrorクラスタがKubernetes K3S とどのように連携するか、 SafeKit高可用性の制限、比較: SafeKitと標準 K3s スタック (MetalLB と Longhorn)、ビデオ ガイド: SafeKit HA mirrorクラスタの構成、🔍 SafeKit高可用性ナビゲーション ハブ"
---

# Kubernetes K3s 高可用性: 2ノード同期レプリケーションとフェイルオーバー {#kubernetes-k3s-high-availability-2-node-synchronous-replication--failover}

## K3s HAの簡素化：MetalLBやLonghornではなくSafeKitを選ぶ理由とは？ {#safekit-k3s-ha-introduction}

K3s向けの標準的なオープンソーススタック（MetalLB + Longhorn）は大規模データセンターでは強力ですが、2ノードのオンプレミスサイトでは過剰な複雑さを招きます。 **SafeKit** スタンドアロンのネットワークツールとストレージツールを単一の統合型HAエンジンに置き換えることで、K3s環境を簡素化します。 

### 2ノードK3s高可用性（HA）にSafeKitを使用する理由とは？ {#why-use-safekit-for-2-node-k3s-high-availability-ha}

  * **真の 2 ノード高可用性: ** SafeKitは、わずか 2 ノード** **で完全な冗長性を提供し、_etcd_ クォーラムの 3 ノード要件を排除します。
  * **ゼロデータ損失 (RPO=0): ** 、高オーバーヘッドのブロックストレージを**同期バイトレベルレプリケーション**に置き換え、ローカル SSD のパフォーマンスを向上させます。
  * **柔軟なファイルレベルの保護: ** SafeKitは、ファイルレベルでホストベースのレプリケーションを実行します。これはアプリケーションにとって完全に透過的です。データベースだけでなく、関連するすべてのフォルダーとデータも保護します。既存のフォルダー** **にもレプリケートできます。
  * **統合仮想 IP (VIP): **カーネル レベルでクラスタ IP をネイティブに管理し、個別の** MetalLB **構成の必要性をなくします。
  * **自動フェイルオーバーとフェイルバック: **障害発生時にセカンダリノードへの即時移行をトリガーします。プライマリノードが正常になると、 SafeKit自動データ再同期が手動介入なしで実行されます** **
  * **超低オーバーヘッド: ** SafeKitは、標準スタックで必要とされるストレージ ポッド (CSI/Longhorn) やネットワーク ポッド (CNI/MetalLB) の重い管理オーバーヘッドなしで動作するため、アプリケーションに重要な RAM と CPU を解放できます。
  * ** IT ジェネラリスト向け: **ネットワークとストレージの複雑なインフラストラクチャ YAML ** **な Web GUI ** **自動化されたデプロイメント スクリプトに置き換え、アプリケーションに集中できるようにします。


![ SafeKit統合仮想IP、リアルタイムレプリケーション、自動フェイルオーバー機能を備えた2ノードK3s高可用性アーキテクチャ図](/wp-content/uploads/2026/02/safekit-mirror-k3s-1024.jpg "w:512")

 ** 2ノードK3sクラスタ向け共有なし高可用性（HA） **  


<a class="btn-quick-install" href="/ja/quick-install/safekit-quick-installation-guide-with-kubernetes/"> ⚡ Kubernetes HAクラスタのクイックインストールガイド > </a>
## 目次 {#toc}

  * [ソフトウェアSafeKitどのようにしてKubernetes高可用性クラスタを簡単に実装するのでしょうか？ ](#safekit-mirror-k3s-cluster)
  * [ SafeKit mirrorクラスターは、 Kubernetes K3S とどのように連携しますか? ](#safekit-mirror-cluster)
  * [ SafeKit高可用性制限事項](#safekit-ha-limitations)
  * [比較： SafeKitと標準K3sスタック（MetalLBおよびLonghorn） ](#safekit-k3s-ha-comparison)比較
  * [ビデオガイド: SafeKit Mirror HA クラスタの構成](#videoguide-safekit-mirror-cluster)
  * [ 🔍 SafeKit高可用性ナビゲーションハブ](#hub)


## SafeKitソフトウェアはどのようにしてKubernetes K3s高可用性クラスタを簡単に実装するのでしょうか？ {#safekit-mirror-k3s-cluster}

### 2ノードのK3sクラスタKubernetesで高可用性を実装するにはどうすればよいですか？ {#how-do-i-implement-high-availability-for-a-2-node-kubernetes-k3s-cluster}

**SafeKit k3s.safe mirror module**を使用すると、2 ノードのKubernetes K3s クラスタの高可用性 (HA) を実装できます。このソリューションにより、外部 NFS ストレージ、専用の外部構成データベース、またはKubernetesに関する専門知識を必要とせずに、冗長環境をデプロイできます。

### エッジィングとIoTコンピューティングにK3sを使用する理由とは？ {#why-use-k3s-for-edge-and-iot-computing}

[ K3s ](<https://k3s.io/>)は** **最適なKubernetesエンジンです。標準のKubernetesの運用上のオーバーヘッドを簡素化しつつ、完全な互換性を維持します。

### k3s.safe mirrorの主な特徴は何ですか？ {#what-are-the-key-features-of-the-k3ssafe-mirror-module}

k3s.safeモジュールは、以下の機能を実装することで、K3s向けの包括的なHAスタックを提供します。

  * **デュアルアクティブノード: ** 、Pod をホストするために 2 つのアクティブな K3s マスター/エージェントを同時に実行します。
  * **データベースレプリケーション: **ノード間でのMariaDB構成データベースのリアルタイムレプリケーション。
  * **永続ストレージ: **統合 NFS クライアント動的プロビジョナー (nfs-client) を介した永続ボリュームのレプリケーション。
  * **ネットワーク継続性: **には、シームレスなクライアントアクセスを実現する仮想 IP アドレスが含まれています。
  * **自動復旧: **自動フェイルオーバーとフェイルバックを完全にサポートします。


### K3s以外に、 SafeKitどのようなアプリケーションや環境を保護できますか？ {#beyond-k3s-which-applications-and-environments-can-safekit-protect}

SafeKit 多用途で高可用性のソリューションです **両方にとって Windows そして Linux** それはK3sをはるかに超える mirror クラスター。 **同期リアルタイムレプリケーション** また、以下を含む幅広い重要なワークロードに対する自動フェイルオーバー機能も備えています。

  * **仮想環境および物理環境: **完全な Hyper-V または KVM 仮想マシン。
  * **コンテナオーケストレーション: ** 、 Docker 、 Podman環境。
  * **データとサービス: **個別のファイルディレクトリ、サービス、および各種データベース。
  * **クラウドインフラストラクチャ: **クラウドアプリケーションの高可用性。


SafeKit ** ** `Farm` ** ** ** **します。

💡 [サポートされているHAソリューションの全リストはこちらをご覧ください](</ja/solutions/>)

### SafeKitどのようにしてK3sの高可用性を実現するのか？ {#safekit-k3s-architecture-table}

**アーキテクチャと冗長性ロジックSafeKitおよび**を使用）

2ノードK3sクラスタ| SafeKit PRIM（プライマリノード） | SafeKit SECOND（セカンダリノード）  
---|---|---  
ワークロード実行 | K3sのマスターサービスとエージェントサービスは稼働しており、クラスタのオーケストレーションを管理し、ポッドを実行しています。 | K3sのマスターサービスとエージェントサービスは引き続き稼働しており、並列処理と高可用性を提供しています。  
NFS ストレージと PV | • 仮想 IP と NFS ポートをホストします。 <br> • アクティブなエクスポート NFS 共有を管理します。 <br> • K3s 永続ボリューム (PV) を保存します。 |同期ミラーリング: SafeKitは、すべての永続ボリュームをリアルタイムで複製して、データ損失をゼロにします。  
構成データベース| • 仮想 IP とMariaDBポートをホストします。 <br> • アクティブな K3s 構成データベース|を管理します。 データベースのレプリケーション: MariaDBデータベースは同期的にミラーリングされ、フェールオーバーのためにクラスタの状態が保持されます。  
  
**自動フェイルオーバーメカニズム: **プライマリノードに障害が発生した場合、 SafeKit仮想 IP とストレージサービスを自動的にセカンダリノードに移行し、K3s クラスターのサービスが中断されないようにします。

## SafeKit mirrorクラスターは、 Kubernetes K3S とどのように連携しますか? {#safekit-mirror-cluster}

### ステップ 1: Mirrorクラスターでのバイトレベルのファイルレプリケーション {#step-1-byte-level-file-replication-in-a-mirror-cluster}

このステージでは、 **サーバー 1 (PRIM) **と**サーバー 2 (SECOND) **間の高可用性アーキテクチャを示します。両方のサーバーは、 [アーキテクチャ テーブル](#safekit-k3s-architecture-table)で定義されている K3s マスターおよびエージェント コンポーネントを実行します。


![ K3s クラスターでのバイトレベルでのファイルレプリケーションKubernetes mirror ](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


現在、 **仮想IP（VIP）** , **NFS永続ストレージ** 、 そして **MariaDB** サーバー 1 (PRIM) でのみアクティブです。両ノードの K3s マスター コンポーネントは、仮想 IP を介してクラスタ状態にアクセスすることで相互に同期します。 MariaDB ポート。 SafeKit 実装する [同期レプリケーション](</ja/best-practises/synchronous-replication-vs-asynchronous-replication/>) の MariaDB 永続的な NFS ファイルにより、 **データ損失ゼロ（RPO = 0）** 故障が発生した場合。

K3sマスターは、K3sエージェントと直接通信することで、ワークロードを両方のノード（またはそれ以上）に分散します。外部クライアントは、  
[クラスターの仮想 IP アドレスは PRIM ノード上の](</ja/best-practises/how-a-virtual-ip-address-works/>) 。標準のKubernetesメカニズムを使用して、K3s マスターはノード全体に分散されたポッドにトラフィックを中継します。同様に、ポッドは仮想 IP と NFS ポートを介して PRIM サーバー上の**永続ボリューム (PV) **にアクセスします。

### ステップ2：自動フェイルオーバーとサービス継続性 {#step-2-automatic-failover-and-service-continuity}

**サーバー 1 (PRIM) **が故障した場合、 **サーバー 2 (SECOND) **自動的にクラスタ操作を引き継ぎ、継続性を確保します。


![フェイルオーバーがKubernetes K3S mirrorクラスター](/wp-content/uploads/2023/02/safekit-stop-alone-300.png "w:300")で発生


SafeKit障害を検知し、直ちにクラスタの仮想 IP アドレス** ** Server 2 に移行します**次に、ローカルの NFS サービス** MariaDB 、 **および**アクティブ状態に昇格させます。ステップ 1 で同期レプリケーションが実行されたため、すべてのMariaDBデータベースと NFS 永続ボリューム (PV) ファイルは既に Server 2 上で最新の状態になっており、データ損失は発生しません。

クラスタの状態が維持された状態で、サーバー2上のK3sマスター** ** ）は実行を継続します。サーバー1エージェントの障害を検出し、影響を受けるポッドを残りのアクティブなK3sエージェントに自動的に再スケジュールします。フェイルオーバー時間（RTO）の合計は、障害検出間隔（デフォルト：30秒）と、セカンダリノードでK3sコンポーネントが初期化されるのに必要な時間の合計です。

サーバー1がオフラインの間も、 MariaDBとNFSサービスはサーバー2上で引き続き実行され、変更内容はローカルにのみ書き込まれます。  


### ステップ3：フェイルバックと自動再統合 {#step-3-failback-and-automatic-reintegration}

**フェイルバック** この問題が発生するのは、最初の問題が解決された後にサーバー1が再起動された場合です。 SafeKit 自動的に再同期します MariaDB NFS ファイルでは、ダウンタイム中にサーバー 2 で変更されたデータのみを更新します。この再統合プロセスは **非破壊的** K3sのマスターおよびエージェントコンポーネントは、サーバー2上で中断なく引き続き稼働しています。 


![ K3s クラスターにおける自動再同期とフェイルバックmirror ](/wp-content/uploads/2023/02/safekit-resynchro-alone-300.png "w:300")

 

SafeKit 、サーバーの停止方法に基づいて復旧時間を最適化します。 

  * **クリーンシャットダウン: **サーバー 1 でSafeKit意図的に停止された場合、 **変更追跡ビットマップ**を使用して、ファイル内の特定の変更されたゾーンのみが再同期されます。これにより、超高速の再統合が保証されます。 
  * **システムクラッシュ（例：停電）：** サーバー1が正常にシャットダウンされなかった場合、安全のため変更ビットマップはバイパスされます。 SafeKit 代わりに、最後に確立された同期ポイントよりも新しい変更タイムスタンプを持つすべてのファイルを再同期し、 **データの完全性**. 


### ステップ4：高可用性と負荷分散の復元 {#step-4-restoring-high-availability-and-load-distribution}

再統合後、クラスタ**ステップ 1 で説明した状態を反映して、完全mirrorモードに戻ります**システムは再び高可用性状態になります** 2 では NFS サービス** **アクティブになり、すべてのSafeKit更新のリアルタイムレプリケーションが Server MariaDBに**されます。 


Kubernetes K3s クラスターで通常動作に戻る![ mirror ](/wp-content/uploads/2023/02/safekit-second-prim-300.png "w:300")

 

の **K3sマスター** そして **K3sエージェント** サーバー1で自動的に再起動されます。 Kubernetes スケジューラはサーバー1を正常なノードとして認識し、両方のサーバーにワークロードを分散させるためにポッドの再スケジュールを開始できます。 

管理者がMariaDBおよび NFS サービスをサーバー 1 で実行することを希望する場合 (元の PRIM ロールを復元する場合)、都合の良い時間に Web コンソールから手動で**切り替え**トリガーするか、構成設定を通じて自動化することができます。 

### SafeKit Mirrorクラスターの構成方法、 {#safekit-mirror-cluster-configure}


![ SafeKit Webコンソール： mirrorクラスタのハートビートネットワーク、仮想IP設定、リアルタイムディレクトリレプリケーションを表示する高可用性構成ダッシュボード](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


** SafeKit Webコンソール**重要なアプリケーションの高可用性をオーケストレーションするための直感的なインターフェイスを提供します。わずか数ステップで、 ** SafeKit mirrorクラスタ**を構成して、ビジネス継続性を確保できます。

  * **アプリケーションフェイルオーバー（マクロタブ）： **障害発生時に自動的に再起動される特定のアプリケーションサービスを定義します。
  * **ハートビートネットワーク: **クラスタノードが互いの健全性と可用性を継続的に監視し、フェイルオーバーの決定を同期するために使用する専用の通信パス。
  * **仮想 IP 管理: **フェイルオーバー後のクライアントの透過的な再接続のために仮想 IP (VIP) を設定します。
  * **リアルタイムレプリケーション: **ホストベースの同期バイトレベルレプリケーションの対象となる重要なディレクトリを選択します。
  * **チェッカー: **アプリケーションの状態を監視し、プロセス障害が検出された場合は自動復旧をトリガーします。


の SafeKit クラスターには、3 台目の監視マシンや追加のハートビート ネットワークを必要とせずにネットワーク分離の問題を解決するための専用のスプリットブレイン チェッカーが含まれています。詳細については、 [クラスターにおけるハートビート、フェイルオーバー、クォーラム](</best-practises/heartbeat-failover-quorum-windows-linux-cluster/>).

### SafeKit mirrorクラスターを監視する方法は？ {#safekit-mirror-cluster-monitoring}


![ SafeKit Webコンソール：アクティブなデータレプリケーションを備えたPRIMおよびSECOND状態を示す2ノードmirrorクラスタのリアルタイム監視](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


** SafeKit管理コンソール**高可用性インフラストラクチャの統合ビューを提供します。これにより、管理者はクラスタの**動作状態**を監視し、データの同期をリアルタイムで追跡できます。

2ノード構成のmirrorクラスタの場合、コンソールには各サーバーの役割が明確に表示されます。

  * ** PRIM (プライマリ): **現在アプリケーションを実行し、仮想IPを管理しているアクティブなノード。ローカルストレージへの書き込みと、セカンダリノードへのリアルタイムレプリケーションを実行します。
  * **セカンダリ (二次): **同期バイトレベル更新を受信するスタンバイノード。プライマリが故障した場合、即座に引き継ぐ準備ができています。
  * ** ALONE 状態: **クラスターが単一ノードで実行されている場合 (メンテナンス中や障害発生後など) に視覚的に警告を発し、冗長性が一時的に失われていることを示します。
  * **再同期の進行状況: **障害が発生したノードが復旧すると、バックグラウンドでのデータ再統合中にステータスがオレンジ色に変わり、「正常に戻る」フェーズ中にダウンタイムが発生しないようにします。


シンプルなステータス アイコンに加えて、このインターフェースはワンクリック フェイル**オーケスト**機能を提供し、計画メンテナンスのためにプライマリ ロールを手動で再割り当てしながら、ユーザー アクティビティの継続的な可用性を確保します。


{{%  insert-safekit-usage-ja  %}}
 

## 比較： SafeKit vs. 標準K3sスタック（MetalLBおよびLonghorn） {#safekit-k3s-ha-comparison}

**比較: SafeKitと標準オープンソース (MetalLB + Longhorn) **比較

機能| SafeKit ( K3s.safe ) | MetalLB + Longhorn (標準K8)  
---|---|---  
アーキテクチャ|オールインワン: ネットワーク、レプリケーション、フェイルオーバーを単一のパッケージに統合。 | DIY (Do It Yourself) スタック: 複数の独立したパッケージ (CNI、CSI、ロードバランサー) が必要。  
ハードウェア効率|純粋な 2 ノード HA: 3 番目の「ウィットネス」ノードまたはアービター ノードなしで完全な冗長性を実現します。 |最小 3 ノード: 通常、Etcd のクォーラムとストレージの安全性のために奇数が必要です。  
ネットワーク (VIP) |ネイティブ: OS レベルで管理される仮想 IP。K3 からは透過的。 |コンプレックス: MetalLB のインストールと L2 または BGP 構成が必要。専用のスピーカー ポッドを使用し、各ノードで CPU/RAM を消費します。  
ストレージ要件|バイトレベル同期: 既存ディレクトリのリアルタイムファイルレプリケーション。標準システムディスクで動作。CPU/ネットワークオーバーヘッドを最小限に抑えたバイトレベルのファイルレプリケーション。 |ブロックレベル: 専用ストレージポッドを使用した分散ブロックストレージ (Longhorn)。リソース消費量が多い。  
フェイルオーバー インテリジェンス|独立した安定性: SafeKitコンテナ ランタイムの外部で動作します。OS とハードウェアを直接監視し、 Kubernetesコントロール プレーンまたはコンテナ エンジンがハングした場合でもフェイルオーバーを保証します。 |循環依存: フェイルオーバー ロジックは、保護対象のポッドの _内部_ でホストされます。ホスト OS または K3s エンジンがハングすると、管理ポッド (MetalLB/Longhorn) もフリーズし、多くの場合、「ロック」を解除するために手動でのトリアージが必要になります。  
管理|簡略化: 単一の Web コンソールで管理可能。専門家は不要。 Kubernetes専門| : YAML、Helm、および K8s 内部コントローラーに関する深い知識が必要。  
  
要約** ** 、標準的な DIY スタック (MetalLB + Longhorn) はKubernetes家向けにモジュール性を提供します** 、ストレージSafeKitネットワーク ツールが管理するように設計されているノード障害に対して脆弱になる**循環**関係を生み出します。このループは**独立したインフラストラクチャ レイヤーとして動作することで解消されます。 Kubernetesまたはホスト OS がハングしても動作し続ける、より堅牢でハードウェアに依存しない 2 ノード HA ソリューションを提供します。これにより、従来の分散ブロック ストレージおよびネットワーク オーバーレイに必要な、リソースのオーバーヘッドが大きい、必須の 3 ノード クォーラム、または構成の複雑さなしに、自動復旧とデータの整合性が確保されます。

## ビデオガイド： SafeKit HA mirrorクラスタの構成 {#videoguide-safekit-mirror-cluster}

### SafeKit動画: アプリケーションレベルのクラスタリング (8:47) {#demo-mirror-ha-cluster}

このビデオでは、 SafeKitの可用性が高い Microsoft SQL Serverこれは、ソリューションがK3s環境をどのように保護するかについて、優れた概要を提供します。 SafeKit 他のデータベースや業務上重要なアプリケーションでも同様に機能します。

### 動画ハイライト {#video-highlights}

  1. 🎬 [ 2 ノードとSQL Server ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. 🎬 [クラスターとmirror.safeモジュール](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>)を設定します (3:58)
  3. 🎬 [ SQLレプリケーション、移行、クラッシュ時のフェイルオーバーを開始してテストする](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)


&amp;amp;amp;amp;amp;amp;amp;lt;br /> 


{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}