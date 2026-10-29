---
title: "IIS 네트워크 로드 밸런싱 및 페일오버: SafeKit iis_farm.safe 모듈을 설치하십시오."
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-with-iis-with-network-load-balancing-and-failover/"
description: "이 가이드에서는 iis_farm.safe 모듈을 Windows 에 배포하여 IIS 네트워크 로드 밸런싱 및 자동 페일오버를 구현하는 방법을 설명합니다. 또한 외부 하드웨어 로드 밸런서나 복잡한 구성 없이 가상 IP를 사용하여 웹 서비스 및 애플리케이션을 위한 고가용성 클러스터를 구축하는 방법도 안내합니다."
category: "quick-install"
lang: "ko"
topics: "IIS 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit / IIS 솔루션 개요, Windows ( iis_farm.safe )에 SafeKit / IIS 솔루션 설치, SafeKit / IIS 솔루션 단계별 구성, SafeKit farm 솔루션 시연, 🔍 SafeKit 고가용성 내비게이션 허브"
---

# IIS 네트워크 로드 밸런싱 및 페일오버: SafeKit iis_farm.safe 모듈을 설치하십시오. {#iis-network-load-balancing--failover-install-the-safekit-iis_farmsafe-module}


{{%  insert-safekit-farm-guide-ko app="IIS" mod="iis_farm"  %}}
 

## SafeKit / IIS 솔루션 개요 {#overview-of-the-safekit--iis-solution}

솔루션은 여기에 설명되어 있습니다: **💡 [ SafeKit : 올인원 IIS 로드 밸런싱 및 고가용성 소프트웨어 ](</ko/solutions/iis-load-balancing-failover/>)** .

## SafeKit / IIS 솔루션의 Windows ( iis_farm.safe ) 및 설치 {#installation-of-the-safekit--iis-solution-on-windows-iis_farmsafe}

### 필수 조건 {#prerequisites}

  * IIS 2개 이상의 노드(가상 머신 또는 물리적 서버)에 설치해야 합니다.



{{%  insert-safekit-installation-package-windows-ko app="IIS" mod="iis_farm"  %}}

{{%  insert-safekit-82-installation-module-windows-ko app="IIS" mod="iis_farm"  %}}
 

## SafeKit / IIS 솔루션 의 단계별 구성 {#step-by-step-configuration-of-the-safekit--iis-solution}


{{%  insert-safekit-82-farm-configuration-ko app="IIS" mod="iis_farm"  %}}
 

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> 솔루션 시연 {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ko  %}}

{{%  insert-safekit-hub-ko app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-ko  %}}