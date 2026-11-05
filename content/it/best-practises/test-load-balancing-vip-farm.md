---
title: "Test dell’indirizzo IP virtuale di bilanciamento del carico in un cluster farm SafeKit"
canonical: "https://safekit.eviden.com/it/best-practises/test-load-balancing-vip-farm/"
description: "Scopri come testare il bilanciamento del carico di SafeKit tra i nodi del cluster e verificare il failover dell’IP virtuale, il reindirizzamento GARP e il comportamento della rete."
category: "best-practises"
lang: "it"
topics: "Principi chiave, Prerequisito: il mosaico SafeKit, Test 1 – Distribuzione delle connessioni, Test 2 – Cambio del server di dispatching, Test 3 – Controllo del reindirizzamento GARP con arp -a, Test 4 – Controllo end-to-end con Wireshark (Windows) o tcpdump (Linux), Quali workstation testare, Riepilogo dei risultati attesi, Risoluzione dei problemi, Dimostrazione della soluzione farm di SafeKit"
translation: "translate_md 2026-11-05.12 | glossaire 2026-11-05.15 | Translation LLM | 12 expressions"
---

# Test dell’indirizzo IP virtuale di bilanciamento del carico in un cluster <span class="notranslate farm-term" translate="no">farm</span> SafeKit {#testing-the-load-balancing-virtual-ip-address-in-a-safekit-farm-cluster}

Questa guida descrive come verificare che una SafeKit <span class="notranslate farm-term" translate="no">Farm</span> (modulo <span class="notranslate farm-term" translate="no">Farm</span>, bilanciamento del carico su un indirizzo IP virtuale) funzioni correttamente nella rete: distribuzione delle connessioni tra i nodi e reindirizzamento dell’IP virtuale (VIP) quando il nodo di distribuzione si arresta.

## 1. Principi chiave {#1-key-principles}

**Prerequisito:** tutti i nodi della <span class="notranslate farm-term" translate="no">Farm</span> devono trovarsi nella stessa sottorete IP di livello 2: una LAN o una VLAN estesa tra siti remoti.

- L’IP virtuale (VIP) è configurato localmente su ciascun nodo della <span class="notranslate farm-term" translate="no">Farm</span>: è impostato come alias dell’indirizzo IP fisico, sulla scheda di rete di quell’indirizzo, quando la <span class="notranslate farm-term" translate="no">Farm</span> viene avviata sul nodo.
- Un singolo nodo, il **server di dispatching**, riceve il traffico di rete per l’IP virtuale (VIP) (configurazione `vmac_directed`, l’impostazione predefinita di SafeKit): il suo indirizzo MAC è quello associato all’IP virtuale (VIP) nelle tabelle ARP (router, gateway, client nella stessa sottorete).
- Il filtro del kernel di questo nodo distribuisce quindi le connessioni TCP tra i nodi della <span class="notranslate farm-term" translate="no">Farm</span>, **riscrivendo l’indirizzo MAC di destinazione** dei pacchetti con quello del nodo di elaborazione (l’indirizzo IP di destinazione rimane l’IP virtuale (VIP)). Le risposte vengono inviate direttamente dal nodo che elabora la connessione al client.
- La distribuzione eseguita dal filtro è **deterministica** : il nodo di elaborazione viene calcolato in base all’identità del client, secondo la regola di bilanciamento del carico configurata:
  - **sull’indirizzo IP del client** (`filter="on_addr"`): un dato client viene sempre servito dallo stesso nodo, il che garantisce l’affinità di sessione;
  - sulla **porta TCP del client** (`filter="on_port"`): ogni connessione TCP dallo stesso client può essere servita da un nodo diverso. Questa è la regola utilizzata per il mosaico (sezione 2), che quindi mostra tutti i nodi da una singola workstation.
- Se il server di dispatching si arresta, un altro nodo assume questo ruolo e invia **GARP** (ARP gratuito) in modo che la rete associ l’IP virtuale (VIP) al proprio indirizzo MAC.

Cosa devi quindi testare:

