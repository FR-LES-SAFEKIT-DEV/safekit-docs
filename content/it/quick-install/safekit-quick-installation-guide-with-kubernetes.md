---
title: "Alta disponibilità K3S con SafeKit: installare il modulo k3s.safe per il failover"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-with-kubernetes/"
description: "Implementare il modulo k3s.safe per SafeKit per abilitare la replica sincrona in tempo reale e il failover automatico di Kubernetes su Linux. Questa guida illustra come configurare un cluster SANless a 2 nodi per applicazioni Linux critiche senza storage condiviso."
category: "quick-install"
lang: "it"
topics: "Guida rapida all’installazione ad alta disponibilità per Kubernetes, Limitazioni SafeKit High Availability, Panoramica della soluzione SafeKit/Kubernetes, Installazione e configurazione della soluzione SafeKit/Kubernetes su Linux (k3s.safe), Quali sono i diversi scenari in caso di isolamento della rete in un cluster?, Dimostrazione della soluzione mirror SafeKit, 🔍 Esplora SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
---

# Alta disponibilità K3S con SafeKit: installare il modulo k3s.safe per il failover {#k3s-high-availability-with-safekit-install-the-k3ssafe-module-for-failover}


{{%  insert-safekit-mirror-guide-it app="Kubernetes" mod="k3s"  %}}
 

## Panoramica della soluzione SafeKit/Kubernetes {#overview-of-the-safekit--kubernetes-solution}

La soluzione è descritta qui: **💡 [Kubernetes K3s ad alta disponibilità: replica sincrona e failover a 2 nodi](</it/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/>)**

## Installazione e configurazione della soluzione SafeKit/Kubernetes su Linux (k3s.safe) {#installation-and-configuration-of-the-safekit--kubernetes-solution-on-linux-k3ssafe}

### 1. Scarica i pacchetti {#1-download-packages}

  * Scarica la versione gratuita di SafeKit 8.2 su Linux (safekitlinux_xx.bin)
  * Scarica il modulo Linux k3s.safe
  * Scarica lo script k3sconfig.sh
  * Documentazione (pptx)


Nota: lo script k3sconfig.sh installa K3S, MariaDB, NFS e SafeKit su 2 nodi Linux Ubuntu 24.04.

[Scarica SafeKit (Linux) >](</it/resources/safekit-free-trial/>)

<a class="btn-download" href="/wp-content/uploads/downloads_safekit/version-82/modules_linux/k3s.safe" download="k3s.safe">Scarica k3s.safe (Linux) ></a> 

[Scarica k3sconfig.sh >](</wp-content/uploads/downloads_safekit/version-82/modules_linux/k3sconfig.sh>)

[Documentazione (pdf) >](</wp-content/uploads/documents/safekit-k3s-en.pdf>)

### 2. Prima su entrambi i nodi {#2-first-on-both-nodes}

Su 2 nodi Linux Ubuntu 24.04, come root:

  * Assicurati che il nodo abbia accesso a Internet (anche tramite un proxy)
  * Copia k3sconfig.sh, k3s.safe e il pacchetto safekit_xx.bin in una directory e spostati al suo interno con il comando cd
  * Rinomina il file .bin in "safekit.bin"
  * Assicurati k3sconfig.sh e safekit.bin siano eseguibili.
  * Modificare lo script k3sconfig.sh e personalizzare le variabili d’ambiente in base al proprio ambiente (incluso un IP virtuale)
  * Eseguire su entrambi i nodi: `./k3sconfig.sh prereq`


Lo script:

  * Installare i pacchetti Debian richiesti: alien, nfs-kernel-server, nfs-common, mariadb-server
  * Installazione sicura di MariaDB
  * Creare directory per la replica dei file
  * Preparare il server NFS per la condivisione delle directory replicate
  * Installare SafeKit


### 3. Sul primo nodo {#3-on-the-first-node}

Eseguire sul primo nodo: `./k3sconfig.sh first`

