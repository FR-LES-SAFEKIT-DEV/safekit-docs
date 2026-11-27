---
title: "SafeKit을 사용한 PostgreSQL 고가용성: 장애 조치를 위한 postgresql.safe 모듈 설치"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-with-postgresql/"
description: "단계별 가이드: Windows 또는 Linux에서 PostgreSQL의 실시간 복제 및 자동 장애 조치를 위한 SafeKit postgresql.safe 모듈 설치."
category: "quick-install"
lang: "ko"
topics: "SafeKit/PostgreSQL 솔루션 개요, Windows 및 Linux에 SafeKit/PostgreSQL 솔루션 설치 (postgresql.safe), SafeKit/PostgreSQL 솔루션 단계별 구성, SafeKit mirror 솔루션 시연"
hashpart: "overview-of-the-safekit--postgresql-solution, installation-of-the-safekit--postgresql-solution-on-windows-and-linux-postgresqlsafe, step-by-step-configuration-of-the-safekit--postgresql-solution, demonstration-of-the-safekit-mirror-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# SafeKit을 사용한 PostgreSQL 고가용성: 장애 조치를 위한 postgresql.safe 모듈 설치 {#postgresql-high-availability-with-safekit-install-the-postgresqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ko app="PostgreSQL" mod="postgresql.safe"  %}}
 

## SafeKit/PostgreSQL 솔루션 개요 {#overview-of-the-safekit--postgresql-solution}

해결책은 다음에서 설명합니다: **💡 [가장 간단한 PostgreSQL 고가용성: 2노드 동기 복제 및 장애 조치](</ko/solutions/postgresql-high-availability-synchronous-replication-failover/>)**.

## Windows 및 Linux에 SafeKit/PostgreSQL 솔루션 설치 (postgresql.safe) {#installation-of-the-safekit--postgresql-solution-on-windows-and-linux-postgresqlsafe}

### 사전 요구 사항 {#prerequisites}

  * 2개의 노드(가상 머신 또는 물리적 서버)에 PostgreSQL 설치해야 합니다.



{{%  insert-safekit-installation-package-windows-ko app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-windows-ko app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-installation-package-linux-ko app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-linux-ko app="PostgreSQL" mod="postgresql"  %}}
 

## SafeKit/PostgreSQL 솔루션 단계별 구성 {#step-by-step-configuration-of-the-safekit--postgresql-solution}


{{%  insert-safekit-82-configuration-ko app="PostgreSQL" mod="postgresql"  %}}
 

## SafeKit mirror 솔루션 시연 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}