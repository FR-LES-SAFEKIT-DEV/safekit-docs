---
title: "Aggiornamento di un’applicazione protetta da SafeKit in un cluster HA"
canonical: "https://safekit.eviden.com/it/best-practises/how-to-upgrade-an-application-protected-by-safekit/"
description: "Come aggiornare un’applicazione protetta da SafeKit: aggiornamenti minori e maggiori, rolling upgrade, opzioni di rollback e approccio HA delle VM."
category: "best-practises"
lang: "it"
topics: "Aggiornamento di un’applicazione ad alta disponibilità protetta da SafeKit, Elevata disponibilità a livello di VM, Alta disponibilità a livello di applicazione, Scegliere la giusta strategia di aggiornamento, Conclusione"
hashpart: "upgrading-a-high-availability-application-protected-by-safekit, vm-level-ha, app-level-ha, choosing-the-right-upgrade-strategy, conclusion"
translation: "translate_md 2026-11-20.1 | glossaire 2026-11-20.3 | Translation LLM | 41 expressions"
image: "/wp-content/uploads/2026/04/safekit-icon-512x512-1.png"
schemaType: "TechArticle"
---

# Aggiornamento di un’applicazione protetta da SafeKit in un cluster HA {#upgrading-an-application-protected-by-safekit-in-an-ha-cluster}

## Aggiornamento di un’applicazione ad alta disponibilità protetta da SafeKit {#upgrading-a-high-availability-application-protected-by-safekit}

Mantenere aggiornate le applicazioni business-critical è essenziale per la sicurezza, le prestazioni e l’accesso a nuove funzionalità. Quando un’applicazione è protetta da SafeKit, la procedura di aggiornamento dipende dall’architettura di alta disponibilità in uso.

Esistono due modelli di implementazione comuni:

  * **Alta disponibilità della macchina virtuale**, in cui l’applicazione viene eseguita all’interno di una macchina virtuale protetta gestita da SafeKit.
  * **Alta disponibilità a livello di applicazione**, in cui l’applicazione è installata su due server.


Ogni modello offre diversi meccanismi di aggiornamento e strategie di rollback.

## Elevata disponibilità a livello di VM {#vm-level-ha}

Con le soluzioni di failover per macchine virtuali SafeKit, come **hyperv.safe** e **kvm.safe**, l’applicazione viene installata una sola volta all’interno di una macchina virtuale.

SafeKit protegge l’intera macchina virtuale, non l’applicazione stessa. Ciò semplifica notevolmente le operazioni di manutenzione.

### Processo di aggiornamento semplificato {#simplified-upgrade-process}

Poiché si lavora con una singola istanza VM dell’applicazione, la manutenzione viene gestita a livello di virtualizzazione anziché tramite failover a livello di applicazione.

La procedura di aggiornamento è semplice:

  1. Creare un checkpoint o un’istantanea della macchina virtuale utilizzando la console di gestione Hyper-V o KVM.
  2. Eseguire l’aggiornamento dell’applicazione all’interno della macchina virtuale.
  3. Convalida l’applicazione aggiornata.
  4. Se l’aggiornamento viene completato correttamente, rimuovere lo snapshot e continuare con il normale funzionamento.
  5. In caso di problemi, ripristinare la macchina virtuale dall’istantanea e tornare immediatamente allo stato di funzionamento precedente noto.


L’interruzione del servizio è limitata alla durata normalmente richiesta dalla procedura di aggiornamento dell’applicazione stessa.

### Vantaggi della protezione a livello di VM {#benefits-of-vm-level-protection}

  * Un’unica istanza dell’applicazione da mantenere.
  * Nessuna procedura di aggiornamento specifica per il cluster.
  * Rollback rapido tramite snapshot della VM.
  * Complessità operativa ridotta.
  * Processo di aggiornamento coerente indipendentemente dall’applicazione protetta.


Questo approccio è particolarmente interessante per le applicazioni preconfezionate e per i software commerciali standard, laddove il clustering delle applicazioni non è disponibile o è difficile da implementare.

## Alta disponibilità a livello di applicazione {#app-level-ha}

In un cluster SafeKit tradizionale, l’applicazione è installata su due nodi: nodo 1 e nodo 2. SafeKit sincronizza i dati dell’applicazione tra questi nodi e gestisce automaticamente il failover, se necessario.

### Aggiornamento minore dell’applicazione {#app-level-ha-minor}

