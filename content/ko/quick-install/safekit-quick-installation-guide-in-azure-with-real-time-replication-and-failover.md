---
title: "Azure 고가용성: SafeKit을 통한 실시간 복제 및 장애 조치"
canonical: "https://safekit.eviden.com/ko/quick-install/safekit-quick-installation-guide-in-azure-with-real-time-replication-and-failover/"
description: "Azure에 SafeKit mirror.safe 모듈을 배포하여 Windows 및 Linux에서 동기식 실시간 복제와 자동 장애 조치를 구현합니다. 이 가이드에서는 중요 애플리케이션을 위해 공유 스토리지 없이 2노드 클러스터를 설정하는 방법을 설명합니다."
category: "quick-install"
lang: "ko"
topics: "Azure 고가용성 빠른 설치 가이드, SafeKit 고가용성 제한 사항, SafeKit / Azure mirror 솔루션 개요, Windows 및 Linux에 SafeKit / Azure mirror 솔루션 설치(mirror.safe), SafeKit / Azure mirror 솔루션 단계별 구성, SafeKit mirror 솔루션 데모, 🔍 SafeKit 고가용성 탐색 허브"
---

# SafeKit을 사용한 Azure 고가용성: 장애 조치용 mirror.safe 모듈 설치 {#azure-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}

{{%  insert-safekit-mirror-guide-ko app="Azure" mod="mirror"  %}}

## SafeKit / Azure mirror 솔루션 개요 {#overview-of-the-safekit--azure-mirror-solution}

솔루션에 대한 설명은 여기에서 확인할 수 있습니다: **💡[Microsoft Azure 고가용성: SafeKit 동기식 복제 및 장애 조치](</ko/solutions/azure-high-availability-cluster-synchronous-replication-failover/>)**.

## Windows 및 Linux에 SafeKit / Azure mirror 솔루션 설치(mirror.safe) {#installation-of-the-safekit--azure-mirror-solution-on-windows-and-linux-mirrorsafe}

### Microsoft Azure 부하 분산 장치 구성 {#configuration-of-the-microsoft-azure-load-balancer}

가상 IP 주소를 구현하려면 부하 분산 장치를 구성해야 합니다.
또한 노드에 상태 확인 패킷을 주기적으로 보내도록 구성해야 합니다.
이를 위해 SafeKit은 노드 내에서 실행되는 상태 확인 기능을 제공하며 다음과 같이 동작합니다.

  * mirror 모듈 상태가 PRIM(녹색) 또는 ALONE(녹색)이면 OK 반환
  * 그 외 모든 상태에서는 NOT FOUND 반환

Microsoft Azure 부하 분산 장치를 다음과 같이 구성해야 합니다.

  * HTTP 프로토콜
  * 포트 9010(SafeKit 웹 서버 포트)
  * URL /var/modules/mirror/ready.txt(나중에 배포할 모듈 이름이 mirror인 경우)

자세한 내용은 [Microsoft Azure 부하 분산 장치 구성](<https://learn.microsoft.com/en-us/azure/load-balancer/>)을 참조하세요.

⚠️ 아래 단계별 구성의 4단계에서는 가상 IP 주소를 구성하지 마세요. 가상 IP 주소는 Microsoft Azure 부하 분산 장치에 이미 설정되어 있습니다. 4단계에서 가상 IP를 설정하는 것은 온프레미스 구성에만 필요합니다.

### Microsoft Azure 네트워크 보안 구성 {#configuration-of-the-microsoft-azure-network-security}

다음 프로토콜과 포트를 통한 통신을 허용하도록 네트워크 보안을 구성해야 합니다.

  * UDP - 4800: safeadmin 서비스용(SafeKit 노드 간)
  * UDP - 8888: 모듈 하트비트용(SafeKit 노드 간)
  * TCP – 5600: 모듈 실시간 파일 복제용(SafeKit 노드 간)
  * TCP – 9010: 부하 분산 장치 상태 확인 및 http 모드로 실행되는 SafeKit 웹 콘솔용
  * TCP – 9001: 콘솔의 https 모드 구성용
  * TCP – 9453: https 모드로 실행되는 SafeKit 웹 콘솔용

{{%  insert-safekit-installation-package-windows-ko app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-ko app="" mod="mirror"  %}}

참고: 구성할 일반 **mirror.safe** 모듈은 패키지에 포함되어 있습니다.

## SafeKit / Azure mirror 솔루션 단계별 구성 {#step-by-step-configuration-of-the-safekit--azure-mirror-solution}

{{%  insert-safekit-82-configuration-ko app="Windows" mod="mirror"  %}}

## SafeKit mirror 솔루션 데모 {#demonstration-of-the-safekit-mirror-solution}

{{%  insert-safekit-mirror-video-ko  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}
