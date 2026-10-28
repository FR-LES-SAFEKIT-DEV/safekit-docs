---
title: "PodmanとSafeKitによる高可用性：フェイルオーバーのためにmirror.safeモジュールをインストールしてください"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-with-podman/"
description: "SafeKitにmirror.safeモジュールをデプロイして、 Linux上でPodmanコンテナの同期リアルタイムレプリケーションと自動フェイルオーバーを有効にします。このガイドでは、共有ストレージを使用しない重要なアプリケーション向けに、2 ノードの SAN レス クラスタをセットアップする手順を説明します。"
category: "quick-install"
lang: "ja"
topics: "Podmanの高可用性クイックインストールガイド、 SafeKitの高可用性制限、 SafeKit / Podmanソリューションの概要、 Linux ( mirror.safe ) へのSafeKit / Podmanソリューションのインストール、 SafeKit / Podmanソリューションのステップバイステップ構成、 SafeKit mirrorソリューションのデモ、🔍 SafeKit高可用性ナビゲーションハブ"
---

# Podman高可用性とSafeKit : フェイルオーバーのためにmirror.safeモジュールをインストールしてください {#podman-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ja app="Podman" mod="mirror"  %}}
 

## SafeKit / Podmanソリューションの概要 {#overview-of-the-safekit--podman-solution}

ソリューションはここに記載されています: ** 💡 [ SafeKit : Podman高可用性およびリアルタイムデータレプリケーションソフトウェア](</ja/solutions/podman-the-simplest-high-availability-cluster-between-two-redundant-servers/>) ** 。

## SafeKit / PodmanソリューションをLinux ( mirror.safe )にインストールします。 {#installation-of-the-safekit--podman-solution-on-linux-mirrorsafe}

### 前提条件 {#prerequisites}

  * SafeKitで再起動したいPodmanアプリケーションが、2つのノード（仮想マシンまたは物理サーバー）にインストールされている必要があります。



{{%  insert-safekit-installation-package-linux-ja app="" mod="mirror"  %}}
 

### シンプルなコンテナイメージの例 {#example-with-a-simple-container-image}

この例では、 SafeKit nginx (Web サーバー) コンテナをどのように管理できるかを示します。具体的には、コンテナ内でアクセスされるディレクトリの複製と、障害発生時の別のノードでのコンテナの再起動について説明します。

#### 前提条件 {#prerequisites-1}

  * 両方のノード**上に複製ディレクトリ**を作成します。  
** /replicated_dir_path **というディレクトリを作成します。このディレクトリはSafeKitによって複製され、 nginxによって提供される HTML ページが含まれます。
  * 両方のノード**に、このディレクトリに初期 HTML ファイル**を配置します。
        
        cp index.html /replicated_dir_path

  * 両方のノード**上にコンテナ**を作成します。  
** /replicated_dir_path **ディレクトリを**/usr/share/nginx/html**にバインドするnginxコンテナを両方のノードに作成します。 
        
        podman container create --name mynginx -v /replicated_dir_path : /usr/share/nginx/html -p 9011:80 nginx


#### SafeKit設定 {#safekit-configuration}

  * **ステップバイステップ設定**セクションへ移動してください。
  * **mirror.safe**モジュールを作成および構成する
  * 障害発生時に切り替えられる仮想IPアドレス** **を設定します。
  * ** /replicated_dir_path **複製ディレクトリとして設定する
  * start_primおよびstop_primスクリプトにそれぞれ**podman start mynginx**および**podman stop mynginx**記述します。  
注: SE Linuxを使用する場合は、「podman start --security-opt label=disable mynginx 」を使用する必要がある場合があります。
  * SafeKit mirrorモジュールをデプロイして起動します。


#### テスト {#tests}

  * **http://vitual-ip:9011/index.html**でnginxへのアクセスをテストします。
  * 再現性をテストする：  
SafeKit PRIM状態のノードで、複製ディレクトリに他のHTMLファイルを追加します。 
        
        cp page.html /replicated_dir_path

  * SafeKit PRIM状態のノードでmirrorモジュールを停止します。
  * セカンダリノードでコンテナが再起動されたことをテストします。
  * **http://vitual-ip:9011/index.html**および**http://vitual-ip:9011/page.html**へのアクセスをテストします。


## SafeKit / Podmanソリューションの段階的な構成 {#step-by-step-configuration-of-the-safekit--podman-solution}


{{%  insert-safekit-82-configuration-ja app="Podman" mod="mirror"  %}}
 

## SafeKit mirrorのソリューションのデモンストレーション {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}