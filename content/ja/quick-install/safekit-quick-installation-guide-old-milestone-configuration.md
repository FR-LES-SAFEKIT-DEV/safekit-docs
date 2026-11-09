---
title: "旧 SafeKit Milestone 設定"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-old-milestone-configuration/"
category: "quick-install"
lang: "ja"
topics: "SafeKit/Milestone XProtect ソリューションの旧バージョンのステップバイステップ設定"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# 旧 SafeKit Milestone 設定 {#old-safekit-milestone-configuration}

## SafeKit/Milestone XProtect ソリューションの旧バージョンのステップバイステップ設定 {#old-step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


![警告](/wp-content/uploads/2022/07/warning-small.png)


注意：仮想 IP アドレスを設定するには、特定のステップが必要です。そうしないとフェイルオーバーが機能しません。

### 1. SafeKit コンソールを起動します {#1-launch-the-safekit-console}

  * いずれかのクラスターノードで、`http://localhost:9010` に接続してウェブコンソールをブラウザで起動します。
  * ユーザー名に `admin` と入力し、インストール時に定義したパスワードを入力します。


コンソールは、クラスター外部のワークステーションのブラウザーで実行することもできます。


![警告](/wp-content/uploads/2022/07/warning-small.png)


SafeKit の設定は、単一のブラウザから両方のノードで行います。


![注](/wp-content/uploads/2022/07/note.png)


Web コンソールを保護するには、ユーザーガイドの「SafeKit Web コンソールの保護」を参照してください。


![SafeKit ウェブコンソールを起動してクラスターを構成します](/wp-content/uploads/2023/01/appli-1.png)


### 2. ノードアドレスの設定 {#2-configure-node-addresses}

  * ノードの IP アドレスを入力します。
  * 次に、`Apply` をクリックして設定を保存します。


![警告](/wp-content/uploads/2022/07/warning-small.png)


node1 または node2 背景色が赤色の場合は、両方のノードへのブラウザの接続を確認し、トラブルシューティングのために両方のノードのファイアウォールを確認します。


![注](/wp-content/uploads/2022/07/note.png)


この操作により、両方のノードの `cluster.xml` ファイルに IP アドレスが配置されます (コマンドラインを使用したトレーニングで詳細を確認できます)。


![クラスターのノードを入力します](/wp-content/uploads/2023/01/appli-3.png)


### 3. モジュールを選択 {#3-choose-the-module}

  * [構成] タブで、.safe モジュールをクリックします。


![注](/wp-content/uploads/2022/07/note.png)


インストール時にモジュールをそこにドロップした場合、コンソールはサーバー側の「Application_Modules/demo/」ディレクトリで xxx.safe 検索します。


![モジュールを選択してください](/wp-content/uploads/2023/01/appli-4.png)


### 4. モジュールを構成する {#4-configure-the-module}

  * 起動時にモジュールを遅延なく自動起動するように選択します。
  * 通常、レプリケーションは単一のハートビートネットワーク上で行われます。ただし、必要に応じてプライベートネットワークを定義することもできます。
  * レプリケートされたディレクトリが両方のノードにインストールされ、アプリケーションデータが含まれていることを確認します。  
データベースには、データとログのレプリケーションが必要です。  
必要に応じて、新しいレプリケートディレクトリを追加できます。
  * 仮想 IP アドレスを入力します。仮想 IP アドレスは、両方のノードの IP アドレスと同じ IP ネットワーク（同じサブネット）内の標準的な IP アドレスです。  
アプリケーションクライアントは、仮想 IP アドレス（または仮想 IP アドレスに関連付けられた DNS 名）で設定する必要があります。  
障害発生時には、仮想 IP アドレスが自動的に切り替わります。
  * `start_prim` と `stop_prim`、アプリケーションの起動と停止が含まれている必要があります。  
これらのスクリプトに新しいサービスを追加できます。  
これらのスクリプト内のサービス名が両方のノードにインストールされているものと一致していることを確認し、一致しない場合はスクリプト内で修正してください。
  * 両方のノードで、`start_prim` に設定されているサービスを停止します。
  * Windows および両方のノードで、Windows サービスマネージャーを使用して、`start_prim` に登録されているすべてのサービスについて `Boot Startup Type = Manual` に設定します（SafeKit `start_prim` でサービスの開始を制御します）。


