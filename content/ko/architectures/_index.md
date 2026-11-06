---
title: "SafeKit 아키텍처"
canonical: "https://safekit.eviden.com/ko/architectures/"
description: "SafeKit으로 고가용성 아키텍처를 살펴보세요. SANless 애플리케이션 장애 조치 및 로드 밸런싱을 위한 Mirror, Farm, Farm + mirror 클러스터에 대해 알아보세요."
category: "architectures"
lang: "ko"
topics: "SafeKit의 다양한 고가용성 아키텍처와 소프트웨어 클러스터는 무엇인가요?, SafeKit으로 고가용성 클러스터를 구축하는 방법은 무엇인가요?, 🔍 SafeKit 고가용성 내비게이션 허브"
translation: "translate_md 2026-11-06.18 | glossaire 2026-11-06.13 | Translation LLM | 27 expressions"
---

# SafeKit 아키텍처 {#safekit-architectures}

## SafeKit를 사용한 다양한 고가용성 아키텍처와 다양한 소프트웨어 클러스터는 무엇인가요? {#what-are-the-different-high-availability-architectures-and-the-different-software-clusters-with-safekit}

### Mirror 클러스터 {#mirror-cluster}


![SafeKit mirror 클러스터](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


[추가 정보](</ko/architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### <span class="notranslate farm-term" translate="no">Farm</span> 클러스터 {#farm-cluster}


![SafeKit farm 클러스터](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


[추가 정보](</ko/architectures/network-load-balancing-cluster/>)

### <span class="notranslate farm-term" translate="no">Farm</span> + mirror 클러스터 {#farmmirror-cluster}


![SafeKit farm + mirror 클러스터](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


[추가 정보](</ko/architectures/clustering-software-load-balancing-mirroring/>)

### 액티브/액티브 클러스터 {#activeactive-cluster}


![실시간 복제를 지원하는 SafeKit 능동-능동 클러스터](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


[추가 정보](</ko/architectures/active-active-cluster-real-time-replication/>)

### N-1 클러스터 {#n-1-cluster}


![SafeKit N-1 이중화 클러스터](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


[추가 정보](</ko/architectures/n-1-redundancy/>)

## SafeKit으로 고가용성 클러스터를 구축하는 방법은 무엇인가요? {#how-to-build-high-availability-clusters-with-safekit}

### 애플리케이션 모듈 사용 {#use-high-availability-modules}

애플리케이션 모듈은 애플리케이션을 위한 SafeKit의 맞춤형 모듈입니다. 모듈에는 실시간 데이터 복제 및 장애 조치를 지원하는 mirror 모듈과 부하 분산 및 장애 조치를 지원하는 <span class="notranslate farm-term" translate="no">farm</span> 모듈의 두 가지 유형이 있습니다.

2개의 서버에 mirror 모듈을 배포하면 mirror 클러스터가 생성되고, N개의 서버에 <span class="notranslate farm-term" translate="no">farm</span> 모듈을 배포하면 <span class="notranslate farm-term" translate="no">farm</span> 클러스터가 생성됩니다.

여러 애플리케이션 모듈을 동일한 서버에 배포할 수 있습니다. 따라서 이전에 제시된 것과 같은 고급 클러스터링 아키텍처(<span class="notranslate farm-term" translate="no">farm</span> + mirror, 액티브/액티브, N-1)를 구현할 수 있습니다.

### 애플리케이션 모듈이란 무엇인가요? {#what-is-an-application-module}

실제로 애플리케이션 모듈은 다음을 포함하는 ".Safe" 파일(zip 유형)입니다

1 - 다음을 포함하는 구성 파일 userconfig.xml :

  * 클러스터의 가상 IP 주소,
  * 실시간으로 복제할 파일 디렉터리(mirror 모듈용)
  * 네트워크 부하 분산 기준(<span class="notranslate farm-term" translate="no">farm</span> 모듈용)
  * 소프트웨어 및 하드웨어 장애 감지기 구성


2 - 애플리케이션을 시작하고 중지하는 스크립트.

### 애플리케이션 모듈의 플러그 앤 플레이 배포 {#plug-and-play-deployment-of-high-availability-modules}

애플리케이션 모듈이 구성되고 애플리케이션으로 테스트되면 배포에 특별한 IT 기술이 필요하지 않습니다

  1. 애플리케이션을 2개의 표준 서버(물리적 또는 가상)에 설치합니다
  2. 두 서버 모두에 SafeKit 소프트웨어를 설치합니다
  3. 두 서버 모두에 애플리케이션 모듈을 설치하십시오.



{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}