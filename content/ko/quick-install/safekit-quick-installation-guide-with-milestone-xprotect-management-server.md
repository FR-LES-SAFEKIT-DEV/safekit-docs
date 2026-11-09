---
title: "SafeKit을 사용한 Milestone XProtect 고가용성: 장애 조치용 milestone.safe 모듈 설치"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server/"
description: "SafeKit용 milestone.safe 모듈을 배포하여 Windows에서 Milestone XProtect의 동기식 실시간 복제 및 자동 장애 조치를 활성화하십시오. 이 가이드는 공유 스토리지 없이 중요한 애플리케이션을 위한 2노드 SANless 클러스터를 설정하는 과정을 안내합니다."
category: "quick-install"
lang: "ko"
topics: "Milestone XProtect 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit/Milestone XProtect 솔루션 개요, Windows에 SafeKit/Milestone XProtect 솔루션 설치 (milestone.safe), SafeKit/Milestone XProtect 솔루션의 단계별 구성, SafeKit mirror 솔루션 시연, 🔍 SafeKit 살펴보기"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# SafeKit을 사용한 Milestone XProtect 고가용성: 장애 조치용 milestone.safe 모듈 설치 {#milestone-xprotect-high-availability-with-safekit-install-the-milestonesafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ko app="Milestone XProtect" mod="milestone"  %}}
 

## SafeKit/Milestone XProtect 솔루션 개요 {#overview-of-the-safekit--milestone-xprotect-solution}

솔루션은 여기에서 설명합니다: **💡 [가장 간단한 Milestone XProtect 고가용성: 2노드 동기 복제 및 장애 조치](</ko/solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/>)**.

## Windows에 SafeKit/Milestone XProtect 솔루션 설치 (milestone.safe) {#installation-of-the-safekit--milestone-xprotect-solution-on-windows-milestonesafe}

### 사전 요구 사항 {#prerequisites}

  * Milestone XProtect Management와 SQL을 2개의 노드(가상 머신 또는 물리적 서버)에 설치해야 합니다. SQL Server와 Event Server는 외부일 수 있습니다. 아래 참고 사항을 참조하십시오.


ℹ️ 참고: SQL Server 외부일 수 있습니다. 이 경우 milestone.safe의 단계별 구성 중 4단계에서:

  * SQL 데이터 및 로그 폴더의 복제를 제거합니다
  * sqlservr.exe의 프로세스 검사기를 제거합니다
  * 매크로 서비스에서 MSSQLServer를 제거합니다.


💡 [SafeKit과 sqlserver.safe 모듈](</ko/solutions/sql-server-high-availability-synchronous-replication-failover/>)을 사용하여 외부 SQL Server의 이중화를 구현할 수 있습니다.

이 경우 두 관리 노드 모두에서 sqlserver.safe 모듈(레지스트리 키 HKEY_LOCAL_MACHINE > SOFTWARE > VideoOSServerConnectionString)의 가상 IP 주소를 사용하여 [Milestone Management와 SQL 간의 연결](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>)을 구성합니다.

ℹ️ 참고: 이벤트 서버는 관리 서버 외부에 있을 수 있습니다.

이 경우, milestone.safe가 2개 설치된 2개의 클러스터가 있습니다. 하나는 관리 클러스터용이고 다른 하나는 이벤트 클러스터용입니다.

관리 클러스터의 경우, milestone.safe의 단계별 구성 중 4단계에서:

  * SERVICES 매크로에서 MilestoneEventServerService를 제거합니다.


이벤트 클러스터의 경우, milestone.safe의 단계별 구성 중 4단계에서:

  * SERVICES 매크로에서 다음을 제거합니다. MSSQLServer, Milestone XProtect Management Server, Milestone XProtect Log Server
  * SQL 데이터 및 로그 폴더의 복제를 제거합니다
  * sqlservr.exe의 프로세스 검사기를 제거합니다
  * 단계별 구성 중에 이벤트 서버를 **관리 클러스터**의 가상 IP 주소로 [등록하거나](</wp-content/uploads/2022/07/milestone-management-server-register-2020.png>) (또는 다운로드 관리자에서 이벤트 서버를 설치하고 설치 중에 **관리 클러스터**의 가상 IP 주소를 설정)
  * Milestone 관리 클라이언트의 [등록된 서비스](</wp-content/uploads/2022/07/milestone-url-vip.png>)에서 이벤트 서버를 **이벤트 클러스터**의 가상 IP 주소로 설정합니다.


### ℹ️ 레코더 이중화 {#ℹ-recorder-redundancy}

  * 데이터 양 때문에 레코더 복제는 SafeKit에 적합하지 않습니다.
  * Milestone에 통합된 솔루션은 (실시간 복제 기능이 없는 장애 조치 녹화 서버로) 사용할 수 있습니다.
  * 두 대의 레코더는 액티브/액티브 구성으로 실행될 수 있으며, 카메라 고장 시 동일 영역의 모든 카메라가 손실되지 않도록 분산 배치됩니다.
  * 각 카메라의 스트림은 [Vega/RMF](<https://vega25.com/>) 솔루션을 통해 두 대의 녹화기로 전송될 수도 있습니다.


ℹ️ SafeKit 클러스터에서 Milestone을 버전 N에서 버전 N+1로 마이그레이션하는 경우 이 문서를 읽어보십시오: 🛠️ [SafeKit을 사용한 Milestone 관리 마이그레이션](</ko/quick-install/safekit-quick-installation-guide-milestone-migration/>)


{{%  insert-safekit-installation-package-windows-ko app="Milestone XProtect and SQL" mod="milestone"  %}}

{{%  insert-safekit-82-installation-module-windows-ko app="Milestone XProtect and SQL" mod="milestone"  %}}
 

## SafeKit/Milestone XProtect 솔루션의 단계별 구성 {#step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


{{%  insert-safekit-82-milestone-configuration-ko app="Milestone XProtect and SQL" mod="milestone"  %}}
 

## SafeKit mirror 솔루션 시연 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}