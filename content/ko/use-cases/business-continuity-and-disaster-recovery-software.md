---
title: "SafeKit 사용하는 2노드 클러스터용 비즈니스 연속성 및 재해 복구 소프트웨어"
canonical: "https://safekit.eviden.com/ko/use-cases/business-continuity-and-disaster-recovery-software/"
description: "SafeKit 는 비즈니스 연속성 및 재해 복구 소프트웨어로, 두 개의 원격 전산실 간에 간단한 고가용성 솔루션을 제공합니다. 가장 사용하기 쉬운 비즈니스 연속성 및 재해 복구 소프트웨어인 SafeKit 통해 24시간 연중무휴 가동 시간을 확보하세요. Windows 와 Linux 는 2노드 동기식 복제, 자동 장애 조치 및 로드 밸런싱 기능을 제공하여 고가의 SAN과 복잡한 IT 전문 기술 없이도 효율적인 운영이 가능합니다. 클라우드 또는 온프레미스 환경에서 중요 애플리케이션의 데이터 손실을 제로(RPO=0)로 보장합니다."
category: "use-cases"
lang: "ko"
topics: "비즈니스 연속성 및 재해 복구 소프트웨어, 🔍 SafeKit 고가용성 내비게이션 허브"
---

# SafeKit 및 {#business-continuity-and-disaster-recovery-software-for-2-node-clusters-with-safekit} 사용하는 2노드 클러스터용 비즈니스 연속성 및 재해 복구 소프트웨어

## 비즈니스 연속성 및 재해 복구 소프트웨어 {#business-continuity-and-disaster-recovery-software}

### 비즈니스 연속성 및 재해 복구를 위해 SafeKit 소프트웨어를 선택해야 하는 이유 {#reasons-to-choose-the-safekit-software-for-business-continuity-and-disaster-recovery}


![ SafeKit ](/wp-content/uploads/2023/02/remote-datacenters.png "w:300") 포함한 간편한 비즈니스 연속성 및 재해 복구 소프트웨어


SafeKit 클러스터를 동일한 전산실에 배포하거나 원격 전산실 간에 배포할 때 구성상의 차이는 없습니다. 단, 원격 사이트 간에 확장된 LAN 또는 확장된 VLAN을 사용할 수 있어야 합니다.

### 두 개의 원격 전산실 간에 간단한 고가용성 솔루션을 구현하는 방법은 무엇입니까? {#how-to-implement-a-simple-high-availability-solution-between-two-remote-computer-rooms}

SafeKit mirror 및 `farm` 모듈은 특별한 클러스터 구성 없이 원격 전산실에 위치한 서버에 쉽게 배포할 수 있습니다. 즉, SafeKit 단일하고 간단한 아키텍처 내에서 비즈니스 연속성과 재해 복구를 결합합니다. 또한 SafeKit 네트워크 격리 시 제3의 서버나 특수 쿼럼 디스크 없이도 [ ](</best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) 와 같은 스플릿 브레인 환경을 관리합니다.

### 비즈니스 연속성 vs 백업 솔루션 {#business-continuity-vs-backup-solutions}

비즈니스 연속성 및 백업 솔루션은 서로 다른 장애 시나리오에 대응하며, 상호 보완적인 관계이지 상호 대체 가능한 솔루션은 아닙니다. SafeKit 의 고가용성 클러스터링으로 제공되는 비즈니스 연속성은 실시간 복제 및 자동 페일오버를 통해 서버 또는 애플리케이션 장애 발생 시에도 애플리케이션 운영 중단을 최소화합니다. 백업 솔루션은 랜섬웨어 공격이나 운영자 오류와 같은 광범위한 데이터 손실에 대비하며, 일반적으로 장애 발생 후 복원할 수 있는 오프사이트 데이터 복사본에 의존합니다. 복구 시간은 더 오래 걸리지만 자동 페일오버 기능은 제공하지 않습니다.

[ 에서 자세히 알아보세요. SafeKit 고가용성과 재해 복구 백업을 결합한 ](</best-practises/high-availability-disaster-recovery-hadr/>) 입니다.


{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}