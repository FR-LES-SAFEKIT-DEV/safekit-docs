---
title: "이전 SafeKit Milestone 구성"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-old-milestone-configuration/"
category: "quick-install"
lang: "ko"
topics: "SafeKit/Milestone XProtect 솔루션의 이전 단계별 구성"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# 이전 SafeKit Milestone 구성 {#old-safekit-milestone-configuration}

## SafeKit/Milestone XProtect 솔루션의 이전 단계별 구성 {#old-step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


![경고](/wp-content/uploads/2022/07/warning-small.png)


주의하세요. 가상 IP 주소를 구성하려면 특정 단계가 필요하며, 그렇지 않으면 장애 조치가 작동하지 않습니다.

### 1. SafeKit 콘솔을 시작합니다 {#1-launch-the-safekit-console}

  * `http://localhost:9010`에 연결하여 클러스터 노드 중 하나에서 브라우저로 웹 콘솔을 실행합니다.
  * 사용자 이름에 `admin` 입력하고 설치 시 정의한 암호를 입력합니다.


클러스터 외부의 워크스테이션에 있는 브라우저에서 콘솔을 실행할 수도 있습니다.


![경고](/wp-content/uploads/2022/07/warning-small.png)


SafeKit의 구성은 단일 브라우저에서 두 노드 모두에 대해 수행됩니다.


![참고](/wp-content/uploads/2022/07/note.png)


웹 콘솔을 보호하려면 사용 설명서의 SafeKit 웹 콘솔 보호를 참조하십시오.


![SafeKit 웹 콘솔을 시작하여 클러스터를 구성합니다](/wp-content/uploads/2023/01/appli-1.png)


### 2. 노드 주소 구성 {#2-configure-node-addresses}

  * 노드 IP 주소를 입력하세요.
  * 그런 다음 `Apply` 클릭하여 구성을 저장합니다.


![경고](/wp-content/uploads/2022/07/warning-small.png)


node1 또는 node2 배경색이 빨간색이면 두 노드 모두에 대한 브라우저 연결을 확인하고 문제 해결을 위해 두 노드 모두의 방화벽을 확인하십시오.


![참고](/wp-content/uploads/2022/07/note.png)


이 작업을 수행하면 두 노드의 `cluster.xml` 파일에 IP 주소가 배치됩니다(자세한 내용은 명령줄 교육에서 확인하세요).


![클러스터의 노드를 입력하세요](/wp-content/uploads/2023/01/appli-3.png)


### 3. 모듈 선택 {#3-choose-the-module}

  * 구성 탭에서 .safe 모듈을 클릭합니다.


![참고](/wp-content/uploads/2022/07/note.png)


설치 중에 모듈을 해당 디렉터리에 드롭한 경우 콘솔은 서버 측의 'Application_Modules/demo/' 디렉터리에서 xxx.safe 찾습니다.


![모듈 선택](/wp-content/uploads/2023/01/appli-4.png)


### 4. 모듈 구성 {#4-configure-the-module}

  * 부팅 시 모듈이 지연 없이 자동으로 시작되도록 선택하세요.
  * 일반적으로 복제가 이루어지는 단일 하트비트 네트워크가 있습니다. 하지만 필요한 경우 개인 네트워크를 정의할 수 있습니다.
  * 복제된 디렉터리가 두 노드 모두에 설치되어 있고 애플리케이션 데이터가 포함되어 있는지 확인하십시오.  
데이터베이스에는 데이터 및 로그 복제가 필요합니다.  
필요에 따라 새 복제 디렉터리를 추가할 수 있습니다.
  * 가상 IP 주소를 입력합니다. 가상 IP 주소는 두 노드의 IP 주소와 동일한 IP 네트워크(동일한 서브넷)의 표준 IP 주소입니다.  
애플리케이션 클라이언트는 가상 IP 주소(또는 가상 IP 주소와 연결된 DNS 이름)로 구성해야 합니다.  
가상 IP 주소는 장애 발생 시 자동으로 전환됩니다.
  * `start_prim`과 `stop_prim` 애플리케이션의 시작과 중단이 포함되어야 합니다.  
