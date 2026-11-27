---
title: "HA 클러스터에서 정전 및 네트워크 격리 처리"
canonical: "https://safekit.eviden.com/ko/best-practises/power-outage-and-network-isolation-in-a-cluster/"
description: "고가용성 클러스터의 정전 및 네트워크 격리 대처 방법: SafeKit 스플릿 브레인 체커와 자동 재동기화가 데이터를 보호합니다."
category: "best-practises"
lang: "ko"
topics: "클러스터에 정전이 발생할 경우 발생할 수 있는 다양한 시나리오는 무엇인가요?"
translation: "translate_md 2026-11-20.2 | glossaire 2026-11-20.6 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/02/quorum-with-remote-sites.png"
schemaType: "TechArticle"
---

# HA 클러스터에서 정전 및 네트워크 격리 처리 {#handling-power-outages-and-network-isolation-in-a-ha-cluster}


{{%  insert-safekit-network-isolation-ko  %}}
 

## 클러스터에 정전이 발생할 경우 발생할 수 있는 다양한 시나리오는 무엇인가요? {#what-are-the-different-scenarios-in-case-of-power-outage-in-a-cluster}

다음 시나리오에서 노드 1은 초기 기본 노드입니다. 노드 2는 초기 보조 노드입니다.

### 주 노드 정전 {#primary-node-power-outage}

정전으로 기본 노드만 중단된 경우:

  * SafeKit은 자동으로 보조 노드로 장애 조치를 수행합니다. 노드 2는 ALONE이 되고 애플리케이션을 다시 시작합니다.
  * 노드 1이 재부팅되면 복제된 데이터를 재동기화합니다. 그런 다음 SECOND가 됩니다.
  * 필요한 경우 관리자가 기본 역할과 보조 역할을 서로 바꿀 수 있습니다.


### 보조 노드 정전 {#secondary-node-power-outage}

정전으로 인해 보조 노드만 중단되는 경우:

  * 장애 조치가 발생하지 않습니다. 노드 1이 ALONE 상태로 작동합니다. 애플리케이션은 노드 1에서 계속 실행됩니다.
  * 노드 2가 재부팅되면 복제된 데이터를 재동기화합니다. 그런 다음 SECOND가 됩니다.


### 두 노드 모두 정전 - 사례 1 {#general-power-outage---case-1}

정전으로 인해 두 노드가 모두 중단되면 기본 동작은 다음과 같습니다:

  * 두 노드 모두 STOP 상태로 전환됩니다.
  * 노드 1이 재부팅되면 ALONE 상태로 전환되지 않습니다. 애플리케이션을 다시 시작하지도 않습니다. 데이터가 최신 상태인지 알 수 없습니다. 따라서 WAIT 상태로 전환되어 다른 노드가 다시 시작될 때까지 기다립니다.
  * 노드 2가 재부팅되면 두 노드 모두 이전 상태인 PRIM과 SECOND로 돌아갑니다.


### 두 노드 모두 정전 - 사례 2 {#general-power-outage---case-2}

정전으로 인해 두 노드가 모두 중단되면 `syncdelta` 매개변수를 사용했을 때의 동작은 다음과 같습니다:

  * 이 예에서 `syncdelta`는 구성에서 10분으로 설정됩니다. 그러면 노드는 데이터가 마지막 동기화보다 최대 10분 뒤처져 있더라도 시작할 수 있습니다.
  * 노드 1이 정전 후 10분 이내에 재부팅되면 ALONE 상태로 전환되고 애플리케이션을 다시 시작합니다.
  * 노드 2가 재부팅되면 복제된 데이터를 재동기화합니다. 그런 다음 SECOND가 됩니다.
  * 참고: 노드 2가 먼저 재부팅되면 ALONE 상태가 됩니다. 그런 다음 노드 1이 시작되면 SECOND 상태가 됩니다.



{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}