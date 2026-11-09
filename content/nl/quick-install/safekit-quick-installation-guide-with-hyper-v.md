---
title: "Hyper-V hoge beschikbaarheid met SafeKit: Installeer de hyperv.safe module voor failover"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-with-hyper-v/"
description: "Lees meer over het configureren van hyperv.safe voor een actief/actief Hyper-V cluster met SafeKit. Bereik hoge beschikbaarheid op VM-niveau met een shared-nothing architectuur met 2 knooppunten. Repliceer verschillende VM's synchroon over knooppunten voor automatische failover zonder de kosten van een SAN of gedeelde opslag."
category: "quick-install"
lang: "nl"
topics: "Snelinstallatiegids voor hoge beschikbaarheid voor Hyper-V, Beperkingen SafeKit High Availability, Overzicht van de SafeKit/Hyper-V oplossing, Installatie van de SafeKit/Hyper-V oplossing op Windows (hyperv.safe), Stapsgewijze configuratie van de SafeKit/Hyper-V oplossing, Demonstratie van de SafeKit/Hyper-V oplossing, 🔍 Ontdek SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 39 expressions"
---

# Hyper-V hoge beschikbaarheid met SafeKit: Installeer de hyperv.safe module voor failover {#hyper-v-high-availability-with-safekit-install-the-hypervsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-nl app="Hyper-V" mod="hyperv"  %}}
 

## Overzicht van de SafeKit/Hyper-V oplossing {#overview-of-the-safekit--hyper-v-solution}

De oplossing wordt hier beschreven: **💡 [Eenvoudige Hyper-V hoge beschikbaarheid zonder gedeelde opslag (SAN)](</nl/solutions/hyper-v-replication-automatic-failover-load-balancing/>)**

## Installatie van de SafeKit/Hyper-V oplossing op Windows (hyperv.safe) {#installation-of-the-safekit--hyper-v-solution-on-windows-hypervsafe}

### Vereisten {#prerequisites}

  * Hyper-V-rol is geïnstalleerd op 2 Windows knooppunten (gratis ingebed in alle Windows versies, inclusief Windows voor pc).
  * Kritieke toepassingen die in een of meer virtuele machines zijn geïnstalleerd.
  * Maximaal 32 virtuele machines per Hyper-V host.
  * De totale gerepliceerde gegevens zijn beperkt tot een paar terabytes; daarboven wordt de resynchronisatietijd aanzienlijk.
  * Minimale interconnectie tussen knooppunten van 1 Gb/s (10 Gb/s aanbevolen voor snellere resynchronisatie).
  * IP-failover vereist dat beide knooppunten zich in hetzelfde LAN of uitgebreide LAN (L2) bevinden — gerouteerde L3-netwerken worden niet ondersteund (behalve met 🛠️ [cloud load balancers](</nl/resources/safekit-user-guide-82/#Cloud>)).



{{%  insert-safekit-siemens-license-nl  %}}

{{%  insert-safekit-installation-package-windows-nl app="Hyper-V" mod="hyperv"  %}}

{{%  insert-safekit-82-installation-module-windows-nl app="Hyper-V" mod="hyperv"  %}}
 

## Stapsgewijze configuratie van de SafeKit/Hyper-V oplossing {#step-by-step-configuration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-82-hyper-v-configuration-nl app="Hyper-V" mod="hyperv"  %}}
 

## Demonstratie van de SafeKit/Hyper-V oplossing {#demonstration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-hyperv-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}