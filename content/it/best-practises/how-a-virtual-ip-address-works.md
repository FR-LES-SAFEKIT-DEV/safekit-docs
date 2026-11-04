---
title: "Come funziona un indirizzo IP virtuale in un cluster ad alta disponibilità?"
canonical: "https://safekit.eviden.com/it/best-practises/how-a-virtual-ip-address-works/"
description: "Come SafeKit sposta un IP virtuale in caso di failover: ARP gratuito nella stessa sottorete, bilanciatore di carico, CLI cloud o BGP tra sottoreti. Perché un IP virtuale locale è importante."
category: "best-practises"
lang: "it"
topics: "Che cos’è un indirizzo IP virtuale in un cluster ad alta disponibilità?, Implementazione dell’IP virtuale in SafeKit, Come funziona un indirizzo IP virtuale nella stessa sottorete (cluster mirror), Come funziona un IP virtuale su sottoreti diverse con un bilanciatore di carico (cluster mirror), Come funziona un IP virtuale su sottoreti diverse con le CLI del provider cloud (cluster mirror), Come funziona un IP virtuale su sottoreti diverse con BGP (cluster mirror), Come funziona il reindirizzamento DNS su sottoreti diverse (cluster mirror), Come funziona il bilanciamento del carico dell’IP virtuale in un cluster farm sulla stessa sottorete, Come funziona un IP virtuale bilanciato su sottoreti diverse (cluster farm), Confronto: implementazione dell’IP virtuale, latenza e trasparenza dell’applicazione, Domande frequenti sull’IP virtuale, 🔍 Esplora SafeKit"
---

# Come funziona un indirizzo IP virtuale in un cluster ad alta disponibilità? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## Che cos’è un indirizzo IP virtuale in un cluster ad alta disponibilità? {#virtual-ip-definition}

Un **indirizzo IP virtuale** è l’indirizzo univoco utilizzato dai client per connettersi a un’applicazione in un [cluster ad alta disponibilità](</it/>). L’indirizzo IP virtuale non è associato a un singolo server. In caso di failover, viene trasferito al server che esegue l’applicazione. I client non devono modificare la propria configurazione.

**Principio chiave di SafeKit:** l’indirizzo IP virtuale viene **configurato localmente sul server** che esegue l’applicazione. L’applicazione si avvia sull’indirizzo IP virtuale e riceve l’indirizzo IP originale del client. Per questo motivo molte applicazioni funzionano correttamente con SafeKit senza alcuna modifica. SafeKit offre due tipi di indirizzo IP virtuale:

  * **Indirizzo IP virtuale primario/di backup con cluster mirror :** l’indirizzo IP virtuale è attivo solo sul server primario. In caso di failover, viene trasferito al server di backup.
  * **Bilanciamento del carico di rete con IP virtuale tramite cluster <span class="notranslate farm-term" translate="no">farm</span> :** l’IP virtuale è attivo contemporaneamente su tutti i server. Il traffico viene ripartito tra di essi.

## Implementazione di IP virtuali in SafeKit {#safekit-virtual-ip-implementation}

