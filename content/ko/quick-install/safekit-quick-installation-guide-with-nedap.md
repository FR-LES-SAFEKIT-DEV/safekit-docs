---
title: "SafeKit을 사용한 Nedap 고가용성: 장애 조치용 nedap.safe 모듈 설치"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-with-nedap/"
description: "SafeKit용 nedap.safe 모듈을 배포하여 Windows에서 Nedap의 동기식 실시간 복제 및 자동 장애 조치를 활성화하십시오. 이 가이드는 공유 스토리지 없이 중요한 애플리케이션을 위한 2노드 SANless 클러스터를 설정하는 과정을 안내합니다."
category: "quick-install"
lang: "ko"
topics: "Nedap 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit/Nedap 솔루션 개요, Windows에 SafeKit/Nedap 솔루션 설치 (nedap.safe), SafeKit/Nedap 솔루션의 단계별 구성, SafeKit mirror 솔루션 시연, 🔍 SafeKit 살펴보기"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# SafeKit을 사용한 Nedap 고가용성: 장애 조치용 nedap.safe 모듈 설치 {#nedap-high-availability-with-safekit-install-the-nedapsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ko app="Nedap" mod="nedap"  %}}
 

**📘 [SafeKit을 사용한 Nedap AOES 구성(PDF)](</wp-content/uploads/documents/NEDAP_AEOS_CLUSTER_SAFEKIT.pdf>)**: 모든 세부 정보는 이 문서에 있습니다.

## SafeKit/Nedap 솔루션 개요 {#overview-of-the-safekit--nedap-solution}

솔루션은 다음에서 설명합니다. **💡 [가장 간단한 Nedap 고가용성: 2노드 동기 복제 및 장애 조치](</ko/solutions/nedap-high-availability-synchronous-replication-failover/>)**.

## Windows에 SafeKit/Nedap 솔루션 설치 (nedap.safe) {#installation-of-the-safekit--nedap-solution-on-windows-nedapsafe}

### 사전 요구 사항 {#prerequisites}

  * Nedap AEOS와 SQL을 2개의 노드(가상 머신 또는 물리적 서버)에 설치해야 합니다.
  * Nedap AEOS와 동일한 노드에서 SQL Server를 사용하는 경우, 서버의 실제 IP 주소가 아닌 가상 IP 주소를 사용하여 Nedap AEOS와 SQL 간의 연결을 구성하십시오. 그렇지 않으면 장애 조치가 작동하지 않습니다. SQL Server 외부일 수 있습니다. 아래 참고 사항을 참조하십시오.


ℹ️ 참고: SQL Server 외부에 있을 수 있습니다. 이 경우 단계별 구성의 4단계에서 다음을 수행합니다

  * SQL 데이터 및 로그 폴더의 복제를 제거합니다
  * sqlservr.exe의 프로세스 검사기를 제거합니다
  * SERVICES 매크로에서 MSSQLServer를 제거합니다.


💡 [SafeKit과 sqlserver.safe 모듈](</ko/solutions/sql-server-high-availability-synchronous-replication-failover/>)을 사용하여 외부 SQL Server의 이중화를 구현할 수 있습니다. 이 경우, sqlserver.safe 모듈의 가상 IP 주소로 Nedap AEOS의 SQL 연결을 구성하십시오.


{{%  insert-safekit-installation-package-windows-ko app="Nedap AEOS and SQL" mod="nedap"  %}}

{{%  insert-safekit-82-installation-module-windows-ko app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## SafeKit/Nedap 솔루션의 단계별 구성 {#step-by-step-configuration-of-the-safekit--nedap-solution}


{{%  insert-safekit-82-configuration-ko app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## SafeKit mirror 솔루션 시연 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}