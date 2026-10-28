---
title: "K3S 고가용성 SafeKit 사용): 장애 조치를 위한 k3s.safe 모듈 설치"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-with-kubernetes/"
description: "SafeKit 에 k3s.safe 모듈을 배포하여 Linux Kubernetes 의 자동 장애 조치를 활성화하십시오. 이 가이드에서는 공유 스토리지가 없는 중요한 Linux 애플리케이션을 위한 2노드 SANless 클러스터 설정 과정을 안내합니다."
category: "quick-install"
lang: "ko"
topics: "Kubernetes 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit / Kubernetes 솔루션 개요, Linux ( k3s.safe )에 SafeKit / Kubernetes 솔루션 설치 및 구성, 클러스터에서 네트워크 격리 시 다양한 시나리오, SafeKit mirror 솔루션 데모, 🔍 SafeKit 고가용성 탐색 허브"
---

# K3S 고가용성 SafeKit 사용): 장애 조치 위한 k3s.safe 모듈 설치 {#k3s-high-availability-with-safekit-install-the-k3ssafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ko app="Kubernetes" mod="k3s"  %}}
 

## SafeKit / Kubernetes 솔루션 개요 {#overview-of-the-safekit--kubernetes-solution}

여기에 솔루션이 설명되어 있습니다: ** 💡 [ Kubernetes K3s 고가용성: 2노드 동기 복제 및 페일오버 ](</solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/>) **

## Linux ( k3s.safe ) 및 에 SafeKit / Kubernetes 솔루션의 설치 및 구성 {#installation-and-configuration-of-the-safekit--kubernetes-solution-on-linux-k3ssafe}

### 1. 패키지를 다운로드하세요. {#1-download-packages}

  * SafeKit 8.2의 무료 버전을 Linux (safekitlinux_xx.bin)에서 다운로드하세요.
  * k3s.safe Linux 모듈을 다운로드하세요
  * k3sconfig.sh 스크립트를 다운로드하세요
  * 문서 (pptx)


참고: k3sconfig.sh 스크립트는 2개의 Linux Ubuntu 24.04 노드에 K3S, MariaDB , NFS, SafeKit 설치합니다.

[ 다운로드 SafeKit ( Linux ) > ](</ko/resources/safekit-free-trial/>)

<a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s.safe" download="k3s.safe"> 다운로드 k3s.safe ( Linux ) > </a> 

[ 다운로드 k3sconfig.sh > ](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3sconfig.sh>)

[ 문서(pdf) > ](</wp-content/uploads/documents/safekit-k3s-en.pdf>)

### 2. 먼저 두 노드 모두에서 {#2-first-on-both-nodes}

루트 권한으로 2개의 Linux Ubuntu 24.04 노드에서 다음 작업을 수행합니다.

  * 노드가 인터넷에 접속할 수 있는지 확인하십시오 (프록시를 통해 접속할 수도 있습니다).
  * k3sconfig.sh , k3s.safe 및 safekit_xx.bin 패키지를 디렉토리에 복사한 다음 해당 디렉토리로 이동하세요.
  * .bin 파일의 이름을 "safekit.bin"으로 변경하세요.
  * k3sconfig.sh 와 safekit.bin이 실행 가능한지 확인하십시오.
  * k3sconfig.sh 스크립트를 편집하고 환경 변수(가상 IP 포함)를 사용 환경에 맞게 사용자 지정하십시오.
  * 두 노드 모두에서 실행: `./k3sconfig.sh prereq`


스크립트는 다음과 같은 기능을 수행합니다.

  * 필요한 데비안 패키지(alien, nfs-kernel-server, nfs-common, mariadb-server)를 설치하세요.
  * 안전한 MariaDB 설치
  * 파일 복제를 위한 디렉터리를 생성합니다.
  * 복제된 디렉터리를 공유할 수 있도록 NFS 서버를 준비합니다.
  * SafeKit 설치하세요


### 3. 첫 번째 노드 에서 {#3-on-the-first-node}

첫 번째 노드에서 실행: `./k3sconfig.sh first`

스크립트는 다음과 같은 기능을 수행합니다.

  * K3S 구성 데이터베이스와 K3S 사용자를 생성합니다.
  * 복제된 스토리지 볼륨 파일(스파스 파일)을 생성하고 이를 xfs 파일 시스템으로 포맷합니다.
  * SafeKit 클러스터 구성을 생성하고 적용합니다.
  * 클러스터에 k3s.safe 모듈을 설치하고 구성합니다.
  * 첫 번째 노드에서 k3s 모듈을 "prim"으로 시작합니다.
  * k3s를 다운로드, 설치 및 시작하세요.
  * nfs-subdir-external-provisioner Helm 차트를 다운로드하고 설치하세요.
  * K3S 토큰을 표시합니다(두 번째 노드 설치 단계에서 사용됨).


