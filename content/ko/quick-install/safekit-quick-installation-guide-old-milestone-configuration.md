---
title: "이전 SafeKit Milestone 구성"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-old-milestone-configuration/"
category: "quick-install"
lang: "ko"
topics: "SafeKit / Milestone XProtect 솔루션의 이전 단계별 구성"
---

# 이전 SafeKit Milestone 구성 {#old-safekit-milestone-configuration}

## SafeKit / Milestone XProtect 솔루션 의 이전 단계별 구성 {#old-step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


![ 경고 ](/wp-content/uploads/2022/07/warning-small.png)


주의하세요. 가상 IP 주소를 구성하려면 몇 가지 특정 단계를 거쳐야 합니다. 그렇지 않으면 페일오버가 작동하지 않습니다.

### 1. SafeKit 콘솔 를 실행합니다. {#1-launch-the-safekit-console}

  * 클러스터 노드 중 하나의 브라우저에서 `http://localhost:9010` 에 연결하여 웹 콘솔을 실행합니다.
  * 사용자 이름에는 `admin` 입력하고, 비밀번호는 설치 중에 설정한 것으로 입력하십시오.


클러스터 외부에 있는 워크스테이션의 브라우저에서 콘솔을 실행할 수도 있습니다.


![ 경고 ](/wp-content/uploads/2022/07/warning-small.png)


SafeKit 의 설정은 단일 브라우저를 통해 두 노드 모두에서 수행됩니다.


![ 참고 ](/wp-content/uploads/2022/07/note.png)


웹 콘솔 보안 설정에 대한 자세한 내용은 사용자 가이드의 SafeKit 웹 콘솔 보안 설정"을 참조하십시오.


![ 클러스터를 구성하려면 SafeKit 웹 콘솔을 시작하십시오 ](/wp-content/uploads/2023/01/appli-1.png)


### 2. 노드 주소 를 구성합니다. {#2-configure-node-addresses}

  * 노드의 IP 주소를 입력하십시오.
  * 그런 다음 `Apply` 클릭하여 설정을 저장하십시오.


![ 경고 ](/wp-content/uploads/2022/07/warning-small.png)


노드1 또는 노드2의 배경색이 빨간색인 경우, 브라우저가 두 노드 모두에 제대로 연결되어 있는지 확인하고, 문제 해결을 위해 두 노드의 방화벽 설정을 확인하십시오.


![ 참고 ](/wp-content/uploads/2022/07/note.png)


이 작업을 수행하면 두 노드 모두의 `cluster.xml` 파일에 IP 주소가 저장됩니다(명령줄 사용 교육에서 자세한 내용을 확인할 수 있습니다).


![ 클러스터의 노드를 입력하십시오 ](/wp-content/uploads/2023/01/appli-3.png)


### 3. 모듈 를 선택하세요. {#3-choose-the-module}

  * 구성 탭에서 .safe 모듈을 클릭합니다.


![ 참고 ](/wp-content/uploads/2022/07/note.png)


설치 중에 모듈을 서버 측 'Application_Modules/demo/' 디렉터리에 배치한 경우 콘솔은 해당 디렉터리에서 xxx.safe 찾습니다.


![ 모듈을 선택하세요. ](/wp-content/uploads/2023/01/appli-4.png)


### 4. 모듈 를 구성합니다. {#4-configure-the-module}

  * 부팅 시 지연 없이 모듈이 자동으로 시작되도록 선택하십시오.
  * 일반적으로 복제가 이루어지는 단일 하트비트 네트워크가 있습니다. 하지만 필요한 경우 사설 네트워크를 정의할 수도 있습니다.
  * 복제된 디렉터리가 두 노드 모두에 설치되어 있고 애플리케이션 데이터가 포함되어 있는지 확인하십시오.  
데이터베이스에는 데이터와 로그의 복제가 필요합니다.  
필요에 따라 새 복제 디렉터리를 추가할 수 있습니다.
  * 가상 IP 주소를 입력하십시오. 가상 IP 주소는 두 노드의 IP 주소와 동일한 IP 네트워크(동일한 서브넷)에 있는 표준 IP 주소입니다.  
애플리케이션 클라이언트는 가상 IP 주소(또는 가상 IP 주소와 연결된 DNS 이름)로 구성되어야 합니다.  
장애 발생 시 가상 IP 주소가 자동으로 전환됩니다.
  * `start_prim` 및 `stop_prim` 에는 애플리케이션의 시작 및 중지 기능이 포함되어야 합니다.  
