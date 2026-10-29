---
title: "Bilanciamento del carico di rete e failover GCP : installare il modulo SafeKit farm.safe"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-in-gcp-with-network-load-balancing-and-failover/"
description: "Migliora il bilanciamento del carico di rete GCP con il monitoraggio intelligente delle applicazioni di SafeKit . Il modulo farm.safe fornisce un controllo di integrità dedicato per il bilanciatore di carico GCP , consentendo un'alta disponibilità senza interruzioni a livello di applicazione. Ottieni autoriparazione automatica e failover per le applicazioni mission-critical."
category: "quick-install"
lang: "it"
topics: "Guida rapida all'installazione dell'alta disponibilità per GCP , Limitazioni dell'alta disponibilità SafeKit , Panoramica della soluzione SafeKit / GCP , Installazione della soluzione SafeKit / GCP su Windows e Linux ( farm.safe ), Configurazione passo passo della soluzione SafeKit / GCP , Dimostrazione della soluzione SafeKit <span class="notranslate farm-term" translate="no">farm</span> , 🔍 Hub di navigazione ad alta disponibilità SafeKit"
---

# GCP Bilanciamento del carico di rete e failover: installare il modulo SafeKit farm.safe {#gcp-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-it app="GCP" mod="farm"  %}}
 

## Panoramica della soluzione SafeKit / GCP {#overview-of-the-safekit--gcp-solution}

La soluzione è descritta qui: **💡 [ SafeKit : Google GCP Bilanciamento del carico e alta disponibilità delle applicazioni Cluster <span class="notranslate farm-term" translate="no">Farm</span> ](</it/solutions/gcp-load-balancing-cluster-failover/>)** .

## Installazione della soluzione SafeKit / GCP su Windows e Linux ( farm.safe ) {#installation-of-the-safekit--gcp-solution-on-windows-and-linux-farmsafe}

### Configurazione del bilanciatore di carico Google GCP {#configuration-of-the-google-gcp-load-balancer}

Il bilanciatore di carico deve essere configurato con un indirizzo IP virtuale.  
Inoltre, il bilanciatore di carico deve essere configurato per inviare periodicamente pacchetti di stato ai nodi.  
A tal fine, SafeKit fornisce un controllo di salute che viene eseguito all'interno dei nodi e che

  * restituisce OK quando lo stato del modulo <span class="notranslate farm-term" translate="no">farm</span> è ATTIVO (verde)
  * Resi NON TROVATI in tutti gli altri stati


È necessario configurare il bilanciatore di carico Google GCP con:

  * Protocollo HTTP
  * porta 9010, la porta del server web SafeKit
  * URL /var/modules/farm/ready.txt (se <span class="notranslate farm-term" translate="no">farm</span> è il nome del modulo che verrà distribuito in seguito)


Per ulteriori informazioni, consultare la configurazione del bilanciatore di carico Google [ GCP ](<https://docs.cloud.google.com/load-balancing/docs/>)


⚠️ Non configurare un indirizzo IP virtuale e le regole di bilanciamento del carico al passaggio 4 della procedura di configurazione guidata riportata di seguito. L'indirizzo IP virtuale e le regole di bilanciamento del carico sono già impostati nel bilanciatore di carico Google GCP . L'impostazione di un indirizzo IP virtuale e delle regole di bilanciamento del carico al passaggio 4 è utile solo per le configurazioni locali.

### Configurazione della sicurezza di rete Google GCP {#configuration-of-the-google-gcp-network-security}

La sicurezza di rete deve essere configurata per consentire le comunicazioni per i seguenti protocolli e porte:

  * UDP - 4800 per il servizio safeadmin (tra i nodi SafeKit )
  * UDP - 4803 per i segnali di heartbeat all'interno del modulo <span class="notranslate farm-term" translate="no">farm</span> (tra i nodi SafeKit )
  * TCP – 9010 per il controllo dello stato del bilanciatore di carico e per la console web SafeKit in esecuzione in modalità http
  * TCP – 9001 per configurare la modalità https per la console
  * TCP – 9453 per la console web SafeKit in esecuzione in modalità https



{{%  insert-safekit-installation-package-windows-it app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-it app="" mod="mirror"  %}}
 

Nota: il modulo generico **farm.safe** che andrai a configurare è incluso nel pacchetto.

## Configurazione passo passo della soluzione SafeKit / GCP {#step-by-step-configuration-of-the-safekit--gcp-solution}


{{%  insert-safekit-82-farm-configuration-it app="" mod="farm"  %}}
 

## Dimostrazione della soluzione SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}