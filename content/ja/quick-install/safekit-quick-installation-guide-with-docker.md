---
title: "SafeKit による Docker 高可用性：フェイルオーバー用の mirror.safe モジュールをインストールする"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-docker/"
description: "SafeKit は用の mirror.safe モジュールをデプロイして、Linux 上の Docker コンテナの同期リアルタイムレプリケーションと自動フェイルオーバーを有効にします。このガイドでは、共有ストレージなしでクリティカルアプリケーション用の 2 ノードシェアードナッシングクラスターをセットアップする手順を説明します。"
category: "quick-install"
lang: "ja"
topics: "Docker 向け高可用性クイックインストールガイド、SafeKit High Availability の制限事項、SafeKit/Docker ソリューションの概要、Linux への SafeKit/Docker ソリューションのインストール (mirror.safe)、SafeKit/Docker ソリューションのステップバイステップ設定、SafeKit mirror ソリューションのデモンストレーション、🔍 SafeKit を探索する"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# SafeKit による Docker 高可用性：フェイルオーバー用の mirror.safe モジュールをインストールする {#docker-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="Docker" mod="mirror"  %}}
 

## SafeKit/Docker ソリューションの概要 {#overview-of-the-safekit--docker-solution}

ソリューションについては、こちらで説明しています。** 💡 [SafeKit : Docker 高可用性 & リアルタイムデータレプリケーションソフトウェア](</ja/solutions/docker-container-high-availability-cluster-synchronous-replication-failover/>)  
**。

## Linux への SafeKit/Docker ソリューションのインストール (mirror.safe) {#installation-of-the-safekit--docker-solution-on-linux-mirrorsafe}

### 前提条件 {#prerequisites}

  * SafeKit で再起動する Docker アプリケーションを、2 つのノード（仮想マシンまたは物理サーバー）にインストールする必要があります。



{{%  insert-safekit-installation-package-linux-ja app="" mod="mirror"  %}}
 

### Docker Compose アプリケーションの例 1 {#example-1-with-a-docker-compose-application}

Docker Compose アプリケーションでは、アプリケーションとそのすべてのコンテナを記述する **docker-compose.yml** ファイルを使用します。

  * まず、両方のサーバーで、docker compose アプリケーションを起動せずにインストールします：**docker-compose -f docker-compose.yml up --no-start**
  * 1 つのサーバーで、docker-compose.yml の各ボリュームに対して、次のコマンドを実行します：**docker volume inspect volume_name**  
**Docker ボリュームのホストディレクトリを**返します（これらのパスは docker-compose.yml には指定されていません）。  
パスのリストは **/var/lib/docker/volumes/ <volume_name> /_data** のように表示されます
  * **ステップバイステップの設定**セクションに移動し、 
    * **mirror.safe** モジュールをデプロイする
    * 障害発生時に切り替わる**仮想 IP アドレス**を設定します
    * **/var/lib/docker/volumes/ <volume_name> /_data** のリストを**レプリケートディレクトリ**として設定します
    * それぞれ start_prim および stop_prim スクリプトに以下を記述します。**/usr/local/bin/docker-compose-f docker-compose.yml --no-ansi start** および **/usr/local/bin/docker-compose-f docker-compose.yml --no-ansi stop**


### Docker アプリケーションで一連のコンテナを起動する例 2 {#example-2-with-a-docker-application-starting-a-set-of-containers}

ここでは、一連のコンテナを起動する Docker アプリケーション **「myappli」を**想定します。

  * まず、両方のサーバーに **myappli** をインストールします。起動はしないでください
  * あるサーバーで、myapply が使用しているボリュームを一覧表示します。ls **/var/lib/docker/volumes**  
これにより、**/var/lib/docker/volumes/ <volume_name> /_data** のようなパスのリストが得られます
  * **ステップバイステップの設定**セクションに移動し、 
    * **mirror.safe** モジュールをデプロイする
    * 障害発生時に切り替わる**仮想 IP アドレス**を設定します
    * **/var/lib/docker/volumes/ <volume_name> /_data** のリストを**レプリケートディレクトリ**として設定します
    * それぞれ start_prim および stop_prim スクリプトに **/.../myappli start** および **/.../myappli stop を**記述します


### シンプルな Docker イメージを使用した例 3 {#example-3-with-a-simple-docker-image}

この構成は、nginx Docker イメージ（Web サーバー）の例で示されています。

  * Docker ボリュームの作成  
両方のサーバーで、同じ名前の Docker ボリュームを作成します：**docker volume create replicated_vol**  
ボリュームがホスト上のどこに保存されているかのディレクトリパスを取得します：**docker volume inspect replicated_vol**  
（例：**/var/lib/docker/storage/replicated_vol/_data**）
  * Docker コンテナの作成  
両方のサーバーで、前のボリュームにバインドする nginx docker コンテナを作成します：**docker container create --name mynginx -v replicated_vol:/usr/share/nginx/html -p 9011:80 nginx**  
ボリュームに index.html ファイルを配置します：**docker cp index.html mynginx:/usr/share/nginx/html/index.html**
  * **ステップバイステップの設定**セクションに移動し、 
    * **mirror.safe** モジュールをデプロイする
    * 障害発生時に切り替わる**仮想 IP アドレス**を設定します
    * **/var/lib/docker/storage/replicated_vol/_data** レプリケートディレクトリとして設定します
    * それぞれ start_prim と stop_prim のスクリプトに、**`docker start mynginx`** と **`docker stop mynginx`** を記述します
    * SafeKit は設定後、**http://vitual-ip:9011** で index.html へのアクセスをテストします


## SafeKit/Docker ソリューションのステップバイステップ設定 {#step-by-step-configuration-of-the-safekit--docker-solution}


{{%  insert-safekit-82-configuration-ja app="Docker" mod="mirror"  %}}
 

## SafeKit mirror ソリューションのデモンストレーション {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}