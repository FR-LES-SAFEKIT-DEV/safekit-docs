---
title: "Cloud Network Load Balancing & Failover: Installeer de SafeKit farm.safe-module"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-in-cloud-with-network-load-balancing-and-failover/"
description: "Verbeter de netwerkbelastingverdeling in de cloud met de intelligente applicatiemonitoring van SafeKit. De farm.safe module biedt een speciale gezondheidscontrole voor de cloud- load balancer, waardoor naadloze HA op applicatieniveau mogelijk is. Bereik automatisch zelfherstel en failover voor bedrijfskritieke applicaties."
category: "quick-install"
lang: "nl"
topics: "Snelinstallatiegids voor hoge beschikbaarheid in de cloud, Beperkingen SafeKit High Availability, Overzicht van de SafeKit / Cloud-oplossing, Installatie van de SafeKit /Cloud-oplossing op Windows en Linux (farm.safe), Stapsgewijze configuratie van de SafeKit /Cloud-oplossing, Demonstratie van de SafeKit farm, 🔍 Ontdek SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 39 expressions"
---

# Cloud Network Load Balancing & Failover: Installeer de SafeKit farm.safe-module {#cloud-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-nl app="Cloud" mod="farm"  %}}
 

## Overzicht van de SafeKit / Cloud-oplossing {#overview-of-the-safekit--cloud-solution}

De oplossing wordt hier beschreven: **💡 [SafeKit: Cloud Load Balancing & Application High Availability <span class="notranslate farm-term" translate="no">farm</span>-cluster](</nl/solutions/cloud-load-balancing-cluster-failover/>)**.

## Installatie van de SafeKit /Cloud-oplossing op Windows en Linux (farm.safe) {#installation-of-the-safekit--cloud-solution-on-windows-and-linux-farmsafe}

### Configuratie van de cloud- load balancer {#configuration-of-the-cloud-load-balancer}

De load balancer moet worden geconfigureerd met een virtueel IP-adres.  
En de load balancer moet zo worden geconfigureerd dat deze periodiek gezondheidspakketten naar de knooppunten stuurt.  
Hiervoor biedt SafeKit een gezondheidscontrole die binnen de knooppunten wordt uitgevoerd en die

  * geeft OK terug wanneer de status van de <span class="notranslate farm-term" translate="no">farm</span>-module UP (groen) is
  * geeft NIET GEVONDEN terug in alle andere staten


U moet de Cloud- load balancer als volgt configureren:

  * HTTP-protocol
  * poort 9010, de SafeKit-webserverpoort
  * URL /var/modules/farm/ready.txt (als <span class="notranslate farm-term" translate="no">farm</span> de modenaam is die u later gaat implementeren)


⚠️ Configureer geen virtueel IP-adres en geen load balancing-regels in stap 4 van de stapsgewijze configuratie hieronder. Het virtuele IP-adres en de load balancing-regels zijn al ingesteld in de Cloud load balancer. Het instellen van een virtueel IP-adres en load balancing-regels in stap 4 is alleen nuttig voor on-premise configuratie.

### Configuratie van de beveiliging van het cloudnetwerk {#configuration-of-the-cloud-network-security}

De netwerkbeveiliging moet zo worden geconfigureerd dat communicatie voor de volgende protocollen en poorten mogelijk is:

  * UDP - 4800 voor de safeadmin-service (tussen SafeKit knooppunten)
  * UDP - 4803 voor de heartbeats binnen de <span class="notranslate farm-term" translate="no">farm</span>-module (tussen SafeKit knooppunten)
  * TCP – 9010 voor de statuscontrole van de loadbalancer en voor de SafeKit webconsole die in de http-modus draait
  * TCP – 9001 om de https-modus voor de console te configureren
  * TCP – 9453 voor de SafeKit webconsole die in https-modus draait



{{%  insert-safekit-installation-package-windows-nl app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-nl app="" mod="mirror"  %}}
 

Opmerking: de generieke **farm.safe** module die u gaat configureren, wordt meegeleverd in het pakket.

## Stapsgewijze configuratie van de SafeKit /Cloud-oplossing {#step-by-step-configuration-of-the-safekit--cloud-solution}


{{%  insert-safekit-82-farm-configuration-nl app="" mod="farm"  %}}
 

## Demonstratie van de SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}