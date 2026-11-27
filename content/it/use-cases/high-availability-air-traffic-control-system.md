---
title: "Elevata disponibilità per i sistemi di controllo del traffico aereo"
canonical: "https://safekit.eviden.com/it/use-cases/high-availability-air-traffic-control-system/"
description: "Alta disponibilità per il controllo del traffico aereo: ADB SafeGate usa SafeKit negli aeroporti di tutto il mondo per replica in tempo reale e failover automatico su Windows."
category: "use-cases"
lang: "it"
topics: "Sistemi di controllo del traffico aereo, Perché il controllo del traffico aereo è fondamentale?, Come SafeKit protegge il controllo del traffico aereo, Implementazione nel mondo reale presso ADB SafeGate"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-17.22 | Translation LLM | 40 expressions"
image: "/wp-content/uploads/2026/05/safekit-atc-512-512.jpg"
schemaType: "Article"
schemaMentions: ["ADB SafeGate"]
---

# Elevata disponibilità per i sistemi di controllo del traffico aereo {#high-availability-for-air-traffic-control-systems}

## Sistemi di controllo del traffico aereo {#air-traffic-control-systems}

I controllori del traffico aereo hanno uno dei compiti più complessi e stressanti che si possano immaginare. Oggi lo spazio aereo è affollato e il traffico aereo è intenso. Un singolo errore nella direzione degli aeromobili può avere conseguenze catastrofiche. I moderni sistemi di controllo del traffico aereo dipendono da sofisticate applicazioni software. Queste applicazioni aiutano i controllori a prendere decisioni critiche.

ADB SafeGate è un fornitore globale di soluzioni per l’airside, tra cui il software per le torri di controllo del traffico aereo. Le sue soluzioni sono adottate in oltre 3.000 aeroporti in più di 175 paesi e gestiscono dati critici relativi alle operazioni aeroportuali, tra cui:

  * Pianificazione dei voli e informazioni sul flusso del traffico aereo
  * Dati meteorologici
  * Stato dell’illuminazione e del controllo dell’aeroporto
  * Operazioni di piazzale e di attracco

## Perché il controllo del traffico aereo è fondamentale? {#why-is-air-traffic-control-critical}

Il controllo del traffico aereo è una delle attività più critiche che esistano. Qualsiasi guasto del sistema in un momento critico può compromettere il processo decisionale del controllore e la sicurezza dei passeggeri. I controllori devono avere piena fiducia nei sistemi che li supportano.

Tuttavia, la migliore applicazione è inutile se un server, un sistema operativo o un software si guastano in un momento critico. ADB SafeGate ha riconosciuto la necessità di garantire la disponibilità del suo ambiente critico e ha deciso di studiare come garantire un uptime 24 ore su 24, 7 giorni su 7 per le sue applicazioni.

**La sfida**: rendere disponibile una suite completa di applicazioni per i controllori del traffico aereo 24 ore su 24, 7 giorni su 7. Questo è un requisito obbligatorio per il controllo del traffico aereo.

## Come SafeKit protegge il controllo del traffico aereo {#safekit-high-availability-for-atc}

ADB SafeGate ha scelto SafeKit, la soluzione software ad alta disponibilità di Eviden, perché offre:

  * **Disponibilità 24 ore su 24, 7 giorni su 7**: le applicazioni critiche sono sempre disponibili
  * **Server delle applicazioni ridondanti**: i server possono essere collocati in sale macchine separate per proteggerli da eventuali disastri
  * **Server standard**: nessun disco condiviso e nessuna infrastruttura SAN complessa
  * **Replicazione dei file in tempo reale**: nessuna perdita di dati (RPO = 0)
  * **Recupero automatico**: non è necessaria alcuna azione manuale in caso di guasto

Di conseguenza, i controllori del traffico aereo che utilizzano il software ADB SafeGate possono concentrarsi interamente sul loro complesso compito. Possono essere certi che i sistemi che li supportano sono resilienti e sempre disponibili.

## Implementazione nel mondo reale presso ADB SafeGate {#real-world-implementation-at-adb-safegate}

### Approccio di implementazione {#deployment-approach}

In un aeroporto, ADB SafeGate installa le sue applicazioni e SafeKit su due server Windows standard. I server non hanno dischi condivisi. Le applicazioni beneficiano della replica dei file in tempo reale e del ripristino automatico in caso di guasto.

### Come funziona in pratica {#how-it-works-in-practice}

**Fase 1: Funzionamento normale**

L’applicazione viene eseguita solo sul server 1, all’interno del modulo mirror SafeKit. I client si connettono automaticamente al server 1 tramite un indirizzo IP virtuale primario/secondario. Vengono replicati solo i file modificati dall’applicazione, che vengono inviati al server 2 in tempo reale sulla rete. Ciò riduce al minimo il traffico di rete.

Non ci sono prerequisiti sull’organizzazione del server. I file possono trovarsi su un disco RAID5 nel server 1 e su un disco semplice nel server 2.

Le scritture vengono replicate in modo sincrono su entrambi i server, quindi nessun dato viene perso in caso di errore. I dati confermati da un’applicazione transazionale sono automaticamente disponibili sul server secondario. Un esempio è PostgreSQL. Questa garanzia non è possibile con la replica asincrona.

**Fase 2: Failover in caso di errore**

Se il server 1 si guasta, SafeKit esegue automaticamente il failover sul server 2. Il tempo di failover è pari al tempo di rilevamento del guasto più il tempo di riavvio dell’applicazione. Il timeout di rilevamento predefinito è di 30 secondi. Non vi è alcun ritardo nel ripristino del file system, a differenza delle soluzioni di replica del disco.

**Fase 3: risincronizzazione dopo un errore**

Quando il server 1 si riavvia, il modulo mirror risincronizza automaticamente i file.

Solo i file modificati sul server 2 durante il tempo di inattività del server 1 vengono risincronizzati. Le applicazioni continuano a essere eseguite sul server 2 durante la risincronizzazione. Dopo la risincronizzazione, il sistema è nuovamente altamente disponibile e protetto.

L’amministratore potrebbe voler che l’applicazione venga eseguita sul server 1 in via prioritaria. In questo caso, un failback al server 1 può essere attivato manualmente con un singolo clic. Può anche essere automatico.

### Vantaggi principali per gli aeroporti {#key-benefits-for-airports}

  * **Nessun hardware speciale**: sono sufficienti i server Windows standard
  * **Nessun archivio condiviso**: niente costose infrastrutture SAN e niente complessità dei dischi condivisi
  * **Resistenza ai disastri**: i server possono trovarsi in sale macchine separate con alimentatori separati
  * **Nessuna perdita di dati**: la replica sincrona garantisce RPO = 0 per tutte le transazioni confermate
  * **Recupero automatico**: non è necessaria alcuna azione manuale in caso di guasto
  * **Meno stress**: i controllori del traffico aereo possono fidarsi dei sistemi che supportano le loro decisioni critiche
  * **Affidabilità globale**: implementato con successo negli aeroporti di molti Paesi e continenti

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}
