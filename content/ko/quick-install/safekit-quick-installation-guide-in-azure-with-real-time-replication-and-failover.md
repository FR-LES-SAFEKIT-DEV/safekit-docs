---
title: "Azure용 SafeKit 빠른 설치 가이드(실시간 복제 및 장애 조치용 mirror.safe 모듈)"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-in-azure-with-real-time-replication-and-failover/"
description: "Azure에서 SafeKit용 mirror.safe 모듈을 배포하여 Windows 및 Linux에서 동기식 실시간 복제 및 자동 장애 조치를 활성화하세요. 이 가이드는 공유 스토리지 없이 중요한 애플리케이션을 위한 2노드 비공유(shared-nothing) 클러스터를 설정하는 방법을 안내합니다."
category: "quick-install"
lang: "ko"
topics: "Azure 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit/Azure mirror 솔루션 개요, Windows 및 Linux에 SafeKit/Azure mirror 솔루션 설치 (mirror.safe), SafeKit/Azure mirror 솔루션 단계별 구성, SafeKit mirror 솔루션 시연, 🔍 SafeKit 살펴보기"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# SafeKit을 사용한 Azure 고가용성: 장애 조치를 위한 mirror.safe 모듈 설치 {#azure-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ko app="Azure" mod="mirror"  %}}
 

## SafeKit/Azure mirror 솔루션 개요 {#overview-of-the-safekit--azure-mirror-solution}

솔루션은 다음에서 설명합니다. **💡 [Microsoft Azure 고가용성: SafeKit 동기 복제 및 장애 조치](</ko/solutions/azure-high-availability-cluster-synchronous-replication-failover/>)**.

## Windows 및 Linux에 SafeKit/Azure mirror 솔루션 설치 (mirror.safe) {#installation-of-the-safekit--azure-mirror-solution-on-windows-and-linux-mirrorsafe}

### Microsoft Azure 부하 분산 장치 구성 {#configuration-of-the-microsoft-azure-load-balancer}

가상 IP 주소를 구현하려면 로드 밸런서를 구성해야 합니다.  
그리고 로드 밸런서는 노드에 주기적으로 상태 패킷을 보내도록 구성되어야 합니다.  
이를 위해 SafeKit 노드 내에서 실행되는 상태 점검 기능을 제공하며,

  * mirror 모듈 상태가 PRIM (녹색) 또는 ALONE (녹색)일 때 OK를 반환합니다
  * 다른 모든 상태에서는 NOT FOUND를 반환합니다


다음과 같이 Microsoft Azure 부하 분산 장치를 구성해야 합니다

  * HTTP 프로토콜
  * 포트 9010, SafeKit 웹 서버 포트
  * URL /var/modules/mirror/ready.txt (mirror는 나중에 배포할 모듈 이름입니다)


자세한 내용은 [Microsoft Azure 부하 분산 장치 구성](<https://learn.microsoft.com/en-us/azure/load-balancer/>)을 참조하세요. 


⚠️ 아래 단계별 구성의 4단계에서 가상 IP 주소를 구성하지 마십시오. 가상 IP 주소는 Microsoft Azure 로드 밸런서에 이미 설정되어 있습니다. 4단계에서 가상 IP를 설정하는 것은 온프레미스 구성에만 유용합니다.

### Microsoft Azure 네트워크 보안 구성 {#configuration-of-the-microsoft-azure-network-security}

네트워크 보안은 다음 프로토콜 및 포트에 대한 통신을 허용하도록 구성해야 합니다

  * UDP - 4800 (SafeKit 노드 간의 safeadmin 서비스용)
  * 모듈 하트비트 (SafeKit 노드 간)용 UDP - 8888
  * TCP – 5600 (모듈 실시간 파일 복제용, SafeKit 노드 간)
  * TCP – 9010은 로드 밸런서 상태 확인 및 http 모드에서 실행되는 SafeKit 웹 콘솔용입니다
  * TCP – 9001은 콘솔의 https 모드를 구성합니다
  * TCP – 9453은 https 모드에서 실행되는 SafeKit 웹 콘솔용입니다



{{%  insert-safekit-installation-package-windows-ko app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-ko app="" mod="mirror"  %}}
 

참고: 구성할 일반 **mirror.safe** 모듈은 패키지 내에 포함되어 있습니다.

## SafeKit/Azure mirror 솔루션 단계별 구성 {#step-by-step-configuration-of-the-safekit--azure-mirror-solution}


{{%  insert-safekit-82-configuration-ko app="Windows" mod="mirror"  %}}
 

## SafeKit mirror 솔루션 시연 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}