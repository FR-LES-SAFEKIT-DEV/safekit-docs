---
title: "SafeKit mirror 클러스터의 가상 IP 주소 테스트"
canonical: "https://safekit.eviden.com/ko/best-practises/test-primary-backup-vip-mirror/"
description: "GARP 재라우팅, ARP 확인 및 패킷 캡처를 포함하여 SafeKit mirror 클러스터에서 가상 IP 가용성 및 장애 조치를 테스트합니다."
category: "best-practises"
lang: "ko"
topics: "주요 원칙, 필수 구성 요소: 가상 IP(VIP) 구성, 테스트 1 – 기본 서버 가 보유한 가상 IP(VIP), 테스트 2 – 수동 장애 조치(기본 서버 중지), 테스트 3 – arp -a를 사용한 GARP 재라우팅 확인, 테스트 4 – Wireshark(Windows) 또는 tcpdump(Linux)를 사용한 엔드투엔드 확인, 테스트할 워크스테이션, 예상 결과 요약, 문제 해결"
translation: "translate_md 2026-11-05.10 | glossaire 2026-11-05.14 | Translation LLM | 23 expressions"
---

# 네트워크에서 SafeKit mirror 클러스터의 가상 IP 주소 테스트하기 {#testing-the-virtual-ip-address-of-a-safekit-mirror-cluster-in-your-network}

이 가이드는 SafeKit mirror 클러스터 (mirror 모듈)의 가상 IP 주소(VIP)가 네트워크에서 올바르게 작동하는지 확인하는 방법을 설명합니다. 가상 IP(VIP)는 기본 서버 에서 보유하며, 장애 조치 후 새 기본 서버 로 다시 라우팅됩니다.

## 1. 주요 원칙 {#1-key-principles}

**전제 조건:** mirror 클러스터의 두 노드는 동일한 레이어 2 IP 서브넷(LAN 또는 원격 사이트 간에 확장된 VLAN)에 있어야 합니다.

- 가상 IP(VIP)는 **기본 서버** (PRIM 또는 ALONE 상태)에서만 활성화됩니다. 모듈이 노드에서 기본으로 시작될 때 해당 주소의 네트워크 카드에 물리적 IP 주소의 별칭으로 설정됩니다(`where="one_side_alias"` 구성).
- 따라서 기본 서버 의 MAC 주소는 ARP 테이블(라우터, 게이트웨이, 동일 서브넷의 클라이언트)에서 가상 IP(VIP)와 연결된 주소입니다. 가상 IP(VIP)로 가는 모든 트래픽은 기본 서버로 전송됩니다.
- 장애 조치(기본 서버 중단 또는 장애) 중에는 가상 IP(VIP)가 이전 기본 서버에서 제거되고 새 기본 서버에 별칭으로 설정됩니다. 그런 다음 두 가지 메커니즘을 통해 네트워크가 가상 IP(VIP)를 새 기본 서버의 MAC 주소와 연결할 수 있습니다.
  - 가상 IP(VIP)가 네트워크 카드에 별칭으로 추가될 때 운영 체제에서 보내는 네트워크 메시지
  - `<vip>` 섹션에 `arpreroute="on"` 속성이 구성된 경우 SafeKit에서 전송하는 **GARP** (Gratuitous ARP)입니다.

따라서 테스트해야 할 사항은 다음과 같습니다.

1. 가상 IP(VIP)는 기본 서버 가 보유하며 클라이언트에서 도달할 수 있습니다.
2. 기본 서버 변경되면 가상 IP(VIP)와 연결된 MAC 주소는 네트워크(라우터, 게이트웨이, 가상화)의 새 기본 서버로 리디렉션됩니다.

## 2. 사전 요구 사항: 가상 IP(VIP) 구성 {#2-prerequisite-virtual-ip-vip-configuration}

