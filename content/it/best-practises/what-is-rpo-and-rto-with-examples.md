---
title: "Cosa sono RPO e RTO? Definizioni, esempi e strategie HA"
canonical: "https://safekit.eviden.com/it/best-practises/what-is-rpo-and-rto-with-examples/"
description: "Cosa significano RPO e RTO, con esempi, e come SafeKit raggiunge zero perdita di dati (RPO 0) e un failover automatico rapido per la continuità operativa."
category: "best-practises"
lang: "it"
topics: "Riepilogo rapido: RPO vs. RTO, Indice, Come si calcolano RPO e RTO per una soluzione di alta disponibilità e continuità aziendale?, Come si determinano RPO e RTO per una soluzione di backup e disaster recovery?, In che modo un cluster mirror SafeKit raggiunge RPO pari a zero e RTO basso?, Quali sono i parametri di riferimento RTO per un cluster farm SafeKit con bilanciamento del carico?, Tabelle di confronto: RTO vs RPO, Alta disponibilità in azione: dimostrazioni in tempo reale di perdita di dati pari a zero e tempi di inattività prossimi allo zero, FAQ: Ottimizzazione di RPO e RTO per la continuità aziendale"
hashpart: "article-summary, table-of-contents, calculate-rpo-rto-high-availability, calculate-rpo-rto-backup-solution, rpo-rto-safekit-mirror-cluster, rpo-rto-safekit-farm-cluster, rpo-vs-rto-comparison, safekit-rpo-rto-video-demos, faq-rpo-rto"
translation: "translate_md 2026-11-20.9 | glossaire 2026-11-20.24 | Translation LLM | 41 expressions"
image: "/wp-content/uploads/2026/08/rto-rpo-5-1024-en-2.jpg"
schemaType: "TechArticle"
schemaFaq: [{"question": "RPO e RTO possono essere pari a zero?", "answer": "**Sì.** Raggiungere un **RPO pari a zero** significa nessuna perdita di dati, il che è possibile tramite il mirroring sincrono dei dati. Un **RTO quasi pari a zero** si ottiene tramite un software di failover automatizzato come SafeKit, che rileva i guasti e riavvia le applicazioni su un nodo secondario in pochi secondi o minuti."}, {"question": "Cosa è più importante: RPO o RTO?", "answer": "Nessuno dei due è intrinsecamente più importante; svolgono ruoli diversi. **RPO (Recovery Point Objective)** si concentra sulla perdita di dati, ovvero quanti dati ci si può permettere di perdere. **RTO (Recovery Time Objective)** si concentra sui tempi di inattività, ovvero quanto velocemente è necessario tornare online. Per le applicazioni mission-critical, entrambi devono essere ridotti al minimo."}, {"question": "In che modo RPO e RTO differiscono tra HA a livello di applicazione e HA a livello di VM con SafeKit?", "answer": "Sebbene entrambi garantiscano un **RPO di 0** tramite replica sincrona, differiscono nel tempo di ripristino:\r\n\r\n  * **Livello applicazione:** RTO più rapido (circa 1 minuto) perché solo i servizi dell’applicazione si riavviano su un sistema operativo già in esecuzione. Rileva anche arresti anomali specifici di software/processi.\r\n  * **Livello VM:** RTO più elevato perché l’intera macchina virtuale deve essere riavviata sull’host secondario. Sebbene sia indipendente dall’applicazione, manca di un monitoraggio granulare dei processi dell’applicazione stessa."}, {"question": "Qual è la differenza tra le soluzioni HA e quelle di backup in termini di RTO?", "answer": "L’alta disponibilità (HA) in genere offre un RTO molto più basso (da secondi a minuti) perché gestisce automaticamente i guasti locali. Il disaster recovery (DR) con soluzioni di backup di solito ha un RTO più elevato (da ore a giorni) perché comporta il recupero di dati e servizi in un sito geograficamente distante dopo una grave catastrofe."}, {"question": "Come posso ottenere i migliori valori RPO e RTO tra siti remoti?", "answer": "Il raggiungimento di un **RPO pari a zero** e **RTO quasi pari a zero** in siti remoti richiede una combinazione di **replica sincrona** e una **LAN estesa (VLAN estesa)**:\r\n\r\n  * **LAN estesa/VLAN estesa:** estendendo la stessa subnet (Layer 2) su due data center, è possibile spostare un’applicazione dal sito A al sito B senza modificarne l’indirizzo IP, evitando complessi aggiornamenti DNS.\r\n  * **La soluzione SafeKit:** SafeKit sfrutta questo aspetto fornendo un **IP virtuale (VIP) definito dal software** che si sposta tra i siti. Reindirizza istantaneamente il traffico al sito secondario utilizzando ARP gratuito (GARP).\r\n\r\n\r\nCiò garantisce un **RPO = 0** (mirroring in tempo reale) e un **RTO minimo** (failover in circa 1 minuto) senza intervento umano."}, {"question": "Perché la combinazione di alta disponibilità e backup è essenziale per ottimizzare RPO e RTO?", "answer": "La combinazione di alta disponibilità (HA) con una soluzione di backup è l’unico modo per ottenere una strategia di ripristino che offra il meglio di entrambi i mondi. Sebbene vengano spesso discussi insieme, risolvono parti diverse dell’equazione RPO/RTO:\r\n\r\n  * **Alta disponibilità (tramite SafeKit):** offre un RTO quasi nullo e un RPO pari a zero in caso di guasti hardware o software. Grazie alla replica sincrona in tempo reale, il server secondario è sempre aggiornato. Se il server primario si guasta, il servizio si riavvia immediatamente sul server secondario senza perdita di dati.\r\n  * **Soluzioni di backup:** i backup proteggono da problemi di integrità dei dati (come ransomware o eliminazione accidentale). Poiché l’HA replica le modifiche istantaneamente, replicherà \"fedelmente\" un virus o un record di database eliminato sul server di standby. Un backup consente di \"tornare indietro nel tempo\" a un punto precedente al verificarsi del danno.\r\n  * **L’approccio ibrido:** per la massima resilienza, le organizzazioni utilizzano **un’architettura ibrida a 3 nodi**. Questa include un cluster locale a 2 nodi con replica sincrona per HA immediata e una terza copia remota (asincrona) per il ripristino di emergenza. Questa difesa a più livelli garantisce una copia \"live\" per il ripristino istantaneo e una copia \"storica\" per la sicurezza dei dati."}]
---

