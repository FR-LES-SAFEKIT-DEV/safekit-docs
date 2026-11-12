---
title: "RFI 및 RFP 문서용 SafeKit 기술 참조서"
canonical: "https://safekit.eviden.com/ko/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "SafeKit에 대한 기술 정보를 찾아 정보 요청(RFI) 및 제안 요청(RFP)을 준비하세요. 지원되는 시스템, 아키텍처, 복구 시간, 보안, 라이선스 및 지원에 대해 알아보세요."
category: "resources"
lang: "ko"
topics: "개요, 목차, 제품 정보, 지원되는 운영 체제 및 플랫폼, SafeKit 고가용성 제한 사항, 사전 구성된 애플리케이션 모듈, 아키텍처 및 배포, 데이터 손실 및 복구 시간(RPO 및 RTO), 원격 사이트 및 분산 배포, 모니터링 및 알림, 보안 및 규정 준수, 라이선싱, 지원 및 유지보수, 다른 솔루션과의 비교, 유용한 링크"
translation: "translate_md 2026-11-11.5 | glossaire 2026-11-11.10 | Translation LLM | 50 expressions"
---

# RFI 및 RFP 문서용 SafeKit 기술 참조 {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## 개요 {#overview}

이 페이지를 사용하여 정보 요청(RFI) 또는 제안 요청(RFP)을 준비하십시오. SafeKit 고가용성 소프트웨어에 대한 일반적인 기술 질문에 답변합니다. 이 정보는 조달팀과 솔루션 설계자가 요구 사항을 정의하는 데 도움이 됩니다.

