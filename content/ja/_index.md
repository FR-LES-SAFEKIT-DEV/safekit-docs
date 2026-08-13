---
title: "SafeKit：オールインワンの SANレス高可用性（HA）＆ アプリケーション・クラスタリング・ソフトウェア"
slug: "high-availability-software-for-application-clustering"
canonical: "https://safekit.eviden.com/ja/"
description: "SafeKit：オールインワンの SANレス高可用性（HA）＆ アプリケーション・クラスタリング・ソフトウェア"
category: "home"
lang: "ja"
topics: "SafeKitとは？, 🔍 SafeKit 高可用性ナビゲーションハブ, シンプルでコスト効率の高い高可用性（HA）に SafeKit が選ばれる理由, SafeKit の活用事例, なぜオールインワンの SANレス高可用性製品が不可欠なのか？, 高可用性戦略の選択：VM HA と Application HA, SafeKit 高可用性（HA）の制限事項, SafeKit テクニカル・フェイルオーバー チュートリアル ＆ デモ, SafeKit ミラークラスター（mirror cluster）は Windows/Linux とどのように連動しますか？, ファームモードのSafeKitクラスターは、Windows/Linux とどのように動作しますか？, SafeKit と従来の高可用性 (HA) クラスターの比較, アーキテクチャの差別化要因: SafeKit ソフトウェア定義クラスター vs. ハードウェア HA クラスター, SafeKit ミラークラスターの主要な差別化要因, SafeKit ファームクラスターの主な差別化要因, VM 高可用性：SafeKit の SAN レス HA と Hyper-V/VMware HA の比較, SafeKit HA 無料トライアル ＆ 技術ドキュメント, SafeKit アプリケーションモジュールライブラリ：すぐに使える HA ソリューション"
---

# SafeKit：オールインワンの SANレス高可用性（HA）＆ アプリケーション・クラスタリング・ソフトウェア

## SafeKitとは？

**SafeKit** は、リアルタイムの**ホストベース複製（レプリケーション）** 、自動**フェイルオーバー** 、および**ロードバランシング** を単一のパッケージに統合し、アプリケーションの100%の稼働率を保証する**オールインワンの高可用性（HA）ソフトウェア** ソリューションです。

**SafeKit** は、標準的なサーバー間でデータを同期させることで、高価な共有ストレージ（SAN）や特別なITスキルを不要にします。WindowsおよびLinux環境において、**企業向けデータベース** （SQL Serverなど）、**重要セキュリティシステム** （Milestone XProtect ビデオ管理ソフトウェアなど）、および**SCADA産業用制御ソフトウェア** （Siemensアプリケーションなど）を保護するための、シンプルでコスト効率の高い手法を提供します。

<img src="/safekit-docs/wp-content/uploads/2026/04/safekit-icon-512x512-1.png" width="128" alt="Evidian SafeKit 公式ロゴ - 高可用性 (HA) および SANレス アプリケーション クラスタリング ソフトウェア">

<!-- BEGIN INSERT: insert-safekit-4-buttons-en lang="ja" display="content" -->
<div class="button-row">
  <a class="btn-action" href="https://safekit.eviden.com/contact-us-for-safekit/">🧑 お問い合わせ</a>
  <a class="btn-action" href="/safekit-docs/resources/safekit-free-trial/">🎁 評価版のダウンロード</a>
  <a class="btn-action" href="https://training.my.evidian.com/mod/page/view.php?id=712">🏅 無料認定</a>
  <a class="btn-action" href="https://safekit.eviden.com/get-a-quote-safekit/">💰 永久ライセンス費用</a>
</div>
<!-- END INSERT: insert-safekit-4-buttons-en lang="ja" display="content" -->

<!-- BEGIN INSERT: insert-safekit-hub-en lang="ja" display="content" -->

## 🔍 SafeKit 高可用性ナビゲーションハブ {#hub}

**SafeKit の探索：機能、技術ビデオ、ドキュメント、無料トライアル**

