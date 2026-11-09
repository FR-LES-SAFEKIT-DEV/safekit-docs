---
title: "SafeKit을 사용한 K3S 고가용성: 장애 조치를 위한 k3s.safe 모듈 설치"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-with-kubernetes/"
description: "SafeKit용 k3s.safe 모듈을 배포하여 Linux에서 Kubernetes의 동기식 실시간 복제 및 자동 장애 조치를 활성화하세요. 이 가이드는 공유 스토리지 없이 중요한 Linux 애플리케이션을 위한 2노드 SANless 클러스터를 설정하는 과정을 안내합니다."
category: "quick-install"
lang: "ko"
topics: "Kubernetes 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit/Kubernetes 솔루션 개요, Linux에 SafeKit/Kubernetes 솔루션 설치 및 구성(k3s.safe), 클러스터에서 네트워크가 고립될 경우 발생할 수 있는 다양한 시나리오는 무엇인가요?, SafeKit mirror 솔루션 시연, 🔍 SafeKit 살펴보기"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# SafeKit을 사용한 K3S 고가용성: 장애 조치를 위한 k3s.safe 모듈 설치 {#k3s-high-availability-with-safekit-install-the-k3ssafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ko app="Kubernetes" mod="k3s"  %}}
 

## SafeKit/Kubernetes 솔루션 개요 {#overview-of-the-safekit--kubernetes-solution}

솔루션은 다음에서 설명합니다. **💡 [Kubernetes K3s 고가용성: 2노드 동기 복제 및 장애 조치](</ko/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/>)**

## Linux에 SafeKit/Kubernetes 솔루션 설치 및 구성(k3s.safe) {#installation-and-configuration-of-the-safekit--kubernetes-solution-on-linux-k3ssafe}

### 1. 패키지 다운로드 {#1-download-packages}

  * Linux용 SafeKit 8.2 무료 버전 다운로드(safekitlinux_xx.bin)
  * k3s.safe Linux 모듈을 다운로드하세요
  * k3sconfig.sh 스크립트를 다운로드하세요
  * 문서(pptx)


참고: k3sconfig.sh 스크립트는 2개의 Linux Ubuntu 24.04 노드에 K3S, MariaDB, NFS, SafeKit을 설치합니다.

[SafeKit (Linux) 다운로드 >](</ko/resources/safekit-free-trial/>)

<a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s.safe" download="k3s.safe">k3s.safe 다운로드(Linux) ></a> 

[k3sconfig.sh 다운로드 >](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3sconfig.sh>)

[설명서(pdf) >](</wp-content/uploads/documents/safekit-k3s-en.pdf>)

### 2. 두 노드 모두에서 먼저 {#2-first-on-both-nodes}

루트 권한으로 2개의 Linux Ubuntu 24.04 노드에서 다음을 수행합니다

  * 노드가 인터넷에 접속할 수 있는지 확인하세요(프록시를 통해 접속할 수도 있음)
  * k3sconfig.sh, k3s.safe 및 safekit_xx.bin 패키지를 디렉터리로 복사한 다음 해당 디렉터리로 이동합니다
  * .bin 파일의 이름을 "safekit.bin"으로 변경하세요
  * k3sconfig.sh와 safekit.bin이 실행 가능한지 확인하세요.
  * k3sconfig.sh 스크립트를 편집하고 환경에 맞게 환경 변수(가상 IP 포함)를 사용자 지정합니다
  * 두 노드 모두에서 다음을 실행합니다. `./k3sconfig.sh prereq`


스크립트는 다음을 수행합니다

  * 필요한 데비안 패키지 설치: alien, nfs-kernel-server, nfs-common, mariadb-server
  * MariaDB 보안 설치
  * 파일 복제를 위한 디렉터리 생성
  * 복제된 디렉터리를 공유하도록 NFS 서버를 준비합니다
  * SafeKit은 설치


### 3. 첫 번째 노드에서 {#3-on-the-first-node}

첫 번째 노드에서 실행: `./k3sconfig.sh first`

스크립트는 다음을 수행합니다

  * K3S 구성 데이터베이스 및 k3s 사용자 생성
  * 복제된 스토리지 볼륨 파일(희소 파일)을 생성하고 xfs 파일 시스템으로 포맷합니다
  * safekit 클러스터를 구성을 생성하고 적용합니다
  * 클러스터에 k3s.safe 모듈을 설치하고 구성합니다
  * 첫 번째 노드에서 k3s 모듈을 "prim"으로 시작합니다
  * k3s 다운로드, 설치 및 시작
  * nfs-subdir-external-provisioner Helm 차트를 다운로드하여 설치합니다
  * K3S 토큰 표시(두 번째 노드 설치 단계에서 사용)


