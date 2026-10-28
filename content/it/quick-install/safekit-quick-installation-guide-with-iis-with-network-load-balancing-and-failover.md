---
title: "Bilanciamento del carico di rete e failover IIS : installare il modulo SafeKit iis_farm.safe"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-with-iis-with-network-load-balancing-and-failover/"
description: "Scopri come implementare il modulo iis_farm.safe su Windows per il bilanciamento del carico di rete e il failover automatico IIS . Questa guida ti mostra come creare un cluster ad alta disponibilità per servizi e applicazioni web utilizzando un IP virtuale, senza la necessità di bilanciatori di carico hardware esterni o configurazioni complesse."
category: "quick-install"
lang: "it"
topics: "Guida rapida all'installazione dell'alta disponibilità per IIS , Limitazioni dell'alta disponibilità SafeKit , Panoramica della soluzione SafeKit / IIS , Installazione della soluzione SafeKit / IIS su Windows ( iis_farm.safe ), Configurazione passo passo della soluzione SafeKit / IIS , Dimostrazione della soluzione SafeKit `farm` , 🔍 Hub di navigazione ad alta disponibilità SafeKit"
---

# IIS Bilanciamento del carico di rete e failover: installare il modulo SafeKit iis_farm.safe {#iis-network-load-balancing--failover-install-the-safekit-iis_farmsafe-module}


{{%  insert-safekit-farm-guide-it app="IIS" mod="iis_farm"  %}}
 

## Panoramica della soluzione SafeKit / IIS {#overview-of-the-safekit--iis-solution}

La soluzione è descritta qui: ** 💡 [ SafeKit : Software tutto in uno IIS bilanciamento del carico e alta disponibilità ](</it/solutions/iis-load-balancing-failover/>) ** .

## Installazione della soluzione SafeKit / IIS su Windows ( iis_farm.safe ) {#installation-of-the-safekit--iis-solution-on-windows-iis_farmsafe}

### Prerequisiti {#prerequisites}

  * È necessario installare IIS su almeno due nodi (macchine virtuali o server fisici).



{{%  insert-safekit-installation-package-windows-it app="IIS" mod="iis_farm"  %}}

{{%  insert-safekit-82-installation-module-windows-it app="IIS" mod="iis_farm"  %}}
 

## Configurazione passo passo della soluzione SafeKit / IIS {#step-by-step-configuration-of-the-safekit--iis-solution}


{{%  insert-safekit-82-farm-configuration-it app="IIS" mod="iis_farm"  %}}
 

## Dimostrazione della soluzione SafeKit `farm` {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-it  %}}

{{%  insert-safekit-hub-it app="Microsoft SQL Server mirror"  %}}

{{%  insert-safekit-4-buttons-it  %}}