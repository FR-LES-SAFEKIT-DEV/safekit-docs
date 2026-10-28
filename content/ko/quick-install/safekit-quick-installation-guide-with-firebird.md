---
title: "Firebird 고가용성 SafeKit 포함): 장애 조치를 위해 firebird.safe 모듈을 설치하십시오."
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-with-firebird/"
description: "SafeKit 에 firebird.safe 모듈을 배포하여 Firebird 의 동기식 실시간 복제 및 Windows 와 Linux 에 대한 자동 장애 조치를 활성화하십시오. 이 가이드에서는 공유 스토리지가 없는 중요 애플리케이션을 위한 2노드 SANless 클러스터 설정 과정을 안내합니다."
category: "quick-install"
lang: "ko"
topics: "Firebird 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit / Firebird 솔루션 개요, SafeKit 및 Firebird ( firebird.safe )에 Windows / Linux 솔루션 설치, SafeKit / Firebird 솔루션 단계별 구성, SafeKit 및 mirror 솔루션 시연, 🔍 SafeKit 고가용성 내비게이션 허브"
---

# Firebird 고가용성 SafeKit 포함): 장애 조치용 firebird.safe 모듈 설치 {#firebird-high-availability-with-safekit-install-the-firebirdsafe-module-for-failover} 포함)


{{%  insert-safekit-mirror-guide-ko app="Firebird" mod="firebird"  %}}
 

## SafeKit / Firebird 솔루션 개요 {#overview-of-the-safekit--firebird-solution}

솔루션은 여기에 설명되어 있습니다: ** 💡 [ 가장 간단한 Firebird 고가용성: 2노드 동기 복제 및 장애 조치 ](</solutions/firebird-high-availability-synchronous-replication-failover/>) ** .

## SafeKit / Firebird 솔루션의 Windows 및 Linux ( firebird.safe ) 및 {#installation-of-the-safekit--firebird-solution-on-windows-and-linux-firebirdsafe} 설치

### 필수 조건 {#prerequisites}

  * Firebird 2개의 노드(가상 머신 또는 물리적 서버)에 설치해야 합니다.



{{%  insert-safekit-installation-package-windows-ko app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-82-installation-module-windows-ko app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-installation-package-linux-ko app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-82-installation-module-linux-ko app="Firebird" mod="firebird"  %}}
 

## SafeKit / Firebird 솔루션 {#step-by-step-configuration-of-the-safekit--firebird-solution} 의 단계별 구성


{{%  insert-safekit-82-configuration-ko app="Firebird" mod="firebird"  %}}
 

## SafeKit mirror 솔루션 {#demonstration-of-the-safekit-mirror-solution} 시연


{{%  insert-safekit-mirror-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}