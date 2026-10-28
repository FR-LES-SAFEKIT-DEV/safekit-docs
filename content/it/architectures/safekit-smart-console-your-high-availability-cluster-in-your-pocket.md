---
title: "SafeKit Smart Console: il tuo cluster ad alta disponibilità in tasca"
canonical: "https://safekit.eviden.com/it/architectures/safekit-smart-console-your-high-availability-cluster-in-your-pocket/"
description: "Gestisci i cluster SafeKit con facilità grazie alla nostra Smart Console. Approfitta della configurazione senza codice, della compatibilità con gli smartphone e delle notifiche PWA in tempo reale. Elimina gli errori umani e garantisci un'elevata disponibilità a portata di mano. Scopri di più."
category: "architectures"
lang: "it"
topics: "Smart Console: Intuitiva, Mobile e Alta Disponibilità senza Errori, Indice, Come funziona un cluster SafeKit mirror con la console web?, Come funziona un cluster SafeKit `farm` con la console web?, Come monitorare più moduli e più cluster tramite la console web?, Come monitorare gli avvisi nella console e gestire le notifiche e-mail?, 🔍 Hub di navigazione per l'alta disponibilità SafeKit"
---

# SafeKit Smart Console: il tuo cluster ad alta disponibilità in tasca {#safekit-smart-console-your-high-availability-cluster-in-your-pocket}

## Smart Console: intuitiva, mobile e ad alta disponibilità senza errori {#smart-console-intuitive-mobile-and-error-free-high-availability}

Ridefinisci il modo in ** ** La console Web SafeKit offre un'esperienza ** senza curva di ** , che ti consente di configurare e controllare la tua infrastruttura con requisiti ** ** codice.

Che siate alla vostra scrivania o in movimento, la dashboard compatibile con smartphone vi offre il controllo completo del cluster a portata di mano. Semplificando la gestione dei moduli mirror e `farm` , la Smart Console ** elimina gli errori umani ** e garantisce un processo di failover senza interruzioni per i vostri sistemi più critici.

