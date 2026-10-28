---
title: "SafeKit 고가용성과 재해 복구 백업의 결합"
canonical: "https://safekit.eviden.com/ko/best-practises/high-availability-disaster-recovery-hadr/"
description: "동기식 복제(RPO=0)를 위한 SafeKit 와 오프사이트 재해 복구를 위한 비동기식 백업을 결합하여 탄력적인 고가용성/재해 복구(HA/DR) 전략을 구축하십시오. 이 이중 계층 접근 방식을 통해 Windows 및 Linux 에서 연중무휴 24시간 애플리케이션 가동 시간과 데이터 무결성을 보장하십시오."
category: "best-practises"
lang: "ko"
topics: "고가용성(HA)을 위한 동기식 SafeKit 복제와 재해 복구(DR)를 위한 비동기식 백업 복제 비교, 목차, 동기식 HADR: 고속 네트워크(LAN/VLAN)에서의 데이터 손실 제로, 비동기식 HADR: 저속 네트워크(WAN)에서의 재해 복구, 완벽한 시스템 복원력을 위한 HADR과 백업 결합 방법, HADR 아키텍처 비교: 고속 네트워크 vs. 저속 네트워크, 비디오 가이드: SafeKit 이용한 HADR 구현 방법, 🔍 SafeKit 고가용성 탐색 허브"
---

# SafeKit 고가용성과 재해 복구 백업 결합 {#combining-safekit-high-availability-with-disaster-recovery-backups}

## 고가용성을 위한 동기식 복제 SafeKit 와 재해 복구를 위한 비동기식 백업 복제 비교 {#synchronous-safekit-replication-for-ha-vs-asynchronous-backup-replication-for-dr}

SafeKit 값비싼 공유 스토리지가 필요 없는 유연한 소프트웨어 기반 **고가용성 및 재해 복구(HADR) 아키텍처** 제공합니다. 서버 1과 서버 2 간의 확장된 VLAN을 통해 **동기 복제** 구현함으로써 SafeKit 두 개의 이중화 사이트 간에 중요 애플리케이션이 항상 "활성" 상태를 유지하고 일관성을 보장합니다.

대역폭이 낮은 WAN의 제약을 해결하기 위해 SafeKit 는 **백업 및 복구 솔루션인** 와 함께 사용하도록 설계되었습니다. 이를 통해 조직은 자동 장애 조치를 통해 24시간 연중무휴 가동 시간을 유지하는 동시에 재해 복구를 위해 과거 데이터를 안전하게 보관할 수 있습니다.

결과적으로, SafeKit 를 통해 하드웨어 또는 소프트웨어 오류로부터 환경이 보호되고, 백업 솔루션을 통해 논리적 오류 및 랜섬웨어와 같은 사이버 위협으로부터 보안이 유지됩니다.


![ 고가용성( SafeKit )과 백업이 상호 보완적인 이유를 보여주는 기술 다이어그램: SafeKit 동기식 복제를 통해 하드웨어/소프트웨어 장애 조치를 처리하고, 비동기식 백업은 랜섬웨어 및 논리적 오류로부터 보호합니다. ](/wp-content/uploads/2026/01/safekit-backup-3-nodes-5-1024.jpg "w:512")

**고가용성(HA) vs 백업: 동기 복제와 비동기 재해 복구(DR)의 결합 SafeKit**

