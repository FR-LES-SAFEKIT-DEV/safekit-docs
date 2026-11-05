---
title: "Come funziona un indirizzo IP virtuale in un cluster ad alta disponibilità?"
canonical: "https://safekit.eviden.com/it/best-practises/how-a-virtual-ip-address-works/"
description: "Come SafeKit sposta un IP virtuale in caso di failover: ARP gratuito nella stessa sottorete, load balancer, cloud CLI o BGP tra sottoreti. Perché un IP virtuale locale è importante."
category: "best-practises"
lang: "it"
topics: "Che cos’è un indirizzo IP virtuale in un cluster ad alta disponibilità?, Implementazione dell’IP virtuale in SafeKit, Come funziona un IP virtuale nella stessa sottorete (cluster mirror), Come funziona un IP virtuale su sottoreti diverse con un bilanciatore del carico (cluster mirror), Come funziona un IP virtuale su sottoreti diverse con le CLI dei provider cloud (cluster mirror), Come funziona un IP virtuale su sottoreti diverse con BGP (cluster mirror), Come funziona il reindirizzamento DNS su sottoreti diverse (cluster mirror), Come funziona il bilanciamento del carico dell’IP virtuale in un cluster farm sulla stessa sottorete, Come funziona un IP virtuale bilanciato su sottoreti diverse (cluster farm), Confronto: implementazione dell’IP virtuale, latenza e trasparenza dell’applicazione, Domande frequenti sull’IP virtuale, 🔍 Esplora SafeKit"
translation: "translate_md 2026-11-05.13 | glossaire 2026-11-05.16 | Translation LLM | 12 expressions"
---

# Come funziona un indirizzo IP virtuale in un cluster ad alta disponibilità? {#how-a-virtual-ip-address-vip-works-in-high-availability-clustering}

## Che cos’è un indirizzo IP virtuale in un cluster ad alta disponibilità? {#virtual-ip-definition}

Un **indirizzo IP virtuale** è l’unico indirizzo che i client utilizzano per connettersi a un’applicazione in un [cluster ad alta disponibilità](</it/>). L’IP virtuale non è collegato a un singolo server. In caso di failover, si sposta sul server che esegue l’applicazione. I client non devono modificare la propria configurazione.

**Principio chiave di SafeKit:** l’IP virtuale è **configurato localmente sul server** che esegue l’applicazione. L’applicazione si avvia sull’IP virtuale e riceve l’IP originale del client. Questo è il motivo per cui molte applicazioni funzionano correttamente con SafeKit senza alcuna modifica. SafeKit fornisce due tipi di IP virtuale:

  * **IP virtuale primario/secondario con un cluster mirror:** l’IP virtuale è attivo solo sul server primario. In caso di failover, si sposta sul server secondario.
  * **Bilanciamento del carico di rete con IP virtuale e cluster <span class="notranslate farm-term" translate="no">farm</span>:** l’IP virtuale è attivo su tutti i server contemporaneamente. Il traffico è condiviso tra di essi.

## Implementazione dell’IP virtuale in SafeKit {#safekit-virtual-ip-implementation}

