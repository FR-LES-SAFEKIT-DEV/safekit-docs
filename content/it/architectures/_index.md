---
title: "Architetture SafeKit"
canonical: "https://safekit.eviden.com/it/architectures/"
description: "Scopri le architetture di alta disponibilità con SafeKit. Approfondisci i cluster Mirror, Farm e Farm+Mirror per il failover delle applicazioni senza SAN e il bilanciamento del carico."
category: "architectures"
lang: "it"
topics: "Quali sono le diverse architetture di alta disponibilità e i cluster software con SafeKit?, Come creare cluster di alta disponibilità con SafeKit?, 🔍 Hub di navigazione SafeKit per la disponibilità elevata"
---

# Architetture SafeKit {#safekit-architectures}

## Quali sono le diverse architetture di alta disponibilità e i cluster software con SafeKit? {#what-are-the-different-high-availability-architectures-and-the-different-software-clusters-with-safekit}

### Cluster Mirror {#mirror-cluster}


![Cluster Mirror SafeKit](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


[Ulteriori informazioni](</architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### Cluster Farm {#farm-cluster}


![Cluster Farm SafeKit](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


[Ulteriori informazioni](</architectures/network-load-balancing-cluster/>)

### Cluster Farm+Mirror {#farmmirror-cluster}


![Cluster Farm+Mirror SafeKit](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


[Ulteriori informazioni](</architectures/clustering-software-load-balancing-mirroring/>)

### Cluster active/active {#activeactive-cluster}


![Cluster active/active SafeKit con replica in tempo reale](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


[Ulteriori informazioni](</architectures/active-active-cluster-real-time-replication/>)

### Cluster N-1 {#n-1-cluster}


![Cluster di ridondanza N-1 SafeKit](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


[Ulteriori informazioni](</architectures/n-1-redundancy/>)

## Come creare cluster di alta disponibilità con SafeKit? {#how-to-build-high-availability-clusters-with-safekit}

### Utilizzare moduli di alta disponibilità {#use-high-availability-modules}

Un modulo di alta disponibilità è una personalizzazione di SafeKit per un'applicazione. Esistono due tipi di moduli: il modulo Mirror, con replica dei dati in tempo reale e failover, e il modulo Farm, con bilanciamento del carico e failover.

Distribuendo un modulo Mirror su 2 server si crea un cluster Mirror; distribuendo un modulo Farm su N server si crea un cluster Farm.

È possibile distribuire più moduli applicativi sugli stessi server. In questo modo si possono realizzare architetture di clustering avanzate come quelle presentate in precedenza (Farm+Mirror, active/active, N-1).

### Che cos'è un modulo applicativo? {#what-is-an-application-module}

In pratica, un modulo applicativo è un file “.Safe” (di tipo zip) che include:

1 - il file di configurazione userconfig.xml, che contiene:

  * i nomi o gli indirizzi IP fisici dei server,
  * il nome o l'indirizzo IP virtuale del cluster,
  * le directory dei file da replicare in tempo reale (per un modulo Mirror),
  * i criteri di bilanciamento del carico di rete (per un modulo Farm),
  * la configurazione dei rilevatori di guasti software e hardware


2 - gli script per avviare e arrestare l'applicazione.

### Distribuzione plug and play dei moduli di alta disponibilità {#plug-and-play-deployment-of-high-availability-modules}

Una volta configurato e testato con un'applicazione, un modulo applicativo può essere distribuito senza competenze IT specifiche:

  1. installare l'applicazione su 2 server standard (fisici o virtuali),
  2. installare il software SafeKit su entrambi i server,
  3. installare il modulo applicativo su entrambi i server.



{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}