## 목차 {#table-of-contents}

  1. [제품 정보](#product-identity)
  2. [지원되는 운영 체제 및 플랫폼](#supported-operating-systems-platforms)
  3. [SafeKit 고가용성 제한 사항](#safekit-ha-limitations)
  4. [사전 구성된 애플리케이션 모듈](#pre-built-application-modules)
  5. [아키텍처 및 배포](#architecture-deployment-model)
  6. [데이터 손실 및 복구 시간(RPO 및 RTO)](#rpo-rto-capabilities)
  7. [원격 사이트 및 분산 배포](#edge-distributed-deployment-suitability)
  8. [모니터링 및 알림](#monitoring-management-alerting)
  9. [보안 및 규정 준수](#security-compliance)
  10. [라이선싱](#licensing-model)
  11. [지원 및 유지보수](#support-maintenance-slas)
  12. [다른 솔루션과의 비교](#comparison-vs-alternatives)
  13. [유용한 링크](#quick-reference-links)


## 제품 정보 {#product-identity}

주제 | 세부 정보  
---|---  
제품명 | SafeKit  
공급업체 | Eviden 아토스 그룹의 일부입니다. 이전 명칭은 Evidian 이었습니다.  
개발 국가 | 프랑스  
제품 카테고리 | 애플리케이션 클러스터링, 고가용성 및 재해 복구를 위한 소프트웨어  
현재 버전 | SafeKit 8.2  
웹사이트 | [https://safekit.eviden.com](/ko/)  
첫 번째 릴리스 | 2000. 20년 이상 생산에 사용되었습니다.  
  
{{%  insert-supported-os-ko  %}}

{{%  insert-safekit-usage-ko  %}}

## 사전 구성된 애플리케이션 모듈 {#pre-built-application-modules}

SafeKit은에는 즉시 사용 가능한 `.safe` 모듈이 포함되어 있습니다. 애플리케이션을 보호하는 방법에는 두 가지가 있습니다. **애플리케이션 고가용성**은 mirror 또는 <span class="notranslate farm-term" translate="no">farm</span> 모듈로 애플리케이션을 직접 보호합니다. **가상 머신 고가용성**은 hyperv.safe 또는 kvm.safe 모듈로 전체 가상 머신을 보호합니다.

비교 기준 | 애플리케이션 고가용성 | 가상 머신 고가용성  
---|---|---  
구성 | 어떤 애플리케이션 서비스를 다시 시작해야 하고 어떤 폴더를 복제해야 하는지 알아야 합니다. 또한 장애 조치에 사용되는 가상 IP 주소를 구성해야 합니다. | 가상 머신 파일의 위치만 지정하면 됩니다. 가상 머신 내의 애플리케이션이 어떻게 작동하는지 알 필요는 없습니다. 이 접근 방식은 애플리케이션과 운영 체제를 함께 보호합니다.  
권장 사용법 | 특정 하드웨어나 특정 하이퍼바이저에 의존하지 않고 소프트웨어 솔루션에 고가용성을 직접 추가하세요. | 하나의 고가용성 정책으로 여러 가상 머신에 걸쳐 여러 애플리케이션을 관리하세요.  
  
아래 표에는 사용 가능한 모든 `.safe` 모듈이 나와 있습니다:

애플리케이션 고가용성 | 가상 머신 고가용성  
---|---  
새로운 Windows 앱 — mirror.safe | Hyper-V VM — hyperv.safe (Windows)  
새로운 Linux 앱 — mirror.safe | KVM VM — kvm.safe (Linux)  
Windows 부하 분산 — farm.safe | Docker 컨테이너 — mirror.safe (Linux)  
Linux 로드 밸런싱 — farm.safe | Podman 컨테이너 — mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | K3s Kubernetes — k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows 및 Linux) | Bosch AMS — hyperv.safe (Windows)  
MySQL — mysql.safe (Windows 및 Linux) | Bosch BIS — hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows 및 Linux) | Bosch BVMS — hyperv.safe (Windows)  
Oracle — oracle.safe (Windows 및 Linux) | Hanwha Vision — hyperv.safe (Windows)  
Firebird — firebird.safe (Windows 및 Linux) | Hanwha Wisenet — hyperv.safe (Windows)  
Apache — apache_farm.safe (Windows 및 Linux) | Siemens Siveillance 제품군 — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | Siemens Desigo CC — hyperv.safe (Windows)  
NGINX — farm.safe (Windows 및 Linux) | Siemens SiPass — hyperv.safe (Windows)  
Milestone XProtect — milestone.safe (Windows) | Siemens SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
Genetec (SQL Server) — sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
Siemens Siveillance VMS — SiveillanceVMS.safe (Windows) |   
클라우드(AWS, Azure, GCP, 일반) — mirror.safe/farm.safe |   
  
## 아키텍처 및 배포 {#architecture-deployment-model}

### 두 개의 클러스터 모듈: mirror.safe 및 farm.safe {#two-cluster-modules}

모듈 | 작동 원리 | 일반적인 적용 분야  
---|---|---  
mirror.safe | 하나의 서버는 활성 상태이고 다른 하나는 대기 상태입니다. 파일은 바이트 수준에서 동기적으로 복제됩니다. 장애 조치는 자동으로 이루어집니다. | 데이터베이스, 상태를 저장하는 애플리케이션, 한 번에 하나의 서버에서만 실행되는 서비스  
farm.safe | 여러 서버가 동시에 활성화됩니다. SafeKit 서버 간 네트워크 트래픽을 분산하고 장애 조치를 자동으로 처리합니다. | 웹 서버, 상태 비저장 마이크로서비스, API 게이트웨이, 여러 서버에서 동시에 실행되는 서비스  
  
### 클러스터 인프라 {#cluster-infrastructure-architecture}

요구 사항 | SafeKit 기능  
---|---  
공유 스토리지 필요하세요? | 아니요. SafeKit은 로컬 디스크를 사용합니다. SAN 이나 공유 스토리지가 필요하지 않습니다.  
Active Directory가 필요합니까? | 아니요. SafeKit Windows 도메인이나 Active Directory가 필요하지 않습니다. 또한 워크그룹도 지원합니다.  
클러스터의 노드 수 | 노드 2개(mirror) 또는 노드 2개 이상(<span class="notranslate farm-term" translate="no">farm</span>)  
가상 IP 주소(VIP) | 애플리케이션 고가용성의 경우, 가상 IP 주소는 Gratuitous ARP 통해 활성 노드로 자동 이동합니다. 가상 머신 고가용성의 경우, 가상 머신 내부의 IP 주소로의 트래픽은 자동으로 리디렉션됩니다. 별도의 가상 IP 주소는 필요하지 않습니다. 노드는 LAN 또는 사이트 간에 확장된 VLAN을 공유해야 합니다.  
3개의 노드로 구성된 아키텍처 | SafeKit LAN 또는 사이트 간에 확장된 VLAN에서 2노드 mirror 클러스터를 실행합니다. 이 제품은 데이터 손실이 없는 동기 복제(RPO = 0)와 자동 장애 조치를 제공합니다. 별도의 백업 제품은 WAN을 통해 데이터를 비동기적으로 세 번째 노드로 복제합니다. 이 백업을 통해 이전 시점으로 복구할 수 있으며 랜섬웨어로부터 보호받을 수 있습니다.  
고가용성의 목적 | SafeKit은 데이터를 두 노드에 모두 동기식으로 복제합니다. 이를 통해 하드웨어 또는 소프트웨어 장애 발생 시 데이터 손실 없이 자동 장애 조치가 가능합니다. 그러나 논리적 오류, 데이터 손상 및 실수로 인한 삭제도 즉시 대기 노드로 복사됩니다.  
백업의 목적 | 백업을 사용하면 이전 시점으로 데이터를 복원할 수 있습니다. SafeKit은 아닌 별도의 백업 제품이 비동기 복제를 통해 이러한 보호 기능을 제공합니다. 백업은 랜섬웨어 및 인적 오류로부터 복구하는 데 도움이 됩니다. 이 복구는 자동 장애 조치가 아닙니다. 이전 백업을 복원하면 해당 백업 이후에 이루어진 변경 사항이 손실됩니다.  
동시에 실행되는 최대 모듈 수 | 2노드 클러스터는 최대 32개의 모듈을 동시에 관리할 수 있습니다. 가상 머신 보호를 위해 각 모듈은 서로 다른 가상 머신을 복제하고 다시 시작합니다. 각 모듈은 어느 노드에서든 기본이 될 수 있으므로 두 서버 모두 워크로드를 공유할 수 있습니다. 총 데이터 양은 장애 조치 또는 노드 재시작 후 재동기화 시간에 영향을 미칩니다.  
각 노드에 소프트웨어가 설치되어 있나요? | 네. 각 노드에 경량 소프트웨어가 설치됩니다.  
지원되는 애플리케이션 | SafeKit은 모든 Windows 서비스 또는 Linux 데몬을 보호할 수 있습니다. 30개 이상의 애플리케이션에 대해 사전 구성된 모듈을 사용할 수 있습니다.  
  
### 복제 및 데이터 보호 {#replication-data-protection}

요구 사항 | SafeKit 기능  
---|---  
복제 방법 | SafeKit은 바이트 수준에서 파일 변경 사항을 복제합니다. 디스크 블록은 복제하지 않습니다.  
복제 모드 | 데이터 손실 없는 동기 복제  
네트워크 요구 사항 | 동기 복제의 경우 노드 간 왕복 지연 시간이 5ms 미만이어야 합니다.  
권장 데이터 볼륨 | 재동기화 시간을 관리 가능한 수준으로 유지하기 위해 몇 테라바이트 정도  
권장 파일 수 | 재동기화 시간을 관리 가능한 수준으로 유지하려면 1,000,000개 미만의 파일을 사용하세요  
1TB에 대한 재동기화 시간 | 1Gb/s 네트워크에서는 약 3시간, 10Gb/s 네트워크에서는 1시간  
선택적 복제 | 복제할 디렉터리와 파일을 선택할 수 있습니다.  
전송 중 암호화 | 복제 트래픽은 TLS/SSL로 암호화됩니다.  
  
## 데이터 손실 및 복구 시간(RPO 및 RTO) {#rpo-rto-capabilities}

### 각 클러스터 유형별 RPO 및 RTO {#rto-rpo-cluster-type}

미터법 | Mirror (mirror.safe) | <span class="notranslate farm-term" translate="no">Farm</span> (farm.safe)  
---|---|---  
복구 지점 목표(RPO) | 데이터 손실 제로. 쓰기 작업은 두 노드 모두 데이터를 기록했을 때만 완료됩니다. | 상태 비저장 서비스에는 적용되지 않습니다. 데이터는 별도의 mirror 클러스터에서 관리됩니다.  
복구 시간 목표(RTO) | 약 1분입니다. 여기에는 <span class="notranslate farm-term" translate="no">하트비트</span> 시간 초과(기본값 30초)와 애플리케이션을 다시 시작하는 데 걸리는 시간이 포함됩니다. | 몇 초 후 트래픽이 나머지 활성 노드로 재분배됩니다.  
복제 유형 | 동기식, 실시간, 바이트 수준 파일 복제 | 해당 없음  
장애 조치 트리거 | <span class="notranslate farm-term" translate="no">하트비트</span> 메시지가 중단되거나, 프로세스가 충돌하거나, 검사기가 오류를 감지하면 장애 조치가 자동으로 시작됩니다 | 페일오버는 <span class="notranslate farm-term" translate="no">하트비트</span> 메시지가 중단되거나, 프로세스가 충돌하거나, 검사기가 오류를 감지하면 자동으로 시작됩니다  
수동 개입이 필요합니까? | 아니요. 장애 조치 및 장애 복구는 자동으로 이루어집니다. | 아니요. 장애 조치 및 장애 복구는 자동으로 이루어집니다.  
  
### Mirror 클러스터로 보호되는 애플리케이션의 복구 시간 {#rto-breakdown-mirror-application-level-ha}

고장 유형 | 복구 시간 계산 방법  
---|---  
하드웨어 고장 | <span class="notranslate farm-term" translate="no">하트비트</span> 시간 초과(기본값 30초) 후 애플리케이션이 다시 시작됩니다  
소프트웨어 또는 프로세스 충돌 | 애플리케이션을 중지한 다음 다시 시작하는 시간  
운영 체제 충돌 | <span class="notranslate farm-term" translate="no">하트비트</span> 시간 초과 후 애플리케이션이 다시 시작됩니다. 대기 서버는 운영 체제가 이미 실행 중이므로 재부팅할 필요가 없습니다.  
  
### Mirror 클러스터로 보호되는 가상 머신의 복구 시간 {#rto-breakdown-mirror-vm-level-ha}

고장 유형 | 복구 시간 계산 방법  
---|---  
모든 실패 유형 | 오류를 감지하고 가상 머신 운영 체제를 재부팅하며 애플리케이션을 다시 시작하는 데 시간이 걸립니다. 일반적으로 몇 분 정도 소요됩니다.  
  
## 원격 사이트 및 분산 배포 {#edge-distributed-deployment-suitability}

SafeKit은 원격 사이트, 지사 및 여러 지점을 둔 조직을 위해 설계되었습니다.

원격지 요구사항 | SafeKit 기능  
---|---  
현장에 상주하는 IT 직원이 없습니다 | 장애 조치는 자동으로 이루어지며 수동 조치가 필요하지 않습니다.  
공유 스토리지 없음(SAN 또는 NAS) | 로컬 디스크만 있으면 됩니다. 공유 스토리지는 필요하지 않습니다.  
원격 관리 | 웹 콘솔을 통해 클러스터를 관리합니다.  
제한된 하드웨어 | 표준 서버 또는 가상 머신 두 대면 충분합니다. 특별한 하드웨어는 필요하지 않습니다.  
방화벽 및 네트워크 주소 변환(NAT) | 포트를 구성할 수 있습니다. 웹 콘솔은 HTTPS를 사용합니다.  
사이트 간 재해 복구 | Mirror 클러스터 두 사이트 간에 확장된 VLAN을 통해 두 사이트를 연결할 수 있습니다.  
소프트웨어 게시자의 통합 | 소프트웨어 게시자는 SafeKit 제품에 포함할 수 있습니다. 설치는 사용자 상호 작용 없이 실행할 수 있으며 스크립트로 자동화할 수 있습니다.  
여러 사이트에 걸쳐 수백 개의 SafeKit 클러스터가 있습니다 | SafeKit은 지점이 많은 조직을 위해 설계되었습니다.  
  
다음 사이트는 데이터 센터가 없더라도 고가용성이 필요합니다:

산업 | 일반적인 사이트 | 중요 애플리케이션  
---|---|---  
물리적 보안 및 감시 | 건물, 캠퍼스, 공항 | VMS — Milestone, Genetec, Hanwha, Siemens Siveillance  
건물 관리 시스템(BMS) | 사무실 건물, 병원, 공장 | Siemens Desigo CC, Bosch BIS/BVMS  
전자식 출입 통제(EACS) | 보안 시설, 캠퍼스 | Siemens SiPass, Nedap, Bosch AMS  
SCADA 및 산업 제어 | 공장, 변전소, 정수장 | Windows 또는 Linux에서 실행되는 모든 SCADA, DCS 또는 HMI 소프트웨어  
항공 교통 관제(ATC) | 공항, 관제탑 | ATC 관리 및 레이더 시스템  
운영 통제 센터(OCC) | 지하철, 철도, 대중교통 허브 | 철도 신호 및 역무 관리  
해양 | 선박, 해군 함정 | 항법, 화물 및 선상 관리 시스템  
석유 및 가스 | 해상 플랫폼, 원격 시추 장비 | 공정 제어 및 안전 시스템  
통신 | 5G 안테나 사이트, MEC 노드 | 다중 접속 엣지 컴퓨팅(MEC) 서버  
의료 | 클리닉, 원격 진단 센터 | 의료 영상, 환자 데이터, 원격 진단  
소매 | 매장, 지점, 창고 | 판매 시점 관리 및 재고 관리  
방어 | 전방 작전 기지, 현장 부대 | 미션 크리티컬 지휘 통신 시스템  
  
## 모니터링 및 알림 {#monitoring-management-alerting}

특징 | 세부 정보  
---|---  
웹 콘솔 | 웹 애플리케이션 또는 PWA(프로그레시브 웹 앱)를 통해 클러스터 노드를 구성, 모니터링 및 관리합니다.  
모바일 알림 | 모듈의 상태가 변경되면 브라우저 알림을 받습니다.  
타임라인 | 모듈 상태 변경 및 이벤트를 시간순으로 확인합니다.  
이메일 알림 | 내장된 이메일 에이전트가 알림을 보냅니다.  
명령줄 인터페이스 | 명령줄 인터페이스를 사용하여 스크립트를 작성하고 작업을 자동화하세요.  
로그 관리 | 각 모듈과 스크립트에는 자체 로그 파일이 있습니다. 지원팀은 모듈 <span class="notranslate farm-term" translate="no">snapshots</span>를 사용하여 문제를 조사합니다.  
모니터링 도구와의 통합 | SafeKit은 주요 클러스터 이벤트를 Windows 이벤트 로그 또는 Linux Syslog에 기록합니다. 모니터링 도구는 이러한 이벤트를 수집하고 표준 규칙으로 경고를 트리거할 수 있습니다. 이 기능은 맞춤형 개발 없이 Nagios, Zabbix, Splunk 및 SIEM 도구와 함께 작동합니다.  
  
## 보안 및 규정 준수 {#security-compliance}

특징 | 세부 정보  
---|---  
HTTPS | 웹 콘솔은 TLS 인증서가 있는 HTTPS를 사용합니다.  
사용자 인증 | 로컬 계정, LDAP, 인증서(PKI) 및 OpenID Connect  
사용자 역할 | 관리, 제어 및 모니터링을 위한 액세스 정책을 구성합니다.  
암호화 | TCP 트래픽은 복제, 웹 콘솔 및 분산 명령에 TLS/SSL을 사용합니다. UDP 트래픽은 <span class="notranslate farm-term" translate="no">하트비트</span> 메시지 및 내부 safeadmin 프로토콜에 SHA256를 사용하는 AES-128-CBC 암호화를 사용합니다. OpenSSL 라이브러리는 암호화를 제공합니다. 웹 서비스는 Apache에서 실행됩니다.  
백신 | 설명서에는 바이러스 백신 검사에서 제외할 경로가 나와 있습니다.  
주권 | SafeKit은 Atos 그룹의 일원인 Eviden 프랑스에서 개발했습니다. 은 데이터와 서버를 온프레미스에 유지하면서 Windows 및 Linux 애플리케이션을 보호합니다. SafeKit은 비즈니스 연속성 및 재해 복구에 대한 유럽 NIS2 지침의 요구 사항을 충족하는 데 도움이 될 수 있습니다.
  
## 라이선싱 {#licensing-model}

주제 | 세부 정보  
---|---  
라이선스 유형 | 영구 라이선스는 한 번 구매하며 호스트 이름에 연결됩니다.  
라이선스 범위 | 서버(노드)당 라이선스 1개  
라이선스 활성화 | 라이선스 키는 인터넷 연결 없이도 활성화할 수 있습니다.  
무료 체험 | 무료 체험에는 모든 기능이 포함됩니다.  
한 달 무료 라이선스 | 개념 증명 테스트 가능  
  
## 지원 및 유지보수 {#support-maintenance-slas}

### 유효한 유지보수 계약에 따른 표준 지원 및 유지보수 {#standard-support-maintenance-included-with-active-maintenance-contract}

서비스 | 세부 정보  
---|---  
지원 포털 액세스 | 웹 포털은 연중무휴 24시간 이용 가능하며, 최대 4명의 지정된 기술 담당자가 이용할 수 있습니다.  
실시간 지원 시간 | 월요일부터 금요일, 09:00 부터 17:00 까지, 유럽 지원 센터에서  
사건 인지 | 영업일 기준 4시간 이내. 영업시간은 지원 센터의 실시간 지원 시간입니다.  
업데이트 및 업그레이드 | 모든 서비스 팩, 업데이트 및 업그레이드는 추가 비용 없이 포함됩니다.  
라이선스 키 교체 | 유효한 지원 계약이 있는 경우 호스트 이름이 변경되면 라이선스 키를 재할당할 수 있습니다. 이전은 동일한 프로젝트 내에서 서버를 교체하는 것으로 제한됩니다. Eviden의 사전 서면 승인이 필요합니다.  
지식 베이스 액세스 | 지식 기반 문서, 자주 묻는 질문, 온라인 설명서에 대한 전체 액세스 권한  
비상 절차 | SafeKit은 SafeKit의 고가용성 기능을 사용하지 않고 애플리케이션을 시작하거나 중지하는 래퍼 스크립트를 제공합니다. 이 스크립트는 애플리케이션 시작 및 중지 스크립트를 호출합니다. 또한 필요할 때 가상 IP 주소를 추가하거나 제거합니다.  
지원 포털 | <https://customercare.evidian.com>  
  
### 지원 계약이 없는 무료 리소스 {#free-resources-no-contract-required}

무료 자료 | 세부 정보  
---|---  
지원용 AI 비서 | safekit.eviden.com에서 [SafeKit AI 챗](</ko/resources/safekit-support/#ai-support>)을 사용하세요.   
온라인 교육 및 자격증 | 총 4시간 분량의 무료 동영상으로 [원하는 속도에 맞춰 학습하세요](/ko/resources/safekit-on-line-training/). 교육을 이수하면 수료증을 받게 됩니다.  
문서 | 사용자 가이드, 릴리스 노트, 기술 자료 및 빠른 설치 가이드는 [여기에서](/ko/resources/safekit-free-trial/) 확인하세요  
  
## 다른 솔루션과의 비교 {#comparison-vs-alternatives}

기준 | SafeKit | Microsoft 장애 조치 클러스터(WSFC) | VMware HA | 오픈 소스 [1]  
---|---|---|---|---  
공유 스토리지(SAN/vSAN) 필요 | 아니요 | 네 | 네 | 아니요  
Windows 지원 | 네 | 네 | 네 | 아니요  
Linux 지원 | 네 | 아니요 | 네 | 네  
원격 사이트 배포 | 훌륭합니다 | 복합 | 복합 | 복합  
OEM | 네 | 아니요 | 아니요 | 아니요  
비용 | 노드당 영구 라이선스 | Windows Server 및 SAN | vSphere Enterprise 및 SAN | 고급 통합 서비스  
설정 복잡성 | 낮음: 설치 및 구성할 제품 1개 | 높음: Active Directory, SAN 및 증인 구성 | 높음: vCenter 및 공유 스토리지 구성 | 높음: 구성할 여러 개의 개별 제품  
관리 | 웹 콘솔을 통해 관리되는 단일 제품 | 상급: Active Directory 및 SAN 전문 지식 필요 | 높음: vCenter에 따라 달라짐 | 높음: 유지 관리해야 할 여러 개의 개별 제품  
  
**[1]** Linux 에서는 동일한 기능 세트를 제공하기 위해 Corosync, Pacemaker, DRBD, Keepalived, STONITH, HAProxy의 6가지 개별 오픈 소스 프로젝트가 필요합니다. SafeKit은 Windows와 Linux 모두에서 이러한 기능을 하나의 제품으로 제공합니다.

## 유용한 링크 {#quick-reference-links}

링크 | URL  
---|---  
제품 홈페이지 | [https://safekit.eviden.com](/ko/)  
기술 개요(텍스트 및 다이어그램이 포함된 Word 문서) | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
무료 체험 | [https://safekit.eviden.com/resources/safekit-free-trial/](</ko/resources/safekit-free-trial/>)  
견적 받기 | [https://safekit.eviden.com/safekit-pricing/](</ko/safekit-pricing/>)  
지원 포털 | <https://customercare.evidian.com>  
무료 AI 지원 | [https://safekit.eviden.com/resources/safekit-support/](</ko/resources/safekit-support/>)  
무료 교육 및 자격증 | [https://safekit.eviden.com/resources/safekit-on-line-training/](</ko/resources/safekit-on-line-training/>)  
문의하기 | [https://safekit.eviden.com/contact-us-for-safekit/](</ko/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-ko  %}}