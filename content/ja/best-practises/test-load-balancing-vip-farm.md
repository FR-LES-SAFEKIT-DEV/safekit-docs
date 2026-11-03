---
タイトル: 「01クラスタにおけるロードバランシング仮想IPアドレスのテスト」
正規: "https://safekit.eviden.com/ja/best-practises/test-load-balancing-vip-farm/"
説明：「クラスタノード間での負荷分散をテストし、仮想IPフェイルオーバー、GARPルーティング、およびネットワーク動作を確認する方法を学びます。」
カテゴリ：「ベストプラクティス」
lang: "ja"
トピック: 「基本原則、前提条件: SafeKit モザイク、テスト 1 – 接続の分散、テスト 2 – ディスパッチ サーバーの変更、テスト 3 – arp -a を使用した GARP リルーティングの確認、テスト 4 – Wireshark (Windows) または tcpdump (Linux) を使用したエンドツーエンドのチェック、テストに使用するワークステーション、期待される結果の概要、トラブルシューティング」
---

# SafeKit <span class="notranslate farm-term" translate="no">farm</span>クラスタでのロードバランシング仮想IPアドレスのテスト

このガイドでは、ネットワーク内で SafeKit <span class="notranslate farm-term" translate="no">Farm</span> (<span class="notranslate farm-term" translate="no">Farm</span> モジュール、仮想 IP アドレスでの負荷分散) が正しく動作していることを確認する方法、つまり、ノード間での接続の分散、およびディスパッチ ノードが停止したときの仮想 IP (VIP) の再ルーティングについて説明します。

## 1. 主要原則

**前提条件:** <span class="notranslate farm-term" translate="no">Farm</span> のすべてのノードは、同じレイヤ 2 IP サブネット (LAN またはリモート サイト間で拡張された VLAN) に属している必要があります。

- 仮想 IP (VIP) は、<span class="notranslate farm-term" translate="no">Farm</span> の各ノードでローカルに構成されます。<span class="notranslate farm-term" translate="no">Farm</span> がノードで起動されると、そのアドレスのネットワーク カード上の物理 IP アドレスのエイリアスとして設定されます。
- 単一のノードであるディスパッチングサーバー1は、仮想IP（VIP）（2構成、3デフォルト）のネットワークトラフィックを受信します。そのMACアドレスは、ARPテーブル（ルーター、ゲートウェイ、同じサブネット内のクライアント）で仮想IP（VIP）に関連付けられているものです。
このノードのカーネルフィルタは、パケットの宛先MACアドレスを処理ノードのMACアドレスに書き換えることで、TCP接続を<span class="notranslate farm-term" translate="no">Farm</span>のノードに分散します（宛先IPアドレスは仮想IP（VIP）のままです）。応答は、接続を処理するノードからクライアントに直接送信されます。
- フィルタによって実行される分散は「0決定論的」です。処理ノードは、設定された負荷分散ルールに従って、クライアントのIDから計算されます。
  - クライアント IP アドレス 1 (2) の場合: 特定のクライアントは常に同じノードによってサービスされ、セッション アフィニティが保証されます。
  - クライアントTCPポート1（2）では、同じクライアントからの各TCP接続は、異なるノードによって処理される可能性があります。これはモザイク図（セクション2）で使用されるルールであり、そのため単一のワークステーションからのすべてのノードが表示されます。
- ディスパッチサーバーが停止した場合、別のノードがこの役割を引き継ぎ、ネットワークが仮想 IP (VIP) を自身の MAC アドレスに関連付けるように **GARPs** (gratuitous ARP) を送信します。

したがって、テストする必要があるのは以下のとおりです。

1. 接続がすべてのノードに正しく分散されていること。
2. ディスパッチサーバーが変更される際に、ネットワーク（ルーター、ゲートウェイ、仮想化）がGARPを考慮に入れること。

## 2. 前提条件: SafeKit モザイク

このモザイクはSafeKitが提供するテストページです。仮想IP（VIP）へのTCP接続を多数開き、それぞれの接続に対して応答したノードの名前を表示します。これにより、分布状況を一目で把握できます。

1. モジュール 1 2 3 の 0 セクションの 4 セクションで、Web サーバーのポートにロード バランシング ルールを追加します。ポート 9010 の HTTP Web サーバーを使用した例:

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   SafeKit WebサーバーとコンソールがHTTPSに切り替えられた場合は、9010を9453に置き換えてください。

