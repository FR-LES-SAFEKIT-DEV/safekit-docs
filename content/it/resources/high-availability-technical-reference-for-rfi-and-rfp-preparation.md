---
title: "Riferimento tecnico SafeKit per i documenti RFI e RFP"
canonical: "https://safekit.eviden.com/it/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Trova informazioni tecniche su SafeKit per preparare richieste di informazioni (RFI) e richieste di offerta (RFP). Scopri i sistemi supportati, le architetture, i tempi di ripristino, la sicurezza, le licenze e il supporto."
category: "resources"
lang: "it"
topics: "Panoramica, Indice, Informazioni sul prodotto, Sistemi operativi e piattaforme supportati, Limitazioni SafeKit High Availability, Moduli applicativi preconfigurati, Architettura e implementazione, Perdita di dati e tempi di ripristino (RPO e RTO), Siti remoti e implementazioni distribuite, Monitoraggio e avvisi, Sicurezza e conformità, Licenze, Supporto e manutenzione, Confronto con altre soluzioni, Link utili"
translation: "translate_md 2026-11-11.5 | glossaire 2026-11-11.10 | Translation LLM | 40 expressions"
---

# Riferimento tecnico SafeKit per i documenti RFI e RFP {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Panoramica {#overview}

Utilizza questa pagina per preparare una richiesta di informazioni (RFI) o una richiesta di proposte (RFP). Qui troverai le risposte alle domande tecniche più comuni sul software di alta disponibilità SafeKit. Le informazioni aiutano i team di approvvigionamento e gli architetti di soluzioni a definire i loro requisiti.

