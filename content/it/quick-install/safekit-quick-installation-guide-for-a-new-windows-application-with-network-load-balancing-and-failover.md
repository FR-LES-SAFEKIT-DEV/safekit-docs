---
title: "Bilanciamento del carico e failover della rete Windows: installare il modulo farm.safe SafeKit"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/"
description: "Scopri come distribuire il modulo farm.safe per il bilanciamento del carico di rete Windows e il failover automatico. Questa guida mostra come creare un cluster ad alta disponibilità per servizi e applicazioni Web utilizzando un IP virtuale, senza la necessità di bilanciatori del carico hardware esterni o configurazioni complesse."
category: "quick-install"
lang: "it"
topics: "Guida rapida all’installazione di High Availability per Windows, Limitazioni SafeKit High Availability, Panoramica della soluzione SafeKit/Windows, Installazione della soluzione SafeKit/Windows (farm.safe), Configurazione passo-passo della soluzione SafeKit/Windows, Dimostrazione della soluzione farm SafeKit, 🔍 Esplora SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
---

# Bilanciamento del carico e failover della rete Windows: installare il modulo farm.safe SafeKit {#windows-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-it app="Windows" mod="farm"  %}}
 

## Panoramica della soluzione SafeKit/Windows {#overview-of-the-safekit--windows-solution}

La soluzione è descritta qui: **💡 [SafeKit: software tutto in uno per il bilanciamento del carico e l’alta disponibilità Windows](</it/solutions/windows-load-balancing-failover/>)**.

## Installazione della soluzione SafeKit/Windows (farm.safe) {#installation-of-the-safekit--windows-solution-farmsafe}

### Prerequisiti {#prerequisites}

  * L’applicazione che si desidera inserire in una <span class="notranslate farm-term" translate="no">farm</span> deve essere installata su almeno 2 nodi (macchine virtuali o server fisici).



{{%  insert-safekit-installation-package-windows-it app="" mod="farm"  %}}
 

Nota: il modulo generico **farm.safe** che si sta per configurare è fornito all’interno del pacchetto.

## Configurazione passo-passo della soluzione SafeKit/Windows {#step-by-step-configuration-of-the-safekit--windows-solution}


{{%  insert-safekit-82-farm-configuration-it app="Windows" mod="farm"  %}}
 

## Dimostrazione della soluzione <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}