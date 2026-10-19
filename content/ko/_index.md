---
title: "SafeKit: SAN 없는 Windows 및 Linux 고가용성 소프트웨어"
canonical: "https://safekit.eviden.com/ko/"
description: "SafeKit은 Windows 및 Linux용 올인원 SAN 없는 고가용성 소프트웨어입니다. 실시간 동기식 복제, 자동 장애 조치 및 부하 분산을 간단하고 경제적인 하나의 패키지로 제공합니다. 30일 무료 평가판을 시작하세요."
category: "home"
lang: "ko"
topics: "SafeKit의 기능, 보호 수준 선택, 애플리케이션용 사전 구성 모듈, 고객 사용 사례, 간단하고 예측 가능한 가격, 시작 전 제한 사항 확인, 🔍 SafeKit 고가용성 탐색 허브"
---

# SafeKit: SAN 없는 Windows 및 Linux 고가용성 소프트웨어

SafeKit은 표준 서버 두 대를 SAN 없는 고가용성 클러스터로 전환하여 애플리케이션을 계속 실행합니다. 데이터를 실시간으로 복제하고 첫 번째 서버에 장애가 발생하면 두 번째 서버에서 애플리케이션을 다시 시작하며, 수리된 서버도 자동으로 클러스터에 다시 통합합니다. 공유 스토리지나 클러스터 전문 지식 없이 기존 서버에 설치할 수 있습니다.

복제는 동기식이므로 서버 장애 시 데이터가 손실되지 않으며 애플리케이션은 약 1분 이내에 복구됩니다. 라이선스는 영구 라이선스이며 서버별로 가격이 책정됩니다.

<a class="btn-download" href="/ko/resources/safekit-free-trial/">30일 무료 평가판 시작 ›</a>

## SafeKit의 기능 {#features}

SafeKit은 네 가지 기능을 하나의 제품에 통합하며 Windows와 Linux에서 웹 콘솔 또는 명령줄로 관리할 수 있습니다.

| 기능 | 작동 방식 |
|---|---|
| **실시간 복제** | 파일의 모든 변경 사항을 발생 즉시 두 번째 서버에 복사하여 장애 시 데이터 손실을 방지합니다. |
| **자동 장애 조치** | SafeKit이 장애를 감지하고 가상 IP 주소를 이동한 다음 다른 서버에서 애플리케이션을 다시 시작합니다. |
| **자동 복귀** | 수리된 서버가 백그라운드에서 다시 동기화되는 동안 애플리케이션은 계속 실행됩니다. |
| **부하 분산** | 네트워크 부하 분산이 서버 내부에서 실행되므로 외부 로드 밸런서나 프록시가 필요하지 않습니다. |

![Windows 및 Linux 2노드 미러 클러스터를 모니터링하는 SafeKit 웹 콘솔, PRIM 및 SECOND 서버와 활성 데이터 복제 상태 표시](/wp-content/uploads/2026/05/mirror-monitoring-prim-second.png)

SAN, 쿼럼 디스크, Active Directory 또는 운영 체제나 데이터베이스의 Enterprise 에디션이 필요하지 않습니다.

<a class="btn-download" href="/ko/architectures/">클러스터 아키텍처 살펴보기 ›</a>

## 보호 수준 선택 {#protection-levels}

**애플리케이션 HA**(`mirror.safe`, `farm.safe` 및 애플리케이션 모듈)는 애플리케이션 데이터만 복제하고 두 번째 서버에서 애플리케이션을 다시 시작합니다. 다시 시작할 서비스, 실시간 복제할 폴더, 장애 조치할 가상 IP 주소를 알고 있어야 합니다. 물리 서버, VMware·Hyper-V·KVM을 포함한 모든 하이퍼바이저의 가상 머신, 클라우드에서 작동하며 가장 빠른 복구를 제공합니다.

