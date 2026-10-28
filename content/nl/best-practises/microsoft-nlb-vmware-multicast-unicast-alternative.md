---
title: "Microsoft NLB VMware-alternatief: Multicast- en Unicast-problemen opgelost"
canonical: "https://safekit.eviden.com/nl/best-practises/microsoft-nlb-vmware-multicast-unicast-alternative/"
description: "Ondervindt u problemen met Microsoft NLB multicast of unicast in VMware? SafeKit biedt een SAN-loos farm -cluster als eenvoudig alternatief. Profiteer van automatische load balancing en failover op Windows en Linux zonder statische ARP-vermeldingen, MAC-spoofing of gespecialiseerde netwerkconfiguratie."
category: "best-practises"
lang: "nl"
topics: "Microsoft NLB multicast-modus, Microsoft NLB unicast-modus, alternatief met SafeKit , hoe werkt het SafeKit cluster in `farm` -modus met Windows ?, 🔍 SafeKit High Availability Navigation Hub"
---

# Microsoft NLB VMware-alternatief: Multicast- en Unicast-problemen opgelost {#microsoft-nlb-vmware-alternative-multicast-and-unicast-issues-solved}

## Microsoft NLB multicastmodus {#microsoft-nlb-multicast-mode}

Zoals uitgelegd in de kennisbank van VMware [ over de configuratie van de multicastmodus voor netwerkbelastingverdeling (NLB) ](<https://knowledge.broadcom.com/external/article?articleNumber=414968>) , moet u handmatig statische ARP-resolutie configureren op de switch of router voor elke poort die is verbonden met het cluster. Het implementeren van de NLB-multicastmodus Microsoft in een onbekende netwerkomgeving kan een complexe en tijdrovende taak zijn.

## Microsoft NLB unicast-modus {#microsoft-nlb-unicast-mode}

Bij gebruik van Microsoft NLB in unicast-modus moet u de ESXi/ESX-host zo configureren dat deze geen RARP-pakketten verzendt wanneer een van de virtuele machines wordt ingeschakeld. Daarom werkt [ Microsoft NLB niet correct in unicast-modus met VMware ](<https://knowledge.broadcom.com/external/article/344421/microsoft-nlb-not-working-properly-in-un.html>) .

## Alternatief met SafeKit {#alternative-with-safekit}

De configuratie met de virtuele IP-adressen [ SafeKit ](</nl/best-practises/how-a-virtual-ip-address-works/>) vereist geen speciale netwerkconfiguratie en de load balancing kan in elke omgeving worden uitgevoerd. Dit is een belangrijk voordeel wanneer de oplossing moet worden geïmplementeerd in een onbekende infrastructuur: onbekende switches of routers, fysieke servers of virtuele servers.


{{%  insert-safekit-farm-nl app="Windows"  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}