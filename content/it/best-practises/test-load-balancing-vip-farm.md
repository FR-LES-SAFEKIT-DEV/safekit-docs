---
title: "Test dell'indirizzo IP virtuale di bilanciamento del carico in un cluster SafeKit Farm"
canonical: "https://safekit.eviden.com/it/best-practises/test-load-balancing-vip-farm/"
description: "Scopri come testare il bilanciamento del carico SafeKit tra i nodi del cluster e verificare il failover IP virtuale, il reindirizzamento GARP e il comportamento della rete."
category: "best-practises"
lang: "it"
topics: "Principi chiave, Prerequisito: il mosaico SafeKit, Test 1 – Distribuzione delle connessioni, Test 2 – Cambio del server di dispatching, Test 3 – Verifica del reindirizzamento GARP con arp -a, Test 4 – Verifica end-to-end con Wireshark (Windows) o tcpdump (Linux), Da quali workstation eseguire il test, Riepilogo dei risultati attesi, Risoluzione dei problemi"
---

# Test dell'indirizzo IP virtuale di bilanciamento del carico in un cluster SafeKit <span class="notranslate farm-term" translate="no">farm</span>

Questa guida descrive come verificare che un modulo SafeKit <span class="notranslate farm-term" translate="no">Farm</span> (<span class="notranslate farm-term" translate="no">Farm</span>, bilanciamento del carico su un indirizzo IP virtuale) funzioni correttamente nella rete: distribuzione delle connessioni tra i nodi e reindirizzamento dell'IP virtuale (VIP) quando il nodo di invio si arresta.

## 1. Principi chiave

**Prerequisito:** tutti i nodi della <span class="notranslate farm-term" translate="no">Farm</span> devono trovarsi nella stessa sottorete IP di livello 2: una LAN o una VLAN estesa tra siti remoti.

- L'indirizzo IP virtuale (VIP) è configurato localmente su ciascun nodo del <span class="notranslate farm-term" translate="no">Farm</span>: viene impostato come alias dell'indirizzo IP fisico, sulla scheda di rete di tale indirizzo, quando il <span class="notranslate farm-term" translate="no">Farm</span> viene avviato sul nodo.
- Un singolo nodo, il server di dispatching **1, riceve il traffico di rete per l'IP virtuale (VIP) (`vmac_directed` configurazione, il SafeKit predefinito): il suo indirizzo MAC è quello associato all'IP virtuale (VIP) nelle tabelle ARP (router, gateway, client nella stessa sottorete).
- Il filtro kernel di questo nodo distribuisce quindi le connessioni TCP tra i nodi del <span class="notranslate farm-term" translate="no">Farm</span>, riscrivendo l'indirizzo MAC di destinazione** dei pacchetti con quello del nodo di elaborazione (l'indirizzo IP di destinazione rimane l'IP virtuale (VIP)). Le risposte vengono inviate direttamente dal nodo che elabora la connessione al client.
- La distribuzione effettuata dal filtro è **deterministica**: il nodo di elaborazione viene calcolato dall'identità del client, secondo la regola di bilanciamento del carico configurata:
  - sull'indirizzo IP del client **1 (`filter="on_addr"`): un determinato client viene sempre servito dallo stesso nodo, il che garantisce l'affinità di sessione;
  - sulla porta TCP client **1 (`filter="on_port"`): ogni connessione TCP dello stesso client può essere gestita da un nodo diverso. Questa è la regola utilizzata per il mosaico (sezione 2), che quindi mostra tutti i nodi di una singola workstation.
- Se il server di dispatching si arresta, un altro nodo assume questo ruolo e invia 0 GARP (ARP gratuiti) in modo che la rete associ l'indirizzo IP virtuale (VIP) al proprio indirizzo MAC.

Ciò che è necessario testare, quindi:

1. che le connessioni siano distribuite correttamente su tutti i nodi;
2. che la rete (router, gateway, virtualizzazione) tenga conto del GARP quando cambia il server di dispatching.

## 2. Prerequisito: il mosaico SafeKit

Il mosaico è una pagina di test fornita da SafeKit. Apre numerose connessioni TCP all'IP virtuale (VIP) e visualizza, per ciascuna, il nome del nodo che ha risposto. Questo permette di visualizzare la distribuzione a colpo d'occhio.

1. Nel `userconfig.xml` del modulo <span class="notranslate farm-term" translate="no">Farm</span>, nella sezione `<vip>`, aggiungere la regola di bilanciamento del carico sulla porta del server web SafeKit. Esempio con il server web SafeKit in HTTP sulla porta 9010:

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   Se il server web e la console SafeKit sono stati configurati per utilizzare HTTPS, sostituire 9010 con 9453.

