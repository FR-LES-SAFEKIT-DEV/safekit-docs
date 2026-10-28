---
title: "Windows 및 Linux 클러스터의 하트비트, 페일오버 및 쿼럼"
canonical: "https://safekit.eviden.com/ko/best-practises/heartbeat-failover-quorum-windows-linux-cluster/"
description: "클러스터에서 하트비트, 페일오버 및 쿼럼이 어떻게 작동하는지 알아보세요. SafeKit 세 번째 쿼럼 서버나 특수 쿼럼 디스크가 필요 없는 SAN리스 아키텍처를 제안합니다. 간단한 스플릿 브레인 체커를 사용하여 Windows 및 Linux 에서 고가용성을 구현하세요."
category: "best-practises"
lang: "ko"
topics: "클러스터에서 네트워크 격리가 발생할 경우 다양한 시나리오는 무엇인가요? Windows 또는 Linux 클러스터에서 하트비트와 페일오버는 어떻게 작동하나요? 서버가 두 개의 원격 전산실에 있을 때 발생하는 스플릿 브레인 문제와 쿼럼은 어떻게 해결하나요? SafeKit 스플릿 브레인 체커를 사용한 간단한 클러스터 쿼럼 확인 방법은 무엇인가요? 🔍 SafeKit 고가용성 내비게이션 허브"
---

# Windows 및 Linux 클러스터의 하트비트, 페일오버 및 쿼럼 {#heartbeat-failover-and-quorum-in-windows-and-linux-clusters}


{{%  insert-safekit-network-isolation-ko  %}}
 

## Windows 또는 Linux 클러스터에서 하트비트 및 페일오버는 어떻게 작동합니까? {#how-heartbeats-and-failover-work-in-a-windows-or-linux-cluster}

### 심장 박동이란 무엇일까요? {#what-is-a-heartbeat}

두 서버를 동기화하고 서버 오류를 감지하는 기본 메커니즘은 ** 하트비트 및 ** 하트비트이며, 이는 두 서버가 공유하는 네트워크 상의 모니터링 데이터 흐름입니다.

SafeKit 소프트웨어는 두 서버가 공유하는 네트워크 수만큼 하트비트를 지원합니다. 

하트비트 메커니즘은 Windows 및 Linux 클러스터를 구현하는 데 사용됩니다. 이 메커니즘은 실시간 파일 복제 및 장애 조치 기능을 갖춘 SafeKit mirror 클러스터에 통합되어 있습니다.

### SafeKit 심장 박동 {#safekit-heartbeats}

정상 작동 시 두 서버는 하트비트 채널을 통해 상태(PRIM, SECOND, 리소스 상태)를 교환하고 애플리케이션 시작 및 종료 절차를 동기화합니다.

특히, 예정된 장애 조치의 경우, 애플리케이션을 중지하는 중지 스크립트가 먼저 기본 서버에서 실행된 후 보조 서버에서 시작 스크립트가 실행됩니다. 따라서 보조 서버에 복제된 데이터는 애플리케이션이 정상적으로 중지된 것과 같은 안전한 상태를 유지합니다.

### 모든 심장 박동 소실 {#loss-of-all-heartbeats}

한 서버에서 모든 하트비트가 끊기면 해당 서버는 다른 서버가 다운된 것으로 간주하고 ALONE 상태로 전환합니다.

두 번째 서버가 단독 상태가 되면 애플리케이션 장애 조치가 발생하고 보조 서버에서 애플리케이션이 재시작됩니다.

필수 사항은 아니지만, 네트워크 장애와 서버 장애를 구분하여 두 서버를 동기화하기 위해 서로 다른 네트워크에 두 개의 하트비트 채널을 사용하는 것이 좋습니다.

## 서버가 두 개의 원격 컴퓨터실에 있을 때 발생하는 스플릿 브레인 문제 및 쿼럼 문제 {#split-brain-problem-and-quorum-when-servers-are-in-two-remote-computer-rooms}


