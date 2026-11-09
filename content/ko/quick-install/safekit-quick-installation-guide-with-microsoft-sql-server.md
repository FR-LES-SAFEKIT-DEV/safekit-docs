---
title: "SafeKit을 사용한 Microsoft SQL Server 고가용성: 장애 조치를 위한 sqlserver.safe 모듈 설치"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/"
description: "SafeKit용 sqlserver.safe 모듈을 배포하여 Microsoft SQL Server의 동기식 실시간 복제 및 자동 장애 조치를 활성화하십시오. 이 가이드는 공유 스토리지 없이 중요 애플리케이션을 위한 2노드 SANless 클러스터를 설정하는 과정을 안내합니다."
category: "quick-install"
lang: "ko"
topics: "Microsoft SQL Server 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit/Microsoft SQL Server 솔루션 개요, Windows에 SafeKit/Microsoft SQL Server 솔루션 설치 (sqlserver.safe), SafeKit/Microsoft SQL Server 솔루션의 단계별 구성, SafeKit mirror 솔루션 시연, 🔍 SafeKit 살펴보기"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# SafeKit을 사용한 Microsoft SQL Server 고가용성: 장애 조치를 위한 sqlserver.safe 모듈 설치 {#microsoft-sql-server-high-availability-with-safekit-install-the-sqlserversafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ko app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## SafeKit/Microsoft SQL Server 솔루션 개요 {#overview-of-the-safekit--microsoft-sql-server-solution}

솔루션에 대한 자세한 개요는 **💡 [가장 간단한 Microsoft SQL Server 고가용성: 2노드 동기 복제 및 장애 조치 를](</ko/solutions/sql-server-high-availability-synchronous-replication-failover/>)** 참조하십시오.

## Windows에 SafeKit/Microsoft SQL Server 솔루션 설치 (sqlserver.safe) {#installation-of-the-safekit--microsoft-sql-server-solution-on-windows-sqlserversafe}

### 사전 요구 사항 {#prerequisites}

  * 2개의 노드(가상 머신 또는 물리적 서버)에 Microsoft SQL Server 설치되어 있어야 합니다.
  * SafeKit SQL Express를 포함한 모든 버전의 SQL과 호환됩니다.


  * [SQL 시스템 데이터베이스](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (master.mdf 및 mastlog.ldf 등)는 두 노드 모두에서 동일한 디렉터리에 있어야 합니다. 이 디렉터리는 단계별 구성의 4단계에서 복제되도록 구성됩니다.
  * 읽기 전용 [SQL 리소스 데이터베이스는](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) 바이너리에 있으며 장애 조치에 필요하므로 SQL은 두 노드 모두의 파일 시스템에서 동일한 위치에 설치되어야 합니다. 이 데이터베이스는 복제할 필요가 없습니다.
  * SQL 사용자 데이터베이스(.mdf 및 .ldf)는 두 노드 모두에서 동일한 디렉터리에 있어야 합니다. 이 디렉터리는 단계별 구성의 4단계에서 복제되도록 구성됩니다.



{{%  insert-safekit-installation-package-windows-ko app="Microsoft SQL Server" mod="sqlserver"  %}}

{{%  insert-safekit-82-installation-module-windows-ko app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## SafeKit/Microsoft SQL Server 솔루션의 단계별 구성 {#step-by-step-configuration-of-the-safekit--microsoft-sql-server-solution}


{{%  insert-safekit-82-configuration-ko app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## SafeKit mirror 솔루션 시연 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}