---
title: "Software di clustering attivo-attivo con replica in tempo reale e failover reciproco"
canonical: "https://safekit.eviden.com/it/architectures/active-active-cluster-real-time-replication/"
description: "Massimizza l'utilizzo delle risorse con il clustering attivo-attivo SafeKit . Implementa il failover reciproco tra due server utilizzando la replica sincrona in tempo reale e più moduli mirror . Garantisci zero perdita di dati (RPO=0) e ripristino automatico per Windows e Linux senza SAN. Scarica la versione di prova gratuita."
category: "architectures"
lang: "it"
topics: "Come funziona il cluster attivo-attivo con replica in tempo reale?, 🔍 SafeKit Hub di navigazione ad alta disponibilità"
---

# Software di clustering attivo-attivo con replica in tempo reale e failover reciproco {#active-active-clustering-software-with-real-time-replication--mutual-failover}

## Come funziona un cluster attivo-attivo con replica in tempo reale? {#how-the-active-active-cluster-with-real-time-replication-works}

### Cluster attivo-attivo con replica in tempo reale {#active--active-cluster-with-real-time-replication}

Le applicazioni sono in esecuzione su due server in modalità di failover reciproco. Ciascun server funge da backup dell'altro. Ogni applicazione opera sulle proprie directory di file replicate.


![ SafeKit cluster attivo attivo con replica in tempo reale ](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


Se in un cluster attivo-attivo un server si guasta, tutte le applicazioni saranno attive sullo stesso server. Dopo il riavvio del server guasto, le applicazioni torneranno a essere eseguite sul loro server primario predefinito.

### Come funziona? {#how-it-works}

Il cluster attivo-attivo SafeKit si configura semplicemente implementando due moduli mirror con replica in tempo reale. Ciascun modulo mirror contiene la propria configurazione di indirizzo IP virtuale, directory replicate in tempo reale e script di riavvio.

Notare che:

  * le 2 applicazioni Appli1 e Appli2 devono essere installate su ciascun server per il failover dell'applicazione,
  * questa architettura non si riduce a 2 applicazioni: N moduli applicativi possono essere distribuiti su 2 server con un massimo di 25 moduli,
  * Ciascun modulo mirror avrà il proprio indirizzo IP virtuale, le proprie directory di file replicate e i propri script di ripristino.


### Esempio di cluster attivo-attivo {#example-of-an-active-active-cluster}

](</it/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>) [ [ , failover automatico e bilanciamento del carico delle VM è un esempio di cluster attivo-attivo con N moduli mirror che replicano N macchine virtuali tra due server ](</it/solutions/hyper-v-replication-automatic-failover-load-balancing/>) .

In questa configurazione, un modulo mirror replica un'intera macchina virtuale e la riavvia in caso di errore. 

In un modulo di questo tipo non è presente alcun indirizzo IP virtuale, poiché il riavvio di una macchina virtuale su un server comporta automaticamente il failover dell'indirizzo IP fisico della macchina virtuale. 

In questa architettura, un'applicazione critica viene installata all'interno di una macchina virtuale.


{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}