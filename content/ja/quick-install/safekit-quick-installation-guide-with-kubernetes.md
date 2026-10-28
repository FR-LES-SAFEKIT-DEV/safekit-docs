---
title: "SafeKitを使用したK3Sの高可用性：フェイルオーバーのためにk3s.safeモジュールをインストールしてください"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-kubernetes/"
description: "SafeKitにk3s.safeモジュールをデプロイして、 Linux上でKubernetesの同期リアルタイムレプリケーションと自動フェイルオーバーを有効にします。このガイドでは、共有ストレージを使用せずに、重要なLinuxアプリケーション用の 2 ノード SAN レス クラスタをセットアップする手順を説明します。"
category: "quick-install"
lang: "ja"
topics: "Kubernetesの高可用性クイックインストールガイド、 SafeKitの高可用性制限、 SafeKit / Kubernetesソリューションの概要、 Linux ( k3s.safe ) 上でのSafeKit / Kubernetesソリューションのインストールと構成、クラスタでネットワークが分離した場合のさまざまなシナリオとは？、 SafeKit mirrorソリューションのデモンストレーション、🔍 SafeKit高可用性ナビゲーションハブ"
---

# SafeKitを使用した K3S 高可用性:フェイルオーバー用にk3s.safeモジュールをインストールします {#k3s-high-availability-with-safekit-install-the-k3ssafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="Kubernetes" mod="k3s"  %}}
 

## SafeKit / Kubernetesソリューションの概要 {#overview-of-the-safekit--kubernetes-solution}

解決策はここに記載されています: ** 💡 [ Kubernetes K3s 高可用性: 2ノード同期レプリケーションとフェイルオーバー](</ja/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/>) **

## SafeKit / KubernetesソリューションをLinux ( k3s.safe )にインストールおよび構成する {#installation-and-configuration-of-the-safekit--kubernetes-solution-on-linux-k3ssafe}

### 1. パッケージをダウンロードします {#1-download-packages}

  * LinuxからSafeKit 8.2 の無料版をダウンロードしてください (safekitlinux_xx.bin)
  * k3s.safe Linuxモジュールをダウンロードしてください。
  * k3sconfig.shスクリプトをダウンロードしてください
  * ドキュメント（pptx形式）


注： k3sconfig.shスクリプトは、2 台のLinux Ubuntu 24.04 ノードに K3S、 MariaDB 、NFS、 SafeKitをインストールします。

[をダウンロードSafeKit ( Linux ) > ](</ja/resources/safekit-free-trial/>)

<a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s.safe" download="k3s.safe">をダウンロードk3s.safe ( Linux ) > </a> 

[をダウンロードk3sconfig.sh > ](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3sconfig.sh>)

[ドキュメント (pdf) > ](</wp-content/uploads/documents/safekit-k3s-en.pdf>)

### 2. 両方のノードで最初に {#2-first-on-both-nodes}

2台のLinux Ubuntu 24.04ノードで、rootユーザーとして：

  * ノードがインターネットにアクセスできることを確認してください（プロキシ経由でも構いません）。
  * k3sconfig.sh 、 k3s.safe 、およびsafekit_xx.binパッケージをディレクトリにコピーし、そのディレクトリに移動します。
  * .bin ファイルの名前を「safekit.bin」に変更してください。
  * k3sconfig.shとsafekit.binが実行可能であることを確認してください。
  * k3sconfig.shスクリプトを編集し、環境に合わせて環境変数をカスタマイズしてください（仮想IPアドレスを含む）。
  * 両方のノードで実行: `./k3sconfig.sh prereq`


スクリプトは以下のとおりです。

  * 必要な Debian パッケージをインストールします: alien、nfs-kernel-server、nfs-common、mariadb-server
  * MariaDBの安全なインストール
  * ファイル複製用のディレクトリを作成する
  * レプリケートされたディレクトリを共有するためのNFSサーバーの準備
  * SafeKitをインストール


### 3. 最初のノードで {#3-on-the-first-node}

最初のノードで実行: `./k3sconfig.sh first`

