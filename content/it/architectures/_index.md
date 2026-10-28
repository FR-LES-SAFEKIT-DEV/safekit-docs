---
title: "Architetture SafeKit"
canonical: "https://safekit.eviden.com/it/architectures/"
description: "Esplora le architetture ad alta disponibilità con SafeKit . Scopri i cluster Mirror , Farm e Farm + Mirror per il failover e il bilanciamento del carico delle applicazioni senza SAN."
category: "architectures"
lang: "it"
topics: "Quali sono le diverse architetture ad alta disponibilità e i diversi cluster software con SafeKit ?, Come creare cluster ad alta disponibilità con SafeKit ?, 🔍 Hub di navigazione ad alta disponibilità SafeKit"
---

# Architetture SafeKit {#safekit-architectures}

## Quali sono le diverse architetture ad alta disponibilità e i diversi cluster software con SafeKit ? {#what-are-the-different-high-availability-architectures-and-the-different-software-clusters-with-safekit}

### Cluster Mirror {#mirror-cluster}


![ SafeKit mirror cluster ](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


[ Ulteriori informazioni ](</it/architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### Cluster `Farm` {#farm-cluster}


![ SafeKit farm cluster ](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


[ Ulteriori informazioni ](</it/architectures/network-load-balancing-cluster/>)

### Cluster `Farm` + mirror {#farmmirror-cluster}


![ farm SafeKit + cluster mirror ](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


[ Ulteriori informazioni ](</architectures/clustering-software-load-balancing-mirroring/>)

### Cluster attivo/attivo {#activeactive-cluster}


![ SafeKit cluster attivo attivo con replica in tempo reale ](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


[ Ulteriori informazioni ](</architectures/active-active-cluster-real-time-replication/>)

### N-1 cluster {#n-1-cluster}


![ SafeKit Cluster di ridondanza N-1 ](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


[ Ulteriori informazioni ](</architectures/n-1-redundancy/>)

## Come creare cluster ad alta disponibilità con SafeKit ? {#how-to-build-high-availability-clusters-with-safekit}

### Utilizzare i moduli ad alta disponibilità {#use-high-availability-modules}

Un modulo ad alta disponibilità è una personalizzazione di SafeKit per una specifica applicazione. Esistono due tipi di moduli: il modulo mirror con replica dei dati in tempo reale e failover e il modulo `farm` con bilanciamento del carico e failover.

Se si installa un modulo mirror su 2 server, si crea un cluster mirror ; se invece si installa un modulo `farm` su N server, si crea un cluster `farm` .

Sui server è possibile distribuire diversi moduli applicativi. In questo modo, è possibile implementare architetture di clustering avanzate come quelle presentate in precedenza ( `farm` + mirror , attivo/attivo, N-1).

### Che cos'è un modulo applicativo? {#what-is-an-application-module}

In pratica, un modulo applicativo è un file “.Safe” (tipo zip) che include:

1 - il file di configurazione userconfig.xml che contiene:

  * nomi o indirizzi IP fisici dei server,
  * nome o indirizzo IP virtuale del cluster,
  * directory di file da replicare in tempo reale (per un modulo mirror ),
  * criteri di bilanciamento del carico di rete (per un modulo `farm` ),
  * configurazione dei rilevatori di guasti software e hardware


2 - gli script per avviare e arrestare l'applicazione.

### Installazione plug and play dei moduli ad alta disponibilità {#plug-and-play-deployment-of-high-availability-modules}

Una volta configurato e testato un modulo applicativo con un'applicazione, la distribuzione non richiede competenze informatiche specifiche:

  1. installare l'applicazione su 2 server standard (fisici o virtuali),
  2. installare il software SafeKit su entrambi i server,
  3. installare il modulo applicativo su entrambi i server.



{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}