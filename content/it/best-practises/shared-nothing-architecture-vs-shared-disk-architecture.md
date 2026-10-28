---
title: "Architettura Shared Nothing vs. Shared Disk: scegliere il cluster HA migliore"
canonical: "https://safekit.eviden.com/it/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/"
description: "Confronta le architetture shared-nothing e shared disk per l'alta disponibilità. Scopri come SafeKit utilizza un approccio shared-nothing per eliminare i costi SAN, semplificare il failover e fornire la replica sincrona senza complesse limitazioni hardware."
category: "best-practises"
lang: "it"
topics: "Architettura Shared Nothing vs architettura Shared Disk per cluster ad alta disponibilità, Architettura Shared Nothing vs Architettura Shared Disk: Pro e Contro, 🔍 SafeKit Hub di navigazione ad alta disponibilità"
---

# Architettura Shared Nothing vs. Shared Disk: scegliere il miglior cluster HA {#shared-nothing-vs-shared-disk-architecture-choosing-the-best-ha-cluster}

## Architettura shared nothing vs architettura shared disk per cluster ad alta disponibilità {#shared-nothing-architecture-vs-shared-disk-architecture-for-high-availability-clusters}

### Panoramica {#overview}

Questo articolo analizza i pro e i contro dell'architettura "shared nothing" rispetto all'architettura "shared disk" per cluster ad alta disponibilità. Prendiamo in esame i vincoli hardware, l'impatto sull'organizzazione dei dati delle applicazioni, i tempi di ripristino e la semplicità di implementazione.


![ Architettura senza condivisione vs architettura con disco condiviso ](/wp-content/uploads/2023/02/file-replication-vs-shared-disk.png "w:200")


Le seguenti tabelle comparative illustrano in dettaglio la differenza tra l'architettura a dischi condivisi e SafeKit , un prodotto software di clustering che implementa un'architettura "shared nothing".

### Che cos'è un'architettura a disco condiviso? {#what-is-a-shared-disk-architecture}

Un'architettura a disco condiviso (come nel caso del cluster di failover [ Microsoft ](<https://learn.microsoft.com/en-us/windows-server/failover-clustering/clustering-requirements>) ) si basa su 2 server che condividono un disco con un failover automatico delle applicazioni in caso di guasti hardware o software.

Questa architettura presenta dei vincoli hardware: lo specifico storage condiviso esterno, le specifiche schede da installare all'interno dei server e gli switch specifici da utilizzare tra i server e lo storage condiviso.

Un'architettura a dischi condivisi ha un forte impatto sull'organizzazione dei dati delle applicazioni. Tutti i dati delle applicazioni devono essere localizzati sul disco condiviso per poter riavviare il sistema dopo un failover.

Inoltre, in caso di failover, la procedura di ripristino del file system deve essere eseguita sul disco condiviso. Ciò aumenta il tempo di ripristino (RTO).

Infine, la soluzione non è facile da configurare perché richiede competenze specifiche per la configurazione dell'hardware. Inoltre, sono necessarie competenze applicative per configurare i dati dell'applicazione sul disco condiviso.

### Che cos'è un'architettura shared nothing? {#what-is-a-shared-nothing-architecture-}

Un'architettura shared-nothing (come con [ SafeKit ](</>) ) si basa su 2 server che replicano i dati in tempo reale con un failover automatico dell'applicazione in caso di guasti hardware o software.

Esistono due tipi di replica dei dati: la replica di file a livello di byte [ e la replica di disco a livello di blocco ](</it/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>) ). In questa sede consideriamo la replica di file a livello di byte perché presenta numerosi vantaggi rispetto alla replica di disco a livello di blocco.

L'architettura shared nothing non ha vincoli hardware: i server possono essere fisici o virtuali con qualsiasi tipo di organizzazione dei dischi. La replica dei file in tempo reale (sincrona [ ](</it/best-practises/synchronous-replication-vs-asynchronous-replication/>) per avere 0 perdita di dati) avviene tramite la rete standard tra i server.

Questa architettura non ha alcun impatto sull'organizzazione dei dati dell'applicazione. Ad esempio, se un'applicazione ha i suoi dati sul disco di sistema, la replica dei file in tempo reale funziona correttamente.

Il tempo di ripristino (RTO) in caso di failover si riduce al tempo di riavvio dell'applicazione sui file replicati del server secondario.

Infine, la soluzione è molto semplice da configurare, in quanto è sufficiente impostare i percorsi delle directory da replicare.

## Architettura Shared Nothing vs Architettura Shared Disk: Pro e Contro {#shared-nothing-architecture-vs-shared-disk-architecture-pros-and-cons}


{{%  insert-safekit-shared-nothing-vs-shared-disk-table-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}