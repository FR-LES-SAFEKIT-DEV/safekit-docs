---
title: "Bilanciamento del carico e failover della rete GCP: installare il modulo SafeKit farm.safe"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-in-gcp-with-network-load-balancing-and-failover/"
description: "Guida passo passo: installa il modulo SafeKit farm.safe in Google Cloud, dove verifica lo stato dell’applicazione per il bilanciatore GCP e gestisce il failover."
category: "quick-install"
lang: "it"
topics: "Panoramica della soluzione SafeKit/GCP, Installazione della soluzione SafeKit/GCP su Windows e Linux (farm.safe), Configurazione passo-passo della soluzione SafeKit/GCP, Dimostrazione della soluzione farm SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
image: "/wp-content/uploads/2024/03/15-monitoring-up-up.png"
schemaType: "TechArticle"
---

# Bilanciamento del carico e failover della rete GCP: installare il modulo SafeKit farm.safe {#gcp-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-it app="GCP" mod="farm"  %}}
 

## Panoramica della soluzione SafeKit/GCP {#overview-of-the-safekit--gcp-solution}

La soluzione è descritta qui: **💡 [SafeKit: Google GCP Load Balancing & Application High Availability cluster <span class="notranslate farm-term" translate="no">farm</span>](</it/solutions/gcp-load-balancing-cluster-failover/>)**.

## Installazione della soluzione SafeKit/GCP su Windows e Linux (farm.safe) {#installation-of-the-safekit--gcp-solution-on-windows-and-linux-farmsafe}

### Configurazione del bilanciatore del carico Google GCP {#configuration-of-the-google-gcp-load-balancer}

Il bilanciatore del carico deve essere configurato con un indirizzo IP virtuale.  
Inoltre, il bilanciatore del carico deve essere configurato per inviare periodicamente pacchetti di stato ai nodi.  
A tale scopo, SafeKit fornisce un controllo dello stato di salute che viene eseguito all’interno dei nodi e che

  * restituisce OK quando lo stato del modulo <span class="notranslate farm-term" translate="no">farm</span> è UP (verde)
  * restituisce NOT FOUND in tutti gli altri stati


È necessario configurare il bilanciatore del carico Google GCP con:

  * Protocollo HTTP
  * porta 9010, la porta del server web SafeKit
  * URL /var/modules/farm/ready.txt (se <span class="notranslate farm-term" translate="no">farm</span> è il nome del modulo che verrà distribuito in seguito)


Per maggiori informazioni, consultare [la configurazione del bilanciatore del carico di Google GCP](<https://docs.cloud.google.com/load-balancing/docs/>).


⚠️ Non configurare un indirizzo IP virtuale e le regole di bilanciamento del carico al passaggio 4 nella configurazione dettagliata riportata di seguito. L’indirizzo IP virtuale e le regole di bilanciamento del carico sono già impostati nel bilanciatore del carico Google GCP. L’impostazione di un IP virtuale e delle regole di bilanciamento del carico al passaggio 4 è utile solo per la configurazione on-premise.

### Configurazione della sicurezza di rete di Google GCP {#configuration-of-the-google-gcp-network-security}

La sicurezza della rete deve essere configurata per abilitare le comunicazioni per i seguenti protocolli e porte:

  * UDP - 4800 per il servizio safeadmin (tra i nodi SafeKit)
  * UDP - 4803 per gli heartbeat all’interno del modulo <span class="notranslate farm-term" translate="no">farm</span> (tra i nodi SafeKit)
  * TCP – 9010 per il controllo dello stato del load-balancer e per la console web SafeKit in esecuzione in modalità http
  * TCP – 9001 per configurare la modalità https per la console
  * TCP – 9453 per la console web SafeKit in esecuzione in modalità https



{{%  insert-safekit-installation-package-windows-it app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-it app="" mod="mirror"  %}}
 

Nota: il modulo generico **farm.safe** che si sta per configurare è fornito all’interno del pacchetto.

## Configurazione passo-passo della soluzione SafeKit/GCP {#step-by-step-configuration-of-the-safekit--gcp-solution}


{{%  insert-safekit-82-farm-configuration-it app="" mod="farm"  %}}
 

## Dimostrazione della soluzione <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}