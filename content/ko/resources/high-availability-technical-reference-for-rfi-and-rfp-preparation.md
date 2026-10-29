---
title: "RFI 및 RFP 준비를 위한 고가용성 기술 참조 자료"
canonical: "https://safekit.eviden.com/ko/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "SafeKit의 개념과 아키텍처를 활용하여 고가용성 및 애플리케이션 클러스터링을 위한 RFI 및 RFP 문서를 준비하는 데 도움이 되는 기술 참고 자료입니다."
category: "resources"
lang: "ko"
topics: "개요, 목차, 제품 정보, 지원 운영 체제 및 플랫폼, 사전 구축된 애플리케이션 모듈, 아키텍처 및 배포 모델, RPO 및 RTO 기능, 원격 사이트 및 분산 배포 적합성, 모니터링, 관리 및 경고, 보안 및 규정 준수, 라이선스 모델, 지원 및 유지 관리 SLA, 대안과의 비교, 빠른 참조 링크"
---

# RFI 및 RFP 준비를 위한 고가용성 기술 참조 자료 {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## 개요 {#overview}

이 페이지는 RFP/RFI 관련 일반적인 질문에 대한 체계적이고 사실적인 답변을 제공합니다. SafeKit 고가용성 소프트웨어에 대한 기술 참고 자료입니다. 조달팀과 솔루션 설계자가 고가용성 요구사항을 작성할 때 활용하기 좋습니다. 

