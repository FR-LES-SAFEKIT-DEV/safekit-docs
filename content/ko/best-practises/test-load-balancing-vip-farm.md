---
제목: "0-1 클러스터에서 로드 밸런싱 가상 IP 주소 테스트"
정규: "https://safekit.eviden.com/ko/best-practises/test-load-balancing-vip-farm/"
설명: "클러스터 노드 간 로드 밸런싱을 테스트하고 가상 IP 장애 조치, GARP 재라우팅 및 네트워크 동작을 검증하는 방법을 알아보세요."
카테고리: "모범 사례"
lang: "ko"
주제: "핵심 원칙, 필수 조건: SafeKit 모자이크, 테스트 1 - 연결 분산, 테스트 2 - 디스패칭 서버 변경, 테스트 3 - arp -a 명령어를 사용한 GARP 재라우팅 확인, 테스트 4 - Wireshark(Windows) 또는 tcpdump(Linux)를 사용한 종단 간 검사, 테스트에 사용할 워크스테이션, 예상 결과 요약, 문제 해결"
---

# 0, 1, 2, 3 클러스터에서 로드 밸런싱 가상 IP 주소 테스트

이 가이드에서는 SafeKit <span class="notranslate farm-term" translate="no">Farm</span> (<span class="notranslate farm-term" translate="no">Farm</span> 모듈, 가상 IP 주소 기반 로드 밸런싱)이 네트워크에서 올바르게 작동하는지 확인하는 방법을 설명합니다. 여기에는 노드 간 연결 분산 및 디스패칭 노드가 중지될 때 가상 IP(VIP)의 재라우팅이 포함됩니다.

## 1. 핵심 원칙

0 전제 조건: 1 2 3 4의 모든 노드는 동일한 레이어 2 IP 서브넷(LAN 또는 원격 사이트 간에 확장된 VLAN)에 있어야 합니다.

- 가상 IP(VIP)는 <span class="notranslate farm-term" translate="no">Farm</span>의 각 노드에서 로컬로 구성됩니다. <span class="notranslate farm-term" translate="no">Farm</span>가 노드에서 시작될 때 해당 주소의 네트워크 카드에서 물리적 IP 주소의 별칭으로 설정됩니다.
- 단일 노드인 **디스패칭 서버**는 가상 IP(VIP)에 대한 네트워크 트래픽을 수신합니다(`vmac_directed` 구성, SafeKit 기본값): 해당 MAC 주소는 ARP 테이블(동일 서브넷의 라우터, 게이트웨이, 클라이언트)에서 가상 IP(VIP)와 연결된 주소입니다.
- 이 노드의 커널 필터는 패킷의 목적지 MAC 주소를 처리 노드의 MAC 주소로 다시 작성함으로써 TCP 연결을 <span class="notranslate farm-term" translate="no">Farm</span> 노드에 분산시킵니다(목적지 IP 주소는 가상 IP(VIP)로 유지됩니다). 응답은 연결을 처리하는 노드에서 클라이언트로 직접 전송됩니다.
- 필터에 의해 수행되는 분산 방식은 **결정적**입니다. 처리 노드는 구성된 로드 밸런싱 규칙에 따라 클라이언트 ID로부터 계산됩니다.
  - **클라이언트 IP 주소**(`filter="on_addr"`)에서: 주어진 클라이언트는 항상 동일한 노드에서 서비스를 받으므로 세션 선호도가 보장됩니다.
  - 클라이언트 TCP 포트 1(2)에서: 동일한 클라이언트의 각 TCP 연결은 서로 다른 노드에서 처리될 수 있습니다. 이는 모자이크(섹션 2)에 사용되는 규칙이며, 따라서 단일 워크스테이션의 모든 노드를 보여줍니다.
- 디스패칭 서버가 중지되면 다른 노드가 이 역할을 인계받아 **GARPs**(gratuitous ARP)를 전송하여 네트워크가 가상 IP(VIP)를 자체 MAC 주소와 연결하도록 합니다.

따라서 테스트해야 할 사항은 다음과 같습니다.