### 4. 두 번째 노드 에서 {#4-on-the-second-node}

두 번째 노드에서 실행: `./k3sconfig.sh second <token>`

  * <token> 는 첫 번째 노드에서 " k3sconfig.sh 먼저" 실행이 끝난 후 표시되는 문자열입니다.


스크립트는 다음과 같은 기능을 수행합니다.

  * 첫 번째 노드에서 k3s 모듈이 기본(prim)으로 시작되었는지 확인하십시오.
  * 두 번째 노드에 k3s를 설치하세요
  * k3s 모듈을 시작하세요


### 5. k3s SafeKit 모듈이 두 노드 모두에서 실행 중인지 확인하십시오. {#5-check-that-the-k3s-safekit-module-is-running-on-both-nodes}

다음 명령어를 사용하여 두 노드 모두에서 확인하십시오: `/opt/safekit/safekit –H "*" state`

답변은 이미지와 유사해야 합니다.
    
    
    /opt/safekit/safekit –H " * " 상태
    ---------------- 서버= http://10.0.0.20:9010 ----------------
    관리자 작업=실행
    --------------------- k3s 상태 ---------------------
    
      로컬(127.0.0.1): PRIM(서비스: 사용 가능)(색상: 녹색)
    성공
    ---------------- 서버= http://10.0.0.21:9010 ----------------
    관리자 작업=실행
    --------------------- k3s 상태 ---------------------
    
      로컬(127.0.0.1): 초(서비스: 사용 가능)(색상: 녹색)
    성공
    

### 6. 클러스터 를 관리하려면 SafeKit 웹 콘솔을 시작하십시오. {#6-start-the-safekit-web-console-to-administer-the-cluster}

  * 브라우저를 SafeKit 웹 콘솔 URL `http://server0-IP:9010` 에 연결하세요.
  * 이미지와 유사한 페이지가 표시될 것입니다.
  * Linux 명령줄을 사용하여 K3S가 두 노드 모두에서 시작되었는지( `start_prim` 및 `start_second` 에서 시작됨) 그리고 MariaDB 기본 노드에서 시작되었는지( `start_prim` 에서 시작됨) 확인하십시오.


![ Kubernetes 클러스터가 SafeKit 웹 콘솔 ](/wp-content/uploads/2024/03/14-monitoring-prim-second.png) 에서 시작되었습니다.


### 7. 테스트 {#7-testing}

  * PRIM 노드의 컨텍스트 메뉴를 아래로 스크롤하여 `Stop` 클릭하면 PRIM 노드가 중지됩니다.
  * 두 번째 노드에서 페일오버가 제대로 수행되어 해당 노드가 단독 상태(녹색)가 되는지 확인하십시오.
  * Linux 명령줄을 사용하여 서비스 페일오버를 확인하십시오( `stop_prim` 스크립트에서 노드 1이 중지되고 `start_prim` 스크립트에서 노드 2가 시작됨). MariaDB 와 K3S는 노드 2에서 실행되어야 합니다.


![ 경고 ](/wp-content/uploads/2022/07/warning-small.png)


노드2에서 ALONE(녹색) 상태에 도달하지 못하면 노드2의 모듈 로그를 통해 원인을 분석하십시오.

  * 모듈 로그를 표시하려면 `node2` 클릭하십시오.
  * [ SQL Server 모듈 로그의 예시이며, ](</wp-content/uploads/2024/03/24-module-log-script.png>) 로그에서 `start_prim` 의 서비스 이름이 유효하지 않습니다. sqlserver.exe 프로세스는 모니터링되지만 시작되지 않으므로 모듈이 종료됩니다.


![ 경고 ](/wp-content/uploads/2022/07/warning-small.png)


모든 것이 정상이라면 노드1에서 시작 작업을 시작하여 노드2에서 복제된 디렉터리를 다시 동기화하십시오.

문제가 발생하면 노드2와 [ 중지하고 노드1의 ](</wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png>) 기본 노드로 강제로 시작하도록 합니다. 그러면 노드1은 중지 당시의 로컬 정상 데이터를 사용하여 다시 시작됩니다.


![ 참고 ](/wp-content/uploads/2022/07/note.png)


