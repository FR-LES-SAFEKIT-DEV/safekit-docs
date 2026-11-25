---
title: "Elevata disponibilità per il trasporto pubblico: sala di controllo centralizzata"
canonical: "https://safekit.eviden.com/it/use-cases/high-availability-public-transport-centralized-control-room/"
description: "SafeKit garantisce un’elevata disponibilità per le sale di controllo dei trasporti pubblici. RATP ha implementato SafeKit per la linea 1 della metropolitana di Parigi. Questa linea è completamente automatizzata e senza conducente. SafeKit fornisce bilanciamento del carico, failover automatico e replica di dati in tempo reale. Non necessita di SAN. Lo stesso software funziona su server Windows e Linux."
category: "use-cases"
lang: "it"
topics: "Sale di controllo del trasporto pubblico, Perché la sala di controllo è fondamentale?, Alta disponibilità SafeKit per il trasporto pubblico, Implementazione nel mondo reale presso RATP, 🔍 Esplora SafeKit"
translation: "translate_md 2026-11-17.3 | glossaire 2026-11-17.30 | Translation LLM | 40 expressions"
image: "/wp-content/uploads/2026/05/safekit-occ-512-512.jpg"
---

# Elevata disponibilità per il trasporto pubblico: sala di controllo centralizzata {#high-availability-for-public-transport-centralized-control-room}

## Sale di controllo del trasporto pubblico {#public-transport-control-rooms}

Una sala di controllo centralizzata è il centro nevralgico dei moderni sistemi di trasporto pubblico. La sala di controllo monitora intere linee della metropolitana, gestisce le operazioni automatizzate e garantisce la sicurezza dei passeggeri. Per i sistemi di metropolitana, le linee della metropolitana automatizzate e le reti di autobus, la sala di controllo deve funzionare 24 ore su 24, 7 giorni su 7, senza interruzioni.

RATP gestisce la metropolitana di Parigi. Trasporta più di 10 milioni di passeggeri ogni giorno. La linea 1 della metropolitana di Parigi è completamente automatizzata e senza conducente. Questo rende il ruolo della sala di controllo ancora più critico.

## Perché la sala di controllo è fondamentale? {#why-is-a-centralized-control-room-critical}

Gli operatori di una linea della metropolitana devono reagire immediatamente al minimo incidente. Un guasto informatico non deve mai impedire agli operatori di visualizzare l’attività della linea.

I compiti principali degli operatori della sala di controllo sono:

  * Monitoraggio dei movimenti dei treni sui binari
  * Gestione degli incidenti rilevati automaticamente dalle telecamere
  * Gestione dei sistemi di comunicazione e degli annunci pubblici
  * Supervisione delle operazioni di sicurezza e informazione ai passeggeri

Un guasto di sistema nella sala di controllo ha un impatto diretto sulla sicurezza dei passeggeri e sulla continuità del servizio. Tutte le applicazioni critiche nella sala di controllo devono essere protette da un’elevata disponibilità. Esempi sono gateway, database e front-end web.

## Alta disponibilità SafeKit per il trasporto pubblico {#safekit-high-availability-for-public-transport}

RATP ha dovuto affrontare importanti vincoli per il progetto di automazione della linea 1:

  * Un programma di implementazione serrato
  * La maggior parte delle applicazioni non è stata originariamente progettata per un’elevata disponibilità
  * Era necessaria una soluzione sia per i server Windows che per Linux
  * Non c’era budget per hardware costoso, come lo storage SAN o gli apparecchi per il bilanciamento del carico di rete

SafeKit è stato scelto per i seguenti motivi:

  * Si tratta di una soluzione puramente software, senza dischi condivisi e senza SAN
  * Fornisce la stessa soluzione su Windows e Linux
  * Fornisce tre funzioni fondamentali: bilanciamento del carico, failover automatico e replica dei dati in tempo reale
  * È semplice da implementare su server standard, facile da amministrare e versatile

## Implementazione nel mondo reale presso RATP {#real-world-implementation-at-ratp}

RATP ha implementato SafeKit con due tipi di cluster:

  * **Cluster farm**: un cluster attivo/attivo con bilanciamento del carico di rete e failover automatico
  * **Cluster mirror**: un cluster attivo/passivo con replica dei dati in tempo reale e failover automatico

### Approccio di implementazione {#deployment-approach}

Innanzitutto, RATP ha definito le esigenze funzionali. Successivamente, SafeKit è stato configurato per ogni applicazione protetta. Le applicazioni stesse non sono state modificate. SafeKit non richiede alcuna modifica fisica ai server.

Un cluster di applicazioni SafeKit è composto da:

  * Due server con lo stesso sistema operativo
  * L’applicazione è installata su entrambi i server
  * SafeKit installato su entrambi i server
  * Uno o più moduli applicativi configurati per l’alta disponibilità e il bilanciamento del carico

Diversi moduli applicativi possono essere eseguiti in parallelo sullo stesso cluster. Ciò ottimizza l’utilizzo delle risorse del server. RATP ha convalidato i moduli SafeKit in tre fasi: test, pre-produzione e produzione.

### Operazioni quotidiane {#daily-operations}

Gli operatori IT ora amministrano tutti i cluster di applicazioni con:

  * La stessa soluzione ad alta disponibilità su Windows e Linux
  * La stessa console di amministrazione per tutti i cluster
  * La stessa configurazione e gli stessi comandi
  * Monitoraggio unificato per il bilanciamento del carico, l’alta disponibilità e la replica dei dati

I server di backup delle applicazioni critiche si trovano in una sala macchine separata e funzionano con alimentatori separati. In caso di incidente, le operazioni continuano senza interruzione del servizio per i passeggeri della metropolitana di Parigi.

### Vantaggi principali {#key-benefits}

  * **Riduzione dei costi**: nessuna costosa infrastruttura SAN con dischi condivisi e nessun dispositivo di bilanciamento del carico di rete
  * **Amministrazione semplificata**: un’unica console gestisce i cluster Windows e Linux
  * **Elevata disponibilità**: bilanciamento del carico, failover automatico e replica dei dati in tempo reale
  * **Impatto minimo sul progetto**: le applicazioni esistenti non richiedono alcuna modifica
  * **Resilienza operativa**: il ripristino automatico garantisce la continuità del servizio passeggeri

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}
