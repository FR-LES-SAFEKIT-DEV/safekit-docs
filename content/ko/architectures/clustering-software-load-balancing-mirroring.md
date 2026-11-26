---
title: "로드 밸런싱 및 미러링을 갖춘 클러스터링 소프트웨어: 고가용성 및 확장성"
canonical: "https://safekit.eviden.com/ko/architectures/clustering-software-load-balancing-mirroring/"
description: "SafeKit farm 및 mirror 모듈 결합: Windows 및 Linux에서 부하 분산은 프런트엔드를 확장하고 동기 복제는 백엔드 데이터를 보호합니다."
category: "architectures"
lang: "ko"
topics: "SafeKit 클러스터링 소프트웨어로 핵심 웹 및 데이터베이스 애플리케이션의 고가용성 및 확장성 확보, 🔍 SafeKit 살펴보기"
translation: "translate_md 2026-11-21.2 | glossaire 2026-11-21.11 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png"
schemaType: "TechArticle"
---

# 로드 밸런싱 및 미러링을 갖춘 클러스터링 소프트웨어: 고가용성 및 확장성 {#clustering-software-for-farms-and-mirrors-high-availability--load-balancing}

## SafeKit 클러스터링 소프트웨어로 핵심 웹 및 데이터베이스 애플리케이션의 고가용성 및 확장성 확보 {#high-availability-and-scalability-of-critical-web-and-database-applications-with-the-safekit-clustering-software}

### 부하 분산, 미러링 및 장애 조치 {#load-balancing-mirroring-and-failover}


![로드 밸런싱 및 미러링을 지원하는 SafeKit 클러스터링](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


### SafeKit 클러스터링 소프트웨어 예시 {#example-with-the-safekit-clustering-software}

예를 들어, SafeKit 클러스터링 소프트웨어를 사용하면 IIS에 대한 로드 밸런싱과 Microsoft SQL Server에 대한 미러링을 구현할 수 있습니다.

이를 위해 IIS용 <span class="notranslate farm-term" translate="no">farm</span> 모듈과 Microsoft SQL Server용 mirror 모듈을 배포합니다. 각 모듈은 자체 가상 IP 주소와 자체 다시 시작 스크립트로 구성됩니다.

두 모듈은 IIS와 Microsoft SQL Server 모두 실행되는 두 서버의 단일 클러스터에 배포할 수 있습니다. 또는 두 모듈을 서로 다른 서버가 있는 두 개의 개별 클러스터에 배포할 수도 있습니다.

SafeKit 클러스터링 소프트웨어를 사용하면 동일한 서버 또는 다른 서버에 배포하는 방식이 정확히 동일합니다.

### 고가용성 및 확장성 솔루션 {#high-availability-and-scalability-solution}

SafeKit 클러스터링 소프트웨어는 중요한 웹 및 데이터베이스 애플리케이션을 위한 간단한 고가용성 및 확장성 솔루션을 제공합니다.

네트워크 부하 분산, 실시간 데이터 미러링 및 애플리케이션 장애 조치가 단일 제품에서 일관되게 관리됩니다.

하드웨어 클러스터링과 달리 SafeKit 클러스터링 소프트웨어는 공유 디스크, 복제된 SAN, 하드웨어 로드 밸런서 또는 운영 체제나 데이터베이스의 엔터프라이즈 에디션을 필요로 하지 않습니다.


{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}