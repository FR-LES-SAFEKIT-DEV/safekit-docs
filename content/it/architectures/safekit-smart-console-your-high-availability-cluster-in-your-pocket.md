---
title: "SafeKit Smart Console: il tuo cluster ad alta disponibilità in tasca"
canonical: "https://safekit.eviden.com/it/architectures/safekit-smart-console-your-high-availability-cluster-in-your-pocket/"
description: "Gestisci i cluster SafeKit con facilità utilizzando la nostra Smart Console. Goditi la configurazione senza codice, la compatibilità con gli smartphone e le notifiche PWA in tempo reale. Elimina gli errori umani e assicurati alta disponibilità a portata di mano. Scopri di più."
category: "architectures"
lang: "it"
topics: "Smart Console: alta disponibilità intuitiva e senza errori su desktop e dispositivi mobili, Indice, Come funziona un cluster mirror SafeKit con la console web?, Come funziona un cluster farm SafeKit con la console web?, Come monitorare più moduli e più cluster tramite la console web?, Come monitorare gli avvisi nella console e gestire le notifiche e-mail?, 🔍 Esplora SafeKit"
translation: "translate_md 2026-11-22.1 | glossaire 2026-11-22.7 | Translation LLM | 41 expressions"
image: "/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png"
---

# SafeKit Smart Console: il tuo cluster ad alta disponibilità in tasca {#safekit-smart-console-your-high-availability-cluster-in-your-pocket}

## Smart Console: alta disponibilità intuitiva e senza errori su desktop e dispositivi mobili {#smart-console-intuitive-mobile-and-error-free-high-availability}

Ridefinisci il modo in cui gestisci l’alta disponibilità con una soluzione progettata per **la velocità e la semplicità**. La console web SafeKit offre un’esperienza **senza curva di apprendimento**, consentendoti di configurare e controllare la tua infrastruttura **senza scrivere alcun codice**.

Che siate alla scrivania o in movimento, il pannello di controllo compatibile con smartphone mette il controllo totale del cluster a portata di mano. Semplificando la gestione dei moduli mirror e <span class="notranslate farm-term" translate="no">farm</span>, la Smart Console **elimina gli errori umani** e garantisce un processo di failover senza interruzioni per i sistemi più vitali.

