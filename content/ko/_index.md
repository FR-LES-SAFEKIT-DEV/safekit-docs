---
title: "SafeKit: 올인원 SANless 고가용성(HA) 및 애플리케이션 클러스터링 소프트웨어"
slug: "high-availability-software-for-application-clustering"
canonical: "https://safekit.eviden.com/ko/"
description: "SafeKit: 올인원 SANless 고가용성(HA) 및 애플리케이션 클러스터링 소프트웨어"
category: "home"
lang: "ko"
topics: "SafeKit이란 무엇인가요?, 🔍 SafeKit 고가용성 탐색 허브, 단순하고 비용 효율적인 고가용성을 위해 SafeKit을 선택해야 하는 이유는 무엇입니까?, SafeKit 활용 사례, 올인원 SANless 고가용성(HA) 제품이 필수적인 이유는 무엇인가요?, 고가용성 전략 선택: VM HA vs. 애플리케이션 HA, SafeKit 고가용성(HA) 제한 사항, SafeKit 기술 장애 조치(Failover) 튜토리얼 및 데모, SafeKit 미러 클러스터(mirror cluster)는 Windows/Linux과 어떻게 작동하나요?, 팜(farm) 모드의 SafeKit 클러스터가 Windows/Linux와 함께 작동하는 방식은 무엇인가요?, SafeKit과 기존 고가용성(HA) 클러스터 비교, 아키텍처 차별점: SafeKit 소프트웨어 정의 vs. 하드웨어 HA 클러스터, SafeKit 미러 클러스터의 주요 차별점, SafeKit Farm 클러스터의 주요 차별점, VM 고가용성: SafeKit의 SAN-Less vs. Hyper-V/VMware HA, SafeKit HA 무료 체험판 및 기술 문서, SafeKit 애플리케이션 모듈 라이브러리: 즉시 사용 가능한 HA 솔루션"
---

# SafeKit: 올인원 SANless 고가용성(HA) 및 애플리케이션 클러스터링 소프트웨어

## SafeKit이란 무엇인가요?

**SafeKit** 은 실시간 **호스트 기반 복제** , 자동 **장애 조치(failover)** 및 **부하 분산(load balancing)** 을 단일 패키지로 결합하여 애플리케이션의 100% 가동 시간을 보장하는 **올인원 고가용성(HA) 소프트웨어** 솔루션입니다.

표준 서버 간의 데이터를 동기화함으로써 **SafeKit** 은 고가의 공유 스토리지(SAN)나 전문적인 IT 기술 없이도 **엔터프라이즈 데이터베이스**(SQL Server 등), **핵심 보안 시스템**(Milestone XProtect 비디오 관리 소프트웨어 등), **SCADA 산업용 제어 소프트웨어**(Siemens 애플리케이션 등)를 Windows 및 Linux 환경 모두에서 보호할 수 있는 간단하고 비용 효율적인 방법을 제공합니다.


<img src="/wp-content/uploads/2026/04/safekit-icon-512x512-1.png" width="128" alt="Evidian SafeKit 공식 로고 - 고가용성(HA) 및 SAN리스(SANless) 애플리케이션 클러스터링 소프트웨어 아이콘">



<!-- BEGIN INSERT: insert-safekit-4-buttons-en lang="ko" display="content" -->
<div class="button-row">
  <a class="btn-action" href="https://safekit.eviden.com/contact-us-for-safekit/">🧑 문의하기</a>
  <a class="btn-action" href="/resources/safekit-free-trial/">🎁 SafeKit 무료 체험판</a>
  <a class="btn-action" href="https://training.my.evidian.com/mod/page/view.php?id=712">🏅 무료 인증</a>
  <a class="btn-action" href="https://safekit.eviden.com/get-a-quote-safekit/">💰 영구 라이선스 비용</a>
</div>
<!-- END INSERT: insert-safekit-4-buttons-en lang="ko" display="content" -->
 


<!-- BEGIN INSERT: insert-safekit-hub-kr lang="ko" display="content" -->
 

## 🔍 SafeKit 고가용성 탐색 허브 {#hub}

**SafeKit 탐색: 주요 기능, 기술 영상, 문서 및 무료 체험판**

