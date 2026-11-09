---
title: "Bilanciamento del carico di rete e failover NGINX: installare il modulo farm.safe SafeKit"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-with-nginx-with-network-load-balancing-and-failover/"
description: "Scopri come distribuire il modulo farm.safe su Windows e Linux per il bilanciamento del carico di rete NGINX e il failover automatico. Questa guida mostra come creare un cluster ad alta disponibilità per servizi e applicazioni web utilizzando un IP virtuale, senza la necessità di bilanciatori di carico hardware esterni o configurazioni complesse."
category: "quick-install"
lang: "it"
topics: "Guida rapida all’installazione ad alta disponibilità per NGINX, Limitazioni SafeKit High Availability, Panoramica della soluzione SafeKit/NGINX, Installazione della soluzione SafeKit/NGINX su Windows e Linux (farm.safe), Configurazione passo-passo della soluzione SafeKit/NGINX, Dimostrazione della soluzione farm SafeKit, 🔍 Esplora SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
---

# Bilanciamento del carico di rete e failover NGINX: installare il modulo farm.safe SafeKit {#nginx-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-it app="NGINX" mod="farm"  %}}
 

## Panoramica della soluzione SafeKit/NGINX {#overview-of-the-safekit--nginx-solution}

La soluzione è descritta qui: **💡 [SafeKit: software tutto in uno per il bilanciamento del carico e l’alta disponibilità NGINX](</it/solutions/nginx-the-simplest-load-balancing-cluster-with-failover/>)**.

## Installazione della soluzione SafeKit/NGINX su Windows e Linux (farm.safe) {#installation-of-the-safekit--nginx-solution-on-windows-and-linux-farmsafe}

### Prerequisiti {#prerequisites}

  * È necessario che NGINX sia installato su 2 o più nodi (macchine virtuali o server fisici).



{{%  insert-safekit-installation-package-windows-it app="NGINX" mod="farm"  %}}

{{%  insert-safekit-installation-package-linux-it app="NGINX" mod="farm"  %}}
 

Nota: il modulo generico **farm.safe** che si sta per configurare è fornito all’interno del pacchetto.

## Configurazione passo-passo della soluzione SafeKit/NGINX {#step-by-step-configuration-of-the-safekit--nginx-solution}


{{%  insert-safekit-82-farm-configuration-it app="NGINX" mod="farm"  %}}
 

## Dimostrazione della soluzione <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}