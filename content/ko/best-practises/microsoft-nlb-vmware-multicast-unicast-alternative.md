---
title: "Microsoft NLB VMware 대안: 멀티캐스트 및 유니캐스트 문제 해결"
canonical: "https://safekit.eviden.com/ko/best-practises/microsoft-nlb-vmware-multicast-unicast-alternative/"
description: "VMware에서 Microsoft NLB 멀티캐스트 또는 유니캐스트로 어려움을 겪고 계신가요? SafeKit은 간단한 대안을 제공합니다. Windows 및 Linux에서 자동 로드 밸런싱 및 장애 조치를 지원하는 farm 클러스터입니다. 정적 ARP 항목, MAC 스푸핑 및 특수 네트워크 구성이 필요하지 않습니다."
category: "best-practises"
lang: "ko"
topics: "Microsoft NLB 멀티캐스트 모드, Microsoft NLB 유니캐스트 모드, SafeKit을 사용한 대안, farm 모드의 SafeKit 클러스터는 Windows와 어떻게 연동되나요?, 🔍 SafeKit 살펴보기"
translation: "translate_md 2026-11-20.2 | glossaire 2026-11-20.5 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2026/01/safekit-farm-cluster-config.png"
schemaType: "TechArticle"
---

# Microsoft NLB VMware 대안: 멀티캐스트 및 유니캐스트 문제 해결 {#microsoft-nlb-vmware-alternative-multicast-and-unicast-issues-solved}

## Microsoft NLB 멀티캐스트 모드 {#microsoft-nlb-multicast-mode}

멀티캐스트 모드에서는 스위치 또는 라우터에서 정적 ARP 확인을 수동으로 구성해야 합니다. 이는 클러스터에 연결된 각 포트에 필요합니다. 자세한 내용은 VMware 기술 자료 문서 [네트워크 부하 분산 (NLB) 멀티캐스트 모드 구성](<https://knowledge.broadcom.com/external/article?articleNumber=414968>)에서 확인할 수 있습니다. 알 수 없는 네트워크 환경에서 멀티캐스트 모드로 Microsoft NLB를 배포하는 것은 복잡하고 까다로울 수 있습니다.

## Microsoft NLB 유니캐스트 모드 {#microsoft-nlb-unicast-mode}

유니캐스트 모드에서는 가상 머신 중 하나가 켜질 때 ESXi/ESX 호스트가 RARP 패킷을 보내지 않도록 구성해야 합니다. 그렇지 않으면 Microsoft NLB가 VMware와 제대로 작동하지 않습니다. 자세한 내용은 VMware 기술 자료 문서인 [Microsoft NLB not working properly in Unicast Mode](<https://knowledge.broadcom.com/external/article/344421/microsoft-nlb-not-working-properly-in-un.html>)를 참조하십시오.

## SafeKit을 사용한 대안 {#alternative-with-safekit}

SafeKit은 특별한 네트워크 구성이 필요 없는 [가상 IP 주소](</ko/best-practises/how-a-virtual-ip-address-works/>)를 사용합니다. 네트워크 부하 분산은 모든 환경에서 실행됩니다. 이는 알 수 없는 인프라(알 수 없는 스위치 또는 라우터, 물리적 서버 또는 가상 서버)에 솔루션을 배포할 때 중요합니다.


{{%  insert-safekit-farm-ko app="Windows"  %}}

{{%  insert-safekit-hub-ko  %}}

{{%  insert-safekit-4-buttons-ko  %}}