スクリプトは以下のとおりです。

  * K3S構成データベースとk3sユーザーを作成します。
  * レプリケートされたストレージボリュームファイル（スパースファイル）を作成し、それをxfsファイルシステムとしてフォーマットします。
  * SafeKitクラスタ構成を作成し、適用する
  * クラスターにk3s.safeモジュールをインストールして構成します。
  * 最初のノードでk3sモジュールを「prim」として起動します。
  * k3sをダウンロード、インストール、起動する
  * nfs-subdir-external-provisioner Helmチャートをダウンロードしてインストールします。
  * K3Sトークンを表示する（第2ノードインストールフェーズで使用）


### 4. 2番目のノードで {#4-on-the-second-node}

2番目のノードで実行: `./k3sconfig.sh second <token>`

  * <token>は、最初のノードでの「 k3sconfig.sh first」実行の最後に表示される文字列です。


スクリプトは以下のとおりです。

  * 最初のノードでk3sモジュールがプリムとして起動されていることを確認してください。
  * 2番目のノードにk3sをインストールします。
  * k3sモジュールを起動します


### 5. k3s SafeKitモジュールが両方のノードで実行されていることを確認します。 {#5-check-that-the-k3s-safekit-module-is-running-on-both-nodes}

両方のノードでこのコマンドを確認してください: `/opt/safekit/safekit –H "*" state`

返信は画像と同様の内容にしてください。
    
    
    /opt/safekit/safekit –H " * " 状態
    ---------------- サーバー= http://10.0.0.20:9010 ----------------
    管理者アクション=実行
    --------------------- k3s の状態 ---------------------
    
      ローカル (127.0.0.1) : PRIM (サービス: 利用可能)(色: 緑)
    成功
    ---------------- サーバー= http://10.0.0.21:9010 ----------------
    管理者アクション=実行
    --------------------- k3s の状態 ---------------------
    
      ローカル (127.0.0.1) : セカンド (サービス: 利用可能) (色: 緑)
    成功
    

### 6. SafeKit Webコンソールを起動して、クラスタを管理します。 {#6-start-the-safekit-web-console-to-administer-the-cluster}

  * ブラウザをSafeKitウェブコンソールURL `http://server0-IP:9010`に接続します。
  * 画像のようなページが表示されるはずです。
  * Linuxコマンドラインを使用して、K3S が両方のノード ( `start_prim`と`start_second`で起動) で起動されていること、およびMariaDBプライマリノード ( `start_prim`で起動) で起動されていることを確認してください。


![ KubernetesクラスターがSafeKit Web コンソール](/wp-content/uploads/2024/03/14-monitoring-prim-second.png)で起動しました


### 7.テスト {#7-testing}

  * PRIMノードを停止するには、コンテキストメニューをスクロールダウンして`Stop`をクリックします。
  * 2番目のノードでフェイルオーバーが発生し、そのノードが単独状態（緑色）になることを確認してください。
  * コマンドラインがオンになっている場合 Linuxサービスのフェイルオーバーを確認します（ノード 1 で停止しています） `stop_prim` スクリプトはノード 2 で開始されました。 `start_prim` スクリプト）。 MariaDB K3Sはnode2上で動作する必要があります。


![警告](/wp-content/uploads/2022/07/warning-small.png)


ノード2でALONE（緑色）に到達しない場合は、ノード2のモジュールログを使用してその理由を分析してください。

  * モジュールログを表示するには、 `node2`をクリックしてください。
  * [例 SQL Server モジュールログ](</wp-content/uploads/2024/03/24-module-log-script.png>) サービス名が `start_prim` 無効です。 sqlserver.exe プロセスは監視されますが、開始されないため、最後にモジュールは停止します。


![警告](/wp-content/uploads/2022/07/warning-small.png)


全て問題がなければ、node1で起動を開始し、node2から複製されたディレクトリを再同期します。

問題が発生した場合は、node2 を停止し、 [で node1 ](</wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png>)プライマリとして強制的に起動します。これにより、停止時のローカルで正常なデータを使用して再起動します。


![注記](/wp-content/uploads/2022/07/note.png)


