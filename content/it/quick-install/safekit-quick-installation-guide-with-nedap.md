---
title: "Alta disponibilità Nedap con SafeKit : installare il modulo nedap.safe per il failover"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-with-nedap/"
description: "Distribuisci il modulo nedap.safe per SafeKit per abilitare la replica sincrona in tempo reale e il failover automatico di Nedap su Windows . Questa guida illustra la configurazione di un cluster SANless a 2 nodi per applicazioni critiche senza storage condiviso."
category: "quick-install"
lang: "it"
topics: "Guida rapida all'installazione dell'alta disponibilità per Nedap , Limitazioni dell'alta disponibilità SafeKit , Panoramica della soluzione SafeKit / Nedap , Installazione della soluzione SafeKit / Nedap su Windows ( nedap.safe ), Configurazione passo passo della soluzione SafeKit / Nedap , Dimostrazione della soluzione SafeKit mirror , 🔍 Hub di navigazione ad alta disponibilità SafeKit"
---

# Alta disponibilità Nedap con SafeKit : installare il modulo nedap.safe per il failover {#nedap-high-availability-with-safekit-install-the-nedapsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-it app="Nedap" mod="nedap"  %}}
 

** 📘 [ Configurazione di Nedap AOES con SafeKit (PDF) ](</wp-content/uploads/documents/NEDAP_AEOS_CLUSTER_SAFEKIT.pdf>) ** : tutti i dettagli sono in questo documento.

## Panoramica della soluzione SafeKit / Nedap {#overview-of-the-safekit--nedap-solution}

La soluzione è descritta qui: ** 💡 [ La più semplice Nedap Alta disponibilità: replica sincrona a 2 nodi e failover ](</it/solutions/nedap-high-availability-synchronous-replication-failover/>) ** .

## Installazione della soluzione SafeKit / Nedap su Windows ( nedap.safe ) {#installation-of-the-safekit--nedap-solution-on-windows-nedapsafe}

### Prerequisiti {#prerequisites}

  * È necessario Nedap AEOS e SQL siano installati su 2 nodi (macchine virtuali o server fisici).
  * Con SQL Server sullo stesso nodo di Nedap AEOS, configurare la connessione di Nedap AEOS a SQL con l'indirizzo IP virtuale e non con l'indirizzo IP fisico del server. In caso contrario, il failover non funzionerà. SQL Server può essere esterno, vedere la nota seguente.


ℹ️ Nota: SQL Server può essere esterno. In tal caso, al passaggio 4 durante la configurazione passo passo:

  * rimuovere la replica delle cartelle Dati e Log di SQL,
  * rimuovere il controllo del processo su sqlservr.exe ,
  * rimuovere MSSQLServer dalla macro SERVIZI.


È possibile implementare la ridondanza del modulo esterno SQL Server con 💡 [ SafeKit e il modulo sqlserver.safe ](</it/solutions/sql-server-high-availability-synchronous-replication-failover/>) . In questo caso, configurare la connessione di Nedap AEOS a SQL con l'indirizzo IP virtuale del modulo sqlserver.safe .


{{%  insert-safekit-installation-package-windows-it app="Nedap AEOS and SQL" mod="nedap"  %}}

{{%  insert-safekit-82-installation-module-windows-it app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## Configurazione passo passo della soluzione SafeKit / Nedap {#step-by-step-configuration-of-the-safekit--nedap-solution}


{{%  insert-safekit-82-configuration-it app="Nedap AEOS and SQL" mod="nedap"  %}}
 

## Dimostrazione della soluzione SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}