Questo articolo spiega come SafeKit sposta l’IP virtuale in ciascuna architettura di rete:

  * **Stessa sottorete o VLAN estesa (cluster [mirror](#virtual-ip-same-subnet-failover) e [<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-same-subnet)):** SafeKit configura l’IP virtuale sul server e invia un **ARP gratuito (GARP)**. Non è necessario alcun hardware esterno. Questa è la soluzione più trasparente (tutto è implementato dal prodotto SafeKit).
  * **Diverse sottoreti con un load balancer (cluster [mirror](#virtual-ip-different-subnets-failover) e [<span class="notranslate farm-term" translate="no">farm</span>](#virtual-ip-load-balancing-different-subnets)):** il load balancer utilizza il **controllo di integrità** di SafeKit per inviare il traffico al server corretto (il load balancer è configurato dall’integratore).
  * **[Diverse sottoreti con CLI del provider cloud](#virtual-ip-cloud-cli-failover) (cluster mirror):** lo script `start_prim` di SafeKit chiama la CLI cloud per spostare l’IP virtuale (script scritto dall’integratore).
  * **[Diverse sottoreti con BGP](#virtual-ip-bgp-failover) (cluster mirror):** il server primario annuncia l’IP virtuale ai router (script scritto dall’integratore).
  * **[Diverse sottoreti con reindirizzamento DNS](#virtual-ip-vs-dns-redirection-failover) (cluster mirror):** lo script `start_prim` di SafeKit modifica il record DNS del nome virtuale nell’IP fisico del nuovo server primario (script scritto dall’integratore). Non esiste un singolo IP virtuale e questo metodo non è affidabile per tutti i client.

In questo articolo:

  * [Confronto: implementazione dell’IP virtuale, latenza e trasparenza dell’applicazione](#virtual-ip-methods-comparison)
  * [Domande frequenti sull’IP virtuale](#virtual-ip-faq)
  * [🔍 Esplora SafeKit](#hub)

![Diagramma comparativo del comportamento dell’IP virtuale in Eviden SafeKit: cluster mirror che mostrano un IP mobile sul nodo attivo rispetto cluster farm che mostrano il bilanciamento del carico di rete su tutti i nodi.](/wp-content/uploads/2026/01/vip-3-1024.jpg "w:512")

**Implementazione di IP virtuale per cluster mirror e <span class="notranslate farm-term" translate="no">farm</span> in SafeKit.**

## Come funziona un IP virtuale nella stessa sottorete (cluster mirror) {#virtual-ip-same-subnet-failover}

- [Test dell’IP virtuale primario/secondario in un cluster mirror di SafeKit](/it/best-practises/test-primary-backup-vip-mirror/)

### Failover automatico e reindirizzamento della rete in una subnet locale {#automated-failover--network-rerouting-in-a-local-subnet}

In una rete locale, **SafeKit** gestisce automaticamente l’IP virtuale e il failover dell’applicazione.

### Cluster mirror locale: failover a 2 nodi su Windows o Linux {#local-mirror-cluster-seamless-2-node-windows-or-linux-failover}


![Meccanismo di failover IP virtuale SafeKit tra due server nella stessa sottorete](/wp-content/uploads/2023/05/vip-mirror-same-subnet-1.png "w:256")

In un **cluster mirror SafeKit**, i due nodi si trovano nella stessa sottorete. L’alta disponibilità utilizza un **IP virtuale**. SafeKit gestisce l’IP virtuale nello stack di rete del sistema operativo. Non è necessario alcun hardware speciale. L’IP virtuale viene aggiunto agli indirizzi IP fisici di Server 1 e Server 2 con **l’IP aliasing**. I client si connettono sempre all’IP virtuale.

#### Alias IP e IP virtuali multipli in SafeKit {#safekits-advanced-ip-aliasing--multiple-virtual-ip-support}

L’IP virtuale è un terzo indirizzo IP che si sposta tra i nodi. SafeKit può gestire **più IP virtuali** in un cluster. È possibile posizionarli sulla stessa scheda di rete o su schede di rete diverse. In questo modo, ogni servizio può utilizzare il proprio IP virtuale.

#### Il meccanismo di failover: ARP gratuito (GARP) {#the-failover-mechanism-gratuitous-arp-garp}

Il failover non richiede alcuna azione manuale. In condizioni normali, l’IP virtuale è collegato **all’indirizzo MAC del Server 1 (mac1)**. Se il Server 1 si guasta, SafeKit esegue tre operazioni:

  * **Alias IP virtuale:** SafeKit configura l’IP virtuale come alias sulla scheda di rete del Server 2, il nuovo server primario. Il sistema operativo invia quindi messaggi sulla rete per annunciare l’IP virtuale.
  * **GARP:** SafeKit invia anche messaggi **ARP gratuiti (GARP)**. Gli switch di rete e i client aggiornano la loro cache ARP. L’IP virtuale è ora collegato **all’indirizzo MAC del Server 2 (mac2)**.
  * **Ripristino dell’applicazione:** SafeKit riavvia i servizi dell’applicazione sul server 2.


#### Data center remoti e VLAN estese {#remote-data-centers--extended-vlans}

La **soluzione con la stessa sottorete descritta sopra** funziona anche per **il disaster recovery** tra siti remoti. Spesso è la scelta migliore quando i siti sono collegati da una **VLAN estesa** (LAN estesa). Entrambi i siti si trovano in una sottorete. La rete è più semplice e non sono necessari protocolli di routing complessi.

> **⚠️ Nota:** il reindirizzamento al livello 2 con ARP gratuito è la **soluzione più trasparente** per le applicazioni. L’applicazione riceve l’IP client originale e l’IP virtuale è configurato localmente. Molte applicazioni **necessitano di un IP virtuale locale**. Senza di esso, queste applicazioni **potrebbero non funzionare correttamente**. In questa configurazione sulla stessa sottorete, SafeKit implementa l’intero meccanismo, quindi non è richiesto alcun lavoro di integrazione speciale.

## Come funziona un IP virtuale tra diverse sottoreti con un bilanciatore del carico (cluster mirror) {#virtual-ip-different-subnets-failover}

### Bilanciatore del carico con controlli di integrità di SafeKit {#cloud-ready-traffic-orchestration-via-load-balancer-integration}

![Diagramma di un failover IP virtuale che utilizza un bilanciatore del carico su due sottoreti diverse](/wp-content/uploads/2023/05/vip-mirror-different-subnet.png "w:256")

Quando i nodi si trovano in **sottoreti diverse**, l’ARP gratuito non può spostare l’IP virtuale. In questo caso, l’IP virtuale si trova su un **bilanciatore del carico**. Il bilanciatore del carico invia il traffico al server primario.

SafeKit fornisce un **URL di controllo dello stato** su ciascun nodo:

  * **Primario (PRIM):** restituisce `HTTP 200 OK`. Il bilanciatore del carico invia il traffico a questo nodo.
  * **Secondario (SECOND):** restituisce `HTTP 404 NOT FOUND`. Il bilanciatore del carico non invia traffico a questo nodo.

In caso di failover, SafeKit modifica le risposte e il load balancer invia il traffico al nuovo server primario. Questa è la soluzione standard tra **le zone di disponibilità** su [**AWS**](</it/solutions/aws-high-availability-cluster-synchronous-replication-failover/>), [**Azure**](</it/solutions/azure-high-availability-cluster-synchronous-replication-failover/>) e [**Google Cloud**](</it/solutions/gcp-high-availability-cluster-synchronous-replication-failover/>).

> **⚠️ Nota:** SafeKit fornisce il controllo dello stato di salute. Il bilanciatore del carico è fornito dalla rete o dal provider cloud.

### Il problema: il load balancer è proprietario dell’IP virtuale. {#the-load-balancer-pitfall-virtual-ip-on-the-frontend-nat-to-the-physical-ip}

Con un solo bilanciatore del carico, i client si connettono all’IP virtuale. Il bilanciatore del carico traduce l’IP virtuale (NAT) nell’IP **fisico** del server primario. Il client utilizza l’IP virtuale, ma il server utilizza il suo IP fisico. Il server non vede l’IP virtuale.

### Mantenere l’IP virtuale configurato localmente sul server primario {#why-the-virtual-ip-must-stay-configured-locally-on-the-primary-server}

Alcune applicazioni utilizzano l’IP virtuale come indirizzo del server. Funzionano correttamente solo se l’IP virtuale è **configurato anche localmente sul server primario**. Quindi:

  * i servizi possono essere avviati sull’IP virtuale;
  * il server può raggiungere i propri servizi con l’IP virtuale;
  * L’autenticazione funziona con l’IP virtuale.

**Best practice:** utilizzare una modalità di bilanciamento del carico che mantenga l’IP virtuale come indirizzo di destinazione (ad esempio, Floating IP o Direct Server Return). Quindi configurare l’IP virtuale localmente sul server primario. Il metodo dipende dalla subnet dell’IP virtuale:

  * **L’IP virtuale si trova nella stessa sottorete degli indirizzi IP fisici dei server:** mantenere la sezione `<vip>` nel modulo SafeKit. SafeKit configura automaticamente l’IP virtuale come alias sulla scheda di rete dell’indirizzo IP fisico.
  * **L’IP virtuale si trova in una sottorete diversa:** mantenere la sezione `<vip>` nel modulo SafeKit, con una configurazione specifica. L’esempio seguente mostra questa configurazione su Azure.
  * **Altra opzione per una sottorete diversa:** utilizzare lo script `start_prim` per configurare l’IP virtuale su un’interfaccia dedicata, come l’interfaccia loopback, prima dell’avvio dell’applicazione. Utilizzare lo script `stop_prim` per rimuovere l’IP virtuale dopo l’arresto dell’applicazione. L’integratore scrive questi comandi. Non sono forniti dal prodotto SafeKit.

### Esempio: bilanciatore del carico di Azure con un IP virtuale locale (Milestone XProtect) {#azure-load-balancer-local-virtual-ip-example}

Questa architettura viene utilizzata in produzione su Azure per il **server di gestione Milestone XProtect**, con il modulo `videoos` di SafeKit. I due nodi si trovano in due zone di disponibilità. L’IP virtuale è l’IP frontend del bilanciatore del carico. Questo IP frontend si trova in una subnet dedicata.

**Sul lato Azure** (configurato dal team dell’infrastruttura):

  1. Creare un **bilanciatore del carico di livello 4** con un IP frontend in una subnet dedicata.
  2. Aggiungere i due nodi SafeKit al **pool di backend** del bilanciatore del carico.
  3. Aggiungere una **sonda di integrità** all’URL di controllo dell’integrità SafeKit del modulo: percorso `/var/modules/videoos/ready.txt`, porta `9010` (HTTP) o porta `9453` (HTTPS con certificati validi). Per un altro modulo, sostituire `videoos` con il nome del modulo.
  4. Aggiungere **le regole di bilanciamento del carico** per tutte le porte che i client utilizzano sull’IP virtuale: le porte dei servizi di gestione di Milestone e, se necessario, le porte di altri servizi.

**Sul lato SafeKit:** nel file `userconfig.xml` del modulo (`videoos/conf/userconfig.xml`), sostituire la sezione standard `<vip>` con questa sezione:

```xml
<vip>
  <interface_list>
    <interface check="on" arpreroute="on" name="VM_INTERFACE_NAME">
      <real_interface>
        <virtual_addr addr="LB_FRONTEND_IP" netmask="LB_FRONTEND_NETMASK" where="one_side_alias" />
      </real_interface>
    </interface>
  </interface_list>
</vip>
```

Sostituire `VM_INTERFACE_NAME` con il nome dell’interfaccia di rete della VM, `LB_FRONTEND_IP` con l’IP frontend del load balancer e `LB_FRONTEND_NETMASK` con la netmask della sottorete frontend. L’interfaccia di rete deve avere lo stesso nome su entrambi i nodi.

**Lato applicazione:** configurare tutti i servizi Milestone in modo che utilizzino l’IP virtuale, non l’indirizzo IP privato del server.

> **⚠️ Nota:** utilizzare una sottorete frontend che **non si sovrapponga** alla sottorete delle VM. Ad esempio, VM in `10.0.1.0/24` e IP frontend del bilanciatore del carico in `10.0.2.0/24`. SafeKit aggiunge l’IP frontend con la sua netmask sull’interfaccia di rete della VM. Se le due sottoreti si sovrappongono, questo alias modifica il routing della VM e il traffico di rete delle VM potrebbe non funzionare.


## Come funziona un IP virtuale tra diverse sottoreti con le CLI dei provider cloud (cluster mirror) {#virtual-ip-cloud-cli-failover}

### Perché l’ARP gratuito non funziona nel cloud {#why-gratuitous-arp-does-not-work-in-public-clouds}

Le reti cloud (AWS, Azure, Google Cloud) **ignorano l’ARP gratuito**. Inviando il traffico solo agli indirizzi IP assegnati nella piattaforma cloud. SafeKit configura l’IP virtuale sul server primario, ma la rete cloud non invia il traffico IP virtuale a questo server.

### Spostamento dell’IP virtuale con la CLI cloud {#moving-the-virtual-ip-through-the-cloud-api-in-safekit-failover-scripts}

Senza un bilanciatore del carico, la CLI del provider cloud può essere integrata nello **script `start_prim`** di SafeKit per aggiornare la configurazione della rete cloud prima dell’avvio dell’applicazione. La CLI può assegnare l’IP virtuale al nodo che diventa primario o aggiornare il percorso cloud per indirizzare il traffico IP virtuale a tale nodo.

L’**IP virtuale rimane locale** sul server primario. **Non c’è NAT** e l’IP originale del client non cambia.

### Vincoli {#constraints-of-the-cli-approach}

  * La CLI cloud deve essere installata su entrambi i nodi. Ogni nodo necessita di un’identità cloud con diritti di rete.
  * Lo script deve gestire gli errori e i tentativi.
  * Il failover è **molto più lento** rispetto a un bilanciatore del carico e a una sonda di integrità, perché ogni failover attende la risposta dell’API cloud.

> **⚠️ Nota:** l’**integratore** deve aggiungere i comandi CLI del cloud allo script `start_prim`. Questi comandi **non sono forniti dal prodotto SafeKit**. Dipendono dal provider cloud, dalla progettazione della rete e dalle regole di sicurezza del cliente. Prima della produzione, convalidare la soluzione con il team di rete.

## Come funziona un IP virtuale tra diverse sottoreti con BGP (cluster mirror) {#virtual-ip-bgp-failover}

### Reindirizzamento IP virtuale con BGP {#layer-3-virtual-ip-rerouting-with-bgp-route-advertisement}

Con BGP (Border Gateway Protocol), l’IP virtuale viene in genere configurato su un’interfaccia loopback del server primario dallo script `start_prim` prima dell’avvio dell’applicazione. Il server primario annuncia l’IP virtuale ai router come route /32.

In caso di failover, lo script `stop_prim` sul vecchio server primario arresta l’applicazione, rimuove l’IP virtuale dall’interfaccia loopback e ritira la rotta /32 dai router. Se il vecchio server primario si arresta in modo anomalo, `stop_prim` non viene eseguito, ma i router perdono la sessione BGP e rimuovono automaticamente la rotta.

### Vantaggi e prerequisiti {#benefits-and-prerequisites}

  * **L’IP virtuale rimane locale, non c’è NAT e l’IP del client non cambia.**
  * Funziona tra sottoreti e siti. Non è necessaria una VLAN estesa.
  * Sono necessari router BGP e l’aiuto del team di rete. Nel cloud, è necessario un servizio di route server da parte del provider cloud.

> **⚠️ Nota:** l’integrazione BGP utilizza gli script SafeKit e la vostra infrastruttura di routing. L’**integratore** deve scrivere i comandi negli script `start_prim` e `stop_prim`. Questi script **non sono forniti dal prodotto SafeKit**. Prima della messa in produzione, convalidare la soluzione con il team di rete.

## Come funziona il reindirizzamento DNS tra diverse sottoreti (cluster mirror) {#virtual-ip-vs-dns-redirection-failover}

### Reindirizzamento DNS con lo script `start_prim` {#dns-rerouting-with-the-start-prim-script}

Con il reindirizzamento DNS, **non esiste un singolo IP virtuale**. I client si connettono a un **nome virtuale** (il nome DNS). In caso di failover, lo script `start_prim` sul nuovo server primario avvia l’applicazione, quindi modifica il record DNS del nome virtuale con l’**IP fisico** del nuovo server primario.

Lo script `stop_prim` non deve fare nulla. Se il vecchio server primario si arresta in modo anomalo, il nuovo server primario sovrascrive il record DNS.

### Esempio: risoluzione DNS e client che mantengono il vecchio IP {#the-technical-scenario-dns-resolution-and-the-stuck-client}

![Diagramma che mostra la risoluzione del nome DNS all’IP fisico 1 in un cluster ad alta disponibilità.](/wp-content/uploads/2025/12/dns-rerouting.png "w:256")

 Risoluzione DNS: i client sono ancora connessi all’IP fisico 1 in un cluster ad alta disponibilità.

#### Prima del failover: il nome punta all’IP fisico 1 {#current-state-resolution-to-physical-ip-1}

**Il client 1** e **il client 2** richiedono al sistema DNS l’indirizzo IP del nome virtuale. Il sistema DNS restituisce **l’IP fisico 1.** I client aprono quindi una connessione di rete a questo indirizzo.

#### Dopo il failover: il nome punta all’IP fisico 2 {#the-failover-challenge-rerouting-to-physical-ip-2}

Il server 1 non funziona. Lo script `start_prim` sul server 2 modifica il record DNS in **IP fisico 2.** I client si connettono all’IP fisico 2 solo se tutte queste condizioni sono vere:

  * Il **TTL (Time to Live)** è scaduto su tutti i server DNS tra il client e il record DNS.
  * La cache DNS locale di Client 1 e Client 2 è vuota.
  * L’applicazione chiude la connessione ed esegue una *nuova* ricerca DNS.

Se una condizione è falsa, **il client 1 e il client 2** continuano a utilizzare l’IP fisico 1. Il servizio è inattivo, anche se il record DNS è corretto.

### Limiti e prerequisiti {#the-two-black-boxes-of-dns-redirection}

  * **Cache DNS:** molti provider di servizi Internet e server DNS aziendali ignorano i valori TTL brevi. Possono mantenere il vecchio IP fisico 1 per minuti o ore.
  * **Comportamento dell’applicazione:** molte applicazioni (ad esempio, servizi Java o browser web) eseguono una ricerca DNS solo una volta, all’avvio. Continuano a utilizzare il primo indirizzo IP.
  * **L’indirizzo IP cambia a ogni failover:** l’applicazione non dispone di un IP virtuale locale che rimanga invariato. Le applicazioni che registrano il proprio indirizzo IP potrebbero non funzionare.
  * **Prerequisiti:** un TTL breve sul record DNS (ad esempio, da 30 a 60 secondi) e i diritti per aggiornare la zona DNS da entrambi i server.

> **⚠️ Nota:** l’**integratore** deve scrivere i comandi di aggiornamento DNS nello script `start_prim`. Questi comandi **non sono forniti dal prodotto SafeKit**. Dipendono dal server DNS (Windows DNS, BIND o DNS cloud).

### Conclusione {#conclusion}

Il reindirizzamento DNS non è una soluzione affidabile per l’alta disponibilità. Utilizzalo solo se tutti i client eseguono una nuova ricerca DNS quando si ricollegano. Per un failover immediato e trasparente, utilizza un **IP virtuale** : con una VLAN estesa, con un bilanciatore del carico, con le CLI del provider cloud o con BGP.

## Come funziona il bilanciamento del carico IP virtuale in un cluster <span class="notranslate farm-term" translate="no">farm</span> sulla stessa sottorete {#virtual-ip-load-balancing-same-subnet}

- [Test dell’IP virtuale di bilanciamento del carico in un cluster farm SafeKit](/it/best-practises/test-load-balancing-vip-farm/)

### Bilanciamento del carico e ridondanza a livello di kernel {#scalable-performance-kernel-level-load-balancing--redundancy}

Quando c’è molto traffico, SafeKit può condividere il lavoro tra più server attivi. Se un server si guasta, gli altri server continuano a funzionare.

### Architettura di cluster <span class="notranslate farm-term" translate="no">farm</span>: bilanciamento del carico tra nodi Windows o Linux {#farm-cluster-architecture-load-balancing-across-windows-or-linux-nodes}


![Diagramma di un IP virtuale con bilanciamento del carico all’interno della stessa sottorete](/wp-content/uploads/2023/05/vip-farm-same-subnet.png "w:256")

In un **cluster <span class="notranslate farm-term" translate="no">farm</span> di bilanciamento del carico**, i client si connettono a un IP virtuale e le richieste vengono condivise tra più server contemporaneamente. Questo esempio mostra due nodi. È possibile aggiungere altri nodi al cluster. Nella stessa subnet, l’IP virtuale è configurato con l’IP alias sulla scheda di rete di **ogni server** nel cluster.

#### Condivisione del traffico: il filtro del kernel {#traffic-distribution-the-kernel-level-filter}

In un cluster <span class="notranslate farm-term" translate="no">farm</span>, un **filtro SafeKit nel kernel** condivide il traffico. Funziona in questo modo:

  * **Mappatura ARP:** nella cache ARP dei client, l’IP virtuale è collegato a un indirizzo MAC (ad esempio, `mac1` del Server 1).
  * **Analisi dei pacchetti:** il server 1 riceve i pacchetti. Il filtro del kernel di SafeKit legge l’**IP del client** o la **porta TCP** di ciascun pacchetto.
  * **Condivisione del carico:** il filtro decide quali pacchetti elabora il Server 1 e quali pacchetti vanno agli altri nodi (ad esempio, Server 2). Per inviare un pacchetto a un altro nodo, il filtro riscrive l’**indirizzo MAC di destinazione** del pacchetto con l’indirizzo MAC di questo nodo. L’indirizzo IP di destinazione rimane l’IP virtuale. Il lavoro è condiviso tra i server.


#### Failover e reindirizzamento con ARP gratuito {#failover-and-rerouting-with-gratuitous-arp}

Se il Server 1 si guasta, SafeKit invia un messaggio **ARP gratuito (GARP)**. I client aggiornano la loro cache ARP con `mac2` del Server 2. I client vengono quindi inviati immediatamente agli altri nodi della farm.

#### Implementazione in siti remoti {#deployment-in-remote-sites}

Questa soluzione di bilanciamento del carico funziona anche tra **data center remoti**, se i siti sono collegati da una **VLAN estesa**. Tutti i siti si trovano quindi nella stessa sottorete. Questa è la configurazione più efficiente per cluster <span class="notranslate farm-term" translate="no">farm</span> su più siti.

{{%  insert-safekit-farm-video-it  %}}

## Come funziona un IP virtuale con bilanciamento del carico tra diverse sottoreti (cluster <span class="notranslate farm-term" translate="no">farm</span>) {#virtual-ip-load-balancing-different-subnets}

### Traffico tra sottoreti cloud {#multi-zone-scaling-orchestrating-traffic-across-cloud-subnets}

Un cluster <span class="notranslate farm-term" translate="no">farm</span> può condividere il lavoro dell’applicazione tra più zone di disponibilità e sottoreti.

### Cluster <span class="notranslate farm-term" translate="no">farm</span> tra sottoreti: più nodi Windows o Linux {#cross-subnet-farm-clusters-multi-node-windows--linux-scalability}


![Diagramma di un cluster farm con bilanciamento del carico che opera su due sottoreti diverse.](/wp-content/uploads/2023/05/vip-farm-different-subnet.png "w:256")

Quando i nodi <span class="notranslate farm-term" translate="no">farm</span> si trovano in **sottoreti diverse** (ad esempio, in diverse zone di disponibilità del cloud), l’**IP virtuale** si trova su un **load balancer** esterno. Il load balancer invia il traffico agli indirizzi IP fisici dei server in ciascuna sottorete.

#### Regole di instradamento del traffico e di bilanciamento del carico {#intelligent-traffic-routing--load-balancing-rules}

Il bilanciatore del carico condivide le richieste del client in base a due criteri:

  * **Regole di bilanciamento del carico:** ad esempio, l’**indirizzo IP del client** o la **porta TCP del client**.
  * **Disponibilità dei nodi:** il bilanciatore del carico invia il traffico solo ai nodi integri, in base al controllo di integrità di SafeKit.


> **⚠️ Nota:** SafeKit fornisce il controllo dello stato di salute. Il bilanciatore del carico è fornito dalla rete o dal provider cloud.

#### Controllo di integrità di SafeKit {#safekit-health-check-mechanism}

SafeKit fornisce un **URL di controllo dello stato** su ogni server del <span class="notranslate farm-term" translate="no">farm</span>. Il bilanciatore del carico lo legge per conoscere lo stato di ogni server:

  * **Node UP:** il controllo di integrità restituisce `HTTP 200 OK`. Il bilanciatore del carico invia il traffico a questo server.
  * **Nodo DOWN:** se un server o un’applicazione si guasta, SafeKit restituisce `HTTP 404 NOT FOUND` (o il server non risponde). Il load balancer interrompe immediatamente l’invio del traffico a questo nodo.


#### Implementazione cloud: AWS, Azure e GCP {#cloud-deployment-standards-aws-azure-and-gcp}

Questa è l’architettura standard per **cluster <span class="notranslate farm-term" translate="no">farm</span> nel cloud**. Se una sottorete o una zona si arresta, gli altri nodi continuano a elaborare il traffico. È supportata su [**Amazon AWS**](</it/solutions/aws-load-balancing-cluster-failover/>) (AWS Network Load Balancer), [**Microsoft Azure**](</it/solutions/azure-load-balancing-cluster-failover/>) (Azure Load Balancer) e [**Google Cloud (GCP)**](</it/solutions/gcp-load-balancing-cluster-failover/>) (Google Cloud Load Balancing).


## Confronto: implementazione dell’IP virtuale, latenza e trasparenza dell’applicazione {#virtual-ip-methods-comparison}

**Confronto tra i metodi di reindirizzamento IP virtuale e il reindirizzamento DNS per l’alta disponibilità e il ripristino di emergenza.**

Ambiente e caso d’uso | Tipo di alta disponibilità | Metodo di reindirizzamento | Realizzato da | Latenza di rete | Trasparenza dell’applicazione e IP locale  
---|---|---|---|---|---  
Primario/secondario (alta disponibilità) | Cluster mirror | ARP gratuito (subentro dell’indirizzo MAC) | ✅ Prodotto SafeKit | Molto basso: tempo per rilevare il guasto e inviare il GARP | Trasparenza totale: l’IP virtuale è locale sul nodo attivo. L’IP del client non cambia.  
Bilanciamento del carico (attivo/attivo) | Cluster <span class="notranslate farm-term" translate="no">farm</span> | Filtro di rete del kernel / GARP | ✅ Prodotto SafeKit | Molto basso: tempo per rilevare il guasto e cambiare i filtri di rete | Massima trasparenza: l’IP virtuale è locale su tutti i nodi. L’IP del client non cambia.  
Stessa sottorete / VLAN estesa | Ripristino di emergenza (data center remoti) | Alias IP / GARP | ✅ Prodotto SafeKit (la VLAN estesa è fornita dal team di rete) | Basso: dipende dal tempo di andata e ritorno (RTT) della VLAN estesa. | Trasparenza totale: l’IP virtuale è locale sui nodi. L’IP del client non cambia.  
Sottoreti diverse: solo bilanciatore del carico | Disaster recovery (data center remoti/cloud) | Bilanciatore del carico esterno | 🛠️ Integratore: configurazione del bilanciatore del carico (SafeKit fornisce il controllo dello stato di salute) | Durata: dipende dall’intervallo di controllo dello stato di integrità del bilanciatore del carico. | ⚠️ Trasparenza parziale se si utilizza SNAT/DNAT. L’IP virtuale **NON** è locale sui nodi. L’IP del client potrebbe **NON** essere mantenuto. L’applicazione deve supportare questa condizione.  
Sottoreti diverse: bilanciatore del carico + IP virtuale locale di SafeKit | Disaster recovery (data center remoti/cloud) | Bilanciatore del carico esterno con Floating IP / Direct Server Return o IP frontend come alias SafeKit locale | 🛠️ Integratore: configurazione del bilanciatore del carico (SafeKit fornisce il controllo dello stato di salute) | Durata: dipende dall’intervallo di controllo dello stato di integrità del bilanciatore del carico. | Buona trasparenza: l’IP virtuale è locale sul nodo primario ed è l’indirizzo di destinazione.
Sottoreti diverse: CLI cloud | Disaster recovery (cloud) | API cloud: l’IP privato o un percorso cloud si sposta sul nuovo nodo primario | 🛠️ Integratore: comandi CLI cloud nello script `start_prim` | Da medio ad alto: dipende dal tempo di risposta dell’API cloud. | Trasparenza totale: l’IP virtuale è locale sul nodo primario. L’IP del client non cambia.
Sottoreti diverse: BGP | Disaster recovery (data center remoti/cloud) | /32 route annunciata con BGP | 🛠️ Integratore: comandi BGP negli script `start_prim` e `stop_prim` | Da basso a medio: dipende dal tempo di convergenza BGP. | Trasparenza totale: l’IP virtuale è locale sul nodo primario. L’IP del client non cambia. Richiede router BGP.  
Reindirizzamento DNS: nessun IP virtuale | Ripristino di emergenza (data center remoti) | Modifica del record DNS (nome/IP fisico) | 🛠️ Integratore: comandi di aggiornamento DNS nello script `start_prim` | Elevato e non prevedibile: dipende dal TTL (Time To Live) del DNS e dalla cache DNS del client. | ⚠️ Non affidabile: il client deve eseguire una nuova ricerca DNS. Spesso, i client mantengono il vecchio IP ricevuto all’avvio e non vengono reindirizzati dopo il failover.  
  
## Domande frequenti sull’IP virtuale {#virtual-ip-faq}

### IP virtuale e reti {#virtual-ip--networking}

Che cos’è un IP virtuale e in che cosa si differenzia da un IP fisico?

Un **indirizzo IP fisico** è collegato a una scheda di rete. Un **IP virtuale** non è collegato all’hardware. In un cluster SafeKit, i client utilizzano sempre l’IP virtuale. Se il server primario si guasta, l’IP virtuale si sposta automaticamente su un nodo integro. Non è necessario modificare la configurazione del client.

È necessario un load balancer hardware per utilizzare un IP virtuale?

No. **SafeKit** gestisce l’IP virtuale con il software. Nella stessa sottorete, utilizza **l’IP aliasing** e **l’ARP gratuito (GARP)** per reindirizzare il traffico. Non è necessario un load balancer esterno o un server proxy.

Che cos’è l’ARP gratuito (GARP) e perché viene utilizzato?

**L’ARP gratuito (GARP)** è un messaggio di rete inviato a tutti i dispositivi. Aggiorna le tabelle ARP di switch e router. In caso di failover, il nuovo server primario invia un messaggio GARP. Il messaggio indica che l’**IP virtuale** è ora collegato all’indirizzo MAC del nuovo server primario. Il traffico viene quindi immediatamente reindirizzato.

Posso associare un nome DNS a un IP virtuale?

**Sì.** Creare un record A standard per l’IP virtuale. Il reindirizzamento viene eseguito a **livello di IP virtuale** (con ARP o reindirizzamento di rete), **non a livello DNS**. Non si verificano ritardi DNS o problemi TTL e il failover rimane **trasparente per l’applicazione**.

### Cloud e architetture avanzate {#cloud--advanced-architectures}

Come funziona un IP virtuale nel cloud (AWS, Azure, GCP)?

Nel cloud, i messaggi GARP di livello 2 non sono disponibili per il reindirizzamento di un IP virtuale. SafeKit funziona con **i bilanciatori del carico cloud** (AWS Elastic Load Balancing, Azure Load Balancer o Google Cloud Load Balancing). SafeKit fornisce un **URL di controllo dello stato di salute**. Il bilanciatore del carico lo legge e invia il traffico al nodo attivo.

Una VLAN estesa è migliore di un bilanciatore del carico per il disaster recovery?

**Sì**. Tra i data center remoti, una **VLAN estesa** è spesso migliore perché il failover rimane **trasparente per l’applicazione**. L’**IP virtuale non cambia**, quindi l’applicazione e i suoi client continuano a utilizzare lo stesso indirizzo dopo un failover tra i data center.

Quali sono i limiti del reindirizzamento DNS rispetto a un IP virtuale?

**Il reindirizzamento DNS** dipende dal **TTL (Time to Live)** e dalla cache DNS del client. Il ripristino può richiedere ore. Inoltre, **i client che non eseguono una nuova ricerca DNS** continuano a utilizzare il server non funzionante. Un **IP virtuale** viene reindirizzato immediatamente con messaggi GARP a livello 2. La cache DNS del client non ha alcun effetto.

### Trasparenza e sicurezza {#transparency--security}

Perché un IP virtuale locale è importante per la trasparenza delle applicazioni?

Con un **IP virtuale** locale, l’applicazione utilizza un indirizzo che non cambia. SafeKit esegue il reindirizzamento nel **kernel**. L’applicazione non vede il failover. Con DNAT, l’indirizzo utilizzato dall’applicazione cambia.

Un IP virtuale mantiene l’indirizzo IP originale del client?

Sì. SafeKit non utilizza il NAT sorgente (SNAT). L’IP virtuale è locale sul server attivo, quindi l’applicazione riceve l’**IP originale del client**. Questo è importante per i controlli di sicurezza, la persistenza della sessione e i registri normativi.


{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}
