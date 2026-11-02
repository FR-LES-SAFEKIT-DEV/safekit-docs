---
title: "SafeKit 팜 클러스터에서 로드 밸런싱 가상 IP 주소 테스트"
canonical: "https://safekit.eviden.com/ko/best-practises/test-load-balancing-vip-farm/"
description: "SafeKit 클러스터 노드 간 로드 밸런싱을 테스트하고 가상 IP 장애 조치, GARP 재라우팅 및 네트워크 동작을 검증하는 방법을 알아보세요."
category: "best-practises"
lang: "ko"
topics: "핵심 원칙, 필수 조건: SafeKit 모자이크, 테스트 1 - 연결 분산, 테스트 2 - 디스패칭 서버 변경, 테스트 3 - arp -a 명령어를 사용한 GARP 재라우팅 확인, 테스트 4 - Wireshark(Windows) 또는 tcpdump(Linux)를 사용한 엔드 투 엔드 검사, 테스트에 사용할 워크스테이션, 예상 결과 요약, 문제 해결"
---

# SafeKit <span class="notranslate farm-term" translate="no">farm</span> 클러스터에서 로드 밸런싱 가상 IP 주소 테스트

이 가이드에서는 SafeKit <span class="notranslate farm-term" translate="no">Farm</span> ( <span class="notranslate farm-term" translate="no">Farm</span> 모듈, 가상 IP 주소 기반 로드 밸런싱)이 네트워크에서 올바르게 작동하는지 확인하는 방법을 설명합니다. 여기에는 노드 간 연결 분산 및 디스패칭 노드가 중지될 때 가상 IP(VIP)의 재라우팅이 포함됩니다.

## 1. 핵심 원칙

**필수 조건:** <span class="notranslate farm-term" translate="no">Farm</span> 의 모든 노드는 동일한 레이어 2 IP 서브넷(LAN 또는 원격 사이트 간에 확장된 VLAN)에 있어야 합니다.

- 가상 IP(VIP)는 <span class="notranslate farm-term" translate="no">Farm</span> 의 각 노드에서 로컬로 구성됩니다. <span class="notranslate farm-term" translate="no">Farm</span> 노드에서 시작될 때 해당 주소의 네트워크 카드에 물리적 IP 주소의 별칭으로 설정됩니다.
- 단일 노드인 **디스패칭 서버** 는 가상 IP(VIP)에 대한 네트워크 트래픽을 수신합니다( `vmac_directed` 구성, SafeKit 기본값). 해당 MAC 주소는 ARP 테이블(동일 서브넷 내의 라우터, 게이트웨이, 클라이언트)에서 가상 IP(VIP)와 연결된 주소입니다.
- 이 노드의 커널 필터는 패킷의 **목적지 MAC 주소를 처리 노드의 MAC 주소로 변경하여** TCP 연결을 <span class="notranslate farm-term" translate="no">Farm</span> 의 여러 노드에 분산합니다(목적지 IP 주소는 가상 IP(VIP)로 유지됩니다). 응답은 연결을 처리하는 노드에서 클라이언트로 직접 전송됩니다.
- 필터에 의해 수행되는 분산은 **결정론적** 입니다. 처리 노드는 구성된 로드 밸런싱 규칙에 따라 클라이언트 ID로부터 계산됩니다.
  - **클라이언트 IP 주소** ( `filter="on_addr"` )를 사용하면 특정 클라이언트는 항상 동일한 노드에서 서비스를 받게 되어 세션 안정성이 보장됩니다.
  - **클라이언트 TCP 포트** ( `filter="on_port"` )에서 동일한 클라이언트의 각 TCP 연결은 서로 다른 노드에서 처리될 수 있습니다. 이는 모자이크(섹션 2)에 사용되는 규칙이며, 따라서 단일 워크스테이션의 모든 노드를 표시합니다.
- 디스패칭 서버가 중지되면 다른 노드가 이 역할을 인계받아 **GARP** (gratuitous ARP)를 전송하여 네트워크가 가상 IP(VIP)를 자체 MAC 주소와 연결하도록 합니다.

따라서 테스트해야 할 사항은 다음과 같습니다.

