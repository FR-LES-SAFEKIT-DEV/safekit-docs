---
title: "SafeKit Smart Console：スマートフォンでクラスターを管理"
canonical: "https://safekit.eviden.com/ja/architectures/safekit-smart-console-your-high-availability-cluster-in-your-pocket/"
description: "SafeKit Smart Console：ブラウザーやスマートフォンから高可用性クラスターをコード不要で設定・監視。リアルタイム通知にも対応します。"
category: "architectures"
lang: "ja"
topics: "Smart Console：デスクトップとモバイルで直感的かつエラーのない高可用性を実現, 目次, SafeKit mirror クラスターはウェブコンソールとどのように連携しますか？, SafeKit farm クラスターは、ウェブコンソールとどのように連携しますか？, Web コンソールで複数のモジュールと複数のクラスターを監視するにはどうすればよいですか？, コンソールでアラートを監視し、メール通知を管理する方法"
hashpart: "smart-console-intuitive-mobile-and-error-free-high-availability, table-of-contents, safekit-mirror-cluster, safekit-farm-cluster, multipe-modules-clusters, safekit-notifications-cluster"
translation: "translate_md 2026-11-22.1 | glossaire 2026-11-22.7 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png"
schemaType: "TechArticle"
---

# SafeKit Smart Console：スマートフォンでクラスターを管理 {#safekit-smart-console-manage-your-cluster-from-your-phone}

## Smart Console：デスクトップとモバイルで直感的かつエラーのない高可用性を実現 {#smart-console-intuitive-mobile-and-error-free-high-availability}

**スピードとシンプルさ**を追求したソリューションで、高可用性の管理方法を再定義します。SafeKit Web Console は、**学習コストゼロで**、**コードを一切記述することなく**インフラストラクチャを構成・制御できます。

デスクにいるときも、移動中も、スマートフォン対応のダッシュボードでクラスター全体を完全に制御できます。Smart Console、mirror モジュールと <span class="notranslate farm-term" translate="no">farm</span> モジュールの管理を合理化することで、**ヒューマンエラーを排除し**、最も重要なシステムでシームレスなフェイルオーバープロセスを保証します。

