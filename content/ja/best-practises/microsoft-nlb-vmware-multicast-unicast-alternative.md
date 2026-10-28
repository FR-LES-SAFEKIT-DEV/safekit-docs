---
title: "Microsoft NLB VMware代替ソリューション：マルチキャストとユニキャストの問題を解決"
canonical: "https://safekit.eviden.com/ja/best-practises/microsoft-nlb-vmware-multicast-unicast-alternative/"
description: "VMware 環境でMicrosoft NLB のマルチキャストまたはユニキャストに問題がありますか？ SafeKitシンプルな代替手段として SAN レスのfarmクラスタを提案します。静的 ARP エントリ、MAC スプーフィング、または特別なネットワーク構成なしで、 WindowsおよびLinuxで自動ロードバランシングとフェイルオーバーを実現します。"
category: "best-practises"
lang: "ja"
topics: "Microsoft NLB マルチキャスト モード、 Microsoft NLB ユニキャスト モード、 SafeKitとの代替、 `farm`モードのSafeKitクラスタはWindowsとどのように連携しますか?、🔍 SafeKit高可用性ナビゲーション ハブ"
---

# Microsoft NLB VMware 代替案: マルチキャストとユニキャストの問題が解決されました{#microsoft-nlb-vmware-alternative-multicast-and-unicast-issues-solved}

## Microsoft NLBマルチキャストモード{#microsoft-nlb-multicast-mode}

ネットワーク負荷分散（NLB）マルチキャストモード構成に関するVMwareのナレッジベース（ [ ）で説明されているように、クラスタに接続する各ポートについて、スイッチまたはルータで静的ARP解決を手動で構成する必要があります。未知のネットワーク環境でNLBマルチキャストモードMicrosoft ](<https://knowledge.broadcom.com/external/article?articleNumber=414968>) ）を展開することは、複雑で骨の折れる作業になる可能性があります。

## Microsoft NLBユニキャストモード{#microsoft-nlb-unicast-mode}

Microsoft NLB ユニキャスト モードでは、ESXi/ESX ホストが仮想マシンの電源が入っているときに RARP パケットを送信しないように構成する必要があります。そのため、 [ Microsoft NLB は VMware ](<https://knowledge.broadcom.com/external/article/344421/microsoft-nlb-not-working-properly-in-un.html>)のユニキャスト モードでは正しく動作しません。

## SafeKit {#alternative-with-safekit}の代替品

[ SafeKit ](</ja/best-practises/how-a-virtual-ip-address-works/>) IPアドレス構成は、特別なネットワーク構成を必要とせず、ネットワーク負荷分散はあらゆる環境で実行できます。これは、未知のスイッチやルーター、物理サーバーや仮想サーバーなど、未知のインフラストラクチャにソリューションをデプロイする必要がある場合に重要な機能です。


{{%  insert-safekit-farm-ja app="Windows"  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}