1. che le connessioni siano distribuite correttamente su tutti i nodi;
2. che la rete (router, gateway, virtualizzazione) tenga conto del GARP quando il server di dispatching cambia.

## 2. Prerequisito: il mosaico SafeKit {#2-prerequisite-the-safekit-mosaic}

Il mosaico è una pagina di prova fornita da SafeKit. Apre molte connessioni TCP all’IP virtuale (VIP) e visualizza, per ciascuna di esse, il nome del nodo che ha risposto. Questo mostra la distribuzione a colpo d’occhio.

1. Nel file `userconfig.xml` del modulo <span class="notranslate farm-term" translate="no">Farm</span>, nella sezione `<vip>`, aggiungere la regola di bilanciamento del carico sulla porta del server web SafeKit. Esempio con il server web SafeKit in HTTP sulla porta 9010:

   ```xml
   <loadbalancing_list>
     <group name="FarmProto">
       <rule port="9010" proto="tcp" filter="on_port"/>
     </group>
   </loadbalancing_list>
   ```

   Se il server web e la console di SafeKit sono stati impostati su HTTPS, sostituire 9010 con 9453.

2. Applica la configurazione su tutti i nodi.
3. Da un browser su una workstation client **esterna alla <span class="notranslate farm-term" translate="no">Farm</span>**, connettersi a:

   ```
   http://<VIP>:9010/safekit/mosaic.html
   ```

   quindi inserire il **nome del modulo** <span class="notranslate farm-term" translate="no">Farm</span> ed eseguire il test. Ogni cella del mosaico visualizza il nome del nodo che ha risposto alla connessione TCP e un colore è associato a ciascun nodo per mostrare chiaramente i blocchi del mosaico serviti dallo stesso nodo.

   In HTTPS, utilizzare `https://<VIP>:9453/safekit/mosaic.html`, con la regola di bilanciamento del carico sulla porta 9453.

![Testare l’indirizzo IP virtuale di una <span class="notranslate farm-term" translate="no">farm</span> SafeKit con il mosaico](/wp-content/uploads/2024/03/appli-19.png)

Guarda il video di prova mosaico nella sezione " [Dimostrazione della soluzione <span class="notranslate farm-term" translate="no">farm</span> di SafeKit](/it/quick-install/safekit-quick-installation-guide-with-network-load-balancing-and-failover/#demonstration-of-the-safekit-farm-solution) ".

## 3. Test 1 – Distribuzione delle connessioni {#3-test-1--distribution-of-connections}

**Passaggi**

1. Avviare la <span class="notranslate farm-term" translate="no">Farm</span> su tutti i nodi (stato UP).
2. Aprire mosaico da una workstation client.

**Risultato atteso:** il mosaico visualizza i nomi di **tutti i nodi** della <span class="notranslate farm-term" translate="no">Farm</span>, con un colore diverso per ogni nodo di elaborazione.

Ciò dimostra che il router o il gateway a monte raggiunge uno dei nodi tramite il suo indirizzo MAC e che questo nodo distribuisce correttamente le connessioni.

## 4. Test 2 – Modifica del server di invio {#4-test-2--change-of-dispatching-server}

Questo test verifica che la <span class="notranslate farm-term" translate="no">Farm</span> continui a rispondere quando il server di dispatching si arresta.

**Passaggi**

1. Arrestare la <span class="notranslate farm-term" translate="no">Farm</span>, ovvero tutti i nodi in SafeKit.
2. Avviare **un singolo nodo**. Questo nodo diventa il server di dispatching.
   → **Risultato atteso:** il mosaico mostra solo questo nodo.
3. Avviare gli altri nodi.
   → **Risultato atteso:** il mosaico visualizza tutti i nodi.
4. Arrestare il **primo nodo**, quello che funge da server di smistamento.
   → **Risultato atteso:** il mosaico visualizza i nodi rimanenti.

> **Limitazione di questo test:** un risultato corretto al passaggio 4 non dimostra che GARP funzioni. Quando il modulo <span class="notranslate farm-term" translate="no">Farm</span> viene avviato sugli altri nodi (passaggio 3), l’indirizzo IP virtuale viene configurato su questi nodi, il che genera messaggi sulla rete che potrebbero già reindirizzare l’associazione tra indirizzo IP virtuale e indirizzo MAC. Solo i test 3 e 4 testano realmente GARP.

