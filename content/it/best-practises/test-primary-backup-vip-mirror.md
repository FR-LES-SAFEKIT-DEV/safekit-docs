---
title: "Test dell'indirizzo IP virtuale di un cluster mirror SafeKit"
canonical: "https://safekit.eviden.com/it/best-practises/test-primary-backup-vip-mirror/"
description: "Verificare la disponibilità e il failover IP virtuali in un cluster mirror SafeKit, inclusi il reindirizzamento GARP, i controlli ARP e l'acquisizione di pacchetti."
category: "best-practises"
lang: "it"
topics: "Principi chiave, Prerequisito: configurazione IP virtuale (VIP), Test 1 – IP virtuale (VIP) detenuto dal server primario, Test 2 – Failover manuale (arresto del primario), Test 3 – Verifica del reindirizzamento GARP con arp -a, Test 4 – Verifica end-to-end con Wireshark (Windows) o tcpdump (Linux), Da quali workstation eseguire il test, Riepilogo dei risultati attesi, Risoluzione dei problemi"
---

# Verifica dell'indirizzo IP virtuale di un cluster mirror SafeKit nella rete

Questa guida descrive come verificare che l'indirizzo IP virtuale (VIP) di un cluster mirror SafeKit (modulo mirror) funzioni correttamente nella rete: l'IP virtuale (VIP) è assegnato al server primario e viene reindirizzato al nuovo server primario dopo un failover.

## 1. Principi chiave

**Prerequisito:** entrambi i nodi del cluster mirror devono trovarsi nella stessa sottorete IP di livello 2: una LAN o una VLAN estesa tra siti remoti.

- L'IP virtuale (VIP) è attivo solo sul **server primario** (stati PRIM o ALONE): viene impostato come alias dell'indirizzo IP fisico, sulla scheda di rete di tale indirizzo, quando il modulo si avvia come primario sul nodo (configurazione `where="one_side_alias"`).
- L'indirizzo MAC del server primario è quindi quello associato IP virtuale (VIP) nelle tabelle ARP (router, gateway, client nella stessa sottorete). Tutto il traffico diretto IP virtuale (VIP) viene inviato al server primario.
- Durante un failover (arresto o guasto del server primario), l'IP virtuale (VIP) viene rimosso dal server primario precedente e impostato come alias sul nuovo server primario. Due meccanismi consentono quindi alla rete di associare l'IP virtuale (VIP) all'indirizzo MAC del nuovo server primario:
  - i messaggi di rete inviati dal sistema operativo quando l'IP virtuale (VIP) viene aggiunto come alias sulla scheda di rete;
  - i **GARPs** (ARP gratuiti) inviati da SafeKit, quando l'attributo `arpreroute="on"` è configurato nella sezione `<vip>`.

Ciò che è necessario testare, quindi:

1. L'IP virtuale (VIP) è detenuto dal server primario ed è raggiungibile dai client;
2. Quando il server primario cambia, l'indirizzo MAC associato IP virtuale (VIP) viene reindirizzato al nuovo server primario nella rete (router, gateway, virtualizzazione).

## 2. Prerequisito: configurazione IP virtuale (VIP)

1. Nel file `userconfig.xml` del modulo mirror, configurare l'IP virtuale (VIP) nella sezione `<vip>`. L'attributo `arpreroute="on"` fa sì che il nuovo server primario invii GARPs dopo un failover:

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
3. Avviare il modulo: un nodo deve essere **PRIM (Ready)** e l'altro **SECOND (Ready)**.

## 3. Test 1 – IP virtuale (VIP) detenuto dal server primario

**Passaggi**

1. Sul server primario, eseguire `ipconfig` (Windows) o `ip addr show` (Linux).
   → **Risultato atteso:** l'IP virtuale (VIP) appare come alias sulla scheda di rete dell'indirizzo IP fisico.
2. Sul server secondario, eseguire lo stesso comando.
   → **Risultato atteso:** l'IP virtuale (VIP) non viene visualizzato.
3. Da una workstation client **esterna al cluster**, `ping` sia dell'indirizzo IP fisico che dell'indirizzo IP virtuale (VIP).
   → **Risultato atteso:** tutti e tre i comandi `ping` rispondono (a meno che non siano filtrati dai firewall).
