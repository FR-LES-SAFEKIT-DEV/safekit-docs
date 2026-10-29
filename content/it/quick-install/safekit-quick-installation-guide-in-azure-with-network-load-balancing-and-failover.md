---
title: "Bilanciamento del carico di rete e failover in Azure: installazione del modulo farm.safe di SafeKit"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-in-azure-with-network-load-balancing-and-failover/"
description: "Migliora il bilanciamento del carico di rete di Azure con il monitoraggio intelligente delle applicazioni di SafeKit. Il modulo farm.safe fornisce un controllo dello stato dedicato per il bilanciatore del carico di Azure, consentendo alta disponibilità a livello applicativo, autoripristino e failover automatico per le applicazioni critiche."
category: "quick-install"
lang: "it"
topics: "Guida rapida all'installazione dell'alta disponibilità per Azure, Limitazioni dell'alta affidabilità SafeKit, Panoramica della soluzione SafeKit / Azure, Installazione della soluzione SafeKit / Azure su Windows e Linux (farm.safe), Configurazione dettagliata della soluzione SafeKit / Azure, Dimostrazione della soluzione <span class="notranslate farm-term" translate="no">farm</span> di SafeKit, 🔍 Hub di navigazione SafeKit High Availability"
---

# Bilanciamento del carico di rete e failover in Azure: installazione del modulo farm.safe di SafeKit {#azure-network-load-balancing--failover-install-the-safekit-farmsafe-module}

{{%  insert-safekit-farm-guide-it app="Azure" mod="farm"  %}}

## Panoramica della soluzione SafeKit / Azure {#overview-of-the-safekit--azure-solution}

La soluzione è descritta qui: **💡[SafeKit: bilanciamento del carico Microsoft Azure e alta disponibilità delle applicazioni con un cluster <span class="notranslate farm-term" translate="no">Farm</span>](</it/solutions/azure-load-balancing-cluster-failover/>)**.

## Installazione della soluzione SafeKit / Azure su Windows e Linux (farm.safe) {#installation-of-the-safekit--azure-solution-on-windows-and-linux-farmsafe}

### Configurazione del bilanciatore del carico Microsoft Azure {#configuration-of-the-microsoft-azure-load-balancer}

Il bilanciatore del carico deve essere configurato con un indirizzo IP virtuale.
Inoltre, deve inviare periodicamente pacchetti di controllo dello stato ai nodi.
A tale scopo, SafeKit fornisce un controllo dello stato che viene eseguito nei nodi e:

  * restituisce OK quando lo stato del modulo <span class="notranslate farm-term" translate="no">farm</span> è UP (verde)
  * restituisce NOT FOUND in tutti gli altri stati

Configurare il bilanciatore del carico Microsoft Azure con:

  * protocollo HTTP
  * porta 9010, la porta del server Web SafeKit
  * URL /var/modules/farm/ready.txt (se <span class="notranslate farm-term" translate="no">farm</span> è il nome del modulo che si distribuirà in seguito)

Per ulteriori informazioni, consultare [la configurazione del bilanciatore del carico Microsoft Azure](<https://learn.microsoft.com/en-us/azure/load-balancer/>).

⚠️ Non configurare un indirizzo IP virtuale né regole di bilanciamento del carico al passaggio 4 della configurazione dettagliata riportata di seguito. L'indirizzo IP virtuale e le regole sono già impostati nel bilanciatore del carico Microsoft Azure. La loro configurazione al passaggio 4 è utile solo per la configurazione locale.

### Configurazione della sicurezza di rete Microsoft Azure {#configuration-of-the-microsoft-azure-network-security}

La sicurezza di rete deve essere configurata per consentire le comunicazioni tramite i protocolli e le porte seguenti:

  * UDP - 4800 per il servizio safeadmin (tra i nodi SafeKit)
  * UDP - 4803 per gli heartbeat all'interno del modulo <span class="notranslate farm-term" translate="no">farm</span> (tra i nodi SafeKit)
  * TCP – 9010 per il controllo dello stato del bilanciatore del carico e per la console Web SafeKit in modalità http
  * TCP – 9001 per configurare la modalità https della console
  * TCP – 9453 per la console Web SafeKit in modalità https

{{%  insert-safekit-installation-package-windows-it app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-it app="" mod="mirror"  %}}

Nota: il modulo generico **farm.safe** da configurare è incluso nel pacchetto.

## Configurazione dettagliata della soluzione SafeKit / Azure {#step-by-step-configuration-of-the-safekit--azure-solution}

{{%  insert-safekit-82-farm-configuration-it app="" mod="farm"  %}}

## Dimostrazione della soluzione <span class="notranslate farm-term" translate="no">farm</span> di SafeKit {#demonstration-of-the-safekit-farm-solution}

{{%  insert-safekit-farm-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}