1. 연결이 모든 노드에 올바르게 분산되어 있는지 확인합니다.
2. 네트워크(라우터, 게이트웨이, 가상화)가 디스패칭 서버가 변경될 때 GARP를 고려한다는 것입니다.

## 2. 필수 조건: SafeKit 모자이크

모자이크 이미지는 SafeKit에서 제공하는 테스트 페이지입니다. 이 페이지는 가상 IP(VIP)에 여러 TCP 연결을 열고 각 연결에 응답한 노드의 이름을 표시합니다. 이를 통해 네트워크 분포를 한눈에 파악할 수 있습니다.

1. <span class="notranslate farm-term" translate="no">Farm</span> 모듈의 `userconfig.xml` 파일에서 `<vip>` 섹션에 SafeKit 웹 서버 포트에 대한 로드 밸런싱 규칙을 추가합니다. SafeKit 웹 서버가 HTTP를 사용하고 포트가 9010인 경우의 예는 다음과 같습니다.

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   SafeKit 웹 서버와 콘솔이 HTTPS로 전환된 경우 9010을 9453으로 바꾸십시오.

2. 모든 노드에 설정을 적용하십시오.
3. **<span class="notranslate farm-term" translate="no">Farm</span> 외부의** 클라이언트 워크스테이션에서 브라우저를 사용하여 다음 주소에 연결하십시오.

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   그런 다음 <span class="notranslate farm-term" translate="no">Farm</span> **모듈 이름을** 입력하고 테스트를 실행합니다. 모자이크의 각 셀에는 TCP 연결에 응답한 노드의 이름이 표시되며, 각 노드에는 색상이 지정되어 동일한 노드가 서비스하는 모자이크 블록을 명확하게 보여줍니다.

   HTTPS를 사용하는 경우, `https://<VIP>:9453/safekit/mosaic.html` 사용하고, 9453번 포트에 로드 밸런싱 규칙을 적용하십시오.

해당 테스트는 SafeKit 8.2 사용자 가이드의 4.3.5절 " [가상 IP 주소에서 TCP 로드 밸런싱 테스트](https://safekit.eviden.com/ko/resources/safekit-user-guide-82/#Mosaic) "에 자세히 설명되어 있습니다.

## 3. 테스트 1 – 연결 분포

**단계**

1. 모든 노드에서 <span class="notranslate farm-term" translate="no">Farm</span> 시작하십시오(UP 상태).
2. 클라이언트 워크스테이션에서 모자이크를 엽니다.

**예상 결과:** 모자이크 이미지에 <span class="notranslate farm-term" translate="no">Farm</span> 의 **모든 노드** 이름이 표시되고, 각 처리 노드마다 다른 색상이 사용됩니다.

이는 상위 라우터 또는 게이트웨이가 MAC 주소를 통해 노드 중 하나에 도달하고, 해당 노드가 연결을 올바르게 분배한다는 것을 증명합니다.

## 4. 테스트 2 – 배송 서버 변경

이 테스트는 디스패칭 서버가 중지될 때 <span class="notranslate farm-term" translate="no">Farm</span> 계속 응답하는지 확인합니다.

**단계**

1. SafeKit의 모든 노드를 <span class="notranslate farm-term" translate="no">Farm</span> 시키세요.
2. **단일 노드를** 시작합니다. 이 노드가 디스패칭 서버 역할을 합니다.
   → **예상 결과:** 모자이크 이미지에 해당 노드만 표시됩니다.
3. 나머지 노드를 시작하세요.
   → **예상 결과:** 모자이크에 모든 노드가 표시됩니다.
4. **첫 번째 노드** , 즉 디스패칭 서버 역할을 하는 노드를 중지하십시오.
   → **예상 결과:** 모자이크 이미지에 나머지 노드들이 표시됩니다.

**이 테스트의 한계점:** 4단계에서 올바른 결과가 나왔다고 해서 GARP가 제대로 작동한다는 것을 증명하는 것은 아닙니다. <span class="notranslate farm-term" translate="no">Farm</span> 모듈이 다른 노드에서 시작될 때(3단계), 해당 노드에 가상 IP 주소가 구성되는데, 이로 인해 네트워크에서 메시지가 생성되고, 이 메시지로 인해 가상 IP 주소/MAC 주소 연결이 이미 재라우팅될 수 있습니다. 따라서 3단계와 4단계만이 GARP를 실제로 테스트하는 단계입니다.

