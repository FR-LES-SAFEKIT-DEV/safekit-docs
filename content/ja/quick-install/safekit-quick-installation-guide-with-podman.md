---
title: "SafeKit による Podman 高可用性：フェイルオーバー用の mirror.safe モジュールをインストールする"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-podman/"
description: "SafeKit は用の mirror.safe モジュールをデプロイして、Linux 上の Podman コンテナの同期リアルタイムレプリケーションと自動フェイルオーバーを有効にします。このガイドでは、共有ストレージなしで重要なアプリケーション向けに 2 ノードの SANless クラスターをセットアップする手順を説明します。"
category: "quick-install"
lang: "ja"
topics: "Podman 高可用性クイックインストールガイド、SafeKit High Availability の制限事項、SafeKit/Podman ソリューションの概要、Linux への SafeKit/Podman ソリューションのインストール (mirror.safe)、SafeKit/Podman ソリューションのステップバイステップ設定、SafeKit mirror ソリューションのデモンストレーション、🔍 SafeKit を探索する"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# SafeKit による Podman 高可用性：フェイルオーバー用の mirror.safe モジュールをインストールする {#podman-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="Podman" mod="mirror"  %}}
 

## SafeKit/Podman ソリューションの概要 {#overview-of-the-safekit--podman-solution}

解決策はこちらで説明されています：**💡 [SafeKit : Podman 高可用性 & リアルタイムデータレプリケーションソフトウェア](</ja/solutions/podman-the-simplest-high-availability-cluster-between-two-redundant-servers/>)**。

## Linux への SafeKit/Podman ソリューションのインストール (mirror.safe) {#installation-of-the-safekit--podman-solution-on-linux-mirrorsafe}

### 前提条件 {#prerequisites}

  * SafeKit で再起動する Podman アプリケーションを、2 つのノード（仮想マシンまたは物理サーバー）にインストールする必要があります。



{{%  insert-safekit-installation-package-linux-ja app="" mod="mirror"  %}}
 

### シンプルなコンテナイメージの例 {#example-with-a-simple-container-image}

この例では、SafeKit nginx（Web サーバー）コンテナを管理する方法、つまり、コンテナ内でアクセスされるディレクトリのレプリケーションと、障害発生時の別のノードでのコンテナの再起動について説明します。

#### 前提条件 {#prerequisites-1}

  * **両方のノードに**レプリケートされたディレクトリを作成します  
SafeKit によってレプリケートされ、nginx によって提供される HTML ページを含むディレクトリ **/replicated_dir_path** を作成します
  * **両方のノード**で、このディレクトリに初期 HTML ファイルを配置します
        
        cp index.html /replicated_dir_path

  * **両方のノードに**コンテナを作成します  
両方のノードで、**/replicated_dir_path** ディレクトリを **/usr/share/nginx/html** にバインドする nginx コンテナを作成します 
        
        podman container create --name mynginx -v /replicated_dir_path:/usr/share/nginx/html -p 9011:80 nginx


#### SafeKit は構成 {#safekit-configuration}

  * **ステップバイステップの構成**セクションに移動します
  * **mirror.safe** モジュールを作成して構成する
  * 障害発生時に切り替わる**仮想 IP アドレス**を設定します
  * **/replicated_dir_path を**レプリケートディレクトリとして設定します
  * それぞれ start_prim と stop_prim のスクリプトに **podman start mynginx** と **podman stop mynginx を**記述します  
注：SE Linux を使用している場合は、"podman start --security-opt label=disable mynginx" を使用する必要がある場合があります。
  * SafeKit mirror モジュールをデプロイして起動します


#### テスト {#tests}

  * **http://vitual-ip:9011/index.html** で nginx へのアクセスをテストします
  * テストの複製:  
SafeKit PRIM 状態のノードで、レプリケートされたディレクトリに他の HTML ファイルを追加します 
        
        cp page.html /replicated_dir_path

  * SafeKit PRIM 状態のノード上の mirror モジュールを停止します
  * セカンダリノードでコンテナが再起動されたことをテストする
  * **http://vitual-ip:9011/index.html** および **http://vitual-ip:9011/page.html** へのアクセスをテストします


## SafeKit/Podman ソリューションのステップバイステップ設定 {#step-by-step-configuration-of-the-safekit--podman-solution}


{{%  insert-safekit-82-configuration-ja app="Podman" mod="mirror"  %}}
 

## SafeKit mirror ソリューションのデモンストレーション {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}