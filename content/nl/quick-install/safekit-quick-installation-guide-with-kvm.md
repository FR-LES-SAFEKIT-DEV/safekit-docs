---
title: "KVM High Availability with SafeKit: Installeer de kvm.safe Module for Failover"
canonical: "https://safekit.eviden.com/nl/quick-install/safekit-quick-installation-guide-with-kvm/"
description: "Meer informatie over het configureren van kvm.safe voor een actief/actief KVM-cluster met SafeKit. Bereik hoge beschikbaarheid op VM-niveau met een 2-node shared-nothing architectuur. Repliceer verschillende VM's synchroon over knooppunten voor automatische failover zonder de kosten van een SAN of gedeelde opslag."
category: "quick-install"
lang: "nl"
topics: "Snelle installatiehandleiding met hoge beschikbaarheid voor KVM, SafeKit-beperkingen met hoge beschikbaarheid, overzicht van de SafeKit/ KVM-oplossing, installatie van de SafeKit/ KVM-oplossing op Linux (kvm.safe), stapsgewijze configuratie van de SafeKit/ KVM-oplossing, demonstratie van een oplossing met hoge beschikbaarheid op VM-niveau🔍, SafeKit-navigatiehub met hoge beschikbaarheid"
---

# Hoge beschikbaarheid van KVM met SafeKit: de kvm.safe-module installeren voor failover {#kvm-high-availability-with-safekit-install-the-kvmsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-nl app="KVM" mod="kvm"  %}}
 

## Overzicht van de SafeKit / KVM-oplossing {#overview-of-the-safekit--kvm-solution}

De oplossing wordt hier beschreven: **💡[Eenvoudige hoge beschikbaarheid voor Linux KVM zonder gedeelde opslag](</solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)**

## Installatie van de SafeKit / KVM-oplossing op Linux (kvm.safe) {#installation-of-the-safekit--kvm-solution-on-linux-kvmsafe}

### Vereisten {#prerequisites}

  * KVM is geïnstalleerd op twee Linux-knooppunten.
  * Kritieke applicaties geïnstalleerd in een of meer virtuele machines.
  * Maximaal 32 virtuele machines per KVM-host.
  * Het totale aantal gerepliceerde gegevens is beperkt tot een paar terabytes; daarna wordt de hersynchronisatietijd aanzienlijk.
  * Minimale 1Gb/s-verbinding tussen knooppunten (10Gb/s aanbevolen voor snellere hersynchronisatie).
  * IP-failover vereist dat beide knooppunten zich op hetzelfde LAN of uitgebreide LAN (L2) bevinden. Gerouteerde L3-netwerken worden niet ondersteund (behalve met 🛠️ [cloudloadbalancers](</resources/safekit-user-guide-82/#Cloud>)).



{{%  insert-safekit-installation-package-linux-nl app="KVM" mod="kvm"  %}}

{{%  insert-safekit-82-installation-module-linux-nl app="KVM" mod="kvm"  %}}
 

## Stap voor stap configuratie van de SafeKit / KVM oplossing {#step-by-step-configuration-of-the-safekit--kvm-solution}


{{%  insert-safekit-82-kvm-configuration-nl app="KVM" mod="kvm"  %}}
 

## Demonstratie van een VM-level high availability oplossing {#demonstration-of-a-vm-level-high-availability-solution}


{{%  insert-safekit-hyperv-video-nl  %}}

{{%  insert-safekit-hub-nl  %}}

{{%  insert-safekit-4-buttons-nl  %}}