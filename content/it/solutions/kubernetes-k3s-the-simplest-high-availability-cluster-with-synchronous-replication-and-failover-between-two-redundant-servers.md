---
title: "Kubernetes K3s Alta disponibilità: replica sincrona e failover a 2 nodi"
canonical: "https://safekit.eviden.com/it/solutions/kubernetes-k3s-the-simplest-high-availability-cluster-with-synchronous-replication-and-failover-between-two-redundant-servers/"
description: "Ottieni l'alta disponibilità di K3s su 2 nodi senza storage esterno o quorum etcd. Scopri come SafeKit offre replica senza perdita di dati e failover automatico."
category: "solutions"
lang: "it"
topics: "Semplificare l'alta disponibilità di K3s: perché scegliere SafeKit rispetto a MetalLB e Longhorn?, Indice, Come il software SafeKit implementa in modo semplice un cluster di alta disponibilità K3s Kubernetes ?, Come funziona il cluster SafeKit mirror con K3S Kubernetes ?, Limitazioni dell'alta disponibilità SafeKit , Confronto: SafeKit vs. Stack K3s standard (MetalLB e Longhorn), Guida video: configurazione di un cluster HA SafeKit mirror , 🔍 Hub di navigazione per l'alta disponibilità SafeKit"
---

# Kubernetes K3s Alta disponibilità: replica sincrona a 2 nodi e failover {#kubernetes-k3s-high-availability-2-node-synchronous-replication--failover}

## Semplificare K3s HA: perché scegliere SafeKit invece di MetalLB e Longhorn? {#safekit-k3s-ha-introduction}

Sebbene lo stack open-source standard (MetalLB + Longhorn) per K3s sia potente per i grandi data center, introduce una complessità eccessiva per i siti on-premise a 2 nodi. **SafeKit** semplifica l'ambiente K3s sostituendo gli strumenti di rete e di storage separati con un unico motore HA consolidato. 

### Perché utilizzare SafeKit per l'alta disponibilità (HA) di K3s a 2 nodi? {#why-use-safekit-for-2-node-k3s-high-availability-ha}

  * **Vera alta disponibilità a 2 nodi:** SafeKit fornisce la piena ridondanza con soli **2 nodi** , eliminando il requisito di 3 nodi per il quorum _etcd_.
  * **Zero perdita di dati (RPO=0):** Sostituisce l'archiviazione a blocchi ad alto overhead con **Replica sincrona a livello di byte** per prestazioni SSD locali.
  * **Protezione flessibile a livello di file:** SafeKit esegue la replica a livello di file basata sull'host, in modo completamente trasparente per l'applicazione. Protegge non solo i database, ma anche tutte le cartelle e i dati associati. È possibile replicare le cartelle esistenti esattamente dove sono installate, anche sul **disco di sistema** .
  * **IP virtuale integrato (VIP):** Gestisce nativamente l'IP del cluster a livello di kernel, eliminando la necessità di configurazioni separate **MetalLB** .
  * **Failover e failback automatici:** Attiva una transizione immediata al nodo secondario in caso di guasto; una volta che il nodo primario è funzionante, SafeKit esegue **la risincronizzazione automatica dei dati** senza intervento manuale.
  * **Overhead ultra-basso:** SafeKit funziona senza l'ingente overhead di gestione dei pod di storage (CSI/Longhorn) e dei pod di rete (CNI/MetalLB) richiesti dagli stack standard, liberando RAM e CPU critiche per le tue applicazioni.
  * **Ideale per i professionisti IT a tutto tondo:** sostituisce i complessi **file YAML dell'infrastruttura** di rete e di archiviazione con una **semplice interfaccia grafica web** e script di distribuzione automatizzati, permettendoti di concentrarti esclusivamente sulle tue applicazioni.


Diagramma architetturale ![ SafeKit per alta disponibilità K3s a 2 nodi con IP virtuale integrato, replica in tempo reale e failover automatico. ](/wp-content/uploads/2026/02/safekit-mirror-k3s-1024.jpg "w:512")

 **Alta disponibilità (HA) senza condivisione di risorse per cluster K3s a 2 nodi**  


