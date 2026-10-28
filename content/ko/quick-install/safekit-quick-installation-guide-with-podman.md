---
title: "Podman 고가용성 SafeKit 포함): 장애 조치를 위해 mirror.safe 모듈을 설치하십시오."
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-with-podman/"
description: "SafeKit 에 mirror.safe 모듈을 배포하여 Podman 컨테이너의 동기식 실시간 복제 및 Linux 에서의 자동 장애 조치를 활성화하십시오. 이 가이드에서는 공유 스토리지가 없는 중요 애플리케이션을 위한 2노드 SANless 클러스터 설정 과정을 안내합니다."
category: "quick-install"
lang: "ko"
topics: "Podman 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit / Podman 솔루션 개요, Linux ( mirror.safe )에 SafeKit / Podman 솔루션 설치, SafeKit / Podman 솔루션 단계별 구성, SafeKit mirror 솔루션 시연, 🔍 SafeKit 고가용성 내비게이션 허브"
---

# Podman 고가용성 SafeKit 포함): 장애 조치용 mirror.safe 모듈 설치 {#podman-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover} 포함)


{{%  insert-safekit-mirror-guide-ko app="Podman" mod="mirror"  %}}
 

## SafeKit / Podman 솔루션 개요 {#overview-of-the-safekit--podman-solution}

솔루션은 여기에 설명되어 있습니다: ** 💡 [ SafeKit : Podman 고가용성 및 실시간 데이터 복제 소프트웨어 ](</solutions/podman-the-simplest-high-availability-cluster-between-two-redundant-servers/>) ** .

## SafeKit / Podman 솔루션의 Linux ( mirror.safe ) 및 {#installation-of-the-safekit--podman-solution-on-linux-mirrorsafe} 설치

### 필수 조건 {#prerequisites}

  * SafeKit 에서 재시작하려는 Podman 애플리케이션이 2개의 노드(가상 머신 또는 물리적 서버)에 설치되어 있어야 합니다.



{{%  insert-safekit-installation-package-linux-ko app="" mod="mirror"  %}}
 

### 간단한 컨테이너 이미지 {#example-with-a-simple-container-image} 사용한 예시

이 예제에서는 SafeKit nginx (웹 서버) 컨테이너를 관리하는 방법, 즉 컨테이너에서 접근하는 디렉터리의 복제 및 장애 발생 시 다른 노드에서 컨테이너를 재시작하는 방법을 보여줍니다.

#### 필수 조건 {#prerequisites-1}

  * ** 노드 양쪽에 복제된 디렉터리 ** 를 생성합니다.  
** /replicated_dir_path ** 디렉터리를 생성하고, 이 디렉터리는 SafeKit 에 의해 복제되며, nginx 에서 제공되는 HTML 페이지를 포함하도록 합니다.
  * 두 노드 ** 모두에 초기 HTML 파일 ** 를 넣어 이 디렉터리를 채우십시오.
        
        cp index.html /replicated_dir_path

  * ** 노드와 ** 노드 모두에 컨테이너를 생성합니다.  
** /replicated_dir_path ** 디렉터리를 **/usr/share/nginx/html** 에 바인딩하는 nginx 컨테이너를 두 노드 모두에 생성합니다. 
        
        podman 컨테이너 생성 --name mynginx -v /replicated_dir_path : /usr/share/nginx/html -p 9011:80 nginx


#### SafeKit 구성 {#safekit-configuration}

  * ** 단계별 구성 ** 섹션으로 이동하세요.
  * **mirror.safe** 모듈을 생성하고 구성합니다.
  * 장애 발생 시 전환될 가상 IP 주소 ** ** 를 설정합니다.
  * ** /replicated_dir_path ** 복제 디렉터리로 설정
  * start_prim 및 stop_prim 스크립트에 각각 **podman start mynginx** 및 **podman stop mynginx** 입력하십시오.  
참고: SE Linux 사용하는 경우 "podman start --security-opt label=disable mynginx " 명령어를 사용해야 할 수도 있습니다.
  * SafeKit mirror 모듈을 배포하고 시작하십시오.


#### 테스트 {#tests}

  * **http://vitual-ip:9011/index.html** 에서 nginx 에 대한 테스트 액세스를 확인하세요.
  * 테스트 재현:  
SafeKit PRIM 상태의 노드에서 복제된 디렉터리에 다른 HTML 파일을 몇 개 추가합니다. 
        
        cp page.html /replicated_dir_path

  * SafeKit PRIM 상태인 노드에서 mirror 모듈을 중지합니다.
  * 보조 노드에서 컨테이너가 재시작되었는지 테스트합니다.
  * **http://vitual-ip:9011/index.html** 및 **http://vitual-ip:9011/page.html** 에 대한 테스트 액세스


## SafeKit / Podman 솔루션 {#step-by-step-configuration-of-the-safekit--podman-solution} 의 단계별 구성


{{%  insert-safekit-82-configuration-ko app="Podman" mod="mirror"  %}}
 

## SafeKit mirror 솔루션 {#demonstration-of-the-safekit-mirror-solution} 시연


{{%  insert-safekit-mirror-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}