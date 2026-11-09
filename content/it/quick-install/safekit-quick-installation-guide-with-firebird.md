---
title: "Alta disponibilità Firebird con SafeKit: installare il modulo firebird.safe per il failover"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-with-firebird/"
description: "Implementare il modulo firebird.safe per SafeKit per abilitare la replica sincrona in tempo reale e il failover automatico di Firebird su Windows e Linux. Questa guida illustra come configurare un cluster SANless a 2 nodi per applicazioni critiche senza storage condiviso."
category: "quick-install"
lang: "it"
topics: "Guida rapida all’installazione ad alta disponibilità per Firebird, Limitazioni SafeKit High Availability, Panoramica della soluzione SafeKit/Firebird, Installazione della soluzione SafeKit/Firebird su Windows e Linux (firebird.safe), Configurazione passo-passo della soluzione SafeKit/Firebird, Dimostrazione della soluzione mirror SafeKit, 🔍 Esplora SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
---

# Alta disponibilità Firebird con SafeKit: installare il modulo firebird.safe per il failover {#firebird-high-availability-with-safekit-install-the-firebirdsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-it app="Firebird" mod="firebird"  %}}
 

## Panoramica della soluzione SafeKit/Firebird {#overview-of-the-safekit--firebird-solution}

La soluzione è descritta qui: **💡 [La più semplice alta disponibilità Firebird: replica sincrona a 2 nodi e failover](</it/solutions/firebird-high-availability-synchronous-replication-failover/>)**.

## Installazione della soluzione SafeKit/Firebird su Windows e Linux (firebird.safe) {#installation-of-the-safekit--firebird-solution-on-windows-and-linux-firebirdsafe}

### Prerequisiti {#prerequisites}

  * È necessario che Firebird sia installato su 2 nodi (macchine virtuali o server fisici).



{{%  insert-safekit-installation-package-windows-it app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-82-installation-module-windows-it app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-installation-package-linux-it app="Firebird" mod="firebird"  %}}

{{%  insert-safekit-82-installation-module-linux-it app="Firebird" mod="firebird"  %}}
 

## Configurazione passo-passo della soluzione SafeKit/Firebird {#step-by-step-configuration-of-the-safekit--firebird-solution}


{{%  insert-safekit-82-configuration-it app="Firebird" mod="firebird"  %}}
 

## Dimostrazione della soluzione mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}