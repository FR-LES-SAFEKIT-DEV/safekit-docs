---
title: "SafeKit을 통한 Hyper-V 고가용성: 장애 조치를 위한 hyperv.safe 모듈 설치"
canonical: https://safekit.eviden.com/ko/ko/quick-install/safekit-quick-installation-guide-with-hyper-v/
description: SafeKit을 사용하여 활성/활성 Hyper-V 클러스터에 대해 hyperv.safe를 구성하는 방법을 알아보세요.
  2노드 비공유 아키텍처를 통해 VM 수준에서 고가용성을 달성합니다. SAN 또는 공유 스토리지 비용 없이 자동 장애 조치를 위해 여러 노드에
  걸쳐 여러 VM을 동기식으로 복제합니다.
category: quick-install
lang: ko
topics: Hyper-V용 고가용성 빠른 설치 안내서, SafeKit 고가용성 제한 사항, SafeKit/Hyper-V 솔루션 개요,
  Windows에 SafeKit/Hyper-V 솔루션 설치(hyperv.safe), SafeKit/Hyper-V 솔루션의 단계별 구성,
  SafeKit/Hyper-V 솔루션 시연, 🔍 SafeKit 고가용성 탐색 허브
---

# Hyper-V SafeKit를 통한 고가용성: 장애 조치를 위한 hyperv.safe 모듈 설치 {#hyper-v-high-availability-with-safekit-install-the-hypervsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ko app="Hyper-V" mod="hyperv"  %}}
 

## SafeKit/Hyper-V 솔루션 개요 {#overview-of-the-safekit--hyper-v-solution}

솔루션은 여기에 설명되어 있습니다: **💡[SAN(공유 스토리지 없는 단순 Hyper-V 고가용성)](</ko/solutions/hyper-v-replication-automatic-failover-load-balancing/>)**

## 설치 SafeKit / Hyper-V 솔루션 Windows (하이퍼브.안전) {#installation-of-the-safekit--hyper-v-solution-on-windows-hypervsafe}

### 전제 조건 {#prerequisites}

  * Hyper-V 2에 설치된 역할 Windows 노드(모든 노드에 무료로 내장됨 Windows 다음을 포함한 버전 Windows PC용).
  * 하나 이상의 가상 머신 내에 설치된 중요한 애플리케이션.
  * Hyper-V 호스트당 최대 32개의 가상 머신.
  * 총 복제 데이터는 몇 테라바이트로 제한됩니다. 이를 초과하면 재동기화 시간이 상당히 길어집니다.
  * 노드 간 최소 1Gb/s 상호 연결(더 빠른 재동기화를 위해 10Gb/s 권장)
  * IP 장애 조치에는 동일한 LAN 또는 확장된 LAN(L2)에 두 노드가 모두 필요합니다. 라우팅된 L3 네트워크는 지원되지 않습니다(🛠️ [클라우드 로드 밸런서](</resources/safekit-user-guide-82/#Cloud>) 제외).



{{%  insert-safekit-siemens-license-ko  %}}

{{%  insert-safekit-installation-package-windows-ko app="Hyper-V" mod="hyperv"  %}}

{{%  insert-safekit-82-installation-module-windows-ko app="Hyper-V" mod="hyperv"  %}}
 

## SafeKit / Hyper-V 솔루션의 단계별 구성 {#step-by-step-configuration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-82-hyper-v-configuration-ko app="Hyper-V" mod="hyperv"  %}}
 

## SafeKit / Hyper-V 솔루션 시연 {#demonstration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-hyperv-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}