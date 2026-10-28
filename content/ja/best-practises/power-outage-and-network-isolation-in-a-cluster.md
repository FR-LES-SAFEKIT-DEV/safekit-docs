---
title: "HAクラスタにおける停電とネットワーク分離への対処"
canonical: "https://safekit.eviden.com/ja/best-practises/power-outage-and-network-isolation-in-a-cluster/"
description: "高可用性クラスタにおけるネットワーク分離と停電への対処方法を学びましょう。 SafeKit 統合されたスプリットブレインチェッカーと自動再同期機能を備えたSANレスアーキテクチャを提案し、共有ディスクなしでデータの整合性と24時間365日の稼働時間を保証する。"
category: "best-practises"
lang: "ja"
topics: "クラスタ内でネットワークが分離した場合のさまざまなシナリオは何ですか？、クラスタ内で停電が発生した場合のさまざまなシナリオは何ですか？、🔍 SafeKit高可用性ナビゲーションハブ"
---

# HAクラスタにおける停電とネットワーク分離への対処 {#handling-power-outages-and-network-isolation-in-a-ha-cluster}


{{%  insert-safekit-network-isolation-ja  %}}
 

## クラスター内で停電が発生した場合、どのようなシナリオが考えられますか？ {#what-are-the-different-scenarios-in-case-of-power-outage-in-a-cluster}

### プライマリノードの電源障害 {#primary-node-power-outage}

停電によりプライマリノードのみが停止した場合：

  * セカンダリノードで自動フェイルオーバーが発生し、そのノードはALONE状態になり、アプリケーションが再起動されます。
  * ノード 1 が再起動されると、複製されたデータの再同期後に SEDOND になります。
  * 必要に応じて、管理者はプライマリとセカンダリの役割を入れ替えることができます。


### 二次ノードの電源障害 {#secondary-node-power-outage}

停電によってセカンダリノードのみが停止する場合：

  * フェイルオーバーは発生せず、プライマリが単独になり、アプリケーションはノード 1 で実行を継続します。
  * ノード2が再起動されると、複製されたデータの再同期後、SEDOND状態になります。


### 一般停電 - ケース1 {#general-power-outage---case-1}

停電により両方のノードが停止した場合、デフォルトの動作は次のとおりです。

  * 両方のノードが停止状態になり、
  * ノード 1 が再起動されると、最新のデータを持っているかどうかわからないため、ALONE 状態にはならず、アプリケーションも再起動しません。そのため、他のノードの再起動を待つ WAIT 状態になります。
  * ノード2が再起動されると、両方のノードは以前のPRIM/SECOND状態に戻ります。


### 一般停電 - ケース2 {#general-power-outage---case-2}

停電により両方のノードが停止した場合、syncdelta の動作は次のようになります。

  * syncdelta は、例えば設定で 10 分に設定されています。これは、ノードのデータが前回の同期から 10 分遅れていても、ノードの開始が受け入れられることを意味します。
  * ノード 1 が再起動されると、ALONE 状態になり、再起動が停電後 10 分以内に行われたと仮定してアプリケーションが再起動されます。
  * ノード 2 が再起動されると、複製されたデータの再同期後、SECOND になります。
  * 注：ノード2が最初に再起動された場合、ノード2はALONEとなり、ノード1は起動時にSECONDとなります。



{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}