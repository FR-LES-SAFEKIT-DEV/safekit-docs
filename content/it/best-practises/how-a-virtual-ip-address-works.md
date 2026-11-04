---
title: "Come funziona un indirizzo IP virtuale in un cluster ad alta disponibilità?"
canonical: "https://safekit.eviden.com/it/best-practises/how-a-virtual-ip-address-works/"
description: "Scopri come SafeKit sposta un IP virtuale in caso di failover: con GARP, bilanciatori di carico, CLI cloud o BGP."
category: "best-practises"
lang: "it"
topics: "Che cos'è un indirizzo IP virtuale in un cluster ad alta disponibilità?, Implementazione dell'indirizzo IP virtuale in SafeKit, Come funziona un indirizzo IP virtuale nella stessa subnet (cluster Mirror), Come funziona un indirizzo IP virtuale tra subnet diverse con un bilanciatore di carico (cluster Mirror), Come funziona un indirizzo IP virtuale tra subnet diverse con le CLI dei provider cloud (cluster Mirror), Come funziona un indirizzo IP virtuale tra subnet diverse con BGP (cluster Mirror), Come funziona il reindirizzamento DNS tra subnet diverse (cluster Mirror), Come funziona il bilanciamento del carico di un IP virtuale in un cluster Farm nella stessa subnet, Bilanciamento del carico di un IP virtuale tra subnet diverse (cluster Farm), Confronto tra implementazione, latenza e trasparenza delle applicazioni, Domande frequenti sull'IP virtuale, 🔍 Esplora SafeKit"
---

# Come funziona un indirizzo IP virtuale in un cluster ad alta disponibilità? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## Che cos'è un indirizzo IP virtuale in un cluster ad alta disponibilità? {#virtual-ip-definition}

Un **indirizzo IP virtuale** è l'indirizzo univoco che i client utilizzano per connettersi a un'applicazione in un [cluster ad alta disponibilità](</it/>). Non è associato a un server specifico. In caso di failover, viene spostato sul server che esegue l'applicazione. I client non devono modificare la propria configurazione.

**Principio fondamentale di SafeKit:** l'indirizzo IP virtuale viene **configurato localmente sul server** che esegue l'applicazione. L'applicazione viene avviata su questo indirizzo e riceve l'indirizzo IP originale del client. Per questo motivo, molte applicazioni funzionano correttamente con SafeKit senza modifiche. SafeKit supporta due tipi di indirizzo IP virtuale:

  * **Indirizzo IP virtuale primario/secondario in un cluster Mirror:** l'indirizzo IP virtuale è attivo solo sul server primario. In caso di failover, viene spostato sul server secondario.
  * **Indirizzo IP virtuale con bilanciamento del carico di rete in un cluster <span class="notranslate farm-term" translate="no">farm</span>:** l'indirizzo IP virtuale è attivo contemporaneamente su tutti i server. Il traffico viene distribuito tra di essi.

## Implementazione dell'indirizzo IP virtuale in SafeKit {#safekit-virtual-ip-implementation}

