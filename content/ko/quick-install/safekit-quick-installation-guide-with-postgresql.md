---
title: "SafeKit을 통한 PostgreSQL 고가용성: 장애 조치를 위한 postgresql.safe 모듈 설치"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-with-postgresql/"
description: "Windows 및 Linux에서 PostgreSQL의 동기식 실시간 복제 및 자동 장애 조치를 활성화하려면 SafeKit용 postgresql.safe 모듈을 배포하세요. 이 가이드는 공유 스토리지가 없는 중요한 애플리케이션을 위한 2노드 SANless 클러스터를 설정하는 과정을 안내합니다."
category: "quick-install"
lang: "ko"
topics: "PostgreSQL용 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit/PostgreSQL 솔루션 개요, Windows 및 Linux에 SafeKit/PostgreSQL 솔루션 설치(postgresql.safe), SafeKit/PostgreSQL 솔루션의 단계별 구성, SafeKit 미러 솔루션 시연, 🔍 SafeKit 고가용성 탐색 허브"
---

# SafeKit를 통한 PostgreSQL 고가용성: 장애 조치를 위한 postgresql.safe 모듈 설치 {#postgresql-high-availability-with-safekit-install-the-postgresqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ko app="PostgreSQL" mod="postgresql.safe"  %}}
 

## SafeKit/PostgreSQL 솔루션 개요 {#overview-of-the-safekit--postgresql-solution}

솔루션은 여기에 설명되어 있습니다. **💡[가장 간단한 PostgreSQL 고가용성: 2노드 동기식 복제 및 장애 조치](</ko/solutions/postgresql-high-availability-synchronous-replication-failover/>)**.

## Windows 및 Linux에 SafeKit/PostgreSQL 솔루션 설치(postgresql.safe) {#installation-of-the-safekit--postgresql-solution-on-windows-and-linux-postgresqlsafe}

### 전제 조건 {#prerequisites}

  * 2개의 노드(가상 머신 또는 물리적 서버)에 PostgreSQL이 설치되어 있어야 합니다.



{{%  insert-safekit-installation-package-windows-ko app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-windows-ko app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-installation-package-linux-ko app="PostgreSQL" mod="postgresql"  %}}

{{%  insert-safekit-82-installation-module-linux-ko app="PostgreSQL" mod="postgresql"  %}}
 

## SafeKit/PostgreSQL 솔루션의 단계별 구성 {#step-by-step-configuration-of-the-safekit--postgresql-solution}


{{%  insert-safekit-82-configuration-ko app="PostgreSQL" mod="postgresql"  %}}
 

## SafeKit 미러 솔루션 시연 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}