---
title: "SafeKit: SAN 없이 Windows 및 Linux용 고가용성 소프트웨어"
canonical: "https://safekit.eviden.com/ko/"
description: "SafeKit은 Windows 및 Linux용 올인원 SANless HA 소프트웨어입니다. 실시간 동기 복제, 자동 장애 조치, 부하 분산을 하나의 간단하고 비용 효율적인 패키지로 이용해 보세요. 30일 무료 평가판을 시작하세요."
category: "home"
lang: "ko"
topics: "SafeKit의 기능, 보호 수준 선택, 애플리케이션용 기성 모듈, 고객 사용 사례, 간단하고 예측 가능한 가격 책정, 시작하기 전에 한계 파악, SafeKit 비디오 라이브러리, 🔍 SafeKit 살펴보기"
translation: "translate_md 2026-11-05.8 | glossaire 2026-11-05.12 | Translation LLM | 21 expressions"
---

# SafeKit: SAN 없이 Windows 및 Linux용 고가용성 소프트웨어 {#safekit-high-availability-software-for-windows-and-linux-without-a-san}

SafeKit는 두 대의 표준 서버를 SAN이 필요 없는 고가용성 클러스터로 전환하여 애플리케이션을 계속 실행할 수 있도록 합니다. 데이터를 실시간으로 복제하고, 첫 번째 서버에 장애가 발생하면 두 번째 서버에서 애플리케이션을 다시 시작하며, 장애가 발생한 서버가 수리되면 자동으로 다시 통합합니다. 기존 서버에 설치할 수 있으며, 공유 스토리지나 클러스터 전문 지식이 필요하지 않습니다.

복제는 동기식으로 이루어지므로 서버 장애 시 데이터 손실이 없으며, 애플리케이션은 1분 이내에 복구됩니다. 라이선스는 영구적이며 서버당 가격이 책정됩니다.

<a class="btn-download" href="/ko/resources/safekit-free-trial/">30일 무료 체험 시작하기 ›</a>


## SafeKit의 기능 {#features}

SafeKit은 Windows 및 Linux 환경에서 단일 웹 콘솔 또는 단일 명령줄로 관리되는 네 가지 기능을 단일 제품에 결합합니다.

| 기능 | 작동 방식 |
|---|---|
| **실시간 복제** | 파일에 대한 모든 변경 사항은 발생하는 즉시 두 번째 서버에 복사되므로 장애가 발생해도 데이터가 손실되지 않습니다. |
| **자동 장애 조치** | SafeKit은 장애를 감지하고 가상 IP 주소를 이동시킨 후 다른 서버에서 애플리케이션을 다시 시작합니다. |
| **자동 페일백** | 수리된 서버는 애플리케이션이 계속 실행되는 동안 백그라운드에서 재동기화됩니다. |
| **부하 분산** | 네트워크 부하 분산은 외부 부하 분산기나 프록시 없이 서버 내에서 실행됩니다. |

![Windows 및 Linux용 2노드 mirror 클러스터 모니터링하는 SafeKit 웹 콘솔(PRIM 및 SECOND 서버 및 활성 데이터 복제 포함)](/wp-content/uploads/2026/05/mirror-monitoring-prim-second.png)

SAN, 쿼럼 디스크, Active Directory 또는 운영 체제나 데이터베이스의 엔터프라이즈 에디션은 필요하지 않습니다.

<a class="btn-download" href="/ko/architectures/">클러스터 아키텍처 살펴보기 ›</a>


## 보호 수준 선택 {#protection-levels}

**애플리케이션 HA** (`mirror.safe`, `farm.safe` 및 애플리케이션 모듈)는 애플리케이션 데이터만 복제하고 두 번째 서버에서 애플리케이션을 다시 시작합니다. 이를 위해서는 어떤 서비스를 다시 시작해야 하는지, 어떤 폴더를 실시간으로 복제해야 하는지, 어떤 가상 IP 주소로 장애 조치를 해야 하는지 알아야 합니다. 이 기능은 물리적 서버, VMware, Hyper-V 및 KVM을 포함한 모든 하이퍼바이저의 가상 머신, 클라우드에서 작동하며 가장 빠른 복구를 제공합니다.