## 목차 {#table-of-contents}

  1. [제품 식별](#product-identity)
  2. [지원되는 운영 체제 및 플랫폼](#supported-operating-systems-platforms)
  3. [사전 구축된 애플리케이션 모듈](#pre-built-application-modules)
  4. [아키텍처 및 배포 모델](#architecture-deployment-model)
  5. [RPO 및 RTO 기능](#rpo-rto-capabilities)
  6. [원격 사이트 및 분산 배포에 적합](#edge-distributed-deployment-suitability)
  7. [모니터링, 관리 및 알림](#monitoring-management-alerting)
  8. [보안 및 규정 준수](#security-compliance)
  9. [라이선싱 모델](#licensing-model)
  10. [지원 및 유지보수 SLA](#support-maintenance-slas)
  11. [비교 vs. 대안](#comparison-vs-alternatives)
  12. [빠른 참조 링크](#quick-reference-links)


## 제품 식별 {#product-identity}

필드 | 답변  
---|---  
제품명 | SafeKit  
공급업체 | Eviden(Atos 계열사), 이전 명칭은 Evidian  
제품 카테고리 | 애플리케이션 클러스터링/고가용성/재해 복구 소프트웨어  
현재 버전 | SafeKit 8.2  
웹사이트 | [https://safekit.eviden.com/ko](/ko/)  
첫 번째 릴리스 | 2000년 (20년 이상 생산)  
  
## 지원되는 운영 체제 및 플랫폼 {#supported-operating-systems-platforms}

Windows OS | Linux OS | 인프라 및 가상화 | 클라우드 플랫폼  
---|---|---|---  
• Windows 서버 2025(x86-64)<br>• Windows 서버 2022(x86-64)<br>• Windows 서버 2019 (x86-64)<br>• Windows 11 엔터프라이즈(x86-64)<br>• Windows 11 Pro (x86-64)  |  • 레드햇 엔터프라이즈 Linux 10 (x86-64)<br>• 레드햇 엔터프라이즈 Linux 10 (AArch64)<br>• 레드햇 엔터프라이즈 Linux 9 (x86-64)<br>• 레드햇 엔터프라이즈 Linux 9 (AArch64)<br>• 레드햇 엔터프라이즈 Linux 8 (x86-64)<br>• 우분투 24.04 LTS (x86-64)  |  • 모든 브랜드의 엣지 서버<br>• VMware<br>• Microsoft 하이퍼-V*<br>• Linux KVM*<br>• 모든 하이퍼바이저<br>• Docker 컨테이너<br>• Podman 컨테이너  |  • 아마존 웹 서비스(AWS)\*\*<br>• Microsoft Azure\*\*<br>• 구글 클라우드 플랫폼 (GCP)\*\*<br>• 표준 VM 인스턴스를 제공하는 모든 IaaS 클라우드   
  
_* SafeKit supports both application-level HA and VM-level HA._

_** Virtual IPs must be configured at the Cloud load balancer level._

## 사전 구축된 애플리케이션 모듈 {#pre-built-application-modules}

SafeKit 즉시 사용 가능한 사전 구성이 포함되어 있습니다. `.safe` 모듈들은 두 가지 고가용성(HA) 전략으로 구성됩니다. **애플리케이션 HA** (직접 애플리케이션 클러스터링 포함) mirror 또는 `farm` 모듈) 및 **가상화 고가용성** (VM 수준 클러스터링 포함) hyperv.safe 또는 kvm.safe).

 | 애플리케이션 HA | VM 수준 고가용성(HA)  
---|---|---  
구성 | 이를 위해서는 애플리케이션 자체에 대한 기술적 이해가 필요합니다. 즉, 어떤 서비스를 재시작해야 하는지, 실시간 복제가 필요한 특정 애플리케이션 폴더는 무엇인지, 그리고 장애 조치를 위한 가상 IP 주소를 어떻게 구성해야 하는지 등을 알아야 합니다. | 가상 머신에서 실행되는 모든 애플리케이션/운영체제에 적용 가능한 범용 솔루션입니다. 가상 머신에 설치된 애플리케이션에 대한 기술적 지식이 필요하지 않습니다. 애플리케이션 작동 방식을 모르는 경우에 가장 적합한 솔루션입니다. 가상 머신 파일의 위치만 지정하면 됩니다.  
~에 이상적입니다 | 하드웨어 또는 하이퍼바이저와 관계없이 소프트웨어 솔루션에 고가용성을 직접 내장하는 데 이상적입니다. | 여러 VM에 걸쳐 다양한 애플리케이션이 실행되는 복잡한 환경을 단일 고가용성(HA) 정책으로 관리하는 데 이상적입니다.  
  
아래 표에는 사용 가능한 모든 항목이 나열되어 있습니다. `.safe` 모듈:

애플리케이션 HA(애플리케이션 수준 클러스터링) | 가상화 고가용성(VM 수준 클러스터링)  
---|---  
새로운 Windows 앱 - mirror.safe | Hyper-V VM — hyperv.safe (Windows)  
새로운 Linux 앱 - mirror.safe | KVM VM — kvm.safe (Linux)  
Windows 부하 분산 — farm.safe | Docker 컨테이너 — mirror.safe (Linux)  
Linux 부하 분산 — farm.safe | Podman 컨테이너 — mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | Kubernetes / K3s — k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows & Linux) | 보쉬 AMS — hyperv.safe (Windows)  
MySQL — mysql.safe (Windows & Linux) | 보쉬 BIS — hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows & Linux) | 보쉬 BVMS — hyperv.safe (Windows)  
Oracle — oracle.safe (Windows & Linux) | 한화 비전 — hyperv.safe (Windows)  
Firebird — firebird.safe (Windows & Linux) | 한화 위즈넷 — hyperv.safe (Windows)  
아파치 — apache_farm.safe (Windows & Linux) | 지멘스 감시 제품군 — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | 지멘스 데시고 CC — hyperv.safe (Windows)  
NGINX — farm.safe (Windows & Linux) | 지멘스 SiPass — hyperv.safe (Windows)  
Milestone XProtect — milestone.safe (Windows) | 지멘스 SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
제네텍(SQL Server) — sqlserver.safe (Windows) | 시매틱 윈CC — hyperv.safe (Windows)  
지멘스 감시 VMS — SiveillanceVMS.safe (Windows) |   
구름 (AWS, Azure, GCP(일반적인) — mirror.safe / farm.safe |   
  
## 아키텍처 및 배포 모델 {#architecture-deployment-model}

### 두 개의 클러스터 모듈: mirror.safe 그리고 farm.safe {#two-cluster-modules}

기준 치수 | 무늬 | 사용 사례  
---|---|---  
mirror.safe | 동기식 바이트 수준 파일 복제 및 자동 장애 조치를 지원하는 액티브-패시브 방식 | 데이터베이스, 상태 저장 애플리케이션, 한 번에 하나의 서버에서만 실행되는 서비스  
farm.safe | 네트워크 로드 밸런싱 및 자동 장애 조치를 지원하는 액티브-액티브 구성입니다. | 웹 서버, 상태 비저장 마이크로서비스, API 게이트웨이, 여러 서버에서 동시에 실행되는 서비스  
  
### 클러스터 인프라 및 아키텍처 {#cluster-infrastructure-architecture}

요구사항/사양 | SafeKit 역량/가치  
---|---  
공유 스토리지 필요하신가요? | 아니요 — SAN이 없는 "공유 없음" 아키텍처입니다. 로컬 디스크만 사용합니다.  
Active Directory(AD) 필수 조건인가요? | 아니요, 필요하지 않습니다. Windows 도메인 또는 Active Directory를 지원합니다. 워크그룹도 완벽하게 지원됩니다.  
클러스터 크기 | 2개 노드(mirror) 또는 2개 이상의 노드(`farm`)  
가상 IP(VIP) | 소프트웨어 정의 VIP는 Gratuitous ARP를 통해 활성 노드로 자동으로 마이그레이션됩니다(애플리케이션 레벨 HA). VM 레벨 HA의 경우 VM 내부의 물리적 IP가 투명하게 재라우팅되므로 VIP가 필요하지 않습니다. 노드 간에 LAN, VLAN 또는 확장된 VLAN이 필요합니다.  
3노드 하이브리드 아키텍처 | SafeKit HA 계층을 다룹니다: 2노드 mirror LAN 또는 확장된 VLAN을 통해 동기식 복제(RPO=0) 및 자동 장애 조치를 지원하는 클러스터를 구성합니다. 타사 백업 솔루션이 아키텍처를 완성합니다. 이 솔루션에는 특정 시점 복구 및 랜섬웨어 보호를 위한 WAN을 통한 비동기식 복제 기능을 갖춘 제3의 원격 노드가 포함됩니다.  
고가용성의 역할 | SafeKit 동기식 복제 방식을 사용하여 하드웨어 또는 소프트웨어 오류 발생 시 데이터 손실 없이 즉각적인 장애 조치를 보장합니다. 하지만 데이터를 두 노드에 동시에 기록하기 때문에 논리적 오류, 데이터 손상 또는 실수로 인한 삭제를 대기 노드에 실시간으로 정확하게 복제합니다.  
백업의 역할 | 백업 솔루션(구현되지 않음) SafeKit이 기능은 비동기 복제를 통해 특정 시점 복구를 제공합니다. 고가용성(HA)이 차단할 수 없는 데이터 무결성 위협(랜섬웨어 또는 사용자 오류 등)으로부터 데이터를 보호합니다. 데이터 롤백은 본질적으로 데이터 손실을 수반하므로 자동 장애 조치는 지원되지 않습니다.  
클러스터당 최대 동시 모듈 | 32 — 이 제한은 최대 개수를 나타냅니다. SafeKit 2노드 클러스터에서 동시에 관리되는 모듈은 일반적으로 VM 수준의 고가용성(HA) 구성에 사용되며, 각 모듈은 서로 다른 VM을 복제하고 재시작합니다. 각 모듈은 두 노드 중 하나에서 기본 모듈로 독립적으로 실행될 수 있어 두 서버에 걸쳐 워크로드를 분산할 수 있습니다. 참고: 모든 VM의 총 데이터 용량은 장애 조치 또는 노드 재시작 후 재동기화 시간에 직접적인 영향을 미칩니다.  
에이전트 기반 방식인가, 에이전트리스 방식인가? | 에이전트 기반 — 각 노드에 설치되는 경량 소프트웨어  
애플리케이션에 구애받지 않나요? | 네, 모든 것을 보호합니다. Windows 서비스 또는 Linux 데몬; 30개 이상의 애플리케이션을 위한 사전 구축된 모듈  
  
### 복제 및 데이터 보호 {#replication-data-protection}

요구사항/사양 | SafeKit 역량/가치  
---|---  
복제 방법 | 바이트 단위 파일 복제(블록 단위 디스크 복제 아님)  
복제 모드 | 동기식(데이터 손실 없음)  
네트워크 요구 사항 | 동기 복제의 경우 노드 간 왕복 지연 시간이 5ms 미만인 것이 좋습니다.  
권장 데이터 용량 | 수 테라바이트(재동기화 시간)  
권장 파일 개수 | 파일 수 1,000,000개 미만 (재동기화 시간)  
재동기화 속도(1TB) | 1Gb/s 네트워크에서 약 3시간, 10Gb/s 네트워크에서 약 1시간 사용 가능  
선택적 복제 | 예, 특정 디렉터리/파일을 복제합니다.  
전송 중 암호화 | 예, 복제 트래픽에 TLS/SSL을 사용합니다.  
  
## RPO 및 RTO 기능 {#rpo-rto-capabilities}

### 클러스터 유형별 RPO 및 RTO {#rto-rpo-cluster-type}

미터법 | Mirror 무리 (mirror.safe) | `Farm` 무리 (farm.safe)  
---|---|---  
RPO(복구 시점 목표) | 0(데이터 손실 없음) — 동기식 복제; 양쪽 노드 모두 확인한 후에만 쓰기 승인이 이루어집니다. | 해당 없음 (상태 비저장; 데이터는 백엔드에서 처리됨) mirror)  
RTO(복구 시간 목표) | 약 1분 — 하트비트 타임아웃(기본값 30초) + 애플리케이션 재시작 시간 | 몇 초 만에 트래픽이 살아남은 활성 노드로 즉시 재분배됩니다.  
복제 유형 | 동기식, 실시간, 바이트 수준 파일 복제 | 해당 사항 없음  
장애 조치 트리거 | 하트비트 손실, 프로세스 충돌 또는 검사기 오류 발생 시 자동으로 실행됩니다. | 하트비트 손실, 프로세스 충돌 또는 검사기 오류 발생 시 자동으로 실행됩니다.  
수동 개입이 필요합니까? | 아니요 — 완전 자동 장애 조치 및 복구 기능입니다. | 아니요 — 완전 자동 장애 조치 및 복구 기능입니다.  
  
### RTO 고장 (Mirror — 애플리케이션 레벨 고가용성) {#rto-breakdown-mirror-application-level-ha}

고장 유형 | RTO 계산  
---|---  
하드웨어 오류 | 하트비트 타임아웃(기본값 30초) + 애플리케이션 재시작 시간  
소프트웨어/프로세스 충돌 | 애플리케이션 종료 시간 + 애플리케이션 재시작 시간  
OS 수준 충돌 | 하트비트 타임아웃 + 보조 서버에서 OS가 이미 실행 중 → 재부팅 페널티 없음  
  
### RTO 고장 (Mirror — VM 레벨 고가용성) {#rto-breakdown-mirror-vm-level-ha}

고장 유형 | RTO 계산  
---|---  
어떤 실패라도 | 오류 감지 + 운영체제 전체 재부팅 + 애플리케이션 재시작 (일반적으로 몇 분 소요)  
  
## 원격 사이트 및 분산 배포에 적합 {#edge-distributed-deployment-suitability}

SafeKit 이 제품은 엣지 컴퓨팅, 지점 사무실 및 분산형 엔터프라이즈 시나리오에 맞게 특별히 설계되었습니다.

엣지 요구사항 | SafeKit 답변  
---|---  
현장에 전담 IT 직원이 없습니다. | 예, 자동 장애 조치 기능이 있어 수동 개입이 필요 없습니다.  
SAN/NAS 인프라 없음 | 예, SAN이 없고 로컬 디스크만 사용합니다.  
원격 관리 | 예 — 웹 콘솔 관리  
하드웨어 요구 사항 최소화 | 예, 일반 서버 또는 가상 머신 2대면 되고, 특별한 하드웨어는 필요하지 않습니다.  
방화벽/NAT 뒤에서도 작동합니다. | 예, 포트 설정 가능, HTTPS 기반 콘솔  
다중 사이트 재해 복구 | 예 - mirror 확장된 VLAN을 통해 두 지리적 위치 간에  
OEM/임베디드 배포 | 예 — 무인 설치, 스크립트 작성 가능, 소프트웨어 게시자가 내장할 수 있음  
수백 개의 분산 클러스터 | 네, 여러 지점을 가진 분산형 기업을 위해 설계되었습니다.  
  
이상적인 엣지 사용 사례: 데이터센터가 없지만 고가용성이 여전히 중요한 모든 사이트.

수직의 | 일반적인 경계 사이트 | 중요 응용  
---|---|---  
물리적 보안 및 감시 | 건물, 캠퍼스, 공항 | VMS — Milestone, 제네텍, 한화, 지멘스 감시  
건물 관리 시스템(BMS) | 사무실 건물, 병원, 공장 | 지멘스 Desigo CC, 보쉬 BIS/BVMS  
전자 접근 제어 시스템(EACS) | 보안 시설, 캠퍼스 | 지멘스 시패스, Nedap보쉬 AMS  
SCADA 및 산업 제어 | 공장, 변전소, 정수장 | SCADA, DCS 또는 HMI 소프트웨어가 실행되는 모든 환경 Windows 또는 Linux  
항공교통관제(ATC) | 공항, 관제탑 | 관제 관리 및 레이더 시스템  
운영 통제 센터(OCC) | 지하철, 철도, 환승 허브 | 철도 신호 및 역 관리  
해양 | 배, 해군 함정 | 항해, 화물 및 선박 관리 시스템  
석유 및 가스 | 해상 플랫폼, 원격 시추 시설 | 공정 제어 및 안전 시스템  
통신 | 5G 안테나 사이트, MEC 노드 | 다중 액세스 에지 컴퓨팅(MEC) 서버  
의료 서비스 | 진료소, 원격 진단 센터 | 의료 영상, 환자 데이터, 원격 진단  
소매 | 매장, 지점, 창고 | 판매 시점 관리 및 재고 관리  
방어 | 전방작전기지, 야전부대 | 임무 수행에 필수적인 지휘 및 통신 시스템  
  
## 모니터링, 관리 및 알림 {#monitoring-management-alerting}

능력 | 세부  
---|---  
웹 콘솔 | 웹 앱 또는 프로그레시브 웹 앱(PWA)의 클러스터 노드 구성, 모니터링 및 관리  
모바일 알림 | 브라우저 상태 변경에 대한 푸시 알림  
주별 타임라인 | 모듈 상태 및 이벤트의 시각적 타임라인  
이메일 알림 | 알림용 내장 이메일 에이전트  
CLI 관리 | 스크립팅 및 자동화를 위한 완벽한 명령줄 인터페이스  
로그 관리 | 모듈별, 스크립트별 로그 파일, 지원을 위한 디버그 스냅샷  
타사 모니터링 통합 | SafeKit 클러스터의 모든 주요 이벤트를 자동으로 기록합니다. Windows 이벤트 로그 또는 Linux Syslog를 사용하면 Nagios, Zabbix, Splunk 및 SIEM 솔루션을 포함한 모든 모니터링 플랫폼에서 사용자 지정 개발 없이 표준 알림 규칙에 따라 이러한 이벤트를 수집하고 경보를 발생시킬 수 있습니다.  
  
## 보안 및 규정 준수 {#security-compliance}

특징 | 세부  
---|---  
HTTPS 콘솔 액세스 | 예, 웹 콘솔용 TLS 인증서  
사용자 인증 | 로컬 계정, LDAP, PKI/인증서 기반, OpenID Connect  
사용자 역할 | 관리자, 제어 및 모니터링 역할에 대한 구성 가능한 액세스 정책  
암호화 | TCP(복제, 웹 콘솔, 분산 명령)에는 TLS/SSL을 사용하고 UDP(하트비트, SafeAdmin 내부 프로토콜)에는 AES-128-CBC + SHA256 대칭 암호화를 사용합니다. 암호화는 OpenSSL 라이브러리를 기반으로 합니다. 웹 서비스는 Apache를 기반으로 합니다.  
바이러스 백신 호환성 | 문서화된 제외 경로  
주권 | 유럽 기업인 Eviden(Atos Group)은 다음과 같은 서비스를 제공합니다. SafeKit 독자적인 국가 차원의 사업 연속성 및 재해 복구 제품 Windows 그리고 Linux — NIS2의 비즈니스 연속성 및 재해 복구 요건에 맞춰 데이터와 장애 조치 인프라를 미국 공급업체에 의존하지 않고 완전히 사내에 유지합니다.  
  
## 라이선싱 모델 {#licensing-model}

측면 | 세부  
---|---  
라이선스 유형 | 호스트 이름을 기반으로 하는 영구 라이선스(일회성 구매)  
라이선스 범위 | 서버(노드)당  
라이선스 활성화 | 오프라인 활성화가 지원되므로 라이선스 키 활성화에 인터넷 연결이 필요하지 않습니다.  
무료 체험 | 네, 모든 기능을 무료로 체험해 보실 수 있습니다.  
한 달 무료 라이선스 | 개념 증명용으로 사용 가능합니다.  
  
## 지원 및 유지보수 SLA {#support-maintenance-slas}

### 표준 지원 및 유지보수 (유효한 유지보수 계약에 포함됨) {#standard-support-maintenance-included-with-active-maintenance-contract}

서비스 | 세부  
---|---  
지원 포털 액세스 | 최대 4명의 기술 담당자를 지정할 수 있는 연중무휴 24시간 웹 포털  
실시간 지원 시간 | 유럽 지원 센터 운영 시간: 월요일~금요일 오전 9시~오후 5시  
사건 확인 | 지원 센터 근무 시간 4시간 이내  
업데이트 및 업그레이드 | 모든 서비스 팩, 업데이트 및 업그레이드가 추가 비용 없이 포함됩니다.  
라이선스 키 교체 | 활성 지원 계약이 있는 경우 호스트 이름 변경 시 라이선스 키를 재할당할 수 있습니다. 라이선스 이전은 동일 프로젝트 내 서버 교체에 한하며, Eviden의 사전 서면 승인을 받아야 합니다.  
지식 기반 접근 | 기술 자료 문서, FAQ 및 온라인 설명서에 대한 전체 액세스 권한  
애플리케이션 시작/중지 없이 SafeKit | 네 — 멈추세요 SafeKit 그리고 래퍼 스크립트를 사용하여 애플리케이션을 시작하거나 중지합니다. 래퍼 스크립트는 애플리케이션의 시작/중지 스크립트를 호출하고 필요한 경우 가상 IP 주소를 구성하거나 제거합니다. 
지원 포털 | <https://customercare.evidian.com>  
  
### 무료 자료 (계약 불필요) {#free-resources-no-contract-required}

의지 | 세부  
---|---  
AI 지원 도우미 | [SafeKit AI 채팅](</ko/resources/safekit-support/#ai-support>) safekit.eviden.com 및 safekit.eviden.com을 사용하는 모든 LLM을 통해llms.txt  
온라인 교육 및 인증 | 무료, 자율 학습, 12개 영상(약 3시간 40분), 수료증 발급  
선적 서류 비치 | 전체 사용자 가이드, 릴리스 노트, 기술 자료, 빠른 시작 가이드  
  
## 비교 vs. 대안 {#comparison-vs-alternatives}

표준 | SafeKit | Microsoft 장애 조치 클러스터(WSFC) | VMware HA | 오픈 소스*  
---|---|---|---|---  
공유 스토리지(SAN/vSAN) 필요 | 아니요 | 예 | 예 | 아니요  
Windows 지원하다 | 예 | 예 | 예 | 아니요  
Linux 지원하다 | 예 | 아니요 | 예 | 예  
엣지/브랜치 배포 | 훌륭한 | 복잡한 | 복잡한 | 복잡한  
OEM 임베더블 | 예 | 아니요 | 아니요 | 아니요  
비용 | 노드별 영구 | Windows 서버 + SAN | vSphere Enterprise + SAN | 고수준 통합 서비스  
설정 복잡성 | 플러그 앤 플레이 | 높은 (AD, SAN, 증인) | 높음 (vCenter, 공유 스토리지) | 높은 (파편화된 제품)  
유지보수성 | 단일 제품, 웹 콘솔 | 높은 수준 (AD, SAN 전문 지식 필수) | 높음 (vCenter 의존성) | 높음 (유지보수를 위해 별도의 제품을 사용해야 함)  
  
_* On Linux, it takes 6 separate open-source projects — Corosync, Pacemaker, DRBD, Keepalived, STONITH, HAProxy — to replicate SafeKit's feature set on Linux only. SafeKit delivers the same capabilities in a single product, on both Windows and Linux._

## 빠른 참조 링크 {#quick-reference-links}

의지 | URL  
---|---  
제품 홈페이지 | [https://safekit.eviden.com/ko/](/ko/)  
기술 개요 (텍스트 및 다이어그램이 포함된 DOCX 파일) | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
무료 체험 | [https://safekit.eviden.com/ko/resources/safekit-free-trial/](</ko/resources/safekit-free-trial/>)  
견적 받기 | [https://safekit.eviden.com/ko/safekit-pricing/](</ko/safekit-pricing/>)  
지원 포털 | <https://customercare.evidian.com>  
무료 AI 지원 | [https://safekit.eviden.com/ko/resources/safekit-support/](</ko/resources/safekit-support/>)  
무료 교육 및 인증 | [https://safekit.eviden.com/ko/resources/safekit-on-line-training/](</ko/resources/safekit-on-line-training/>)  
저희에게 연락하세요 | [https://safekit.eviden.com/ko/contact-us-for-safekit/](</ko/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-en  %}}