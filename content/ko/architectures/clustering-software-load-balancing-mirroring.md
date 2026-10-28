---
title: "팜 및 미러 서버를 위한 클러스터링 소프트웨어: 고가용성 및 로드 밸런싱"
canonical: "https://safekit.eviden.com/ko/architectures/clustering-software-load-balancing-mirroring/"
description: "SafeKit Farm 및 Mirror 모듈을 조합하여 고급 아키텍처를 구축하십시오. 프런트엔드 확장성을 위한 네트워크 로드 밸런싱과 백엔드 데이터 보호를 위한 실시간 동기식 복제를 결합할 수 있습니다. Windows 및 Linux 모듈은 전문적인 IT 기술 없이도 SAN이 필요 없는 간편한 클러스터링을 제공합니다. 무료 평가판을 다운로드하세요."
category: "architectures"
lang: "ko"
topics: "SafeKit 클러스터링 소프트웨어로 핵심 웹 및 데이터베이스 애플리케이션의 고가용성과 확장성을 확보하세요. 🔍 SafeKit 고가용성 내비게이션 허브"
---

# 팜 및 미러 서버를 위한 클러스터링 소프트웨어: 고가용성 및 로드 밸런싱 {#clustering-software-for-farms-and-mirrors-high-availability--load-balancing}

## SafeKit 클러스터링 소프트웨어와 {#high-availability-and-scalability-of-critical-web-and-database-applications-with-the-safekit-clustering-software} 사용하여 핵심 웹 및 데이터베이스 애플리케이션의 고가용성과 확장성을 확보하세요.

### 로드 밸런싱, 미러링 및 페일오버 {#load-balancing-mirroring-and-failover}


![ SafeKit 클러스터링(로드 밸런싱 및 미러링 포함) ](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


### SafeKit 클러스터링 소프트웨어 {#example-with-the-safekit-clustering-software} 를 사용한 예시

예를 들어, SafeKit 클러스터링 소프트웨어를 사용하면 IIS 로드 밸런싱과 Microsoft 및 SQL Server 미러링을 구현할 수 있습니다.

이를 위해서는 IIS SQL 서버에는 `farm` 모듈을, Microsoft SQL 서버에는 mirror 모듈을 배포해야 합니다. 각 `farm` 및 mirror 모듈은 고유한 가상 IP 주소와 재시작 스크립트로 구성됩니다.

mirror 및 `farm` 모듈은 모두 두 대의 서버로 구성된 단일 클러스터에 배포할 수 있습니다. IIS , Microsoft 및 SQL Server 모듈은 이 두 서버에서 실행됩니다. 또는 두 모듈을 서로 다른 서버로 구성된 두 개의 클러스터에 배포할 수도 있습니다.

SafeKit 클러스터링 소프트웨어를 사용하면 동일한 서버에 배포하든 다른 서버에 배포하든 차이가 없습니다.

### 고가용성 및 확장성 솔루션 {#high-availability-and-scalability-solution}

SafeKit 클러스터링 소프트웨어는 중요한 웹 및 데이터베이스 애플리케이션을 위한 간단하고 높은 가용성과 확장성을 제공하는 솔루션을 제공합니다.

결과적으로 네트워크 로드 밸런싱, 실시간 데이터 미러링 및 애플리케이션 장애 조치가 동일한 제품에서 통합적으로 관리됩니다.

SafeKit 클러스터링 소프트웨어를 하드웨어 클러스터링과 비교할 때, 공유 디스크, 복제된 SAN, 로드 밸런서, 엔터프라이즈급 운영 체제 또는 데이터베이스가 필요하지 않습니다.


{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}