| リソースタイプ             | 説明                                                                               | ダイレクトリンク                                                                                                                                                                                   |
| -------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **主な機能**               | シンプルでコスト効率の高い高可用性に SafeKit が選ばれる理由                        | [SafeKit が選ばれる理由を見る](/safekit-docs/ja/#why-choose-safekit-for-ha "シンプルでコスト効率の高い高可用性を実現する SafeKit の機能を見る")                                                    |
| **ユースケース**           | SafeKit が重要インフラの高可用性をどのように確保するかをご覧ください               | [すべてのユースケースを見る（OEMソフトウェア、エッジサーバー、SCADA、など）](/safekit-docs/ja/#safekit-use-cases "SafeKit の高可用性ユースケースを見る")                                           |
| **導入モデル**             | オールインワンの SANレス HA：共有ディスク不要のソフトウェアクラスタリング          | [SafeKit オールインワン SANレス HA を見る](/safekit-docs/ja/#all-in-one-sanless-ha "共有ディスク不要のオールインワン SANレス高可用性について学ぶ")                                                 |
| **HA 戦略**                | SafeKit：インフラ（VM）レベル vs. アプリケーションレベルの高可用性                 | [SafeKit HA と冗長性：VM vs. アプリレベルを見る](/safekit-docs/ja/#safekit-ha-redundancy-choices "VM レベルの冗長性と SafeKit のアプリケーションレベル高可用性戦略を比較する")                     |
| **技術仕様**               | SafeKit クラスタリングの技術的制限事項                                             | [SafeKit 高可用性の制限事項を見る](/safekit-docs/ja/#safekit-ha-limitations "SafeKit アプリケーションクラスタリングの技術要件と制限事項")                                                          |
| **概念実証（PoC）**        | SafeKit：高可用性構成とフェイルオーバーのデモ                                      | [SafeKit フェイルオーバーチュートリアルを見る](/safekit-docs/ja/#safekit-failover-tutorials "インストールから自動フェイルオーバーまで、SafeKit 高可用性に関するステップバイステップビデオ")        |
| **アーキテクチャ**         | SafeKit ミラークラスターの仕組み（リアルタイムレプリケーションとフェイルオーバー） | [SafeKit ミラークラスター：リアルタイム複製とフェイルオーバーを見る](/safekit-docs/ja/#safekit-mirror-cluster "SafeKit ミラークラスターの技術アーキテクチャとフェイルオーバーメカニズムを見る")    |
| **アーキテクチャ**         | SafeKit ファームクラスターの仕組み（ネットワーク負荷分散とフェイルオーバー）       | [SafeKit ファームクラスター：負荷分散とフェイルオーバーを見る](/safekit-docs/ja/#safekit-farm-cluster "ネットワーク負荷分散を備えた SafeKit ファームクラスターアーキテクチャの技術概要")           |
| **競争優位性**             | 比較：SafeKit vs. 伝統的な高可用性（HA）クラスター                                 | [SafeKit と伝統的 HA クラスターの比較を見る](/safekit-docs/ja/#safekit-ha-comparison "SafeKit ソフトウェアと従来のハードウェアベース HA クラスターの詳細比較")                                     |
| **技術リソース**           | SafeKit 高可用性：ドキュメント、ダウンロード、トライアル                           | [SafeKit HA 無料トライアルと技術ドキュメントを見る](/safekit-docs/ja/#safekit-ha-technical-resources "SafeKit の無料トライアル、技術ドキュメント、高可用性ホワイトペーパーにアクセスする")         |
| **構成済みソリューション** | SafeKit アプリケーションモジュールライブラリ：すぐに使える HA ソリューション       | [SafeKit 高可用性アプリケーションモジュールを見る](/safekit-docs/ja/#safekit-ha-application-modules "自動アプリケーションフェイルオーバーのための構成済み SafeKit モジュールライブラリを閲覧する") |

<!-- END INSERT: insert-safekit-hub-en lang="ja" display="content" -->

<!-- BEGIN INSERT: insert-safekit-feature-en lang="ja" display="content" -->

## シンプルでコスト効率の高い高可用性（HA）に SafeKit が選ばれる理由 {#why-choose-safekit-for-ha}

### SafeKit の機能は何ですか？

SafeKit は、単一のソフトウェア製品で Windows および Linux 向けに以下の機能を提供します。

- **ロードバランシング（負荷分散）**
- **同期リアルタイム・ファイルレプリケーション**
- **アプリケーションの自動フェイルオーバー**
- **サーバ障害後の自動フェイルバック**

### SafeKit の設定には特別なスキルが必要ですか？

いいえ。SafeKit は導入が非常にシンプルであり、高度な専門知識は必要ありません。

### SafeKit を使用するために追加のハードウェアが必要ですか？

いいえ。SafeKit は既存のサーバ、仮想マシン、またはクラウド上で動作します。共有ディスクや SAN ストレージは不要です。

### SafeKit のほかに、別途ソフトウェアライセンスが必要ですか？

いいえ。SafeKit は標準的な Windows および Linux エディションで動作し、データベースの Enterprise エディション等のライセンスも必要ありません。

### SafeKit はどのような課題を解決しますか？

SafeKit は以下の問題を解決します：

- ハードウェア障害（問題の20%）：コンピュータ室全体の完全な停止を含みます。
- ソフトウェア障害（問題の40%）：重要なプロセスの再起動を含みます。
- ヒューマンエラー（問題の40%）：その使いやすさにより、操作ミスを防止します。

### SafeKit はどのようなアプリケーションをサポートしていますか？

以下に対して、リアルタイム・レプリケーションとフェイルオーバーを実装できます：

- あらゆる種類のアプリケーション、ファイルディレクトリ、およびサービス
- データベース
- Hyper-V または KVM の仮想マシン全体
- Docker、Podman、およびクラウドアプリケーション

### SafeKit はどのようにコストを削減しますか？

SafeKit は、以下の要件を不要にすることでコストを削減します：

- ネットワークロードバランサや専用プロキシサーバー
- 共有ディスクやレプリケーション機能付き SAN ストレージ
- オペレーティングシステムやデータベースの Enterprise エディション
- 専門的なクラスターメンテナンススキル

### SafeKit 高可用性ソリューションの価格体系とライセンスについて教えてください。

**SafeKit** は、CPUコア数やソケット数に関わらず、サーバー台数のみに基づいた透明性が高くコスト効率の良い**ノード単位のライセンスモデル** を採用しています。継続的なサブスクリプションを義務付ける多くの競合他社とは異なり、SafeKit は**永久ライセンス** を提供しており、総所有コスト（TCO）を抑え、長期的なソフトウェア資産としての運用を可能にします。

- **追加費用なし：** すべての [プリセット済み HA アプリケーションモジュール](/safekit-docs/ja/#safekit-ha-application-modules "無料の SafeKit HA アプリケーションモジュールを見る")は無償で提供されます。
- **リスクフリーの評価：** お客様の環境でフェイルオーバーとレプリケーションをテストするために、[30日間無料トライアル](/safekit-docs/ja/#safekit-ha-technical-resources "SafeKit 30日間無料トライアルをダウンロード")をダウンロードいただけます。
- **個別見積もり：** お客様固有の高可用性要件に合わせた**[お見積もりについては、こちらからお問い合わせください](https://safekit.eviden.com/contact-us-for-safekit/ "SafeKit の個別見積もりを依頼する")** 。

<!-- END INSERT: insert-safekit-feature-en lang="ja" display="content" -->

<!-- BEGIN INSERT: insert-safekit-use-cases-en lang="ja" display="content" -->

## SafeKit の活用事例 {#safekit-use-cases}

### SafeKit OEM版

アプリケーションに高可用性を提供することで、サービスの継続性を確保し、ダウンタイムのリスクを軽減して顧客の信頼を高めることができます。これによりビジネス価値が向上し、標準的なインフラストラクチャ上で重要な業務を中断することなく実行できるようになります。

<img src="/safekit-docs/wp-content/uploads/2026/05/safekit-for-oem-512-512.jpg" alt="SafeKit for OEM">

高可用性オプションとして、SafeKitをカタログに追加してください。アプリケーションに合わせたソフトウェアのみのソリューションで、共有ストレージなどの隠れたコストはなく、ハードウェアに完全に依存しません。物理、仮想、クラウド環境に展開可能で、シンプルなプラグアンドプレイ管理を実現します。

### SafeKit エッジ版

エッジの現場にはデータセンターや高可用性（HA）の専門知識がないことが多くありますが、事業継続性は極めて重要です。SafeKit は、工場、石油プラットフォーム、船舶、ビルセキュリティ、航空管制、5G ネットワーク、ヘルスケア、小売などのエッジアプリケーションの稼働を維持します。

<img src="/safekit-docs/wp-content/uploads/2026/05/safekit-edge-512-512.jpg" alt="SafeKit for Edge">

SafeKit は、2台の標準的なエッジサーバー（ブランド不問）を、プラグアンドプレイの HA クラスターに変身させます。共有ストレージや SAN は不要です。軽量なスタックひとつで、リアルタイムのレプリケーションと自動フェイルオーバー（ロードバランシングも含めることが可能）を実現し、インストールと管理も簡単です。

### VMS向けSafeKit

ビデオ管理ソフトウェア（VMS）は公共の安全において極めて重要です。ライブ映像やアーカイブ映像を記録・表示することで、警備担当者は事件や事故に即座に対応できるようになります。VMSのいかなる停止も、人命や資産を直接的なリスクにさらすことにつながります。

<img src="/safekit-docs/wp-content/uploads/2026/05/safekit-vms-512-512.jpg" alt="SafeKit for VMS">

SafeKitは、サーバーやソフトウェアの障害時でもライブストリームや録画データへの継続的なアクセスを維持し、ビデオ損失や監視の空白を防ぎます。**Milestone、Genetec、Hanwha** などの主要なVMSプラットフォームとシームレスに統合し、最も重要な瞬間に監視体制を維持します。

### EACS向けSafeKit

電子アクセス制御システム（EACS）は物理的セキュリティに不可欠であり、ドア、バッジ、リーダー、センサーを通じてプライベートで機密性の高いエリアへのアクセスを制御・監視します。システムのいかなる停止も、人、建物、資産を即座に侵入の危険にさらすことになります。

<img src="/safekit-docs/wp-content/uploads/2026/05/safekit-eacs-512-512.jpg" alt="SafeKit for EACS">

SafeKitは単一障害点を排除することで、アクセス制御の判断、アラーム、および資格情報（クレデンシャル）を常に利用可能な状態に保ちます。**Hirsch Microsesame、Nedap AEOS、Siemens SiPass** などのEACSソリューションに復元力の高い運用を提供し、インフラ障害が発生しても安全なアクセスを保証します。

### SCADA向けSafeKit

SCADA（監視制御およびデータ収集）システムは産業環境の中核を担い、センサー、バルブ、ポンプ、モーター、およびヒューマンマシンインターフェース（HMI）を通じて、オペレーターが重要なプロセスを監視・制御することを可能にします。

<img src="/safekit-docs/wp-content/uploads/2026/05/safekit-scada-512-512.jpg" alt="SafeKit for SCADA">

SafeKitは、**Probatのコーヒー焙煎機やALSTEFの手荷物仕分け機** などを動かすSCADA制御システムが、ハードウェアやソフトウェアの障害に関わらず稼働し続けることを保証し、生産ダウンタイムを最小限に抑えます。これにより、オペレーターは常に産業プロセスの完全な可視化と制御を維持でき、多大なコストを伴う停止や安全リスクを防ぐことができます。

### BMS向けSafeKit

ビル管理システム（BMS）は近代的な建物の中核であり、空調（HVAC）、配電、照明、火災安全、および給排水システムの自動制御を提供します。システムのいかなる停止も、居住者の安全、快適性、およびビル運営に直接的な影響を及ぼす可能性があります。

<img src="/safekit-docs/wp-content/uploads/2026/05/safekit-bms-512-512.jpg" alt="SafeKit for BMS">

SafeKitは、障害が発生した場合でもBMSサービスを透過的に実行し続けることで、ビルオートメーションを保護します。**Siemens Desigo CC、Bosch BIS** 、および関連システムをサポートし、安全で効率的、かつ中断のないビル運営を維持します。

### ATC向けSafeKit

航空管制（ATC）システムは航空安全の要であり、監視、誘導、および制御アプリケーションを通じて、地上および空中における航空機の動きをリアルタイムで監視・制御することを可能にします。

<img src="/safekit-docs/wp-content/uploads/2026/05/safekit-atc-512-512.jpg" alt="SafeKit for ATC">

SafeKitは、管制官が重要なエアサイド・アプリケーションへ中断なくアクセスすることを保証し、ATCシステムのレジリエンス（回復力）を強化します。**ADB SafeGate** などのATCおよび空港ソリューションで使用されており、あらゆる条件下で安全かつ継続的な航空交通運用をサポートします。

### OCC向けSafeKit

運行指令所（OCC）は近代的な地下鉄ネットワークの中核であり、列車の運行、電力供給、信号、旅客案内、およびインシデント管理の監視を一元化しています。自動運転（ドライバーレス）の地下鉄路線において、OCCは運行制御の唯一の拠点となります。

<img src="/safekit-docs/wp-content/uploads/2026/05/safekit-occ-512-512.jpg" alt="SafeKit for OCC">

SafeKitは、障害発生時でもOCCアプリケーションの可用性を維持することで、中断のない地下鉄監視を確実にします。**パリの自動無人運転地下鉄路線** の運行指令所をサポートしており、乗務員に頼ることなく、継続的なサービス提供と迅速なインシデント対応を可能にします。

<!-- END INSERT: insert-safekit-use-cases-en lang="ja" display="content" -->

<!-- BEGIN INSERT: insert-safekit-sanless-en lang="ja" display="content" -->

## なぜオールインワンの SANレス高可用性製品が不可欠なのか？ {#all-in-one-sanless-ha}

ビジネス継続性の世界において、多くの組織は「バックアップ」や「データ複製ツール」を持っていることが、**高可用性（HA）** を実現していることと同じであると誤解しがちです。しかし実際には、これらはパズルのピースの一部に過ぎません。真に100%の稼働率を保証するには、フェイルオーバープロセスのあらゆる階層を統合したオールインワンのソリューションが必要です。

ここでは、断片的なアプローチがなぜ失敗するのか、そしてなぜ**ファイルレベルのホストベース複製** を利用する **SafeKit** のような統合型オールインワン製品が必要とされるのか、その理由を解説します。

### ホストベースのレプリケーションだけで高可用性を実現できますか？

いいえ。データレプリケーション（複製）は、単にサーバーAからサーバーBへデータをコピーする行為に過ぎません。レプリケーションは重要ですが、それ自体が高可用性を提供するわけではありません。HAスタックの他のコンポーネントがなければ、レプリケーションは単なる「パッシブコピー（受動的なコピー）」であり、活用するには手動での時間のかかる介入が必要になります。

- サーバーAがクラッシュしても、データレプリケーションソフトは自動的にユーザーの接続先をサーバーBに切り替えることはありません。
- アプリケーションが停止したことを検知することもありません。
- サービスを再起動することもありません。

### 断片的なソリューションに潜むリスク：なぜサイロ化された HA は失敗を招くのか

多くのベンダーは、**ホストベースのレプリケーション** 、**フェイルオーバー** 、および**ロードバランシング** を実現するために、複数の異なる製品を「つなぎ合わせる」ことを要求します。このような断片的なアーキテクチャは、ミッションクリティカルなシステムにとって危険な戦略です。

- **脆弱な統合：** レプリケーションに製品A、クラスタリングに製品Bを使用すると、いわば「積み木」のような不安定な状態になります。OSのアップデートやセキュリティパッチの適用ごとに、これら独立したエンジン間の脆弱な通信リンクが切断されるリスクが生じます。
- **高い認知負荷とヒューマンエラー：** 複数のインターフェースを管理することは、ミスを誘発します。システム障害というプレッシャーのかかる状況下で、問題診断のために異なるGUIを行き来したり、異なるCLI構文を使用したりすることは、混乱を招き、ダウンタイムの延長につながります。
- **ベンダー間の責任転嫁：** フェイルオーバーが失敗した際、レプリケーション担当ベンダーがクラスタリングツールを非難するといった事態が起こり得ます。その結果、ユーザーは解決策が見えないまま板挟みになります。オールインワン・ソリューションであれば、責任の所在が明確になります。
- **複雑なメンテナンス：** 断片的なシステムは、個々のコンポーネントごとに専門的なスキルを必要とします。そのため、メンテナンスが困難になり、時間の経過とともに維持コストが大幅に増大します。

### データ以外に、真の SANレス・フェイルオーバーにはどのようなコンポーネントが必要ですか？

リカバリを自動化し、ダウンタイムを排除するために、オールインワン製品は以下の複数の技術的要素を同時に管理する必要があります。

- **ホストベース・レプリケーション：** 共有ストレージ（SAN）に依存せず、サーバー間で重要なアプリケーションデータをリアルタイムかつ同期的に複製します。これにより、データ損失ゼロ（RPO=0）を保証し、高価なハードウェアへの依存を排除します。
- **仮想IPアドレス (VIP)：** ユーザーに対して単一の接続ポイントを提供します。障害発生時、ソフトウェアが VIP を障害ノードから正常なノードへ移動させるため、ユーザーは設定を変更する必要がありません。
- **ハードウェアおよびソフトウェアのエラー検知：** 物理サーバーと特定のソフトウェアプロセスの両方を常に「ハートビート」監視し、ハングアップやクラッシュを即座に特定します。
- **カスタマイズ可能な起動スクリプト：** アプリケーションによって起動方法は異なります。オールインワンツールでは、カスタムスクリプトを使用して、複雑なサービスを正しい順序で確実に起動させることができます。
- **自動フェイルオーバー：** 人の手を介さず、あるサーバーから別のサーバーへの移行プロセス全体をオーケストレーション（調整）するインテリジェンスです。

### なぜフェイルオーバー・メカニズムはホストベース・レプリケーションと同期していなければならないのですか？

フェイルオーバー・マネージャーとデータ・レプリケーションが別々の製品である場合、それらは「同期」していない可能性があります。

**潜む危険性：** フェイルオーバーが発生しても、レプリケーションによる最新データの送信が完了していない場合、サーバーBは古いデータや破損したデータでアプリケーションを起動してしまいます。

**オールインワンの SANレス HA ソリューション** は、フェイルオーバー・メカニズムがレプリケーションの状態を常に把握していることを保証します。データが最新であることが保証されている場合にのみ、バックアップノードでのアプリケーションの起動を許可するため、アクティブノードの競合やデータの損失を防ぐことができます。

### 障害が発生したサーバーが修理された後（フェイルバック）はどうなりますか？

技術ガイドでは見落とされがちで、従来の HA ソリューションでは不十分に実行されることも多い「自動フェイルバック」ですが、真のレジリエンス（回復力）を実現するためには最も重要な要件です。真のオールインワン製品は、障害時と同様に「通常状態への復帰」をスマートに処理します。障害が発生したサーバーがオンラインに戻った時点では、データが最新ではありません。そのため、HA ソフトウェアは以下の処理を行う必要があります。

1. 稼働中のノードから復旧したノードへ、バックグラウンドで**データを再同期** します。
2. **稼働時間を維持：** この再同期は、稼働中のノードで実行されているアプリケーションを中断することなく行われなければなりません。
3. **冗長性の回復：** データのミラーリング（同期）が完了すると、クラスターは自動的に保護状態に戻り、次のイベントに備えます。

### ブロックレベル vs ファイルレベル・レプリケーション：なぜ「透過性」が重要なのか

**ホストベース・レプリケーション** に採用されている技術的手法は、既存のアプリケーション設定をどの程度変更する必要があるかに大きく影響します。

- **ブロックレベル・レプリケーションの課題：** 多くの SANレス・ソリューションは、ディスク/ブロックレベルで複製を行います。これはアプリケーションにとって**透過的ではありません** 。データを特定の、新しく作成された「複製用ディスク」ボリュームに移動させるために、アプリケーションを完全に再構成する必要があります。これには多くの場合、複雑な移行作業やアプリケーションロジックの変更が伴います。
- **SafeKit ファイルレベルの優位性：** SafeKit は**ファイルレベルでホストベース・レプリケーション** を行うため、アプリケーションに対して完全に透過的です。データを特別なディスクに移動させる必要はありません。既存のアプリケーションフォルダを複製するように SafeKit を設定するだけです。これらのフォルダは**システムディスク** 上に置いたままでも運用できるため、アプリケーションが既にインストールされている場所でそのまま保護することが可能です。

<!-- END INSERT: insert-safekit-sanless-en lang="ja" display="content" -->

<!-- BEGIN INSERT: insert-vm-vs-app-ha-en lang="ja" display="content" -->

## 高可用性戦略の選択：VM HA と Application HA {#safekit-ha-redundancy-choices}

SafeKit は、業務継続性を確保するために 2 つの主要なアプローチを提供します。すなわち、仮想マシンの高可用性（VM HA）とアプリケーション高可用性（Application HA）です。どちらの方法も自動フェイルオーバー機能を提供しますが、適用範囲、データレプリケーションの仕組み、復旧速度、プラットフォーム互換性において大きく異なります。本比較ではこれらの違いを整理し、仮想化の広範なサポートを重視する場合や、細分化された高速なアプリケーション復旧を重視する場合など、特定の IT 環境に最適な戦略を判断できるようにします。

**機能比較：SafeKit VM HA と SafeKit Application HA クラスタ**

| 比較項目                   | SafeKit Hyper-V または KVM モジュールによる VM HA                                                                                                                                                                                  | SafeKit アプリケーションモジュールによる Application HA                                                                                                                                                     |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 構成図                     |                                                                                                                                                                                                                                    |
| フェイルオーバーの範囲     | 2 つのハイパーバイザー内で SafeKit を実行：仮想マシン全体をレプリケーションおよびフェイルオーバー。                                                                                                                                | 2 台の仮想または物理マシン上で SafeKit を実行：アプリケーションレベルでレプリケーションおよびフェイルオーバー。                                                                                             |
| レプリケーション対象データ | より多くのデータ（アプリケーション + OS）をレプリケーション。                                                                                                                                                                      | アプリケーションデータのみをレプリケーションし、データ量を削減。                                                                                                                                            |
| 復旧プロセスと速度（RTO）  | ハイパーバイザー 1 が停止した場合、ハイパーバイザー 2 で VM を再起動。復旧時間は OS の再起動時間に依存。VM チェックとフェイルオーバー機構を含む。                                                                                  | サーバー 1 が停止した場合、OS2 上でアプリケーションを迅速に再起動。通常は約 1 分以内（低 RTO）。アプリケーションチェックとソフトウェアフェイルオーバー。                                                    |
| インストール               | アプリケーションは 1 つの VM にのみインストール。                                                                                                                                                                                  | アプリケーションは 2 つのノードにインストール。                                                                                                                                                             |
| 構成                       | VM 上で動作するあらゆるアプリケーション / OS に対応する汎用ソリューション。 <br>• VM 内のアプリケーションの技術的な理解は不要。<br>• アプリケーションの仕組みが分からない場合に最適。<br>• VM ファイルの場所を指定するだけでよい。 | アプリケーション自体の技術的理解が必要。 <br>• 再起動が必要なサービスの特定。<br>• リアルタイムレプリケーションが必要なアプリケーションディレクトリの特定。<br>• フェイルオーバー用の仮想 IP アドレス設定。 |
| プラットフォーム互換性     | Windows/Hyper-V および Linux/KVM に対応するが、VMware には非対応。                                                                                                                                                                 | プラットフォーム非依存。物理／仮想マシン、クラウド環境、および VMware を含むあらゆるハイパーバイザーに対応。                                                                                                |
| 適した用途                 | 単一の HA ポリシーで複数 VM 上の複数アプリケーションを管理する複雑な環境に最適。                                                                                                                                                   | ハードウェアやハイパーバイザーに依存せず、ソフトウェアに高可用性を直接組み込む用途に最適。                                                                                                                  |

<!-- END INSERT: insert-vm-vs-app-ha-en lang="ja" display="content" -->

<!-- BEGIN INSERT: insert-safekit-usage-en lang="ja" display="content" -->

## SafeKit 高可用性（HA）の制限事項 {#safekit-ha-limitations}

### なぜ数テラバイトのレプリケーションが必要なのか？

障害後の再同期時間（[ステップ 3](/safekit-docs/architectures/file-replication-byte-level-with-failover-mirror-cluster/#safekit-mirror-cluster)）

- 1 Gb/s ネットワーク ≈ 1 テラバイトで約 3 時間。
- 10 Gb/s ネットワーク ≈ 1 テラバイトで約 1 時間、またはディスク書き込み性能によりさらに短縮。

#### 代替案

- 大量データの場合は、[外部共有ストレージ](/safekit-docs/best-practises/san-vs-nas-shared-storage-for-a-failover-cluster/)を使用。
- より高価で、より複雑。

### なぜレプリケーション対象が 1,000,000 ファイル未満なのか？

- 障害後の再同期時間の性能（[ステップ 3](/safekit-docs/architectures/file-replication-byte-level-with-failover-mirror-cluster/#safekit-mirror-cluster)）。
- 両ノード間で各ファイルを確認する時間。

#### 代替案

- 多数のファイルを仮想ハードディスク／仮想マシンにまとめる。
- この場合、仮想ハードディスク／仮想マシンを表すファイルのみがレプリケートおよび再同期される。

### なぜフェイルオーバー対象が 32 個以下のレプリケート VM なのか？

- 各 VM は独立したミラーモジュールで動作。
- 同一クラスタで最大 32 個のミラーモジュールが稼働可能。

#### 代替案

- 外部共有ストレージと別の VM クラスタリングソリューションを使用。
- より高価で、より複雑。

### なぜリモートサイト間に LAN/VLAN ネットワークが必要なのか？

- 同一サブネット内の 2 ノードで [仮想 IP アドレス](/safekit-docs/best-practises/how-a-virtual-ip-address-works/)の自動フェイルオーバー。
- 再同期のための十分な帯域幅（[ステップ 3](/safekit-docs/architectures/file-replication-byte-level-with-failover-mirror-cluster/#safekit-mirror-cluster)）と、[同期レプリケーション](/safekit-docs/best-practises/synchronous-replication-vs-asynchronous-replication/)に適した低レイテンシ（通常ラウンドトリップ 2ms 未満）。

#### 代替案

- 2 ノードが異なるサブネットにある場合、[仮想 IP アドレス用のロードバランサ](/safekit-docs/best-practises/how-a-virtual-ip-address-works/)を使用（SafeKit でサポート、特にクラウド環境）。
- 高レイテンシネットワークでは非同期レプリケーションを用いたバックアップソリューションを使用。

<!-- END INSERT: insert-safekit-usage-en lang="ja" display="content" -->

<!-- BEGIN INSERT: insert-safekit-videos-en lang="ja" display="content" -->

## SafeKit テクニカル・フェイルオーバー チュートリアル ＆ デモ {#safekit-failover-tutorials}

### SafeKit 動画：ウェビナー (9:43) {#demo-webinar}

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt;

#### チャプター

1. [イントロダクション](https://www.youtube.com/watch?v=UiLwzqsMxis&t=0s) (0:38)
2. [SafeKit のデモンストレーション](https://www.youtube.com/watch?v=UiLwzqsMxis&t=38s) (1:41)
3. [冗長性と高可用性（HA）ソリューションの例](https://www.youtube.com/watch?v=UiLwzqsMxis&t=139s) (2:00)
4. [Milestone と連携し世界各国で販売される SafeKit](https://www.youtube.com/watch?v=UiLwzqsMxis&t=259s) (0:49)
5. [2つのソリューションの選択：仮想マシンかアプリケーションクラスタか](https://www.youtube.com/watch?v=UiLwzqsMxis&t=308s) (2:29)
6. [際立つ独自のメリット](https://www.youtube.com/watch?v=UiLwzqsMxis&t=457s) (2:06)

[すべての動画はこちら](/safekit-docs/resources/safekit-on-line-training/)

### SafeKit：HADRの導入方法 (6:42) {#safekit-hadr}

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt;

#### チャプター

1. [ストレッチ VLAN 構成における SafeKit HADR のご紹介](https://www.youtube.com/watch?v=g5zcTjiY7T4&t=0s) (1:06)
2. [同期ミラーリングとダブル確認（Double-Acknowledgment）の仕組み (1:41)](https://www.youtube.com/watch?v=g5zcTjiY7T4&t=65s)
3. [フェイルオーバーの仕組み：Gratuitous ARP (GARP) と仮想 IP](https://www.youtube.com/watch?v=g5zcTjiY7T4&t=166s) (2:10)
4. [低速な WAN 環境向けの設計：高可用性（HA）vs. バックアップ戦略](https://www.youtube.com/watch?v=g5zcTjiY7T4&t=296s) (2:45)

[SafeKit HADRについて詳しくはこちら](/safekit-docs/best-practises/high-availability-disaster-recovery-hadr/)

### SafeKit 動画: 仮想マシンレベルのクラスタリング (5:15) {#demo-hyperv}

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt;

#### チャプター

1. [2つの Hyper-V ノードと 2台の仮想マシン](https://www.youtube.com/watch?v=foo6YKg5Dmw&t=0s) (0:49)
2. [クラスタと 2つの hyperv.safe モジュールの設定](https://www.youtube.com/watch?v=foo6YKg5Dmw&t=49s) (1:59)
3. [VM のレプリケーション、移行、クラッシュ時のフェイルオーバー起動とテスト](https://www.youtube.com/watch?v=foo6YKg5Dmw&t=168s) (2:26)

[無料トライアルはこちら](/safekit-docs/quick-install/safekit-quick-installation-guide-with-hyper-v/)

### SafeKit 動画: SQLによるアプリケーションレベルのクラスタリング (8:47) {#demo-sql}

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt;

#### チャプター

1. [SQL Server を搭載した 2つのノード](https://www.youtube.com/watch?v=T_6PsS4f9OQ&t=0s) (0:32)
2. [クラスタと mirror.safe モジュールの設定](https://www.youtube.com/watch?v=T_6PsS4f9OQ&t=32s) (3:58)
3. [SQL のレプリケーション、移行、クラッシュ時のフェイルオーバー起動とテスト](https://www.youtube.com/watch?v=T_6PsS4f9OQ&t=270s) (4:17)

[無料トライアルはこちら](/safekit-docs/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/)

### SafeKit 動画: OEM高可用性統合 (4:22) {#demo-milestone}

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt;

#### チャプター

1. [OEM 統合向け SafeKit](https://www.youtube.com/watch?v=dxiPG5ILC-0&t=0s) (0:09)
2. [OEM 設定例：Milestone XProtect](https://www.youtube.com/watch?v=dxiPG5ILC-0&t=9s) (2:18)
3. [フェイルオーバーのシナリオ解説](https://www.youtube.com/watch?v=dxiPG5ILC-0&t=138s) (1:49)
4. [まとめ：OEM 向け高可用性（HA）を製品ラインナップに追加する](https://www.youtube.com/watch?v=dxiPG5ILC-0&t=247s) (0:15)

[無料トライアルはこちら](/safekit-docs/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/)

### SafeKit 動画: ネットワーク負荷分散クラスタリング (5:03) {#demo-farm}

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt;

#### チャプター

1. [Apache を搭載した 2つのノード](https://www.youtube.com/watch?v=XSMV_eM-jgk&t=0s) (0:13)
2. [クラスタと farm.safe モジュールの設定](https://www.youtube.com/watch?v=XSMV_eM-jgk&t=13s) (2:20)
3. [ネットワーク負荷分散（ロードバランシング）、クラッシュ時のフェイルオーバー起動とテスト](https://www.youtube.com/watch?v=XSMV_eM-jgk&t=153s) (2:30)

[無料トライアルはこちら](/safekit-docs/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/)

### SafeKit 動画: 無料認定プラットフォームチュートリアル (6:11) {#demo-certification}

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt;

#### チャプター

1. [トレーニング & 資格認定プラットフォーム](https://www.youtube.com/watch?v=ijH4zXtn_3s&t=0s) (1:41)
2. [SafeKit トレーニングモジュールとは？](https://www.youtube.com/watch?v=ijH4zXtn_3s&t=101s) (1:57)
3. [SafeKit 認定資格を取得する方法](https://www.youtube.com/watch?v=ijH4zXtn_3s&t=218s) (1:40)
4. [取得した認定資格を LinkedIn で共有する](https://www.youtube.com/watch?v=ijH4zXtn_3s&t=318s) (0:53)

[トレーニングおよび認定プラットフォームはこちら](https://training.my.evidian.com/)

### SafeKit ビデオ：競合比較とクラスターアーキテクチャ (13:21) {#safekit-competition}

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt;

#### チャプター

1. [イントロダクション](https://www.youtube.com/watch?v=DKra6YVLGZk&t=0s) (4:10)
2. [仮想マシンクラスタ](https://www.youtube.com/watch?v=DKra6YVLGZk&t=250s) (1:20)
3. [ミラークラスタ](https://www.youtube.com/watch?v=DKra6YVLGZk&t=330s) (6:04)
4. [ファームクラスタ](https://www.youtube.com/watch?v=DKra6YVLGZk&t=694s) (1:46)

[SafeKit と従来の HA クラスターの比較を見る](/safekit-docs/#safekit-ha-comparison "SafeKit ソフトウェアと従来のハードウェアベース HA クラスターの詳細な比較")

### SafeKit 動画: スマートフォンでのコンソール (0:54) {#demo-console}

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt;

### SafeKit 動画: フェイルオーバー時のメール通知 (1:04) {#demo-notifications}

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt;

<!-- END INSERT: insert-safekit-videos-en lang="ja" display="content" -->

<!-- BEGIN INSERT: insert-safekit-mirror-en lang="ja" display="content" querystring="app=Windows/Linux" -->

## SafeKit ミラークラスター（mirror cluster）は Windows/Linux とどのように連動しますか？ {#safekit-mirror-cluster}

### ステップ 1. リアルタイムレプリケーション {#step1}

サーバー1（PRIM）が Windows/Linux アプリケーションを実行します。クライアントは [仮想IPアドレス](/safekit-docs/best-practises/how-a-virtual-ip-address-works/) に接続されます。SafeKitは、ファイル内に行われた変更をネットワーク経由でリアルタイムに複製します。

<img src="/safekit-docs/wp-content/uploads/2023/02/safekit-prim-second-300.png" width="300" alt="ミラー Windows/Linux クラスターにおけるバイトレベルでのファイルレプリケーション">

このレプリケーションは [同期（synchronous）方式](/safekit-docs/best-practises/synchronous-replication-vs-asynchronous-replication/) であり、非同期レプリケーションとは異なり、障害発生時にデータが失われることはありません。

SafeKitで複製するディレクトリ名を構成するだけで機能します。ディスク構成に関する前提条件はありません。ディレクトリはシステムディスク内に配置することも可能です。

### ステップ 2. 自動フェイルオーバー {#step2}

サーバー1が停止すると、サーバー2が処理を引き継ぎます。SafeKitは仮想IPアドレスを切り替え、サーバー2上で Windows/Linux アプリケーションを自動的に再起動します。

アプリケーションは、SafeKitによってサーバー2に複製された最新の状態のファイルを見つけます。その後、サーバー1への複製を行うことなく、ローカルのファイルを変更しながらサーバー2上で実行を継続します。

<img src="/safekit-docs/wp-content/uploads/2023/02/safekit-stop-alone-300.png" width="300" alt="ミラークラスターにおける Windows/Linux のフェイルオーバー">

フェイルオーバーに要する時間は、障害検出時間（デフォルトで30秒）とアプリケーションの起動時間を足した時間となります。

### ステップ 3. 自動フェイルバック {#step3}

フェイルバックとは、障害の原因となった問題を修正した後に、サーバー1を再起動する処理のことです。

SafeKitはファイルを自動的に再同期し、サーバー1が停止している間にサーバー2側で変更されたファイルのみを更新します。

<img src="/safekit-docs/wp-content/uploads/2023/02/safekit-resynchro-alone-300.png" width="300" alt="ミラーリング Windows/Linux クラスターにおけるフェイルバック">

フェイルバックは Windows/Linux アプリケーションの運用を妨げることなく実行されるため、アプリケーションはサーバー2側でそのまま実行を継続できます。

### ステップ 4. 正常状態への復帰

再組み込みが完了すると、ファイルはステップ1と同様に、再びミラーモードになります。システムは高可用性（HA）モードに戻り、Windows/Linux アプリケーションがサーバー2で実行され、SafeKitがサーバー1へのファイルの更新内容を複製するようになります。

<img src="/safekit-docs/wp-content/uploads/2023/02/safekit-second-prim-300.png" width="300" alt="ミラーリング Windows/Linux クラスターにおける正常運用への復帰">

管理者がアプリケーションをサーバー1で実行させたい場合は、適切なタイミングでWebコンソールから手動で行うか、構成設定により自動で行うことができます。

### Windows/LinuxのSafeKitミラークラスターを構成する方法は？ {#safekit-mirror-cluster-configure}

<img src="/safekit-docs/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png" width="763" alt="SafeKit Web Console: High Availability configuration dashboard for Windows/Linux showing heartbeat networks, virtual IP setup, and real-time directory replication for a mirror cluster.">

**SafeKit Webコンソール** は、重要なアプリケーションの高可用性を統合制御するための直感的なインターフェースを提供します。わずか数ステップで**SafeKitミラークラスター** を構成し、ビジネスの継続性を確保できます。

- **アプリケーションのフェイルオーバー（「Macros」タブ）：** 障害発生時に自動的に再起動する特定のアプリケーションサービスを定義します。
- **ハートビートネットワーク：** クラスターノード間で相互の健全性と可用性を継続的に監視し、フェイルオーバーの決定を同期するために使用される専用の通信経路です。
- **仮想IP管理：** フェイルオーバー後にクライアントが透過的に再接続できるように、仮想IP（VIP）を設定します。
- **リアルタイムレプリケーション：** ホストベースの同期型バイトレベルレプリケーションを行う重要なディレクトリを選択します。
- **チェッカー（監視機能）：** アプリケーションの健全性を監視し、プロセスの障害が検出された場合に自動復旧をトリガーします。

SafeKitクラスターには専用のスプリットブレインチェッカーが組み込まれているため、3台目のウィットネスマシン（監視サーバー）や追加のハートビートネットワークを必要とせずに、ネットワークの分断（孤立）問題を解決できます。詳細については、[クラスターにおけるハートビート、フェイルオーバー、およびクォーラム](/safekit-docs/best-practises/heartbeat-failover-quorum-windows-linux-cluster/)をご覧ください。

### Windows/LinuxのSafeKitミラークラスターを監視する方法は？ {#safekit-mirror-cluster-monitoring}

<img src="/safekit-docs/wp-content/uploads/2026/05/mirror-monitoring-prim-second.png" width="604" alt="SafeKit Web Console: Real-time monitoring of a 2-node mirror cluster for Windows/Linux showing PRIM and SECOND states with active data replication.">

**SafeKit管理コンソール** は、高可用性インフラストラクチャの一元化されたビューを提供します。管理者はこれにより、クラスターの**運用状態** を監視し、データ同期をリアルタイムで追跡できます。

2ノードのミラークラスターでは、各サーバーの役割がコンソールに明確に表示されます。

- **PRIM（プライマリ）：** 現在アプリケーションを実行し、仮想IPを管理しているアクティブなノードです。ローカルストレージへの書き込みと、セカンダリノードへのリアルタイムレプリケーションを実行します。
- **SECOND（セカンダリ）：** 同期型のバイトレベルの更新データを受信している待機（スタンバイ）ノードです。プライマリが深刻な障害に見舞われた場合、即座に処理を引き継ぐ（テイクオーバー）準備ができています。
- **ALONE（単独运行）状態：** クラスターが単一のノードで動作している場合（メンテナンス中や障害発生後など）に視覚的なアラートで通知し、冗長性が一時的に失われていることを示します。
- **再同期の進捗：** 障害が発生したノードが復旧すると、バックグラウンドでのデータ再組み込み中、そのステータスがオレンジ色に変わり、「正常状態への復帰」フェーズにおいてもダウンタイムが発生しないようにします。

単なるステータスアイコンの表示にとどまらず、インターフェースには**ワンクリックで実行できるフェイルオーバー制御機能** が用意されています。これにより、計画メンテナンス時にプライマリの役割を手動で再割り当てでき、ユーザーの業務への継続的な可用性を確保できます。

<!-- END INSERT: insert-safekit-mirror-en lang="ja" display="content" querystring="app=Windows/Linux" -->

<!-- BEGIN INSERT: insert-safekit-farm-en lang="ja" display="content" querystring="app=Windows/Linux" -->

## ファームモードのSafeKitクラスターは、Windows/Linux とどのように動作しますか？ {#safekit-farm-cluster}

### ファームモードクラスターにおける仮想IPアドレス {#virtual-ip-address-farm}

<img src="/safekit-docs/wp-content/uploads/2023/02/safekit-up-up-up-300.png" width="300" alt="How the SafeKit cluster in farm mode implements Windows/Linux network load balancing and failover">

上記の図では、Windows/Linux アプリケーションが3台のサーバー（3台は一例であり、2台以上で構成可能）で動作しています。ユーザーは仮想IPアドレスに接続します。

[仮想IPアドレス](/safekit-docs/best-practises/how-a-virtual-ip-address-works/)は、ファームモードクラスター内の各サーバーにローカルで構成されます。  
仮想IPアドレスへの入力トラフィックはすべてのサーバーによって受信され、各サーバーのカーネル内にあるネットワークフィルターによってサーバー間に分散されます。

SafeKitはハードウェアおよびソフトウェアの障害を検出し、障害発生時にネットワークフィルターを再構成します。また、構成可能なアプリケーションチェッカーとリカバリスクリプトを提供します。

### ネットワークフィルターにおける負荷分散 {#network-load-balancing}

ネットワークフィルター内のネットワーク負荷分散アルゴリズムは、クライアントパケットの識別情報（クライアントIPアドレス、クライアントTCPポート）に基づいています。入力されたクライアントパケットの識別情報に応じて、1台のサーバーにあるフィルターのみがそのパケットを受け入れ、他のサーバーにある他のフィルターはそれを拒否します。

あるサーバーのフィルターによってパケットが受け入れられると、クライアントの要求に応答する Windows/Linux アプリケーションによって、そのサーバーのCPUとメモリのみが使用されます。出力メッセージは、アプリケーションサーバーからクライアントへ直接送信されます。

サーバーに障害が発生した場合、ファームのハートビートプロトコルがネットワーク負荷分散クラスター内のフィルターを再構成し、残りの利用可能なサーバーにトラフィックを再分散します。

### ステートフルまたはステートレスアプリケーション {#stateful-stateless}

ステートフルな Windows/Linux アプリケーションでは、セッションアフィニティ（固定化）が存在します。同じクライアントが複数のTCPセッションにわたってサーバー上のコンテキストを破棄せずに利用するには、常に同じサーバーに接続する必要があります。この場合、SafeKitの負荷分散ルールはクライアントIPアドレスに基づいて構成されます。これにより、同じクライアントは複数のTCPセッションにおいて常に同じサーバーに接続されます。そして、異なるクライアントはファーム内の異なるサーバーに分散されます。

ステートレスな Windows/Linux アプリケーションでは、セッションアフィニティは存在しません。同じクライアントが複数のTCPセッションにおいて、ファーム内の異なるサーバーに接続することができます。セッション間でサーバーにローカル保存されるコンテキストはありません。この場合、SafeKitの負荷分散ルールはTCPクライアントセッションの識別情報に基づいて構成されます。この構成はサーバー間でセッションを分散させるのに最適ですが、セッションアフィニティを必要としないTCPサービスである必要があります。

### Windows/Linux のファームモードで SafeKit クラスターを構成するにはどうすればよいですか？ {#safekit-farm-cluster-configuration}

<img src="/safekit-docs/wp-content/uploads/2026/01/safekit-farm-cluster-config.png" width="966" alt="SafeKit Web Console: Farm-mode cluster configuration for Windows/Linux network load balancing and virtual IP management.">

**ファームモードの SafeKit クラスター** は、サービスの高い可用性と拡張性を実現するために設計されています。構成は、流入するトラフィックを同時に両方のノードに分散させることに焦点を当てています。

- **負荷分散サービス（[マクロ] タブ）:** すべてのノードでアクティブに維持する特定のアプリケーションサービス（例: Apache、IIS、Nginx）を定義します。
- **ハートビートネットワーク:** ノードがファームから離脱したかどうかを検出するために使用される通信経路であり、離脱を検出すると即座に負荷の再配分をトリガーします。
- **仮想 IP（ファーム VIP）:** ミラークラスターとは異なり、ファーム VIP はカーネルフィルタリングアルゴリズムを使用してノード間で共有され、ネットワークトラフィックを分散します。
- **負荷分散ルール:** 送信元 IP アドレスまたはポートに基づいて、トラフィックの分散ポリシーを定義します。
- **チェッカー:** アプリケーションの健全性を監視し、プロセスの障害が検出された場合に自動再起動をトリガーします。

### Windows/Linux のファームモードで SafeKit クラスターを監視するにはどうすればよいですか？ {#safekit-farm-cluster-monitoring}

<img src="/safekit-docs/wp-content/uploads/2026/01/safekit-farm-cluster-monitor.png" width="473" alt="SafeKit Console: Monitoring a 2-node farm-mode cluster showing both Windows/Linux nodes in UP state with active load balancing.">

ファームモードでのクラスター監視により、すべてのノードがアプリケーションのパフォーマンスに貢献する**アクティブ・アクティブ（Active-Active）** 構成のインフラストラクチャを可視化できます（この例では2つのノードを表示しています）。

- **UP 状態（2つのノードで50%ずつ）:** 健全なファームでは、両方のノードが「UP」（50%）状態にあり、共有された仮想 IP を介して両方のノードがクライアントからのリクエストをアクティブに受信し、処理していることを意味します。
- **自動再配分（再バランシング）:** 1つのノードが障害で停止した場合、残りのノードがトラフィックの100%を引き受ける様子がコンソール上に視覚的に表示されます。生存しているノードはすでにアクティブ状態であるため、「フェイルオーバー」による遅延はありません（数秒程度の検出時間を除く）。
- **ノードの組み込み:** 修復されたノードが再起動されると、状態が「STOP」から「UP」へと遷移し、管理者の介入なしに自動的に自身の割り当て分の負荷の受信を開始します。
- **データ同期なし:** ファームモードのクラスターでは、ノードがステートレスであるか、バックエンドのデータベースを共有している（ミラークラスターで別途保護可能）ことが前提となるため、「オレンジ色」の再同期状態は存在しないことに注意してください。

単なるステータスアイコンの表示にとどまらず、インターフェースからはワンクリックでノードを管理できます。計画メンテナンスのために手動でノードを停止または起動させることができ、その間も共有仮想 IP がユーザーの活動を妨げることなく自動的にトラフィックを再配分します。

<!-- END INSERT: insert-safekit-farm-en lang="ja" display="content" querystring="app=Windows/Linux" -->

<!-- BEGIN INSERT: insert-safekit-differentiators-en lang="ja" display="content" -->

## SafeKit と従来の高可用性 (HA) クラスターの比較 {#safekit-ha-comparison}

この比較は、SafeKit とフェイルオーバークラスター、仮想化 HA、SQL Always-On などの従来の高可用性 (HA) クラスターソリューションとの根本的な違いを示しています。SafeKit は、汎用的なアプリケーション冗長化のための低複雑性・ソフトウェアのみのソリューションとして設計されており、従来の HA メカニズムに特有の高い複雑性や特定のストレージ要件（共有ストレージ、SAN）とは対照的です。

**SafeKit と従来の高可用性 (HA) クラスターの比較**

| ソリューション                         | 複雑性 | コメント                                                                           |
| -------------------------------------- | ------ | ---------------------------------------------------------------------------------- |
| フェイルオーバークラスター (Microsoft) | 高い   | 特定のストレージが必要（共有ストレージ、SAN）                                      |
| 仮想化 (VMware HA)                     | 高い   | 特定のストレージが必要（共有ストレージ、SAN、vSAN）                                |
| SQL Always-On (Microsoft)              | 高い   | SQL のみが冗長化され、SQL Enterprise Edition が必要                                |
| SafeKit                                | 低い   | 最もシンプルで汎用的、ソフトウェアのみ。大規模データのレプリケーションには不向き。 |

**まとめ** として、SafeKit はシンプルなソフトウェアベースのミラーリング機構により、SAN（ストレージエリアネットワーク）のような高価な専用ハードウェアを不要にし、低複雑性で高可用性を実現します。これにより、複雑なインフラ変更なしにアプリケーションの冗長化を迅速に導入できる、非常にアクセスしやすいソリューションとなっています。

## アーキテクチャの差別化要因: SafeKit ソフトウェア定義クラスター vs. ハードウェア HA クラスター {#ha-arch-diff}

<!-- BEGIN INSERT: insert-safekit-software-vs-hardware-table-en lang="ja" display="content" -->

ビジネスの継続性を確保し、ダウンタイムを最小限に抑えるためには、適切な高可用性（HA）ソリューションを選択することが極めて重要です。この比較では、2つの主要なアーキテクチャ手法について直接的な技術的検証を行います。1つはSafeKitのソフトウェア定義によるシェアードナッシング（Shared-Nothing）クラスタリング、もう1つはハードウェア、共有ディスク（SANなど）、および複雑な設定に依存する従来のHA手法です。これらの違いは、導入の容易さ、データレプリケーション手法、復旧速度（RTO/RPO）、および運用上の複雑さに及びます。以下の表では、主要な高可用性トピックにわたる根本的な違いを詳しく説明します。

**高可用性の比較：SafeKit ソフトウェアクラスタリング vs 従来のHA / ハードウェアクラスタリング**

| トピック                                                                                                                                                                            | SafeKit（ソフトウェアクラスタリング / 主な手法）                                                                                                                                                                                                                                                                              | 従来のHA / ハードウェアクラスタリング                                                                                                                                                                                                                                                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[ソフトウェアクラスタリング vs ハードウェアクラスタリング](/safekit-docs/best-practises/clustering-software-vs-hardware-clustering/)**                                            | • 2台のサーバーにSafeKitパッケージをインストールするだけのシンプルなソフトウェアクラスタ                                                                                                                                                                                                                                      | • 外部ストレージやネットワークロードバランサーを必要とする複雑なハードウェアクラスタリング                                                                                                                                                                                                                                        |
| **[シェアードナッシング vs 共有ディスククラスタ](/safekit-docs/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/)**                                           | • SafeKitはシェアードナッシングクラスタであり、遠隔地であっても導入が容易                                                                                                                                                                                                                                                     | • 共有ディスククラスタは導入設定が複雑                                                                                                                                                                                                                                                                                            |
| **[アプリケーション高可用性 vs 仮想マシン全体の高可用性](/safekit-docs/best-practises/vm-ha-vs-application-ha/)**                                                                   | • アプリケーションチェッカーにより、ハードウェア障害とソフトウェア障害の両方に対応。<br>• アプリケーションのみを再起動することで迅速な復旧時間を実現（RTOは約1分以内）。<br>• アプリケーションHAでは、アプリケーションごとの再起動スクリプトとレプリケーション対象フォルダ（SafeKitアプリケーションモジュール）の定義が必要。 | • フル仮想マシンHAは、ハードウェア障害およびVMフリーズなどの一部のソフトウェア障害に対応。<br>• 障害発生時にVMが再起動し、復旧時間はOSの再起動速度に依存。<br>• フル仮想マシンHAでは再起動スクリプトの定義が不要（SafeKitのhyperv.safeまたはkvm.safeモジュール）。ハイパーバイザーは複数の仮想マシンでアクティブ/アクティブ動作。 |
| **[高可用性 vs フォールトトレランス（耐障害性）](/safekit-docs/best-practises/high-availability-cluster-vs-fault-tolerant-system/)**                                                | • SafeKitには専用サーバーが不要。各サーバーがお互いのフェイルオーバーサーバーとして機能可能。<br>• 別のOS環境での再起動によるソフトウェア障害対応。<br>• サーバーごとにアプリケーションおよびOSのローリングアップグレードが可能（バージョンNとN+1の共存が可能）。                                                             | • 命令レベルで同期された同じアプリケーションを実行するための専用セカンダリサーバーが必要。<br>• ソフトウェアの例外処理が両方のサーバーで同時に発生。<br>• ローリングアップグレードが不可。<br>• 専用のフォールトトレラントハードウェアまたはハイパーバイザーが必要。                                                              |
| **[同期レプリケーション vs 非同期レプリケーション](/safekit-docs/best-practises/synchronous-replication-vs-asynchronous-replication/)**                                             | • SafeKitはリアルタイムの同期レプリケーションを実装し、障害発生時にもデータ損失ゼロを実現。<br>• 高可用性を実現するための必須条件。                                                                                                                                                                                           | • 非同期レプリケーションでは、障害発生時にデータ損失が発生。<br>• 高可用性には不向きであり、バックアップソリューション向けの手法。                                                                                                                                                                                                |
| **[バイトレベルのファイルレプリケーション vs ブロックレベルのディスクレプリケーション](/safekit-docs/best-practises/byte-level-file-replication-vs-block-level-disk-replication/)** | • SafeKitはリアルタイムのバイトレベルファイルレプリケーションを実装し、システムディスク内であってもレプリケーション対象のアプリケーションディレクトリを指定するだけで簡単に設定可能。                                                                                                                                         | • ブロックレベルのディスクレプリケーションは設定が複雑であり、専用ディスクにアプリケーションデータを配置することが必要。                                                                                                                                                                                                          |
| **[2つのマスターノードを回避するためのハートビート、フェイルオーバー、クォーラム](/safekit-docs/best-practises/heartbeat-failover-quorum-windows-linux-cluster/)**                  | • 2つのマスター（スプリットブレイン）の発生を防ぐため、SafeKitはルーター上に設定するシンプルなスプリットブレインチェッカーを提案。                                                                                                                                                                                            | • 2つのマスターを回避するために、他のクラスタでは3台目のマシン、専用クォーラムディスク、専用相互接続ラインなどの複雑な設定が必要。                                                                                                                                                                                                |
| **[仮想IPアドレス：プライマリ/セカンダリ、ネットワークロードバランシング、フェイルオーバー](/safekit-docs/best-practises/how-a-virtual-ip-address-works/)**                         | • SafeKitクラスタでは、仮想IPアドレスのために専用プロキシサーバーや特別なネットワーク設定が不要。                                                                                                                                                                                                                             | • 他のクラスタでは、仮想IPアドレスのために特別なネットワーク設定が必要（注：SafeKitはロードバランサーに適したヘルスチェック機能を提供）。                                                                                                                                                                                         |

**要約すると** 、ソフトウェアクラスタリング（SafeKit など）とハードウェアクラスタリング（従来の共有ディスク/SAN 構成）のどちらを採用するかは、導入の複雑さ、運用コスト、および障害復旧の有効性に大きな影響を与えます。この比較から得られる重要な結論は、共有ディスクに依存しない「Shared-Nothing」アーキテクチャとアプリケーションレベルの高可用性（HA）への移行です。このアプローチは、アプリケーションの迅速な復旧（低RTO）と柔軟な導入（遠隔地間の構成を含む）を重視し、多くの場合、ハードウェアに大きく依存する複雑なクラスタ構成よりも、シンプルで高い耐障害性を備えたソリューションを実現します。管理を簡素化しながら最大限の事業継続性を確保するためには、ソフトウェアベースのアプローチを評価することが不可欠です。

<!-- END INSERT: insert-safekit-software-vs-hardware-table-en lang="ja" display="content" -->

## SafeKit ミラークラスターの主要な差別化要因 {#safemirr-diff}

<!-- BEGIN INSERT: insert-safekit-mirror-comparison-table-en lang="ja" display="content" -->

適切なデータレプリケーション方式を選択することは、事業継続性を確保する上で極めて重要です。この比較では、SafeKitのリアルタイムファイルレプリケーション付きミラークラスターと、データベースレベルのレプリケーション、ディスクレプリケーション、共有ディスクソリューション、フォールトトレラントシステムなどの従来の代替手段との主な差別化要因を紹介します。

**SafeKitミラークラスター：代替レプリケーション・クラスタリング方式に対する優位性**

| 特徴                                                                                                                                                   | SafeKitの優位性                                                                                                                                                                                                                                                                   | 代替手段の制限                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[3製品を1つに](/safekit-docs/best-practises/clustering-software-vs-hardware-clustering/)**                                                           | WindowsおよびLinuxで、外部共有/レプリケーションストレージ、ロードバランシング装置、OSおよびデータベースのエンタープライズ版のコストを削減。同期リアルタイムファイルレプリケーション、障害監視、自動再起動、仮想IPフェイルオーバーなど、すべてのクラスタリング機能を含みます。     | 従来の方式では、ストレージレプリケーション、ロードバランシング、クラスタリングに別々の製品が必要であり、コストと複雑さが増大します。                                                            |
| **[非常にシンプルな構成](/safekit-docs/solutions/)**                                                                                                   | アプリケーションモジュールによる構成。新しいサービスやレプリケーションディレクトリを簡単に追加可能。すべて集中管理Webコンソールで管理。ドメインコントローラーやActive Directoryは不要。                                                                                           | Microsoftクラスターや同様のソリューションでは、複雑なActive Directory構成とドメインコントローラーが必要です。                                                                                   |
| **[同期レプリケーション](/safekit-docs/best-practises/synchronous-replication-vs-asynchronous-replication/)**                                          | リアルタイムレプリケーションは同期方式で、障害時のデータ損失はゼロ（RPO = 0）。                                                                                                                                                                                                   | 非同期レプリケーションでは、障害発生時にまだレプリケーションされていない最新のトランザクションが失われる可能性があります。                                                                      |
| **[完全自動フェイルバック](/safekit-docs/architectures/file-replication-byte-level-with-failover-mirror-cluster/#step3)**                              | 障害後、サーバーが再起動すると、レプリケーションのフェイルバックは完全に自動化されます。障害サーバーは、残りのサーバー上のアプリケーションを停止することなくクラスターに再統合されます。                                                                                          | ほとんどのレプリケーションソリューション（特にデータベースレベル）では手動の再同期が必要です。フェイルバック中にアプリケーションが停止する場合もあります。                                      |
| **[あらゆるタイプのデータのレプリケーション](/safekit-docs/architectures/file-replication-byte-level-with-failover-mirror-cluster/#step1)**            | レプリケーションはデータベースだけでなく、レプリケーションが必要なすべてのファイルに対応。                                                                                                                                                                                        | データベースレベルのレプリケーションはデータベースのみを保護し、構成ファイル、ログ、その他のアプリケーションデータは保護しません。                                                              |
| **[ファイルレプリケーション vs. ディスクレプリケーション](/safekit-docs/best-practises/byte-level-file-replication-vs-block-level-disk-replication/)** | レプリケーションはファイルディレクトリに基づき、システムディスク上を含むどこにでも配置可能。                                                                                                                                                                                      | ディスクレプリケーションには専用パーティションとデータ格納のための特別なアプリケーション構成が必要です。                                                                                        |
| **[ファイルレプリケーション vs. 共有ディスク](/safekit-docs/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/)**                 | 共有インフラストラクチャなしで、2つの遠隔サイトにサーバーを展開可能。                                                                                                                                                                                                             | 共有ディスクソリューションは物理的な近接性が必要で、遠隔サイトをカバーできません。                                                                                                              |
| **[遠隔サイトと仮想IP](/safekit-docs/best-practises/how-a-virtual-ip-address-works/)**                                                                 | すべてのクラスタリング機能が遠隔サイトの2台のサーバーで動作。拡張LANによりレイヤー2のVIPリルーティングが可能。異なるIPネットワークの場合、VIPはSafeKitヘルスチェック付きロードバランサーで管理。                                                                                  | 多くのクラスタリングソリューションは遠隔サイトのフェイルオーバーをサポートしないか、復旧時間が予測できない複雑なDNSリダイレクトが必要です。                                                     |
| **[クォーラムとスプリットブレイン](/safekit-docs/best-practises/heartbeat-failover-quorum-windows-linux-cluster/)**                                    | 2台のサーバーのみで動作。ルーターへのシンプルなスプリットブレインチェッカーがサイト間のネットワーク分離に対応。                                                                                                                                                                   | ほとんどのクラスタリングソリューションではクォーラム管理に3台目のサーバーが必要です。                                                                                                           |
| **[アクティブ/アクティブクラスター](/safekit-docs/architectures/active-active-cluster-real-time-replication/)**                                        | セカンダリサーバーは専用ではありません。2つの異なるミラーモジュールでアクティブ/アクティブ運用が可能。                                                                                                                                                                            | [フォールトトレラントシステム](/safekit-docs/best-practises/high-availability-cluster-vs-fault-tolerant-system/)はセカンダリを命令レベルで同期された同じアプリケーションの実行に専用化します。  |
| **[統一HAソリューション](/safekit-docs/architectures/clustering-software-load-balancing-mirroring/)**                                                  | SafeKitはミラークラスター（レプリケーション＋フェイルオーバー）と [ファームクラスター（ロードバランシング＋フェイルオーバー）](/safekit-docs/architectures/network-load-balancing-cluster/)の両方を実装。N層アーキテクチャをWindowsとLinuxで1つのソリューションで高可用性化可能。 | 一般的なアーキテクチャではロードバランシング、レプリケーション、フェイルオーバーに異なる技術を混在させ、運用の複雑さが増大します。                                                              |
| **[RTO / RPO](/safekit-docs/best-practises/what-is-rpo-and-rto-with-examples/)**                                                                       | 障害時のアプリケーション迅速再起動：約1分以内。データ損失ゼロ（同期レプリケーション）。                                                                                                                                                                                           | [完全なVMレプリケーション](/safekit-docs/best-practises/vm-ha-vs-application-ha/)（VMware HA、Hyper-Vクラスター）は新しいハイパーバイザーでOS全体の再起動が必要であり、復旧時間が長くなります。 |

**まとめ** として、SafeKitミラークラスターは、同期ファイルレプリケーション、自動フェイルオーバーとフェイルバック、ロードバランシング、遠隔サイトサポートを組み合わせた統一的でコスト効率の高い高可用性ソリューションを提供します。専用ハードウェア、共有ストレージ、第3のクォーラムサーバーは一切不要です。このシンプルさにより、標準的なWindowsおよびLinuxサーバーで信頼性の高いHAを必要とするソフトウェアベンダーや組織に特に適しています。

<!-- END INSERT: insert-safekit-mirror-comparison-table-en lang="ja" display="content" -->

## SafeKit ファームクラスターの主な差別化要因 {#safefarm-diff}

SafeKit Farm Cluster は、負荷分散と迅速なフェイルオーバーが不可欠なスケーラブルなアプリケーション環境向けに特別に設計された高可用性ソリューションです。専用のハードウェアロードバランサーや複雑なネットワーク構成を必要とする従来の方法とは異なり、SafeKit はアプリケーションサーバーに直接インストールされる統合型のソフトウェア定義クラスタリングソリューションを提供します。以下の表では、SafeKit Farm Cluster の主要機能と独自の利点について詳しく説明し、ネットワーク負荷分散の簡素化と Windows および Linux プラットフォームにおけるサービスの継続的な可用性の確保に焦点を当てています。

**負荷分散とフェイルオーバーを備えた SafeKit Farm Cluster の主な差別化要素**

| 利点                                                                                                                                                 | 詳細な効果とメカニズム                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [ロードバランサー、専用プロキシサーバー、特殊なマルチキャスト Ethernet アドレスが不要](/safekit-docs/best-practises/how-a-virtual-ip-address-works/) | • このソリューションは、負荷分散を実装するためにファームの上位にロードバランサーや専用プロキシサーバーを必要としません。SafeKit はファーム内のアプリケーションサーバーに直接インストールされます。負荷分散は標準的な仮想 IP アドレス / Ethernet MAC アドレスに基づいており、特別なネットワーク構成なしで Windows および Linux の物理サーバーまたは仮想マシンで動作します<br>• ネットワークロードバランサーではこれは実現できません<br>• Linux の専用プロキシではこれは実現できません<br>• Windows の特殊なマルチキャスト Ethernet アドレスでもこれは実現できません                                                                                                                                                                                                 |
| [すべてのクラスタリング機能](/safekit-docs/architectures/network-load-balancing-cluster/)                                                            | • このソリューションは、すべてのクラスタリング機能を含みます：仮想 IP アドレス、クライアント IP アドレスまたはセッションによる負荷分散、サーバー / ネットワーク / ソフトウェア障害の監視、迅速な復旧時間でのアプリケーション自動再起動、およびミラーモジュールによるレプリケーションオプション<br>• 他の負荷分散ソリューションではこれは実現できません。負荷分散は可能ですが、再起動スクリプトや障害時のアプリケーション自動再起動を含む完全なクラスタリングソリューションは含まれていません。レプリケーションオプションも提供していません<br>• クラスター構成は非常にシンプルで、アプリケーションモジュールを使用して行います。Windows でドメインコントローラーや Active Directory を構成する必要はありません。このソリューションは Windows と Linux で動作します |
| [リモートサイトと仮想 IP アドレス](/safekit-docs/best-practises/how-a-virtual-ip-address-works/)                                                     | • リモートサイト間の拡張 LAN を通じてサーバーが同じ IP ネットワークに接続されている場合、SafeKit の仮想 IP アドレスはレイヤー 2 で負荷分散が機能します<br>• リモートサイト間でサーバーが異なる IP ネットワークに接続されている場合、仮想 IP アドレスは SafeKit ヘルスチェックを利用してロードバランサーのレベルで構成できます。これにより、負荷分散だけでなく、SafeKit のすべてのクラスタリング機能、特にアプリケーションサーバー上のクリティカルなアプリケーションの監視と自動復旧を実装できます                                                                                                                                                                                                                                                                  |
| [統一された高可用性ソリューション](/safekit-docs/architectures/clustering-software-load-balancing-mirroring/)                                        | • SafeKit は負荷分散とフェイルオーバーを備えたファームクラスターを実装します。さらに、レプリケーションとフェイルオーバーを備えたミラークラスターも実装します。<br>• これにより、N 層アーキテクチャを Windows と Linux で同じソリューションを使用して高可用性と負荷分散を実現できます（SafeKit コンソールまたはコマンドラインインターフェースによる同じインストール、構成、管理）。これは市場で唯一無二です<br>• 負荷分散、レプリケーション、フェイルオーバーに異なる技術を混在させたアーキテクチャではこれは実現できません                                                                                                                                                                                                                                         |

**まとめ** として、SafeKit Farm Cluster は負荷分散と高可用性に対する統一されたソフトウェアベースのアプローチを提供し、複雑性とコストを大幅に削減します。標準的な仮想 IP アドレスを使用して負荷分散とフェイルオーバーをアプリケーションサーバー層に直接組み込むことで、外部ネットワークハードウェア（ロードバランサーやプロキシ）や専用マルチキャスト構成の必要性を排除します。この統合アプローチは、完全な N 層 HA のためのミラークラスターとの組み合わせ能力と相まって、多様な環境におけるスケーラブルで回復力のあるアプリケーション配信を実現するための、類を見ないほどシンプルで包括的なソリューションとなっています。

## VM 高可用性：SafeKit の SAN レス HA と Hyper-V/VMware HA の比較 {#safe-vmha-diff}

<!-- BEGIN INSERT: insert-safekit-vm-vs-app-ha-comparison-table-en lang="ja" display="content" -->

高可用性を実装する際、**仮想マシン（VM）レベル** で保護するか、**アプリケーションレベル** で保護するかが重要な決定事項です。VMレベルHAは仮想マシン全体を複製してフェイルオーバーし、あらゆるアプリケーションに対する汎用ソリューションを提供します。アプリケーションレベルHAはアプリケーションのデータとサービスのみを対象とし、より高速な復旧時間とリソース使用量の低減を実現します。SafeKitは**両方のアプローチ** を独自に提供し、どちらの場合も共有ストレージ（SAN）を必要としないため、インフラストラクチャと復旧要件に最適な方式を選択できます。

**SafeKit VM HA vs アプリケーションHA vs 従来のHyper-Vクラスター＆VMware HA**

| 基準                     | SafeKit Hyper-VまたはKVMモジュールによるVM HA                                                                                                                                                                                                                                                       | SafeKitアプリケーションモジュールによるアプリケーションHA                                                                                                                                                            | Microsoft Hyper-Vクラスター＆VMware HA                                                         |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **アーキテクチャ**       | SafeKitを2つのハイパーバイザーにインストール。VM全体の複製とフェイルオーバー。                                                                                                                                                                                                                      | SafeKitを2つの仮想マシンまたは物理マシンにインストール。アプリケーションレベルでの複製とフェイルオーバー。                                                                                                           | 共有ストレージ付きハイパーバイザークラスター。ハイパーバイザー障害時に別のホストでVMを再起動。 |
| **ストレージ**           | 共有ディスク不要 — [データ損失ゼロの同期リアルタイムレプリケーション](/safekit-docs/best-practises/synchronous-replication-vs-asynchronous-replication/)                                                                                                                                            | 共有ディスク不要 — アプリケーションデータのみの同期レプリケーション                                                                                                                                                  | 共有ディスクと専用外部ディスクエンクロージャが必要                                             |
| **複製データ**           | より多くのデータを複製（アプリケーション＋OS）                                                                                                                                                                                                                                                      | アプリケーションデータのみを複製                                                                                                                                                                                     | レプリケーションなし — すべてのホストから共有ストレージにアクセス                              |
| **復旧時間**             | ハイパーバイザー1が障害の場合、ハイパーバイザー2でVMを再起動。復旧時間＝VM再起動時間。VM障害時はフェイルオーバー。                                                                                                                                                                                  | サーバー2でアプリケーションを再起動して迅速に復旧。約1分以内（[RTO/RPOはこちら](/safekit-docs/best-practises/what-is-rpo-and-rto-with-examples/)）。高度なアプリケーションチェッカーとソフトウェアフェイルオーバー。 | 新しいハイパーバイザーでVM全体を再起動。復旧時間はOS再起動＋アプリケーション起動に依存。       |
| **災害復旧/遠隔サイト**  | SAN不要 — SafeKitに遠隔サイト間レプリケーションが内蔵                                                                                                                                                                                                                                               | SAN不要 — SafeKitに遠隔サイト間レプリケーションが内蔵                                                                                                                                                                | SANまたはvSANを介したディスクエンクロージャの複製が必要                                        |
| **構成**                 | アプリケーションがインストールされているVMファイルフォルダの場所を定義。あらゆるアプリケーション/OSに対応する汎用ソリューション。                                                                                                                                                                   | 再起動するサービス、複製するアプリケーションフォルダ、フェイルオーバー用の仮想IPアドレスを [アプリケーションモジュール](/safekit-docs/solutions/)内で定義。                                                          | システム構成に専門的なITスキルが必要                                                           |
| **対応プラットフォーム** | [Hyper-V](/safekit-docs/solutions/hyper-v-replication-automatic-failover-load-balancing/)と [KVM](/safekit-docs/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/)に対応（VMwareに直接対応していないが、VMware内にHyper-VまたはKVMをネストすることで対応可能）。 | あらゆるインフラストラクチャで動作：物理サーバー、VMware、Hyper-V、KVM仮想マシン、クラウド。                                                                                                                         | VMware vSphereまたはMicrosoft Hyper-V環境に限定                                                |
| **ITスキル**             | 専門的なITスキル不要。自動フェイルオーバー。                                                                                                                                                                                                                                                        | 専門的なITスキル不要。自動フェイルオーバー。                                                                                                                                                                         | システム構成に専門的なITスキルが必要                                                           |

**まとめ** として、SafeKitは**共有ストレージなしでVMレベルとアプリケーションレベルの両方の高可用性を提供する** 唯一のソリューションです。最大の柔軟性と最速の復旧時間（約1分）を実現するには、アプリケーションレベルHAが推奨されるアプローチです。あらゆるプラットフォーム（物理、仮想、クラウド）で動作し、重要なデータのみを複製します。VM全体を保護する方が簡単な環境では、SafeKitのHyper-V/KVMモジュールが従来のMicrosoft Hyper-VクラスターやVMware HAに対するSANレスの汎用代替手段を提供し、同期リアルタイムレプリケーションによるデータ損失ゼロを保証しながら、共有ストレージインフラストラクチャのコストと複雑さを排除します。

SafeKitソリューションは最も実装が簡単ですが、**[数テラバイト](/safekit-docs/ja/#safekit-ha-limitations)のレプリケーションと [32 VM](/safekit-docs/ja/#safekit-ha-limitations)のフェイルオーバーに限定**されることにご注意ください。

<!-- END INSERT: insert-safekit-vm-vs-app-ha-comparison-table-en lang="ja" display="content" -->

<!-- END INSERT: insert-safekit-differentiators-en lang="ja" display="content" -->

<!-- BEGIN INSERT: insert-safekit-training-en lang="ja" display="content" -->

## SafeKit HA 無料トライアル ＆ 技術ドキュメント {#safekit-ha-technical-resources}

💡 SafeKitでの高可用性の旅を始めるには、**[クイックインストールガイドから始めてください](/safekit-docs/quick-install/)** 。

### 📦 SafeKit 高可用性 (HA) ソフトウェアパッケージ - バージョン 8.2

この表は、現行バージョンの SafeKit インストールファイルを提供します。オペレーティングシステムおよびインストーラーの種類ごとに整理されています。

| OS / プラットフォーム        | インストーラーの種類    | 主なメリット / ドキュメント                               | ダウンロードリンク                                                                                                                                                                                                                                                                           |
| ---------------------------- | ----------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **すべてのプラットフォーム** | **PDF ドキュメント**    | **公式ソフトウェアリリース速報 (OS サポート & 修正内容)** | [📄 SafeKit 8.2 SRB を表示](/safekit-docs/wp-content/uploads/downloads_safekit/version-82/82softwarereleasebulletin.pdf "SafeKit 8.2 でサポートされる OS と最新の修正内容の詳細を記載した公式速報です。")                                                                                    |
| **Windows (Intel 64ビット)** | **.exe インストーラー** | Microsoft VC++ 再頒布可能パッケージを含む                 | [⬇️ SafeKit 8.2 Windows EXE をダウンロード](https://github.com/FR-LES-SAFEKIT-DEV/safekit-packages/releases/download/v8.2/safekit_windows_x86_64_8_2_6_5.exe "SafeKit 8.2 Windows 版 (VC++ 再頒布可能パッケージを含む EXE インストーラー) をダウンロード")                                   |
| **Windows (Intel 64ビット)** | **.msi インストーラー** | Microsoft VC++ 再頒布可能パッケージを _含まない_          | [⬇️ SafeKit 8.2 Windows MSI をダウンロード](https://github.com/FR-LES-SAFEKIT-DEV/safekit-packages/releases/download/v8.2/safekit_windows_x86_64_8_2_6_5.msi "SafeKit 8.2 Windows 版 (VC++ 再頒布可能パッケージを含まない MSI インストーラー) をダウンロード")                               |
| **Linux (Intel 64ビット)**   | **自己解凍型 .BIN**     | Linux パッケージとインストールスクリプトを含む            | [⬇️ SafeKit 8.2 Linux BIN ファイル (Intel) をダウンロード](https://github.com/FR-LES-SAFEKIT-DEV/safekit-packages/releases/download/v8.2/safekitlinux_x86_64_8_2_6_4.bin "SafeKit 8.2 Linux 版 (標準 Linux パッケージとインストールスクリプトを含む自己解凍型 BIN ファイル) をダウンロード") |
| **Linux (ARM 64ビット)**     | **自己解凍型 .BIN**     | Linux パッケージとインストールスクリプトを含む            | [⬇️ SafeKit 8.2 Linux BIN ファイル (ARM) をダウンロード](https://github.com/FR-LES-SAFEKIT-DEV/safekit-packages/releases/download/v8.2/safekitlinux_aarch64_8_2_5_4.bin "SafeKit 8.2 Linux 版 (標準 Linux パッケージとインストールスクリプトを含む自己解凍型 BIN ファイル) をダウンロード")  |

### 🔑 SafeKit の HA 試用キー

以下のリンクから、SafeKit を使用した高可用性クラスターのテストとセットアップ用に設計された全機能搭載の試用版にアクセスできます。

➡️ [SafeKit の高可用性をテストするための無料 1ヶ月試用キーを入手](https://safekit.eviden.com/resources/safekit-free-trial-licence-key-high-availability/ "SafeKit 高可用性 30日間無料試用ライセンスキーを請求")

### 📚 SafeKit HA クラスターの構成ガイド {#config-guides-heading}

SafeKit 高可用性クラスターをセットアップおよび管理するための必須ドキュメント。

- [SafeKit クイックインストールガイド](/safekit-docs/quick-install/ "SafeKit のクイックインストールガイドで迅速に起動して実行。")
- [HTML SafeKit ユーザーガイド (バージョン 8.2)](/safekit-docs/resources/safekit-user-guide-82/ "SafeKit バージョン 8.2 の包括的なユーザーマニュアルを表示 (HTML).") / [PDF をダウンロード](/safekit-docs/wp-content/uploads/downloads_safekit/version-82/safekituserguideen.pdf "SafeKit バージョン 8.2 の包括的なユーザーマニュアルを表示 (PDF).")
- [HTML SafeKit リリースノート (バージョン 8.2)](/safekit-docs/resources/safekit-release-notes-8-2/ "SafeKit バージョン 8.2 の新機能、変更点、修正点を確認 (HTML).") / [PDF をダウンロード](/safekit-docs/wp-content/uploads/downloads_safekit/version-82/safekit82releasenotes.pdf "SafeKit バージョン 8.2 の新機能、変更点、修正点を確認 (PDF).")

### 📞/🤖 SafeKit サポート {#support}

- 📞 [有償サポート](/safekit-docs/resources/safekit-support/#standard-support) / 🤖 [無償サポート](/safekit-docs/resources/safekit-support/#ai-support)

### 🎓 SafeKit の無料トレーニングと認定

当社の無料認定プログラムで、高可用性 (HA) に関する貴重な専門知識を獲得しましょう。

- [SafeKit 高可用性認定を無料で取得](https://training.my.evidian.com/mod/page/view.php?id=712)

### ℹ️ 製品マーケティングドキュメント

SafeKit HAソフトウェアの製品マーケティングドキュメントをご覧ください。詳細なデータシート、製品ホワイトペーパー、技術概要が含まれています。

- [SafeKit 高可用性クラスタ データシート（PDF）](/safekit-docs/wp-content/uploads/documents/high-availability-overview.pdf)
- [高可用性クラスタ技術 ホワイトペーパー（PDF）](/safekit-docs/wp-content/uploads/documents/wp-safekit-en.pdf)
- [ホワイトペーパー – 高可用性ガイド（PDF）](/safekit-docs/wp-content/uploads/documents/wp-hadecision-en.pdf)
- [RFIおよびRFP向け技術リファレンス](/safekit-docs/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/)

<!-- END INSERT: insert-safekit-training-en lang="ja" display="content" -->

<!-- BEGIN INSERT: insert-safekit-modules-en lang="ja" display="content" -->

## SafeKit アプリケーションモジュールライブラリ：すぐに使える HA ソリューション {#safekit-ha-application-modules}

この表は、SafeKit の高可用性（HA）ソリューションを、アプリケーション種別および運用環境（データベース、Web サーバー、VM、コンテナ、クラウド）ごとに分類して示しています。Windows または Linux 上の重要業務アプリケーションに対し、リアルタイムレプリケーション、負荷分散、自動フェイルオーバーを実現するために必要な、事前設定済みの `.safe` モジュール（例：`mirror.safe`、`farm.safe` など）を特定できます。クイックインストールガイドへの直接リンクで、HA クラスター構成を簡素化できます。

SafeKit の `.safe` モジュールは、特定アプリケーションを SafeKit ソフトウェアでどのようにクラスタ化し保護するかを定義する、事前設定済みの高可用性（HA）テンプレートです。実体は、設定ファイル（`userconfig.xml`）と再起動スクリプトを含む zip ファイルです。

**⚠️ 注記：** \* `mirror.safe` と `farm.safe` モジュールは、SafeKit インストールパッケージに標準で含まれています。

**SafeKit 高可用性（HA）ソリューション：クイックインストールガイド（ダウンロード可能な .safe モジュール付き）**

| アプリケーションカテゴリ | ソリューション                                                                                                                                                                                                                 | クイックインストールガイド                                                                                                                                                                                                                                            | アプリケーションモジュール                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 新規アプリケーション     | [Windows ミラークラスターアーキテクチャ](/safekit-docs/solutions/windows-high-availability-software-synchronous-replication-failover/ "仕組み：Windows リアルタイムレプリケーション")                                          | [Windows 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/ "Windows リアルタイムレプリケーション向けクイック HA インストールガイド（mirror.safe）") | mirror.safe (Windows)\*                                                                                                                                                                                                                                                                                                                                                                 |
| 新規アプリケーション     | [Linux ミラークラスターアーキテクチャ](/safekit-docs/solutions/linux-high-availability-software-synchronous-replication-failover/ "仕組み：Linux リアルタイムレプリケーション")                                                | [Linux 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover/ "Linux リアルタイムレプリケーション向けクイック HA インストールガイド（mirror.safe）")       | mirror.safe (Linux)\*                                                                                                                                                                                                                                                                                                                                                                   |
| 新規アプリケーション     | [Windows 負荷分散アーキテクチャ](/safekit-docs/solutions/windows-load-balancing-failover/ "仕組み：Windows ネットワーク負荷分散")                                                                                              | [Windows 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/ "Windows ネットワーク負荷分散向けクイック HA インストールガイド（farm.safe）")          | farm.safe (Windows)\*                                                                                                                                                                                                                                                                                                                                                                   |
| 新規アプリケーション     | [Linux 負荷分散アーキテクチャ](/safekit-docs/solutions/linux-load-balancing-failover/ "仕組み：Linux ネットワーク負荷分散")                                                                                                    | [Linux 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-network-load-balancing-and-failover/ "Linux ネットワーク負荷分散向けクイック HA インストールガイド（farm.safe）")                | farm.safe (Linux)\*                                                                                                                                                                                                                                                                                                                                                                     |
| データベース             | [Microsoft SQL Server ミラークラスターアーキテクチャ](/safekit-docs/solutions/sql-server-high-availability-synchronous-replication-failover/ "仕組み：SQL Server ミラーリング")                                                | [Microsoft SQL Server 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/ "SQL Server クラスター向けクイック HA インストールガイド")                                                              | <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_windows/sqlserver.safe" download="sqlserver.safe">⬇️ sqlserver.safe</a> (Windows)                                                                                                                                                                                                   |
| データベース             | [PostgreSQL ミラークラスターアーキテクチャ](/safekit-docs/solutions/postgresql-high-availability-synchronous-replication-failover/ "仕組み：PostgreSQL レプリケーション")                                                      | [PostgreSQL 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-with-postgresql/ "PostgreSQL レプリケーション向けクイック HA インストールガイド")                                                                            | <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_windows/postgresql.safe" download="postgresql.safe">⬇️ postgresql.safe</a> (Windows)<br> <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_linux/postgresql.safe" download="postgresql.safe">⬇️ postgresql.safe</a> (Linux)       |
| データベース             | [MySQL ミラークラスターアーキテクチャ](/safekit-docs/solutions/mysql-high-availability-synchronous-replication-failover/ "仕組み：MySQL クラスター")                                                                           | [MySQL 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-with-mysql/ "MySQL クラスター向けクイック HA インストールガイド")                                                                                                 | <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_windows/mysql.safe" download="mysql.safe">⬇️ mysql.safe</a> (Windows)<br> <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_linux/mysql.safe" download="mysql.safe">⬇️ mysql.safe</a> (Linux)                                     |
| データベース             | [MariaDB ミラークラスターアーキテクチャ](/safekit-docs/solutions/mariadb-simplest-high-availability-cluster-synchronous-replication-failover-redundant-servers/ "仕組み：MariaDB クラスター")                                  | [MariaDB 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-with-mariadb/ "MariaDB クラスター向けクイック HA インストールガイド")                                                                                           | <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_windows/mysql.safe" download="mysql.safe">⬇️ mysql.safe</a> (Windows)<br> <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_linux/mysql.safe" download="mysql.safe">⬇️ mysql.safe</a> (Linux)                                     |
| データベース             | [Oracle ミラークラスターアーキテクチャ](/safekit-docs/solutions/oracle-high-availability-synchronous-replication-failover/ "仕組み：Oracle フェイルオーバー")                                                                  | [Oracle 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-with-oracle/ "Oracle フェイルオーバークラスター向けクイック HA インストールガイド")                                                                              | <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_windows/oracle.safe" download="oracle.safe">⬇️ oracle.safe</a> (Windows)<br> <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_linux/oracle.safe" download="oracle.safe">⬇️ oracle.safe</a> (Linux)                               |
| データベース             | [Firebird ミラークラスターアーキテクチャ](/safekit-docs/solutions/firebird-high-availability-synchronous-replication-failover/ "仕組み：Firebird HA")                                                                          | [Firebird 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-with-firebird/ "Firebird 向けクイック HA インストールガイド")                                                                                                  | <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_windows/firebird.safe" download="firebird.safe">⬇️ firebird.safe</a> (Windows)<br> <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_linux/firebird.safe" download="firebird.safe">⬇️ firebird.safe</a> (Linux)                   |
| Web サーバー             | [Apache 負荷分散アーキテクチャ](/safekit-docs/solutions/apache-load-balancing-failover-2/ "仕組み：Apache 負荷分散")                                                                                                           | [Apache 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/ "Apache 負荷分散およびフェイルオーバー向けクイック HA ガイド")                                                         | <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_windows/apache_farm.safe" download="apache_farm.safe">⬇️ apache_farm.safe</a> (Windows)<br> <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_linux/apache_farm.safe" download="apache_farm.safe">⬇️ apache_farm.safe</a> (Linux) |
| Web サーバー             | [IIS 負荷分散アーキテクチャ](/safekit-docs/solutions/iis-load-balancing-failover/ "仕組み：IIS 負荷分散")                                                                                                                      | [IIS 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-with-iis-with-network-load-balancing-and-failover/ "IIS 負荷分散およびフェイルオーバー向けクイック HA ガイド")                                                      | <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_windows/iis_farm.safe" download="iis_farm.safe">⬇️ iis_farm.safe</a> (Windows)                                                                                                                                                                                                      |
| Web サーバー             | [NGINX 負荷分散アーキテクチャ](/safekit-docs/solutions/nginx-the-simplest-load-balancing-cluster-with-failover/ "仕組み：NGINX 負荷分散")                                                                                      | [NGINX 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-with-nginx-with-network-load-balancing-and-failover/ "NGINX 負荷分散およびフェイルオーバー向けクイック HA ガイド")                                                | farm.safe (Windows & Linux)\*                                                                                                                                                                                                                                                                                                                                                           |
| VM とコンテナ            | [Hyper-V VM HA アーキテクチャ](/safekit-docs/solutions/hyper-v-replication-automatic-failover-load-balancing/ "仕組み：Hyper-V レプリケーション")                                                                              | [Hyper-V 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-with-hyper-v/ "Hyper-V VM レプリケーション向けクイック HA インストールガイド")                                                                                  | <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv.safe" download="hyperv.safe">⬇️ hyperv.safe</a> (Windows)                                                                                                                                                                                                            |
| VM とコンテナ            | [KVM VM HA アーキテクチャ](/safekit-docs/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/ "仕組み：KVM レプリケーション")                                                                  | [KVM 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-with-kvm/ "KVM VM レプリケーション向けクイック HA インストールガイド")                                                                                              | <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_linux/kvm.safe" download="kvm.safe">⬇️ kvm.safe</a> (Linux)                                                                                                                                                                                                                         |
| VM とコンテナ            | [Docker コンテナ HA アーキテクチャ](/safekit-docs/solutions/docker-container-high-availability-cluster-synchronous-replication-failover/ "仕組み：Docker フェイルオーバー")                                                    | [Docker 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-with-docker/ "Docker コンテナ フェイルオーバー向けクイック HA ガイド")                                                                                           | mirror.safe (Linux)\*                                                                                                                                                                                                                                                                                                                                                                   |
| VM とコンテナ            | [Podman コンテナ HA アーキテクチャ](/safekit-docs/solutions/podman-the-simplest-high-availability-cluster-between-two-redundant-servers/ "仕組み：Podman フェイルオーバー")                                                    | [Podman 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-with-podman/ "Podman コンテナ フェイルオーバー向けクイック HA ガイド")                                                                                           | mirror.safe (Linux)\*                                                                                                                                                                                                                                                                                                                                                                   |
| VM とコンテナ            | [Kubernetes K3S クラスターアーキテクチャ](/safekit-docs/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/ "仕組み：Kubernetes K3S")     | [Kubernetes K3S 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-with-kubernetes/ "Kubernetes K3S レプリケーション向けクイック HA ガイド")                                                                                | <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s.safe" download="k3s.safe">⬇️ k3s.safe</a> (Linux)                                                                                                                                                                                                                         |
| AWS クラウド             | [AWS ミラークラスターアーキテクチャ](/safekit-docs/solutions/aws-high-availability-cluster-synchronous-replication-failover/ "仕組み：AWS レプリケーションクラスター")                                                         | [AWS 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-in-aws-mirror-safe-module-for-real-time-replication-and-failover/ "AWS レプリケーションクラスター向けクイック HA ガイド（mirror.safe）")                            | mirror.safe (Windows & Linux)\*                                                                                                                                                                                                                                                                                                                                                         |
| AWS クラウド             | [AWS 負荷分散アーキテクチャ](/safekit-docs/solutions/aws-load-balancing-cluster-failover/ "仕組み：AWS 負荷分散")                                                                                                              | [AWS 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-in-aws-with-network-load-balancing-and-failover/ "AWS 負荷分散クラスター向けクイック HA ガイド（farm.safe）")                                                       | farm.safe (Windows & Linux)\*                                                                                                                                                                                                                                                                                                                                                           |
| GCP クラウド             | [GCP ミラークラスターアーキテクチャ](/safekit-docs/solutions/gcp-high-availability-cluster-synchronous-replication-failover/ "仕組み：GCP レプリケーションクラスター")                                                         | [GCP 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-in-gcp-with-real-time-replication-and-failover/ "GCP レプリケーションクラスター向けクイック HA ガイド（mirror.safe）")                                              | mirror.safe (Windows & Linux)\*                                                                                                                                                                                                                                                                                                                                                         |
| GCP クラウド             | [GCP 負荷分散アーキテクチャ](/safekit-docs/solutions/gcp-load-balancing-cluster-failover/ "仕組み：GCP 負荷分散")                                                                                                              | [GCP 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-in-gcp-with-network-load-balancing-and-failover/ "GCP 負荷分散クラスター向けクイック HA ガイド（farm.safe）")                                                       | farm.safe (Windows & Linux)\*                                                                                                                                                                                                                                                                                                                                                           |
| Azure クラウド           | [Azure ミラークラスターアーキテクチャ](/safekit-docs/solutions/azure-high-availability-cluster-synchronous-replication-failover/ "仕組み：Azure レプリケーションクラスター")                                                   | [Azure 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-in-azure-with-real-time-replication-and-failover/ "Azure レプリケーションクラスター向けクイック HA ガイド（mirror.safe）")                                        | mirror.safe (Windows & Linux)\*                                                                                                                                                                                                                                                                                                                                                         |
| Azure クラウド           | [Azure 負荷分散アーキテクチャ](/safekit-docs/solutions/azure-load-balancing-cluster-failover/ "仕組み：Azure 負荷分散")                                                                                                        | [Azure 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-in-azure-with-network-load-balancing-and-failover/ "Azure 負荷分散クラスター向けクイック HA ガイド（farm.safe）")                                                 | farm.safe (Windows & Linux)\*                                                                                                                                                                                                                                                                                                                                                           |
| クラウド                 | [クラウド ミラークラスターアーキテクチャ](/safekit-docs/solutions/cloud-high-availability-cluster-synchronous-replication-failover/ "仕組み：クラウド レプリケーションクラスター")                                             | [クラウド向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-in-cloud-with-real-time-replication-and-failover/ "クラウド レプリケーションクラスター向けクイック HA ガイド（mirror.safe）")                                   | mirror.safe (Windows & Linux)\*                                                                                                                                                                                                                                                                                                                                                         |
| クラウド                 | [クラウド 負荷分散アーキテクチャ](/safekit-docs/solutions/cloud-load-balancing-cluster-failover/ "仕組み：クラウド 負荷分散")                                                                                                  | [クラウド向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-in-cloud-with-network-load-balancing-and-failover/ "クラウド 負荷分散クラスター向けクイック HA ガイド（farm.safe）")                                            | farm.safe (Windows & Linux)\*                                                                                                                                                                                                                                                                                                                                                           |
| 物理セキュリティ / VMS   | [Milestone XProtect ミラークラスターアーキテクチャ](/safekit-docs/solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/ "仕組み：Milestone XProtect フェイルオーバー")                    | [Milestone XProtect 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server/ "Milestone XProtect 管理サーバーフェイルオーバー向けクイック HA ガイド")                                  | <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_windows/milestone.safe" download="milestone.safe">⬇️ milestone.safe</a> (Windows)                                                                                                                                                                                                   |
| 物理セキュリティ / VMS   | [Nedap AEOS ミラークラスターアーキテクチャ](/safekit-docs/solutions/nedap-high-availability-synchronous-replication-failover/ "仕組み：Nedap AEOS フェイルオーバー")                                                           | [Nedap AEOS 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-with-nedap/ "Nedap AEOS フェイルオーバー向けクイック HA ガイド")                                                                                             | <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_windows/nedap.safe" download="nedap.safe">⬇️ nedap.safe</a> (Windows)                                                                                                                                                                                                               |
| 物理セキュリティ / VMS   | [Genetec SQL ミラークラスターアーキテクチャ](/safekit-docs/solutions/sql-server-high-availability-synchronous-replication-failover/ "仕組み：Genetec SQL フェイルオーバー")                                                    | [Genetec（SQL Server）向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/ "Genetec SQL Server フェイルオーバー向けクイック HA ガイド")                                                            | <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_windows/sqlserver.safe" download="sqlserver.safe">⬇️ sqlserver.safe</a> (Windows)                                                                                                                                                                                                   |
| 物理セキュリティ / VMS   | [Bosch AMS VM HA アーキテクチャ](/safekit-docs/solutions/bosch-ams-the-simplest-high-availability-cluster-between-two-redundant-servers-without-shared-disk/ "仕組み：Bosch AMS HA")                                           | [Bosch AMS 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-with-hyper-v/ "Bosch AMS Hyper-V フェイルオーバー向けクイック HA ガイド")                                                                                     | <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv.safe" download="hyperv.safe">⬇️ hyperv.safe</a> (Windows)                                                                                                                                                                                                            |
| 物理セキュリティ / VMS   | [Bosch BIS VM HA アーキテクチャ](/safekit-docs/solutions/bosch-bis-the-simplest-high-availability-cluster-between-two-redundant-servers-without-shared-disk/ "仕組み：Bosch BIS HA")                                           | [Bosch BIS 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-with-hyper-v/ "Bosch BIS Hyper-V フェイルオーバー向けクイック HA ガイド")                                                                                     | <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv.safe" download="hyperv.safe">⬇️ hyperv.safe</a> (Windows)                                                                                                                                                                                                            |
| 物理セキュリティ / VMS   | [Bosch BVMS VM HA アーキテクチャ](/safekit-docs/solutions/bosch-bvms-the-simplest-high-availability-cluster-between-two-redundant-servers-without-shared-disk/ "仕組み：Bosch BVMS HA")                                        | [Bosch BVMS 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-with-hyper-v/ "Bosch BVMS Hyper-V フェイルオーバー向けクイック HA ガイド")                                                                                   | <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv.safe" download="hyperv.safe">⬇️ hyperv.safe</a> (Windows)                                                                                                                                                                                                            |
| 物理セキュリティ / VMS   | [Hanwha Vision VM HA アーキテクチャ](/safekit-docs/solutions/hanwha-vision-cluster-without-shared-storage-on-a-san/ "仕組み：Hanwha Vision HA")                                                                                | [Hanwha Vision 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-with-hyper-v/ "Hanwha Vision Hyper-V フェイルオーバー向けクイック HA ガイド")                                                                             | <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv.safe" download="hyperv.safe">⬇️ hyperv.safe</a> (Windows)                                                                                                                                                                                                            |
| 物理セキュリティ / VMS   | [Hanwha Wisenet VM HA アーキテクチャ](/safekit-docs/solutions/hanwha-wisenet-wave-the-simplest-high-availability-cluster-between-two-redundant-servers-without-shared-disk/ "仕組み：Hanwha Wisenet HA")                       | [Hanwha Wisenet 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-with-hyper-v/ "Hanwha Wisenet Hyper-V フェイルオーバー向けクイック HA ガイド")                                                                           | <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv.safe" download="hyperv.safe">⬇️ hyperv.safe</a> (Windows)                                                                                                                                                                                                            |
| Siemens 製品             | [Siemens Siveillance VM HA アーキテクチャ](/safekit-docs/solutions/siemens-siveillance-redundancy-high-availability-cluster-active-active/ "仕組み：Siemens Siveillance suite HA")                                             | [Siemens Siveillance suite 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-with-hyper-v/ "Siemens Siveillance suite Hyper-V フェイルオーバー向けクイック HA ガイド")                                                     | <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv.safe" download="hyperv.safe">⬇️ hyperv.safe</a> (Windows)                                                                                                                                                                                                            |
| Siemens 製品             | [Siemens Desigo CC VM HA アーキテクチャ](/safekit-docs/solutions/siemens-desigo-cc-redundancy-high-availability-cluster-active-active/ "仕組み：Siemens Desigo CC HA")                                                         | [Siemens Desigo CC 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-with-hyper-v/ "Siemens Desigo CC Hyper-V フェイルオーバー向けクイック HA ガイド")                                                                     | <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv.safe" download="hyperv.safe">⬇️ hyperv.safe</a> (Windows)                                                                                                                                                                                                            |
| Siemens 製品             | [Siemens Siveillance ミラークラスターアーキテクチャ](/safekit-docs/solutions/siemens-siveillance-vms-the-simplest-high-availability-cluster-between-two-redundant-servers/ "仕組み：Siemens Siveillance VMS フェイルオーバー") | [Siemens Siveillance VMS 向けクイックインストールガイド](/safekit-docs/solutions/siemens-siveillance-vms-the-simplest-high-availability-cluster-between-two-redundant-servers/ "Siemens Siveillance VMS フェイルオーバー向けクイック HA ガイド")                      | <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_windows/SiveillanceVMS.safe" download="SiveillanceVMS.safe">⬇️ SiveillanceVMS.safe</a> (Windows)                                                                                                                                                                                    |
| Siemens 製品             | [Siemens SiPass VM HA アーキテクチャ](/safekit-docs/solutions/siemens-sipass-redundancy-high-availability-cluster-active-active/ "仕組み：Siemens SiPass HA")                                                                  | [Siemens SiPass 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-with-hyper-v/ "Siemens SiPass Hyper-V フェイルオーバー向けクイック HA ガイド")                                                                           | <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv.safe" download="hyperv.safe">⬇️ hyperv.safe</a> (Windows)                                                                                                                                                                                                            |
| Siemens 製品             | [Siemens SIPORT VM HA アーキテクチャ](/safekit-docs/solutions/siemens-siport-redundancy-high-availability-cluster-active-active/ "仕組み：Siemens SIPORT HA")                                                                  | [Siemens SIPORT 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-with-hyper-v/ "Siemens SIPORT Hyper-V フェイルオーバー向けクイック HA ガイド")                                                                           | <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv.safe" download="hyperv.safe">⬇️ hyperv.safe</a> (Windows)                                                                                                                                                                                                            |
| Siemens 製品             | [SIMATIC PCS 7 VM HA アーキテクチャ](/safekit-docs/solutions/siemens-simatic-pcs-7-redundancy-high-availability-cluster-active-active/ "仕組み：Siemens SIMATIC PCS 7 HA")                                                     | [Siemens SIMATIC PCS 7 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-with-hyper-v/ "Siemens SIMATIC PCS 7 Hyper-V フェイルオーバー向けクイック HA ガイド")                                                             | <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv.safe" download="hyperv.safe">⬇️ hyperv.safe</a> (Windows)                                                                                                                                                                                                            |
| Siemens 製品             | [SIMATIC WinCC VM HA アーキテクチャ](/safekit-docs/solutions/siemens-simatic-wincc-redundancy-high-availability-cluster-active-active/ "仕組み：Siemens SIMATIC WinCC HA")                                                     | [Siemens SIMATIC WinCC 向けクイックインストールガイド](/safekit-docs/quick-install/safekit-quick-installation-guide-with-hyper-v/ "Siemens SIMATIC WinCC Hyper-V フェイルオーバー向けクイック HA ガイド")                                                             | <a class="btn-download" href="/safekit-docs/wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv.safe" download="hyperv.safe">⬇️ hyperv.safe</a> (Windows)                                                                                                                                                                                                            |

<!-- END INSERT: insert-safekit-modules-en lang="ja" display="content" -->

<!-- BEGIN INSERT: insert-safekit-4-buttons-en lang="ja" display="content" -->
<div class="button-row">
  <a class="btn-action" href="https://safekit.eviden.com/contact-us-for-safekit/">🧑 お問い合わせ</a>
  <a class="btn-action" href="/safekit-docs/resources/safekit-free-trial/">🎁 評価版のダウンロード</a>
  <a class="btn-action" href="https://training.my.evidian.com/mod/page/view.php?id=712">🏅 無料認定</a>
  <a class="btn-action" href="https://safekit.eviden.com/get-a-quote-safekit/">💰 永久ライセンス費用</a>
</div>
<!-- END INSERT: insert-safekit-4-buttons-en lang="ja" display="content" -->
