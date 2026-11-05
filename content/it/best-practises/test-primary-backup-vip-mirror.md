---
title: "Test dell’indirizzo IP virtuale di uno cluster mirror SafeKit"
canonical: "https://safekit.eviden.com/it/best-practises/test-primary-backup-vip-mirror/"
description: "Testa la disponibilità e il failover dell’IP virtuale in un cluster mirror SafeKit, inclusi il reindirizzamento GARP, i controlli ARP e l’acquisizione dei pacchetti."
category: "best-practises"
lang: "it"
topics: "Principi chiave, Prerequisito: configurazione IP virtuale (VIP), Test 1 – IP virtuale (VIP) gestito dal server primario, Test 2 – Failover manuale (arresto del primario), Test 3 – Controllo del reindirizzamento GARP con arp -a, Test 4 – Controllo end-to-end con Wireshark (Windows) o tcpdump (Linux), Quali workstation testare, Riepilogo dei risultati attesi, Risoluzione dei problemi"
translation: "translate_md 2026-11-05.10 | glossaire 2026-11-05.14 | Translation LLM | 12 expressions"
---

# Testare l’indirizzo IP virtuale di uno cluster mirror SafeKit nella propria rete {#testing-the-virtual-ip-address-of-a-safekit-mirror-cluster-in-your-network}

Questa guida descrive come verificare che l’indirizzo IP virtuale (VIP) di uno cluster mirror SafeKit (modulo mirror) funzioni correttamente nella rete: l’IP virtuale (VIP) è detenuto dal server primario e viene reindirizzato al nuovo server primario dopo un failover.

## 1. Principi chiave {#1-key-principles}

**Prerequisito:** entrambi i nodi del cluster mirror devono trovarsi nella stessa sottorete IP di livello 2: una LAN o una VLAN estesa tra siti remoti.

- L’IP virtuale (VIP) è attivo solo sul **server primario** (stati PRIM o ALONE): è impostato come alias dell’indirizzo IP fisico, sulla scheda di rete di quell’indirizzo, quando il modulo si avvia come primario sul nodo (configurazione `where="one_side_alias"`).
- L’indirizzo MAC del server primario è quindi quello associato all’IP virtuale (VIP) nelle tabelle ARP (router, gateway, client nella stessa sottorete). Tutto il traffico verso l’IP virtuale (VIP) viene inviato al server primario.
- Durante un failover (arresto o guasto del primario), l’IP virtuale (VIP) viene rimosso dall’ex primario e impostato come alias sul nuovo primario. Due meccanismi consentono quindi alla rete di associare l’IP virtuale (VIP) all’indirizzo MAC del nuovo primario:
  - i messaggi di rete inviati dal sistema operativo quando l’IP virtuale (VIP) viene aggiunto come alias sulla scheda di rete;
  - i **GARP** (ARP gratuiti) inviati da SafeKit, quando l’attributo `arpreroute="on"` è configurato nella sezione `<vip>`.

Cosa devi quindi testare:

1. l’IP virtuale (VIP) è gestito dal server primario ed è raggiungibile dai client;
2. l’indirizzo MAC associato all’IP virtuale (VIP) viene reindirizzato al nuovo server primario nella rete (router, gateway, virtualizzazione) quando il server primario cambia.

## 2. Prerequisito: configurazione dell’IP virtuale (VIP) {#2-prerequisite-virtual-ip-vip-configuration}

1. Nel file `userconfig.xml` del modulo mirror, configurare l’IP virtuale (VIP) nella sezione `<vip>`. L’attributo `arpreroute="on"` fa sì che il nuovo primario invii i GARP dopo un failover:

   ```xml
   <vip>
     <interface_list>
       <interface arpreroute="on">
         <real_interface>
           <virtual_addr addr="<VIP>" where="one_side_alias"/>
         </real_interface>
       </interface>
     </interface_list>
   </vip>
   ```

2. Applica la configurazione su entrambi i nodi.
3. Avviare il modulo: un nodo deve essere **PRIM (Ready)** e l’altro **SECOND (Ready)**.

## 3. Test 1 – IP virtuale (VIP) gestito dal server primario {#3-test-1--virtual-ip-vip-held-by-the-primary-server}

**Passaggi**

1. Sul server primario, eseguire `ipconfig` (Windows) o `ip addr show` (Linux).
   → **Risultato atteso:** l’IP virtuale (VIP) appare come alias sulla scheda di rete dell’indirizzo IP fisico.
2. Sul server secondario, eseguire lo stesso comando.
   → **Risultato atteso:** l’IP virtuale (VIP) non viene visualizzato.
