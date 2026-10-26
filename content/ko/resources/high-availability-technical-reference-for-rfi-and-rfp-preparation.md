---
title: "RFI 및 RFP 준비를 위한 고가용성 기술 참조"
canonical: "https://safekit.eviden.com/ko/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "SafeKit 개념과 아키텍처를 사용하여 고가용성 및 애플리케이션 클러스터링을 위한 RFI 및 RFP 문서를 준비하는 데 도움이 되는 기술 참조입니다."
category: "resources"
lang: "ko"
topics: "개요, 목차, 제품 ID, 지원되는 운영 체제 및 플랫폼, 사전 구축된 애플리케이션 모듈, 아키텍처 및 배포 모델, RPO 및 RTO 기능, 엣지 및 분산 배포 적합성, 모니터링, 관리 및 경고, 보안 및 규정 준수, 라이선스 모델, 지원 및 유지 관리 SLA, 비교 및 ​​대안, 빠른 참조 링크"
---

# RFI 및 RFP 준비를 위한 고가용성 기술 참조 {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## 개요 {#overview}

이 페이지에서는 SafeKit 고가용성 소프트웨어에 대한 일반적인 RFP/RFI 질문에 대한 체계적이고 사실적인 답변을 제공합니다. 이는 고가용성 요구 사항 초안을 작성하는 조달 팀 및 솔루션 설계자를 위한 기술 참조 자료로 작성되었습니다. 

