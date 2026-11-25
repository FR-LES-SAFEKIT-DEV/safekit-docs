---
title: "Microsoft NLB の VMware 代替ソリューション：マルチキャストとユニキャストの問題を解決"
canonical: "https://safekit.eviden.com/ja/best-practises/microsoft-nlb-vmware-multicast-unicast-alternative/"
description: "VMware で Microsoft NLB のマルチキャストまたはユニキャストでお困りですか？SafeKit は、Windows と Linux で自動ロードバランシングとフェイルオーバーを備えた farm クラスターというシンプルな代替手段を提供します。静的 ARP エントリ、MAC スプーフィング、特殊なネットワーク設定は不要です。"
category: "best-practises"
lang: "ja"
topics: "Microsoft NLB マルチキャストモード、Microsoft NLB ユニキャストモード、SafeKit を使用した代替案、farm モードの SafeKit クラスターは Windows でどのように動作しますか？、🔍 SafeKit を探索する"
translation: "translate_md 2026-11-20.2 | glossaire 2026-11-20.5 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2026/01/safekit-farm-cluster-config.png"
---

# Microsoft NLB の VMware 代替ソリューション：マルチキャストとユニキャストの問題を解決 {#microsoft-nlb-vmware-alternative-multicast-and-unicast-issues-solved}

## Microsoft NLB マルチキャストモード {#microsoft-nlb-multicast-mode}

マルチキャストモードでは、スイッチまたはルーターで静的 ARP 解決を手動で設定する必要があります。これは、クラスターに接続されている各ポートに必要です。詳細については、VMware ナレッジベースの記事[ネットワーク負荷分散(NLB)マルチキャストモードの構成](<https://knowledge.broadcom.com/external/article?articleNumber=414968>)を参照してください。不明なネットワーク環境では、マルチキャストモードで Microsoft NLB をデプロイすることは複雑で困難な場合があります。

## Microsoft NLB ユニキャストモード {#microsoft-nlb-unicast-mode}

ユニキャストモードでは、仮想マシンのいずれかの電源がオンになったときに ESXi/ESX ホストが RARP パケットを送信しないように設定する必要があります。そうしないと、Microsoft NLB が VMware と正しく連携しません。詳細については、VMware ナレッジベースの記事[Microsoft NLB not working properly in Unicast Mode](<https://knowledge.broadcom.com/external/article/344421/microsoft-nlb-not-working-properly-in-un.html>)を参照してください。

## SafeKit を使用した代替案 {#alternative-with-safekit}

SafeKit は、特別なネットワーク設定を必要としない[仮想 IP アドレス](</ja/best-practises/how-a-virtual-ip-address-works/>)を使用します。そのネットワーク負荷分散はあらゆる環境で動作します。これは、未知のインフラストラクチャ（未知のスイッチやルーター、物理サーバー、仮想サーバー）にソリューションを導入する場合に重要です。


{{%  insert-safekit-farm-ja app="Windows"  %}}

{{%  insert-safekit-hub-ja  %}}

{{%  insert-safekit-4-buttons-ja  %}}