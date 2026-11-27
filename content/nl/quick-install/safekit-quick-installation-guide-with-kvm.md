---
title: "KVM High Availability met SafeKit: Installeer de kvm.safe module voor failover"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-with-kvm/"
description: "Stapsgewijze handleiding: installeer de SafeKit-module kvm.safe voor hoge beschikbaarheid op VM-niveau, met replicatie en failover van virtuele KVM-machines op Linux."
category: "quick-install"
lang: "nl"
topics: "Snelinstallatiegids voor hoge beschikbaarheid voor KVM, Beperkingen SafeKit High Availability, Overzicht van de SafeKit/KVM oplossing, Installatie van de SafeKit/KVM-oplossing op Linux (kvm.safe), Stapsgewijze configuratie van de SafeKit/KVM oplossing, Demonstratie van een high-availability-oplossing op VM-niveau"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--kvm-solution, installation-of-the-safekit--kvm-solution-on-linux-kvmsafe, step-by-step-configuration-of-the-safekit--kvm-solution, demonstration-of-a-vm-level-high-availability-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 39 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# KVM High Availability met SafeKit: Installeer de kvm.safe module voor failover {#kvm-high-availability-with-safekit-install-the-kvmsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-nl app="KVM" mod="kvm"  %}}
 

## Overzicht van de SafeKit/KVM oplossing {#overview-of-the-safekit--kvm-solution}

De oplossing wordt hier beschreven: **💡 [Eenvoudige Linux KVM hoge beschikbaarheid zonder gedeelde opslag](</nl/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)**

## Installatie van de SafeKit/KVM-oplossing op Linux (kvm.safe) {#installation-of-the-safekit--kvm-solution-on-linux-kvmsafe}

### Vereisten {#prerequisites}

  * KVM geïnstalleerd op 2 Linux knooppunten.
  * Kritieke toepassingen die in een of meer virtuele machines zijn geïnstalleerd.
  * Maximaal 32 virtuele machines per KVM host.
  * De totale gerepliceerde gegevens zijn beperkt tot een paar terabytes; daarboven wordt de resynchronisatietijd aanzienlijk.
  * Minimale interconnectie tussen knooppunten van 1 Gb/s (10 Gb/s aanbevolen voor snellere resynchronisatie).
  * IP-failover vereist dat beide knooppunten zich in hetzelfde LAN of uitgebreide LAN (L2) bevinden — gerouteerde L3-netwerken worden niet ondersteund (behalve met 🛠️ [cloud load balancers](</nl/resources/safekit-user-guide-82/#Cloud>)).



{{%  insert-safekit-installation-package-linux-nl app="KVM" mod="kvm"  %}}

{{%  insert-safekit-82-installation-module-linux-nl app="KVM" mod="kvm"  %}}
 

## Stapsgewijze configuratie van de SafeKit/KVM oplossing {#step-by-step-configuration-of-the-safekit--kvm-solution}


{{%  insert-safekit-82-kvm-configuration-nl app="KVM" mod="kvm"  %}}
 

## Demonstratie van een high-availability-oplossing op VM-niveau {#demonstration-of-a-vm-level-high-availability-solution}


{{%  insert-safekit-hyperv-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}