Questo articolo spiega come SafeKit sposta l’indirizzo IP virtuale in ciascuna architettura di rete:

  * **Stessa sottorete o LAN estesa (cluster [mirror](#virtual-ip-same-subnet-failover) e [<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-same-subnet)):** SafeKit configura l’IP virtuale sul server e invia un **ARP gratuito (GARP)**. Non è necessario alcun hardware esterno. Questa è la soluzione più trasparente (tutto è implementato dal prodotto SafeKit).
  * **Sottoreti diverse con un bilanciatore di carico (cluster [mirror](#virtual-ip-different-subnets-failover) e [<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-different-subnets)):** il bilanciatore di carico utilizza il **controllo di integrità** SafeKit per instradare il traffico al server corretto (il bilanciatore di carico è configurato dall’integratore).
  * **[Sottoreti diverse con CLI del provider cloud](#virtual-ip-cloud-cli-failover) (cluster mirror):** lo script `start_prim` di SafeKit richiama la CLI del cloud per spostare l’IP virtuale (script scritto dall’integratore).
  * **[Sottoreti diverse con BGP](#virtual-ip-bgp-failover) (cluster mirror):** il server primario annuncia l’IP virtuale ai router (script scritto dall’integratore).
  * **[Sottoreti diverse con reindirizzamento DNS](#virtual-ip-vs-dns-redirection-failover) (cluster mirror):** lo script `start_prim` di SafeKit modifica il record DNS del nome virtuale con l’indirizzo IP fisico del nuovo server primario (script scritto dall’integratore). Non esiste un singolo indirizzo IP virtuale e questo metodo non è affidabile per tutti i client.

In questo articolo troverete anche:

  * [Confronto: implementazione dell’IP virtuale, latenza e trasparenza dell’applicazione.](#virtual-ip-methods-comparison)
  * [Domande frequenti sugli IP virtuali](#virtual-ip-faq)
  * [🔍 Scopri SafeKit](#hub)

![Diagramma comparativo del comportamento degli IP virtuali in Eviden SafeKit: cluster Mirror che mostrano un floating IP sul nodo attivo rispetto ai cluster farm che mostrano il bilanciamento del carico di rete su tutti i nodi.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Implementazione di IP virtuali per cluster mirror e <span class="notranslate farm-term" translate="no">farm</span> in SafeKit.**

## Come funziona un indirizzo IP virtuale nella stessa sottorete (cluster mirror) {#virtual-ip-same-subnet-failover}

- [Test dell’indirizzo IP virtuale primario/di backup in un cluster mirror SafeKit](/it/best-practises/test-primary-backup-vip-mirror/)

### Failover automatico e reindirizzamento di rete in una sottorete locale {#automated-failover--network-rerouting-in-a-local-subnet}

In una rete locale, **SafeKit** gestisce automaticamente l’indirizzo IP virtuale e il failover dell’applicazione.

### Cluster mirror locale: failover a 2 nodi su Windows o Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![Meccanismo di failover IP virtuale SafeKit tra due server nella stessa sottorete](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

In un **cluster mirror SafeKit**, i due nodi si trovano nella stessa sottorete. L’alta disponibilità utilizza un **IP virtuale**. SafeKit gestisce l’IP virtuale nello stack di rete del sistema operativo. Non è richiesto alcun hardware speciale. L’IP virtuale viene aggiunto agli indirizzi IP fisici del Server 1 e del Server 2 tramite **alias IP**. I client si connettono sempre all’IP virtuale.

#### Alias IP e IP virtuali multipli (VIP) in SafeKit {#safekits-advanced-ip-aliasing--multiple-virtual-ip-support}

L’indirizzo IP virtuale è un terzo indirizzo IP che si sposta tra i nodi. SafeKit è in grado di gestire **diversi indirizzi IP virtuali** all’interno di un cluster. È possibile assegnarli alla stessa scheda di rete o a schede di rete diverse. In questo modo, ogni servizio può utilizzare il proprio indirizzo IP virtuale.

#### Il meccanismo di failover: ARP gratuito (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

Il failover non richiede alcuna azione manuale. In condizioni operative normali, l’indirizzo IP virtuale è collegato **all’indirizzo MAC del Server 1 (mac1)**. Se il Server 1 si guasta, SafeKit esegue tre operazioni:

  * **Alias IP virtuale:** SafeKit configura l’IP virtuale come alias sulla scheda di rete del Server 2, il nuovo server primario. Il sistema operativo invia quindi messaggi sulla rete per annunciare l’IP virtuale.
  * **GARP:** SafeKit invia anche messaggi **ARP gratuiti (GARP)**. Gli switch di rete e i client aggiornano la loro cache ARP. L’indirizzo IP virtuale è ora collegato **all’indirizzo MAC del Server 2 (mac2)**.
  * **Ripristino dell’applicazione:** SafeKit riavvia i servizi dell’applicazione sul Server 2.


#### Centri dati remoti e VLAN estese {#remote-data-centers--extended-vlans}

La **soluzione con la stessa sottorete descritta sopra** funziona anche per **il ripristino di emergenza (DR)** tra siti remoti ed è spesso la scelta migliore quando i siti sono collegati tramite una **LAN estesa o una VLAN estesa**. Entrambi i siti si trovano nella stessa sottorete. La rete è più semplice e non sono necessari protocolli di routing complessi.

> **⚠️ Nota:** il reindirizzamento a livello 2 con ARP gratuito è la **soluzione più trasparente** per le applicazioni. L’applicazione riceve l’indirizzo IP client originale e l’indirizzo IP virtuale viene configurato localmente. **Molte applicazioni necessitano** di un indirizzo IP virtuale locale. Senza di esso, queste applicazioni **potrebbero non funzionare correttamente**. In questa configurazione sulla stessa sottorete, SafeKit implementa l’intero meccanismo, quindi non è richiesto alcun lavoro di integrazione particolare.

## Come funziona un IP virtuale su diverse sottoreti con un bilanciatore di carico (cluster mirror) {#virtual-ip-different-subnets-failover}

### Bilanciatore di carico con controlli di integrità SafeKit {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![Schema di un failover IP virtuale tramite bilanciatore di carico su due sottoreti diverse.](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

Quando i nodi si trovano in **sottoreti diverse**, il protocollo ARP gratuito non può spostare l’indirizzo IP virtuale. In questo caso, l’indirizzo IP virtuale si trova su un **bilanciatore di carico**. Il bilanciatore di carico instrada il traffico al server primario.

SafeKit fornisce un **URL per il controllo dello stato di salute** su ciascun nodo:

  * **Primario (PRIM):** restituisce `HTTP 200 OK`.. Il bilanciatore di carico invia il traffico a questo nodo.
  * **Secondario (SECOND):** restituisce `HTTP 404 NOT FOUND`.. Il bilanciatore di carico non invia traffico a questo nodo.

In caso di failover, SafeKit modifica le risposte e il bilanciatore di carico instrada il traffico al nuovo nodo primario. Questa è la soluzione standard tra **zone di disponibilità** su [**AWS**](</it/solutions/aws-high-availability-cluster-synchronous-replication-failover/>), [**Azure**](</it/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) e [**Google Cloud**](</it/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>).

> **⚠️ Nota:** SafeKit esegue il controllo di integrità. Il bilanciamento del carico è fornito dalla rete o dal provider cloud.

### Il problema: il bilanciatore di carico possiede l’IP virtuale {#the-load-balancer-pitfall-virtual-ip-on-the-frontend-nat-to-the-physical-ip}

Con un bilanciatore di carico, i client si connettono all’indirizzo IP virtuale. Il bilanciatore di carico traduce l’indirizzo IP virtuale (NAT) nell’indirizzo **IP fisico** del server primario. Il client utilizza l’indirizzo IP virtuale, ma il server utilizza il proprio indirizzo IP fisico. Il server non vede l’indirizzo IP virtuale.

### Mantieni l’indirizzo IP virtuale configurato localmente sul server primario. {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

Alcune applicazioni utilizzano l’indirizzo IP virtuale come indirizzo del server. Funzionano correttamente solo se l’indirizzo IP virtuale è **configurato anche localmente sul server primario**. Quindi:

  * i servizi possono essere avviati sull’IP virtuale;
  * il server può raggiungere i propri servizi tramite l’indirizzo IP virtuale;
  * L’autenticazione funziona tramite IP virtuale.

**Procedura consigliata:** utilizzare una modalità di bilanciamento del carico che mantenga l’indirizzo IP virtuale come indirizzo di destinazione (ad esempio, Floating IP o Direct Server Return). Successivamente, configurare l’indirizzo IP virtuale localmente sul server primario. Il metodo dipende dalla sottorete dell’indirizzo IP virtuale.

  * **L’indirizzo IP virtuale si trova nella stessa sottorete degli indirizzi IP fisici dei server:** mantenere la sezione `<vip>` nel modulo SafeKit. SafeKit configura automaticamente l’indirizzo IP virtuale come alias sulla scheda di rete dell’indirizzo IP fisico.
  * **L’indirizzo IP virtuale si trova in una sottorete diversa:** non configurare `<vip>` in SafeKit. Utilizzare lo script `start_prim` per configurare l’indirizzo IP virtuale su un’interfaccia dedicata, come ad esempio l’interfaccia di loopback, prima dell’avvio dell’applicazione. Utilizzare lo script `stop_prim` per rimuovere l’indirizzo IP virtuale al termine dell’arresto dell’applicazione. Questi comandi vengono scritti dall’integratore e non sono forniti dal prodotto SafeKit.


## Come funziona un IP virtuale su diverse sottoreti con le CLI del provider cloud (cluster mirror) {#virtual-ip-cloud-cli-failover}

### Perché l’ARP gratuito non funziona nel cloud {#why-gratuitous-arp-does-not-work-in-public-clouds}

Le reti cloud (AWS, Azure, Google Cloud) **ignorano il protocollo ARP gratuito**. Inviano il traffico solo agli indirizzi IP assegnati dalla piattaforma cloud. SafeKit configura l’IP virtuale sul server primario, ma la rete cloud non invia il traffico IP virtuale a questo server.

### Spostamento dell’IP virtuale tramite la CLI del cloud {#moving-the-virtual-ip-through-the-cloud-api-in-safekit-failover-scripts}

In assenza di un bilanciatore di carico, la CLI del provider cloud può essere integrata nello **script `start_prim`** di SafeKit per aggiornare la configurazione di rete cloud prima dell’avvio dell’applicazione. La CLI può assegnare l’indirizzo IP virtuale al nodo che diventa primario o aggiornare la rotta cloud per indirizzare il traffico IP virtuale verso tale nodo.

L’**indirizzo IP virtuale rimane locale** sul server primario. **Non è presente alcun NAT** e l’indirizzo IP originale del client non cambia.

### Responsabilità dell’integratore {#integrator-responsibility}

L’**integratore** deve aggiungere i comandi CLI del cloud allo script `start_prim`. Questi comandi **non sono forniti dal prodotto SafeKit**. Dipendono dal provider cloud, dalla progettazione della rete e dalle regole di sicurezza del cliente.

### Vincoli {#constraints-of-the-cli-approach}

  * L’interfaccia a riga di comando cloud (CLI) deve essere installata su entrambi i nodi. Ogni nodo necessita di un’identità cloud con diritti di rete.
  * Lo script deve gestire gli errori e i tentativi di ripetizione.
  * Il failover è probabilmente più lento rispetto a un bilanciatore di carico.

## Come funziona un IP virtuale su diverse sottoreti con BGP (cluster mirror) {#virtual-ip-bgp-failover}

### Reindirizzamento IP virtuale con BGP {#layer-3-virtual-ip-rerouting-with-bgp-route-advertisement}

Con BGP (Border Gateway Protocol), l’indirizzo IP virtuale (VIP) viene in genere configurato su un’interfaccia di loopback del server primario dallo script `start_prim` prima dell’avvio dell’applicazione. Il server primario annuncia il VIP ai router come una rotta /32.

In caso di failover, lo script `stop_prim` sul vecchio server primario arresta l’applicazione, rimuove il VIP dall’interfaccia di loopback e ritira la rotta /32 dai router. Se il vecchio server primario si arresta in modo anomalo, `stop_prim` non viene eseguito, ma i router perdono la sessione BGP e rimuovono automaticamente la rotta.

### Benefici e requisiti {#benefits-and-prerequisites}

  * **L’indirizzo IP virtuale rimane locale, non c’è NAT e l’indirizzo IP del client non cambia.**
  * Funziona su sottoreti e siti diversi. Non è necessaria una VLAN estesa.
  * Hai bisogno di router BGP e del supporto del tuo team di rete. Nel cloud, ti serve un servizio di server di routing fornito dal provider di servizi cloud.

> **⚠️ Nota:** l’integrazione BGP utilizza script SafeKit e la tua infrastruttura di routing. L’**integratore** deve scrivere i comandi negli script `start_prim` e `stop_prim`. Questi script **non sono forniti dal prodotto SafeKit**. Convalida la soluzione con il tuo team di rete prima di metterla in produzione.

## Come funziona il reindirizzamento DNS tra sottoreti diverse (cluster mirror) {#virtual-ip-vs-dns-redirection-failover}

### Reindirizzamento DNS con lo script `start_prim` {#dns-rerouting-with-the-start-prim-script}

Con il reindirizzamento DNS, **non esiste un singolo indirizzo IP virtuale**. I client si connettono a un **nome virtuale** (il nome DNS). In caso di failover, lo script `start_prim` sul nuovo server primario avvia l’applicazione, quindi modifica il record DNS del nome virtuale con l’**indirizzo IP fisico** del nuovo server primario.

Lo script `stop_prim` non ha alcuna funzione. Se il vecchio server primario si arresta in modo anomalo, il nuovo server primario sovrascrive il record DNS.

### Esempio: risoluzione DNS e client bloccati {#the-technical-scenario-dns-resolution-and-the-stuck-client}

![Diagramma che mostra la risoluzione del nome DNS all’indirizzo IP fisico 1 in un cluster ad alta disponibilità.](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 Risoluzione DNS e client bloccati sull’indirizzo IP fisico 1 in un cluster ad alta disponibilità

#### Prima del failover: il nome punta all’indirizzo IP fisico 1 {#current-state-resolution-to-physical-ip-1}

**Il Client 1** e **il Client 2** richiedono al sistema DNS l’indirizzo IP del nome virtuale. Il sistema DNS restituisce **l’indirizzo IP fisico 1.** I client aprono quindi una connessione di rete a questo indirizzo.

#### Dopo il failover: il nome punta all’indirizzo IP fisico 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

Il server 1 non funziona. Lo script `start_prim` sul server 2 modifica il record DNS impostandolo sull’indirizzo **IP fisico 2.** I client si connettono all’indirizzo IP fisico 2 solo se tutte le seguenti condizioni sono vere:

  * Il **TTL (Time to Live)** è scaduto su tutti i server DNS tra il client e il record DNS.
  * La cache DNS locale del Client 1 e del Client 2 è vuota.
  * L’applicazione chiude la connessione ed effettua una *nuova* ricerca DNS.

Se una delle condizioni non è soddisfatta, **il Client 1 e il Client 2 rimangono bloccati** sull’indirizzo IP fisico 1. Il servizio risulta inattivo, anche se il record DNS è corretto.

### Limiti e prerequisiti {#the-two-black-boxes-of-dns-redirection}

  * **Cache DNS:** molti provider di servizi Internet e server DNS aziendali ignorano i valori TTL brevi. Possono mantenere il vecchio indirizzo IP fisico 1 per minuti o ore.
  * **Comportamento delle applicazioni:** molte applicazioni (ad esempio, servizi Java o browser web) eseguono una ricerca DNS una sola volta, all’avvio. Continuano a utilizzare il primo indirizzo IP assegnato.
  * **L’indirizzo IP cambia a ogni failover:** l’applicazione non dispone di un IP virtuale locale che rimane invariato. Le applicazioni che registrano un proprio indirizzo IP potrebbero non funzionare.
  * **Prerequisiti:** un TTL breve per il record DNS (ad esempio, da 30 a 60 secondi) e i diritti per aggiornare la zona DNS da entrambi i server.

> **⚠️ Nota:** l’**integratore** deve scrivere i comandi di aggiornamento DNS nello script `start_prim`. Questi comandi **non sono forniti dal prodotto SafeKit**. Dipendono dal server DNS (Windows DNS, BIND o DNS cloud).

### Conclusione {#conclusion}

Il reindirizzamento DNS non è una soluzione affidabile per l’alta disponibilità. Utilizzatelo solo se tutti i client eseguono una nuova ricerca DNS al momento della riconnessione. Per un failover immediato e trasparente, utilizzate un **IP virtuale** : su una LAN estesa, con un bilanciatore di carico, tramite le interfacce a riga di comando del provider cloud o con BGP.

## Come funziona il bilanciamento del carico IP virtuale in un cluster <span class="notranslate farm-term" translate="no">farm</span> sulla stessa sottorete {#virtual-ip-load-balancing-same-subnet}

- [Test dell’indirizzo IP virtuale di bilanciamento del carico in un cluster farm SafeKit](/it/best-practises/test-load-balancing-vip-farm/)

### Bilanciamento del carico nel kernel, con ridondanza {#scalable-performance-kernel-level-load-balancing--redundancy}

In presenza di un traffico elevato, SafeKit può distribuire il carico di lavoro tra più server attivi. Se un server si guasta, gli altri continuano a funzionare.

### Architettura del cluster <span class="notranslate farm-term" translate="no">Farm</span> : bilanciamento del carico tra nodi Windows o Linux {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


![Diagramma di un IP virtuale con bilanciamento del carico all’interno della stessa sottorete](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

In un **cluster di bilanciamento <span class="notranslate farm-term" translate="no">farm</span> carico**, i client si connettono a un IP virtuale e le richieste vengono distribuite simultaneamente tra più server. Questo esempio mostra due nodi. È possibile aggiungere altri nodi al cluster. Nella stessa sottorete, l’IP virtuale è configurato con l’alias IP sulla scheda di rete di **ogni server** del cluster.

#### Condivisione del traffico: il filtro kernel {#traffic-distribution-the-kernel-level-filter}

In un cluster <span class="notranslate farm-term" translate="no">farm</span>, un **filtro SafeKit nel kernel** condivide il traffico. Funziona in questo modo:

  * **Mappatura ARP:** nella cache ARP dei client, l’indirizzo IP virtuale è associato a un indirizzo MAC (ad esempio, `mac1` del Server 1).
  * **Analisi dei pacchetti:** il server 1 riceve i pacchetti. Il filtro del kernel SafeKit legge l’**indirizzo IP del client** o la **porta TCP** di ciascun pacchetto.
  * **Condivisione del carico:** il filtro decide quali pacchetti vengono elaborati dal Server 1 e quali vengono inviati agli altri nodi (ad esempio, il Server 2). Per inviare un pacchetto a un altro nodo, il filtro riscrive l’**indirizzo MAC di destinazione** del pacchetto con l’indirizzo MAC di tale nodo. L’indirizzo IP di destinazione rimane l’IP virtuale. Il lavoro viene quindi condiviso tra i server.


#### Failover e reindirizzamento con ARP gratuito {#failover-and-rerouting-with-gratuitous-arp}

Se il Server 1 si guasta, SafeKit invia un messaggio **GARP (Gratuitous ARP)**. I client aggiornano la loro cache ARP con `mac2` del Server 2. I client vengono quindi immediatamente indirizzati agli altri nodi del farm.

#### Implementazione in siti remoti {#deployment-in-remote-sites}

Questa soluzione di bilanciamento del carico funziona anche tra **data center remoti**, se i siti sono collegati tramite una **LAN estesa o una VLAN**. In questo caso, tutti i siti si trovano nella stessa sottorete. Questa è la configurazione più efficiente per cluster <span class="notranslate farm-term" translate="no">farm</span> su più siti.

{{%  insert-safekit-farm-video-it  %}}

## Come funziona un IP virtuale con bilanciamento del carico su diverse sottoreti (cluster <span class="notranslate farm-term" translate="no">farm</span>) {#virtual-ip-load-balancing-different-subnets}

### Traffico tra sottoreti cloud {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

Un cluster <span class="notranslate farm-term" translate="no">farm</span> può distribuire il carico di lavoro dell’applicazione tra diverse zone di disponibilità e sottoreti.

### Cluster <span class="notranslate farm-term" translate="no">farm</span> tra sottoreti: più nodi Windows o Linux {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


![Schema di un cluster farm con bilanciamento del carico operante su due sottoreti diverse](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

Quando i nodi <span class="notranslate farm-term" translate="no">farm</span> si trovano in **sottoreti diverse** (ad esempio, in diverse zone di disponibilità del cloud), l’**indirizzo IP virtuale** è assegnato a un **bilanciatore di carico (LB)** esterno. Il bilanciatore di carico instrada il traffico verso gli indirizzi IP fisici dei server in ciascuna sottorete.

#### Regole di instradamento del traffico e bilanciamento del carico {#intelligent-traffic-routing--load-balancing-rules}

Il bilanciatore di carico distribuisce le richieste dei client in base a due criteri:

  * **Regole di bilanciamento del carico:** ad esempio, l’**indirizzo IP del client** o la **porta TCP del client**.
  * **Disponibilità dei nodi:** il bilanciatore di carico invia il traffico solo ai nodi che risultano integri, in base al controllo di integrità di SafeKit.


> **⚠️ Nota:** SafeKit esegue il controllo di integrità. Il bilanciamento del carico è fornito dalla rete o dal provider cloud.

#### Controllo sanitario SafeKit {#safekit-health-check-mechanism}

SafeKit fornisce un **URL per il controllo dello stato di salute** su ogni server del <span class="notranslate farm-term" translate="no">farm</span>. Il bilanciatore di carico lo legge per conoscere lo stato di ciascun server:

  * **Nodo ATTIVO:** il controllo di integrità restituisce `HTTP 200 OK`.. Il bilanciatore di carico invia il traffico a questo server.
  * **Nodo DOWN:** se un server o un’applicazione non funziona, SafeKit restituisce `HTTP 404 NOT FOUND` (ovvero il server non risponde). Il bilanciatore di carico interrompe immediatamente l’invio del traffico a questo nodo.


#### Implementazione nel cloud: AWS, Azure e GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Questa è l’architettura standard per **i cluster <span class="notranslate farm-term" translate="no">farm</span> nel cloud**. Se una sottorete o una zona si arresta, gli altri nodi continuano a elaborare il traffico. È supportata su [**Amazon AWS**](</it/solutions/aws-load-balancing-cluster-failover/>) (AWS Network Load Balancer), [**Microsoft Azure**](</it/solutions/azure-load-balancing-cluster-failover/>) (Azure Load Balancer) e [**Google Cloud (GCP)**](</it/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing).


## Confronto: implementazione dell’IP virtuale, latenza e trasparenza dell’applicazione. {#virtual-ip-methods-comparison}

**Confronto tra metodi di reindirizzamento IP virtuale e reindirizzamento DNS per alta disponibilità e ripristino di emergenza.**

Contesto e caso d’uso | Tipo ad alta disponibilità | Metodo di reindirizzamento | Implementato da | Latenza di rete | Trasparenza delle applicazioni e IP locale  
---|---|---|---|---|---  
Primario/di backup (alta disponibilità) | gruppo Mirror | Acquisizione gratuita di ARP/MAC | ✅ Prodotto SafeKit | Molto basso: tempo per rilevare il guasto e inviare il GARP | Massima trasparenza: l’indirizzo IP virtuale è locale sul nodo attivo. L’indirizzo IP del client non cambia.  
Bilanciamento del carico (attivo/attivo) | Gruppo <span class="notranslate farm-term" translate="no">Farm</span> | Filtro di rete del kernel / GARP | ✅ Prodotto SafeKit | Tempo molto basso per rilevare il guasto e modificare i filtri di rete | Massima trasparenza: l’indirizzo IP virtuale è locale su tutti i nodi. L’indirizzo IP del client non cambia.  
Stessa sottorete / LAN estesa (VLAN estesa) | Ripristino di emergenza (centri dati remoti) | Alias IP / GARP | ✅ Prodotto SafeKit (la VLAN estesa è fornita dal team di rete) | Basso: dipende dal tempo di andata e ritorno (RTT) della VLAN estesa | Massima trasparenza: l’indirizzo IP virtuale è locale sui nodi. L’indirizzo IP del client non cambia.  
Sottoreti diverse: solo bilanciatore di carico | Ripristino di emergenza (data center remoti / cloud) | Bilanciatore di carico esterno | 🛠️ Integratore: configurazione del bilanciatore di carico (SafeKit fornisce il controllo di integrità) | Medio: dipende dall’intervallo di controllo dello stato del bilanciatore di carico | ⚠️ Trasparenza parziale se si utilizza SNAT/DNAT. L’indirizzo IP virtuale **NON** è locale sui nodi. L’indirizzo IP del client POTREBBE **NON** essere mantenuto. L’applicazione deve supportare questa funzionalità.  
Sottoreti diverse: bilanciatore di carico + IP virtuale SafeKit locale | Ripristino di emergenza (data center remoti / cloud) | Bilanciatore di carico esterno con Floating IP / Direct Server Return | 🛠️ Integratore: configurazione del bilanciatore di carico (SafeKit fornisce il controllo di integrità) | Medio: dipende dall’intervallo di controllo dello stato del bilanciatore di carico | Elevata trasparenza: l’indirizzo IP virtuale è locale sul nodo primario ed è l’indirizzo di destinazione.
Sottoreti diverse: CLI cloud | Ripristino di emergenza (cloud) | API cloud: l’IP privato o una rotta cloud si sposta sul nuovo primario | 🛠️ Integratore: comandi CLI cloud nello script `start_prim` | Da medio ad alto: dipende dal tempo di risposta dell’API cloud. | Massima trasparenza: l’indirizzo IP virtuale è locale sul nodo primario. L’indirizzo IP del client non cambia.
Sottoreti diverse: BGP | Ripristino di emergenza (data center remoti / cloud) | Percorso /32 annunciato con BGP | 🛠️ Integratore: comandi BGP negli script `start_prim` e `stop_prim` | Da basso a medio: dipende dal tempo di convergenza BGP | Massima trasparenza: l’indirizzo IP virtuale è locale sul nodo primario. L’indirizzo IP del client non cambia. Richiede router BGP.  
Reindirizzamento DNS: nessun IP virtuale | Ripristino di emergenza (centri dati remoti) | Modifica del record DNS (nome / indirizzo IP fisico) | 🛠️ Integratore: comandi di aggiornamento DNS nello script `start_prim` | Elevato e imprevedibile: dipende dal TTL (Time To Live) del DNS e dalla cache DNS del client. | ⚠️ Non affidabile: il client deve effettuare una nuova ricerca DNS. Spesso, i client mantengono il vecchio indirizzo IP ricevuto all’avvio e non vengono reindirizzati dopo il failover.  
  
## Domande frequenti sugli IP virtuali {#virtual-ip-faq}

### IP virtuale e reti {#virtual-ip--networking}

Che cos’è un IP virtuale e in cosa si differenzia da un IP fisico?

Un **indirizzo IP fisico** è associato a una scheda di rete. Un **indirizzo IP virtuale** non è associato a un hardware specifico. In un cluster SafeKit, i client utilizzano sempre l’indirizzo IP virtuale. In caso di guasto del server primario, l’indirizzo IP virtuale viene automaticamente trasferito a un nodo funzionante. Non è necessario modificare la configurazione del client.

Ho bisogno di un bilanciatore di carico hardware per utilizzare un IP virtuale?

No. **SafeKit** gestisce l’IP virtuale tramite software. Nella stessa sottorete, utilizza **l’aliasing IP** e **il protocollo GARP (Gratuitous ARP)** per reindirizzare il traffico. Non è necessario un bilanciatore di carico esterno o un server proxy.

Che cos’è il GARP (Gratuitous ARP) e perché viene utilizzato?

**Il Gratuitous ARP (GARP)** è un messaggio di rete inviato a tutti i dispositivi. Aggiorna le tabelle ARP di switch e router. In caso di failover, il nuovo server primario invia un messaggio GARP. Il messaggio indica che l’**indirizzo IP virtuale** è ora associato all’indirizzo MAC del nuovo server primario. Il traffico viene quindi reindirizzato immediatamente.

È possibile associare un nome DNS a un indirizzo IP virtuale?

**Sì.** Crea un record A standard per l’IP virtuale. Il reindirizzamento viene eseguito a **livello di IP virtuale** (con ARP o reindirizzamento di rete), **non a livello DNS**. Non avrai ritardi DNS o problemi di TTL e il failover rimarrà **trasparente per l’applicazione**.

### Cloud e architetture avanzate {#cloud--advanced-architectures}

Come funziona un indirizzo IP virtuale nel cloud (AWS, Azure, GCP)?

Nel cloud, i messaggi GARP di livello 2 non sono disponibili per il reindirizzamento di un IP virtuale. SafeKit funziona con **i bilanciatori di carico cloud** (AWS ELB, Azure LB o Google GCLB). SafeKit fornisce un **URL per il controllo dello stato di salute**. Il bilanciatore di carico lo legge e invia il traffico al nodo attivo.

Per il ripristino di emergenza, è preferibile una LAN estesa o un bilanciatore di carico?

**Sì**. Tra data center remoti, una **LAN estesa (VLAN estesa)** è spesso preferibile perché il failover rimane **trasparente per l’applicazione**. L’**indirizzo IP virtuale non cambia**, quindi l’applicazione e i suoi client continuano a utilizzare lo stesso indirizzo anche dopo un failover tra data center.

Quali sono i limiti del reindirizzamento DNS rispetto a un indirizzo IP virtuale?

**Il reindirizzamento DNS** dipende dal **TTL (Time to Live)** e dalla cache DNS del client. Il ripristino può richiedere ore. Inoltre, **i client che non effettuano una nuova ricerca DNS rimangono bloccati** sul server guasto. Un **IP virtuale** viene reindirizzato immediatamente con messaggi GARP al livello 2. La cache DNS del client non ha alcun effetto.

### Trasparenza e sicurezza {#transparency--security}

Perché un IP virtuale locale è importante per la trasparenza delle applicazioni?

Con un **IP virtuale** locale, l’applicazione utilizza un indirizzo che non cambia. SafeKit esegue il reindirizzamento nel **kernel**. L’applicazione non si accorge del failover. Con DNAT, invece, l’indirizzo utilizzato dall’applicazione cambia.

Un IP virtuale mantiene l’indirizzo IP originale del client?

Sì. SafeKit non utilizza il NAT di origine (SNAT). L’indirizzo IP virtuale è locale sul server attivo, quindi l’applicazione riceve l’**indirizzo IP originale del client**. Questo è importante per i controlli di sicurezza, la persistenza della sessione e i log normativi.


{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}
