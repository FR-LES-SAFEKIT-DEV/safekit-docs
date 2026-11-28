---
title: "SafeKit을 활용한 고가용성 및 재해 복구"
canonical: "https://safekit.eviden.com/ko/best-practises/high-availability-disaster-recovery-hadr/"
description: "Windows 및 Linux에서 SafeKit 고가용성(동기 복제, RPO 0)과 원격지 재해 복구용 비동기 백업을 결합하세요."
category: "best-practises"
lang: "ko"
topics: "HA를 위한 동기식 SafeKit 복제와 DR을 위한 비동기식 백업 복제, 목차, 동기식 HADR: 고속 네트워크(LAN/VLAN)를 통한 제로 데이터 손실, 비동기 HADR: 느린 네트워크(WAN)를 통한 재해 복구, HADR과 백업을 결합하여 완벽한 시스템 복원력을 확보하는 방법, HADR 아키텍처 비교: 고속 네트워크 vs. 저속 네트워크, 동영상 가이드: SafeKit을 사용하여 HADR을 구현하는 방법"
hashpart: "synchronous-safekit-replication-for-ha-vs-asynchronous-backup-replication-for-dr, table-of-contents, synchronous-hadr-fast-network, asynchronous-hadr-slow-network, hadr-resilience-strategy, hadr-architectures-comparison, videoguide-hadr-safekit"
translation: "translate_md 2026-11-19.2 | glossaire 2026-11-19.28 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2026/01/safekit-backup-3-nodes-5-1024.jpg"
schemaType: "TechArticle"
---

# SafeKit을 활용한 고가용성 및 재해 복구 {#high-availability-and-disaster-recovery-with-safekit}

## HA를 위한 동기식 SafeKit 복제와 DR을 위한 비동기식 백업 복제 {#synchronous-safekit-replication-for-ha-vs-asynchronous-backup-replication-for-dr}

SafeKit은 고가의 공유 스토리지가 필요 없는 유연한 소프트웨어 기반 **고가용성 및 재해 복구(HADR) 아키텍처**를 제공합니다. SafeKit은 서버 1과 서버 2 간의 확장 VLAN에 **동기 복제**를 구현하여 중요한 애플리케이션이 두 개의 이중화된 사이트 간에 "활성" 상태를 유지하고 일관성을 유지하도록 보장합니다.

대역폭이 낮은 WAN의 제약을 해결하기 위해 SafeKit은 **백업 및 복구 솔루션**과 함께 사용하도록 설계되었습니다. 이를 통해 조직은 자동 장애 조치를 통해 연중무휴 가동 시간을 유지하면서 원격 재해 복구를 위한 과거 데이터를 안전하게 보호할 수 있습니다.

결과적으로, SafeKit 통해 하드웨어 또는 소프트웨어 장애로부터 환경을 보호하고, 백업 솔루션을 통해 논리적 오류 및 랜섬웨어와 같은 사이버 위협으로부터 환경을 안전하게 보호합니다.


![고가용성(SafeKit)과 백업이 상호 보완적인 이유를 보여주는 기술 다이어그램: SafeKit의 동기 복제를 통해 하드웨어/소프트웨어 장애 조치를 처리하는 반면, 비동기 백업은 랜섬웨어 및 논리적 오류로부터 보호합니다.](/wp-content/uploads/2026/01/safekit-backup-3-nodes-5-1024.jpg "w:512")

**SafeKit을 통한 고가용성 및 백업을 통한 재해 복구**