## Indice {#table-of-contents}

  1. [Informazioni sul prodotto](#product-identity)
  2. [Sistemi operativi e piattaforme supportati](#supported-operating-systems-platforms)
  3. [Limitazioni SafeKit High Availability](#safekit-ha-limitations)
  4. [Moduli applicativi preconfigurati](#pre-built-application-modules)
  5. [Architettura e implementazione](#architecture-deployment-model)
  6. [Perdita di dati e tempi di ripristino (RPO e RTO)](#rpo-rto-capabilities)
  7. [Siti remoti e implementazioni distribuite](#edge-distributed-deployment-suitability)
  8. [Monitoraggio e avvisi](#monitoring-management-alerting)
  9. [Sicurezza e conformità](#security-compliance)
  10. [Licenze](#licensing-model)
  11. [Supporto e manutenzione](#support-maintenance-slas)
  12. [Confronto con altre soluzioni](#comparison-vs-alternatives)
  13. [Link utili](#quick-reference-links)


## Informazioni sul prodotto {#product-identity}

Argomento | Dettagli  
---|---  
Nome del prodotto | SafeKit  
Fornitore | Eviden, parte del Gruppo Atos. In precedenza Evidian.  
Paese di sviluppo | Francia  
Categoria di prodotto | Software per il clustering delle applicazioni, l’alta disponibilità e il disaster recovery  
Versione attuale | SafeKit 8.2  
Sito web | [https://safekit.eviden.com](/it/)  
Prima versione | 2000. Utilizzato in produzione per oltre 20 anni.  
  
## Sistemi operativi e piattaforme supportati {#supported-operating-systems-platforms}

Sistemi operativi Windows | Sistemi operativi Linux | Infrastruttura e virtualizzazione | Piattaforme cloud  
---|---|---|---  
• Windows Server 2025 (x86-64) <br> • Windows Server 2022 (x86-64) <br> • Windows Server 2019 (x86-64) <br> • Windows 11 Enterprise (x86-64) <br> • Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 10 (x86-64) <br> • Red Hat Enterprise Linux 10 (AArch64) <br> • Red Hat Enterprise Linux 9 (x86-64) <br> • Red Hat Enterprise Linux 9 (AArch64) <br> • Red Hat Enterprise Linux 8 (x86-64) <br> • Ubuntu 24.04 LTS (x86-64)  |  • Qualsiasi server perimetrale di qualsiasi marca <br> • VMware <br> • Microsoft Hyper-V [1] <br> • Linux KVM [1] <br> • Qualsiasi hypervisor <br> • Container Docker <br> • Container Podman  |  • Amazon Web Services (AWS) [2] <br> • Microsoft Azure [2] <br> • Google Cloud Platform (GCP) [2] <br> • Qualsiasi cloud IaaS con istanze VM standard   
  
**[1]** SafeKit fornisce un’elevata disponibilità per singole applicazioni o intere macchine virtuali.

**[2]** Nel cloud, configurare gli indirizzi IP virtuali sul bilanciatore del carico del cloud.

{{%  insert-safekit-usage-it  %}}

## Moduli applicativi preconfigurati {#pre-built-application-modules}

SafeKit include moduli `.safe` pronti all’uso. Esistono due modi per proteggere le applicazioni. **L’alta disponibilità delle applicazioni** protegge un’applicazione direttamente con un modulo mirror o <span class="notranslate farm-term" translate="no">farm</span>. **L’alta disponibilità della macchina virtuale** protegge l’intera macchina virtuale con un modulo hyperv.safe o kvm.safe.

Criterio di confronto | Elevata disponibilità dell’applicazione | Alta disponibilità delle macchine virtuali  
---|---|---  
Configurazione | È necessario sapere quali servizi dell’applicazione riavviare e quali cartelle replicare. È inoltre necessario configurare l’indirizzo IP virtuale utilizzato per il failover. | È necessario specificare solo la posizione dei file della macchina virtuale. Non è necessario sapere come funzionano le applicazioni all’interno della macchina virtuale. Questo approccio protegge insieme le applicazioni e il sistema operativo.  
Uso consigliato | Aggiungi l’alta disponibilità direttamente a una soluzione software, senza dipendere da hardware o hypervisor specifici. | Gestisci diverse applicazioni su più macchine virtuali con un’unica politica di alta disponibilità.  
  
La tabella seguente elenca tutti i moduli `.safe` disponibili:

Elevata disponibilità dell’applicazione | Alta disponibilità delle macchine virtuali  
---|---  
Nuova app Windows — mirror.safe | VM Hyper-V — hyperv.safe (Windows)  
Nuova app Linux: mirror.safe | VM KVM — kvm.safe (Linux)  
Bilanciamento del carico Windows — farm.safe | Container Docker — mirror.safe (Linux)  
Bilanciamento del carico Linux — farm.safe | Container Podman — mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | K3s Kubernetes — k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows e Linux) | Bosch AMS — hyperv.safe (Windows)  
MySQL — mysql.safe (Windows e Linux) | Bosch BIS — hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows e Linux) | Bosch BVMS — hyperv.safe (Windows)  
Oracle — oracle.safe (Windows e Linux) | Hanwha Vision — hyperv.safe (Windows)  
Firebird — firebird.safe (Windows e Linux) | Hanwha Wisenet — hyperv.safe (Windows)  
Apache — apache_farm.safe (Windows e Linux) | Suite Siemens Siveillance — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | Siemens Desigo CC — hyperv.safe (Windows)  
NGINX — farm.safe (Windows e Linux) | Siemens SiPass — hyperv.safe (Windows)  
Milestone XProtect — milestone.safe (Windows) | Siemens SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
Genetec (SQL Server) — sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
Siemens Siveillance VMS — SiveillanceVMS.safe (Windows) |   
Cloud (AWS, Azure, GCP, generico) — mirror.safe/farm.safe |   
  
## Architettura e implementazione {#architecture-deployment-model}

### Due moduli cluster: mirror.safe e farm.safe {#two-cluster-modules}

Modulo | Principio di funzionamento | Applicazioni tipiche  
---|---|---  
mirror.safe | Un server è attivo e l’altro è in standby. I file vengono replicati in modo sincrono a livello di byte. Il failover è automatico. | Database, applicazioni che memorizzano lo stato e servizi che vengono eseguiti su un solo server alla volta  
farm.safe | Diversi server sono attivi contemporaneamente. SafeKit distribuisce il traffico di rete tra di essi e gestisce automaticamente il failover. | Server web, microservizi senza stato, gateway API e servizi che vengono eseguiti su più server contemporaneamente  
  
### Infrastruttura del cluster {#cluster-infrastructure-architecture}

Requisito | Funzionalità SafeKit  
---|---  
È necessario uno spazio di archiviazione condiviso? | No. SafeKit utilizza dischi locali. Non necessita di una SAN o di uno storage condiviso.  
È richiesto Active Directory? | No, SafeKit non richiede un dominio Windows o Active Directory. Supporta anche i gruppi di lavoro.  
Numero di nodi in un cluster | 2 nodi (mirror) o 2+ nodi (<span class="notranslate farm-term" translate="no">farm</span>)  
Indirizzo IP virtuale (VIP) | Per l’alta disponibilità dell’applicazione, l’indirizzo IP virtuale si sposta automaticamente sul nodo attivo tramite ARP gratuito. Per l’alta disponibilità della macchina virtuale, il traffico verso l’indirizzo IP all’interno della macchina virtuale viene reindirizzato automaticamente. Non è necessario un indirizzo IP virtuale separato. I nodi devono condividere una LAN o una VLAN estesa tra i siti.  
Architettura a tre nodi | SafeKit esegue un cluster mirror a due nodi su una LAN o una VLAN estesa tra siti. Fornisce la replica sincrona con perdita di dati pari a zero (RPO = 0) e il failover automatico. Un prodotto di backup separato replica i dati in modo asincrono su un terzo nodo tramite una WAN. Questo backup consente il ripristino a un punto temporale precedente e fornisce protezione contro i ransomware.  
Scopo dell’alta disponibilità | SafeKit replica i dati in modo sincrono su entrambi i nodi. Ciò consente il failover automatico senza perdita di dati in seguito a un guasto hardware o software. Tuttavia, gli errori logici, il danneggiamento dei dati e le eliminazioni accidentali vengono copiati immediatamente anche sul nodo di standby.  
Scopo dei backup | I backup consentono di ripristinare i dati da un punto temporale precedente. Un prodotto di backup separato, non SafeKit, fornisce questa protezione tramite replica asincrona. I backup aiutano a recuperare da ransomware ed errori umani. Questo recupero non è un failover automatico. Il ripristino di un backup precedente comporta la perdita delle modifiche apportate dopo tale backup.  
Numero massimo di moduli in esecuzione contemporaneamente | Un cluster a due nodi può gestire fino a 32 moduli contemporaneamente. Per la protezione delle macchine virtuali, ogni modulo replica e riavvia una macchina virtuale diversa. Ogni modulo può essere primario su entrambi i nodi, in modo che entrambi i server possano condividere il carico di lavoro. Il volume totale di dati influisce sul tempo di risincronizzazione dopo il failover o il riavvio di un nodo.  
Il software è installato su ogni nodo? | Sì. Un software leggero è installato su ciascun nodo.  
Applicazioni supportate | SafeKit può proteggere qualsiasi servizio Windows o demone Linux. Sono disponibili moduli preconfigurati per oltre 30 applicazioni.  
  
### Replicazione e protezione dei dati {#replication-data-protection}

Requisito | Funzionalità SafeKit  
---|---  
Metodo di replicazione | SafeKit replica le modifiche ai file a livello di byte. Non replica i blocchi del disco.  
Modalità di replica | Replicazione sincrona, con perdita di dati pari a zero  
Requisiti di rete | Per la replica sincrona si consiglia una latenza di andata e ritorno inferiore a 5 ms tra i nodi.  
Volume di dati consigliato | Alcuni terabyte, per mantenere gestibile il tempo di risincronizzazione  
Numero di file consigliato | Meno di 1.000.000 di file, per mantenere gestibile il tempo di risincronizzazione  
Tempo di risincronizzazione per 1 TB | Circa 3 ore su una rete da 1 Gb/s o 1 ora su una rete da 10 Gb/s  
Replicazione selettiva | È possibile scegliere quali directory e file replicare.  
Crittografia durante il trasferimento | Il traffico di replica è crittografato con TLS/SSL.  
  
## Perdita di dati e tempi di ripristino (RPO e RTO) {#rpo-rto-capabilities}

### RPO e RTO per ciascun tipo di cluster {#rto-rpo-cluster-type}

Metrico | Mirror (mirror.safe) | <span class="notranslate farm-term" translate="no">Farm</span> (farm.safe)  
---|---|---  
RPO (obiettivo del punto di ripristino) | Nessuna perdita di dati. Un’operazione di scrittura è completa solo quando entrambi i nodi hanno scritto i dati. | Non applicabile ai servizi senza stato. I dati sono gestiti da un cluster mirror separato.  
RTO (obiettivo di tempo di ripristino) | Circa un minuto. Questo include il timeout <span class="notranslate farm-term" translate="no">heartbeat</span> (30 secondi per impostazione predefinita) e il tempo necessario per riavviare l’applicazione. | Pochi secondi. Il traffico viene ridistribuito ai nodi attivi rimanenti.  
Tipo di replica | Replica di file sincrona, in tempo reale e a livello di byte | Non applicabile  
Attivazione del failover | Il failover si avvia automaticamente quando i messaggi <span class="notranslate farm-term" translate="no">heartbeat</span> si interrompono, quando un processo si arresta in modo anomalo o quando un checker rileva un errore | Il failover si avvia automaticamente quando i messaggi <span class="notranslate farm-term" translate="no">heartbeat</span> si interrompono, quando un processo si arresta in modo anomalo o quando un checker rileva un errore  
È richiesto un intervento manuale? | No. Il failover e il failback sono automatici. | No. Il failover e il failback sono automatici.  
  
### Tempo di ripristino per le applicazioni protette da un cluster mirror {#rto-breakdown-mirror-application-level-ha}

Tipo di guasto | Come viene calcolato il tempo di recupero  
---|---  
Guasto hardware | Timeout <span class="notranslate farm-term" translate="no">heartbeat</span> (30 secondi per impostazione predefinita), seguito dal riavvio dell’applicazione  
Arresto anomalo del software o del processo | Il tempo necessario per arrestare l’applicazione, seguito dal riavvio dell’applicazione  
Arresto anomalo del sistema operativo | Il timeout <span class="notranslate farm-term" translate="no">heartbeat</span>, seguito dal riavvio dell’applicazione. Il server di standby non necessita di un riavvio perché il suo sistema operativo è già in esecuzione.  
  
### Tempo di ripristino per le macchine virtuali protette da un cluster mirror {#rto-breakdown-mirror-vm-level-ha}

Tipo di guasto | Come viene calcolato il tempo di recupero  
---|---  
Tutti i tipi di guasto | Tempo necessario per rilevare l’errore, riavviare il sistema operativo della macchina virtuale e riavviare l’applicazione. In genere, sono necessari diversi minuti.  
  
## Siti remoti e implementazioni distribuite {#edge-distributed-deployment-suitability}

SafeKit è progettato per siti remoti, filiali e organizzazioni con molte sedi.

Requisito per una sede remota | Funzionalità SafeKit  
---|---  
Nessun addetto IT dedicato in loco | Il failover è automatico e non richiede alcun intervento manuale.  
Nessun archivio condiviso (SAN o NAS) | Sono necessari solo i dischi locali. Non è richiesto l’archiviazione condivisa.  
Gestione remota | Gestisci il cluster tramite una console web.  
Hardware limitato | Sono sufficienti due server standard o macchine virtuali. Non è richiesto alcun hardware speciale.  
Firewall e traduzione degli indirizzi di rete (NAT) | Le porte possono essere configurate. La console web utilizza HTTPS.  
Ripristino di emergenza tra siti | Un cluster mirror può connettere due siti tramite una VLAN estesa tra di essi.  
Integrazione da parte degli editori di software | Gli editori di software possono includere SafeKit nei loro prodotti. L’installazione può essere eseguita senza interazione da parte dell’utente e può essere automatizzata con degli script.  
Centinaia di cluster SafeKit in molti siti | SafeKit è progettato per organizzazioni con molte filiali.  
  
I seguenti siti necessitano di un’elevata disponibilità anche quando non dispongono di un data center:

Settore | Sito tipico | Applicazioni critiche  
---|---|---  
Sicurezza fisica e sorveglianza | Edifici, campus, aeroporti | VMS — Milestone, Genetec, Hanwha, Siemens Siveillance  
Gestione degli edifici (BMS) | Edifici per uffici, ospedali, fabbriche | Siemens Desigo CC, Bosch BIS/BVMS  
Controllo elettronico degli accessi (EACS) | Strutture e campus sicuri | Siemens SiPass, Nedap, Bosch AMS  
SCADA e controllo industriale | Fabbriche, sottostazioni, impianti idrici | Qualsiasi software SCADA, DCS o HMI in esecuzione su Windows o Linux  
Controllo del traffico aereo (ATC) | Aeroporti, torri di controllo | Sistemi di gestione e radar ATC  
Centri di controllo operativo (OCC) | Metropolitana, ferrovia, snodi di trasporto | Segnalamento ferroviario e gestione delle stazioni  
Marittimo | Navi, navi militari | Sistemi di navigazione, di gestione del carico e di bordo  
Petrolio e gas | Piattaforme offshore, impianti remoti | Sistemi di controllo di processo e di sicurezza  
Telecomunicazioni | Siti di antenne 5G, nodi MEC | Server di multi-access edge computing (MEC)  
Sanità | Cliniche, centri diagnostici remoti | Diagnostica per immagini, dati dei pazienti, diagnostica a distanza  
Vendita al dettaglio | Negozi, filiali, magazzini | Gestione del punto vendita e dell’inventario  
Difesa | Basi operative avanzate, unità sul campo | Sistemi di comando e comunicazione mission-critical  
  
## Monitoraggio e avvisi {#monitoring-management-alerting}

Caratteristica | Dettagli  
---|---  
Console Web | Configura, monitora e gestisci i nodi del cluster tramite un’applicazione web o una Progressive Web App (PWA).  
Notifiche mobili | Ricevi notifiche del browser quando un modulo cambia stato.  
Cronologia | Visualizza le modifiche di stato e gli eventi del modulo in ordine cronologico.  
Notifiche via e-mail | Un agente e-mail integrato invia avvisi.  
Interfaccia a riga di comando | Utilizza l’interfaccia a riga di comando per scrivere script e automatizzare le attività.  
Gestione dei log | Ogni modulo e script ha i propri file di log. Il team di supporto utilizza gli <span class="notranslate farm-term" translate="no">snapshots</span> dei moduli per indagare sui problemi.  
Integrazione con gli strumenti di monitoraggio | SafeKit registra i principali eventi del cluster nel registro eventi Windows o in Syslog Linux. Gli strumenti di monitoraggio possono raccogliere questi eventi e attivare avvisi con regole standard. Questo funziona con Nagios, Zabbix, Splunk e strumenti SIEM senza sviluppo personalizzato.  
  
## Sicurezza e conformità {#security-compliance}

Caratteristica | Dettagli  
---|---  
HTTPS | La console web utilizza HTTPS con certificati TLS.  
Autenticazione utente | Account locali, LDAP, certificati (PKI) e OpenID Connect  
Ruoli utente | Configurare le policy di accesso per l’amministrazione, il controllo e il monitoraggio.  
Crittografia | Il traffico TCP utilizza TLS/SSL per la replica, la console web e i comandi distribuiti. Il traffico UDP utilizza la crittografia AES-128-CBC con SHA256 per i messaggi <span class="notranslate farm-term" translate="no">heartbeat</span> e per il protocollo safeadmin interno. La libreria OpenSSL fornisce la crittografia. Il servizio web viene eseguito su Apache.  
Antivirus | La documentazione elenca i percorsi da escludere dalle scansioni antivirus.  
Sovranità | SafeKit è sviluppato in Francia da Eviden, parte del gruppo Atos. Protegge le applicazioni Windows e Linux mantenendo i dati e i server presso la sede del cliente. SafeKit può contribuire a soddisfare i requisiti della direttiva europea NIS2 per la continuità operativa e il ripristino di emergenza.
  
## Licenze {#licensing-model}

Argomento | Dettagli  
---|---  
Tipo di licenza | Una licenza perpetua viene acquistata una sola volta ed è associata a un nome host.  
Ambito della licenza | Una licenza per server (nodo)  
Attivazione della licenza | Le chiavi di licenza possono essere attivate senza accesso a Internet.  
Prova gratuita | La versione di prova gratuita include tutte le funzionalità.  
Licenza gratuita per un mese | Disponibile per testare una prova di concetto  
  
## Supporto e manutenzione {#support-maintenance-slas}

### Supporto e manutenzione standard con un contratto di manutenzione attivo {#standard-support-maintenance-included-with-active-maintenance-contract}

Servizio | Dettagli  
---|---  
Accesso al portale di supporto | Il portale web è disponibile in qualsiasi momento, tutti i giorni dell’anno, per un massimo di quattro contatti tecnici nominati.  
Orari di assistenza | Dal lunedì al venerdì, dalle 09:00 alle 17:00, presso il Centro di supporto europeo  
Conferma dell’incidente | Entro quattro ore lavorative. Le ore lavorative sono le ore di assistenza in tempo reale del Centro di assistenza.  
Aggiornamenti e upgrade | Tutti i service pack, gli aggiornamenti e gli upgrade sono inclusi senza costi aggiuntivi.  
Sostituzione della chiave di licenza | Con un contratto di supporto attivo, una chiave di licenza può essere riassegnata in caso di modifica del nome host. Il trasferimento è limitato alla sostituzione di un server all’interno dello stesso progetto. È richiesta la previa approvazione scritta di Eviden.  
Accesso alla knowledge base | Accesso completo agli articoli della knowledge base, alle domande frequenti e alla documentazione online  
Procedura di emergenza | SafeKit fornisce uno script wrapper per avviare o arrestare un’applicazione senza utilizzare le funzionalità di alta disponibilità di SafeKit. Questo script richiama gli script di avvio e arresto dell’applicazione. Inoltre, aggiunge o rimuove l’indirizzo IP virtuale quando necessario.  
Portale di supporto | <https://customercare.evidian.com>  
  
### Risorse gratuite senza contratto di assistenza {#free-resources-no-contract-required}

Risorsa gratuita | Dettagli  
---|---  
Assistente AI per il supporto | Usa [la chat AI SafeKit](</it/resources/safekit-support/#ai-support>) su safekit.eviden.com.   
Formazione e certificazione online | [Impara al tuo ritmo](/it/resources/safekit-on-line-training/) con video gratuiti per un totale di circa 4 ore. Ricevi un certificato al completamento della formazione.  
Documentazione | Guida per l’utente, note di rilascio, knowledge base e guide rapide all’installazione [qui](/it/resources/safekit-free-trial/)  
  
## Confronto con altre soluzioni {#comparison-vs-alternatives}

Criterio | SafeKit | Cluster di failover Microsoft (WSFC) | VMware HA | Open Source [1]  
---|---|---|---|---  
È necessario lo storage condiviso (SAN/vSAN) | No | Sì | Sì | No  
Supporto Windows | Sì | Sì | Sì | No  
Supporto Linux | Sì | No | Sì | Sì  
Implementazione in siti remoti | Eccellente | Complesso | Complesso | Complesso  
OEM | Sì | No | No | No  
Costo | Licenza perpetua per nodo | Windows Server e SAN | vSphere Enterprise e SAN | Servizi di integrazione avanzati  
Complessità di configurazione | Basso: un prodotto da installare e configurare | Alto: configurazione di Active Directory, SAN e witness | Alto: configurazione di vCenter e dello storage condiviso | Alto: diversi prodotti separati da configurare  
Amministrazione | Un prodotto gestito tramite una console web | Elevato: richiede competenze in Active Directory e SAN | Elevato: dipende da vCenter | Svantaggi: diversi prodotti separati da gestire  
  
**[1]** Su Linux, sono necessari sei progetti open source separati per fornire lo stesso set di funzionalità: Corosync, Pacemaker, DRBD, Keepalived, STONITH e HAProxy. SafeKit fornisce queste funzionalità in un unico prodotto sia per Windows che Linux.

## Link utili {#quick-reference-links}

Link | URL  
---|---  
Pagina iniziale del prodotto | [https://safekit.eviden.com](/it/)  
Panoramica tecnica (documento Word con testo e diagrammi) | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
Prova gratuita | [https://safekit.eviden.com/resources/safekit-free-trial/](</it/resources/safekit-free-trial/>)  
Richiedi un preventivo | [https://safekit.eviden.com/safekit-pricing/](</it/safekit-pricing/>)  
Portale di supporto | <https://customercare.evidian.com>  
Supporto AI gratuito | [https://safekit.eviden.com/resources/safekit-support/](</it/resources/safekit-support/>)  
Formazione e certificazione gratuite | [https://safekit.eviden.com/resources/safekit-on-line-training/](</it/resources/safekit-on-line-training/>)  
Contattaci | [https://safekit.eviden.com/contact-us-for-safekit/](</it/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-it  %}}