4. Verifica l'accesso tramite IP virtuale (VIP) con SafeKit mosaic: da un browser sul client **esterno**, connettiti a `http://<VIP>:9010/safekit/mosaic.html` (oppure usa la porta 9453 se il server web e la console SafeKit sono stati configurati per HTTPS), quindi inserisci il **nome del modulo** mirror ed esegui il test.
   → **Risultato atteso:** tutte le celle del mosaico mostrano il nome del **server primario**, in un unico colore: tutte le connessioni TCP IP virtuale (VIP) sono gestite dal server primario.

![ Verifica l'indirizzo IP virtuale di un mirror SafeKit con il mosaico ](/wp-content/uploads/2024/03/appli-20.png)

## 4. Test 2 – Failover manuale (arresto del server primario)

Questo test verifica che l'IP virtuale (VIP) segua il server primario durante un failover, attivato arrestando il modulo sul server primario.

**Passaggi**

1. Arresta il modulo sul nodo primario (nodo 1) dalla console SafeKit (oppure dalla riga di comando con `safekit stop -m <module>`).
   → **Risultato atteso:** il nodo 1 passa allo STOP (NotReady) e il nodo 2 passa allo ALONE (Ready). Nel log del nuovo primario compare il messaggio `Virtual IP <VIP> set`.
2. Sul nuovo server primario, eseguire `ipconfig` o `ip addr show`.
   → **Risultato atteso:** l'IP virtuale (VIP) ora appare come alias su questo nodo e non più sul precedente nodo primario.
3. Dalla workstation client, ripetere i tre comandi `ping` ed eseguire nuovamente il mosaico IP virtuale (VIP).
   → **Risultato atteso:** tutto risponde e tutte le celle del mosaico ora mostrano il nome della **nuova primaria**, in un unico colore.
4. Riavvia il modulo sul nodo 1: si risincronizza e passa allo SECOND (Ready), mentre il nodo 2 passa allo PRIM (Ready).

## 5. Test 3 – Verifica del reindirizzamento MAC con `arp -a`

Si annota l'indirizzo MAC associato IP virtuale (VIP) prima del failover, quindi si verifica che sia cambiato successivamente.

Questo test è possibile solo se la workstation client si trova nella **stessa sottorete IP** del cluster.

Se tra il client e il cluster è presente un router, la tabella ARP del client non contiene l'IP virtuale (VIP), bensì l'indirizzo del gateway utilizzato per raggiungere la rete del cluster. In tal caso, è necessario verificare la tabella ARP del router o del gateway con il team di rete.

**Passaggi**

1. Il modulo è PRIM (Ready) sul nodo 1 e SECOND (Ready) sul nodo 2.
2. Sulla workstation client, `ping` sia dell'indirizzo IP fisico che IP virtuale (VIP), quindi esegui `arp -a`.
   → **Risultato atteso:** l'IP virtuale (VIP) è associato allo **stesso indirizzo MAC dell'indirizzo IP fisico del primario**.
3. `stop` il modulo sul nodo primario (nodo 1).
4. Esegui nuovamente `ping` dell'indirizzo IP virtuale (VIP), quindi esegui di nuovo `arp -a`.
   → **Risultato atteso:** l'IP virtuale (VIP) è ora associato allo **stesso indirizzo MAC dell'indirizzo IP fisico del nuovo primario**.

> Eseguire nuovamente `ping` all'indirizzo IP virtuale (VIP) prima di leggere la tabella ARP: la voce potrebbe essere contrassegnata come obsoleta e aggiornata solo dopo un `ping`.

Esempio della tabella ARP prevista, prima e dopo l'arresto del server primario:

| Indirizzo | MAC prima dell'arresto | MAC dopo l'arresto |
|---|---|---|
| IP fisico del nodo 1 | MAC del nodo 1 | MAC del nodo 1 |
| IP fisico del nodo 2 | MAC del nodo 2 | MAC del nodo 2 |
| IP virtuale (VIP) | **MAC del nodo 1** | **MAC del nodo 2** |

## 6. Test 4 – Verifica end-to-end con Wireshark (Windows) o tcpdump (Linux)

È possibile tracciare una connessione TCP verso l'IP virtuale (VIP) catturando i pacchetti sul client e su entrambi i nodi: con Wireshark sui sistemi Windows e con tcpdump sui sistemi Linux.

È necessario esaminare le **intestazioni MAC (Ethernet) dei pacchetti**: l'indirizzo IP di destinazione rimane l'IP virtuale (VIP), ed è l'indirizzo MAC di destinazione che indica quale nodo riceve il traffico.

**Cosa dovresti osservare:**

| Quando | Dove catturare i pacchetti | Indirizzi MAC osservati |
|---|---|---|
| Prima del failover | cliente | MAC del client → MAC del **nodo 1 (primario)** |
| Prima del failover | nodo 1 | I pacchetti destinati IP virtuale (VIP) vengono ricevuti; il nodo 2 non riceve nulla. |
| Durante il failover | rete | Messaggi di reindirizzamento MAC inviati dal nodo 2 per l'IP virtuale (VIP): messaggi inviati dal sistema operativo quando è impostato come alias e GARPs inviati da SafeKit (`arpreroute="on"`) |
| Dopo il failover | cliente | MAC del client → MAC del **nodo 2 (nuovo primario)** |

> Se la workstation client si trova in una sottorete diversa da quella del cluster, l'MAC del client visualizzato sui nodi è l'indirizzo MAC del **gateway** (router) che collega le due sottoreti, e non quello della workstation client.

## 7. Da quali postazioni di lavoro eseguire il test

Il comportamento dipende dal percorso di rete tra il client e il cluster. Esegui i test 1 e 2 per ogni tipo di client rilevante per la tua architettura:

| Ubicazione del cliente | Cosa verifica il test |
|---|---|
| Cliente nella **stessa sottorete** del cluster | Aggiornamento delle tabelle ARP dei client (3 test possibili) |
| Client in una **sottorete diversa** (router, gateway, rete virtuale dell'hypervisor) | Aggiornamento delle tabelle ARP dei client nel router o gateway |
| Macchina virtuale client **su un hypervisor che ospita anche una macchina virtuale del cluster mirror** | Comportamento dello switch virtuale dell'hypervisor, che gestisce anche lo switching e il routing interni. |

## 8. Sintesi dei risultati attesi

| Test | Azione | Risultato atteso |
|---|---|---|
| 1 | PRIM / SECOND, `ipconfig`, `ping` e mosaico | IP virtuale (VIP) come alias solo sull'indirizzo primario; i 3 comandi `ping` rispondono (a meno che non vengano filtrati dai firewall); il mosaico visualizza solo l'indirizzo primario |
| 2 | Arresto del primario | IP virtuale (VIP) come alias sul nuovo primario; messaggio `Virtual IP <VIP> set`; il mosaico visualizza solo il nuovo primario |
| 3 | `arp -a` prima e dopo l'arresto del primario | L'indirizzo IP virtuale (VIP) si sposta dall'indirizzo MAC del nodo 1 a quello del nodo 2. |
| 4 | Acquisizione Wireshark o tcpdump prima e dopo il failover | Il client invia all'indirizzo MAC del nuovo primario |

## 9. Risoluzione dei problemi

- **L'IP virtuale (VIP) non risponde più dopo il failover:** i messaggi di reindirizzamento MAC non vengono presi in considerazione da un dispositivo sul percorso (router, gateway, switch virtuale), che continua a inviare traffico all'indirizzo MAC del precedente indirizzo primario. Verifica la gestione dei messaggi di reindirizzamento MAC con il tuo team di rete.
- **Invio GARPs :** l'attributo `arpreroute="on"` della sezione `<vip>` (con `arpinterval` e `arpelapse`) invia regolarmente GARPs IP virtuale (VIP) dopo il failover. Vedere la Guida per l'utente, sezione 13.6.4 " [ Sintassi `<vip>` ](https://safekit.eviden.com/resources/safekit-user-guide-82/#_%3Cvip%3E_Syntax) ".
- **Diagnosi della risoluzione IP virtuale (VIP) ↔ MAC :** consultare la Guida per l'utente, sezione 7.24 " [ Risoluzione dei problemi relativi alla risoluzione IP virtuale (VIP) ↔ MAC ](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Issue_with_VIP) " e sezione 7.16 " [ Problema con l'IP virtuale dopo il failover ](https://safekit.eviden.com/resources/safekit-user-guide-82/#_Problem_with_the_1) ".

Per il bilanciamento del carico con un indirizzo IP virtuale, vedere [ Test dell'indirizzo IP virtuale per il bilanciamento del carico in un cluster SafeKit Farm ](/it/best-practises/test-load-balancing-vip-farm/).

{{%  insert-safekit-4-buttons-it  %}}