> L’arresto di qualsiasi altro nodo della <span class="notranslate farm-term" translate="no">Farm</span> (che non sia il server di distribuzione) verifica solo la riconfigurazione della distribuzione.

## 5. Test 3 – Verifica del reindirizzamento GARP con `arp -a` {#5-test-3--checking-garp-rerouting-with-arp--a}

Insieme al test 4, questo test verifica realmente GARP: si annota l’indirizzo MAC del server di dispatching prima di arrestarlo, quindi si controlla che l’associazione IP virtuale (VIP)/MAC sia cambiata in seguito.

Questo test è possibile solo se la workstation client che visualizza il mosaico si trova nella **stessa sottorete IP** della <span class="notranslate farm-term" translate="no">Farm</span>.

Se è presente un router tra il client e la <span class="notranslate farm-term" translate="no">Farm</span>, la tabella ARP del client non contiene l’IP virtuale (VIP), ma l’indirizzo del gateway utilizzato per raggiungere la rete della <span class="notranslate farm-term" translate="no">Farm</span>. In tal caso, controllare la tabella ARP del router o del gateway con il team di rete.

**Passaggi**

1. Avviare <span class="notranslate farm-term" translate="no">Farm</span> su tutti i nodi.
2. Sulla workstation client, eseguire `arp -a` e annotare l’indirizzo MAC associato all’IP virtuale (VIP). Identifica il server di dispatching.
3. Arresta il nodo <span class="notranslate farm-term" translate="no">Farm</span> che ha questo indirizzo MAC.
4. Verifica che il mosaico funzioni ancora con i nodi rimanenti.
5. Eseguire nuovamente `arp -a` per leggere la nuova associazione IP virtuale (VIP)/MAC e identificare il nuovo server di dispatching.

## 6. Test 4 – Controllo end-to-end con Wireshark (Windows) o tcpdump (Linux) {#6-test-4--end-to-end-check-with-wireshark-windows-or-tcpdump-linux}

È possibile seguire una connessione TCP all’IP virtuale (VIP) catturando i pacchetti sul client e sui nodi <span class="notranslate farm-term" translate="no">Farm</span>: con Wireshark sulle macchine Windows e con tcpdump sulle macchine Linux.

È necessario esaminare le **intestazioni MAC (Ethernet) dei pacchetti**, non solo gli indirizzi IP: il filtro del kernel del server di distribuzione distribuisce le connessioni **riscrivendo l’indirizzo MAC di destinazione** dei pacchetti con quello del nodo di elaborazione. L’indirizzo IP di destinazione rimane l’IP virtuale (VIP) lungo l’intero percorso.

**Cosa si dovrebbe osservare per lo stesso pacchetto SYN:**

| Passo | Dove acquisire i pacchetti | Indirizzi MAC osservati |
|---|---|---|
| 1. Il client invia all’IP virtuale (VIP) | cliente | MAC del client → MAC del **server di smistamento** |
| 2. Il server di smistamento inoltra la connessione | server di smistamento | Invio del server MAC → MAC del **nodo di elaborazione** |
| 3. Il nodo di elaborazione riceve | nodo di elaborazione | Invio dal server MAC al MAC del nodo |
| 4. Il nodo risponde direttamente al client. | nodo di elaborazione | MAC del nodo → MAC del client |
| 5. Il client riceve la risposta | cliente | MAC del nodo → MAC del client |

> Se la workstation client si trova in una sottorete diversa dalla <span class="notranslate farm-term" translate="no">Farm</span>, il "MAC client" visto sui nodi <span class="notranslate farm-term" translate="no">Farm</span> è l’indirizzo MAC del **gateway** (router) che collega le due sottoreti, non quello della workstation client.

Ripetere l’acquisizione dopo aver arrestato il server di dispatching (test 2, passaggio 4): il passaggio 1 deve ora mostrare l’indirizzo MAC del **nuovo** server di dispatching.

