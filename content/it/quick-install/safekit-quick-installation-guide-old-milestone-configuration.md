---
title: "Configurazione di Old SafeKit Milestone"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-old-milestone-configuration/"
category: "quick-install"
lang: "it"
topics: "Configurazione passo-passo della vecchia soluzione SafeKit/Milestone XProtect"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
---

# Configurazione di Old SafeKit Milestone {#old-safekit-milestone-configuration}

## Configurazione passo-passo della vecchia soluzione SafeKit/Milestone XProtect {#old-step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


![Avvertenza](/wp-content/uploads/2022/07/warning-small.png)


Fare attenzione, sono necessari alcuni passaggi specifici per la configurazione dell’indirizzo IP virtuale, altrimenti il failover non funzionerà.

### 1. Avviare la console SafeKit {#1-launch-the-safekit-console}

  * Avviare la console web in un browser su un nodo del cluster collegandosi a `http://localhost:9010`.
  * Inserire `admin` come nome utente e la password definita durante l’installazione.


È inoltre possibile eseguire la console in un browser su una workstation esterna al cluster.


![Avvertenza](/wp-content/uploads/2022/07/warning-small.png)


La configurazione di SafeKit viene eseguita su entrambi i nodi da un unico browser.


![Nota](/wp-content/uploads/2022/07/note.png)


Per proteggere la console web, consultare la sezione Protezione della console web SafeKit nella Guida per l’utente.


![Avviare la console web SafeKit per configurare il cluster](/wp-content/uploads/2023/01/appli-1.png)


### 2. Configurare gli indirizzi dei nodi {#2-configure-node-addresses}

  * Inserisci gli indirizzi IP dei nodi.
  * Quindi, fare clic su `Apply` per salvare la configurazione.


![Avvertenza](/wp-content/uploads/2022/07/warning-small.png)


Se il colore di sfondo node1 o node2 è rosso, verificare la connettività del browser a entrambi i nodi e controllare il firewall su entrambi i nodi per la risoluzione dei problemi.


![Nota](/wp-content/uploads/2022/07/note.png)


Questa operazione posizionerà gli indirizzi IP nel file `cluster.xml` su entrambi i nodi (maggiori informazioni nella formazione con la riga di comando).


![Inserisci i nodi del cluster](/wp-content/uploads/2023/01/appli-3.png)


### 3. Scegli il modulo {#3-choose-the-module}

  * Nella scheda Configurazione, fare clic sul modulo .safe.


![Nota](/wp-content/uploads/2022/07/note.png)


La console trova xxx.safe nella directory ’Application_Modules/demo/’ sul lato server se è stato rilasciato un modulo durante l’installazione.


![Scegli il modulo per](/wp-content/uploads/2023/01/appli-4.png)


### 4. Configurare il modulo {#4-configure-the-module}

  * Scegliere l’avvio automatico del modulo all’avvio senza ritardi.
  * Normalmente, è presente una singola rete heartbeat su cui viene eseguita la replica. Tuttavia, se necessario, è possibile definire una rete privata.
  * Verificare che le directory replicate siano installate su entrambi i nodi e che contengano i dati dell’applicazione.  
Per un database è necessaria la replica dei dati e dei log.  
È possibile aggiungere nuove directory replicate in base alle esigenze.
  * Immettere un indirizzo IP virtuale. Un indirizzo IP virtuale è un indirizzo IP standard nella stessa rete IP (stessa sottorete) degli indirizzi IP di entrambi i nodi.  
I client dell’applicazione devono essere configurati con l’indirizzo IP virtuale (o il nome DNS associato all’indirizzo IP virtuale).  
L’indirizzo IP virtuale viene commutato automaticamente in caso di guasto.
  * `start_prim` e `stop_prim` devono contenere l’avvio e l’arresto dell’applicazione.  
È possibile aggiungere nuovi servizi in questi script.  
Verificare che i nomi dei servizi in questi script siano quelli installati su entrambi i nodi, altrimenti modificarli negli script.
  * Arrestare i servizi configurati in `start_prim` su entrambi i nodi.
  * Su Windows e su entrambi i nodi, con il gestore dei servizi Windows, impostare `Boot Startup Type = Manual` per tutti i servizi registrati in `start_prim` (SafeKit controlla l’avvio dei servizi in `start_prim`).


![Avvertenza](/wp-content/uploads/2022/07/warning-small.png)