2. すべてのノードに設定を適用します。
3. クライアントワークステーション 0 のブラウザーから、ネットワーク 1 2 3 4 の外部にあるブラウザーから、以下に接続します。

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   次に、<span class="notranslate farm-term" translate="no">Farm</span> **モジュール名**を入力してテストを実行します。モザイクの各セルには、TCP接続に応答したノードの名前が表示され、各ノードには色が関連付けられて、同じノードによって提供されるモザイクのブロックが明確に示されます。

   HTTPSでは、ポート9453のロードバランシングルールで`https://<VIP>:9453/safekit/mosaic.html`を使用します。

テストの詳細については、バージョン8.2ユーザーガイドのセクション4.3.5「1.仮想IPアドレスでのTCP負荷分散のテスト2」に記載されています。

## 3. テスト1 – 接続の分布

0ステップ1

1. すべてのノードで<span class="notranslate farm-term" translate="no">Farm</span>を開始します（UP状態）。
2. クライアントワークステーションからモザイクを開きます。

**期待される結果:**モザイクには**すべてのノード**の名前が表示され、各処理ノードは異なる色で表示されます。

これは、上流のルーターまたはゲートウェイがMACアドレスを介していずれかのノードに到達し、そのノードが接続を正しく分配していることを証明しています。

## 4. テスト2 – ディスパッチサーバーの変更

このテストでは、ディスパッチサーバーが停止したときに<span class="notranslate farm-term" translate="no">Farm</span>が応答し続けることを確認します。

0ステップ1

1. <span class="notranslate farm-term" translate="no">Farm</span>、つまりSafeKit内のすべてのノードを停止します。
2. 単一のノード 1 を起動します。このノードがディスパッチサーバーになります。
   → **期待される結果:**モザイクにはこのノードのみが表示されます。
3. 他のノードを起動します。
   → **期待される結果:**モザイクにはすべてのノードが表示されます。
4. ディスパッチサーバーとして機能している最初のノード 1 を停止します。
   → **期待される結果:**モザイクには残りのノードが表示されます。

> **このテストの制限:** ステップ 4 で正しい結果が得られたとしても、GARP が機能していることを証明するものではありません。<span class="notranslate farm-term" translate="no">Farm</span> モジュールが他のノードで起動されると (ステップ 3)、これらのノードで仮想 IP アドレスが設定され、ネットワーク上で仮想 IP アドレス / MAC アドレスの関連付けを既に再ルーティングしている可能性のあるメッセージが生成されます。テスト 3 と 4 のみが、実際に GARP をテストします。

> <span class="notranslate farm-term" translate="no">Farm</span> の他のノード (ディスパッチサーバーではないノード) を停止すると、ディストリビューションの再構成のみがテストされます。

## 5. テスト 3 – `arp -a` を使用した GARP リルーティングの確認

テスト4と合わせて、このテストはGARPを実際にチェックします。ディスパッチサーバーのMACアドレスを停止する前にメモし、その後、仮想IP（VIP）0の関連付けが変更されたことを確認します。

このテストは、モザイクを表示するクライアントワークステーションが、クライアントワークステーションと同じ IP サブネット 1 にある場合にのみ可能です。

クライアントと<span class="notranslate farm-term" translate="no">Farm</span>の間にルーターが存在する場合、クライアントのARPテーブルには仮想IP（VIP）ではなく、<span class="notranslate farm-term" translate="no">Farm</span>のネットワークに到達するために使用されたゲートウェイのアドレスが含まれます。その場合は、ネットワークチームにルーターまたはゲートウェイのARPテーブルを確認してください。

0ステップ1

1. すべてのノードで<span class="notranslate farm-term" translate="no">Farm</span>を開始します。
2. クライアントワークステーションで`arp -a`を実行し、仮想IP（VIP）に関連付けられたMACアドレスをメモします。これはディスパッチサーバーを識別します。
3. このMACアドレスを持つノード <span class="notranslate farm-term" translate="no">Farm</span> を停止します。
4. モザイクが残りのノードでも正常に機能することを確認します。
5. `arp -a` を再度実行して、新しい仮想 IP (VIP)/MAC の関連付けを読み取り、新しいディスパッチ サーバーを識別します。

## 6. テスト 4 – Wireshark (Windows) または tcpdump (Linux) を使用したエンドツーエンドチェック

クライアントと 0 1 2 ノードでパケットをキャプチャすることで、仮想 IP (VIP) への TCP 接続を追跡できます。3 台のマシンでは Wireshark を、4 台のマシンでは tcpdump を使用します。

