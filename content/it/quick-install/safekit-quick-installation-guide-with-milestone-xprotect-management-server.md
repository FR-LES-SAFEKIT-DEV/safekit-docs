---
title: "Alta disponibilità di Milestone XProtect con SafeKit: installare il modulo milestone.safe per il failover"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server/"
description: "Distribuisci il modulo milestone.safe di SafeKit per abilitare la replica sincrona in tempo reale e il failover automatico di Milestone XProtect su Windows. Questa guida illustra la configurazione di un cluster SANless a 2 nodi per applicazioni critiche senza storage condiviso."
category: "quick-install"
lang: "it"
topics: "Guida rapida all'installazione ad alta disponibilità per Milestone XProtect, Limiti dell'alta disponibilità SafeKit, Panoramica della soluzione SafeKit / Milestone XProtect, Installazione della soluzione SafeKit / Milestone XProtect su Windows (milestone.safe), Configurazione passo passo della soluzione SafeKit / Milestone XProtect, Dimostrazione della soluzione mirror SafeKit, 🔍 Hub di navigazione per l'alta disponibilità SafeKit"
---

# Alta disponibilità di Milestone XProtect con SafeKit: installare il modulo milestone.safe per il failover {#milestone-xprotect-high-availability-with-safekit-install-the-milestonesafe-module-for-failover}


{{%  insert-safekit-mirror-guide-it app="Milestone XProtect" mod="milestone"  %}}


## Panoramica della soluzione SafeKit / Milestone XProtect {#overview-of-the-safekit--milestone-xprotect-solution}

La soluzione è descritta qui: **💡[L'alta disponibilità più semplice per Milestone XProtect: replica sincrona e failover a 2 nodi](</it/solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/>)**.

## Installazione della soluzione SafeKit / Milestone XProtect su Windows (milestone.safe) {#installation-of-the-safekit--milestone-xprotect-solution-on-windows-milestonesafe}

### Prerequisiti {#prerequisites}

  * Milestone XProtect Management e SQL devono essere installati su 2 nodi (macchine virtuali o server fisici). SQL Server ed Event Server possono essere esterni; vedere le note seguenti.


ℹ️ Nota: SQL Server può essere esterno. In tal caso, al passaggio 4 della configurazione passo passo di milestone.safe:

  * rimuovi la replica delle cartelle SQL Data e Log,
  * rimuovi il controllo del processo sqlservr.exe,
  * rimuovi MSSQLServer dalla macro SERVICES.


Puoi implementare la ridondanza del SQL Server esterno con **💡[SafeKit e il modulo sqlserver.safe](</it/solutions/sql-server-high-availability-synchronous-replication-failover/>)**.

In tal caso, su entrambi i nodi Management, configura la [connessione di Milestone Management a SQL](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>) con l'indirizzo IP virtuale del modulo sqlserver.safe (chiave del Registro di sistema HKEY_LOCAL_MACHINE > SOFTWARE > VideoOSServerConnectionString).

ℹ️ Nota: Event Server può essere esterno a Management Server.

In questo caso sono presenti 2 cluster con 2 installazioni di milestone.safe: una per il cluster Management e l'altra per il cluster Event.

Per il cluster Management, al passaggio 4 della configurazione passo passo di milestone.safe:

  * rimuovi MilestoneEventServerService dalla macro SERVICES.


Per il cluster Event, al passaggio 4 della configurazione passo passo di milestone.safe:

  * rimuovi dalla macro SERVICES: MSSQLServer, Milestone XProtect Management Server e Milestone XProtect Log Server,
  * rimuovi la replica delle cartelle SQL Data e Log,
  * rimuovi il controllo del processo sqlservr.exe,
  * durante la configurazione passo passo, [registra](</wp-content/uploads/2022/07/milestone-management-server-register-2020.png>) Event Server con l'indirizzo IP virtuale del **cluster Management** (oppure installa Event Server da Download Manager e imposta l'indirizzo IP virtuale del **cluster Management** durante l'installazione),
  * in Milestone management client, imposta Event Server con l'indirizzo IP virtuale del **cluster Event** in [Registered Services](</wp-content/uploads/2022/07/milestone-url-vip.png>).


### ℹ️ Ridondanza dei recorder {#ℹ-recorder-redundancy}

  * La replica dei recorder non è adatta a SafeKit a causa del volume di dati.
  * È possibile utilizzare la soluzione integrata in Milestone (server di registrazione di failover senza replica in tempo reale).
  * Due recorder possono anche essere eseguiti in configurazione attiva/attiva, distribuendo le telecamere per evitare di perdere tutte quelle della stessa area in caso di guasto.
  * Il flusso di ciascuna telecamera può anche essere inviato a due recorder con la soluzione [Vega / RMF](<https://vega25.com/>).


ℹ️ In caso di migrazione di Milestone dalla versione N alla versione N+1 in un cluster SafeKit, leggi questo articolo: 🛠️ [Migrazione di Milestone Management con SafeKit](</it/quick-install/safekit-quick-installation-guide-milestone-migration/>)


{{%  insert-safekit-installation-package-windows-it app="Milestone XProtect and SQL" mod="milestone"  %}}

{{%  insert-safekit-82-installation-module-windows-it app="Milestone XProtect and SQL" mod="milestone"  %}}


## Configurazione passo passo della soluzione SafeKit / Milestone XProtect {#step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


{{%  insert-safekit-82-milestone-configuration-it app="Milestone XProtect and SQL" mod="milestone"  %}}


## Dimostrazione della soluzione mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}
