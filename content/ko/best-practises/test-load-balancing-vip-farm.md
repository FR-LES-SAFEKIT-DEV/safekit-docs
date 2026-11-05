---
title: "SafeKit farm 클러스터에서 로드 밸런싱 가상 IP 주소 테스트"
canonical: "https://safekit.eviden.com/ko/best-practises/test-load-balancing-vip-farm/"
description: "클러스터 노드 전반에 걸쳐 SafeKit 로드 밸런싱을 테스트하고 가상 IP 장애 조치, GARP 재라우팅 및 네트워크 동작을 확인하는 방법을 알아보세요."
category: "best-practises"
lang: "ko"
topics: "주요 원칙, 필수 구성 요소: SafeKit 모자이크, 테스트 1 – 연결 분배, 테스트 2 – 디스패칭 서버 변경, 테스트 3 – arp -a를 사용한 GARP 재라우팅 확인, 테스트 4 – Wireshark(Windows) 또는 tcpdump(Linux)를 사용한 종단 간 확인, 테스트할 워크스테이션, 예상 결과 요약, 문제 해결, SafeKit farm 솔루션 시연"
translation: "translate_md 2026-11-05.12 | glossaire 2026-11-05.15 | Translation LLM | 23 expressions"
---

# SafeKit <span class="notranslate farm-term" translate="no">farm</span> 클러스터에서 로드 밸런싱 가상 IP 주소 테스트 {#testing-the-load-balancing-virtual-ip-address-in-a-safekit-farm-cluster}

이 가이드는 SafeKit <span class="notranslate farm-term" translate="no">Farm</span> (<span class="notranslate farm-term" translate="no">Farm</span> 모듈, 가상 IP 주소의 로드 밸런싱)이 네트워크에서 올바르게 작동하는지 확인하는 방법(노드 간 연결 분산, 디스패칭 노드 중단 시 가상 IP(VIP) 경로 재설정)을 설명합니다.

## 1. 주요 원칙 {#1-key-principles}

**전제 조건:** <span class="notranslate farm-term" translate="no">Farm</span> 의 모든 노드는 동일한 레이어 2 IP 서브넷(LAN 또는 원격 사이트 간에 확장된 VLAN)에 있어야 합니다.

- 가상 IP(VIP)는 <span class="notranslate farm-term" translate="no">Farm</span> 의 각 노드에 로컬로 구성됩니다. <span class="notranslate farm-term" translate="no">Farm</span> 노드에서 시작될 때 해당 주소의 네트워크 카드에 물리적 IP 주소의 별칭으로 설정됩니다.
- 단일 노드인 **디스패칭 서버는** 가상 IP(VIP)에 대한 네트워크 트래픽을 수신합니다(`vmac_directed` 구성, SafeKit 기본값). 이 노드의 MAC 주소는 ARP 테이블(동일 서브넷의 라우터, 게이트웨이, 클라이언트)에서 가상 IP(VIP)와 연결된 주소입니다.
- 이 노드의 커널 필터는 패킷의 **목적지 MAC 주소를 처리 노드의 MAC 주소로 다시 작성하여** <span class="notranslate farm-term" translate="no">Farm</span> 의 노드에 TCP 연결을 분산합니다(목적지 IP 주소는 가상 IP(VIP)로 유지됨). 응답은 연결을 처리하는 노드에서 클라이언트로 직접 전송됩니다.
- 필터가 수행하는 배포는 **결정론적** 입니다. 처리 노드는 구성된 로드 밸런싱 규칙에 따라 클라이언트의 ID에서 계산됩니다.
  - **클라이언트 IP 주소** 기준(`filter="on_addr"`): 특정 클라이언트는 항상 동일한 노드에서 서비스를 받으므로 세션 친화성이 보장됩니다.
  - **클라이언트 TCP 포트** (`filter="on_port"`)의 경우: 동일한 클라이언트의 각 TCP 연결은 다른 노드에서 처리될 수 있습니다. 이것은 모자이크 (섹션 2)에 사용되는 규칙이며, 따라서 단일 워크스테이션의 모든 노드를 보여줍니다.
- 디스패칭 서버가 중지되면 다른 노드가 이 역할을 인계받아 **GARP** (Gratuitous ARP)를 전송하므로 네트워크가 가상 IP(VIP)를 자체 MAC 주소와 연관시킵니다.

따라서 테스트해야 할 사항은 다음과 같습니다.

