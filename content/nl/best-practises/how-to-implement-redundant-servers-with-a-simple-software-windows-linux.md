---
title: "Hoe implementeer je redundante servers met eenvoudige HA-software?"
canonical: "https://safekit.eviden.com/nl/best-practises/how-to-implement-redundant-servers-with-a-simple-software-windows-linux/"
description: "Leer hoe u redundante servers implementeert met een eenvoudige, volledig softwarematige aanpak. SafeKit biedt een SAN-loze architectuur voor Windows en Linux , die realtime datareplicatie en automatische failover mogelijk maakt zonder gedeelde schijven of specialistische IT-kennis."
category: "best-practises"
lang: "nl"
topics: "Hoe implementeer ik actieve/passieve redundante servers met realtime replicatie en failover? Hoe implementeer ik actieve/actieve redundante servers met netwerkbelastingverdeling en failover? 🔍 SafeKit High Availability Navigation Hub"
---

# Hoe implementeer je redundante servers met eenvoudige HA-software {#how-to-implement-redundant-servers-with-simple-ha-software}

## Hoe implementeer ik actieve/passieve redundante servers met realtime replicatie en failover? {#how-to-implement-activepassive-redundant-servers-with-real-time-replication-and-failover}

### De cluster SafeKit mirror {#the-safekit-mirror-cluster}


![ Redundante servers met realtime bestandsreplicatie en failover ](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


In een mirror cluster is de SafeKit -software geïnstalleerd op twee fysieke of virtuele servers waarop Windows of Linux draait (on-premise of in de cloud). De primaire server is de actieve server en voert een kritieke applicatie uit. De secundaire server is een passieve redundante server die in realtime alle wijzigingen ontvangt die de applicatie in zijn bestanden aanbrengt. Clients zijn verbonden met een virtueel IP-adres van [ ](</nl/best-practises/how-a-virtual-ip-address-works/#virtual-ip-same-subnet-failover>) ). Als de primaire server uitvalt, herstart SafeKit automatisch de kritieke applicatie op de passieve redundante server, die dan primair wordt en het virtuele IP-adres overneemt. Wanneer de uitgevallen server opnieuw wordt opgestart, wordt deze automatisch gesynchroniseerd en wordt de passieve redundante server die als secundaire server functioneert.

## Hoe implementeer ik actieve/actieve redundante servers met netwerkbelastingverdeling en failover? {#how-to-implement-activeactive-redundant-servers-with-network-load-balancing-and-failover}

### De cluster SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#the-safekit-farm-cluster}


![ Redundante servers met netwerkbelastingverdeling en failover ](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


In een <span class="notranslate farm-term" translate="no">farm</span> cluster is de SafeKit -software geïnstalleerd op redundante servers waarop Windows of Linux draait (on-premise of in de cloud). Alle redundante servers zijn actief en draaien dezelfde kritieke front-endapplicatie. Clients maken verbinding met een virtueel IP-adres [ ](</nl/best-practises/how-a-virtual-ip-address-works/#vip-load-balancing-same-subnet>) . TCP-sessies worden verdeeld over alle redundante servers. Als een server uitvalt, herconfigureert SafeKit automatisch de load balancing van TCP-sessies over de resterende actieve servers. Wanneer de uitgevallen server opnieuw wordt opgestart, wordt deze automatisch opnieuw geïntegreerd als een actieve redundante server en ontvangt deze nieuwe TCP-sessies.


{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}