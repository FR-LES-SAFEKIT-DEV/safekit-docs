---
title: "Come funziona un indirizzo IP virtuale (VIP) nel clustering ad alta disponibilità?"
canonical: "https://safekit.eviden.com/it/best-practises/how-a-virtual-ip-address-works/"
description: "Scopri come SafeKit utilizza gli indirizzi IP virtuali (VIP) definiti dal software per garantire un tempo di attività 24 ore su 24, 7 giorni su 7. Scopri il failover automatizzato tramite ARP gratuito e perché supera il reindirizzamento DNS per la continuità aziendale su Windows e Linux."
category: "best-practises"
lang: "it"
topics: "Che cos'è un indirizzo IP virtuale in un cluster ad alta disponibilità?, Implementazione dell'IP virtuale in SafeKit, Sommario, Come funziona un indirizzo IP virtuale (VIP) in un failover della stessa sottorete (cluster di mirror), Come funziona un IP virtuale (VIP) su sottoreti diverse (cluster di mirror), Come funziona un IP virtuale con bilanciamento del carico in una farm con la stessa sottorete (cluster di farm), Come funziona un IP virtuale con bilanciamento del carico su sottoreti diverse (farm Cluster), Reindirizzamento IP virtuale e DNS: perché il failover DNS spesso fallisce, Confronto: implementazione dell'IP virtuale, latenza e trasparenza dell'applicazione, Configurazione di un indirizzo IP virtuale per il bilanciamento del carico di rete e l'elevata disponibilità, Domande frequenti sull'IP virtuale (VIP), 🔍 Hub di navigazione ad alta disponibilità SafeKit"
---

# Come funziona un indirizzo IP virtuale (VIP) nel clustering ad alta disponibilità? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## Cos'è un indirizzo IP virtuale in un cluster ad alta disponibilità? {#virtual-ip-definition}

  * **Definizione:** Un **indirizzo IP virtuale (VIP)** è un indirizzo di rete mobile utilizzato nel [clustering ad alta disponibilità](</it/>) per garantire l'accesso continuo alle applicazioni. A differenza degli IP standard, un VIP non è vincolato a un'interfaccia hardware fisica specifica ma si sposta tra i nodi del cluster per mantenere un unico punto di ingresso persistente per i client.
  * **Nessun hardware richiesto:** SafeKit gestisce il VIP a livello di software utilizzando **ARP gratuito (GARP)**, eliminando la necessità di bilanciatori di carico esterni negli ambienti con la stessa sottorete.
  * **Trasparenza dell'applicazione:** Collegandosi a un VIP locale, le applicazioni non notano gli eventi di failover, preservando gli IP di origine del client e le configurazioni di sicurezza esistenti.
  * **Disaster Recovery:** l'utilizzo di una **LAN estesa** consente di utilizzare lo stesso VIP in più data center remoti, semplificando il failover da sito a sito rispetto al complesso reindirizzamento DNS e ai ritardi di memorizzazione nella cache TTL.


## Implementazione IP virtuale in SafeKit {#safekit-vip-implementation}

  * **Cluster mirror:** presenta un IP mobile attivo solo sul server primario per facilitare la replica e il failover in tempo reale.
  * **Cluster farm:** consente il bilanciamento del carico di rete mantenendo il VIP su tutti i nodi contemporaneamente.


**Vantaggio principale:** utilizzando **ARP gratuito (protocollo di risoluzione degli indirizzi)** o **MAC Address Takeover**, il VIP consente il failover continuo delle applicazioni senza riconfigurazione manuale del client, garantendo la continuità aziendale 24 ore su 24, 7 giorni su 7.

  * **Cloud e multi-sottorete:** Gestito tramite controlli di integrità del bilanciatore del carico esterno (AWS, Azure, GCP) per reindirizzare il traffico su diverse sottoreti.


