---
title: "Windows: SafeKit installeren voor hoge beschikbaarheid"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/"
description: "Stapsgewijze handleiding: installeer de SafeKit-module mirror.safe op Windows voor realtime replicatie en automatische failover van uw applicatie op twee servers."
category: "quick-install"
lang: "nl"
topics: "Snelinstallatiegids voor hoge beschikbaarheid voor Windows, Beperkingen SafeKit High Availability, Overzicht van de SafeKit/Windows oplossing, Installatie op de SafeKit/Windows oplossingen (mirror.safe), Stapsgewijze configuratie van de SafeKit/Windows-oplossing, Demonstratie van de SafeKit mirror"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--windows-solution, installation-on-the-safekit--windows-solutions-mirrorsafe, step-by-step-configuration-of-the-safekit--windows-solution, demonstration-of-the-safekit-mirror-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 39 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# Windows: SafeKit installeren voor hoge beschikbaarheid {#install-safekit-for-windows-high-availability}


{{%  insert-safekit-mirror-guide-nl app="Windows" mod="mirror"  %}}
 

## Overzicht van de SafeKit/Windows oplossing {#overview-of-the-safekit--windows-solution}

De oplossing wordt hier beschreven: **💡 [De eenvoudigste Windows High Availability: 2-node synchrone replicatie en failover](</nl/solutions/windows-high-availability-software-synchronous-replication-failover/>)**

## Installatie op de SafeKit/Windows oplossingen (mirror.safe) {#installation-on-the-safekit--windows-solutions-mirrorsafe}

### Vereisten {#prerequisites}

  * De toepassing die u opnieuw wilt opstarten in SafeKit moet op 2 knooppunten (virtuele machines of fysieke servers) zijn geïnstalleerd.



{{%  insert-safekit-installation-package-windows-nl app="" mod="mirror"  %}}
 

Opmerking: de generieke **mirror.safe** -module die u gaat configureren, wordt meegeleverd in het pakket.

## Stapsgewijze configuratie van de SafeKit/Windows-oplossing {#step-by-step-configuration-of-the-safekit--windows-solution}


{{%  insert-safekit-82-configuration-nl app="Windows" mod="mirror"  %}}
 

## Demonstratie van de SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-nl  %}}

{{%  insert-safekit-hub-nl app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-nl  %}}