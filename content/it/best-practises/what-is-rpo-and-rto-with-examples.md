---
title: "Cosa sono RPO e RTO? Definizioni, esempi e strategie HA"
canonical: "https://safekit.eviden.com/it/best-practises/what-is-rpo-and-rto-with-examples/"
description: "Impara le definizioni di RPO (Recovery Point Objective) e RTO (Recovery Time Objective) con esempi chiari. Scopri come SafeKit ottiene una perdita di dati pari a zero (RPO=0) e un failover rapido per garantire la continuità aziendale 24 ore su 24, 7 giorni su 7."
category: "best-practises"
lang: "it"
topics: "Breve riepilogo: RPO e RTO, Sommario, Come posso calcolare RPO e RTO per una soluzione ad alta disponibilità e continuità aziendale?, Come posso determinare RPO e RTO per una soluzione di backup e ripristino di emergenza?, In che modo un cluster mirror SafeKit raggiunge un RPO pari a zero e un RTO basso?, Quali sono i benchmark RTO per un cluster farm SafeKit con bilanciamento del carico?, Tabelle di confronto: RTO e RPO, Alta disponibilità in azione: in tempo reale Demo di RPO zero e RTO quasi zero, Domande frequenti: ottimizzazione di RPO e RTO per la continuità aziendale, 🔍 Hub di navigazione ad alta disponibilità SafeKit"
---

# Cosa sono RPO e RTO? Definizioni, esempi e strategie HA {#what-are-rpo-and-rto-definitions-examples-and-ha-strategies}

## Breve riepilogo: RPO e RTO {#article-summary}

  * **RPO (Recovery Point Objective):** Misura la **perdita di dati**. Definisce la durata massima dei file che devono essere ripristinati affinché le operazioni possano riprendere.
  * **RTO (Recovery Time Objective):** misura i **tempi di inattività**. È l'intervallo di tempo entro il quale un processo aziendale deve essere ripristinato.
  * **La differenza fondamentale:** RPO riguarda **archiviazione/backup**, mentre RTO riguarda la **velocità di ripristino/failover**.
  * **Funzionalità SafeKit:** Fornisce **0 RPO** (nessuna perdita di dati) e **RTO basso** (riavvio rapido) tramite replica sincrona e failover automatico.


![Un grafico comparativo di RPO (Recovery Point Objective) e RTO (Recovery Time Objective), che illustra come SafeKit ottiene zero perdite di dati e un rapido riavvio delle applicazioni.](/wp-content/uploads/2026/08/rto-rpo-5-1024-en-2.jpg "w:512")

**RPO e RTO: confronto tra perdita di dati e tempi di ripristino in SafeKit**

