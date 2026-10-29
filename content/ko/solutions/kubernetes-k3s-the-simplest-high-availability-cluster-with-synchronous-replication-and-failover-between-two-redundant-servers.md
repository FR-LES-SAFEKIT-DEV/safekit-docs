---
title: "Kubernetes K3s 고가용성: 2노드 동기 복제 및 장애 조치"
canonical: "https://safekit.eviden.com/ko/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/"
description: "외부 스토리지나 etcd 쿼럼 없이 2개 노드에서 K3s 고가용성을 구현하세요. SafeKit 가 데이터 손실 없는 복제 및 자동 페일오버를 제공하는 방법을 알아보세요."
category: "solutions"
lang: "ko"
topics: "K3s 고가용성 간소화: MetalLB 및 Longhorn 대신 SafeKit 선택해야 하는 이유, 목차, SafeKit 소프트웨어로 Kubernetes K3s 고가용성 클러스터를 간편하게 구현하는 방법, SafeKit mirror 클러스터가 Kubernetes K3S와 연동되는 방식, SafeKit 고가용성 제한 사항, 비교: SafeKit vs. 표준 K3s 스택(MetalLB 및 Longhorn), 비디오 가이드: SafeKit 및 mirror 고가용성 클러스터 구성, 🔍 SafeKit 고가용성 탐색 허브"
---

# Kubernetes K3s 고가용성: 2노드 동기 복제 및 장애 조치 {#kubernetes-k3s-high-availability-2-node-synchronous-replication--failover}

## K3s HA 간소화: MetalLB 및 Longhorn 대신 SafeKit 선택해야 하는 이유는 무엇일까요? {#safekit-k3s-ha-introduction}

K3s용 표준 오픈 소스 스택(MetalLB + Longhorn)은 대규모 데이터 센터에는 강력하지만, 2노드 온프레미스 사이트에는 과도한 복잡성을 초래합니다. **SafeKit** 는 독립형 네트워킹 및 스토리지 도구를 단일 통합 HA 엔진으로 대체하여 K3s 환경을 간소화합니다. 

### 2노드 K3s 고가용성(HA) 구성에 SafeKit 사용하는 이유는 무엇입니까? {#why-use-safekit-for-2-node-k3s-high-availability-ha}

  * **진정한 2노드 고가용성을 제공합니다.** SafeKit **2개 노드와** 만으로 완전한 이중화를 제공하여 _etcd_ 쿼럼에 필요한 3노드 요구 사항을 제거합니다.
  * **데이터 손실 제로(RPO=0):** 오버헤드가 높은 블록 스토리지를 **동기식 바이트 수준 복제** 로 대체하여 로컬 SSD 성능을 향상시킵니다.
  * **유연한 파일 수준 보호:** SafeKit 는 호스트 기반 파일 수준 복제를 수행하며, 이는 애플리케이션에 완전히 투명합니다. 데이터베이스뿐만 아니라 모든 관련 폴더와 데이터를 보호합니다. 기존 폴더를 설치된 위치, 심지어 **시스템 디스크** 에도 정확하게 복제할 수 있습니다.
  * **통합 가상 IP(VIP):** 커널 수준에서 클러스터 IP를 기본적으로 관리하므로 별도의 **MetalLB** 구성이 필요하지 않습니다.
  * **자동 페일오버 및 페일백:** 는 장애 발생 시 보조 노드로 즉시 전환을 트리거합니다. 기본 노드가 정상화되면 SafeKit 수동 개입 없이 **자동 데이터 재동기화** 실행합니다.
  * **초저 오버헤드:** SafeKit 표준 스택에서 요구되는 스토리지 포드(CSI/Longhorn) 및 네트워킹 포드(CNI/MetalLB)의 과도한 관리 오버헤드 없이 작동하여 애플리케이션에 필요한 중요한 RAM과 CPU를 확보해 줍니다.
  * **IT 전문가 친화적:** 복잡한 네트워킹 및 스토리지 **인프라 YAML** 파일을 **간단한 웹 GUI** 와 자동화된 배포 스크립트로 대체하여 애플리케이션 개발에만 집중할 수 있도록 지원합니다.


통합 가상 IP, 실시간 복제 및 자동 페일오버 기능을 갖춘 2노드 K3s 고가용성 아키텍처 다이어그램 ![ SafeKit ](/wp-content/uploads/2026/02/safekit-mirror-k3s-1024.jpg "w:512") .

 **2노드 K3s 클러스터를 위한 공유 자원이 없는 고가용성(HA)**  


