---
title: "SafeKit: software per l’alta disponibilità per Windows e Linux, senza SAN"
canonical: "https://safekit.eviden.com/it/"
description: "SafeKit è il software HA SANless tutto in uno per Windows e Linux. Ottieni replica sincrona in tempo reale, failover automatico e bilanciamento del carico in un unico pacchetto semplice ed economico. Inizia la tua prova gratuita di 30 giorni."
category: "home"
lang: "it"
topics: "Cosa fa SafeKit, Scegli il tuo livello di protezione, Moduli predefiniti per le tue applicazioni, Casi d’uso dei clienti, Prezzi semplici e prevedibili, Conosci i limiti prima di iniziare, Videoteca SafeKit, 🔍 Esplora SafeKit"
translation: "translate_md 2026-11-05.8 | glossaire 2026-11-05.12 | Translation LLM | 10 expressions"
---

# SafeKit: software per l’alta disponibilità per Windows e Linux, senza SAN {#safekit-high-availability-software-for-windows-and-linux-without-a-san}

SafeKit trasforma due server standard in un cluster ad alta disponibilità SANless che mantiene le tue applicazioni in esecuzione. Replica i dati in tempo reale, riavvia l’applicazione sul secondo server in caso di guasto del primo e reintegra automaticamente il server guasto una volta riparato. Lo installi sui server che già possiedi, senza necessità di storage condiviso e senza competenze di clustering.

La replica è sincrona, quindi nessun dato viene perso in caso di guasto di un server e l’applicazione torna operativa in circa un minuto o meno. Le licenze sono perpetue e il prezzo è per server.

<a class="btn-download" href="/it/resources/safekit-free-trial/">Inizia la tua prova gratuita di 30 giorni ›</a>


## Cosa fa SafeKit {#features}

SafeKit combina quattro funzioni in un unico prodotto, gestibile da un’unica console web o da un’unica riga di comando, su Windows e Linux.

| Funzione | Come funziona |
|---|---|
| **Replicazione in tempo reale** | Ogni modifica apportata ai file viene copiata sul secondo server in tempo reale, in modo che un guasto non comporti la perdita di dati. |
| **Failover automatico** | SafeKit rileva l’errore, sposta l’indirizzo IP virtuale e riavvia l’applicazione sull’altro server. |
| **Failback automatico** | Il server riparato si risincronizza in background mentre l’applicazione continua a funzionare. |
| **Bilanciamento del carico** | Il bilanciamento del carico di rete viene eseguito all’interno dei server, senza un bilanciatore del carico o un proxy esterni. |

![Console web SafeKit che monitora un cluster mirror a 2 nodi per Windows e Linux, con i server PRIM e SECOND e la replica attiva dei dati.](/wp-content/uploads/2026/05/mirror-monitoring-prim-second.png)

Non sono necessari SAN, disco di quorum, Active Directory o edizioni Enterprise del sistema operativo o del database.

<a class="btn-download" href="/it/architectures/">Esplora le architetture dei cluster ›</a>


## Scegli il tuo livello di protezione {#protection-levels}

**HA applicativa** (`mirror.safe`, `farm.safe` e i moduli applicativi) replica solo i dati dell’applicazione e riavvia l’applicazione sul secondo server. Richiede di sapere quali servizi riavviare, quali cartelle replicare in tempo reale e quale indirizzo IP virtuale utilizzare per il failover. Funziona su server fisici, in macchine virtuali su tutti gli hypervisor, inclusi VMware, Hyper-V e KVM, e nel cloud, e offre il ripristino più rapido.

**HA delle VM** (`hyperv.safe`, `kvm.safe`) replica e failover dell’intera macchina virtuale, quindi non è necessario sapere come funziona l’applicazione. È adatto ad ambienti con diverse applicazioni distribuite su più VM.

<a class="btn-download" href="/it/best-practises/vm-ha-vs-application-ha/">Confronto tra HA applicativa e HA delle VM ›</a>


## Moduli preconfezionati per le tue applicazioni {#modules}

I moduli preconfigurati sono gratuiti e inclusi nel prodotto. Ciascuno di essi definisce quali servizi riavviare e quali cartelle replicare per una determinata applicazione.

- **Database:** SQL Server, PostgreSQL, Oracle, MySQL, MariaDB, Firebird
- **Web:** Apache, IIS, NGINX
- **VM e container:** Hyper-V, KVM, Docker, Podman, Kubernetes (k3s)
- **Cloud:** AWS, Azure, GCP e altri cloud
- **Sicurezza fisica e settore:** Milestone XProtect, Genetec, Nedap, Bosch, Hanwha, Siemens

<a class="btn-download" href="/it/solutions/">Sfoglia tutte le soluzioni e i moduli ›</a>


## Casi d’uso dei clienti {#use-cases}

- **Gestione video (VMS):** mantiene disponibili i video in diretta e registrati durante un’interruzione del server. Utilizzato con Milestone, Genetec e Hanwha.
- **Controllo accessi (EACS):** mantiene le credenziali e gli allarmi sempre disponibili. Utilizzato con Hirsch Microsesame, Nedap AEOS e Siemens SiPass.
- **SCADA e industria:** mantiene gli operatori al controllo delle linee di produzione, ad esempio le tostatrici di caffè Probat e le macchine smistatrici di bagagli ALSTEF.
- **Gestione degli edifici (BMS):** mantiene in funzione i sistemi di riscaldamento, ventilazione e climatizzazione, di sicurezza e di gestione energetica. Utilizzato con Siemens Desigo CC e Bosch BIS.
- **Controllo del traffico aereo (ATC):** mantiene i controllori collegati alle applicazioni critiche del piazzale aeroportuale, ad esempio con ADB SafeGate.
- **Centro di controllo operativo (OCC) della metropolitana:** mantiene la supervisione disponibile per le linee della metropolitana di Parigi automatizzate e senza conducente.
- **Siti perimetrali:** trasforma due server standard in un cluster HA in assenza di un data center.
- **Editori di software (OEM):** aggiungono un’elevata disponibilità al proprio catalogo come opzione solo software.

<a class="btn-download" href="/it/use-cases/">Esplora tutti i casi d’uso ›</a>


## Prezzi semplici e prevedibili {#pricing}

SafeKit viene venduto con una licenza perpetua, quindi non è previsto alcun abbonamento obbligatorio. Il prezzo dipende solo dal numero di server, non dai core o dai socket della CPU, e tutti i moduli applicativi sono gratuiti. Funziona anche con le edizioni standard di Windows, Linux e dei vostri database, quindi non dovrete pagare per le edizioni Enterprise.

<a class="btn-download" href="/it/safekit-pricing/">Richiedi un preventivo ›</a>


## Conosci i limiti prima di iniziare {#limits}

SafeKit è progettato per la semplicità, non per ogni caso. È adatto per un massimo di alcuni terabyte di dati replicati, meno di 1.000.000 di file, fino a 32 VM quando si utilizza HA delle VM e due nodi sulla stessa LAN o VLAN con bassa latenza (tipicamente inferiore a 5 ms di andata e ritorno).

Per volumi maggiori, un’opzione migliore è l’archiviazione condivisa o un altro approccio.

<a class="btn-download" href="/it/product/#safekit-ha-limitations">Visualizza l’elenco completo delle limitazioni ›</a>


{{%  insert-safekit-videos-table-it  %}}

{{%  insert-safekit-hub-it  %}}

{{%  insert-safekit-4-buttons-it  %}}
