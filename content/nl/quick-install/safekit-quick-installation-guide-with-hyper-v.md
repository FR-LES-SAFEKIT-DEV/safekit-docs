---
title: "Hyper-V hoge beschikbaarheid met SafeKit: Installeer de
  hyperv.safe-module voor failover"
canonical: https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-with-hyper-v/
description: Lees meer over het configureren van hyperv.safe voor een
  actief/actief Hyper-V-cluster met SafeKit. Bereik hoge beschikbaarheid op
  VM-niveau met een gedeelde-niets-architectuur met twee knooppunten. Repliceer
  synchroon meerdere VM's tussen knooppunten voor automatische failover, zonder
  de kosten van een SAN of gedeelde opslag.
category: quick-install
lang: nl
topics: Snelle installatiehandleiding voor hoge beschikbaarheid voor Hyper-V,
  SafeKit Hoge beschikbaarheidsbeperkingen, Overzicht van de
  SafeKit/Hyper-V-oplossing, Installatie van de SafeKit/Hyper-V-oplossing op
  Windows (hyperv.safe), Stapsgewijze configuratie van de
  SafeKit/Hyper-V-oplossing, Demonstratie van de SafeKit/Hyper-V-oplossing, 🔍
  SafeKit High Availability Navigation Hub
---

# Hyper-V Hoge beschikbaarheid met SafeKit: installeer de hyperv.safe-module voor failover {#hyper-v-high-availability-with-safekit-install-the-hypervsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-nl app="Hyper-V" mod="hyperv"  %}}
 

## Overzicht van de SafeKit / Hyper-V-oplossing {#overview-of-the-safekit--hyper-v-solution}

De oplossing wordt hier beschreven: **💡[Eenvoudig Hyper-V Hoge beschikbaarheid zonder gedeelde opslag (SAN)](</nl/solutions/hyper-v-replication-automatic-failover-load-balancing/>)**

## Installatie van de SafeKit / Hyper-V-oplossing op Windows (hyperv.safe) {#installation-of-the-safekit--hyper-v-solution-on-windows-hypervsafe}

### Vereisten {#prerequisites}

  * Hyper-V-rol geïnstalleerd op 2 Windows-knooppunten (gratis ingebed in alle Windows-versies, inclusief Windows voor pc).
  * Kritieke applicaties geïnstalleerd in een of meer virtuele machines.
  * Maximaal 32 virtuele machines per Hyper-V-host.
  * Het totale aantal gerepliceerde gegevens is beperkt tot een paar terabytes; daarna wordt de hersynchronisatietijd aanzienlijk.
  * Minimale 1Gb/s-verbinding tussen knooppunten (10Gb/s aanbevolen voor snellere hersynchronisatie).
  * IP failover vereist beide knooppunten op dezelfde LAN of uitgebreide LAN (L2) - gerouteerde L3-netwerken worden niet ondersteund (behalve met 🛠️ [cloud load balancers](</nl/resources/safekit-user-guide-82/#Cloud>)).



{{%  insert-safekit-siemens-license-nl  %}}

{{%  insert-safekit-installation-package-windows-nl app="Hyper-V" mod="hyperv"  %}}

{{%  insert-safekit-82-installation-module-windows-nl app="Hyper-V" mod="hyperv"  %}}
 

## Stapsgewijze configuratie van de SafeKit / Hyper-V-oplossing {#step-by-step-configuration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-82-hyper-v-configuration-nl app="Hyper-V" mod="hyperv"  %}}
 

## Demonstratie van de SafeKit / Hyper-V-oplossing {#demonstration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-hyperv-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}