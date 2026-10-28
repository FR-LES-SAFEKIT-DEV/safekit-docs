---
title: "GCP Netwerktaakverdeling en failover: Installeer de SafeKit farm.safe -module"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-in-gcp-with-network-load-balancing-and-failover/"
description: "Verbeter de load balancing van GCP -netwerk met de intelligente applicatiebewaking van SafeKit . De farm.safe module biedt een speciale statuscontrole voor de load balancer GCP , waardoor naadloze HA op applicatieniveau mogelijk is. Realiseer automatisch zelfherstel en failover voor bedrijfskritische applicaties."
category: "quick-install"
lang: "nl"
topics: "Snelstartgids voor High Availability GCP , Beperkingen van High Availability SafeKit , Overzicht van de SafeKit / GCP -oplossing, Installatie van de SafeKit / GCP -oplossing op Windows en Linux ( farm.safe ), Stapsgewijze configuratie van de SafeKit / GCP -oplossing, Demonstratie van de SafeKit `farm` -oplossing, 🔍 SafeKit High Availability Navigation Hub"
---

# GCP Netwerktaakverdeling en failover: Installeer de SafeKit farm.safe module {#gcp-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-nl app="GCP" mod="farm"  %}}
 

## Overzicht van de SafeKit / GCP -oplossing {#overview-of-the-safekit--gcp-solution}

De oplossing wordt hier beschreven: ** 💡 [ SafeKit : Google GCP Load Balancing & Application High Availability `Farm` Cluster ](</solutions/gcp-load-balancing-cluster-failover/>) ** .

## Installatie van de SafeKit / GCP oplossing op Windows en Linux ( farm.safe ) {#installation-of-the-safekit--gcp-solution-on-windows-and-linux-farmsafe}

### Configuratie van de Google GCP load balancer {#configuration-of-the-google-gcp-load-balancer}

De load balancer moet geconfigureerd worden met een virtueel IP-adres.  
De load balancer moet zo geconfigureerd zijn dat deze periodiek statusupdates naar de nodes stuurt.  
Daarvoor biedt SafeKit een gezondheidscontrole die binnen de knooppunten wordt uitgevoerd en die

  * Geeft OK terug wanneer de status van de `farm` -module UP (groen) is.
  * retourneert 'NIET GEVONDEN' in alle andere staten.


U moet de Google GCP load balancer als volgt configureren:

  * HTTP-protocol
  * poort 9010, de poort van de SafeKit -webserver
  * URL /var/modules/farm/ready.txt (als `farm` de modulenaam is die u later gaat implementeren)


Voor meer informatie, zie [ de configuratie van de Google load balancer GCP ](<https://docs.cloud.google.com/load-balancing/docs/>) .


⚠️ Configureer geen virtueel IP-adres en load balancing-regels bij stap 4 in de onderstaande stapsgewijze configuratie. Het virtuele IP-adres en de load balancing-regels zijn al ingesteld in de Google GCP load balancer. Het instellen van een virtueel IP-adres en load balancing-regels bij stap 4 is alleen nuttig voor on-premise configuraties.

### Configuratie van de Google GCP netwerkbeveiliging {#configuration-of-the-google-gcp-network-security}

De netwerkbeveiliging moet zodanig geconfigureerd zijn dat communicatie voor de volgende protocollen en poorten mogelijk is:

  * UDP-poort 4800 voor de safeadmin-service (tussen SafeKit -nodes)
  * UDP-poort 4803 voor de heartbeats binnen de `farm` -module (tussen SafeKit -nodes)
  * TCP-poort 9010 voor de statuscontrole van de loadbalancer en voor de SafeKit webconsole die in de http-modus draait.
  * TCP – 9001 om de https-modus voor de console te configureren
  * TCP-poort 9453 voor de SafeKit -webconsole die in HTTPS-modus draait.



{{%  insert-safekit-installation-package-windows-nl app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-nl app="" mod="mirror"  %}}
 

Let op: de generieke **farm.safe** -module die u gaat configureren, is in het pakket opgenomen.

## Stapsgewijze configuratie van de SafeKit / GCP -oplossing {#step-by-step-configuration-of-the-safekit--gcp-solution}


{{%  insert-safekit-82-farm-configuration-nl app="" mod="farm"  %}}
 

## Demonstratie van de SafeKit `farm` oplossing {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}