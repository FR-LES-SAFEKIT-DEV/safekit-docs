---
title: "SafeKit farm クラスターにおけるロードバランシング仮想 IP アドレスのテスト"
canonical: "https://safekit.eviden.com/ja/best-practises/test-load-balancing-vip-farm/"
description: "SafeKit のクラスターノード間でのロードバランシングのテスト方法、仮想 IP フェイルオーバー、GARP リルータリング、およびネットワークの動作の検証方法について説明します。"
category: "best-practises"
lang: "ja"
topics: "主要原則、前提条件：SafeKit モザイク、テスト 1 – 接続の分散、テスト 2 – ディスパッチサーバーの変更、テスト 3 – arp -a を使用した GARP ルーティングの確認、テスト 4 – Wireshark (Windows) または tcpdump (Linux) を使用したエンドツーエンドの確認、テストを行うワークステーション、期待される結果の概要、トラブルシューティング、SafeKit farm ソリューションのデモンストレーション"
translation: "translate_md 2026-11-05.12 | glossaire 2026-11-05.15 | Translation LLM | 23 expressions"
---

# SafeKit <span class="notranslate farm-term" translate="no">farm</span> クラスターにおけるロードバランシング仮想 IP アドレスのテスト {#testing-the-load-balancing-virtual-ip-address-in-a-safekit-farm-cluster}

このガイドでは、SafeKit <span class="notranslate farm-term" translate="no">Farm</span>（<span class="notranslate farm-term" translate="no">Farm</span> モジュール、仮想 IP アドレスでのロードバランシング）がネットワーク内で正しく動作することを確認する方法について説明します。これには、ノード間の接続の分散、およびディスパッチングノードが停止した際の仮想 IP（VIP）の再ルーティングが含まれます。

## 1. 主要原則 {#1-key-principles}

**前提条件：**<span class="notranslate farm-term" translate="no">Farm</span> のすべてのノードは、同じレイヤー 2 IP サブネット（LAN、またはリモートサイト間で拡張された VLAN）に属している必要があります。

- 仮想 IP（VIP）は、<span class="notranslate farm-term" translate="no">Farm</span> の各ノードにローカルに設定されます。<span class="notranslate farm-term" translate="no">Farm</span> ノードで起動されると、そのアドレスのネットワークカード上の物理 IP アドレスのエイリアスとして設定されます。
- 単一ノードである**ディスパッチサーバーは**、仮想 IP（VIP）のネットワークトラフィックを受信します（`vmac_directed` 構成、SafeKit のデフォルト）。その MAC アドレスは、ARP テーブル（ルーター、ゲートウェイ、同じサブネット内のクライアント）で仮想 IP（VIP）に関連付けられているものです。
- このノードのカーネルフィルタは、パケットの**宛先 MAC アドレスを処理ノードのものに書き換える**ことで、TCP 接続を <span class="notranslate farm-term" translate="no">Farm</span> のノードに分散します（宛先 IP アドレスは仮想 IP（VIP）のままです）。応答は、接続を処理するノードからクライアントに直接送信されます。
- フィルタによって実行される分散は**決定論的**です。処理ノードは、設定された負荷分散ルールに従って、クライアントの ID から計算されます。
  - **クライアントの IP アドレス**(`filter="on_addr"`): 指定されたクライアントは常に同じノードによってサービス提供され、セッションアフィニティが保証されます。
  - **クライアントの TCP ポート**(`filter="on_port"`) の場合: 同じクライアントからの各 TCP 接続は、異なるノードによって処理されます。これはモザイク(セクション 2)で使用されるルールであり、そのため、単一のワークステーションからすべてのノードが表示されます。
- ディスパッチサーバーが停止すると、別のノードがこの役割を引き継ぎ、**GARP**（Gratuitous ARP）を送信して、ネットワークが仮想 IP（VIP）を自身の MAC アドレスに関連付けます。

したがって、テストする必要があるのは次のとおりです。

