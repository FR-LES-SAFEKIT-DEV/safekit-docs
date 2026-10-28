---
title: "고가용성 클러스터링에서 가상 IP 주소(VIP)는 어떻게 작동합니까?"
canonical: "https://safekit.eviden.com/ko/best-practises/how-a-virtual-ip-address-works/"
description: "SafeKit 가 소프트웨어 정의 가상 IP(VIP) 주소를 사용하여 연중무휴 24시간 가동을 보장하는 방법을 알아보세요. Gratuitous ARP를 통한 자동 장애 조치와 Windows 및 Linux 서버에서 비즈니스 연속성을 위해 DNS 리디렉션보다 우수한 성능을 제공하는 이유를 확인해 보세요."
category: "best-practises"
lang: "ko"
topics: "고가용성 클러스터에서 가상 IP 주소란 무엇인가요?, SafeKit 클러스터의 가상 IP 구현, 목차, 동일 서브넷 장애 조치에서 가상 IP 주소(VIP) 작동 방식( Mirror 클러스터), 서로 다른 서브넷에서 가상 IP(VIP) 작동 방식( Mirror 클러스터), 동일 서브넷 `Farm` 클러스터에서 로드 밸런싱된 가상 IP 작동 방식( `Farm` 클러스터), 서로 다른 서브넷에서 로드 밸런싱된 가상 IP 작동 방식( `Farm` 클러스터), 가상 IP와 DNS 리디렉션 비교: DNS 장애 조치가 자주 실패하는 이유, 비교: 가상 IP 구현, 지연 시간 및 애플리케이션 투명성, 네트워크 로드 밸런싱 및 고가용성을 위한 가상 IP 주소 구성, 가상 IP(VIP) 관련 자주 묻는 질문, 🔍 SafeKit 고가용성 탐색 허브"
---