<a class="btn-quick-install" href="/ko/quick-install/safekit-quick-installation-guide-with-kubernetes/"> ⚡ Kubernetes HA 클러스터 빠른 설치 가이드 > </a>
## 목차 {#toc}

  * [ SafeKit 소프트웨어는 어떻게 간단하게 Kubernetes 고가용성 클러스터를 구현합니까? ](#safekit-mirror-k3s-cluster)
  * [ 클러스터와 SafeKit Kubernetes mirror 클러스터는 K3S와 어떻게 연동되나요? ](#safekit-mirror-cluster)
  * [ SafeKit 고가용성 제한 사항 ](#safekit-ha-limitations)
  * [ 비교: SafeKit vs. 표준 K3s 스택(MetalLB & Longhorn) ](#safekit-k3s-ha-comparison)
  * [ 비디오 가이드: SafeKit Mirror ](#videoguide-safekit-mirror-cluster) HA 클러스터 구성
  * [ 🔍 SafeKit 고가용성 내비게이션 허브 ](#hub)


## SafeKit 소프트웨어는 Kubernetes K3s 고가용성 클러스터를 어떻게 간단하게 구현합니까? {#safekit-mirror-k3s-cluster}

### 2노드 Kubernetes K3s 클러스터 )에서 고가용성을 구현하려면 어떻게 해야 합니까? {#how-do-i-implement-high-availability-for-a-2-node-kubernetes-k3s-cluster}

**SafeKit k3s.safe mirror module** 를 사용하면 2노드 Kubernetes K3s 클러스터에 고가용성(HA)을 구현할 수 있습니다. 이 솔루션을 사용하면 외부 NFS 스토리지, 전용 외부 구성 데이터베이스 또는 Kubernetes 관련 전문 지식 없이도 이중화된 환경을 배포할 수 있습니다.

### 엣지 컴퓨팅 및 IoT 컴퓨팅에 K3s를 사용하는 이유는 무엇 ? {#why-use-k3s-for-edge-and-iot-computing}

[ K3s ](<https://k3s.io/>) 는 리소스가 제한된 환경에 맞게 설계된 경량의 인증된 배포판이기 때문에 **IoT 및 엣지 컴퓨팅** 에 권장되는 Kubernetes 엔진입니다. 표준 Kubernetes 의 운영 오버헤드를 간소화하면서도 완벽한 호환성을 유지합니다.

### k3s.safe mirror 의 주요 특징은 무엇입니까? {#what-are-the-key-features-of-the-k3ssafe-mirror-module}

k3s.safe 모듈은 다음을 구현하여 K3에 대한 포괄적인 고가용성(HA) 스택을 제공합니다.

  * **이중 활성 노드:** Pod를 호스팅하기 위해 2개의 활성 K3s 마스터/에이전트를 동시에 실행합니다.
  * **데이터베이스 복제: 노드 간** 구성 데이터베이스 MariaDB 실시간 복제.
  * **영구 저장소: 통합 NFS 클라이언트 동적 프로비저너(nfs-client)를 통한 영구 볼륨의** 복제.
  * **네트워크 연속성:** 에는 원활한 클라이언트 액세스를 위한 가상 IP 주소가 포함되어 있습니다.
  * **자동 복구:** 자동 장애 조치 및 장애 복구에 대한 완벽한 지원.


### K3 외에 SafeKit 는 어떤 애플리케이션과 환경을 보호할 수 있나요? {#beyond-k3s-which-applications-and-environments-can-safekit-protect}

SafeKit 는 mirror 클러스터를 훨씬 뛰어넘는 다목적 고가용성 솔루션 **으로, Windows , Linux** 등 다양한 환경에서 활용 가능합니다. 이 솔루션은 **동기식 실시간 복제** 및 자동 장애 조치를 지원하여 다음과 같은 다양한 중요 워크로드를 처리할 수 있습니다.

  * **가상 및 물리적 환경:** 완벽한 Hyper-V 또는 KVM 가상 머신.
  * **컨테이너 오케스트레이션:** , Docker , Podman 환경.
  * **데이터 및 서비스:** 개별 파일 디렉터리, 서비스 및 다양한 데이터베이스.
  * **클라우드 인프라:** 클라우드 애플리케이션을 위한 고가용성.


SafeKit **<span class="notranslate farm-term" translate="no">Farm</span> 클러스터** 와 같은 네이티브 **네트워크 로드 밸런싱 및 장애 조치** 를 제공하며, **웹 서버** 와 같은 상태 비저장 애플리케이션을 지원합니다.

💡 [ 지원되는 HA 솔루션 전체 목록을 여기에서 확인하세요. ](</ko/solutions/>)

### SafeKit K3s 고가용성을 어떻게 구현합니까? {#safekit-k3s-architecture-table}

**아키텍처 및 SafeKit** 사용한 2노드 K3s 클러스터의 이중화 로직

2노드 K3s 클러스터 | SafeKit PRIM (기본 노드) | SafeKit SECOND (보조 노드)  
---|---|---  
워크로드 실행 | K3s 마스터 및 에이전트 서비스가 활성화되어 클러스터 오케스트레이션을 관리하고 Pod를 실행합니다. | K3s 마스터 및 에이전트 서비스가 활성화 상태를 유지하며 병렬 처리 및 고가용성을 제공합니다.  
NFS 스토리지 및 PV | • 가상 IP 및 NFS 포트 호스트 <br> • 활성으로 내보낸 NFS 공유 관리 <br> • K3s 영구 볼륨(PV) 저장 | 동기식 미러링: SafeKit 모든 영구 볼륨을 실시간으로 복제하여 데이터 손실을 방지합니다.  
구성 데이터베이스 | • 호스트 가상 IP 및 MariaDB 포트 <br> • 활성 K3s 구성 데이터베이스 관리 | 데이터베이스 복제: MariaDB 데이터베이스는 동기적으로 미러링되어 장애 조치를 위해 클러스터 상태를 유지합니다.  
  
**자동 장애 조치 메커니즘:** 기본 노드 장애 발생 시, SafeKit 가상 IP 및 스토리지 서비스를 보조 노드로 자동으로 마이그레이션하여 K3s 클러스터의 서비스 중단을 방지합니다.

## SafeKit mirror 클러스터는 Kubernetes K3S와 어떻게 작동합니까? {#safekit-mirror-cluster}

### 1단계: Mirror 클러스터 에서의 바이트 수준 파일 복제 {#step-1-byte-level-file-replication-in-a-mirror-cluster}

이 단계는 **서버 1(PRIM)** 와 **서버 2(SECOND)** 간의 고가용성 아키텍처를 보여줍니다. 두 서버 모두 [ 아키텍처 표 ](#safekit-k3s-architecture-table) 에 정의된 대로 K3s 마스터 및 에이전트 구성 요소를 실행합니다.


![ K3s 클러스터 Kubernetes mirror ](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300") 에서 바이트 수준의 파일 복제


현재 **가상 IP(VIP)** , **NFS 영구 저장소** 및 **MariaDB** 는 서버 1(PRIM)에서만 활성화되어 있습니다. 두 노드의 K3s 마스터 구성 요소는 가상 IP와 MariaDB 포트를 통해 클러스터 상태에 액세스하여 서로 동기화합니다. SafeKit [ MariaDB ](</ko/best-practises/synchronous-replication-vs-asynchronous-replication/>) 영구 NFS 파일의 동기 복제를 구현하여 장애 발생 시 **데이터 손실이 전혀 발생하지 않도록(RPO = 0)** 합니다.

K3s 마스터는 K3s 에이전트와 직접 통신하여 두 개 이상의 노드에 워크로드를 분산합니다. 외부 클라이언트는 여기에 연결됩니다.  
[ 클러스터의 가상 IP 주소는 PRIM 노드의 ](</ko/best-practises/how-a-virtual-ip-address-works/>) . K3s 마스터는 표준 Kubernetes 메커니즘을 사용하여 노드에 분산된 파드로 트래픽을 중계합니다. 마찬가지로 파드는 가상 IP와 NFS 포트를 통해 PRIM 서버의 **영구 볼륨(PV)** 에 액세스합니다.

### 2단계: 자동 장애 조치 및 서비스 연속성 {#step-2-automatic-failover-and-service-continuity}

**서버 1(PRIM)인** 에 장애가 발생하면 **서버 2(SECOND)인** 자동으로 클러스터 운영을 인계받아 연속성을 보장합니다.


![ 페일오버 Kubernetes K3S 클러스터, mirror ](/wp-content/uploads/2023/02/safekit-stop-alone-300.png "w:300")


SafeKit 장애를 감지하고 즉시 클러스터의 **가상 IP 주소** 서버 2로 마이그레이션합니다. 그런 다음 로컬 **MariaDB** 및 **NFS 서비스** 활성 상태로 승격시킵니다. 1단계에서 수행된 동기 복제 덕분에 모든 MariaDB 데이터베이스와 NFS 영구 볼륨(PV) 파일은 이미 서버 2에서 최신 상태이므로 데이터 손실이 발생하지 않습니다.

클러스터 상태가 유지된 상태에서 서버 2의 **K3s 마스터는** 계속 실행됩니다. 서버 1 에이전트의 장애를 감지하면 영향을 받는 Pod를 나머지 활성 K3s 에이전트로 자동으로 재배치합니다. 전체 장애 조치 시간(RTO)은 장애 감지 간격(기본값: 30초)과 보조 노드에서 K3s 구성 요소가 초기화되는 데 필요한 시간의 합입니다.

서버 1이 오프라인 상태인 동안에도 MariaDB 및 NFS 서비스는 서버 2에서 계속 실행되며, 변경 사항은 로컬에만 기록됩니다.  


### 3단계: 페일백 및 자동 재통합 {#step-3-failback-and-automatic-reintegration}

**페일백** 초기 문제가 해결된 후 서버 1이 재시작될 때 발생합니다. SafeKit MariaDB 및 NFS 파일을 자동으로 재동기화하여 다운타임 동안 서버 2에서 수정된 데이터만 업데이트합니다. 이 재통합 프로세스는 **중단 없이** 진행됩니다. K3s 마스터 및 에이전트 구성 요소는 서버 2에서 중단 없이 계속 실행됩니다. 


K3s 클러스터의 자동 재동기화 및 장애 복구 ![ mirror ](/wp-content/uploads/2023/02/safekit-resynchro-alone-300.png "w:300")

 

SafeKit 서버가 중지된 방식에 따라 복구 시간을 최적화합니다. 

  * **정상 종료:** 서버 1에서 SafeKit 의도적으로 중지된 경우, **수정 추적 비트맵** 를 사용하여 파일 내의 특정 수정 영역만 다시 동기화됩니다. 이를 통해 초고속 재통합이 보장됩니다. 
  * **시스템 충돌(예: 전원 장애):** 서버 1이 비정상적으로 종료된 경우 안전을 위해 수정 비트맵은 무시됩니다. SafeKit 대신 마지막으로 설정된 동기화 지점보다 최신 수정 타임스탬프를 가진 모든 파일을 다시 동기화하여 **전체 데이터 무결성을 보장합니다.** 


### 4단계: 고가용성 및 부하 분산 복원 {#step-4-restoring-high-availability-and-load-distribution}

재통합 후 클러스터는 1단계에서 설명한 상태와 동일하게 **전체 모드 mirror** 로 복귀합니다. 시스템은 다시 고가용성 상태가 됩니다. **MariaDB** 및 **NFS 서비스** 서버 2에서 활성 상태로 유지되고, SafeKit 모든 파일 업데이트를 서버 1로 실시간 복제합니다. 


![ Kubernetes mirror 클러스터 ](/wp-content/uploads/2023/02/safekit-second-prim-300.png "w:300") 에서 정상 작동으로 복귀

 

**K3s 마스터,** 및 **K3s 에이전트** 가 서버 1에서 자동으로 재시작됩니다. 이제 Kubernetes 스케줄러는 서버 1을 정상적인 노드로 인식하고 두 서버에 워크로드를 분산하기 위해 파드 재스케줄링을 시작할 수 있습니다. 

관리자가 MariaDB 및 NFS 서비스를 서버 1에서 실행하도록(원래의 PRIM 역할 복원) 하려면 웹 콘솔을 통해 편리한 시간에 수동으로 **전환을** 시작하거나 구성 설정을 통해 자동화할 수 있습니다. 

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


단순한 상태 아이콘을 넘어, 인터페이스는 **원클릭 장애 조치 오케스트레이션을** 제공하여 계획된 유지 보수를 위해 기본 역할을 수동으로 재할당하는 동시에 사용자 활동에 대한 지속적인 가용성을 보장할 수 있습니다.


{{%  insert-safekit-usage-ko  %}}
 

## 비교: SafeKit 와 표준 K3s 스택(MetalLB & Longhorn) {#safekit-k3s-ha-comparison}

**비교: SafeKit 와 표준 오픈 소스(MetalLB + Longhorn)** 비교

기능 | SafeKit ( K3s.safe ) | MetalLB + Longhorn (표준 K8)  
---|---|---  
| 올인원 아키텍처: 네트워킹, 복제 및 장애 조치 기능을 단일 패키지로 통합합니다. | DIY(직접 구성) 스택: 여러 개의 독립적인 패키지(CNI, CSI, 로드 밸런서)가 필요합니다.  
하드웨어 효율성 | 순수 2노드 HA: 세 번째 "증인" 또는 중재자 노드 없이 완벽한 이중화를 제공합니다. | 최소 3노드: 일반적으로 Etcd 쿼럼 및 스토리지 안전성을 위해 홀수 개의 노드가 필요합니다.  
네트워킹(VIP) | 네이티브: OS 레벨에서 관리되는 가상 IP로, K3s에 투명합니다. | 컴플렉스: 각 노드에서 CPU/RAM을 사용하는 전용 스피커 포드를 이용한 L2 또는 BGP 구성이 포함된 MetalLB 설치가 필요합니다.  
스토리지 요구 사항 | 바이트 수준 동기식: 기존 디렉터리의 실시간 파일 복제; 표준 시스템 디스크에서 작동; 최소한의 CPU/네트워크 오버헤드로 바이트 수준 파일 복제. | 블록 수준: 전용 스토리지 포드를 사용하는 분산 블록 스토리지(Longhorn); 더 높은 리소스 사용량.  
장애 조치 인텔리전스 | 독립적 안정성: SafeKit 컨테이너 런타임 외부에서 작동합니다. OS와 하드웨어를 직접 모니터링하여 Kubernetes 제어 플레인이나 컨테이너 엔진이 멈추더라도 장애 조치가 유지되도록 합니다. | 순환 종속성: 장애 조치 로직은 보호 대상인 Pod 내부에 호스팅됩니다. 호스트 OS 또는 K3s 엔진이 멈추면 관리 Pod(MetalLB/Longhorn)도 멈추게 되며, 이 "잠금" 상태를 해제하려면 수동으로 문제를 해결해야 하는 경우가 많습니다.  
간소화된 관리 방식 | : 단일 웹 콘솔을 통해 관리 가능하며, 전문가 Kubernetes 가 필요하지 않습니다. 특수 관리 방식 | : YAML, Helm 및 Kubernetes 내부 컨트롤러에 대한 심층적인 지식이 필요합니다.  
  
요약 **, 표준 DIY 스택 SafeKit MetalLB + Longhorn)** Kubernetes 에게 모듈성을 제공하지만, 스토리지 및 네트워킹 도구가 관리하도록 설계된 노드 장애에 **순환 종속성을 초래합니다. 이러한 문제를 해결하기** 독립적인 인프라 **으로 작동하는 더욱 강력하고 하드웨어에 구애받지** 2노드 고가용성(HA) 솔루션을 제공합니다. 이 솔루션은 엔진이나 호스트 운영 체제 Kubernetes 멈추더라도 계속 작동합니다. 이를 통해 기존 분산 블록 스토리지 및 네트워킹 오버레이에서 요구되는 과도한 리소스 오버헤드, 필수적인 3노드 쿼럼, 복잡한 구성 없이도 자동 복구 및 데이터 무결성을 보장합니다.

## 비디오 가이드: SafeKit mirror , HA 클러스터 구성 {#videoguide-safekit-mirror-cluster}

### SafeKit 비디오: 애플리케이션 수준 클러스터링 (8:47) {#demo-mirror-ha-cluster}

이 비디오는 SafeKit Microsoft SQL Server 에 대해 제공하는 고가용성을 보여주는 동시에, K3s 환경을 보호하는 솔루션의 전반적인 기능을 훌륭하게 설명합니다. SafeKit 다른 데이터베이스나 비즈니스 크리티컬 애플리케이션에도 동일하게 적용됩니다.

### 비디오 하이라이트 {#video-highlights}

  1. 🎬 [ 2개 노드, SQL Server ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) 포함 (0:32)
  2. 🎬 [ 클러스터 및 mirror.safe 모듈 ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) 구성 (3:58)
  3. 🎬 [ SQL 복제, 마이그레이션, 충돌 시 페일오버 시작 및 테스트 ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)


&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 


{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}