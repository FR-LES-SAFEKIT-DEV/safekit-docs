---
title: "Alta disponibilità Podman con SafeKit: installare il modulo mirror.safe per il failover"
canonical: "https://safekit.eviden.com/it/quick-install/safekit-quick-installation-guide-with-podman/"
description: "Implementare il modulo mirror.safe per SafeKit per abilitare la replica sincrona in tempo reale e il failover automatico dei container Podman su Linux. Questa guida illustra come configurare un cluster SANless a 2 nodi per applicazioni critiche senza storage condiviso."
category: "quick-install"
lang: "it"
topics: "Guida rapida all’installazione ad alta disponibilità per Podman, Limitazioni SafeKit High Availability, Panoramica della soluzione SafeKit/Podman, Installazione della soluzione SafeKit/Podman su Linux (mirror.safe), Configurazione passo-passo della soluzione SafeKit/Podman, Dimostrazione della soluzione mirror SafeKit, 🔍 Esplora SafeKit"
translation: "translate_md 2026-11-08.15 | glossaire 2026-11-09.11 | Translation LLM | 31 expressions"
---

# Alta disponibilità Podman con SafeKit: installare il modulo mirror.safe per il failover {#podman-high-availability-with-safekit-install-the-mirrorsafe-module-for-failover}


{{%  insert-safekit-mirror-guide-it app="Podman" mod="mirror"  %}}
 

## Panoramica della soluzione SafeKit/Podman {#overview-of-the-safekit--podman-solution}

La soluzione è descritta qui: **💡 [SafeKit: software di alta disponibilità e replica di dati in tempo reale Podman](</it/solutions/podman-the-simplest-high-availability-cluster-between-two-redundant-servers/>)**.

## Installazione della soluzione SafeKit/Podman su Linux (mirror.safe) {#installation-of-the-safekit--podman-solution-on-linux-mirrorsafe}

### Prerequisiti {#prerequisites}

  * È necessario che l’applicazione Podman che si desidera riavviare in SafeKit sia installata su 2 nodi (macchine virtuali o server fisici).



{{%  insert-safekit-installation-package-linux-it app="" mod="mirror"  %}}
 

### Esempio con una semplice immagine container {#example-with-a-simple-container-image}

In questo esempio, mostreremo come SafeKit può gestire un container nginx (server web), ovvero: la replica di una directory a cui si accede nel container e il riavvio del container su un altro nodo in caso di guasto.

#### Prerequisiti {#prerequisites-1}

  * Creare una directory replicata **su entrambi i nodi**  
Creare una directory **/replicated_dir_path** che verrà replicata da SafeKit e che conterrà le pagine HTML servite da nginx
  * Popolare questa directory con un file html iniziale **su entrambi i nodi**
        
        cp index.html /replicated_dir_path

  * Creare un container **su entrambi i nodi**  
Creare un container nginx su entrambi i nodi che associ la directory **/replicated_dir_path** a **/usr/share/nginx/html** : 
        
        podman container create --name mynginx -v /replicated_dir_path:/usr/share/nginx/html -p 9011:80 nginx


#### Configurazione SafeKit {#safekit-configuration}

  * Vai alla sezione **di configurazione passo-passo**
  * Creare e configurare un modulo **mirror.safe**
  * Imposta un **indirizzo IP virtuale** che verrà commutato in caso di errore
  * Imposta **/replicated_dir_path** come directory replicata
  * Inserire rispettivamente negli script start_prim e stop_prim: **podman start mynginx** e **podman stop mynginx**  
Nota: potrebbe essere necessario utilizzare "podman start --security-opt label=disable mynginx" con SE Linux.
  * Distribuire e avviare il modulo mirror SafeKit


#### Test {#tests}

  * Testare l’accesso a nginx all’indirizzo **http://vitual-ip:9011/index.html**
  * Replicazione del test:  
Sul nodo in stato PRIM SafeKit, aggiungere altri file html alla directory replicata: 
        
        cp page.html /replicated_dir_path

  * Arrestare il modulo mirror sul nodo in stato SafeKit PRIM
  * Verificare che il container sia stato riavviato sul nodo secondario
  * Testare l’accesso a **http://vitual-ip:9011/index.html** e a** http://vitual-ip:9011/page.html**


## Configurazione passo-passo della soluzione SafeKit/Podman {#step-by-step-configuration-of-the-safekit--podman-solution}


{{%  insert-safekit-82-configuration-it app="Podman" mod="mirror"  %}}
 

## Dimostrazione della soluzione mirror SafeKit {#demonstration-of-the-safekit-mirror-solution}


{{%  insert-safekit-mirror-video-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}