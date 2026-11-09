---
title: "Bilanciamento del carico e failover della rete cloud: installare il modulo farm.safe SafeKit"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-in-cloud-with-network-load-balancing-and-failover/"
description: "Migliora il bilanciamento del carico della rete cloud con il monitoraggio intelligente delle applicazioni di SafeKit. Il modulo farm.safe fornisce un controllo di integrità dedicato per il bilanciatore del carico cloud, consentendo un’alta disponibilità (HA) senza interruzioni a livello di applicazione. Ottieni l’autoriparazione automatica e il failover per le applicazioni mission-critical."
category: "quick-install"
lang: "it"
topics: "Guida rapida all’installazione ad alta disponibilità per il cloud, Limitazioni SafeKit High Availability, Panoramica della soluzione SafeKit / Cloud, Installazione della soluzione SafeKit / Cloud su Windows e Linux (farm.safe), Configurazione passo-passo della soluzione SafeKit / Cloud, Dimostrazione della soluzione farm SafeKit, 🔍 Esplora SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
---

# Bilanciamento del carico e failover della rete cloud: installare il modulo farm.safe SafeKit {#cloud-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-it app="Cloud" mod="farm"  %}}
 

## Panoramica della soluzione SafeKit / Cloud {#overview-of-the-safekit--cloud-solution}

La soluzione è descritta qui: **💡 [SafeKit: Cloud Load Balancing e cluster <span class="notranslate farm-term" translate="no">farm</span> ad alta disponibilità delle applicazioni](</it/solutions/cloud-load-balancing-cluster-failover/>)**.

## Installazione della soluzione SafeKit / Cloud su Windows e Linux (farm.safe) {#installation-of-the-safekit--cloud-solution-on-windows-and-linux-farmsafe}

### Configurazione del bilanciatore del carico cloud {#configuration-of-the-cloud-load-balancer}

Il bilanciatore del carico deve essere configurato con un indirizzo IP virtuale.  
Inoltre, il bilanciatore del carico deve essere configurato per inviare periodicamente pacchetti di stato ai nodi.  
A tale scopo, SafeKit fornisce un controllo dello stato di salute che viene eseguito all’interno dei nodi e che

  * restituisce OK quando lo stato del modulo <span class="notranslate farm-term" translate="no">farm</span> è UP (verde)
  * restituisce NOT FOUND in tutti gli altri stati


È necessario configurare il bilanciatore del carico cloud con:

  * Protocollo HTTP
  * porta 9010, la porta del server web SafeKit
  * URL /var/modules/farm/ready.txt (se <span class="notranslate farm-term" translate="no">farm</span> è il nome del modulo che verrà distribuito in seguito)


⚠️ Non configurare un indirizzo IP virtuale e le regole di bilanciamento del carico al passaggio 4 nella configurazione dettagliata riportata di seguito. L’indirizzo IP virtuale e le regole di bilanciamento del carico sono già impostati nel bilanciatore del carico cloud. L’impostazione di un IP virtuale e delle regole di bilanciamento del carico al passaggio 4 è utile solo per la configurazione on-premise.

### Configurazione della sicurezza della rete cloud {#configuration-of-the-cloud-network-security}

La sicurezza della rete deve essere configurata per abilitare le comunicazioni per i seguenti protocolli e porte:

  * UDP - 4800 per il servizio safeadmin (tra i nodi SafeKit)
  * UDP - 4803 per gli heartbeat all’interno del modulo <span class="notranslate farm-term" translate="no">farm</span> (tra i nodi SafeKit)
  * TCP – 9010 per il controllo dello stato del load-balancer e per la console web SafeKit in esecuzione in modalità http
  * TCP – 9001 per configurare la modalità https per la console
  * TCP – 9453 per la console web SafeKit in esecuzione in modalità https



{{%  insert-safekit-installation-package-windows-it app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-it app="" mod="mirror"  %}}
 

Nota: il modulo generico **farm.safe** che si sta per configurare è fornito all’interno del pacchetto.

## Configurazione passo-passo della soluzione SafeKit / Cloud {#step-by-step-configuration-of-the-safekit--cloud-solution}


{{%  insert-safekit-82-farm-configuration-it app="" mod="farm"  %}}
 

## Dimostrazione della soluzione <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}