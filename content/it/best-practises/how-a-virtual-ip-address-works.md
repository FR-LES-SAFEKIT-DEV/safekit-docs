---
title: "Come funziona un indirizzo IP virtuale (VIP) in un cluster ad alta disponibilità?"
canonical: "https://safekit.eviden.com/it/best-practises/how-a-virtual-ip-address-works/"
description: "Scopri come SafeKit utilizza gli indirizzi IP virtuali (VIP) definiti via software per garantire un funzionamento ininterrotto 24 ore su 24, 7 giorni su 7. Scopri il failover automatico tramite Gratuitous ARP e perché offre prestazioni superiori al reindirizzamento DNS per la continuità operativa su Windows e Linux ."
category: "best-practises"
lang: "it"
topics: "Che cos'è un indirizzo IP virtuale in un cluster ad alta disponibilità?, Implementazione IP virtuale in SafeKit , Sommario, Come funziona un indirizzo IP virtuale (VIP) in un failover nella stessa sottorete (cluster Mirror ), Come funziona un IP virtuale (VIP) tra sottoreti diverse (cluster Mirror ), Come funziona un IP virtuale con bilanciamento del carico in un cluster <span class="notranslate farm-term" translate="no">Farm</span> nella stessa sottorete (cluster <span class="notranslate farm-term" translate="no">Farm</span> ), Come funziona un IP virtuale con bilanciamento del carico tra sottoreti diverse (cluster <span class="notranslate farm-term" translate="no">Farm</span> ), IP virtuale vs. reindirizzamento DNS: perché il failover DNS spesso fallisce, Confronto: implementazione IP virtuale, latenza e trasparenza delle applicazioni, Configurazione di un indirizzo IP virtuale per il bilanciamento del carico di rete e l'alta disponibilità, Domande frequenti sull'IP virtuale (VIP), 🔍 Hub di navigazione per l'alta disponibilità SafeKit"
---

# Come funziona un indirizzo IP virtuale (VIP) in un cluster ad alta disponibilità? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## Che cos'è un indirizzo IP virtuale in un cluster ad alta disponibilità? {#virtual-ip-definition}

  * **Definizione:** Un **indirizzo IP virtuale (VIP)** è un indirizzo di rete mobile utilizzato nel clustering ad alta disponibilità [ ](</>) per garantire l'accesso continuo alle applicazioni. A differenza degli IP standard, un VIP non è vincolato a una specifica interfaccia hardware fisica, ma si sposta tra i nodi del cluster per mantenere un unico punto di accesso persistente per i client.
  * **Nessun hardware richiesto:** SafeKit gestisce il VIP a livello software utilizzando **Gratuitous ARP (GARP)** , eliminando la necessità di bilanciatori di carico esterni in ambienti della stessa sottorete.
  * **Trasparenza dell'applicazione:** Collegandosi a un VIP locale, le applicazioni rimangono all'oscuro degli eventi di failover, preservando gli IP di origine dei client e le configurazioni di sicurezza esistenti.
  * **Ripristino di emergenza:** l'utilizzo di una **LAN estesa** consente di utilizzare lo stesso IP virtuale (VIP) in data center remoti, semplificando il failover da sito a sito rispetto a complesse procedure di reindirizzamento DNS e ritardi dovuti alla cache TTL.


## Implementazione IP virtuale in SafeKit {#safekit-vip-implementation}

  * Cluster **Mirror :** Dispone di un IP mobile attivo solo sul server primario per facilitare la replica in tempo reale e il failover.
  * **<span class="notranslate farm-term" translate="no">Farm</span> Cluster:** Abilita il bilanciamento del carico di rete mantenendo il VIP su tutti i nodi contemporaneamente.


**Vantaggio chiave:** Utilizzando **ARP (Address Resolution Protocol) gratuito** o **Acquisizione indirizzo MAC** , il VIP consente un failover dell'applicazione senza interruzioni e senza riconfigurazione manuale del client, garantendo la continuità operativa 24 ore su 24, 7 giorni su 7.

  * **Cloud e multi-sottorete:** Gestito tramite controlli di integrità del bilanciatore di carico esterno ( AWS , Azure , GCP ) per reindirizzare il traffico tra diverse sottoreti.


