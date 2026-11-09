---
title: "Alta disponibilità Microsoft SQL Server con SafeKit: installare il modulo sqlserver.safe per il failover"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/"
description: "Implementare il modulo sqlserver.safe per SafeKit per abilitare la replica sincrona in tempo reale e il failover automatico per Microsoft SQL Server. Questa guida illustra come configurare un cluster SANless a 2 nodi per applicazioni critiche senza storage condiviso."
category: "quick-install"
lang: "it"
topics: "Guida rapida all’installazione ad alta disponibilità per Microsoft SQL Server, Limitazioni SafeKit High Availability, Panoramica della soluzione SafeKit/Microsoft SQL Server, Installazione della soluzione SafeKit/Microsoft SQL Server su Windows (sqlserver.safe), Configurazione passo-passo della soluzione SafeKit/Microsoft SQL Server, Dimostrazione della soluzione mirror SafeKit, 🔍 Esplora SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
---

# Alta disponibilità Microsoft SQL Server con SafeKit: installare il modulo sqlserver.safe per il failover {#microsoft-sql-server-high-availability-with-safekit-install-the-sqlserversafe-module-for-failover}


{{%  insert-safekit-mirror-guide-it app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Panoramica della soluzione SafeKit/Microsoft SQL Server {#overview-of-the-safekit--microsoft-sql-server-solution}

Per una panoramica dettagliata della soluzione, consultare **💡 [La soluzione più semplice per l’alta disponibilità Microsoft SQL Server: replica sincrona e failover a 2 nodi](</it/solutions/sql-server-high-availability-synchronous-replication-failover/>)**.

## Installazione della soluzione SafeKit/Microsoft SQL Server su Windows (sqlserver.safe) {#installation-of-the-safekit--microsoft-sql-server-solution-on-windows-sqlserversafe}

### Prerequisiti {#prerequisites}

  * È necessario che Microsoft SQL Server sia installato su 2 nodi (macchine virtuali o server fisici).
  * SafeKit funziona con tutte le versioni di SQL, incluso SQL Express.


  * I [database di sistema SQL](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (come master.mdf e mastlog.ldf) devono trovarsi nelle stesse directory su entrambi i nodi. Le directory verranno configurate come replicate al passaggio 4 nella configurazione dettagliata.
  * SQL deve essere installato anche nella stessa posizione nel file system su entrambi i nodi, perché il [database delle risorse SQL](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) di sola lettura si trova nel binario ed è necessario per il failover. Questo database non deve essere replicato.
  * I database utente SQL (.mdf e .ldf) devono trovarsi nelle stesse directory su entrambi i nodi. Le directory saranno configurate come replicate al passaggio 4 della configurazione dettagliata.



{{%  insert-safekit-installation-package-windows-it app="Microsoft SQL Server" mod="sqlserver"  %}}

{{%  insert-safekit-82-installation-module-windows-it app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Configurazione passo-passo della soluzione SafeKit/Microsoft SQL Server {#step-by-step-configuration-of-the-safekit--microsoft-sql-server-solution}


{{%  insert-safekit-82-configuration-it app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Dimostrazione della soluzione mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}