## 목차 {#table-of-contents}

  * [ 동기식 HADR: 고속 네트워크(LAN/VLAN)에서 데이터 손실 제로 ](#synchronous-hadr-fast-network)
  * [ 비동기 HADR: 저속 네트워크(WAN)를 통한 재해 복구 ](#asynchronous-hadr-slow-network)
  * [ HADR과 백업을 결합하여 완벽한 시스템 복원력을 확보하는 방법 ](#hadr-resilience-strategy)
  * HADR 아키텍처 비교: 고속 네트워크 vs. ](#hadr-architectures-comparison) 네트워크 [
  * [ 비디오 가이드: SafeKit ](#videoguide-hadr-safekit) 사용한 HADR 구현 방법
  * [ 🔍 SafeKit 고가용성 내비게이션 허브 ](#hub)



{{%  insert-safekit-4-buttons-ko  %}}
 

## 동기식 HADR: 고속 네트워크(LAN/VLAN)에서 데이터 손실 제로 {#synchronous-hadr-fast-network}

### 빠른 네트워크 환경에서 HADR을 구현하는 방법은 무엇인가요? {#hadr-fast-network-architecture}


![ 공유 디스크 없이 고가용성과 재해 복구(HADR)를 결합한 아키텍처입니다 ](/wp-content/uploads/2023/02/remote-datacenters.png "w:256")


고속 네트워크 환경에서 HADR(고가용성 및 재해 복구)을 구현하려면 원격 사이트에 두 개의 노드를 배포하여 고가용성과 재해 복구를 동시에 제공해야 합니다. 이러한 설정을 통해 전체 사이트에 장애가 발생하더라도 애플리케이션을 계속 사용할 수 있으며, 공유 스토리지 인프라의 복잡성을 피할 수 있습니다.

### 빠른 네트워크에 SAN이 없는 HADR 솔루션을 사용하는 이유는 무엇일까요? {#sanless-hadr-solution}

SafeKit 와 같은 SANless 솔루션은 공유 디스크 없이 두 노드 간에 데이터를 동기식으로 실시간 복제하기 때문에 필수적입니다. 동기식 복제는 데이터 손실이 전혀 발생하지 않으므로(RPO=0), 하드웨어 또는 소프트웨어 오류가 발생할 경우 소프트웨어에서 애플리케이션 페일오버를 즉시 실행할 수 있습니다.

### 동기식 HADR의 네트워크 요구 사항은 무엇입니까? {#extended-lan-vlan-requirements}

동기식 HADR을 구현하려면 다음 세 가지 중요한 이유로 확장된 LAN 또는 확장된 VLAN이 필요합니다.

  * **가상 IP 페일오버: 노드 간** 가상 IP 주소 ](</ko/best-practises/how-a-virtual-ip-address-works/>) [ 자동으로 페일오버하려면 단일 서브넷이 필요합니다.
  * **저지연:** [ 동기 복제 ](</ko/best-practises/synchronous-replication-vs-asynchronous-replication/>) 데이터 손실 없이 일반적으로 네트워크 왕복 시간이 5ms 미만이어야 합니다.
  * **고대역폭:** 장애 복구 시 빠른 데이터 재동기화를 위해서는 1Gb/s 이상의 연결이 필요합니다.


## 비동기 HADR: 저속 네트워크(WAN)를 통한 재해 복구 {#asynchronous-hadr-slow-network}

### 느린 네트워크 환경에서 HADR을 구현하는 방법은 무엇인가요? {#hadr-slow-network-architecture}


![ HADR 아키텍처는 고가용성과 재해 복구를 분리합니다 ](/wp-content/uploads/2023/03/hadr-slow-network-1.png "w:256")


속도가 느린 네트워크(WAN)에서 HADR(고가용성 및 **재해 복구)** 을 구현하기 위해 일반적으로 **고가용성과** 재해 복구를 분리하는 아키텍처를 사용합니다. 이 시나리오에서는 기본 사이트에 로컬 이중화를 위해 두 개의 노드를 배포하고, 원격 사이트의 데이터를 보호하기 위해 별도의 백업 또는 비동기 복제 전략을 사용합니다.

### 저대역폭 연결에 가장 적합한 HADR 솔루션은 무엇입니까? {#sanless-ha-with-remote-dr}

최적의 솔루션은 동기식 실시간 복제 및 자동 장애 조치를 사용하여 로컬 고가용성을 확보하기 위해 기본 사이트에 **, SafeKit** 배포하는 것입니다. 재해 복구 사이트의 경우, 데이터는 비동기식 복제 또는 느린 네트워크를 통한 예약된 백업을 통해 보호되어 WAN 지연으로 인한 병목 현상 없이 로컬 가동 시간을 유지합니다. 이러한 아키텍처를 구현하려면 원격 사이트에서 데이터 전송 및 복구를 관리하는 전용 **백업 솔루션** ( SafeKit 제외)가 필요합니다. 

### 원격 재해 복구 사이트에서 페일오버는 어떻게 작동하나요? {#dr-site-failover-process}

느린 네트워크를 통한 비동기 복제는 데이터 손실 가능성을 수반하므로(RPO > 0), 재해 복구 사이트로의 페일오버 프로세스는 일반적으로 수동으로 관리자가 관리합니다.

  * **데이터 복원:** 백업은 재해 복구(DR) 사이트의 보조 서버로 복원됩니다. **Veeam** 과 같은 최신 솔루션은 가상 머신(VM)을 신속하게 복원하여 복구 시간을 단축하는 데 자주 사용됩니다.
  * **DNS 재라우팅:** 트래픽이 DNS 수준에서 재해 복구(DR) 사이트로 재라우팅됩니다. 복구 시간은 DNS 캐시 타임아웃(TTL)에 따라 달라지며, 일부 클라이언트 애플리케이션은 새 IP 주소를 적용하기 위해 재시작이 필요할 수 있습니다.
  * **수동 결정:** 관리자는 보조 데이터 센터로의 전환을 승인하기 전에 원격 사이트에서 데이터 무결성을 확인해야 합니다.


## HADR과 백업을 결합하여 완벽한 시스템 복원력을 확보하는 방법 {#hadr-resilience-strategy}

### 고가용성과 데이터 백업 비교 {#ha-vs-backup-comparison}


![ SafeKit 고가용성 소프트웨어 로고 ](/wp-content/uploads/2026/04/safekit-icon-512x512-1.png "w:64")

 

![ 데이터 백업 전략 아이콘 ](/wp-content/uploads/2026/01/backup-icon.png "w:64")


**고가용성(HA)** 과 **백업 솔루션은** 모두 데이터 보호에 필수적이지만, 각각 다른 위험 요소를 대상으로 합니다. SafeKit 기반의 **고가용성은** 서버 장애나 하드웨어 오류 발생 시에도 애플리케이션에 지속적으로 접근할 수 있도록 실시간 페일오버 메커니즘을 제공합니다. 반면, **백업 솔루션은** 과거 데이터를 저장하는 아카이브 역할을 합니다. 고가용성은 실시간 데이터 복제를 통해 99.99%의 시스템 가용성을 보장하는 반면, 백업은 데이터 무결성에 중점을 두고 논리적 오류, 실수로 인한 삭제, 랜섬웨어 공격으로부터 데이터를 복구할 수 있는 복원 지점을 제공합니다.

### 고가용성이 백업 전략을 대체할 수 있을까요? {#ha-vs-backup-ransomware}

아니요, 고가용성과 백업은 상호 보완적인 관계이지, 서로 대체할 수 있는 것이 아닙니다. SafeKit 가용성 **하드웨어 장애 발생 시에도 애플리케이션** 계속 실행되도록 하여 **연속성** 보장하지만, 논리적 오류, 실수로 인한 삭제 또는 랜섬웨어 공격으로부터는 보호해 주지 않습니다. 예를 들어, 실시간 복제는 모든 변경 사항을 즉시 반영하기 때문에 기본 노드에 랜섬웨어 공격이 발생하면 보조 노드에도 즉시 동일한 공격이 발생합니다. 이러한 사이버 위협이나 실수로 인한 삭제로부터 복구하려면 강력한 보존 정책 **갖춘** 백업 솔루션이 필요합니다. 이를 통해 손상 발생 이전의 정상적인 상태로 환경을 "되돌릴" 수 있습니다.

### RTO 및 RPO 최적화: 고가용성과 백업의 시너지 효과 {#ha-backup-rpo-rto}

진정으로 탄력적인 인프라를 구축하려면 고가용성과 백업을 통합 전략으로 결합해야 합니다. 이 두 기술은 [ (복구 시간 목표) 및 RPO(복구 시점 목표) ](</ko/best-practises/what-is-rpo-and-rto-with-examples/>) 방정식의 서로 다른 측면을 다룹니다. 

  * **고가용성( SafeKit 경유):** **대상으로 하며** 즉시 복구를 지원합니다. 환경을 실시간으로 동기식으로 유지함으로써 mirror , SafeKit 거의 0에 가까운 RTO와 0의 RPO를 달성합니다. 서버에 장애가 발생하면 애플리케이션은 보조 노드에서 즉시 재개되어 전환 중 서비스 중단이나 데이터 손실이 발생하지 않습니다.
  * **백업 솔루션:** 대상, **데이터 복원력,** . 고가용성(HA)은 서비스를 "활성" 상태로 유지하는 반면, 백업은 "변경 불가능한" 기록을 생성합니다. 이는 실제 데이터가 손상되었을 때를 대비한 대안으로, 바이러스 감염이나 실수로 인한 삭제가 발생하기 전 특정 시점의 깨끗한 데이터베이스 버전을 복원할 수 있도록 해줍니다.


## HADR 아키텍처 비교: 고속 네트워크 vs. 저속 네트워크 {#hadr-architectures-comparison}

기준 | 고속 네트워크(LAN/VLAN) | 저속 네트워크(WAN)  
---|---|---  
주요 범위 | 로컬 이중화 및 고가용성 | 사이트 간 재해 복구  
사용 사례 | 동일 데이터 센터 또는 캠퍼스 | 원격 데이터 센터 또는 클라우드 지역  
복제 유형 | 동기식(실시간) | 비동기식/백업  
RPO(데이터 손실) | 0(RPO = 0) | 잠재적 데이터 손실(RPO > 0)  
장애 조치 프로세스 | 자동 | 수동(관리자 결정)  
트래픽 재라우팅 | 가상 IP 주소(VIP) | DNS 레벨(TTL에 따라 다름)  
지연 시간 요구 사항 | 낮음(일반적으로 < 5ms) | 높은 지연 시간 지원  
주요 복구 목표 | 즉각적인 비즈니스 연속성 | 데이터 안전 및 보존  
  
## 비디오 가이드: SafeKit 사용한 HADR 구현 방법 {#videoguide-hadr-safekit}

###  SafeKit 사용한 HADR 구현 방법: 동기 복제 및 장애 조치 {#how-to-implement-hadr-with-safekit-synchronous-replication--failover}

**고가용성(HA)** 및 **재해 복구(DR)** SafeKit 를 사용하여 단일 HADR 전략으로 결합하는 방법을 알아보세요. 이 비디오 가이드에서는 공유 디스크 없이 100% 애플리케이션 가동 시간을 보장하는 데 필요한 아키텍처를 살펴봅니다.

### 비디오 하이라이트 {#video-highlights}

  1. 🎬 [ 확장된 VLAN을 통한 HADR 소개 SafeKit ](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=0s>) (1:06)
  2. 🎬 [ 동기식 미러링 및 이중 확인 작동 방식 (1:41) ](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=65s>)
  3. 🎬 [ 페일오버 메커니즘: GARP(Gratuitous ARP) 및 가상 IP ](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=166s>) (2:10)
  4. 🎬 [ 느린 WAN을 위한 설계: 고가용성(HA) vs. 백업 전략 ](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=296s>) (2:45)


### SafeKit 비디오: SafeKit 를 사용한 고가용성 및 재해 복구(HADR) 구현 방법 (7:40) {#safekit-video-how-to-implement-high-availability-and-disaster-recovery-hadr-with-safekit-740}

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 


{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}