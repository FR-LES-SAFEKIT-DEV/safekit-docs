---
title: "Gestione delle interruzioni di corrente e dell’isolamento della rete in un cluster HA"
canonical: "https://safekit.eviden.com/it/best-practises/power-outage-and-network-isolation-in-a-cluster/"
description: "Come un cluster ad alta disponibilità gestisce blackout e isolamento di rete: il checker split-brain e la risincronizzazione automatica di SafeKit proteggono i tuoi dati."
category: "best-practises"
lang: "it"
topics: "Quali sono i diversi scenari in caso di interruzione di corrente in un cluster?"
hashpart: "what-are-the-different-scenarios-in-case-of-power-outage-in-a-cluster"
translation: "translate_md 2026-11-20.2 | glossaire 2026-11-20.6 | Translation LLM | 41 expressions"
image: "/wp-content/uploads/2023/02/quorum-with-remote-sites.png"
schemaType: "TechArticle"
---

# Gestione delle interruzioni di corrente e dell’isolamento della rete in un cluster HA {#handling-power-outages-and-network-isolation-in-a-ha-cluster}


{{%  insert-safekit-network-isolation-it  %}}
 

## Quali sono i diversi scenari in caso di interruzione di corrente in un cluster? {#what-are-the-different-scenarios-in-case-of-power-outage-in-a-cluster}

Negli scenari seguenti, il nodo 1 è inizialmente il nodo primario. Il nodo 2 è inizialmente il nodo secondario.

### Interruzione di corrente del nodo primario {#primary-node-power-outage}

Quando un’interruzione di corrente arresta solo il nodo primario:

  * SafeKit esegue automaticamente il failover sul nodo secondario. Il nodo 2 diventa ALONE e riavvia l’applicazione.
  * Quando il nodo 1 si riavvia, risincronizza i dati replicati. Quindi diventa SECOND.
  * Se necessario, un amministratore può scambiare i ruoli primario e secondario.


### Interruzione di corrente del nodo secondario {#secondary-node-power-outage}

Quando un’interruzione di corrente arresta solo il nodo secondario:

  * Non si verifica alcun failover. Il nodo 1 diventa ALONE. L’applicazione continua a essere eseguita sul nodo 1.
  * Quando il nodo 2 si riavvia, risincronizza i dati replicati. Quindi diventa SECOND.


### Interruzione di corrente su entrambi i nodi - caso 1 {#general-power-outage---case-1}

Quando un’interruzione di corrente arresta entrambi i nodi, il comportamento predefinito è il seguente:

  * Entrambi i nodi passano allo stato STOP.
  * Quando il nodo 1 si riavvia, non passa allo stato ALONE. Non riavvia l’applicazione. Non può sapere se i suoi dati sono aggiornati. Quindi passa allo stato WAIT e attende che l’altro nodo si riavvii.
  * Quando il nodo 2 si riavvia, entrambi i nodi tornano ai loro stati precedenti: PRIM e SECOND.


### Interruzione di corrente su entrambi i nodi - caso 2 {#general-power-outage---case-2}

Quando un’interruzione di corrente arresta entrambi i nodi, il comportamento con il parametro `syncdelta` è il seguente:

  * In questo esempio, `syncdelta` è impostato su 10 minuti nella configurazione. Un nodo può quindi avviarsi anche se i suoi dati sono in ritardo fino a 10 minuti rispetto all’ultima sincronizzazione.
  * Quando il nodo 1 si riavvia entro 10 minuti dall’interruzione di corrente, passa allo stato ALONE. Riavvia l’applicazione.
  * Quando il nodo 2 si riavvia, risincronizza i dati replicati. Quindi diventa SECOND.
  * Nota: se il nodo 2 si riavvia per primo, diventa ALONE. Il nodo 1 diventa quindi SECOND quando si avvia.



{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}