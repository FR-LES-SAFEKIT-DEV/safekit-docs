---
title: "SQL Serverの代替案：Express および Standard エディション向けの常時稼働 HA"
canonical: "https://safekit.eviden.com/ja/best-practises/alternative-always-on-sql-server-express-standard-editions/"
description: "SQL Server Always On のコスト効率の高い代替ソリューションをお探しですか？ SafeKit 、SAN レス アーキテクチャを採用し、 SQL Server Express および Standard エディションに高可用性をもたらします。SAN や Active Directory を使用せずに、同期レプリケーション、仮想 IP、自動フェイルオーバーをご利用いただけます。"
category: "best-practises"
lang: "ja"
topics: "Express および Standard エディション向けの Always On SQL Serverの代替、 SafeKit mirrorクラスターはMicrosoft SQL Serverとどのように連携するのか、ビデオ ガイド: SafeKit用のSQL Server HA mirrorクラスターの構成、🔍 SafeKit高可用性ナビゲーション ハブ"
---

# SQL Serverの代替品：Express および Standard エディション向けの常時オン HA {#alternative-to-sql-server-always-on-ha-for-express-and-standard-editions}

## エクスプレス版およびスタンダード版向けのAlways On SQL Serverの代替品 {#alternative-to-always-on-sql-server-for-express-and-standard-editions}

### Microsoft SQL Serverの解決策 {#the-solution-for-microsoft-sql-server}

SafeKit 、同期リアルタイムデータレプリケーションと自動フェイルオーバーにより、2つの冗長ノード間でMicrosoft SQL Server間の高可用性を実現します。

このソリューションは、 Microsoft SQL Serverエディションに依存せず、エクスプレス版とスタンダード版の両方で動作します。

### 汎用製品 {#a-generic-product}

SafeKitは汎用製品です。SQL Serverのデータやログだけでなく、より多くのものを複製できます。アプリケーションがSQL Serverベースで、構成ファイルやその他のファイルを含む特定のフォルダがある場合、それらを同じ方法で複製できます。また、SQL Serverサービスに加えて、独自のサービスを再起動することも可能です。

[ SafeKitインストールガイドMicrosoft SQL Serverエクスプレス版および標準版、 ](</ja/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/>)を含む）

### Microsoftフェイルオーバー クラスタなし {#without-microsoft-failover-cluster}

SafeKit なしで動作する Microsoft Always On と同様のフェールオーバー クラスター SQL Serverこれは、仮想IPアドレス、フォルダの同期リアルタイムレプリケーション、自動フェイルオーバーとフェイルバックなどを含むオールインワンソリューションです。 SafeKit 共有ディスクやデータベースのエンタープライズ版が不要になります。 

### ドメインコントローラーとアクティブディレクトリなし {#without-domain-controller-and-active-directory}

SafeKit 、Always On SQL Serverと同様に、ドメインコントローラーやActive Directoryの設定を必要とせずに動作します。この導入が容易でコスト効率の高いソリューションは、特別なスキルを必要としません。

### クォーラムに必要なノードが3つありません {#without-3-nodes-for-quorum}

SafeKit 、Always On SQL Serverのようにクォーラムのために3つのノードを必要としません。ネットワークが分離されている場合、 SafeKit 、監視役のルーターへのpingによるスプリットブレインチェッカーを実装します。さらに、複数のハートビートを製品内で簡単に設定できます。

### その他の冗長性および高可用性ソリューション {#other-redundancy-and-high-availability-solutions}

SafeKitを使用すると、 WindowsおよびLinux上で、任意のフォルダーとサービス、データベース、完全な Hyper-V または KVM 仮想マシン、 Docker 、 Kubernetes 、クラウド アプリケーションのリアルタイム レプリケーションとフェイルオーバーを実装できます。

### 完全なソリューション {#a-complete-solution}

SafeKit以下を解決します: 

  * ハードウェア障害（問題の20％）、コンピュータ室の完全な故障を含む、 
  * ソフトウェア障害（問題の40％）、重要なプロセスの再起動を含む、 
  * また、使いやすさとウェブコンソールのおかげで、人的ミス（問題の40%）も軽減されます。



{{%  insert-safekit-mirror-ja app="Microsoft SQL Server"  %}}
 

## ビデオガイド： SafeKit SQL Server用のHA mirrorクラスタの構成 {#videoguide-safekit-mirror-cluster}


{{%  insert-safekit-mirror-video-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}