Questo articolo spiega come SafeKit sposta l'indirizzo IP virtuale in base all'architettura di rete:

  * **Stessa subnet o LAN estesa (cluster [Mirror](#virtual-ip-same-subnet-failover) e [<span class="notranslate farm-term" translate="no">Farm</span>](#virtual-ip-load-balancing-same-subnet)):** SafeKit configura l'indirizzo IP virtuale sul server e invia un messaggio **ARP gratuito (GARP)**. Non serve hardware esterno. È la soluzione più trasparente: SafeKit implementa l'intero meccanismo.
  * **Subnet diverse con un bilanciatore di carico (cluster [Mirror](#virtual-ip-different-subnets-failover) e [<span class="notranslate farm-term" translate="no">Farm</span>](#virtual-ip-load-balancing-different-subnets)):** il bilanciatore utilizza il **controllo dello stato di SafeKit** per inviare il traffico al server corretto. La configurazione del bilanciatore è a carico dell'integratore.
  * **[Subnet diverse con le CLI dei provider cloud](#virtual-ip-cloud-cli-failover) (cluster Mirror):** lo script SafeKit `start_prim` chiama la CLI cloud per spostare l'indirizzo IP virtuale. Lo script è scritto dall'integratore.
  * **[Subnet diverse con BGP](#virtual-ip-bgp-failover) (cluster Mirror):** il server primario annuncia l'indirizzo IP virtuale ai router. Lo script è scritto dall'integratore.
  * **[Subnet diverse con reindirizzamento DNS](#virtual-ip-vs-dns-redirection-failover) (cluster Mirror):** lo script SafeKit `start_prim` modifica il record DNS del nome virtuale affinché punti all'indirizzo IP fisico del nuovo server primario. Lo script è scritto dall'integratore. Non esiste un singolo indirizzo IP virtuale e questo metodo non è affidabile per tutti i client.

In questo articolo:

  * [Confronto tra implementazione, latenza e trasparenza delle applicazioni](#virtual-ip-methods-comparison)
  * [Domande frequenti sull'indirizzo IP virtuale](#virtual-ip-faq)
  * [🔍 Esplora SafeKit](#hub)

![Confronto del comportamento degli indirizzi IP virtuali in Evidian SafeKit: IP flottante sul nodo attivo nei cluster Mirror e bilanciamento del carico di rete su tutti i nodi nei cluster Farm.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Implementazione degli indirizzi IP virtuali nei cluster Mirror e <span class="notranslate farm-term" translate="no">Farm</span> con SafeKit.**

## Come funziona un indirizzo IP virtuale nella stessa subnet (cluster Mirror) {#virtual-ip-same-subnet-failover}

- [Provare l'indirizzo IP virtuale primario/secondario in un cluster Mirror SafeKit](/it/best-practises/test-primary-backup-vip-mirror/)

### Failover automatico e reindirizzamento di rete in una subnet locale {#automated-failover--network-rerouting-in-a-local-subnet}

In una rete locale, **SafeKit** gestisce automaticamente l'indirizzo IP virtuale e il failover dell'applicazione.

### Cluster Mirror locale: failover a due nodi su Windows o Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}

![Meccanismo di failover dell'indirizzo IP virtuale SafeKit tra due server nella stessa subnet](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

In un **cluster Mirror SafeKit**, i due nodi si trovano nella stessa subnet. L'alta disponibilità utilizza un **indirizzo IP virtuale**. SafeKit lo gestisce nello stack di rete del sistema operativo. Non è necessario hardware speciale. L'indirizzo IP virtuale viene aggiunto agli indirizzi IP fisici dei server 1 e 2 tramite **alias IP**. I client si connettono sempre all'indirizzo IP virtuale.

#### Alias IP e supporto di più indirizzi IP virtuali (VIP) in SafeKit {#safekits-advanced-ip-aliasing--multiple-virtual-ip-support}

L'indirizzo IP virtuale è un terzo indirizzo IP che si sposta da un nodo all'altro. SafeKit può gestire **più indirizzi IP virtuali** in un cluster. È possibile configurarli sulla stessa scheda di rete o su schede diverse, in modo che ogni servizio possa avere il proprio indirizzo IP virtuale.

#### Meccanismo di failover: ARP gratuito (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

Il failover non richiede interventi manuali. Durante il funzionamento normale, l'indirizzo IP virtuale è associato all'**indirizzo MAC del server 1 (mac1)**. Se il server 1 si guasta, SafeKit esegue tre operazioni:

  * **Alias dell'indirizzo IP virtuale:** SafeKit configura l'indirizzo IP virtuale come alias sulla scheda di rete del server 2, il nuovo server primario. Il sistema operativo invia quindi messaggi sulla rete per annunciare l'indirizzo IP virtuale.
  * **GARP:** SafeKit invia anche messaggi **ARP gratuiti (GARP)**. Gli switch di rete e i client aggiornano la cache ARP. L'indirizzo IP virtuale è ora associato all'**indirizzo MAC del server 2 (mac2)**.
  * **Ripristino dell'applicazione:** SafeKit riavvia i servizi dell'applicazione sul server 2.

#### Data center remoti e VLAN estese {#remote-data-centers--extended-vlans}

La **soluzione nella stessa subnet descritta sopra** è adatta anche al **disaster recovery (DR)** tra siti remoti. Spesso è la scelta migliore quando i siti sono collegati tramite una **LAN estesa o una VLAN estesa**. Entrambi i siti si trovano così in un'unica subnet. La rete è più semplice e non servono protocolli di routing complessi.

> **⚠️ Nota:** il reindirizzamento a livello 2 tramite ARP gratuito è la **soluzione più trasparente** per le applicazioni. L'applicazione riceve l'indirizzo IP originale del client e l'indirizzo IP virtuale è configurato localmente. **Molte applicazioni hanno bisogno** di un indirizzo IP virtuale locale. Senza di esso, **potrebbero non funzionare correttamente**. In questa configurazione nella stessa subnet, SafeKit implementa l'intero meccanismo e non serve un'integrazione speciale.

## Come funziona un indirizzo IP virtuale tra subnet diverse con un bilanciatore di carico (cluster Mirror) {#virtual-ip-different-subnets-failover}

### Bilanciatore di carico con controlli dello stato SafeKit {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![Diagramma del failover di un indirizzo IP virtuale con un bilanciatore di carico tra due subnet diverse](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

Quando i nodi si trovano in **subnet diverse**, l'ARP gratuito non può spostare l'indirizzo IP virtuale. In questo caso, l'indirizzo IP virtuale si trova su un **bilanciatore di carico**, che invia il traffico al server primario.

SafeKit fornisce un'**URL di controllo dello stato** su ogni nodo:

  * **Primario (PRIM):** restituisce `HTTP 200 OK`. Il bilanciatore invia il traffico a questo nodo.
  * **Secondario (SECOND):** restituisce `HTTP 404 NOT FOUND`. Il bilanciatore non invia traffico a questo nodo.

In caso di failover, SafeKit modifica le risposte e il bilanciatore invia il traffico al nuovo server primario. Questa è la soluzione standard tra **zone di disponibilità** su [**AWS**](</it/solutions/aws-high-availability-cluster-synchronous-replication-failover/>), [**Azure**](</it/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) e [**Google Cloud**](</it/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>).

> **⚠️ Nota:** SafeKit fornisce il controllo dello stato. Il bilanciatore di carico è fornito dalla rete o dal provider cloud.

### Il problema: il bilanciatore di carico possiede l'indirizzo IP virtuale {#the-load-balancer-pitfall-virtual-ip-on-the-frontend-nat-to-the-physical-ip}

Quando si utilizza solo un bilanciatore di carico, i client si connettono all'indirizzo IP virtuale. Il bilanciatore lo traduce tramite NAT nell'**indirizzo IP fisico** del server primario. Il client utilizza l'indirizzo virtuale, mentre il server utilizza quello fisico: il server non vede l'indirizzo IP virtuale.

### Mantenere l'indirizzo IP virtuale configurato localmente sul server primario {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

Alcune applicazioni utilizzano l'indirizzo IP virtuale come indirizzo del server. Funzionano correttamente solo se l'indirizzo è anche **configurato localmente sul server primario**. In questo modo:

  * i servizi possono essere avviati sull'indirizzo IP virtuale;
  * il server può accedere ai propri servizi tramite questo indirizzo;
  * l'autenticazione funziona con questo indirizzo.

**Consigliato:** utilizzare una modalità del bilanciatore che mantenga l'indirizzo IP virtuale come indirizzo di destinazione (per esempio, Floating IP o Direct Server Return). Quindi configurare l'indirizzo IP virtuale localmente sul server primario. Il metodo dipende dalla subnet dell'indirizzo IP virtuale:

  * **L'indirizzo IP virtuale si trova nella stessa subnet degli indirizzi IP fisici dei server:** mantenere la sezione `<vip>` nel modulo SafeKit. SafeKit configura automaticamente l'indirizzo IP virtuale come alias sulla scheda di rete associata all'indirizzo IP fisico.
  * **L'indirizzo IP virtuale si trova in una subnet diversa:** non configurare `<vip>` in SafeKit. Utilizzare lo script `start_prim` per configurare l'indirizzo IP virtuale su un'interfaccia dedicata, per esempio loopback, prima dell'avvio dell'applicazione. Utilizzare `stop_prim` per rimuoverlo dopo l'arresto dell'applicazione. Questi comandi sono scritti dall'integratore e non fanno parte del prodotto SafeKit.

## Come funziona un indirizzo IP virtuale tra subnet diverse con le CLI dei provider cloud (cluster Mirror) {#virtual-ip-cloud-cli-failover}

### Perché l'ARP gratuito non funziona nel cloud {#why-gratuitous-arp-does-not-work-in-public-clouds}

Le reti cloud (AWS, Azure e Google Cloud) **ignorano l'ARP gratuito**. Inoltrano il traffico solo agli indirizzi IP assegnati sulla piattaforma cloud. SafeKit configura l'indirizzo IP virtuale sul server primario, ma la rete cloud non instrada il traffico di quell'indirizzo verso questo server.

### Spostare l'indirizzo IP virtuale tramite la CLI cloud {#moving-the-virtual-ip-through-the-cloud-api-in-safekit-failover-scripts}

Senza un bilanciatore di carico, è possibile integrare la CLI del provider cloud nello script SafeKit **`start_prim`** per aggiornare la configurazione di rete cloud prima dell'avvio dell'applicazione. La CLI può assegnare l'indirizzo IP virtuale al nodo che diventa primario oppure aggiornare la route cloud per indirizzare il traffico verso quel nodo.

L'**indirizzo IP virtuale rimane locale** sul server primario. **Non c'è NAT** e l'indirizzo IP originale del client non cambia.

### Responsabilità dell'integratore {#integrator-responsibility}

L'**integratore** deve aggiungere i comandi della CLI cloud allo script `start_prim`. Questi comandi **non sono forniti dal prodotto SafeKit**. Dipendono dal provider cloud, dal progetto di rete e dalle regole di sicurezza del cliente.

### Limitazioni {#constraints-of-the-cli-approach}

  * La CLI cloud deve essere installata su entrambi i nodi. Ogni nodo deve disporre di un'identità cloud con i diritti di rete necessari.
  * Lo script deve gestire gli errori e i tentativi ripetuti.
  * Il failover è probabilmente più lento rispetto a quello con un bilanciatore di carico.

## Come funziona un indirizzo IP virtuale tra subnet diverse con BGP (cluster Mirror) {#virtual-ip-bgp-failover}

### Reindirizzamento dell'indirizzo IP virtuale con BGP {#layer-3-virtual-ip-rerouting-with-bgp-route-advertisement}

Con **BGP (Border Gateway Protocol)**, lo script `start_prim` configura in genere l'indirizzo IP virtuale su un'interfaccia loopback del server primario prima dell'avvio dell'applicazione. Il server primario annuncia poi la VIP ai router come route /32.

In caso di failover, lo script `stop_prim` sul vecchio server primario arresta l'applicazione, rimuove la VIP dall'interfaccia loopback e ritira dai router la route /32. Se il vecchio server primario si blocca, `stop_prim` non viene eseguito, ma i router perdono la sessione BGP e rimuovono automaticamente la route.

### Vantaggi e prerequisiti {#benefits-and-prerequisites}

  * **L'indirizzo IP virtuale rimane locale, non c'è NAT e l'indirizzo IP del client non cambia.**
  * Funziona tra subnet e siti diversi. Non serve una VLAN estesa.
  * Sono necessari router BGP e il supporto del team di rete. Nel cloud serve un servizio route server del provider cloud.

> **⚠️ Nota:** l'integrazione BGP utilizza gli script SafeKit e l'infrastruttura di routing. L'**integratore** deve scrivere i comandi negli script `start_prim` e `stop_prim`. Questi script **non sono forniti dal prodotto SafeKit**. Convalidare la soluzione con il team di rete prima della messa in produzione.

## Come funziona il reindirizzamento DNS tra subnet diverse (cluster Mirror) {#virtual-ip-vs-dns-redirection-failover}

### Reindirizzamento DNS con lo script `start_prim` {#dns-rerouting-with-the-start-prim-script}

Con il reindirizzamento DNS **non esiste un singolo indirizzo IP virtuale**. I client si connettono a un **nome virtuale**, cioè al nome DNS. In caso di failover, lo script `start_prim` sul nuovo server primario avvia l'applicazione e poi modifica il record DNS del nome virtuale affinché punti all'**indirizzo IP fisico** del nuovo server primario.

Lo script `stop_prim` non deve eseguire alcuna operazione. Se il vecchio server primario si blocca, il nuovo server primario sovrascrive il record DNS.

### Esempio: risoluzione DNS e client bloccati {#the-technical-scenario-dns-resolution-and-the-stuck-client}

![Diagramma della risoluzione di un nome DNS nell'indirizzo IP fisico 1 in un cluster ad alta disponibilità](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

Risoluzione DNS: client bloccati sull'indirizzo IP fisico 1 in un cluster ad alta disponibilità.

#### Prima del failover: il nome punta all'indirizzo IP fisico 1 {#current-state-resolution-to-physical-ip-1}

Il **client 1** e il **client 2** chiedono al sistema DNS l'indirizzo IP del nome virtuale. Il sistema restituisce l'**indirizzo IP fisico 1**. I client aprono quindi una connessione di rete verso questo indirizzo.

#### Dopo il failover: il nome punta all'indirizzo IP fisico 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

Il server 1 si guasta. Lo script `start_prim` sul server 2 modifica il record DNS impostandolo sull'**indirizzo IP fisico 2**. I client potranno connettersi a questo indirizzo solo se sono soddisfatte tutte le seguenti condizioni:

  * Il **TTL (Time to Live)** è scaduto su tutti i server DNS tra il client e il record DNS.
  * La cache DNS locale del client 1 e del client 2 è vuota.
  * L'applicazione chiude la connessione ed esegue una **nuova** ricerca DNS.

Se anche una sola condizione non è soddisfatta, i **client 1 e 2 restano bloccati** sull'indirizzo IP fisico 1. Il servizio non è disponibile anche se il record DNS è corretto.

### Limiti e prerequisiti {#the-two-black-boxes-of-dns-redirection}

  * **Cache DNS:** molti provider Internet e server DNS aziendali ignorano i TTL brevi. Possono conservare il vecchio indirizzo IP fisico 1 per minuti o ore.
  * **Comportamento dell'applicazione:** molte applicazioni, per esempio servizi Java o browser Web, eseguono una ricerca DNS una sola volta all'avvio e continuano a utilizzare il primo indirizzo IP.
  * **L'indirizzo IP cambia a ogni failover:** l'applicazione non dispone di un indirizzo IP virtuale locale e stabile. Le applicazioni che registrano il proprio indirizzo IP potrebbero non funzionare.
  * **Prerequisiti:** un TTL breve per il record DNS (per esempio, da 30 a 60 secondi) e i diritti per aggiornare la zona DNS da entrambi i server.

> **⚠️ Nota:** l'**integratore** deve scrivere i comandi di aggiornamento DNS nello script `start_prim`. Questi comandi **non sono forniti dal prodotto SafeKit** e dipendono dal server DNS (Windows DNS, BIND o DNS cloud).

### Conclusione {#conclusion}

Il reindirizzamento DNS non è una soluzione affidabile di alta disponibilità. Utilizzarlo solo se tutti i client eseguono una nuova ricerca DNS quando si riconnettono. Per un failover immediato e trasparente, utilizzare un **indirizzo IP virtuale**: tramite una LAN estesa, un bilanciatore di carico, le CLI dei provider cloud o BGP.

## Come funziona il bilanciamento del carico di un indirizzo IP virtuale nella stessa subnet (cluster Farm) {#virtual-ip-load-balancing-same-subnet}

- [Provare il bilanciamento del carico con un indirizzo IP virtuale in un cluster Farm SafeKit](/it/best-practises/test-load-balancing-vip-farm/)

### Bilanciamento del carico nel kernel con ridondanza {#scalable-performance-kernel-level-load-balancing--redundancy}

Quando il traffico è elevato, SafeKit può distribuire il carico tra più server attivi. Se un server si guasta, gli altri continuano a funzionare.

### Architettura del cluster Farm: bilanciamento del carico tra nodi Windows o Linux {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}

![Diagramma di un indirizzo IP virtuale con bilanciamento del carico nella stessa subnet](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

In un **cluster Farm con bilanciamento del carico**, i client si connettono a un indirizzo IP virtuale e le richieste vengono distribuite contemporaneamente tra più server. Questo esempio mostra due nodi. È possibile aggiungere altri nodi al cluster. Nella stessa subnet, l'indirizzo IP virtuale viene configurato tramite alias IP sulla scheda di rete di **ogni server** del cluster.

#### Distribuzione del traffico: il filtro del kernel {#traffic-distribution-the-kernel-level-filter}

In un cluster <span class="notranslate farm-term" translate="no">Farm</span>, un **filtro nel kernel** SafeKit distribuisce il traffico. Ecco come funziona:

  * **Mappatura ARP:** nella cache ARP dei client, l'indirizzo IP virtuale è associato a un indirizzo MAC, per esempio `mac1` del server 1.
  * **Analisi dei pacchetti:** il server 1 riceve i pacchetti. Il filtro del kernel SafeKit legge l'**indirizzo IP del client** o la **porta TCP** di ogni pacchetto.
  * **Distribuzione del carico:** il filtro decide quali pacchetti vengono elaborati dal server 1 e quali inviati agli altri nodi, per esempio al server 2. Per inviare un pacchetto a un altro nodo, il filtro sostituisce l'**indirizzo MAC di destinazione** con l'indirizzo MAC di quel nodo. L'indirizzo IP di destinazione resta quello virtuale. Il lavoro viene così distribuito tra i server.

#### Failover e reindirizzamento con ARP gratuito {#failover-and-rerouting-with-gratuitous-arp}

Se il server 1 si guasta, SafeKit invia un messaggio **ARP gratuito (GARP)**. I client aggiornano la cache ARP con `mac2`, l'indirizzo MAC del server 2. Il traffico viene quindi inviato immediatamente agli altri nodi Farm.

#### Distribuzione in siti remoti {#deployment-in-remote-sites}

Questa soluzione di bilanciamento del carico funziona anche tra **data center remoti**, se i siti sono collegati tramite una **LAN estesa o una VLAN**. Tutti i siti si trovano quindi nella stessa subnet. È la configurazione più efficiente per i cluster <span class="notranslate farm-term" translate="no">Farm</span> distribuiti su più siti.

{{%  insert-safekit-farm-video-it  %}}

## Bilanciamento del carico di un indirizzo IP virtuale tra subnet diverse (cluster Farm) {#virtual-ip-load-balancing-different-subnets}

### Traffico tra subnet cloud {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

Un cluster <span class="notranslate farm-term" translate="no">Farm</span> può distribuire il carico dell'applicazione tra più zone di disponibilità e subnet.

### Cluster Farm tra subnet: più nodi Windows o Linux {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}

![Diagramma di un cluster Farm con bilanciamento del carico su due subnet diverse](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

Quando i nodi <span class="notranslate farm-term" translate="no">Farm</span> si trovano in **subnet diverse**, per esempio in più zone di disponibilità cloud, l'**indirizzo IP virtuale** si trova su un **bilanciatore di carico (LB)** esterno. Il bilanciatore invia il traffico agli indirizzi IP fisici dei server in ogni subnet.

#### Regole di routing del traffico e bilanciamento del carico {#intelligent-traffic-routing--load-balancing-rules}

Il bilanciatore distribuisce le richieste dei client in base a due criteri:

  * **Regole di bilanciamento del carico:** per esempio, l'**indirizzo IP del client** o la **porta TCP del client**.
  * **Disponibilità dei nodi:** in base al controllo dello stato SafeKit, il bilanciatore invia il traffico solo ai nodi disponibili.

> **⚠️ Nota:** SafeKit fornisce il controllo dello stato. Il bilanciatore di carico è fornito dalla rete o dal provider cloud.

#### Controllo dello stato SafeKit {#safekit-health-check-mechanism}

SafeKit fornisce un'**URL di controllo dello stato** su ogni server <span class="notranslate farm-term" translate="no">Farm</span>. Il bilanciatore la interroga per conoscere lo stato di ogni server:

  * **Nodo disponibile (UP):** il controllo restituisce `HTTP 200 OK`. Il bilanciatore invia il traffico a questo server.
  * **Nodo non disponibile (DOWN):** se un server o un'applicazione si guasta, SafeKit restituisce `HTTP 404 NOT FOUND` (oppure il server non risponde). Il bilanciatore smette immediatamente di inviare traffico a quel nodo.

#### Distribuzione cloud: AWS, Azure e GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Questa è l'architettura standard per i **cluster <span class="notranslate farm-term" translate="no">Farm</span> nel cloud**. Se una subnet o una zona diventa indisponibile, gli altri nodi continuano a elaborare il traffico. La soluzione è supportata da [**Amazon AWS**](</it/solutions/aws-load-balancing-cluster-failover/>) (AWS Network Load Balancer), [**Microsoft Azure**](</it/solutions/azure-load-balancing-cluster-failover/>) (Azure Load Balancer) e [**Google Cloud (GCP)**](</it/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing).

## Confronto: implementazione dell'indirizzo IP virtuale, latenza e trasparenza delle applicazioni {#virtual-ip-methods-comparison}

**Confronto dei metodi di reindirizzamento di IP virtuali e DNS per l'alta disponibilità e il disaster recovery.**

Ambiente e caso d'uso | Tipo di alta disponibilità | Metodo di reindirizzamento | Implementato da | Latenza di rete | Trasparenza dell'applicazione e IP locale  
---|---|---|---|---|---  
Primario/secondario (alta disponibilità) | Cluster Mirror | ARP gratuito / takeover MAC | ✅ Prodotto SafeKit | Molto bassa: tempo necessario per rilevare il guasto e inviare il GARP | Trasparenza completa: l'indirizzo IP virtuale è locale sul nodo attivo. L'indirizzo IP del client non cambia.  
Bilanciamento del carico (attivo/attivo) | Cluster <span class="notranslate farm-term" translate="no">Farm</span> | Filtro di rete del kernel / GARP | ✅ Prodotto SafeKit | Molto bassa: tempo per rilevare il guasto e modificare i filtri di rete | Trasparenza completa: l'indirizzo IP virtuale è locale su tutti i nodi. L'indirizzo IP del client non cambia.  
Stessa subnet / LAN estesa (VLAN estesa) | Disaster recovery (data center remoti) | Alias IP / GARP | ✅ Prodotto SafeKit (la VLAN estesa è fornita dal team di rete) | Bassa: dipende dal tempo di andata e ritorno (RTT) della VLAN estesa | Trasparenza completa: l'indirizzo IP virtuale è locale sui nodi. L'indirizzo IP del client non cambia.  
Subnet diverse: solo bilanciatore di carico | Disaster recovery (data center remoti / cloud) | Bilanciatore di carico esterno | 🛠️ Integratore: configurazione del bilanciatore (SafeKit fornisce il controllo dello stato) | Media: dipende dall'intervallo del controllo dello stato del bilanciatore | ⚠️ Trasparenza parziale se si utilizza SNAT/DNAT. L'indirizzo IP virtuale **NON** è locale sui nodi. L'indirizzo IP del client potrebbe **NON** essere conservato. L'applicazione deve supportare questa configurazione.  
Subnet diverse: bilanciatore + IP virtuale locale SafeKit | Disaster recovery (data center remoti / cloud) | Bilanciatore esterno con Floating IP / Direct Server Return | 🛠️ Integratore: configurazione del bilanciatore (SafeKit fornisce il controllo dello stato) | Media: dipende dall'intervallo del controllo dello stato del bilanciatore | Buona trasparenza: l'indirizzo IP virtuale è locale sul nodo primario e funge da indirizzo di destinazione.  
Subnet diverse: CLI cloud | Disaster recovery (cloud) | API cloud: l'IP privato o una route cloud viene spostata sul nuovo primario | 🛠️ Integratore: comandi CLI cloud nello script `start_prim` | Da media ad alta: dipende dal tempo di risposta dell'API cloud | Trasparenza completa: l'indirizzo IP virtuale è locale sul nodo primario. L'indirizzo IP del client non cambia.  
Subnet diverse: BGP | Disaster recovery (data center remoti / cloud) | Route /32 annunciata con BGP | 🛠️ Integratore: comandi BGP negli script `start_prim` e `stop_prim` | Da bassa a media: dipende dal tempo di convergenza BGP | Trasparenza completa: l'indirizzo IP virtuale è locale sul nodo primario. L'indirizzo IP del client non cambia. Sono necessari router BGP.  
Reindirizzamento DNS: nessun IP virtuale | Disaster recovery (data center remoti) | Modifica del record DNS (nome / IP fisico) | 🛠️ Integratore: comandi di aggiornamento DNS nello script `start_prim` | Alta e imprevedibile: dipende dal TTL DNS e dalla cache DNS del client | ⚠️ Non affidabile: il client deve eseguire una nuova ricerca DNS. Spesso i client continuano a utilizzare il vecchio IP ricevuto all'avvio e non vengono reindirizzati dopo il failover.  

## Domande frequenti sull'indirizzo IP virtuale {#virtual-ip-faq}

### Indirizzo IP virtuale e rete {#virtual-ip--networking}

Che cos'è un indirizzo IP virtuale e in che cosa si differenzia da un indirizzo IP fisico?

Un **indirizzo IP fisico** è associato a una scheda di rete. Un **indirizzo IP virtuale** non è legato all'hardware. In un cluster SafeKit, i client utilizzano sempre l'indirizzo IP virtuale. Se il server primario si guasta, l'indirizzo IP virtuale viene spostato automaticamente su un nodo disponibile. Non è necessario modificare la configurazione dei client.

Serve un bilanciatore di carico hardware per utilizzare un indirizzo IP virtuale?

No. **SafeKit** gestisce l'indirizzo IP virtuale tramite software. Nella stessa subnet utilizza **alias IP** e **ARP gratuito (GARP)** per reindirizzare il traffico. Non serve un bilanciatore di carico esterno né un server proxy.

Che cos'è l'ARP gratuito (GARP) e perché viene utilizzato?

L'**ARP gratuito (GARP)** è un messaggio di rete inviato a tutti i dispositivi. Aggiorna le tabelle ARP di switch e router. In caso di failover, il nuovo server primario invia un messaggio GARP per annunciare che l'**indirizzo IP virtuale** è ora associato al suo indirizzo MAC. Il traffico viene quindi reindirizzato immediatamente.

È possibile associare un nome DNS a un indirizzo IP virtuale?

**Sì.** Creare un normale record A per l'indirizzo IP virtuale. Il reindirizzamento avviene a **livello di IP virtuale** (tramite ARP o reindirizzamento di rete), **non a livello DNS**. Non ci sono ritardi DNS o problemi legati al TTL e il failover resta **trasparente per l'applicazione**.

### Cloud e architetture avanzate {#cloud--advanced-architectures}

Come funziona un indirizzo IP virtuale nel cloud (AWS, Azure, GCP)?

Nel cloud, i messaggi GARP di livello 2 non sono disponibili per reindirizzare un indirizzo IP virtuale. SafeKit funziona con **bilanciatori di carico cloud** (AWS ELB, Azure LB o Google GCLB). SafeKit fornisce un'**URL di controllo dello stato**. Il bilanciatore la interroga e invia il traffico al nodo attivo.

Una LAN estesa è preferibile a un bilanciatore di carico per il disaster recovery?

**Sì.** Tra data center remoti, una **LAN estesa (VLAN estesa)** è spesso preferibile perché il failover resta **trasparente per l'applicazione**. L'**indirizzo IP virtuale non cambia**, quindi l'applicazione e i client continuano a utilizzare lo stesso indirizzo dopo un failover tra data center.

Quali sono i limiti del reindirizzamento DNS rispetto a un indirizzo IP virtuale?

Il **reindirizzamento DNS** dipende dal **TTL (Time to Live)** e dalla cache DNS del client. Il ripristino può richiedere ore. Inoltre, i **client che non eseguono una nuova ricerca DNS restano bloccati** sul server guasto. Un **indirizzo IP virtuale** viene reindirizzato immediatamente con messaggi GARP di livello 2. La cache DNS del client non ha effetto.

### Trasparenza e sicurezza {#transparency--security}

Perché un indirizzo IP virtuale locale è importante per la trasparenza delle applicazioni?

Con un **indirizzo IP virtuale locale**, l'applicazione utilizza un indirizzo che non cambia. SafeKit esegue il reindirizzamento nel **kernel** e l'applicazione non rileva il failover. Con DNAT, l'indirizzo utilizzato dall'applicazione cambia.

Un indirizzo IP virtuale mantiene l'indirizzo IP originale del client?

Sì. SafeKit non utilizza la traduzione degli indirizzi di origine (SNAT). Poiché l'indirizzo IP virtuale è locale sul server attivo, l'applicazione riceve l'**indirizzo IP originale del client**. Questo è importante per gli audit di sicurezza, la persistenza delle sessioni e i registri normativi.

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}
