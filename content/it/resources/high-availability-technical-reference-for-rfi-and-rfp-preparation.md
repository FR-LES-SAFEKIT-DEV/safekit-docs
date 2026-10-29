---
title: "Riferimento tecnico ad alta disponibilità per la preparazione di RFI e RFP"
canonical: "https://safekit.eviden.com/it/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Riferimento tecnico per la preparazione di documenti RFI e RFP relativi ad soluzioni di alta disponibilità e clustering di applicazioni, basate sui concetti e le architetture di SafeKit."
category: "resources"
lang: "it"
topics: "Panoramica, Sommario, Identità del prodotto, Sistemi operativi e piattaforme supportati, Moduli applicativi preconfigurati, Architettura e modello di implementazione, Funzionalità RPO e RTO, Idoneità per siti remoti e implementazioni distribuite, Monitoraggio, gestione e avvisi, Sicurezza e conformità, Modello di licenza, SLA di supporto e manutenzione, Confronto con alternative, Collegamenti di riferimento rapido"
---

# Riferimento tecnico ad alta disponibilità per la preparazione di RFI e RFP {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Panoramica {#overview}

Questa pagina fornisce risposte strutturate e fattuali alle domande più comuni su RFP/RFI SafeKit Software ad alta disponibilità. È concepito come riferimento tecnico per i team di approvvigionamento e gli architetti di soluzioni che redigono i requisiti per l'alta disponibilità. 

