---
title: "SQL Server Always On의 대안: Express 및 Standard 에디션용 HA"
canonical: "https://safekit.eviden.com/ko/best-practises/alternative-always-on-sql-server-express-standard-editions/"
description: "SQL Server Always On의 비용 효율적인 대안을 찾고 계십니까? SafeKit SAN이 필요 없는 아키텍처를 제안하여 SQL Server Express 및 Standard 에디션에 고가용성을 제공합니다. SAN이나 Active Directory 없이도 동기식 복제, 가상 IP, 자동 장애 조치를 경험해 보세요."
category: "best-practises"
lang: "ko"
topics: "Express 및 Standard 에디션용 Always On SQL Server 대체 방법, SafeKit mirror 클러스터가 Microsoft SQL Server 와 연동되는 방식, 비디오 가이드: SafeKit 용 SQL Server HA mirror 클러스터 구성, 🔍 SafeKit 고가용성 내비게이션 허브"
---

# SQL Server Always On의 대안: Express 및 Standard 에디션용 HA {#alternative-to-sql-server-always-on-ha-for-express-and-standard-editions}

## 익스프레스 및 스탠다드 에디션용 Always On SQL Server 대체품 {#alternative-to-always-on-sql-server-for-express-and-standard-editions}

### Microsoft SQL Server {#the-solution-for-microsoft-sql-server} 에 대한 해결책

SafeKit 동기식 실시간 데이터 복제 및 자동 장애 조치를 통해 두 개의 이중화 노드 간에 Microsoft SQL Server 에 고가용성을 제공합니다.

이 솔루션은 Microsoft SQL Server 에디션과 무관하며 익스프레스 에디션과 스탠다드 에디션 모두에서 작동합니다.

### 일반 제품 {#a-generic-product}

SafeKit 는 범용 제품입니다. SQL 서버 데이터 및 로그뿐만 아니라 다른 항목도 복제할 수 있습니다. 애플리케이션이 SQL Server 기반이고 구성 파일이나 기타 파일이 포함된 특정 폴더를 사용하는 경우, 동일한 방식으로 해당 파일도 복제할 수 있습니다. 또한 SQL 서버 서비스 외에도 자체 서비스를 재시작할 수 있습니다.

[ SafeKit 설치 가이드( Microsoft SQL Server 익스프레스 및 스탠다드 에디션 포함) ](</ko/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/>)

### Microsoft 장애 조치 클러스터 없이 {#without-microsoft-failover-cluster}

SafeKit Always On SQL Server 와 마찬가지로 Microsoft 페일오버 클러스터 없이 작동합니다. 가상 IP 주소, 폴더의 동기식 실시간 복제, 자동 페일오버 및 페일백 등을 모두 포함하는 올인원 솔루션입니다. SafeKit 공유 디스크와 엔터프라이즈급 데이터베이스 에디션이 필요하지 않습니다. 

### 도메인 컨트롤러 및 Active Directory 없이 {#without-domain-controller-and-active-directory}

SafeKit Always On SQL Server 와 달리 도메인 컨트롤러 및 Active Directory를 구성할 필요 없이 작동합니다. 이 간편하고 비용 효율적인 솔루션은 특별한 기술을 요구하지 않습니다.

### 쿼럼에 3개 노드가 없으면 {#without-3-nodes-for-quorum}

SafeKit Always On SQL Server 처럼 쿼럼을 위해 3개의 노드가 필요하지 않습니다. 네트워크 격리 상황에서는 SafeKit 증인 역할을 하는 라우터에 핑을 전송하는 스플릿 브레인 체커를 구현합니다. 또한, 여러 개의 하트비트를 간편하게 구성할 수 있습니다.

### 기타 이중화 및 고가용성 솔루션 {#other-redundancy-and-high-availability-solutions}

SafeKit 사용하면 Windows 및 Linux 에서 모든 폴더 및 서비스, 데이터베이스, Hyper-V 또는 Docker 가상 머신 전체, Kubernetes 애플리케이션의 실시간 복제 및 장애 조치를 구현할 수 있습니다.

### 완벽한 솔루션 {#a-complete-solution}

SafeKit 다음을 해결합니다: 

  * 하드웨어 고장(전체 문제의 20%), 여기에는 컴퓨터실 전체의 기능 마비가 포함됩니다. 
  * 소프트웨어 오류(문제의 40%), 주요 프로세스 재시작 포함 
  * 사용 편의성과 웹 콘솔 덕분에 인적 오류(문제의 40%)가 적습니다.



{{%  insert-safekit-mirror-ko app="Microsoft SQL Server"  %}}
 

## 비디오 가이드: SafeKit mirror {#videoguide-safekit-mirror-cluster} SQL Server HA 클러스터 구성


{{%  insert-safekit-mirror-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}