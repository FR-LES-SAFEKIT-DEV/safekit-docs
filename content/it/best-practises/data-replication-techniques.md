---
title: "Tecniche di replica dei dati per l'alta disponibilità: confronto completo"
canonical: "https://safekit.eviden.com/it/best-practises/data-replication-techniques/"
description: "Confronta le tecniche di replica dei dati a livello di database, disco e file. Scopri perché SafeKit propone un'architettura senza SAN per una replica sincrona semplice e in tempo reale, che evita la perdita di dati e consente il failover automatico su Windows e Linux."
category: "best-practises"
lang: "it"
topics: "Tecniche di replica dei dati a livello di database, disco o file, Tabelle comparative delle tecniche di replica dei dati, Hub di navigazione dell'alta disponibilità SafeKit"
---

# Tecniche di replica dei dati per l'alta disponibilità: confronto completo {#data-replication-techniques-for-high-availability-a-complete-comparison}

## Tecniche di replica dei dati a livello di database, disco o file? {#data-replication-techniques-at-database-level-disk-level-or-file-level}

### Panoramica {#overview}

Questo articolo analizza vantaggi e svantaggi delle tecniche di replica dei dati a livello di database, disco e file per i cluster ad alta disponibilità. Considera failover, failback e semplicità di implementazione.

![Tecniche di replica dei dati](/wp-content/uploads/2023/03/data-replication-techniques.png "w:128")

Le tabelle comparative seguenti illustrano nel dettaglio le tecniche di replica dei dati implementate da SafeKit, un software per l'alta disponibilità.

### Che cos'è la replica dei dati a livello di database? {#what-is-the-data-replication-technique-at-database-level}

È la replica dei file di log tra due server eseguita dal sistema di gestione del database, come il [log delle transazioni di SQL Server](<https://learn.microsoft.com/en-us/sql/relational-databases/logs/the-transaction-log-sql-server>).

Per il failover automatico è obbligatoria la replica sincrona; in caso contrario, le ultime transazioni convalidate non saranno recuperate sul server secondario dopo il failover.

Questa tecnica replica il database, ma non gli altri dati dell'applicazione. Il failover di molte applicazioni richiede anche la replica di dati aggiuntivi, ad esempio i file di configurazione.

Se un server si arresta in modo anomalo e perde alcuni file del database, il failback non è automatico. Un DBA esperto deve ripristinare il database sul server guasto.

### Che cos'è la replica dei dati a livello di disco? {#what-is-the-data-replication-technique-at-disk-level}

È la replica delle modifiche sui dischi tra due server, come [DRBD](<https://linbit.com/drbd/>).

Per il failover automatico senza perdita di dati è necessaria la replica sincrona tra i dischi.

Questa tecnica può replicare database e altri file, ma influisce notevolmente sull'organizzazione dei dati applicativi: tutti i dati devono trovarsi sul disco replicato. Ciò può essere impossibile se alcuni dati da replicare si trovano sul disco di sistema, che deve restare specifico per ciascun server.

Sono necessarie competenze specifiche per configurare il disco replicato con un file system e collocarvi i dati applicativi.

### Che cos'è la replica dei dati a livello di file? {#what-is-the-data-replication-technique-at-file-level}

È la replica delle modifiche ai file tra due server, come [SafeKit](/it/).

Per il failover automatico senza perdita di dati è necessaria la [replica sincrona in tempo reale](/it/best-practises/synchronous-replication-vs-asynchronous-replication/).

Questa tecnica può replicare database e altri file senza modificare l'organizzazione dei dati dell'applicazione. Ad esempio, la replica di file in tempo reale funziona anche quando i dati di un'applicazione si trovano sul disco di sistema.

La configurazione è molto semplice: basta specificare i percorsi delle directory da replicare.

## Tabelle comparative delle tecniche di replica dei dati {#comparative-tables-between-data-replication-techniques}

{{% insert-safekit-mirror-comparison-table-it %}}

{{% insert-safekit-hub-it %}}

{{% insert-safekit-4-buttons-it %}}