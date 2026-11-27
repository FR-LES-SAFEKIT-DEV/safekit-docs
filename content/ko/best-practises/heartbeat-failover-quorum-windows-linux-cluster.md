---
title: "Windows 및 Linux 클러스터의 하트비트, 장애 조치 및 쿼럼"
canonical: "https://safekit.eviden.com/ko/best-practises/heartbeat-failover-quorum-windows-linux-cluster/"
description: "Windows 및 Linux 클러스터에서 하트비트, 장애 조치, 쿼럼의 작동 방식과 SafeKit이 쿼럼 디스크나 제3 서버 없이 스플릿 브레인을 방지하는 방법."
category: "best-practises"
lang: "ko"
topics: "Windows 또는 Linux 클러스터에서 하트비트와 장애 조치는 어떻게 작동하나요?, 두 개의 원격 컴퓨터실에 있는 서버를 사용한 스플릿 브레인 및 쿼럼, SafeKit 스플릿 브레인 체커를 사용한 간단한 클러스터 쿼럼"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-19.19 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/02/quorum-with-remote-sites.png"
schemaType: "TechArticle"
---

# Windows 및 Linux 클러스터의 하트비트, 장애 조치 및 쿼럼 {#heartbeat-failover-and-quorum-in-windows-and-linux-clusters}


{{%  insert-safekit-network-isolation-ko  %}}
 

## Windows 또는 Linux 클러스터에서 하트비트와 장애 조치는 어떻게 작동하나요? {#how-heartbeats-and-failover-work-in-a-windows-or-linux-cluster}

### 하트비트가 무엇인가요? {#what-is-a-heartbeat}

두 서버를 동기화하고 서버 장애를 감지하는 기본 메커니즘은 **하트비트**입니다. 하트비트는 두 서버가 공유하는 네트워크의 모니터링 데이터 흐름입니다.

SafeKit 소프트웨어는 여러 하트비트를 지원합니다. 두 서버가 공유하는 각 네트워크는 하나의 하트비트를 전송할 수 있습니다.

하트비트 메커니즘은 Windows 및 Linux 클러스터를 구현하는 데 사용됩니다. 이 메커니즘은 실시간 파일 복제 및 장애 조치를 갖춘 SafeKit mirror 클러스터에 통합되어 있습니다.

### SafeKit 하트비트 {#safekit-heartbeats}

정상 작동 시 두 서버는 하트비트 채널을 통해 상태를 교환합니다. 이러한 상태는 PRIM, SECOND 및 리소스 상태입니다. 또한 애플리케이션의 시작 및 중지 절차를 동기화합니다.

예를 들어, 예정된 장애 조치 중에는 기본 서버에서 먼저 애플리케이션의 중지 스크립트가 실행됩니다. 그런 다음 보조 서버에서 시작 스크립트가 실행됩니다. 따라서 보조 서버의 복제된 데이터는 안전한 상태가 됩니다. 이 상태는 애플리케이션의 정상적인 중단에 해당합니다.

### 모든 하트비트가 사라지면 어떻게 되나요? {#loss-of-all-heartbeats}

서버가 모든 하트비트를 잃으면 다른 서버가 다운된 것으로 간주합니다. 그런 다음 ALONE 상태로 전환됩니다.

SECOND 상태의 서버가 ALONE 상태로 전환되면 이 서버에서 애플리케이션이 다시 시작됩니다. 이것이 애플리케이션 장애 조치입니다.

두 개의 하트비트 채널을 서로 다른 두 네트워크에 두는 것이 권장되지만 필수는 아닙니다. 두 개의 네트워크를 사용하면 네트워크 장애가 서버 장애와 혼동되지 않습니다.

## 두 개의 원격 컴퓨터실에 있는 서버를 사용한 스플릿 브레인 및 쿼럼 {#split-brain-problem-and-quorum-when-servers-are-in-two-remote-computer-rooms}


![Windows 또는 Linux 클러스터의 하트비트, 장애 조치 및 쿼럼](/wp-content/uploads/2023/02/quorum-with-remote-sites.png "w:200")


