---
title: "Combinazione di alta disponibilità SafeKit con backup di ripristino di emergenza"
canonical: "https://safekit.eviden.com/it/best-practises/high-availability-disaster-recovery-hadr/"
description: "Crea una strategia HA/DR resiliente combinando SafeKit per la replica sincrona (RPO=0) con il backup asincrono per il ripristino di emergenza fuori sede. Garantisci la disponibilità delle applicazioni 24 ore su 24, 7 giorni su 7 e l'integrità dei dati su Windows e Linux con questo approccio a doppio livello."
category: "best-practises"
lang: "it"
topics: "Replica sincrona SafeKit per HA vs. replica di backup asincrona per DR, Indice, HADR sincrono: zero perdita di dati su reti veloci (LAN/VLAN), HADR asincrono: ripristino di emergenza su reti lente (WAN), Come combinare HADR e backup per la resilienza totale del sistema, Confronto tra architetture HADR: reti veloci vs. lente, Guida video: come implementare HADR con SafeKit , 🔍 Hub di navigazione per l'alta disponibilità SafeKit"
---

# Combinazione dell'alta disponibilità SafeKit con i backup di ripristino di emergenza {#combining-safekit-high-availability-with-disaster-recovery-backups}

## Replica sincrona SafeKit per HA vs. replica di backup asincrona per DR {#synchronous-safekit-replication-for-ha-vs-asynchronous-backup-replication-for-dr}

SafeKit offre un'architettura ** SafeKit ** ** ** applicazioni critiche rimangano attive e coerenti tra due siti ridondanti.

Per ovviare ai limiti delle reti WAN a bassa larghezza di banda, SafeKit è progettato per essere abbinato alle soluzioni di backup e ripristino ** ** . Ciò consente alle organizzazioni di mantenere un funzionamento continuo 24 ore su 24, 7 giorni su 7, grazie al failover automatico, proteggendo al contempo i dati storici per il ripristino di emergenza remoto.

Di conseguenza, l'ambiente è protetto da guasti hardware o software tramite SafeKit e messo al sicuro da errori logici e minacce informatiche come il ransomware grazie alla soluzione di backup.