## Indice {#table-of-contents}

  * [ Come funziona un cluster SafeKit mirror con la console web? ](#safekit-mirror-cluster)
  * [ Come funziona un cluster SafeKit `farm` con la console web? ](#safekit-farm-cluster)
  * [ Come monitorare più moduli e più cluster tramite la console web? ](#multipe-modules-clusters)
  * [ Come monitorare gli avvisi nella console e gestire le notifiche e-mail? ](#safekit-notifications-cluster)


## Come funziona un cluster SafeKit mirror con la console web? {#safekit-mirror-cluster}

### Come configurare un cluster SafeKit Mirror {#safekit-mirror-cluster-configure}


![ SafeKit Console Web: dashboard di configurazione dell'alta disponibilità che mostra le reti heartbeat, la configurazione degli IP virtuali e la replica della directory in tempo reale per un cluster mirror . ](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


La console web ** SafeKit ** offre un'interfaccia intuitiva per orchestrare l'alta disponibilità delle vostre applicazioni critiche. In pochi semplici passaggi, potete configurare un cluster ** SafeKit mirror ** per garantire la continuità operativa:

  * ** Failover dell'applicazione (scheda Macro): ** Definisci i servizi applicativi specifici da riavviare automaticamente in caso di errore.
  * Rete(i) heartbeat ** : ** Percorso(i) di comunicazione dedicato(i) utilizzato(i) dai nodi del cluster per monitorare continuamente lo stato e la disponibilità reciproci e sincronizzare le decisioni di failover.
  * ** Gestione IP virtuale: ** Configura l'IP virtuale (VIP) per la riconnessione trasparente del client dopo un failover.
  * ** Replica in tempo reale: ** Seleziona le directory critiche per la replica sincrona a livello di byte basata sull'host.
  * ** Checkers: ** Monitora lo stato di salute dell'applicazione e attiva il ripristino automatico se viene rilevato un errore di processo.


Il cluster SafeKit include un verificatore di split-brain dedicato per risolvere i problemi di isolamento di rete senza la necessità di una terza macchina witness o di una rete heartbeat aggiuntiva. Per ulteriori informazioni su heartbeat, failover e quorum in un cluster ](</best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) , consultare la documentazione [ .

### Come monitorare un cluster SafeKit mirror {#safekit-mirror-cluster-monitoring}


Console Web ![ SafeKit : Monitoraggio in tempo reale di un cluster mirror a 2 nodi che mostra gli stati PRIM e SECOND con replica dei dati attiva. ](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


La console di gestione ** SafeKit ** offre una visione unificata della tua infrastruttura ad alta disponibilità. Consente agli amministratori di monitorare lo stato operativo ** ** del cluster e di tracciare la sincronizzazione dei dati in tempo reale.

Per un cluster mirror a 2 nodi, la console visualizza chiaramente i ruoli di ciascun server:

  * ** PRIM (Primario): ** Il nodo attivo che attualmente esegue l'applicazione e gestisce l'IP virtuale. Esegue scritture nella memoria locale e la replica in tempo reale sul nodo secondario.
  * ** SECONDO (Secondario): ** Il nodo di standby riceve aggiornamenti sincroni a livello di byte. È pronto a subentrare immediatamente in caso di guasto del nodo primario.
  * ** Stato ALONE: ** Avvisa visivamente quando il cluster è in esecuzione su un singolo nodo (ad esempio, durante la manutenzione o dopo un errore), indicando che la ridondanza è temporaneamente persa.
  * Avanzamento della risincronizzazione ** : ** Quando un nodo guasto si ripristina, il suo stato diventa arancione durante la reintegrazione dei dati in background, garantendo l'assenza di tempi di inattività durante la fase di "ritorno alla normalità".


Oltre alle semplici icone di stato, l'interfaccia fornisce l'orchestrazione del failover con un clic ** ** ( ** `...` menu ** ), che consente di riassegnare manualmente il ruolo primario per la manutenzione pianificata garantendo al contempo la disponibilità continua per l'attività degli utenti.

## Come funziona un cluster SafeKit `farm` con la console web? {#safekit-farm-cluster}

### Come configurare un cluster SafeKit `farm` {#safekit-farm-cluster-configuration}


Console Web ![ SafeKit : configurazione del cluster Farm per il bilanciamento del carico di rete e la gestione degli IP virtuali. ](/wp-content/uploads/2026/01/safekit-farm-cluster-config.png "w:966")


Il cluster ** SafeKit `farm` ** è progettato per garantire elevata disponibilità e scalabilità dei servizi. La configurazione si concentra sulla distribuzione simultanea del traffico in entrata su entrambi i nodi:

  * ** Servizi con bilanciamento del carico (scheda Macro): ** Definisci i servizi applicativi specifici (ad esempio, Apache, IIS , Nginx ) da mantenere attivi su tutti i nodi.
  * Rete(i) heartbeat ** : ** Percorso(i) di comunicazione utilizzato(i) per rilevare se un nodo ha lasciato `farm` , attivando una ridistribuzione immediata del carico.
  * ** IP virtuale ( `Farm` VIP): ** A differenza di un cluster mirror , il VIP `Farm` è condiviso tra i nodi utilizzando un algoritmo di filtraggio del kernel per distribuire il traffico di rete.
  * Regole di bilanciamento del carico ** : ** Definisce la politica di distribuzione del traffico in base all'indirizzo IP o alla porta di origine.
  * ** Checkers: ** Monitora lo stato di salute dell'applicazione e attiva il riavvio automatico se viene rilevato un errore di processo.


### Come monitorare un cluster SafeKit `farm` {#safekit-farm-cluster-monitoring}


Console ![ SafeKit : Monitoraggio di un cluster Farm a 2 nodi che mostra entrambi i nodi in stato UP con bilanciamento del carico attivo. ](/wp-content/uploads/2026/01/safekit-farm-cluster-monitor.png "w:473")


Il monitoraggio di un cluster `farm` fornisce visibilità sulla natura attivo ** attivo ** dell'infrastruttura, dove tutti i nodi contribuiscono alle prestazioni dell'applicazione (in questo esempio vengono mostrati 2 nodi; scalabile a nodi aggiuntivi):

  * ** Stato UP (50% su 2 nodi): ** In un `farm` sano, entrambi i nodi sono nello stato "UP" (50%), il che significa che entrambi stanno ricevendo ed elaborando attivamente le richieste dei client tramite l'IP virtuale condiviso.
  * ** Ribilanciamento automatico: ** Se un nodo si guasta, la console mostra visivamente il nodo rimanente che gestisce il 100% del traffico. Non c'è alcun ritardo di "failover", poiché il nodo sopravvissuto è già attivo (a parte un tempo di rilevamento di alcuni secondi).
  * Inserimento nodo ** : ** Quando un nodo riparato viene riavviato, passa dallo stato "STOP" allo stato "UP" e inizia automaticamente a ricevere la sua porzione di carico senza intervento dell'amministratore.
  * ** Nessuna sincronizzazione dati: ** Si noti che in un cluster `farm` non esiste uno stato di risincronizzazione "Arancione", poiché si prevede che i nodi siano stateless o condividano un database backend (che può essere protetto separatamente in un cluster mirror ).


Oltre alle semplici icone di stato, l'interfaccia offre la gestione dei nodi con un solo clic ( ** `...` menu ** ), consentendo di arrestare o avviare manualmente un nodo per la manutenzione programmata, mentre l'IP virtuale condiviso ridistribuisce automaticamente il traffico senza interrompere l'attività dell'utente.

## Come monitorare più moduli e più cluster tramite la console web? {#multipe-modules-clusters}

### Visualizzazione multi-modulo all'interno di un singolo cluster {#safekit-multi-module}


![ SafeKit Console Web: 4 moduli Hyper-V distribuiti sullo stesso cluster a 2 nodi. ](/wp-content/uploads/2026/05/safekit-hyperv-console-4.jpg "w:966")


Quando si ** più moduli su un singolo cluster ** 2 nodi, la SafeKit ** fornisce widget di monitoraggio ** per ciascun modulo ** Ciò è particolarmente utile per le soluzioni SafeKit - ** . 

Esempio ** : ** Nella figura è mostrata una configurazione con 4 VM protette:

  * La console è connessa al nodo 1, che funge da proxy per comunicare con il nodo 2.
  * La console visualizza ** 4 widget ** (uno per ogni VM).
  * Ogni macchina virtuale viene eseguita sul suo nodo PRIM e viene replicata sul suo SECONDO nodo.
  * Gli amministratori possono visualizzare in tempo reale se le macchine virtuali VM1 e VM2 sono attive sul nodo 1, mentre le macchine virtuali VM2 e VM3 sono attive sul nodo 2.
  * Gli amministratori possono facilmente migrare una VM da un nodo all'altro utilizzando il menu ** `...` ** .


Questa visibilità granulare garantisce che, anche in ambienti ad alta densità, si mantenga il controllo totale e la consapevolezza immediata di ogni carico di lavoro replicato. 

### Visualizzazione multi-cluster {#safekit-multi-cluster}


![ SafeKit Console Web: 4 cluster distribuiti su 8 server. ](/wp-content/uploads/2026/05/safekit-console-north-south-east-west-801.jpg "w:966")


Quando si distribuiscono più cluster ** ** su diversi server, è possibile utilizzare più schede del browser per connettersi a ciascun cluster oppure sfruttare la funzionalità PWA (Progressive Web App) della console. Utilizzando la PWA, si eliminano i menu di navigazione del browser, risparmiando spazio sullo schermo per organizzare meglio il monitoraggio del cluster sul desktop. 

Esempio: ** La figura mostra quattro console PWA che monitorano quattro cluster di videosorveglianza: uno a nord, uno a sud, ** a ovest e uno a est.

** Nota: ** Quando si hanno troppi cluster da visualizzare su un singolo desktop, SafeKit offre notifiche per aiutare a rilevare errori in numerosi cluster. 

## Come monitorare gli avvisi nella console e gestire le notifiche e-mail? {#safekit-notifications-cluster}

### Come posso ricevere avvisi istantanei per le modifiche di stato del modulo e gli eventi critici? {#how-can-i-receive-instant-alerts-for-module-state-changes-and-critical-events}

La console web SafeKit sfrutta le funzionalità native del browser per emettere notifiche istantanee ** ** ogni volta che si verifica una modifica dello stato di un modulo. Ciò garantisce che gli eventi critici vengano portati immediatamente alla tua attenzione, anche quando la console si trova in una scheda in background.

  * Sicurezza ** : le notifiche ** richiedono l'accesso tramite HTTPS ** o ** .
  * ** Integrazione PWA: ** Installa la console come Progressive Web App (PWA) su desktop o dispositivi mobili per un'esperienza simile a quella di un'app nativa.
  * ** Avvisi per dispositivi mobili: ** Su dispositivi mobili, le notifiche sono disponibili esclusivamente tramite PWA, con HTTPS obbligatorio.


Questo meccanismo avvisa immediatamente gli utenti in caso di eventi critici, migliorando la tempestiva consapevolezza dello stato del cluster e riducendo i tempi di risposta.

### Video SafeKit : Console su smartphone (0:54) {#demo-console}

&lt;br /&gt; 

### Come posso impostare avvisi email automatici in SafeKit ? {#how-can-i-set-up-automated-email-alerts-in-safekit}

SafeKit registra automaticamente tutti gli eventi principali del cluster ** nei log di sistema ** , consentendo una perfetta integrazione con qualsiasi strumento di monitoraggio presente sul mercato. Inoltre, include un agente di notifica e-mail dedicato ** ** progettato per monitorare questi log e inviare avvisi critici direttamente alla tua casella di posta. Ciò garantisce che le parti interessate rimangano informate anche quando la console web non viene monitorata attivamente. 

  * ** Raggruppamento intelligente: ** Per ridurre il rumore, l'agente raggruppa gli eventi che si verificano in un breve periodo in un'unica e-mail di riepilogo.
  * ** Copertura completa: ** L'agente è installato su tutti i nodi e deve essere configurato esplicitamente con i dettagli SMTP per essere abilitato.
  * ** Destinatari personalizzabili: ** Avvisi diretti a team IT specifici o alias di gestione per garantire una risposta tempestiva.


Combinando gli avvisi PWA in tempo reale con il raggruppamento intelligente delle email, SafeKit offre una strategia di notifica multilivello per le operazioni critiche.

### Video SafeKit : Notifiche e-mail in caso di failover (1:04) {#demo-notifications}

&lt;br /&gt; 


{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}