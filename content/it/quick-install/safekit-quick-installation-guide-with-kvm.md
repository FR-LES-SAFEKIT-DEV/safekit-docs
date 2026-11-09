---
title: "Alta disponibilità KVM con SafeKit: installare il modulo kvm.safe per il failover"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-with-kvm/"
description: "Scopri come configurare kvm.safe per un cluster KVM attivo/attivo con SafeKit. Ottieni un’elevata disponibilità a livello di VM con un’architettura a 2 nodi shared-nothing. Replica in modo sincrono più VM tra i nodi per il failover automatico senza il costo di una SAN o di un’archiviazione condivisa."
category: "quick-install"
lang: "it"
topics: "Guida rapida all’installazione ad alta disponibilità per KVM, Limitazioni SafeKit High Availability, Panoramica della soluzione SafeKit/KVM, Installazione della soluzione SafeKit/KVM su Linux (kvm.safe), Configurazione passo-passo della soluzione SafeKit/KVM, Dimostrazione di una soluzione di alta disponibilità a livello di VM, 🔍 Esplora SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
---

# Alta disponibilità KVM con SafeKit: installare il modulo kvm.safe per il failover {#kvm-high-availability-with-safekit-install-the-kvmsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-it app="KVM" mod="kvm"  %}}
 

## Panoramica della soluzione SafeKit/KVM {#overview-of-the-safekit--kvm-solution}

La soluzione è descritta qui: **💡 [Alta disponibilità KVM Linux semplice senza storage condiviso](</it/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>)**

## Installazione della soluzione SafeKit/KVM su Linux (kvm.safe) {#installation-of-the-safekit--kvm-solution-on-linux-kvmsafe}

### Prerequisiti {#prerequisites}

  * KVM installato su 2 nodi Linux.
  * Applicazioni critiche installate all’interno di una o più macchine virtuali.
  * Massimo 32 macchine virtuali per host KVM.
  * I dati totali replicati sono limitati a pochi terabyte; oltre questa soglia, il tempo di risincronizzazione diventa significativo.
  * Interconnessione minima di 1 Gb/s tra i nodi (10 Gb/s consigliati per una risincronizzazione più rapida).
  * Il failover IP richiede che entrambi i nodi si trovino sulla stessa LAN o LAN estesa (L2); le reti L3 instradate non sono supportate (eccetto con [i bilanciatori del carico cloud](</it/resources/safekit-user-guide-82/#Cloud>) 🛠️).



{{%  insert-safekit-installation-package-linux-it app="KVM" mod="kvm"  %}}

{{%  insert-safekit-82-installation-module-linux-it app="KVM" mod="kvm"  %}}
 

## Configurazione passo-passo della soluzione SafeKit/KVM {#step-by-step-configuration-of-the-safekit--kvm-solution}


{{%  insert-safekit-82-kvm-configuration-it app="KVM" mod="kvm"  %}}
 

## Dimostrazione di una soluzione di alta disponibilità a livello di VM {#demonstration-of-a-vm-level-high-availability-solution}


{{%  insert-safekit-hyperv-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}