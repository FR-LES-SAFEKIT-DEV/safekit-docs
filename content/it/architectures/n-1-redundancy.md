---
title: "Clustering con ridondanza N-1: elevata disponibilità per più applicazioni con un unico backup."
canonical: "https://safekit.eviden.com/it/architectures/n-1-redundancy/"
description: "Ottimizza il tuo data center con la ridondanza N-1 SafeKit . Implementa N moduli mirror su N+1 server per garantire l'alta disponibilità di più applicazioni con un unico backup condiviso. Elimina i requisiti SAN e riduci i costi hardware con la replica in tempo reale per Windows e Linux . Scopri di più."
category: "architectures"
lang: "it"
topics: "Alta disponibilità con replica dei dati e failover delle applicazioni da N server a 1, 🔍 SafeKit Hub di navigazione ad alta disponibilità"
---

# Clustering con ridondanza N-1: elevata disponibilità per più applicazioni con un unico backup {#n-1-redundancy-clustering-high-availability-for-multiple-applications-with-one-backup}

## Alta disponibilità con replica dei dati e failover delle applicazioni da N server a 1 {#high-availability-with-data-replication-and-application-failover-from-n-servers-to-1}

### Ridondanza N-1 {#n-1-redundancy}


![ SafeKit Cluster di ridondanza N-1 ](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


### Come funziona la ridondanza N-1? {#how-the-n-1-redundancy-works}

SafeKit fornisce un semplice cluster di ridondanza N-1 con N applicazioni in esecuzione su N server e con un singolo backup per il failover. In un cluster di ridondanza N-1 SafeKit , ogni applicazione opera sulle proprie directory replicate.

In caso di guasto di un server primario, a differenza del cluster attivo-attivo [ ](</it/architectures/active-active-cluster-real-time-replication/>) , il server di backup non deve gestire un doppio carico di lavoro.

Questo presuppone che si verifichi un solo guasto alla volta nel cluster di ridondanza N-1. La soluzione può supportare guasti simultanei di più server primari, ma in questo caso il singolo server di backup dovrà gestire il carico di lavoro combinato di tutti i server guasti.

### Come implementare la ridondanza N-1? {#how-to-implement-n-1-redundancy}

Il cluster di ridondanza N-1 SafeKit si configura semplicemente installando N moduli mirror su N+1 server.

Notare che:

  * tutte le applicazioni (Appli1, Appli2, Appli3) devono essere installate sul singolo backup per il failover dell'applicazione,
  * Ciascun modulo mirror avrà il proprio indirizzo IP virtuale, le proprie directory di file replicate e i propri script di ripristino.



{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}