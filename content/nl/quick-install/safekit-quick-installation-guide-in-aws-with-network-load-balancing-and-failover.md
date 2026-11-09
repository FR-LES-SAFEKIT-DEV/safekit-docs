---
title: "AWS Network Load Balancing & Failover: Installeer de SafeKit farm.safe module"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-in-aws-with-network-load-balancing-and-failover/"
description: "Verbeter AWS Network Load Balancing met de intelligente applicatiemonitoring van SafeKit. De farm.safe module biedt een speciale gezondheidscontrole voor de AWS load balancer, waardoor naadloze HA op applicatieniveau mogelijk is. Bereik automatisch zelfherstel en failover voor bedrijfskritieke applicaties."
category: "quick-install"
lang: "nl"
topics: "Snelinstallatiegids voor hoge beschikbaarheid voor AWS, Beperkingen SafeKit High Availability, Overzicht van de SafeKit/AWS-oplossing, Installatie van de SafeKit/AWS-oplossing op Windows en Linux (farm.safe), Stapsgewijze configuratie van de SafeKit/AWS-oplossing, Demonstratie van de SafeKit farm, 🔍 Ontdek SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 39 expressions"
---

# AWS Network Load Balancing & Failover: Installeer de SafeKit farm.safe module {#aws-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-nl app="AWS" mod="farm"  %}}
 

## Overzicht van de SafeKit/AWS-oplossing {#overview-of-the-safekit--aws-solution}

De oplossing wordt hier beschreven: **💡 [SafeKit: Amazon AWS Load Balancing & Application High Availability <span class="notranslate farm-term" translate="no">farm</span>-cluster](</nl/solutions/aws-load-balancing-cluster-failover/>)**.

## Installatie van de SafeKit/AWS-oplossing op Windows en Linux (farm.safe) {#installation-of-the-safekit--aws-solution-on-windows-and-linux-farmsafe}

### Configuratie van de Amazon AWS load balancer {#configuration-of-the-amazon-aws-load-balancer}

De load balancer moet worden geconfigureerd met een virtueel IP-adres.  
En de load balancer moet zo worden geconfigureerd dat deze periodiek gezondheidspakketten naar de knooppunten stuurt.  
Hiervoor biedt SafeKit een gezondheidscontrole die binnen de knooppunten wordt uitgevoerd en die

  * geeft OK terug wanneer de status van de <span class="notranslate farm-term" translate="no">farm</span>-module UP (groen) is
  * geeft NIET GEVONDEN terug in alle andere staten


U moet de Amazon AWS load balancer als volgt configureren:

  * HTTP-protocol
  * poort 9010, de SafeKit-webserverpoort
  * URL /var/modules/farm/ready.txt (als <span class="notranslate farm-term" translate="no">farm</span> de modenaam is die u later gaat implementeren)


Raadpleeg voor meer informatie [de configuratie van de Amazon AWS load balancer](<https://aws.amazon.com/elasticloadbalancing/>).


⚠️ Configureer geen virtueel IP-adres en load balancing-regels in stap 4 van de stapsgewijze configuratie hieronder. Het virtuele IP-adres en de load balancing-regels zijn al ingesteld in de Amazon AWS load balancer. Het instellen van een virtueel IP-adres en load balancing-regels in stap 4 is alleen nuttig voor on-premise configuratie.

### Configuratie van de Amazon AWS-netwerkbeveiliging {#configuration-of-the-amazon-aws-network-security}

De netwerkbeveiliging moet zo worden geconfigureerd dat communicatie voor de volgende protocollen en poorten mogelijk is:

  * UDP - 4800 voor de safeadmin-service (tussen SafeKit knooppunten)
  * UDP - 4803 voor de heartbeat binnen de <span class="notranslate farm-term" translate="no">farm</span>-module (tussen SafeKit knooppunten)
  * TCP – 9010 voor de statuscontrole van de loadbalancer en voor de SafeKit webconsole die in de http-modus draait
  * TCP – 9001 om de https-modus voor de console te configureren
  * TCP – 9453 voor de SafeKit webconsole die in https-modus draait



{{%  insert-safekit-installation-package-windows-nl app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-nl app="" mod="mirror"  %}}
 

Opmerking: de generieke **farm.safe** module die u gaat configureren, wordt meegeleverd in het pakket.

## Stapsgewijze configuratie van de SafeKit/AWS-oplossing {#step-by-step-configuration-of-the-safekit--aws-solution}


{{%  insert-safekit-82-farm-configuration-nl app="" mod="farm"  %}}
 

## Demonstratie van de SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}