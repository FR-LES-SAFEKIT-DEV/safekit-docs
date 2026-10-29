---
title: "Linux 네트워크 로드 밸런싱 및 페일오버: SafeKit farm.safe 모듈 설치"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-network-load-balancing-and-failover/"
description: "Linux에서 네트워크 로드 밸런싱과 자동 페일오버를 위해 farm.safe 모듈을 배포하는 방법을 알아봅니다. 이 가이드는 외부 하드웨어 로드 밸런서나 복잡한 구성 없이 가상 IP를 사용하여 웹 서비스와 애플리케이션을 위한 고가용성 클러스터를 구축하는 방법을 보여 줍니다."
category: "quick-install"
lang: "ko"
topics: "Linux용 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit / Linux 솔루션 개요, SafeKit / Linux 솔루션 설치 (farm.safe), SafeKit / Linux 솔루션 단계별 구성, SafeKit farm 솔루션 데모, 🔍 SafeKit 고가용성 탐색 허브"
---

# Linux 네트워크 로드 밸런싱 및 페일오버: SafeKit farm.safe 모듈 설치 {#linux-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-ko app="Linux" mod="farm"  %}}
 

## SafeKit / Linux 솔루션 개요 {#overview-of-the-safekit--linux-solution}

솔루션은 여기에서 설명합니다: **💡[SafeKit: 올인원 Linux 로드 밸런싱 및 고가용성 소프트웨어](</ko/solutions/linux-load-balancing-failover/>)**.

## SafeKit / Linux 솔루션 설치 (farm.safe) {#installation-of-the-safekit--linux-solution-farmsafe}

### 사전 요구 사항 {#prerequisites}

  * <span class="notranslate farm-term" translate="no">farm</span>에 넣으려는 애플리케이션이 2개 이상의 노드(가상 머신 또는 물리 서버)에 설치되어 있어야 합니다.



{{%  insert-safekit-installation-package-linux-ko app="" mod="farm"  %}}
 

참고: 구성하게 될 범용 **farm.safe** 모듈은 패키지에 포함되어 제공됩니다.

## SafeKit / Linux 솔루션 단계별 구성 {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-farm-configuration-ko app="Linux" mod="farm"  %}}
 

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> 솔루션 데모 {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ko  %}}

{{%  insert-safekit-hub-ko app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-ko  %}}
