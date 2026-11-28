---
title: "SafeKit 설치: Windows 고가용성"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/"
description: "단계별 가이드: 서버 2대에서 애플리케이션의 실시간 복제 및 자동 장애 조치를 위한 Windows용 SafeKit mirror.safe 모듈 설치."
category: "quick-install"
lang: "ko"
topics: "Windows 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit/Windows 솔루션 개요, SafeKit/Windows 솔루션 설치 (mirror.safe), SafeKit/Windows 솔루션 단계별 구성, SafeKit mirror 솔루션 시연"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--windows-solution, installation-on-the-safekit--windows-solutions-mirrorsafe, step-by-step-configuration-of-the-safekit--windows-solution, demonstration-of-the-safekit-mirror-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# SafeKit 설치: Windows 고가용성 {#install-safekit-for-windows-high-availability}


{{%  insert-safekit-mirror-guide-ko app="Windows" mod="mirror"  %}}
 

## SafeKit/Windows 솔루션 개요 {#overview-of-the-safekit--windows-solution}

솔루션은 여기에서 설명합니다: **💡 [가장 간단한 Windows 고가용성: 2노드 동기 복제 및 장애 조치](</ko/solutions/windows-high-availability-software-synchronous-replication-failover/>)**

## SafeKit/Windows 솔루션 설치 (mirror.safe) {#installation-on-the-safekit--windows-solutions-mirrorsafe}

### 사전 요구 사항 {#prerequisites}

  * SafeKit에서 다시 시작하려는 애플리케이션을 2개의 노드(가상 머신 또는 물리적 서버)에 설치해야 합니다.



{{%  insert-safekit-installation-package-windows-ko app="" mod="mirror"  %}}
 

참고: 구성할 일반 **mirror.safe** 모듈은 패키지 내에 포함되어 있습니다.

## SafeKit/Windows 솔루션 단계별 구성 {#step-by-step-configuration-of-the-safekit--windows-solution}


{{%  insert-safekit-82-configuration-ko app="Windows" mod="mirror"  %}}
 

## SafeKit mirror 솔루션 시연 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ko  %}}

{{%  insert-safekit-hub-ko app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-ko  %}}