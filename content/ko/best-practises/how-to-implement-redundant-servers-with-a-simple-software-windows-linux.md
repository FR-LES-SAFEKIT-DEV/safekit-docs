---
title: "소프트웨어만으로 이중화 서버 구축하기"
canonical: "https://safekit.eviden.com/ko/best-practises/how-to-implement-redundant-servers-with-a-simple-software-windows-linux/"
description: "소프트웨어만으로 이중화 서버를 구현하는 방법: SafeKit은 공유 디스크 없이 Windows 및 Linux에서 실시간 복제와 자동 장애 조치를 제공합니다."
category: "best-practises"
lang: "ko"
topics: "실시간 복제 및 장애 조치를 통해 능동/수동 이중화 서버를 구현하는 방법은 무엇입니까?, 네트워크 부하 분산 및 장애 조치를 통해 액티브/액티브 이중화 서버를 구현하는 방법은 무엇입니까?"
hashpart: "how-to-implement-activepassive-redundant-servers-with-real-time-replication-and-failover, how-to-implement-activeactive-redundant-servers-with-network-load-balancing-and-failover"
translation: "translate_md 2026-11-19.2 | glossaire 2026-11-19.30 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/02/safekit-prim-second-300.png"
schemaType: "TechArticle"
---

# 소프트웨어만으로 이중화 서버 구축하기 {#how-to-set-up-redundant-servers-with-software-only}

## 실시간 복제 및 장애 조치를 통해 능동/수동 이중화 서버를 구현하는 방법은 무엇입니까? {#how-to-implement-activepassive-redundant-servers-with-real-time-replication-and-failover}

### SafeKit mirror 클러스터 {#the-safekit-mirror-cluster}


![실시간 파일 복제 및 장애 조치 기능을 갖춘 이중화 서버](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


Mirror 클러스터에서 SafeKit 소프트웨어는 두 대의 서버에 설치됩니다. 서버는 물리적 또는 가상일 수 있습니다. 온프레미스 또는 클라우드에서 Windows 또는 Linux를 실행합니다. 기본 서버는 활성 서버입니다. 중요한 애플리케이션을 실행합니다. 보조 서버는 수동 이중화 서버입니다. 애플리케이션이 파일에서 수행하는 모든 변경 사항을 실시간으로 수신합니다. 클라이언트는 [가상 IP 주소](</ko/best-practises/how-a-virtual-ip-address-works/#virtual-ip-same-subnet-failover>)에 연결합니다. 기본 서버에 장애가 발생하면 SafeKit은 보조 서버에서 중요한 애플리케이션을 자동으로 다시 시작합니다. 이 서버가 기본 서버가 되어 가상 IP 주소를 인계받습니다. 장애가 발생한 서버가 다시 시작되면 SafeKit은 자동으로 데이터를 재동기화합니다. 그러면 이 서버는 보조 상태의 수동 이중화 서버가 됩니다.

## 네트워크 부하 분산 및 장애 조치를 통해 액티브/액티브 이중화 서버를 구현하는 방법은 무엇입니까? {#how-to-implement-activeactive-redundant-servers-with-network-load-balancing-and-failover}

### SafeKit <span class="notranslate farm-term" translate="no">farm</span> 클러스터 {#the-safekit-farm-cluster}


![네트워크 부하 분산 및 장애 조치 기능이 있는 이중화 서버](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


<span class="notranslate farm-term" translate="no">Farm</span> 클러스터에서 SafeKit 소프트웨어는 여러 개의 이중화된 서버에 설치됩니다. 서버는 온프레미스 또는 클라우드에서 Windows 또는 Linux를 실행합니다. 모든 이중화된 서버는 활성 상태입니다. 이 서버들은 동일한 중요 프런트엔드 애플리케이션을 실행합니다. 클라이언트는 [가상 IP 주소](</ko/best-practises/how-a-virtual-ip-address-works/#vip-load-balancing-same-subnet>)에 연결합니다. TCP 세션은 모든 이중화된 서버 간에 부하 분산됩니다. 서버 중 하나가 고장 나면 SafeKit은 나머지 활성 서버 간의 TCP 세션 부하 분산을 자동으로 재구성합니다. 고장 난 서버가 다시 시작되면 SafeKit은 이를 활성 이중화 서버로 자동으로 재통합합니다. 그러면 이 서버는 새로운 TCP 세션을 받게 됩니다.


{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}