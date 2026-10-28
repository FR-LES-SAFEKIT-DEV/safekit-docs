---
title: "SafeKit 사용한 클라우드 고가용성: 장애 조치를 위한 mirror.safe 모듈 설치"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-in-cloud-with-real-time-replication-and-failover/"
description: "클라우드 환경에서 SafeKit 에 mirror.safe 모듈을 배포하여 Windows 및 Linux 에서 동기식 실시간 복제 및 자동 장애 조치를 활성화하십시오. 이 가이드에서는 공유 스토리지가 없는 중요 애플리케이션을 위한 2노드 공유 스토리지 클러스터 설정 과정을 안내합니다."
category: "quick-install"
lang: "ko"
topics: "클라우드용 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit / 클라우드 mirror 솔루션 개요, SafeKit 및 Linux ( mirror.safe )에 Windows / 클라우드 mirror 솔루션 설치, SafeKit / 클라우드 mirror 솔루션 단계별 구성, SafeKit mirror 솔루션 시연, 🔍 SafeKit 고가용성 탐색 허브"
---

# SafeKit 사용한 클라우드 고가용성: 장애 조치용 위해 mirror.safe 모듈을 설치하세요. {#cloud-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ko app="Cloud" mod="mirror"  %}}
 

## SafeKit / 클라우드 mirror 솔루션 개요 {#overview-of-the-safekit--cloud-mirror-solution}

솔루션은 여기에 설명되어 있습니다: ** 💡 [ 클라우드에 구애받지 않는 고가용성: SafeKit 동기식 복제 및 장애 조치 ](</ko/solutions/cloud-high-availability-cluster-synchronous-replication-failover/>) ** .

## Windows 및 ( mirror.safe ) 및 Linux 에 SafeKit / 클라우드 mirror 솔루션 설치 {#installation-of-the-safekit--cloud-mirror-solution-on-windows-and-linux-mirrorsafe}

### 클라우드 로드 밸런서 구성 {#configuration-of-the-cloud-load-balancer}

가상 IP 주소를 구현하려면 로드 밸런서를 구성해야 합니다.  
또한 로드 밸런서는 노드에 주기적으로 상태 패킷을 전송하도록 구성되어야 합니다.  
이를 위해 SafeKit 노드 내부에서 실행되는 상태 점검 기능을 제공합니다.

  * mirror 모듈 상태가 PRIM(녹색) 또는 ALONE(녹색)일 때 OK를 반환합니다.
  * 다른 모든 주에서는 찾을 수 없음으로 반환됩니다.


클라우드 로드 밸런서를 다음과 같이 구성해야 합니다.

  * HTTP 프로토콜
  * 9010번 포트는 SafeKit 웹 서버 포트입니다.
  * URL /var/modules/mirror/ready.txt ( mirror 나중에 배포할 모듈 이름인 경우)


⚠️ 아래 단계별 구성의 4단계에서 가상 IP 주소를 설정하지 마십시오. 가상 IP 주소는 클라우드 로드 밸런서에 이미 설정되어 있습니다. 4단계에서 가상 IP 주소를 설정하는 것은 온프레미스 구성에서만 유용합니다.

### 클라우드 네트워크 보안 구성 {#configuration-of-the-cloud-network-security}

네트워크 보안은 다음 프로토콜 및 포트에 대한 통신을 허용하도록 구성해야 합니다.

  * 안전관리 서비스용 UDP 포트 4800 ( SafeKit 노드 간)
  * UDP - 모듈 하트비트 통신용 포트 8888 ( SafeKit 노드 간)
  * TCP - 5600 포트는 모듈의 실시간 파일 복제( SafeKit 노드 간)에 사용됩니다.
  * TCP 포트 9010은 로드 밸런서 상태 점검 및 HTTP 모드로 실행되는 SafeKit 웹 콘솔에 사용됩니다.
  * 콘솔에 HTTPS 모드를 구성하려면 TCP - 9001을 사용하십시오.
  * HTTPS 모드로 실행되는 SafeKit 웹 콘솔의 TCP 포트는 9453입니다.



{{%  insert-safekit-installation-package-windows-ko app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-ko app="" mod="mirror"  %}}
 

참고: 구성할 범용 **mirror.safe** 모듈은 패키지 안에 포함되어 있습니다.

## SafeKit / 클라우드 mirror 솔루션 의 단계별 구성 {#step-by-step-configuration-of-the-safekit--cloud-mirror-solution}


{{%  insert-safekit-82-configuration-ko app="Windows" mod="mirror"  %}}
 

## SafeKit mirror 솔루션 시연 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}