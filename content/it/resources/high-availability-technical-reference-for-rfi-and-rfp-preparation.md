---
title: "Riferimento tecnico ad alta disponibilità per la preparazione di RFI e RFP"
canonical: "https://safekit.eviden.com/it/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Riferimento tecnico per aiutare a preparare documenti RFI e RFP per l'alta disponibilità e il clustering di applicazioni utilizzando concetti e architetture SafeKit."
category: "resources"
lang: "it"
topics: "Panoramica, sommario, identità del prodotto, sistemi operativi e piattaforme supportati, moduli applicativi precostruiti, modello di architettura e distribuzione, funzionalità RPO e RTO, idoneità alla distribuzione distribuita e perimetrale, monitoraggio, gestione e avvisi, sicurezza e conformità, modello di licenza, SLA di supporto e manutenzione, confronto con alternative, collegamenti di riferimento rapido"
---

# Riferimento tecnico ad alta disponibilità per la preparazione di RFI e RFP {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Panoramica {#overview}

Questa pagina fornisce risposte strutturate e concrete alle domande più comuni relative a RFP/RFI sul software ad alta disponibilità SafeKit. È inteso come riferimento tecnico per i team di procurement e gli architetti di soluzioni che redigono i requisiti di alta disponibilità. 

## Sommario {#table-of-contents}

  1. [Identità del prodotto](#product-identity)
  2. [Sistemi operativi e piattaforme supportati](#supported-operating-systems-platforms)
  3. [Moduli applicativi precostruiti](#pre-built-application-modules)
  4. [Modello di architettura e distribuzione](#architecture-deployment-model)
  5. [Funzionalità RPO e RTO](#rpo-rto-capabilities)
  6. [E Idoneità alla distribuzione distribuita e edge](#edge-distributed-deployment-suitability)
  7. [Monitoraggio, gestione e avvisi](#monitoring-management-alerting)
  8. [Sicurezza e conformità](#security-compliance)
  9. [Modello di licenza](#licensing-model)
  10. [SLA di supporto e manutenzione](#support-maintenance-slas)
  11. [Confronto vs. alternative](#comparison-vs-alternatives)
  12. [Link di riferimento rapido](#quick-reference-links)


## Identità del prodotto {#product-identity}

Campo | Rispondi  
---|---  
Nome del prodotto | SafeKit  
Venditore | Eviden (un'azienda Atos), precedentemente Evidian  
Categoria di prodotto | Cluster di applicazioni/Alta disponibilità/Software di ripristino di emergenza  
Versione attuale | SafeKit 8.2  
Sito web | <https://safekit.eviden.com>  
Prima uscita | 2000 (oltre 20 anni di produzione)  
  
## Sistemi operativi e piattaforme supportati {#supported-operating-systems-platforms}

Sistema operativo Windows | Sistema operativo Linux | Infrastruttura e virtualizzazione | Piattaforme cloud  
---|---|---|---  
• Windows Server 2025 (x86-64)<br>• Windows Server 2022 (x86-64)<br>• Windows Server 2019 (x86-64)<br>• Windows 11 Enterprise (x86-64)<br>• Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 10 (x86-64)<br> • Red Hat Enterprise Linux 10 (AArch64)<br> • Red Hat Enterprise Linux 9 (x86-64)<br> • Red Hat Enterprise Linux 9 (AArch64)<br> • Red Hat Enterprise Linux 8 (x86-64)<br> • Ubuntu 24.04 LTS (x86-64)  |  • Qualsiasi edge server di qualsiasi marca<br>• VMware<br>• Microsoft Hyper-V*<br>• Linux KVM*<br>• Qualsiasi hypervisor<br>• Contenitori Docker<br>• Contenitori Podman  |  • Amazon Web Services (AWS)\*\*<br>• Microsoft Azure\*\*<br>• Google Cloud Platform (GCP)\*\*<br>• Qualsiasi cloud IaaS con istanze VM standard   
  
_* SafeKit supporta sia HA a livello di applicazione che HA a livello di VM._

_** Gli IP virtuali devono essere configurati a livello del bilanciatore del carico Cloud._

## Moduli applicativi precostruiti {#pre-built-application-modules}

SafeKit include moduli `.safe` pronti all'uso e preconfigurati. Sono organizzati in due strategie HA: **Applicazione HA** (clustering diretto di applicazioni con moduli mirror o farm) e **Virtualizzazione HA** (clustering a livello di VM con hyperv.safe o kvm.safe).

 | Applicazione HA | HA a livello VM ---|---|--- Configurazione | Richiede una conoscenza tecnica dell'applicazione stessa: quali servizi devono essere riavviati, le cartelle specifiche dell'applicazione che necessitano di replica in tempo reale e la configurazione di un indirizzo IP virtuale per il failover. | Soluzione generica per qualsiasi applicazione/sistema operativo in esecuzione nella VM. Non richiede una conoscenza tecnica dell'applicazione installata nella VM. È la soluzione migliore se non sai come funziona l'applicazione. Devi solo definire la posizione dei file VM. Ideale per | Ideale per integrare l'alta disponibilità direttamente in una soluzione software, indipendentemente dall'hardware o dall'hypervisor sottostante. | Ideale per gestire ambienti complessi con più applicazioni su più VM attraverso un'unica policy HA.  
  
La tabella seguente elenca tutti i moduli `.safe` disponibili:

Applicazione HA (clustering a livello di applicazione) | Virtualizzazione HA (clustering a livello di VM)  
---|---  
Nuova app Windows: mirror.safe | Macchina virtuale Hyper-V: hyperv.safe (Windows)  
Nuova app Linux: mirror.safe | Macchina virtuale KVM — kvm.safe (Linux)  
Bilanciamento del carico di Windows: farm.safe | Contenitore Docker: mirror.safe (Linux)  
Bilanciamento del carico Linux: farm.safe | Contenitore Podman: mirror.safe (Linux)  
Microsoft SQL Server: sqlserver.safe (Windows) | Kubernetes/K3s — k3s.safe (Linux)  
PostgreSQL: postgresql.safe (Windows e Linux) | Bosch AMS — hyperv.safe (Windows)  
MySQL: mysql.safe (Windows e Linux) | Bosch BIS — hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows e Linux) | Bosch BVMS — hyperv.safe (Windows)  
Oracle: oracle.safe (Windows e Linux) | Hanwha Vision — hyperv.safe (Windows)  
Firebird — firebird.safe (Windows e Linux) | Hanwha Wisenet — hyperv.safe (Windows)  
Apache — apache_farm.safe (Windows e Linux) | Suite Siemens Siveillance — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | Siemens Desigo CC — hyperv.safe (Windows)  
NGINX — farm.safe (Windows e Linux) | Siemens SiPass — hyperv.safe (Windows)  
Milestone XProtect — pietra miliare.safe (Windows) | Siemens SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
Genetec (SQL Server) — sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
Siemens Siveillance VMS — SiveillanceVMS.safe (Windows) |   
Cloud (AWS, Azure, GCP, generico) — mirror.safe / farm.safe |   
  
## Modello di architettura e distribuzione {#architecture-deployment-model}

### Due moduli cluster: mirror.safe e farm.safe {#two-cluster-modules}

Modulo | Modello | Caso d'uso  
---|---|---  
specchio.safe | Attivo-passivo con replica sincrona dei file a livello di byte + failover automatico | Database, app con stato, servizi eseguiti su un solo server alla volta  
farm.safe | Attivo-attivo con bilanciamento del carico di rete + failover automatico | Server Web, microservizi stateless, gateway API, servizi eseguiti su più server contemporaneamente  
  
### Infrastruttura e architettura del cluster {#cluster-infrastructure-architecture}

Requisito/Specifica | SafeKit Capacità/Valore  
---|---  
È necessario uno spazio di archiviazione condiviso? | No: architettura "shared-nothing" senza SAN. Utilizza solo dischi locali.  
Prerequisito di Active Directory (AD)? | No: non richiede un dominio Windows o Active Directory. I gruppi di lavoro sono completamente supportati.  
Dimensione del gruppo | 2 nodi (mirror) o 2+ nodi (farm)  
IP virtuale (VIP) | VIP definito dal software che migra automaticamente al nodo attivo tramite ARP gratuito (HA a livello di applicazione). Per l'HA a livello di VM, l'IP fisico all'interno della VM viene reindirizzato in modo trasparente, senza necessità di VIP. Richiede una LAN, VLAN o VLAN estesa tra i nodi.  
Architettura ibrida a 3 nodi | SafeKit copre il livello HA: un cluster mirror a 2 nodi su una LAN o VLAN estesa con replica sincrona (RPO=0) e failover automatico. Una soluzione di backup di terze parti completa l'architettura: un terzo nodo remoto con replica asincrona su una WAN per il ripristino point-in-time e la protezione ransomware.  
Ruolo dell'alta disponibilità | SafeKit utilizza la replica sincrona per garantire il failover istantaneo con zero perdite di dati durante guasti hardware o software. Tuttavia, poiché scrive i dati su entrambi i nodi contemporaneamente, replica fedelmente errori logici, deterioramento dei dati o eliminazioni accidentali sul nodo di standby in tempo reale.  
Ruolo del backup | Una soluzione di backup (non implementata da SafeKit) fornisce il ripristino point-in-time tramite replica asincrona. Protegge dalle minacce all'integrità dei dati (come ransomware o errore umano) che l'HA non può bloccare. Il failover automatico non è supportato, poiché il rollback dei dati comporta intrinsecamente la perdita di dati.  
Numero massimo di moduli simultanei per cluster | 32: questo limite copre il numero massimo di moduli SafeKit gestiti contemporaneamente in un cluster a 2 nodi, in genere utilizzato in HA a livello di VM in cui ciascun modulo replica e riavvia una VM diversa. Ogni modulo può essere eseguito in modo indipendente come primario su ciascun nodo, consentendo la distribuzione del carico di lavoro su entrambi i server. Nota: il volume totale dei dati su tutte le macchine virtuali influisce direttamente sul tempo di risincronizzazione dopo un failover o il riavvio del nodo.  
Basato su agente o senza agente? | Basato su agenti: software leggero installato su ciascun nodo  
Indipendente dall'applicazione? | Sì: protegge qualsiasi servizio Windows o demone Linux; moduli precostruiti per oltre 30 applicazioni  
  
### Replica e protezione dei dati {#replication-data-protection}

Requisito/Specifica | SafeKit Capacità/Valore  
---|---  
Metodo di replica | Replica di file a livello di byte (non disco a livello di blocco)  
Modalità di replica | Sincrono (nessuna perdita di dati)  
Requisiti di rete | Latenza di andata e ritorno tra i nodi < 5 ms consigliata per la replica sincrona  
Volume di dati consigliato | Alcuni terabyte (tempo di risincronizzazione)  
Conteggio file consigliato | < 1.000.000 di file (tempo di risincronizzazione)  
Velocità di risincronizzazione (1 TB) | ~3 ore su rete 1 Gb/s; ~1 ora su rete 10 Gb/s  
Replica selettiva | Sì: replica directory/file specifici  
Crittografia in transito | Sì: TLS/SSL per il traffico di replica  
  
## Funzionalità RPO e RTO {#rpo-rto-capabilities}

### RPO e RTO per tipo di cluster {#rto-rpo-cluster-type}

Metrico | Cluster di mirror (mirror.safe) | Cluster di aziende agricole (farm.safe)  
---|---|---  
RPO (obiettivo punto di ripristino) | 0 (nessuna perdita di dati) — replica sincrona; scrittura confermata solo dopo la conferma di entrambi i nodi | N/D (senza stato; dati gestiti dal mirror backend)  
RTO (Obiettivo Tempo di Recupero) | ~1 minuto: timeout dell'heartbeat (predefinito 30 s) + tempo di riavvio dell'applicazione | Pochi secondi: il traffico viene immediatamente ridistribuito ai nodi attivi sopravvissuti  
Tipo di replica | Replica di file sincrona, in tempo reale, a livello di byte | Non applicabile  
Trigger di failover | Automatico in caso di perdita di battito cardiaco, arresto anomalo del processo o errore del controllo | Automatico in caso di perdita di battito cardiaco, arresto anomalo del processo o errore del controllo  
È necessario un intervento manuale? | No: failover e failback completamente automatici | No: failover e failback completamente automatici  
  
### Ripartizione RTO (Mirror - HA a livello di applicazione) {#rto-breakdown-mirror-application-level-ha}

Tipo di guasto | Calcolo dell'RTO  
---|---  
Guasto hardware | Timeout heartbeat (predefinito 30 s) + tempo di riavvio dell'applicazione  
Arresto anomalo del software/processo | Ora di arresto dell'applicazione + ora di riavvio dell'applicazione  
Arresto anomalo a livello del sistema operativo | Timeout heartbeat + sistema operativo già in esecuzione sul secondario → nessuna penalità di riavvio  
  
### Ripartizione RTO (Mirror: HA a livello di VM) {#rto-breakdown-mirror-vm-level-ha}

Tipo di guasto | Calcolo dell'RTO  
---|---  
Qualsiasi fallimento | Rilevamento errori + riavvio completo del sistema operativo + riavvio dell'applicazione (in genere diversi minuti)  
  
## Idoneità alla distribuzione edge e distribuita {#edge-distributed-deployment-suitability}

SafeKit è progettato specificamente per scenari aziendali edge, filiali e distribuiti.

Requisito del bordo | SafeKit Risposta  
---|---  
Nessuno staff IT dedicato in loco | Sì: failover automatico, nessun intervento manuale  
Nessuna infrastruttura SAN/NAS | Sì: senza SAN, solo dischi locali  
Gestione remota | Sì: gestione della console Web  
Basso ingombro hardware | Sì: 2 server o VM standard, nessun hardware speciale  
Funziona dietro firewall/NAT | Sì: porte configurabili, console basata su HTTPS  
Ripristino di emergenza multisito | Sì: mirroring tra due siti geografici su VLAN estesa  
Distribuzione OEM/incorporata | Sì: installazione silenziosa, programmabile e incorporabile dagli editori di software  
Centinaia di cluster distribuiti | Sì, progettato per aziende distribuite con molte filiali  
  
Casi d'uso ideali di Edge: qualsiasi sito senza data center, dove l'elevata disponibilità è ancora importante:

Verticale | Tipico sito edge | Applicazione critica  
---|---|---  
Sicurezza fisica e sorveglianza | Edifici, campus, aeroporti | VMS — Milestone, Genetec, Hanwha, Siemens Siveillance  
Gestione degli edifici (BMS) | Uffici, ospedali, fabbriche | Siemens Desigo CC, Bosch BIS/BVMS  
Controllo elettronico degli accessi (EACS) | Strutture sicure, campus | Siemens SiPass, Nedap, Bosch AMS  
SCADA e controllo industriale | Fabbriche, sottostazioni, impianti idrici | Qualsiasi software SCADA, DCS o HMI in esecuzione su Windows o Linux  
Controllo del traffico aereo (ATC) | Aeroporti, torri di controllo | Gestione ATC e sistemi radar  
Centri di controllo delle operazioni (OCC) | Metropolitana, ferrovia, snodi di transito | Segnalamento ferroviario e gestione delle stazioni  
Marittimo | Navi, navi militari | Sistemi di gestione della navigazione, del carico e di bordo  
Petrolio e gas | Piattaforme offshore, impianti remoti | Sistemi di controllo e sicurezza del processo  
Telecomunicazioni | Siti di antenne 5G, nodi MEC | Server MEC (Multi-Access Edge Computing).  
Sanità | Cliniche, centri diagnostici remoti | Imaging medico, dati dei pazienti, diagnostica remota  
Vendita al dettaglio | Negozi, filiali, magazzini | Gestione del punto vendita e del magazzino  
Difesa | Basi operative avanzate, unità sul campo | Sistemi di comando e comunicazione mission-critical  
  
## Monitoraggio, gestione e avvisi {#monitoring-management-alerting}

Capacità | Dettagli  
---|---  
Consolle web | App Web o App Web progressiva (PWA); configurare, monitorare e gestire i nodi del cluster  
Notifiche mobili | Notifiche push del browser per i cambiamenti di stato  
Cronologia degli Stati | Cronologia visiva degli stati e degli eventi del modulo  
Notifiche e-mail | Agente di posta elettronica integrato per avvisi  
Gestione CLI | Interfaccia a riga di comando completa per scripting e automazione  
Gestione del registro | File di registro per modulo e per script; eseguire il debug degli snapshot per il supporto  
Integrazione del monitoraggio di terze parti | SafeKit registra automaticamente tutti i principali eventi del cluster nel registro eventi di Windows o nel Syslog Linux, consentendo a qualsiasi piattaforma di monitoraggio di raccogliere questi eventi e generare allarmi con regole di avviso standard, comprese le soluzioni Nagios, Zabbix, Splunk e SIEM, senza alcuno sviluppo personalizzato.  
  
## Sicurezza e conformità {#security-compliance}

Caratteristica | Dettagli  
---|---  
Accesso alla console HTTPS | Sì: certificati TLS per console Web  
Autenticazione dell'utente | Account locali, LDAP, basati su PKI/certificato, OpenID Connect  
Ruoli utente | Policy di accesso configurabili per ruoli di amministrazione, controllo e monitoraggio  
Crittografia | TLS/SSL per TCP (replica, console web, comandi distribuiti) e crittografia simmetrica AES-128-CBC + SHA256 per UDP (heartbeat, protocollo interno safeadmin); crittografia basata sulla libreria openSSL. Servizio web basato su Apache.  
Compatibilità antivirus | Percorsi di esclusione documentati  
Sovranità | In qualità di azienda europea, Eviden (Gruppo Atos) offre con SafeKit un prodotto esclusivo di continuità aziendale e ripristino di emergenza per Windows e Linux, mantenendo i dati e l'infrastruttura di failover completamente on-premise, senza dipendenza dai fornitori statunitensi, in linea con i requisiti di continuità aziendale e ripristino di emergenza NIS2.  
  
## Modello di licenza {#licensing-model}

Aspetto | Dettagli  
---|---  
Tipo di licenza | Licenza perpetua (acquisto una tantum) basata sui nomi host  
Ambito della licenza | Per server (nodo)  
Attivazione della licenza | Attivazione offline supportata; non è necessario l'accesso a Internet per attivare le chiavi di licenza.  
Prova gratuita | Sì: è disponibile una prova gratuita con tutte le funzionalità  
Licenza gratuita di un mese | Disponibile per prova di concetto  
  
## SLA di supporto e manutenzione {#support-maintenance-slas}

### Supporto e manutenzione standard (inclusi nel contratto di manutenzione attivo) {#standard-support-maintenance-included-with-active-maintenance-contract}

Servizio | Dettagli  
---|---  
Supportare l'accesso al portale | Portale web attivo 24 ore su 24, 7 giorni su 7, 365 giorni all'anno per un massimo di 4 contatti tecnici nominativi  
Orari di supporto dal vivo | 9:00 – 17:00 Centro di supporto europeo, dal lunedì al venerdì  
Riconoscimento dell'incidente | Entro 4 ore lavorative del Centro di supporto  
Aggiornamenti e upgrade | Tutti i service pack, gli aggiornamenti e gli upgrade sono inclusi senza costi aggiuntivi  
Sostituzione della chiave di licenza | Una chiave di licenza può essere riassegnata alla modifica del nome host nell'ambito di un contratto di supporto attivo. Il trasferimento della licenza è limitato alla sostituzione del server all'interno dello stesso progetto, previa accettazione scritta da parte di Eviden.  
Accesso alla base di conoscenza | Accesso completo agli articoli della Knowledge Base, alle domande frequenti e alla documentazione in linea  
Avvio/arresto dell'applicazione senza SafeKit | Sì: arresta SafeKit e utilizza uno script wrapper per avviare o arrestare l'applicazione. Lo script wrapper richiama gli script di avvio/arresto dell'applicazione e configura o rimuove l'indirizzo IP virtuale, se necessario. 
Portale di supporto | <https://customercare.evidian.com>  
  
### Risorse gratuite (nessun contratto richiesto) {#free-resources-no-contract-required}

Risorsa | Dettagli  
---|---  
Assistente di supporto AI | [SafeKit Chat AI](</resources/safekit-support/#ai-support>) su safekit.eviden.com e tramite qualsiasi LLM utilizzando safekit.eviden.com/llms.txt  
Formazione e certificazione online | Gratuito, a ritmo individuale, 12 video (~3 ore e 40 minuti), certificato al completamento  
Documentazione | Guida per l'utente completa, note sulla versione, knowledge base, guide di avvio rapido  
  
## Confronto vs. alternative {#comparison-vs-alternatives}

Criterio | SafeKit | Cluster di failover Microsoft (WSFC) | VMware HA | Open Source*  
---|---|---|---|---  
È richiesto uno spazio di archiviazione condiviso (SAN/vSAN). | No | Sì | Sì | No  
Supporto Windows | Sì | Sì | Sì | No  
Supporto Linux | Sì | No | Sì | Sì  
Distribuzione perimetrale/filiale | Eccellente | Complesso | Complesso | Complesso  
Integrabile OEM | Sì | No | No | No  
Costo | Perpetuo per nodo | Server Windows+SAN | vSphere Enterprise + SAN | Servizi di integrazione di alto livello  
Complessità di installazione | Plug-and-Play | Alto (AD, SAN, testimone) | Alto (vCenter, storage condiviso) | Alto (prodotti frammentati)  
Manutenibilità | Prodotto unico, console web | Alto (è richiesta competenza AD e SAN) | Alto (dipendenza da vCenter) | Alto (prodotti separati da mantenere)  
  
_* Su Linux, sono necessari 6 progetti open source separati — Corosync, Pacemaker, DRBD, Keepalived, STONITH, HAProxy — per replicare il set di funzionalità di SafeKit solo su Linux. SafeKit offre le stesse funzionalità in un unico prodotto, sia su Windows che su Linux._

## Collegamenti di riferimento rapido {#quick-reference-links}

Risorsa | URL  
---|---  
Home page del prodotto | <https://safekit.eviden.com>  
Panoramica tecnica (DOCX con testo e diagrammi) | 📘 [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
Prova gratuita | [https://safekit.eviden.com/resources/safekit-free-trial/](</it/resources/safekit-free-trial/>)  
Richiedi un preventivo | [https://safekit.eviden.com/safekit-pricing/](</it/safekit-pricing/>)  
Portale di supporto | <https://customercare.evidian.com>  
Supporto AI gratuito | [https://safekit.eviden.com/resources/safekit-support/](</it/resources/safekit-support/>)  
Formazione e certificazione gratuite | 🎓 [https://safekit.eviden.com/resources/safekit-on-line-training/](</it/resources/safekit-on-line-training/>)  
Contattaci | [https://safekit.eviden.com/contattaci-per-safekit/](</it/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-it  %}}