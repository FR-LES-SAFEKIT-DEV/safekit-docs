---
title: "SafeKit을 사용한 Docker 고가용성: 장애 조치를 위한 mirror.safe 모듈 설치"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-with-docker/"
description: "SafeKit용 mirror.safe 모듈을 배포하여 Linux에서 Docker 컨테이너의 동기식 실시간 복제 및 자동 장애 조치를 활성화하십시오. 이 가이드는 공유 스토리지 없이 중요한 애플리케이션을 위한 2노드 비공유(shared-nothing) 클러스터를 설정하는 방법을 안내합니다."
category: "quick-install"
lang: "ko"
topics: "Docker 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit/Docker 솔루션 개요, Linux에 SafeKit/Docker 솔루션 설치 (mirror.safe), SafeKit/Docker 솔루션 단계별 구성, SafeKit mirror 솔루션 시연, 🔍 SafeKit 살펴보기"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# SafeKit을 사용한 Docker 고가용성: 장애 조치를 위한 mirror.safe 모듈 설치 {#docker-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ko app="Docker" mod="mirror"  %}}
 

## SafeKit/Docker 솔루션 개요 {#overview-of-the-safekit--docker-solution}

솔루션은 여기에서 설명합니다: **💡 [SafeKit: Docker 고가용성 및 실시간 데이터 복제 소프트웨어](</ko/solutions/docker-container-high-availability-cluster-synchronous-replication-failover/>)  
**.

## Linux에 SafeKit/Docker 솔루션 설치 (mirror.safe) {#installation-of-the-safekit--docker-solution-on-linux-mirrorsafe}

### 사전 요구 사항 {#prerequisites}

  * SafeKit에서 다시 시작하려는 Docker 애플리케이션을 2개의 노드(가상 머신 또는 물리적 서버)에 설치해야 합니다.



{{%  insert-safekit-installation-package-linux-ko app="" mod="mirror"  %}}
 

### Docker Compose 애플리케이션 예시 1 {#example-1-with-a-docker-compose-application}

Docker Compose 애플리케이션에는 애플리케이션과 모든 컨테이너를 설명하는 **docker-compose.yml** 파일이 있습니다.

  * 먼저 두 서버 모두에서 docker compose 애플리케이션을 시작하지 않고 설치합니다. **docker-compose -f docker-compose.yml up --no-start**
  * 한 서버에서 docker-compose.yml의 각 볼륨에 대해 다음 명령을 실행합니다. **docker volume inspect volume_name**  
**도커 볼륨의 호스트 디렉터리**를 반환합니다(이 경로는 docker-compose.yml에 지정되지 않습니다).  
**/var/lib/docker/volumes/ <volume_name> /_data**와 같은 경로 목록을 얻게 됩니다
  * **단계별 구성** 섹션으로 이동하여 
    * **mirror.safe** 모듈을 배포합니다
    * 장애 발생 시 전환될 **가상 IP 주소**를 설정합니다
    * **/var/lib/docker/volumes/ <volume_name> /_data** 목록을 **복제된 디렉터리**로 설정합니다
    * 각각 start_prim 및 stop_prim 스크립트에 **/usr/local/bin/docker-compose-f docker-compose.yml --no-ansi start** 및 **/usr/local/bin/docker-compose-f docker-compose.yml --no-ansi stop**을 입력합니다


### 컨테이너 세트를 시작하는 Docker 애플리케이션의 예시 2 {#example-2-with-a-docker-application-starting-a-set-of-containers}

여기서는 Docker 애플리케이션인 **myappli가** 일련의 컨테이너를 시작한다고 가정합니다.

  * 먼저 두 서버 모두에서 **myappli**를 시작하지 않고 설치합니다
  * 한 서버에서 myapply가 사용하는 볼륨을 나열합니다: **ls /var/lib/docker/volumes**  
따라서 **/var/lib/docker/volumes/ <volume_name> /_data**와 같은 경로 목록을 얻게 됩니다
  * **단계별 구성** 섹션으로 이동하여 
    * **mirror.safe** 모듈을 배포합니다
    * 장애 발생 시 전환될 **가상 IP 주소**를 설정합니다
    * **/var/lib/docker/volumes/ <volume_name> /_data** 목록을 **복제된 디렉터리**로 설정합니다
    * 각각 start_prim 및 stop_prim 스크립트에 **/.../myappli start** 및 **/.../myappli stop**을 입력합니다


### 간단한 Docker 이미지를 사용한 예시 3 {#example-3-with-a-simple-docker-image}

이 구성은 nginx Docker 이미지(웹 서버)의 예시를 통해 설명합니다.

  * Docker 볼륨 생성  
두 서버 모두에서 동일한 이름으로 도커 볼륨을 생성합니다: **docker volume create replicated_vol**  
호스트에 볼륨이 저장된 디렉터리 경로를 가져옵니다. **docker volume inspect replicated_vol**  
(예: **/var/lib/docker/storage/replicated_vol/_data**)
  * Docker 컨테이너 생성  
두 서버 모두에서 이전 볼륨에 바인딩되는 nginx 도커 컨테이너를 생성합니다. **docker container create --name mynginx -v replicated_vol:/usr/share/nginx/html -p 9011:80 nginx**  
볼륨에 index.html 파일을 채웁니다: **docker cp index.html mynginx:/usr/share/nginx/html/index.html**
  * **단계별 구성** 섹션으로 이동하여 
    * **mirror.safe** 모듈을 배포합니다
    * 장애 발생 시 전환될 **가상 IP 주소**를 설정합니다
    * **/var/lib/docker/storage/replicated_vol/_data** 복제 디렉터리로 설정합니다
    * start_prim 및 stop_prim 스크립트에 각각 **docker start mynginx** 및 **docker stop mynginx**를 입력합니다
    * SafeKit은 구성 후 **http://vitual-ip:9011**로 index.html에 대한 액세스를 테스트합니다


## SafeKit/Docker 솔루션 단계별 구성 {#step-by-step-configuration-of-the-safekit--docker-solution}


{{%  insert-safekit-82-configuration-ko app="Docker" mod="mirror"  %}}
 

## SafeKit mirror 솔루션 시연 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}