![ Diagramma tecnico che mostra perché l'alta disponibilità ( SafeKit ) e i backup sono complementari: SafeKit gestisce il failover hardware/software tramite replica sincrona, mentre il backup asincrono protegge da ransomware ed errori logici. ](/wp-content/uploads/2026/01/safekit-backup-3-nodes-5-1024.jpg "w:512")

** HA vs Backup: Combinazione di replica sincrona SafeKit con DR asincrono **

## Indice {#table-of-contents}

  * [ HADR sincrono: zero perdita di dati su reti veloci (LAN/VLAN) ](#synchronous-hadr-fast-network)
  * [ HADR asincrono: ripristino di emergenza su reti lente (WAN) ](#asynchronous-hadr-slow-network)
  * [ Come combinare HADR e backup per una resilienza totale del sistema ](#hadr-resilience-strategy)
  * [ Confronto delle architetture HADR: reti veloci vs. reti lente ](#hadr-architectures-comparison)
  * Guida video [ : Come implementare HADR con SafeKit ](#videoguide-hadr-safekit)
  * [ 🔍 SafeKit Hub di navigazione ad alta disponibilità ](#hub)



{{%  insert-safekit-4-buttons-it  %}}
 

## HADR sincrono: zero perdita di dati su reti veloci (LAN/VLAN) {#synchronous-hadr-fast-network}

### Come implementare HADR su una rete veloce? {#hadr-fast-network-architecture}


Architettura ![ che combina alta disponibilità e ripristino di emergenza (HADR) senza dischi condivisi ](/wp-content/uploads/2023/02/remote-datacenters.png "w:256")


Per implementare HADR su una rete veloce, è necessario distribuire due nodi in siti remoti per garantire contemporaneamente alta disponibilità e ripristino di emergenza. Questa configurazione assicura che l'applicazione rimanga disponibile anche in caso di guasto di un intero sito, senza la complessità di un'infrastruttura di storage condivisa.

### Perché utilizzare una soluzione HADR senza SAN per reti veloci? {#sanless-hadr-solution}

Una soluzione SANless come SafeKit è essenziale perché replica i dati in modo sincrono e in tempo reale tra due nodi senza dischi condivisi. Poiché la replica sincrona garantisce l'assenza di perdita di dati (RPO=0), il software può attivare un failover automatico dell'applicazione all'istante in caso di guasto hardware o software.

### Quali sono i requisiti di rete per HADR sincrono? {#extended-lan-vlan-requirements}

L'HADR sincrono richiede una LAN estesa o una VLAN estesa per tre motivi fondamentali:

  * Failover IP virtuale ** : ** È necessaria una singola sottorete per eseguire automaticamente il failover dell'indirizzo IP virtuale [ ](</it/best-practises/how-a-virtual-ip-address-works/>) tra i nodi.
  * ** Bassa latenza: ** [ La replica sincrona ](</it/best-practises/synchronous-replication-vs-asynchronous-replication/>) senza perdita di dati richiede in genere un tempo di andata e ritorno di rete inferiore a 5 ms.
  * ** Larghezza di banda elevata: ** È necessaria una connessione di 1 Gb/s o superiore per garantire una rapida risincronizzazione dei dati durante un failback.


## HADR asincrono: ripristino di emergenza su reti lente (WAN) {#asynchronous-hadr-slow-network}

### Come implementare HADR su una rete lenta? {#hadr-slow-network-architecture}


![ Architettura HADR che separa l'alta disponibilità dal ripristino di emergenza ](/wp-content/uploads/2023/03/hadr-slow-network-1.png "w:256")


Per implementare l'HADR su una rete lenta (WAN), l'architettura in genere separa l'alta disponibilità ** ** ) dal ripristino di emergenza ** ** In questo scenario, due nodi vengono distribuiti nel sito primario per la ridondanza locale, mentre una strategia di backup o replica asincrona separata viene utilizzata per proteggere i dati in un sito remoto distante.

### Qual è la migliore soluzione HADR per connessioni a bassa larghezza di banda? {#sanless-ha-with-remote-dr}

La soluzione ottimale prevede l'implementazione ** SafeKit ** presso il sito primario per garantire l'alta disponibilità locale tramite replica sincrona in tempo reale e failover automatico. Per il sito di disaster recovery, i dati vengono protetti tramite replica asincrona o backup pianificati attraverso la rete a bassa velocità, garantendo il mantenimento del tempo di attività locale senza colli di bottiglia dovuti alla latenza WAN. Per realizzare questa architettura, è necessaria una soluzione di backup dedicata ** ** (diversa da SafeKit ), per gestire il trasferimento e il ripristino dei dati nel sito remoto. 

### Come funziona il failover con un sito di ripristino di emergenza remoto? {#dr-site-failover-process}

Poiché la replica asincrona su una rete lenta comporta una potenziale perdita di dati (RPO > 0), il processo di failover verso un sito di ripristino di emergenza è in genere manuale e gestito da un amministratore:

  * ** Ripristino dati: ** I backup vengono ripristinati su server secondari nel sito di disaster recovery. Soluzioni moderne come ** Veeam ** vengono spesso utilizzate per ripristinare rapidamente le macchine virtuali (VM) e ridurre i tempi di ripristino.
  * Reindirizzamento DNS ** : il traffico ** viene reindirizzato al sito di ripristino d'emergenza a livello DNS. Il tempo di ripristino dipende dai timeout della cache DNS (TTL) e alcune applicazioni client potrebbero richiedere un riavvio per acquisire il nuovo indirizzo IP.
  * Decisione manuale ** : ** Un amministratore deve verificare l'integrità dei dati nel sito remoto prima di autorizzare il passaggio al data center secondario.


## Come combinare HADR e backup per una resilienza totale del sistema {#hadr-resilience-strategy}

### Confronto tra alta disponibilità e backup dei dati {#ha-vs-backup-comparison}


![ SafeKit logo del software ad alta disponibilità ](/wp-content/uploads/2026/04/safekit-icon-512x512-1.png "w:64")

 

Icona della strategia di backup dei dati ![ ](/wp-content/uploads/2026/01/backup-icon.png "w:64")


Sebbene entrambe siano fondamentali per la protezione dei dati, le soluzioni ** ** ** ** rischi diversi. ** ** basata su SafeKit , fornisce un meccanismo di failover "live" per mantenere le applicazioni accessibili durante interruzioni del server o guasti hardware. Al contrario, una soluzione di Backup ** ** funge da archivio "storico". Mentre l'HA garantisce una disponibilità del sistema del 99,99% replicando i dati in tempo reale, il backup si concentra sull'integrità dei dati, fornendo i punti di ripristino necessari per recuperare da errori logici, cancellazioni accidentali o attacchi ransomware.

### L'alta disponibilità può sostituire una strategia di backup? {#ha-vs-backup-ransomware}

No, l'alta disponibilità e i backup sono complementari, non intercambiabili. Mentre ** SafeKit ** garantisce ** la continuità operativa ** mantenendo le applicazioni in esecuzione durante un guasto hardware, non protegge da errori logici, cancellazioni accidentali o attacchi ransomware. Ad esempio, poiché la replica in tempo reale rispecchia istantaneamente ogni modifica, un attacco ransomware sul nodo primario verrà immediatamente duplicato sul nodo secondario. Per ripristinare i dati da tali minacce informatiche o cancellazioni accidentali, è necessaria una soluzione di backup ** ** con una solida politica di conservazione. Ciò consente di "ripristinare" l'ambiente a uno stato integro precedente al verificarsi del danneggiamento.

### Ottimizzazione di RTO e RPO: la sinergia tra HA e backup {#ha-backup-rpo-rto}

Per costruire un'infrastruttura veramente resiliente, è necessario integrare sia l'alta disponibilità che il backup in una strategia unificata. Queste due tecnologie affrontano diverse dimensioni dell'equazione [ (Recovery Time Objective) e RPO (Recovery Point Objective) ](</it/best-practises/what-is-rpo-and-rto-with-examples/>) : 

  * ** Alta disponibilità (tramite SafeKit ): ** Obiettivi ** Ripristino istantaneo ** . Mantenendo una versione live e sincrona mirror del tuo ambiente, SafeKit raggiunge un RTO prossimo allo zero e un RPO pari a zero. Se un server si guasta, l'applicazione riprende immediatamente sul nodo secondario, garantendo nessuna interruzione del servizio o perdita di dati durante la transizione.
  * Soluzioni di backup ** : Target ** Resilienza dei dati ** ** . Mentre l'alta disponibilità (HA) mantiene il servizio "attivo", il backup crea una cronologia "immutabile". È la soluzione di ripiego nel caso in cui i dati attivi vengano compromessi, consentendo di ripristinare una versione pulita del database da un punto specifico nel tempo, precedente a un virus o a una cancellazione accidentale.


## Confronto tra architetture HADR: reti veloci vs. reti lente {#hadr-architectures-comparison}

Criteri | Rete veloce (LAN/VLAN) | Rete lenta (WAN)  
---|---|---  
Ambito primario | Ridondanza locale e alta disponibilità | Ripristino di emergenza sito-sito  
Caso d'uso | Stesso data center o campus | Data center remoti o regioni cloud  
Tipo di replica | Sincrona (in tempo reale) | Asincrona / Backup  
RPO (Perdita di dati) | Zero (RPO = 0) | Potenziale perdita di dati (RPO > 0)  
Processo di failover | Automatico | Manuale (decisione dell'amministratore)  
Reindirizzamento del traffico | Indirizzo IP virtuale (VIP) | Livello DNS (dipendente da TTL)  
Requisiti di latenza | Bassa (tipicamente < 5 ms) | Supporta latenza elevata  
Obiettivo di ripristino primario | Continuità operativa immediata | Sicurezza e conservazione dei dati  
  
## Video guida: Come implementare HADR con SafeKit {#videoguide-hadr-safekit}

###  Come implementare HADR con SafeKit : replica sincrona e failover {#how-to-implement-hadr-with-safekit-synchronous-replication--failover}

Scopri come combinare l'alta disponibilità (HA) ** ** e il ripristino di emergenza (DR) ** ** in un'unica strategia HADR utilizzando SafeKit . Questa guida video illustra l'architettura necessaria per garantire il 100% di uptime delle applicazioni senza la necessità di dischi condivisi.

### Video dei momenti salienti {#video-highlights}

  1. 🎬 [ Introduzione a SafeKit HADR su VLAN estese ](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=0s>) (1:06)
  2. 🎬 [ Come funzionano il mirroring sincrono e il doppio riconoscimento (1:41) ](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=65s>)
  3. 🎬 Meccanismi di failover [ : ARP gratuito (GARP) e IP virtuale ](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=166s>) (2:10)
  4. 🎬 [ Progettazione per WAN lente: strategie HA vs. backup ](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=296s>) (2:45)


### Video SafeKit : Come implementare l'alta disponibilità e il ripristino di emergenza (HADR) con SafeKit (7:40) {#safekit-video-how-to-implement-high-availability-and-disaster-recovery-hadr-with-safekit-740}

&lt;br /&gt; 


{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}