パケットのIPアドレスだけでなく、MAC（イーサネット）ヘッダーも確認する必要があります。ディスパッチサーバーのカーネルフィルタは、パケットの宛先MACアドレスを処理ノードのMACアドレスに書き換えることで接続を分配します。宛先IPアドレスは、パス全体を通して仮想IP（VIP）のままです。

**同じSYNパケットで観察すべきこと：**

| ステップ | キャプチャする場所 | 観測された MAC アドレス |
|---|---|---|
| 1. クライアントは仮想IP (VIP) | クライアント | クライアントMAC → **ディスパッチングサーバーのMAC** | に送信します
| 2. ディスパッチングサーバは接続を転送します | ディスパッチングサーバ | ディスパッチング MAC → 処理ノードの MAC ** ** |
| 3. 処理ノードは | 処理ノード | ディスパッチング MAC → ノード MAC | を受信します
| 4. ノードはクライアントに直接応答します | 処理ノード | ノードMAC → クライアントMAC |
| 5. クライアントは応答を受信します | クライアント | ノード MAC → クライアント MAC |

クライアントワークステーションが<span class="notranslate farm-term" translate="no">Farm</span>とは異なるサブネットにある場合、<span class="notranslate farm-term" translate="no">Farm</span>ノードに表示される「クライアントMAC」は、クライアントワークステーションのMACアドレスではなく、2つのサブネットを接続する**ゲートウェイ**（ルータ）のMACアドレスです。

ディスパッチサーバーを停止した後、キャプチャを繰り返します（テスト 2、ステップ 4）：ステップ 1 には、新しいディスパッチサーバーの MAC アドレスが表示されるはずです。

## 7. どのワークステーションからテストを行うか

動作は、クライアントと <span class="notranslate farm-term" translate="no">Farm</span> 間のネットワークパスに依存します。アーキテクチャに関連する各タイプのクライアントからテスト 1 と 2 を実行してください。

| クライアントの場所 | テストでチェックする内容 |
|---|---|
| クライアントが ** 同じサブネット** にある <span class="notranslate farm-term" translate="no">Farm</span> | GARP によるクライアントの ARP テーブルの更新 (テスト 3 が可能) |
| 異なるサブネット内のクライアント** (ルーター、ゲートウェイ、ハイパーバイザー仮想ネットワーク)| ルーターまたはゲートウェイによる GARP 処理|
| クライアント VM ** ハイパーバイザ上で、 <span class="notranslate farm-term" translate="no">Farm</span> VM** | ハイパーバイザの仮想スイッチの動作（内部スイッチングとルーティングも処理します） |

## 8. 期待される結果の概要

| テスト | アクション | 期待される結果 |
|---|---|---|
| 1 | すべてのノードがアップ、モザイク | すべてのノードが表示されます |
| 2.2 | 単一のノードが起動しました | このノードのみが表示されます |
| 2.3 | すべてのノードが起動しました | すべてのノードが表示されます |
| 2.4 | ディスパッチングサーバーが停止しました | 残りのノードが表示され、永続的な中断はありません |
| 3 | `arp -a` 停止前と停止後 | 仮想IP (VIP) に関連付けられたMACアドレスが変更されます |
| 4 | 停止前後の Wireshark または tcpdump キャプチャ | クライアントは新しいディスパッチサーバーの MAC アドレスに送信します |

## 9. トラブルシューティング

- **ディスパッチング サーバーが停止した後、モザイクが応答しなくなります:**パス上のデバイス (ルーター、ゲートウェイ、仮想スイッチ) が GARP を考慮していません。ネットワーク チームと GARP の処理を確認してください。
- **GARPの定期送信:** `<vip>`セクションの`arpreroute="on"`属性(`arpinterval`および`arpelapse`と共に)は、VIP上でGARPを定期的に送信します。ユーザーガイドのセクション13.6.4「[`<vip>`構文](https://safekit.eviden.com/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax)」を参照してください。
- **仮想IP（VIP）↔MAC解決の診断：**ユーザーガイドのセクション7.24「[仮想IP（VIP）↔MAC解決のトラブルシューティング](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Issue_with_VIP)」およびセクション7.15「[<span class="notranslate farm-term" translate="no">Farm</span>モジュールはUP（準備完了）だが、<span class="notranslate farm-term" translate="no">Farm</span>](<https://safekit.eviden.com/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>)で負荷分散に問題があります」を参照してください。

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> 解法のデモンストレーション {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ja  %}}

仮想 IP アドレスを使用したプライマリ / バックアップ フェイルオーバーについては、「クラスターの仮想 IP アドレスのテスト」を参照してください。

{{%  insert-safekit-4-buttons-ja  %}}
