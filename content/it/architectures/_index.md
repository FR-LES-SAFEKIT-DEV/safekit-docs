---
title: "Architetture SafeKit"
canonical: "https://safekit.eviden.com/it/architectures/"
description: "Esplora le architetture ad alta disponibilità con SafeKit. Scopri i cluster Mirror, Farm e Farm + cluster mirror per il failover e il bilanciamento del carico delle applicazioni SANless."
category: "architectures"
lang: "it"
topics: "Quali sono le diverse architetture ad alta disponibilità e i diversi cluster software con SafeKit?, Come creare cluster ad alta disponibilità con SafeKit?, 🔍 Hub di navigazione per l’alta disponibilità di SafeKit"
translation: "translate_md 2026-11-06.18 | glossaire 2026-11-06.13 | Translation LLM | 13 expressions"
---

# Architetture SafeKit {#safekit-architectures}

## Quali sono le diverse architetture ad alta disponibilità e i diversi cluster software con SafeKit? {#what-are-the-different-high-availability-architectures-and-the-different-software-clusters-with-safekit}

### Cluster mirror {#mirror-cluster}


![cluster mirror SafeKit](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


[Maggiori informazioni](</it/architectures/file-replication-byte-level-with-failover-mirror-cluster/>)

### Cluster <span class="notranslate farm-term" translate="no">farm</span> {#farm-cluster}


![cluster farm SafeKit](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


[Maggiori informazioni](</it/architectures/network-load-balancing-cluster/>)

### <span class="notranslate farm-term" translate="no">Farm</span> + cluster mirror {#farmmirror-cluster}


![Cluster SafeKit farm + cluster mirror](/wp-content/uploads/2023/02/safekit-farm-mirror-300-4.png "w:300")


[Maggiori informazioni](</it/architectures/clustering-software-load-balancing-mirroring/>)

### Cluster attivo/attivo {#activeactive-cluster}


![Cluster attivo-attivo SafeKit con replica in tempo reale](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


[Maggiori informazioni](</it/architectures/active-active-cluster-real-time-replication/>)

### Cluster N-1 {#n-1-cluster}


![Cluster di ridondanza SafeKit N-1](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


[Maggiori informazioni](</it/architectures/n-1-redundancy/>)

## Come creare cluster ad alta disponibilità con SafeKit? {#how-to-build-high-availability-clusters-with-safekit}

### Utilizzare i moduli dell’applicazione {#use-high-availability-modules}

Un modulo applicativo è una personalizzazione di SafeKit per un’applicazione. Esistono due tipi di moduli: il modulo mirror con replica dei dati in tempo reale e failover e il modulo <span class="notranslate farm-term" translate="no">farm</span> con bilanciamento del carico e failover.

Se si implementa un modulo mirror su 2 server, si crea un cluster mirror e se si implementa un modulo <span class="notranslate farm-term" translate="no">farm</span> su N server, si crea un cluster <span class="notranslate farm-term" translate="no">farm</span>.

Diversi moduli applicativi possono essere distribuiti sugli stessi server. Pertanto, è possibile implementare architetture di clustering avanzate come quelle presentate in precedenza (<span class="notranslate farm-term" translate="no">farm</span> + mirror, active/active, N-1).

### Che cos’è un modulo applicativo? {#what-is-an-application-module}

In pratica, un modulo applicativo è un file ".Safe" (di tipo zip) che include:

1 - il file di configurazione userconfig.xml, che contiene:

  * indirizzo IP virtuale del cluster,
  * directory di file da replicare in tempo reale (per un modulo mirror),
  * criteri di bilanciamento del carico di rete (per un modulo <span class="notranslate farm-term" translate="no">farm</span>),
  * Configurazione dei rilevatori di guasti software e hardware


2 - gli script per avviare e arrestare l’applicazione.

### Implementazione plug-and-play dei moduli applicativi {#plug-and-play-deployment-of-high-availability-modules}

Una volta configurato e testato un modulo applicativo con un’applicazione, la sua implementazione non richiede competenze informatiche specifiche:

  1. installare l’applicazione su 2 server standard (fisici o virtuali),
  2. installare il software SafeKit su entrambi i server,
  3. Installare il modulo dell’applicazione su entrambi i server.



{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}