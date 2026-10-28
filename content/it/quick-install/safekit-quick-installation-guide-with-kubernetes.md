---
title: "Alta disponibilità K3S con SafeKit : installare il modulo k3s.safe per il failover"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-with-kubernetes/"
description: "Distribuisci il modulo k3s.safe per SafeKit per abilitare la replica sincrona in tempo reale e il failover automatico di Kubernetes su Linux . Questa guida illustra la configurazione di un cluster SANless a 2 nodi per applicazioni critiche Linux senza storage condiviso."
category: "quick-install"
lang: "it"
topics: "Guida rapida all'installazione dell'alta disponibilità per Kubernetes , Limitazioni dell'alta disponibilità SafeKit , Panoramica della soluzione SafeKit / Kubernetes , Installazione e configurazione della soluzione SafeKit / Kubernetes su Linux ( k3s.safe ), Quali sono i diversi scenari in caso di isolamento di rete in un cluster?, Dimostrazione della soluzione SafeKit mirror , 🔍 Hub di navigazione per l'alta disponibilità SafeKit"
---

# Alta disponibilità K3S con SafeKit : installare il modulo k3s.safe per il failover {#k3s-high-availability-with-safekit-install-the-k3ssafe-module-for-failover}


{{%  insert-safekit-mirror-guide-it app="Kubernetes" mod="k3s"  %}}
 

## Panoramica della soluzione SafeKit / Kubernetes {#overview-of-the-safekit--kubernetes-solution}

La soluzione è descritta qui: **💡 [ Kubernetes Alta disponibilità di K3s: replica sincrona a 2 nodi e failover ](</it/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/>)**

## Installazione e configurazione della soluzione SafeKit / Kubernetes su Linux ( k3s.safe ) {#installation-and-configuration-of-the-safekit--kubernetes-solution-on-linux-k3ssafe}

### 1. Scarica i pacchetti {#1-download-packages}

  * Scarica la versione gratuita di SafeKit 8.2 su Linux (safekitlinux_xx.bin)
  * Scarica il modulo k3s.safe Linux
  * Scarica lo script k3sconfig.sh
  * Documentazione (pptx)


Nota: lo script k3sconfig.sh installa K3S, MariaDB , NFS, SafeKit su 2 nodi Linux Ubuntu 24.04.

[ Scarica SafeKit ( Linux ) > ](</it/resources/safekit-free-trial/>)

<a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s.safe" download="k3s.safe"> Scarica k3s.safe ( Linux ) > </a> 

[ Scarica k3sconfig.sh > ](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3sconfig.sh>)

Documentazione [ (pdf) > ](</wp-content/uploads/documents/safekit-k3s-en.pdf>)

### 2. Innanzitutto su entrambi i nodi {#2-first-on-both-nodes}

Su 2 nodi Linux Ubuntu 24.04, come root:

  * Assicurarsi che il nodo abbia accesso a Internet (anche tramite un proxy).
  * Copia k3sconfig.sh , k3s.safe e il pacchetto safekit_xx.bin in una directory e accedi ad essa tramite il comando cd.
  * Rinominare il file .bin in "safekit.bin"
  * Assicurati che k3sconfig.sh e safekit.bin siano eseguibili.
  * Modifica lo script k3sconfig.sh e personalizza le variabili d'ambiente in base al tuo ambiente (incluso un IP virtuale).
  * Eseguire su entrambi i nodi: `./k3sconfig.sh prereq`


Lo script:

  * Installa i pacchetti Debian necessari: alien, nfs-kernel-server, nfs-common, mariadb-server
  * Installazione sicura di MariaDB
  * Creare directory per la replica dei file
  * Preparare il server NFS per la condivisione delle directory replicate
  * Installare SafeKit


### 3. Sul primo nodo {#3-on-the-first-node}

Eseguire sul primo nodo: `./k3sconfig.sh first`

Lo script:

  * Creare il database di configurazione K3S e l'utente k3s
  * Crea il file del volume di archiviazione replicato (file sparse) e formattalo come filesystem xfs
  * Crea la configurazione del cluster SafeKit e applicala
  * Installare e configurare il modulo k3s.safe sul cluster.
  * Avvia il modulo k3s come "prim" sul primo nodo
  * Scarica, installa e avvia k3s
  * Scarica e installa il chart Helm nfs-subdir-external-provisioner
  * Visualizza il token K3S (da utilizzare durante la fase di installazione del secondo nodo)