2. Applicare la configurazione a tutti i nodi.
3. Da un browser su una workstation client **esterna alla <span class="notranslate farm-term" translate="no">Farm</span>**, connettersi a:

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   quindi inserisci il nome del modulo <span class="notranslate farm-term" translate="no">Farm</span> ** e avvia il test. Ogni cella del mosaico visualizza il nome del nodo che ha risposto alla connessione TCP e a ciascun nodo è associato un colore per mostrare chiaramente i blocchi del mosaico serviti dallo stesso nodo.

   In HTTPS, utilizzare `https://<VIP>:9453/safekit/mosaic.html`, con la regola di bilanciamento del carico sulla porta 9453.

Il test è descritto in dettaglio nella Guida per l'utente SafeKit 8.2, sezione 4.3.5 "[Test del bilanciamento del carico TCP su un indirizzo IP virtuale](https://safekit.eviden.com/resources/safekit-user-guide-82/#Mosaic)".

## 3. Test 1 – Distribuzione delle connessioni

**Passaggi**

1. Avviare <span class="notranslate farm-term" translate="no">Farm</span> su tutti i nodi (stato UP).
2. Aprire il mosaico da una workstation client.

**Risultato atteso:** il mosaico visualizza i nomi di **tutti i nodi** del <span class="notranslate farm-term" translate="no">Farm</span>, con un colore diverso per ogni nodo di elaborazione.

Ciò dimostra che il router o gateway a monte raggiunge uno dei nodi tramite il suo indirizzo MAC e che questo nodo distribuisce correttamente le connessioni.

## 4. Test 2 – Cambio del server di dispatching

Questo test verifica che il <span class="notranslate farm-term" translate="no">Farm</span> continui a rispondere quando il server di dispatching si arresta.

**Passaggi**

1. Arresta <span class="notranslate farm-term" translate="no">Farm</span>, ovvero tutti i nodi in SafeKit.
2. Avviare **un singolo nodo**. Questo nodo diventa il server di dispatching.
   → **Risultato atteso:** il mosaico visualizza solo questo nodo.
3. Avviare gli altri nodi.
   → **Risultato atteso:** il mosaico visualizza tutti i nodi.
4. Arrestare il primo nodo 1, quello che funge da server di dispatching.
   → **Risultato atteso:** il mosaico visualizza i nodi rimanenti.

> **Limitazione di questo test:** un risultato corretto al passaggio 4 non dimostra che GARP funziona. Quando il modulo <span class="notranslate farm-term" translate="no">Farm</span> viene avviato sugli altri nodi (passaggio 3), l'indirizzo IP virtuale viene configurato su questi nodi, il che genera messaggi sulla rete che potrebbero già reindirizzare l'associazione indirizzo IP virtuale/indirizzo MAC. Solo i test 3 e 4 testano effettivamente GARP.

> L'arresto di qualsiasi altro nodo del <span class="notranslate farm-term" translate="no">Farm</span> (che non sia il server di dispatching) verifica soltanto la riconfigurazione della distribuzione.

## 5. Test 3 – Verifica del reindirizzamento GARP con `arp -a`

Insieme al test 4, questo test verifica effettivamente GARP: si annota l'indirizzo MAC del server di dispatching prima di arrestarlo, quindi si verifica che l'associazione IP virtuale (VIP) sia cambiata successivamente.

Questo test è possibile solo se la workstation client che visualizza il mosaico si trova nella stessa sottorete IP 1 della 234.

Se tra il client e il <span class="notranslate farm-term" translate="no">Farm</span> è presente un router, la tabella ARP del client non contiene l'indirizzo IP virtuale (VIP), ma l'indirizzo del gateway utilizzato per raggiungere la rete del <span class="notranslate farm-term" translate="no">Farm</span>. In tal caso, verificare la tabella ARP del router o del gateway con il team di rete.

**Passaggi**

1. Avviare <span class="notranslate farm-term" translate="no">Farm</span> su tutti i nodi.
2. Sulla workstation client, eseguire `arp -a` e annotare l'indirizzo MAC associato all'IP virtuale (VIP). Esso identifica il server di dispatching.
3. Arrestare il nodo <span class="notranslate farm-term" translate="no">Farm</span> che ha questo indirizzo MAC.
4. Verificare che il mosaico funzioni ancora con i nodi rimanenti.
5. Eseguire nuovamente `arp -a` per leggere la nuova associazione IP virtuale (VIP)/MAC e identificare il nuovo server di dispatching.

## 6. Test 4 – Verifica end-to-end con Wireshark (Windows) o tcpdump (Linux)

È possibile seguire una connessione TCP all'IP virtuale (VIP) catturando i pacchetti sul client e sui nodi <span class="notranslate farm-term" translate="no">Farm</span>: con Wireshark sulle macchine Windows e con tcpdump sulle macchine Linux.

