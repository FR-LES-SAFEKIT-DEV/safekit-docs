---
title: "Elevata disponibilità edge senza data center: SafeKit per siti OT e distribuiti"
canonical: "https://safekit.eviden.com/it/use-cases/edge-high-availability-without-a-data-center-safekit-for-ot-distributed-sites/"
description: "I siti periferici non dispongono di un data center, ma necessitano comunque di alta disponibilità. SafeKit trasforma 2 server standard in un cluster HA plug-and-play: nessuna SAN, nessun personale IT necessario, failover automatico."
category: "use-cases"
lang: "it"
topics: "La sfida dell'alta disponibilità di Edge, cosa rende SafeKit la soluzione ideale per Edge, idoneità per implementazioni Edge e distribuite, perché gli ambienti OT di Edge sono diversi, casi d'uso Edge ideali, alta disponibilità di Edge vs. Data Center: differenze chiave, requisiti tecnici minimi, 🔍 Hub di navigazione per l'alta disponibilità SafeKit"
---

# Elevata disponibilità Edge senza data center: SafeKit per siti OT e distribuiti {#edge-high-availability-without-a-data-center-safekit-for-ot--distributed-sites}

## La sfida Edge HA {#the-edge-ha-challenge}

Spesso i siti periferici non dispongono di un data center né di competenze in materia di alta disponibilità (HA), eppure la continuità operativa è fondamentale. Un impianto di produzione, una piattaforma petrolifera offshore, una clinica ospedaliera, un negozio al dettaglio o un sito di antenne 5G non possono permettersi tempi di inattività, ma non possono giustificare i costi e la complessità di un cluster HA tradizionale basato su un data center.

Le soluzioni HA tradizionali — Microsoft Failover Cluster (WSFC), Pacemaker/Corosync, VMware HA — sono state progettate per i data center: presuppongono storage condiviso (SAN/NAS), hardware cluster dedicato, personale IT permanente e competenze complesse a livello di sistema operativo. Nessuna di queste condizioni è presente ai margini della rete.

SafeKit è stato creato proprio per colmare questa lacuna. Consente alle applicazioni edge di continuare a funzionare in fabbriche, piattaforme petrolifere, navi, sistemi di sicurezza degli edifici, controllo del traffico aereo, reti 5G, strutture sanitarie, negozi al dettaglio e molto altro ancora, con nient'altro che due server standard e una LAN.


![ SafeKit per Edge ](/wp-content/uploads/2026/05/safekit-edge-512-512.jpg)


## Cosa rende SafeKit la scelta naturale per Edge {#what-makes-safekit-the-natural-fit-for-edge}

SafeKit trasforma due server edge standard (di qualsiasi marca, fisici o virtuali) in un cluster HA plug-and-play, senza storage condiviso, SAN o hardware speciale. Un unico stack software leggero offre:

  * **Replica sincrona dei file in tempo reale** — i dati vengono replicati a livello di byte sul server di standby al momento della scrittura
  * **Failover automatico** : se il server primario si guasta, il server di standby subentra senza intervento umano, entro pochi secondi
  * **Bilanciamento del carico di rete opzionale** — per implementazioni attivo-attivo in cui entrambi i server condividono il carico di lavoro
  * **Console web** : gestione basata su browser, accessibile da remoto tramite HTTPS, senza necessità di competenze in loco.
  * **Installazione silenziosa e programmabile** — adatta per l'integrazione OEM e la distribuzione di massa su centinaia di siti distribuiti


Non è necessario acquistare una SAN, non è richiesta alcuna licenza Windows Server Datacenter, non è necessaria alcuna competenza specifica sul sistema operativo del cluster Linux e non è richiesto hardware dedicato per il cluster. L'intero stack HA è costituito da un singolo pacchetto software.

## Idoneità per implementazioni distribuite e edge computing {#edge--distributed-deployment-suitability}

SafeKit è specificamente progettato per scenari di edge computing, filiali e aziende distribuite:

Requisito del bordo | SafeKit Risposta  
---|---  
Nessun personale IT dedicato in loco | Failover automatico, nessun intervento manuale richiesto  
Nessuna infrastruttura SAN/NAS | Architettura senza SAN, solo dischi locali  
Console di gestione remota | accessibile tramite HTTPS da qualsiasi browser.  
Ingombro hardware ridotto | 2 server o VM standard, nessun hardware speciale  
Funziona dietro firewall/NAT | Porte configurabili, console basata su HTTPS  
Ripristino di emergenza multisito | Mirror tra due siti geografici su VLAN estesa  
Reti isolate dalla rete / offline | Nessuna dipendenza da Internet; completamente autosufficienti  
Distribuzione OEM/integrata | Installazione silenziosa, programmabile, integrabile dagli sviluppatori di software  
Centinaia di cluster distribuiti | Progettati per aziende distribuite che gestiscono numerose filiali  
  
## Perché gli ambienti Edge OT sono diversi {#why-edge-ot-environments-are-different}

