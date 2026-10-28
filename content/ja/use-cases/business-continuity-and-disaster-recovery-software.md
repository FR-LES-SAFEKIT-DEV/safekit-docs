---
title: "SafeKitを搭載した2ノードクラスタ向け事業継続および災害復旧ソフトウェア"
canonical: "https://safekit.eviden.com/ja/use-cases/business-continuity-and-disaster-recovery-software/"
description: "SafeKit は、事業継続および災害復旧ソフトウェアであり、2 つの遠隔コンピュータ ルーム間でシンプルな高可用性ソリューションを実装します。 24 時間 365 日の稼働時間を実現します。 SafeKit最も使いやすいビジネス継続性および災害復旧ソフトウェア。2ノード同期レプリケーション、自動フェイルオーバー、ロードバランシングにより、高価なSANや複雑なITスキルを排除します。 Windows そして Linuxクラウド環境またはオンプレミス環境を問わず、重要なアプリケーションにおけるデータ損失ゼロ（RPO=0）。"
category: "use-cases"
lang: "ja"
topics: "事業継続および災害復旧ソフトウェア、🔍 SafeKit高可用性ナビゲーションハブ"
---

# SafeKitを搭載した 2 ノード クラスタ向け事業継続および災害復旧ソフトウェア {#business-continuity-and-disaster-recovery-software-for-2-node-clusters-with-safekit}

## 事業継続および災害復旧ソフトウェア {#business-continuity-and-disaster-recovery-software}

### ビジネス継続性と災害復旧のためのソフトウェアとしてSafeKit選ぶ理由 {#reasons-to-choose-the-safekit-software-for-business-continuity-and-disaster-recovery}


![シンプルな事業継続および災害復旧ソフトウェアSafeKit ](/wp-content/uploads/2023/02/remote-datacenters.png "w:300")付き）


拡張LANまたはストレッチVLANがリモートサイト間で利用可能であれば、 SafeKitクラスタを同じコンピュータルーム内に展開する場合でも、リモートコンピュータルーム間で展開する場合でも、構成に違いはありません。

### 2つの遠隔コンピュータ室間でシンプルな高可用性ソリューションを実装するにはどうすればよいでしょう？ {#how-to-implement-a-simple-high-availability-solution-between-two-remote-computer-rooms}

SafeKit mirror 、および`farm`モジュールは、特別なクラスタ構成を必要とせずに、遠隔地のコンピュータ室に設置されたサーバーに容易に展開できます。つまり、 SafeKit 、単一のシンプルなアーキテクチャ内で事業継続性と災害復旧を統合します。また、 SafeKit 、ネットワークが隔離された場合に、3台目のサーバーや特別なクォーラムディスクを必要とせずに、 [スプリットブレイン](</ja/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>)を管理します。

### 事業継続性 vs バックアップソリューション {#business-continuity-vs-backup-solutions}

事業継続ソリューションとバックアップソリューションは、異なる障害シナリオに対応しており、互換性があるのではなく補完的な関係にあります。事業継続ソリューションは、 SafeKit高可用性クラスタリングにより、リアルタイムレプリケーションと自動フェイルオーバーを通じて、サーバーまたはアプリケーションの障害発生時にもアプリケーションの中断を最小限に抑えながらアプリケーションの実行を維持します。バックアップソリューションは、ランサムウェア攻撃やオペレーターのミスなど、より広範囲な損失から保護するもので、通常はオフサイトのデータコピーに依存しており、復旧時間は長くなりますが、自動フェイルオーバー機能はありません。

[ SafeKit高可用性と災害復旧バックアップの組み合わせ」 ](</ja/best-practises/high-availability-disaster-recovery-hadr/>)で詳細をご覧ください。


{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}