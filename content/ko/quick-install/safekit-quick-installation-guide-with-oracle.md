---
title: "Oracle 고가용성 SafeKit 포함): 장애 조치를 위해 oracle.safe 모듈을 설치하십시오."
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-with-oracle/"
description: "SafeKit 에 oracle.safe 모듈을 배포하여 Oracle 의 동기식 실시간 복제 및 Windows 와 Linux 에 대한 자동 장애 조치를 활성화하십시오. 이 가이드에서는 공유 스토리지가 없는 중요 애플리케이션을 위한 2노드 SANless 클러스터 설정 과정을 안내합니다."
category: "quick-install"
lang: "ko"
topics: "Oracle 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit / Oracle 솔루션 개요, SafeKit 및 Oracle ( oracle.safe )에 Windows / Linux 솔루션 설치, SafeKit / Oracle 솔루션 단계별 구성, SafeKit 및 mirror 솔루션 시연, 🔍 SafeKit 고가용성 내비게이션 허브"
---

# Oracle 고가용성 SafeKit 포함): 장애 조치용 oracle.safe 모듈 설치 포함) {#oracle-high-availability-with-safekit-install-the-oraclesafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ko app="Oracle" mod="oracle"  %}}
 

## SafeKit / Oracle 솔루션 개요 {#overview-of-the-safekit--oracle-solution}

솔루션은 여기에 설명되어 있습니다: ** 💡 [ 가장 간단한 Oracle 고가용성: 2노드 동기 복제 및 장애 조치 ](</solutions/oracle-high-availability-synchronous-replication-failover/>) ** .

## SafeKit / Oracle 솔루션의 Windows 및 Linux ( oracle.safe ) 및 설치 {#installation-of-the-safekit--oracle-solution-on-windows-and-linux-oraclesafe}

### 필수 조건 {#prerequisites}

  * Oracle 2개의 노드(가상 머신 또는 물리적 서버)에 설치해야 합니다.



{{%  insert-safekit-installation-package-windows-ko app="Oracle" mod="oracle"  %}}

{{%  insert-safekit-82-installation-module-windows-ko app="Oracle" mod="oracle"  %}}

{{%  insert-safekit-installation-package-linux-ko app="Oracle" mod="oracle"  %}}

{{%  insert-safekit-82-installation-module-linux-ko app="Oracle" mod="oracle"  %}}
 

## SafeKit / Oracle 솔루션 의 단계별 구성 {#step-by-step-configuration-of-the-safekit--oracle-solution}


{{%  insert-safekit-82-configuration-ko app="Oracle" mod="oracle"  %}}
 

## SafeKit mirror 솔루션 시연 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}