Gli ambienti OT (Operational Technology) — SCADA, BMS, sicurezza fisica, controllo industriale — hanno requisiti che differiscono fondamentalmente da quelli dei data center IT:

  * **Nessun personale IT in loco.** Una sottostazione, una stazione di pompaggio remota o una nave non hanno un amministratore di sistema. L'alta disponibilità deve essere autogestita.
  * **Reti isolate o con accesso limitato.** Molti siti OT non hanno accesso a Internet e dispongono di larghezza di banda WAN limitata. Il software HA deve funzionare completamente offline.
  * **Disponibilità 24 ore su 24, 7 giorni su 7, tolleranza zero per la complessità.** Arrestare una linea di produzione, perdere la videosorveglianza o interrompere il controllo degli accessi costa molto di più del software HA stesso.
  * Cicli di vita lunghi per le apparecchiature **. I server OT** possono funzionare per 10-15 anni. La soluzione HA deve essere stabile, richiedere poca manutenzione e non necessitare di aggiornamenti costanti.
  * **Solo hardware x86 standard.** Nessun budget o giustificazione per SAN o nodi cluster dedicati in un sito industriale remoto.
  * **Intolleranza per la complessità a livello di sistema operativo.** Pacemaker, Corosync o WSFC richiedono competenze sui cluster che gli operatori OT semplicemente non hanno e non dovrebbero necessitare.


Il modello SANless a due server e con failover automatico di SafeKit affronta direttamente ognuno di questi vincoli.

## Casi d'uso ideali per l'edge computing {#ideal-edge-use-cases}

Qualsiasi sito senza data center, dove l'alta disponibilità è comunque importante:

Verticale | Sito di bordo tipico | Applicazione critica  
---|---|---  
Sicurezza fisica e sorveglianza | Edifici, campus, aeroporti | VMS — Milestone , Genetec, Hanwha, Siemens Siveillance  
Gestione degli edifici (BMS) | Edifici per uffici, ospedali, fabbriche | Siemens Desigo CC, Bosch BIS/BVMS  
Controllo accessi elettronico (EACS) | Strutture sicure, campus | Siemens SiPass, Nedap , Bosch AMS  
SCADA e controllo industriale | Fabbriche, sottostazioni, impianti idrici | Qualsiasi software SCADA, DCS o HMI su Windows o Linux  
Controllo del traffico aereo (ATC) | Aeroporti, torri di controllo | Sistemi di gestione e radar dell'ATC  
Centri di controllo operativo (OCC) | Metropolitana, ferrovia, hub di trasporto pubblico | Segnalamento ferroviario e gestione delle stazioni  
Marittimo | Navi, imbarcazioni militari | Sistemi di navigazione, gestione del carico e di bordo  
Petrolio e gas | Piattaforme offshore, impianti remoti | Sistemi di controllo di processo e di sicurezza  
Siti di antenne 5G | , nodi MEC | Server di edge computing multiaccesso (MEC)  
Assistenza sanitaria | Cliniche, centri di diagnostica remota | Diagnostica per immagini, dati dei pazienti, diagnostica remota  
Vendita al dettaglio | Negozi, filiali, magazzini | Gestione del punto vendita e dell'inventario  
Difesa | Basi operative avanzate, unità sul campo | Sistemi di comando e comunicazione critici per la missione  
  
## Alta disponibilità (HA) in ambiente edge e in data center: differenze chiave {#edge-vs-data-center-ha-key-differences}

Criterion | HA del data center (WSFC, Pacemaker, VMware HA) | SafeKit HA di bordo  
---|---|---  
Archiviazione | Richiede archiviazione condivisa SAN/NAS | Senza SAN: solo dischi locali  
Hardware | Nodi cluster dedicati, HBA, switch | Due server x86 standard qualsiasi  
Competenza in sistemi operativi | Windows Competenze in sistemi operativi per data center o cluster Linux Competenze in sistemi operativi per cluster | Competenze standard in amministrazione Windows / Linux  
Personale in loco | Necessario per l'installazione e l'intervento | Non richiesto - completamente automatico  
Dipendenza da Internet/cloud | Spesso gestito tramite cloud | Completamente isolato dalla rete  
Scala di implementazione | Centro dati singolo | Centinaia di siti distribuiti  
Costo della licenza | Elevato (Sistema operativo del data center, licenze SAN) | Licenza software singola e conveniente per cluster  
RTO tipico | 1–5 minuti | Meno di 1 minuto (configurabile)  
  
## Requisiti tecnici minimi {#technical-minimum-requirements}

  * Server **:** 2 server x86 standard o VM (qualsiasi marca hardware, fisica o virtuale) o ARM (solo Linux )
  * **OS:** Windows Server 2019 / 2022 / 2025, Windows 11, RHEL 8/9, Ubuntu 24.04
  * Rete **: LAN** da 1 Gbps per la replica; si consiglia una rete heartbeat dedicata.
  * **Archiviazione:** Solo dischi locali — nessuna SAN, nessun NAS, nessuna archiviazione condivisa di alcun tipo
  * **Nessuna edizione speciale del sistema operativo** — Windows Server Standard è sufficiente; non è richiesta alcuna licenza Datacenter


Per le specifiche tecniche complete, i vincoli dimensionali e i criteri di approvvigionamento, consultare il documento di riferimento tecnico RFP/RFI [ ](</it/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/>) ).


{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}