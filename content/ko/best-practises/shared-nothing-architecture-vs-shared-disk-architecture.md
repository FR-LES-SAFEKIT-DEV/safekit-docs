---
title: "비공유(shared-nothing) vs. 공유 디스크 아키텍처"
canonical: "https://safekit.eviden.com/ko/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/"
description: "고가용성을 위한 비공유(shared-nothing)와 공유 디스크 아키텍처 비교: SafeKit이 서버 간 데이터를 복제해 SAN 비용을 없애고 장애 조치를 단순화하는 방법."
category: "best-practises"
lang: "ko"
topics: "고가용성 클러스터를 위한 비공유(shared-nothing) 아키텍처 vs 공유 디스크 아키텍처, 비공유(shared-nothing) 아키텍처 vs 공유 디스크 아키텍처: 장단점"
hashpart: "shared-nothing-architecture-vs-shared-disk-architecture-for-high-availability-clusters, shared-nothing-architecture-vs-shared-disk-architecture-pros-and-cons"
translation: "translate_md 2026-11-20.7 | glossaire 2026-11-20.14 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png"
schemaType: "TechArticle"
---

# 비공유(shared-nothing) vs. 공유 디스크 아키텍처 {#shared-nothing-vs-shared-disk-architecture}

## 고가용성 클러스터를 위한 비공유(shared-nothing) 아키텍처 vs 공유 디스크 아키텍처 {#shared-nothing-architecture-vs-shared-disk-architecture-for-high-availability-clusters}

### 개요 {#overview}

이 글에서는 고가용성 클러스터를 위한 두 가지 아키텍처인 비공유(shared-nothing) 아키텍처와 공유 디스크 아키텍처를 비교하고, 각 아키텍처의 장단점을 설명합니다. 또한 하드웨어 제약 사항, 애플리케이션 데이터 구성에 미치는 영향, 복구 시간 및 구현의 단순성에 대해 다룹니다.


![비공유(shared-nothing) 아키텍처 vs 공유 디스크 아키텍처](/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png "w:200")


아래 비교표는 공유 디스크 아키텍처와 SafeKit의 차이점을 자세히 설명합니다. 이 소프트웨어 클러스터링 제품은 비공유(shared-nothing) 아키텍처를 구현합니다.

### 공유 디스크 아키텍처란 무엇인가요? {#what-is-a-shared-disk-architecture}

공유 디스크 아키텍처는 디스크를 공유하는 두 서버를 기반으로 합니다. 하드웨어 또는 소프트웨어 장애가 발생하면 애플리케이션이 다른 서버에서 자동으로 다시 시작됩니다. Microsoft 장애 조치 클러스터링은 공유 디스크 아키텍처의 예입니다. 자세한 내용은 [장애 조치 클러스터링 하드웨어 요구 사항](<https://learn.microsoft.com/en-us/windows-server/failover-clustering/clustering-requirements>)을 참조하세요.

이 아키텍처에는 하드웨어 제약 조건이 있습니다. 즉, 특정 외부 공유 스토리지, 서버 내부의 특정 카드, 서버와 공유 스토리지 간의 특정 스위치입니다.

공유 디스크 아키텍처는 애플리케이션 데이터 구성에 큰 영향을 미칩니다. 모든 애플리케이션 데이터는 장애 조치 후 애플리케이션을 다시 시작할 수 있도록 공유 디스크에 있어야 합니다.

또한, 장애 조치 시 공유 디스크에서 파일 시스템 복구 절차를 실행해야 합니다. 이로 인해 복구 시간 목표(RTO)가 증가합니다.

마지막으로, 이 솔루션은 구성하기 쉽지 않습니다. 특정 하드웨어를 구성하려면 하드웨어 기술이 필요합니다. 또한 공유 디스크에 애플리케이션 데이터를 배치하려면 애플리케이션 기술도 필요합니다.

### 비공유(shared-nothing) 아키텍처란 무엇인가요? {#what-is-a-shared-nothing-architecture-}

비공유(shared-nothing) 아키텍처는 실시간으로 데이터를 복제하는 두 대의 서버를 기반으로 합니다. 하드웨어 또는 소프트웨어 장애가 발생하면 애플리케이션이 다른 서버에서 자동으로 다시 시작됩니다. SafeKit은 비공유(shared-nothing) 아키텍처의 예입니다.

데이터 복제에는 바이트 수준 파일 복제와 블록 수준 디스크 복제 두 가지 유형이 있습니다. 자세한 내용은 [바이트 수준 파일 복제와 블록 수준 디스크 복제 비교](</ko/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>)를 참조하십시오. 이 문서에서는 블록 수준 디스크 복제보다 장점이 많은 바이트 수준 파일 복제를 다룹니다.

비공유(shared-nothing) 아키텍처에는 하드웨어 제약이 없습니다. 서버는 물리적이거나 가상일 수 있으며, 모든 유형의 디스크 구성을 사용할 수 있습니다. 실시간 파일 복제는 서버 간 표준 네트워크를 통해 실행됩니다. [동기 복제](</ko/best-practises/synchronous-replication-vs-asynchronous-replication/>)는 데이터 손실이 없도록 보장합니다.

이 아키텍처는 애플리케이션 데이터 구성에 영향을 미치지 않습니다. 예를 들어, 애플리케이션 데이터가 시스템 디스크에 있더라도 실시간 파일 복제가 작동합니다.

장애 조치 시 복구 시간 목표(RTO)는 애플리케이션 재시작 시간으로 단축됩니다. 애플리케이션은 보조 서버의 복제된 파일에서 다시 시작됩니다.

마지막으로, 이 솔루션은 구성이 매우 간단합니다. 복제할 디렉터리 경로만 구성하면 됩니다.

## 비공유(shared-nothing) 아키텍처 vs 공유 디스크 아키텍처: 장단점 {#shared-nothing-architecture-vs-shared-disk-architecture-pros-and-cons}


{{%  insert-safekit-shared-nothing-vs-shared-disk-table-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}