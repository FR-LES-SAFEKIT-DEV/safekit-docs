---
title: "고가용성 클러스터링에서 가상 IP 주소(VIP)가 어떻게 작동합니까?"
canonical: "https://safekit.eviden.com/ko/best-practises/how-a-virtual-ip-address-works/"
description: "SafeKit이 소프트웨어 정의 가상 IP(VIP) 주소를 사용하여 연중무휴 가동 시간을 보장하는 방법을 알아보세요. Gratuitous ARP를 통한 자동화된 장애 조치에 대해 알아보고 이것이 Windows 및 Linux의 비즈니스 연속성을 위해 DNS 리디렉션보다 뛰어난 이유를 알아보세요."
category: "best-practises"
lang: "ko"
topics: "고가용성 클러스터의 가상 IP 주소란 무엇입니까?, SafeKit의 가상 IP 구현, 목차, 동일한 서브넷 장애 조치(미러 클러스터)에서 가상 IP 주소(VIP)가 작동하는 방식, 서로 다른 서브넷에서 가상 IP(VIP)가 작동하는 방식(미러 클러스터), 동일한 서브넷 팜(팜 클러스터)에서 부하 분산된 가상 IP가 작동하는 방식, 서로 다른 서브넷에서 부하 분산된 가상 IP가 작동하는 방식(팜) 클러스터), 가상 IP 대 DNS 리디렉션: DNS 장애 조치가 자주 실패하는 이유, 비교: 가상 IP 구현, 대기 시간 및 애플리케이션 투명성, 네트워크 로드 밸런싱 및 고가용성을 위한 가상 IP 주소 구성, 가상 IP(VIP)에 대해 자주 묻는 질문, 🔍 SafeKit 고가용성 탐색 허브"
---

# 고가용성 클러스터링에서 가상 IP 주소(VIP)가 어떻게 작동합니까? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## 고가용성 클러스터의 가상 IP 주소란 무엇입니까? {#virtual-ip-definition}

  * **정의:** **가상 IP(VIP) 주소**는 지속적인 애플리케이션 액세스를 보장하기 위해 [고가용성 클러스터링](</ko/>)에서 사용되는 유동 네트워크 주소입니다. 표준 IP와 달리 VIP는 특정 물리적 하드웨어 인터페이스에 바인딩되지 않지만 클러스터 노드 간에 이동하여 클라이언트에 대한 단일 영구 진입점을 유지합니다.
  * **하드웨어가 필요하지 않습니다:** SafeKit은 다음을 사용하여 소프트웨어 수준에서 VIP를 관리합니다. **무료 ARP(GARP)** , 동일한 서브넷 환경에서 외부 로드 밸런서가 필요하지 않습니다.
  * **애플리케이션 투명성:** 로컬 VIP에 바인딩함으로써 애플리케이션은 장애 조치 이벤트를 인지하지 못하고 클라이언트 소스 IP와 기존 보안 구성을 보존합니다.
  * **재해 복구:** **확장 LAN**을 사용하면 원격 데이터 센터 전체에서 동일한 VIP를 사용할 수 있으므로 복잡한 DNS 재라우팅 및 TTL 캐싱 지연에 비해 사이트 간 장애 조치가 단순화됩니다.


## SafeKit의 가상 IP 구현 {#safekit-vip-implementation}

  * **미러 클러스터:** 실시간 복제 및 장애 조치를 용이하게 하기 위해 기본 서버에서만 활성화되는 유동 IP를 제공합니다.
  * **팜 클러스터:** 모든 노드에서 동시에 VIP를 유지하여 네트워크 부하 분산을 활성화합니다.


**주요 이점:** VIP는 **Gratuitous ARP(주소 확인 프로토콜)** 또는 **MAC 주소 인계**를 활용하여 수동 클라이언트 재구성 없이 원활한 애플리케이션 장애 조치를 허용하여 연중무휴 비즈니스 연속성을 보장합니다.

  * **클라우드 및 다중 서브넷:** 외부 로드 밸런서 상태 확인(AWS, Azure, GCP)을 통해 관리되어 다양한 서브넷에 걸쳐 트래픽을 리디렉션합니다.


