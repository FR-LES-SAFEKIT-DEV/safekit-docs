---
title: "SafeKit: software di alta affidabilità per Windows e Linux, senza SAN"
canonical: "https://safekit.eviden.com/it/"
description: "SafeKit è il software all-in-one di alta affidabilità senza SAN per Windows e Linux. Offre replica sincrona in tempo reale, failover automatico e bilanciamento del carico in un pacchetto semplice e conveniente. Inizia la prova gratuita di 30 giorni."
category: "home"
lang: "it"
topics: "Cosa offre SafeKit, Scegli il livello di protezione, Moduli pronti all'uso per le tue applicazioni, Casi d'uso dei clienti, Prezzi semplici e prevedibili, Conosci i limiti prima di iniziare, Raccolta di video SafeKit, 🔍 Hub di navigazione SafeKit per l'alta affidabilità"
---

# SafeKit: software di alta affidabilità per Windows e Linux, senza SAN {#safekit-high-availability-software-for-windows-and-linux-without-a-san}

SafeKit trasforma due server standard in un cluster di alta affidabilità senza SAN che mantiene operative le applicazioni. Replica i dati in tempo reale, riavvia l'applicazione sul secondo server se il primo si guasta e reintegra automaticamente il server riparato. Si installa sui server già in uso, senza storage condiviso né competenze specifiche sui cluster.

La replica è sincrona: in caso di guasto del server non si perdono dati e l'applicazione torna disponibile in circa un minuto o meno. Le licenze sono perpetue e il prezzo è calcolato per server.

<a class="btn-download" href="/it/resources/safekit-free-trial/">Inizia la prova gratuita di 30 giorni ›</a>

## Cosa offre SafeKit {#features}

SafeKit riunisce quattro funzioni in un unico prodotto, gestito da una console web o da una riga di comando, su Windows e Linux.

| Funzione | Come funziona |
|---|---|
| **Replica in tempo reale** | Ogni modifica ai file viene copiata sul secondo server appena avviene, evitando la perdita di dati in caso di guasto. |
| **Failover automatico** | SafeKit rileva il guasto, sposta l'indirizzo IP virtuale e riavvia l'applicazione sull'altro server. |
| **Failback automatico** | Il server riparato si risincronizza in background mentre l'applicazione continua a funzionare. |
| **Bilanciamento del carico** | Il bilanciamento del carico di rete viene eseguito sui server, senza bilanciatori o proxy esterni. |

![Console web SafeKit che monitora un cluster mirror a due nodi per Windows e Linux, con i server PRIM e SECOND e la replica attiva dei dati](/wp-content/uploads/2026/05/mirror-monitoring-prim-second.png)

Non servono SAN, dischi di quorum, Active Directory o edizioni Enterprise del sistema operativo o del database.

<a class="btn-download" href="/it/architectures/">Scopri le architetture dei cluster ›</a>

## Scegli il livello di protezione {#protection-levels}

L'**alta affidabilità applicativa** (`mirror.safe`, `farm.safe` e i moduli applicativi) replica solo i dati dell'applicazione e la riavvia sul secondo server. Richiede di sapere quali servizi riavviare, quali cartelle replicare in tempo reale e quale indirizzo IP virtuale commutare. Funziona su server fisici, macchine virtuali con tutti gli hypervisor, inclusi VMware, Hyper-V e KVM, e nel cloud, offrendo il ripristino più rapido.

L'**alta affidabilità delle VM** (`hyperv.safe`, `kvm.safe`) replica e commuta l'intera macchina virtuale, senza richiedere la conoscenza del funzionamento dell'applicazione. È adatta agli ambienti con più applicazioni distribuite su più VM.

<a class="btn-download" href="/it/best-practises/vm-ha-vs-application-ha/">Confronta l'alta affidabilità applicativa e delle VM ›</a>

## Moduli pronti all'uso per le tue applicazioni {#modules}

I moduli preconfigurati sono gratuiti e inclusi nel prodotto. Ognuno definisce i servizi da riavviare e le cartelle da replicare per una determinata applicazione.

- **Database:** SQL Server, PostgreSQL, Oracle, MySQL, MariaDB, Firebird
- **Web:** Apache, IIS, NGINX
- **VM e container:** Hyper-V, KVM, Docker, Podman, Kubernetes (k3s)
- **Cloud:** AWS, Azure, GCP e altri cloud
- **Sicurezza fisica e industria:** Milestone XProtect, Genetec, Nedap, Bosch, Hanwha, Siemens

<a class="btn-download" href="/it/solutions/">Consulta tutte le soluzioni e i moduli ›</a>

## Casi d'uso dei clienti {#use-cases}

- **Gestione video (VMS):** mantiene disponibili i video in diretta e registrati in caso di guasto del server. Utilizzato con Milestone, Genetec e Hanwha.
- **Controllo accessi (EACS):** mantiene sempre disponibili credenziali e allarmi. Utilizzato con Hirsch Microsesame, Nedap AEOS e Siemens SiPass.
- **SCADA e industria:** mantiene il controllo delle linee di produzione, ad esempio nelle torrefazioni Probat e nei sistemi di smistamento bagagli ALSTEF.
- **Gestione degli edifici (BMS):** mantiene operativi i sistemi HVAC, di sicurezza ed energetici. Utilizzato con Siemens Desigo CC e Bosch BIS.
- **Controllo del traffico aereo (ATC):** mantiene i controllori collegati alle applicazioni critiche lato pista, ad esempio con ADB SafeGate.
- **Centro operativo metropolitano (OCC):** mantiene disponibile la supervisione delle linee metropolitane automatizzate e senza conducente di Parigi.
- **Sedi Edge:** trasforma due server standard in un cluster HA anche dove non è presente un data center.
- **Produttori di software (OEM):** aggiungono l'alta affidabilità al catalogo come opzione software.

<a class="btn-download" href="/it/use-cases/">Scopri tutti i casi d'uso ›</a>

## Prezzi semplici e prevedibili {#pricing}

SafeKit viene venduto con una licenza perpetua, senza abbonamento obbligatorio. Il prezzo dipende solo dal numero di server, non dai core o dai socket della CPU, e tutti i moduli applicativi sono gratuiti. Funziona inoltre con le edizioni standard di Windows, Linux e dei database, senza dover acquistare edizioni Enterprise.

<a class="btn-download" href="/it/safekit-pricing/">Richiedi un preventivo ›</a>

## Conosci i limiti prima di iniziare {#limits}

SafeKit è progettato per la semplicità, non per ogni situazione. È adatto a pochi terabyte di dati replicati, meno di 1.000.000 di file, fino a 32 VM con l'alta affidabilità VM e due nodi sulla stessa LAN o VLAN a bassa latenza (in genere meno di 5 ms andata e ritorno).

Per volumi più grandi, è preferibile usare storage condiviso o un approccio diverso.

<a class="btn-download" href="/it/product/#safekit-ha-limitations">Consulta l'elenco completo dei limiti ›</a>

{{%  insert-safekit-videos-table-it  %}}

{{%  insert-safekit-hub-it  %}}