1. 接続がすべてのノードに正しく分散されていること。
2. ディスパッチサーバーが変更された場合、ネットワーク（ルーター、ゲートウェイ、仮想化）が GARP を考慮に入れること。

## 2. 前提条件：SafeKit モザイク {#2-prerequisite-the-safekit-mosaic}

モザイク、SafeKit が提供するテストページです。仮想 IP（VIP）に多数の TCP 接続を開き、それぞれに応答したノードの名前を表示します。これにより、分散状況を一目で確認できます。

1. <span class="notranslate farm-term" translate="no">Farm</span> モジュールの `userconfig.xml` の `<vip>` セクションに、SafeKit Web サーバーのポートへのロードバランシングルールを追加します。SafeKit Web サーバーをポート 9010 の HTTP で実行する例：

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   SafeKit の Web サーバーとコンソールが HTTPS に切り替えられている場合は、9010 を 9453 に置き換えます。

2. すべてのノードに設定を適用します。
3. **<span class="notranslate farm-term" translate="no">Farm</span> 外の**クライアントワークステーションのブラウザから、以下に接続します。

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   次に、<span class="notranslate farm-term" translate="no">Farm</span>**モジュールの名前**を入力してテストを実行します。モザイクの各セルには、TCP 接続に応答したノードの名前が表示され、各ノードには色が関連付けられており、同じノードによって提供されるモザイクのブロックを明確に示します。

   HTTPS では、ポート 9453 でロードバランシングルールを使用して、`https://<VIP>:9453/safekit/mosaic.html` を使用します。

![モザイクを使用して SafeKit <span class="notranslate farm-term" translate="no">farm</span> の仮想 IP アドレスをテストする](/wp-content/uploads/2024/03/appli-19.png)

