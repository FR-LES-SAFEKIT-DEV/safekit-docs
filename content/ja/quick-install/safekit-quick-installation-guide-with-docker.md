---
title: "DockerとSafeKitによる高可用性：フェイルオーバーのためにmirror.safeモジュールをインストールしてください"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-docker/"
description: "SafeKitにmirror.safeモジュールをデプロイして、 Linux上でDockerコンテナの同期リアルタイムレプリケーションと自動フェイルオーバーを有効にします。このガイドでは、共有ストレージを使用しない重要なアプリケーション向けに、2 ノードの共有なしクラスタをセットアップする手順を説明します。"
category: "quick-install"
lang: "ja"
topics: "Dockerの高可用性クイックインストールガイド、 SafeKitの高可用性制限、 SafeKit / Dockerソリューションの概要、 Linux ( mirror.safe ) へのSafeKit / Dockerソリューションのインストール、 SafeKit / Dockerソリューションのステップバイステップ構成、 SafeKit mirrorソリューションのデモ、🔍 SafeKit高可用性ナビゲーションハブ"
---

# Docker高可用性とSafeKit : フェイルオーバーのためにmirror.safeモジュールをインストールしてください {#docker-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="Docker" mod="mirror"  %}}
 

## SafeKit / Dockerソリューションの概要 {#overview-of-the-safekit--docker-solution}

ソリューションの説明はこちらです: ** 💡 [ SafeKit : Docker高可用性およびリアルタイムデータレプリケーションソフトウェア](</ja/solutions/docker-container-high-availability-cluster-synchronous-replication-failover/>)  
**.

## SafeKit / DockerソリューションをLinux ( mirror.safe )にインストールします。 {#installation-of-the-safekit--docker-solution-on-linux-mirrorsafe}

### 前提条件 {#prerequisites}

  * SafeKitで再起動したいDockerアプリケーションが、2つのノード（仮想マシンまたは物理サーバー）にインストールされている必要があります。



{{%  insert-safekit-installation-package-linux-ja app="" mod="mirror"  %}}
 

### 例1： Docker構成アプリケーション {#example-1-with-a-docker-compose-application}

Docker構成アプリケーションでは、アプリケーションとそのすべてのコンテナを記述する**docker-compose.yml**ファイルがあります。

  * まず、両方のサーバーで、docker composeアプリケーションを起動せずにインストールします: **docker-compose -f docker-compose.yml up --no-start**
  * 1台のサーバーで、 docker-compose.yml内の各ボリュームに対して、次のコマンドを実行します: **docker volume inspect volume_name**  
**host directories of the docker volumes**が返されます (これらのパスはdocker-compose.ymlには記載されていません)。  
**/var/lib/docker/volumes/ <volume_name>/_data**のようなパスのリストが取得されます
  * **ステップバイステップ構成**セクションに移動して、 
    * **mirror.safe**モジュールをデプロイする
    * 障害発生時に切り替えられる仮想IPアドレス** **を設定します。
    * **/var/lib/docker/volumes/ <volume_name>/_data**のリストを**複製ディレクトリ**に設定します
    * start_primおよびstop_primスクリプトにそれぞれ**/usr/local/bin/docker-compose -f docker-compose.yml --no-ansi start**および**/usr/local/bin/docker-compose -f docker-compose.yml --no-ansi stop**を配置します。


### 例2では、 Dockerアプリケーションがコンテナセットを起動します。 {#example-2-with-a-docker-application-starting-a-set-of-containers}

ここでは、 Dockerアプリケーション** myappli **がコンテナのセットを起動すると仮定します。

  * まず、両方のサーバーで、 ** myappli **起動せずにインストールします。
  * あるサーバー上で、 myapplyが使用しているボリュームの一覧を表示します: **ls /var/lib/docker/volumes**  
したがって、 **/var/lib/docker/volumes/ <volume_name>/_data**のようなパスのリストが得られます。
  * **ステップバイステップ構成**セクションに移動して、 
    * **mirror.safe**モジュールをデプロイする
    * 障害発生時に切り替えられる仮想IPアドレス** **を設定します。
    * **/var/lib/docker/volumes/ <volume_name>/_data**のリストを**複製ディレクトリ**に設定します
    * start_primおよびstop_primスクリプトにそれぞれ以下を記述します: ** /.../myappli開始**および** /.../myappli停止**


### 単純なDockerイメージを使用した例3 {#example-3-with-a-simple-docker-image}

設定は、 nginx Dockerイメージ（Webサーバー）を例として示します。

  * Dockerボリューム作成  
両方のサーバーで、同じ名前のDockerボリュームを作成します： **docker volume create replicated_vol**  
ホスト上でボリュームが保存されているディレクトリパスを取得します: **docker volume inspect replicated_vol**  
（例： **/var/lib/docker/storage/replicated_vol/_data** ）
  * Dockerコンテナの作成  
両方のサーバーで、前のボリューム**docker container create --name mynginx -v replicated_vol:/usr/share/nginx/html -p 9011:80 nginx**にバインドするnginxの Docker コンテナを作成します。  
ボリュームにindex.htmlファイルをいくつか配置します: **docker cp index.html mynginx:/usr/share/nginx/html/index.html**
  * **ステップバイステップ構成**セクションに移動して、 
    * **mirror.safe**モジュールをデプロイする
    * 障害発生時に切り替えられる仮想IPアドレス** **を設定します。
    * **/var/lib/docker/storage/replicated_vol/_data**レプリケートされたディレクトリとして設定する
    * start_primおよびstop_primスクリプトにそれぞれ**docker start mynginx**および**docker stop mynginx**を配置します。
    * SafeKit設定後、 **とhttp://vitual-ip:9011**を使用してindex.htmlへのアクセスをテストします。


## SafeKit / Dockerソリューションの段階的な構成 {#step-by-step-configuration-of-the-safekit--docker-solution}


{{%  insert-safekit-82-configuration-ja app="Docker" mod="mirror"  %}}
 

## SafeKit mirrorのソリューションのデモンストレーション {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}