리소스 유형 | 설명 | 바로가기 링크  
---|---|---  
**주요 기능** | 단순하고 비용 효율적인 고가용성을 위해 SafeKit을 선택해야 하는 이유는 무엇입니까? | [SafeKit 고가용성 선택 이유 보기](</ko/#why-choose-safekit-for-ha> "단순하고 비용 효율적인 고가용성을 위한 SafeKit 기능 알아보기")  
**사용 사례** | SafeKit이 핵심 인프라의 고가용성을 보장하는 방법을 알아보세요 | [모든 사용 사례 보기 (OEM 소프트웨어, 엣지 서버, SCADA 등)](</ko/#safekit-use-cases> "SafeKit 고가용성 사용 사례 살펴보기")  
**배포 모델** | 올인원 SANless HA: 공유 디스크가 없는 소프트웨어 클러스터링 | [SafeKit 올인원 SANless HA 보기](</ko/#all-in-one-sanless-ha> "공유 디스크 없는 소프트웨어 클러스터링을 통한 올인원 SANless 고가용성 알아보기")  
**HA 전략** | SafeKit: 인프라(VM) vs. 애플리케이션 레벨 고가용성 | [SafeKit HA 및 이중화: VM vs. 애플리케이션 레벨 보기](</ko/#safekit-ha-redundancy-choices> "VM 레벨 이중화와 SafeKit 애플리케이션 레벨 고가용성 전략 비교")  
**기술 사양** | SafeKit 클러스터링의 기술적 제한 사항 | [SafeKit 고가용성 제한 사항 보기](</ko/#safekit-ha-limitations> "SafeKit 애플리케이션 클러스터링을 위한 기술적 요구 사항 및 제한 사항")  
**개념 증명(PoC)** | SafeKit: 고가용성 구성 및 장애 조치(Failover) 데모 | [SafeKit 장애 조치 튜토리얼 보기](</ko/#safekit-failover-tutorials> "설치부터 자동 장애 조치까지 SafeKit 고가용성에 대한 단계별 영상")  
**아키텍처** | SafeKit 미러 클러스터 작동 방식 (실시간 복제 및 장애 조치) | [SafeKit 미러 클러스터: 실시간 복제 및 장애 조치 보기](</ko/#safekit-mirror-cluster> "SafeKit 미러 클러스터의 기술 아키텍처 및 장애 조치 메커니즘 확인")  
**아키텍처** | SafeKit 팜(Farm) 클러스터 작동 방식 (네트워크 부하 분산 및 장애 조치) | [SafeKit 팜 클러스터: 네트워크 부하 분산 및 장애 조치 보기](</ko/#safekit-farm-cluster> "네트워크 부하 분산 기능을 갖춘 SafeKit 팜 클러스터 아키텍처 기술 개요")  
**경쟁 우위** | 비교: SafeKit vs. 기존 고가용성(HA) 클러스터 | [SafeKit vs. 기존 HA 클러스터 비교 보기](</ko/#safekit-ha-comparison> "SafeKit 소프트웨어와 기존 하드웨어 기반 HA 클러스터의 상세 비교")  
**기술 리소스** | SafeKit 고가용성: 문서, 다운로드 및 체험판 | [SafeKit HA 무료 체험판 및 기술 문서 보기](</ko/#safekit-ha-technical-resources> "SafeKit 무료 체험판, 기술 문서 및 고가용성 백서 액세스")  
**사전 구성 솔루션** | SafeKit 애플리케이션 모듈 라이브러리: 즉시 사용 가능한 HA 솔루션 | [SafeKit 고가용성 애플리케이션 모듈 보기](</ko/#safekit-ha-application-modules> "자동 애플리케이션 장애 조치를 위해 사전 구성된 SafeKit 모듈 라이브러리 찾아보기")  
  

<!-- END INSERT: insert-safekit-hub-kr lang="ko" display="content" -->
 


<!-- BEGIN INSERT: insert-safekit-feature-en lang="ko" display="content" -->
 

## 단순하고 비용 효율적인 고가용성을 위해 SafeKit을 선택해야 하는 이유는 무엇입니까? {#why-choose-safekit-for-ha}

### SafeKit의 주요 기능은 무엇인가요?

SafeKit은 단일 소프트웨어 제품으로 Windows 및 Linux 환경에서 다음 기능을 제공합니다:

  * **부하 분산 (Load balancing)**
  * **실시간 동기식 파일 복제**
  * **자동 애플리케이션 장애 조치 (Failover)**
  * **서버 장애 후 자동 복구 (Failback)**


### SafeKit을 설치하는 데 특별한 기술이 필요한가요?

아니요. SafeKit은 배포가 매우 간편하며 고급 전문 지식이 필요하지 않습니다.

### SafeKit은 추가 하드웨어가 필요한가요?

아니요. SafeKit은 기존 서버, 가상 머신 또는 클라우드에서 실행되며 공유 디스크나 SAN 스토리지가 필요하지 않습니다.

### SafeKit을 사용하려면 별도의 소프트웨어 라이선스가 필요한가요?

아니요. SafeKit은 표준 Windows 및 Linux 에디션에서 작동하며 엔터프라이즈급 데이터베이스 라이선스가 필요하지 않습니다.

### SafeKit은 어떤 문제를 해결하나요?

SafeKit은 다음과 같은 문제를 해결합니다:

  * 하드웨어 장애(문제의 20%): 전산실 전체 장애를 포함한 하드웨어 결함
  * 소프트웨어 장애(문제의 40%): 핵심 프로세스 재시작을 포함한 소프트웨어 결함
  * 인적 오류(문제의 40%): 사용 편의성을 통해 운영 실수 최소화


### SafeKit이 지원하는 애플리케이션은 무엇인가요?

다음 항목들에 대해 실시간 복제 및 장애 조치(failover)를 구현할 수 있습니다:

  * 모든 유형의 애플리케이션, 파일 디렉터리 및 서비스
  * 데이터베이스
  * Hyper-V 또는 KVM 가상 머신 전체
  * Docker, Podman 및 클라우드 애플리케이션


### SafeKit은 어떻게 비용을 절감하나요?

SafeKit은 다음과 같은 요구 사항을 제거하여 비용을 줄여줍니다:

  * 네트워크 부하 분산 장치(L4 스위치) 또는 전용 프록시 서버
  * 공유 디스크 또는 복제된 SAN 스토리지
  * 운영 체제(OS) 및 데이터베이스의 엔터프라이즈 에디션
  * 전문화된 클러스터 유지 관리 기술


### SafeKit 고가용성(HA)의 가격 체계와 라이선스 방식은 어떻게 되나요?

**SafeKit** 은 CPU 코어 수나 소켓 수에 관계없이 오직 서버 수에만 기반하는 투명하고 비용 효율적인 **노드당 라이선스 모델** 을 특징으로 합니다. 정기 구독을 강제하는 많은 고가용성 경쟁 제품과 달리, SafeKit은 낮은 총소유비용(TCO)과 장기적인 소프트웨어 자산 확보를 보장하기 위해 **영구 라이선스** 를 제공합니다.

  * **숨겨진 비용 없음:** 모든 [사전 구성된 HA 애플리케이션 모듈](</ko/#safekit-ha-application-modules> "무료 SafeKit HA 애플리케이션 모듈 탐색")은 무료로 제공됩니다.
  * **위험 없는 평가:** 사용자 환경에서 장애 조치와 복제를 테스트하려면 [30일 무료 체험판](</ko/#safekit-ha-technical-resources> "SafeKit 30일 무료 체험판 다운로드")을 다운로드하세요.
  * **맞춤형 견적:** 특정 고가용성 요구 사항에 맞춘 견적이 필요하시면 **[저희에게 문의해 주시기 바랍니다](<https://safekit.eviden.com/get-a-quote-safekit/> "맞춤형 SafeKit 가격 견적 요청")**.



<!-- END INSERT: insert-safekit-feature-en lang="ko" display="content" -->
 


<!-- BEGIN INSERT: insert-safekit-use-cases-en lang="ko" display="content" -->
 

## SafeKit 활용 사례 {#safekit-use-cases}

### SafeKit OEM 버전

애플리케이션에 고가용성을 제공하면 서비스 연속성을 보장하고 다운타임 리스크를 줄이며 고객 신뢰를 높여 비즈니스 가치를 증대시킵니다. 또한 표준 인프라에서도 중단 없이 핵심 업무를 수행할 수 있게 해줍니다.


<img src="/wp-content/uploads/2026/05/safekit-for-oem-512-512.jpg" alt="SafeKit for OEM">


SafeKit을 고가용성 옵션으로 제품 카탈로그에 추가하십시오: 귀사의 애플리케이션에 최적화된 소프트웨어 전용 솔루션으로, 공유 스토리지와 같은 숨겨진 비용이 없으며 하드웨어 기종을 가리지 않습니다. 물리, 가상 또는 클라우드 환경에 배포 가능하며 관리가 간편한 플러그 앤 플레이(Plug-and-Play) 방식을 지원합니다.

### SafeKit 엣지 버전

엣지 현장은 데이터 센터나 고가용성(HA) 전문 지식이 부족한 경우가 많지만, 비즈니스 연속성은 매우 중요합니다. SafeKit은 공장, 석유 플랫폼, 선박, 빌딩 보안, 항공 교통 관제, 5G 네트워크, 의료, 리테일 등 다양한 분야의 엣지 애플리케이션을 중단 없이 가동합니다.


<img src="/wp-content/uploads/2026/05/safekit-edge-512-512.jpg" alt="SafeKit for Edge">


SafeKit은 두 대의 표준 엣지 서버(브랜드 무관)를 플러그 앤 플레이 HA 클러스터로 전환하며, 공유 스토리지나 SAN이 필요하지 않습니다. 하나의 경량 소프트웨어 스택으로 실시간 복제와 자동 페일오버(부하 분산 기능 포함 가능)를 제공하며, 설치와 관리가 매우 간편합니다.

### VMS용 SafeKit

비디오 관리 소프트웨어(VMS)는 공공 안전에 있어 매우 중요합니다. 보안 요원이 사고에 즉각적으로 대응할 수 있도록 라이브 및 아카이브 비디오를 기록하고 표시하기 때문입니다. VMS의 어떠한 중단도 인명과 자산을 직접적인 위험에 노출시킵니다.


<img src="/wp-content/uploads/2026/05/safekit-vms-512-512.jpg" alt="SafeKit for VMS">


SafeKit은 서버나 소프트웨어 장애 중에도 라이브 및 녹화 스트림에 대한 지속적인 액세스를 유지함으로써 비디오 손실과 감시 공백을 방지합니다. **Milestone, Genetec, Hanwha** 등 주요 VMS 플랫폼과 원활하게 통합되어 가장 중요한 순간에 감시 시스템이 계속 작동하도록 지원합니다.

### EACS용 SafeKit

전자 출입 통제 시스템(EACS)은 물리적 보안의 필수 요소로, 문, 배지, 리더기 및 센서를 통해 개인용 및 민감한 구역에 대한 출입을 제어하고 모니터링합니다. 어떠한 시스템 중단도 인명, 건물 및 자산을 침입 위험에 즉각적으로 노출시킬 수 있습니다.


<img src="/wp-content/uploads/2026/05/safekit-eacs-512-512.jpg" alt="SafeKit for EACS">


SafeKit은 단일 장애점을 제거함으로써 출입 통제 결정, 알람 및 자격 증명을 항상 사용 가능한 상태로 유지합니다. **Hirsch Microsesame, Nedap AEOS, Siemens SiPass** 와 같은 EACS 솔루션에 복원력 있는 운영을 제공하여 인프라 장애 발생 중에도 안전한 출입을 보장합니다.

### SCADA용 SafeKit

SCADA(감시 제어 및 데이터 취득) 시스템은 산업 환경의 핵심으로, 운영자가 센서, 밸브, 펌프, 모터 및 HMI(Human-Machine Interface)를 통해 중요한 프로세스를 모니터링하고 제어할 수 있게 해줍니다.


<img src="/wp-content/uploads/2026/05/safekit-scada-512-512.jpg" alt="SafeKit for SCADA">


SafeKit은 **Probat 커피 로스터나 ALSTEF 수하물 분류기** 등에 전력을 공급하는 SCADA 제어 시스템이 하드웨어 또는 소프트웨어 장애에도 불구하고 계속 작동하도록 보장하여 생산 다운타임을 최소화합니다. 이를 통해 운영자는 항상 산업 프로세스에 대한 전체 가시성과 제어력을 유지할 수 있으며, 막대한 비용이 드는 가동 중단과 안전 리스크를 방지할 수 있습니다.

### BMS용 SafeKit

빌딩 관리 시스템(BMS)은 현대식 건물의 핵심으로, 냉난방 공조(HVAC), 배전, 조명, 화재 안전 및 급수 시스템의 자동 제어를 제공합니다. 시스템의 어떠한 중단도 거주자의 안전, 편안함 및 건물 운영에 직접적인 영향을 미칠 수 있습니다.


<img src="/wp-content/uploads/2026/05/safekit-bms-512-512.jpg" alt="SafeKit for BMS">


SafeKit은 장애 발생 시에도 BMS 서비스가 투명하게 계속 실행되도록 함으로써 빌딩 자동화 시스템을 보호합니다. **Siemens Desigo CC, Bosch BIS** 및 관련 시스템을 지원하여 안전하고 효율적이며 중단 없는 건물 운영을 유지합니다.

### ATC용 SafeKit

항공 관제(ATC) 시스템은 항공 안전의 핵심이며, 감시, 유도 및 제어 애플리케이션을 통해 지상과 공중에서의 항공기 이동을 실시간으로 모니터링하고 제어할 수 있게 해줍니다.


<img src="/wp-content/uploads/2026/05/safekit-atc-512-512.jpg" alt="SafeKit for ATC">


SafeKit은 관제사가 중요한 에어사이드(Airside) 애플리케이션에 중단 없이 액세스할 수 있도록 보장함으로써 ATC 시스템의 회복탄력성을 강화합니다. **ADB SafeGate** 와 같은 ATC 및 공항 솔루션과 함께 사용되어 모든 조건에서 안전하고 지속적인 항공 교통 운영을 지원합니다.

### OCC용 SafeKit

운영 관제 센터(OCC)는 현대 메트로 네트워크의 핵심으로, 열차 운행, 전력 공급, 신호, 승객 정보 및 사고 관리에 대한 감독을 중앙 집중화합니다. 자동 무인 메트로 노선에서 OCC는 운영을 위한 유일한 제어 지점입니다.


<img src="/wp-content/uploads/2026/05/safekit-occ-512-512.jpg" alt="SafeKit for OCC">


SafeKit은 장애 발생 시에도 OCC 애플리케이션의 가용성을 보장하여 중단 없는 메트로 감독을 실현합니다. **파리 자동 무인 메트로 노선** 의 운영 관제 센터를 지원하여, 차내 기관사 없이도 지속적인 서비스와 신속한 사고 대응을 가능하게 합니다.


<!-- END INSERT: insert-safekit-use-cases-en lang="ko" display="content" -->
 


<!-- BEGIN INSERT: insert-safekit-sanless-en lang="ko" display="content" -->
 

## 올인원 SANless 고가용성(HA) 제품이 필수적인 이유는 무엇인가요? {#all-in-one-sanless-ha}

비즈니스 연속성 분야에서 많은 조직은 백업이나 데이터 복제 도구가 있다는 것을 **고가용성(HA)**을 갖춘 것과 동일하다고 오해하곤 합니다. 하지만 현실적으로 이러한 도구들은 훨씬 더 큰 퍼즐의 조각일 뿐입니다. 진정으로 100% 가동 시간을 보장하려면 장애 조치(failover) 프로세스의 모든 계층을 통합하는 올인원 솔루션이 필요합니다.

단편적인 접근 방식이 실패하는 이유와, **파일 레벨의 호스트 기반 복제**를 활용하는 **SafeKit**과 같은 통합형 올인원 제품이 왜 필요한지 아래에서 설명합니다.

### 호스트 기반 복제만으로 고가용성(HA)이 충분한가요?

아니요. 데이터 복제는 단순히 서버 A에서 서버 B로 데이터를 복사하는 행위일 뿐입니다. 복제는 매우 중요하지만, 그 자체만으로는 가용성을 제공하지 않습니다. HA 스택의 다른 구성 요소가 없다면 복제는 "수동적인 복사본"에 불과하며, 이를 활용하려면 시간이 많이 걸리는 수동 작업이 필요합니다.

  * 서버 A가 다운되어도 데이터 복제 소프트웨어는 사용자를 서버 B로 자동 연결하지 않습니다.
  * 애플리케이션이 중단되었다는 사실을 감지하지 못합니다.
  * 서비스를 재시작하지 않습니다.


### 파편화된 솔루션의 숨겨진 위험: 분리된 HA가 실패율을 높이는 이유

많은 벤더들이 **호스트 기반 복제** , **장애 조치(failover)** 및 **부하 분산(load balancing)** 을 달성하기 위해 서로 다른 여러 제품을 "짜맞추기"식으로 연결하도록 요구합니다. 이러한 파편화된 아키텍처는 미션 크리티컬 시스템에 매우 위험한 전략입니다.

  * **취약한 통합:** 복제에는 제품 A를, 클러스터링에는 제품 B를 사용하면 "모래성"을 쌓는 것과 같습니다. OS 업데이트나 보안 패치가 발생할 때마다 이 별개의 엔진들 사이의 취약한 통신 링크가 끊어질 위험이 있습니다.
  * **높은 인지 부하 및 인적 오류:** 여러 인터페이스를 관리하면 실수할 위험이 커집니다. 긴박한 시스템 장애 상황에서 문제를 진단하기 위해 서로 다른 GUI를 오가거나 다른 CLI 구문을 사용하면 혼란이 가중되고 가동 중단 시간이 길어집니다.
  * **벤더 간 책임 전가:** 장애 조치가 실패했을 때, 복제 벤더는 클러스터링 도구 탓을 할 수 있으며 사용자는 해결책 없이 중간에 끼어버리게 됩니다. 올인원 솔루션은 단일 책임 창구를 제공합니다.
  * **복잡한 유지 관리:** 파편화된 시스템은 각 구성 요소마다 별도의 전문 기술이 필요하므로 유지 관리가 어렵고 시간이 지남에 따라 비용이 훨씬 더 많이 발생합니다.


### 데이터 복제 외에 진정한 SANless 장애 조치(failover)를 위해 필요한 구체적인 구성 요소는 무엇인가요?

복구를 자동화하고 가동 중지 시간을 없애기 위해 올인원 제품은 다음과 같은 여러 기술적 구성 요소를 동시에 관리해야 합니다:

  * **호스트 기반 복제(Host-Based Replication):** 공유 스토리지(SAN)에 의존하지 않고 서버 간에 중요한 애플리케이션 데이터를 실시간으로 동기식 복제합니다. 이를 통해 데이터 손실 제로(RPO=0)를 보장하고 고가의 하드웨어 의존성을 제거합니다.
  * **가상 IP 주소(VIP):** 사용자에게 단일 접속 지점을 제공합니다. 장애 발생 시 소프트웨어가 VIP를 장애 노드에서 정상 노드로 이동시키므로 사용자는 설정을 변경할 필요가 없습니다.
  * **하드웨어 및 소프트웨어 오류 감지기:** 물리적 서버와 특정 소프트웨어 프로세스 모두에 대해 지속적으로 "하트비트(heartbeat)"를 수행하여 중단이나 충돌을 즉시 식별해야 합니다.
  * **사용자 정의 가능한 재시작 스크립트:** 모든 애플리케이션이 동일한 방식으로 시작되는 것은 아닙니다. 올인원 도구는 복잡한 서비스가 올바른 순서로 시작되도록 보장하는 사용자 정의 스크립트를 허용합니다.
  * **자동 장애 조치(Automatic Failover):** 사람의 개입 없이 한 서버에서 다른 서버로의 전체 이동을 오케스트레이션하는 지능형 기능을 제공합니다.


### 장애 조치(failover) 메커니즘이 호스트 기반 복제와 반드시 동기화되어야 하는 이유는 무엇인가요?

장애 조치 관리자와 데이터 복제가 서로 다른 두 개의 제품인 경우, 이들은 서로 "동기화"되지 않을 수 있습니다.

**위험성:** 장애 조치가 발생했지만 복제 도구가 최신 데이터를 전송하는 것을 완료하지 못한 경우, 서버 B는 오래되었거나 손상된 데이터로 애플리케이션을 시작하게 됩니다.

**올인원 SANless HA 솔루션** 은 장애 조치 메커니즘이 복제 상태를 완벽하게 인지하도록 보장합니다. 데이터가 최신 상태임이 보장될 때만 백업 노드에서 애플리케이션이 시작되도록 허용하여, 활성 노드 간의 충돌과 데이터 손실을 방지합니다.

### 장애가 발생한 서버가 수리되면 어떻게 되나요(장애 복구/failback)?

기술 가이드에서 자주 간과되고 기존 HA 솔루션들이 제대로 실행하지 못하는 부분이지만, 자동 장애 복구(failback)는 진정한 회복 탄력성을 위한 가장 중요한 요구 사항입니다. 진정한 올인원 제품은 장애 발생 시와 마찬가지로 "정상 상태로의 복귀"를 매끄럽게 처리합니다. 장애 서버가 다시 온라인 상태가 되면 데이터가 뒤처져 있게 되는데, 이때 HA 소프트웨어는 다음을 수행해야 합니다.

  1. **데이터 재동기화:** 활성 노드(active node)에서 복구된 노드로 백그라운드에서 데이터를 재동기화합니다.
  2. **가동 시간 유지:** 이 재동기화 작업은 활성 노드에서 현재 실행 중인 애플리케이션을 중단하지 않고 이루어져야 합니다.
  3. **이중화 복원:** 데이터 미러링이 완료되면 클러스터는 자동으로 보호 상태로 돌아가 다음 장애 이벤트에 대비합니다.


### 블록 레벨 vs. 파일 레벨 복제: 투명성이 중요한 이유

**호스트 기반 복제** 에 사용되는 기술적 방식은 기존 애플리케이션 설정을 얼마나 변경해야 하는지에 큰 영향을 미칩니다.

  * **블록 레벨 복제의 과제:** 대부분의 SANless 솔루션은 디스크/블록 레벨에서 복제합니다. 이는 애플리케이션에 **투명하지 않습니다(not transparent)**. 데이터를 새로 생성된 특정 "복제 디스크" 볼륨으로 이동하기 위해 애플리케이션 설정을 완전히 다시 구성해야 합니다. 이 과정에서 복잡한 데이터 마이그레이션이 필요하며 애플리케이션 로직이 변경될 가능성도 있습니다.
  * **SafeKit 파일 레벨의 장점:** SafeKit은 **파일 레벨에서 호스트 기반 복제** 를 수행하며, 이는 애플리케이션에 완전히 투명하게 작동합니다. 데이터를 특수 디스크로 이동할 필요 없이, 기존 애플리케이션 폴더를 복제하도록 SafeKit을 설정하기만 하면 됩니다. 이러한 폴더는 **시스템 디스크** 에 그대로 둘 수도 있어, 애플리케이션이 이미 설치된 위치 그대로 보호할 수 있습니다.



<!-- END INSERT: insert-safekit-sanless-en lang="ko" display="content" -->
 


<!-- BEGIN INSERT: insert-vm-vs-app-ha-en lang="ko" display="content" -->
 

## 고가용성 전략 선택: VM HA vs. 애플리케이션 HA {#safekit-ha-redundancy-choices}

SafeKit은 비즈니스 연속성을 보장하기 위해 두 가지 주요 접근 방식을 제공합니다: 가상 머신 고가용성(VM HA)과 애플리케이션 고가용성(Application HA)입니다. 이 두 방식 모두 자동 장애 전환 기능을 제공하지만, 적용 범위, 데이터 복제 방식, 복구 속도, 플랫폼 호환성 측면에서 상당한 차이가 있습니다. 아래 비교는 이러한 차이를 정리하여, 광범위한 가상화 지원을 중시하는 환경 또는 세밀하고 고속의 애플리케이션 복구를 요구하는 환경에 적합한 최적의 전략을 선택하는 데 도움을 줍니다.

**기능 비교: SafeKit VM HA vs. SafeKit 애플리케이션 HA 클러스터링**

비교 항목 | SafeKit Hyper-V 또는 KVM 모듈 기반 VM HA | SafeKit 애플리케이션 모듈 기반 애플리케이션 HA  
---|---|---  
배포 다이어그램 |  |   
장애 전환 범위 | 두 개의 하이퍼바이저 내 SafeKit: 전체 VM의 복제 및 장애 전환. | 두 개의 가상 또는 물리 서버 내 SafeKit: 애플리케이션 수준에서 복제 및 장애 전환.  
복제 데이터 | 더 많은 데이터 복제 (애플리케이션 + 운영 체제). | 애플리케이션 데이터만 복제하여 데이터 양 감소.  
복구 프로세스 및 속도 (RTO) | 하이퍼바이저 1 장애 시, 하이퍼바이저 2에서 VM 재부팅. 복구 시간은 OS 재부팅 시간에 따라 달라짐. VM 검사 및 장애 전환 메커니즘 포함. | 서버 1 장애 시 OS2에서 애플리케이션을 빠르게 재시작. 일반적으로 약 1분 이내 (낮은 RTO). 애플리케이션 검사 및 소프트웨어 기반 장애 전환.  
설치 | 애플리케이션은 하나의 VM에 한 번만 설치. | 애플리케이션은 두 개의 노드에 설치.  
구성 | VM에서 실행되는 모든 애플리케이션/OS에 대한 범용 솔루션. <br>• VM 내 애플리케이션의 기술적 이해가 필요하지 않음.<br>• 애플리케이션 동작을 모를 때 최적의 선택.<br>• VM 파일 위치만 정의하면 됨.  | 애플리케이션 자체에 대한 기술적 이해 필요. <br>• 재시작해야 할 서비스 식별.<br>• 실시간 복제가 필요한 애플리케이션 디렉토리.<br>• 장애 전환을 위한 가상 IP 주소 구성.   
플랫폼 호환성 | Windows/Hyper-V 및 Linux/KVM에서 동작하지만 VMware는 지원하지 않음. | 플랫폼 독립적; 물리/가상 환경, 클라우드 인프라, 모든 하이퍼바이저(예: VMware)에서 동작.  
적합한 용도 | 단일 HA 정책으로 여러 VM에 걸친 다수의 애플리케이션을 관리하는 복잡한 환경에 적합. | 하드웨어나 하이퍼바이저와 무관하게 소프트웨어에 고가용성을 직접 통합하는 경우에 적합.  
  

<!-- END INSERT: insert-vm-vs-app-ha-en lang="ko" display="content" -->
 


<!-- BEGIN INSERT: insert-safekit-usage-en lang="ko" display="content" -->
 

## SafeKit 고가용성(HA) 제한 사항 {#safekit-ha-limitations}

### 왜 몇 테라바이트를 복제해야 하나요?

장애 발생 후 재동기화 시간 ([단계 3](</architectures/file-replication-byte-level-with-failover-mirror-cluster/#safekit-mirror-cluster>))

  * 1 Gb/s 네트워크 ≈ 1 테라바이트에 약 3시간.
  * 10 Gb/s 네트워크 ≈ 1 테라바이트에 약 1시간 또는 디스크 쓰기 성능에 따라 더 짧음.


#### 대안

  * 대용량 데이터의 경우 [외부 공유 스토리지](</best-practises/san-vs-nas-shared-storage-for-a-failover-cluster/>) 사용.
  * 더 비싸고, 더 복잡함.


### 왜 1,000,000개 미만의 파일을 복제해야 하나요?

  * 장애 발생 후 재동기화 성능 ([단계 3](</architectures/file-replication-byte-level-with-failover-mirror-cluster/#safekit-mirror-cluster>)).
  * 두 노드 간 각 파일을 확인하는 데 걸리는 시간.


#### 대안

  * 복제할 많은 파일을 가상 하드 디스크/가상 머신에 넣으세요.
  * 이 경우 가상 하드 디스크/가상 머신을 나타내는 파일만 복제 및 재동기화됩니다.


### 왜 장애 조치 시 ≤ 32개의 복제된 VM인가요?

  * 각 VM은 독립적인 미러 모듈에서 실행됩니다.
  * 동일한 클러스터에서 최대 32개의 미러 모듈 실행 가능.


#### 대안

  * 외부 공유 스토리지와 다른 VM 클러스터링 솔루션 사용.
  * 더 비싸고, 더 복잡함.


### 왜 원격 사이트 간 LAN/VLAN 네트워크인가요?

  * 동일한 서브넷의 두 노드에서 [가상 IP 주소](</best-practises/how-a-virtual-ip-address-works/>) 자동 장애 조치.
  * 재동기화에 좋은 대역폭 ([단계 3](</architectures/file-replication-byte-level-with-failover-mirror-cluster/#safekit-mirror-cluster>))과 [동기식 복제](</best-practises/synchronous-replication-vs-asynchronous-replication/>)에 좋은 지연 시간 (일반적으로 왕복 2ms 미만).


#### 대안

  * 두 노드가 서로 다른 서브넷에 있는 경우 [가상 IP 주소용 로드 밸런서](</best-practises/how-a-virtual-ip-address-works/>) 사용 (SafeKit에서 지원, 특히 클라우드 환경).
  * 지연 시간이 높은 네트워크에서는 비동기식 복제를 사용하는 백업 솔루션 사용.



<!-- END INSERT: insert-safekit-usage-en lang="ko" display="content" -->
 


<!-- BEGIN INSERT: insert-safekit-videos-en lang="ko" display="content" -->
 

## SafeKit 기술 장애 조치(Failover) 튜토리얼 및 데모 {#safekit-failover-tutorials}

### SafeKit 영상: 웨비나 (9:43) {#demo-webinar}

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 

#### 챕터

  1. [소개](<https://www.youtube.com/watch?v=UiLwzqsMxis&t=0s>) (0:38)
  2. [SafeKit 데모 시연](<https://www.youtube.com/watch?v=UiLwzqsMxis&t=38s>) (1:41)
  3. [이중화 및 고가용성(HA) 솔루션 사례](<https://www.youtube.com/watch?v=UiLwzqsMxis&t=139s>) (2:00)
  4. [Milestone과 연계하여 전 세계 다양한 국가에 판매되는 SafeKit](<https://www.youtube.com/watch?v=UiLwzqsMxis&t=259s>) (0:49)
  5. [두 가지 솔루션 중 선택: 가상 머신 또는 애플리케이션 클러스터](<https://www.youtube.com/watch?v=UiLwzqsMxis&t=308s>) (2:29)
  6. [독보적인 특장점](<https://www.youtube.com/watch?v=UiLwzqsMxis&t=457s>) (2:06)

[전체 영상 보기](</resources/safekit-on-line-training/>)

### SafeKit: HADR 구현 방법 (6:42) {#safekit-hadr}

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 

#### 주요 장표

  1. [延伸 VLAN(Stretched VLAN) 환경에서의 SafeKit HADR 소개](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=0s>) (1:06)
  2. [동기식 미러링 및 이중 승인(Double-Acknowledgment) 작동 방식 (1:41)](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=65s>)
  3. [장애 조치(Failover) 메커니즘: Gratuitous ARP(GARP) 및 가상 IP](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=166s>) (2:10)
  4. [느린 WAN 환경을 위한 설계: 고가용성(HA) vs 백업 전략](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=296s>) (2:45)

[SafeKit HADR에 대해 더 알아보기](</best-practises/high-availability-disaster-recovery-hadr/>)

### SafeKit 비디오: 가상 머신 레벨 클러스터링 (5:15) {#demo-hyperv}

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 

#### 챕터

  1. [Hyper-V 노드 2개 및 가상 머신 2대](<https://www.youtube.com/watch?v=foo6YKg5Dmw&t=0s>) (0:49)
  2. [클러스터 및 2개의 hyperv.safe 모듈 구성](<https://www.youtube.com/watch?v=foo6YKg5Dmw&t=49s>) (1:59)
  3. [가상 머신 복제, 마이그레이션, 장애 발생 시 Failover 시작 및 테스트](<https://www.youtube.com/watch?v=foo6YKg5Dmw&t=168s>) (2:26)

[무료 체험판 바로가기](</quick-install/safekit-quick-installation-guide-with-hyper-v/>)

### SafeKit 비디오: SQL을 사용한 애플리케이션 레벨 클러스터링 (8:47) {#demo-sql}

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 

#### 챕터

  1. [SQL Server가 실행되는 노드 2개](<https://www.youtube.com/watch?v=T_6PsS4f9OQ&t=0s>) (0:32)
  2. [클러스터 및 mirror.safe 모듈 구성](<https://www.youtube.com/watch?v=T_6PsS4f9OQ&t=32s>) (3:58)
  3. [SQL 복제, 마이그레이션, 장애 발생 시 Failover 시작 및 테스트](<https://www.youtube.com/watch?v=T_6PsS4f9OQ&t=270s>) (4:17)

[무료 체험판 바로가기](</quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/>)

### SafeKit 비디오: OEM 고가용성 통합 (4:22) {#demo-milestone}

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 

#### 챕터

  1. [OEM 통합을 위한 SafeKit](<https://www.youtube.com/watch?v=dxiPG5ILC-0&t=0s>) (0:09)
  2. [OEM 구성 예시: Milestone XProtect](<https://www.youtube.com/watch?v=dxiPG5ILC-0&t=9s>) (2:18)
  3. [장애 조치(Failover) 시나리오 설명](<https://www.youtube.com/watch?v=dxiPG5ILC-0&t=138s>) (1:49)
  4. [요약: 귀사의 솔루션 라인업에 OEM HA 탑재하기](<https://www.youtube.com/watch?v=dxiPG5ILC-0&t=247s>) (0:15)

[무료 체험판 바로가기](</quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/>)

### SafeKit 비디오: 네트워크 로드 밸런싱 클러스터링 (5:03) {#demo-farm}

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 

#### 챕터

  1. [Apache가 실행되는 노드 2개](<https://www.youtube.com/watch?v=XSMV_eM-jgk&t=0s>) (0:13)
  2. [클러스터 및 farm.safe 모듈 구성](<https://www.youtube.com/watch?v=XSMV_eM-jgk&t=13s>) (2:20)
  3. [네트워크 부하 분산(Load Balancing), 장애 발생 시 Failover 시작 및 테스트](<https://www.youtube.com/watch?v=XSMV_eM-jgk&t=153s>) (2:30)

[무료 체험판 바로가기](</quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/>)

### SafeKit 비디오: 무료 인증 플랫폼 자습서 (6:11) {#demo-certification}

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 

#### 챕터

  1. [교육 및 인증 플랫폼](<https://www.youtube.com/watch?v=ijH4zXtn_3s&t=0s>) (1:41)
  2. [SafeKit 교육 모듈이란 무엇인가요?](<https://www.youtube.com/watch?v=ijH4zXtn_3s&t=101s>) (1:57)
  3. [SafeKit 인증서를 취득하는 방법](<https://www.youtube.com/watch?v=ijH4zXtn_3s&t=218s>) (1:40)
  4. [인증서를 LinkedIn에 공유하기](<https://www.youtube.com/watch?v=ijH4zXtn_3s&t=318s>) (0:53)

[교육 및 인증 플랫폼 바로가기](<https://training.my.evidian.com/>)

### SafeKit 영상: 경쟁 제품 비교 및 클러스터 아키텍처 (13:21) {#safekit-competition}

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 

#### 섹션별 요약

  1. [소개](<https://www.youtube.com/watch?v=DKra6YVLGZk&t=0s>) (4:10)
  2. [가상 머신 클러스터](<https://www.youtube.com/watch?v=DKra6YVLGZk&t=250s>) (1:20)
  3. [미러 클러스터 (Mirror Cluster)](<https://www.youtube.com/watch?v=DKra6YVLGZk&t=330s>) (6:04)
  4. [팜 클러스터 (Farm Cluster)](<https://www.youtube.com/watch?v=DKra6YVLGZk&t=694s>) (1:46)

[SafeKit vs 전통적 HA 클러스터 비교 보기](</#safekit-ha-comparison> "SafeKit 소프트웨어와 전통적인 하드웨어 기반 HA 클러스터의 상세 비교")

### SafeKit 비디오: 스마트폰 콘솔 (0:54) {#demo-console}

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 

### SafeKit 비디오: 페일오버 시 이메일 알림 (1:04) {#demo-notifications}

&amp;amp;amp;amp;amp;amp;lt;br /&amp;amp;amp;amp;amp;amp;gt; 


<!-- END INSERT: insert-safekit-videos-en lang="ko" display="content" -->
 


<!-- BEGIN INSERT: insert-safekit-mirror-en lang="ko" display="content" querystring="app=Windows/Linux" -->
 

## SafeKit 미러 클러스터(mirror cluster)는 Windows/Linux과 어떻게 작동하나요? {#safekit-mirror-cluster}

### 단계 1. 실시간 복제 {#step1}

서버 1(PRIM)이 Windows/Linux 애플리케이션을 실행합니다. 클라이언트는 [가상 IP 주소](</best-practises/how-a-virtual-ip-address-works/>)에 연결됩니다. SafeKit은 네트워크를 통해 파일 내부의 변경 사항을 실시간으로 복제합니다.


<img src="/wp-content/uploads/2023/02/safekit-prim-second-300.png" width="300" alt="미러 Windows/Linux 클러스터의 바이트 단위 파일 복제">


이 복제 방식은 비동기 복제와 달리 장애 발생 시 데이터 손실이 없는 [동기식(synchronous)](</best-practises/synchronous-replication-vs-asynchronous-replication/>) 복제입니다.

SafeKit에서 복제할 디렉터리 이름만 구성하면 됩니다. 디스크 구조에 대한 사전 요구사항은 없습니다. 디렉터리는 시스템 디스크에 위치할 수도 있습니다.

### 단계 2. 자동 장애 조치 (Failover) {#step2}

서버 1에 장애가 발생하면 서버 2가 제어권을 넘겨받습니다. SafeKit은 가상 IP 주소를 전환하고 서버 2에서 Windows/Linux 애플리케이션을 자동으로 재시작합니다.

애플리케이션은 서버 2에서 SafeKit에 의해 최신 상태로 복제된 파일들을 찾습니다. 애플리케이션은 서버 1로 더 이상 복제되지 않는 로컬 파일을 수정하면서 서버 2에서 계속 실행됩니다.


<img src="/wp-content/uploads/2023/02/safekit-stop-alone-300.png" width="300" alt="미러 클러스터 환경에서 Windows/Linux의 장애 조치(Failover)">


장애 조치 시간은 결함 감지 시간(기본값 30초)에 애플리케이션 시작 시간을 더한 값과 같습니다.

### 단계 3. 자동 장애 복구 (Failback) {#step3}

장애 복구(Failback)는 서버 1의 장애 원인을 해결한 후 서버 1을 재시작하는 과정을 포함합니다.

SafeKit은 서버 1이 정지된 동안 서버 2에서 수정된 파일만 업데이트하여 파일을 자동으로 다시 동기화합니다.


<img src="/wp-content/uploads/2023/02/safekit-resynchro-alone-300.png" width="300" alt="미러 Windows/Linux 클러스터의 장애 복구(Failback)">


장애 복구는 서버 2에서 계속 실행 중인 Windows/Linux 애플리케이션에 영향을 주지 않고 백그라운드에서 진행됩니다.

### 단계 4. 정상 상태로 복귀

재통합이 완료되면 파일은 단계 1과 같이 다시 미러 모드로 돌아갑니다. 시스템은 고가용성 모드로 복귀하며, Windows/Linux 애플리케이션은 서버 2에서 실행되고 SafeKit은 파일 업데이트를 서버 1로 복제합니다.


<img src="/wp-content/uploads/2023/02/safekit-second-prim-300.png" width="300" alt="미러 Windows/Linux 클러스터의 정상 운영 상태 복귀">


관리자가 애플리케이션을 서버 1에서 실행하기를 원할 경우, 적절한 시점에 웹 콘솔을 통해 수동으로 전환하거나 구성을 통해 자동으로 전환할 수 있습니다.

### Windows/Linux을 위한 SafeKit 미러 클러스터 구성 방법은 무엇인가요? {#safekit-mirror-cluster-configure}


<img src="/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png" width="763" alt="SafeKit Web Console: High Availability configuration dashboard for Windows/Linux showing heartbeat networks, virtual IP setup, and real-time directory replication for a mirror cluster.">


**SafeKit 웹 콘솔** 은 중요 애플리케이션의 고가용성을 조율할 수 있는 직관적인 인터페이스를 제공합니다. 몇 단계만 거치면 비즈니스 연속성을 보장하는 **SafeKit 미러 클러스터** 를 구성할 수 있습니다:

  * **애플리케이션 장애 조치 (Macros 탭):** 장애 발생 시 자동으로 재시작할 특정 애플리케이션 서비스를 정의합니다.
  * **하트비트 네트워크 (Heartbeat network):** 클러스터 노드들이 서로의 상태와 가용성을 지속적으로 모니터링하고 장애 조치 결정을 동기화하는 데 사용하는 전용 통신 경로입니다.
  * **가상 IP 관리 (Virtual IP Management):** 장애 조치(Failover) 후 클라이언트가 투명하게 재연결될 수 있도록 가상 IP(VIP)를 설정합니다.
  * **실시간 복제 (Real-Time Replication):** 호스트 기반의 동기식 바이트 단위 복제를 수행할 핵심 디렉터리를 선택합니다.
  * **체커 (Checkers):** 애플리케이션의 상태를 모니터링하고 프로세스 실패가 감지되면 자동 복구를 트리거합니다.


SafeKit 클러스터에는 제3의 감시(witness) 장비나 추가 하트비트 네트워크 없이도 네트워크 격리 문제를 해결할 수 있는 전용 스플릿 브레인(split-brain) 체커가 포함되어 있습니다. [클러스터의 하트비트, 장애 조치 및 쿼럼](</best-practises/heartbeat-failover-quorum-windows-linux-cluster/>)에 대해 자세히 알아보세요.

### Windows/Linux을 위한 SafeKit 미러 클러스터 모니터링 방법은 무엇인가요? {#safekit-mirror-cluster-monitoring}


<img src="/wp-content/uploads/2026/05/mirror-monitoring-prim-second.png" width="604" alt="SafeKit Web Console: Real-time monitoring of a 2-node mirror cluster for Windows/Linux showing PRIM and SECOND states with active data replication.">


**SafeKit 관리 콘솔** 은 고가용성 인프라의 통합된 뷰를 제공합니다. 관리자는 이를 통해 클러스터의 **운영 상태** 를 모니터링하고 데이터 동기화를 실시간으로 추적할 수 있습니다.

2노드 미러 클러스터의 경우, 콘솔에 각 서버의 역할이 명확하게 표시됩니다:

  * **PRIM (Primary):** 현재 애플리케이션을 실행하고 가상 IP를 관리하는 활성(active) 노드입니다. 로컬 스토리지에 데이터를 기록하고 보조 노드로 실시간 복제를 수행합니다.
  * **SECOND (Secondary):** 동기식 바이트 단위 업데이트를 수신하는 대기(standby) 노드입니다. 주 노드에 장애가 발생하면 즉시 제어권을 넘겨받을 준비가 되어 있습니다.
  * **ALONE 상태:** 클러스터가 단일 노드에서 실행 중일 때(예: 유지보수 중 또는 장애 발생 후) 시각적인 경고를 표시하여 중복성(redundancy)이 일시적으로 상실되었음을 알려줍니다.
  * **재동기화 진행 상태 (Resynchronization Progress):** 장애가 발생했던 노드가 복구되면 백그라운드 데이터 재통합이 진행되는 동안 상태가 주황색으로 변경되며, 이를 통해 '정상 복귀' 단계 중에도 가동 중지 시간이 발생하지 않도록 보장합니다.


단순한 상태 아이콘을 넘어, 이 인터페이스는 **원클릭 장애 조치(failover) 조율** 기능을 제공하므로, 사용자 활동에 대한 지속적인 가용성을 보장하면서 계획된 유지보수를 위해 주(primary) 역할을 수동으로 재할당할 수 있습니다.


<!-- END INSERT: insert-safekit-mirror-en lang="ko" display="content" querystring="app=Windows/Linux" -->
 


<!-- BEGIN INSERT: insert-safekit-farm-en lang="ko" display="content" querystring="app=Windows/Linux" -->
 

## 팜(farm) 모드의 SafeKit 클러스터가 Windows/Linux와 함께 작동하는 방식은 무엇인가요? {#safekit-farm-cluster}

### 팜(farm) 모드 클러스터에서의 가상 IP 주소 {#virtual-ip-address-farm}


<img src="/wp-content/uploads/2023/02/safekit-up-up-up-300.png" width="300" alt="How the SafeKit cluster in farm mode implements Windows/Linux network load balancing and failover">


이전 그림에서 Windows/Linux 애플리케이션은 3대의 서버에서 실행 중입니다(3대는 예시일 뿐이며, 2대 이상으로 구성 가능합니다). 사용자는 가상 IP 주소로 연결됩니다.

[가상 IP 주소](</best-practises/how-a-virtual-ip-address-works/>)는 팜 모드 클러스터의 각 서버에 로컬로 구성됩니다.  
가상 IP 주소로 들어오는 수신 트래픽은 모든 서버가 수신하며, 각 서버 커널 내부의 네트워크 필터에 의해 서버 간에 분산됩니다.

SafeKit은 하드웨어 및 소프트웨어 장애를 감지하고, 장애 발생 시 네트워크 필터를 재구성하며, 구성 가능한 애플리케이션 검사기(checker)와 복구 스크립트를 제공합니다.

### 네트워크 필터에서의 부하 분산(Load Balancing) {#network-load-balancing}

네트워크 필터 내부의 네트워크 부하 분산 알고리즘은 클라이언트 패킷의 식별 정보(클라이언트 IP 주소, 클라이언트 TCP 포트)를 기반으로 합니다. 입력된 클라이언트 패킷의 식별 정보에 따라, 오직 한 서버의 필터만 해당 패킷을 수용하고 다른 서버의 필터들은 이를 거부합니다.

패킷이 특정 서버의 필터에 의해 수용되면, 클라이언트의 요청에 응답하는 Windows/Linux 애플리케이션은 해당 서버의 CPU와 메모리만 사용합니다. 출력 메시지는 애플리케이션 서버에서 클라이언트로 직접 전송됩니다.

서버 장애가 발생하면, 팜 하트비트(heartbeat) 프로토콜이 네트워크 부하 분산 클러스터의 필터를 재구성하여 남아 있는 가용 서버로 트래픽을 다시 분산합니다.

### 스테이트풀(Stateful) 또는 스테이트리스(Stateless) 애플리케이션 {#stateful-stateless}

스테이트풀(Stateful) Windows/Linux 애플리케이션의 경우, 세션 어피니티(지속성)가 존재합니다. 동일한 클라이언트가 서버에서 자신의 컨텍스트(상태 정보)를 유지하려면 여러 TCP 세션에 걸쳐 동일한 서버에 연결되어야 합니다. 이 경우, SafeKit 부하 분산 규칙은 클라이언트 IP 주소를 기반으로 구성됩니다. 따라서 동일한 클라이언트는 여러 TCP 세션에서도 항상 동일한 서버로 연결됩니다. 그리고 서로 다른 클라이언트들은 팜 내의 여러 서버로 분산됩니다.

스테이트리스(Stateless) Windows/Linux 애플리케이션의 경우, 세션 어피니티가 존재하지 않습니다. 동일한 클라이언트가 여러 TCP 세션에서 팜 내의 서로 다른 서버로 연결될 수 있습니다. 세션 간에 서버 로컬에 저장되는 컨텍스트가 없기 때문입니다. 이 경우, SafeKit 부하 분산 규칙은 TCP 클라이언트 세션 식별 정보를 기반으로 구성됩니다. 이 구성은 서버 간에 세션을 분산하는 데 가장 이상적이지만, 세션 어피니티를 요구하지 않는 TCP 서비스여야 합니다.

### Windows/Linux의 팜(farm) 모드 SafeKit 클러스터를 구성하는 방법은 무엇인가요? {#safekit-farm-cluster-configuration}


<img src="/wp-content/uploads/2026/01/safekit-farm-cluster-config.png" width="966" alt="SafeKit Web Console: Farm-mode cluster configuration for Windows/Linux network load balancing and virtual IP management.">


**팜 모드 SafeKit 클러스터** 는 서비스의 고가용성과 확장성을 위해 설계되었습니다. 구성은 동시에 두 노드 모두로 유입되는 트래픽을 분산하는 데 중점을 둡니다:

  * **부하 분산 서비스 (Macros 탭):** 모든 노드에서 활성 상태를 유지할 특정 애플리케이션 서비스(예: Apache, IIS, Nginx)를 정의합니다.
  * **하트비트 네트워크:** 노드가 팜을 이탈했는지 감지하는 데 사용되는 통신 경로로, 이탈 감지 시 즉각적인 부하 재배분을 트리거합니다.
  * **가상 IP (Farm VIP):** 미러 클러스터와 달리, Farm VIP는 네트워크 트래픽을 분산하기 위해 커널 필터링 알고리즘을 사용하여 노드 간에 공유됩니다.
  * **부하 분산 규칙:** 소스 IP 주소 또는 포트를 기반으로 트래픽 분산 정책을 정의합니다.
  * **체커 (Checkers):** 애플리케이션의 상태를 모니터링하고 프로세스 장애가 감지되면 자동으로 재시작을 트리거합니다.


### Windows/Linux의 팜(farm) 모드 SafeKit 클러스터를 모니터링하는 방법은 무엇인가요? {#safekit-farm-cluster-monitoring}


<img src="/wp-content/uploads/2026/01/safekit-farm-cluster-monitor.png" width="473" alt="SafeKit Console: Monitoring a 2-node farm-mode cluster showing both Windows/Linux nodes in UP state with active load balancing.">


팜 모드에서 클러스터를 모니터링하면 모든 노드가 애플리케이션 성능에 기여하는 인프라의 **Active-Active** 특성을 시각적으로 확인할 수 있습니다(이 예시에서는 2개의 노드가 표시됨):

  * **UP 상태 (2개 노드에서 각각 50%):** 정상적인 팜 구조에서는 두 노드가 모두 "UP"(50%) 상태로 유지되며, 이는 두 노드가 공유 가상 IP를 통해 클라이언트 요청을 대등하게 수신하고 처리하고 있음을 의미합니다.
  * **자동 재배분 (Re-balancing):** 하나의 노드에 장애가 발생하면, 콘솔 상에서 나머지 노드가 트래픽의 100%를 즉시 처리하는 모습을 시각적으로 보여줍니다. 잔존 노드가 이미 활성화되어 있는 상태이므로 (몇 초간의 장애 감지 시간을 제외하고는) "장애 조치(failover)"로 인한 지연 시간이 없습니다.
  * **노드 편입:** 복구된 노드가 재시작되면 "STOP"에서 "UP" 상태로 전환되며, 관리자의 수동 개입 없이 자동으로 자신의 할당량만큼 트래픽을 다시 수신하기 시작합니다.
  * **데이터 동기화 없음:** 팜 모드 클러스터에서는 노드가 상태 정보가 없는 스테이트리스(stateless) 방식이거나 백엔드 데이터베이스를 공유하는 구조(이 데이터베이스는 미러 클러스터로 별도 보호 가능)이므로, "주황색"으로 표시되는 동기화 재개 상태가 존재하지 않습니다.


단순한 상태 아이콘 확인을 넘어, 인터페이스에서 클릭 한 번으로 노드를 관리할 수 있습니다. 이를 통해 계획된 유지보수를 위해 노드를 수동으로 중지하거나 시작할 수 있으며, 그동안 공유 가상 IP는 사용자 활동을 중단시키지 않고 트래픽을 자동으로 재배분합니다.


<!-- END INSERT: insert-safekit-farm-en lang="ko" display="content" querystring="app=Windows/Linux" -->
 


<!-- BEGIN INSERT: insert-safekit-differentiators-en lang="ko" display="content" -->
 

## SafeKit과 기존 고가용성(HA) 클러스터 비교 {#safekit-ha-comparison}

이 비교는 SafeKit과 장애 조치 클러스터(Failover Cluster), 가상화 HA, SQL Always-On과 같은 기존 고가용성(HA) 클러스터 솔루션 간의 근본적인 차이를 보여줍니다. SafeKit은 범용 애플리케이션 이중화를 위한 저복잡도 순수 소프트웨어 솔루션으로 설계되었으며, 기존 HA 메커니즘의 높은 복잡성과 특정 스토리지 요구사항(공유 스토리지, SAN)과 대조됩니다. 

**SafeKit과 기존 고가용성(HA) 클러스터 비교**

솔루션 | 복잡도 | 비고  
---|---|---  
장애 조치 클러스터 (Microsoft) | 높음 | 특정 스토리지 필요 (공유 스토리지, SAN)  
가상화 (VMware HA) | 높음 | 특정 스토리지 필요 (공유 스토리지, SAN, vSAN)  
SQL Always-On (Microsoft) | 높음 | SQL만 이중화되며, SQL Enterprise Edition 필요  
SafeKit | 낮음 | 가장 간단하고 범용적이며 순수 소프트웨어 방식. 대용량 데이터 복제에는 부적합.  
  
**요약하면** , SafeKit은 SAN(Storage Area Network)과 같은 고가의 전용 하드웨어가 필요 없는 간단한 소프트웨어 기반 미러링 메커니즘을 통해 저복잡도 고가용성을 달성합니다. 이를 통해 복잡한 인프라 변경 없이 애플리케이션 이중화를 신속하게 구현할 수 있는 접근성 높은 솔루션입니다. 

## 아키텍처 차별점: SafeKit 소프트웨어 정의 vs. 하드웨어 HA 클러스터 {#ha-arch-diff}


<!-- BEGIN INSERT: insert-safekit-software-vs-hardware-table-en lang="ko" display="content" -->
 

올바른 고가용성(High Availability - HA) 솔루션을 선택하는 것은 비즈니스 연속성을 보장하고 다운타임을 최소화하는 데 매우 중요합니다. 본 비교 자료는 SafeKit의 소프트웨어 정의 셰어드 나싱(Shared-Nothing) 클러스터링과, 하드웨어, 공유 디스크(SAN 등) 및 복잡한 설정에 의존하는 전통적인 HA 방식을 직관적으로 비교·분석합니다. 이러한 차이점은 배포의 용이성, 데이터 복제 방식, 복구 속도(RTO/RPO), 그리고 운영 복잡성 전반에 걸쳐 있습니다. 아래 표는 주요 고가용성 주제별 차이점을 상세히 설명합니다.

**고가용성 비교: SafeKit 소프트웨어 클러스터링 vs 전통적인 HA / 하드웨어 클러스터링**

주제 | SafeKit (소프트웨어 클러스터링 / 주요 접근 방식) | 전통적인 HA / 하드웨어 클러스터링  
---|---|---  
**[소프트웨어 클러스터링 vs 하드웨어 클러스터링](</best-practises/clustering-software-vs-hardware-clustering/>)** |  • 두 대의 서버에 SafeKit 패키지를 설치하기만 하면 되는 단순한 소프트웨어 클러스터  |  • 외부 스토리지나 네트워크 로드 밸런서가 필요한 복잡한 하드웨어 클러스터링   
**[셰어드 나싱 vs 공유 디스크 클러스터](</best-practises/shared-nothing-architecture-vs-shared-disk-architecture/>)** |  • SafeKit은 셰어드 나싱(Shared-Nothing) 클러스터로, 원격지 사이트에서도 쉽게 배포 가능  |  • 공유 디스크 클러스터는 배포 구성이 복잡함   
**[애플리케이션 고가용성 vs 가상 머신 전체 고가용성](</best-practises/vm-ha-vs-application-ha/>)** |  • 애플리케이션 체커를 통해 하드웨어 장애 및 소프트웨어 장애를 모두 지원.<br>• 애플리케이션만 재시작하므로 빠른 복구 시간 제공 (RTO 1분 이내 수준).<br>• 애플리케이션 HA는 애플리케이션별 재시작 스크립트 및 복제 대상 폴더(SafeKit 애플리케이션 모듈) 정의 필요.  |  • 전체 가상 머신(VM) HA는 하드웨어 장애 및 멈춤 현상과 같은 일부 소프트웨어 장애를 지원.<br>• 장애 발생 시 VM이 재시작되며, 복구 시간은 OS 재부팅 속도에 의존.<br>• 전체 VM HA에서는 재시작 스크립트 정의가 불필요 (SafeKithyperv.safe또는kvm.safe모듈 사용). 하이퍼바이저는 여러 VM을 통한 액티브/액티브 구조로 작동.   
**[고가용성 vs 내결함성 (Fault Tolerance)](</best-practises/high-availability-cluster-vs-fault-tolerant-system/>)** |  • SafeKit은 전용 서버가 필요 없음. 각서버가 서로의 페일오버(Failover) 서버 역할 수행 가능.<br>• 다른 OS 환경에서 재시작하여 소프트웨어 장애에 대응.<br>• 서버별로 애플리케이션 및 OS의 롤링 업그레이드 가능 (N 버전과 N+1 버전의 공존 가능).  |  • 명령어 수준에서 동기화되는 동일한 애플리케이션 실행 전용 세컨더리 서버 필요.<br>• 소프트웨어 예외 장애 발생 시 두 서버에서 동시에 문제 발생.<br>• 롤링 업그레이드 불가능.<br>• 특수 내결함성 하드웨어 또는 하이퍼바이저 필요.   
**[동기식 복제 vs 비동기식 복제](</best-practises/synchronous-replication-vs-asynchronous-replication/>)** |  • SafeKit은 실시간 동기식 복제를 구현하여 장애 발생 시 데이터 손실 제로 달성.<br>• 고가용성 구현을 위한 필수 전제 조건.  |  • 비동기식 복제는 장애 발생 시 데이터 손실 발생.<br>• 고가용성에는 적합하지 않으며 백업 솔루션 용도로 사용.   
**[바이트 레벨 파일 복제 vs 블록 레벨 디스크 복제](</best-practises/byte-level-file-replication-vs-block-level-disk-replication/>)** |  • SafeKit은 실시간 바이트 레벨 파일 복제를 구현하며, 시스템 디스크 내에 있더라도 복제할 애플리케이션 디렉터리를 지정하는 것만으로 손쉽게 설정 가능.  |  • 블록 레벨 디스크 복제는 설정을 위한 구성이 복잡하며 애플리케이션 데이터를 전용 디스크에 배치해야 함.   
**[2개의 마스터 노드 발생 방지를 위한 하트비트, 페일오버 및 쿼럼](</best-practises/heartbeat-failover-quorum-windows-linux-cluster/>)** |  • 2개의 마스터(스플릿 브레인) 발생을 방지하기 위해 SafeKit은 라우터에 설정하는 간단한 스플릿 브레인 체커를 제공.  |  • 2개의 마스터를 방지하기 위해 다른 클러스터는 제3의 머신, 전용 쿼럼 디스크 또는 전용 상호 연결 전용선 등의 복잡한 구성 필요.   
**[가상 IP 주소: 프라이머리/세컨더리, 네트워크 로드 밸런싱, 페일오버](</best-practises/how-a-virtual-ip-address-works/>)** |  • SafeKit 클러스터에서는 가상 IP 주소를 위한 전용 프록시 서버나 특별한 네트워크 구성이 불필요.  |  • 다른 클러스터에서는 가상 IP 주소를 위한 특별한 네트워크 설정 필요 (참고: SafeKit은 로드 밸런서에 맞춤화된 헬스 체크 기능 제공).   
  
**요약하면** , 소프트웨어 클러스터링(SafeKit 등)과 하드웨어 클러스터링(전통적인 공유 디스크/SAN 기반 아키텍처) 사이의 아키텍처 선택은 구축 복잡성, 운영 비용 및 장애 복구 효율성에 큰 영향을 미칩니다. 이 비교의 핵심 결론은 공유 디스크에 의존하지 않는 공유 없음(Shared-Nothing) 아키텍처와 애플리케이션 수준의 고가용성(HA)으로의 전환입니다. 이러한 접근 방식은 애플리케이션의 신속한 복구(낮은 RTO)와 유연한 구축(원격 사이트 간 구성 포함)을 우선시하며, 그 결과 하드웨어에 크게 의존하는 복잡한 클러스터 구성보다 더 간결하고 탄력적인 솔루션을 제공하는 경우가 많습니다. 관리 복잡성을 줄이면서 최대의 비즈니스 연속성을 확보하려면 소프트웨어 기반 접근 방식을 검토하는 것이 필수적입니다.


<!-- END INSERT: insert-safekit-software-vs-hardware-table-en lang="ko" display="content" -->
 

## SafeKit 미러 클러스터의 주요 차별점 {#safemirr-diff}


<!-- BEGIN INSERT: insert-safekit-mirror-comparison-table-en lang="ko" display="content" -->
 

올바른 데이터 복제 방식을 선택하는 것은 비즈니스 연속성을 보장하는 데 매우 중요합니다. 이 비교에서는 SafeKit 미러 클러스터의 실시간 파일 복제와 데이터베이스 수준 복제, 디스크 복제, 공유 디스크 솔루션, 내결함성 시스템 등 기존 대안 간의 주요 차별화 요소를 설명합니다.

**SafeKit 미러 클러스터: 대체 복제 및 클러스터링 방식 대비 장점**

특성 | SafeKit 장점 | 대안의 한계  
---|---|---  
**[3개 제품을 1개로](</best-practises/clustering-software-vs-hardware-clustering/>)** | Windows 및 Linux에서 외부 공유/복제 스토리지, 로드 밸런싱 장비, OS 및 데이터베이스 엔터프라이즈 에디션 비용을 절감합니다. 동기식 실시간 파일 복제, 장애 모니터링, 자동 재시작, 가상 IP 페일오버 등 모든 클러스터링 기능을 포함합니다. | 기존 방식은 스토리지 복제, 로드 밸런싱, 클러스터링에 별도의 제품이 필요하여 비용과 복잡성이 증가합니다.  
**[매우 간단한 구성](</solutions/>)** | 애플리케이션 모듈을 통한 구성. 새로운 서비스와 복제 디렉토리를 쉽게 추가할 수 있습니다. 모두 중앙 집중식 웹 콘솔로 관리. 도메인 컨트롤러나 Active Directory가 필요 없습니다. | Microsoft 클러스터 및 유사 솔루션은 복잡한 Active Directory 구성과 도메인 컨트롤러가 필요합니다.  
**[동기식 복제](</best-practises/synchronous-replication-vs-asynchronous-replication/>)** | 실시간 복제는 동기식으로 장애 시 데이터 손실이 없습니다(RPO = 0). | 비동기식 복제는 장애 발생 시 아직 복제되지 않은 최근 트랜잭션을 잃을 수 있습니다.  
**[완전 자동 페일백](</architectures/file-replication-byte-level-with-failover-mirror-cluster/#step3>)** | 장애 후 서버가 재시작되면 복제 페일백이 완전히 자동으로 수행됩니다. 장애 서버는 나머지 서버의 애플리케이션을 중지하지 않고 클러스터에 재통합됩니다. | 대부분의 복제 솔루션(특히 데이터베이스 수준)은 수동 재동기화가 필요합니다. 페일백 중에 애플리케이션이 중지될 수도 있습니다.  
**[모든 유형의 데이터 복제](</architectures/file-replication-byte-level-with-failover-mirror-cluster/#step1>)** | 복제는 데이터베이스뿐만 아니라 복제가 필요한 모든 파일에 대해 작동합니다. | 데이터베이스 수준 복제는 데이터베이스만 보호하며 구성 파일, 로그 또는 기타 애플리케이션 데이터는 보호하지 않습니다.  
**[파일 복제 vs. 디스크 복제](</best-practises/byte-level-file-replication-vs-block-level-disk-replication/>)** | 복제는 시스템 디스크를 포함하여 어디에나 위치할 수 있는 파일 디렉토리를 기반으로 합니다. | 디스크 복제는 전용 파티션과 데이터를 저장하기 위한 특별한 애플리케이션 구성이 필요합니다.  
**[파일 복제 vs. 공유 디스크](</best-practises/shared-nothing-architecture-vs-shared-disk-architecture/>)** | 공유 인프라 없이 두 개의 원격 사이트에 서버를 배포할 수 있습니다. | 공유 디스크 솔루션은 물리적 근접성이 필요하며 원격 사이트를 지원할 수 없습니다.  
**[원격 사이트 및 가상 IP](</best-practises/how-a-virtual-ip-address-works/>)** | 모든 클러스터링 기능이 원격 사이트의 2대 서버에서 작동합니다. 확장 LAN은 레이어 2 VIP 리라우팅을 지원합니다. 서로 다른 IP 네트워크의 경우 SafeKit 헬스 체크를 통한 로드 밸런서로 VIP를 관리합니다. | 많은 클러스터링 솔루션은 원격 사이트 페일오버를 지원하지 않거나 예측 불가능한 복구 시간을 가진 복잡한 DNS 리다이렉션이 필요합니다.  
**[쿼럼 및 스플릿 브레인](</best-practises/heartbeat-failover-quorum-windows-linux-cluster/>)** | 2대의 서버만으로 작동합니다. 라우터로의 간단한 스플릿 브레인 체커가 사이트 간 네트워크 격리를 처리합니다. | 대부분의 클러스터링 솔루션은 쿼럼 관리를 위해 3번째 서버가 필요합니다.  
**[액티브/액티브 클러스터](</architectures/active-active-cluster-real-time-replication/>)** | 보조 서버는 전용이 아닙니다. 2개의 서로 다른 미러 모듈로 액티브/액티브 운영이 가능합니다. | [내결함성 시스템](</best-practises/high-availability-cluster-vs-fault-tolerant-system/>)은 보조 서버를 명령어 수준에서 동기화된 동일 애플리케이션 실행에 전용화합니다.  
**[통합 HA 솔루션](</architectures/clustering-software-load-balancing-mirroring/>)** | SafeKit은 미러 클러스터(복제 + 페일오버)와 [팜 클러스터(로드 밸런싱 + 페일오버)](</architectures/network-load-balancing-cluster/>)를 모두 구현합니다. N-티어 아키텍처를 Windows와 Linux에서 하나의 솔루션으로 고가용성을 실현할 수 있습니다. | 일반적인 아키텍처는 로드 밸런싱, 복제, 페일오버에 서로 다른 기술을 혼합하여 운영 복잡성을 증가시킵니다.  
**[RTO / RPO](</best-practises/what-is-rpo-and-rto-with-examples/>)** | 장애 시 빠른 애플리케이션 재시작: 약 1분 이내. 데이터 손실 제로(동기식 복제). | [전체 VM 복제](</best-practises/vm-ha-vs-application-ha/>)(VMware HA, Hyper-V 클러스터)는 새로운 하이퍼바이저에서 전체 OS를 재부팅해야 하므로 복구 시간이 길어집니다.  
  
**요약하면** , SafeKit 미러 클러스터는 동기식 파일 복제, 자동 페일오버 및 페일백, 로드 밸런싱, 원격 사이트 지원을 결합한 통합적이고 비용 효율적인 고가용성 솔루션을 제공합니다. 전용 하드웨어, 공유 스토리지, 세 번째 쿼럼 서버가 필요 없습니다. 이러한 단순성은 표준 Windows 및 Linux 서버에서 안정적인 HA가 필요한 소프트웨어 제공업체와 조직에 특히 적합합니다.


<!-- END INSERT: insert-safekit-mirror-comparison-table-en lang="ko" display="content" -->
 

## SafeKit Farm 클러스터의 주요 차별점 {#safefarm-diff}

SafeKit Farm Cluster는 부하 분산과 빠른 장애 조치가 필수적인 확장 가능한 애플리케이션 환경을 위해 특별히 설계된 고가용성 솔루션입니다. 전용 하드웨어 로드 밸런서나 복잡한 네트워크 구성을 필요로 하는 기존 방식과 달리, SafeKit은 애플리케이션 서버에 직접 설치되는 통합된 소프트웨어 정의 클러스터링 솔루션을 제공합니다. 아래 표는 SafeKit Farm Cluster의 핵심 기능과 고유한 장점을 상세히 설명하며, 네트워크 부하 분산을 어떻게 간소화하고 Windows 및 Linux 플랫폼에서 서비스의 지속적인 가용성을 보장하는지에 초점을 맞추고 있습니다. 

**부하 분산 및 장애 조치를 갖춘 SafeKit Farm Cluster의 핵심 차별화 요소**

장점 | 상세 이점 및 메커니즘  
---|---  
[로드 밸런서, 전용 프록시 서버 또는 특수 멀티캐스트 이더넷 주소 불필요](</best-practises/how-a-virtual-ip-address-works/>) |  • 이 솔루션은 부하 분산을 구현하기 위해 팜 상위에 로드 밸런서나 전용 프록시 서버가 필요하지 않습니다. SafeKit은 팜의 애플리케이션 서버에 직접 설치됩니다. 부하 분산은 표준 가상 IP 주소/이더넷 MAC 주소를 기반으로 하며, 특별한 네트워크 구성 없이 Windows 및 Linux의 물리적 서버 또는 가상 머신에서 작동합니다<br>• 네트워크 로드 밸런서로는 이를 실현할 수 없습니다<br>• Linux의 전용 프록시로는 이를 실현할 수 없습니다<br>• Windows의특수 멀티캐스트 이더넷 주소로도 이를 실현할 수 없습니다   
[모든 클러스터링 기능](</architectures/network-load-balancing-cluster/>) |  • 이 솔루션은 모든 클러스터링 기능을 포함합니다: 가상 IP 주소, 클라이언트 IP 주소 또는 세션 기반 부하 분산, 서버/네트워크/소프트웨어 장애 모니터링, 빠른 복구 시간의 자동 애플리케이션 재시작, 그리고미러 모듈을 통한 복제 옵션<br>• 다른 부하 분산 솔루션으로는 이를 실현할 수 없습니다. 부하 분산은 가능하지만, 재시작 스크립트와 장애 시 자동 애플리케이션 재시작을 포함하는 완전한 클러스터링 솔루션은 포함하지 않습니다. 복제 옵션도 제공하지 않습니다<br>• 클러스터 구성은 매우 간단하며애플리케이션 모듈을 통해 이루어집니다. Windows에서 도메인 컨트롤러나 Active Directory를 구성할 필요가 없습니다. 이 솔루션은 Windows와 Linux에서 모두 작동합니다   
[원격 사이트와 가상 IP 주소](</best-practises/how-a-virtual-ip-address-works/>) |  • 원격 사이트 간 확장 LAN을 통해 서버가 동일한 IP 네트워크에 연결된 경우, SafeKit의가상 IP 주소는 레이어 2에서 부하 분산이 작동합니다<br>• 원격 사이트 간 서버가 서로 다른 IP 네트워크에 연결된 경우, SafeKit 헬스 체크를 활용하여 로드 밸런서 수준에서 가상 IP 주소를 구성할 수 있습니다. 이를 통해 부하 분산뿐만 아니라 SafeKit의 모든 클러스터링 기능, 특히 애플리케이션 서버에서 핵심 애플리케이션의 모니터링 및 자동 복구를 구현할 수 있습니다   
[통합 고가용성 솔루션](</architectures/clustering-software-load-balancing-mirroring/>) |  • SafeKit은 부하 분산과 장애 조치를 갖춘 팜 클러스터를 구현합니다. 또한복제와 장애 조치를 갖춘 미러 클러스터도 구현합니다.<br>• 따라서 N-tier 아키텍처를 Windows와 Linux에서 동일한 솔루션으로 고가용성과 부하 분산을 구현할 수 있습니다(SafeKit 콘솔 또는 명령줄 인터페이스를 통한 동일한 설치, 구성, 관리). 이는 시장에서 유일무이합니다<br>• 부하 분산, 복제, 장애 조치를 위해 서로 다른 기술을 혼합한 아키텍처로는 이를 실현할 수 없습니다   
  
**요약하면** , SafeKit Farm Cluster는 부하 분산과 고가용성에 대한 통합적이고 소프트웨어 기반의 접근 방식을 제공하여 복잡성과 비용을 획기적으로 줄입니다. 표준 가상 IP 주소를 사용하여 부하 분산과 장애 조치를 애플리케이션 서버 계층에 직접 내장함으로써, 외부 네트워크 하드웨어(로드 밸런서 또는 프록시)와 전용 멀티캐스트 구성의 필요성을 제거합니다. 이 통합 접근 방식은 완전한 N-tier HA를 위한 미러 클러스터와의 결합 능력과 더불어, SafeKit을 다양한 환경에서 확장 가능하고 탄력적인 애플리케이션 제공을 실현하는 독보적으로 간단하고 포괄적인 솔루션으로 만들어 줍니다. 

## VM 고가용성: SafeKit의 SAN-Less vs. Hyper-V/VMware HA {#safe-vmha-diff}


<!-- BEGIN INSERT: insert-safekit-vm-vs-app-ha-comparison-table-en lang="ko" display="content" -->
 

고가용성을 구현할 때, **가상 머신(VM) 수준** 에서 보호할지 **애플리케이션 수준** 에서 보호할지가 핵심 결정 사항입니다. VM 수준 HA는 전체 가상 머신을 복제하고 페일오버하여 모든 애플리케이션에 대한 범용 솔루션을 제공합니다. 애플리케이션 수준 HA는 애플리케이션 데이터와 서비스만을 대상으로 하여 더 빠른 복구 시간과 낮은 리소스 사용량을 달성합니다. SafeKit은 **두 가지 접근 방식 모두** 를 유일하게 제공하며, 어느 경우에도 공유 스토리지(SAN)가 필요 없어 인프라와 복구 요구 사항에 가장 적합한 방식을 선택할 수 있습니다.

**SafeKit VM HA vs 애플리케이션 HA vs 기존 Hyper-V 클러스터 & VMware HA**

기준 | SafeKit Hyper-V 또는 KVM 모듈의 VM HA | SafeKit 애플리케이션 모듈의 애플리케이션 HA | Microsoft Hyper-V 클러스터 & VMware HA  
---|---|---|---  
**아키텍처** | SafeKit을 2개의 하이퍼바이저에 설치. 전체 VM의 복제 및 페일오버. | SafeKit을 2개의 가상 또는 물리 머신에 설치. 애플리케이션 수준의 복제 및 페일오버. | 공유 스토리지가 있는 하이퍼바이저 클러스터. 하이퍼바이저 장애 시 다른 호스트에서 VM 재시작.  
**스토리지** | 공유 디스크 불필요 — [데이터 손실 없는 동기식 실시간 복제](</best-practises/synchronous-replication-vs-asynchronous-replication/>) | 공유 디스크 불필요 — 애플리케이션 데이터만 동기식 복제 | 공유 디스크와 전용 외부 디스크 베이 필요  
**복제 데이터** | 더 많은 데이터 복제 (애플리케이션 + OS) | 애플리케이션 데이터만 복제 | 복제 없음 — 모든 호스트가 공유 스토리지에 접근  
**복구 시간** | 하이퍼바이저 1 장애 시 하이퍼바이저 2에서 VM 재부팅. 복구 시간 = VM 재부팅 시간. VM 장애 시 페일오버. | 서버 2에서 애플리케이션 재시작으로 빠른 복구. 약 1분 이내 ([RTO/RPO 보기](</best-practises/what-is-rpo-and-rto-with-examples/>)). 고급 애플리케이션 체커 및 소프트웨어 페일오버. | 새 하이퍼바이저에서 전체 VM 재부팅. 복구 시간은 OS 재부팅 + 애플리케이션 시작에 따라 결정.  
**재해 복구 / 원격 사이트** | SAN 불필요 — SafeKit에 원격 사이트 간 복제 내장 | SAN 불필요 — SafeKit에 원격 사이트 간 복제 내장 | SAN 또는 vSAN을 통한 디스크 베이 복제 필요  
**구성** | 애플리케이션이 설치된 VM 파일 폴더 위치 정의. 모든 애플리케이션/OS에 대한 범용 솔루션. | 재시작할 서비스, 복제할 애플리케이션 폴더, 페일오버를 위한 가상 IP 주소를 [애플리케이션 모듈](</solutions/>)에서 정의. | 시스템 구성에 전문 IT 기술 필요  
**지원 플랫폼** | [Hyper-V](</solutions/hyper-v-replication-automatic-failover-load-balancing/>)와 [KVM](</solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>) 지원 (VMware 직접 지원 안 함, VMware 내에서 Hyper-V 또는 KVM 중첩 제외). | 모든 인프라에서 작동: 물리 서버, VMware, Hyper-V, KVM 가상 머신, 클라우드. | VMware vSphere 또는 Microsoft Hyper-V 환경으로 제한  
**IT 기술** | 전문 IT 기술 불필요. 자동 페일오버. | 전문 IT 기술 불필요. 자동 페일오버. | 시스템 구성에 전문 IT 기술 필요  
  
**요약하면** , SafeKit은 **공유 스토리지 없이 VM 수준과 애플리케이션 수준 고가용성을 모두 제공하는** 유일한 솔루션입니다. 최대 유연성과 가장 빠른 복구 시간(약 1분)을 위해 애플리케이션 수준 HA가 선호되는 접근 방식입니다 — 모든 플랫폼(물리, 가상 또는 클라우드)에서 작동하며 중요한 데이터만 복제합니다. 전체 VM을 보호하는 것이 더 간단한 환경에서는 SafeKit의 Hyper-V/KVM 모듈이 기존 Microsoft Hyper-V 클러스터나 VMware HA에 대한 범용 SAN 불필요 대안을 제공하여 동기식 실시간 복제를 통한 데이터 손실 제로를 보장하면서 공유 스토리지 인프라의 비용과 복잡성을 제거합니다.

SafeKit 솔루션은 구현이 가장 간단하지만 **[수 테라바이트](</ko/#safekit-ha-limitations>)의 복제와 [32개 VM](</ko/#safekit-ha-limitations>)의 페일오버로 제한**됩니다.


<!-- END INSERT: insert-safekit-vm-vs-app-ha-comparison-table-en lang="ko" display="content" -->
 


<!-- END INSERT: insert-safekit-differentiators-en lang="ko" display="content" -->
 


<!-- BEGIN INSERT: insert-safekit-training-en lang="ko" display="content" -->
 

## SafeKit HA 무료 체험판 및 기술 문서 {#safekit-ha-technical-resources}

💡 SafeKit과 함께 고가용성 여정을 시작하려면, **[빠른 설치 가이드부터 시작하십시오](</quick-install/>)**.

### 📦 SafeKit HA 소프트웨어 패키지 - 버전 8.2

이 표는 운영 체제 및 설치 프로그램 유형별로 정리된 최신 버전의 SafeKit 설치 파일을 제공합니다.

OS / 플랫폼 | 설치 프로그램 유형 | 주요 장점 / 문서 | 다운로드 링크  
---|---|---|---  
**모든 플랫폼** | **PDF 문서** | **공식 소프트웨어 릴리스 게시판 (OS 지원 및 수정 사항)** | [📄 SafeKit 8.2 SRB 보기](<https://github.com/FR-LES-SAFEKIT-DEV/safekit-packages/releases/download/v8.2/SafeKit_8.2_Software_Release_Bulletin.pdf> "SafeKit 8.2에서 지원되는 OS 및 최근 수정 사항에 대한 공식 게시판입니다.")  
**Windows (Intel 64비트)** | **.exe 설치 프로그램** | Microsoft VC++ 재배포 가능 패키지 포함 | [⬇️ SafeKit 8.2 Windows EXE 다운로드](<https://github.com/FR-LES-SAFEKIT-DEV/safekit-packages/releases/download/v8.2/safekit_windows_x86_64_8_2_6_5.exe> "Windows용 SafeKit 8.2 다운로드 \(VC++ 재배포 가능 패키지 포함 EXE 설치 프로그램\)")  
**Windows (Intel 64비트)** | **.msi 설치 프로그램** | Microsoft VC++ 재배포 가능 패키지 _미포함_ | [⬇️ SafeKit 8.2 Windows MSI 다운로드](<https://github.com/FR-LES-SAFEKIT-DEV/safekit-packages/releases/download/v8.2/safekit_windows_x86_64_8_2_6_5.msi> "Windows용 SafeKit 8.2 다운로드 \(VC++ 재배포 가능 패키지 미포함 MSI 설치 프로그램\)")  
**Linux (Intel 64비트)** | **자동 압축 해제 .BIN** | Linux 패키지 및 설치 스크립트 포함 | [⬇️ SafeKit 8.2 Linux BIN 파일 다운로드 (Intel)](<https://github.com/FR-LES-SAFEKIT-DEV/safekit-packages/releases/download/v8.2/safekitlinux_x86_64_8_2_6_4.bin> "Linux용 SafeKit 8.2 다운로드 \(표준 Linux 패키지 및 설치 스크립트가 포함된 자동 압축 해제 BIN 파일\)")  
**Linux (ARM 64비트)** | **자동 압축 해제 .BIN** | Linux 패키지 및 설치 스크립트 포함 | [⬇️ SafeKit 8.2 Linux BIN 파일 다운로드 (ARM)](<https://github.com/FR-LES-SAFEKIT-DEV/safekit-packages/releases/download/v8.2/safekitlinux_aarch64_8_2_5_4.bin> "Linux용 SafeKit 8.2 다운로드 \(표준 Linux 패키지 및 설치 스크립트가 포함된 자동 압축 해제 BIN 파일\)")  
  
### 🔑 SafeKit의 HA 평가판 키

다음 링크는 SafeKit을 사용한 고가용성 클러스터 테스트 및 설정을 위해 설계된 모든 기능을 갖춘 평가판에 대한 액세스를 제공합니다.

➡️ [SafeKit 고가용성 테스트를 위한 1개월 무료 평가판 키 받기](<https://safekit.eviden.com/resources/safekit-free-trial-licence-key-high-availability/> "SafeKit 고가용성 30일 무료 평가판 라이선스 키 요청")

### 📚 HA 클러스터를 위한 SafeKit 구성 가이드 {#config-guides-heading}

SafeKit 고가용성(HA) 클러스터를 설정하고 관리하는 데 필요한 필수 문서입니다.  


  * [SafeKit 빠른 설치 가이드](</quick-install/> "SafeKit 빠른 설치 가이드로 신속하게 시작하세요.")
  * [SafeKit 사용자 가이드 HTML (버전 8.2)](</resources/safekit-user-guide-82/> "SafeKit 버전 8.2의 종합 사용자 매뉴얼을 확인하세요 \(HTML\).") / [PDF 다운로드](<https://github.com/FR-LES-SAFEKIT-DEV/safekit-packages/releases/download/v8.2/SafeKit_8.2_User_Guide.pdf> "SafeKit 버전 8.2의 종합 사용자 매뉴얼을 확인하세요 \(PDF\).")
  * [SafeKit 릴리스 노트 HTML (버전 8.2)](</resources/safekit-release-notes-8-2/> "SafeKit 버전 8.2의 새로운 기능, 변경 사항 및 수정 내용을 확인하세요 \(HTML\).") / [PDF 다운로드](<https://github.com/FR-LES-SAFEKIT-DEV/safekit-packages/releases/download/v8.2/SafeKit_8.2_Release_Notes.pdf> "SafeKit 버전 8.2의 새로운 기능, 변경 사항 및 수정 내용을 확인하세요 \(PDF\).")
  * [SafeKit 8.2 소프트웨어 릴리스 게시물 (SRB)](<https://github.com/FR-LES-SAFEKIT-DEV/safekit-packages/releases/download/v8.2/SafeKit_8.2_Software_Release_Bulletin.pdf> "SafeKit 8.2에서 지원되는 OS 및 최근 수정 사항을 상세히 설명하는 공식 게시물입니다.")
  * [SafeKit 지식 베이스](<https://github.com/FR-LES-SAFEKIT-DEV/safekit-packages/releases/download/v8.2/SafeKit_8.2_Knowledge_Base.pdf> "SafeKit 지식 베이스: 문제 해결 팁 및 자주 묻는 질문에 대한 답변.")


### 📞/🤖 SafeKit 기술 지원 {#support}

  * 📞 [유료 지원](</resources/safekit-support/#standard-support>) / 🤖 [무료 지원](</resources/safekit-support/#ai-support>)


### 🎓 SafeKit 무료 교육 및 인증

당사의 무료 인증 프로그램을 통해 고가용성(HA) 분야에서 귀중한 전문 지식을 습득하십시오.

  * [SafeKit 고가용성 인증을 무료로 획득](<https://training.my.evidian.com/mod/page/view.php?id=712>)


### ℹ️ 제품 마케팅 문서

SafeKit HA 소프트웨어의 제품 마케팅 문서를 확인해 보세요. 자세한 데이터 시트, 제품 백서 및 기술 개요가 포함되어 있습니다.

  * [SafeKit 고가용성 클러스터 데이터 시트 (PDF)](</wp-content/uploads/documents/high-availability-overview.pdf>)
  * [고가용성 클러스터 기술 백서 (PDF)](</wp-content/uploads/documents/wp-safekit-en.pdf>)
  * [백서 – 고가용성 가이드 (PDF)](</wp-content/uploads/documents/wp-hadecision-en.pdf>)
  * [RFI 및 RFP용 기술 참조 자료](</resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/>)



<!-- END INSERT: insert-safekit-training-en lang="ko" display="content" -->
 


<!-- BEGIN INSERT: insert-safekit-modules-en lang="ko" display="content" -->
 

## SafeKit 애플리케이션 모듈 라이브러리: 즉시 사용 가능한 HA 솔루션 {#safekit-ha-application-modules}

이 표는 SafeKit 고가용성(HA) 솔루션을 애플리케이션 및 운영 환경(데이터베이스, 웹 서버, VM, 컨테이너, 클라우드)별로 정리해 보여줍니다. Windows 또는 Linux의 핵심 업무 애플리케이션에 대해 실시간 복제, 로드 밸런싱, 자동 페일오버를 구현하는 데 필요한 사전 구성된 `.safe` 모듈(예: `mirror.safe`, `farm.safe` 등)을 확인하세요. 빠른 설치 가이드로 바로 연결되는 링크를 통해 HA 클러스터 구성을 간소화할 수 있습니다.

SafeKit `.safe` 모듈은 특정 애플리케이션을 SafeKit 소프트웨어로 어떻게 클러스터링하고 보호할지 정의하는 사전 구성된 고가용성(HA) 템플릿입니다. 실제로는 구성 파일(`userconfig.xml`)과 재시작 스크립트를 포함한 zip 파일입니다.

**⚠️ 참고:** * `mirror.safe` 및 `farm.safe` 모듈은 SafeKit 설치 패키지에 기본 포함되어 있습니다

**SafeKit 고가용성(HA) 솔루션: 빠른 설치 가이드(.safe 모듈 다운로드 포함)**

애플리케이션 카테고리 | 솔루션 | 빠른 설치 가이드 | 애플리케이션 모듈  
---|---|---|---  
신규 애플리케이션 | [Windows 미러 클러스터 아키텍처](</solutions/windows-high-availability-software-synchronous-replication-failover/> "작동 방식: Windows 실시간 복제") | [Windows용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/> "Windows 실시간 복제 빠른 HA 설치 가이드 \(mirror.safe\)") | mirror.safe (Windows)*  
신규 애플리케이션 | [Linux 미러 클러스터 아키텍처](</solutions/linux-high-availability-software-synchronous-replication-failover/> "작동 방식: Linux 실시간 복제") | [Linux용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover/> "Linux 실시간 복제 빠른 HA 설치 가이드 \(mirror.safe\)") | mirror.safe (Linux)*  
신규 애플리케이션 | [Windows 로드 밸런싱 아키텍처](</solutions/windows-load-balancing-failover/> "작동 방식: Windows 네트워크 로드 밸런싱") | [Windows용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/> "Windows 네트워크 로드 밸런싱 빠른 HA 설치 가이드 \(farm.safe\)") | farm.safe (Windows)*  
신규 애플리케이션 | [Linux 로드 밸런싱 아키텍처](</solutions/linux-load-balancing-failover/> "작동 방식: Linux 네트워크 로드 밸런싱") | [Linux용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-network-load-balancing-and-failover/> "Linux 네트워크 로드 밸런싱 빠른 HA 설치 가이드 \(farm.safe\)") | farm.safe (Linux)*  
데이터베이스 | [Microsoft SQL Server 미러 클러스터 아키텍처](</solutions/sql-server-high-availability-synchronous-replication-failover/> "작동 방식: SQL Server 미러링") | [Microsoft SQL Server용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/> "SQL Server 클러스터 빠른 HA 설치 가이드") | <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/sqlserver.safe" download="sqlserver.safe">⬇️ sqlserver.safe</a> (Windows)  
데이터베이스 | [PostgreSQL 미러 클러스터 아키텍처](</solutions/postgresql-high-availability-synchronous-replication-failover/> "작동 방식: PostgreSQL 복제") | [PostgreSQL용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-with-postgresql/> "PostgreSQL 복제 빠른 HA 설치 가이드") |  <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/postgresql.safe" download="postgresql.safe">⬇️ postgresql.safe</a> (Windows)<br> <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/postgresql.safe" download="postgresql.safe">⬇️ postgresql.safe</a> (Linux)   
데이터베이스 | [MySQL 미러 클러스터 아키텍처](</solutions/mysql-high-availability-synchronous-replication-failover/> "작동 방식: MySQL 클러스터") | [MySQL용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-with-mysql/> "MySQL 클러스터 빠른 HA 설치 가이드") |  <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/mysql.safe" download="mysql.safe">⬇️ mysql.safe</a> (Windows)<br> <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/mysql.safe" download="mysql.safe">⬇️ mysql.safe</a> (Linux)   
데이터베이스 | [MariaDB 미러 클러스터 아키텍처](</solutions/mariadb-simplest-high-availability-cluster-synchronous-replication-failover-redundant-servers/> "작동 방식: MariaDB 클러스터") | [MariaDB용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-with-mariadb/> "MariaDB 클러스터 빠른 HA 설치 가이드") |  <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/mysql.safe" download="mysql.safe">⬇️ mysql.safe</a> (Windows)<br> <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/mysql.safe" download="mysql.safe">⬇️ mysql.safe</a> (Linux)   
데이터베이스 | [Oracle 미러 클러스터 아키텍처](</solutions/oracle-high-availability-synchronous-replication-failover/> "작동 방식: Oracle 페일오버") | [Oracle용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-with-oracle/> "Oracle 페일오버 클러스터 빠른 HA 설치 가이드") |  <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/oracle.safe" download="oracle.safe">⬇️ oracle.safe</a> (Windows)<br> <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/oracle.safe" download="oracle.safe">⬇️ oracle.safe</a> (Linux)   
데이터베이스 | [Firebird 미러 클러스터 아키텍처](</solutions/firebird-high-availability-synchronous-replication-failover/> "작동 방식: Firebird HA") | [Firebird용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-with-firebird/> "Firebird 빠른 HA 설치 가이드") |  <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/firebird.safe" download="firebird.safe">⬇️ firebird.safe</a> (Windows)<br> <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/firebird.safe" download="firebird.safe">⬇️ firebird.safe</a> (Linux)   
웹 서버 | [Apache 로드 밸런싱 아키텍처](</solutions/apache-load-balancing-failover-2/> "작동 방식: Apache 로드 밸런싱") | [Apache용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/> "Apache 로드 밸런싱 및 페일오버 빠른 HA 가이드") |  <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/apache_farm.safe" download="apache_farm.safe">⬇️ apache_farm.safe</a> (Windows)<br> <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/apache_farm.safe" download="apache_farm.safe">⬇️ apache_farm.safe</a> (Linux)   
웹 서버 | [IIS 로드 밸런싱 아키텍처](</solutions/iis-load-balancing-failover/> "작동 방식: IIS 로드 밸런싱") | [IIS용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-with-iis-with-network-load-balancing-and-failover/> "IIS 로드 밸런싱 및 페일오버 빠른 HA 가이드") | <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/iis_farm.safe" download="iis_farm.safe">⬇️ iis_farm.safe</a> (Windows)  
웹 서버 | [NGINX 로드 밸런싱 아키텍처](</solutions/nginx-the-simplest-load-balancing-cluster-with-failover/> "작동 방식: NGINX 로드 밸런싱") | [NGINX용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-with-nginx-with-network-load-balancing-and-failover/> "NGINX 로드 밸런싱 및 페일오버 빠른 HA 가이드") | farm.safe (Windows & Linux)*  
VM 및 컨테이너 | [Hyper-V VM HA 아키텍처](</solutions/hyper-v-replication-automatic-failover-load-balancing/> "작동 방식: Hyper-V 복제") | [Hyper-V용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-with-hyper-v/> "Hyper-V VM 복제 빠른 HA 설치 가이드") | <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv.safe" download="hyperv.safe">⬇️ hyperv.safe</a> (Windows)  
VM 및 컨테이너 | [KVM VM HA 아키텍처](</solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/> "작동 방식: KVM 복제") | [KVM용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-with-kvm/> "KVM VM 복제 빠른 HA 설치 가이드") | <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/kvm.safe" download="kvm.safe">⬇️ kvm.safe</a> (Linux)  
VM 및 컨테이너 | [Docker 컨테이너 HA 아키텍처](</solutions/docker-container-high-availability-cluster-synchronous-replication-failover/> "작동 방식: Docker 페일오버") | [Docker용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-with-docker/> "Docker 컨테이너 페일오버 빠른 HA 가이드") | mirror.safe (Linux)*  
VM 및 컨테이너 | [Podman 컨테이너 HA 아키텍처](</solutions/podman-the-simplest-high-availability-cluster-between-two-redundant-servers/> "작동 방식: Podman 페일오버") | [Podman용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-with-podman/> "Podman 컨테이너 페일오버 빠른 HA 가이드") | mirror.safe (Linux)*  
VM 및 컨테이너 | [Kubernetes K3S 클러스터 아키텍처](</solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/> "작동 방식: Kubernetes K3S") | [Kubernetes K3S용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-with-kubernetes/> "Kubernetes K3S 복제 빠른 HA 가이드") | <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s.safe" download="k3s.safe">⬇️ k3s.safe</a> (Linux)  
AWS 클라우드 | [AWS 미러 클러스터 아키텍처](</solutions/aws-high-availability-cluster-synchronous-replication-failover/> "작동 방식: AWS 복제 클러스터") | [AWS용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-in-aws-mirror-safe-module-for-real-time-replication-and-failover/> "AWS 복제 클러스터 빠른 HA 가이드 \(mirror.safe\)") | mirror.safe (Windows & Linux)*  
AWS 클라우드 | [AWS 로드 밸런싱 아키텍처](</solutions/aws-load-balancing-cluster-failover/> "작동 방식: AWS 로드 밸런싱") | [AWS용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-in-aws-with-network-load-balancing-and-failover/> "AWS 로드 밸런싱 클러스터 빠른 HA 가이드 \(farm.safe\)") | farm.safe (Windows & Linux)*  
GCP 클라우드 | [GCP 미러 클러스터 아키텍처](</solutions/gcp-high-availability-cluster-synchronous-replication-failover/> "작동 방식: GCP 복제 클러스터") | [GCP용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-in-gcp-with-real-time-replication-and-failover/> "GCP 복제 클러스터 빠른 HA 가이드 \(mirror.safe\)") | mirror.safe (Windows & Linux)*  
GCP 클라우드 | [GCP 로드 밸런싱 아키텍처](</solutions/gcp-load-balancing-cluster-failover/> "작동 방식: GCP 로드 밸런싱") | [GCP용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-in-gcp-with-network-load-balancing-and-failover/> "GCP 로드 밸런싱 클러스터 빠른 HA 가이드 \(farm.safe\)") | farm.safe (Windows & Linux)*  
Azure 클라우드 | [Azure 미러 클러스터 아키텍처](</solutions/azure-high-availability-cluster-synchronous-replication-failover/> "작동 방식: Azure 복제 클러스터") | [Azure용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-in-azure-with-real-time-replication-and-failover/> "Azure 복제 클러스터 빠른 HA 가이드 \(mirror.safe\)") | mirror.safe (Windows & Linux)*  
Azure 클라우드 | [Azure 로드 밸런싱 아키텍처](</solutions/azure-load-balancing-cluster-failover/> "작동 방식: Azure 로드 밸런싱") | [Azure용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-in-azure-with-network-load-balancing-and-failover/> "Azure 로드 밸런싱 클러스터 빠른 HA 가이드 \(farm.safe\)") | farm.safe (Windows & Linux)*  
클라우드 | [클라우드 미러 클러스터 아키텍처](</solutions/cloud-high-availability-cluster-synchronous-replication-failover/> "작동 방식: 클라우드 복제 클러스터") | [클라우드용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-in-cloud-with-real-time-replication-and-failover/> "클라우드 복제 클러스터 빠른 HA 가이드 \(mirror.safe\)") | mirror.safe (Windows & Linux)*  
클라우드 | [클라우드 로드 밸런싱 아키텍처](</solutions/cloud-load-balancing-cluster-failover/> "작동 방식: 클라우드 로드 밸런싱") | [클라우드용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-in-cloud-with-network-load-balancing-and-failover/> "클라우드 로드 밸런싱 클러스터 빠른 HA 가이드 \(farm.safe\)") | farm.safe (Windows & Linux)*  
물리 보안 / VMS | [Milestone XProtect 미러 클러스터 아키텍처](</solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/> "작동 방식: Milestone XProtect 페일오버") | [Milestone XProtect용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server/> "Milestone XProtect 관리 서버 페일오버 빠른 HA 가이드") | <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/milestone.safe" download="milestone.safe">⬇️ milestone.safe</a> (Windows)  
물리 보안 / VMS | [Nedap AEOS 미러 클러스터 아키텍처](</solutions/nedap-high-availability-synchronous-replication-failover/> "작동 방식: Nedap AEOS 페일오버") | [Nedap AEOS용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-with-nedap/> "Nedap AEOS 페일오버 빠른 HA 가이드") | <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/nedap.safe" download="nedap.safe">⬇️ nedap.safe</a> (Windows)  
물리 보안 / VMS | [Genetec SQL 미러 클러스터 아키텍처](</solutions/sql-server-high-availability-synchronous-replication-failover/> "작동 방식: Genetec SQL 페일오버") | [Genetec(SQL Server)용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/> "Genetec SQL Server 페일오버 빠른 HA 가이드") | <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/sqlserver.safe" download="sqlserver.safe">⬇️ sqlserver.safe</a> (Windows)  
물리 보안 / VMS | [Bosch AMS VM HA 아키텍처](</solutions/bosch-ams-the-simplest-high-availability-cluster-between-two-redundant-servers-without-shared-disk/> "작동 방식: Bosch AMS HA") | [Bosch AMS용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-with-hyper-v/> "Bosch AMS Hyper-V 페일오버 빠른 HA 가이드") | <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv.safe" download="hyperv.safe">⬇️ hyperv.safe</a> (Windows)  
물리 보안 / VMS | [Bosch BIS VM HA 아키텍처](</solutions/bosch-bis-the-simplest-high-availability-cluster-between-two-redundant-servers-without-shared-disk/> "작동 방식: Bosch BIS HA") | [Bosch BIS용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-with-hyper-v/> "Bosch BIS Hyper-V 페일오버 빠른 HA 가이드") | <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv.safe" download="hyperv.safe">⬇️ hyperv.safe</a> (Windows)  
물리 보안 / VMS | [Bosch BVMS VM HA 아키텍처](</solutions/bosch-bvms-the-simplest-high-availability-cluster-between-two-redundant-servers-without-shared-disk/> "작동 방식: Bosch BVMS HA") | [Bosch BVMS용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-with-hyper-v/> "Bosch BVMS Hyper-V 페일오버 빠른 HA 가이드") | <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv.safe" download="hyperv.safe">⬇️ hyperv.safe</a> (Windows)  
물리 보안 / VMS | [Hanwha Vision VM HA 아키텍처](</solutions/hanwha-vision-cluster-without-shared-storage-on-a-san/> "작동 방식: Hanwha Vision HA") | [Hanwha Vision용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-with-hyper-v/> "Hanwha Vision Hyper-V 페일오버 빠른 HA 가이드") | <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv.safe" download="hyperv.safe">⬇️ hyperv.safe</a> (Windows)  
물리 보안 / VMS | [Hanwha Wisenet VM HA 아키텍처](</solutions/hanwha-wisenet-wave-the-simplest-high-availability-cluster-between-two-redundant-servers-without-shared-disk/> "작동 방식: Hanwha Wisenet HA") | [Hanwha Wisenet용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-with-hyper-v/> "Hanwha Wisenet Hyper-V 페일오버 빠른 HA 가이드") | <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv.safe" download="hyperv.safe">⬇️ hyperv.safe</a> (Windows)  
Siemens 제품 | [Siemens Siveillance VM HA 아키텍처](</solutions/siemens-siveillance-redundancy-high-availability-cluster-active-active/> "작동 방식: Siemens Siveillance suite HA") | [Siemens Siveillance suite용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-with-hyper-v/> "Siemens Siveillance suite Hyper-V 페일오버 빠른 HA 가이드") | <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv.safe" download="hyperv.safe">⬇️ hyperv.safe</a> (Windows)  
Siemens 제품 | [Siemens Desigo CC VM HA 아키텍처](</solutions/siemens-desigo-cc-redundancy-high-availability-cluster-active-active/> "작동 방식: Siemens Desigo CC HA") | [Siemens Desigo CC용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-with-hyper-v/> "Siemens Desigo CC Hyper-V 페일오버 빠른 HA 가이드") | <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv.safe" download="hyperv.safe">⬇️ hyperv.safe</a> (Windows)  
Siemens 제품 | [Siemens Siveillance 미러 클러스터 아키텍처](</solutions/siemens-siveillance-vms-the-simplest-high-availability-cluster-between-two-redundant-servers/> "작동 방식: Siemens Siveillance VMS 페일오버") | [Siemens Siveillance VMS용 빠른 설치 가이드](</solutions/siemens-siveillance-vms-the-simplest-high-availability-cluster-between-two-redundant-servers/> "Siemens Siveillance VMS 페일오버 빠른 HA 가이드") | <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/SiveillanceVMS.safe" download="SiveillanceVMS.safe">⬇️ SiveillanceVMS.safe</a> (Windows)  
Siemens 제품 | [Siemens SiPass VM HA 아키텍처](</solutions/siemens-sipass-redundancy-high-availability-cluster-active-active/> "작동 방식: Siemens SiPass HA") | [Siemens SiPass용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-with-hyper-v/> "Siemens SiPass Hyper-V 페일오버 빠른 HA 가이드") | <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv.safe" download="hyperv.safe">⬇️ hyperv.safe</a> (Windows)  
Siemens 제품 | [Siemens SIPORT VM HA 아키텍처](</solutions/siemens-siport-redundancy-high-availability-cluster-active-active/> "작동 방식: Siemens SIPORT HA") | [Siemens SIPORT용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-with-hyper-v/> "Siemens SIPORT Hyper-V 페일오버 빠른 HA 가이드") | <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv.safe" download="hyperv.safe">⬇️ hyperv.safe</a> (Windows)  
Siemens 제품 | [SIMATIC PCS 7 VM HA 아키텍처](</solutions/siemens-simatic-pcs-7-redundancy-high-availability-cluster-active-active/> "작동 방식: Siemens SIMATIC PCS 7 HA") | [Siemens SIMATIC PCS 7용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-with-hyper-v/> "Siemens SIMATIC PCS 7 Hyper-V 페일오버 빠른 HA 가이드") | <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv.safe" download="hyperv.safe">⬇️ hyperv.safe</a> (Windows)  
Siemens 제품 | [SIMATIC WinCC VM HA 아키텍처](</solutions/siemens-simatic-wincc-redundancy-high-availability-cluster-active-active/> "작동 방식: Siemens SIMATIC WinCC HA") | [Siemens SIMATIC WinCC용 빠른 설치 가이드](</quick-install/safekit-quick-installation-guide-with-hyper-v/> "Siemens SIMATIC WinCC Hyper-V 페일오버 빠른 HA 가이드") | <a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_windows/hyperv.safe" download="hyperv.safe">⬇️ hyperv.safe</a> (Windows)  
  

<!-- END INSERT: insert-safekit-modules-en lang="ko" display="content" -->
 


<!-- BEGIN INSERT: insert-safekit-4-buttons-en lang="ko" display="content" -->
<div class="button-row">
  <a class="btn-action" href="https://safekit.eviden.com/contact-us-for-safekit/">🧑 문의하기</a>
  <a class="btn-action" href="/resources/safekit-free-trial/">🎁 SafeKit 무료 체험판</a>
  <a class="btn-action" href="https://training.my.evidian.com/mod/page/view.php?id=712">🏅 무료 인증</a>
  <a class="btn-action" href="https://safekit.eviden.com/get-a-quote-safekit/">💰 영구 라이선스 비용</a>
</div>
<!-- END INSERT: insert-safekit-4-buttons-en lang="ko" display="content" -->