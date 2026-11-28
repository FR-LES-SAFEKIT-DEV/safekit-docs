---
title: "Alta disponibilità edge senza data center"
canonical: "https://safekit.eviden.com/it/use-cases/edge-high-availability-without-a-data-center-safekit-for-ot-distributed-sites/"
description: "Alta disponibilità edge senza data center: SafeKit trasforma due server standard in un cluster plug-and-play per siti OT e distribuiti, senza SAN."
category: "use-cases"
lang: "it"
topics: "La sfida dell’alta disponibilità all’edge, Perché SafeKit è la soluzione naturale per l’edge computing, Idoneità all’implementazione edge e distribuita, Perché gli ambienti OT perimetrali sono diversi, Casi d’uso ideali per l’edge, Edge vs. data center: le differenze chiave in termini di alta disponibilità, Sistemi operativi e piattaforme supportati"
hashpart: "the-edge-ha-challenge, what-makes-safekit-the-natural-fit-for-edge, edge--distributed-deployment-suitability, why-edge-ot-environments-are-different, ideal-edge-use-cases, edge-vs-data-center-ha-key-differences, supported-operating-systems-platforms"
translation: "translate_md 2026-11-17.1 | glossaire 2026-11-17.4 | Translation LLM | 40 expressions"
image: "/wp-content/uploads/2026/05/safekit-edge-512-512.jpg"
schemaType: "Article"
---

# Alta disponibilità edge senza data center {#edge-high-availability-without-a-data-center}

## La sfida dell’alta disponibilità all’edge {#the-edge-ha-challenge}

I siti di edge computing spesso non dispongono di un data center né di competenze in materia di alta disponibilità. Eppure la continuità operativa è fondamentale per loro. Un reparto di produzione, una piattaforma petrolifera offshore, una clinica ospedaliera, un negozio al dettaglio o un sito di antenne 5G non possono permettersi tempi di inattività. Ma questi siti non possono giustificare il costo e la complessità di un cluster di data center tradizionale.

Le soluzioni tradizionali ad alta disponibilità, come Microsoft Failover Cluster (WSFC), Pacemaker con Corosync o VMware HA, sono state progettate per i data center. Richiedono storage condiviso (SAN o NAS), hardware cluster dedicato, personale IT permanente e competenze complesse sul sistema operativo. Nessuno di questi elementi è presente all’edge.

SafeKit è stato creato proprio per colmare questa lacuna. Mantiene le applicazioni edge in funzione in fabbriche, piattaforme petrolifere, navi, sistemi di sicurezza degli edifici, controllo del traffico aereo, reti 5G, sanità, vendita al dettaglio e altro ancora. Richiede solo due server standard collegati da una LAN.


![SafeKit per l’edge computing](/wp-content/uploads/2026/05/safekit-edge-512-512.jpg)


## Perché SafeKit è la soluzione naturale per l’edge computing {#what-makes-safekit-the-natural-fit-for-edge}

SafeKit trasforma due server edge standard in un cluster ad alta disponibilità plug-and-play. I server possono essere di qualsiasi marca, fisici o virtuali. Non è presente alcun dispositivo di archiviazione condiviso, né SAN, né hardware speciale. Un pacchetto software leggero offre le seguenti funzionalità:

  * **Replicazione sincrona dei file in tempo reale.** I dati vengono replicati a livello di byte sul server di standby al momento della scrittura.
  * **Failover automatico.** Se il server primario si guasta, il server di standby subentra in pochi secondi, senza intervento umano.
  * **Bilanciamento del carico di rete opzionale.** Nelle implementazioni attive-attive, entrambi i server condividono il carico di lavoro.
  * **Console Web.** La gestione è basata su browser e accessibile in remoto tramite HTTPS. Non richiede competenze in loco.
  * **Installazione silenziosa e automatizzabile.** Adatta per la distribuzione di massa in centinaia di siti distribuiti e per l’integrazione in prodotti OEM.


Non è necessario acquistare una SAN. Non è necessaria nemmeno una licenza Windows Server Datacenter. Non è necessaria alcuna esperienza con cluster Linux o hardware di cluster dedicato. L’intero stack ad alta disponibilità è un singolo pacchetto software.

## Idoneità all’implementazione edge e distribuita {#edge--distributed-deployment-suitability}

SafeKit è progettato specificamente per l’edge computing, le filiali e le aziende distribuite:

Requisiti dell’edge computing | Soluzione SafeKit  
---|---  
Nessun addetto IT dedicato in loco | Failover automatico senza intervento manuale  
Nessuna infrastruttura SAN o NAS | Architettura con soli dischi locali e senza SAN  
Gestione remota | Console web accessibile tramite HTTPS da qualsiasi browser  
Basso ingombro hardware | Due server o macchine virtuali standard senza hardware speciale  
Funziona dietro firewall e NAT | Porte configurabili e console basata su HTTPS  
Disaster recovery multisito | Replica in tempo reale con il modulo mirror tra due siti geografici su una VLAN estesa  
Reti isolate o offline | Nessuna dipendenza da Internet e completamente autonomo  
Implementazione OEM o integrata | Installazione silenziosa e scriptabile che i fornitori di software possono integrare  
Centinaia di cluster distribuiti | Progettato per aziende distribuite con molte filiali  
  