## Sommario {#table-of-contents}

  * [Come posso calcolare RPO e RTO per una soluzione ad alta disponibilità e continuità aziendale?](#calculate-rpo-rto-high-availability)
  * [Come posso determinare RPO e RTO per una soluzione di backup e ripristino di emergenza?](#calculate-rpo-rto-backup-solution)
  * [Come fa un mirror cluster SafeKit a raggiungere un RPO pari a zero e un RTO basso?](#rpo-rto-safekit-mirror-cluster)
  * [Quali sono i parametri di riferimento RTO per un cluster farm SafeKit con bilanciamento del carico?](#rpo-rto-safekit-farm-cluster)
  * [Tabelle di confronto: RTO vs RPO](#rpo-vs-rto-comparison)
  * [Elevata disponibilità in azione: demo in tempo reale di RPO zero e RTO quasi zero](#safekit-rpo-rto-video-demos)
  * [Domande frequenti su RPO e RTO](#faq-rpo-rto)
  * [SafeKit Hub di navigazione ad alta disponibilità](#hub)



{{%  insert-safekit-4-buttons-it  %}}
 

## Come posso calcolare RPO e RTO per una soluzione ad alta disponibilità e continuità aziendale? {#calculate-rpo-rto-high-availability}

### Cos'è l'alta disponibilità? {#what-is-high-availability}

**Alta disponibilità (HA)** è un'architettura tecnica progettata per garantire che un sistema rimanga operativo e accessibile per una percentuale di tempo specificata (ad esempio, 99,99%).


![Logo del software ad alta disponibilità SafeKit che rappresenta il clustering SANless e la replica sincrona](/wp-content/uploads/2026/01/safekit-icon-512x512-1.png "w:128")


Per raggiungere gli obiettivi RPO e RTO definiti in un **Piano di continuità aziendale**, l'alta disponibilità viene generalmente implementata attraverso due architetture principali:

  * **Sistema di dischi condivisi su SAN:** un cluster tradizionale in cui 2 nodi sono collegati a una Storage Area Network (SAN) centrale. Se un nodo fallisce, l'altro assume l'accesso ai dati condivisi.
  * **Replica sincrona senza SAN:** ​​una moderna architettura "shared-nothing", implementata dal software [SafeKit](</> "SafeKit High Availability Software"), in cui i dati vengono replicati in tempo reale tra i dischi locali di 2 nodi indipendenti, eliminando la necessità di una SAN.


### Qual è l'RPO di una soluzione ad alta disponibilità? {#what-is-rpo-high-availability}

**RPO (Recovery Point Objective)** definisce il volume massimo tollerabile di perdita di dati misurato nel tempo. Per una vera **soluzione ad alta disponibilità**, l'RPO target è **zero**.

Quando si implementa un cluster ad alta disponibilità con failover automatico, un **RPO pari a zero** garantisce il riavvio dell'applicazione senza perdita di dati.

  * **Sistema di dischi condivisi su SAN:** ​​poiché entrambi i nodi accedono agli **esatti stessi blocchi fisici di dati**, non vi è alcun "delta" o ritardo tra i nodi, garantendo la totale coerenza dei dati durante un failover.
  * **Replica sincrona basata su software:** un approccio SANless in cui ogni operazione di "scrittura" viene replicata in tempo reale sulla rete. L'applicazione riceve un **riconoscimento di scrittura** solo dopo che i dati sono stati archiviati in modo sicuro su entrambi i nodi. Questo processo sincrono di "doppia scrittura" garantisce **nessuna perdita di dati** anche in caso di guasto del server primario.


### Qual è l'RTO di una soluzione ad alta disponibilità? {#what-is-rto-high-availability}

**RTO (Recovery Time Objective)** rappresenta la durata massima tollerabile del tempo di inattività dopo un'interruzione del servizio. Nel contesto dell'**alta disponibilità**, l'RTO dovrebbe essere minimo per garantire l'accesso continuo alle applicazioni critiche.

Per ottenere un RTO basso, una soluzione ad alta disponibilità utilizza il **failover automatico** per rilevare guasti hardware o software e riavviare immediatamente l'applicazione. In un tipico cluster ad alta disponibilità, l'**RTO è di circa un minuto**, calcolato come:

  * **Tempo di rilevamento errore:** l'intervallo richiesto dal sistema per identificare la perdita di battito cardiaco di un nodo o di un'applicazione.
  * **Tempo di riavvio automatico:** il tempo necessario per l'inizializzazione dei servizi applicativi sul nodo sopravvissuto.


## Come posso determinare RPO e RTO per una soluzione di backup e ripristino di emergenza? {#calculate-rpo-rto-backup-solution}

### Cos'è una soluzione di backup? {#what-is-backup}

Una **Soluzione di backup** è una strategia di protezione dei dati progettata per creare copie periodiche dei dati su un dispositivo di archiviazione secondario o sul cloud. A differenza dell'elevata disponibilità, il backup si concentra sulla **conservazione dei dati a lungo termine** e sul ripristino dalla corruzione dei dati o da disastri a livello di sito.


![Icona della soluzione di backup che rappresenta un'architettura di backup per la conservazione dei dati a lungo termine](/wp-content/uploads/2026/01/backup-icon.png "w:128")


Per soddisfare gli obiettivi RPO e RTO definiti in un **Piano di ripristino di emergenza**, il backup viene in genere implementato attraverso due metodi principali:

  * **Istantanee pianificate:** un processo in cui vengono acquisite copie di dati temporizzate a intervalli fissi (ad esempio, quotidianamente). Ciò definisce l'**RPO**, poiché tutti i dati modificati tra l'ultimo snapshot e l'errore vengono persi.
  * **Recupero offsite o cloud:** un'architettura in cui i dati vengono archiviati in una posizione fisica separata. Sebbene ciò garantisca la sopravvivenza dei dati, si traduce in un **RTO più elevato** perché i dati devono essere trasferiti e ripristinati prima che l'applicazione possa riavviarsi.


### Qual è l'RPO di una soluzione di backup? {#what-is-rpo-backup}

**RPO (Recovery Point Objective)** in un contesto di backup definisce l'età dei file che devono essere ripristinati dallo spazio di archiviazione affinché le normali operazioni possano riprendere. A differenza dell'elevata disponibilità, una **soluzione di backup** comporta in genere un RPO diverso da zero, che rappresenta il tempo trascorso dal completamento corretto dell'ultimo backup. 

La quantità di perdita di dati in una strategia di backup è determinata dalla **frequenza di backup**. A seconda dell'architettura, questo RPO può variare da minuti a 24 ore: 

  * **Istantanee incrementali:** un metodo in cui solo i blocchi di dati modificati vengono salvati a intervalli prestabiliti. Se viene eseguito un backup ogni 4 ore, l'**RPO massimo è 4 ore**, il che significa che tutti i dati creati tra l'ultimo snapshot e il crash del sistema verranno persi in modo permanente. 
  * **Backup completi giornalieri:** un approccio tradizionale in cui viene eseguita una copia completa dei dati una volta al giorno (solitamente durante la notte). Ciò si traduce in un **RPO 24 ore**, che può essere accettabile per i dati non critici ma spesso non è sufficiente per i database transazionali. 


### Qual è l'RTO di una soluzione di backup? {#what-is-rto-backup}

**RTO (Recovery Time Objective)** in una strategia di backup è la durata del tempo necessario per ripristinare i dati da un supporto di backup e riportare l'applicazione a uno stato operativo. A differenza dell'elevata disponibilità, l'**RTO per il backup** è significativamente più lungo perché prevede processi di ripristino manuali o basati su script. 

Per una soluzione di backup, l'**RTO può variare da diverse ore a giorni**, a seconda del volume di dati e dell'architettura di ripristino. Il tempo di inattività totale viene calcolato come: 

  * **Tempo di trasferimento dati:** il tempo necessario per spostare i dati dallo spazio di archiviazione di backup (dischi locali, nastri o cloud) al server di produzione. 
  * **Tempo di riconfigurazione del sistema:** l'intervallo necessario per inserire i dati nell'applicazione, ricostruire gli indici e verificare l'integrità dei dati prima che gli utenti possano accedere nuovamente. 


## In che modo un mirror cluster SafeKit raggiunge un RPO pari a zero e un RTO basso? {#rpo-rto-safekit-mirror-cluster}

### Cos'è il cluster di specchi SafeKit? {#what-is-safekit-mirror-cluster}

Il **SafeKit Mirror Cluster** è una soluzione ad alta disponibilità basata su software che implementa un'architettura "shared-nothing". A differenza dei cluster tradizionali che richiedono una SAN costosa, SafeKit utilizza le risorse locali di due server standard per creare un ambiente altamente resiliente.


![Architettura SafeKit Mirror Cluster che mostra la replica dei file a livello di byte in tempo reale tra i nodi primari e secondari](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


Per garantire la massima operatività e protezione dei dati nell'ambito del **Piano di continuità aziendale**, il mirror cluster SafeKit funziona attraverso due meccanismi integrati:

  * **Replica sincrona in tempo reale:** SafeKit esegue il mirroring dei dati attraverso la rete tra i dischi locali dei nodi primari e secondari. Ciò garantisce che l'RPO sia pari a zero, poiché ogni byte di dati viene protetto su entrambi i server prima che una transazione venga finalizzata.
  * **Failover automatico dell'IP e dell'applicazione:** Se il nodo primario si guasta, SafeKit rileva automaticamente la perdita di heartbeat e ristabilisce l'applicazione e il relativo indirizzo IP virtuale sul nodo secondario. Ciò si traduce in un RTO di circa un minuto, garantendo una continuità del servizio senza interruzioni.


### Qual è l'RPO di un cluster di mirror SafeKit? {#rpo-safekit-example}

L'**RPO di un cluster mirror SafeKit è zero** perché la replica dei dati tra i nodi è [sincrona e in tempo reale](</best-practises/synchronous-replication-vs-asynchronous-replication/> "Synchronous vs Asynchronous Replication").

Questa garanzia di perdita di dati pari a zero si ottiene attraverso un processo di **riconoscimento di scrittura**: una scrittura su disco viene confermata all'applicazione solo dopo che è stata scritta con successo sui dischi locali sia del nodo primario che di quello secondario.

Al contrario, con la **replica asincrona**, l'RPO è maggiore di zero. Poiché è presente un ritardo tra la scrittura primaria e l'aggiornamento secondario, un errore comporterà la perdita di dati durante il failover sul server secondario. Per la **continuità aziendale** mission-critical, la replica sincrona è l'unico modo per garantire che l'applicazione venga riavviata con il 100% di integrità dei dati.

### Qual è l'RTO di un cluster di mirror SafeKit? {#what-is-rto-safekit}

In una configurazione standard, l'**RTO di un mirror cluster SafeKit è di circa un minuto**. SafeKit offre la flessibilità necessaria per implementare l'alta disponibilità a **livello di applicazione** o a **livello di VM**, ciascuno dei quali incide sui tempi di ripristino in modo diverso: 

  * **HA a livello di applicazione:** questo è l'approccio SafeKit ottimizzato in cui il software monitora servizi applicativi specifici. 
    * **Errore hardware:** RTO = _timeout heartbeat_ (predefinito 30 secondi) + _tempo di riavvio dell'applicazione_.
    * **Errore software:** RTO = _ora di arresto dell'applicazione_ \+ _ora di riavvio dell'applicazione_.
    * **Vantaggio principale:** poiché il sistema operativo è già in esecuzione sul nodo secondario, non vi è alcun ritardo nell'avvio del sistema operativo, con conseguente ripristino più rapido possibile per la **continuità aziendale**.
  * **HA a livello di VM:** In questo scenario, SafeKit protegge l'intero ambiente della macchina virtuale. 
    * **Ripristino da errori:** RTO = _rilevamento errori_ \+ **Ora di riavvio del sistema operativo** \+ _ora di riavvio dell'applicazione_.
    * **Compromesso tecnico:** L'RTO è naturalmente più lungo (diversi minuti) perché il nodo secondario deve eseguire un avvio a freddo completo del sistema operativo prima ancora che l'applicazione possa iniziare l'inizializzazione.


Utilizzando l'**alta disponibilità a livello di applicazione**, SafeKit elimina la "penalità di riavvio" inerente alla virtualizzazione standard, garantendo che il tuo **Piano di continuità aziendale** raggiunga il minor tempo di inattività possibile. 

## Quali sono i parametri di riferimento RTO per un cluster farm SafeKit con bilanciamento del carico? {#rpo-rto-safekit-farm-cluster}

### Cos'è il cluster agricolo SafeKit? {#what-is-safekit-farm-cluster}

Il **SafeKit Farm Cluster** è una soluzione ad alta disponibilità basata su software progettata per applicazioni stateless (come server Web) che richiedono sia **scalabilità** che **ridondanza**. A differenza di un cluster mirror incentrato sulla replica dei dati, un cluster farm distribuisce il traffico in entrata su più nodi attivi.


![Architettura SafeKit Farm Cluster che dimostra il bilanciamento del carico di rete e il failover per applicazioni stateless](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


Per mantenere la **continuità aziendale** per ambienti a traffico elevato, il cluster farm SafeKit opera attraverso due meccanismi principali:

  * **Bilanciamento del carico di rete:** SafeKit utilizza un indirizzo IP virtuale per distribuire il traffico di rete in entrata su una "farm" di più server attivi. Ciò garantisce che nessun singolo server venga sopraffatto e massimizza le prestazioni dell'applicazione.
  * **Rilevamento e riconfigurazione automatici dei guasti:** Se un nodo della farm si guasta, SafeKit rileva l'errore tramite heartbeat e ridistribuisce immediatamente il traffico tra i restanti nodi integri. Ciò fornisce un RTO prossimo allo zero per il servizio complessivo, poiché altri nodi sono già attivi e pronti ad assorbire il carico.


### Qual è l'RPO di un cluster agricolo SafeKit? {#what-is-rpo-safekit-farm}

L'**RPO (Recovery Point Objective)** per un **SafeKit Farm Cluster** è generalmente considerato **Non applicabile (N/A)**. Questo perché un cluster farm è progettato specificamente per **applicazioni senza stato** in cui i dati non vengono archiviati localmente sui nodi. 

Poiché un cluster farm si concentra sul **bilanciamento del carico di rete** anziché sulla sincronizzazione dei dati, non esiste alcuna replica dei dati tra i nodi all'interno del cluster stesso. In un tipico **Piano di continuità aziendale** che coinvolge un'architettura agricola: 

  * **Operazioni stateless:** tutti i nodi della farm sono identici e non contengono dati persistenti; pertanto, non vi è alcuna "perdita di dati" da misurare durante un guasto del nodo. 
  * **Archiviazione dati esterna:** se l'applicazione richiede la persistenza dei dati, in genere viene gestita da un backend separato **SafeKit Mirror Cluster** dove l'RPO sarebbe quindi pari a zero. 


### Qual è l'RTO di un cluster agricolo SafeKit? {#rto-example-safekit-farm-cluster}

In un'architettura farm, l'**RTO è ridotto a pochi secondi** perché in genere tutti i nodi sono attivi contemporaneamente. Il tempo di ripristino è determinato dalla velocità con cui il cluster riconfigura la distribuzione del traffico:

  * **Guasto hardware:** L'RTO è uguale al _timeout di rilevamento guasto_ tra i canali di monitoraggio (l'impostazione predefinita è pochi secondi). Una volta rilevata la perdita di heartbeat, i **filtri di bilanciamento del carico IP virtuale** vengono riconfigurati automaticamente per reindirizzare il traffico ai restanti nodi integri.
  * **Errore software o riavvio pianificato:** l'RTO viene calcolato come il _tempo di arresto dell'applicazione_ più il _tempo di riavvio dell'applicazione_ su quel nodo specifico, durante il quale gli altri nodi della farm continuano a gestire tutto il traffico in entrata.


Questo meccanismo "attivo-attivo" garantisce che per i servizi stateless l'impatto sulla **continuità aziendale** sia quasi impercettibile per l'utente finale, poiché non è necessario inizializzare il servizio su un nuovo nodo standby.

## Tabelle di confronto: RTO vs RPO {#rpo-vs-rto-comparison}

**Definizione semantica: RTO vs. RPO**

Metrico | Acronimo | Definizione | Area di messa a fuoco  
---|---|---|---  
Obiettivo del tempo di recupero | RTO | La durata di tempo prevista per ripristinare un processo aziendale dopo un errore. | Disponibilità/Tempi di inattività  
Obiettivo del punto di ripristino | RPO | La durata massima dei file che devono essere ripristinati dal backup affinché le operazioni possano riprendere. | Perdita/integrità dei dati  
  
**Disponibilità elevata (HA) rispetto al backup standard**

Caratteristica | Soluzioni di backup | Alta disponibilità (SafeKit)  
---|---|---  
Automazione del recupero | Intervento manuale | Failover automatico  
Obiettivo RTO | Ore a Giorni | Da secondi a ~1 minuto  
Obiettivo RPO | > 0 (Ultimo punto di backup) | 0 (replica sincrona)  
  
**Benchmark RTO e RPO per i cluster SafeKit**

Architettura | Caso d'uso | RTO (disponibilità) | RPO (perdita di dati)  
---|---|---|---  
Gruppo di specchi | Replica in tempo reale | ~1 minuto (battito cardiaco + riavvio) | 0 (nessuna perdita di dati)  
Gruppo agricolo | Bilanciamento del carico di rete | Pochi secondi | N/D (apolide)  
  
## Elevata disponibilità in azione: demo in tempo reale di RPO zero e RTO quasi zero {#safekit-rpo-rto-video-demos}

### Video: raggiungimento di RPO zero e RTO basso in un cluster di mirror SafeKit (8:47) {#demo-mirror-cluster-rpo-rto}

Scopri come SafeKit gestisce un guasto critico. Questo video dimostra la **replica sincrona** che garantisce che non vengano persi dati (RPO 0) in un database SQL e il **riavvio automatico** dei servizi sul nodo secondario (RTO basso).


#### Capitoli {#chapters}

  1. 🎬 [2 nodi con SQL Server](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. 🎬 [Configura il cluster e il modulo mirror.safe](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. 🎬 [Avvia e testa la replica SQL, la migrazione e il failover in caso di crash](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)

[Prova gratuita qui](</quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/>)

### Video: raggiungimento di un RTO vicino allo zero in un cluster di aziende agricole SafeKit (5:03) {#demo-farm-cluster-rpo-rto}

Guarda come SafeKit gestisce una web farm Apache per fornire scalabilità delle prestazioni e failover istantaneo.

#### Capitoli {#chapters-1}

  1. 🎬 Nodi [2 con Apache](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=0s>) (0:13)
  2. 🎬 [Configura il cluster e il modulo farm.safe](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=13s>) (2:20)
  3. 🎬 [Avvia e testa il bilanciamento del carico di rete, failover in caso di arresto anomalo](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=153s>) (2:30)

[Prova gratuita qui](</quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/>)

## Domande frequenti: ottimizzazione di RPO e RTO per la continuità aziendale {#faq-rpo-rto}

### RPO e RTO possono essere pari a zero? {#can-rpo-rto-be-zero}

**Sì.** Raggiungere un **RPO pari a zero** significa nessuna perdita di dati, cosa possibile attraverso il mirroring sincrono dei dati. Un **RTO prossimo allo zero** si ottiene tramite un software di failover automatizzato come SafeKit, che rileva gli errori e riavvia le applicazioni su un nodo secondario in pochi secondi o minuti.

### Cos’è più importante: RPO o RTO? {#importance-rpo-vs-rto}

Nessuno dei due è intrinsecamente più importante; svolgono ruoli diversi. **RPO (Recovery Point Objective)** si concentra sulla perdita di dati: quanti dati puoi permetterti di perdere. **RTO (Recovery Time Objective)** si concentra sui tempi di inattività: quanto velocemente devi tornare online. Per le applicazioni mission-critical, entrambi devono essere ridotti al minimo.

### Qual è la differenza in RPO e RTO tra SafeKit a livello di applicazione e a livello di VM? {#safekit-application-vs-vm-level}

Sebbene entrambi garantiscano un **RPO pari a 0** tramite replica sincrona, differiscono nel tempo di ripristino:

  * **Livello applicazione:** RTO più veloce (circa 1 minuto) perché solo i servizi applicativi si riavviano su un sistema operativo già in esecuzione. Rileva inoltre arresti anomali specifici di software/processi.
  * **Livello VM:** RTO più elevato perché l'intera macchina virtuale deve essere riavviata sull'host secondario. Sebbene sia indipendente dall'applicazione, manca di un monitoraggio granulare dei processi applicativi stessi.


### Qual è la differenza tra le soluzioni HA e quelle di backup in termini di RTO? {#ha-vs-backup-rto}

L'elevata disponibilità (HA) offre in genere un RTO molto inferiore (da secondi a minuti) perché gestisce automaticamente gli errori locali. Il ripristino di emergenza con soluzioni di backup (DR) solitamente ha un RTO più elevato (da ore a giorni) perché prevede il ripristino di dati e servizi in un sito geograficamente distante dopo una grave catastrofe.

### Come posso ottenere il miglior RPO e RTO tra siti remoti? {#rpo-rto-between-remote-sites}

Il raggiungimento di un **RPO pari a zero** e un **RTO prossimo allo zero** su siti remoti richiede una combinazione di **replica sincrona** e una **LAN estesa (VLAN estesa)**:

  * **LAN estesa/VLAN estesa:** Estendendo la stessa sottorete (Livello 2) su due data center, puoi spostare un'applicazione dal Sito A al Sito B senza modificarne l'indirizzo IP, evitando complessi aggiornamenti DNS.
  * **La soluzione SafeKit:** SafeKit sfrutta questa funzionalità fornendo un **IP virtuale definito dal software (VIP)** che fluttua tra i siti. Reindirizza istantaneamente il traffico al sito secondario utilizzando Gratuitous ARP (GARP).


Ciò fornisce un **RPO = 0** (mirroring in tempo reale) e un **RTO minimo** (failover in circa 1 minuto) senza intervento umano.

### Perché la combinazione di alta disponibilità e backup è essenziale per ottimizzare RPO e RTO? {#combining-ha-and-backup-for-rpo-rto}

Combinare l'alta disponibilità (HA) con una soluzione di backup è l'unico modo per ottenere una strategia di ripristino "migliore di entrambi i mondi". Sebbene vengano spesso discussi insieme, risolvono diverse parti dell'equazione RPO/RTO:

  * **Elevata disponibilità (tramite SafeKit):** Ottimizza per RTO e RPO prossimi allo zero in caso di guasti hardware o software. Utilizzando la replica sincrona in tempo reale, il server secondario è sempre aggiornato. Se il primario fallisce, il servizio si riavvia immediatamente sul secondario senza perdita di dati.
  * **Soluzioni di backup:** Proteggi dai problemi di integrità dei dati (come ransomware o cancellazione accidentale). Poiché HA replica le modifiche istantaneamente, replicherà "fedelmente" un virus o un record di database eliminato sul server di standby. Un backup consente di "tornare indietro nel tempo" a un punto precedente al verificarsi del danneggiamento.
  * **L'approccio ibrido:** per la massima resilienza, le organizzazioni utilizzano un'**architettura ibrida a 3 nodi**. Ciò include un cluster locale a 2 nodi con replica sincrona per HA immediato e una terza copia remota (asincrona) per Disaster Recovery. Questa difesa a più livelli garantisce la disponibilità di una copia "attiva" per il ripristino immediato e di una copia "storica" ​​per la sicurezza dei dati.



{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}