Lo script:

  * Creare il database di configurazione K3S e l’utente k3s
  * Creare il file del volume di archiviazione replicato (file sparso) e formattarlo come file system xfs
  * Creare la configurazione del cluster safekit e applicarla
  * Installare e configurare il modulo k3s.safe sul cluster
  * Avviare il modulo k3s come "prim" sul primo nodo
  * Scarica, installa e avvia k3s
  * Scarica e installa il grafico Helm di nfs-subdir-external-provisioner
  * Visualizza il token K3S (da utilizzare durante la seconda fase di installazione del nodo)


### 4. Sul secondo nodo {#4-on-the-second-node}

Eseguire sul secondo nodo: `./k3sconfig.sh second <token>`

  * <token> è la stringa visualizzata alla fine dell’esecuzione di " k3sconfig.sh first" sul primo nodo


Lo script:

  * Assicurati che il modulo k3s sia avviato come prim sul primo nodo
  * Installare k3s sul secondo nodo
  * Avviare il modulo k3s


### 5. Verificare che il modulo k3s SafeKit sia in esecuzione su entrambi i nodi {#5-check-that-the-k3s-safekit-module-is-running-on-both-nodes}

Verificare con questo comando su entrambi i nodi: `/opt/safekit/safekit –H "*" state`

La risposta dovrebbe essere simile all’immagine.
    
    
    /opt/safekit/safekit –H "*" state
    ---------------- Server= http://10.0.0.20:9010 ----------------
    azione admin =esegui
    --------------------- Stato di k3s ---------------------
    
      Locale (127.0.0.1): PRIM (Servizio: Disponibile) (Colore: Verde)
    Successo
    ---------------- Server= http://10.0.0.21:9010 ----------------
    azione admin =esegui
    --------------------- Stato di k3s ---------------------
    
      Locale (127.0.0.1): SECOND (Servizio: Disponibile) (Colore: Verde)
    Successo
    

### 6. Avviare la console web SafeKit per amministrare il cluster {#6-start-the-safekit-web-console-to-administer-the-cluster}

  * Connettere un browser all’URL della console web SafeKit `http://server0-IP:9010`.
  * Dovrebbe comparire una pagina simile all’immagine.
  * Verificare con le righe di comando Linux che K3S sia avviato su entrambi i nodi (avviato in `start_prim` e `start_second`) e che MariaDB sia avviato sul nodo primario (avviato in `start_prim`).


![Il cluster Kubernetes è stato avviato nella console web SafeKit](/wp-content/uploads/2024/03/14-monitoring-prim-second.png)


### 7. Test {#7-testing}

  * Arrestare il nodo PRIM scorrendo il relativo menu contestuale e facendo clic su `Stop`.
  * Verificare che sia presente un failover sul SECOND nodo, che dovrebbe diventare ALONE (verde).
  * E con le righe di comando su Linux, controllare il failover dei servizi (arrestati sul nodo 1 nello script `stop_prim` e avviati sul nodo 2 nello script `start_prim`). MariaDB e K3S dovrebbero essere in esecuzione sul node2.


![Avvertenza](/wp-content/uploads/2022/07/warning-small.png)


Se ALONE (verde) non viene raggiunta sul node2, analizzare il motivo con il log del modulo del nodo 2.

  * Fare clic su `node2` per visualizzare il log del modulo.
  * [Esempio di un log del modulo SQL Server](</wp-content/uploads/2024/03/24-module-log-script.png>) in cui il nome del servizio in `start_prim` non è valido. Il processo sqlserver.exe è monitorato ma, poiché non è avviato, alla fine il modulo si arresta.


![Avvertenza](/wp-content/uploads/2022/07/warning-small.png)


Se tutto è a posto, avviare il node1, che risincronizzerà le directory replicate dal node2.

Se le cose vanno male, arrestare node2 e [forzare l’avvio come primario](</wp-content/uploads/2024/03/10-monitoring-mirror-stop-stop-prim.png>) di node1, che si riavvierà con i suoi dati localmente integri al momento dell’arresto.


![Nota](/wp-content/uploads/2022/07/note.png)