## Perché gli ambienti OT perimetrali sono diversi {#why-edge-ot-environments-are-different}

Gli ambienti di tecnologia operativa (OT) includono SCADA, sistemi di gestione degli edifici (BMS), sicurezza fisica e controllo industriale. I loro requisiti differiscono fondamentalmente dai data center IT:

  * **Nessun personale IT in loco.** Una sottostazione, una stazione di pompaggio remota o una nave non hanno un amministratore di sistema. L’alta disponibilità deve essere autogestita.
  * **Reti isolate o con risorse limitate.** Molti siti OT non dispongono di accesso a Internet e hanno una larghezza di banda WAN limitata. Il software ad alta disponibilità deve funzionare completamente offline.
  * **Disponibilità 24 ore su 24, 7 giorni su 7 e tolleranza zero per la complessità.** L’arresto di una linea di produzione, la perdita della videosorveglianza o l’interruzione del controllo degli accessi costano molto di più del software di alta disponibilità stesso.
  * **Cicli di vita delle apparecchiature lunghi.** I server OT possono funzionare per 10-15 anni. La soluzione ad alta disponibilità deve essere stabile e richiedere poca manutenzione e non deve richiedere aggiornamenti costanti.
  * **Solo hardware x86 standard.** Un sito industriale remoto non ha il budget né la giustificazione per una SAN o nodi cluster dedicati.
  * **Nessuna tolleranza per la complessità del sistema operativo.** Il software di cluster tradizionale richiede competenze specifiche. Gli operatori OT non possiedono queste competenze e non dovrebbero averne bisogno.


Il modello SafeKit risolve direttamente ognuno di questi vincoli: nessuna SAN, due server e failover automatico.

## Casi d’uso ideali per l’edge {#ideal-edge-use-cases}

SafeKit si adatta a qualsiasi sito senza data center in cui l’alta disponibilità sia comunque importante:

Settore | Sito perimetrale tipico | Applicazione critica  
---|---|---  
Sicurezza fisica e sorveglianza | Edifici, campus, aeroporti | VMS: Milestone, Genetec, Hanwha, Siemens Siveillance  
Gestione degli edifici (BMS) | Edifici per uffici, ospedali, fabbriche | Siemens Desigo CC, Bosch BIS/BVMS  
Controllo elettronico degli accessi (EACS) | Strutture e campus sicuri | Siemens SiPass, Nedap, Bosch AMS, Hirsch MicroSesame  
SCADA e controllo industriale | Fabbriche, sottostazioni, impianti idrici | Qualsiasi software SCADA, DCS o HMI su Windows o Linux  
Controllo del traffico aereo (ATC) | Aeroporti, torri di controllo | Sistemi di gestione del traffico aereo e radar  
Centri di controllo operativo (OCC) | Metropolitana, ferrovia, snodi di trasporto | Segnalamento ferroviario e gestione delle stazioni  
Marittimo | Navi, navi militari | Sistemi di navigazione, di carico e di gestione di bordo  
Petrolio e gas | Piattaforme offshore, impianti remoti | Sistemi di controllo di processo e di sicurezza  
Telecomunicazioni | Siti di antenne 5G, nodi MEC | Server di multi-access edge computing (MEC)  
Sanità | Cliniche, centri diagnostici remoti | Diagnostica per immagini, dati dei pazienti, diagnostica a distanza  
Vendita al dettaglio | Negozi, filiali, magazzini | Gestione del punto vendita e dell’inventario  
Militare e difesa | Basi operative avanzate, unità sul campo | Sistemi di comando e comunicazione mission-critical  
  
## Edge vs. data center: le differenze chiave in termini di alta disponibilità {#edge-vs-data-center-ha-key-differences}

Criterio | Elevata disponibilità del data center (WSFC, Pacemaker, VMware HA) | Alta disponibilità SafeKit all’edge  
---|---|---  
Archiviazione | Richiede un’archiviazione condivisa (SAN o NAS) | Senza SAN, solo con dischi locali  
Hardware | Nodi cluster dedicati, adattatori bus host (HBA) e switch | Due server x86 standard di qualsiasi marca  
Competenza nei sistemi operativi | Competenze in cluster Windows Server Datacenter o Linux | Competenze standard di amministrazione Windows o Linux  
Personale in loco | Necessario per la configurazione e l’intervento | Non è necessario, perché il failover è completamente automatico  
Dipendenza da Internet o dal cloud | Spesso gestito tramite cloud | Funziona su reti completamente isolate  
Scala di implementazione | Singolo data center | Centinaia di siti distribuiti  
Costo della licenza | Elevato (licenze per sistema operativo del datacenter e SAN) | Una licenza software conveniente per cluster  
  
{{%  insert-supported-os-it  %}}

Per le specifiche tecniche complete, i vincoli di dimensionamento e i criteri di approvvigionamento, consultare il riferimento tecnico 📘 [RFI e RFP](</it/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/>).


{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}