3. Da una workstation client **esterna al cluster**, `ping` di entrambi gli indirizzi IP fisici e dell’IP virtuale (VIP).
   → **Risultato atteso:** tutti e tre i comandi `ping` rispondono (a meno che non vengano filtrati dai firewall).
4. Controllare l’accesso tramite l’IP virtuale (VIP) con il mosaico SafeKit: da un browser sul client **esterno**, connettersi a `http://<VIP>:9010/safekit/mosaic.html` (o utilizzare la porta 9453 se il server web e la console SafeKit sono stati commutati su HTTPS), quindi inserire il **nome del modulo** mirror ed eseguire il test.
   → **Risultato atteso:** tutte le celle del mosaico visualizzano il nome del **server primario**, in un unico colore: tutte le connessioni TCP all’IP virtuale (VIP) sono servite dal primario.

![Testare l’indirizzo IP virtuale di uno mirror SafeKit con il mosaico](/wp-content/uploads/2024/03/appli-20.png)

## 4. Test 2 – Failover manuale (arresto del primario) {#4-test-2--manual-failover-stop-of-the-primary}

Questo test verifica che l’IP virtuale (VIP) segua il server primario durante un failover, attivato dall’arresto del modulo sul server primario.

**Passaggi**

1. Arrestare il modulo sul primario (nodo 1) dalla console SafeKit (o dalla riga di comando con `safekit stop -m <module>`).
   → **Risultato atteso:** il nodo 1 passa a STOP (NotReady) e il nodo 2 passa a ALONE (Ready). Nel log del nuovo primario, viene visualizzato il messaggio `Virtual IP <VIP> set`.
2. Sulla nuova interfaccia primaria, eseguire `ipconfig` o `ip addr show`.
   → **Risultato atteso:** l’IP virtuale (VIP) ora appare come alias su questo nodo e non più sul precedente primario.
3. Dalla workstation client, ripetere i tre comandi `ping` ed eseguire nuovamente mosaico sull’IP virtuale (VIP).
   → **Risultato atteso:** tutto risponde e tutte le celle del mosaico ora visualizzano il nome del **nuovo primario**, in un unico colore.
4. Riavviare il modulo sul nodo 1: si risincronizza e passa a SECOND (Ready), mentre il nodo 2 passa a PRIM (Ready).

## 5. Test 3 – Verifica del reindirizzamento MAC con `arp -a` {#5-test-3--checking-mac-rerouting-with-arp--a}

Si annota l’indirizzo MAC associato all’IP virtuale (VIP) prima del failover, quindi si verifica che sia cambiato in seguito.

Questo test è possibile solo se la workstation del client si trova nella **stessa sottorete IP** del cluster.

Se è presente un router tra il client e il cluster, la tabella ARP del client non contiene l’IP virtuale (VIP), ma l’indirizzo del gateway utilizzato per raggiungere la rete del cluster. In tal caso, controllare la tabella ARP del router o del gateway con il team di rete.

**Passaggi**

1. Il modulo è PRIM (Ready) sul nodo 1 e SECOND (Ready) sul nodo 2.
2. Sulla workstation client, `ping` di entrambi gli indirizzi IP fisici e dell’IP virtuale (VIP), quindi eseguire `arp -a`.
   → **Risultato atteso:** l’IP virtuale (VIP) è associato allo **stesso indirizzo MAC dell’indirizzo IP fisico del primario**.
3. `stop` il modulo sul primario (nodo 1).
4. Eseguire nuovamente `ping` dell’IP virtuale (VIP), quindi eseguire nuovamente `arp -a`.
   → **Risultato atteso:** l’IP virtuale (VIP) è ora associato allo **stesso indirizzo MAC dell’indirizzo IP fisico del nuovo primario**.

> Eseguire nuovamente `ping` dell’IP virtuale (VIP) prima di leggere la tabella ARP: la voce potrebbe essere contrassegnata come obsoleta e aggiornata solo dopo un `ping`.

Esempio della tabella ARP prevista, prima e dopo l’arresto del primario:

| Indirizzo | MAC prima dell’arresto | MAC dopo l’arresto |
|---|---|---|
| IP fisico del nodo 1 | MAC del nodo 1 | MAC del nodo 1 |
| IP fisico del nodo 2 | MAC del nodo 2 | MAC del nodo 2 |
| IP virtuale (VIP) | **MAC del nodo 1** | **MAC del nodo 2** |

## 6. Test 4 – Controllo end-to-end con Wireshark (Windows) o tcpdump (Linux) {#6-test-4--end-to-end-check-with-wireshark-windows-or-tcpdump-linux}

È possibile seguire una connessione TCP all’IP virtuale (VIP) catturando i pacchetti sul client e su entrambi i nodi: con Wireshark sulle macchine Windows e con tcpdump sulle macchine Linux.

