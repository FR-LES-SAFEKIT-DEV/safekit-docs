---
title: "Come funziona un indirizzo IP virtuale (VIP) in un cluster ad alta disponibilità?"
canonical: "https://safekit.eviden.com/it/best-practises/how-a-virtual-ip-address-works/"
description: "Scopri come SafeKit sposta un IP virtuale (VIP) durante il failover: tramite Gratuitous ARP nella stessa subnet oppure con un bilanciatore di carico, una CLI cloud o BGP tra subnet. Ecco perché è importante che la VIP sia locale."
category: "best-practises"
lang: "it"
topics: "Che cos'è un indirizzo IP virtuale in un cluster ad alta disponibilità?, Implementazione di un indirizzo IP virtuale in SafeKit, Sommario, Come funziona un indirizzo IP virtuale (VIP) nel failover nella stessa subnet (cluster Mirror), Come funziona un indirizzo IP virtuale (VIP) tra subnet diverse con un bilanciatore di carico (cluster Mirror), Come funziona un indirizzo IP virtuale (VIP) tra subnet diverse con le CLI dei provider cloud (cluster Mirror), Come funziona un indirizzo IP virtuale (VIP) tra subnet diverse con BGP (cluster Mirror), Come funziona un indirizzo IP virtuale con bilanciamento del carico in una Farm sulla stessa subnet (cluster Farm), Come funziona un indirizzo IP virtuale con bilanciamento del carico tra subnet diverse (cluster Farm), IP virtuale e reindirizzamento DNS: perché il failover DNS spesso non funziona, Confronto tra implementazione, latenza e trasparenza applicativa degli IP virtuali, Configurazione di un indirizzo IP virtuale per il bilanciamento del carico di rete e l'alta disponibilità, Domande frequenti sull'indirizzo IP virtuale (VIP), 🔍 Hub di navigazione SafeKit per l'alta disponibilità"
---

# Come funziona un indirizzo IP virtuale (VIP) in un cluster ad alta disponibilità? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## Che cos'è un indirizzo IP virtuale in un cluster ad alta disponibilità? {#virtual-ip-definition}

Un **indirizzo IP virtuale (VIP)** è l'unico indirizzo utilizzato dai client per connettersi a un'applicazione in un [cluster ad alta disponibilità](</it/>). La VIP non è associata a un server specifico. In caso di failover, passa al server che esegue l'applicazione. I client non devono modificare la propria configurazione.

**Principio chiave di SafeKit:** la VIP è **configurata localmente sul server** che esegue l'applicazione. L'applicazione si avvia sulla VIP e riceve l'indirizzo IP originale del client. Per questo motivo, molte applicazioni funzionano con SafeKit senza modifiche.


## Implementazione dell'indirizzo IP virtuale in SafeKit {#safekit-vip-implementation}