1. 연결이 모든 노드에 올바르게 분산되어 있는지
2. 디스패치 서버가 변경될 때 네트워크(라우터, 게이트웨이, 가상화)가 GARP 고려해야 한다는 것입니다.

## 2. 필수 구성 요소: SafeKit 모자이크 {#2-prerequisite-the-safekit-mosaic}

모자이크 는 SafeKit에서 제공하는 테스트 페이지입니다. 가상 IP(VIP)에 여러 TCP 연결을 열고 각 연결에 대해 응답한 노드의 이름을 표시합니다. 이를 통해 배포 상태를 한눈에 확인할 수 있습니다.

1. <span class="notranslate farm-term" translate="no">Farm</span> 모듈의 `userconfig.xml` 파일에서 `<vip>` 섹션에 SafeKit 웹 서버 포트에 대한 로드 밸런싱 규칙을 추가합니다. 포트 9010에서 HTTP를 사용하는 SafeKit 웹 서버의 예시는 다음과 같습니다.

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   SafeKit 웹 서버와 콘솔이 HTTPS로 전환된 경우 9010을 9453으로 바꾸십시오.

2. 모든 노드에 구성을 적용합니다.
3. **<span class="notranslate farm-term" translate="no">Farm</span> 외부의** 클라이언트 워크스테이션에 있는 브라우저에서 다음 주소에 연결합니다.

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   그런 다음 <span class="notranslate farm-term" translate="no">Farm</span> **모듈 이름을** 입력하고 테스트를 실행합니다. 모자이크 의 각 셀에는 TCP 연결에 응답한 노드의 이름이 표시되며, 동일한 노드에서 제공하는 모자이크 블록을 명확하게 보여주기 위해 각 노드에 색상이 연결됩니다.

   HTTPS의 경우, 포트 9453의 로드 밸런싱 규칙과 함께 `https://<VIP>:9453/safekit/mosaic.html` 사용하십시오.

![모자이크 사용하여 SafeKit <span class="notranslate farm-term" translate="no">farm</span> 의 가상 IP 주소를 테스트합니다.](/wp-content/uploads/2024/03/appli-19.png)

" [SafeKit <span class="notranslate farm-term" translate="no">farm</span> 솔루션 시연](/ko/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/#demonstration-of-the-safekit-farm-solution) " 섹션에서 모자이크 테스트 비디오를 시청하세요.

## 3. 테스트 1 – 연결 분포 {#3-test-1--distribution-of-connections}

**단계**

1. 모든 노드에서 <span class="notranslate farm-term" translate="no">Farm</span> 시작합니다(UP 상태).
2. 클라이언트 워크스테이션에서 모자이크 엽니다.

**예상 결과:** 모자이크 <span class="notranslate farm-term" translate="no">Farm</span> 의 **모든 노드** 이름이 표시되며, 각 처리 노드마다 다른 색상이 지정됩니다.

이는 업스트림 라우터 또는 게이트웨이가 MAC 주소를 통해 노드 중 하나에 도달하며, 이 노드가 연결을 올바르게 분배한다는 것을 증명합니다.

## 4. 테스트 2 – 디스패칭 서버 변경 {#4-test-2--change-of-dispatching-server}

이 테스트는 디스패칭 서버가 중지될 때 <span class="notranslate farm-term" translate="no">Farm</span> 계속 응답하는지 확인합니다.

**단계**

1. <span class="notranslate farm-term" translate="no">Farm</span> 을 중지합니다. 즉, SafeKit의 모든 노드를 중지합니다.
2. **단일 노드를** 시작합니다. 이 노드가 디스패칭 서버가 됩니다.
   → **예상 결과:** 모자이크 이 노드만 표시됩니다.
3. 다른 노드를 시작합니다.
   → **예상 결과:** 모자이크 모든 노드가 표시됩니다.
4. 디스패칭 서버 역할을 하는 **첫 번째 노드를** 중지합니다.
   → **예상 결과:** 모자이크 나머지 노드가 표시됩니다.

> **이 테스트의 한계:** 4단계에서 올바른 결과가 나왔다고 해서 GARP 작동한다는 증거는 아닙니다. 다른 노드에서 <span class="notranslate farm-term" translate="no">Farm</span> 모듈이 시작되면(3단계) 가상 IP 주소가 해당 노드에 구성되고, 이로 인해 네트워크에 메시지가 생성되어 가상 IP 주소/MAC 주소 연결이 이미 재라우팅될 수 있습니다. GARP 실제로 테스트하는 것은 3단계와 4단계뿐입니다.