![警告](/wp-content/uploads/2022/07/warning-small.png)


SQL が管理サーバー上にある場合：

  * [SQL システムデータベース](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>)(master.mdf や mastlog.ldf など) は、両方のノードで同じディレクトリに配置する必要があります。これらのディレクトリは、レプリケートされるように構成する必要があります。
  * 読み取り専用の[SQL リソースデータベースは](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>)バイナリにあり、フェイルオーバーに必要であるため、SQL は両方のノードのファイルシステムの同じ場所にインストールする必要があります。このデータベースを複製する必要はありません。
  * SQL Milestone データベース（.mdf および .ldf）は、両方のノードで同じディレクトリに配置する必要があります。ディレクトリはレプリケートされるように構成する必要があります。この[記事](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>)によると、Milestone データベースは次のとおりです。


![警告](/wp-content/uploads/2022/07/warning-small.png)


プロセスチェッカーにプロセス名が表示されている場合、障害発生時に再起動アクションで監視されます。誤ったプロセス名を設定すると、モジュールは起動直後に停止します。


![注](/wp-content/uploads/2022/07/note.png)


「適用」ボタンをクリックすると、両方のノードの `userconfig.xml`、`start_prim`、`stop_prim` ファイルの設定が報告されます（コマンドラインを使用したトレーニングで詳細を確認できます）。


![モジュール設定を入力します](/wp-content/uploads/2023/01/appli-7-1.png)


### 5. 設定が正常に完了したことを確認する {#5-verify-successful-configuration}

  * 両方のノードで成功メッセージ（緑色）を確認し、[次へ] をクリックします。


![モジュールの設定が成功したことを確認します](/wp-content/uploads/2023/01/appli-9-2.png)


### 6. 何も起動せずに「閉じる」ボタンをクリックします {#6-do-not-start-anything-and-click-on-the-close-button}


![警告](/wp-content/uploads/2022/07/warning-small.png)


起動前に仮想 IP アドレスに特別な設定が必要なため、何も起動せずに[閉じる]ボタンをクリックしてください


![最新のデータを持つノードを選択します](/wp-content/uploads/2023/01/appli-10-1.png)


### 7. ノード 1 のデスクトップに移動し、Milestone 内部ファイルで仮想 IP アドレスを設定します {#milestone-files}


![注](/wp-content/uploads/2022/07/note.png)


Milestone 2022 R3 以降、この手順は不要であり、次の手順「Server Configurator - サーバーの登録 - http://virtual-IP"で自動的に実行されます。

管理者として PowerShell コマンドラインで、ノード 1 でこのスクリプトを実行します
    
    
    c:/safekit/modules//bin/UpdateAuthServerUri.ps1


![注](/wp-content/uploads/2022/07/note.png)


このスクリプトは、2 つの Milestone 内部ファイルに仮想 IP アドレスを設定します
    
    
    C:\ProgramData\Milestone\XProtect Management Server\ServerConfig.xml
    
    
        <AuthorizationServerUri>http://**<仮想 IP>**/IDP</AuthorizationServerUri>
    
    
    C:\Program Files\Milestone\XProtect Management Server\IIS\IDP\appsettings.json
    
    
        "Authority": " http://**< virtual-ip>**/IDP"


![警告](/wp-content/uploads/2022/07/warning-small.png)


このステップでは、仮想 IP アドレスが前のステップで正しく設定されていると仮定します（スクリプトは、SafeKit コンソールに入力され、`userconfig.xml` に保存された仮想 IP アドレスを使用します）。


![注](/wp-content/uploads/2022/07/note.png)


### 8. コンソールで、最新のデータを持つノード 1 をプライマリとして起動します {#8-start-node-1-as-primary-in-the-console-the-node-with-up-to-date-data}

ステップ 7 以降、ノード 1 が最新のレプリケートされたディレクトリを持っていると仮定します。

ノード 1 をプライマリとして強制的に起動します。ノード 2 が起動すると、ノード 1 のすべてのデータがノード 2 にコピーされます。


![警告](/wp-content/uploads/2022/07/warning-small.png)


誤った選択をすると、両方のノードで古いデータを同期させてしまう危険性があります。


![警告](/wp-content/uploads/2022/07/warning-small.png)


また、SafeKit はレプリケーションメカニズムをインストールし、その後 `start_prim` スクリプトでアプリケーションを起動できるように、アプリケーションはノード 1 で停止していると想定されます。


