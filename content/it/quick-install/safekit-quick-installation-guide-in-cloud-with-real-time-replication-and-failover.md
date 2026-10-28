---
title: "Alta disponibilità nel cloud con SafeKit : installa il modulo mirror.safe per il failover"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-in-cloud-with-real-time-replication-and-failover/"
description: "Distribuisci il modulo mirror.safe per SafeKit nel cloud per abilitare la replica sincrona in tempo reale e il failover automatico su Windows e Linux . Questa guida illustra la configurazione di un cluster shared-nothing a 2 nodi per applicazioni critiche senza storage condiviso."
category: "quick-install"
lang: "it"
topics: "Guida rapida all'installazione dell'alta disponibilità per il cloud, Limitazioni dell'alta disponibilità SafeKit , Panoramica della soluzione SafeKit / Cloud mirror , Installazione della soluzione SafeKit / Cloud mirror su Windows e Linux ( mirror.safe ), Configurazione passo passo della soluzione SafeKit / Cloud mirror , Dimostrazione della soluzione SafeKit mirror , 🔍 Hub di navigazione per l'alta disponibilità SafeKit"
---

# Alta disponibilità cloud con SafeKit : installare il modulo mirror.safe per il failover {#cloud-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-it app="Cloud" mod="mirror"  %}}
 

## Panoramica della soluzione SafeKit / Cloud mirror {#overview-of-the-safekit--cloud-mirror-solution}

La soluzione è descritta qui: ** 💡 [ Alta disponibilità indipendente dal cloud: SafeKit Replica sincrona e failover ](</it/solutions/cloud-high-availability-cluster-synchronous-replication-failover/>) ** .

## Installazione della soluzione SafeKit / Cloud mirror su Windows e Linux ( mirror.safe ) {#installation-of-the-safekit--cloud-mirror-solution-on-windows-and-linux-mirrorsafe}

### Configurazione del bilanciatore di carico cloud {#configuration-of-the-cloud-load-balancer}

Il bilanciatore di carico deve essere configurato se si desidera implementare un indirizzo IP virtuale.  
Inoltre, il bilanciatore di carico deve essere configurato per inviare periodicamente pacchetti di stato ai nodi.  
A tal fine, SafeKit fornisce un controllo di salute che viene eseguito all'interno dei nodi e che

  * restituisce OK quando lo stato del modulo mirror è PRIM (verde) o ALONE (verde)
  * Resi NON TROVATI in tutti gli altri stati


È necessario configurare il bilanciatore di carico cloud con:

  * Protocollo HTTP
  * porta 9010, la porta del server web SafeKit
  * URL /var/modules/mirror/ready.txt (se mirror è il nome del modulo che verrà distribuito in seguito)


⚠️ Non configurare un indirizzo IP virtuale al passaggio 4 della procedura di configurazione guidata riportata di seguito. L'indirizzo IP virtuale è già impostato nel bilanciatore di carico cloud. L'impostazione di un indirizzo IP virtuale al passaggio 4 è utile solo per la configurazione on-premise.

### Configurazione della sicurezza di rete cloud {#configuration-of-the-cloud-network-security}

La sicurezza di rete deve essere configurata per consentire le comunicazioni per i seguenti protocolli e porte:

  * UDP - 4800 per il servizio safeadmin (tra i nodi SafeKit )
  * UDP - 8888 per il heartbeat del modulo (tra i nodi SafeKit )
  * TCP – 5600 per il modulo di replica dei file in tempo reale (tra i nodi SafeKit )
  * TCP – 9010 per il controllo dello stato del bilanciatore di carico e per la console web SafeKit in esecuzione in modalità http
  * TCP – 9001 per configurare la modalità https per la console
  * TCP – 9453 per la console web SafeKit in esecuzione in modalità https



{{%  insert-safekit-installation-package-windows-it app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-it app="" mod="mirror"  %}}
 

Nota: il modulo generico **mirror.safe** che andrai a configurare è incluso nel pacchetto.

## Configurazione passo passo della soluzione SafeKit / Cloud mirror {#step-by-step-configuration-of-the-safekit--cloud-mirror-solution}


{{%  insert-safekit-82-configuration-it app="Windows" mod="mirror"  %}}
 

## Dimostrazione della soluzione SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}