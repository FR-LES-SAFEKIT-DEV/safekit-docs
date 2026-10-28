---
title: "SafeKit을 사용한 KVM 고가용성: 장애 조치용 kvm.safe 모듈 설치"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-with-kvm/"
description: "SafeKit을 사용하여 활성/활성 KVM 클러스터에 대해 kvm.safe를 구성하는 방법에 대해 알아보십시오. 2노드 공유 없음 아키텍처로 VM 수준에서 고가용성을 달성합니다. SAN 또는 공유 스토리지의 비용 없이 자동 페일오버를 위해 여러 VM을 노드 간에 동기식으로 복제합니다."
category: "quick-install"
lang: "ko"
topics: "KVM용 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit/KVM 솔루션 개요, Linux에 SafeKit/KVM 솔루션 설치 (kvm.safe), SafeKit/KVM 솔루션의 단계별 구성, VM 수준 고가용성 솔루션 시연, 🔍 SafeKit 고가용성 탐색 허브"
---

# SafeKit를 통한 KVM 고가용성: 장애 조치용 kvm.safe 모듈 설치 {#kvm-high-availability-with-safekit-install-the-kvmsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ko app="KVM" mod="kvm"  %}}
 

## SafeKit / KVM 솔루션 개요 {#overview-of-the-safekit--kvm-solution}

해결 방법은 다음과 같습니다: **💡[공유 스토리지 없이 간편하게 구현하는 Linux KVM 고가용성](</ko/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)**

## Linux에 SafeKit / KVM 솔루션 설치 (kvm.safe) {#installation-of-the-safekit--kvm-solution-on-linux-kvmsafe}

### 전제 조건 {#prerequisites}

  * KVM이 두 Linux 노드에 설치되어 있습니다.
  * 하나 이상의 가상 머신 내에 설치된 중요한 애플리케이션.
  * KVM 호스트당 최대 32개의 가상 머신을 지원합니다.
  * 총 복제 데이터는 몇 테라바이트로 제한됩니다. 이를 초과하면 재동기화 시간이 상당히 길어집니다.
  * 노드 간 최소 1Gb/s 상호 연결(더 빠른 재동기화를 위해 10Gb/s 권장)
  * IP 장애 조치를 사용하려면 두 노드가 동일한 LAN 또는 확장 LAN(L2)에 있어야 합니다. 라우팅된 L3 네트워크는 지원되지 않습니다(🛠️ [클라우드 로드 밸런서](</ko/resources/safekit-user-guide-82/#Cloud>) 사용 시 제외).



{{%  insert-safekit-installation-package-linux-ko app="KVM" mod="kvm"  %}}

{{%  insert-safekit-82-installation-module-linux-ko app="KVM" mod="kvm"  %}}
 

## SafeKit/KVM 솔루션의 단계별 구성 {#step-by-step-configuration-of-the-safekit--kvm-solution}


{{%  insert-safekit-82-kvm-configuration-ko app="KVM" mod="kvm"  %}}
 

## VM 레벨 고가용성 솔루션 시연 {#demonstration-of-a-vm-level-high-availability-solution}


{{%  insert-safekit-hyperv-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}