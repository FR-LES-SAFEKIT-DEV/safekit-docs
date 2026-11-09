---
title: "Linux High Availability met SafeKit: Installeer de mirror.safe module voor failover"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover/"
description: "Implementeer de mirror.safe module voor SafeKit om synchrone real-time replicatie en automatische failover op Linux mogelijk te maken. Deze handleiding begeleidt u bij het opzetten van een SANless-cluster met 2 knooppunten voor bedrijfskritieke Linux toepassingen zonder gedeelde opslag."
category: "quick-install"
lang: "nl"
topics: "Snelinstallatiegids voor hoge beschikbaarheid voor Linux, Beperkingen SafeKit High Availability, Overzicht van de SafeKit/Linux oplossing, Installatie van de SafeKit/Linux-oplossing (mirror.safe), Stapsgewijze configuratie van de SafeKit/Linux oplossing, Demonstratie van de SafeKit mirror, 🔍 Ontdek SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 39 expressions"
---

# Linux High Availability met SafeKit: Installeer de mirror.safe module voor failover {#linux-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-nl app="Linux" mod="mirror"  %}}
 

## Overzicht van de SafeKit/Linux oplossing {#overview-of-the-safekit--linux-solution}

De oplossing wordt hier beschreven: **💡 [De eenvoudigste Linux High Availability: 2-Node Synchronous Replication & Failover](</nl/solutions/linux-high-availability-software-synchronous-replication-failover/>).  
**

## Installatie van de SafeKit/Linux-oplossing (mirror.safe) {#installation-of-the-safekit--linux-solution-mirrorsafe}

### Vereisten {#prerequisites}

  * De toepassing die u opnieuw wilt opstarten in SafeKit moet op 2 knooppunten (virtuele machines of fysieke servers) zijn geïnstalleerd.



{{%  insert-safekit-installation-package-linux-nl app="" mod="mirror"  %}}
 

Opmerking: de generieke **mirror.safe** -module die u gaat configureren, wordt meegeleverd in het pakket.

## Stapsgewijze configuratie van de SafeKit/Linux oplossing {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-configuration-nl app="Linux" mod="mirror"  %}}
 

## Demonstratie van de SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-nl  %}}

{{%  insert-safekit-hub-nl app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-nl  %}}