<span class="notranslate farm-term" translate="no">Farm</span> 의 다른 노드(배송 서버가 아닌 노드)를 중지하는 것은 배포 재구성 테스트만을 위한 것입니다.

## 5. 테스트 3 – `arp -a` 를 이용한 GARP 재라우팅 확인

테스트 4와 함께 이 테스트는 GARP를 실제로 확인합니다. 서버를 중지하기 전에 디스패칭 서버의 MAC 주소를 기록한 다음, 이후 가상 IP(VIP)/MAC 연결이 변경되었는지 확인합니다.

이 테스트는 모자이크 이미지를 표시하는 클라이언트 워크스테이션 <span class="notranslate farm-term" translate="no">Farm</span> 과 **동일한 IP 서브넷** 에 있는 경우에만 가능합니다.

클라이언트와 <span class="notranslate farm-term" translate="no">Farm</span> 사이에 라우터가 있는 경우, 클라이언트의 ARP 테이블에는 가상 IP(VIP)가 아닌 <span class="notranslate farm-term" translate="no">Farm</span> 네트워크에 접속하는 데 사용되는 게이트웨이 주소가 포함됩니다. 이 경우 네트워크 팀에 문의하여 라우터 또는 게이트웨이의 ARP 테이블을 확인하십시오.

**단계**

1. 모든 노드에서 <span class="notranslate farm-term" translate="no">Farm</span> 시작하세요.
2. 클라이언트 워크스테이션에서 `arp -a` 실행하고 가상 IP(VIP)와 연결된 MAC 주소를 확인합니다. 이 주소가 디스패칭 서버를 식별합니다.
3. 해당 MAC 주소를 가진 <span class="notranslate farm-term" translate="no">Farm</span> 노드를 중지하십시오.
4. 나머지 노드를 사용해도 모자이크가 제대로 작동하는지 확인하십시오.
5. `arp -a` 다시 실행하여 새로운 가상 IP(VIP)/MAC 연결을 읽고 새로운 디스패칭 서버를 확인하십시오.

## 6. 테스트 4 – Wireshark(Windows) 또는 tcpdump(Linux)를 사용한 엔드투엔드 검사

클라이언트와 <span class="notranslate farm-term" translate="no">Farm</span> 노드에서 패킷을 캡처하여 가상 IP(VIP)에 대한 TCP 연결을 추적할 수 있습니다. Windows 시스템에서는 Wireshark를, Linux 시스템에서는 tcpdump를 사용할 수 있습니다.

**패킷의 IP 주소뿐만 아니라 MAC(이더넷) 헤더** 도 확인해야 합니다. 디스패칭 서버의 커널 필터는 패킷의 **목적지 MAC 주소를 처리 노드의 MAC 주소로 변경하여** 연결을 분배합니다. 목적지 IP 주소는 전체 경로에서 가상 IP(VIP)로 유지됩니다.

**동일한 SYN 패킷에 대해 관찰해야 할 사항은 다음과 같습니다.**

| 단계 | 캡처 위치 | 관찰된 MAC 주소 |
|---|---|---|
| 1. 클라이언트가 가상 IP(VIP)로 전송 | 클라이언트 | 클라이언트 MAC 주소 → **전송 서버** 의 MAC 주소 |
| 2. 디스패칭 서버는 연결을 전달합니다 | 디스패칭 서버 | 디스패칭 MAC 주소 → **처리 노드** 의 MAC 주소 |
| 3. 처리 노드는 수신합니다 | 처리 노드 | 디스패칭 MAC → 노드 MAC |
| 4. 노드가 클라이언트에 직접 응답합니다 | 처리 노드 | 노드 MAC 주소 → 클라이언트 MAC 주소 |
| 5. 클라이언트가 응답을 수신합니다 | 클라이언트 | 노드 MAC 주소 → 클라이언트 MAC 주소 |