![Evidian SafeKit의 가상 IP(VIP) 동작 비교 다이어그램: 활성 노드에 유동 IP를 표시하는 미러 클러스터와 모든 노드에 걸쳐 네트워크 부하 분산을 표시하는 팜 클러스터.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**SafeKit의 미러 및 팜 클러스터에 대한 가상 IP 구현 전략.**


{{%  insert-safekit-4-buttons-ko  %}}
 

## 목차 {#table-of-contents}

  * [동일 서브넷 장애 조치(미러 클러스터)에서 가상 IP 주소(VIP)가 작동하는 방식](#virtual-ip-same-subnet-failover)
  * [VIP(가상 IP)가 여러 서브넷에서 작동하는 방식(미러 클러스터)](#virtual-ip-different-subnets-failover)
  * [동일 서브넷 팜(팜 클러스터)에서 로드 밸런싱된 가상 IP가 작동하는 방식](#vip-load-balancing-same-subnet)
  * [로드 밸런싱된 가상 IP가 여러 서브넷에서 작동하는 방식(팜 클러스터)](#vip-load-balancing-different-subnets)
  * [가상 IP와 DNS 리디렉션: DNS 장애 조치가 자주 실패하는 이유](#virtual-ip-vs-dns-redirection-failover)
  * [비교: 가상 IP 구현, 대기 시간 및 애플리케이션 투명성](#vip-vs-dns-comparison)
  * [네트워크 부하 분산 및 고가용성을 위한 가상 IP 주소 구성](#virtual-ip-configuration-load-balancing-ha)
  * [가상 IP(VIP)에 대해 자주 묻는 질문](#virtual-ip-faq)
  * [🔍 SafeKit 고가용성 탐색 허브](#hub)


## 동일한 서브넷 장애 조치(미러 클러스터)에서 가상 IP 주소(VIP)가 작동하는 방식 {#virtual-ip-same-subnet-failover}

### 로컬 서브넷의 자동 장애 조치 및 네트워크 재라우팅 {#automated-failover--network-rerouting-in-a-local-subnet}

로컬 인프라 내에서 원활한 비즈니스 연속성이 필요한 조직을 위해 **로컬 네트워크 클러스터를 위한 SafeKit 소프트웨어 정의 고가용성**은 가상 IP 주소 및 실시간 애플리케이션 장애 조치를 관리하기 위한 강력하고 자동화된 솔루션을 제공합니다. 

### 로컬 미러 클러스터: 원활한 2노드 Windows 또는 Linux 장애 조치 {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![동일한 서브넷에 있는 두 서버 간의 SafeKit 가상 IP(VIP) 장애 조치 메커니즘](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

 SafeKit VIP 앨리어싱 및 MAC 주소 매핑 표준 **SafeKit 미러 클러스터** 두 노드가 모두 동일한 로컬 서브넷에 있는 경우 고가용성은 다음을 통해 달성됩니다. **소프트웨어 정의 가상 IP(VIP)**. 하드웨어 기반 솔루션과 달리 SafeKit은 OS 네트워킹 스택 내에서 이 VIP를 직접 관리합니다. 이 VIP는 다음을 통해 서버 1과 서버 2의 고유한 물리적 IP 주소 위에 계층화되어 클라이언트에 대한 지속적인 논리적 진입점 역할을 합니다. **IP 앨리어싱**. 

#### SafeKit의 고급 IP 앨리어싱 및 다중 VIP 지원 {#safekits-advanced-ip-aliasing--multiple-vip-support}

**SafeKit 솔루션**의 주요 장점은 네트워크 ID 관리의 유연성입니다. VIP는 노드 사이에 "떠다니는" 세 번째 IP 주소입니다. 특히 SafeKit는 단일 클러스터 내에서 **여러 가상 IP 주소**를 관리할 수 있습니다. 이는 동일한 기본 이더넷 카드에 할당되거나 서로 다른 물리적 카드에 분산될 수 있으므로 다양한 서비스가 특정 가상 ID에 바인딩되는 복잡한 구성이 가능합니다. 

#### 장애 조치 메커니즘: 무료 ARP(GARP) {#the-failover-mechanism-gratuitous-arp-garp}

SafeKit은 하드웨어 오류 발생 시 수동 개입이 전혀 발생하지 않도록 보장합니다. 일반 작업에서 VIP는 다음과 같이 매핑됩니다. **서버 1의 MAC 주소(mac1)**. SafeKit이 서버 1에서 하트비트 오류를 ​​감지하면 2단계 복구를 실행합니다. 

  * **애플리케이션 복구:** SafeKit는 서버 2에서 중요한 애플리케이션 서비스를 자동으로 다시 시작합니다.
  * **네트워크 재라우팅:** SafeKit은 즉시 방송합니다. **무료 ARP(GARP)** 메시지. 이렇게 하면 모든 네트워크 스위치와 연결된 클라이언트의 ARP 캐시가 강제 업데이트되어 VIP를 다음으로 다시 매핑합니다. **서버 2의 MAC 주소(mac2)**.


#### 원격 데이터 센터 및 확장 VLAN {#remote-data-centers--extended-vlans}

일반적으로 로컬 클러스터에 사용되지만 **SafeKit의 동일 서브넷 알고리즘** 에 선호되는 선택입니다. **재해 복구(DR)** 통해 연결된 원격 사이트 전반에 걸쳐 **확장 LAN 또는 확장 VLAN**. 이 "확장된" 아키텍처를 사용하면 지리적 거리에 걸쳐 단일 서브넷을 유지 관리하여 네트워크 토폴로지를 크게 단순화하고 복잡한 라우팅 프로토콜의 오버헤드를 피할 수 있습니다. 

> **⚠️ 참고:** Gratuitous ARP를 통한 레이어 2 재라우팅은 **가장 투명한 솔루션** 신청을 위해. 로드 밸런서를 사용한 레이어 3 재라우팅과 달리 **소스/대상 IP 변환(SNAT/DNAT)**. 애플리케이션은 원래 클라이언트 IP를 통해 직접 트래픽을 수신하고 가상 IP는 로컬로 구성됩니다. **많은 응용 프로그램이 선호합니다** 가상 IP를 로컬에서 확인하고 원래 클라이언트 IP를 직접 수신합니다. 이러한 투명성이 없으면 그들은 **예상대로 작동하지 않을 수 있습니다** 복잡한 네트워크 번역으로 인해.

## VIP(가상 IP)가 여러 서브넷에서 작동하는 방식(미러 클러스터) {#virtual-ip-different-subnets-failover}

### 로드 밸런서 통합을 통한 클라우드 지원 트래픽 오케스트레이션 {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

외부 네트워크 인프라를 활용함으로써 **다중 AZ 및 클라우드 클러스터를 위한 SafeKit 소프트웨어 정의 고가용성**은 **네트워크 로드 밸런서**와 원활하게 통합되어 별도의 서브넷과 가용성 영역에서 트래픽 장애 조치를 조정합니다. 

### 교차 서브넷 미러 클러스터: Windows 및 Linux 구현 {#cross-subnet-mirror-clusters-windows--linux-implementation}


![두 개의 서로 다른 서브넷에서 로드 밸런서를 사용하는 가상 IP 장애 조치 다이어그램](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

 로드 밸런서 상태 확인을 통한 다중 서브넷 트래픽 라우팅 **다른 서브넷** , 표준 ARP 기반 장애 조치는 불가능합니다. 이 시나리오에서는 **가상 IP(VIP)** 에서 호스팅됩니다 **로드 밸런서(LB)** 서버의 이더넷 카드가 아닌 Load Balancer는 실시간 가용성을 기반으로 기본 및 보조 노드의 물리적 IP 주소로 트래픽을 전달하는 게이트웨이 역할을 합니다. 

#### SafeKit 상태 확인을 통한 동적 라우팅 {#dynamic-routing-via-safekit-health-checks}

SafeKit는 각 노드에 전용 **상태 확인 URL**을 제공하여 트래픽 조정을 관리합니다. Load Balancer는 다음 URL을 쿼리하여 클러스터 상태를 확인합니다. 

  * **기본 노드(PRIM):** 상태 확인은 `HTTP 200 OK`를 반환합니다. Load Balancer는 모든 트래픽을 여기로 전달합니다.
  * **보조 노드(SECOND):** 상태 확인은 `HTTP 404 NOT FOUND`를 반환합니다. Load Balancer는 이 노드에 트래픽을 보내지 않습니다.

**장애 조치 이벤트** 중에 SafeKit는 상태 확인 응답을 즉시 전환하여 로드 밸런서를 트리거하여 클라이언트 트래픽을 새로운 기본 서버로 다시 라우팅합니다. 

> **⚠️ 참고:** SafeKit는 상태 확인 논리를 제공합니다. 물리적 또는 가상 Load Balancer는 네트워크 인프라에서 제공되어야 합니다.

#### 클라우드 통합: AWS, Azure 및 GCP {#cloud-integration-aws-azure-and-gcp}

이 "로드 밸런서 + 상태 확인" 모델은 **클라우드 고가용성**에 대한 업계 표준입니다. 다음과 같은 환경에서 SafeKit를 구현하는 데 필수적입니다. 

  * 💡 [**Amazon AWS**](</solutions/aws-high-availability-cluster-synchronous-replication-failover/>)(AWS 네트워크 로드 밸런서)
  * 💡 [**Microsoft Azure**](</solutions/azure-high-availability-cluster-synchronous-replication-failover/>)(Azure 로드 밸런서)
  * 💡 [**Google Cloud(GCP)**](</solutions/gcp-high-availability-cluster-synchronous-replication-failover/>)(Google Cloud 부하 분산)


#### 네트워크 고려 사항: 로드 밸런서와 확장 LAN {#network-considerations-load-balancer-vs-extended-lan}

로드 밸런서를 원하지 않는 경우 서브넷 간 **확장 LAN(VLAN 스트레칭)** 구현에 관해 네트워크 팀에 문의하세요. 이를 통해 더 간단한 "동일 서브넷" VIP 모델로 되돌릴 수 있습니다. 

> **⚠️ 참고:** Load Balancer를 선택할 때 애플리케이션이 다음과 호환되는지 확인하세요. **소스/대상 IP 변환(SNAT/DNAT)**. 로드 밸런서를 사용하면 애플리케이션이 원래 사용자의 ID를 추적하지 못하거나 자체 네트워크 인터페이스에 직접 구성된 가상 IP를 더 이상 볼 수 없기 때문에 시작하지 못할 수 있습니다.

## 동일한 서브넷 팜(팜 클러스터)에서 로드 밸런싱된 가상 IP가 작동하는 방식 {#vip-load-balancing-same-subnet}

### 확장 가능한 성능: 커널 수준 로드 밸런싱 및 중복성 {#scalable-performance-kernel-level-load-balancing--redundancy}

트래픽이 많은 환경의 경우 **아키텍처 가이드: 다중 노드 팜 클러스터를 통한 확장 가능한 고가용성**에서는 SafeKit가 전체 중복성을 유지하면서 여러 활성 서버에 작업 부하를 분산하는 방법을 설명합니다. 

### 팜 클러스터 아키텍처: Windows 또는 Linux 노드 전반에 걸친 로드 밸런싱 {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


![동일한 서브넷 팜 클러스터 내의 부하 분산 VIP(가상 IP) 다이어그램](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

 커널 필터링을 통한 분산 트래픽 처리 **부하 분산 팜 클러스터**에서는 가상 IP(VIP) 주소를 사용하여 클라이언트 요청을 여러 서버에 동시에 분산시킵니다. 이 예에는 두 개의 노드가 포함되어 있지만 아키텍처는 더 큰 서버 팜을 지원하도록 확장됩니다. 동일한 서브넷 구성에서 VIP는 IP 별칭을 통해 클러스터에 있는 **모든 서버**의 이더넷 카드에 구성됩니다. 

#### 트래픽 분산: 커널 수준 필터 {#traffic-distribution-the-kernel-level-filter}

단순한 장애 조치 클러스터와 달리 팜 클러스터는 특수한 **커널 수준 필터**를 통해 트래픽을 관리합니다. 프로세스는 다음과 같이 작동합니다. 

  * **ARP 매핑:** 클라이언트의 ARP 캐시에서 VIP는 처음에 단일 하드웨어 주소(예: 서버 1의 `mac1`)와 연결됩니다.
  * **패킷 분할:** 서버 1이 트래픽을 수신하면 SafeKit 커널 필터는 수신 패킷의 ID를 분석합니다(**클라이언트 IP** 또는 **TCP 포트** 기반).
  * **로드 공유:** 필터는 로컬에서 처리해야 하는 패킷과 처리를 위해 다른 노드(예: 서버 2)로 리디렉션해야 하는 패킷을 결정하여 작업 부하의 균형을 보장합니다.


#### Gratuitous ARP를 사용한 장애 조치 및 재라우팅 {#failover-and-rerouting-with-gratuitous-arp}

기본 노드(서버 1)에 장애가 발생하면 클러스터는 다음을 통해 가용성을 유지합니다. **무료 ARP(GARP)**. SafeKit은 클라이언트 ARP 캐시를 업데이트하기 위해 GARP 메시지를 브로드캐스트합니다. `mac2` 서버 2. 이렇게 하면 기본 "진입점"이 실패하더라도 클라이언트가 즉시 팜의 남아 있는 노드로 다시 라우팅됩니다. 

#### 원격 사이트에 배포 {#deployment-in-remote-sites}

**원격 데이터 센터**에서 운영되는 조직의 경우 사이트가 **확장 LAN 또는 VLAN**을 통해 연결되어 있는 경우 이 부하 분산 알고리즘은 계속 작동합니다. 이렇게 하면 지리적으로 분산된 팜 클러스터에 가장 효율적인 구성인 가상 "동일 서브넷" 환경이 생성됩니다. 

## 로드 밸런싱된 가상 IP가 여러 서브넷에서 작동하는 방식(팜 클러스터) {#vip-load-balancing-different-subnets}

### 다중 영역 확장: 클라우드 서브넷 전체에서 트래픽 조정 {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

**아키텍처 가이드: 다중 영역 및 클라우드 환경에서 팜 클러스터 확장**은 별도의 가용성 영역과 서브넷에 애플리케이션 워크로드를 분산하기 위한 청사진을 제공합니다. 

### 교차 서브넷 팜 클러스터: 다중 노드 Windows 및 Linux 확장성 {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


![두 개의 서로 다른 서브넷에서 작동하는 부하 분산 팜 클러스터의 다이어그램](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

 외부 부하 분산을 통한 글로벌 트래픽 분산 팜 노드가 분산된 경우 **다른 서브넷** (다중 AZ 클라우드 배포에서 일반적) **가상 IP(VIP)** 외부에서 관리하고 있습니다 **로드 밸런서(LB)**. LB는 VIP를 보유하고 들어오는 트래픽을 해당 서브넷에 있는 서버의 물리적 IP 주소로 전달합니다. 

#### 지능형 트래픽 라우팅 및 로드 밸런싱 규칙 {#intelligent-traffic-routing--load-balancing-rules}

Load Balancer는 두 가지 주요 요소를 기반으로 클라이언트 요청을 분산합니다. 

  * **분배 규칙:** 트래픽은 세션 선호도 또는 부하 분산 알고리즘(예: **클라이언트 IP 주소** 또는 **클라이언트 TCP 포트** 분석)에 따라 분할됩니다.
  * **노드 가용성:** 트래픽은 SafeKit 상태 확인에 의해 결정된 정상 노드로만 라우팅됩니다.


> **⚠️ 참고:** SafeKit는 상태 확인 논리를 제공합니다. 물리적 또는 가상 Load Balancer는 네트워크 인프라에서 제공되어야 합니다.

#### SafeKit 상태 점검 메커니즘 {#safekit-health-check-mechanism}

SafeKit는 팜의 모든 서버에 실시간 **상태 확인 URL**을 제공하여 운영 상태를 로드 밸런서에 전달합니다. 

  * **노드 UP:** 상태 확인은 `HTTP 200 OK`를 반환합니다. Load Balancer는 활성 순환에 이 서버를 포함합니다.
  * **노드 작동 중지/장애 조치:** 서버 또는 애플리케이션에 오류가 발생하면 SafeKit는 `HTTP 404 NOT FOUND`를 반환합니다(또는 서비스에 연결할 수 없게 됩니다). Load Balancer는 장애가 발생한 노드로의 트래픽 전송을 즉시 중지합니다.


#### 클라우드 배포 표준: AWS, Azure 및 GCP {#cloud-deployment-standards-aws-azure-and-gcp}

이 아키텍처는 **클라우드 팜 클러스터**의 기본 모델로, 전체 서브넷이나 영역이 오프라인 상태가 되어도 나머지 노드가 계속해서 로드를 처리하도록 보장합니다. 이는 기본적으로 다음에서 지원됩니다. 

  * 💡 [**Amazon AWS**](</solutions/aws-load-balancing-cluster-failover/>)(AWS 네트워크 로드 밸런서)
  * 💡 [**Microsoft Azure**](</solutions/azure-load-balancing-cluster-failover/>)(Azure 로드 밸런서)
  * 💡 [**Google Cloud(GCP)**](</solutions/gcp-load-balancing-cluster-failover/>)(Google Cloud 부하 분산)


## 가상 IP와 DNS 리디렉션: DNS 장애 조치가 자주 실패하는 이유 {#virtual-ip-vs-dns-redirection-failover}

### DNS 전파 함정: VIP가 DNS 리디렉션보다 성능이 뛰어난 이유 {#the-dns-propagation-trap-why-vips-outperform-dns-redirection}

장애 조치를 위해 DNS에 의존하면 고가용성 아키텍처에서 **잘못된 보안 인식**이 발생하는 경우가 많습니다. 백업 서버를 가리키도록 DNS 레코드를 수정하는 것은 간단한 복구 경로처럼 보이지만 **예측할 수 없는 대기 시간**이라는 중요한 변수가 발생합니다. DNS 기반 리디렉션은 변경 사항을 인식하고 전파하기 위해 통제되지 않는 중간 재귀 확인자의 생태계에 의존하기 때문에 근본적으로 현대 기업 서비스의 "다운타임 제로" 요구 사항과 호환되지 않습니다. 

### 기술 시나리오: DNS 확인 및 "멈춘" 클라이언트 {#the-technical-scenario-dns-resolution-and-the-stuck-client}

표준 네트워킹 설정에서 **가상 이름**(DNS 이름)은 사용자가 읽을 수 있는 진입점 역할을 합니다. 그러나 데이터가 네트워크를 통해 이동하려면 해당 이름이 특정 **물리적 IP** 주소로 확인되어야 합니다. 

![고가용성 클러스터의 물리적 IP 1에 대한 DNS 이름 확인을 보여주는 다이어그램](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 고가용성 클러스터의 물리적 IP 1에서 DNS 확인 및 "고정" 클라이언트

#### 현재 상태: 물리적 IP 1에 대한 확인 {#current-state-resolution-to-physical-ip-1}

처음에 **클라이언트 1** 및 **클라이언트 2**는 DNS 시스템에 가상 이름을 쿼리합니다. 시스템은 **물리적 IP 1**을 반환합니다. 그런 다음 클라이언트는 해당 특정 하드웨어 주소에 대한 직접 네트워크 연결(소켓)을 설정합니다. 

#### 장애 조치 과제: 물리적 IP 2로 재라우팅 {#the-failover-challenge-rerouting-to-physical-ip-2}

물리적 IP 1의 서버에 오류가 발생하면 관리자는 **물리적 IP 2**를 가리키도록 DNS 레코드를 업데이트합니다. 클라이언트를 성공적으로 다시 라우팅하려면 "완벽한" 순서가 발생해야 합니다. 

  * 는 **TTL(수명)** 모든 중간 ISP 및 기업 확인자에서 만료되어야 합니다.
  * 클라이언트 1과 클라이언트 2 모두의 로컬 DNS 캐시를 플러시해야 합니다.
  * 애플리케이션은 기존 소켓을 닫고 _새_ DNS 조회를 시작해야 합니다.

이 단계 중 하나라도 놓친 경우 **클라이언트 1과 클라이언트 2는 "멈춘" 상태로 유지됩니다.** 죽은 물리적 IP 1과 통신을 시도하여 DNS 레코드 업데이트에도 불구하고 서비스 다운타임이 발생합니다. 

### DNS 리디렉션의 두 가지 "블랙박스" {#the-two-black-boxes-of-dns-redirection}

  * **재귀적 캐싱:** 많은 ISP(인터넷 서비스 제공업체) 및 기업 DNS 확인자는 트래픽을 줄이기 위해 낮은 TTL 설정을 무시하며 종종 요청된 만료 이후 몇 분 또는 몇 시간 동안 "이전" 물리적 IP 1을 캐싱합니다.
  * **애플리케이션 지속성:** 최신 애플리케이션(예: Java 기반 마이크로서비스 또는 웹 브라우저)은 시작 시 DNS 조회를 한 번만 수행하는 경우가 많습니다. DNS 레코드가 물리적 IP 2로 업데이트되더라도 애플리케이션은 내부 메모리에 저장된 초기 IP를 계속 사용합니다.


### 결론 {#conclusion}

DNS 리디렉션은 고가용성 솔루션에 대한 일관성 없는 솔루션입니다. 로컬 또는 지역 환경 내에서 즉각적인 장애 조치를 수행하려면 소프트웨어 정의 **가상 IP(VIP)** 다운타임 없는 지속성을 보장하는 유일한 방법입니다. 

## 비교: 가상 IP 구현, 지연 시간 및 애플리케이션 투명성 {#vip-vs-dns-comparison}

**고가용성 및 재해 복구를 위한 가상 IP(VIP) 리디렉션 방법과 DNS 재라우팅을 기술적으로 비교합니다.**

환경 및 사용 사례 | 고가용성 유형 | 리디렉션 메커니즘 | 네트워크 대기 시간 | 애플리케이션 투명성 및 IP 지역성  
---|---|---|---|---  
기본/백업(고가용성) | 미러 클러스터 | 무료 ARP/MAC 인계 | 매우 낮음: 브로드캐스트 GARP를 감지하고 전송하는 데 걸리는 시간 | 완전 투명성: 가상 IP는 활성 노드에서 로컬입니다. 클라이언트 IP는 보존됩니다.  
로드 밸런싱(활성/활성) | 농장 클러스터 | 커널 수준 네트워크 필터/GARP | 매우 낮음: 네트워크 필터를 감지하고 재구성하는 데 걸리는 시간 | 완전한 투명성: 가상 IP는 모든 노드에서 로컬입니다. 클라이언트 IP는 보존됩니다.  
동일 서브넷/확장 LAN(VLAN 스트레칭) | 재해 복구(원격 데이터 센터) | 표준 IP 앨리어싱/GARP | 낮음: 확장된 VLAN RTT(왕복 시간)에 따라 다름 | 완전 투명성: 가상 IP는 노드에서 로컬입니다. 클라이언트 IP는 보존됩니다.  
다른 서브넷 | 재해 복구(원격 데이터 센터/클라우드) | 외부 로드 밸런서 | 보통: Load Balancer 상태 확인 간격으로 인해 장애 조치 대기 시간이 길어짐 | ⚠️ 부분 투명성: SNAT/DNAT를 사용합니다. 가상 IP는 노드에서 로컬이 **아닙니다**. 클라이언트 IP는 **보존되지 않습니다**. 애플리케이션이 이를 지원해야 합니다.  
DNS 재라우팅: VIP 없음 | 재해 복구(원격 데이터 센터) | DNS 레코드 업데이트(이름/물리IP) | 높음/예측 불가능: DNS TTL(Time To Live) 및 클라이언트 DNS 캐싱에 따라 다릅니다. | ⚠️ 신뢰할 수 없음: 클라이언트는 DNS를 다시 확인해야 합니다. 대부분의 경우 클라이언트는 시작 시 해결된 오래된 IP를 계속 사용하고 장애 조치 후 다시 라우팅되지 않습니다.  
  
## 네트워크 부하 분산 및 고가용성을 위한 가상 IP 주소 구성 {#virtual-ip-configuration-load-balancing-ha}


{{%  insert-safekit-farm-video-ko  %}}
 

## 가상 IP(VIP)에 대해 자주 묻는 질문 {#virtual-ip-faq}

### 가상 IP(VIP) 및 네트워킹 {#virtual-ip-vip--networking}

VIP(가상 IP)란 무엇이며 실제 IP와 어떻게 다른가요?

동안 **물리적 IP 주소** 특정 네트워크 인터페이스에 바인딩되어 있습니다. **가상 IP(VIP)** 하드웨어와 무관한 "부동" 주소입니다. SafeKit 클러스터에서 VIP는 지속적인 진입점 역할을 합니다. 기본 서버에 장애가 발생하면 VIP는 자동으로 정상적인 보조 노드로 마이그레이션되어 클라이언트 재구성이 필요하지 않습니다.

가상 IP를 사용하려면 하드웨어 부하 분산 장치가 필요합니까?

아니요. **SafeKit 고가용성 소프트웨어** 소프트웨어 수준에서 가상 IP를 관리합니다. 동일한 서브넷 아키텍처에서는 다음을 활용합니다. **IP 앨리어싱** 그리고 **무료 ARP(GARP)** 트래픽을 리디렉션합니다. 이를 통해 외부 하드웨어 로드 밸런서 또는 전용 프록시 서버의 비용과 복잡성이 제거됩니다.

GARP(Gratuitous ARP)란 무엇이며 왜 사용됩니까?

**무료 ARP(GARP)** 네트워크 스위치와 라우터의 ARP 테이블을 업데이트하는 네트워크 브로드캐스트입니다. 장애 조치 중에 새 기본 서버는 GARP 패킷을 보내 다음을 알립니다. **가상 IP** 이제 MAC 주소에 매핑되어 네트워크 패브릭을 통해 트래픽을 즉시 다시 라우팅합니다.

DNS 이름을 가상 IP와 연결할 수 있나요?

**예.** 표준 A 레코드를 생성하여 DNS 이름을 VIP와 연결할 수 있습니다. 주요 이점은 리디렉션이 **DNS 수준이 아닌** (ARP 또는 네트워크 리디렉션을 통해) **VIP 수준**에서 관리된다는 점입니다. 이는 DNS 전파 및 TTL 만료와 관련된 지연을 방지하여 **애플리케이션 투명성**을 보장합니다.

### 클라우드 및 고급 아키텍처 {#cloud--advanced-architectures}

가상 IP는 클라우드(AWS, Azure, GCP)에서 어떻게 작동하나요?

레이어 2(ARP)가 제한된 클라우드 환경에서 SafeKit는 **Cloud Load Balancer**(AWS ELB, Azure LB 또는 Google GCLB)와 통합됩니다. SafeKit는 플랫폼이 SNAT/DNAT를 사용하여 활성 노드로 트래픽을 라우팅하기 위해 모니터링하는 **상태 확인 URL**을 제공합니다.

재해 복구를 위해 확장 LAN이 로드 밸런서보다 낫습니까?

**예**. 원격 데이터 센터의 경우 **확장 LAN(확장된 VLAN)** 유지하기 때문에 종종 우수합니다. **애플리케이션 투명성** 사이트 전반에 걸쳐. 유지함으로써 **동일한 가상 IP** , 애플리케이션과 해당 클라이언트는 동일한 ID를 사용하여 계속 통신하므로 데이터 센터 간의 전환이 완벽하게 원활해집니다.

DNS 재라우팅과 가상 IP의 제한 사항은 무엇입니까?

**DNS 재라우팅**은 **TTL(Time to Live)** 및 클라이언트 측 캐싱으로 제한되어 복구가 몇 시간 동안 지연될 수 있습니다. 가장 큰 단점은 **DNS 이름을 다시 확인하지 않은 클라이언트가 실패한 서버에 연결을 시도하면서 계속 멈춰 있다는 것**입니다. 이와 대조적으로 **가상 IP**는 모든 트래픽을 즉시 다시 라우팅하는 즉각적인 레이어 2 장애 조치를 제공하여 클라이언트 측 DNS 캐시 상태에 관계없이 연결을 보장합니다.

### 투명성 및 보안 {#transparency--security}

애플리케이션 투명성을 위해 로컬 가상 IP가 중요한 이유는 무엇입니까?

현지인 **가상 IP(VIP)** 보장 **애플리케이션 투명성** 소프트웨어가 영구 VIP에 바인딩되도록 허용합니다. SafeKit은 다음에서 리디렉션을 처리합니다. **커널 레벨** , 바인딩된 IP가 변경되는 DNAT 솔루션과 달리 애플리케이션이 클러스터 장애 조치를 인식하지 못하도록 합니다.

가상 IP를 사용하면 클라이언트의 원래 IP 주소가 보존됩니까?

예. SafeKit는 SNAT(소스 네트워크 주소 변환)를 방지합니다. VIP는 활성 서버에 대해 로컬이므로 애플리케이션은 보안 감사, 세션 지속성 및 규정 로깅에 중요한 **원래 클라이언트 IP**를 수신합니다.


{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}