---
title: "SafeKit 설치: IIS 부하 분산"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-with-iis-with-network-load-balancing-and-failover/"
description: "단계별 가이드: 가상 IP 기반 IIS 웹 서버의 네트워크 부하 분산 및 장애 조치를 위한 Windows용 SafeKit iis_farm.safe 모듈 설치."
category: "quick-install"
lang: "ko"
topics: "IIS 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit/IIS 솔루션 개요, Windows에 SafeKit/IIS 솔루션 설치 (iisfarm.safe), SafeKit/IIS 솔루션의 단계별 구성, SafeKit farm 솔루션 시연"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--iis-solution, installation-of-the-safekit--iis-solution-on-windows-iis_farmsafe, step-by-step-configuration-of-the-safekit--iis-solution, demonstration-of-the-safekit-farm-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 43 expressions"
image: "/wp-content/uploads/2024/03/15-monitoring-up-up.png"
schemaType: "TechArticle"
---

# SafeKit 설치: IIS 부하 분산 {#install-safekit-for-iis-load-balancing}


{{%  insert-safekit-farm-guide-ko app="IIS" mod="iis_farm"  %}}
 

## SafeKit/IIS 솔루션 개요 {#overview-of-the-safekit--iis-solution}

솔루션은 여기에서 설명합니다: **💡 [SafeKit: 올인원 IIS 로드 밸런싱 및 고가용성 소프트웨어](</ko/solutions/iis-load-balancing-failover/>)**.

## Windows에 SafeKit/IIS 솔루션 설치 (iis_farm.safe) {#installation-of-the-safekit--iis-solution-on-windows-iis_farmsafe}

### 사전 요구 사항 {#prerequisites}

  * 2개 이상의 노드(가상 머신 또는 물리적 서버)에 IIS 설치되어 있어야 합니다.



{{%  insert-safekit-installation-package-windows-ko app="IIS" mod="iis_farm"  %}}

{{%  insert-safekit-82-installation-module-windows-ko app="IIS" mod="iis_farm"  %}}
 

## SafeKit/IIS 솔루션의 단계별 구성 {#step-by-step-configuration-of-the-safekit--iis-solution}


{{%  insert-safekit-82-farm-configuration-ko app="IIS" mod="iis_farm"  %}}
 

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> 솔루션 시연 {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ko  %}}

{{%  insert-safekit-hub-ko app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-ko  %}}