Questo articolo spiega come SafeKit sposta la VIP nelle diverse architetture di rete:

  * **Stessa sottorete o LAN estesa (cluster Mirror e <span class="notranslate farm-term" translate="no">Farm</span>):** SafeKit configura la VIP sul server e invia un **ARP gratuito (GARP)**. Non serve hardware esterno. È la soluzione più trasparente.
  * **Sottoreti diverse con un bilanciatore di carico:** il bilanciatore usa il **controllo dello stato** di SafeKit per inviare il traffico al server corretto. Mantieni la VIP configurata anche localmente sul server primario.
  * **Sottoreti diverse con CLI del provider cloud:** lo script SafeKit `start_prim` richiama la CLI cloud per spostare la VIP (script scritto dall'integratore).
  * **Sottoreti diverse con BGP:** il server primario annuncia la VIP ai router (script scritto dall'integratore).

L'articolo spiega anche perché il **reindirizzamento DNS** non è un'alternativa affidabile alla VIP.

![Confronto del comportamento dell'indirizzo IP virtuale (VIP) in Evidian SafeKit: cluster Mirror con IP mobile sul nodo attivo e cluster Farm con bilanciamento del carico di rete su tutti i nodi.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Implementazione dell'indirizzo IP virtuale nei cluster Mirror e <span class="notranslate farm-term" translate="no">Farm</span> di SafeKit.**


{{%  insert-safekit-4-buttons-it  %}}
 

## Indice {#table-of-contents}

  * [Come funziona un indirizzo IP virtuale (VIP) nel failover nella stessa sottorete (cluster Mirror)](#virtual-ip-same-subnet-failover)
  * [Come funziona un indirizzo IP virtuale (VIP) tra sottoreti diverse con un bilanciatore di carico (cluster Mirror)](#virtual-ip-different-subnets-failover)
  * [Come funziona un indirizzo IP virtuale (VIP) tra sottoreti diverse con le CLI dei provider cloud (cluster Mirror)](#virtual-ip-cloud-cli-failover)
  * [Come funziona un indirizzo IP virtuale (VIP) tra sottoreti diverse con BGP (cluster Mirror)](#virtual-ip-bgp-failover)
  * [Come funziona un indirizzo IP virtuale con bilanciamento del carico in una Farm nella stessa sottorete (cluster Farm)](#vip-load-balancing-same-subnet)
  * [Come funziona un indirizzo IP virtuale con bilanciamento del carico tra sottoreti diverse (cluster Farm)](#vip-load-balancing-different-subnets)
  * [IP virtuale e reindirizzamento DNS: perché il failover DNS spesso non funziona](#virtual-ip-vs-dns-redirection-failover)
  * [Confronto tra implementazione dell'IP virtuale, latenza e trasparenza delle applicazioni](#vip-vs-dns-comparison)
  * [Configurazione di un indirizzo IP virtuale per il bilanciamento del carico di rete e l'alta disponibilità](#virtual-ip-configuration-load-balancing-ha)
  * [Domande frequenti sull'indirizzo IP virtuale (VIP)](#virtual-ip-faq)
  * [🔍 Hub di navigazione SafeKit per l'alta disponibilità](#hub)


## Come funziona un indirizzo IP virtuale (VIP) nel failover nella stessa sottorete (cluster Mirror) {#virtual-ip-same-subnet-failover}

- [Test dell'indirizzo IP virtuale primario/di backup in un cluster mirror SafeKit](/it/best-practises/test-primary-backup-vip-mirror/)

### Failover automatico e reinstradamento di rete in una sottorete locale {#automated-failover--network-rerouting-in-a-local-subnet}

In una rete locale, **SafeKit per i cluster di rete locale** gestisce automaticamente l'indirizzo IP virtuale e il failover dell'applicazione.

### Cluster Mirror locale: failover a due nodi su Windows o Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}

![Meccanismo di failover dell'indirizzo IP virtuale (VIP) di SafeKit tra due server nella stessa sottorete](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

In un **cluster Mirror SafeKit**, i due nodi si trovano nella stessa sottorete. L'alta disponibilità utilizza un **indirizzo IP virtuale (VIP)**. SafeKit gestisce la VIP nello stack di rete del sistema operativo, senza hardware speciale. La VIP viene aggiunta agli indirizzi IP fisici dei server 1 e 2 tramite **alias IP**. I client si connettono sempre alla VIP.

#### Alias IP e più VIP in SafeKit {#safekits-advanced-ip-aliasing--multiple-vip-support}

La VIP è un terzo indirizzo IP che si sposta tra i nodi. SafeKit può gestire **più indirizzi IP virtuali** in un cluster. È possibile configurarli sulla stessa scheda di rete o su schede diverse, in modo che ogni servizio possa usare la propria VIP.

#### Meccanismo di failover: ARP gratuito (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

Il failover non richiede interventi manuali. Durante il normale funzionamento, la VIP è associata all'**indirizzo MAC del server 1 (mac1)**. Se il server 1 si guasta, SafeKit esegue tre operazioni:

  * **Ripristino dell'applicazione:** SafeKit riavvia i servizi dell'applicazione sul server 2.
  * **Alias della VIP:** SafeKit configura la VIP come alias sulla scheda di rete del server 2, il nuovo server primario. Il sistema operativo invia quindi messaggi sulla rete per annunciare la VIP.
  * **GARP:** SafeKit invia anche un messaggio **ARP gratuito (GARP)**. Gli switch di rete e i client aggiornano la cache ARP. La VIP è ora associata all'**indirizzo MAC del server 2 (mac2)**.

#### Data center remoti e VLAN estese {#remote-data-centers--extended-vlans}

La **soluzione nella stessa sottorete** è adatta anche al **disaster recovery (DR)** tra siti remoti, se collegati tramite una **LAN estesa o una VLAN estesa**. Entrambi i siti si trovano così in un'unica sottorete. La rete è più semplice e non servono protocolli di routing complessi.

> **⚠️ Nota:** il reinstradamento di livello 2 tramite ARP gratuito è la soluzione più trasparente per le applicazioni. Un bilanciatore di carico reinstrada il traffico a livello 3 e traduce gli indirizzi IP (**SNAT/DNAT**), mentre l'ARP gratuito non li traduce. L'applicazione riceve l'indirizzo IP originale del client e la VIP è configurata localmente. **Molte applicazioni hanno bisogno** di entrambi per funzionare correttamente.

## Come funziona un indirizzo IP virtuale (VIP) tra sottoreti diverse con un bilanciatore di carico (cluster Mirror) {#virtual-ip-different-subnets-failover}

### Bilanciatore di carico con controlli di integrità SafeKit {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![Diagramma del failover di un indirizzo IP virtuale con un bilanciatore di carico tra due sottoreti diverse](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

Quando i nodi si trovano in **sottoreti diverse**, l'ARP gratuito non può spostare la VIP. In questo caso, la VIP è sul **bilanciatore di carico**, che invia il traffico al server primario.

SafeKit fornisce un **URL di controllo dello stato** su ogni nodo:

  * **Primario (PRIM):** restituisce `HTTP 200 OK`. Il bilanciatore invia il traffico a questo nodo.
  * **Secondario (SECOND):** restituisce `HTTP 404 NOT FOUND`. Il bilanciatore non invia traffico a questo nodo.

Durante il failover SafeKit cambia le risposte e il bilanciatore invia il traffico al nuovo server primario. È la soluzione standard su [**AWS**](</it/solutions/aws-high-availability-cluster-synchronous-replication-failover/>), [**Azure**](</it/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) e [**Google Cloud**](</it/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>).

> **⚠️ Nota:** SafeKit fornisce il controllo dello stato. Il bilanciatore di carico è fornito dalla rete o dal provider cloud.

### Il problema: il bilanciatore di carico possiede la VIP {#the-load-balancer-pitfall-vip-on-the-frontend-nat-to-the-physical-ip}

Con il solo bilanciatore di carico, i client si connettono alla VIP. Il bilanciatore traduce la VIP (NAT) nell'**indirizzo IP fisico** del server primario. Il client usa la VIP, ma il server usa il proprio IP fisico e non vede la VIP.

### Mantenere la VIP configurata localmente sul server primario {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

Applicazioni come **Milestone XProtect** o **Nedap AEOS** usano la VIP come indirizzo del server. Funzionano correttamente solo se la VIP è anche **configurata localmente sul server primario**. In questo modo:

  * i servizi possono avviarsi sulla VIP;
  * il server può accedere ai propri servizi tramite la VIP;
  * l'autenticazione funziona con la VIP.

**Procedura consigliata:** mantieni la sezione `<vip>` nel modulo SafeKit anche quando utilizzi un bilanciatore di carico. Usa una modalità che conservi la VIP come indirizzo di destinazione, ad esempio Floating IP o Direct Server Return.

### Alternative al bilanciatore di carico {#network-considerations-load-balancer-vs-extended-lan}

  * Una **LAN estesa (VLAN estesa)** tra le sottoreti consente di usare la soluzione più semplice della stessa sottorete.
  * [CLI dei provider cloud negli script di failover](#virtual-ip-cloud-cli-failover).
  * [Annuncio delle route BGP](#virtual-ip-bgp-failover).

## Come funziona un indirizzo IP virtuale (VIP) tra sottoreti diverse con le CLI dei provider cloud (cluster Mirror) {#virtual-ip-cloud-cli-failover}

### Perché l'ARP gratuito non funziona nel cloud {#why-gratuitous-arp-does-not-work-in-public-clouds}

Le reti cloud (AWS, Azure, Google Cloud) **ignorano l'ARP gratuito**. Inoltrano il traffico solo agli indirizzi IP assegnati nella piattaforma cloud. SafeKit configura la VIP sul server primario, ma la rete cloud non instrada il traffico della VIP verso quel server.

### Spostare la VIP con la CLI cloud {#moving-the-vip-through-the-cloud-api-in-safekit-failover-scripts}

Senza un bilanciatore di carico, lo script SafeKit **`start_prim`** può usare la CLI del provider cloud per spostare la VIP sul nuovo server primario. Lo script può assegnare l'IP privato al nuovo primario o modificare una route cloud verso la VIP.

La **VIP resta locale** sul server primario. Non c'è **NAT** e l'indirizzo IP originale del client non cambia.

### Responsabilità dell'integratore {#integrator-responsibility}

L'**integratore** deve aggiungere i comandi della CLI cloud allo script `start_prim`. Questi comandi **non sono forniti dal prodotto SafeKit**. Dipendono dal provider cloud, dal progetto di rete e dalle regole di sicurezza del cliente.

### Vincoli {#constraints-of-the-cli-approach}

  * La CLI cloud deve essere installata su entrambi i nodi. Ogni nodo deve disporre di un'identità cloud con autorizzazioni di rete.
  * Lo script deve gestire errori e nuovi tentativi.
  * Il failover potrebbe essere più lento rispetto a quello con un bilanciatore di carico.
  * **Questa configurazione non è validata.** Provala prima di usarla in produzione.

## Come funziona un indirizzo IP virtuale (VIP) tra sottoreti diverse con BGP (cluster Mirror) {#virtual-ip-bgp-failover}

### Reinstradamento della VIP con BGP {#layer-3-vip-rerouting-with-bgp-route-advertisement}

Con **BGP (Border Gateway Protocol)**, la VIP è configurata localmente sul server primario, che **la annuncia ai router** come route /32.

  * **Funzionamento normale:** solo il server primario annuncia la VIP.
  * **Failover:** lo script `start_prim` avvia l'annuncio sul nuovo server primario. `stop_prim` lo interrompe sul server precedente. Se il primario si arresta, la sua route viene rimossa automaticamente.

### Vantaggi e prerequisiti {#benefits-and-prerequisites}

  * **La VIP resta locale, non c'è NAT e l'indirizzo IP del client non cambia.** Applicazioni come Milestone XProtect e Nedap AEOS funzionano come in un cluster nella stessa sottorete.
  * Funziona tra sottoreti e siti senza una VLAN estesa.
  * Servono router BGP e il supporto del team di rete. Nel cloud è necessario un servizio route server del provider cloud.

> **⚠️ Nota:** l'integrazione BGP utilizza gli script SafeKit e l'infrastruttura di routing. L'**integratore** deve scrivere i comandi BGP per annunciare e ritirare la route negli script `start_prim` e `stop_prim`. Questi script **non sono forniti dal prodotto SafeKit**. Convalida la soluzione con il team di rete prima della produzione.

### Confronto tra i metodi per sottoreti diverse {#comparison-cross-subnet-vip-methods}

| Metodo | VIP locale sul primario | NAT | Prerequisito principale |
|---|---|---|---|
| **Solo bilanciatore di carico** | No | Sì | Bilanciatore di carico |
| **Bilanciatore di carico + VIP SafeKit** | Sì | No (Floating IP / DSR) | Bilanciatore di carico |
| **CLI cloud** | Sì | No | CLI cloud e autorizzazioni |
| **BGP** | Sì | No | Router BGP |
| **LAN estesa + GARP** | Sì | No | VLAN estesa |

## Come funziona un indirizzo IP virtuale con bilanciamento del carico in una Farm nella stessa sottorete (cluster Farm) {#vip-load-balancing-same-subnet}

- [Testare il bilanciamento del carico tramite IP virtuale in un cluster Farm SafeKit](/it/best-practises/test-load-balancing-vip-farm/)

### Prestazioni scalabili: bilanciamento del carico nel kernel e ridondanza {#scalable-performance-kernel-level-load-balancing--redundancy}

Quando il traffico è elevato, SafeKit può distribuire il lavoro tra più server attivi. Se un server si guasta, gli altri continuano a funzionare.

### Architettura del cluster Farm: bilanciamento del carico tra nodi Windows o Linux {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}

![Diagramma di un IP virtuale (VIP) con bilanciamento del carico in un cluster Farm nella stessa sottorete](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

In un **cluster Farm con bilanciamento del carico**, i client si collegano a un IP virtuale (VIP) e le richieste vengono distribuite contemporaneamente tra più server. L'esempio mostra due nodi, ma è possibile aggiungerne altri. Nella stessa sottorete, la VIP è configurata tramite alias IP sulla scheda di rete di **ogni server** del cluster.

#### Distribuzione del traffico: il filtro del kernel {#traffic-distribution-the-kernel-level-filter}

In un cluster <span class="notranslate farm-term" translate="no">Farm</span>, un **filtro nel kernel** di SafeKit distribuisce il traffico:

  * **Mappatura ARP:** nella cache ARP dei client, la VIP è associata a un indirizzo MAC, ad esempio `mac1` del server 1.
  * **Analisi dei pacchetti:** il server 1 riceve i pacchetti. Il filtro del kernel SafeKit esamina l'**indirizzo IP del client** o la **porta TCP** di ciascun pacchetto.
  * **Distribuzione del carico:** il filtro decide quali pacchetti elabora il server 1 e quali inviare agli altri nodi, ad esempio al server 2.

#### Failover e reinstradamento con ARP gratuito {#failover-and-rerouting-with-gratuitous-arp}

Se il server 1 si guasta, SafeKit invia un messaggio **ARP gratuito (GARP)**. I client aggiornano la cache ARP con `mac2`, l'indirizzo MAC del server 2, e il traffico viene indirizzato agli altri nodi Farm.

#### Distribuzione in siti remoti {#deployment-in-remote-sites}

La soluzione di bilanciamento del carico funziona anche tra **data center remoti**, se collegati tramite una **LAN o VLAN estesa**. Tutti i siti si trovano così nella stessa sottorete, una configurazione efficiente per i cluster Farm distribuiti su più sedi.

## Come funziona un indirizzo IP virtuale con bilanciamento del carico tra sottoreti diverse (cluster Farm) {#vip-load-balancing-different-subnets}

### Scalabilità multizona: traffico tra sottoreti cloud {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

Un cluster <span class="notranslate farm-term" translate="no">Farm</span> può distribuire il carico dell'applicazione tra più zone di disponibilità e sottoreti.

### Cluster Farm tra sottoreti: più nodi Windows o Linux {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}

![Diagramma di un cluster Farm con bilanciamento del carico su due sottoreti diverse](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

Quando i nodi Farm si trovano in **sottoreti diverse**, ad esempio in più zone di disponibilità cloud, l'**IP virtuale (VIP)** si trova su un **bilanciatore di carico (LB) esterno**. Il bilanciatore invia il traffico agli indirizzi IP fisici dei server in ciascuna sottorete.

#### Regole di instradamento del traffico e bilanciamento del carico {#intelligent-traffic-routing--load-balancing-rules}

Il bilanciatore di carico distribuisce le richieste dei client secondo due criteri:

  * **Regole di bilanciamento:** ad esempio, l'indirizzo IP del client o la sua porta TCP.
  * **Disponibilità dei nodi:** il bilanciatore invia traffico solo ai nodi integri, secondo il controllo dello stato SafeKit.

> **⚠️ Nota:** SafeKit fornisce il controllo dello stato. Il bilanciatore di carico è fornito dalla rete o dal provider cloud.

#### Controllo dello stato SafeKit {#safekit-health-check-mechanism}

SafeKit fornisce un **URL di controllo dello stato** su ogni server Farm. Il bilanciatore lo usa per verificare lo stato di ciascun server:

  * **Nodo disponibile:** il controllo restituisce `HTTP 200 OK`. Il bilanciatore invia traffico a questo server.
  * **Nodo non disponibile:** se un server o un'applicazione si guasta, SafeKit restituisce `HTTP 404 NOT FOUND` (oppure il server non risponde). Il bilanciatore smette di inviare traffico a quel nodo.

#### Distribuzione cloud: AWS, Azure e GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Questa è l'architettura standard per i cluster **Farm nel cloud**. Se una sottorete o una zona si arresta, gli altri nodi continuano a elaborare il traffico. È supportata da:

  * 💡 [**Amazon AWS**](</it/solutions/aws-load-balancing-cluster-failover/>) (AWS Network Load Balancer)
  * 💡 [**Microsoft Azure**](</it/solutions/azure-load-balancing-cluster-failover/>) (Azure Load Balancer)
  * 💡 [**Google Cloud (GCP)**](</it/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing)


## IP virtuale e reindirizzamento DNS: perché il failover DNS spesso fallisce {#virtual-ip-vs-dns-redirection-failover}

### Il problema dei ritardi DNS: perché una VIP è preferibile al reindirizzamento DNS {#the-dns-propagation-trap-why-vips-outperform-dns-redirection}

Il failover tramite DNS può sembrare affidabile, ma non lo è. Si modifica un record DNS affinché punti a un server di backup, ma non è possibile controllare **quando** i client vedono la modifica. Il cambiamento passa attraverso molti server DNS che non si controllano. Il reindirizzamento DNS, quindi, non può garantire un servizio senza interruzioni.

### Esempio: risoluzione DNS e client bloccati {#the-technical-scenario-dns-resolution-and-the-stuck-client}

Gli utenti si connettono a un **nome virtuale** (il nome DNS). Il sistema DNS traduce il nome in un **indirizzo IP fisico**.

![Diagramma della risoluzione di un nome DNS nell'indirizzo IP fisico 1 in un cluster ad alta disponibilità](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

Risoluzione DNS: client bloccati sull'indirizzo IP fisico 1 in un cluster ad alta disponibilità.

#### Prima del failover: il nome punta all'indirizzo IP fisico 1 {#current-state-resolution-to-physical-ip-1}

Il **Client 1** e il **Client 2** chiedono al DNS l'indirizzo IP del nome virtuale. Il DNS restituisce l'**indirizzo IP fisico 1**. I client aprono quindi una connessione di rete (socket) verso quell'indirizzo.

#### Dopo il failover: il nome deve puntare all'indirizzo IP fisico 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

Se il server con l'indirizzo IP fisico 1 si guasta, un amministratore modifica il record DNS per puntare all'**indirizzo IP fisico 2**. I client si connettono al nuovo indirizzo solo se sono vere tutte queste condizioni:

  * Il **TTL (Time to Live)** è scaduto su tutti i server DNS tra il client e il record.
  * La cache DNS locale dei Client 1 e 2 è vuota.
  * L'applicazione chiude la connessione ed esegue una **nuova** ricerca DNS.

Se anche una sola condizione non è soddisfatta, i client restano bloccati sull'indirizzo IP fisico 1 non funzionante. Il servizio rimane interrotto anche se il record DNS è corretto.

### Due problemi del reindirizzamento DNS che non è possibile controllare {#the-two-black-boxes-of-dns-redirection}

  * **Cache DNS:** molti provider Internet e server DNS aziendali ignorano i TTL brevi e possono conservare il vecchio indirizzo IP per minuti o ore.
  * **Comportamento delle applicazioni:** molte applicazioni, ad esempio servizi Java e browser Web, eseguono la ricerca DNS solo all'avvio. Continuano a usare il primo indirizzo IP anche dopo la modifica del record DNS.

### Conclusione {#conclusion}

Il reindirizzamento DNS non è una soluzione affidabile per l'alta disponibilità. Per un failover immediato in una rete locale o regionale, usa un **indirizzo IP virtuale (VIP)**.

## Confronto tra implementazione dell'IP virtuale, latenza e trasparenza applicativa {#vip-vs-dns-comparison}

**Confronto dei metodi di reindirizzamento tramite IP virtuale (VIP) e DNS per alta disponibilità e disaster recovery.**

Ambiente e caso d'uso | Tipo di alta disponibilità | Metodo di reindirizzamento | Latenza di rete | Trasparenza applicativa e IP locale  
---|---|---|---|---  
Primario/backup (alta disponibilità) | Cluster Mirror | ARP gratuito / takeover MAC | Molto bassa: tempo per rilevare il guasto e inviare il GARP | Totale: la VIP è locale sul nodo attivo. L'indirizzo IP del client non cambia.  
Bilanciamento del carico (attivo/attivo) | Cluster <span class="notranslate farm-term" translate="no">Farm</span> | Filtro di rete del kernel / GARP | Molto bassa: tempo per rilevare il guasto e modificare i filtri di rete | Totale: la VIP è locale su tutti i nodi. L'indirizzo IP del client non cambia.  
Stessa sottorete / LAN estesa (VLAN estesa) | Disaster recovery (data center remoti) | Alias IP / GARP | Bassa: dipende dal tempo di andata e ritorno (RTT) della VLAN estesa | Totale: la VIP è locale sui nodi. L'indirizzo IP del client non cambia.  
Sottoreti diverse: solo bilanciatore di carico | Disaster recovery (data center remoti / cloud) | Bilanciatore di carico esterno | Media: dipende dall'intervallo del controllo dello stato del bilanciatore | ⚠️ Parziale: usa SNAT/DNAT. La VIP **NON** è locale sui nodi e l'indirizzo IP del client potrebbe **NON** essere conservato. L'applicazione deve supportarlo.  
Sottoreti diverse: bilanciatore + VIP locale SafeKit | Disaster recovery (data center remoti / cloud) | Bilanciatore esterno con Floating IP / Direct Server Return | Media: dipende dall'intervallo del controllo dello stato del bilanciatore | Buona: la VIP è locale sul primario e resta l'indirizzo di destinazione. L'indirizzo IP del client non cambia. Da verificare con l'applicazione.  
Sottoreti diverse: CLI cloud | Disaster recovery (cloud) | Comandi CLI cloud nello script `start_prim` (scritto dall'integratore) | Da media ad alta: dipende dal tempo di risposta dell'API cloud | Totale: la VIP è locale sul primario. L'indirizzo IP del client non cambia. Configurazione non validata.  
Sottoreti diverse: BGP | Disaster recovery (data center remoti / cloud) | Route /32 annunciata con BGP (script scritti dall'integratore) | Da bassa a media: dipende dal tempo di convergenza BGP | Totale: la VIP è locale sul primario. L'indirizzo IP del client non cambia. Richiede router BGP.  
Reindirizzamento DNS: nessuna VIP | Disaster recovery (data center remoti) | Modifica del record DNS (nome / IP fisico) | Alta e imprevedibile: dipende dal TTL DNS e dalla cache DNS del client | ⚠️ Non affidabile: il client deve eseguire una nuova ricerca DNS. Spesso i client continuano a usare il vecchio IP ricevuto all'avvio e non vengono reinstradati dopo il failover.  
  
## Configurazione di un indirizzo IP virtuale per il bilanciamento del carico di rete e l'alta disponibilità {#virtual-ip-configuration-load-balancing-ha}


{{%  insert-safekit-farm-video-it  %}}
 

## Domande frequenti sull'indirizzo IP virtuale (VIP) {#virtual-ip-faq}

### Indirizzo IP virtuale (VIP) e rete {#virtual-ip-vip--networking}

Che cos'è un indirizzo IP virtuale (VIP) e in cosa differisce da un indirizzo IP fisico?

Un **indirizzo IP fisico** è associato a una scheda di rete. Un **indirizzo IP virtuale (VIP)** non è legato all'hardware. In un cluster SafeKit, i client usano sempre la VIP. Se il server primario si guasta, la VIP passa automaticamente a un nodo disponibile. I client non devono modificare la propria configurazione.

Serve un bilanciatore di carico hardware per usare un indirizzo IP virtuale?

No. **SafeKit** gestisce la VIP tramite software. Nella stessa sottorete usa **l'alias IP** e l'**ARP gratuito (GARP)** per reinstradare il traffico. Non serve un bilanciatore di carico esterno né un server proxy.

Che cos'è l'ARP gratuito (GARP) e perché viene usato?

L'**ARP gratuito (GARP)** è un messaggio di rete inviato ai dispositivi per aggiornare le tabelle ARP di switch e router. Durante un failover, il nuovo server primario invia un messaggio GARP per annunciare che la **VIP** è ora associata al suo indirizzo MAC. Il traffico viene quindi reinstradato.

È possibile associare un nome DNS a un indirizzo IP virtuale?

**Sì.** Crea un record A standard per la VIP. Il reinstradamento avviene a **livello VIP** (tramite ARP o reinstradamento di rete), **non a livello DNS**. Non ci sono ritardi DNS o problemi di TTL e il failover resta trasparente per l'applicazione.

### Cloud e architetture avanzate {#cloud--advanced-architectures}

Come funziona un indirizzo IP virtuale nel cloud (AWS, Azure, GCP)?

Nel cloud, il livello 2 (ARP) è limitato. SafeKit funziona con **bilanciatori di carico cloud** (AWS ELB, Azure LB o Google GCLB). SafeKit fornisce un **URL di controllo dello stato** che il bilanciatore consulta per inviare il traffico al nodo attivo usando SNAT/DNAT.

Per il disaster recovery, una LAN estesa è preferibile a un bilanciatore di carico?

**Sì.** Tra data center remoti, una **LAN estesa (VLAN estesa)** è spesso preferibile perché il failover resta **trasparente per l'applicazione**. L'**indirizzo IP virtuale non cambia**, quindi l'applicazione e i client continuano a usare lo stesso indirizzo dopo il failover tra data center.

Quali sono i limiti del reindirizzamento DNS rispetto a un indirizzo IP virtuale?

Il **reindirizzamento DNS** dipende dal **TTL (Time to Live)** e dalla cache DNS del client, quindi il ripristino può richiedere ore. Inoltre, i **client che non eseguono una nuova ricerca DNS restano bloccati** sul server guasto. Una **VIP** reinstrada immediatamente il traffico a livello 2, senza dipendere dalla cache DNS del client.

### Trasparenza e sicurezza {#transparency--security}

Perché un indirizzo IP virtuale locale è importante per la trasparenza delle applicazioni?

Con un **indirizzo IP virtuale (VIP)** locale, l'applicazione usa un indirizzo che non cambia. SafeKit esegue il reinstradamento nel **kernel**, perciò l'applicazione non rileva il failover. Con DNAT, invece, cambia l'indirizzo usato dall'applicazione.

Un indirizzo IP virtuale conserva l'indirizzo IP originale del client?

Sì. SafeKit non usa la traduzione degli indirizzi di rete di origine (SNAT). Poiché la VIP è locale sul server attivo, l'applicazione riceve l'**indirizzo IP originale del client**.


{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}