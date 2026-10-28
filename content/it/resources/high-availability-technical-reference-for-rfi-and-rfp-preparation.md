---
title: "Riferimento tecnico ad alta disponibilità per la preparazione di RFI e RFP"
canonical: "https://safekit.eviden.com/it/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Riferimento tecnico per la preparazione di documenti RFI e RFP relativi ad alta disponibilità e clustering di applicazioni, utilizzando i concetti e le architetture SafeKit ."
category: "resources"
lang: "it"
topics: "Panoramica, Sommario, Identità del prodotto, Sistemi operativi e piattaforme supportati, Moduli applicativi preconfigurati, Architettura e modello di implementazione, Funzionalità RPO e RTO, Idoneità all'implementazione distribuita e edge, Monitoraggio, gestione e avvisi, Sicurezza e conformità, Modello di licenza, SLA di supporto e manutenzione, Confronto con alternative, Collegamenti di riferimento rapido"
---

# Riferimento tecnico ad alta disponibilità per la preparazione di RFI e RFP {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Panoramica {#overview}

Questa pagina fornisce risposte strutturate e fattuali alle domande più frequenti relative alle richieste di offerta (RFP/RFI) sul software ad alta disponibilità SafeKit . È pensata come riferimento tecnico per i team di approvvigionamento e gli architetti di soluzioni che redigono i requisiti per l'alta disponibilità. 