Se SQL si trova sul server di gestione:

  * I [database di sistema SQL](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (come master.mdf e mastlog.ldf) devono trovarsi nelle stesse directory su entrambi i nodi. Le directory devono essere configurate come replicate.
  * SQL deve essere installato anche nella stessa posizione nel file system su entrambi i nodi, perché il [database delle risorse SQL](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) di sola lettura si trova nel binario ed è necessario per il failover. Questo database non deve essere replicato.
  * I database SQL Milestone (.mdf e .ldf) devono trovarsi nelle stesse directory su entrambi i nodi. Le directory devono essere configurate come replicate. I database Milestone sono i seguenti, secondo questo [articolo](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>).


![Avvertenza](/wp-content/uploads/2022/07/warning-small.png)


Si noti che se un nome di processo viene visualizzato in Process Checker, verrà monitorato con un’azione di riavvio in caso di errore. La configurazione di un nome di processo errato causerà l’arresto del modulo subito dopo l’avvio.


![Nota](/wp-content/uploads/2022/07/note.png)


Il pulsante "Applica" riporterà la configurazione nei file `userconfig.xml`, `start_prim`, `stop_prim` su entrambi i nodi (maggiori informazioni nella formazione con la riga di comando).


![Accedi alle impostazioni del modulo](/wp-content/uploads/2023/01/appli-7-1.png)


### 5. Verifica della corretta configurazione {#5-verify-successful-configuration}

  * Verificare il messaggio di successo (verde) su entrambi i nodi e fare clic su Avanti.


![Verifica l’esito della configurazione del modulo](/wp-content/uploads/2023/01/appli-9-2.png)


### 6. Non avviare nulla e fare clic sul pulsante Chiudi {#6-do-not-start-anything-and-click-on-the-close-button}


![Avvertenza](/wp-content/uploads/2022/07/warning-small.png)


Non avviare nulla e fare clic sul pulsante Chiudi perché è necessaria una configurazione speciale sull’indirizzo IP virtuale prima dell’avvio


![Selezionare il nodo con i dati aggiornati](/wp-content/uploads/2023/01/appli-10-1.png)


### 7. Andare sul desktop del nodo 1 e impostare l’indirizzo IP virtuale nei file interni Milestone {#milestone-files}


![Nota](/wp-content/uploads/2022/07/note.png)


A partire da Milestone 2022 R3, questo passaggio non è utile e verrà eseguito automaticamente con " Server Configurator - Registrazione server - http://virtual-IP" in un passaggio successivo.

In una riga di comando di Powershell come Amministratore, eseguire questo script sul nodo 1:
    
    
    c:/safekit/modules//bin/UpdateAuthServerUri.ps1


![Nota](/wp-content/uploads/2022/07/note.png)


Questo script imposta l’indirizzo IP virtuale in 2 file interni Milestone:
    
    
    C:\ProgramData\Milestone\XProtect Management Server\ServerConfig.xml
    
    
        <AuthorizationServerUri>http://**< <virtual-ip>**/IDP</AuthorizationServerUri>
    
    
    C:\Program Files\Milestone\XProtect Management Server\IIS\IDP\appsettings.json
    
    
        "Authority": " http://**< <virtual-ip>**/IDP"


![Avvertenza](/wp-content/uploads/2022/07/warning-small.png)


In questa fase si presuppone che l’indirizzo IP virtuale sia stato configurato correttamente nei passaggi precedenti (lo script utilizza l’indirizzo IP virtuale inserito nella console SafeKit e memorizzato in `userconfig.xml`).


![Nota](/wp-content/uploads/2022/07/note.png)


### 8. Avviare il nodo 1 come primario nella console, il nodo con i dati aggiornati {#8-start-node-1-as-primary-in-the-console-the-node-with-up-to-date-data}

A partire dal passaggio 7, si presuppone che il nodo 1 disponga delle directory replicate aggiornate.

Forzare l’avvio del nodo 1 come primario. Quando il nodo 2 verrà avviato, tutti i dati del nodo 1 verranno copiati nel nodo 2.


![Avvertenza](/wp-content/uploads/2022/07/warning-small.png)


Se si effettua la scelta sbagliata, si corre il rischio di sincronizzare dati obsoleti su entrambi i nodi.


![Avvertenza](/wp-content/uploads/2022/07/warning-small.png)


Si presuppone inoltre che l’applicazione sia arrestata sul nodo 1 in modo che SafeKit installi i meccanismi di replica e quindi avvii l’applicazione nello script `start_prim`.


![Forzare l’avvio come primario del nodo con i dati aggiornati](/wp-content/uploads/2022/07/appli-11-bis.png)


### 9. Attendere la transizione a ALONE (verde) {#9-wait-for-the-transition-to-alone-green}

  * Il nodo 1 dovrebbe raggiungere lo stato ALONE (verde), il che significa che lo script `start_prim` è stato eseguito sul nodo 1.


![Avvertenza](/wp-content/uploads/2022/07/warning-small.png)


Se lo stato è ALONE (verde) e l’applicazione non è avviata, controllare i messaggi di output di `start_prim` nel registro applicazioni del nodo 1.


![Avvertenza](/wp-content/uploads/2022/07/warning-small.png)


Se il nodo 1 non raggiunge lo stato ALONE (verde), analizzare il motivo con il registro del modulo del nodo 1.


![Avvertenza](/wp-content/uploads/2022/07/warning-small.png)


Se il cluster è nello stato `WAIT (red) not uptodate - STOP (red) not uptodate`, arrestare il nodo WAIT e forzarne l’avvio come primario.


![Il primo nodo inizia come primario e diventa ALONE](/wp-content/uploads/2022/07/appli-11-bis-bis.png)


### 10. Sul desktop del nodo 1, arrestare, quindi registrare sull’indirizzo IP virtuale e riavviare il server di gestione Milestone {#10-in-the-desktop-of-node-1-stop-then-register-on-the-vitual-ip-address-and-restart-the-milestone-management-server}

Eseguire i seguenti punti sul nodo 1 in base al menu nell’immagine:

  * Fare clic con il pulsante destro del mouse sull’icona **di Milestone Management Server** nella barra delle applicazioni.
  * **Arresta il servizio del server di gestione**
  * Quindi, selezionare **Server Configurator ...** e registrare l’indirizzo IP virtuale.
  * **Avviare il servizio del server di gestione**


![Nota](/wp-content/uploads/2022/07/note.png)


Questa procedura registra il server di gestione del nodo 1 nel database SQL (in esecuzione sul nodo 1) tramite una connessione all’indirizzo virtuale.


![Avvertenza](/wp-content/uploads/2022/07/warning-small.png)


Prima della versione Milestone 2022 R3, la registrazione potrebbe aver eliminato la configurazione dell’indirizzo IP virtuale nei file interni Milestone. In questo caso, ripetere [il passaggio 7](#milestone-files).


![Nota](/wp-content/uploads/2022/07/note.png)


Nota: per registrare una versione precedente Milestone 2020 R2, utilizzare **Modifica impostazioni di crittografia...**


![Registrare il server di gestione in Milestone 2020+](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 11. Nel desktop del nodo 1 con Milestone Management Client, impostare l’indirizzo IP virtuale negli URL per i servizi e la rete {#11-in-the-desktop-of-node-1-with-milestone-management-client-set-the-virtual-ip-address-in-urls-for-services-and-network}


![Nota](/wp-content/uploads/2022/07/note.png)


A partire da Milestone 2022 R3, questo passaggio non è utile ed è stato reso automatico con " Server Configurator - Registrazione server - http://virtual-IP".

Secondo l’immagine:

  1. Avviare **Milestone XProtect Management Client** sul nodo 1.
  2. Nel menu **Strumenti**, selezionare **Servizi registrati**. 
     * Nella finestra **Aggiungi/rimuovi servizi registrati**, selezionare un servizio dall’elenco e fare clic su **Modifica**.
     * Nella finestra **Modifica servizio registrato**, modificare l’indirizzo URL del servizio con lo stesso indirizzo URL, ma contenente l’indirizzo IP virtuale.
     * Ripetere questi passaggi per tutti i servizi elencati nella finestra.
  3. Nella stessa finestra, fare clic su **Rete**. 
     * Nella finestra **Configurazione di rete**, modificare l’indirizzo URL del server con lo stesso indirizzo URL, ma contenente l’indirizzo IP virtuale.


![Impostare l’indirizzo IP virtuale negli URL e nel Milestone Management Client](/wp-content/uploads/2022/07/milestone-url-vip.png)


### 12. Nel desktop del nodo 1 con Milestone Management Client, impostare i ruoli di amministratore per garantire un failover corretto {#role}


![Nota](/wp-content/uploads/2022/07/note.png)


Se l’autenticazione Windows Milestone è stata configurata con un Active Directory, l’utente/password verrà recuperato nell’AD esterno sul nodo secondario dopo un failover, quindi non è necessaria alcuna configurazione speciale.

Quando si avvia Milestone XProtect Management Client, è necessario eseguire l’autenticazione con "Autenticazione Windows " o "Autenticazione di base" ([fare clic qui per visualizzare lo screenshot](</wp-content/uploads/2022/07/milestone-management-server-connect.png>)).

Aprire **Milestone XProtect Management Client** e andare su **Sicurezza/Ruoli** (vedere immagine)

  * Impostare il gruppo Windows **BUILTIN\Administrators**. In questo modo, un utente amministratore sul secondario potrà connettersi a Milestone sul secondario con "autenticazione Windows ".
  * Creare un utente con "Autenticazione di base" (**Admin** nell’immagine) per assicurarsi di eseguire nuovamente l’autenticazione sul nodo secondario dopo un failover. Per l’"Autenticazione di base", l’utente/password viene archiviato nel database SQL e verrà recuperato sul nodo secondario dopo un failover.


![Avvertenza](/wp-content/uploads/2022/07/warning-small.png)


Impostando il gruppo BUILTIN\Administrators, sarà possibile eseguire l’autenticazione sul nodo secondario con un amministratore locale Windows.

Altrimenti, dopo un failover, non sarà possibile eseguire l’autenticazione con un account Windows locale sul server secondario.

Questo accade perché il gruppo BUILTIN\Administrators ha lo stesso SID su entrambi i nodi. Per altri gruppi locali o utenti locali, l’autenticazione non sarà possibile sul secondario perché i SID sono diversi tra i due nodi, anche se hanno lo stesso nome.


![Impostare i ruoli nel Management Client Milestone](/wp-content/uploads/2022/07/milestone-management-server-roles.png)


### 13. Andare al desktop del nodo 2 e impostare l’indirizzo IP virtuale nei file interni Milestone {#milestone-files-2}


![Nota](/wp-content/uploads/2022/07/note.png)


A partire da Milestone 2022 R3, questo passaggio non è utile e verrà eseguito automaticamente con " Server Configurator - Registrazione server - http://virtual-IP" in un passaggio successivo.

In una riga di comando di Powershell come Amministratore, eseguire questo script sul nodo 2:
    
    
    c:/safekit/modules/milestone/bin/UpdateAuthServerUri.ps1


![Nota](/wp-content/uploads/2022/07/note.png)


Questo script imposta l’indirizzo IP virtuale in 2 file interni Milestone:
    
    
    C:\ProgramData\Milestone\XProtect Management Server\ServerConfig.xml
    
    
        <AuthorizationServerUri>http://**< <virtual-ip>**/IDP</AuthorizationServerUri>
    
    
    C:\Program Files\Milestone\XProtect Management Server\IIS\IDP\appsettings.json
    
    
        "Authority": " http://**< <virtual-ip>**/IDP"

### 14. Nel desktop del nodo 2, registrare il server di gestione sull’indirizzo IP virtuale {#14-in-the-desktop-of-node-2-register-the-management-server-on-the-vitual-ip-address}

  * Selezionare **Server Configurator** nella barra delle applicazioni del nodo 2 e registrarlo sull’indirizzo IP virtuale (vedere immagine).
  * Quindi **arrestare il servizio del server di gestione**.


![Avvertenza](/wp-content/uploads/2022/07/warning-small.png)


L’account dell’utente che esegue la registrazione sul nodo 2 deve disporre del ruolo di amministratore in Milestone sul nodo 1.

Se è l’amministratore locale sul nodo 2 che effettua la registrazione, il gruppo Windows integrato `BUILTIN\Administrators` deve essere stato impostato in Management Client / Sicurezza / Ruoli al [Passaggio 12](#role) Altrimenti la registrazione non funzionerà.


![Nota](/wp-content/uploads/2022/07/note.png)


Questa procedura registra il server di gestione del nodo 2 nel database SQL (in esecuzione sul nodo 1) tramite una connessione all’indirizzo virtuale.


![Avvertenza](/wp-content/uploads/2022/07/warning-small.png)


Con una versione di Milestone precedente alla 2022 R3, la registrazione potrebbe aver eliminato la configurazione dell’indirizzo IP virtuale nei file interni Milestone. In questo caso, ripetere [il passaggio 13](#milestone-files-2).


![Registrare il server di gestione con Milestone 2020+](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 15. Avviare il nodo 2 {#15-start-node-2}

  * Avviare il nodo 2 con il suo menu contestuale.
  * Attendere il SECOND stato (verde).


![Nota](/wp-content/uploads/2022/07/note.png)


Il nodo 2 rimane nel SECOND stato (magenta) durante la risincronizzazione delle directory replicate (copia dal nodo 1 al nodo 2).

Questa operazione potrebbe richiedere del tempo, a seconda delle dimensioni dei file da risincronizzare nelle directory replicate e della larghezza di banda della rete.

Per visualizzare l’avanzamento della copia, consultare il registro del modulo del nodo 2 con l’opzione dettagliata, senza dimenticare di aggiornare la finestra.


![Il primo nodo inizia come primario e diventa ALONE](/wp-content/uploads/2022/07/appli-11.png)


### 16. Verificare che il cluster sia operativo {#16-verify-that-the-cluster-is-operational}

  * Verificare che il cluster sia verde/verde con i servizi in esecuzione sul nodo PRIM e non in esecuzione sul nodo SECOND.


In questo stato, solo le modifiche all’interno dei file vengono replicate in tempo reale.


![Avvertenza](/wp-content/uploads/2022/07/warning-small.png)


I componenti che sono client di servizi devono essere configurati con l’indirizzo IP virtuale. La configurazione può essere eseguita con un nome DNS (se è stato creato un nome DNS e associato all’indirizzo IP virtuale).


![Il secondo nodo inizia come SECOND](/wp-content/uploads/2022/07/appli-12.png)


### 17. Configurare l’indirizzo IP virtuale nei server di registrazione {#17-configure-the-virtual-ip-address-in-recording-servers}

  * Installare i server di registrazione, specificando l’indirizzo IP virtuale nell’URL di installazione.
  * Oppure, sul lato dei server di registrazione, impostare l’indirizzo IP virtuale nei seguenti campi di 
        
        C:\ProgramData\Milestone\XProtect Recording Server\RecorderConfig.xml
        
            <server><address>
        
            <server><authorizationserveraddress>

  * Connettere il Milestone Management Client e il Milestone Smart Client all’indirizzo IP virtuale.


### 18. Management Client e Smart Client non funzionano correttamente dopo il cambio di nodo {#18-management-client-and-smart-client-are-not-functioning-properly-after-node-switch}

In una configurazione clusterizzata di XProtect Management Server, Smart Client e Management Client mostrano vari problemi dopo un cambio di nodo. Il problema è legato ai token generati su nodi diversi prima e dopo il cambio di nodo e a problemi di accesso a determinati certificati necessari per la convalida dei token. È disponibile una soluzione (per le versioni da 2022 R3 a 2023 R2, consultare la Knowledge Base Milestone).

Il problema è stato risolto in Milestone 2023 R3.

### 18. Test {#18-testing}

  * Arrestare il nodo PRIM scorrendo il menu contestuale e facendo clic su Arresta. **Non utilizzare lo swap per un primo test** (vedi il motivo di seguito).
  * Verificare che sia presente un failover sul SECOND nodo, che dovrebbe diventare ALONE (verde).
  * E con Microsoft Management Console (MMC), controllare il failover dei servizi (arrestati sul nodo 1 nello script `stop_prim` e avviati sul nodo 2 nello script `start_prim`).


![Avvertenza](/wp-content/uploads/2022/07/warning-small.png)


Se il sistema è PRIM-SECOND e tutto funziona correttamente, eseguire un arresto su PRIM e verificare che tutto funzioni correttamente su node2, che diventa ALONE. Se tutto è a posto, avviare un avvio su node1, che risincronizzerà le directory replicate da node2.

Se le cose vanno male, arrestare node2 e forzare l’avvio come primario di node1, che si riavvierà con i suoi dati localmente integri al momento dell’arresto.

Lo swap comporta un arresto e un avvio del PRIM, che risincronizzerà i dati da node2 immediatamente dopo l’arresto, senza lasciare alcuna possibilità di un riavvio su dati integri in caso di problemi di configurazione della replica.


![Avvertenza](/wp-content/uploads/2022/07/warning-small.png)


Se l’applicazione non viene avviata sul nodo 2 mentre lo stato è ALONE (verde), controllare i messaggi di output dello script `start_prim` nel registro applicazioni del nodo 2.


![Avvertenza](/wp-content/uploads/2022/07/warning-small.png)


Se ALONE (verde) non viene raggiunto, analizzare il motivo con il registro del modulo del nodo 2.


![Nota](/wp-content/uploads/2022/07/note.png)


Maggiori informazioni sui test nella Guida per l’utente


![Arrestare il modulo sul server PRIM](/wp-content/uploads/2022/07/appli-19.png)