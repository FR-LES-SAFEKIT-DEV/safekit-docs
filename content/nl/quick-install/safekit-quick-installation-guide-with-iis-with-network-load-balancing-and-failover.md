---
title: "IIS-netwerkbelastingverdeling en failover: Installeer de SafeKit iis_farm.safe-module"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-with-iis-with-network-load-balancing-and-failover/"
description: "Leer hoe u de iis_farm.safe module op Windows kunt implementeren voor IIS Network Load Balancing en automatische failover. Deze handleiding laat u zien hoe u een zeer beschikbaar cluster voor webservices en -toepassingen kunt bouwen met behulp van een virtueel IP, zonder dat u externe hardware- load balancers of complexe configuratie nodig hebt."
category: "quick-install"
lang: "nl"
topics: "Snelinstallatiegids voor hoge beschikbaarheid voor IIS, Beperkingen SafeKit High Availability, Overzicht van de SafeKit/IIS-oplossing, Installatie van de SafeKit/IIS-oplossing op Windows (iis_farm.safe), Stapsgewijze configuratie van de SafeKit/IIS-oplossing, Demonstratie van de SafeKit farm, 🔍 Ontdek SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 39 expressions"
---

# IIS-netwerkbelastingverdeling en failover: Installeer de SafeKit iis_farm.safe-module {#iis-network-load-balancing--failover-install-the-safekit-iis_farmsafe-module}


{{%  insert-safekit-farm-guide-nl app="IIS" mod="iis_farm"  %}}
 

## Overzicht van de SafeKit/IIS-oplossing {#overview-of-the-safekit--iis-solution}

De oplossing wordt hier beschreven: **💡 [SafeKit: alles-in-één software voor IIS taakverdeling en hoge beschikbaarheid](</nl/solutions/iis-load-balancing-failover/>)**.

## Installatie van de SafeKit/IIS-oplossing op Windows (iis_farm.safe) {#installation-of-the-safekit--iis-solution-on-windows-iis_farmsafe}

### Vereisten {#prerequisites}

  * U hebt IIS nodig dat op 2 of meer knooppunten (virtuele machines of fysieke servers) is geïnstalleerd.



{{%  insert-safekit-installation-package-windows-nl app="IIS" mod="iis_farm"  %}}

{{%  insert-safekit-82-installation-module-windows-nl app="IIS" mod="iis_farm"  %}}
 

## Stapsgewijze configuratie van de SafeKit/IIS-oplossing {#step-by-step-configuration-of-the-safekit--iis-solution}


{{%  insert-safekit-82-farm-configuration-nl app="IIS" mod="iis_farm"  %}}
 

## Demonstratie van de SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-nl  %}}

{{%  insert-safekit-hub-nl app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-nl  %}}