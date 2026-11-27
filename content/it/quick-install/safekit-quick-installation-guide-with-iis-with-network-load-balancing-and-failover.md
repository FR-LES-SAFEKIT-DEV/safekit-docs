---
title: "Bilanciamento del carico e failover della rete IIS: installare il modulo SafeKit iisfarm.safe"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-with-iis-with-network-load-balancing-and-failover/"
description: "Guida passo passo: installa il modulo SafeKit iis_farm.safe su Windows per il bilanciamento del carico di rete e il failover dei server web IIS su un IP virtuale."
category: "quick-install"
lang: "it"
topics: "Panoramica della soluzione SafeKit/IIS, Installazione della soluzione SafeKit/IIS su Windows (iisfarm.safe), Configurazione passo-passo della soluzione SafeKit/IIS, Dimostrazione della soluzione farm SafeKit"
hashpart: "overview-of-the-safekit--iis-solution, installation-of-the-safekit--iis-solution-on-windows-iis_farmsafe, step-by-step-configuration-of-the-safekit--iis-solution, demonstration-of-the-safekit-farm-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
image: "/wp-content/uploads/2024/03/15-monitoring-up-up.png"
schemaType: "TechArticle"
---

# Bilanciamento del carico e failover della rete IIS: installare il modulo SafeKit iis_farm.safe {#iis-network-load-balancing--failover-install-the-safekit-iis_farmsafe-module}


{{%  insert-safekit-farm-guide-it app="IIS" mod="iis_farm"  %}}
 

## Panoramica della soluzione SafeKit/IIS {#overview-of-the-safekit--iis-solution}

La soluzione è descritta qui: **💡 [SafeKit: software tutto in uno per il bilanciamento del carico e l’alta disponibilità IIS](</it/solutions/iis-load-balancing-failover/>)**.

## Installazione della soluzione SafeKit/IIS su Windows (iis_farm.safe) {#installation-of-the-safekit--iis-solution-on-windows-iis_farmsafe}

### Prerequisiti {#prerequisites}

  * È necessario che IIS sia installato su 2 o più nodi (macchine virtuali o server fisici).



{{%  insert-safekit-installation-package-windows-it app="IIS" mod="iis_farm"  %}}

{{%  insert-safekit-82-installation-module-windows-it app="IIS" mod="iis_farm"  %}}
 

## Configurazione passo-passo della soluzione SafeKit/IIS {#step-by-step-configuration-of-the-safekit--iis-solution}


{{%  insert-safekit-82-farm-configuration-it app="IIS" mod="iis_farm"  %}}
 

## Dimostrazione della soluzione <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-it  %}}

{{%  insert-safekit-hub-it app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-it  %}}