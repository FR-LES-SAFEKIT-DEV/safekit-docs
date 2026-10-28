---
title: "Docker 고가용성 SafeKit 포함): 장애 조치를 위해 mirror.safe 모듈을 설치하십시오."
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-with-docker/"
description: "SafeKit 에 mirror.safe 모듈을 배포하여 Docker 컨테이너의 동기식 실시간 복제 및 Linux 에서의 자동 장애 조치를 활성화하십시오. 이 가이드에서는 공유 스토리지가 없는 중요 애플리케이션을 위한 2노드 공유 스토리지 클러스터 설정 과정을 안내합니다."
category: "quick-install"
lang: "ko"
topics: "Docker 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit / Docker 솔루션 개요, Linux ( mirror.safe )에 SafeKit / Docker 솔루션 설치, SafeKit / Docker 솔루션 단계별 구성, SafeKit mirror 솔루션 시연, 🔍 SafeKit 고가용성 내비게이션 허브"
---

# Docker 고가용성 SafeKit 포함): 장애 조치용 mirror.safe 모듈 설치 포함) {#docker-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ko app="Docker" mod="mirror"  %}}
 

## SafeKit / Docker 솔루션 개요 {#overview-of-the-safekit--docker-solution}

솔루션은 여기에 설명되어 있습니다: ** 💡 [ SafeKit : Docker 고가용성 및 실시간 데이터 복제 소프트웨어 ](</ko/solutions/docker-container-high-availability-cluster-synchronous-replication-failover/>)  
**.

## SafeKit / Docker 솔루션의 Linux ( mirror.safe ) 및 설치 {#installation-of-the-safekit--docker-solution-on-linux-mirrorsafe}

### 필수 조건 {#prerequisites}

  * SafeKit 에서 재시작하려는 Docker 애플리케이션이 2개의 노드(가상 머신 또는 물리적 서버)에 설치되어 있어야 합니다.



{{%  insert-safekit-installation-package-linux-ko app="" mod="mirror"  %}}
 

### 예제 1: Docker 구성 애플리케이션 {#example-1-with-a-docker-compose-application}

Docker 구성 애플리케이션의 경우, 애플리케이션과 모든 컨테이너를 설명하는 **docker-compose.yml** 파일이 있습니다.

  * 먼저 두 서버 모두에 Docker Compose 애플리케이션을 설치하되 실행하지 마십시오: **docker-compose -f docker-compose.yml up --no-start**
  * 한 서버에서 docker-compose.yml 의 각 볼륨에 대해 다음 명령을 실행하십시오: **docker volume inspect volume_name**  
그러면 **host directories of the docker volumes** 가 반환됩니다( docker-compose.yml 에는 이러한 경로가 제공되지 않습니다).  
경로 목록은 **/var/lib/docker/volumes/ <volume_name>/_data** 형식으로 표시됩니다.
  * ** 단계별 구성 ** 섹션으로 이동하십시오. 
    * **mirror.safe** 모듈을 배포합니다.
    * 장애 발생 시 전환될 가상 IP 주소 ** ** 를 설정합니다.
    * **/var/lib/docker/volumes/ <volume_name>/_data** 목록을 ** 로 설정하고 복제된 디렉터리 ** 를 지정합니다.
    * start_prim 및 stop_prim 스크립트에 각각 **/usr/local/bin/docker-compose -f docker-compose.yml --no-ansi start** 및 **/usr/local/bin/docker-compose -f docker-compose.yml --no-ansi stop** 넣으세요.


### 예제 2: Docker 애플리케이션이 컨테이너 세트를 시작하는 예 {#example-2-with-a-docker-application-starting-a-set-of-containers}

여기서는 Docker 애플리케이션, ** myappli ** 일련의 컨테이너를 시작한다고 가정합니다.

  * 먼저 두 서버 모두에 ** myappli ** 설치하되 실행하지 마십시오.
  * 한 서버에서 myapply : **ls /var/lib/docker/volumes** 가 사용하는 볼륨 목록을 표시합니다.  
따라서 **/var/lib/docker/volumes/ <volume_name>/_data** 와 같은 경로 목록을 얻게 됩니다.
  * ** 단계별 구성 ** 섹션으로 이동하십시오. 
    * **mirror.safe** 모듈을 배포합니다.
    * 장애 발생 시 전환될 가상 IP 주소 ** ** 를 설정합니다.
    * **/var/lib/docker/volumes/ <volume_name>/_data** 목록을 ** 로 설정하고 복제된 디렉터리 ** 를 지정합니다.
    * start_prim 및 stop_prim 스크립트에 각각 다음을 입력하십시오: ** /.../myappli 시작 ** 및 ** /.../myappli 중지 **


### 간단한 Docker 이미지 사용한 예제 3 {#example-3-with-a-simple-docker-image}

구성 방법은 nginx Docker 이미지(웹 서버)를 예로 들어 설명합니다.

  * Docker 볼륨 생성  
두 서버 모두에 동일한 이름( **docker volume create replicated_vol** 으로 Docker 볼륨을 생성하십시오.  
호스트에서 볼륨이 저장된 디렉터리 경로를 가져옵니다: **docker volume inspect replicated_vol**  
(예시: **/var/lib/docker/storage/replicated_vol/_data** )
  * Docker 컨테이너 생성  
두 서버 모두에서 이전 볼륨인 **docker container create --name mynginx -v replicated_vol:/usr/share/nginx/html -p 9011:80 nginx** 에 바인딩되는 nginx Docker 컨테이너를 생성합니다.  
볼륨에 index.html 파일 몇 개를 채워 넣으세요: **docker cp index.html mynginx:/usr/share/nginx/html/index.html**
  * ** 단계별 구성 ** 섹션으로 이동하십시오. 
    * **mirror.safe** 모듈을 배포합니다.
    * 장애 발생 시 전환될 가상 IP 주소 ** ** 를 설정합니다.
    * **/var/lib/docker/storage/replicated_vol/_data** 복제 디렉터리로 설정합니다.
    * start_prim 및 stop_prim 스크립트에 각각 **docker start mynginx** 및 **docker stop mynginx** 넣으세요.
    * SafeKit 구성 후, ** http://vitual-ip:9011** 사용하여 index.html 에 대한 접근을 테스트합니다.


## SafeKit / Docker 솔루션 의 단계별 구성 {#step-by-step-configuration-of-the-safekit--docker-solution}


{{%  insert-safekit-82-configuration-ko app="Docker" mod="mirror"  %}}
 

## SafeKit mirror 솔루션 시연 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}