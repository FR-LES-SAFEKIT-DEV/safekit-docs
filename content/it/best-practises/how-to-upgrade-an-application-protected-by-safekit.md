---
title: "Aggiornamento di un'applicazione protetta da SafeKit in un cluster HA"
canonical: "https://safekit.eviden.com/it/best-practises/how-to-upgrade-an-application-protected-by-safekit/"
description: "Scopri come aggiornare in modo sicuro le applicazioni protette da SafeKit . Confronta aggiornamenti minori e maggiori, aggiornamenti progressivi, strategie di rollback e alta disponibilità basata su macchine virtuali."
category: "best-practises"
lang: "it"
topics: "Aggiornamento di un'applicazione ad alta disponibilità protetta da SafeKit , Alta disponibilità a livello di VM, Alta disponibilità a livello di applicazione, Scelta della strategia di aggiornamento corretta, Conclusione, 🔍 Hub di navigazione per l'alta disponibilità SafeKit"
---

# Aggiornamento di un'applicazione protetta da SafeKit in un cluster HA {#upgrading-an-application-protected-by-safekit-in-an-ha-cluster}

## Aggiornamento di un'applicazione ad alta disponibilità protetta da SafeKit {#upgrading-a-high-availability-application-protected-by-safekit}

Mantenere aggiornate le applicazioni critiche per l'azienda è essenziale per la sicurezza, le prestazioni e l'accesso alle nuove funzionalità. Quando un'applicazione è protetta da SafeKit , la procedura di aggiornamento dipende dall'architettura di alta disponibilità in uso.

Esistono due modelli di implementazione comuni:

  * **Macchina virtuale ad alta disponibilità** , dove l'applicazione viene eseguita all'interno di una macchina virtuale protetta gestita da SafeKit .
  * **Alta disponibilità a livello di applicazione** , dove l'applicazione è installata su due server.


Ciascun modello offre meccanismi di aggiornamento e strategie di ripristino differenti.

## Alta disponibilità a livello di macchina virtuale {#vm-level-ha}

Con le soluzioni di failover per macchine virtuali SafeKit , come **hyperv.safe** e **kvm.safe** , l'applicazione viene installata una sola volta all'interno di una macchina virtuale.

SafeKit protegge l'intera macchina virtuale anziché la singola applicazione, semplificando notevolmente le operazioni di manutenzione.

### Processo di aggiornamento semplificato {#simplified-upgrade-process}

Poiché si lavora con una singola istanza VM dell'applicazione, la manutenzione viene gestita a livello di virtualizzazione anziché tramite failover a livello di applicazione.

La procedura di aggiornamento è semplice:

  1. Crea un checkpoint o uno snapshot della macchina virtuale utilizzando la console di gestione Hyper-V o KVM.
  2. Eseguire l'aggiornamento dell'applicazione all'interno della macchina virtuale.
  3. Convalidare l'applicazione aggiornata.
  4. Se l'aggiornamento ha esito positivo, rimuovere lo snapshot e riprendere il normale funzionamento.
  5. In caso di problemi, ripristinare la macchina virtuale dallo snapshot e tornare immediatamente al precedente stato di funzionamento noto.


L'interruzione del servizio è limitata alla durata normalmente richiesta dalla procedura di aggiornamento dell'applicazione stessa.

### Vantaggi della protezione a livello di macchina virtuale {#benefits-of-vm-level-protection}

  * È necessario gestire una sola istanza dell'applicazione.
  * Nessuna procedura di aggiornamento compatibile con il cluster.
  * Ripristino rapido tramite snapshot di macchine virtuali.
  * Riduzione della complessità operativa.
  * Processo di aggiornamento coerente indipendentemente dall'applicazione protetta.


Questo approccio è particolarmente interessante per le applicazioni preconfezionate e i software commerciali standard, dove il clustering delle applicazioni non è disponibile o è difficile da implementare.

## Alta disponibilità a livello applicativo {#app-level-ha}

In un cluster SafeKit tradizionale, l'applicazione è installata su due nodi: nodo 1 e nodo 2. SafeKit sincronizza i dati dell'applicazione tra questi nodi e gestisce automaticamente il failover, se necessario.

### Aggiornamento minore dell'applicazione {#app-level-ha-minor}

