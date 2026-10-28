---
title: "N-1 이중화 클러스터링: 하나의 백업으로 여러 애플리케이션에 대한 고가용성 확보"
canonical: "https://safekit.eviden.com/ko/architectures/n-1-redundancy/"
description: "SafeKit N-1 이중화로 데이터 센터를 최적화하세요. N+1개의 서버에 N개의 mirror 모듈을 배포하여 단일 공유 백업으로 여러 애플리케이션에 고가용성을 제공할 수 있습니다. Windows 및 Linux 의 실시간 복제를 통해 SAN 요구 사항을 없애고 하드웨어 비용을 절감하세요. 자세히 알아보세요."
category: "architectures"
lang: "ko"
topics: "N개 서버에서 1개 서버로 데이터 복제 및 애플리케이션 장애 조치를 통한 고가용성, 🔍 SafeKit 고가용성 내비게이션 허브"
---

# N-1 이중화 클러스터링: 하나의 백업으로 여러 애플리케이션을 위한 고가용성 확보 {#n-1-redundancy-clustering-high-availability-for-multiple-applications-with-one-backup}

## N개 서버에서 1개 서버로 데이터 복제 및 애플리케이션 장애 조치를 통해 고가용성을 확보할 수 있는 {#high-availability-with-data-replication-and-application-failover-from-n-servers-to-1}

### N-1 중복 {#n-1-redundancy}


![ SafeKit N-1 중복 클러스터 ](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


### N-1 이중화는 어떻게 작동하나요? {#how-the-n-1-redundancy-works}

SafeKit N개의 애플리케이션이 N개의 서버에서 실행되고 장애 조치를 위한 단일 백업을 갖춘 간단한 N-1 이중화 클러스터를 제공합니다. SafeKit N-1 이중화 클러스터에서는 각 애플리케이션이 자체 복제 디렉터리에서 작동합니다.

[ 액티브-액티브 클러스터인 ](</ko/architectures/active-active-cluster-real-time-replication/>) 와 달리, 기본 서버 중 하나에 장애가 발생할 경우 백업 서버가 이중으로 작업 부하를 처리할 필요가 없습니다.

이는 N-1 이중화 클러스터에서 한 번에 하나의 장애만 발생한다고 가정합니다. 이 솔루션은 여러 기본 서버가 동시에 장애를 겪는 상황도 지원할 수 있지만, 이 경우 단일 백업 서버가 장애가 발생한 모든 서버의 작업 부하를 처리해야 합니다.

### N-1 이중화를 구현하는 방법은 무엇입니까? {#how-to-implement-n-1-redundancy}

SafeKit N-1 이중화 클러스터는 N+1개의 서버에 N개의 mirror 모듈을 배포하는 것만으로 간단하게 구성할 수 있습니다.

다음 사항에 유의하십시오:

  * 애플리케이션 장애 조치를 위해서는 모든 애플리케이션(Appli1, Appli2, Appli3)이 단일 백업 시스템에 설치되어 있어야 합니다.
  * 각 mirror 모듈은 고유한 가상 IP 주소, 자체 복제 파일 디렉터리 및 자체 복구 스크립트를 갖게 됩니다.



{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}