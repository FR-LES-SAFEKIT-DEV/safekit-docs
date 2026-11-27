---
title: "IIS-netwerkbelastingverdeling en failover: Installeer de SafeKit iisfarm.safe-module"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-with-iis-with-network-load-balancing-and-failover/"
description: "Stapsgewijze handleiding: installeer de SafeKit-module iis_farm.safe op Windows voor netwerkloadbalancing en failover van IIS-webservers op een virtueel IP-adres."
category: "quick-install"
lang: "nl"
topics: "Snelinstallatiegids voor hoge beschikbaarheid voor IIS, Beperkingen SafeKit High Availability, Overzicht van de SafeKit/IIS-oplossing, Installatie van de SafeKit/IIS-oplossing op Windows (iisfarm.safe), Stapsgewijze configuratie van de SafeKit/IIS-oplossing, Demonstratie van de SafeKit farm"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--iis-solution, installation-of-the-safekit--iis-solution-on-windows-iis_farmsafe, step-by-step-configuration-of-the-safekit--iis-solution, demonstration-of-the-safekit-farm-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 39 expressions"
image: "/wp-content/uploads/2024/03/15-monitoring-up-up.png"
schemaType: "TechArticle"
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