Diagramma comparativo del comportamento dell'IP virtuale (VIP) in Evidian ![ : cluster SafeKit Mirror mostrano un IP fluttuante sul nodo attivo rispetto a cluster Farm che mostrano il bilanciamento del carico di rete su tutti i nodi. ](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

Strategie di implementazione IP virtuale **per i cluster Mirror e <span class="notranslate farm-term" translate="no">Farm</span> in SafeKit .**


{{%  insert-safekit-4-buttons-it  %}}
 

## Indice {#table-of-contents}

  * [ Come funziona un indirizzo IP virtuale (VIP) in un failover nella stessa sottorete (cluster Mirror ) ](#virtual-ip-same-subnet-failover)
  * [ Come funziona un IP virtuale (VIP) su diverse sottoreti (Cluster Mirror ) ](#virtual-ip-different-subnets-failover)
  * [ Come funziona un IP virtuale con bilanciamento del carico nella stessa sottorete <span class="notranslate farm-term" translate="no">Farm</span> (Cluster <span class="notranslate farm-term" translate="no">Farm</span> ) ](#vip-load-balancing-same-subnet)
  * [ Come funziona un IP virtuale con bilanciamento del carico su diverse sottoreti (Cluster <span class="notranslate farm-term" translate="no">Farm</span> ) ](#vip-load-balancing-different-subnets)
  * [ IP virtuale vs. reindirizzamento DNS: perché il failover DNS spesso fallisce ](#virtual-ip-vs-dns-redirection-failover)
  * Confronto [ : Implementazione IP virtuale, latenza e trasparenza applicativa ](#vip-vs-dns-comparison)
  * [ Configurazione di un indirizzo IP virtuale per il bilanciamento del carico di rete e l'alta disponibilità ](#virtual-ip-configuration-load-balancing-ha)
  * [ Domande frequenti sull'IP virtuale (VIP) ](#virtual-ip-faq)
  * [ 🔍 SafeKit Hub di navigazione ad alta disponibilità ](#hub)


## Come funziona un indirizzo IP virtuale (VIP) in un failover nella stessa sottorete (cluster Mirror ) {#virtual-ip-same-subnet-failover}

### Failover automatico e reindirizzamento di rete in una sottorete locale {#automated-failover--network-rerouting-in-a-local-subnet}

Per le organizzazioni che necessitano di una continuità operativa senza interruzioni all'interno di un'infrastruttura locale, **SafeKit** offrono una soluzione robusta e automatizzata per la gestione degli indirizzi IP virtuali e il failover delle applicazioni in tempo reale. 

### Cluster locale Mirror : Failover senza interruzioni a 2 nodi Windows o Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![ SafeKit Meccanismo di failover IP virtuale (VIP) tra due server nella stessa sottorete ](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

 SafeKit VIP Aliasing e mappatura degli indirizzi MAC In un **cluster SafeKit mirror** standard, in cui entrambi i nodi risiedono nella stessa sottorete locale, l'alta disponibilità viene ottenuta tramite un **indirizzo IP virtuale (VIP) definito via software** . A differenza delle soluzioni basate su hardware, SafeKit gestisce questo VIP direttamente all'interno dello stack di rete del sistema operativo. Questo VIP funge da punto di ingresso logico persistente per i client, sovrapposto agli indirizzi IP fisici univoci del Server 1 e del Server 2 tramite **IP aliasing** . 

#### Alias IP avanzato di SafeKit e supporto VIP multiplo {#safekits-advanced-ip-aliasing--multiple-vip-support}

Un vantaggio fondamentale della soluzione **SafeKit** è la sua flessibilità nella gestione delle identità di rete. Il VIP è un terzo indirizzo IP che "fluttua" tra i nodi. In particolare, SafeKit è in grado di gestire **più indirizzi IP virtuali** all'interno di un singolo cluster. Questi possono essere assegnati alla stessa scheda Ethernet primaria o distribuiti su diverse schede fisiche, consentendo configurazioni complesse in cui diversi servizi sono associati a specifiche identità virtuali. 

#### Il meccanismo di failover: ARP gratuito (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

SafeKit garantisce l'assenza di intervento manuale in caso di guasto hardware. In condizioni operative normali, il VIP è mappato all'indirizzo MAC (mac1) del Server 1 ( **)** ). Se SafeKit rileva un errore di heartbeat sul Server 1, esegue un ripristino in due fasi: 

  * Ripristino dell'applicazione **:** SafeKit riavvia automaticamente i servizi applicativi critici sul Server 2.
  * **Reinstradamento di rete:** SafeKit trasmette istantaneamente un messaggio **Gratuitous ARP (GARP)** . Questo aggiorna forzatamente le cache ARP di tutti gli switch di rete e i client connessi, rimappando il VIP all'indirizzo MAC (mac2) del server 2 ( **)** .


#### Centri dati remoti e VLAN estese {#remote-data-centers--extended-vlans}

Sebbene tipicamente utilizzato per cluster locali, **l'algoritmo same-subnet di SafeKit** è la scelta preferita per **il Disaster Recovery (DR)** tra siti remoti connessi tramite una **LAN estesa o una VLAN estesa** . Questa architettura "estesa" consente di mantenere un'unica sottorete su distanze geografiche, semplificando notevolmente la topologia di rete ed evitando il sovraccarico di protocolli di routing complessi. 

> **⚠️ Nota:** Il reindirizzamento di livello 2 tramite ARP gratuito è la **soluzione più trasparente** per le applicazioni. A differenza del reindirizzamento di livello 3 con un bilanciatore di carico, evita **traduzione IP sorgente/destinazione (SNAT/DNAT)** . L'applicazione riceve il traffico direttamente con l'IP client originale e l'IP virtuale viene configurato localmente. **Molte applicazioni preferiscono** vedere l'IP virtuale localmente e ricevere direttamente l'IP client originale. Senza questa trasparenza, potrebbero **non funzionare come previsto** a causa di complesse traduzioni di rete.

## Come funziona un IP virtuale (VIP) su diverse sottoreti (cluster Mirror ) {#virtual-ip-different-subnets-failover}

### Orchestrazione del traffico pronta per il cloud tramite integrazione con bilanciatore di carico {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

Sfruttando l'infrastruttura di rete esterna, **SafeKit Software-Defined High Availability per cluster multi-AZ e cloud** si integra perfettamente con un **bilanciatore di carico di rete** per orchestrare il failover del traffico tra sottoreti e zone di disponibilità separate. 

### Cluster Mirror tra sottoreti: implementazione Windows e Linux {#cross-subnet-mirror-clusters-windows--linux-implementation}


![ Diagramma di un failover IP virtuale tramite bilanciatore di carico su due sottoreti diverse ](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

 Instradamento del traffico multi-sottorete tramite controlli di integrità del bilanciatore di carico Quando i nodi del cluster risiedono in **diverse sottoreti** , il failover standard basato su ARP non è possibile. In questo scenario, il **IP virtuale (VIP)** è ospitato su un **Bilanciatore di carico (LB)** anziché la scheda Ethernet del server. Il bilanciatore di carico funge da gateway, indirizzando il traffico verso gli indirizzi IP fisici dei nodi primario e secondario in base alla disponibilità in tempo reale. 

#### Instradamento dinamico tramite controlli di integrità SafeKit {#dynamic-routing-via-safekit-health-checks}

SafeKit gestisce l'instradamento del traffico fornendo un **URL dedicato per il controllo dello stato di salute** su ciascun nodo. Il bilanciatore di carico interroga questi URL per determinare lo stato del cluster: 

  * **Nodo primario (PRIM):** Il controllo di integrità restituisce `HTTP 200 OK` . Il bilanciatore di carico indirizza tutto il traffico qui.
  * **Nodo secondario (SECONDO):** Il controllo di integrità restituisce `HTTP 404 NOT FOUND` . Il bilanciatore di carico non invia traffico a questo nodo.

Durante un **evento di failover** , SafeKit commuta istantaneamente le risposte al controllo di integrità, attivando il Load Balancer per reindirizzare il traffico client al nuovo server primario. 

> **⚠️ Nota:** SafeKit forniscono la logica di controllo dello stato; il bilanciatore di carico fisico o virtuale deve essere fornito dalla tua infrastruttura di rete.

#### Integrazione cloud: AWS , Azure , GCP e {#cloud-integration-aws-azure-and-gcp}

Questo modello "Load Balancer + Health Check" è lo standard di settore per **Cloud High Availability** . È essenziale per implementare SafeKit in ambienti come: 

  * 💡 [ **Amazon AWS** ](</it/solutions/aws-high-availability-cluster-synchronous-replication-failover/>) ( AWS Bilanciatore di carico di rete)
  * 💡 [ **Microsoft Azure** ](</it/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) Bilanciatore di carico Azure )
  * 💡 [ **Google Cloud ( GCP )** ](</it/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>) (Bilanciamento del carico di Google Cloud)


#### Considerazioni di rete: Bilanciatore di carico vs. LAN estesa {#network-considerations-load-balancer-vs-extended-lan}

Se non si desidera utilizzare un bilanciatore di carico, consultare il team di rete per implementare una LAN estesa **(VLAN stretching)** tra le sottoreti. Ciò consente di tornare al modello VIP "Stessa sottorete" più semplice. 

> **⚠️ Nota:** Quando si sceglie un Load Balancer, verificare che l'applicazione sia compatibile con **Traduzione IP di origine/destinazione (SNAT/DNAT)** . Con un Load Balancer, l'applicazione potrebbe perdere traccia dell'identità dell'utente originale o non avviarsi perché non vede più l'IP virtuale configurato direttamente sulla propria interfaccia di rete.

## Come funziona un IP virtuale con bilanciamento del carico nella stessa sottorete <span class="notranslate farm-term" translate="no">Farm</span> (cluster <span class="notranslate farm-term" translate="no">Farm</span> ) {#vip-load-balancing-same-subnet}

### Prestazioni scalabili: bilanciamento del carico e ridondanza a livello di kernel {#scalable-performance-kernel-level-load-balancing--redundancy}

Per gli ambienti ad alto traffico, la Guida all'architettura **: Alta disponibilità scalabile con cluster <span class="notranslate farm-term" translate="no">Farm</span> multi-nodo e** spiega come SafeKit distribuisce i carichi di lavoro su più server attivi mantenendo la totale ridondanza. 

### Architettura del cluster <span class="notranslate farm-term" translate="no">Farm</span> : bilanciamento del carico tra i nodi Windows o Linux {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


Diagramma ![ di un IP virtuale (VIP) con bilanciamento del carico all'interno di un cluster farm della stessa sottorete ](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

 Elaborazione distribuita del traffico tramite filtraggio del kernel In un cluster di bilanciamento del carico **<span class="notranslate farm-term" translate="no">farm</span>** , un indirizzo IP virtuale (VIP) viene utilizzato per distribuire le richieste dei client su più server contemporaneamente. Sebbene questo esempio preveda due nodi, l'architettura è scalabile per supportare server farm più grandi. In una configurazione sulla stessa sottorete, il VIP è configurato sulla scheda Ethernet di **di ogni server** nel cluster tramite alias IP. 

#### Distribuzione del traffico: il filtro a livello di kernel {#traffic-distribution-the-kernel-level-filter}

A differenza di un semplice cluster di failover, un cluster <span class="notranslate farm-term" translate="no">farm</span> gestisce il traffico tramite un **filtro specializzato a livello di kernel** . Il processo funziona come segue: 

  * Mappatura ARP **:** Nelle cache ARP dei client, il VIP è inizialmente associato a un singolo indirizzo hardware (ad esempio, `mac1` del Server 1).
  * **Suddivisione dei pacchetti:** Quando il Server 1 riceve il traffico, il filtro del kernel SafeKit analizza l'identità dei pacchetti in entrata (in base a **Indirizzo IP client** o **Porta TCP** ).
  * **Condivisione del carico:** Il filtro determina quali pacchetti devono essere elaborati localmente e quali devono essere reindirizzati ad altri nodi (ad esempio, Server 2) per l'elaborazione, garantendo un carico di lavoro bilanciato.


#### Failover e reindirizzamento con ARP gratuito {#failover-and-rerouting-with-gratuitous-arp}

Se il nodo primario (Server 1) si guasta, il cluster mantiene la disponibilità tramite **Gratuitous ARP (GARP)** . SafeKit trasmette un messaggio GARP per aggiornare le cache ARP dei client con `mac2` del Server 2. Ciò garantisce che, anche in caso di guasto del "punto di ingresso" primario, i client vengano immediatamente reindirizzati ai nodi rimanenti in farm . 

#### Distribuzione in siti remoti {#deployment-in-remote-sites}

Per le organizzazioni che operano su **data center remoti** , questo algoritmo di bilanciamento del carico rimane funzionale a condizione che i siti siano collegati tramite una **LAN estesa o una VLAN** . Ciò crea un ambiente virtuale "della stessa sottorete", che rappresenta la configurazione più efficiente per i cluster <span class="notranslate farm-term" translate="no">farm</span> distribuiti geograficamente. 

## Come funziona un IP virtuale con bilanciamento del carico su diverse sottoreti (cluster <span class="notranslate farm-term" translate="no">Farm</span> ) {#vip-load-balancing-different-subnets}

### Scalabilità multizona: orchestrazione del traffico tra sottoreti cloud {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

La guida all'architettura **: scalabilità dei cluster <span class="notranslate farm-term" translate="no">Farm</span> in ambienti multi-zona e cloud.** fornisce il modello per la distribuzione dei carichi di lavoro delle applicazioni su zone di disponibilità e sottoreti separate. 

### Cluster <span class="notranslate farm-term" translate="no">Farm</span> tra sottoreti: scalabilità multi-nodo Windows e Linux {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


Diagramma ![ di un cluster farm con bilanciamento del carico operante su due sottoreti diverse ](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

 Distribuzione globale del traffico tramite bilanciamento del carico esterno Quando i nodi <span class="notranslate farm-term" translate="no">farm</span> sono distribuiti su **sottoreti diverse** (comune nelle implementazioni cloud Multi-AZ), l' **indirizzo IP virtuale (VIP)** viene gestito da un **bilanciatore di carico (LB)** esterno. Il bilanciatore di carico detiene il VIP e indirizza il traffico in entrata verso gli indirizzi IP fisici dei server situati nelle rispettive sottoreti. 

#### Regole intelligenti di instradamento del traffico e bilanciamento del carico {#intelligent-traffic-routing--load-balancing-rules}

Il bilanciatore di carico distribuisce le richieste dei client in base a due fattori principali: 

  * Regole **distribuzione** : il traffico **viene suddiviso in base all'affinità di sessione o agli algoritmi di bilanciamento del carico (** **la porta TCP del client** ).
  * Disponibilità del nodo **: il traffico** viene instradato solo verso nodi funzionanti, come determinato dal controllo di integrità SafeKit .


> **⚠️ Nota:** SafeKit forniscono la logica di controllo dello stato; il bilanciatore di carico fisico o virtuale deve essere fornito dalla tua infrastruttura di rete.

#### Meccanismo di controllo dello stato di salute SafeKit {#safekit-health-check-mechanism}

SafeKit fornisce un **URL di controllo dello stato di salute** in tempo reale su ogni server in <span class="notranslate farm-term" translate="no">farm</span> per comunicare il suo stato operativo al bilanciatore di carico: 

  * **Nodo ATTIVO:** Il controllo di integrità restituisce `HTTP 200 OK` . Il bilanciatore di carico include questo server nella rotazione attiva.
  * **Nodo DOWN/Failover:** Se un server o un'applicazione si guasta, SafeKit restituisce `HTTP 404 NOT FOUND` (oppure il servizio diventa irraggiungibile). Il bilanciatore di carico interrompe immediatamente l'invio del traffico al nodo guasto.


#### Standard di distribuzione cloud: AWS , Azure e GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Questa architettura è il modello fondamentale per i cluster cloud **<span class="notranslate farm-term" translate="no">Farm</span>** , garantendo che se un'intera sottorete o zona va offline, i nodi rimanenti continuano a gestire il carico. Questa funzionalità è supportata nativamente da: 

  * 💡 [ **Amazon AWS** ](</it/solutions/aws-load-balancing-cluster-failover/>) ( AWS Bilanciatore di carico di rete)
  * 💡 [ **Microsoft Azure** ](</it/solutions/azure-load-balancing-cluster-failover/>) Bilanciatore di carico Azure )
  * 💡 [ **Google Cloud ( GCP )** ](</it/solutions/gcp-load-balancing-cluster-failover/>) (Bilanciamento del carico di Google Cloud)


## IP virtuale vs. reindirizzamento DNS: perché il failover DNS spesso fallisce {#virtual-ip-vs-dns-redirection-failover}

### La trappola della propagazione DNS: perché gli indirizzi IP virtuali (VIP) superano le prestazioni del reindirizzamento DNS {#the-dns-propagation-trap-why-vips-outperform-dns-redirection}

Affidarsi al DNS per il **spesso crea un falso senso di sicurezza** architetture ad alta disponibilità. Sebbene la modifica di un record DNS per puntare a un server di backup sembri un percorso di ripristino semplice, introduce una variabile critica: **latenza** . Poiché il reindirizzamento basato su DNS si affida a un ecosistema incontrollato di resolver ricorsivi intermedi per riconoscere e propagare la modifica, è fondamentalmente incompatibile con i requisiti di "zero tempi di inattività" dei moderni servizi aziendali. 

### Scenario tecnico: risoluzione DNS e client "bloccato" {#the-technical-scenario-dns-resolution-and-the-stuck-client}

In una configurazione di rete standard, un **nome virtuale** (il nome DNS) funge da punto di accesso leggibile dall'uomo per gli utenti. Tuttavia, affinché i dati possano viaggiare attraverso la rete, tale nome deve essere risolto in uno specifico indirizzo **IP fisico** . 

Diagramma ![ che mostra la risoluzione del nome DNS all'indirizzo IP fisico 1 in un cluster ad alta disponibilità ](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 Risoluzione DNS e client "bloccati" sull'indirizzo IP fisico 1 in un cluster ad alta disponibilità

#### Stato attuale: Risoluzione all'indirizzo IP fisico 1 {#current-state-resolution-to-physical-ip-1}

Inizialmente, **il Client 1** e **il Client 2** interrogano il sistema DNS per ottenere il nome virtuale. Il sistema restituisce **l'indirizzo IP fisico 1.** I client stabiliscono quindi una connessione di rete diretta (socket) a quello specifico indirizzo hardware. 

#### La sfida del failover: reindirizzamento all'indirizzo IP fisico 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

Se il server all'indirizzo IP fisico 1 non funziona, un amministratore aggiorna il record DNS in modo che punti a **all'indirizzo IP fisico 2** . Per reindirizzare correttamente i client, deve verificarsi una sequenza "perfetta": 

  * Il **Time to Live (TTL)** deve scadere su tutti i resolver intermedi degli ISP e delle aziende.
  * La cache DNS locale sia sul Client 1 che sul Client 2 deve essere svuotata.
  * L'applicazione deve chiudere il socket esistente e avviare una _nuova_ ricerca DNS.

Se uno qualsiasi di questi passaggi viene omesso, il Client 1 e il Client 2 **rimarranno "bloccati"** nel tentativo di comunicare con l'indirizzo IP fisico 1 non funzionante, causando un'interruzione del servizio nonostante l'aggiornamento dei record DNS. 

### Le due "scatole nere" del reindirizzamento DNS {#the-two-black-boxes-of-dns-redirection}

  * **Cache ricorsiva:** Molti provider di servizi Internet (ISP) e resolver DNS aziendali ignorano le impostazioni TTL basse per ridurre il traffico, spesso memorizzando nella cache il "vecchio" IP fisico 1 per minuti o addirittura ore oltre la scadenza richiesta.
  * **Persistenza dell'applicazione:** Le applicazioni moderne (come i microservizi basati su Java o i browser web) spesso eseguono una ricerca DNS una sola volta all'avvio. Anche se il record DNS viene aggiornato all'IP fisico 2, l'applicazione continua a utilizzare l'IP iniziale memorizzato nella sua memoria interna.


### Conclusione {#conclusion}

Il reindirizzamento DNS è una soluzione incoerente per un'elevata disponibilità. Per un failover istantaneo in un ambiente locale o regionale, un **indirizzo IP virtuale (VIP)** definito via software è l'unico modo per garantire la persistenza senza interruzioni del servizio. 

## Confronto: Implementazione IP virtuale, latenza e trasparenza applicativa {#vip-vs-dns-comparison}

**Confronto tecnico tra i metodi di reindirizzamento IP virtuale (VIP) e il reindirizzamento DNS per l'alta disponibilità e il ripristino di emergenza.**

Ambiente e caso d'uso | Tipo di alta disponibilità | Meccanismo di reindirizzamento | Latenza di rete | Trasparenza dell'applicazione e località IP  
---|---|---|---|---  
Primario/Backup (Alta disponibilità) | Mirror Cluster | Acquisizione ARP/MAC gratuita | Molto basso: tempo per rilevare e inviare broadcast GARP | Piena trasparenza: l'IP virtuale è locale sul nodo attivo. L'IP del client viene preservato.  
Bilanciamento del carico (attivo/attivo) | <span class="notranslate farm-term" translate="no">Farm</span> Cluster | Filtro di rete a livello kernel / GARP | Molto basso: tempo per rilevare e riconfigurare i filtri di rete | Trasparenza completa: l'IP virtuale è locale su tutti i nodi. L'IP del client viene preservato.  
Stessa sottorete / LAN estesa (VLAN Stretching) | Disaster Recovery (data center remoti) | Aliasing IP standard / GARP | Basso: dipende dalla VLAN estesa RTT (Round Trip Time) | Trasparenza completa: l'IP virtuale è locale sui nodi. L'IP del client viene preservato.  
Sottoreti diverse | Ripristino di emergenza (data center remoti / Cloud) | Bilanciatore di carico esterno | Moderato: latenza di failover più elevata a causa degli intervalli di controllo dello stato del bilanciatore di carico | ⚠️ Trasparenza parziale: utilizza SNAT/DNAT. L'IP virtuale è **NON** locale sui nodi. L'IP client è **NON** conservato. L'applicazione deve supportarlo.  
Reindirizzamento DNS: nessun VIP | Ripristino di emergenza (data center remoti) | Aggiornamento record DNS (nome / IP fisico) | Elevato/Imprevedibile: dipende dal TTL (Time To Live) DNS e dalla cache DNS del client. | ⚠️ Inaffidabile: il client deve risolvere nuovamente il DNS. Molto spesso, i client continuano a utilizzare l'IP obsoleto risolto all'avvio e non vengono reindirizzati dopo un failover.  
  
## Configurazione di un indirizzo IP virtuale per il bilanciamento del carico di rete e l'alta disponibilità {#virtual-ip-configuration-load-balancing-ha}


{{%  insert-safekit-farm-video-it  %}}
 

## Domande frequenti sull'indirizzo IP virtuale (VIP) {#virtual-ip-faq}

### IP virtuale (VIP) e rete {#virtual-ip-vip--networking}

Che cos'è un IP virtuale (VIP) e in cosa si differenzia da un IP fisico?

Mentre un **indirizzo IP fisico** è associato a una specifica interfaccia di rete, un **indirizzo IP virtuale (VIP)** è un indirizzo "fluttuante" indipendente dall'hardware. In un cluster SafeKit , il VIP funge da punto di accesso persistente; se il server primario si guasta, il VIP migra automaticamente a un nodo secondario funzionante, garantendo l'assenza di riconfigurazione del client.

Ho bisogno di un bilanciatore di carico hardware per utilizzare un IP virtuale?

No. **Il software di alta disponibilità SafeKit** gestisce l'IP virtuale a livello software. Nelle architetture con sottorete identica, utilizza **l'aliasing IP** e **il Gratuitous ARP (GARP)** per reindirizzare il traffico. Ciò elimina i costi e la complessità dei bilanciatori di carico hardware esterni o dei server proxy dedicati.

Che cos'è il Gratuitous ARP (GARP) e perché viene utilizzato?

**Il Gratuitous ARP (GARP)** è un broadcast di rete che aggiorna le tabelle ARP degli switch e dei router di rete. Durante un failover, il nuovo server primario invia un pacchetto GARP per annunciare che l' **indirizzo IP virtuale** è ora mappato al suo indirizzo MAC, forzando l'immediato reindirizzamento del traffico attraverso la rete.

È possibile associare un nome DNS a un indirizzo IP virtuale?

**Sì.** È possibile associare un nome DNS a un VIP creando un record A standard. Il vantaggio principale è che il reindirizzamento viene gestito a livello VIP **(tramite ARP o reindirizzamento di rete) e** non a livello DNS **. Ciò garantisce la trasparenza dell'applicazione** evitando i ritardi associati alla propagazione DNS e **scadenza** TTL.

### Architetture cloud e avanzate {#cloud--advanced-architectures}

Come funziona un IP virtuale nel cloud ( AWS , Azure , GCP )?

Negli ambienti cloud in cui il Layer 2 (ARP) è limitato, SafeKit si integra con **i bilanciatori di carico cloud** ( AWS ELB, Azure LB o Google GCLB). SafeKit fornisce un **URL di controllo dello stato** che la piattaforma monitora per instradare il traffico al nodo attivo utilizzando SNAT/DNAT.

Per il ripristino di emergenza, è preferibile una LAN estesa o un bilanciatore di carico?

**Sì** . Per i data center remoti, una **LAN estesa (VLAN estesa)** è spesso la soluzione migliore perché mantiene **la trasparenza delle applicazioni** tra le diverse sedi. Mantenendo lo **stesso IP virtuale** , l'applicazione e i suoi client continuano a comunicare utilizzando la stessa identità, rendendo la transizione tra i data center completamente trasparente.

Quali sono i limiti del reindirizzamento DNS rispetto all'IP virtuale?

**Il reindirizzamento DNS** è limitato dal **TTL (Time to Live)** e dalla cache lato client, che possono ritardare il ripristino per ore. Uno svantaggio principale è che **i client che non riescono a risolvere nuovamente il proprio nome DNS rimangono bloccati** nel tentativo di connettersi al server non funzionante. Al contrario, un **IP virtuale** fornisce un failover istantaneo di livello 2 che reindirizza immediatamente tutto il traffico, garantendo la connettività indipendentemente dallo stato della cache DNS lato client.

### Trasparenza e sicurezza {#transparency--security}

Perché un IP virtuale locale è importante per la trasparenza delle applicazioni?

Un **indirizzo IP virtuale (VIP)** locale garantisce **la trasparenza dell'applicazione** consentendo al software di associarsi a un VIP persistente. SafeKit gestisce il reindirizzamento a **livello di kernel** , mantenendo l'applicazione all'oscuro dei failover del cluster, a differenza delle soluzioni DNAT in cui l'IP associato cambia.

L'utilizzo di un IP virtuale preserva l'indirizzo IP originale del client?

Sì. SafeKit evita la traduzione dell'indirizzo di rete sorgente (SNAT). Poiché il VIP è locale al server attivo, l'applicazione riceve l' **indirizzo IP client originale** , il che è fondamentale per il controllo della sicurezza, la persistenza della sessione e la registrazione a fini normativi.


{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}