Un aggiornamento minore modifica solo i file binari dell'applicazione, mantenendo la piena compatibilità dei dati replicati tra le diverse versioni. Poiché il formato dei dati replicati non cambia, SafeKit supporta un aggiornamento progressivo con tempi di inattività minimi. 

  1. Il cluster inizialmente funziona con una configurazione **✅ PRIM (nodo 1) / ✅ SECOND (nodo 2)** . L'applicazione viene eseguita sul nodo PRIM e i dati replicati vengono continuamente sincronizzati con il nodo SECOND. 
  2. Arrestare il modulo SafeKit sul SECONDO nodo ( **❌ STOP (nodo 2)** ), aggiornare l'applicazione e riavviare il modulo. Durante questa operazione, l'applicazione continua a essere eseguita su **✅ DA SOLO (nodo 1)** e non si verifica alcuna interruzione del servizio. 
  3. Dopo il riavvio, il nodo aggiornato si riunisce al cluster come **✅ SECONDO (nodo 2)** e risincronizza i dati replicati. 
  4. Arresta il nodo PRIM ( **❌ STOP (nodo 1)** ). SafeKit esegue automaticamente un failover e il nodo aggiornato diventa **✅ ALONE (nodo 2)** . L'applicazione viene riavviata su questo nodo. Il tempo di inattività è limitato al tempo di failover e di riavvio dell'applicazione. 
  5. Se l'applicazione aggiornata funziona correttamente nello stato ALONE, aggiornare il nodo rimanente (nodo 1) e riavviare il relativo modulo SafeKit . 
  6. Dopo la risincronizzazione, il cluster ritorna a una normale configurazione **✅ SECOND (nodo 1) / ✅ PRIM (nodo 2)** . I ruoli originali possono essere ripristinati manualmente tramite la console di amministrazione SafeKit oppure automaticamente tramite la configurazione SafeKit . 


**Procedura di rollback**

  * Al passaggio 5, arresta il nodo **✅ ALONE (nodo 2)** .
  * Forza il nodo originale (nodo 1) ad avviarsi come primario **ALONE (nodo 1)** con la versione precedente dell'applicazione.
  * Reinstallare la versione precedente sul nodo aggiornato (nodo 2).
  * Ritorno alla normale configurazione **✅ PRIM (nodo 1) / ✅ SECOND (nodo 2)** .


L'aggiornamento completo viene eseguito con tempi di inattività limitati alla transizione da **✅ PRIM / ✅ SECOND** a **❌ STOP / ✅ ALONE** . 

### Aggiornamento principale dell'applicazione {#app-level-ha-major}

Un aggiornamento importante modifica il formato o la struttura dei dati replicati. Poiché i dati generati dalla nuova versione non sono più compatibili con la precedente, non è possibile eseguire un aggiornamento progressivo. 

  1. Il cluster inizialmente funziona con una configurazione **✅ PRIM (nodo 1) / ✅ SECOND (nodo 2)** . 
  2. Arresta il SECONDO nodo e poi il nodo PRIM. Il cluster passa a **❌ STOP (nodo 1) / ❌ STOP (nodo 2)** . 
  3. Aggiorna il precedente nodo PRIM e riavvialo. Il nodo si avvia da solo come **✅ DA SOLO (nodo 1)** con la nuova versione dell'applicazione. 
  4. Convalidare l'applicazione aggiornata e verificare che funzioni correttamente. 
  5. Se la convalida ha esito positivo, aggiornare il nodo rimanente e riavviare il relativo modulo SafeKit . 
  6. Il nodo aggiornato diventa **✅ SECOND (nodo 2)** , risincronizza i dati dell'applicazione e il cluster ritorna a una normale configurazione **✅ PRIM (nodo 1) / ✅ SECOND (nodo 2)** . 


**Procedura di rollback**

  * Al passaggio 5, arrestare il nodo **✅ ALONE (nodo 1)** aggiornato.
  * Forza il nodo non aggiornato ad avviarsi come primario **✅ DA SOLO (nodo 2)** .
  * Reinstallare la versione precedente dell'applicazione sul nodo aggiornato.
  * Ripristina la configurazione originale **✅ SECONDO (nodo 1) / ✅ PRIMO (nodo 2)** .


Poiché i dati replicati vengono modificati durante la migrazione, il tempo di inattività corrisponde al periodo tra lo stato **❌ STOP / ❌ STOP** e il riavvio del primo nodo aggiornato come **✅ ALONE** . 

### Perché SafeKit semplifica gli aggiornamenti delle applicazioni {#why-safekit-simplifies-application-upgrades}

SafeKit riduce al minimo il rischio operativo consentendo agli amministratori di:

  * Aggiorna un nodo alla volta.
  * Mantenere la disponibilità del servizio ogniqualvolta sia possibile.
  * Convalida le nuove versioni prima di passare al traffico di produzione.
  * In caso di problemi imprevisti, ripristinare rapidamente il nodo precedente.


## Scegliere la giusta strategia di aggiornamento {#choosing-the-right-upgrade-strategy}

Modello di distribuzione | Istanze dell'applicazione | Impatto sui dati replicati | Approccio di aggiornamento  
---|---|---|---  
HA a livello di applicazione | Due nodi | Dipende dal tipo di aggiornamento | Aggiornamento progressivo con failover  
HA a livello di VM ( hyperv.safe / kvm.safe ) | Una VM | Gestito all'interno della VM | Snapshot, aggiornamento, convalida, rollback se necessario  
  
## Conclusione {#conclusion}

SafeKit offre architetture flessibili ad alta disponibilità che si adattano ai requisiti operativi di diverse applicazioni. Che si tratti di proteggere un'applicazione clusterizzata su due nodi o una singola istanza applicativa in esecuzione su una macchina virtuale, SafeKit consente aggiornamenti controllati, riduce al minimo i tempi di inattività e offre opzioni di ripristino affidabili ogni qualvolta siano necessarie operazioni di manutenzione.


{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}