클라이언트 워크스테이션이 <span class="notranslate farm-term" translate="no">Farm</span> 과 다른 서브넷에 있는 경우, <span class="notranslate farm-term" translate="no">Farm</span> 노드에서 보이는 "클라이언트 MAC"은 클라이언트 워크스테이션의 MAC 주소가 아니라 두 서브넷을 연결하는 **게이트웨이** (라우터)의 MAC 주소입니다.

관제 서버를 중지한 후 캡처를 다시 수행합니다(테스트 2, 4단계). 이제 1단계에서 **새** 관제 서버의 MAC 주소가 표시되어야 합니다.

## 7. 어떤 워크스테이션에서 테스트를 진행해야 할까요?

동작은 클라이언트와 <span class="notranslate farm-term" translate="no">Farm</span> 간의 네트워크 경로에 따라 달라집니다. 아키텍처에 맞는 각 클라이언트 유형별로 테스트 1과 2를 실행하십시오.

| 클라이언트 위치 | 테스트에서 확인하는 내용 |
|---|---|
| 클라이언트가 <span class="notranslate farm-term" translate="no">Farm</span> 과 **동일한 서브넷** 에 있음 | GARP를 통한 클라이언트의 ARP 테이블 업데이트 (테스트 3 가능) |
클라이언트가 **다른 서브넷** (라우터, 게이트웨이, 하이퍼바이저 가상 네트워크)에 있는 | | 또는 게이트웨이에 의한 GARP 처리 |
| **<span class="notranslate farm-term" translate="no">Farm</span> VM을 호스팅하는 하이퍼바이저 상의** 클라이언트 VM | 내부 스위칭 및 라우팅을 처리하는 하이퍼바이저의 가상 스위치 동작 |

## 8. 예상 결과 요약

| 테스트 | 조치 | 예상 결과 |
|---|---|---|
| 1 | 모든 노드가 위로, 모자이크 | 모든 노드가 나타납니다 |
| 2.2 | 단일 노드가 시작되었습니다 | 이 노드만 표시됩니다 |
| 2.3 | 모든 노드가 시작되었습니다 | 모든 노드가 표시됩니다 |
| 2.4 | 디스패칭 서버가 중지되었습니다 | 나머지 노드들이 중단 없이 나타납니다 |
| 3 | 정지 전후의 `arp -a` | 가상 IP(VIP)와 연결된 MAC 주소가 변경됩니다 |
| 4 | 중지 전후의 Wireshark 또는 tcpdump 캡처 | 클라이언트는 새로운 디스패칭 서버의 MAC 주소로 패킷을 전송합니다 |

## 9. 문제 해결

- **디스패칭 서버가 중지된 후 모자이크가 더 이상 응답하지 않습니다.** 경로상의 장치(라우터, 게이트웨이, 가상 스위치)에서 GARP를 고려하지 않는 것 같습니다. 네트워크 팀에 GARP 처리 설정을 확인하십시오.
- **주기적인 GARP 전송:** `<vip>` 섹션의 `arpreroute="on"` 속성( `arpinterval` 및 `arpelapse` 포함)은 VIP에 대해 정기적으로 GARP를 전송합니다. 사용자 가이드 13.6.4절 " [`<vip>` 구문](https://safekit.eviden.com/ko/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) "을 참조하십시오.
- **가상 IP(VIP) ↔ MAC 주소 확인 문제 진단:** 사용자 가이드 7.24절 " [가상 IP(VIP) ↔ MAC 주소 확인 문제 해결](https://safekit.eviden.com/ko/resources/safekit-user-guide-82/#_Issue_with_VIP) " 및 7.15절 " [<span class="notranslate farm-term" translate="no">Farm</span> 모듈은 UP(준비됨)이지만 <span class="notranslate farm-term" translate="no">Farm</span> 에서 로드 밸런싱 문제가 발생함](<https://safekit.eviden.com/ko/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>) "을 참조하십시오.

가상 IP 주소를 사용한 기본/백업 페일오버에 대해서는 [SafeKit 미러 클러스터의 가상 IP 주소 테스트를](/ko/best-practises/test-primary-backup-vip-mirror/) 참조하세요.
{{% insert-safekit-4-buttons-ko %}}