**VM HA**(`hyperv.safe`, `kvm.safe`)는 가상 머신 전체를 복제하고 장애 조치하므로 애플리케이션 작동 방식을 알 필요가 없습니다. 여러 VM에 여러 애플리케이션이 분산된 환경에 적합합니다.

<a class="btn-download" href="/ko/best-practises/vm-ha-vs-application-ha/">애플리케이션 HA와 VM HA 비교 ›</a>

## 애플리케이션용 사전 구성 모듈 {#modules}

사전 구성 모듈은 무료이며 제품에 포함되어 있습니다. 각 모듈은 특정 애플리케이션에 대해 다시 시작할 서비스와 복제할 폴더를 정의합니다.

- **데이터베이스:** SQL Server, PostgreSQL, Oracle, MySQL, MariaDB, Firebird
- **웹:** Apache, IIS, NGINX
- **VM 및 컨테이너:** Hyper-V, KVM, Docker, Podman, Kubernetes (k3s)
- **클라우드:** AWS, Azure, GCP 및 기타 클라우드
- **물리 보안 및 산업:** Milestone XProtect, Genetec, Nedap, Bosch, Hanwha, Siemens

<a class="btn-download" href="/ko/solutions/">모든 솔루션 및 모듈 보기 ›</a>

## 고객 사용 사례 {#use-cases}

- **영상 관리(VMS):** 서버 장애 중에도 실시간 영상과 녹화 영상을 사용할 수 있습니다. Milestone, Genetec, Hanwha와 함께 사용됩니다.
- **출입 통제(EACS):** 자격 증명과 경보를 항상 사용할 수 있도록 유지합니다. Hirsch Microsesame, Nedap AEOS, Siemens SiPass와 함께 사용됩니다.
- **SCADA 및 산업:** Probat 커피 로스터와 ALSTEF 수하물 분류 시스템 등의 생산 라인 제어를 유지합니다.
- **건물 관리(BMS):** HVAC, 보안 및 에너지 시스템을 계속 작동시킵니다. Siemens Desigo CC 및 Bosch BIS와 함께 사용됩니다.
- **항공 교통 관제(ATC):** ADB SafeGate와 같은 활주로 측 중요 애플리케이션에 관제사가 계속 연결되도록 합니다.
- **지하철 운영 제어(OCC):** 파리의 자동 무인 지하철 노선에 대한 감시를 유지합니다.
- **엣지 사이트:** 데이터 센터가 없는 곳에서도 표준 서버 두 대로 HA 클러스터를 구성합니다.
- **소프트웨어 공급업체(OEM):** 소프트웨어 전용 옵션으로 고가용성을 제품 카탈로그에 추가합니다.

<a class="btn-download" href="/ko/use-cases/">모든 사용 사례 보기 ›</a>

## 간단하고 예측 가능한 가격 {#pricing}

SafeKit은 의무 구독 없이 영구 라이선스로 판매됩니다. 가격은 CPU 코어 또는 소켓이 아닌 서버 수만을 기준으로 하며 모든 애플리케이션 모듈은 무료입니다. Windows, Linux 및 데이터베이스의 Standard 에디션에서도 작동하므로 Enterprise 에디션 비용을 지불할 필요가 없습니다.

<a class="btn-download" href="/ko/safekit-pricing/">견적 요청 ›</a>

## 시작 전 제한 사항 확인 {#limits}

SafeKit은 단순성을 위해 설계되었으며 모든 상황에 적합한 것은 아닙니다. 복제 데이터 수 테라바이트, 파일 1,000,000개 미만, VM HA 사용 시 최대 32대의 VM, 낮은 지연 시간(일반적으로 왕복 5ms 미만)의 동일 LAN 또는 VLAN에 연결된 노드 2대에 적합합니다.

더 큰 용량에는 공유 스토리지나 다른 방식이 더 적합합니다.

<a class="btn-download" href="/ko/product/#safekit-ha-limitations">전체 제한 사항 보기 ›</a>

{{%  insert-safekit-hub-kr  %}}
