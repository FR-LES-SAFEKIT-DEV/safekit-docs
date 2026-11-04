---
title: "고가용성 클러스터에서 가상 IP 주소는 어떻게 작동하나요?"
canonical: "https://safekit.eviden.com/ko/best-practises/how-a-virtual-ip-address-works/"
description: "SafeKit이 장애 조치 시 GARP, 로드 밸런서, 클라우드 CLI 또는 BGP를 사용해 가상 IP를 이동하는 방법을 알아보세요."
category: "best-practises"
lang: "ko"
topics: "고가용성 클러스터의 가상 IP 주소란?, SafeKit의 가상 IP 주소 구현, 동일한 서브넷에서 가상 IP 주소가 작동하는 방식(Mirror 클러스터), 로드 밸런서를 사용해 서로 다른 서브넷 간에 가상 IP 주소를 사용하는 방법(Mirror 클러스터), 클라우드 공급자 CLI를 사용해 서로 다른 서브넷 간에 가상 IP 주소를 사용하는 방법(Mirror 클러스터), BGP를 사용해 서로 다른 서브넷 간에 가상 IP 주소를 사용하는 방법(Mirror 클러스터), 서로 다른 서브넷 간 DNS 리디렉션 방식(Mirror 클러스터), 동일한 서브넷의 Farm 클러스터에서 가상 IP 부하 분산이 작동하는 방식, 서로 다른 서브넷 간 가상 IP 부하 분산(Farm 클러스터), 구현, 지연 시간 및 애플리케이션 투명성 비교, 가상 IP 관련 자주 묻는 질문, 🔍 SafeKit 살펴보기"
---

# 고가용성 클러스터에서 가상 IP 주소는 어떻게 작동하나요? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## 고가용성 클러스터의 가상 IP 주소란? {#virtual-ip-definition}

**가상 IP 주소**는 [고가용성 클러스터](</ko/>)의 애플리케이션에 클라이언트가 연결할 때 사용하는 단일 주소입니다. 특정 서버에 고정되어 있지 않습니다. 장애 조치가 발생하면 애플리케이션을 실행하는 서버로 이동합니다. 클라이언트 설정을 변경할 필요가 없습니다.

**SafeKit의 핵심 원칙:** 가상 IP 주소는 애플리케이션을 실행하는 서버에 **로컬로 구성**됩니다. 애플리케이션은 이 주소로 시작되며 클라이언트의 원래 IP 주소를 받습니다. 따라서 많은 애플리케이션이 변경 없이 SafeKit에서 정상적으로 작동합니다. SafeKit은 두 가지 유형의 가상 IP 주소를 제공합니다.

  * **Mirror 클러스터의 기본/보조 가상 IP 주소:** 가상 IP 주소는 기본 서버에서만 활성화됩니다. 장애 조치 시 보조 서버로 이동합니다.
  * **<span class="notranslate farm-term" translate="no">farm</span> 클러스터의 네트워크 부하 분산 가상 IP 주소:** 가상 IP 주소가 모든 서버에서 동시에 활성화되고 트래픽이 서버 간에 분산됩니다.

## SafeKit의 가상 IP 주소 구현 {#safekit-virtual-ip-implementation}