「[SafeKit <span class="notranslate farm-term" translate="no">farm</span> ソリューションのデモンストレーション](/ja/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/#demonstration-of-the-safekit-farm-solution)」セクションでモザイクテストビデオをご覧ください。

## 3. テスト 1 – 接続の分布 {#3-test-1--distribution-of-connections}

**手順**

1. すべてのノードで <span class="notranslate farm-term" translate="no">Farm</span> を起動します（UP 状態）。
2. クライアントワークステーションからモザイクを開きます。

**期待される結果:** モザイク<span class="notranslate farm-term" translate="no">Farm</span> の**すべてのノード**の名前が表示され、各処理ノードには異なる色が付けられます。

これにより、アップストリームのルーターまたはゲートウェイが MAC アドレスを介してノードの 1 つに到達し、このノードが接続を正しく分散することが証明されます。

## 4. テスト 2 – ディスパッチサーバーの変更 {#4-test-2--change-of-dispatching-server}

このテストは、ディスパッチサーバーが停止した場合でも <span class="notranslate farm-term" translate="no">Farm</span> が応答し続けることを確認します。

**手順**

1. <span class="notranslate farm-term" translate="no">Farm</span>、つまり SafeKit 内のすべてのノードを停止します。
2. **単一ノード**を起動します。このノードがディスパッチサーバーになります。
   → **期待される結果：** モザイクこのノードのみが表示されます。
3. 他のノードを起動します。
   → **期待される結果：** モザイクすべてのノードが表示されます。
4. ディスパッチングサーバーとして機能している**最初のノードを**停止します。
   → **期待される結果：** モザイク残りのノードが表示されます。

> **このテストの限界：** ステップ 4 で正しい結果が得られても、GARP 機能することを証明するものではありません。他のノードで <span class="notranslate farm-term" translate="no">Farm</span> モジュールが起動されると（ステップ 3）、これらのノードに仮想 IP アドレスが設定され、ネットワーク上にメッセージが生成されます。これにより、仮想 IP アドレスと MAC アドレスの関連付けがすでに再ルーティングされている可能性があります。GARP GARP 実際にテストするのは、テスト 3 と 4 のみです。

> <span class="notranslate farm-term" translate="no">Farm</span> の他のノード（ディスパッチサーバーではないノード）を停止すると、ディストリビューションの再構成のみがテストされます。

## 5. テスト 3 – `arp -a` を使用した GARP ルーティングの確認 {#5-test-3--checking-garp-rerouting-with-arp--a}

テスト 4 と合わせて、このテストは GARP 本当にチェックします。ディスパッチングサーバーを停止する前に MAC アドレスをメモし、その後、仮想 IP（VIP）/MAC の関連付けが変更されたことを確認します。

このテストは、モザイクを表示しているクライアントワークステーションが <span class="notranslate farm-term" translate="no">Farm</span> と**同じ IP サブネット**にある場合にのみ可能です。

クライアントと <span class="notranslate farm-term" translate="no">Farm</span> の間にルーターがある場合、クライアントの ARP テーブルには仮想 IP（VIP）は含まれず、<span class="notranslate farm-term" translate="no">Farm</span> のネットワークに到達するために使用されるゲートウェイのアドレスが含まれます。その場合は、ネットワークチームにルーターまたはゲートウェイの ARP テーブルを確認してもらってください。

**手順**

1. すべてのノードで <span class="notranslate farm-term" translate="no">Farm</span> を起動します。
2. クライアントワークステーションで `arp -a` を実行し、仮想 IP（VIP）に関連付けられた MAC アドレスをメモします。これにより、ディスパッチサーバーが識別されます。
3. この MAC アドレスを持つ <span class="notranslate farm-term" translate="no">Farm</span> ノードを停止します。
4. モザイク残りのノードで引き続き機能することを確認してください。
5. `arp -a` 再度実行して、新しい仮想 IP (VIP)/MAC の関連付けを読み取り、新しいディスパッチサーバーを特定します。

## 6. テスト 4 – Wireshark (Windows) または tcpdump (Linux) を使用したエンドツーエンドチェック {#6-test-4--end-to-end-check-with-wireshark-windows-or-tcpdump-linux}

クライアントと <span class="notranslate farm-term" translate="no">Farm</span> ノードでパケットをキャプチャすることで、仮想 IP（VIP）への TCP 接続を追跡できます。Windows マシンでは Wireshark、Linux マシンでは tcpdump を使用します。

IP アドレスだけでなく、**パケットの MAC（イーサネット）ヘッダー**を確認する必要があります **。ディスパッチサーバーのカーネルフィルターは、パケットの 宛先 MAC アドレスを処理ノードの MAC アドレスに書き換える**ことで接続を分散します。宛先 IP アドレスは、パス全体で仮想 IP（VIP）のままです。

**同じ SYN パケットで確認すべき点：**

| ステップ | パケットをキャプチャする場所 | 検出された MAC アドレス |
|---|---|---|
| 1. クライアントは仮想 IP（VIP）に送信します。 | クライアント | クライアント MAC → **ディスパッチサーバー**の MAC |
| 2. ディスパッチサーバーが接続を転送します | ディスパッチサーバー | ディスパッチサーバーの MAC アドレス → **処理ノード**の MAC アドレス |
| 3. 処理ノードが受信する | 処理ノード | サーバー MAC → ノード MAC を送信 |
| 4. ノードはクライアントに直接応答します。 | 処理ノード | ノード MAC → クライアント MAC |
| 5. クライアントが応答を受け取る | クライアント | ノード MAC → クライアント MAC |

> クライアントワークステーションが <span class="notranslate farm-term" translate="no">Farm</span> とは異なるサブネットにある場合、<span class="notranslate farm-term" translate="no">Farm</span> ノードで認識される「クライアント MAC」は、クライアントワークステーションの MAC アドレスではなく、2 つのサブネットを接続する**ゲートウェイ**（ルーター）の MAC アドレスです。

ディスパッチサーバーを停止した後、キャプチャを繰り返します（テスト 2、ステップ 4）。ステップ 1 には、**新しい**ディスパッチサーバーの MAC アドレスが表示されます。

## 7. テストを行うワークステーション {#7-which-workstations-to-test-from}

動作は、クライアントと <span class="notranslate farm-term" translate="no">Farm</span> 間のネットワークパスによって異なります。アーキテクチャに関連する各クライアントの種類から、テスト 1 と 2 を実行します。

| クライアントの所在地 | 検査で確認すること |
|---|---|
| クライアントが <span class="notranslate farm-term" translate="no">Farm</span> と**同じサブネット**内にある | GARP によるクライアントの ARP テーブルの更新（テスト 3 回可能） |
| **異なるサブネット**内のクライアント（ルーター、ゲートウェイ、ハイパーバイザー仮想ネットワーク） | ルーターまたはゲートウェイによる GARP 処理 |
| **<span class="notranslate farm-term" translate="no">Farm</span> VM もホストするハイパーバイザー上の**クライアント VM | ハイパーバイザーの仮想スイッチの動作。内部スイッチングとルーティングも処理します。 |

## 8. 期待される結果の概要 {#8-summary-of-expected-results}

| テスト | アクション | 期待される結果 |
|---|---|---|
| 1 | すべてのノードが UP、モザイク | すべてのノードが表示されます |
| 2.2 | 単一ノードが起動しました | このノードのみが表示されます |
| 2.3 | すべてのノードが起動しました | すべてのノードが表示されます |
| 2.4 | ディスパッチサーバーが停止しました | 残りのノードは、永続的な中断なしに表示されます。 |
| 3 | 停止前後の `arp -a` | 仮想 IP（VIP）に関連付けられた MAC アドレスが変更されます |
| 4 | 停止前後の Wireshark または tcpdump によるキャプチャ | クライアントは、新しいディスパッチングサーバーの MAC アドレスに送信します。 |

## 9. トラブルシューティング {#9-troubleshooting}

- **ロードバランシングビットマップ：** テストとロードバランシングビットマップの詳細については、SafeKit 8.2 ユーザーガイドのセクション 4.3.5「[仮想 IP アドレスでの TCP ロードバランシングのテスト](https://safekit.eviden.com/ja/resources/safekit-user-guide-82/#Mosaic)」を参照してください。
- **ディスパッチサーバーが停止した後、モザイク応答しなくなります**。GARP GARP、パス上のデバイス（ルーター、ゲートウェイ、仮想スイッチ）によって考慮されません。ネットワークチームに GARP 処理を確認してください。
- **GARP の定期送信:**`<vip>` セクションの `arpreroute="on"`属性(`arpinterval` および `arpelapse` と共に)は、VIP に対して定期的に GARP を送信します。ユーザーガイドのセクション 13.6.4「[`<vip>` 構文](https://safekit.eviden.com/ja/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax)」を参照してください。
- **仮想 IP（VIP）と MAC アドレスの解決の診断：** ユーザーガイドのセクション 7.24「[仮想 IP（VIP）と MAC アドレスの解決のトラブルシューティング](https://safekit.eviden.com/ja/resources/safekit-user-guide-82/#_Issue_with_VIP)」とセクション 7.15「[<span class="notranslate farm-term" translate="no">Farm</span> モジュール UP（Ready）だが、<span class="notranslate farm-term" translate="no">Farm</span> のロードバランシングに問題がある](<https://safekit.eviden.com/ja/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>)」を参照してください。

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> ソリューションのデモンストレーション {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ja  %}}

詳細はこちら：
- [高可用性クラスターリングにおける仮想 IP アドレスの仕組みとは？](/ja/best-practises/how-a-virtual-ip-address-works/)
- 仮想 IP アドレスを使用したプライマリ/バックアップのフェイルオーバーについては、[「SafeKit mirror クラスターの仮想 IP アドレスのテスト」を](/ja/best-practises/test-primary-backup-vip-mirror/)参照してください。

{{%  insert-safekit-4-buttons-ja  %}}
