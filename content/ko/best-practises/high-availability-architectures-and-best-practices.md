---
title: "고가용성 아키텍처 및 소프트웨어 클러스터링 모범 사례"
canonical: "https://safekit.eviden.com/ko/best-practises/high-availability-architectures-and-best-practices/"
description: "애플리케이션 클러스터링을 위한 고가용성(HA) 아키텍처와 모범 사례를 살펴보세요. SafeKit은 공유 디스크 없이 Mirror 및 Farm 클러스터를 구현하여 데이터 손실을 방지하고 중요 애플리케이션에 자동 장애 조치를 제공합니다."
category: "best-practises"
lang: "ko"
topics: "고가용성 아키텍처와 모범 사례란 무엇인가요?, 고가용성 아키텍처와 모범 사례 비교표, SafeKit 고가용성 탐색 허브"
---

# 고가용성 아키텍처 및 소프트웨어 클러스터링 모범 사례 {#high-availability-architectures--software-clustering-best-practices}

## 고가용성 아키텍처와 모범 사례란 무엇인가요? {#what-are-the-high-availability-architectures-and-the-best-practices}

### 개요 {#overview}

이 문서에서는 여러 고가용성 아키텍처와 모범 사례를 살펴보고 각 아키텍처의 장단점을 비교합니다.

![고가용성 아키텍처와 모범 사례](/wp-content/uploads/2023/03/high-availability-architectures-and-best-practices.png "w:400")

다음 비교표에서 고가용성 소프트웨어인 SafeKit의 아키텍처와 모범 사례를 자세히 설명합니다.

### 고가용성 아키텍처에는 어떤 유형이 있나요? {#what-are-the-high-availability-architectures}

[고가용성 아키텍처](<https://www.techtarget.com/it-infrastructure/definition/What-is-high-availability-HA-Definition-and-guide>)에는 데이터베이스와 같은 백엔드 애플리케이션용과 웹 서비스와 같은 프런트엔드 애플리케이션용, 두 가지 유형이 있습니다.

백엔드 아키텍처는 데이터를 공유하거나 복제하는 두 서버를 기반으로 하며, 하드웨어 또는 소프트웨어 장애가 발생하면 애플리케이션을 자동으로 장애 조치합니다.

프런트엔드 아키텍처는 두 대 이상의 서버로 구성된 Farm을 기반으로 합니다. 하드웨어 또는 소프트웨어 부하 분산이 TCP 세션을 사용 가능한 서버에 분배합니다.

또한 애플리케이션 수준과 가상 머신 수준 중 어느 쪽에서 고가용성을 구현할지 선택해야 합니다.

### 모범 사례에는 어떤 것이 있나요? {#what-are-the-best-practices}

이 문서는 다음 항목을 비교하여 고가용성 아키텍처의 모범 사례를 살펴봅니다.

  * [소프트웨어 및 하드웨어 클러스터링](</ko/best-practises/clustering-software-vs-hardware-clustering/>),
  * [공유 스토리지 없는 아키텍처와 공유 디스크 아키텍처](</ko/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/>),
  * [애플리케이션 수준과 가상 머신 수준의 고가용성](</ko/best-practises/vm-ha-vs-application-ha/>),
  * [고가용성과 내결함성](</ko/best-practises/high-availability-cluster-vs-fault-tolerant-system/>),
  * [동기식 및 비동기식 복제](</ko/best-practises/synchronous-replication-vs-asynchronous-replication/>),
  * [파일 및 디스크 복제](</ko/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>),
  * [데이터 복제 기술](</ko/best-practises/data-replication-techniques/>),
  * [예시로 알아보는 RPO와 RTO](</ko/best-practises/what-is-rpo-and-rto-with-examples/>),
  * [스플릿 브레인과 쿼럼](</ko/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>),
  * [가상 IP 주소](</ko/best-practises/how-a-virtual-ip-address-works/>).

## 고가용성 아키텍처 및 모범 사례 비교표 {#comparative-tables-on-high-availability-architectures-and-best-practices}

{{% insert-safekit-software-vs-hardware-table-ko %}}

{{% insert-safekit-hub-ko %}}

{{% insert-safekit-4-buttons-ko %}}