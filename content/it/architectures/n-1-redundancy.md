---
title: "Cluster di ridondanza N-1: alta disponibilità per più applicazioni con un singolo server di backup"
canonical: "https://safekit.eviden.com/it/architectures/n-1-redundancy/"
description: "Ottimizza il tuo data center con la ridondanza N-1 SafeKit. Distribuisci N moduli mirror su N+1 server per fornire alta disponibilità per più applicazioni con un singolo server di backup condiviso. Elimina i requisiti SAN e riduci i costi hardware con la replica in tempo reale per Windows e Linux. Scopri di più."
category: "architectures"
lang: "it"
topics: "Alta disponibilità con replica dei dati e failover delle applicazioni da N server a 1, 🔍 Esplora SafeKit"
translation: "translate_md 2026-11-22.1 | glossaire 2026-11-22.2 | Translation LLM | 41 expressions"
---

# Cluster di ridondanza N-1: alta disponibilità per più applicazioni con un singolo server di backup {#n-1-redundancy-clustering-high-availability-for-multiple-applications-with-one-backup}

## Alta disponibilità con replica dei dati e failover delle applicazioni da N server a 1 {#high-availability-with-data-replication-and-application-failover-from-n-servers-to-1}

### Ridondanza N-1 {#n-1-redundancy}


![Cluster di ridondanza N-1 con SafeKit](/wp-content/uploads/2023/02/safekit-n-1-300-3.png "w:300")


### Come funziona la ridondanza N-1? {#how-the-n-1-redundancy-works}

SafeKit fornisce un semplice cluster di ridondanza N-1: N applicazioni vengono eseguite su N server primari e un singolo server di backup subentra in caso di guasto. In un cluster di ridondanza N-1 SafeKit, ogni applicazione funziona sulle proprie directory replicate.

A differenza di un [cluster attivo-attivo](</it/architectures/active-active-cluster-real-time-replication/>), quando un server primario si guasta, il server di backup non deve gestire un carico di lavoro doppio.

Questo presuppone che solo un server primario si guasti alla volta nel cluster di ridondanza N-1. La soluzione può anche gestire più guasti del server primario contemporaneamente. In questo caso, il singolo server di backup esegue il carico di lavoro combinato di tutti i server guasti.

### Come implementare la ridondanza N-1? {#how-to-implement-n-1-redundancy}

Per configurare un cluster di ridondanza N-1 SafeKit, è sufficiente distribuire N moduli mirror su N+1 server.

Note:

  * Tutte le applicazioni (Appli1, Appli2, Appli3) devono essere installate sul server di backup per il failover dell’applicazione.
  * Ogni modulo mirror ha il proprio indirizzo IP virtuale, le proprie directory di file replicate e i propri script di ripristino.



{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}