이 스크립트에 새 서비스를 추가할 수 있습니다.  
이 스크립트의 서비스 이름이 두 노드 모두에 설치된 이름인지 확인하고, 그렇지 않은 경우 스크립트에서 수정하십시오.
  * 두 노드 모두에서 `start_prim`에 구성된 서비스를 중지합니다.
  * Windows 및 두 노드 모두에서 Windows 서비스 관리자를 사용하여 `start_prim`에 등록된 모든 서비스의 `Boot Startup Type = Manual` 설정합니다(SafeKit `start_prim`에서 서비스 시작을 제어합니다).


![경고](/wp-content/uploads/2022/07/warning-small.png)


SQL이 관리 서버에 있는 경우:

  * [SQL 시스템 데이터베이스](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (master.mdf 및 mastlog.ldf 등)는 두 노드 모두에서 동일한 디렉터리에 있어야 합니다. 디렉터리는 복제되도록 구성되어야 합니다.
  * 읽기 전용 [SQL 리소스 데이터베이스는](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) 바이너리에 있으며 장애 조치에 필요하므로 SQL은 두 노드 모두의 파일 시스템에서 동일한 위치에 설치되어야 합니다. 이 데이터베이스는 복제할 필요가 없습니다.
  * SQL Milestone 데이터베이스(.mdf 및 .ldf)는 두 노드 모두에서 동일한 디렉터리에 있어야 합니다. 디렉터리는 복제되도록 구성되어야 합니다. 이 [문서](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>)에 따르면 Milestone 데이터베이스는 다음과 같습니다.


![경고](/wp-content/uploads/2022/07/warning-small.png)


프로세스 검사기에 프로세스 이름이 표시되면 실패 시 재시작 작업으로 모니터링됩니다. 잘못된 프로세스 이름을 구성하면 모듈이 시작 직후 중지됩니다.


![참고](/wp-content/uploads/2022/07/note.png)


"적용" 버튼을 누르면 두 노드 모두에서 `userconfig.xml`, `start_prim`, `stop_prim` 파일의 구성이 보고됩니다(자세한 내용은 명령줄 교육에서 확인).


![모듈 설정으로 이동](/wp-content/uploads/2023/01/appli-7-1.png)


### 5. 구성 성공 여부 확인 {#5-verify-successful-configuration}

  * 두 노드 모두에서 성공 메시지(녹색)를 확인하고 다음을 클릭합니다.


![모듈 구성 성공 여부를 확인하세요](/wp-content/uploads/2023/01/appli-9-2.png)


### 6. 아무것도 시작하지 말고 닫기 버튼을 클릭하세요 {#6-do-not-start-anything-and-click-on-the-close-button}


![경고](/wp-content/uploads/2022/07/warning-small.png)


시작하기 전에 가상 IP 주소에 대한 특별한 구성이 필요하므로 아무것도 시작하지 말고 닫기 버튼을 클릭하십시오


![최신 데이터가 있는 노드를 선택하세요](/wp-content/uploads/2023/01/appli-10-1.png)


### 7. 노드 1의 데스크톱으로 이동하여 내부 Milestone 파일에서 가상 IP 주소를 설정합니다 {#milestone-files}


![참고](/wp-content/uploads/2022/07/note.png)


Milestone 2022 R3 이후 이 단계는 더 이상 필요하지 않으며, 다음 단계에서 " Server Configurator - 서버 등록 - http://virtual-IP" 통해 자동으로 수행됩니다.

관리자 권한으로 PowerShell 명령줄에서 노드 1에 다음 스크립트를 실행합니다
    
    
    c:/safekit/modules//bin/UpdateAuthServerUri.ps1


![참고](/wp-content/uploads/2022/07/note.png)


이 스크립트는 2개의 내부 Milestone 파일에서 가상 IP 주소를 설정합니다
    
    
    C:\ProgramData\Milestone\XProtect Management Server\ServerConfig.xml
    
    
        <AuthorizationServerUri>http://**< 가상 IP>**/IDP</AuthorizationServerUri>
    
    
    C:\Program Files\Milestone\XProtect Management Server\IIS\IDP\appsettings.json
    
    
        "Authority": " http://**< 가상 IP>**/IDP"


![경고](/wp-content/uploads/2022/07/warning-small.png)


이 단계에서는 가상 IP 주소가 이전 단계에서 올바르게 구성되었다고 가정합니다(스크립트는 SafeKit 콘솔에 입력되고 `userconfig.xml`에 저장된 가상 IP 주소를 사용합니다).


![참고](/wp-content/uploads/2022/07/note.png)


### 8. 최신 데이터가 있는 노드인 노드 1을 콘솔에서 기본 노드로 시작합니다 {#8-start-node-1-as-primary-in-the-console-the-node-with-up-to-date-data}

7단계부터 노드 1이 최신 복제 디렉터리를 가지고 있다고 가정합니다.

노드 1을 주 노드로 강제 시작합니다. 노드 2가 시작되면 노드 1의 모든 데이터가 노드 2로 복사됩니다.


![경고](/wp-content/uploads/2022/07/warning-small.png)


잘못된 선택을 하면 두 노드에서 오래된 데이터를 동기화할 위험이 있습니다.


![경고](/wp-content/uploads/2022/07/warning-small.png)


또한 SafeKit은 복제 메커니즘을 설치한 다음 `start_prim` 스크립트에서 애플리케이션을 시작할 수 있도록 노드 1에서 애플리케이션이 중지되었다고 가정합니다.


![최신 데이터가 있는 노드를 주 노드로 강제 시작합니다](/wp-content/uploads/2022/07/appli-11-bis.png)


### 9. ALONE (녹색)로 전환될 때까지 기다리세요 {#9-wait-for-the-transition-to-alone-green}

  * 노드 1은 ALONE (녹색) 상태에 도달해야 합니다. 이는 `start_prim` 스크립트가 노드 1에서 실행되었음을 의미합니다.


![경고](/wp-content/uploads/2022/07/warning-small.png)


상태가 ALONE (녹색)이고 애플리케이션이 시작되지 않은 경우 노드 1의 애플리케이션 로그에서 `start_prim`의 출력 메시지를 확인하십시오.


![경고](/wp-content/uploads/2022/07/warning-small.png)


노드 1이 ALONE (녹색) 상태에 도달하지 못하면 노드 1의 모듈 로그를 통해 원인을 분석하십시오.


![경고](/wp-content/uploads/2022/07/warning-small.png)


클러스터가 `WAIT (red) not uptodate - STOP (red) not uptodate` 상태인 경우, WAIT 노드를 중지하고 주 노드로 강제 시작합니다.


![첫 번째 노드는 기본 노드로 시작하여 ALONE 됩니다](/wp-content/uploads/2022/07/appli-11-bis-bis.png)


### 10. 노드 1의 데스크톱에서 Milestone Management Server를 중지한 다음 가상 IP 주소에 등록하고 다시 시작합니다 {#10-in-the-desktop-of-node-1-stop-then-register-on-the-vitual-ip-address-and-restart-the-milestone-management-server}

이미지의 메뉴에 따라 노드 1에서 다음 글머리 기호를 실행하세요

  * 작업 표시줄에서 **Milestone Management Server** 아이콘을 마우스 오른쪽 버튼으로 클릭합니다.
  * **관리 서버 서비스 중지**
  * 그런 다음 **Server Configurator** 선택하고 가상 IP 주소를 등록합니다.
  * **관리 서버 서비스 시작**


![참고](/wp-content/uploads/2022/07/note.png)


이 절차는 가상 주소에 대한 연결을 통해 노드 1 관리 서버를 SQL 데이터베이스(노드 1에서 실행 중)에 등록합니다.


![경고](/wp-content/uploads/2022/07/warning-small.png)


Milestone 2022 R3 버전 이전에는 등록 시 내부 Milestone 파일에서 가상 IP 주소 구성이 삭제되었을 수 있습니다. 이 경우 [7단계](#milestone-files)를 반복하십시오.


![참고](/wp-content/uploads/2022/07/note.png)


참고: Milestone 2020 R2 이전 버전을 등록하려면 **암호화 설정 변경...**을 사용하십시오.


![Milestone 2020+에 관리 서버를 등록합니다](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 11. Milestone Management Client 설치된 노드 1의 데스크톱에서 서비스 및 네트워크 URL에 가상 IP 주소를 설정합니다 {#11-in-the-desktop-of-node-1-with-milestone-management-client-set-the-virtual-ip-address-in-urls-for-services-and-network}


![참고](/wp-content/uploads/2022/07/note.png)


Milestone 2022 R3 이후 이 단계는 더 이상 필요하지 않으며 " Server Configurator - 서버 등록 - http://virtual-IP".

이미지에 따르면:

  1. 노드 1에서 **Milestone XProtect Management Client** 시작합니다.
  2. **도구** 메뉴에서 **등록된 서비스**를 선택합니다. 
     * **등록된 서비스 추가/제거** 창에서 목록에 있는 서비스를 선택하고 **편집**을 클릭합니다.
     * **등록된 서비스 편집** 창에서 서비스의 URL 주소를 동일한 URL 주소이지만 가상 IP 주소를 포함하는 주소로 변경합니다.
     * 창에 나열된 모든 서비스에 대해 이 단계를 반복합니다.
  3. 같은 창에서 **네트워크**를 클릭합니다. 
     * **네트워크 구성** 창에서 서버의 URL 주소를 동일한 URL 주소이지만 가상 IP 주소를 포함하는 주소로 변경합니다.


![URL 및 Milestone Management Client에서 가상 IP 주소를 설정합니다](/wp-content/uploads/2022/07/milestone-url-vip.png)


### 12. Milestone Management Client 설치된 노드 1의 데스크톱에서 관리자 역할을 설정하여 올바른 장애 조치를 보장합니다 {#role}


![참고](/wp-content/uploads/2022/07/note.png)


Milestone " Windows 인증"이 Active Directory로 구성된 경우, 장애 조치 후 보조 노드의 외부 AD에서 사용자/암호가 검색되므로 특별한 구성은 필요하지 않습니다.

Milestone XProtect Management Client 시작할 때 " Windows 인증" 또는 "기본 인증"으로 인증해야 합니다([스크린샷을 보려면 여기를 클릭하십시오](</wp-content/uploads/2022/07/milestone-management-server-connect.png>)).

**Milestone XProtect Management Client** 열고 **보안/역할**로 이동합니다(이미지 참조)

  * Windows 그룹 **BUILTIN\Administrators**를 설정합니다. 따라서 보조 시스템의 관리자 사용자는 " Windows 인증"을 사용하여 보조 시스템의 Milestone에 연결할 수 있습니다.
  * 장애 조치 후 보조 노드에서 다시 인증되도록 "기본 인증"(이미지의 **Admin**)으로 사용자를 만듭니다. "기본 인증"의 경우 사용자/암호는 SQL 데이터베이스에 저장되며 장애 조치 후 보조 노드에서 검색됩니다.


![경고](/wp-content/uploads/2022/07/warning-small.png)


BUILTIN\Administrators 그룹을 설정하면 로컬 Windows 관리자로 보조 노드에서 인증할 수 있습니다.

그렇지 않으면 장애 조치 후 보조 시스템에서 로컬 Windows 계정으로 인증할 수 없습니다.

BUILTIN\Administrators 그룹은 두 노드 모두에서 동일한 SID를 가지기 때문입니다. 다른 로컬 그룹 또는 로컬 사용자의 경우, 이름이 동일하더라도 두 노드 간에 SID가 다르므로 보조 노드에서는 인증이 불가능합니다.


![Milestone Management Client에서 역할 설정](/wp-content/uploads/2022/07/milestone-management-server-roles.png)


### 13. 노드 2의 데스크톱으로 이동하여 내부 Milestone 파일에서 가상 IP 주소를 설정합니다 {#milestone-files-2}


![참고](/wp-content/uploads/2022/07/note.png)


Milestone 2022 R3 이후 이 단계는 더 이상 필요하지 않으며, 다음 단계에서 " Server Configurator - 서버 등록 - http://virtual-IP" 통해 자동으로 수행됩니다.

관리자 권한으로 PowerShell 명령줄에서 노드 2에 이 스크립트를 실행합니다
    
    
    c:/safekit/modules/milestone/bin/UpdateAuthServerUri.ps1


![참고](/wp-content/uploads/2022/07/note.png)


이 스크립트는 2개의 내부 Milestone 파일에서 가상 IP 주소를 설정합니다
    
    
    C:\ProgramData\Milestone\XProtect Management Server\ServerConfig.xml
    
    
        <AuthorizationServerUri>http://**< 가상 IP>**/IDP</AuthorizationServerUri>
    
    
    C:\Program Files\Milestone\XProtect Management Server\IIS\IDP\appsettings.json
    
    
        "Authority": " http://**< 가상 IP>**/IDP"

### 14. 노드 2의 데스크톱에서 가상 IP 주소로 관리 서버를 등록합니다 {#14-in-the-desktop-of-node-2-register-the-management-server-on-the-vitual-ip-address}

  * 노드 2의 작업 표시줄에서 **Server Configurator** 선택하고 가상 IP 주소에 등록합니다(이미지 참조).
  * 그런 다음 **관리 서버 서비스를 중지합니다**.


![경고](/wp-content/uploads/2022/07/warning-small.png)


노드 2에서 등록을 실행하는 사용자의 계정은 노드 1의 Milestone에서 관리자 역할을 가져야 합니다.

노드 2의 로컬 관리자가 등록하는 경우, [12단계](#role)에서 Management Client / Security / Roles에 내장된 Windows 그룹 `BUILTIN\Administrators` 설정되어 있어야 합니다. 그렇지 않으면 등록이 작동하지 않습니다.


![참고](/wp-content/uploads/2022/07/note.png)


이 절차는 가상 주소에 대한 연결을 통해 노드 2 관리 서버를 (노드 1에서 실행 중인) SQL 데이터베이스에 등록합니다.


![경고](/wp-content/uploads/2022/07/warning-small.png)


2022 R3 이전 버전의 Milestone를 사용하는 경우 등록 시 내부 Milestone 파일에서 가상 IP 주소 구성이 삭제되었을 수 있습니다. 이 경우 [13단계](#milestone-files-2)를 반복하십시오.


![Milestone 2020+에 관리 서버를 등록합니다](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 15. 노드 2 시작 {#15-start-node-2}

  * 컨텍스트 메뉴가 있는 시작 노드 2입니다.
  * SECOND (녹색) 상태가 될 때까지 기다리세요.


![참고](/wp-content/uploads/2022/07/note.png)


노드 2는 복제된 디렉터리를 재동기화하는 동안(노드 1에서 노드 2로 복사) SECOND (자홍색) 상태를 유지합니다.

복제된 디렉터리에서 다시 동기화할 파일의 크기와 네트워크 대역폭에 따라 시간이 다소 걸릴 수 있습니다.

복사 진행 상황을 확인하려면 창을 새로고침하는 것을 잊지 말고 상세 옵션을 사용하여 노드 2의 모듈 로그를 확인하세요.


![첫 번째 노드는 기본 노드로 시작하여 ALONE 됩니다](/wp-content/uploads/2022/07/appli-11.png)


### 16. 클러스터가 작동 중인지 확인합니다 {#16-verify-that-the-cluster-is-operational}

  * 클러스터가 녹색/녹색 상태이고 서비스가 PRIM 노드에서 실행되며 SECOND 노드에서는 실행되지 않는지 확인하십시오.


이 상태에서는 파일 내부의 변경 사항만 실시간으로 복제됩니다.


![경고](/wp-content/uploads/2022/07/warning-small.png)


서비스의 클라이언트인 구성 요소는 가상 IP 주소로 구성해야 합니다. 구성은 DNS 이름으로 수행할 수 있습니다(DNS 이름이 생성되어 가상 IP 주소와 연결된 경우).


![두 번째 노드는 SECOND로 시작합니다](/wp-content/uploads/2022/07/appli-12.png)


### 17. 녹화 서버에서 가상 IP 주소 구성 {#17-configure-the-virtual-ip-address-in-recording-servers}

  * 설치 URL에 가상 IP 주소를 지정하여 녹화 서버를 설치합니다.
  * 또는 녹화 서버 측에서 다음 필드에 가상 IP 주소를 설정합니다 
        
        C:\ProgramData\Milestone\XProtect Recording Server\RecorderConfig.xml
        
            <server><address>
        
            <server><authorizationserveraddress>

  * 가상 IP 주소에서 Milestone Management Client와 Milestone Smart Client 연결합니다.


### 18. 노드 전환 후 Management Client 및 Smart Client 제대로 작동하지 않습니다 {#18-management-client-and-smart-client-are-not-functioning-properly-after-node-switch}

클러스터형 XProtect Management Server 설정에서 노드 전환 후 Smart Client 및 Management Client 다양한 문제가 발생합니다. 이 문제는 노드 전환 전후에 서로 다른 노드에서 토큰이 생성되는 것과 토큰 유효성 검사에 필요한 특정 인증서에 액세스하는 문제와 관련이 있습니다. 해결 방법이 제공됩니다(버전 2022 R3 ~ 2023 R2의 경우 Milestone KB 참조).

이 문제는 Milestone 2023 R3에서 해결되었습니다.

### 18. 테스트 {#18-testing}

  * PRIM 노드의 상황별 메뉴를 아래로 스크롤하여 중단을 클릭하여 노드를 중지합니다. **첫 번째 테스트에서는 스왑을 사용하지 마십시오** (아래에서 이유를 참조하십시오).
  * SECOND 노드에 장애 조치가 발생하여 ALONE 작동하는지(녹색) 확인합니다.
  * Microsoft 관리 콘솔(MMC)을 사용하여 서비스의 장애 조치(failover)를 확인합니다(`stop_prim` 스크립트에서 노드 1에서 중지되고 `start_prim` 스크립트에서 노드 2에서 시작됨).


![경고](/wp-content/uploads/2022/07/warning-small.png)


시스템이 PRIM-SECOND이고 모든 것이 제대로 작동하는 경우, PRIM에서 중지하고 ALONE이 되는 node2에서 모든 것이 올바르게 작동하는지 확인하십시오. 모든 것이 괜찮으면 node1에서 시작을 시작하여 node2에서 복제된 디렉터리를 다시 동기화합니다.

문제가 발생하면 node2를 중지하고 node1 주 노드로 강제 시작합니다. 그러면 중지 시점에 로컬에서 정상적인 데이터로 다시 시작됩니다.

이 스왑은 PRIM의 중지-시작을 포함하며, 이는 중지 직후 node2의 데이터를 즉시 재동기화하여 복제 구성에 문제가 있는 경우에도 정상적인 데이터로 재시작할 기회를 남기지 않습니다.


![경고](/wp-content/uploads/2022/07/warning-small.png)


상태가 ALONE (녹색)일 때 노드 2에서 애플리케이션이 시작되지 않은 경우, 노드 2의 애플리케이션 로그에서 `start_prim` 스크립트의 출력 메시지를 확인하십시오.


![경고](/wp-content/uploads/2022/07/warning-small.png)


ALONE (녹색)에 도달하지 못한 경우 노드 2의 모듈 로그를 분석하여 원인을 파악하십시오.


![참고](/wp-content/uploads/2022/07/note.png)


테스트에 대한 자세한 내용은 사용 설명서를 참조하십시오


![PRIM 서버에서 모듈을 중지합니다](/wp-content/uploads/2022/07/appli-19.png)