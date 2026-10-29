---
title: "SafeKit 스마트 콘솔: 주머니 속 고가용성 클러스터"
canonical: "https://safekit.eviden.com/ko/architectures/safekit-smart-console-your-high-availability-cluster-in-your-pocket/"
description: "스마트 콘솔을 사용하여 SafeKit 클러스터를 간편하게 관리하세요. 코딩 없이 구성 가능하고, 스마트폰과 호환되며, 실시간 PWA 알림을 제공합니다. 인적 오류를 줄이고 손쉽게 고가용성을 확보하세요. 자세히 알아보세요."
category: "architectures"
lang: "ko"
topics: "스마트 콘솔: 직관적이고 모바일 친화적이며 오류 없는 고가용성, 목차, SafeKit 및 mirror 클러스터는 웹 콘솔에서 어떻게 작동하나요?, SafeKit 및 farm 클러스터는 웹 콘솔에서 어떻게 작동하나요?, 웹 콘솔을 통해 여러 모듈과 여러 클러스터를 모니터링하는 방법은 무엇인가요?, 콘솔에서 알림을 모니터링하고 이메일 알림을 관리하는 방법은 무엇인가요?, 🔍 SafeKit 고가용성 탐색 허브"
---

# SafeKit 스마트 콘솔: 주머니 속 고가용성 클러스터 {#safekit-smart-console-your-high-availability-cluster-in-your-pocket}

## 스마트 콘솔: 직관적이고, 휴대 가능하며, 오류 없는 고가용성 {#smart-console-intuitive-mobile-and-error-free-high-availability}

**속도와** 간편함을 위해 설계된 솔루션으로 고가용성 관리 방식을 재정의하십시오. SafeKit 웹 콘솔은 **학습 곡선이 없는** 환경을 제공하여 **코드 작성 없이** 인프라를 구성하고 제어할 수 있도록 지원합니다.

책상에 앉아 있든 이동 중이든, 스마트폰과 호환되는 대시보드를 통해 클러스터 전체를 손쉽게 제어할 수 있습니다. 스마트 콘솔 mirror 및 <span class="notranslate farm-term" translate="no">farm</span> 모듈 관리 간소화) **은 인적 오류를 제거하고** 가장 중요한 시스템에 대한 원활한 장애 조치 프로세스를 보장합니다.

