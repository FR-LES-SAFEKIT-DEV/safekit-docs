---
title: "SafeKit를 사용한 Linux 고가용성: 페일오버를 위한 mirror.safe 모듈 설치"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover/"
description: "SafeKit mirror.safe 모듈을 배포하여 Linux에서 동기식 실시간 복제와 자동 페일오버를 구현합니다. 이 가이드는 공유 스토리지 없이 중요한 Linux 애플리케이션을 위한 2노드 SANless 클러스터를 설정하는 방법을 안내합니다."
category: "quick-install"
lang: "ko"
topics: "Linux용 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit / Linux 솔루션 개요, SafeKit / Linux 솔루션 설치 (mirror.safe), SafeKit / Linux 솔루션 단계별 구성, SafeKit mirror 솔루션 데모, 🔍 SafeKit 고가용성 탐색 허브"
---

# SafeKit를 사용한 Linux 고가용성: 페일오버를 위한 mirror.safe 모듈 설치 {#linux-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ko app="Linux" mod="mirror"  %}}
 

## SafeKit / Linux 솔루션 개요 {#overview-of-the-safekit--linux-solution}

솔루션은 여기에서 설명합니다: **💡[가장 간단한 Linux 고가용성: 2노드 동기식 복제 및 페일오버](</solutions/linux-high-availability-software-synchronous-replication-failover/>)**.

## SafeKit / Linux 솔루션 설치 (mirror.safe) {#installation-of-the-safekit--linux-solution-mirrorsafe}

### 사전 요구 사항 {#prerequisites}

  * SafeKit에서 다시 시작하려는 애플리케이션이 2개 노드(가상 머신 또는 물리 서버)에 설치되어 있어야 합니다.



{{%  insert-safekit-installation-package-linux-ko app="" mod="mirror"  %}}
 

참고: 구성하게 될 범용 **mirror.safe** 모듈은 패키지에 포함되어 제공됩니다.

## SafeKit / Linux 솔루션 단계별 구성 {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-configuration-ko app="Linux" mod="mirror"  %}}
 

## SafeKit mirror 솔루션 데모 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ko  %}}

{{%  insert-safekit-hub-ko app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-ko  %}}