## 목차 {#table-of-contents}

  * [동기식 HADR: 고속 네트워크(LAN/VLAN)를 통한 제로 데이터 손실](#synchronous-hadr-fast-network)
  * [비동기 HADR: 느린 네트워크(WAN)를 통한 재해 복구](#asynchronous-hadr-slow-network)
  * [HADR과 백업을 결합하여 완벽한 시스템 복원력을 확보하는 방법](#hadr-resilience-strategy)
  * [HADR 아키텍처 비교: 고속 네트워크 vs. 저속 네트워크](#hadr-architectures-comparison)
  * [동영상 가이드: SafeKit을 사용하여 HADR을 구현하는 방법](#videoguide-hadr-safekit)
  * [🔍 SafeKit 살펴보기](#hub)



{{%  insert-safekit-4-buttons-ko  %}}
 

## 동기식 HADR: 고속 네트워크(LAN/VLAN)를 통한 제로 데이터 손실 {#synchronous-hadr-fast-network}

### 고속 네트워크에서 HADR을 구현하는 방법은 무엇입니까? {#hadr-fast-network-architecture}


![공유 디스크 없이 고가용성 및 재해 복구(HADR)를 결합한 아키텍처](/wp-content/uploads/2023/02/remote-datacenters.png "w:256")


고속 네트워크에서 HADR을 구현하려면 원격 사이트에 두 개의 노드를 배포하여 고가용성 및 재해 복구를 동시에 제공하십시오. 이 설정은 공유 스토리지 인프라의 복잡성 없이 전체 사이트가 실패하더라도 애플리케이션을 계속 사용할 수 있도록 보장합니다.

### 고속 네트워크에 SANless HADR 솔루션을 사용하는 이유는 무엇입니까? {#sanless-hadr-solution}

SafeKit과 같은 SANless 솔루션은 공유 디스크 없이 두 노드 간에 데이터를 동기식으로 실시간 복제하므로 필수적입니다. 동기식 복제는 데이터 손실이 없도록 보장하므로(RPO = 0), 하드웨어 또는 소프트웨어 장애가 발생하면 소프트웨어가 즉시 자동 애플리케이션 장애 조치를 트리거할 수 있습니다.

### 동기식 HADR의 네트워크 요구 사항은 무엇입니까? {#extended-lan-vlan-requirements}

동기식 HADR은 세 가지 중요한 이유로 확장 LAN 또는 확장 VLAN 필요로 합니다:

  * **가상 IP 장애 조치:** 단일 서브넷이 필요합니다. [가상 IP 주소](</ko/best-practises/how-a-virtual-ip-address-works/>)는 노드 간에 자동으로 이동할 수 있습니다.
  * **낮은 지연 시간:** 데이터 손실 없는 [동기 복제](</ko/best-practises/synchronous-replication-vs-asynchronous-replication/>)는 일반적으로 5ms 미만의 네트워크 왕복 시간이 필요합니다.
  * **높은 대역폭:** 페일백 중 빠른 데이터 재동기화를 보장하려면 1Gb/s 이상의 연결이 필요합니다.


## 비동기 HADR: 느린 네트워크(WAN)를 통한 재해 복구 {#asynchronous-hadr-slow-network}

### 느린 네트워크 환경에서 HADR을 구현하는 방법은 무엇입니까? {#hadr-slow-network-architecture}


![고가용성과 재해 복구를 분리하는 HADR 아키텍처](/wp-content/uploads/2023/03/hadr-slow-network-1.png "w:256")


느린 네트워크(WAN)에서 HADR을 구현하기 위해 아키텍처 는 일반적으로 **고가용성과** **재해 복구**를 분리합니다. 이 시나리오에서는 로컬 이중화를 위해 기본 사이트에 두 개의 노드를 배포하고, 별도의 백업 또는 비동기 복제 전략을 사용하여 원격 사이트의 데이터를 보호합니다.

### 대역폭이 낮은 연결에 가장 적합한 HADR 솔루션은 무엇입니까? {#sanless-ha-with-remote-dr}

최적의 솔루션은 동기식 실시간 복제 및 자동 장애 조치를 사용하여 로컬 고가용성을 위해 주 사이트에 **SafeKit** 배포하는 것입니다. 재해 복구 사이트의 경우, 느린 네트워크를 통해 비동기 복제 또는 예약된 백업을 통해 데이터가 보호되므로 WAN 지연으로 인해 병목 현상이 발생하지 않고 로컬 가동 시간이 유지됩니다. 이 아키텍처 구현하려면 원격 사이트에서 데이터 전송 및 복원을 관리하기 위해 전용 **백업 솔루션** (SafeKit 이외)이 필요합니다. 

### 원격 재해 복구 사이트에서 장애 조치는 어떻게 작동하나요? {#dr-site-failover-process}

느린 네트워크를 통한 비동기 복제에는 잠재적인 데이터 손실(RPO > 0)이 수반되므로 재해 복구 사이트로의 장애 조치 프로세스는 일반적으로 수동으로 이루어지며 관리자가 관리합니다:

  * **데이터 복원:** 백업은 DR 사이트의 보조 서버로 복원됩니다. 최신 솔루션은 가상 머신(VM)을 신속하게 복원하여 복구 시간을 단축합니다. **Veeam**이 한 예입니다.
  * **DNS 리라우팅:** 트래픽은 DNS 수준에서 DR 사이트로 리디렉션됩니다. 복구 시간은 DNS 캐시 시간 제한(TTL)에 따라 달라지며, 일부 클라이언트 애플리케이션은 새 IP 주소를 적용하기 위해 다시 시작해야 할 수 있습니다.
  * **수동 결정:** 관리자는 보조 데이터 센터로의 전환을 승인하기 전에 원격 사이트의 데이터 무결성을 확인해야 합니다.


## HADR과 백업을 결합하여 완벽한 시스템 복원력을 확보하는 방법 {#hadr-resilience-strategy}

### 고가용성과 데이터 백업 비교 {#ha-vs-backup-comparison}


![SafeKit 고가용성 소프트웨어 로고](/wp-content/uploads/2026/04/safekit-icon-512x512-1.png "w:64")

 

![데이터 백업 전략 아이콘](/wp-content/uploads/2026/01/backup-icon.png "w:64")


두 가지 모두 데이터 보호에 중요하지만, **고가용성(HA)**과 **백업 솔루션**은 서로 다른 위험을 목표로 합니다. SafeKit으로 구동되는 **고가용성**은 서버 중단 또는 하드웨어 장애 발생 시에도 애플리케이션에 계속 접근할 수 있도록 "실시간" 장애 조치 메커니즘을 제공합니다. 반대로 **백업 솔루션**은 "과거" 기록 보관소 역할을 합니다. 고가용성이 실시간 데이터 복제를 통해 99.99%의 시스템 가용성을 보장하는 반면, 백업은 데이터 무결성에 중점을 두어 논리적 오류, 실수로 인한 삭제 또는 랜섬웨어 공격으로부터 복구하는 데 필요한 복원 지점을 제공합니다.

### 고가용성이 백업 전략을 대체할 수 있나요? {#ha-vs-backup-ransomware}

아닙니다. 고가용성과 백업은 상호 보완적인 관계이며, 서로 대체할 수 없습니다. **SafeKit**은 하드웨어 충돌 시에도 애플리케이션을 계속 실행하여 **비즈니스 연속성**을 보장하지만, 논리적 오류, 실수로 인한 삭제 또는 랜섬웨어 공격으로부터는 보호하지 못합니다. 예를 들어, 실시간 복제는 모든 변경 사항을 즉시 미러링하므로, 주 노드에 대한 랜섬웨어 공격은 보조 노드에도 즉시 복제됩니다. 이러한 사이버 위협이나 실수로 인한 삭제로부터 복구하려면 강력한 보존 정책을 갖춘 전용 **백업 솔루션이** 필요합니다. 이를 통해 손상이 발생하기 전의 정상적인 상태로 환경을 "되돌릴" 수 있습니다.

### RTO 및 RPO 최적화: HA와 백업의 시너지 효과 {#ha-backup-rpo-rto}

진정으로 탄력적인 인프라를 구축하려면 고가용성과 백업을 통합된 전략으로 통합해야 합니다. 이 두 가지 기술은 복구 시간 목표(RTO)와 복구 지점 목표(RPO)의 여러 측면을 다룹니다. 자세한 내용은 [RTO 및 RPO 예시](</ko/best-practises/what-is-rpo-and-rto-with-examples/>)를 참조하십시오.

  * **고가용성(SafeKit 사용):** 목표는 **즉각적인 복구**입니다. SafeKit은 환경의 실시간 동기 복사본을 유지합니다. RTO는 거의 0에 가깝고 RPO는 0입니다. 서버에 장애가 발생하면 애플리케이션이 보조 노드에서 즉시 재개되어 전환 중 서비스 중단이나 데이터 손실이 발생하지 않도록 보장합니다.
  * **백업 솔루션:** 목표는 **데이터 복원력**입니다. HA가 서비스를 "라이브" 상태로 유지하는 반면, 백업은 "불변의" 기록을 생성합니다. 백업은 라이브 데이터 자체가 손상되었을 때의 안전망입니다. 바이러스나 실수로 인한 삭제가 발생하기 전의 특정 시점으로 데이터베이스의 깨끗한 버전을 복원할 수 있게 해줍니다.


## HADR 아키텍처 비교: 고속 네트워크 vs. 저속 네트워크 {#hadr-architectures-comparison}

기준 | 고속 네트워크(LAN/VLAN) | 느린 네트워크(WAN)  
---|---|---  
주요 범위 | 로컬 이중화 및 고가용성 | 사이트 간 재해 복구  
사용 사례 | 동일 데이터 센터 또는 캠퍼스 | 원격 데이터 센터 또는 클라우드 리전  
복제 유형 | 동기식(실시간) | 비동기/백업  
RPO (데이터 손실) | 0(RPO = 0) | 잠재적 데이터 손실(RPO > 0)  
장애 조치 프로세스 | 자동 | 수동(Admin 결정)  
교통 우회 | 가상 IP 주소(VIP) | DNS 수준(TTL에 따라 다름)  
지연 시간 요구 사항 | 낮음(일반적으로 < 5ms) | 높은 지연 시간 지원  
1차 복구 목표 | 즉각적인 비즈니스 연속성 | 데이터 안전 및 보존  
  
## 동영상 가이드: SafeKit을 사용하여 HADR을 구현하는 방법 {#videoguide-hadr-safekit}

###  SafeKit을 이용한 HADR 구현: 동기 복제 및 장애 조치 {#how-to-implement-hadr-with-safekit-synchronous-replication--failover}

SafeKit을 사용하여 **고가용성(HA)**과 **재해 복구(DR)**를 단일 HADR 전략으로 결합하는 방법을 알아보세요. 이 비디오 가이드는 공유 디스크 없이 100% 애플리케이션 가동 시간을 보장하는 데 필요한 아키텍처 살펴봅니다.

### 동영상 하이라이트 {#video-highlights}

  1. 🎬 [확장 VLAN 통한 SafeKit HADR 소개](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=0s>) (1:06)
  2. 🎬 [동기식 미러링 및 이중 확인 작동 방식](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=65s>) (1:41)
  3. 🎬 [장애 조치 메커니즘: Gratuitous ARP (GARP) 및 가상 IP](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=166s>) (2:10)
  4. 🎬 [느린 WAN을 위한 설계: HA 대 백업 전략](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=296s>) (2:45)


### SafeKit 동영상: SafeKit을 사용하여 고가용성 및 재해 복구(HADR)를 구현하는 방법 (7:40) {#safekit-video-how-to-implement-high-availability-and-disaster-recovery-hadr-with-safekit-740}



{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}