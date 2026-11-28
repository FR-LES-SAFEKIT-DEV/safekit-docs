---
title: "Microsoft-NLB-Alternative für VMware"
canonical: "https://safekit.eviden.com/de/best-practises/microsoft-nlb-vmware-multicast-unicast-alternative/"
description: "Eine Alternative zu Microsoft NLB auf VMware: SafeKit-Farm-Cluster verteilen Last und führen Failover aus, ohne Multicast, statische ARP-Einträge oder MAC-Spoofing."
category: "best-practises"
lang: "de"
topics: "Microsoft NLB-Multicast-Modus, Microsoft NLB Unicast-Modus, Alternative mit SafeKit, Wie funktioniert das SafeKit Cluster im farm-Modus mit Windows ?"
hashpart: "microsoft-nlb-multicast-mode, microsoft-nlb-unicast-mode, alternative-with-safekit, safekit-farm-cluster"
translation: "translate_md 2026-11-20.2 | glossaire 2026-11-20.5 | Translation LLM | 54 expressions"
image: "/wp-content/uploads/2026/01/safekit-farm-cluster-config.png"
schemaType: "TechArticle"
---

# Microsoft-NLB-Alternative für VMware {#microsoft-nlb-alternative-for-vmware}

## Microsoft NLB-Multicast-Modus {#microsoft-nlb-multicast-mode}

Im Multicast-Modus müssen Sie die statische ARP-Auflösung auf dem Switch oder Router manuell konfigurieren. Dies ist für jeden mit dem Cluster verbundenen Port erforderlich. Weitere Informationen finden Sie im VMware Knowledge Base-Artikel [Konfiguration des Multicast-Modus von Network Load Balancing (NLB)](<https://knowledge.broadcom.com/external/article?articleNumber=414968>). In einer unbekannten Netzwerkumgebung kann die Bereitstellung von Microsoft NLB im Multicast-Modus komplex und anspruchsvoll sein.

## Microsoft NLB Unicast-Modus {#microsoft-nlb-unicast-mode}

Im Unicast-Modus müssen Sie den ESXi/ESX-Host so konfigurieren, dass er keine RARP-Pakete sendet, wenn eine seiner virtuellen Maschinen eingeschaltet wird. Andernfalls funktioniert Microsoft NLB nicht ordnungsgemäß mit VMware. Weitere Informationen finden Sie im VMware Knowledge-Base-Artikel [Microsoft NLB funktioniert nicht ordnungsgemäß im Unicast-Modus](<https://knowledge.broadcom.com/external/article/344421/microsoft-nlb-not-working-properly-in-un.html>).

## Alternative mit SafeKit {#alternative-with-safekit}

SafeKit verwendet eine [virtuelle IP-Adresse](</de/best-practises/how-a-virtual-ip-address-works/>), die keine spezielle Netzwerkkonfiguration erfordert. Seine Netzwerklastverteilung läuft in jeder Umgebung. Dies ist wichtig, wenn Sie die Lösung in einer unbekannten Infrastruktur bereitstellen: unbekannte Switches oder Router, physische Server oder virtuelle Server.


{{%  insert-safekit-farm-de app="Windows"  %}}

{{%  insert-safekit-hub-de  %}}

{{%  insert-safekit-4-buttons-de  %}}