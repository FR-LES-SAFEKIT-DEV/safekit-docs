---
title: "Hoge beschikbaarheid op Linux met SafeKit: installeer de module mirror.safe voor failover"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover/"
description: "Implementeer de SafeKit-module mirror.safe voor synchrone realtimereplicatie en automatische failover op Linux. Deze handleiding begeleidt u bij het opzetten van een SANless-cluster met 2 nodes voor kritieke Linux-applicaties zonder gedeelde opslag."
category: "quick-install"
lang: "nl"
topics: "Snelle installatiehandleiding voor hoge beschikbaarheid op Linux, Beperkingen van SafeKit-hoge beschikbaarheid, Overzicht van de SafeKit-/Linux-oplossing, Installatie van de SafeKit-/Linux-oplossing (mirror.safe), Stapsgewijze configuratie van de SafeKit-/Linux-oplossing, Demonstratie van de SafeKit-mirror-oplossing, 🔍 SafeKit-navigatiehub voor hoge beschikbaarheid"
---

# Hoge beschikbaarheid op Linux met SafeKit: installeer de module mirror.safe voor failover {#linux-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-nl app="Linux" mod="mirror"  %}}
 

## Overzicht van de SafeKit-/Linux-oplossing {#overview-of-the-safekit--linux-solution}

De oplossing wordt hier beschreven: **💡[De eenvoudigste hoge beschikbaarheid op Linux: synchrone replicatie met 2 nodes en failover](</solutions/linux-high-availability-software-synchronous-replication-failover/>)**.

## Installatie van de SafeKit-/Linux-oplossing (mirror.safe) {#installation-of-the-safekit--linux-solution-mirrorsafe}

### Vereisten {#prerequisites}

  * De applicatie die u in SafeKit opnieuw wilt starten, moet op 2 nodes (virtuele machines of fysieke servers) zijn geïnstalleerd.



{{%  insert-safekit-installation-package-linux-nl app="" mod="mirror"  %}}
 

Opmerking: de generieke module **mirror.safe** die u gaat configureren, wordt in het pakket meegeleverd.

## Stapsgewijze configuratie van de SafeKit-/Linux-oplossing {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-configuration-nl app="Linux" mod="mirror"  %}}
 

## Demonstratie van de SafeKit-mirror-oplossing {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-nl  %}}

{{%  insert-safekit-hub-nl app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-nl  %}}
