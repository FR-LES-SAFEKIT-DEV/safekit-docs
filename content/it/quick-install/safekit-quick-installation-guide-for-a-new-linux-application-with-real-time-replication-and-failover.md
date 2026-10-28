---
title: "Alta disponibilità su Linux con SafeKit: installare il modulo mirror.safe per il failover"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-real-time-replication-and-failover/"
description: "Distribuisci il modulo mirror.safe di SafeKit per abilitare la replica sincrona in tempo reale e il failover automatico su Linux. Questa guida illustra come configurare un cluster SANless a 2 nodi per applicazioni Linux critiche senza storage condiviso."
category: "quick-install"
lang: "it"
topics: "Guida all'installazione rapida dell'alta disponibilità per Linux, Limitazioni dell'alta disponibilità di SafeKit, Panoramica della soluzione SafeKit / Linux, Installazione della soluzione SafeKit / Linux (mirror.safe), Configurazione passo passo della soluzione SafeKit / Linux, Dimostrazione della soluzione SafeKit mirror, 🔍 Hub di navigazione SafeKit per l'alta disponibilità"
---

# Alta disponibilità su Linux con SafeKit: installare il modulo mirror.safe per il failover {#linux-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-it app="Linux" mod="mirror"  %}}
 

## Panoramica della soluzione SafeKit / Linux {#overview-of-the-safekit--linux-solution}

La soluzione è descritta qui: **💡[La più semplice alta disponibilità su Linux: replica sincrona a 2 nodi e failover](</it/solutions/linux-high-availability-software-synchronous-replication-failover/>)**.

## Installazione della soluzione SafeKit / Linux (mirror.safe) {#installation-of-the-safekit--linux-solution-mirrorsafe}

### Prerequisiti {#prerequisites}

  * È necessario che l'applicazione da riavviare in SafeKit sia installata su 2 nodi (macchine virtuali o server fisici).



{{%  insert-safekit-installation-package-linux-it app="" mod="mirror"  %}}
 

Nota: il modulo generico **mirror.safe** che configurerete è fornito all'interno del pacchetto.

## Configurazione passo passo della soluzione SafeKit / Linux {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-configuration-it app="Linux" mod="mirror"  %}}
 

## Dimostrazione della soluzione SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-it  %}}

{{%  insert-safekit-hub-it app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-it  %}}
