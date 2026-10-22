---
title: "Architetture di alta disponibilità e best practice per il clustering software"
canonical: "https://safekit.eviden.com/it/best-practises/high-availability-architectures-and-best-practices/"
description: "Scopri le architetture di alta disponibilità (HA) e le best practice per il clustering delle applicazioni. SafeKit implementa cluster Mirror e Farm senza dischi condivisi, evitando la perdita di dati e fornendo failover automatico per le applicazioni critiche."
category: "best-practises"
lang: "it"
topics: "Quali sono le architetture di alta disponibilità e le best practice, Tabelle comparative sulle architetture di alta disponibilità e le best practice, Hub di navigazione dell'alta disponibilità SafeKit"
---

# Architetture di alta disponibilità e best practice per il clustering software {#high-availability-architectures--software-clustering-best-practices}

## Quali sono le architetture di alta disponibilità e le best practice? {#what-are-the-high-availability-architectures-and-the-best-practices}

### Panoramica {#overview}

Questo articolo presenta le diverse architetture di alta disponibilità e le relative best practice, confrontando vantaggi e svantaggi di ciascuna.

![Architetture di alta disponibilità e best practice](/wp-content/uploads/2023/03/high-availability-architectures-and-best-practices.png "w:400")

Le tabelle comparative seguenti illustrano nel dettaglio l'architettura di alta disponibilità SafeKit e le relative best practice. SafeKit è un prodotto software per l'alta disponibilità.

### Quali sono le architetture di alta disponibilità? {#what-are-the-high-availability-architectures}

Esistono due tipi di [architetture di alta disponibilità](<https://www.techtarget.com/it-infrastructure/definition/What-is-high-availability-HA-Definition-and-guide>): quelle per applicazioni backend, come i database, e quelle per applicazioni frontend, come i servizi web.

Le architetture backend si basano su due server che condividono o replicano i dati e attivano il failover automatico dell'applicazione in caso di guasti hardware o software.

Le architetture frontend si basano su una farm di almeno due server. Il bilanciamento del carico, hardware o software, distribuisce le sessioni TCP tra i server disponibili.

È inoltre necessario scegliere tra alta disponibilità a livello applicativo e a livello di macchina virtuale.

### Quali sono le best practice? {#what-are-the-best-practices}

L'articolo esamina le best practice per le architetture di alta disponibilità confrontando:

  * [clustering software e hardware](</it/best-practises/clustering-software-vs-hardware-clustering/>),
  * [architettura shared-nothing e shared-disk](</it/best-practises/shared-nothing-architecture-vs-shared-disk-architecture/>),
  * [alta disponibilità applicativa e della macchina virtuale](</it/best-practises/vm-ha-vs-application-ha/>),
  * [alta disponibilità e tolleranza ai guasti](</it/best-practises/high-availability-cluster-vs-fault-tolerant-system/>),
  * [replica sincrona e asincrona](</it/best-practises/synchronous-replication-vs-asynchronous-replication/>),
  * [replica di file e di dischi](</it/best-practises/byte-level-file-replication-vs-block-level-disk-replication/>),
  * [tecniche di replica dei dati](</it/best-practises/data-replication-techniques/>),
  * [RPO e RTO con esempi](</it/best-practises/what-is-rpo-and-rto-with-examples/>),
  * [split brain e quorum](</it/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>),
  * [indirizzi IP virtuali](</it/best-practises/how-a-virtual-ip-address-works/>).

## Tabelle comparative sulle architetture di alta disponibilità e le best practice {#comparative-tables-on-high-availability-architectures-and-best-practices}

{{% insert-safekit-software-vs-hardware-table-it %}}

{{% insert-safekit-hub-it %}}

{{% insert-safekit-4-buttons-it %}}