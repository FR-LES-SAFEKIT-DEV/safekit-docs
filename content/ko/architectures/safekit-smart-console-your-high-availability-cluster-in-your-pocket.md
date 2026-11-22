---
title: "SafeKit Smart Console: 고가용성 클러스터 내 손안에"
canonical: "https://safekit.eviden.com/ko/architectures/safekit-smart-console-your-high-availability-cluster-in-your-pocket/"
description: "Smart Console를 사용하여 SafeKit 클러스터를 손쉽게 관리하세요. 코딩이 필요 없는 구성, 스마트폰 호환성, 실시간 PWA 알림을 누리세요. 인적 오류를 제거하고 손끝에서 고가용성을 보장하세요. 자세히 알아보기."
category: "architectures"
lang: "ko"
topics: "Smart Console: 데스크톱 및 모바일에서 직관적이고 오류 없는 고가용성 제공, 목차, SafeKit mirror 클러스터가 웹 콘솔과 어떻게 연동되나요?, SafeKit farm 클러스터가 웹 콘솔과 어떻게 연동되나요?, 웹 콘솔을 통해 여러 모듈과 여러 클러스터를 모니터링하는 방법은 무엇인가요?, 콘솔에서 경고를 모니터링하고 이메일 알림을 관리하는 방법, 🔍 SafeKit 살펴보기"
translation: "translate_md 2026-11-22.1 | glossaire 2026-11-22.7 | Translation LLM | 52 expressions"
---

# SafeKit Smart Console: 고가용성 클러스터 내 손안에 {#safekit-smart-console-your-high-availability-cluster-in-your-pocket}

## Smart Console: 데스크톱 및 모바일에서 직관적이고 오류 없는 고가용성 제공 {#smart-console-intuitive-mobile-and-error-free-high-availability}

**속도와 단순성**을 위해 구축된 솔루션으로 고가용성 관리 방식을 재정의하십시오. SafeKit 웹 콘솔은 **학습 곡선이 전혀 없**는 환경을 제공하여 **코드를 작성하지 않고도** 인프라를 구성하고 제어할 수 있습니다.

책상에 앉아 있든 이동 중이든, 스마트폰과 호환되는 대시보드를 통해 클러스터 전체를 손쉽게 제어할 수 있습니다. Smart Console mirror 및 <span class="notranslate farm-term" translate="no">farm</span> 모듈 관리를 간소화하여 **인적 오류를 제거** 하고 가장 중요한 시스템에 대한 원활한 장애 조치 프로세스를 보장합니다.

