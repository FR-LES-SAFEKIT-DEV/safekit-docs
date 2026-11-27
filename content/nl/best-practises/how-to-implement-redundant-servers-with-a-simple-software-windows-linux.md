---
title: "Redundante servers implementeren met eenvoudige HA-software"
canonical: "https://safekit.eviden.com/nl/best-practises/how-to-implement-redundant-servers-with-a-simple-software-windows-linux/"
description: "Redundante servers implementeren met alleen software: SafeKit biedt realtime replicatie en automatische failover op Windows en Linux, zonder gedeelde schijf."
category: "best-practises"
lang: "nl"
topics: "Hoe implementeer je actieve/passieve redundante servers met realtime replicatie en failover?, Hoe implementeer je actieve/actieve redundante servers met netwerktaakverdeling en failover?"
translation: "translate_md 2026-11-19.2 | glossaire 2026-11-19.30 | Translation LLM | 52 expressions"
image: "/wp-content/uploads/2023/02/safekit-prim-second-300.png"
schemaType: "TechArticle"
---

# Redundante servers implementeren met eenvoudige HA-software {#how-to-implement-redundant-servers-with-simple-ha-software}

## Hoe implementeer je actieve/passieve redundante servers met realtime replicatie en failover? {#how-to-implement-activepassive-redundant-servers-with-real-time-replication-and-failover}

### Het SafeKit mirror-cluster {#the-safekit-mirror-cluster}


![Redundante servers met real-time bestandsreplicatie en failover](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


In een mirror-cluster is de SafeKit-software op twee servers geïnstalleerd. De servers zijn fysiek of virtueel. Ze draaien op Windows of Linux, on-premises of in de cloud. De primaire server is de actieve server. Deze draait de kritieke applicatie. De secundaire server is een passieve redundante server. Deze ontvangt in realtime alle wijzigingen die de applicatie in zijn bestanden aanbrengt. Clients maken verbinding met een [virtueel IP-adres](</nl/best-practises/how-a-virtual-ip-address-works/#virtual-ip-same-subnet-failover>). Als de primaire server uitvalt, start SafeKit de kritieke applicatie automatisch opnieuw op de secundaire server. Deze server wordt primair en neemt het virtuele IP-adres over. Wanneer de uitgevallen server opnieuw opstart, synchroniseert SafeKit de gegevens automatisch opnieuw. Deze server wordt dan de passieve redundante server, in de secundaire staat.

## Hoe implementeer je actieve/actieve redundante servers met netwerktaakverdeling en failover? {#how-to-implement-activeactive-redundant-servers-with-network-load-balancing-and-failover}

### Het SafeKit <span class="notranslate farm-term" translate="no">farm</span>-cluster {#the-safekit-farm-cluster}


![Redundante servers met netwerktaakverdeling en failover](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


In een <span class="notranslate farm-term" translate="no">farm</span>-cluster wordt de SafeKit-software geïnstalleerd op verschillende redundante servers. De servers draaien op Windows of Linux, on-premises of in de cloud. Alle redundante servers zijn actief. Ze draaien dezelfde kritieke front-endapplicatie. Clients maken verbinding met een [virtueel IP-adres](</nl/best-practises/how-a-virtual-ip-address-works/#vip-load-balancing-same-subnet>). TCP-sessies worden verdeeld over alle redundante servers. Als één server uitvalt, herconfigureert SafeKit automatisch de taakverdeling van TCP-sessies tussen de resterende actieve servers. Wanneer de uitgevallen server opnieuw opstart, integreert SafeKit deze automatisch opnieuw als een actieve redundante server. Deze server ontvangt dan nieuwe TCP-sessies.


{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}