---
title: "SafeKit farmクラスタにおけるロードバランシング仮想IPアドレスのテスト"
canonical: "https://safekit.eviden.com/ja/best-practises/test-load-balancing-vip-farm/"
description: "SafeKit負荷分散をクラスタノード間でテストし、仮想IPのフェイルオーバー、 GARPルーティング変更、およびネットワーク動作を確認する方法を学びましょう。"
category: "best-practises"
lang: "ja"
topics: "主要原則、前提条件： SafeKitモザイク、テスト1 – 接続の分散、テスト2 – ディスパッチサーバーの変更、テスト3 – arp -aによるGARPリルーティングの確認、テスト4 – Wireshark （ Windows ）またはtcpdump （ Linux ）によるエンドツーエンドチェック、テストに使用するワークステーション、期待される結果の概要、トラブルシューティング、 SafeKit farmソリューションのデモンストレーション"
---

# SafeKit <span class="notranslate farm-term" translate="no">farm</span>クラスタにおけるロードバランシング仮想IPアドレスのテスト

このガイドでは、 SafeKit <span class="notranslate farm-term" translate="no">Farm</span> （ <span class="notranslate farm-term" translate="no">Farm</span>モジュール、仮想IPアドレスによる負荷分散）がネットワーク内で正しく動作していることを確認する方法、つまり、ノード間での接続の分散、およびディスパッチノードが停止したときの仮想IP （ VIP ）の再ルーティングについて説明します。

## 1. 基本原則

**前提条件：** <span class="notranslate farm-term" translate="no">Farm</span>のすべてのノードは、同じレイヤ2 IPサブネット（ LAN 、またはリモートサイト間で拡張されたVLANに属している必要があります。

- 仮想IP （ VIP ）は、 <span class="notranslate farm-term" translate="no">Farm</span>の各ノードでローカルに設定されます。つまり、ノード上で<span class="notranslate farm-term" translate="no">Farm</span>が起動される際に、そのアドレスのネットワークカード上で、物理IPアドレスのエイリアスとして設定されます。
- 単一のノードである**ディスパッチングサーバーは**、仮想IP （ VIP ）（ `vmac_directed`構成、 SafeKitデフォルト）のネットワークトラフィックを受信します。そのMACアドレスは、 ARPテーブル（ルーター、ゲートウェイ、同じサブネット内のクライアント）で仮想IP （ VIP ）に関連付けられているものです。
- このノードのカーネルフィルタは、パケットの**宛先MACアドレスを処理ノードのMACアドレスに書き換える**ことで、 TCP接続を<span class="notranslate farm-term" translate="no">Farm</span>内のノードに分散します（宛先IPアドレスは仮想IP （ VIP ）のままです）。応答は、接続を処理するノードからクライアントに直接送信されます。
- フィルタによる分散処理は**決定論的**である。処理ノードは、設定された負荷分散ルールに従って、クライアントのIDから計算される。
  - **クライアントのIPアドレス**( `filter="on_addr"` ): 特定のクライアントは常に同じノードによってサービスされ、セッションの親和性が保証されます。
  - **クライアントのTCPポート**（ `filter="on_port"` ）において、同じクライアントからの各TCP接続は、異なるノードによって処理される可能性があります。これはモザイク図（セクション2）で使用されるルールであり、そのため単一のワークステーションからのすべてのノードが表示されます。
- ディスパッチサーバーが停止した場合、別のノードがこの役割を引き継ぎ、 **GARPs** （Gratuitous ARP ）を送信して、ネットワークが仮想IP （ VIP ）を自身のMACアドレスに関連付けます。

したがって、テストする必要があるのは以下のとおりです。

1. 接続がすべてのノードに正しく分散されていること。
2. ネットワーク（ルーター、ゲートウェイ、仮想化）が、ディスパッチサーバーが変更される際にGARPを考慮に入れること。

## 2. 前提条件： SafeKitモザイク

このモザイク画像は、 SafeKitが提供するテストページです。仮想IP （ VIP ）に対して多数のTCP接続を開き、それぞれの接続に対して応答したノードの名前を表示します。これにより、ネットワークの分布状況を一目で把握できます。

1. <span class="notranslate farm-term" translate="no">Farm</span>モジュールの`userconfig.xml`ファイルの`<vip>`セクションで、 SafeKitウェブサーバーのポートにロードバランシングルールを追加します。HTTPポート9010でSafeKitウェブサーバーを使用する場合の例を以下に示します。

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   SafeKit WebサーバーとコンソールがHTTPSに切り替えられた場合は、9010を9453に置き換えてください。

2. すべてのノードに設定を適用してください。
3. **<span class="notranslate farm-term" translate="no">Farm</span>外の**クライアントワークステーションのブラウザから、以下に接続します。

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   次に、 <span class="notranslate farm-term" translate="no">Farm</span>**モジュール名**を入力してテストを実行します。モザイクの各セルには、 TCP接続に応答したノードの名前が表示され、各ノードには色が割り当てられているため、同じノードによって提供されるモザイクのブロックが明確に示されます。

   HTTPSでは、 `https://<VIP>:9453/safekit/mosaic.html`を使用し、ポート9453にロードバランシングルールを設定します。

