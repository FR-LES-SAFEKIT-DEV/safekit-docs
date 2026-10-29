---
title: "Microsoft NLB VMware-Alternative: Multicast- und Unicast-Probleme gelöst"
canonical: "https://safekit.eviden.com/de/best-practises/microsoft-nlb-vmware-multicast-unicast-alternative/"
description: "Haben Sie Probleme mit dem NLB-Multicast oder Unicast Microsoft in VMware? SafeKit bietet mit dem SANless-Cluster farm eine einfache Alternative. Profitieren Sie von automatischem Load Balancing und Failover auf Windows und Linux ohne statische ARP-Einträge, MAC-Spoofing oder spezielle Netzwerkkonfiguration."
category: "best-practises"
lang: "de"
topics: "Microsoft NLB-Multicast-Modus, Microsoft NLB-Unicast-Modus, Alternative zu SafeKit , Wie funktioniert der SafeKit Cluster im farm -Modus mit Windows ?, 🔍 SafeKit Hochverfügbarkeits-Navigationshub"
---

# Microsoft NLB VMware-Alternative: Multicast- und Unicast-Probleme behoben {#microsoft-nlb-vmware-alternative-multicast-and-unicast-issues-solved}

## Microsoft NLB-Multicast-Modus {#microsoft-nlb-multicast-mode}

Wie in der VMware-Wissensdatenbank [ zur Konfiguration des Multicast-Modus für Netzwerklastausgleich (NLB) ](<https://knowledge.broadcom.com/external/article?articleNumber=414968>) erläutert, muss die statische ARP-Auflösung am Switch oder Router für jeden Port, der mit dem Cluster verbunden ist, manuell konfiguriert werden. Die Bereitstellung des NLB-Multicast-Modus Microsoft in einer unbekannten Netzwerkumgebung kann sich als komplex und aufwendig erweisen.

## Microsoft NLB Unicast-Modus {#microsoft-nlb-unicast-mode}

Im Unicast-Modus des NLB-Speichers Microsoft muss der ESXi/ESX-Host so konfiguriert werden, dass er keine RARP-Pakete sendet, sobald eine seiner virtuellen Maschinen eingeschaltet wird. Daher funktioniert der NLB-Speicher [ Microsoft im Unicast-Modus mit VMware ](<https://knowledge.broadcom.com/external/article/344421/microsoft-nlb-not-working-properly-in-un.html>) nicht ordnungsgemäß.

## Alternative mit SafeKit {#alternative-with-safekit}

Die Konfiguration der virtuellen IP-Adressen [ SafeKit ](</de/best-practises/how-a-virtual-ip-address-works/>) erfordert keine spezielle Netzwerkkonfiguration, und der Netzwerklastausgleich funktioniert in jeder Umgebung. Dies ist besonders wichtig, wenn die Lösung in einer unbekannten Infrastruktur eingesetzt werden muss: unbekannte Switches oder Router, physische oder virtuelle Server.


{{%  insert-safekit-farm-de app="Windows"  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}