1. 연결이 모든 노드에 올바르게 분산되어 있는지 확인합니다.
2. 네트워크(라우터, 게이트웨이, 가상화)가 디스패칭 서버가 변경될 때 GARP를 고려한다는 점.

## 2. 필수 조건: SafeKit 모자이크

모자이크는 SafeKit에서 제공하는 테스트 페이지입니다. 이 페이지는 가상 IP(VIP)에 여러 TCP 연결을 열고 각 연결에 응답한 노드의 이름을 표시합니다. 이를 통해 네트워크 분포를 한눈에 확인할 수 있습니다.

1. <span class="notranslate farm-term" translate="no">Farm</span> 모듈의 `userconfig.xml` 섹션에 SafeKit 웹 서버의 포트에 대한 로드 밸런싱 규칙을 추가합니다. 예: SafeKit 웹 서버는 HTTP를 사용하며 포트는 9010입니다.

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   웹 서버와 콘솔이 HTTPS로 전환된 경우 9010을 9453으로 바꾸십시오.

2. 모든 노드에 설정을 적용합니다.
3. 클라이언트 워크스테이션 **외부 <span class="notranslate farm-term" translate="no">Farm</span>**의 브라우저에서 다음 위치에 연결하십시오.

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   그런 다음 <span class="notranslate farm-term" translate="no">Farm</span> **모듈 이름**을 입력하고 테스트를 실행합니다. 모자이크의 각 셀에는 TCP 연결에 응답한 노드의 이름이 표시되며, 각 노드에는 색상이 지정되어 동일한 노드가 처리하는 모자이크 블록을 명확하게 보여줍니다.

   HTTPS에서는 `https://<VIP>:9453/safekit/mosaic.html`을 사용하고, 로드 밸런싱 규칙은 9453 포트에 적용합니다.

테스트는 SafeKit 8.2 사용자 가이드의 섹션 4.3.5 "[가상 IP 주소에서 TCP 로드 밸런싱 테스트](https://safekit.eviden.com/resources/safekit-user-guide-82/#Mosaic)"에 자세히 설명되어 있습니다.

## 3. 테스트 1 – 연결 분포

0단계 1단계

1. 모든 노드에서 <span class="notranslate farm-term" translate="no">Farm</span>를 시작합니다(UP 상태).
2. 클라이언트 워크스테이션에서 모자이크를 엽니다.

**예상 결과:** 모자이크에는 **모든 노드**의 이름이 표시되며, 각 처리 노드마다 다른 색상이 사용됩니다.

이는 상위 라우터 또는 게이트웨이가 MAC 주소를 통해 노드 중 하나에 도달하고, 해당 노드가 연결을 올바르게 분배한다는 것을 증명합니다.

## 4. 테스트 2 – 디스패칭 서버 변경

이 테스트는 디스패칭 서버가 중지될 때 <span class="notranslate farm-term" translate="no">Farm가 계속 응답하는지 확인합니다.

0단계 1단계

1. <span class="notranslate farm-term" translate="no">Farm</span>, 즉 SafeKit에 있는 모든 노드를 중지합니다.
2. 단일 노드(1)를 시작합니다. 이 노드가 디스패칭 서버가 됩니다.
   → **예상 결과:** 모자이크에는 이 노드만 표시됩니다.
3. 나머지 노드를 시작합니다.
   → **예상 결과:** 모자이크에 모든 노드가 표시됩니다.
4. 디스패칭 서버 역할을 하는 첫 번째 노드(1)를 중지합니다.
   → **예상 결과:** 모자이크에 나머지 노드가 표시됩니다.

이 테스트의 한계: 1. 4단계에서 올바른 결과가 나왔다고 해서 GARP가 작동한다는 것을 증명하는 것은 아닙니다. 2. 다른 노드에서 3.4 모듈이 시작되면(3단계), 해당 노드에 가상 IP 주소가 구성되고, 이로 인해 네트워크에서 가상 IP 주소/MAC 주소 연결을 재라우팅할 수 있는 메시지가 생성됩니다. 따라서 테스트 3과 4만이 실제로 GARP를 테스트하는 단계입니다.

