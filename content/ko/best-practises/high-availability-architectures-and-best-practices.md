---
title: "고가용성 아키텍처 및 소프트웨어 클러스터링 모범 사례"
canonical: "https://safekit.eviden.com/ko/best-practises/high-availability-architectures-and-best-practices/"
description: "애플리케이션 클러스터링을 위한 고가용성(HA) 아키텍처 및 모범 사례를 살펴보세요. SafeKit 소프트웨어가 공유 디스크 없이 mirror 및 farm 클러스터를 구현하여 중요한 애플리케이션에 대해 데이터 손실 제로 및 자동 장애 조치를 제공하는 방법을 알아보세요."
category: "best-practises"
lang: "ko"
topics: "고가용성 아키텍처와 모범 사례는 무엇인가요?, 고가용성 아키텍처 및 모범 사례에 대한 비교표, 🔍 SafeKit 살펴보기"
translation: "translate_md 2026-11-10.1 | glossaire 2026-11-10.1 | Translation LLM | 48 expressions"
---

# 고가용성 아키텍처 및 소프트웨어 클러스터링 모범 사례 {#high-availability-architectures--software-clustering-best-practices}

## 고가용성 아키텍처와 모범 사례는 무엇인가요? {#what-are-the-high-availability-architectures-and-the-best-practices}

### 개요 {#overview}

이 글에서는 다양한 고가용성 아키텍처와 각 아키텍처의 장단점을 제시하여 모범 사례를 살펴봅니다.


![고가용성 아키텍처 및 모범 사례](/wp-content/uploads/2023/03/high-availability-architectures-and-best-practices.png "w:400")


다음 비교표는 SafeKit 고가용성 아키텍처와 모범 사례를 자세히 설명합니다(SafeKit 소프트웨어 고가용성 제품입니다).

### 고가용성 아키텍처란 무엇인가요? {#what-are-the-high-availability-architectures}

[고가용성](<https://www.techtarget.com/it-infrastructure/definition/What-is-high-availability-HA-Definition-and-guide>) 아키텍처에는 데이터베이스와 같은 백엔드 애플리케이션용과 웹 서비스와 같은 프런트엔드 애플리케이션용의 두 가지 유형이 있습니다.

백엔드의 고가용성 아키텍처는 하드웨어 또는 소프트웨어 장애 발생 시 자동 애플리케이션 장애 조치를 통해 데이터를 공유하거나 복제하는 2개의 서버를 기반으로 합니다.

프런트엔드의 고가용성 아키텍처는 서버 <span class="notranslate farm-term" translate="no">farm</span> (2개 이상의 서버)을 기반으로 합니다. 부하 분산은 하드웨어 또는 소프트웨어로 이루어지며, TCP 세션을 farm 내의 사용 가능한 서버로 분산합니다.

또한 애플리케이션 수준 또는 가상 머신 수준에서 높은 가용성 중 하나를 선택해야 합니다.

### 모범 사례는 무엇인가요? {#what-are-the-best-practices}

이 글에서는 다음을 비교하여 고가용성 아키텍처의 모범 사례를 살펴봅니다:

  * [소프트웨어 클러스터링 vs 하드웨어 클러스터링](</ko/best-practises/clustering-software-vs-hardware-clustering/>)
  * [비공유(shared-nothing) 대 공유 디스크 아키텍처](</ko/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/>)
  * [애플리케이션 대 가상 머신 고가용성](</ko/best-practises/vm-ha-vs-application-ha/>)
  * [고가용성 vs 내결함성](</ko/best-practises/high-availability-cluster-vs-fault-tolerant-system/>)
  * [동기식 복제 대 비동기식 복제](</ko/best-practises/synchronous-replication-vs-asynchronous-replication/>)
  * [파일 복제 vs 디스크 복제](</ko/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>)
  * [데이터 복제 기술](</ko/best-practises/data-replication-techniques/>)
  * [RPO 및 RTO 예시](</ko/best-practises/what-is-rpo-and-rto-with-examples/>)
  * [분할된 브레인과 쿼럼](</ko/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>)
  * [가상 IP 주소](</ko/best-practises/how-a-virtual-ip-address-works/>).


## 고가용성 아키텍처 및 모범 사례에 대한 비교표 {#comparative-tables-on-high-availability-architectures-and-best-practices}


{{%  insert-safekit-software-vs-hardware-table-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}