이 스크립트에 새로운 서비스를 추가할 수 있습니다.  
이 스크립트에 있는 서비스 이름이 두 노드 모두에 설치된 서비스와 일치하는지 확인하고, 일치하지 않으면 스크립트에서 수정하십시오.
  * `start_prim` 에 구성된 서비스를 양쪽 노드에서 모두 중지하십시오.
  * Windows 와 두 노드 모두에서 Windows 서비스 관리자를 사용하여 `start_prim` 에 등록된 모든 서비스에 대해 `Boot Startup Type = Manual` 설정하십시오( SafeKit `start_prim` 의 서비스 시작을 제어합니다).


![ 경고 ](/wp-content/uploads/2022/07/warning-small.png)


SQL이 관리 서버에 있는 경우:

  * [ SQL 시스템 데이터베이스(예: master.mdf 및 mastlog.ldf) ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) 두 노드의 동일한 디렉터리에 있어야 합니다. 해당 디렉터리는 복제되도록 구성되어 있어야 합니다.
  * SQL은 두 노드의 파일 시스템에서 동일한 위치에 설치해야 합니다. 읽기 전용 SQL 리소스 데이터베이스인 [ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) 바이너리 영역에 위치하고 있으며, 이는 장애 조치에 필수적이기 때문입니다. 이 데이터베이스는 복제할 필요가 없습니다.
  * SQL Milestone 데이터베이스(.mdf 및 .ldf)는 두 노드의 동일한 디렉터리에 있어야 합니다. 해당 디렉터리는 복제되도록 구성되어야 합니다. Milestone 데이터베이스는 이 [ 문서 ](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>) 문서에 따라 다음과 같습니다.


![ 경고 ](/wp-content/uploads/2022/07/warning-small.png)


참고로, 프로세스 검사기에 프로세스 이름이 표시되면 해당 프로세스는 오류 발생 시 재시작 조치가 이루어지도록 모니터링됩니다. 잘못된 프로세스 이름을 설정하면 모듈이 시작 직후 중지됩니다.


![ 참고 ](/wp-content/uploads/2022/07/note.png)


"적용" 버튼을 누르면 두 노드의 `userconfig.xml` , `start_prim` , `stop_prim` 파일에 구성 내용이 기록됩니다(명령줄을 사용한 학습에서 자세한 내용을 확인할 수 있습니다).


![ 모듈 설정을 입력하십시오 ](/wp-content/uploads/2023/01/appli-7-1.png)


### 5. 구성이 성공적으로 완료되었는지 확인합니다 {#5-verify-successful-configuration}

  * 두 노드 모두에서 성공 메시지(녹색)를 확인하고 다음을 클릭하세요.


![ 모듈 구성 성공 여부 확인 ](/wp-content/uploads/2023/01/appli-9-2.png)


### 6. 아무것도 시작하지 말고 닫기 버튼 )을 클릭하십시오. {#6-do-not-start-anything-and-click-on-the-close-button}


![ 경고 ](/wp-content/uploads/2022/07/warning-small.png)


가상 IP 주소에 대한 특별 구성이 필요하므로 아무것도 시작하지 말고 닫기 버튼을 클릭하십시오.


![ 최신 데이터가 있는 노드를 선택하세요 ](/wp-content/uploads/2023/01/appli-10-1.png)


### 7. 노드 1의 데스크톱으로 이동하여 내부 파일 Milestone 에 가상 IP 주소를 설정합니다. {#milestone-files}


![ 참고 ](/wp-content/uploads/2022/07/note.png)


Milestone 2022 R3 버전부터는 이 단계가 필요 없으며 다음 단계인 "서버 구성 도구 - 서버 등록 - http://virtual-IP" "에서 자동으로 수행됩니다.

관리자 권한으로 PowerShell 명령 프롬프트에서 노드 1에 다음 스크립트를 실행하십시오.
    
    
    c: /safekit/modules / /bin/UpdateAuthServerUri.ps1


![ 참고 ](/wp-content/uploads/2022/07/note.png)