# 고가용성 클러스터링에서 가상 IP 주소(VIP)는 어떻게 작동합니까? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## 고가용성 클러스터에서 가상 IP 주소란 무엇입니까? {#virtual-ip-definition}

  * **: VIP(** **가용성 [ 에서 애플리케이션의 지속적인 접근 ](</>) 보장하기 위해 사용되는 유동적** 네트워크 주소입니다. 표준 IP와 달리 VIP는 특정 물리적 하드웨어 인터페이스에 고정되지 않고 클러스터 노드 간에 이동하며 클라이언트를 위한 단일하고 영구적인 진입점을 유지합니다.
  * 하드웨어가 필요하지 않습니다. **SafeKit** **GARP(Gratuitous ARP)** 를 사용하여 소프트웨어 수준에서 VIP를 관리하므로 동일 서브넷 환경에서 외부 로드 밸런서가 필요하지 않습니다.
  * **애플리케이션 투명성:** 로컬 VIP에 바인딩함으로써 애플리케이션은 장애 조치 이벤트를 인식하지 못하고 클라이언트 소스 IP와 기존 보안 구성을 유지합니다.
  * **재해 복구:** 확장 LAN **를 사용하면** 통해 원격 데이터 센터 전체에서 동일한 VIP를 사용할 수 있으므로 복잡한 DNS 재라우팅 및 TTL 캐싱 지연에 비해 사이트 간 장애 조치가 간소화됩니다.


## SafeKit 의 가상 IP 구현 {#safekit-vip-implementation}

  * **Mirror 클러스터:** 실시간 복제 및 장애 조치를 용이하게 하기 위해 기본 서버에서만 활성화되는 플로팅 IP를 제공합니다.
  * **`Farm` 클러스터:** 모든 노드에서 VIP를 동시에 유지하여 네트워크 로드 밸런싱을 가능하게 합니다.


**주요 이점:** **ARP(주소 확인 프로토콜)** 또는 **MAC 주소 탈취** 를 활용함으로써 VIP는 수동 클라이언트 재구성 없이 원활한 애플리케이션 장애 조치를 지원하여 연중무휴 24시간 비즈니스 연속성을 보장합니다.

  * **클라우드 및 멀티 서브넷:** 외부 로드 밸런서 상태 점검( AWS , Azure , GCP )을 통해 관리되며, 트래픽을 여러 서브넷으로 리디렉션합니다.


Evidian에서 가상 IP(VIP) 동작 비교 다이어그램 SafeKit ![ ): 활성 노드에 플로팅 IP가 표시되는 클러스터 Mirror 와 모든 노드에 걸쳐 네트워크 로드 밸런싱이 표시되는 클러스터( Farm ](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512") 비교.

**가상 IP 구현 전략 Mirror 그리고 `Farm` 클러스터 SafeKit.**


{{%  insert-safekit-4-buttons-ko  %}}
 

## 목차 {#table-of-contents}

  * 동일 서브넷 장애 조치(클러스터)에서 가상 IP 주소(VIP) 작동 방식( [ )( Mirror ) ](#virtual-ip-same-subnet-failover)
  * [ 서로 다른 서브넷에서 가상 IP(VIP)가 작동하는 방식 ( Mirror 클러스터) ](#virtual-ip-different-subnets-failover)
  * 동일 서브넷에서 로드 밸런싱된 가상 IP의 작동 방식 [ `Farm` 클러스터, `Farm` 클러스터)( ](#vip-load-balancing-same-subnet) )
  * [ 서로 다른 서브넷에서 로드 밸런싱된 가상 IP가 작동하는 방식 ( `Farm` 클러스터) ](#vip-load-balancing-different-subnets)
  * [ 가상 IP와 DNS 리디렉션: DNS 페일오버가 자주 실패하는 이유 ](#virtual-ip-vs-dns-redirection-failover)
  * [ 비교: 가상 IP 구현, 지연 시간 및 애플리케이션 투명성 ](#vip-vs-dns-comparison)
  * [ 네트워크 부하 분산 및 고가용성을 위한 가상 IP 주소 구성 ](#virtual-ip-configuration-load-balancing-ha)
  * [ 가상 IP(VIP) 관련 자주 묻는 질문 ](#virtual-ip-faq)
  * [ 🔍 SafeKit 고가용성 내비게이션 허브 ](#hub)


## 동일 서브넷 장애 조치 환경에서 가상 IP 주소(VIP) 작동 방식 ( Mirror 클러스터) {#virtual-ip-same-subnet-failover}

### 로컬 서브넷 에서의 자동 장애 조치 및 네트워크 재라우팅 {#automated-failover--network-rerouting-in-a-local-subnet}

로컬 인프라 내에서 원활한 비즈니스 연속성이 필요한 조직을 위해 **, SafeKit** 로컬 네트워크 클러스터용 소프트웨어 정의 고가용성을 제공하며, 가상 IP 주소 관리 및 실시간 애플리케이션 장애 조치를 위한 강력하고 자동화된 솔루션을 제공합니다. 

### 로컬 Mirror 클러스터: 원활한 2노드 Windows 또는 Linux 페일오버 {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![ SafeKit 동일 서브넷 내 두 서버 간 가상 IP(VIP) 페일오버 메커니즘 ](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

 SafeKit 표준 VIP 별칭 및 MAC 주소 매핑 **SafeKit mirror 무리** 두 노드가 동일한 로컬 서브넷에 있는 경우, 고가용성은 다음을 통해 달성됩니다. **소프트웨어 정의 가상 IP(VIP)**하드웨어 기반 솔루션과는 달리, SafeKit 이 VIP는 OS 네트워킹 스택 내에서 직접 관리됩니다. 이 VIP는 서버 1과 서버 2의 고유한 물리적 IP 주소 위에 계층화되어 클라이언트를 위한 영구적인 논리적 진입점 역할을 합니다. **IP 별칭**. 

#### SafeKit 의 고급 IP 별칭 및 다중 VIP 지원 {#safekits-advanced-ip-aliasing--multiple-vip-support}

**SafeKit 솔루션** 의 주요 장점은 네트워크 ID 관리의 유연성입니다. VIP는 노드 간에 "유동적으로" 사용되는 세 번째 IP 주소입니다. 특히 SafeKit 단일 클러스터 내에서 **여러 개의 가상 IP 주소를** 관리할 수 있습니다. 이러한 가상 IP 주소는 동일한 기본 이더넷 카드에 할당하거나 서로 다른 물리적 카드에 분산하여 할당할 수 있으므로, 다양한 서비스를 특정 가상 ID에 연결하는 복잡한 구성이 가능합니다. 

#### 장애 조치 메커니즘: Gratuitous ARP(GARP) {#the-failover-mechanism-gratuitous-arp-garp}

SafeKit 하드웨어 오류 발생 시 수동 개입이 전혀 없도록 보장합니다. 정상 작동 시 VIP는 서버 1의 MAC 주소(mac1)인 **와** 에 매핑됩니다. SafeKit 서버 1에서 하트비트 오류를 감지하면 2단계 복구를 실행합니다. 

  * **애플리케이션 복구:** SafeKit 서버 2에서 중요 애플리케이션 서비스를 자동으로 다시 시작합니다.
  * **네트워크 재라우팅:** SafeKit 즉시 **Gratuitous ARP(GARP)** 메시지를 브로드캐스트합니다. 이로 인해 모든 네트워크 스위치와 연결된 클라이언트의 ARP 캐시가 강제로 업데이트되어 VIP가 **서버 2의 MAC 주소(mac2)** 로 다시 매핑됩니다.


#### 원격 데이터 센터 및 확장 VLAN {#remote-data-centers--extended-vlans}

일반적으로 로컬 클러스터에 사용되는 **SafeKit 의 동일 서브넷 알고리즘은** **확장된 LAN 또는 확장된 VLAN을** 통해 연결된 원격 사이트의 **재해 복구(DR)** 에 가장 적합한 선택입니다. 이러한 "확장된" 아키텍처를 통해 지리적 거리에 관계없이 단일 서브넷을 유지할 수 있으므로 네트워크 토폴로지가 크게 단순화되고 복잡한 라우팅 프로토콜의 오버헤드를 방지할 수 있습니다. 

> **⚠️ 주의:** Gratuitous ARP를 통한 레이어 2 재라우팅은 다음과 같습니다. **가장 투명한 솔루션** 애플리케이션에 사용됩니다. 로드 밸런서를 사용한 레이어 3 재라우팅과 달리, 다음과 같은 문제를 방지합니다. **소스/대상 IP 변환(SNAT/DNAT)**애플리케이션은 원래 클라이언트 IP를 통해 트래픽을 직접 수신하며, 가상 IP는 로컬에서 구성됩니다. **많은 애플리케이션이 선호합니다** 로컬에서 가상 IP를 확인하고 원래 클라이언트 IP를 직접 수신할 수 있습니다. 이러한 투명성이 없다면, 그들은 **예상대로 작동하지 않을 수 있습니다.** 복잡한 네트워크 변환으로 인해.

## 서로 다른 서브넷에서 가상 IP(VIP)가 작동하는 방식( Mirror 클러스터) {#virtual-ip-different-subnets-failover}

### 로드 밸런싱 통합을 통한 클라우드 환경 지원 트래픽 오케스트레이션 {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

외부 네트워크 인프라를 활용하여 **SafeKit 멀티 AZ 및 클라우드 클러스터용 소프트웨어 정의 고가용성** **네트워크 로드 밸런서** 와 원활하게 통합되어 서로 다른 서브넷 및 가용성 영역 간의 트래픽 페일오버를 오케스트레이션합니다. 

### 교차 서브넷 Mirror 클러스터: Windows 및 Linux 구현 {#cross-subnet-mirror-clusters-windows--linux-implementation}


![ 두 개의 서로 다른 서브넷에 걸쳐 로드 밸런서를 사용한 가상 IP 장애 조치 다이어그램 ](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

 클러스터 노드가 **개의 서로 다른 서브넷** 에 위치할 경우, 표준 ARP 기반 페일오버는 불가능합니다. 이 시나리오에서는 **가상 IP(VIP)** 서버의 이더넷 카드 대신 **로드 밸런서(LB)** 에서 호스팅됩니다. 로드 밸런서는 게이트웨이 역할을 하며 실시간 가용성에 따라 기본 노드와 보조 노드의 물리적 IP 주소로 트래픽을 전달합니다. 

#### SafeKit 상태 확인을 통한 동적 라우팅 {#dynamic-routing-via-safekit-health-checks}

SafeKit 각 노드에 전용 **상태 확인 URL을** 제공하여 트래픽 스티어링을 관리합니다. 로드 밸런서는 이러한 URL을 쿼리하여 클러스터 상태를 확인합니다. 

  * **기본 노드(PRIM):** 상태 점검 결과는 `HTTP 200 OK` 입니다. 로드 밸런서는 모든 트래픽을 이곳으로 전달합니다.
  * **보조 노드(SECOND):** 상태 확인 결과 `HTTP 404 NOT FOUND` 가 반환되었습니다. 로드 밸런서는 이 노드로 트래픽을 전송하지 않습니다.

**페일오버 이벤트** 동안 SafeKit 즉시 상태 확인 응답을 전환하여 로드 밸런서가 클라이언트 트래픽을 새 기본 서버로 재라우팅하도록 합니다. 

> **⚠️ 참고:** SafeKit 는 상태 확인 로직을 제공합니다. 물리적 또는 가상 로드 밸런서는 네트워크 인프라에서 제공해야 합니다.

#### 클라우드 통합: AWS , Azure , GCP , {#cloud-integration-aws-azure-and-gcp}

이 "로드 밸런싱 + 상태 점검" 모델은 **클라우드 고가용성** 를 위한 업계 표준입니다. 이는 다음과 같은 환경에서 SafeKit 구현하는 데 필수적입니다. 

  * 💡 [ **Amazon AWS** ](</ko/solutions/aws-high-availability-cluster-synchronous-replication-failover/>) ( AWS 네트워크 로드 밸런서)
  * 💡 [ **Microsoft Azure** ](</ko/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) ( Azure 로드 밸런서)
  * 💡 [ **Google Cloud ( GCP )** ](</ko/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>) (Google Cloud 로드 밸런싱)


#### 네트워크 고려 사항: 로드 밸런싱 vs. 확장 LAN {#network-considerations-load-balancer-vs-extended-lan}

로드 밸런싱을 원하지 않는 경우, 서브넷 간에 **확장 LAN(VLAN 스트레칭)** 구현하는 것에 대해 네트워크 팀과 상의하십시오. 이렇게 하면 더 간단한 "동일 서브넷" VIP 모델로 되돌아갈 수 있습니다. 

**⚠️ 주의:** 로드 밸런서를 선택할 경우, 애플리케이션이 **소스/대상 IP 변환(SNAT/DNAT)** 과 호환되는지 확인하십시오. 로드 밸런서를 사용하면 애플리케이션이 원래 사용자의 ID를 추적하지 못하거나, 자체 네트워크 인터페이스에 직접 구성된 가상 IP를 더 이상 인식하지 못하여 시작되지 않을 수 있습니다.

## 동일 서브넷 `Farm` ( `Farm` 클러스터) 에서 로드 밸런싱된 가상 IP가 작동하는 방식 {#vip-load-balancing-same-subnet}

### 확장 가능한 성능: 커널 수준 로드 밸런싱 및 이중화 {#scalable-performance-kernel-level-load-balancing--redundancy}

트래픽이 많은 환경의 경우, **아키텍처 가이드: 멀티노드 `Farm` 클러스터를 사용한 확장 가능한 고가용성** SafeKit 완전한 이중화를 유지하면서 여러 활성 서버에 워크로드를 분산하는 방법을 설명합니다. 

### `Farm` 클러스터 아키텍처: Windows 또는 Linux 노드와 노드 간의 로드 밸런싱 {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


동일 서브넷 내 로드 밸런싱 가상 IP(VIP)의 다이어그램 ![ farm 클러스터 ](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

 커널 필터링을 통한 분산 트래픽 처리: **로드 밸런싱 클러스터인 `farm`** 에서는 가상 IP(VIP) 주소를 사용하여 클라이언트 요청을 여러 서버에 동시에 분산합니다. 이 예제에서는 두 개의 노드를 사용하지만, 이 아키텍처는 더 큰 서버 팜을 지원하도록 확장 가능합니다. 동일 서브넷 구성에서 VIP는 IP 별칭을 통해 클러스터의 **모든 서버** 의 이더넷 카드에 구성됩니다. 

#### 트래픽 분배: 커널 레벨 필터 {#traffic-distribution-the-kernel-level-filter}

단순한 장애 조치 클러스터와 달리 `farm` 클러스터는 특수한 **커널 수준 필터** 를 통해 트래픽을 관리합니다. 작동 방식은 다음과 같습니다. 

  * **ARP 매핑:** 클라이언트의 ARP 캐시에서 VIP는 처음에 단일 하드웨어 주소(예: 서버 1의 `mac1` )와 연결됩니다.
  * **패킷 분할:** 서버 1이 트래픽을 수신하면 SafeKit 커널 필터는 수신 패킷의 신원을 분석합니다( **클라이언트 IP** 또는 **TCP 포트** 기준).
  * **부하 분산:** 필터는 어떤 패킷을 로컬에서 처리해야 하고 어떤 패킷을 다른 노드(예: 서버 2)로 리디렉션하여 처리해야 하는지 결정하여 균형 잡힌 작업 부하를 보장합니다.


#### Gratuitous ARP 사용한 페일오버 및 재라우팅 {#failover-and-rerouting-with-gratuitous-arp}

기본 노드(서버 1)에 장애가 발생하면 클러스터는 **GARP(Gratuitous ARP) 및** 통해 가용성을 유지합니다. SafeKit GARP 메시지를 브로드캐스트하여 클라이언트의 ARP 캐시를 서버 2의 `mac2` 정보로 업데이트합니다. 이를 통해 기본 "진입점"에 장애가 발생하더라도 클라이언트는 farm 에 지정된 다른 노드로 즉시 재라우팅됩니다. 

#### 원격 사이트 배포 {#deployment-in-remote-sites}

**원격 데이터 센터** 에서 운영되는 조직의 경우, 사이트가 **확장 LAN 또는** VLAN을 통해 연결되어 있으면 이 로드 밸런싱 알고리즘이 계속 작동합니다. 이렇게 하면 가상 "동일 서브넷" 환경이 생성되며, 이는 지리적으로 분산된 `farm` 클러스터에 가장 효율적인 구성입니다. 

## 서로 다른 서브넷에서 로드 밸런싱된 가상 IP가 작동하는 방식 ( `Farm` 클러스터) {#vip-load-balancing-different-subnets}

### 다중 영역 확장: 클라우드 서브넷 간 트래픽 오케스트레이션 {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

**아키텍처 가이드: 다중 영역 및 클라우드 환경에서 `Farm` 클러스터 확장** 애플리케이션 워크로드를 서로 다른 가용 영역 및 서브넷에 분산하기 위한 청사진을 제공합니다. 

### 교차 서브넷 `Farm` 클러스터: 다중 노드 Windows 및 Linux 확장성 {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


두 개의 서로 다른 서브넷에서 작동하는 로드 밸런싱 클러스터의 다이어그램 ![ farm , ](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

 `farm` 노드가 **서로 다른 서브넷** 에 분산되어 있는 경우(다중 가용 영역 클라우드 배포에서 일반적임), **가상 IP(VIP)** 외부 **로드 밸런서(LB)** 에 의해 관리됩니다. LB는 VIP를 보유하고 들어오는 트래픽을 각 서브넷에 있는 서버의 물리적 IP 주소로 전달합니다. 

#### 지능형 트래픽 라우팅 및 로드 밸런싱 규칙 {#intelligent-traffic-routing--load-balancing-rules}

로드 밸런서는 두 가지 주요 요소를 기준으로 클라이언트 요청을 분산합니다. 

  * **배포 규칙:** 트래픽은 세션 선호도 또는 로드 밸런싱 알고리즘에 따라 분할됩니다(예: **클라이언트 IP 주소** 또는 **클라이언트 TCP 포트** 분석).
  * **노드 가용성:** 트래픽은 SafeKit 상태 점검을 통해 정상으로 판정된 노드로만 라우팅됩니다.


> **⚠️ 참고:** SafeKit 는 상태 확인 로직을 제공합니다. 물리적 또는 가상 로드 밸런서는 네트워크 인프라에서 제공해야 합니다.

#### SafeKit 건강 점검 메커니즘 {#safekit-health-check-mechanism}

SafeKit `farm` 에 있는 모든 서버에 실시간 **상태 확인 URL** 제공하여 로드 밸런서에 운영 상태를 전달합니다. 

  * **노드가 작동 중입니다:** 상태 확인 결과 `HTTP 200 OK` 반환되었습니다. 로드 밸런서가 이 서버를 활성 로테이션에 포함시켰습니다.
  * **노드 다운/페일오버:** 서버 또는 애플리케이션에 장애가 발생하면 SafeKit `HTTP 404 NOT FOUND` 반환하거나 서비스에 연결할 수 없게 됩니다. 로드 밸런서는 장애가 발생한 노드로의 트래픽 전송을 즉시 중단합니다.


#### 클라우드 배포 표준: AWS , Azure , GCP , {#cloud-deployment-standards-aws-azure-and-gcp}

이 아키텍처는 **클라우드 `Farm` 클러스터,** 의 기본 모델로서, 전체 서브넷 또는 영역이 오프라인 상태가 되더라도 나머지 노드가 계속해서 부하를 처리할 수 있도록 보장합니다. 이는 다음에서 기본적으로 지원됩니다. 

  * 💡 [ **Amazon AWS** ](</ko/solutions/aws-load-balancing-cluster-failover/>) ( AWS 네트워크 로드 밸런서)
  * 💡 [ **Microsoft Azure** ](</ko/solutions/azure-load-balancing-cluster-failover/>) ( Azure 로드 밸런서)
  * 💡 [ **Google Cloud ( GCP )** ](</ko/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud 로드 밸런싱)


## 가상 IP와 DNS 리디렉션 비교: DNS 페일오버가 자주 실패하는 이유 {#virtual-ip-vs-dns-redirection-failover}

### DNS 전파 함정: VIP가 DNS 리디렉션보다 우수한 성능을 보이는 이유 {#the-dns-propagation-trap-why-vips-outperform-dns-redirection}

고가용성 아키텍처에서 장애 조치를 위해 DNS에 의존하는 것은 종종 **보안 인식** 초래합니다. 백업 서버를 가리키도록 DNS 레코드를 수정하는 것이 간단한 복구 경로처럼 보이지만, 이는 **불가능한 지연** 이라는 중요한 변수를 도입합니다. DNS 기반 리디렉션은 변경 사항을 인지하고 전파하기 위해 제어되지 않는 중간 재귀 해석기 생태계에 의존하기 때문에 현대 기업 서비스의 "제로 다운타임" 요구 사항과 근본적으로 양립할 수 없습니다. 

### 기술적 시나리오: DNS 확인 및 "멈춘" 클라이언트 {#the-technical-scenario-dns-resolution-and-the-stuck-client}

일반적인 네트워크 구성에서 **가상 이름(DNS 이름)** 사용자가 읽을 수 있는 진입점 역할을 합니다. 하지만 데이터가 네트워크를 통해 전송되려면 해당 이름이 특정 **물리적 IP 주소** 로 확인되어야 합니다. 

고가용성 클러스터에서 물리적 IP 1에 대한 DNS 이름 확인을 보여주는 다이어그램 ![ ](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 고가용성 클러스터에서 물리적 IP 1에 대한 DNS 확인 및 "멈춤" 현상

#### 현재 상태: 물리적 IP 1 로 해결됨 {#current-state-resolution-to-physical-ip-1}

처음에 **클라이언트 1** 과 **클라이언트 2는** DNS 시스템에 가상 이름을 질의합니다. 시스템은 **물리적 IP 주소 1을** 반환합니다. 그러면 클라이언트들은 해당 하드웨어 주소에 직접 네트워크 연결(소켓)을 설정합니다. 

#### 장애 조치 과제: 물리적 IP 2 로 재라우팅 {#the-failover-challenge-rerouting-to-physical-ip-2}

물리적 IP 1의 서버에 장애가 발생하면 관리자는 DNS 레코드를 **물리적 IP 2** 를 가리키도록 업데이트합니다. 클라이언트를 성공적으로 재라우팅하려면 "완벽한" 순서로 진행되어야 합니다. 

  * **TTL(Time to Live) 값인** 모든 중간 ISP 및 기업 리졸버에서 만료되어야 합니다.
  * 클라이언트 1과 클라이언트 2 모두의 로컬 DNS 캐시를 비워야 합니다.
  * 애플리케이션은 기존 소켓을 닫고 새로운 DNS 조회를 시작해야 합니다.

이러한 단계 중 하나라도 누락되면 **클라이언트 1과 클라이언트 2는 사용되지 않는 물리적 IP 1과 통신을 시도하는** 상태에 계속 머물러 있게 되므로 DNS 레코드가 업데이트되었음에도 불구하고 서비스 중단이 발생합니다. 

### DNS 리디렉션의 두 가지 "블랙박스" {#the-two-black-boxes-of-dns-redirection}

  * **재귀적 캐싱:** 많은 인터넷 서비스 제공업체(ISP)와 기업 DNS 확인자는 트래픽을 줄이기 위해 낮은 TTL 설정을 무시하고, 요청된 만료 시간 이후에도 몇 분 또는 몇 시간 동안 "이전" 물리적 IP 1을 캐싱하는 경우가 많습니다.
  * **애플리케이션 지속성:** 최신 애플리케이션(예: Java 기반 마이크로서비스 또는 웹 브라우저)은 시작 시 한 번만 DNS 조회를 수행하는 경우가 많습니다. DNS 레코드가 물리적 IP 2로 업데이트되더라도 애플리케이션은 내부 메모리에 저장된 초기 IP를 계속 사용합니다.


### 결론 {#conclusion}

DNS 리디렉션은 고가용성 솔루션에 적합하지 않은 해결책입니다. 로컬 또는 지역 환경 내에서 즉각적인 장애 조치를 위해서는 소프트웨어 정의 **가상 IP(VIP)** 만이 가동 중지 시간 없는 지속적인 서비스 제공을 보장하는 유일한 방법입니다. 

## 비교: 가상 IP 구현, 지연 시간 및 애플리케이션 투명성 {#vip-vs-dns-comparison}

**고가용성 및 재해 복구를 위한 가상 IP(VIP) 리디렉션 방식과 DNS 재라우팅 방식의 기술적 비교.**

환경 및 사용 사례 | 고가용성 유형 | 리디렉션 메커니즘 | 네트워크 지연 시간 | 애플리케이션 투명성 및 IP 지역성  
---|---|---|---|---  
기본/백업(고가용성) | Mirror 클러스터 | 무상 ARP/MAC 테이크오버 | 매우 낮음: GARP 감지 및 브로드캐스트 전송 시간 | 완전 투명성: 가상 IP는 활성 노드의 로컬 IP입니다. 클라이언트 IP는 유지됩니다.  
로드 밸런싱(액티브/액티브) | `Farm` 클러스터 | 커널 레벨 네트워크 필터/GARP | 매우 낮음: 네트워크 필터 감지 및 재구성 시간 | 완전 투명성: 가상 IP는 모든 노드에서 로컬입니다. 클라이언트 IP는 유지됩니다.  
동일 서브넷/확장 LAN(VLAN 확장) | 재해 복구(원격 데이터 센터) | 표준 IP 별칭/GARP | 낮음: 확장된 VLAN의 RTT(왕복 시간)에 따라 다름 | 완전 투명성: 가상 IP는 노드에서 로컬입니다. 클라이언트 IP는 유지됩니다.  
다른 서브넷 | 재해 복구(원격 데이터 센터/클라우드) | 외부 로드 밸런서 | 보통: 로드 밸런서 상태 확인 간격으로 인해 장애 조치 지연 시간이 더 길어질 수 있음 | ⚠️ 부분 투명성: SNAT/DNAT를 사용합니다. 가상 IP는 노드에서 로컬로 **가 아닌** 입니다. 클라이언트 IP는 **가 아닌** 로 유지됩니다. 애플리케이션에서 이를 지원해야 합니다.  
DNS 재라우팅: VIP 없음 | 재해 복구(원격 데이터 센터) | DNS 레코드 업데이트(이름/물리적 IP) | 높음/예측 불가능: DNS TTL(Time To Live) 및 클라이언트 DNS 캐싱에 따라 다름. | ⚠️ 불안정: 클라이언트가 DNS를 다시 확인해야 합니다. 대부분의 경우 클라이언트는 시작 시 확인된 오래된 IP를 계속 사용하며 장애 조치 후에도 재라우팅되지 않습니다.  
  
## 네트워크 부하 분산 및 고가용성을 위한 가상 IP 주소 구성 {#virtual-ip-configuration-load-balancing-ha}


{{%  insert-safekit-farm-video-ko  %}}
 

## 가상 IP(VIP) 관련 자주 묻는 질문 {#virtual-ip-faq}

### 가상 IP(VIP) 및 네트워킹 {#virtual-ip-vip--networking}

가상 IP(VIP)란 무엇이며 물리적 IP와는 어떻게 다른가요?

**물리적 IP 주소는** 특정 네트워크 인터페이스에 바인딩되는 반면, **가상 IP(VIP)** 는 하드웨어와 무관한 "유동적인" 주소입니다. SafeKit 클러스터에서 VIP는 영구적인 진입점 역할을 합니다. 기본 서버에 장애가 발생하면 VIP는 자동으로 정상적인 보조 노드로 마이그레이션되어 클라이언트 재구성이 필요 없습니다.

가상 IP를 사용하려면 하드웨어 로드 밸런서가 필요한가요?

아니요. **SafeKit 고가용성 소프트웨어** 소프트웨어 수준에서 가상 IP를 관리합니다. 동일 서브넷 아키텍처에서 **IP 별칭** 및 **GARP(Gratuitous ARP)** 를 사용하여 트래픽을 리디렉션합니다. 이를 통해 외부 하드웨어 로드 밸런서 또는 전용 프록시 서버에 대한 비용과 복잡성을 줄일 수 있습니다.

GARP(Gratuitous ARP)란 무엇이며 왜 사용되는가?

**Gratuitous ARP(GARP)** 는 네트워크 스위치와 라우터의 ARP 테이블을 업데이트하는 네트워크 브로드캐스트입니다. 장애 조치 시, 새로운 기본 서버는 GARP 패킷을 전송하여 **가상 IP** 이제 자신의 MAC 주소에 매핑되었음을 알리고, 네트워크 패브릭 전체에 걸쳐 트래픽을 즉시 재라우팅합니다.

DNS 이름을 가상 IP 주소와 연결할 수 있나요?

**예.** 표준 A 레코드를 생성하여 DNS 이름을 VIP와 연결할 수 있습니다. 가장 큰 장점은 리디렉션이 **DNS 수준이 아닌** **VIP 수준** (ARP 또는 네트워크 리디렉션을 통해)에서 관리된다는 것입니다. 이를 통해 DNS 전파 및 TTL 만료와 관련된 지연을 방지하여 **애플리케이션의 투명성을** 보장할 수 있습니다.

### 클라우드 및 고급 아키텍처 {#cloud--advanced-architectures}

클라우드 환경에서 가상 IP( AWS , Azure , GCP )는 어떻게 작동하나요?

레이어 2(ARP)가 제한된 클라우드 환경에서 SafeKit 는 **클라우드 로드 밸런서(** AWS ELB, Azure LB 또는 Google GCLB)와 통합됩니다. SafeKit 플랫폼이 SNAT/DNAT를 사용하여 활성 노드로 트래픽을 라우팅하기 위해 모니터링하는 **상태 확인 URL** )을 제공합니다.

재해 복구에 있어 확장형 LAN이 로드 밸런서보다 더 나은 선택일까요?

**예** . 원격 데이터센터의 경우, **확장 LAN(스트레치드 VLAN)은** 사이트 간 **애플리케이션 투명성을** 유지하기 때문에 종종 더 우수합니다. **동일한 가상 IP를** 유지함으로써 애플리케이션과 클라이언트는 동일한 ID를 사용하여 계속 통신할 수 있으므로 데이터센터 간 전환이 완전히 매끄럽게 이루어집니다.

DNS 리라우팅과 가상 IP의 한계점은 무엇인가요?

**DNS 재라우팅** 는 **TTL(Time to Live)** 및 클라이언트 측 캐싱에 의해 제한되어 복구가 몇 시간 지연될 수 있습니다. 주요 단점은 DNS 이름을 다시 확인하지 못하는 **클라이언트가 실패한 서버에 연결을 시도하는 데 계속 머물러 있다는 것입니다.** 반면, **가상 IP** 는 모든 트래픽을 즉시 재라우팅하는 즉각적인 레이어 2 페일오버를 제공하여 클라이언트 측 DNS 캐시 상태와 관계없이 연결을 보장합니다.

### 투명성 및 보안 {#transparency--security}

애플리케이션 투명성을 위해 로컬 가상 IP가 중요한 이유는 무엇입니까?

로컬 **가상 IP(VIP)는** 소프트웨어가 영구적인 VIP에 바인딩할 수 있도록 하여 **애플리케이션의 투명성을** 보장합니다. SafeKit **커널 수준** 에서 리디렉션을 처리하므로 바인딩된 IP가 변경되는 DNAT 솔루션과 달리 애플리케이션은 클러스터 장애 조치를 인지하지 못합니다.

가상 IP를 사용하면 클라이언트의 원래 IP 주소가 유지됩니까?

예. SafeKit 소스 네트워크 주소 변환(SNAT)을 사용하지 않습니다. VIP가 활성 서버에 로컬로 위치하기 때문에 애플리케이션은 **원래 클라이언트 IP를** 수신하게 되는데, 이는 보안 감사, 세션 지속성 및 규정 준수 로깅에 매우 중요합니다.


{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}