---
title: "Microsoft SQL Server Alta disponibilità con SafeKit : installare il modulo sqlserver.safe per il failover"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-with-microsoft-sql-server/"
description: "Distribuisci il modulo sqlserver.safe per SafeKit per abilitare la replica sincrona in tempo reale e il failover automatico per Microsoft SQL Server . Questa guida illustra la configurazione di un cluster SANless a 2 nodi per applicazioni critiche senza storage condiviso."
category: "quick-install"
lang: "it"
topics: "Guida rapida all'installazione dell'alta disponibilità per Microsoft SQL Server , SafeKit Limitazioni dell'alta disponibilità, Panoramica della soluzione SafeKit / Microsoft SQL Server , Installazione della soluzione SafeKit / Microsoft SQL Server su Windows ( sqlserver.safe ), Configurazione passo passo della soluzione SafeKit / Microsoft SQL Server Dimostrazione della soluzione SafeKit mirror , 🔍 Hub di navigazione ad alta disponibilità SafeKit"
---

# Microsoft SQL Server Alta disponibilità con SafeKit : installare il modulo sqlserver.safe per il failover {#microsoft-sql-server-high-availability-with-safekit-install-the-sqlserversafe-module-for-failover}


{{%  insert-safekit-mirror-guide-it app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Panoramica della soluzione SafeKit / Microsoft SQL Server {#overview-of-the-safekit--microsoft-sql-server-solution}

Per una panoramica dettagliata della soluzione, vedere ** 💡 [ La soluzione più semplice Microsoft SQL Server Alta disponibilità: replica sincrona a 2 nodi e failover ](</it/solutions/sql-server-high-availability-synchronous-replication-failover/>) ** .

## Installazione della soluzione SafeKit / Microsoft SQL Server su Windows ( sqlserver.safe ) {#installation-of-the-safekit--microsoft-sql-server-solution-on-windows-sqlserversafe}

### Prerequisiti {#prerequisites}

  * È necessario che Microsoft SQL Server siano installati su 2 nodi (macchine virtuali o server fisici).
  * SafeKit funziona con tutte le versioni di SQL, incluso SQL Express.


  * I database di sistema SQL [ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (come master.mdf e mastlog.ldf) devono trovarsi nelle stesse directory su entrambi i nodi. Le directory verranno configurate come replicate al passaggio 4 della procedura di configurazione passo passo.
  * SQL deve essere installato nella stessa posizione del file system su entrambi i nodi, poiché il database di risorse SQL di sola lettura [ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) si trova nel file binario ed è necessario per il failover. Questo database non necessita di essere replicato.
  * I database utente SQL (.mdf e .ldf) devono trovarsi nelle stesse directory su entrambi i nodi. Le directory verranno configurate come replicate al passaggio 4 della procedura di configurazione passo passo.



{{%  insert-safekit-installation-package-windows-it app="Microsoft SQL Server" mod="sqlserver"  %}}

{{%  insert-safekit-82-installation-module-windows-it app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Configurazione passo passo della soluzione SafeKit / Microsoft SQL Server {#step-by-step-configuration-of-the-safekit--microsoft-sql-server-solution}


{{%  insert-safekit-82-configuration-it app="Microsoft SQL Server" mod="sqlserver"  %}}
 

## Dimostrazione della soluzione SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}