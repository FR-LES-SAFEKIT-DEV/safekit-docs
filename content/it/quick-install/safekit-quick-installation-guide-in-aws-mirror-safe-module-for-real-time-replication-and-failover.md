---
title: "Installa SafeKit per l’alta disponibilità di AWS (mirror.safe)"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-in-aws-mirror-safe-module-for-real-time-replication-and-failover/"
description: "Guida passo passo: installa il modulo SafeKit mirror.safe in AWS per la replica in tempo reale e il failover tra due istanze Windows o Linux."
category: "quick-install"
lang: "it"
topics: "Guida rapida all’installazione ad alta disponibilità per AWS, Limitazioni SafeKit High Availability, Panoramica della soluzione mirror SafeKit/AWS, Installazione della soluzione mirror SafeKit/AWS su Windows e Linux (mirror.safe), Configurazione passo-passo della soluzione mirror SafeKit/AWS, Dimostrazione della soluzione mirror SafeKit"
hashpart: "quick-guide, safekit-ha-limitations, overview-of-the-safekit--aws-mirror-solution, installation-of-the-safekit--aws-mirror-solution-on-windows-and-linux-mirrorsafe, step-by-step-configuration-of-the-safekit--aws-mirror-solution, demonstration-of-the-safekit-mirror-solution"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
image: "/wp-content/uploads/2024/03/14-monitoring-prim-second.png"
schemaType: "TechArticle"
---

# Installa SafeKit per l’alta disponibilità di AWS (mirror.safe) {#install-safekit-for-aws-high-availability-mirrorsafe}


{{%  insert-safekit-mirror-guide-it app="AWS" mod="mirror"  %}}
 

## Panoramica della soluzione mirror SafeKit/AWS {#overview-of-the-safekit--aws-mirror-solution}

La soluzione è descritta qui: **💡 [Alta disponibilità Amazon AWS: replica sincrona e failover SafeKit](</it/solutions/aws-high-availability-cluster-synchronous-replication-failover/>)**.

## Installazione della soluzione mirror SafeKit/AWS su Windows e Linux (mirror.safe) {#installation-of-the-safekit--aws-mirror-solution-on-windows-and-linux-mirrorsafe}

### Configurazione del bilanciatore del carico Amazon AWS {#configuration-of-the-amazon-aws-load-balancer}

Il bilanciatore del carico deve essere configurato se si desidera un indirizzo IP virtuale.  
Inoltre, il bilanciatore del carico deve essere configurato per inviare periodicamente pacchetti di stato ai nodi.  
A tale scopo, SafeKit fornisce un controllo dello stato di salute che viene eseguito all’interno dei nodi e che

  * restituisce OK quando lo stato del modulo mirror è PRIM (verde) o ALONE (verde)
  * restituisce NOT FOUND in tutti gli altri stati


È necessario configurare il bilanciatore del carico Amazon AWS con:

  * Protocollo HTTP
  * porta 9010, la porta del server web SafeKit
  * URL /var/modules/mirror/ready.txt (se mirror è il nome del modulo che verrà distribuito in seguito)


Per maggiori informazioni, consultare [la configurazione del bilanciatore del carico Amazon AWS](<https://aws.amazon.com/elasticloadbalancing/>).


⚠️ Non configurare un indirizzo IP virtuale al passaggio 4 nella configurazione dettagliata riportata di seguito. L’indirizzo IP virtuale è già impostato nel bilanciatore del carico Amazon AWS. L’impostazione di un IP virtuale al passaggio 4 è utile solo per la configurazione on-premise.

### Configurazione della sicurezza di rete Amazon AWS {#configuration-of-the-amazon-aws-network-security}

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

## Configurazione passo-passo della soluzione mirror SafeKit/AWS {#step-by-step-configuration-of-the-safekit--aws-mirror-solution}


{{%  insert-safekit-82-configuration-it app="Windows" mod="mirror"  %}}
 

## Dimostrazione della soluzione mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}