---
title: "Heartbeat, failover e quorum nei cluster Windows e Linux"
canonical: "https://safekit.eviden.com/it/best-practises/heartbeat-failover-quorum-windows-linux-cluster/"
description: "Scopri come funzionano heartbeat, failover e quorum in un cluster. SafeKit propone un'architettura SANless che elimina la necessità di un terzo server di quorum o di un disco di quorum dedicato. Ottieni alta disponibilità su Windows e Linux con un semplice strumento di verifica dello split-brain."
category: "best-practises"
lang: "it"
topics: "Quali sono i diversi scenari in caso di isolamento di rete in un cluster?, Come funzionano heartbeat e failover in un cluster Windows o Linux ?, Problema di split brain e quorum quando i server si trovano in due sale server remote, Quorum del cluster semplice con il verificatore di split brain SafeKit , 🔍 Hub di navigazione ad alta disponibilità SafeKit"
---

# Heartbeat, Failover e Quorum nei cluster Windows e Linux {#heartbeat-failover-and-quorum-in-windows-and-linux-clusters}


{{%  insert-safekit-network-isolation-it  %}}
 

## Come funzionano i heartbeat e il failover in un cluster Windows o Linux ? {#how-heartbeats-and-failover-work-in-a-windows-or-linux-cluster}

### Cos'è un battito cardiaco? {#what-is-a-heartbeat}

Il meccanismo di base per sincronizzare due server e rilevare i guasti dei server è il heartbeat ** ** , che consiste in un flusso di dati di monitoraggio su una rete condivisa da una coppia di server.

Il software SafeKit supporta un numero di heartbeat pari al numero di reti condivise da due server. 

Il meccanismo heartbeat viene utilizzato per implementare i cluster Windows e Linux . È integrato nel cluster SafeKit mirror con replica dei file in tempo reale e failover.

### Battiti cardiaci SafeKit {#safekit-heartbeats}

In condizioni operative normali, i due server si scambiano i rispettivi stati (PRIM, SECOND, stati delle risorse) tramite i canali heartbeat e sincronizzano le procedure di avvio e arresto delle loro applicazioni.

In particolare, in caso di failover programmato, lo script di arresto che arresta l'applicazione viene eseguito prima sul server primario, e solo successivamente sullo script di avvio sul server secondario. In questo modo, i dati replicati sul server secondario si trovano in uno stato sicuro, corrispondente a un arresto pulito dell'applicazione.

### Perdita di tutti i battiti cardiaci {#loss-of-all-heartbeats}

Quando tutti i segnali di heartbeat vengono persi su un server, quest'ultimo considera l'altro server non funzionante e passa allo stato ALONE.

Se è il SECONDO server a passare allo stato ALONE, si verifica un failover dell'applicazione con il riavvio dell'applicazione sul server secondario.

Sebbene non sia obbligatorio, è preferibile disporre di due canali heartbeat su due reti diverse per sincronizzare i due server, in modo da separare i casi di guasto della rete da quelli di guasto del server.

## Problema del cervello diviso e del quorum quando i server si trovano in due sale computer remote {#split-brain-problem-and-quorum-when-servers-are-in-two-remote-computer-rooms}


![ Heartbeat, failover e quorum in un cluster Windows o Linux ](/wp-content/uploads/2023/02/quorum-with-remote-sites.png "w:200")


### Sale computer remote {#remote-computer-rooms}

Un cluster ad alta disponibilità per la protezione di un'applicazione critica può essere implementato con due server situati in due sale server geograficamente distanti.

Pertanto, la soluzione supporta il disastro di una stanza piena.

### Cervello diviso {#split-brain}

In caso di isolamento di rete tra le due sale computer, tutti i segnali di attività vengono persi e si verifica il problema dello split-brain.

Entrambi i server avviano l'applicazione critica.

### Complessità delle soluzioni {#complexity-of-solutions}

Nella maggior parte dei casi, per risolvere il problema dello split-brain, il quorum viene implementato con un terzo server di quorum o un disco di quorum dedicato per evitare la presenza di doppi master. 

Purtroppo, questi nuovi dispositivi di quorum aggiungono costi e complessità all'architettura complessiva del cluster.

## Semplice quorum del cluster con il controllore di split brain SafeKit {#simple-cluster-quorum-with-the-safekit-split-brain-checker}

### SafeKit controllore cervello diviso {#safekit-split-brain-checker}

Con il software di alta disponibilità SafeKit , il quorum all'interno di un cluster Windows o Linux non richiede un terzo server di quorum né un disco di quorum. Un semplice ](</it/resources/safekit-user-guide-82/#check_splitbrain>) [ sufficiente per evitare la doppia esecuzione di un'applicazione.

In caso di perdita di tutti i segnali di heartbeat tra i server, il sistema di verifica dello split-brain seleziona un solo server come primario. L'altro server passa allo stato WAIT finché non riceve nuovamente i segnali di heartbeat dal server primario. A quel punto, torna allo stato secondario dopo aver sincronizzato i dati replicati dal server primario.

### Come funziona il controllo del cervello diviso? {#how-the-split-brain-checker-works}

L'elezione del server primario si basa sul ping di un indirizzo IP, chiamato witness. Il witness è in genere un router sempre disponibile. In caso di isolamento della rete, solo il server con accesso al witness sarà primario, mentre gli altri passeranno allo stato WAIT.

Il witness non viene testato in modo permanente, ma solo quando tutti i heartbeat vengono persi. Se in quel momento il witness risulta inattivo, il cluster passa allo stato WAIT-WAIT e un amministratore può scegliere di riavviare uno dei server come primario tramite la console web SafeKit .

### Cosa succede senza un sistema di verifica dello split-brain? {#what-happens-without-a-split-brain-checker}

In caso di isolamento di rete, entrambi i server passeranno allo stato ALONE eseguendo l'applicazione critica. Le directory replicate saranno isolate e ciascuna applicazione lavorerà sui propri dati nella propria directory.

Quando la rete viene riconnesso, SafeKit sceglie di default il server che era PRIM prima dell'isolamento come nuovo primario e impone all'altro di diventare SECONDO, risincronizzando tutti i suoi dati dal PRIM.

Nota: Windows è in grado di rilevare un indirizzo IP duplicato su un server e rimuovere l'indirizzo IP virtuale su tale server. SafeKit dispone di un controllo per forzare il riavvio in tal caso.


{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}