### 4. Sul secondo nodo {#4-on-the-second-node}

Eseguire sul secondo nodo: `./k3sconfig.sh second <token>`

  * <token> è la stringa visualizzata al termine dell'esecuzione di " k3sconfig.sh first" sul primo nodo


Lo script:

  * Assicurati che il modulo k3s sia avviato come prim sul primo nodo
  * Installa k3s sul secondo nodo
  * Avvia il modulo k3s


### 5. Verificare che il modulo k3s SafeKit sia in esecuzione su entrambi i nodi {#5-check-that-the-k3s-safekit-module-is-running-on-both-nodes}

Esegui il comando `/opt/safekit/safekit –H "*" state` su entrambi i nodi:

La risposta dovrebbe essere simile all'immagine.
    
    
    /opt/safekit/safekit –H " * " stato
    ---------------- Server= http://10.0.0.20:9010 ----------------
    azione amministrativa=esegui
    --------------------- Stato k3s ---------------------
    
      Locale (127.0.0.1): PRIM (Servizio: Disponibile) (Colore: Verde)
    Successo
    ---------------- Server= http://10.0.0.21:9010 ----------------
    azione amministrativa=esegui
    --------------------- Stato k3s ---------------------
    
      Locale (127.0.0.1): SECONDO (Servizio: Disponibile) (Colore: Verde)
    Successo
    

### 6. Avviare la console web SafeKit per amministrare il cluster {#6-start-the-safekit-web-console-to-administer-the-cluster}

  * Collega un browser all'URL della console web SafeKit , `http://server0-IP:9010` .
  * Dovresti visualizzare una pagina simile all'immagine.
  * Verificare tramite le righe di comando Linux che K3S sia avviato su entrambi i nodi (avviato in `start_prim` e `start_second` ) e che MariaDB sia avviato sul nodo primario (avviato in `start_prim` ).


![ Kubernetes cluster avviato nella console web SafeKit ](/wp-content/uploads/2024/03/14-monitoring-prim-second.png)


### 7. Test di {#7-testing}

  * Arresta il nodo PRIM scorrendo verso il basso il suo menu contestuale e facendo clic su `Stop` .
  * Verificare che sia presente un failover sul SECONDO nodo, che dovrebbe diventare SOLO (verde).
  * E tramite riga di comando su Linux , verificare il failover dei servizi (arrestati sul nodo 1 nello script `stop_prim` e avviati sul nodo 2 nello script `start_prim` ). MariaDB e K3S dovrebbero essere in esecuzione sul nodo 2.


Avviso ![ ](/wp-content/uploads/2022/07/warning-small.png)


Se lo stato ALONE (verde) non viene raggiunto sul nodo 2, analizzare il motivo consultando il log del modulo del nodo 2.

  * Fare clic su `node2` per visualizzare il registro del modulo.
  * Esempio [ di un log del modulo SQL Server ](</wp-content/uploads/2024/03/24-module-log-script.png>) in cui il nome del servizio in `start_prim` non è valido. Il processo sqlserver.exe è monitorato ma poiché non viene avviato, alla fine il modulo si arresta.


Avviso ![ ](/wp-content/uploads/2022/07/warning-small.png)


Se tutto è a posto, avvia un'operazione sul nodo1, che risincronizzerà le directory replicate dal nodo2.