> <span class="notranslate farm-term" translate="no">Farm</span> 의 다른 노드(디스패치 서버가 아닌 노드)를 중지하면 배포의 재구성만 테스트됩니다.

## 5. 테스트 3 – `arp -a` 사용하여 GARP 재라우팅 확인 {#5-test-3--checking-garp-rerouting-with-arp--a}

테스트 4와 함께 이 테스트는 GARP 실제로 확인합니다. 디스패칭 서버를 중지하기 전에 MAC 주소를 기록한 다음, 가상 IP(VIP)/MAC 연결이 변경되었는지 확인합니다.

이 테스트는 모자이크 표시하는 클라이언트 워크스테이션 <span class="notranslate farm-term" translate="no">Farm</span> 과 **동일한 IP 서브넷**에 있는 경우에만 가능합니다.

클라이언트와 <span class="notranslate farm-term" translate="no">Farm</span> 사이에 라우터가 있는 경우 클라이언트의 ARP 테이블에는 가상 IP(VIP)가 포함되지 않고 <span class="notranslate farm-term" translate="no">Farm</span> 네트워크에 도달하는 데 사용되는 게이트웨이 주소가 포함됩니다. 이 경우 네트워크 팀과 함께 라우터 또는 게이트웨이의 ARP 테이블을 확인하십시오.

**단계**

1. 모든 노드에서 <span class="notranslate farm-term" translate="no">Farm</span> 시작합니다.
2. 클라이언트 워크스테이션에서 `arp -a` 실행하고 가상 IP(VIP)와 연결된 MAC 주소를 기록합니다. 이 주소는 디스패칭 서버를 식별합니다.
3. 이 MAC 주소를 가진 <span class="notranslate farm-term" translate="no">Farm</span> 노드를 중지합니다.
4. 모자이크 나머지 노드에서도 여전히 작동하는지 확인하세요.
5. `arp -a` 다시 실행하여 새로운 가상 IP(VIP)/MAC 연결을 읽고 새로운 디스패칭 서버를 식별합니다.

## 6. 테스트 4 – Wireshark(Windows) 또는 tcpdump(Linux)를 사용한 엔드투엔드 확인 {#6-test-4--end-to-end-check-with-wireshark-windows-or-tcpdump-linux}

클라이언트와 <span class="notranslate farm-term" translate="no">Farm</span> 노드에서 패킷을 캡처하여 가상 IP(VIP)에 대한 TCP 연결을 추적할 수 있습니다. Windows 시스템에서는 Wireshark를 사용하고 Linux 시스템에서는 tcpdump를 사용합니다.

IP 주소뿐만 아니라 **패킷의 MAC(이더넷) 헤더를** 살펴봐야 합니다. 디스패칭 서버의 커널 필터는 패킷의 **목적지 MAC 주소를 처리 노드의 MAC 주소로 다시 작성하여** 연결을 분산합니다. 목적지 IP 주소는 전체 경로를 따라 가상 IP(VIP)로 유지됩니다.

**동일한 SYN 패킷에 대해 확인해야 할 사항:**

| 단계 | 패킷 캡처 위치 | 관찰된 MAC 주소 |
|---|---|---|
| 1. 클라이언트가 가상 IP(VIP)로 전송합니다. | 고객 | 클라이언트 MAC → **디스패칭 서버**의 MAC |
| 2. 디스패칭 서버가 연결을 전달합니다. | 디스패칭 서버 | 디스패치 서버 MAC → **처리 노드**의 MAC |
| 3. 처리 노드가 수신합니다. | 처리 노드 | 서버 MAC → 노드 MAC 전송 |
| 4. 노드는 클라이언트에 직접 응답합니다. | 처리 노드 | 노드 MAC → 클라이언트 MAC |
| 5. 클라이언트가 응답을 받습니다. | 고객 | 노드 MAC → 클라이언트 MAC |

> 클라이언트 워크스테이션이 <span class="notranslate farm-term" translate="no">Farm</span> 과 다른 서브넷에 있는 경우, <span class="notranslate farm-term" translate="no">Farm</span> 노드에서 보이는 "클라이언트 MAC"은 클라이언트 워크스테이션의 MAC 주소가 아니라 두 서브넷을 연결하는 **게이트웨이** (라우터)의 MAC 주소입니다.

