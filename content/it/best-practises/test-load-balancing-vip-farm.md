---
title: "Test dell'indirizzo IP virtuale di bilanciamento del carico in un cluster farm SafeKit"
canonical: "https://safekit.eviden.com/it/best-practises/test-load-balancing-vip-farm/"
description: "Scopri come testare il bilanciamento del carico SafeKit tra i nodi del cluster e verificare il failover IP virtuale, il reindirizzamento GARP e il comportamento della rete."
category: "best-practises"
lang: "it"
topics: "Principi chiave, Prerequisito: il mosaico SafeKit , Test 1 – Distribuzione delle connessioni, Test 2 – Modifica del server di dispatching, Test 3 – Verifica del reindirizzamento GARP con arp -a, Test 4 – Verifica end-to-end con Wireshark ( Windows ) o tcpdump ( Linux ), Da quali workstation eseguire il test, Riepilogo dei risultati attesi, Risoluzione dei problemi"
---

# Test dell'indirizzo IP virtuale di bilanciamento del carico in un cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit

Questa guida descrive come verificare il corretto funzionamento di una SafeKit <span class="notranslate farm-term" translate="no">Farm</span> (modulo <span class="notranslate farm-term" translate="no">Farm</span> , bilanciamento del carico su un indirizzo IP virtuale) nella rete: distribuzione delle connessioni tra i nodi e reindirizzamento dell'indirizzo IP virtuale ( VIP ) quando il nodo di dispatching si arresta.

## 1. Principi chiave

**Prerequisito:** tutti i nodi della <span class="notranslate farm-term" translate="no">Farm</span> devono trovarsi nella stessa sottorete IP di livello 2: una LAN o una VLAN estesa tra siti remoti.

- L' IP virtuale ( VIP ) viene configurato localmente su ciascun nodo della <span class="notranslate farm-term" translate="no">Farm</span> : viene impostato come alias dell'indirizzo IP fisico, sulla scheda di rete corrispondente, all'avvio della <span class="notranslate farm-term" translate="no">Farm</span> sul nodo.
- Un singolo nodo, il **server di dispatching** , riceve il traffico di rete per l' IP virtuale ( VIP ) (configurazione `vmac_directed` , predefinita di SafeKit ): il suo indirizzo MAC è quello associato IP virtuale ( VIP ) nelle tabelle ARP (router, gateway, client nella stessa sottorete).
- Il filtro kernel di questo nodo distribuisce quindi le connessioni TCP tra i nodi della <span class="notranslate farm-term" translate="no">Farm</span> , **riscrivendo l'indirizzo MAC di destinazione** dei pacchetti con quello del nodo di elaborazione (l'indirizzo IP di destinazione rimane l' IP virtuale ( VIP )). Le risposte vengono inviate direttamente dal nodo che elabora la connessione al client.
- La distribuzione effettuata dal filtro è **deterministica** : il nodo di elaborazione viene calcolato a partire dall'identità del client, secondo la regola di bilanciamento del carico configurata:
  - **sull'indirizzo IP del client** ( `filter="on_addr"` ): un determinato client viene sempre servito dallo stesso nodo, il che garantisce l'affinità di sessione;
  - sulla **porta TCP del client** ( `filter="on_port"` ): ogni connessione TCP dello stesso client può essere gestita da un nodo diverso. Questa è la regola utilizzata per il mosaico (sezione 2), che quindi mostra tutti i nodi di una singola workstation.
- Se il server di dispatching si arresta, un altro nodo assume questo ruolo e invia **GARPs** ( ARP gratuiti) in modo che la rete associ l' IP virtuale ( VIP ) al proprio indirizzo MAC .

Ciò che è necessario testare, quindi:

1. che le connessioni siano distribuite correttamente su tutti i nodi;
2. che la rete (router, gateway, virtualizzazione) tenga conto del GARP quando cambia il server di dispatching.

## 2. Prerequisito: il mosaico SafeKit

Il mosaico è una pagina di test fornita da SafeKit . Apre numerose connessioni TCP all'indirizzo IP virtuale ( VIP ) e visualizza, per ciascuna, il nome del nodo che ha risposto. Questo permette di avere una panoramica immediata della distribuzione.

1. Nel file `userconfig.xml` del modulo <span class="notranslate farm-term" translate="no">Farm</span> , nella sezione `<vip>` , aggiungere la regola di bilanciamento del carico sulla porta del server web SafeKit . Esempio con il server web SafeKit in HTTP sulla porta 9010:

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   Se il server web e la console SafeKit sono stati configurati per utilizzare HTTPS, sostituire 9010 con 9453.

2. Applica la configurazione a tutti i nodi.
3. Da un browser su una workstation client **esterna alla <span class="notranslate farm-term" translate="no">Farm</span>** , connettersi a:

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   Successivamente, inserisci il **nome del modulo** <span class="notranslate farm-term" translate="no">Farm</span> ed esegui il test. Ogni cella del mosaico visualizza il nome del nodo che ha risposto alla connessione TCP e a ciascun nodo è associato un colore per mostrare chiaramente i blocchi del mosaico gestiti dallo stesso nodo.

   In HTTPS, utilizzare `https://<VIP>:9453/safekit/mosaic.html` , con la regola di bilanciamento del carico sulla porta 9453.