이 스크립트는 두 개의 내부 Milestone 파일에 가상 IP 주소를 설정합니다.
    
    
    C:\ProgramData\ Milestone \ XProtect 관리 서버\ ServerConfig.xml
    
    
        <AuthorizationServerUri> /IDP</AuthorizationServerUri> http://** < virtual-ip> **
    
    
    C:\Program Files\ Milestone \ XProtect Management Server\ IIS \IDP\appsettings.json
    
    
        "권한": " http://**< virtual-ip>** /IDP


![ 경고 ](/wp-content/uploads/2022/07/warning-small.png)


이 단계에서는 이전 단계에서 가상 IP 주소가 올바르게 구성되었다고 가정합니다(스크립트는 SafeKit 콘솔에 입력하고 `userconfig.xml` 에 저장된 가상 IP 주소를 사용합니다).


![ 참고 ](/wp-content/uploads/2022/07/note.png)


### 8. 콘솔에서 최신 데이터가 있는 노드인 노드 1 을 기본 노드로 시작합니다. {#8-start-node-1-as-primary-in-the-console-the-node-with-up-to-date-data}

7단계에서 노드 1에 최신 복제 디렉터리가 있다고 가정합니다.

노드 1을 기본 노드로 강제로 시작합니다. 노드 2가 시작될 때 노드 1의 모든 데이터가 노드 2로 복사됩니다.


![ 경고 ](/wp-content/uploads/2022/07/warning-small.png)


잘못된 선택을 하면 두 노드 모두에서 오래된 데이터가 동기화될 위험이 있습니다.


![ 경고 ](/wp-content/uploads/2022/07/warning-small.png)


또한, SafeKit 스크립트가 복제 메커니즘을 설치한 다음 `start_prim` 스크립트에서 애플리케이션을 시작하도록 노드 1에서 애플리케이션이 중지된 것으로 가정합니다.


![ 최신 데이터가 있는 노드를 기본 노드로 강제로 시작하도록 합니다 ](/wp-content/uploads/2022/07/appli-11-bis.png)


### 9. ALONE(녹색)으로 전환될 때까지 기다리세요 {#9-wait-for-the-transition-to-alone-green}

  * 노드 1은 ALONE(녹색) 상태에 도달해야 합니다. 이는 노드 1에서 `start_prim` 스크립트가 실행되었음을 의미합니다.


![ 경고 ](/wp-content/uploads/2022/07/warning-small.png)


상태가 ALONE(녹색)이고 애플리케이션이 시작되지 않은 경우 노드 1의 애플리케이션 로그에서 `start_prim` 출력 메시지를 확인하십시오.


![ 경고 ](/wp-content/uploads/2022/07/warning-small.png)


노드 1이 ALONE(녹색) 상태에 도달하지 못하면 노드 1의 모듈 로그를 통해 원인을 분석하십시오.


![ 경고 ](/wp-content/uploads/2022/07/warning-small.png)


클러스터가 `WAIT (red) not uptodate - STOP (red) not uptodate` 상태인 경우, WAIT 노드를 중지하고 해당 노드를 기본 노드로 강제로 시작하십시오.


![ 첫 번째 노드는 기본 노드로 시작하여 ALONE ](/wp-content/uploads/2022/07/appli-11-bis-bis.png) 가 됩니다.


### 10. 노드 1의 데스크톱에서 Milestone 관리 서버와 관리 서버를 중지한 다음 가상 IP 주소에 등록하고 재시작합니다. {#10-in-the-desktop-of-node-1-stop-then-register-on-the-vitual-ip-address-and-restart-the-milestone-management-server}

이미지에 표시된 메뉴에 따라 노드 1에서 다음 항목들을 실행하십시오.

  * 작업 표시줄에 있는 **Milestone 관리 서버** 아이콘을 마우스 오른쪽 버튼으로 클릭합니다.
  * **관리 서버 서비스 중지**
  * 그런 다음 **서버 구성기...** 선택하고 가상 IP 주소를 등록하십시오.
  * **관리 서버 서비스 시작**


![ 참고 ](/wp-content/uploads/2022/07/note.png)


이 절차는 가상 주소에 대한 연결을 통해 노드 1 관리 서버를 SQL 데이터베이스(노드 1에서 실행 중)에 등록합니다.


![ 경고 ](/wp-content/uploads/2022/07/warning-small.png)


