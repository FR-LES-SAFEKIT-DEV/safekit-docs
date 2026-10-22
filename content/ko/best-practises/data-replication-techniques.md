---
title: "고가용성을 위한 데이터 복제 기술: 종합 비교"
canonical: "https://safekit.eviden.com/ko/best-practises/data-replication-techniques/"
description: "데이터베이스, 디스크, 파일 수준의 데이터 복제 기술을 비교합니다. SafeKit이 SAN 없는 구조에서 간단한 실시간 동기식 복제를 제공하여 데이터 손실을 방지하고 Windows와 Linux에서 자동 장애 조치를 구현하는 이유를 알아보세요."
category: "best-practises"
lang: "ko"
topics: "데이터베이스, 디스크 또는 파일 수준의 데이터 복제 기술, 데이터 복제 기술 비교표, SafeKit 고가용성 탐색 허브"
---

# 고가용성을 위한 데이터 복제 기술: 종합 비교 {#data-replication-techniques-for-high-availability-a-complete-comparison}

## 데이터베이스, 디스크 또는 파일 수준의 데이터 복제 기술이란? {#data-replication-techniques-at-database-level-disk-level-or-file-level}

### 개요 {#overview}

이 문서에서는 고가용성 클러스터를 위한 데이터베이스, 디스크, 파일 수준 데이터 복제 기술의 장단점을 살펴봅니다. 장애 조치, 복구, 구현의 간편성에 대해 설명합니다.

![데이터 복제 기술](/wp-content/uploads/2023/03/data-replication-techniques.png "w:128")

다음 비교표에서 고가용성 소프트웨어 SafeKit이 구현하는 데이터 복제 기술을 자세히 설명합니다.

### 데이터베이스 수준 데이터 복제란 무엇인가요? {#what-is-the-data-replication-technique-at-database-level}

데이터베이스 관리 시스템이 두 서버 간에 로그 파일을 복제하는 방식입니다. 예를 들어 [SQL Server 트랜잭션 로그](<https://learn.microsoft.com/en-us/sql/relational-databases/logs/the-transaction-log-sql-server>)가 있습니다.

자동 장애 조치를 위해서는 동기식 복제가 필수입니다. 그렇지 않으면 장애 조치 후 마지막으로 승인된 트랜잭션을 보조 서버에서 복구할 수 없습니다.

이 기술은 데이터베이스를 복제하지만 애플리케이션의 다른 데이터는 복제하지 않습니다. 많은 애플리케이션의 장애 조치에는 구성 파일과 같은 추가 데이터의 복제도 필요합니다.

서버가 충돌하여 데이터베이스 파일 일부가 손실되면 장애 복구는 자동으로 이루어지지 않습니다. 숙련된 DBA가 장애 서버에서 데이터베이스를 복원해야 합니다.

### 디스크 수준 데이터 복제란 무엇인가요? {#what-is-the-data-replication-technique-at-disk-level}

[DRBD](<https://linbit.com/drbd/>)와 같이 두 서버의 디스크 변경 사항을 복제하는 방식입니다.

데이터 손실 없는 자동 장애 조치를 위해서는 디스크 간 동기식 복제가 필요합니다.

이 기술은 데이터베이스와 다른 파일도 복제할 수 있지만 애플리케이션 데이터 구성을 크게 바꿔야 합니다. 모든 데이터를 복제 디스크에 배치해야 하며, 복제할 데이터 일부가 시스템 디스크에 있으면 서버마다 시스템 디스크가 달라야 하므로 적용이 불가능할 수 있습니다.

파일 시스템을 포함한 복제 디스크를 구성하고 애플리케이션 데이터를 해당 디스크에 배치하려면 전문 기술이 필요합니다.

### 파일 수준 데이터 복제란 무엇인가요? {#what-is-the-data-replication-technique-at-file-level}

[SafeKit](/ko/)처럼 두 서버 간에 파일 내부 변경 사항을 복제하는 방식입니다.

데이터 손실 없는 자동 장애 조치를 위해서는 [실시간 동기식 복제](/ko/best-practises/synchronous-replication-vs-asynchronous-replication/)가 필요합니다.

이 기술은 애플리케이션 데이터 구성을 변경하지 않고 데이터베이스와 다른 파일을 복제할 수 있습니다. 예를 들어 애플리케이션 데이터가 시스템 디스크에 있어도 실시간 파일 복제가 작동합니다.

복제할 디렉터리 경로만 지정하면 되므로 구성이 매우 간단합니다.

## 데이터 복제 기술 비교표 {#comparative-tables-between-data-replication-techniques}

{{% insert-safekit-mirror-comparison-table-ko %}}

{{% insert-safekit-hub-ko %}}

{{% insert-safekit-4-buttons-ko %}}