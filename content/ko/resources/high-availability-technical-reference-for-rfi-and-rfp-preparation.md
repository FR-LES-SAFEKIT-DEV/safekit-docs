---
title: "RFI 및 RFP 준비를 위한 고가용성 기술 참조 자료"
canonical: "https://safekit.eviden.com/ko/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "SafeKit 개념 및 아키텍처를 활용한 고가용성 및 애플리케이션 클러스터링 관련 RFI 및 RFP 문서 작성에 도움이 되는 기술 참고 자료입니다."
category: "resources"
lang: "ko"
topics: "개요, 목차, 제품 정보, 지원 운영 체제 및 플랫폼, 사전 구축된 애플리케이션 모듈, 아키텍처 및 배포 모델, RPO 및 RTO 기능, 엣지 및 분산 배포 적합성, 모니터링, 관리 및 경고, 보안 및 규정 준수, 라이선스 모델, 지원 및 유지 관리 SLA, 대안과의 비교, 빠른 참조 링크"
---

# RFI 및 RFP 준비를 위한 고가용성 기술 참조 자료 {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## 개요 {#overview}

이 페이지는 SafeKit 고가용성 소프트웨어에 대한 일반적인 RFP/RFI 질문에 대해 체계적이고 사실적인 답변을 제공합니다. 조달팀과 솔루션 설계자가 고가용성 요구사항을 작성할 때 참고할 수 있는 기술 자료입니다. 

