---
title: "Milestone XProtect High Availability con SafeKit: installare il modulo milestone.safe per il failover"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-with-milestone-xprotect-management-server/"
description: "Implementare il modulo milestone.safe per SafeKit per abilitare la replica sincrona in tempo reale e il failover automatico di Milestone XProtect su Windows. Questa guida illustra come configurare un cluster SANless a 2 nodi per applicazioni critiche senza storage condiviso."
category: "quick-install"
lang: "it"
topics: "Guida rapida all’installazione ad alta disponibilità per Milestone XProtect, Limitazioni SafeKit High Availability, Panoramica della soluzione SafeKit/Milestone XProtect, Installazione della soluzione SafeKit/Milestone XProtect su Windows (milestone.safe), Configurazione passo-passo della soluzione SafeKit/Milestone XProtect, Dimostrazione della soluzione mirror SafeKit, 🔍 Esplora SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
---

# Milestone XProtect High Availability con SafeKit: installare il modulo milestone.safe per il failover {#milestone-xprotect-high-availability-with-safekit-install-the-milestonesafe-module-for-failover}


{{%  insert-safekit-mirror-guide-it app="Milestone XProtect" mod="milestone"  %}}
 

## Panoramica della soluzione SafeKit/Milestone XProtect {#overview-of-the-safekit--milestone-xprotect-solution}

La soluzione è descritta qui: **💡 [La Milestone XProtect High Availability: replica sincrona a 2 nodi e failover](</it/solutions/milestone-xprotect-corporate-high-availability-synchronous-replication-failover/>)**.

## Installazione della soluzione SafeKit/Milestone XProtect su Windows (milestone.safe) {#installation-of-the-safekit--milestone-xprotect-solution-on-windows-milestonesafe}

### Prerequisiti {#prerequisites}

  * È necessario Milestone XProtect Management e SQL siano installati su 2 nodi (macchine virtuali o server fisici). SQL Server ed Event Server possono essere esterni, vedere le note di seguito.


ℹ️ Nota: SQL Server può essere esterno. In questo caso, al passaggio 4 durante la configurazione passo-passo di milestone.safe:

  * rimuovere la replica delle cartelle dei dati e dei log di SQL,
  * rimuovere il controllore di processo su sqlservr.exe,
  * Rimuovere MSSQLServer dalla macro SERVICES.


È possibile implementare la ridondanza di SQL Server esterno con 💡 [SafeKit e il modulo sqlserver.safe](</it/solutions/sql-server-high-availability-synchronous-replication-failover/>).

In questo caso, su entrambi i nodi di gestione, configurare la [connessione di Milestone Management a SQL](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>) con l’indirizzo IP virtuale del modulo sqlserver.safe (chiave di registro HKEY_LOCAL_MACHINE > SOFTWARE > VideoOSServerConnectionString).

ℹ️ Nota: il server eventi può essere esterno al server di gestione.

In questo caso, sono presenti 2 cluster con 2 installazioni di milestone.safe: uno per il cluster di gestione, l’altro per il cluster di eventi.

Per il cluster di gestione, al passaggio 4 durante la configurazione passo-passo di milestone.safe:

  * Rimuovere MilestoneEventServerService dalla macro SERVICES.


E per il cluster Event, al passaggio 4 durante la configurazione passo-passo di milestone.safe:

  * rimuovere dalla macro SERVIZI: MSSQLServer, Milestone XProtect Management Server, Milestone XProtect Log Server,
  * rimuovere la replica delle cartelle dei dati e dei log di SQL,
  * rimuovere il controllore di processo su sqlservr.exe,
  * durante la configurazione passo-passo, [registrare](</wp-content/uploads/2022/07/milestone-management-server-register-2020.png>) il server Eventi con l’indirizzo IP virtuale del **cluster di gestione** (o installare il server Eventi dal Download Manager e impostare l’indirizzo IP virtuale del **cluster di gestione** durante l’installazione),
  * Nel client di gestione Milestone, impostare il server eventi con l’indirizzo IP virtuale del **cluster di eventi** in [Servizi registrati](</wp-content/uploads/2022/07/milestone-url-vip.png>).


### ℹ️ Ridondanza del registratore {#ℹ-recorder-redundancy}

  * La replica dei registratori non è adatta per SafeKit a causa del volume di dati.
  * La soluzione integrata in Milestone può essere utilizzata (server di registrazione failover senza replica in tempo reale).
  * Due registratori possono anche funzionare in una configurazione attiva/attiva e le telecamere sono distribuite in modo da non perdere tutte le telecamere nella stessa area in caso di guasto.
  * Con la soluzione [Vega/RMF,](<https://vega25.com/>) il flusso di ciascuna telecamera può essere inviato anche a due registratori.


ℹ️ In caso di migrazione di Milestone dalla versione N alla versione N+1 in un cluster SafeKit, leggere questo articolo: 🛠️ [Migrazione della gestione Milestone con SafeKit](</it/quick-install/safekit-quick-installation-guide-milestone-migration/>)


{{%  insert-safekit-installation-package-windows-it app="Milestone XProtect and SQL" mod="milestone"  %}}

{{%  insert-safekit-82-installation-module-windows-it app="Milestone XProtect and SQL" mod="milestone"  %}}
 

## Configurazione passo-passo della soluzione SafeKit/Milestone XProtect {#step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


{{%  insert-safekit-82-milestone-configuration-it app="Milestone XProtect and SQL" mod="milestone"  %}}
 

## Dimostrazione della soluzione mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}