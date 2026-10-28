---
title: "SafeKit을 사용한 Milestone XProtect 고가용성: 페일오버용 milestone.safe 모듈 설치"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server/"
description: "SafeKit의 milestone.safe 모듈을 배포하여 Windows에서 Milestone XProtect의 동기식 실시간 복제 및 자동 페일오버를 구현합니다. 이 가이드에서는 공유 스토리지 없이 중요 애플리케이션을 위한 2노드 SANless 클러스터를 설정하는 방법을 설명합니다."
category: "quick-install"
lang: "ko"
topics: "Milestone XProtect 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit / Milestone XProtect 솔루션 개요, Windows에 SafeKit / Milestone XProtect 솔루션 설치 (milestone.safe), SafeKit / Milestone XProtect 솔루션 단계별 구성, SafeKit mirror 솔루션 데모, 🔍 SafeKit 고가용성 탐색 허브"
---

# SafeKit을 사용한 Milestone XProtect 고가용성: 페일오버용 milestone.safe 모듈 설치 {#milestone-xprotect-high-availability-with-safekit-install-the-milestonesafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ko app="Milestone XProtect" mod="milestone"  %}}


## SafeKit / Milestone XProtect 솔루션 개요 {#overview-of-the-safekit--milestone-xprotect-solution}

솔루션에 대한 설명은 여기에서 확인할 수 있습니다: **💡[가장 간단한 Milestone XProtect 고가용성: 2노드 동기식 복제 및 페일오버](</ko/solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/>)**.

## Windows에 SafeKit / Milestone XProtect 솔루션 설치 (milestone.safe) {#installation-of-the-safekit--milestone-xprotect-solution-on-windows-milestonesafe}

### 사전 요구 사항 {#prerequisites}

  * 두 노드(가상 머신 또는 물리 서버)에 Milestone XProtect Management와 SQL이 설치되어 있어야 합니다. SQL Server와 Event Server는 외부에 둘 수 있습니다. 아래 참고 사항을 확인하세요.


ℹ️ 참고: SQL Server를 외부에 둘 수 있습니다. 이 경우 milestone.safe 단계별 구성의 4단계에서 다음을 수행합니다.

  * SQL Data 및 Log 폴더의 복제를 제거합니다.
  * sqlservr.exe 프로세스 검사기를 제거합니다.
  * SERVICES 매크로에서 MSSQLServer를 제거합니다.


외부 SQL Server의 이중화를 위해 **💡[SafeKit 및 sqlserver.safe 모듈](</ko/solutions/sql-server-high-availability-synchronous-replication-failover/>)**을 사용할 수 있습니다.

이 경우 두 Management 노드에서 sqlserver.safe 모듈의 가상 IP 주소를 사용하여 [Milestone Management와 SQL 간 연결](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>)을 구성합니다(레지스트리 키 HKEY_LOCAL_MACHINE > SOFTWARE > VideoOSServerConnectionString).

ℹ️ 참고: Event Server는 Management Server와 별도로 둘 수 있습니다.

이 경우 Management 클러스터용과 Event 클러스터용으로 milestone.safe를 각각 설치한 두 개의 클러스터를 구성합니다.

Management 클러스터의 경우 milestone.safe 단계별 구성 4단계에서 다음을 수행합니다.

  * SERVICES 매크로에서 MilestoneEventServerService를 제거합니다.


Event 클러스터의 경우 milestone.safe 단계별 구성 4단계에서 다음을 수행합니다.

  * SERVICES 매크로에서 MSSQLServer, Milestone XProtect Management Server, Milestone XProtect Log Server를 제거합니다.
  * SQL Data 및 Log 폴더의 복제를 제거합니다.
  * sqlservr.exe 프로세스 검사기를 제거합니다.
  * 단계별 구성 중 **Management 클러스터**의 가상 IP 주소로 Event Server를 [등록](</wp-content/uploads/2022/07/milestone-management-server-register-2020.png>)합니다(또는 Download Manager에서 Event Server를 설치하고 설치 중에 **Management 클러스터**의 가상 IP 주소를 설정합니다).
  * Milestone management client에서 [Registered Services](</wp-content/uploads/2022/07/milestone-url-vip.png>)의 Event Server를 **Event 클러스터**의 가상 IP 주소로 설정합니다.


### ℹ️ Recorder 이중화 {#ℹ-recorder-redundancy}

  * 데이터 양이 많으므로 Recorder 복제는 SafeKit에 적합하지 않습니다.
  * Milestone에 통합된 솔루션(실시간 복제 없는 페일오버 녹화 서버)을 사용할 수 있습니다.
  * 두 Recorder를 액티브/액티브 구성으로 실행하고 카메라를 분산하여 장애 발생 시 같은 영역의 모든 카메라가 손실되지 않도록 할 수도 있습니다.
  * 각 카메라의 스트림을 [Vega / RMF](<https://vega25.com/>) 솔루션을 사용해 두 Recorder로 보낼 수도 있습니다.


ℹ️ SafeKit 클러스터에서 Milestone을 버전 N에서 N+1로 마이그레이션하는 경우 이 문서를 참조하세요: 🛠️ [SafeKit을 사용한 Milestone Management 마이그레이션](</ko/quick-install/safekit-quick-installation-guide-milestone-migration/>)


{{%  insert-safekit-installation-package-windows-ko app="Milestone XProtect and SQL" mod="milestone"  %}}

{{%  insert-safekit-82-installation-module-windows-ko app="Milestone XProtect and SQL" mod="milestone"  %}}


## SafeKit / Milestone XProtect 솔루션 단계별 구성 {#step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


{{%  insert-safekit-82-milestone-configuration-ko app="Milestone XProtect and SQL" mod="milestone"  %}}


## SafeKit mirror 솔루션 데모 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}