🛠️ [ 테스트에 대한 자세한 내용은 사용자 설명서를 참조하세요. ](</resources/safekit-user-guide-82/#tests>)


![ PRIM 서버에서 모듈을 중지합니다 ](/wp-content/uploads/2024/03/16-monitoring-prim-second-stop.png)


### 8. WordPress 와 같은 Kubernetes 애플리케이션으로 클러스터를 테스트해 보세요. {#8-try-the-cluster-with-a-kubernetes-application-like-wordpress}

이미지에는 WordPress 설치 예시가 나와 있습니다. Pods를 사용하여 구현된 백엔드 데이터베이스를 갖춘 웹 포털입니다.

여러분도 같은 방식으로 애플리케이션을 배포할 수 있습니다.

WordPress는 자동으로 고가용성을 제공합니다.

  * 해당 데이터(PHP + 데이터베이스)는 SafeKit 에 의해 실시간으로 복제되는 영구 볼륨에 저장됩니다.
  * 사용자가 워드프레스 사이트에 접속할 수 있도록 가상 IP 주소를 제공합니다.
  * 자동 페일오버 및 자동 페일백 기능 포함


참고:

  * WordPress 차트는 <service.port> 및 <service.httpsport> 포트에서 수신 대기하는 로드 밸런싱 서비스를 정의합니다.
  * WordPress는 다음 URL을 통해 접속할 수 있습니다: `http://<virtual-ip>:<service.port>.`
  * 가상 IP는 SafeKit 에서 관리하며 장애 조치 시 자동으로 전환됩니다.
  * K3S는 기본적으로 Klipper를 사용하여 로드 밸런싱을 구현합니다.
  * Klipper는 <virtual ip> : <service.port> 주소에서 수신 대기하며, 선택한 WordPress Pod의 IP 주소와 포트로 TCP/IP 패킷을 라우팅합니다.


    
    
    $ export KUBECONFIG= /etc/rancher/k3s/k3s.yaml
    $ helm repo add bitnami https://charts.bitnami.com/bitnami
    $ helm install my-release bitnami/wordpress --set global.storageClass=nfs-client --set service.ports.http=8099,service.ports.https=4439
    

이전 Helm 명령어를 실행하면 `registry-1.docker.io` 에서 WordPress 이미지가 다운로드됩니다. `registry-1.docker.io` 에서 인증 문제가 발생할 수 있습니다. 이 경우 다음을 수행하십시오.

  * 두 노드 모두에 내부적으로 `/etc/rancher/k3s/registries.yaml` 생성합니다. 
        
        설정:
          "registry-1.docker.io":
            인증:
              사용자 이름: your_user_name
              비밀번호: your_password
            tls:
              insecure_skip_verify: true
        

  * 이를 고려하기 위해 `systemctl stop k3s` 및 `systemctl start k3s` 사용하여 k3를 중지하고 시작합니다.
  * `helm registry login -u your_user_name docker.io` 실행한 다음 비밀번호를 입력하십시오.


### 9. 지원 {#9-support}

  * 지원을 받으려면 노드당 하나씩, 총 2개의 SafeKit `Snapshots` (2개의 .zip 파일)를 다운로드하십시오.


![ 참고 ](/wp-content/uploads/2022/07/note.png)


🛠️ [ 문제 해결은 사용자 설명서를 참조하세요. ](</resources/safekit-user-guide-82/#Troubleshooting>)


![ 지원을 위해 스냅샷을 찍으세요 ](/wp-content/uploads/2024/03/30-snapshots-mirror.png)


### 10. 필요한 경우, 스플릿브레인 체커 구성하십시오. {#10-if-necessary-configure-a-splitbrain-checker}

  * 아래의 [ "클러스터에서 네트워크 격리가 발생할 경우 어떤 시나리오가 있나요?" ](#isolation) 참조하여 스플릿브레인 체커를 구성해야 하는지 확인하십시오.
  * 모듈 구성에서 `Advanced Configuration` (이미지 참조)를 클릭하여 `userconfig.xml` 편집합니다.
  * `userconfig.xml` 의 `<check>` 섹션에 추가하여 스플릿브레인 검사기를 선언하십시오. 
        
        <service>
         ...
         <check>
          ...
          <splitbrain ident="witness" exec="ping" arg="witness IP"/>
         </check>
        

  * `Save and apply` 수정된 userconfig.xml 파일을 두 노드 모두에 재배포하기 위한 새 구성입니다(저장 및 적용하려면 두 노드 모두에서 모듈을 중지해야 합니다).


** 매개변수 ** :

  * `ident="witness"` 리소스 이름( `splitbrain.witness` 을 사용하여 증인을 식별합니다. 이 값을 변경하여 증인을 식별할 수 있습니다.
  * `exec="ping"` 실행할 핑 코드를 참조합니다. 이 값을 변경하지 마십시오.
  * `arg="witness IP"` 는 핑에 대한 인수입니다. 이 값을 검증 요소(일반적으로 라우터)의 IP 주소로 변경하십시오.


![ 매개변수를 입력하십시오 ](/wp-content/uploads/2024/03/05-module-mirror-edit-config.png)



{{%  insert-safekit-network-isolation-ko  %}}
 

## SafeKit mirror 솔루션 시연 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}