## 7. Da quali postazioni eseguire i test {#7-which-workstations-to-test-from}

Il comportamento dipende dal percorso di rete tra il client e la <span class="notranslate farm-term" translate="no">Farm</span>. Eseguire i test 1 e 2 da ciascun tipo di client pertinente all’architettura:

| Sede del cliente | Cosa controlla il test |
|---|---|
| Il client si trova nella **stessa sottorete** della <span class="notranslate farm-term" translate="no">Farm</span> | Aggiornamento delle tabelle ARP dei client tramite GARP (test 3 possibile) |
| Client in una **sottorete diversa** (router, gateway, rete virtuale dell’hypervisor) | Gestione GARP da parte del router o del gateway |
| VM client **su un hypervisor che ospita anche una VM <span class="notranslate farm-term" translate="no">Farm</span>** | Comportamento dello switch virtuale dell’hypervisor, che gestisce anche lo switching e il routing interni. |

## 8. Riepilogo dei risultati attesi {#8-summary-of-expected-results}

| Test | Azione | Risultato atteso |
|---|---|---|
| 1 | Tutti i nodi UP, mosaico | Tutti i nodi sono visibili |
| 2.2 | Un singolo nodo è stato avviato | Viene visualizzato solo questo nodo. |
| 2.3 | Tutti i nodi sono stati avviati | Tutti i nodi sono visibili |
| 2.4 | Server di invio arrestato | I nodi rimanenti appaiono senza interruzioni durature. |
| 3 | `arp -a` prima e dopo l’arresto | L’indirizzo MAC associato all’IP virtuale (VIP) cambia. |
| 4 | Cattura con Wireshark o tcpdump prima e dopo l’arresto | Il client invia all’indirizzo MAC del nuovo server di smistamento |

## 9. Risoluzione dei problemi {#9-troubleshooting}

- **Bitmap di bilanciamento del carico:** per i dettagli sul test e sui bitmap di bilanciamento del carico, consultare la Guida per l’utente di SafeKit 8.2, sezione 4.3.5 " [Test del bilanciamento del carico TCP su un indirizzo IP virtuale](https://safekit.eviden.com/it/resources/safekit-user-guide-82/#Mosaic) ".
- **Il mosaico non risponde più dopo l’arresto del server di dispatching:** GARP non viene preso in considerazione da un dispositivo sul percorso (router, gateway, switch virtuale). Controllare la gestione GARP con il team di rete.
- **Invio periodico di GARP:** l’attributo `arpreroute="on"` della sezione `<vip>` (con `arpinterval` e `arpelapse`) invia regolarmente i GARP sui VIP. Vedere la Guida per l’utente, sezione 13.6.4 " [Sintassi `<vip>`](https://safekit.eviden.com/it/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) ".
- **Diagnosi della risoluzione IP virtuale (VIP) ↔ MAC:** vedere la Guida per l’utente, sezione 7.24 " [Risoluzione dei problemi di risoluzione IP virtuale (VIP) ↔ MAC](https://safekit.eviden.com/it/resources/safekit-user-guide-82/#_Issue_with_VIP) " e sezione 7.15 " [Modulo <span class="notranslate farm-term" translate="no">Farm</span> UP (Ready) ma problema di bilanciamento del carico in una <span class="notranslate farm-term" translate="no">Farm</span>](<https://safekit.eviden.com/it/resources/safekit-user-guide-82/#_Farm_module_UP(Ready)but>) ".

## Dimostrazione della soluzione <span class="notranslate farm-term" translate="no">farm</span> di SafeKit {#demonstration-of-the-safekit-farm-solution}


{{%  insert-safekit-farm-video-it  %}}

Per maggiori informazioni:
- [Come funziona un indirizzo IP virtuale in un cluster ad alta disponibilità?](/it/best-practises/how-a-virtual-ip-address-works/)
- Per il failover primario/di backup con un indirizzo IP virtuale, vedere [Test dell’indirizzo IP virtuale di uno cluster mirror SafeKit](/it/best-practises/test-primary-backup-vip-mirror/).

{{%  insert-safekit-4-buttons-it  %}}