![ 하트비트, 페일오버 및 쿼럼 Windows 또는 Linux 클러스터) ](/wp-content/uploads/2023/02/quorum-with-remote-sites.png "w:200")


### 원격 컴퓨터실 {#remote-computer-rooms}

중요 애플리케이션을 보호하는 고가용성 클러스터는 지리적으로 멀리 떨어진 두 개의 전산실에 있는 두 대의 서버로 구현할 수 있습니다.

따라서 이 해결책은 만석인 방이라는 재앙을 초래합니다.

### 분할뇌 {#split-brain}

두 컴퓨터실 사이에 네트워크 격리가 발생하면 모든 하트비트가 손실되어 스플릿 브레인 문제가 발생합니다.

두 서버 모두 핵심 애플리케이션을 시작합니다.

### 솔루션의 복잡성 {#complexity-of-solutions}

스플릿 브레인 문제를 해결하기 위해 대부분 세 번째 쿼럼 서버나 특수 쿼럼 디스크를 사용하여 쿼럼을 구현함으로써 이중 마스터를 방지합니다. 

하지만 이러한 새로운 쿼럼 장치는 전체 클러스터링 아키텍처에 비용과 복잡성을 추가합니다.

## SafeKit 스플릿 브레인 체커 를 사용한 간단한 클러스터 쿼럼 {#simple-cluster-quorum-with-the-safekit-split-brain-checker}

### SafeKit 분할뇌 검사기 {#safekit-split-brain-checker}

SafeKit 고가용성 소프트웨어를 사용하면 Windows 또는 Linux 클러스터 내의 쿼럼을 위해 별도의 쿼럼 서버나 쿼럼 디스크가 필요하지 않습니다. 🛠️ [ 간단한 스플릿 브레인 체커 ](</resources/safekit-user-guide-82/#check_splitbrain>) 만으로도 애플리케이션의 이중 실행을 방지할 수 있습니다.

서버 간 모든 하트비트가 끊어지면 스플릿 브레인 체커는 하나의 서버만 선택하여 기본 서버로 지정합니다. 나머지 서버는 기본 서버로부터 하트비트를 다시 수신할 때까지 대기(WAIT) 상태로 전환됩니다. 하트비트를 수신한 후에는 기본 서버로부터 복제된 데이터를 동기화하고 보조 서버로 복귀합니다.

### 분할뇌 검사기는 어떻게 작동하나요? {#how-the-split-brain-checker-works}

주 서버 선출은 Witness라고 불리는 IP 주소에 대한 핑 응답을 기반으로 합니다. Witness는 일반적으로 항상 접속 가능한 라우터입니다. 네트워크가 격리된 경우, Witness에 접근할 수 있는 서버만 단독으로 주 서버가 되고, 그렇지 않은 서버는 대기 상태가 됩니다.

감시 서버는 상시 테스트되는 것이 아니라 모든 하트비트가 손실될 때만 테스트됩니다. 이때 감시 서버가 다운된 경우 클러스터는 WAIT-WAIT 상태로 전환되며, 관리자는 SafeKit 웹 콘솔을 통해 서버 중 하나를 기본 서버로 재시작할 수 있습니다.

### 분할뇌 검사기 없이 무슨 일이 일어날까요? {#what-happens-without-a-split-brain-checker}

네트워크 격리 시, 두 서버 모두 핵심 애플리케이션만 실행되는 ALONE 상태로 전환됩니다. 복제된 디렉터리는 격리되며, 각 애플리케이션은 자체 디렉터리에 있는 자체 데이터에 접근하여 작동합니다.

네트워크가 다시 연결되면 SafeKit 기본적으로 격리 전에 PRIM이었던 서버를 새로운 PRIM으로 선택하고 다른 서버를 SECOND로 지정하며 PRIM에서 모든 데이터를 다시 동기화합니다.

참고: Windows 한 서버에서 중복된 IP 주소를 감지하고 해당 서버에서 가상 IP 주소를 제거할 수 있습니다. SafeKit 에는 이러한 경우 강제로 재시작하는 검사 기능이 있습니다.


{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}