1. mirror 모듈의 `userconfig.xml` 에서 `<vip>` 섹션에 가상 IP(VIP)를 구성합니다. `arpreroute="on"` 속성은 장애 조치 후 새 기본 장치가 GARP를 보내도록 합니다.

   ```xml
   <vip>
     <interface_list>
       <interface arpreroute="on">
         <real_interface>
           <virtual_addr addr="<VIP>" where="one_side_alias"/>
         </real_interface>
       </interface>
     </interface_list>
   </vip>
   ```

2. 두 노드 모두에 구성을 적용합니다.
3. 모듈을 시작합니다. 한 노드는 **PRIM (Ready)** 상태여야 하고 다른 노드는 **SECOND (Ready)** 상태여야 합니다.

## 3. 테스트 1 – 기본 서버 가 보유한 가상 IP(VIP) {#3-test-1--virtual-ip-vip-held-by-the-primary-server}

**단계**

1. 기본 서버 에서 `ipconfig` (Windows) 또는 `ip addr show` (Linux)를 실행합니다.
   → **예상 결과:** 가상 IP(VIP)가 실제 IP 주소의 네트워크 카드에 별칭으로 나타납니다.
2. 보조 서버에서 동일한 명령을 실행합니다.
   → **예상 결과:** 가상 IP(VIP)가 표시되지 않습니다.
3. **클러스터 외부의** 클라이언트 워크스테이션에서 물리적 IP 주소와 가상 IP(VIP)를 모두 `ping`.
   → **예상 결과:** 세 가지 `ping` 명령이 모두 응답합니다(방화벽에서 필터링되지 않은 경우).
4. SafeKit 모자이크 통해 가상 IP(VIP)로 액세스를 확인합니다. **외부** 클라이언트의 브라우저에서 `http://<VIP>:9010/safekit/mosaic.html` 에 연결한 다음(SafeKit 웹 서버 및 콘솔이 HTTPS로 전환된 경우 포트 9453 사용) mirror **모듈 이름을** 입력하고 테스트를 실행합니다.
   → **예상 결과:** 모자이크 의 모든 셀에 **기본 서버**의 이름이 단일 색상으로 표시됩니다. 가상 IP(VIP)에 대한 모든 TCP 연결은 기본 서버에서 처리됩니다.

![모자이크 사용하여 SafeKit mirror 의 가상 IP 주소를 테스트합니다.](/wp-content/uploads/2024/03/appli-20.png)

## 4. 테스트 2 – 수동 장애 조치(기본 서버 중지) {#4-test-2--manual-failover-stop-of-the-primary}

이 테스트는 기본 서버에서 모듈을 중지하여 장애 조치를 유발할 때 가상 IP(VIP)가 기본 서버 따르는지 확인합니다.

**단계**

1. SafeKit 콘솔(또는 `safekit stop -m <module>` 명령줄)에서 기본(노드 1)의 모듈을 중지합니다.
   → **예상 결과:** 노드 1은 STOP (NotReady) 상태가 되고 노드 2는 ALONE (Ready) 상태가 됩니다. 새 기본 노드의 로그에 `Virtual IP <VIP> set` 메시지가 나타납니다.
2. 새 기본 인터페이스에서 `ipconfig` 또는 `ip addr show` 실행하세요.
   → **예상 결과:** 가상 IP(VIP)가 이제 이 노드에 별칭으로 표시되며, 이전 주 노드에는 더 이상 표시되지 않습니다.
3. 클라이언트 워크스테이션에서 세 가지 `ping` 명령을 반복하고 가상 IP(VIP)에서 모자이크 를 다시 실행합니다.
   → **예상 결과:** 모든 것이 응답하고 모자이크 의 모든 셀에 이제 단일 색상으로 **새 기본값**의 이름이 표시됩니다.
4. 노드 1에서 모듈을 다시 시작하면 동기화가 다시 이루어지고 SECOND (Ready) 상태가 되며, 노드 2는 PRIM (Ready) 상태가 됩니다.

## 5. 테스트 3 – `arp -a` 사용하여 MAC 재라우팅 확인 {#5-test-3--checking-mac-rerouting-with-arp--a}

