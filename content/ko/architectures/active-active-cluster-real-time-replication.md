---
title: "실시간 복제 및 상호 장애 조치 기능을 갖춘 액티브-액티브 클러스터링 소프트웨어"
canonical: "https://safekit.eviden.com/ko/architectures/active-active-cluster-real-time-replication/"
description: "SafeKit 액티브-액티브 클러스터링으로 리소스 활용도를 극대화하세요. 실시간 동기 복제와 여러 개의 mirror 모듈을 사용하여 두 서버 간의 상호 장애 조치를 구현할 수 있습니다. SAN 없이도 Windows 및 Linux 모듈에서 데이터 손실 제로(RPO=0) 및 자동 복구를 보장합니다. 무료 평가판을 다운로드하세요."
category: "architectures"
lang: "ko"
topics: "실시간 복제를 사용하는 액티브 클러스터는 어떻게 작동하나요?, 🔍 SafeKit 고가용성 내비게이션 허브"
---

# 실시간 복제 및 상호 장애 조치 기능을 갖춘 액티브-액티브 클러스터링 소프트웨어 {#active-active-clustering-software-with-real-time-replication--mutual-failover}

## 실시간 복제를 사용하는 액티브 클러스터는 어떻게 작동하나요? {#how-the-active-active-cluster-with-real-time-replication-works}

### 실시간 복제 기능이 있는 액티브-액티브 클러스터 {#active--active-cluster-with-real-time-replication}

애플리케이션은 상호 장애 조치 기능을 갖춘 두 서버에서 실행됩니다. 각 서버는 다른 서버의 백업 역할을 하며, 각 애플리케이션은 자체 복제 파일 디렉터리에서 작동합니다.


![ SafeKit 실시간 복제 기능이 있는 액티브 클러스터 ](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


액티브-액티브 클러스터에서 서버 하나에 장애가 발생하면 모든 애플리케이션이 동일한 서버에서 실행됩니다. 장애가 발생한 서버가 재시작되면 애플리케이션은 기본 서버로 돌아가 실행됩니다.

### 어떻게 작동하나요? {#how-it-works}

SafeKit 액티브 클러스터는 실시간 복제 기능을 갖춘 두 개의 mirror 모듈을 배포하여 간단하게 구성할 수 있습니다. 각 mirror 모듈에는 가상 IP 주소, 실시간 복제 디렉터리 및 재시작 스크립트에 대한 자체 구성이 포함되어 있습니다.

다음 사항에 유의하십시오:

  * 애플리케이션 장애 조치를 위해서는 Appli1과 Appli2 두 애플리케이션이 각 서버에 설치되어 있어야 합니다.
  * 이 아키텍처는 2개의 애플리케이션으로 축소되지 않습니다. 최대 25개의 모듈을 포함하여 N개의 애플리케이션 모듈을 2개의 서버에 배포할 수 있습니다.
  * 각 mirror 모듈은 고유한 가상 IP 주소, 자체 복제 파일 디렉터리 및 자체 복구 스크립트를 갖게 됩니다.


### 활성 클러스터의 예 {#example-of-an-active-active-cluster}

💡 [ Hyper-V ](</ko/solutions/hyper-v-replication-automatic-failover-load-balancing/>) 또는 💡 [ KVM ](</ko/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>) 솔루션은 VM 복제, 자동 장애 조치 및 로드 밸런싱 기능을 제공하며, 두 개의 물리적 서버 간에 N개의 가상 머신을 복제하는 N개의 mirror 모듈로 구성된 액티브-액티브 클러스터의 예입니다.

이 구성에서 mirror 모듈은 전체 가상 머신을 복제하고 오류 발생 시 가상 머신을 다시 시작합니다. 

해당 모듈에는 가상 IP 주소가 없습니다. 서버에서 VM을 재시작하면 VM의 물리적 IP 주소가 자동으로 페일오버되기 때문입니다. 

이 아키텍처에서는 핵심 애플리케이션이 가상 머신 내부에 설치됩니다.


{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}