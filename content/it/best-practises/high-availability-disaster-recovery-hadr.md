---
title: "Combinare l’alta disponibilità SafeKit con i backup per il ripristino di emergenza"
canonical: "https://safekit.eviden.com/it/best-practises/high-availability-disaster-recovery-hadr/"
description: "Combina l’alta disponibilità SafeKit (replica sincrona, RPO 0) con backup asincroni per il disaster recovery off-site su Windows e Linux."
category: "best-practises"
lang: "it"
topics: "Replica sincrona SafeKit per HA vs. replica asincrona di backup per DR, Indice, HADR sincrono: perdita di dati pari a zero su reti veloci (LAN/VLAN), HADR asincrono: disaster recovery su reti lente (WAN), Come combinare HADR e backup per una resilienza totale del sistema, Confronto tra architetture HADR: reti veloci e lente, Guida video: come implementare HADR con SafeKit, 🔍 Esplora SafeKit"
translation: "translate_md 2026-11-19.2 | glossaire 2026-11-19.28 | Translation LLM | 41 expressions"
image: "/wp-content/uploads/2026/01/safekit-backup-3-nodes-5-1024.jpg"
schemaType: "TechArticle"
---

# Combinare l’alta disponibilità SafeKit con i backup per il ripristino di emergenza {#combining-safekit-high-availability-with-disaster-recovery-backups}

## Replica sincrona SafeKit per HA vs. replica asincrona di backup per DR {#synchronous-safekit-replication-for-ha-vs-asynchronous-backup-replication-for-dr}

SafeKit fornisce **un’architettura flessibile di alta disponibilità e disaster recovery (HADR)** basata su software che elimina la necessità di costosi storage condivisi. Implementando **la replica sincrona** su una VLAN estesa tra il server 1 e il server 2, SafeKit garantisce che le applicazioni critiche rimangano "attive" e coerenti tra due siti ridondanti.

Per affrontare i vincoli delle WAN a larghezza di banda inferiore, SafeKit è progettato per essere abbinato a **soluzioni di backup e ripristino**. Ciò consente alle organizzazioni di mantenere l’operatività 24 ore su 24, 7 giorni su 7, attraverso il failover automatico, proteggendo al contempo i dati storici per il ripristino di emergenza off-site.

Di conseguenza, l’ambiente è protetto da guasti hardware o software tramite SafeKit e protetto da errori logici e minacce informatiche come il ransomware attraverso la soluzione di backup.


![Un diagramma tecnico che mostra perché l’alta disponibilità (SafeKit) e i backup sono complementari: SafeKit gestisce il failover hardware/software tramite replica sincrona, mentre il backup asincrono protegge da ransomware ed errori logici.](/wp-content/uploads/2026/01/safekit-backup-3-nodes-5-1024.jpg "w:512")

**Elevata disponibilità con SafeKit e ripristino di emergenza con i backup**