È necessario esaminare le **intestazioni MAC (Ethernet) dei pacchetti** : l’indirizzo IP di destinazione rimane l’IP virtuale (VIP) ed è l’indirizzo MAC di destinazione che mostra quale nodo riceve il traffico.

**Cosa osservare:**

| Quando | Dove acquisire i pacchetti | Indirizzi MAC osservati |
|---|---|---|
| Prima del failover | cliente | MAC del client → MAC del **nodo 1 (primario)** |
| Prima del failover | nodo 1 | I pacchetti destinati all’IP virtuale (VIP) vengono ricevuti; il nodo 2 non riceve nulla. |
| Durante il failover | rete | MAC reindirizza i messaggi inviati dal nodo 2 per l’IP virtuale (VIP): messaggi inviati dal sistema operativo quando è impostato come alias e GARP inviati da SafeKit (`arpreroute="on"`) |
| Dopo il failover | cliente | MAC del client → MAC del **nodo 2 (nuovo primario)** |

> Se la workstation client si trova in una sottorete diversa dal cluster, il "MAC client" visualizzato sui nodi è l’indirizzo MAC del **gateway** (router) che collega le due sottoreti, non quello della workstation client.

## 7. Da quali postazioni eseguire i test {#7-which-workstations-to-test-from}

Il comportamento dipende dal percorso di rete tra il client e il cluster. Eseguire i test 1 e 2 da ciascun tipo di client pertinente all’architettura:

| Sede del cliente | Cosa controlla il test |
|---|---|
| Client nella **stessa subnet** del cluster | Aggiornamento delle tabelle ARP dei client (3 test possibili) |
| Client in una **sottorete diversa** (router, gateway, rete virtuale dell’hypervisor) | Aggiornamento delle tabelle ARP dei client nel router o nel gateway |
| VM client **su un hypervisor che ospita anche una VM dello cluster mirror** | Comportamento dello switch virtuale dell’hypervisor, che gestisce anche lo switching e il routing interni. |

## 8. Riepilogo dei risultati attesi {#8-summary-of-expected-results}

| Test | Azione | Risultato atteso |
|---|---|---|
| 1 | PRIM / SECOND, `ipconfig`, `ping` e mosaico | IP virtuale (VIP) come alias solo sul primario; i 3 comandi `ping` rispondono (a meno che non siano filtrati dai firewall); il mosaico mostra solo il primario |
| 2 | Arresto del primario | IP virtuale (VIP) come alias sul nuovo primario; messaggio `Virtual IP <VIP> set` ; il mosaico mostra solo il nuovo primario |
| 3 | `arp -a` prima e dopo l’arresto del primario | L’IP virtuale (VIP) si sposta dall’indirizzo MAC del nodo 1 a quello del nodo 2. |
| 4 | Acquisizione con Wireshark o tcpdump prima e dopo il failover | Il client invia all’indirizzo MAC del nuovo primario |

## 9. Risoluzione dei problemi {#9-troubleshooting}

- **L’IP virtuale (VIP) non risponde più dopo il failover:** i messaggi di reindirizzamento MAC non vengono presi in considerazione da un dispositivo sul percorso (router, gateway, switch virtuale), che continua a inviare il traffico all’indirizzo MAC dell’ex primario. Verificare la gestione dei messaggi di reindirizzamento MAC con il team di rete.
- **Invio di GARP:** l’attributo `arpreroute="on"` della sezione `<vip>` (con `arpinterval` e `arpelapse`) invia regolarmente i GARP sull’IP virtuale (VIP) dopo il failover. Vedere la Guida per l’utente, sezione 13.6.4 " [Sintassi `<vip>`](https://safekit.eviden.com/it/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) ".
- **Diagnosi della risoluzione IP virtuale (VIP) ↔ MAC:** consultare la Guida per l’utente, sezione 7.24 " [Risoluzione dei problemi di risoluzione IP virtuale (VIP) ↔ MAC](https://safekit.eviden.com/it/resources/safekit-user-guide-82/#_Issue_with_VIP) " e sezione 7.16 " [Problema con l’IP virtuale dopo il failover](https://safekit.eviden.com/it/resources/safekit-user-guide-82/#_Problem_with_the_1) ".

Per maggiori informazioni:
- [Come funziona un indirizzo IP virtuale in un cluster ad alta disponibilità?](/it/best-practises/how-a-virtual-ip-address-works/)
- Per il bilanciamento del carico con un indirizzo IP virtuale, vedere [Test dell’indirizzo IP virtuale di bilanciamento del carico in un cluster farm SafeKit](/it/best-practises/test-load-balancing-vip-farm/).

{{%  insert-safekit-4-buttons-it  %}}