## 목차 {#table-of-contents}

  1. [ 제품 식별 번호 ](#product-identity)
  2. [ 지원 운영 체제 및 플랫폼 ](#supported-operating-systems-platforms)
  3. [ 사전 구축된 애플리케이션 모듈 ](#pre-built-application-modules)
  4. [ 아키텍처 및 배포 모델 ](#architecture-deployment-model)
  5. [ RPO 및 RTO 기능 ](#rpo-rto-capabilities)
  6. [ 엣지 및 분산 배포 적합성 ](#edge-distributed-deployment-suitability)
  7. [ 모니터링, 관리 및 알림 ](#monitoring-management-alerting)
  8. [ 보안 및 규정 준수 ](#security-compliance)
  9. [ 라이선스 모델 ](#licensing-model)
  10. [ 지원 및 유지 관리 SLA ](#support-maintenance-slas)
  11. [ 비교 vs. 대안 ](#comparison-vs-alternatives)
  12. [ 빠른 참조 링크 ](#quick-reference-links)


## 제품 식별 번호 {#product-identity}

필드 | 답변  
---|---  
제품명 | SafeKit  
벤더 | Eviden(Atos 사업부), 이전 Evidian  
제품 카테고리 | 애플리케이션 클러스터링/고가용성/재해 복구 소프트웨어  
현재 버전 | SafeKit 8.2  
웹사이트 | <https://safekit.eviden.com>  
최초 출시 | 2000 (20년 이상 생산)  
  
## 지원되는 운영 체제 및 플랫폼 {#supported-operating-systems-platforms}

Windows OS | Linux OS | 인프라 및 가상화 | 클라우드 플랫폼  
---|---|---|---  
• Windows Server 2025 (x86-64) <br> • Windows Server 2022 (x86-64) <br> • Windows Server 2019 (x86-64) <br> • Windows 11 Enterprise (x86-64) <br> • Windows 11 Pro (x86-64) | • Red Hat Enterprise Linux 10 (x86-64) <br> • Red Hat Enterprise Linux 10 (AArch64) <br> • Red Hat Enterprise Linux 9 (x86-64) <br> • Red Hat Enterprise 9 (AArch64) Linux • Red Hat Enterprise 8 (x86-64) Linux <br> • Ubuntu 24.04 LTS (x86-64 <br> | • 모든 브랜드의 엣지 서버 <br> • VMware <br> • Hyper-V Microsoft * <br> • KVM Linux * <br> • 모든 하이퍼바이저 <br> • 컨테이너 Docker <br> • Podman 컨테이너 | • Amazon Web Services ( AWS )\ * \ * <br> • Microsoft Azure \ * \ * <br> • Google Cloud Platform ( GCP )\ * \ * <br> • 표준 VM 인스턴스를 제공하는 모든 IaaS 클라우드   
  
_ * SafeKit 는 애플리케이션 수준 HA와 VM 수준 HA를 모두 지원합니다._

_ ** 가상 IP는 클라우드 로드 밸런서 수준에서 구성해야 합니다._

## 사전 구축된 애플리케이션 모듈 {#pre-built-application-modules}

SafeKit 에는 바로 사용할 수 있도록 사전 구성된 `.safe` 모듈이 포함되어 있습니다. 이 모듈들은 두 가지 고가용성(HA) 전략으로 구성됩니다. **애플리케이션 고가용성(HA)을,** mirror 또는 `farm` 모듈을 사용한 직접 애플리케이션 클러스터링을 지원합니다. **가상화 고가용성(HA)을,** hyperv.safe 또는 kvm.safe 를 사용한 VM 수준 클러스터링을 지원합니다.

 | 애플리케이션 고가용성(HA) | VM 수준 고가용성(HA)  
---|---|---  
| 구성은 애플리케이션 자체에 대한 기술적 이해가 필요합니다. 즉, 어떤 서비스를 재시작해야 하는지, 실시간 복제가 필요한 특정 애플리케이션 폴더는 무엇인지, 장애 조치를 위한 가상 IP 주소를 어떻게 구성해야 하는지 등을 알아야 합니다. | VM에서 실행되는 모든 애플리케이션/운영체제에 적용 가능한 일반적인 솔루션입니다. VM에 설치된 애플리케이션에 대한 기술적 이해가 필요하지 않으며, 애플리케이션 작동 방식을 모르는 경우에 가장 적합한 솔루션입니다. VM 파일의 위치만 지정하면 됩니다.  
| 는 하드웨어 또는 하이퍼바이저와 관계없이 소프트웨어 솔루션에 고가용성을 직접 내장하는 데 이상적입니다. | 단일 HA 정책을 통해 여러 VM에 걸쳐 여러 애플리케이션이 있는 복잡한 환경을 관리하는 데 이상적입니다.  
  
아래 표는 사용 가능한 모든 `.safe` 모듈 목록입니다.

애플리케이션 고가용성(애플리케이션 수준 클러스터링) | 가상화 고가용성(VM 수준 클러스터링)  
---|---  
새로운 Windows 앱 — mirror.safe | Hyper-V VM — hyperv.safe ( Windows )  
새로운 Linux 앱 — mirror.safe | KVM VM — kvm.safe ( Linux )  
Windows 로드 밸런싱 — farm.safe | Docker 컨테이너 — mirror.safe ( Linux )  
Linux 로드 밸런싱 — farm.safe | Podman 컨테이너 — mirror.safe ( Linux )  
Microsoft SQL Server — sqlserver.safe ( Windows ) | Kubernetes / K3s — k3s.safe ( Linux )  
PostgreSQL — postgresql.safe ( Windows & Linux ) | Bosch AMS — hyperv.safe ( Windows )  
MySQL — mysql.safe ( Windows & Linux ) | 보쉬 BIS — hyperv.safe ( Windows )  
MariaDB — mysql.safe ( Windows & Linux ) | 보쉬 BVMS — hyperv.safe ( Windows )  
Oracle — oracle.safe ( Windows & Linux ) | 한화비전 — hyperv.safe ( Windows )  
Firebird — firebird.safe ( Windows & Linux ) | 한화 위즈넷 — hyperv.safe ( Windows )  
Apache — apache_farm.safe ( Windows 및 Linux ) | Siemens 감시 제품군 — hyperv.safe ( Windows )  
IIS — iis_farm.safe ( Windows ) | Siemens Desigo CC — hyperv.safe ( Windows )  
NGINX — farm.safe ( Windows 및 Linux ) | Siemens SiPass — hyperv.safe ( Windows )  
Milestone XProtect — milestone.safe ( Windows ) | 지멘스 SIPORT — hyperv.safe ( Windows )  
Nedap AEOS — nedap.safe ( Windows ) | SIMATIC PCS 7 — hyperv.safe ( Windows )  
Genetec ( SQL Server ) — sqlserver.safe ( Windows ) | SIMATIC WinCC — hyperv.safe ( Windows )  
지멘스 감시 VMS — SiveillanceVMS.safe ( Windows ) |   
클라우드( AWS , Azure , GCP , 일반) — mirror.safe / farm.safe |   
  
## 아키텍처 및 배포 모델 {#architecture-deployment-model}

### 두 개의 클러스터 모듈: mirror.safe 및 farm.safe {#two-cluster-modules}

모듈 | 패턴 | 사용 사례  
---|---|---  
mirror.safe | 동기식 바이트 수준 파일 복제 및 자동 장애 조치를 지원하는 액티브-패시브 방식 | 한 번에 하나의 서버에서만 실행되는 데이터베이스, 상태 저장 애플리케이션, 서비스  
farm.safe | 네트워크 로드 밸런싱 및 자동 페일오버 기능을 갖춘 액티브-액티브 구성 | 웹 서버, 스테이트리스 마이크로서비스, API 게이트웨이, 여러 서버에서 동시에 실행되는 서비스  
  
### 클러스터 인프라 및 아키텍처 {#cluster-infrastructure-architecture}

요구사항/사양 | SafeKit 기능/가치  
---|---  
공유 스토리지 필요 | : 아니요 — SAN이 없는 "공유 없음" 아키텍처입니다. 로컬 디스크만 사용합니다.  
Active Directory(AD) 필수 조건인가요? | , Windows 이나 Active Directory가 필요하지 않습니다. 워크그룹이 완벽하게 지원됩니다.  
클러스터 크기 | 2개 노드( mirror ) 또는 2개 이상 노드( `farm` )입니다.  
가상 IP(VIP) | Gratuitous ARP(애플리케이션 수준 고가용성)를 통해 활성 노드로 자동으로 마이그레이션되는 소프트웨어 정의 VIP입니다. VM 수준 고가용성의 경우 VM 내부의 물리적 IP는 투명하게 재라우팅되므로 VIP가 필요하지 않습니다. 노드 간에 LAN, VLAN 또는 확장된 VLAN이 필요합니다.  
3노드 하이브리드 아키텍처 | SafeKit 는 고가용성(HA) 계층을 담당합니다. 2노드 클러스터 mirror )는 LAN 또는 확장된 VLAN을 통해 동기식 복제(RPO=0) 및 자동 페일오버 기능을 제공합니다. 타사 백업 솔루션이 아키텍처를 완성합니다. 이 솔루션은 특정 시점 복구 및 랜섬웨어 보호를 위해 WAN을 통한 비동기식 복제 기능을 갖춘 세 번째 원격 노드로 구성됩니다.  
고가용성 | SafeKit 의 역할은 동기식 복제를 사용하여 하드웨어 또는 소프트웨어 오류 발생 시 데이터 손실 없이 즉각적인 페일오버를 보장하는 것입니다. 또한, 데이터를 두 노드에 동시에 기록하기 때문에 논리적 오류, 데이터 손상 또는 실수로 인한 삭제를 대기 노드에 실시간으로 정확하게 복제합니다.  
백업 솔루션 | 의 역할 ( SafeKit 에서는 구현되지 않음)은 비동기 복제를 통해 특정 시점 복구를 제공합니다. 이는 고가용성(HA)에서 차단할 수 없는 데이터 무결성 위협(랜섬웨어 또는 사용자 오류 등)으로부터 데이터를 보호합니다. 데이터 롤백은 본질적으로 데이터 손실을 수반하므로 자동 페일오버는 지원되지 않습니다.  
클러스터당 최대 동시 모듈 수 | 32개 — 이 제한은 2노드 클러스터에서 동시에 관리할 수 있는 SafeKit 모듈의 최대 개수를 나타냅니다. 일반적으로 각 모듈이 서로 다른 VM을 복제하고 재시작하는 VM 수준 고가용성(HA) 구성에 사용됩니다. 각 모듈은 두 노드 중 하나에서 기본 모듈로 독립적으로 실행될 수 있으므로 두 서버에 걸쳐 워크로드를 분산할 수 있습니다. 참고: 모든 VM의 총 데이터 용량은 장애 조치 또는 노드 재시작 후 재동기화 시간에 직접적인 영향을 미칩니다.  
에이전트 기반 방식인가, 에이전트리스 방식인가? | 에이전트 기반 방식 — 각 노드에 설치되는 경량 소프트웨어  
애플리케이션에 구애받지 않나요? | 예 — 모든 Windows 서비스 또는 Linux 데몬을 보호합니다. 30개 이상의 애플리케이션용 사전 구축 모듈이 제공됩니다.  
  
### 복제 및 데이터 보호 {#replication-data-protection}

요구사항/사양 | SafeKit 기능/가치  
---|---  
복제 방식 | 바이트 수준 파일 복제(블록 수준 디스크 복제 아님)  
복제 모드 | 동기식(데이터 손실 없음)  
네트워크 요구 사항 | 동기 복제를 위해서는 노드 간 왕복 지연 시간이 5ms 미만이어야 합니다.  
권장 데이터 용량 | 수 테라바이트(재동기화 시간)  
권장 파일 개수: | 개 미만 (재동기화 시간)  
재동기화 속도(1TB) | 1Gb/s 네트워크에서 약 3시간, 10Gb/s 네트워크에서 약 1시간  
선택적 복제 | 예 — 특정 디렉터리/파일을 복제합니다  
전송 중 암호화 | 예 — 복제 트래픽에 TLS/SSL 사용  
  
## RPO 및 RTO 기능 {#rpo-rto-capabilities}

### 클러스터 유형별 RPO 및 RTO {#rto-rpo-cluster-type}

메트릭 | Mirror 클러스터 ( mirror.safe ) | `Farm` 클러스터 ( farm.safe )  
---|---|---  
RPO(복구 시점 목표) | 0(데이터 손실 없음) — 동기식 복제; 양쪽 노드 모두 확인한 후에만 쓰기 승인 | 해당 없음(상태 비저장; 데이터는 백엔드에서 처리 mirror )  
RTO(복구 시간 목표) | ~1분 — 하트비트 타임아웃(기본값 30초) + 애플리케이션 재시작 시간 | 몇 초 — 트래픽이 즉시 활성 노드로 재분배됨  
복제 유형 | 동기식, 실시간, 바이트 수준 파일 복제 | 해당 없음  
장애 조치 트리거 | 하트비트 손실, 프로세스 충돌 또는 검사기 오류 발생 시 자동 실행 | 하트비트 손실, 프로세스 충돌 또는 검사기 오류 발생 시 자동 실행  
수동 개입이 필요합니까? | 아니요 - 완전 자동 페일오버 및 페일백 | 아니요 - 완전 자동 페일오버 및 페일백  
  
### RTO 분석( Mirror — 애플리케이션 레벨 HA) {#rto-breakdown-mirror-application-level-ha}

고장 유형 | RTO 계산  
---|---  
하드웨어 오류 | 하트비트 타임아웃(기본값 30초) + 애플리케이션 재시작 시간  
소프트웨어/프로세스 충돌 | 애플리케이션 중지 시간 + 애플리케이션 재시작 시간  
OS 레벨 크래시 | 하트비트 타임아웃 + 보조 서버에서 이미 OS 실행 중 → 재부팅 페널티 없음  
  
### RTO 분석 ( Mirror — VM 레벨 HA) {#rto-breakdown-mirror-vm-level-ha}

고장 유형 | RTO 계산  
---|---  
오류 발생 시 | 오류 감지 후 운영체제 전체 재부팅 및 애플리케이션 재시작이 진행됩니다(일반적으로 몇 분 소요).  
  
## 엣지 및 분산 배포 적합성 {#edge-distributed-deployment-suitability}

SafeKit 는 엣지, 지점, 분산형 엔터프라이즈 시나리오에 맞게 특별히 설계되었습니다.

에지 요구 사항 | SafeKit 답변  
---|---  
현장에 전담 IT 직원이 없습니다 | 예 — 자동 장애 조치, 수동 개입 필요 없음  
SAN/NAS 인프라 없음 | 예 — SAN 없음, 로컬 디스크만 사용  
원격 관리 | 예 — 웹 콘솔 관리  
하드웨어 요구 사항 최소화 | 예 — 표준 서버 또는 가상 머신 2대, 특수 하드웨어 불필요  
방화벽/NAT 뒤에서도 작동 가능 | 예 — 포트 구성 가능, HTTPS 기반 콘솔  
다중 사이트 재해 복구 | 예 — 확장된 VLAN을 통해 두 지리적 사이트 간 mirror  
OEM/임베디드 배포 | 예 — 무인 설치, 스크립트 사용 가능, 소프트웨어 게시자가 임베딩 가능  
수백 개의 분산 클러스터 | 예 — 여러 지점을 가진 분산형 기업을 위해 설계되었습니다.  
  
이상적인 엣지 사용 사례: 데이터센터가 없지만 고가용성이 여전히 중요한 모든 사이트.

수직 | 일반적인 에지 사이트 | 중요 애플리케이션  
---|---|---  
물리적 보안 및 감시 | 건물, 캠퍼스, 공항 | VMS — Milestone , Genetec, Hanwha, Siemens Siveillance  
건물 관리 시스템(BMS) | 사무실 건물, 병원, 공장 | Siemens Desigo CC, Bosch BIS/BVMS  
전자 접근 제어 시스템(EACS) | 보안 시설, 캠퍼스 | Siemens SiPass, Nedap , Bosch AMS  
SCADA 및 산업 제어 | 공장, 변전소, 정수장 | Windows 또는 Linux 에서 실행되는 모든 SCADA, DCS 또는 HMI 소프트웨어  
항공교통관제(ATC) | 공항, 관제탑 | ATC 관리 및 레이더 시스템  
운영 통제 센터(OCC) | 지하철, 철도, 환승 허브 | 철도 신호 및 역 관리  
해상 | 선박, 해군 함정 | 항해, 화물 및 선상 관리 시스템  
석유 및 가스 | 해양 플랫폼, 원격 시추 설비 | 공정 제어 및 안전 시스템  
통신 | 5G 안테나 사이트, MEC 노드 | 다중 액세스 에지 컴퓨팅(MEC) 서버  
의료 | 클리닉, 원격 진단 센터 | 의료 영상, 환자 데이터, 원격 진단  
| , 지점, | POS 및 재고 관리  
국방 | 전방 작전 기지, 야전 부대 | 임무 필수 지휘 및 통신 시스템  
  
## 모니터링, 관리 및 알림 {#monitoring-management-alerting}

기능 | 세부 정보  
---|---  
웹 콘솔 | 웹 앱 또는 프로그레시브 웹 앱(PWA); 클러스터 노드 구성, 모니터링 및 관리  
모바일 알림 | 상태 변경에 대한 브라우저 푸시 알림  
모듈 상태 및 이벤트의 시각적 타임라인 |  
이메일 알림 | 내장 알림 이메일 에이전트  
CLI 관리 | 스크립팅 및 자동화를 위한 완벽한 명령줄 인터페이스  
로그 관리 | 모듈별, 스크립트별 로그 파일; 지원을 위한 디버그 스냅샷  
타사 모니터링 통합 | SafeKit 을 통해 모든 주요 클러스터 이벤트가 Windows 이벤트 로그 또는 Linux 시스템 로그에 자동으로 기록됩니다. 이를 통해 Nagios, Zabbix, Splunk 및 SIEM 솔루션을 포함한 모든 모니터링 플랫폼에서 이러한 이벤트를 수집하고 표준 경고 규칙에 따라 알람을 발생시킬 수 있으며, 별도의 개발 작업이 필요하지 않습니다.  
  
## 보안 및 규정 준수 {#security-compliance}

기능 | 세부 정보  
---|---  
HTTPS 콘솔 액세스 | 예 — 웹 콘솔용 TLS 인증서  
사용자 인증 | 로컬 계정, LDAP, PKI/인증서 기반, OpenID Connect  
사용자 역할 | 관리자, 제어 및 모니터링 역할에 대한 구성 가능한 액세스 정책  
TCP(복제, 웹 콘솔, 분산 명령)에는 | TLS/SSL 암호화를, UDP(하트비트, SafeAdmin 내부 프로토콜)에는 AES-128-CBC + SHA256 대칭 암호화를 사용합니다. 암호화는 OpenSSL 라이브러리를 기반으로 합니다. 웹 서비스는 Apache를 기반으로 합니다.  
바이러스 백신 호환성 | 문서화된 제외 경로  
유럽 기업인 Eviden(Atos Group)은 | SafeKit 통해 Windows 및 Linux 에 대한 고유한 주권 비즈니스 연속성 및 재해 복구 제품을 제공합니다. 이 제품은 데이터와 장애 조치 인프라를 미국 공급업체에 의존하지 않고 완전히 온프레미스에 유지하여 NIS2 비즈니스 연속성 및 재해 복구 요구 사항을 충족합니다.  
  
## 라이선스 모델 {#licensing-model}

측면 | 세부 정보  
---|---  
라이선스 유형 | 호스트 이름 기반 영구 라이선스(일회성 구매)  
라이선스 범위 | 서버(노드)당  
라이선스 활성화 | 오프라인 활성화 지원; 라이선스 키 활성화에 인터넷 연결이 필요하지 않습니다.  
무료 체험판 | 예 — 모든 기능을 무료로 체험해 보실 수 있습니다.  
한 달 무료 라이선스 | (개념 증명용)  
  
## 지원 및 유지보수 SLA {#support-maintenance-slas}

### 표준 지원 및 유지보수 (유효한 유지보수 계약에 포함됨) {#standard-support-maintenance-included-with-active-maintenance-contract}

서비스 | 세부 정보  
---|---  
지원 포털 | )은 최대 4명의 지정된 기술 담당자에게 연중무휴 24시간 접속 권한을 제공하는 웹 포털입니다.  
실시간 지원 시간: 유럽 지원 센터 기준 월요일~금요일 오전 9시~오후 5시 |  
사고 접수 확인 | 지원 센터 근무 시간 4시간 이내)  
업데이트 및 업그레이드 | 모든 서비스 팩, 업데이트 및 업그레이드가 추가 비용 없이 포함됩니다.  
라이선스 키 교체 | 활성 지원 계약이 있는 경우 호스트 이름 변경 시 라이선스 키를 재할당할 수 있습니다. 라이선스 이전은 동일 프로젝트 내 서버 교체로 제한되며, Eviden의 사전 서면 승인을 받아야 합니다.  
기술 자료 접근 권한 | 기술 자료 문서, FAQ 및 온라인 설명서에 대한 전체 액세스 권한  
SafeKit | 없이 애플리케이션 시작/중지 예 — SafeKit 를 중지하고 래퍼 스크립트를 사용하여 애플리케이션을 시작 또는 중지합니다. 래퍼 스크립트는 애플리케이션의 시작/중지 스크립트를 호출하고 필요한 경우 가상 IP 주소를 구성하거나 제거합니다. 
지원 포털 | <https://customercare.evidian.com>  
  
### 무료 리소스 (계약 불필요) {#free-resources-no-contract-required}

리소스 | 세부 정보  
---|---  
safekit.eviden.com 및 safekit.eviden.com/을 사용하는 모든 LLM을 통해 AI 지원 도우미 | [ SafeKit AI 챗봇 ](</ko/resources/safekit-support/#ai-support>) 를 이용할 수 있습니다. llms.txt  
온라인 교육 및 인증 | 무료, 자율 학습, 12개 동영상(약 3시간 40분), 수료 시 인증서 발급  
| 문서 전체 사용자 가이드, 릴리스 노트, 기술 자료, 빠른 시작 가이드  
  
## 비교 vs. 대안 {#comparison-vs-alternatives}

기준 | SafeKit | Microsoft 장애 조치 클러스터(WSFC) | VMware HA | 오픈 소스 *  
---|---|---|---|---  
공유 스토리지(SAN/vSAN) 필요 여부: | 아니오 | 예 | 예, | 아니오  
Windows | 지원합니다. 예, | 지원합니다. 예, | 예, | 지원하지 않습니다.  
Linux 지원, | 지원, | 지원 안 함, | | 지원  
엣지/브랜치 배포 | 우수 | 복잡 | 복잡 | 복잡  
OEM 내장형 | 예 | 아니요 | 아니요 | 아니요  
비용 | 노드별 영구 라이선스 | Windows 서버 + SAN | vSphere Enterprise + SAN | 고수준 통합 서비스  
설정 복잡성 | 플러그 앤 플레이 | 높음(AD, SAN, Witness) | 높음(vCenter, 공유 스토리지) | 높음(분산된 제품)  
유지보수성 | 단일 제품, 웹 콘솔 | 높음 (AD, SAN 전문 지식 필요) | 높음 (vCenter 종속성) | 높음 (유지보수해야 할 별도 제품)  
  
* 와 Linux 에서는 SafeKit 의 기능 세트를 Linux 에서만 구현하기 위해 Corosync, Pacemaker, DRBD, Keepalived, STONITH, HAProxy 등 6개의 개별 오픈 소스 프로젝트가 필요합니다. 반면 SafeKit 단일 제품으로 Windows 와 Linux 모두에서 동일한 기능을 제공합니다.

## 빠른 참조 링크 {#quick-reference-links}

의지 | URL  
---|---  
제품 홈페이지 | [https://safekit.eviden.com/ko/](/ko/)  
기술 개요 (텍스트 및 다이어그램이 포함된 DOCX 파일) | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](/wp-content/uploads/documents/safekit-technical-overview-en.docx)  
무료 체험 | [https://safekit.eviden.com/resources/safekit-free-trial/](/resources/safekit-free-trial/)  
견적 받기 | [https://safekit.eviden.com/safekit-pricing/](/safekit-pricing/)  
지원 포털 | <https://customercare.evidian.com>  
무료 AI 지원 | [https://safekit.eviden.com/resources/safekit-support/](/resources/safekit-support/)  
무료 교육 및 인증 | [https://safekit.eviden.com/resources/safekit-on-line-training/](/resources/safekit-on-line-training/)  
저희에게 연락하세요 | [https://safekit.eviden.com/contact-us-for-safekit/](/contact-us-for-safekit/)  

{{%  insert-safekit-4-buttons-ko  %}}