🛠️ [Maggiori informazioni sui test nella Guida per l’utente.](</it/resources/safekit-user-guide-82/#tests>)


![Arrestare il modulo sul server PRIM](/wp-content/uploads/2024/03/16-monitoring-prim-second-stop.png)


### 8. Prova il cluster con un’applicazione Kubernetes come WordPress {#8-try-the-cluster-with-a-kubernetes-application-like-wordpress}

Nell’immagine è riportato l’esempio di un’installazione WordPress: un portale web con un database di backend implementato da pod.

È possibile distribuire la propria applicazione nello stesso modo.

WordPress è automaticamente altamente disponibile:

  * con i suoi dati (php + database) in volumi persistenti replicati in tempo reale da SafeKit
  * con un indirizzo IP virtuale per l’accesso al sito WordPress per gli utenti
  * con failover automatico e failback automatico


Note:

  * Il grafico di WordPress definisce un servizio con bilanciamento del carico che è in ascolto sulle porte <service.port> e <service.httpsport>.
  * WordPress è accessibile tramite l’URL: `http://<virtual-ip>:<service.port>.`
  * L’IP virtuale è gestito da SafeKit e viene commutato automaticamente in caso di failover.
  * Per impostazione predefinita, K3S implementa i bilanciatori del carico con Klipper.
  * Klipper ascolta su <virtual ip>: <service.port> e instrada i pacchetti TCP/IP all’indirizzo IP e alla porta del pod WordPress che ha selezionato.


    
    
    $ export KUBECONFIG= /etc/rancher/k3s/k3s.yaml
    $ helm repo add bitnami https://charts.bitnami.com/bitnami
    $ helm install my-release bitnami/wordpress --set global.storageClass=nfs-client --set service.ports.http=8099,service.ports.https=4439
    

Il comando helm precedente dovrebbe scaricare l’immagine WordPress da `registry-1.docker.io`. Potresti riscontrare problemi di autenticazione su `registry-1.docker.io`. In questo caso, dovresti:

  * creare `/etc/rancher/k3s/registries.yaml` su entrambi i nodi con all’interno: 
        
        configs:
          "registry-1.docker.io":
            auth:
              username: your_user_name
              password: your_password
            tls:
              insecure_skip_verify: true
        

  * Arrestare e avviare k3s per tenere conto delle modifiche, con `systemctl stop k3s` e `systemctl start k3s`.
  * Eseguire il `helm registry login -u your_user_name docker.io`, quindi inserire la password


### 9. Supporto {#9-support}

  * Per ottenere assistenza, eseguire 2 `Snapshots` SafeKit (2 file .zip), uno per ciascun nodo.


![Nota](/wp-content/uploads/2022/07/note.png)


🛠️ [Risoluzione dei problemi nella Guida per l’utente.](</it/resources/safekit-user-guide-82/#Troubleshooting>)


![Scatta le istantanee per il supporto](/wp-content/uploads/2024/03/30-snapshots-mirror.png)


### 10. Se necessario, configurare un checker split-brain {#10-if-necessary-configure-a-splitbrain-checker}

  * Vedere di seguito ["Quali sono i diversi scenari in caso di isolamento della rete in un cluster?"](#isolation) per sapere se è necessario configurare un checker split-brain.
  * Nella configurazione del modulo, fare clic su `Advanced Configuration` (vedere l’immagine) per modificare `userconfig.xml`.
  * Dichiarare il checker split-brain aggiungendolo nella sezione `<check>` di `userconfig.xml`: 
        
        <service>
         ...
         <check>
          ...
          <splitbrain ident="witness" exec="ping" arg="witness IP"/>
         </check>
        

  * `Save and apply` la nuova configurazione per ridistribuire il file userconfig.xml modificato su entrambi i nodi (il modulo deve essere arrestato su entrambi i nodi per salvare e applicare).


**Parametri** :

  * `ident="witness"` identifica il witness con un nome di risorsa: `splitbrain.witness`. È possibile modificare questo valore per identificare il witness.
  * `exec="ping"` fa riferimento al codice ping da eseguire. Non modificare questo valore.
  * `arg="witness IP"` è un argomento per il ping. Modificare questo valore con l’IP del witness (un elemento robusto, in genere un router).


![Inserisci i parametri](/wp-content/uploads/2024/03/05-module-mirror-edit-config.png)



{{%  insert-safekit-network-isolation-it  %}}
 

## Dimostrazione della soluzione mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}