---
title: "Vecchia configurazione SafeKit Milestone"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-old-milestone-configuration/"
category: "quick-install"
lang: "it"
topics: "Vecchia procedura di configurazione passo passo della soluzione SafeKit / Milestone XProtect"
---

# Vecchia configurazione SafeKit Milestone {#old-safekit-milestone-configuration}

## Vecchia configurazione passo passo della soluzione SafeKit / Milestone XProtect {#old-step-by-step-configuration-of-the-safekit--milestone-xprotect-solution}


Avviso ![ ](/wp-content/uploads/2022/07/warning-small.png)


Attenzione: per configurare l'indirizzo IP virtuale sono necessari alcuni passaggi specifici, altrimenti il failover non funzionerà.

### 1. Avviare la console SafeKit {#1-launch-the-safekit-console}

  * Avvia la console web in un browser su un nodo del cluster connettendoti a `http://localhost:9010` .
  * Inserisci `admin` come nome utente e la password definita durante l'installazione.


È inoltre possibile eseguire la console in un browser su una workstation esterna al cluster.


Avviso ![ ](/wp-content/uploads/2022/07/warning-small.png)


La configurazione di SafeKit viene effettuata su entrambi i nodi da un unico browser.


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Per proteggere la console web, consultare la sezione "Protezione della console web SafeKit " nella Guida per l'utente.


![ Avviare la console web SafeKit per configurare il cluster ](/wp-content/uploads/2023/01/appli-1.png)


### 2. Configurare gli indirizzi dei nodi {#2-configure-node-addresses}

  * Inserire gli indirizzi IP dei nodi.
  * Quindi, fai clic su `Apply` per salvare la configurazione.


Avviso ![ ](/wp-content/uploads/2022/07/warning-small.png)


