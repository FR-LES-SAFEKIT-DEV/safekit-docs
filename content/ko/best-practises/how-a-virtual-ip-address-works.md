---
title: "고가용성 클러스터링에서 가상 IP 주소는 어떻게 작동합니까?"
canonical: "https://safekit.eviden.com/ko/best-practises/how-a-virtual-ip-address-works/"
description: "SafeKit이 장애 조치 시 가상 IP를 이동하는 방법: 동일 서브넷 내의 그라투이투스 ARP, 로드 밸런싱, 클라우드 CLI 또는 서브넷 간 BGP. 로컬 가상 IP가 중요한 이유."
category: "best-practises"
lang: "ko"
topics: "고가용성 클러스터에서 가상 IP 주소란 무엇인가요?, SafeKit에서의 가상 IP 구현, 동일 서브넷(mirror 클러스터)에서 가상 IP 주소의 작동 방식, 로드 밸런서를 사용한 서로 다른 서브넷(mirror 클러스터)에서 가상 IP의 작동 방식, 클라우드 공급자 CLI를 사용한 서로 다른 서브넷(mirror 클러스터)에서 가상 IP의 작동 방식, BGP를 사용한 서로 다른 서브넷(mirror 클러스터)에서 가상 IP의 작동 방식, 서로 다른 서브넷(mirror 클러스터)에서 DNS 리디렉션의 작동 방식, 동일 서브넷의 farm 클러스터에서 가상 IP 로드 밸런싱의 작동 방식, 로드 밸런싱된 가상 IP가 서로 다른 서브넷(farm 클러스터)에서 작동하는 방식, 비교: 가상 IP 구현, 지연 시간 및 애플리케이션 투명성, 가상 IP 관련 자주 묻는 질문, 🔍 SafeKit 살펴보기"
---

# 고가용성 클러스터링에서 가상 IP 주소는 어떻게 작동합니까? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## 고가용성 클러스터에서 가상 IP 주소란 무엇입니까? {#virtual-ip-definition}

**가상 IP 주소는** 클라이언트가 [고가용성 클러스터](</ko/>) 의 애플리케이션에 연결하는 데 사용하는 단일 주소입니다. 가상 IP는 특정 서버에 연결되어 있지 않습니다. 장애 조치가 발생하면 애플리케이션이 실행되는 서버로 이동합니다. 클라이언트는 구성을 변경할 필요가 없습니다.

**SafeKit의 핵심 원칙은** 가상 IP가 애플리케이션이 실행되는 **서버에서 로컬로 구성된다는 것** 입니다. 애플리케이션은 가상 IP에서 시작되고 원래 클라이언트 IP를 할당받습니다. 이것이 바로 많은 애플리케이션이 아무런 변경 없이 SafeKit에서 정상적으로 작동하는 이유입니다. SafeKit은 두 가지 유형의 가상 IP를 제공합니다.

  * **mirror 클러스터에서 기본/백업 가상 IP:** 가상 IP는 기본 서버에서만 활성화됩니다. 장애 조치가 발생하면 백업 서버로 이동합니다.
  * **<span class="notranslate farm-term" translate="no">farm</span> 클러스터에서 가상 IP를 사용한 네트워크 로드 밸런싱:** 가상 IP는 모든 서버에서 동시에 활성화됩니다. 트래픽은 서버 간에 분산됩니다.

## SafeKit의 가상 IP 구현 {#safekit-virtual-ip-implementation}

