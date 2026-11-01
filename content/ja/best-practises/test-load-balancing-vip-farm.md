---
title: "仮想IPアドレス上でSafeKitロードバランシングをテストする"
canonical: "https://safekit.eviden.com/ja/best-practises/test-load-balancing-vip-farm/"
description: "クラスタノード間でのSafeKitロードバランシングのテスト方法、仮想IPフェイルオーバー、GARPリルーティング、およびネットワーク動作の検証方法を学びましょう。"
category: "best-practises"
lang: "ja"
topics: "主要原則、前提条件：SafeKitモザイク、テスト1 – 接続の分散、テスト2 – ディスパッチサーバーの変更、テスト3 – arp -aによるGARPリルーティングの確認、テスト4 – Wireshark（Windows）またはtcpdump（Linux）によるエンドツーエンドチェック、テストに使用するワークステーション、期待される結果の概要、トラブルシューティング"
---

# ネットワーク内の仮想IPアドレスでSafeKitのロードバランシングをテストする

このガイドでは、SafeKit <span class="notranslate farm-term" translate="no">Farm</span> （ <span class="notranslate farm-term" translate="no">Farm</span>モジュール、仮想IPアドレスでの負荷分散）がネットワーク内で正しく動作していることを確認する方法、つまり、ノード間での接続の分散、およびディスパッチノードが停止したときのVIPの再ルーティングについて説明します。

## 1. 基本原則

**前提条件：** <span class="notranslate farm-term" translate="no">Farm</span>のすべてのノードは、同じレイヤ2 IPサブネット（LAN、またはリモートサイト間で拡張されたVLAN）に属している必要があります。

- VIPは<span class="notranslate farm-term" translate="no">Farm</span>の各ノードでローカルに設定されます。つまり、ノード上で<span class="notranslate farm-term" translate="no">Farm</span>が起動される際に、そのアドレスのネットワークカード上で、物理IPアドレスのエイリアスとして設定されます。
- 単一のノードである**ディスパッチングサーバーは**、VIP（ `vmac_directed`構成、SafeKitのデフォルト）のネットワークトラフィックを受信します。そのMACアドレスは、ARPテーブル（ルーター、ゲートウェイ、同じサブネット内のクライアント）でVIPに関連付けられているものです。
- このノードのカーネルフィルタは、パケットの**宛先MACアドレスを処理ノードのMACアドレスに書き換える**ことで、TCP接続を<span class="notranslate farm-term" translate="no">Farm</span>内のノードに分散します（宛先IPアドレスはVIPのままです）。応答は、接続を処理するノードからクライアントに直接送信されます。
- フィルタによる分散処理は**決定論的**である。処理ノードは、設定された負荷分散ルールに従って、クライアントのIDから計算される。
  - **クライアントの IP アドレス**( `filter="on_addr"` ): 特定のクライアントは常に同じノードによって処理され、セッションの親和性が保証されます。
  - **クライアントのTCPポート**（ `filter="on_port"` ）において、同じクライアントからの各TCP接続は、異なるノードによって処理される可能性があります。これはモザイク図（セクション2）で使用されるルールであり、そのため単一のワークステーションからのすべてのノードが表示されます。
- ディスパッチサーバーが停止した場合、別のノードがこの役割を引き継ぎ、 **GARP** （Gratuitous ARP）を送信して、ネットワークがVIPを自身のMACアドレスに関連付けるようにします。

したがって、テストする必要があるのは以下のとおりです。

1. 接続がすべてのノードに正しく分散されていること。
2. ネットワーク（ルーター、ゲートウェイ、仮想化）が、ディスパッチサーバーが変更される際にGARPを考慮に入れること。

## 2. 前提条件：SafeKitモザイク

このモザイク画像は、SafeKitが提供するテストページです。VIPに対して多数のTCP接続を開き、それぞれの接続に対して応答したノードの名前を表示します。これにより、ネットワークの分布状況を一目で把握できます。

1. <span class="notranslate farm-term" translate="no">Farm</span>モジュールの`userconfig.xml`ファイルの`<vip>`セクションで、SafeKitウェブサーバーのポートにロードバランシングルールを追加します。HTTPポート9010でSafeKitウェブサーバーを使用する場合の例を以下に示します。

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   SafeKitのWebサーバーとコンソールがHTTPSに切り替えられた場合は、9010を9453に置き換えてください。

