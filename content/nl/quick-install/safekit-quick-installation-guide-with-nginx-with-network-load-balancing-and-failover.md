---
title: "NGINX netwerktaakverdeling en failover: Installeer de SafeKit farm.safe module"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-with-nginx-with-network-load-balancing-and-failover/"
description: "Leer hoe u de farm.safe module implementeert op Windows en Linux voor NGINX Network Load Balancing en automatische failover. Deze handleiding laat zien hoe u een zeer beschikbaar cluster voor webservices en applicaties bouwt met behulp van een virtueel IP-adres, zonder dat u externe hardware load balancers of complexe configuratie nodig hebt."
category: "quick-install"
lang: "nl"
topics: "Snelinstallatiegids voor hoge beschikbaarheid voor NGINX, Beperkingen SafeKit High Availability, Overzicht van de SafeKit/NGINX oplossing, Installatie van de SafeKit/NGINX-oplossing op Windows en Linux (farm.safe), Stapsgewijze configuratie van de SafeKit/NGINX oplossing, Demonstratie van de SafeKit farm, 🔍 Ontdek SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 39 expressions"
---

# NGINX netwerktaakverdeling en failover: Installeer de SafeKit farm.safe module {#nginx-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-nl app="NGINX" mod="farm"  %}}
 

## Overzicht van de SafeKit/NGINX oplossing {#overview-of-the-safekit--nginx-solution}

De oplossing wordt hier beschreven: **💡 [SafeKit: alles-in-één software NGINX taakverdeling en hoge beschikbaarheid](</nl/solutions/nginx-the-simplest-load-balancing-cluster-with-failover/>)**.

## Installatie van de SafeKit/NGINX-oplossing op Windows en Linux (farm.safe) {#installation-of-the-safekit--nginx-solution-on-windows-and-linux-farmsafe}

### Vereisten {#prerequisites}

  * U moet NGINX op twee of meer knooppunten (virtuele machines of fysieke servers) hebben geïnstalleerd.



{{%  insert-safekit-installation-package-windows-nl app="NGINX" mod="farm"  %}}

{{%  insert-safekit-installation-package-linux-nl app="NGINX" mod="farm"  %}}
 

Opmerking: de generieke **farm.safe** module die u gaat configureren, wordt meegeleverd in het pakket.

## Stapsgewijze configuratie van de SafeKit/NGINX oplossing {#step-by-step-configuration-of-the-safekit--nginx-solution}


{{%  insert-safekit-82-farm-configuration-nl app="NGINX" mod="farm"  %}}
 

## Demonstratie van de SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}