---
title: "SafeKit による K3S 高可用性：フェイルオーバー用の k3s.safe モジュールをインストールする"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-kubernetes/"
description: "SafeKit は用の k3s.safe モジュールをデプロイして、Linux 上の Kubernetes の同期リアルタイムレプリケーションと自動フェイルオーバーを有効にします。このガイドでは、共有ストレージなしで、重要な Linux アプリケーション向けに 2 ノードの SANless クラスターをセットアップする手順を説明します。"
category: "quick-install"
lang: "ja"
topics: "Kubernetes 向け高可用性クイックインストールガイド、SafeKit High Availability の制限事項、SafeKit/Kubernetes ソリューションの概要、Linux (k3s.safe) への SafeKit/Kubernetes ソリューションのインストールと設定、クラスターでネットワークが分離された場合、どのようなシナリオが考えられますか？、SafeKit mirror ソリューションのデモンストレーション、🔍 SafeKit を探索する"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# SafeKit による K3S 高可用性：フェイルオーバー用の k3s.safe モジュールをインストールする {#k3s-high-availability-with-safekit-install-the-k3ssafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="Kubernetes" mod="k3s"  %}}
 

## SafeKit/Kubernetes ソリューションの概要 {#overview-of-the-safekit--kubernetes-solution}

解決策はこちらで説明されています：**💡 [Kubernetes K3s 高可用性：2 ノード同期レプリケーションとフェイルオーバー](</ja/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/>)**

## Linux (k3s.safe) への SafeKit/Kubernetes ソリューションのインストールと設定 {#installation-and-configuration-of-the-safekit--kubernetes-solution-on-linux-k3ssafe}

### 1. パッケージをダウンロードする {#1-download-packages}

  * SafeKit 8.2 の無料版を Linux にダウンロード（safekitlinux_xx.bin）
  * k3s.safe Linux モジュールをダウンロードする
  * k3sconfig.sh スクリプトをダウンロードします
  * ドキュメント (pptx)


注：k3sconfig.sh スクリプトは、2 つの Linux Ubuntu 24.04 ノードに K3S、MariaDB、NFS、SafeKit をインストールします。

[SafeKit (Linux) をダウンロード >](</ja/resources/safekit-free-trial/>)

<a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s.safe" download="k3s.safe">k3s.safe (Linux) をダウンロード ></a> 

[k3sconfig.sh をダウンロード >](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3sconfig.sh>)

[ドキュメント (PDF) >](</wp-content/uploads/documents/safekit-k3s-en.pdf>)

### 2. 両方のノードで最初に {#2-first-on-both-nodes}

2 台の Linux Ubuntu 24.04 ノードで、root として次の操作を実行します

  * ノードがインターネットにアクセスできることを確認してください（プロキシ経由でも可）
  * k3sconfig.sh、k3s.safe、および safekit_xx.bin パッケージをディレクトリにコピーし、そのディレクトリに cd します
  * .bin ファイルを「safekit.bin」に名前変更します
  * k3sconfig.sh と safekit.bin が実行可能であることを確認してください。
  * k3sconfig.sh スクリプトを編集し、環境に合わせて環境変数 (仮想 IP を含む) をカスタマイズします
  * 両方のノードで以下を実行します：`./k3sconfig.sh prereq`


このスクリプトは、以下の処理を行います

  * 必要な Debian パッケージをインストールします：alien, nfs-kernel-server, nfs-common, mariadb-server
  * MariaDB の安全なインストール
  * ファイルレプリケーション用のディレクトリを作成する
  * レプリケートされたディレクトリを共有するための NFS サーバーを準備する
  * SafeKit をインストールする


### 3. 最初のノードで {#3-on-the-first-node}

最初のノードで実行します：`./k3sconfig.sh first`

このスクリプトは、以下の処理を行います

  * K3S 構成データベースと k3s ユーザーを作成する
  * レプリケートされたストレージボリュームファイル（スパースファイル）を作成し、xfs ファイルシステムとしてフォーマットします
  * safekit クラスターの構成を作成して適用します
  * k3s.safe モジュールをクラスターにインストールして設定する
  * 最初のノードで k3s モジュールを "prim" として起動します
  * k3s をダウンロード、インストール、起動する
  * nfs-subdir-external-provisioner Helm チャートをダウンロードしてインストールします
  * K3S トークンを表示（2 番目のノードのインストールフェーズで使用）