Guarda il video del test a mosaico nella sezione "[Dimostrazione della soluzione SafeKit <span class="notranslate farm-term" translate="no">farm</span> ](/it/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/#demonstration-of-the-safekit-farm-solution) ".

## 3. Test 1 – Distribuzione delle connessioni

**Passaggi**

1. Avviare la <span class="notranslate farm-term" translate="no">Farm</span> su tutti i nodi (stato UP ).
2. Aprire il mosaico da una workstation client.

**Risultato atteso:** il mosaico visualizza i nomi di **tutti i nodi** della <span class="notranslate farm-term" translate="no">Farm</span> , con un colore diverso per ciascun nodo di elaborazione.

Ciò dimostra che il router o gateway a monte raggiunge uno dei nodi tramite il suo indirizzo MAC e che tale nodo distribuisce correttamente le connessioni.

## 4. Test 2 – Cambio del server di dispatching

Questo test verifica che la <span class="notranslate farm-term" translate="no">Farm</span> continui a rispondere anche quando il server di dispatching si arresta.

**Passaggi**

1. Arresta la <span class="notranslate farm-term" translate="no">Farm</span> , ovvero tutti i nodi in SafeKit .
2. Avvia **un singolo nodo** . Questo nodo diventerà il server di dispatching.
   → **Risultato atteso:** il mosaico visualizza solo questo nodo.
3. Avvia gli altri nodi.
   → **Risultato atteso:** il mosaico visualizza tutti i nodi.
4. Arresta il **primo nodo** , quello che funge da server di dispatching.
   → **Risultato atteso:** il mosaico visualizza i nodi rimanenti.

> **Limiti di questo test:** un risultato corretto al passaggio 4 non dimostra che GARP funzioni. Quando il modulo <span class="notranslate farm-term" translate="no">Farm</span> viene avviato sugli altri nodi (passaggio 3), l'indirizzo IP virtuale viene configurato su questi nodi, generando messaggi sulla rete che potrebbero già reindirizzare l'associazione tra indirizzo IP virtuale e indirizzo MAC . Solo i test 3 e 4 verificano effettivamente il funzionamento GARP .

> L'arresto di qualsiasi altro nodo della <span class="notranslate farm-term" translate="no">Farm</span> (diverso dal server di dispatching) serve solo a testare la riconfigurazione della distribuzione.

## 5. Test 3 – Verifica del reindirizzamento GARP con `arp -a`

Insieme al test 4, questo test verifica effettivamente GARP : si annota l'indirizzo MAC del server di dispatching prima di arrestarlo, quindi si verifica che l'associazione IP virtuale ( VIP )/ MAC sia cambiata successivamente.

Questo test è possibile solo se la workstation client che visualizza il mosaico si trova nella **stessa sottorete IP** della <span class="notranslate farm-term" translate="no">Farm</span> .

Se tra il client e la <span class="notranslate farm-term" translate="no">Farm</span> è presente un router, la tabella ARP del client non contiene l' IP virtuale ( VIP ), bensì l'indirizzo del gateway utilizzato per raggiungere la rete della <span class="notranslate farm-term" translate="no">Farm</span> . In tal caso, è necessario verificare la tabella ARP del router o del gateway con il team di rete.

**Passaggi**

1. Avvia la <span class="notranslate farm-term" translate="no">Farm</span> su tutti i nodi.
2. Sulla workstation client, eseguire `arp -a` e annotare l'indirizzo MAC associato all'indirizzo IP virtuale ( VIP ). Questo indirizzo identifica il server di dispatching.
3. Arresta il nodo <span class="notranslate farm-term" translate="no">Farm</span> che ha questo indirizzo MAC .
4. Verifica che il mosaico funzioni ancora con i nodi rimanenti.
5. Eseguire nuovamente `arp -a` per leggere la nuova associazione IP virtuale ( VIP )/ MAC e identificare il nuovo server di dispatching.

## 6. Test 4 – Verifica end-to-end con Wireshark ( Windows ) o tcpdump ( Linux )

È possibile tracciare una connessione TCP verso l' IP virtuale ( VIP ) catturando i pacchetti sul client e sui nodi <span class="notranslate farm-term" translate="no">Farm</span> : con Wireshark sui sistemi Windows e con tcpdump sui sistemi Linux .

È necessario esaminare le **intestazioni MAC (Ethernet) dei pacchetti** , non solo gli indirizzi IP : il filtro del kernel del server di smistamento distribuisce le connessioni **riscrivendo l'indirizzo MAC di destinazione** dei pacchetti con quello del nodo di elaborazione. L'indirizzo IP di destinazione rimane l' IP virtuale ( VIP ) lungo tutto il percorso.