## Indice {#table-of-contents}

  * [Come funziona un cluster mirror SafeKit con la console web?](#safekit-mirror-cluster)
  * [Come funziona un cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit con la console web?](#safekit-farm-cluster)
  * [Come monitorare più moduli e più cluster tramite la console web?](#multipe-modules-clusters)
  * [Come monitorare gli avvisi nella console e gestire le notifiche e-mail?](#safekit-notifications-cluster)


## Come funziona un cluster mirror SafeKit con la console web? {#safekit-mirror-cluster}

### Come configurare un cluster mirror SafeKit? {#safekit-mirror-cluster-configure}


![SafeKit Web Console: dashboard di configurazione ad alta disponibilità che mostra le reti heartbeat, la configurazione IP virtuale e la replica della directory in tempo reale per un cluster mirror.](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


La **console web SafeKit** offre un’interfaccia intuitiva per orchestrare l’alta disponibilità delle applicazioni critiche. In pochi passaggi, è possibile configurare un **cluster mirror SafeKit** per garantire la continuità aziendale:

  * **Failover dell’applicazione (scheda Macro):** definire i servizi dell’applicazione specifici da riavviare automaticamente in caso di errore.
  * **Rete/i heartbeat:** percorso/i di comunicazione dedicato/i utilizzato/i dai nodi del cluster per monitorare continuamente lo stato di salute e la disponibilità reciproca e per sincronizzare le decisioni di failover.
  * **Gestione IP virtuale:** configurare l’IP virtuale (VIP) per la riconnessione trasparente del client dopo un failover.
  * **Replica in tempo reale:** selezionare le directory critiche per la replica sincrona a livello di byte basata sull’host.
  * **Checkers:** monitora lo stato dell’applicazione e avvia un ripristino automatico in caso di rilevamento di un errore di processo.


Il cluster SafeKit include un checker split-brain dedicato per risolvere i problemi di isolamento della rete senza la necessità di una terza macchina witness o di una rete heartbeat aggiuntiva. Per saperne di più su [heartbeat, failover e quorum in un cluster](</it/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>).

### Come monitorare un cluster mirror SafeKit? {#safekit-mirror-cluster-monitoring}


![Console Web SafeKit: monitoraggio in tempo reale di un cluster mirror a 2 nodi che mostra gli stati PRIM e SECOND con replica dati attiva.](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


La **console di gestione SafeKit** offre una visione unificata della tua infrastruttura ad alta disponibilità. Consente agli amministratori di monitorare lo **stato operativo** del cluster e di tenere traccia della sincronizzazione dei dati in tempo reale.

Per un cluster mirror a 2 nodi, la console visualizza chiaramente i ruoli di ciascun server:

  * **PRIM (primario):** il nodo attivo che attualmente esegue l’applicazione e gestisce l’IP virtuale. Esegue scritture sull’archiviazione locale e la replica in tempo reale sul nodo secondario.
  * **SECOND:** il nodo di standby riceve aggiornamenti sincroni a livello di byte. È pronto a subentrare immediatamente in caso di errore del nodo primario.
  * **Stato ALONE:** avvisa visivamente quando il cluster è in esecuzione su un singolo nodo (ad esempio, durante la manutenzione o dopo un errore), indicando che la ridondanza è temporaneamente persa.
  * **Avanzamento della risincronizzazione:** quando un nodo guasto si ripristina, il suo stato diventa arancione durante la reintegrazione dei dati in background, garantendo l’assenza di tempi di inattività durante la fase di "ritorno alla normalità".


Oltre alle semplici icone di stato, l’interfaccia fornisce **l’orchestrazione del failover con un clic** tramite il **menu `...`**, consentendo di riassegnare manualmente il ruolo primario per la manutenzione pianificata, garantendo al contempo la disponibilità continua per l’attività dell’utente.

## Come funziona un cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit con la console web? {#safekit-farm-cluster}

### Come configurare un cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit? {#safekit-farm-cluster-configuration}


![SafeKit Web Console: configurazione cluster farm per il bilanciamento del carico di rete e la gestione degli IP virtuali.](/wp-content/uploads/2026/01/safekit-farm-cluster-config.png "w:966")


Il **cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit** è progettato per garantire alta disponibilità e scalabilità dei servizi. La configurazione si concentra sulla distribuzione del traffico in entrata su entrambi i nodi contemporaneamente:

  * **Servizi con bilanciamento del carico (scheda Macro):** definire i servizi applicativi specifici (ad esempio, Apache, IIS, Nginx) da mantenere attivi su tutti i nodi.
  * **Rete/i heartbeat:** percorso/i di comunicazione utilizzato/i per rilevare se un nodo ha lasciato la <span class="notranslate farm-term" translate="no">farm</span>, attivando una ridistribuzione immediata del carico.
  * **IP virtuale (VIP <span class="notranslate farm-term" translate="no">farm</span>):** a differenza di un cluster mirror, l’indirizzo IP virtuale di un cluster <span class="notranslate farm-term" translate="no">farm</span> è condiviso tra tutti i nodi e un algoritmo di filtraggio del kernel distribuisce il traffico di rete.
  * **Regole di bilanciamento del carico:** definisci la politica di distribuzione del traffico in base all’indirizzo IP o alla porta di origine.
  * **Checkers:** monitora lo stato dell’applicazione e avvia un riavvio automatico in caso di rilevamento di un errore di processo.


### Come monitorare un cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit? {#safekit-farm-cluster-monitoring}


![SafeKit Console: monitoraggio di un cluster farm a 2 nodi che mostra entrambi i nodi nello stato UP con bilanciamento del carico attivo.](/wp-content/uploads/2026/01/safekit-farm-cluster-monitor.png "w:473")


Il monitoraggio di un cluster <span class="notranslate farm-term" translate="no">farm</span> fornisce visibilità sulla natura **attiva-attiva** dell’infrastruttura, in cui tutti i nodi contribuiscono alle prestazioni dell’applicazione (in questo esempio vengono mostrati 2 nodi, scalabili a nodi aggiuntivi):

  * **Stato UP (50% su 2 nodi):** in una <span class="notranslate farm-term" translate="no">farm</span> sana, entrambi i nodi sono nello stato " UP " (50%), il che significa che entrambi ricevono ed elaborano attivamente le richieste dei client tramite l’IP virtuale condiviso.
  * **Riequilibrio automatico:** se un nodo si guasta, la console mostra visivamente che il nodo rimanente gestisce il 100% del traffico. Non c’è alcun ritardo di "failover", poiché il nodo superstite è già attivo (a parte un tempo di rilevamento di pochi secondi).
  * **Inserimento del nodo:** quando un nodo riparato viene riavviato, passa da " STOP " a " UP " e inizia automaticamente a ricevere la sua porzione di carico senza l’intervento dell’amministratore.
  * **Nessuna sincronizzazione dei dati:** si noti che in un cluster <span class="notranslate farm-term" translate="no">farm</span> non esiste lo stato di risincronizzazione arancione, poiché i nodi devono essere senza stato o condividere un database di backend (che può essere protetto separatamente in un cluster mirror).


Oltre alle semplici icone di stato, l’interfaccia fornisce la gestione dei nodi con un clic tramite il **menu `...`**, consentendo di arrestare o avviare manualmente un nodo per la manutenzione pianificata, mentre l’IP virtuale condiviso ridistribuisce automaticamente il traffico senza interrompere l’attività dell’utente.

## Come monitorare più moduli e più cluster tramite la console web? {#multipe-modules-clusters}

### Visualizzazione multi-modulo all’interno di un singolo cluster {#safekit-multi-module}


![SafeKit Web Console: 4 moduli Hyper-V distribuiti sullo stesso cluster a 2 nodi.](/wp-content/uploads/2026/05/safekit-hyperv-console-4.jpg "w:966")


Quando si implementano **più moduli** su un singolo cluster a 2 nodi, la console Web SafeKit fornisce **widget di monitoraggio individuali** per ciascun modulo. Ciò è particolarmente utile per le soluzioni **SafeKit Hyper-V**. 

**Esempio:** nella figura con una configurazione a 4 VM protette:

  * La console è collegata a node1, che funge da proxy per comunicare con node2.
  * La console visualizza **4 widget** (uno per ogni VM).
  * Ogni VM viene eseguita sul suo nodo PRIM e viene replicata sul suo nodo SECOND.
  * Gli amministratori possono vedere in tempo reale quali VM sono attive su ciascun nodo: VM1 e VM2 su node1, VM3 e VM4 su node2.
  * Gli amministratori possono facilmente migrare una VM da un nodo all’altro utilizzando il **menu `...`**.


Questa visibilità granulare garantisce che, anche in ambienti ad alta densità, si mantenga il controllo totale e la consapevolezza immediata di ogni carico di lavoro replicato. 

### Visualizzazione multi-cluster {#safekit-multi-cluster}


![Console Web SafeKit: 4 cluster distribuiti su 8 server.](/wp-content/uploads/2026/05/safekit-console-north-south-east-west-801.jpg "w:966")


Quando si implementano **più cluster** su più server, è possibile utilizzare più schede del browser per connettersi a ciascun cluster o utilizzare la funzione PWA (Progressive Web App) della console. Utilizzando la PWA, è possibile rimuovere i menu di navigazione del browser, risparmiando spazio sullo schermo per organizzare meglio il monitoraggio dei cluster sul desktop. 

**Esempio:** la figura mostra quattro console PWA che monitorano quattro cluster di videosorveglianza situati a nord, sud, ovest ed est.

**Nota:** quando sono presenti troppi cluster da visualizzare su un singolo desktop, SafeKit offre notifiche per aiutare a rilevare gli errori in numerosi cluster. 

## Come monitorare gli avvisi nella console e gestire le notifiche e-mail? {#safekit-notifications-cluster}

### Come posso ricevere avvisi istantanei per le modifiche dello stato del modulo e gli eventi critici? {#how-can-i-receive-instant-alerts-for-module-state-changes-and-critical-events}

La console web SafeKit sfrutta le funzionalità native del browser per inviare **notifiche istantanee** ogni volta che si verifica una modifica dello stato di un modulo. Ciò garantisce che gli eventi critici vengano immediatamente portati alla tua attenzione, anche quando la console si trova in una scheda in background.

  * **Sicurezza:** le notifiche richiedono l’accesso tramite **HTTPS** o localhost.
  * **Integrazione PWA:** installa la console come Progressive Web App (PWA) su desktop o dispositivi mobili per un’esperienza simile a quella di un’app nativa.
  * **Avvisi su dispositivi mobili:** sui dispositivi mobili, le notifiche sono disponibili esclusivamente tramite PWA, con HTTPS obbligatorio.


Questo meccanismo avvisa immediatamente gli utenti in caso di eventi critici, migliorando la consapevolezza tempestiva dello stato del cluster e riducendo i tempi di risposta.

### Video SafeKit: Console su smartphone (0:54) {#demo-console}


### Come posso configurare gli avvisi e-mail automatici in SafeKit? {#how-can-i-set-up-automated-email-alerts-in-safekit}

SafeKit registra automaticamente tutti **i principali eventi del cluster nei log di sistema**, consentendo una perfetta integrazione con qualsiasi strumento di monitoraggio presente sul mercato. Inoltre, include un **agente di notifica e-mail** dedicato, progettato per monitorare questi log e inviare avvisi critici direttamente alla tua casella di posta. Ciò garantisce che le parti interessate rimangano informate anche quando la console web non è attivamente monitorata. 

  * **Raggruppamento intelligente:** per ridurre il rumore, l’agente raggruppa gli eventi che si verificano in un breve periodo in un’unica e-mail di riepilogo.
  * **Copertura completa:** l’agente è installato su tutti i nodi e deve essere configurato esplicitamente con i dettagli SMTP per essere abilitato.
  * **Destinatari personalizzabili:** invia avvisi diretti a team IT specifici o a indirizzi di gestione per garantire una risposta tempestiva.


Combinando gli avvisi PWA in tempo reale con il raggruppamento intelligente delle e-mail, SafeKit offre una strategia di notifica a più livelli per le operazioni mission-critical.

### Video SafeKit: notifiche e-mail in caso di failover (1:04) {#demo-notifications}



{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}