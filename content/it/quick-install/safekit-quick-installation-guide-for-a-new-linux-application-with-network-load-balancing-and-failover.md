---
title: "Bilanciamento del carico e failover della rete Linux: installare il modulo farm.safe SafeKit"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-network-load-balancing-and-failover/"
description: "Scopri come distribuire il modulo farm.safe per il bilanciamento del carico di rete Linux e il failover automatico. Questa guida mostra come creare un cluster ad alta disponibilità per servizi e applicazioni web utilizzando un IP virtuale, senza la necessità di bilanciatori di carico hardware esterni o configurazioni complesse."
category: "quick-install"
lang: "it"
topics: "Guida rapida all’installazione per l’alta disponibilità per Linux, Limitazioni SafeKit High Availability, Panoramica della soluzione SafeKit/Linux, Installazione della soluzione SafeKit/Linux (farm.safe), Configurazione passo-passo della soluzione SafeKit/Linux, Dimostrazione della soluzione farm SafeKit, 🔍 Esplora SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
---

# Bilanciamento del carico e failover della rete Linux: installare il modulo farm.safe SafeKit {#linux-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-it app="Linux" mod="farm"  %}}
 

## Panoramica della soluzione SafeKit/Linux {#overview-of-the-safekit--linux-solution}

La soluzione è descritta qui: **💡 [SafeKit: software tutto in uno per il bilanciamento del carico e l’alta disponibilità Linux](</it/solutions/linux-load-balancing-failover/>)**.

## Installazione della soluzione SafeKit/Linux (farm.safe) {#installation-of-the-safekit--linux-solution-farmsafe}

### Prerequisiti {#prerequisites}

  * L’applicazione che si desidera inserire in una <span class="notranslate farm-term" translate="no">farm</span> deve essere installata su almeno 2 nodi (macchine virtuali o server fisici).



{{%  insert-safekit-installation-package-linux-it app="" mod="farm"  %}}
 

Nota: il modulo generico **farm.safe** che si sta per configurare è fornito all’interno del pacchetto.

## Configurazione passo-passo della soluzione SafeKit/Linux {#step-by-step-configuration-of-the-safekit--linux-solution}


{{%  insert-safekit-82-farm-configuration-it app="Linux" mod="farm"  %}}
 

## Dimostrazione della soluzione <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-it  %}}

{{%  insert-safekit-hub-it app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-it  %}}