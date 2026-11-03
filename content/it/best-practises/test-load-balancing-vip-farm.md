---
title: "Test dell'indirizzo IP virtuale di bilanciamento del carico in un SafeKit farm grappolo"
canonical: "https://safekit.eviden.com/it/best-practises/test-load-balancing-vip-farm/"
description: "Scopri come eseguire i test SafeKit Bilanciare il carico tra i nodi del cluster e verificare il failover IP virtuale, il reindirizzamento GARP e il comportamento della rete."
category: "best-practises"
lang: "it"
topics: "Principi chiave, Prerequisito: il SafeKit mosaico, Test 1 – Distribuzione delle connessioni, Test 2 – Cambio del server di dispatching, Test 3 – Verifica del reindirizzamento GARP con arp -a, Test 4 – Verifica end-to-end con Wireshark (Windows) o tcpdump (Linux), Da quali postazioni di lavoro eseguire il test, Riepilogo dei risultati attesi, Risoluzione dei problemi"
---

# Test dell'indirizzo IP virtuale di bilanciamento del carico in un SafeKit <span class="notranslate farm-term" translate="no">farm</span> grappolo

Questa guida descrive come verificare che un SafeKit <span class="notranslate farm-term" translate="no">Farm</span> (<span class="notranslate farm-term" translate="no">Farm</span> Il modulo (bilanciamento del carico su un indirizzo IP virtuale) funziona correttamente nella tua rete: distribuzione delle connessioni tra i nodi e reindirizzamento dell'IP virtuale (VIP) quando il nodo di invio si arresta.

## 1. Principi chiave

**Prerequisito:** tutti i nodi del <span class="notranslate farm-term" translate="no">Farm</span> devono trovarsi nella stessa sottorete IP di livello 2: una LAN o una VLAN estesa tra siti remoti.

- L'IP virtuale (VIP) è configurato localmente su ciascun nodo del <span class="notranslate farm-term" translate="no">Farm</span>: viene impostato come alias dell'indirizzo IP fisico, sulla scheda di rete di quell'indirizzo, quando il <span class="notranslate farm-term" translate="no">Farm</span> viene avviato sul nodo.
- Un singolo nodo, il **server di invio**, riceve il traffico di rete per l'IP virtuale (VIP)`vmac_directed` configurazione, la SafeKit default): il suo indirizzo MAC è quello associato all'IP virtuale (VIP) nelle tabelle ARP (router, gateway, client nella stessa sottorete).
- Il filtro kernel di questo nodo distribuisce quindi le connessioni TCP tra i nodi del <span class="notranslate farm-term" translate="no">Farm</span>, di **riscrittura dell'indirizzo MAC di destinazione** dei pacchetti a quello del nodo di elaborazione (l'indirizzo IP di destinazione rimane l'IP virtuale (VIP)). Le risposte vengono inviate direttamente dal nodo che elabora la connessione al client.
- La distribuzione effettuata dal filtro è **deterministico**Il nodo di elaborazione viene determinato in base all'identità del client, secondo la regola di bilanciamento del carico configurata:
  - sulla **indirizzo IP del client** (`filter="on_addr"`): un determinato client viene sempre servito dallo stesso nodo, il che garantisce l'affinità di sessione;
  - sulla **porta TCP client** (`filter="on_port"`): ogni connessione TCP proveniente dallo stesso client può essere gestita da un nodo diverso. Questa è la regola utilizzata per il mosaico (sezione 2), che quindi mostra tutti i nodi di una singola workstation.
- Se il server di dispatching si arresta, un altro nodo assume questo ruolo e invia **GARP** (ARP gratuito) in modo che la rete associ l'indirizzo IP virtuale (VIP) al proprio indirizzo MAC.

Ciò che è necessario testare, quindi:

1. che le connessioni siano distribuite correttamente su tutti i nodi;
2. che la rete (router, gateway, virtualizzazione) tenga conto del GARP quando cambia il server di dispatching.

## 2. Prerequisito: il SafeKit mosaico

Il mosaico è una pagina di prova fornita da SafeKitApre numerose connessioni TCP verso l'indirizzo IP virtuale (VIP) e visualizza, per ciascuna di esse, il nome del nodo che ha risposto. Questo permette di avere una panoramica immediata della distribuzione.

1. Nel `userconfig.xml` Del <span class="notranslate farm-term" translate="no">Farm</span> modulo, nel `<vip>` sezione, aggiungi la regola di bilanciamento del carico sulla porta della SafeKit server web. Esempio con il SafeKit Server web in HTTP sulla porta 9010:

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   Se il SafeKit Il server web e la console sono stati convertiti in HTTPS; sostituire la porta 9010 con la 9453.

2. Applica la configurazione a tutti i nodi.
3. Da un browser su una workstation client **fuori dal <span class="notranslate farm-term" translate="no">Farm</span>**, collega a:

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   quindi inserisci il <span class="notranslate farm-term" translate="no">Farm</span> **nome del modulo** e avviare il test. Ogni cella del mosaico visualizza il nome del nodo che ha risposto alla connessione TCP, e a ciascun nodo è associato un colore per mostrare chiaramente i blocchi del mosaico gestiti dallo stesso nodo.

   In HTTPS, utilizzare `https://<VIP>:9453/safekit/mosaic.html`, con la regola di bilanciamento del carico sulla porta 9453.

Il test è descritto in dettaglio nel SafeKit 8.2 Guida per l'utente, sezione 4.3.5 "[Testare il bilanciamento del carico TCP su un indirizzo IP virtuale](https://safekit.eviden.com/resources/safekit-user-guide-82/#Mosaic)".

Guarda il video del test del mosaico in "[Dimostrazione del SafeKit <span class="notranslate farm-term" translate="no">farm</span> soluzione](/it/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/#demonstration-of-the-safekit-farm-solution)" sezione.

## 3. Test 1 – Distribuzione delle connessioni

**Passaggi**

1. Inizia il <span class="notranslate farm-term" translate="no">Farm</span> su tutti i nodi (stato UP).
2. Aprire il mosaico da una workstation client.

**Risultato atteso:** il mosaico mostra i nomi di **tutti i nodi** Del <span class="notranslate farm-term" translate="no">Farm</span>, con un colore diverso per ogni nodo di elaborazione.

Ciò dimostra che il router o gateway a monte raggiunge uno dei nodi tramite il suo indirizzo MAC e che tale nodo distribuisce correttamente le connessioni.

## 4. Test 2 – Modifica del server di dispatching

Questo test verifica che il <span class="notranslate farm-term" translate="no">Farm</span> continua a rispondere anche quando il server di dispatching si arresta.

**Passaggi**

1. Fermare il <span class="notranslate farm-term" translate="no">Farm</span>, vale a dire tutti i nodi in SafeKit.
2. Inizio **un singolo nodo**Questo nodo diventa il server di smistamento.
   → **Risultato atteso:** Il mosaico visualizza solo questo nodo.
3. Avvia gli altri nodi.
   → **Risultato atteso:** Il mosaico mostra tutti i nodi.
4. Fermare il **primi nodi**, quello che funge da server di smistamento.
   → **Risultato atteso:** Il mosaico mostra i nodi rimanenti.

> **Limitazioni di questo test:** un risultato corretto al passaggio 4 non dimostra che GARP funziona. Quando il <span class="notranslate farm-term" translate="no">Farm</span> Il modulo viene avviato sugli altri nodi (passaggio 3), l'indirizzo IP virtuale viene configurato su questi nodi, il che genera messaggi sulla rete che possono già reindirizzare l'associazione indirizzo IP virtuale/indirizzo MAC. Solo i test 3 e 4 testano effettivamente GARP.

> Arrestare qualsiasi altro nodo del <span class="notranslate farm-term" translate="no">Farm</span> (quello che non è il server di dispatching) testa solo la riconfigurazione della distribuzione.

## 5. Test 3 – Verifica del reindirizzamento GARP con `arp -a`

Insieme al test 4, questo test verifica effettivamente GARP: si annota l'indirizzo MAC del server di dispatching prima di arrestarlo, quindi si verifica che l'IP virtuale (VIP)/MAC L'associazione è cambiata in seguito.

Questo test è possibile solo se la workstation client che visualizza il mosaico si trova nella **stessa sottorete IP** come il <span class="notranslate farm-term" translate="no">Farm</span>.

Se c'è un router tra il client e il <span class="notranslate farm-term" translate="no">Farm</span>, la tabella ARP del client non contiene l'IP virtuale (VIP), ma l'indirizzo del gateway utilizzato per raggiungere il <span class="notranslate farm-term" translate="no">Farm</span>rete. In tal caso, verifica la tabella ARP del router o del gateway con il team di rete.

**Passaggi**

1. Inizia il <span class="notranslate farm-term" translate="no">Farm</span> su tutti i nodi.
2. Sulla workstation client, eseguire `arp -a` e annota l'indirizzo MAC associato all'IP virtuale (VIP). Esso identifica il server di dispatching.
3. Fermare il <span class="notranslate farm-term" translate="no">Farm</span> nodo che ha questo indirizzo MAC.
4. Verifica che il mosaico funzioni ancora con i nodi rimanenti.
5. Correre `arp -a` di nuovo per leggere il nuovo IP virtuale (VIP)/MAC associazione e identificazione del nuovo server di smistamento.

## 6. Test 4 – Verifica end-to-end con Wireshark (Windows) o tcpdump (Linux)

È possibile seguire una connessione TCP all'IP virtuale (VIP) catturando i pacchetti sul client e sul <span class="notranslate farm-term" translate="no">Farm</span> nodi: con Wireshark attivo Windows macchine e con tcpdump attivo Linux macchine.

Devi guardare il **Intestazioni MAC (Ethernet) dei pacchetti**, non solo gli indirizzi IP: il filtro kernel del server di dispatching distribuisce le connessioni tramite **riscrittura dell'indirizzo MAC di destinazione** dei pacchetti a quello del nodo di elaborazione. L'indirizzo IP di destinazione rimane l'IP virtuale (VIP) lungo tutto il percorso.

**Ecco cosa dovresti osservare per lo stesso pacchetto SYN:**

| Fare un passo | Dove catturare | Indirizzi MAC osservati |
|---|---|---|
| 1. Il client invia all'IP virtuale (VIP) | cliente | MAC del client → MAC del **server di invio** |
| 2. Il server di invio inoltra la connessione | server di invio | Invio MAC → MAC del **Nodo di elaborazione** |
| 3. Il nodo di elaborazione riceve | Nodo di elaborazione | Invio MAC → nodo MAC |
| 4. Il nodo risponde direttamente al client | Nodo di elaborazione | MAC del nodo → MAC del client |
| 5. Il cliente riceve la risposta | cliente | MAC del nodo → MAC del client |

> Se la workstation client si trova in una sottorete diversa da quella <span class="notranslate farm-term" translate="no">Farm</span>, il "MAC client" visto sul <span class="notranslate farm-term" translate="no">Farm</span> nodi è l'indirizzo MAC del **gateway** (router) che collega le due sottoreti, non quella della workstation client.

Ripeti l'acquisizione dopo aver arrestato il server di dispatching (test 2, passaggio 4): il passaggio 1 deve ora mostrare l'indirizzo MAC del **nuovo** server di smistamento.

## 7. Da quali postazioni di lavoro eseguire il test

Il comportamento dipende dal percorso di rete tra il client e il <span class="notranslate farm-term" translate="no">Farm</span>Eseguire i test 1 e 2 per ogni tipo di client rilevante per la propria architettura:

| Ubicazione del cliente | Cosa verifica il test |
|---|---|
| Cliente nel **stessa sottorete** come il <span class="notranslate farm-term" translate="no">Farm</span> | Aggiornamento delle tabelle ARP dei client da parte di GARP (3 test possibili) |
| Cliente in un **sottorete diversa** (router, gateway, rete virtuale hypervisor) | Gestione GARP da parte del router o del gateway |
| Macchina virtuale client **su un hypervisor che ospita anche un <span class="notranslate farm-term" translate="no">Farm</span> VM** | Comportamento dello switch virtuale dell'hypervisor, che gestisce anche lo switching e il routing interni. |

## 8. Sintesi dei risultati attesi

| Test | Azione | Risultato atteso |
|---|---|---|
| 1 | Tutti i nodi attivi, mosaico | Tutti i nodi appaiono |
| 2.2 | È stato avviato un singolo nodo | Appare solo questo nodo |
| 2.3 | Tutti i nodi sono stati avviati | Tutti i nodi appaiono |
| 2.4 | Server di dispatching arrestato | I nodi rimanenti appaiono, senza interruzioni durature |
| 3 | `arp -a` prima e dopo la fermata | L'indirizzo MAC associato all'IP virtuale (VIP) cambia |
| 4 | Acquisizione di Wireshark o tcpdump prima e dopo l'arresto | Il client invia all'indirizzo MAC del nuovo server di dispatching |

## 9. Risoluzione dei problemi

- **Il mosaico smette di rispondere dopo l'arresto del server di invio:** GARP non viene preso in considerazione dai dispositivi presenti sul percorso (router, gateway, switch virtuale). Verifica la gestione di GARP con il tuo team di rete.
- **Invio periodico di GARP:** IL `arpreroute="on"` attributo dell' `<vip>` sezione (con `arpinterval` E `arpelapse`) invia regolarmente GARP ai VIP. Vedi la Guida per l'utente, sezione 13.6.4 "[`<vip>` sintassi](https://safekit.eviden.com/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax)".
- **Diagnosi IP virtuale (VIP) ↔ Risoluzione MAC:** vedere la Guida per l'utente, sezione 7.24 "[Risoluzione dei problemi relativi all'indirizzo IP virtuale (VIP) ↔ MAC](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Issue_with_VIP)", e sezione 7.15 "[<span class="notranslate farm-term" translate="no">Farm</span> modulo UP (Pronto) ma problema di bilanciamento del carico in un <span class="notranslate farm-term" translate="no">Farm</span>](<https://safekit.eviden.com/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>)".

## Dimostrazione del SafeKit <span class="notranslate farm-term" translate="no">farm</span> soluzione {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-it  %}}

Per il failover primario/di backup con un indirizzo IP virtuale, vedere [Test dell'indirizzo IP virtuale di un SafeKit mirror grappolo](/it/best-practises/test-primary-backup-vip-mirror/).

{{%  insert-safekit-4-buttons-it  %}}