🛠️ [テストに関する詳細はユーザーガイドをご覧ください](</ja/resources/safekit-user-guide-82/#tests>)


![ PRIMサーバー上のモジュールを停止します](/wp-content/uploads/2024/03/16-monitoring-prim-second-stop.png)


### 8. WordPressのようなKubernetesアプリケーションでクラスターを試してください。 {#8-try-the-cluster-with-a-kubernetes-application-like-wordpress}

画像にはWordPressのインストール例が示されています。これは、Podによって実装されたバックエンドデータベースを備えたWebポータルです。

同様の方法で、独自のアプリケーションをデプロイすることもできます。

WordPressは自動的に高可用性を実現します。

  * そのデータ（php + データベース）は、 SafeKitによってリアルタイムで複製される永続ボリュームに格納されています。
  * ユーザーがWordPressサイトにアクセスするための仮想IPアドレス
  * 自動フェイルオーバーと自動フェイルバック機能付き


注：

  * WordPressチャートは、 <service.port>ポートと<service.httpsport>ポートでリッスンするロードバランシングされたサービスを定義します。
  * WordPressには以下のURLからアクセスできます： `http://<virtual-ip>:<service.port>.`
  * 仮想IPアドレスはSafeKitによって管理され、フェイルオーバー時には自動的に切り替わります。
  * デフォルトでは、K3SはKlipperを使用してロードバランサーを実装します。
  * Klipperは<virtual ip> : <service.port>でリッスンし、TCP/IPパケットを選択したWordPressポッドのIPアドレスとポートにルーティングします。


    
    
    $ export KUBECONFIG= /etc/rancher/k3s/k3s.yaml
    $ helm repo add bitnami https://charts.bitnami.com/bitnami
    $ helm install my-release bitnami/wordpress --set global.storageClass=nfs-client --set service.ports.http=8099,service.ports.https=4439
    

前のhelmコマンドはWordPressイメージをダウンロードするはずです `registry-1.docker.io`認証の問題が発生する場合があります `registry-1.docker.io`この場合は、以下の手順に従ってください。

  * 両方のノードに内部に`/etc/rancher/k3s/registries.yaml`を作成します。 
        
        設定:
          「registry-1.docker.io」
            認証:
              ユーザー名: あなたのユーザー名
              パスワード: あなたのパスワード
            tls:
              insecure_skip_verify: true
        

  * `systemctl stop k3s`と`systemctl start k3s`を使用して、k3s を停止して開始し、それを考慮に入れます。
  * `helm registry login -u your_user_name docker.io`を実行し、パスワードを入力してください。


### 9.をサポートする {#9-support}

  * サポートを受けるには、 SafeKit `Snapshots` （2つの.zipファイル）を、各ノードごとに1つずつ用意してください。


![注記](/wp-content/uploads/2022/07/note.png)


🛠️ [トラブルシューティングについては、ユーザーガイドをご覧ください](</ja/resources/safekit-user-guide-82/#Troubleshooting>)


![サポートのためにスナップショットを撮ってください](/wp-content/uploads/2024/03/30-snapshots-mirror.png)


### 10. 必要に応じて、スプリットブレインチェッカーを設定します。 {#10-if-necessary-configure-a-splitbrain-checker}

  * スプリットブレインチェッカーを設定する必要があるかどうかを知るには、以下の[ 「クラスタでネットワークが分離した場合のさまざまなシナリオは何ですか？」 ](#isolation)を参照してください。
  * モジュール設定で、 `Advanced Configuration` （画像参照）をクリックして、 `userconfig.xml`編集します。
  * `userconfig.xml`の`<check>`セクションに以下を追加して、スプリットブレインチェッカーを宣言します。 
        
        <service>
         ...
         <check>
          ...
          <splitbrain ident="witness" exec="ping" arg="witness IP"/>
         </check>
        

  * `Save and apply`変更されたuserconfig.xmlファイルを両方のノードに再デプロイするための新しい構成です (保存して適用するには、両方のノードでモジュールを停止する必要があります)。


**パラメータ** :

  * `ident="witness"` 、リソース名`splitbrain.witness`を持つウィットネスを識別します。この値を変更することで、ウィットネスを識別することができます。
  * `exec="ping"`は実行するpingコードを参照します。この値を変更しないでください。
  * `arg="witness IP"`はpingの引数です。この値を、監視対象（通常はルーターなどの堅牢な機器）のIPアドレスに変更してください。


![パラメータ](/wp-content/uploads/2024/03/05-module-mirror-edit-config.png)を入力してください



{{%  insert-safekit-network-isolation-ja  %}}
 

## SafeKit mirrorのソリューションのデモンストレーション {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}