## Indice {#table-of-contents}

  1. [ Identità del prodotto ](#product-identity)
  2. Sistemi operativi e piattaforme supportati [ ](#supported-operating-systems-platforms)
  3. Moduli applicativi preassemblati [ ](#pre-built-application-modules)
  4. Architettura e modello di implementazione [ ](#architecture-deployment-model)
  5. Funzionalità RPO e RTO [ ](#rpo-rto-capabilities)
  6. [ Idoneità per implementazioni distribuite e edge ](#edge-distributed-deployment-suitability)
  7. [ Monitoraggio, gestione e avvisi ](#monitoring-management-alerting)
  8. [ Sicurezza e conformità ](#security-compliance)
  9. Modello di licenza [ ](#licensing-model)
  10. [ SLA di supporto e manutenzione ](#support-maintenance-slas)
  11. Confronto tra [ e alternative ](#comparison-vs-alternatives)
  12. [ Collegamenti di riferimento rapido ](#quick-reference-links)


## Identità del prodotto {#product-identity}

Campo | Risposta  
---|---  
Nome prodotto | SafeKit  
Fornitore | Eviden (un'azienda Atos), precedentemente Evidian  
Categoria prodotto | Software per clustering di applicazioni / alta disponibilità / ripristino di emergenza  
Versione corrente | SafeKit 8.2  
Sito web | <https://safekit.eviden.com>  
Prima versione | 2000 (oltre 20 anni di produzione)  
  
## Sistemi operativi e piattaforme supportati {#supported-operating-systems-platforms}

Windows OS | Linux OS | Infrastruttura e virtualizzazione | Piattaforme cloud  
---|---|---|---  
• Windows Server 2025 (x86-64) <br> • Windows Server 2022 (x86-64) <br> • Windows Server 2019 (x86-64) <br> • Windows 11 Enterprise (x86-64) <br> • Windows 11 Pro (x86-64) | • Red Hat Enterprise Linux 10 (x86-64) <br> • Red Hat Enterprise Linux 10 (AArch64) <br> • Red Hat Enterprise Linux 9 (x86-64) <br> • Red Hat Enterprise Linux 9 (AArch64) <br> • Red Hat Enterprise Linux 8 (x86-64) <br> • Ubuntu 24.04 LTS (x86-64) | • Qualsiasi server edge di qualsiasi marca <br> • VMware <br> • Microsoft Hyper-V * <br> • Linux KVM * <br> • Qualsiasi hypervisor <br> • Docker container <br> • Contenitori Podman | • Amazon Web Services ( AWS )\ * \ * <br> • Microsoft Azure \ * \ * <br> • Google Cloud Platform ( GCP )\ * \ * <br> • Qualsiasi cloud IaaS con istanze VM standard   
  
_ * SafeKit supporta sia l'alta disponibilità a livello di applicazione che a livello di macchina virtuale._

_ Gli indirizzi IP virtuali ** devono essere configurati a livello del bilanciatore di carico cloud._

## Moduli applicativi preconfigurati {#pre-built-application-modules}

SafeKit include moduli `.safe` preconfigurati e pronti all'uso. Sono organizzati in due strategie di alta disponibilità (HA): **Application HA** (clustering diretto delle applicazioni con i moduli mirror o `farm` ) e **Virtualization HA** (clustering a livello di macchina virtuale con hyperv.safe o kvm.safe ).

 | HA dell'applicazione | HA a livello di VM  
---|---|---  
Configurazione | Richiede una conoscenza tecnica dell'applicazione stessa: quali servizi devono essere riavviati, le cartelle specifiche dell'applicazione che necessitano di replica in tempo reale e la configurazione di un indirizzo IP virtuale per il failover. | Soluzione generica per qualsiasi applicazione/sistema operativo in esecuzione nella VM. Non richiede una conoscenza tecnica dell'applicazione installata all'interno della VM. È la soluzione migliore se non si conosce il funzionamento dell'applicazione. È sufficiente definire la posizione dei file della VM.  
Ideale per | Ideale per integrare l'alta disponibilità direttamente in una soluzione software, indipendentemente dall'hardware o dall'hypervisor sottostante. | Ideale per gestire ambienti complessi con più applicazioni su diverse VM tramite un'unica policy HA.  
  
La tabella seguente elenca tutti i moduli `.safe` disponibili:

HA a livello di applicazione (clustering a livello di applicazione) | HA a livello di virtualizzazione (clustering a livello di macchina virtuale)  
---|---  
Nuova app Windows — mirror.safe | Macchina virtuale Hyper-V — hyperv.safe ( Windows )  
Nuova app Linux — mirror.safe | KVM VM — kvm.safe ( Linux )  
Bilanciamento del carico Windows — farm.safe | Docker contenitore — mirror.safe ( Linux )  
Bilanciamento del carico Linux — farm.safe | Podman contenitore — mirror.safe ( Linux )  
Microsoft SQL Server — sqlserver.safe ( Windows ) | Kubernetes / K3s — k3s.safe ( Linux )  
PostgreSQL — postgresql.safe ( Windows e Linux ) | Bosch AMS — hyperv.safe ( Windows )  
MySQL — mysql.safe ( Windows e Linux ) | Bosch BIS — hyperv.safe ( Windows )  
MariaDB — mysql.safe ( Windows e Linux ) | Bosch BVMS — hyperv.safe ( Windows )  
Oracle — oracle.safe ( Windows e Linux ) | Hanwha Vision — hyperv.safe ( Windows )  
Firebird — firebird.safe ( Windows & Linux ) | Hanwha Wisenet — hyperv.safe ( Windows )  
Apache — apache_farm.safe ( Windows e Linux ) | Suite di sorveglianza Siemens — hyperv.safe ( Windows )  
IIS — iis_farm.safe ( Windows ) | Siemens Desigo CC — hyperv.safe ( Windows )  
NGINX — farm.safe ( Windows e Linux ) | Siemens SiPass — hyperv.safe ( Windows )  
Milestone XProtect — milestone.safe ( Windows ) | Siemens SIPORT — hyperv.safe ( Windows )  
Nedap AEOS — nedap.safe ( Windows ) | SIMATIC PCS 7 — hyperv.safe ( Windows )  
Genetec ( SQL Server ) — sqlserver.safe ( Windows ) | Simatic WinCC — hyperv.safe ( Windows )  
Sistema di videosorveglianza Siemens VMS — SiveillanceVMS.safe ( Windows ) |   
Cloud ( AWS , Azure , GCP , generico) — mirror.safe / farm.safe |   
  
## Architettura e modello di implementazione {#architecture-deployment-model}

### Due moduli cluster: mirror.safe e farm.safe {#two-cluster-modules}

Modulo | Modello | Caso d'uso  
---|---|---  
mirror.safe | Attivo-passivo con replica sincrona dei file a livello di byte + failover automatico | Database, applicazioni con stato, servizi che vengono eseguiti su un solo server alla volta  
farm.safe | Attivo-attivo con bilanciamento del carico di rete + failover automatico | Server web, microservizi stateless, gateway API, servizi che vengono eseguiti su più server contemporaneamente  
  
### Infrastruttura e architettura del cluster {#cluster-infrastructure-architecture}

Requisito / Specifiche | SafeKit Capacità / Valore  
---|---  
È necessaria la condivisione dello spazio di archiviazione? | No: architettura "shared-nothing" senza SAN. Utilizza solo dischi locali.  
Prerequisito Active Directory (AD)? | No: non richiede un dominio Windows o Active Directory. I gruppi di lavoro sono completamente supportati.  
Dimensione del cluster | 2 nodi ( mirror ) o 2+ nodi ( `farm` )  
Indirizzo IP virtuale (VIP) | VIP definito via software che migra automaticamente al nodo attivo tramite Gratuitous ARP (HA a livello di applicazione). Per l'HA a livello di macchina virtuale, l'indirizzo IP fisico all'interno della macchina virtuale viene reindirizzato in modo trasparente, senza bisogno di un VIP. Richiede una LAN, una VLAN o una VLAN estesa tra i nodi.  
L'architettura ibrida a 3 nodi | SafeKit copre il livello HA: un cluster a 2 nodi mirror su una LAN o VLAN estesa con replica sincrona (RPO=0) e failover automatico. Una soluzione di backup di terze parti completa l'architettura: un terzo nodo remoto con replica asincrona su una WAN per il ripristino point-in-time e la protezione dai ransomware.  
Ruolo dell'alta disponibilità | SafeKit utilizza la replica sincrona per garantire un failover istantaneo senza perdita di dati in caso di guasti hardware o software. Tuttavia, poiché scrive i dati su entrambi i nodi simultaneamente, replica fedelmente errori logici, degrado dei dati o cancellazioni accidentali sul nodo di standby in tempo reale.  
Ruolo del backup | Una soluzione di backup (non implementata da SafeKit ) fornisce il ripristino a un punto specifico nel tempo tramite replica asincrona. Protegge dalle minacce all'integrità dei dati (come ransomware o errore umano) che l'alta disponibilità non è in grado di bloccare. Il failover automatico non è supportato, poiché il ripristino dei dati comporta intrinsecamente la perdita di dati.  
Numero massimo di moduli simultanei per cluster | 32: questo limite definisce il numero massimo di moduli SafeKit gestiti contemporaneamente in un cluster a 2 nodi, tipicamente utilizzato in configurazioni HA a livello di VM in cui ogni modulo replica e riavvia una VM diversa. Ciascun modulo può essere eseguito in modo indipendente come primario su entrambi i nodi, consentendo la distribuzione del carico di lavoro su entrambi i server. Nota: il volume totale dei dati su tutte le VM influisce direttamente sul tempo di risincronizzazione dopo un failover o un riavvio del nodo.  
Con agente o senza agente? | Con agente: software leggero installato su ogni nodo  
Indipendente dall'applicazione? | Sì: protegge qualsiasi servizio Windows o demone Linux ; moduli preconfigurati per oltre 30 applicazioni  
  
### Replica e protezione dei dati {#replication-data-protection}

Requisito / Specifiche | SafeKit Capacità / Valore  
---|---  
Metodo di replica | Replica di file a livello di byte (non a livello di blocco del disco)  
Modalità di replica | sincrona (nessuna perdita di dati)  
Requisiti di rete | Latenza di andata e ritorno tra i nodi < 5 ms consigliata per la replica sincrona  
Volume di dati consigliato | Alcuni terabyte (tempo di risincronizzazione)  
Numero di file consigliato | < 1.000.000 di file (tempo di risincronizzazione)  
Velocità di risincronizzazione (1 TB) | ~3 ore su rete a 1 Gb/s; ~1 ora su rete a 10 Gb/s  
Replica selettiva | Sì — replica directory/file specifici  
Crittografia in transito | Sì — TLS/SSL per il traffico di replica  
  
## Funzionalità RPO e RTO {#rpo-rto-capabilities}

### RPO e RTO per tipo di cluster {#rto-rpo-cluster-type}

Metrica | Mirror Cluster ( mirror.safe ) | `Farm` Cluster ( farm.safe )  
---|---|---  
RPO (Recovery Point Objective) | 0 (zero perdita di dati) — replica sincrona; scrittura confermata solo dopo che entrambi i nodi confermano | N/D (senza stato; dati gestiti dal backend mirror )  
RTO (Recovery Time Objective) | ~1 minuto — timeout heartbeat (predefinito 30 s) + tempo di riavvio dell'applicazione | Pochi secondi — il traffico viene immediatamente ridistribuito ai nodi attivi sopravvissuti  
Tipo di replica | Replica sincrona di file a livello di byte in tempo reale | Non applicabile  
Trigger di failover | Automatico in caso di perdita di heartbeat, arresto anomalo del processo o errore del controllore | Automatico in caso di perdita di heartbeat, arresto anomalo del processo o errore del controllore  
Intervento manuale richiesto? | No — failover e failback completamente automatici | No — failover e failback completamente automatici  
  
### Ripartizione RTO ( Mirror — HA a livello di applicazione) {#rto-breakdown-mirror-application-level-ha}

Calcolo RTO del tipo di guasto |  
---|---  
Guasto hardware | Timeout heartbeat (predefinito 30 s) + tempo di riavvio dell'applicazione  
Arresto anomalo del software/processo | Tempo di arresto dell'applicazione + tempo di riavvio dell'applicazione  
Arresto anomalo a livello di sistema operativo | Timeout del battito cardiaco + sistema operativo già in esecuzione sul secondario → nessuna penalità di riavvio  
  
### Analisi RTO ( Mirror — HA a livello di VM) {#rto-breakdown-mirror-vm-level-ha}

Calcolo RTO del tipo di guasto |  
---|---  
Qualsiasi errore | Rilevamento errore + riavvio completo del sistema operativo + riavvio dell'applicazione (in genere diversi minuti)  
  
## Idoneità per implementazioni distribuite e edge computing {#edge-distributed-deployment-suitability}

SafeKit è specificamente progettato per scenari di rete periferica, filiali e aziende distribuite.

Requisito del bordo | SafeKit Risposta  
---|---  
Nessun personale IT dedicato in loco | Sì — failover automatico, nessun intervento manuale  
Nessuna infrastruttura SAN/NAS | Sì — Senza SAN, solo dischi locali  
Gestione remota | Sì — gestione tramite console web  
Ingombro hardware ridotto | Sì — 2 server o VM standard, nessun hardware speciale  
Funziona dietro firewall/NAT | Sì — porte configurabili, console basata su HTTPS  
Ripristino di emergenza multisito | Sì — mirror tra due siti geografici su VLAN estesa  
Distribuzione OEM/integrata | Sì — installazione silenziosa, programmabile, integrabile dagli editori di software  
Centinaia di cluster distribuiti | Sì — progettato per aziende distribuite con molte filiali  
  
Casi d'uso Edge ideali: qualsiasi sito senza data center, dove l'alta disponibilità è comunque importante:

Verticale | Sito di bordo tipico | Applicazione critica  
---|---|---  
Sicurezza fisica e sorveglianza | Edifici, campus, aeroporti | VMS — Milestone , Genetec, Hanwha, Siemens Siveillance  
Gestione degli edifici (BMS) | Edifici per uffici, ospedali, fabbriche | Siemens Desigo CC, Bosch BIS/BVMS  
Controllo accessi elettronico (EACS) | Strutture sicure, campus | Siemens SiPass, Nedap , Bosch AMS  
SCADA e controllo industriale | Fabbriche, sottostazioni, impianti idrici | Qualsiasi software SCADA, DCS o HMI in esecuzione su Windows o Linux  
Controllo del traffico aereo (ATC) | Aeroporti, torri di controllo | Sistemi di gestione e radar dell'ATC  
Centri di controllo operativo (OCC) | Metropolitana, ferrovia, hub di trasporto pubblico | Segnalamento ferroviario e gestione delle stazioni  
Marittimo | Navi, imbarcazioni militari | Sistemi di navigazione, gestione del carico e di bordo  
Petrolio e gas | Piattaforme offshore, impianti remoti | Sistemi di controllo di processo e di sicurezza  
Siti di antenne 5G | , nodi MEC | Server di edge computing multiaccesso (MEC)  
Assistenza sanitaria | Cliniche, centri di diagnostica remota | Diagnostica per immagini, dati dei pazienti, diagnostica remota  
Vendita al dettaglio | Negozi, filiali, magazzini | Gestione del punto vendita e dell'inventario  
Difesa | Basi operative avanzate, unità sul campo | Sistemi di comando e comunicazione critici per la missione  
  
## Monitoraggio, gestione e avvisi {#monitoring-management-alerting}

Dettagli sulla funzionalità |  
---|---  
Console Web | Applicazione Web o Progressive Web App (PWA); configura, monitora e gestisci i nodi del cluster  
Notifiche mobili | Notifiche push del browser per modifiche di stato  
Cronologia degli stati | Cronologia visiva degli stati e degli eventi del modulo  
Notifiche e-mail | Agente e-mail integrato per gli avvisi  
Gestione CLI | Interfaccia a riga di comando completa per scripting e automazione  
Gestione dei log | File di log per modulo e per script; snapshot di debug per il supporto  
L'integrazione con sistemi di monitoraggio di terze parti | SafeKit registra automaticamente tutti i principali eventi del cluster nel registro eventi Windows o nel Syslog Linux , consentendo a qualsiasi piattaforma di monitoraggio di raccogliere questi eventi e generare allarmi con regole di avviso standard, incluse le soluzioni Nagios, Zabbix, Splunk e SIEM, senza necessità di sviluppo personalizzato.  
  
## Sicurezza e conformità {#security-compliance}

Dettagli della funzione |  
---|---  
Accesso alla console HTTPS | Sì — Certificati TLS per la console web  
Autenticazione utente | Account locali, LDAP, PKI/basato su certificati, OpenID Connect  
Ruoli utente | Criteri di accesso configurabili per i ruoli di amministratore, controllo e monitoraggio  
Crittografia | TLS/SSL per TCP (replica, console web, comandi distribuiti) e crittografia simmetrica AES-128-CBC + SHA256 per UDP (heartbeat, protocollo interno safeadmin); crittografia basata sulla libreria openSSL. Servizio web basato su Apache.  
Compatibilità antivirus | Percorsi di esclusione documentati  
Sovranità | In qualità di azienda europea, Eviden (Atos Group) offre con SafeKit un prodotto unico di continuità operativa e ripristino di emergenza sovrano per Windows e Linux , mantenendo i dati e l'infrastruttura di failover completamente on-premise, senza dipendenza da fornitori statunitensi, in linea con i requisiti di continuità operativa e ripristino di emergenza NIS2.  
  
## Modello di licenza {#licensing-model}

Dettagli dell'aspetto |  
---|---  
Tipo di licenza | Licenza perpetua (acquisto una tantum) basata sui nomi host  
Ambito della licenza | Per server (nodo)  
Attivazione della licenza | Attivazione offline supportata; non è necessario l'accesso a Internet per attivare le chiavi di licenza.  
Prova gratuita | Sì, è disponibile una prova gratuita completa.  
Licenza gratuita di un mese | Disponibile per la dimostrazione del concetto  
  
## SLA di supporto e manutenzione {#support-maintenance-slas}

### Assistenza e manutenzione standard (incluse con contratto di manutenzione attivo) {#standard-support-maintenance-included-with-active-maintenance-contract}

Dettagli del servizio |  
---|---  
Accesso al portale di supporto | , disponibile 24 ore su 24, 7 giorni su 7, 365 giorni all'anno, per un massimo di 4 contatti tecnici nominativi.  
Orari di assistenza in tempo reale | 9:00 - 17:00 Centro di supporto europeo, dal lunedì al venerdì  
Conferma dell'incidente | Entro 4 ore lavorative del centro di supporto  
Aggiornamenti e upgrade | Tutti i Service Pack, gli aggiornamenti e gli upgrade sono inclusi senza costi aggiuntivi  
Sostituzione della chiave di licenza | Una chiave di licenza può essere riassegnata in caso di cambio di nome host nell'ambito di un contratto di supporto attivo. Il trasferimento della licenza è limitato alla sostituzione del server all'interno dello stesso progetto, previa accettazione scritta da parte di Eviden.  
Accesso alla knowledge base | Accesso completo ad articoli della knowledge base, FAQ e documentazione online.  
Avvio/arresto dell'applicazione senza SafeKit | Sì — Arresta SafeKit e utilizza uno script wrapper per avviare o arrestare l'applicazione. Lo script wrapper richiama gli script di avvio/arresto dell'applicazione e configura o rimuove l'indirizzo IP virtuale, se necessario. 
Portale di supporto | <https://customercare.evidian.com>  
  
### Risorse gratuite (nessun contratto richiesto) {#free-resources-no-contract-required}

Dettagli della risorsa |  
---|---  
Assistente di supporto AI | [ SafeKit Chat AI ](</it/resources/safekit-support/#ai-support>) su safekit.eviden.com e tramite qualsiasi LLM utilizzando safekit.eviden.com/ llms.txt  
Formazione e certificazione online | Gratuita, a ritmo personalizzato, 12 video (~3 ore e 40 minuti), attestato al completamento  
Documentazione | Guida utente completa, note di rilascio, knowledge base, guide rapide  
  
## Confronto con le alternative {#comparison-vs-alternatives}

Criterio | SafeKit | Microsoft Cluster di failover (WSFC) | VMware HA | Open Source *  
---|---|---|---|---  
Archiviazione condivisa (SAN/vSAN) richiesta | No | Sì | Sì | No  
Windows supporta | Sì | Sì | Sì | No  
Linux supporta | Sì | No | Sì | Sì  
Implementazione di bordo/ramo | Eccellente | Complesso | Complesso | Complesso  
Incorporabile OEM | Sì | No | No | No  
Costo | Perpetuo per nodo | Windows Server + SAN | vSphere Enterprise + SAN | Servizi di integrazione di alto livello  
Complessità di configurazione | Plug-and-Play | Elevata (AD, SAN, witness) | Elevata (vCenter, storage condiviso) | Elevata (prodotti frammentati)  
Manutenibilità | Prodotto singolo, console web | Elevata (richiede competenze in AD e SAN) | Elevata (dipendenza da vCenter) | Elevata (prodotti separati da manutenere)  
  
_ * Su Linux , sono necessari 6 progetti open-source separati — Corosync, Pacemaker, DRBD, Keepalived, STONITH, HAProxy — per replicare il set di funzionalità di SafeKit solo su Linux . SafeKit offre le stesse funzionalità in un unico prodotto, sia su Windows che Linux

## Collegamenti di riferimento rapido {#quick-reference-links}

URL della risorsa |  
---|---  
Pagina iniziale del prodotto | <https://safekit.eviden.com>  
Panoramica tecnica (DOCX con testo e diagrammi) | 📘 [ https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx]( </wp-content/uploads/documents/safekit-technical-overview-en.docx> )  
Prova gratuita | </it/resources/safekit-free-trial/> [ https://safekit.eviden.com/it/resources/safekit-free-trial/](  
Richiedi un preventivo | [ https://safekit.eviden.com/safekit-pricing/]( </it/safekit-pricing/>  
Portale di supporto | <https://customercare.evidian.com>  
Supporto AI gratuito | [ https://safekit.eviden.com/it/resources/safekit-support/]( </it/resources/safekit-support/> )  
Formazione e certificazione gratuite | 🎓 [ https://safekit.eviden.com/it/resources/safekit-on-line-training/]( </it/resources/safekit-on-line-training/> )  
Contattaci | </contact-us-for-safekit/> [ https://safekit.eviden.com/contact-us-for-safekit/](  
  

{{%  insert-safekit-4-buttons-it  %}}