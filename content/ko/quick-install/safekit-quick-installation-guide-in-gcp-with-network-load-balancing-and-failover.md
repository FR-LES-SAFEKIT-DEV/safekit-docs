---
title: "GCP 네트워크 부하 분산 및 장애 조치: SafeKit farm.safe 모듈 설치"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-in-gcp-with-network-load-balancing-and-failover/"
description: "SafeKit의 지능형 애플리케이션 모니터링으로 GCP 네트워크 부하 분산 강화하세요. farm.safe 모듈은 GCP 부하 분산기를 위한 전용 상태 확인 기능을 제공하여 애플리케이션 수준에서 원활한 HA(고가용성)를 지원합니다. 미션 크리티컬 애플리케이션에 대한 자동 자가 복구 및 장애 조치 기능을 구현하세요."
category: "quick-install"
lang: "ko"
topics: "GCP 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit/GCP 솔루션 개요, Windows 및 Linux에 SafeKit/GCP 솔루션 설치 (farm.safe), SafeKit/GCP 솔루션 단계별 구성, SafeKit farm 솔루션 시연, 🔍 SafeKit 살펴보기"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# GCP 네트워크 부하 분산 및 장애 조치: SafeKit farm.safe 모듈 설치 {#gcp-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-ko app="GCP" mod="farm"  %}}
 

## SafeKit/GCP 솔루션 개요 {#overview-of-the-safekit--gcp-solution}

솔루션은 여기에서 설명합니다: **💡 [SafeKit: Google GCP 로드 밸런싱 및 애플리케이션 고가용성 <span class="notranslate farm-term" translate="no">farm</span> 클러스터](</ko/solutions/gcp-load-balancing-cluster-failover/>)**.

## Windows 및 Linux에 SafeKit/GCP 솔루션 설치 (farm.safe) {#installation-of-the-safekit--gcp-solution-on-windows-and-linux-farmsafe}

### Google GCP 로드 밸런서 구성 {#configuration-of-the-google-gcp-load-balancer}

로드 밸런서는 가상 IP 주소로 구성되어야 합니다.  
그리고 로드 밸런서는 노드에 주기적으로 상태 패킷을 보내도록 구성되어야 합니다.  
이를 위해 SafeKit 노드 내에서 실행되는 상태 점검 기능을 제공하며,

  * <span class="notranslate farm-term" translate="no">farm</span> 모듈 상태가 UP (녹색)일 때 OK를 반환합니다
  * 다른 모든 상태에서는 NOT FOUND를 반환합니다


Google GCP 로드 밸런서를 다음과 같이 구성해야 합니다

  * HTTP 프로토콜
  * 포트 9010, SafeKit 웹 서버 포트
  * URL /var/modules/farm/ready.txt (<span class="notranslate farm-term" translate="no">farm</span>은 나중에 배포할 모듈 이름입니다)


자세한 내용은 [Google GCP 로드 밸런서 구성](<https://docs.cloud.google.com/load-balancing/docs/>)을 참조하세요.


⚠️ 아래 단계별 구성의 4단계에서 가상 IP 주소와 로드 밸런싱 규칙을 구성하지 마십시오. 가상 IP 주소와 로드 밸런싱 규칙은 이미 Google GCP 로드 밸런서에 설정되어 있습니다. 4단계에서 가상 IP와 로드 밸런싱 규칙을 설정하는 것은 온프레미스 구성에만 유용합니다.

### Google GCP 네트워크 보안 구성 {#configuration-of-the-google-gcp-network-security}

네트워크 보안은 다음 프로토콜 및 포트에 대한 통신을 허용하도록 구성해야 합니다

  * UDP - 4800 (SafeKit 노드 간의 safeadmin 서비스용)
  * UDP - 4803은 <span class="notranslate farm-term" translate="no">farm</span> 모듈(SafeKit 노드 간) 내의 하트비트 위한 것입니다
  * TCP – 9010은 로드 밸런서 상태 확인 및 http 모드에서 실행되는 SafeKit 웹 콘솔용입니다
  * TCP – 9001은 콘솔의 https 모드를 구성합니다
  * TCP – 9453은 https 모드에서 실행되는 SafeKit 웹 콘솔용입니다



{{%  insert-safekit-installation-package-windows-ko app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-ko app="" mod="mirror"  %}}
 

참고: 구성할 일반 **farm.safe** 모듈은 패키지 내에 포함되어 있습니다.

## SafeKit/GCP 솔루션 단계별 구성 {#step-by-step-configuration-of-the-safekit--gcp-solution}


{{%  insert-safekit-82-farm-configuration-ko app="" mod="farm"  %}}
 

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> 솔루션 시연 {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}