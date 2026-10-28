---
title: "Alta disponibilità su Windows con SafeKit: installare il modulo mirror.safe per il failover"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/"
description: "Distribuisci il modulo mirror.safe di SafeKit per abilitare la replica sincrona in tempo reale e il failover automatico su Windows. Questa guida illustra come configurare un cluster SANless a 2 nodi per applicazioni Windows critiche senza storage condiviso."
category: "quick-install"
lang: "it"
topics: "Guida all'installazione rapida dell'alta disponibilità per Windows, Limitazioni dell'alta disponibilità di SafeKit, Panoramica della soluzione SafeKit / Windows, Installazione nelle soluzioni SafeKit / Windows (mirror.safe), Configurazione passo passo della soluzione SafeKit / Windows, Dimostrazione della soluzione SafeKit mirror, 🔍 Hub di navigazione SafeKit per l'alta disponibilità"
---

# Alta disponibilità su Windows con SafeKit: installare il modulo mirror.safe per il failover {#windows-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-it app="Windows" mod="mirror"  %}}
 

## Panoramica della soluzione SafeKit / Windows {#overview-of-the-safekit--windows-solution}

La soluzione è descritta qui: **💡[La più semplice alta disponibilità su Windows: replica sincrona a 2 nodi e failover](</solutions/windows-high-availability-software-synchronous-replication-failover/>)**

## Installazione nelle soluzioni SafeKit / Windows (mirror.safe) {#installation-on-the-safekit--windows-solutions-mirrorsafe}

### Prerequisiti {#prerequisites}

  * È necessario che l'applicazione da riavviare in SafeKit sia installata su 2 nodi (macchine virtuali o server fisici).



{{%  insert-safekit-installation-package-windows-it app="" mod="mirror"  %}}
 

Nota: il modulo generico **mirror.safe** che configurerete è fornito all'interno del pacchetto.

## Configurazione passo passo della soluzione SafeKit / Windows {#step-by-step-configuration-of-the-safekit--windows-solution}


{{%  insert-safekit-82-configuration-it app="Windows" mod="mirror"  %}}
 

## Dimostrazione della soluzione SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-it  %}}

{{%  insert-safekit-hub-it app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-it  %}}
