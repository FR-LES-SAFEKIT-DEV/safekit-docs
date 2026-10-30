---
title: "Riferimento tecnico SafeKit per documenti RFI e RFP"
canonical: "https://safekit.eviden.com/it/resources/high-availability-technical-reference-for-rfi-and-rfp-preparation/"
description: "Trova informazioni tecniche su SafeKit per preparare richieste di informazioni (RFI) e richieste di proposte (RFP). Scopri i sistemi supportati, le architetture, i tempi di ripristino, la sicurezza, le licenze e l'assistenza."
category: "resources"
lang: "it"
topics: "Panoramica, Sommario, Informazioni sul prodotto, Sistemi operativi e piattaforme supportati, Limitazioni dell'alta affidabilità SafeKit, Moduli applicativi preconfigurati, Architettura e implementazione, Tempi di perdita e ripristino dei dati (RPO e RTO), Siti remoti e implementazioni distribuite, Monitoraggio, gestione e avvisi, Sicurezza e conformità, Licenze, Supporto e manutenzione, Confronto con altre soluzioni, Link utili"
---

# Riferimento tecnico SafeKit per documenti RFI e RFP {#high-availability-technical-reference-for-rfi-and-rfp-preparation}

## Panoramica {#overview}

Utilizza questa pagina per preparare una richiesta di informazioni (RFI) o una richiesta di proposte (RFP). Risponde alle domande tecniche più comuni sul software di alta disponibilità SafeKit . Le informazioni fornite aiutano i team di approvvigionamento e gli architetti di soluzioni a definire i propri requisiti.

