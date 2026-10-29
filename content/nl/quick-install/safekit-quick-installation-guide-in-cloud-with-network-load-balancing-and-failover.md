---
title: "Load balancing en failover voor cloudnetwerken: installeer de SafeKit farm.safe -module"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-in-cloud-with-network-load-balancing-and-failover/"
description: "Verbeter de load balancing van cloudnetwerken met de intelligente applicatiebewaking van SafeKit . De farm.safe module biedt een speciale statuscontrole voor de cloud load balancer, waardoor naadloze HA op applicatieniveau mogelijk is. Realiseer automatisch zelfherstel en failover voor bedrijfskritieke applicaties."
category: "quick-install"
lang: "nl"
topics: "Snelstartgids voor hoge beschikbaarheid in de cloud, Beperkingen van hoge beschikbaarheid voor SafeKit , Overzicht van de SafeKit /cloudoplossing, Installatie van de SafeKit /cloudoplossing op Windows en Linux ( farm.safe ), Stapsgewijze configuratie van de SafeKit /cloudoplossing, Demonstratie van de SafeKit <span class="notranslate farm-term" translate="no">farm</span> -oplossing, 🔍 SafeKit Navigatiehub voor hoge beschikbaarheid"
---

# Loadbalancing en failover voor cloudnetwerken: installeer de SafeKit farm.safe modules {#cloud-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-nl app="Cloud" mod="farm"  %}}
 

## Overzicht van de SafeKit / Cloud-oplossing {#overview-of-the-safekit--cloud-solution}

De oplossing wordt hier beschreven: **💡 [ SafeKit : Cloud Load Balancing & Application High Availability <span class="notranslate farm-term" translate="no">Farm</span> Cluster ](</nl/solutions/cloud-load-balancing-cluster-failover/>)** .

## Installatie van de SafeKit / Cloud-oplossing op Windows en Linux ( farm.safe ) {#installation-of-the-safekit--cloud-solution-on-windows-and-linux-farmsafe}

### Configuratie van de cloud load balancer {#configuration-of-the-cloud-load-balancer}

De load balancer moet geconfigureerd worden met een virtueel IP-adres.  
De load balancer moet zo geconfigureerd zijn dat deze periodiek statusupdates naar de nodes stuurt.  
Daarvoor biedt SafeKit een gezondheidscontrole die binnen de knooppunten wordt uitgevoerd en die

  * Geeft OK terug wanneer de status van de <span class="notranslate farm-term" translate="no">farm</span> -module UP (groen) is.
  * retourneert 'NIET GEVONDEN' in alle andere staten.


U moet de cloud-load balancer als volgt configureren:

  * HTTP-protocol
  * poort 9010, de poort van de SafeKit -webserver
  * URL /var/modules/farm/ready.txt (als <span class="notranslate farm-term" translate="no">farm</span> de modulenaam is die u later gaat implementeren)


⚠️ Configureer geen virtueel IP-adres en load balancing-regels bij stap 4 in de onderstaande stapsgewijze configuratie. Het virtuele IP-adres en de load balancing-regels zijn al ingesteld in de cloud load balancer. Het instellen van een virtueel IP-adres en load balancing-regels bij stap 4 is alleen nuttig voor on-premise configuraties.

### Configuratie van de cloudnetwerkbeveiliging {#configuration-of-the-cloud-network-security}

De netwerkbeveiliging moet zodanig geconfigureerd zijn dat communicatie voor de volgende protocollen en poorten mogelijk is:

  * UDP-poort 4800 voor de safeadmin-service (tussen SafeKit -nodes)
  * UDP-poort 4803 voor de heartbeats binnen de <span class="notranslate farm-term" translate="no">farm</span> -module (tussen SafeKit -nodes)
  * TCP-poort 9010 voor de statuscontrole van de loadbalancer en voor de SafeKit webconsole die in de http-modus draait.
  * TCP – 9001 om de https-modus voor de console te configureren
  * TCP-poort 9453 voor de SafeKit -webconsole die in HTTPS-modus draait.



{{%  insert-safekit-installation-package-windows-nl app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-nl app="" mod="mirror"  %}}
 

Let op: de generieke **farm.safe** -module die u gaat configureren, is in het pakket opgenomen.

## Stapsgewijze configuratie van de SafeKit / Cloud-oplossing {#step-by-step-configuration-of-the-safekit--cloud-solution}


{{%  insert-safekit-82-farm-configuration-nl app="" mod="farm"  %}}
 

## Demonstratie van de SafeKit <span class="notranslate farm-term" translate="no">farm</span> oplossing {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}