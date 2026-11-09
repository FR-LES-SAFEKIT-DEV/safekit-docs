---
title: "SafeKit을 사용한 MySQL 고가용성: 장애 조치를 위한 mysql.safe 모듈 설치"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-with-mysql/"
description: "SafeKit용 mysql.safe 모듈을 배포하여 Windows 및 Linux에서 MySQL의 동기식 실시간 복제 및 자동 장애 조치를 활성화하십시오. 이 가이드는 공유 스토리지 없이 중요한 애플리케이션을 위한 2노드 SANless 클러스터를 설정하는 과정을 안내합니다."
category: "quick-install"
lang: "ko"
topics: "MySQL 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit/MySQL 솔루션 개요, Windows 및 Linux에 SafeKit/MySQL 솔루션 설치 (mysql.safe), SafeKit/MySQL 서버 솔루션의 단계별 구성, SafeKit mirror 솔루션 시연, 🔍 SafeKit 살펴보기"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
---

# SafeKit을 사용한 MySQL 고가용성: 장애 조치를 위한 mysql.safe 모듈 설치 {#mysql-high-availability-with-safekit-install-the-mysqlsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-ko app="MySQL" mod="mysql"  %}}
 

## SafeKit/MySQL 솔루션 개요 {#overview-of-the-safekit--mysql-solution}

솔루션은 여기에서 설명합니다: **💡 [가장 간단한 MySQL 고가용성: 2노드 동기 복제 및 장애 조치](</ko/solutions/mysql-high-availability-synchronous-replication-failover/>)**.

## Windows 및 Linux에 SafeKit/MySQL 솔루션 설치 (mysql.safe) {#installation-of-the-safekit--mysql-solution-on-windows-and-linux-mysqlsafe}

### 사전 요구 사항 {#prerequisites}

  * 2개의 노드(가상 머신 또는 물리적 서버)에 MySQL 설치되어 있어야 합니다.



{{%  insert-safekit-installation-package-windows-ko app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-windows-ko app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-installation-package-linux-ko app="MySQL" mod="mysql"  %}}

{{%  insert-safekit-82-installation-module-linux-ko app="MySQL" mod="mysql"  %}}
 

## SafeKit/MySQL 서버 솔루션의 단계별 구성 {#step-by-step-configuration-of-the-safekit--mysql-server-solution}


{{%  insert-safekit-82-configuration-ko app="MySQL" mod="mysql"  %}}
 

## SafeKit mirror 솔루션 시연 {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}