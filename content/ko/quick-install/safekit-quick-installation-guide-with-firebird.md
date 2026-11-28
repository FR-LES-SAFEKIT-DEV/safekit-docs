---
title: "SafeKit 설치: Firebird 고가용성"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-with-firebird/"
description: "단계별 가이드: Windows 또는 Linux에서 Firebird의 실시간 복제 및 자동 장애 조치를 위한 SafeKit firebird.safe 모듈 설치."
category: "quick-install"
lang: "ko"
topics: "Firebird 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit/Firebird 솔루션 개요, Windows 및 Linux에 SafeKit/Firebird 솔루션 설치 (firebird.safe), SafeKit/Firebird 솔루션의 단계별 구성, SafeKit mirror 솔루션 시연"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--firebird-solution, installation-of-the-safekit--firebird-solution-on-windows-and-linux-firebirdsafe, step-by-step-configuration-of-the-safekit--firebird-solution, demonstration-of-the-safekit-mirror-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# SafeKit 설치: Firebird 고가용성 {#install-safekit-for-firebird-high-availability}


{{%  insert-safekit-mirror-guide-ko app="Firebird" mod="firebird"  %}}
 

## SafeKit/Firebird 솔루션 개요 {#overview-of-the-safekit--firebird-solution}

솔루션은 다음에서 설명합니다. **💡 [가장 간단한 Firebird 고가용성: 2노드 동기 복제 및 장애 조치](</ko/solutions/firebird-high-availability-synchronous-replication-failover/>)**.

## Windows 및 Linux에 SafeKit/Firebird 솔루션 설치 (firebird.safe) {#installation-of-the-safekit--firebird-solution-on-windows-and-linux-firebirdsafe}

### 사전 요구 사항 {#prerequisites}

  * 2개의 노드(가상 머신 또는 물리적 서버)에 Firebird 설치해야 합니다.



{{%  insert-safekit-installation-package-windows-ko app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-82-installation-module-windows-ko app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-installation-package-linux-ko app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-82-installation-module-linux-ko app="Firebird" mod="firebird"  %}}
 

## SafeKit/Firebird 솔루션의 단계별 구성 {#step-by-step-configuration-of-the-safekit--firebird-solution}


{{%  insert-safekit-82-configuration-ko app="Firebird" mod="firebird"  %}}
 

## SafeKit mirror 솔루션 시연 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}