**VM HA** (`hyperv.safe`, `kvm.safe`)는 전체 가상 머신을 복제하고 장애 조치하므로 애플리케이션이 어떻게 작동하는지 알 필요가 없습니다. 여러 VM에 분산된 여러 애플리케이션이 있는 환경에 적합합니다.

<a class="btn-download" href="/ko/best-practises/vm-ha-vs-application-ha/">애플리케이션 HA 와 VM HA 비교 ›</a>


## 애플리케이션용 기성 모듈 {#modules}

사전 구성된 모듈은 무료이며 제품에 포함되어 있습니다. 각 모듈은 특정 애플리케이션에 대해 어떤 서비스를 다시 시작하고 어떤 폴더를 복제할지 정의합니다.

- **데이터베이스:** SQL Server, PostgreSQL, Oracle, MySQL, MariaDB, Firebird
- **웹:** Apache, IIS, NGINX
- **VM 및 컨테이너:** Hyper-V, KVM, Docker, Podman, Kubernetes(k3s)
- **클라우드:** AWS, Azure, GCP 및 기타 클라우드
- **물리적 보안 및 산업:** Milestone XProtect, Genetec, Nedap, Bosch, Hanwha, Siemens

<a class="btn-download" href="/ko/solutions/">모든 솔루션 및 모듈 찾아보기 ›</a>


## 고객 사용 사례 {#use-cases}

- **비디오 관리 시스템(VMS):** 서버 장애 발생 시에도 실시간 및 녹화된 비디오를 사용할 수 있도록 합니다. Milestone, Genetec 및 Hanwha와 함께 사용됩니다.
- **접근 제어(EACS):** 자격 증명 및 경보를 항상 사용할 수 있도록 유지합니다. Hirsch Microsesame, Nedap AEOS 및 Siemens SiPass와 함께 사용됩니다.
- **SCADA 및 산업:** Probat 커피 로스터, ALSTEF 수하물 분류기 등 생산 라인을 작업자가 제어할 수 있도록 합니다.
- **건물 관리 시스템(BMS):** HVAC, 안전 및 에너지 시스템을 가동합니다. Siemens Desigo CC 및 Bosch BIS와 함께 사용됩니다.
- **항공 교통 관제(ATC):** 관제사를 중요한 공항 측 애플리케이션(예: ADB SafeGate)에 연결합니다.
- **메트로 운행 통제(OCC):** 자동화된 파리 무인 지하철 노선에 대한 감독을 유지합니다.
- **엣지 사이트:** 데이터 센터가 없는 곳에서 두 개의 표준 서버를 HA 클러스터로 전환합니다.
- **소프트웨어 게시자(OEM):** 소프트웨어 전용 옵션으로 카탈로그에 고가용성을 추가합니다.

<a class="btn-download" href="/ko/use-cases/">모든 사용 사례 살펴보기 ›</a>


## 간단하고 예측 가능한 가격 책정 {#pricing}

SafeKit은 영구 라이선스로 판매되므로 의무적인 구독료가 없습니다. 가격은 CPU 코어 또는 소켓이 아닌 서버 수에만 따라 결정되며, 모든 애플리케이션 모듈은 무료입니다. 또한 Windows, Linux 및 데이터베이스의 표준 에디션과 호환되므로 엔터프라이즈 에디션에 대한 비용을 지불할 필요가 없습니다.

<a class="btn-download" href="/ko/safekit-pricing/">견적 요청 ›</a>


## 시작하기 전에 한계를 파악하세요 {#limits}

SafeKit은 모든 경우를 위한 것이 아니라 단순함을 위해 구축되었습니다. 몇 테라바이트의 복제 데이터, 1,000,000개 미만의 파일, VM HA 사용 시 최대 32개의 VM, 그리고 낮은 지연 시간(일반적으로 왕복 5ms 미만)을 가진 동일한 LAN 또는 VLAN의 두 노드에 적합합니다.

더 많은 양의 데이터를 처리해야 할 경우, 공유 스토리지 또는 다른 접근 방식이 더 나은 선택입니다.

<a class="btn-download" href="/ko/product/#safekit-ha-limitations">전체 제한 사항 목록 보기 ›</a>


{{%  insert-safekit-videos-table-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}
