---
title: "Kubernetes K3s 고가용성: 2노드 동기 복제 및 장애 조치"
canonical: "https://safekit.eviden.com/ko/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/"
description: "외부 스토리지나 etcd 쿼럼 없이 2개 노드에서 K3s 고가용성을 구현하세요. SafeKit은 어떻게 데이터 손실 없는 복제 및 자동 장애 조치를 제공하는지 알아보세요."
category: "solutions"
lang: "ko"
topics: "K3s HA 간소화: MetalLB 및 Longhorn 대신 SafeKit을 선택해야 하는 이유, 목차, SafeKit 소프트웨어는 Kubernetes K3s 고가용성 클러스터를 어떻게 간단하게 구현할까요?, SafeKit mirror 클러스터 Kubernetes K3S와 어떻게 연동되나요?, SafeKit 고가용성 제한 사항, 비교: SafeKit vs. 표준 K3s 스택(MetalLB 및 Longhorn), 비디오 가이드: SafeKit HA mirror 클러스터를 구성, 🔍 SafeKit 살펴보기"
translation: "translate_md 2026-11-08.3 | glossaire 2026-11-08.9 | Translation LLM | 37 expressions"
---

# Kubernetes K3s 고가용성: 2노드 동기 복제 및 장애 조치 {#kubernetes-k3s-high-availability-2-node-synchronous-replication--failover}

## K3s HA 간소화: MetalLB 및 Longhorn 대신 SafeKit을 선택해야 하는 이유 {#safekit-k3s-ha-introduction}

K3s의 표준 오픈 소스 스택(MetalLB + Longhorn)은 대규모 데이터 센터에 강력하지만, 2노드 온프레미스 사이트에는 과도한 복잡성을 초래합니다. **SafeKit**은 독립형 네트워킹 및 스토리지 도구를 단일 통합 HA 엔진으로 대체하여 K3s 환경을 간소화합니다. 

### 2노드 K3s 고가용성(HA)에 SafeKit을 사용해야 하는 이유는 무엇일까요? {#why-use-safekit-for-2-node-k3s-high-availability-ha}

  * **진정한 2노드 고가용성:** SafeKit 단 **2개의 노드** 만으로 완전한 이중화를 제공하여 *etcd* 쿼럼에 필요한 3개 노드 요건을 없앱니다.
  * **제로 데이터 손실(RPO =0):** 높은 오버헤드의 블록 스토리지를 **동기식 바이트 수준 복제**로 대체하여 로컬 SSD 성능을 제공합니다.
  * **유연한 파일 수준 보호:** SafeKit 호스트 기반 복제를 파일 수준에서 수행하며, 이는 애플리케이션에 완전히 투명하게 적용됩니다. 데이터베이스뿐만 아니라 모든 관련 폴더와 데이터를 보호합니다. 기존 폴더는 설치된 위치 그대로, 심지어 **시스템 디스크**에 있는 폴더도 복제할 수 있습니다.
  * **통합 가상 IP(VIP):** 커널 수준에서 클러스터 IP를 기본적으로 관리하여 별도의 **MetalLB** 구성이 필요하지 않습니다.
  * **자동 장애 조치 및 장애 복구:** 장애 발생 시 보조 노드로 즉시 전환을 트리거합니다. 기본 노드가 정상 상태가 되면 SafeKit 수동 개입 없이 **자동 데이터 재동기화**를 실행합니다.
  * **초저 오버헤드:** SafeKit 표준 스택에 필요한 스토리지 포드(CSI/Longhorn) 및 네트워킹 포드(CNI/MetalLB)의 무거운 관리 오버헤드 없이 작동하여 애플리케이션에 중요한 RAM 및 CPU를 확보해 줍니다.
  * **IT 전반에 대한 지식이 있는 사용자에게 적합:** 네트워킹 및 스토리지에 대한 복잡한 **인프라 YAML**을 **간단한 웹 GUI** 및 자동 배포 스크립트로 대체하여 애플리케이션에만 집중할 수 있도록 합니다.


