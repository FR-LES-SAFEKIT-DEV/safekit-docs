---
title: "Siemens Siveillance Suite の高可用性"
canonical: "https://safekit.eviden.com/ja/solutions/siemens-siveillance-redundancy-high-availability-cluster-active-active/"
description: "Siemens Siveillance スイートの高可用性：SafeKit が Hyper-V 仮想マシンを 2 台のアクティブサーバー間でレプリケートし、自動フェイルオーバー。"
category: "solutions"
lang: "ja"
topics: "SafeKit（Siemens Siveillance 向け）：2 ノード SAN レス Hyper-V クラスター, 目次, SafeKit ソフトウェアは、SAN 上の共有ストレージなしで、どのように Siemens Siveillance高可用性クラスター簡単に実装するのでしょうか？, SafeKit Siemens Siveillance クラスターの仕組みは？, SafeKit High Availability の制限事項, 比較：SafeKit（Siemens Siveillance 向け） とネイティブ Hyper-V クラスタリング, ビデオガイド：SafeKit HA クラスターを Siemens Siveillance 用に設定する, SafeKit は、セキュリティ市場で認められたソリューションです"
hashpart: "safekit-hyperv-tco, toc, safekit-hyperv-ha-cluster, safekit-hyperv-ha-how-it-works, safekit-ha-limitations, safekit-hyperv-ha-comparison, videoguide-safekit-hyperv-cluster, safekit-a-recognized-solution-on-the-security-market"
translation: "translate_md 2026-11-08.3 | glossaire 2026-11-08.11 | Translation LLM | 37 expressions"
image: "/wp-content/uploads/2026/01/safekit-vm-repli-720-720.jpg"
schemaType: "TechArticle"
schemaApplications: ["Siemens Siveillance"]
---

# Siemens Siveillance Suite の高可用性 {#siemens-siveillance-suite-high-availability}


{{%  insert-safekit-hyperv-solution-mirror-ja app="Siemens Siveillance"  %}}
 

### 備考 {#notes}

  * Siveillance VMS およびレコーディングサーバーには、SafeKit ではなく統合フェイルオーバーメカニズムを使用します。レコーダーは、両方の物理サーバー上のホストレベル、または両方の物理サーバー上の 2 つの仮想マシンで実行できます（SafeKit によって複製されません）。
  * **💡 [Siemens Siveillance VMS](</ja/solutions/siemens-siveillance-vms-the-simplest-high-availability-cluster-between-two-redundant-servers/>)** には、アプリケーションレベルで、あらゆるインフラストラクチャ（物理サーバー、**VMware** を含むあらゆるハイパーバイザーなど）で動作する別のソリューションが存在します。



{{%  insert-safekit-siemens-license-ja app="Siemens Desigo CC"  %}}

{{%  insert-safekit-security-case-ja  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}