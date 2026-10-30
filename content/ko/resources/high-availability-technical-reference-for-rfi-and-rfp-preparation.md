---
title: "SafeKit 기술 참조 자료 (RFI 및 RFP 문서용)"
canonical: "https://safekit.eviden.com/ko/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "SafeKit 에 대한 기술 정보를 찾아 정보 요청서(RFI) 및 제안 요청서(RFP)를 준비하세요. 지원되는 시스템, 아키텍처, 복구 시간, 보안, 라이선스 및 지원에 대해 알아보세요."
category: "resources"
lang: "ko"
topics: "개요, 목차, 제품 정보, 지원되는 운영 체제 및 플랫폼, SafeKit 고가용성 제한 사항, 사전 구성된 애플리케이션 모듈, 아키텍처 및 배포, 데이터 손실 및 복구 시간(RPO 및 RTO), 원격 사이트 및 분산 배포, 모니터링, 관리 및 알림, 보안 및 규정 준수, 라이선스, 지원 및 유지보수 서비스 수준, 다른 솔루션과의 비교, 유용한 링크"
---

# SafeKit 기술 참조 자료 (RFI 및 RFP 문서용) {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## 개요 {#overview}

이 페이지는 정보 요청서(RFI) 또는 제안 요청서(RFP)를 준비하는 데 사용할 수 있습니다. SafeKit 고가용성 소프트웨어에 대한 일반적인 기술적 질문에 대한 답변을 제공하며, 구매팀과 솔루션 설계자가 요구 사항을 정의하는 데 도움이 됩니다.