Se qualcosa va storto, arresta il nodo2 e [ forza l'avvio come primario ](</wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png>) del nodo1, che si riavvierà con i suoi dati locali integri al momento dell'arresto.


Nota ![ ](/wp-content/uploads/2022/07/note.png)


🛠️ [ Maggiori informazioni sui test nella Guida per l'utente. ](</it/resources/safekit-user-guide-82/#tests>)


![ Arresta il modulo sul server PRIM ](/wp-content/uploads/2024/03/16-monitoring-prim-second-stop.png)


### 8. Prova il cluster con un'applicazione Kubernetes come WordPress {#8-try-the-cluster-with-a-kubernetes-application-like-wordpress}

Nell'immagine è riportato un esempio di installazione di WordPress: un portale web con un database di backend implementato tramite pod.

È possibile distribuire la propria applicazione allo stesso modo.

WordPress è automaticamente ad alta disponibilità:

  * con i suoi dati (php + database) in volumi persistenti replicati in tempo reale da SafeKit
  * con un indirizzo IP virtuale per accedere al sito WordPress per gli utenti
  * con failover automatico e failback automatico


Note:

  * Il grafico di WordPress definisce un servizio con bilanciamento del carico che è in ascolto sulle porte <service.port> e <service.httpsport> .
  * WordPress è accessibile tramite l'URL: `http://<virtual-ip>:<service.port>.`
  * L'indirizzo IP virtuale è gestito da SafeKit e commutato automaticamente in caso di guasto.
  * Di default, K3S implementa i bilanciatori di carico con Klipper.
  * Klipper è in ascolto sulle porte <virtual ip> : <service.port> e instrada i pacchetti TCP/IP all'indirizzo IP e alla porta del pod WordPress selezionato.


    
    
    $ export KUBECONFIG= /etc/rancher/k3s/k3s.yaml
    $ helm repo add bitnami https://charts.bitnami.com/bitnami
    $ helm install my-release bitnami/wordpress --set global.storageClass=nfs-client --set service.ports.http=8099,service.ports.https=4439
    

Il comando helm precedente dovrebbe scaricare l'immagine di WordPress da `registry-1.docker.io` . Potresti riscontrare problemi di autenticazione su `registry-1.docker.io` . In questo caso, dovresti:

  * crea `/etc/rancher/k3s/registries.yaml` su entrambi i nodi con all'interno: 
        
        configurazioni:
          "registry-1.docker.io":
            autenticazione:
              nome utente: il_tuo_nome_utente
              password: la_tua_password
            tls:
              insecure_skip_verify: true
        

  * Arresta e riavvia k3s per tenerne conto, con `systemctl stop k3s` e `systemctl start k3s` .
  * Esegui `helm registry login -u your_user_name docker.io` , quindi inserisci la tua password


### 9. Supporto {#9-support}

  * Per ottenere supporto, scarica 2 SafeKit `Snapshots` (2 file .zip), uno per ogni nodo.


Nota ![ ](/wp-content/uploads/2022/07/note.png)


🛠️ Risoluzione dei problemi di [ nella Guida per l'utente. ](</it/resources/safekit-user-guide-82/#Troubleshooting>)


![ Scatta le foto per il supporto ](/wp-content/uploads/2024/03/30-snapshots-mirror.png)


### 10. Se necessario, configurare un verificatore splitbrain {#10-if-necessary-configure-a-splitbrain-checker}

  * Vedi sotto [ "Quali sono i diversi scenari in caso di isolamento di rete in un cluster?" ](#isolation) per sapere se è necessario configurare un controllo splitbrain.
  * Nella configurazione del modulo, fare clic su `Advanced Configuration` (vedere l'immagine) per modificare `userconfig.xml` .
  * Dichiarare il controllo splitbrain aggiungendo la sezione `<check>` di `userconfig.xml` : 
        
        <service>
         ...
         <check>
          ...
          <splitbrain ident="witness" exec="ping" arg="witness IP"/>
         </check>
        

  * `Save and apply` la nuova configurazione per ridistribuire il file userconfig.xml modificato su entrambi i nodi (il modulo deve essere arrestato su entrambi i nodi per salvare e applicare le modifiche).


**Parametri** :

  * `ident="witness"` identifica il testimone con un nome di risorsa: `splitbrain.witness` . È possibile modificare questo valore per identificare il testimone.
  * `exec="ping"` fa riferimento al codice ping da eseguire. Non modificare questo valore.
  * `arg="witness IP"` è un argomento per il ping. Sostituisci questo valore con l'indirizzo IP del witness (un elemento robusto, in genere un router).


![ Inserire i parametri ](/wp-content/uploads/2024/03/05-module-mirror-edit-config.png)



{{%  insert-safekit-network-isolation-it  %}}
 

## Dimostrazione della soluzione SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}