<span class="notranslate farm-term" translate="no">Farm</span>의 다른 노드(디스패칭 서버가 아닌 노드)를 중지하는 것은 배포 재구성 테스트일 뿐입니다.

## 5. 테스트 3 – `arp -a`을 사용한 GARP 재라우팅 확인

테스트 4와 함께 이 테스트는 GARP를 실제로 확인합니다. 서버를 중지하기 전에 디스패칭 서버의 MAC 주소를 기록한 다음, 그 후에 가상 IP(VIP)/MAC 연결이 변경되었는지 확인합니다.

이 테스트는 모자이크를 표시하는 클라이언트 워크스테이션이 <span class="notranslate farm-term" translate="no">Farm와 동일한 IP 서브넷**에 있는 경우에만 가능합니다.

클라이언트와 <span class="notranslate farm-term" translate="no">Farm</span> 사이에 라우터가 있는 경우, 클라이언트의 ARP 테이블에는 가상 IP(VIP)가 아닌 <span class="notranslate farm-term" translate="no">Farm</span> 네트워크에 도달하는 데 사용되는 게이트웨이 주소가 포함됩니다. 이 경우 네트워크 팀에 문의하여 라우터 또는 게이트웨이의 ARP 테이블을 확인하십시오.

0단계 1단계

1. 모든 노드에서 <span class="notranslate farm-term" translate="no">Farm</span>를 시작합니다.
2. 클라이언트 워크스테이션에서 `arp -a`을 실행하고 가상 IP(VIP)와 연결된 MAC 주소를 기록합니다. 이 주소는 배차 서버를 식별합니다.
3. 이 MAC 주소를 가진 <span class="notranslate farm-term" translate="no">Farm</span> 노드를 중지하십시오.
4. 나머지 노드를 사용하여 모자이크가 여전히 제대로 작동하는지 확인합니다.
5. 새 가상 IP(VIP) 연결을 읽고 새 디스패칭 서버를 식별하려면 `arp -a`을 다시 실행합니다.

## 6. 테스트 4 – Wireshark(Windows) 또는 tcpdump(Linux)를 사용한 엔드투엔드 검사

클라이언트와 <span class="notranslate farm-term" translate="no">Farm</span> 노드에서 패킷을 캡처하여 가상 IP(VIP)에 대한 TCP 연결을 추적할 수 있습니다. Windows 머신에서는 Wireshark를, Linux 머신에서는 tcpdump를 사용합니다.

패킷의 MAC(이더넷) 헤더를 확인해야 합니다. IP 주소만 볼 것이 아니라 MAC 헤더도 확인해야 합니다. 디스패칭 서버의 커널 필터는 패킷의 목적지 MAC 주소를 처리 노드의 MAC 주소로 다시 작성하여 연결을 분배합니다. 목적지 IP 주소는 전체 경로에서 가상 IP(VIP)로 유지됩니다.

**동일한 SYN 패킷에 대해 관찰해야 할 사항:**

0단계 1단계 캡처 위치 2단계 관찰된 MAC 주소 3단계
|---|---|---|
| 1. 클라이언트는 가상 IP(VIP)로 | 클라이언트 | 클라이언트 MAC 주소 → **디스패칭 서버의 MAC 주소** |를 전송합니다.
2. 디스패칭 서버는 연결을 전달합니다. 1. 디스패칭 서버 2. 디스패칭 MAC 주소 → 3. 처리 노드의 MAC 주소 4. 5.
| 3. 처리 노드는 | 처리 노드 | 디스패칭 MAC → 노드 MAC |을 수신합니다.
| 4. 노드는 클라이언트에 직접 응답합니다 | 처리 노드 | 노드 MAC → 클라이언트 MAC |
| 5. 클라이언트는 응답을 수신합니다. | 클라이언트 | 노드 MAC → 클라이언트 MAC |

