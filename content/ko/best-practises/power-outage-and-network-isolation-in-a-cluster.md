---
title: "HA 클러스터에서 정전 및 네트워크 격리 처리"
canonical: "https://safekit.eviden.com/ko/best-practises/power-outage-and-network-isolation-in-a-cluster/"
description: "고가용성 클러스터에서 네트워크 격리 및 정전 관리 방법을 알아보세요. SafeKit 공유 디스크 없이 데이터 무결성과 연중무휴 24시간 가동을 보장하기 위해 통합 스플릿 브레인 체커 및 자동 재동기화 기능을 갖춘 SAN리스 아키텍처를 제안합니다."
category: "best-practises"
lang: "ko"
topics: "클러스터에서 네트워크 격리가 발생할 경우 어떤 시나리오가 있을까요?, 클러스터에서 정전이 발생할 경우 어떤 시나리오가 있을까요?, 🔍 SafeKit 고가용성 내비게이션 허브"
---

# HA 클러스터에서 정전 및 네트워크 격리 처리 {#handling-power-outages-and-network-isolation-in-a-ha-cluster}


{{%  insert-safekit-network-isolation-ko  %}}
 

## 클러스터에서 정전이 발생할 경우 어떤 시나리오가 가능할까요? {#what-are-the-different-scenarios-in-case-of-power-outage-in-a-cluster}

### 기본 노드 전원 장애 {#primary-node-power-outage}

정전으로 인해 기본 노드만 작동이 중단되는 경우:

  * 보조 노드에서 자동 페일오버가 발생하여 해당 노드가 단독으로 작동하게 되고 애플리케이션이 재시작됩니다.
  * 노드 1이 재부팅되면 복제된 데이터의 재동기화 후 SEDOND 상태가 됩니다.
  * 관리자는 필요에 따라 기본 및 보조 역할을 서로 바꿀 수 있습니다.


### 보조 노드 전원 장애 {#secondary-node-power-outage}

정전으로 인해 보조 노드만 작동이 중단되는 경우:

  * 장애 조치가 발생하지 않고 기본 노드는 단독 상태가 되며 애플리케이션은 노드 1에서 계속 실행됩니다.
  * 노드 2가 재부팅되면 복제된 데이터의 재동기화 후 SEDOND 상태가 됩니다.


### 일반 정전 - 사례 1 {#general-power-outage---case-1}

정전으로 인해 두 노드 모두 작동이 중단될 경우 기본 동작은 다음과 같습니다.

  * 두 노드 모두 정지 상태가 됩니다.
  * 노드 1이 재부팅될 때, 최신 데이터가 있는지 알 수 없기 때문에 ALONE 상태로 전환되지 않고 애플리케이션도 재시작되지 않습니다. 따라서 다른 노드의 재시작을 기다리는 WAIT 상태로 전환됩니다.
  * 노드 2가 재부팅되면 두 노드 모두 이전의 PRIM/SECOND 상태로 돌아갑니다.


### 일반 정전 - 사례 2 {#general-power-outage---case-2}

정전으로 인해 두 노드 모두 작동이 중단될 경우 syncdelta의 동작은 다음과 같습니다.

  * 예를 들어 설정에서 syncdelta가 10분으로 설정되어 있으면 노드의 데이터가 마지막 동기화보다 10분 늦더라도 노드 시작이 허용됩니다.
  * 노드 1이 재부팅되면, 전원 장애 발생 후 10분 이내에 재시작이 완료되었다고 가정하고 ALONE 모드로 전환된 후 애플리케이션을 재시작합니다.
  * 노드 2가 재부팅되면 복제된 데이터의 재동기화 후 두 번째 노드가 됩니다.
  * 참고: 노드 2가 먼저 재부팅되면 노드 2는 단독 상태가 되고 노드 1은 시작 시 두 번째 상태가 됩니다.



{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}