### 두 개의 원격 컴퓨터실 {#remote-computer-rooms}

두 개의 원격 컴퓨터실에 있는 두 대의 서버를 갖춘 고가용성 클러스터는 중요한 애플리케이션을 보호할 수 있습니다.

따라서 재해로 인해 컴퓨터실 전체가 파괴되더라도 애플리케이션은 계속 사용할 수 있습니다.

### 스플릿 브레인 {#split-brain}

두 컴퓨터실 간의 네트워크가 단절되면 모든 하트비트가 손실됩니다. 이것이 바로 스플릿 브레인 문제입니다. 두 서버 모두 중요한 애플리케이션을 시작합니다.

### 일반적인 솔루션의 복잡성 {#complexity-of-solutions}

대부분의 경우, 스플릿 브레인 문제를 해결하기 위해 쿼럼이 사용됩니다. 쿼럼은 세 번째 쿼럼 서버 또는 특수 쿼럼 디스크를 사용합니다. 이를 통해 두 개의 기본 서버가 동시에 존재하지 않도록 합니다.

안타깝게도 이러한 쿼럼 장치는 클러스터링 아키텍처에 비용과 복잡성을 더합니다.

## SafeKit 스플릿 브레인 체커를 사용한 간단한 클러스터 쿼럼 {#simple-cluster-quorum-with-the-safekit-split-brain-checker}

### SafeKit 스플릿 브레인 체커 {#safekit-split-brain-checker}

SafeKit 고가용성 소프트웨어를 사용하면 Windows 또는 Linux 클러스터의 쿼럼에 세 번째 쿼럼 서버나 쿼럼 디스크가 필요하지 않습니다. 간단한 🛠️ [스플릿 브레인 체커](</ko/resources/safekit-user-guide-82/#check_splitbrain>)만으로도 두 서버에서 애플리케이션이 동시에 실행되는 것을 방지할 수 있습니다.

서버 간의 모든 하트비트가 손실되면 스플릿 브레인 체커는 하나의 서버만 기본 서버로 선택합니다. 다른 서버는 WAIT 상태로 전환됩니다. 다른 서버의 하트비트를 다시 수신할 때까지 기다립니다. 그런 다음 기본 서버에서 복제된 데이터를 동기화하고 보조 상태로 돌아갑니다.

### 스플릿 브레인 체커는 어떻게 작동하나요? {#how-the-split-brain-checker-works}

기본 서버는 증인이라고 하는 IP 주소로 핑을 보내 선택됩니다. 증인은 일반적으로 항상 사용 가능한 라우터입니다. 네트워크 격리 시, 증인에 도달할 수 있는 서버만 ALONE 상태에서 기본이 됩니다. 다른 서버는 WAIT 상태로 전환됩니다.

Witness는 영구적으로 테스트되지 않습니다. 모든 하트비트가 손실되었을 때만 테스트됩니다. 이때 Witness가 다운되면 클러스터는 WAIT-WAIT 상태로 전환됩니다. 그러면 관리자는 SafeKit 웹 콘솔을 사용하여 서버 중 하나를 주 서버로 다시 시작할 수 있습니다.

### 스플릿 브레인 체커가 없으면 어떻게 될까요? {#what-happens-without-a-split-brain-checker}

네트워크가 고립되면 두 서버 모두 ALONE 상태로 전환되어 중요 애플리케이션을 실행합니다. 복제된 디렉터리는 고립됩니다. 각 애플리케이션은 자체 디렉터리에서 자체 데이터로 작동합니다.

네트워크가 다시 연결되면 SafeKit은 기본적으로 격리 전 PRIM 이었던 서버를 새 주 서버로 선택합니다. 다른 서버는 SECOND 상태로 강제 전환됩니다. 모든 데이터는 PRIM 서버에서 재동기화됩니다.

참고: Windows에서 서버는 중복 IP 주소를 감지하고 가상 IP 주소를 제거할 수 있습니다. 이 경우 SafeKit 검사기가 재시작을 강제합니다.


{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}
