---
title: "Architettura shared-nothing vs. architettura a disco condiviso: come scegliere il miglior cluster HA"
canonical: "https://safekit.eviden.com/it/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/"
description: "Architettura shared-nothing o a disco condiviso per l’alta disponibilità: come SafeKit replica i dati tra server per evitare i costi SAN e semplificare il failover."
category: "best-practises"
lang: "it"
topics: "Architettura shared-nothing vs. architettura a disco condiviso per cluster ad alta disponibilità, Architettura shared-nothing vs. architettura a disco condiviso: pro e contro"
hashpart: "shared-nothing-architecture-vs-shared-disk-architecture-for-high-availability-clusters, shared-nothing-architecture-vs-shared-disk-architecture-pros-and-cons"
translation: "translate_md 2026-11-20.7 | glossaire 2026-11-20.14 | Translation LLM | 41 expressions"
image: "/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png"
schemaType: "TechArticle"
---

# Architettura shared-nothing vs. architettura a disco condiviso: come scegliere il miglior cluster HA {#shared-nothing-vs-shared-disk-architecture-choosing-the-best-ha-cluster}

## Architettura shared-nothing vs. architettura a disco condiviso per cluster ad alta disponibilità {#shared-nothing-architecture-vs-shared-disk-architecture-for-high-availability-clusters}

### Panoramica {#overview}

Questo articolo confronta due architetture per cluster ad alta disponibilità: l’architettura shared-nothing e l’architettura a disco condiviso. Spiega i loro pro e contro e tratta i vincoli hardware, l’impatto sull’organizzazione dei dati dell’applicazione, il tempo di ripristino e la semplicità di implementazione.


![architettura shared-nothing vs. architettura a disco condiviso](/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png "w:200")


Le tabelle di confronto riportate di seguito illustrano in dettaglio le differenze tra l’architettura a disco condiviso e SafeKit. Questo prodotto di clustering software implementa un’architettura shared-nothing.

### Che cos’è un’architettura a disco condiviso? {#what-is-a-shared-disk-architecture}

Un’architettura a disco condiviso si basa su due server che condividono un disco. In caso di errore hardware o software, l’applicazione si riavvia automaticamente sull’altro server. Il clustering di failover Microsoft è un esempio di architettura a disco condiviso. Per i dettagli, vedere [Requisiti hardware per il clustering di failover](<https://learn.microsoft.com/en-us/windows-server/failover-clustering/clustering-requirements>).

Questa architettura presenta vincoli hardware: storage condiviso esterno specifico, schede specifiche all’interno dei server e switch specifici tra i server e lo storage condiviso.

Un’architettura a disco condiviso ha un forte impatto sull’organizzazione dei dati dell’applicazione. Tutti i dati dell’applicazione devono essere localizzati sul disco condiviso, in modo che l’applicazione possa essere riavviata dopo un failover.

Inoltre, in caso di failover, una procedura di ripristino del file system deve essere eseguita sul disco condiviso. Ciò aumenta l’obiettivo di tempo di ripristino (RTO).

Infine, la soluzione non è facile da configurare. Sono necessarie competenze hardware per configurare l’hardware specifico. Sono inoltre necessarie competenze applicative per posizionare i dati dell’applicazione sul disco condiviso.

### Che cos’è un’architettura shared-nothing? {#what-is-a-shared-nothing-architecture-}

Un’architettura shared-nothing si basa su due server che replicano i dati in tempo reale. In caso di guasto hardware o software, l’applicazione si riavvia automaticamente sull’altro server. SafeKit è un esempio di architettura shared-nothing.

Esistono due tipi di replica dei dati: replica di file a livello di byte e replica di dischi a livello di blocco. Per maggiori dettagli, vedere [Replica di file a livello di byte vs. replica di dischi a livello di blocco](</it/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>). Questo articolo considera la replica di file a livello di byte, perché presenta molti vantaggi rispetto alla replica di dischi a livello di blocco.

L’architettura shared-nothing non presenta vincoli hardware. I server possono essere fisici o virtuali, con qualsiasi tipo di organizzazione del disco. La replica dei file in tempo reale avviene sulla rete standard tra i server. [La replica sincrona](</it/best-practises/synchronous-replication-vs-asynchronous-replication/>) garantisce l’assenza di perdita di dati.

Questa architettura non ha alcun impatto sull’organizzazione dei dati dell’applicazione. Ad esempio, la replica dei file in tempo reale funziona anche se i dati dell’applicazione si trovano sul disco di sistema.

In caso di failover, l’obiettivo del tempo di ripristino (RTO) è ridotto al tempo di riavvio dell’applicazione. L’applicazione si riavvia sui file replicati del server secondario.

Infine, la soluzione è molto semplice da configurare. È sufficiente configurare i percorsi delle directory da replicare.

## Architettura shared-nothing vs. architettura a disco condiviso: pro e contro {#shared-nothing-architecture-vs-shared-disk-architecture-pros-and-cons}


{{%  insert-safekit-shared-nothing-vs-shared-disk-table-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}