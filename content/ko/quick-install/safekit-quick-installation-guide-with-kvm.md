---
title: "SafeKit 설치: KVM 고가용성 (kvm.safe)"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-with-kvm/"
description: "단계별 가이드: Linux에서 KVM 가상 머신의 복제 및 장애 조치로 VM 수준 고가용성을 제공하는 SafeKit kvm.safe 모듈 설치."
category: "quick-install"
lang: "ko"
topics: "KVM 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit/KVM 솔루션 개요, Linux에 SafeKit/KVM 솔루션 설치 (kvm.safe), SafeKit/KVM 솔루션 단계별 구성, VM 수준의 고가용성 솔루션 시연"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--kvm-solution, installation-of-the-safekit--kvm-solution-on-linux-kvmsafe, step-by-step-configuration-of-the-safekit--kvm-solution, demonstration-of-a-vm-level-high-availability-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# SafeKit 설치: KVM 고가용성 (kvm.safe) {#install-safekit-for-kvm-high-availability-kvmsafe}


{{%  insert-safekit-mirror-guide-ko app="KVM" mod="kvm"  %}}
 

## SafeKit/KVM 솔루션 개요 {#overview-of-the-safekit--kvm-solution}

솔루션은 여기에서 설명합니다: **💡 [공유 스토리지 없이 간단하게 Linux KVM 고가용성 구현하기](</ko/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)**

## Linux에 SafeKit/KVM 솔루션 설치 (kvm.safe) {#installation-of-the-safekit--kvm-solution-on-linux-kvmsafe}

### 사전 요구 사항 {#prerequisites}

  * 2개의 Linux 노드에 KVM 설치되어 있습니다.
  * 하나 이상의 가상 머신에 설치된 중요 애플리케이션.
  * KVM 호스트당 최대 32개의 가상 머신.
  * 복제된 총 데이터는 몇 테라바이트로 제한됩니다. 이보다 많아지면 재동기화 시간이 상당히 길어집니다.
  * 노드 간 최소 1Gb/s의 상호 연결(더 빠른 재동기화를 위해 10Gb/s 권장).
  * IP 장애 조치에는 동일한 LAN 또는 확장 LAN (L2)의 두 노드가 모두 필요합니다. 라우팅된 L3 네트워크는 지원되지 않습니다(🛠️ [클라우드 로드 밸런서](</ko/resources/safekit-user-guide-82/#Cloud>) 제외).



{{%  insert-safekit-installation-package-linux-ko app="KVM" mod="kvm"  %}}

{{%  insert-safekit-82-installation-module-linux-ko app="KVM" mod="kvm"  %}}
 

## SafeKit/KVM 솔루션 단계별 구성 {#step-by-step-configuration-of-the-safekit--kvm-solution}


{{%  insert-safekit-82-kvm-configuration-ko app="KVM" mod="kvm"  %}}
 

## VM 수준의 고가용성 솔루션 시연 {#demonstration-of-a-vm-level-high-availability-solution}


{{%  insert-safekit-hyperv-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}