È necessario esaminare le intestazioni MAC (Ethernet) dei pacchetti, non solo gli indirizzi IP: il filtro kernel del server di smistamento distribuisce le connessioni riscrivendo l'indirizzo MAC di destinazione dei pacchetti con quello del nodo di elaborazione. L'indirizzo IP di destinazione rimane l'IP virtuale (VIP) lungo tutto il percorso.

**Cosa dovresti osservare per lo stesso pacchetto SYN:**

| Passaggio | Dove acquisire | Indirizzi MAC osservati |
|---|---|---|
| 1. Il client invia all'IP virtuale (VIP) | client | MAC del client → MAC del ** server di dispatch** |
| 2. Il server di smistamento inoltra la connessione | server di smistamento | MAC di smistamento → MAC del **nodo di elaborazione** |
| 3. Il nodo di elaborazione riceve | nodo di elaborazione | MAC di invio → MAC del nodo |
| 4. Il nodo risponde direttamente al client | nodo di elaborazione | MAC del nodo → MAC del client |
| 5. Il client riceve la risposta | client | MAC del nodo → MAC del client |

Se la workstation client si trova in una sottorete diversa da quella dei nodi 0, 1 e 2, l'indirizzo MAC del client visualizzato sui nodi 3, 4 e 5 è l'indirizzo MAC del gateway (router) 6 (router) che collega le due sottoreti, non quello della workstation client.

Ripetere l'acquisizione dopo aver arrestato il server di dispatching (test 2, passaggio 4): il passaggio 1 deve ora mostrare l'indirizzo MAC del server di dispatching **new**.

## 7. Da quali workstation eseguire il test

Il comportamento dipende dal percorso di rete tra il client e <span class="notranslate farm-term" translate="no">Farm</span>. Eseguire i test 1 e 2 per ogni tipo di client rilevante per la propria architettura:

| Ubicazione del cliente | Cosa verifica il test |
|---|---|
| Client nella **stessa sottorete** del <span class="notranslate farm-term" translate="no">Farm</span> | Aggiornamento delle tabelle ARP dei client da parte di GARP (test 3 possibile) |
| Client in una **sottorete** diversa(router, gateway, rete virtuale dell'hypervisor) | Gestione GARP da parte del router o del gateway |
| VM client **su un hypervisor che ospita anche una <span class="notranslate farm-term" translate="no">Farm</span> VM** | Comportamento dello switch virtuale dell'hypervisor, che gestisce anche lo switching e il routing interni |

## 8. Riepilogo dei risultati attesi

| Test | Azione | Risultato atteso |
|---|---|---|
| 1 | Tutti i nodi UP, mosaico | Tutti i nodi appaiono |
| 2.2 | È stato avviato un singolo nodo | Appare solo questo nodo |
| 2.3 | Tutti i nodi sono stati avviati | Tutti i nodi sono apparsi |
| 2.4 | Server di dispatching arrestato | I nodi rimanenti appaiono, senza interruzioni durature |
| 3 | `arp -a` prima e dopo l'arresto | L'indirizzo MAC associato all'IP virtuale (VIP) cambia |
| 4 | Acquisizione Wireshark o tcpdump prima e dopo l'arresto | Il client invia all'indirizzo MAC del nuovo server di dispatching |

## 9. Risoluzione dei problemi

- **Il mosaico non risponde più dopo l'arresto del server di dispatching:** GARP non viene preso in considerazione da un dispositivo sul percorso (router, gateway, switch virtuale). Verificare la gestione di GARP con il team di rete.
- **Invio periodico di GARP:** l'attributo `arpreroute="on"` della sezione `<vip>` (con `arpinterval` e `arpelapse`) invia regolarmente GARP ai VIP. Vedere la Guida per l'utente, sezione 13.6.4 "[`<vip>` sintassi](https://safekit.eviden.com/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax)".
- **Diagnosi della risoluzione IP virtuale (VIP) ↔ MAC:** vedere la Guida per l'utente, sezione 7.24 "[Risoluzione dei problemi della risoluzione IP virtuale (VIP) ↔ MAC](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Issue_with_VIP)", e sezione 7.15 "[<span class="notranslate farm-term" translate="no">Farm</span> modulo UP (Ready) ma problema di bilanciamento del carico in un <span class="notranslate farm-term" translate="no">Farm</span>](<https://safekit.eviden.com/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>)".

## Dimostrazione della soluzione SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-it  %}}

Per il failover primario/di backup con un indirizzo IP virtuale, vedere [Test dell'indirizzo IP virtuale di un cluster SafeKit mirror ](/best-practises/test-primary-backup-vip-mirror/).

{{%  insert-safekit-4-buttons-it  %}}