## 목차 {#table-of-contents}

  * [SafeKit mirror 클러스터가 웹 콘솔과 어떻게 연동되나요?](#safekit-mirror-cluster)
  * [SafeKit <span class="notranslate farm-term" translate="no">farm</span> 클러스터가 웹 콘솔과 어떻게 연동되나요?](#safekit-farm-cluster)
  * [웹 콘솔을 통해 여러 모듈과 여러 클러스터를 모니터링하는 방법은 무엇인가요?](#multipe-modules-clusters)
  * [콘솔에서 경고를 모니터링하고 이메일 알림을 관리하는 방법](#safekit-notifications-cluster)


## SafeKit mirror 클러스터가 웹 콘솔과 어떻게 연동되나요? {#safekit-mirror-cluster}

### SafeKit mirror 클러스터를 구성하는 방법은 무엇입니까? {#safekit-mirror-cluster-configure}


![SafeKit 웹 콘솔: mirror 클러스터 하트비트 네트워크, 가상 IP 설정 및 실시간 디렉터리 복제를 보여주는 고가용성 구성 대시보드입니다.](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


**SafeKit 웹 콘솔**은 중요한 애플리케이션의 고가용성을 조율하기 위한 직관적인 인터페이스를 제공합니다. 몇 단계만으로 **SafeKit mirror 클러스터**를 구성하여 비즈니스 연속성을 보장할 수 있습니다:

  * **애플리케이션 장애 조치(매크로 탭):** 장애 발생 시 자동으로 다시 시작할 특정 애플리케이션 서비스를 정의합니다.
  * **하트비트 네트워크:** 클러스터 노드가 서로의 상태와 가용성을 지속적으로 모니터링하고 장애 조치 결정을 동기화하는 데 사용하는 전용 통신 경로입니다.
  * **가상 IP 관리:** 장애 조치 후 클라이언트가 투명하게 재연결될 수 있도록 가상 IP (VIP)를 설정합니다.
  * **실시간 복제:** 호스트 기반 동기식 바이트 수준 복제에 중요한 디렉터리를 선택합니다.
  * **체커:** 애플리케이션의 상태를 모니터링하고 프로세스 오류가 감지되면 자동 복구를 트리거합니다.


SafeKit 클러스터에는 전용 스플릿 브레인 체커 포함되어 있어 세 번째 증인 머신이나 추가 하트비트 네트워크 없이도 네트워크 격리 문제를 해결할 수 있습니다. [클러스터의 하트비트, 장애 조치 및 쿼럼](</ko/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>)에 대해 자세히 알아보세요.

### SafeKit mirror 클러스터를 모니터링하는 방법은 무엇입니까? {#safekit-mirror-cluster-monitoring}


![SafeKit 웹 콘솔: 2노드 mirror 클러스터의 실시간 모니터링 화면으로, PRIM 및 SECOND 상태와 활성 데이터 복제를 보여줍니다.](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


**SafeKit 관리 콘솔**은 고가용성 인프라에 대한 통합된 보기를 제공합니다. 관리자는 이를 통해 클러스터의 **운영 상태**를 모니터링하고 데이터 동기화를 실시간으로 추적할 수 있습니다.

2노드 mirror 클러스터의 경우 콘솔에 각 서버의 역할이 명확하게 표시됩니다:

  * **PRIM (기본):** 현재 애플리케이션을 실행하고 가상 IP를 관리하는 활성 노드입니다. 로컬 스토리지에 쓰기를 수행하고 보조 노드에 실시간 복제를 수행합니다.
  * **SECOND (Secondary):** 동기식 바이트 수준 업데이트를 수신하는 대기 노드입니다. 기본 노드에 장애가 발생하면 즉시 인계할 준비가 되어 있습니다.
  * **ALONE 상태:** 클러스터가 단일 노드에서 실행 중일 때(예: 유지보수 중 또는 장애 발생 후) 시각적으로 경고하여 이중화가 일시적으로 손실되었음을 나타냅니다.
  * **재동기화 진행 상황:** 장애가 발생한 노드가 복구되면 백그라운드 데이터 재통합 중에 상태가 주황색으로 바뀌어 "정상으로 돌아가기" 단계에서 다운타임이 발생하지 않도록 합니다.


단순한 상태 아이콘 외에도 인터페이스는 **`...` 메뉴**를 통해 **원클릭 장애 조치 오케스트레이션**을 제공하여 계획된 유지보수 동안 기본 역할을 수동으로 재할당하는 동시에 사용자 활동에 대한 지속적인 가용성을 보장합니다.

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> 클러스터가 웹 콘솔과 어떻게 연동되나요? {#safekit-farm-cluster}

### SafeKit <span class="notranslate farm-term" translate="no">farm</span> 클러스터를 구성하는 방법은 무엇입니까? {#safekit-farm-cluster-configuration}


![SafeKit 웹 콘솔: 네트워크 부하 분산 및 가상 IP 관리를 위한 farm 클러스터를 구성.](/wp-content/uploads/2026/01/safekit-farm-cluster-config.png "w:966")


**SafeKit <span class="notranslate farm-term" translate="no">farm</span> 클러스터**는 서비스의 고가용성 및 확장성을 위해 설계되었습니다. 구성은 수신 트래픽을 두 노드에 동시에 분산하는 데 중점을 둡니다:

  * **로드 밸런싱 서비스(매크로 탭):** 모든 노드에서 활성 상태로 유지할 특정 애플리케이션 서비스(예: Apache, IIS, Nginx)를 정의합니다.
  * **하트비트 네트워크:** 노드가 <span class="notranslate farm-term" translate="no">farm</span> 떠났는지 감지하는 데 사용되는 통신 경로로, 즉각적인 부하 재분배를 트리거합니다.
  * **가상 IP(<span class="notranslate farm-term" translate="no">farm</span> VIP):** mirror 클러스터와 달리 <span class="notranslate farm-term" translate="no">farm</span> 클러스터의 가상 IP 주소는 모든 노드 간에 공유되며 커널 필터링 알고리즘이 네트워크 트래픽을 분산합니다.
  * **로드 밸런싱 규칙:** 소스 IP 주소 또는 포트를 기반으로 트래픽 분산 정책을 정의합니다.
  * **체커:** 애플리케이션의 상태를 모니터링하고 프로세스 오류가 감지되면 자동 재시작을 트리거합니다.


### SafeKit <span class="notranslate farm-term" translate="no">farm</span> 클러스터 모니터링하는 방법은 무엇입니까? {#safekit-farm-cluster-monitoring}


![SafeKit 콘솔: 두 노드 모두 UP 상태이며 활성 부하 분산이 적용된 2노드 farm 클러스터 모니터링.](/wp-content/uploads/2026/01/safekit-farm-cluster-monitor.png "w:473")


<span class="notranslate farm-term" translate="no">Farm</span> 클러스터를 모니터링하면 인프라의 **액티브-액티브** 특성을 파악할 수 있습니다. 이 특성에서는 모든 노드가 애플리케이션 성능에 기여합니다(이 예시에서는 2개의 노드를 보여주며, 추가 노드로 확장 가능):

  * **UP 상태(2개 노드에서 50%):** 정상적인 <span class="notranslate farm-term" translate="no">farm</span> 에서는 두 노드 모두 " UP "(50%) 상태이며, 이는 두 노드 모두 공유 가상 IP를 통해 클라이언트 요청을 적극적으로 수신하고 처리하고 있음을 의미합니다.
  * **자동 재조정:** 노드 하나가 고장 나면 콘솔에 남아 있는 노드가 트래픽의 100%를 처리하는 것이 시각적으로 표시됩니다. 살아남은 노드는 이미 활성화되어 있으므로(몇 초의 감지 시간 제외) "장애 조치" 지연이 없습니다.
  * **노드 삽입:** 복구된 노드가 다시 시작되면 " STOP "에서 " UP "으로 전환되고 관리자 개입 없이 자동으로 부하의 일부를 수신하기 시작합니다.
  * **데이터 동기화 없음:** <span class="notranslate farm-term" translate="no">farm</span> 클러스터 에서는 노드가 상태 비저장 이거나 백엔드 데이터베이스를 공유해야 하므로(mirror 클러스터에서 별도로 보호할 수 있음) 주황색 재동기화 상태가 없다는 점에 유의하십시오.


단순한 상태 아이콘 외에도 인터페이스는 **`...` 메뉴**를 통해 원클릭 노드 관리를 제공하여 계획된 유지보수를 위해 노드를 수동으로 중지하거나 시작할 수 있으며, 공유 가상 IP는 사용자 활동을 중단하지 않고 자동으로 트래픽을 재분배합니다.

## 웹 콘솔을 통해 여러 모듈과 여러 클러스터를 모니터링하는 방법은 무엇인가요? {#multipe-modules-clusters}

### 단일 클러스터 내 다중 모듈 시각화 {#safekit-multi-module}


![SafeKit 웹 콘솔: 동일한 2노드 클러스터에 배포된 4개의 Hyper-V 모듈.](/wp-content/uploads/2026/05/safekit-hyperv-console-4.jpg "w:966")


단일 2노드 클러스터에 **여러 모듈**을 배포할 때 SafeKit 웹 콘솔은 각 모듈에 대한 **개별 모니터링 위젯**을 제공합니다. 이는 **SafeKit Hyper-V** 솔루션에 특히 유용합니다. 

**예:** 4개의 보호된 VM이 있는 설정의 그림:

  * 콘솔은 node2와 통신하기 위한 프록시 역할을 하는 node1에 연결됩니다.
  * 콘솔에는 **4개의 위젯** (VM당 하나씩)이 표시됩니다.
  * 각 VM은 PRIM 노드에서 실행되며 SECOND 노드로 복제됩니다.
  * 관리자는 각 노드에서 어떤 VM이 활성화되어 있는지 실시간으로 확인할 수 있습니다. node1에서는 VM1과 VM2, node2에서는 VM3과 VM4가 활성화되어 있습니다.
  * 관리자는 **`...` 메뉴**를 사용하여 VM을 한 노드에서 다른 노드로 쉽게 마이그레이션할 수 있습니다.


이러한 세분화된 가시성을 통해 고밀도 환경에서도 모든 복제된 워크로드를 완벽하게 제어하고 즉각적으로 인지할 수 있습니다. 

### 다중 클러스터 시각화 {#safekit-multi-cluster}


![SafeKit 웹 콘솔: 8개 서버에 4개 클러스터를 배포.](/wp-content/uploads/2026/05/safekit-console-north-south-east-west-801.jpg "w:966")


여러 서버에 걸쳐 **여러 클러스터**를 배포할 때, 여러 브라우저 탭을 사용하여 각 클러스터에 연결하거나 콘솔의 PWA(Progressive Web App) 기능을 활용할 수 있습니다. PWA를 사용하면 브라우저의 탐색 메뉴가 제거되어 화면 공간을 절약하고 데스크톱에서 클러스터 모니터링을 더 잘 정리할 수 있습니다. 

**예:** 그림은 북쪽, 남쪽, 서쪽, 동쪽에 위치한 4개의 비디오 감시 클러스터를 모니터링하는 4개의 PWA 콘솔을 보여줍니다.

**참고:** 단일 데스크톱에 표시하기에는 클러스터가 너무 많을 경우, SafeKit 수많은 클러스터에서 오류를 감지하는 데 도움이 되는 알림을 제공합니다. 

## 콘솔에서 경고를 모니터링하고 이메일 알림을 관리하는 방법 {#safekit-notifications-cluster}

### 모듈 상태 변경 및 중요 이벤트에 대한 즉각적인 알림을 받으려면 어떻게 해야 하나요? {#how-can-i-receive-instant-alerts-for-module-state-changes-and-critical-events}

SafeKit 웹 콘솔은 기본 브라우저 기능을 활용하여 모듈 상태가 변경될 때마다 **즉각적인 알림**을 보냅니다. 이를 통해 콘솔이 백그라운드 탭에 있더라도 중요한 이벤트가 즉시 사용자에게 전달됩니다.

  * **보안:** 알림을 사용하려면 **HTTPS** 또는 localhost를 통해 액세스해야 합니다.
  * **PWA 통합:** 데스크톱 또는 모바일에 프로그레시브 웹 앱(PWA)으로 콘솔을 설치하여 네이티브 앱과 같은 환경을 경험하세요.
  * **모바일 알림:** 모바일에서는 PWA를 통해서만 알림을 받을 수 있으며, HTTPS가 필수입니다.


이 메커니즘은 중요한 이벤트 발생 시 사용자에게 즉시 알림으로써 클러스터 상태에 대한 신속한 인식을 높이고 응답 시간을 단축합니다.

### SafeKit 동영상: 스마트폰 콘솔 (0:54) {#demo-console}


### SafeKit에서 자동 이메일 알림을 설정하려면 어떻게 해야 하나요? {#how-can-i-set-up-automated-email-alerts-in-safekit}

SafeKit은 모든 **주요 클러스터 이벤트를 시스템 로그에** 자동으로 기록하여 시중에 나와 있는 모든 모니터링 도구와 원활하게 통합할 수 있습니다. 또한, 이러한 로그를 모니터링하고 중요한 경고를 받은 편지함으로 직접 전달하도록 설계된 전용 **이메일 알림 에이전트가** 포함되어 있습니다. 이를 통해 웹 콘솔이 활발하게 모니터링되지 않을 때에도 이해 관계자들이 정보를 계속 확인할 수 있습니다. 

  * **스마트 그룹화:** 에이전트는 노이즈를 줄이기 위해 짧은 기간 내에 발생하는 이벤트를 단일 요약 이메일로 그룹화합니다.
  * **전체 적용:** 에이전트는 모든 노드에 설치되며 활성화하려면 SMTP 세부 정보를 명시적으로 구성해야 합니다.
  * **맞춤형 수신자:** 특정 IT 팀 또는 관리자 별칭으로 직접 알림을 보내 신속한 응답을 보장합니다.


SafeKit은 실시간 PWA 알림과 지능형 이메일 그룹화를 결합하여 미션 크리티컬 운영을 위한 다계층 알림 전략을 제공합니다.

### SafeKit 동영상: 장애 조치 시 이메일 알림 (1:04) {#demo-notifications}



{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}