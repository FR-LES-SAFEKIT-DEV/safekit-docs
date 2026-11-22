---
title: "N-1 이중화 클러스터: 단일 백업 서버로 여러 애플리케이션의 고가용성 확보"
canonical: "https://safekit.eviden.com/ko/architectures/n-1-redundancy/"
description: "SafeKit N-1 이중화로 데이터 센터를 최적화하세요. N+1 서버에 N개의 mirror 모듈을 배포하여 단일 공유 백업 서버로 여러 애플리케이션에 대한 고가용성을 제공합니다. Windows 및 Linux용 실시간 복제로 SAN 요구 사항을 없애고 하드웨어 비용을 절감하세요. 자세히 알아보기."
category: "architectures"
lang: "ko"
topics: "N개 서버에서 1개 서버로의 데이터 복제 및 애플리케이션 장애 조치를 통한 고가용성, 🔍 SafeKit 살펴보기"
translation: "translate_md 2026-11-22.1 | glossaire 2026-11-22.2 | Translation LLM | 52 expressions"
---

# N-1 이중화 클러스터: 단일 백업 서버로 여러 애플리케이션의 고가용성 확보 {#n-1-redundancy-clustering-high-availability-for-multiple-applications-with-one-backup}

## N개 서버에서 1개 서버로의 데이터 복제 및 애플리케이션 장애 조치를 통한 고가용성 {#high-availability-with-data-replication-and-application-failover-from-n-servers-to-1}

### N-1 이중화 {#n-1-redundancy}


![SafeKit을 사용한 N-1 이중화 클러스터](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


### N-1 이중화는 어떻게 작동하나요? {#how-the-n-1-redundancy-works}

SafeKit은 간단한 N-1 이중화 클러스터를 제공합니다. N개의 애플리케이션이 N개의 주 서버에서 실행되고, 장애 발생 시 단일 백업 서버가 인계받습니다. SafeKit N-1 이중화 클러스터에서 각 애플리케이션은 자체 복제된 디렉터리에서 작동합니다.

[액티브-액티브 클러스터](</ko/architectures/active-active-cluster-real-time-replication/>)와 달리, 기본 서버 중 하나에 장애가 발생하면 백업 서버가 두 배의 워크로드를 처리할 필요가 없습니다.

이는 N-1 이중화 클러스터에서 한 번에 하나의 기본 서버만 실패한다고 가정합니다. 이 솔루션은 여러 기본 서버 동시 장애도 처리할 수 있습니다. 이 경우 단일 백업 서버는 실패한 모든 서버의 결합된 워크로드를 실행합니다.

### N-1 이중화 구현 방법 {#how-to-implement-n-1-redundancy}

SafeKit N-1 이중화 클러스터를 구성하려면 N개의 mirror 모듈을 N+1개의 서버에 배포하기만 하면 됩니다.

참고:

  * 애플리케이션 장애 조치를 위해 모든 애플리케이션(Appli1, Appli2, Appli3)을 백업 서버에 설치해야 합니다.
  * 각 mirror 모듈은 고유한 가상 IP 주소, 복제된 파일 디렉터리 및 복구 스크립트를 갖습니다.



{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}