Milestone 2022 R3 이전 버전에서는 등록 과정에서 내부 Milestone 파일의 가상 IP 주소 구성이 삭제되었을 수 있습니다. 이 경우 [ 7단계 및 ](#milestone-files) 단계를 반복하십시오.


![ 참고 ](/wp-content/uploads/2022/07/note.png)


참고: Milestone 2020 R2 이전 버전을 등록하려면 **암호화 설정 변경...** 사용하십시오.


![ 관리 서버를 Milestone 2020+ ](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png) 에 등록합니다.


### 11. Milestone 관리 클라이언트가 설치된 노드 1의 데스크톱에서 서비스 및 네트워크의 URL에 가상 IP 주소 설정합니다. {#11-in-the-desktop-of-node-1-with-milestone-management-client-set-the-virtual-ip-address-in-urls-for-services-and-network}


![ 참고 ](/wp-content/uploads/2022/07/note.png)


Milestone 2022 R3 버전부터는 이 단계가 더 이상 필요하지 않으며 "서버 구성 도구 - 서버 등록 - http://virtual-IP". 를 통해 자동으로 수행됩니다.

이미지에 따르면:

  1. 노드 1에서 **Milestone XProtect 관리 클라이언트** 를 시작합니다.
  2. **Tools** 메뉴에서 **Registered Services** 선택합니다. 
     * **등록된 서비스 추가/제거** 창에서 목록에서 서비스를 선택하고 **편집** 클릭합니다.
     * **등록된 서비스** 편집 창에서 서비스의 URL 주소를 동일한 URL 주소이되 가상 IP 주소를 포함하도록 변경합니다.
     * 창에 나열된 모든 서비스에 대해 이 단계를 반복하십시오.
  3. 같은 창에서 **네트워크** 를 클릭합니다. 
     * **네트워크 구성** 창에서 서버의 URL 주소를 동일한 URL 주소이되 가상 IP 주소를 포함하도록 변경하십시오.


![ URL 및 Milestone 관리 클라이언트 ](/wp-content/uploads/2022/07/milestone-url-vip.png) 에 가상 IP 주소를 설정합니다.


### 12. Milestone 관리 클라이언트가 설치된 노드 1의 데스크톱에서 관리자 역할을 설정하여 장애 조치가 올바르게 수행되도록 합니다. {#role}


![ 참고 ](/wp-content/uploads/2022/07/note.png)


Active Directory를 사용하여 Milestone " Windows 인증"이 구성된 경우, 장애 조치 후 보조 노드의 외부 AD에서 사용자/암호를 가져오므로 별도의 구성이 필요하지 않습니다.

Milestone XProtect 관리 클라이언트를 시작할 때 " Windows 인증" 또는 "기본 인증"( [ 스크린샷을 보려면 여기를 클릭하세요, ](</wp-content/uploads/2022/07/milestone-management-server-connect.png>) )을 사용하여 인증해야 합니다.

**Milestone XProtect 관리 클라이언트,** 열고 **보안/역할,** 를 엽니다(이미지 참조).

  * Windows 그룹을 **BUILTIN\Administrators** 로 설정하십시오. 이렇게 하면 보조 서버의 관리자 사용자가 " Windows 인증"을 사용하여 보조 서버의 Milestone 에 연결할 수 있습니다.
  * 장애 조치 후 보조 노드에서 재인증이 이루어지도록 "기본 인증"을 사용하는 사용자(이미지의 **관리자** )를 생성하십시오. "기본 인증"의 경우 사용자/암호가 SQL 데이터베이스에 저장되며 장애 조치 후 보조 노드에서 검색됩니다.


![ 경고 ](/wp-content/uploads/2022/07/warning-small.png)


BUILTIN\Administrators 그룹을 설정하면 로컬 관리자 Windows 를 사용하여 보조 노드에서 인증할 수 있습니다.

그렇지 않으면 장애 조치 후 보조 서버에서 로컬 Windows 계정을 사용한 인증이 불가능합니다.

이는 BUILTIN\Administrators 그룹이 두 노드에서 동일한 SID를 가지고 있기 때문입니다. 다른 로컬 그룹이나 로컬 사용자의 경우, 두 노드의 SID가 다르기 때문에 이름은 같더라도 보조 노드에서 인증이 불가능합니다.


![ 관리 클라이언트 Milestone 에서 역할 설정 ](/wp-content/uploads/2022/07/milestone-management-server-roles.png)


### 13. 노드 2의 데스크톱으로 이동하여 내부 파일 Milestone 에서 가상 IP 주소를 설정합니다. {#milestone-files-2}


![ 참고 ](/wp-content/uploads/2022/07/note.png)


Milestone 2022 R3 버전부터는 이 단계가 필요 없으며 다음 단계인 "서버 구성 도구 - 서버 등록 - http://virtual-IP" "에서 자동으로 수행됩니다.

관리자 권한으로 PowerShell 명령 프롬프트에서 노드 2에 다음 스크립트를 실행하십시오.
    
    
    c: /safekit/modules/milestone/bin/UpdateAuthServerUri.ps1


![ 참고 ](/wp-content/uploads/2022/07/note.png)


이 스크립트는 두 개의 내부 Milestone 파일에 가상 IP 주소를 설정합니다.
    
    
    C:\ProgramData\ Milestone \ XProtect 관리 서버\ ServerConfig.xml
    
    
        <AuthorizationServerUri> /IDP</AuthorizationServerUri> http://** < virtual-ip> **
    
    
    C:\Program Files\ Milestone \ XProtect Management Server\ IIS \IDP\appsettings.json
    
    
        "권한": " http://**< virtual-ip>** /IDP

### 14. 노드 2의 데스크톱에서 가상 IP 주소 에 관리 서버를 등록합니다. {#14-in-the-desktop-of-node-2-register-the-management-server-on-the-vitual-ip-address}

  * 노드 2의 작업 표시줄에서 **서버 구성기** 선택하고 가상 IP 주소에 등록합니다(이미지 참조).
  * 그런 다음 **관리 서버 서비스** 중지합니다.


![ 경고 ](/wp-content/uploads/2022/07/warning-small.png)


노드 2에서 등록을 실행하는 사용자의 계정은 노드 1의 Milestone 에서 관리자 역할을 가지고 있어야 합니다.

노드 2의 로컬 관리자가 등록을 수행하는 경우, 관리 클라이언트/보안/역할의 12단계 ](#role) [ 에서 내장 그룹 Windows `BUILTIN\Administrators` 설정되어 있어야 합니다. 그렇지 않으면 등록이 작동하지 않습니다.


![ 참고 ](/wp-content/uploads/2022/07/note.png)


이 절차는 가상 주소에 대한 연결을 통해 노드 2 관리 서버를 SQL 데이터베이스(노드 1에서 실행 중)에 등록합니다.


![ 경고 ](/wp-content/uploads/2022/07/warning-small.png)


2022 R3 이전 버전의 Milestone 사용하는 경우 등록 과정에서 내부 Milestone 파일의 가상 IP 주소 구성이 삭제되었을 수 있습니다. 이 경우 [ 13단계 ](#milestone-files-2) 다시 수행하십시오.


![ 관리 서버를 Milestone 2020+ ](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png) 에 등록합니다.


### 15. 노드 2 시작 {#15-start-node-2}

  * 컨텍스트 메뉴를 사용하여 노드 2를 시작합니다.
  * 두 번째 (녹색) 상태가 될 때까지 기다리세요.


![ 참고 ](/wp-content/uploads/2022/07/note.png)


노드 2는 복제된 디렉터리를 재동기화하는 동안(노드 1에서 노드 2로 복사하는 동안) 두 번째(자홍색) 상태를 유지합니다.

복제된 디렉터리에서 다시 동기화해야 하는 파일 크기와 네트워크 대역폭에 따라 시간이 다소 걸릴 수 있습니다.

복사 진행 상황을 확인하려면 노드 2의 모듈 로그를 자세한 정보 표시 옵션으로 확인하고 창을 새로 고치는 것을 잊지 마세요.


![ 첫 번째 노드는 기본 노드로 시작하여 ALONE ](/wp-content/uploads/2022/07/appli-11.png) 가 됩니다.


### 16. 클러스터가 정상적으로 작동하는지 확인하십시오 {#16-verify-that-the-cluster-is-operational}

  * 클러스터 상태가 녹색/녹색인지, 그리고 서비스가 PRIM 노드에서 실행 중이고 SECOND 노드에서 실행되지 않는지 확인하십시오.


이 상태에서는 파일 내부의 변경 사항만 실시간으로 복제됩니다.


![ 경고 ](/wp-content/uploads/2022/07/warning-small.png)


서비스를 이용하는 클라이언트 구성 요소는 가상 IP 주소로 구성되어야 합니다. 구성은 DNS 이름을 사용하여 수행할 수 있습니다(가상 IP 주소와 연결된 DNS 이름이 생성된 경우).


![ 두 번째 노드는 SECOND ](/wp-content/uploads/2022/07/appli-12.png) 로 시작합니다.


### 17. 녹화 서버에 가상 IP 주소 구성하십시오. {#17-configure-the-virtual-ip-address-in-recording-servers}

  * 녹화 서버를 설치할 때 설치 URL에 가상 IP 주소를 지정하십시오.
  * 또는 녹화 서버 측에서 다음 필드에 가상 IP 주소를 설정하십시오. 
        
        C:\ProgramData\ Milestone \ XProtect 녹화 서버\ RecorderConfig.xml
        
            <server> <address>
        
            <server> <authorizationserveraddress>

  * Milestone 관리 클라이언트와 Milestone 스마트 클라이언트를 가상 IP 주소에 연결합니다.


### 18. 노드 전환 후 관리 클라이언트와 스마트 클라이언트가 제대로 작동하지 않습니다. {#18-management-client-and-smart-client-are-not-functioning-properly-after-node-switch}

클러스터링된 XProtect ® 관리 서버 구성에서 노드 전환 후 스마트 클라이언트와 관리 클라이언트에서 여러 가지 문제가 발생합니다. 이 문제는 노드 전환 전후에 서로 다른 노드에서 토큰이 생성되는 것과 토큰 유효성 검사에 필요한 특정 인증서에 접근하는 데 문제가 있는 것과 관련이 있습니다. 해결 방법이 제공됩니다(2022 R3~2023 R2 버전의 경우 Milestone 기술 자료를 참조하십시오).

이 문제는 Milestone 2023 R3 버전에서 해결되었습니다.

### 18. 테스트 {#18-testing}

  * PRIM 노드의 컨텍스트 메뉴를 아래로 스크롤하여 '중지'를 클릭하면 노드가 중지됩니다. **첫 번째 테스트에서는 스왑 기능을 사용하지 마십시오.** (이유는 아래 참조).
  * 두 번째 노드에서 페일오버가 제대로 수행되어 해당 노드가 단독 상태(녹색)가 되는지 확인하십시오.
  * 또한 Microsoft 관리 콘솔(MMC)을 사용하여 서비스 페일오버를 확인하십시오( `stop_prim` 스크립트에서 노드 1에서 중지되고 `start_prim` 스크립트에서 노드 2에서 시작됨).


![ 경고 ](/wp-content/uploads/2022/07/warning-small.png)


시스템이 PRIM-SECOND 구성이고 모든 것이 정상적으로 작동하는 경우, PRIM 노드를 중지하고 노드2(ALONE 상태가 됨)에서 모든 것이 정상적으로 작동하는지 확인하십시오. 모든 것이 정상이라면 노드1을 시작하여 노드2에서 복제된 디렉터리를 다시 동기화하십시오.

문제가 발생하면 노드2를 중지하고 노드1을 기본 노드로 강제로 시작하십시오. 그러면 노드1은 중지 당시의 로컬 정상 데이터를 사용하여 다시 시작됩니다.

이 교체 과정은 PRIM의 중지-재시작을 포함하며, 이로 인해 노드2의 데이터가 중지된 직후 즉시 재동기화되므로 복제 구성 문제가 발생할 경우 정상적인 데이터로 재시작할 가능성이 없어집니다.


![ 경고 ](/wp-content/uploads/2022/07/warning-small.png)


노드 2의 상태가 ALONE(녹색)일 때 애플리케이션이 시작되지 않으면 노드 2의 애플리케이션 로그에서 `start_prim` 스크립트의 출력 메시지를 확인하십시오.


![ 경고 ](/wp-content/uploads/2022/07/warning-small.png)


ALONE(녹색) 상태에 도달하지 못하면 노드 2의 모듈 로그를 통해 원인을 분석하십시오.


![ 참고 ](/wp-content/uploads/2022/07/note.png)


테스트에 대한 자세한 내용은 사용자 설명서를 참조하십시오.


![ PRIM 서버에서 모듈을 중지합니다 ](/wp-content/uploads/2022/07/appli-19.png)