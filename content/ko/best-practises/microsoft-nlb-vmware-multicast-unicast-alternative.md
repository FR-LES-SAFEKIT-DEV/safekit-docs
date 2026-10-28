---
title: "Microsoft NLB VMware 대안: 멀티캐스트 및 유니캐스트 문제 해결"
canonical: "https://safekit.eviden.com/ko/best-practises/microsoft-nlb-vmware-multicast-unicast-alternative/"
description: "VMware 환경에서 Microsoft NLB 멀티캐스트 또는 유니캐스트에 문제가 있으신가요? SafeKit SAN이 필요 없는 farm 클러스터를 간단한 대안으로 제시합니다. 정적 ARP 항목, MAC 스푸핑 또는 특수 네트워크 구성 없이 Windows 및 Linux 에서 자동 로드 밸런싱 및 페일오버를 구현하세요."
category: "best-practises"
lang: "ko"
topics: "Microsoft NLB 멀티캐스트 모드, Microsoft NLB 유니캐스트 모드, SafeKit 사용한 대안, `farm` 모드에서 SafeKit 클러스터는 Windows 와 어떻게 연동되나요?, 🔍 SafeKit 고가용성 내비게이션 허브"
---

# Microsoft NLB VMware 대안: 멀티캐스트 및 유니캐스트 문제 해결 {#microsoft-nlb-vmware-alternative-multicast-and-unicast-issues-solved}

## Microsoft NLB 멀티캐스트 모드 {#microsoft-nlb-multicast-mode}

VMware 네트워크 로드 밸런싱(NLB) 멀티캐스트 모드 구성에 대한 기술 자료( [ ](<https://knowledge.broadcom.com/external/article?articleNumber=414968>) )에서 설명했듯이, 클러스터에 연결되는 각 포트에 대해 스위치 또는 라우터에서 정적 ARP 확인을 수동으로 구성해야 합니다. 알 수 없는 네트워크 환경에서 Microsoft 멀티캐스트 모드를 배포하는 것은 복잡하고 어려운 작업이 될 수 있습니다.

## Microsoft NLB 유니캐스트 모드 {#microsoft-nlb-unicast-mode}

Microsoft NLB 유니캐스트 모드를 사용하려면 ESXi/ESX 호스트에서 가상 머신이 켜져 있을 때 RARP 패킷을 보내지 않도록 구성해야 합니다. 따라서 [ Microsoft NLB는 VMware ](<https://knowledge.broadcom.com/external/article/344421/microsoft-nlb-not-working-properly-in-un.html>) 에서 유니캐스트 모드로 제대로 작동하지 않습니다.

## SafeKit 사용한 대안 {#alternative-with-safekit}

[ SafeKit ](</ko/best-practises/how-a-virtual-ip-address-works/>) 와 같은 가상 IP 주소 구성은 특별한 네트워크 설정이 필요하지 않으며, 네트워크 로드 밸런싱은 어떤 환경에서도 실행될 수 있습니다. 이는 솔루션을 알 수 없는 인프라(알 수 없는 스위치나 라우터, 물리적 서버 또는 가상 서버)에 배포해야 할 때 중요한 특징입니다.


{{%  insert-safekit-farm-ko app="Windows"  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}