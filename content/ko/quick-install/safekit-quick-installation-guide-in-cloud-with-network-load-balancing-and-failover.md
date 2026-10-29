---
title: "클라우드 네트워크 로드 밸런싱 및 페일오버: SafeKit farm.safe 모듈 설치"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-in-cloud-with-network-load-balancing-and-failover/"
description: "SafeKit 모듈의 지능형 애플리케이션 모니터링으로 클라우드 네트워크 로드 밸런싱 성능을 향상시키세요. farm.safe 모듈은 클라우드 로드 밸런서에 대한 전용 상태 점검 기능을 제공하여 애플리케이션 수준에서 원활한 고가용성(HA)을 구현합니다. 미션 크리티컬 애플리케이션을 위한 자동 복구 및 페일오버를 실현하세요."
category: "quick-install"
lang: "ko"
topics: "클라우드용 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit /클라우드 솔루션 개요, Windows 및 Linux ( farm.safe )에 SafeKit /클라우드 솔루션 설치, SafeKit /클라우드 솔루션 단계별 구성, SafeKit farm 솔루션 시연, 🔍 SafeKit 고가용성 탐색 허브"
---

# 클라우드 네트워크 로드 밸런싱 및 페일오버: SafeKit farm.safe 모듈을 설치하세요. {#cloud-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-ko app="Cloud" mod="farm"  %}}
 

## SafeKit 개요 / 클라우드 솔루션 {#overview-of-the-safekit--cloud-solution}

솔루션은 여기에 설명되어 있습니다: **💡 [ SafeKit : 클라우드 로드 밸런싱 및 애플리케이션 고가용성 <span class="notranslate farm-term" translate="no">Farm</span> 클러스터 ](</ko/solutions/cloud-load-balancing-cluster-failover/>)** .

## SafeKit / 클라우드 솔루션 설치( Windows 및 Linux ( farm.safe ) 및 ) {#installation-of-the-safekit--cloud-solution-on-windows-and-linux-farmsafe}

### 클라우드 로드 밸런서 구성 {#configuration-of-the-cloud-load-balancer}

로드 밸런서는 가상 IP 주소로 구성되어야 합니다.  
또한 로드 밸런서는 노드에 주기적으로 상태 패킷을 전송하도록 구성되어야 합니다.  
이를 위해 SafeKit 노드 내부에서 실행되는 상태 점검 기능을 제공합니다.

  * <span class="notranslate farm-term" translate="no">farm</span> 모듈 상태가 UP(녹색)일 때 OK를 반환합니다.
  * 다른 모든 주에서는 찾을 수 없음으로 반환됩니다.


클라우드 로드 밸런서를 다음과 같이 구성해야 합니다.

  * HTTP 프로토콜
  * 9010번 포트는 SafeKit 웹 서버 포트입니다.
  * URL /var/modules/farm/ready.txt ( <span class="notranslate farm-term" translate="no">farm</span> 나중에 배포할 모듈 이름인 경우)


⚠️ 아래 단계별 구성의 4단계에서 가상 IP 주소 및 로드 밸런싱 규칙을 설정하지 마십시오. 가상 IP 주소 및 로드 밸런싱 규칙은 클라우드 로드 밸런서에 이미 설정되어 있습니다. 4단계에서 가상 IP 주소 및 로드 밸런싱 규칙을 설정하는 것은 온프레미스 구성에만 유용합니다.

### 클라우드 네트워크 보안 구성 {#configuration-of-the-cloud-network-security}

네트워크 보안은 다음 프로토콜 및 포트에 대한 통신을 허용하도록 구성해야 합니다.

  * 안전관리 서비스용 UDP 포트 4800 ( SafeKit 노드 간)
  * UDP - <span class="notranslate farm-term" translate="no">farm</span> 모듈 내부의 하트비트 통신( SafeKit 노드 간)에는 4803 포트가 사용됩니다.
  * TCP 포트 9010은 로드 밸런서 상태 점검 및 HTTP 모드로 실행되는 SafeKit 웹 콘솔에 사용됩니다.
  * 콘솔에 HTTPS 모드를 구성하려면 TCP - 9001을 사용하십시오.
  * HTTPS 모드로 실행되는 SafeKit 웹 콘솔의 TCP 포트는 9453입니다.



{{%  insert-safekit-installation-package-windows-ko app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-ko app="" mod="mirror"  %}}
 

참고: 구성할 범용 **farm.safe** 모듈은 패키지 안에 포함되어 있습니다.

## SafeKit / 클라우드 솔루션 의 단계별 구성 {#step-by-step-configuration-of-the-safekit--cloud-solution}


{{%  insert-safekit-82-farm-configuration-ko app="" mod="farm"  %}}
 

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> 솔루션 시연 {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}