---
title: "RPO와 RTO란 무엇인가? 정의, 예시 및 HA 전략"
canonical: "https://safekit.eviden.com/ko/best-practises/what-is-rpo-and-rto-with-examples/"
description: "명확한 예시를 통해 RPO (복구 지점 목표)와 RTO (복구 시간 목표)의 정의를 알아보세요. SafeKit은 어떻게 데이터 손실 제로(RPO = 0)를 달성하고 신속한 장애 조치를 통해 24시간 연중무휴 비즈니스 연속성을 보장하는지 알아보세요."
category: "best-practises"
lang: "ko"
topics: "간략 요약: RPO vs. RTO, 목차, 고가용성 및 비즈니스 연속성 솔루션의 RPO와 RTO는 어떻게 계산하나요?, 백업 및 재해 복구 솔루션의 RPO와 RTO는 어떻게 결정하나요?, SafeKit mirror 클러스터는 어떻게 제로 RPO와 낮은 RTO를 달성하나요?, 로드 밸런싱이 적용된 SafeKit farm 클러스터의 RTO 벤치마크는 무엇입니까?, 비교표: RTO vs RPO, 실무에 적용된 고가용성: 데이터 손실 제로 및 다운타임 거의 없는 실시간 데모, 자주 묻는 질문: 비즈니스 연속성을 위한 RPO 및 RTO 최적화, 🔍 SafeKit 살펴보기"
translation: "translate_md 2026-11-20.9 | glossaire 2026-11-20.24 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2026/08/rto-rpo-5-1024-en-2.jpg"
---

# RPO와 RTO란 무엇인가? 정의, 예시 및 HA 전략 {#what-are-rpo-and-rto-definitions-examples-and-ha-strategies}

## 간략 요약: RPO vs. RTO {#article-summary}

  * **RPO (복구 지점 목표):** **데이터 손실**을 측정합니다. 운영을 재개하기 위해 복구해야 하는 파일의 최대 보존 기간을 정의합니다.
  * **RTO (복구 시간 목표):** **다운타임**을 측정합니다. 비즈니스 프로세스를 복원해야 하는 기간입니다.
  * **주요 차이점:** RPO는 **스토리지 및 백업에** 관한 것이고, RTO는 **복구 및 장애 조치 속도에** 관한 것입니다.
  * **SafeKit:** 동기 복제 및 자동 장애 조치를 통해 **RPO 0** (데이터 손실 없음)과 **낮은 RTO** (빠른 재시작)를 제공합니다.


![RPO (복구 지점 목표)와 RTO (복구 시간 목표)를 비교하는 차트로, SafeKit은 어떻게 데이터 손실 제로와 빠른 애플리케이션 재시작을 달성하는지 보여줍니다.](/wp-content/uploads/2026/08/rto-rpo-5-1024-en-2.jpg "w:512")

**RPO vs. RTO: SafeKit의 데이터 손실 및 복구 시간 비교**

