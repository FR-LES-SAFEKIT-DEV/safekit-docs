---
title: "Microsoft NLB VMware alternatief: Multicast- en Unicast-problemen opgelost"
canonical: "https://safekit.eviden.com/nl/best-practises/microsoft-nlb-vmware-multicast-unicast-alternative/"
description: "Heeft u problemen met Microsoft NLB multicast of unicast in VMware? SafeKit biedt een eenvoudig alternatief: een farm-cluster met automatische taakverdeling en failover op Windows en Linux. Het vereist geen statische ARP-vermeldingen, geen MAC-spoofing en geen gespecialiseerde netwerkconfiguratie."
category: "best-practises"
lang: "nl"
topics: "Microsoft NLB-multicastmodus, Microsoft NLB unicast-modus, Alternatief met SafeKit, Hoe werkt het SafeKit-cluster in farm met Windows?, 🔍 Ontdek SafeKit"
translation: "translate_md 2026-11-20.2 | glossaire 2026-11-20.5 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2026/01/safekit-farm-cluster-config.png"
---

# Microsoft NLB VMware alternatief: Multicast- en Unicast-problemen opgelost {#microsoft-nlb-vmware-alternative-multicast-and-unicast-issues-solved}

## Microsoft NLB-multicastmodus {#microsoft-nlb-multicast-mode}

In de multicast-modus moet u de statische ARP-resolutie handmatig configureren op de switch of router. Dit is vereist voor elke poort die is aangesloten op het cluster. Raadpleeg voor meer informatie het VMware kennisbankartikel [over de configuratie van de multicast-modus van Network Load Balancing (NLB)](<https://knowledge.broadcom.com/external/article?articleNumber=414968>). In een onbekende netwerkomgeving kan het implementeren van Microsoft NLB in de multicast-modus complex en veeleisend zijn.

## Microsoft NLB unicast-modus {#microsoft-nlb-unicast-mode}

In de unicastmodus moet u de ESXi/ESX-host zo configureren dat deze geen RARP-pakketten verzendt wanneer een van de virtuele machines wordt ingeschakeld. Anders werkt Microsoft NLB niet correct met VMware. Raadpleeg voor meer informatie het VMware kennisbankartikel [Microsoft NLB werkt niet correct in de unicastmodus](<https://knowledge.broadcom.com/external/article/344421/microsoft-nlb-not-working-properly-in-un.html>).

## Alternatief met SafeKit {#alternative-with-safekit}

SafeKit gebruikt een [virtueel IP-adres](</nl/best-practises/how-a-virtual-ip-address-works/>) dat geen speciale netwerkconfiguratie vereist. De netwerkbelasting wordt in elke omgeving in evenwicht gehouden. Dit is belangrijk wanneer u de oplossing implementeert in een onbekende infrastructuur: onbekende switches of routers, fysieke servers of virtuele servers.


{{%  insert-safekit-farm-nl app="Windows"  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}