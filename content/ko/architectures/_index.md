---
title: "SafeKit 아키텍처"
canonical: "https://safekit.eviden.com/ko/architectures/"
description: "SafeKit 를 통해 고가용성 아키텍처를 살펴보세요. SAN이 없는 애플리케이션 장애 조치 및 로드 밸런싱을 위한 Mirror , Farm , 그리고 Farm + Mirror 클러스터에 대해 알아보세요."
category: "architectures"
lang: "ko"
topics: "SafeKit 사용한 다양한 고가용성 아키텍처 및 소프트웨어 클러스터는 무엇인가요?, SafeKit 사용하여 고가용성 클러스터를 구축하는 방법은 무엇인가요?, 🔍 SafeKit 고가용성 내비게이션 허브"
---

# SafeKit 아키텍처 {#safekit-architectures}

## {#what-are-the-different-high-availability-architectures-and-the-different-software-clusters-with-safekit} SafeKit 사용할 수 있는 다양한 고가용성 아키텍처와 소프트웨어 클러스터는 무엇입니까?

### Mirror 클러스터 {#mirror-cluster}


![ SafeKit mirror ](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


[ 추가 정보 ](</ko/architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### `Farm` 클러스터 {#farm-cluster}


![ SafeKit farm ](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


[ 추가 정보 ](</ko/architectures/network-load-balancing-cluster/>)

### `Farm` + mirror 클러스터 {#farmmirror-cluster}


![ SafeKit farm mirror 클러스터 ](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


[ 추가 정보 ](</architectures/clustering-software-load-balancing-mirroring/>)

### 활성/활성 클러스터 {#activeactive-cluster}


![ SafeKit 실시간 복제 기능이 있는 액티브 클러스터 ](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


[ 추가 정보 ](</architectures/active-active-cluster-real-time-replication/>)

### N-1 클러스터 {#n-1-cluster}


![ SafeKit N-1 중복 클러스터 ](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


[ 추가 정보 ](</architectures/n-1-redundancy/>)

## SafeKit 및 {#how-to-build-high-availability-clusters-with-safekit} 를 사용하여 고가용성 클러스터를 구축하는 방법은 무엇입니까?

### 고가용성 모듈 {#use-high-availability-modules} 를 사용하십시오.

고가용성 모듈은 애플리케이션에 맞게 SafeKit 를 사용자 정의한 것입니다. 모듈에는 두 가지 유형이 있습니다. 실시간 데이터 복제 및 장애 조치 기능을 갖춘 mirror 모듈과 로드 밸런싱 및 장애 조치 기능을 갖춘 `farm` 모듈입니다.

mirror 모듈을 2개의 서버에 배포하면 mirror 클러스터가 생성되고, `farm` 모듈을 N개의 서버에 배포하면 `farm` 클러스터가 생성됩니다.

여러 애플리케이션 모듈을 동일한 서버에 배포할 수 있습니다. 따라서 이전에 제시된 것과 같은 고급 클러스터링 아키텍처( `farm` + mirror , 액티브/액티브, N-1)를 구현할 수 있습니다.

### 응용 프로그램 모듈이란 무엇입니까? {#what-is-an-application-module}

실제로 애플리케이션 모듈은 다음을 포함하는 “.Safe” 파일(zip 형식)입니다.

1 - 구성 파일 userconfig.xml 에는 다음 내용이 포함되어 있습니다.

  * 서버의 이름 또는 물리적 IP 주소,
  * 클러스터의 이름 또는 가상 IP 주소,
  * 실시간으로 복제할 파일 디렉터리( mirror 모듈용)
  * 네트워크 부하 분산 기준( `farm` 모듈용)
  * 소프트웨어 및 하드웨어 오류 감지기 구성


2 - 애플리케이션을 시작하고 중지하는 스크립트.

### 고가용성 모듈 {#plug-and-play-deployment-of-high-availability-modules} 의 플러그 앤 플레이 배포

애플리케이션 모듈이 애플리케이션과 함께 구성 및 테스트되면 배포에 특별한 IT 기술이 필요하지 않습니다.

  1. 표준 서버 2대(물리적 또는 가상)에 애플리케이션을 설치합니다.
  2. SafeKit 소프트웨어를 두 서버 모두에 설치하십시오.
  3. 두 서버 모두에 애플리케이션 모듈을 설치하십시오.



{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}