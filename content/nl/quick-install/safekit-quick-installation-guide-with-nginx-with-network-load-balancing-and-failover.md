---
title: "NGINX netwerkbelastingverdeling en failover: installeer de SafeKit farm.safe -module"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-with-nginx-with-network-load-balancing-and-failover/"
description: "Leer hoe u de farm.safe -module implementeert op Windows en Linux voor NGINX-netwerkbelastingverdeling en automatische failover. Deze handleiding laat u zien hoe u een zeer beschikbaar cluster voor webservices en applicaties bouwt met behulp van een virtueel IP-adres, zonder dat u externe hardwarematige belastingverdelers of complexe configuratie nodig hebt."
category: "quick-install"
lang: "nl"
topics: "Snelstartgids voor High Availability met NGINX, Beperkingen van High Availability SafeKit , Overzicht van de SafeKit /NGINX-oplossing, Installatie van de SafeKit /NGINX-oplossing op Windows en Linux ( farm.safe ), Stapsgewijze configuratie van de SafeKit /NGINX-oplossing, Demonstratie van de SafeKit `farm` -oplossing, 🔍 SafeKit High Availability Navigation Hub"
---

# NGINX netwerkbelastingverdeling en failover: installeer de SafeKit farm.safe module {#nginx-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-nl app="NGINX" mod="farm"  %}}
 

## Overzicht van de SafeKit / NGINX-oplossing {#overview-of-the-safekit--nginx-solution}

De oplossing wordt hier beschreven: ** 💡 [ SafeKit : Alles-in-één NGINX-software voor load balancing en hoge beschikbaarheid ](</nl/solutions/nginx-the-simplest-load-balancing-cluster-with-failover/>) ** .

## Installatie van de SafeKit / NGINX-oplossing op Windows en Linux ( farm.safe ) {#installation-of-the-safekit--nginx-solution-on-windows-and-linux-farmsafe}

### Vereisten {#prerequisites}

  * Je hebt NGINX nodig dat op minimaal twee nodes (virtuele machines of fysieke servers) is geïnstalleerd.



{{%  insert-safekit-installation-package-windows-nl app="NGINX" mod="farm"  %}}

{{%  insert-safekit-installation-package-linux-nl app="NGINX" mod="farm"  %}}
 

Let op: de generieke **farm.safe** -module die u gaat configureren, is in het pakket opgenomen.

## Stapsgewijze configuratie van de SafeKit / NGINX-oplossing {#step-by-step-configuration-of-the-safekit--nginx-solution}


{{%  insert-safekit-82-farm-configuration-nl app="NGINX" mod="farm"  %}}
 

## Demonstratie van de SafeKit `farm` oplossing {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}