![最新のデータを持つノードをプライマリとして強制的に起動する](/wp-content/uploads/2022/07/appli-11-bis.png)


### 9. ALONE（緑）に切り替わるまで待ちます {#9-wait-for-the-transition-to-alone-green}

  * ノード 1 は ALONE（緑）状態に達する必要があります。これは、`start_prim` スクリプトがノード 1 で実行されたことを意味します。


![警告](/wp-content/uploads/2022/07/warning-small.png)


ステータスが ALONE（緑）で、アプリケーションが起動していない場合は、ノード 1 のアプリケーションログで `start_prim` の出力メッセージを確認してください。


![警告](/wp-content/uploads/2022/07/warning-small.png)


ノード 1 が ALONE（緑）状態に達しない場合は、ノード 1 のモジュールログで原因を分析してください。


![警告](/wp-content/uploads/2022/07/warning-small.png)


クラスターが `WAIT (red) not uptodate - STOP (red) not uptodate` 状態に移行した場合は、WAIT ノードを停止し、プライマリとして強制的に起動します。


![最初のノードはプライマリとして開始し、ALONE になります](/wp-content/uploads/2022/07/appli-11-bis-bis.png)


### 10. ノード 1 のデスクトップで、Milestone Management Server を停止し、仮想 IP アドレスに登録してから再起動します {#10-in-the-desktop-of-node-1-stop-then-register-on-the-vitual-ip-address-and-restart-the-milestone-management-server}

画像内のメニューに従って、ノード 1 で以下の項目を実行します

  * タスクバーの **Milestone Management Server** アイコンを右クリックします。
  * **管理サーバーサービスを停止**
  * 次に、**Server Configurator ]** を選択し、仮想 IP アドレスを登録します。
  * **管理サーバーサービスを開始**


![注](/wp-content/uploads/2022/07/note.png)


この手順では、仮想アドレスへの接続を介して、ノード 1 の管理サーバーを SQL データベース（ノード 1 で実行中）に登録します。


![警告](/wp-content/uploads/2022/07/warning-small.png)