장애 조치 전에 가상 IP(VIP)와 연결된 MAC 주소를 기록한 다음, 장애 조치 후에 해당 주소가 변경되었는지 확인합니다.

이 테스트는 클라이언트 워크스테이션이 클러스터와 **동일한 IP 서브넷**에 있는 경우에만 가능합니다.

클라이언트와 클러스터 사이에 라우터가 있는 경우 클라이언트의 ARP 테이블에는 가상 IP(VIP)가 포함되지 않고 클러스터 네트워크에 도달하는 데 사용되는 게이트웨이의 주소가 포함됩니다. 이 경우 네트워크 팀과 함께 라우터 또는 게이트웨이의 ARP 테이블을 확인하십시오.

**단계**

1. 모듈은 노드 1에서 PRIM (Ready)이고 노드 2에서 SECOND (Ready)입니다.
2. 클라이언트 워크스테이션에서 물리적 IP 주소와 가상 IP(VIP)를 모두 `ping` 다음 `arp -a` 실행합니다.
   → **예상 결과:** 가상 IP(VIP)는 **기본 IP 주소의 물리적 IP 주소와 동일한 MAC 주소**에 연결됩니다.
3. 기본(노드 1)에서 모듈을 `stop`.
4. 가상 IP(VIP)를 다시 `ping` 다음 `arp -a` 다시 실행합니다.
   → **예상 결과:** 가상 IP(VIP)가 이제 **새 주 IP의 물리적 IP 주소와 동일한 MAC 주소**에 연결됩니다.

> ARP 테이블을 읽기 전에 가상 IP(VIP)를 다시 `ping`. 항목이 오래된 것으로 표시되어 `ping` 한 후에만 새로 고쳐질 수 있습니다.

기본 노드를 중지하기 전과 후의 예상 ARP 테이블 예시:

| 주소 | 정차 전 MAC | 정차 후 MAC |
|---|---|---|
| 노드 1의 물리적 IP | 노드 1 MAC | 노드 1 MAC |
| 노드 2의 물리적 IP | 노드 2 MAC | 노드 2 MAC |
| 가상 IP(VIP) | **노드 1 MAC** | **노드 2 MAC** |

## 6. 테스트 4 – Wireshark(Windows) 또는 tcpdump(Linux)를 사용한 엔드투엔드 확인 {#6-test-4--end-to-end-check-with-wireshark-windows-or-tcpdump-linux}

클라이언트와 두 노드 모두에서 패킷을 캡처하여 가상 IP(VIP)에 대한 TCP 연결을 추적할 수 있습니다. Windows 시스템에서는 Wireshark를 사용하고 Linux 시스템에서는 tcpdump를 사용합니다.

**패킷의 MAC(이더넷) 헤더를** 봐야 합니다. 대상 IP 주소는 가상 IP(VIP)로 유지되며, 트래픽을 수신하는 노드를 보여주는 것은 대상 MAC 주소입니다.

**관찰해야 할 사항:**

| 언제 | 패킷 캡처 위치 | 관찰된 MAC 주소 |
|---|---|---|
| 장애 조치 전 | 고객 | 클라이언트 MAC → **노드 1(기본)**의 MAC |
| 장애 조치 전 | 노드 1 | 가상 IP(VIP)로 향하는 패킷은 수신되지만, 노드 2는 아무것도 수신하지 않습니다. |
| 장애 조치 중 | 네트워크 | MAC은 가상 IP(VIP)에 대해 노드 2에서 보낸 메시지를 재라우팅합니다. 이 메시지에는 별칭으로 설정될 때 OS에서 보낸 메시지와 SafeKit(`arpreroute="on"`)에서 보낸 GARP가 포함됩니다. |
| 장애 조치 후 | 고객 | 클라이언트 MAC → **노드 2의 MAC(새 기본)** |

> 클라이언트 워크스테이션이 클러스터와 다른 서브넷에 있는 경우 노드에서 보이는 "클라이언트 MAC"은 클라이언트 워크스테이션의 MAC 주소가 아니라 두 서브넷을 연결하는 **게이트웨이** (라우터)의 MAC 주소입니다.

