---
title: "Hoge beschikbaarheid in de cloud met SafeKit: installeer de mirror.safe module voor failover"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-in-cloud-with-real-time-replication-and-failover/"
description: "Implementeer de mirror.safe module voor SafeKit in de cloud om synchrone realtime replicatie en automatische failover op Windows en Linux mogelijk te maken. Deze handleiding begeleidt u bij het instellen van een 2-node shared-nothing cluster voor bedrijfskritische toepassingen zonder gedeelde opslag."
category: "quick-install"
lang: "nl"
topics: "Snelinstallatiegids voor hoge beschikbaarheid in de cloud, Beperkingen SafeKit High Availability, Overzicht van de SafeKit / Cloud- mirror, Installatie van de SafeKit / Cloud mirror op Windows en Linux (mirror.safe), Stapsgewijze configuratie van de SafeKit / Cloud- mirror, Demonstratie van de SafeKit mirror, 🔍 Ontdek SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 39 expressions"
---

# Hoge beschikbaarheid in de cloud met SafeKit: installeer de mirror.safe module voor failover {#cloud-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-nl app="Cloud" mod="mirror"  %}}
 

## Overzicht van de SafeKit / Cloud- mirror {#overview-of-the-safekit--cloud-mirror-solution}

De oplossing wordt hier beschreven: **💡 [Cloud-agnostische hoge beschikbaarheid: synchrone replicatie en failover SafeKit](</nl/solutions/cloud-high-availability-cluster-synchronous-replication-failover/>)**.

## Installatie van de SafeKit / Cloud mirror op Windows en Linux (mirror.safe) {#installation-of-the-safekit--cloud-mirror-solution-on-windows-and-linux-mirrorsafe}

### Configuratie van de cloud- load balancer {#configuration-of-the-cloud-load-balancer}

De load balancer moet worden geconfigureerd als u een virtueel IP-adres wilt implementeren.  
En de load balancer moet zo worden geconfigureerd dat deze periodiek gezondheidspakketten naar de knooppunten stuurt.  
Hiervoor biedt SafeKit een gezondheidscontrole die binnen de knooppunten wordt uitgevoerd en die

  * geeft OK terug wanneer de status van de mirror-module PRIM (groen) of ALONE (groen) is
  * geeft NIET GEVONDEN terug in alle andere staten


U moet de Cloud- load balancer als volgt configureren:

  * HTTP-protocol
  * poort 9010, de SafeKit-webserverpoort
  * URL /var/modules/mirror/ready.txt (als mirror de modenaam is die u later gaat implementeren)


⚠️ Configureer geen virtueel IP-adres in stap 4 van de stapsgewijze configuratie hieronder. Het virtuele IP-adres is al ingesteld in de cloud- load balancer. Het instellen van een virtueel IP-adres in stap 4 is alleen nuttig voor on-premise configuratie.

### Configuratie van de beveiliging van het cloudnetwerk {#configuration-of-the-cloud-network-security}

De netwerkbeveiliging moet zo worden geconfigureerd dat communicatie voor de volgende protocollen en poorten mogelijk is:

  * UDP - 4800 voor de safeadmin-service (tussen SafeKit knooppunten)
  * UDP - 8888 voor de heartbeat van de module (tussen SafeKit knooppunten)
  * TCP – 5600 voor de module voor realtime bestandsreplicatie (tussen SafeKit knooppunten)
  * TCP – 9010 voor de statuscontrole van de loadbalancer en voor de SafeKit webconsole die in de http-modus draait
  * TCP – 9001 om de https-modus voor de console te configureren
  * TCP – 9453 voor de SafeKit webconsole die in https-modus draait



{{%  insert-safekit-installation-package-windows-nl app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-nl app="" mod="mirror"  %}}
 

Opmerking: de generieke **mirror.safe** -module die u gaat configureren, wordt meegeleverd in het pakket.

## Stapsgewijze configuratie van de SafeKit / Cloud- mirror {#step-by-step-configuration-of-the-safekit--cloud-mirror-solution}


{{%  insert-safekit-82-configuration-nl app="Windows" mod="mirror"  %}}
 

## Demonstratie van de SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}