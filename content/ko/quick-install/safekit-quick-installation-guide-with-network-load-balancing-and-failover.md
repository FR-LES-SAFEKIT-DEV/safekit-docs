---
title: "Apache 네트워크 부하 분산 및 장애 조치: SafeKit apache_farm.safe 모듈 설치"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/"
description: "단계별 가이드: Apache 웹 서버의 네트워크 부하 분산 및 장애 조치를 위한 Windows 또는 Linux용 SafeKit apache_farm.safe 모듈 설치."
category: "quick-install"
lang: "ko"
topics: "Apache 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit/Apache 솔루션 개요, Windows 및 Linux에 SafeKit/Apache 솔루션 설치 (apache_farm.safe), SafeKit/Apache 솔루션 단계별 구성, SafeKit farm 솔루션 시연, 🔍 SafeKit 살펴보기"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
image: "/wp-content/uploads/2024/03/15-monitoring-up-up.png"
schemaType: "TechArticle"
---

# Apache 네트워크 부하 분산 및 장애 조치: SafeKit apache_farm.safe 모듈 설치 {#apache-network-load-balancing--failover-install-the-safekit-apache_farmsafe-module}


{{%  insert-safekit-farm-guide-ko app="Apache" mod="apache_farm"  %}}
 

## SafeKit/Apache 솔루션 개요 {#overview-of-the-safekit--apache-solution}

솔루션은 다음에서 설명합니다. **💡 [SafeKit: 올인원 Apache 로드 밸런싱 및 고가용성 소프트웨어](</ko/solutions/apache-load-balancing-failover-2/>)**.

## Windows 및 Linux에 SafeKit/Apache 솔루션 설치 (apache_farm.safe) {#installation-of-the-safekit--apache-solution-on-windows-and-linux-apache_farmsafe}

### 사전 요구 사항 {#prerequisites}

  * 2개 이상의 노드(가상 머신 또는 물리적 서버)에 Apache 설치되어 있어야 합니다.



{{%  insert-safekit-installation-package-windows-ko app="Apache" mod="apache_farm"  %}}

{{%  insert-safekit-82-installation-module-windows-ko app="Apache" mod="apache_farm"  %}}

{{%  insert-safekit-installation-package-linux-ko app="Apache" mod="apache_farm"  %}}

{{%  insert-safekit-82-installation-module-linux-ko app="Apache" mod="apache_farm"  %}}
 

## SafeKit/Apache 솔루션 단계별 구성 {#step-by-step-configuration-of-the-safekit--apache-solution}


{{%  insert-safekit-82-farm-configuration-ko app="Apache" mod="apache_farm"  %}}
 

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> 솔루션 시연 {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ko  %}}

{{%  insert-safekit-hub-ko app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-ko  %}}