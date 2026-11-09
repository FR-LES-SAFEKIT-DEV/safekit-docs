---
title: "SafeKit을 사용한 MariaDB 고가용성: 장애 조치를 위한 mysql.safe 모듈 설치"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-with-mariadb/"
description: "SafeKit용 mysql.safe 모듈을 배포하여 Windows 및 Linux에서 MariaDB의 동기식 실시간 복제 및 자동 장애 조치를 활성화하세요. 이 가이드는 공유 스토리지 없이 중요한 애플리케이션을 위한 2노드 SANless 클러스터를 설정하는 과정을 안내합니다."
category: "quick-install"
lang: "ko"
topics: "MariaDB 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit/MariaDB 솔루션 개요, Windows 및 Linux에 SafeKit/MariaDB 솔루션 설치 (mysql.safe), SafeKit/MariaDB 솔루션의 단계별 구성, SafeKit mirror 솔루션 시연, 🔍 SafeKit 살펴보기"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# SafeKit을 사용한 MariaDB 고가용성: 장애 조치를 위한 mysql.safe 모듈 설치 {#mariadb-high-availability-with-safekit-install-the-mysqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ko app="MariaDB" mod="mysql"  %}}
 

## SafeKit/MariaDB 솔루션 개요 {#overview-of-the-safekit--mariadb-solution}

해결책은 여기에 설명되어 있습니다: **💡 [가장 간단한 MariaDB 고가용성: 2노드 동기 복제 및 장애 조치](</ko/solutions/mariadb-simplest-high-availability-cluster-synchronous-replication-failover-redundant-servers/>)**.

## Windows 및 Linux에 SafeKit/MariaDB 솔루션 설치 (mysql.safe) {#installation-of-the-safekit--mariadb-solution-on-windows-and-linux-mysqlsafe}

### 사전 요구 사항 {#prerequisites}

  * 2개의 노드(가상 머신 또는 물리적 서버)에 MariaDB 설치해야 합니다.



{{%  insert-safekit-installation-package-windows-ko app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-windows-ko app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-installation-package-linux-ko app="MariaDB" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-linux-ko app="MariaDB" mod="mysql"  %}}
 

## SafeKit/MariaDB 솔루션의 단계별 구성 {#step-by-step-configuration-of-the-safekit--mariadb-solution}


{{%  insert-safekit-82-configuration-ko app="MariaDB" mod="mysql"  %}}
 

## SafeKit mirror 솔루션 시연 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}