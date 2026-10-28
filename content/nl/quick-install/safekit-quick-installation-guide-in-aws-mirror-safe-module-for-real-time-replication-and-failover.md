---
title: "AWS Hoge beschikbaarheid met SafeKit : Installeer de mirror.safe -module voor failover."
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-in-aws-mirror-safe-module-for-real-time-replication-and-failover/"
description: "Implementeer de mirror.safe module voor SafeKit in AWS om synchrone realtime-replicatie en automatische failover op Windows en Linux mogelijk te maken. Deze handleiding beschrijft hoe u een shared-nothing-cluster met twee knooppunten configureert voor kritieke applicaties zonder gedeelde opslag."
category: "quick-install"
lang: "nl"
topics: "Snelstartgids voor High Availability AWS , Beperkingen van High Availability SafeKit , Overzicht van de SafeKit / AWS mirror oplossing, Installatie van de SafeKit / AWS mirror oplossing op Windows en Linux ( mirror.safe ), Stapsgewijze configuratie van de SafeKit / AWS mirror oplossing, Demonstratie van de SafeKit mirror -oplossing, 🔍 SafeKit High Availability Navigation Hub"
---

# AWS Hoge beschikbaarheid met SafeKit : Installeer de mirror.safe module voor failover {#aws-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-nl app="AWS" mod="mirror"  %}}
 

## Overzicht van de SafeKit / AWS mirror oplossing {#overview-of-the-safekit--aws-mirror-solution}

De oplossing wordt hier beschreven: ** 💡 [ Amazon AWS Hoge beschikbaarheid: SafeKit Synchrone replicatie en failover ](</solutions/aws-high-availability-cluster-synchronous-replication-failover/>) ** .

## Installatie van de SafeKit / AWS mirror oplossing op Windows en Linux ( mirror.safe ) {#installation-of-the-safekit--aws-mirror-solution-on-windows-and-linux-mirrorsafe}

### Configuratie van de Amazon AWS load balancer {#configuration-of-the-amazon-aws-load-balancer}

De load balancer moet geconfigureerd worden als u een virtueel IP-adres wilt gebruiken.  
De load balancer moet zo geconfigureerd zijn dat deze periodiek statusupdates naar de nodes stuurt.  
Daarvoor biedt SafeKit een gezondheidscontrole die binnen de knooppunten wordt uitgevoerd en die

  * Geeft OK terug wanneer de status van de mirror -module PRIM (groen) of ALONE (groen) is.
  * retourneert 'NIET GEVONDEN' in alle andere staten.


U moet de Amazon AWS load balancer als volgt configureren:

  * HTTP-protocol
  * poort 9010, de poort van de SafeKit -webserver
  * URL /var/modules/mirror/ready.txt (als mirror de modulenaam is die u later gaat implementeren)


Voor meer informatie, zie [ de configuratie van de Amazon load balancer AWS ](<https://aws.amazon.com/elasticloadbalancing/>) .


⚠️ Configureer geen virtueel IP-adres bij stap 4 in de onderstaande stapsgewijze configuratie. Het virtuele IP-adres is al ingesteld in de Amazon AWS load balancer. Het instellen van een virtueel IP-adres bij stap 4 is alleen nuttig voor on-premise configuraties.

### Configuratie van de Amazon AWS netwerkbeveiliging {#configuration-of-the-amazon-aws-network-security}

De netwerkbeveiliging moet zodanig geconfigureerd zijn dat communicatie voor de volgende protocollen en poorten mogelijk is:

  * UDP-poort 4800 voor de safeadmin-service (tussen SafeKit -nodes)
  * UDP-poort 8888 voor de module-heartbeat (tussen SafeKit -nodes)
  * TCP-poort 5600 voor de module realtime bestandsreplicatie (tussen SafeKit -nodes)
  * TCP-poort 9010 voor de statuscontrole van de loadbalancer en voor de SafeKit webconsole die in de http-modus draait.
  * TCP – 9001 om de https-modus voor de console te configureren
  * TCP-poort 9453 voor de SafeKit -webconsole die in HTTPS-modus draait.



{{%  insert-safekit-installation-package-windows-nl app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-nl app="" mod="mirror"  %}}
 

Let op: de generieke **mirror.safe** -module die u gaat configureren, is in het pakket opgenomen.

## Stapsgewijze configuratie van de SafeKit / AWS mirror oplossing {#step-by-step-configuration-of-the-safekit--aws-mirror-solution}


{{%  insert-safekit-82-configuration-nl app="Windows" mod="mirror"  %}}
 

## Demonstratie van de SafeKit mirror oplossing {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}