![Diagramma comparativo del comportamento dell'IP virtuale (VIP) in Evidian SafeKit: cluster mirror che mostrano un IP mobile sul nodo attivo e cluster farm che mostrano il bilanciamento del carico di rete su tutti i nodi.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Strategie di implementazione IP virtuale per cluster Mirror e Farm in SafeKit.**


{{%  insert-safekit-4-buttons-it  %}}
 

## Sommario {#table-of-contents}

  * [Come funziona un indirizzo IP virtuale (VIP) in un failover sulla stessa sottorete (cluster mirror)](#virtual-ip-same-subnet-failover)
  * [Come funziona un IP virtuale (VIP) su diverse sottoreti (Mirror Cluster)](#virtual-ip-different-subnets-failover)
  * [Come funziona un IP virtuale con bilanciamento del carico in una farm con la stessa sottorete (cluster di farm)](#vip-load-balancing-same-subnet)
  * [Come funziona un IP virtuale con bilanciamento del carico su diverse sottoreti (cluster farm)](#vip-load-balancing-different-subnets)
  * [IP virtuale e reindirizzamento DNS: perché il failover DNS spesso fallisce](#virtual-ip-vs-dns-redirection-failover)
  * [Confronto: implementazione IP virtuale, latenza e trasparenza delle applicazioni](#vip-vs-dns-comparison)
  * [Configurazione di un indirizzo IP virtuale per il bilanciamento del carico di rete e l'alta disponibilità](#virtual-ip-configuration-load-balancing-ha)
  * [Domande frequenti sull'IP virtuale (VIP)](#virtual-ip-faq)
  * [🔍 SafeKit Hub di navigazione ad alta disponibilità](#hub)


## Come funziona un indirizzo IP virtuale (VIP) in un failover sulla stessa sottorete (mirror cluster) {#virtual-ip-same-subnet-failover}

### Failover automatizzato e reindirizzamento della rete in una sottorete locale {#automated-failover--network-rerouting-in-a-local-subnet}

Per le organizzazioni che necessitano di continuità aziendale senza soluzione di continuità all'interno di un'infrastruttura locale, **SafeKit Alta disponibilità definita dal software per cluster di rete locale** fornisce una soluzione solida e automatizzata per la gestione degli indirizzi IP virtuali e il failover delle applicazioni in tempo reale. 

### Cluster di mirroring locale: failover continuo di Windows o Linux a 2 nodi {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![Meccanismo di failover SafeKit Virtual IP (VIP) tra due server nella stessa sottorete](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

 Aliasing VIP SafeKit e mappatura degli indirizzi MAC In un **cluster mirror SafeKit** standard in cui entrambi i nodi risiedono nella stessa sottorete locale, l'elevata disponibilità viene ottenuta tramite un **IP virtuale definito dal software (VIP)**. A differenza delle soluzioni basate su hardware, SafeKit gestisce questo VIP direttamente all'interno dello stack di rete del sistema operativo. Questo VIP funge da punto di ingresso logico persistente per i client, sovrapposto agli indirizzi IP fisici univoci del Server 1 e del Server 2 tramite **aliasing IP**. 

#### Aliasing IP avanzato e supporto VIP multipli di SafeKit {#safekits-advanced-ip-aliasing--multiple-vip-support}

Un vantaggio chiave della **soluzione SafeKit** è la sua flessibilità nella gestione delle identità di rete. Il VIP è un terzo indirizzo IP che "galleggia" tra i nodi. In particolare, SafeKit è in grado di gestire **più indirizzi IP virtuali** all'interno di un singolo cluster. Questi possono essere assegnati alla stessa scheda Ethernet primaria o distribuiti su diverse schede fisiche, consentendo configurazioni complesse in cui servizi diversi sono legati a identità virtuali specifiche. 

#### Il meccanismo di failover: ARP gratuito (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

SafeKit garantisce zero interventi manuali durante un guasto hardware. Durante le normali operazioni, il VIP viene mappato all'**indirizzo MAC del Server 1 (mac1)**. Se SafeKit rileva un errore heartbeat sul Server 1, esegue un ripristino in due passaggi: 

  * **Ripristino dell'applicazione:** SafeKit riavvia automaticamente i servizi applicativi critici sul Server 2.
  * **Rerouting di rete:** SafeKit trasmette istantaneamente un messaggio **ARP gratuito (GARP)**. Questo aggiorna forzatamente le cache ARP di tutti gli switch di rete e i client connessi, rimappando il VIP all'**indirizzo MAC del Server 2 (mac2)**.


#### Data center remoti e VLAN estese {#remote-data-centers--extended-vlans}

Sebbene venga generalmente utilizzato per i cluster locali, l'**algoritmo della stessa sottorete di SafeKit** è la scelta preferita per il **Disaster Recovery (DR)** tra siti remoti connessi tramite una **LAN estesa o VLAN estesa**. Questa architettura "allungata" consente di mantenere un'unica sottorete su distanze geografiche, semplificando notevolmente la topologia di rete ed evitando il sovraccarico di protocolli di routing complessi. 

> **⚠️ Nota:** il reindirizzamento di livello 2 tramite ARP gratuito è la **soluzione più trasparente** per le applicazioni. A differenza del reindirizzamento di livello 3 con un sistema di bilanciamento del carico, evita la **traduzione IP di origine/destinazione (SNAT/DNAT)**. L'applicazione riceve il traffico direttamente con l'IP client originale e l'IP virtuale è configurato localmente. **Molte applicazioni preferiscono** vedere l'IP virtuale localmente e ricevere direttamente l'IP del client originale. Senza questa trasparenza, **potrebbero non funzionare come previsto** a causa delle complesse traduzioni di rete.

## Come funziona un IP virtuale (VIP) su diverse sottoreti (mirror cluster) {#virtual-ip-different-subnets-failover}

### Orchestrazione del traffico pronta per il cloud tramite l'integrazione del sistema di bilanciamento del carico {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

Sfruttando l'infrastruttura di rete esterna, **SafeKit Software-Defined High Availability per Multi-AZ e cluster cloud** si integra perfettamente con un **Network Load Balancer** per orchestrare il failover del traffico su sottoreti e zone di disponibilità separate. 

### Cluster di mirroring tra sottoreti: implementazione di Windows e Linux {#cross-subnet-mirror-clusters-windows--linux-implementation}


![Diagramma di un failover IP virtuale utilizzando un sistema di bilanciamento del carico su due sottoreti diverse](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

 Instradamento del traffico su più sottoreti tramite controlli di integrità del sistema di bilanciamento del carico Quando i nodi del cluster risiedono in **sottoreti diverse**, il failover standard basato su ARP non è possibile. In questo scenario, l'**IP virtuale (VIP)** è ospitato su un **Load Balancer (LB)** anziché sulla scheda Ethernet del server. Il Load Balancer funge da gateway, indirizzando il traffico verso gli indirizzi IP fisici dei nodi primari e secondari in base alla disponibilità in tempo reale. 

#### Routing dinamico tramite controlli di integrità SafeKit {#dynamic-routing-via-safekit-health-checks}

SafeKit gestisce l'indirizzamento del traffico fornendo un **URL di controllo dello stato** dedicato su ciascun nodo. Il sistema di bilanciamento del carico interroga questi URL per determinare lo stato del cluster: 

  * **Nodo primario (PRIM):** Il controllo dello stato restituisce `HTTP 200 OK`. Il Load Balancer dirige tutto il traffico qui.
  * **Nodo secondario (SECOND):** Il controllo dello stato restituisce `HTTP 404 NOT FOUND`. Il sistema di bilanciamento del carico non invia traffico a questo nodo.

Durante un **evento di failover**, SafeKit attiva/disattiva istantaneamente le risposte del controllo di integrità, attivando il bilanciatore del carico per reindirizzare il traffico client al nuovo server primario. 

> **⚠️ Nota:** SafeKit fornisce la logica del controllo dello stato; il Load Balancer fisico o virtuale deve essere fornito dalla tua infrastruttura di rete.

#### Integrazione cloud: AWS, Azure e GCP {#cloud-integration-aws-azure-and-gcp}

Questo modello "Bilanciatore del carico + Controllo dello stato" è lo standard di settore per **Alta disponibilità del cloud**. È essenziale per implementare SafeKit in ambienti come: 

  * 💡 [**Amazon AWS**](</solutions/aws-high-availability-cluster-synchronous-replication-failover/>) (bilanciatore del carico di rete AWS)
  * 💡 [**Microsoft Azure**](</solutions/azure-high-availability-cluster-synchronous-replication-failover/>) (bilanciatore del carico di Azure)
  * 💡 [**Google Cloud (GCP)**](</solutions/gcp-high-availability-cluster-synchronous-replication-failover/>) (bilanciamento del carico di Google Cloud)


#### Considerazioni sulla rete: bilanciamento del carico e LAN estesa {#network-considerations-load-balancer-vs-extended-lan}

Se non si desidera un bilanciatore del carico, consultare il team di rete sull'implementazione di una **LAN estesa (VLAN stretching)** tra le sottoreti. Ciò consente di ripristinare il modello VIP più semplice "Stessa sottorete". 

> **⚠️ Nota:** quando opti per un bilanciatore del carico, verifica che la tua applicazione sia compatibile con **Traduzione IP di origine/destinazione (SNAT/DNAT)**. Con un Load Balancer l'applicazione potrebbe perdere traccia dell'identità dell'utente originario o non riuscire ad avviarsi perché non vede più l'IP Virtuale configurato direttamente sulla propria interfaccia di rete.

## Come funziona un IP virtuale con bilanciamento del carico in una farm con la stessa subnet (cluster di farm) {#vip-load-balancing-same-subnet}

### Prestazioni scalabili: bilanciamento del carico e ridondanza a livello di kernel {#scalable-performance-kernel-level-load-balancing--redundancy}

Per gli ambienti a traffico elevato, la **Guida all'architettura: elevata disponibilità scalabile con cluster farm multi-nodo** spiega come SafeKit distribuisce i carichi di lavoro su più server attivi mantenendo la ridondanza totale. 

### Architettura cluster farm: bilanciamento del carico tra nodi Windows o Linux {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


![Diagramma di un IP virtuale (VIP) con carico bilanciato all'interno di un cluster farm con la stessa subnet](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

 Elaborazione del traffico distribuito tramite filtro del kernel In un **cluster di farm con bilanciamento del carico**, un indirizzo IP virtuale (VIP) viene utilizzato per distribuire le richieste del client su più server contemporaneamente. Anche se questo esempio presenta due nodi, l'architettura è scalabile per supportare server farm più grandi. In una configurazione con la stessa sottorete, il VIP è configurato sulla scheda Ethernet di **ogni server** nel cluster tramite aliasing IP. 

#### Distribuzione del traffico: il filtro a livello di kernel {#traffic-distribution-the-kernel-level-filter}

A differenza di un semplice cluster di failover, un cluster farm gestisce il traffico tramite un **filtro a livello di kernel** specializzato. Il processo funziona come segue: 

  * **Mappatura ARP:** Nelle cache ARP dei client, il VIP è inizialmente associato a un singolo indirizzo hardware (ad esempio, `mac1` del Server 1).
  * **Suddivisione dei pacchetti:** quando il Server 1 riceve il traffico, il filtro del kernel SafeKit analizza l'identità dei pacchetti in entrata (in base all'**IP client** o alla **Porta TCP**).
  * **Condivisione del carico:** il filtro determina quali pacchetti devono essere elaborati localmente e quali devono essere reindirizzati ad altri nodi (ad esempio, Server 2) per l'elaborazione, garantendo un carico di lavoro bilanciato.


#### Failover e Reindirizzamento con ARP Gratuito {#failover-and-rerouting-with-gratuitous-arp}

Se il nodo primario (Server 1) fallisce, il cluster mantiene la disponibilità tramite **Gratuitous ARP (GARP)**. SafeKit trasmette un messaggio GARP per aggiornare le cache ARP del client con `mac2` del Server 2. Ciò garantisce che anche se il "punto di ingresso" primario fallisce, i client vengono immediatamente reindirizzati ai nodi sopravvissuti nella farm. 

#### Distribuzione in siti remoti {#deployment-in-remote-sites}

Per le organizzazioni che operano su **data center remoti**, questo algoritmo di bilanciamento del carico rimane funzionale a condizione che i siti siano collegati tramite una **LAN estesa o VLAN**. In questo modo viene creato un ambiente virtuale "stessa subnet", che rappresenta la configurazione più efficiente per i cluster di farm distribuiti geograficamente. 

## Come funziona un IP virtuale con bilanciamento del carico su diverse sottoreti (cluster farm) {#vip-load-balancing-different-subnets}

### Scalabilità multizona: orchestrazione del traffico attraverso sottoreti cloud {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

La **Guida all'architettura: scalabilità dei cluster farm in ambienti multizona e cloud** fornisce il modello per la distribuzione dei carichi di lavoro delle applicazioni su zone e sottoreti di disponibilità separate. 

### Cluster farm su più sottoreti: scalabilità Windows e Linux multinodo {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


![Diagramma di un cluster di farm con carico bilanciato che opera su due sottoreti diverse](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

 Distribuzione globale del traffico tramite bilanciamento del carico esterno Quando i nodi della farm sono distribuiti su **diverse sottoreti** (comune nelle distribuzioni cloud Multi-AZ), l'**IP virtuale (VIP)** è gestito da un **Load Balancer (LB)** esterno. Il LB detiene il VIP e dirige il traffico in entrata verso gli indirizzi IP fisici dei server situati nelle rispettive sottoreti. 

#### Regole intelligenti di routing del traffico e bilanciamento del carico {#intelligent-traffic-routing--load-balancing-rules}

Il sistema di bilanciamento del carico distribuisce le richieste dei client in base a due fattori principali: 

  * **Regole di distribuzione:** il traffico viene suddiviso in base all'affinità della sessione o agli algoritmi di bilanciamento del carico (ad esempio, analizzando l'**indirizzo IP del client** o la **porta TCP del client**).
  * **Disponibilità dei nodi:** il traffico viene instradato solo verso nodi integri come determinato dal controllo dello stato SafeKit.


> **⚠️ Nota:** SafeKit fornisce la logica del controllo dello stato; il Load Balancer fisico o virtuale deve essere fornito dalla tua infrastruttura di rete.

#### Meccanismo di controllo dello stato SafeKit {#safekit-health-check-mechanism}

SafeKit fornisce un **URL di controllo dello stato** in tempo reale su ogni server della farm per comunicarne lo stato operativo al sistema di bilanciamento del carico: 

  * **Nodo SU:** Il controllo dello stato restituisce `HTTP 200 OK`. Il Load Balancer include questo server nella rotazione attiva.
  * **Nodo INATTIVO/Failover:** Se un server o un'applicazione si guasta, SafeKit restituisce `HTTP 404 NOT FOUND` (o il servizio diventa irraggiungibile). Il sistema di bilanciamento del carico interrompe immediatamente l'invio di traffico al nodo guasto.


#### Standard di distribuzione cloud: AWS, Azure e GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Questa architettura è il modello fondamentale per i **cluster Cloud Farm**, garantendo che se un'intera sottorete o zona va offline, i nodi rimanenti continuano a gestire il carico. Questo è supportato nativamente da: 

  * 💡 [**Amazon AWS**](</solutions/aws-load-balancing-cluster-failover/>) (bilanciatore del carico di rete AWS)
  * 💡 [**Microsoft Azure**](</solutions/azure-load-balancing-cluster-failover/>) (bilanciatore del carico di Azure)
  * 💡 [**Google Cloud (GCP)**](</solutions/gcp-load-balancing-cluster-failover/>) (bilanciamento del carico di Google Cloud)


## IP virtuale e reindirizzamento DNS: perché il failover DNS spesso fallisce {#virtual-ip-vs-dns-redirection-failover}

### La trappola della propagazione DNS: perché i VIP superano il reindirizzamento DNS {#the-dns-propagation-trap-why-vips-outperform-dns-redirection}

Affidarsi al DNS per il failover spesso crea un **falso senso di sicurezza** nelle architetture ad alta disponibilità. Sebbene la modifica di un record DNS in modo che punti a un server di backup sembri un percorso di ripristino semplice, introduce una variabile critica: **latenza imprevedibile**. Poiché il reindirizzamento basato su DNS si basa su un ecosistema incontrollato di risolutori ricorsivi intermedi per riconoscere e propagare il cambiamento, è fondamentalmente incompatibile con i requisiti di "downtime zero" dei moderni servizi aziendali. 

### Lo scenario tecnico: risoluzione DNS e client "bloccato". {#the-technical-scenario-dns-resolution-and-the-stuck-client}

In una configurazione di rete standard, un **nome virtuale** (il nome DNS) funge da punto di ingresso leggibile per gli utenti. Tuttavia, affinché i dati possano viaggiare attraverso la rete, il nome deve essere risolto in uno specifico indirizzo **IP fisico**. 

![Diagramma che mostra la risoluzione del nome DNS sull'IP fisico 1 in un cluster a disponibilità elevata](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 Risoluzione DNS e client "bloccati" sull'IP fisico 1 in un cluster ad alta disponibilità

#### Stato attuale: risoluzione all'IP fisico 1 {#current-state-resolution-to-physical-ip-1}

Inizialmente, **Client 1** e **Client 2** interrogano il sistema DNS per il nome virtuale. Il sistema restituisce **IP fisico 1**. I client stabiliscono quindi una connessione di rete diretta (socket) a quello specifico indirizzo hardware. 

#### La sfida del failover: reindirizzamento all'IP fisico 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

Se il server con IP fisico 1 si guasta, un amministratore aggiorna il record DNS in modo che punti a **IP fisico 2**. Per reindirizzare con successo i client, deve verificarsi una sequenza "perfetta": 

  * Il **Time to Live (TTL)** deve scadere su tutti gli ISP intermedi e i risolutori aziendali.
  * La cache DNS locale sia sul Client 1 che sul Client 2 deve essere svuotata.
  * L'applicazione deve chiudere il socket esistente e avviare una _nuova_ ricerca DNS.

Se uno qualsiasi di questi passaggi non viene eseguito, **Client 1 e Client 2 rimarranno "bloccati"** tentando di comunicare con l'IP fisico 1 morto, con conseguente inattività del servizio nonostante l'aggiornamento dei record DNS. 

### Le due "scatole nere" del reindirizzamento DNS {#the-two-black-boxes-of-dns-redirection}

  * **Caching ricorsivo:** molti provider di servizi Internet (ISP) e risolutori DNS aziendali ignorano le impostazioni TTL basse per ridurre il traffico, spesso memorizzando nella cache il "vecchio" IP fisico 1 per minuti o addirittura ore oltre la scadenza richiesta.
  * **Persistenza dell'applicazione:** le applicazioni moderne (come i microservizi basati su Java o i browser Web) spesso eseguono una ricerca DNS solo una volta all'avvio. Anche se il record DNS viene aggiornato all'IP fisico 2, l'applicazione continua a utilizzare l'IP iniziale archiviato nella sua memoria interna.


### Conclusione {#conclusion}

Il reindirizzamento DNS è una soluzione incoerente per una soluzione a disponibilità elevata. Per il failover istantaneo all'interno di un ambiente locale o regionale, un **IP virtuale (VIP)** definito dal software è l'unico modo per garantire la persistenza garantita senza tempi di inattività. 

## Confronto: implementazione dell'IP virtuale, latenza e trasparenza dell'applicazione {#vip-vs-dns-comparison}

**Confronto tecnico tra i metodi di reindirizzamento dell'IP virtuale (VIP) e il reindirizzamento DNS per l'alta disponibilità e il ripristino di emergenza.**

Ambiente e caso d'uso | Tipo ad alta disponibilità | Meccanismo di reindirizzamento | Latenza di rete | Trasparenza delle applicazioni e località IP  
---|---|---|---|---  
Primario/Backup (alta disponibilità) | Gruppo di specchi | Acquisizione ARP/MAC gratuita | Molto basso: tempo necessario per rilevare e inviare la trasmissione GARP | Trasparenza completa: l'IP virtuale è locale sul nodo attivo. L'IP del client viene preservato.  
Bilanciamento del carico (attivo/attivo) | Gruppo agricolo | Filtro di rete a livello di kernel/GARP | Molto basso: tempo necessario per rilevare e riconfigurare i filtri di rete | Trasparenza completa: l'IP virtuale è locale su tutti i nodi. L'IP del client viene preservato.  
Stessa sottorete/LAN estesa (stretching VLAN) | Disaster Recovery (data center remoti) | Aliasing IP standard/GARP | Basso: dipende dalla VLAN estesa RTT (Round Trip Time) | Trasparenza completa: l'IP virtuale è locale sui nodi. L'IP del client viene preservato.  
Sottoreti diverse | Disaster Recovery (datacenter remoti/Cloud) | Bilanciatore del carico esterno | Moderato: latenza di failover più elevata a causa degli intervalli di controllo dello stato del sistema di bilanciamento del carico | ⚠️ Trasparenza parziale: utilizza SNAT/DNAT. L'IP virtuale **NON** è locale sui nodi. L'IP del client **NON** viene conservato. L'applicazione deve supportarlo.  
Reindirizzamento DNS: nessun VIP | Disaster Recovery (data center remoti) | Aggiornamento record DNS (nome/IP fisico) | Elevato/imprevedibile: dipendente dal DNS TTL (Time To Live) e dalla memorizzazione nella cache DNS del client. | ⚠️ Inaffidabile: il client deve risolvere nuovamente il DNS. Nella maggior parte dei casi, i client continuano a utilizzare l'IP obsoleto risolto all'avvio e non vengono reindirizzati dopo un failover.  
  
## Configurazione di un indirizzo IP virtuale per il bilanciamento del carico di rete e l'alta disponibilità {#virtual-ip-configuration-load-balancing-ha}


{{%  insert-safekit-farm-video-en  %}}
 

## Domande frequenti sull'IP virtuale (VIP) {#virtual-ip-faq}

### IP virtuale (VIP) e rete {#virtual-ip-vip--networking}

Cos'è un IP virtuale (VIP) e in cosa differisce da un IP fisico?

Mentre un **indirizzo IP fisico** è legato a un'interfaccia di rete specifica, un **IP virtuale (VIP)** è un indirizzo "mobile" indipendente dall'hardware. In un cluster SafeKit, il VIP funge da punto di ingresso persistente; se il server primario si guasta, il VIP migra automaticamente su un nodo secondario integro, garantendo zero riconfigurazione del client.

Ho bisogno di un bilanciatore del carico hardware per utilizzare un IP virtuale?

No. Il **software SafeKit High Availability** gestisce l'IP virtuale a livello di software. Nelle architetture con la stessa sottorete, utilizza **aliasing IP** e **ARP gratuito (GARP)** per reindirizzare il traffico. Ciò elimina il costo e la complessità dei bilanciatori del carico hardware esterni o dei server proxy dedicati.

Che cos'è l'ARP gratuito (GARP) e perché viene utilizzato?

**ARP gratuito (GARP)** è una trasmissione di rete che aggiorna le tabelle ARP di switch e router di rete. Durante un failover, il nuovo server primario invia un pacchetto GARP per annunciare che l'**IP virtuale** è ora mappato sul suo indirizzo MAC, forzando il reindirizzamento immediato del traffico attraverso la struttura della rete.

Posso associare un nome DNS ad un IP virtuale?

**Sì.** Puoi associare un nome DNS a un VIP creando un record A standard. Il vantaggio principale è che il reindirizzamento viene gestito a **livello VIP** (tramite ARP o reindirizzamento di rete) e **non a livello DNS**. Ciò garantisce la **trasparenza dell'applicazione** evitando ritardi associati alla propagazione DNS e alla scadenza TTL.

### Cloud e architetture avanzate {#cloud--advanced-architectures}

Come funziona un IP virtuale nel Cloud (AWS, Azure, GCP)?

Negli ambienti cloud in cui Layer 2 (ARP) è limitato, SafeKit si integra con **Cloud Load Balancer** (AWS ELB, Azure LB o Google GCLB). SafeKit fornisce un **URL di controllo dello stato** che la piattaforma monitora per instradare il traffico al nodo attivo utilizzando SNAT/DNAT.

Una LAN estesa è migliore di un sistema di bilanciamento del carico per il ripristino di emergenza?

**SÌ**. Per i data center remoti, una **LAN estesa (VLAN estesa)** è spesso superiore perché mantiene la **trasparenza delle applicazioni** tra i siti. Mantenendo lo **stesso IP virtuale**, l'applicazione e i suoi client continuano a comunicare utilizzando la stessa identità, rendendo la transizione tra data center completamente fluida.

Quali sono le limitazioni del reindirizzamento DNS rispetto all'IP virtuale?

Il **reindirizzamento DNS** è limitato dal **TTL (Time to Live)** e dalla memorizzazione nella cache lato client, che possono ritardare il ripristino per ore. Uno dei principali svantaggi è che **i client che non risolvono nuovamente il proprio nome DNS rimangono bloccati** nel tentativo di connettersi al server non riuscito. Al contrario, un **IP virtuale** fornisce un failover Layer 2 istantaneo che reindirizza immediatamente tutto il traffico, garantendo la connettività indipendentemente dallo stato della cache DNS lato client.

### Trasparenza e sicurezza {#transparency--security}

Perché un IP virtuale locale è importante per la trasparenza dell'applicazione?

Un **IP virtuale (VIP)** locale garantisce la **trasparenza dell'applicazione** consentendo al software di associarsi a un VIP persistente. SafeKit gestisce il reindirizzamento a **livello kernel**, mantenendo l'applicazione inconsapevole dei failover del cluster, a differenza delle soluzioni DNAT in cui cambia l'IP associato.

L'utilizzo di un IP virtuale preserva l'indirizzo IP originale del client?

SÌ. SafeKit evita la conversione degli indirizzi di rete di origine (SNAT). Poiché il VIP è locale rispetto al server attivo, l'applicazione riceve l'**IP client originale**, che è fondamentale per il controllo della sicurezza, la persistenza della sessione e la registrazione normativa.


{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}