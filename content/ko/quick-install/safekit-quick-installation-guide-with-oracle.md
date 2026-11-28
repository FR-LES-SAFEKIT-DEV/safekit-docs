---
title: "SafeKit 설치: Oracle 고가용성"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-with-oracle/"
description: "단계별 가이드: Windows 또는 Linux에서 Oracle 데이터베이스의 실시간 복제 및 자동 장애 조치를 위한 SafeKit oracle.safe 모듈 설치."
category: "quick-install"
lang: "ko"
topics: "Oracle 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit/Oracle 솔루션 개요, Windows 및 Linux에 SafeKit/Oracle 솔루션 설치 (oracle.safe), SafeKit/Oracle 솔루션 단계별 구성, SafeKit mirror 솔루션 시연"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--oracle-solution, installation-of-the-safekit--oracle-solution-on-windows-and-linux-oraclesafe, step-by-step-configuration-of-the-safekit--oracle-solution, demonstration-of-the-safekit-mirror-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# SafeKit 설치: Oracle 고가용성 {#install-safekit-for-oracle-high-availability}


{{%  insert-safekit-mirror-guide-ko app="Oracle" mod="oracle"  %}}
 

## SafeKit/Oracle 솔루션 개요 {#overview-of-the-safekit--oracle-solution}

솔루션은 다음에서 설명합니다. **💡 [가장 간단한 Oracle 고가용성: 2노드 동기 복제 및 장애 조치](</ko/solutions/oracle-high-availability-synchronous-replication-failover/>)**.

## Windows 및 Linux에 SafeKit/Oracle 솔루션 설치 (oracle.safe) {#installation-of-the-safekit--oracle-solution-on-windows-and-linux-oraclesafe}

### 사전 요구 사항 {#prerequisites}

  * Oracle 2개의 노드(가상 머신 또는 물리적 서버)에 설치해야 합니다.



{{%  insert-safekit-installation-package-windows-ko app="Oracle" mod="oracle"  %}}

{{%  insert-safekit-82-installation-module-windows-ko app="Oracle" mod="oracle"  %}}

{{%  insert-safekit-installation-package-linux-ko app="Oracle" mod="oracle"  %}}

{{%  insert-safekit-82-installation-module-linux-ko app="Oracle" mod="oracle"  %}}
 

## SafeKit/Oracle 솔루션 단계별 구성 {#step-by-step-configuration-of-the-safekit--oracle-solution}


{{%  insert-safekit-82-configuration-ko app="Oracle" mod="oracle"  %}}
 

## SafeKit mirror 솔루션 시연 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}