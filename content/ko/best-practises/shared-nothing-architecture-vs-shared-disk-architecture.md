---
title: "공유 디스크 아키텍처 vs. 공유 디스크 아키텍처: 최적의 고가용성(HA) 클러스터 선택하기"
canonical: "https://safekit.eviden.com/ko/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/"
description: "고가용성을 위한 공유 디스크 아키텍처와 공유 디스크 아키텍처를 비교해 보세요. SafeKit 공유 디스크 아키텍처를 활용하여 SAN 비용을 절감하고, 장애 조치를 간소화하며, 복잡한 하드웨어 제약 없이 동기식 복제를 제공하는 방법을 알아보세요."
category: "best-practises"
lang: "ko"
topics: "고가용성 클러스터를 위한 공유 디스크 아키텍처와 공유 없음 아키텍처 비교, 공유 디스크 아키텍처와 공유 없음 아키텍처의 장단점, 🔍 SafeKit 고가용성 내비게이션 허브"
---

# 공유 디스크 아키텍처 vs. 공유 디스크 아키텍처: 최적의 HA 클러스터 선택하기 {#shared-nothing-vs-shared-disk-architecture-choosing-the-best-ha-cluster}

## 고가용성 클러스터를 위한 공유 디스크 아키텍처와 공유 디스크 아키텍처 비교 {#shared-nothing-architecture-vs-shared-disk-architecture-for-high-availability-clusters}

### 개요 {#overview}

이 글에서는 고가용성 클러스터에서 공유 디스크 아키텍처와 공유 디스크 아키텍처의 장단점을 비교 분석합니다. 하드웨어 제약 조건, 애플리케이션 데이터 구성에 미치는 영향, 복구 시간, 구현의 용이성 등을 중점적으로 살펴봅니다.


![ 공유 디스크 아키텍처 vs 공유 디스크 아키텍처 ](/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png "w:200")


다음 비교표는 공유 디스크 아키텍처와 공유 없음 아키텍처를 구현하는 소프트웨어 클러스터링 제품인 SafeKit 의 차이점을 자세히 설명합니다.

### 공유 디스크 아키텍처란 무엇입니까? {#what-is-a-shared-disk-architecture}

공유 디스크 아키텍처(예: [ Microsoft ](<https://learn.microsoft.com/en-us/windows-server/failover-clustering/clustering-requirements>) 장애 조치 클러스터)는 두 대의 서버가 디스크를 공유하고 하드웨어 또는 소프트웨어 오류 발생 시 애플리케이션이 자동으로 장애 조치되는 방식입니다.

이 아키텍처에는 하드웨어 제약 조건이 있습니다. 즉, 특정 외부 공유 스토리지, 서버 내부에 설치해야 하는 특정 카드, 그리고 서버와 공유 스토리지 사이에 연결해야 하는 특정 스위치가 필요합니다.

공유 디스크 아키텍처는 애플리케이션 데이터 구성에 큰 영향을 미칩니다. 장애 조치 후 재시작을 위해서는 모든 애플리케이션 데이터가 공유 디스크에 로컬로 저장되어야 합니다.

또한, 장애 조치 시 파일 시스템 복구 절차를 공유 디스크에서 실행해야 합니다. 이로 인해 복구 시간(RTO)이 증가합니다.

마지막으로, 이 솔루션은 특정 하드웨어를 구성하는 데 기술이 필요하기 때문에 설정이 쉽지 않습니다. 또한 공유 디스크에 애플리케이션 데이터를 구성하려면 애플리케이션 관련 기술도 필요합니다.

### 공유 자원이 없는 아키텍처란 무엇인가요? {#what-is-a-shared-nothing-architecture-}

공유 자원이 없는 아키텍처( [ SafeKit ](</>) 와 같은)는 하드웨어 또는 소프트웨어 오류 발생 시 자동 애플리케이션 페일오버 기능을 갖춘 두 대의 서버를 기반으로 실시간으로 데이터를 복제합니다.

데이터 복제에는 바이트 수준 파일 복제 [ 와 블록 수준 디스크 복제 ](</ko/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>) 두 가지 유형이 있습니다. 여기서는 블록 수준 디스크 복제에 비해 여러 장점이 있는 바이트 수준 파일 복제를 다룹니다.

공유 없음 아키텍처는 하드웨어 제약이 없습니다. 서버는 물리적 또는 가상 서버일 수 있으며 디스크 구성 방식도 제한이 없습니다. 실시간 파일 복제(데이터 손실이 없는 동기식 복제 [ , 동기식 ](</ko/best-practises/synchronous-replication-vs-asynchronous-replication/>) )는 서버 간 표준 네트워크를 통해 이루어집니다.

이 아키텍처는 애플리케이션 데이터 구성에 영향을 미치지 않습니다. 예를 들어, 애플리케이션의 데이터가 시스템 디스크에 있는 경우 실시간 파일 복제가 작동합니다.

장애 조치 발생 시 복구 시간(RTO)은 보조 서버의 복제된 파일에서 애플리케이션이 다시 시작되는 시간으로 단축됩니다.

마지막으로, 이 솔루션은 복제할 디렉터리의 경로만 구성하면 되므로 설정이 매우 간단합니다.

## 공유 디스크 아키텍처와 공유 없음 아키텍처의 장단점 비교 {#shared-nothing-architecture-vs-shared-disk-architecture-pros-and-cons}


{{%  insert-safekit-shared-nothing-vs-shared-disk-table-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}