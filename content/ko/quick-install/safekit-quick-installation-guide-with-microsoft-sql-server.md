---
title: "Microsoft SQL Server 의 고가용성( SafeKit 포함): 장애 조치를 위해 sqlserver.safe 모듈을 설치하십시오."
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/"
description: "배포하세요 sqlserver.safe 모듈용 SafeKit 동기식 실시간 복제 및 자동 장애 조치를 활성화하기 위해 Microsoft SQL Server이 가이드에서는 공유 스토리지가 없는 중요 애플리케이션을 위한 2노드 SANless 클러스터 설정 과정을 안내합니다."
category: "quick-install"
lang: "ko"
topics: "Microsoft , SQL Server , SafeKit 고가용성 빠른 설치 가이드, 고가용성 제한 사항, SafeKit / Microsoft SQL Server 솔루션 개요, Windows ( sqlserver.safe )에 SafeKit / Microsoft SQL Server 솔루션 설치, SafeKit / Microsoft SQL Server 솔루션 단계별 구성, SafeKit mirror 솔루션 시연, 🔍 SafeKit 고가용성 내비게이션 허브"
---

# Microsoft SQL Server 고가용성 SafeKit 포함): 장애 조치를 위한 sqlserver.safe 모듈 설치 {#microsoft-sql-server-high-availability-with-safekit-install-the-sqlserversafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ko app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## SafeKit / Microsoft SQL Server 솔루션 개요 {#overview-of-the-safekit--microsoft-sql-server-solution}

솔루션에 대한 자세한 개요는 **💡 [ 가장 간단한 Microsoft SQL Server 고가용성: 2노드 동기 복제 및 장애 조치 ](</ko/solutions/sql-server-high-availability-synchronous-replication-failover/>)** 를 참조하십시오.

## Windows ( sqlserver.safe ) 및 에 SafeKit / Microsoft SQL Server 솔루션 설치 {#installation-of-the-safekit--microsoft-sql-server-solution-on-windows-sqlserversafe}

### 필수 조건 {#prerequisites}

  * Microsoft SQL Server 2개의 노드(가상 머신 또는 물리적 서버)에 설치해야 합니다.
  * SafeKit SQL Express를 포함한 모든 SQL 버전과 호환됩니다.


  * [ SQL 시스템 데이터베이스(예: master.mdf 및 mastlog.ldf) ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) 두 노드의 동일한 디렉터리에 있어야 합니다. 해당 디렉터리는 단계별 구성의 4단계에서 복제되도록 구성됩니다.
  * SQL은 두 노드의 파일 시스템에서 동일한 위치에 설치해야 합니다. 읽기 전용 SQL 리소스 데이터베이스인 [ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) 바이너리 영역에 위치하고 있으며, 이는 장애 조치에 필수적이기 때문입니다. 이 데이터베이스는 복제할 필요가 없습니다.
  * SQL 사용자 데이터베이스(.mdf 및 .ldf)는 두 노드 모두에서 동일한 디렉터리에 있어야 합니다. 해당 디렉터리는 단계별 구성의 4단계에서 복제되도록 구성됩니다.



{{%  insert-safekit-installation-package-windows-ko app="Microsoft SQL Server" mod="sqlserver"  %}}

{{%  insert-safekit-82-installation-module-windows-ko app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## SafeKit / Microsoft SQL Server 솔루션 의 단계별 구성 {#step-by-step-configuration-of-the-safekit--microsoft-sql-server-solution}


{{%  insert-safekit-82-configuration-ko app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## SafeKit mirror 솔루션 시연 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}