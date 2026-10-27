---
title: "Apache 네트워크 로드 밸런싱 및 페일오버: SafeKit apache_farm.safe 모듈 설치"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/"
description: "Windows 및 Linux 환경에서 Apache 네트워크 로드 밸런싱 및 자동 장애 조치를 위한 apache_farm.safe 모듈 배포 방법을 알아보세요. 이 가이드는 외부 하드웨어 로드 밸런서나 복잡한 구성 없이 가상 IP를 사용하여 웹 서비스 및 애플리케이션을 위한 고가용성 클러스터를 구축하는 방법을 보여줍니다."
category: "quick-install"
lang: "ko"
topics: "SafeKit 고가용성 빠른 설치 가이드(Apache용), SafeKit 고가용성 제한 사항, SafeKit/Apache 솔루션 개요, Windows 및 Linux에 SafeKit/Apache 솔루션 설치(apache_farm.safe), SafeKit/Apache 솔루션 단계별 구성, SafeKit 팜 솔루션 시연, 🔍 SafeKit 고가용성 탐색 허브"
---

# Apache 네트워크 로드 밸런싱 및 페일오버: SafeKit apache_farm.safe 모듈 설치 {#apache-network-load-balancing--failover-install-the-safekit-apache_farmsafe-module}


{{%  insert-safekit-farm-guide-ko app="Apache" mod="apache_farm"  %}}
 

## SafeKit/Apache 솔루션 개요 {#overview-of-the-safekit--apache-solution}

해결책은 여기에 설명되어 있습니다: **💡[SafeKit: 올인원 Apache 로드 밸런싱 및 고가용성 소프트웨어](</ko/solutions/apache-load-balancing-failover-2/>)**.

## Windows 및 Linux에 SafeKit/Apache 솔루션 설치(apache_farm.safe) {#installation-of-the-safekit--apache-solution-on-windows-and-linux-apache_farmsafe}

### 필수 조건 {#prerequisites}

  * Apache는 2개 이상의 노드(가상 머신 또는 물리적 서버)에 설치되어 있어야 합니다.



{{%  insert-safekit-installation-package-windows-ko app="Apache" mod="apache_farm"  %}}

{{%  insert-safekit-82-installation-module-windows-ko app="Apache" mod="apache_farm"  %}}

{{%  insert-safekit-installation-package-linux-ko app="Apache" mod="apache_farm"  %}}

{{%  insert-safekit-82-installation-module-linux-ko app="Apache" mod="apache_farm"  %}}
 

## SafeKit/Apache 솔루션의 단계별 구성 {#step-by-step-configuration-of-the-safekit--apache-solution}


{{%  insert-safekit-82-farm-configuration-ko app="Apache" mod="apache_farm"  %}}
 

## SafeKit 농장 솔루션 시연 {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ko  %}}

{{%  insert-safekit-hub-ko app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-ko  %}}