<a class="btn-quick-install" href="/it/quick-install/safekit-quick-installation-guide-with-kubernetes/"> ⚡ Guida rapida all'installazione del cluster HA Kubernetes > </a>
## Indice {#toc}

  * [ Come il software SafeKit implementa in modo semplice un cluster ad alta disponibilità K3s Kubernetes ? ](#safekit-mirror-k3s-cluster)
  * [ Come funziona il cluster SafeKit mirror con Kubernetes K3S? ](#safekit-mirror-cluster)
  * [ SafeKit Limitazioni di elevata disponibilità ](#safekit-ha-limitations)
  * Confronto [ : SafeKit vs. Stack K3s standard (MetalLB e Longhorn) ](#safekit-k3s-ha-comparison)
  * Guida video [ : Configurazione di un cluster HA SafeKit Mirror ](#videoguide-safekit-mirror-cluster)
  * [ 🔍 SafeKit Hub di navigazione ad alta disponibilità ](#hub)


## Come il software SafeKit implementa in modo semplice un cluster ad alta disponibilità K3s Kubernetes ? {#safekit-mirror-k3s-cluster}

### Come posso implementare l'alta disponibilità per un cluster K3s a 2 nodi Kubernetes ? {#how-do-i-implement-high-availability-for-a-2-node-kubernetes-k3s-cluster}

È possibile implementare l'alta disponibilità (HA) per un cluster K3s a 2 nodi Kubernetes utilizzando **SafeKit k3s.safe mirror module** . Questa soluzione consente di implementare un ambiente ridondante senza la necessità di storage NFS esterno, un database di configurazione esterno dedicato o competenze specifiche Kubernetes .

### Perché utilizzare K3s per l'Edge computing e l'IoT? {#why-use-k3s-for-edge-and-iot-computing}

[ K3s ](<https://k3s.io/>) è il motore Kubernetes preferito per **IoT e Edge computing** perché è una distribuzione leggera e certificata progettata per ambienti con risorse limitate. Semplifica il sovraccarico operativo dello Kubernetes standard mantenendo la piena compatibilità.

### Quali sono le caratteristiche principali del modulo k3s.safe mirror ? {#what-are-the-key-features-of-the-k3ssafe-mirror-module}

Il modulo k3s.safe fornisce uno stack HA completo per K3s implementando:

  * **Nodi attivi doppi:** Esegue simultaneamente 2 master/agenti K3s attivi per ospitare i pod.
  * Replica del database **:** Replica in tempo reale del database di configurazione MariaDB tra i nodi.
  * **Archiviazione persistente:** Replica di volumi persistenti tramite un provisioner dinamico client NFS integrato (nfs-client).
  * Continuità di rete **:** Include un indirizzo IP virtuale per un accesso client senza interruzioni.
  * **Ripristino automatico:** Supporto completo per failover e failback automatici.


### Oltre a K3s, quali altre applicazioni e ambienti può proteggere SafeKit ? {#beyond-k3s-which-applications-and-environments-can-safekit-protect}

SafeKit è una soluzione versatile ad alta disponibilità **per Windows e Linux** che si estende ben oltre il cluster K3s mirror . Consente la replica sincrona in tempo reale **e il failover automatico per un'ampia** di carichi di lavoro critici, tra cui:

  * **Ambienti virtuali e fisici:** Macchine virtuali Hyper-V o KVM complete.
  * Orchestrazione dei container **: ambienti** , Docker Podman .
  * **Dati e servizi:** Singole directory di file, servizi e vari database.
  * **Infrastruttura cloud:** Alta disponibilità per le applicazioni cloud.


SafeKit fornisce anche **`Farm` Cluster** con **nativo Bilanciamento del carico di rete e failover** per applicazioni stateless come **Server Web** .

💡 [ Scopri qui l'elenco completo delle soluzioni HA supportate. ](</it/solutions/>)

### Come fa SafeKit a raggiungere l'alta disponibilità di K3s? {#safekit-k3s-architecture-table}

Architettura e logica di ridondanza **per un cluster K3s a 2 nodi che utilizza SafeKit**

Cluster K3s a 2 nodi | SafeKit PRIM (Nodo primario) | SafeKit SECOND (Nodo secondario)  
---|---|---  
Esecuzione del carico di lavoro | I servizi master e agent di K3s sono attivi e gestiscono l'orchestrazione del cluster ed eseguono i pod. | I servizi master e agent di K3s rimangono attivi, fornendo elaborazione parallela e alta disponibilità.  
Archiviazione NFS e PV | • Ospita IP virtuale e porta NFS <br> • Gestisce le condivisioni NFS esportate attive <br> • Archivia i volumi persistenti (PV) K3s | Mirroring sincrono: SafeKit replica tutti i volumi persistenti in tempo reale per garantire zero perdita di dati.  
Database di configurazione | • Ospita IP virtuale e MariaDB Porta <br> • Gestisce il database di configurazione K3s attivo | Replica del database: il database MariaDB viene replicato in modo sincrono, preservando lo stato del cluster per il failover.  
  
**Meccanismo di failover automatico:** In caso di guasto del nodo primario, SafeKit migra automaticamente gli IP virtuali e i servizi di storage al nodo secondario, garantendo un servizio ininterrotto per il cluster K3s.

## Come funziona il cluster SafeKit mirror con Kubernetes K3S? {#safekit-mirror-cluster}

### Passaggio 1: Replica dei file a livello di byte in un cluster Mirror {#step-1-byte-level-file-replication-in-a-mirror-cluster}

Questa fase illustra l'architettura ad alta disponibilità tra **il Server 1 (PRIM)** e **il Server 2 (SECOND)** . Entrambi i server eseguono i componenti master e agent di K3s come definito nella tabella di architettura [ ](#safekit-k3s-architecture-table) .


![ Replica di file a livello di byte in un cluster K3s Kubernetes mirror ](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


Attualmente, l' **IP virtuale (VIP)** , **l'archiviazione persistente NFS** e **MariaDB** sono attivi solo sul Server 1 (PRIM). I componenti master K3s su entrambi i nodi si sincronizzano tra loro accedendo allo stato del cluster tramite l'IP virtuale e la porta MariaDB . SafeKit implementa la replica sincrona [ di ](</it/best-practises/synchronous-replication-vs-asynchronous-replication/>) di MariaDB e dei file NFS persistenti, garantendo **zero perdita di dati (RPO = 0)** in caso di errore.

I master K3s distribuiscono il carico di lavoro su entrambi i nodi (o più) comunicando direttamente con gli agenti K3s. I client esterni si connettono al  
L'indirizzo IP virtuale del cluster [ ](</it/best-practises/how-a-virtual-ip-address-works/>) sul nodo PRIM. Utilizzando i meccanismi standard Kubernetes , il master K3s inoltra il traffico ai pod distribuiti sui nodi. Allo stesso modo, i pod accedono ai loro volumi persistenti (PV) **sul server PRIM tramite l'** IP virtuale e la porta NFS.

### Passaggio 2: Failover automatico e continuità del servizio {#step-2-automatic-failover-and-service-continuity}

Quando il server **Server 1 (PRIM)** si guasta, il server **Server 2 (SECOND)** subentra automaticamente nel controllo delle operazioni del cluster per garantire la continuità.


Failover ](/wp-content/uploads/2023/02/safekit-stop-alone-300.png "w:300") in un cluster Kubernetes K3S mirror ![


SafeKit rileva l'errore e migra immediatamente l' **indirizzo IP virtuale** del cluster al Server 2. Successivamente, promuove i **servizi** locali **MariaDB** e NFS allo stato attivo. Grazie alla replica sincrona eseguita nel passaggio 1, tutti i database MariaDB e i file del volume persistente (PV) NFS sono già aggiornati sul Server 2, garantendo l'assenza di perdita di dati.

Mantenendo lo stato del cluster, il **Master K3s** sul Server 2 continua l'esecuzione. Rileva la perdita dell'agente del Server 1 e riprogramma automaticamente i pod interessati sugli agenti K3s attivi rimanenti. Il tempo di failover totale (RTO) è la somma dell'intervallo di rilevamento dei guasti (predefinito: 30 secondi) e del tempo necessario all'inizializzazione dei componenti K3s sul nodo secondario.

Mentre il Server 1 è offline, i servizi MariaDB e NFS continuano a essere in esecuzione sul Server 2, scrivendo le modifiche solo localmente.  


### Passaggio 3: Failback e reintegrazione automatica {#step-3-failback-and-automatic-reintegration}

**Il failback** si verifica quando il Server 1 viene riavviato dopo che il problema iniziale è stato risolto. SafeKit risincronizza automaticamente MariaDB e i file NFS, aggiornando solo i dati modificati sul Server 2 durante il periodo di inattività. Questo processo di reintegrazione **non è invasivo** ; i componenti master e agent di K3s continuano a essere eseguiti sul Server 2 senza interruzioni. 


![ Risincronizzazione automatica e failback in un cluster K3s mirror ](/wp-content/uploads/2023/02/safekit-resynchro-alone-300.png "w:300")

 

SafeKit ottimizza i tempi di ripristino in base alla modalità di arresto del server: 

  * **Arresto pulito:** se SafeKit è stato arrestato intenzionalmente sul Server 1, solo le zone modificate specifiche all'interno dei file vengono risincronizzate utilizzando **bitmap di tracciamento delle modifiche** . Ciò garantisce una reintegrazione ultraveloce. 
  * Arresto anomalo del sistema (ad esempio, interruzione di corrente): **Se il Server 1 ha subito un arresto anomalo, le bitmap di modifica vengono ignorate per motivi di sicurezza.** risincronizza invece tutti i file con un timestamp di modifica più recente dell'ultimo punto di sincronizzazione stabilito, **SafeKit integrità totale dei dati** . 


### Passaggio 4: Ripristino dell'alta disponibilità e della distribuzione del carico {#step-4-restoring-high-availability-and-load-distribution}

In seguito alla reintegrazione, il cluster ritorna alla **modalità mirror completa** , replicando lo stato descritto nel passaggio 1. Il sistema si trova nuovamente in uno stato di alta disponibilità: **MariaDB** e **i servizi NFS** rimangono attivi sul Server 2, mentre SafeKit esegue la replica in tempo reale di tutti gli aggiornamenti dei file verso il Server 1. 


![ Ripristino del normale funzionamento in un cluster Kubernetes K3s mirror ](/wp-content/uploads/2023/02/safekit-second-prim-300.png "w:300")

 

Il **K3s Master** e **il K3s Agent** vengono riavviati automaticamente sul Server 1. Lo scheduler Kubernetes ora riconosce il Server 1 come nodo funzionante e può iniziare a riprogrammare i pod per distribuire il carico di lavoro su entrambi i server. 

Se l'amministratore preferisce che i servizi MariaDB e NFS vengano eseguiti sul Server 1 (ripristinando il ruolo PRIM originale), è possibile avviare manualmente il **passaggio** tramite la console web in un momento opportuno oppure automatizzarlo tramite le impostazioni di configurazione. 

### Come configurare un cluster SafeKit Mirror {#safekit-mirror-cluster-configure}


![ SafeKit Console Web: dashboard di configurazione dell'alta disponibilità che mostra le reti heartbeat, la configurazione degli IP virtuali e la replica della directory in tempo reale per un cluster mirror . ](/wp-content/uploads/2026/01/safekit-mirror-cluster-config.png "w:763")


La console web **SafeKit** offre un'interfaccia intuitiva per orchestrare l'alta disponibilità delle vostre applicazioni critiche. In pochi semplici passaggi, potete configurare un cluster **SafeKit mirror** per garantire la continuità operativa:

  * **Failover dell'applicazione (scheda Macro):** Definisci i servizi applicativi specifici da riavviare automaticamente in caso di errore.
  * Rete(i) heartbeat **:** Percorso(i) di comunicazione dedicato(i) utilizzato(i) dai nodi del cluster per monitorare continuamente lo stato e la disponibilità reciproci e sincronizzare le decisioni di failover.
  * **Gestione IP virtuale:** Configura l'IP virtuale (VIP) per la riconnessione trasparente del client dopo un failover.
  * **Replica in tempo reale:** Seleziona le directory critiche per la replica sincrona a livello di byte basata sull'host.
  * **Checkers:** Monitora lo stato di salute dell'applicazione e attiva il ripristino automatico se viene rilevato un errore di processo.


Il cluster SafeKit include un verificatore di split-brain dedicato per risolvere i problemi di isolamento di rete senza la necessità di una terza macchina witness o di una rete heartbeat aggiuntiva. Per ulteriori informazioni su heartbeat, failover e quorum in un cluster ](</it/best-practises/heartbeat-failover-quorum-windows-linux-cluster/>) , consultare la documentazione [ .

### Come monitorare un cluster SafeKit mirror {#safekit-mirror-cluster-monitoring}


Console Web ![ SafeKit : Monitoraggio in tempo reale di un cluster mirror a 2 nodi che mostra gli stati PRIM e SECOND con replica dei dati attiva. ](/wp-content/uploads/2026/01/safekit-mirror-cluster-monitor.png "w:478")


La **console di gestione SafeKit** offre una visione unificata dell'infrastruttura ad alta disponibilità. Consente agli amministratori di monitorare lo **stato operativo** del cluster e di tenere traccia della sincronizzazione dei dati in tempo reale.

Per un cluster mirror a 2 nodi, la console visualizza chiaramente i ruoli di ciascun server:

  * **PRIM (Primario):** Il nodo attivo che attualmente esegue l'applicazione e gestisce l'IP virtuale. Esegue scritture nella memoria locale e la replica in tempo reale sul nodo secondario.
  * **SECONDO (Secondario):** Il nodo di standby riceve aggiornamenti sincroni a livello di byte. È pronto a subentrare immediatamente in caso di guasto del nodo primario.
  * **Stato ALONE:** Avvisa visivamente quando il cluster è in esecuzione su un singolo nodo (ad esempio, durante la manutenzione o dopo un errore), indicando che la ridondanza è temporaneamente persa.
  * Avanzamento della risincronizzazione **:** Quando un nodo guasto si ripristina, il suo stato diventa arancione durante la reintegrazione dei dati in background, garantendo l'assenza di tempi di inattività durante la fase di "ritorno alla normalità".


Oltre alle semplici icone di stato, l'interfaccia offre **un'orchestrazione del failover con un solo clic** , che consente di riassegnare manualmente il ruolo primario per la manutenzione programmata, garantendo al contempo la disponibilità continua per le attività degli utenti.


{{%  insert-safekit-usage-it  %}}
 

## Confronto: SafeKit vs. Stack K3s standard (MetalLB e Longhorn) {#safekit-k3s-ha-comparison}

**Confronto: SafeKit vs. Open-Source standard (MetalLB + Longhorn)**

Capacità | SafeKit ( K3s.safe ) | MetalLB + Longhorn (K8 standard)  
---|---|---  
Architettura | All-in-One: rete, replica e failover integrati in un unico pacchetto. | Stack DIY (Do It Yourself): richiede più pacchetti indipendenti (CNI, CSI, LoadBalancer).  
Efficienza hardware | HA puro a 2 nodi: ridondanza completa senza un terzo nodo "testimone" o arbitro. | minimo 3 nodi: in genere richiede un numero dispari di nodi per il quorum Etcd e la sicurezza dello storage.  
Rete (VIP) | Nativo: IP virtuale gestito a livello di sistema operativo; trasparente per K3s. | Complesso: richiede l'installazione di MetalLB con configurazione L2 o BGP utilizzando pod speaker dedicati che consumano CPU/RAM su ciascun nodo.  
Requisiti di archiviazione | Sincrona a livello di byte: replica dei file in tempo reale delle directory esistenti; funziona su dischi di sistema standard; replica dei file a livello di byte con sovraccarico minimo di CPU/rete. | A livello di blocco: archiviazione a blocchi distribuita (Longhorn) tramite pod di archiviazione dedicati; maggiore consumo di risorse.  
Intelligenza di failover | Stabilità indipendente: SafeKit opera al di fuori del runtime del container. Monitora direttamente il sistema operativo e l'hardware, garantendo il failover anche se il piano di controllo Kubernetes o il motore del container si bloccano. | Dipendenza circolare: la logica di failover è ospitata _all'interno_ dei pod che dovrebbe proteggere. Se il sistema operativo host o il motore K3s si bloccano, anche i pod di gestione (MetalLB/Longhorn) si bloccano, spesso richiedendo un intervento manuale per sbloccare il "blocco".  
Amministrazione | Semplificata: Gestibile tramite un'unica console web; non è richiesto alcun esperto Kubernetes . | Specializzata: Richiede una conoscenza approfondita di YAML, Helm e dei controller interni di Kubernetes.  
  
In **, mentre uno stack DIY standard SafeKit MetalLB + Longhorn) offre modularità agli Kubernetes , crea una dipendenza** in cui gli strumenti di storage e di rete sono vulnerabili agli stessi guasti dei nodi che sono progettati per gestire. Questo ciclo **interrotto operando come un livello** indipendente; la soluzione HA a 2 nodi più robusta e **dall'hardware rimane operativa anche se il motore o il sistema operativo Kubernetes si bloccano.** garantisce il ripristino automatico e l'integrità dei dati senza l'ingente sovraccarico di risorse, il quorum obbligatorio a tre nodi o la complessità di configurazione richiesti dai tradizionali overlay di storage a blocchi e di rete distribuiti.

## Video guida: Configurazione di un cluster HA SafeKit mirror {#videoguide-safekit-mirror-cluster}

### Video SafeKit : Clustering a livello di applicazione (8:47) {#demo-mirror-ha-cluster}

Sebbene questo video dimostri l'elevata disponibilità di SafeKit per Microsoft SQL Server , fornisce un'eccellente panoramica di come la soluzione protegge gli ambienti K3s. SafeKit funziona in modo identico per qualsiasi altro database o applicazione critica per l'azienda.

### Video dei momenti salienti {#video-highlights}

  1. 🎬 [ 2 nodi con SQL Server ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. 🎬 [ Configura il cluster e il modulo mirror.safe ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. 🎬 [ Avvia e testa la replica SQL, la migrazione, il failover in caso di arresto anomalo ](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)


&lt;br /&gt; 


{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}