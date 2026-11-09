---
title: "Alta disponibilità nel cloud con SafeKit: installare il modulo mirror.safe per il failover"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-in-cloud-with-real-time-replication-and-failover/"
description: "Implementare il modulo mirror.safe per SafeKit in Cloud per abilitare la replica sincrona in tempo reale e il failover automatico su Windows e Linux. Questa guida illustra come configurare un cluster a 2 nodi shared-nothing per applicazioni critiche senza storage condiviso."
category: "quick-install"
lang: "it"
topics: "Guida rapida all’installazione ad alta disponibilità per il cloud, Limitazioni SafeKit High Availability, Panoramica della soluzione mirror SafeKit /Cloud, Installazione della soluzione mirror SafeKit /Cloud su Windows e Linux (mirror.safe), Configurazione passo-passo della soluzione mirror SafeKit /Cloud, Dimostrazione della soluzione mirror SafeKit, 🔍 Esplora SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
---

# Alta disponibilità nel cloud con SafeKit: installare il modulo mirror.safe per il failover {#cloud-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-it app="Cloud" mod="mirror"  %}}
 

## Panoramica della soluzione mirror SafeKit /Cloud {#overview-of-the-safekit--cloud-mirror-solution}

La soluzione è descrita qui: **💡 [Alta disponibilità indipendente dal cloud: replica sincrona e failover SafeKit](</it/solutions/cloud-high-availability-cluster-synchronous-replication-failover/>)**.

## Installazione della soluzione mirror SafeKit /Cloud su Windows e Linux (mirror.safe) {#installation-of-the-safekit--cloud-mirror-solution-on-windows-and-linux-mirrorsafe}

### Configurazione del bilanciatore del carico cloud {#configuration-of-the-cloud-load-balancer}

Il bilanciatore del carico deve essere configurato se si desidera implementare un indirizzo IP virtuale.  
Inoltre, il bilanciatore del carico deve essere configurato per inviare periodicamente pacchetti di stato ai nodi.  
A tale scopo, SafeKit fornisce un controllo dello stato di salute che viene eseguito all’interno dei nodi e che

  * restituisce OK quando lo stato del modulo mirror è PRIM (verde) o ALONE (verde)
  * restituisce NOT FOUND in tutti gli altri stati


È necessario configurare il bilanciatore del carico cloud con:

  * Protocollo HTTP
  * porta 9010, la porta del server web SafeKit
  * URL /var/modules/mirror/ready.txt (se mirror è il nome del modulo che verrà distribuito in seguito)


⚠️ Non configurare un indirizzo IP virtuale al passaggio 4 nella configurazione dettagliata riportata di seguito. L’indirizzo IP virtuale è già impostato nel bilanciatore del carico cloud. L’impostazione di un IP virtuale al passaggio 4 è utile solo per la configurazione on-premise.

### Configurazione della sicurezza della rete cloud {#configuration-of-the-cloud-network-security}

La sicurezza della rete deve essere configurata per abilitare le comunicazioni per i seguenti protocolli e porte:

  * UDP - 4800 per il servizio safeadmin (tra i nodi SafeKit)
  * UDP - 8888 per l’ heartbeat del modulo (tra i nodi SafeKit)
  * TCP – 5600 per il modulo di replica dei file in tempo reale (tra i nodi SafeKit)
  * TCP – 9010 per il controllo dello stato del load-balancer e per la console web SafeKit in esecuzione in modalità http
  * TCP – 9001 per configurare la modalità https per la console
  * TCP – 9453 per la console web SafeKit in esecuzione in modalità https



{{%  insert-safekit-installation-package-windows-it app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-it app="" mod="mirror"  %}}
 

Nota: il modulo generico **mirror.safe** che si sta per configurare è fornito all’interno del pacchetto.

## Configurazione passo-passo della soluzione mirror SafeKit /Cloud {#step-by-step-configuration-of-the-safekit--cloud-mirror-solution}


{{%  insert-safekit-82-configuration-it app="Windows" mod="mirror"  %}}
 

## Dimostrazione della soluzione mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}