---
title: "Windows 네트워크 부하 분산 및 장애 조치: SafeKit farm.safe 모듈 설치"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/"
description: "Windows 네트워크 부하 분산 및 자동 장애 조치에 farm.safe 모듈을 배포하는 방법을 알아보세요. 이 가이드는 외부 하드웨어 부하 분산 장치나 복잡한 구성 없이 가상 IP를 사용하여 웹 서비스 및 애플리케이션을 위한 고가용성 클러스터를 구축하는 방법을 보여줍니다."
category: "quick-install"
lang: "ko"
topics: "Windows용 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit/Windows 솔루션 개요, SafeKit/Windows 솔루션(farm.safe) 설치, SafeKit/Windows 솔루션 단계별 구성, SafeKit farm 솔루션 시연, 🔍 SafeKit 살펴보기"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# Windows 네트워크 부하 분산 및 장애 조치: SafeKit farm.safe 모듈 설치 {#windows-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-ko app="Windows" mod="farm"  %}}
 

## SafeKit/Windows 솔루션 개요 {#overview-of-the-safekit--windows-solution}

솔루션은 여기에서 설명합니다: **💡 [SafeKit: 올인원 Windows 로드 밸런싱 및 고가용성 소프트웨어](</ko/solutions/windows-load-balancing-failover/>)**.

## SafeKit/Windows 솔루션(farm.safe) 설치 {#installation-of-the-safekit--windows-solution-farmsafe}

### 사전 요구 사항 {#prerequisites}

  * <span class="notranslate farm-term" translate="no">farm</span>에 설치하려는 애플리케이션이 2개 이상의 노드(가상 머신 또는 물리적 서버)에 설치되어 있어야 합니다.



{{%  insert-safekit-installation-package-windows-ko app="" mod="farm"  %}}
 

참고: 구성할 일반 **farm.safe** 모듈은 패키지 내에 포함되어 있습니다.

## SafeKit/Windows 솔루션 단계별 구성 {#step-by-step-configuration-of-the-safekit--windows-solution}


{{%  insert-safekit-82-farm-configuration-ko app="Windows" mod="farm"  %}}
 

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> 솔루션 시연 {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}