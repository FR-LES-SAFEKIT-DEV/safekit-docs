---
title: "ロードバランシング仮想IPアドレスのテスト SafeKit farm クラスタ"
canonical: "https://safekit.eviden.com/ja/best-practises/test-load-balancing-vip-farm/"
description: "テスト方法を学ぶ SafeKit クラスタノード間で負荷分散を行い、仮想IPフェイルオーバー、GARPルーティング変更、およびネットワーク動作を検証する。"
category: "ベストプラクティス"
lang: "ja"
topics: "主要原則、前提条件： SafeKit mosaic、テスト 1 – 接続の分散、テスト 2 – ディスパッチ サーバーの変更、テスト 3 – arp -a を使用した GARP リルーティングの確認、テスト 4 – Wireshark を使用したエンドツーエンドのチェック (Windows) または tcpdump (Linuxテスト対象のワークステーション、期待される結果の概要、トラブルシューティング"
---

# ロードバランシング仮想IPアドレスのテスト SafeKit <span class="notranslate farm-term" translate="no">farm</span> クラスタ

このガイドでは、 SafeKit <span class="notranslate farm-term" translate="no">Farm</span> (<span class="notranslate farm-term" translate="no">Farm</span> モジュール、仮想 IP アドレスでの負荷分散）がネットワークで正しく動作します。ノード間での接続の分散、およびディスパッチノードが停止したときの仮想 IP (VIP) の再ルーティングが行われます。

## 1. 主要原則

**前提条件：** すべてのノード <span class="notranslate farm-term" translate="no">Farm</span> 同じレイヤ2 IPサブネット（LAN、またはリモートサイト間で拡張されたVLAN）に属している必要があります。

- 仮想IP（VIP）は、各ノードでローカルに構成されます。 <span class="notranslate farm-term" translate="no">Farm</span>: 物理 IP アドレスのエイリアスとして、そのアドレスのネットワーク カードに設定されます。 <span class="notranslate farm-term" translate="no">Farm</span> ノード上で開始されます。
- 単一のノード、 **ディスパッチサーバー**仮想IP（VIP）のネットワークトラフィックを受信します（`vmac_directed` 構成、 SafeKit デフォルト): そのMACアドレスは、ARPテーブル内の仮想IP（VIP）に関連付けられているものです（ルーター、ゲートウェイ、同じサブネット内のクライアント）。
- このノードのカーネルフィルタは、TCP接続をノード全体に分散します。 <span class="notranslate farm-term" translate="no">Farm</span>、 による **宛先MACアドレスを書き換える** パケットは処理ノードのIPアドレスに転送されます（宛先IPアドレスは仮想IP（VIP）のままです）。応答は、接続を処理するノードからクライアントに直接送信されます。
- フィルタによって実行される分配は **決定論的**処理ノードは、設定された負荷分散ルールに従って、クライアントのIDから計算されます。
  - で **クライアントIPアドレス** (`filter="on_addr"`): 特定のクライアントは常に同じノードによってサービスを受けるため、セッションの親和性が確保されます。
  - で **クライアントTCPポート** (`filter="on_port"`同じクライアントからの各TCP接続は、異なるノードによって処理される可能性があります。これはモザイク図（第2節）で使用されるルールであり、そのためモザイク図には単一のワークステーションからのすべてのノードが表示されます。
- ディスパッチサーバーが停止した場合、別のノードがこの役割を引き継ぎ、送信します。 **GARPs** （無償ARP）ネットワークが仮想IP（VIP）を自身のMACアドレスに関連付けるようにします。

したがって、テストする必要があるのは以下のとおりです。

1. 接続がすべてのノードに正しく分散されていること。
2. ネットワーク（ルーター、ゲートウェイ、仮想化）が、ディスパッチサーバーが変更される際にGARPを考慮に入れること。

## 2. 前提条件： SafeKit モザイク

モザイクは、 SafeKit仮想IP（VIP）に対して多数のTCP接続を開き、それぞれの接続に対して応答したノードの名前を表示します。これにより、ネットワークの分布状況が一目でわかります。

1. では `userconfig.xml` の <span class="notranslate farm-term" translate="no">Farm</span> モジュールでは、 `<vip>` セクションで、ポートにロードバランシングルールを追加します。 SafeKit ウェブサーバー。例 SafeKit HTTPポート9010で動作するWebサーバー：

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   もし SafeKit ウェブサーバーとコンソールはHTTPSに切り替えられました。ポート9010を9453に置き換えてください。

2. すべてのノードに設定を適用してください。
3. クライアントワークステーションのブラウザから **外側 <span class="notranslate farm-term" translate="no">Farm</span>**接続先:

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   次に入力 <span class="notranslate farm-term" translate="no">Farm</span> **モジュール名** そしてテストを実行します。モザイクの各セルには、TCP接続に応答したノードの名前が表示され、各ノードには色が割り当てられているため、同じノードによって処理されるモザイクのブロックが明確に示されます。

   HTTPSでは、 `https://<VIP>:9453/safekit/mosaic.html`ポート9453にロードバランシングルールを適用します。

このテストは、 SafeKit 8.2 ユーザーガイド、セクション 4.3.5 "[仮想IPアドレス上でTCP負荷分散をテストする](https://safekit.eviden.com/resources/safekit-user-guide-82/#Mosaic)".

## 3. テスト1 – 接続の分布

**手順**

1. 開始する <span class="notranslate farm-term" translate="no">Farm</span> すべてのノードで（UP状態）。
2. クライアントワークステーションからモザイクを開きます。

**期待される結果：** モザイクには、 **すべてのノード** の <span class="notranslate farm-term" translate="no">Farm</span>各処理ノードごとに異なる色が使用されます。

これは、上流のルーターまたはゲートウェイがMACアドレスを介していずれかのノードに到達し、そのノードが接続を正しく分配していることを証明しています。

## 4. テスト2 – ディスパッチサーバーの変更

このテストでは、 <span class="notranslate farm-term" translate="no">Farm</span> ディスパッチサーバーが停止しても応答し続ける。

**手順**

1. 止める <span class="notranslate farm-term" translate="no">Farm</span>つまり、すべてのノード SafeKit.
2. 始める **単一ノード**このノードがディスパッチサーバーになります。
   → **期待される結果：** このモザイクには、このノードのみが表示されます。
3. 他のノードを起動します。
   → **期待される結果：** モザイクにはすべてのノードが表示されます。
4. 止める **最初のノード**ディスパッチサーバーとして機能するもの。
   → **期待される結果：** モザイクには残りのノードが表示されます。

> **このテストの限界：** ステップ4で正しい結果が得られたとしても、GARPが機能していることを証明するものではありません。 <span class="notranslate farm-term" translate="no">Farm</span> モジュールが他のノードで起動され（ステップ3）、これらのノードで仮想IPアドレスが設定され、ネットワーク上で仮想IPアドレスとMACアドレスの関連付けを既に再ルーティングしている可能性のあるメッセージが生成されます。テスト3と4のみが実際にGARPをテストします。

> 他のノードを停止する <span class="notranslate farm-term" translate="no">Farm</span> （ディスパッチサーバーではない方のサーバー）は、ディストリビューションの再構成のみをテストします。

## 5. テスト3 – GARPリルーティングの確認 `arp -a`

テスト4と合わせて、このテストはGARPを実際にチェックします。ディスパッチサーバーのMACアドレスを停止する前にメモし、仮想IP（VIP）を確認します。/MAC その後、関係性は変化した。

このテストは、モザイクを表示するクライアントワークステーションが **同じIPサブネット** として <span class="notranslate farm-term" translate="no">Farm</span>.

クライアントと <span class="notranslate farm-term" translate="no">Farm</span>クライアントのARPテーブルには仮想IP（VIP）は含まれておらず、ゲートウェイに到達するために使用されるゲートウェイのアドレスが含まれています。 <span class="notranslate farm-term" translate="no">Farm</span>のネットワークです。その場合は、ネットワークチームと協力してルーターまたはゲートウェイのARPテーブルを確認してください。

**手順**

1. 開始する <span class="notranslate farm-term" translate="no">Farm</span> すべてのノードで。
2. クライアントワークステーションで、以下を実行します。 `arp -a` また、仮想IP（VIP）に関連付けられたMACアドレスをメモしておいてください。これは、ディスパッチサーバーを識別するものです。
3. 止める <span class="notranslate farm-term" translate="no">Farm</span> このMACアドレスを持つノード。
4. モザイクが残りのノードでも正常に機能することを確認してください。
5. 走る `arp -a` 新しい仮想IP（VIP）を再度読み取る/MAC 新しいディスパッチサーバーを関連付け、識別します。

## 6. テスト 4 – Wireshark を使用したエンドツーエンドチェック (Windows) または tcpdump (Linux)

クライアントとサーバー側でパケットをキャプチャすることで、仮想IP（VIP）へのTCP接続を追跡できます。 <span class="notranslate farm-term" translate="no">Farm</span> ノード: Wireshark がオンになっている Windows マシン、そしてtcpdumpで Linux 機械。

あなたは見なければなりません **パケットのMAC（イーサネット）ヘッダー**IP アドレスだけでなく、ディスパッチ サーバーのカーネル フィルタは接続を分散します。 **宛先MACアドレスを書き換える** パケットは処理ノードのIPアドレスに転送されます。宛先IPアドレスは、経路全体を通して仮想IP（VIP）のままです。

**同じSYNパケットで注意すべき点：**

| ステップ | どこで撮影するか | 観測されたMACアドレス |
|---|---|---|
| 1. クライアントは仮想IP（VIP）に送信します | クライアント | クライアントMAC → MAC **ディスパッチサーバー** |
| 2. ディスパッチサーバーが接続を転送する | ディスパッチサーバー | MAC のディスパッチ → MAC の **処理ノード** |
| 3. 処理ノードは | 処理ノード | MACのディスパッチ → ノードMAC |
| 4. ノードはクライアントに直接応答する | 処理ノード | ノードMAC → クライアントMAC |
| 5. クライアントは回答を受け取ります | クライアント | ノードMAC → クライアントMAC |

> クライアントワークステーションが、 <span class="notranslate farm-term" translate="no">Farm</span>、 <span class="notranslate farm-term" translate="no">Farm</span> ノードは、MAC アドレスです。 **ゲートウェイ** （ルーター）は、クライアントワークステーションのものではなく、2つのサブネットを接続するものです。

ディスパッチサーバーを停止した後、キャプチャを繰り返します（テスト 2、ステップ 4）：ステップ 1 では、MAC アドレスが表示される必要があります。 **新しい** サーバーをディスパッチしています。

## 7. どのワークステーションからテストを行うか

動作はクライアントと <span class="notranslate farm-term" translate="no">Farm</span>アーキテクチャに関連する各タイプのクライアントから、テスト1とテスト2を実行してください。

| クライアントの所在地 | テストで確認する内容 |
|---|---|
| クライアント **同じサブネット** として <span class="notranslate farm-term" translate="no">Farm</span> | GARPによるクライアントのARPテーブルの更新（テスト3が可能） |
| クライアント **異なるサブネット** （ルーター、ゲートウェイ、ハイパーバイザー仮想ネットワーク） | ルーターまたはゲートウェイによるGARP処理 |
| クライアントVM **ハイパーバイザー上でも <span class="notranslate farm-term" translate="no">Farm</span> VM** | ハイパーバイザの仮想スイッチの動作。仮想スイッチは内部スイッチングとルーティングも処理する。 |

## 8. 期待される結果の概要

| テスト | アクション | 期待される結果 |
|---|---|---|
| 1 | 全ノード稼働中、モザイク | すべてのノードが表示されます |
| 2.2 | 単一ノードが起動しました | このノードのみが表示されます |
| 2.3 | すべてのノードが起動しました | すべてのノードが表示されます |
| 2.4 | ディスパッチサーバーが停止しました | 残りのノードは、永続的な中断なく出現する。 |
| 3 | `arp -a` 停車前と停車後 | 仮想IP（VIP）に関連付けられたMACアドレスが変更されます |
| 4 | 停止前後のWiresharkまたはtcpdumpによるキャプチャ | クライアントは新しいディスパッチサーバーのMACアドレスにメッセージを送信します。 |

## 9. トラブルシューティング

- **ディスパッチサーバーが停止した後、モザイクは応答しなくなります。** GARPは、経路上のデバイス（ルーター、ゲートウェイ、仮想スイッチなど）では考慮されません。GARPの処理方法については、ネットワークチームにご確認ください。
- **GARPの定期送信：** の `arpreroute="on"` 属性 `<vip>` セクション（ `arpinterval` そして `arpelapse`）はVIPに対して定期的にGARPを送信します。ユーザーガイドのセクション13.6.4を参照してください。[`<vip>` 構文](https://safekit.eviden.com/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax)".
- **仮想IP（VIP）↔MAC解決の診断：** ユーザーガイドのセクション7.24を参照してください。[仮想IP（VIP）↔MAC解決のトラブルシューティング](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Issue_with_VIP)「、およびセクション7.15」[<span class="notranslate farm-term" translate="no">Farm</span> モジュールはUP（準備完了）ですが、負荷分散に問題があります。 <span class="notranslate farm-term" translate="no">Farm</span>](<https://safekit.eviden.com/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>)".

## のデモンストレーション SafeKit <span class="notranslate farm-term" translate="no">farm</span> 解決 {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-en  %}}

仮想IPアドレスを使用したプライマリ/バックアップフェイルオーバーについては、以下を参照してください。 [仮想IPアドレスのテスト SafeKit mirror クラスタ](/best-practises/test-primary-backup-vip-mirror/).

{{%  insert-safekit-4-buttons-en  %}}