## 목차 {#table-of-contents}

  * [ 클러스터는 웹 콘솔과 어떻게 연동되나요? SafeKit mirror ](#safekit-mirror-cluster)
  * [ 클러스터는 웹 콘솔과 어떻게 연동되나요? SafeKit <span class="notranslate farm-term" translate="no">farm</span> ](#safekit-farm-cluster)
  * 웹 콘솔을 통해 여러 모듈 ](#multipe-modules-clusters) 여러 클러스터를 모니터링하는 방법은 무엇 [ ?
  * 콘솔에서 알림을 모니터링 ](#safekit-notifications-cluster) 이메일 알림을 관리하는 방법은 [ 인가요?


## SafeKit mirror 는 웹 콘솔과 어떻게 연동되나요? {#safekit-mirror-cluster}

### SafeKit Mirror 를 구성하는 방법은 무엇입니까? {#safekit-mirror-cluster-configure}


![ SafeKit 웹 콘솔: mirror 클러스터의 하트비트 네트워크, 가상 IP 설정 및 실시간 디렉터리 복제를 보여주는 고가용성 구성 대시보드입니다. ](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


**SafeKit 웹 콘솔** 핵심 애플리케이션의 고가용성을 오케스트레이션하기 위한 직관적인 인터페이스를 제공합니다. 몇 단계만 거치면 **SafeKit mirror 클러스터** 를 구성하여 비즈니스 연속성을 보장할 수 있습니다.

  * **애플리케이션 장애 조치(매크로 탭):** 장애 발생 시 자동으로 다시 시작할 특정 애플리케이션 서비스를 정의합니다.
  * **하트비트 네트워크:** 클러스터 노드가 서로의 상태와 가용성을 지속적으로 모니터링하고 장애 조치 결정을 동기화하는 데 사용하는 전용 통신 경로입니다.
  * **가상 IP 관리:** 장애 조치 후 클라이언트의 투명한 재연결을 위해 가상 IP(VIP)를 설정합니다.
  * **실시간 복제:** 호스트 기반 동기식 바이트 수준 복제를 위한 중요 디렉터리를 선택합니다.
  * **검사기:** 애플리케이션의 상태를 모니터링하고 프로세스 오류가 감지되면 자동 복구를 실행합니다.


SafeKit 클러스터에는 세 번째 감시 장비나 추가 하트비트 네트워크 없이도 네트워크 격리 문제를 해결할 수 있는 전용 스플릿 브레인 검사기가 포함되어 있습니다. 클러스터 ](</ko/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) 의 하트비트, 페일오버 및 쿼럼에 대한 자세한 내용은 [ 참조하십시오.

### SafeKit mirror 를 모니터링하는 방법은 무엇입니까? {#safekit-mirror-cluster-monitoring}


![ SafeKit 웹 콘솔: 활성 데이터 복제가 진행 중인 2노드 클러스터 mirror 의 PRIM 및 SECOND 상태를 실시간으로 모니터링합니다. ](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


**SafeKit 관리 콘솔** 고가용성 인프라에 대한 통합된 보기를 제공합니다. 관리자는 이를 통해 클러스터의 **운영 상태** 를 모니터링하고 데이터 동기화를 실시간으로 추적할 수 있습니다.

2노드로 구성된 mirror 클러스터의 경우 콘솔에 각 서버의 역할이 명확하게 표시됩니다.

  * **PRIM(기본 노드):** 현재 애플리케이션을 실행하고 가상 IP를 관리하는 활성 노드입니다. 로컬 저장소에 쓰기 작업을 수행하고 보조 노드로 실시간 복제를 진행합니다.
  * **SECOND (보조):** 동기식 바이트 수준 업데이트를 수신하는 대기 노드입니다. 기본 노드에 장애가 발생할 경우 즉시 인계받을 준비가 되어 있습니다.
  * **ALONE 상태:** 클러스터가 단일 노드에서 실행 중일 때(예: 유지 관리 중 또는 장애 후) 시각적으로 알려주어 이중화가 일시적으로 손실되었음을 나타냅니다.
  * **재동기화 진행 상황:** 장애가 발생한 노드가 복구되면 백그라운드 데이터 재통합 중에 해당 노드의 상태가 주황색으로 바뀌어 "정상 복귀" 단계 동안 다운타임이 발생하지 않습니다.


단순한 상태 아이콘을 넘어, 인터페이스는 다음과 같은 기능을 제공합니다. **원클릭 페일오버 오케스트레이션** (**`...` 메뉴**이를 통해 계획된 유지 보수를 위해 기본 역할을 수동으로 재할당하는 동시에 사용자 활동에 대한 지속적인 가용성을 보장할 수 있습니다.

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> 는 웹 콘솔과 어떻게 연동되나요? {#safekit-farm-cluster}

### SafeKit <span class="notranslate farm-term" translate="no">farm</span> 를 구성하는 방법은 무엇입니까? {#safekit-farm-cluster-configuration}


![ SafeKit 웹 콘솔: 네트워크 로드 밸런싱 및 가상 IP 관리를 위한 클러스터 구성. Farm ](/wp-content/uploads/2026/01/safekit-farm-cluster-config.png "w:966")


**SafeKit <span class="notranslate farm-term" translate="no">farm</span>** 클러스터는 서비스의 고가용성과 확장성을 위해 설계되었습니다. 이 구성은 들어오는 트래픽을 두 노드에 동시에 분산하는 데 중점을 둡니다.

  * **로드 밸런싱 서비스(매크로 탭):** 모든 노드에서 활성 상태로 유지할 특정 애플리케이션 서비스(예: Apache, IIS , Nginx )를 정의합니다.
  * **하트비트 네트워크: 노드가 <span class="notranslate farm-term" translate="no">farm</span> 에서 이탈했는지 감지하는 데 사용되는** 통신 경로로, 이탈 시 즉시 부하 재분배가 트리거됩니다.
  * **가상 IP( <span class="notranslate farm-term" translate="no">Farm</span> VIP):** <span class="notranslate farm-term" translate="no">Farm</span> mirror 와 달리 커널 필터링 알고리즘을 사용하여 네트워크 트래픽을 분산함으로써 노드 간에 공유됩니다.
  * **로드 밸런싱 규칙:** 소스 IP 주소 또는 포트를 기반으로 트래픽 분산 정책을 정의합니다.
  * **검사기:** 애플리케이션의 상태를 모니터링하고 프로세스 오류가 감지되면 자동 재시작을 실행합니다.


### SafeKit <span class="notranslate farm-term" translate="no">farm</span> 를 모니터링하는 방법은 무엇입니까? {#safekit-farm-cluster-monitoring}


![ SafeKit 콘솔: 2개 노드로 구성된 Farm 클러스터를 모니터링 중입니다. 두 노드 모두 UP 상태이며 활성 로드 밸런싱이 적용되고 있습니다. ](/wp-content/uploads/2026/01/safekit-farm-cluster-monitor.png "w:473")


<span class="notranslate farm-term" translate="no">farm</span> 클러스터를 모니터링하면 모든 노드가 애플리케이션 성능에 기여하는 **액티브-액티브** 인프라의 특성을 파악할 수 있습니다(이 예에서는 2개의 노드를 보여주지만, 노드를 추가하여 확장 가능합니다).

  * **UP 상태(2개 노드에서 50%):** 정상적인 <span class="notranslate farm-term" translate="no">farm</span> 에서는 두 노드 모두 "UP"(50%) 상태이며, 이는 두 노드 모두 공유 가상 IP를 통해 클라이언트 요청을 활발하게 수신하고 처리하고 있음을 의미합니다.
  * **자동 재분배:** 노드 하나에 장애가 발생하면 콘솔에 나머지 노드가 트래픽의 100%를 처리하는 모습이 시각적으로 표시됩니다. 장애가 발생한 노드가 이미 활성화되어 있으므로 (몇 초의 감지 시간 제외) "페일오버" 지연은 없습니다.
  * **노드 삽입:** 복구된 노드가 재시작되면 "STOP"에서 "UP"으로 전환되고 관리자 개입 없이 자동으로 부하를 할당받기 시작합니다.
  * **데이터 동기화 없음:** 참고로 <span class="notranslate farm-term" translate="no">farm</span> 클러스터에서는 노드가 상태를 유지하지 않거나 백엔드 데이터베이스를 공유하므로 "주황색" 재동기화 상태가 없습니다( mirror 클러스터에서는 백엔드 데이터베이스를 별도로 보호할 수 있습니다).


단순한 상태 아이콘 외에도, 인터페이스는 원클릭 노드 관리( **`...` 메뉴** ) 기능을 제공하여 계획된 유지 보수를 위해 노드를 수동으로 중지하거나 시작할 수 있으며, 공유 가상 IP는 사용자 활동을 중단하지 않고 트래픽을 자동으로 재분배합니다.

## 웹 콘솔을 통해 여러 모듈과 여러 클러스터를 모니터링하는 방법은 무엇입니까? {#multipe-modules-clusters}

### 단일 클러스터 내 다중 모듈 시각화 {#safekit-multi-module}


![ SafeKit 웹 콘솔: 동일한 2노드 클러스터에 4개의 Hyper-V 모듈이 배포되었습니다. ](/wp-content/uploads/2026/05/safekit-hyperv-console-4.jpg "w:966")


2노드 클러스터 하나에 **여러 모듈을** 배포할 경우, SafeKit 웹 콘솔은 각 모듈에 대한 **개별 모니터링 위젯을** 제공합니다. 이는 특히 **SafeKit Hyper-V** 솔루션에 유용합니다. 

**예시:** 그림은 4개의 보호된 VM이 있는 설정입니다.

  * 콘솔은 노드1에 연결되어 있으며, 노드1은 노드2와 통신하기 위한 프록시 역할을 합니다.
  * 콘솔에는 **위젯 4개와** 위젯 4개(각 VM에 하나씩)가 표시됩니다.
  * 각 VM은 기본 노드에서 실행되며 두 번째 노드로 복제됩니다.
  * 관리자는 VM1과 VM2가 노드 1에서 활성화되어 있고, VM2와 VM3가 노드 2에서 활성화되어 있음을 실시간으로 확인할 수 있습니다.
  * 관리자는 **`...` 메뉴** 를 사용하여 VM을 한 노드에서 다른 노드로 쉽게 마이그레이션할 수 있습니다.


이처럼 세부적인 가시성을 통해 고밀도 환경에서도 모든 복제된 워크로드를 완벽하게 제어하고 즉시 파악할 수 있습니다. 

### 다중 클러스터 시각화 {#safekit-multi-cluster}


![ SafeKit 웹 콘솔: 8개 서버에 4개 클러스터가 배포되었습니다. ](/wp-content/uploads/2026/05/safekit-console-north-south-east-west-801.jpg "w:966")


여러 서버에 걸쳐 **클러스터(** 를 배포할 때, 각 클러스터에 연결하기 위해 여러 개의 브라우저 탭을 사용하거나 콘솔의 PWA(프로그레시브 웹 앱) 기능을 활용할 수 있습니다. PWA를 사용하면 브라우저의 탐색 메뉴가 사라져 화면 공간을 절약하고 데스크톱에서 클러스터 모니터링을 더욱 효율적으로 관리할 수 있습니다. 

예시: **그림은 북쪽, 남쪽, 서쪽, 동쪽에 각각 하나씩** 네 개의 비디오 감시 클러스터를 모니터링하는 네 개의 PWA 콘솔을 보여줍니다.

**참고: 단일 데스크톱에 표시할 클러스터가 너무 많은 경우** SafeKit 여러 클러스터에서 오류를 감지하는 데 도움이 되는 알림을 제공합니다. 

## 콘솔에서 알림을 모니터링하고 이메일 알림을 관리하는 방법은 무엇인가요? {#safekit-notifications-cluster}

### 모듈 상태 변경 및 중요 이벤트에 대한 알림을 즉시 받으려면 어떻게 해야 하나요? {#how-can-i-receive-instant-alerts-for-module-state-changes-and-critical-events}

SafeKit 웹 콘솔은 브라우저의 기본 기능을 활용하여 모듈 상태 변경이 발생할 때마다 **즉시 알림** 을 전송합니다. 이를 통해 콘솔이 백그라운드 탭에 있더라도 중요한 이벤트를 즉시 확인할 수 있습니다.

  * **보안:** 알림은 HTTPS **또는 localhost** 통한 액세스가 필요합니다.
  * **PWA 통합:** 데스크톱 또는 모바일에 콘솔을 프로그레시브 웹 앱(PWA)으로 설치하여 네이티브 앱과 같은 환경을 경험하세요.
  * **모바일 알림:** 모바일에서는 PWA를 통해서만 알림을 받을 수 있으며, HTTPS 사용이 필수입니다.


이 메커니즘은 중요한 이벤트 발생 시 사용자에게 즉시 알림을 제공하여 클러스터 상태를 신속하게 파악하고 대응 시간을 단축합니다.

### SafeKit 비디오: 스마트폰에서 콘솔 실행 (0:54) {#demo-console}

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 

### SafeKit 에서 자동 이메일 알림을 설정하는 방법은 무엇인가요? {#how-can-i-set-up-automated-email-alerts-in-safekit}

SafeKit 모든 **주요 클러스터 이벤트를 시스템 로그** 에 자동으로 기록하여 시중의 모든 모니터링 도구와 원활하게 통합할 수 있도록 합니다. 또한, 이러한 로그를 모니터링하고 중요한 알림을 사용자의 이메일 수신함으로 직접 전달하는 전용 **이메일 알림 에이전트** 가 포함되어 있습니다. 이를 통해 웹 콘솔을 적극적으로 모니터링하지 않는 경우에도 이해 관계자들이 최신 정보를 얻을 수 있습니다. 

  * **스마트 그룹화:** 노이즈를 줄이기 위해 상담원은 짧은 기간 내에 발생하는 이벤트를 하나의 요약 이메일로 그룹화합니다.
  * **전체 적용 범위:** 에이전트는 모든 노드에 설치되며, 활성화하려면 SMTP 세부 정보를 명시적으로 구성해야 합니다.
  * **수신자 맞춤 설정:** 특정 IT 팀 또는 관리자 별칭으로 직접 알림을 보내 신속한 대응을 보장합니다.


SafeKit 실시간 PWA 알림과 지능형 이메일 그룹화를 결합하여 핵심 업무 운영을 위한 다계층 알림 전략을 제공합니다.

### SafeKit 비디오: 장애 조치 시 이메일 알림 (1:04) {#demo-notifications}

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 


{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}