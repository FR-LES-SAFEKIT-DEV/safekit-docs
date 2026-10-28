---
title: "Alta disponibilità Firebird con SafeKit : installare il modulo firebird.safe per il failover"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-with-firebird/"
description: "Distribuisci il modulo firebird.safe per SafeKit per abilitare la replica sincrona in tempo reale e il failover automatico di Firebird su Windows e Linux . Questa guida illustra la configurazione di un cluster SANless a 2 nodi per applicazioni critiche senza storage condiviso."
category: "quick-install"
lang: "it"
topics: "Guida rapida all'installazione dell'alta disponibilità per Firebird , Limitazioni dell'alta disponibilità SafeKit , Panoramica della soluzione SafeKit / Firebird , Installazione della soluzione SafeKit / Firebird su Windows e Linux ( firebird.safe ), Configurazione passo passo della soluzione SafeKit / Firebird , Dimostrazione della soluzione SafeKit mirror , 🔍 Hub di navigazione ad alta disponibilità SafeKit"
---

# Alta disponibilità Firebird con SafeKit : installare il modulo firebird.safe per il failover {#firebird-high-availability-with-safekit-install-the-firebirdsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-it app="Firebird" mod="firebird"  %}}
 

## Panoramica della soluzione SafeKit / Firebird {#overview-of-the-safekit--firebird-solution}

La soluzione è descritta qui: ** 💡 [ La più semplice Firebird Alta disponibilità: replica sincrona a 2 nodi e failover ](</it/solutions/firebird-high-availability-synchronous-replication-failover/>) ** .

## Installazione della soluzione SafeKit / Firebird su Windows e Linux ( firebird.safe ) {#installation-of-the-safekit--firebird-solution-on-windows-and-linux-firebirdsafe}

### Prerequisiti {#prerequisites}

  * È necessario installare Firebird su 2 nodi (macchine virtuali o server fisici).



{{%  insert-safekit-installation-package-windows-it app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-82-installation-module-windows-it app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-installation-package-linux-it app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-82-installation-module-linux-it app="Firebird" mod="firebird"  %}}
 

## Configurazione passo passo della soluzione SafeKit / Firebird {#step-by-step-configuration-of-the-safekit--firebird-solution}


{{%  insert-safekit-82-configuration-it app="Firebird" mod="firebird"  %}}
 

## Dimostrazione della soluzione SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}