## 목차 {#table-of-contents}

  1. [제품 정보](#product-identity)
  2. [지원되는 운영 체제 및 플랫폼](#supported-operating-systems-platforms)
  3. [SafeKit 고가용성 제한 사항](#safekit-ha-limitations)
  4. [사전 구성된 애플리케이션 모듈](#pre-built-application-modules)
  5. [아키텍처 및 배포](#architecture-deployment-model)
  6. [데이터 손실 및 복구 시간(RPO 및 RTO)](#rpo-rto-capabilities)
  7. [원격 사이트 및 분산 배포](#edge-distributed-deployment-suitability)
  8. [모니터링, 관리 및 알림](#monitoring-management-alerting)
  9. [보안 및 규정 준수](#security-compliance)
  10. [라이선스](#licensing-model)
  11. [지원 및 유지보수 서비스 수준](#support-maintenance-slas)
  12. [다른 솔루션과의 비교](#comparison-vs-alternatives)
  13. [유용한 링크](#quick-reference-links)


## 제품 정보 {#product-identity}

필드 | 답변  
---|---  
제품명 | SafeKit  
공급업체 | 에비든은 아토스 그룹의 자회사입니다. 이전에는 에비디안으로 알려져 있었습니다.  
제품 카테고리 | 애플리케이션 클러스터링, 고가용성 및 재해 복구를 위한 소프트웨어  
현재 버전 | SafeKit 8.2  
웹사이트 | [https://safekit.eviden.com/ko/](</ko/>)  
첫 번째 릴리스 | 2000년. 20년 이상 생산에 사용되었습니다.  
  
## 지원되는 운영 체제 및 플랫폼 {#supported-operating-systems-platforms}

윈도우 운영 체제 | 리눅스 운영 체제 | 인프라 및 가상화 | 클라우드 플랫폼  
---|---|---|---  
• 윈도우 서버 2025 (x86-64)<br> • 윈도우 서버 2022 (x86-64)<br> • 윈도우 서버 2019 (x86-64)<br> • 윈도우 11 엔터프라이즈(x86-64)<br> • 윈도우 11 프로 (x86-64)  |  • 레드햇 엔터프라이즈 리눅스 10 (x86-64)<br> • 레드햇 엔터프라이즈 리눅스 10 (AArch64)<br> • 레드햇 엔터프라이즈 리눅스 9 (x86-64)<br> • 레드햇 엔터프라이즈 리눅스 9 (AArch64)<br> • 레드햇 엔터프라이즈 리눅스 8 (x86-64)<br> • 우분투 24.04 LTS (x86-64)  |  • 모든 브랜드의 엣지 서버<br> • VMware<br> • 마이크로소프트 Hyper-V*<br> • 리눅스 KVM*<br> • 모든 하이퍼바이저<br> • 도커 컨테이너<br> • Podman 컨테이너  |  • 아마존 웹 서비스(AWS)**<br> • 마이크로소프트 Azure**<br> • 구글 클라우드 플랫폼(GCP)**<br> • 표준 VM 인스턴스를 제공하는 모든 IaaS 클라우드   
  
_SafeKit 개별 애플리케이션 또는 전체 가상 머신에 대한 고가용성을 제공합니다._

_클라우드 환경에서는 클라우드 로드 밸런서에 가상 IP 주소를 구성하십시오._

{{%  insert-safekit-usage-ko  %}}

## 사전 구성된 애플리케이션 모듈 {#pre-built-application-modules}

SafeKit 에는 바로 사용할 수 있는 `.safe` 모듈이 포함되어 있습니다. 애플리케이션을 보호하는 방법에는 두 가지가 있습니다. **애플리케이션 고가용성은** mirror 또는 <span class="notranslate farm-term" translate="no">farm</span> 모듈을 사용하여 애플리케이션을 직접 보호합니다. **가상 머신 고가용성은** hyperv.safe 또는 kvm.safe 모듈을 사용하여 전체 가상 머신을 보호합니다.

 | 애플리케이션 고가용성 | 가상 머신 고가용성  
---|---|---  
구성 | 어떤 애플리케이션 서비스를 재시작하고 어떤 폴더를 복제해야 하는지 알아야 합니다. 또한 장애 조치에 사용할 가상 IP 주소도 구성해야 합니다. | 가상 머신 파일의 위치만 지정하면 됩니다. 가상 머신 내부의 애플리케이션이 어떻게 작동하는지는 알 필요가 없습니다. 이 접근 방식은 애플리케이션과 운영 체제를 함께 보호합니다.  
권장 사용법 | 특정 하드웨어나 하이퍼바이저에 의존하지 않고 소프트웨어 솔루션에 직접 고가용성을 추가하세요. | 여러 가상 머신에 분산된 여러 애플리케이션을 하나의 고가용성 정책으로 관리하세요.  
  
아래 표는 사용 가능한 모든 `.safe` 모듈 목록입니다.

애플리케이션 고가용성 | 가상 머신 고가용성  
---|---  
새로운 Windows 앱 — mirror.safe | Hyper-V VM — hyperv.safe (Windows)  
새로운 리눅스 앱 — mirror.safe | KVM VM — kvm.safe (리눅스)  
윈도우 로드 밸런싱 — farm.safe | Docker 컨테이너 — mirror.safe (리눅스)  
리눅스 로드 밸런싱 — farm.safe | Podman 컨테이너 — mirror.safe (리눅스)  
Microsoft SQL Server — sqlserver.safe (Windows) | Kubernetes / K3s — k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows 및 Linux) | Bosch AMS — hyperv.safe (Windows)  
MySQL — mysql.safe (Windows 및 Linux) | 보쉬 BIS — hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows 및 Linux) | Bosch BVMS — hyperv.safe (Windows)  
Oracle — oracle.safe (Windows 및 Linux) | 한화 비전 — hyperv.safe (Windows)  
파이어버드 — firebird.safe (Windows 및 Linux) | 한화 와이즈넷 — hyperv.safe (Windows)  
Apache — apache_farm.safe (Windows 및 Linux) | 지멘스 감시 제품군 — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | 지멘스 데시고 CC — hyperv.safe (Windows)  
NGINX — farm.safe (Windows 및 Linux) | 지멘스 SiPass — hyperv.safe (Windows)  
Milestone XProtect — milestone.safe (Windows) | 지멘스 SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
Genetec(SQL Server) — sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
지멘스 감시 VMS — SiveillanceVMS.safe (Windows) |   
클라우드(AWS, Azure, GCP, 일반) — mirror.safe / farm.safe |   
  
## 아키텍처 및 배포 {#architecture-deployment-model}

### 두 개의 클러스터 모듈: mirror.safe 및 farm.safe {#two-cluster-modules}

기준 치수 | 작동 방식 | 일반적인 적용 사례  
---|---|---  
mirror.safe | 서버 하나는 활성 상태이고 다른 하나는 대기 상태입니다. 파일은 바이트 단위로 동기적으로 복제됩니다. 장애 조치는 자동으로 이루어집니다. | 데이터베이스, 상태를 저장하는 애플리케이션, 그리고 한 번에 하나의 서버에서만 실행되는 서비스  
farm.safe | 여러 서버가 동시에 활성화됩니다. SafeKit 네트워크 트래픽을 서버 간에 분산하고 장애 조치를 자동으로 처리합니다. | 웹 서버, 상태 비저장 마이크로서비스, API 게이트웨이 및 여러 서버에서 동시에 실행되는 서비스  
  
### 클러스터 인프라 {#cluster-infrastructure-architecture}

요구 사항 | SafeKit 기능  
---|---  
공유 스토리지 필요하신가요? | 아니요. SafeKit 로컬 디스크를 사용합니다. SAN이나 공유 스토리지가 필요하지 않습니다.  
Active Directory가 필요합니까? | 아니요. SafeKit Windows 도메인이나 Active Directory를 필요로 하지 않습니다. 또한 워크그룹도 지원합니다.  
클러스터 크기 | 2개 노드( mirror ) 또는 2개 이상 노드( <span class="notranslate farm-term" translate="no">farm</span> )  
가상 IP 주소(VIP) | 애플리케이션 고가용성을 위해 가상 IP 주소는 Gratuitous ARP를 통해 활성 노드로 자동으로 이동합니다. 가상 머신 고가용성을 위해서는 가상 머신 내부의 IP 주소로 향하는 트래픽이 자동으로 리디렉션됩니다. 별도의 가상 IP 주소는 필요하지 않습니다. 노드들은 LAN, VLAN 또는 사이트 간 확장된 VLAN을 공유해야 합니다.  
세 개의 노드를 가진 아키텍처 | SafeKit LAN 또는 사이트 간 확장된 VLAN에서 2노드 mirror 클러스터를 실행합니다. 데이터 손실이 전혀 없는(RPO=0) 동기식 복제와 자동 장애 조치를 제공합니다. 별도의 백업 제품은 WAN을 통해 세 번째 노드로 데이터를 비동기적으로 복제합니다. 이 백업을 통해 이전 시점으로 복구할 수 있으며 랜섬웨어 공격으로부터 시스템을 보호할 수 있습니다.  
고가용성의 목적 | SafeKit 데이터를 두 노드에 동기적으로 복제합니다. 이를 통해 하드웨어 또는 소프트웨어 오류 발생 시 데이터 손실 없이 자동 페일오버가 가능합니다. 또한 논리적 오류, 데이터 손상 및 실수로 인한 삭제도 대기 노드에 즉시 복사됩니다.  
백업의 목적 | 백업을 사용하면 이전 시점의 데이터로 복원할 수 있습니다. SafeKit 아닌 별도의 백업 제품이 비동기 복제를 통해 이러한 보호 기능을 제공합니다. 백업은 랜섬웨어 공격 및 사용자 오류로부터 데이터를 복구하는 데 도움이 됩니다. 하지만 이 복구 기능은 자동 장애 조치가 아닙니다. 이전 백업으로 복원하면 해당 백업 이후에 변경된 내용은 손실됩니다.  
동시에 실행되는 최대 모듈 수 | 2노드 클러스터는 최대 32개의 모듈을 동시에 관리할 수 있습니다. 가상 머신 보호를 위해 각 모듈은 서로 다른 가상 머신을 복제하고 재시작합니다. 각 모듈은 어느 노드에서든 기본 서버 역할을 수행할 수 있으므로 두 서버가 워크로드를 공유할 수 있습니다. 전체 데이터 용량은 장애 조치 또는 노드 재시작 후 재동기화 시간에 영향을 미칩니다.  
각 노드에 필요한 소프트웨어는 무엇입니까? | 예. 각 노드에 경량 소프트웨어 에이전트가 설치됩니다.  
지원되는 애플리케이션 | SafeKit 모든 Windows 서비스 또는 Linux 데몬을 보호할 수 있습니다. 30개 이상의 애플리케이션에 대한 사전 구성된 모듈을 사용할 수 있습니다.  
  
### 복제 및 데이터 보호 {#replication-data-protection}

요구 사항 | SafeKit 기능  
---|---  
복제 방법 | SafeKit 파일 변경 사항을 바이트 단위로 복제합니다. 디스크 블록은 복제하지 않습니다.  
복제 모드 | 데이터 손실 없는 동기식 복제  
네트워크 요구 사항 | 동기식 복제를 위해서는 노드 간 왕복 지연 시간이 5ms 미만이어야 합니다.  
권장 데이터 용량 | 수 테라바이트 정도면 재동기화 시간을 관리 가능한 수준으로 유지할 수 있습니다.  
권장 파일 개수 | 파일 수를 100만 개 미만으로 유지하여 재동기화 시간을 관리 가능한 수준으로 유지합니다.  
1TB 재동기화 시간 | 1Gb/s 네트워크에서는 약 3시간, 10Gb/s 네트워크에서는 약 1시간 정도 소요됩니다.  
선택적 복제 | 복제할 디렉터리와 파일을 선택할 수 있습니다.  
전송 중 암호화 | 복제 트래픽은 TLS/SSL로 암호화됩니다.  
  
## 데이터 손실 및 복구 시간(RPO 및 RTO) {#rpo-rto-capabilities}

### 각 클러스터 유형별 RPO 및 RTO {#rto-rpo-cluster-type}

미터법 | Mirror 클러스터( mirror.safe ) | <span class="notranslate farm-term" translate="no">Farm</span> 클러스터( farm.safe )  
---|---|---  
RPO(복구 시점 목표) | 데이터 손실이 전혀 없습니다. 쓰기 작업은 양쪽 노드 모두에서 확인 응답을 받은 후에만 확정됩니다. | 상태 비저장 서비스에는 적용되지 않습니다. 별도의 mirror 클러스터에서 데이터를 관리합니다.  
RTO(복구 시간 목표) | 약 1분 정도 소요됩니다. 여기에는 하트비트 타임아웃(기본값 30초)과 애플리케이션 재시작 시간이 포함됩니다. | 몇 초 후, 트래픽이 나머지 활성 노드로 재분배됩니다.  
복제 유형 | 동기식, 실시간, 바이트 수준 파일 복제 | 해당 사항 없음  
장애 조치 트리거 | 심장 박동이 멈추거나, 프로세스가 충돌하거나, 검사기가 오류를 감지하면 자동으로 실행됩니다. | 심장 박동이 멈추거나, 프로세스가 충돌하거나, 검사기가 오류를 감지하면 자동으로 실행됩니다.  
수동 개입이 필요합니까? | 아니요. 페일오버와 페일백은 자동으로 이루어집니다. | 아니요. 페일오버와 페일백은 자동으로 이루어집니다.  
  
### mirror 클러스터로 보호되는 애플리케이션의 복구 시간 {#rto-breakdown-mirror-application-level-ha}

실패 유형 | 회복 시간 계산 방법  
---|---  
하드웨어 오류 | 하트비트 타임아웃(기본값 30초) 후 애플리케이션이 재시작됩니다.  
소프트웨어 또는 프로세스 오류 | 이제 애플리케이션을 종료한 후 다시 시작해야 합니다.  
운영 체제 충돌 | 하트비트 타임아웃이 발생했습니다. 운영 체제가 대기 서버에서 이미 실행 중이므로 재부팅할 필요가 없습니다.  
  
### mirror 클러스터로 보호되는 가상 머신의 복구 시간 {#rto-breakdown-mirror-vm-level-ha}

실패 유형 | 회복 시간 계산 방법  
---|---  
어떤 실패라도 | 오류를 감지하고 가상 머신 운영 체제를 재부팅한 다음 애플리케이션을 다시 시작하는 데 시간이 걸립니다. 일반적으로 몇 분 정도 소요됩니다.  
  
## 원격 사이트 및 분산 배포 {#edge-distributed-deployment-suitability}

SafeKit 원격 사업장, 지사 및 여러 사업장을 보유한 조직을 위해 설계되었습니다.

원격지에서의 요구사항 | SafeKit 기능  
---|---  
현장에 전담 IT 직원이 없습니다. | 장애 조치는 자동으로 이루어지며 수동 조치가 필요하지 않습니다.  
SAN 또는 NAS 없음 | SafeKit 로컬 디스크를 사용하며 공유 스토리지가 필요하지 않습니다.  
원격 관리 | 웹 콘솔을 통해 클러스터를 관리하세요.  
제한된 하드웨어 | 표준 서버 또는 가상 머신 두 대면 충분합니다. 특별한 하드웨어는 필요하지 않습니다.  
방화벽 및 네트워크 주소 변환(NAT) | 포트를 구성할 수 있습니다. 웹 콘솔은 HTTPS를 사용합니다.  
사이트 간 재해 복구 | mirror 클러스터는 두 사이트 간에 확장된 VLAN을 통해 두 사이트를 연결할 수 있습니다.  
소프트웨어 퍼블리셔의 통합 | 소프트웨어 퍼블리셔는 SafeKit 자사 제품에 포함시킬 수 있습니다. 설치는 사용자 상호 작용 없이 실행될 수 있으며 스크립트를 사용하여 자동화할 수도 있습니다.  
여러 사이트에 걸쳐 수백 개의 클러스터가 있습니다. | SafeKit 여러 지점을 보유한 조직을 위해 설계되었습니다.  
  
다음 사이트들은 데이터 센터가 없더라도 높은 가용성이 필요합니다.

산업 | 일반적인 사이트 | 중요 응용 프로그램  
---|---|---  
물리적 보안 및 감시 | 건물, 캠퍼스, 공항 | VMS — 마일스톤, 제네텍, 한화, 지멘스 시빌런스  
건물 관리 시스템(BMS) | 사무실 건물, 병원, 공장 | 지멘스 Desigo CC, 보쉬 BIS/BVMS  
전자 접근 제어 시스템(EACS) | 보안 시설, 캠퍼스 | 지멘스 SiPass, Nedap, 보쉬 AMS  
SCADA 및 산업 제어 | 공장, 변전소, 정수장 | Windows 또는 Linux에서 실행되는 모든 SCADA, DCS 또는 HMI 소프트웨어  
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
웹 콘솔 | 웹 애플리케이션 또는 프로그레시브 웹 앱(PWA)을 통해 클러스터 노드를 구성, 모니터링 및 관리할 수 있습니다.  
모바일 알림 | 모듈의 상태가 변경될 때 브라우저 알림을 받으세요.  
주 역사 | 모듈의 상태와 이벤트를 타임라인으로 확인하세요.  
이메일 알림 | 내장된 이메일 에이전트가 알림을 보냅니다.  
명령줄 관리 | 명령줄 인터페이스를 사용하여 스크립트를 작성하고 작업을 자동화하세요.  
로그 관리 | 각 모듈과 스크립트에는 자체 로그 파일이 있습니다. 진단 스냅샷은 지원팀이 문제를 조사하는 데 도움이 됩니다.  
모니터링 도구와의 통합 | SafeKit 주요 클러스터 이벤트를 Windows 이벤트 로그 또는 Linux 시스템 로그에 기록합니다. 모니터링 도구는 이러한 이벤트를 수집하고 표준 규칙에 따라 경고를 발생시킬 수 있습니다. 이 기능은 별도의 개발 없이 Nagios, Zabbix, Splunk 및 SIEM 도구와 연동됩니다.  
  
## 보안 및 규정 준수 {#security-compliance}

특징 | 세부  
---|---  
HTTPS 콘솔 액세스 | TLS 인증서는 웹 콘솔에 대한 접근을 보호합니다.  
사용자 인증 | 로컬 계정, LDAP, 인증서(PKI) 및 OpenID Connect  
사용자 역할 | 관리, 제어 및 모니터링을 위한 액세스 정책을 구성합니다.  
암호화 | TCP 트래픽은 복제, 웹 콘솔 및 분산 명령에 TLS/SSL을 사용합니다. UDP 트래픽은 하트비트 및 내부 safeadmin 프로토콜에 SHA256을 사용하는 AES-128-CBC 암호화를 사용합니다. SafeKit 암호화에 OpenSSL 라이브러리를 사용하고 웹 서비스에는 Apache를 사용합니다.  
바이러스 백신 호환성 | 문서에는 바이러스 검사에서 제외할 경로 목록이 나와 있습니다.  
데이터 주권 | Eviden은 유럽 Atos 그룹의 자회사입니다. SafeKit Windows 및 Linux 환경에서 비즈니스 연속성 및 재해 복구 솔루션을 제공합니다. 데이터와 장애 조치 인프라를 미국 공급업체에 의존하지 않고 완전히 사내에 구축할 수 있습니다. 이러한 접근 방식은 NIS2의 비즈니스 연속성 및 재해 복구 요구 사항을 충족합니다.  
  
## 라이선스 {#licensing-model}

측면 | 세부  
---|---  
라이선스 유형 | 영구 라이선스는 한 번 구매하면 호스트 이름에 연결됩니다.  
라이선스 범위 | 서버(노드)당 하나의 라이선스가 필요합니다.  
라이선스 활성화 | 라이선스 키는 인터넷 연결 없이도 활성화할 수 있습니다.  
무료 체험 | 무료 체험판에는 모든 기능이 포함되어 있습니다.  
한 달 무료 라이선스 | 개념 증명 테스트에 참여 가능합니다.  
  
## 지원 및 유지보수 서비스 수준 {#support-maintenance-slas}

### 유효한 유지보수 계약이 포함된 표준 지원 및 유지보수 서비스 {#standard-support-maintenance-included-with-active-maintenance-contract}

서비스 | 세부  
---|---  
지원 포털 액세스 | 해당 웹 포털은 지정된 기술 담당자 최대 4명에 대해 연중무휴 24시간 이용 가능합니다.  
실시간 지원 시간 | 유럽 지원 센터는 월요일부터 금요일까지 오전 9시부터 오후 5시까지 운영합니다.  
사건 확인 | 지원 센터에서 4영업시간 이내에  
업데이트 및 업그레이드 | 모든 서비스 팩, 업데이트 및 업그레이드는 추가 비용 없이 포함됩니다.  
라이선스 키 교체 | 유효한 지원 계약이 있는 경우 호스트 이름이 변경될 때 라이선스 키를 재할당할 수 있습니다. 양도는 동일 프로젝트 내 서버 교체로 제한됩니다. Eviden의 사전 서면 승인이 필요합니다.  
지식 기반 접근 | 기술 자료 문서, 자주 묻는 질문 및 온라인 문서에 대한 전체 액세스 권한이 제공됩니다.  
SafeKit 없이 애플리케이션 시작 또는 중지 | SafeKit 중지한 다음 래퍼 스크립트를 사용하여 애플리케이션을 시작하거나 중지하십시오. 이 스크립트는 애플리케이션 시작 및 중지 스크립트를 호출합니다. 또한 필요에 따라 가상 IP 주소를 추가하거나 제거합니다.  
지원 포털 | <https://customercare.evidian.com>  
  
### 지원 계약이 필요 없는 무료 리소스 {#free-resources-no-contract-required}

의지 | 세부  
---|---  
AI 지원 도우미 | safekit.eviden.com에서 [SafeKit AI 챗봇을](</ko/resources/safekit-support/#ai-support>) 사용해 보세요. safekit.eviden.com/llms.txt에 있는 정보를 활용하여 AI 언어 모델을 사용할 수도 있습니다.  
온라인 교육 및 인증 | 총 3시간 40분 분량의 무료 동영상 12개를 통해 원하는 속도로 학습하세요. 교육 과정을 완료하면 수료증을 받으실 수 있습니다.  
선적 서류 비치 | 사용자 가이드, 릴리스 노트, 기술 자료 및 빠른 설치 가이드  
  
## 다른 솔루션과의 비교 {#comparison-vs-alternatives}

표준 | SafeKit | 마이크로소프트 장애 조치 클러스터(WSFC) | VMware HA | 오픈 소스*  
---|---|---|---|---  
공유 스토리지(SAN/vSAN) 필요 | 아니요 | 예 | 예 | 아니요  
윈도우 지원 | 예 | 예 | 예 | 아니요  
리눅스 지원 | 예 | 아니요 | 예 | 예  
원격지 배포 | 훌륭한 | 복잡한 | 복잡한 | 복잡한  
소프트웨어 퍼블리셔의 제품에 통합 | 예 | 아니요 | 아니요 | 아니요  
비용 | 노드당 영구 라이선스 | 윈도우 서버 및 SAN | vSphere Enterprise 및 SAN | 고급 통합 서비스  
설정 복잡성 | 설정 및 사용 준비 완료 | 높음: Active Directory, SAN 및 Witness 구성 | 높음: vCenter 및 공유 스토리지 구성 | 높음: 구성해야 할 개별 제품이 여러 개 있음  
유지보수 요구사항 | 웹 콘솔을 통해 관리되는 하나의 제품 | 높음: Active Directory 및 SAN 전문 지식 | 높음: vCenter에 대한 의존도 | 높음: 유지 관리해야 할 여러 개의 개별 제품  
  
_* Linux에서는 동일한 기능을 제공하기 위해 Corosync, Pacemaker, DRBD, Keepalived, STONITH 및 HAProxy 등 6개의 개별 오픈 소스 프로젝트가 필요합니다. SafeKit Windows와 Linux 모두에서 이러한 기능을 하나의 제품으로 제공합니다._

## 유용한 링크 {#quick-reference-links}

의지 | URL  
---|---  
제품 홈페이지 | [https://safekit.eviden.com/ko/](</ko/>)  
기술 개요 (텍스트 및 다이어그램이 포함된 워드 문서) | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
무료 체험 | [https://safekit.eviden.com/ko/resources/safekit-free-trial/](</ko/resources/safekit-free-trial/>)  
견적 받기 | [https://safekit.eviden.com/ko/safekit-pricing/](</ko/safekit-pricing/>)  
지원 포털 | <https://customercare.evidian.com>  
무료 AI 지원 | [https://safekit.eviden.com/ko/resources/safekit-support/](</ko/resources/safekit-support/>)  
무료 교육 및 인증 | [https://safekit.eviden.com/ko/resources/safekit-on-line-training/](</ko/resources/safekit-on-line-training/>)  
저희에게 연락하세요 | [https://safekit.eviden.com/ko/contact-us-for-safekit/](</ko/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-ko  %}}
