---
title: "간단한 고가용성 소프트웨어를 사용하여 이중화 서버를 구현하는 방법"
canonical: "https://safekit.eviden.com/ko/best-practises/how-to-implement-redundant-servers-with-a-simple-software-windows-linux/"
description: "간단한 소프트웨어만으로 이중화 서버를 구현하는 방법을 알아보세요. SafeKit Windows 및 Linux 에 SAN이 없는 아키텍처를 제안하여 공유 디스크나 전문 IT 기술 없이도 실시간 데이터 복제 및 자동 장애 조치를 제공합니다."
category: "best-practises"
lang: "ko"
topics: "실시간 복제 및 페일오버를 지원하는 액티브/패시브 이중화 서버를 구현하는 방법은 무엇인가요?, 네트워크 로드 밸런싱 및 페일오버를 지원하는 액티브/액티브 이중화 서버를 구현하는 방법은 무엇인가요?, 🔍 SafeKit 고가용성 내비게이션 허브"
---

# 간단한 HA 소프트웨어로 이중화 서버를 구현하는 방법 {#how-to-implement-redundant-servers-with-simple-ha-software}

## 실시간 복제 및 장애 조치를 지원하는 능동/수동 이중화 서버를 구현하는 방법은 무엇입니까? {#how-to-implement-activepassive-redundant-servers-with-real-time-replication-and-failover}

### SafeKit mirror 클러스터 {#the-safekit-mirror-cluster}


![ 실시간 파일 복제 및 장애 조치 기능을 갖춘 이중화 서버 ](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


mirror 클러스터에서 SafeKit 소프트웨어는 Windows 또는 Linux 실행하는 두 대의 물리적 또는 가상 서버(온프레미스 또는 클라우드)에 설치됩니다. 기본 서버는 활성 서버로서 중요 애플리케이션을 실행합니다. 보조 서버는 수동 이중화 서버로서 애플리케이션이 파일 내에서 수행하는 모든 변경 사항을 실시간으로 수신합니다. 클라이언트는 [ 가상 IP 주소인 ](</ko/best-practises/how-a-virtual-ip-address-works/#virtual-ip-same-subnet-failover>) 에 연결됩니다. 기본 서버가 다운되면 SafeKit 수동 이중화 서버에서 중요 애플리케이션을 자동으로 재시작하고, 이 서버가 기본 서버가 되어 가상 IP 주소를 변경합니다. 장애가 발생한 서버가 재시작되면 자동으로 동기화되어 보조 서버 역할을 하는 수동 이중화 서버가 됩니다.

## 네트워크 로드 밸런싱 및 페일오버를 갖춘 액티브/액티브 이중화 서버를 구현하는 방법은 무엇입니까? {#how-to-implement-activeactive-redundant-servers-with-network-load-balancing-and-failover}

### SafeKit `farm` 클러스터 {#the-safekit-farm-cluster}


![ 네트워크 로드 밸런싱 및 장애 조치 기능을 갖춘 이중화 서버 ](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


`farm` 클러스터에서 SafeKit 소프트웨어는 Windows 또는 Linux 실행하는 이중화 서버(온프레미스 또는 클라우드)에 설치됩니다. 모든 이중화 서버는 활성 상태이며 동일한 핵심 프런트엔드 애플리케이션을 실행합니다. 클라이언트는 [ 가상 IP 주소인 ](</ko/best-practises/how-a-virtual-ip-address-works/#vip-load-balancing-same-subnet>) 에 연결됩니다. TCP 세션은 모든 이중화 서버 간에 로드 밸런싱됩니다. 서버 중 하나가 다운되면 SafeKit 나머지 활성 서버 간에 TCP 세션의 로드 밸런싱을 자동으로 재구성합니다. 장애가 발생한 서버가 재시작되면 자동으로 활성 이중화 서버로 다시 통합되어 새로운 TCP 세션을 수신합니다.


{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}