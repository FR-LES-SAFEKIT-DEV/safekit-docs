---
title: "旧SafeKit Milestone構成"
canonical: "https://safekit.eviden.com/ja/quick-install/safekit-quick-installation-guide-old-milestone-configuration/"
category: "quick-install"
lang: "ja"
topics: "SafeKit / Milestone XProtectソリューションの旧ステップバイステップ構成"
---

# 旧SafeKit Milestone構成 {#old-safekit-milestone-configuration}

## SafeKit / Milestone XProtectソリューションの古いステップバイステップ構成 {#old-step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


![警告](/wp-content/uploads/2022/07/warning-small.png)


注意：仮想IPアドレスを設定するには、いくつかの特定の手順が必要です。そうしないと、フェイルオーバーが機能しません。

### 1. SafeKitコンソールを起動します {#1-launch-the-safekit-console}

  * `http://localhost:9010`に接続して、いずれかのクラスタノードでブラウザからウェブコンソールを起動します。
  * ユーザー名に`admin` 、パスワードにはインストール時に設定したパスワードを入力してください。


クラスター外部のワークステーション上のブラウザでコンソールを実行することもできます。


![警告](/wp-content/uploads/2022/07/warning-small.png)


SafeKitの設定は、単一のブラウザから両方のノードで行われます。


![注記](/wp-content/uploads/2022/07/note.png)


ウェブコンソールを保護する方法については、ユーザーガイドの「 SafeKitウェブコンソールの保護」を参照してください。


![クラスターを構成するために、 SafeKit Web コンソールを起動します](/wp-content/uploads/2023/01/appli-1.png)


### 2. ノードアドレスを設定します {#2-configure-node-addresses}

  * ノードのIPアドレスを入力してください。
  * 次に、 `Apply`をクリックして設定を保存します。


![警告](/wp-content/uploads/2022/07/warning-small.png)


node1またはnode2の背景色が赤色の場合は、ブラウザと両方のノード間の接続を確認し、トラブルシューティングのために両方のノードのファイアウォールを確認してください。


![注記](/wp-content/uploads/2022/07/note.png)


この操作により、IPアドレスが両方のノード上の`cluster.xml`ファイルに格納されます（詳細はコマンドラインを使用したトレーニングを参照してください）。


![クラスターのノードを入力してください](/wp-content/uploads/2023/01/appli-3.png)


### 3. モジュールを選択します。 {#3-choose-the-module}

  * 「設定」タブで、「.safe」モジュールをクリックします。


![注記](/wp-content/uploads/2022/07/note.png)


インストール時にサーバー側の「Application_Modules/demo/」ディレクトリにモジュールを配置した場合、コンソールはそこにxxx.safe検出します。


![ ](/wp-content/uploads/2023/01/appli-4.png)のモジュールを選択してください


### 4. モジュールを設定します。 {#4-configure-the-module}

  * 起動時に遅延なくモジュールを自動的に起動するオプションを選択してください。
  * 通常、レプリケーションは単一のハートビートネットワーク上で行われます。ただし、必要に応じてプライベートネットワークを定義することもできます。
  * 複製されたディレクトリが両方のノードにインストールされ、アプリケーションデータが含まれていることを確認してください。  
データベースには、データとログの複製が必要です。  
必要に応じて、新しいレプリケートディレクトリを追加できます。
  * 仮想IPアドレスを入力してください。仮想IPアドレスとは、両方のノードのIPアドレスと同じIPネットワーク（同じサブネット）内の標準IPアドレスのことです。  
アプリケーションクライアントは、仮想IPアドレス（または仮想IPアドレスに関連付けられたDNS名）で構成する必要があります。  
障害発生時には、仮想IPアドレスが自動的に切り替わります。
  * `start_prim`と`stop_prim`には、アプリケーションの起動と停止に関する情報が含まれている必要があります。  
これらのスクリプトに新しいサービスを追加できます。  
これらのスクリプト内のサービス名が両方のノードにインストールされているものと一致していることを確認してください。一致していない場合は、スクリプト内のサービス名を変更してください。
  * 両方のノードで、 `start_prim`に設定されているサービスを停止してください。
  * Windowsおよび両方のノードで、 Windowsサービスマネージャを使用して、 `start_prim`に登録されているすべてのサービスに対して`Boot Startup Type = Manual`設定します ( SafeKit `start_prim`のサービスの開始を制御します)。