2. すべてのノードに設定を適用してください。
3. **<span class="notranslate farm-term" translate="no">Farm</span>外の**クライアントワークステーションのブラウザから、以下に接続します。

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   次に、 <span class="notranslate farm-term" translate="no">Farm</span>**モジュール名**を入力してテストを実行します。モザイクの各セルには、TCP接続に応答したノードの名前が表示され、各ノードには色が割り当てられているため、同じノードによって提供されるモザイクのブロックが明確に示されます。

   HTTPSでは、 `https://<VIP>:9453/safekit/mosaic.html`を使用し、ポート9453にロードバランシングルールを設定します。

このテストについては、SafeKit 8.2 ユーザーガイドのセクション 4.3.5「[仮想 IP アドレスでの TCP ロード バランシングのテスト](https://safekit.eviden.com/ja/resources/safekit-user-guide-82/#Mosaic)」に詳細が記載されています。

## 3. テスト1 – 接続の分布

**手順**

1. すべてのノードで<span class="notranslate farm-term" translate="no">Farm</span>を開始します（UP状態）。
2. クライアントワークステーションからモザイクを開きます。

**期待される結果：**モザイク画像には、 <span class="notranslate farm-term" translate="no">Farm</span>の**すべてのノード**の名前が表示され、各処理ノードは異なる色で表示されます。

これは、上流のルーターまたはゲートウェイがMACアドレスを介していずれかのノードに到達し、そのノードが接続を正しく分配していることを証明しています。

## 4. テスト2 – ディスパッチサーバーの変更

このテストは、ディスパッチングサーバーが停止した場合でも、 <span class="notranslate farm-term" translate="no">Farm</span>が応答し続けることを確認します。

**手順**

1. <span class="notranslate farm-term" translate="no">Farm</span>を停止します。つまり、SafeKit 内のすべてのノードを停止します。
2. **単一のノード**を起動します。このノードがディスパッチサーバーになります。
   →**期待される結果：**モザイクにはこのノードのみが表示されます。
3. 他のノードを起動します。
   →**期待される結果：**モザイクにすべてのノードが表示される。
4. **最初のノード**、つまりディスパッチサーバーとして機能しているノードを停止します。
   →**期待される結果：**モザイクには残りのノードが表示されます。

**このテストの制限事項：**ステップ4で正しい結果が得られたとしても、GARPが正しく機能していることを証明できるわけではありません。他のノードで<span class="notranslate farm-term" translate="no">Farm</span>モジュールが起動されると（ステップ3）、これらのノードで仮想IPアドレスが設定され、ネットワーク上で仮想IPアドレスとMACアドレスの関連付けを既に再ルーティングしている可能性のあるメッセージが生成されます。GARPを実際にテストするのは、テスト3とテスト4のみです。

<span class="notranslate farm-term" translate="no">Farm</span>内の他のノード（ディスパッチサーバーではないノード）を停止しても、ディストリビューションの再構成のみがテストされます。

## 5. テスト3 – `arp -a`によるGARPリルーティングの確認

テスト4と合わせて、このテストはGARPを実際にチェックします。ディスパッチングサーバーを停止する前にそのMACアドレスを記録し、その後VIP/MACアドレスの関連付けが変更されていることを確認します。

このテストは、モザイクを表示するクライアントワークステーションが<span class="notranslate farm-term" translate="no">Farm</span>と**同じIPサブネット**にある場合にのみ可能です。

クライアントと<span class="notranslate farm-term" translate="no">Farm</span>の間にルーターが存在する場合、クライアントのARPテーブルにはVIPアドレスではなく、 <span class="notranslate farm-term" translate="no">Farm</span>のネットワークに到達するために使用されるゲートウェイのアドレスが含まれます。この場合、ネットワークチームと協力して、ルーターまたはゲートウェイのARPテーブルでGARPを確認する必要があります。

**手順**

1. すべてのノードで<span class="notranslate farm-term" translate="no">Farm</span>を開始します。
2. クライアントワークステーションで、 `arp -a`を実行し、VIP に関連付けられた MAC アドレスをメモしてください。これにより、ディスパッチサーバーを特定できます。
3. このMACアドレスを持つ<span class="notranslate farm-term" translate="no">Farm</span>ノードを停止してください。
4. モザイクが残りのノードでも正常に機能することを確認してください。
5. 新しい VIP/MAC 関連付けを読み取り、新しいディスパッチサーバーを特定するには、再度`arp -a`実行してください。

## 6. テスト4 – Wireshark（Windows）またはtcpdump（Linux）を使用したエンドツーエンドチェック

クライアントと<span class="notranslate farm-term" translate="no">Farm</span>ノードでパケットをキャプチャすることで、VIPへのTCP接続を追跡できます。WindowsマシンではWiresharkを、Linuxマシンではtcpdumpを使用します。

**パケットのIPアドレスだけでなく、MAC（イーサネット）ヘッダー**も確認する必要があります。ディスパッチサーバーのカーネルフィルタは、パケットの**宛先MACアドレスを処理ノードのMACアドレスに書き換える**ことで接続を分散します。宛先IPアドレスは、経路全体を通してVIPとして保持されます。

**同じSYNパケットで注意すべき点：**

|手順|キャプチャする場所|観測されたMACアドレス|
|---|---|---|
| 1. クライアントは VIP に送信します|クライアント|クライアント MAC →**ディスパッチサーバー**の MAC |
| 2. ディスパッチング サーバーは接続を転送します|ディスパッチング サーバー|ディスパッチング MAC →**処理ノード**の MAC |
| 3. 処理ノードは|処理ノード|ディスパッチング MAC → ノード MAC を受信します|
| 4. ノードはクライアントに直接応答します|処理ノード|ノード MAC → クライアント MAC (SYN-ACK) |
| 5. クライアントは応答を受信します|クライアント|ノード MAC → クライアント MAC |

クライアントワークステーションが<span class="notranslate farm-term" translate="no">Farm</span>とは異なるサブネットにある場合、 <span class="notranslate farm-term" translate="no">Farm</span>ノードに表示される「クライアントMAC」は、クライアントワークステーションのMACアドレスではなく、2つのサブネットを接続する**ゲートウェイ**（ルータ）のMACアドレスになります。同様に、クライアントワークステーションでは、VIP宛てのパケットは、自身のゲートウェイのMACアドレスに送信されます。

ディスパッチサーバーを停止した後、キャプチャを繰り返します（テスト2、ステップ4）。ステップ1には、**新しい**ディスパッチサーバーのMACアドレスが表示されるはずです。

## 7. どのワークステーションからテストを行うか

動作は、クライアントと<span class="notranslate farm-term" translate="no">Farm</span>間のネットワークパスによって異なります。アーキテクチャに関連する各タイプのクライアントから、テスト1とテスト2を実行してください。

|クライアントの所在地|テストで確認する内容|
|---|---|
|クライアントは<span class="notranslate farm-term" translate="no">Farm</span>と**同じサブネット**内にあります| GARP によるクライアントの ARP テーブルの更新 (テスト 3 が可能) |
|**異なるサブネット**内のクライアント (ルーター、ゲートウェイ、ハイパーバイザー仮想ネットワーク) |ルーターまたはゲートウェイによる GARP 処理|
| **<span class="notranslate farm-term" translate="no">Farm</span> VM もホストするハイパーバイザ上のクライアント**VM |内部スイッチングとルーティングも処理するハイパーバイザの仮想スイッチの動作|

## 8．期待される結果の概要

|テスト|アクション|期待される結果|
|---|---|---|
| 1 |すべてのノードがアップ、モザイク|すべてのノードが表示されます|
| 2.2 |単一のノードが起動しました|このノードのみが表示されます|
| 2.3 |すべてのノードが起動しました|すべてのノードが表示されます|
| 2.4 |ディスパッチサーバーが停止しました|残りのノードが表示され、永続的な中断はありません|
| 3 |停止前と停止後の`arp -a` | VIP に関連付けられた MAC アドレスが変更されます|
| 4 |停止前後の Wireshark または tcpdump キャプチャ|クライアントは新しいディスパッチサーバーの MAC アドレスに送信します|

## 9. トラブルシューティング

- **ディスパッチングサーバーが停止した後、モザイクが応答しなくなります。**経路上のデバイス（ルーター、ゲートウェイ、仮想スイッチ）がGARPを考慮していないためです。ネットワークチームにGARPの処理状況を確認してください。
- **GARPの定期送信：** `<vip>`セクションの`arpreroute="on"`属性（ `arpinterval`と`arpelapse`含む）は、VIP上でGARPを定期的に送信します。ユーザーガイドのセクション13.6.4「 [`<vip>`構文](https://safekit.eviden.com/ja/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax)」を参照してください。
- **VIP ↔ MAC 解決の診断:**ユーザーガイドのセクション 7.24「 [VIP ↔ MAC 解決のトラブルシューティング](https://safekit.eviden.com/ja/resources/safekit-user-guide-82/#_Issue_with_VIP)」およびセクション 7.15「 [<span class="notranslate farm-term" translate="no">Farm</span>モジュールは UP (準備完了) だが、 <span class="notranslate farm-term" translate="no">Farm</span>内の負荷分散に問題がある](<https://safekit.eviden.com/ja/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>)」を参照してください。