### 4. 2 番目のノードで {#4-on-the-second-node}

2 番目のノードで実行します：`./k3sconfig.sh second <token>`

  * <token> は、最初のノードで「k3sconfig.sh first」を実行した最後に表示される文字列です


このスクリプトは、以下の処理を行います

  * 最初のノードで k3s モジュールが prim として起動していることを確認してください
  * 2 番目のノードに k3s をインストールします
  * k3s モジュールを起動します


### 5. 両方のノードで k3s SafeKit モジュールが実行されていることを確認します {#5-check-that-the-k3s-safekit-module-is-running-on-both-nodes}

両方のノードでこのコマンドで確認します：`/opt/safekit/safekit –H "*" state`

返信は画像に似せてください。
    
    
    /opt/safekit/safekit –H "*" state
    ---------------- サーバー = http://10.0.0.20:9010 ----------------
    admin アクション=実行
    --------------------- k3s の状態 ---------------------
    
      ローカル (127.0.0.1) : PRIM (サービス : 利用可能)(色 : 緑)
    成功
    ---------------- サーバー = http://10.0.0.21:9010 ----------------
    admin アクション=実行
    --------------------- k3s の状態 ---------------------
    
      ローカル (127.0.0.1) : SECOND (サービス : 利用可能) (色 : 緑)
    成功
    

### 6. SafeKit ウェブコンソールを起動して、クラスターを管理します {#6-start-the-safekit-web-console-to-administer-the-cluster}

  * ブラウザを SafeKit ウェブコンソールの URL `http://server0-IP:9010` に接続します。
  * 画像のようなページが表示されます。
  * Linux コマンドラインで、両方のノードで K3S が起動していること（`start_prim` と `start_second` で起動）、およびプライマリノードで MariaDB 起動していること（`start_prim` で起動）を確認します。


![SafeKit ウェブコンソールで Kubernetes クラスターが起動しました](/wp-content/uploads/2024/03/14-monitoring-prim-second.png)


### 7. テスト {#7-testing}

  * PRIM ノードのコンテキストメニューを下にスクロールして、`Stop` をクリックして停止します。
  * SECOND ノードでフェイルオーバーが発生し、ALONE（緑色）になっていることを確認します。
  * そして、Linux のコマンドラインで、サービスのフェイルオーバーを確認します (`stop_prim` スクリプトでノード 1 で停止し、`start_prim` スクリプトでノード 2 で開始します)。と K3S MariaDB node2 で実行される必要があります。


![警告](/wp-content/uploads/2022/07/warning-small.png)


node2 で ALONE（緑）に到達しない場合は、ノード 2 のモジュールログで原因を分析してください。

  * `node2` をクリックして、モジュールログを表示します。
  * `start_prim` のサービス名が無効な[SQL Server モジュールログの例です](</wp-content/uploads/2024/03/24-module-log-script.png>)sqlserver.exe プロセスは監視されますが、起動されていないため、最終的にモジュールは停止します。


![警告](/wp-content/uploads/2022/07/warning-small.png)


すべて問題なければ、node1 で開始すると、node2 からレプリケートされたディレクトリが再同期されます。

問題が発生した場合は、node2 停止し、node1 を[プライマリとして強制的に起動します](</wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png>)。これにより、停止時のローカルに正常なデータで再起動されます。


![注](/wp-content/uploads/2022/07/note.png)