## Sommario {#table-of-contents}

  1. [Informazioni sul prodotto](#product-identity)
  2. [Sistemi operativi e piattaforme supportati](#supported-operating-systems-platforms)
  3. [Limitazioni dell'alta affidabilità SafeKit](#safekit-ha-limitations)
  4. [Moduli applicativi preconfigurati](#pre-built-application-modules)
  5. [Architettura e implementazione](#architecture-deployment-model)
  6. [Tempi di perdita e ripristino dei dati (RPO e RTO)](#rpo-rto-capabilities)
  7. [Siti remoti e implementazioni distribuite](#edge-distributed-deployment-suitability)
  8. [Monitoraggio, gestione e avvisi](#monitoring-management-alerting)
  9. [Sicurezza e conformità](#security-compliance)
  10. [Licenze](#licensing-model)
  11. [Supporto e manutenzione](#support-maintenance-slas)
  12. [Confronto con altre soluzioni](#comparison-vs-alternatives)
  13. [Link utili](#quick-reference-links)


## Informazioni sul prodotto {#product-identity}

Campo | Risposta  
---|---  
Nome del prodotto | SafeKit  
Fornitore | Eviden, parte del Gruppo Atos. Precedentemente nota come Evidian.  
Sviluppo software | Sviluppato in Francia.
Categoria di prodotto | Software per il clustering di applicazioni, l'alta disponibilità e il ripristino di emergenza.  
Versione attuale | SafeKit 8.2  
Sito web | [https://safekit.eviden.com/it/](</it/>)  
Prima pubblicazione | 2000. Utilizzato in produzione da oltre 20 anni.  
  
## Sistemi operativi e piattaforme supportati {#supported-operating-systems-platforms}

sistemi operativi Windows | sistemi operativi Linux | Infrastruttura e virtualizzazione | piattaforme cloud  
---|---|---|---  
• Windows Server 2025 (x86-64)<br> • Windows Server 2022 (x86-64)<br> • Windows Server 2019 (x86-64)<br> • Windows 11 Enterprise (x86-64)<br> • Windows 11 Pro (x86-64)  |  • Red Hat Enterprise Linux 10 (x86-64)<br> • Red Hat Enterprise Linux 10 (AArch64)<br> • Red Hat Enterprise Linux 9 (x86-64)<br> • Red Hat Enterprise Linux 9 (AArch64)<br> • Red Hat Enterprise Linux 8 (x86-64)<br> • Ubuntu 24.04 LTS (x86-64)  |  • Qualsiasi server edge di qualsiasi marca<br> • VMware<br> • Microsoft Hyper-V [1]<br> • Linux KVM [1]<br> • Qualsiasi hypervisor<br> • Container Docker<br> • Contenitori Podman  |  • Amazon Web Services (AWS) [2]<br> • Microsoft Azure [2]<br> • Google Cloud Platform (GCP) [2]<br> • Qualsiasi cloud IaaS con istanze VM standard   
  
**[1]** SafeKit offre alta disponibilità per singole applicazioni o intere macchine virtuali.

**[2]** Nel cloud, configura gli indirizzi IP virtuali sul bilanciatore di carico del cloud.

{{%  insert-safekit-usage-it  %}}

## Moduli applicativi preconfigurati {#pre-built-application-modules}

SafeKit include moduli `.safe` pronti all'uso. Esistono due modi per proteggere le applicazioni. **L'alta disponibilità delle applicazioni** protegge direttamente un'applicazione con un modulo mirror o <span class="notranslate farm-term" translate="no">farm</span> . **L'alta disponibilità delle macchine virtuali** protegge l'intera macchina virtuale con un modulo hyperv.safe o kvm.safe .

Criterio di confronto | Applicazione ad alta disponibilità | elevata disponibilità delle macchine virtuali  
---|---|---  
Configurazione | È necessario sapere quali servizi applicativi riavviare e quali cartelle replicare. È inoltre necessario configurare l'indirizzo IP virtuale utilizzato per il failover. | È sufficiente specificare la posizione dei file della macchina virtuale. Non è necessario conoscere il funzionamento delle applicazioni al suo interno. Questo approccio protegge contemporaneamente le applicazioni e il sistema operativo.  
Uso consigliato | Aggiungi l'alta disponibilità direttamente a una soluzione software, senza dipendere da hardware specifico o da un hypervisor particolare. | Gestisci diverse applicazioni su più macchine virtuali con un'unica policy di alta disponibilità.  
  
La tabella seguente elenca tutti i moduli `.safe` disponibili:

Applicazione ad alta disponibilità | elevata disponibilità delle macchine virtuali  
---|---  
Nuova app per Windows: mirror.safe | Macchina virtuale Hyper-V — hyperv.safe (Windows)  
Nuova applicazione Linux: mirror.safe | Macchina virtuale KVM — kvm.safe (Linux)  
Bilanciamento del carico di Windows — farm.safe | Contenitore Docker — mirror.safe (Linux)  
Bilanciamento del carico Linux — farm.safe | Contenitore Podman — mirror.safe (Linux)  
Microsoft SQL Server — sqlserver.safe (Windows) | Kubernetes/K3s — k3s.safe (Linux)  
PostgreSQL — postgresql.safe (Windows e Linux) | Bosch AMS — hyperv.safe (Windows)  
MySQL — mysql.safe (Windows e Linux) | Bosch BIS — hyperv.safe (Windows)  
MariaDB — mysql.safe (Windows e Linux) | Bosch BVMS — hyperv.safe (Windows)  
Oracle — oracle.safe (Windows e Linux) | Hanwha Vision — hyperv.safe (Windows)  
Firebird — firebird.safe (Windows e Linux) | Hanwha Wisenet — hyperv.safe (Windows)  
Apache — apache_farm.safe (Windows e Linux) | Siemens Siveillance suite — hyperv.safe (Windows)  
IIS — iis_farm.safe (Windows) | Siemens Desigo CC — hyperv.safe (Windows)  
NGINX — farm.safe (Windows e Linux) | Siemens SiPass — hyperv.safe (Windows)  
Milestone XProtect — milestone.safe (Windows) | Siemens SIPORT — hyperv.safe (Windows)  
Nedap AEOS — nedap.safe (Windows) | SIMATIC PCS 7 — hyperv.safe (Windows)  
Genetec (SQL Server) — sqlserver.safe (Windows) | SIMATIC WinCC — hyperv.safe (Windows)  
Siemens Siveillance VMS — SiveillanceVMS.safe (Windows) |   
Cloud (AWS, Azure, GCP, generico) — mirror.safe / farm.safe |   
  
## Architettura e implementazione {#architecture-deployment-model}

### Due moduli cluster: mirror.safe e farm.safe {#two-cluster-modules}

Modulo | Come funziona | Applicazioni tipiche  
---|---|---  
mirror.safe | Un server è attivo e l'altro è in standby. I file vengono replicati in modo sincrono a livello di byte. Il failover è automatico. | Database, applicazioni che memorizzano lo stato e servizi che vengono eseguiti su un solo server alla volta.  
farm.safe | Diversi server sono attivi contemporaneamente. SafeKit distribuisce il traffico di rete tra di essi e gestisce automaticamente il failover. | Server web, microservizi stateless, gateway API e servizi che vengono eseguiti su più server contemporaneamente  
  
### Infrastruttura del cluster {#cluster-infrastructure-architecture}

Requisito | Funzionalità SafeKit  
---|---  
Hai bisogno di spazio di archiviazione condiviso? | No. SafeKit utilizza dischi locali. Non necessita di una SAN o di storage condiviso.  
È necessario Active Directory? | No. SafeKit non richiede un dominio Windows o Active Directory. Supporta anche i gruppi di lavoro.  
Dimensione del cluster | 2 nodi ( mirror ) o 2 o più nodi ( <span class="notranslate farm-term" translate="no">farm</span> )  
Indirizzo IP virtuale (VIP) | Per garantire l'alta disponibilità delle applicazioni, l'indirizzo IP virtuale viene spostato automaticamente sul nodo attivo tramite Gratuitous ARP. Per garantire l'alta disponibilità delle macchine virtuali, il traffico diretto all'indirizzo IP interno alla macchina virtuale viene reindirizzato automaticamente. Non è necessario un indirizzo IP virtuale separato. I nodi devono condividere una LAN o una VLAN estesa tra i siti.  
Architettura a tre nodi | SafeKit esegue un cluster mirror a due nodi su una LAN o una VLAN estesa tra i siti. Offre replica sincrona senza perdita di dati (RPO=0) e failover automatico. Un prodotto di backup separato replica i dati in modo asincrono su un terzo nodo tramite una WAN. Questo backup consente il ripristino a un punto precedente nel tempo e offre protezione contro i ransomware.  
Scopo dell'alta disponibilità | SafeKit replica i dati in modo sincrono su entrambi i nodi. Ciò consente il failover automatico senza perdita di dati in caso di guasto hardware o software. Tuttavia, anche gli errori logici, la corruzione dei dati e le cancellazioni accidentali vengono copiati immediatamente sul nodo di standby.  
Scopo dei backup | I backup consentono di ripristinare i dati a un momento precedente. Questa protezione viene fornita da un prodotto di backup separato, non da SafeKit , tramite replica asincrona. I backup aiutano a ripristinare i dati in caso di attacchi ransomware ed errori umani. Questo ripristino non è un failover automatico. Il ripristino di un backup precedente comporta la perdita delle modifiche apportate successivamente a tale backup.  
Numero massimo di moduli in esecuzione contemporaneamente | Un cluster a due nodi può gestire fino a 32 moduli contemporaneamente. Per la protezione delle macchine virtuali, ogni modulo replica e riavvia una macchina virtuale diversa. Ciascun modulo può essere primario su uno dei due nodi, consentendo a entrambi i server di condividere il carico di lavoro. Il volume totale dei dati influisce sul tempo di risincronizzazione dopo un failover o un riavvio di un nodo.  
È necessario del software su ciascun nodo? | Sì. Su ogni nodo è installato un software leggero.  
Applicazioni supportate | SafeKit è in grado di proteggere qualsiasi servizio Windows o demone Linux. Sono disponibili moduli preconfigurati per oltre 30 applicazioni.  
  
### Replicazione e protezione dei dati {#replication-data-protection}

Requisito | Funzionalità SafeKit  
---|---  
Metodo di replicazione | SafeKit replica le modifiche ai file a livello di byte. Non replica i blocchi del disco.  
Modalità di replica | Replica sincrona, senza perdita di dati  
Requisiti di rete | Per la replica sincrona si raccomanda una latenza di andata e ritorno inferiore a 5 ms tra i nodi.  
Volume di dati consigliato | Qualche terabyte, per mantenere gestibile il tempo di risincronizzazione.  
Numero di file consigliato | Meno di 1.000.000 di file, per mantenere gestibili i tempi di risincronizzazione.  
Tempo di risincronizzazione 1 TB | Circa 3 ore su una rete da 1 Gb/s o 1 ora su una rete da 10 Gb/s  
Replicazione selettiva | È possibile scegliere quali directory e file replicare.  
Crittografia durante il trasferimento | Il traffico di replica è crittografato con TLS/SSL.  
  
## Tempi di perdita e ripristino dei dati (RPO e RTO) {#rpo-rto-capabilities}

### RPO e RTO per ogni tipo di cluster {#rto-rpo-cluster-type}

metrico | Mirror ( mirror.safe ) | <span class="notranslate farm-term" translate="no">Farm</span> ( farm.safe )  
---|---|---  
RPO (obiettivo di punto di recupero) | Nessuna perdita di dati. La scrittura viene confermata solo dopo che entrambi i nodi l'hanno riconosciuta. | Non applicabile ai servizi stateless. Un cluster mirror separato gestisce i dati.  
RTO (obiettivo di tempo di recupero) | Circa un minuto. Questo include il timeout <span class="notranslate farm-term" translate="no">heartbeat</span> (30 secondi per impostazione predefinita) e il tempo necessario per riavviare l'applicazione. | Qualche secondo. Il traffico viene ridistribuito ai nodi attivi rimanenti.  
Tipo di replica | Replicazione sincrona dei file a livello di byte in tempo reale | Non applicabile  
Attivatore di failover | Automatico quando <span class="notranslate farm-term" translate="no">heartbeats</span> si arrestano, un processo si blocca o un sistema di controllo rileva un errore | Automatico quando <span class="notranslate farm-term" translate="no">heartbeats</span> si arrestano, un processo si blocca o un sistema di controllo rileva un errore  
È necessario un intervento manuale? | No. Il failover e il failback sono automatici. | No. Il failover e il failback sono automatici.  
  
### Tempo di ripristino per le applicazioni protette da un cluster mirror {#rto-breakdown-mirror-application-level-ha}

Tipo di spedizione | Come viene calcolato il tempo di recupero  
---|---  
guasto hardware | Timeout <span class="notranslate farm-term" translate="no">Heartbeat</span> (30 secondi per impostazione predefinita), seguito dal riavvio dell'applicazione.  
Arresto anomalo del software o del processo | Il momento di arrestare l'applicazione, seguito dal riavvio dell'applicazione.  
Arresto anomalo del sistema operativo | Timeout <span class="notranslate farm-term" translate="no">Heartbeat</span> . Il sistema operativo è già in esecuzione sul server di standby, quindi non è necessario riavviarlo.  
  
### Tempo di ripristino per le macchine virtuali protette da un cluster mirror {#rto-breakdown-mirror-vm-level-ha}

Tipo di spedizione | Come viene calcolato il tempo di recupero  
---|---  
Qualsiasi fallimento | È necessario rilevare l'errore, riavviare il sistema operativo della macchina virtuale e riavviare l'applicazione. Questa operazione richiede in genere diversi minuti.  
  
## Siti remoti e implementazioni distribuite {#edge-distributed-deployment-suitability}

SafeKit è progettato per siti remoti, filiali e organizzazioni con numerose sedi.

Requisiti presso una sede remota | Funzionalità SafeKit  
---|---  
Nessun personale IT dedicato in loco | Il failover è automatico e non richiede alcun intervento manuale.  
Nessuna SAN o NAS | SafeKit utilizza dischi locali e non richiede storage condiviso.  
Gestione remota | Gestisci il cluster tramite una console web.  
Hardware limitato | Sono sufficienti due server standard o macchine virtuali. Non è richiesto alcun hardware speciale.  
Firewall e traduzione degli indirizzi di rete (NAT) | Le porte sono configurabili. La console web utilizza HTTPS.  
Ripristino di emergenza tra siti | Un cluster mirror può connettere due siti tramite una VLAN estesa tra di essi.  
Integrazione da parte degli editori di software | Gli sviluppatori di software possono includere SafeKit nei loro prodotti. L'installazione può essere eseguita senza interazione da parte dell'utente e può essere automatizzata tramite script.  
Centinaia di cluster distribuiti su molti siti | SafeKit è progettato per organizzazioni con numerose filiali.  
  
I seguenti siti necessitano di elevata disponibilità anche in assenza di un data center:

Industria | Sito tipico | Applicazioni critiche  
---|---|---  
Sicurezza fisica e sorveglianza | Edifici, campus, aeroporti | VMS — Milestone, Genetec, Hanwha, Siemens Siveillance  
Gestione degli edifici (BMS) | Edifici per uffici, ospedali, fabbriche | Siemens Desigo CC, Bosch BIS/BVMS  
Controllo elettronico degli accessi (EACS) | Strutture sicure, campus | Siemens SiPass, Nedap, Bosch AMS  
SCADA e controllo industriale | Fabbriche, sottostazioni, impianti idrici | Qualsiasi software SCADA, DCS o HMI in esecuzione su Windows o Linux  
controllo del traffico aereo (ATC) | Aeroporti, torri di controllo | Sistemi di gestione del controllo del traffico aereo e sistemi radar.  
Centri di controllo delle operazioni (OCC) | Metropolitana, ferrovia, snodi di trasporto pubblico | Segnalamento ferroviario e gestione delle stazioni  
Marittimo | Navi, imbarcazioni militari | Sistemi di navigazione, gestione del carico e di bordo  
Petrolio e gas | Piattaforme offshore, impianti remoti | Sistemi di controllo di processo e di sicurezza  
Telecomunicazioni | Siti di antenne 5G, nodi MEC | Server MEC (Multi-access edge computing)  
Assistenza sanitaria | Cliniche, centri di diagnosi remoti | Immagini mediche, dati dei pazienti, diagnostica a distanza  
Vedere al dettaglio | Negozi, filiali, magazzini | Gestione del punto vendita e dell'inventario  
Difesa | basi operative avanzate, unità sul campo | Sistemi di comando e comunicazione critici per la missione  
  
## Monitoraggio, gestione e avvisi {#monitoring-management-alerting}

Capacità | Dettagli  
---|---  
Console Web | Configura, monitora e gestisci i nodi del cluster tramite un'applicazione web o una Progressive Web App (PWA).  
Notifiche mobili | Ricevi notifiche dal browser quando lo stato di un modulo cambia.  
cronologia | Visualizza le modifiche di stato del modulo e gli eventi in ordine cronologico.  
Notifiche via e-mail | Un agente di posta elettronica integrato invia avvisi.  
Interfaccia a riga di comando | Utilizza l'interfaccia a riga di comando per scrivere script e automatizzare le attività.  
Gestione dei log | Ogni modulo e script ha i propri file di log. <span class="notranslate farm-term" translate="no">snapshots</span> dei moduli aiutano il team di supporto a indagare sui problemi.  
Integrazione con strumenti di monitoraggio | SafeKit registra gli eventi principali del cluster nel registro eventi di Windows o nel Syslog di Linux. Gli strumenti di monitoraggio possono raccogliere questi eventi e attivare avvisi tramite regole standard. Questa soluzione è compatibile con Nagios, Zabbix, Splunk e strumenti SIEM senza necessità di sviluppo personalizzato.  
  
## Sicurezza e conformità {#security-compliance}

Caratteristica | Dettagli  
---|---  
HTTPS | I certificati TLS proteggono l'accesso alla console web.  
Autenticazione utente | Account locali, LDAP, certificati (PKI) e OpenID Connect  
Ruoli utente | Configura le politiche di accesso per l'amministrazione, il controllo e il monitoraggio.  
Crittografia | Il traffico TCP utilizza TLS/SSL per la replica, la console web e i comandi distribuiti. Il traffico UDP utilizza la crittografia AES-128-CBC con SHA256 per <span class="notranslate farm-term" translate="no">heartbeats</span> e il protocollo interno safeadmin. SafeKit utilizza la libreria OpenSSL per la crittografia e Apache per il servizio web.  
Antivirus | La documentazione elenca i percorsi da escludere dalle scansioni antivirus.  
Sovranità | SafeKit è sviluppato in Francia da Eviden, parte del Gruppo Atos. Protegge le applicazioni Windows e Linux mantenendo i dati e i server presso la sede del cliente. Questo software ad alta disponibilità non dipende da un fornitore statunitense. SafeKit può contribuire a soddisfare i requisiti NIS2 per la continuità operativa e il ripristino di emergenza.
  
## Licenze {#licensing-model}

Aspetto | Dettagli  
---|---  
Tipo di pod | Una licenza perpetua si acquista una sola volta ed è associata a un nome host.  
Ambito della licenza | Una licenza per server (nodo)  
Attivazione della licenza | Le chiavi di licenza possono essere attivate anche senza accesso a Internet.  
Prova gratuita | La prova gratuita include tutte le funzionalità.  
Licenza gratuita per un mese | Disponibile per testare una prova di concetto  
  
## Supporto e manutenzione {#support-maintenance-slas}

### Assistenza e manutenzione standard con contratto di manutenzione attivo {#standard-support-maintenance-included-with-active-maintenance-contract}

Servizio | Dettagli  
---|---  
Accesso al portale di supporto | Il portale web è disponibile in qualsiasi momento, tutti i giorni dell'anno, per un massimo di quattro referenti tecnici nominativi.  
Orari di assistenza in diretta | Dal lunedì al venerdì, dalle 9:00 alle 17:00 presso il Centro di supporto europeo.  
Riconoscimento dell'incidente | Entro quattro ore lavorative dal Centro di supporto  
Aggiornamenti e miglioramenti | Tutti i service pack, gli aggiornamenti e gli upgrade sono inclusi senza costi aggiuntivi.  
sostituzione della chiave di licenza | Con un contratto di supporto attivo, la chiave di licenza può essere riassegnata in caso di modifica del nome host. Il trasferimento è limitato alla sostituzione di un server all'interno dello stesso progetto. È necessaria la previa autorizzazione scritta di Eviden.  
Accesso alla knowledge base | Accesso completo agli articoli della knowledge base, alle domande frequenti e alla documentazione online.  
Procedura di emergenza | SafeKit fornisce uno script wrapper per avviare o arrestare un'applicazione senza utilizzare le funzionalità di alta disponibilità di SafeKit . Questo script richiama gli script di avvio e arresto dell'applicazione. Inoltre, aggiunge o rimuove l'indirizzo IP virtuale quando necessario.  
Portale di supporto | <https://customercare.evidian.com>  
  
### Risorse gratuite senza contratto di supporto {#free-resources-no-contract-required}

Risorsa | Dettagli  
---|---  
Assistente di supporto AI | Utilizza [la chat basata sull'intelligenza artificiale SafeKit](</it/resources/safekit-support/#ai-support>) su safekit.eviden.com.   
Formazione e certificazione online | [Impara al tuo ritmo](</it/resources/safekit-on-line-training/>) con video gratuiti per una durata complessiva di circa 4 ore. Riceverai un certificato al termine del corso.  
Documentazione | [Qui trovi](</it/resources/safekit-free-trial/>) la guida per l'utente, le note di rilascio, la knowledge base e le guide rapide all'installazione.  
  
## Confronto con altre soluzioni {#comparison-vs-alternatives}

Criterio | SafeKit | Cluster di failover Microsoft (WSFC) | fotografo HA | Open Source [1]  
---|---|---|---|---  
È necessario uno storage condiviso (SAN/vSAN). | NO | SÌ | SÌ | NO  
Supporto per Windows | SÌ | SÌ | SÌ | NO  
Supporto Linux | SÌ | NO | SÌ | SÌ  
Implementazione in siti remoti | Eccellente | Complesso | Complesso | Complesso  
OEM | SÌ | NO | NO | NO  
Costo | Licenza perpetua per nodo | Server Windows e SAN | vSphere Enterprise e SAN | servizi di integrazione avanzati  
Configura reputazione | Pronto per la configurazione e l'utilizzo | Alto: Configurazione di Active Directory, SAN e witness. | Alto: configurazione di vCenter e storage condiviso | Alto: diversi prodotti separati da configurare  
Amministrazione | Un unico prodotto gestito tramite una console web. | Elevato: competenza in Active Directory e SAN | Elevato: dipendenza da vCenter | Alto: diversi prodotti separati da mantenere  
  
**[1]** Su Linux, sono necessari sei progetti open-source separati per fornire lo stesso set di funzionalità: Corosync, Pacemaker, DRBD, Keepalived, STONITH e HAProxy. SafeKit fornisce queste funzionalità in un unico prodotto sia per Windows che per Linux.

## Link utili {#quick-reference-links}

Risorsa | URL  
---|---  
Pagina iniziale del prodotto | [https://safekit.eviden.com/it/](</it/>)  
Panoramica tecnica (documento Word con testo e diagrammi) | [https://safekit.eviden.com/wp-content/uploads/documents/safekit-technical-overview-en.docx](</wp-content/uploads/documents/safekit-technical-overview-en.docx>)  
Prova gratuita | [https://safekit.eviden.com/it/resources/safekit-free-trial/](</it/resources/safekit-free-trial/>)  
Richiedi un preventivo | [https://safekit.eviden.com/it/safekit-pricing/](</it/safekit-pricing/>)  
Portale di supporto | <https://customercare.evidian.com>  
Supporto AI gratuito | [https://safekit.eviden.com/it/resources/safekit-support/](</it/resources/safekit-support/>)  
Formazione e certificazione gratuite | [https://safekit.eviden.com/it/resources/safekit-on-line-training/](</it/resources/safekit-on-line-training/>)  
Contattaci | [https://safekit.eviden.com/it/contact-us-for-safekit/](</it/contact-us-for-safekit/>)  
  

{{%  insert-safekit-4-buttons-it  %}}
