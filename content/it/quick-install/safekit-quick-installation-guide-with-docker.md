---
title: "Alta disponibilità Docker con SafeKit : installare il modulo mirror.safe per il failover"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-with-docker/"
description: "Distribuisci il modulo mirror.safe per SafeKit per abilitare la replica sincrona in tempo reale e il failover automatico dei container Docker su Linux . Questa guida illustra la configurazione di un cluster shared-nothing a 2 nodi per applicazioni critiche senza storage condiviso."
category: "quick-install"
lang: "it"
topics: "Guida rapida all'installazione dell'alta disponibilità per Docker , Limitazioni dell'alta disponibilità SafeKit , Panoramica della soluzione SafeKit / Docker , Installazione della soluzione SafeKit / Docker su Linux ( mirror.safe ), Configurazione passo passo della soluzione SafeKit / Docker , Dimostrazione della soluzione SafeKit mirror , 🔍 Hub di navigazione ad alta disponibilità SafeKit"
---

# Alta disponibilità Docker con SafeKit : installare il modulo mirror.safe per il failover {#docker-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-it app="Docker" mod="mirror"  %}}
 

## Panoramica della soluzione SafeKit / Docker {#overview-of-the-safekit--docker-solution}

La soluzione è descritta qui: ** 💡 [ SafeKit : Docker Software di replica dati ad alta disponibilità e in tempo reale ](</solutions/docker-container-high-availability-cluster-synchronous-replication-failover/>)  
**.

## Installazione della soluzione SafeKit / Docker su Linux ( mirror.safe ) {#installation-of-the-safekit--docker-solution-on-linux-mirrorsafe}

### Prerequisiti {#prerequisites}

  * È necessario che l'applicazione Docker , che si desidera riavviare in SafeKit sia installata su 2 nodi (macchine virtuali o server fisici).



{{%  insert-safekit-installation-package-linux-it app="" mod="mirror"  %}}
 

### Esempio 1 con un'applicazione di composizione Docker {#example-1-with-a-docker-compose-application}

Con un'applicazione composta Docker , si dispone di un file **docker-compose.yml** che descrive l'applicazione e tutti i suoi contenitori.

  * Innanzitutto, su entrambi i server, installa l'applicazione docker compose senza avviarla: **docker-compose -f docker-compose.yml up --no-start**
  * Su un server, per ogni volume in docker-compose.yml , eseguire questo comando: **docker volume inspect volume_name**  
Restituirà **host directories of the docker volumes** (questi percorsi non sono forniti in docker-compose.yml ).  
Riceverai un elenco di percorsi come **/var/lib/docker/volumes/ <volume_name>/_data**
  * Vai alla sezione di configurazione passo passo ** ** e 
    * distribuire il modulo **mirror.safe**
    * Imposta un indirizzo IP virtuale ** e un indirizzo IP virtuale ** che verranno commutati in caso di errore.
    * imposta l'elenco di **/var/lib/docker/volumes/ <volume_name>/_data** come ** directory replicate **
    * inserire rispettivamente negli script start_prim e stop_prim : **/usr/local/bin/docker-compose -f docker-compose.yml --no-ansi start** e **/usr/local/bin/docker-compose -f docker-compose.yml --no-ansi stop**


### Esempio 2 con un'applicazione Docker che avvia un set di container {#example-2-with-a-docker-application-starting-a-set-of-containers}

Supponiamo qui che un'applicazione Docker ** myappli ** avviino un insieme di container.

  * Innanzitutto, su entrambi i server, installa ** myappli ** senza avviarlo
  * Su un server, elenca i volumi utilizzati da myapply : **ls /var/lib/docker/volumes**  
Pertanto, otterrai un elenco di percorsi come **/var/lib/docker/volumes/ <volume_name>/_data**
  * Vai alla sezione di configurazione passo passo ** ** e 
    * distribuire il modulo **mirror.safe**
    * Imposta un indirizzo IP virtuale ** e un indirizzo IP virtuale ** che verranno commutati in caso di errore.
    * imposta l'elenco di **/var/lib/docker/volumes/ <volume_name>/_data** come ** directory replicate **
    * inserire rispettivamente negli script start_prim e stop_prim : ** /.../myappli avviare ** e ** /.../myappli arrestare **


### Esempio 3 con una semplice immagine Docker {#example-3-with-a-simple-docker-image}

La configurazione viene presentata prendendo come esempio l'immagine nginx Docker (server web).

  * Creazione del volume Docker  
Su entrambi i server, crea un volume Docker con lo stesso nome: **docker volume create replicated_vol**  
Ottieni il percorso della directory in cui è memorizzato il volume sull'host: **docker volume inspect replicated_vol**  
(ad esempio: **/var/lib/docker/storage/replicated_vol/_data** )
  * Creazione del contenitore Docker  
Su entrambi i server, creare un container Docker nginx che si colleghi al volume precedente: **docker container create --name mynginx -v replicated_vol:/usr/share/nginx/html -p 9011:80 nginx**  
Popola il volume con alcuni file index.html : **docker cp index.html mynginx:/usr/share/nginx/html/index.html**
  * Vai alla sezione di configurazione passo passo ** ** e 
    * distribuire il modulo **mirror.safe**
    * Imposta un indirizzo IP virtuale ** e un indirizzo IP virtuale ** che verranno commutati in caso di errore.
    * Imposta **/var/lib/docker/storage/replicated_vol/_data** come directory replicata.
    * inserire rispettivamente negli script start_prim e stop_prim : **docker start mynginx** e **docker stop mynginx**
    * Dopo la configurazione SafeKit , testare l'accesso a index.html con ** http://vitual-ip:9011**


## Configurazione passo passo della soluzione SafeKit / Docker {#step-by-step-configuration-of-the-safekit--docker-solution}


{{%  insert-safekit-82-configuration-it app="Docker" mod="mirror"  %}}
 

## Dimostrazione della soluzione SafeKit mirror {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}