Se lo sfondo del nodo 1 o del nodo 2 è rosso, verificare la connettività del browser a entrambi i nodi e controllare il firewall su entrambi i nodi per la risoluzione dei problemi.


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Questa operazione inserirà gli indirizzi IP nel file `cluster.xml` su entrambi i nodi (maggiori informazioni nella guida all'uso della riga di comando).


![ Inserire i nodi del cluster ](/wp-content/uploads/2023/01/appli-3.png)


### 3. Selezionare il modulo {#3-choose-the-module}

  * Nella scheda Configurazione, fai clic sul modulo .safe.


Nota ![ ](/wp-content/uploads/2022/07/note.png)


La console trova xxx.safe nella directory 'Application_Modules/demo/' sul lato server se hai inserito un modulo in quella posizione durante l'installazione.


![ Selezionare il modulo per ](/wp-content/uploads/2023/01/appli-4.png)


### 4. Configurare il modulo {#4-configure-the-module}

  * Selezionare l'avvio automatico del modulo all'accensione, senza ritardo.
  * Normalmente, si dispone di un'unica rete heartbeat su cui avviene la replica. Tuttavia, è possibile definire una rete privata, se necessario.
  * Verificare che le directory replicate siano installate su entrambi i nodi e contengano i dati dell'applicazione.  
Per un database è necessaria la replica dei dati e dei log.  
È possibile aggiungere nuove directory replicate in base alle necessità.
  * Inserisci un indirizzo IP virtuale. Un indirizzo IP virtuale è un indirizzo IP standard appartenente alla stessa rete IP (stessa sottorete) degli indirizzi IP di entrambi i nodi.  
I client dell'applicazione devono essere configurati con l'indirizzo IP virtuale (o con il nome DNS associato all'indirizzo IP virtuale).  
L'indirizzo IP virtuale viene commutato automaticamente in caso di guasto.
  * `start_prim` e `stop_prim` devono contenere le funzioni di avvio e arresto dell'applicazione.  
È possibile aggiungere nuovi servizi a questi script.  
Verifica che i nomi dei servizi in questi script corrispondano a quelli installati su entrambi i nodi; in caso contrario, modificali negli script stessi.
  * Arrestare i servizi configurati in `start_prim` su entrambi i nodi.
  * Su Windows e su entrambi i nodi, con il gestore dei servizi Windows , impostare `Boot Startup Type = Manual` per tutti i servizi registrati in `start_prim` ( SafeKit controlla l'avvio dei servizi in `start_prim` ).


Avviso ![ ](/wp-content/uploads/2022/07/warning-small.png)


Se SQL si trova sul server di gestione:

  * I database di sistema SQL [ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/system-databases>) (come master.mdf e mastlog.ldf) devono trovarsi nelle stesse directory su entrambi i nodi. Le directory devono essere configurate come replicate.
  * SQL deve essere installato nella stessa posizione del file system su entrambi i nodi, poiché il database di risorse SQL di sola lettura [ ](<https://learn.microsoft.com/en-us/sql/relational-databases/databases/resource-database>) si trova nel file binario ed è necessario per il failover. Questo database non necessita di essere replicato.
  * I database SQL Milestone (.mdf e .ldf) devono trovarsi nelle stesse directory su entrambi i nodi. Le directory devono essere configurate come replicate. I database Milestone sono i seguenti, secondo questo articolo [ ](<https://doc.milestonesys.com/xprotect/xprotect-management-client/2026r1/en/change-the-location-and-name-of-a-sql-server-database.html>) .


Avviso ![ ](/wp-content/uploads/2022/07/warning-small.png)


Si noti che se un nome di processo viene visualizzato in Process Checker, verrà monitorato con un'azione di riavvio in caso di errore. La configurazione di un nome di processo errato causerà l'arresto del modulo subito dopo l'avvio.


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Il pulsante "Applica" segnalerà la configurazione nei file `userconfig.xml` , `start_prim` e `stop_prim` su entrambi i nodi (maggiori informazioni nella guida all'uso della riga di comando).


![ Inserire le impostazioni del modulo ](/wp-content/uploads/2023/01/appli-7-1.png)


### 5. Verificare la corretta configurazione {#5-verify-successful-configuration}

  * Verifica la presenza del messaggio di successo (verde) su entrambi i nodi e fai clic su Avanti.


![ Verifica il successo della configurazione del modulo ](/wp-content/uploads/2023/01/appli-9-2.png)


### 6. Non avviare nulla e fai clic sul pulsante Chiudi {#6-do-not-start-anything-and-click-on-the-close-button}


Avviso ![ ](/wp-content/uploads/2022/07/warning-small.png)


Non avviare nulla e fai clic sul pulsante Chiudi perché è necessaria una configurazione speciale sull'indirizzo IP virtuale prima di iniziare


![ Seleziona il nodo con i dati aggiornati ](/wp-content/uploads/2023/01/appli-10-1.png)


### 7. Accedere al desktop del nodo 1 e impostare l'indirizzo IP virtuale nei file interni Milestone {#milestone-files}


Nota ![ ](/wp-content/uploads/2022/07/note.png)


A partire dalla Milestone 2022 R3, questo passaggio non è utile e verrà eseguito automaticamente con "Configuratore server - Registrazione server - http://virtual-IP" in una fase successiva.

In una finestra di comando di PowerShell con privilegi di amministratore, eseguire il seguente script sul nodo 1:
    
    
    c: /safekit/modules / /bin/UpdateAuthServerUri.ps1


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Questo script imposta l'indirizzo IP virtuale in 2 file interni Milestone :
    
    
    C:\ProgramData\ Milestone \ Server di gestione XProtect \ ServerConfig.xml
    
    
        <AuthorizationServerUri> /IDP</AuthorizationServerUri> http://** < virtual-ip> **
    
    
    C:\Program Files\ Milestone \ XProtect Management Server\ IIS \IDP\appsettings.json
    
    
        "Autorità": " http://**< virtual-ip>** /IDP "


Avviso ![ ](/wp-content/uploads/2022/07/warning-small.png)


A questo punto si presume che l'indirizzo IP virtuale sia stato configurato correttamente nei passaggi precedenti (lo script utilizza l'indirizzo IP virtuale inserito nella console SafeKit e memorizzato in `userconfig.xml` ).


Nota ![ ](/wp-content/uploads/2022/07/note.png)


### 8. Avviare il nodo 1 come primario nella console, il nodo con i dati aggiornati {#8-start-node-1-as-primary-in-the-console-the-node-with-up-to-date-data}

Presupponiamo, a partire dal passaggio 7, che il nodo 1 disponga delle directory replicate aggiornate.

Forza l'avvio del nodo 1 come primario. Quando il nodo 2 verrà avviato, tutti i dati del nodo 1 verranno copiati nel nodo 2.


Avviso ![ ](/wp-content/uploads/2022/07/warning-small.png)


Se si effettua la scelta sbagliata, si corre il rischio di sincronizzare dati obsoleti su entrambi i nodi.


Avviso ![ ](/wp-content/uploads/2022/07/warning-small.png)


Si presume inoltre che l'applicazione sia arrestata sul nodo 1 in modo che SafeKit installi i meccanismi di replica e quindi avvii l'applicazione nello script `start_prim` .


![ Forza l'avvio come primario del nodo con i dati aggiornati ](/wp-content/uploads/2022/07/appli-11-bis.png)


### 9. Attendi la transizione a SOLO (verde) {#9-wait-for-the-transition-to-alone-green}

  * Il nodo 1 dovrebbe raggiungere lo stato ALONE (verde), il che significa che lo script `start_prim` è stato eseguito sul nodo 1.


Avviso ![ ](/wp-content/uploads/2022/07/warning-small.png)


Se lo stato è ALONE (verde) e l'applicazione non è avviata, controllare i messaggi di output di `start_prim` nel registro applicazioni del nodo 1.


Avviso ![ ](/wp-content/uploads/2022/07/warning-small.png)


Se il nodo 1 non raggiunge lo stato ALONE (verde), analizza il motivo consultando il registro del modulo del nodo 1.


Avviso ![ ](/wp-content/uploads/2022/07/warning-small.png)


Se il cluster si trova nello stato `WAIT (red) not uptodate - STOP (red) not uptodate` , arresta il nodo WAIT e forza il suo avvio come primario.


![ Il primo nodo inizia come primario e diventa SOLO ](/wp-content/uploads/2022/07/appli-11-bis-bis.png)


### 10. Sul desktop del nodo 1, arrestare, quindi registrarsi sull'indirizzo IP virtuale e riavviare il server di gestione Milestone {#10-in-the-desktop-of-node-1-stop-then-register-on-the-vitual-ip-address-and-restart-the-milestone-management-server}

Eseguire i seguenti punti elenco sul nodo 1 secondo il menu mostrato nell'immagine:

  * Fai clic con il pulsante destro del mouse sull'icona del server di gestione **Milestone** nella barra delle applicazioni.
  * **Arresta il servizio del server di gestione**
  * Quindi selezionare **Server Configurator...** e registrare l'indirizzo IP virtuale.
  * **Avvia il servizio del server di gestione**


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Questa procedura registra il server di gestione del nodo 1 nel database SQL (in esecuzione sul nodo 1) tramite una connessione all'indirizzo virtuale.


Avviso ![ ](/wp-content/uploads/2022/07/warning-small.png)


Prima della versione Milestone 2022 R3, la registrazione potrebbe aver eliminato la configurazione dell'indirizzo IP virtuale nei file interni Milestone . In questo caso, ripetere il passaggio 7 [ ](#milestone-files) .


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Nota: per registrare una versione precedente Milestone 2020 R2, utilizzare **Modifica le impostazioni di crittografia...**


![ Registra il server di gestione in Milestone 2020+ ](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 11. Sul desktop del nodo 1 con il client di gestione Milestone , impostare l'indirizzo IP virtuale negli URL per i servizi e la rete {#11-in-the-desktop-of-node-1-with-milestone-management-client-set-the-virtual-ip-address-in-urls-for-services-and-network}


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Dalla Milestone 2022 R3, questo passaggio non è utile ed è stato eseguito automaticamente con "Server Configurator - Registrazione dei server - http://virtual-IP".

Secondo l'immagine:

  1. Avviare **Milestone XProtect Client di gestione** sul nodo 1.
  2. Nel menu **Strumenti** , selezionare **Servizi registrati** . 
     * Nella finestra **Aggiungi/Rimuovi servizi registrati** , seleziona un servizio dall'elenco e fai clic su **Modifica** .
     * Nella finestra **Modifica servizio registrato** , sostituire l'indirizzo URL del servizio con lo stesso indirizzo URL, ma contenente l'indirizzo IP virtuale.
     * Ripeti questi passaggi per tutti i servizi elencati nella finestra.
  3. Nella stessa finestra, fare clic su **Rete** . 
     * Nella finestra **Configurazione di rete** , sostituire l'indirizzo URL del server con lo stesso indirizzo URL, ma contenente l'indirizzo IP virtuale.


![ Imposta l'indirizzo IP virtuale negli URL e nel client di gestione Milestone ](/wp-content/uploads/2022/07/milestone-url-vip.png)


### 12. Sul desktop del nodo 1 con client di gestione Milestone , impostare i ruoli di amministratore per garantire un failover corretto {#role}


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Se l'autenticazione Milestone " Windows " è stata configurata con un Active Directory, dopo un failover le credenziali di accesso (nome utente/password) verranno recuperate nell'AD esterno sul nodo secondario, quindi non è necessaria alcuna configurazione particolare.

Quando si avvia il client di gestione Milestone XProtect , è necessario autenticarsi con "autenticazione Windows " o "autenticazione di base" ( [ clicca qui per vedere lo screenshot ](</wp-content/uploads/2022/07/milestone-management-server-connect.png>) ).

Aprire **Milestone XProtect Client di gestione** e in **Sicurezza / Ruoli** (vedi immagine)

  * Impostare il gruppo Windows **BUILTIN\Administrators** . In questo modo, un utente amministratore sul server secondario sarà in grado di connettersi a Milestone sul server secondario con l'autenticazione " Windows ".
  * Creare un utente con "autenticazione di base" ( **Admin** nell'immagine) per essere sicuri di riautenticarsi sul nodo secondario dopo un failover. Per l'"autenticazione di base", nome utente e password vengono memorizzati nel database SQL e recuperati sul nodo secondario dopo un failover.


Avviso ![ ](/wp-content/uploads/2022/07/warning-small.png)


Impostando il gruppo BUILTIN\Administrators, sarà possibile autenticarsi sul nodo secondario con un amministratore locale Windows .

Altrimenti, dopo un failover, non sarà possibile autenticarsi con un account locale Windows sul server secondario.

Questo accade perché il gruppo BUILTIN\Administrators ha lo stesso SID su entrambi i nodi. Per altri gruppi locali o utenti locali, l'autenticazione non sarà possibile sul nodo secondario perché i SID sono diversi tra i due nodi, anche se hanno lo stesso nome.


![ Imposta i ruoli nel client di gestione Milestone ](/wp-content/uploads/2022/07/milestone-management-server-roles.png)


### 13. Accedere al desktop del nodo 2 e impostare l'indirizzo IP virtuale nei file interni Milestone {#milestone-files-2}


Nota ![ ](/wp-content/uploads/2022/07/note.png)


A partire dalla Milestone 2022 R3, questo passaggio non è utile e verrà eseguito automaticamente con "Configuratore server - Registrazione server - http://virtual-IP" in una fase successiva.

In una finestra di comando di PowerShell con privilegi di amministratore, eseguire il seguente script sul nodo 2:
    
    
    c: /safekit/modules/milestone/bin/UpdateAuthServerUri.ps1


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Questo script imposta l'indirizzo IP virtuale in 2 file interni Milestone :
    
    
    C:\ProgramData\ Milestone \ Server di gestione XProtect \ ServerConfig.xml
    
    
        <AuthorizationServerUri> /IDP</AuthorizationServerUri> http://** < virtual-ip> **
    
    
    C:\Program Files\ Milestone \ XProtect Management Server\ IIS \IDP\appsettings.json
    
    
        "Autorità": " http://**< virtual-ip>** /IDP "

### 14. Sul desktop del nodo 2, registrare il server di gestione sull'indirizzo IP virtuale {#14-in-the-desktop-of-node-2-register-the-management-server-on-the-vitual-ip-address}

  * Selezionare **Server Configurator** nella barra delle applicazioni del nodo 2 e registrarlo sull'indirizzo IP virtuale (vedere l'immagine).
  * Quindi **Arresta il servizio del server di gestione** .


Avviso ![ ](/wp-content/uploads/2022/07/warning-small.png)


L'account dell'utente che esegue la registrazione sul nodo 2 deve avere il ruolo di amministratore in Milestone sul nodo 1.

Se la registrazione viene effettuata dall'amministratore locale sul nodo 2, il gruppo predefinito Windows `BUILTIN\Administrators` deve essere stato impostato in Client di gestione / Sicurezza / Ruoli al passaggio 12 [ ](#role) . In caso contrario, la registrazione non funzionerà.


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Questa procedura registra il server di gestione del nodo 2 nel database SQL (in esecuzione sul nodo 1) tramite una connessione all'indirizzo virtuale.


Avviso ![ ](/wp-content/uploads/2022/07/warning-small.png)


Con una versione di Milestone precedente alla 2022 R3, la registrazione potrebbe aver eliminato la configurazione dell'indirizzo IP virtuale nei file interni Milestone . In questo caso, ripetere il passaggio 13 [ ](#milestone-files-2) .


![ Registra il server di gestione con Milestone 2020+ ](/wp-content/uploads/2022/07/milestone-management-server-register-2020.png)


### 15. Avvia il nodo 2 {#15-start-node-2}

  * Avvia il nodo 2 tramite il suo menu contestuale.
  * Attendi il SECONDO stato (verde).


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Il nodo 2 rimane nello stato SECONDO (magenta) durante la risincronizzazione delle directory replicate (copia dal nodo 1 al nodo 2).

Questa operazione potrebbe richiedere del tempo, a seconda delle dimensioni dei file da risincronizzare nelle directory replicate e della larghezza di banda della rete.

Per visualizzare l'avanzamento della copia, consultare il registro del modulo del nodo 2 con l'opzione dettagliata, ricordandosi di aggiornare la finestra.


![ Il primo nodo inizia come primario e diventa SOLO ](/wp-content/uploads/2022/07/appli-11.png)


### 16. Verificare che il cluster sia operativo {#16-verify-that-the-cluster-is-operational}

  * Verificare che il cluster sia verde/verde con i servizi in esecuzione sul nodo PRIM e non sul nodo SECOND.


In questo stato, vengono replicate in tempo reale solo le modifiche apportate all'interno dei file.


Avviso ![ ](/wp-content/uploads/2022/07/warning-small.png)


I componenti che fungono da client dei servizi devono essere configurati con l'indirizzo IP virtuale. La configurazione può essere effettuata tramite un nome DNS (se è stato creato un nome DNS e associato all'indirizzo IP virtuale).


![ Il secondo nodo inizia come SECONDO ](/wp-content/uploads/2022/07/appli-12.png)


### 17. Configurare l'indirizzo IP virtuale nei server di registrazione {#17-configure-the-virtual-ip-address-in-recording-servers}

  * Installare i server di registrazione specificando l'indirizzo IP virtuale nell'URL di installazione.
  * Oppure, sul lato dei server di registrazione, impostare l'indirizzo IP virtuale nei seguenti campi di 
        
        C:\ProgramData\ Milestone \ XProtect Server di registrazione\ RecorderConfig.xml
        
            <server> <address>
        
            <server> <authorizationserveraddress>

  * Collega il client di gestione Milestone e lo Smart Client Milestone all'indirizzo IP virtuale.


### 18. Management Client e Smart Client non funzionano correttamente dopo il cambio di nodo {#18-management-client-and-smart-client-are-not-functioning-properly-after-node-switch}

In una configurazione cluster del Management Server XProtect , Smart Client e Management Client presentano diversi problemi dopo un cambio di nodo. Il problema è legato alla generazione di token su nodi diversi prima e dopo il cambio di nodo, nonché a difficoltà di accesso ad alcuni certificati necessari per la convalida dei token. È disponibile una soluzione (per le versioni da 2022 R3 a 2023 R2, consultare l'articolo della Knowledge Base Milestone ).

Il problema è stato risolto nella Milestone 2023 R3.

### 18. Test di {#18-testing}

  * Arresta il nodo PRIM scorrendo verso il basso il suo menu contestuale e facendo clic su Arresta. **Non utilizzare lo scambio per un primo test** (vedi il motivo di seguito).
  * Verificare che sia presente un failover sul SECONDO nodo, che dovrebbe diventare SOLO (verde).
  * E tramite la console di gestione Microsoft (MMC), verificare il failover dei servizi (arrestati sul nodo 1 nello script `stop_prim` e avviati sul nodo 2 nello script `start_prim` ).


Avviso ![ ](/wp-content/uploads/2022/07/warning-small.png)


Se il sistema è PRIM-SECOND e tutto funziona correttamente, arresta il PRIM e verifica che tutto funzioni correttamente sul nodo2, che diventa ALONE. Se tutto è a posto, avvia il nodo1, che risincronizzerà le directory replicate dal nodo2.

Se qualcosa va storto, arresta il nodo2 e forza l'avvio come primario del nodo1, che si riavvierà con i dati locali integri presenti al momento dell'arresto.

Lo scambio comporta un arresto e un riavvio del PRIM, che risincronizzerà immediatamente i dati dal nodo 2 dopo l'arresto, senza lasciare alcuna possibilità di riavvio su dati integri in caso di problemi di configurazione della replica.


Avviso ![ ](/wp-content/uploads/2022/07/warning-small.png)


Se l'applicazione non si avvia sul nodo 2 mentre lo stato è ALONE (verde), controllare i messaggi di output dello script `start_prim` nel registro applicazioni del nodo 2.


Avviso ![ ](/wp-content/uploads/2022/07/warning-small.png)


Se non si raggiunge lo stato ALONE (verde), analizzare il motivo consultando il registro del modulo del nodo 2.


Nota ![ ](/wp-content/uploads/2022/07/note.png)


Maggiori informazioni sui test sono disponibili nella Guida per l'utente.


![ Arresta il modulo sul server PRIM ](/wp-content/uploads/2022/07/appli-19.png)