### 4. 두 번째 노드에서 {#4-on-the-second-node}

두 번째 노드에서 다음을 실행합니다. `./k3sconfig.sh second <token>`

  * <token> 은 첫 번째 노드에서 " k3sconfig.sh first"를 실행했을 때 마지막에 표시되는 문자열입니다


스크립트는 다음을 수행합니다

  * 첫 번째 노드에서 k3s 모듈이 prim으로 시작되었는지 확인하세요
  * 두 번째 노드에 k3s를 설치합니다
  * k3s 모듈을 시작합니다


### 5. k3s SafeKit 모듈이 두 노드 모두에서 실행 중인지 확인합니다 {#5-check-that-the-k3s-safekit-module-is-running-on-both-nodes}

두 노드 모두에서 다음 명령으로 확인하십시오. `/opt/safekit/safekit –H "*" state`

답변은 이미지와 유사해야 합니다.
    
    
    /opt/safekit/safekit –H "*" state
    ---------------- 서버= http://10.0.0.20:9010 ----------------
    admin 작업=실행
    --------------------- k3s 상태 ---------------------
    
      로컬(127.0.0.1): PRIM (서비스: 사용 가능)(색상: 녹색)
    성공
    ---------------- 서버= http://10.0.0.21:9010 ----------------
    admin 작업=실행
    --------------------- k3s 상태 ---------------------
    
      로컬(127.0.0.1): SECOND (서비스: 사용 가능)(색상: 녹색)
    성공
    

### 6. SafeKit 웹 콘솔을 시작하여 클러스터를 관리합니다 {#6-start-the-safekit-web-console-to-administer-the-cluster}

  * 브라우저를 SafeKit 웹 콘솔 URL `http://server0-IP:9010`에 연결합니다.
  * 이미지와 유사한 페이지가 표시됩니다.
  * Linux 명령줄을 사용하여 두 노드 모두에서 K3S 시작되었는지(`start_prim` 및 `start_second`에서 시작됨) 기본 노드에서 MariaDB 시작되었는지(`start_prim`에서 시작됨) 확인합니다.


![SafeKit 웹 콘솔에서 Kubernetes 클러스터가 시작되었습니다](/wp-content/uploads/2024/03/14-monitoring-prim-second.png)


### 7. 테스트 {#7-testing}

  * PRIM 노드의 상황별 메뉴를 아래로 스크롤하여 `Stop` 클릭하여 노드를 중지합니다.
  * SECOND 노드에 장애 조치가 발생하여 ALONE 작동하는지(녹색) 확인합니다.
  * Linux의 명령줄을 사용하여 서비스의 장애 조치(`stop_prim` 스크립트에서 노드 1에서 중지되고 `start_prim` 스크립트에서 노드 2에서 시작됨)를 확인합니다. MariaDB와 K3S node2에서 실행되어야 합니다.


![경고](/wp-content/uploads/2022/07/warning-small.png)


node2에서 ALONE (녹색) 상태에 도달하지 못했다면 노드 2의 모듈 로그를 통해 원인을 분석하십시오.

  * 모듈 로그를 표시하려면 `node2` 클릭하세요.
  * `start_prim`의 서비스 이름이 유효하지 않은 [SQL Server 모듈 로그의 예입니다](</wp-content/uploads/2024/03/24-module-log-script.png>). sqlserver.exe 프로세스는 모니터링되지만 시작되지 않으므로 모듈이 결국 중지됩니다.


![경고](/wp-content/uploads/2022/07/warning-small.png)


모든 것이 정상이라면 node1에서 시작을 실행하여 node2에서 복제된 디렉터리를 다시 동기화합니다.

문제가 발생하면 node2를 중지하고 node1 [주 노드로 강제 시작합니다](</wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png>). 그러면 중지 시점에 로컬에서 정상적인 데이터로 다시 시작됩니다.


![참고](/wp-content/uploads/2022/07/note.png)


