---
title: "실시간 복제 및 상호 장애 조치를 지원하는 액티브-액티브 클러스터링 소프트웨어"
canonical: "https://safekit.eviden.com/ko/architectures/active-active-cluster-real-time-replication/"
description: "SafeKit 액티브-액티브 클러스터링으로 리소스 활용도를 극대화하세요. 실시간 동기 복제 및 다중 mirror 모듈을 사용하여 두 서버 간에 상호 장애 조치를 배포하세요. SAN 없이 Windows 및 Linux에서 데이터 손실 제로(RPO = 0) 및 자동 복구를 보장합니다. 무료 평가판을 다운로드하세요."
category: "architectures"
lang: "ko"
topics: "실시간 복제를 사용하는 액티브-액티브 클러스터는 어떻게 작동하나요?, 🔍 SafeKit 살펴보기"
translation: "translate_md 2026-11-21.1 | glossaire 2026-11-21.9 | Translation LLM | 52 expressions"
---

# 실시간 복제 및 상호 장애 조치를 지원하는 액티브-액티브 클러스터링 소프트웨어 {#active-active-clustering-software-with-real-time-replication--mutual-failover}

## 실시간 복제를 사용하는 액티브-액티브 클러스터는 어떻게 작동하나요? {#how-the-active-active-cluster-with-real-time-replication-works}

### 실시간 복제를 통한 액티브-액티브 클러스터 {#active--active-cluster-with-real-time-replication}

두 서버는 애플리케이션을 실행하고 서로 백업합니다. 이를 상호 장애 조치라고 합니다. 즉, 각 서버는 다른 서버의 백업입니다. 각 애플리케이션은 자체 복제된 파일 디렉토리를 사용합니다.


![실시간 복제를 지원하는 SafeKit 능동-능동 클러스터](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


액티브-액티브 클러스터에서 한 서버에 장애가 발생하면 모든 애플리케이션이 나머지 서버에서 실행됩니다. 장애가 발생한 서버가 다시 시작되면 각 애플리케이션은 기본 서버로 돌아갑니다.

### 어떻게 작동하나요? {#how-it-works}

SafeKit으로 액티브-액티브 클러스터를 구성하려면 실시간 복제 기능이 있는 두 개의 mirror 모듈을 배포하기만 하면 됩니다. 각 mirror 모듈에는 가상 IP 주소, 실시간 복제 디렉터리, 재시작 스크립트 등 고유한 구성이 있습니다.

참고:

  * 애플리케이션 장애 조치를 위해 두 애플리케이션(Appli1 및 Appli2)을 각 서버에 설치해야 합니다.
  * 이 아키텍처는 두 개의 애플리케이션으로 제한되지 않습니다. 동일한 두 서버에 최대 25개의 애플리케이션 모듈을 배포할 수 있습니다.
  * 각 mirror 모듈은 고유한 가상 IP 주소, 고유한 복제 파일 디렉터리 및 고유한 복구 스크립트를 갖습니다.


### 액티브-액티브 클러스터의 예시 {#example-of-an-active-active-cluster}

💡 [Hyper-V](</ko/solutions/hyper-v-replication-automatic-failover-load-balancing/>) 또는 💡 [KVM](</ko/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>) 솔루션은 액티브-액티브 클러스터의 예시입니다. 이 솔루션은 가상 머신의 복제, 자동 장애 조치 및 부하 분산을 제공합니다. 이 클러스터에서 N개의 mirror 모듈은 두 개의 물리적 서버 간에 N개의 가상 머신을 복제합니다.

이 구성에서 각 mirror 모듈은 전체 가상 머신을 복제하고 장애가 발생하면 이를 다시 시작합니다.

이 유형의 모듈에는 가상 IP 주소가 필요하지 않습니다. 가상 머신이 다른 서버에서 다시 시작되면 자체 IP 주소가 자동으로 함께 이동합니다.

이 아키텍처에서 중요한 애플리케이션은 가상 머신 내에 설치됩니다.


{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}