---
title: "Azure 네트워크 부하 분산 및 장애 조치: SafeKit farm.safe 모듈 설치"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-in-azure-with-network-load-balancing-and-failover/"
description: "SafeKit의 지능형 애플리케이션 모니터링으로 Azure 네트워크 부하 분산을 강화하세요. farm.safe 모듈은 Azure 부하 분산 장치 전용 상태 확인 기능을 제공하여 중요 애플리케이션의 애플리케이션 수준 고가용성, 자동 복구 및 장애 조치를 지원합니다."
category: "quick-install"
lang: "ko"
topics: "Azure 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit / Azure 솔루션 개요, Windows 및 Linux에 SafeKit / Azure 솔루션 설치(farm.safe), SafeKit / Azure 솔루션 단계별 구성, SafeKit farm 솔루션 데모, 🔍 SafeKit 고가용성 탐색 허브"
---

# Azure 네트워크 부하 분산 및 장애 조치: SafeKit farm.safe 모듈 설치 {#azure-network-load-balancing--failover-install-the-safekit-farmsafe-module}

{{%  insert-safekit-farm-guide-ko app="Azure" mod="farm"  %}}

## SafeKit / Azure 솔루션 개요 {#overview-of-the-safekit--azure-solution}

솔루션에 대한 설명은 여기에서 확인할 수 있습니다: **💡[SafeKit: Microsoft Azure 부하 분산 및 <span class="notranslate farm-term" translate="no">Farm</span> 클러스터를 통한 애플리케이션 고가용성](</ko/solutions/azure-load-balancing-cluster-failover/>)**.

## Windows 및 Linux에 SafeKit / Azure 솔루션 설치(farm.safe) {#installation-of-the-safekit--azure-solution-on-windows-and-linux-farmsafe}

### Microsoft Azure 부하 분산 장치 구성 {#configuration-of-the-microsoft-azure-load-balancer}

부하 분산 장치에는 가상 IP 주소를 구성해야 합니다.
또한 노드에 상태 확인 패킷을 주기적으로 보내도록 구성해야 합니다.
이를 위해 SafeKit은 노드 내에서 실행되는 상태 확인 기능을 제공하며 다음과 같이 동작합니다.

  * <span class="notranslate farm-term" translate="no">farm</span> 모듈 상태가 UP(녹색)이면 OK 반환
  * 그 외 모든 상태에서는 NOT FOUND 반환

Microsoft Azure 부하 분산 장치를 다음과 같이 구성해야 합니다.

  * HTTP 프로토콜
  * 포트 9010(SafeKit 웹 서버 포트)
  * URL /var/modules/farm/ready.txt(나중에 배포할 모듈 이름이 <span class="notranslate farm-term" translate="no">farm</span>인 경우)

자세한 내용은 [Microsoft Azure 부하 분산 장치 구성](<https://learn.microsoft.com/en-us/azure/load-balancer/>)을 참조하세요.

⚠️ 아래 단계별 구성의 4단계에서는 가상 IP 주소와 부하 분산 규칙을 구성하지 마세요. 가상 IP 주소와 부하 분산 규칙은 Microsoft Azure 부하 분산 장치에 이미 설정되어 있습니다. 4단계에서 설정하는 것은 온프레미스 구성에만 필요합니다.

### Microsoft Azure 네트워크 보안 구성 {#configuration-of-the-microsoft-azure-network-security}

다음 프로토콜과 포트를 통한 통신을 허용하도록 네트워크 보안을 구성해야 합니다.

  * UDP - 4800: safeadmin 서비스용(SafeKit 노드 간)
  * UDP - 4803: <span class="notranslate farm-term" translate="no">farm</span> 모듈 내 하트비트용(SafeKit 노드 간)
  * TCP – 9010: 부하 분산 장치 상태 확인 및 http 모드로 실행되는 SafeKit 웹 콘솔용
  * TCP – 9001: 콘솔의 https 모드 구성용
  * TCP – 9453: https 모드로 실행되는 SafeKit 웹 콘솔용

{{%  insert-safekit-installation-package-windows-ko app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-ko app="" mod="mirror"  %}}

참고: 구성할 일반 **farm.safe** 모듈은 패키지에 포함되어 있습니다.

## SafeKit / Azure 솔루션 단계별 구성 {#step-by-step-configuration-of-the-safekit--azure-solution}

{{%  insert-safekit-82-farm-configuration-ko app="" mod="farm"  %}}

## SafeKit <span class="notranslate farm-term" translate="no">farm</span> 솔루션 데모 {#demonstration-of-the-safekit-farm-solution}

{{%  insert-safekit-farm-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}