## 目次 {#table-of-contents}

  * [SafeKit mirror クラスターはウェブコンソールとどのように連携しますか？](#safekit-mirror-cluster)
  * [SafeKit <span class="notranslate farm-term" translate="no">farm</span> クラスターは、ウェブコンソールとどのように連携しますか？](#safekit-farm-cluster)
  * [Web コンソールで複数のモジュールと複数のクラスターを監視するにはどうすればよいですか？](#multipe-modules-clusters)
  * [コンソールでアラートを監視し、メール通知を管理する方法](#safekit-notifications-cluster)


## SafeKit mirror クラスターはウェブコンソールとどのように連携しますか？ {#safekit-mirror-cluster}

### SafeKit mirror クラスターを構成する方法 {#safekit-mirror-cluster-configure}


![SafeKit Web Console:ハートビートネットワーク、仮想 IP 設定、mirror クラスターのリアルタイムディレクトリレプリケーションを表示する高可用性構成ダッシュボード。](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


**SafeKit ウェブコンソールは**、重要なアプリケーションの高可用性をオーケストレーションするための直感的なインターフェースを提供します。数ステップで **SafeKit mirror クラスター**を構成し、事業継続性を確保できます：

  * **アプリケーションフェイルオーバー（マクロタブ）：** 障害発生時に自動的に再起動する特定のアプリケーションサービスを定義します。
  * **ハートビートネットワーク：** クラスターノードが互いの正常性と可用性を継続的に監視し、フェイルオーバーの決定を同期するために使用する専用の通信パス。
  * **仮想 IP 管理：** フェイルオーバー後にクライアントが透過的に再接続できるように、仮想 IP（VIP）を設定します。
  * **リアルタイムレプリケーション：** ホストベースの同期バイトレベルレプリケーションの対象となる重要なディレクトリを選択します。
  * **チェッカー：** アプリケーションの正常性を監視し、プロセスの障害が検出された場合は自動復旧をトリガーします。


SafeKit クラスターには、専用のスプリットブレインチェッカーが含まれており、サードパーティのウィットネスマシンや追加のハートビートネットワークを必要とせずに、ネットワークの分離の問題を解決します。[クラスターにおけるハートビート、フェイルオーバー、およびクォーラム](</ja/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>)の詳細については、こちらをご覧ください。

### SafeKit mirror クラスターを監視する方法 {#safekit-mirror-cluster-monitoring}


![SafeKit Web Console: 2 ノード mirror クラスターのリアルタイム監視。PRIM および SECOND 状態とアクティブデータレプリケーションが表示されます。](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


**SafeKit 管理コンソールは**、高可用性インフラストラクチャの統合ビューを提供します。これにより、管理者はクラスターの**動作状態**を監視し、データ同期をリアルタイムで追跡できます。

2 ノード mirror クラスターの場合、コンソールには各サーバーの役割が明確に表示されます：

  * **PRIM (プライマリ):** アプリケーションを実行し、仮想 IP を管理しているアクティブなノード。ローカルストレージへの書き込みと、セカンダリノードへのリアルタイムレプリケーションを実行します。
  * **SECOND：** 同期バイトレベルの更新を受信するスタンバイノード。プライマリに障害が発生した場合、即座に引き継ぐ準備ができています。
  * **ALONE 状態：** クラスターが単一ノードで実行されている場合（メンテナンス中や障害発生後など）、冗長性が一時的に失われていることを視覚的に警告します。
  * **再同期の進捗状況：** 障害が発生したノードが復旧すると、バックグラウンドでのデータ再統合中にそのステータスがオレンジ色に変わり、「通常状態に戻る」フェーズ中にダウンタイムが発生しないようにします。


単純なステータスアイコンに加えて、インターフェースは **`...` メニュー**を介して**ワンクリックフェイルオーバーオーケストレーション**を提供し、計画メンテナンス中にプライマリの役割を手動で再割り当てしながら、ユーザーアクティビティの継続的な可用性を確保します。

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> クラスターは、ウェブコンソールとどのように連携しますか？ {#safekit-farm-cluster}

### SafeKit <span class="notranslate farm-term" translate="no">farm</span> クラスターを構成する方法 {#safekit-farm-cluster-configuration}


![SafeKit Web Console:ネットワーク負荷分散と仮想 IP 管理のための farm クラスター構成。](/wp-content/uploads/2026/01/safekit-farm-cluster-config.png "w:966")


**SafeKit <span class="notranslate farm-term" translate="no">farm</span> クラスター**は、サービスの高可用性とスケーラビリティを考慮して設計されています。この構成では、両方のノードに同時に着信トラフィックを分散することに重点を置いています：

  * **ロードバランシングサービス（マクロタブ）：** すべてのノードでアクティブに保つ特定のアプリケーションサービス（例：Apache、IIS、Nginx）を定義します。
  * **ハートビートネットワーク：** ノードが <span class="notranslate farm-term" translate="no">farm</span> から離脱したかどうかを検出し、負荷の即時再分散をトリガーするために使用される通信パス。
  * **仮想 IP（<span class="notranslate farm-term" translate="no">farm</span> VIP）：** mirror クラスターとは異なり、<span class="notranslate farm-term" translate="no">farm</span> クラスターの仮想 IP アドレスはすべてのノード間で共有され、カーネルフィルタリングアルゴリズムがネットワークトラフィックを分散します。
  * **ロードバランシングルール：** 送信元 IP アドレスまたはポートに基づいてトラフィック分散ポリシーを定義します。
  * **チェッカー：** アプリケーションの正常性を監視し、プロセスの障害が検出された場合は自動再起動をトリガーします。


### SafeKit <span class="notranslate farm-term" translate="no">farm</span> クラスターを監視する方法 {#safekit-farm-cluster-monitoring}


![SafeKit Console: 2 ノード farm クラスターを監視。両方のノードが UP 状態で、アクティブな負荷分散が行われていることを示しています。](/wp-content/uploads/2026/01/safekit-farm-cluster-monitor.png "w:473")


<span class="notranslate farm-term" translate="no">Farm</span> クラスターを監視すると、インフラストラクチャの**アクティブ/アクティブな**性質を可視化できます。この性質では、すべてのノードがアプリケーションのパフォーマンスに貢献します（この例では 2 つのノードを示していますが、追加のノードに拡張可能です）：

  * **UP 状態 (2 ノードで 50%):** 正常な <span class="notranslate farm-term" translate="no">farm</span> では、両方のノードが「UP」(50%)状態にあり、共有仮想 IP を介してクライアント要求をアクティブに受信および処理していることを意味します。
  * **自動リバランス：** 1 つのノードに障害が発生した場合、コンソールには残りのノードがトラフィックの 100% を引き受けていることが視覚的に表示されます。生き残ったノードはすでにアクティブであるため、「フェイルオーバー」による遅延はありません（数秒の検出時間を除く）。
  * **ノード挿入：** 修復されたノードが再起動すると、「STOP」から「UP」に移行し、管理者の介入なしに自動的に負荷の一部を受信し始めます。
  * **データ同期なし：**<span class="notranslate farm-term" translate="no">farm</span> クラスターでは、ノードはステートレスであるか、バックエンドデータベースを共有することが想定されているため、オレンジ色の再同期状態はありません (バックエンドデータベースは mirror クラスターで個別に保護できます)。


単純なステータスアイコンに加えて、インターフェースは **`...` メニュー**を介してワンクリックノード管理を提供し、計画されたメンテナンスのためにノードを手動で停止または開始できます。その間、共有仮想 IP はユーザーアクティビティを中断することなくトラフィックを自動的に再分配します。

## Web コンソールで複数のモジュールと複数のクラスターを監視するにはどうすればよいですか？ {#multipe-modules-clusters}

### 単一クラスター内でのマルチモジュール可視化 {#safekit-multi-module}


![SafeKit Web Console: 同じ 2 ノードクラスターに 4 つの Hyper-V モジュールをデプロイ。](/wp-content/uploads/2026/05/safekit-hyperv-console-4.jpg "w:966")


単一の 2 ノードクラスターに**複数のモジュールを**デプロイする場合、SafeKit Web コンソールは各モジュールに**個別の監視ウィジェット**を提供します。これは、**SafeKit Hyper-V** ソリューションにとって特に価値があります。 

**例：** 4 台の保護対象 VM をセットアップした図：

  * コンソールは node1 に接続されており、は node2 と通信するためのプロキシとして機能します。
  * コンソールには **4 つのウィジェット**（VM ごとに 1 つ）が表示されます。
  * 各 VM は、その PRIM ノード上で実行され、その SECOND ノードにレプリケートされます。
  * 管理者は、各ノードでアクティブな VM をリアルタイムで確認できます。node1 では VM1 と VM2、node2 では VM3 と VM4 です。
  * 管理者は、**`...` メニュー**を使用して、あるノードから別のノードへ VM を簡単に移行できます。


このように詳細な可視性により、高密度環境であっても、すべてのレプリケートされたワークロードを完全に制御し、即座に把握することができます。 

### マルチクラスターの可視化 {#safekit-multi-cluster}


![SafeKit Web Console: 8 台のサーバーに 4 つのクラスターをデプロイ。](/wp-content/uploads/2026/05/safekit-console-north-south-east-west-801.jpg "w:966")


複数のサーバーに**複数のクラスターを**デプロイする場合、複数のブラウザータブを使用して各クラスターに接続するか、コンソールの PWA（プログレッシブ Web アプリ）機能を利用できます。PWA を使用すると、ブラウザのナビゲーションメニューが削除され、画面スペースが節約され、デスクトップ上のクラスター監視をより適切に整理できます。 

**例：** 図は、北、南、西、東に位置する 4 つのビデオ監視クラスターを監視する 4 つの PWA コンソールを示しています。

**注：** 単一のデスクトップに表示するにはクラスターが多すぎる場合、SafeKit は多数のクラスターにわたるエラーを検出するのに役立つ通知を提供します。 

## コンソールでアラートを監視し、メール通知を管理する方法 {#safekit-notifications-cluster}

### モジュールの状態変更や重大なイベントに関するインスタントアラートを受信するにはどうすればよいですか？ {#how-can-i-receive-instant-alerts-for-module-state-changes-and-critical-events}

SafeKit ウェブコンソールは、ネイティブブラウザの機能を活用して、モジュールの状態が変化するたびに**インスタント通知を**送信します。これにより、コンソールがバックグラウンドタブにある場合でも、重要なイベントがすぐに通知されます。

  * **セキュリティ：** 通知には **HTTPS** または localhost 経由でのアクセスが必要です。
  * **PWA 統合：** コンソールをプログレッシブウェブアプリ（PWA）としてデスクトップまたはモバイルにインストールし、ネイティブアプリのようなエクスペリエンスを実現します。
  * **モバイルアラート：** モバイルでは、PWA を介してのみ通知が利用可能で、HTTPS が必須となります。


このメカニズムは、重要なイベントについてユーザーに即座に警告し、クラスターの状態を迅速に認識させ、対応時間を短縮します。

### SafeKit ビデオ：スマートフォンでのコンソール操作 (0:54) {#demo-console}


### SafeKit で自動メールアラートを設定するにはどうすればよいですか？ {#how-can-i-set-up-automated-email-alerts-in-safekit}

SafeKit は、すべての**主要なクラスターイベントをシステムログに**自動的に記録するため、市場に出回っているあらゆる監視ツールとシームレスに統合できます。さらに、これらのログを監視し、重要なアラートを直接受信トレイに配信するように設計された専用の**メール通知エージェント**も含まれています。これにより、ウェブコンソールが積極的に監視されていない場合でも、関係者は常に情報を把握できます。 

  * **スマートグルーピング：** ノイズを減らすため、エージェントは短期間に発生したイベントを 1 つの要約メールにまとめます。
  * **フルカバレッジ：** エージェントはすべてのノードにインストールされ、有効にするには SMTP の詳細を明示的に設定する必要があります。
  * **カスタマイズ可能な受信者：** 特定の IT チームや管理者のエイリアスに直接アラートを送信し、迅速な対応を保証します。


SafeKit は、リアルタイムの PWA アラートとインテリジェントなメールグループ化を組み合わせることで、ミッションクリティカルな運用に対応する多層的な通知戦略を提供します。

### SafeKit ビデオ：フェイルオーバー時のメール通知 (1:04) {#demo-notifications}



{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}