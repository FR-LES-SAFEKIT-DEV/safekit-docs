---
title: "Heartbeat, failover e quorum nei cluster Windows e Linux"
canonical: "https://safekit.eviden.com/it/best-practises/heartbeat-failover-quorum-windows-linux-cluster/"
description: "Come funzionano heartbeat, failover e quorum nei cluster Windows e Linux, e come SafeKit evita lo split brain senza disco di quorum né terzo server."
category: "best-practises"
lang: "it"
topics: "Quali sono i diversi scenari in caso di isolamento della rete in un cluster?, Come funzionano gli heartbeat e il failover in un cluster Windows o Linux?, Split brain e quorum con server in due sale server remote, Quorum di cluster semplice con il checker split-brain SafeKit"
hashpart: "isolation, how-heartbeats-and-failover-work-in-a-windows-or-linux-cluster, split-brain-problem-and-quorum-when-servers-are-in-two-remote-computer-rooms, simple-cluster-quorum-with-the-safekit-split-brain-checker"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-19.19 | Translation LLM | 41 expressions"
image: "/wp-content/uploads/2023/02/quorum-with-remote-sites.png"
schemaType: "TechArticle"
---

# Heartbeat, failover e quorum nei cluster Windows e Linux {#heartbeat-failover-and-quorum-in-windows-and-linux-clusters}


{{%  insert-safekit-network-isolation-it  %}}
 

## Come funzionano gli heartbeat e il failover in un cluster Windows o Linux? {#how-heartbeats-and-failover-work-in-a-windows-or-linux-cluster}

### Che cos’è un heartbeat? {#what-is-a-heartbeat}

Il meccanismo di base per sincronizzare due server e rilevare i guasti del server è l’**heartbeat**. Si tratta di un flusso di dati di monitoraggio su una rete condivisa dai due server.

Il software SafeKit supporta diversi heartbeat. Ogni rete condivisa dai due server può trasportare un heartbeat.

Il meccanismo heartbeat viene utilizzato per implementare cluster Windows e Linux. È integrato nel cluster mirror SafeKit con replica di file in tempo reale e failover.

### Heartbeat SafeKit {#safekit-heartbeats}

In condizioni normali, i due server si scambiano i loro stati attraverso i canali heartbeat. Questi stati sono PRIM, SECOND e gli stati delle risorse. Sincronizzano anche le procedure di avvio e arresto dell’applicazione.

Ad esempio, durante un failover pianificato, lo script di arresto dell’applicazione viene prima eseguito sul server primario. Quindi lo script di avvio viene eseguito sul server secondario. In questo modo, i dati replicati sul server secondario sono in uno stato sicuro. Questo stato corrisponde a un arresto pulito dell’applicazione.

### Cosa succede quando tutti gli heartbeat si perdono? {#loss-of-all-heartbeats}

Quando un server perde tutti gli heartbeat, considera che l’altro server sia inattivo. A questo punto passa allo stato ALONE.

Se il server nello stato SECOND passa allo stato ALONE, l’applicazione viene riavviata su questo server. Si tratta di un failover dell’applicazione.

Si consiglia di utilizzare due canali heartbeat su due reti diverse, ma non è obbligatorio. Con due reti, un errore di rete non viene confuso con un errore del server.

## Split brain e quorum con server in due sale server remote {#split-brain-problem-and-quorum-when-servers-are-in-two-remote-computer-rooms}


![Heartbeat, failover e quorum in un cluster Windows o Linux](/wp-content/uploads/2023/02/quorum-with-remote-sites.png "w:200")


### Due sale computer remote {#remote-computer-rooms}

Con due server in due sale computer remote, un cluster ad alta disponibilità può proteggere un’applicazione critica.

In questo modo, l’applicazione rimane disponibile anche se un disastro dovesse distruggere un’intera sala computer.

### Split brain {#split-brain}

Se la rete tra le due sale computer è isolata, tutti gli heartbeat vengono persi. Questo è il problema dello split brain: entrambi i server avviano l’applicazione critica.

### Complessità delle soluzioni abituali {#complexity-of-solutions}

Molto spesso, un quorum viene utilizzato per risolvere il problema dello split brain. Il quorum utilizza un terzo server di quorum o un disco di quorum speciale. Evita di avere due server primari contemporaneamente.

Purtroppo, questi dispositivi di quorum aggiungono costi e complessità all’architettura di clustering.

## Quorum di cluster semplice con il checker split-brain SafeKit {#simple-cluster-quorum-with-the-safekit-split-brain-checker}

### Checker split-brain SafeKit {#safekit-split-brain-checker}

Con il software ad alta disponibilità SafeKit, il quorum di un cluster Windows o Linux non richiede un terzo server di quorum né un disco di quorum. Un semplice 🛠️ [checker split-brain](</it/resources/safekit-user-guide-82/#check_splitbrain>) è sufficiente per evitare di eseguire l’applicazione su entrambi i server.

Quando tutti gli heartbeat tra i server vengono persi, il checker split-brain seleziona un solo server per diventare primario. L’altro server passa allo stato WAIT. Attende fino a quando non riceve nuovamente gli heartbeat dell’altro server. Quindi sincronizza i dati replicati dal server primario e torna allo stato secondario.

### Come funziona il checker split-brain? {#how-the-split-brain-checker-works}

Il server primario viene eletto con un ping a un indirizzo IP, chiamato witness. Il witness è solitamente un router sempre disponibile. In caso di isolamento della rete, solo il server in grado di raggiungere il witness diventa primario nello stato ALONE. L’altro server passa allo stato WAIT.

Il witness non viene testato in modo permanente. Viene testato solo quando tutti gli heartbeat sono persi. Se il witness è inattivo in quel momento, il cluster entra nello stato WAIT-WAIT. Un amministratore può quindi riavviare uno dei server come primario con la console web SafeKit.

### Cosa succede senza un checker split-brain? {#what-happens-without-a-split-brain-checker}

In caso di isolamento della rete, entrambi i server passano allo stato ALONE ed eseguono l’applicazione critica. Le directory replicate sono isolate. Ogni applicazione lavora sui propri dati nella propria directory.

Quando la rete viene riconnessa, SafeKit sceglie per impostazione predefinita il server che era PRIM prima dell’isolamento come nuovo primario. L’altro server viene forzato allo stato SECOND. Tutti i suoi dati vengono risincronizzati dal server PRIM.

Nota: su Windows, un server può rilevare un indirizzo IP duplicato e rimuovere il suo indirizzo IP virtuale. In tal caso, un checker SafeKit forza un riavvio.


{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}