## 목차 {#table-of-contents}

  * [고가용성 및 비즈니스 연속성 솔루션의 RPO와 RTO는 어떻게 계산하나요?](#calculate-rpo-rto-high-availability)
  * [백업 및 재해 복구 솔루션의 RPO와 RTO는 어떻게 결정하나요?](#calculate-rpo-rto-backup-solution)
  * [SafeKit mirror 클러스터는 어떻게 제로 RPO와 낮은 RTO를 달성하나요?](#rpo-rto-safekit-mirror-cluster)
  * [로드 밸런싱이 적용된 SafeKit <span class="notranslate farm-term" translate="no">farm</span> 클러스터의 RTO 벤치마크는 무엇입니까?](#rpo-rto-safekit-farm-cluster)
  * [비교표: RTO vs RPO](#rpo-vs-rto-comparison)
  * [실무에 적용된 고가용성: 데이터 손실 제로 및 다운타임 거의 없는 실시간 데모](#safekit-rpo-rto-video-demos)
  * [자주 묻는 질문: 비즈니스 연속성을 위한 RPO 및 RTO 최적화](#faq-rpo-rto)
  * [SafeKit 고가용성 내비게이션 허브](#hub)



{{%  insert-safekit-4-buttons-ko  %}}
 

## 고가용성 및 비즈니스 연속성 솔루션의 RPO와 RTO는 어떻게 계산하나요? {#calculate-rpo-rto-high-availability}

### 고가용성이란 무엇인가요? {#what-is-high-availability}

**고가용성(HA)**은 시스템이 지정된 시간(예: 99.99%) 동안 작동하고 액세스할 수 있도록 설계된 기술 아키텍처입니다.


![동기 복제 및 장애 조치를 나타내는 SafeKit 고가용성 소프트웨어 로고](/wp-content/uploads/2026/01/safekit-icon-512x512-1.png "w:128")


**비즈니스 연속성 계획**에 정의된 RPO 및 RTO 목표를 달성하기 위해 고가용성은 일반적으로 두 가지 주요 아키텍처를 통해 구현됩니다:

  * **SAN을 통한 공유 디스크 시스템:** 2개의 노드가 중앙 스토리지 영역 네트워크(SAN)에 연결된 기존 클러스터입니다. 한 노드에 장애가 발생하면 다른 노드가 공유 데이터에 대한 액세스를 인계받습니다.
  * **공유 스토리지 없는 동기 복제:** SafeKit으로 구현된 최신 비공유(shared-nothing) 아키텍처. 데이터는 2개의 독립적인 노드의 로컬 디스크 간에 실시간으로 복제됩니다. SAN이 필요하지 않습니다.


### 고가용성 솔루션의 RPO는 무엇인가요? {#what-is-rpo-high-availability}

**RPO (복구 지점 목표)**는 시간 단위로 측정되는 최대 허용 데이터 손실량을 정의합니다. 진정한 **고가용성 솔루션**의 경우 목표 RPO는 **0**입니다.

자동 장애 조치가 있는 고가용성 클러스터를 구현할 때 **RPO가 0이면** 데이터 손실 없이 애플리케이션이 다시 시작됩니다.

  * **SAN을 통한 공유 디스크 시스템:** 두 노드 모두 **정확히 동일한 물리적 데이터 블록에** 액세스하므로 노드 간에 "델타" 또는 지연이 없어 장애 조치 중 전체 데이터 일관성이 보장됩니다.
  * **소프트웨어 기반 동기 복제:** 모든 "쓰기" 작업은 네트워크를 통해 실시간으로 미러링됩니다. 애플리케이션은 데이터가 두 노드에 모두 안전하게 저장된 후에만 **쓰기 확인**을 받습니다. 이 동기 "이중 쓰기" 프로세스는 기본 서버 장애가 발생하더라도 **데이터 손실이 없도록** 보장합니다.


### 고가용성 솔루션의 RTO는 무엇인가요? {#what-is-rto-high-availability}

**RTO (복구 시간 목표)**는 서비스 중단 후 허용 가능한 최대 다운타임 기간을 나타냅니다. **고가용성** 환경에서 RTO는 중요한 애플리케이션에 대한 지속적인 액세스를 보장하기 위해 최소화되어야 합니다.

낮은 RTO를 달성하기 위해 고가용성 솔루션은 **자동 장애 조치**를 활용하여 하드웨어 또는 소프트웨어 장애를 감지하고 애플리케이션을 즉시 다시 시작합니다. 일반적인 고가용성 클러스터에서 **RTO는 약 1분이며**, 다음과 같이 계산됩니다:

  * **장애 감지 시간:** 시스템이 노드 또는 애플리케이션의 하트비트 손실을 식별하는 데 필요한 간격입니다.
  * **자동 재시작 시간:** 장애 복구 노드에서 애플리케이션 서비스를 초기화하는 데 필요한 시간입니다.


## 백업 및 재해 복구 솔루션의 RPO와 RTO는 어떻게 결정하나요? {#calculate-rpo-rto-backup-solution}

### 백업 솔루션이란 무엇인가요? {#what-is-backup}

**백업 솔루션**은 데이터를 주기적으로 복사하여 보조 스토리지 장치 또는 클라우드에 저장하도록 설계된 데이터 보호 전략입니다. 고가용성과 달리 백업은 **장기적인 데이터 보존**과 데이터 손상 또는 사이트 전체의 재해로부터의 복구에 중점을 둡니다.


![장기 데이터 보존을 위한 백업 아키텍처 나타내는 백업 솔루션 아이콘](/wp-content/uploads/2026/01/backup-icon.png "w:128")


**재해 복구 계획**에 정의된 RPO 및 RTO 목표를 충족하기 위해 백업은 일반적으로 두 가지 주요 방법을 통해 구현됩니다:

  * **예약된 스냅샷:** 고정된 간격(예: 매일)으로 데이터의 시점 복사본을 가져오는 프로세스입니다. 마지막 스냅샷과 장애 발생 사이에 수정된 모든 데이터가 손실되므로 **RPO**가 정의됩니다.
  * **오프사이트 또는 클라우드 복구:** 데이터가 별도의 물리적 위치에 저장되는 아키텍처입니다. 이 방식은 데이터 생존을 보장하지만, 애플리케이션을 다시 시작하기 전에 데이터를 전송하고 복원해야 하므로 **RTO가 더 높아** 집니다.


### 백업 솔루션의 RPO란 무엇인가요? {#what-is-rpo-backup}

백업 환경에서 **RPO (복구 지점 목표)**는 정상적인 운영을 재개하기 위해 스토리지에서 복구해야 하는 파일의 보존 기간을 정의합니다. 고가용성과 달리 **백업 솔루션** 에는 일반적으로 RPO가 0이 아닌 값이 포함되며, 이는 마지막 백업이 성공적으로 완료된 이후 경과된 시간을 나타냅니다. 

백업 전략에서 데이터 손실량은 **백업 빈도**에 따라 결정됩니다. 아키텍처에 따라 이 RPO는 몇 분에서 24시간까지 다양할 수 있습니다: 

  * **증분 스냅샷:** 설정된 간격으로 변경된 데이터 블록만 저장하는 방법입니다. 4시간마다 백업을 수행하는 경우 **최대 RPO는 4시간이며**, 이는 마지막 스냅샷과 시스템 충돌 사이에 생성된 모든 데이터가 영구적으로 손실됨을 의미합니다. 
  * **매일 전체 백업:** 하루에 한 번(일반적으로 밤에) 데이터의 전체 사본을 만드는 기존 방식입니다. 이 방식은 **24시간 RPO**를 초래하며, 이는 중요하지 않은 데이터에는 허용될 수 있지만 트랜잭션 데이터베이스에는 종종 불충분합니다. 


### 백업 솔루션의 RTO는 무엇인가요? {#what-is-rto-backup}

백업 전략에서 **RTO (복구 시간 목표)**는 백업 매체에서 데이터를 복원하고 애플리케이션을 운영 상태로 되돌리는 데 걸리는 시간입니다. 고가용성과 달리 **백업의 RTO**는 수동 또는 스크립트 기반 복원 프로세스가 포함되므로 훨씬 더 깁니다. 

백업 솔루션의 경우 RTO는 데이터 양과 복구 아키텍처에 따라 **몇 시간에서 며칠까지** 걸릴 수 있습니다. 총 다운타임은 다음과 같이 계산됩니다: 

  * **데이터 전송 시간:** 백업 스토리지(로컬 디스크, 테이프 또는 클라우드)에서 프로덕션 서버로 데이터를 이동하는 데 필요한 시간입니다. 
  * **시스템 재구성 시간:** 사용자가 다시 로그인하기 전에 데이터를 애플리케이션으로 가져오고, 인덱스를 다시 빌드하고, 데이터 무결성을 확인하는 데 필요한 시간 간격입니다. 


## SafeKit mirror 클러스터는 어떻게 제로 RPO와 낮은 RTO를 달성하나요? {#rpo-rto-safekit-mirror-cluster}

### SafeKit mirror 클러스터란 무엇인가요? {#what-is-safekit-mirror-cluster}

**SafeKit mirror 클러스터**는 비공유(shared-nothing) 아키텍처를 구현하는 소프트웨어 기반 고가용성 솔루션입니다. 고가의 SAN이 필요로 하는 기존 클러스터와 달리 SafeKit은 두 개의 표준 서버의 로컬 리소스를 사용하여 탄력성이 뛰어난 환경을 만듭니다.


![주 노드와 보조 노드 간의 실시간 바이트 수준 파일 복제를 보여주는 SafeKit mirror 클러스터 아키텍처](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


**비즈니스 연속성 계획** 내에서 최대 가동 시간과 데이터 보호를 보장하기 위해 SafeKit mirror 클러스터는 두 가지 통합 메커니즘을 통해 작동합니다:

  * **실시간 동기 복제:** SafeKit은 주 노드와 보조 노드의 로컬 디스크 간 네트워크를 통해 데이터를 미러링합니다. 이를 통해 트랜잭션이 완료되기 전에 모든 데이터 바이트가 두 서버 모두에 안전하게 저장되므로 RPO 0이 보장됩니다.
  * **자동 IP 및 애플리케이션 장애 조치:** 주 노드에 장애가 발생하면 SafeKit은 하트비트 손실을 자동으로 감지하고 보조 노드에서 애플리케이션과 가상 IP 주소를 다시 설정합니다. 이로 인해 약 1분 정도의 RTO가 달성되어 원활한 서비스 연속성이 제공됩니다.


### SafeKit mirror 클러스터의 RPO는 무엇입니까? {#rpo-safekit-example}

**SafeKit mirror 클러스터의 RPO는 0입니다.** 노드 간 데이터 복제가 [동기식으로 실시간으로](</ko/best-practises/synchronous-replication-vs-asynchronous-replication/> "동기식 복제 대 비동기식 복제") 이루어지기 때문입니다.

이러한 데이터 손실 제로 보장은 **쓰기 확인** 프로세스를 통해 달성됩니다. 디스크에 대한 쓰기는 기본 노드와 보조 노드 모두의 로컬 디스크에 성공적으로 기록된 후에만 애플리케이션에 확인됩니다.

반면, **비동기 복제** 에서는 RPO가 0보다 큽니다. 기본 쓰기와 보조 업데이트 사이에 지연이 발생하므로, 장애가 발생하면 보조 서버로 장애 조치하는 동안 데이터 손실이 발생합니다. 미션 크리티컬 **비즈니스 연속성**을 위해서는 동기 복제가 애플리케이션을 100% 데이터 무결성으로 다시 시작할 수 있도록 보장하는 유일한 방법입니다.

### SafeKit mirror 클러스터의 RTO는 얼마입니까? {#what-is-rto-safekit}

표준 구성에서 **SafeKit mirror 클러스터의 RTO는 약 1분입니다**. SafeKit은 **애플리케이션 수준** 또는 **VM 수준**에서 고가용성을 구현할 수 있는 유연성을 제공합니다. 각 옵션은 복구 시간에 다른 영향을 미칩니다: 

  * **애플리케이션 수준 HA:** SafeKit에서 사용하는 최적화된 접근 방식입니다. 이 소프트웨어는 특정 애플리케이션 서비스를 모니터링합니다. 
    * **하드웨어 장애:** RTO = *하트비트 시간 초과* (기본값 30초) + *애플리케이션 재시작 시간*.
    * **소프트웨어 장애:** RTO = *애플리케이션 중단 시간* + *애플리케이션 재시작 시간*.
    * **주요 이점:** 운영 체제가 이미 보조 노드에서 실행 중이므로 OS 부팅 지연이 없어 **비즈니스 연속성**을 위해 가능한 가장 빠른 복구가 가능합니다.
  * **VM 수준 HA:** 이 시나리오에서 SafeKit은 전체 가상 머신을 보호합니다. 
    * **장애 복구:** RTO = *장애 감지* 시간 + *OS 재부팅 시간* + *애플리케이션 재시작 시간*.
    * **기술적 절충:** RTO는 자연스럽게 더 길어집니다(몇 분). 애플리케이션이 초기화되기 시작하기 전에 보조 노드가 운영 체제를 완전히 콜드 부팅해야 하기 때문입니다.


SafeKit은 **애플리케이션 수준의 고가용성**을 활용하여 표준 가상화에 내재된 "재부팅 페널티"를 제거하고, **비즈니스 연속성 계획이** 가능한 최저의 다운타임을 달성하도록 보장합니다. 

## 로드 밸런싱이 적용된 SafeKit <span class="notranslate farm-term" translate="no">farm</span> 클러스터의 RTO 벤치마크는 무엇입니까? {#rpo-rto-safekit-farm-cluster}

### SafeKit <span class="notranslate farm-term" translate="no">farm</span> 클러스터란 무엇인가요? {#what-is-safekit-farm-cluster}

**SafeKit <span class="notranslate farm-term" translate="no">farm</span> 클러스터**는 **확장성과** **이중화**를 모두 요구하는 상태 비저장 애플리케이션(웹 서버 등)을 위해 설계된 소프트웨어 기반의 고가용성 솔루션입니다. 데이터 복제에 중점을 두는 mirror 클러스터와 달리 <span class="notranslate farm-term" translate="no">farm</span> 클러스터는 여러 활성 노드에 걸쳐 들어오는 트래픽을 분산합니다.


![상태 비저장 애플리케이션을 위한 네트워크 부하 분산 및 장애 조치를 보여주는 SafeKit farm 클러스터 아키텍처](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


트래픽이 많은 환경에서 **비즈니스 연속성**을 유지하기 위해 SafeKit <span class="notranslate farm-term" translate="no">farm</span> 클러스터는 두 가지 핵심 메커니즘을 통해 작동합니다:

  * **네트워크 부하 분산:** SafeKit은 가상 IP 주소를 사용하여 여러 활성 서버 <span class="notranslate farm-term" translate="no">farm</span>에 걸쳐 들어오는 네트워크 트래픽을 분산합니다. 이를 통해 단일 서버가 과부하되지 않도록 하고 애플리케이션 성능을 극대화합니다.
  * **자동 장애 감지 및 재구성:** <span class="notranslate farm-term" translate="no">farm</span>의 한 노드에 장애가 발생하면 SafeKit은 하트비트를 통해 장애를 감지하고 즉시 나머지 정상 노드에 트래픽을 재분배합니다. 다른 노드는 이미 활성화되어 부하를 흡수할 준비가 되어 있으므로 전체 서비스에 대해 거의 0에 가까운 RTO를 제공합니다.


### SafeKit <span class="notranslate farm-term" translate="no">farm</span> 클러스터의 RPO는 무엇입니까? {#what-is-rpo-safekit-farm}

**SafeKit <span class="notranslate farm-term" translate="no">farm</span> 클러스터**의 **RPO (복구 지점 목표)**는 일반적으로 **해당 없음(N/A)으로** 간주됩니다. 이는 <span class="notranslate farm-term" translate="no">farm</span> 클러스터 노드에 데이터가 로컬로 저장되지 않는 **상태 비저장 애플리케이션**을 위해 특별히 설계되었기 때문입니다. 

<span class="notranslate farm-term" translate="no">Farm</span> 클러스터는 데이터 동기화보다는 **네트워크 부하 분산**에 중점적으로 다루기 때문에 클러스터 내 노드 간에 데이터 복제가 없습니다. <span class="notranslate farm-term" translate="no">farm</span> 아키텍처와 관련된 일반적인 **비즈니스 연속성 계획**은 다음과 같습니다: 

  * **상태 비저장 작업:** <span class="notranslate farm-term" translate="no">farm</span>의 모든 노드는 동일하며 영구 데이터를 보유하지 않습니다. 따라서 노드 장애 시 측정할 "데이터 손실"이 없습니다. 
  * **외부 데이터 저장소:** 애플리케이션에 데이터 영속성이 필요한 경우, 일반적으로 백엔드의 별도 **SafeKit mirror 클러스터**에서 처리됩니다. 이 경우 RPO는 0입니다. 


### SafeKit <span class="notranslate farm-term" translate="no">farm</span> 클러스터의 RTO는 무엇입니까? {#rto-example-safekit-farm-cluster}

<span class="notranslate farm-term" translate="no">farm</span> 아키텍처에서는 모든 노드가 일반적으로 동시에 활성화되므로 **RTO는 단 몇 초로 단축됩니다**. 복구 시간은 클러스터가 트래픽 분산을 재구성하는 속도에 따라 결정됩니다:

  * **하드웨어 장애:** RTO는 모니터링 채널 전반의 *장애 감지 시간 초과* 와 동일합니다(기본값은 몇 초). 하트비트 손실이 감지되면 **가상 IP 로드 밸런싱 필터가** 자동으로 재구성되어 트래픽을 나머지 정상 노드로 리디렉션합니다.
  * **소프트웨어 장애 또는 계획된 재시작:** RTO는 *애플리케이션 중지 시간* 과 해당 특정 노드에서 *애플리케이션을 다시 시작하는 시간을* 더한 값으로 계산되며, 이 시간 동안 <span class="notranslate farm-term" translate="no">farm</span>의 다른 노드는 계속해서 모든 수신 트래픽을 처리합니다.


이 "액티브-액티브" 메커니즘은 상태 비저장 서비스의 경우 새로운 대기 노드에서 서비스를 초기화할 필요가 없으므로 최종 사용자에게 **비즈니스 연속성** 영향이 거의 감지되지 않도록 합니다.

## 비교표: RTO vs RPO {#rpo-vs-rto-comparison}

**의미론적 정의: RTO vs. RPO**

지표 | 두문자어 | 정의 | 중점 분야  
---|---|---|---  
복구 시간 목표 | RTO | 장애 발생 후 비즈니스 프로세스를 복구하는 데 걸리는 목표 시간입니다. | 가용성/다운타임  
복구 지점 목표 | RPO | 운영을 재개하기 위해 백업에서 복구해야 하는 파일의 최대 연령입니다. | 데이터 손실/무결성  
  
**고가용성(HA) vs. 표준 백업**

특징 | 백업 솔루션 | 고가용성(SafeKit)  
---|---|---  
복구 자동화 | 수동 개입 | 자동 장애 조치  
목표 RTO | 몇 시간에서 며칠 | 몇 초 ~ 1분  
목표 RPO | > 0 (마지막 백업 지점) | 0 (동기 복제)  
  
**SafeKit 클러스터의 RTO 및 RPO 벤치마크**

아키텍처 | 사용 사례 | RTO (가용성) | RPO (데이터 손실)  
---|---|---|---  
Mirror 클러스터 | 실시간 복제 | 약 1분 (하트비트 + 재시작) | 0 (데이터 손실 없음)  
<span class="notranslate farm-term" translate="no">Farm</span> 클러스터 | 네트워크 부하 분산 | 몇 초 | 해당 없음(상태 비저장)  
  
## 실무에 적용된 고가용성: 데이터 손실 제로 및 다운타임 거의 없는 실시간 데모 {#safekit-rpo-rto-video-demos}

### 동영상: SafeKit mirror 클러스터에서 RPO 0 및 낮은 RTO를 달성 (8:47) {#demo-mirror-cluster-rpo-rto}

SafeKit은 치명적인 장애를 어떻게 처리하는지 확인해 보세요. 이 비디오는 SQL 데이터베이스에서 데이터 손실이 없도록 보장하는 **동기 복제** (RPO 0)와 보조 노드에서 서비스의 **자동 재시작** (낮은 RTO)을 보여줍니다.


#### 챕터 {#chapters}

  1. 🎬 [SQL Server가 있는 2개의 노드](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. 🎬 [클러스터 및 mirror.safe 모듈 구성](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. 🎬 [SQL 복제, 마이그레이션, 충돌 시 장애 조치 시작 및 테스트](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)

[여기서 무료 체험](</ko/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/>)

### 동영상: SafeKit <span class="notranslate farm-term" translate="no">farm</span> 클러스터에서 거의 제로에 가까운 RTO를 달성 (5:03) {#demo-farm-cluster-rpo-rto}

SafeKit이 Apache를 실행하는 웹 <span class="notranslate farm-term" translate="no">farm</span>을 관리하여 성능 확장과 즉각적인 장애 조치를 모두 제공하는 방법을 확인해 보세요.

#### 챕터 {#chapters-1}

  1. 🎬 [Apache가 설치된 노드 2개](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=0s>) (0:13)
  2. 🎬 [클러스터 및 farm.safe 모듈 구성](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=13s>) (2:20)
  3. 🎬 [네트워크 부하 분산 시작 및 테스트, 충돌 시 장애 조치](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=153s>) (2:30)

[여기서 무료 체험](</ko/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/>)

## 자주 묻는 질문: 비즈니스 연속성을 위한 RPO 및 RTO 최적화 {#faq-rpo-rto}

### RPO와 RTO가 0이 될 수 있나요? {#can-rpo-rto-be-zero}

**네.** **RPO 0을** 달성한다는 것은 데이터 손실이 없다는 것을 의미하며, 이는 동기식 데이터 미러링을 통해 가능합니다. **거의 0에 가까운 RTO**는 SafeKit과 같은 자동 장애 조치 소프트웨어를 통해 달성할 수 있으며, 이 소프트웨어는 장애를 감지하고 몇 초 또는 몇 분 내에 보조 노드에서 애플리케이션을 다시 시작합니다.

### RPO와 RTO 중 어느 것이 더 중요한가요? {#importance-rpo-vs-rto}

둘 중 어느 것도 본질적으로 더 중요하지는 않으며, 서로 다른 역할을 수행합니다. **RPO (복구 지점 목표)**는 데이터 손실, 즉 얼마나 많은 데이터를 손실해도 괜찮은지에 초점을 맞춥니다. **RTO (복구 시간 목표)**는 다운타임, 즉 얼마나 빨리 온라인 상태로 돌아와야 하는지에 초점을 맞춥니다. 미션 크리티컬 애플리케이션의 경우, 두 가지 모두 최소화해야 합니다.

### SafeKit을 사용한 애플리케이션 수준 HA와 VM 수준 HA에서 RPO와 RTO는 어떻게 다른가요? {#safekit-application-vs-vm-level}

두 방식 모두 동기 복제를 통해 **RPO 0**을 보장하지만, 복구 시간은 다릅니다:

  * **애플리케이션 수준:** 이미 실행 중인 OS에서 애플리케이션 서비스만 다시 시작하므로 RTO가 더 빠릅니다(약 1분). 또한 특정 소프트웨어/프로세스 충돌을 감지합니다.
  * **VM 수준:** 전체 가상 머신이 보조 호스트에서 재부팅되어야 하므로 RTO가 더 높습니다. 애플리케이션에 구애받지 않지만, 애플리케이션 프로세스 자체에 대한 세분화된 모니터링 기능이 부족합니다.


### RTO 측면에서 HA 솔루션과 백업 솔루션의 차이점은 무엇인가요? {#ha-vs-backup-rto}

고가용성(HA)은 로컬 장애를 자동으로 처리하므로 일반적으로 RTO (초에서 분)가 훨씬 낮습니다. 백업 솔루션을 사용한 재해 복구(DR)는 대규모 재해 발생 후 지리적으로 떨어진 사이트에서 데이터와 서비스를 복구해야 하므로 일반적으로 RTO (시간에서 일)가 더 높습니다.

### 원격 사이트 간에 최상의 RPO 및 RTO를 달성하려면 어떻게 해야 하나요? {#rpo-rto-between-remote-sites}

원격 사이트 전반에 걸쳐 **RPO 0** 및 **거의 0에 가까운 RTO**를 달성하려면 **동기 복제**와 **확장 LAN (확장 VLAN)**의 조합이 필요합니다:

  * **확장 LAN/확장 VLAN:** 동일한 서브넷(레이어 2)을 두 데이터 센터에 걸쳐 확장하면 IP 주소를 변경하지 않고도 애플리케이션을 사이트 A에서 사이트 B로 이동할 수 있으므로 복잡한 DNS 업데이트를 피할 수 있습니다.
  * **SafeKit 솔루션:** SafeKit은 사이트 간에 이동하는 **소프트웨어 정의 가상 IP (VIP)**를 제공하여 이를 활용합니다. 이 솔루션은 Gratuitous ARP (GARP)를 사용하여 트래픽을 보조 사이트로 즉시 리디렉션합니다.


이를 통해 **RPO = 0** (실시간 미러링)과 **최소 RTO** (약 1분 이내 장애 조치)를 사람의 개입 없이 제공합니다.

### RPO와 RTO를 최적화하기 위해 고가용성과 백업을 결합하는 것이 필수적인 이유는 무엇입니까? {#combining-ha-and-backup-for-rpo-rto}

고가용성(HA)과 백업 솔루션을 결합하는 것이 두 가지 장점을 모두 제공하는 복구 전략을 달성하는 유일한 방법입니다. 이 두 가지는 종종 함께 논의되지만, RPO/RTO 방정식의 서로 다른 부분을 해결합니다:

  * **고가용성(SafeKit 사용):** 하드웨어 또는 소프트웨어 장애 발생 시 거의 0에 가까운 RTO와 0의 RPO를 제공합니다. 실시간 동기 복제를 사용하여 보조 서버는 항상 최신 상태를 유지합니다. 주 서버에 장애가 발생하면 데이터 손실 없이 보조 서버에서 서비스가 즉시 다시 시작됩니다.
  * **백업 솔루션:** 백업은 데이터 무결성 문제(랜섬웨어 또는 실수로 인한 삭제 등)로부터 데이터를 보호합니다. HA는 변경 사항을 즉시 복제하므로 바이러스나 삭제된 데이터베이스 레코드를 대기 서버에 "충실하게" 복제합니다. 백업을 사용하면 손상이 발생하기 전 시점으로 "시간을 되돌릴" 수 있습니다.
  * **하이브리드 접근 방식:** 최대의 복원력을 위해 조직은 **3노드 하이브리드 아키텍처**를 사용합니다. 여기에는 즉각적인 HA를 위한 동기식 복제 기능이 있는 2노드 로컬 클러스터와 재해 복구를 위한 세 번째 원격 복사본(비동기식)이 포함됩니다. 이러한 계층형 방어는 즉각적인 복구를 위한 "라이브" 복사본과 데이터 안전을 위한 "히스토리" 복사본을 모두 확보할 수 있도록 보장합니다.



{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}