## Indice {#table-of-contents}

  * [HADR sincrono: perdita di dati pari a zero su reti veloci (LAN/VLAN)](#synchronous-hadr-fast-network)
  * [HADR asincrono: disaster recovery su reti lente (WAN)](#asynchronous-hadr-slow-network)
  * [Come combinare HADR e backup per una resilienza totale del sistema](#hadr-resilience-strategy)
  * [Confronto tra architetture HADR: reti veloci e lente](#hadr-architectures-comparison)
  * [Guida video: come implementare HADR con SafeKit](#videoguide-hadr-safekit)
  * [🔍 Esplora SafeKit](#hub)



{{%  insert-safekit-4-buttons-it  %}}
 

## HADR sincrono: perdita di dati pari a zero su reti veloci (LAN/VLAN) {#synchronous-hadr-fast-network}

### Come implementare HADR su una rete veloce? {#hadr-fast-network-architecture}


![Architettura che combina alta disponibilità e ripristino di emergenza (HADR) senza dischi condivisi](/wp-content/uploads/2023/02/remote-datacenters.png "w:256")


Per implementare HADR su una rete veloce, distribuire due nodi in siti remoti per fornire contemporaneamente alta disponibilità e disaster recovery. Questa configurazione garantisce che l’applicazione rimanga disponibile anche in caso di guasto di un intero sito, senza la complessità di un’infrastruttura di archiviazione condivisa.

### Perché utilizzare una soluzione HADR SANless per reti veloci? {#sanless-hadr-solution}

Una soluzione SANless come SafeKit è essenziale perché replica i dati in modo sincrono e in tempo reale tra due nodi senza dischi condivisi. Poiché la replica sincrona garantisce una perdita di dati pari a zero (RPO = 0), il software può attivare istantaneamente un failover automatico dell’applicazione in caso di errore hardware o software.

### Quali sono i requisiti di rete per HADR sincrono? {#extended-lan-vlan-requirements}

L’HADR sincrono richiede una LAN estesa o una VLAN estesa per tre motivi fondamentali:

  * **Failover IP virtuale:** è richiesta una singola subnet. L’[indirizzo IP virtuale](</it/best-practises/how-a-virtual-ip-address-works/>) può quindi spostarsi automaticamente tra i nodi.
  * **Bassa latenza:** [la replica sincrona](</it/best-practises/synchronous-replication-vs-asynchronous-replication/>) senza perdita di dati richiede in genere un tempo di andata e ritorno della rete inferiore a 5 ms.
  * **Elevata larghezza di banda:** è necessaria una connessione da 1 Gb/s o superiore per garantire una rapida risincronizzazione dei dati durante un failback.


## HADR asincrono: disaster recovery su reti lente (WAN) {#asynchronous-hadr-slow-network}

### Come implementare HADR su una rete lenta? {#hadr-slow-network-architecture}


![Architettura HADR che separa l’alta disponibilità dal ripristino di emergenza](/wp-content/uploads/2023/03/hadr-slow-network-1.png "w:256")


Per implementare HADR su una rete lenta (WAN), l’architettura separa in genere **l’alta disponibilità** dal **ripristino di emergenza**. In questo scenario, due nodi vengono distribuiti nel sito primario per la ridondanza locale, mentre una strategia di backup o di replica asincrona separata viene utilizzata per proteggere i dati in un sito remoto distante.

### Qual è la migliore soluzione HADR per connessioni a bassa larghezza di banda? {#sanless-ha-with-remote-dr}

La soluzione ottimale prevede l’implementazione **SafeKit** nel sito primario per l’alta disponibilità locale, utilizzando la replica sincrona in tempo reale e il failover automatico. Per il sito di disaster recovery, i dati sono protetti tramite replica asincrona o backup pianificati attraverso la rete lenta, garantendo il mantenimento dell’uptime locale senza essere limitati dalla latenza della WAN. Per realizzare questa architettura, è necessaria una **soluzione di backup** dedicata (diversa da SafeKit) per gestire il trasferimento e il ripristino dei dati nel sito remoto. 

### Come funziona il failover con un sito di disaster recovery remoto? {#dr-site-failover-process}

Poiché la replica asincrona su una rete lenta comporta una potenziale perdita di dati (RPO > 0), il processo di failover verso un sito di disaster recovery è in genere manuale e gestito da un amministratore:

  * **Ripristino dei dati:** i backup vengono ripristinati sui server secondari nel sito di disaster recovery. Le soluzioni moderne ripristinano rapidamente le macchine virtuali (VM) per ridurre i tempi di ripristino. Un esempio è **Veeam**.
  * **Reindirizzamento DNS:** il traffico viene reindirizzato al sito DR a livello DNS. Il tempo di ripristino dipende dai timeout della cache DNS (TTL) e alcune applicazioni client potrebbero richiedere un riavvio per acquisire il nuovo indirizzo IP.
  * **Decisione manuale:** un amministratore deve verificare l’integrità dei dati nel sito remoto prima di autorizzare il passaggio al data center secondario.


## Come combinare HADR e backup per una resilienza totale del sistema {#hadr-resilience-strategy}

### Confronto tra alta disponibilità e backup dei dati {#ha-vs-backup-comparison}


![Logo del software di alta disponibilità SafeKit](/wp-content/uploads/2026/04/safekit-icon-512x512-1.png "w:64")

 

![Icona della strategia di backup dei dati](/wp-content/uploads/2026/01/backup-icon.png "w:64")


Sebbene entrambi siano fondamentali per la protezione dei dati, **l’alta disponibilità (HA)** e **le soluzioni di backup** si rivolgono a rischi diversi. **L’alta disponibilità**, basata su SafeKit, fornisce un meccanismo di failover "live" per mantenere le applicazioni accessibili durante le interruzioni del server o i guasti hardware. Al contrario, una **soluzione di backup** funge da archivio "storico". Mentre l’HA garantisce una disponibilità del sistema del 99,99% replicando i dati in tempo reale, il backup si concentra sull’integrità dei dati, fornendo i punti di ripristino necessari per recuperare da errori logici, eliminazioni accidentali o attacchi ransomware.

### L’alta disponibilità è un sostituto di una strategia di backup? {#ha-vs-backup-ransomware}

No, l’alta disponibilità e i backup sono complementari, non interscambiabili. Sebbene **SafeKit** garantisca **la continuità aziendale** mantenendo le applicazioni in esecuzione durante un guasto hardware, non protegge da errori logici, eliminazioni accidentali o attacchi ransomware. Ad esempio, poiché la replica in tempo reale rispecchia ogni modifica istantaneamente, un attacco ransomware sul nodo primario verrà immediatamente duplicato sul nodo secondario. Per recuperare da tali minacce informatiche o eliminazioni accidentali, è necessaria una **soluzione di backup** dedicata con una solida politica di conservazione. Ciò consente di "riavvolgere" l’ambiente a uno stato integro precedente al verificarsi della corruzione.

### Ottimizzazione RTO e RPO: la sinergia tra HA e backup {#ha-backup-rpo-rto}

Per creare un’infrastruttura veramente resiliente, è necessario integrare sia l’alta disponibilità che il backup in una strategia unificata. Queste due tecnologie affrontano diverse dimensioni dell’obiettivo di tempo di ripristino (RTO) e dell’obiettivo di punto di ripristino (RPO). Per maggiori dettagli, consultare [RTO e RPO con esempi](</it/best-practises/what-is-rpo-and-rto-with-examples/>).

  * **Alta disponibilità (tramite SafeKit):** il suo obiettivo è **il ripristino istantaneo**. SafeKit mantiene una copia attiva e sincrona dell’ambiente. Il suo RTO è vicino allo zero. Il suo RPO è zero. Se un server si guasta, l’applicazione riprende immediatamente sul nodo secondario, garantendo l’assenza di interruzioni del servizio o perdita di dati durante la transizione.
  * **Soluzioni di backup:** il loro obiettivo è **la resilienza dei dati**. Mentre l’alta disponibilità mantiene il servizio "attivo", il backup crea una cronologia "immutabile". Il backup è la tua rete di sicurezza quando i dati attivi stessi sono compromessi. Ti consente di ripristinare una versione pulita del tuo database da un punto specifico nel tempo, prima che si verificasse un virus o un’eliminazione accidentale.


## Confronto tra architetture HADR: reti veloci e lente {#hadr-architectures-comparison}

Criteri | Rete veloce (LAN/VLAN) | Rete lenta (WAN)  
---|---|---  
Ambito principale | Ridondanza locale e alta disponibilità | Disaster recovery da sito a sito  
Caso d’uso | Stesso data center o campus | Centri dati remoti o regioni cloud  
Tipo di replica | Sincrono (in tempo reale) | Asincrono/di backup  
RPO (perdita di dati) | Zero (RPO = 0) | Potenziale perdita di dati (RPO > 0)  
Processo di failover | Automatico | Manuale (decisione Admin)  
Deviazione del traffico | Indirizzo IP virtuale (VIP) | Livello DNS (dipendente dal TTL)  
Requisito di latenza | Basso (tipicamente < 5 ms) | Supporta un’elevata latenza  
Obiettivo di recupero primario | Continuità operativa immediata | Sicurezza e conservazione dei dati  
  
## Guida video: come implementare HADR con SafeKit {#videoguide-hadr-safekit}

###  Come implementare HADR con SafeKit: replica sincrona e failover {#how-to-implement-hadr-with-safekit-synchronous-replication--failover}

Scopri come combinare **l’alta disponibilità (HA)** e **il ripristino di emergenza (DR)** in un’unica strategia HADR utilizzando SafeKit. Questa guida video illustra l’architettura necessaria per un’operatività del 100% delle applicazioni senza la necessità di dischi condivisi.

### Momenti salienti del video {#video-highlights}

  1. 🎬 [Introduzione a SafeKit HADR su VLAN estese](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=0s>) (1:06)
  2. 🎬 [Come funzionano il mirroring sincrono e il doppio riconoscimento](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=65s>) (1:41)
  3. 🎬 [Meccanismi di failover: ARP gratuito (GARP) e IP virtuale](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=166s>) (2:10)
  4. 🎬 [Progettare per WAN lente: strategie HA e di backup](<https://www.youtube.com/watch?v=g5zcTjiY7T4&t=296s>) (2:45)


### Video SafeKit: come implementare l’alta disponibilità e il ripristino di emergenza (HADR) con SafeKit (7:40) {#safekit-video-how-to-implement-high-availability-and-disaster-recovery-hadr-with-safekit-740}



{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}