![통합 가상 IP, 실시간 복제 및 자동 장애 조치를 특징으로 하는 2노드 K3s 고가용성을 위한 SafeKit 아키텍처 다이어그램입니다.](/wp-content/uploads/2026/02/safekit-mirror-k3s-1024.jpg "w:512")

 **2노드 K3s 클러스터를 위한 비공유(shared-nothing) 고가용성(HA)**  


<a class="btn-quick-install" href="/ko/quick-install/safekit-quick-installation-guide-with-kubernetes/">⚡ Kubernetes HA 클러스터 빠른 설치 가이드 ></a>
## 목차 {#toc}

  * [SafeKit 소프트웨어는 Kubernetes K3s 고가용성 클러스터를 어떻게 간단하게 구현할까요?](#safekit-mirror-k3s-cluster)
  * [SafeKit mirror 클러스터 Kubernetes K3S와 어떻게 연동되나요?](#safekit-mirror-cluster)
  * [SafeKit 고가용성 제한 사항](#safekit-ha-limitations)
  * [비교: SafeKit vs. 표준 K3s 스택(MetalLB 및 Longhorn)](#safekit-k3s-ha-comparison)
  * [비디오 가이드: SafeKit mirror HA 클러스터를 구성](#videoguide-safekit-mirror-cluster)
  * [🔍 SafeKit 살펴보기](#hub)


## SafeKit 소프트웨어는 Kubernetes K3s 고가용성 클러스터를 어떻게 간단하게 구현할까요? {#safekit-mirror-k3s-cluster}

### 2노드 Kubernetes K3s 클러스터에 고가용성을 구현하려면 어떻게 해야 하나요? {#how-do-i-implement-high-availability-for-a-2-node-kubernetes-k3s-cluster}

**SafeKit k3s.safe mirror 모듈**을 사용하여 2노드 Kubernetes K3s 클러스터에 고가용성(HA)을 구현할 수 있습니다. 이 솔루션을 사용하면 외부 NFS 스토리지, 전용 외부 구성 데이터베이스 또는 전문 Kubernetes 지식 없이도 이중화된 환경을 배포할 수 있습니다.

### 엣지 및 IoT 컴퓨팅에 K3s를 사용하는 이유는 무엇일까요? {#why-use-k3s-for-edge-and-iot-computing}

[K3s는](<https://k3s.io/>) 리소스 제약 환경을 위해 설계된 경량의 인증된 배포판이므로 **IoT 및 엣지 컴퓨팅**에 선호되는 Kubernetes 엔진입니다. K3s는 표준 Kubernetes의 완전한 호환성을 유지하면서 운영 오버헤드를 간소화합니다.

### K3s.safe mirror 모듈의 주요 기능은 무엇인가요? {#what-are-the-key-features-of-the-k3ssafe-mirror-module}

k3s.safe 모듈은 다음을 구현하여 K3s를 위한 포괄적인 HA 스택을 제공합니다

  * **듀얼 액티브 노드:** 2개의 활성 K3s 마스터/에이전트를 동시에 실행하여 파드를 호스팅합니다.
  * **데이터베이스 복제:** 노드 간 MariaDB 구성 데이터베이스의 실시간 복제.
  * **영구 스토리지:** 통합 NFS 클라이언트 동적 프로비저너(nfs-client)를 통한 영구 볼륨 복제.
  * **네트워크 연속성:** 원활한 클라이언트 액세스를 위한 가상 IP 주소를 포함합니다.
  * **자동 복구:** 자동 장애 조치 및 장애 복구를 완벽하게 지원합니다.


### K3s 외에 SafeKit은 어떤 애플리케이션과 환경을 보호할 수 있나요? {#beyond-k3s-which-applications-and-environments-can-safekit-protect}

SafeKit은 **Windows 및 Linux 모두 지원하**는 다목적 고가용성 솔루션으로, K3s mirror 클러스터를 훨씬 뛰어넘는 기능을 제공합니다. 다음과 같은 광범위한 중요 워크로드를 위한 **동기식 실시간 복제** 및 자동 장애 조치를 지원합니다

  * **가상 및 물리적 환경:** 완전한 Hyper-V 또는 KVM 가상 머신.
  * **컨테이너 오케스트레이션:** Docker, Podman 환경.
  * **데이터 및 서비스:** 개별 파일 디렉터리, 서비스 및 다양한 데이터베이스.
  * **클라우드 인프라:** 클라우드 애플리케이션을 위한 고가용성.


SafeKit은 **웹 서버**와 같은 상태 비저장 애플리케이션을 위해 네이티브 **네트워크 부하 분산 및 장애 조치**를 갖춘 **<span class="notranslate farm-term" translate="no">farm</span> 클러스터**를 제공합니다.

💡 [지원되는 HA 솔루션의 전체 목록은 여기에서 확인하세요.](</ko/solutions/>)

### SafeKit은 어떻게 K3s의 고가용성을 달성할까요? {#safekit-k3s-architecture-table}

**SafeKit을 사용한 2노드 K3s 클러스터의 아키텍처 및 이중화 로직**

2노드 K3s 클러스터 | SafeKit PRIM (주 노드) | SafeKit SECOND (보조 노드)  
---|---|---  
워크로드 실행 | K3s 마스터 및 에이전트 서비스가 활성화되어 클러스터 오케스트레이션을 관리하고 파드를 실행합니다. | K3s 마스터 및 에이전트 서비스는 계속 활성화되어 병렬 처리 및 고가용성을 제공합니다.  
NFS 스토리지 및 PV |  • 가상 IP 및 NFS 포트 호스트 <br> • 활성 내보내기 NFS 공유를 관리합니다. <br> • K3s 영구 볼륨(PV) 저장  | 동기식 미러링: SafeKit은 모든 영구 볼륨을 실시간으로 복제하여 데이터 손실이 없도록 보장합니다.  
구성 데이터베이스 |  • 가상 IP 및 MariaDB 포트 호스팅 <br> • 활성 K3s 구성 데이터베이스 관리  | 데이터베이스 복제: MariaDB 데이터베이스는 동기식으로 미러링되어 장애 조치 시 클러스터 상태를 유지합니다.  
  
**자동 장애 조치 메커니즘:** 주 노드에 장애가 발생하면 SafeKit은 가상 IP와 스토리지 서비스를 보조 노드로 자동 마이그레이션하여 K3s 클러스터에 중단 없는 서비스를 보장합니다.

## SafeKit mirror 클러스터 Kubernetes K3S와 어떻게 연동되나요? {#safekit-mirror-cluster}

### 1단계: mirror 클러스터에서 바이트 수준 파일 복제 {#step-1-byte-level-file-replication-in-a-mirror-cluster}

이 단계에서는 **서버 1(PRIM)**과 **서버 2(SECOND)** 간의 고가용성 아키텍처 보여줍니다. 두 서버 모두 [아키텍처 표](#safekit-k3s-architecture-table)에 정의된 대로 K3s 마스터 및 에이전트 구성 요소를 실행합니다.


![Kubernetes K3s mirror 클러스터에서 바이트 수준으로 파일 복제하기](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


현재 **가상 IP(VIP)**, **NFS 영구 스토리지** 및 **MariaDB** 서버 1(PRIM)에서만 활성화되어 있습니다. 두 노드의 K3s 마스터 구성 요소는 가상 IP와 MariaDB 포트를 통해 클러스터 상태에 액세스하여 서로 동기화됩니다. SafeKit은 MariaDB 및 영구 NFS 파일의 [동기 복제](</ko/best-practises/synchronous-replication-vs-asynchronous-replication/>)를 구현하여 장애 발생 시 **데이터 손실이 없도록 보장합니다(RPO = 0)**.

K3s 마스터는 K3s 에이전트와 직접 통신하여 워크로드를 두 개 이상의 노드에 분산합니다. 외부 클라이언트는  
PRIM 노드의 [클러스터 가상 IP 주소입니다](</ko/best-practises/how-a-virtual-ip-address-works/>). 표준 Kubernetes 메커니즘을 사용하여 K3s 마스터는 노드에 분산된 파드로 트래픽을 중계합니다. 마찬가지로 파드는 가상 IP 및 NFS 포트를 통해 PRIM 서버의 **영구 볼륨(PV)**에 액세스합니다.

### 2단계: 자동 장애 조치 및 서비스 연속성 {#step-2-automatic-failover-and-service-continuity}

**서버 1(PRIM)**에 장애가 발생하면 **서버 2(SECOND)가** 자동으로 클러스터 운영을 인계받아 연속성을 보장합니다.


![Kubernetes K3S mirror 클러스터의 장애 조치](/wp-content/uploads/2023/02/safekit-stop-alone-300.png "w:300")


SafeKit은 장애를 감지하고 클러스터의 **가상 IP 주소**를 즉시 서버 2로 마이그레이션합니다. 그런 다음 로컬 **MariaDB** 및 **NFS 서비스**를 활성 상태로 승격합니다. 1단계에서 수행된 동기 복제 덕분에 모든 MariaDB 데이터베이스와 NFS 영구 볼륨(PV) 파일은 이미 서버 2에서 최신 상태이므로 데이터 손실이 전혀 없습니다.

클러스터 상태가 유지된 상태에서 서버 2의 **K3s 마스터**는 실행을 계속합니다. 서버 1 에이전트의 손실을 감지하고 영향을 받는 파드를 나머지 활성 K3s 에이전트에 자동으로 재스케줄링합니다. 총 장애 조치 시간(RTO)은 장애 감지 간격(기본값: 30초)과 보조 노드에서 K3s 구성 요소를 초기화하는 데 필요한 시간의 합계입니다.

서버 1이 오프라인 상태인 동안 MariaDB 및 NFS 서비스는 서버 2에서 계속 실행되며 변경 사항을 로컬에만 기록합니다.  


### 3단계: 장애 복구 및 자동 재통합 {#step-3-failback-and-automatic-reintegration}

초기 문제가 해결된 후 서버 1이 다시 시작되면 **페일백이** 발생합니다. SafeKit은 MariaDB 및 NFS 파일을 자동으로 재동기화하여 다운타임 동안 서버 2에서 수정된 데이터만 업데이트합니다. 이 재통합 프로세스는 **중단 없이 진행** 되며, K3s 마스터 및 에이전트 구성 요소는 중단 없이 서버 2에서 계속 실행됩니다. 


![K3s mirror 클러스터의 자동 재동기화 및 장애 복구](/wp-content/uploads/2023/02/safekit-resynchro-alone-300.png "w:300")

 

SafeKit 서버가 중지된 방식에 따라 복구 시간을 최적화합니다 

  * **정상 종료:** SafeKit 서버 1에서 의도적으로 중지된 경우, 파일 내에서 수정된 특정 영역만 **수정 추적 비트맵**을 사용하여 재동기화됩니다. 이를 통해 매우 빠른 재통합이 보장됩니다. 
  * **시스템 충돌(예: 정전):** 서버 1이 비정상적으로 종료된 경우, 안전을 위해 수정 비트맵이 우회됩니다. 대신 SafeKit 마지막 동기화 지점보다 최신 수정 타임스탬프가 있는 모든 파일을 재동기화하여 **전체 데이터 무결성**을 보장합니다. 


### 4단계: 고가용성 및 부하 분산 복원 {#step-4-restoring-high-availability-and-load-distribution}

재통합 후 클러스터는 **전체 mirror 모드**로 돌아가며, 1단계에서 설명한 상태를 미러링합니다. 시스템은 다시 고가용성 상태가 됩니다. **MariaDB** 및 **NFS 서비스**는 서버 2에서 계속 활성화되어 있는 반면, SafeKit은 모든 파일 업데이트를 서버 1로 실시간 복제합니다. 


![Kubernetes K3s mirror 클러스터에서 정상 작동으로 복귀](/wp-content/uploads/2023/02/safekit-second-prim-300.png "w:300")

 

**K3s 마스터**와 **K3s 에이전트가** 서버 1에서 자동으로 다시 시작됩니다. 이제 Kubernetes 스케줄러는 서버 1을 정상 노드로 인식하고 파드를 다시 스케줄링하여 두 서버에 워크로드를 분산할 수 있습니다. 

관리자가 MariaDB 및 NFS 서비스를 서버 1에서 실행하도록 선호하는 경우(원래 PRIM 역할 복원), 웹 콘솔을 통해 편리한 시간에 수동으로 **전환**을 트리거하거나 구성 설정을 통해 자동화할 수 있습니다. 

### SafeKit mirror 클러스터를 구성하는 방법은 무엇입니까? {#safekit-mirror-cluster-configure}


![SafeKit 웹 콘솔: mirror 클러스터의 하트비트 네트워크, 가상 IP 설정 및 실시간 디렉터리 복제를 보여주는 고가용성 구성 대시보드입니다.](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


**SafeKit 웹 콘솔**은 중요한 애플리케이션의 고가용성을 조율하기 위한 직관적인 인터페이스를 제공합니다. 몇 단계만으로 **SafeKit mirror 클러스터**를 구성하여 비즈니스 연속성을 보장할 수 있습니다

  * **애플리케이션 장애 조치(매크로 탭):** 장애 발생 시 자동으로 다시 시작할 특정 애플리케이션 서비스를 정의합니다.
  * **하트비트 네트워크:** 클러스터 노드가 서로의 상태와 가용성을 지속적으로 모니터링하고 장애 조치 결정을 동기화하는 데 사용하는 전용 통신 경로입니다.
  * **가상 IP 관리:** 장애 조치 후 클라이언트가 투명하게 재연결될 수 있도록 가상 IP(VIP)를 설정합니다.
  * **실시간 복제:** 호스트 기반 동기식 바이트 수준 복제에 중요한 디렉터리를 선택합니다.
  * **체커:** 애플리케이션의 상태를 모니터링하고 프로세스 오류가 감지되면 자동 복구를 트리거합니다.


SafeKit 클러스터에는 전용 스플릿 브레인 검사기가 포함되어 있어 세 번째 증인 머신이나 추가 하트비트 네트워크 없이도 네트워크 격리 문제를 해결할 수 있습니다. [클러스터의 하트비트, 장애 조치 및 쿼럼](</ko/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>)에 대해 자세히 알아보세요.

### SafeKit mirror 클러스터를 모니터링하는 방법은 무엇입니까? {#safekit-mirror-cluster-monitoring}


![SafeKit 웹 콘솔: 2노드 mirror 클러스터의 실시간 모니터링 화면으로, 활성 데이터 복제와 함께 PRIM 및 SECOND 상태를 보여줍니다.](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


**SafeKit 관리 콘솔**은 고가용성 인프라에 대한 통합된 보기를 제공합니다. 관리자는 이를 통해 클러스터의 **운영 상태**를 모니터링하고 데이터 동기화를 실시간으로 추적할 수 있습니다.

2노드 mirror 클러스터의 경우 콘솔에 각 서버의 역할이 명확하게 표시됩니다

  * **PRIM (기본):** 현재 애플리케이션을 실행하고 가상 IP를 관리하는 활성 노드입니다. 로컬 스토리지에 쓰기를 수행하고 보조 노드에 실시간 복제를 수행합니다.
  * **SECOND (Secondary):** 동기식 바이트 수준 업데이트를 수신하는 대기 노드입니다. 주 노드에 장애가 발생하면 즉시 인계할 준비가 되어 있습니다.
  * **ALONE 상태:** 클러스터가 단일 노드에서 실행 중일 때(예: 유지보수 중 또는 장애 발생 후) 시각적으로 경고하여 이중화가 일시적으로 손실되었음을 나타냅니다.
  * **재동기화 진행 상황:** 장애가 발생한 노드가 복구되면 백그라운드 데이터 재통합 중에 상태가 주황색으로 바뀌어 "정상으로 돌아가기" 단계에서 다운타임이 발생하지 않도록 합니다.


단순한 상태 아이콘을 넘어, 이 인터페이스는 **원클릭 장애 조치 오케스트레이션**을 제공하여 계획된 유지보수 동안 주 역할을 수동으로 재할당하는 동시에 사용자 활동에 대한 지속적인 가용성을 보장합니다.


{{%  insert-safekit-usage-ko  %}}
 

## 비교: SafeKit vs. 표준 K3s 스택(MetalLB 및 Longhorn) {#safekit-k3s-ha-comparison}

**비교: SafeKit vs. 표준 오픈소스(MetalLB + Longhorn)**

역량 | SafeKit (K3s.safe) | MetalLB + Longhorn (표준 K8s)  
---|---|---  
아키텍처 | 올인원: 네트워킹, 복제, 장애 조치를 단일 패키지로 통합. | DIY(Do It Yourself) 스택: 여러 독립적인 패키지(CNI, CSI, 로드밸런서)가 필요합니다.  
하드웨어 효율성 | 순수 2노드 HA: 세 번째 "증인" 또는 중재자 노드 없이 완전한 이중화를 제공합니다. | 최소 3개 노드: 일반적으로 Etcd 쿼럼 및 스토리지 안전을 위해 홀수 개수가 필요합니다.  
네트워킹 (VIP) | 네이티브: OS 수준에서 관리되는 가상 IP이며 K3s에는 투명하게 표시됩니다. | 복잡함: 각 노드에서 CPU/RAM을 소비하는 전용 스피커 포드를 사용하여 L2 또는 BGP 구성으로 MetalLB를 설치해야 합니다.  
저장 공간 요구 사항 | 바이트 수준 동기화: 기존 디렉터리의 실시간 파일 복제, 표준 시스템 디스크에서 작동, 최소한의 CPU/네트워크 오버헤드로 바이트 수준 파일 복제. | 블록 수준: 전용 스토리지 포드를 사용하는 분산 블록 스토리지(Longhorn); 리소스 소모가 더 많음.  
장애 조치 인텔리전스 | 독립적인 안정성: SafeKit은 컨테이너 런타임 외부에서 작동합니다. OS와 하드웨어를 직접 모니터링하여 Kubernetes 제어 플레인 또는 컨테이너 엔진이 중단되더라도 장애 조치를 보장합니다. | 순환 종속성: 장애 조치 로직은 보호 대상인 포드 *내에서* 호스팅됩니다. 호스트 OS 또는 K3s 엔진이 중단되면 관리 포드(MetalLB/Longhorn)도 멈추게 되며, 종종 "잠금"을 해제하기 위해 수동으로 문제를 해결해야 합니다  
관리 | 간소화: 단일 웹 콘솔을 통해 관리할 수 있으며, Kubernetes 전문가가 필요하지 않습니다. | 전문성: YAML, Helm, K8s 내부 컨트롤러에 대한 깊은 지식이 필요합니다.  
  
**요약하자면**, 표준 DIY 스택(MetalLB + Longhorn)은 Kubernetes 전문가에게 모듈성을 제공하지만, 스토리지 및 네트워킹 도구가 관리하도록 설계된 동일한 노드 장애에 취약한 **순환 종속성**을 생성합니다. **SafeKit**은 독립적인 인프라 계층으로 작동하여 이 루프를 끊습니다. 즉 Kubernetes 엔진 또는 호스트 OS가 중단되더라도 작동하는 보다 강력하고 하드웨어에 구애받지 않는 2노드 HA 솔루션을 제공합니다. 이를 통해 기존 분산 블록 스토리지 및 네트워킹 오버레이에 필요한 막대한 리소스 오버헤드, 필수 3노드 쿼럼 또는 구성 복잡성 없이 자동 복구 및 데이터 무결성을 보장합니다.

## 비디오 가이드: SafeKit HA mirror 클러스터를 구성 {#videoguide-safekit-mirror-cluster}

### SafeKit 동영상: 애플리케이션 수준 클러스터링 (8:47) {#demo-mirror-ha-cluster}

이 비디오는 Microsoft SQL Server에 대한 SafeKit의 고가용성을 보여주지만, 이 솔루션이 K3s 환경을 어떻게 보호하는지에 대한 훌륭한 개요를 제공합니다. SafeKit은 다른 모든 데이터베이스 또는 비즈니스에 중요한 애플리케이션에 대해 동일하게 작동합니다.

### 영상 하이라이트 {#video-highlights}

  1. 🎬 [SQL Server가 있는 2개의 노드](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. 🎬 [클러스터 및 mirror.safe 모듈 구성](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. 🎬 [SQL 복제, 마이그레이션, 충돌 시 장애 조치 시작 및 테스트](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)


&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 


{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}