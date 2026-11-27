---
title: "고가용성을 위한 데이터 복제 기술: 완벽 비교"
canonical: "https://safekit.eviden.com/ko/best-practises/data-replication-techniques/"
description: "데이터베이스, 디스크, 파일 수준의 데이터 복제 기술 비교와 SafeKit이 공유 스토리지 없이 동기 복제 및 장애 조치를 제공하는 방법."
category: "best-practises"
lang: "ko"
topics: "데이터 복제 기술은 데이터베이스 수준, 디스크 수준 또는 파일 수준 중 어떤 것인가요?, 데이터 복제 기술 비교표"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-19.15 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/03/data-replication-techniques.png"
schemaType: "TechArticle"
---

# 고가용성을 위한 데이터 복제 기술: 완벽 비교 {#data-replication-techniques-for-high-availability-a-complete-comparison}

## 데이터 복제 기술은 데이터베이스 수준, 디스크 수준 또는 파일 수준 중 어떤 것인가요? {#data-replication-techniques-at-database-level-disk-level-or-file-level}

### 개요 {#overview}

이 글에서는 고가용성 클러스터에서 데이터베이스 수준, 디스크 수준, 파일 수준의 데이터 복제 기술의 장단점을 비교합니다. 장애 조치, 페일백, 구현의 단순성이라는 세 가지 기준을 살펴봅니다.


![데이터 복제 기술](/wp-content/uploads/2023/03/data-replication-techniques.png "w:128")


아래 비교표는 고가용성 소프트웨어 제품인 SafeKit에 구현된 데이터 복제 기술에 대해 자세히 설명합니다.

### 데이터베이스 수준의 데이터 복제 기법이란 무엇인가요? {#what-is-the-data-replication-technique-at-database-level}

데이터베이스 관리 시스템은 두 서버 간에 로그 파일을 복제합니다. [SQL Server 트랜잭션 로그](<https://learn.microsoft.com/en-us/sql/relational-databases/logs/the-transaction-log-sql-server>)가 그 예입니다.

자동 장애 조치에는 동기 복제가 필요합니다. 그렇지 않으면 장애 조치 후 보조 서버에서 마지막으로 커밋된 트랜잭션의 데이터가 손실됩니다.

이 기술은 데이터베이스를 복제하지만 애플리케이션의 다른 데이터는 복제하지 않습니다. 그러나 많은 애플리케이션의 장애 조치에는 구성 파일과 같은 다른 데이터도 복제해야 합니다.

서버가 다운되어 일부 데이터베이스 파일이 손실되면 페일백은 자동으로 이루어지지 않습니다. 숙련된 DBA가 다운된 서버에서 데이터베이스를 복원해야 합니다.

### 디스크 수준의 데이터 복제 기술이란 무엇인가요? {#what-is-the-data-replication-technique-at-disk-level}

디스크 내부의 수정 사항은 두 서버 간에 복제됩니다. [DRBD 오픈 소스 소프트웨어](<https://linbit.com/drbd/>)가 그 예입니다.

자동 장애 조치 시 데이터 손실을 방지하려면 디스크 간 복제가 동기식이어야 합니다.

이 기술은 다른 파일뿐만 아니라 데이터베이스도 복제할 수 있습니다. 하지만 애플리케이션 데이터 구성에 큰 영향을 미칩니다. 모든 데이터는 복제된 디스크에 저장되어야 합니다. 복제할 데이터 중 일부가 시스템 디스크에 있고 각 서버가 자체 시스템 디스크를 유지해야 하는 경우 이는 불가능할 수 있습니다.

파일 시스템이 있는 복제된 디스크를 구성하려면 특정 기술이 필요합니다. 또한 애플리케이션 데이터를 복제된 디스크로 이동하는 데에도 기술이 필요합니다.

### 파일 수준 데이터 복제 기술이란 무엇인가요? {#what-is-the-data-replication-technique-at-file-level}

파일 내부의 수정 사항은 두 서버 간에 복제됩니다. [SafeKit 고가용성 소프트웨어](</ko/>)가 그 예입니다.

자동 장애 조치 시 데이터 손실을 방지하려면 [실시간 동기 복제](</ko/best-practises/synchronous-replication-vs-asynchronous-replication/>)가 필요합니다.

이 기술은 다른 파일뿐만 아니라 데이터베이스도 복제할 수 있습니다. 애플리케이션의 데이터 구성에는 영향을 주지 않습니다. 예를 들어, 애플리케이션 데이터가 시스템 디스크에 있는 경우에도 실시간 파일 복제가 작동합니다.

솔루션 구성은 매우 간단합니다. 복제할 디렉터리 경로만 구성하면 됩니다.

## 데이터 복제 기술 비교표 {#comparative-tables-between-data-replication-techniques}


{{%  insert-safekit-mirror-comparison-table-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}