이 문서에서는 네트워크 아키텍처별로 SafeKit이 가상 IP 주소를 이동하는 방법을 설명합니다.

  * **동일한 서브넷 또는 확장 LAN ([Mirror](#virtual-ip-same-subnet-failover) 및 [<span class="notranslate farm-term" translate="no">Farm</span>](#virtual-ip-load-balancing-same-subnet) 클러스터):** SafeKit은 서버에 가상 IP 주소를 구성하고 **무상 ARP(GARP)**를 전송합니다. 외부 하드웨어가 필요하지 않습니다. SafeKit이 전체 메커니즘을 구현하므로 가장 투명한 솔루션입니다.
  * **로드 밸런서를 사용하는 서로 다른 서브넷 ([Mirror](#virtual-ip-different-subnets-failover) 및 [<span class="notranslate farm-term" translate="no">Farm</span>](#virtual-ip-load-balancing-different-subnets) 클러스터):** 로드 밸런서는 SafeKit **상태 확인**을 사용해 적절한 서버로 트래픽을 보냅니다. 로드 밸런서는 통합자가 구성합니다.
  * **[클라우드 공급자 CLI를 사용하는 서로 다른 서브넷](#virtual-ip-cloud-cli-failover) (Mirror 클러스터):** SafeKit의 `start_prim` 스크립트가 클라우드 CLI를 호출해 가상 IP 주소를 이동합니다. 스크립트는 통합자가 작성합니다.
  * **[BGP를 사용하는 서로 다른 서브넷](#virtual-ip-bgp-failover) (Mirror 클러스터):** 기본 서버가 라우터에 가상 IP 주소를 알립니다. 스크립트는 통합자가 작성합니다.
  * **[DNS 리디렉션을 사용하는 서로 다른 서브넷](#virtual-ip-vs-dns-redirection-failover) (Mirror 클러스터):** SafeKit의 `start_prim` 스크립트가 가상 이름의 DNS 레코드를 변경해 새 기본 서버의 **물리 IP 주소**를 가리키도록 합니다. 스크립트는 통합자가 작성합니다. 단일 가상 IP 주소가 없으며 이 방법은 모든 클라이언트에 신뢰할 수 있는 것은 아닙니다.

이 문서의 내용:

  * [구현, 지연 시간 및 애플리케이션 투명성 비교](#virtual-ip-methods-comparison)
  * [가상 IP 관련 자주 묻는 질문](#virtual-ip-faq)
  * [🔍 SafeKit 살펴보기](#hub)

![Evidian SafeKit의 가상 IP 동작 비교: Mirror 클러스터에서는 활성 노드의 플로팅 IP, Farm 클러스터에서는 모든 노드의 네트워크 부하 분산을 보여줍니다.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**SafeKit의 Mirror 및 <span class="notranslate farm-term" translate="no">Farm</span> 클러스터에서 가상 IP 주소 구현.**

## 동일한 서브넷에서 가상 IP 주소가 작동하는 방식(Mirror 클러스터) {#virtual-ip-same-subnet-failover}

- [SafeKit Mirror 클러스터의 기본/보조 가상 IP 주소 테스트](/ko/best-practises/test-primary-backup-vip-mirror/)

### 로컬 서브넷에서 자동 장애 조치 및 네트워크 재라우팅 {#automated-failover--network-rerouting-in-a-local-subnet}

로컬 네트워크에서 **SafeKit**은 가상 IP 주소와 애플리케이션 장애 조치를 자동으로 관리합니다.

### 로컬 Mirror 클러스터: Windows 또는 Linux에서 2노드 장애 조치 {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}

![동일한 서브넷의 두 서버 간 SafeKit 가상 IP 장애 조치 메커니즘](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

**SafeKit Mirror 클러스터**에서는 두 노드가 동일한 서브넷에 있습니다. 고가용성은 **가상 IP 주소**를 사용합니다. SafeKit은 운영 체제의 네트워크 스택에서 이 주소를 관리합니다. 별도의 하드웨어는 필요하지 않습니다. **IP 별칭**을 사용해 가상 IP 주소를 서버 1과 서버 2의 물리 IP 주소에 추가합니다. 클라이언트는 항상 가상 IP 주소에 연결합니다.

#### SafeKit의 IP 별칭 및 여러 가상 IP 주소(VIP) 지원 {#safekits-advanced-ip-aliasing--multiple-virtual-ip-support}

가상 IP 주소는 노드 간에 이동하는 세 번째 IP 주소입니다. SafeKit은 하나의 클러스터에서 **여러 가상 IP 주소**를 관리할 수 있습니다. 같은 네트워크 카드나 서로 다른 네트워크 카드에 구성할 수 있어 각 서비스가 자체 가상 IP 주소를 사용할 수 있습니다.

#### 장애 조치 메커니즘: 무상 ARP(GARP) {#the-failover-mechanism-gratuitous-arp-garp}

장애 조치에는 수동 작업이 필요하지 않습니다. 정상 작동 중에는 가상 IP 주소가 **서버 1의 MAC 주소(mac1)**에 연결되어 있습니다. 서버 1에 장애가 발생하면 SafeKit은 다음 세 가지 작업을 수행합니다.

  * **가상 IP 별칭 설정:** SafeKit은 새 기본 서버인 서버 2의 네트워크 카드에 가상 IP 주소를 별칭으로 구성합니다. 그런 다음 운영 체제가 네트워크에 메시지를 보내 가상 IP 주소를 알립니다.
  * **GARP:** SafeKit은 **무상 ARP(GARP) 메시지**도 전송합니다. 네트워크 스위치와 클라이언트는 ARP 캐시를 업데이트합니다. 이제 가상 IP 주소는 **서버 2의 MAC 주소(mac2)**에 연결됩니다.
  * **애플리케이션 복구:** SafeKit은 서버 2에서 애플리케이션 서비스를 다시 시작합니다.

#### 원격 데이터 센터 및 확장 VLAN {#remote-data-centers--extended-vlans}

위에서 설명한 **동일 서브넷 솔루션**은 원격 사이트 간 **재해 복구(DR)**에도 적합합니다. 사이트가 **확장 LAN 또는 확장 VLAN**으로 연결되어 있다면 이 방식을 선택하는 경우가 많습니다. 두 사이트가 하나의 서브넷에 있으므로 네트워크가 단순해지고 복잡한 라우팅 프로토콜이 필요하지 않습니다.

> **⚠️ 참고:** 무상 ARP를 사용한 레이어 2 재라우팅은 애플리케이션에 **가장 투명한 솔루션**입니다. 애플리케이션은 클라이언트의 원래 IP 주소를 받고 가상 IP 주소는 로컬에 구성됩니다. **많은 애플리케이션은** 로컬 가상 IP 주소가 필요합니다. 이 주소가 없으면 **정상적으로 작동하지 않을 수 있습니다**. 동일 서브넷 구성에서는 SafeKit이 전체 메커니즘을 구현하므로 별도의 통합 작업이 필요하지 않습니다.

## 로드 밸런서를 사용해 서로 다른 서브넷 간에 가상 IP 주소를 사용하는 방법(Mirror 클러스터) {#virtual-ip-different-subnets-failover}

### SafeKit 상태 확인을 사용하는 로드 밸런서 {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![서로 다른 두 서브넷 간에 로드 밸런서를 사용한 가상 IP 장애 조치 다이어그램](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

노드가 **서로 다른 서브넷**에 있으면 무상 ARP로 가상 IP 주소를 이동할 수 없습니다. 이 경우 가상 IP 주소는 **로드 밸런서**에 있으며, 로드 밸런서가 기본 서버로 트래픽을 보냅니다.

SafeKit은 각 노드에 **상태 확인 URL**을 제공합니다.

  * **기본(PRIM):** `HTTP 200 OK`를 반환합니다. 로드 밸런서는 이 노드로 트래픽을 보냅니다.
  * **보조(SECOND):** `HTTP 404 NOT FOUND`를 반환합니다. 로드 밸런서는 이 노드로 트래픽을 보내지 않습니다.

장애 조치 시 SafeKit은 응답을 변경하고 로드 밸런서는 새 기본 서버로 트래픽을 보냅니다. 이는 [**AWS**](</ko/solutions/aws-high-availability-cluster-synchronous-replication-failover/>), [**Azure**](</ko/solutions/azure-high-availability-cluster-synchronous-replication-failover/>), [**Google Cloud**](</ko/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>)의 **가용 영역** 간 표준 솔루션입니다.

> **⚠️ 참고:** SafeKit은 상태 확인 기능을 제공합니다. 로드 밸런서는 네트워크 또는 클라우드 공급자가 제공합니다.

### 문제: 로드 밸런서가 가상 IP 주소를 소유함 {#the-load-balancer-pitfall-virtual-ip-on-the-frontend-nat-to-the-physical-ip}

로드 밸런서만 사용하는 경우 클라이언트는 가상 IP 주소에 연결합니다. 로드 밸런서는 NAT를 통해 가상 IP를 기본 서버의 **물리 IP 주소**로 변환합니다. 클라이언트는 가상 주소를 사용하지만 서버는 물리 주소를 사용하므로 서버는 가상 IP 주소를 인식하지 못합니다.

### 기본 서버에 가상 IP 주소를 로컬로 구성하기 {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

일부 애플리케이션은 가상 IP 주소를 서버 주소로 사용합니다. 이 애플리케이션은 가상 IP 주소가 **기본 서버에도 로컬로 구성되어야** 정상적으로 작동합니다. 이렇게 구성하면:

  * 가상 IP 주소로 서비스를 시작할 수 있습니다.
  * 서버가 가상 IP 주소를 사용해 자체 서비스에 액세스할 수 있습니다.
  * 이 주소를 사용하는 인증이 작동합니다.

**권장 사항:** Floating IP 또는 Direct Server Return처럼 가상 IP 주소를 대상 주소로 유지하는 로드 밸런서 모드를 사용합니다. 그런 다음 가상 IP 주소를 기본 서버에 로컬로 구성합니다. 방법은 가상 IP 주소가 속한 서브넷에 따라 다릅니다.

  * **가상 IP 주소가 서버의 물리 IP 주소와 동일한 서브넷에 있는 경우:** SafeKit 모듈의 `<vip>` 섹션을 유지합니다. SafeKit은 물리 IP 주소에 연결된 네트워크 카드에 가상 IP 주소를 별칭으로 자동 구성합니다.
  * **가상 IP 주소가 다른 서브넷에 있는 경우:** SafeKit에서 `<vip>`를 구성하지 마세요. `start_prim` 스크립트를 사용해 애플리케이션을 시작하기 전에 loopback 같은 전용 인터페이스에 가상 IP 주소를 구성합니다. 애플리케이션을 중지한 후에는 `stop_prim`으로 주소를 제거합니다. 이 명령은 통합자가 작성하며 SafeKit 제품에 포함되지 않습니다.

## 클라우드 공급자 CLI를 사용해 서로 다른 서브넷 간에 가상 IP 주소를 사용하는 방법(Mirror 클러스터) {#virtual-ip-cloud-cli-failover}

### 클라우드에서 무상 ARP가 작동하지 않는 이유 {#why-gratuitous-arp-does-not-work-in-public-clouds}

클라우드 네트워크(AWS, Azure, Google Cloud)는 **무상 ARP를 무시**합니다. 클라우드 플랫폼에 할당된 IP 주소로만 트래픽을 전송합니다. SafeKit은 기본 서버에 가상 IP 주소를 구성하지만 클라우드 네트워크는 해당 가상 IP 트래픽을 서버로 전달하지 않습니다.

### 클라우드 CLI를 사용해 가상 IP 주소 이동하기 {#moving-the-virtual-ip-through-the-cloud-api-in-safekit-failover-scripts}

로드 밸런서가 없는 경우 클라우드 공급자 CLI를 SafeKit의 **`start_prim` 스크립트**에 통합해 애플리케이션 시작 전에 클라우드 네트워크 구성을 업데이트할 수 있습니다. CLI는 기본 서버가 되는 노드에 가상 IP 주소를 할당하거나 클라우드 경로를 업데이트해 해당 노드로 트래픽을 전달할 수 있습니다.

**가상 IP 주소는 기본 서버에 로컬로 유지됩니다.** **NAT는 사용하지 않으며** 클라이언트의 원래 IP 주소도 변경되지 않습니다.

### 통합자의 책임 {#integrator-responsibility}

**통합자**는 클라우드 CLI 명령을 `start_prim` 스크립트에 추가해야 합니다. 이 명령은 **SafeKit 제품에 포함되지 않습니다**. 클라우드 공급자, 네트워크 설계 및 고객의 보안 규칙에 따라 달라집니다.

### 제약 사항 {#constraints-of-the-cli-approach}

  * 클라우드 CLI를 두 노드 모두에 설치해야 합니다. 각 노드에는 필요한 네트워크 권한이 있는 클라우드 ID가 필요합니다.
  * 스크립트는 오류와 재시도를 처리해야 합니다.
  * 로드 밸런서를 사용할 때보다 장애 조치가 느릴 수 있습니다.

## BGP를 사용해 서로 다른 서브넷 간에 가상 IP 주소를 사용하는 방법(Mirror 클러스터) {#virtual-ip-bgp-failover}

### BGP를 사용한 가상 IP 재라우팅 {#layer-3-virtual-ip-rerouting-with-bgp-route-advertisement}

**BGP(Border Gateway Protocol)**를 사용하면 일반적으로 `start_prim` 스크립트가 애플리케이션을 시작하기 전에 기본 서버의 loopback 인터페이스에 가상 IP 주소를 구성합니다. 그런 다음 기본 서버가 라우터에 VIP를 /32 경로로 알립니다.

장애 조치 시 기존 기본 서버의 `stop_prim` 스크립트는 애플리케이션을 중지하고 loopback 인터페이스에서 VIP를 제거한 다음 라우터에서 /32 경로를 철회합니다. 기존 기본 서버가 충돌하면 `stop_prim`이 실행되지 않지만 라우터는 BGP 세션을 잃고 경로를 자동으로 삭제합니다.

### 장점 및 사전 요구 사항 {#benefits-and-prerequisites}

  * **가상 IP 주소는 로컬에 유지되고 NAT가 없으며 클라이언트 IP 주소도 변경되지 않습니다.**
  * 서브넷과 사이트 간에 작동하며 확장 VLAN이 필요하지 않습니다.
  * BGP 라우터와 네트워크 팀의 지원이 필요합니다. 클라우드에서는 클라우드 공급자의 경로 서버 서비스가 필요합니다.

> **⚠️ 참고:** BGP 통합은 SafeKit 스크립트와 라우팅 인프라를 사용합니다. **통합자**는 `start_prim` 및 `stop_prim` 스크립트에 명령을 작성해야 합니다. 이 스크립트는 **SafeKit 제품에 포함되지 않습니다**. 운영 환경에 적용하기 전에 네트워크 팀과 솔루션을 검증하세요.

## DNS 리디렉션을 사용해 서로 다른 서브넷 간에 가상 IP 주소를 사용하는 방법(Mirror 클러스터) {#virtual-ip-vs-dns-redirection-failover}

### `start_prim` 스크립트를 사용한 DNS 리디렉션 {#dns-rerouting-with-the-start-prim-script}

DNS 리디렉션에는 **단일 가상 IP 주소가 없습니다**. 클라이언트는 **가상 이름**(DNS 이름)에 연결합니다. 장애 조치 시 새 기본 서버의 `start_prim` 스크립트가 애플리케이션을 시작한 다음 가상 이름의 DNS 레코드를 변경해 새 기본 서버의 **물리 IP 주소**를 가리키게 합니다.

`stop_prim` 스크립트는 수행할 작업이 없습니다. 기존 기본 서버가 충돌하면 새 기본 서버가 DNS 레코드를 덮어씁니다.

### 예: DNS 확인과 연결이 차단된 클라이언트 {#the-technical-scenario-dns-resolution-and-the-stuck-client}

![고가용성 클러스터에서 DNS 이름이 물리 IP 주소 1로 확인되는 다이어그램](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

DNS 확인: 고가용성 클러스터에서 클라이언트가 물리 IP 주소 1에 고정된 상태.

#### 장애 조치 전: 이름이 물리 IP 주소 1을 가리킴 {#current-state-resolution-to-physical-ip-1}

**클라이언트 1**과 **클라이언트 2**는 DNS 시스템에 가상 이름의 IP 주소를 요청합니다. DNS 시스템은 **물리 IP 주소 1**을 반환합니다. 그런 다음 클라이언트는 이 주소로 네트워크 연결을 엽니다.

#### 장애 조치 후: 이름이 물리 IP 주소 2를 가리킴 {#the-failover-challenge-rerouting-to-physical-ip-2}

서버 1에 장애가 발생합니다. 서버 2의 `start_prim` 스크립트가 DNS 레코드를 **물리 IP 주소 2**로 변경합니다. 다음 조건을 모두 충족해야 클라이언트가 이 주소에 연결할 수 있습니다.

  * 클라이언트와 DNS 레코드 사이의 모든 DNS 서버에서 **TTL(Time to Live)**이 만료되어야 합니다.
  * 클라이언트 1과 클라이언트 2의 로컬 DNS 캐시가 비어 있어야 합니다.
  * 애플리케이션이 연결을 닫고 **새 DNS 조회**를 수행해야 합니다.

조건 중 하나라도 충족하지 않으면 **클라이언트 1과 클라이언트 2는 물리 IP 주소 1에 계속 연결된 상태**가 됩니다. DNS 레코드가 올바르더라도 서비스를 사용할 수 없습니다.

### 제한 사항 및 사전 요구 사항 {#the-two-black-boxes-of-dns-redirection}

  * **DNS 캐시:** 많은 인터넷 서비스 공급자와 기업 DNS 서버는 짧은 TTL 값을 무시합니다. 이전 물리 IP 주소 1을 몇 분 또는 몇 시간 동안 유지할 수 있습니다.
  * **애플리케이션 동작:** Java 서비스나 웹 브라우저 같은 많은 애플리케이션은 시작할 때 한 번만 DNS 조회를 하고 첫 번째 IP 주소를 계속 사용합니다.
  * **장애 조치 때마다 IP 주소가 변경됨:** 애플리케이션에는 로컬 고정 가상 IP 주소가 없습니다. 자체 IP 주소를 등록하는 애플리케이션은 작동하지 않을 수 있습니다.
  * **사전 요구 사항:** DNS 레코드의 짧은 TTL(예: 30~60초)과 두 서버에서 DNS 영역을 업데이트할 권한이 필요합니다.

> **⚠️ 참고:** **통합자**는 DNS 업데이트 명령을 `start_prim` 스크립트에 작성해야 합니다. 이 명령은 **SafeKit 제품에 포함되지 않으며** DNS 서버(Windows DNS, BIND 또는 클라우드 DNS)에 따라 달라집니다.

### 결론 {#conclusion}

DNS 리디렉션은 신뢰할 수 있는 고가용성 솔루션이 아닙니다. 모든 클라이언트가 다시 연결할 때 DNS를 새로 조회하는 경우에만 사용하세요. 즉각적이고 투명한 장애 조치를 원한다면 확장 LAN, 로드 밸런서, 클라우드 공급자 CLI 또는 BGP를 사용하는 **가상 IP 주소**를 사용하세요.

## 동일한 서브넷의 Farm 클러스터에서 가상 IP 부하 분산이 작동하는 방식 {#virtual-ip-load-balancing-same-subnet}

- [SafeKit Farm 클러스터에서 부하 분산 가상 IP 주소 테스트](/ko/best-practises/test-load-balancing-vip-farm/)

### 커널에서의 부하 분산과 중복성 {#scalable-performance-kernel-level-load-balancing--redundancy}

트래픽이 많으면 SafeKit은 여러 활성 서버에 작업을 분산할 수 있습니다. 서버 하나에 장애가 발생해도 나머지 서버는 계속 작동합니다.

### Farm 클러스터 아키텍처: Windows 또는 Linux 노드 간 부하 분산 {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}

![동일한 서브넷에서 부하 분산을 수행하는 가상 IP 다이어그램](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

**부하 분산 Farm 클러스터**에서 클라이언트는 가상 IP에 연결하고 요청은 여러 서버에 동시에 분산됩니다. 이 예에서는 두 노드를 보여주지만 클러스터에 서버를 더 추가할 수 있습니다. 동일한 서브넷에서는 클러스터의 **모든 서버** 네트워크 카드에 IP 별칭을 설정해 가상 IP 주소를 구성합니다.

#### 트래픽 분산: 커널 필터 {#traffic-distribution-the-kernel-level-filter}

<span class="notranslate farm-term" translate="no">Farm</span> 클러스터에서는 SafeKit의 **커널 필터**가 트래픽을 분산합니다. 작동 방식은 다음과 같습니다.

  * **ARP 매핑:** 클라이언트의 ARP 캐시에서 가상 IP 주소는 하나의 MAC 주소(예: 서버 1의 `mac1`)에 연결됩니다.
  * **패킷 분석:** 서버 1이 패킷을 받습니다. SafeKit 커널 필터는 각 패킷의 **클라이언트 IP 주소** 또는 **TCP 포트**를 확인합니다.
  * **부하 분산:** 필터는 서버 1이 처리할 패킷과 서버 2 같은 다른 노드로 보낼 패킷을 결정합니다. 다른 노드로 패킷을 보낼 때 필터는 패킷의 **목적지 MAC 주소**를 해당 노드의 MAC 주소로 바꿉니다. 목적지 IP 주소는 가상 IP로 유지됩니다. 이렇게 서버 간에 작업이 분산됩니다.

#### 무상 ARP를 사용한 장애 조치 및 재라우팅 {#failover-and-rerouting-with-gratuitous-arp}

서버 1에 장애가 발생하면 SafeKit은 **무상 ARP(GARP) 메시지**를 보냅니다. 클라이언트는 서버 2의 MAC 주소인 `mac2`로 ARP 캐시를 업데이트합니다. 그러면 트래픽은 즉시 다른 Farm 노드로 전달됩니다.

#### 원격 사이트 배포 {#deployment-in-remote-sites}

사이트가 **확장 LAN 또는 VLAN**으로 연결되어 있으면 이 부하 분산 솔루션은 **원격 데이터 센터** 간에도 작동합니다. 모든 사이트가 동일한 서브넷에 있게 됩니다. 이는 여러 사이트에 배포된 <span class="notranslate farm-term" translate="no">Farm</span> 클러스터에 가장 효율적인 구성입니다.

{{%  insert-safekit-farm-video-ko  %}}

## 서로 다른 서브넷 간 가상 IP 부하 분산(Farm 클러스터) {#virtual-ip-load-balancing-different-subnets}

### 클라우드 서브넷 간 트래픽 {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

<span class="notranslate farm-term" translate="no">Farm</span> 클러스터는 여러 가용 영역과 서브넷에 애플리케이션 작업을 분산할 수 있습니다.

### 서브넷 간 Farm 클러스터: 여러 Windows 또는 Linux 노드 {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}

![서로 다른 두 서브넷에서 작동하는 부하 분산 Farm 클러스터 다이어그램](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

<span class="notranslate farm-term" translate="no">Farm</span> 노드가 **서로 다른 서브넷**(예: 여러 클라우드 가용 영역)에 있으면 **가상 IP 주소**는 외부 **로드 밸런서(LB)**에 있습니다. 로드 밸런서는 각 서브넷에 있는 서버의 물리 IP 주소로 트래픽을 보냅니다.

#### 트래픽 라우팅 및 부하 분산 규칙 {#intelligent-traffic-routing--load-balancing-rules}

로드 밸런서는 두 가지 기준에 따라 클라이언트 요청을 분산합니다.

  * **부하 분산 규칙:** 예를 들어 **클라이언트 IP 주소** 또는 **클라이언트 TCP 포트**를 기준으로 합니다.
  * **노드 가용성:** SafeKit 상태 확인에 따라 정상 노드에만 트래픽을 보냅니다.

> **⚠️ 참고:** SafeKit은 상태 확인을 제공합니다. 로드 밸런서는 네트워크 또는 클라우드 공급자가 제공합니다.

#### SafeKit 상태 확인 {#safekit-health-check-mechanism}

SafeKit은 각 <span class="notranslate farm-term" translate="no">Farm</span> 서버에 **상태 확인 URL**을 제공합니다. 로드 밸런서는 URL을 조회해 각 서버의 상태를 확인합니다.

  * **노드 UP:** 상태 확인은 `HTTP 200 OK`를 반환합니다. 로드 밸런서는 이 서버로 트래픽을 보냅니다.
  * **노드 DOWN:** 서버나 애플리케이션에 장애가 발생하면 SafeKit은 `HTTP 404 NOT FOUND`를 반환하거나 서버가 응답하지 않습니다. 로드 밸런서는 즉시 해당 노드로 트래픽을 보내지 않습니다.

#### 클라우드 배포: AWS, Azure 및 GCP {#cloud-deployment-standards-aws-azure-and-gcp}

이는 **클라우드 Farm 클러스터**의 표준 아키텍처입니다. 서브넷이나 영역이 중단되어도 다른 노드는 계속 트래픽을 처리합니다. [**Amazon AWS**](</ko/solutions/aws-load-balancing-cluster-failover/>) (AWS Network Load Balancer), [**Microsoft Azure**](</ko/solutions/azure-load-balancing-cluster-failover/>) (Azure Load Balancer), [**Google Cloud (GCP)**](</ko/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing)에서 지원됩니다.

## 가상 IP 구현, 지연 시간 및 애플리케이션 투명성 비교 {#virtual-ip-methods-comparison}

**고가용성 및 재해 복구를 위한 가상 IP 및 DNS 리디렉션 방법 비교.**

환경 및 사용 사례 | 고가용성 유형 | 리디렉션 방법 | 구현 주체 | 네트워크 지연 시간 | 애플리케이션 투명성 및 로컬 IP  
---|---|---|---|---|---  
기본/보조(고가용성) | Mirror 클러스터 | 무상 ARP / MAC 인수 | ✅ SafeKit 제품 | 매우 낮음: 장애 감지 및 GARP 전송 시간 | 완전한 투명성: 가상 IP는 활성 노드에 로컬로 구성됩니다. 클라이언트 IP는 변경되지 않습니다.  
부하 분산(액티브/액티브) | <span class="notranslate farm-term" translate="no">Farm</span> 클러스터 | 커널 네트워크 필터 / GARP | ✅ SafeKit 제품 | 매우 낮음: 장애 감지 및 네트워크 필터 변경 시간 | 완전한 투명성: 가상 IP는 모든 노드에 로컬로 구성됩니다. 클라이언트 IP는 변경되지 않습니다.  
동일 서브넷 / 확장 LAN(확장 VLAN) | 재해 복구(원격 데이터 센터) | IP 별칭 / GARP | ✅ SafeKit 제품(확장 VLAN은 네트워크 팀이 제공) | 낮음: 확장 VLAN의 왕복 시간(RTT)에 따라 다름 | 완전한 투명성: 가상 IP는 노드에 로컬로 구성됩니다. 클라이언트 IP는 변경되지 않습니다.  
서로 다른 서브넷: 로드 밸런서만 사용 | 재해 복구(원격 데이터 센터 / 클라우드) | 외부 로드 밸런서 | 🛠️ 통합자: 로드 밸런서 구성(SafeKit은 상태 확인 제공) | 보통: 로드 밸런서 상태 확인 간격에 따라 다름 | ⚠️ SNAT/DNAT를 사용하는 경우 투명성은 부분적입니다. 가상 IP는 노드에 로컬로 구성되지 **않습니다**. 클라이언트 IP가 유지되지 **않을 수 있습니다**. 애플리케이션에서 지원해야 합니다.  
서로 다른 서브넷: 로드 밸런서 + SafeKit 로컬 가상 IP | 재해 복구(원격 데이터 센터 / 클라우드) | Floating IP / Direct Server Return을 사용하는 외부 로드 밸런서 | 🛠️ 통합자: 로드 밸런서 구성(SafeKit은 상태 확인 제공) | 보통: 로드 밸런서 상태 확인 간격에 따라 다름 | 우수한 투명성: 가상 IP는 기본 노드에 로컬로 구성되고 목적지 주소로 사용됩니다.  
서로 다른 서브넷: 클라우드 CLI | 재해 복구(클라우드) | 클라우드 API: 프라이빗 IP 또는 클라우드 경로를 새 기본 서버로 이동 | 🛠️ 통합자: `start_prim` 스크립트에 클라우드 CLI 명령 추가 | 보통에서 높음: 클라우드 API 응답 시간에 따라 다름 | 완전한 투명성: 가상 IP는 기본 노드에 로컬로 구성됩니다. 클라이언트 IP는 변경되지 않습니다.  
서로 다른 서브넷: BGP | 재해 복구(원격 데이터 센터 / 클라우드) | BGP로 알리는 /32 경로 | 🛠️ 통합자: `start_prim` 및 `stop_prim` 스크립트에 BGP 명령 추가 | 낮음에서 보통: BGP 수렴 시간에 따라 다름 | 완전한 투명성: 가상 IP는 기본 노드에 로컬로 구성됩니다. 클라이언트 IP는 변경되지 않습니다. BGP 라우터가 필요합니다.  
DNS 리디렉션: 가상 IP 없음 | 재해 복구(원격 데이터 센터) | DNS 레코드 변경(이름 / 물리 IP) | 🛠️ 통합자: `start_prim` 스크립트에 DNS 업데이트 명령 추가 | 높고 예측 불가: DNS TTL 및 클라이언트 DNS 캐시에 따라 다름 | ⚠️ 신뢰할 수 없습니다. 클라이언트가 DNS를 새로 조회해야 합니다. 클라이언트가 시작 시 받은 이전 IP를 계속 사용해 장애 조치 후에도 전환되지 않는 경우가 많습니다.  

## 가상 IP 관련 자주 묻는 질문 {#virtual-ip-faq}

### 가상 IP와 네트워킹 {#virtual-ip--networking}

가상 IP 주소란 무엇이며 물리 IP 주소와 어떻게 다른가요?

**물리 IP 주소**는 네트워크 카드에 연결됩니다. **가상 IP 주소**는 하드웨어에 연결되지 않습니다. SafeKit 클러스터에서 클라이언트는 항상 가상 IP를 사용합니다. 기본 서버에 장애가 발생하면 가상 IP가 정상 노드로 자동 이동합니다. 클라이언트 구성을 변경할 필요가 없습니다.

가상 IP를 사용하려면 하드웨어 로드 밸런서가 필요한가요?

아니요. **SafeKit**은 소프트웨어로 가상 IP를 관리합니다. 동일한 서브넷에서는 **IP 별칭**과 **무상 ARP(GARP)**를 사용해 트래픽을 리디렉션합니다. 외부 로드 밸런서나 프록시 서버가 필요하지 않습니다.

무상 ARP(GARP)란 무엇이며 왜 사용하나요?

**무상 ARP(GARP)**는 모든 장치에 전송되는 네트워크 메시지입니다. 스위치와 라우터의 ARP 테이블을 업데이트합니다. 장애 조치 시 새 기본 서버가 GARP 메시지를 보내 **가상 IP**가 새 기본 서버의 MAC 주소에 연결되었음을 알립니다. 그러면 트래픽이 즉시 재라우팅됩니다.

가상 IP에 DNS 이름을 연결할 수 있나요?

**예.** 가상 IP에 표준 A 레코드를 만드세요. 리디렉션은 **가상 IP 수준**(ARP 또는 네트워크 리디렉션)에서 수행되며 **DNS 수준에서는 수행되지 않습니다**. DNS 지연이나 TTL 문제가 없으며 페일오버는 **애플리케이션에 투명하게** 유지됩니다.

### 클라우드 및 고급 아키텍처 {#cloud--advanced-architectures}

클라우드(AWS, Azure, GCP)에서 가상 IP는 어떻게 작동하나요?

클라우드에서는 레이어 2 GARP 메시지를 사용해 가상 IP를 재라우팅할 수 없습니다. SafeKit은 **클라우드 로드 밸런서**(AWS ELB, Azure LB 또는 Google GCLB)와 연동합니다. SafeKit은 **상태 확인 URL**을 제공합니다. 로드 밸런서가 URL을 조회하고 활성 노드로 트래픽을 보냅니다.

재해 복구에는 확장 LAN이 로드 밸런서보다 더 나은가요?

**예.** 원격 데이터 센터 간에는 장애 조치가 **애플리케이션에 투명하게** 유지되므로 **확장 LAN(확장 VLAN)**이 더 나은 경우가 많습니다. **가상 IP는 변경되지 않으므로** 데이터 센터 간 장애 조치 후에도 애플리케이션과 클라이언트는 같은 주소를 계속 사용합니다.

가상 IP와 비교할 때 DNS 리디렉션의 제한은 무엇인가요?

**DNS 리디렉션**은 **TTL(Time to Live)**과 클라이언트 DNS 캐시에 따라 달라집니다. 복구에 몇 시간이 걸릴 수 있습니다. 또한 DNS를 새로 조회하지 않는 **클라이언트는 장애가 발생한 서버에 계속 연결된 상태로 남습니다**. **가상 IP**는 레이어 2 GARP 메시지를 사용해 즉시 재라우팅됩니다. 클라이언트 DNS 캐시는 영향을 주지 않습니다.

### 투명성 및 보안 {#transparency--security}

로컬 가상 IP가 애플리케이션 투명성에 중요한 이유는 무엇인가요?

로컬 **가상 IP**를 사용하면 애플리케이션은 변경되지 않는 주소를 사용합니다. SafeKit은 **커널**에서 리디렉션하므로 애플리케이션은 장애 조치를 인식하지 못합니다. DNAT를 사용하면 애플리케이션이 사용하는 주소가 변경됩니다.

가상 IP는 클라이언트의 원래 IP 주소를 유지하나요?

예. SafeKit은 소스 NAT(SNAT)를 사용하지 않습니다. 가상 IP가 활성 서버에 로컬로 구성되어 있으므로 애플리케이션은 **클라이언트의 원래 IP 주소**를 받습니다. 이는 보안 감사, 세션 지속성 및 규제 로그에 중요합니다.

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}
