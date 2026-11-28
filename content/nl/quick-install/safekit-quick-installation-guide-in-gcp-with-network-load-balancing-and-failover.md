---
title: "Google Cloud: SafeKit installeren voor load balancing (farm.safe)"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-in-gcp-with-network-load-balancing-and-failover/"
description: "Stapsgewijze handleiding: installeer de SafeKit-module farm.safe in Google Cloud, waar deze de applicatiestatus controleert voor de GCP load balancer en de failover afhandelt."
category: "quick-install"
lang: "nl"
topics: "Snelinstallatiegids voor hoge beschikbaarheid voor GCP, Beperkingen SafeKit High Availability, Overzicht van de SafeKit/GCP-oplossing, Installatie van de SafeKit/GCP-oplossing op Windows en Linux (farm.safe), Stapsgewijze configuratie van de SafeKit/GCP-oplossing, Demonstratie van de SafeKit farm"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--gcp-solution, installation-of-the-safekit--gcp-solution-on-windows-and-linux-farmsafe, step-by-step-configuration-of-the-safekit--gcp-solution, demonstration-of-the-safekit-farm-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 39 expressions"
image: "/wp-content/uploads/2024/03/15-monitoring-up-up.png"
schemaType: "TechArticle"
---

# Google Cloud: SafeKit installeren voor load balancing (farm.safe) {#install-safekit-for-google-cloud-load-balancing-farmsafe}


{{%  insert-safekit-farm-guide-nl app="GCP" mod="farm"  %}}
 

## Overzicht van de SafeKit/GCP-oplossing {#overview-of-the-safekit--gcp-solution}

De oplossing wordt hier beschreven: **💡 [SafeKit: Google GCP Load Balancing & Application High Availability <span class="notranslate farm-term" translate="no">farm</span>-cluster](</nl/solutions/gcp-load-balancing-cluster-failover/>)**.

## Installatie van de SafeKit/GCP-oplossing op Windows en Linux (farm.safe) {#installation-of-the-safekit--gcp-solution-on-windows-and-linux-farmsafe}

### Configuratie van de Google GCP load balancer {#configuration-of-the-google-gcp-load-balancer}

De load balancer moet worden geconfigureerd met een virtueel IP-adres.  
En de load balancer moet zo worden geconfigureerd dat deze periodiek gezondheidspakketten naar de knooppunten stuurt.  
Hiervoor biedt SafeKit een gezondheidscontrole die binnen de knooppunten wordt uitgevoerd en die

  * geeft OK terug wanneer de status van de <span class="notranslate farm-term" translate="no">farm</span>-module UP (groen) is
  * geeft NIET GEVONDEN terug in alle andere staten


U moet de Google GCP load balancer als volgt configureren:

  * HTTP-protocol
  * poort 9010, de SafeKit-webserverpoort
  * URL /var/modules/farm/ready.txt (als <span class="notranslate farm-term" translate="no">farm</span> de modenaam is die u later gaat implementeren)


Raadpleeg [de configuratie van de Google GCP load balancer](<https://docs.cloud.google.com/load-balancing/docs/>) voor meer informatie.


⚠️ Configureer geen virtueel IP-adres en geen load balancing-regels in stap 4 van de stapsgewijze configuratie hieronder. Het virtuele IP-adres en de load balancing-regels zijn al ingesteld in de Google GCP load balancer. Het instellen van een virtueel IP-adres en load balancing-regels in stap 4 is alleen nuttig voor on-premise configuratie.

### Configuratie van de netwerkbeveiliging van Google GCP {#configuration-of-the-google-gcp-network-security}

De netwerkbeveiliging moet zo worden geconfigureerd dat communicatie voor de volgende protocollen en poorten mogelijk is:

  * UDP - 4800 voor de safeadmin-service (tussen SafeKit knooppunten)
  * UDP - 4803 voor de heartbeats binnen de <span class="notranslate farm-term" translate="no">farm</span>-module (tussen SafeKit knooppunten)
  * TCP – 9010 voor de statuscontrole van de loadbalancer en voor de SafeKit webconsole die in de http-modus draait
  * TCP – 9001 om de https-modus voor de console te configureren
  * TCP – 9453 voor de SafeKit webconsole die in https-modus draait



{{%  insert-safekit-installation-package-windows-nl app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-nl app="" mod="mirror"  %}}
 

Opmerking: de generieke **farm.safe** module die u gaat configureren, wordt meegeleverd in het pakket.

## Stapsgewijze configuratie van de SafeKit/GCP-oplossing {#step-by-step-configuration-of-the-safekit--gcp-solution}


{{%  insert-safekit-82-farm-configuration-nl app="" mod="farm"  %}}
 

## Demonstratie van de SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}