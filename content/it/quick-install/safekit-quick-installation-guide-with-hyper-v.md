---
title: "Disponibilità elevata Hyper-V con SafeKit: installare il modulo
  hyperv.safe per il failover"
canonical: https://safekit.eviden.com/it/it/quick-install/safekit-quick-installation-guide-with-hyper-v/
description: Informazioni sulla configurazione di hyperv.safe per un cluster
  Hyper-V attivo/attivo con SafeKit. Ottieni un'elevata disponibilità a livello
  di VM con un'architettura senza condivisione a 2 nodi. Replica in modo
  sincrono diverse macchine virtuali tra i nodi per il failover automatico senza
  il costo di una SAN o di uno storage condiviso.
category: quick-install
lang: it
topics: Guida di installazione rapida ad alta disponibilità per Hyper-V,
  Limitazioni di alta disponibilità di SafeKit, Panoramica della soluzione
  SafeKit/Hyper-V, Installazione della soluzione SafeKit/Hyper-V su Windows
  (hyperv.safe), Configurazione passo passo della soluzione SafeKit/Hyper-V,
  Dimostrazione della soluzione SafeKit/Hyper-V, 🔍 Hub di navigazione ad alta
  disponibilità SafeKit
---

# Hyper-V Alta disponibilità con SafeKit: installa il modulo hyperv.safe per il failover {#hyper-v-high-availability-with-safekit-install-the-hypervsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-it app="Hyper-V" mod="hyperv"  %}}
 

## Panoramica della soluzione SafeKit / Hyper-V {#overview-of-the-safekit--hyper-v-solution}

La soluzione è descritta qui: **💡[Semplice Hyper-V Alta disponibilità senza archiviazione condivisa (SAN)](</it/solutions/hyper-v-replication-automatic-failover-load-balancing/>)**

## Installazione della soluzione SafeKit / Hyper-V su Windows (hyperv.safe) {#installation-of-the-safekit--hyper-v-solution-on-windows-hypervsafe}

### Prerequisiti {#prerequisites}

  * Ruolo Hyper-V installato su 2 nodi Windows (incorporato gratuitamente in tutte le versioni Windows incluso Windows per PC).
  * Applicazioni critiche installate all'interno di una o più macchine virtuali.
  * Massimo 32 macchine virtuali per host Hyper-V.
  * Il totale dei dati replicati è limitato a pochi terabyte: oltre questo limite, il tempo di risincronizzazione diventa significativo.
  * Interconnessione minima di 1 Gb/s tra i nodi (10 Gb/s consigliati per una risincronizzazione più rapida).
  * Il failover IP richiede entrambi i nodi sullo stesso LAN o LAN esteso (L2): le reti L3 instradate non sono supportate (eccetto con 🛠️ [bilanciatori di carico cloud](</resources/safekit-user-guide-82/#Cloud>)).



{{%  insert-safekit-siemens-license-it  %}}

{{%  insert-safekit-installation-package-windows-it app="Hyper-V" mod="hyperv"  %}}

{{%  insert-safekit-82-installation-module-windows-it app="Hyper-V" mod="hyperv"  %}}
 

## Configurazione passo passo della soluzione SafeKit / Hyper-V {#step-by-step-configuration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-82-hyper-v-configuration-it app="Hyper-V" mod="hyperv"  %}}
 

## Dimostrazione della soluzione SafeKit / Hyper-V {#demonstration-of-the-safekit--hyper-v-solution}


{{%  insert-safekit-hyperv-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}