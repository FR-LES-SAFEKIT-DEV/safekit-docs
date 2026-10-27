---
title: "KVM High Availability with SafeKit: Installa il modulo kvm.safe per il failover"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-with-kvm/"
description: "Scopri come configurare kvm.safe per un cluster KVM attivo/attivo con SafeKit. Ottieni un'elevata disponibilità a livello di VM con un'architettura shared-nothing a 2 nodi. Replica sincrona di diverse VM tra i nodi per il failover automatico senza il costo di una SAN o di uno storage condiviso."
category: "quick-install"
lang: "it"
topics: "High Availability Quick Installation Guide for KVM, SafeKit High Availability Limitations, Overview of the SafeKit/ KVM solution, Installation of the SafeKit/ KVM solution on Linux (kvm.safe), Step by step configuration of the SafeKit/ KVM solution, Demonstration of a VM-level high availability solution, 🔍 SafeKit High Availability Navigation Hub"
---

# Alta disponibilità KVM con SafeKit: installare il modulo kvm.safe per il failover {#kvm-high-availability-with-safekit-install-the-kvmsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-it app="KVM" mod="kvm"  %}}
 

## Panoramica della soluzione SafeKit / KVM {#overview-of-the-safekit--kvm-solution}

La soluzione è descritta qui: **💡[Alta disponibilità semplice di KVM su Linux senza archiviazione condivisa](</solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)**

## Installazione della soluzione SafeKit / KVM su Linux (kvm.safe) {#installation-of-the-safekit--kvm-solution-on-linux-kvmsafe}

### Prerequisiti {#prerequisites}

  * KVM installato su due nodi Linux.
  * Applicazioni critiche installate all'interno di una o più macchine virtuali.
  * Massimo 32 macchine virtuali per host KVM.
  * Il totale dei dati replicati è limitato a pochi terabyte: oltre questo limite, il tempo di risincronizzazione diventa significativo.
  * Interconnessione minima di 1 Gb/s tra i nodi (10 Gb/s consigliati per una risincronizzazione più rapida).
  * Il failover IP richiede che entrambi i nodi si trovino sulla stessa LAN o su una LAN estesa (L2); le reti L3 instradate non sono supportate (eccetto con i 🛠️ [bilanciatori di carico cloud](</resources/safekit-user-guide-82/#Cloud>)).



{{%  insert-safekit-installation-package-linux-it app="KVM" mod="kvm"  %}}

{{%  insert-safekit-82-installation-module-linux-it app="KVM" mod="kvm"  %}}
 

## Configurazione passo passo della soluzione SafeKit/ KVM {#step-by-step-configuration-of-the-safekit--kvm-solution}


{{%  insert-safekit-82-kvm-configuration-it app="KVM" mod="kvm"  %}}
 

## Dimostrazione di una soluzione ad alta disponibilità a livello di VM {#demonstration-of-a-vm-level-high-availability-solution}


{{%  insert-safekit-hyperv-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}