---
title: "SafeKit을 사용한 Podman 고가용성: 장애 조치를 위한 mirror.safe 모듈 설치"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-with-podman/"
description: "SafeKit용 mirror.safe 모듈을 배포하여 Linux에서 Podman 컨테이너의 동기식 실시간 복제 및 자동 장애 조치를 활성화하세요. 이 가이드는 공유 스토리지 없이 중요한 애플리케이션을 위한 2노드 SANless 클러스터를 설정하는 방법을 안내합니다."
category: "quick-install"
lang: "ko"
topics: "Podman 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit/Podman 솔루션 개요, Linux에 SafeKit/Podman 솔루션 설치 (mirror.safe), SafeKit/Podman 솔루션의 단계별 구성, SafeKit mirror 솔루션 시연, 🔍 SafeKit 살펴보기"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# SafeKit을 사용한 Podman 고가용성: 장애 조치를 위한 mirror.safe 모듈 설치 {#podman-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ko app="Podman" mod="mirror"  %}}
 

## SafeKit/Podman 솔루션 개요 {#overview-of-the-safekit--podman-solution}

솔루션은 다음에서 설명합니다. **💡 [SafeKit: Podman 고가용성 및 실시간 데이터 복제 소프트웨어](</ko/solutions/podman-the-simplest-high-availability-cluster-between-two-redundant-servers/>)**.

## Linux에 SafeKit/Podman 솔루션 설치 (mirror.safe) {#installation-of-the-safekit--podman-solution-on-linux-mirrorsafe}

### 사전 요구 사항 {#prerequisites}

  * SafeKit에서 다시 시작하려는 Podman 애플리케이션을 2개의 노드(가상 머신 또는 물리적 서버)에 설치해야 합니다.



{{%  insert-safekit-installation-package-linux-ko app="" mod="mirror"  %}}
 

### 간단한 컨테이너 이미지를 사용한 예시 {#example-with-a-simple-container-image}

이 예시에서는 SafeKit이 nginx(웹 서버) 컨테이너를 관리하는 방법을 보여드리겠습니다. 즉, 컨테이너에서 액세스하는 디렉터리를 복제하고 장애 발생 시 다른 노드에서 컨테이너를 다시 시작하는 방법입니다.

#### 사전 요구 사항 {#prerequisites-1}

  * **두 노드 모두에** 복제된 디렉터리를 만듭니다  
SafeKit에 의해 복제되고 nginx에서 제공하는 html 페이지를 포함할 디렉터리 **/replicated_dir_path**를 생성합니다
  * **두 노드 모두에** 초기 HTML 파일로 이 디렉터리를 채우세요
        
        cp index.html /replicated_dir_path

  * **두 노드 모두에** 컨테이너를 생성합니다  
두 노드 모두에서 **/replicated_dir_path** 디렉터리를 **/usr/share/nginx/html**에 바인딩하는 nginx 컨테이너를 생성합니다 
        
        podman container create --name mynginx -v /replicated_dir_path:/usr/share/nginx/html -p 9011:80 nginx


#### SafeKit은 구성 {#safekit-configuration}

  * **단계별 구성** 섹션으로 이동
  * **mirror.safe** 모듈을 생성하고 구성합니다
  * 장애 발생 시 전환될 **가상 IP 주소**를 설정합니다
  * **/replicated_dir_path**를 복제 디렉터리로 설정합니다
  * start_prim 및 stop_prim 스크립트에 각각 **podman start mynginx** 및 **podman stop mynginx**를 입력합니다  
참고: SE Linux를 사용하는 경우 "podman start --security-opt label=disable mynginx"를 사용해야 할 수 있습니다.
  * SafeKit mirror 모듈을 배포하고 시작합니다


#### 테스트 {#tests}

  * **http://vitual-ip:9011/index.html**에서 nginx에 대한 액세스를 테스트합니다
  * 테스트 복제:  
SafeKit PRIM 상태의 노드에서 복제된 디렉터리에 다른 HTML 파일을 추가합니다 
        
        cp page.html /replicated_dir_path

  * SafeKit PRIM 상태의 노드에서 mirror 모듈을 중지합니다
  * 보조 노드에서 컨테이너가 다시 시작되었는지 테스트합니다
  * **http://vitual-ip:9011/index.html** 및** http://vitual-ip:9011/page.html**에 대한 액세스를 테스트합니다


## SafeKit/Podman 솔루션의 단계별 구성 {#step-by-step-configuration-of-the-safekit--podman-solution}


{{%  insert-safekit-82-configuration-ko app="Podman" mod="mirror"  %}}
 

## SafeKit mirror 솔루션 시연 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}