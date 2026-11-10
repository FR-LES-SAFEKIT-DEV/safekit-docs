---
title: "비공유(shared-nothing) 아키텍처 vs 공유 디스크 아키텍처: 최적의 HA 클러스터 선택"
canonical: "https://safekit.eviden.com/ko/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/"
description: "고가용성을 위한 비공유(shared-nothing) 아키텍처와 공유 디스크 아키텍처를 비교합니다. SafeKit은 비공유(shared-nothing) 방식을 사용하여 SAN 비용을 절감하고, 장애 조치를 간소화하며, 복잡한 하드웨어 제약 없이 동기 복제를 제공하는 방법을 알아보세요."
category: "best-practises"
lang: "ko"
topics: "고가용성 클러스터를 위한 비공유(shared-nothing) 아키텍처 vs 공유 디스크 아키텍처, 비공유(shared-nothing) 아키텍처 vs 공유 디스크 아키텍처: 장단점, 🔍 SafeKit 살펴보기"
translation: "translate_md 2026-11-10.3 | glossaire 2026-11-10.5 | Translation LLM | 49 expressions"
---

# 비공유(shared-nothing) 아키텍처 vs 공유 디스크 아키텍처: 최적의 HA 클러스터 선택 {#shared-nothing-vs-shared-disk-architecture-choosing-the-best-ha-cluster}

## 고가용성 클러스터를 위한 비공유(shared-nothing) 아키텍처 vs 공유 디스크 아키텍처 {#shared-nothing-architecture-vs-shared-disk-architecture-for-high-availability-clusters}

### 개요 {#overview}

이 글에서는 고가용성 클러스터를 위한 비공유(shared-nothing) 아키텍처와 공유 디스크 아키텍처의 장단점을 살펴봅니다. 하드웨어 제약, 애플리케이션 데이터 구성에 미치는 영향, 복구 시간, 구현의 단순성 등을 고려합니다.


![비공유(shared-nothing) 아키텍처 vs 공유 디스크 아키텍처](/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png "w:200")


다음 비교표는 공유 디스크 아키텍처와 비공유(shared-nothing) 아키텍처를 구현하는 소프트웨어 클러스터링 제품인 SafeKit의 차이점을 자세히 설명합니다.

### 공유 디스크 아키텍처란 무엇인가요? {#what-is-a-shared-disk-architecture}

공유 디스크 아키텍처([Microsoft 장애 조치 클러스터](<https://learn.microsoft.com/en-us/windows-server/failover-clustering/clustering-requirements>)와 유사)는 하드웨어 또는 소프트웨어 장애 발생 시 자동 애플리케이션 장애 조치를 통해 2개의 서버가 디스크를 공유하는 방식입니다.

이 아키텍처에는 하드웨어 제약 조건이 있습니다. 즉, 특정 외부 공유 스토리지, 서버 내부에 설치할 특정 카드, 서버와 공유 스토리지 간의 특정 스위치입니다.

공유 디스크 아키텍처는 애플리케이션 데이터 구성에 큰 영향을 미칩니다. 모든 애플리케이션 데이터는 장애 조치 후 재시작을 위해 공유 디스크에 로컬화되어야 합니다.

또한, 장애 조치 시 파일 시스템 복구 절차를 공유 디스크에서 실행해야 합니다. 이로 인해 복구 시간(RTO)이 증가합니다.

마지막으로, 특정 하드웨어를 구성하는 데 기술이 필요하므로 솔루션을 구성하기가 쉽지 않습니다. 또한 공유 디스크에 애플리케이션 데이터를 구성하려면 애플리케이션 기술이 필요합니다.

### 비공유(shared-nothing) 아키텍처란 무엇인가요? {#what-is-a-shared-nothing-architecture-}

비공유(shared-nothing) 아키텍처([SafeKit](</ko/>)와 같은)는 하드웨어 또는 소프트웨어 장애 발생 시 자동 애플리케이션 장애 조치를 통해 실시간으로 데이터를 복제하는 2개의 서버를 기반으로 합니다.

데이터 복제에는 [바이트 수준 파일 복제와 블록 수준 디스크 복제](</ko/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>), 두 가지 유형이 있습니다. 여기서는 블록 수준 디스크 복제보다 많은 장점이 있는 바이트 수준 파일 복제를 고려합니다.

비공유(shared-nothing) 아키텍처에는 하드웨어 제약이 없습니다. 서버는 물리적이거나 가상일 수 있으며 모든 유형의 디스크 구성을 사용할 수 있습니다. 실시간 파일 복제(데이터 손실 제로를 위한 [동기식](</ko/best-practises/synchronous-replication-vs-asynchronous-replication/>))는 서버 간 표준 네트워크를 통해 이루어집니다.

이 아키텍처는 애플리케이션 데이터 구성에 영향을 미치지 않습니다. 예를 들어, 애플리케이션의 데이터가 시스템 디스크에 있는 경우 실시간 파일 복제가 작동합니다.

장애 조치 시 복구 시간(RTO)은 보조 서버의 복제된 파일에서 애플리케이션을 다시 시작하는 시간으로 단축됩니다.

마지막으로, 복제할 디렉터리 경로만 구성하면 되므로 솔루션 구성이 매우 간단합니다.

## 비공유(shared-nothing) 아키텍처 vs 공유 디스크 아키텍처: 장단점 {#shared-nothing-architecture-vs-shared-disk-architecture-pros-and-cons}


{{%  insert-safekit-shared-nothing-vs-shared-disk-table-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}