## Sommario {#table-of-contents}

  1. [Identità del prodotto](#product-identity)
  2. [Sistemi operativi e piattaforme supportati](#supported-operating-systems-platforms)
  3. [Moduli applicativi preconfigurati](#pre-built-application-modules)
  4. [Modello di architettura e implementazione](#architecture-deployment-model)
  5. [Funzionalità RPO e RTO](#rpo-rto-capabilities)
  6. [Idoneità per siti remoti e implementazioni distribuite](#edge-distributed-deployment-suitability)
  7. [Monitoraggio, gestione e allerta](#monitoring-management-alerting)
  8. [Sicurezza e conformità](#security-compliance)
  9. [Modello di licenza](#licensing-model)
  10. [SLA di supporto e manutenzione](#support-maintenance-slas)
  11. [Confronto vs. alternative](#comparison-vs-alternatives)
  12. [Collegamenti di riferimento rapido](#quick-reference-links)


## Identità del prodotto {#product-identity}

Campo | Risposta  
---|---  
Nome del prodotto | SafeKit  
Fornitore | Eviden (un'azienda di Atos), precedentemente Evidian  
Categoria di prodotto | Clustering di applicazioni / Alta disponibilità / Software di ripristino di emergenza  
Versione corrente | SafeKit 8.2  
Sito web | [https://safekit.eviden.com/it](/it/)  
Prima pubblicazione | 2000 (oltre 20 anni di produzione)  
  
## Sistemi operativi e piattaforme supportati {#supported-operating-systems-platforms}

Windows Sistema operativo | Linux Sistema operativo | Infrastruttura e virtualizzazione | Piattaforme cloud  
---|---|---|---  
• Windows Server 2025 (x86-64)<br>• Windows Server 2022 (x86-64)<br>• Windows Server 2019 (x86-64)<br>• Windows 11 Enterprise (x86-64)<br>• Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 10 (x86-64)<br>• Red Hat Enterprise Linux 10 (AArch64)<br>• Red Hat Enterprise Linux 9 (x86-64)<br>• Red Hat Enterprise Linux 9 (AArch64)<br>• Red Hat Enterprise Linux 8 (x86-64)<br>• Ubuntu 24.04 LTS (x86-64)  |  • Qualsiasi server edge di qualsiasi marca<br>• VMware<br>• Microsoft Hyper-V*<br>• Linux KVM*<br>• Qualsiasi hypervisor<br>• Docker contenitori<br>• Podman contenitori  |  • Amazon Web Services (AWS)\*\*<br>• Microsoft Azure\*\*<br>• Piattaforma Google Cloud (GCP)\*\*<br>• Qualsiasi cloud IaaS con istanze VM standard   
  
_* SafeKit supports both application-level HA and VM-level HA._

_** Virtual IPs must be configured at the Cloud load balancer level._

## Moduli applicativi preconfigurati {#pre-built-application-modules}

SafeKit include pronto all'uso, preconfigurato `.safe` moduli. Sono organizzati in due strategie HA: **Applicazione HA** (cluster di applicazioni dirette con mirror O `farm` moduli) e **Virtualizzazione HA** (Clustering a livello di VM con hyperv.safe O kvm.safe).

 | Applicazione HA | Alta disponibilità a livello di macchina virtuale  
---|---|---  
Configurazione | Richiede una comprensione tecnica dell'applicazione stessa: quali servizi devono essere riavviati, le cartelle specifiche dell'applicazione che necessitano di replica in tempo reale e la configurazione di un indirizzo IP virtuale per il failover. | Soluzione generica per qualsiasi applicazione/sistema operativo in esecuzione su una macchina virtuale. Non richiede una conoscenza tecnica dell'applicazione installata all'interno della VM. È la soluzione ideale se non si conosce il funzionamento dell'applicazione. È sufficiente definire la posizione dei file della VM.  
Ideale per | Ideale per integrare l'alta disponibilità direttamente in una soluzione software, indipendentemente dall'hardware o dall'hypervisor sottostanti. | Ideale per la gestione di ambienti complessi con più applicazioni su diverse macchine virtuali tramite un'unica policy di alta disponibilità.  
  
La tabella seguente elenca tutti i disponibili `.safe` moduli:

Alta disponibilità dell'applicazione (clustering a livello di applicazione) | Alta disponibilità della virtualizzazione (clustering a livello di macchina virtuale)  
---|---  
Nuovo Windows app — mirror.safe | Macchina virtuale Hyper-V — hyperv.safe (Windows)  
Nuovo Linux app — mirror.safe | KVM VM — kvm.safe (Linux)  
Windows bilanciamento del carico — farm.safe | Docker contenitore — mirror.safe (Linux)  
Linux bilanciamento del carico — farm.safe | Podman contenitore — mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | Kubernetes / K3s — k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows & Linux) | Bosch AMS — hyperv.safe (Windows)  
MySQL — mysql.safe (Windows & Linux) | Bosch BIS — hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows & Linux) | Sistema di controllo automatico della velocità Bosch — hyperv.safe (Windows)  
Oracle — oracle.safe (Windows & Linux) | Hanwha Vision — hyperv.safe (Windows)  
Firebird — firebird.safe (Windows & Linux) | Hanwha Wisenet — hyperv.safe (Windows)  
Apache — apache_farm.safe (Windows & Linux) | Suite di sorveglianza Siemens — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | Siemens Desigo CC — hyperv.safe (Windows)  
NGINX — farm.safe (Windows & Linux) | Siemens SiPass — hyperv.safe (Windows)  
Milestone XProtect — milestone.safe (Windows) | Siemens SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
Genetec (SQL Server) — sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
Sistema di videosorveglianza Siemens — SiveillanceVMS.safe (Windows) |   
Nuvola (AWS, Azure, GCP, generico) — mirror.safe / farm.safe |   
  
## Modello di architettura e implementazione {#architecture-deployment-model}

### Due moduli cluster: mirror.safe E farm.safe {#two-cluster-modules}

Modulo | Modello | Caso d'uso  
---|---|---  
mirror.safe | Modalità attivo-passivo con replica sincrona dei file a livello di byte + failover automatico | Database, applicazioni con stato, servizi che vengono eseguiti su un solo server alla volta  
farm.safe | Configurazione attivo-attivo con bilanciamento del carico di rete e failover automatico. | Server web, microservizi stateless, gateway API, servizi che vengono eseguiti su più server contemporaneamente  
  
### Infrastruttura e architettura del cluster {#cluster-infrastructure-architecture}

Requisito / Specifiche | SafeKit Capacità / Valore  
---|---  
Hai bisogno di spazio di archiviazione condiviso? | No — Architettura SANless "shared-nothing". Utilizza solo dischi locali.  
È richiesto Active Directory (AD)? | No, non richiede un Windows dominio o Active Directory. I gruppi di lavoro sono pienamente supportati.  
Dimensione del cluster | 2 nodi (mirror) o 2+ nodi (`farm`)  
IP virtuale (VIP) | Indirizzo IP virtuale (VIP) definito via software che migra automaticamente al nodo attivo tramite Gratuitous ARP (HA a livello di applicazione). Per l'HA a livello di macchina virtuale, l'indirizzo IP fisico all'interno della VM viene reindirizzato in modo trasparente, senza bisogno di un VIP. Richiede una LAN, una VLAN o una VLAN estesa tra i nodi.  
Architettura ibrida a 3 nodi | SafeKit copre il livello HA: un 2-nodo mirror Cluster su LAN o VLAN estesa con replica sincrona (RPO=0) e failover automatico. Una soluzione di backup di terze parti completa l'architettura: un terzo nodo remoto con replica asincrona su WAN per il ripristino point-in-time e la protezione dai ransomware.  
Ruolo dell'alta disponibilità | SafeKit Utilizza la replica sincrona per garantire un failover istantaneo senza perdita di dati in caso di guasti hardware o software. Tuttavia, poiché scrive i dati su entrambi i nodi simultaneamente, replica fedelmente errori logici, degrado dei dati o cancellazioni accidentali sul nodo di standby in tempo reale.  
Ruolo del backup | Una soluzione di backup (non implementata da SafeKitFornisce il ripristino a un punto specifico nel tempo tramite replica asincrona. Protegge dalle minacce all'integrità dei dati (come ransomware o errori umani) che l'alta disponibilità non è in grado di bloccare. Il failover automatico non è supportato, poiché il ripristino dei dati comporta intrinsecamente la perdita di dati.  
Numero massimo di moduli simultanei per cluster | 32 — questo limite copre il numero massimo di SafeKit Moduli gestiti contemporaneamente in un cluster a 2 nodi, tipicamente utilizzati in configurazioni HA a livello di macchina virtuale, dove ogni modulo replica e riavvia una macchina virtuale diversa. Ciascun modulo può essere eseguito in modo indipendente come primario su entrambi i nodi, consentendo la distribuzione del carico di lavoro su entrambi i server. Nota: il volume totale dei dati su tutte le macchine virtuali influisce direttamente sul tempo di risincronizzazione dopo un failover o un riavvio del nodo.  
Basato su agenti o senza agenti? | Basato su agenti: software leggero installato su ciascun nodo  
Indipendente dall'applicazione? | Sì, protegge qualsiasi Windows servizio o Linux demone; moduli preconfigurati per oltre 30 applicazioni  
  
### Replica e protezione dei dati {#replication-data-protection}

Requisito / Specifiche | SafeKit Capacità / Valore  
---|---  
Metodo di replicazione | Replica dei file a livello di byte (non a livello di blocco del disco)  
Modalità di replica | Sincrono (nessuna perdita di dati)  
Requisiti di rete | Per la replica sincrona si raccomanda una latenza di andata e ritorno tra i nodi inferiore a 5 ms.  
Volume di dati consigliato | Qualche terabyte (tempo di risincronizzazione)  
Numero di file consigliato | < 1.000.000 di file (tempo di risincronizzazione)  
Velocità di risincronizzazione (1 TB) | Circa 3 ore su una rete da 1 Gb/s; circa 1 ora su una rete da 10 Gb/s  
Replicazione selettiva | Sì, replicare directory/file specifici  
Crittografia in transito | Sì, TLS/SSL per il traffico di replica.  
  
## Funzionalità RPO e RTO {#rpo-rto-capabilities}

### RPO e RTO per tipo di cluster {#rto-rpo-cluster-type}

metrico | Mirror Grappolo (mirror.safe) | `Farm` Grappolo (farm.safe)  
---|---|---  
RPO (Recovery Point Objective) | 0 (nessuna perdita di dati) — replica sincrona; la scrittura viene confermata solo dopo che entrambi i nodi hanno confermato | N/D (senza stato; dati gestiti dal backend) mirror)  
RTO (Obiettivo di tempo di recupero) | ~1 minuto — timeout del battito cardiaco (predefinito 30 s) + tempo di riavvio dell'applicazione | Pochi secondi: il traffico viene immediatamente ridistribuito ai nodi attivi sopravvissuti.  
Tipo di replica | Replicazione sincrona dei file a livello di byte in tempo reale | Non applicabile  
Attivatore di failover | Automatico in caso di perdita del segnale cardiaco, arresto anomalo del processo o errore del verificatore. | Automatico in caso di perdita del segnale cardiaco, arresto anomalo del processo o errore del verificatore.  
È necessario un intervento manuale? | No — failover e failback completamente automatici | No — failover e failback completamente automatici  
  
### Analisi RTO (Mirror — HA a livello di applicazione) {#rto-breakdown-mirror-application-level-ha}

Tipo di guasto | Calcolo RTO  
---|---  
guasto hardware | Timeout del battito cardiaco (predefinito 30 s) + tempo di riavvio dell'applicazione  
Arresto anomalo del software/processo | Tempo di arresto dell'applicazione + tempo di riavvio dell'applicazione  
Arresto anomalo a livello di sistema operativo | Timeout del battito cardiaco + sistema operativo già in esecuzione sul secondario → nessuna penalità di riavvio  
  
### Analisi RTO (Mirror — HA a livello di macchina virtuale) {#rto-breakdown-mirror-vm-level-ha}

Tipo di guasto | Calcolo RTO  
---|---  
Qualsiasi fallimento | Rilevamento guasti + riavvio completo del sistema operativo + riavvio delle applicazioni (in genere diversi minuti)  
  
## Idoneità per siti remoti e implementazioni distribuite {#edge-distributed-deployment-suitability}

SafeKit è specificamente progettato per scenari di edge computing, filiali e aziende distribuite.

Requisito del bordo | SafeKit Risposta  
---|---  
Nessun personale IT dedicato in loco | Sì, il failover è automatico, senza intervento manuale.  
Nessuna infrastruttura SAN/NAS | Sì, senza SAN, solo dischi locali.  
Gestione remota | Sì, gestione tramite console web  
Ingombro ridotto dell'hardware | Sì, bastano 2 server o macchine virtuali standard, senza bisogno di hardware speciale.  
Funziona anche dietro firewall/NAT | Sì — porte configurabili, console basata su HTTPS  
Ripristino di emergenza multisito | SÌ - mirror tra due siti geografici su VLAN estesa  
Implementazione OEM/integrata | Sì, installazione silenziosa, programmabile tramite script, integrabile dagli sviluppatori di software.  
Centinaia di cluster distribuiti | Sì, è progettato per aziende distribuite con numerose filiali.  
  
Casi d'uso Edge ideali: qualsiasi sito senza data center, dove l'alta disponibilità è comunque importante:

Verticale | Sito di confine tipico | Applicazione critica  
---|---|---  
Sicurezza fisica e sorveglianza | Edifici, campus, aeroporti | VMS — Milestone, Genetec, Hanwha, Siemens Siveillance  
Gestione degli edifici (BMS) | Edifici per uffici, ospedali, fabbriche | Siemens Desigo CC, Bosch BIS/BVMS  
Controllo elettronico degli accessi (EACS) | Strutture sicure, campus | Siemens SiPass, NedapBosch AMS  
SCADA e controllo industriale | Fabbriche, sottostazioni, impianti idrici | Qualsiasi software SCADA, DCS o HMI in esecuzione su Windows O Linux  
controllo del traffico aereo (ATC) | Aeroporti, torri di controllo | Sistemi di gestione del controllo del traffico aereo e sistemi radar.  
Centri di controllo delle operazioni (OCC) | Metropolitana, ferrovia, snodi di trasporto pubblico | Segnalamento ferroviario e gestione delle stazioni  
Marittimo | Navi, imbarcazioni militari | Sistemi di navigazione, gestione del carico e di bordo  
Petrolio e gas | Piattaforme offshore, impianti di perforazione remoti | Sistemi di controllo di processo e di sicurezza  
Telecomunicazioni | Siti di antenne 5G, nodi MEC | Server MEC (Multi-access edge computing)  
Assistenza sanitaria | Cliniche, centri di diagnosi remoti | Immagini mediche, dati dei pazienti, diagnostica a distanza  
Vedere al dettaglio | Negozi, filiali, magazzini | Gestione del punto vendita e dell'inventario  
Difesa | basi operative avanzate, unità sul campo | Sistemi di comando e comunicazione critici per la missione  
  
## Monitoraggio, gestione e allerta {#monitoring-management-alerting}

Capacità | Dettagli  
---|---  
Console Web | Applicazione Web o Progressive Web App (PWA); configurare, monitorare e gestire i nodi del cluster  
Notifiche mobili | Notifiche push del browser per i cambiamenti di stato  
Cronologia degli Stati | Cronologia visiva degli stati e degli eventi del modulo  
Notifiche via e-mail | Agente di posta elettronica integrato per le notifiche  
Gestione CLI | Interfaccia a riga di comando completa per scripting e automazione  
Gestione dei log | File di log per modulo e per script; snapshot di debug per il supporto  
Integrazione con sistemi di monitoraggio di terze parti | SafeKit registra automaticamente tutti i principali eventi del cluster nel Windows Registro eventi o Linux Syslog consente a qualsiasi piattaforma di monitoraggio di raccogliere questi eventi e generare allarmi con regole di avviso standard, incluse Nagios, Zabbix, Splunk e soluzioni SIEM, senza bisogno di alcuno sviluppo personalizzato.  
  
## Sicurezza e conformità {#security-compliance}

Caratteristica | Dettagli  
---|---  
Accesso alla console tramite HTTPS | Sì — certificati TLS per la console web  
Autenticazione utente | Account locali, LDAP, PKI/basato su certificati, OpenID Connect  
Ruoli utente | Criteri di accesso configurabili per i ruoli di amministratore, controllo e monitoraggio.  
Crittografia | TLS/SSL per TCP (replica, console web, comandi distribuiti) e crittografia simmetrica AES-128-CBC + SHA256 per UDP (heartbeat, protocollo interno safeadmin); crittografia basata sulla libreria openSSL. Servizio web basato su Apache.  
Compatibilità antivirus | Percorsi di esclusione documentati  
Sovranità | In qualità di azienda europea, Eviden (Atos Group) offre con SafeKit un prodotto unico sovrano per la continuità operativa e il ripristino in caso di disastro per Windows E Linux — Mantenere i dati e l'infrastruttura di failover completamente in loco, senza dipendere da fornitori statunitensi, in linea con i requisiti di continuità operativa e ripristino di emergenza di NIS2.  
  
## Modello di licenza {#licensing-model}

Aspetto | Dettagli  
---|---  
Tipo di pod | Licenza perpetua (acquisto una tantum) basata sui nomi host  
Ambito della licenza | Per server (nodo)  
Attivazione della licenza | Attivazione offline supportata; non è necessario l'accesso a Internet per attivare le chiavi di licenza.  
Prova gratuita | Sì, è disponibile una versione di prova gratuita completa.  
Licenza gratuita per un mese | Disponibile per la dimostrazione di fattibilità  
  
## SLA di supporto e manutenzione {#support-maintenance-slas}

### Assistenza e manutenzione standard (incluse con contratto di manutenzione attivo) {#standard-support-maintenance-included-with-active-maintenance-contract}

Servizio | Dettagli  
---|---  
Accesso al portale di supporto | Portale web attivo 24 ore su 24, 7 giorni su 7, 365 giorni all'anno per un massimo di 4 contatti tecnici nominativi.  
Orari di assistenza in diretta | Centro di supporto europeo, dalle 9:00 alle 17:00, dal lunedì al venerdì.  
Riconoscimento dell'incidente | Entro 4 ore lavorative del centro di supporto  
Aggiornamenti e upgrade | Tutti i Service Pack, gli aggiornamenti e gli upgrade sono inclusi senza costi aggiuntivi.  
sostituzione della chiave di licenza | La chiave di licenza può essere riassegnata in caso di cambio di nome host nell'ambito di un contratto di supporto attivo. Il trasferimento della licenza è limitato alla sostituzione del server all'interno dello stesso progetto, previa accettazione scritta da parte di Eviden.  
Accesso alla knowledge base | Accesso completo agli articoli della Knowledge Base, alle FAQ e alla documentazione online.  
Avvio/arresto dell'applicazione senza SafeKit | Sì — Fermati SafeKit e utilizzare uno script wrapper per avviare o arrestare l'applicazione. Lo script wrapper richiama gli script di avvio/arresto dell'applicazione e configura o rimuove l'indirizzo IP virtuale, se necessario. 
Portale di supporto | <https://customercare.evidian.com>  
  
### Risorse gratuite (nessun contratto richiesto) {#free-resources-no-contract-required}

Risorsa | Dettagli  
---|---  
Assistente di supporto AI | [SafeKit chat con IA](</it/resources/safekit-support/#ai-support>) su safekit.eviden.com e tramite qualsiasi LLM che utilizzi safekit.eviden.com/llms.txt  
Formazione e certificazione online | Gratuito, a ritmo personalizzato, 12 video (circa 3 ore e 40 minuti), attestato di completamento.  
Documentazione | Guida utente completa, note di rilascio, knowledge base, guide rapide  
  
## Confronto vs. alternative {#comparison-vs-alternatives}

Criterio | SafeKit | Microsoft Cluster di failover (WSFC) | fotografo HA | Open Source*  
---|---|---|---|---  
È necessario uno storage condiviso (SAN/vSAN). | NO | SÌ | SÌ | NO  
Windows supporto | SÌ | SÌ | SÌ | NO  
Linux supporto | SÌ | NO | SÌ | SÌ  
Implementazione periferica/di filiale | Eccellente | Complesso | Complesso | Complesso  
integrabile OEM | SÌ | NO | NO | NO  
Costo | Perpetuo per nodo | Windows Server + SAN | vSphere Enterprise + SAN | Servizi di integrazione di alto livello  
Configura reputazione | Plug-and-Play | Alto (AD, SAN, testimone) | Elevato (vCenter, storage condiviso) | Elevato (prodotti frammentati)  
Manutenibilità | Prodotto singolo, console web | Elevato (è richiesta competenza in AD e SAN) | Elevata (dipendenza da vCenter) | Alto (prodotti separati da mantenere)  
  
_* On Linux, it takes 6 separate open-source projects — Corosync, Pacemaker, DRBD, Keepalived, STONITH, HAProxy — to replicate SafeKit's feature set on Linux only. SafeKit delivers the same capabilities in a single product, on both Windows and Linux._

## Collegamenti di riferimento rapido {#quick-reference-links}

Risorsa | URL  
---|---  
Pagina iniziale del prodotto | [https://safekit.eviden.com/it/](/it/)  
Panoramica tecnica (DOCX con testo e diagrammi) | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
Prova gratuita | [https://safekit.eviden.com/it/resources/safekit-free-trial/](</it/resources/safekit-free-trial/>)  
Richiedi un preventivo | [https://safekit.eviden.com/it/safekit-pricing/](</it/safekit-pricing/>)  
Portale di supporto | <https://customercare.evidian.com>  
Supporto AI gratuito | [https://safekit.eviden.com/it/resources/safekit-support/](</it/resources/safekit-support/>)  
Formazione e certificazione gratuite | [https://safekit.eviden.com/it/resources/safekit-on-line-training/](</it/resources/safekit-on-line-training/>)  
Contattaci | [https://safekit.eviden.com/it/contact-us-for-safekit/](</it/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-en  %}}