![警告](/wp-content/uploads/2022/07/warning-small.png)


SQLが管理サーバー上にある場合：

  * [ SQLシステムデータベース](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) （master.mdfやmastlog.ldfなど）は、両ノードで同じディレクトリに配置する必要があります。また、これらのディレクトリはレプリケート構成にする必要があります。
  * 読み取り専用のSQLリソースデータベース[ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>)バイナリ内に存在し、フェイルオーバーに必要となるため、SQLは両ノードのファイルシステム上の同じ場所にインストールする必要があります。このデータベースは複製する必要はありません。
  * SQL Milestoneデータベース (.mdf および .ldf) は](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>) Milestone [のようになります。


![警告](/wp-content/uploads/2022/07/warning-small.png)


プロセスチェッカーにプロセス名が表示されている場合、そのプロセスは監視され、障害発生時には再起動アクションが実行されます。誤ったプロセス名を設定すると、モジュールは起動直後に停止しますのでご注意ください。


![注記](/wp-content/uploads/2022/07/note.png)


「適用」ボタンをクリックすると、両方のノード上の`userconfig.xml` 、 `start_prim` 、 `stop_prim`ファイルに設定が反映されます（詳細はコマンドラインを使用したトレーニングを参照してください）。


![モジュール設定を入力してください](/wp-content/uploads/2023/01/appli-7-1.png)


### 5. 設定が成功したことを確認します {#5-verify-successful-configuration}

  * 両方のノードで成功メッセージ（緑色）を確認し、「次へ」をクリックします。


![モジュール構成の成功を確認します](/wp-content/uploads/2023/01/appli-9-2.png)


### 6. 何も開始せずに閉じるボタンをクリックしてください {#6-do-not-start-anything-and-click-on-the-close-button}


![警告](/wp-content/uploads/2022/07/warning-small.png)


何も開始せず、「閉じる」ボタンをクリックしてください。開始する前に仮想IPアドレスに特別な設定が必要です。


![最新のデータを持つノードを選択してください](/wp-content/uploads/2023/01/appli-10-1.png)


### 7. ノード 1 のデスクトップに移動し、内部ファイルMilestoneに仮想 IP アドレスを設定します {#milestone-files}


![注記](/wp-content/uploads/2022/07/note.png)


Milestone 2022 R3 以降、この手順は不要となり、次のステップで「サーバーコンフィギュレーター - サーバーの登録 - http://virtual-IP" 」によって自動的に実行されます。

管理者権限でPowerShellコマンドラインを開き、ノード1で以下のスクリプトを実行してください。
    
    
    c: /safekit/modules / /bin/UpdateAuthServerUri.ps1


![注記](/wp-content/uploads/2022/07/note.png)


このスクリプトは、2つの内部Milestoneファイルに仮想IPアドレスを設定します。
    
    
    C:\ProgramData\ Milestone \ XProtect Management Server\ ServerConfig.xml
    
    
        <AuthorizationServerUri> /IDP</AuthorizationServerUri> http://** < virtual-ip> **
    
    
    C:\Program Files\ Milestone \ XProtect Management Server\ IIS \IDP\appsettings.json
    
    
        「権限」: " http://**< virtual-ip>** /IDP


![警告](/wp-content/uploads/2022/07/warning-small.png)


このステップでは、仮想IPアドレスが前のステップで正しく設定されていることを前提としています（スクリプトは、 SafeKitコンソールに入力され、 `userconfig.xml`に保存されている仮想IPアドレスを使用します）。


![注記](/wp-content/uploads/2022/07/note.png)


### 8. コンソールで、最新のデータを持つノードプライマリとして起動します。 {#8-start-node-1-as-primary-in-the-console-the-node-with-up-to-date-data}

ステップ7以降、ノード1には最新の複製ディレクトリが存在すると仮定します。

ノード1をプライマリとして強制的に起動します。ノード2が起動すると、ノード1のすべてのデータがノード2にコピーされます。


![警告](/wp-content/uploads/2022/07/warning-small.png)


誤った選択をすると、両方のノードで古いデータが同期されてしまうリスクがあります。


![警告](/wp-content/uploads/2022/07/warning-small.png)


また、アプリケーションはノード1で停止しているものと想定されており、 SafeKitレプリケーションメカニズムをインストールした後、 `start_prim`スクリプトでアプリケーションを起動します。


![最新データを持つノードをプライマリとして強制的に起動する](/wp-content/uploads/2022/07/appli-11-bis.png)


### 9. ALONE（緑色）に切り替わるまで待ちます {#9-wait-for-the-transition-to-alone-green}

  * ノード1はALONE（緑色）状態になるはずです。これは、ノード1で`start_prim`スクリプトが実行されたことを意味します。


![警告](/wp-content/uploads/2022/07/warning-small.png)


ステータスがALONE（緑色）でアプリケーションが起動していない場合は、ノード1のアプリケーションログにある`start_prim`の出力メッセージを確認してください。


![警告](/wp-content/uploads/2022/07/warning-small.png)


ノード1がALONE（緑色）状態に達しない場合は、ノード1のモジュールログを使用してその理由を分析してください。


![警告](/wp-content/uploads/2022/07/warning-small.png)


クラスターが`WAIT (red) not uptodate - STOP (red) not uptodate`状態にある場合は、WAITノードを停止し、プライマリとして強制的に起動します。


![最初のノードはプライマリとして起動し、ALONEになります](/wp-content/uploads/2022/07/appli-11-bis-bis.png)


### 10. ノード 1 のデスクトップで、 Milestone管理サーバーを停止し、仮想 IP アドレスに登録してから再起動します。 {#10-in-the-desktop-of-node-1-stop-then-register-on-the-vitual-ip-address-and-restart-the-milestone-management-server}

画像に示されているメニューに従って、ノード1で以下の手順を実行してください。

  * タスクバーにある**Milestone Management Server**アイコンを右クリックします。
  * **管理サーバーサービスを停止します**
  * 次に、 **Server Configurator...**を選択し、仮想 IP アドレスを登録します。
  * **管理サーバーサービスを開始します**


![注記](/wp-content/uploads/2022/07/note.png)


この手順では、仮想アドレスへの接続を介して、ノード1の管理サーバーをSQLデータベース（ノード1上で実行されている）に登録します。


![警告](/wp-content/uploads/2022/07/warning-small.png)


Milestone 2022 R3 バージョンより前は、登録時に内部Milestoneファイル内の仮想 IP アドレス設定が削除されている可能性があります。この場合、 [手順 7 ](#milestone-files)を繰り返してください。


![注記](/wp-content/uploads/2022/07/note.png)


注: Milestone 2020 R2 より前のバージョンを登録するには、 **暗号化設定の変更...**を使用してください。


![管理サーバーをMilestone 2020+ ](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)に登録します


### 11. Milestone管理クライアントがインストールされているノード1のデスクトップで、サービスとネットワークのURLに仮想IPアドレスを設定します。 {#11-in-the-desktop-of-node-1-with-milestone-management-client-set-the-virtual-ip-address-in-urls-for-services-and-network}


![注記](/wp-content/uploads/2022/07/note.png)


Milestone 2022 R3以降、この手順は不要となり、「サーバーコンフィギュレーター - サーバーの登録 - http://virtual-IP".で自動的に実行されるようになりました。

画像によると：

  1. ノード 1 で**Milestone XProtect**の管理クライアントを開始します。
  2. **ツール**メニューで、 **登録済みサービス**を選択します。 
     * **登録済みサービスの追加/削除**ウィンドウで、リストからサービスを選択し、 **編集**をクリックします。
     * **登録済みサービス**の編集ウィンドウで、サービスの URL アドレスを、仮想 IP アドレスを含む同じ URL アドレスに変更します。
     * ウィンドウに表示されているすべてのサービスについて、これらの手順を繰り返してください。
  3. 同じウィンドウで、 **Network**をクリックします。 
     * **ネットワーク構成**ウィンドウで、サーバーの URL アドレスを、仮想 IP アドレスを含む同じ URL アドレスに変更します。


![ URLとMilestone管理クライアント](/wp-content/uploads/2022/07/milestone-url-vip.png)で仮想IPアドレスを設定します


### 12. Milestone管理クライアントがインストールされているノード1のデスクトップで、管理者ロールを設定して、正しいフェイルオーバーが実行されるようにします {#role}


![注記](/wp-content/uploads/2022/07/note.png)


Milestone " Windows認証 " が Active Directory で構成されている場合、フェイルオーバー後にセカンダリ ノードの外部 AD からユーザー名とパスワードが取得されるため、特別な設定は不要です。

Milestone XProtect管理クライアントを起動すると、「 Windows認証」または「基本認証」 ](</wp-content/uploads/2022/07/milestone-management-server-connect.png>) [ 。

**Milestone XProtect管理クライアント**を開き、 **セキュリティ/ロール**を開きます（画像を参照）。

  * Windowsグループを**BUILTIN\Administrators**に設定します。これにより、セカンダリの管理者ユーザーは、「 Windows認証」を使用してセカンダリのMilestoneに接続できるようになります。
  * フェイルオーバー後にセカンダリノードで確実に再認証を行うため、「基本認証」を使用するユーザー（図中の**Admin** ）を作成してください。「基本認証」の場合、ユーザー名とパスワードはSQLデータベースに保存され、フェイルオーバー後にセカンダリノードで取得されます。


![警告](/wp-content/uploads/2022/07/warning-small.png)


BUILTIN\Administrators グループを設定することで、ローカルのWindows管理者を使用してセカンダリ ノードで認証できるようになります。

そうしないと、フェイルオーバー後にセカンダリ上のローカルアカウントWindowsで認証を行うことができません。

これは、BUILTIN\Administrators グループの SID が両方のノードで同じであるためです。他のローカルグループやローカルユーザーの場合、SID が同じ名前であっても、両方のノードで異なるため、セカンダリノードでの認証はできません。


![管理クライアントMilestoneで役割を設定します](/wp-content/uploads/2022/07/milestone-management-server-roles.png)


### 13. ノード2のデスクトップに移動し、内部ファイルMilestoneに仮想IPアドレスを設定します。 {#milestone-files-2}


![注記](/wp-content/uploads/2022/07/note.png)


Milestone 2022 R3 以降、この手順は不要となり、次のステップで「サーバーコンフィギュレーター - サーバーの登録 - http://virtual-IP" 」によって自動的に実行されます。

管理者権限でPowerShellコマンドラインを開き、ノード2で以下のスクリプトを実行してください。
    
    
    c: /safekit/modules/milestone/bin/UpdateAuthServerUri.ps1


![注記](/wp-content/uploads/2022/07/note.png)


このスクリプトは、2つの内部Milestoneファイルに仮想IPアドレスを設定します。
    
    
    C:\ProgramData\ Milestone \ XProtect Management Server\ ServerConfig.xml
    
    
        <AuthorizationServerUri> /IDP</AuthorizationServerUri> http://** < virtual-ip> **
    
    
    C:\Program Files\ Milestone \ XProtect Management Server\ IIS \IDP\appsettings.json
    
    
        「権限」: " http://**< virtual-ip>** /IDP

### 14. ノード2のデスクトップで、仮想IPアドレスに管理サーバーを登録します。 {#14-in-the-desktop-of-node-2-register-the-management-server-on-the-vitual-ip-address}

  * ノード2のタスクバーで**Server Configurator**を選択し、仮想IPアドレスに登録します（画像を参照）。
  * 次に、 **管理サーバーサービス**を停止します。


![警告](/wp-content/uploads/2022/07/warning-small.png)


ノード2で登録を実行するユーザーのアカウントは、ノード1のMilestoneで管理者ロールを持っている必要があります。

ノード 2 のローカル管理者が登録を行う場合、組み込みグループWindows `BUILTIN\Administrators`管理クライアント / セキュリティ / 役割の[ステップ 12 ](#role)で設定されている必要があります。そうでない場合、登録は機能しません。


![注記](/wp-content/uploads/2022/07/note.png)


この手順では、仮想アドレスへの接続を介して、ノード2の管理サーバーを（ノード1で実行されている）SQLデータベースに登録します。


![警告](/wp-content/uploads/2022/07/warning-small.png)


2022 R3 より前のバージョンのMilestoneでは、登録時に内部のMilestoneファイル内の仮想 IP アドレス構成が削除されている可能性があります。この場合は、 [手順 13 ](#milestone-files-2)を繰り返してください。


![管理サーバーをMilestone 2020+ ](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)に登録します


### 15. ノード2を開始します {#15-start-node-2}

  * コンテキストメニューからノード2を起動します。
  * 2番目の（緑色の）状態になるまでお待ちください。


![注記](/wp-content/uploads/2022/07/note.png)


ノード2は、複製されたディレクトリの再同期（ノード1からノード2へのコピー）中は、SECOND（マゼンタ）状態のままです。

複製されたディレクトリ内の再同期対象ファイルのサイズやネットワーク帯域幅によっては、時間がかかる場合があります。

コピーの進行状況を確認するには、ノード2のモジュールログを詳細表示オプションを有効にして、ウィンドウを更新することを忘れないでください。


![最初のノードはプライマリとして起動し、ALONEになります](/wp-content/uploads/2022/07/appli-11.png)


### 16. クラスターが動作していることを確認します {#16-verify-that-the-cluster-is-operational}

  * クラスターの状態がグリーン/グリーンであり、サービスがPRIMノードで実行され、SECONDノードで実行されていないことを確認してください。


この状態では、ファイル内部の変更のみがリアルタイムで反映されます。


![警告](/wp-content/uploads/2022/07/warning-small.png)


サービスのクライアントとなるコンポーネントは、仮想IPアドレスで構成する必要があります。構成は、DNS名を使用して行うことができます（DNS名が作成され、仮想IPアドレスに関連付けられている場合）。


![ 2 番目のノードは SECOND ](/wp-content/uploads/2022/07/appli-12.png)として開始します


### 17. 録画サーバーで仮想IPアドレスを設定します。 {#17-configure-the-virtual-ip-address-in-recording-servers}

  * 録画サーバーをインストールする場合は、インストールURLに仮想IPアドレスを指定してください。
  * または、録画サーバー側で、次のフィールドに仮想IPアドレスを設定します。 
        
        C:\ProgramData\ Milestone \ XProtect Recording Server\ RecorderConfig.xml
        
            <server> <address>
        
            <server> <authorizationserveraddress>

  * Milestone管理クライアントとMilestoneスマートクライアントを仮想IPアドレスに接続します。


### 18. ノード切り替え後、管理クライアントとスマートクライアントが正常に機能しない {#18-management-client-and-smart-client-are-not-functioning-properly-after-node-switch}

クラスタ構成のXProtect ® 管理サーバーにおいて、ノード切り替え後に Smart Client および管理クライアントで様々な問題が発生する場合があります。この問題は、ノード切り替えの前後でトークンが異なるノードで生成されること、およびトークン検証に必要な特定の証明書へのアクセスに問題が生じることに関連しています。解決策が提供されています (バージョン 2022 R3 から 2023 R2 については、 Milestone KB を参照してください)。

この問題は、 Milestone 2023 R3で解決されています。

### 18.テスト {#18-testing}

  * PRIMノードを停止するには、コンテキストメニューをスクロールして「停止」をクリックします。**最初のテストではスワップを使用しないでください**（理由は下記参照）。
  * 2番目のノードでフェイルオーバーが発生し、そのノードが単独状態（緑色）になることを確認してください。
  * また、 Microsoft管理コンソール（MMC）を使用して、サービスのフェイルオーバーを確認します（ `stop_prim`スクリプトでノード1で停止し、 `start_prim`スクリプトでノード2で開始）。


![警告](/wp-content/uploads/2022/07/warning-small.png)


システムがPRIM-SECOND構成で、すべてが正常に動作している場合は、PRIMを停止し、ALONE状態となるnode2ですべてが正しく動作していることを確認します。すべてが正常であれば、node1で起動を開始し、node2から複製されたディレクトリを再同期します。

問題が発生した場合は、node2を停止し、node1をプライマリとして強制的に起動します。これにより、node1は停止時のローカルで正常なデータを使用して再起動します。

この切り替え処理ではPRIMの停止と起動が行われ、停止直後にノード2からデータが再同期されるため、レプリケーション構成に問題がある場合、正常なデータで再起動する機会はなくなります。


![警告](/wp-content/uploads/2022/07/warning-small.png)


ノード2でアプリケーションが起動せず、状態がALONE（緑）の場合は、ノード2のアプリケーションログにある`start_prim`スクリプトの出力メッセージを確認してください。


![警告](/wp-content/uploads/2022/07/warning-small.png)


ALONE（緑色）に到達しない場合は、ノード2のモジュールログを使用してその理由を分析してください。


![注記](/wp-content/uploads/2022/07/note.png)


テストに関する詳細はユーザーガイドをご覧ください。


![ PRIMサーバー上のモジュールを停止します](/wp-content/uploads/2022/07/appli-19.png)