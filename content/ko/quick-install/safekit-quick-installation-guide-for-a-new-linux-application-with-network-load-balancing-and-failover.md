---
title: "Linux 네트워크 부하 분산 및 장애 조치: SafeKit farm.safe 모듈 설치"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-network-load-balancing-and-failover/"
description: "단계별 가이드: 가상 IP 기반 애플리케이션의 네트워크 부하 분산 및 장애 조치를 위한 Linux용 SafeKit farm.safe 모듈 설치."
category: "quick-install"
lang: "ko"
topics: "Linux 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit/Linux 솔루션 개요, SafeKit/Linux 솔루션(farm.safe) 설치, SafeKit/Linux 솔루션 단계별 구성, SafeKit farm 솔루션 시연"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--linux-solution, installation-of-the-safekit--linux-solution-farmsafe, step-by-step-configuration-of-the-safekit--linux-solution, demonstration-of-the-safekit-farm-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
image: "/wp-content/uploads/2024/03/15-monitoring-up-up.png"
schemaType: "TechArticle"
---

# Linux 네트워크 부하 분산 및 장애 조치: SafeKit farm.safe 모듈 설치 {#linux-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-ko app="Linux" mod="farm"  %}}
 

## SafeKit/Linux 솔루션 개요 {#overview-of-the-safekit--linux-solution}

솔루션은 여기에서 설명합니다: **💡 [SafeKit: 올인원 Linux 로드 밸런싱 및 고가용성 소프트웨어](</ko/solutions/linux-load-balancing-failover/>)**.

## SafeKit/Linux 솔루션(farm.safe) 설치 {#installation-of-the-safekit--linux-solution-farmsafe}

### 사전 요구 사항 {#prerequisites}

  * <span class="notranslate farm-term" translate="no">farm</span>에 설치하려는 애플리케이션이 2개 이상의 노드(가상 머신 또는 물리적 서버)에 설치되어 있어야 합니다.



{{%  insert-safekit-installation-package-linux-ko app="" mod="farm"  %}}
 

참고: 구성할 일반 **farm.safe** 모듈은 패키지 내에 포함되어 있습니다.

## SafeKit/Linux 솔루션 단계별 구성 {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-farm-configuration-ko app="Linux" mod="farm"  %}}
 

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> 솔루션 시연 {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ko  %}}

{{%  insert-safekit-hub-ko app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-ko  %}}