## 목차 {#table-of-contents}

  1. [제품 식별](#product-identity)
  2. [지원되는 운영 체제 및 플랫폼](#supported-operating-systems-platforms)
  3. [사전 구축된 애플리케이션 모듈](#pre-built-application-modules)
  4. [아키텍처 및 배포 모델](#architecture-deployment-model)
  5. [RPO 및 RTO 기능](#rpo-rto-capabilities)
  6. [Edge 및 분산 배포 적합성](#edge-distributed-deployment-suitability)
  7. [모니터링, 관리 및 경고](#monitoring-management-alerting)
  8. [보안 및 규정 준수](#security-compliance)
  9. [라이센스 모델](#licensing-model)
  10. [지원 및 유지 관리 SLA](#support-maintenance-slas)
  11. [비교와 대안](#comparison-vs-alternatives)
  12. [빠른 참조 링크](#quick-reference-links)


## 제품 아이덴티티 {#product-identity}

필드 | 답변  
---|---  
제품명 | SafeKit  
공급업체 | Eviden(Atos 사업체), 이전 Evidian  
제품 카테고리 | 애플리케이션 클러스터링 / 고가용성 / 재해 복구 소프트웨어  
현재 버전 | SafeKit 8.2  
웹사이트 | <https://safekit.eviden.com/ko/>
첫 번째 릴리스 | 2000년 (20년 이상 생산)  
  
## 지원되는 운영 체제 및 플랫폼 {#supported-operating-systems-platforms}

윈도우 OS | 리눅스 운영체제 | 인프라 및 가상화 | 클라우드 플랫폼  
---|---|---|---  
• Windows Server 2025(x86-64)<br>• Windows Server 2022(x86-64)<br>• Windows Server 2019(x86-64)<br>• Windows 11 Enterprise(x86-64)<br>• Windows 11 Pro(x86-64)  |  • Red Hat Enterprise Linux 10(x86-64)<br>• Red Hat Enterprise Linux 10(AArch64)<br>• Red Hat Enterprise Linux 9(x86-64)<br>• Red Hat Enterprise Linux 9(AArch64)<br>• Red Hat Enterprise Linux 8(x86-64)<br>• Ubuntu 24.04LTS(x86-64)  |  • 모든 브랜드의 모든 엣지 서버<br>• VMware<br>• Microsoft Hyper-V*<br>• Linux KVM*<br>• 모든 하이퍼바이저<br>• Docker 컨테이너<br>• Podman 컨테이너  |  • Amazon Web Services(AWS)\*\*<br>• Microsoft Azure\*\*<br>• Google Cloud Platform(GCP)\*\*<br>• 표준 VM 인스턴스가 포함된 모든 IaaS 클라우드   
  
_* SafeKit는 애플리케이션 레벨 HA와 VM 레벨 HA를 모두 지원합니다._

_** 가상 IP는 클라우드 로드 밸런서 수준에서 구성되어야 합니다._

## 사전 구축된 애플리케이션 모듈 {#pre-built-application-modules}

SafeKit에는 즉시 사용 가능하고 사전 구성된 `.safe` 모듈이 포함되어 있습니다. 이는 **애플리케이션 HA**(미러 또는 팜 모듈을 사용한 직접 애플리케이션 클러스터링) 및 **가상화 HA**(hyperv.safe 또는 kvm.safe를 사용한 VM 수준 클러스터링)의 두 가지 HA 전략으로 구성됩니다.

 | 애플리케이션 HA | VM 수준 HA ---|---|--- 구성 | 이를 위해서는 다시 시작해야 하는 서비스, 실시간 복제가 필요한 특정 애플리케이션 폴더, 장애 조치를 위한 가상 IP 주소 구성 등 애플리케이션 자체에 대한 기술적 이해가 필요합니다. | VM에서 실행되는 모든 애플리케이션/OS를 위한 일반 솔루션입니다. VM 내에 설치된 애플리케이션에 대한 기술적 이해가 필요하지 않습니다. 애플리케이션이 어떻게 작동하는지 모르는 경우 이것이 가장 좋은 솔루션입니다. VM 파일의 위치만 정의하면 됩니다. 이상적 | 기본 하드웨어나 하이퍼바이저에 관계없이 소프트웨어 솔루션에 직접 고가용성을 내장하는 데 적합합니다. | 단일 HA 정책을 통해 여러 VM에 걸쳐 여러 애플리케이션이 포함된 복잡한 환경을 관리하는 데 적합합니다.  
  
아래 표에는 사용 가능한 모든 `.safe` 모듈이 나열되어 있습니다.

애플리케이션 HA(애플리케이션 수준 클러스터링) | 가상화 HA(VM 수준 클러스터링)  
---|---  
새로운 Windows 앱 — mirror.safe | Hyper-V VM — hyperv.safe(Windows)  
새로운 Linux 앱 — mirror.safe | KVM VM — kvm.safe(Linux)  
Windows 부하 분산 — farm.safe | Docker 컨테이너 — mirror.safe(Linux)  
Linux 로드 밸런싱 — farm.safe | Podman 컨테이너 — mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe(Windows) | Kubernetes / K3s — k3s.safe(Linux)  
PostgreSQL — postgresql.safe(Windows 및 Linux) | 보쉬 AMS — hyperv.safe (Windows)  
MySQL — mysql.safe(Windows 및 Linux) | 보쉬 BIS — hyperv.safe (Windows)  
MariaDB — mysql.safe(Windows 및 Linux) | Bosch BVMS — hyperv.safe (Windows)  
오라클 — oracle.safe (Windows 및 Linux) | 한화비전 — hyperv.safe (Windows)  
파이어버드 — firebird.safe(Windows 및 Linux) | 한화 Wisenet — hyperv.safe (Windows)  
Apache — apache_farm.safe(Windows 및 Linux) | Siemens Siveillance 제품군 — hyperv.safe(Windows)  
IIS - iis_farm.safe(Windows) | Siemens Desigo CC — hyperv.safe (Windows)  
NGINX — farm.safe(Windows 및 Linux) | Siemens SiPass — hyperv.safe (Windows)  
Milestone XProtect — Milestone.safe(Windows) | 지멘스 SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe(Windows)  
Genetec(SQL Server) - sqlserver.safe(Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
Siemens Siveillance VMS — SiveillanceVMS.safe(Windows) |   
클라우드(AWS, Azure, GCP, 일반) — mirror.safe / farm.safe |   
  
## 아키텍처 및 배포 모델 {#architecture-deployment-model}

### 두 개의 클러스터 모듈: mirror.safe 및 farm.safe {#two-cluster-modules}

모듈 | 패턴 | 사용 사례  
---|---|---  
거울.안전 | 동기식 바이트 수준 파일 복제 + 자동 장애 조치를 갖춘 활성-수동 | 한 번에 하나의 서버에서만 실행되는 데이터베이스, 상태 저장 앱, 서비스  
농장 안전 | 네트워크 로드 밸런싱 + 자동 장애 조치가 포함된 Active-Active | 웹 서버, 상태 비저장 마이크로서비스, API 게이트웨이, 한 번에 여러 서버에서 실행되는 서비스  
  
### 클러스터 인프라 및 아키텍처 {#cluster-infrastructure-architecture}

요구사항/사양 | SafeKit 기능/가치  
---|---  
공유 저장소가 필요합니까? | 아니요 — SANless "비공유" 아키텍처. 로컬 디스크만 사용합니다.  
AD(Active Directory) 필수 조건은 무엇입니까? | 아니요 - Windows 도메인이나 Active Directory가 필요하지 않습니다. 작업 그룹이 완벽하게 지원됩니다.  
클러스터 크기 | 노드 2개(미러) 또는 노드 2개 이상(팜)  
가상 IP(VIP) | Gratuitous ARP(애플리케이션 수준 HA)를 통해 활성 노드로 자동으로 마이그레이션되는 소프트웨어 정의 VIP입니다. VM 수준 HA의 경우 VM 내부의 물리적 IP가 투명하게 다시 라우팅되므로 VIP가 필요하지 않습니다. 노드 간 LAN, VLAN 또는 확장 VLAN이 필요합니다.  
3노드 하이브리드 아키텍처 | SafeKit는 동기식 복제(RPO=0) 및 자동 장애 조치 기능을 갖춘 LAN 또는 확장 VLAN을 통한 2노드 미러 클러스터인 HA 계층을 다룹니다. 타사 백업 솔루션은 특정 시점 복구 및 랜섬웨어 보호를 위해 WAN을 통한 비동기식 복제 기능을 갖춘 세 번째 원격 노드로 아키텍처를 완성합니다.  
고가용성의 역할 | SafeKit는 동기식 복제를 사용하여 하드웨어 또는 소프트웨어 오류 시 데이터 손실 없이 즉각적인 장애 조치를 보장합니다. 하지만 두 노드에 동시에 데이터를 쓰기 때문에 논리적 오류나 데이터 저하, 실수로 인한 삭제 등을 대기 노드에 실시간으로 충실히 복제한다.  
백업의 역할 | 백업 솔루션(SafeKit에서는 구현되지 않음)은 비동기 복제를 통해 특정 시점 복구를 제공합니다. HA가 차단할 수 없는 데이터 무결성 위협(예: 랜섬웨어 또는 사람의 실수)으로부터 보호합니다. 데이터를 롤백하면 본질적으로 데이터 손실이 발생하므로 자동 장애 조치는 지원되지 않습니다.  
클러스터당 최대 동시 모듈 | 32 - 이 제한은 2노드 클러스터에서 동시에 관리되는 최대 SafeKit 모듈 수를 포함하며, 일반적으로 각 모듈이 다른 VM을 복제하고 다시 시작하는 VM 수준 HA에서 사용됩니다. 각 모듈은 두 노드 중 하나에서 기본으로 독립적으로 실행될 수 있으므로 두 서버 전체에 작업 부하를 분산시킬 수 있습니다. 참고: 모든 VM의 총 데이터 볼륨은 장애 조치(failover) 또는 노드 다시 시작 후 재동기화 시간에 직접적인 영향을 미칩니다.  
에이전트 기반 또는 에이전트 없음? | 에이전트 기반 — 각 노드에 설치된 경량 소프트웨어  
애플리케이션에 구애받지 않습니까? | 예 — 모든 Windows 서비스 또는 Linux 데몬을 보호합니다. 30개 이상의 애플리케이션을 위해 사전 구축된 모듈  
  
### 복제 및 데이터 보호 {#replication-data-protection}

요구사항/사양 | SafeKit 기능/가치  
---|---  
복제 방법 | 바이트 수준 파일 복제(블록 수준 디스크 아님)  
복제 모드 | 동기식(데이터 손실 없음)  
네트워크 요구 사항 | 동기식 복제의 경우 노드 간 왕복 대기 시간이 5ms 미만인 것이 좋습니다.  
권장 데이터 볼륨 | 몇 테라바이트(재동기화 시간)  
권장 파일 수 | < 1,000,000개 파일(재동기화 시간)  
재동기화 속도(1TB) | 1Gb/s 네트워크에서 최대 3시간; 10Gb/s 네트워크에서 최대 1시간  
선택적 복제 | 예 - 특정 디렉터리/파일 복제  
전송 중 암호화 | 예 - 복제 트래픽을 위한 TLS/SSL  
  
## RPO 및 RTO 기능 {#rpo-rto-capabilities}

### 클러스터 유형별 RPO 및 RTO {#rto-rpo-cluster-type}

미터법 | 미러 클러스터(mirror.safe) | 팜 클러스터(farm.safe)  
---|---|---  
RPO(복구 지점 목표) | 0(데이터 손실 없음) — 동기 복제. 두 노드가 모두 확인된 후에만 쓰기가 승인됩니다. | 해당 없음(상태 비저장, 백엔드 미러에서 데이터 처리)  
RTO(복구 시간 목표) | ~1분 - 하트비트 시간 초과(기본값 30초) + 애플리케이션 다시 시작 시간 | 몇 초 — 트래픽이 즉시 살아남은 활성 노드로 재분배됩니다.  
복제 유형 | 동기식, 실시간, 바이트 수준 파일 복제 | 해당 없음  
장애 조치 트리거 | 하트비트 손실, 프로세스 충돌 또는 검사기 오류 시 자동 | 하트비트 손실, 프로세스 충돌 또는 검사기 오류 시 자동  
수동 개입이 필요합니까? | 아니요 - 완전 자동 장애 조치 및 장애 복구 | 아니요 - 완전 자동 장애 조치 및 장애 복구  
  
### RTO 분석(미러 - 애플리케이션 수준 HA) {#rto-breakdown-mirror-application-level-ha}

실패 유형 | RTO 계산  
---|---  
하드웨어 오류 | 하트비트 시간 초과(기본값 30초) + 애플리케이션 다시 시작 시간  
소프트웨어/프로세스 충돌 | 애플리케이션 중지 시간 + 애플리케이션 재시작 시간  
OS 수준 충돌 | 하트비트 시간 초과 + OS가 보조에서 이미 실행 중 → 재부팅 페널티 없음  
  
### RTO 분석(미러 - VM 수준 HA) {#rto-breakdown-mirror-vm-level-ha}

실패 유형 | RTO 계산  
---|---  
모든 실패 | 오류 감지 + 전체 OS 재부팅 + 애플리케이션 다시 시작(일반적으로 몇 분)  
  
## 엣지 및 분산 배포 적합성 {#edge-distributed-deployment-suitability}

SafeKit는 에지, 지점 및 분산 엔터프라이즈 시나리오를 위해 특별히 설계되었습니다.

가장자리 요구 사항 | SafeKit 답변  
---|---  
현장에 전담 IT 직원이 없음 | 예 — 자동 장애 조치, 수동 개입 없음  
SAN/NAS 인프라 없음 | 예 — SANless, 로컬 디스크만  
원격 관리 | 예 - 웹 콘솔 관리  
낮은 하드웨어 설치 공간 | 예 — 2개의 표준 서버 또는 VM, 특수 하드웨어 없음  
방화벽/NAT 뒤에서 작동 | 예 — 구성 가능한 포트, HTTPS 기반 콘솔  
다중 사이트 재해 복구 | 예 — 확장된 VLAN을 통해 두 지리적 사이트 간 미러링  
OEM/임베디드 배포 | 예 — 소프트웨어 게시자가 자동 설치, 스크립트 가능, 삽입 가능  
수백 개의 분산 클러스터 | 예 — 지점이 많은 분산형 기업을 위해 설계되었습니다.  
  
이상적인 Edge 사용 사례: 데이터 센터가 없는 모든 사이트 - 여전히 고가용성이 중요한 경우:

수직 | 일반적인 엣지 사이트 | 중요한 애플리케이션  
---|---|---  
물리적 보안 및 감시 | 건물, 캠퍼스, 공항 | VMS — Milestone, Genetec, Hanwha, Siemens Siveillance  
건물관리(BMS) | 사무실 건물, 병원, 공장 | 지멘스 Desigo CC, 보쉬 BIS/BVMS  
전자 출입 통제(EACS) | 보안시설, 캠퍼스 | 지멘스 SiPass, Nedap, 보쉬 AMS  
SCADA 및 산업 제어 | 공장, 변전소, 수생 식물 | Windows 또는 Linux에서 실행되는 모든 SCADA, DCS 또는 HMI 소프트웨어  
항공교통관제(ATC) | 공항, 관제탑 | ATC 관리 및 레이더 시스템  
운영 통제 센터(OCC) | 지하철, 철도, 대중교통 허브 | 철도 신호 및 역 관리  
해양 | 선박, 해군 함정 | 내비게이션, 화물 및 선내 관리 시스템  
석유 및 가스 | 해양 플랫폼, 원격 장비 | 공정 제어 및 안전 시스템  
통신 | 5G 안테나 사이트, MEC 노드 | 다중 액세스 에지 컴퓨팅(MEC) 서버  
헬스케어 | 진료소, 원격 진단 센터 | 의료 영상, 환자 데이터, 원격 진단  
소매 | 상점, 지점, 창고 | POS 및 재고 관리  
방어 | 전방작전기지, 야전부대 | 미션 크리티컬 명령 및 통신 시스템  
  
## 모니터링, 관리 및 경고 {#monitoring-management-alerting}

능력 | 세부정보  
---|---  
웹 콘솔 | 웹 앱 또는 프로그레시브 웹 앱(PWA) 클러스터 노드 구성, 모니터링 및 관리  
모바일 알림 | 상태 변경에 대한 브라우저 푸시 알림  
상태 타임라인 | 모듈 상태 및 이벤트의 시각적 타임라인  
이메일 알림 | 경고용 내장 이메일 에이전트  
CLI 관리 | 스크립팅 및 자동화를 위한 전체 명령줄 인터페이스  
로그 관리 | 모듈별, 스크립트별 로그 파일 지원을 위한 디버그 스냅샷  
타사 모니터링 통합 | SafeKit는 모든 주요 클러스터 이벤트를 Windows 이벤트 로그 또는 Linux Syslog에 자동으로 기록하므로 모든 모니터링 플랫폼에서 맞춤 개발 없이 Nagios, Zabbix, Splunk 및 SIEM 솔루션을 포함한 표준 경고 규칙을 사용하여 이러한 이벤트를 수집하고 경보를 발생시킬 수 있습니다.  
  
## 보안 및 규정 준수 {#security-compliance}

특징 | 세부정보  
---|---  
HTTPS 콘솔 액세스 | 예 — 웹 콘솔용 TLS 인증서  
사용자 인증 | 로컬 계정, LDAP, PKI/인증서 기반, OpenID Connect  
사용자 역할 | 관리자, 제어 및 모니터 역할에 대해 구성 가능한 액세스 정책  
암호화 | TCP용 TLS/SSL(복제, 웹 콘솔, 분산 명령) 및 UDP용 AES-128-CBC + SHA256 대칭 암호화(하트비트, safeadmin 내부 프로토콜) openSSL 라이브러리 기반 암호화. Apache 기반의 웹 서비스입니다.  
바이러스 백신 호환성 | 문서화된 제외 경로  
주권 | 유럽 ​​기업인 Eviden(Atos Group)은 SafeKit를 통해 Windows 및 Linux용 고유한 주권 비즈니스 연속성 및 재해 복구 제품을 제공합니다. 이는 NIS2 비즈니스 연속성 및 재해 복구 요구 사항에 따라 미국 공급업체에 의존하지 않고 데이터 및 장애 복구 인프라를 온프레미스에 완전히 유지합니다.  
  
## 라이선스 모델 {#licensing-model}

측면 | 세부정보  
---|---  
라이센스 유형 | 호스트 이름 기반 영구 라이센스(일회성 구매)  
라이센스 범위 | 서버당(노드)  
라이선스 활성화 | 오프라인 활성화가 지원됩니다. 라이센스 키를 활성화하기 위해 인터넷 접속이 필요하지 않습니다.  
무료 평가판 | 예 — 모든 기능을 갖춘 무료 평가판 이용 가능  
1개월 무료 라이센스 | 개념 증명에 사용 가능  
  
## 지원 및 유지 관리 SLA {#support-maintenance-slas}

### 표준 지원 및 유지 관리(활성 유지 관리 계약에 포함) {#standard-support-maintenance-included-with-active-maintenance-contract}

서비스 | 세부정보  
---|---  
지원 포털 액세스 | 최대 4명의 기술 담당자를 위한 연중무휴 24시간 웹 포털  
실시간 지원 시간 | 오전 9시 – 오후 5시 유럽 지원 센터, 월요일 – 금요일  
사고 인정 | 지원센터 근무시간 4시간 이내  
업데이트 및 업그레이드 | 추가 비용 없이 모든 서비스 팩, 업데이트 및 업그레이드가 포함됩니다.  
라이센스 키 교체 | 활성 지원 계약에 따라 호스트 이름 변경 시 라이센스 키를 재할당할 수 있습니다. 라이센스 양도는 Eviden의 사전 서면 동의에 따라 동일한 프로젝트 내의 서버 교체로 제한됩니다.  
지식 기반 액세스 | KB 기사, FAQ 및 온라인 설명서에 대한 전체 액세스  
SafeKit 없이 애플리케이션 시작/중지 | 예 — SafeKit를 중지하고 래퍼 스크립트를 사용하여 애플리케이션을 시작하거나 중지합니다. 래퍼 스크립트는 애플리케이션의 시작/중지 스크립트를 호출하고 필요한 경우 가상 IP 주소를 구성하거나 제거합니다. 
지원 포털 | <https://customercare.evidian.com>  
  
### 무료 리소스(계약 불필요) {#free-resources-no-contract-required}

자원 | 세부정보  
---|---  
AI 지원 도우미 | safekit.eviden.com 및 safekit.eviden.com/llms.txt를 사용하는 LLM을 통해 [SafeKit AI chat](</ko/resources/safekit-support/#ai-support>)
온라인 교육 및 인증 | 무료, 자기 주도형, 12개 동영상(~3시간 40분), 수료 인증서  
문서 | 전체 사용자 가이드, 릴리스 노트, 기술 자료, 빠른 시작 가이드  
  
## 비교 대 대안 {#comparison-vs-alternatives}

기준 | SafeKit | Microsoft 장애 조치 클러스터(WSFC) | VMware HA | 오픈 소스*  
---|---|---|---|---  
공유 스토리지(SAN/vSAN) 필요 | 아니요 | 예 | 예 | 아니요  
윈도우 지원 | 예 | 예 | 예 | 아니요  
리눅스 지원 | 예 | 아니요 | 예 | 예  
엣지/브랜치 배포 | 우수 | 복잡한 | 복잡한 | 복잡한  
OEM 내장 가능 | 예 | 아니요 | 아니요 | 아니요  
비용 | 영구 노드별 | 윈도우 서버 + SAN | vSphere 엔터프라이즈 + SAN | 높은 수준의 통합 서비스  
설정 복잡성 | 플러그 앤 플레이 | 높음(AD, SAN, 감시) | 높음(vCenter, 공유 스토리지) | 높음(조각난 제품)  
유지 관리성 | 단일 제품, 웹 콘솔 | 높음(AD, SAN 전문 지식 필요) | 높음(vCenter 종속성) | 높음(별도의 제품을 유지관리해야 함)  
  
_* Linux에서는 Linux에서만 SafeKit의 기능 세트를 복제하려면 Corosync, Pacemaker, DRBD, Keepalived, STONITH, HAProxy 등 6개의 별도 오픈 소스 프로젝트가 필요합니다. SafeKit는 Windows와 Linux 모두에서 단일 제품으로 동일한 기능을 제공합니다._

## 빠른 참조 링크 {#quick-reference-links}

자원 | URL  
---|---  
제품 홈페이지 | <https://safekit.eviden.com/ko/>
기술 개요(텍스트 및 다이어그램이 포함된 DOCX) | 📘 [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
무료 평가판 | [https://safekit.eviden.com/ko/resources/safekit-free-trial/](</ko/resources/safekit-free-trial/>)  
견적 받기 | [https://safekit.eviden.com/ko/safekit-pricing/](</ko/safekit-pricing/>)  
지원 포털 | <https://customercare.evidian.com>  
무료 AI 지원 | [https://safekit.eviden.com/ko/resources/safekit-support/](</ko/resources/safekit-support/>)  
무료 교육 및 인증 | 🎓 [https://safekit.eviden.com/ko/resources/safekit-on-line-training/](</ko/resources/safekit-on-line-training/>)  
문의하기 | [https://safekit.eviden.com/ko/contact-us-for-safekit/](</ko/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-ko  %}}