이 문서에서는 SafeKit이 각 네트워크 아키텍처에서 가상 IP를 이동하는 방법을 설명합니다.

  * **동일 서브넷 또는 확장 LAN([mirror](#virtual-ip-same-subnet-failover) 및 [<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-same-subnet) 클러스터):** SafeKit은 서버에 가상 IP를 구성하고 **GARP(gratuitous ARP)** 를 전송합니다. 외부 하드웨어는 필요하지 않습니다. 이는 SafeKit 제품에서 모든 기능을 구현하는 가장 투명한 솔루션입니다.
  * **로드 밸런서를 사용하는 서로 다른 서브넷([mirror](#virtual-ip-different-subnets-failover) 및 [<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-different-subnets) 클러스터):** 로드 밸런서는 SafeKit **상태 확인을** 사용하여 트래픽을 올바른 서버로 보냅니다(로드 밸런서는 시스템 통합자가 구성합니다).
  * **[클라우드 공급자 CLI를 사용하는 서로 다른 서브넷](#virtual-ip-cloud-cli-failover) (mirror 클러스터):** SafeKit `start_prim` 스크립트는 클라우드 CLI를 호출하여 가상 IP를 이동합니다(통합자가 작성한 스크립트).
  * **[BGP를 사용하는 서로 다른 서브넷](#virtual-ip-bgp-failover) (mirror 클러스터):** 기본 서버가 라우터에 가상 IP를 알립니다(통합자가 작성한 스크립트).
  * **[DNS 리디렉션을 사용하는 서로 다른 서브넷](#virtual-ip-vs-dns-redirection-failover) (mirror 클러스터):** SafeKit의 `start_prim` 스크립트는 가상 이름의 DNS 레코드를 새 기본 서버의 물리적 IP 주소로 변경합니다(통합업체에서 작성한 스크립트). 단일 가상 IP 주소가 사용되지 않으므로 이 방법은 모든 클라이언트에 대해 신뢰할 수 있는 것은 아닙니다.

이 기사에는 다음 내용도 포함되어 있습니다.

  * [비교: 가상 IP 구현, 지연 시간 및 애플리케이션 투명성](#virtual-ip-methods-comparison)
  * [가상 IP에 대한 자주 묻는 질문](#virtual-ip-faq)
  * [🔍 SafeKit 살펴보기](#hub)

![Eviden SafeKit의 가상 IP 동작 비교 다이어그램: 활성 노드에 floating IP 표시되는 Mirror 클러스터와 모든 노드에 걸쳐 네트워크 로드 밸런싱이 표시되는 farm 클러스터.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**SafeKit에서 mirror 및 <span class="notranslate farm-term" translate="no">farm</span> 클러스터를 위한 가상 IP 구현.**

## 동일 서브넷(mirror 클러스터)에서 가상 IP 주소가 작동하는 방식 {#virtual-ip-same-subnet-failover}

- [SafeKit mirror 클러스터에서 기본/백업 가상 IP 주소 테스트](/ko/best-practises/test-primary-backup-vip-mirror/)

### 로컬 서브넷에서의 자동 장애 조치 및 네트워크 재라우팅 {#automated-failover--network-rerouting-in-a-local-subnet}

로컬 네트워크에서 **SafeKit은** 가상 IP 주소와 애플리케이션 장애 조치를 자동으로 관리합니다.

### 로컬 mirror 클러스터: Windows 또는 Linux 기반 2노드 페일오버 {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![SafeKit 가상 IP 장애 조치 메커니즘은 동일 서브넷 내 두 서버 간에 작동합니다.](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

**SafeKit mirror 클러스터** 에서 두 노드는 동일한 서브넷에 있습니다. 고가용성은 **가상 IP를** 사용합니다. SafeKit은 운영 체제의 네트워크 스택에서 가상 IP를 관리합니다. 특별한 하드웨어는 필요하지 않습니다. 가상 IP는 **IP 별칭을** 사용하여 서버 1과 서버 2의 물리적 IP 주소에 추가됩니다. 클라이언트는 항상 가상 IP에 연결합니다.

#### SafeKit의 IP 별칭 및 다중 가상 IP(VIP) {#safekits-advanced-ip-aliasing--multiple-virtual-ip-support}

가상 IP는 노드 간에 이동하는 세 번째 IP 주소입니다. SafeKit은 하나의 클러스터에서 **여러 개의 가상 IP 주소를** 관리할 수 있습니다. 이러한 가상 IP 주소는 동일한 네트워크 카드 또는 서로 다른 네트워크 카드에 할당할 수 있습니다. 이렇게 하면 각 서비스가 고유한 가상 IP 주소를 사용할 수 있습니다.

#### 장애 조치 메커니즘: GARP(gratuitous ARP) {#the-failover-mechanism-gratuitous-arp-garp}

장애 조치는 수동 작업이 필요하지 않습니다. 정상 작동 시 가상 IP는 **서버 1(mac1)의 MAC 주소** 에 연결됩니다. 서버 1에 장애가 발생하면 SafeKit은 다음 세 가지 작업을 수행합니다.

  * **가상 IP 별칭 설정:** SafeKit은 새로운 기본 서버인 서버 2의 네트워크 카드에 가상 IP를 별칭으로 구성합니다. 그러면 운영 체제는 네트워크를 통해 가상 IP를 알리는 메시지를 전송합니다.
  * **GARP:** SafeKit은 **GRARP(gratuitous ARP)** 메시지도 전송합니다. 네트워크 스위치와 클라이언트는 ARP 캐시를 업데이트합니다. 이제 가상 IP는 **서버 2(mac2)의 MAC 주소** 에 연결됩니다.
  * **애플리케이션 복구:** SafeKit은 서버 2에서 애플리케이션 서비스를 다시 시작합니다.


#### 원격 데이터 센터 및 확장 VLAN {#remote-data-centers--extended-vlans}

**위에서 설명한 동일 서브넷 솔루션은** 원격 사이트 간 **재해 복구(DR)** 에도 효과적이며, 사이트들이 **확장된 LAN이나 확장된 VLAN** 으로 연결된 경우 최적의 선택인 경우가 많습니다. 두 사이트 모두 하나의 서브넷에 속하게 되므로 네트워크가 단순해지고 복잡한 라우팅 프로토콜이 필요하지 않습니다.

> **⚠️ 주의:** 그라투이투스 ARP를 사용한 레이어 2 재라우팅은 애플리케이션에 **가장 투명한 솔루션** 입니다. 애플리케이션은 원래 클라이언트 IP를 수신하고, 가상 IP는 로컬에서 구성됩니다. **많은 애플리케이션은 로컬 가상 IP가 필요하며**, 가상 IP가 없으면 **제대로 작동하지 않을 수 있습니다**. 동일 서브넷 설정에서 SafeKit은 전체 메커니즘을 구현하므로 별도의 통합 작업이 필요하지 않습니다.

## 로드 밸런서(mirror 클러스터)를 사용하여 서로 다른 서브넷에서 가상 IP가 작동하는 방식 {#virtual-ip-different-subnets-failover}

### SafeKit 상태 점검 기능을 갖춘 로드 밸런서 {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![로드 밸런서를 사용하여 서로 다른 두 서브넷에 걸쳐 가상 IP 장애 조치를 구현한 다이어그램](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

노드들이 **서로 다른 서브넷** 에 있는 경우, 그라투이투스 ARP는 가상 IP를 이동할 수 없습니다. 이 경우 가상 IP는 **로드 밸런서** 에 있으며, 로드 밸런서는 트래픽을 기본 서버로 보냅니다.

SafeKit은 각 노드에 대한 **상태 확인 URL을** 제공합니다.

  * **기본 노드(PRIM):** `HTTP 200 OK`. 응답을 반환합니다. 로드 밸런서가 트래픽을 이 노드로 보냅니다.
  * **보조 노드(SECOND):** `HTTP 404 NOT FOUND`. 반환합니다. 로드 밸런서는 이 노드로 트래픽을 보내지 않습니다.

장애 조치가 발생하면 SafeKit은 응답을 변경하고 로드 밸런서는 트래픽을 새로운 기본 서버로 보냅니다. 이는 [**AWS**](</ko/solutions/aws-high-availability-cluster-synchronous-replication-failover/>), [**Azure**](</ko/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) 및 [**Google Cloud**](</ko/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>) 의 **가용 영역** 간 표준 솔루션입니다.

> **⚠️ 주의:** SafeKit은 네트워크 상태 점검을 제공합니다. 로드 밸런싱은 사용자의 네트워크 또는 클라우드 제공업체에서 제공합니다.

### 문제점: 로드 밸런서가 가상 IP를 소유하고 있습니다. {#the-load-balancer-pitfall-virtual-ip-on-the-frontend-nat-to-the-physical-ip}

로드 밸런싱만 사용하는 경우 클라이언트는 가상 IP로 연결됩니다. 로드 밸런서는 가상 IP를 기본 서버의 **물리적 IP** 로 변환(NAT)합니다. 클라이언트는 가상 IP를 사용하지만 서버는 물리적 IP를 사용합니다. 서버는 가상 IP를 볼 수 없습니다.

### 가상 IP는 기본 서버에서 로컬로 구성된 상태를 유지하십시오. {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

일부 애플리케이션은 가상 IP를 서버 주소로 사용합니다. 이러한 애플리케이션은 **기본 서버에도 가상 IP가 로컬로 구성되어** 있어야만 올바르게 작동합니다. 따라서 다음과 같이 구성해야 합니다.

  * 서비스는 가상 IP에서 시작될 수 있습니다.
  * 서버는 가상 IP를 사용하여 자체 서비스에 접근할 수 있습니다.
  * 인증은 가상 IP를 사용하여 작동합니다.

**권장 방법:** 가상 IP를 대상 주소로 유지하는 로드 밸런싱 모드(예: Floating IP 또는 Direct Server Return)를 사용하십시오. 그런 다음 기본 서버에서 가상 IP를 로컬로 구성합니다. 구성 방법은 가상 IP의 서브넷에 따라 다릅니다.

  * **가상 IP는 서버의 물리적 IP 주소와 동일한 서브넷에 있습니다.** SafeKit 모듈에서 `<vip>` 섹션을 그대로 유지하십시오. SafeKit은 물리적 IP 주소의 네트워크 카드에 가상 IP를 별칭으로 자동으로 구성합니다.
  * **가상 IP가 다른 서브넷에 있는 경우** SafeKit에서 `<vip>` 구성하지 마십시오. 애플리케이션 시작 전에 `start_prim` 스크립트를 사용하여 루프백 인터페이스와 같은 전용 인터페이스에 가상 IP를 구성하십시오. 애플리케이션이 종료된 후에는 `stop_prim` 스크립트를 사용하여 가상 IP를 제거하십시오. 이러한 명령은 SafeKit 제품에서 제공되지 않으므로 시스템 통합자가 직접 작성해야 합니다.


## 클라우드 제공업체 CLI를 사용하여 서로 다른 서브넷에서 가상 IP가 작동하는 방식(mirror 클러스터) {#virtual-ip-cloud-cli-failover}

### 클라우드 환경에서 무상 ARP가 작동하지 않는 이유는 무엇일까요? {#why-gratuitous-arp-does-not-work-in-public-clouds}

클라우드 네트워크(AWS, Azure, Google Cloud)는 **그라투이투스 ARP를 무시합니다**. 클라우드 플랫폼에서 할당된 IP 주소로만 트래픽을 전송합니다. SafeKit은 기본 서버에 가상 IP를 구성하지만, 클라우드 네트워크는 해당 서버로 가상 IP 트래픽을 전송하지 않습니다.

### 클라우드 CLI를 사용하여 가상 IP 이동 {#moving-the-virtual-ip-through-the-cloud-api-in-safekit-failover-scripts}

로드 밸런싱이 없는 경우, 클라우드 공급자 CLI를 SafeKit **`start_prim` 스크립트** 에 통합하여 애플리케이션 시작 전에 클라우드 네트워크 구성을 업데이트할 수 있습니다. CLI는 기본 노드가 될 노드에 가상 IP를 할당하거나 클라우드 경로를 업데이트하여 가상 IP 트래픽을 해당 노드로 전달할 수 있습니다.

**가상 IP는 기본 서버에서 로컬로 유지됩니다**. **NAT가 사용되지 않으므로** 원래 클라이언트 IP는 변경되지 않습니다.

### 통합자의 책임 {#integrator-responsibility}

**시스템 통합 담당자는** `start_prim` 스크립트에 클라우드 CLI 명령어를 추가해야 합니다. 이러한 명령어는 **SafeKit 제품에서 제공되지 않으며**, 클라우드 제공업체, 네트워크 설계 및 고객의 보안 규칙에 따라 달라집니다.

### 제약 조건 {#constraints-of-the-cli-approach}

  * 클라우드 CLI는 두 노드 모두에 설치되어 있어야 합니다. 각 노드에는 네트워크 권한이 있는 클라우드 ID가 필요합니다.
  * 스크립트는 오류 및 재시도를 처리해야 합니다.
  * 장애 조치는 로드 밸런싱을 사용할 때보다 속도가 느릴 수 있습니다.

## BGP를 사용하여 서로 다른 서브넷에서 가상 IP가 작동하는 방식(mirror 클러스터) {#virtual-ip-bgp-failover}

### BGP를 이용한 가상 IP 재라우팅 {#layer-3-virtual-ip-rerouting-with-bgp-route-advertisement}

BGP(Border Gateway Protocol)를 사용하면 가상 IP(VIP)는 일반적으로 애플리케이션이 시작되기 전에 `start_prim` 스크립트에 의해 기본 서버의 루프백 인터페이스에 구성됩니다. 기본 서버는 해당 VIP를 /32 경로로 라우터에 알립니다.

장애 조치가 발생하면 이전 기본 서버의 `stop_prim` 스크립트가 애플리케이션을 중지하고 루프백 인터페이스에서 VIP를 제거하며 라우터에서 /32 경로를 철회합니다. 이전 기본 서버가 다운되면 `stop_prim` 실행되지 않지만 라우터는 BGP 세션을 잃고 경로를 자동으로 제거합니다.

### 혜택 및 필수 조건 {#benefits-and-prerequisites}

  * **가상 IP는 로컬 IP로 유지되며, NAT가 사용되지 않으므로 클라이언트 IP는 변경되지 않습니다.**
  * 서브넷 및 사이트 간에 작동합니다. VLAN을 확장할 필요가 없습니다.
  * 클라우드 환경에서는 BGP 라우터와 네트워크 팀의 지원이 필요합니다. 클라우드 환경에서는 클라우드 제공업체의 라우팅 서버 서비스가 필요합니다.

> **⚠️ 주의:** BGP 통합은 SafeKit 스크립트와 사용자의 라우팅 인프라를 사용합니다. **통합 담당자는** `start_prim` 및 `stop_prim` 스크립트에 명령어를 직접 작성해야 합니다. 이러한 스크립트는 **SafeKit 제품에서 제공되지 않습니다**. 실제 운영 환경에 적용하기 전에 네트워크 팀과 함께 솔루션을 검증하십시오.

## 서로 다른 서브넷(mirror 클러스터)에서 DNS 리디렉션이 작동하는 방식 {#virtual-ip-vs-dns-redirection-failover}

### `start_prim` 스크립트를 사용한 DNS 리라우팅 {#dns-rerouting-with-the-start-prim-script}

DNS 리디렉션을 사용하면 **단일 가상 IP 주소가 존재하지 않습니다**. 클라이언트는 **가상 이름** (DNS 이름)에 연결합니다. 장애 조치가 발생하면 새 기본 서버의 `start_prim` 스크립트가 애플리케이션을 시작한 다음 가상 이름의 DNS 레코드를 새 기본 서버의 **물리적 IP** 주소로 변경합니다.

`stop_prim` 스크립트는 아무런 역할을 하지 않습니다. 기존 기본 서버에 장애가 발생하면 새 기본 서버가 DNS 레코드를 덮어씁니다.

### 예시: DNS 확인 및 클라이언트 차단 {#the-technical-scenario-dns-resolution-and-the-stuck-client}

![고가용성 클러스터에서 물리적 IP 1에 대한 DNS 이름 확인을 보여주는 다이어그램](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 고가용성 클러스터에서 물리적 IP 1에 대한 DNS 확인 및 클라이언트 차단

#### 페일오버 전: 이름은 물리적 IP 1을 가리킵니다. {#current-state-resolution-to-physical-ip-1}

**클라이언트 1** 과 **클라이언트 2는** DNS 시스템에 가상 이름의 IP 주소를 요청합니다. DNS 시스템은 **물리적 IP 주소 1을** 반환합니다. 그러면 클라이언트들은 이 주소로 네트워크 연결을 설정합니다.

#### 장애 조치 후: 이름은 물리적 IP 2를 가리킵니다. {#the-failover-challenge-rerouting-to-physical-ip-2}

서버 1에 오류가 발생했습니다. 서버 2의 `start_prim` 스크립트가 DNS 레코드를 **물리적 IP 2** 로 변경합니다. 클라이언트는 다음 조건이 모두 충족될 때만 물리적 IP 2에 연결할 수 있습니다.

  * 클라이언트와 DNS 레코드 사이의 모든 DNS 서버에서 **TTL(Time to Live)** 이 만료되었습니다.
  * 클라이언트 1과 클라이언트 2의 로컬 DNS 캐시가 비어 있습니다.
  * 애플리케이션은 연결을 종료하고 *새로운* DNS 조회를 수행합니다.

조건 중 하나라도 충족되지 않으면 **클라이언트 1과 클라이언트 2는 물리적 IP 1에 접속할 수 없게 됩니다.** DNS 레코드가 올바르더라도 서비스가 중단됩니다.

### 제한 사항 및 필수 조건 {#the-two-black-boxes-of-dns-redirection}

  * **DNS 캐시:** 많은 인터넷 서비스 제공업체와 회사 DNS 서버는 짧은 TTL 값을 무시합니다. 따라서 이전 물리적 IP 주소 1을 몇 분 또는 몇 시간 동안 유지할 수 있습니다.
  * **애플리케이션 동작:** 많은 애플리케이션(예: Java 서비스 또는 웹 브라우저)은 시작할 때 한 번만 DNS 조회를 수행합니다. 그리고 첫 번째 IP 주소를 계속 사용합니다.
  * **장애 조치가 발생할 때마다 IP 주소가 변경됩니다.** 애플리케이션은 고정된 로컬 가상 IP 주소를 갖지 않습니다. 자체 IP 주소를 등록하는 애플리케이션은 제대로 작동하지 않을 수 있습니다.
  * **필수 조건:** DNS 레코드의 TTL을 짧게 설정(예: 30~60초)하고, 두 서버 모두에서 DNS 영역을 업데이트할 수 있는 권한이 있어야 합니다.

> **⚠️ 주의:** **통합자는** `start_prim` 스크립트에 DNS 업데이트 명령을 직접 작성해야 합니다. 이러한 명령은 **SafeKit 제품에서 제공되지 않으며**, DNS 서버(Windows DNS, BIND 또는 클라우드 DNS)에 따라 달라집니다.

### 결론 {#conclusion}

DNS 리디렉션은 안정적인 고가용성 솔루션이 아닙니다. 모든 클라이언트가 재연결 시 새로운 DNS 조회를 수행하는 경우에만 사용하십시오. 즉각적이고 투명한 장애 조치를 위해서는 **가상 IP를** 사용하십시오. 확장된 LAN, 로드 밸런싱, 클라우드 공급자 CLI 또는 BGP를 통해 가상 IP를 구현할 수 있습니다.

## 동일 서브넷의 <span class="notranslate farm-term" translate="no">farm</span> 클러스터에서 가상 IP 로드 밸런싱이 작동하는 방식 {#virtual-ip-load-balancing-same-subnet}

- [SafeKit farm 클러스터에서 로드 밸런싱 가상 IP 주소 테스트](/ko/best-practises/test-load-balancing-vip-farm/)

### 커널에서의 로드 밸런싱 및 이중화 {#scalable-performance-kernel-level-load-balancing--redundancy}

트래픽이 많을 경우 SafeKit은 여러 활성 서버에 작업을 분산할 수 있습니다. 한 서버에 장애가 발생하더라도 다른 서버들이 계속해서 작업을 수행합니다.

### <span class="notranslate farm-term" translate="no">Farm</span> 클러스터 아키텍처: Windows 또는 Linux 노드 간 로드 밸런싱 {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


![동일 서브넷 내 로드 밸런싱 가상 IP 다이어그램](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

**로드 밸런싱 <span class="notranslate farm-term" translate="no">farm</span> 클러스터** 에서 클라이언트는 가상 IP에 연결하고, 요청은 여러 서버에 동시에 분산됩니다. 이 예시에서는 두 개의 노드를 보여주지만, 클러스터에 노드를 더 추가할 수 있습니다. 동일한 서브넷 내에서 클러스터에 있는 **모든 서버** 의 네트워크 카드에는 IP 별칭을 사용하여 가상 IP가 구성됩니다.

#### 트래픽 공유: 커널 필터 {#traffic-distribution-the-kernel-level-filter}

<span class="notranslate farm-term" translate="no">farm</span> 클러스터에서 **커널의 SafeKit 필터는** 트래픽을 공유합니다. 작동 방식은 다음과 같습니다.

  * **ARP 매핑:** 클라이언트의 ARP 캐시에서 가상 IP는 하나의 MAC 주소(예: 서버 1의 `mac1`)에 연결됩니다.
  * **패킷 분석:** 서버 1은 패킷을 수신합니다. SafeKit 커널 필터는 각 패킷의 **클라이언트 IP** 주소 또는 **TCP 포트를** 읽습니다.
  * **부하 분산:** 필터는 서버 1이 처리할 패킷과 다른 노드(예: 서버 2)로 보낼 패킷을 결정합니다. 패킷을 다른 노드로 보낼 때, 필터는 패킷의 **목적지 MAC 주소를** 해당 노드의 MAC 주소로 변경합니다. 목적지 IP 주소는 가상 IP 주소로 유지됩니다. 이렇게 작업이 서버들 간에 분산됩니다.


#### 그라투이투스 ARP를 사용한 페일오버 및 재라우팅 {#failover-and-rerouting-with-gratuitous-arp}

서버 1에 장애가 발생하면 SafeKit은 **GARP(gratuitous ARP)** 메시지를 보냅니다. 클라이언트는 서버 2의 `mac2` 로 ARP 캐시를 업데이트합니다. 그런 다음 클라이언트는 즉시 farm 의 다른 노드로 이동합니다.

#### 원격지 배포 {#deployment-in-remote-sites}

이 로드 밸런싱 솔루션은 사이트들이 **확장된 LAN 또는 VLAN** 으로 연결되어 있는 경우 **원격 데이터 센터** 간에도 작동합니다. 모든 사이트는 동일한 서브넷에 속하게 되므로 여러 사이트에 걸쳐 있는 <span class="notranslate farm-term" translate="no">farm</span> 클러스터에 가장 효율적인 구성입니다.

{{%  insert-safekit-farm-video-ko  %}}

## 로드 밸런싱된 가상 IP가 서로 다른 서브넷(<span class="notranslate farm-term" translate="no">farm</span> 클러스터)에서 작동하는 방식 {#virtual-ip-load-balancing-different-subnets}

### 클라우드 서브넷 간 트래픽 {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

<span class="notranslate farm-term" translate="no">farm</span> 클러스터는 여러 가용 영역 및 서브넷 간에 애플리케이션 작업을 공유할 수 있습니다.

### 서브넷 간 <span class="notranslate farm-term" translate="no">farm</span> 클러스터: 여러 개의 Windows 또는 Linux 노드 {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


![서로 다른 두 개의 서브넷에서 작동하는 로드 밸런싱 farm 클러스터의 다이어그램](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

<span class="notranslate farm-term" translate="no">farm</span> 노드가 **서로 다른 서브넷** (예: 여러 클라우드 가용 영역)에 있는 경우 **가상 IP** 는 외부 **로드 밸런서(LB)** 에 할당됩니다. 로드 밸런서는 각 서브넷에 있는 서버의 물리적 IP 주소로 트래픽을 전송합니다.

#### 트래픽 라우팅 및 로드 밸런싱 규칙 {#intelligent-traffic-routing--load-balancing-rules}

로드 밸런서는 두 가지 기준에 따라 클라이언트 요청을 공유합니다.

  * **로드 밸런싱 규칙:** 예를 들어 **클라이언트 IP 주소** 또는 **클라이언트 TCP 포트**.
  * **노드 가용성:** 로드 밸런서는 SafeKit 상태 점검을 기반으로 정상적인 노드에만 트래픽을 전송합니다.


> **⚠️ 주의:** SafeKit은 네트워크 상태 점검을 제공합니다. 로드 밸런싱은 사용자의 네트워크 또는 클라우드 제공업체에서 제공합니다.

#### SafeKit 상태 점검 {#safekit-health-check-mechanism}

SafeKit은 <span class="notranslate farm-term" translate="no">farm</span> 의 모든 서버에 **상태 확인 URL을** 제공합니다. 로드 밸런서는 이 URL을 읽어 각 서버의 상태를 파악합니다.

  * **노드 정상 작동:** 상태 확인 결과 `HTTP 200 OK`. 응답이 반환되었습니다. 로드 밸런서가 해당 서버로 트래픽을 전송합니다.
  * **노드 다운:** 서버 또는 애플리케이션에 오류가 발생하면 SafeKit은 `HTTP 404 NOT FOUND` 반환합니다(또는 서버가 응답하지 않습니다). 로드 밸런서는 해당 노드로의 트래픽 전송을 즉시 중단합니다.


#### 클라우드 배포: AWS, Azure 및 GCP {#cloud-deployment-standards-aws-azure-and-gcp}

이는 **클라우드 환경에서 <span class="notranslate farm-term" translate="no">farm</span> 클러스터를** 구성하는 표준 아키텍처입니다. 서브넷이나 영역에 장애가 발생하더라도 다른 노드들이 계속해서 트래픽을 처리합니다. 이 아키텍처는 [**Amazon AWS**](</ko/solutions/aws-load-balancing-cluster-failover/>) (AWS Network Load Balancer), [**Microsoft Azure**](</ko/solutions/azure-load-balancing-cluster-failover/>) (Azure Load Balancer), [**Google Cloud(GCP)**](</ko/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing)에서 지원됩니다.


## 비교: 가상 IP 구현, 지연 시간 및 애플리케이션 투명성 {#virtual-ip-methods-comparison}

**고가용성 및 재해 복구를 위한 가상 IP 리디렉션 방식과 DNS 리디렉션 방식 비교.**

환경 및 사용 사례 | 고가용성 유형 | 리디렉션 방법 | 구현자: | 네트워크 지연 시간 | 애플리케이션 투명성 및 로컬 IP  
---|---|---|---|---|---  
주/백업(고가용성) | Mirror 클러스터 | 불필요한 ARP/MAC 인수 | ✅ 세이프킷 제품 | 매우 낮음: 오류를 감지하고 GARP를 전송하는 데 걸리는 시간 | 완전한 투명성: 가상 IP는 활성 노드의 로컬 IP입니다. 클라이언트 IP는 변경되지 않습니다.  
부하 분산(액티브/액티브) | <span class="notranslate farm-term" translate="no">Farm</span> 클러스터 | 커널 네트워크 필터 / GARP | ✅ 세이프킷 제품 | 매우 낮음: 장애를 감지하고 네트워크 필터를 변경하는 데 걸리는 시간 | 완전한 투명성: 가상 IP는 모든 노드에서 로컬 IP입니다. 클라이언트 IP는 변경되지 않습니다.  
동일 서브넷 / 확장 LAN (확장된 VLAN) | 재해 복구(원격 데이터 센터) | IP 별칭 지정 / GARP | ✅ SafeKit 제품 (확장된 VLAN은 네트워크 팀에서 제공합니다) | 낮음: 확장된 VLAN의 왕복 시간(RTT)에 따라 달라집니다. | 완전한 투명성: 가상 IP는 노드에서 로컬로 사용됩니다. 클라이언트 IP는 변경되지 않습니다.  
서로 다른 서브넷: 로드 밸런싱 전용 | 재해 복구(원격 데이터 센터/클라우드) | 외부 부하 분산기 | 🛠️ 통합자: 로드 밸런싱 구성 (SafeKit에서 상태 점검 기능을 제공합니다) | 중간: 로드 밸런서의 상태 점검 간격에 따라 다릅니다. | ⚠️ SNAT/DNAT를 사용하는 경우 부분적인 투명성만 제공됩니다. 가상 IP는 노드에서 로컬 IP가 **아닙니다**. 클라이언트 IP는 유지되지 **않을** 수 있습니다. 애플리케이션은 이를 지원해야 합니다.  
서로 다른 서브넷: 로드 밸런서 + 로컬 SafeKit 가상 IP | 재해 복구(원격 데이터 센터/클라우드) | Floating IP / Direct Server Return 갖춘 외부 로드 밸런싱 | 🛠️ 통합자: 로드 밸런싱 구성 (SafeKit에서 상태 점검 기능을 제공합니다) | 중간: 로드 밸런서의 상태 점검 간격에 따라 다릅니다. | 뛰어난 투명성: 가상 IP는 기본 노드의 로컬 주소이며 목적지 주소입니다.
다른 서브넷: 클라우드 CLI | 재해 복구(클라우드) | 클라우드 API: 개인 IP 또는 클라우드 경로가 새 기본 주소로 이동합니다. | 🛠️ 통합자: `start_prim` 스크립트의 클라우드 CLI 명령 | 중간~높음: 클라우드 API의 응답 시간에 따라 다름 | 완전한 투명성: 가상 IP는 기본 노드의 로컬 IP입니다. 클라이언트 IP는 변경되지 않습니다.
서로 다른 서브넷: BGP | 재해 복구(원격 데이터 센터/클라우드) | /32 경로가 BGP를 통해 공지되었습니다. | 🛠️ 통합자: `start_prim` 및 `stop_prim` 스크립트의 BGP 명령 | 낮음~중간: BGP 수렴 시간에 따라 다름 | 완전한 투명성: 가상 IP는 기본 노드의 로컬 IP입니다. 클라이언트 IP는 변경되지 않습니다. BGP 라우터가 필요합니다.  
DNS 리디렉션: 가상 IP 없음 | 재해 복구(원격 데이터 센터) | DNS 레코드 변경 (이름/물리적 IP 주소) | 🛠️ 통합자: `start_prim` 스크립트의 DNS 업데이트 명령 | 높고 예측 불가능함: DNS TTL(Time To Live) 및 클라이언트 DNS 캐시에 따라 달라짐 | ⚠️ 신뢰할 수 없음: 클라이언트가 새 DNS 조회를 수행해야 합니다. 클라이언트가 시작 시 할당받은 이전 IP 주소를 유지하고 장애 조치 후에도 재라우팅되지 않는 경우가 종종 있습니다.  
  
## 가상 IP에 대한 자주 묻는 질문 {#virtual-ip-faq}

### 가상 IP 및 네트워킹 {#virtual-ip--networking}

가상 IP란 무엇이며 물리적 IP와는 어떻게 다른가요?

**물리적 IP 주소** 는 네트워크 카드 하나에 연결됩니다. **가상 IP** 주소는 하드웨어에 연결되지 않습니다. SafeKit 클러스터에서 클라이언트는 항상 가상 IP 주소를 사용합니다. 기본 서버에 장애가 발생하면 가상 IP 주소는 자동으로 정상적인 노드로 이동합니다. 클라이언트 구성을 변경할 필요가 없습니다.

가상 IP를 사용하려면 하드웨어 로드 밸런서가 필요한가요?

아니요. **SafeKit은** 소프트웨어로 가상 IP를 관리합니다. 동일한 서브넷 내에서 **IP 별칭** 과 **GARP(Gratuitous ARP)를** 사용하여 트래픽을 리디렉션합니다. 외부 로드 밸런서나 프록시 서버는 필요하지 않습니다.

GARP(Gratuitous ARP)란 무엇이며 왜 사용되는가?

**GARP(Gratuitous ARP)** 는 모든 장치로 전송되는 네트워크 메시지입니다. 이 메시지는 스위치와 라우터의 ARP 테이블을 업데이트합니다. 장애 조치가 발생하면 새로운 기본 서버가 GARP 메시지를 전송합니다. 이 메시지는 **가상 IP 주소** 가 이제 새로운 기본 서버의 MAC 주소에 연결되었음을 알립니다. 그러면 트래픽이 즉시 재라우팅됩니다.

DNS 이름을 가상 IP 주소와 연결할 수 있나요?

**예.** 가상 IP에 대한 표준 A 레코드를 생성하세요. 리디렉션은 **DNS 수준이 아닌** **가상 IP 수준** 에서 (ARP 또는 네트워크 리디렉션을 통해) 수행됩니다. 따라서 DNS 지연이나 TTL 문제가 발생하지 않으며, **애플리케이션은 장애 조치를 투명하게** 처리할 수 있습니다.

### 클라우드 및 고급 아키텍처 {#cloud--advanced-architectures}

클라우드 환경(AWS, Azure, GCP)에서 가상 IP는 어떻게 작동하나요?

클라우드 환경에서는 레이어 2 GARP 메시지를 사용하여 가상 IP를 재라우팅할 수 없습니다. SafeKit은 **클라우드 로드 밸런서** (AWS ELB, Azure LB 또는 Google GCLB)와 연동됩니다. SafeKit은 **상태 확인 URL을** 제공하며, 로드 밸런서는 이 URL을 읽어 활성 노드로 트래픽을 전송합니다.

재해 복구에 있어 확장 LAN이 로드 밸런서보다 더 나은 선택일까요?

**예**. 원격 데이터 센터 간에는 **확장된 LAN(스트레치드 VLAN)** **이 애플리케이션에 장애 조치가 투명하게** 유지되므로 더 나은 경우가 많습니다. **가상 IP 주소가 변경되지 않으므로** 데이터 센터 간 장애 조치 후에도 애플리케이션과 클라이언트는 동일한 주소를 계속 사용합니다.

DNS 리디렉션은 가상 IP와 비교했을 때 어떤 한계점이 있나요?

**DNS 리디렉션은** **TTL(Time to Live)** 과 클라이언트 DNS 캐시에 따라 달라집니다. 복구에는 몇 시간이 걸릴 수 있습니다. 또한, **새 DNS 조회를 수행하지 않는 클라이언트는 장애가 발생한 서버에서 계속 차단됩니다**. **가상 IP** 는 GARP 메시지를 통해 레이어 2에서 즉시 재라우팅됩니다. 클라이언트 DNS 캐시는 영향을 미치지 않습니다.

### 투명성과 보안 {#transparency--security}

애플리케이션 투명성을 위해 로컬 가상 IP가 중요한 이유는 무엇입니까?

로컬 **가상 IP를** 사용하는 경우 애플리케이션은 변경되지 않는 주소를 사용합니다. SafeKit은 **커널** 에서 리디렉션을 수행합니다. 애플리케이션은 페일오버를 감지하지 못합니다. DNAT를 사용하는 경우 애플리케이션에서 사용하는 주소가 변경됩니다.

가상 IP는 원래 클라이언트 IP 주소를 유지합니까?

예. SafeKit은 소스 NAT(SNAT)를 사용하지 않습니다. 가상 IP는 활성 서버에서 로컬로 사용되므로 애플리케이션은 **원래 클라이언트 IP를** 수신합니다. 이는 보안 감사, 세션 지속성 및 규제 관련 로그에 중요합니다.


{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}
