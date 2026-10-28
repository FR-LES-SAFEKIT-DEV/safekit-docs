---
title: "Gestione delle interruzioni di corrente e dell'isolamento di rete in un cluster HA"
canonical: "https://safekit.eviden.com/it/best-practises/power-outage-and-network-isolation-in-a-cluster/"
description: "Scopri come gestire l'isolamento di rete e le interruzioni di corrente in un cluster ad alta disponibilità. SafeKit propone un'architettura SANless con verificatori di split-brain integrati e risincronizzazione automatica per garantire l'integrità dei dati e un uptime 24 ore su 24, 7 giorni su 7, senza disco condiviso."
category: "best-practises"
lang: "it"
topics: "Quali sono i diversi scenari in caso di isolamento di rete in un cluster?, Quali sono i diversi scenari in caso di interruzione di corrente in un cluster?, 🔍 SafeKit Hub di navigazione ad alta disponibilità"
---

# Gestione delle interruzioni di corrente e dell'isolamento di rete in un cluster HA {#handling-power-outages-and-network-isolation-in-a-ha-cluster}


{{%  insert-safekit-network-isolation-it  %}}
 

## Quali sono i diversi scenari in caso di interruzione di corrente in un cluster? {#what-are-the-different-scenarios-in-case-of-power-outage-in-a-cluster}

### Interruzione di corrente del nodo primario {#primary-node-power-outage}

Quando un'interruzione di corrente arresta solo il nodo primario:

  * si verifica un failover automatico sul nodo secondario, che diventa SOLO e riavvia l'applicazione,
  * quando il nodo 1 viene riavviato, diventa SEDOND dopo la risincronizzazione dei dati replicati,
  * I ruoli di responsabile primario e secondario possono essere scambiati da un amministratore, se necessario.


### Interruzione di corrente del nodo secondario {#secondary-node-power-outage}

Quando un'interruzione di corrente arresta solo il nodo secondario:

  * non c'è failover, il primario diventa SOLO e l'applicazione continua la sua esecuzione sul nodo 1,
  * Quando il nodo 2 viene riavviato, diventa SEDOND dopo la risincronizzazione dei dati replicati.


### Interruzione generale di corrente - caso 1 {#general-power-outage---case-1}

Quando un'interruzione di corrente arresta entrambi i nodi, il comportamento predefinito è:

  * entrambi i nodi vanno in STOP,
  * quando il nodo 1 viene riavviato, non passa allo stato ALONE e non riavvia l'applicazione perché non sa se ha i dati aggiornati. Quindi passa allo stato WAIT in attesa del riavvio dell'altro nodo,
  * Quando il nodo 2 viene riavviato, entrambi i nodi ritornano ai loro precedenti stati PRIM/SECOND.


### Interruzione generale di corrente - caso 2 {#general-power-outage---case-2}

Quando un'interruzione di corrente arresta entrambi i nodi, il comportamento con syncdelta è:

  * syncdelta è impostato, ad esempio, a 10 minuti nella configurazione, il che significa che l'avvio di un nodo viene accettato anche se i suoi dati sono 10 minuti indietro rispetto all'ultima sincronizzazione,
  * quando il nodo 1 viene riavviato, passa ad ALONE e riavvia l'applicazione presupponendo che il riavvio venga effettuato entro 10 minuti dall'interruzione di corrente,
  * quando il nodo 2 viene riavviato, diventa SECONDO dopo la risincronizzazione dei dati replicati,
  * Nota: se il nodo 2 viene riavviato per primo, diventa SOLO e il nodo 1 diventerà SECONDO all'avvio.



{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}