디스패칭 서버를 중지한 후 캡처를 반복합니다(테스트 2, 4단계). 이제 1단계에서 **새** 디스패칭 서버의 MAC 주소가 표시되어야 합니다.

## 7. 테스트할 워크스테이션 {#7-which-workstations-to-test-from}

이 동작은 클라이언트와 <span class="notranslate farm-term" translate="no">Farm</span> 간의 네트워크 경로에 따라 달라집니다. 아키텍처와 관련된 각 클라이언트 유형에서 테스트 1과 2를 실행합니다.

| 고객 위치 | 검사 내용 |
|---|---|
| <span class="notranslate farm-term" translate="no">Farm</span> 과 **동일한 서브넷**에 있는 클라이언트 | GARP를 통한 클라이언트 ARP 테이블 업데이트(3가지 테스트 가능) |
| **다른 서브넷**의 클라이언트(라우터, 게이트웨이, 하이퍼바이저 가상 네트워크) | 라우터 또는 게이트웨이의 GARP 처리 |
| **<span class="notranslate farm-term" translate="no">Farm</span> VM도 호스팅하는 하이퍼바이저의** 클라이언트 VM | 내부 스위칭 및 라우팅도 처리하는 하이퍼바이저의 가상 스위치 동작 |

## 8. 예상 결과 요약 {#8-summary-of-expected-results}

| 테스트 | 조치 | 예상 결과 |
|---|---|---|
| 1 | 모든 노드 UP, 모자이크 | 모든 노드가 표시됩니다. |
| 2.2 | 단일 노드가 시작되었습니다. | 이 노드만 표시됩니다. |
| 2.3 | 모든 노드가 시작되었습니다. | 모든 노드가 표시됩니다. |
| 2.4 | 디스패치 서버가 중지되었습니다. | 나머지 노드는 영구적인 중단 없이 나타납니다. |
| 3 | 중지 전후의 `arp -a` | 가상 IP(VIP)와 연결된 MAC 주소가 변경됩니다. |
| 4 | 중지 전후의 Wireshark 또는 tcpdump 캡처 | 클라이언트는 새 디스패칭 서버의 MAC 주소로 전송합니다. |

## 9. 문제 해결 {#9-troubleshooting}

- **로드 밸런싱 비트맵:** 테스트 및 로드 밸런싱 비트맵에 대한 자세한 내용은 SafeKit 8.2 사용 설명서의 4.3.5절 " [가상 IP 주소에서 TCP 로드 밸런싱 테스트](https://safekit.eviden.com/ko/resources/safekit-user-guide-82/#Mosaic) "를 참조하십시오.
- **디스패치 서버가 중지된 후 모자이크 더 이상 응답하지 않습니다.** 경로상의 장치(라우터, 게이트웨이, 가상 스위치)에서 GARP 고려되지 않습니다. 네트워크 팀에 GARP 처리를 확인하십시오.
- **GARP 주기적 전송:** `<vip>` 섹션의 `arpreroute="on"` 속성(`arpinterval` 및 `arpelapse` 포함)은 VIP에 정기적으로 GARP를 전송합니다. 사용자 가이드 13.6.4절 " [`<vip>` 구문](https://safekit.eviden.com/ko/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) "을 참조하십시오.
- **가상 IP(VIP) ↔ MAC 주소 확인 진단:** 사용 설명서 7.24절 " [가상 IP(VIP) ↔ MAC 주소 확인 문제 해결](https://safekit.eviden.com/ko/resources/safekit-user-guide-82/#_Issue_with_VIP) " 및 7.15절 " [<span class="notranslate farm-term" translate="no">Farm</span> 모듈 UP (Ready) 상태이지만 <span class="notranslate farm-term" translate="no">Farm</span> 에서 로드 밸런싱 문제가 발생하는 경우](<https://safekit.eviden.com/ko/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>) "를 참조하십시오.

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> 솔루션 시연 {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ko  %}}

자세한 내용은 다음과 같습니다.
- [고가용성 클러스터링에서 가상 IP 주소는 어떻게 작동하나요?](/ko/best-practises/how-a-virtual-ip-address-works/)
- 가상 IP 주소를 사용한 주/백업 장애 조치에 대해서는 [SafeKit mirror 클러스터의 가상 IP 주소 테스트를](/ko/best-practises/test-primary-backup-vip-mirror/) 참조하십시오.

{{%  insert-safekit-4-buttons-ko  %}}
