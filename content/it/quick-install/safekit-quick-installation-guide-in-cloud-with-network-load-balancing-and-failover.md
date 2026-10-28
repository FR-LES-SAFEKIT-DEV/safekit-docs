---
title: "Bilanciamento del carico e failover della rete cloud: installare il modulo SafeKit farm.safe"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-in-cloud-with-network-load-balancing-and-failover/"
description: "Migliora il bilanciamento del carico della rete cloud con il monitoraggio intelligente delle applicazioni di SafeKit . Il modulo farm.safe fornisce un controllo di integrità dedicato per il bilanciatore di carico cloud, consentendo un'alta disponibilità senza interruzioni a livello di applicazione. Ottieni funzionalità di autoriparazione e failover automatici per le applicazioni mission-critical."
category: "quick-install"
lang: "it"
topics: "Guida rapida all'installazione dell'alta disponibilità per il cloud, Limitazioni dell'alta disponibilità SafeKit , Panoramica della soluzione SafeKit / Cloud, Installazione della soluzione SafeKit / Cloud su Windows e Linux ( farm.safe ), Configurazione passo passo della soluzione SafeKit / Cloud, Dimostrazione della soluzione SafeKit `farm` , 🔍 Hub di navigazione per l'alta disponibilità di SafeKit"
---

# Bilanciamento del carico e failover della rete cloud: installare il modulo SafeKit farm.safe {#cloud-network-load-balancing--failover-install-the-safekit-farmsafe-module}


{{%  insert-safekit-farm-guide-it app="Cloud" mod="farm"  %}}
 

## Panoramica della soluzione SafeKit / Cloud {#overview-of-the-safekit--cloud-solution}

La soluzione è descritta qui: ** 💡 [ SafeKit : Bilanciamento del carico cloud e alta disponibilità delle applicazioni Cluster `Farm` ](</solutions/cloud-load-balancing-cluster-failover/>) ** .

## Installazione della soluzione SafeKit / Cloud su Windows e Linux ( farm.safe ) {#installation-of-the-safekit--cloud-solution-on-windows-and-linux-farmsafe}

### Configurazione del bilanciatore di carico cloud {#configuration-of-the-cloud-load-balancer}

Il bilanciatore di carico deve essere configurato con un indirizzo IP virtuale.  
Inoltre, il bilanciatore di carico deve essere configurato per inviare periodicamente pacchetti di stato ai nodi.  
A tal fine, SafeKit fornisce un controllo di salute che viene eseguito all'interno dei nodi e che

  * restituisce OK quando lo stato del modulo `farm` è ATTIVO (verde)
  * Resi NON TROVATI in tutti gli altri stati


È necessario configurare il bilanciatore di carico cloud con:

  * Protocollo HTTP
  * porta 9010, la porta del server web SafeKit
  * URL /var/modules/farm/ready.txt (se `farm` è il nome del modulo che verrà distribuito in seguito)


⚠️ Non configurare un indirizzo IP virtuale e le regole di bilanciamento del carico al passaggio 4 della procedura di configurazione guidata riportata di seguito. L'indirizzo IP virtuale e le regole di bilanciamento del carico sono già impostati nel bilanciatore di carico cloud. L'impostazione di un indirizzo IP virtuale e delle regole di bilanciamento del carico al passaggio 4 è utile solo per la configurazione locale.

### Configurazione della sicurezza di rete cloud {#configuration-of-the-cloud-network-security}

La sicurezza di rete deve essere configurata per consentire le comunicazioni per i seguenti protocolli e porte:

  * UDP - 4800 per il servizio safeadmin (tra i nodi SafeKit )
  * UDP - 4803 per i segnali di heartbeat all'interno del modulo `farm` (tra i nodi SafeKit )
  * TCP – 9010 per il controllo dello stato del bilanciatore di carico e per la console web SafeKit in esecuzione in modalità http
  * TCP – 9001 per configurare la modalità https per la console
  * TCP – 9453 per la console web SafeKit in esecuzione in modalità https



{{%  insert-safekit-installation-package-windows-it app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-it app="" mod="mirror"  %}}
 

Nota: il modulo generico **farm.safe** che andrai a configurare è incluso nel pacchetto.

## Configurazione passo passo della soluzione SafeKit / Cloud {#step-by-step-configuration-of-the-safekit--cloud-solution}


{{%  insert-safekit-82-farm-configuration-it app="" mod="farm"  %}}
 

## Dimostrazione della soluzione SafeKit `farm` {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}