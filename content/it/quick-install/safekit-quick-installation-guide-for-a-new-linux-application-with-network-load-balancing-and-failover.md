---
title: "Installa SafeKit per il bilanciamento del carico di Linux (farm.safe)"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-for-a-new-linux-application-with-network-load-balancing-and-failover/"
description: "Guida passo passo: installa il modulo SafeKit farm.safe su Linux per il bilanciamento del carico di rete e il failover della tua applicazione su un IP virtuale."
category: "quick-install"
lang: "it"
topics: "Guida rapida all’installazione ad alta disponibilità per Linux, Limitazioni SafeKit High Availability, Panoramica della soluzione SafeKit/Linux, Installazione della soluzione SafeKit/Linux (farm.safe), Configurazione passo-passo della soluzione SafeKit/Linux, Dimostrazione della soluzione farm SafeKit"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--linux-solution, installation-of-the-safekit--linux-solution-farmsafe, step-by-step-configuration-of-the-safekit--linux-solution, demonstration-of-the-safekit-farm-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
image: "/wp-content/uploads/2024/03/15-monitoring-up-up.png"
schemaType: "TechArticle"
---

# Installa SafeKit per il bilanciamento del carico di Linux (farm.safe) {#install-safekit-for-linux-load-balancing-farmsafe}


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