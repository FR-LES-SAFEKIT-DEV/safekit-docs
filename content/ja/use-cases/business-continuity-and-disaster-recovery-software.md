---
title: "SafeKit を使用した 2 ノードクラスター向け事業継続および災害復旧ソフトウェア"
canonical: "https://safekit.eviden.com/ja/use-cases/business-continuity-and-disaster-recovery-software/"
description: "SafeKit による事業継続と災害復旧：2 つのサーバールームにまたがる 2 ノードクラスターで、同期レプリケーションと自動フェイルオーバーを実現。"
category: "use-cases"
lang: "ja"
topics: "事業継続および災害復旧ソフトウェア、🔍 SafeKit を探索する"
translation: "translate_md 2026-11-16.4 | glossaire 2026-11-16.12 | Translation LLM | 49 expressions"
image: "/wp-content/uploads/2023/02/remote-datacenters.png"
schemaType: "Article"
---

# SafeKit を使用した 2 ノードクラスター向け事業継続および災害復旧ソフトウェア {#business-continuity-and-disaster-recovery-software-for-2-node-clusters-with-safekit}

## 事業継続および災害復旧ソフトウェア {#business-continuity-and-disaster-recovery-software}

### 事業継続および災害復旧に SafeKit ソフトウェアを選択する理由 {#reasons-to-choose-the-safekit-software-for-business-continuity-and-disaster-recovery}


![SafeKit によるシンプルな事業継続および災害復旧ソフトウェア](/wp-content/uploads/2023/02/remote-datacenters.png "w:300")


SafeKit クラスターを 1 つのサーバー室に展開する場合でも、2 つのリモートサーバー室にまたがって展開する場合でも、構成は同じです。唯一の要件はリモートサイト間の拡張 LAN またはストレッチ VLAN です。

### 2 つの離れたサーバールーム間で、シンプルな高可用性ソリューションを実装するにはどうすればよいですか？ {#how-to-implement-a-simple-high-availability-solution-between-two-remote-computer-rooms}

SafeKit を使用すると、mirror モジュールと <span class="notranslate farm-term" translate="no">farm</span> モジュールをリモートのサーバー室にあるサーバーに簡単に展開できます。特別なクラスター構成は必要ありません。そのため、SafeKit は事業継続と災害復旧を単一のシンプルなアーキテクチャに統合します。SafeKit は、3 台目のサーバーや特別なクォーラムディスクなしでネットワーク分離も処理します。[スプリットブレイン管理](</ja/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>)の詳細については、こちらをご覧ください。

### 事業継続とバックアップソリューション {#business-continuity-vs-backup-solutions}

事業継続ソリューションとバックアップソリューションは、異なる障害シナリオに対応します。これらは相互に置き換えるものではなく、補完的な関係にあります。SafeKit 高可用性クラスタリングは、事業継続性を提供します。リアルタイムレプリケーションと自動フェイルオーバーにより、サーバーまたはアプリケーションに障害が発生した場合でも、アプリケーションを最小限の中断で稼働させ続けます。バックアップソリューションは、ランサムウェア攻撃やオペレーターの誤操作など、より広範な損失から保護します。通常、これらは後で復元するデータのオフサイトコピーに依存します。復旧には時間がかかり、自動フェイルオーバーはありません。

[SafeKit 高可用性とディザスタリカバリバックアップの組み合わせ](</ja/best-practises/high-availability-disaster-recovery-hadr/>)について、さらに詳しくはこちらをご覧ください。


{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}