![モザイクを使用してSafeKit <span class="notranslate farm-term" translate="no">farm</span>の仮想IPアドレスをテストします](/wp-content/uploads/2024/03/appli-19.png)

「 [ SafeKit <span class="notranslate farm-term" translate="no">farm</span>ソリューションのデモンストレーション](/ja/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/#demonstration-of-the-safekit-farm-solution) 。

## 3. テスト1 – 接続の分布

**手順**

1. すべてのノードで<span class="notranslate farm-term" translate="no">Farm</span>を開始します（ UP状態）。
2. クライアントワークステーションからモザイクを開きます。

**期待される結果：**モザイク画像には、 <span class="notranslate farm-term" translate="no">Farm</span>の**すべてのノード**の名前が表示され、各処理ノードは異なる色で表示されます。

これは、上流のルーターまたはゲートウェイがMACアドレスを介していずれかのノードに到達し、そのノードが接続を正しく分配していることを証明しています。

## 4. テスト2 – ディスパッチサーバーの変更

このテストは、ディスパッチングサーバーが停止した場合でも、 <span class="notranslate farm-term" translate="no">Farm</span>が応答し続けることを確認します。

**手順**

1. <span class="notranslate farm-term" translate="no">Farm</span>を停止します。つまり、 SafeKit内のすべてのノードを停止します。
2. **単一のノード**を起動します。このノードがディスパッチサーバーになります。
   →**期待される結果：**モザイクにはこのノードのみが表示されます。
3. 他のノードを起動します。
   →**期待される結果：**モザイクにすべてのノードが表示される。
4. **最初のノード**、つまりディスパッチサーバーとして機能しているノードを停止します。
   →**期待される結果：**モザイクには残りのノードが表示されます。

> **このテストの制限事項：**ステップ4で正しい結果が得られたとしても、 GARP正しく機能していることを証明できるわけではありません。他のノードで<span class="notranslate farm-term" translate="no">Farm</span>モジュールが起動されると（ステップ3）、これらのノードに仮想IPアドレスが設定され、ネットワーク上で仮想IPアドレスとMACアドレスの関連付けを既に再ルーティングしている可能性のあるメッセージが生成されます。GARP GARP実際にテストするのは、テスト3とテスト4のみです。

> <span class="notranslate farm-term" translate="no">Farm</span>内の他のノード（ディスパッチサーバー以外のノード）を停止しても、ディストリビューションの再構成のみがテストされます。

## 5. テスト3 – `arp -a`によるGARPリルーティングの確認

このテストはテスト4と合わせて、 GARP実際にチェックします。ディスパッチングサーバーを停止する前にMACアドレスを記録し、その後、仮想IP （ VIP ）とMACアドレスの関連付けが変更されていることを確認します。

このテストは、モザイクを表示するクライアントワークステーションが<span class="notranslate farm-term" translate="no">Farm</span>と**同じIPサブネット**にある場合にのみ可能です。

クライアントと<span class="notranslate farm-term" translate="no">Farm</span>の間にルーターが存在する場合、クライアントのARPテーブルには仮想IP （ VIP ）ではなく、 <span class="notranslate farm-term" translate="no">Farm</span>のネットワークに到達するために使用されるゲートウェイのアドレスが含まれます。その場合は、ネットワークチームと協力してルーターまたはゲートウェイのARPテーブルを確認してください。

**手順**

1. すべてのノードで<span class="notranslate farm-term" translate="no">Farm</span>を開始します。
2. クライアントワークステーションで、 `arp -a`を実行し、仮想IP （ VIP ）に関連付けられたMACアドレスをメモしてください。これにより、ディスパッチサーバーが特定されます。
3. このMACアドレスを持つ<span class="notranslate farm-term" translate="no">Farm</span>ノードを停止してください。
4. モザイクが残りのノードでも正常に機能することを確認してください。
5. 新しい仮想IP （ VIP ）/ MACアドレスの関連付けを読み取り、新しいディスパッチサーバーを特定するには、再度`arp -a`実行します。

## 6. テスト4 – Wireshark （ Windows ）またはtcpdump （ Linux ）を使用したエンドツーエンドチェック

クライアントと<span class="notranslate farm-term" translate="no">Farm</span>ノードでパケットをキャプチャすることで、仮想IP （ VIP ）へのTCP接続を追跡できます。Windows WindowsではWiresharkを、 Linuxマシンではtcpdumpを使用します。

**パケットMAC** IPアドレスだけでなく、MAC（イーサネット）ヘッダーも確認する必要があります。ディスパッチサーバーのカーネルフィルタは、パケットの**宛先MACアドレスを処理ノードのMACアドレスに書き換える**ことで接続を分散します。宛先IPアドレスは、経路全体を通して仮想IP （ VIP ）のままです。

**同じSYNパケットで注意すべき点：**

| ステップ | どこで撮影するか | 観測されたMACアドレス |
|---|---|---|
| 1. クライアントは仮想IP （ VIP ）に送信します | クライアント | クライアントMAC →**ディスパッチサーバー**のMAC |
| 2. ディスパッチサーバーが接続を転送する | ディスパッチサーバー | MACディスパッチ →**処理ノード**のMAC |
| 3. 処理ノードは | 処理ノード | MACのディスパッチ → ノードMAC |
| 4. ノードはクライアントに直接応答する | 処理ノード | ノードMAC → クライアントMAC |
| 5. クライアントは回答を受け取ります | クライアント | ノードMAC → クライアントMAC |

> クライアントワークステーションが<span class="notranslate farm-term" translate="no">Farm</span>とは異なるサブネットにある場合、 <span class="notranslate farm-term" translate="no">Farm</span>ノードに表示される「クライアントMAC 」は、クライアントワークステーションのMACアドレスではなく、2つのサブネットを接続する**ゲートウェイ**（ルーター）のMACアドレスです。

ディスパッチングサーバーを停止した後、キャプチャを繰り返します（テスト2、ステップ4）。ステップ1には、**新しい**ディスパッチングサーバーのMACアドレスが表示されるはずです。

## 7. どのワークステーションからテストを行うか

動作は、クライアントと<span class="notranslate farm-term" translate="no">Farm</span>間のネットワークパスによって異なります。アーキテクチャに関連する各タイプのクライアントから、テスト1とテスト2を実行してください。

| クライアントの所在地 | テストで確認する内容 |
|---|---|
| <span class="notranslate farm-term" translate="no">Farm</span>と**同じサブネット**内のクライアント | GARPによるクライアントのARPテーブルの更新（テスト3が可能） |
| **別のサブネット**（ルーター、ゲートウェイ、ハイパーバイザー仮想ネットワーク）内のクライアント | ルーターまたはゲートウェイによるGARP処理 |
| **<span class="notranslate farm-term" translate="no">Farm</span> VMもホストするハイパーバイザー上の**クライアントVM | ハイパーバイザの仮想スイッチの動作。仮想スイッチは内部スイッチングとルーティングも処理する。 |

## 8．期待される結果の概要

| テスト | アクション | 期待される結果 |
|---|---|---|
| 1 | すべてのノードUP 、モザイク | すべてのノードが表示されます |
| 2.2 | 単一ノードが起動しました | このノードのみが表示されます |
| 2.3 | すべてのノードが起動しました | すべてのノードが表示されます |
| 2.4 | ディスパッチサーバーが停止しました | 残りのノードは、永続的な中断なく出現する。 |
| 3 | 停止前と停止後の`arp -a` | 仮想IP （ VIP ）に関連付けられたMACアドレスが変更されます |
| 4 | 停止前後のWiresharkまたはtcpdumpキャプチャ | クライアントは新しいディスパッチサーバーのMACアドレスにメッセージを送信します。 |

## 9. トラブルシューティング

- **ロードバランシングビットマップ:**テストとロードバランシングビットマップの詳細については、 SafeKit 8.2 ユーザーガイドのセクション 4.3.5「 [仮想IPアドレスでのTCPロードバランシングのテスト](https://safekit.eviden.com/resources/safekit-user-guide-82/#Mosaic) 」を参照してください。
- **ディスパッチングサーバーが停止した後、モザイクが応答しなくなります。**経路上のデバイス（ルーター、ゲートウェイ、仮想スイッチ）がGARP考慮していないためです。ネットワークチームにGARP処理状況を確認してください。
- **GARPの定期送信:** `<vip>`セクションの`arpreroute="on"`属性 ( `arpinterval`と`arpelapse`含む) は、VIP 上でGARPs定期的に送信します。ユーザー ガイドのセクション 13.6.4 " [ `<vip>`構文](https://safekit.eviden.com/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) " を参照してください。
- **仮想IP ( VIP ) ↔ MAC解決の診断:**ユーザー ガイドのセクション 7.24「 [仮想IP ( VIP ) ↔ MAC解決のトラブルシューティング](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Issue_with_VIP) 」およびセクション 7.15「 [ <span class="notranslate farm-term" translate="no">Farm</span>モジュールはUP ( Ready ) だが、 <span class="notranslate farm-term" translate="no">Farm</span>での負荷分散に問題あり](<https://safekit.eviden.com/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>) 」を参照してください。

## SafeKit <span class="notranslate farm-term" translate="no">farm</span>ソリューションのデモンストレーション{#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ja  %}}

仮想IPアドレスを使用したプライマリ/バックアップのフェイルオーバーについては、 [ SafeKit mirrorクラスタの仮想IPアドレスのテスト](/ja/best-practises/test-primary-backup-vip-mirror/)を参照してください。

{{%  insert-safekit-4-buttons-ja  %}}