🛠️ [테스트에 대한 자세한 내용은 사용 설명서를 참조하세요.](</ko/resources/safekit-user-guide-82/#tests>)


![PRIM 서버에서 모듈을 중지합니다](/wp-content/uploads/2024/03/16-monitoring-prim-second-stop.png)


### 8. 워드프레스와 같은 Kubernetes 애플리케이션으로 클러스터를 사용해 보세요 {#8-try-the-cluster-with-a-kubernetes-application-like-wordpress}

이미지에는 워드프레스 설치 예시가 나와 있습니다. 백엔드 데이터베이스가 포드로 구현된 웹 포털입니다.

동일한 방식으로 자체 애플리케이션을 배포할 수 있습니다.

워드프레스는 자동으로 높은 가용성을 제공합니다

  * SafeKit이 실시간으로 복제하는 영구 볼륨에 데이터(php + 데이터베이스)를 저장합니다
  * 사용자가 워드프레스 사이트에 접속할 수 있도록 가상 IP 주소를 제공합니다
  * 자동 장애 조치 및 자동 페일백 포함


참고:

  * 워드프레스 차트는 <service.port> 및 <service.httpsport> 포트에서 수신 대기하는 로드 밸런싱 서비스를 정의합니다.
  * 워드프레스는 다음 URL을 통해 접속할 수 있습니다: `http://<virtual-ip>:<service.port>.`
  * 가상 IP는 SafeKit에서 관리하며 장애 조치 시 자동으로 전환됩니다.
  * 기본적으로 K3S Klipper를 사용하여 로드 밸런서를 구현합니다.
  * Klipper는 <virtual ip>: <service.port> 에서 수신 대기하고 TCP/IP 패킷을 선택한 WordPress 포드의 IP 주소 및 포트로 라우팅합니다.


    
    
    $ export KUBECONFIG= /etc/rancher/k3s/k3s.yaml
    $ helm repo add bitnami https://charts.bitnami.com/bitnami
    $ helm install my-release bitnami/wordpress --set global.storageClass=nfs-client --set service.ports.http=8099,service.ports.https=4439
    

이전 helm 명령은 `registry-1.docker.io`에서 WordPress 이미지를 다운로드해야 합니다. `registry-1.docker.io`에서 인증 문제가 발생할 수 있습니다. 이 경우 다음을 수행해야 합니다

  * 두 노드 모두에 다음 내용으로 `/etc/rancher/k3s/registries.yaml` 파일을 생성합니다 
        
        configs:
          "registry-1.docker.io":
            auth:
              username: your_user_name
              password: your_password
            tls:
              insecure_skip_verify: true
        

  * k3s를 중지했다가 다시 시작하여 변경 사항을 적용하려면 `systemctl stop k3s` 및 `systemctl start k3s` 사용하세요.
  * `helm registry login -u your_user_name docker.io` 실행한 다음 암호를 입력하세요


### 9. 지원 {#9-support}

  * 지원을 받으려면 각 노드에 대해 SafeKit `Snapshots` 2개(.zip 파일 2개)를 찍으십시오.


![참고](/wp-content/uploads/2022/07/note.png)


🛠️ [사용 설명서의 문제 해결.](</ko/resources/safekit-user-guide-82/#Troubleshooting>)


![지원 스냅샷을 찍으세요](/wp-content/uploads/2024/03/30-snapshots-mirror.png)


### 10. 필요한 경우 스플릿 브레인 체커를 구성합니다 {#10-if-necessary-configure-a-splitbrain-checker}

  * [클러스터에서 네트워크가 격리될 경우의 다양한 시나리오에 대한 자세한 내용은 아래의 "클러스터에서 네트워크가 격리될 경우의 다양한 시나리오는 무엇입니까?"](#isolation)를 참조하여 스플릿 브레인 체커 구성해야 하는지 여부를 확인하십시오.
  * 모듈 구성에서 `Advanced Configuration` (이미지 참조)을 클릭하여 `userconfig.xml` 편집합니다.
  * `userconfig.xml`의 `<check>` 섹션에 다음을 추가하여 스플릿 브레인 체커 선언하세요 
        
        <service>
         ...
         <check>
          ...
          <splitbrain ident="witness" exec="ping" arg="witness IP"/>
         </check>
        

  * 새 구성을 `Save and apply` 수정된 userconfig.xml 파일을 두 노드 모두에 다시 배포합니다(저장 및 적용하려면 두 노드 모두에서 모듈을 중지해야 함).


**매개변수** :

  * `ident="witness"` 리소스 이름 `splitbrain.witness`로 감시자를 식별합니다. 이 값을 변경하여 감시자를 식별할 수 있습니다.
  * `exec="ping"` 실행할 ping 코드를 참조합니다. 이 값을 변경하지 마십시오.
  * `arg="witness IP"`는 ping에 대한 인수입니다. 이 값을 witness(일반적으로 라우터인 견고한 요소)의 IP로 변경하십시오.


![매개변수를 입력하세요](/wp-content/uploads/2024/03/05-module-mirror-edit-config.png)



{{%  insert-safekit-network-isolation-ko  %}}
 

## SafeKit mirror 솔루션 시연 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}