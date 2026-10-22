---
title: "SafeKit 아키텍처"
canonical: "https://safekit.eviden.com/ko/architectures/"
description: "SafeKit의 고가용성 아키텍처를 살펴보세요. SAN 없는 애플리케이션 장애 조치와 부하 분산을 위한 Mirror, Farm 및 Farm+Mirror 클러스터를 알아보세요."
category: "architectures"
lang: "ko"
topics: "SafeKit의 다양한 고가용성 아키텍처와 소프트웨어 클러스터는 무엇인가요?, SafeKit으로 고가용성 클러스터를 구축하는 방법, 🔍 SafeKit 고가용성 탐색 허브"
---

# SafeKit 아키텍처 {#safekit-architectures}

## SafeKit의 다양한 고가용성 아키텍처와 소프트웨어 클러스터는 무엇인가요? {#what-are-the-different-high-availability-architectures-and-the-different-software-clusters-with-safekit}

### Mirror 클러스터 {#mirror-cluster}


![SafeKit Mirror 클러스터](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


[자세히 보기](</architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### Farm 클러스터 {#farm-cluster}


![SafeKit Farm 클러스터](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


[자세히 보기](</architectures/network-load-balancing-cluster/>)

### Farm+Mirror 클러스터 {#farmmirror-cluster}


![SafeKit Farm+Mirror 클러스터](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


[자세히 보기](</architectures/clustering-software-load-balancing-mirroring/>)

### 액티브/액티브 클러스터 {#activeactive-cluster}


![실시간 복제를 수행하는 SafeKit 액티브/액티브 클러스터](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


[자세히 보기](</architectures/active-active-cluster-real-time-replication/>)

### N-1 클러스터 {#n-1-cluster}


![SafeKit N-1 이중화 클러스터](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


[자세히 보기](</architectures/n-1-redundancy/>)

## SafeKit으로 고가용성 클러스터를 구축하는 방법 {#how-to-build-high-availability-clusters-with-safekit}

### 고가용성 모듈 사용 {#use-high-availability-modules}

고가용성 모듈은 애플리케이션에 맞게 SafeKit을 사용자 지정한 것입니다. 모듈에는 실시간 데이터 복제와 장애 조치를 제공하는 Mirror 모듈, 부하 분산과 장애 조치를 제공하는 Farm 모듈의 두 가지 유형이 있습니다.

두 대의 서버에 Mirror 모듈을 배포하면 Mirror 클러스터가 생성되고, N대의 서버에 Farm 모듈을 배포하면 Farm 클러스터가 생성됩니다.

여러 애플리케이션 모듈을 같은 서버에 배포할 수 있습니다. 이를 통해 앞서 소개한 Farm+Mirror, 액티브/액티브, N-1과 같은 고급 클러스터 아키텍처를 구현할 수 있습니다.

### 애플리케이션 모듈이란 무엇인가요? {#what-is-an-application-module}

애플리케이션 모듈은 일반적으로 다음을 포함하는 “.Safe” 파일(zip 형식)입니다.

1 - 다음 항목이 포함된 구성 파일 userconfig.xml:

  * 서버 이름 또는 물리적 IP 주소
  * 클러스터 이름 또는 가상 IP 주소
  * 실시간 복제할 파일 디렉터리(Mirror 모듈의 경우)
  * 네트워크 부하 분산 기준(Farm 모듈의 경우)
  * 소프트웨어 및 하드웨어 장애 감지기 구성


2 - 애플리케이션을 시작하고 중지하는 스크립트.

### 고가용성 모듈의 플러그 앤 플레이 배포 {#plug-and-play-deployment-of-high-availability-modules}

애플리케이션 모듈을 구성하고 애플리케이션에서 테스트한 후에는 별도의 IT 전문 지식 없이 배포할 수 있습니다.

  1. 표준 서버 2대(물리 또는 가상)에 애플리케이션을 설치합니다.
  2. 두 서버 모두에 SafeKit 소프트웨어를 설치합니다.
  3. 두 서버 모두에 애플리케이션 모듈을 설치합니다.



{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}