Milestone 2022 R3 バージョン以前では、登録時に Milestone 内部ファイルから仮想 IP アドレスの設定が削除されている可能性があります。この場合は、[ステップ 7](#milestone-files)を繰り返してください。


![注](/wp-content/uploads/2022/07/note.png)


注：Milestone 2020 R2 より前のバージョンを登録するには、**[暗号化設定の変更...]** を使用します。


![Milestone 2020+で管理サーバーを登録する](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 11. Milestone Management Client を搭載したノード 1 のデスクトップで、サービスとネットワークの URL に仮想 IP アドレスを設定します {#11-in-the-desktop-of-node-1-with-milestone-management-client-set-the-virtual-ip-address-in-urls-for-services-and-network}


![注](/wp-content/uploads/2022/07/note.png)


Milestone 2022 R3 以降、この手順は不要になり、「Server Configurator - サーバーの登録 - http://virtual-IP".

画像によると：

  1. ノード 1 で **Milestone XProtect Management Client** 起動します。
  2. **[ツール]** メニューで、**[登録済みサービス]** を選択します。 
     * **「登録済みサービスの追加/削除」** ウィンドウで、リストからサービスを選択し、**「編集」** をクリックします。
     * **「登録済みサービスの編集」** ウィンドウで、サービスの URL アドレスを、同じ URL アドレスで仮想 IP アドレスを含むものに変更します。
     * ウィンドウに表示されているすべてのサービスについて、これらの手順を繰り返します。
  3. 同じウィンドウで、**[ネットワーク]** をクリックします。 
     * **[ネットワーク構成]** ウィンドウで、サーバーの URL アドレスを、仮想 IP アドレスを含む同じ URL アドレスに変更します。


![URL と Milestone Management Client で仮想 IP アドレスを設定します](/wp-content/uploads/2022/07/milestone-url-vip.png)


### 12. Milestone Management Client を搭載したノード 1 のデスクトップで、管理者ロールを設定して、フェイルオーバーが正しく行われるようにします {#role}


![注](/wp-content/uploads/2022/07/note.png)


Milestone 「Windows 認証」が Active Directory で構成されている場合、フェイルオーバー後にセカンダリノードの外部 AD でユーザー/パスワードが取得されるため、特別な構成は必要ありません。

Milestone XProtect Management Client 起動すると、「Windows 認証」または「基本認証」のいずれかで認証する必要があります（[スクリーンショットはこちらをクリックしてください](</wp-content/uploads/2022/07/milestone-management-server-connect.png>)）。

**Milestone XProtect Management Client** 開き、**[セキュリティ] / [ロール]** の順に選択します (画像参照)

  * Windows グループ **BUILTIN\Administrators** を設定します。これにより、セカンダリ上の管理者ユーザーは、「Windows 認証」を使用してセカンダリ上の Milestone に接続できるようになります。
  * フェイルオーバー後にセカンダリノードで再認証されるように、「基本認証」 (画像では **Admin**) を使用してユーザーを作成します。「基本認証」の場合、ユーザー/パスワードは SQL データベースに保存され、フェイルオーバー後にセカンダリノードで取得されます。


![警告](/wp-content/uploads/2022/07/warning-small.png)


BUILTIN\Administrators グループを設定すると、ローカルの Windows 管理者を使用してセカンダリノードで認証できるようになります。

そうしないと、フェイルオーバー後にセカンダリでローカルの Windows アカウントを使用した認証ができなくなります。

これは、BUILTIN\Administrators グループが両方のノードで同じ SID を持つためです。他のローカルグループまたはローカルユーザーの場合、名前が同じであっても両方のノード間で SID が異なるため、セカンダリでは認証できません。


![Milestone Management Client でロールを設定する](/wp-content/uploads/2022/07/milestone-management-server-roles.png)


### 13. ノード 2 のデスクトップに移動し、内部 Milestone ファイルで仮想 IP アドレスを設定します {#milestone-files-2}


![注](/wp-content/uploads/2022/07/note.png)


Milestone 2022 R3 以降、この手順は不要であり、次の手順「Server Configurator - サーバーの登録 - http://virtual-IP"で自動的に実行されます。

管理者として PowerShell コマンドラインで、ノード 2 でこのスクリプトを実行します
    
    
    c:/safekit/modules/milestone/bin/UpdateAuthServerUri.ps1


![注](/wp-content/uploads/2022/07/note.png)


このスクリプトは、2 つの Milestone 内部ファイルに仮想 IP アドレスを設定します
    
    
    C:\ProgramData\Milestone\XProtect Management Server\ServerConfig.xml
    
    
        <AuthorizationServerUri>http://**<仮想 IP>**/IDP</AuthorizationServerUri>
    
    
    C:\Program Files\Milestone\XProtect Management Server\IIS\IDP\appsettings.json
    
    
        "Authority": " http://**< virtual-ip>**/IDP"

### 14. ノード 2 のデスクトップで、仮想 IP アドレス上の管理サーバーを登録します {#14-in-the-desktop-of-node-2-register-the-management-server-on-the-vitual-ip-address}

  * ノード 2 のタスクバーで **Server Configurator** を選択し、仮想 IP アドレスに登録します（画像参照）。
  * 次に、**管理サーバーサービスを停止します**。


![警告](/wp-content/uploads/2022/07/warning-small.png)


ノード 2 で登録を実行するユーザーのアカウントは、ノード 1 の Milestone で管理者ロールを持っている必要があります。

ノード 2 の Windows 管理者が登録を行う場合、[ステップ 12](#role)で Management Client / Security / Roles に `BUILTIN\Administrators` 設定されている必要があります。そうでない場合、登録は機能しません。


![注](/wp-content/uploads/2022/07/note.png)


この手順では、仮想アドレスへの接続を介して、ノード 2 の管理サーバーを SQL データベース（ノード 1 で実行）に登録します。


![警告](/wp-content/uploads/2022/07/warning-small.png)


2022 R3 より前のバージョンの Milestone では、登録によって内部 Milestone ファイル内の仮想 IP アドレス構成が削除されている可能性があります。この場合は、[手順 13](#milestone-files-2)を繰り返してください。


![管理サーバーを Milestone 2020+に登録する](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 15. ノード 2 を起動する {#15-start-node-2}

  * コンテキストメニューからノード 2 を開始します。
  * SECOND（緑色）の状態になるまで待ちます。


![注](/wp-content/uploads/2022/07/note.png)


ノード 2 は、レプリケートされたディレクトリを再同期している間（ノード 1 からノード 2 へのコピー）、SECOND（マゼンタ）の状態を維持します。

レプリケートされたディレクトリで再同期するファイルのサイズやネットワーク帯域幅によっては、これに時間がかかる場合があります。

コピーの進捗状況を確認するには、ウィンドウを更新することを忘れずに、詳細オプションを付けてノード 2 のモジュールログを参照してください。


![最初のノードはプライマリとして開始し、ALONE になります](/wp-content/uploads/2022/07/appli-11.png)


### 16. クラスターが動作していることを確認します {#16-verify-that-the-cluster-is-operational}

  * PRIM ノードでサービスが実行され、SECOND ノードでは実行されていない状態で、クラスターが緑/緑であることを確認します。


この状態では、ファイル内の変更のみがリアルタイムで複製されます。


![警告](/wp-content/uploads/2022/07/warning-small.png)


サービスのクライアントであるコンポーネントは、仮想 IP アドレスで構成する必要があります。構成は、DNS 名（DNS 名が作成され、仮想 IP アドレスに関連付けられている場合）で行うことができます。


![2 番目のノードは SECOND として開始されます](/wp-content/uploads/2022/07/appli-12.png)


### 17. 録画サーバーで仮想 IP アドレスを設定する {#17-configure-the-virtual-ip-address-in-recording-servers}

  * インストール URL で仮想 IP アドレスを指定して、レコーディングサーバーをインストールします。
  * または、レコーディングサーバー側で、以下のフィールドに仮想 IP アドレスを設定します 
        
        C:\ProgramData\Milestone\XProtect Recording Server\RecorderConfig.xml
        
            <server><address>
        
            <server><authorizationserveraddress>

  * Milestone Management Client と Milestone Smart Client 仮想 IP アドレスに接続します。


### 18. ノード切り替え後、Management Client と Smart Client が正常に機能しない {#18-management-client-and-smart-client-are-not-functioning-properly-after-node-switch}

クラスター化された XProtect Management Server のセットアップでは、ノードの切り替え後に Smart Client と Management Client さまざまな問題が発生します。この問題は、ノードの切り替え前後に異なるノードで生成されるトークンと、トークンの検証に必要な特定の証明書へのアクセスに関する問題に関連しています。解決策が提供されています (バージョン 2022 R3 から 2023 R2 まで、Milestone KB を参照してください)。

この問題は Milestone 2023 R3 で解決されました。

### 18. テスト {#18-testing}

  * PRIM ノードのコンテキストメニューを下にスクロールして[停止]をクリックし、ノードを停止します。**最初のテストではスワップを使用しないでください**（理由は下記参照）。
  * SECOND ノードでフェイルオーバーが発生し、ALONE（緑色）になっていることを確認します。
  * また、Microsoft 管理コンソール（MMC）を使用して、サービスのフェイルオーバーを確認します（`stop_prim` スクリプトでノード 1 で停止し、`start_prim` スクリプトでノード 2 で開始）。


![警告](/wp-content/uploads/2022/07/warning-small.png)


システムが PRIM-SECOND で、すべてが正常に機能している場合は、PRIM を停止し、ALONE になる node2 で、すべてが正しく機能していることを確認します。すべてが問題なければ、node1 で開始を実行します。これにより、node2 からレプリケートされたディレクトリが再同期されます。

問題が発生した場合は、node2 停止し、node1 をプライマリとして強制的に起動します。これにより、停止時のローカルに正常なデータで再起動されます。

このスワップでは、PRIM の停止と再開が行われます。これにより、ノード 2 の停止直後に node2 からデータが再同期されます。レプリケーション構成に問題がある場合、正常なデータで再起動する機会は残りません。


![警告](/wp-content/uploads/2022/07/warning-small.png)


状態が ALONE（緑）のときにノード 2 でアプリケーションが起動していない場合は、ノード 2 のアプリケーションログで `start_prim` スクリプトの出力メッセージを確認してください。


![警告](/wp-content/uploads/2022/07/warning-small.png)


ALONE（緑）に到達しない場合は、ノード 2 のモジュールログで原因を分析してください。


![注](/wp-content/uploads/2022/07/note.png)


テストに関する詳細は、ユーザーガイドをご覧ください


![PRIM サーバー上のモジュールを停止します](/wp-content/uploads/2022/07/appli-19.png)