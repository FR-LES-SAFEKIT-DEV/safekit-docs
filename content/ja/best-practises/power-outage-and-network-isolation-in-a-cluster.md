---
title: "HA クラスターにおける停電とネットワーク分離の処理"
canonical: "https://safekit.eviden.com/ja/best-practises/power-outage-and-network-isolation-in-a-cluster/"
description: "高可用性クラスターでの停電とネットワーク分離への対処：SafeKit のスプリットブレインチェッカーと自動再同期がデータを保護します。"
category: "best-practises"
lang: "ja"
topics: "クラスターで停電が発生した場合、どのようなシナリオが考えられますか？"
hashpart: "what-are-the-different-scenarios-in-case-of-power-outage-in-a-cluster"
translation: "translate_md 2026-11-20.2 | glossaire 2026-11-20.6 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/02/quorum-with-remote-sites.png"
schemaType: "TechArticle"
---

# HA クラスターにおける停電とネットワーク分離の処理 {#handling-power-outages-and-network-isolation-in-a-ha-cluster}


{{%  insert-safekit-network-isolation-ja  %}}
 

## クラスターで停電が発生した場合、どのようなシナリオが考えられますか？ {#what-are-the-different-scenarios-in-case-of-power-outage-in-a-cluster}

以下のシナリオでは、ノード 1 が初期プライマリノードです。ノード 2 は初期セカンダリノードです。

### プライマリノードの停電 {#primary-node-power-outage}

停電によってプライマリノードのみが停止した場合：

  * SafeKit は自動的にセカンダリノードにフェイルオーバーします。ノード 2 が ALONE 状態になり、アプリケーションを再起動します。
  * ノード 1 が再起動すると、レプリケートされたデータを再同期します。その後、SECOND になります。
  * 必要に応じて、管理者はプライマリとセカンダリの役割を入れ替えることができます。


### セカンダリノードの停電 {#secondary-node-power-outage}

停電によってセカンダリノードのみが停止した場合：

  * フェイルオーバーは発生しません。ノード 1 が ALONE になります。アプリケーションはノード 1 で引き続き実行されます。
  * ノード 2 が再起動すると、レプリケートされたデータを再同期します。その後、SECOND になります。


### 両ノードで停電が発生 - ケース 1 {#general-power-outage---case-1}

停電により両方のノードが停止した場合のデフォルトの動作は以下のとおりです：

  * 両方のノードが STOP 状態になります。
  * ノード 1 が再起動しても、ALONE 状態にはなりません。アプリケーションは再起動されません。データが最新であるかどうかを認識できません。そのため、WAIT 状態になり、他のノードが再起動するのを待ちます。
  * ノード 2 が再起動すると、両方のノードは以前の状態（PRIM と SECOND）に戻ります。


### 両ノードでの停電 - ケース 2 {#general-power-outage---case-2}

停電により両方のノードが停止した場合、`syncdelta` パラメータの動作は以下のとおりです：

  * この例では、`syncdelta` は設定で 10 分に設定されています。ノードは、そのデータが最後の同期から最大 10 分遅れていても開始できます。
  * ノード 1 が停電から 10 分以内に再起動すると、ALONE 状態になります。アプリケーションが再起動します。
  * ノード 2 が再起動すると、レプリケートされたデータを再同期します。その後、SECOND になります。
  * 注：ノード 2 が最初に再起動した場合、そのノードは ALONE になります。その後、ノード 1 が起動すると SECOND になります。



{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}