클라이언트 워크스테이션이 <span class="notranslate farm-term" translate="no">Farm</span>와 다른 서브넷에 있는 경우, <span class="notranslate farm-term" translate="no">Farm</span> 노드에서 보이는 "클라이언트 MAC"은 클라이언트 워크스테이션의 MAC 주소가 아니라 두 서브넷을 연결하는 **게이트웨이**(라우터)의 MAC 주소입니다.

디스패칭 서버를 중지한 후 캡처를 반복합니다(테스트 2, 4단계): 이제 1단계에서 **new** 디스패칭 서버의 MAC 주소가 표시되어야 합니다.

## 7. 어떤 워크스테이션에서 테스트할 것인가

동작은 클라이언트와 <span class="notranslate farm-term" translate="no">Farm</span> 사이의 네트워크 경로에 따라 달라집니다. 아키텍처에 맞는 각 클라이언트 유형별로 테스트 1과 2를 실행하십시오.

| 클라이언트 위치 | 테스트에서 확인하는 사항 |
|---|---|
| 클라이언트가 **동일한 서브넷**에 있음 <span class="notranslate farm-term" translate="no">Farm</span> | GARP에 의한 클라이언트의 ARP 테이블 업데이트 (테스트 3 가능) |
| 클라이언트가 **다른 서브넷**(라우터, 게이트웨이, 하이퍼바이저 가상 네트워크)에 있음 | 라우터 또는 게이트웨이에 의한 GARP 처리 |
| 클라이언트 VM **하이퍼바이저에서 실행되는 VM <span class="notranslate farm-term" translate="no">Farm</span> VM** | 내부 스위칭 및 라우팅을 처리하는 하이퍼바이저의 가상 스위치 동작 |

## 8. 예상 결과 요약

0 테스트 1 조치 2 예상 결과 3
|---|---|---|
0 1 1 모든 노드가 위로, 모자이크 2 모든 노드가 나타남 3
| 2.2 | 단일 노드가 시작되었습니다 | 이 노드만 나타납니다 |
0 2.3 1 모든 노드가 시작되었습니다 2 모든 노드가 나타납니다 3
| 2.4 | 디스패칭 서버가 중지되었습니다. | 나머지 노드들이 지속적인 중단 없이 나타납니다. |
| 3 | `arp -a` 정지 전후 | 가상 IP(VIP)와 연결된 MAC 주소가 변경됩니다 |
| 4 | 정지 전후의 Wireshark 또는 tcpdump 캡처 | 클라이언트가 새로운 디스패칭 서버의 MAC 주소로 전송 |

## 9. 문제 해결

- **디스패칭 서버가 중지된 후 모자이크가 더 이상 응답하지 않습니다.**경로상의 장치(라우터, 게이트웨이, 가상 스위치)에서 GARP를 고려하지 않습니다. 네트워크 팀에 GARP 처리 설정을 확인하십시오.
- **GARP의 주기적 전송:** `<vip>` 섹션의 `arpreroute="on"` 속성(`arpinterval` 및 `arpelapse` 포함)은 VIP에 대해 정기적으로 GARP를 전송합니다. 사용자 가이드 13.6.4절 "[`<vip>` 구문](https://safekit.eviden.com/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax)"을 참조하십시오.
- **가상 IP(VIP) ↔ MAC 해상도 진단:** 사용자 가이드의 7.24절 "[가상 IP(VIP) ↔ MAC 해상도 문제 해결](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Issue_with_VIP)" 및 7.15절 "[<span class="notranslate farm-term" translate="no">Farm</span> 모듈이 UP(준비됨)이지만 <span class="notranslate farm-term" translate="no">Farm</span>](<https://safekit.eviden.com/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>)에서 로드 밸런싱 문제가 있습니다."를 참조하십시오.

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> 솔루션 {#demonstration-of-the-safekit-farm-solution}의 시연


{{%  insert-safekit-farm-video-ko  %}}

가상 IP 주소를 사용한 기본/백업 페일오버에 대해서는 [클러스터의 가상 IP 주소 테스트SafeKit mirror](/best-practises/test-primary-backup-vip-mirror/)을 참조하십시오.

{{%  insert-safekit-4-buttons-ko  %}}
