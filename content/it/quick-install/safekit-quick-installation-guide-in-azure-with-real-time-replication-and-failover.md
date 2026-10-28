---
title: "Alta disponibilità in Azure: replica in tempo reale e failover con SafeKit"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-in-azure-with-real-time-replication-and-failover/"
description: "Distribuisci il modulo mirror.safe di SafeKit in Azure per abilitare la replica sincrona in tempo reale e il failover automatico su Windows e Linux. Questa guida spiega come configurare un cluster a due nodi senza storage condiviso per le applicazioni critiche."
category: "quick-install"
lang: "it"
topics: "Guida rapida all'installazione dell'alta disponibilità per Azure, Limitazioni dell'alta affidabilità SafeKit, Panoramica della soluzione SafeKit / Azure mirror, Installazione della soluzione SafeKit / Azure mirror su Windows e Linux (mirror.safe), Configurazione dettagliata della soluzione SafeKit / Azure mirror, Dimostrazione della soluzione mirror di SafeKit, 🔍 Hub di navigazione SafeKit High Availability"
---

# Alta disponibilità Azure con SafeKit: installazione del modulo mirror.safe per il failover {#azure-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}

{{%  insert-safekit-mirror-guide-it app="Azure" mod="mirror"  %}}

## Panoramica della soluzione SafeKit / Azure mirror {#overview-of-the-safekit--azure-mirror-solution}

La soluzione è descritta qui: **💡[Alta disponibilità Microsoft Azure: replica sincrona e failover con SafeKit](</it/solutions/azure-high-availability-cluster-synchronous-replication-failover/>)**.

## Installazione della soluzione SafeKit / Azure mirror su Windows e Linux (mirror.safe) {#installation-of-the-safekit--azure-mirror-solution-on-windows-and-linux-mirrorsafe}

### Configurazione del bilanciatore del carico Microsoft Azure {#configuration-of-the-microsoft-azure-load-balancer}

Il bilanciatore del carico deve essere configurato se si desidera implementare un indirizzo IP virtuale.
Inoltre, deve inviare periodicamente pacchetti di controllo dello stato ai nodi.
A tale scopo, SafeKit fornisce un controllo dello stato che viene eseguito nei nodi e:

  * restituisce OK quando lo stato del modulo mirror è PRIM (verde) o ALONE (verde)
  * restituisce NOT FOUND in tutti gli altri stati

Configurare il bilanciatore del carico Microsoft Azure con:

  * protocollo HTTP
  * porta 9010, la porta del server Web SafeKit
  * URL /var/modules/mirror/ready.txt (se mirror è il nome del modulo che si distribuirà in seguito)

Per ulteriori informazioni, consultare [la configurazione del bilanciatore del carico Microsoft Azure](<https://learn.microsoft.com/en-us/azure/load-balancer/>).

⚠️ Non configurare un indirizzo IP virtuale al passaggio 4 della configurazione dettagliata riportata di seguito. L'indirizzo IP virtuale è già impostato nel bilanciatore del carico Microsoft Azure. L'impostazione di un IP virtuale al passaggio 4 è utile solo per la configurazione locale.

### Configurazione della sicurezza di rete Microsoft Azure {#configuration-of-the-microsoft-azure-network-security}

La sicurezza di rete deve essere configurata per consentire le comunicazioni tramite i protocolli e le porte seguenti:

  * UDP - 4800 per il servizio safeadmin (tra i nodi SafeKit)
  * UDP - 8888 per l'heartbeat del modulo (tra i nodi SafeKit)
  * TCP – 5600 per la replica dei file in tempo reale del modulo (tra i nodi SafeKit)
  * TCP – 9010 per il controllo dello stato del bilanciatore del carico e per la console Web SafeKit in modalità http
  * TCP – 9001 per configurare la modalità https della console
  * TCP – 9453 per la console Web SafeKit in modalità https

{{%  insert-safekit-installation-package-windows-it app="" mod="mirror"  %}}

{{%  insert-safekit-installation-package-linux-it app="" mod="mirror"  %}}

Nota: il modulo generico **mirror.safe** da configurare è incluso nel pacchetto.

## Configurazione dettagliata della soluzione SafeKit / Azure mirror {#step-by-step-configuration-of-the-safekit--azure-mirror-solution}

{{%  insert-safekit-82-configuration-it app="Windows" mod="mirror"  %}}

## Dimostrazione della soluzione mirror di SafeKit {#demonstration-of-the-safekit-mirror-solution}

{{%  insert-safekit-mirror-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}
