---
title: "Cluster attivo-attivo con replica in tempo reale"
canonical: "https://safekit.eviden.com/it/architectures/active-active-cluster-real-time-replication/"
description: "Cluster SafeKit attivo-attivo: due server si proteggono a vicenda con più moduli mirror, replica sincrona e failover reciproco su Windows e Linux."
category: "architectures"
lang: "it"
topics: "Come funziona un cluster attivo-attivo con replica in tempo reale?"
hashpart: "how-the-active-active-cluster-with-real-time-replication-works"
translation: "translate_md 2026-11-21.1 | glossaire 2026-11-21.9 | Translation LLM | 41 expressions"
image: "/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png"
schemaType: "TechArticle"
---

# Cluster attivo-attivo con replica in tempo reale {#active-active-cluster-with-real-time-replication}

## Come funziona un cluster attivo-attivo con replica in tempo reale? {#how-the-active-active-cluster-with-real-time-replication-works}

### Cluster attivo-attivo con replica in tempo reale {#active--active-cluster-with-real-time-replication}

Due server eseguono applicazioni e si eseguono il backup a vicenda. Questo processo è chiamato failover reciproco: ogni server è il backup dell’altro server. Ogni applicazione utilizza le proprie directory di file replicate.


![Cluster attivo-attivo SafeKit con replica in tempo reale](/wp-content/uploads/2023/02/safekit-mirror-mirror-300-1.png "w:300")


Se un server in un cluster attivo-attivo si guasta, tutte le applicazioni vengono eseguite sul server rimanente. Quando il server guasto si riavvia, ogni applicazione ritorna al suo server primario predefinito.

### Come funziona? {#how-it-works}

Per configurare un cluster attivo-attivo con SafeKit, è sufficiente distribuire due moduli mirror con replica in tempo reale. Ogni modulo mirror ha la propria configurazione: un indirizzo IP virtuale, directory replicate in tempo reale e script di riavvio.

Note:

  * Entrambe le applicazioni (Appli1 e Appli2) devono essere installate su ciascun server per il failover dell’applicazione.
  * Questa architettura non è limitata a due applicazioni. È possibile distribuire fino a 25 moduli applicativi sugli stessi due server.
  * Ogni modulo mirror ha il proprio indirizzo IP virtuale, le proprie directory di file replicate e i propri script di ripristino.


### Esempio di cluster attivo-attivo {#example-of-an-active-active-cluster}

La soluzione 💡 [Hyper-V](</it/solutions/hyper-v-replication-automatic-failover-load-balancing/>) o 💡 [KVM](</it/solutions/linux-kvm-high-availability-replication-automatic-failover-load-balancing/>) è un esempio di cluster attivo-attivo. Questa soluzione fornisce la replica, il failover automatico e il bilanciamento del carico delle macchine virtuali. In questo cluster, N moduli mirror replicano N macchine virtuali tra due server fisici.

In questa configurazione, ogni modulo mirror replica una macchina virtuale completa e la riavvia in caso di errore.

Questo tipo di modulo non necessita di un indirizzo IP virtuale. Quando la macchina virtuale si riavvia sull’altro server, il suo indirizzo IP si sposta automaticamente con essa.

In questa architettura, l’applicazione critica è installata all’interno di una macchina virtuale.


{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}