**Ecco cosa dovresti osservare per lo stesso pacchetto SYN :**

| Passaggio | Dove acquisire | Indirizzi MAC osservati |
|---|---|---|
| 1. Il client invia IP virtuale ( VIP ) | client | MAC del client → MAC del **server di invio** |
| 2. Il server di smistamento inoltra la connessione | server di smistamento | MAC di smistamento → MAC del **nodo di elaborazione** |
| 3. Il nodo di elaborazione riceve | nodo di elaborazione | MAC di invio → MAC del nodo |
| 4. Il nodo risponde direttamente al client | nodo di elaborazione | MAC del nodo → MAC del client |
| 5. Il client riceve la risposta | client | MAC del nodo → MAC del client |

> Se la workstation client si trova in una sottorete diversa da quella del <span class="notranslate farm-term" translate="no">Farm</span> , l' MAC del client visualizzato sui nodi <span class="notranslate farm-term" translate="no">Farm</span> è l'indirizzo MAC del **gateway** (router) che collega le due sottoreti, non quello della workstation client.

Ripetere l'acquisizione dopo aver arrestato il server di dispatching (test 2, passaggio 4): il passaggio 1 deve ora mostrare l'indirizzo MAC del **nuovo** server di dispatching.

## 7. Da quali postazioni di lavoro eseguire il test

Il comportamento dipende dal percorso di rete tra il client e la <span class="notranslate farm-term" translate="no">Farm</span> . Esegui i test 1 e 2 per ogni tipo di client rilevante per la tua architettura:

| Ubicazione del cliente | Cosa verifica il test |
|---|---|
| Client nella **stessa sottorete** della <span class="notranslate farm-term" translate="no">Farm</span> | Aggiornamento delle tabelle ARP dei client da parte di GARP (3 test possibili) |
| Client in una **sottorete diversa** (router, gateway, rete virtuale dell'hypervisor) | Gestione GARP da parte del router o del gateway |
| Macchina virtuale client **su un hypervisor che ospita anche una macchina virtuale <span class="notranslate farm-term" translate="no">Farm</span>** | Comportamento dello switch virtuale dell'hypervisor, che gestisce anche lo switching e il routing interni |

## 8. Sintesi dei risultati attesi

| Test | Azione | Risultato atteso |
|---|---|---|
| 1 | Tutti i nodi UP , mosaico | Tutti i nodi appaiono |
| 2.2 | Avviato un singolo nodo | Viene visualizzato solo questo nodo |
| 2.3 | Tutti i nodi avviati | Tutti i nodi appaiono |
| 2.4 | Server di dispatching arrestato | I nodi rimanenti appaiono, senza interruzioni prolungate |
| 3 | `arp -a` prima e dopo l'arresto | L'indirizzo MAC associato IP virtuale ( VIP ) cambia |
| 4 | Acquisizione Wireshark o tcpdump prima e dopo l'arresto | Il client invia all'indirizzo MAC del nuovo server di dispatching |

## 9. Risoluzione dei problemi

- **Bitmap di bilanciamento del carico:** per i dettagli sul test e sulle bitmap di bilanciamento del carico, consultare la Guida per l'utente di SafeKit 8.2, sezione 4.3.5 "[Test del bilanciamento del carico TCP su un indirizzo IP virtuale ](https://safekit.eviden.com/resources/safekit-user-guide-82/#Mosaic) ".
- **Il mosaico smette di rispondere dopo l'arresto del server di dispatching:** GARP non viene preso in considerazione da un dispositivo sul percorso (router, gateway, switch virtuale). Verifica la gestione GARP con il tuo team di rete.
- **Invio periodico di GARP :** l'attributo `arpreroute="on"` della sezione `<vip>` (con `arpinterval` e `arpelapse` ) invia GARPs regolarmente sui VIP. Consultare la Guida per l'utente, sezione 13.6.4 "[Sintassi `<vip>` ](https://safekit.eviden.com/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) ".
- **Diagnosi della risoluzione IP virtuale ( VIP ) ↔ MAC :** consultare la Guida per l'utente, sezione 7.24 "[Risoluzione dei problemi di risoluzione IP virtuale ( VIP ) ↔ MAC ](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Issue_with_VIP) " e sezione 7.15 "[Modulo <span class="notranslate farm-term" translate="no">Farm</span> UP (Ready) ma problema di bilanciamento del carico in un <span class="notranslate farm-term" translate="no">Farm</span> ](<https://safekit.eviden.com/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>) ".

## Dimostrazione della soluzione SafeKit <span class="notranslate farm-term" translate="no">farm</span> {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-it  %}}

Per il failover primario/di backup con un indirizzo IP virtuale, vedere [Test dell'indirizzo IP virtuale di un cluster mirror SafeKit ](/it/best-practises/test-primary-backup-vip-mirror/) .

{{%  insert-safekit-4-buttons-it  %}}
