---
title: "NGINX 네트워크 로드 밸런싱 및 페일오버: SafeKit farm.safe 모듈 설치"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-with-nginx-with-network-load-balancing-and-failover/"
description: "이 가이드에서는 NGINX 네트워크 로드 밸런싱 및 자동 페일오버를 위해 farm.safe 모듈을 Windows 및 Linux 에 배포하는 방법을 설명합니다. 외부 하드웨어 로드 밸런서나 복잡한 구성 없이 가상 IP를 사용하여 웹 서비스 및 애플리케이션을 위한 고가용성 클러스터를 구축하는 방법을 보여줍니다."
category: "quick-install"
lang: "ko"
topics: "NGINX 고가용성 빠른 설치 가이드( SafeKit , 고가용성 제한 사항, SafeKit /NGINX 솔루션 개요, Windows 및 Linux ( farm.safe )에 SafeKit /NGINX 솔루션 설치, SafeKit /NGINX 솔루션 단계별 구성, SafeKit farm 솔루션 시연, 🔍 SafeKit 고가용성 탐색 허브"
---

# NGINX 네트워크 로드 밸런싱 및 페일오버: SafeKit farm.safe 모듈 설치 {#nginx-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-ko app="NGINX" mod="farm"  %}}
 

## SafeKit / NGINX 솔루션 개요 {#overview-of-the-safekit--nginx-solution}

솔루션은 여기에 설명되어 있습니다: **💡 [ SafeKit : 올인원 NGINX 로드 밸런싱 및 고가용성 소프트웨어 ](</ko/solutions/nginx-the-simplest-load-balancing-cluster-with-failover/>)** .

## Windows 및 Linux ( farm.safe ) 및 에 SafeKit /NGINX 솔루션 설치 {#installation-of-the-safekit--nginx-solution-on-windows-and-linux-farmsafe}

### 필수 조건 {#prerequisites}

  * NGINX는 2개 이상의 노드(가상 머신 또는 물리적 서버)에 설치되어 있어야 합니다.



{{%  insert-safekit-installation-package-windows-ko app="NGINX" mod="farm"  %}}

{{%  insert-safekit-installation-package-linux-ko app="NGINX" mod="farm"  %}}
 

참고: 구성할 범용 **farm.safe** 모듈은 패키지 안에 포함되어 있습니다.

## SafeKit / NGINX 솔루션 의 단계별 구성 {#step-by-step-configuration-of-the-safekit--nginx-solution}


{{%  insert-safekit-82-farm-configuration-ko app="NGINX" mod="farm"  %}}
 

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> 솔루션 시연 {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}