## 7. 테스트할 워크스테이션 {#7-which-workstations-to-test-from}

이 동작은 클라이언트와 클러스터 간의 네트워크 경로에 따라 달라집니다. 아키텍처와 관련된 각 클라이언트 유형에서 테스트 1과 2를 실행합니다.

| 고객 위치 | 검사 내용 |
|---|---|
| 클러스터와 **동일한 서브넷**에 있는 클라이언트 | 클라이언트 ARP 테이블 업데이트(3가지 테스트 가능) |
| **다른 서브넷**의 클라이언트(라우터, 게이트웨이, 하이퍼바이저 가상 네트워크) | 라우터 또는 게이트웨이에서 클라이언트의 ARP 테이블 업데이트 |
| **Mirror 클러스터의 VM 하나를 호스팅하는 하이퍼바이저의** 클라이언트 VM | 내부 스위칭 및 라우팅도 처리하는 하이퍼바이저의 가상 스위치 동작 |

## 8. 예상 결과 요약 {#8-summary-of-expected-results}

| 테스트 | 조치 | 예상 결과 |
|---|---|---|
| 1 | PRIM / SECOND, `ipconfig`, `ping` 및 모자이크 | 기본 IP에 대한 별칭으로 가상 IP(VIP)를 사용합니다. 3개의 `ping` 명령이 응답합니다(방화벽에서 필터링되지 않은 경우). 모자이크 는 기본 IP만 표시합니다. |
| 2 | 주요 정지 | 새로운 주 노드에 별칭으로 가상 IP(VIP)를 사용합니다. `Virtual IP <VIP> set`. 모자이크 새로운 주 노드만 표시됩니다. |
| 3 | 기본이 중지되기 전후의 `arp -a` | 가상 IP(VIP)가 노드 1의 MAC 주소에서 노드 2의 MAC 주소로 이동합니다. |
| 4 | 장애 조치 전후의 Wireshark 또는 tcpdump 캡처 | 클라이언트는 새 기본 MAC 주소로 전송합니다. |

## 9. 문제 해결 {#9-troubleshooting}

- **장애 조치 후 가상 IP(VIP)가 더 이상 응답하지 않습니다.** MAC 재라우팅 메시지가 경로상의 장치(라우터, 게이트웨이, 가상 스위치)에서 고려되지 않아 이전 기본 장치의 MAC 주소로 계속 트래픽을 보냅니다. 네트워크 팀과 함께 MAC 재라우팅 메시지 처리를 확인하십시오.
- **GARP 전송:** `<vip>` 섹션의 `arpreroute="on"` 속성(`arpinterval` 및 `arpelapse` 포함)은 장애 조치 후 가상 IP(VIP)에서 정기적으로 GARP를 전송합니다. 사용자 가이드 13.6.4절 " [`<vip>` 구문](https://safekit.eviden.com/ko/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) "을 참조하십시오.
- **가상 IP(VIP) ↔ MAC 주소 확인 진단:** 사용 설명서 7.24절 " [가상 IP(VIP) ↔ MAC 주소 확인 문제 해결](https://safekit.eviden.com/ko/resources/safekit-user-guide-82/#_Issue_with_VIP) " 및 7.16절 " [장애 조치 후 가상 IP 문제](https://safekit.eviden.com/ko/resources/safekit-user-guide-82/#_Problem_with_the_1) "를 참조하십시오.

자세한 내용은 다음과 같습니다.
- [고가용성 클러스터링에서 가상 IP 주소는 어떻게 작동하나요?](/ko/best-practises/how-a-virtual-ip-address-works/)
- 가상 IP 주소를 사용한 로드 밸런싱에 대한 자세한 내용은 [SafeKit farm 클러스터에서 로드 밸런싱 가상 IP 주소 테스트를](/ko/best-practises/test-load-balancing-vip-farm/) 참조하십시오.

{{%  insert-safekit-4-buttons-ko  %}}
