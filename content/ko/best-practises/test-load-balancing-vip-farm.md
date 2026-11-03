---
title: "로드 밸런싱 가상 IP 주소 테스트 SafeKit farm 무리"
canonical: "https://safekit.eviden.com/ko/best-practises/test-load-balancing-vip-farm/"
description: "테스트하는 방법을 알아보세요 SafeKit 클러스터 노드 간 로드 밸런싱을 수행하고 가상 IP 장애 조치, GARP 재라우팅 및 네트워크 동작을 검증합니다."
category: "best-practises"
lang: "ko"
topics: "핵심 원칙, 필수 조건: SafeKit 모자이크, 테스트 1 - 연결 분산, 테스트 2 - 디스패칭 서버 변경, 테스트 3 - arp -a를 사용한 GARP 재라우팅 확인, 테스트 4 - Wireshark를 사용한 종단 간 검사Windows) 또는 tcpdump(Linux테스트에 사용할 워크스테이션, 예상 결과 요약, 문제 해결"
---

# 로드 밸런싱 가상 IP 주소 테스트 SafeKit <span class="notranslate farm-term" translate="no">farm</span> 무리

이 가이드는 다음 사항을 확인하는 방법을 설명합니다. SafeKit <span class="notranslate farm-term" translate="no">Farm</span> (<span class="notranslate farm-term" translate="no">Farm</span> 모듈(가상 IP 주소 기반 로드 밸런싱)이 네트워크에서 올바르게 작동하는지 확인하십시오. 즉, 노드 간 연결 분산 및 디스패칭 노드가 중지될 때 가상 IP(VIP) 재라우팅이 정상적으로 작동하는지 확인하십시오.

## 1. 핵심 원칙

**필수 조건:** 모든 노드 <span class="notranslate farm-term" translate="no">Farm</span> 반드시 동일한 레이어 2 IP 서브넷(LAN 또는 원격 사이트 간에 확장된 VLAN)에 있어야 합니다.

- 가상 IP(VIP)는 각 노드에서 로컬로 구성됩니다. <span class="notranslate farm-term" translate="no">Farm</span>: 해당 주소의 네트워크 카드에서 물리적 IP 주소의 별칭으로 설정됩니다. <span class="notranslate farm-term" translate="no">Farm</span> 노드에서 시작됩니다.
- 단일 노드, **디스패칭 서버**가상 IP(VIP)에 대한 네트워크 트래픽을 수신합니다.`vmac_directed` 구성, SafeKit 기본값): 해당 MAC 주소는 ARP 테이블(라우터, 게이트웨이, 동일 서브넷의 클라이언트)에서 가상 IP(VIP)와 연결된 주소입니다.
- 이 노드의 커널 필터는 TCP 연결을 해당 노드 전체에 분산시킵니다. <span class="notranslate farm-term" translate="no">Farm</span>, 에 의해 **목적지 MAC 주소를 다시 작성합니다.** 패킷은 처리 노드의 IP 주소로 전송됩니다(목적지 IP 주소는 가상 IP(VIP)로 유지됩니다). 응답은 연결을 처리하는 노드에서 클라이언트로 직접 전송됩니다.
- 필터가 수행하는 분배는 다음과 같습니다. **결정론적**처리 노드는 구성된 로드 밸런싱 규칙에 따라 클라이언트의 ID로부터 계산됩니다.
  - 위에 **클라이언트 IP 주소** (`filter="on_addr"`): 특정 클라이언트는 항상 동일한 노드로부터 서비스를 받으므로 세션 선호도가 보장됩니다.
  - 위에 **클라이언트 TCP 포트** (`filter="on_port"`동일한 클라이언트의 각 TCP 연결은 서로 다른 노드에서 처리될 수 있습니다. 이는 모자이크(섹션 2)에 사용되는 규칙이며, 따라서 단일 워크스테이션의 모든 노드를 보여줍니다.
- 전송 서버가 중지되면 다른 노드가 이 역할을 인계받아 전송합니다. **GARPs** (무상 ARP)를 통해 네트워크는 가상 IP(VIP)를 자체 MAC 주소와 연결합니다.

따라서 테스트해야 할 사항은 다음과 같습니다.

1. 연결이 모든 노드에 올바르게 분산되어 있는지 확인합니다.
2. 네트워크(라우터, 게이트웨이, 가상화)가 디스패칭 서버가 변경될 때 GARP를 고려한다는 것입니다.

## 2. 필수 조건: SafeKit 모자이크

이 모자이크는 다음에서 제공하는 테스트 페이지입니다. SafeKit이 프로그램은 가상 IP(VIP)에 여러 TCP 연결을 열고 각 연결에 응답한 노드의 이름을 표시합니다. 이를 통해 연결 분포를 한눈에 파악할 수 있습니다.

1. 그 안에서 `userconfig.xml` ~의 <span class="notranslate farm-term" translate="no">Farm</span> 모듈에서, `<vip>` 해당 섹션에서 포트에 로드 밸런싱 규칙을 추가합니다. SafeKit 웹 서버. 예시 SafeKit HTTP를 사용하는 웹 서버, 포트 9010:

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   만약 SafeKit 웹 서버와 콘솔이 HTTPS로 전환되었으므로 포트 9010을 9453으로 교체하십시오.

2. 모든 노드에 설정을 적용하십시오.
3. 클라이언트 워크스테이션의 브라우저에서 **외부 <span class="notranslate farm-term" translate="no">Farm</span>**연결 대상:

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   그런 다음 입력하세요 <span class="notranslate farm-term" translate="no">Farm</span> **모듈 이름** 그리고 테스트를 실행합니다. 모자이크의 각 셀에는 TCP 연결에 응답한 노드의 이름이 표시되고, 각 노드에는 색상이 지정되어 동일한 노드가 처리하는 모자이크 블록을 명확하게 보여줍니다.

   HTTPS에서는 다음을 사용하세요. `https://<VIP>:9453/safekit/mosaic.html`포트 9453에 로드 밸런싱 규칙이 적용됩니다.

시험에 대한 자세한 설명은 다음과 같습니다. SafeKit 8.2 사용자 설명서, 4.3.5절 "[가상 IP 주소에서 TCP 로드 밸런싱을 테스트합니다.](https://safekit.eviden.com/resources/safekit-user-guide-82/#Mosaic)".

모자이크 테스트 영상을 시청하세요.[시연 SafeKit <span class="notranslate farm-term" translate="no">farm</span> 해결책](/ko/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/#demonstration-of-the-safekit-farm-solution)" 부분.

## 3. 테스트 1 – 연결 분포

**단계**

1. 시작하세요 <span class="notranslate farm-term" translate="no">Farm</span> 모든 노드에서 (UP 상태)입니다.
2. 클라이언트 워크스테이션에서 모자이크를 엽니다.

**예상 결과:** 모자이크에는 이름들이 표시되어 있습니다. **모든 노드** ~의 <span class="notranslate farm-term" translate="no">Farm</span>각 처리 노드마다 다른 색상이 사용됩니다.

이는 상위 라우터 또는 게이트웨이가 MAC 주소를 통해 노드 중 하나에 도달하고, 해당 노드가 연결을 올바르게 분배한다는 것을 증명합니다.

## 4. 테스트 2 – 배송 서버 변경

이 테스트는 다음을 확인합니다. <span class="notranslate farm-term" translate="no">Farm</span> 디스패칭 서버가 중단되어도 계속 응답합니다.

**단계**

1. 멈춰 <span class="notranslate farm-term" translate="no">Farm</span>즉, 모든 노드 SafeKit.
2. 시작 **단일 노드**이 노드가 디스패칭 서버 역할을 하게 됩니다.
   → **예상 결과:** 모자이크에는 이 노드만 표시됩니다.
3. 나머지 노드를 시작하세요.
   → **예상 결과:** 모자이크는 모든 노드를 표시합니다.
4. 멈춰 **첫 번째 노드**디스패칭 서버 역할을 하는 서버입니다.
   → **예상 결과:** 모자이크 이미지는 나머지 노드들을 보여줍니다.

> **이 테스트의 한계점:** 4단계에서 올바른 결과가 나왔다고 해서 GARP가 효과적이라는 것을 증명하는 것은 아닙니다. <span class="notranslate farm-term" translate="no">Farm</span> 모듈이 다른 노드에서 시작되고(3단계), 이러한 노드에 가상 IP 주소가 구성됩니다. 이로 인해 네트워크에 메시지가 생성되고, 가상 IP 주소/MAC 주소 연결이 이미 재라우팅될 수 있습니다. 테스트 3과 4만 실제로 GARP를 테스트합니다.

> 다른 노드를 중지하는 것 <span class="notranslate farm-term" translate="no">Farm</span> (배송 서버가 아닌) 서버는 배포 재구성만 테스트합니다.

## 5. 테스트 3 – GARP 재라우팅 확인 `arp -a`

테스트 4와 함께 이 테스트는 GARP를 실제로 확인합니다. 서버를 중지하기 전에 디스패칭 서버의 MAC 주소를 기록한 다음 가상 IP(VIP)가 제대로 설정되었는지 확인합니다./MAC 그 이후로 협회는 변화했습니다.

이 테스트는 모자이크 이미지를 표시하는 클라이언트 워크스테이션이 정상 작동 중일 때만 가능합니다. **동일한 IP 서브넷** ~로서 <span class="notranslate farm-term" translate="no">Farm</span>.

클라이언트와 라우터 사이에 라우터가 있는 경우 <span class="notranslate farm-term" translate="no">Farm</span>클라이언트의 ARP 테이블에는 가상 IP(VIP)가 포함되어 있지 않고, 대신 해당 서버에 도달하는 데 사용된 게이트웨이 주소가 포함되어 있습니다. <span class="notranslate farm-term" translate="no">Farm</span>해당 네트워크의 문제일 수 있습니다. 그런 경우에는 네트워크 팀과 함께 라우터 또는 게이트웨이의 ARP 테이블을 확인하십시오.

**단계**

1. 시작하세요 <span class="notranslate farm-term" translate="no">Farm</span> 모든 노드에서.
2. 클라이언트 워크스테이션에서 다음 명령을 실행하십시오. `arp -a` 그리고 가상 IP(VIP)와 연결된 MAC 주소를 기록해 두십시오. 이 주소는 배차 서버를 식별합니다.
3. 멈춰 <span class="notranslate farm-term" translate="no">Farm</span> 이 MAC 주소를 가진 노드.
4. 나머지 노드를 사용해도 모자이크가 제대로 작동하는지 확인하십시오.
5. 달리다 `arp -a` 새로운 가상 IP(VIP)를 다시 읽어보겠습니다./MAC 새로운 디스패칭 서버를 연결하고 식별합니다.

## 6. 테스트 4 – Wireshark를 이용한 엔드투엔드 점검 (Windows) 또는 tcpdump(Linux)

클라이언트와 서버 측에서 패킷을 캡처하면 가상 IP(VIP)에 대한 TCP 연결을 추적할 수 있습니다. <span class="notranslate farm-term" translate="no">Farm</span> 노드: Wireshark가 켜져 있는 상태 Windows 머신과 tcpdump를 사용하여 Linux 기계들.

당신은 그것을 봐야 합니다 **패킷의 MAC(이더넷) 헤더**IP 주소뿐만 아니라, 디스패칭 서버의 커널 필터는 연결을 다음과 같은 방식으로 분산합니다. **목적지 MAC 주소를 다시 작성합니다.** 패킷의 IP 주소는 처리 노드의 IP 주소로 전달됩니다. 목적지 IP 주소는 전체 경로에서 가상 IP(VIP)로 유지됩니다.

**동일한 SYN 패킷에 대해 관찰해야 할 사항은 다음과 같습니다.**

| 단계 | 어디에서 촬영할 수 있나요? | 관찰된 MAC 주소 |
|---|---|---|
| 1. 클라이언트가 가상 IP(VIP)로 전송합니다. | 고객 | 클라이언트 MAC 주소 → 대상의 MAC 주소 **디스패칭 서버** |
| 2. 디스패칭 서버는 연결을 전달합니다. | 디스패칭 서버 | MAC 주소 전송 → MAC 주소 **처리 노드** |
| 3. 처리 노드는 수신합니다. | 처리 노드 | MAC 주소 전송 → 노드 MAC 주소 |
| 4. 노드는 클라이언트에 직접 응답합니다. | 처리 노드 | 노드 MAC 주소 → 클라이언트 MAC 주소 |
| 5. 고객은 응답을 받습니다. | 고객 | 노드 MAC 주소 → 클라이언트 MAC 주소 |

> 클라이언트 워크스테이션이 다른 서브넷에 있는 경우 <span class="notranslate farm-term" translate="no">Farm</span>"클라이언트 MAC 주소"는 다음과 같이 표시됩니다. <span class="notranslate farm-term" translate="no">Farm</span> 노드는 MAC 주소입니다. **게이트웨이** (라우터)는 클라이언트 워크스테이션의 서브넷이 아니라 두 서브넷을 연결하는 장치입니다.

디스패칭 서버를 중지한 후 캡처를 반복합니다(테스트 2, 4단계): 이제 1단계에서 MAC 주소가 표시되어야 합니다. **새로운** 디스패칭 서버.

## 7. 어떤 워크스테이션에서 테스트를 진행해야 할까요?

동작 방식은 클라이언트와 서버 간의 네트워크 경로에 따라 달라집니다. <span class="notranslate farm-term" translate="no">Farm</span>아키텍처와 관련된 각 클라이언트 유형별로 테스트 1과 2를 실행하십시오.

| 고객 위치 | 테스트에서 확인하는 사항 |
|---|---|
| 클라이언트 **동일 서브넷** ~로서 <span class="notranslate farm-term" translate="no">Farm</span> | GARP를 이용한 클라이언트 ARP 테이블 업데이트 (테스트 3 가능) |
| 클라이언트 **다른 서브넷** (라우터, 게이트웨이, 하이퍼바이저 가상 네트워크) | 라우터 또는 게이트웨이에 의한 GARP 처리 |
| 클라이언트 VM **하이퍼바이저에서 호스팅되는 또 다른 <span class="notranslate farm-term" translate="no">Farm</span> VM** | 하이퍼바이저의 가상 스위치 동작 방식 (가상 스위치는 내부 스위칭 및 라우팅도 처리함) |

## 8. 예상 결과 요약

| 시험 | 행동 | 예상 결과 |
|---|---|---|
| 1 | 모든 노드가 UP, 모자이크 | 모든 노드가 나타납니다 |
| 2.2 | 단일 노드가 시작되었습니다. | 이 노드만 나타납니다. |
| 2.3 | 모든 노드가 시작되었습니다 | 모든 노드가 나타납니다 |
| 2.4 | 디스패칭 서버가 중지되었습니다 | 나머지 노드들이 아무런 중단 없이 나타납니다. |
| 3 | `arp -a` 정차 전후 | 가상 IP(VIP)와 연결된 MAC 주소가 변경됩니다. |
| 4 | Wireshark 또는 tcpdump를 사용하여 중단 전후의 패킷을 캡처합니다. | 클라이언트는 새로운 디스패칭 서버의 MAC 주소로 데이터를 전송합니다. |

## 9. 문제 해결

- **디스패칭 서버가 중지된 후에는 모자이크가 더 이상 응답하지 않습니다.** GARP는 경로상의 장치(라우터, 게이트웨이, 가상 스위치)에서 고려되지 않습니다. 네트워크 팀에 GARP 처리 방식을 문의하십시오.
- **GARP의 주기적인 전송:** 그만큼 `arpreroute="on"` 속성 `<vip>` 섹션(와 함께) `arpinterval` 그리고 `arpelapse`) VIP에 대해 정기적으로 GARP를 전송합니다. 사용자 가이드 13.6.4절을 참조하십시오.[`<vip>` 통사론](https://safekit.eviden.com/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax)".
- **가상 IP(VIP) ↔ MAC 주소 확인 진단:** 사용자 설명서 7.24절을 참조하십시오.[가상 IP(VIP) ↔ MAC 주소 문제 해결](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Issue_with_VIP)", 및 섹션 7.15 "[<span class="notranslate farm-term" translate="no">Farm</span> 모듈은 UP(준비됨) 상태이지만 로드 밸런싱에 문제가 있습니다. <span class="notranslate farm-term" translate="no">Farm</span>](<https://safekit.eviden.com/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>)".

## 시연 SafeKit <span class="notranslate farm-term" translate="no">farm</span> 해결책 {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-ko  %}}

가상 IP 주소를 사용한 기본/백업 페일오버에 대해서는 다음을 참조하십시오. [가상 IP 주소 테스트 SafeKit mirror 무리](/ko/best-practises/test-primary-backup-vip-mirror/).

{{%  insert-safekit-4-buttons-ko  %}}