Un aggiornamento minore modifica solo i file binari dell’applicazione, mantenendo i dati replicati pienamente compatibili tra le versioni. Poiché il formato dei dati replicati non cambia, SafeKit supporta un aggiornamento continuo con tempi di inattività minimi. 

  1. Il cluster viene inizialmente eseguito in una configurazione **✅ PRIM (nodo 1) / ✅ SECOND (nodo 2)**. L’applicazione viene eseguita sul nodo PRIM. I dati replicati vengono continuamente sincronizzati con il nodo SECOND.
  2. Arrestare il modulo SafeKit sul nodo SECOND. Il suo stato diventa **❌ STOP (nodo 2)**. Aggiornare l’applicazione e riavviare il modulo. Durante questa operazione, l’applicazione continua a funzionare sul nodo 1, nello stato **✅ ALONE (nodo 1)**. Non si verifica alcuna interruzione del servizio.
  3. Dopo il riavvio, il nodo aggiornato si unisce nuovamente al cluster come **✅ SECOND (nodo 2)**. Risincronizza i dati replicati.
  4. Arrestare il nodo PRIM. Il suo stato diventa **❌ STOP (nodo 1)**. SafeKit esegue automaticamente un failover. Il nodo aggiornato diventa **✅ ALONE (nodo 2)**. L’applicazione viene riavviata su questo nodo. Il tempo di inattività è limitato al failover e al tempo di riavvio dell’applicazione.
  5. Se l’applicazione aggiornata funziona correttamente sul nodo 2, aggiornare il nodo rimanente (nodo 1) e riavviare il suo modulo SafeKit.
  6. Dopo la risincronizzazione, il cluster ritorna a una configurazione normale **✅ SECOND (nodo 1) / ✅ PRIM (nodo 2)**. I ruoli originali possono essere ripristinati manualmente utilizzando la console di amministrazione SafeKit o automaticamente tramite la configurazione SafeKit.


**Procedura di rollback**

  * Al passaggio 5, arresta il nodo 2, nello stato **✅ ALONE (nodo 2)**.
  * Riavviare il nodo originale (nodo 1) come primario, con la versione precedente dell’applicazione. Il suo stato è **✅ ALONE (nodo 1)**.
  * Reinstallare la versione precedente sul nodo aggiornato (nodo 2).
  * Ripristina la configurazione normale **✅ PRIM (nodo 1) / ✅ SECOND (nodo 2)**.


Il tempo di inattività per l’aggiornamento completo è limitato alla transizione da **✅ PRIM/✅ SECOND** a **❌ STOP/✅ ALONE**.

### Aggiornamento della versione principale dell’applicazione {#app-level-ha-major}

Un aggiornamento di versione principale modifica il formato o la struttura dei dati replicati. Poiché i dati generati dalla nuova versione non sono più compatibili con quella precedente, non è possibile eseguire un aggiornamento progressivo.

  1. Il cluster viene inizialmente eseguito in una configurazione **✅ PRIM (nodo 1) / ✅ SECOND (nodo 2)**.
  2. Arrestare il nodo SECOND e quindi il nodo PRIM. Il cluster passa a **❌ STOP (nodo 1) / ❌ STOP (nodo 2)**.
  3. Aggiornare il precedente nodo PRIM e riavviarlo. Il nodo si avvia da solo, con la nuova versione dell’applicazione. Il suo stato è **✅ ALONE (nodo 1)**.
  4. Convalidare l’applicazione aggiornata e verificare che funzioni correttamente.
  5. Se la convalida ha esito positivo, aggiornare il nodo rimanente e riavviare il relativo modulo SafeKit.
  6. Il nodo aggiornato diventa **✅ SECOND (nodo 2)**. Risincronizza i dati dell’applicazione. Il cluster ritorna a una configurazione normale **✅ PRIM (nodo 1) / ✅ SECOND (nodo 2)**.


**Procedura di rollback**

  * Al passaggio 5, arrestare il nodo 1 aggiornato, nello stato **✅ ALONE (nodo 1)**.
  * Riavviare il nodo non aggiornato (nodo 2) come primario. Il suo stato è **✅ ALONE (nodo 2)**.
  * Reinstallare la versione precedente dell’applicazione sul nodo aggiornato.
  * Ripristina la configurazione originale **✅ SECOND (nodo 1) / ✅ PRIM (nodo 2)**.


Poiché i dati replicati vengono modificati durante la migrazione, il downtime corrisponde al periodo tra lo stato **❌ STOP/❌ STOP** e il riavvio del primo nodo aggiornato come **✅ ALONE**.

### Vantaggi di SafeKit per gli aggiornamenti delle applicazioni {#why-safekit-simplifies-application-upgrades}

SafeKit riduce al minimo il rischio operativo:

  * Gli amministratori aggiornano un nodo alla volta.
  * SafeKit mantiene la disponibilità del servizio ogni volta che è possibile.
  * Le nuove versioni vengono convalidate prima che il traffico di produzione venga commutato.
  * Gli amministratori possono tornare rapidamente al nodo precedente se vengono rilevati problemi imprevisti.


## Scegliere la giusta strategia di aggiornamento {#choosing-the-right-upgrade-strategy}

Modello di implementazione | Istanze dell’applicazione | Impatto dei dati replicati | Approccio all’aggiornamento  
---|---|---|---  
HA a livello di applicazione | Due nodi | Dipende dal tipo di aggiornamento | Aggiornamento continuo con failover  
HA a livello di VM con hyperv.safe o kvm.safe | Una VM | Gestito all’interno della VM | Crea un’istantanea, aggiorna, convalida, esegui il rollback se necessario  
  
## Conclusione {#conclusion}

SafeKit fornisce architetture flessibili ad alta disponibilità che si adattano ai requisiti operativi delle diverse applicazioni. Sia che si tratti di proteggere un’applicazione in cluster su due nodi o una singola istanza di applicazione in esecuzione in una macchina virtuale, SafeKit consente aggiornamenti controllati, riduce al minimo i tempi di inattività e offre opzioni di ripristino affidabili ogni volta che sono necessarie operazioni di manutenzione.


{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}