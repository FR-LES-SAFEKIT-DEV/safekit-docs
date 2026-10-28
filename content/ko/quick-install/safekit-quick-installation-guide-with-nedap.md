---
title: "Nedap 고가용성 SafeKit 포함): 장애 조치를 위해 nedap.safe 모듈을 설치하십시오."
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-with-nedap/"
description: "SafeKit 에 nedap.safe 모듈을 배포하여 Windows 의 동기식 실시간 복제 및 Nedap 에 대한 자동 장애 조치를 활성화하십시오. 이 가이드에서는 공유 스토리지가 없는 중요 애플리케이션을 위한 2노드 SANless 클러스터 설정 과정을 안내합니다."
category: "quick-install"
lang: "ko"
topics: "Nedap 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit / Nedap 솔루션 개요, Windows ( nedap.safe )에 SafeKit / Nedap 솔루션 설치, SafeKit / Nedap 솔루션 단계별 구성, SafeKit mirror 솔루션 시연, 🔍 SafeKit 고가용성 내비게이션 허브"
---

# Nedap 고가용성 SafeKit 포함): 장애 조치용 nedap.safe 모듈 설치 포함) {#nedap-high-availability-with-safekit-install-the-nedapsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ko app="Nedap" mod="nedap"  %}}
 

** 📘 [ Nedap AOES와 SafeKit 의 구성(PDF) ](</wp-content/uploads/documents/NEDAP_AEOS_CLUSTER_SAFEKIT.pdf>) ** : 모든 세부 정보는 이 문서에 있습니다.

## SafeKit / Nedap 솔루션 개요 {#overview-of-the-safekit--nedap-solution}

솔루션은 여기에 설명되어 있습니다: ** 💡 [ 가장 간단한 Nedap 고가용성: 2노드 동기 복제 및 장애 조치 ](</solutions/nedap-high-availability-synchronous-replication-failover/>) ** .

## SafeKit / Nedap 솔루션의 Windows ( nedap.safe ) 및 설치 {#installation-of-the-safekit--nedap-solution-on-windows-nedapsafe}

### 필수 조건 {#prerequisites}

  * Nedap AEOS와 SQL이 2개의 노드(가상 머신 또는 물리적 서버)에 설치되어 있어야 합니다.
  * SQL Server Nedap AEOS와 동일한 노드에 있는 경우, Nedap AEOS의 SQL 연결을 서버의 물리적 IP 주소가 아닌 가상 IP 주소로 구성해야 합니다. 그렇지 않으면 페일오버가 작동하지 않습니다. SQL Server 외부 서버일 수 있습니다. 아래 참고 사항을 참조하십시오.


ℹ️ 참고: SQL Server 외부 장치일 수 있습니다. 이 경우 단계별 구성의 4단계에서 다음을 수행하십시오.

  * SQL 데이터 및 로그 폴더의 복제를 제거합니다.
  * sqlservr.exe 에서 프로세스 검사기를 제거하세요.
  * SERVICES 매크로에서 MSSQLServer를 제거합니다.


외부 SQL Server 모듈의 이중화는 💡 [ SafeKit 및 sqlserver.safe ](</solutions/sql-server-high-availability-synchronous-replication-failover/>) 모듈을 사용하여 구현할 수 있습니다. 이 경우 Nedap AEOS와 SQL 간의 연결을 sqlserver.safe 모듈의 가상 IP 주소로 구성하십시오.


{{%  insert-safekit-installation-package-windows-ko app="Nedap AEOS and SQL" mod="nedap"  %}}

{{%  insert-safekit-82-installation-module-windows-ko app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## SafeKit / Nedap 솔루션 의 단계별 구성 {#step-by-step-configuration-of-the-safekit--nedap-solution}


{{%  insert-safekit-82-configuration-ko app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## SafeKit mirror 솔루션 시연 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}