🛠️ [テストに関する詳細は、ユーザーガイドをご覧ください。](</ja/resources/safekit-user-guide-82/#tests>)


![PRIM サーバー上のモジュールを停止します](/wp-content/uploads/2024/03/16-monitoring-prim-second-stop.png)


### 8. WordPress などの Kubernetes アプリケーションでクラスターを試す {#8-try-the-cluster-with-a-kubernetes-application-like-wordpress}

画像には WordPress のインストール例が示されています。これは、ポッドによって実装されたバックエンドデータベースを持つウェブポータルです。

同様に、ご自身のアプリケーションもデプロイできます。

WordPress は自動的に高可用性を備えています

  * SafeKit によってリアルタイムでレプリケートされる永続ボリューム内のデータ（PHP + データベース）
  * ユーザーが WordPress サイトにアクセスするための仮想 IP アドレス
  * 自動フェイルオーバーと自動フェイルバック付き


備考：

  * WordPress チャートは、ポート <service.port> と <service.httpsport> でリッスンするロードバランシングされたサービスを定義します。
  * WordPress は、URL `http://<virtual-ip>:<service.port>.`
  * 仮想 IP は SafeKit によって管理され、フェイルオーバー時には自動的に切り替わります。
  * デフォルトでは、K3S Klipper でロードバランサーを実装します。
  * Klipper は <virtual ip> : <service.port> でリッスンし、TCP/IP パケットを選択した WordPress ポッドの IP アドレスとポートにルーティングします。


    
    
    $ export KUBECONFIG= /etc/rancher/k3s/k3s.yaml
    $ helm repo add bitnami https://charts.bitnami.com/bitnami
    $ helm install my-release bitnami/wordpress --set global.storageClass=nfs-client --set service.ports.http=8099,service.ports.https=4439
    

前の helm コマンドは、`registry-1.docker.io`。から WordPress イメージをダウンロードします。registry `registry-1.docker.io` で認証の問題が発生する場合があります。この場合、次の手順を実行します

  * 両方のノードに `/etc/rancher/k3s/registries.yaml` を作成し、以下を記述します 
        
        configs:
          "registry-1.docker.io":
            auth:
              username: your_user_name
              password: your_password
            tls:
              insecure_skip_verify: true
        

  * `k3s` を停止して開始し、`systemctl stop k3s` と `systemctl start k3s` で変更を反映させます。
  * `helm registry login -u your_user_name docker.io` 実行し、パスワードを入力します


### 9. サポート {#9-support}

  * サポートを受けるには、ノードごとに 1 つずつ、合計 2 つの SafeKit `Snapshots`（2 つの .zip ファイル）を取得してください。


![注](/wp-content/uploads/2022/07/note.png)


🛠️ [ユーザーガイドのトラブルシューティング](</ja/resources/safekit-user-guide-82/#Troubleshooting>)


![サポートのためにスナップショットを撮る](/wp-content/uploads/2024/03/30-snapshots-mirror.png)


### 10. 必要に応じて、スプリットブレインチェッカー {#10-if-necessary-configure-a-splitbrain-checker}

  * スプリットブレインチェッカーブレインチェッカーを設定する必要があるかどうかについては、以下の[「クラスターでネットワークが分離された場合のさまざまなシナリオ」を](#isolation)参照してください。
  * モジュール構成で、`Advanced Configuration` (画像参照) をクリックして `userconfig.xml`。編集します。
  * `userconfig.xml` の `<check>` セクションに<splitbrain>を追加して、スプリットブレインチェッカーチェッカーを宣言します 
        
        <service>
         ...
         <check>
          ...
          <splitbrain ident="witness" exec="ping" arg="witness IP"/>
         </check>
        

  * 新しい構成 `Save and apply` 変更された userconfig.xml ファイルを両方のノードに再デプロイします（保存して適用するには、両方のノードでモジュールを停止する必要があります）。


**パラメータ**：

  * `ident="witness"` リソース名 `splitbrain.witness` でウィットネスを識別します。この値を変更してウィットネスを識別することもできます。
  * `exec="ping"` は、実行する ping コードを参照します。この値を変更しないでください。
  * `arg="witness IP"` は、ping の引数です。この値を、ウィットネス (通常はルーターなどの堅牢な要素) の IP に変更します。


![パラメータを入力してください](/wp-content/uploads/2024/03/05-module-mirror-edit-config.png)



{{%  insert-safekit-network-isolation-ja  %}}
 

## SafeKit mirror ソリューションのデモンストレーション {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}