# Cosa sono RPO e RTO? Definizioni, esempi e strategie HA {#what-are-rpo-and-rto-definitions-examples-and-ha-strategies}

## Riepilogo rapido: RPO vs. RTO {#article-summary}

  * **RPO (Recovery Point Objective):** misura **la perdita di dati**. Definisce l’età massima dei file che devono essere recuperati per riprendere le operazioni.
  * **RTO (Recovery Time Objective):** misura **il tempo di inattività**. È la durata di tempo entro la quale un processo aziendale deve essere ripristinato.
  * **La differenza fondamentale:** RPO riguarda **l’archiviazione e i backup**. RTO riguarda **il ripristino e la velocità di failover**.
  * **SafeKit:** offre un **RPO di 0** (nessuna perdita di dati) e un **RTO basso** (riavvio rapido) attraverso la replica sincrona e il failover automatico.


![Una tabella comparativa di RPO (Recovery Point Objective) e RTO (Recovery Time Objective), che illustra come SafeKit raggiunge l’azzeramento della perdita di dati e il rapido riavvio dell’applicazione.](/wp-content/uploads/2026/08/rto-rpo-5-1024-en-2.jpg "w:512")

**RPO vs. RTO: confronto tra perdita di dati e tempo di ripristino in SafeKit**

## Indice {#table-of-contents}

  * [Come si calcolano RPO e RTO per una soluzione di alta disponibilità e continuità aziendale?](#calculate-rpo-rto-high-availability)
  * [Come si determinano RPO e RTO per una soluzione di backup e disaster recovery?](#calculate-rpo-rto-backup-solution)
  * [In che modo un cluster mirror SafeKit raggiunge RPO pari a zero e RTO basso?](#rpo-rto-safekit-mirror-cluster)
  * [Quali sono i parametri di riferimento RTO per un cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit con bilanciamento del carico?](#rpo-rto-safekit-farm-cluster)
  * [Tabelle di confronto: RTO vs RPO](#rpo-vs-rto-comparison)
  * [Alta disponibilità in azione: dimostrazioni in tempo reale di perdita di dati pari a zero e tempi di inattività prossimi allo zero](#safekit-rpo-rto-video-demos)
  * [FAQ: Ottimizzazione di RPO e RTO per la continuità aziendale](#faq-rpo-rto)
  * [Hub di navigazione per l’alta disponibilità di SafeKit](#hub)



{{%  insert-safekit-4-buttons-it  %}}
 

## Come si calcolano RPO e RTO per una soluzione di alta disponibilità e continuità aziendale? {#calculate-rpo-rto-high-availability}

### Che cos’è l’alta disponibilità? {#what-is-high-availability}

**L’alta disponibilità (HA)** è un’architettura tecnica progettata per garantire che un sistema rimanga operativo e accessibile per una percentuale di tempo specificata (ad esempio, il 99,99%).


![Logo del software di alta disponibilità SafeKit che rappresenta la replica sincrona e il failover](/wp-content/uploads/2026/01/safekit-icon-512x512-1.png "w:128")


Per raggiungere gli obiettivi RPO e RTO definiti in un **piano di continuità operativa**, l’alta disponibilità viene in genere implementata attraverso due architetture principali:

  * **Sistema a disco condiviso su una SAN:** un cluster tradizionale in cui 2 nodi sono collegati a una rete di archiviazione centrale (SAN). Se un nodo si guasta, l’altro assume l’accesso ai dati condivisi.
  * **Replica sincrona senza storage condiviso:** un’architettura moderna shared-nothing, implementata da SafeKit. I dati vengono replicati in tempo reale tra i dischi locali di 2 nodi indipendenti. Non è necessaria alcuna SAN.


### Qual è l’RPO di una soluzione ad alta disponibilità? {#what-is-rpo-high-availability}

**RPO (Recovery Point Objective)** definisce il volume massimo tollerabile di perdita di dati misurato nel tempo. Per una vera **soluzione ad alta disponibilità**, l’RPO target è **zero**.

Quando si implementa un cluster ad alta disponibilità con failover automatico, un **RPO pari a zero** garantisce il riavvio dell’applicazione senza perdita di dati.

  * **Sistema di dischi condivisi su una SAN:** poiché entrambi i nodi accedono agli **stessi blocchi fisici di dati**, non c’è alcun "delta" o ritardo tra i nodi, garantendo la coerenza totale dei dati durante un failover.
  * **Replica sincrona basata su software:** ogni operazione di "scrittura" viene replicata in tempo reale sulla rete. L’applicazione riceve una **conferma di scrittura** solo quando i dati sono archiviati in modo sicuro su entrambi i nodi. Questo processo sincrono di "doppia scrittura" garantisce **l’assenza di perdita di dati** anche in caso di guasto del server primario.


### Qual è l’RTO di una soluzione ad alta disponibilità? {#what-is-rto-high-availability}

**RTO (Recovery Time Objective)** rappresenta la durata massima tollerabile di inattività dopo un’interruzione del servizio. Nel contesto **dell’alta disponibilità**, l’RTO dovrebbe essere minimo per garantire l’accesso continuo alle applicazioni critiche.

Per ottenere un RTO basso, una soluzione ad alta disponibilità utilizza **il failover automatico** per rilevare guasti hardware o software e riavviare immediatamente l’applicazione. In un cluster ad alta disponibilità tipico, l’**RTO è di circa un minuto**, calcolato come:

  * **Tempo di rilevamento dei guasti:** l’intervallo di tempo necessario al sistema per identificare la perdita dell’heartbeat di un nodo o di un’applicazione.
  * **Tempo di riavvio automatico:** il tempo necessario per l’inizializzazione dei servizi dell’applicazione sul nodo superstite.


## Come si determinano RPO e RTO per una soluzione di backup e disaster recovery? {#calculate-rpo-rto-backup-solution}

### Che cos’è una soluzione di backup? {#what-is-backup}

Una **soluzione di backup** è una strategia di protezione dei dati progettata per creare copie periodiche dei dati su un dispositivo di archiviazione secondario o sul cloud. A differenza dell’alta disponibilità, il backup si concentra sulla **conservazione dei dati a lungo termine** e sul ripristino in caso di danneggiamento dei dati o disastri a livello di sito.


![Icona della soluzione di backup che rappresenta un’architettura di backup per la conservazione dei dati a lungo termine](/wp-content/uploads/2026/01/backup-icon.png "w:128")


Per soddisfare gli obiettivi RPO e RTO definiti in un **piano di disaster recovery**, il backup viene in genere implementato attraverso due metodi principali:

  * **Snapshot pianificati:** un processo in cui vengono eseguite copie dei dati in un determinato momento a intervalli fissi (ad esempio, giornalieri). Questo definisce l’**RPO**, poiché tutti i dati modificati tra l’ultimo snapshot e il guasto vengono persi.
  * **Recupero offsite o cloud:** un’architettura in cui i dati sono archiviati in una posizione fisica separata. Sebbene ciò garantisca la sopravvivenza dei dati, comporta un **RTO più elevato** perché i dati devono essere trasferiti e ripristinati prima che l’applicazione possa essere riavviata.


### Che cos’è l’RPO di una soluzione di backup? {#what-is-rpo-backup}

**RPO (Recovery Point Objective)** in un contesto di backup definisce l’età dei file che devono essere recuperati dall’archiviazione per riprendere le normali operazioni. A differenza dell’alta disponibilità, una **soluzione di backup** di solito comporta un RPO diverso da zero, che rappresenta il tempo trascorso dall’ultima esecuzione riuscita del backup. 

La quantità di perdita di dati in una strategia di backup è determinata dalla **frequenza di backup**. A seconda dell’architettura, questo RPO può variare da pochi minuti a 24 ore: 

  * **Snapshot incrementali:** un metodo in cui solo i blocchi di dati modificati vengono salvati a intervalli prestabiliti. Se viene eseguito un backup ogni 4 ore, l’**RPO massimo è di 4 ore**, il che significa che tutti i dati creati tra l’ultimo snapshot e il crash del sistema vengono persi in modo permanente. 
  * **Backup completi giornalieri:** un approccio tradizionale in cui viene eseguita una copia completa dei dati una volta al giorno (di solito durante la notte). Ciò si traduce in un **RPO di 24 ore**, che può essere accettabile per i dati non critici, ma spesso è insufficiente per i database transazionali. 


### Qual è l’RTO di una soluzione di backup? {#what-is-rto-backup}

**RTO (Recovery Time Objective)** in una strategia di backup è la durata del tempo necessario per ripristinare i dati da un supporto di backup e riportare l’applicazione a uno stato operativo. A differenza dell’alta disponibilità, l’**RTO per il backup** è significativamente più lungo perché comporta processi di ripristino manuali o basati su script. 

Per una soluzione di backup, l’RTO può variare da **diverse ore a diversi giorni**, a seconda del volume di dati e dell’architettura di ripristino. Il tempo di inattività totale è calcolato come: 

  * **Tempo di trasferimento dei dati:** il tempo necessario per spostare i dati dall’archiviazione di backup (dischi locali, nastri o cloud) al server di produzione. 
  * **Tempo di riconfigurazione del sistema:** l’intervallo necessario per importare i dati nell’applicazione, ricostruire gli indici e verificare l’integrità dei dati prima che gli utenti possano accedere nuovamente. 


## In che modo un cluster mirror SafeKit raggiunge RPO pari a zero e RTO basso? {#rpo-rto-safekit-mirror-cluster}

### Che cos’è il cluster mirror SafeKit? {#what-is-safekit-mirror-cluster}

Il **cluster mirror SafeKit** è una soluzione di alta disponibilità basata su software che implementa un’architettura shared-nothing. A differenza dei cluster tradizionali che richiedono una costosa SAN, SafeKit utilizza le risorse locali di due server standard per creare un ambiente altamente resiliente.


![Architettura di cluster mirror SafeKit che mostra la replica di file a livello di byte in tempo reale tra i nodi primario e secondario](/wp-content/uploads/2023/02/safekit-prim-second-300.png "w:300")


Per garantire la massima operatività e la protezione dei dati all’interno del **piano di continuità aziendale**, il cluster mirror SafeKit funziona attraverso due meccanismi integrati:

  * **Replica sincrona in tempo reale:** SafeKit rispecchia i dati sulla rete tra i dischi locali dei nodi primario e secondario. Ciò garantisce che l’RPO sia pari a zero, poiché ogni byte di dati è protetto su entrambi i server prima che una transazione venga finalizzata.
  * **Failover automatico di IP e applicazioni:** in caso di guasto del nodo primario, SafeKit rileva automaticamente la perdita dell’heartbeat e ristabilisce l’applicazione e il suo indirizzo IP virtuale sul nodo secondario. Ciò si traduce in un RTO di circa un minuto, garantendo la continuità del servizio senza interruzioni.


### Qual è l’RPO di un cluster mirror SafeKit? {#rpo-safekit-example}

L’**RPO di un cluster mirror SafeKit è pari a zero** perché la replica dei dati tra i nodi è [sincrona e in tempo reale](</it/best-practises/synchronous-replication-vs-asynchronous-replication/> "Replica sincrona e asincrona").

Questa garanzia di zero perdita di dati è ottenuta attraverso un processo **di conferma di scrittura**: una scrittura su disco viene confermata all’applicazione solo dopo che è stata scritta con successo sui dischi locali sia del nodo primario che di quello secondario.

Al contrario, con **la replica asincrona**, l’RPO è maggiore di zero. Poiché vi è un ritardo tra la scrittura primaria e l’aggiornamento secondario, un errore comporterà la perdita di dati durante il failover al server secondario. Per **la continuità operativa** mission-critical, la replica sincrona è l’unico modo per garantire il riavvio dell’applicazione con un’integrità dei dati del 100%.

### Qual è l’RTO di un cluster mirror SafeKit? {#what-is-rto-safekit}

In una configurazione standard, l’**RTO di un cluster mirror SafeKit è di circa un minuto**. SafeKit offre la flessibilità di implementare l’alta disponibilità a **livello di applicazione** o a **livello di VM**. Ogni opzione ha un impatto diverso sul tempo di ripristino: 

  * **HA a livello di applicazione:** questo è l’approccio ottimizzato utilizzato da SafeKit. Il software monitora servizi applicativi specifici. 
    * **Guasto hardware:** RTO = *timeout heartbeat* (impostazione predefinita 30 s) + *tempo di riavvio dell’applicazione*.
    * **Guasto software:** RTO = *tempo di arresto dell’applicazione* + *tempo di riavvio dell’applicazione*.
    * **Vantaggio principale:** poiché il sistema operativo è già in esecuzione sul nodo secondario, non vi è alcun ritardo nell’avvio del sistema operativo, con conseguente ripristino più rapido possibile per **la continuità aziendale**.
  * **HA a livello di VM:** in questo scenario, SafeKit protegge l’intera macchina virtuale. 
    * **Recupero da errore:** RTO = *tempo di rilevamento dell’errore* + *tempo di riavvio del sistema operativo* + *tempo di riavvio dell’applicazione*.
    * **Compromesso tecnico:** l’RTO è naturalmente più lungo (diversi minuti) perché il nodo secondario deve eseguire un avvio a freddo completo del sistema operativo prima che l’applicazione possa iniziare a inizializzarsi.


Utilizzando **l’alta disponibilità a livello di applicazione**, SafeKit elimina la "penalità di riavvio" intrinseca nella virtualizzazione standard, garantendo che il tuo **Piano di Continuità Operativa** raggiunga il minor tempo di inattività possibile. 

## Quali sono i parametri di riferimento RTO per un cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit con bilanciamento del carico? {#rpo-rto-safekit-farm-cluster}

### Che cos’è il cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit? {#what-is-safekit-farm-cluster}

Il **cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit** è una soluzione di alta disponibilità basata su software, progettata per applicazioni senza stato (come i server web) che richiedono **scalabilità** e **ridondanza**. A differenza di un cluster mirror, che si concentra sulla replica dei dati, un cluster <span class="notranslate farm-term" translate="no">farm</span> distribuisce il traffico in entrata su più nodi attivi.


![Architettura di cluster farm SafeKit che dimostra il bilanciamento del carico di rete e il failover per le applicazioni senza stato](/wp-content/uploads/2023/02/safekit-up-up-up-300.png "w:300")


Per mantenere **la continuità operativa** in ambienti ad alto traffico, il cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit opera attraverso due meccanismi principali:

  * **Bilanciamento del carico di rete:** SafeKit utilizza un indirizzo IP virtuale per distribuire il traffico di rete in entrata su una <span class="notranslate farm-term" translate="no">farm</span> di più server attivi. Ciò garantisce che nessun singolo server sia sovraccaricato e massimizza le prestazioni dell’applicazione.
  * **Rilevamento e riconfigurazione automatica dei guasti:** se un nodo della <span class="notranslate farm-term" translate="no">farm</span> si guasta, SafeKit rileva il guasto tramite heartbeat e ridistribuisce immediatamente il suo traffico tra i nodi rimanenti integri. Ciò fornisce un RTO quasi nullo per il servizio complessivo, poiché gli altri nodi sono già attivi e pronti ad assorbire il carico.


### Qual è l’RPO di un cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit? {#what-is-rpo-safekit-farm}

L’**RPO (Recovery Point Objective)** per un **cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit** è generalmente considerato **non applicabile (N/A)**. Questo perché un cluster <span class="notranslate farm-term" translate="no">farm</span> è specificamente progettato per **applicazioni senza stato** in cui i dati non sono archiviati localmente sui nodi. 

Poiché un cluster <span class="notranslate farm-term" translate="no">farm</span> si concentra sul **bilanciamento del carico di rete** piuttosto che sulla sincronizzazione dei dati, non vi è alcuna replica dei dati tra i nodi all’interno del cluster stesso. In un tipico **piano di continuità aziendale** che coinvolge un’architettura <span class="notranslate farm-term" translate="no">farm</span>: 

  * **Operazioni senza stato:** tutti i nodi della <span class="notranslate farm-term" translate="no">farm</span> sono identici e non contengono dati persistenti; pertanto, non vi è alcuna "perdita di dati" da misurare durante un errore del nodo. 
  * **Archiviazione dati esterna:** se l’applicazione richiede la persistenza dei dati, questa viene solitamente gestita da un **cluster mirror SafeKit** separato nel backend. L’RPO è quindi pari a zero. 


### Qual è l’RTO di un cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit? {#rto-example-safekit-farm-cluster}

In un’architettura <span class="notranslate farm-term" translate="no">farm</span>, l’**RTO è ridotto a pochi secondi** perché tutti i nodi sono in genere attivi contemporaneamente. Il tempo di ripristino è determinato dalla velocità con cui il cluster riconfigura la distribuzione del traffico:

  * **Guasto hardware:** l’RTO è uguale al *timeout di rilevamento dei guasti* su tutti i canali di monitoraggio (il valore predefinito è di pochi secondi). Una volta rilevata la perdita dell’heartbeat, i **filtri di bilanciamento del carico IP virtuale** vengono riconfigurati automaticamente per reindirizzare il traffico ai nodi rimanenti integri.
  * **Guasto software o riavvio pianificato:** l’RTO viene calcolato come il *tempo di arresto dell’applicazione* più il *tempo di riavvio dell’applicazione* su quel nodo specifico, durante il quale gli altri nodi della <span class="notranslate farm-term" translate="no">farm</span> continuano a gestire tutto il traffico in entrata.


Questo meccanismo "Active-Active" assicura che, per i servizi senza stato, l’impatto **sulla continuità aziendale** sia quasi impercettibile per l’utente finale, poiché non è necessario inizializzare il servizio su un nuovo nodo di standby.

## Tabelle di confronto: RTO vs RPO {#rpo-vs-rto-comparison}

**Definizione semantica: RTO vs. RPO**

Indicatore | Acronimo | Definizione | Area di interesse  
---|---|---|---  
Obiettivo di tempo di ripristino | RTO | La durata di tempo prevista per ripristinare un processo aziendale dopo un guasto. | Disponibilità/Tempi di inattività  
Obiettivo del punto di ripristino | RPO | L’età massima dei file che devono essere recuperati dal backup per la ripresa delle operazioni. | Perdita/Integrità dei dati  
  
**Alta disponibilità (HA) vs. backup standard**

Caratteristica | Soluzioni di backup | Alta disponibilità (SafeKit)  
---|---|---  
Automazione del recupero | Intervento manuale | Failover automatico  
RTO target | Da ore a giorni | Da pochi secondi a circa 1 minuto  
RPO target | > 0 (ultimo punto di backup) | 0 (Replica sincrona)  
  
**Valori di riferimento RTO e RPO per i cluster SafeKit**

Architettura | Caso d’uso | RTO (Disponibilità) | RPO (perdita di dati)  
---|---|---|---  
Cluster mirror | Replica in tempo reale | ~1 min (heartbeat + Riavvio) | 0 (nessuna perdita di dati)  
Cluster <span class="notranslate farm-term" translate="no">farm</span> | Bilanciamento del carico di rete | Pochi secondi | N/D (senza stato)  
  
## Alta disponibilità in azione: dimostrazioni in tempo reale di perdita di dati pari a zero e tempi di inattività prossimi allo zero {#safekit-rpo-rto-video-demos}

### Video: Come ottenere un RPO pari a zero e un RTO basso in un cluster mirror SafeKit (8:47) {#demo-mirror-cluster-rpo-rto}

Scopri come SafeKit gestisce un guasto critico. Questo video mostra **la replica sincrona** che garantisce l’assenza di perdita di dati (RPO 0) in un database SQL e il **riavvio automatico** dei servizi sul nodo secondario (RTO basso).


#### Capitoli {#chapters}

  1. 🎬 [2 nodi con SQL Server](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=0s>) (0:32)
  2. 🎬 [Configurare il cluster e il modulo mirror.safe](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=32s>) (3:58)
  3. 🎬 [Avviare e testare la replica, la migrazione e il failover di SQL in caso di arresto anomalo](<https://www.youtube.com/watch?v=mGwEguDnnH0&t=270s>) (4:17)

[Prova gratuita qui](</it/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-real-time-replication-and-failover/>)

### Video: Come ottenere un RTO prossimo allo zero in un cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit (5:03) {#demo-farm-cluster-rpo-rto}

Guarda come SafeKit gestisce una web <span class="notranslate farm-term" translate="no">farm</span> con Apache per fornire sia il ridimensionamento delle prestazioni che il failover istantaneo.

#### Capitoli {#chapters-1}

  1. 🎬 [2 nodi con Apache](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=0s>) (0:13)
  2. 🎬 [Configurare il cluster e il modulo farm.safe](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=13s>) (2:20)
  3. 🎬 [Avvio e test del bilanciamento del carico di rete, failover in caso di arresto anomalo](<https://www.youtube.com/watch?v=1Ww2-cXHNx4&t=153s>) (2:30)

[Prova gratuita qui](</it/quick-install/safekit-quick-installation-guide-for-a-new-windows-application-with-network-load-balancing-and-failover/>)

## FAQ: Ottimizzazione di RPO e RTO per la continuità aziendale {#faq-rpo-rto}

### RPO e RTO possono essere pari a zero? {#can-rpo-rto-be-zero}

**Sì.** Raggiungere un **RPO pari a zero** significa nessuna perdita di dati, il che è possibile tramite il mirroring sincrono dei dati. Un **RTO quasi pari a zero** si ottiene tramite un software di failover automatizzato come SafeKit, che rileva i guasti e riavvia le applicazioni su un nodo secondario in pochi secondi o minuti.

### Cosa è più importante: RPO o RTO? {#importance-rpo-vs-rto}

Nessuno dei due è intrinsecamente più importante; svolgono ruoli diversi. **RPO (Recovery Point Objective)** si concentra sulla perdita di dati, ovvero quanti dati ci si può permettere di perdere. **RTO (Recovery Time Objective)** si concentra sui tempi di inattività, ovvero quanto velocemente è necessario tornare online. Per le applicazioni mission-critical, entrambi devono essere ridotti al minimo.

### In che modo RPO e RTO differiscono tra HA a livello di applicazione e HA a livello di VM con SafeKit? {#safekit-application-vs-vm-level}

Sebbene entrambi garantiscano un **RPO di 0** tramite replica sincrona, differiscono nel tempo di ripristino:

  * **Livello applicazione:** RTO più rapido (circa 1 minuto) perché solo i servizi dell’applicazione si riavviano su un sistema operativo già in esecuzione. Rileva anche arresti anomali specifici di software/processi.
  * **Livello VM:** RTO più elevato perché l’intera macchina virtuale deve essere riavviata sull’host secondario. Sebbene sia indipendente dall’applicazione, manca di un monitoraggio granulare dei processi dell’applicazione stessa.


### Qual è la differenza tra le soluzioni HA e quelle di backup in termini di RTO? {#ha-vs-backup-rto}

L’alta disponibilità (HA) in genere offre un RTO molto più basso (da secondi a minuti) perché gestisce automaticamente i guasti locali. Il disaster recovery (DR) con soluzioni di backup di solito ha un RTO più elevato (da ore a giorni) perché comporta il recupero di dati e servizi in un sito geograficamente distante dopo una grave catastrofe.

### Come posso ottenere i migliori valori RPO e RTO tra siti remoti? {#rpo-rto-between-remote-sites}

Il raggiungimento di un **RPO pari a zero** e **RTO quasi pari a zero** in siti remoti richiede una combinazione di **replica sincrona** e una **LAN estesa (VLAN estesa)**:

  * **LAN estesa/VLAN estesa:** estendendo la stessa subnet (Layer 2) su due data center, è possibile spostare un’applicazione dal sito A al sito B senza modificarne l’indirizzo IP, evitando complessi aggiornamenti DNS.
  * **La soluzione SafeKit:** SafeKit sfrutta questo aspetto fornendo un **IP virtuale (VIP) definito dal software** che si sposta tra i siti. Reindirizza istantaneamente il traffico al sito secondario utilizzando ARP gratuito (GARP).


Ciò garantisce un **RPO = 0** (mirroring in tempo reale) e un **RTO minimo** (failover in circa 1 minuto) senza intervento umano.

### Perché la combinazione di alta disponibilità e backup è essenziale per ottimizzare RPO e RTO? {#combining-ha-and-backup-for-rpo-rto}

La combinazione di alta disponibilità (HA) con una soluzione di backup è l’unico modo per ottenere una strategia di ripristino che offra il meglio di entrambi i mondi. Sebbene vengano spesso discussi insieme, risolvono parti diverse dell’equazione RPO/RTO:

  * **Alta disponibilità (tramite SafeKit):** offre un RTO quasi nullo e un RPO pari a zero in caso di guasti hardware o software. Grazie alla replica sincrona in tempo reale, il server secondario è sempre aggiornato. Se il server primario si guasta, il servizio si riavvia immediatamente sul server secondario senza perdita di dati.
  * **Soluzioni di backup:** i backup proteggono da problemi di integrità dei dati (come ransomware o eliminazione accidentale). Poiché l’HA replica le modifiche istantaneamente, replicherà "fedelmente" un virus o un record di database eliminato sul server di standby. Un backup consente di "tornare indietro nel tempo" a un punto precedente al verificarsi del danno.
  * **L’approccio ibrido:** per la massima resilienza, le organizzazioni utilizzano **un’architettura ibrida a 3 nodi**. Questa include un cluster locale a 2 nodi con replica sincrona per HA immediata e una terza copia remota (asincrona) per il ripristino di emergenza. Questa difesa a più livelli garantisce una copia "live" per il ripristino istantaneo e una copia "storica" per la sicurezza dei dati.



{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}